define(['state', 'd3', 'visualizer'],
	function (state, d3, visualizer) {
		module('Visualizer Test');

		test('visualizer should define an analyser node', function () {
			equal(typeof visualizer.node, 'object', 'exists');

			ok(visualizer.node instanceof AnalyserNode, 'instance of AnalyserNode');
		});

		test('visualizer should not fail to draw bars', function () {
			var data = state.frequencies
				.map(function (frequency) {
					return {
						letter: frequency,
						frequency: Math.floor(Math.random() * 255)
					};
				});

			try {
				visualizer.draw(data);
			} catch(e) {
				ok(false, 'failed');
				return;
			}

			ok(true, 'not failed')
		});
	});
