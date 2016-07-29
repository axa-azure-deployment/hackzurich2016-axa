#!/bin/bash 
NO=$1
if [ -z "${NO}" ]; then
	NO=20
fi
echo "["
i=0
while [ $i -lt $NO ]
do
	if [ $i -gt 0 ]; then
		echo ", "
	fi
	echo "   `faker-cli --locale de_CH --helpers createTransaction | sed 's/2012-02/2016-07/g'`"
	i=$[$i+1]
done
echo "]"
