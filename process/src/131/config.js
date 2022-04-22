/*CepBahis*/
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

$P.HomePageLayout = [
	'<div class="home_page_data_panel tg-grid tg-grid-margin--4">',
	'    <div class="home_page_left_panel tg-grid-padding--4 tg-grid--6 tg-grid--midplus-12 tg--flex tg--flex-col tg--pad-8">',
	'            <div id="top_sportdigi_banner_block" class="tg--mar-b-16"></div>',
	'            <div id="live_betting" class="live_betting tg__home_game_item tg--mar-b-16"></div>',
	'            <div id="last_minute_bets" class="last_minute_bets tg__home_game_item tg--mar-b-16 tg--empty"></div>',
	'            <div id="home_day_of_multi_bets"></div>',
	'     </div>',
	'     <div class="home_page_right_panel tg-grid-padding--4 tg-grid--6 tg-grid--midplus-12 tg--flex tg--flex-col tg--pad-8">',
	'         <div id="news_slider" class="main_anonce_block displayFlex tg--shadow tg--mar-b-16 tg--empty"></div>',
	'		  <div id="ai_widget_container" class="data tg__home_game_item tg--mar-b-16"></div>',
	'         <div id="top_ten" class="data tg__home_game_item tg--mar-b-16"></div>',
	'         <div id="FavoriteStakesControl" class="FavoriteStakesControl tg__home_game_item tg--mar-b-16"></div>',
	'     </div>',
	' </div>'
];



$P.StakeControl = Sport.CouponPanel.StakeControl;

$P.CopyLinkEnabled = true;
