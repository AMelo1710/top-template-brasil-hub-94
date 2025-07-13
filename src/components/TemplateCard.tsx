import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Bookmark, Calendar, HeartCrack, BookmarkMinus } from 'lucide-react';

interface TemplateCardProps {
  template: any;
  idx?: number;
  handleFavoriteToggle: (template: any) => void;
  handleSavedToggle: (template: any) => void;
  handleViewTemplate: (id: string) => void;
  isFavorite: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  renderCategoryTag: (category: string) => React.ReactNode;
  getPlatformBadge: (platform: string) => React.ReactNode;
  showActions?: boolean;
  showDate?: boolean;
  showTags?: boolean;
  favoriteIcon?: 'heart' | 'heart-crack';
  savedIcon?: 'bookmark' | 'bookmark-minus';
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  idx = 0,
  handleFavoriteToggle,
  handleSavedToggle,
  handleViewTemplate,
  isFavorite,
  isSaved,
  renderCategoryTag,
  getPlatformBadge,
  showActions = true,
  showDate = true,
  showTags = false,
  favoriteIcon = 'heart',
  savedIcon = 'bookmark',
}) => {
  // Imagens de exemplo (pode ser customizado via props futuramente)
  const images = [
    '/lovable-uploads/3b68387c-40d8-40f8-a7c8-3aef6a5fdb79.png',
    '/lovable-uploads/554c6cd2-0a8e-4771-bcad-ca383c01e503.png',
    '/lovable-uploads/d650c6e6-9831-4d95-9f50-c2ab47949c4d.png',
  ];
  const cardImages = images.map((img, i) => images[(i + idx) % images.length]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isImgHovered, setIsImgHovered] = React.useState(false);
  const goLeft = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + cardImages.length) % cardImages.length);
  };
  const goRight = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % cardImages.length);
  };

  // Renderizar ícone de favorito baseado na prop
  const renderFavoriteIcon = () => {
    if (favoriteIcon === 'heart-crack') {
      return <HeartCrack className={`w-4 h-4 ${isFavorite(template.id) ? 'fill-current' : ''}`} />;
    }
    return <Heart className={`w-4 h-4 ${isFavorite(template.id) ? 'fill-current' : ''}`} />;
  };

  // Renderizar ícone de salvo baseado na prop
  const renderSavedIcon = () => {
    if (savedIcon === 'bookmark-minus') {
      return <BookmarkMinus className={`w-4 h-4 ${isSaved(template.id) ? 'fill-current' : ''}`} />;
    }
    return <Bookmark className={`w-4 h-4 ${isSaved(template.id) ? 'fill-current' : ''}`} />;
  };

  return (
    <Card 
      key={template.id} 
      className="overflow-hidden hover:shadow-hover transition-all duration-300"
      data-template-id={template.id}
    >
      <CardHeader>
        <CardTitle className="text-xl text-primary">{template.title}</CardTitle>
      </CardHeader>
      {/* Carrossel de imagens com navegação manual e fundo reativo */}
      <div
        className={`relative h-40 flex items-center justify-center overflow-visible`}
        onMouseEnter={() => setIsImgHovered(true)}
        onMouseLeave={() => setIsImgHovered(false)}
      >
        {cardImages.map((img, i) => {
          let imgClass = 'transition-transform transition-all duration-[2500ms] ease-in-out';
          if (i === activeIndex) {
            if (isImgHovered) {
              imgClass += ' rounded-xl z-40 object-contain scale-[1.2] opacity-95 shadow-2xl';
            } else {
              imgClass += ' rounded-xl z-30 object-cover scale-75 opacity-100 shadow-lg';
            }
          } else {
            imgClass += ' z-10 scale-100 opacity-0 pointer-events-none';
          }
          return (
            <img
              key={img}
              src={img}
              alt={template.title}
              className={`absolute top-0 left-0 w-full h-full ${imgClass}`}
            />
          );
        })}
        {/* Botões de navegação só no hover */}
        {isImgHovered && (
          <>
            <button
              onClick={goLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white hover:scale-110 hover:shadow-lg rounded-full p-2 shadow z-40 transition-all duration-300"
              style={{ border: 'none' }}
              aria-label="Imagem anterior"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button
              onClick={goRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white hover:scale-110 hover:shadow-lg rounded-full p-2 shadow z-40 transition-all duration-300"
              style={{ border: 'none' }}
              aria-label="Próxima imagem"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
            </button>
          </>
        )}
      </div>
      <CardContent className="p-4 space-y-4">
        <p className="text-muted-foreground text-sm">{template.description}</p>
        <div className="mb-3 flex flex-wrap gap-2">
          {template.categories.map(category => renderCategoryTag(category)).filter(tag => tag !== null)}
          {getPlatformBadge(template.tool)}
        </div>
        {showTags && template.tags && (
          <div className="flex flex-wrap gap-1 mb-2">
            {template.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full border border-gray-200">{tag}</span>
            ))}
          </div>
        )}
        {showActions && (
          <div className="space-y-2">
            <Button className="w-full">
              Acessar este design
            </Button>
            <Button 
              variant="ghost" 
              className="w-full text-primary"
              onClick={() => handleViewTemplate(template.id)}
            >
              Acessar este design sem anúncios
            </Button>
          </div>
        )}
        <div className="flex items-center justify-between">
          {showDate && (
            <div className="flex items-center text-muted-foreground text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{template.date}</span>
            </div>
          )}
          {showActions && (
            <div className="flex items-center space-x-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleFavoriteToggle(template)}
                className={isFavorite(template.id) ? 'text-red-500' : 'text-muted-foreground'}
              >
                {renderFavoriteIcon()}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleSavedToggle(template)}
                className={isSaved(template.id) ? 'text-blue-500' : 'text-muted-foreground'}
              >
                {renderSavedIcon()}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateCard; 