import { useState } from 'react';

export const useNoAdsModal = () => {
  const [showNoAdsModal, setShowNoAdsModal] = useState(false);

  const openNoAdsModal = () => setShowNoAdsModal(true);
  const closeNoAdsModal = () => setShowNoAdsModal(false);

  return {
    showNoAdsModal,
    setShowNoAdsModal,
    openNoAdsModal,
    closeNoAdsModal
  };
}; 