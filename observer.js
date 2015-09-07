var TEST_OBJECT = document.querySelector('#test');

var observer = observer || (function () {
	var eventMap = {};
	console.log('observer object created');

	function register(event, target, callback) {
		if (eventMap[event] === undefined) {
			eventMap[event] = [];
		}

		eventMap[event].push({
			target: target,
			callback: callback
		});
	}

	function notify(event, message) {
		if (eventMap[event] === undefined) {
			throw new Error(event + ' event is not supported');
		}

		var citizens = eventMap[event];

		citizens.forEach(function (citizen) {
			citizen.callback.call(citizen.target, message);
		});
	}

	function show() {
		return Object.keys(eventMap).length > 0 ? eventMap : 'Observer is empty.';
	}

	return {
		register: register,
		notify: notify,
		show: show
	}
})();