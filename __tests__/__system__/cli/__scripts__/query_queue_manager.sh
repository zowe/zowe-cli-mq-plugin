#!/usr/bin/env bash
set -e # fail the script if we get a non zero exit code
qmgr=$1
script=$2

zowe mq run mqsc $qmgr  "$script"