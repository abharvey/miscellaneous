#!/bin/bash

listCommits()
{
  echo "Commits:"
  git shortlog --all -sn | grep $1
}


countLines()
{
# echo "$(log --author=\"$1\" --format=tformat: --numstat | q -t \"select sum(c1), sum(c2) from -\")"
  git log --shortstat --author="$1" | grep -E "fil(e|es) changed" | awk '{files+=$1; inserted+=$4; deleted+=$6} END {print "files changed: ", files, "lines inserted: ", inserted, "lines deleted: ", deleted }'
  echo " "
}

listAuthors()
{
  git log --format='%aN' | sort -u
}


IFS=$'\n'

if [ $# -eq 0 ]
then
  for i in $(listAuthors); do
    echo "$(listCommits $i)"
    echo "$(countLines $i)"
  done
else
  for var in "$@"
  do
    echo "$(listCommits $var)"
    echo "$(countLines $var)"
  done
fi

git clone --depth 1 $(git config --get remote.origin.url) temp-linecount-repo &&
  printf "('temp-linecount-repo' will be deleted automatically)\n\n\n" &&
  cloc temp-linecount-repo &&
  rm -rf temp-linecount-repo

