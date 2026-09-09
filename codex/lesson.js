(function () {
  "use strict";

  var KEY = "skillengine-lp-codex-24h";
  var WATCHED_KEY = "skillengine-lp-codex-watched";
  var SPAN = 24 * 60 * 60 * 1000;
  var CLOSE_AFTER_TIMER = true;
  // 新しい動画は配信確認後に別 slug へ変更する。同じ slug への上書きは禁止。
  var HLS_SRC = "https://autowebinar-eta.vercel.app/api/media/codex-lesson-v5c/master.m3u8";
  var HLS_JS = "https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.20/hls.min.js";
  var LOAD_TIMEOUT = 15000;

  var video = document.getElementById("lesson");
  var wrap = document.getElementById("videoWrap");
  var playBtn = document.getElementById("playBtn");
  var retryBtn = document.getElementById("retryBtn");
  var status = document.getElementById("videoStatus");
  var unavail = document.getElementById("unavail");
  var closed = document.getElementById("closed");
  var hint = document.getElementById("hint");
  var bonus = document.getElementById("bonus");
  var sticky = document.getElementById("sticky");
  var timer = document.getElementById("timer");
  var digits = timer.querySelectorAll("[data-u]");
  var hls = null;
  var loader = null;
  var loadTimeout = null;
  var generation = 0;
  var started = false;
  var expired = false;
  var unavailable = false;
  var playRequested = false;

  // localStorage が利用できない環境でも、このページを開いている間の期限は保持する。
  function read(key) {
    try { return { available: true, value: localStorage.getItem(key) }; }
    catch (_error) { return { available: false, value: null }; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, value); } catch (_error) {}
  }
  function deadline(value) {
    // 保存済みの破損値を「初回訪問」に戻さない。期限の延長になるため失効させる。
    if (!/^\d+$/.test(value)) return 0;
    var parsed = Number(value);
    return Number.isSafeInteger(parsed) && parsed <= Date.now() + SPAN ? parsed : 0;
  }

  var stored = read(KEY);
  var end = stored.available && stored.value !== null ? deadline(stored.value) : Date.now() + SPAN;
  write(KEY, String(end));
  var watched = read(WATCHED_KEY).value === "1";

  function say(message) {
    if (status && status.textContent !== message) status.textContent = message;
  }

  function render() {
    var isClosed = CLOSE_AFTER_TIMER && expired;
    var fallback = isClosed || unavailable;
    wrap.classList.toggle("is-closed", isClosed);
    wrap.classList.toggle("is-unavail", unavailable && !isClosed);
    closed.hidden = !isClosed;
    unavail.hidden = !unavailable || isClosed;
    playBtn.hidden = isClosed || unavailable || started;
    if (retryBtn) retryBtn.hidden = !unavailable || isClosed;
    bonus.hidden = fallback || !watched;
    sticky.hidden = !fallback && !watched;
    document.body.classList.toggle("cx-has-cta", !sticky.hidden);
    hint.classList.toggle("is-over", isClosed);
    hint.classList.toggle("is-unavail", unavailable && !isClosed);
    hint.classList.toggle("is-done", watched && !fallback);
    document.querySelectorAll("[data-cta-label]").forEach(function (el) {
      el.textContent = fallback ? "無料の個別相談を予約する" : "プレゼントを受け取る";
    });
    document.querySelectorAll("[data-cta-note]").forEach(function (el) {
      el.textContent = fallback ? "個別相談は費用無料" : "個別面談は無料・特典は面談後にお渡し";
    });
  }

  function clearLoadTimeout() {
    clearTimeout(loadTimeout);
    loadTimeout = null;
  }

  function stopMedia() {
    generation += 1;
    clearLoadTimeout();
    playRequested = false;
    if (loader) {
      loader.onload = loader.onerror = null;
      loader.remove();
      loader = null;
    }
    if (hls) {
      hls.destroy();
      hls = null;
    }
    video.pause();
    video.removeAttribute("controls");
    video.removeAttribute("src");
    video.load();
    started = false;
  }

  function closeLesson() {
    stopMedia();
    unavailable = false;
    render();
    say("視聴期限が終了しました。無料の個別相談は下のボタンからご予約いただけます。");
  }

  function tick() {
    var left = Math.max(0, end - Date.now());
    var justExpired = !expired && left === 0;
    if (left === 0) expired = true;
    if (expired) left = 0;
    timer.classList.toggle("is-over", expired);
    var values = {
      h: Math.floor(left / 3600000),
      m: Math.floor((left % 3600000) / 60000),
      s: Math.floor((left % 60000) / 1000)
    };
    digits.forEach(function (el) {
      el.textContent = String(values[el.getAttribute("data-u")]).padStart(2, "0");
    });
    if (justExpired && CLOSE_AFTER_TIMER) closeLesson();
    return CLOSE_AFTER_TIMER && expired;
  }

  function showUnavailable(message) {
    if (tick()) return;
    unavailable = true;
    stopMedia();
    render();
    say(message || "動画を読み込めませんでした。通信環境を確認して、もう一度読み込んでください。");
  }

  function waitForMedia(message) {
    if (tick() || unavailable) return;
    say(message);
    if (loadTimeout !== null) return;
    var currentGeneration = generation;
    loadTimeout = setTimeout(function () {
      if (currentGeneration !== generation) return;
      showUnavailable("動画の読み込みに時間がかかっています。通信環境を確認して、もう一度読み込んでください。");
    }, LOAD_TIMEOUT);
  }

  function markWatched() {
    if (tick() || unavailable || watched) return;
    watched = true;
    write(WATCHED_KEY, "1");
    render();
    say("視聴完了。この下に追加特典のご案内が表示されました。特典は個別面談のあとにお渡しします。");
  }

  video.addEventListener("timeupdate", function () {
    if (Number.isFinite(video.duration) && video.duration > 0 && video.currentTime / video.duration >= 0.95) markWatched();
  });
  // 自動スクロールやフォーカス移動は行わず、読み進めている位置を保つ。
  video.addEventListener("ended", markWatched);

  function requestPlay() {
    if (tick() || unavailable) return;
    var currentGeneration = generation;
    playRequested = true;
    waitForMedia("動画を読み込んでいます…");
    function rejected(error) {
      if (currentGeneration !== generation || tick()) return;
      playRequested = false;
      if (error && error.name === "NotAllowedError") {
        clearLoadTimeout();
        started = false;
        render();
        say("再生を開始できませんでした。再生ボタンをもう一度タップしてください。");
      } else {
        showUnavailable("動画を再生できませんでした。もう一度読み込んでから再生してください。");
      }
    }
    try {
      var result = video.play();
      if (result && result.catch) result.catch(rejected);
    } catch (error) { rejected(error); }
  }
  playBtn.addEventListener("click", requestPlay);
  if (retryBtn) retryBtn.addEventListener("click", loadMedia);

  video.addEventListener("playing", function () {
    if (tick()) return;
    if (unavailable) { video.pause(); return; }
    var transferFocus = document.activeElement === playBtn || document.activeElement === retryBtn;
    started = true;
    playRequested = false;
    clearLoadTimeout();
    video.setAttribute("controls", "");
    render();
    if (transferFocus) {
      video.setAttribute("tabindex", "0");
      video.focus({ preventScroll: true });
    }
    say(watched ? "視聴済みです。この下に追加特典のご案内があります。" : "動画を再生しています。最後まで見ると追加特典のご案内が表示されます。");
  });

  video.addEventListener("loadedmetadata", function () {
    if (tick() || unavailable || playRequested || started) return;
    clearLoadTimeout();
    say("準備ができました。再生ボタンをタップしてご覧ください。");
  });
  video.addEventListener("canplay", function () {
    if (tick() || unavailable) return;
    clearLoadTimeout();
    if (!started && !playRequested) say("準備ができました。再生ボタンをタップしてご覧ください。");
  });
  video.addEventListener("waiting", function () { waitForMedia("動画を読み込んでいます…"); });
  video.addEventListener("stalled", function () { waitForMedia("動画の読み込みを待っています…"); });
  video.addEventListener("pause", function () {
    if (started && !video.ended && !expired && !unavailable) {
      clearLoadTimeout();
      say("一時停止中です。動画の再生ボタンから続けてご覧いただけます。");
    }
  });
  video.addEventListener("error", function () {
    if (video.hasAttribute("src") || hls) showUnavailable();
  });

  // Chrome も canPlayType に "maybe" を返すため、Apple の判定と組み合わせる。
  var ua = navigator.userAgent || "";
  var isApple = /iPad|iPhone|iPod/.test(ua)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    || (/Safari/.test(ua) && !/Chrome|Chromium|CriOS|FxiOS|Edg|Android/.test(ua));
  var canNative = isApple && !!video.canPlayType("application/vnd.apple.mpegurl");

  function startHls(currentGeneration) {
    if (currentGeneration !== generation || tick()) return;
    if (!window.Hls || !window.Hls.isSupported()) { showUnavailable(); return; }
    try {
      hls = new window.Hls({ enableWorker: true });
      hls.on(window.Hls.Events.ERROR, function (_event, data) {
        if (currentGeneration === generation && data && data.fatal) showUnavailable();
      });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
    } catch (_error) { showUnavailable(); }
  }

  function loadMedia() {
    if (tick()) return;
    stopMedia();
    unavailable = false;
    render();
    waitForMedia("動画を読み込んでいます…");
    if (canNative) {
      video.src = HLS_SRC;
      video.load();
    } else if (window.Hls) {
      startHls(generation);
    } else {
      var currentGeneration = generation;
      loader = document.createElement("script");
      loader.src = HLS_JS;
      loader.async = true;
      loader.onerror = function () {
        if (currentGeneration === generation) showUnavailable();
      };
      loader.onload = function () { startHls(currentGeneration); };
      document.head.appendChild(loader);
    }
  }

  function synchronize() {
    var next = read(KEY);
    if (next.available) {
      // 他タブで保存した早い期限は反映する。キーの削除や遅い期限で延長はしない。
      if (next.value !== null) end = Math.min(end, deadline(next.value));
      if (next.value !== String(end)) write(KEY, String(end));
    }
    var nextWatched = read(WATCHED_KEY);
    // 保存容量不足で setItem だけ失敗しても、このページ内の視聴完了は取り消さない。
    if (nextWatched.value === "1") watched = true;
    tick();
    render();
  }
  window.addEventListener("storage", function (event) {
    if (event.key === null || event.key === KEY || event.key === WATCHED_KEY) synchronize();
  });
  window.addEventListener("pageshow", synchronize);
  window.addEventListener("focus", synchronize);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) synchronize();
  });

  render();
  if (!tick()) loadMedia();
  setInterval(tick, 1000);
})();
