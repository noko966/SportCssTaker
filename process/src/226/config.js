$P.HomePageLayout = [
	'<div id="top_sportdigi_banner_block" class="top_banner_block tg--pad-4 tg--mar-b-16"></div>',
	'<div class="home_page_data_panel tg-grid tg-grid-margin--4">',
	'	<div id="tiny_banner_wrapper" class="component_top_banner_tiny"></div>',
	'   <div class="home_page_left_panel tg-grid-padding--4 tg-grid--6 tg-grid--midplus-12 tg--flex tg--flex-col tg--pad-8">',
	'       <div id="main_anonce_block" class="main_anonce_block tg--empty"></div>',
	'       <div id="live_betting" class="live_betting tg__home_game_item tg--mar-b-16"></div>',
	'       <div id="last_minute_bets" class="last_minute_bets tg__home_game_item tg--mar-b-16 tg--empty"></div>',
	'       <div id="home_day_of_multi_bets"></div>',
	'   </div>',
	'   <div class="home_page_right_panel tg-grid-padding--4 tg-grid--6 tg-grid--midplus-12 tg--flex tg--flex-col tg--pad-8">',
	'       <div class="displayFlex tg--shadow tg--mar-b-16 tg--empty" id="news_slider"></div>',
	'		<div id="ai_widget_container" class="data tg__home_game_item tg--mar-b-16"></div>',
	'       <div id="top_ten" class="data tg__home_game_item tg--mar-b-16"></div>',
	'       <div id="FavoriteStakesControl" class="FavoriteStakesControl tg__home_game_item tg--mar-b-16"></div>',
	'   </div>',
	'</div>'
];

$P.SportdigiBannerMainConfig = Object.assign(sportdigiBannerDefaultConfig, {
	eventCountdownEnabled: true,
	viewMode: 'blurred',
	// TO DO
	// showTime: true,
	showDescriptionAndOdds: true
});


$P.StakeControl = Sport.CouponPanel.StakeControl;
$P.EnableLiveBannerWidget = false;
$P.EnabledTopMatchesWidget = false;
$P.CopyLinkEnabled = true;
$P.FontUpperCase = true;
