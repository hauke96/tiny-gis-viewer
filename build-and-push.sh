#!/usr/bin/env bash

# Exit on errors
set -e

# First parameter must be tag name
if [ -z $1 ]
then
	echo "ERROR: Specify tag name."
	echo
	echo "Example:"
	echo
	echo "    $(basename $0) \"0.8.0-dev\""
	exit 1
fi
TAG=$1

function ok {
	echo
	echo "OK"
}

function hline {
	echo
	printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' =
	echo " $1"
	printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' =
	echo
}

hline "[1/4] Build"
docker buildx build --progress=plain -t hauke96/tiny-gis-viewer:$TAG .
ok

hline "[2/4] Push server"
docker login --username=hauke96
docker push hauke96/tiny-gis-viewer:$TAG
ok

hline "[3/4] Build locally"
npm run build

hline "[4/4] Compress into ZIP file"
(
  cd dist/tiny-gis-viewer
  cp -r browser tgv
  zip -r -9 "tgv-$TAG.zip" ./tgv/
  mv "tgv-$TAG.zip" ../../
  rm -rf tgv
)
mv "dist/tiny-gis-viewer/tgv-$TAG.zip" .
echo "ZIP archive tgv-$TAG.zip created"

echo
printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' =
echo
echo "DONE"
