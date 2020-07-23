(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("leaflet"));
	else if(typeof define === 'function' && define.amd)
		define(["leaflet"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("leaflet")) : factory(root["L"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"root":"L","commonjs":"leaflet","commonjs2":"leaflet","amd":"leaflet"}
var external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_ = __webpack_require__(0);
var external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default = /*#__PURE__*/__webpack_require__.n(external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_);

// CONCATENATED MODULE: ./src/control.trackplayback/control.playback.js


const TrackPlayBackControl = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.Control.extend({

  options: {
    position: 'topright',
    showOptions: true,
    showInfo: true,
    showSlider: true,
    showClose: true,
    autoPlay: true
  },

  initialize: function (trackplayback, options) {
    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.Control.prototype.initialize.call(this, options)
    this.trackPlayBack = trackplayback
    this.trackPlayBack.on('tick', this._tickCallback, this)
  },

  onAdd: function (map) {
    this._initContainer()
    return this._container
  },

  onRemove: function (map) {
    this.trackPlayBack.dispose()
    this.trackPlayBack.off('tick', this._tickCallback, this)
  },

  /**
     * Obtain the time string according to the unix timestamp (unit: second)
     * @param {[int]} time [time stamp (accurate to the second)]
     * @param {[string]} accuracy [accuracy, day: d, hour: h, minute: m, second: s]
     * @return {[string]} [yy:mm:dd hh:mm:ss]
     */
  getTimeStrFromUnix: function (time, accuracy = 's') {
    time = parseInt(time * 1000)
    const newDate = new Date(time)
    const year = newDate.getFullYear()
    const month = (newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1
    const day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()
    const hours = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours()
    const minuts = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes()
    const seconds = newDate.getSeconds() < 10 ? '0' + newDate.getSeconds() : newDate.getSeconds()
    let ret
    if (accuracy === 'd') {
      ret = year + '-' + month + '-' + day
    } else if (accuracy === 'h') {
      ret = year + '-' + month + '-' + day + ' ' + hours
    } else if (accuracy === 'm') {
      ret = year + '-' + month + '-' + day + ' ' + hours + ':' + minuts
    } else {
      ret = year + '-' + month + '-' + day + ' ' + hours + ':' + minuts + ':' + seconds
    }
    return ret
  },

  _initContainer: function () {
    var className = 'leaflet-control-playback'
    this._container = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.create('div', className)
    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomEvent.disableClickPropagation(this._container)

    this._optionsContainer = this._createContainer('optionsContainer', this._container)
    this._buttonContainer = this._createContainer('buttonContainer', this._container)
    this._infoContainer = this._createContainer('infoContainer', this._container)
    this._sliderContainer = this._createContainer('sliderContainer', this._container)

    this._pointCbx = this._createCheckbox('show point', 'show-trackpoint', this._optionsContainer, this._showTrackPoint)
    this._lineCbx = this._createCheckbox('show line', 'show-trackLine', this._optionsContainer, this._showTrackLine)

    this._playBtn = this._createButton('play', 'btn-stop', this._buttonContainer, this._play)
    this._restartBtn = this._createButton('replay', 'btn-restart', this._buttonContainer, this._restart)
    this._slowSpeedBtn = this._createButton('slow', 'btn-slow', this._buttonContainer, this._slow)
    this._quickSpeedBtn = this._createButton('quick', 'btn-quick', this._buttonContainer, this._quick)
    if (this.options.showClose) {
      this._closeBtn = this._createButton('close', 'btn-close', this._buttonContainer, this._close)
    }

    this._infoStartTime = this._createInfo('start: ', this.getTimeStrFromUnix(this.trackPlayBack.getStartTime()), 'info-start-time', this._infoContainer)
    this._infoEndTime = this._createInfo('end: ', this.getTimeStrFromUnix(this.trackPlayBack.getEndTime()), 'info-end-time', this._infoContainer)
    this._infoCurTime = this._createInfo('cur: ', this.getTimeStrFromUnix(this.trackPlayBack.getCurTime()), 'info-cur-time', this._infoContainer)
    this._infoSpeedRatio = this._createInfo('speed: ', `x${this.trackPlayBack.getSpeed()}`, 'info-speed-ratio', this._infoContainer)

    this._slider = this._createSlider('time-slider', this._sliderContainer, this._scrollchange)

    return this._container
  },

  _createContainer: function (className, container) {
    return external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.create('div', className, container)
  },

  _createCheckbox: function (labelName, className, container, fn) {
    const divEle = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.create('div', className + ' trackplayback-checkbox', container)

    const inputEle = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.create('input', 'trackplayback-input', divEle)
    const inputId = `trackplayback-input-${external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.Util.stamp(inputEle)}`
    inputEle.setAttribute('type', 'checkbox')
    inputEle.setAttribute('id', inputId)

    const labelEle = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.create('label', 'trackplayback-label', divEle)
    labelEle.setAttribute('for', inputId)
    labelEle.innerHTML = labelName

    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomEvent.on(inputEle, 'change', fn, this)

    return divEle
  },

  _createButton: function (title, className, container, fn) {
    const link = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.create('a', className, container)
    link.href = '#'
    link.title = title

    /*
         * Will force screen readers like VoiceOver to read this as "Zoom in - button"
         */
    link.setAttribute('role', 'button')
    link.setAttribute('aria-label', title)

    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomEvent.disableClickPropagation(link)
    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomEvent.on(link, 'click', fn, this)

    return link
  },

  _createInfo: function (title, info, className, container) {
    const infoContainer = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.create('div', 'info-container', container)
    const infoTitle = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.create('span', 'info-title', infoContainer)
    infoTitle.innerHTML = title
    const infoEle = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.create('span', className, infoContainer)
    infoEle.innerHTML = info
    return infoEle
  },

  _createSlider: function (className, container, fn) {
    const sliderEle = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.create('input', className, container)
    sliderEle.setAttribute('type', 'range')
    sliderEle.setAttribute('min', this.trackPlayBack.getStartTime())
    sliderEle.setAttribute('max', this.trackPlayBack.getEndTime())
    sliderEle.setAttribute('value', this.trackPlayBack.getCurTime())

    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomEvent.on(sliderEle, 'click mousedown dbclick', external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomEvent.stopPropagation)
      .on(sliderEle, 'click', external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomEvent.preventDefault)
      .on(sliderEle, 'change', fn, this)
      .on(sliderEle, 'mousemove', fn, this)

    return sliderEle
  },

  _showTrackPoint (e) {
    if (e.target.checked) {
      this.trackPlayBack.showTrackPoint()
    } else {
      this.trackPlayBack.hideTrackPoint()
    }
  },

  _showTrackLine (e) {
    if (e.target.checked) {
      this.trackPlayBack.showTrackLine()
    } else {
      this.trackPlayBack.hideTrackLine()
    }
  },

  _play: function () {
    const hasClass = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.hasClass(this._playBtn, 'btn-stop')
    if (hasClass) {
      external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.removeClass(this._playBtn, 'btn-stop')
      external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.addClass(this._playBtn, 'btn-start')
      this._playBtn.setAttribute('title', 'stop')
      this.trackPlayBack.start()
    } else {
      external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.removeClass(this._playBtn, 'btn-start')
      external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.addClass(this._playBtn, 'btn-stop')
      this._playBtn.setAttribute('title', 'play')
      this.trackPlayBack.stop()
    }
  },

  _restart: function () {
    // start playing and change the play button style
    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.removeClass(this._playBtn, 'btn-stop')
    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.addClass(this._playBtn, 'btn-start')
    this._playBtn.setAttribute('title', 'stop')
    this.trackPlayBack.rePlaying()
  },

  _slow: function () {
    this.trackPlayBack.slowSpeed()
    const sp = this.trackPlayBack.getSpeed()
    this._infoSpeedRatio.innerHTML = `X${sp}`
  },

  _quick: function () {
    this.trackPlayBack.quickSpeed()
    const sp = this.trackPlayBack.getSpeed()
    this._infoSpeedRatio.innerHTML = `X${sp}`
  },

  _close: function () {
    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.remove(this._container)
    if (this.onRemove) {
      this.onRemove(this._map)
    }
    return this
  },

  _scrollchange: function (e) {
    const val = Number(e.target.value)
    this.trackPlayBack.setCursor(val)
  },

  _tickCallback: function (e) {
    // update time
    const time = this.getTimeStrFromUnix(e.time)
    this._infoCurTime.innerHTML = time
    // update timeline
    this._slider.value = e.time
    // Change the play button style after playing
    if (e.time >= this.trackPlayBack.getEndTime()) {
      external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.removeClass(this._playBtn, 'btn-start')
      external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.addClass(this._playBtn, 'btn-stop')
      this._playBtn.setAttribute('title', 'play')
      this.trackPlayBack.stop()
    }
  }
})

const trackplaybackcontrol = function (trackplayback, options) {
  return new TrackPlayBackControl(trackplayback, options)
}

// CONCATENATED MODULE: ./src/control.trackplayback/index.js



external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.TrackPlayBackControl = TrackPlayBackControl
external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.trackplaybackcontrol = trackplaybackcontrol


/***/ })
/******/ ]);
});