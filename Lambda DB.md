* create _accounts_ table
``` CREATE TABLE accounts (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    budget REAL
) ```