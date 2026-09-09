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
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    nome VARCHAR NOT NULL,

    email VARCHAR NOT NULL UNIQUE,

    senha VARCHAR NOT NULL,

    role usuario_role_enum NOT NULL DEFAULT 'ATENDENTE',

    "criadoEm" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

