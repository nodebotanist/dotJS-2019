const Tone = require('tone')
//create a synth and connect it to the master output (your speakers)
let synth = new Tone.Synth({
	volume: 0
}).toMaster();

document.querySelector('#start').addEventListener('click', () => {
	Tone.context.resume();
	Tone.Transport.bpm.value = 145 * 2
	Tone.Transport.timeSignature = 6
	// create an array of notes to be played
	const notes = ["A#1", [null], null, null, null, [null, "C2"], "B#1", [[null]], "B1", "B1", null, null, null, [null, "B1"],null, [null, "B1"] ];
	// create a new sequence with the synth and notes
	const synthPart = new Tone.Sequence(
		function (time, note) {
			synth.triggerAttackRelease(note, "10hz", time);
		},
		notes,
		"4n"
	);
	// Setup the synth to be ready to play on beat 1
	synthPart.start();
	Tone.Transport.start();
})

function beginningMeasures() {
		Tone.context.resume();
		synth.triggerAttackRelease("A#2", "16n");
		// synth.volume.value = 0
		synth.triggerAttackRelease("C4", "32n");
		synth.triggerAttackRelease("C4", "16n");
		synth.triggerAttackRelease("C4", "16n");
		// synth.volume.value = 4
		synth.triggerAttackRelease("C2", "16n");
		synth.triggerAttackRelease("B#2", "8n");
		synth.triggerAttackRelease("B2", "16n");
		synth.triggerAttackRelease("B2", "8n");
}