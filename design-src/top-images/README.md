# 最上部の販促画像の元データ

`assets/top-hero.jpg` / `assets/top-stats.jpg` / `assets/top-voices.jpg` は、ここにある HTML を
headless Chrome で PNG にして、sharp で JPEG に変換したもの(2026-09-03)。

- hero: 1280x720(CSS px)。ヒーロー。リボン「友だち追加から 3時間限定」、バッジ「20大特典」、条件表示「※20大特典のお渡しは面談のあとになります」
- stats: 1280x620。総フォロワー約50万 / X運用代行50社 / AI×SNSで6000万円
- voices: 768x1086。受講生の声・収益報告のコラージュ。件数や順位は入れていない(根拠が無いため)

再レンダリング(2倍解像度):
```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars \
  --allow-file-access-from-files --timeout=9000 --force-device-scale-factor=2 --user-data-dir=/tmp/chrome-x \
  --window-size=1280,720 --screenshot=out.png "file://$(pwd)/hero/index.html"
```
HTML内の画像・フォントの参照パスは作成時の作業ディレクトリ(絶対パス)になっているので、再利用時は `../../assets/` に直すこと。
フォントは Google Fonts(Dela Gothic One / M PLUS Rounded 1c / Noto Sans JP / Shippori Mincho B1)。
