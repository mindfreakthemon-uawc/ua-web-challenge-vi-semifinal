/**
 * Visualizer module used for providing with d3 chart bar and analyser node
 */
define(['state', 'd3'],
	function (state, d3) {
		var context = state.context,
			visualizer = document.getElementById('visualizer'),
			analyserNode = context.createAnalyser(),
			frequencyArray = new Uint8Array(analyserNode.frequencyBinCount);

		function frequencyValue(frequency) {
			var index = Math.round(frequency / (context.sampleRate / 2) * frequencyArray.length);

			return frequencyArray[index];
		}

		function draw(data) {
			var bars = svg.selectAll('.bar').data(data);

			bars.enter()
				.append('rect')
				.attr('class', 'bar');

			bars
				.attr('x', function (d) {
					return x(d.letter);
				})
				.attr('width', x.rangeBand())
				.attr('y', function (d) {
					return y(d.frequency);
				})
				.attr('height', function (d) {
					return height - y(d.frequency);
				});
		}

		function redraw() {
			if (state.sourceNode &&
				!state.sourceNode.mediaElement.paused) {
				analyserNode.getByteFrequencyData(frequencyArray);

				draw(state.frequencies
					.map(function (frequency) {
						return {
							letter: frequency,
							frequency: frequencyValue(frequency)
						};
					}));
			}

			requestAnimationFrame(redraw);
		}

		var margin = { top: 20, right: 20, bottom: 30, left: 40 },
			width = 960 - margin.left - margin.right,
			height = 200 - margin.top - margin.bottom;

		var x = d3.scale.ordinal()
			.domain(state.frequencies)
			.rangeRoundBands([0, width], 0.1);

		var y = d3.scale.linear()
			.domain([0, 255])
			.range([height, 0]);

		var xAxis = d3.svg.axis()
			.scale(x)
			.tickFormat(state.frequencyFormatter)
			.orient('bottom');

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient('left')
			.ticks(10);

		var svg = d3.select('#visualizer')
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.attr('preserveAspectRatio', 'xMidYMid')
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		svg.append('g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + height + ')')
			.call(xAxis);

		svg.append('g')
			.attr('class', 'y axis')
			.call(yAxis)
			.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('y', 6)
			.attr('dy', '.71em')
			.style('text-anchor', 'end')
			.text('Frequency');

		redraw();

		state.addNode(analyserNode);

		return {
			node: analyserNode,
			visualizer: visualizer,
			svg: svg,
			draw: draw
		};
	});