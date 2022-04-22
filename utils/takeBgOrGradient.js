function attachPartnerStyle(id) {
    let partnerStyle = document.getElementById('partnerStyleCssLink');
    let href = `/Partners/${id}/Styles/web.css`;
    partnerStyle.setAttribute('href', href);
}

attachPartnerStyle(122);

function createBgOrGradient(el){
    let _el = el;
    if(!_el) {
        console.warn('no element selected');
        return
    }

    let _style = window.getComputedStyle(_el);
    let _gr = _style.getPropertyValue('background-image');
    let _bg = _style.getPropertyValue('background-color');
    let _isGradient = _gr !== 'none';
    if(_isGradient) {
        _bg = _gr.match(new RegExp(/rgba*\(.+?(?=\))/, 'ig'))[0] + ')';
    }
    else{
        _gr = _bg;
    }

    return {
        _bg,
        _gr
    }

}


