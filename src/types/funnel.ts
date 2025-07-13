export interface FunnelData {
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

export interface FunnelStepProps {
  formData: FunnelData;
  setFormData: (data: FunnelData) => void;
  onNext: () => void;
  onPrev: () => void;
  validateStep: () => boolean;
} 