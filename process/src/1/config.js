//TotoGaming

window.HomePageConfig = {
	bannerL: 1,
	liveBetting: 2,
	upcoming: 3,
	multyBetDay: 4,

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
	'         <div id="live_betting" class="live_betting tg__home_game_item tg--mar-b-16"></div>',
	'         <div id="home_day_of_multi_bets"></div>',
	'     </div>',
	'     <div class="home_page_right_panel tg-grid-padding--4 tg-grid--6 tg-grid--midplus-12 tg--flex tg--flex-col tg--pad-8">',
	'		  <div id="ai_widget_container" class="data tg__home_game_item tg--mar-b-16"></div>',
	'         <div id="top_ten" class="data tg__home_game_item tg--mar-b-16"></div>',
	'         <div id="FavoriteStakesControl" class="FavoriteStakesControl tg__home_game_item tg--mar-b-16"></div>',
	'         <div id="last_minute_bets" class="last_minute_bets tg__home_game_item tg--mar-b-16 tg--empty"></div>',
	'     </div>',
	' </div>'
];

$P.SportdigiBannerMainConfig = Object.assign(sportdigiBannerDefaultConfig, {
	navigateToURL: function (item) {
		Sport.Components.popup.open(item.url, popupParams);
		scrollToTop(500);
	},
	paginationViewMode: 'digi_ico_minus',
	paginationDynamic: true	
});

$P.StakeControl = Sport.CouponPanel.StakeControl;

$P.IsShowLeftLiveMenuOdds = true;

$P.IsBetcheckerCashoutEnabled = true;
$P.NotificationEnabled = true;

$P.MaxButtonLogout = true;

$P.HideBookBetByDefault = true;
$P.HideBetCheckerByDefault = true;
$P.HideBetGeneratorByDefault = true;

function PrintWindow() {
	OpenPrintSettingsWindow();
}
