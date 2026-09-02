# スキルエンジン LINE追加特典LP

公開中のモバイルLP。スキルエンジン（ガガロットのAIスクール）の公式LINE友だち追加特典案内。ライブ配信ではない。20大特典は個別面談のあとにお渡しする。

公開URL: https://rezent011-sketch.github.io/skillengine-line-tokuten-lp/  
リポジトリ: https://github.com/rezent011-sketch/skillengine-line-tokuten-lp

4本目ウェビナー（Claude Code）のCTA先がこのURL。`raw.githack.com` / `rawcdn.githack.com` は使わない（確認画面と古いキャッシュ）。

## ソース・オブ・トゥルース

- **GitHub が唯一の正本。** 手元にクローンして別コピーを育てたり、ローカルだけで書き換えて「こちらが本番」にしない。変更はこのリポジトリのブランチ → PR → `main`。
- オーナーの Mac で Claude Code Max を使う場合も、作業対象はこの GitHub リポジトリ。別フォルダへ複製して再構築しない。
- `main` への push で `.github/workflows/pages.yml` が GitHub Pages にデプロイする（1〜2分）。本番投稿・広告入稿・Pages 以外への公開はしない。

## 構成（これだけ）

静的3ファイル + 画像。ビルドもパッケージも無い。

| ファイル | 役割 |
|---|---|
| `index.html` | 本体。`lang="ja"`。ヒーロー〜実績〜特典〜FAQ〜CTA |
| `style.v2.css` | スタイル。`style.css` から改名済み（githack キャッシュ回避）。**戻さない・別名を増やさない** |
| `privacy.html` | プライバシー。本ページは氏名・メール・決済を収集しない |
| `assets/` | 実績スクショ・バッジ・コラボ写真・ヒーロー背景 |
| `README.md` | 公開URLと実績の出どころ |
| `.github/workflows/pages.yml` | Pages デプロイ（`main` / 手動） |

モバイル幅は `.page { width: min(430px, 100%) }`。固定CTAは `.sticky`。Google Fonts は Noto Sans JP のみ。

### `assets/` の実ファイル

- バッジ: `badge-ai.png` / `badge-50man.png` / `badge-50sha.png`（余白を揃えた透過PNG。jpgに戻さない）
- ヒーロー背景: `hero-bg.jpg`（`style.v2.css` の `.hero` が参照）
- 収益証明: `proof-revenue.png` / `proof-payout.jpg` / `proof-revenue-11375.jpg` / `proof-live-4318.jpg` / `proof-buzzpost-2871.png` / `proof-line-500k.jpg`
- アナリティクス: `analytics-87m.png` / `analytics-19m.png` / `analytics-8m.png` / `analytics-3m.png` / `proof-analytics.jpg` / `agency-grid.png`
- 受講生の声: `voice-dm1.png` … `voice-dm4.png` / `voice-follow.png` / `voice-analytics.png`
- コラボ: `collab-evelyn.png` / `collab-evelyn-selfie.png` / `collab-ryuji.png` / `collab-itochu-familymart.png` / `collab-endo.jpg` / `collab-takaoka.jpg` / `collab-gunpi.jpg`
- 未使用: `collab-loglass.png`（玉川大学×Loglass 枠に写真は載せていない。勝手に差し込まない）

装飾用のCSS図形より、上の実画像を優先する。証明スクショをトリミングで切らない（`object-fit` で切れないこと）。

## 数字・証言・主張

**リポジトリに既にある文言か、オーナーが明示した事実だけ。統計・収益・フォロワー・「何人達成」を発明しない。** スクショに無い数字をキャプションに足さない。

ページに既にある主な数字（変更・水増し禁止）:

- 訴求: 1年で6000万円 / 20大特典 / 友だち追加から3時間限定 / 費用無料
- バッジ: 約50万 総フォロワー / 50社 運用代行
- 収益スクショ: `$3,956.83` / `$2,308.95` `$875.18`（次の支払い Aug 14, 2026） / `$11,375.14` / `USD 4,318.11` / `$2,871.30` / 50万円超の振込
- SNS: 87.9M / 19.3M（+355%） / 1Y 86M・16.7K・838.1K / 3M 15.4M・139.3K / 7D 約25万 / 代行 730K〜2.9M
- 受講生の声: 52万円 / 725,000円。引用は `voice-dm*.png` の文言に合わせる
- コラボ掲載名: 馬瓜エブリン / 料理研究家リュウジ / 伊藤忠商事（ファミリーマート） / 玉川大学×Loglass / 遠藤要 / 高岡蒼佑 / ぐんぴぃ

出どころ（`README.md`）: X収益分配の支払い画面、TikTok LIVE報酬、バズポス使用アカウント、受講生LINE、運用アナリティクス、X運用代行実績。新しい出典を捏造しない。

**打消し注記は外さない。** 収益・支援実績の `※` と footer `.disc`（個人の成果・保証しない・個人差）を残す。

## やってはいけないこと

- トラッキングピクセル、タグマネ、広告SDK、有料広告入稿、本番SNS投稿
- 新しい計測（GA / Meta / LINE Tag 等）を `index.html` に足す
- CTA先の改変（下記LIFF以外の予約URLを作らない。変更はオーナー指定時のみ）
- 特典名の創作。01–10 はSNS運用、11–20 はAI社員構築。一覧は `index.html` の `.cards` が正本
- レイアウトの模様替え、装飾のためのリデザイン、「機能追加」

コピーは日本語。英語は既存の肩書（`tag-en`）程度に留める。

## 実装上の固定点

- CTA（本文と `.sticky` の両方）:  
  `https://liff.line.me/2009133356-u7JFBVtz?calendar_salon_id=26861&ts=1788082704`  
  個別面談のLIFF予約。スキルエンジンの予約。
- 3時間タイマー: `index.html` 末尾の IIFE。`localStorage` キー `skillengine-lp-3h`。初回訪問から3時間。サーバー時計やピクセルにしない。
- このページでは特典を配布しない（`.goldline`「この場では配布しません」）。

触るときはモバイル幅（〜430px）でヒーロー・証明グリッド・コラボ・固定CTAを確認する。デスクトップ向けの横長レイアウトにしない。
