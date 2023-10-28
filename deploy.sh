#!/usr/bin/env bash

npm run build

PROFILE_NAME=$(whoami)
PATH_NAME=$(pwd)/build

echo $PATH_NAME
echo $PROFILE_NAME

aws s3 --profile $PROFILE_NAME cp $PATH_NAME s3://lingvocards.space/ --recursive

aws cloudfront create-invalidation \
    --distribution-id E3UIW9XS7KUS57 \
    --paths "/*"
