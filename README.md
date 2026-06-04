# HITCHHIKE — 近畿大学ヒッチハイクサークル 公式サイト

新歓場所まで、合宿地まで、すべて自力（ヒッチハイク）で集合する。
**「ヒッチハイクが上手い人が、すべてを制する。」** をスローガンに掲げるサークルの公式ホームページです。

## 公開URL

https://kinyuki-jp.github.io/hitchhike-circle/

## 構成

| ファイル | 内容 |
| --- | --- |
| `index.html` | サイト本体（Hero / About / Rule / Activities / Members / Flow / Voice / Join / FAQ） |
| `style.css` | デザイン（黒×黄のロードサイン風・レスポンシブ対応） |
| `script.js` | スクロール演出・モバイルメニュー・スムーズスクロール |

## ローカルで見る

```bash
python -m http.server 8000
# → http://localhost:8000
```

## カスタマイズ

- SNSリンク（Instagram / X / 公式LINE）は `index.html` 内の該当 `href="#"` を差し替えてください。
- 写真は現在 Unsplash の車画像を使用。本物の活動写真に差し替えると一気にリアルになります。
- 新歓エントリーフォームの URL も `href="#"` のまま。Googleフォーム等のURLに置き換えてください。
