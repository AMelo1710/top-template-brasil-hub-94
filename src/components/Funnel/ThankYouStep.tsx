import { Button } from '@/components/ui/button';

interface ThankYouStepProps {
  onFinish: () => void;
}

const ThankYouStep = ({ onFinish }: ThankYouStepProps) => {
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
        onClick={onFinish}
        className="mt-6 w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors"
      >
        Acessar agora
      </Button>
    </div>
  );
};

export default ThankYouStep; 