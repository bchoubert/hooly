
--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE page_instance (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  generationDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  screenshot TEXT NOT NULL,
  pageUrl TEXT NOT NULL,
  content TEXT NOT NULL,
  CONSTRAINT FK_Instance_Page FOREIGN KEY (pageUrl)
    REFERENCES page (url) ON UPDATE CASCADE ON DELETE CASCADE
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE page_instance;
