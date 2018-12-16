function jsonp({url, callbackName, callback}) {
    const script = document.createElement('script');
    script.src = url;
    window[callbackName] = callback;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
}

export default jsonp;