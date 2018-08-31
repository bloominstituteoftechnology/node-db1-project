def fetchOne(cursor, __from):
    cursor.execute(f"SELECT * FROM {__from}")
    row = cursor.fetchone()
    return row

def fetchAll(cursor, __from):
    cursor.execute(f"SELECT * FROM {__from}")
    rows = cursor.fetchall()
    return rows

def sql_insert_zoos(cursor, __name):
    cursor.execute("INSERT INTO zoos(name, created_at) VALUES (?, ?)", (__name, datetime.datetime.now()))

def sql_insert_bears(cursor, __zoo_id, __species, __latin_name):
    cursor.execute("INSERT INTO bears(zoo_id, species, latin_name, created_at) VALUES (?, ?, ?, ?)", (__zoo_id, __species, __latin_name, datetime.datetime.now()))
