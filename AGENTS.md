# このリポジトリで作業する前に

**`CLAUDE.md` を読むこと。** このLPの禁止事項（数字を作らない・打消し注記を外さない・計測タグを足さない・CTA先を変えない など）が書いてある。

進行中の案件の全体像は、同じPCの `/Users/user/オートウェビナー/docs/引き継ぎ_Codex.md` にある。

## このリポジトリの要点

- 静的HTML + CSS。ビルドは無い。`main` に push すると GitHub Pages に自動デプロイ（1〜2分）。**作業はブランチ → PR → merge。**
- 公開URL: https://rezent011-sketch.github.io/skillengine-line-tokuten-lp/
- モバイル幅（〜430px）専用。デスクトップ向けの横長レイアウトにしない。

| パス | 用途 |
|---|---|
| `index.html` | 友だち追加特典LP（20大特典） |
| `claude-code/` | Claude Code回・友だち追加用 |
| `claude-code/seminar/` | Claude Code回・セミナー参加者用 |
| `daikanshasai/` | 大感謝祭（30大特典） |
| `codex/` | Codex経由用。**動画（HLS）＋24時間タイマー＋視聴後に特典表示** |

## `codex/` を触るときの注意

- 動画URL は `codex/index.html` 内の `var HLS_SRC`。差し替えるときは配信側で新しい slug を作ってから。
- 再生分岐は `canPlayType` だけで判定しない。Chrome も "maybe" を返すため、Apple 系の UA 判定と組み合わせる（過去に本番障害あり）。
- `style.v2.css` 末尾の `.cx-` ブロックにある `.cx-play[hidden], .cx-unavail[hidden] { display:none }` を消さない（`hidden` 属性が効かなくなる）。
- タイマーは「一度切れたら開き直しても0のまま」。リセットする実装に戻さない。
