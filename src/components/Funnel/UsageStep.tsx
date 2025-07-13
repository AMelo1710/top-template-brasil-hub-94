import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FunnelStepProps } from '@/types/funnel';

interface UsageStepProps extends FunnelStepProps {
  handleUsoChange: (value: string, checked: boolean) => void;
}

const UsageStep = ({ formData, setFormData, onNext, onPrev, validateStep, handleUsoChange }: UsageStepProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onPrev} className="text-primary hover:text-secondary transition-colors">
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
      {!validateStep() && (
        <div className="text-red-500 text-xs mt-1 px-1">Por favor, selecione pelo menos uma opção.</div>
      )}
      <Button 
        onClick={onNext} 
        disabled={!validateStep()}
        className="w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Próxima
      </Button>
    </div>
  );
};

export default UsageStep; 