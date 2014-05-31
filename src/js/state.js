/**
 * State module holds audio context and frequency parameters
 */
define(function () {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;

	var context = new AudioContext(),
		chain = [];

	function connect() {
		var prev;

		if (!chain) {
			return;
		}

		chain
			.forEach(function (node) {
				if (prev) {
					prev.connect(node);
				}

				prev = node;
			});

		prev.connect(context.destination);
	}

	return {
		context: context,
		frequencies: [50, 100, 200, 400, 800, 1500, 2200, 3000, 5000, 7000, 10000, 15000],
		frequencyFormatter: function (frequency) {
			return (frequency > 1e3 ? (frequency / 1e3).toFixed(1) + 'M' : frequency) + 'Hz';
		},
		sourceNode: null,
		addSource: function (node) {
			this.sourceNode = node;
			this.addNode(node);
		},
		addNode: function (node) {
			chain.push(node);
		},
		addNodes: function (nodes) {
			chain.push.apply(chain, nodes);
		},
		connect: connect
	};
});