#!/bin/bash
# route git 4.2

echo "Commit Message:"
read commit_message

git add . && \
git add -u && \
git commit -m $"$commit_message"$'\nScheduled Commit by @arfazhxss on '"$(date)" && \
git push origin HEAD
git log > commit-hist.txt
rm -rf .DS_Store/