/* ==================================================
 * プロフィールデータ関連処理
 * ==================================================
URLからプロフィールIDを取得し、そのIDを使ってSupabaseからプロフィール情報を取得して、
プロフィール情報・お気に入り動画・プレイリストを画面に表示する処理。

1.URLからプロフィールIDを取得する
2.プロフィールIDを使ってSupabaseからプロフィール情報を取得する
3.取得したプロフィール情報をHTMLに表示する
4.YouTubeプレイリストURLからプレイリストIDを取得する
5.プレイリストIDを使ってYouTube Data APIから動画一覧を取得し、画面に表示する
6.お気に入り動画URLから動画IDを取得し、YouTube動画を画面に表示する
7.YouTubeプレイリストへのリンクを設定する
 * ================================================== */

const supabaseUrl = "https://ohctzqrkegjmrkobqqqz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oY3R6cXJrZWdqbXJrb2JxcXF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MTE0NjgsImV4cCI6MjA4MTk4NzQ2OH0.qBTWrSbFLg5R_XnYLYruwVGIkgw8QIsfmeF9y_weh7s";
const client = supabase.createClient(supabaseUrl, supabaseKey);

// YouTubeプレイリストのリンクを設定
(async () => {

  // URLからプロフィールIDを取得
  // window.location.search：現在開いているURLの「?以降」を取得
  // new URLSearchParams(...)：URLパラメータを扱えるようにするオブジェクトにする
  // const params：作成したオブジェクトをparamsという変数に代入
  const params = new URLSearchParams(window.location.search);
  // URLパラメータのオブジェクトからidの値だけを取得
  const profileId = params.get("id"); 

  // プロフィールIDを使ってSupabaseのprofilesから情報を取得
  const { data, error } = await client // 一連のSupabase処理が完了するのを待ってdata / error を受け取る
    .from("profiles") // profiles テーブルを対象にする
    .select("*") // profiles テーブルのすべての列を取得する
    .eq("id", profileId) // Supabaseのid が profileId と一致するデータを探す
    .single(); // 結果が1件であることを指定
  // ↑ が成功すると、data の中に profiles テーブルの1件分のデータが入る
  /* たとえば
  {
    id: "abc123",
    user_id: 10,
    name: "太郎",
    tags: "#rock",
    comment: "好きな曲..."
    ・
    ・
    ・
  } */

  // エラーまたはデータが取得できなかった場合は処理から抜ける
  if (error || !data) {
    alert("データ取得失敗");
    return;
  }

  // user_idを取得してreceiverId（後の処理で使うため）
  receiverId = data.user_id;
  // 指定のidがあるhtmlにぶち込む
  document.getElementById("name").textContent = data.name;
  document.getElementById("tags").textContent = data.tags;
  document.getElementById("avatar").src = data.avatar_url;
  document.getElementById("comment").textContent = data.comment;
  document.getElementById("favorite_video").textContent = data.favorite_video;

  // playリストIDを取り出す関数
  function getPlaylistId(url) {
    // URLがなければ処理を終了
    if (!url) {
      return null;
    }

    // ?list= または &list= を探し、次の & までをプレイリストIDとして取得
    const match = url.match(/[?&]list=([^&]+)/); // 最後の「&」は含まれない

    // match[0] = "?list=PLx3npu-****"
    // match[1] = "PLx3npu-****"

    // 一致したらプレイリストID(match[1])を返し、一致しなければnullを返す
    return match ? match[1] : null;
  }

  // getPlaylistId()関数を使う（?list= から & までの文字列を取得）
  // プレイリストURLからプレイリストIDを取得
  const favId = getPlaylistId(data.fav_playlist);
  const recId = getPlaylistId(data.rec_playlist);

  // プレイリストIDがあれば動画一覧を取得して表示
  if (favId) {
    // youtube-api.jsにあるloadPlaylist()関数を使う
    loadPlaylist(favId, 'tab-list1-items');
  }
  // プレイリストIDがあれば動画一覧を取得して表示
  if (recId) {
    // youtube-api.jsにあるloadPlaylist()関数を使う
    loadPlaylist(recId, 'tab-list2-items');
  }

  // YouTube動画URLから動画IDを取り出す関数
  function getVideoId(url) {
    // URLがなければ処理を終了
    if (!url) {
      return null;
    }

    // ?v= または &v= を探し、次の & までを動画IDとして取得
    const match = url.match(/[?&]v=([^&]+)/); // 最後の「&」は含まれない

    // match[0] = "?v=ewOPQZZn4SY"
    // match[1] = "ewOPQZZn4SY"

    // 一致したら動画ID(match[1])を返し、一致しなければnullを返す
    return match ? match[1] : null;
  }

  // お気に入り動画のURLから動画IDを取得
  const videoId = getVideoId(data.favorite_video);

  // 動画IDが取得できた場合
  if (videoId) {

    // favorite_videoにYouTubeプレーヤーを表示
    document.getElementById("favorite_video").innerHTML = `
      <iframe width="560" height="315"
        src="https://www.youtube.com/embed/${videoId}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    `;
  }

  // Favorite Listのリンク先を設定
  document.getElementById("favorite-link").href = data.fav_playlist;
  // Recommended Listのリンク先を設定
  document.getElementById("recommended-link").href = data.rec_playlist;
})();



