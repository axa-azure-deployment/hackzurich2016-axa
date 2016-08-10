while true
do
	LOC=$HOME/Downloads
	DLOC=$HOME/git/hackzurich2016-axa/rest-app/dist/
	if [ -f "$LOC/swagger.json" ]
	then
	  echo "`date` - copy swagger.json file to git"
	  mv $LOC/swagger.json $DLOC/swagger.json
	  echo "`date` - copy swagger.local.json file to git for localhost"
		sed 's/hackzurich16.azurewebsites.net/localhost\:3000/g' $DLOC/swagger.json > $DLOC/swagger.local.json
	fi
        if [ -f "$LOC/swagger.yaml" ]
        then
          echo "`date` - copy swagger.yaml file to git"
          mv $LOC/swagger.yaml $DLOC
          echo "`date` - copy swagger.local.yaml file to git for localhost"
					sed 's/hackzurich16.azurewebsites.net/localhost\:3000/g' $DLOC/swagger.yaml > $DLOC/swagger.local.yaml
        fi


	sleep 1
done

