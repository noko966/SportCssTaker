/* Champs77 */

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


$P.SportdigiBannerMainConfig = Object.assign(sportdigiBannerDefaultConfig, {
    autoplayDuration: 6000
});


$P.StakeControl = Sport.CouponPanel.StakeControl;

$P.CopyLinkEnabled = true;