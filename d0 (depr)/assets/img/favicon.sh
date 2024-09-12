#!/bin/bash

# Define the sizes in an array
sizes=(16 32 48 57 60 72 76 114 120 144 152 180 192 512 2084)

# Loop through each size
for size in "${sizes[@]}"; do
    # Rename the file
    mv "${size}.png" "android-chrome-${size}x${size}.png"
    # Copy the file with different names
    cp "android-chrome-${size}x${size}.png" "apple-touch-icon-${size}x${size}.png"
    cp "android-chrome-${size}x${size}.png" "favicon-${size}x${size}.png"
done

