#!/usr/bin/env bash
set -euo pipefail

STAMP=$(date +"%Y%m%d_%H%M%S")
TARGET_DIR=${1:-"./backups"}
mkdir -p "${TARGET_DIR}"

echo "Creating source backup..."
tar -czf "${TARGET_DIR}/site_source_${STAMP}.tar.gz" \
  --exclude="./node_modules" \
  --exclude="./dist" \
  --exclude="./.git" \
  .

echo "Backup written to ${TARGET_DIR}/site_source_${STAMP}.tar.gz"
