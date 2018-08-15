import sqlite3
import datetime
from helpers import *

connection = sqlite3.connect('python_bears.db')
connection.row_factory = sqlite3.Row
cursor = connection.cursor()

cursor.execute('CREATE TABLE customers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, created_at DATE)')

cursor.execute('CREATE TABLE suppliers (id INTEGER PRIMARY KEY AUTOINCREMENT, zoo_id INTEGER, species TEXT, latin_name TEXT, created_at DATE)')

cursor.execute('CREATE TABLE orders (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, created_at DATE)')

cursor.execute('CREATE TABLE products (id INTEGER PRIMARY KEY AUTOINCREMENT, zoo_id INTEGER, species TEXT, latin_name TEXT, created_at DATE)')


sql_insert_zoos(cursor, 'LambdaZoo')
sql_insert_bears(cursor, 1, 'Little Bear', 'Generic Bear')
connection.commit()

print(dict(fetchOne(cursor, 'customers')))
print(dict(fetchOne(cursor, 'suppliers')))
print(dict(fetchOne(cursor, 'orders')))
print(dict(fetchOne(cursor, 'products')))

connection.close()