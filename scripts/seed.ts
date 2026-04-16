/**
 * SEED SCRIPT - Churrasco Blog
 * 
 * Como usar:
 *   1. Copie .env.local.example para .env.local e preencha DATABASE_URL
 *   2. Execute: npx ts-node --project tsconfig.seed.json scripts/seed.ts
 * 
 * O script irá:
 *   - Criar as tabelas (caso não existam)
 *   - Inserir 40 artigos completos sobre churrasco
 */

import { neon, NeonQueryFunction } from '@neondatabase/serverless'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config({ path: '.env.local' })

const dbMode = process.env.DB_MODE || 'json'
const isNeon = dbMode === 'neon'

let sql: NeonQueryFunction<false, false> | null = null
if (isNeon) {
  sql = neon(process.env.DATABASE_URL!)
}

// ─────────────────────────────────────────────
//  ARTIGOS
// ─────────────────────────────────────────────
const articles = [
  // ─── 1 ───────────────────────────────────
  {
    slug: 'picanha-perfeita-guia-completo',
    title: 'Picanha Perfeita: O Guia Definitivo do Rei do Churrasco Brasileiro',
    excerpt: 'A picanha é o corte mais icônico do Brasil. Aprenda a escolher, temperar e assar a picanha perfeita com os segredos dos mestres churrasqueiros.',
    cover_image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200',
    categoria: 'cortes',
    tags: ['picanha', 'churrasco', 'cortes', 'brasil', 'carne'],
    author: 'Equipe Brasassado',
    read_time: 8,
    featured: true,
    published_at: '2024-01-15T10:00:00Z',
    content: `# Picanha Perfeita: O Guia Definitivo

A **picanha** é sem dúvida o corte mais amado e reverenciado do churrasco brasileiro. Não existe reunião de família, aniversário ou domingo de sol sem ela. Mas você sabia que a maioria das pessoas erra feio na hora de comprar e preparar?

## O que é a Picanha?

A picanha é um corte retirado da parte traseira do boi, mais precisamente da alcatra superior (músculo glúteo médio). Sua principal característica é a capa de gordura generosa que recobre um dos lados — essa gordura é *fundamental* para o sabor e a suculência.

### Anatomia do Corte

Um corte de picanha de qualidade deve pesar entre **1 a 1,5 kg**. Desconfie imediatamente de picanhas com mais de 1,5 kg — provavelmente incluem parte da alcatra ou do coxão mole, o que indica que o açougueiro não soube fazer o corte.

- **Peso ideal:** 900g a 1,3 kg
- **Capa de gordura:** mínimo 1 cm de espessura uniforme
- **Coloração:** vermelho vivo brilhante
- **Marmoreio:** veios de gordura intramuscular indicam sabor

## Como Escolher a Melhor Picanha

### Na Açougaria
Ao comprar, pressione levemente a carne. Ela deve ser firme mas ceder suavemente. A gordura deve ser branca ou levemente amarelada — nunca acinzentada.

**Raças que produzem excelentes picanhas:**
- Nelore (a mais comum no Brasil, ótima qualidade)
- Angus (mais marmoreada, sabor intenso)
- Wagyu (luxo absoluto, gordura entremeada)
- Cruzamento Nelore × Angus (melhor custo-benefício)

## Tempero: Menos é Mais

O maior pecado contra a picanha é o excesso de tempero. A carne de qualidade **não precisa** de marinadas elaboradas.

### O Tempero Clássico
Sal grosso. Somente sal grosso. Aplique generosamente na carne (nunca na gordura) e leve à grelha.

### Para Quem Quer Um Toque a Mais
- Sal grosso + pimenta-do-reino em grão moída na hora
- Sal grosso + alho amassado (esfregue e deixe 30 min)
- Flor de sal para finalizar (após assar)

> **Dica de mestre:** Nunca deixe a picanha marinar por mais de 1 hora. O sal em excesso desidrata a carne.

## Métodos de Preparo

### 1. No Espeto (o Clássico)
Dobre a picanha em formato de U com a gordura para fora. Espete firmemente. Asse a cerca de **40 cm do braseiro** por aproximadamente **30-40 minutos**, virando a cada 5-7 minutos.

**Temperatura interna ideal:**
- Mal passada: 52-55°C
- Ao ponto: 60-65°C
- Bem passada: 70°C+

### 2. Na Grelha
Corte a picanha em fatias de **3-4 cm** com a gordura. Asse na grelha quente — primeiro o lado da gordura até dourar (2-3 min), depois vire e finalize o ponto desejado.

### 3. Na Churrasqueira com Tampa (Low & Slow)
Para uma picanha inteira mais robusta:
1. Doure todos os lados em temperatura alta (5 min)
2. Reduza o calor, tampe e asse por 45-60 min
3. Deixe repousar 10 minutos antes de fatiar

## O Repouso: Etapa Ignorada

Depois de assar, **nunca** corte a picanha imediatamente! Os sucos precisam se redistribuir. Deixe descansar:
- Fatias: 3-5 minutos
- Peça inteira: 8-12 minutos

## Servindo

Fatie sempre **contra as fibras** da carne. Use uma tábua de madeira e uma faca bem afiada. A gordura deve estar dourada e crocante por fora, derretida por dentro.

**Acompanhamentos clássicos:** farofa de manteiga, vinagrete, pão de alho, arroz branco.

## Onde Comprar Online

Hoje é possível receber picanhas de altíssima qualidade em casa. Procure sempre por carne de origem rastreada e selos de qualidade SIF.

---
*A picanha é uma das poucas carnes no mundo onde simplicidade é sinônimo de perfeição. Respeite o corte, use bom carvão e deixe o fogo fazer o resto.*`
  },

  // ─── 2 ───────────────────────────────────
  {
    slug: 'asado-argentino-tudo-que-voce-precisa-saber',
    title: 'Asado Argentino: A Arte Sagrada do Churrasco dos Pampas',
    excerpt: 'Conheça os segredos do asado argentino, o ritual gastronômico mais importante da Argentina. Da parrilla ao chimichurri, tudo sobre esta tradição milenar.',
    cover_image: 'https://images.unsplash.com/photo-1529693662653-9d480530a697?w=1200',
    categoria: 'internacional',
    tags: ['asado', 'argentina', 'parrilla', 'internacional', 'chimichurri'],
    author: 'Equipe Brasassado',
    read_time: 10,
    featured: true,
    published_at: '2024-01-18T10:00:00Z',
    content: `# Asado Argentino: A Arte Sagrada dos Pampas

O **asado** não é apenas uma forma de preparar carne — é uma instituição cultural na Argentina, Uruguai e boa parte da América do Sul. Enquanto no Brasil o fogo rápido e o calor intenso são a norma, o asado preza pela paciência, pelo fogo baixo e pela conversa longa.

## A Filosofia do Asado

O asador (quem faz o asado) é figura de respeito. Não se apressar, nunca — o tempo é ingrediente fundamental. Um bom asado pode durar de 3 a 5 horas do começo ao fim. A carne assa devagar, em temperatura controlada, preservando sucos e desenvolvendo sabores complexos.

> "El asado es una filosofía de vida. No hay apuro." — dito popular argentino

## A Parrilla

A parrilla argentina é bem diferente da churrasqueira brasileira. Consiste numa grade inclinável (llamada "V") posicionada lateralmente ao fogo — não acima das brasas. O asador controla a temperatura *movendo a grelha*, não o fogo.

### Tipos de Parrilla
- **Parrilla de piso:** a mais tradicional, com tijolos e fogo no nível do chão
- **Parrilla elevada:** versão moderna, mais higiênica e controlável
- **Cruz criolla:** método ancestral — a carne assa espetada em cruzeiros de ferro ao lado do fogo

## Os Cortes Obrigatórios do Asado

### Entrañas (Fraldinha Grossa)
O corte mais famoso do asado. Músculo do diafragma, fibroso, com sabor intenso. Precisa de calor alto e assa rápido — de 5 a 7 minutos por lado.

### Vacío (Fraldinha / Aba de Filé)
Corte longo, com gordura na beirada. Assa lentamente, entre 45 minutos a 1 hora. A gordura deve derreter completamente.

### Asado de Tira (Costela Fatiada)
Costela cortada em tiras finas (1,5-2 cm). É o coração do asado. Assa por 40-60 minutos em fogo suave. Vira apenas uma vez.

### Chorizo
A linguiça argentina é grossa, temperada com vinho tinto, ervas e erva-doce. Assa por 20-25 minutos virando constantemente.

### Morcilla (Morcela)
Linguiça de sangue. Para os corajosos, é experiência obrigatória. Assa em fogo baixo por 15 minutos.

### Mollejas (Timo / Glândula)
As mollejas são a iguaria mais apreciada entre os entendidos. Fora crocante, interior cremoso. Exigem limpeza prévia e cocção lenta.

## O Fogo Perfeito para o Asado

No asado, usa-se **lenha**, não carvão (embora carvão também seja aceitável). A lenha de quebracho colorado é a preferida — queima devagar e produz brasas duradouras.

### Como Acender
1. Monte uma fogueira com lenha grossa em posição lateral à grelha
2. Deixe queimar até virar brasa viva (sem chamas)
3. Distribua as brasas sob a grelha progressivamente
4. **Nunca** deixe chamas tocarem a carne — amargueira o sabor

## Chimichurri Autêntico

O condimento-símbolo do asado. Há duas vertentes: o verde (fresco) e o rojo (com páprica).

### Receita Clássica (verde)
- 1 maço de salsinha bem picada
- 6 dentes de alho picados
- 1 colher (sopa) de orégano seco
- 1 colher (chá) de pimenta calabresa
- 1 colher (chá) de sal grosso
- 150 ml de azeite extra-virgem
- 50 ml de vinagre de vinho tinto

Misture tudo e deixe repousar 24h em temperatura ambiente. Melhora muito no segundo dia.

## A Ordem Correta de Servir

No asado, existe uma liturgia sagrada:
1. **Embutidos** (chorizo, morcilla) — enquanto a carne principal assa
2. **Mollejas e entrañas** — as mais rápidas
3. **Vacío e costelas** — os cortes principais
4. **Sobremesa** — dulce de leche obrigatório

## Diferenças com o Churrasco Brasileiro

| Aspecto | Asado Argentino | Churrasco Brasileiro |
|---------|-----------------|----------------------|
| Temperatura | Baixa e lenta | Alta e rápida |
| Combustível | Lenha (preferência) | Carvão |
| Tempero | Sal + chimichurri | Sal grosso |
| Duração | 3-5 horas | 1-2 horas |
| Cortes favoritos | Vacío, entrañas | Picanha, costela |

## O Asado como Ritual Social

O asado começa sempre com cerveja gelada e piadas. O asador nunca deve ser interrompido com sugestões. Há uma regra não-escrita: **quien asó, no lava**. Quem fez o churrasco não lava a louça.

---
*O asado argentino é prova de que paciência e fogo transformam carne em poesia.*`
  },

  // ─── 3 ───────────────────────────────────
  {
    slug: 'costela-bovina-no-bafo-receita-perfeita',
    title: 'Costela Bovina no Bafo: Segredos da Costela que Desmancha na Boca',
    excerpt: 'A costela no bafo é o prato mais aguardado em todo churrasco. Aprenda a técnica correta do bafo para uma costela macia, suculenta e irresistível.',
    cover_image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1200',
    categoria: 'receitas',
    tags: ['costela', 'bafo', 'receita', 'churrasco', 'boi'],
    author: 'Equipe Brasassado',
    read_time: 12,
    featured: true,
    published_at: '2024-01-22T10:00:00Z',
    content: `# Costela Bovina no Bafo: O Rei Absoluto do Churrasco

Há quem diga que a picanha é a rainha. Mas quando o assunto é **costela no bafo**, estamos falando de uma outra dimensão — horas de preparo, aromas que tomam conta do quintal, e uma carne que literalmente cai no osso. Isto é arte.

## Por Que o Bafo?

O método do bafo (também chamado de low & slow) consiste em envolver a costela em papel alumínio ou lona após selá-la, criando um ambiente úmido e quente onde o colágeno dos ossos se dissolve lentamente, lubrificando a carne por dentro.

O resultado: uma costela que não precisa de faca para se soltar.

## Escolhendo a Costela

### Tipos de Costela
- **Costela de janela (ripa):** corte plano entre os ossos, com boa proporção carne/gordura. A mais popular para o bafo.
- **Costela minga:** ossos mais finos, carne mais entremeada de gordura. Sabor intenso.
- **Costela ponta de agulha:** ossos mais curtos, porção mais nobre. Excelente para slow cooking.

### O que Procurar
Uma boa peça de costela deve ter:
- Ossos bem definidos e expostos nas extremidades
- Carne avermelhada e brilhante
- Gordura uniforme (nem muita, nem pouca)
- Sem cheiro ácido ou sulfuroso

## Ingredientes (para 3-4 kg de costela)

- 1 peça de costela de janela (3-4 kg)
- Sal grosso moído (2-3 colheres de sopa)
- Pimenta-do-reino moída (1 colher de chá)
- Alho em pó (1 colher de chá)
- Páprica defumada (1 colher de sopa)
- Papel alumínio (rolo resistente) ou lona de churrasco

### Rub Opcional (Mistura Seca)
- 2 col. sopa de sal grosso
- 1 col. sopa de açúcar mascavo
- 1 col. sopa de páprica defumada
- 1 col. chá de pimenta-do-reino
- 1 col. chá de cominho
- 1 col. chá de alho em pó
- ½ col. chá de cayena

## Passo a Passo: Costela no Bafo

### Etapa 1: Preparo (30 min antes)
1. Retire a membrana da face dos ossos (a "pele" que reveste os ossos). Comece por uma extremidade com a ponta de uma faca e puxe com papel toalha.
2. Aplique o rub generosamente em toda a superfície. Esfregue bem.
3. Se possível, deixe na geladeira de 2h a 12h para penetrar o tempero.

### Etapa 2: Acendendo o Fogo
Para a costela no bafo, precisamos de **temperatura controlada e sustentada**:
- Ideal: 120-150°C dentro da churrasqueira
- Use carvão premium ou lenha de eucalipto
- Distribua as brasas em apenas um lado (calor indireto)

### Etapa 3: A Selagem (45-60 min)
Leve a costela com o osso para baixo sobre o calor *indireto*. Deixe assar por 45-60 minutos sem mexer até formar uma crosta dourada.

### Etapa 4: O Bafo (3-4 horas)
Esta é a etapa mágica:
1. Retire a costela do fogo
2. Coloque sobre uma folha dupla de papel alumínio
3. Adicione ½ xícara de cerveja escura ou vinho tinto
4. Embrulhe herméticamente — sem folgas para vapor escapar
5. Retorne ao fogo indireto

**Tempo de bafo por peso:**
- 2 kg: 2,5-3 horas
- 3 kg: 3,5-4 horas
- 4+ kg: 4,5-5 horas

### Etapa 5: A Finalização (15-20 min)
Abra o alumínio com cuidado (sairá vapor quente!). Retorne a costela diretamente sobre as brasas para criar a crosta final. Asse 7-10 minutos de cada lado.

## Como Saber se Está Pronta

### Teste do Palito
Espete um palito ou garfo no meio da carne. Se entrar e sair sem resistência — igual a manteiga — está perfeita.

### Temperatura Interna
- 88-95°C: textura perfeita para pull (carne separando do osso)
- 96°C+: pode ficar seca demais

### Aparência
Os ossos devem estar expostos aproximadamente 1-2 cm nas extremidades — sinal que o colágeno se dissolveu e a carne recuou.

## Dicas de Mestre

🔥 **Nunca abra o alumínio antes de 2 horas.** Cada vez que você abre, perde vapor e calor.

🔥 **Madeira de frutífera** (laranja, maçã, cereja) adiciona sabor defumado incrível. Coloque chips de madeira sobre as brasas na fase do bafo.

🔥 **Cerveja no alumínio:** prefira Guinness ou cerveja preta. A maltosidade adiciona profundidade de sabor.

🔥 **Repouso:** após tirar do fogo, deixe repousar ainda embrulhada por 20-30 minutos. Os sucos se redistribuem.

## Molho para Costela

### BBQ Rápido
- 200g de extrato de tomate
- 3 col. sopa de mel
- 2 col. sopa de molho inglês
- 1 col. sopa de vinagre de maçã
- 1 col. chá de páprica defumada
- Sal e pimenta a gosto

Cozinhe em fogo médio por 10 minutos. Use para pincelar na fase final.

---
*A costela no bafo é a prova de que o melhor da vida requer tempo e paciência. Não existe atalho para a perfeição.*`
  },

  // ─── 4 ───────────────────────────────────
  {
    slug: 'como-acender-churrasqueira-perfeita',
    title: 'Como Acender a Churrasqueira Perfeita: Do Carvão à Brasa Ideal',
    excerpt: 'Acender a churrasqueira parece simples, mas existem técnicas que fazem toda a diferença. Aprenda como conseguir a brasa ideal sem fumaça e sem retrabalho.',
    cover_image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200',
    categoria: 'tecnicas',
    tags: ['carvão', 'fogo', 'técnica', 'churrasqueira', 'brasa'],
    author: 'Equipe Brasassado',
    read_time: 7,
    featured: false,
    published_at: '2024-01-25T10:00:00Z',
    content: `# Como Acender a Churrasqueira Perfeita

Nada mais frustrante do que reunir os amigos, pegar a carne da geladeira e passar meia hora soprando carvão sem conseguir acender a churrasqueira. Acender o fogo certo é uma habilidade — e vamos dominar ela agora.

## Por Que Muita Gente Erra

Os erros mais comuns:
- Usar álcool líquido (PERIGO! Pode causar explosões)
- Carvão úmido
- Pouca ventilação
- Pressa para colocar a carne antes da brasa estar pronta

## Escolhendo o Carvão Certo

### Carvão Vegetal vs Briquete

**Carvão vegetal** (o clássico brasileiro):
- Acende mais rápido
- Temperatura mais alta
- Dura menos
- Produz fumaça branca no início (normal)

**Briquete de carvão:**
- Leva mais tempo para acender (30-45 min)
- Temperatura mais estável e sustentada
- Dura muito mais (3-4 horas)
- Ideal para long and slow (costela, brisket)
- Pouca fumaça

### Como Escolher no Mercado
Bom carvão deve:
- Ser preto-mate (não cinza ou marrom)
- Ser leve para o tamanho (madeira carbonizada)
- Quebrar com estalo seco (não farelo)
- Ter embalagem seca

## Método 1: Pirâmide Simples (o Clássico)

1. Separe **2 folhas de jornal** amassadas levemente
2. Coloque no centro da churrasqueira
3. Empilhe carvão ao redor em formato de pirâmide (não muito apertado — precisa de ar)
4. Acenda o jornal por baixo em 2-3 pontos
5. **Nunca sopre imediatamente.** Deixe o fogo pegar por 3-4 minutos
6. Ventile suavemente com um abano ou ventilador em velocidade mínima
7. Aguarde 20-25 minutos até as bordas ficarem cinzas

## Método 2: Acendedor de Chaminé (o Profissional)

O acendedor de chaminé (ou "starter de carvão") é o método mais eficiente.

**Como usar:**
1. Coloque jornal amassado na câmara inferior
2. Encha a câmara superior com carvão
3. Acenda o jornal por baixo
4. Em 15-20 minutos o carvão estará pronto
5. Despeje as brasas na churrasqueira

Vantagens: sem produtos químicos, sem risco, mais rápido, carvão acende uniformemente.

## Método 3: Acendedor Natural (Pasta ou Cubo)

Os acendedores naturais (cubos de parafina, gel à base de álcool em gel) são seguros e práticos.

**Como usar:**
1. Distribua 3-4 cubos entre o carvão
2. Acenda
3. Aguarde 20 minutos

> ⚠️ **ATENÇÃO:** Jamais use álcool líquido em churrasqueira acesa ou com brasas. O risco de explosão é REAL e pode causar queimaduras graves.

## Como Saber se a Brasa Está Pronta

A brasa ideal para churrasco tem características específicas:

**✅ Brasa PRONTA:**
- Cobertura cinza-esbranquiçada em toda superfície
- Brilho laranja-avermelhado quando soprada
- Calor estável e uniforme
- Sem chamas vivas
- Sem fumaça branca densa

**❌ Brasa NÃO pronta:**
- Ainda preta no centro
- Muita fumaça branca
- Temperatura irregular

## Controlando o Calor

### Zonas de Temperatura
Monte sua churrasqueira em **duas zonas**:

**Zona quente** (direto): brasas espessas para selar carnes, assar frango
**Zona fria** (indireto): poucas brasas ou nenhuma, para finalizar sem queimar

### Como Regular
- **Mais calor:** adicione carvão + ventile mais
- **Menos calor:** afaste as brasas + feche a ventoinha da tampa
- **Temperatura estável:** monitore com termômetro de churrasqueira

## Manutenção Durante o Churrasco

A cada 45-60 minutos, adicione novo carvão nas bordas do braseiro. Nunca jogue carvão frio diretamente sobre a carne — ele libera fumaça que amarga o sabor.

---
*Um bom fogo é o segredo número 1 do churrasco. Domine essa etapa e metade do caminho está andado.*`
  },

  // ─── 5 ───────────────────────────────────
  {
    slug: 'tomahawk-steak-corte-mais-impressionante',
    title: 'Tomahawk Steak: Tudo Sobre o Corte Mais Impressionante do Mundo',
    excerpt: 'O Tomahawk Steak é o corte mais espetacular do mundo das carnes. Com seu osso de 40cm e marmoreio extraordinário, aprenda a preparar esta obra de arte.',
    cover_image: 'https://images.unsplash.com/photo-1607116667980-3b2a8b964bef?w=1200',
    categoria: 'cortes',
    tags: ['tomahawk', 'ribeye', 'cortes-americanos', 'premium', 'steak'],
    author: 'Equipe Brasassado',
    read_time: 9,
    featured: true,
    published_at: '2024-02-01T10:00:00Z',
    content: `# Tomahawk Steak: A Obra de Arte da Churrasqueira

Se você quer impressionar na churrasqueira, o **Tomahawk Steak** é a resposta. Com seu osso longo de 40-45 cm (que lembra o machado dos índios norte-americanos que dá nome ao corte), este é literalmente o rei dos steaks.

## O Que é o Tomahawk?

O Tomahawk é um **Ribeye** com o osso da costela intacto e aparado — o que os americanos chamam de "frenched rib bone". O músculo é o *Longissimus dorsi*, o mesmo do entrecôte e do prime rib. 

Características do corte:
- **Osso:** 40-45 cm de comprimento
- **Espessura:** 5-7 cm
- **Peso:** 1 a 1,5 kg por peça
- **Marmoreio:** altíssimo

## Por Que o Osso Longo?

O osso não serve apenas para estética — embora seja inegável que é absurdamente impactante na apresentação. O osso:
- Conduz calor de forma diferente, criando um gradiente de cozimento único
- Contribui com colágeno e tutano, enriquecendo o sabor
- Mantém a carne na forma durante o cozimento

## Classificação e Raças

Os melhores Tomahawks vêm de:

**Wagyu Japonês (A4-A5):** marmoreio extremo, manteiga comestível. Preço premium.

**Wagyu Americano:** menos marmoreado que o japonês, mas mais acessível com ótimo custo-benefício.

**Black Angus Certificado:** marmoreio choice/prime, sabor bovino robusto.

**Angus Nacional:** qualidade crescente, melhor opção custo-benefício no Brasil.

## Método Reverse Sear (O Mais Indicado)

Para um corte tão espesso, o método **reverse sear** (selagem reversa) é o mais eficiente:

### Etapa 1: Tempero
- Sal kosher ou sal grosso moído generosamente em ambos os lados
- Pimenta-do-reino em grão moída na hora
- Opcionais: alecrim fresco, alho amassado, manteiga de ervas

Seque bem a carne com papel toalha antes de temperar.

### Etapa 2: O "Low" (Temperatura Baixa)
1. Leve a churrasqueira ou forno a 110-120°C
2. Posicione o Tomahawk na zona de calor indireto
3. Insira termômetro digital no centro da carne (longe do osso)
4. Asse até atingir:
   - Mal passada: **46°C** internamente
   - Ao ponto: **52°C** internamente
5. Esse processo leva de 45 a 75 minutos

### Etapa 3: O "Sear" (Selagem em Alta Temperatura)
1. Aqueça a grelha em temperatura MÁXIMA (brasas brancas, grelha fumegante)
2. Sele o Tomahawk por **90 segundos** de cada lado
3. Sele também as laterais por 30 segundos cada
4. Use manteiga clarificada para pincelar durante a selagem

### Etapa 4: Repouso
Deixe repousar em uma tábua por **10-15 minutos** antes de fatiar. Cubra frouxamente com alumínio.

## Como Fatiar

1. Segure o osso verticalmente
2. Corte as fatias paralelas ao osso, com espessura de 1-1,5 cm
3. Sirva as fatias ainda juntas ao osso (visual impactante) ou separadas

## Acompanhamentos para Tomahawk

- **Manteiga composta:** manteiga + alho assado + salsinha + sal
- **Trufa negra ralada** (para ocasiões especiais)
- **Aspargos grelhados** com limão siciliano
- **Batatas hasselback** com bacon e queijo

## Preço e Onde Comprar

O Tomahawk premium no Brasil varia de R$ 150 a R$ 600+ por peça, dependendo da raça e marmoreio. Procure açougues especializados ou use afiliação com plataformas que vendem carnes premium online.

---
*O Tomahawk não é apenas uma refeição — é uma declaração. Quando aparece na mesa, todos param e fotografam.*`
  },

  // ─── 6 ───────────────────────────────────
  {
    slug: 'chimichurri-receita-autentica-argentina',
    title: 'Chimichurri Autêntico: A Receita Original da Argentina que Vai Mudar seu Churrasco',
    excerpt: 'Esqueça as versões industriais. O chimichurri autêntico argentino é simples, fresco e transforma qualquer carne. Receita original com segredos de Buenos Aires.',
    cover_image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c8?w=1200',
    categoria: 'acompanhamentos',
    tags: ['chimichurri', 'molho', 'argentina', 'acompanhamento', 'receita'],
    author: 'Equipe Brasassado',
    read_time: 5,
    featured: false,
    published_at: '2024-02-05T10:00:00Z',
    content: `# Chimichurri Autêntico: A Alma do Asado Argentino

O **chimichurri** é ao asado argentino o que a farinha de mandioca é ao churrasco brasileiro — essencial, insubstituível, identitário. Mas quantas versões industriais e diluídas circulam por aí? Vamos corrigir isso agora com a receita que todo *porteño* aprendeu com a avó.

## A História do Chimichurri

A origem do nome é disputada. Uma teoria popular diz que vem do inglês "Jimmy McCurry", um imigrante irlandês que teria criado o molho no século XIX. Outra versão atribui o nome a uma corruptela do basco "tximitxurri" (mistura de várias coisas). O que importa: é patrimônio gastronômico da América do Sul.

## Versão Verde (El Clásico)

### Ingredientes
- 1 maço generoso de salsinha fresca (só as folhas e caules mais finos)
- 6 dentes de alho
- 1 colher (sopa) de orégano seco de qualidade
- 1 colher (chá) de pimenta calabresa triturada
- 1 colher (chá) de sal grosso
- 150-180 ml de azeite extra-virgem
- 50 ml de vinagre de vinho tinto

### Modo de Preparo
1. Pique a salsinha finamente no fio da faca. **Nunca use liquidificador ou processador** — o calor das lâminas oxida a erva e escurece o molho.
2. Amasse o alho com o lado da faca e pique bem fino (ou rale na microplane).
3. Numa tigela, misture salsinha, alho, orégano, calabresa e sal.
4. Adicione o azeite aos poucos, mexendo.
5. Finalize com o vinagre.
6. Prove e ajuste sal/acidez.

### O Segredo do Reposo
**Esta é a parte mais importante:** deixe o chimichurri repousar em temperatura ambiente por pelo menos **24 horas** antes de usar. O molho no dia seguinte é completamente diferente — os sabores se integram, o alho suaviza, a salsinha "cozinha" levemente no ácido do vinagre.

Guarde em frasco fechado na geladeira por até 2 semanas. Sempre retire da geladeira 30 min antes de servir.

## Versão Roja (com Páprica)

### Ingredientes adicionais ao verde
- 2 colheres (sopa) de páprica defumada
- 1 colher (sopa) de páprica doce
- 1 tomate maduro sem sementes, picado fino

Misture a páprica junto com os demais temperos secos e finalize da mesma forma.

## Variações Regionais

**Chimichurri de Mendoza:** adiciona manjericão fresco e vinho Malbec no lugar do vinagre.

**Chimichurri Cordobês:** mais alho, menos salsinha, adiciona tomilho.

**Chimichurri Uruguay:** inclui cebolinha verde e pimenta fresca.

## Como Usar

- **Como molho de mesa:** num bowl ao lado da carne
- **Como marinada:** 4-6 horas antes de assar (excelente para frango e porco)
- **Como finalizador:** pincelado sobre a carne nos últimos 2 minutos de grelha
- **No pão:** misture com manteiga para o pão de alho definitivo

## Erros Comuns

❌ Usar salsinha italiana no lugar da crespa (mais amarga)
❌ Processar no liquidificador
❌ Servir imediatamente depois de fazer
❌ Usar vinagre branco (muito ácido)
❌ Exagerar no alho (domina o molho)

---
*Um bom chimichurri é como uma boa amizade: melhora com o tempo.*`
  },

  // ─── 7 ───────────────────────────────────
  {
    slug: 'churrasco-uruguaio-diferenca-brasil-argentina',
    title: 'Churrasco Uruguaio: O Elo Perdido entre Brasil e Argentina',
    excerpt: 'O Uruguai tem uma das tradições churrasqueiras mais ricas do mundo. Conheça os cortes únicos, técnicas e a cultura do asado uruguaio que pouca gente conhece.',
    cover_image: 'https://images.unsplash.com/photo-1611599538835-b52a8c2f9082?w=1200',
    categoria: 'internacional',
    tags: ['uruguai', 'asado', 'internacional', 'cortes', 'cultura'],
    author: 'Equipe Brasassado',
    read_time: 8,
    featured: false,
    published_at: '2024-02-10T10:00:00Z',
    content: `# Churrasco Uruguaio: A Tradição que Poucas Pessoas Conhecem

O Uruguai é um dos maiores consumidores de carne bovina per capita do mundo — cerca de 60 kg por habitante por ano. Com apenas 3,5 milhões de habitantes e 12 milhões de cabeças de gado, é um país que literalmente respira carne. E a cultura churrasqueira reflete isso.

## O Asado Uruguaio vs. Argentino

Embora muito similares, existem diferenças sutis mas importantes:

**No Uruguai, come-se a carne mais ao ponto** — os argentinos são mais tolerantes com o mal passado, mas os uruguaios preferem a carne rosada no centro, nunca sangrenta.

**A lenha é ainda mais sagrada no Uruguai.** O uso de lenha de "espinillo" (espinheiro nativo) ou eucalipto é quase religioso em muitas famílias.

**Os cortes têm nomes diferentes:** o que o argentino chama de "vacio" (fraldinha), o uruguaio chama de "cuadril trasero". A "entraña" argentina se chama "arrachera" no Uruguai.

## Cortes Típicos Uruguaios

### Tira de Asado
O equivalente à costela em tiras do asado argentino, mas no Uruguai é cortada ligeiramente mais grossa (2-2,5 cm). O sabor é mais intenso pela raça de gado predominante (Hereford × Angus).

### Cuadril (Alcatra)
No Uruguai, o "cuadril" ocupa o espaço que a picanha ocupa no Brasil. Corte inteiro, com gordura generosa, assado lentamente. É o protagonista do asado familiar.

### Pecho (Peito)
O peito bovino é muito mais valorizado no Uruguai do que no Brasil. Rico em colágeno, precisa de longa cocção. Comparável ao brisket americano.

### Mollejas
As mollejas (timo bovino) uruguaias são consideradas entre as melhores do mundo. A alimentação 100% natural do gado uruguaio confere sabor único e textura incomparável.

## A Raça Hereford Uruguaia

Diferente do Nelore que domina o Brasil, a raça **Hereford** predomina no Uruguai (junto com Angus e seus cruzamentos). Isso resulta em carnes com:
- Maior marmoreio natural
- Sabor mais suave e adocicado
- Gordura mais branca e firme
- Textura mais macia sem necessidade de amaciamento

## O Ritual do Asado Uruguaio

**O "Asado del domingo"** é quase sagrado. Começa cedo — o fogo é aceso às 10h, e come-se entre 13h e 14h. O processo lento é parte da celebração.

**Quem assa, manda.** Assim como na Argentina, o "asador" tem autoridade total sobre a churrasqueira. Interferir é falta de respeito.

**"Vuelta y vuelta" não existe.** No Uruguai, cada corte é assado uma única vez de cada lado, sem ficar virando constantemente. Paciência é virtude.

## Condimentos Uruguaios

### Salsa Criolla
Diferente do chimichurri, a salsa criolla uruguaia é mais fresca e menos condimentada:
- Tomate, cebola e pimentão vermelho em cubinhos pequenos
- Suco de limão
- Sal, pimenta e um toque de orégano
- Azeite

É quase uma vinagrete mais fresca — refrescante ao lado da carne intensa.

### Merken
Condimento chileno que ganhou espaço no Uruguai: pimenta merken (defumada) com coentro. Delicioso sobre mollejas e chorizo.

## Onde Comer Asado Uruguaio em Montevidéu

- **El Palenque (Mercado del Puerto):** o templo sagrado. Pratos fumegantes de costela, chorizo e mollejas desde 1868.
- **Estancia La Calandria:** experiência rural completa com asado campeiro.
- **Taberna del Asador:** referência de asado moderno na capital.

## Para Replicar em Casa

A grande "vantagem" do asado uruguaio para brasileiros é que **a carne uruguaia é importada legalmente para o Brasil** e disponível em algumas casas especializadas. A qualidade do gado Hereford uruguaio compensa o preço premium.

---
*O asado uruguaio é a prova de que grandes coisas às vezes vêm de países pequenos.*`
  },

  // ─── 8 ───────────────────────────────────
  {
    slug: 'wagyu-brasileiro-vale-a-pena',
    title: 'Wagyu Brasileiro: Vale a Pena? O Guia Honesto sobre o "Kobe" Nacional',
    excerpt: 'O Wagyu brasileiro cresceu muito nos últimos anos. Mas será que vale o preço? Comparamos com o japonês, o americano e damos um veredicto honesto.',
    cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
    categoria: 'cortes',
    tags: ['wagyu', 'premium', 'marmoreio', 'cortes', 'brasil'],
    author: 'Equipe Brasassado',
    read_time: 10,
    featured: false,
    published_at: '2024-02-14T10:00:00Z',
    content: `# Wagyu Brasileiro: A Verdade sobre o "Kobe" Nacional

Wagyu. A palavra virou sinônimo de luxo, excesso e marmoreio impossível. Mas o que acontece quando a genética japonesa encontra o pasto brasileiro? O resultado é surpreendente — mas há muito marketing inflado nessa história.

## O Que é Wagyu?

"Wagyu" em japonês significa literalmente "gado japonês" (wa = japonês, gyu = gado). Não é uma raça única, mas um grupo de quatro raças:

- **Kuroge Washu (Black):** 90% do Wagyu comercializado. O mais marmoreado.
- **Akage Washu (Red/Brown):** mais raro, sabor diferente
- **Nihon Tankaku Washu (Shorthorn):** quase extinto
- **Mukaku Washu (Polled):** sem chifres, raríssimo

O Wagyu que chega ao Brasil (e que é produzido aqui) é quase exclusivamente da raça **Kuroge Washu**.

## A Escala de Marmoreio BMS

O marmoreio do Wagyu é medido pela escala **BMS (Beef Marbling Standard)**, que vai de 1 a 12:

- BMS 1-3: carne regular
- BMS 4-5: Wagyu americano entry level
- BMS 6-7: Wagyu americano premium / Wagyu nacional premium
- BMS 8-9: Wagyu japonês A4
- BMS 10-12: Wagyu japonês A5 (o topo)

## Wagyu Japonês A5: O Original

O A5 japonês é a referência absoluta. O gado é criado em condições controladas por 28-30 meses (vs. 18-24 do gado comum), com dieta específica, massagens e música clássica (sim, isso é real em algumas fazendas).

**Características:**
- Gordura intramuscular atinge 30-40% da carne
- Ponto de fusão da gordura: 27-35°C (abaixo da temperatura corporal humana)
- A carne literalmente derrete na boca
- Preço: R$ 800-2.500 por kg para o A5 legítimo

## Wagyu Americano: O Meio-Termo

O Wagyu americano é geralmente cruzamento de Wagyu × Angus (chamado de F1). É excelente:
- BMS 6-8 na maioria dos casos
- Muito mais acessível que o japonês
- Sabor bovino mais pronunciado (herança do Angus)
- Preço: R$ 150-400/kg

## O Wagyu Brasileiro

Aqui está a parte que poucos falam com honestidade:

### A Genética
O Brasil tem plantéis de Wagyu puro registrado (Kuroge Washu) há mais de 20 anos. Mas a maioria do "Wagyu" vendido no mercado nacional é **F1** (50% Wagyu + 50% Nelore ou Angus), e muitas vezes até F2 (25% Wagyu).

### A Alimentação
O grande diferencial do Wagyu japonês é o confinamento com grãos específicos. No Brasil, muito Wagyu é criado em pasto (o que é mais saudável para o animal, mas resulta em menos marmoreio).

### O Marmoreio Real
O Wagyu nacional puro bem criado em confinamento atinge BMS 6-9 — muito bom. Mas o F1 em pasto fica entre BMS 4-6. Bom, mas não justifica sempre o preço cobrado.

### A Honestidade do Mercado
Muitos restaurantes e açougues vendem qualquer carne com marmoreio como "Wagyu". Exija sempre a certificação de raça e, idealmente, o BMS.

## Como Preparar Wagyu

O Wagyu tem peculiaridades importantes no preparo:

**Temperatura mais baixa:** a gordura começa a derreter a ~27°C. Asse em temperatura menor que o normal para não perder a gordura no fogo.

**Mal passado ou ao ponto:** nunca bem passado. A gordura seca e perde toda a graça.

**Sal, pimenta e nada mais:** não polua com temperos fortes. O sabor da gordura é o protagonista.

**Porções menores:** Wagyu A5 sacia rápido. 120-150g por pessoa é o suficiente (para uma entrada ou principal leve).

**Técnica japonesa:** corte em fatias finas (2-3mm) e asse rapidamente em teppan quente. Cada face: 20-30 segundos.

## Veredicto Honesto

| Tipo | Custo/kg | Marmoreio | Vale? |
|------|----------|-----------|-------|
| Wagyu Japonês A5 | R$800-2500 | BMS 10-12 | Para ocasiões especiais |
| Wagyu Americano | R$150-400 | BMS 6-8 | Sim, excelente custo-benefício |
| Wagyu BR Puro | R$120-300 | BMS 6-9 | Sim, se bem produzido e certificado |
| Wagyu BR F1 | R$80-180 | BMS 4-6 | Depende do preço cobrado |

---
*Wagyu de verdade é extraordinário. Mas cuidado: nem todo marmoreio vale o preço premium. Exija transparência.*`
  },

  // ─── 9 ───────────────────────────────────
  {
    slug: 'frango-na-churrasqueira-tecnicas-mestre',
    title: 'Frango na Churrasqueira: Como Fazer o Frango Mais Suculento da sua Vida',
    excerpt: 'O frango na churrasqueira parece simples, mas a maioria das pessoas erra na temperatura e acaba com frango ressecado. Técnicas infalíveis para o frango perfeito.',
    cover_image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=1200',
    categoria: 'tecnicas',
    tags: ['frango', 'técnica', 'churrasqueira', 'receita', 'suculento'],
    author: 'Equipe Brasassado',
    read_time: 8,
    featured: false,
    published_at: '2024-02-18T10:00:00Z',
    content: `# Frango na Churrasqueira: O Guia Definitivo

O frango é a segunda carne mais assada no Brasil, mas também a mais mal preparada. Ressecado por fora, cru por dentro, sem sabor, grudado na grelha... Os erros são muitos. Vamos acabar com isso de uma vez.

## O Problema do Frango na Churrasqueira

O frango tem um desafio único: é uma carne que precisa ser completamente cozida (ao contrário da bovina), mas que resseca facilmente se for superaquecida. A margem entre "perfeito" e "borracha" é pequena.

**Temperatura interna ideal:**
- Peito: 74°C
- Coxa e sobrecoxa: 77-82°C

## Técnica 1: Frango Inteiro no Espeto (o Clássico)

### Preparo
1. Peça ao açougueiro que abra o frango ao meio (butterflied) ou use um inteiro
2. Esfregue 2 colheres de sopa de sal grosso em toda a superfície, incluindo sob a pele
3. Misture 4 dentes de alho amassados + 2 col. sopa de azeite + ervas
4. Passe a mistura por toda a ave, especialmente sob a pele do peito
5. Marine por mínimo 4 horas (idealmente 24h na geladeira)

### No Espeto
- Monte no espeto central garantindo equilíbrio
- Prenda as asas e coxas com barbante culinário
- Asse a **40-45 cm do fogo** em temperatura média (não alta!)
- Tempo: 60-90 minutos girando continuamente
- Pinceie com manteiga aromatizada a cada 20 minutos

## Técnica 2: Spatchcock (Borboleta)

Esta técnica acelera o cozimento e garante peito e coxa prontos ao mesmo tempo.

### Como Fazer
1. Retire o osso da espinha com uma tesoura culinária
2. Abra o frango e pressione o peito para achatar
3. O resultado é um frango "borboleta" que assa uniformemente

### Na Grelha
- Coloque com a pele para baixo em calor direto por 5-7 min
- Vire e transfira para calor indireto
- Tampe e asse por 35-45 min até 74°C no peito

## Técnica 3: Beer Can Chicken (Frango na Lata)

A técnica mais divertida e que garante umidade incrível.

### Preparo
1. Abra uma lata de cerveja e beba/descarte metade
2. Adicione na lata: 2 dentes de alho, ervas, ½ limão
3. Esfregue o frango inteiro com rub seco generoso
4. "Sente" o frango sobre a lata (a lata vai dentro da cavidade)
5. Asse em churrasqueira fechada a 175-190°C por 75-90 minutos

A cerveja evapora dentro da cavidade, umedecendo e aromatizando por dentro.

## Marinadas que Funcionam

### Marinada Básica Brasileira
- 200ml de limão
- 4 dentes de alho
- 2 col. sopa de sal
- Pimenta, coentro, salsa, cebola

### Marinada Peri-Peri (Inspiração Africana/Portuguesa)
- 4 pimentas dedo-de-moça
- 6 dentes de alho
- 100ml de vinagre de vinho branco
- 100ml de azeite
- 1 col. sopa de páprica
- Suco de 2 limões
- Sal e orégano

Bata tudo no liquidificador. Marine por 12-24h.

### Marinada Asiática
- 4 col. sopa de molho de soja
- 2 col. sopa de mel
- 1 col. sopa de gengibre ralado
- 2 dentes de alho
- 1 col. sopa de óleo de gergelim

## O Segredo do Frango Suculento: A Salmoura

A **salmoura** (brine em inglês) é o segredo dos churrasqueiros americanos para frango sempre suculento:

**Salmoura Básica:**
- 1 litro de água
- 3 col. sopa de sal grosso
- 2 col. sopa de açúcar

Dissolva o sal e açúcar na água. Mergulhe o frango por 2-4 horas. Retire, seque e tempere normalmente.

A salmoura força água para dentro das células da carne, criando um "reservatório" que resiste ao ressecamento.

## Erros que Todo Mundo Comete

❌ **Temperatura alta demais:** queima por fora e fica cru por dentro
❌ **Sem termômetro:** tentar adivinhar o ponto é receita do desastre
❌ **Sem repouso:** cortar imediatamente faz sair todo o líquido
❌ **Direto da geladeira para o fogo:** tire 30-45 min antes de assar

---
*Frango bem feito na churrasqueira é mais saboroso que qualquer outro método de preparo. A técnica faz toda a diferença.*`
  },

  // ─── 10 ───────────────────────────────────
  {
    slug: 'short-rib-brisket-bbq-americano-brasil',
    title: 'Short Rib e Brisket: O BBQ Americano Chegou ao Brasil',
    excerpt: 'O BBQ americano estilo Texas e Kansas City conquistou o Brasil. Aprenda sobre short rib, brisket e as técnicas de defumação que estão revolucionando nosso churrasco.',
    cover_image: 'https://images.unsplash.com/photo-1610614991525-5a3a50d46b5d?w=1200',
    categoria: 'internacional',
    tags: ['brisket', 'short rib', 'bbq', 'americano', 'defumação'],
    author: 'Equipe Brasassado',
    read_time: 12,
    featured: false,
    published_at: '2024-02-22T10:00:00Z',
    content: `# Short Rib e Brisket: O BBQ Americano que Virou Febre no Brasil

Nos últimos 5 anos, o BBQ estilo americano explodiu no Brasil. De food trucks em São Paulo a churrasqueiros de quintal no interior, termos como "brisket", "short rib", "bark" e "stall" viraram linguagem comum. Mas o que faz o BBQ americano tão especial?

## A Filosofia Low and Slow

O BBQ americano (especialmente o estilo Texas) é baseado em um princípio simples e radical: **temperatura baixa por muito tempo**. Enquanto brasileiros e argentinos pensam em 2-3 horas, o pitmaster texano pensa em 12-18 horas.

Esse tempo longo a baixa temperatura (100-130°C) transforma colágeno em gelatina, dissolve gorduras intermusculares e cria uma crosta complexa chamada **bark** — a camada externa caramelizada que é, para muitos, a parte mais saborosa.

## O Brisket: O Rei do Texas BBQ

O brisket é o peito bovino — um corte naturalmente duro, cheio de colágeno, que se transforma em algo milagroso após 12-18 horas de defumação.

### Anatomia do Brisket
O brisket tem duas partes:
- **Flat (plano):** mais magro, maior, corta em fatias bonitas
- **Point (ponta):** mais gordo, marmoreado, usado para "burnt ends" (cubinhos caramelizados — a iguaria suprema do BBQ)

### Preparo do Brisket

**Rub Clássico Texas:**
- Sal kosher
- Pimenta preta grossa

Apenas isso. No Texas, adicionar mais ingredientes é considerado heresia.

**Processo:**
1. Retire o excesso de gordura (deixe 6mm de capa)
2. Aplique o rub e deixe na geladeira por 12-24h
3. Pré-aqueça o defumador a 107°C (225°F)
4. Madeira: carvalho (oak) ou mesquite
5. Asse até 165°F internamente (~8-10h)
6. Embrulhe em papel kraft (butcher paper) 
7. Continue até 200-205°F internamente (+4-6h)
8. Repouso de 2-4 horas embrulhado

**O "Stall":** entre 150-165°F, a temperatura para de subir por 2-4 horas. É normal. É a evaporação de água da superfície. Não entre em pânico.

## Short Rib: O Fenômeno do Mercado

O Short Rib (costela curta) é o corte que mais cresceu em popularidade nos últimos anos. Pode ser:

### Short Rib Plato (Chuck Short Rib)
- Ossos maiores (3-4 ossos)
- Carne espessa sobre cada osso
- Ideal para o método "dinosaur rib"
- Temperatura alvo: 95-97°C interno

### Short Rib Korean Style
- Cortado fino transversalmente (flanken cut)
- Perfeito para marinada e grelha rápida
- O favorito do churrasco coreano

### Preparo do Short Rib Chuck

**Rub:**
- 2 partes de sal
- 2 partes de pimenta preta grossa
- 1 parte de alho em pó
- 1 parte de páprica defumada

**Processo:**
1. Retire a membrana da face dos ossos
2. Aplique o rub
3. Defume a 120°C por 6-8 horas
4. Embrulhe com manteiga e mel quando atingir 75°C
5. Continue até 95-97°C

## Equipamentos para BBQ

Para quem quer se aventurar no BBQ americano, os equipamentos fazem diferença:

### Defumador Offset
O mais clássico. Câmara de fogo separada da câmara de cozimento. Calor e fumaça percorrem a câmara. Exige atenção constante.

### Defumador Bullet (Weber Smokey Mountain)
Excelente custo-benefício. Dois andares, fácil controle de temperatura, ótimo para iniciantes.

### Kettle (Weber Master-Touch)
A churrasqueira redonda clássica pode fazer BBQ se usada com técnica. Posicione carvão apenas de um lado, madeira sobre as brasas.

## Madeiras para Defumação

Cada madeira traz sabor diferente:
- **Carvalho (oak):** equilibrado, versátil, clássico para brisket
- **Nogueira (hickory):** intenso, defumado forte, ótimo para porco
- **Maçã (apple):** suave e doce, perfeito para frango e costela
- **Cereja (cherry):** cor avermelhada na carne, sabor frutado
- **Mesquite:** muito intenso, use com moderação

## O BBQ no Brasil

Hoje existem excelentes fornecedores de chips e chunks de madeira para defumação no Brasil. Os cortes americanos (short rib, brisket) estão disponíveis em açougues especializados e por e-commerce.

---
*O BBQ americano ensinou ao mundo que paciência e fogo baixo fazem milagres. Uma vez que você experimenta um brisket de 14 horas, não tem mais volta.*`
  },

  // ─── 11 ───────────────────────────────────
  {
    slug: 'farofa-perfeita-churrasco',
    title: 'Farofa Perfeita para Churrasco: 5 Receitas que Vão Roubar o Show',
    excerpt: 'A farofa é a alma do churrasco brasileiro. De clássica com bacon a versões gourmet com linguiça, estas 5 receitas vão mudar seu churrasco para sempre.',
    cover_image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1200',
    categoria: 'acompanhamentos',
    tags: ['farofa', 'acompanhamento', 'receita', 'churrasco', 'brasil'],
    author: 'Equipe Brasassado',
    read_time: 6,
    featured: false,
    published_at: '2024-02-26T10:00:00Z',
    content: `# Farofa Perfeita para Churrasco: As 5 Receitas Definitivas

A farofa é o mais brasileiro dos acompanhamentos. Sem farofa, o churrasco fica incompleto. Mas quantas pessoas ainda fazem aquela farofa sem graça, apenas manteiga e farinha? Vamos elevar o nível de uma vez.

## A Farinha Certa

Antes de mais nada: a qualidade da farinha de mandioca define tudo.

- **Farinha grossa:** textura crocante, ótima para farofa úmida
- **Farinha fina:** dissolve melhor em gordura, mais uniforme
- **Farinha d'água:** sabor azedinho característico, a mais tradicional
- **Farofa pronta temperada:** jamais. Não existe caminho curto para a farofa perfeita.

---

## Receita 1: Farofa Clássica com Bacon e Manteiga

A rainha absoluta. Simples, perfeita, inesquecível.

**Ingredientes (8 porções)**
- 200g de bacon em cubos
- 100g de manteiga sem sal
- 1 cebola grande picada
- 4 dentes de alho picados
- 2 xícaras de farinha de mandioca grossa
- Sal, pimenta-do-reino, salsinha
- 2 ovos mexidos (opcional)

**Modo de Preparo**
1. Frite o bacon em cubos até dourar e soltar a gordura
2. Na mesma panela, adicione a manteiga, cebola e alho
3. Refogue até dourar
4. Se usar ovos, adicione agora e mexa rapidamente
5. Adicione a farinha aos poucos, mexendo sempre em fogo médio
6. Ajuste sal e pimenta
7. Finalize com salsinha picada

---

## Receita 2: Farofa de Linguiça Caipira

A favorita das festas juninas e churrascos interioranos.

**Ingredientes**
- 300g de linguiça caipira (ou toscana) fatiada
- 150g de manteiga
- 1 cebola + 3 dentes de alho
- ½ pimentão vermelho picado
- 2 xícaras de farinha grossa
- Cebolinha a gosto

**Diferencial:** use a gordura que sair da linguiça como base para refogar os demais ingredientes. Sabor incomparável.

---

## Receita 3: Farofa Gourmet de Cogumelos

Para impressionar os convidados mais exigentes.

**Ingredientes**
- 200g de mix de cogumelos (shiitake, paris, funghi)
- 100g de manteiga de garrafa
- 1 cebola roxa picada
- 3 dentes de alho
- 50ml de vinho branco seco
- 2 xícaras de farinha fina
- Tomilho fresco, sal do Himalaia, pimenta rosa

**Modo especial:** refogue os cogumelos em manteiga alta até dourar bem. Deglaze com vinho. Adicione a farinha progressivamente. Finalize com as ervas frescas.

---

## Receita 4: Farofa de Banana

Clássico do norte e nordeste que o churrasco nacional deveria adotar.

**Ingredientes**
- 4 bananas-da-terra ou 5 bananas nanicas firmes (em rodelas)
- 100g de manteiga
- 1 cebola + 2 dentes de alho
- 1 xícara de farinha grossa torrada
- 50g de nozes picadas (opcional)
- Sal e canela em pó

**Dica:** frite as bananas até dourar antes de adicionar os demais ingredientes. Elas precisam caramelizar levemente.

---

## Receita 5: Farofa de Ovos com Ervas Frescas

A versão mais rica e proteica — perfeita para acompanhar picanha.

**Ingredientes**
- 5 ovos caipiras
- 120g de manteiga
- 1 cebola, 3 dentes de alho
- 2 xícaras de farinha d'água grossa
- Manjericão, salsinha, cebolinha (tudo fresco)
- Pimenta-do-reino, noz-moscada

**Segredo:** adicione os ovos levemente batidos sobre a manteiga e farinha e mexa rapidamente, criando pedaços pequenos. Não deixe cozinhar demais.

---

## Erros que Acabam com a Farofa

❌ Farinha crua ou muito úmida (precisa tostar na panela)
❌ Fogo alto que queima tudo antes de misturar
❌ Sal em excesso (a manteiga e o bacon já têm sal)
❌ Servir fria (a farofa deve chegar à mesa quente e crocante)

---
*A farofa é democrática — aceita qualquer ingrediente com carinho. Seja criativo e transforme o que tem em algo incrível.*`
  },

  // ─── 12 ───────────────────────────────────
  {
    slug: 'maminha-vs-fraldinha-qual-escolher',
    title: 'Maminha vs Fraldinha: Qual Escolher para o Churrasco?',
    excerpt: 'Maminha ou fraldinha? Muita gente confunde esses dois cortes. Descubra as diferenças de sabor, textura, preparo ideal e em qual situação cada um brilha mais.',
    cover_image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1200',
    categoria: 'cortes',
    tags: ['maminha', 'fraldinha', 'cortes', 'comparativo', 'churrasco'],
    author: 'Equipe Brasassado',
    read_time: 6,
    featured: false,
    published_at: '2024-03-01T10:00:00Z',
    content: `# Maminha vs Fraldinha: O Guia Definitivo

No açougue, muita gente aponta para um ou para o outro sem certeza. São cortes baratos, saborosos, mas com personalidades completamente diferentes. Hora de clareza.

## Onde Ficam no Boi?

**Maminha (Tri-tip):** localiza-se na parte inferior da alcatra, na região traseira. É a ponta triangular da peça de alcatra.

**Fraldinha (Flank Steak):** vem do abdômen do boi, entre as costelas e a alcatra. Músculo de trabalho, fibras longas e marcadas.

## Características Comparadas

| Aspecto | Maminha | Fraldinha |
|---------|---------|-----------|
| Textura | Macia e marmoreada | Fibrosa, firme |
| Sabor | Suave, levemente adocicado | Intenso, bovino forte |
| Gordura | Moderada, uniformemente distribuída | Pouca, apenas nas bordas |
| Fibras | Curtas, múltiplas direções | Longas, direcção única |
| Peso médio | 600-900g | 700-1200g |
| Preço | Médio-baixo | Médio-baixo |

## Maminha: A Versátil

### Características
A maminha é um corte triangular de textura macia e sabor suave. Por ter pouca gordura intramuscular mas boa distribuição do que tem, é uma carne que agrada paladares mais sensíveis.

### Como Preparar
**Na grelha inteira:**
1. Tempere com sal grosso e alho
2. Asse em calor médio-alto por 20-25 minutos
3. Vire apenas uma vez, quando soltar naturalmente da grelha
4. Ponto ideal: ao ponto (60-65°C)

**Fatiada:**
Corte em bifes de 2-3 cm na transversal das fibras. Asse em alta temperatura por 3-4 minutos por lado.

### Erros comuns na Maminha
- Assar em temperatura baixa demais (fica cozinhando no vapor)
- Fatiar ao longo das fibras (fica borrachuda)
- Excesso de tempero (mata o sabor suave)

## Fraldinha: A Saborosa

### Características
A fraldinha tem sabor muito mais pronunciado que a maminha — mais "de boi", mais complexo. Mas exige atenção: por ser fibrosa, mal preparada fica dura e difícil de mastigar.

### Como Preparar
**O Pulo do Gato: Marinar**
A fraldinha se beneficia muito de marinada ácida (limão, vinagre, vinho) que ajuda a quebrar as fibras:
- 2 horas: tempero penetra
- 6-12 horas: textura mais macia
- 24+ horas: pode começar a cozinhar a carne (ceviche effect)

**Na grelha:**
1. Leve ao fogo alto, brasas brancas
2. Sele cada lado por 2-3 minutos (sem mover)
3. Não passe do ponto médio (65°C) — fica muito seca
4. **FUNDAMENTAL:** corte sempre perpendicular às fibras, em ângulo de 45°

### Fraldinha para Fajitas e Tacos
Essa é a carne usada nos fajitas mexicanos (flank steak). Corte em tiras contra a fibra e sirva com guacamole, pico de gallo e tortilhas.

## Qual Escolher?

**Escolha a Maminha se:**
- Tem crianças ou pessoas que preferem carne mais macia
- Quer algo mais neutro que aceite bem qualquer acompanhamento
- Não tem tempo para marinar
- Quer servir inteira com boa apresentação

**Escolha a Fraldinha se:**
- Quer sabor intenso de boi
- Pode marinar com antecedência
- Vai servir fatiada ou em tiras
- Quer uma opção diferente com custo baixo

## Dica Bônus: Combinando as Duas

Em churrascos maiores, sirva as duas lado a lado fatiadas. A diferença de textura e sabor criam uma degustação interessante e os convidados adoram comparar.

---
*No churrasco brasileiro, não existe corte ruim — existe corte mal preparado. Conhecendo cada peça, você tira o máximo de qualquer carne.*`
  },

  // ─── 13 ───────────────────────────────────
  {
    slug: 'churrasco-cordeiro-perfeito',
    title: 'Churrasco de Cordeiro: O Guia Completo para Não ter Medo do Sabor Forte',
    excerpt: 'O cordeiro tem fama de sabor forte, mas quem sabe preparar produz uma carne nobre, saborosa e inigualável. Aprenda os segredos do cordeiro perfeito na churrasqueira.',
    cover_image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=1200',
    categoria: 'cortes',
    tags: ['cordeiro', 'carré', 'leg of lamb', 'churrasco', 'receita'],
    author: 'Equipe Brasassado',
    read_time: 10,
    featured: false,
    published_at: '2024-03-05T10:00:00Z',
    content: `# Churrasco de Cordeiro: Superando o Medo do "Smell"

"Não gosto de cordeiro, é forte demais." Quantas vezes você ouviu isso? A verdade é que cordeiro mal preparado pode ser pungente e enjoativo. Mas cordeiro bem preparado é uma das experiências mais nobres do mundo da carne. Vamos aprender a diferença.

## Por Que o Cordeiro tem Sabor "Forte"?

O sabor característico do cordeiro vem de ácidos graxos específicos (ácido branched-chain) presentes na gordura do animal. Essa gordura aumenta com a idade — daí a diferença entre:

- **Cordeiro:** menos de 12 meses. Gordura menor, sabor mais suave
- **Borrego:** 12-24 meses. Intermediário
- **Carneiro:** adulto. Sabor mais intenso

**A regra:** quanto menor a idade e menos gordura visível, mais suave o sabor. Compre sempre cordeiro jovem.

## Os Melhores Cortes para Churrasqueira

### Carré de Cordeiro (Rack of Lamb)
O corte mais nobre e impressionante. Costelas limpas com uma manta de carne excepcional por cima.

**Preparo:**
1. Retire o excesso de gordura (deixe apenas uma fina camada)
2. Esfregue: alho, alecrim fresco, azeite, sal e pimenta
3. Sele em grelha bem quente por 2 minutos por lado
4. Finalize em calor indireto por 8-12 minutos
5. Temperatura interna ideal: 57-60°C (ao ponto rosado)

### Paleta de Cordeiro (Shoulder)
Mais saborosa que o carré por ter mais colágeno. Mas exige mais tempo.

**Método slow:**
1. Faça incisões e insira dentes de alho e ramos de alecrim
2. Esfregue generosamente com sal grosso, pimenta, cominho
3. Asse em churrasqueira fechada ou forno a 150°C por 4-5 horas
4. Embrulhe no meio do processo para o bafo
5. Resultado: paleta que desmancha no toque

### Costela de Cordeiro
Cortada em tiras, similar à costela bovina, mas com cozimento muito mais rápido (1-1,5h).

### Perna de Cordeiro (Leg of Lamb)
Corte versátil — pode ser assado inteiro no espeto (1,5-2h) ou borboleta na grelha (45-60 min).

**Perna Borboleta:** Peça ao açougueiro para retirar o osso e abrir a perna como um livro. Asse na grelha em calor indireto.

## A Arte da Marinada para Cordeiro

Uma boa marinada não apenas aromatiza — ela neutraliza parte do sabor forte ao reagir quimicamente com as gorduras.

### Marinada Mediterrânea
- 4 ramos de alecrim fresco
- 6 dentes de alho amassados
- Suco de 2 limões
- 100ml de azeite
- 1 col. sopa de orégano seco
- Sal e pimenta
- Raspas de limão

Marine por 12-24 horas. Quanto mais tempo, mais suave o sabor.

### Marinada Marroquina (Chermoula)
- 1 maço de coentro
- 1 maço de salsinha
- 4 dentes de alho
- 2 col. chá de cominho
- 1 col. chá de cúrcuma
- 1 col. chá de canela
- 1 col. chá de páprica
- 100ml de azeite
- Suco de limão
- Sal

Bata no processador e marine por 24h.

## Molhos para Cordeiro

### Molho de Hortelã Clássico
- 1 maço de hortelã fresco
- 2 col. sopa de açúcar
- 4 col. sopa de vinagre de vinho branco
- 3 col. sopa de água quente

Pique a hortelã, misture com açúcar, vinagre e água. Repouse 30 minutos.

### Tzatziki (para o lado grego)
- 1 pote de iogurte grego
- ½ pepino ralado (escorra o líquido)
- 2 dentes de alho
- Azeite, hortelã, sal e limão

## Dicas de Mestre

🐑 **Temperatura da carne:** tire da geladeira 45 minutos antes de assar

🐑 **Nunca bem passado:** cordeiro seco é um crime. Mantenha rosado.

🐑 **Repouso obrigatório:** 8-10 minutos. A carne redistribui os sucos.

🐑 **Harmonize com vinho:** Syrah/Shiraz ou Malbec são perfeitos para cordeiro.

---
*Quem experimenta cordeiro bem preparado raramente volta atrás. É uma das carnes mais complexas e satisfatórias do mundo.*`
  },

  // ─── 14 ───────────────────────────────────
  {
    slug: 'churrasco-coreano-galbi-bulgogi',
    title: 'Churrasco Coreano: Galbi e Bulgogi para Fazer em Casa',
    excerpt: 'O churrasco coreano (KBBQ) conquistou o mundo com suas marinadas adocicadas e a experiência de grelhar à mesa. Aprenda galbi, bulgogi e as técnicas coreanas.',
    cover_image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=1200',
    categoria: 'internacional',
    tags: ['coreano', 'galbi', 'bulgogi', 'kbbq', 'internacional'],
    author: 'Equipe Brasassado',
    read_time: 8,
    featured: false,
    published_at: '2024-03-10T10:00:00Z',
    content: `# Churrasco Coreano: A Arte do KBBQ em Casa

O Korean BBQ (KBBQ) é uma das experiências gastronômicas mais interativas e saborosas do mundo. Carnes marinadas, grelhadas à mesa, envolvidas em folhas de alface com pasta de pimenta, kimchi e arroz. Nada igual.

## O Que é o KBBQ?

No KBBQ tradicional (gomtang), os comensais grelham a própria carne numa grelha embutida na mesa. Em casa, usamos uma grelha portátil ou a churrasqueira comum. A magia está nas marinadas — doces, salgadas, umami — que caramelizam lindamente.

## Galbi (갈비) - Costela Coreana

O Galbi é costela bovina cortada no estilo **flanken** — fatias finas (5-7mm) atravessando múltiplos ossos. No Brasil, peça "costela cortada transversal" ou "short rib flanken".

### Marinada de Galbi
**Ingredientes (para 1 kg):**
- 200ml de molho de soja
- 3 col. sopa de açúcar mascavo
- 2 col. sopa de mel
- 1 pera asiática ou meia maçã (ralada)
- 6 dentes de alho (ralados)
- 1 col. sopa de gengibre ralado
- 2 col. sopa de óleo de gergelim
- 50ml de vinho de arroz ou saquê
- Pimenta-do-reino

**Segredo:** a fruta (pera ou kiwi) contém enzimas que amaciamentem a carne naturalmente. A marinada deve durar de 4 a 24 horas.

### No Fogo
- Grelha bem quente
- 2-3 minutos por lado (cuidado: o açúcar queima rápido)
- Procure as marcas de grelha caramelizadas

## Bulgogi (불고기) - Carne de Fogo

Bulgogi significa literalmente "carne de fogo". É geralmente feito com contrafilé ou alcatra cortados finamente.

### Marinada de Bulgogi
- 200ml de molho de soja
- 2 col. sopa de açúcar
- 1 col. sopa de mel
- 1 pera (ralada)
- 5 dentes de alho
- 1 col. sopa de gengibre
- 2 col. sopa de óleo de gergelim
- 1 cebolinha cortada
- Pimenta-do-reino
- Gergelim

**Marine por 2-8 horas.** Grelhe rapidamente em temperatura alta.

## Samgyeopsal (삼겹살) - Barriga de Porco

O mais popular no KBBQ moderno. Barriga de porco em fatias de 5mm, sem marinada, grelha direto. A gordura derrete e carameliza lindamente.

**Como comer:** embrulhe numa folha de alface ou perilla com pasta doenjang (miso), alho assado, kimchi e um pedaço de carne.

## Os Acompanhamentos Essenciais (Banchan)

### Kimchi
O fermentado de repolho coreano — obrigatório. Se não tiver feito, compre em lojas asiáticas.

### Pasta Ssamjang
- 3 col. sopa de doenjang (pasta de soja fermentada)
- 2 col. sopa de gochujang (pasta de pimenta)
- 2 dentes de alho picados
- 1 col. chá de óleo de gergelim
- 1 col. chá de açúcar
- Cebolinha picada

### Baechu Geotjeori (Kimchi Fresco)
- Repolho cortado + molho de: gochugaru, alho, gengibre, sal, açúcar
- Versão "sem fermentar" — mais fresco e acessível

## A Experiência KBBQ em Casa

**O setup:**
1. Grelha portátil a gás ou elétrica no centro da mesa
2. Todos os banchan em bowls pequenos ao redor
3. Folhas de alface/perilla lavadas
4. Arroz branco
5. Tesoura para cortar a carne na grelha

**A ordem:**
1. Samgyeopsal primeiro (gordura lubrica a grelha)
2. Galbi
3. Bulgogi
4. Cogumelos e vegetais no final

---
*O KBBQ é mais que comida — é ritual social. A grelha no centro da mesa obriga a conversa, o compartilhamento e a cumplicidade.*`
  },

  // ─── 15 ───────────────────────────────────
  {
    slug: 'pao-de-alho-receita-perfeita',
    title: 'Pão de Alho Crocante: A Receita que Todo Churrasco Precisa',
    excerpt: 'O pão de alho é o acompanhamento mais amado do churrasco brasileiro. Aprenda a receita com creme de alho caseiro, manteiga aromatizada e o segredo da crocância.',
    cover_image: 'https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=1200',
    categoria: 'acompanhamentos',
    tags: ['pão de alho', 'acompanhamento', 'receita', 'churrasco'],
    author: 'Equipe Brasassado',
    read_time: 5,
    featured: false,
    published_at: '2024-03-14T10:00:00Z',
    content: `# Pão de Alho Perfeito: O Acompanhamento Rei do Churrasco

Se a picanha é a rainha do churrasco, o pão de alho é o jesteér que faz o acompanhamento ser inesquecível. Crocante por fora, macio por dentro, recheado com manteiga de alho que derrete... Impossível resistir.

## O Pão Certo

A escolha do pão faz diferença enorme:

**Pão italiano (a melhor escolha):** casca dura, miolo denso. Aguenta bem o calor sem desintegrar.

**Baguete:** opção prática e acessível. Boa crocância quando bem assada.

**Pão de forma:** só em último caso. Fica muito úmido.

**Pão francês:** aceitável se comprado fresco do dia.

## A Manteiga de Alho Caseira

Aqui está o segredo que separa o pão de alho comum do extraordinário.

### Versão Clássica
- 200g de manteiga sem sal (temperatura ambiente)
- 6-8 dentes de alho (não use o industrial em pasta — use fresco)
- 1 maço de salsinha picada fina
- Sal a gosto
- Pimenta-do-reino

**Como fazer o alho:** não use cru e fatiado. Asse os dentes de alho (com casca) direto na brasa por 15 minutos até amolecer. Retire a casca e amasse. O alho assado é mais suave e adocicado.

Misture tudo até homogêneo. Pode guardar na geladeira por até 1 semana.

### Versão Gourmet com Cream Cheese
- 150g de manteiga
- 100g de cream cheese
- 6 dentes de alho assado
- Ceboulette (cebolinha francesa)
- Flor de sal
- Pimenta branca

A adição do cream cheese cria uma textura cremosa que não escorre tanto no forno.

### Versão Picante
- Manteiga base
- Alho assado
- 2 pimentas dedo-de-moça sem sementes (picadas finas)
- Páprica defumada
- Coentro

## Preparo na Churrasqueira

### Técnica 1: Embrulhado em Alumínio
1. Corte o pão em fatias de 3cm sem separar completamente (como uma flor)
2. Espalhe manteiga generosamente entre cada corte
3. Embrulhe bem em papel alumínio
4. Leve à grelha sobre brasa média por 8-10 minutos
5. Abra o alumínio nos últimos 3 minutos para tostar a superfície

### Técnica 2: Direto na Grelha
1. Corte o pão ao meio no sentido do comprimento
2. Espalhe a manteiga
3. Coloque com o lado da manteiga para cima, na grelha
4. Asse por 3-4 minutos até a base tostar
5. Gire brevemente para tostar o topo

### Técnica 3: Na Chapa de Ferro
A chapa de ferro fundido é o melhor método — calor uniforme, crocância perfeita.
1. Aqueça a chapa bem quente
2. Coloque os pães com manteiga para baixo
3. Pressione levemente
4. 2-3 minutos e está pronto

## Variações Criativas

### Pão de Alho com Queijo
Adicione queijo mussarela ou parmesão ralado antes de embrulhar. O queijo derrete e gratina.

### Pão de Alho com Linguiça
Intercale fatias de linguiça toscana entre as fatias de pão. Asse embrulhado.

### Bruschetta ao Estilo Churrasco
Fatias de baguete tostadas direto na grelha, esfregadas com alho cru e regadas com azeite + tomate fresco + manjericão.

---
*O pão de alho é o responsável por "acabar antes da carne chegar". Sempre faça o dobro do que acha que vai precisar.*`
  },

  // ─── 16 ───────────────────────────────────
  {
    slug: 'carvao-vs-gas-qual-churrasqueira-escolher',
    title: 'Carvão vs Gás vs Elétrica: Qual Churrasqueira Escolher?',
    excerpt: 'A eterna batalha: churrasqueira a carvão, a gás ou elétrica? Análise honesta de cada opção com prós, contras, custo e qual é a ideal para cada perfil.',
    cover_image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=1200',
    categoria: 'equipamentos',
    tags: ['churrasqueira', 'equipamentos', 'carvão', 'gás', 'comparativo'],
    author: 'Equipe Brasassado',
    read_time: 7,
    featured: false,
    published_at: '2024-03-18T10:00:00Z',
    content: `# Carvão vs Gás vs Elétrica: O Guia Definitivo para Escolher sua Churrasqueira

Uma das maiores discussões do mundo do churrasco: carvão é superior ao gás? A elétrica entrega resultado de verdade? Vamos acabar com o debate de uma vez com análise técnica e honesta.

## Churrasqueira a Carvão: A Tradição

### Como Funciona
Carvão ou lenha geram brasas que irradiam calor para a carne. A gordura que goteja nas brasas cria fumaça aromática que adiciona sabor.

### Prós
✅ **Sabor inigualável:** a fumaça, o defumado, o aroma — nada replica
✅ **Temperatura altíssima:** brasas chegam a 700°C, perfeitas para selagem
✅ **Versatilidade:** funciona para tudo, do espeto ao bafo
✅ **Ritual:** acender o fogo é parte da experiência
✅ **Custo inicial baixo:** uma churrasqueira básica a carvão começa em R$150

### Contras
❌ Tempo de preparo: 30-45 minutos para ter brasa
❌ Não funciona em tempo ruim/chuva facilmente
❌ Exige espaço externo (fumaça)
❌ Mais difícil controlar temperatura com precisão
❌ Limpeza mais trabalhosa

### Para Quem É Ideal
- Quem tem quintal ou área externa
- Churrasqueiros que gostam do processo
- Quem preza pelo sabor acima de tudo
- Grupos grandes e festas

---

## Churrasqueira a Gás: A Praticidade

### Como Funciona
Queimadores a gás (GLP ou GN) aquecem grades cerâmicas ou de lava que irradiam calor para a carne. Não há brasa real.

### Prós
✅ **Ignição instantânea:** pronta em 10-15 minutos
✅ **Controle de temperatura preciso:** knob por zona
✅ **Pode usar em apartamentos** (com ventilação adequada)
✅ **Facilidade de limpeza**
✅ **Replicabilidade:** resultados mais consistentes

### Contras
❌ **Sabor:** não tem a mesma complexidade do carvão (mas é uma diferença que muitos não notam)
❌ **Custo inicial alto:** boas churrasqueiras a gás custam R$2.000-8.000+
❌ **Custo de gás:** especialmente com uso intenso
❌ **Temperatura máxima menor:** raramente passa de 450-500°C
❌ Não gera fumaça de carvão (o que para alguns é pró)

### Para Quem É Ideal
- Apartamentos com área de lazer bem ventilada
- Quem usa a churrasqueira frequentemente (praticidade compensa)
- Famílias com crianças (mais seguro)
- Churrasqueiros mais "técnicos" que controlam temperatura

---

## Churrasqueira Elétrica: A Acessível

### Como Funciona
Resistência elétrica aquece uma grade ou chapa. Não há fogo nem brasa.

### Prós
✅ Uso em apartamentos sem restrições
✅ Custo inicial muito baixo (R$100-500)
✅ Segura e fácil de usar
✅ Limpeza muito fácil
✅ Funcionamento em qualquer tempo

### Contras
❌ **Sabor:** a mais distante do churrasco tradicional
❌ Temperatura limitada (200-250°C)
❌ Não sela carne de forma eficiente
❌ Tem dificuldade com cortes espessos
❌ Não funciona bem para métodos lentos
❌ Pode ser proibida em alguns condomínios por consumo elétrico

### Para Quem É Ideal
- Apartamentos pequenos com restrição total
- Uso esporádico (uma vez por mês)
- Estudantes ou solteiros
- Quem prioriza conveniência sobre sabor

---

## Comparativo Final

| Critério | Carvão | Gás | Elétrica |
|----------|--------|-----|---------|
| Sabor | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| Praticidade | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Custo inicial | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Temperatura | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Versatilidade | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| Uso em apt. | ❌ | ⚠️ | ✅ |

## O Veredito

**Melhor sabor absoluto:** Carvão (+ lenha)
**Melhor custo-benefício geral:** Gás (para churrascos frequentes)
**Melhor para apartamento:** Elétrica (com limitações) ou gás (com ventilação)

---
*A melhor churrasqueira é aquela que você vai usar com mais frequência. Nenhum equipamento supera a falta de uso.*`
  },

  // ─── 17 ───────────────────────────────────
  {
    slug: 'coração-frango-espeto-churrasco',
    title: 'Coração de Frango no Espeto: O Petisco Mais Amado do Brasil',
    excerpt: 'O espetinho de coração é o petisco obrigatório em qualquer churrasco brasileiro. Aprenda a limpar, temperar e assar para conseguir o coração crocante por fora e rosado por dentro.',
    cover_image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200',
    categoria: 'receitas',
    tags: ['coração de frango', 'espeto', 'petisco', 'churrasco', 'receita'],
    author: 'Equipe Brasassado',
    read_time: 5,
    featured: false,
    published_at: '2024-03-22T10:00:00Z',
    content: `# Coração de Frango no Espeto: O Petisco Imbatível

Se você perguntar para qualquer brasileiro qual é o primeiro item que vai para a grelha no churrasco, a resposta será sempre: **coração de frango**. Pequeno, rápido de assar, barato e absurdamente saboroso quando bem feito.

## Limpeza: Etapa Negligenciada

O coração de frango precisa de uma limpeza simples mas importante:

1. Retire qualquer excesso de gordura amarelada nas bordas
2. Corte a parte superior onde entram os vasos sanguíneos (a parte mais dura)
3. Pressione levemente para remover coágulos de sangue
4. Lave em água fria corrente
5. Seque bem com papel toalha

Corações bem limpos e secos temperam e assam muito melhor.

## Temperos Infalíveis

### O Clássico Brasileiro
- Sal grosso moído
- Alho (amassado, não em pó)
- Pimenta-do-reino
- Azeite
- Suco de limão

Marine por 30 minutos a 2 horas.

### Tempero da Feira
- Sal, alho, pimenta
- Colorau (urucum)
- Orégano
- Pimenta calabresa

### Tempero Asiático
- Molho de soja
- Mel
- Gengibre
- Alho
- Óleo de gergelim

Marine por 1-2 horas.

## Montando o Espeto

Este é um detalhe que faz diferença:

1. Espete os corações na **lateral** (não no topo) para ficarem firmes
2. Enfile de 8-12 unidades por espeto (não muitos — perdem temperatura uniformidade)
3. Todos no mesmo sentido, bem próximos
4. Use espetos finos de metal ou bambu previamente embebidos em água

## Assando: O Ponto Perfeito

O coração de frango tem um ponto ideal muito específico:

**Certo:** crocante por fora com marcas da grelha, levemente rosado por dentro
**Errado:** completamente cinza por dentro (seco e sem graça) ou completamente vermelho por dentro (cru)

### Método
1. Brasa bem quente (não é para coração o fogo médio)
2. Posicione a ~25 cm das brasas
3. Asse 3-4 minutos de um lado **sem mexer**
4. Vire e asse mais 3-4 minutos
5. Vire mais 2x brevemente para finalizar todos os lados

**Tempo total:** 8-12 minutos

### Teste do Ponto
Aperte levemente um coração entre os dedos:
- Mole demais: ainda cru
- Firme mas com leve ceder: perfeito
- Duro: passou do ponto

## Servindo

Tempere com sal extra assim que sair do fogo (o calor ajuda o sal a penetrar). Sirva imediatamente sobre tábua de madeira com:
- Limão cortado
- Molho vinagrete
- Pimenta dedo-de-moça fresca fatiada

## Dicas de Churrasqueiro

🍗 **Não misture com outras carnes no espeto.** Corações têm tempo de cozimento diferente.

🍗 **Compre sempre fresco.** Coração congelado perde textura e suculência.

🍗 **Sal na saída, não na entrada.** O sal desidrata se ficar muito tempo. Uma leve pincelagem de azeite com sal meia hora antes já é suficiente.

🍗 **Quantidade:** 200-300g por pessoa como petisco, 400-500g como prato principal.

---
*O coração de frango é prova que nas coisas simples mora a maior sabedoria. Barato, acessível e capaz de esvaziar qualquer mesa antes da picanha chegar.*`
  },

  // ─── 18 ───────────────────────────────────
  {
    slug: 'vinagrete-brasileira-receita-classica',
    title: 'Vinagrete Perfeita: A Receita Clássica Brasileira que Vai com Tudo',
    excerpt: 'A vinagrete é o acompanhamento mais refrescante do churrasco brasileiro. Aprenda a receita clássica com o equilíbrio certo de ácido e frescor.',
    cover_image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200',
    categoria: 'acompanhamentos',
    tags: ['vinagrete', 'acompanhamento', 'receita', 'churrasco'],
    author: 'Equipe Brasassado',
    read_time: 4,
    featured: false,
    published_at: '2024-03-26T10:00:00Z',
    content: `# Vinagrete Perfeita: A Receita que Refresca o Churrasco

No churrasco brasileiro, a vinagrete não é opcional — é obrigatória. Essa mistura fresca de tomate, cebola e pimentão corta a gordura da carne e refresca o paladar entre um pedaço e outro. Mas poucos fazem corretamente.

## Os Ingredientes Certos

### A Proporção Clássica (para 8 pessoas)
- 4 tomates maduros mas firmes
- 2 cebolas médias
- 1 pimentão verde
- ½ pimentão vermelho
- 1 maço de salsinha
- ½ maço de coentro (opcional)
- 80ml de vinagre de vinho branco ou suco de limão
- 60ml de azeite extra-virgem
- Sal e pimenta-do-reino

### Sobre o Tomate
Use tomates maduros mas **nunca muito moles**. A vinagrete precisa de textura. Retire as sementes e o excesso de líquido — eles diluem o molho.

### Sobre a Cebola
A cebola crua pode dominar o prato se não for tratada. Dica: corte em cubinhos e deixe de molho em água gelada por 15 minutos. Escorra e use. O sabor fica mais suave.

### O Ácido: Vinagre ou Limão?
- **Vinagre de vinho branco:** mais clássico, sabor mais prolongado
- **Limão:** mais fresco, mais aromático, sabor mais efêmero
- **Misto:** o ideal para muitos — 50% vinagre + 50% limão

## Modo de Preparo

1. Corte todos os vegetais em cubinhos de **5-7mm** (não menor — perde textura, não maior — perde equilíbrio)
2. Coloque cebola em água fria por 15 minutos, escorra
3. Misture todos os vegetais em bowl
4. Tempere com sal e pimenta
5. Regue com vinagre e azeite
6. Misture e **prove** — ajuste acidez/sal
7. Adicione salsinha e coentro
8. Deixe repousar 15-30 minutos antes de servir

## O Segredo do Reposo

A vinagrete precisa de pelo menos 20-30 minutos de descanso. Os líquidos se integram, o vinagre "cozinha" levemente a cebola e o tomate começa a liberar seu suco naturalmente.

## Variações Regionais

### Vinagrete Baiana
Adicione: coentro generoso + pimenta dedo-de-moça picada + suco de limão em vez de vinagre. Mais vibrante.

### Vinagrete com Manga
Para acompanhar frango: substitua metade do tomate por manga em cubinhos. Doce, fresco, incrível.

### Vinagrete com Abacate
Adicione cubinhos de abacate maduro no momento de servir. Cremosidade que complementa a acidez.

## Conservação

A vinagrete é melhor no mesmo dia. Se precisar guardar: mantenha na geladeira por até 24h. O tomate vai liberar líquido — escorra antes de servir novamente.

---
*A vinagrete é prova de que o mais simples pode ser o mais essencial. Sem ela, o churrasco perde equilíbrio.*`
  },

  // ─── 19 ───────────────────────────────────
  {
    slug: 'entrecote-ribeye-contrafile-diferenças',
    title: 'Entrecôte, Ribeye e Contrafilé: Qual a Diferença? Guia dos Cortes do Lombo',
    excerpt: 'Entrecôte, ribeye, contrafilé... Três nomes, uma região, muita confusão. Entenda de uma vez as diferenças, como cada um é cortado e qual preparação valoriza cada um.',
    cover_image: 'https://images.unsplash.com/photo-1594221708779-94832f4320d1?w=1200',
    categoria: 'cortes',
    tags: ['entrecôte', 'ribeye', 'contrafilé', 'cortes', 'lombo'],
    author: 'Equipe Brasassado',
    read_time: 8,
    featured: false,
    published_at: '2024-04-01T10:00:00Z',
    content: `# Entrecôte, Ribeye e Contrafilé: Desmistificando os Cortes do Lombo

Uma das confusões mais comuns no universo das carnes: entrecôte, ribeye e contrafilé são a mesma coisa? A resposta é: **são do mesmo músculo, mas são cortes diferentes**. E a diferença importa muito.

## O Músculo Base: Longissimus Dorsi

Todo o contrafilé, entrecôte e ribeye vêm do mesmo músculo: o *Longissimus dorsi* — o maior músculo dorsal do boi, que corre ao longo de toda a coluna vertebral.

Mas esse músculo é enorme, e cada parte tem características diferentes:

- **Traseiro do lombo** → Contrafilé (menos gordura, mais firme)
- **Meio do lombo** → Entrecôte (equilíbrio de gordura e textura)
- **Parte dianteira com costela** → Ribeye / Prime Rib (máximo marmoreio)

## Contrafilé (Striploin)

### Características
- Parte traseira do lombo
- Menos gordura intramuscular
- Textura mais firme
- Sabor "bovino" limpo
- Mais uniforme em espessura

### Onde é Mais Valorizado
No Brasil, é o corte de churrasco mais popular para quem não pode (ou não quer) pagar preço de picanha. Na França, é o "faux-filet".

### Como Preparar
Bifes de 2,5-3 cm em temperatura alta. Asse 3 minutos por lado para mal passado, 4-5 para ao ponto. A gordura lateral deve dourar — vire o bife na lateral por 1 minuto.

## Entrecôte (Ribeye Sem Osso)

### Características
- Parte media do lombo, próxima às costelas
- Gordura intramuscular (marmoreio) maior que o contrafilé
- O "olho" central (eye) de gordura é característica visual
- Textura mais macia por causa do marmoreio
- Sabor mais rico e complexo

### Confusão com o Ribeye
Na Europa (especialmente França), "entrecôte" se refere ao corte **sem osso**. O "ribeye" americano tem o mesmo músculo mas pode ter o osso (bone-in ribeye ou cowboy steak) ou não.

### Como Preparar
Temperatura muito alta para selar rápido e preservar a gordura interna. A gordura do "olho" deve derreter — sinal que atingiu o ponto certo de temperatura interna. Mal passado a ao ponto (54-62°C).

## Ribeye (Olho de Bife com Costela)

### Características
- Parte mais anterior do lombo, com pedaço da costela
- Maior marmoreio de todos os três
- O "cap" (capa do ribeye) é a parte mais saborosa do boi para muitos
- Variações: bone-in ribeye, cowboy steak, tomahawk

### O Cap do Ribeye (Spinalis Dorsi)
Esta é a parte externa do ribeye — separada do músculo central pela faixa de gordura. É considerada por muitos o corte mais saboroso do boi. Bem marmoreada, macia, sabor intenso.

### Como Preparar
Método reverse sear (especialmente para cortes espessos de 4+ cm). Para cortes de 2,5 cm: selagem direta em temperatura muito alta, 2-3 min por lado, ponto ao ponto.

## Comparação Final

| Corte | Marmoreio | Sabor | Maciez | Preço |
|-------|-----------|-------|--------|-------|
| Contrafilé | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | $ |
| Entrecôte | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | $$ |
| Ribeye | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | $$$ |

## A Regra de Ouro

**Mais marmoreio = mais sabor = mais caro.** Não existe corte "melhor" em absoluto — existe o corte certo para cada situação e orçamento. Um contrafilé bem assado supera um ribeye mal preparado todos os dias.

---
*O melhor corte é aquele que você sabe preparar. Conhecimento transforma qualquer carne em experiência.*`
  },

  // ─── 20 ───────────────────────────────────
  {
    slug: 'porco-na-churrasqueira-costela-barriga',
    title: 'Porco na Churrasqueira: Costela, Barriga e Pernil — Tudo que Você Precisa Saber',
    excerpt: 'O porco é subestimado no churrasco brasileiro. Mas costela suína no bafo, barriga crocante e pernil com ervas são experiências gastronômicas excepcionais. Aprenda tudo.',
    cover_image: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=1200',
    categoria: 'receitas',
    tags: ['porco', 'costela suína', 'barriga', 'pernil', 'churrasco'],
    author: 'Equipe Brasassado',
    read_time: 9,
    featured: false,
    published_at: '2024-04-05T10:00:00Z',
    content: `# Porco na Churrasqueira: O Guia Completo

O Brasil é um dos maiores produtores de suínos do mundo, mas o porco ainda é subestimado na churrasqueira. Enquanto a picanha reina, costela suína, barriga e pernil fazem churrasqueiros experientes babarem. Hora de mudar isso.

## Por Que o Porco é Diferente

A carne suína tem características únicas:

**Gordura diferente:** mais saturada e com ponto de fusão mais baixo que a bovina. Derrete a temperatura mais baixa, lubrificando a carne por dentro.

**Temperatura de segurança:** o porco precisa atingir pelo menos **63°C** internamente para segurança alimentar (as antigas recomendações de 71°C eram excessivas — resultavam em carne seca).

**Ácido orgânico:** a carne suína responde muito bem a marinadas ácidas e frutas.

## Costela Suína no Bafo

A costela suína (baby back ribs ou spare ribs) pode ficar tão boa quanto a bovina, se não melhor, quando feita no bafo.

### Baby Back Ribs vs Spare Ribs
- **Baby Back:** costelas mais curtas e finas, carne mais macia, assa mais rápido (3-4h)
- **Spare Ribs (St. Louis):** mais longas, mais gordurosas, mais sabor (4-5h)

### O Rub Perfeito para Costela Suína
- 2 col. sopa de sal
- 2 col. sopa de açúcar mascavo
- 1 col. sopa de páprica defumada
- 1 col. chá de pimenta cayena
- 1 col. chá de alho em pó
- 1 col. chá de cebola em pó
- ½ col. chá de cominho

### Método 3-2-1 (o Profissional)
- **3 horas** defumando/assando sem embrulhar
- **2 horas** embrulhada em alumínio com um pouco de mel e manteiga
- **1 hora** de volta ao fogo aberta, com molho BBQ pincelado nos últimos 30 min

---

## Barriga de Porco (Pancetta / Belly)

A barriga de porco na churrasqueira é uma das experiências mais prazerosas do mundo das carnes. A gordura interposta nas camadas de carne cria algo extraordinário.

### Método para Barriga Crocante
1. Faça cortes quadriculados na pele (1cm de profundidade)
2. Esfregue sal grosso generosamente — especialmente na pele
3. Deixe na geladeira **descoberta** por 24h (resseca a pele — fundamental para crocância)
4. Asse em churrasqueira a 200°C com a pele para cima por 45 min
5. Nos últimos 15 min, coloque a pele diretamente sobre as brasas até inflar e crocante

**A pele crocante (crackling) é o objetivo.** Ela deve estalar ao morder.

---

## Pernil no Espeto

O pernil inteiro no espeto é para churrascos grandes e especiais. Um pernil de 4-5 kg serve 8-12 pessoas.

### Tempero (24h antes)
- Esfregue por toda a peça: sal, alho, alecrim, pimenta, azeite
- Faça incisões profundas e insira dentes de alho e ramos de alecrim
- Marine na geladeira coberto com plástico

### No Espeto
- Equilibre bem no espeto para rotação uniforme
- Asse em temperatura média-baixa (150-170°C) por 3-4 horas
- Temperatura interna: 71°C (mais alto que os outros suínos por ser peça grossa)

---

## Linguiça Toscana e Caipira

Não esqueça das linguiças! São quick wins do churrasco:

**Toscana:** asse inteira em calor médio por 20-25 min, virando a cada 5 min
**Caipira:** temperatura mais baixa — a gordura interna é maior
**Calabresa fresca:** fure levemente antes de assar para não estourar

## Marinadas para Porco

### Marinada de Laranja e Mel
- 200ml de suco de laranja
- 3 col. sopa de mel
- 4 dentes de alho
- 1 col. chá de pimenta calabresa
- Sal e alecrim

### Marinada Asiática
- Molho de soja, mel, gengibre, alho, óleo de gergelim

---
*O porco bem preparado na churrasqueira é revelação. Uma costela suína no método 3-2-1 converte qualquer cético em fã instantâneo.*`
  },

  // ─── 21 ───────────────────────────────────
  {
    slug: 'termometro-digital-churrasco-guia',
    title: 'Termômetro para Churrasco: Por Que é o Acessório Mais Importante',
    excerpt: 'O termômetro digital é o acessório mais subestimado do churrasco. Com ele, você nunca mais vai servir carne crua ou ressecada. Guia completo de uso e modelos.',
    cover_image: 'https://images.unsplash.com/photo-1607116667980-3b2a8b964bef?w=1200',
    categoria: 'equipamentos',
    tags: ['termômetro', 'equipamentos', 'técnica', 'temperatura', 'churrasco'],
    author: 'Equipe Brasassado',
    read_time: 6,
    featured: false,
    published_at: '2024-04-10T10:00:00Z',
    content: `# Termômetro para Churrasco: O Acessório que Separa Amadores de Profissionais

"Dá pra saber o ponto na mão." Já ouviu isso? A "técnica da mão" é imprecisa, subjetiva e varia de churrasqueiro para churrasqueiro. Um termômetro digital, por outro lado, é objetivo, preciso e vai transformar seu churrasco.

## Por Que Usar Termômetro?

**Segurança alimentar:** frango e porco precisam atingir temperaturas específicas para eliminar bactérias.

**Ponto perfeito:** a diferença entre mal passado e ao ponto pode ser de apenas 5°C — impossível de detectar na mão.

**Consistência:** toda vez que você assar um corte espesso, vai acertar o ponto.

**Economia:** nada mais frustrante (e caro) que arruinar um tomahawk ou brisket por não ter usado um termômetro.

## Temperaturas de Referência

### Bovino
- Mal passado: 52-54°C
- Ao ponto para mal passado: 55-59°C
- Ao ponto: 60-65°C
- Ao ponto para bem passado: 66-70°C
- Bem passado: 71°C+

### Suíno
- Ponto seguro: 63°C (mínimo)
- Ideal para cortes grelhados: 65-68°C
- Costela no bafo: 88-95°C

### Frango
- Peito: 74°C (mínimo)
- Coxa/sobrecoxa: 77-82°C
- Frango inteiro: 80°C (na parte mais espessa da coxa)

### Cordeiro
- Mal passado: 52-55°C
- Ao ponto: 60-65°C
- Bem passado: 70°C+

### Brisket / Short Rib / Costela (pull temperature)
- 88-97°C (colágeno dissolvido, carne se soltando)

## Tipos de Termômetro

### Termômetro Instantâneo (Instant Read)
O mais versátil. Inserido na carne, dá leitura em 2-5 segundos.

**Uso:** para checagens rápidas durante o processo

**Modelos populares:** Thermapen ONE (o melhor do mercado), ThermoPop, Lavatools

**Custo:** R$80 a R$800 (o Thermapen vale o preço para quem usa muito)

### Termômetro com Sonda e Cabo (Leave-in)
A sonda fica dentro da carne durante todo o cozimento. Ideal para low & slow.

**Uso:** brisket, costela no bafo, pernil — qualquer cozimento longo

**Vantagem:** monitora sem abrir a churrasqueira

**Modelos:** MEATER (sem fio, Bluetooth), ThermoWorks Smoke

### Termômetro de Superfície (Infravermelho)
Mede temperatura da superfície sem contato. Útil para verificar temperatura da grelha.

**Não use** para temperatura interna da carne — o infravermelho mede apenas superfície.

## Como Usar Corretamente

1. **Insira no ponto mais espesso** — longe de ossos (que conduzem calor diferente) e gordura
2. **Espere a leitura estabilizar** — alguns termômetros demoram 2-3 segundos
3. **Meça antes do tempo previsto** — mais fácil corrigir carne crua do que carne seca
4. **Considere o "carryover cooking"** — a temperatura sobe 3-5°C após sair do fogo. Tire um pouco antes do ponto alvo.

## Cuidados e Manutenção

- Nunca mergulhe termômetros instantâneos em água (não são à prova d'água totalmente)
- Kalibre periodicamente em água fervente (100°C) e água gelada (0°C)
- Guarde com a sonda protegida

---
*Um bom termômetro custa menos que um kg de picanha. O retorno em carnes no ponto certo é imediato e permanente.*`
  },

  // ─── 22 ───────────────────────────────────
  {
    slug: 'historia-churrasco-brasil-origem-cultura',
    title: 'A História do Churrasco Brasileiro: Da Colônia ao Patrimônio Cultural',
    excerpt: 'Como o churrasco se tornou sinônimo de Brasil? Da origem nos pampas gaúchos ao churrasco de luxo paulistano, a fascinante história de nossa tradição churrasqueira.',
    cover_image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200',
    categoria: 'curiosidades',
    tags: ['história', 'cultura', 'brasil', 'gaúcho', 'tradição'],
    author: 'Equipe Brasassado',
    read_time: 10,
    featured: false,
    published_at: '2024-04-15T10:00:00Z',
    content: `# A História do Churrasco Brasileiro: Uma Jornada Pelos Pampas

O churrasco brasileiro não surgiu de um momento para outro. É resultado de séculos de miscigenação cultural, da imensidão dos pampas gaúchos, da herança indígena, da influência europeia e da criatividade tropical. Vamos conhecer essa história fascinante.

## As Origens nos Pampas

Tudo começa no Sul. O Rio Grande do Sul, com sua vasta região de campos abertos (os pampas), foi o berço do churrasco brasileiro. No século XVII e XVIII, esse território era habitado por indígenas, especialmente os Guaranis, que já praticavam a cocção de carne sobre fogueiras.

Com a chegada dos colonizadores ibéricos e, posteriormente, com a consolidação das estâncias (fazendas) de gado, surgiu uma figura central: o **gaúcho** (ou gaucho, em espanhol — palavra de origem incerta, talvez do tupi ou do árabe).

## O Gaúcho e o Churrasco Campeiro

O gaúcho era o peão das estâncias, responsável pelo manejo do gado. Homem de vida rude, viajava longas distâncias pelo pampa e a comida era simples: carne assada diretamente no fogo, temperada apenas com sal.

Este é o churrasco em sua forma mais pura. Sem espetinhos sofisticados, sem acompanhamentos elaborados — apenas carne, fogo e sal grosso.

**O "churrasco campeiro" original:**
- Peças inteiras fincadas em paus sobre brasas
- Sal grosso como único tempero
- Fogo de lenha (sempre)
- Cocção lenta, às vezes por horas

## A Difusão pelo Brasil

Durante o século XIX e início do XX, o churrasco gaúcho começou a se difundir pelo Brasil. Os ciclos migratórios internos — especialmente para São Paulo, Rio de Janeiro e outras regiões — levaram a cultura do asado para novos territórios.

Mas cada região adaptou o churrasco à sua realidade:

**São Paulo:** o churrasco paulistano absorveu influências dos imigrantes italianos, japoneses e libaneses. A linguiça apucarana, os espetinhos de feira e a diversidade de cortes refletem essa mistura.

**Minas Gerais:** o "frango com maxixe" e a costela mineira mostram a adaptação regional. O churrasco mineiro é mais intimista, de quintal.

**Nordeste:** carnes de bode e ovino entraram no rotativo, influenciadas pela cultura sertaneja.

**Centro-Oeste:** próximo à fronteira com o Paraguai e a Bolívia, o asado regional ganhou características de sabores diferentes.

## A Churrascaria Gaúcha: A Invenção do Século

No final do século XIX, em Porto Alegre, surgiu algo que mudaria o mundo: as primeiras **churrascarias**. Estabelecimentos que serviam diferentes cortes de carne diretamente do espeto, em serviço contínuo.

Este formato — que hoje conhecemos como "rodízio" — foi uma invenção brasileira que conquistou o mundo. A **Churrascaria Gaúcha**, em Porto Alegre (1885), é considerada uma das pioneiras.

## O Rodízio: Exportação Brasileira

O sistema de rodízio (também chamado de "espeto corrido") foi levado ao mundo por imigrantes brasileiros a partir dos anos 1970-80. Hoje, restaurantes brasileiros com rodízio existem em mais de 80 países.

Cidades como Nova York, Londres, Miami e Tóquio têm suas churrascarias brasileiras — muitas comandadas por gaúchos de primeira ou segunda geração.

## O Churrasco no Século XXI

Nas últimas duas décadas, o churrasco brasileiro passou por uma revolução:

**Cortes premium:** picanha, tomahawk e wagyu nacional entraram nos churrascos domésticos
**Técnicas americanas:** o BBQ estilo Texas influenciou a cena com brisket e short rib
**Churrascos gastronômicos:** chefs renomados elevaram o churrasco à alta gastronomia
**O churrasco feminino:** mulheres churrasqueiras quebrando preconceitos e dominando a brasa

## Churrasco como Patrimônio Cultural

Em 2018, o **Churrasco Gaúcho** foi reconhecido como Patrimônio Cultural Imaterial do Rio Grande do Sul. Um reconhecimento merecido para uma tradição que moldou a identidade de uma região — e de um país inteiro.

Em 2020, o Brasil criou o **Dia Nacional do Churrasco** (30 de abril).

## Curiosidades Históricas

🥩 O Brasil é o maior exportador de carne bovina do mundo
🥩 São Paulo tem mais de 15.000 churrascarias registradas
🥩 O brasileiro médio consome 38 kg de carne bovina por ano
🥩 A picanha é praticamente desconhecida fora do Brasil — em outros países, o corte não é feito da mesma forma

---
*O churrasco brasileiro não é apenas uma técnica de cocção — é uma identidade, um ritual, um modo de ser. Cada grelha acesa é um elo com séculos de história.*`
  },

  // ─── 23 ───────────────────────────────────
  {
    slug: 'sal-grosso-ou-sal-refinado-churrasco',
    title: 'Sal Grosso ou Sal Refinado no Churrasco? A Resposta Definitiva',
    excerpt: 'A batalha do sal no churrasco nunca tem fim. Sal grosso, sal refinado, flor de sal, sal defumado... Qual usar e quando? A ciência e a tradição falam.',
    cover_image: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=1200',
    categoria: 'tecnicas',
    tags: ['sal', 'tempero', 'técnica', 'ciência', 'churrasco'],
    author: 'Equipe Brasassado',
    read_time: 6,
    featured: false,
    published_at: '2024-04-20T10:00:00Z',
    content: `# Sal Grosso ou Sal Refinado no Churrasco?

"Aqui em casa só usa sal grosso." "Meu avô sempre usou sal refinado." A discussão sobre sal no churrasco é quase religiosa. Vamos colocar ciência e tradição lado a lado para uma resposta definitiva.

## O Que o Sal Faz na Carne

Antes de decidir qual tipo usar, entendamos o que o sal faz:

1. **Extrai umidade (osmose):** o sal puxa líquido para a superfície
2. **Dissolve proteínas:** em contato prolongado, o sal dissolve proteínas musculares, ajudando a reter umidade no longo prazo
3. **Realça sabor:** suprime percepção de amargo, amplifica outros sabores
4. **Cria crosta (Maillard):** superfície mais seca = melhor reação de Maillard = melhor crosta

## A Ciência do Tempo de Salga

**Regra do ChefSteps/Food Lab:**
- **0-3 minutos antes:** OK (sal ainda na superfície, não atrapalhou)
- **3-40 minutos antes:** RUIM (sal puxou umidade para superfície, criando camada encharcada — pior crosta, carne perde sucos ao selar)
- **40+ minutos antes:** BOM (a umidade foi reabsorvida, carregando o sal para dentro da carne)
- **12-24h antes (dry brine):** ÓTIMO (máxima penetração, máxima suculência)

**Conclusão:** ou sal na hora (poucos minutos antes) ou com muita antecedência. Jamais aquele "meio termo" de 20-30 minutos.

## Sal Grosso: Prós e Contras

### Prós
- **Dissolução mais lenta:** penetra gradualmente — melhor para peças espessas
- **Tradição:** o sabor "do churrasco" que todos reconhecem tem o sal grosso nele
- **Fácil de remover:** o excesso cai da carne naturalmente
- **Textura:** os cristais grandes criam uma crosta distinta

### Contras
- **Dissolução irregular:** partes não cobertas ficam sem sal
- **Difícil controle de quantidade:** pode salgar demais facilmente
- **Não penetra rápido:** se vai usar por pouco tempo, o sal fica na superfície

## Sal Refinado: Prós e Contras

### Prós
- **Penetração rápida:** cristais finos dissolvem e penetram mais rápido
- **Distribuição uniforme:** cobre toda a superfície homogeneamente
- **Controle preciso:** medição por peso é mais exata

### Contras
- **Risco de excesso:** penetra rápido — fácil usar demais
- **Antiembolamento:** sal refinado industrializado tem aditivos que podem afetar sabor

## Flor de Sal e Sal Kosher

**Flor de Sal:** para finalização apenas. Nunca para marinar ou assar (seria desperdiçado). Adicione sobre a carne já fatiada no prato. Completa o sabor com textura única.

**Sal Kosher:** o favorito dos churrasqueiros americanos. Cristais médios, sem aditivos, dissolução moderada. Excelente para dry brine.

**Sal Defumado:** para finalização em cortes específicos. Adiciona uma camada extra de sabor defumado.

## Diferentes Cortes, Diferentes Abordagens

### Picanha e Cortes Grandes
- **Tradição:** sal grosso aplicado 10-15 minutos antes (aceita o risco da umidade porque o método brasileiro é alta temperatura / tempo curto)
- **Técnica:** dry brine com sal grosso ou kosher 12-24h antes para máximo resultado

### Bifes Finos (entrecôte, contrafilé)
- Sal refinado ou kosher aplicado na hora de grelhar (ou 12h antes como dry brine)
- Não há tempo para o sal grosso penetrar em bifes finos

### Frango
- Salmoura (brine úmido) para cortes inteiros
- Dry brine com sal refinado para partes

### Costela e Cortes no Bafo
- Rub de sal grosso + temperos aplicado 2-12h antes

## O Veredito

**Para a tradição brasileira clássica:** Sal grosso, aplicado na hora ou com 12h+ de antecedência.

**Para máximo resultado técnico:** Salt brine (sal kosher ou grosso moído) 12-24h antes, sem cobrir.

**Para finalização gourmet:** Flor de sal após assar, na hora de servir.

**A verdade:** não existe errado se você sabe o que está fazendo. Tradição e ciência chegam a lugares diferentes, mas ambas produzem resultados deliciosos.

---
*O sal é o único tempero que a picanha realmente precisa. Seja qual for o tipo, use com respeito.*`
  },

  // ─── 24 ───────────────────────────────────
  {
    slug: 'alcatra-completa-cortes-derivados',
    title: 'Alcatra Completa: Picanha, Maminha, Baby Beef e Todos os Cortes Derivados',
    excerpt: 'A alcatra é uma das peças mais completas e versáteis do boi. Dela vêm a picanha, maminha e o baby beef. Aprenda sobre cada corte derivado e como aproveitá-los.',
    cover_image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200',
    categoria: 'cortes',
    tags: ['alcatra', 'picanha', 'maminha', 'baby beef', 'cortes'],
    author: 'Equipe Brasassado',
    read_time: 8,
    featured: false,
    published_at: '2024-04-25T10:00:00Z',
    content: `# Alcatra Completa: A Mãe de Todos os Cortes Traseiros

A "alcatra" no açougue brasileiro muitas vezes gera confusão — às vezes é um corte específico, às vezes é uma região inteira. Vamos clarear de uma vez essa história.

## O Que é a "Alcatra Completa"?

A **alcatra completa** (também chamada de alcatra tradicional ou "alcatrão") é uma peça grande que representa a região do quadril traseiro do boi. Dela, o açougueiro retira vários cortes menores, cada um com suas características.

**Cortes derivados da alcatra completa:**
1. Picanha (músculo glúteo médio)
2. Maminha (tri-tip — ponta triangular)
3. Baby Beef (parte mais nobre e central)
4. Alcatra (no sentido estrito — músculo glúteo superficial)

## Baby Beef: O Corte Nobre Esquecido

O **Baby Beef** é o corte mais nobre da alcatra completa, mas também o mais incompreendido. Não tem nada a ver com "bovino jovem" — é apenas o nome do corte (de "tender loin" baby, no inglês americano).

### Características
- Textura extremamente macia (comparável ao filé mignon)
- Sabor mais pronunciado que o filé mignon
- Pouca gordura, muito músculo
- Preço relativamente acessível para a qualidade

### Como Preparar
Bifes altos (3-4 cm) em temperatura muito alta. Só 2-3 minutos por lado. Nunca além do ponto ao ponto — resseca facilmente.

## A Alcatra "Miúda" (no sentido estrito)

Depois de retirar picanha e maminha, o que resta é o que os açougues vendem como "alcatra". É um corte levemente mais firme, com sabor forte e bom custo-benefício.

### Subcortes da Alcatra
- **Alcatra cap (cabeça da alcatra):** parte superior, mais marmoreada
- **Alcatra de lado:** fatias da região lateral, para bifes
- **Alcatra posta:** pedaços transversais para panela ou churrasco

## Como Aproveitar a Alcatra Completa

Se você tem acesso a uma alcatra completa (açougues maiores e frigoríficos):

1. **Peça para deixar a picanha intacta** com a capa de gordura
2. **Separe a maminha** em peça inteira
3. **O baby beef** em bifes altos
4. **O restante** em bifes para grelha ou cubos para churrasco no palito

## Custo-Benefício Excepcional

A alcatra completa é frequentemente mais barata que comprar cada corte separado. Para churrascos grandes, pedir a peça inteira e fazer seus próprios cortes é econômico e satisfatório.

---
*Conhecer a anatomia do boi é o primeiro passo para se tornar um churrasqueiro completo. Cada corte conta uma história sobre o animal e seu movimento.*`
  },

  // ─── 25 ───────────────────────────────────
  {
    slug: 'cerveja-e-vinho-harmonizacao-churrasco',
    title: 'Cerveja e Vinho no Churrasco: Guia de Harmonização para Cada Corte',
    excerpt: 'Qual cerveja combina com picanha? Que vinho harmoniza com costela no bafo? Guia completo de harmonização de bebidas com os principais cortes do churrasco.',
    cover_image: 'https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?w=1200',
    categoria: 'acompanhamentos',
    tags: ['cerveja', 'vinho', 'harmonização', 'bebidas', 'churrasco'],
    author: 'Equipe Brasassado',
    read_time: 7,
    featured: false,
    published_at: '2024-04-28T10:00:00Z',
    content: `# Cerveja e Vinho no Churrasco: A Arte da Harmonização

"Churrasco combina com cerveja gelada." Verdade. Mas a harmonização vai muito além disso. A bebida certa pode elevar cada corte a outro nível, enquanto a errada pode apagar sabores delicados ou ser eclipsada por carnes intensas.

## Princípios Básicos de Harmonização

**Complementaridade:** sabores semelhantes se encontram (vinho encorpado com carne gordurosa)
**Contraste:** opostos se atraem (cerveja refrescante com carne defumada intensa)
**Equilíbrio de intensidade:** bebida e comida devem ter intensidade similar — nenhum pode apagar o outro

## Cervejas para Churrasco

### Picanha: Cerveja que Honra o Rei

A picanha pede uma cerveja que respeite sua suavidade e não compita com o sal.

**Melhor escolha:** Pilsen gelada, clássica. A carbonatação limpa o paladar entre os cortes e a leveza não interfere no sabor suave da picanha.

**Alternativa premium:** Kölsch (estilo alemão, mais aromático) ou Lager Vienna.

**Evite:** IPAs muito amargas — o amargor do lúpulo conflita com a gordura da picanha de forma desagradável.

### Costela e Brisket (Defumado): Cervejas com Caráter

Para carnes defumadas e longas cozições, precisamos de cervejas com profundidade.

**Melhores escolhas:**
- **Porter ou Stout:** o torrado do malte espelha o defumado da carne
- **Märzen/Oktoberfest:** maltosa, caramelada, complementa a crocância do bark
- **Amber Ale:** meio-termo perfeito, notas de caramelo que complementam

### Costela Suína / Ribs com BBQ: Harmonização Ousada

O molho BBQ tem doce, picante, ácido e defumado — pede cerveja que aguente.

**Melhores escolhas:**
- **Brown Ale americana:** maltosa, um toque de chocolate, aguenta o BBQ
- **Pale Ale:** equilíbrio entre lúpulo e malte
- **Cerveja de trigo com limão:** o cítrico corta a doçura do BBQ lindamente

### Frango Grelhado: Cerveja Leve

O frango é carne delicada que pede cerveja mais suave.

- Weizen (trigo alemão): os ésteres frutados harmonizam com frango
- Witbier (belga): notas de coentro e casca de laranja
- Saison: complexa mas elegante, sem dominar

### Cordeiro: Cervejas Belgas

O sabor único do cordeiro pede algo igualmente complexo.

- Saison: especiada, carbonatada, com acidez sutil
- Dubbel (belga escura): notas de frutas escuras, caramelo
- Rauchbier (defumada alemã): complementa o sabor pronunciado do cordeiro

---

## Vinhos para Churrasco

### A Regra Básica: Taninos e Gordura

Vinhos tintos têm **taninos** — compostos que "secam" a boca. Os taninos se ligam às proteínas da gordura da carne, suavizando o paladar. Por isso vinho tinto e carne vermelha é casamento clássico.

### Picanha: Malbec Argentino

É quase uma questão de princípio: picanha pede Malbec de Mendoza. A uva argentina tem taninos macios, fruta intensa e acidez moderada — respeita a picanha sem dominá-la.

**Alternativas:** Tempranillo espanhol, Bonarda argentino.

### Costela e Cortes Gordurosos: Cabernet Sauvignon

Cortes muito gordurosos pedem vinhos com taninos mais firmes para cortar a gordura.

- **Cabernet Sauvignon:** taninos altos, ácidez boa, complexidade
- **Tannat uruguaio:** taninos robustíssimos, feito para cortes gordurosos
- **Syrah/Shiraz:** pimenta, defumado, ótimo para costela

### Tomahawk e Ribeye: Grand Cru Borgonha? Ou um Barolo?

Para cortes de altíssima qualidade:
- **Barolo italiano:** "Rei dos vinhos", taninos intensos, evolui na taça
- **Pinot Noir de Borgonha:** para cortes mais delicados com marmoreio (Wagyu)

### Frango Grelhado: Branco Encorpado

- **Chardonnay com passagem em carvalho:** manteiga, tosta, complementa frango
- **Viognier:** floral, untuoso, perfeito para frango com ervas

### Cordeiro: Syrah/Shiraz

O casamento mais perfeito do mundo das carnes é **cordeiro + Syrah**. O caráter de pimenta e especiarias do Syrah complementa o sabor terroso do cordeiro de forma extraordinária.

---

## A Temperatura das Bebidas

**Cerveja:** mais fria a temperatura mais quente do dia (0-4°C no verão rigoroso)
**Vinho tinto leve:** 14-16°C
**Vinho tinto encorpado:** 16-18°C
**Vinho branco:** 8-12°C
**Espumante:** 6-8°C

---
*A harmonização perfeita não tem regras absolutas — tem princípios. Confie no seu paladar, experimente e descubra o que faz sentido para você.*`
  },
  // ─── 26 ──────────────────────────────────
  {
    slug: 'fraldinha-na-brasa-guia-completo',
    title: 'Fraldinha na Brasa: Guia Completo do Corte Mais Versátil do Churrasco',
    excerpt: 'A fraldinha é um dos cortes mais saborosos e acessíveis do churrasco. Aprenda a marinar, temperar e assar a fraldinha perfeita que desmancha na boca.',
    cover_image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200',
    categoria: 'cortes',
    tags: ['fraldinha', 'cortes', 'churrasco', 'marinada', 'carne'],
    author: 'Equipe Brasassado',
    read_time: 7,
    featured: false,
    published_at: '2024-05-05T10:00:00Z',
    content: `# Fraldinha na Brasa: Guia Completo

A **fraldinha** (ou flank steak) é um corte retirado da parte inferior do traseiro do boi, próximo à barriga. É um corte magro com fibras longas e sabor intenso.

## Características

- Fibras longas e marcadas
- Sabor forte e "bovino"
- Peso médio: 700g a 1,2kg
- Excelente custo-benefício

## Marinada Clássica

- 4 dentes de alho amassados
- Suco de 2 limões
- 100ml de azeite
- 1 col. sopa de mostarda
- Sal e pimenta-do-reino
- Ervas frescas (alecrim, tomilho)

Marine por **6 a 12 horas** na geladeira.

## Como Assar

1. Retire da marinada e seque bem
2. Grelha bem quente — sele por 5-7 min de cada lado
3. Transfira para calor indireto por mais 10-15 min
4. Temperatura interna ideal: 58-62°C
5. **Repouse 10 minutos**

## Corte SEMPRE Contra as Fibras

Esse é o segredo mais importante. Fatie em ângulo perpendicular às fibras longas, em fatias de 5-7mm. Se cortar a favor, a carne fica borrachuda.

---
*A fraldinha bem feita é prova de que cortes acessíveis podem ser extraordinários.*`
  },
  // ─── 27 ──────────────────────────────────
  {
    slug: 'costela-ribs-estilo-americano-3-2-1',
    title: 'Costela Ribs Estilo Americano: O Método 3-2-1 Perfeito',
    excerpt: 'As ribs estilo americano com o método 3-2-1 são macias, suculentas e com bark perfeito. Aprenda a técnica que transforma qualquer churrasqueiro em pitmaster.',
    cover_image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1200',
    categoria: 'receitas',
    tags: ['ribs', 'costela', 'bbq', 'defumação', '3-2-1'],
    author: 'Equipe Brasassado',
    read_time: 10,
    featured: false,
    published_at: '2024-05-10T10:00:00Z',
    content: `# Costela Ribs: O Método 3-2-1

O método **3-2-1** é a técnica mais confiável para produzir ribs com bark crocante e carne que cai do osso.

## O que é o 3-2-1?

- **3 horas** — defumando sem embrulhar (fase de bark)
- **2 horas** — embrulhada em alumínio com líquido (fase de maciez)
- **1 hora** — aberta novamente com glaze (fase de finalização)

## Preparo

### Retire a Membrana
No verso das ribs, há uma membrana prateada. Retire-a com papel toalha para melhor absorção do tempero.

### Rub Seco

- 3 col. sopa de páprica defumada
- 2 col. sopa de açúcar mascavo
- 2 col. sopa de sal kosher
- 1 col. sopa de pimenta-do-reino
- 1 col. chá de alho em pó
- 1 col. chá de cebola em pó
- 1 col. chá de cominho

Aplique generosamente e deixe na geladeira por 12h.

## Fase 1: Defumação (3h)

Temperatura: 110-120°C. Use lascas de madeira de carvalho ou nogueira.

## Fase 2: Embrulho (2h)

Embrulhe em alumínio com mel, manteiga e suco de maçã. Mantenha 110°C.

## Fase 3: Glaze (1h)

Remova o alumínio, pincele com molho BBQ. Temperatura 120-130°C.

---
*As melhores ribs levam tempo — e esse é exatamente o ponto.*`
  },
  // ─── 28 ──────────────────────────────────
  {
    slug: 'cupim-no-bafo-receita-definitiva',
    title: 'Cupim no Bafo: A Receita Definitiva para o Corte Mais Brasileiro',
    excerpt: 'O cupim é exclusividade do gado Nelore brasileiro. Aprenda a receita do cupim no bafo que fica macio, gorduroso e impossível de parar de comer.',
    cover_image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200',
    categoria: 'receitas',
    tags: ['cupim', 'bafo', 'nelore', 'receita', 'churrasco'],
    author: 'Equipe Brasassado',
    read_time: 9,
    featured: true,
    published_at: '2024-05-15T10:00:00Z',
    content: `# Cupim no Bafo: A Receita Definitiva

O **cupim** é uma exclusividade do gado zebuíno (Nelore), predominante no Brasil. É a corcova do boi — rica em gordura intramuscular e colágeno.

## Características do Cupim

- Rico em gordura e colágeno
- Sabor intenso e aveludado
- Precisa de cocção longa e lenta
- Peso médio: 2-4kg

## Preparo

### Tempero

- Sal grosso generoso
- Alho amassado
- Pimenta-do-reino
- Cerveja escura para o bafo

### Método

1. Sele o cupim em grelha bem quente por 30 min (todos os lados)
2. Embrulhe em **3 camadas** de papel alumínio
3. Adicione 200ml de cerveja escura antes de fechar
4. Asse em calor indireto por **4-5 horas** a 120-140°C
5. Abra o alumínio e finalize por 15-20 min para crocância

## O Ponto Perfeito

O cupim está pronto quando você consegue penetrar facilmente com um palito. A gordura deve estar translúcida e a carne desfiando.

## Dica de Ouro

Nunca tenha pressa com cupim. Se duvidar, dê mais uma hora. Cupim apressado é cupim borrachudo.

---
*O cupim no bafo é a alma do churrasco brasileiro — puro, lento e generoso.*`
  },
  // ─── 29 ──────────────────────────────────
  {
    slug: 'denver-steak-corte-surpreendente',
    title: 'Denver Steak: O Corte Surpreendente que Pouca Gente Conhece',
    excerpt: 'O Denver Steak é um dos cortes mais macios e saborosos do dianteiro do boi. Descubra por que este corte subestimado é o favorito dos açougueiros.',
    cover_image: 'https://images.unsplash.com/photo-1594221708779-94832f4320d1?w=1200',
    categoria: 'cortes',
    tags: ['denver', 'steak', 'cortes', 'dianteiro', 'acém'],
    author: 'Equipe Brasassado',
    read_time: 6,
    featured: false,
    published_at: '2024-05-20T10:00:00Z',
    content: `# Denver Steak: O Corte Que Surpreende

O **Denver Steak** é retirado do acém (chuck) — uma região geralmente associada a carnes de segunda. Mas o Denver é diferente.

## Por Que é Especial?

- Quarto corte mais macio do boi inteiro
- Marmoreio excepcional para um corte do dianteiro
- Preço significativamente menor que cortes traseiros
- Sabor intenso e "beefy"

## Como Identificar

O Denver é extraído do músculo serrátil ventral (serratus ventralis), entre a paleta e o acém. Tem formato retangular, com marmoreio visível.

## Preparo Ideal

1. Bifes de 2,5 a 3cm de espessura
2. Tempere com sal e pimenta 40+ min antes
3. Grelha muito quente — sele 3-4 min por lado
4. Temperatura interna: 55-60°C
5. Repouse 5-8 minutos

## Dica

Peça ao açougueiro especificamente pelo Denver Steak ou "bife do acém". Muitos açougueiros guardam este corte para consumo próprio — é tão bom assim.

---
*O Denver Steak prova que os melhores segredos estão nos cortes que ninguém olha.*`
  },
  // ─── 30 ──────────────────────────────────
  {
    slug: 'brisket-defumado-guia-texas',
    title: 'Brisket Defumado: O Guia Completo Estilo Texas',
    excerpt: 'O brisket é o corte sagrado do BBQ texano. Aprenda a técnica completa de defumação de 12-16 horas para o brisket que derrete na boca.',
    cover_image: 'https://images.unsplash.com/photo-1610614991525-5a3a50d46b5d?w=1200',
    categoria: 'internacional',
    tags: ['brisket', 'texas', 'defumação', 'bbq', 'low-and-slow'],
    author: 'Equipe Brasassado',
    read_time: 14,
    featured: true,
    published_at: '2024-05-25T10:00:00Z',
    content: `# Brisket Defumado Estilo Texas

No Texas, o **brisket** é religião. É o corte que separa amadores de pitmasters.

## O Corte

O brisket é o peito do boi, dividido em duas partes:
- **Flat** (ponta fina): mais magro, fatias uniformes
- **Point** (ponta grossa): mais gordo, ideal para desfiado

## O Rub Texano

No Texas central (estilo Franklin BBQ), é simples:
- 50% sal grosso moído
- 50% pimenta-do-reino grossa

Essa simplicidade brutal deixa a carne e a fumaça brilharem.

## O Processo

### Preparação
1. Apare gordura para 6-7mm de espessura uniforme
2. Aplique o rub generosamente
3. Deixe na geladeira por 12-24h

### Defumação
1. Defumador a 107°C com carvalho
2. Coloque o brisket com gordura para cima
3. Defume até a temperatura interna atingir 74°C (~8-10h)
4. Embrulhe em papel kraft (Texas crutch)
5. Continue até 96-99°C internamente (~4-6h)

### O Teste do Palito

Espete um palito na parte mais grossa. Deve penetrar como manteiga morna.

### Repouso

Envolva em toalhas e coloque em cooler por **2-4 horas**. Esse repouso é crucial.

## Madeiras

- **Carvalho (Post Oak):** o clássico do Texas
- **Nogueira (Hickory):** mais intenso

---
*O brisket perfeito é 50% técnica, 50% paciência, e 100% obsessão.*`
  },
  // ─── 31 ──────────────────────────────────
  {
    slug: 'acem-bourguignon-churrasqueira',
    title: 'Acém na Churrasqueira: Do Corte Barato ao Prato Gourmet',
    excerpt: 'O acém é um corte econômico que, com a técnica certa, produz resultados extraordinários na churrasqueira. Aprenda como transformar o acém em estrela.',
    cover_image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1200',
    categoria: 'cortes',
    tags: ['acém', 'cortes', 'econômico', 'dianteiro', 'técnica'],
    author: 'Equipe Brasassado',
    read_time: 7,
    featured: false,
    published_at: '2024-05-30T10:00:00Z',
    content: `# Acém na Churrasqueira

O **acém** (chuck) é o corte mais popular do dianteiro do boi. Rico em colágeno e com sabor profundo, merece mais respeito.

## Por Que o Acém é Subestimado?

O acém tem muito tecido conjuntivo, o que faz muita gente desistir. Mas é exatamente esse colágeno que, com cocção lenta, se transforma em gelatina — dando textura aveludada e sabor incomparável.

## Método: Low & Slow na Churrasqueira

1. Peça o acém em peça inteira (2-3kg)
2. Tempere com sal grosso, alho e pimenta
3. Sele em fogo direto forte por 10 min (todos os lados)
4. Embrulhe em alumínio com caldo de carne ou cerveja
5. Asse em calor indireto a 130°C por **4-5 horas**
6. Abra e finalize por 20 min

## Teste de Pronto

O acém está pronto quando desfia facilmente com dois garfos. A gordura deve estar totalmente translúcida.

## Dica de Ouro

Compre acém com a capa de gordura. Ela protege a carne durante a cocção longa e adiciona sabor.

---
*No churrasco, não existe corte ruim — existe técnica errada.*`
  },
  // ─── 32 ──────────────────────────────────
  {
    slug: 'cordeiro-patagonia-ervas-finas',
    title: 'Cordeiro da Patagônia: Receita com Ervas Finas e Molho de Menta',
    excerpt: 'O cordeiro patagônico é uma das carnes mais nobres do mundo. Aprenda a receita completa com marinada de ervas finas e molho de menta fresca.',
    cover_image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=1200',
    categoria: 'receitas',
    tags: ['cordeiro', 'patagônia', 'ervas', 'molho de menta', 'receita'],
    author: 'Equipe Brasassado',
    read_time: 11,
    featured: false,
    published_at: '2024-06-05T10:00:00Z',
    content: `# Cordeiro da Patagônia com Ervas Finas

O cordeiro da Patagônia é alimentado com pastagens naturais e tem sabor mais suave e delicado do que o cordeiro convencional.

## Cortes Ideais

- **Carré**: o mais elegante, ideal para impressionar
- **Pernil**: para servir muita gente
- **Paleta**: sabor intenso, cocção lenta

## Marinada de Ervas Finas

- 150ml de azeite extra-virgem
- 4 ramos de alecrim fresco
- 1 maço de tomilho
- 6 dentes de alho laminados
- Raspas e suco de 2 limões sicilianos
- 1 col. chá de mostarda Dijon
- Sal e pimenta-do-reino

Marine por **12-24 horas** na geladeira.

## Assando o Carré

1. Retire da geladeira 1h antes de assar
2. Sele em grelha muito quente por 2 min cada lado
3. Transfira para calor indireto
4. Asse até 57°C internamente (rosé perfeito)
5. Repouse 10 minutos coberto com alumínio

## Molho de Menta Fresco

- 1 maço de hortelã picada
- 3 col. sopa de vinagre de vinho branco
- 1 col. sopa de açúcar
- Pitada de sal

Misture e deixe repousar 30 min antes de servir.

---
*O cordeiro com ervas finas é a elegância do campo no seu prato.*`
  },
  // ─── 33 ──────────────────────────────────
  {
    slug: 'linguica-artesanal-receita-caseira',
    title: 'Linguiça Artesanal: Como Fazer em Casa do Zero',
    excerpt: 'Fazer linguiça artesanal em casa é mais simples do que parece. Aprenda a receita completa com dicas de tempero, embutimento e defumação.',
    cover_image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200',
    categoria: 'receitas',
    tags: ['linguiça', 'artesanal', 'caseira', 'embutido', 'receita'],
    author: 'Equipe Brasassado',
    read_time: 12,
    featured: false,
    published_at: '2024-06-10T10:00:00Z',
    content: `# Linguiça Artesanal Caseira

Fazer sua própria linguiça é um dos prazeres mais gratificantes da arte do churrasco.

## Equipamento Necessário

- Moedor de carne (manual ou elétrico)
- Funil para embutir (ou acessório do moedor)
- Tripa natural de porco (limpa, dessalgada)

## Receita: Linguiça Toscana

### Ingredientes (2kg)

- 1,5 kg de pernil suíno
- 500g de toucinho fresco
- 4 dentes de alho picados
- 2 col. sopa de sal
- 1 col. sopa de pimenta calabresa
- 1 col. chá de pimenta-do-reino
- 1 col. chá de erva-doce
- 100ml de vinho branco seco

### Processo

1. Corte a carne e toucinho em cubos de 3cm
2. Leve ao freezer por 30 min (facilita a moagem)
3. Moa no disco grosso (8-10mm)
4. Adicione temperos e vinho, misture bem
5. Embuta na tripa, fazendo gomos de 15cm
6. Descanse na geladeira por 24h antes de assar

## Na Churrasqueira

- Fure a tripa levemente para não estourar
- Brasa média — nunca fogo forte
- Vire a cada 5 minutos
- Total: 25-35 minutos

---
*A linguiça artesanal caseira não se compara com nada industrializado.*`
  },
  // ─── 34 ──────────────────────────────────
  {
    slug: 't-bone-steak-preparo-perfeito',
    title: 'T-Bone Steak: Como Preparar o Rei dos Steaks Americanos',
    excerpt: 'O T-Bone reúne dois dos melhores cortes do boi em um só: filé mignon e contrafilé. Aprenda a técnica perfeita para grelhar este steak clássico.',
    cover_image: 'https://images.unsplash.com/photo-1607116667980-3b2a8b964bef?w=1200',
    categoria: 'cortes',
    tags: ['t-bone', 'steak', 'filé mignon', 'contrafilé', 'premium'],
    author: 'Equipe Brasassado',
    read_time: 8,
    featured: false,
    published_at: '2024-06-15T10:00:00Z',
    content: `# T-Bone Steak: O Rei dos Steaks

O **T-Bone** é o steak que reúne o melhor de dois mundos: de um lado do osso em T, o **contrafilé** (strip); do outro, o **filé mignon** (tenderloin).

## T-Bone vs Porterhouse

A diferença é simples: o Porterhouse tem a porção de filé mignon **maior** (mínimo 3,2cm de largura segundo o USDA). O T-Bone tem o filé menor.

## O Desafio

O filé mignon cozinha mais rápido que o contrafilé. A técnica correta resolve isso.

## Método Perfeito

1. Bife de no mínimo 3cm de espessura
2. Tempere com sal e pimenta 1h antes
3. Posicione com o lado do filé mignon afastado do calor direto
4. Sele o lado do contrafilé primeiro (3-4 min)
5. Vire e sele o outro lado (3 min)
6. Use calor indireto até atingir 55-58°C
7. Repouse 8-10 min

## Manteiga Composta

Derreta sobre o steak ao servir:
- 100g de manteiga
- Alecrim e tomilho
- Alho assado
- Flor de sal

---
*O T-Bone é a prova de que às vezes não é preciso escolher — dá para ter tudo.*`
  },
  // ─── 35 ──────────────────────────────────
  {
    slug: 'ancho-steak-corte-argentino',
    title: 'Ancho Steak: O Corte Argentino que Conquistou o Brasil',
    excerpt: 'O Ancho é o bife de chorizo desossado, favorito absoluto das parrillas argentinas. Descubra por que este corte é considerado o mais saboroso do mundo.',
    cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
    categoria: 'cortes',
    tags: ['ancho', 'chorizo', 'argentina', 'steak', 'cortes'],
    author: 'Equipe Brasassado',
    read_time: 7,
    featured: false,
    published_at: '2024-06-20T10:00:00Z',
    content: `# Ancho Steak: O Corte Argentino

Na Argentina, o **Ancho** (ou bife de chorizo) é o corte mais pedido nas parrillas. Equivale ao nosso contrafilé/entrecôte, mas com um corte mais generoso.

## Características

- Corte do lombo (Longissimus dorsi)
- Marmoreio abundante no centro ("olho de gordura")
- Espessura ideal: 3-4 cm
- Peso por bife: 350-500g

## A Diferença Argentina

Na Argentina, o Ancho é cortado mais espesso e sempre com a capa de gordura lateral. Isso muda completamente a experiência.

## Preparo na Parrilla

1. Sal grueso (sal grosso) — somente isso
2. Parrilla bem quente, a 25cm das brasas
3. Coloque com gordura para baixo primeiro
4. 7-8 minutos por lado (para ao ponto)
5. **Nunca pressione com a espátula** — perde os sucos
6. Repouse 5 minutos

## Acompanhamento Clássico

- Chimichurri fresco
- Provoleta grelhada
- Salada criolla
- Malbec de Mendoza

---
*O Ancho argentino mostra que o contrafilé brasileiro tem um primo ainda mais saboroso.*`
  },
  // ─── 36 ──────────────────────────────────
  {
    slug: 'file-mignon-churrasqueira-nao-na-frigideira',
    title: 'Filé Mignon na Churrasqueira: Por Que é Melhor que na Frigideira',
    excerpt: 'O filé mignon não precisa ficar preso à cozinha. Na churrasqueira, ele ganha sabor defumado e crocância que a frigideira nunca vai dar.',
    cover_image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200',
    categoria: 'tecnicas',
    tags: ['filé mignon', 'técnica', 'churrasqueira', 'steak', 'premium'],
    author: 'Equipe Brasassado',
    read_time: 7,
    featured: false,
    published_at: '2024-06-25T10:00:00Z',
    content: `# Filé Mignon na Churrasqueira

O filé mignon (psoas maior) é o corte mais macio do boi. Mas na churrasqueira, ele ganha uma dimensão que a frigideira nunca alcança.

## O Problema do Filé na Churrasqueira

O filé mignon é magro — quase sem gordura intramuscular. Isso significa que seca rápido se não tiver cuidado.

## A Solução: Reverse Sear

### Fase 1: Low
1. Corte medalhões de 5-6cm de espessura
2. Tempere com sal e pimenta
3. Coloque em calor indireto a 110°C
4. Asse até 48-50°C internamente (~25-30 min)

### Fase 2: Sear
1. Transfira para calor direto MÁXIMO
2. Sele 60-90 segundos por lado
3. Pincele com manteiga derretida com alho e alecrim

## Bacon Wrapping

Envolva cada medalhão com uma fatia de bacon presa com palito. O bacon adiciona a gordura que o filé não tem.

## Temperatura Final

- Mal passado: 52°C (recomendado!)
- Ao ponto: 58-60°C
- Além disso: desperdício

---
*O filé mignon na churrasqueira é luxo com sabor de brasa.*`
  },
  // ─── 37 ──────────────────────────────────
  {
    slug: 'costela-janela-churrasco-gaucho',
    title: 'Costela Janela: O Corte Mais Espetacular do Churrasco Gaúcho',
    excerpt: 'A costela janela (window ribs) é o corte mais imponente que existe. Com ossos expostos e carne suculenta, é a estrela do churrasco gaúcho.',
    cover_image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1200',
    categoria: 'cortes',
    tags: ['costela janela', 'gaúcho', 'cortes', 'churrasco', 'tradição'],
    author: 'Equipe Brasassado',
    read_time: 10,
    featured: false,
    published_at: '2024-07-01T10:00:00Z',
    content: `# Costela Janela: A Estrela do Churrasco Gaúcho

A **costela janela** (ou window ribs) é o corte com os ossos aparados e a carne cortada de forma que parece uma "janela". É visualmente impressionante e de sabor incomparável.

## Características

- Peso: 3-6kg por peça
- Ossos longos e expostos
- Camada generosa de carne entre os ossos
- Rica em colágeno e gordura

## Preparo Gaúcho Tradicional

### Tempero
Apenas **sal grosso** — nada mais. A tradição gaúcha respeita o sabor da carne.

### Fogo de Chão
1. Espete no espeto grande (galho de madeira ou espeto de ferro)
2. Posicione a 60-80cm das brasas
3. Osso para baixo nas primeiras 2 horas
4. Vire e asse por mais 2-3 horas
5. Regue com salmoura (água + sal) a cada 30 min

### Tempo Total

4-6 horas dependendo do tamanho. Temperatura interna: 88-92°C para a carne desprender dos ossos.

## Teste de Pronto

A carne deve retrair dos ossos e os ossos devem "girar" facilmente quando torcidos. A gordura deve estar completamente translúcida.

---
*A costela janela é o símbolo máximo do churrasco gaúcho — monumental e inesquecível.*`
  },
  // ─── 38 ──────────────────────────────────
  {
    slug: 'picanha-suina-corte-revelacao',
    title: 'Picanha Suína: O Corte Revelação que Vai Surpreender seu Churrasco',
    excerpt: 'A picanha suína é um corte acessível, saboroso e perfeito para a churrasqueira. Descubra como preparar este corte que está conquistando o Brasil.',
    cover_image: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=1200',
    categoria: 'receitas',
    tags: ['picanha suína', 'porco', 'cortes', 'receita', 'econômico'],
    author: 'Equipe Brasassado',
    read_time: 6,
    featured: false,
    published_at: '2024-07-05T10:00:00Z',
    content: `# Picanha Suína: O Corte Revelação

A **picanha suína** é equivalente em posição à picanha bovina — é a parte superior do pernil, com uma generosa capa de gordura.

## Por Que Escolher

- Preço acessível (30-50% mais barata que a bovina)
- Sabor suave e adocicado
- Capa de gordura que derrete e cria crocância
- Peso ideal: 800g-1,2kg

## Marinada Especial

- 4 dentes de alho amassados
- 2 col. sopa de mostarda
- 1 col. sopa de mel
- 1 col. sopa de páprica defumada
- Suco de 1 limão
- Sal e pimenta

Marine por **4-8 horas**.

## Assando

1. Inicie com gordura para baixo em fogo médio-alto
2. Sele por 8-10 min até a gordura crocante
3. Vire e asse em calor indireto por 25-30 min
4. Temperatura interna mínima: **63°C** (segurança para suínos)
5. Repouse 10 minutos

## Dica

Faça cortes superficiais em X na capa de gordura — ajuda a derreter uniformemente e cria textura crocante incrível.

---
*A picanha suína é a prova de que grandes descobertas podem custar pouco.*`
  },
  // ─── 39 ──────────────────────────────────
  {
    slug: 'flat-iron-steak-segundo-mais-macio',
    title: 'Flat Iron Steak: O Segundo Corte Mais Macio do Boi',
    excerpt: 'O Flat Iron é cientificamente o segundo corte mais macio do boi, perdendo apenas para o filé mignon. E custa uma fração do preço. Conheça este tesouro.',
    cover_image: 'https://images.unsplash.com/photo-1594221708779-94832f4320d1?w=1200',
    categoria: 'cortes',
    tags: ['flat iron', 'steak', 'cortes', 'paleta', 'macio'],
    author: 'Equipe Brasassado',
    read_time: 6,
    featured: false,
    published_at: '2024-07-10T10:00:00Z',
    content: `# Flat Iron Steak

O **Flat Iron** (infraspinatus) é extraído da paleta do boi. Segundo pesquisas da Universidade da Flórida e de Nebraska, é o **segundo corte mais macio do boi inteiro**, perdendo apenas para o filé mignon.

## A História

O Flat Iron foi "descoberto" em 2001 por pesquisadores americanos que buscavam valorizar cortes do dianteiro. Antes disso, toda a paleta ia para carne moída ou guisado.

## Características

- Marmoreio excelente
- Maciez excepcional
- Sabor mais intenso que filé mignon
- Formato retangular e fino
- Preço: 40-60% mais barato que filé

## Preparo

1. Bifes de 2-2,5cm de espessura
2. Sal e pimenta — suficiente
3. Grelha extremamente quente
4. 2-3 minutos por lado
5. Temperatura ideal: 52-57°C
6. Repouse 5 minutos

## Atenção

O Flat Iron tem um nervo central que divide o corte. O ideal é que o açougueiro remova esse nervo, dividindo em duas metades.

---
*O Flat Iron é possivelmente o melhor segredo da carne bovina mundial.*`
  },
  // ─── 40 ──────────────────────────────────
  {
    slug: 'tri-tip-maminha-california-style',
    title: 'Tri-Tip (Maminha) Estilo Califórnia: O Churrasco da Costa Oeste',
    excerpt: 'O Tri-Tip é a maminha brasileira preparada ao estilo californiano com rub especial e defumação leve. Uma fusão de sabores que você precisa experimentar.',
    cover_image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200',
    categoria: 'internacional',
    tags: ['tri-tip', 'maminha', 'califórnia', 'santa maria', 'bbq'],
    author: 'Equipe Brasassado',
    read_time: 8,
    featured: false,
    published_at: '2024-07-15T10:00:00Z',
    content: `# Tri-Tip Estilo Califórnia

O **Tri-Tip** é o mesmo corte que chamamos de maminha no Brasil. Mas na Califórnia, especialmente em Santa Maria, ele ganhou uma identidade própria.

## A Tradição de Santa Maria

Desde os anos 1950, a cidade de Santa Maria, na costa central da Califórnia, faz churrasco de Tri-Tip sobre brasas de carvalho vermelho (Red Oak).

## Santa Maria Rub

- 2 col. sopa de sal grosso
- 1 col. sopa de pimenta-do-reino grossa
- 1 col. sopa de alho em pó
- 1 col. chá de cebola em pó
- Opcional: páprica e cayena

## Método Santa Maria

1. Aplique o rub generosamente
2. Grelha a 30cm das brasas de carvalho
3. Asse por 20-25 min por lado
4. Temperatura interna: 55-60°C (medium-rare)
5. Repouse 15 minutos
6. Fatie contra as fibras

## Salsa de Santa Maria

- Tomate picado
- Cebola roxa
- Pimentão verde e jalapeño
- Coentro fresco
- Suco de limão

## A Fusão Brasil-Califórnia

Muitos brasileiros nos EUA já descobriram que o Tri-Tip americano é a maminha de casa — e fazem fusões incríveis.

---
*O Tri-Tip californiano mostra que o mesmo corte pode contar histórias diferentes ao redor do mundo.*`
  },
]

// ─────────────────────────────────────────────
//  SETUP SCHEMA
// ─────────────────────────────────────────────
async function setupSchema() {
  if (!isNeon) {
    console.log('📋 Modo JSON — schema não necessário.')
    return
  }
  console.log('📋 Criando schema (Neon)...')
  
  await sql!`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
  
  await sql!`
    CREATE TABLE IF NOT EXISTS articles (
      id           SERIAL PRIMARY KEY,
      slug         TEXT UNIQUE NOT NULL,
      title        TEXT NOT NULL,
      excerpt      TEXT NOT NULL,
      content      TEXT NOT NULL,
      cover_image  TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200',
      categoria    TEXT NOT NULL,
      tags         TEXT[] DEFAULT '{}',
      author       TEXT NOT NULL DEFAULT 'Equipe BrasAssado',
      read_time    INT  NOT NULL DEFAULT 5,
      published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      featured     BOOLEAN NOT NULL DEFAULT false,
      views        INT NOT NULL DEFAULT 0
    )
  `
  
  await sql!`CREATE INDEX IF NOT EXISTS idx_articles_slug      ON articles(slug)`
  await sql!`CREATE INDEX IF NOT EXISTS idx_articles_categoria ON articles(categoria)`
  await sql!`CREATE INDEX IF NOT EXISTS idx_articles_featured  ON articles(featured)`
  await sql!`CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at DESC)`
  
  await sql!`
    CREATE TABLE IF NOT EXISTS categorias (
      id          SERIAL PRIMARY KEY,
      slug        TEXT UNIQUE NOT NULL,
      name        TEXT NOT NULL,
      description TEXT,
      icon        TEXT DEFAULT '🔥'
    )
  `
  
  await sql!`
    INSERT INTO categorias (slug, name, description, icon) VALUES
      ('tecnicas',       'Técnicas',          'Métodos e segredos do churrasco perfeito',          '🔥'),
      ('cortes',         'Cortes de Carne',   'Tudo sobre os melhores cortes para assar',          '🥩'),
      ('receitas',       'Receitas',          'Receitas completas e passo a passo',                '📖'),
      ('equipamentos',   'Equipamentos',      'Churrasqueiras, espetos, acessórios e mais',        '⚙️'),
      ('internacional',  'Internacional',     'Asado argentino, parrilla, BBQ americano e mais',   '🌎'),
      ('acompanhamentos','Acompanhamentos',   'Farofas, molhos, saladas e bebidas',                '🥗'),
      ('curiosidades',   'Curiosidades',      'História, cultura e curiosidades sobre o churrasco','📚')
    ON CONFLICT DO NOTHING
  `
  
  console.log('✅ Schema criado com sucesso!')
}

// ─────────────────────────────────────────────
//  SEED ARTICLES
// ─────────────────────────────────────────────
async function seedArticles() {
  console.log(`\n🥩 Inserindo ${articles.length} artigos...\n`)

  if (!isNeon) {
    // ── Modo JSON: salvar em data/articles.json ──
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    const filePath = path.join(dataDir, 'articles.json')

    const articlesWithId = articles.map((article, i) => ({
      id: i + 1,
      ...article,
      views: 0,
    }))

    fs.writeFileSync(filePath, JSON.stringify(articlesWithId, null, 2), 'utf-8')
    console.log(`  ✅ ${articlesWithId.length} artigos salvos em data/articles.json`)
    return
  }

  // ── Modo Neon: inserir no PostgreSQL ──
  let inserted = 0
  let skipped = 0
  
  for (const article of articles) {
    try {
      await sql!`
        INSERT INTO articles (
          slug, title, excerpt, content, cover_image,
          categoria, tags, author, read_time, published_at, featured
        ) VALUES (
          ${article.slug},
          ${article.title},
          ${article.excerpt},
          ${article.content},
          ${article.cover_image},
          ${article.categoria},
          ${article.tags},
          ${article.author},
          ${article.read_time},
          ${article.published_at},
          ${article.featured}
        )
        ON CONFLICT (slug) DO UPDATE SET
          title        = EXCLUDED.title,
          excerpt      = EXCLUDED.excerpt,
          content      = EXCLUDED.content,
          cover_image  = EXCLUDED.cover_image,
          categoria    = EXCLUDED.categoria,
          tags         = EXCLUDED.tags,
          author       = EXCLUDED.author,
          read_time    = EXCLUDED.read_time,
          featured     = EXCLUDED.featured
      `
      console.log(`  ✅ [${article.categoria}] ${article.title.substring(0, 60)}...`)
      inserted++
    } catch (err) {
      console.error(`  ❌ Erro ao inserir "${article.slug}":`, err)
      skipped++
    }
  }
  
  console.log(`\n🎉 Concluído! ${inserted} artigos inseridos, ${skipped} erros.\n`)
}

// ─────────────────────────────────────────────
//  MAIN
// ─────────────────────────────────────────────
async function main() {
  console.log('🔥 Churrasco Blog — Seed Script')
  console.log(`   Modo: ${isNeon ? '🐘 Neon PostgreSQL' : '📄 JSON local'}`)
  console.log('================================\n')
  
  if (isNeon && !process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL não definida. Necessária quando DB_MODE=neon.')
    process.exit(1)
  }
  
  await setupSchema()
  await seedArticles()
  
  // Verificação final
  if (isNeon) {
    const count = await sql!`SELECT COUNT(*) as total FROM articles`
    console.log(`📊 Total de artigos no banco: ${count[0].total}`)
    
    const categorias = await sql!`SELECT categoria, COUNT(*) as qtd FROM articles GROUP BY categoria ORDER BY qtd DESC`
    console.log('\n📁 Por categoria:')
    categorias.forEach((c) => {
      console.log(`   ${c.categoria}: ${c.qtd} artigos`)
    })
  } else {
    const dataFile = path.join(process.cwd(), 'data', 'articles.json')
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'))
    console.log(`\n📊 Total de artigos no JSON: ${data.length}`)
    
    const catMap: Record<string, number> = {}
    data.forEach((a: { categoria: string }) => {
      catMap[a.categoria] = (catMap[a.categoria] || 0) + 1
    })
    console.log('\n📁 Por categoria:')
    Object.entries(catMap)
      .sort((a, b) => b[1] - a[1])
      .forEach(([cat, qtd]) => {
        console.log(`   ${cat}: ${qtd} artigos`)
      })
  }
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
