# 第259回 鹿児島県SC（エリート）大会 エントリー検索

公開ページ: https://gyojin600m1.github.io/259th-Kagoshima-SC-Elite-Swim-Entries/

選手名・チーム・種目・リレーでエントリーを検索できるスマホ向けページです。

## ファイルの直し方

- **元ファイルは `index.html` だけです。** データや機能の修正は必ず `index.html` に入れてください。
- LINEで配るHTMLファイル（「Claudeアプリでの開き方」の案内つき）は、`index.html` から次のコマンドで作り直します。

```bash
node tools/build-line-version.js 出力先.html
```

`index.html` を直したら、LINE版も毎回このコマンドで作り直してください。LINE版を直接書き換えると、公開ページと内容がずれます。
