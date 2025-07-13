import React from 'react';
import { Heart, HeartCrack } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import TemplateCard from '@/components/TemplateCard';
import PageHeader from '@/components/PageHeader';
import RemoveConfirmationDialog from '@/components/RemoveConfirmationDialog';
import { useFavoritesState } from '@/hooks/useFavoritesState';

const Favorites: React.FC = () => {
  const {
    favorites,
    showRemoveModal,
    setShowRemoveModal,
    itemToRemove,
    handleRemove,
    confirmRemove,
    handleViewTemplate,
    handleGoBack
  } = useFavoritesState();

  if (favorites.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="Nenhum favorito ainda"
        description="Adicione templates aos seus favoritos para encontrá-los facilmente aqui"
        buttonText="Explorar Templates"
        onButtonClick={handleGoBack}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <PageHeader
        icon={Heart}
        title="Meus Favoritos"
        itemCount={favorites.length}
        iconClassName="text-red-500"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onRemove={handleRemove}
            onViewTemplate={handleViewTemplate}
            removeIcon={<HeartCrack className="w-4 h-4" />}
            emoji="❤️"
          />
        ))}
      </div>

      <RemoveConfirmationDialog
        isOpen={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        onConfirm={confirmRemove}
        title="Remover dos Favoritos"
        description={`Tem certeza que deseja remover "${itemToRemove?.title || ''}" dos seus favoritos?`}
      />
    </div>
  );
};

export default Favorites;