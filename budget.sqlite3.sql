--
-- File generated with SQLiteStudio v3.2.1 on Tue Jan 15 09:19:01 2019
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: budget.sqlite3
CREATE TABLE [budget.sqlite3] (
    id     INTEGER PRIMARY KEY AUTOINCREMENT,
    name           UNIQUE,
    budget NUMERIC NOT NULL
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
