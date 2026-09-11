-- =====================================================
-- ENUM DE PERFIS DO USUÁRIO
-- =====================================================

CREATE TYPE usuario_role_enum AS ENUM (
    'ADMIN',
    'GERENTE',
    'ATENDENTE'
);

-- =====================================================
-- TABELA USUARIOS
-- =====================================================

CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    nome VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    senha VARCHAR NOT NULL,
    role usuario_role_enum NOT NULL DEFAULT 'ATENDENTE',
    "criadoEm" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA REFRESH TOKENS
-- =====================================================

CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    token VARCHAR NOT NULL UNIQUE,
    "expiraEm" TIMESTAMP NOT NULL,
    "revogadoEm" TIMESTAMP NULL,
    "usuarioId" UUID NOT NULL,
    "criadoEm" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_refresh_tokens_usuario FOREIGN KEY ("usuarioId") REFERENCES usuarios (id) ON DELETE CASCADE
);