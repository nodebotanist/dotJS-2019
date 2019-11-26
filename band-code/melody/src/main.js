const Tone = require('tone')

console.log('creating socket')
// create a websocket connection to Maestro
const ws = new WebSocket('ws://localhost:8081')

ws.addEventListener('open', () => {
	ws.send('melodyConnected')
})

ws.addEventListener('message', (event) => {
	console.log(`Recieved: ${event.data}`)
	if(event.data === 'startPlaying'){
		playSong()
	}
})

//create a synth and connect it to the master output (your speakers)
let synth = new Tone.FMSynth({
	volume: 0
}).toMaster();

let bassSynth = new Tone.Synth().toMaster()

document.querySelector('#start').addEventListener('click', () => {
	ws.send('startSong')
})

function playSong() {
	Tone.context.resume();
	Tone.Transport.bpm.value = 120 
	Tone.Transport.timeSignature.value = 1


	// create an array of notes to be played
	const notes = beginningMeasures()
		.concat(beginningMeasures())
		.concat(middleMeasures())
		.concat(beginningMeasures())
		.concat(beginningMeasures())
		.concat(middleMeasures())
		.concat(["G5", null, null, null])
	// create a new sequence with the synth and notes
	const synthPart = new Tone.Sequence(
		function (time, note) {
			synth.triggerAttackRelease(note, "10hz", time);
		},
		notes,
		"4n"
	);
	synthPart.loop = false

	const bassSynthPart = new Tone.Sequence(
		function (time, note) {
			bassSynth.triggerAttackRelease(note, "10hz", time);
		},
		bassNotes,
		"4n"
	);
	bassSynthPart.loop = false

	// Setup the synth to be ready to play on beat 1
	synthPart.start();
	//bassSynthPart.start();
	Tone.Transport.start();
}

let bassNotes = [
	"D2", null, "E1", null, // E10, E0
	"B2", null, "B2", null, // E7, E7
	"G2", null, "G2", null, // E4, E4
	"G2", null, "F2", null, // E4, A8
	"D2", null, "E1", null, // E10, E0
	"B2", null, "B2", null, // E7, E7
	"G2", null, "G2", null, // E4, E4
	"G2", null, "F2", null, // E4, A8
	"E3", null, "F#3", null, // D2, D4
	"D3", null, "D3", null, // D0, D0
	"C3", null, "D3", null, // D10, D0
	"B3", null, "B3", null,// D9, D9
	"E3", null, "F#3", null, // D2, D4
	"D3", null, "D3", null, // D0, D0
	"A3", null, "A3", null, // D7, D7
	"A3", null, "E3", null, // D7, D4
	"D2", null, "E1", null, // E10, E0
	"B2", null, "B2", null, // E7, E7
	"G2", null, "G2", null, // E4, E4
	"G2", null, "F2", null, // E4, A8
	"D2", null, "E1", null, // E10, E0
	"B2", null, "B2", null, // E7, E7
	"G2", null, "G2", null, // E4, E4
	"G2", null, "F2", null, // E4, A8
	"E3", null, "F#3", null, // D2, D4
	"D3", null, "D3", null, // D0, D0
	"C3", null, "D3", null, // D10, D0
	"B3", null, "B3", null, // D9, D9
	"E3", null, "F#3", null, // D2, D4
	"D3", null, "D3", null, // D0, D0
	"A3", null, "A3", null, // D7, D7
	"A3", null, "E3", null, // D7, D4
	"G4", null, null, null // G0
]

function beginningMeasures() {
	return [
		"D5", ["B4", "G4"], ["E4", "D5"], ["B4", "G4"],
		"B4", "G4", "B4", [null, "A4"],
		["G4", ["G4", "A4"]], ["G4", "F4"], "G4", [null, "F4"],
		["G4", ["G4", "B4"]], ["D5", "E5"], "F5", null
	]
}

function middleMeasures() {
	return [
		"E5", ["C5", "A4"], ["F#4", "A4"], ["C5", "E5"],
		"D5", "G5", "D5", [null, "B4"],
		"C5", ["A4", "F#4"], ["D4", "F#4"], ["A4", "C5"],
		["B4", ["B4", "C5"]], ["B4", "A4"], "B4", null,
		"E5", ["C5", "A4"], ["F#4", "A4"], ["C5", "E5"],
		"D5", "G5", "D5", [null, "B4"],
		["A4", ["A4", "B4"]], ["A4", "G4"], "A4", [null, "G4"],
		["A4", ["A4", "B4"]], ["C5", "D5"], "E5", "F#5", 
	]
}