# coding=utf-8

import socket
import time
import json

host = "localhost"
port = 5678
print("begin")
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect((host, port))

while True:  # 循环收发数据包，长连接
    input_user = input()
    if(input_user != "exit"):

        data = {'type': "online_join", 'message': {'username': 'morty'}}
        result = json.dumps(data)
        client.send((result + '\r\n').encode())
        time.sleep(1)  # 如果想验证长时间没发数据，SOCKET连接会不会断开，则可以设置时间长一点

        data = {'type': "match_join", 'message':''}
        result = json.dumps(data)
        client.send((result + '\r\n').encode())
        time.sleep(1)  # 如果想验证长时间没发数据，SOCKET连接会不会断开，则可以设置时间长一点
    else:
        break
print("session over")
