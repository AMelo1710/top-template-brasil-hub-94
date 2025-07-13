# Refatoração do Projeto - Progresso e Mapeamento

Legenda:
- ✔ Refatorado
- ❌ Pendente

## Páginas (src/pages)

- [✔] Home.tsx ✔ (dividido em Notification, Header, HeroSection, BenefitsSection, FooterSection, LoginForm, ForgotPasswordForm, useHomeState)
- [✔] Plataform.tsx ✔ (dividido em HeroSection, TemplateFilters, TemplateList, ProModal, useTemplateFilters)
- [✔] Search.tsx ✔ (dividido em SearchBar, SearchFilters, SearchResults, useSearch)
- [✔] Funnel.tsx ✔ (dividido em WelcomeStep, NameStep, AgeStep, CountryStep, StateStep, DiscoveryStep, UsageStep, CanvaStep, ThankYouStep, ProgressBar, LoadingOverlay, useFunnel)
- [ ] Signup.tsx ❌
- [ ] Login.tsx ❌
- [ ] Profile.tsx ❌
- [ ] Saved.tsx ❌
- [ ] Favorites.tsx ❌
- [ ] Cart.tsx ❌
- [ ] About.tsx ❌
- [ ] Contact.tsx ❌
- [ ] Terms.tsx ❌
- [ ] support.tsx ❌
- [ ] NotFound.tsx ❌

## Componentes (src/components)

### Componentes de Domínio

#### Template (src/components/Template/)
- [✔] HeroSection.tsx ✔
- [✔] TemplateFilters.tsx ✔
- [✔] TemplateList.tsx ✔
- [✔] ProModal.tsx ✔

#### Search (src/components/Search/)
- [✔] SearchBar.tsx ✔
- [✔] SearchFilters.tsx ✔
- [✔] SearchResults.tsx ✔

#### Home (src/components/Home/)
- [✔] Notification.tsx ✔
- [✔] Header.tsx ✔
- [✔] HeroSection.tsx ✔
- [✔] BenefitsSection.tsx ✔
- [✔] FooterSection.tsx ✔
- [✔] LoginForm.tsx ✔
- [✔] ForgotPasswordForm.tsx ✔
- [✔] index.ts ✔

#### Funnel (src/components/Funnel/)
- [✔] WelcomeStep.tsx ✔
- [✔] NameStep.tsx ✔
- [✔] AgeStep.tsx ✔
- [✔] CountryStep.tsx ✔
- [✔] StateStep.tsx ✔
- [✔] DiscoveryStep.tsx ✔
- [✔] UsageStep.tsx ✔
- [✔] CanvaStep.tsx ✔
- [✔] ThankYouStep.tsx ✔
- [✔] ProgressBar.tsx ✔
- [✔] LoadingOverlay.tsx ✔
- [✔] index.ts ✔

#### Layout (src/components/Layout/)
- [✔] Header.tsx ✔
- [✔] BottomNavigation.tsx ✔
- [✔] MoreOptionsModal.tsx ✔
- [✔] FeedbackModal.tsx ✔
- [✔] index.ts ✔

### Componentes Genéricos
- [✔] TemplateCard.tsx ✔
- [✔] Layout.tsx ✔ (dividido em Header, BottomNavigation, MoreOptionsModal, FeedbackModal, useLayoutState)
- [✔] templateUtils.ts ✔ (movido para src/utils/)
- [✔] ui/ (componentes genéricos) ✔

## Hooks (src/hooks)

- [✔] useTemplateFilters.ts ✔
- [✔] useSearch.ts ✔
- [✔] useHomeState.tsx ✔
- [✔] useFunnel.tsx ✔
- [✔] useLayoutState.tsx ✔
- [✔] useAppState.tsx ✔
- [✔] use-toast.ts ✔ (documentação adicionada)
- [✔] use-mobile.tsx ✔ (documentação adicionada)

## Tipos (src/types)

- [✔] funnel.ts ✔ (FunnelData, StepProps, StepComponent)
- [✔] app.ts ✔ (Template, User, AppContextType)

## Contextos (src/contexts)

- [✔] AppContext.tsx ✔ (refatorado com tipos separados e useAppState)

## Utils (src/utils/)

- [✔] templateUtils.ts ✔ (funções utilitárias para templates)
- [ ] utils.ts ❌

## Dados (src/data)

- [✔] templates.ts ✔ (dados dos templates)

---

## Novos Arquivos Criados Durante a Refatoração

### Componentes Extraídos:
- **Template/**: HeroSection, TemplateFilters, TemplateList, ProModal
- **Search/**: SearchBar, SearchFilters, SearchResults  
- **Home/**: Notification, Header, HeroSection, BenefitsSection, FooterSection, LoginForm, ForgotPasswordForm
- **Funnel/**: WelcomeStep, NameStep, AgeStep, CountryStep, StateStep, DiscoveryStep, UsageStep, CanvaStep, ThankYouStep, ProgressBar, LoadingOverlay
- **Layout/**: Header, BottomNavigation, MoreOptionsModal, FeedbackModal

### Hooks Criados:
- **useTemplateFilters.ts**: Lógica de filtros de templates
- **useSearch.ts**: Lógica de busca e filtros
- **useHomeState.tsx**: Estado e lógica da página Home
- **useFunnel.tsx**: Estado e lógica do funil multi-step
- **useLayoutState.tsx**: Estado e lógica do layout (modais, feedback, logout)
- **useAppState.tsx**: Estado global da aplicação (favoritos, salvos, carrinho, usuário)

### Tipos Criados:
- **funnel.ts**: Tipos para dados do funil e props dos steps
- **app.ts**: Tipos para contexto da aplicação (Template, User, AppContextType)

### Dados Organizados:
- **templates.ts**: Dados centralizados dos templates

### Utils Organizados:
- **templateUtils.ts**: Funções utilitárias para renderização de templates

### Arquivos de Índice:
- **Home/index.ts**: Exportações dos componentes Home
- **Funnel/index.ts**: Exportações dos componentes Funnel
- **Layout/index.ts**: Exportações dos componentes Layout

---

## Migrações/Divisões planejadas

- Plataform.tsx → components/Template/{HeroSection, TemplateFilters, TemplateList, ProModal, ...}, hooks/useTemplateFilters.ts
- Search.tsx → components/Search/{SearchBar, SearchFilters, SearchResults}, hooks/useSearch.ts
- Home.tsx → components/Home/{Notification, Header, HeroSection, BenefitsSection, FooterSection, LoginForm, ForgotPasswordForm}, hooks/useHomeState.tsx
- Funnel.tsx → components/Funnel/{WelcomeStep, NameStep, AgeStep, CountryStep, StateStep, DiscoveryStep, UsageStep, CanvaStep, ThankYouStep, ProgressBar, LoadingOverlay}, hooks/useFunnel.tsx
- Layout.tsx → components/Layout/{Header, BottomNavigation, MoreOptionsModal, FeedbackModal}, hooks/useLayoutState.tsx
- AppContext.tsx → types/app.ts, hooks/useAppState.tsx
- templateUtils.ts → utils/templateUtils.ts
- Demais páginas: dividir em componentes de domínio conforme necessário
- Funções auxiliares → src/utils/
- Componentes visuais genéricos → src/components/ui/

---

**Atualize este arquivo a cada etapa da refatoração!** 