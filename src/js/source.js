/**
 * Source module creates MediaElementSourceNode and holds HTMLAudioElement
 */
define(['state'],
	function (state) {
		var context = state.context,
			audio = new Audio();

		state.addSource(context.createMediaElementSource(audio));

		return {
			audio: audio
		};
	});