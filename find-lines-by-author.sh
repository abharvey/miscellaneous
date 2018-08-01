#!/bin/bash

for file in $(git ls-files); do git blame $file | grep $1; done
