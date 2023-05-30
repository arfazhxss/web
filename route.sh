#!/bin/bash
#auto-git v4.5

echo "Commit Message:"
read commit_message

if [[ -z "$commit_message" || ${#commit_message} -lt 3 ]]; then
  commit_message="Routine Commit"
  git add . && \
  git add -u && \
  git commit -m $"$commit_message"$'\nby @arfazhxss on '"$(date +'%a %d %b %Y')" && \
  git push origin HEAD
  git log > commit-hist.txt
  rm -rf .DS_Store/
else
  git add . && \
  git add -u && \
  git commit -m $"$commit_message"$'\nCommit by @arfazhxss on '"$(date +'%a %d %b %Y')" && \
  git push origin HEAD
  git log > commit-hist.txt
  rm -rf .DS_Store/
fi
