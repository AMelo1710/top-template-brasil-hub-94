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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const webhookData = await req.json()
    console.log('Webhook received:', webhookData)

    // Update transaction status
    const { data: transaction, error } = await supabaseClient
      .from('transactions')
      .update({
        status: webhookData.status,
        updated_at: new Date().toISOString()
      })
      .eq('sunize_transaction_id', webhookData.id)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      throw new Error(`Database error: ${error.message}`)
    }

    console.log('Transaction updated:', transaction)

    // Here you can add additional logic based on status
    if (webhookData.status === 'AUTHORIZED') {
      // Payment approved - you can send email, unlock content, etc.
      console.log('Payment approved for transaction:', webhookData.id)
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})