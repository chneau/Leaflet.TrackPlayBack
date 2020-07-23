import L from 'leaflet'
import { isArray } from './util'


/**
 * Track class
 */
export const Track = L.Class.extend({

    initialize: function(trackData = [], options) {
        L.setOptions(this, options)

        trackData.forEach(item => {
            // Add the isOrigin field to identify whether it is the original sampling point, distinguish it from the interpolation point
            item.isOrigin = true
        })
        this._trackPoints = trackData
        this._timeTick = {}
        this._update()
    },

    addTrackPoint: function(trackPoint) {
        if (isArray(trackPoint)) {
            for (let i = 0, len = trackPoint.length; i < len; i++) {
                this.addTrackPoint(trackPoint[i])
            }
        }
        this._addTrackPoint(trackPoint)
    },

    getTimes: function() {
        const times = []
        for (let i = 0, len = this._trackPoints.length; i < len; i++) {
            times.push(this._trackPoints[i].time)
        }
        return times
    },

    getStartTrackPoint: function() {
        return this._trackPoints[0]
    },

    getEndTrackPoint: function() {
        return this._trackPoints[this._trackPoints.length - 1]
    },

    getTrackPointByTime: function(time) {
        return this._trackPoints[this._timeTick[time]]
    },

    _getCalculateTrackPointByTime: function(time) {
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
        startPt = L.point(p0.lng, p0.lat)
        endPt = L.point(p1.lng, p1.lat)
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
    getTrackPointsBeforeTime: function(time) {
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

    _addTrackPoint: function(trackPoint) {
        trackPoint.isOrigin = true
        this._trackPoints.push(trackPoint)
        this._update()
    },

    _update: function() {
        this._sortTrackPointsByTime()
        this._updatetimeTick()
    },

    // Track points are sorted by time 【Bubble sort】
    _sortTrackPointsByTime: function() {
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
    _updatetimeTick: function() {
        this._timeTick = {}
        for (let i = 0, len = this._trackPoints.length; i < len; i++) {
            this._timeTick[this._trackPoints[i].time] = i
        }
    }
})

export const track = function(trackData, options) {
    return new Track(trackData, options)
}