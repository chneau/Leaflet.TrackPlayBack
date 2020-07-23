import L from 'leaflet'

export const TrackPlayBackControl = L.Control.extend({

  options: {
    position: 'topright',
    showOptions: true,
    showInfo: true,
    showSlider: true,
    autoPlay: true
  },

  initialize: function (trackplayback, options) {
    L.Control.prototype.initialize.call(this, options)
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
    this._container = L.DomUtil.create('div', className)
    L.DomEvent.disableClickPropagation(this._container)

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
    this._closeBtn = this._createButton('close', 'btn-close', this._buttonContainer, this._close)

    this._infoStartTime = this._createInfo('start: ', this.getTimeStrFromUnix(this.trackPlayBack.getStartTime()), 'info-start-time', this._infoContainer)
    this._infoEndTime = this._createInfo('end: ', this.getTimeStrFromUnix(this.trackPlayBack.getEndTime()), 'info-end-time', this._infoContainer)
    this._infoCurTime = this._createInfo('cur: ', this.getTimeStrFromUnix(this.trackPlayBack.getCurTime()), 'info-cur-time', this._infoContainer)
    this._infoSpeedRatio = this._createInfo('speed: ', `x${this.trackPlayBack.getSpeed()}`, 'info-speed-ratio', this._infoContainer)

    this._slider = this._createSlider('time-slider', this._sliderContainer, this._scrollchange)

    return this._container
  },

  _createContainer: function (className, container) {
    return L.DomUtil.create('div', className, container)
  },

  _createCheckbox: function (labelName, className, container, fn) {
    const divEle = L.DomUtil.create('div', className + ' trackplayback-checkbox', container)

    const inputEle = L.DomUtil.create('input', 'trackplayback-input', divEle)
    const inputId = `trackplayback-input-${L.Util.stamp(inputEle)}`
    inputEle.setAttribute('type', 'checkbox')
    inputEle.setAttribute('id', inputId)

    const labelEle = L.DomUtil.create('label', 'trackplayback-label', divEle)
    labelEle.setAttribute('for', inputId)
    labelEle.innerHTML = labelName

    L.DomEvent.on(inputEle, 'change', fn, this)

    return divEle
  },

  _createButton: function (title, className, container, fn) {
    const link = L.DomUtil.create('a', className, container)
    link.href = '#'
    link.title = title

    /*
         * Will force screen readers like VoiceOver to read this as "Zoom in - button"
         */
    link.setAttribute('role', 'button')
    link.setAttribute('aria-label', title)

    L.DomEvent.disableClickPropagation(link)
    L.DomEvent.on(link, 'click', fn, this)

    return link
  },

  _createInfo: function (title, info, className, container) {
    const infoContainer = L.DomUtil.create('div', 'info-container', container)
    const infoTitle = L.DomUtil.create('span', 'info-title', infoContainer)
    infoTitle.innerHTML = title
    const infoEle = L.DomUtil.create('span', className, infoContainer)
    infoEle.innerHTML = info
    return infoEle
  },

  _createSlider: function (className, container, fn) {
    const sliderEle = L.DomUtil.create('input', className, container)
    sliderEle.setAttribute('type', 'range')
    sliderEle.setAttribute('min', this.trackPlayBack.getStartTime())
    sliderEle.setAttribute('max', this.trackPlayBack.getEndTime())
    sliderEle.setAttribute('value', this.trackPlayBack.getCurTime())

    L.DomEvent.on(sliderEle, 'click mousedown dbclick', L.DomEvent.stopPropagation)
      .on(sliderEle, 'click', L.DomEvent.preventDefault)
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
    const hasClass = L.DomUtil.hasClass(this._playBtn, 'btn-stop')
    if (hasClass) {
      L.DomUtil.removeClass(this._playBtn, 'btn-stop')
      L.DomUtil.addClass(this._playBtn, 'btn-start')
      this._playBtn.setAttribute('title', 'stop')
      this.trackPlayBack.start()
    } else {
      L.DomUtil.removeClass(this._playBtn, 'btn-start')
      L.DomUtil.addClass(this._playBtn, 'btn-stop')
      this._playBtn.setAttribute('title', 'play')
      this.trackPlayBack.stop()
    }
  },

  _restart: function () {
    // start playing and change the play button style
    L.DomUtil.removeClass(this._playBtn, 'btn-stop')
    L.DomUtil.addClass(this._playBtn, 'btn-start')
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
    L.DomUtil.remove(this._container)
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
      L.DomUtil.removeClass(this._playBtn, 'btn-start')
      L.DomUtil.addClass(this._playBtn, 'btn-stop')
      this._playBtn.setAttribute('title', 'play')
      this.trackPlayBack.stop()
    }
  }
})

export const trackplaybackcontrol = function (trackplayback, options) {
  return new TrackPlayBackControl(trackplayback, options)
}
