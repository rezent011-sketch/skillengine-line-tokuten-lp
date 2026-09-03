#!/bin/zsh
D=/private/tmp/claude-501/-Users-user-----------/15553c2f-47ef-40e2-abfd-3a1c43bebaaf/scratchpad/top-images/voices
rm -f "$D/out.png"; rm -rf "$D/chrome-profile"; mkdir -p "$D/chrome-profile"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-first-run --disable-gpu --hide-scrollbars --allow-file-access-from-files --timeout=9000 --force-device-scale-factor=2 --user-data-dir="$D/chrome-profile" --window-size=768,1086 --screenshot="$D/out.png" "file://$D/index.html" >/dev/null 2>&1 &
PID=$!
for i in $(seq 1 40); do [ -s "$D/out.png" ] && break; sleep 1; done
sleep 1; kill $PID 2>/dev/null; pkill -f "$D/chrome-profile" 2>/dev/null
ls -la "$D/out.png" && sips -g pixelWidth -g pixelHeight "$D/out.png"
