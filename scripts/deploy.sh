#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${CPANEL_HOST:-}" || -z "${CPANEL_USER:-}" || -z "${CPANEL_TARGET_DIR:-}" ]]; then
  echo "Missing env vars. Required: CPANEL_HOST, CPANEL_USER, CPANEL_TARGET_DIR"
  exit 1
fi

echo "Building project..."
npm ci
npm run build

echo "Uploading dist to cPanel host..."
rsync -avz --delete dist/ "${CPANEL_USER}@${CPANEL_HOST}:${CPANEL_TARGET_DIR}/"

echo "Deployment complete."
