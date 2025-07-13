import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FunnelStepProps } from '@/types/funnel';

const DiscoveryStep = ({ formData, setFormData, onNext, onPrev, validateStep }: FunnelStepProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onPrev} className="text-primary hover:text-secondary transition-colors">
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
      {!validateStep() && (
        <div className="text-red-500 text-xs mt-1 px-1">Por favor, selecione uma opção.</div>
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

export default DiscoveryStep; 