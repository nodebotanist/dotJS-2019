/*
 * Simple Open Pixel Control client for Node.js
 *
 * 2013-2014 Micah Elizabeth Scott
 * This file is released into the public domain.
 */

var net = require('net');
var fs = require('fs');


/********************************************************************************
 * Core OPC Client
 */

var OPC = function(host, port)
{
    this.host = host;
    this.port = port;
    this.pixelBuffer = null;
};

OPC.prototype._reconnect = function()
{
    var _this = this;

    this.socket = new net.Socket()
    this.connected = false;

    this.socket.onclose = function() {
        console.log("Connection closed");
        _this.socket = null;
        _this.connected = false;
    }

    this.socket.on('error', function(e){
        if(e.code == 'ECONNREFUSED' || e.code == 'ECONNRESET') {
            _this.socket = null;
            _this.connected = false;
        }
    });

    this.socket.connect(this.port, this.host, function() {
        console.log("Connected to " + _this.socket.remoteAddress);
        _this.connected = true;
        _this.socket.setNoDelay();
    });
}

OPC.prototype.writePixels = function()
{
    if (!this.socket) {
        this._reconnect();
    }
    if (!this.connected) {
        return;
    }
    this.socket.write(this.pixelBuffer);
}

OPC.prototype.setPixelCount = function(num)
{
    var length = 4 + num*3;
    if (this.pixelBuffer == null || this.pixelBuffer.length != length) {
        let bufferArray = []
        for(let i=0; i < length; i++) {
            bufferArray.push(0x00)
        }
        this.pixelBuffer = Buffer.from(bufferArray);
    }

    // Initialize OPC header
    this.pixelBuffer.writeUInt8(0, 0);           // Channel
    this.pixelBuffer.writeUInt8(0, 1);           // Command
    this.pixelBuffer.writeUInt16BE(num * 3, 2);  // Length
}

OPC.prototype.setPixel = function(num, r, g, b)
{
    var offset = 4 + num*3;
    if (this.pixelBuffer == null || offset + 3 > this.pixelBuffer.length) {
        this.setPixelCount(num + 1);
    }

    this.pixelBuffer.writeUInt8(Math.max(0, Math.min(255, r | 0)), offset);
    this.pixelBuffer.writeUInt8(Math.max(0, Math.min(255, g | 0)), offset + 1);
    this.pixelBuffer.writeUInt8(Math.max(0, Math.min(255, b | 0)), offset + 2);
}

module.exports = OPC;
