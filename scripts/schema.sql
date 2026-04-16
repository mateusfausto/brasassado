-- ============================================================
--  SCHEMA: Churrasco Blog
--  Banco: Neon PostgreSQL
--  Execute este script no SQL Editor do console.neon.tech
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS articles CASCADE;

CREATE TABLE articles (
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
);

CREATE INDEX idx_articles_slug      ON articles(slug);
CREATE INDEX idx_articles_categoria ON articles(categoria);
CREATE INDEX idx_articles_featured  ON articles(featured);
CREATE INDEX idx_articles_published ON articles(published_at DESC);

-- Tabela de categorias (metadata)
CREATE TABLE IF NOT EXISTS categorias (
  id          SERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  description TEXT,
  icon        TEXT DEFAULT '🔥'
);

INSERT INTO categorias (slug, name, description, icon) VALUES
  ('tecnicas',       'Técnicas',          'Métodos e segredos do churrasco perfeito',          '🔥'),
  ('cortes',         'Cortes de Carne',   'Tudo sobre os melhores cortes para assar',          '🥩'),
  ('receitas',       'Receitas',          'Receitas completas e passo a passo',                '📖'),
  ('equipamentos',   'Equipamentos',      'Churrasqueiras, espetos, acessórios e mais',        '⚙️'),
  ('internacional',  'Internacional',     'Asado argentino, parrilla, BBQ americano e mais',   '🌎'),
  ('acompanhamentos','Acompanhamentos',   'Farofas, molhos, saladas e bebidas',                '🥗'),
  ('curiosidades',   'Curiosidades',      'História, cultura e curiosidades sobre o churrasco','📚')
ON CONFLICT DO NOTHING;
