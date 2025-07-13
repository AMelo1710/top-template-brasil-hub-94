import React from 'react';
import { Bookmark, BookmarkMinus } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import TemplateCard from '@/components/TemplateCard';
import PageHeader from '@/components/PageHeader';
import RemoveConfirmationDialog from '@/components/RemoveConfirmationDialog';
import { useSavedState } from '@/hooks/useSavedState';

const Saved = () => {
  const {
    saved,
    showRemoveModal,
    setShowRemoveModal,
    itemToRemove,
    handleRemove,
    confirmRemove,
    handleViewTemplate,
    handleGoBack
  } = useSavedState();

  if (saved.length === 0) {
    return (
      <EmptyState
        icon={Bookmark}
        title="Nenhum item salvo"
        description="Salve templates para visualizá-los posteriormente"
        buttonText="Explorar Templates"
        onButtonClick={handleGoBack}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <PageHeader
        icon={Bookmark}
        title="Items Salvos"
        itemCount={saved.length}
        iconClassName="text-blue-500"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {saved.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onRemove={handleRemove}
            onViewTemplate={handleViewTemplate}
            removeIcon={<BookmarkMinus className="w-4 h-4" />}
            emoji="🔖"
          />
        ))}
      </div>

      <RemoveConfirmationDialog
        isOpen={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        onConfirm={confirmRemove}
        title="Remover dos Salvos"
        description={`Tem certeza que deseja remover "${itemToRemove?.title || ''}" dos seus salvos?`}
      />
    </div>
  );
};

export default Saved;