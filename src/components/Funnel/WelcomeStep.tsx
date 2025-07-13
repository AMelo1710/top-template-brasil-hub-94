import { Button } from '@/components/ui/button';

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
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
      <Button onClick={onNext} className="mt-6 w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors">
        Continuar
      </Button>
    </div>
  );
};

export default WelcomeStep; 