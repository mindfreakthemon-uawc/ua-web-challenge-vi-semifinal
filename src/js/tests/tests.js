require({
		baseUrl: 'js',
		paths: {
			jade: '../lib/jade/runtime',
			d3: '../lib/d3.min'
		},
		shim: {
			'd3': {
				exports: 'd3'
			}
		}
	}, [
		'config',
		'tests/visualizer',
		'tests/equalizer'
	],
	function () {
		QUnit.start();
	});
