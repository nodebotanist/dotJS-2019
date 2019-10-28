const Launchpad = require("launchpad-mk2")
const midi = require('midi')

// get Midi port for novation pad
const input = new midi.Input()
const ports = input.getPortCount()
let launchpadPort = 0;

for(let i=0; i<ports; i++) {
	if(input.getPortName(i) === 'Launchpad MK2') {
		launchpadPort = i
		console.log(`Launchpad found at port ${i}`)
	}
}

let myLaunchpad = new Launchpad({
	in: launchpadPort,
	out: launchpadPort
})

myLaunchpad.on("press", pressInfo => {
	if(pressInfo.button) console.log(pressInfo.button.note, pressInfo.button.x, pressInfo.button.y, pressInfo.velocity)
	else console.log(pressInfo)
})

myLaunchpad.on("release", button => {
	console.log(button.note, button.x, button.y)
})

myLaunchpad.lightAll(3)