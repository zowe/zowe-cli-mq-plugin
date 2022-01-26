#!/usr/bin/env bash
set -e # fail the script if we get a non zero exit code
qmgr=$1
script=$2
host=$3
port=$4
user=$5
password=$6

zowe mq run mqsc $qmgr  "$script" --host $host --port $port --user $user --password $password