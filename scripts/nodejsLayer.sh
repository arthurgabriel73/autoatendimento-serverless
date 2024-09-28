#!/usr/env/bin bash
set -e

# Refresh
rm -rfv nodejs
rm -rfv packages/nodejs.zip

mkdir packages
mkdir -p nodejs/node_modules

(
    cd nodejs
    npm init -y
)

# "Zip layer"
zip -r nodejs.zip nodejs
mv nodejs.zip packages
rm -rfv nodejs