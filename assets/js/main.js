/* ============================================================
   世界玉石珠寶網 · 統一 chrome 注入腳本（全站單一來源）
   依 body[data-base]（相對根目錄深度）與 body[data-on]（當前欄目）
   注入：固定 header + megamenu dropdown、左側 sidebar 文章樹、
   footer、全域全文檢索即時下拉、深/淺主題、行動版抽屜導覽。
   NAV_DATA 由建站腳本注入，格式：
   [{id,zh,en,articles:[{t,u}]}]，u 為站根相對路徑。
   ============================================================ */
(function () {
  'use strict';

  var BASE = document.body.getAttribute('data-base') || './';
  var CURRENT_CAT = document.body.getAttribute('data-on') || '';
  var CURRENT_PAGE = document.body.getAttribute('data-page') || '';
  if (BASE && BASE.charAt(BASE.length - 1) !== '/') BASE += '/';

  var SITE = {
    name: 'fufuloo 富富鹿',
    nameEn: 'World Jade Jewelry · Gem Identification Encyclopedia',
    tagline: '把 GIA、IGS、Gem-A 等世界級寶石知識，翻譯成人人看得懂的白話寶典',
    credit: '規劃設計開發：<b>舒安境</b>　·　Line：<b>331.today</b>　·　📱 0968-222201',
    copyright: 'fufuloo 富富鹿 © 2026 — 內容為原創科普整理，僅供學習參考，不構成鑑定或投資建議'
  };

var NAV_DATA = [{"id":"diamond","zh":"鑽石","en":"Diamond","desc":"4C、仿鑽、培育鑽、彩鑽與切工科學","count":20,"articles":[{"t":"鑽石4C總論：一顆鑽石的四大身分證","u":"encyclopedia/diamond/diamond-4c-overview.html"},{"t":"克拉重量與「克拉溢價」：多 0.3 分為何貴一倍","u":"encyclopedia/diamond/carat-weight-carat-premium.html"},{"t":"鑽石顏色分級 D–Z：無色到淡黃的真相","u":"encyclopedia/diamond/diamond-color-grading-d-z.html"},{"t":"淨度分級與內含物：羽裂、針點與晶體的世界","u":"encyclopedia/diamond/diamond-clarity-inclusions.html"},{"t":"切工、亮光與火光：為什麼切工是 4C 之王","u":"encyclopedia/diamond/diamond-cut-brilliance-fire.html"},{"t":"圓明亮式 57 面之謎：每顆鑽石的數學課","u":"encyclopedia/diamond/round-brilliant-57-facets.html"},{"t":"莫桑石 vs 鑽石：火光更強卻便宜百倍的對手","u":"encyclopedia/diamond/moissanite-vs-diamond.html"},{"t":"立方氧化鋯與仿鑽家族：一眼識破的訣竅","u":"encyclopedia/diamond/cubic-zirconia-diamond-simulants.html"},{"t":"鑽石螢光：加價還是砍價的秘密","u":"encyclopedia/diamond/diamond-fluorescence.html"},{"t":"奶咖綠鑽石：證書上不會寫的三個字","u":"encyclopedia/diamond/milky-brown-green-diamonds.html"},{"t":"培育鑽石 vs 天然鑽石：肉眼無法分辨的戰爭","u":"encyclopedia/diamond/lab-grown-vs-natural-diamond.html"},{"t":"HPHT 與 CVD：兩條培育鑽石的科技路線","u":"encyclopedia/diamond/hpht-cvd-diamond-growth.html"},{"t":"彩鑽成因：粉鑽、藍鑽、黃鑽的顏色密碼","u":"encyclopedia/diamond/fancy-colored-diamond-origin.html"},{"t":"紅鑽與變色鑽石：最稀有的色彩傳說","u":"encyclopedia/diamond/red-chameleon-diamonds.html"},{"t":"鑽石鑑定證書解讀：GIA 報告每一格的含義","u":"encyclopedia/diamond/gia-report-reading-guide.html"},{"t":"熱導儀的極限：它其實測不出「是不是鑽石」","u":"encyclopedia/diamond/diamond-tester-limits.html"},{"t":"硬度不等於堅韌：一錘能敲碎的鑽石","u":"encyclopedia/diamond/diamond-hardness-vs-toughness.html"},{"t":"八心八箭：行銷神話還是工藝真功夫","u":"encyclopedia/diamond/eight-hearts-eight-arrows.html"},{"t":"花式切工：公主方、祖母綠形與心形的性格","u":"encyclopedia/diamond/fancy-diamond-cuts.html"},{"t":"二手鑽石與保值真相：買進就打七折？","u":"encyclopedia/diamond/secondhand-diamond-value.html"}]},{"id":"ruby-sapphire","zh":"紅藍寶石","en":"Ruby & Sapphire","desc":"剛玉家族、鴿血紅、皇家藍、產地與處理","count":20,"articles":[{"t":"紅藍寶石總論：剛玉家族的兩位巨星","u":"encyclopedia/ruby-sapphire/ruby-sapphire-overview.html"},{"t":"鴿血紅：顏色之外的產地與螢光秘密","u":"encyclopedia/ruby-sapphire/pigeon-blood-ruby.html"},{"t":"皇家藍與矢車菊藍：藍寶石的兩種頂級人格","u":"encyclopedia/ruby-sapphire/royal-blue-cornflower-blue-sapphire.html"},{"t":"星光效應：三組針狀物織出的六道光芒","u":"encyclopedia/ruby-sapphire/asterism-star-ruby-sapphire.html"},{"t":"帕帕拉恰：蓮花色藍寶石的東西方之爭","u":"encyclopedia/ruby-sapphire/padparadscha-sapphire.html"},{"t":"熱處理 vs 無燒：加熱過的紅寶石算天然嗎","u":"encyclopedia/ruby-sapphire/heat-treated-vs-unheated-corundum.html"},{"t":"紅寶石產地：緬甸、莫三比克與泰國的基因","u":"encyclopedia/ruby-sapphire/ruby-origins-myanmar-mozambique.html"},{"t":"藍寶石產地：喀什米爾、斯里蘭卡與澳洲","u":"encyclopedia/ruby-sapphire/sapphire-origins-kashmir-sri-lanka.html"},{"t":"玻璃充填紅寶石：最危險的「美容術」","u":"encyclopedia/ruby-sapphire/glass-filled-ruby.html"},{"t":"合成紅藍寶石：焰熔法到水熱法的進化","u":"encyclopedia/ruby-sapphire/synthetic-ruby-sapphire.html"},{"t":"金紅石針與絲狀物：紅寶石體內的定時指紋","u":"encyclopedia/ruby-sapphire/rutile-silk-inclusions.html"},{"t":"變色藍寶石：白天藍、晚上紫的魔術師","u":"encyclopedia/ruby-sapphire/color-change-sapphire.html"},{"t":"藍寶石顏色科學：鐵與鈦的藍色配方","u":"encyclopedia/ruby-sapphire/sapphire-color-science.html"},{"t":"緬甸紅與螢光：為什麼緬甸紅寶特別紅","u":"encyclopedia/ruby-sapphire/burmese-ruby-fluorescence.html"},{"t":"星光藍寶與貓眼：剛玉界的特異功能","u":"encyclopedia/ruby-sapphire/star-sapphire-catseye-corundum.html"},{"t":"剛玉硬度與包裹體判讀：讀懂寶石的年輪","u":"encyclopedia/ruby-sapphire/corundum-hardness-inclusions.html"},{"t":"加熱工藝細節：窯裡發生了什麼化學反應","u":"encyclopedia/ruby-sapphire/ruby-heat-treatment-process.html"},{"t":"擴散處理與鈹擴散：顏色只有一層皮的真相","u":"encyclopedia/ruby-sapphire/diffusion-treated-sapphire.html"},{"t":"紅藍寶石的選購與投資指南","u":"encyclopedia/ruby-sapphire/ruby-sapphire-buying-guide.html"},{"t":"著名紅藍寶石：那些載入史冊的巨寶","u":"encyclopedia/ruby-sapphire/famous-rubies-sapphires.html"}]},{"id":"emerald","zh":"祖母綠與綠柱石","en":"Emerald & Beryl","desc":"注油、產地傳說、鉻釩致色與選購保養","count":10,"articles":[{"t":"祖母綠總論：比鑽石更貴的綠色奇蹟","u":"encyclopedia/emerald/emerald-overview.html"},{"t":"祖母綠注油：幾乎每一顆都「動過手腳」","u":"encyclopedia/emerald/emerald-oiling-treatment.html"},{"t":"哥倫比亞祖母綠：木佐與契沃爾的傳說","u":"encyclopedia/emerald/colombian-emerald-muzo-chivor.html"},{"t":"贊比亞與巴西祖母綠：新興產地崛起","u":"encyclopedia/emerald/zambian-brazilian-emerald.html"},{"t":"鉻致色與釩致色：祖母綠為什麼是綠的","u":"encyclopedia/emerald/emerald-chromium-vanadium-color.html"},{"t":"花園 jardin：祖母綠內含物之美","u":"encyclopedia/emerald/emerald-jardin-inclusions.html"},{"t":"海藍寶石：綠柱石家族的海之精靈","u":"encyclopedia/emerald/aquamarine-guide.html"},{"t":"摩根石與金綠柱石：粉紅與金色的兄弟","u":"encyclopedia/emerald/morganite-golden-beryl.html"},{"t":"合成祖母綠與仿品：實驗室的綠色挑戰","u":"encyclopedia/emerald/synthetic-emerald.html"},{"t":"祖母綠的選購與保養：脆弱的美人","u":"encyclopedia/emerald/emerald-buying-care-guide.html"}]},{"id":"jade","zh":"翡翠與和田玉","en":"Jade","desc":"種水色、ABC 貨、賭石與玉文化","count":14,"articles":[{"t":"翡翠總論：硬玉與軟玉的千年誤會","u":"encyclopedia/jade/jadeite-nephrite-overview.html"},{"t":"翡翠的「種」：玻璃種、冰種、糯種、豆種","u":"encyclopedia/jade/jadeite-zhong-grades.html"},{"t":"翡翠的水與色：透明度與綠色的交易","u":"encyclopedia/jade/jadeite-water-color-value.html"},{"t":"A貨、B貨、C貨：翡翠世界的紅綠燈","u":"encyclopedia/jade/jadeite-abc-grades.html"},{"t":"翡翠鑑定：比重、折射率與紫外燈快篩","u":"encyclopedia/jade/jadeite-testing-methods.html"},{"t":"緬甸翡翠：老坑與新坑的傳說","u":"encyclopedia/jade/myanmar-jadeite-mines.html"},{"t":"紫羅蘭與多色翡翠：綠以外的繽紛","u":"encyclopedia/jade/lavender-multicolor-jadeite.html"},{"t":"和田玉：羊脂白玉的千年溫潤","u":"encyclopedia/jade/hetian-nephrite-jade.html"},{"t":"翡翠仿品大全：玻璃、石英岩與水沫子","u":"encyclopedia/jade/jadeite-simulants.html"},{"t":"賭石：一刀窮一刀富的風險美學","u":"encyclopedia/jade/jade-gambling-rough-stones.html"},{"t":"翡翠選購五步：種水色工藝證書","u":"encyclopedia/jade/jadeite-buying-guide.html"},{"t":"玉的文化：從禮器到傳家寶","u":"encyclopedia/jade/jade-culture-heritage.html"},{"t":"羊脂白玉：一兩黃金難換一兩玉","u":"encyclopedia/jade/mutton-fat-white-jade.html"},{"t":"青海料、俄料、韓料：和田玉的產地拼圖","u":"encyclopedia/jade/jade-origins-qinghai-russian-korean.html"}]},{"id":"organic","zh":"有機寶石","en":"Organic Gems","desc":"珍珠、珊瑚、琥珀、象牙與玳瑁","count":14,"articles":[{"t":"有機寶石總論：生命創造的珍寶","u":"encyclopedia/organic/organic-gem-overview.html"},{"t":"珍珠總論：暈彩與圓潤的奧秘","u":"encyclopedia/organic/pearl-overview.html"},{"t":"海水珠與淡水珠：家族的戰爭","u":"encyclopedia/organic/saltwater-vs-freshwater-pearls.html"},{"t":"天然珍珠與養殖珍珠：身世之謎","u":"encyclopedia/organic/natural-vs-cultured-pearls.html"},{"t":"珍珠分級：光澤圓度大小的五維評分","u":"encyclopedia/organic/pearl-grading-five-dimensions.html"},{"t":"珍珠仿品與優化：玻璃珠與染色珠","u":"encyclopedia/organic/pearl-simulants-treatments.html"},{"t":"琥珀：千萬年前的樹淚","u":"encyclopedia/organic/amber-guide.html"},{"t":"蜜蠟：不透明琥珀的溫潤哲學","u":"encyclopedia/organic/honey-wax-amber.html"},{"t":"紅珊瑚：海底的千年火","u":"encyclopedia/organic/red-coral-guide.html"},{"t":"象牙與骨雕：禁區中的白色藝術","u":"encyclopedia/organic/ivory-bone-carving.html"},{"t":"玳瑁與貝殼寶石：海洋的斑斕","u":"encyclopedia/organic/hawksbill-shell-gems.html"},{"t":"有機寶石選購與保養：嬌客的日常","u":"encyclopedia/organic/organic-gem-care-guide.html"},{"t":"大溪地黑珍珠：不是黑的黑色珍珠","u":"encyclopedia/organic/tahitian-black-pearls.html"},{"t":"蟲珀與內含物：封存時間的膠囊","u":"encyclopedia/organic/insect-inclusion-amber.html"}]},{"id":"gems","zh":"其他寶石","en":"Gemstones","desc":"紫水晶、碧璽、蛋白石、坦桑石等 20 種寶石","count":20,"articles":[{"t":"紫水晶：石英的紫色貴族","u":"encyclopedia/gems/amethyst-guide.html"},{"t":"黃水晶與煙水晶：陽光的兩種樣貌","u":"encyclopedia/gems/citrine-smoky-quartz.html"},{"t":"石榴石：被低估的紅色寶石","u":"encyclopedia/gems/garnet-guide.html"},{"t":"尖晶石：紅寶石的「雙胞胎」","u":"encyclopedia/gems/spinel-guide.html"},{"t":"橄欖石：火山與隕石裡的綠","u":"encyclopedia/gems/peridot-guide.html"},{"t":"鋯石：鑽石的古老替身","u":"encyclopedia/gems/zircon-guide.html"},{"t":"托帕石：帝王色的尊貴","u":"encyclopedia/gems/topaz-guide.html"},{"t":"碧璽：彩虹礦物之王","u":"encyclopedia/gems/tourmaline-guide.html"},{"t":"綠松石：天空之石","u":"encyclopedia/gems/turquoise-guide.html"},{"t":"月光石：凝結的月光","u":"encyclopedia/gems/moonstone-guide.html"},{"t":"蛋白石：彩虹凝固的火焰","u":"encyclopedia/gems/opal-guide.html"},{"t":"石英家族：瑪瑙、玉髓與虎眼石","u":"encyclopedia/gems/chalcedony-agate-tigers-eye.html"},{"t":"稀有寶石巡禮：坦桑石、丹泉石與沙弗萊","u":"encyclopedia/gems/tanzanite-iolite-tsavorite.html"},{"t":"人造寶石與仿品：實驗室的雙面鏡","u":"encyclopedia/gems/synthetic-gems-imitations.html"},{"t":"彩色寶石選購總綱：從入門到收藏","u":"encyclopedia/gems/colored-gem-buying-guide.html"},{"t":"西瓜碧璽與帕拉伊巴：碧璽的雙面人生","u":"encyclopedia/gems/watermelon-tourmaline-paraiba.html"},{"t":"坦桑石：地球上只有一座山的寶石","u":"encyclopedia/gems/tanzanite-guide.html"},{"t":"黑歐泊與火歐泊：澳洲與衣索比亞的對決","u":"encyclopedia/gems/black-opal-fire-opal.html"},{"t":"貓眼與亞歷山大變石：金綠寶石的雙絕","u":"encyclopedia/gems/catseye-alexandrite-chrysoberyl.html"},{"t":"鋰輝石家族：紫鋰輝石與翠綠鋰輝石","u":"encyclopedia/gems/spodumene-kunzite-hiddenite.html"}]},{"id":"metal","zh":"貴金屬與工藝","en":"Precious Metals","desc":"金銀鉑鈀、K金純度、鑑定與鑲嵌工藝","count":14,"articles":[{"t":"黃金總論：穿越五千年的硬通貨","u":"encyclopedia/metal/gold-overview.html"},{"t":"白銀：平民的貴金屬","u":"encyclopedia/metal/silver-guide.html"},{"t":"鉑金與鈀金：白色貴族的雙雄","u":"encyclopedia/metal/platinum-palladium.html"},{"t":"K金與純度標記：24K、18K、14K 怎麼分","u":"encyclopedia/metal/karat-gold-purity-marks.html"},{"t":"黃金鑑定：從掂重到火試金","u":"encyclopedia/metal/gold-testing-methods.html"},{"t":"白銀鑑定：冰塊、硝酸與重量","u":"encyclopedia/metal/silver-testing-methods.html"},{"t":"鉑金鑑定：密度與酸性的雙重考驗","u":"encyclopedia/metal/platinum-testing-methods.html"},{"t":"貴金屬投資：金條、金幣與 ETF","u":"encyclopedia/metal/precious-metal-investment.html"},{"t":"貴金屬選購與保養：金屬的日常","u":"encyclopedia/metal/precious-metal-buying-care.html"},{"t":"貴金屬與珠寶：金屬選擇的智慧","u":"encyclopedia/metal/precious-metals-in-jewelry.html"},{"t":"鍍金、包金與注金：一層皮能撐多久","u":"encyclopedia/metal/gold-plating-gold-filled-vermeil.html"},{"t":"鑲嵌工藝：爪鑲、包鑲與密釘鑲的學問","u":"encyclopedia/metal/jewelry-setting-techniques.html"},{"t":"珠寶製作流程：從蠟模到成品的手藝","u":"encyclopedia/metal/jewelry-making-process.html"},{"t":"銀飾氧化與保養：黑掉不是壞掉","u":"encyclopedia/metal/silver-tarnish-cleaning.html"}]},{"id":"tools","zh":"鑑定工具與防騙","en":"Tools & Anti-Fraud","desc":"放大鏡、折射儀、紫外燈與買寶自保","count":14,"articles":[{"t":"十倍放大鏡：鑑定師的第一件工具","u":"encyclopedia/tools/10x-loupe-guide.html"},{"t":"折射儀：寶石身份證的掃描器","u":"encyclopedia/tools/refractometer-guide.html"},{"t":"比重測試：寶石的「體重計」","u":"encyclopedia/tools/specific-gravity-testing.html"},{"t":"偏光鏡與二色鏡：看穿寶石的光性","u":"encyclopedia/tools/polariscope-dichroscope.html"},{"t":"顯微鏡：寶石的內在世界","u":"encyclopedia/tools/gem-microscope-guide.html"},{"t":"紫外燈：螢光裡的秘密","u":"encyclopedia/tools/uv-lamp-fluorescence-testing.html"},{"t":"分光鏡：寶石的顏色光譜","u":"encyclopedia/tools/spectroscope-guide.html"},{"t":"熱導儀與硬度計：鑽石的試金石","u":"encyclopedia/tools/diamond-tester-mohs-hardness.html"},{"t":"寶石鑑定流程：從肉眼到實驗室","u":"encyclopedia/tools/gem-identification-process.html"},{"t":"鑑定實驗室與證書：權威的力量","u":"encyclopedia/tools/gem-labs-certificates.html"},{"t":"鑑定工具總論：入門珠寶工具箱指南","u":"encyclopedia/tools/gemology-toolkit.html"},{"t":"常見珠寶騙局：直播、旅遊與地攤的劇本","u":"encyclopedia/tools/jewelry-scams.html"},{"t":"二手珠寶與估價陷阱：估價單不等於收購價","u":"encyclopedia/tools/secondhand-jewelry-appraisal.html"},{"t":"買寶石的十個自保步驟","u":"encyclopedia/tools/buying-gemstones-checklist.html"}]}];

  /* megamenu 子分類（每分類 5 個主題，連結到相關文章頁／實驗室錨點） */
  var SUB_NAV = {
    "diamond": [
      {"t":"4C 品級評判","u":"encyclopedia/diamond/diamond-4c-overview.html"},
      {"t":"鑽石證書解讀","u":"encyclopedia/diamond/gia-report-reading-guide.html"},
      {"t":"鑽石處理與優化","u":"encyclopedia/diamond/hpht-cvd-diamond-growth.html"},
      {"t":"合成鑽石與仿鑑別","u":"encyclopedia/diamond/lab-grown-vs-natural-diamond.html"},
      {"t":"鑽石款式與選購","u":"encyclopedia/diamond/secondhand-diamond-value.html"}
    ],
    "ruby-sapphire": [
      {"t":"紅藍寶石產地特徵","u":"encyclopedia/ruby-sapphire/ruby-origins-myanmar-mozambique.html"},
      {"t":"顏色與飽和度分級","u":"encyclopedia/ruby-sapphire/royal-blue-cornflower-blue-sapphire.html"},
      {"t":"加熱處理辨識","u":"encyclopedia/ruby-sapphire/heat-treated-vs-unheated-corundum.html"},
      {"t":"包裹體鑑定特徵","u":"encyclopedia/ruby-sapphire/rutile-silk-inclusions.html"},
      {"t":"紅藍寶石市場選購","u":"encyclopedia/ruby-sapphire/ruby-sapphire-buying-guide.html"}
    ],
    "emerald": [
      {"t":"祖母綠產地差異","u":"encyclopedia/emerald/colombian-emerald-muzo-chivor.html"},
      {"t":"浸油充填辨識","u":"encyclopedia/emerald/emerald-oiling-treatment.html"},
      {"t":"各類綠柱石家族","u":"encyclopedia/emerald/morganite-golden-beryl.html"},
      {"t":"淨度評估標準","u":"encyclopedia/emerald/emerald-jardin-inclusions.html"},
      {"t":"綠柱石收藏選購","u":"encyclopedia/emerald/emerald-buying-care-guide.html"}
    ],
    "jade": [
      {"t":"翡翠種水色分類","u":"encyclopedia/jade/jadeite-zhong-grades.html"},
      {"t":"和田玉產地與玉質","u":"encyclopedia/jade/hetian-nephrite-jade.html"},
      {"t":"B 貨 C 貨處理辨識","u":"encyclopedia/jade/jadeite-abc-grades.html"},
      {"t":"玉石皮殼與沁色","u":"encyclopedia/jade/jade-gambling-rough-stones.html"},
      {"t":"玉石選購與避坑","u":"encyclopedia/jade/jadeite-buying-guide.html"}
    ],
    "organic": [
      {"t":"琥珀與蜜蠟鑑別","u":"encyclopedia/organic/amber-guide.html"},
      {"t":"珍珠品級分類","u":"encyclopedia/organic/pearl-grading-five-dimensions.html"},
      {"t":"珊瑚與象牙認知","u":"encyclopedia/organic/red-coral-guide.html"},
      {"t":"有機寶石優化處理","u":"encyclopedia/organic/pearl-simulants-treatments.html"},
      {"t":"保養與保存守則","u":"encyclopedia/organic/organic-gem-care-guide.html"}
    ],
    "gems": [
      {"t":"變色寶石族","u":"encyclopedia/gems/catseye-alexandrite-chrysoberyl.html"},
      {"t":"尖晶石、石榴石家族","u":"encyclopedia/gems/spinel-guide.html"},
      {"t":"水晶石英族寶石","u":"encyclopedia/gems/chalcedony-agate-tigers-eye.html"},
      {"t":"稀少彩色寶石","u":"encyclopedia/gems/tanzanite-iolite-tsavorite.html"},
      {"t":"礦物標本鑑賞","u":"encyclopedia/gems/black-opal-fire-opal.html"}
    ],
    "metal": [
      {"t":"K 金、純金成色辨識","u":"encyclopedia/metal/karat-gold-purity-marks.html"},
      {"t":"鉑金銀飾品鑑定","u":"encyclopedia/metal/platinum-testing-methods.html"},
      {"t":"珠寶鑲嵌工藝種類","u":"encyclopedia/metal/jewelry-setting-techniques.html"},
      {"t":"復古古董珠寶判讀","u":"encyclopedia/metal/precious-metals-in-jewelry.html"},
      {"t":"金屬保養與修復","u":"encyclopedia/metal/precious-metal-buying-care.html"}
    ],
    "tools": [
      {"t":"家用簡易鑑定工具","u":"encyclopedia/tools/gemology-toolkit.html"},
      {"t":"實驗室專業儀器","u":"encyclopedia/tools/gem-microscope-guide.html"},
      {"t":"證書真偽查驗","u":"encyclopedia/tools/gem-labs-certificates.html"},
      {"t":"市面常見詐騙手段","u":"encyclopedia/tools/jewelry-scams.html"},
      {"t":"送檢流程與注意事項","u":"encyclopedia/tools/gem-identification-process.html"}
    ],
    "lab": [
      {"t":"寶石圖鑑資料庫","u":"lab/index.html#lab-sub-gemlib"},
      {"t":"光譜觀測模組","u":"lab/index.html#lab-sub-spectrum"},
      {"t":"寶石知識測驗","u":"lab/index.html#lab-sub-quiz"},
      {"t":"寶石對比比對工具","u":"lab/index.html#lab-sub-compare"},
      {"t":"珠寶時間軸瀏覽","u":"lab/index.html#lab-sub-timeline"}
    ]
  };

  var ICONS = {
    gem: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M9 3l3 6 3-6M12 9l-4.5 12M12 9l4.5 12" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3" stroke-linecap="round"/></svg>',
    sun: '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" stroke-linecap="round"/></svg>',
    moon: '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M3 11l9-8 9 8M5 9.5V21h5v-6h4v6h5V9.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    flask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M10 3h4M11 3v5l6.5 10.4A1.6 1.6 0 0 1 16.2 21H7.8a1.6 1.6 0 0 1-1.3-2.6L13 8" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 15h9" stroke-linecap="round"/></svg>'
  };

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---------- 主題 ---------- */
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
  }
  function savedTheme() {
    try { return localStorage.getItem('gem-theme'); } catch (e) { return null; }
  }
  (function initTheme() {
    applyTheme('light');
  })();

  function toggleTheme() {
    var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(cur);
    try { localStorage.setItem('gem-theme', cur); } catch (e) {}
  }

  /* ---------- 檢索 ---------- */
  var searchIndex = null;
  var searchIndexLoading = false;

  function loadSearchIndex(cb) {
    if (searchIndex) { cb && cb(); return; }
    if (searchIndexLoading) { return; }
    searchIndexLoading = true;
    var s = document.createElement('script');
    s.src = BASE + 'assets/js/search-index.js';
    s.onload = function () {
      searchIndex = window.SEARCH_INDEX || [];
      cb && cb();
    };
    s.onerror = function () { searchIndex = []; cb && cb(); };
    document.head.appendChild(s);
  }

  function doSearch(q, limit) {
    q = (q || '').trim().toLowerCase();
    if (!q || !searchIndex) return [];
    var out = [];
    for (var i = 0; i < searchIndex.length; i++) {
      var it = searchIndex[i];
      var hay = ((it.title || '') + ' ' + (it.category || '') + ' ' + (it.excerpt || '') + ' ' + (it.keywords || '')).toLowerCase();
      if (hay.indexOf(q) !== -1) {
        out.push(it);
        if (limit && out.length >= limit) break;
      }
    }
    return out;
  }

  function searchUrl(q) { return BASE + 'search.html?q=' + encodeURIComponent(q); }

  function renderDrop(input, drop, q) {
    var items = doSearch(q, 8);
    if (!q) { drop.classList.remove('open'); return; }
    var html = '';
    if (items.length === 0) {
      html = '<div class="sd-empty">找不到「' + esc(q) + '」相關內容</div>';
    } else {
      for (var i = 0; i < items.length; i++) {
        html += '<a class="sd-item" href="' + esc(BASE + items[i].url) + '">' +
          '<span class="sd-t">' + esc(items[i].title) + '</span>' +
          '<span class="sd-m">' + esc(items[i].category) + '</span></a>';
      }
      html += '<a class="sd-all" href="' + esc(searchUrl(q)) + '">查看全部搜尋結果（' + items.length + '+）→</a>';
    }
    drop.innerHTML = html;
    drop.classList.add('open');
  }

  function bindSearch(input, drop, goBtn) {
    if (!input) return;
    input.addEventListener('input', function () {
      loadSearchIndex(function () { renderDrop(input, drop, input.value); });
    });
    input.addEventListener('focus', function () {
      if (input.value) renderDrop(input, drop, input.value);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        window.location.href = searchUrl(input.value);
      }
      if (e.key === 'Escape') { drop.classList.remove('open'); }
    });
    if (goBtn) {
      goBtn.addEventListener('click', function () {
        window.location.href = searchUrl(input.value);
      });
    }
    document.addEventListener('click', function (e) {
      if (!drop.contains(e.target) && e.target !== input && !input.contains(e.target)) {
        drop.classList.remove('open');
      }
    });
  }

  /* ---------- 組裝 header（詳細版：品牌列 + 分類 megamenu 列） ---------- */
  function subsHtml(id) {
    var subs = SUB_NAV[id] || [];
    var h = '';
    for (var k = 0; k < subs.length; k++) {
      h += '<a class="mega-sub" href="' + esc(BASE + subs[k].u) + '"><i>' + (k + 1) + '</i><span>' + esc(subs[k].t) + '</span></a>';
    }
    return h;
  }
  function megaItem(c, parentUrl) {
    return '<div class="nav-item has-mega" data-cat="' + esc(c.id) + '">' +
      '<button class="nav-link" type="button">' + esc(c.zh) + ICONS.chev + '</button>' +
      '<div class="mega"><div class="mega-body">' +
        '<a class="mega-title" href="' + esc(parentUrl) + '">' + esc(c.zh) + '<span class="mega-en">' + esc(c.en) + '</span></a>' +
        '<div class="mega-subs">' + subsHtml(c.id) + '</div>' +
      '</div></div></div>';
  }
  function buildHeader() {
    var navHtml = '';
    for (var i = 0; i < NAV_DATA.length; i++) {
      var c = NAV_DATA[i];
      navHtml += megaItem(c, BASE + 'index.html#' + c.id);
    }
    /* 鑑定實驗室（外部頁）特別項，子分類指向實驗室頁錨點 */
    navHtml += '<div class="nav-item has-mega" data-cat="lab">' +
      '<button class="nav-link" type="button">鑑定實驗室' + ICONS.chev + '</button>' +
      '<div class="mega"><div class="mega-body">' +
        '<a class="mega-title" href="' + esc(BASE + 'lab/index.html') + '">鑑定實驗室<span class="mega-en">Gem Lab</span></a>' +
        '<div class="mega-subs">' + subsHtml('lab') + '</div>' +
      '</div></div></div>';
    var header = document.querySelector('.site-header');
    if (!header) {
      header = document.createElement('header');
      header.className = 'site-header';
      document.body.insertBefore(header, document.body.firstChild);
    }
    header.innerHTML =
      '<div class="h-top"><div class="h-top-inner">' +
        '<button class="nav-toggle" type="button" aria-label="開啟選單" aria-expanded="false">' + ICONS.menu + '</button>' +
        '<a class="brand" href="' + esc(BASE + 'index.html') + '">' +
          '<span class="brand-mark">' + ICONS.gem + '</span>' +
          '<span class="brand-text"><b>' + esc(SITE.name) + '</b><small>' + esc(SITE.nameEn) + '</small></span></a>' +
        '<div class="h-tools">' +
          '<div class="search-box"><input type="search" placeholder="全文檢索寶石知識…" aria-label="全文檢索">' +
            '<button class="search-btn" type="button" aria-label="搜尋">' + ICONS.search + '</button>' +
            '<div class="search-drop"></div></div>' +
        '</div>' +
      '</div></div>' +
      '<div class="h-nav"><div class="h-nav-inner">' +
        '<nav class="main-nav" aria-label="主導覽">' + navHtml +
          '<div class="nav-extra">' +
            '<a class="nav-link" href="' + esc(BASE + 'search.html') + '">全文檢索</a>' +
          '</div></nav>' +
      '</div></div>';

    /* 遮罩 */
    var mask = document.createElement('div');
    mask.className = 'nav-mask';
    document.body.appendChild(mask);

    var input = header.querySelector('.search-box input');
    var drop = header.querySelector('.search-drop');
    var sbtn = header.querySelector('.search-btn');
    bindSearch(input, drop, sbtn);

    header.querySelector('.nav-toggle').addEventListener('click', openDrawer);

    /* megamenu 鍵盤進出 */
    header.querySelectorAll('.nav-item.has-mega').forEach(function (item) {
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          var link = item.querySelector('.nav-link');
          item.classList.remove('open');
          link && link.blur();
        }
      });
    });
  }

  /* ---------- 組裝 sidebar（桌面＋行動抽屜共用，詳細版） ---------- */
  function buildSideTree() {
    var html = '';
    for (var i = 0; i < NAV_DATA.length; i++) {
      var c = NAV_DATA[i];
      var items = '';
      for (var j = 0; j < c.articles.length; j++) {
        var a = c.articles[j];
        var cur = (a.u === CURRENT_PAGE) ? ' class="current"' : '';
        items += '<li><a href="' + esc(BASE + a.u) + '"' + cur + '>' + esc(a.t) + '</a></li>';
      }
      html += '<div class="side-group" data-cat="' + esc(c.id) + '">' +
        '<div class="side-group-head" tabindex="0" role="button" aria-expanded="true">' +
          '<span class="sg-t"><b>' + esc(c.zh) + '</b><em>' + esc(c.en) + '</em></span>' +
        '</div>' +
        '<ul>' + items + '</ul></div>';
    }
    return html;
  }

  function sideBrand() {
    return '<div class="side-brand"><span class="brand-mark">' + ICONS.gem + '</span>' +
      '<span class="sb-t"><b>' + esc(SITE.name) + '</b><small>寶石鑑定百科</small></span></div>';
  }

  /* 側欄群組收合 */
  function bindSideCollapse(container) {
    if (!container) return;
    container.querySelectorAll('.side-group-head').forEach(function (head) {
      head.addEventListener('click', function () {
        var g = head.parentNode;
        g.classList.toggle('collapsed');
        head.setAttribute('aria-expanded', g.classList.contains('collapsed') ? 'false' : 'true');
      });
    });
  }

  function buildSidebar() {
    var aside = document.querySelector('.sidebar');
    if (!aside) return;
    var html =
      '<div class="sidebar-inner">' +
        sideBrand() +
        '<a class="side-link" href="' + esc(BASE + 'index.html') + '">' + ICONS.home + '首頁</a>' +
        '<a class="side-link" href="' + esc(BASE + 'search.html') + '">' + ICONS.search + '全文檢索</a>' +
        '<a class="side-link" href="' + esc(BASE + 'lab/index.html') + '">' + ICONS.flask + '鑑定實驗室</a>' +
        buildSideTree() +
        '<div class="side-note">' + esc(SITE.tagline) + '</div>' +
      '</div>';
    aside.innerHTML = html;
    bindSideCollapse(aside);
  }

  /* ---------- 行動版抽屜 ---------- */
  var drawer = null;
  function openDrawer() {
    if (!drawer) buildDrawer();
    drawer.classList.add('open');
    document.body.classList.add('nav-open');
    var mask = document.querySelector('.nav-mask');
    if (mask) mask.classList.add('show');
    var toggle = document.querySelector('.nav-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  }
  function closeDrawer() {
    if (drawer) drawer.classList.remove('open');
    document.body.classList.remove('nav-open');
    var mask = document.querySelector('.nav-mask');
    if (mask) mask.classList.remove('show');
    var toggle = document.querySelector('.nav-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }
  function buildDrawer() {
    drawer = document.createElement('div');
    drawer.className = 'mobile-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-label', '行動版導覽');
    drawer.innerHTML =
      '<div class="drawer-head"><b>' + esc(SITE.name) + '</b>' +
      '<button class="drawer-close" type="button" aria-label="關閉選單">' + ICONS.close + '</button></div>' +
      '<div class="sidebar-inner">' +
        sideBrand() +
        '<a class="side-link" href="' + esc(BASE + 'index.html') + '">' + ICONS.home + '首頁</a>' +
        '<a class="side-link" href="' + esc(BASE + 'search.html') + '">' + ICONS.search + '全文檢索</a>' +
        '<a class="side-link" href="' + esc(BASE + 'lab/index.html') + '">' + ICONS.flask + '鑑定實驗室</a>' +
        buildSideTree() +
        '<div class="side-note">' + esc(SITE.tagline) + '</div>' +
      '</div>';
    document.body.appendChild(drawer);
    drawer.querySelector('.drawer-close').addEventListener('click', closeDrawer);
    bindSideCollapse(drawer);
    drawer.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  function bindMask() {
    var mask = document.querySelector('.nav-mask');
    if (mask) mask.addEventListener('click', closeDrawer);
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
  });

  /* ---------- 組裝 footer ---------- */
  function buildFooter() {
    var footer = document.querySelector('.site-footer');
    if (!footer) return;
    footer.innerHTML =
      '<div class="footer-inner">' +
        '<div class="footer-brand">' + esc(SITE.name) + ' · 寶石鑑定百科<br><span style="font-weight:400;font-size:12.5px;color:#8fa091">' + esc(SITE.nameEn) + '</span></div>' +
        '<div class="footer-credit">' + SITE.credit + '</div>' +
        '<div class="footer-copy">' + esc(SITE.copyright) + '</div>' +
      '</div>';
  }

  /* ---------- 啟動 ---------- */
  function init() {
    buildHeader();
    buildSidebar();
    buildFooter();
    bindMask();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
