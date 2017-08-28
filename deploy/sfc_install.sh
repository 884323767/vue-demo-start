#!/bin/bash
DIR=`dirname $0`
. "$DIR/sfc_config.sh"
SOURCE_DIR=$ROOT_DIR/releases/`date +%Y%m%d_%H%M%S`

echo "Install $SOURCE_DIR..."
if [ ! -d $SOURCE_DIR ]
then
        mkdir -p $SOURCE_DIR
fi

cp -r $DIR/../ $SOURCE_DIR

ln -sfT $SOURCE_DIR $CURRENT_DIR

echo "Installed"
