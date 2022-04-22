/*Betsitem*/
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

var popupParams = {
    height: '800px',
    width: '1500px',
    top: '20px',
    position: 'absolute',
    transform: 'translate(-50%, 0)'
};

$P.SportdigiBannerMainConfig = Object.assign(sportdigiBannerDefaultConfig, {
	autoplayDuration: 5000,
	paginationViewMode: 'digi_ico_minus'
});

$P.StakeControl = Sport.CouponPanel.StakeControl;

$P.BetCheckerTypesDisabled = true;
$P.CopyLinkEnabled = true;
$P.BonuseCancelButtonDisabled = true;