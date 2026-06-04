#!/bin/bash
set -euo pipefail

APP="${1:-/Applications/Hermes.app}"
ROOT="$(cd "$(dirname "$0")" && pwd)"
ASAR="$ROOT/app.asar"
HASH_FILE="$ROOT/app.asar.sha256"

if [ ! -d "$APP" ]; then
  echo "Hermes.app not found: $APP" >&2
  exit 1
fi

if [ ! -f "$ASAR" ]; then
  echo "Missing localized app.asar: $ASAR" >&2
  exit 1
fi

HASH="$(/usr/bin/shasum -a 256 "$ASAR" | /usr/bin/awk '{print $1}')"
EXPECTED="$(/usr/bin/head -n 1 "$HASH_FILE" 2>/dev/null | /usr/bin/tr -d '[:space:]' || true)"
if [ -n "$EXPECTED" ] && [ "$HASH" != "$EXPECTED" ]; then
  echo "Hash mismatch for localized app.asar" >&2
  echo "expected: $EXPECTED" >&2
  echo "actual:   $HASH" >&2
  exit 1
fi

echo "Installing Hermes Chinese localization into: $APP"
/usr/bin/osascript -e 'tell application "Hermes" to quit' >/dev/null 2>&1 || true
/bin/sleep 1
/bin/cp "$ASAR" "$APP/Contents/Resources/app.asar"
/usr/libexec/PlistBuddy -c "Set :ElectronAsarIntegrity:Resources/app.asar:hash $HASH" "$APP/Contents/Info.plist"
echo "Done. No codesign was performed."
echo "Note: modifying app.asar invalidates the original vendor signature. Reinstall official Hermes to restore vendor signing."
