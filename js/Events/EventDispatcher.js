class EventDispatcher {
    static instance;

    constructor() {
        this.events = {};
    }

    addListener(event, callback, callbackName) {
        if (typeof callback !== 'function') {
            console.error(`The listener callback must be a function, the given type is ${typeof callback}`);
            return false;
        }
        if (typeof event !== 'string') {
            console.error(`The event name must be a string, the given type is ${typeof event}`);
            return false;
        }
        if (typeof callbackName !== 'string') {
            console.error(`The callback name must be a string, the given type is ${typeof callbackName}`);
            return false;
        }

        if (this.events[event] === undefined) {
            this.events[event] = {
                listeners: []
            }
        }

        this.events[event].listeners.push({name: callbackName, callback: callback});
    }

    removeListener (event, callbackName) {
        if (this.events[event] === undefined) {
            console.error(`This event: ${event} does not exist`);
            return false;
        }

        this.events[event].listeners = this.events[event].listeners.filter(listener => {
            return listener.name !== callbackName;
        });
    }

    dispatch (event, details) {
        if (this.events[event] === undefined) {
            console.error(`This event: ${event} does not exist`);
            return false;
        }    this.events[event].listeners.forEach((listener) => {
            listener.callback(details);
        });
    }

    static getInstance() {
        if (this.instance === undefined) {
            this.instance = new EventDispatcher();
        }

        return this.instance;
    }
}
