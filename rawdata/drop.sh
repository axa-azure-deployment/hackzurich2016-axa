PP=`lsof -iTCP -sTCP:LISTEN | grep mongo | cut -d ":" -f 2 | cut -d " " -f 1`
mongo localhost:${PP}/hackzurich2016-axa drop.js
