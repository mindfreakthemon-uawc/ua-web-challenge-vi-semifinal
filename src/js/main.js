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
		'state',
		'source',
		'volume',
		'equalizer',
		'visualizer'
	],
	function (_, state, source) {
		var fileEntry,
			fileObjectURL,
			file = document.getElementById('file'),
			upload = document.getElementById('upload'),
			unload = document.getElementById('unload'),
			toggle = document.getElementById('toggle'),
			scene = document.getElementById('scene');

		/**
		 * @type {HTMLMediaElement}
		 */
		var audio = source.audio;

		state.connect();

		audio.addEventListener('canplaythrough', function () {
			audio.play();
		});

		file.addEventListener('change', function (e) {
			fileEntry = e.target.files[0];
			fileObjectURL = URL.createObjectURL(fileEntry);

			file.value = null;

			upload.classList.add('hidden');
			scene.classList.remove('hidden');

			audio.src = fileObjectURL;
			audio.load();
		});

		toggle.addEventListener('click', function (e) {
			if (audio.paused) {
				audio.play();
			} else {
				audio.pause();
			}
		});

		unload.addEventListener('click', function () {
			audio.src = null;
			audio.load();

			URL.revokeObjectURL(fileObjectURL);

			scene.classList.add('hidden');
			upload.classList.remove('hidden');
		});
	});
