/*BetShah*/
var popupParams = {
    height: '800px',
    width: '1500px',
    top: '20px',
    position: 'absolute',
    transform: 'translate(-50%, 0)'
};

window.HomePageConfig = {
    bannerL: 1,
    liveBetting: 2,
    upcoming: 3,

    bannerR: 1,
    topMatches: 2,
    predictions: 3,

    upcomingCount: 3,
    liveBettingCount: 3,
    topMatchesCount: 15
};

$P.SportdigiBannerMainConfig = Object.assign(sportdigiBannerDefaultConfig, {
    oddsModeEnabled: false
});


$P.StakeControl = Sport.CouponPanel.StakeControl;

$P.IsShowLeftLiveMenuOdds = true;
$P.IsBetcheckerCashoutEnabled = true;
$P.CopyLinkEnabled = true;
