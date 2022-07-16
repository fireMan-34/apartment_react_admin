class SourcePipe {
    constructor() {
        this.pipes = new Set();
        this.flows = [];
    };
    addPipe(pipe) {
        this._checkIsPipe(pipe);
        this.pipes.add(pipe);
    };
    addPipes(...pipes) {
        pipes.forEach(pipe => this._checkIsPipe(pipe));
        pipes.forEach(pipe => this.pipes.add(pipe));
    }
    removePipe(pipe) {
        this._checkIsPipe(pipe);
        this.removePipe(pipe);
    }
    removePipes(...pipes) {
        pipes.forEach(pipe => this._checkIsPipe(pipe));
        pipes.forEach(pipe => this.pipes.delete(pipe));
    }
    clearPipes() {
        this.pipes.clear();
    };
    clearFlows() {
        this.flows = [];
    }
    destory() {
        this.clearFlows();
        this.clearPipes();
    }
    //input args
    createFlow(...args) {
        //output result
    };
    _checkIsPipe(pipe) {
        // if (!(pipe instanceof SourcePipe)) {
        //     throw new TypeError('pipe must be instance of SourcePipe')
        // }
    }
};
class SyncAndConectFlowerPipe extends SourcePipe {
    constructor(...args) {
        super(...args);
    };
    createFlow(...args) {
        this.flows = [...args];
        return [...this.pipes].reduce((result, pipe) => pipe(...result), this.flows)
    }
};
class SyncAndWithEffectPipe extends SourcePipe {
    constructor(...args) {
        super(...args);
    };
    createFlow(...args) {
        this.flows = [...args];
        return [...this.pipes].forEach(pipe => pipe(...this.flows));
    }
}
export {
    SourcePipe, SyncAndConectFlowerPipe
}