# server.py
# fib microservice

from socket import *
from fib import fib

class AsyncSocket(object):
    def __init__(self, sock):
        self.sock = sock
    def recv(self, maxsize):
        yield 'recv', self.sock
        return self.sock.recv(maxsize)
    def send(self, data):
        yield 'send', self.sock
        return self.sock.send(data)
    def accept(self):
        yield 'recv', self.sock
        client, addr = self.sock.accept()
        return AsyncSocket(client), addr
    def __getattr__(self, name):
        return getattr(self.sock, name)

def sock_server(address, foo):
    sock = AsyncSocket(socket(AF_INET, SOCK_STREAM))
    sock.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
    sock.bind(address)
    sock.listen(5)
    while True:
        client, addr = yield from sock.accept()    # Waiting
        print("Connection", addr)
        tasks.append(function_handler(client, foo))

def function_handler(client, foo):
    while True:
        req = yield from client.recv(100)    # Waiting
        if not req:
            break
        n = int(req)
        futurer = pool.submit(foo, n)
        yield 'future', future
        result = future.result()
        resp = str(result).encode("ascii") + b"\n"
        yield from client.send(resp)    # Waiting
    print("Closed")

tasks.append(sock_server(('', 25000), fib))
run()