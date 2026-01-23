# Van Mageski — One Page (scroll contínuo)

Este pacote converte o site em **uma única página com scroll contínuo** (formato “infinite scroll” no sentido de narrativa longa), e o **menu superior desce automaticamente** até a seção clicada.

## Como rodar
Abra `index.html` no navegador. (Para desenvolvimento local, você pode usar qualquer servidor estático.)

## Estrutura
- `index.html` — todas as seções (Início, Sobre, Portfólio, Depoimentos, Agenda, Blog)
- `css/tokens.css` — tokens (cores, tipografia, espaçamentos)
- `css/styles.css` — layout + colagem + vignette/moldura + textura
- `js/main.js` — smooth scroll com offset, seção ativa no menu, modal do portfólio e filtros (placeholder)
- `assets/img/` — imagens placeholder (substituir por fotos reais)

## Substituir no GitHub
1. Clone o repo
2. (Opcional) crie uma tag de backup
3. Substitua os arquivos pela pasta deste pacote
4. Commit + push

## Próximos upgrades sugeridos
- Integrar formulário (Netlify Forms, Formspree, backend próprio)
- Trocar placeholders por fotos reais otimizadas (WebP/AVIF)
- Implementar galeria real (filtros por categoria + lazy-loading)