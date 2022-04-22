/*SportLoto*/
window.HomePageConfig = {
    bannerL: 1,
    liveBetting: 2,
    upcoming: 3,

    bannerR: 1,
    topMatches: 2,
    predictions: 3,

    upcomingCount: 3,
    liveBettingCount: 3,
    topMatchesCount: Infinity
};

var popupParams = {
    height: '800px',
    width: '1500px',
    top: '20px',
    position: 'absolute',
    transform: 'translate(-50%, 0)'
};

$P.SportdigiBannerMainConfig = Object.assign(sportdigiBannerDefaultConfig, {
    navigateToURL: function (item) {
        Sport.Components.popup.open(item.url, popupParams);
        scrollToTop(500);
    },
    paginationViewMode: 'digi_ico_minus',
});

$P.MobileBanner = Sport.CommonControls.SlidingBanner;
$P.StakeControl = Sport.CouponPanel.StakeControl2;

$P.CopyLinkEnabled = true;

function appendExtendedMenuItems() {
    var menu = document.querySelector('.sportSubheadMenu');

    var a1 = createElement('a', {
        innerHTML: $culture.slave_menu_calc,
        className: "tg__submenu__item sub_res",
        href: 'javascript:BetCalculator.show()',
        title: $culture.slave_menu_calc
    });

    // addToMenu(menu, [a1]);
    menu.appendChild(a1);
}

function addToMenu(menu, anchors) {
    anchors = anchors || [];
    anchors.forEach(function (anchor) {
        menu.appendChild(anchor);
    });
}


function createElement(elName, options) {
    options = options || {};
    var el = document.createElement(elName);
    Object.keys(options).forEach(function (k) {
        el[k] = options[k];
    });
    return el;
}
