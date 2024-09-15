#!/bin/bash

# -----------------------------------------------------------------------------
# Script Name: direc.sh
# Description: This script recursively lists the directory structure and saves it to a README.md file.
# Author: Arfaz Hussain
# License: MIT License
# -----------------------------------------------------------------------------
# DISCLAIMER:
# This script is provided "as is", without warranty of any kind, express or 
# implied, including but not limited to the warranties of merchantability, 
# fitness for a particular purpose, and noninfringement. In no event shall the 
# author be liable for any claim, damages, or other liability, whether in an 
# action of contract, tort, or otherwise, arising from, out of, or in connection 
# with the script or the use or other dealings in the script.
# -----------------------------------------------------------------------------


# Function to list the directory structure recursively
list_structure() {
  local dir="$1"
  local indent="$2"
  local output_file="$3"

  # List and sort the files in the current directory, excluding dotfiles and specified files
  find "$dir" -maxdepth 1 -type f ! -name '.*' ! -name 'Hussain Arfaz - Placement Application*' | sort | while IFS= read -r file; do
    echo "${indent}├── $(basename "$file")" >> "$output_file"
  done

  # List and sort the subdirectories in the current directory, excluding dotfiles and node_modules
  find "$dir" -maxdepth 1 -type d ! -path "$dir" ! -name '.*' ! -name 'node_modules' | sort | while IFS= read -r subdir; do
    echo "${indent}├── $(basename "$subdir")/" >> "$output_file"
    list_structure "$subdir" "${indent}│   " "$output_file"
  done
}

# Output file
output_file="README.md"

# Remove any existing .md files in the current directory
find . -maxdepth 1 -name '*.md' -type f -delete

# Create or clear the output file
: > "$output_file"

# Write the Markdown header and code block start
echo "# Directory Structure" >> "$output_file"
echo "" >> "$output_file"
echo '```' >> "$output_file"

# Start listing from the current directory with no initial indentation
list_structure "." "" "$output_file"

# Write the code block end
echo '```' >> "$output_file"

echo "Directory structure has been saved to $output_file"
