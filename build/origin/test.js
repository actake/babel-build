// onLoad 事件
window.addLoadEvent = (func = () => {}) => {
  const oldOnload = window.onload;
  if (typeof window.onload !== 'function') {
    window.onload = func;
  } else {
    window.onload = () => {
      oldOnload();
      func();
    };
  }
};

// global initial
(function(window) {
  'use strict';
  const browser = {
    versions: (function() {
      const u = navigator.userAgent;
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
      const isFirefox = /(?:Firefox)/.test(u);
      return {
        trident: u.indexOf('Trident') > -1, // IE内核
        presto: u.indexOf('Presto') > -1, // opera内核
        webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: isAndroid, // android终端
        iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, // 是否iPad
        webApp: u.indexOf('Safari') == -1, // 是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == ' qq', // 是否QQ
        tablet:
          /(?:iPad|PlayBook)/.test(u) ||
          (isAndroid && !/(?:Mobile)/.test(u)) ||
          (isFirefox && /(?:Tablet)/.test(u)),
      };
    })(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
  };

  if (
    browser.versions.mobile ||
    browser.versions.android ||
    browser.versions.ios
  ) {
    const targetUrl = window.location.origin + '/vod/download/index.html';
    if (!window.location.href.includes(targetUrl)) {
      window.location.href =
        window.location.origin + '/vod/download/index.html';
    }
  } else if (
    window.MessageEvent &&
    !document.getBoxObjectFor &&
    navigator.userAgent.indexOf('WebKit') > -1
  ) {
  } else {
    const targetUrl = window.location.origin + '/vod/chrome/index.html';
    if (!window.location.href.includes(targetUrl)) {
      window.location.href = targetUrl;
    }
  }

  window.Cookies = {};
  // 写cookies
  window.Cookies.set = function(c_name, value, expiredays) {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie =
      c_name +
      '=' +
      escape(value) +
      (expiredays == null ? '' : ';expires=' + exdate.toGMTString());
  };

  // 读取cookies
  window.Cookies.get = function(name) {
    /* eslint-disable-next-line */
    let arr,
      reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    /* eslint-disable-next-line */
    if ((arr = document.cookie.match(reg))) return arr[2];
    else {
      return null;
    }
  };
  window.vod = {};
  // 获取url参数
  window.vod.getParameterByName = function(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
      results = regex.exec(location.search);
    return results == null ? '' : decodeURIComponent(results[1]);
  };
  window.vod.changeURLPar = function(uri, par, par_value) {
    const pattern = par + '=([^&]*)';
    const replaceText = par + '=' + par_value;
    if (uri.match(pattern)) {
      // 如果连接中带这个参数
      let tmp = '/\\' + par + '=[^&]*/';
      tmp = uri.replace(eval(tmp), replaceText);
      return tmp;
    } else {
      if (uri.match('[?]')) {
        // 如果链接中不带这个参数但是有其他参数
        return uri + '&' + replaceText;
      } else {
        // 如果链接中没有带任何参数
        return uri + '?' + replaceText;
      }
    }
  };
  window.vod.noPassByName = function(str) {
    if (str != null && str !== undefined) {
      if (str.length <= 3) {
        return '*' + str.substring(1, str.length);
      } else if (str.length > 3 && str.length <= 6) {
        return '**' + str.substring(2, str.length);
      } else if (str.length > 6) {
        return str.substring(0, 2) + '****' + str.substring(6, str.length);
      }
    } else {
      return '';
    }
  };

  window.LANGUAGE_KEY = {
    ar: 'ar',
    en: 'en-US',
    cn: 'zh-CN',
  };
  window.LANGUAGE_BY_ENV = {
    preproduction: window.LANGUAGE_KEY.en,
    product: window.LANGUAGE_KEY.ar,
  };
  window.getLanguageCookies = () => {
    const urlName = window.vod.getParameterByName('lang');
    return urlName || window.Cookies.get('locale');
  };
  window.setLanguageCookies = lang => {
    if (!lang) {
      return;
    }
    window.Cookies.set('locale', lang);
    window.Cookies.set('language', lang);
    window.Cookies.set('lang', lang);
  };
  window.currentLanguage =
    window.getLanguageCookies() ||
    window.LANGUAGE_BY_ENV[window.SDP_ENV] ||
    navigator.language ||
    navigator.userLanguage;
  window.isRtl = targetSelector => {
    try {
      return (
        window?.currentLanguage.indexOf('ar') !== -1 ||
        window.getComputedStyle(document.querySelector('html')).direction ===
          'rtl' ||
        window.getComputedStyle(document.querySelector('body')).direction ===
          'rtl' ||
        (!!targetSelector &&
          window.getComputedStyle(document.querySelector(targetSelector))
            ?.direction === 'rtl')
      );
    } catch (error) {
      return false;
    }
  };
  window.locale = {
    [window.LANGUAGE_KEY.ar]: {
      languageName: 'عربى',
      documentTitle: 'Video Online Education of Egyptian MOE',
      search: 'البحث عن دورات تدريبية',
      signout: 'تسجيل الخروج',
      account: 'الحساب الخاص بي',
      accountUrl: `${window.location.origin}/vod/myaccount.html?nav=study`,
      copyright:
        'All rights reserved Fujian Elernity Education Technology Co., Ltd.',
      headNav: [
        {
          name: 'الدورات التدريبية',
          className: 'courses',
          url: `${window.location.origin}/home?lang=${window.currentLanguage}`,
        },
        {
          name: 'الجدول الزمني',
          className: 'schedule',
          url: `${window.location.origin}/vod/schedule.html`,
        },
      ],
    },
    [window.LANGUAGE_KEY.en]: {
      languageName: 'English',
      documentTitle: 'Video Online Education of Egyptian MOE',
      search: 'Search for Courses',
      signout: 'Sign Out',
      account: 'My Account',
      accountUrl: `${window.location.origin}/vod/myaccount.html?nav=study`,
      copyright:
        'All rights reserved Fujian Elernity Education Technology Co., Ltd.',
      headNav: [
        {
          name: 'Courses',
          className: 'courses',
          url: `${window.location.origin}/home?lang=${window.currentLanguage}`,
        },
        {
          name: 'Schedule',
          className: 'schedule',
          url: `${window.location.origin}/vod/schedule.html`,
        },
      ],
    },
    [window.LANGUAGE_KEY.cn]: {
      languageName: '简体中文',
      documentTitle: 'Video Online Education of Egyptian MOE',
      search: '搜索课程',
      signout: '退出登录',
      account: '我的账号',
      accountUrl: `${window.location.origin}/vod/myaccount.html?nav=study`,
      copyright:
        'All rights reserved Fujian Elernity Education Technology Co., Ltd.',
      headNav: [
        {
          name: '课程',
          className: 'courses',
          url: `${window.location.origin}/home?lang=${window.currentLanguage}`,
        },
        {
          name: '时间表',
          className: 'schedule',
          url: `${window.location.origin}/vod/schedule.html`,
        },
      ],
    },
  };

  function createIframe(id, url, onLoadCallback = () => {}) {
    const iframe = document.createElement('iframe');
    try {
      iframe.id = id;
      iframe.width = '10';
      iframe.height = '10';
      iframe.style.display = 'none';
      iframe.src = url;
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', function() {
          onLoadCallback();
        });
      } else {
        iframe.onload = function() {
          onLoadCallback();
        };
      }
      document.body.appendChild(iframe);
    } catch (error) {
      console.log(error);
    }
    return iframe;
  }
  window.edmodoLogout = (callback = () => {}) => {
    const targetIframe = document.querySelector('#edmodo-logout-iframe');
    const edmodoLogoutUrl = `https://api.edmodo.com/logout.json?request_origin=react-web-app&_t=${new Date().getTime()}`;
    if (!targetIframe) {
      createIframe('edmodo-logout-iframe', edmodoLogoutUrl, callback);
    } else {
      targetIframe.setAttribute('src', edmodoLogoutUrl);
      if (targetIframe.attachEvent) {
        targetIframe.attachEvent('onload', function() {
          callback();
        });
      } else {
        targetIframe.onload = function() {
          callback();
        };
      }
    }
  };

  window.homeUrl = window.homeUrl || window.location.origin + '/vod/home.html';
  // 设置登出时的 url
  if (window.LOCAL_ENV) {
    window._logoutUrl = window.homeUrl;
  } else if (window.Host) {
    window._logoutUrl = `${
      window.Host
    }home/account/ssoLogout?returnurl=${encodeURIComponent(window.homeUrl)}`;
  }

  // 超过一定时间未操作则退出登录
  window.listenAutoLogout = () => {
    const __MAX_TRIGGER_LOGOUT_TIME__ =
      window.__DEFAULT_MAX_AUTO_LOGOUT_TIME__ || 30 * 60; // 超时时间，默认 30 分钟
    const __RESET_AUTO_LOGOUT_EVENT_NAME__ = window.__DEFAULT_RESET_AUTO_LOGOUT_EVENT_NAME__ || [
      'click',
      'keydown',
      'mousemove',
      'mousewheel',
    ]; // 判断用户是否操作的事件
    const autoLogout = {
      second: 0,
      timer: null,
      callback: () => {
        autoLogout.second += 1;
        if (autoLogout.second < __MAX_TRIGGER_LOGOUT_TIME__) {
          return;
        }
        const { ucVod, edmodoLogout } = window;
        if (
          !ucVod ||
          typeof edmodoLogout !== 'function' ||
          typeof ucVod.logout !== 'function'
        ) {
          return;
        }
        edmodoLogout(() => {
          window.localStorage.setItem('isLogout', false);
        });
        ucVod
          .logout()
          .then(function() {
            window.location.href = window._logoutUrl;
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            if (autoLogout.timer) {
              clearInterval(autoLogout.timer);
            }
          });
      },
      init: () => {
        if (autoLogout.timer) {
          clearInterval(autoLogout.timer);
        }
        autoLogout.second = 0;
        autoLogout.timer = setInterval(autoLogout.callback, 1000);
      },
      start: () => {
        autoLogout.init();
        window.addEventListener('load', () => {
          const body = document.querySelector('body');
          __RESET_AUTO_LOGOUT_EVENT_NAME__.forEach(event => {
            body.addEventListener(event, autoLogout.init);
          });
        });
      },
    };
    return {
      start: autoLogout.start,
    };
  };

  if (
    !(
      browser.versions.android ||
      browser.versions.ios ||
      browser.versions.tablet
    )
  ) {
    window.listenAutoLogout().start();
  }
  window.addEventListener('load', function() {
    try {
      if (JSON.parse(window.localStorage.getItem('isLogout'))) {
        window?.edmodoLogout(() => {
          window.localStorage.setItem('isLogout', false);
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
})(window);
