import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background font-poppins">
      {/* Header */}
      <header className="flex items-center bg-[rgb(199, 231, 249)] p-4 justify-between max-w-4xl mx-auto w-full">
        <h1 className="text-primary text-lg md:text-xl lg:text-2xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Sobre o Top Templates Brasil
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
        <Card className="border-accent">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-white">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-primary mb-2">Nossa História</h2>
              </div>

              <div className="text-foreground text-base leading-relaxed space-y-6">
                <p className="text-lg">
                  O Top Templates Brasil nasceu para facilitar a vida de quem precisa criar apresentações incríveis, com rapidez e qualidade. Nossa missão é democratizar o acesso a templates profissionais para todos os públicos, seja para estudos, negócios ou projetos pessoais.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <Card className="border-accent/50">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-primary mb-3">🎯 Nossa Missão</h3>
                      <p className="text-muted-foreground">
                        Democratizar o acesso a designs profissionais e inspirar a criatividade através de templates de alta qualidade.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-accent/50">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-primary mb-3">🚀 Nossa Visão</h3>
                      <p className="text-muted-foreground">
                        Ser a principal referência em templates para apresentações no Brasil, oferecendo soluções inovadoras.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <p>
                  Oferecemos uma plataforma intuitiva, com suporte dedicado e uma curadoria de designs que acompanham as tendências do mercado. Cada template é cuidadosamente selecionado para garantir que você tenha acesso aos melhores recursos visuais.
                </p>
                
                <p>
                  Nosso compromisso é com a criatividade, inovação e satisfação dos nossos usuários. Acreditamos que todos merecem ter acesso a ferramentas de design profissional, independentemente do seu nível de experiência.
                </p>

                <div className="bg-muted rounded-lg p-6 mt-8">
                  <h3 className="font-bold text-primary mb-4">✨ O que nos torna únicos:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Templates exclusivos criados por designers profissionais e que podem ser editados com facilidade</li>
                    <li>• Suporte personalizado em português</li>
                    <li>• Atualizações constantes com as últimas tendências</li>
                    <li>• Compatibilidade com as principais plataformas de apresentação</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button
            onClick={() => navigate('/')}
            className="bg-secondary hover:bg-primary text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Voltar para a Home
          </Button>
        </div>
      </main>

      <footer className="text-center text-muted-foreground py-6 text-sm bg-[rgb(199, 231, 249)]">
        © 2025 Top Templates Brasil
      </footer>
    </div>
  );
};

export default About;
