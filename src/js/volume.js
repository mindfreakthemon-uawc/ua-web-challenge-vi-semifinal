/**
 * Volume module for providing with volume controls and gain node
 */
define(['state'],
	function (state) {
		var context = state.context,
			volume = document.getElementById('volume'),
			gainNode = context.createGainNode();

		gainNode.gain.value = 1;

		volume.addEventListener('change', function (e) {
			var input = e.target;

			gainNode.gain.value = input.valueAsNumber;
		});

		state.addNode(gainNode);

		return {
			node: gainNode,
			volume: volume
		};
	});