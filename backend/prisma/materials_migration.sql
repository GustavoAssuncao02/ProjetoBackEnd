USE ecommerce;

CREATE TABLE IF NOT EXISTS materials (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  activated BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY name (name)
);

INSERT INTO materials (name, activated) VALUES
  ('Algodão', TRUE),
  ('Algodão Pima', TRUE),
  ('Poliéster', TRUE),
  ('Poliamida', TRUE),
  ('Elastano', TRUE),
  ('Viscose', TRUE),
  ('Linho', TRUE),
  ('Lã', TRUE),
  ('Couro', TRUE),
  ('Couro sintético', TRUE),
  ('Jeans', TRUE),
  ('Sarja', TRUE),
  ('Moletom', TRUE),
  ('Fleece', TRUE),
  ('Malha', TRUE),
  ('Tricoline', TRUE),
  ('Suede', TRUE),
  ('Veludo', TRUE),
  ('Cotelê', TRUE),
  ('Nylon', TRUE),
  ('Tactel', TRUE),
  ('Dry fit', TRUE),
  ('Microfibra', TRUE),
  ('Cetim', TRUE),
  ('Seda', TRUE),
  ('Chiffon', TRUE),
  ('Tule', TRUE),
  ('Ribana', TRUE),
  ('Tweed', TRUE),
  ('Softshell', TRUE),
  ('Lona', TRUE),
  ('Acrílico', TRUE),
  ('Outro', TRUE)
ON DUPLICATE KEY UPDATE
  activated = VALUES(activated),
  updated_at = CURRENT_TIMESTAMP;

ALTER TABLE products
  ADD COLUMN material_id INT NULL AFTER description;

UPDATE products p
INNER JOIN materials m
  ON LOWER(TRIM(p.material)) = LOWER(TRIM(m.name))
SET p.material_id = m.id
WHERE p.material IS NOT NULL
  AND TRIM(p.material) <> '';

UPDATE products
SET material_id = (SELECT id FROM materials WHERE name = 'Outro' LIMIT 1)
WHERE material_id IS NULL;

ALTER TABLE products
  MODIFY material_id INT NOT NULL;

ALTER TABLE products
  ADD INDEX fk_products_materials (material_id);

ALTER TABLE products
  ADD CONSTRAINT fk_products_materials
  FOREIGN KEY (material_id)
  REFERENCES materials(id)
  ON DELETE RESTRICT
  ON UPDATE CASCADE;

ALTER TABLE products
  DROP COLUMN material;
