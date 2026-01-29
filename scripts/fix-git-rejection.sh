#!/bin/bash
# Script to resolve common Git push rejection issues in Replit environments

echo "Starting Git resolution..."

# 1. Unshallow the repository if it is shallow
if [ "$(git rev-parse --is-shallow-repository)" == "true" ]; then
    echo "Detected shallow repository. Unshallowing..."
    git fetch --unshallow
else
    echo "Repository is already full."
fi

# 2. Ensure we are on the main branch and synced
git fetch origin main
LOCAL_COMMIT=$(git rev-parse HEAD)
REMOTE_COMMIT=$(git rev-parse origin/main)

if [ "$LOCAL_COMMIT" != "$REMOTE_COMMIT" ]; then
    echo "Local branch and remote main are not in sync."
    echo "Run 'git pull --rebase origin main' to merge changes or 'git push --force origin main' to overwrite."
fi

echo "Git resolution steps completed."
echo "If push still fails, ensure your GitHub Personal Access Token (PAT) is set up as a secret."
