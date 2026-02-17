#!/bin/bash

# Check if the component name argument is provided
if [ -z "$1" ]; then
  echo "Please provide a component name."
  exit 1
fi

# Use the component name as provided
COMPONENT_NAME="$1"

# Convert the class name to lowercase for the className in JSX
CLASS_NAME=$(echo "$1" | awk '{print tolower($0)}')

# Define paths (relative to the root of the project)
COMPONENT_DIR="./src/components/$COMPONENT_NAME"
CSS_FILE="$COMPONENT_DIR/$COMPONENT_NAME.css"
TSX_FILE="$COMPONENT_DIR/$COMPONENT_NAME.tsx"

# Create the component directory
mkdir -p "$COMPONENT_DIR"

# Create CSS file
echo "/* Styles for $COMPONENT_NAME component */" > "$CSS_FILE"

# Create TSX file with a normal function declaration
COMPONENT_CLASS_NAME=$(echo "$1" | sed 's/\b\(.\)/\u\1/g')
echo "import './$COMPONENT_NAME.css';" > "$TSX_FILE"
echo "" >> "$TSX_FILE"
echo "function $COMPONENT_CLASS_NAME() {" >> "$TSX_FILE"
echo "  return (" >> "$TSX_FILE"
echo "    <div className=\"$CLASS_NAME\">" >> "$TSX_FILE"
echo "      {/* Add your component content here */}" >> "$TSX_FILE"
echo "    </div>" >> "$TSX_FILE"
echo "  );" >> "$TSX_FILE"
echo "}" >> "$TSX_FILE"
echo "" >> "$TSX_FILE"
echo "export default $COMPONENT_CLASS_NAME;" >> "$TSX_FILE"

# Notify the user
echo "Component $1 created at $COMPONENT_DIR."

# Open the generated .tsx and .css files in VS Code
if command -v code > /dev/null; then
  code "$TSX_FILE" "$CSS_FILE"
else
  echo "VS Code command 'code' not found. Please make sure VS Code is installed and added to PATH."
fi
