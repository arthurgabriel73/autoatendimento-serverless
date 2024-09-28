#!/usr/env/bin bash
set -e

# Refresh
rm -rfv nodejs
rm -rfv packages/nodejs.zip

# "Zip layer"
zip -r nodejs.zip nodejs
mv nodejs.zip packages
rm -rfv nodejs