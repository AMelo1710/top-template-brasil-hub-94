import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FunnelData } from '@/types/funnel';

export const useFunnel = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [skippedSteps, setSkippedSteps] = useState<Set<number>>(new Set());
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
      setSkippedSteps(prev => new Set([...prev, 4])); // Marca o step 4 como pulado
      setCurrentStep(5); // Pula o estado
    } else {
      setCurrentStep(Math.min(currentStep + 1, totalSteps - 1));
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      let prevStep = currentStep - 1;
      
      // Se o step anterior foi pulado, volta para o step antes dele
      while (skippedSteps.has(prevStep) && prevStep > 0) {
        prevStep--;
      }
      
      setCurrentStep(prevStep);
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

  return {
    currentStep,
    totalSteps,
    progressPercent,
    isLoading,
    formData,
    setFormData,
    validateCurrentStep,
    nextStep,
    prevStep,
    handleUsoChange,
    handleFinish,
    skippedSteps
  };
}; 