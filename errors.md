`` msg 1 - vc seria um programador profissional, e eu te mando essa msg oq vc entenderia que é para fazer, fui claro na minnha msg? "msg here" ``

`` msg 2 - gere o cenario com erro e sem erro "cenary here" ``

`` msg 3 - de um nome para este erro em ingles como este de exemplo "login-form-incomplete-after-signup-back-navigatio" ``

# Error 1 - login-form-incomplete-after-signup-back-navigation - **fixed**

Notei um comportamento inconsistente com o botão "Esqueceu sua senha?". Abaixo estão os dois cenários que identifiquei:

Cenário sem erro (comportamento esperado)
Acesso a página /home.

Clico no botão "Acessar plataforma".

Sou redirecionado para a página /login.

O botão "Esqueceu sua senha?" aparece corretamente.

Cenário com erro
Acesso diretamente a /login → botão aparece normalmente.

Clico no botão "Crie uma conta" → sou levado para a página /signup.

Na página /signup, clico em "Já tenho uma conta" para voltar ao /login.

Agora, o botão "Esqueceu sua senha?" não aparece mais.

Observação
Esse erro só acontece quando a navegação para /login é feita a partir da página /signup via o botão "Já tenho uma conta".

Provavelmente trata-se de um problema de renderização causado por navegação em SPA (Single Page Application), onde o estado da interface não está sendo resetado corretamente.

Se precisar, posso fornecer mais detalhes ou inspecionar o DOM/CSS quando o erro acontece. Pode verificar isso no código?

# Error 2 - country-question-skipped-but-state-question-shown-on-back **fixed**

Cenário sem erro (funcionamento esperado)
Fluxo com país = "Brasil"
Pergunta: "Você é de qual país?"

Resposta: Brasil

Ação: Clica em "Próxima"

Pergunta: "De qual estado você é?"

Ação: Clica em "Voltar"

Volta para a pergunta: "Você é de qual país?" ✅ (correto)

Fluxo com país ≠ "Brasil" (ex: Alemanha)
Pergunta: "Você é de qual país?"

Resposta: Escrevendo Alemanha

Ação: Clica em "Próxima"

Pula a pergunta de estado e vai direto para a próxima pergunta relevante no caso "Como você conheceu o TopTemplatesBrasil?"

Ação: Clica em "Voltar"

Volta para a pergunta: "Você é de qual país?" ✅ (correto)

Cenário com erro (comportamento atual)
Fluxo com país = "Brasil"
Pergunta: "Você é de qual país?"

Resposta: Brasil

Ação: Clica em "Próxima"

Pergunta: "De qual estado você é?"

Ação: Clica em "Voltar"

Volta para a pergunta: "Você é de qual país?" ✅ (correto)

Fluxo com país ≠ "Brasil" (ex: Alemanha)
Pergunta: "Você é de qual país?"

Resposta: Alemanha

Ação: Clica em "Próxima"

Pula a pergunta de estado (correto), vai para a próxima pergunta (ex: "Qual é a sua idade?")

Ação: Clica em "Voltar"

Volta para a pergunta: "De qual estado você é?" ❌ (errado, essa pergunta nunca deveria ter sido exibida)

# Error 3 - invalid-designs-rendered-from-missing-template-ids **fixed**

Cenário Sem Erro (Funcionamento Correto)
Contexto:
O arquivo templates.ts contém os IDs válidos de designs.

As páginas /plataform/saved e /plataform/favorites exibem somente os designs cujo ID está listado em templates.ts.

Qualquer design cujo ID não esteja em templates.ts não aparece na interface.

Exemplo:
templates.ts:

ts
Copiar
Editar
export const validTemplateIds = ['design-1', 'design-2'];
Designs salvos pelo usuário:

design-1 ✅

design-2 ✅

design-3 ❌ (não está em templates.ts)

Exibição esperada:

Página /plataform/saved: mostra apenas design-1 e design-2.

Página /plataform/favorites: mostra apenas design-1 e design-2.

Cenário Com Erro (Funcionamento Incorreto)
Contexto:
O arquivo templates.ts continua com os mesmos IDs válidos.

As páginas estão exibindo todos os designs salvos/favoritados, inclusive os que não estão em templates.ts, quando deveriam filtrar.

Exemplo:
templates.ts:

ts
Copiar
Editar
export const validTemplateIds = ['design-1', 'design-2'];
Designs salvos pelo usuário:

design-1 ✅

design-2 ✅

design-3 ❌ (inválido)

Exibição incorreta:

Página /plataform/saved: mostra design-1, design-2 e design-3 ❌

Página /plataform/favorites: idem

Problema:
O sistema não está filtrando corretamente com base em templates.ts, e designs inválidos ainda estão sendo exibidos.