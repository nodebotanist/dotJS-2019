const midi = require('midi');
const tonal = require('tonal')

// Set up a new input.
const input = new midi.Input();

// Count the available input ports.
const portCount = input.getPortCount()

// Get the name of a specified input port.
for(let i = 0; i < portCount; i++) {
  console.log(i, input.getPortName(i))
}

let currentNote = null
let messageTime

// Configure a callback.
input.on('message', (deltaTime, message) => {
  messageTime = Date.now()
  let note = tonal.Note.fromMidi(message[1])
  let negative = note.indexOf('-') !== -1
  let scale = Number.parseInt(note.charAt(note.length - 1), 10)
  if(scale < 4 && scale >= 0 && deltaTime > 0.2  && !negative){
    // console.log(`m: ${message} d: ${deltaTime}`)
    // console.log(`Note: ${note}`)
    currentNote = note
  }
});

setInterval(() => {
  console.log(currentNote, messageTime)
  if(Date.now() - messageTime >= 1000){
    currentNote = null
    messageTime = null
  }
}, 100)

// Open the first available input port.
input.openPort(0);
