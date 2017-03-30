#! /bin/sh

files=$(find ./package.nw/app/dist -type f -name '*.js')

echo $files | xargs sed -i 's/\.\/main\.js/.\/Main\.js/g'
echo $files | xargs sed -i 's/Create\/create/create\/create/g'
echo $files | xargs sed -i 's/config\/appServiceConfig\.js/config\/appserviceConfig\.js/g'

