while true
do
	LOC=$HOME/Downloads
	DLOC=$HOME/git/hackzurich2016-axa/rest-app/public/
	if [ -f "$LOC/swagger.json" ]
	then
	  echo "copy swagger.json file to git"
	  mv $LOC/swagger.json $DLOC/swagger.json
	fi
        if [ -f "$LOC/swagger.yaml" ]
        then
          echo "copy swagger.yaml file to git"
          mv $LOC/swagger.yaml $DLOC
        fi


	sleep 1
done

