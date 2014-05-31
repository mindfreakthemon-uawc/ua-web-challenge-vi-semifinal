define(['state', 'equalizer'],
	function (state, equalizer) {
		module('Equalizer Test');

		test('equalizer should define an array with nodes', function () {
			equal(typeof equalizer.nodes, 'object', 'exists');

			ok(equalizer.nodes instanceof Array, 'instance of Array');
		});

		test('equalizer should define all audio nodes', function () {
			equal(equalizer.nodes.length, state.frequencies.length, 'all nodes were defined');
		});

		if (state.frequencies.length) {
			test('changing any input should respectively change gain value', function () {
				var input = equalizer.equalizer.querySelector('input'),
					node = equalizer.map[input.dataset.key];

				equal(node.gain.value, input.valueAsNumber, 'equals before the change');

				input.value = -1;
				input.dispatchEvent(new Event('change', {
					bubbles: true,
					cancelable: true
				}));

				equal(node.gain.value, input.valueAsNumber, 'equals after the change');
			});
		}
	});
