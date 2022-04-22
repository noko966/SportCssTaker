/* MojaBetTZ */
window.HomePageConfig = {
    bannerL: 1,
    liveBetting: 2,
    upcoming: 3,

    bannerR: 1,
    topMatches: 2,
    predictions: 3,

    upcomingCount: 5,
    liveBettingCount: 5,
    topMatchesCount: 5
};

$P.MobileBanner = Sport.CommonControls.SlidingBanner;
$P.StakeControl = Sport.CouponPanel.StakeControl2;

$P.CopyLinkEnabled = true;

!function (f, e, t, u, n, s, p) {
    if (f.esk) return; n = f.esk = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
    if (!f.__esk) f._esk = n;
    n.push = n; n.loaded = !0; n.queue = [];
    s = e.createElement(t); s.async = !0; s.src = u;
    p = e.getElementsByTagName(t)[0]; p.parentNode.insertBefore(s, p)
}(window, document, 'script', 'https://dsp-media.eskimi.com/assets/js/e/gtr.min.js?=0.0.0.3');

esk('init', '17879');
gtag = esk;