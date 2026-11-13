// index.html（公開ページ）を元に、LINEで配るHTMLファイル版を作る。
// LINE版は index.html に「Claudeアプリでの開き方」の案内を足しただけ。
// データや機能の修正は必ず index.html に入れて、このスクリプトで作り直すこと。
//   使い方: node tools/build-line-version.js <出力先.html>
const fs = require('fs');
const path = require('path');

const out = process.argv[2];
if (!out) { console.error('出力先を指定してください: node tools/build-line-version.js <出力先.html>'); process.exit(1); }

const OVERLAY_CSS = `#overlay{position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;}
#overlay-box{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:24px;max-width:360px;width:100%;}
#overlay-box h2{font-size:16px;color:var(--accent);margin-bottom:16px;text-align:center;}
#overlay-box ol{padding-left:20px;font-size:14px;line-height:2;color:var(--text);}
#overlay-box .note{font-size:12px;color:var(--text2);margin-top:12px;line-height:1.7;}
#overlay-box .store-btn{display:block;margin-top:14px;padding:10px;background:linear-gradient(135deg,#007aff,#005ec4);border-radius:10px;color:#fff;text-align:center;text-decoration:none;font-size:14px;font-weight:700;}
#overlay-box .close-btn{width:100%;margin-top:14px;padding:12px;background:linear-gradient(135deg,var(--accent),var(--accent2));border:none;border-radius:10px;color:#fff;font-size:15px;font-weight:700;cursor:pointer;}
`;

const OVERLAY_HTML = `<div id="overlay">
  <div id="overlay-box">
    <h2>📱 このアプリの開き方</h2>
    <ol>
      <li>LINEでHTMLファイルをタップ</li>
      <li>「共有」ボタン（□↑）をタップ</li>
      <li>共有メニューから「<strong>Claude</strong>」を選択</li>
      <li>Claudeアプリでアプリが起動 ✅</li>
    </ol>
    <div class="note">📌 Androidの場合：「他のアプリで開く」→「Claude」を選択<br>※ Claudeアプリが必要です（無料）</div>
    <a class="store-btn" href="https://apps.apple.com/jp/app/claude-by-anthropic/id6473753684" target="_blank">📲 App Storeでダウンロード（無料）</a>
    <button class="close-btn" onclick="closeOverlay()">✅ 使い方を確認しました</button>
  </div>
</div>

`;

const OVERLAY_JS = `
function closeOverlay(){try{localStorage.setItem('guide_shown','1');}catch(e){}document.getElementById('overlay').style.display='none';}
try{if(localStorage.getItem('guide_shown'))document.getElementById('overlay').style.display='none';}catch(e){}
</script>
</body>`;

function insertOnce(html, anchor, text, where) {
  const parts = html.split(anchor);
  if (parts.length !== 2) throw new Error(`目印が1か所だけ見つかりません: ${anchor}`);
  return where === 'before' ? parts[0] + text + anchor + parts[1] : parts[0] + anchor + text + parts[1];
}

let html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
html = insertOnce(html, '</style>', OVERLAY_CSS, 'before');
html = insertOnce(html, '<div class="header">', OVERLAY_HTML, 'before');
const tail = '\n</script>\n</body>';
if (!html.includes(tail)) throw new Error('</script></body> が見つかりません');
html = html.replace(tail, OVERLAY_JS);
fs.writeFileSync(out, html);
console.log('作成しました: ' + out);
