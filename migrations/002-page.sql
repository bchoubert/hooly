
--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE page (
  url TEXT PRIMARY KEY,
  websiteDomain TEXT NOT NULL,
  CONSTRAINT FK_Page_Website FOREIGN KEY (websiteDomain)
    REFERENCES website (domain) ON UPDATE CASCADE ON DELETE CASCADE
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE page;
