from pathlib import Path

# watch log file and scp back to host machine

SUBMIT_FILE = tmp.sub
LOG_FILE = test.log

# scp log file to host machine user home directory

last_size = test.log.stat().st_size

while True:
    if test.log.stat().st_size > last_size:
        # scp log file to host machine user home directory
        last_size = test.log.stat().st_size
    else:
        pass



# watch log file