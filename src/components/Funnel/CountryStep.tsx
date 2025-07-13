import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FunnelStepProps } from '@/types/funnel';

const CountryStep = ({ formData, setFormData, onNext, onPrev, validateStep }: FunnelStepProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onPrev} className="text-primary hover:text-secondary transition-colors">
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
      {!validateStep() && (
        <div className="text-red-500 text-xs mt-1 px-1">Por favor, selecione um país.</div>
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

export default CountryStep; 