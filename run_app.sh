#!/bin/bash

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd $SCRIPTPATH

if [ "$AUTOUPDATE" == "yes" ] || [ "$AUTOUPDATE" == "YES" ] || [ "$AUTOUPDATE" == "y" ] || [ "$autoupdate" == "yes" ] || [ "$autoupdate" == "YES" ] || [ "$autoupdate" == "y" ]
then
 git pull
fi

php -S 0.0.0.0:80
