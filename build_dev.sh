#!/bin/bash
if [ "$1" = "--no-cache" ]; then
    docker-compose build --no-cache && \
    docker-compose up --force-recreate
else
    docker-compose up --build -d
fi
