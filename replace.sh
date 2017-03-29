#! /bin/sh

files=find ./package.nw/app/dist -type f -name '*.js'

$files | xargs sed -i 's/\.\/main\.js/.\/Main\.js/g'
#find ./package.nw/app/dist -type f -name '*.js' | xargs sed -i 's/config\/appServiceConfig\.js/config\/appserviceConfig\.js/g'

