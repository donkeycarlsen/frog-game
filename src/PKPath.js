class PKPath {

    positions = [{startPercent: 0, position: [0.5, 0.5], percfunc: undefined}];
    offset = 0
    shift = [0,0]
    reversed = false
    percfunc = undefined

    /*
        Docs: No lol
    */

    linearPosition = () => (perc => perc)
    easeInPosition = (factor) => (perc => (Math.pow(perc, factor)))
    easeOutPosition = (factor) => (perc => (Math.pow(perc, 1/factor)))
    
    easeInAndOutPosition = (factor) => (perc => {
        var useperc = perc < 0.5 ? perc : 1 - perc
        var sqt = Math.pow(useperc, factor);
        var val =  sqt / (2.0 * (sqt - useperc) + 1.0)
        return perc < 0.5 ? val : -val+1
    })
    sinwobble = (percfunc, amplitude, periods) => (
        (perc) => {
        var sin = amplitude * Math.sin(perc * Math.PI*2*periods)
        return percfunc(Math.max(0, Math.min(1, perc + sin)))
        }
    )
    invertFunc = (func) => (val => 1 - func(1 - val))
    semiInvertFunc = (func) => (val => func(1 - val))
    overshoot = (factor) => (perc => (perc))
    delayPerc = (startAt, originalFunc) => ((perc) => (perc > startAt ? originalFunc((perc - startAt) / (1 - startAt)) : 0))

    constructor(points=null) {
        if (points != null) {
            this.setFromPoints(points)
        }
    }

    static pathByWidth(width, centered = true) {
        var shift = centered ? width/2 : 0
        return new PKLaserPath([[0.5 - shift, 0.5], [0.5 - shift + width, 0.5]])
    }

    static pathByRadius(radius) {
        var c = 0.552284749831*radius
        var p = new PKLaserPath([
            [0.5 - radius, 0.5], //leftmost
            [0.5 - radius, 0.5 - c],
            [0.5 - c, 0.5 - radius],

            [0.5, 0.5 - radius], //topmost
            [0.5 + c, 0.5 - radius],
            [0.5 + radius, 0.5 - c],

            [0.5 + radius, 0.5], //rightmost
            [0.5 + radius, 0.5 + c],
            [0.5 + c, 0.5 + radius],

            [0.5, 0.5 + radius], //bottommost
            [0.5 - c, 0.5 + radius],
            [0.5 - radius, 0.5 + c],

            [0.5 - radius, 0.5] //leftmost
        ])
        p.positions = p.positions.map((p, pind) => {
            return {...p, type: [1,2, 4,5, 7,8, 10,11].includes(pind) ? 'bezier' : undefined}
        })

        return p
    }

    setArch = (bottom, height, width=0.9, sharpness=0) => {
        this.setFromPoints([
            [0.5 - width/2, bottom],
            [0.5 - width/2 + (sharpness*width/2), bottom - height],
            [0.5 + width/2 - (sharpness*width/2), bottom - height],
            [0.5 + width/2, bottom]
        ])
        this.positions[1].type = 'bezier'
        this.positions[2].type = 'bezier'
    }

    setFromPoints = (points) => {
        this.positions = points.map((p, ind) => {
            var pt = p.slice(0, 2);
            return {startPercent: ind / (points.length - 1), position: pt }
        })
        this.positions = this.positions.filter((pt, pind) => {
            return pind == 0 || (pt.position[0] != pt.position)
        })
    }

    skewPoints = (factor) => {
        this.positions = this.positions.map(p => {
            return {...p, startPercent: Math.pow(p.startPercent, factor)}
        })
    }

    blendNumbers = (start, end, percent) => {
        return (start + (end - start) * percent)
        }





        blendPositions = (pos1, pos2, percent) => {
            return [this.blendNumbers(pos1[0], pos2[0], percent), this.blendNumbers(pos1[1], pos2[1], percent)]
        }



    shiftPt = (pt, offset) => {
        return [pt[0] + offset[0], pt[1] + offset[1]]
    }



    DUPE = () => {
        this.positions = this.positions.concat(this.positions.map((p, pind) => {
            return {...p, startPercent: p.startPercent + 1}
        }))
        this.positions = this.positions.map((p, pind) => {
            return {...p, startPercent: p.startPercent / 2}
        })
    }

    static distance = (p1, p2) => {
        return Math.sqrt(Math.pow(p1[1]-p2[1], 2) + Math.pow(p1[0]-p2[0], 2))
    }

    getRotation = (percent) => {
        var p1 = this.getPosition(percent)
        var iota = 0.001
        var p2 = percent > 1 - iota ? this.getPosition(percent - iota) : this.getPosition(percent + iota)

        if (p2[0] - p1[0] == 0) {
            return Math.PI/2
            } else {
            return Math.atan((p2[1] - p1[1]) / (p2[0] - p1[0]))
            }
    }
    bezier = (ps, percent) => {
        if (ps.length > 3) {
            var tangentPts = []
            for (var t = 0; t < ps.length - 1; t++) {
                tangentPts.push(
                    this.blendPositions(ps[t], ps[t+1], percent)
                )
            }
            return this.bezier(tangentPts, percent)
        }
        var tangentLine = [
            this.blendPositions(ps[0], ps[1], percent),
            this.blendPositions(ps[1], ps[2], percent)
        ]
        return this.blendPositions(tangentLine[0], tangentLine[1], percent)
    }

    getPosition = (percent, tangentOffset=0) => {
        percent = percent + this.offset
        if (percent != 1)
            percent = (Math.abs(percent) - Math.floor(Math.abs(percent)))
        if (this.percfunc != undefined)
            percent = this.percfunc(percent)
        if (this.reversed)
            percent = 1 - percent
        var startPositionIndex = 0;
        while ((startPositionIndex != this.positions.length - 1 && this.positions[startPositionIndex + 1].startPercent < percent)) {
            startPositionIndex += 1
        }
        while (this.positions[startPositionIndex].type == 'bezier') {
            startPositionIndex --
        }
        if (startPositionIndex == this.positions.length - 1) {
            return this.shiftPt(this.positions[startPositionIndex].position, this.shift);
        } else {
            var nextPt = this.positions[startPositionIndex + 1];
            var startPt = this.positions[startPositionIndex];
            var toffset = [0, 0]
            if (tangentOffset != 0) {
                if (nextPt.type == 'bezier') {
                    //COSTLY AS FUCK...
                    var controlPoint1 = this.getPosition(percent - 0.01, 0)
                    var controlPoint2 = this.getPosition(percent + 0.01, 0)

                    var tangentSlope = -(controlPoint2[1] - controlPoint1[1]) / Math.abs(controlPoint2[0] - controlPoint1[0])
                    var tAngle = Math.atan(tangentSlope);
                    if (tAngle == Infinity) tAngle = 9999;
                    if (tAngle == -Infinity) tAngle = -9999;
                    if (tAngle == NaN) tAngle = 0;
                    toffset = [tangentOffset * Math.sin(tAngle), tangentOffset * Math.cos(tAngle)]
                    if (controlPoint2[0] - controlPoint1[0] < 0) {
                        toffset = [toffset[0], -toffset[1]]
                    }
                } else {
                    var tangentSlope = -(nextPt.position[1] - startPt.position[1]) / Math.abs(nextPt.position[0] - startPt.position[0])
                    var tAngle = Math.atan(tangentSlope);
                    if (tAngle == Infinity) tAngle = 9999;
                    if (tAngle == -Infinity) tAngle = -9999;
                    if (tAngle == NaN) tAngle = 0;
                    toffset = [tangentOffset * Math.sin(tAngle), tangentOffset * Math.cos(tAngle)]
                    if (nextPt.position[0] - startPt.position[0] < 0) {
                        toffset = [toffset[0], -toffset[1]]
                    }
                }
            }
            if (nextPt.type == undefined) {
                var distance = nextPt.startPercent - startPt.startPercent
                if (distance == 0) 
                    return this.shiftPt(startPt.position, this.shift);
                var intermediatePercent = (percent - startPt.startPercent) / distance
                if (nextPt.percfunc != undefined) intermediatePercent = nextPt.percfunc(intermediatePercent)
                var fin = this.blendPositions(startPt.position, nextPt.position, intermediatePercent)
                return this.shiftPt(this.shiftPt(fin, toffset), this.shift);
            } else if (nextPt.type == 'bezier') {
                var allPts = [startPt.position, nextPt.position]
                var posspt = startPositionIndex + 1
                while (this.positions[posspt].type == 'bezier') {
                    allPts.push(this.positions[posspt + 1].position)
                    posspt ++
                }
                var distance = this.positions[posspt].startPercent - startPt.startPercent
                if (distance == 0) 
                    return this.shiftPt(startPt.position, this.shift);
                var intermediatePercent = (percent - startPt.startPercent) / distance
                if (nextPt.percfunc != undefined) intermediatePercent = nextPt.percfunc(intermediatePercent)
                return this.shiftPt(this.shiftPt(this.bezier(allPts, intermediatePercent), toffset), this.shift)
            }

            console.log('Unsupported type');
            return [0.5, 0.5]
        }
    }

    clone = () => {
        var fin = new PKLaserPath()

        fin.positions = this.positions.map((p) => ({...p}))
        fin.offset = this.offset
        fin.shift = this.shift
        fin.reversed = this.reversed
        fin.percfunc = this.percfunc

        return fin
    }
}
