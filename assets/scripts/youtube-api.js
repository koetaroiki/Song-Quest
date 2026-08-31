/* ==================================================
 * YouTube API関連処理
 * ==================================================
 「YouTubeからデータを取得する処理」と「YouTubeプレイヤーを準備する処理」を担当

 YouTube IFrame APIを使ってYouTubeプレイヤーを作成し、YouTube Data APIを使って指定したプレイリストの動画情報を取得する処理。
 取得した動画一覧をrenderPlaylist()に渡して、画面にプレイリストを表示する。
 また、プレイヤーの準備状態や現在操作している動画・再生ボタン・再生バーを管理する

 1.YouTube Data APIのAPIキーを設定する
 2.YouTubeプレイヤーと、プレイヤーの準備状態を管理する変数を用意する
 3.YouTube IFrame APIの読み込みが完了したら、HTMLのid="player"にYouTubeプレイヤーを作成する
 4.プレイリストIDを使ってYouTube Data APIにリクエストを送り、プレイリスト内の動画情報を取得する
 5.取得したJSONデータをJavaScriptで扱えるオブジェクトに変換する
 6.取得した動画一覧をrenderPlaylist()に渡して画面に表示する
 7.Favorite ListとRecommended Listのプレイリストをそれぞれ取得する
 * ================================================== */

// YouTube APIからプレイリスト情報を取得する
// YouTubeプレイヤーを入れる変数
let player;

// YouTubeプレイヤーの準備が完了したかを管理するフラグ
let isReady = false;

// 現在操作している動画の情報
let currentVideoId = null;     // 動画ID
let currentButton = null;      // 再生ボタン
let currentProgressBar = null; // 再生バー

// YouTube IFrame APIの読み込みが完了すると自動的に実行される関数
function onYouTubeIframeAPIReady() {

  // HTMLのid="player"にYouTubeプレイヤーを作成
  player = new YT.Player('player', {

    // プレイヤーのイベントを設定
    events: {

      // プレイヤーの準備が完了したらisReadyをtrueにする
      onReady: () => isReady = true
    }
  });
}

// プレイリストを取得する
function loadPlaylist(playlistId, containerId) {

  // YouTube Data APIのURLを作成
  const url =
    `https://www.googleapis.com/youtube/v3/playlistItems` +
    `?part=snippet` +
    `&playlistId=${playlistId}` +
    `&maxResults=20` +
    `&key=${API_KEY}`;

  console.log("プレイリスト:" + url);
  // 指定したURL（YouTube Data API）へリクエストを送信（urlはYouTube Data APIに問い合わせるためのURL）
  fetch(url)
    // レスポンス(JSON形式)をJavaScriptで扱えるオブジェクトに変換
    .then(res => res.json())
    .then(data => {
      // data.items：プレイリスト内の動画一覧
      // containerId：表示先の<ul>のid

      // playlist-render.jsのrenderPlaylist()で画面に表示
      renderPlaylist(data.items, containerId);
    });

    /* functionの場合の書き方
    fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderPlaylist(data.items, containerId);
    });
    */
}

// お気に入り・おすすめのプレイリストを表示
loadPlaylist('PLx3npu-SkDxyId90EbAiP7henKPFf2J2F', 'favorite-items');
loadPlaylist('PLx3npu-SkDxw0SLPcvZ7Sn4CawFsfBjCQ', 'recommended-items');