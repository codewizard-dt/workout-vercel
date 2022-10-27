#!/bin/sh

echo ""
echo "Vercel deployment script"
# create /dist folder if does not exist
if [ -d "dist" ]; then
  rm -r dist/*
else
  mkdir dist && echo " - /dist created" 
fi

echo ""
echo "React build step"

cp -r ./client/build/* ./dist && echo " - /client/build/* moved to /dist"

echo ""
echo "Express build step"
if [ -d "dist/api" ]; then
  rm -r dist/api/*
else
  mkdir dist/api && echo " - /dist/api created for vercel express deployment"
fi

cp -r ./server/build/* ./dist/api && echo " - /server/build/* moved to /dist/api"

echo ""
echo " > Build completed"
echo ""