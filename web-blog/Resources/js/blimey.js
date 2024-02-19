(function (g) {

    var t = {
        PLATFORM_WINDOWS: 'windows',
        PLATFORM_IPHONE: 'iphone',
        PLATFORM_IPOD: 'ipod',
        PLATFORM_IPAD: 'ipad',
        PLATFORM_BLACKBERRY: 'blackberry',
        PLATFORM_BLACKBERRY_10: 'blackberry_10',
        PLATFORM_SYMBIAN: 'symbian_series60',
        PLATFORM_SYMBIAN_S40: 'symbian_series40',
        PLATFORM_J2ME_MIDP: 'j2me_midp',
        PLATFORM_ANDROID: 'android',
        PLATFORM_ANDROID_TABLET: 'android_tablet',
        PLATFORM_FIREFOX_OS: 'firefoxOS',
        PLATFORM_MOBILE_GENERIC: 'mobile_generic',

        userAgent: false, // Shortcut to the browser User Agent String.
        matchedPlatformName: false, // Matched platform name. False otherwise.
        matchedUserAgentName: false, // Matched UA String. False otherwise.

        init: function () {
            try {
                t.userAgent = g.navigator.userAgent.toLowerCase();
                t.getPlatformName();
                t.getMobileUserAgentName();
            } catch (e) {
                console.error(e);
            }
        },

        initForTest: function (userAgent) {
            t.matchedPlatformName = false;
            t.matchedUserAgentName = false;
            try {
                t.userAgent = userAgent.toLowerCase();
                t.getPlatformName();
                t.getMobileUserAgentName();
            } catch (e) {
                console.error(e);
            }
        },

        /**
         * This method detects the mobile User Agent name.
         */
        getMobileUserAgentName: function () {
            if (t.matchedUserAgentName !== false)
                return t.matchedUserAgentName;

            if (t.userAgent === false)
                return false;

            if (t.isChromeForIOS())
                t.matchedUserAgentName = 'chrome-for-ios';
            else if (t.isTwitterForIpad())
                t.matchedUserAgentName = 'twitter-for-ipad';
            else if (t.isTwitterForIphone())
                t.matchedUserAgentName = 'twitter-for-iphone';
            else if (t.isIPhoneOrIPod())
                t.matchedUserAgentName = 'iphone';
            else if (t.isIPad())
                t.matchedUserAgentName = 'ipad';
            else if (t.isAndroidTablet())
                t.matchedUserAgentName = 'android_tablet';
            else if (t.isAndroid())
                t.matchedUserAgentName = 'android';
            else if (t.isBlackberry10())
                t.matchedUserAgentName = 'blackberry_10';
            else if (has('blackberry'))
                t.matchedUserAgentName = 'blackberry';
            else if (t.isBlackberryTablet())
                t.matchedUserAgentName = 'blackberry_tablet';
            else if (t.isWindowsPhone7())
                t.matchedUserAgentName = 'win7';
            else if (t.isWindowsPhone8())
                t.matchedUserAgentName = 'winphone8';
            else if (t.isOperaMini())
                t.matchedUserAgentName = 'opera-mini';
            else if (t.isOperaMobile())
                t.matchedUserAgentName = 'opera-mobi';
            else if (t.isKindleFire())
                t.matchedUserAgentName = 'kindle-fire';
            else if (t.isSymbianPlatform())
                t.matchedUserAgentName = 'series60';
            else if (t.isFirefoxMobile())
                t.matchedUserAgentName = 'firefox_mobile';
            else if (t.isFirefoxOS())
                t.matchedUserAgentName = 'firefoxOS';
            else if (t.isFacebookForIphone())
                t.matchedUserAgentName = 'facebook-for-iphone';
            else if (t.isFacebookForIpad())
                t.matchedUserAgentName = 'facebook-for-ipad';
            else if (t.isWordPressForIos())
                t.matchedUserAgentName = 'ios-app';
            else if (has('iphone'))
                t.matchedUserAgentName = 'iphone-unknown';
            else if (has('ipad'))
                t.matchedUserAgentName = 'ipad-unknown';

            return t.matchedUserAgentName;
        },

        /**
         * This method detects the mobile platform name.
         */
        getPlatformName: function () {
            if (t.matchedPlatformName !== false)
                return t.matchedPlatformName;

            if (t.userAgent === false)
                return false;

            if (has('windows ce') || has('windows phone')) {
                t.matchedPlatformName = t.PLATFORM_WINDOWS;
            } else if (has('ipad')) {
                t.matchedPlatformName = t.PLATFORM_IPAD;
            } else if (has('ipod')) {
                t.matchedPlatformName = t.PLATFORM_IPOD;
            } else if (has('iphone')) {
                t.matchedPlatformName = t.PLATFORM_IPHONE;
            } else if (has('android')) {
                if (t.isAndroidTablet())
                    t.matchedPlatformName = t.PLATFORM_ANDROID_TABLET;
                else
                    t.matchedPlatformName = t.PLATFORM_ANDROID;
            } else if (t.isKindleFire()) {
                t.matchedPlatformName = t.PLATFORM_ANDROID_TABLET;
            } else if (t.isBlackberry10()) {
                t.matchedPlatformName = t.PLATFORM_BLACKBERRY_10;
            } else if (has('blackberry')) {
                t.matchedPlatformName = t.PLATFORM_BLACKBERRY;
            } else if (t.isBlackberryTablet()) {
                t.matchedPlatformName = t.PLATFORM_BLACKBERRY;
            } else if (t.isSymbianPlatform()) {
                t.matchedPlatformName = t.PLATFORM_SYMBIAN;
            } else if (t.isSymbianS40Platform()) {
                t.matchedPlatformName = t.PLATFORM_SYMBIAN_S40;
            } else if (t.isJ2MEPlatform()) {
                t.matchedPlatformName = t.PLATFORM_J2ME_MIDP;
            } else if (t.isFirefoxOS()) {
                t.matchedPlatformName = t.PLATFORM_FIREFOX_OS;
            } else if (t.isFirefoxMobile()) {
                t.matchedPlatformName = t.PLATFORM_MOBILE_GENERIC;
            }

            return t.matchedPlatformName;
        },


        /**
         * Detect the BlackBerry OS version.
         *
         * Note: This is for smartphones only. Does not work on BB tablets.
         */
        getBlackBerryOSVersion: check(function () {
            if (t.isBlackberry10())
                return '10';

            if (!has('blackberry'))
                return false;

            var rv = -1; // Return value assumes failure.
            var re;

            if (has('webkit')) { // Detecting the BB OS version for devices running OS 6.0 or higher
                re = /Version\/([\d\.]+)/i;
            } else {
                // BlackBerry devices <= 5.XX
                re = /BlackBerry\w+\/([\d\.]+)/i;
            }
            if (re.exec(t.userAgent) != null)
                rv = RegExp.$1.toString();

            return rv === -1 ? false : rv;
        }),

        /**
         * Detects if the current UA is iPhone Mobile Safari or another iPhone or iPod Touch Browser.
         */
        isIPhoneOrIPod: check(function () {
            return has('safari') && (has('iphone') || has('ipod'));
        }),

        /**
         * Detects if the current device is an iPad.
         */
        isIPad: check(function () {
            return has('ipad') && has('safari');
        }),


        /**
        *  Detects if the current UA is Chrome for iOS
        */
        isChromeForIOS: check(function () {
            return t.isIPhoneOrIPod() && has('crios/');
        }),

        /**
         * Detects if the current browser is the Native Android browser.
         */
        isAndroid: check(function () {
            if (has('android')) {
                return !(t.isOperaMini() || t.isOperaMobile() || t.isFirefoxMobile());
            }
        }),

        /**
         * Detects if the current browser is the Native Android Tablet browser.
         */
        isAndroidTablet: check(function () {
            if (has('android') && !has('mobile')) {
                return !(t.isOperaMini() || t.isOperaMobile() || t.isFirefoxMobile());
            }
        }),


        /**
         * Detects if the current browser is Opera Mobile
         */
        isOperaMobile: check(function () {
            return has('opera') && has('mobi');
        }),

        /**
         * Detects if the current browser is Opera Mini
         */
        isOperaMini: check(function () {
            return has('opera') && has('mini');
        }),


        /**
         * isBlackberry10() can be used to check the User Agent for a BlackBerry 10 device.
         */
        isBlackberry10: check(function () {
            return has('bb10') && has('mobile');
        }),

        /**
         * isBlackberryTablet() can be used to check the User Agent for a RIM blackberry tablet
         */
        isBlackberryTablet: check(function () {
            return has('playbook') && has('rim tablet');
        }),

        /**
         * Detects if the current browser is a Windows Phone 7 device.
         */
        isWindowsPhone7: check(function () {
            return has('windows phone os 7');
        }),

        /**
         * Detects if the current browser is a Windows Phone 8 device.
         */
        isWindowsPhone8: check(function () {
            return has('windows phone 8');
        }),

        /**
         * Detects if the device platform is J2ME.
         */
        isJ2MEPlatform: check(function () {
            return has('j2me/midp') || (has('midp') && has('cldc'));
        }),


        /**
         * Detects if the device platform is the Symbian Series 40.
         */
        isSymbianS40Platform: check(function () {
            if (has('series40')) {
                return has('nokia') || has('ovibrowser') || has('nokiabrowser');
            }
        }),


        /**
         * Detects if the device platform is the Symbian Series 60.
         */
        isSymbianPlatform: check(function () {
            if (has('webkit')) {
                // First, test for WebKit, then make sure it's either Symbian or S60.
                return has('symbian') || has('series60');
            } else if (has('symbianos') && has('series60')) {
                return true;
            } else if (has('nokia') && has('series60')) {
                return true;
            } else if (has('opera mini')) {
                return has('symbianos') || has('symbos') || has('series 60');
            }
        }),


        /**
         * Detects if the current browser is the Kindle Fire Native browser.
         */
        isKindleFire: check(function () {
            return has('silk/') && has('silk-accelerated=');
        }),

        /**
         * Detects if the current browser is Firefox Mobile (Fennec)
         */
        isFirefoxMobile: check(function () {
            return has('fennec');
        }),


        /**
         * Detects if the current browser is the native FirefoxOS browser
         */
        isFirefoxOS: check(function () {
            return has('mozilla') && has('mobile') && has('gecko') && has('firefox');
        }),


        /**
         * Detects if the current UA is Facebook for iPad
         */
        isFacebookForIpad: check(function () {
            if (!has('ipad'))
                return false;

            return has('facebook') || has('fbforiphone') || has('fban/fbios;');
        }),

        /**
         * Detects if the current UA is Facebook for iPhone
         */
        isFacebookForIphone: check(function () {
            if (!has('iphone'))
                return false;

            return (has('facebook') && !has('ipad')) ||
                (has('fbforiphone') && !has('tablet')) ||
                (has('fban/fbios;') && !has('tablet')); // FB app v5.0 or higher
        }),

        /**
         * Detects if the current UA is Twitter for iPhone
         */
        isTwitterForIphone: check(function () {
            if (has('ipad'))
                return false;

            return has('twitter for iphone');
        }),

        /**
         * Detects if the current UA is Twitter for iPad
         */
        isTwitterForIpad: check(function () {
            return has('twitter for ipad') || (has('ipad') && has('twitter for iphone'));
        }),


        /**
         * Detects if the current UA is WordPress for iOS
         */
        isWordPressForIos: check(function () {
            return has('wp-iphone');
        })
    };

    function has(str) {
        return t.userAgent.indexOf(str) != -1;
    }

    function check(fn) {
        return function () {
            return t.userAgent === false ? false : fn() || false;
        }
    }

    g.wpcom_mobile_user_agent_info = t;

})(typeof window !== 'undefined' ? window : this);
;
// listen for rlt authentication events and pass them to children of this document.
(function () {
    var currentToken;
    var parentOrigin;
    var iframeOrigins;
    var initializationListeners = [];
    var hasBeenInitialized = false;
    var RLT_KEY = 'jetpack:wpcomRLT';

    // IE11 compat version that doesn't require on `new URL( src )`
    function getOriginFromUrl(url) {
        var parser = document.createElement('a');
        parser.href = url;
        return parser.origin;
    }

    // run on `load` for suitable iframes, this injects the current token if available
    function rltIframeInjector(event) {
        if (!currentToken) {
            return;
        }
        rltInjectToken(currentToken, event.target.contentWindow, getOriginFromUrl(event.target.src));
    }

    // run on DOMContentLoaded or later
    function rltMonitorIframes() {
        // wait until suitable iframes are loaded before trying to inject the RLT
        var iframes = document.querySelectorAll("iframe");
        for (var i = 0; i < iframes.length; i++) {
            var iframe = iframes[i];
            if (rltShouldAuthorizeIframe(iframe)) {
                iframe.addEventListener('load', rltIframeInjector);
            }
        }

        // listen for newly-created iframes, since some are injected dynamically
        var observer = new MutationObserver(function (mutationsList, observer) {
            for (var i = 0; i < mutationsList.length; i++) {
                var mutation = mutationsList[i];
                if (mutation.type === 'childList') {
                    for (var j = 0; j < mutation.addedNodes.length; j++) {
                        var node = mutation.addedNodes[j];
                        if (node instanceof HTMLElement && node.nodeName === 'IFRAME' && rltShouldAuthorizeIframe(node)) {
                            node.addEventListener('load', rltIframeInjector);
                        }
                    }
                }
            }
        });

        observer.observe(document.body, { subtree: true, childList: true });
    }

    // should we inject RLT into this iframe?
    function rltShouldAuthorizeIframe(iframe) {
        if (!Array.isArray(iframeOrigins)) {
            return;
        }
        return iframeOrigins.indexOf(getOriginFromUrl(iframe.src)) >= 0;
    }

    function rltInvalidateWindowToken(token, target, origin) {
        if (target && typeof target.postMessage === 'function') {
            try {
                target.postMessage(JSON.stringify({
                    type: 'rltMessage',
                    data: {
                        event: 'invalidate',
                        token: token,
                        sourceOrigin: window.location.origin,
                    },
                }), origin);
            } catch (err) {
                return;
            }
        }
    }

    /**
     * PUBLIC METHODS
     */
    window.rltInvalidateToken = function (token, sourceOrigin) {
        // invalidate in current context
        if (token === currentToken) {
            currentToken = null;
        }

        // remove from localstorage, but only if in a top level window, not iframe
        try {
            if (window.location === window.parent.location && window.localStorage) {
                if (window.localStorage.getItem(RLT_KEY) === token) {
                    window.localStorage.removeItem(RLT_KEY);
                }
            }
        } catch (e) {
            console.info("localstorage access for invalidate denied - probably blocked third-party access", window.location.href);
        }

        // invalidate in iframes
        var iframes = document.querySelectorAll("iframe");
        for (var i = 0; i < iframes.length; i++) {
            var iframe = iframes[i];
            var iframeOrigin = getOriginFromUrl(iframe.src);
            if (iframeOrigin !== sourceOrigin && rltShouldAuthorizeIframe(iframe)) {
                rltInvalidateWindowToken(token, iframe.contentWindow, iframeOrigin);
            }
        }

        // invalidate in parent
        if (parentOrigin && parentOrigin !== sourceOrigin && window.parent) {
            rltInvalidateWindowToken(token, window.parent, parentOrigin);
        }
    }

    window.rltInjectToken = function (token, target, origin) {
        if (target && typeof target.postMessage === 'function') {
            try {
                target.postMessage(JSON.stringify({
                    type: 'loginMessage',
                    data: {
                        event: 'login',
                        success: true,
                        type: 'rlt',
                        token: token,
                        sourceOrigin: window.location.origin,
                    },
                }), origin);
            } catch (err) {
                return;
            }
        }
    };

    window.rltIsAuthenticated = function () {
        return !!currentToken;
    };

    window.rltGetToken = function () {
        return currentToken;
    };

    window.rltAddInitializationListener = function (listener) {
        // if RLT is already initialized, call the listener immediately
        if (hasBeenInitialized) {
            listener(currentToken);
        } else {
            initializationListeners.push(listener);
        }
    };

    // store the token in localStorage
    window.rltStoreToken = function (token) {
        currentToken = token;
        try {
            if (window.location === window.parent.location && window.localStorage) {
                window.localStorage.setItem(RLT_KEY, token);
            }
        } catch (e) {
            console.info("localstorage access denied - probably blocked third-party access", window.location.href);
        }
    }

    window.rltInitialize = function (config) {
        if (!config || typeof window.postMessage !== 'function') {
            return;
        }

        currentToken = config.token;
        iframeOrigins = config.iframeOrigins;
        parentOrigin = config.parentOrigin; // needed?

        // load token from localStorage if possible, but only in top level window
        try {
            if (!currentToken && window.location === window.parent.location && window.localStorage) {
                currentToken = window.localStorage.getItem(RLT_KEY);
            }
        } catch (e) {
            console.info("localstorage access denied - probably blocked third-party access", window.location.href);
        }

        // listen for RLT events from approved origins
        window.addEventListener('message', function (e) {
            var message = e && e.data;
            if (typeof message === 'string') {
                try {
                    message = JSON.parse(message);
                } catch (err) {
                    return;
                }
            }

            var type = message && message.type;
            var data = message && message.data;

            if (type !== 'loginMessage') {
                return;
            }

            if (data && data.type === 'rlt' && data.token !== currentToken) {

                // put into localStorage if running in top-level window (not iframe)
                rltStoreToken(data.token);

                // send to allowlisted iframes
                var iframes = document.querySelectorAll("iframe");
                for (var i = 0; i < iframes.length; i++) {
                    var iframe = iframes[i];
                    if (rltShouldAuthorizeIframe(iframe)) {
                        rltInjectToken(currentToken, iframe.contentWindow, getOriginFromUrl(iframe.src));
                    }
                }

                // send to the parent, unless the event was sent _by_ the parent
                if (parentOrigin && parentOrigin !== data.sourceOrigin && window.parent) {
                    rltInjectToken(currentToken, window.parent, parentOrigin);
                }
            }
        });

        // listen for RLT events from approved origins
        window.addEventListener('message', function (e) {
            var message = e && e.data;
            if (typeof message === 'string') {
                try {
                    message = JSON.parse(message);
                } catch (err) {
                    return;
                }
            }

            var type = message && message.type;
            var data = message && message.data;

            if (type !== 'rltMessage') {
                return;
            }

            if (data && data.event === 'invalidate' && data.token === currentToken) {
                rltInvalidateToken(data.token);
            }
        });

        if (iframeOrigins) {
            if (document.readyState !== 'loading') {
                rltMonitorIframes();
            } else {
                window.addEventListener('DOMContentLoaded', rltMonitorIframes);
            }
        }

        initializationListeners.forEach(function (listener) {
            listener(currentToken);
        });

        initializationListeners = [];

        hasBeenInitialized = true;
    };
})();
;
(() => { var e = { 951: (e, t, n) => { t.formatArgs = function (t) { if (t[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors) return; const n = "color: " + this.color; t.splice(1, 0, n, "color: inherit"); let r = 0, o = 0; t[0].replace(/%[a-zA-Z%]/g, (e => { "%%" !== e && (r++, "%c" === e && (o = r)) })), t.splice(o, 0, n) }, t.save = function (e) { try { e ? t.storage.setItem("debug", e) : t.storage.removeItem("debug") } catch (e) { } }, t.load = function () { let e; try { e = t.storage.getItem("debug") } catch (e) { } !e && "undefined" != typeof process && "env" in process && (e = process.env.DEBUG); return e }, t.useColors = function () { if ("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return !0; if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1; return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/) }, t.storage = function () { try { return localStorage } catch (e) { } }(), t.destroy = (() => { let e = !1; return () => { e || (e = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")) } })(), t.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], t.log = console.debug || console.log || (() => { }), e.exports = n(1741)(t); const { formatters: r } = e.exports; r.j = function (e) { try { return JSON.stringify(e) } catch (e) { return "[UnexpectedJSONParseError]: " + e.message } } }, 1741: (e, t, n) => { e.exports = function (e) { function t(e) { let n, o, s, a = null; function i(...e) { if (!i.enabled) return; const r = i, o = Number(new Date), s = o - (n || o); r.diff = s, r.prev = n, r.curr = o, n = o, e[0] = t.coerce(e[0]), "string" != typeof e[0] && e.unshift("%O"); let a = 0; e[0] = e[0].replace(/%([a-zA-Z%])/g, ((n, o) => { if ("%%" === n) return "%"; a++; const s = t.formatters[o]; if ("function" == typeof s) { const t = e[a]; n = s.call(r, t), e.splice(a, 1), a-- } return n })), t.formatArgs.call(r, e); (r.log || t.log).apply(r, e) } return i.namespace = e, i.useColors = t.useColors(), i.color = t.selectColor(e), i.extend = r, i.destroy = t.destroy, Object.defineProperty(i, "enabled", { enumerable: !0, configurable: !1, get: () => null !== a ? a : (o !== t.namespaces && (o = t.namespaces, s = t.enabled(e)), s), set: e => { a = e } }), "function" == typeof t.init && t.init(i), i } function r(e, n) { const r = t(this.namespace + (void 0 === n ? ":" : n) + e); return r.log = this.log, r } function o(e) { return e.toString().substring(2, e.toString().length - 2).replace(/\.\*\?$/, "*") } return t.debug = t, t.default = t, t.coerce = function (e) { if (e instanceof Error) return e.stack || e.message; return e }, t.disable = function () { const e = [...t.names.map(o), ...t.skips.map(o).map((e => "-" + e))].join(","); return t.enable(""), e }, t.enable = function (e) { let n; t.save(e), t.namespaces = e, t.names = [], t.skips = []; const r = ("string" == typeof e ? e : "").split(/[\s,]+/), o = r.length; for (n = 0; n < o; n++)r[n] && ("-" === (e = r[n].replace(/\*/g, ".*?"))[0] ? t.skips.push(new RegExp("^" + e.slice(1) + "$")) : t.names.push(new RegExp("^" + e + "$"))) }, t.enabled = function (e) { if ("*" === e[e.length - 1]) return !0; let n, r; for (n = 0, r = t.skips.length; n < r; n++)if (t.skips[n].test(e)) return !1; for (n = 0, r = t.names.length; n < r; n++)if (t.names[n].test(e)) return !0; return !1 }, t.humanize = n(3171), t.destroy = function () { console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.") }, Object.keys(e).forEach((n => { t[n] = e[n] })), t.names = [], t.skips = [], t.formatters = {}, t.selectColor = function (e) { let n = 0; for (let t = 0; t < e.length; t++)n = (n << 5) - n + e.charCodeAt(t), n |= 0; return t.colors[Math.abs(n) % t.colors.length] }, t.enable(t.load()), t } }, 3171: e => { var t = 1e3, n = 60 * t, r = 60 * n, o = 24 * r, s = 7 * o, a = 365.25 * o; function i(e, t, n, r) { var o = t >= 1.5 * n; return Math.round(e / n) + " " + r + (o ? "s" : "") } e.exports = function (e, c) { c = c || {}; var d = typeof e; if ("string" === d && e.length > 0) return function (e) { if ((e = String(e)).length > 100) return; var i = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e); if (!i) return; var c = parseFloat(i[1]); switch ((i[2] || "ms").toLowerCase()) { case "years": case "year": case "yrs": case "yr": case "y": return c * a; case "weeks": case "week": case "w": return c * s; case "days": case "day": case "d": return c * o; case "hours": case "hour": case "hrs": case "hr": case "h": return c * r; case "minutes": case "minute": case "mins": case "min": case "m": return c * n; case "seconds": case "second": case "secs": case "sec": case "s": return c * t; case "milliseconds": case "millisecond": case "msecs": case "msec": case "ms": return c; default: return } }(e); if ("number" === d && isFinite(e)) return c.long ? function (e) { var s = Math.abs(e); if (s >= o) return i(e, s, o, "day"); if (s >= r) return i(e, s, r, "hour"); if (s >= n) return i(e, s, n, "minute"); if (s >= t) return i(e, s, t, "second"); return e + " ms" }(e) : function (e) { var s = Math.abs(e); if (s >= o) return Math.round(e / o) + "d"; if (s >= r) return Math.round(e / r) + "h"; if (s >= n) return Math.round(e / n) + "m"; if (s >= t) return Math.round(e / t) + "s"; return e + "ms" }(e); throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e)) } }, 6998: (e, t, n) => { "use strict"; n.d(t, { Z: () => i }); var r = n(951), o = n.n(r), s = n(5368); const a = o()("videopress:get-media-token"); const i = async function (e, t = {}) { const { id: n = 0, guid: r = 0, flushToken: o } = t, i = `vpc-${e}-${n}-${r}`, c = window?.videopressAjax?.context || "main"; let d; const u = localStorage.getItem(i); if (o) a("(%s) Flushing %o token", c, i), localStorage.removeItem(i); else try { if (u) { if (d = await JSON.parse(u), d && d.expire > Date.now()) return a("(%s) Providing %o token from the store", c, i), d.data; a("(%s) Token %o expired. Clean.", c, i), localStorage.removeItem(i) } } catch (e) { a("Invalid token in the localStore") } const l = await function (e, t = {}) { const { id: n = 0, guid: r, subscriptionPlanId: o = 0, adminAjaxAPI: a, filename: i } = t; return new Promise((function (t, c) { const d = a || window.videopressAjax?.ajaxUrl || window?.ajaxurl || "/wp-admin/admin-ajax.php"; if (!s.M.includes(e)) return c("Invalid scope"); const u = { action: "videopress-get-playback-jwt" }; switch (e) { case "upload": u.action = "videopress-get-upload-token", i && (u.filename = i); break; case "upload-jwt": u.action = "videopress-get-upload-jwt"; break; case "playback": u.action = "videopress-get-playback-jwt", u.guid = r, u.post_id = String(n), u.subscription_plan_id = o }fetch(d, { method: "POST", credentials: "same-origin", body: new URLSearchParams(u) }).then((e => { if (!e.ok) throw new Error("Network response was not ok"); return e.json() })).then((n => { if (!n.success) throw new Error("Token is not achievable"); switch (e) { case "upload": case "upload-jwt": t({ token: n.data.upload_token, blogId: n.data.upload_blog_id, url: n.data.upload_action_url }); break; case "playback": t({ token: n.data.jwt }) } })).catch((() => { console.warn("Token is not achievable"), t({ token: null }) })) })) }(e, t); return "playback" === e && l?.token && (a("(%s) Storing %o token", c, i), localStorage.setItem(i, JSON.stringify({ data: l, expire: Date.now() + 864e5 }))), a("(%s) Providing %o token from request/response", c, i), l } }, 5368: (e, t, n) => { "use strict"; n.d(t, { M: () => r }); const r = ["upload", "playback", "upload-jwt"] } }, t = {}; function n(r) { var o = t[r]; if (void 0 !== o) return o.exports; var s = t[r] = { exports: {} }; return e[r](s, s.exports, n), s.exports } n.n = e => { var t = e && e.__esModule ? () => e.default : () => e; return n.d(t, { a: t }), t }, n.d = (e, t) => { for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] }) }, n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), (() => { "use strict"; var e = n(951), t = n.n(e), r = n(6998); const o = t()("videopress:token-bridge"), { videopressAjax: s } = window; async function a(e) { if (await new Promise((function (e) { if ("loading" !== document.readyState) return e(); document.addEventListener("DOMContentLoaded", (function () { e() })) })), !window.__guidsToPlanIds) return 0; return window.__guidsToPlanIds[e] || 0 } async function i(e) { if ("videopress_token_request" !== e.data?.event) return; if (!s) return void o("(%s) videopressAjax is not accesible"); const { context: t = "main" } = s, { guid: n, requestId: i, isRetry: c } = e.data; if (!n || !i) return void o("(%s) Invalid request", t); const d = window?.videopressAjax.post_id || 0, u = await a(n); if (-1 === ["https://videopress.com", "https://video.wordpress.com"].indexOf(e.origin)) return void o("(%s) Invalid origin", t); const { source: l } = e; if (l instanceof MessagePort || "undefined" != typeof ServiceWorker && l instanceof ServiceWorker) return void o("(%s) Invalid source", t); o("(%s) Token request accepted: %o | %o | %o", t, n, d, i), o("(%s) Send acknowledge receipt requested", t), l.postMessage({ event: "videopress_token_request_ack", guid: n, requestId: i }, { targetOrigin: "*" }), c && o("(%s) client retrying request. Flush the token.", t); const p = await (0, r.Z)("playback", { id: Number(d), guid: n, subscriptionPlanId: u, adminAjaxAPI: s.ajaxUrl, flushToken: c }); if (!p?.token) return o("(%s) Error getting token", t), void l.postMessage({ event: "videopress_token_error", guid: e.data.guid, requestId: i }, { targetOrigin: "*" }); o("(%s) sending token", t), l.postMessage({ event: "videopress_token_received", guid: n, jwt: p.token, requestId: i }, { targetOrigin: "*" }) } s ? (o("(%s) ðŸ‘‚ Listen token requester", s?.context || "main"), window.addEventListener("message", i)) : o("(%s) videopressAjax is not accesible") })() })();;