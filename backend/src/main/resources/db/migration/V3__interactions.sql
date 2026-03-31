CREATE TABLE interactions (
    id          BIGSERIAL PRIMARY KEY,
    lead_id     BIGINT       NOT NULL REFERENCES leads(id),
    type        VARCHAR(20)  NOT NULL,
    content     TEXT,
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_interactions_lead_id ON interactions(lead_id);
