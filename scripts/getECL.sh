#!/bin/bash

echo 'Clean previous download'
rm -rf __MACOSX
rm framework.zip
rm -rf framework
rm -rf assets/vendor

echo 'Getting ECL version 0.23.0'
wget https://github.com/ec-europa/europa-component-library/releases/download/v0.23.0/framework.zip

echo 'De-compression ...'
unzip framework.zip

echo 'And moving the assets in the assets/ folder'
mkdir assets/vendor
mv framework assets/vendor/ecl
