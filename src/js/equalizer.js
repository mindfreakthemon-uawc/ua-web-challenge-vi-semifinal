/**
 * Equalizer module used for providing with filters and displaying controls for them
 */
define(['state', 'templates'],
	function (state, templates) {
		var context = state.context,
			equalizer = document.getElementById('equalizer'),
			filtersMap = {};

		equalizer.addEventListener('change', function (e) {
			var input = e.target,
				frequency = input.dataset.key,
				filterNode = filtersMap[frequency];

			filterNode.gain.value = input.valueAsNumber;
		});

		equalizer.innerHTML = templates.filters({
			frequencies: state.frequencies,
			formatter: state.frequencyFormatter
		});

		var nodes = state.frequencies
			.map(function (frequency) {
				var filterNode = context.createBiquadFilter();

				filterNode.type = 5;
				filterNode.gain.value = 0;
				filterNode.Q.value = 1;
				filterNode.frequency.value = frequency;

				filtersMap[frequency] = filterNode;

				return filterNode;
			});

		state.addNodes(nodes);

		return {
			nodes: nodes,
			map: filtersMap,
			equalizer: equalizer
		};
	});