
import React from 'react';
import { Header, BottomNavigation, MoreOptionsModal, FeedbackModal } from './Layout/index';
import { useLayoutState } from '@/hooks/useLayoutState';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const {
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
  } = useLayoutState();

  return (
    <div className="min-h-screen bg-background font-poppins">
      <Header />
      
      <main className="pb-20">
        {children}
      </main>

      <BottomNavigation onMoreClick={handleMoreClick} />

      <MoreOptionsModal
        isOpen={showMoreModal}
        onClose={handleMoreModalClose}
        onFeedbackClick={handleFeedbackClick}
        onLogout={handleLogout}
      />

      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={handleFeedbackModalClose}
        feedback={feedback}
        onFeedbackChange={handleFeedbackChange}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
};

export default Layout;
