import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FunnelStepProps } from '@/types/funnel';

const CanvaStep = ({ formData, setFormData, onNext, onPrev, validateStep }: FunnelStepProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onPrev} className="text-primary hover:text-secondary transition-colors">
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
      {!validateStep() && (
        <div className="text-red-500 text-xs mt-1 px-1">Por favor, selecione uma opção.</div>
      )}
      <Button 
        onClick={onNext} 
        disabled={!validateStep()}
        className="w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Finalizar
      </Button>
    </div>
  );
};

export default CanvaStep; 