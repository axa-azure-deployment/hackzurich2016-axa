SCRIPT_TO_RUN=$1
if [ -z "${SCRIPT_TO_RUN}" ]; then
	echo "call run.sh script with parameter eg import.js"
	exit 1
fi
 
read -s  -p "enter Mongo-Admin password:" pwd
mongo 40.68.213.58:27018/hackzurich2016-axa -u HackZurich2016-admin -p $pwd ${SCRIPT_TO_RUN}
