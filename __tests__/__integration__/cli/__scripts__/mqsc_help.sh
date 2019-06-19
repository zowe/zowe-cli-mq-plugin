#!/bin/bash
set -e

echo "===============MQ MQSC HELP==============="

zowe mq run mqsc --help
if [ $? -gt 0 ]
then
    exit $?
fi