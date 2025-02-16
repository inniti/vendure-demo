#! /bin/sh
tar -cvf ./deploy.tar Dockerfile ./src/* ./captain-definition ./package.json ./package-lock.json ./tsconfig.json ./static/*;
caprover deploy -t ./deploy.tar;