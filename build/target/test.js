'use strict';
function _defineProperty(o, n, e) {
  return (
    n in o
      ? Object.defineProperty(o, n, {
          value: e,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (o[n] = e),
    o
  );
}
(window.addLoadEvent = function() {
  var o =
      0 < arguments.length && void 0 !== arguments[0]
        ? arguments[0]
        : function() {},
    n = window.onload;
  'function' != typeof window.onload
    ? (window.onload = o)
    : (window.onload = function() {
        n(), o();
      });
}),
  (function(window) {
    var _window$locale,
      browser = {
        versions:
          ((f = navigator.userAgent),
          (g = -1 < f.indexOf('Android') || -1 < f.indexOf('Adr')),
          (h = /(?:Firefox)/.test(f)),
          {
            trident: -1 < f.indexOf('Trident'),
            presto: -1 < f.indexOf('Presto'),
            webKit: -1 < f.indexOf('AppleWebKit'),
            gecko: -1 < f.indexOf('Gecko') && -1 == f.indexOf('KHTML'),
            mobile: !!f.match(/AppleWebKit.*Mobile.*/),
            ios: !!f.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: g,
            iPhone: -1 < f.indexOf('iPhone'),
            iPad: -1 < f.indexOf('iPad'),
            webApp: -1 == f.indexOf('Safari'),
            weixin: -1 < f.indexOf('MicroMessenger'),
            qq: ' qq' == f.match(/\sQQ/i),
            tablet:
              /(?:iPad|PlayBook)/.test(f) ||
              (g && !/(?:Mobile)/.test(f)) ||
              (h && /(?:Tablet)/.test(f)),
          }),
        language: (
          navigator.browserLanguage || navigator.language
        ).toLowerCase(),
      },
      f,
      g,
      h,
      targetUrl,
      _targetUrl;
    function createIframe(o, n) {
      var e =
          2 < arguments.length && void 0 !== arguments[2]
            ? arguments[2]
            : function() {},
        t = document.createElement('iframe');
      try {
        (t.id = o),
          (t.width = '10'),
          (t.height = '10'),
          (t.style.display = 'none'),
          (t.src = n),
          t.attachEvent
            ? t.attachEvent('onload', function() {
                e();
              })
            : (t.onload = function() {
                e();
              }),
          document.body.appendChild(t);
      } catch (o) {
        console.log(o);
      }
      return t;
    }
    browser.versions.mobile || browser.versions.android || browser.versions.ios
      ? ((targetUrl = window.location.origin + '/vod/download/index.html'),
        window.location.href.includes(targetUrl) ||
          (window.location.href =
            window.location.origin + '/vod/download/index.html'))
      : (window.MessageEvent &&
          !document.getBoxObjectFor &&
          -1 < navigator.userAgent.indexOf('WebKit')) ||
        ((_targetUrl = window.location.origin + '/vod/chrome/index.html'),
        window.location.href.includes(_targetUrl) ||
          (window.location.href = _targetUrl)),
      (window.Cookies = {}),
      (window.Cookies.set = function(o, n, e) {
        var t = new Date();
        t.setDate(t.getDate() + e),
          (document.cookie =
            o +
            '=' +
            escape(n) +
            (null == e ? '' : ';expires=' + t.toGMTString()));
      }),
      (window.Cookies.get = function(o) {
        var n,
          e = new RegExp('(^| )' + o + '=([^;]*)(;|$)');
        return (n = document.cookie.match(e)) ? n[2] : null;
      }),
      (window.vod = {}),
      (window.vod.getParameterByName = function(o) {
        o = o.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        var n = new RegExp('[\\?&]' + o + '=([^&#]*)').exec(location.search);
        return null == n ? '' : decodeURIComponent(n[1]);
      }),
      (window.vod.changeURLPar = function(uri, par, par_value) {
        var pattern = par + '=([^&]*)',
          replaceText = par + '=' + par_value;
        if (uri.match(pattern)) {
          var tmp = '/\\' + par + '=[^&]*/',
            tmp = uri.replace(eval(tmp), replaceText);
          return tmp;
        }
        return uri.match('[?]')
          ? uri + '&' + replaceText
          : uri + '?' + replaceText;
      }),
      (window.vod.noPassByName = function(o) {
        return null == o || void 0 === o
          ? ''
          : o.length <= 3
          ? '*' + o.substring(1, o.length)
          : 3 < o.length && o.length <= 6
          ? '**' + o.substring(2, o.length)
          : 6 < o.length
          ? o.substring(0, 2) + '****' + o.substring(6, o.length)
          : void 0;
      }),
      (window.LANGUAGE_KEY = { ar: 'ar', en: 'en-US', cn: 'zh-CN' }),
      (window.LANGUAGE_BY_ENV = {
        preproduction: window.LANGUAGE_KEY.en,
        product: window.LANGUAGE_KEY.ar,
      }),
      (window.getLanguageCookies = function() {
        return (
          window.vod.getParameterByName('lang') || window.Cookies.get('locale')
        );
      }),
      (window.setLanguageCookies = function(o) {
        o &&
          (window.Cookies.set('locale', o),
          window.Cookies.set('language', o),
          window.Cookies.set('lang', o));
      }),
      (window.currentLanguage =
        window.getLanguageCookies() ||
        window.LANGUAGE_BY_ENV[window.SDP_ENV] ||
        navigator.language ||
        navigator.userLanguage),
      (window.isRtl = function(o) {
        try {
          var n;
          return (
            -1 !==
              (null == window
                ? void 0
                : window.currentLanguage.indexOf('ar')) ||
            'rtl' ===
              window.getComputedStyle(document.querySelector('html'))
                .direction ||
            'rtl' ===
              window.getComputedStyle(document.querySelector('body'))
                .direction ||
            (!!o &&
              'rtl' ===
                (null ===
                  (n = window.getComputedStyle(document.querySelector(o))) ||
                void 0 === n
                  ? void 0
                  : n.direction))
          );
        } catch (o) {
          return !1;
        }
      }),
      (window.locale =
        ((_window$locale = {}),
        _defineProperty(_window$locale, window.LANGUAGE_KEY.ar, {
          languageName: 'عربى',
          documentTitle: 'Video Online Education of Egyptian MOE',
          search: 'البحث عن دورات تدريبية',
          signout: 'تسجيل الخروج',
          account: 'الحساب الخاص بي',
          accountUrl: ''.concat(
            window.location.origin,
            '/vod/myaccount.html?nav=study',
          ),
          copyright:
            'All rights reserved Fujian Elernity Education Technology Co., Ltd.',
          headNav: [
            {
              name: 'الدورات التدريبية',
              className: 'courses',
              url: ''
                .concat(window.location.origin, '/home?lang=')
                .concat(window.currentLanguage),
            },
            {
              name: 'الجدول الزمني',
              className: 'schedule',
              url: ''.concat(window.location.origin, '/vod/schedule.html'),
            },
          ],
        }),
        _defineProperty(_window$locale, window.LANGUAGE_KEY.en, {
          languageName: 'English',
          documentTitle: 'Video Online Education of Egyptian MOE',
          search: 'Search for Courses',
          signout: 'Sign Out',
          account: 'My Account',
          accountUrl: ''.concat(
            window.location.origin,
            '/vod/myaccount.html?nav=study',
          ),
          copyright:
            'All rights reserved Fujian Elernity Education Technology Co., Ltd.',
          headNav: [
            {
              name: 'Courses',
              className: 'courses',
              url: ''
                .concat(window.location.origin, '/home?lang=')
                .concat(window.currentLanguage),
            },
            {
              name: 'Schedule',
              className: 'schedule',
              url: ''.concat(window.location.origin, '/vod/schedule.html'),
            },
          ],
        }),
        _defineProperty(_window$locale, window.LANGUAGE_KEY.cn, {
          languageName: '简体中文',
          documentTitle: 'Video Online Education of Egyptian MOE',
          search: '搜索课程',
          signout: '退出登录',
          account: '我的账号',
          accountUrl: ''.concat(
            window.location.origin,
            '/vod/myaccount.html?nav=study',
          ),
          copyright:
            'All rights reserved Fujian Elernity Education Technology Co., Ltd.',
          headNav: [
            {
              name: '课程',
              className: 'courses',
              url: ''
                .concat(window.location.origin, '/home?lang=')
                .concat(window.currentLanguage),
            },
            {
              name: '时间表',
              className: 'schedule',
              url: ''.concat(window.location.origin, '/vod/schedule.html'),
            },
          ],
        }),
        _window$locale)),
      (window.edmodoLogout = function() {
        var o =
            0 < arguments.length && void 0 !== arguments[0]
              ? arguments[0]
              : function() {},
          n = document.querySelector('#edmodo-logout-iframe'),
          e = 'https://api.edmodo.com/logout.json?request_origin=react-web-app&_t='.concat(
            new Date().getTime(),
          );
        n
          ? (n.setAttribute('src', e),
            n.attachEvent
              ? n.attachEvent('onload', function() {
                  o();
                })
              : (n.onload = function() {
                  o();
                }))
          : createIframe('edmodo-logout-iframe', e, o);
      }),
      (window.homeUrl =
        window.homeUrl || window.location.origin + '/vod/home.html'),
      window.LOCAL_ENV
        ? (window._logoutUrl = window.homeUrl)
        : window.Host &&
          (window._logoutUrl = ''
            .concat(window.Host, 'home/account/ssoLogout?returnurl=')
            .concat(encodeURIComponent(window.homeUrl))),
      (window.listenAutoLogout = function() {
        var e = window.__DEFAULT_MAX_AUTO_LOGOUT_TIME__ || 1800,
          o = window.__DEFAULT_RESET_AUTO_LOGOUT_EVENT_NAME__ || [
            'click',
            'keydown',
            'mousemove',
            'mousewheel',
          ],
          t = {
            second: 0,
            timer: null,
            callback: function() {
              var o, n;
              (t.second += 1),
                t.second < e ||
                  ((o = window.ucVod),
                  (n = window.edmodoLogout),
                  o &&
                    'function' == typeof n &&
                    'function' == typeof o.logout &&
                    (n(function() {
                      window.localStorage.setItem('isLogout', !1);
                    }),
                    o
                      .logout()
                      .then(function() {
                        window.location.href = window._logoutUrl;
                      })
                      .catch(function(o) {
                        console.log(o);
                      })
                      .finally(function() {
                        t.timer && clearInterval(t.timer);
                      })));
            },
            init: function() {
              t.timer && clearInterval(t.timer),
                (t.second = 0),
                (t.timer = setInterval(t.callback, 1e3));
            },
            start: function() {
              t.init(),
                window.addEventListener('load', function() {
                  var n = document.querySelector('body');
                  o.forEach(function(o) {
                    n.addEventListener(o, t.init);
                  });
                });
            },
          };
        return { start: t.start };
      }),
      browser.versions.android ||
        browser.versions.ios ||
        browser.versions.tablet ||
        window.listenAutoLogout().start(),
      window.addEventListener('load', function() {
        try {
          JSON.parse(window.localStorage.getItem('isLogout')) &&
            null != window &&
            window.edmodoLogout(function() {
              window.localStorage.setItem('isLogout', !1);
            });
        } catch (o) {
          console.log(o);
        }
      });
  })(window);
