#!/usr/bin/env bash
set -e

zowe profiles create mq testProfile --host "myhost" --port 443 --user fakeuser --password fakepass --rejectUnauthorized false