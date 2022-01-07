import threading


def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()
    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t


vvvar = 0


def consoleLog():
    print('OK ' + str(vvvar))
    vvv = vvvar + 1


set_interval(consoleLog, 1)