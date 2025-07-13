import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <Card className="bg-gradient-hero text-white">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-2">Bem-vindo de volta!</h2>
        <p className="mb-4 opacity-90">
          Confira nossas novidades de designs separados por categorias e as melhores ofertas em nossa plataforma que há anos ajuda a criar apresentações incríveis e melhorar a qualidade na forma de como você se apresenta.
        </p>
        <Button 
          variant="secondary" 
          onClick={() => navigate('/plataform/cart')}
          className="bg-white text-primary hover:bg-gray-100"
        >
          Ver Ofertas
        </Button>
      </CardContent>
    </Card>
  );
} 