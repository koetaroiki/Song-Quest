/* ==================================================
 * プレイリスト表示関連処理
 * ==================================================
YouTubeプレイヤーの再生・一時停止と再生バーを管理するファイル

YouTubeプレイヤーを操作して、動画の再生・一時停止を切り替える処理。クリックされた動画が現在再生中の動画と同じか別の動画かを判定し、
別の動画なら新しい動画を再生する。また、現在の再生位置に合わせて再生バーの表示を更新する。

1.YouTubeプレイヤーの準備が完了しているか確認する
2.クリックされた動画が現在再生中の動画と同じか確認する
3.別の動画なら、前の動画のボタンと再生バーをリセットして新しい動画を再生する
4.同じ動画なら、現在の再生状態を確認して再生・一時停止を切り替える
5.再生・一時停止に合わせてボタンの表示を変更する
6.0.5秒ごとに動画の再生位置を取得して、再生バーの幅を更新する
 * ================================================== */

// YouTube動画を再生・一時停止する
function togglePlay(videoId, button, progressBar) {
  // プレイヤーの準備ができるまで処理しない
  if (!isReady) return;

console.log("動画再生:", videoId);

  // 現在の再生状態を取得
  const state = player.getPlayerState();

  // 別の曲がクリックされた場合
  if (currentVideoId !== videoId) {
    // 前回再生していた動画のボタン・再生バーをリセット
    if (currentButton) currentButton.textContent = '▶ 再生';
    if (currentProgressBar) currentProgressBar.style.width = '0%';

    // 現在の動画情報を保存
    currentVideoId = videoId;
    currentButton = button;
    currentProgressBar = progressBar;

    // 新しい動画を再生
    button.textContent = '⏸ 一時停止';
    player.loadVideoById(videoId);
    return;
  }

  // 同じ曲の場合は再生・一時停止を切り替える
  if (state === YT.PlayerState.PLAYING) {
    player.pauseVideo();
    button.textContent = '▶ 再生';
  } else {
    player.playVideo();
    button.textContent = '⏸ 一時停止';
  }
}

// 0.5秒ごとに再生バーを更新
setInterval(() => {
  // プレイヤーまたは再生バーがなければ処理しない
  if (!player || !currentProgressBar) return;

  // 動画の長さと現在の再生位置を取得
  const duration = player.getDuration();
  const current = player.getCurrentTime();

  // 再生バーの幅を更新
  if (duration > 0) {
    currentProgressBar.style.width =
      (current / duration) * 100 + '%';
  }
}, 500);