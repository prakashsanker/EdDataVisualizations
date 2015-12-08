#!/bin/bash

export PATH=$PATH:/usr/local/bin
echo "Cleaning up previous processes"
eval killall -9 grunt
eval killall -9 go
echo "Running npm install to pull dependencies"
eval npm install --save
echo "Pulling go dependencies"
eval go get github.com/gorilla/mux
echo "Building Karna"
eval grunt build
eval grunt default &
cd server
echo "Running go server"
eval go run *.go &