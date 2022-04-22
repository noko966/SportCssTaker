/*	Sekabet */
window.HomePageConfig = {
    bannerL: 1,
    liveBetting: 2,
    upcoming: 3,

    bannerR: 1,
    topMatches: 2,
    predictions: 3,

    upcomingCount: 3,
    liveBettingCount: 3,
    topMatchesCount: 15
};

$P.SportdigiBannerMainConfig = Object.assign(sportdigiBannerDefaultConfig, {
    oddsModeEnabled: false
});


$P.StakeControl = Sport.CouponPanel.StakeControl;

$P.CopyLinkEnabled = true;

function appendExtendedMenuItems() {
    var menu = document.querySelector('.sportSubheadMenu');

    var a2 = createElement('a', {
        innerHTML: $culture.footer_sport_liveResults,
        className: "tg__submenu__item sub_res",
        href: 'javascript:void(0)',
        title: $culture.footer_sport_liveResults,
        onclick: function () {
            Sport.Components.popup.open(Sport.Config.LiveScoreURL, popupParams);
        }
    });

    var a3 = createElement('a', {
        innerHTML: $culture.FOOTER_SPORT_STATISTICS,
        className: "tg__submenu__item sub_res",
        href: 'javascript:void(0)',
        title: $culture.FOOTER_SPORT_STATISTICS,
        onclick: function () {
            Sport.Components.popup.open(Sport.Config.StatsURL, popupParams);
        }
    });

    // addToMenu(menu, [a2, a3]);
    menu.appendChild(a2);
    menu.appendChild(a3);
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

