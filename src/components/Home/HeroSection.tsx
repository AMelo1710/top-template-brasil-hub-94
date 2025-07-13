import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onLoginClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLoginClick }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="relative flex min-h-[480px] flex-col gap-6 rounded-xl items-center justify-center p-4 overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0 rounded-xl bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/lovable-uploads/77988cbe-a964-4668-a3dd-a5eb76475705.png')`
          }}
        ></div>
        
        {/* Improved Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/40 rounded-xl"></div>
        
        {/* Logo/Icon positioned top-left */}
        <div className="absolute top-8 left-8 z-10">
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <img 
              src="/lovable-uploads/4d7f282c-259d-4106-abef-7a35e2e525ba.png" 
              alt="Top Templates Brasil"
              className="w-10 h-10"
            />
            <div className="text-white">
              <div className="text-lg font-bold">Top Templates</div>
              <div className="text-sm opacity-90">BRASIL</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-2 text-center">
          <h1 className="text-secondary text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
            Home Top Templates Brasil
          </h1>
          <h1 className="text-sky-100 text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
            Desbloqueie seu potencial na criação de slides e apresentações que irão impressionar as pessoas
          </h1>
          <h2 className="text-sky-100 text-lg font-normal leading-normal md:text-base md:font-bold">
            Explore um mundo de oportunidades e recursos para ajudar você a alcançar seus objetivos.
          </h2>
        </div>
        <Button 
          onClick={onLoginClick}
          className="relative z-10 bg-cyan-700 text-sky-100 hover:bg-sky-100 hover:text-secondary font-bold px-8 py-3 rounded-full transition-all duration-250 animate-[pulse_1.5s_infinite] hover:animate-none hover:scale-105 hover:shadow-lg"
        >
          Acessar plataforma
        </Button>
      </div>
    </div>
  );
}; 