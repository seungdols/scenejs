import {isObject, has} from "./utils";
/**
* attach and trigger event handlers.
*/
class EventTrigger {
	constructor() {
		this._events = {};
	}
	/**
	* Attach an event handler function for one or more events to target
	* @param {String} name - event's name
	* @param {Function} callback -  function to execute when the event is triggered.
	* @return {EventTrigger} An Instance itself.
	* @example
target.on("animate", function() {
	console.log("animate");
});

target.trigger("animate");

	*/
	on(name, callback) {
		const events = this._events;
		let i;
		let j;

		if (isObject(name)) {
			for (i in name) {
				this.on(i, name[i]);
			}
			return this;
		}
		if (!has(events, name)) {
			events[name] = [];
		}

		if (isObject(callback)) {
			for (j in callback) {
				this.on(name, callback[j]);
			}
			return this;
		}
		const event = events[name];

		event.push(callback);

		return this;
	}
	/**
	* Dettach an event handler function for one or more events to target
	* @param {String} name - event's name
	* @param {Function} callback -  function to execute when the event is triggered.
	* @return {EventTrigger} An Instance itself.
	* @example
const callback = function() {
	console.log("animate");
};
target.on("animate", callback);

target.off("animate", callback);
target.off("animate");

	*/
	off(name, callback) {
		if (!name) {
			this._events = {};
		} else if (!callback) {
			this._events[name] = [];
		} else {
			const callbacks = this._events[name];

			if (!callbacks) {
				return this;
			}
			const index = callbacks.indexOf(callback);

			if (index !== -1) {
				callbacks.splice(index, 1);
			}
		}
		return this;
	}
	/**
	* Check if event handler has been attached once
	* @param {String} name - event's name
	* @return {Boolean} Returns true if at least one has been attached.
	* @example
const callback = function() {
	console.log("animate");
};
console.log(target.hasOn("animate")); // false
target.on("animate", callback);

console.log(target.hasOn("animate")); // true

	*/
	hasOn(name) {
		const events = this._events;
		const event = events[name];

		return event && event.length;
	}
	/**
	* execute event handler
	* @param {String} name - event's name
	* @param {Function} [data] - event handler's additional parameter
	* @return {EventTrigger} An Instance itself.
	* @example
target.on("animate", function(a1, a2) {
	console.log("animate", a1, a2);
});

target.trigger("animate", [1, 2]); // log => "animate", 1, 2

	*/
	trigger(name, ...data) {
		const events = this._events;

		if (!has(events, name)) {
			return this;
		}

		const event = events[name];

		if (data.length) {
			data[0].type = name;
			data[0].currentTarget = this;
		}
		event.forEach(callback => {
			callback.apply(this, data);
		});

		return this;
	}
}
EventTrigger.defaultEvents = {};
export default EventTrigger;