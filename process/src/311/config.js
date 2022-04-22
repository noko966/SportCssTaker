//Tinbet
window.HomePageConfig = {
	bannerL: 1,
	liveBetting: 2,
	upcoming: 3,

	bannerR: 1,
	topMatches: 2,
	predictions: 3,

	upcomingCount: 5,
	liveBettingCount: 5,
	topMatchesCount: 5
};

$P.SportdigiBannerMainConfig = Object.assign(sportdigiBannerDefaultConfig, {
    oddsModeEnabled: false,
    paginationViewMode: 'digi_ico_minus'
});

$P.MobileBanner = Sport.CommonControls.SlidingBanner;
$P.StakeControl = Sport.CouponPanel.StakeControl2;

$P.CopyLinkEnabled = true;
$P.BetCheckerDefaultOther = true;