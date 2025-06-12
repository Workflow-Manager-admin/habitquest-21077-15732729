#!/bin/bash
cd /home/kavia/workspace/code-generation/habitquest-21077-15732729/habitquest_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

