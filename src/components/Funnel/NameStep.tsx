import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FunnelStepProps } from '@/types/funnel';

const NameStep = ({ formData, setFormData, onNext, validateStep }: FunnelStepProps) => {
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
        onClick={onNext} 
        disabled={!validateStep()}
        className="w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Próxima
      </Button>
    </div>
  );
};

export default NameStep; 