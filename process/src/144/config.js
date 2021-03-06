/*GrandBet*/
$P.StakeControl = Sport.CouponPanel.StakeControl;

$P.CopyLinkEnabled = true;


function appendExtendedMenuItems() {
    var featuresString = "location,width=700,height=550";
    var menu = document.querySelector('.sportSubheadMenu');

    var a1 = createElement('a', {
        innerHTML: $culture.footer_sport_liveResults,
        className: "tg__submenu__item sub_res",
        href: 'javascript:void(0)',
        title: $culture.footer_sport_liveResults,
        onclick: function () {
            openWindow(Sport.Config.LiveScoreURL, null, featuresString);
        }
    });

    var a2 = createElement('a', {
        innerHTML: $culture.FOOTER_SPORT_STATISTICS,
        className: "tg__submenu__item sub_res",
        href: 'javascript:void(0)',
        title: $culture.FOOTER_SPORT_STATISTICS,
        onclick: function () {
            openWindow(Sport.Config.StatsURL, null, featuresString);
        }
    });

    // addToMenu(menu, [a1, a2]);
    menu.appendChild(a1);
    menu.appendChild(a2);
}

function openWindow(url, windowName, windowFeatures) {
    window.open.apply(window, arguments);
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

