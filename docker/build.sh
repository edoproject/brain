#!/bin/bash
tar cf brain.tar ../brain -C ..
tar -tf brain.tar
docker build -f Dockerfile -t brain .