LOC=$HOME/Downloads
DLOC=`pwd -P`
echo "Listening to changes every 1s in ${LOC}/swagger.* to move to ${DLOC}"
while true
do
	if [ -f "$LOC/swagger.json" ]
	then
	  echo "`date` - copy swagger.json file to git"
	  mv $LOC/swagger.json $DLOC/swagger.json
	  echo "`date` - copy swagger.local.json file to git for localhost"
		cat $DLOC/swagger.json | sed 's/hackzurich16.azurewebsites.net/localhost\:3000/g' | sed 's/https:\/\/localhost/http:\/\/localhost/g' > $DLOC/swagger.local.json
	fi
	if [ -f "$LOC/swagger.yaml" ]
	then
		echo "`date` - copy swagger.yaml file to git"
		mv $LOC/swagger.yaml $DLOC
		echo "`date` - copy swagger.local.yaml file to git for localhost"
		cat $DLOC/swagger.yaml | sed 's/hackzurich16.azurewebsites.net/localhost\:3000/g' | sed 's/https:\/\/localhost/http:\/\/localhost/g' > $DLOC/swagger.local.yaml
	fi
	sleep 1
done

