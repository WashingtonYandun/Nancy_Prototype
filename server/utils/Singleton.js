export class Singleton {
    constructor() {
        if (new.target === Singleton) {
            throw new Error("Cannot instantiate Singleton class directly.");
        }
    }

    static get instance() {
        if (!this._instance) {
            this._instance = this.createInstance();
        }
        return this._instance;
    }

    static createInstance() {
        return new this();
    }
}

