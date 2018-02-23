#!/bin/bash

echo 'Clean previous download'
rm -rf __MACOSX
rm framework.zip
rm -rf framework
rm -rf assets/vendor

echo 'Getting ECL version 0.23.0'
wget https://github.com/ec-europa/europa-component-library/releases/download/v0.23.0/framework.zip

echo 'Moving ecl build into right folder'
mkdir assets/vendor
mkdir assets/vendor/ecl
mv framework.zip assets/vendor/ecl/ecl.zip

echo 'De-compression ...'
cd assets/vendor/ecl
unzip ecl.zip
rm ecl.zip
