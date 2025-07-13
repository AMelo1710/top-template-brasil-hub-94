
import React from 'react';
import { useFunnel } from '@/hooks/useFunnel';
import {
  WelcomeStep,
  NameStep,
  AgeStep,
  CountryStep,
  StateStep,
  DiscoveryStep,
  UsageStep,
  CanvaStep,
  ThankYouStep,
  ProgressBar,
  LoadingOverlay
} from '@/components/Funnel';

const Funnel = () => {
  const {
    currentStep,
    progressPercent,
    isLoading,
    formData,
    setFormData,
    validateCurrentStep,
    nextStep,
    prevStep,
    handleUsoChange,
    handleFinish
  } = useFunnel();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={nextStep} />;
      case 1:
        return (
          <NameStep
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onPrev={prevStep}
            validateStep={validateCurrentStep}
          />
        );
      case 2:
        return (
          <AgeStep
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onPrev={prevStep}
            validateStep={validateCurrentStep}
          />
        );
      case 3:
        return (
          <CountryStep
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onPrev={prevStep}
            validateStep={validateCurrentStep}
          />
        );
      case 4:
        return (
          <StateStep
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onPrev={prevStep}
            validateStep={validateCurrentStep}
          />
        );
      case 5:
        return (
          <DiscoveryStep
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onPrev={prevStep}
            validateStep={validateCurrentStep}
          />
        );
      case 6:
        return (
          <UsageStep
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onPrev={prevStep}
            validateStep={validateCurrentStep}
            handleUsoChange={handleUsoChange}
          />
        );
      case 7:
        return (
          <CanvaStep
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onPrev={prevStep}
            validateStep={validateCurrentStep}
          />
        );
      case 8:
        return <ThankYouStep onFinish={handleFinish} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center font-poppins">
      <LoadingOverlay isLoading={isLoading} />

      <div className="w-full max-w-md mx-auto mt-10 p-6 bg-[rgb(199, 231, 249)] rounded-xl shadow-lg relative">
        <ProgressBar progressPercent={progressPercent} />

        <div className="min-h-[300px] flex flex-col justify-center">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default Funnel;
