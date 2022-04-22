/* Championslots */
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

$P.HomePageLayout = [
    '<div class="home_page_data_panel tg-grid tg-grid-margin--4">',
    '    <div class="home_page_left_panel tg-grid-padding--4 tg-grid--6 tg-grid--midplus-12 tg--flex tg--flex-col tg--pad-8">',
    '         <div id="live_betting" class="live_betting tg__home_game_item"></div>',
    '         <div id="last_minute_bets" class="last_minute_bets tg__home_game_item tg--mar-b-16 tg--empty"></div>',
    '         <div id="home_day_of_multi_bets"></div>',
    '     </div>',
    '     <div class="home_page_right_panel tg-grid-padding--4 tg-grid--6 tg-grid--midplus-12 tg--flex tg--flex-col tg--pad-8">',
    '		<div class="displayFlex tg--shadow tg--mar-b-16 tg--empty" id="news_slider"></div>',
    '         <div id="ai_widget_container" class="data tg__home_game_item tg--mar-b-16"></div>',
    '         <div id="top_ten" class="data tg__home_game_item tg--mar-b-16"></div>',
    '         <div id="FavoriteStakesControl" class="FavoriteStakesControl tg__home_game_item tg--mar-b-16"></div>',
    '     </div>',
    ' </div>'
];

$P.StakeControl = Sport.CouponPanel.StakeControl;

$P.CopyLinkEnabled = true;
$P.FontUpperCase = true;


function appendExtendedMenuItems() {
    var menu = document.querySelector('.sportSubheadMenu');

    var a2 = createElement('a', {
        innerHTML: $culture.footer_sport_liveResults,
        className: "tg__submenu__item sub_res",
        href: 'javascript:void(0)',
        title: $culture.footer_sport_liveResults,
        onclick: function () {
            return Sport.Components.popup.open(Sport.Config.LiveScoreURL, popupParams)
        }
    });

    var a3 = createElement('a', {
        innerHTML: $culture.FOOTER_SPORT_STATISTICS,
        className: "tg__submenu__item sub_res",
        href: 'javascript:void(0)',
        title: $culture.FOOTER_SPORT_STATISTICS,
        onclick: function () {
            return Sport.Components.popup.open(Sport.Config.StatsURL, popupParams)
        }
    });

    // addToMenu(menu, [a1, a2, a3]);		
    menu.appendChild(a2);
    menu.appendChild(a3);
}

function addToMenu(menu, anchors) {
    anchors = anchors || [];
    anchors.forEach(function (anchor) {
        var item = createMenuItem(anchor);
        menu.appendChild(item);
    });
}

function createMenuItem(anchor) {
    var div = createElement('div');
    div.appendChild(anchor);
    return div;
}

function createElement(elName, options) {
    options = options || {};
    var el = document.createElement(elName);
    Object.keys(options).forEach(function (k) {
        el[k] = options[k];
    });
    return el;
}

initGoogleAnalytics('UA-124416471-11');