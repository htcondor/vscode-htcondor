LOG_FILE = /home/mjhartke/test.log

while true; do
    rsync -avz mjhartke@submit-2.chtc.wisc.edu:/home/mjhartke/test.log /Users/maxhartke/htc/src/test.log
    sleep 1
done
