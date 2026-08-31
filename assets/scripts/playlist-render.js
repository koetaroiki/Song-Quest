/* ==================================================
 * プレイリスト表示関連処理
 * ==================================================
取得したYouTubeのデータをHTMLにして画面に表示する処理

YouTube Data APIから取得した動画一覧を1件ずつ取り出し、サムネイル・タイトル・再生ボタン・再生バーを持つHTML要素を作成して、
指定した<ul>にまとめて表示する処理。

1.YouTubeから取得した動画一覧を受け取る
2.表示先の<ul>を取得する
3.動画を1件ずつ取り出す
4.動画ID・タイトル・サムネイル画像を取得する
5.li・画像・タイトル・再生ボタン・再生バーを作成する
6.再生ボタンやサムネイルをクリックしたときに動画を再生できるようにする
7.作成した動画情報をDocumentFragmentに一時的にまとめる
8.まとめた動画リストを<ul>に追加して画面に表示する
 * ================================================== */

// YouTubeからもらったデータを画面に表示する
// プレイリストを画面に表示する
// items：動画一覧 // containerId：表示先の<ul>のid
function renderPlaylist(items, containerId) {
  console.log(items);

  const ul = document.getElementById(containerId);
  // 一時的にliをためておく入れ物
  const fragment = document.createDocumentFragment();

  // youtubeのplaylistをひとつづつ取り出す
  items.forEach(item => {
    const videoId = item.snippet.resourceId.videoId;
    const title = item.snippet.title;
    const thumb = item.snippet.thumbnails.medium.url;

    // li作成
    const li = document.createElement('li');
    const row = document.createElement('div');
    row.className = 'row';

    // img作成
    const img = document.createElement('img');
    img.src = thumb;
    img.className = 'adj-thumb';

    // title作成
    const titleDiv = document.createElement('div');
    titleDiv.className = 'title';
    titleDiv.textContent = title;

    // button作成
    const button = document.createElement('button');
    button.textContent = '▶ 再生';

    // progressWrapper・progressBarを作成
    const progressWrapper = document.createElement('div');
    progressWrapper.className = 'progress-wrapper';
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';

    // 再生ボタン・サムネイルをクリックしたときにtogglePlay()を実行
    button.onclick = () =>
      togglePlay(videoId, button, progressBar);
    img.onclick = () =>
      togglePlay(videoId, button, progressBar);

    // rowにサムネイル・タイトル・再生ボタンを追加
    row.append(img, titleDiv, button);
    // progressWrapperに再生バーを追加
    progressWrapper.append(progressBar);
    // liに動画情報と再生バーを追加
    li.append(row, progressWrapper);
    // fragmentに完成した動画リストを追加
    fragment.append(li);
  });
  // fragment内の動画リストをまとめてulに追加
  ul.append(fragment);
}