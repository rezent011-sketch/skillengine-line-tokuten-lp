#!/bin/zsh
D="/private/tmp/claude-501/-Users-user-----------/15553c2f-47ef-40e2-abfd-3a1c43bebaaf/scratchpad/tokuten-lp/design-src/top-images/codex-banner"
rm -rf "$D/prof" "$D/out.png"; mkdir -p "$D/prof"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-first-run --disable-gpu --hide-scrollbars --allow-file-access-from-files --timeout=20000 --force-device-scale-factor=1 --user-data-dir="$D/prof" --window-size=1040,1040 --screenshot="$D/out.png" "file://$D/index.html" >/dev/null 2>&1 &
PID=$!
for i in {1..60}; do [ -s "$D/out.png" ] && break; sleep 1; done
sleep 2; kill $PID 2>/dev/null; wait $PID 2>/dev/null
sips -g pixelWidth -g pixelHeight "$D/out.png" | tail -2
