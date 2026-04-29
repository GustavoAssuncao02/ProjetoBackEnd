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

INSERT INTO materials (name, activated) VALUES ('Outro', TRUE)
ON DUPLICATE KEY UPDATE
  activated = VALUES(activated),
  updated_at = CURRENT_TIMESTAMP;

UPDATE products
SET material_id = (SELECT id FROM materials WHERE name = 'Outro' LIMIT 1)
WHERE material_id IS NULL;

ALTER TABLE products
  MODIFY material_id INT NOT NULL;
