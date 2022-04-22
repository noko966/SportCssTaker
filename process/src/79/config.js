/*betBoom*/
window.HomePageConfig = {
    liveBettingCount: 4
};

$P.HomePageLayout = [
    '<div class="home_page_data_panel tg-grid tg-grid-margin--4">',
    '	<div class="home_page_left_panel tg-grid-padding--4 tg-grid--6 tg-grid--midplus-12 tg--flex tg--flex-col tg--pad-8">',
    '		<div id="live_betting" class="live_betting tg__home_game_item tg--mar-b-16"></div>',
    '		<div id="last_minute_bets" class="last_minute_bets tg__home_game_item tg--mar-b-16 tg--empty"></div>',
    '         <div id="home_day_of_multi_bets"></div>',
    '	</div>',
    '	<div class="home_page_right_panel tg-grid-padding--4 tg-grid--6 tg-grid--midplus-12 tg--flex tg--flex-col tg--pad-8">',
    '       <div id="ai_widget_container" class="data tg__home_game_item tg--mar-b-16"></div>',
    '		<div id="top_ten" class="data tg__home_game_item tg--mar-b-16"></div>',
    '		<div id="FavoriteStakesControl" class="FavoriteStakesControl tg__home_game_item tg--mar-b-16s"></div>',
    '	</div>',
    '</div>'
];

$P.SportdigiBannerMainConfig = {
    containerId: 'top_sportdigi_banner_block',
    initParams: {
        server: '//' + location.host,
        cmsServer: $P.CmsServiceUri,
        languageId: $culture.Id,
        language: $culture.Name,
        partnerId: $P.Id
    },
    descriptionEnabled: false,
    rightNamesNavigationMode: false,
    autoplayEnabled: true,
    transitionType: 'appear',
    arrowsEnabled: true,
    arrowsOnHoverEnabled: true,
    autoplayDuration: 6000,
    paginationViewMode: 'small_bullet',
    rtlEnabled: false,
    navigateToEvent: function (item) {
        if (item) {
            window.$S.openEvent(+item.eventId, item.eventName, item.eventStatus === 1, false);
        }
    },
    customClasses: {
        odd: 'l_od',
        paginationItem: ''
    },
    navigateToURL: function (item) {
        Sport.Components.popup.open(item.url, popupParams);
        scrollToTop(500);
    }
};

$P.StakeControl = Sport.CouponPanel.StakeControl;
$P.CopyLinkEnabled = true;

function appendExtendedMenuItems() {
    if ($S.IsMobileDevice) {
        return;
    }

    var menu = document.querySelector('.sportSubheadMenu');

    var twoLetterName = $globalSettings.language.TwoLetterName;
    var a1 = createElement('a', {
        innerHTML: $culture.slave_menu_rules,
        href: 'javascript:void(0)',
        className: 'tg__submenu__item',
        title: $culture.slave_menu_rules,
        onclick: function () {
            Sport.Components.popup.open('https://rules.bet-boom.com/?l=' + twoLetterName, popupParams);
        }
    });

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

    // addToMenu(menu, [a1, a2, a3]);
    menu.appendChild(a1);
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

$P.IsShowLeftLiveMenuOdds = true;