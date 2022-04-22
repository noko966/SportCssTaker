/*wHITElABEL*/
window.HomePageConfig = {
    bannerL: 1,
    liveBetting: 2,
    upcoming: 3,

    bannerR: 1,
    topMatches: 2,
    predictions: 3,

    upcomingCount: 3,
    liveBettingCount: 3,
    topMatchesCount: 30
};

$P.SportdigiBannerMainConfig = Object.assign(sportdigiBannerDefaultConfig, {
	autoplayDuration: 6000,
	paginationViewMode: 'small_bullet'
});


$P.StakeControl = Sport.CouponPanel.StakeControl;

$P.BetCheckerTypesDisabled = true;
$P.CopyLinkEnabled = true;
