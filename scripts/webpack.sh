#!/bin/bash
# @file webpack.sh
#
# @version 1.0
#
# @author Calum Judd Anderson
#
# @brief Handles the webpack logic for the application
SCRIPTDIR=$(dirname "$0");
cd $SCRIPTDIR;
source logging.sh;

cd ..;

logInfo "Webpacking JTR";

if [ ! -d "build" ]; then
    mkdir build;
fi

./scripts/dom.js client/index.html build/index-webpack.html;
npx webpack;
