#!/bin/bash
# route git 3.8

git add . && \
git add -u && \
git commit -m $'Routine Commit\nby @arfazhxss on '"$(date)" && \
git push origin HEAD
