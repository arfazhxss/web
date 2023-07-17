#!/bin/bash
# git workflow v6.8
# 2022-2023 @arfazhxss

unEnScore=50
unEnString=$(printf '_%.0s' $(seq 1 "$unEnScore"))

function versionCheck() {
  dir="$(dirname "$0")/.git"
  if [ ! -d "$dir" ]
  then
    echo -e "No Version Control History Found\nInitializing Git Version Control"
    git --version 
    git init
    flag=1
  else
    echo -e "\nVersion Control History found"
  fi
}


function syncBranch() {
  echo -e "YES'ED\n${unEnString}"
  git stash
  git stash clear
  git pull
  echo -e "${unEnString}\n\t\tYour Repository is synced\n\t\twith the latest commit :)\n${unEnString}"
}

function pushChanges() {
  git add . && \
  git add -u && \
  git commit -m $"$commt"$'\nCommit by @arfazhxss on '"$(date +'%a %d %b %Y')" && \
  git push origin HEAD
  git log > commit-hist.txt
  rm -Rf .DS_Store/
  echo -e "${unEnString}\n\t\tYour changes have been pushed\n\t\tto the repository :)\n${unEnString}"
}

find . -name ".DS_Store" -type f -delete
echo -e ".DS_Store\ncommit-hist.txt" > .gitignore
versionCheck
echo -e "\n${unEnString}\n\n\t\tDELETE LOCAL CHANGES? (YES) \n\t\t\tOR\n\t\tPUSH LOCAL CHANGES (ENTER)\n"
read -s -n 3 -p "(yes/ENTER): " answer

if [[ $answer == "yes" || $answer == "Yes" || $answer == "YES" ]]; then
  syncBranch
else
  echo -e "ENTER'ED\n${unEnString}"
  read -p "Your Commit Message: " commt

  if [[ -z "$commt" || ${#commt} -lt 3 ]]; then
    commt="Routine Commit"
    pushChanges
  else
    pushChanges
  fi
fi
