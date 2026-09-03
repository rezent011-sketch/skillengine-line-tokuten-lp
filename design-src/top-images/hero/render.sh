#!/bin/zsh
D=/private/tmp/claude-501/-Users-user-----------/15553c2f-47ef-40e2-abfd-3a1c43bebaaf/scratchpad/top-images/hero
OUT=${1:-$D/out.png}
rm -f "$OUT"
rm -rf "$D/chrome-profile"; mkdir -p "$D/chrome-profile"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-first-run --disable-gpu --hide-scrollbars --allow-file-access-from-files --timeout=20000 --force-device-scale-factor=2 --user-data-dir="$D/chrome-profile" --window-size=1280,720 --screenshot="$OUT" "file://$D/index.html" >/dev/null 2>&1 &
PID=$!
for i in {1..40}; do
  if [ -s "$OUT" ]; then sleep 1; break; fi
  sleep 1
done
kill $PID 2>/dev/null; sleep 0.5; kill -9 $PID 2>/dev/null
ls -la "$OUT" && sips -g pixelWidth -g pixelHeight "$OUT" | tail -2
