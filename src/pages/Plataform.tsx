import React from 'react';
import HeroSection from '@/components/Template/HeroSection';
import TemplateFilters from '@/components/Template/TemplateFilters';
import TemplateList from '@/components/Template/TemplateList';
import ProModal from '@/components/Template/ProModal';
import useTemplateFilters from '@/hooks/useTemplateFilters';

export default function Plataform() {
  const filterProps = useTemplateFilters();
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <HeroSection />
      <TemplateFilters {...filterProps} />
      <TemplateList
        templates={filterProps.filteredTemplates}
        handleFavoriteToggle={filterProps.handleFavoriteToggle}
        handleSavedToggle={filterProps.handleSavedToggle}
        handleViewTemplate={filterProps.handleViewTemplate}
        isFavorite={filterProps.isFavorite}
        isSaved={filterProps.isSaved}
        renderCategoryTag={filterProps.renderCategoryTag}
        getPlatformBadge={filterProps.getPlatformBadge}
      />
      <ProModal
        open={filterProps.showProModal}
        onOpenChange={filterProps.setShowProModal}
        onGoToCart={filterProps.handleGoToCart}
      />
    </div>
  );
}