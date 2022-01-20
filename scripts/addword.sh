#!/bin/bash

# Validate input
if [ -z "$1" ]
then
      echo $'Please provide a new word to add: \n\n   npm run addword -- newword \n'
      exit 1
fi

FILE_NAME="shared/words.mjs"

echo "Adding \"$1\" to the list of used words in \"$FILE_NAME\"..."

# Get the array text by getting 
# the first line from $file_name.
OLD_LINE="$(head -1 $FILE_NAME)"

# Add a word on the end by replacing 
# the closing bracking with a new 
# entry wrapped in quotes plus 
# a new closing bracket.
NEW_LINE="${OLD_LINE/]/, \"$1\"]}"

# Replace the first line in the file
# with the new line.
sed -i "" "1s/.*/$NEW_LINE/" $FILE_NAME
echo "Done!"

npm run js
git add -A
git commit -m "Add used word: $1"

