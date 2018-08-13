import sqlite3
import datetime
from helpers import *

connection = sqlite3.connect('python_bears.db')
connection.row_factory = sqlite3.Row
cursor = connection.cursor()

print(dict(fetchOne(cursor, 'zoos')))
print(dict(fetchOne(cursor, 'bears')))
connection.close()
# cursor.execute('CREATE TABLE zoos (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, created_at DATE)')
# cursor.execute('CREATE TABLE bears (id INTEGER PRIMARY KEY AUTOINCREMENT, zoo_id INTEGER, species TEXT, latin_name TEXT, created_at DATE)')
# sql_insert_zoos(cursor, 'LambdaZoo')
# sql_insert_bears(cursor, 1, 'Little Bear', 'Generic Bear')
# connection.commit()
