CREATE TABLE IF NOT EXISTS evento
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    ativo boolean DEFAULT false,
    data_final date,
    data_inicial date,
    nome varchar(255) NOT NULL,
    instituicao_id integer,
    CONSTRAINT evento_pkey PRIMARY KEY (id),
    CONSTRAINT fk_evento_instituicao_id FOREIGN KEY (instituicao_id) REFERENCES instituicao
);
CREATE INDEX idx_data_inicial ON evento (data_inicial);
CREATE INDEX idx_data_final ON evento (data_final);