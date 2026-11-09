/* 全文檢索頁邏輯：讀 ?q=，跨 search-index.js 檢索並列出結果 */
(function () {
  'use strict';
  var INDEX = window.SEARCH_INDEX || [];
  var qInput = document.getElementById('q');
  var goBtn = document.querySelector('.search-main-input .search-go');
  var statsEl = document.getElementById('stats');
  var filtersEl = document.getElementById('filters');
  var resultsEl = document.getElementById('results');
  var emptyEl = document.getElementById('empty');
  var activeCat = '全部';

  function params() {
    var p = {};
    var s = location.search.replace(/^\?/, '');
    if (!s) return p;
    s.split('&').forEach(function (kv) {
      var i = kv.indexOf('=');
      if (i > -1) p[decodeURIComponent(kv.slice(0, i))] = decodeURIComponent(kv.slice(i + 1));
    });
    return p;
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function highlight(text, q) {
    if (!q) return esc(text);
    var re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return esc(text).replace(re, '<mark>$1</mark>');
  }

  function categories() {
    var seen = [];
    INDEX.forEach(function (it) {
      if (it.category && seen.indexOf(it.category) === -1) seen.push(it.category);
    });
    return seen.sort();
  }

  function doSearch(q, cat) {
    q = (q || '').trim().toLowerCase();
    if (!q) return [];
    var out = [];
    INDEX.forEach(function (it) {
      if (cat && cat !== '全部' && it.category !== cat) return;
      var hay = ((it.title || '') + ' ' + (it.category || '') + ' ' + (it.excerpt || '') + ' ' + (it.keywords || '')).toLowerCase();
      if (hay.indexOf(q) !== -1) out.push(it);
    });
    return out;
  }

  function render(q) {
    if (!q) {
      statsEl.textContent = '';
      filtersEl.innerHTML = '';
      resultsEl.innerHTML = '';
      emptyEl.hidden = true;
      return;
    }
    var items = doSearch(q, activeCat);

    /* 篩選 chips */
    var cats = categories();
    var chips = '<button class="chip' + (activeCat === '全部' ? ' active' : '') + '" data-cat="全部">全部</button>';
    cats.forEach(function (c) {
      chips += '<button class="chip' + (activeCat === c ? ' active' : '') + '" data-cat="' + esc(c) + '">' + esc(c) + '</button>';
    });
    filtersEl.innerHTML = chips;
    filtersEl.querySelectorAll('.chip').forEach(function (ch) {
      ch.addEventListener('click', function () {
        activeCat = ch.getAttribute('data-cat');
        render(qInput.value.trim());
      });
    });

    statsEl.innerHTML = '「<strong>' + esc(qInput.value.trim()) + '</strong>」共找到 <strong>' + items.length + '</strong> 筆結果'
      + (activeCat !== '全部' ? '（分類：' + esc(activeCat) + '）' : '');

    if (items.length === 0) {
      resultsEl.innerHTML = '';
      emptyEl.hidden = false;
      emptyEl.innerHTML = '找不到與「<strong>' + esc(qInput.value.trim()) + '</strong>」相關的內容，試試其他關鍵字，例如：翡翠、4C、鴿血紅、注油、鑑定、保養。';
      return;
    }
    emptyEl.hidden = true;
    var html = '';
    items.forEach(function (it) {
      html += '<article class="result-item">' +
        '<span class="ri-cat">' + esc(it.category) + '</span>' +
        '<div class="ri-title"><a href="' + esc(it.url) + '">' + highlight(it.title || '', qInput.value.trim()) + '</a></div>' +
        '<div class="ri-ex">' + highlight(it.excerpt || '', qInput.value.trim()) + '</div>' +
        '</article>';
    });
    resultsEl.innerHTML = html;
  }

  goBtn.addEventListener('click', function () {
    var q = qInput.value.trim();
    history.replaceState(null, '', 'search.html?q=' + encodeURIComponent(q));
    render(q);
  });
  qInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var q = qInput.value.trim();
      history.replaceState(null, '', 'search.html?q=' + encodeURIComponent(q));
      render(q);
    }
  });
  var p = params();
  if (p.q) {
    qInput.value = p.q;
    render(p.q);
  } else {
    statsEl.textContent = '輸入關鍵字開始檢索，或直接點擊下方分類瀏覽。';
    filtersEl.innerHTML = '<button class="chip active" data-cat="全部">全部</button>' +
      categories().map(function (c) { return '<button class="chip" data-cat="' + esc(c) + '">' + esc(c) + '</button>'; }).join('');
    filtersEl.querySelectorAll('.chip').forEach(function (ch) {
      ch.addEventListener('click', function () { activeCat = ch.getAttribute('data-cat'); render(qInput.value.trim() || ' '); });
    });
  }
})();
