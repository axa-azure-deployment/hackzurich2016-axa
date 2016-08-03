#!/bin/bash 
NO=$1
Cmin=$2
Cmax=$3
if [ -z "${NO}" ]; then
	NO=20
fi

if [ -z "${Cmin}" ]; then
        Cmin=1
fi
if [ -z "${Cmax}" ]; then
        Cmax=$[$Cmin+19]
fi

echo "["
i=0
while [ $i -lt $NO ]
do
	if [ $i -gt 0 ]; then
		echo ", "
	fi
	export Z=`awk 'BEGIN{srand();print int(rand()*3) }'`
	export R=`awk 'BEGIN{srand();print int(rand()*9)+1 }'`
	export C=`awk 'BEGIN{srand();print int(rand()*'$Cmax')+'$Cmin' }'`
	echo "   `faker-cli --locale de_CH --helpers createTransaction`" | sed 's/2012-02-01/2016-07-'$Z$R'/g' | sed 's/{/{"customer":"'$C'",/g'
	i=$[$i+1]
done
echo "]"
