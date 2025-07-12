
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, FileText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background font-poppins">
      {/* Header */}
      <header className="flex items-center bg-card p-4 justify-between max-w-4xl mx-auto w-full">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/landing')}
          className="text-primary hover:text-secondary"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-primary text-lg md:text-xl lg:text-2xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Termos de Serviço
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
        <Card className="border-accent">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-primary">Termos de Serviço</CardTitle>
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <Clock className="w-4 h-4" />
              <span>Última atualização: 25 de Janeiro de 2025</span>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="prose max-w-none">
                <p className="text-lg text-foreground leading-relaxed">
                  Bem-vindo ao Top Templates Brasil! Estes Termos de Serviço regulam o uso da nossa plataforma. 
                  Ao acessar ou usar nossos serviços, você concorda com estes termos.
                </p>
              </div>

              <div className="grid gap-6">
                <Card className="border-accent/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-secondary font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-primary mb-2">Uso da Plataforma</h3>
                        <p className="text-muted-foreground">
                          Você deve utilizar a plataforma de acordo com as leis aplicáveis e não pode usá-la para fins ilícitos. 
                          É proibido tentar acessar áreas restritas ou interferir no funcionamento dos serviços.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-accent/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-secondary font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-primary mb-2">Propriedade Intelectual</h3>
                        <p className="text-muted-foreground">
                          Todo o conteúdo, incluindo templates, textos, imagens e marcas, pertence ao Top Templates Brasil 
                          ou a seus parceiros. O uso dos templates está sujeito às licenças específicas de cada produto.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-accent/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-secondary font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-primary mb-2">Responsabilidades</h3>
                        <p className="text-muted-foreground">
                          Não nos responsabilizamos por danos causados pelo uso indevido da plataforma. 
                          Os usuários são responsáveis pelo conteúdo que criam utilizando nossos templates.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-accent/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-secondary font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-primary mb-2">Privacidade e Dados</h3>
                        <p className="text-muted-foreground">
                          Respeitamos sua privacidade e protegemos seus dados pessoais de acordo com a Lei Geral 
                          de Proteção de Dados (LGPD). Consulte nossa Política de Privacidade para mais detalhes.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-accent/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-secondary font-bold">5</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-primary mb-2">Alterações</h3>
                        <p className="text-muted-foreground">
                          Podemos atualizar estes termos a qualquer momento. Recomendamos que você revise esta página 
                          periodicamente. As alterações entram em vigor imediatamente após a publicação.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-muted border-accent/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Dúvidas?</h3>
                      <p className="text-muted-foreground text-sm">
                        Para esclarecimentos sobre estes termos, entre em contato pelo nosso{' '}
                        <Button
                          variant="link"
                          onClick={() => navigate('/contact')}
                          className="text-secondary hover:text-primary underline p-0 h-auto font-normal"
                        >
                          formulário de contato
                        </Button>
                        .
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button
            onClick={() => navigate('/landing')}
            className="bg-secondary hover:bg-primary text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Voltar para a Home
          </Button>
        </div>
      </main>

      <footer className="text-center text-muted-foreground py-6 text-sm bg-muted">
        © 2025 Top Templates Brasil
      </footer>
    </div>
  );
};

export default Terms;
