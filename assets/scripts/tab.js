const scrollPos = {};

// ① 最初に取得してキャッシュ
const tabs = document.querySelectorAll('.js-tabItem');
const tabItems = document.querySelectorAll('.js-tabPanel');

tabs.forEach(tab => {

  tab.addEventListener('click', () => {
  if (tab.classList.contains('is-active')) return;

    // ② 現在アクティブなタブ内容
    const current = document.querySelector('.js-tabPanel.is-active');

    if (current) {
      console.log("current.scrollTop:" , current.scrollTop);
      scrollPos[current.id] = current.scrollTop;
      console.log("current.id = ", current.id ,":", "scrollPos[current.id] = ", scrollPos[current.id]);
    }
    // ③ 全タブのis-active削除
    tabs.forEach(t => t.classList.remove('is-active'));
    tabItems.forEach(p => p.classList.remove('is-active'));
    // ④ 新しいタブをis-active
    tab.classList.add('is-active');
    const targetId = tab.dataset.target;
    const target = document.getElementById(targetId);
    target.classList.add('is-active');
    // ⑤ スクロール復元
    target.scrollTop = scrollPos[targetId] || 0;
  });
});