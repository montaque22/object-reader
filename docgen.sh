#!/usr/bin/env bash
echo "Copy Intro Mark Down..."
cp -f intro.md ReadMe.md

echo "Building Documentation..."
documentation build ./src/js/object-reader.js -f md > documentation.txt

echo "Append documentation to ReadMe.md"
tail -n +2 documentation.txt >> ReadMe.md

echo "Clean Up"
rm documentation.txt
