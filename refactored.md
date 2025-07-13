# Refatoração do Projeto - Progresso e Mapeamento

Legenda:
- ✔ Refatorado
- ❌ Pendente

## Páginas (src/pages)

- [ ] Home.tsx ❌
- [✔] Plataform.tsx ✔ (dividido em HeroSection, TemplateFilters, TemplateList, ProModal, useTemplateFilters)
- [✔] Search.tsx ✔ (dividido em SearchBar, SearchFilters, SearchResults, useSearch)
- [ ] Funnel.tsx ❌
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

- [✔] TemplateCard.tsx ✔
- [✔] Template/HeroSection.tsx ✔
- [✔] Template/TemplateFilters.tsx ✔
- [✔] Template/TemplateList.tsx ✔
- [✔] Template/ProModal.tsx ✔
- [✔] Search/SearchBar.tsx ✔
- [✔] Search/SearchFilters.tsx ✔
- [✔] Search/SearchResults.tsx ✔
- [ ] Layout.tsx ❌
- [ ] templateUtils.ts ❌
- [ ] ui/ (componentes genéricos) ✔

## Hooks (src/hooks)

- [✔] useTemplateFilters.ts ✔
- [✔] useSearch.ts ✔
- [ ] use-toast.ts ❌
- [ ] use-mobile.tsx ❌

## Contextos (src/contexts)

- [ ] AppContext.tsx ❌

## Utils (src/lib/utils.ts)

- [ ] utils.ts ❌

## Dados (src/data)

- [ ] templates.ts ❌

---

## Migrações/Divisões planejadas

- Plataform.tsx → components/Template/{HeroSection, TemplateFilters, TemplateList, ProModal, ...}, hooks/useTemplateFilters.ts
- Search.tsx → components/Search/{SearchBar, SearchFilters, SearchResults}, hooks/useSearch.ts
- Home.tsx → components/Home/{HeroSection, ...}
- Demais páginas: dividir em componentes de domínio conforme necessário
- Funções auxiliares → src/utils/
- Componentes visuais genéricos → src/components/ui/

---

**Atualize este arquivo a cada etapa da refatoração!** 