import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Para permitir pagamentos sem autenticação Supabase
    // já que você tem seu próprio sistema de auth
    const { product, customer, ip } = await req.json()

    // Get API credentials from secrets
    const apiKey = Deno.env.get('SUNIZE_API_KEY')
    const apiSecret = Deno.env.get('SUNIZE_API_SECRET')

    if (!apiKey || !apiSecret) {
      throw new Error('API credentials not configured')
    }

    // Create external ID usando timestamp para guests
    const externalId = `guest-${Date.now()}`

    // Prepare transaction data
    const transactionData = {
      external_id: externalId,
      total_amount: product.price,
      payment_method: "PIX",
      webhook_url: "https://toptemplatesbrasil.com.br/webhooks", // URL do webhook
      items: [
        {
          id: product.id,
          title: product.title,
          description: product.description || product.title,
          price: product.price,
          quantity: 1,
          is_physical: false
        }
      ],
      ip: ip,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        document_type: customer.document_type,
        document: customer.document
      }
    }

    // Call Sunize API
    const response = await fetch('https://api.sunize.com.br/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'x-api-secret': apiSecret,
      },
      body: JSON.stringify(transactionData),
    })

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`API Error: ${response.status} - ${errorData}`)
    }

    const sunizeResponse = await response.json()

    // Store transaction in database usando service role
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { data: transaction, error: dbError } = await supabaseClient
      .from('transactions')
      .insert({
        user_id: null, // Para guests, null é permitido
        external_id: externalId,
        sunize_transaction_id: sunizeResponse.id,
        status: sunizeResponse.status,
        total_amount: product.price,
        payment_method: 'PIX',
        pix_payload: sunizeResponse.pix?.payload,
        customer_data: customer,
        items: [product],
        ip_address: ip
      })
      .select()
      .single()

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`)
    }

    return new Response(
      JSON.stringify({
        success: true,
        transaction: transaction,
        pix_payload: sunizeResponse.pix?.payload,
        sunize_response: sunizeResponse
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )

  } catch (error) {
    console.error('Error creating transaction:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})