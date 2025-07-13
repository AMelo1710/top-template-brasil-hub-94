import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FunnelStepProps } from '@/types/funnel';

const AgeStep = ({ formData, setFormData, onNext, onPrev, validateStep }: FunnelStepProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onPrev} className="text-primary hover:text-secondary transition-colors">
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
      {!validateStep() && formData.idade !== '' && (
        <div className="text-red-500 text-xs mt-1 px-1">A idade deve ser entre 8 e 99 anos.</div>
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

export default AgeStep; 