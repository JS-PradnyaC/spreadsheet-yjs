import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import * as awarenessProtocol from 'y-protocols/awareness'

var express = require('express');
// Initialise Express
var app = express();
// Render static files
app.use(express.static('../codebase'));



const ydoc = new Y.Doc()
// clients connected to the same room-name share document updates
const provider = new WebrtcProvider('webrtc-test', ydoc, 
{ 
  signaling :['ws://localhost:4444'],
  password: null ,
  awareness :new awarenessProtocol.Awareness(ydoc),
  maxConns:20,
  filterBcConns: true,
  peerOpts:{}
})
const yarray = ydoc.get('array', Y.Array)

provider.on('synced', synced => {
  // NOTE: This is only called when a different browser connects to this client
  // Windows of the same browser communicate directly with each other
  // Although this behavior might be subject to change.
  // It is better not to expect a synced event when using y-webrtc
  console.log('synced!', synced)
})

yarray.observeDeep(() => {
  console.log('yarray updated: ', yarray.toJSON())
})

// Port website will run on
app.listen(8081);