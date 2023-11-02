class SGAction {

    startTime;

    paused = false;
    startTime = 0;
    endTime = 0;
    runtime = 0;
    startVal = 0;
    endVal = 0;
    running = false;

    caller = null;

    endFunc = null;

    style = 0;

    static curtime() {
        return new Date().getTime();
    }

    constructor(time, startV, endV, enumVar, end) {
        this.runtime = time * 1000;
        this.startVal = startV;
        this.endVal = endV;
        this.caller = enumVar;
        this.endFunc = end === null ?  (e) => {} : end;
    }

    formula(mode) {
        this.style = mode;
        return this;
    }

    start() {
        this.startTime = SGAction.curtime();
        this.endTime = this.startTime + this.runtime;
        this.running = true;
    }

    end() {
        this.running = false;
        this.endFunc();
    }

    pause() {

    }

    getPercent() {
        if (this.runtime == 0) return 0;
        return (SGAction.curtime() - this.startTime) / this.runtime;
    }

    getValue() {
        var p = this.getPercent();
        if (p >= 1.0) {
            this.end();
            return this.endVal;
        }
        if (this.style == 1) {
            p = 1 - p;
            p = p * p;
            p = 1 - p;
        }
        if (this.style == 2) {
            p = p * p;
        }
        if (this.style == 3) {
            if (p < 0.5)
                p = ((p * 2) * (p * 2))/2;
            if (p > 0.5) {
                p -= 0.5;
                p = p * 2;
                p = (1-p) * (1-p);
                p = 1 - (p/2);
            }
        }
        var amt = p * (this.endVal - this.startVal);
        return this.startVal + amt;
    }

    update(delta) {
        if (this.target === null) return 1;
        if (!this.running) return 0;

        this.caller(this.getValue());

        if (!this.running) { return 1; }

        return 0;
    }

}
