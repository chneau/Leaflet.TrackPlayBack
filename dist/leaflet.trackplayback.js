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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"root":"L","commonjs":"leaflet","commonjs2":"leaflet","amd":"leaflet"}
var external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_ = __webpack_require__(0);
var external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default = /*#__PURE__*/__webpack_require__.n(external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_);

// CONCATENATED MODULE: ./src/leaflet.trackplayback/clock.js

/**
 * Clock type, control track to play animation
 */
const Clock = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.Class.extend({

  includes: external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.Evented.prototype,

  options: {
    // Play speed
    // Calculation method fpstime * Math.pow(2, this._speed-1)
    speed: 12,
    // Maximum playback speed
    maxSpeed: 65
  },

  initialize: function (trackController, options) {
    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.setOptions(this, options)

    this._trackController = trackController
    this._endTime = this._trackController.getMaxTime()
    this._curTime = this._trackController.getMinTime()
    this._speed = this.options.speed
    this._maxSpeed = this.options.maxSpeed
    this._intervalID = null
    this._lastFpsUpdateTime = 0
  },

  start: function () {
    if (this._intervalID) return
    this._intervalID = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.Util.requestAnimFrame(this._tick, this)
  },

  stop: function () {
    if (!this._intervalID) return
    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.Util.cancelAnimFrame(this._intervalID)
    this._intervalID = null
    this._lastFpsUpdateTime = 0
  },

  rePlaying: function () {
    this.stop()
    this._curTime = this._trackController.getMinTime()
    this.start()
  },

  slowSpeed: function () {
    this._speed = this._speed <= 1 ? this._speed : this._speed - 1
    if (this._intervalID) {
      this.stop()
      this.start()
    }
  },

  quickSpeed: function () {
    this._speed = this._speed >= this._maxSpeed ? this._speed : this._speed + 1
    if (this._intervalID) {
      this.stop()
      this.start()
    }
  },

  getSpeed: function () {
    return this._speed
  },

  getCurTime: function () {
    return this._curTime
  },

  getStartTime: function () {
    return this._trackController.getMinTime()
  },

  getEndTime: function () {
    return this._trackController.getMaxTime()
  },

  isPlaying: function () {
    return !!this._intervalID
  },

  setCursor: function (time) {
    this._curTime = time
    this._trackController.drawTracksByTime(this._curTime)
    this.fire('tick', {
      time: this._curTime
    })
  },

  setSpeed: function (speed) {
    this._speed = speed
    if (this._intervalID) {
      this.stop()
      this.start()
    }
  },

  // Calculate the time interval between two frames, unit: second
  _caculatefpsTime: function (now) {
    let time
    if (this._lastFpsUpdateTime === 0) {
      time = 0
    } else {
      time = now - this._lastFpsUpdateTime
    }
    this._lastFpsUpdateTime = now
    // Convert milliseconds to seconds
    time = time / 1000
    return time
  },

  _tick: function () {
    const now = +new Date()
    const fpstime = this._caculatefpsTime(now)
    let isPause = false
    const stepTime = fpstime * Math.pow(2, this._speed - 1)
    this._curTime += stepTime
    if (this._curTime >= this._endTime) {
      this._curTime = this._endTime
      isPause = true
    }
    this._trackController.drawTracksByTime(this._curTime)
    this.fire('tick', {
      time: this._curTime
    })
    if (!isPause) this._intervalID = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.Util.requestAnimFrame(this._tick, this)
  }
})

const clock = function (trackController, options) {
  return new Clock(trackController, options)
}

// CONCATENATED MODULE: ./src/leaflet.trackplayback/tracklayer.js


/**
 * Track layer
 */
const TrackLayer = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.Renderer.extend({

  initialize: function (options) {
    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.Renderer.prototype.initialize.call(this, options)
    this.options.padding = 0.1
  },

  onAdd: function (map) {
    this._container = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.create('canvas', 'leaflet-zoom-animated')

    var pane = map.getPane(this.options.pane)
    pane.appendChild(this._container)

    this._ctx = this._container.getContext('2d')

    this._update()
  },

  onRemove: function (map) {
    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.remove(this._container)
  },

  getContainer: function () {
    return this._container
  },

  getBounds: function () {
    return this._bounds
  },

  _update: function () {
    if (this._map._animatingZoom && this._bounds) {
      return
    }

    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.Renderer.prototype._update.call(this)

    var b = this._bounds

    var container = this._container

    var size = b.getSize()

    var m = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.Browser.retina ? 2 : 1

    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.DomUtil.setPosition(container, b.min)

    // set canvas size (also clearing it); use double size on retina
    container.width = m * size.x
    container.height = m * size.y
    container.style.width = size.x + 'px'
    container.style.height = size.y + 'px'

    if (external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.Browser.retina) {
      this._ctx.scale(2, 2)
    }

    // translate so we use the same path coordinates after canvas element moves
    this._ctx.translate(-b.min.x, -b.min.y)

    // Tell paths to redraw themselves
    this.fire('update')
  }
})

// CONCATENATED MODULE: ./src/leaflet.trackplayback/draw.js



/**
 * Drawing class
 * Complete the drawing of trajectory lines, trajectory points, and targets
 */
const Draw = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.Class.extend({

  trackPointOptions: {
    isDraw: false,
    useCanvas: true,
    stroke: false,
    color: '#ef0300',
    fill: true,
    fillColor: '#ef0300',
    opacity: 0.3,
    radius: 4
  },
  trackLineOptions: {
    isDraw: false,
    stroke: true,
    color: '#1C54E2', // stroke color
    weight: 2,
    fill: false,
    fillColor: '#000',
    opacity: 0.3
  },
  targetOptions: {
    useImg: false,
    imgUrl: '../../static/images/ship.png',
    showText: false,
    width: 8,
    height: 18,
    color: '#00f', // stroke color
    fillColor: '#9FD12D'
  },
  toolTipOptions: {
    offset: [0, 0],
    direction: 'top',
    permanent: false
  },

  initialize: function (map, options) {
    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.extend(this.trackPointOptions, options.trackPointOptions)
    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.extend(this.trackLineOptions, options.trackLineOptions)
    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.extend(this.targetOptions, options.targetOptions)
    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.extend(this.toolTipOptions, options.toolTipOptions)

    this._showTrackPoint = this.trackPointOptions.isDraw
    this._showTrackLine = this.trackLineOptions.isDraw

    this._map = map
    this._map.on('mousemove', this._onmousemoveEvt, this)

    this._trackLayer = new TrackLayer().addTo(map)
    this._trackLayer.on('update', this._trackLayerUpdate, this)

    this._canvas = this._trackLayer.getContainer()
    this._ctx = this._canvas.getContext('2d')

    this._bufferTracks = []

    if (!this.trackPointOptions.useCanvas) {
      this._trackPointFeatureGroup = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.featureGroup([]).addTo(map)
    }

    // If the target uses a picture, load the picture first
    if (this.targetOptions.useImg) {
      const img = new Image()
      img.onload = () => {
        this._targetImg = img
      }
      img.onerror = () => {
        throw new Error('img load error!')
      }
      img.src = this.targetOptions.imgUrl
    }
  },

  update: function () {
    this._trackLayerUpdate()
  },

  drawTrack: function (trackpoints) {
    this._bufferTracks.push(trackpoints)
    this._drawTrack(trackpoints)
  },

  showTrackPoint: function () {
    this._showTrackPoint = true
    this.update()
  },

  hideTrackPoint: function () {
    this._showTrackPoint = false
    this.update()
  },

  showTrackLine: function () {
    this._showTrackLine = true
    this.update()
  },

  hideTrackLine: function () {
    this._showTrackLine = false
    this.update()
  },

  remove: function () {
    this._bufferTracks = []
    this._trackLayer.off('update', this._trackLayerUpdate, this)
    this._map.off('mousemove', this._onmousemoveEvt, this)
    if (this._map.hasLayer(this._trackLayer)) {
      this._map.removeLayer(this._trackLayer)
    }
    if (this._map.hasLayer(this._trackPointFeatureGroup)) {
      this._map.removeLayer(this._trackPointFeatureGroup)
    }
  },

  clear: function () {
    this._clearLayer()
    this._bufferTracks = []
  },

  _trackLayerUpdate: function () {
    if (this._bufferTracks.length) {
      this._clearLayer()
      this._bufferTracks.forEach(function (element, index) {
        this._drawTrack(element)
      }.bind(this))
    }
  },

  _onmousemoveEvt: function (e) {
    if (!this._showTrackPoint) {
      return
    }
    const point = e.layerPoint
    if (this._bufferTracks.length) {
      for (let i = 0, leni = this._bufferTracks.length; i < leni; i++) {
        for (let j = 0, len = this._bufferTracks[i].length; j < len; j++) {
          const tpoint = this._getLayerPoint(this._bufferTracks[i][j])
          if (point.distanceTo(tpoint) <= this.trackPointOptions.radius) {
            this._opentoolTip(this._bufferTracks[i][j])
            return
          }
        }
      }
    }
    if (this._map.hasLayer(this._tooltip)) {
      this._map.removeLayer(this._tooltip)
    }
    this._canvas.style.cursor = 'pointer'
  },

  _opentoolTip: function (trackpoint) {
    if (this._map.hasLayer(this._tooltip)) {
      this._map.removeLayer(this._tooltip)
    }
    this._canvas.style.cursor = 'default'
    const latlng = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.latLng(trackpoint.lat, trackpoint.lng)
    const tooltip = this._tooltip = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.tooltip(this.toolTipOptions)
    tooltip.setLatLng(latlng)
    tooltip.addTo(this._map)
    tooltip.setContent(this._getTooltipText(trackpoint))
  },

  _drawTrack: function (trackpoints) {
    // draw trajectory
    if (this._showTrackLine) {
      this._drawTrackLine(trackpoints)
    }
    // Draw a boat
    const targetPoint = trackpoints[trackpoints.length - 1]
    if (this.targetOptions.useImg && this._targetImg) {
      this._drawShipImage(targetPoint)
    } else {
      this._drawShipCanvas(targetPoint)
    }
    // Draw label information
    if (this.targetOptions.showText) {
      this._drawtxt(`Heading：${parseInt(targetPoint.dir)}degrees`, targetPoint)
    }
    // Draw the passing track points
    if (this._showTrackPoint) {
      if (this.trackPointOptions.useCanvas) {
        this._drawTrackPointsCanvas(trackpoints)
      } else {
        this._drawTrackPointsSvg(trackpoints)
      }
    }
  },

  _drawTrackLine: function (trackpoints) {
    const options = this.trackLineOptions
    const tp0 = this._getLayerPoint(trackpoints[0])
    this._ctx.save()
    this._ctx.beginPath()
    // Draw trajectory
    this._ctx.moveTo(tp0.x, tp0.y)
    for (let i = 1, len = trackpoints.length; i < len; i++) {
      const tpi = this._getLayerPoint(trackpoints[i])
      this._ctx.lineTo(tpi.x, tpi.y)
    }
    this._ctx.globalAlpha = options.opacity
    if (options.stroke) {
      this._ctx.strokeStyle = options.color
      this._ctx.lineWidth = options.weight
      this._ctx.stroke()
    }
    if (options.fill) {
      this._ctx.fillStyle = options.fillColor
      this._ctx.fill()
    }
    this._ctx.restore()
  },

  _drawTrackPointsCanvas: function (trackpoints) {
    const options = this.trackPointOptions
    this._ctx.save()
    for (let i = 0, len = trackpoints.length; i < len; i++) {
      if (trackpoints[i].isOrigin) {
        const latLng = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.latLng(trackpoints[i].lat, trackpoints[i].lng)
        const radius = options.radius
        const point = this._map.latLngToLayerPoint(latLng)
        this._ctx.beginPath()
        this._ctx.arc(point.x, point.y, radius, 0, Math.PI * 2, false)
        this._ctx.globalAlpha = options.opacity
        if (options.stroke) {
          this._ctx.strokeStyle = options.color
          this._ctx.stroke()
        }
        if (options.fill) {
          this._ctx.fillStyle = options.fillColor
          this._ctx.fill()
        }
      }
    }
    this._ctx.restore()
  },

  _drawTrackPointsSvg: function (trackpoints) {
    for (let i = 0, len = trackpoints.length; i < len; i++) {
      if (trackpoints[i].isOrigin) {
        const latLng = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.latLng(trackpoints[i].lat, trackpoints[i].lng)
        const cricleMarker = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.circleMarker(latLng, this.trackPointOptions)
        cricleMarker.bindTooltip(this._getTooltipText(trackpoints[i]), this.toolTipOptions)
        this._trackPointFeatureGroup.addLayer(cricleMarker)
      }
    }
  },

  _drawtxt: function (text, trackpoint) {
    const point = this._getLayerPoint(trackpoint)
    this._ctx.save()
    this._ctx.font = '12px Verdana'
    this._ctx.fillStyle = '#000'
    this._ctx.textAlign = 'center'
    this._ctx.textBaseline = 'bottom'
    this._ctx.fillText(text, point.x, point.y - 12, 200)
    this._ctx.restore()
  },

  _drawShipCanvas: function (trackpoint) {
    const point = this._getLayerPoint(trackpoint)
    const rotate = trackpoint.dir || 0
    const w = this.targetOptions.width
    const h = this.targetOptions.height
    const dh = h / 3

    this._ctx.save()
    this._ctx.fillStyle = this.targetOptions.fillColor
    this._ctx.strokeStyle = this.targetOptions.color
    this._ctx.translate(point.x, point.y)
    this._ctx.rotate((Math.PI / 180) * rotate)
    this._ctx.beginPath()
    this._ctx.moveTo(0, 0 - h / 2)
    this._ctx.lineTo(0 - w / 2, 0 - h / 2 + dh)
    this._ctx.lineTo(0 - w / 2, 0 + h / 2)
    this._ctx.lineTo(0 + w / 2, 0 + h / 2)
    this._ctx.lineTo(0 + w / 2, 0 - h / 2 + dh)
    this._ctx.closePath()
    this._ctx.fill()
    this._ctx.stroke()
    this._ctx.restore()
  },

  _drawShipImage: function (trackpoint) {
    const point = this._getLayerPoint(trackpoint)
    const dir = trackpoint.dir || 0
    const width = this.targetOptions.width
    const height = this.targetOptions.height
    const offset = {
      x: width / 2,
      y: height / 2
    }
    this._ctx.save()
    this._ctx.translate(point.x, point.y)
    this._ctx.rotate((Math.PI / 180) * dir)
    this._ctx.drawImage(this._targetImg, 0 - offset.x, 0 - offset.y, width, height)
    this._ctx.restore()
  },

  _getTooltipText: function (targetobj) {
    let content = []
    content.push('<table>')
    if (targetobj.info && targetobj.info.length) {
      for (let i = 0, len = targetobj.info.length; i < len; i++) {
        content.push('<tr>')
        content.push('<td>' + targetobj.info[i].key + '</td>')
        content.push('<td>' + targetobj.info[i].value + '</td>')
        content.push('</tr>')
      }
    }
    content.push('</table>')
    content = content.join('')
    return content
  },

  _clearLayer: function () {
    const bounds = this._trackLayer.getBounds()
    if (bounds) {
      const size = bounds.getSize()
      this._ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y)
    } else {
      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
    }
    if (this._map.hasLayer(this._trackPointFeatureGroup)) {
      this._trackPointFeatureGroup.clearLayers()
    }
  },

  _getLayerPoint (trackpoint) {
    return this._map.latLngToLayerPoint(external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.latLng(trackpoint.lat, trackpoint.lng))
  }
})

const draw_draw = function (map, options) {
  return new Draw(map, options)
}

// CONCATENATED MODULE: ./src/leaflet.trackplayback/util.js
function isArray (arr) {
  return Array.isArray ? Array.isArray(arr) : Object.prototype.toString.call(arr) === '[object Array]'
}

// CONCATENATED MODULE: ./src/leaflet.trackplayback/track.js



/**
 * Track class
 */
const Track = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.Class.extend({

  initialize: function (trackData = [], options) {
    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.setOptions(this, options)

    trackData.forEach(item => {
      // Add the isOrigin field to identify whether it is the original sampling point, distinguish it from the interpolation point
      item.isOrigin = true
    })
    this._trackPoints = trackData
    this._timeTick = {}
    this._update()
  },

  addTrackPoint: function (trackPoint) {
    if (isArray(trackPoint)) {
      for (let i = 0, len = trackPoint.length; i < len; i++) {
        this.addTrackPoint(trackPoint[i])
      }
    }
    this._addTrackPoint(trackPoint)
  },

  getTimes: function () {
    const times = []
    for (let i = 0, len = this._trackPoints.length; i < len; i++) {
      times.push(this._trackPoints[i].time)
    }
    return times
  },

  getStartTrackPoint: function () {
    return this._trackPoints[0]
  },

  getEndTrackPoint: function () {
    return this._trackPoints[this._trackPoints.length - 1]
  },

  getTrackPointByTime: function (time) {
    return this._trackPoints[this._timeTick[time]]
  },

  _getCalculateTrackPointByTime: function (time) {
    // First judge whether the last point is the original point
    let endpoint = this.getTrackPointByTime(time)
    let startPt = this.getStartTrackPoint()
    let endPt = this.getEndTrackPoint()
    const times = this.getTimes()
    if (time < startPt.time || time > endPt.time) return
    let left = 0
    let right = times.length - 1
    let n
    // Handle only one point
    if (left === right) {
      return endpoint
    }
    // Use the [binary search] method to find out the current time interval
    while (right - left !== 1) {
      n = parseInt((left + right) / 2)
      if (time > times[n]) left = n
      else right = n
    }

    const t0 = times[left]
    const t1 = times[right]
    const t = time
    const p0 = this.getTrackPointByTime(t0)
    const p1 = this.getTrackPointByTime(t1)
    startPt = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.point(p0.lng, p0.lat)
    endPt = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.point(p1.lng, p1.lat)
    const s = startPt.distanceTo(endPt)
    // At the same point at different times
    if (s <= 0) {
      endpoint = p1
      return endpoint
    }
    // Suppose the target is moving in a uniform straight line between two points
    // Solve the velocity vector and calculate the location of the time t target
    const v = s / (t1 - t0)
    const sinx = (endPt.y - startPt.y) / s
    const cosx = (endPt.x - startPt.x) / s
    const step = v * (t - t0)
    const x = startPt.x + step * cosx
    const y = startPt.y + step * sinx
    // Find the direction of movement of the target, 0-360 degrees
    const dir = endPt.x >= startPt.x ? (Math.PI * 0.5 - Math.asin(sinx)) * 180 / Math.PI : (Math.PI * 1.5 + Math.asin(sinx)) * 180 / Math.PI

    if (endpoint) {
      if (endpoint.dir === undefined) {
        endpoint.dir = dir
      }
    } else {
      endpoint = {
        lng: x,
        lat: y,
        dir: endPt.dir || dir,
        isOrigin: false,
        time: time
      }
    }
    return endpoint
  },

  // Get the track taken before a certain point in time
  getTrackPointsBeforeTime: function (time) {
    const tpoints = []
    for (let i = 0, len = this._trackPoints.length; i < len; i++) {
      if (this._trackPoints[i].time < time) {
        tpoints.push(this._trackPoints[i])
      }
    }
    // Get the last point, linearly interpolated according to time
    const endPt = this._getCalculateTrackPointByTime(time)
    if (endPt) {
      tpoints.push(endPt)
    }
    return tpoints
  },

  _addTrackPoint: function (trackPoint) {
    trackPoint.isOrigin = true
    this._trackPoints.push(trackPoint)
    this._update()
  },

  _update: function () {
    this._sortTrackPointsByTime()
    this._updatetimeTick()
  },

  // Track points are sorted by time 【Bubble sort】
  _sortTrackPointsByTime: function () {
    const len = this._trackPoints.length
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        if (this._trackPoints[j].time > this._trackPoints[j + 1].time) {
          const tmp = this._trackPoints[j + 1]
          this._trackPoints[j + 1] = this._trackPoints[j]
          this._trackPoints[j] = tmp
        }
      }
    }
  },

  // Establish time index for track points to optimize search performance
  _updatetimeTick: function () {
    this._timeTick = {}
    for (let i = 0, len = this._trackPoints.length; i < len; i++) {
      this._timeTick[this._trackPoints[i].time] = i
    }
  }
})

const track_track = function (trackData, options) {
  return new Track(trackData, options)
}

// CONCATENATED MODULE: ./src/leaflet.trackplayback/trackcontroller.js




/**
 * Controller class
 * Control trajectory and draw
 */
const TrackController = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.Class.extend({

  initialize: function (tracks = [], draw, options) {
    external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.setOptions(this, options)

    this._tracks = []
    this.addTrack(tracks)

    this._draw = draw

    this._updateTime()
  },

  getMinTime: function () {
    return this._minTime
  },

  getMaxTime: function () {
    return this._maxTime
  },

  addTrack: function (track) {
    if (isArray(track)) {
      for (let i = 0, len = track.length; i < len; i++) {
        this.addTrack(track[i])
      }
    } else if (track instanceof Track) {
      this._tracks.push(track)
      this._updateTime()
    } else {
      throw new Error('tracks must be an instance of `Track` or an array of `Track` instance!')
    }
  },

  drawTracksByTime: function (time) {
    this._draw.clear()
    for (let i = 0, len = this._tracks.length; i < len; i++) {
      const track = this._tracks[i]
      const tps = track.getTrackPointsBeforeTime(time)
      if (tps && tps.length) this._draw.drawTrack(tps)
    }
  },

  _updateTime: function () {
    this._minTime = this._tracks[0].getStartTrackPoint().time
    this._maxTime = this._tracks[0].getEndTrackPoint().time
    for (let i = 0, len = this._tracks.length; i < len; i++) {
      const stime = this._tracks[i].getStartTrackPoint().time
      const etime = this._tracks[i].getEndTrackPoint().time
      if (stime < this._minTime) {
        this._minTime = stime
      }
      if (etime > this._maxTime) {
        this._maxTime = etime
      }
    }
  }

})

const trackcontroller_trackController = function (tracks, draw, options) {
  return new TrackController(tracks, draw, options)
}

// CONCATENATED MODULE: ./src/leaflet.trackplayback/trackplayback.js







/**
 * single track data
 * [{lat: 30, lng: 116, time: 1502529980, heading: 300, info:[]},{},....]
 *
 * mutiple track data
 * [single track data, single track data, single track data]
 */
const TrackPlayBack = external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.Class.extend({

  includes: external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.Evented.prototype,

  initialize: function (data, map, options = {}) {
    const drawOptions = {
      trackPointOptions: options.trackPointOptions,
      trackLineOptions: options.trackLineOptions,
      targetOptions: options.targetOptions,
      toolTipOptions: options.toolTipOptions
    }
    this.tracks = this._initTracks(data)
    this.draw = new Draw(map, drawOptions)
    this.trackController = new TrackController(this.tracks, this.draw)
    this.clock = new Clock(this.trackController, options.clockOptions)

    this.clock.on('tick', this._tick, this)
  },
  start: function () {
    this.clock.start()
    return this
  },
  stop: function () {
    this.clock.stop()
    return this
  },
  rePlaying: function () {
    this.clock.rePlaying()
    return this
  },
  slowSpeed: function () {
    this.clock.slowSpeed()
    return this
  },
  quickSpeed: function () {
    this.clock.quickSpeed()
    return this
  },
  getSpeed: function () {
    return this.clock.getSpeed()
  },
  getCurTime: function () {
    return this.clock.getCurTime()
  },
  getStartTime: function () {
    return this.clock.getStartTime()
  },
  getEndTime: function () {
    return this.clock.getEndTime()
  },
  isPlaying: function () {
    return this.clock.isPlaying()
  },
  setCursor: function (time) {
    this.clock.setCursor(time)
    return this
  },
  setSpeed: function (speed) {
    this.clock.setSpeed(speed)
    return this
  },
  showTrackPoint: function () {
    this.draw.showTrackPoint()
    return this
  },
  hideTrackPoint: function () {
    this.draw.hideTrackPoint()
    return this
  },
  showTrackLine: function () {
    this.draw.showTrackLine()
    return this
  },
  hideTrackLine: function () {
    this.draw.hideTrackLine()
    return this
  },
  dispose: function () {
    this.clock.off('tick', this._tick)
    this.draw.remove()
    this.tracks = null
    this.draw = null
    this.trackController = null
    this.clock = null
  },
  _tick: function (e) {
    this.fire('tick', e)
  },
  _initTracks: function (data) {
    const tracks = []
    if (isArray(data)) {
      if (isArray(data[0])) {
        // Multiple tracks
        for (let i = 0, len = data.length; i < len; i++) {
          tracks.push(new Track(data[i]))
        }
      } else {
        // Single track
        tracks.push(new Track(data))
      }
    }
    return tracks
  }
})

const trackplayback = function (data, map, options) {
  return new TrackPlayBack(data, map, options)
}

// CONCATENATED MODULE: ./src/leaflet.trackplayback/index.js




external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.TrackPlayBack = TrackPlayBack
external_root_L_commonjs_leaflet_commonjs2_leaflet_amd_leaflet_default.a.trackplayback = trackplayback


/***/ })
/******/ ]);
});