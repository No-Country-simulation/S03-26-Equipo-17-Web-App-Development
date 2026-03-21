ALTER TABLE leads
ADD CONSTRAINT uq_leads_telefono UNIQUE (telefono);