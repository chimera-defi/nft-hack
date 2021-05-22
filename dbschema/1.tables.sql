CREATE TABLE tbl_grid_items (
    id BIGSERIAL PRIMARY KEY,
    created_date DATETIME(3) NOT NULL,
    updated_date DATETIME(3) NOT NULL,
    network TEXT NOT NULL,
    token_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    resizable_image_url TEXT,
    owner_id TEXT NOT NULL
);
CREATE UNIQUE INDEX tbl_grid_items_uq_token_id_network ON tbl_grid_items (token_id, network);
CREATE INDEX tbl_grid_items_network ON tbl_grid_items (network);
CREATE INDEX tbl_grid_items_token_id ON tbl_grid_items (token_id);
CREATE INDEX tbl_grid_items_owner_id ON tbl_grid_items (owner_id);
