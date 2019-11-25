const midi = require('midi')
const tonal = require('tonal')
const OPC = require('./opc')

// Set up a new input.
const input = new midi.Input();

// Count the available input ports.
const portCount = input.getPortCount()

// set up OPC connection for Fadecandy
const opcClient = new OPC('localhost', 7890)

// Find the port with i2M musicport in it-- that's the port we want
let port

for(let i = 0; i < portCount; i++) {
  let portName = input.getPortName(i)
  console.log(i, portName)
  if (portName.indexOf('i2M musicport') !== -1) {
    port = i
  }
}

let currentNote = null
let messageTime
let currentDelta

// Configure a callback.
input.on('message', (deltaTime, message) => {
  messageTime = Date.now()
  let note = tonal.Note.fromMidi(message[1])
  let negative = note.indexOf('-') !== -1
  let scale = Number.parseInt(note.charAt(note.length - 1), 10)
  if(scale < 4 && scale >= 0 && !negative && deltaTime > 0.075){
    // console.log(`m: ${message} d: ${deltaTime}`)
    // console.log(`Note: ${note}`)
    currentNote = note
    currentDelta = deltaTime
  }
});

setInterval(() => {
  console.log(currentNote, messageTime, currentDelta)
  if(Date.now() - messageTime >= 1000){
    currentNote = null
    messageTime = null
  }
}, 200)

// Open the first available input port.
input.openPort(port);
