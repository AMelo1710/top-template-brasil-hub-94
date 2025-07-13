import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const useLayoutState = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleMoreClick = () => {
    setShowMoreModal(true);
  };

  const handleMoreModalClose = () => {
    setShowMoreModal(false);
  };

  const handleFeedbackClick = () => {
    setShowMoreModal(false);
    setShowFeedbackModal(true);
  };

  const handleFeedbackModalClose = () => {
    setShowFeedbackModal(false);
  };

  const handleFeedbackChange = (value: string) => {
    setFeedback(value);
  };

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    setShowMoreModal(false);
    navigate('/');
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      toast({
        title: "Feedback enviado",
        description: "Obrigado pelo seu feedback! Vamos analisar sua sugestão.",
      });
      setFeedback('');
      setShowFeedbackModal(false);
    }
  };

  return {
    showMoreModal,
    showFeedbackModal,
    feedback,
    handleMoreClick,
    handleMoreModalClose,
    handleFeedbackClick,
    handleFeedbackModalClose,
    handleFeedbackChange,
    handleLogout,
    handleFeedbackSubmit,
  };
}; 