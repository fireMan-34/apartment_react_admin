class Observer {
    constructor() {
        this.callbackWorks = new Set();
        this.requestWorks = new Set();
        this.observe;
    }
    addObserve(observe) {
        this._checkObserve(observe);
        this.observe = observe;
    }
    addCallback(callback = data => { }) {
        this.callbackWorks.add(callback);
    }
    removeCallback(callback) {
        this.callbackWorks.delete(callback);
    }
    callback(data) {
        this.callbackWorks.forEach(callback => callback(data));
    }
    addRequest(request = data => { }) {
        this.requestWorks.add(request);
    }
    request() {
        const data = this.observe.getData();
        this.requestWorks.forEach(request => request(data))
    }
    destory() {
        this.observe = null;
        this.callbackWorks.clear();
        this.requestWorks.clear();
    }
    _checkObserve(observe) {
        if (!observe instanceof Observe) {
            throw new TypeError(`${observe} is not from Observe`)
        }
    }
}
class Observe {
    static OBSERVE_TYPE = {
        pull: "pull",
        push: "push",
    }
    static checkOBSERVE_TYPE(type) {
        if (!Object.keys(this.OBSERVE_TYPE).some(TYPE => TYPE === type)) {
            throw new TypeError(`${type} is not from Observe.OBSERVE_TYPE`);
        }
    }
    constructor(type) {
        Observe.checkOBSERVE_TYPE(type);
        this.type = type;
        this.data = {};
        this.Observers = new Set();
    }
    getData() {
        return this.data;
    }
    setData(data) {
        this.data = data;
        switch (this.type) {
            case Observe.OBSERVE_TYPE.pull:
                break;
            case Observe.OBSERVE_TYPE.push:
                this.Observers.forEach(observer => observer.callback(this.data));
                break;
            default: return
        }
    }
    addObserver(observer) {
        this._checkObserver(observer);
        this.Observers.add(observer);
        observer.addObserve(this);
    };
    removeObserver(observer) {
        this._checkObserver(observer);
        this.Observers.delete(observer);
    }
    destory() {
        this.Observers.forEach(observer => observer.destory());
        this.Observers.clear();
    }
    _checkObserver(observer) {
        if (!observer instanceof Observer) {
            throw new TypeError(`observer must extend Observer`)
        };
    }
}
const source = new Observe(Observe.OBSERVE_TYPE.pull);
const source1 = new Observe(Observe.OBSERVE_TYPE.push);
export {
    Observe, Observer, source, source1
}