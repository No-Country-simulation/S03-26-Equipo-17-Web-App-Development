CREATE TABLE leads (
    id          BIGSERIAL PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL,
    email       VARCHAR(150),
    telefono    VARCHAR(20),
    estado      VARCHAR(20)  NOT NULL DEFAULT 'NUEVO',
    stale       BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
    last_activity TIMESTAMP  NOT NULL DEFAULT NOW(),
    deleted_by  BIGINT,
    deleted_at  TIMESTAMP
);