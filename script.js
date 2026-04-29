/* =====================================================
   人生プロファイル LP — script.js
   - 文字数カウント
   - フォーム送信処理(現状はダミー / 後でAPI差し替え)
   - スムーススクロール補助
   - フッター年表示
===================================================== */

(function () {
  'use strict';

  // -----------------------------------
  // 1. 年の表示
  // -----------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // -----------------------------------
  // 2. テキストエリアの文字数カウント
  // -----------------------------------
  const worryInput = document.getElementById('worry');
  const worryCount = document.getElementById('worryCount');

  if (worryInput && worryCount) {
    worryInput.addEventListener('input', function () {
      worryCount.textContent = worryInput.value.length;
    });
  }

  // -----------------------------------
  // 3. フォーム送信処理
  // -----------------------------------
  const form = document.getElementById('diagnoseForm');
  const successBox = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const worry = (worryInput.value || '').trim();

      if (!worry) {
        worryInput.focus();
        return;
      }

      // ▼▼▼ 後でここをAPI連携に差し替える ▼▼▼
      // 例:
      // fetch('/api/diagnose', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ worry: worry })
      // })
      //   .then(res => res.json())
      //   .then(data => { /* 診断結果を表示 */ })
      //   .catch(err => { /* エラー処理 */ });
      // ▲▲▲

      handleSubmitSuccess(worry);
    });
  }

  /**
   * 送信成功時の表示処理
   * @param {string} worry
   */
  function handleSubmitSuccess(worry) {
    // コンソールに保存(後でAPI送信に変更)
    console.log('[diagnose submit]', { worry: worry, ts: new Date().toISOString() });

    // フォームを非表示にして成功メッセージを表示
    if (form && successBox) {
      form.hidden = true;
      successBox.hidden = false;

      // スムーススクロールで成功メッセージへ
      window.requestAnimationFrame(function () {
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }

  // -----------------------------------
  // 4. ナビCTAクリック時:診断フォームへスクロール
  //    (HTMLのhrefだけでも動くが、念のためフォーカスも当てる)
  // -----------------------------------
  const navCta = document.querySelector('.nav__cta');
  if (navCta && worryInput) {
    navCta.addEventListener('click', function () {
      // スクロール完了を待ってフォーカス
      setTimeout(function () {
        worryInput.focus({ preventScroll: true });
      }, 600);
    });
  }

  const fvCta = document.querySelector('.fv__cta-wrap .btn');
  if (fvCta && worryInput) {
    fvCta.addEventListener('click', function () {
      setTimeout(function () {
        worryInput.focus({ preventScroll: true });
      }, 600);
    });
  }

})();
