const Tone = require('tone')
//create a synth and connect it to the master output (your speakers)
console.log(document.querySelector('#start'))
document.querySelector('#start').addEventListener('click', () => {
	console.log('playing note')
	Tone.context.resume();
	var synth = new Tone.Synth().toMaster();

	//play a middle 'C' for the duration of an 8th note
	synth.triggerAttackRelease("C4", "8n");
})