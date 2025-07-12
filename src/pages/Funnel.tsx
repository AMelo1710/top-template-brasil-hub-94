
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FunnelData {
  nome: string;
  idade: number | '';
  pais: string;
  paisOutro: string;
  estado: string;
  conheceu: string;
  conheceuOutro: string;
  uso: string[];
  usoOutro: string;
  canva: string;
}

const Funnel = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FunnelData>({
    nome: '',
    idade: '',
    pais: '',
    paisOutro: '',
    estado: '',
    conheceu: '',
    conheceuOutro: '',
    uso: [],
    usoOutro: '',
    canva: ''
  });

  const totalSteps = 9;
  const progressPercent = Math.round((currentStep / (totalSteps - 1)) * 100);

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: // Nome
        return formData.nome.trim() !== '';
      case 2: // Idade
        const idade = Number(formData.idade);
        return idade >= 8 && idade <= 99;
      case 3: // País
        return formData.pais !== '' && (formData.pais !== 'Outro' || formData.paisOutro.trim() !== '');
      case 4: // Estado
        return formData.estado !== '';
      case 5: // Como conheceu
        return formData.conheceu !== '' && (formData.conheceu !== 'Outro' || formData.conheceuOutro.trim() !== '');
      case 6: // Como pretende usar
        return formData.uso.length > 0 && (!formData.uso.includes('Outro') || formData.usoOutro.trim() !== '');
      case 7: // Canva
        return formData.canva !== '';
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateCurrentStep() && currentStep > 0) {
      return;
    }
    
    if (currentStep === 3 && formData.pais !== 'Brasil') {
      setCurrentStep(5); // Pula o estado
    } else {
      setCurrentStep(Math.min(currentStep + 1, totalSteps - 1));
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleUsoChange = (value: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        uso: [...formData.uso, value]
      });
    } else {
      setFormData({
        ...formData,
        uso: formData.uso.filter(item => item !== value)
      });
    }
  };

  const handleFinish = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/plataform');
    }, 3500);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (currentStep < totalSteps - 1 && validateCurrentStep()) {
          nextStep();
        } else if (currentStep === totalSteps - 1) {
          handleFinish();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, formData]);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-4">
            <div className="text-2xl">🧭</div>
            <h2 className="text-xl font-bold text-primary">
              Antes de acessar nossos templates, precisamos te conhecer melhor:
            </h2>
            <p className="text-muted-foreground text-sm">
              Não se preocupe! As perguntas a seguir não são obrigatórias e não serão usadas para marketing.
              <br /><br />
              Queremos apenas entender quem está acessando nossa plataforma, de forma anônima e curiosa, 
              para saber qual público estamos alcançando.
              <br /><br />
              Isso nos ajuda a melhorar os conteúdos e criar experiências ainda mais relevantes.
              <br /><br />
              Responda sinceramente — leva menos de 1 minuto! ⏱️
            </p>
            <Button onClick={nextStep} className="mt-6 w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors">
              Continuar
            </Button>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-primary font-semibold">Qual é o seu nome?</span>
              <Input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Digite seu nome"
                className="mt-2 w-full rounded-lg border border-accent p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                autoComplete="off"
              />
              {formData.nome.trim() === '' && (
                <div className="text-red-500 text-xs mt-1 px-1">Por favor, digite seu nome.</div>
              )}
            </label>
            <Button 
              onClick={nextStep} 
              disabled={!validateCurrentStep()}
              className="w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próxima
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={prevStep} className="text-primary hover:text-secondary transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <span className="text-primary font-semibold">Quantos anos você tem?</span>
            </div>
            <Input
              type="number"
              min="8"
              max="99"
              value={formData.idade}
              onChange={(e) => setFormData({ ...formData, idade: e.target.value ? Number(e.target.value) : '' })}
              placeholder="Ex: 25"
              className="w-full rounded-lg border border-accent p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            {!validateCurrentStep() && formData.idade !== '' && (
              <div className="text-red-500 text-xs mt-1 px-1">A idade deve ser entre 8 e 99 anos.</div>
            )}
            <Button 
              onClick={nextStep} 
              disabled={!validateCurrentStep()}
              className="w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próxima
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={prevStep} className="text-primary hover:text-secondary transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <span className="text-primary font-semibold">Você é de qual país?</span>
            </div>
            <select
              value={formData.pais}
              onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
              className="w-full rounded-lg border border-accent p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="" disabled>Selecione o país</option>
              <option value="Brasil">Brasil</option>
              <option value="Portugal">Portugal</option>
              <option value="Angola">Angola</option>
              <option value="Moçambique">Moçambique</option>
              <option value="Outro">Outro</option>
            </select>
            {formData.pais === 'Outro' && (
              <Input
                type="text"
                value={formData.paisOutro}
                onChange={(e) => setFormData({ ...formData, paisOutro: e.target.value })}
                placeholder="Ex: Holanda"
                className="w-full rounded-lg border border-accent p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            )}
            {!validateCurrentStep() && (
              <div className="text-red-500 text-xs mt-1 px-1">Por favor, selecione um país.</div>
            )}
            <Button 
              onClick={nextStep} 
              disabled={!validateCurrentStep()}
              className="w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próxima
            </Button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={prevStep} className="text-primary hover:text-secondary transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <span className="text-primary font-semibold">De qual estado você é?</span>
            </div>
            <select
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
              className="w-full rounded-lg border border-accent p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="" disabled>Selecione o estado</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
            {!validateCurrentStep() && (
              <div className="text-red-500 text-xs mt-1 px-1">Por favor, selecione um estado.</div>
            )}
            <Button 
              onClick={nextStep} 
              disabled={!validateCurrentStep()}
              className="w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próxima
            </Button>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={prevStep} className="text-primary hover:text-secondary transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <span className="text-primary font-semibold">Como você conheceu o TopTemplatesBrasil?</span>
            </div>
            <div className="space-y-2">
              {['Instagram', 'TikTok', 'YouTube', 'Indicação de um amigo', 'Pesquisa no Google', 'Outro'].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="conheceu"
                    value={option}
                    checked={formData.conheceu === option}
                    onChange={(e) => setFormData({ ...formData, conheceu: e.target.value })}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
            {formData.conheceu === 'Outro' && (
              <Input
                type="text"
                value={formData.conheceuOutro}
                onChange={(e) => setFormData({ ...formData, conheceuOutro: e.target.value })}
                placeholder="Ex: Amigo"
                className="w-full rounded-lg border border-accent p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            )}
            {!validateCurrentStep() && (
              <div className="text-red-500 text-xs mt-1 px-1">Por favor, selecione uma opção.</div>
            )}
            <Button 
              onClick={nextStep} 
              disabled={!validateCurrentStep()}
              className="w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próxima
            </Button>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={prevStep} className="text-primary hover:text-secondary transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <span className="text-primary font-semibold">
                Como pretende usar nossos designs? 
                <span className="text-xs text-muted-foreground">(Múltipla escolha)</span>
              </span>
            </div>
            <div className="space-y-2">
              {[
                'Para criar conteúdo no Instagram',
                'Para vender como social media',
                'Para estudar design',
                'Para um projeto pessoal',
                'Só por curiosidade',
                'Outro'
              ].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.uso.includes(option)}
                    onChange={(e) => handleUsoChange(option, e.target.checked)}
                    className="mr-2 rounded-full"
                  />
                  {option}
                </label>
              ))}
            </div>
            {formData.uso.includes('Outro') && (
              <Input
                type="text"
                value={formData.usoOutro}
                onChange={(e) => setFormData({ ...formData, usoOutro: e.target.value })}
                placeholder="Ex: Para um evento"
                className="w-full rounded-lg border border-accent p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            )}
            {!validateCurrentStep() && (
              <div className="text-red-500 text-xs mt-1 px-1">Por favor, selecione pelo menos uma opção.</div>
            )}
            <Button 
              onClick={nextStep} 
              disabled={!validateCurrentStep()}
              className="w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próxima
            </Button>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={prevStep} className="text-primary hover:text-secondary transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <span className="text-primary font-semibold">Você já usou o Canva antes?</span>
            </div>
            <div className="flex gap-4">
              {['Sim', 'Não'].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="canva"
                    value={option}
                    checked={formData.canva === option}
                    onChange={(e) => setFormData({ ...formData, canva: e.target.value })}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
            {!validateCurrentStep() && (
              <div className="text-red-500 text-xs mt-1 px-1">Por favor, selecione uma opção.</div>
            )}
            <Button 
              onClick={nextStep} 
              disabled={!validateCurrentStep()}
              className="w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Finalizar
            </Button>
          </div>
        );

      case 8:
        return (
          <div className="text-center space-y-4">
            <div className="text-3xl">🚀</div>
            <h2 className="text-xl font-bold text-primary">Obrigado! 🙌</h2>
            <p className="text-muted-foreground text-sm">
              Suas respostas foram salvas com sucesso.
              <br /><br />
              Agora você pode acessar a plataforma completa com templates e designs para você.
            </p>
            <Button 
              onClick={handleFinish}
              className="mt-6 w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors"
            >
              Acessar agora
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center font-poppins">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-secondary border-opacity-80"></div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md mx-auto mt-10 p-6 bg-[rgb(199, 231, 249)] rounded-xl shadow-lg relative">
        {/* Progress Bar */}
        <div className="bg-muted h-2 rounded-full overflow-hidden mb-8">
          <div 
            className="bg-secondary h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Step Content */}
        <div className="min-h-[300px] flex flex-col justify-center">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default Funnel;
