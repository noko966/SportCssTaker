/* UBet */
$P.StakeControl = Sport.CouponPanel.StakeControl;

$P.HomePageLayout = [
    '<div class="home_page_data_panel tg-grid tg-grid-margin--4">',
    '	<div class="home_page_left_panel tg-grid-padding--4 tg-grid--6 tg-grid--midplus-12 tg--flex tg--flex-col tg--pad-8">',
    '		<div id="live_betting" class="live_betting tg__home_game_item tg--mar-b-16"></div>',
    '		<div id="last_minute_bets" class="last_minute_bets tg__home_game_item tg--mar-b-16 tg--empty"></div>',
    '       <div id="home_day_of_multi_bets"></div>',
    '	</div>',
    '	<div class="home_page_right_panel tg-grid-padding--4 tg-grid--6 tg-grid--midplus-12 tg--flex tg--flex-col tg--pad-8">',
    '       <div id="ai_widget_container" class="data tg__home_game_item tg--mar-b-16"></div>',
    '		<div id="top_ten" class="data tg__home_game_item tg--mar-b-16"></div>',
    '		<div id="FavoriteStakesControl" class="FavoriteStakesControl tg__home_game_item tg--mar-b-16s"></div>',
    '	</div>',
    '</div>'
];

function appendExtendedMenuItems() {
    var menu = document.querySelector('.sportSubheadMenu');

    var a1 = createElement('a', {
        innerHTML: $culture.footer_sport_liveResults,
        className: "tg__submenu__item sub_res",
        href: 'javascript:void(0)',
        title: $culture.footer_sport_liveResults,
        onclick: function () {
            Sport.Components.popup.open(Sport.Config.LiveScoreURL, popupParams);
        }
    });

    var a2 = createElement('a', {
        innerHTML: $culture.FOOTER_SPORT_STATISTICS,
        className: "tg__submenu__item sub_res",
        href: 'javascript:void(0)',
        title: $culture.FOOTER_SPORT_STATISTICS,
        onclick: function () {
            Sport.Components.popup.open(Sport.Config.StatsURL, popupParams);
        }
    });

    menu.appendChild(a1);
    menu.appendChild(a2);
}

function createElement(elName, options) {
    options = options || {};
    var el = document.createElement(elName);
    Object.keys(options).forEach(function (k) {
        el[k] = options[k];
    });
    return el;
}

$P.CopyLinkEnabled = true;
$P.FontUpperCase = true;
