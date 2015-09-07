#!/bin/bash

echo "Cleaning up previous processes"
eval killall -9 grunt
eval killall -9 go
echo "Building Karna"
eval grunt watch &
cd server
echo "Running go server"
eval go run *.go &