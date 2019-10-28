const Launchpad = require("./node-launchpad-mk2/src/index")

let myLaunchpad = new Launchpad({})

myLaunchpad.on("press", pressInfo => {
	if(pressInfo.button) console.log(pressInfo.button.note, pressInfo.button.x, pressInfo.button.y, pressInfo.velocity)
	else console.log(pressInfo)
})

myLaunchpad.on("release", button => {
	console.log(button.note, button.x, button.y)
})

myLaunchpad.lightAll(3)