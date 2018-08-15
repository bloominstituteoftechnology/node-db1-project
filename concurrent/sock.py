# server.py
# fib microservice

from socket import *
from fib import fib

def sock_server(address, foo):
    sock = socket(AF_INET, SOCK_STREAM)
    sock.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
    sock.bind(address)
    sock.listen(5)
    while True:
        client, addr = sock.accept()
        print("Connection", addr)
        function_handler(client, foo)

def function_handler(client, foo):
    while True:
        req = client.recv(100)
        if not req:
            break
        n = int(req)
        result = foo(n)
        resp = str(result).encode("ascii") + b"\n"
        client.send(resp)
    print("Closed")

sock_server(('', 25000), fib)