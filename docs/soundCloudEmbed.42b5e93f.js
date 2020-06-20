// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"soundCloudEmbed.js":[function(require,module,exports) {
var SC = SC || {};

SC.Widget = function (n) {
  function t(r) {
    if (e[r]) return e[r].exports;
    var o = e[r] = {
      exports: {},
      id: r,
      loaded: !1
    };
    return n[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports;
  }

  var e = {};
  return t.m = n, t.c = e, t.p = "", t(0);
}([function (n, t, e) {
  function r(n) {
    return !!("" === n || n && n.charCodeAt && n.substr);
  }

  function o(n) {
    return !!(n && n.constructor && n.call && n.apply);
  }

  function i(n) {
    return !(!n || 1 !== n.nodeType || "IFRAME" !== n.nodeName.toUpperCase());
  }

  function a(n) {
    var t,
        e = !1;

    for (t in b) {
      if (b.hasOwnProperty(t) && b[t] === n) {
        e = !0;
        break;
      }
    }

    return e;
  }

  function s(n) {
    var t, e, r;

    for (t = 0, e = I.length; t < e && (r = n(I[t]), r !== !1); t++) {
      ;
    }
  }

  function u(n) {
    var t,
        e,
        r,
        o = "";

    for ("//" === n.substr(0, 2) && (n = window.location.protocol + n), r = n.split("/"), t = 0, e = r.length; t < e && t < 3; t++) {
      o += r[t], t < 2 && (o += "/");
    }

    return o;
  }

  function c(n) {
    return n.contentWindow ? n.contentWindow : n.contentDocument && "parentWindow" in n.contentDocument ? n.contentDocument.parentWindow : null;
  }

  function l(n) {
    var t,
        e = [];

    for (t in n) {
      n.hasOwnProperty(t) && e.push(n[t]);
    }

    return e;
  }

  function d(n, t, e) {
    e.callbacks[n] = e.callbacks[n] || [], e.callbacks[n].push(t);
  }

  function E(n, t) {
    var e,
        r = !0;
    return t.callbacks[n] = [], s(function (t) {
      if (e = t.callbacks[n] || [], e.length) return r = !1, !1;
    }), r;
  }

  function f(n, t, e) {
    var r,
        o,
        i = c(e);
    return !!i.postMessage && (r = e.getAttribute("src").split("?")[0], o = JSON.stringify({
      method: n,
      value: t
    }), "//" === r.substr(0, 2) && (r = window.location.protocol + r), r = r.replace(/http:\/\/(w|wt).soundcloud.com/, "https://$1.soundcloud.com"), void i.postMessage(o, r));
  }

  function p(n) {
    var t;
    return s(function (e) {
      if (e.instance === n) return t = e, !1;
    }), t;
  }

  function h(n) {
    var t;
    return s(function (e) {
      if (c(e.element) === n) return t = e, !1;
    }), t;
  }

  function v(n, t) {
    return function (e) {
      var r = o(e),
          i = p(this),
          a = !r && t ? e : null,
          s = r && !t ? e : null;
      return s && d(n, s, i), f(n, a, i.element), this;
    };
  }

  function S(n, t, e) {
    var r, o, i;

    for (r = 0, o = t.length; r < o; r++) {
      i = t[r], n[i] = v(i, e);
    }
  }

  function R(n, t, e) {
    return n + "?url=" + t + "&" + g(e);
  }

  function g(n) {
    var t,
        e,
        r = [];

    for (t in n) {
      n.hasOwnProperty(t) && (e = n[t], r.push(t + "=" + ("start_track" === t ? parseInt(e, 10) : e ? "true" : "false")));
    }

    return r.join("&");
  }

  function m(n, t, e) {
    var r,
        o,
        i = n.callbacks[t] || [];

    for (r = 0, o = i.length; r < o; r++) {
      i[r].apply(n.instance, e);
    }

    (a(t) || t === L.READY) && (n.callbacks[t] = []);
  }

  function w(n) {
    var t, e, r, o, i;

    try {
      e = JSON.parse(n.data);
    } catch (a) {
      return !1;
    }

    return t = h(n.source), r = e.method, o = e.value, (!t || A(n.origin) === A(t.domain)) && (t ? (r === L.READY && (t.isReady = !0, m(t, C), E(C, t)), r !== L.PLAY || t.playEventFired || (t.playEventFired = !0), r !== L.PLAY_PROGRESS || t.playEventFired || (t.playEventFired = !0, m(t, L.PLAY, [o])), i = [], void 0 !== o && i.push(o), void m(t, r, i)) : (r === L.READY && T.push(n.source), !1));
  }

  function A(n) {
    return n.replace(Y, "");
  }

  var _,
      y,
      O,
      D = e(1),
      b = e(2),
      P = e(3),
      L = D.api,
      N = D.bridge,
      T = [],
      I = [],
      C = "__LATE_BINDING__",
      k = "http://wt.soundcloud.test:9200/",
      Y = /^http(?:s?)/;

  window.addEventListener ? window.addEventListener("message", w, !1) : window.attachEvent("onmessage", w), n.exports = O = function O(n, t, e) {
    if (r(n) && (n = document.getElementById(n)), !i(n)) throw new Error("SC.Widget function should be given either iframe element or a string specifying id attribute of iframe element.");
    t && (e = e || {}, n.src = R(k, t, e));
    var o,
        a,
        s = h(c(n));
    return s && s.instance ? s.instance : (o = T.indexOf(c(n)) > -1, a = new _(n), I.push(new y(a, n, o)), a);
  }, O.Events = L, window.SC = window.SC || {}, window.SC.Widget = O, y = function y(n, t, e) {
    this.instance = n, this.element = t, this.domain = u(t.getAttribute("src")), this.isReady = !!e, this.callbacks = {};
  }, _ = function _() {}, _.prototype = {
    constructor: _,
    load: function load(n, t) {
      if (n) {
        t = t || {};
        var e = this,
            r = p(this),
            o = r.element,
            i = o.src,
            a = i.substr(0, i.indexOf("?"));
        r.isReady = !1, r.playEventFired = !1, o.onload = function () {
          e.bind(L.READY, function () {
            var n,
                e = r.callbacks;

            for (n in e) {
              e.hasOwnProperty(n) && n !== L.READY && f(N.ADD_LISTENER, n, r.element);
            }

            t.callback && t.callback();
          });
        }, o.src = R(a, n, t);
      }
    },
    bind: function bind(n, t) {
      var e = this,
          r = p(this);
      return r && r.element && (n === L.READY && r.isReady ? setTimeout(t, 1) : r.isReady ? (d(n, t, r), f(N.ADD_LISTENER, n, r.element)) : d(C, function () {
        e.bind(n, t);
      }, r)), this;
    },
    unbind: function unbind(n) {
      var t,
          e = p(this);
      e && e.element && (t = E(n, e), n !== L.READY && t && f(N.REMOVE_LISTENER, n, e.element));
    }
  }, S(_.prototype, l(b)), S(_.prototype, l(P), !0);
}, function (n, t) {
  t.api = {
    LOAD_PROGRESS: "loadProgress",
    PLAY_PROGRESS: "playProgress",
    PLAY: "play",
    PAUSE: "pause",
    FINISH: "finish",
    SEEK: "seek",
    READY: "ready",
    OPEN_SHARE_PANEL: "sharePanelOpened",
    CLICK_DOWNLOAD: "downloadClicked",
    CLICK_BUY: "buyClicked",
    ERROR: "error"
  }, t.bridge = {
    REMOVE_LISTENER: "removeEventListener",
    ADD_LISTENER: "addEventListener"
  };
}, function (n, t) {
  n.exports = {
    GET_VOLUME: "getVolume",
    GET_DURATION: "getDuration",
    GET_POSITION: "getPosition",
    GET_SOUNDS: "getSounds",
    GET_CURRENT_SOUND: "getCurrentSound",
    GET_CURRENT_SOUND_INDEX: "getCurrentSoundIndex",
    IS_PAUSED: "isPaused"
  };
}, function (n, t) {
  n.exports = {
    PLAY: "play",
    PAUSE: "pause",
    TOGGLE: "toggle",
    SEEK_TO: "seekTo",
    SET_VOLUME: "setVolume",
    NEXT: "next",
    PREV: "prev",
    SKIP: "skip"
  };
}]);
},{}],"C:/Users/adelruna/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62179" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/adelruna/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","soundCloudEmbed.js"], null)
//# sourceMappingURL=/soundCloudEmbed.42b5e93f.js.map