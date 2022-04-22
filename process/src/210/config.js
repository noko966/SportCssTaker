/*For ICE*/
$P.SportdigiBannerMainConfig = Object.assign(sportdigiBannerDefaultConfig, {
	autoplayDuration: 6000
});

$P.StakeControl = Sport.CouponPanel.StakeControl;

$P.CopyLinkEnabled = true;
$P.FontUpperCase = true;

$P.IsCalcInRightPanel = true;
$P.IsTournamentTableEnabled = true;

window.HomePageConfig = {
	bannerL: 1,
	liveBetting: 2,

	bannerR: 1,
	topMatches: 2,
	upcoming: 3,
	predictions: 4,

	liveBettingCount: 3,
	topMatchesCount: 10,
	upcomingCount: 10
};

$P.HomePageLayout = [
	'<div class="home_page_data_panel tg-grid tg-grid-margin--4">',
	'	<div class="home_page_left_panel tg-grid-padding--4 tg-grid--6 tg-grid--midplus-12 tg--flex tg--flex-col tg--pad-8">',
	'		<div id="live_betting" class="live_betting tg__home_game_item tg--mar-b-16"></div>',
	'	</div>',
	'	<div class="home_page_right_panel tg-grid-padding--4 tg-grid--6 tg-grid--midplus-12 tg--flex tg--flex-col tg--pad-8">',
	'		<div id="top_ten" class="data tg__home_game_item tg--mar-b-16"></div>',
	'       <div id="home_day_of_multi_bets"></div>',
	'		<div id="last_minute_bets" class="last_minute_bets tg__home_game_item tg--mar-b-16 tg--empty"></div>',
	'		<div id="FavoriteStakesControl" class="FavoriteStakesControl tg__home_game_item tg--mar-b-16s"></div>',
	'	</div>',
	'</div>'
];