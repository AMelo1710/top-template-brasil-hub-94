import React from 'react';
import { Users, GraduationCap, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Acesso a uma ampla gama de designs',
      description: 'Descubra uma variedade de designs e inspirações surpreendentes, com recursos pensados para impulsionar sua criatividade no Canva e nas principais plataformas de apresentação'
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'Suporte premium',
      description: 'Conte com uma equipe de suporte pronta para ajudar em qualquer etapa, com atendimento rápido e eficiente.'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Templates prontos e personalizáveis',
      description: 'Escolha entre centenas de modelos prontos para diversos fins e personalize com facilidade para se adequar à sua identidade visual.'
    }
  ];

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Benefícios da plataforma
      </h2>
      
      <div className="flex flex-col gap-10 py-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-primary tracking-light text-[32px] font-bold leading-tight md:text-4xl md:font-black max-w-[720px]">
            Potencialize sua jornada
          </h1>
          <p className="text-primary text-base font-normal leading-normal max-w-[720px]">
            Nossa plataforma oferece uma ampla gama de designs e ideias que irão te impressionar e recursos projetados para apoiar sua criatividade no canva e nas principais plataformas de apresentações.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border-accent">
              <CardContent className="p-6 flex flex-col gap-3">
                <div className="text-secondary">
                  {benefit.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-primary text-base font-bold leading-tight">
                    {benefit.title}
                  </h2>
                  <p className="text-muted-foreground text-sm font-normal leading-normal">
                    {benefit.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}; 