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

## 検索用の辞書データ

ふりがな検索の補助候補には KANJIDIC2 の抽出・正規化データを使っています。1文字の名乗りは除外しています。

KANJIDIC2 © James William BREEN and The Electronic Dictionary Research and Development Group (EDRDG)。辞書由来の抽出・正規化データは CC BY-SA 4.0 に従います。

- [KANJIDIC2 の資料](https://www.edrdg.org/wiki/index.php/KANJIDIC_Project)
- [EDRDG 辞書ライセンス](https://www.edrdg.org/edrdg/licence.html)
- [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

辞書の更新時は、KANJIDIC2 の日本語音訓読み・2文字以上の名乗りを抽出し、ひらがな化・送り仮名記号の除去をした `KANJI_READINGS` を再生成します。
