#!/bin/bash
#auto-git v6.0

echo -e "\n_______________________________________________________\n\n\t\tDELETE LOCAL CHANGES? (YES) \n\t\t\tOR\n\t\tPUSH LOCAL CHANGES (ENTER)\n"
read -s -n 3 -p "(yes/ENTER): " answer

if [[ $answer == "yes" || $answer == "Yes" || $answer == "YES" ]]; then
  echo -e "YES'ED\n-------------------------------------------------------"
  git stash
  git stash clear
  git pull
  echo -e "-------------------------------------------------------\n\t\tYour Repository is synced\n\t\twith the latest commit :)\n_______________________________________________________"
else
  echo -e "ENTER'ED\n-------------------------------------------------------"
  read -p "Your Commit Message: " commt

  if [[ -z "$commt" || ${#commt} -lt 3 ]]; then
    commt="Routine Commit"
    git add . && \
    git add -u && \
    git commit -m $"$commt"$'\nby @arfazhxss on '"$(date +'%a %d %b %Y')" && \
    git push origin HEAD
    git log > commit-hist.txt
    rm -rf .DS_Store/
    echo -e "-------------------------------------------------------\n\t\tYour changes has been pushed\n\t\tto the repository :)\n_______________________________________________________"
  else
    git add . && \
    git add -u && \
    git commit -m $"$commt"$'\nCommit by @arfazhxss on '"$(date +'%a %d %b %Y')" && \
    git push origin HEAD
    git log > commit-hist.txt
    rm -rf .DS_Store/
    echo -e "-------------------------------------------------------\n\t\tYour changes has been pushed\n\t\tto the repository :)\n_______________________________________________________"
  fi
fi
