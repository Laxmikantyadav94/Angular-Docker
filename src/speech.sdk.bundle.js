/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var keys = __webpack_require__(44);
var hasBinary = __webpack_require__(18);
var sliceBuffer = __webpack_require__(46);
var after = __webpack_require__(47);
var utf8 = __webpack_require__(48);

var base64encoder;
if (typeof ArrayBuffer !== 'undefined') {
  base64encoder = __webpack_require__(49);
}

/**
 * Check if we are running an android browser. That requires us to use
 * ArrayBuffer with polling transports...
 *
 * http://ghinda.net/jpeg-blob-ajax-android/
 */

var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

/**
 * Check if we are running in PhantomJS.
 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
 * https://github.com/ariya/phantomjs/issues/11395
 * @type boolean
 */
var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);

/**
 * When true, avoids using Blobs to encode payloads.
 * @type boolean
 */
var dontSendBlobs = isAndroid || isPhantomJS;

/**
 * Current protocol version.
 */

exports.protocol = 3;

/**
 * Packet types.
 */

var packets = exports.packets = {
    open:     0    // non-ws
  , close:    1    // non-ws
  , ping:     2
  , pong:     3
  , message:  4
  , upgrade:  5
  , noop:     6
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

/**
 * Create a blob api even for blob builder when vendor prefixes exist
 */

var Blob = __webpack_require__(50);

/**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */

exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = false;
  }

  if (typeof utf8encode === 'function') {
    callback = utf8encode;
    utf8encode = null;
  }

  var data = (packet.data === undefined)
    ? undefined
    : packet.data.buffer || packet.data;

  if (typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer) {
    return encodeArrayBuffer(packet, supportsBinary, callback);
  } else if (typeof Blob !== 'undefined' && data instanceof Blob) {
    return encodeBlob(packet, supportsBinary, callback);
  }

  // might be an object with { base64: true, data: dataAsBase64String }
  if (data && data.base64) {
    return encodeBase64Object(packet, callback);
  }

  // Sending data as a utf-8 string
  var encoded = packets[packet.type];

  // data fragment is optional
  if (undefined !== packet.data) {
    encoded += utf8encode ? utf8.encode(String(packet.data), { strict: false }) : String(packet.data);
  }

  return callback('' + encoded);

};

function encodeBase64Object(packet, callback) {
  // packet data is an object { base64: true, data: dataAsBase64String }
  var message = 'b' + exports.packets[packet.type] + packet.data.data;
  return callback(message);
}

/**
 * Encode packet helpers for binary types
 */

function encodeArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var data = packet.data;
  var contentArray = new Uint8Array(data);
  var resultBuffer = new Uint8Array(1 + data.byteLength);

  resultBuffer[0] = packets[packet.type];
  for (var i = 0; i < contentArray.length; i++) {
    resultBuffer[i+1] = contentArray[i];
  }

  return callback(resultBuffer.buffer);
}

function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var fr = new FileReader();
  fr.onload = function() {
    exports.encodePacket({ type: packet.type, data: fr.result }, supportsBinary, true, callback);
  };
  return fr.readAsArrayBuffer(packet.data);
}

function encodeBlob(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  if (dontSendBlobs) {
    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
  }

  var length = new Uint8Array(1);
  length[0] = packets[packet.type];
  var blob = new Blob([length.buffer, packet.data]);

  return callback(blob);
}

/**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */

exports.encodeBase64Packet = function(packet, callback) {
  var message = 'b' + exports.packets[packet.type];
  if (typeof Blob !== 'undefined' && packet.data instanceof Blob) {
    var fr = new FileReader();
    fr.onload = function() {
      var b64 = fr.result.split(',')[1];
      callback(message + b64);
    };
    return fr.readAsDataURL(packet.data);
  }

  var b64data;
  try {
    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
  } catch (e) {
    // iPhone Safari doesn't let you apply with typed arrays
    var typed = new Uint8Array(packet.data);
    var basic = new Array(typed.length);
    for (var i = 0; i < typed.length; i++) {
      basic[i] = typed[i];
    }
    b64data = String.fromCharCode.apply(null, basic);
  }
  message += btoa(b64data);
  return callback(message);
};

/**
 * Decodes a packet. Changes format to Blob if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */

exports.decodePacket = function (data, binaryType, utf8decode) {
  if (data === undefined) {
    return err;
  }
  // String data
  if (typeof data === 'string') {
    if (data.charAt(0) === 'b') {
      return exports.decodeBase64Packet(data.substr(1), binaryType);
    }

    if (utf8decode) {
      data = tryDecode(data);
      if (data === false) {
        return err;
      }
    }
    var type = data.charAt(0);

    if (Number(type) != type || !packetslist[type]) {
      return err;
    }

    if (data.length > 1) {
      return { type: packetslist[type], data: data.substring(1) };
    } else {
      return { type: packetslist[type] };
    }
  }

  var asArray = new Uint8Array(data);
  var type = asArray[0];
  var rest = sliceBuffer(data, 1);
  if (Blob && binaryType === 'blob') {
    rest = new Blob([rest]);
  }
  return { type: packetslist[type], data: rest };
};

function tryDecode(data) {
  try {
    data = utf8.decode(data, { strict: false });
  } catch (e) {
    return false;
  }
  return data;
}

/**
 * Decodes a packet encoded in a base64 string
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */

exports.decodeBase64Packet = function(msg, binaryType) {
  var type = packetslist[msg.charAt(0)];
  if (!base64encoder) {
    return { type: type, data: { base64: true, data: msg.substr(1) } };
  }

  var data = base64encoder.decode(msg.substr(1));

  if (binaryType === 'blob' && Blob) {
    data = new Blob([data]);
  }

  return { type: type, data: data };
};

/**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */

exports.encodePayload = function (packets, supportsBinary, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  var isBinary = hasBinary(packets);

  if (supportsBinary && isBinary) {
    if (Blob && !dontSendBlobs) {
      return exports.encodePayloadAsBlob(packets, callback);
    }

    return exports.encodePayloadAsArrayBuffer(packets, callback);
  }

  if (!packets.length) {
    return callback('0:');
  }

  function setLengthHeader(message) {
    return message.length + ':' + message;
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, !isBinary ? false : supportsBinary, false, function(message) {
      doneCallback(null, setLengthHeader(message));
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(results.join(''));
  });
};

/**
 * Async array map using after
 */

function map(ary, each, done) {
  var result = new Array(ary.length);
  var next = after(ary.length, done);

  var eachWithIndex = function(i, el, cb) {
    each(el, function(error, msg) {
      result[i] = msg;
      cb(error, result);
    });
  };

  for (var i = 0; i < ary.length; i++) {
    eachWithIndex(i, ary[i], next);
  }
}

/*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */

exports.decodePayload = function (data, binaryType, callback) {
  if (typeof data !== 'string') {
    return exports.decodePayloadAsBinary(data, binaryType, callback);
  }

  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var packet;
  if (data === '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

  var length = '', n, msg;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (chr !== ':') {
      length += chr;
      continue;
    }

    if (length === '' || (length != (n = Number(length)))) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    msg = data.substr(i + 1, n);

    if (length != msg.length) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    if (msg.length) {
      packet = exports.decodePacket(msg, binaryType, false);

      if (err.type === packet.type && err.data === packet.data) {
        // parser error in individual packet - ignoring payload
        return callback(err, 0, 1);
      }

      var ret = callback(packet, i + n, l);
      if (false === ret) return;
    }

    // advance cursor
    i += n;
    length = '';
  }

  if (length !== '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

};

/**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {ArrayBuffer} encoded payload
 * @api private
 */

exports.encodePayloadAsArrayBuffer = function(packets, callback) {
  if (!packets.length) {
    return callback(new ArrayBuffer(0));
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(data) {
      return doneCallback(null, data);
    });
  }

  map(packets, encodeOne, function(err, encodedPackets) {
    var totalLength = encodedPackets.reduce(function(acc, p) {
      var len;
      if (typeof p === 'string'){
        len = p.length;
      } else {
        len = p.byteLength;
      }
      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
    }, 0);

    var resultArray = new Uint8Array(totalLength);

    var bufferIndex = 0;
    encodedPackets.forEach(function(p) {
      var isString = typeof p === 'string';
      var ab = p;
      if (isString) {
        var view = new Uint8Array(p.length);
        for (var i = 0; i < p.length; i++) {
          view[i] = p.charCodeAt(i);
        }
        ab = view.buffer;
      }

      if (isString) { // not true binary
        resultArray[bufferIndex++] = 0;
      } else { // true binary
        resultArray[bufferIndex++] = 1;
      }

      var lenStr = ab.byteLength.toString();
      for (var i = 0; i < lenStr.length; i++) {
        resultArray[bufferIndex++] = parseInt(lenStr[i]);
      }
      resultArray[bufferIndex++] = 255;

      var view = new Uint8Array(ab);
      for (var i = 0; i < view.length; i++) {
        resultArray[bufferIndex++] = view[i];
      }
    });

    return callback(resultArray.buffer);
  });
};

/**
 * Encode as Blob
 */

exports.encodePayloadAsBlob = function(packets, callback) {
  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(encoded) {
      var binaryIdentifier = new Uint8Array(1);
      binaryIdentifier[0] = 1;
      if (typeof encoded === 'string') {
        var view = new Uint8Array(encoded.length);
        for (var i = 0; i < encoded.length; i++) {
          view[i] = encoded.charCodeAt(i);
        }
        encoded = view.buffer;
        binaryIdentifier[0] = 0;
      }

      var len = (encoded instanceof ArrayBuffer)
        ? encoded.byteLength
        : encoded.size;

      var lenStr = len.toString();
      var lengthAry = new Uint8Array(lenStr.length + 1);
      for (var i = 0; i < lenStr.length; i++) {
        lengthAry[i] = parseInt(lenStr[i]);
      }
      lengthAry[lenStr.length] = 255;

      if (Blob) {
        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
        doneCallback(null, blob);
      }
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(new Blob(results));
  });
};

/*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary
 *
 * @param {ArrayBuffer} data, callback method
 * @api public
 */

exports.decodePayloadAsBinary = function (data, binaryType, callback) {
  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var bufferTail = data;
  var buffers = [];

  while (bufferTail.byteLength > 0) {
    var tailArray = new Uint8Array(bufferTail);
    var isString = tailArray[0] === 0;
    var msgLength = '';

    for (var i = 1; ; i++) {
      if (tailArray[i] === 255) break;

      // 310 = char length of Number.MAX_VALUE
      if (msgLength.length > 310) {
        return callback(err, 0, 1);
      }

      msgLength += tailArray[i];
    }

    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
    msgLength = parseInt(msgLength);

    var msg = sliceBuffer(bufferTail, 0, msgLength);
    if (isString) {
      try {
        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
      } catch (e) {
        // iPhone Safari doesn't let you apply to typed arrays
        var typed = new Uint8Array(msg);
        msg = '';
        for (var i = 0; i < typed.length; i++) {
          msg += String.fromCharCode(typed[i]);
        }
      }
    }

    buffers.push(msg);
    bufferTail = sliceBuffer(bufferTail, msgLength);
  }

  var total = buffers.length;
  buffers.forEach(function(buffer, i) {
    callback(exports.decodePacket(buffer, binaryType, true), i, total);
  });
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */
function log(...args) {
	// This hackery is required for IE8/9, where
	// the `console.log` function doesn't have 'apply'
	return typeof console === 'object' &&
		console.log &&
		console.log(...args);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(31)(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {


module.exports = function(a, b){
  var fn = function(){};
  fn.prototype = b.prototype;
  a.prototype = new fn;
  a.prototype.constructor = a;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */
function log(...args) {
	// This hackery is required for IE8/9, where
	// the `console.log` function doesn't have 'apply'
	return typeof console === 'object' &&
		console.log &&
		console.log(...args);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(51)(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var debug = __webpack_require__(33)('socket.io-parser');
var Emitter = __webpack_require__(0);
var binary = __webpack_require__(36);
var isArray = __webpack_require__(13);
var isBuf = __webpack_require__(14);

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = 4;

/**
 * Packet types.
 *
 * @api public
 */

exports.types = [
  'CONNECT',
  'DISCONNECT',
  'EVENT',
  'ACK',
  'ERROR',
  'BINARY_EVENT',
  'BINARY_ACK'
];

/**
 * Packet type `connect`.
 *
 * @api public
 */

exports.CONNECT = 0;

/**
 * Packet type `disconnect`.
 *
 * @api public
 */

exports.DISCONNECT = 1;

/**
 * Packet type `event`.
 *
 * @api public
 */

exports.EVENT = 2;

/**
 * Packet type `ack`.
 *
 * @api public
 */

exports.ACK = 3;

/**
 * Packet type `error`.
 *
 * @api public
 */

exports.ERROR = 4;

/**
 * Packet type 'binary event'
 *
 * @api public
 */

exports.BINARY_EVENT = 5;

/**
 * Packet type `binary ack`. For acks with binary arguments.
 *
 * @api public
 */

exports.BINARY_ACK = 6;

/**
 * Encoder constructor.
 *
 * @api public
 */

exports.Encoder = Encoder;

/**
 * Decoder constructor.
 *
 * @api public
 */

exports.Decoder = Decoder;

/**
 * A socket.io Encoder instance
 *
 * @api public
 */

function Encoder() {}

var ERROR_PACKET = exports.ERROR + '"encode error"';

/**
 * Encode a packet as a single string if non-binary, or as a
 * buffer sequence, depending on packet type.
 *
 * @param {Object} obj - packet object
 * @param {Function} callback - function to handle encodings (likely engine.write)
 * @return Calls callback with Array of encodings
 * @api public
 */

Encoder.prototype.encode = function(obj, callback){
  debug('encoding packet %j', obj);

  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    encodeAsBinary(obj, callback);
  } else {
    var encoding = encodeAsString(obj);
    callback([encoding]);
  }
};

/**
 * Encode packet as string.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api private
 */

function encodeAsString(obj) {

  // first is type
  var str = '' + obj.type;

  // attachments if we have them
  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    str += obj.attachments + '-';
  }

  // if we have a namespace other than `/`
  // we append it followed by a comma `,`
  if (obj.nsp && '/' !== obj.nsp) {
    str += obj.nsp + ',';
  }

  // immediately followed by the id
  if (null != obj.id) {
    str += obj.id;
  }

  // json data
  if (null != obj.data) {
    var payload = tryStringify(obj.data);
    if (payload !== false) {
      str += payload;
    } else {
      return ERROR_PACKET;
    }
  }

  debug('encoded %j as %s', obj, str);
  return str;
}

function tryStringify(str) {
  try {
    return JSON.stringify(str);
  } catch(e){
    return false;
  }
}

/**
 * Encode packet as 'buffer sequence' by removing blobs, and
 * deconstructing packet into object with placeholders and
 * a list of buffers.
 *
 * @param {Object} packet
 * @return {Buffer} encoded
 * @api private
 */

function encodeAsBinary(obj, callback) {

  function writeEncoding(bloblessData) {
    var deconstruction = binary.deconstructPacket(bloblessData);
    var pack = encodeAsString(deconstruction.packet);
    var buffers = deconstruction.buffers;

    buffers.unshift(pack); // add packet info to beginning of data list
    callback(buffers); // write all the buffers
  }

  binary.removeBlobs(obj, writeEncoding);
}

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 * @api public
 */

function Decoder() {
  this.reconstructor = null;
}

/**
 * Mix in `Emitter` with Decoder.
 */

Emitter(Decoder.prototype);

/**
 * Decodes an encoded packet string into packet JSON.
 *
 * @param {String} obj - encoded packet
 * @return {Object} packet
 * @api public
 */

Decoder.prototype.add = function(obj) {
  var packet;
  if (typeof obj === 'string') {
    packet = decodeString(obj);
    if (exports.BINARY_EVENT === packet.type || exports.BINARY_ACK === packet.type) { // binary packet's json
      this.reconstructor = new BinaryReconstructor(packet);

      // no attachments, labeled binary but no binary data to follow
      if (this.reconstructor.reconPack.attachments === 0) {
        this.emit('decoded', packet);
      }
    } else { // non-binary full packet
      this.emit('decoded', packet);
    }
  } else if (isBuf(obj) || obj.base64) { // raw binary data
    if (!this.reconstructor) {
      throw new Error('got binary data when not reconstructing a packet');
    } else {
      packet = this.reconstructor.takeBinaryData(obj);
      if (packet) { // received final buffer
        this.reconstructor = null;
        this.emit('decoded', packet);
      }
    }
  } else {
    throw new Error('Unknown type: ' + obj);
  }
};

/**
 * Decode a packet String (JSON data)
 *
 * @param {String} str
 * @return {Object} packet
 * @api private
 */

function decodeString(str) {
  var i = 0;
  // look up type
  var p = {
    type: Number(str.charAt(0))
  };

  if (null == exports.types[p.type]) {
    return error('unknown packet type ' + p.type);
  }

  // look up attachments if type binary
  if (exports.BINARY_EVENT === p.type || exports.BINARY_ACK === p.type) {
    var buf = '';
    while (str.charAt(++i) !== '-') {
      buf += str.charAt(i);
      if (i == str.length) break;
    }
    if (buf != Number(buf) || str.charAt(i) !== '-') {
      throw new Error('Illegal attachments');
    }
    p.attachments = Number(buf);
  }

  // look up namespace (if any)
  if ('/' === str.charAt(i + 1)) {
    p.nsp = '';
    while (++i) {
      var c = str.charAt(i);
      if (',' === c) break;
      p.nsp += c;
      if (i === str.length) break;
    }
  } else {
    p.nsp = '/';
  }

  // look up id
  var next = str.charAt(i + 1);
  if ('' !== next && Number(next) == next) {
    p.id = '';
    while (++i) {
      var c = str.charAt(i);
      if (null == c || Number(c) != c) {
        --i;
        break;
      }
      p.id += str.charAt(i);
      if (i === str.length) break;
    }
    p.id = Number(p.id);
  }

  // look up json data
  if (str.charAt(++i)) {
    var payload = tryParse(str.substr(i));
    var isPayloadValid = payload !== false && (p.type === exports.ERROR || isArray(payload));
    if (isPayloadValid) {
      p.data = payload;
    } else {
      return error('invalid payload');
    }
  }

  debug('decoded %s as %j', str, p);
  return p;
}

function tryParse(str) {
  try {
    return JSON.parse(str);
  } catch(e){
    return false;
  }
}

/**
 * Deallocates a parser's resources
 *
 * @api public
 */

Decoder.prototype.destroy = function() {
  if (this.reconstructor) {
    this.reconstructor.finishedReconstruction();
  }
};

/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 * @api private
 */

function BinaryReconstructor(packet) {
  this.reconPack = packet;
  this.buffers = [];
}

/**
 * Method to be called when binary data received from connection
 * after a BINARY_EVENT packet.
 *
 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
 * @return {null | Object} returns null if more binary data is expected or
 *   a reconstructed packet object if all buffers have been received.
 * @api private
 */

BinaryReconstructor.prototype.takeBinaryData = function(binData) {
  this.buffers.push(binData);
  if (this.buffers.length === this.reconPack.attachments) { // done with buffer list
    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
    this.finishedReconstruction();
    return packet;
  }
  return null;
};

/**
 * Cleans up binary packet reconstruction variables.
 *
 * @api private
 */

BinaryReconstructor.prototype.finishedReconstruction = function() {
  this.reconPack = null;
  this.buffers = [];
};

function error(msg) {
  return {
    type: exports.ERROR,
    data: 'parser error: ' + msg
  };
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(37)
var ieee754 = __webpack_require__(38)
var isArray = __webpack_require__(39)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// browser shim for xmlhttprequest module

var hasCORS = __webpack_require__(42);

module.exports = function (opts) {
  var xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  var xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  var enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) { }

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) { }

  if (!xdomain) {
    try {
      return new self[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
    } catch (e) { }
  }
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var parser = __webpack_require__(1);
var Emitter = __webpack_require__(0);

/**
 * Module exports.
 */

module.exports = Transport;

/**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */

function Transport (opts) {
  this.path = opts.path;
  this.hostname = opts.hostname;
  this.port = opts.port;
  this.secure = opts.secure;
  this.query = opts.query;
  this.timestampParam = opts.timestampParam;
  this.timestampRequests = opts.timestampRequests;
  this.readyState = '';
  this.agent = opts.agent || false;
  this.socket = opts.socket;
  this.enablesXDR = opts.enablesXDR;
  this.withCredentials = opts.withCredentials;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;
  this.forceNode = opts.forceNode;

  // results of ReactNative environment detection
  this.isReactNative = opts.isReactNative;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;
  this.localAddress = opts.localAddress;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Transport.prototype);

/**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */

Transport.prototype.onError = function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  this.emit('error', err);
  return this;
};

/**
 * Opens the transport.
 *
 * @api public
 */

Transport.prototype.open = function () {
  if ('closed' === this.readyState || '' === this.readyState) {
    this.readyState = 'opening';
    this.doOpen();
  }

  return this;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.doClose();
    this.onClose();
  }

  return this;
};

/**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */

Transport.prototype.send = function (packets) {
  if ('open' === this.readyState) {
    this.write(packets);
  } else {
    throw new Error('Transport not open');
  }
};

/**
 * Called upon open
 *
 * @api private
 */

Transport.prototype.onOpen = function () {
  this.readyState = 'open';
  this.writable = true;
  this.emit('open');
};

/**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function (data) {
  var packet = parser.decodePacket(data, this.socket.binaryType);
  this.onPacket(packet);
};

/**
 * Called with a decoded packet.
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    return uri;
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {
module.exports = isBuf;

var withNativeBuffer = typeof Buffer === 'function' && typeof Buffer.isBuffer === 'function';
var withNativeArrayBuffer = typeof ArrayBuffer === 'function';

var isView = function (obj) {
  return typeof ArrayBuffer.isView === 'function' ? ArrayBuffer.isView(obj) : (obj.buffer instanceof ArrayBuffer);
};

/**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */

function isBuf(obj) {
  return (withNativeBuffer && Buffer.isBuffer(obj)) ||
          (withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)));
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).Buffer))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var eio = __webpack_require__(40);
var Socket = __webpack_require__(21);
var Emitter = __webpack_require__(0);
var parser = __webpack_require__(8);
var on = __webpack_require__(22);
var bind = __webpack_require__(23);
var debug = __webpack_require__(4)('socket.io-client:manager');
var indexOf = __webpack_require__(20);
var Backoff = __webpack_require__(57);

/**
 * IE6+ hasOwnProperty
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Module exports
 */

module.exports = Manager;

/**
 * `Manager` constructor.
 *
 * @param {String} engine instance or engine uri/opts
 * @param {Object} options
 * @api public
 */

function Manager (uri, opts) {
  if (!(this instanceof Manager)) return new Manager(uri, opts);
  if (uri && ('object' === typeof uri)) {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};

  opts.path = opts.path || '/socket.io';
  this.nsps = {};
  this.subs = [];
  this.opts = opts;
  this.reconnection(opts.reconnection !== false);
  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
  this.reconnectionDelay(opts.reconnectionDelay || 1000);
  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
  this.randomizationFactor(opts.randomizationFactor || 0.5);
  this.backoff = new Backoff({
    min: this.reconnectionDelay(),
    max: this.reconnectionDelayMax(),
    jitter: this.randomizationFactor()
  });
  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
  this.readyState = 'closed';
  this.uri = uri;
  this.connecting = [];
  this.lastPing = null;
  this.encoding = false;
  this.packetBuffer = [];
  var _parser = opts.parser || parser;
  this.encoder = new _parser.Encoder();
  this.decoder = new _parser.Decoder();
  this.autoConnect = opts.autoConnect !== false;
  if (this.autoConnect) this.open();
}

/**
 * Propagate given event to sockets and emit on `this`
 *
 * @api private
 */

Manager.prototype.emitAll = function () {
  this.emit.apply(this, arguments);
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
    }
  }
};

/**
 * Update `socket.id` of all sockets
 *
 * @api private
 */

Manager.prototype.updateSocketIds = function () {
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].id = this.generateId(nsp);
    }
  }
};

/**
 * generate `socket.id` for the given `nsp`
 *
 * @param {String} nsp
 * @return {String}
 * @api private
 */

Manager.prototype.generateId = function (nsp) {
  return (nsp === '/' ? '' : (nsp + '#')) + this.engine.id;
};

/**
 * Mix in `Emitter`.
 */

Emitter(Manager.prototype);

/**
 * Sets the `reconnection` config.
 *
 * @param {Boolean} true/false if it should automatically reconnect
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnection = function (v) {
  if (!arguments.length) return this._reconnection;
  this._reconnection = !!v;
  return this;
};

/**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionAttempts = function (v) {
  if (!arguments.length) return this._reconnectionAttempts;
  this._reconnectionAttempts = v;
  return this;
};

/**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelay = function (v) {
  if (!arguments.length) return this._reconnectionDelay;
  this._reconnectionDelay = v;
  this.backoff && this.backoff.setMin(v);
  return this;
};

Manager.prototype.randomizationFactor = function (v) {
  if (!arguments.length) return this._randomizationFactor;
  this._randomizationFactor = v;
  this.backoff && this.backoff.setJitter(v);
  return this;
};

/**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelayMax = function (v) {
  if (!arguments.length) return this._reconnectionDelayMax;
  this._reconnectionDelayMax = v;
  this.backoff && this.backoff.setMax(v);
  return this;
};

/**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.timeout = function (v) {
  if (!arguments.length) return this._timeout;
  this._timeout = v;
  return this;
};

/**
 * Starts trying to reconnect if reconnection is enabled and we have not
 * started reconnecting yet
 *
 * @api private
 */

Manager.prototype.maybeReconnectOnOpen = function () {
  // Only try to reconnect if it's the first time we're connecting
  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
    // keeps reconnection from firing twice for the same reconnection loop
    this.reconnect();
  }
};

/**
 * Sets the current transport `socket`.
 *
 * @param {Function} optional, callback
 * @return {Manager} self
 * @api public
 */

Manager.prototype.open =
Manager.prototype.connect = function (fn, opts) {
  debug('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;

  debug('opening %s', this.uri);
  this.engine = eio(this.uri, this.opts);
  var socket = this.engine;
  var self = this;
  this.readyState = 'opening';
  this.skipReconnect = false;

  // emit `open`
  var openSub = on(socket, 'open', function () {
    self.onopen();
    fn && fn();
  });

  // emit `connect_error`
  var errorSub = on(socket, 'error', function (data) {
    debug('connect_error');
    self.cleanup();
    self.readyState = 'closed';
    self.emitAll('connect_error', data);
    if (fn) {
      var err = new Error('Connection error');
      err.data = data;
      fn(err);
    } else {
      // Only do this if there is no fn to handle the error
      self.maybeReconnectOnOpen();
    }
  });

  // emit `connect_timeout`
  if (false !== this._timeout) {
    var timeout = this._timeout;
    debug('connect attempt will timeout after %d', timeout);

    // set timer
    var timer = setTimeout(function () {
      debug('connect attempt timed out after %d', timeout);
      openSub.destroy();
      socket.close();
      socket.emit('error', 'timeout');
      self.emitAll('connect_timeout', timeout);
    }, timeout);

    this.subs.push({
      destroy: function () {
        clearTimeout(timer);
      }
    });
  }

  this.subs.push(openSub);
  this.subs.push(errorSub);

  return this;
};

/**
 * Called upon transport open.
 *
 * @api private
 */

Manager.prototype.onopen = function () {
  debug('open');

  // clear old subs
  this.cleanup();

  // mark as open
  this.readyState = 'open';
  this.emit('open');

  // add new subs
  var socket = this.engine;
  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
};

/**
 * Called upon a ping.
 *
 * @api private
 */

Manager.prototype.onping = function () {
  this.lastPing = new Date();
  this.emitAll('ping');
};

/**
 * Called upon a packet.
 *
 * @api private
 */

Manager.prototype.onpong = function () {
  this.emitAll('pong', new Date() - this.lastPing);
};

/**
 * Called with data.
 *
 * @api private
 */

Manager.prototype.ondata = function (data) {
  this.decoder.add(data);
};

/**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */

Manager.prototype.ondecoded = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon socket error.
 *
 * @api private
 */

Manager.prototype.onerror = function (err) {
  debug('error', err);
  this.emitAll('error', err);
};

/**
 * Creates a new socket for the given `nsp`.
 *
 * @return {Socket}
 * @api public
 */

Manager.prototype.socket = function (nsp, opts) {
  var socket = this.nsps[nsp];
  if (!socket) {
    socket = new Socket(this, nsp, opts);
    this.nsps[nsp] = socket;
    var self = this;
    socket.on('connecting', onConnecting);
    socket.on('connect', function () {
      socket.id = self.generateId(nsp);
    });

    if (this.autoConnect) {
      // manually call here since connecting event is fired before listening
      onConnecting();
    }
  }

  function onConnecting () {
    if (!~indexOf(self.connecting, socket)) {
      self.connecting.push(socket);
    }
  }

  return socket;
};

/**
 * Called upon a socket close.
 *
 * @param {Socket} socket
 */

Manager.prototype.destroy = function (socket) {
  var index = indexOf(this.connecting, socket);
  if (~index) this.connecting.splice(index, 1);
  if (this.connecting.length) return;

  this.close();
};

/**
 * Writes a packet.
 *
 * @param {Object} packet
 * @api private
 */

Manager.prototype.packet = function (packet) {
  debug('writing packet %j', packet);
  var self = this;
  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

  if (!self.encoding) {
    // encode, then write to engine with result
    self.encoding = true;
    this.encoder.encode(packet, function (encodedPackets) {
      for (var i = 0; i < encodedPackets.length; i++) {
        self.engine.write(encodedPackets[i], packet.options);
      }
      self.encoding = false;
      self.processPacketQueue();
    });
  } else { // add packet to the queue
    self.packetBuffer.push(packet);
  }
};

/**
 * If packet buffer is non-empty, begins encoding the
 * next packet in line.
 *
 * @api private
 */

Manager.prototype.processPacketQueue = function () {
  if (this.packetBuffer.length > 0 && !this.encoding) {
    var pack = this.packetBuffer.shift();
    this.packet(pack);
  }
};

/**
 * Clean up transport subscriptions and packet buffer.
 *
 * @api private
 */

Manager.prototype.cleanup = function () {
  debug('cleanup');

  var subsLength = this.subs.length;
  for (var i = 0; i < subsLength; i++) {
    var sub = this.subs.shift();
    sub.destroy();
  }

  this.packetBuffer = [];
  this.encoding = false;
  this.lastPing = null;

  this.decoder.destroy();
};

/**
 * Close the current socket.
 *
 * @api private
 */

Manager.prototype.close =
Manager.prototype.disconnect = function () {
  debug('disconnect');
  this.skipReconnect = true;
  this.reconnecting = false;
  if ('opening' === this.readyState) {
    // `onclose` will not fire because
    // an open event never happened
    this.cleanup();
  }
  this.backoff.reset();
  this.readyState = 'closed';
  if (this.engine) this.engine.close();
};

/**
 * Called upon engine close.
 *
 * @api private
 */

Manager.prototype.onclose = function (reason) {
  debug('onclose');

  this.cleanup();
  this.backoff.reset();
  this.readyState = 'closed';
  this.emit('close', reason);

  if (this._reconnection && !this.skipReconnect) {
    this.reconnect();
  }
};

/**
 * Attempt a reconnection.
 *
 * @api private
 */

Manager.prototype.reconnect = function () {
  if (this.reconnecting || this.skipReconnect) return this;

  var self = this;

  if (this.backoff.attempts >= this._reconnectionAttempts) {
    debug('reconnect failed');
    this.backoff.reset();
    this.emitAll('reconnect_failed');
    this.reconnecting = false;
  } else {
    var delay = this.backoff.duration();
    debug('will wait %dms before reconnect attempt', delay);

    this.reconnecting = true;
    var timer = setTimeout(function () {
      if (self.skipReconnect) return;

      debug('attempting reconnect');
      self.emitAll('reconnect_attempt', self.backoff.attempts);
      self.emitAll('reconnecting', self.backoff.attempts);

      // check again for the case socket closed in above events
      if (self.skipReconnect) return;

      self.open(function (err) {
        if (err) {
          debug('reconnect attempt error');
          self.reconnecting = false;
          self.reconnect();
          self.emitAll('reconnect_error', err.data);
        } else {
          debug('reconnect success');
          self.onreconnect();
        }
      });
    }, delay);

    this.subs.push({
      destroy: function () {
        clearTimeout(timer);
      }
    });
  }
};

/**
 * Called upon successful reconnect.
 *
 * @api private
 */

Manager.prototype.onreconnect = function () {
  var attempt = this.backoff.attempts;
  this.reconnecting = false;
  this.backoff.reset();
  this.updateSocketIds();
  this.emitAll('reconnect', attempt);
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies
 */

var XMLHttpRequest = __webpack_require__(10);
var XHR = __webpack_require__(43);
var JSONP = __webpack_require__(53);
var websocket = __webpack_require__(54);

/**
 * Export transports.
 */

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling (opts) {
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (typeof location !== 'undefined') {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname !== location.hostname || port !== opts.port;
    xs = opts.secure !== isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ('open' in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error('JSONP disabled');
    return new JSONP(opts);
  }
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var Transport = __webpack_require__(11);
var parseqs = __webpack_require__(5);
var parser = __webpack_require__(1);
var inherit = __webpack_require__(6);
var yeast = __webpack_require__(19);
var debug = __webpack_require__(7)('engine.io-client:polling');

/**
 * Module exports.
 */

module.exports = Polling;

/**
 * Is XHR2 supported?
 */

var hasXHR2 = (function () {
  var XMLHttpRequest = __webpack_require__(10);
  var xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
})();

/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */

function Polling (opts) {
  var forceBase64 = (opts && opts.forceBase64);
  if (!hasXHR2 || forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(Polling, Transport);

/**
 * Transport name.
 */

Polling.prototype.name = 'polling';

/**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */

Polling.prototype.doOpen = function () {
  this.poll();
};

/**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */

Polling.prototype.pause = function (onPause) {
  var self = this;

  this.readyState = 'pausing';

  function pause () {
    debug('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function () {
        debug('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function () {
        debug('pre-pause writing complete');
        --total || pause();
      });
    }
  } else {
    pause();
  }
};

/**
 * Starts polling cycle.
 *
 * @api public
 */

Polling.prototype.poll = function () {
  debug('polling');
  this.polling = true;
  this.doPoll();
  this.emit('poll');
};

/**
 * Overloads onData to detect payloads.
 *
 * @api private
 */

Polling.prototype.onData = function (data) {
  var self = this;
  debug('polling got data %s', data);
  var callback = function (packet, index, total) {
    // if its the first message we consider the transport open
    if ('opening' === self.readyState) {
      self.onOpen();
    }

    // if its a close packet, we close the ongoing requests
    if ('close' === packet.type) {
      self.onClose();
      return false;
    }

    // otherwise bypass onData and handle the message
    self.onPacket(packet);
  };

  // decode payload
  parser.decodePayload(data, this.socket.binaryType, callback);

  // if an event did not trigger closing
  if ('closed' !== this.readyState) {
    // if we got data we're not polling
    this.polling = false;
    this.emit('pollComplete');

    if ('open' === this.readyState) {
      this.poll();
    } else {
      debug('ignoring poll - transport state "%s"', this.readyState);
    }
  }
};

/**
 * For polling, send a close packet.
 *
 * @api private
 */

Polling.prototype.doClose = function () {
  var self = this;

  function close () {
    debug('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' === this.readyState) {
    debug('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug('transport not open - deferring close');
    this.once('open', close);
  }
};

/**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */

Polling.prototype.write = function (packets) {
  var self = this;
  this.writable = false;
  var callbackfn = function () {
    self.writable = true;
    self.emit('drain');
  };

  parser.encodePayload(packets, this.supportsBinary, function (data) {
    self.doWrite(data, callbackfn);
  });
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

Polling.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'https' : 'http';
  var port = '';

  // cache busting is forced
  if (false !== this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // avoid port if default for schema
  if (this.port && (('https' === schema && Number(this.port) !== 443) ||
     ('http' === schema && Number(this.port) !== 80))) {
    port = ':' + this.port;
  }

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/* global Blob File */

/*
 * Module requirements.
 */

var isArray = __webpack_require__(45);

var toString = Object.prototype.toString;
var withNativeBlob = typeof Blob === 'function' ||
                        typeof Blob !== 'undefined' && toString.call(Blob) === '[object BlobConstructor]';
var withNativeFile = typeof File === 'function' ||
                        typeof File !== 'undefined' && toString.call(File) === '[object FileConstructor]';

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Supports Buffer, ArrayBuffer, Blob and File.
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary (obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (hasBinary(obj[i])) {
        return true;
      }
    }
    return false;
  }

  if ((typeof Buffer === 'function' && Buffer.isBuffer && Buffer.isBuffer(obj)) ||
    (typeof ArrayBuffer === 'function' && obj instanceof ArrayBuffer) ||
    (withNativeBlob && obj instanceof Blob) ||
    (withNativeFile && obj instanceof File)
  ) {
    return true;
  }

  // see: https://github.com/Automattic/has-binary/pull/4
  if (obj.toJSON && typeof obj.toJSON === 'function' && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }

  return false;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).Buffer))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
  , length = 64
  , map = {}
  , seed = 0
  , i = 0
  , prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now +'.'+ encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;


/***/ }),
/* 20 */
/***/ (function(module, exports) {


var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var parser = __webpack_require__(8);
var Emitter = __webpack_require__(0);
var toArray = __webpack_require__(56);
var on = __webpack_require__(22);
var bind = __webpack_require__(23);
var debug = __webpack_require__(4)('socket.io-client:socket');
var parseqs = __webpack_require__(5);
var hasBin = __webpack_require__(18);

/**
 * Module exports.
 */

module.exports = exports = Socket;

/**
 * Internal events (blacklisted).
 * These events can't be emitted by the user.
 *
 * @api private
 */

var events = {
  connect: 1,
  connect_error: 1,
  connect_timeout: 1,
  connecting: 1,
  disconnect: 1,
  error: 1,
  reconnect: 1,
  reconnect_attempt: 1,
  reconnect_failed: 1,
  reconnect_error: 1,
  reconnecting: 1,
  ping: 1,
  pong: 1
};

/**
 * Shortcut to `Emitter#emit`.
 */

var emit = Emitter.prototype.emit;

/**
 * `Socket` constructor.
 *
 * @api public
 */

function Socket (io, nsp, opts) {
  this.io = io;
  this.nsp = nsp;
  this.json = this; // compat
  this.ids = 0;
  this.acks = {};
  this.receiveBuffer = [];
  this.sendBuffer = [];
  this.connected = false;
  this.disconnected = true;
  this.flags = {};
  if (opts && opts.query) {
    this.query = opts.query;
  }
  if (this.io.autoConnect) this.open();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Subscribe to open, close and packet events
 *
 * @api private
 */

Socket.prototype.subEvents = function () {
  if (this.subs) return;

  var io = this.io;
  this.subs = [
    on(io, 'open', bind(this, 'onopen')),
    on(io, 'packet', bind(this, 'onpacket')),
    on(io, 'close', bind(this, 'onclose'))
  ];
};

/**
 * "Opens" the socket.
 *
 * @api public
 */

Socket.prototype.open =
Socket.prototype.connect = function () {
  if (this.connected) return this;

  this.subEvents();
  this.io.open(); // ensure open
  if ('open' === this.io.readyState) this.onopen();
  this.emit('connecting');
  return this;
};

/**
 * Sends a `message` event.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.send = function () {
  var args = toArray(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
};

/**
 * Override `emit`.
 * If the event is in `events`, it's emitted normally.
 *
 * @param {String} event name
 * @return {Socket} self
 * @api public
 */

Socket.prototype.emit = function (ev) {
  if (events.hasOwnProperty(ev)) {
    emit.apply(this, arguments);
    return this;
  }

  var args = toArray(arguments);
  var packet = {
    type: (this.flags.binary !== undefined ? this.flags.binary : hasBin(args)) ? parser.BINARY_EVENT : parser.EVENT,
    data: args
  };

  packet.options = {};
  packet.options.compress = !this.flags || false !== this.flags.compress;

  // event ack callback
  if ('function' === typeof args[args.length - 1]) {
    debug('emitting packet with ack id %d', this.ids);
    this.acks[this.ids] = args.pop();
    packet.id = this.ids++;
  }

  if (this.connected) {
    this.packet(packet);
  } else {
    this.sendBuffer.push(packet);
  }

  this.flags = {};

  return this;
};

/**
 * Sends a packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.packet = function (packet) {
  packet.nsp = this.nsp;
  this.io.packet(packet);
};

/**
 * Called upon engine `open`.
 *
 * @api private
 */

Socket.prototype.onopen = function () {
  debug('transport is open - connecting');

  // write connect packet if necessary
  if ('/' !== this.nsp) {
    if (this.query) {
      var query = typeof this.query === 'object' ? parseqs.encode(this.query) : this.query;
      debug('sending connect packet with query %s', query);
      this.packet({type: parser.CONNECT, query: query});
    } else {
      this.packet({type: parser.CONNECT});
    }
  }
};

/**
 * Called upon engine `close`.
 *
 * @param {String} reason
 * @api private
 */

Socket.prototype.onclose = function (reason) {
  debug('close (%s)', reason);
  this.connected = false;
  this.disconnected = true;
  delete this.id;
  this.emit('disconnect', reason);
};

/**
 * Called with socket packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onpacket = function (packet) {
  var sameNamespace = packet.nsp === this.nsp;
  var rootNamespaceError = packet.type === parser.ERROR && packet.nsp === '/';

  if (!sameNamespace && !rootNamespaceError) return;

  switch (packet.type) {
    case parser.CONNECT:
      this.onconnect();
      break;

    case parser.EVENT:
      this.onevent(packet);
      break;

    case parser.BINARY_EVENT:
      this.onevent(packet);
      break;

    case parser.ACK:
      this.onack(packet);
      break;

    case parser.BINARY_ACK:
      this.onack(packet);
      break;

    case parser.DISCONNECT:
      this.ondisconnect();
      break;

    case parser.ERROR:
      this.emit('error', packet.data);
      break;
  }
};

/**
 * Called upon a server event.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onevent = function (packet) {
  var args = packet.data || [];
  debug('emitting event %j', args);

  if (null != packet.id) {
    debug('attaching ack callback to event');
    args.push(this.ack(packet.id));
  }

  if (this.connected) {
    emit.apply(this, args);
  } else {
    this.receiveBuffer.push(args);
  }
};

/**
 * Produces an ack callback to emit with an event.
 *
 * @api private
 */

Socket.prototype.ack = function (id) {
  var self = this;
  var sent = false;
  return function () {
    // prevent double callbacks
    if (sent) return;
    sent = true;
    var args = toArray(arguments);
    debug('sending ack %j', args);

    self.packet({
      type: hasBin(args) ? parser.BINARY_ACK : parser.ACK,
      id: id,
      data: args
    });
  };
};

/**
 * Called upon a server acknowlegement.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onack = function (packet) {
  var ack = this.acks[packet.id];
  if ('function' === typeof ack) {
    debug('calling ack %s with %j', packet.id, packet.data);
    ack.apply(this, packet.data);
    delete this.acks[packet.id];
  } else {
    debug('bad ack %s', packet.id);
  }
};

/**
 * Called upon server connect.
 *
 * @api private
 */

Socket.prototype.onconnect = function () {
  this.connected = true;
  this.disconnected = false;
  this.emit('connect');
  this.emitBuffered();
};

/**
 * Emit buffered events (received and emitted).
 *
 * @api private
 */

Socket.prototype.emitBuffered = function () {
  var i;
  for (i = 0; i < this.receiveBuffer.length; i++) {
    emit.apply(this, this.receiveBuffer[i]);
  }
  this.receiveBuffer = [];

  for (i = 0; i < this.sendBuffer.length; i++) {
    this.packet(this.sendBuffer[i]);
  }
  this.sendBuffer = [];
};

/**
 * Called upon server disconnect.
 *
 * @api private
 */

Socket.prototype.ondisconnect = function () {
  debug('server disconnect (%s)', this.nsp);
  this.destroy();
  this.onclose('io server disconnect');
};

/**
 * Called upon forced client/server side disconnections,
 * this method ensures the manager stops tracking us and
 * that reconnections don't get triggered for this.
 *
 * @api private.
 */

Socket.prototype.destroy = function () {
  if (this.subs) {
    // clean subscriptions to avoid reconnections
    for (var i = 0; i < this.subs.length; i++) {
      this.subs[i].destroy();
    }
    this.subs = null;
  }

  this.io.destroy(this);
};

/**
 * Disconnects the socket manually.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.close =
Socket.prototype.disconnect = function () {
  if (this.connected) {
    debug('performing disconnect (%s)', this.nsp);
    this.packet({ type: parser.DISCONNECT });
  }

  // remove socket from pool
  this.destroy();

  if (this.connected) {
    // fire events
    this.onclose('io client disconnect');
  }
  return this;
};

/**
 * Sets the compress flag.
 *
 * @param {Boolean} if `true`, compresses the sending data
 * @return {Socket} self
 * @api public
 */

Socket.prototype.compress = function (compress) {
  this.flags.compress = compress;
  return this;
};

/**
 * Sets the binary flag
 *
 * @param {Boolean} whether the emitted data contains binary
 * @return {Socket} self
 * @api public
 */

Socket.prototype.binary = function (binary) {
  this.flags.binary = binary;
  return this;
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {


/**
 * Module exports.
 */

module.exports = on;

/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on (obj, ev, fn) {
  obj.on(ev, fn);
  return {
    destroy: function () {
      obj.removeListener(ev, fn);
    }
  };
}


/***/ }),
/* 23 */
/***/ (function(module, exports) {

/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

module.exports = function(obj, fn){
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function(){
    return fn.apply(obj, args.concat(slice.call(arguments)));
  }
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

window.SDK = __webpack_require__(25);


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// import { ConsoleLoggingListener, LocalStorage, SessionStorage } from "./src/common.browser/Exports";
// import { Events, Storage } from "./src/common/Exports";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Common.Storage.SetLocalStorage(new Common.Browser.LocalStorage());
// Common.Storage.SetSessionStorage(new Common.Browser.SessionStorage());
// Events.Instance.AttachListener(new ConsoleLoggingListener());
// export * from "./src/common/Exports";
// export * from "./src/common.browser/Exports";
__export(__webpack_require__(26));
// export * from "./src/sdk/speech.browser/Exports";



/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// IMPORTANT - Dont publish internal modules.
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(27));



/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var RecordRTC = __webpack_require__(28);
var io = __webpack_require__(29);
var ss = __webpack_require__(58);
var DeepSpeech = /** @class */ (function () {
    function DeepSpeech() {
    }
    DeepSpeech.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, err_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    this.socket = io.connect("http://192.168.50.86:3000");
                                    _a = this;
                                    return [4 /*yield*/, this.getMedia()];
                                case 1:
                                    _a.stream = _b.sent();
                                    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
                                        mimeType: "audio/wav",
                                        type: "audio",
                                    });
                                    resolve();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_1 = _b.sent();
                                    reject(err_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DeepSpeech.prototype.recordAudio = function () {
        this.recorder.record();
    };
    DeepSpeech.prototype.stopAudio = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.recorder.stop(function (blob) {
                    _this.stream = ss.createStream();
                    ss(_this.socket).emit("audio", _this.stream);
                    ss.createBlobReadStream(blob).pipe(_this.stream);
                    ss(_this.socket).on("sttresult", function (stream, data) {
                        if (!stream || data.err) {
                            reject("Issue at DeepSpeech side");
                        }
                        else {
                            resolve(data.text);
                        }
                    });
                });
            }
            catch (err) {
                reject(err);
            }
        });
    };
    DeepSpeech.prototype.getMedia = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stream, constraints, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stream = null;
                        constraints = { audio: true };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, navigator.mediaDevices.getUserMedia(constraints)];
                    case 2:
                        stream = _a.sent();
                        return [2 /*return*/, stream];
                    case 3:
                        err_2 = _a.sent();
                        throw err_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return DeepSpeech;
}());
exports.DeepSpeech = DeepSpeech;



/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

// Last time updated: 2019-06-21 4:32:42 AM UTC

// ________________
// RecordRTC v5.5.8

// Open-Sourced: https://github.com/muaz-khan/RecordRTC

// --------------------------------------------------
// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
// --------------------------------------------------

// ____________
// RecordRTC.js

/**
 * {@link https://github.com/muaz-khan/RecordRTC|RecordRTC} is a WebRTC JavaScript library for audio/video as well as screen activity recording. It supports Chrome, Firefox, Opera, Android, and Microsoft Edge. Platforms: Linux, Mac and Windows. 
 * @summary Record audio, video or screen inside the browser.
 * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
 * @author {@link https://MuazKhan.com|Muaz Khan}
 * @typedef RecordRTC
 * @class
 * @example
 * var recorder = RecordRTC(mediaStream or [arrayOfMediaStream], {
 *     type: 'video', // audio or video or gif or canvas
 *     recorderType: MediaStreamRecorder || CanvasRecorder || StereoAudioRecorder || Etc
 * });
 * recorder.startRecording();
 * @see For further information:
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - Single media-stream object, array of media-streams, html-canvas-element, etc.
 * @param {object} config - {type:"video", recorderType: MediaStreamRecorder, disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, desiredSampRate: 16000, video: HTMLVideoElement, etc.}
 */

function RecordRTC(mediaStream, config) {
    if (!mediaStream) {
        throw 'First parameter is required.';
    }

    config = config || {
        type: 'video'
    };

    config = new RecordRTCConfiguration(mediaStream, config);

    // a reference to user's recordRTC object
    var self = this;

    function startRecording(config2) {
        if (!config.disableLogs) {
            console.log('RecordRTC version: ', self.version);
        }

        if (!!config2) {
            // allow users to set options using startRecording method
            // config2 is similar to main "config" object (second parameter over RecordRTC constructor)
            config = new RecordRTCConfiguration(mediaStream, config2);
        }

        if (!config.disableLogs) {
            console.log('started recording ' + config.type + ' stream.');
        }

        if (mediaRecorder) {
            mediaRecorder.clearRecordedData();
            mediaRecorder.record();

            setState('recording');

            if (self.recordingDuration) {
                handleRecordingDuration();
            }
            return self;
        }

        initRecorder(function() {
            if (self.recordingDuration) {
                handleRecordingDuration();
            }
        });

        return self;
    }

    function initRecorder(initCallback) {
        if (initCallback) {
            config.initCallback = function() {
                initCallback();
                initCallback = config.initCallback = null; // recorder.initRecorder should be call-backed once.
            };
        }

        var Recorder = new GetRecorderType(mediaStream, config);

        mediaRecorder = new Recorder(mediaStream, config);
        mediaRecorder.record();

        setState('recording');

        if (!config.disableLogs) {
            console.log('Initialized recorderType:', mediaRecorder.constructor.name, 'for output-type:', config.type);
        }
    }

    function stopRecording(callback) {
        callback = callback || function() {};

        if (!mediaRecorder) {
            warningLog();
            return;
        }

        if (self.state === 'paused') {
            self.resumeRecording();

            setTimeout(function() {
                stopRecording(callback);
            }, 1);
            return;
        }

        if (self.state !== 'recording' && !config.disableLogs) {
            console.warn('Recording state should be: "recording", however current state is: ', self.state);
        }

        if (!config.disableLogs) {
            console.log('Stopped recording ' + config.type + ' stream.');
        }

        if (config.type !== 'gif') {
            mediaRecorder.stop(_callback);
        } else {
            mediaRecorder.stop();
            _callback();
        }

        setState('stopped');

        function _callback(__blob) {
            if (!mediaRecorder) {
                if (typeof callback.call === 'function') {
                    callback.call(self, '');
                } else {
                    callback('');
                }
                return;
            }

            Object.keys(mediaRecorder).forEach(function(key) {
                if (typeof mediaRecorder[key] === 'function') {
                    return;
                }

                self[key] = mediaRecorder[key];
            });

            var blob = mediaRecorder.blob;

            if (!blob) {
                if (__blob) {
                    mediaRecorder.blob = blob = __blob;
                } else {
                    throw 'Recording failed.';
                }
            }

            if (blob && !config.disableLogs) {
                console.log(blob.type, '->', bytesToSize(blob.size));
            }

            if (callback) {
                var url;

                try {
                    url = URL.createObjectURL(blob);
                } catch (e) {}

                if (typeof callback.call === 'function') {
                    callback.call(self, url);
                } else {
                    callback(url);
                }
            }

            if (!config.autoWriteToDisk) {
                return;
            }

            getDataURL(function(dataURL) {
                var parameter = {};
                parameter[config.type + 'Blob'] = dataURL;
                DiskStorage.Store(parameter);
            });
        }
    }

    function pauseRecording() {
        if (!mediaRecorder) {
            warningLog();
            return;
        }

        if (self.state !== 'recording') {
            if (!config.disableLogs) {
                console.warn('Unable to pause the recording. Recording state: ', self.state);
            }
            return;
        }

        setState('paused');

        mediaRecorder.pause();

        if (!config.disableLogs) {
            console.log('Paused recording.');
        }
    }

    function resumeRecording() {
        if (!mediaRecorder) {
            warningLog();
            return;
        }

        if (self.state !== 'paused') {
            if (!config.disableLogs) {
                console.warn('Unable to resume the recording. Recording state: ', self.state);
            }
            return;
        }

        setState('recording');

        // not all libs have this method yet
        mediaRecorder.resume();

        if (!config.disableLogs) {
            console.log('Resumed recording.');
        }
    }

    function readFile(_blob) {
        postMessage(new FileReaderSync().readAsDataURL(_blob));
    }

    function getDataURL(callback, _mediaRecorder) {
        if (!callback) {
            throw 'Pass a callback function over getDataURL.';
        }

        var blob = _mediaRecorder ? _mediaRecorder.blob : (mediaRecorder || {}).blob;

        if (!blob) {
            if (!config.disableLogs) {
                console.warn('Blob encoder did not finish its job yet.');
            }

            setTimeout(function() {
                getDataURL(callback, _mediaRecorder);
            }, 1000);
            return;
        }

        if (typeof Worker !== 'undefined' && !navigator.mozGetUserMedia) {
            var webWorker = processInWebWorker(readFile);

            webWorker.onmessage = function(event) {
                callback(event.data);
            };

            webWorker.postMessage(blob);
        } else {
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = function(event) {
                callback(event.target.result);
            };
        }

        function processInWebWorker(_function) {
            try {
                var blob = URL.createObjectURL(new Blob([_function.toString(),
                    'this.onmessage =  function (eee) {' + _function.name + '(eee.data);}'
                ], {
                    type: 'application/javascript'
                }));

                var worker = new Worker(blob);
                URL.revokeObjectURL(blob);
                return worker;
            } catch (e) {}
        }
    }

    function handleRecordingDuration(counter) {
        counter = counter || 0;

        if (self.state === 'paused') {
            setTimeout(function() {
                handleRecordingDuration(counter);
            }, 1000);
            return;
        }

        if (self.state === 'stopped') {
            return;
        }

        if (counter >= self.recordingDuration) {
            stopRecording(self.onRecordingStopped);
            return;
        }

        counter += 1000; // 1-second

        setTimeout(function() {
            handleRecordingDuration(counter);
        }, 1000);
    }

    function setState(state) {
        if (!self) {
            return;
        }

        self.state = state;

        if (typeof self.onStateChanged.call === 'function') {
            self.onStateChanged.call(self, state);
        } else {
            self.onStateChanged(state);
        }
    }

    var WARNING = 'It seems that recorder is destroyed or "startRecording" is not invoked for ' + config.type + ' recorder.';

    function warningLog() {
        if (config.disableLogs === true) {
            return;
        }

        console.warn(WARNING);
    }

    var mediaRecorder;

    var returnObject = {
        /**
         * This method starts the recording.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * var recorder = RecordRTC(mediaStream, {
         *     type: 'video'
         * });
         * recorder.startRecording();
         */
        startRecording: startRecording,

        /**
         * This method stops the recording. It is strongly recommended to get "blob" or "URI" inside the callback to make sure all recorders finished their job.
         * @param {function} callback - Callback to get the recorded blob.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.stopRecording(function() {
         *     // use either "this" or "recorder" object; both are identical
         *     video.src = this.toURL();
         *     var blob = this.getBlob();
         * });
         */
        stopRecording: stopRecording,

        /**
         * This method pauses the recording. You can resume recording using "resumeRecording" method.
         * @method
         * @memberof RecordRTC
         * @instance
         * @todo Firefox is unable to pause the recording. Fix it.
         * @example
         * recorder.pauseRecording();  // pause the recording
         * recorder.resumeRecording(); // resume again
         */
        pauseRecording: pauseRecording,

        /**
         * This method resumes the recording.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.pauseRecording();  // first of all, pause the recording
         * recorder.resumeRecording(); // now resume it
         */
        resumeRecording: resumeRecording,

        /**
         * This method initializes the recording.
         * @method
         * @memberof RecordRTC
         * @instance
         * @todo This method should be deprecated.
         * @example
         * recorder.initRecorder();
         */
        initRecorder: initRecorder,

        /**
         * Ask RecordRTC to auto-stop the recording after 5 minutes.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * var fiveMinutes = 5 * 1000 * 60;
         * recorder.setRecordingDuration(fiveMinutes, function() {
         *    var blob = this.getBlob();
         *    video.src = this.toURL();
         * });
         * 
         * // or otherwise
         * recorder.setRecordingDuration(fiveMinutes).onRecordingStopped(function() {
         *    var blob = this.getBlob();
         *    video.src = this.toURL();
         * });
         */
        setRecordingDuration: function(recordingDuration, callback) {
            if (typeof recordingDuration === 'undefined') {
                throw 'recordingDuration is required.';
            }

            if (typeof recordingDuration !== 'number') {
                throw 'recordingDuration must be a number.';
            }

            self.recordingDuration = recordingDuration;
            self.onRecordingStopped = callback || function() {};

            return {
                onRecordingStopped: function(callback) {
                    self.onRecordingStopped = callback;
                }
            };
        },

        /**
         * This method can be used to clear/reset all the recorded data.
         * @method
         * @memberof RecordRTC
         * @instance
         * @todo Figure out the difference between "reset" and "clearRecordedData" methods.
         * @example
         * recorder.clearRecordedData();
         */
        clearRecordedData: function() {
            if (!mediaRecorder) {
                warningLog();
                return;
            }

            mediaRecorder.clearRecordedData();

            if (!config.disableLogs) {
                console.log('Cleared old recorded data.');
            }
        },

        /**
         * Get the recorded blob. Use this method inside the "stopRecording" callback.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.stopRecording(function() {
         *     var blob = this.getBlob();
         *
         *     var file = new File([blob], 'filename.webm', {
         *         type: 'video/webm'
         *     });
         *
         *     var formData = new FormData();
         *     formData.append('file', file); // upload "File" object rather than a "Blob"
         *     uploadToServer(formData);
         * });
         * @returns {Blob} Returns recorded data as "Blob" object.
         */
        getBlob: function() {
            if (!mediaRecorder) {
                warningLog();
                return;
            }

            return mediaRecorder.blob;
        },

        /**
         * Get data-URI instead of Blob.
         * @param {function} callback - Callback to get the Data-URI.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.stopRecording(function() {
         *     recorder.getDataURL(function(dataURI) {
         *         video.src = dataURI;
         *     });
         * });
         */
        getDataURL: getDataURL,

        /**
         * Get virtual/temporary URL. Usage of this URL is limited to current tab.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.stopRecording(function() {
         *     video.src = this.toURL();
         * });
         * @returns {String} Returns a virtual/temporary URL for the recorded "Blob".
         */
        toURL: function() {
            if (!mediaRecorder) {
                warningLog();
                return;
            }

            return URL.createObjectURL(mediaRecorder.blob);
        },

        /**
         * Get internal recording object (i.e. internal module) e.g. MutliStreamRecorder, MediaStreamRecorder, StereoAudioRecorder or WhammyRecorder etc.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * var internalRecorder = recorder.getInternalRecorder();
         * if(internalRecorder instanceof MultiStreamRecorder) {
         *     internalRecorder.addStreams([newAudioStream]);
         *     internalRecorder.resetVideoStreams([screenStream]);
         * }
         * @returns {Object} Returns internal recording object.
         */
        getInternalRecorder: function() {
            return mediaRecorder;
        },

        /**
         * Invoke save-as dialog to save the recorded blob into your disk.
         * @param {string} fileName - Set your own file name.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.stopRecording(function() {
         *     this.save('file-name');
         *
         *     // or manually:
         *     invokeSaveAsDialog(this.getBlob(), 'filename.webm');
         * });
         */
        save: function(fileName) {
            if (!mediaRecorder) {
                warningLog();
                return;
            }

            invokeSaveAsDialog(mediaRecorder.blob, fileName);
        },

        /**
         * This method gets a blob from indexed-DB storage.
         * @param {function} callback - Callback to get the recorded blob.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.getFromDisk(function(dataURL) {
         *     video.src = dataURL;
         * });
         */
        getFromDisk: function(callback) {
            if (!mediaRecorder) {
                warningLog();
                return;
            }

            RecordRTC.getFromDisk(config.type, callback);
        },

        /**
         * This method appends an array of webp images to the recorded video-blob. It takes an "array" object.
         * @type {Array.<Array>}
         * @param {Array} arrayOfWebPImages - Array of webp images.
         * @method
         * @memberof RecordRTC
         * @instance
         * @todo This method should be deprecated.
         * @example
         * var arrayOfWebPImages = [];
         * arrayOfWebPImages.push({
         *     duration: index,
         *     image: 'data:image/webp;base64,...'
         * });
         * recorder.setAdvertisementArray(arrayOfWebPImages);
         */
        setAdvertisementArray: function(arrayOfWebPImages) {
            config.advertisement = [];

            var length = arrayOfWebPImages.length;
            for (var i = 0; i < length; i++) {
                config.advertisement.push({
                    duration: i,
                    image: arrayOfWebPImages[i]
                });
            }
        },

        /**
         * It is equivalent to <code class="str">"recorder.getBlob()"</code> method. Usage of "getBlob" is recommended, though.
         * @property {Blob} blob - Recorded Blob can be accessed using this property.
         * @memberof RecordRTC
         * @instance
         * @readonly
         * @example
         * recorder.stopRecording(function() {
         *     var blob = this.blob;
         *
         *     // below one is recommended
         *     var blob = this.getBlob();
         * });
         */
        blob: null,

        /**
         * This works only with {recorderType:StereoAudioRecorder}. Use this property on "stopRecording" to verify the encoder's sample-rates.
         * @property {number} bufferSize - Buffer-size used to encode the WAV container
         * @memberof RecordRTC
         * @instance
         * @readonly
         * @example
         * recorder.stopRecording(function() {
         *     alert('Recorder used this buffer-size: ' + this.bufferSize);
         * });
         */
        bufferSize: 0,

        /**
         * This works only with {recorderType:StereoAudioRecorder}. Use this property on "stopRecording" to verify the encoder's sample-rates.
         * @property {number} sampleRate - Sample-rates used to encode the WAV container
         * @memberof RecordRTC
         * @instance
         * @readonly
         * @example
         * recorder.stopRecording(function() {
         *     alert('Recorder used these sample-rates: ' + this.sampleRate);
         * });
         */
        sampleRate: 0,

        /**
         * {recorderType:StereoAudioRecorder} returns ArrayBuffer object.
         * @property {ArrayBuffer} buffer - Audio ArrayBuffer, supported only in Chrome.
         * @memberof RecordRTC
         * @instance
         * @readonly
         * @example
         * recorder.stopRecording(function() {
         *     var arrayBuffer = this.buffer;
         *     alert(arrayBuffer.byteLength);
         * });
         */
        buffer: null,

        /**
         * This method resets the recorder. So that you can reuse single recorder instance many times.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.reset();
         * recorder.startRecording();
         */
        reset: function() {
            if (self.state === 'recording' && !config.disableLogs) {
                console.warn('Stop an active recorder.');
            }

            if (mediaRecorder && typeof mediaRecorder.clearRecordedData === 'function') {
                mediaRecorder.clearRecordedData();
            }
            mediaRecorder = null;
            setState('inactive');
            self.blob = null;
        },

        /**
         * This method is called whenever recorder's state changes. Use this as an "event".
         * @property {String} state - A recorder's state can be: recording, paused, stopped or inactive.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.onStateChanged = function(state) {
         *     console.log('Recorder state: ', state);
         * };
         */
        onStateChanged: function(state) {
            if (!config.disableLogs) {
                console.log('Recorder state changed:', state);
            }
        },

        /**
         * A recorder can have inactive, recording, paused or stopped states.
         * @property {String} state - A recorder's state can be: recording, paused, stopped or inactive.
         * @memberof RecordRTC
         * @static
         * @readonly
         * @example
         * // this looper function will keep you updated about the recorder's states.
         * (function looper() {
         *     document.querySelector('h1').innerHTML = 'Recorder\'s state is: ' + recorder.state;
         *     if(recorder.state === 'stopped') return; // ignore+stop
         *     setTimeout(looper, 1000); // update after every 3-seconds
         * })();
         * recorder.startRecording();
         */
        state: 'inactive',

        /**
         * Get recorder's readonly state.
         * @method
         * @memberof RecordRTC
         * @example
         * var state = recorder.getState();
         * @returns {String} Returns recording state.
         */
        getState: function() {
            return self.state;
        },

        /**
         * Destroy RecordRTC instance. Clear all recorders and objects.
         * @method
         * @memberof RecordRTC
         * @example
         * recorder.destroy();
         */
        destroy: function() {
            var disableLogsCache = config.disableLogs;

            config = {
                disableLogs: true
            };
            self.reset();
            setState('destroyed');
            returnObject = self = null;

            if (Storage.AudioContextConstructor) {
                Storage.AudioContextConstructor.close();
                Storage.AudioContextConstructor = null;
            }

            config.disableLogs = disableLogsCache;

            if (!config.disableLogs) {
                console.log('RecordRTC is destroyed.');
            }
        },

        /**
         * RecordRTC version number
         * @property {String} version - Release version number.
         * @memberof RecordRTC
         * @static
         * @readonly
         * @example
         * alert(recorder.version);
         */
        version: '5.5.8'
    };

    if (!this) {
        self = returnObject;
        return returnObject;
    }

    // if someone wants to use RecordRTC with the "new" keyword.
    for (var prop in returnObject) {
        this[prop] = returnObject[prop];
    }

    self = this;

    return returnObject;
}

RecordRTC.version = '5.5.8';

if (true /* && !!module.exports*/ ) {
    module.exports = RecordRTC;
}

if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return RecordRTC;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}

RecordRTC.getFromDisk = function(type, callback) {
    if (!callback) {
        throw 'callback is mandatory.';
    }

    console.log('Getting recorded ' + (type === 'all' ? 'blobs' : type + ' blob ') + ' from disk!');
    DiskStorage.Fetch(function(dataURL, _type) {
        if (type !== 'all' && _type === type + 'Blob' && callback) {
            callback(dataURL);
        }

        if (type === 'all' && callback) {
            callback(dataURL, _type.replace('Blob', ''));
        }
    });
};

/**
 * This method can be used to store recorded blobs into IndexedDB storage.
 * @param {object} options - {audio: Blob, video: Blob, gif: Blob}
 * @method
 * @memberof RecordRTC
 * @example
 * RecordRTC.writeToDisk({
 *     audio: audioBlob,
 *     video: videoBlob,
 *     gif  : gifBlob
 * });
 */
RecordRTC.writeToDisk = function(options) {
    console.log('Writing recorded blob(s) to disk!');
    options = options || {};
    if (options.audio && options.video && options.gif) {
        options.audio.getDataURL(function(audioDataURL) {
            options.video.getDataURL(function(videoDataURL) {
                options.gif.getDataURL(function(gifDataURL) {
                    DiskStorage.Store({
                        audioBlob: audioDataURL,
                        videoBlob: videoDataURL,
                        gifBlob: gifDataURL
                    });
                });
            });
        });
    } else if (options.audio && options.video) {
        options.audio.getDataURL(function(audioDataURL) {
            options.video.getDataURL(function(videoDataURL) {
                DiskStorage.Store({
                    audioBlob: audioDataURL,
                    videoBlob: videoDataURL
                });
            });
        });
    } else if (options.audio && options.gif) {
        options.audio.getDataURL(function(audioDataURL) {
            options.gif.getDataURL(function(gifDataURL) {
                DiskStorage.Store({
                    audioBlob: audioDataURL,
                    gifBlob: gifDataURL
                });
            });
        });
    } else if (options.video && options.gif) {
        options.video.getDataURL(function(videoDataURL) {
            options.gif.getDataURL(function(gifDataURL) {
                DiskStorage.Store({
                    videoBlob: videoDataURL,
                    gifBlob: gifDataURL
                });
            });
        });
    } else if (options.audio) {
        options.audio.getDataURL(function(audioDataURL) {
            DiskStorage.Store({
                audioBlob: audioDataURL
            });
        });
    } else if (options.video) {
        options.video.getDataURL(function(videoDataURL) {
            DiskStorage.Store({
                videoBlob: videoDataURL
            });
        });
    } else if (options.gif) {
        options.gif.getDataURL(function(gifDataURL) {
            DiskStorage.Store({
                gifBlob: gifDataURL
            });
        });
    }
};

// __________________________
// RecordRTC-Configuration.js

/**
 * {@link RecordRTCConfiguration} is an inner/private helper for {@link RecordRTC}.
 * @summary It configures the 2nd parameter passed over {@link RecordRTC} and returns a valid "config" object.
 * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
 * @author {@link https://MuazKhan.com|Muaz Khan}
 * @typedef RecordRTCConfiguration
 * @class
 * @example
 * var options = RecordRTCConfiguration(mediaStream, options);
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 * @param {object} config - {type:"video", disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, getNativeBlob:true, etc.}
 */

function RecordRTCConfiguration(mediaStream, config) {
    if (!config.recorderType && !config.type) {
        if (!!config.audio && !!config.video) {
            config.type = 'video';
        } else if (!!config.audio && !config.video) {
            config.type = 'audio';
        }
    }

    if (config.recorderType && !config.type) {
        if (config.recorderType === WhammyRecorder || config.recorderType === CanvasRecorder || (typeof WebAssemblyRecorder !== 'undefined' && config.recorderType === WebAssemblyRecorder)) {
            config.type = 'video';
        } else if (config.recorderType === GifRecorder) {
            config.type = 'gif';
        } else if (config.recorderType === StereoAudioRecorder) {
            config.type = 'audio';
        } else if (config.recorderType === MediaStreamRecorder) {
            if (getTracks(mediaStream, 'audio').length && getTracks(mediaStream, 'video').length) {
                config.type = 'video';
            } else if (!getTracks(mediaStream, 'audio').length && getTracks(mediaStream, 'video').length) {
                config.type = 'video';
            } else if (getTracks(mediaStream, 'audio').length && !getTracks(mediaStream, 'video').length) {
                config.type = 'audio';
            } else {
                // config.type = 'UnKnown';
            }
        }
    }

    if (typeof MediaStreamRecorder !== 'undefined' && typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype) {
        if (!config.mimeType) {
            config.mimeType = 'video/webm';
        }

        if (!config.type) {
            config.type = config.mimeType.split('/')[0];
        }

        if (!config.bitsPerSecond) {
            // config.bitsPerSecond = 128000;
        }
    }

    // consider default type=audio
    if (!config.type) {
        if (config.mimeType) {
            config.type = config.mimeType.split('/')[0];
        }
        if (!config.type) {
            config.type = 'audio';
        }
    }

    return config;
}

// __________________
// GetRecorderType.js

/**
 * {@link GetRecorderType} is an inner/private helper for {@link RecordRTC}.
 * @summary It returns best recorder-type available for your browser.
 * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
 * @author {@link https://MuazKhan.com|Muaz Khan}
 * @typedef GetRecorderType
 * @class
 * @example
 * var RecorderType = GetRecorderType(options);
 * var recorder = new RecorderType(options);
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 * @param {object} config - {type:"video", disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, etc.}
 */

function GetRecorderType(mediaStream, config) {
    var recorder;

    // StereoAudioRecorder can work with all three: Edge, Firefox and Chrome
    // todo: detect if it is Edge, then auto use: StereoAudioRecorder
    if (isChrome || isEdge || isOpera) {
        // Media Stream Recording API has not been implemented in chrome yet;
        // That's why using WebAudio API to record stereo audio in WAV format
        recorder = StereoAudioRecorder;
    }

    if (typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype && !isChrome) {
        recorder = MediaStreamRecorder;
    }

    // video recorder (in WebM format)
    if (config.type === 'video' && (isChrome || isOpera)) {
        recorder = WhammyRecorder;

        if (typeof WebAssemblyRecorder !== 'undefined' && typeof ReadableStream !== 'undefined') {
            recorder = WebAssemblyRecorder;
        }
    }

    // video recorder (in Gif format)
    if (config.type === 'gif') {
        recorder = GifRecorder;
    }

    // html2canvas recording!
    if (config.type === 'canvas') {
        recorder = CanvasRecorder;
    }

    if (isMediaRecorderCompatible() && recorder !== CanvasRecorder && recorder !== GifRecorder && typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype) {
        if (getTracks(mediaStream, 'video').length || getTracks(mediaStream, 'audio').length) {
            // audio-only recording
            if (config.type === 'audio') {
                if (typeof MediaRecorder.isTypeSupported === 'function' && MediaRecorder.isTypeSupported('audio/webm')) {
                    recorder = MediaStreamRecorder;
                }
                // else recorder = StereoAudioRecorder;
            } else {
                // video or screen tracks
                if (typeof MediaRecorder.isTypeSupported === 'function' && MediaRecorder.isTypeSupported('video/webm')) {
                    recorder = MediaStreamRecorder;
                }
            }
        }
    }

    if (mediaStream instanceof Array && mediaStream.length) {
        recorder = MultiStreamRecorder;
    }

    if (config.recorderType) {
        recorder = config.recorderType;
    }

    if (!config.disableLogs && !!recorder && !!recorder.name) {
        console.log('Using recorderType:', recorder.name || recorder.constructor.name);
    }

    if (!recorder && isSafari) {
        recorder = MediaStreamRecorder;
    }

    return recorder;
}

// _____________
// MRecordRTC.js

/**
 * MRecordRTC runs on top of {@link RecordRTC} to bring multiple recordings in a single place, by providing simple API.
 * @summary MRecordRTC stands for "Multiple-RecordRTC".
 * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
 * @author {@link https://MuazKhan.com|Muaz Khan}
 * @typedef MRecordRTC
 * @class
 * @example
 * var recorder = new MRecordRTC();
 * recorder.addStream(MediaStream);
 * recorder.mediaType = {
 *     audio: true, // or StereoAudioRecorder or MediaStreamRecorder
 *     video: true, // or WhammyRecorder or MediaStreamRecorder or WebAssemblyRecorder or CanvasRecorder
 *     gif: true    // or GifRecorder
 * };
 * // mimeType is optional and should be set only in advance cases.
 * recorder.mimeType = {
 *     audio: 'audio/wav',
 *     video: 'video/webm',
 *     gif:   'image/gif'
 * };
 * recorder.startRecording();
 * @see For further information:
 * @see {@link https://github.com/muaz-khan/RecordRTC/tree/master/MRecordRTC|MRecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 * @requires {@link RecordRTC}
 */

function MRecordRTC(mediaStream) {

    /**
     * This method attaches MediaStream object to {@link MRecordRTC}.
     * @param {MediaStream} mediaStream - A MediaStream object, either fetched using getUserMedia API, or generated using captureStreamUntilEnded or WebAudio API.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.addStream(MediaStream);
     */
    this.addStream = function(_mediaStream) {
        if (_mediaStream) {
            mediaStream = _mediaStream;
        }
    };

    /**
     * This property can be used to set the recording type e.g. audio, or video, or gif, or canvas.
     * @property {object} mediaType - {audio: true, video: true, gif: true}
     * @memberof MRecordRTC
     * @example
     * var recorder = new MRecordRTC();
     * recorder.mediaType = {
     *     audio: true, // TRUE or StereoAudioRecorder or MediaStreamRecorder
     *     video: true, // TRUE or WhammyRecorder or MediaStreamRecorder or WebAssemblyRecorder or CanvasRecorder
     *     gif  : true  // TRUE or GifRecorder
     * };
     */
    this.mediaType = {
        audio: true,
        video: true
    };

    /**
     * This method starts recording.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.startRecording();
     */
    this.startRecording = function() {
        var mediaType = this.mediaType;
        var recorderType;
        var mimeType = this.mimeType || {
            audio: null,
            video: null,
            gif: null
        };

        if (typeof mediaType.audio !== 'function' && isMediaRecorderCompatible() && !getTracks(mediaStream, 'audio').length) {
            mediaType.audio = false;
        }

        if (typeof mediaType.video !== 'function' && isMediaRecorderCompatible() && !getTracks(mediaStream, 'video').length) {
            mediaType.video = false;
        }

        if (typeof mediaType.gif !== 'function' && isMediaRecorderCompatible() && !getTracks(mediaStream, 'video').length) {
            mediaType.gif = false;
        }

        if (!mediaType.audio && !mediaType.video && !mediaType.gif) {
            throw 'MediaStream must have either audio or video tracks.';
        }

        if (!!mediaType.audio) {
            recorderType = null;
            if (typeof mediaType.audio === 'function') {
                recorderType = mediaType.audio;
            }

            this.audioRecorder = new RecordRTC(mediaStream, {
                type: 'audio',
                bufferSize: this.bufferSize,
                sampleRate: this.sampleRate,
                numberOfAudioChannels: this.numberOfAudioChannels || 2,
                disableLogs: this.disableLogs,
                recorderType: recorderType,
                mimeType: mimeType.audio,
                timeSlice: this.timeSlice,
                onTimeStamp: this.onTimeStamp
            });

            if (!mediaType.video) {
                this.audioRecorder.startRecording();
            }
        }

        if (!!mediaType.video) {
            recorderType = null;
            if (typeof mediaType.video === 'function') {
                recorderType = mediaType.video;
            }

            var newStream = mediaStream;

            if (isMediaRecorderCompatible() && !!mediaType.audio && typeof mediaType.audio === 'function') {
                var videoTrack = getTracks(mediaStream, 'video')[0];

                if (isFirefox) {
                    newStream = new MediaStream();
                    newStream.addTrack(videoTrack);

                    if (recorderType && recorderType === WhammyRecorder) {
                        // Firefox does NOT supports webp-encoding yet
                        // But Firefox do supports WebAssemblyRecorder
                        recorderType = MediaStreamRecorder;
                    }
                } else {
                    newStream = new MediaStream();
                    newStream.addTrack(videoTrack);
                }
            }

            this.videoRecorder = new RecordRTC(newStream, {
                type: 'video',
                video: this.video,
                canvas: this.canvas,
                frameInterval: this.frameInterval || 10,
                disableLogs: this.disableLogs,
                recorderType: recorderType,
                mimeType: mimeType.video,
                timeSlice: this.timeSlice,
                onTimeStamp: this.onTimeStamp,
                workerPath: this.workerPath,
                webAssemblyPath: this.webAssemblyPath,
                frameRate: this.frameRate, // used by WebAssemblyRecorder; values: usually 30; accepts any.
                bitrate: this.bitrate // used by WebAssemblyRecorder; values: 0 to 1000+
            });

            if (!mediaType.audio) {
                this.videoRecorder.startRecording();
            }
        }

        if (!!mediaType.audio && !!mediaType.video) {
            var self = this;

            var isSingleRecorder = isMediaRecorderCompatible() === true;

            if (mediaType.audio instanceof StereoAudioRecorder && !!mediaType.video) {
                isSingleRecorder = false;
            } else if (mediaType.audio !== true && mediaType.video !== true && mediaType.audio !== mediaType.video) {
                isSingleRecorder = false;
            }

            if (isSingleRecorder === true) {
                self.audioRecorder = null;
                self.videoRecorder.startRecording();
            } else {
                self.videoRecorder.initRecorder(function() {
                    self.audioRecorder.initRecorder(function() {
                        // Both recorders are ready to record things accurately
                        self.videoRecorder.startRecording();
                        self.audioRecorder.startRecording();
                    });
                });
            }
        }

        if (!!mediaType.gif) {
            recorderType = null;
            if (typeof mediaType.gif === 'function') {
                recorderType = mediaType.gif;
            }
            this.gifRecorder = new RecordRTC(mediaStream, {
                type: 'gif',
                frameRate: this.frameRate || 200,
                quality: this.quality || 10,
                disableLogs: this.disableLogs,
                recorderType: recorderType,
                mimeType: mimeType.gif
            });
            this.gifRecorder.startRecording();
        }
    };

    /**
     * This method stops recording.
     * @param {function} callback - Callback function is invoked when all encoders finished their jobs.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.stopRecording(function(recording){
     *     var audioBlob = recording.audio;
     *     var videoBlob = recording.video;
     *     var gifBlob   = recording.gif;
     * });
     */
    this.stopRecording = function(callback) {
        callback = callback || function() {};

        if (this.audioRecorder) {
            this.audioRecorder.stopRecording(function(blobURL) {
                callback(blobURL, 'audio');
            });
        }

        if (this.videoRecorder) {
            this.videoRecorder.stopRecording(function(blobURL) {
                callback(blobURL, 'video');
            });
        }

        if (this.gifRecorder) {
            this.gifRecorder.stopRecording(function(blobURL) {
                callback(blobURL, 'gif');
            });
        }
    };

    /**
     * This method pauses recording.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.pauseRecording();
     */
    this.pauseRecording = function() {
        if (this.audioRecorder) {
            this.audioRecorder.pauseRecording();
        }

        if (this.videoRecorder) {
            this.videoRecorder.pauseRecording();
        }

        if (this.gifRecorder) {
            this.gifRecorder.pauseRecording();
        }
    };

    /**
     * This method resumes recording.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.resumeRecording();
     */
    this.resumeRecording = function() {
        if (this.audioRecorder) {
            this.audioRecorder.resumeRecording();
        }

        if (this.videoRecorder) {
            this.videoRecorder.resumeRecording();
        }

        if (this.gifRecorder) {
            this.gifRecorder.resumeRecording();
        }
    };

    /**
     * This method can be used to manually get all recorded blobs.
     * @param {function} callback - All recorded blobs are passed back to the "callback" function.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.getBlob(function(recording){
     *     var audioBlob = recording.audio;
     *     var videoBlob = recording.video;
     *     var gifBlob   = recording.gif;
     * });
     * // or
     * var audioBlob = recorder.getBlob().audio;
     * var videoBlob = recorder.getBlob().video;
     */
    this.getBlob = function(callback) {
        var output = {};

        if (this.audioRecorder) {
            output.audio = this.audioRecorder.getBlob();
        }

        if (this.videoRecorder) {
            output.video = this.videoRecorder.getBlob();
        }

        if (this.gifRecorder) {
            output.gif = this.gifRecorder.getBlob();
        }

        if (callback) {
            callback(output);
        }

        return output;
    };

    /**
     * Destroy all recorder instances.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.destroy();
     */
    this.destroy = function() {
        if (this.audioRecorder) {
            this.audioRecorder.destroy();
            this.audioRecorder = null;
        }

        if (this.videoRecorder) {
            this.videoRecorder.destroy();
            this.videoRecorder = null;
        }

        if (this.gifRecorder) {
            this.gifRecorder.destroy();
            this.gifRecorder = null;
        }
    };

    /**
     * This method can be used to manually get all recorded blobs' DataURLs.
     * @param {function} callback - All recorded blobs' DataURLs are passed back to the "callback" function.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.getDataURL(function(recording){
     *     var audioDataURL = recording.audio;
     *     var videoDataURL = recording.video;
     *     var gifDataURL   = recording.gif;
     * });
     */
    this.getDataURL = function(callback) {
        this.getBlob(function(blob) {
            if (blob.audio && blob.video) {
                getDataURL(blob.audio, function(_audioDataURL) {
                    getDataURL(blob.video, function(_videoDataURL) {
                        callback({
                            audio: _audioDataURL,
                            video: _videoDataURL
                        });
                    });
                });
            } else if (blob.audio) {
                getDataURL(blob.audio, function(_audioDataURL) {
                    callback({
                        audio: _audioDataURL
                    });
                });
            } else if (blob.video) {
                getDataURL(blob.video, function(_videoDataURL) {
                    callback({
                        video: _videoDataURL
                    });
                });
            }
        });

        function getDataURL(blob, callback00) {
            if (typeof Worker !== 'undefined') {
                var webWorker = processInWebWorker(function readFile(_blob) {
                    postMessage(new FileReaderSync().readAsDataURL(_blob));
                });

                webWorker.onmessage = function(event) {
                    callback00(event.data);
                };

                webWorker.postMessage(blob);
            } else {
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = function(event) {
                    callback00(event.target.result);
                };
            }
        }

        function processInWebWorker(_function) {
            var blob = URL.createObjectURL(new Blob([_function.toString(),
                'this.onmessage =  function (eee) {' + _function.name + '(eee.data);}'
            ], {
                type: 'application/javascript'
            }));

            var worker = new Worker(blob);
            var url;
            if (typeof URL !== 'undefined') {
                url = URL;
            } else if (typeof webkitURL !== 'undefined') {
                url = webkitURL;
            } else {
                throw 'Neither URL nor webkitURL detected.';
            }
            url.revokeObjectURL(blob);
            return worker;
        }
    };

    /**
     * This method can be used to ask {@link MRecordRTC} to write all recorded blobs into IndexedDB storage.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.writeToDisk();
     */
    this.writeToDisk = function() {
        RecordRTC.writeToDisk({
            audio: this.audioRecorder,
            video: this.videoRecorder,
            gif: this.gifRecorder
        });
    };

    /**
     * This method can be used to invoke a save-as dialog for all recorded blobs.
     * @param {object} args - {audio: 'audio-name', video: 'video-name', gif: 'gif-name'}
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.save({
     *     audio: 'audio-file-name',
     *     video: 'video-file-name',
     *     gif  : 'gif-file-name'
     * });
     */
    this.save = function(args) {
        args = args || {
            audio: true,
            video: true,
            gif: true
        };

        if (!!args.audio && this.audioRecorder) {
            this.audioRecorder.save(typeof args.audio === 'string' ? args.audio : '');
        }

        if (!!args.video && this.videoRecorder) {
            this.videoRecorder.save(typeof args.video === 'string' ? args.video : '');
        }
        if (!!args.gif && this.gifRecorder) {
            this.gifRecorder.save(typeof args.gif === 'string' ? args.gif : '');
        }
    };
}

/**
 * This method can be used to get all recorded blobs from IndexedDB storage.
 * @param {string} type - 'all' or 'audio' or 'video' or 'gif'
 * @param {function} callback - Callback function to get all stored blobs.
 * @method
 * @memberof MRecordRTC
 * @example
 * MRecordRTC.getFromDisk('all', function(dataURL, type){
 *     if(type === 'audio') { }
 *     if(type === 'video') { }
 *     if(type === 'gif')   { }
 * });
 */
MRecordRTC.getFromDisk = RecordRTC.getFromDisk;

/**
 * This method can be used to store recorded blobs into IndexedDB storage.
 * @param {object} options - {audio: Blob, video: Blob, gif: Blob}
 * @method
 * @memberof MRecordRTC
 * @example
 * MRecordRTC.writeToDisk({
 *     audio: audioBlob,
 *     video: videoBlob,
 *     gif  : gifBlob
 * });
 */
MRecordRTC.writeToDisk = RecordRTC.writeToDisk;

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.MRecordRTC = MRecordRTC;
}

var browserFakeUserAgent = 'Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45';

(function(that) {
    if (!that) {
        return;
    }

    if (typeof window !== 'undefined') {
        return;
    }

    if (typeof global === 'undefined') {
        return;
    }

    global.navigator = {
        userAgent: browserFakeUserAgent,
        getUserMedia: function() {}
    };

    if (!global.console) {
        global.console = {};
    }

    if (typeof global.console.log === 'undefined' || typeof global.console.error === 'undefined') {
        global.console.error = global.console.log = global.console.log || function() {
            console.log(arguments);
        };
    }

    if (typeof document === 'undefined') {
        /*global document:true */
        that.document = {
            documentElement: {
                appendChild: function() {
                    return '';
                }
            }
        };

        document.createElement = document.captureStream = document.mozCaptureStream = function() {
            var obj = {
                getContext: function() {
                    return obj;
                },
                play: function() {},
                pause: function() {},
                drawImage: function() {},
                toDataURL: function() {
                    return '';
                },
                style: {}
            };
            return obj;
        };

        that.HTMLVideoElement = function() {};
    }

    if (typeof location === 'undefined') {
        /*global location:true */
        that.location = {
            protocol: 'file:',
            href: '',
            hash: ''
        };
    }

    if (typeof screen === 'undefined') {
        /*global screen:true */
        that.screen = {
            width: 0,
            height: 0
        };
    }

    if (typeof URL === 'undefined') {
        /*global screen:true */
        that.URL = {
            createObjectURL: function() {
                return '';
            },
            revokeObjectURL: function() {
                return '';
            }
        };
    }

    /*global window:true */
    that.window = global;
})(typeof global !== 'undefined' ? global : null);

// _____________________________
// Cross-Browser-Declarations.js

// animation-frame used in WebM recording

/*jshint -W079 */
var requestAnimationFrame = window.requestAnimationFrame;
if (typeof requestAnimationFrame === 'undefined') {
    if (typeof webkitRequestAnimationFrame !== 'undefined') {
        /*global requestAnimationFrame:true */
        requestAnimationFrame = webkitRequestAnimationFrame;
    } else if (typeof mozRequestAnimationFrame !== 'undefined') {
        /*global requestAnimationFrame:true */
        requestAnimationFrame = mozRequestAnimationFrame;
    } else if (typeof msRequestAnimationFrame !== 'undefined') {
        /*global requestAnimationFrame:true */
        requestAnimationFrame = msRequestAnimationFrame;
    } else if (typeof requestAnimationFrame === 'undefined') {
        // via: https://gist.github.com/paulirish/1579671
        var lastTime = 0;

        /*global requestAnimationFrame:true */
        requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
}

/*jshint -W079 */
var cancelAnimationFrame = window.cancelAnimationFrame;
if (typeof cancelAnimationFrame === 'undefined') {
    if (typeof webkitCancelAnimationFrame !== 'undefined') {
        /*global cancelAnimationFrame:true */
        cancelAnimationFrame = webkitCancelAnimationFrame;
    } else if (typeof mozCancelAnimationFrame !== 'undefined') {
        /*global cancelAnimationFrame:true */
        cancelAnimationFrame = mozCancelAnimationFrame;
    } else if (typeof msCancelAnimationFrame !== 'undefined') {
        /*global cancelAnimationFrame:true */
        cancelAnimationFrame = msCancelAnimationFrame;
    } else if (typeof cancelAnimationFrame === 'undefined') {
        /*global cancelAnimationFrame:true */
        cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}

// WebAudio API representer
var AudioContext = window.AudioContext;

if (typeof AudioContext === 'undefined') {
    if (typeof webkitAudioContext !== 'undefined') {
        /*global AudioContext:true */
        AudioContext = webkitAudioContext;
    }

    if (typeof mozAudioContext !== 'undefined') {
        /*global AudioContext:true */
        AudioContext = mozAudioContext;
    }
}

/*jshint -W079 */
var URL = window.URL;

if (typeof URL === 'undefined' && typeof webkitURL !== 'undefined') {
    /*global URL:true */
    URL = webkitURL;
}

if (typeof navigator !== 'undefined' && typeof navigator.getUserMedia === 'undefined') { // maybe window.navigator?
    if (typeof navigator.webkitGetUserMedia !== 'undefined') {
        navigator.getUserMedia = navigator.webkitGetUserMedia;
    }

    if (typeof navigator.mozGetUserMedia !== 'undefined') {
        navigator.getUserMedia = navigator.mozGetUserMedia;
    }
}

var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveBlob || !!navigator.msSaveOrOpenBlob);
var isOpera = !!window.opera || navigator.userAgent.indexOf('OPR/') !== -1;
var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1 && ('netscape' in window) && / rv:/.test(navigator.userAgent);
var isChrome = (!isOpera && !isEdge && !!navigator.webkitGetUserMedia) || isElectron() || navigator.userAgent.toLowerCase().indexOf('chrome/') !== -1;

var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (isSafari && !isChrome && navigator.userAgent.indexOf('CriOS') !== -1) {
    isSafari = false;
    isChrome = true;
}

var MediaStream = window.MediaStream;

if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
    MediaStream = webkitMediaStream;
}

/*global MediaStream:true */
if (typeof MediaStream !== 'undefined') {
    // override "stop" method for all browsers
    if (typeof MediaStream.prototype.stop === 'undefined') {
        MediaStream.prototype.stop = function() {
            this.getTracks().forEach(function(track) {
                track.stop();
            });
        };
    }
}

// below function via: http://goo.gl/B3ae8c
/**
 * Return human-readable file size.
 * @param {number} bytes - Pass bytes and get formatted string.
 * @returns {string} - formatted string
 * @example
 * bytesToSize(1024*1024*5) === '5 GB'
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 */
function bytesToSize(bytes) {
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
        return '0 Bytes';
    }
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

/**
 * @param {Blob} file - File or Blob object. This parameter is required.
 * @param {string} fileName - Optional file name e.g. "Recorded-Video.webm"
 * @example
 * invokeSaveAsDialog(blob or file, [optional] fileName);
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 */
function invokeSaveAsDialog(file, fileName) {
    if (!file) {
        throw 'Blob object is required.';
    }

    if (!file.type) {
        try {
            file.type = 'video/webm';
        } catch (e) {}
    }

    var fileExtension = (file.type || 'video/webm').split('/')[1];

    if (fileName && fileName.indexOf('.') !== -1) {
        var splitted = fileName.split('.');
        fileName = splitted[0];
        fileExtension = splitted[1];
    }

    var fileFullName = (fileName || (Math.round(Math.random() * 9999999999) + 888888888)) + '.' + fileExtension;

    if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
        return navigator.msSaveOrOpenBlob(file, fileFullName);
    } else if (typeof navigator.msSaveBlob !== 'undefined') {
        return navigator.msSaveBlob(file, fileFullName);
    }

    var hyperlink = document.createElement('a');
    hyperlink.href = URL.createObjectURL(file);
    hyperlink.download = fileFullName;

    hyperlink.style = 'display:none;opacity:0;color:transparent;';
    (document.body || document.documentElement).appendChild(hyperlink);

    if (typeof hyperlink.click === 'function') {
        hyperlink.click();
    } else {
        hyperlink.target = '_blank';
        hyperlink.dispatchEvent(new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        }));
    }

    URL.revokeObjectURL(hyperlink.href);
}

/**
 * from: https://github.com/cheton/is-electron/blob/master/index.js
 **/
function isElectron() {
    // Renderer process
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
        return true;
    }

    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
        return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to true
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }

    return false;
}

function getTracks(stream, kind) {
    if (!stream || !stream.getTracks) {
        return [];
    }

    return stream.getTracks().filter(function(t) {
        return t.kind === (kind || 'audio');
    });
}

function setSrcObject(stream, element) {
    if ('srcObject' in element) {
        element.srcObject = stream;
    } else if ('mozSrcObject' in element) {
        element.mozSrcObject = stream;
    } else {
        element.srcObject = stream;
    }
}

/**
 * @param {Blob} file - File or Blob object.
 * @param {function} callback - Callback function.
 * @example
 * getSeekableBlob(blob or file, callback);
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 */
function getSeekableBlob(inputBlob, callback) {
    // EBML.js copyrights goes to: https://github.com/legokichi/ts-ebml
    if (typeof EBML === 'undefined') {
        throw new Error('Please link: https://cdn.webrtc-experiment.com/EBML.js');
    }

    var reader = new EBML.Reader();
    var decoder = new EBML.Decoder();
    var tools = EBML.tools;

    var fileReader = new FileReader();
    fileReader.onload = function(e) {
        var ebmlElms = decoder.decode(this.result);
        ebmlElms.forEach(function(element) {
            reader.read(element);
        });
        reader.stop();
        var refinedMetadataBuf = tools.makeMetadataSeekable(reader.metadatas, reader.duration, reader.cues);
        var body = this.result.slice(reader.metadataSize);
        var newBlob = new Blob([refinedMetadataBuf, body], {
            type: 'video/webm'
        });

        callback(newBlob);
    };
    fileReader.readAsArrayBuffer(inputBlob);
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.invokeSaveAsDialog = invokeSaveAsDialog;
    RecordRTC.getTracks = getTracks;
    RecordRTC.getSeekableBlob = getSeekableBlob;
    RecordRTC.bytesToSize = bytesToSize;
    RecordRTC.isElectron = isElectron;
}

// __________ (used to handle stuff like http://goo.gl/xmE5eg) issue #129
// Storage.js

/**
 * Storage is a standalone object used by {@link RecordRTC} to store reusable objects e.g. "new AudioContext".
 * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
 * @author {@link https://MuazKhan.com|Muaz Khan}
 * @example
 * Storage.AudioContext === webkitAudioContext
 * @property {webkitAudioContext} AudioContext - Keeps a reference to AudioContext object.
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 */

var Storage = {};

if (typeof AudioContext !== 'undefined') {
    Storage.AudioContext = AudioContext;
} else if (typeof webkitAudioContext !== 'undefined') {
    Storage.AudioContext = webkitAudioContext;
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.Storage = Storage;
}

function isMediaRecorderCompatible() {
    if (isFirefox || isSafari || isEdge) {
        return true;
    }

    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    if (isChrome || isOpera) {
        verOffset = nAgt.indexOf('Chrome');
        fullVersion = nAgt.substring(verOffset + 7);
    }

    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(';')) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
    }

    if ((ix = fullVersion.indexOf(' ')) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
    }

    majorVersion = parseInt('' + fullVersion, 10);

    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    return majorVersion >= 49;
}

// ______________________
// MediaStreamRecorder.js

/**
 * MediaStreamRecorder is an abstraction layer for {@link https://w3c.github.io/mediacapture-record/MediaRecorder.html|MediaRecorder API}. It is used by {@link RecordRTC} to record MediaStream(s) in both Chrome and Firefox.
 * @summary Runs top over {@link https://w3c.github.io/mediacapture-record/MediaRecorder.html|MediaRecorder API}.
 * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
 * @author {@link https://github.com/muaz-khan|Muaz Khan}
 * @typedef MediaStreamRecorder
 * @class
 * @example
 * var config = {
 *     mimeType: 'video/webm', // vp8, vp9, h264, mkv, opus/vorbis
 *     audioBitsPerSecond : 256 * 8 * 1024,
 *     videoBitsPerSecond : 256 * 8 * 1024,
 *     bitsPerSecond: 256 * 8 * 1024,  // if this is provided, skip above two
 *     checkForInactiveTracks: true,
 *     timeSlice: 1000, // concatenate intervals based blobs
 *     ondataavailable: function() {} // get intervals based blobs
 * }
 * var recorder = new MediaStreamRecorder(mediaStream, config);
 * recorder.record();
 * recorder.stop(function(blob) {
 *     video.src = URL.createObjectURL(blob);
 *
 *     // or
 *     var blob = recorder.blob;
 * });
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 * @param {object} config - {disableLogs:true, initCallback: function, mimeType: "video/webm", timeSlice: 1000}
 * @throws Will throw an error if first argument "MediaStream" is missing. Also throws error if "MediaRecorder API" are not supported by the browser.
 */

function MediaStreamRecorder(mediaStream, config) {
    var self = this;

    if (typeof mediaStream === 'undefined') {
        throw 'First argument "MediaStream" is required.';
    }

    if (typeof MediaRecorder === 'undefined') {
        throw 'Your browser does not support the Media Recorder API. Please try other modules e.g. WhammyRecorder or StereoAudioRecorder.';
    }

    config = config || {
        // bitsPerSecond: 256 * 8 * 1024,
        mimeType: 'video/webm'
    };

    if (config.type === 'audio') {
        if (getTracks(mediaStream, 'video').length && getTracks(mediaStream, 'audio').length) {
            var stream;
            if (!!navigator.mozGetUserMedia) {
                stream = new MediaStream();
                stream.addTrack(getTracks(mediaStream, 'audio')[0]);
            } else {
                // webkitMediaStream
                stream = new MediaStream(getTracks(mediaStream, 'audio'));
            }
            mediaStream = stream;
        }

        if (!config.mimeType || config.mimeType.toString().toLowerCase().indexOf('audio') === -1) {
            config.mimeType = isChrome ? 'audio/webm' : 'audio/ogg';
        }

        if (config.mimeType && config.mimeType.toString().toLowerCase() !== 'audio/ogg' && !!navigator.mozGetUserMedia) {
            // forcing better codecs on Firefox (via #166)
            config.mimeType = 'audio/ogg';
        }
    }

    var arrayOfBlobs = [];

    /**
     * This method returns array of blobs. Use only with "timeSlice". Its useful to preview recording anytime, without using the "stop" method.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * var arrayOfBlobs = recorder.getArrayOfBlobs();
     * @returns {Array} Returns array of recorded blobs.
     */
    this.getArrayOfBlobs = function() {
        return arrayOfBlobs;
    };

    /**
     * This method records MediaStream.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * recorder.record();
     */
    this.record = function() {
        // set defaults
        self.blob = null;
        self.clearRecordedData();
        self.timestamps = [];
        allStates = [];
        arrayOfBlobs = [];

        var recorderHints = config;

        if (!config.disableLogs) {
            console.log('Passing following config over MediaRecorder API.', recorderHints);
        }

        if (mediaRecorder) {
            // mandatory to make sure Firefox doesn't fails to record streams 3-4 times without reloading the page.
            mediaRecorder = null;
        }

        if (isChrome && !isMediaRecorderCompatible()) {
            // to support video-only recording on stable
            recorderHints = 'video/vp8';
        }

        if (typeof MediaRecorder.isTypeSupported === 'function' && recorderHints.mimeType) {
            if (!MediaRecorder.isTypeSupported(recorderHints.mimeType)) {
                if (!config.disableLogs) {
                    console.warn('MediaRecorder API seems unable to record mimeType:', recorderHints.mimeType);
                }

                recorderHints.mimeType = config.type === 'audio' ? 'audio/webm' : 'video/webm';
            }
        }

        // using MediaRecorder API here
        try {
            mediaRecorder = new MediaRecorder(mediaStream, recorderHints);

            // reset
            config.mimeType = recorderHints.mimeType;
        } catch (e) {
            // chrome-based fallback
            mediaRecorder = new MediaRecorder(mediaStream);
        }

        // old hack?
        if (recorderHints.mimeType && !MediaRecorder.isTypeSupported && 'canRecordMimeType' in mediaRecorder && mediaRecorder.canRecordMimeType(recorderHints.mimeType) === false) {
            if (!config.disableLogs) {
                console.warn('MediaRecorder API seems unable to record mimeType:', recorderHints.mimeType);
            }
        }

        // Dispatching OnDataAvailable Handler
        mediaRecorder.ondataavailable = function(e) {
            if (e.data) {
                allStates.push('ondataavailable: ' + bytesToSize(e.data.size));
            }

            if (typeof config.timeSlice === 'number') {
                if (e.data && e.data.size && e.data.size > 100) {
                    arrayOfBlobs.push(e.data);
                    updateTimeStamp();

                    if (typeof config.ondataavailable === 'function') {
                        // intervals based blobs
                        var blob = config.getNativeBlob ? e.data : new Blob([e.data], {
                            type: getMimeType(recorderHints)
                        });
                        config.ondataavailable(blob);
                    }
                }
                return;
            }

            if (!e.data || !e.data.size || e.data.size < 100 || self.blob) {
                // make sure that stopRecording always getting fired
                // even if there is invalid data
                if (self.recordingCallback) {
                    self.recordingCallback(new Blob([], {
                        type: getMimeType(recorderHints)
                    }));
                    self.recordingCallback = null;
                }
                return;
            }

            self.blob = config.getNativeBlob ? e.data : new Blob([e.data], {
                type: getMimeType(recorderHints)
            });

            if (self.recordingCallback) {
                self.recordingCallback(self.blob);
                self.recordingCallback = null;
            }
        };

        mediaRecorder.onstart = function() {
            allStates.push('started');
        };

        mediaRecorder.onpause = function() {
            allStates.push('paused');
        };

        mediaRecorder.onresume = function() {
            allStates.push('resumed');
        };

        mediaRecorder.onstop = function() {
            allStates.push('stopped');
        };

        mediaRecorder.onerror = function(error) {
            if (!error) {
                return;
            }

            if (!error.name) {
                error.name = 'UnknownError';
            }

            allStates.push('error: ' + error);

            if (!config.disableLogs) {
                // via: https://w3c.github.io/mediacapture-record/MediaRecorder.html#exception-summary
                if (error.name.toString().toLowerCase().indexOf('invalidstate') !== -1) {
                    console.error('The MediaRecorder is not in a state in which the proposed operation is allowed to be executed.', error);
                } else if (error.name.toString().toLowerCase().indexOf('notsupported') !== -1) {
                    console.error('MIME type (', recorderHints.mimeType, ') is not supported.', error);
                } else if (error.name.toString().toLowerCase().indexOf('security') !== -1) {
                    console.error('MediaRecorder security error', error);
                }

                // older code below
                else if (error.name === 'OutOfMemory') {
                    console.error('The UA has exhaused the available memory. User agents SHOULD provide as much additional information as possible in the message attribute.', error);
                } else if (error.name === 'IllegalStreamModification') {
                    console.error('A modification to the stream has occurred that makes it impossible to continue recording. An example would be the addition of a Track while recording is occurring. User agents SHOULD provide as much additional information as possible in the message attribute.', error);
                } else if (error.name === 'OtherRecordingError') {
                    console.error('Used for an fatal error other than those listed above. User agents SHOULD provide as much additional information as possible in the message attribute.', error);
                } else if (error.name === 'GenericError') {
                    console.error('The UA cannot provide the codec or recording option that has been requested.', error);
                } else {
                    console.error('MediaRecorder Error', error);
                }
            }

            (function(looper) {
                if (!self.manuallyStopped && mediaRecorder && mediaRecorder.state === 'inactive') {
                    delete config.timeslice;

                    // 10 minutes, enough?
                    mediaRecorder.start(10 * 60 * 1000);
                    return;
                }

                setTimeout(looper, 1000);
            })();

            if (mediaRecorder.state !== 'inactive' && mediaRecorder.state !== 'stopped') {
                mediaRecorder.stop();
            }
        };

        if (typeof config.timeSlice === 'number') {
            updateTimeStamp();
            mediaRecorder.start(config.timeSlice);
        } else {
            // default is 60 minutes; enough?
            // use config => {timeSlice: 1000} otherwise

            mediaRecorder.start(3.6e+6);
        }

        if (config.initCallback) {
            config.initCallback(); // old code
        }
    };

    /**
     * @property {Array} timestamps - Array of time stamps
     * @memberof MediaStreamRecorder
     * @example
     * console.log(recorder.timestamps);
     */
    this.timestamps = [];

    function updateTimeStamp() {
        self.timestamps.push(new Date().getTime());

        if (typeof config.onTimeStamp === 'function') {
            config.onTimeStamp(self.timestamps[self.timestamps.length - 1], self.timestamps);
        }
    }

    function getMimeType(secondObject) {
        if (mediaRecorder && mediaRecorder.mimeType) {
            return mediaRecorder.mimeType;
        }

        return secondObject.mimeType || 'video/webm';
    }

    /**
     * This method stops recording MediaStream.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
     */
    this.stop = function(callback) {
        callback = callback || function() {};

        self.manuallyStopped = true; // used inside the mediaRecorder.onerror

        if (!mediaRecorder) {
            return;
        }

        this.recordingCallback = callback;

        if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
        }

        if (typeof config.timeSlice === 'number') {
            setTimeout(function() {
                self.blob = new Blob(arrayOfBlobs, {
                    type: getMimeType(config)
                });

                self.recordingCallback(self.blob);
            }, 100);
        }
    };

    /**
     * This method pauses the recording process.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * recorder.pause();
     */
    this.pause = function() {
        if (!mediaRecorder) {
            return;
        }

        if (mediaRecorder.state === 'recording') {
            mediaRecorder.pause();
        }
    };

    /**
     * This method resumes the recording process.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * recorder.resume();
     */
    this.resume = function() {
        if (!mediaRecorder) {
            return;
        }

        if (mediaRecorder.state === 'paused') {
            mediaRecorder.resume();
        }
    };

    /**
     * This method resets currently recorded data.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * recorder.clearRecordedData();
     */
    this.clearRecordedData = function() {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            self.stop(clearRecordedDataCB);
        }

        clearRecordedDataCB();
    };

    function clearRecordedDataCB() {
        arrayOfBlobs = [];
        mediaRecorder = null;
        self.timestamps = [];
    }

    // Reference to "MediaRecorder" object
    var mediaRecorder;

    /**
     * Access to native MediaRecorder API
     * @method
     * @memberof MediaStreamRecorder
     * @instance
     * @example
     * var internal = recorder.getInternalRecorder();
     * internal.ondataavailable = function() {}; // override
     * internal.stream, internal.onpause, internal.onstop, etc.
     * @returns {Object} Returns internal recording object.
     */
    this.getInternalRecorder = function() {
        return mediaRecorder;
    };

    function isMediaStreamActive() {
        if ('active' in mediaStream) {
            if (!mediaStream.active) {
                return false;
            }
        } else if ('ended' in mediaStream) { // old hack
            if (mediaStream.ended) {
                return false;
            }
        }
        return true;
    }

    /**
     * @property {Blob} blob - Recorded data as "Blob" object.
     * @memberof MediaStreamRecorder
     * @example
     * recorder.stop(function() {
     *     var blob = recorder.blob;
     * });
     */
    this.blob = null;


    /**
     * Get MediaRecorder readonly state.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * var state = recorder.getState();
     * @returns {String} Returns recording state.
     */
    this.getState = function() {
        if (!mediaRecorder) {
            return 'inactive';
        }

        return mediaRecorder.state || 'inactive';
    };

    // list of all recording states
    var allStates = [];

    /**
     * Get MediaRecorder all recording states.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * var state = recorder.getAllStates();
     * @returns {Array} Returns all recording states
     */
    this.getAllStates = function() {
        return allStates;
    };

    // if any Track within the MediaStream is muted or not enabled at any time, 
    // the browser will only record black frames 
    // or silence since that is the content produced by the Track
    // so we need to stopRecording as soon as any single track ends.
    if (typeof config.checkForInactiveTracks === 'undefined') {
        config.checkForInactiveTracks = false; // disable to minimize CPU usage
    }

    var self = this;

    // this method checks if media stream is stopped
    // or if any track is ended.
    (function looper() {
        if (!mediaRecorder || config.checkForInactiveTracks === false) {
            return;
        }

        if (isMediaStreamActive() === false) {
            if (!config.disableLogs) {
                console.log('MediaStream seems stopped.');
            }
            self.stop();
            return;
        }

        setTimeout(looper, 1000); // check every second
    })();

    // for debugging
    this.name = 'MediaStreamRecorder';
    this.toString = function() {
        return this.name;
    };
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.MediaStreamRecorder = MediaStreamRecorder;
}

// source code from: http://typedarray.org/wp-content/projects/WebAudioRecorder/script.js
// https://github.com/mattdiamond/Recorderjs#license-mit
// ______________________
// StereoAudioRecorder.js

/**
 * StereoAudioRecorder is a standalone class used by {@link RecordRTC} to bring "stereo" audio-recording in chrome.
 * @summary JavaScript standalone object for stereo audio recording.
 * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
 * @author {@link https://MuazKhan.com|Muaz Khan}
 * @typedef StereoAudioRecorder
 * @class
 * @example
 * var recorder = new StereoAudioRecorder(MediaStream, {
 *     sampleRate: 44100,
 *     bufferSize: 4096
 * });
 * recorder.record();
 * recorder.stop(function(blob) {
 *     video.src = URL.createObjectURL(blob);
 * });
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 * @param {object} config - {sampleRate: 44100, bufferSize: 4096, numberOfAudioChannels: 1, etc.}
 */

function StereoAudioRecorder(mediaStream, config) {
    if (!getTracks(mediaStream, 'audio').length) {
        throw 'Your stream has no audio tracks.';
    }

    config = config || {};

    var self = this;

    // variables
    var leftchannel = [];
    var rightchannel = [];
    var recording = false;
    var recordingLength = 0;
    var jsAudioNode;

    var numberOfAudioChannels = 2;

    /**
     * Set sample rates such as 8K or 16K. Reference: http://stackoverflow.com/a/28977136/552182
     * @property {number} desiredSampRate - Desired Bits per sample * 1000
     * @memberof StereoAudioRecorder
     * @instance
     * @example
     * var recorder = StereoAudioRecorder(mediaStream, {
     *   desiredSampRate: 16 * 1000 // bits-per-sample * 1000
     * });
     */
    var desiredSampRate = config.desiredSampRate;

    // backward compatibility
    if (config.leftChannel === true) {
        numberOfAudioChannels = 1;
    }

    if (config.numberOfAudioChannels === 1) {
        numberOfAudioChannels = 1;
    }

    if (!numberOfAudioChannels || numberOfAudioChannels < 1) {
        numberOfAudioChannels = 2;
    }

    if (!config.disableLogs) {
        console.log('StereoAudioRecorder is set to record number of channels: ' + numberOfAudioChannels);
    }

    // if any Track within the MediaStream is muted or not enabled at any time, 
    // the browser will only record black frames 
    // or silence since that is the content produced by the Track
    // so we need to stopRecording as soon as any single track ends.
    if (typeof config.checkForInactiveTracks === 'undefined') {
        config.checkForInactiveTracks = true;
    }

    function isMediaStreamActive() {
        if (config.checkForInactiveTracks === false) {
            // always return "true"
            return true;
        }

        if ('active' in mediaStream) {
            if (!mediaStream.active) {
                return false;
            }
        } else if ('ended' in mediaStream) { // old hack
            if (mediaStream.ended) {
                return false;
            }
        }
        return true;
    }

    /**
     * This method records MediaStream.
     * @method
     * @memberof StereoAudioRecorder
     * @example
     * recorder.record();
     */
    this.record = function() {
        if (isMediaStreamActive() === false) {
            throw 'Please make sure MediaStream is active.';
        }

        resetVariables();

        isAudioProcessStarted = isPaused = false;
        recording = true;

        if (typeof config.timeSlice !== 'undefined') {
            looper();
        }
    };

    function mergeLeftRightBuffers(config, callback) {
        function mergeAudioBuffers(config, cb) {
            var numberOfAudioChannels = config.numberOfAudioChannels;

            // todo: "slice(0)" --- is it causes loop? Should be removed?
            var leftBuffers = config.leftBuffers.slice(0);
            var rightBuffers = config.rightBuffers.slice(0);
            var sampleRate = config.sampleRate;
            var internalInterleavedLength = config.internalInterleavedLength;
            var desiredSampRate = config.desiredSampRate;

            if (numberOfAudioChannels === 2) {
                leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength);
                rightBuffers = mergeBuffers(rightBuffers, internalInterleavedLength);

                if (desiredSampRate) {
                    leftBuffers = interpolateArray(leftBuffers, desiredSampRate, sampleRate);
                    rightBuffers = interpolateArray(rightBuffers, desiredSampRate, sampleRate);
                }
            }

            if (numberOfAudioChannels === 1) {
                leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength);

                if (desiredSampRate) {
                    leftBuffers = interpolateArray(leftBuffers, desiredSampRate, sampleRate);
                }
            }

            // set sample rate as desired sample rate
            if (desiredSampRate) {
                sampleRate = desiredSampRate;
            }

            // for changing the sampling rate, reference:
            // http://stackoverflow.com/a/28977136/552182
            function interpolateArray(data, newSampleRate, oldSampleRate) {
                var fitCount = Math.round(data.length * (newSampleRate / oldSampleRate));
                var newData = [];
                var springFactor = Number((data.length - 1) / (fitCount - 1));
                newData[0] = data[0];
                for (var i = 1; i < fitCount - 1; i++) {
                    var tmp = i * springFactor;
                    var before = Number(Math.floor(tmp)).toFixed();
                    var after = Number(Math.ceil(tmp)).toFixed();
                    var atPoint = tmp - before;
                    newData[i] = linearInterpolate(data[before], data[after], atPoint);
                }
                newData[fitCount - 1] = data[data.length - 1];
                return newData;
            }

            function linearInterpolate(before, after, atPoint) {
                return before + (after - before) * atPoint;
            }

            function mergeBuffers(channelBuffer, rLength) {
                var result = new Float64Array(rLength);
                var offset = 0;
                var lng = channelBuffer.length;

                for (var i = 0; i < lng; i++) {
                    var buffer = channelBuffer[i];
                    result.set(buffer, offset);
                    offset += buffer.length;
                }

                return result;
            }

            function interleave(leftChannel, rightChannel) {
                var length = leftChannel.length + rightChannel.length;

                var result = new Float64Array(length);

                var inputIndex = 0;

                for (var index = 0; index < length;) {
                    result[index++] = leftChannel[inputIndex];
                    result[index++] = rightChannel[inputIndex];
                    inputIndex++;
                }
                return result;
            }

            function writeUTFBytes(view, offset, string) {
                var lng = string.length;
                for (var i = 0; i < lng; i++) {
                    view.setUint8(offset + i, string.charCodeAt(i));
                }
            }

            // interleave both channels together
            var interleaved;

            if (numberOfAudioChannels === 2) {
                interleaved = interleave(leftBuffers, rightBuffers);
            }

            if (numberOfAudioChannels === 1) {
                interleaved = leftBuffers;
            }

            var interleavedLength = interleaved.length;

            // create wav file
            var resultingBufferLength = 44 + interleavedLength * 2;

            var buffer = new ArrayBuffer(resultingBufferLength);

            var view = new DataView(buffer);

            // RIFF chunk descriptor/identifier 
            writeUTFBytes(view, 0, 'RIFF');

            // RIFF chunk length
            // changed "44" to "36" via #401
            view.setUint32(4, 36 + interleavedLength * 2, true);

            // RIFF type 
            writeUTFBytes(view, 8, 'WAVE');

            // format chunk identifier 
            // FMT sub-chunk
            writeUTFBytes(view, 12, 'fmt ');

            // format chunk length 
            view.setUint32(16, 16, true);

            // sample format (raw)
            view.setUint16(20, 1, true);

            // stereo (2 channels)
            view.setUint16(22, numberOfAudioChannels, true);

            // sample rate 
            view.setUint32(24, sampleRate, true);

            // byte rate (sample rate * block align)
            view.setUint32(28, sampleRate * 2, true);

            // block align (channel count * bytes per sample) 
            view.setUint16(32, numberOfAudioChannels * 2, true);

            // bits per sample 
            view.setUint16(34, 16, true);

            // data sub-chunk
            // data chunk identifier 
            writeUTFBytes(view, 36, 'data');

            // data chunk length 
            view.setUint32(40, interleavedLength * 2, true);

            // write the PCM samples
            var lng = interleavedLength;
            var index = 44;
            var volume = 1;
            for (var i = 0; i < lng; i++) {
                view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
                index += 2;
            }

            if (cb) {
                return cb({
                    buffer: buffer,
                    view: view
                });
            }

            postMessage({
                buffer: buffer,
                view: view
            });
        }

        if (config.noWorker) {
            mergeAudioBuffers(config, function(data) {
                callback(data.buffer, data.view);
            });
            return;
        }


        var webWorker = processInWebWorker(mergeAudioBuffers);

        webWorker.onmessage = function(event) {
            callback(event.data.buffer, event.data.view);

            // release memory
            URL.revokeObjectURL(webWorker.workerURL);

            // kill webworker (or Chrome will kill your page after ~25 calls)
            webWorker.terminate();
        };

        webWorker.postMessage(config);
    }

    function processInWebWorker(_function) {
        var workerURL = URL.createObjectURL(new Blob([_function.toString(),
            ';this.onmessage =  function (eee) {' + _function.name + '(eee.data);}'
        ], {
            type: 'application/javascript'
        }));

        var worker = new Worker(workerURL);
        worker.workerURL = workerURL;
        return worker;
    }

    /**
     * This method stops recording MediaStream.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof StereoAudioRecorder
     * @example
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
     */
    this.stop = function(callback) {
        callback = callback || function() {};

        // stop recording
        recording = false;

        mergeLeftRightBuffers({
            desiredSampRate: desiredSampRate,
            sampleRate: sampleRate,
            numberOfAudioChannels: numberOfAudioChannels,
            internalInterleavedLength: recordingLength,
            leftBuffers: leftchannel,
            rightBuffers: numberOfAudioChannels === 1 ? [] : rightchannel,
            noWorker: config.noWorker
        }, function(buffer, view) {
            /**
             * @property {Blob} blob - The recorded blob object.
             * @memberof StereoAudioRecorder
             * @example
             * recorder.stop(function(){
             *     var blob = recorder.blob;
             * });
             */
            self.blob = new Blob([view], {
                type: 'audio/wav'
            });

            /**
             * @property {ArrayBuffer} buffer - The recorded buffer object.
             * @memberof StereoAudioRecorder
             * @example
             * recorder.stop(function(){
             *     var buffer = recorder.buffer;
             * });
             */
            self.buffer = new ArrayBuffer(view.buffer.byteLength);

            /**
             * @property {DataView} view - The recorded data-view object.
             * @memberof StereoAudioRecorder
             * @example
             * recorder.stop(function(){
             *     var view = recorder.view;
             * });
             */
            self.view = view;

            self.sampleRate = desiredSampRate || sampleRate;
            self.bufferSize = bufferSize;

            // recorded audio length
            self.length = recordingLength;

            isAudioProcessStarted = false;

            if (callback) {
                callback(self.blob);
            }
        });
    };

    if (typeof Storage === 'undefined') {
        var Storage = {
            AudioContextConstructor: null,
            AudioContext: window.AudioContext || window.webkitAudioContext
        };
    }

    if (!Storage.AudioContextConstructor) {
        Storage.AudioContextConstructor = new Storage.AudioContext();
    }

    var context = Storage.AudioContextConstructor;

    // creates an audio node from the microphone incoming stream
    var audioInput = context.createMediaStreamSource(mediaStream);

    var legalBufferValues = [0, 256, 512, 1024, 2048, 4096, 8192, 16384];

    /**
     * From the spec: This value controls how frequently the audioprocess event is
     * dispatched and how many sample-frames need to be processed each call.
     * Lower values for buffer size will result in a lower (better) latency.
     * Higher values will be necessary to avoid audio breakup and glitches
     * The size of the buffer (in sample-frames) which needs to
     * be processed each time onprocessaudio is called.
     * Legal values are (256, 512, 1024, 2048, 4096, 8192, 16384).
     * @property {number} bufferSize - Buffer-size for how frequently the audioprocess event is dispatched.
     * @memberof StereoAudioRecorder
     * @example
     * recorder = new StereoAudioRecorder(mediaStream, {
     *     bufferSize: 4096
     * });
     */

    // "0" means, let chrome decide the most accurate buffer-size for current platform.
    var bufferSize = typeof config.bufferSize === 'undefined' ? 4096 : config.bufferSize;

    if (legalBufferValues.indexOf(bufferSize) === -1) {
        if (!config.disableLogs) {
            console.log('Legal values for buffer-size are ' + JSON.stringify(legalBufferValues, null, '\t'));
        }
    }

    if (context.createJavaScriptNode) {
        jsAudioNode = context.createJavaScriptNode(bufferSize, numberOfAudioChannels, numberOfAudioChannels);
    } else if (context.createScriptProcessor) {
        jsAudioNode = context.createScriptProcessor(bufferSize, numberOfAudioChannels, numberOfAudioChannels);
    } else {
        throw 'WebAudio API has no support on this browser.';
    }

    // connect the stream to the script processor
    audioInput.connect(jsAudioNode);

    if (!config.bufferSize) {
        bufferSize = jsAudioNode.bufferSize; // device buffer-size
    }

    /**
     * The sample rate (in sample-frames per second) at which the
     * AudioContext handles audio. It is assumed that all AudioNodes
     * in the context run at this rate. In making this assumption,
     * sample-rate converters or "varispeed" processors are not supported
     * in real-time processing.
     * The sampleRate parameter describes the sample-rate of the
     * linear PCM audio data in the buffer in sample-frames per second.
     * An implementation must support sample-rates in at least
     * the range 22050 to 96000.
     * @property {number} sampleRate - Buffer-size for how frequently the audioprocess event is dispatched.
     * @memberof StereoAudioRecorder
     * @example
     * recorder = new StereoAudioRecorder(mediaStream, {
     *     sampleRate: 44100
     * });
     */
    var sampleRate = typeof config.sampleRate !== 'undefined' ? config.sampleRate : context.sampleRate || 44100;

    if (sampleRate < 22050 || sampleRate > 96000) {
        // Ref: http://stackoverflow.com/a/26303918/552182
        if (!config.disableLogs) {
            console.log('sample-rate must be under range 22050 and 96000.');
        }
    }

    if (!config.disableLogs) {
        if (config.desiredSampRate) {
            console.log('Desired sample-rate: ' + config.desiredSampRate);
        }
    }

    var isPaused = false;
    /**
     * This method pauses the recording process.
     * @method
     * @memberof StereoAudioRecorder
     * @example
     * recorder.pause();
     */
    this.pause = function() {
        isPaused = true;
    };

    /**
     * This method resumes the recording process.
     * @method
     * @memberof StereoAudioRecorder
     * @example
     * recorder.resume();
     */
    this.resume = function() {
        if (isMediaStreamActive() === false) {
            throw 'Please make sure MediaStream is active.';
        }

        if (!recording) {
            if (!config.disableLogs) {
                console.log('Seems recording has been restarted.');
            }
            this.record();
            return;
        }

        isPaused = false;
    };

    /**
     * This method resets currently recorded data.
     * @method
     * @memberof StereoAudioRecorder
     * @example
     * recorder.clearRecordedData();
     */
    this.clearRecordedData = function() {
        config.checkForInactiveTracks = false;

        if (recording) {
            this.stop(clearRecordedDataCB);
        }

        clearRecordedDataCB();
    };

    function resetVariables() {
        leftchannel = [];
        rightchannel = [];
        recordingLength = 0;
        isAudioProcessStarted = false;
        recording = false;
        isPaused = false;
        context = null;

        self.leftchannel = leftchannel;
        self.rightchannel = rightchannel;
        self.numberOfAudioChannels = numberOfAudioChannels;
        self.desiredSampRate = desiredSampRate;
        self.sampleRate = sampleRate;
        self.recordingLength = recordingLength;

        intervalsBasedBuffers = {
            left: [],
            right: [],
            recordingLength: 0
        };
    }

    function clearRecordedDataCB() {
        if (jsAudioNode) {
            jsAudioNode.onaudioprocess = null;
            jsAudioNode.disconnect();
            jsAudioNode = null;
        }

        if (audioInput) {
            audioInput.disconnect();
            audioInput = null;
        }

        resetVariables();
    }

    // for debugging
    this.name = 'StereoAudioRecorder';
    this.toString = function() {
        return this.name;
    };

    var isAudioProcessStarted = false;

    function onAudioProcessDataAvailable(e) {
        if (isPaused) {
            return;
        }

        if (isMediaStreamActive() === false) {
            if (!config.disableLogs) {
                console.log('MediaStream seems stopped.');
            }
            jsAudioNode.disconnect();
            recording = false;
        }

        if (!recording) {
            if (audioInput) {
                audioInput.disconnect();
                audioInput = null;
            }
            return;
        }

        /**
         * This method is called on "onaudioprocess" event's first invocation.
         * @method {function} onAudioProcessStarted
         * @memberof StereoAudioRecorder
         * @example
         * recorder.onAudioProcessStarted: function() { };
         */
        if (!isAudioProcessStarted) {
            isAudioProcessStarted = true;
            if (config.onAudioProcessStarted) {
                config.onAudioProcessStarted();
            }

            if (config.initCallback) {
                config.initCallback();
            }
        }

        var left = e.inputBuffer.getChannelData(0);

        // we clone the samples
        var chLeft = new Float32Array(left);
        leftchannel.push(chLeft);

        if (numberOfAudioChannels === 2) {
            var right = e.inputBuffer.getChannelData(1);
            var chRight = new Float32Array(right);
            rightchannel.push(chRight);
        }

        recordingLength += bufferSize;

        // export raw PCM
        self.recordingLength = recordingLength;

        if (typeof config.timeSlice !== 'undefined') {
            intervalsBasedBuffers.recordingLength += bufferSize;
            intervalsBasedBuffers.left.push(chLeft);

            if (numberOfAudioChannels === 2) {
                intervalsBasedBuffers.right.push(chRight);
            }
        }
    }

    jsAudioNode.onaudioprocess = onAudioProcessDataAvailable;

    // to prevent self audio to be connected with speakers
    if (context.createMediaStreamDestination) {
        jsAudioNode.connect(context.createMediaStreamDestination());
    } else {
        jsAudioNode.connect(context.destination);
    }

    // export raw PCM
    this.leftchannel = leftchannel;
    this.rightchannel = rightchannel;
    this.numberOfAudioChannels = numberOfAudioChannels;
    this.desiredSampRate = desiredSampRate;
    this.sampleRate = sampleRate;
    self.recordingLength = recordingLength;

    // helper for intervals based blobs
    var intervalsBasedBuffers = {
        left: [],
        right: [],
        recordingLength: 0
    };

    // this looper is used to support intervals based blobs (via timeSlice+ondataavailable)
    function looper() {
        if (!recording || typeof config.ondataavailable !== 'function' || typeof config.timeSlice === 'undefined') {
            return;
        }

        if (intervalsBasedBuffers.left.length) {
            mergeLeftRightBuffers({
                desiredSampRate: desiredSampRate,
                sampleRate: sampleRate,
                numberOfAudioChannels: numberOfAudioChannels,
                internalInterleavedLength: intervalsBasedBuffers.recordingLength,
                leftBuffers: intervalsBasedBuffers.left,
                rightBuffers: numberOfAudioChannels === 1 ? [] : intervalsBasedBuffers.right
            }, function(buffer, view) {
                var blob = new Blob([view], {
                    type: 'audio/wav'
                });
                config.ondataavailable(blob);

                setTimeout(looper, config.timeSlice);
            });

            intervalsBasedBuffers = {
                left: [],
                right: [],
                recordingLength: 0
            };
        } else {
            setTimeout(looper, config.timeSlice);
        }
    }
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.StereoAudioRecorder = StereoAudioRecorder;
}

// _________________
// CanvasRecorder.js

/**
 * CanvasRecorder is a standalone class used by {@link RecordRTC} to bring HTML5-Canvas recording into video WebM. It uses HTML2Canvas library and runs top over {@link Whammy}.
 * @summary HTML2Canvas recording into video WebM.
 * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
 * @author {@link https://MuazKhan.com|Muaz Khan}
 * @typedef CanvasRecorder
 * @class
 * @example
 * var recorder = new CanvasRecorder(htmlElement, { disableLogs: true, useWhammyRecorder: true });
 * recorder.record();
 * recorder.stop(function(blob) {
 *     video.src = URL.createObjectURL(blob);
 * });
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {HTMLElement} htmlElement - querySelector/getElementById/getElementsByTagName[0]/etc.
 * @param {object} config - {disableLogs:true, initCallback: function}
 */

function CanvasRecorder(htmlElement, config) {
    if (typeof html2canvas === 'undefined') {
        throw 'Please link: https://cdn.webrtc-experiment.com/screenshot.js';
    }

    config = config || {};
    if (!config.frameInterval) {
        config.frameInterval = 10;
    }

    // via DetectRTC.js
    var isCanvasSupportsStreamCapturing = false;
    ['captureStream', 'mozCaptureStream', 'webkitCaptureStream'].forEach(function(item) {
        if (item in document.createElement('canvas')) {
            isCanvasSupportsStreamCapturing = true;
        }
    });

    var _isChrome = (!!window.webkitRTCPeerConnection || !!window.webkitGetUserMedia) && !!window.chrome;

    var chromeVersion = 50;
    var matchArray = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    if (_isChrome && matchArray && matchArray[2]) {
        chromeVersion = parseInt(matchArray[2], 10);
    }

    if (_isChrome && chromeVersion < 52) {
        isCanvasSupportsStreamCapturing = false;
    }

    if (config.useWhammyRecorder) {
        isCanvasSupportsStreamCapturing = false;
    }

    var globalCanvas, mediaStreamRecorder;

    if (isCanvasSupportsStreamCapturing) {
        if (!config.disableLogs) {
            console.log('Your browser supports both MediRecorder API and canvas.captureStream!');
        }

        if (htmlElement instanceof HTMLCanvasElement) {
            globalCanvas = htmlElement;
        } else if (htmlElement instanceof CanvasRenderingContext2D) {
            globalCanvas = htmlElement.canvas;
        } else {
            throw 'Please pass either HTMLCanvasElement or CanvasRenderingContext2D.';
        }
    } else if (!!navigator.mozGetUserMedia) {
        if (!config.disableLogs) {
            console.error('Canvas recording is NOT supported in Firefox.');
        }
    }

    var isRecording;

    /**
     * This method records Canvas.
     * @method
     * @memberof CanvasRecorder
     * @example
     * recorder.record();
     */
    this.record = function() {
        isRecording = true;

        if (isCanvasSupportsStreamCapturing && !config.useWhammyRecorder) {
            // CanvasCaptureMediaStream
            var canvasMediaStream;
            if ('captureStream' in globalCanvas) {
                canvasMediaStream = globalCanvas.captureStream(25); // 25 FPS
            } else if ('mozCaptureStream' in globalCanvas) {
                canvasMediaStream = globalCanvas.mozCaptureStream(25);
            } else if ('webkitCaptureStream' in globalCanvas) {
                canvasMediaStream = globalCanvas.webkitCaptureStream(25);
            }

            try {
                var mdStream = new MediaStream();
                mdStream.addTrack(getTracks(canvasMediaStream, 'video')[0]);
                canvasMediaStream = mdStream;
            } catch (e) {}

            if (!canvasMediaStream) {
                throw 'captureStream API are NOT available.';
            }

            // Note: Jan 18, 2016 status is that, 
            // Firefox MediaRecorder API can't record CanvasCaptureMediaStream object.
            mediaStreamRecorder = new MediaStreamRecorder(canvasMediaStream, {
                mimeType: config.mimeType || 'video/webm'
            });
            mediaStreamRecorder.record();
        } else {
            whammy.frames = [];
            lastTime = new Date().getTime();
            drawCanvasFrame();
        }

        if (config.initCallback) {
            config.initCallback();
        }
    };

    this.getWebPImages = function(callback) {
        if (htmlElement.nodeName.toLowerCase() !== 'canvas') {
            callback();
            return;
        }

        var framesLength = whammy.frames.length;
        whammy.frames.forEach(function(frame, idx) {
            var framesRemaining = framesLength - idx;
            if (!config.disableLogs) {
                console.log(framesRemaining + '/' + framesLength + ' frames remaining');
            }

            if (config.onEncodingCallback) {
                config.onEncodingCallback(framesRemaining, framesLength);
            }

            var webp = frame.image.toDataURL('image/webp', 1);
            whammy.frames[idx].image = webp;
        });

        if (!config.disableLogs) {
            console.log('Generating WebM');
        }

        callback();
    };

    /**
     * This method stops recording Canvas.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof CanvasRecorder
     * @example
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
     */
    this.stop = function(callback) {
        isRecording = false;

        var that = this;

        if (isCanvasSupportsStreamCapturing && mediaStreamRecorder) {
            mediaStreamRecorder.stop(callback);
            return;
        }

        this.getWebPImages(function() {
            /**
             * @property {Blob} blob - Recorded frames in video/webm blob.
             * @memberof CanvasRecorder
             * @example
             * recorder.stop(function() {
             *     var blob = recorder.blob;
             * });
             */
            whammy.compile(function(blob) {
                if (!config.disableLogs) {
                    console.log('Recording finished!');
                }

                that.blob = blob;

                if (that.blob.forEach) {
                    that.blob = new Blob([], {
                        type: 'video/webm'
                    });
                }

                if (callback) {
                    callback(that.blob);
                }

                whammy.frames = [];
            });
        });
    };

    var isPausedRecording = false;

    /**
     * This method pauses the recording process.
     * @method
     * @memberof CanvasRecorder
     * @example
     * recorder.pause();
     */
    this.pause = function() {
        isPausedRecording = true;

        if (mediaStreamRecorder instanceof MediaStreamRecorder) {
            mediaStreamRecorder.pause();
            return;
        }
    };

    /**
     * This method resumes the recording process.
     * @method
     * @memberof CanvasRecorder
     * @example
     * recorder.resume();
     */
    this.resume = function() {
        isPausedRecording = false;

        if (mediaStreamRecorder instanceof MediaStreamRecorder) {
            mediaStreamRecorder.resume();
            return;
        }

        if (!isRecording) {
            this.record();
        }
    };

    /**
     * This method resets currently recorded data.
     * @method
     * @memberof CanvasRecorder
     * @example
     * recorder.clearRecordedData();
     */
    this.clearRecordedData = function() {
        if (isRecording) {
            this.stop(clearRecordedDataCB);
        }
        clearRecordedDataCB();
    };

    function clearRecordedDataCB() {
        whammy.frames = [];
        isRecording = false;
        isPausedRecording = false;
    }

    // for debugging
    this.name = 'CanvasRecorder';
    this.toString = function() {
        return this.name;
    };

    function cloneCanvas() {
        //create a new canvas
        var newCanvas = document.createElement('canvas');
        var context = newCanvas.getContext('2d');

        //set dimensions
        newCanvas.width = htmlElement.width;
        newCanvas.height = htmlElement.height;

        //apply the old canvas to the new one
        context.drawImage(htmlElement, 0, 0);

        //return the new canvas
        return newCanvas;
    }

    function drawCanvasFrame() {
        if (isPausedRecording) {
            lastTime = new Date().getTime();
            return setTimeout(drawCanvasFrame, 500);
        }

        if (htmlElement.nodeName.toLowerCase() === 'canvas') {
            var duration = new Date().getTime() - lastTime;
            // via #206, by Jack i.e. @Seymourr
            lastTime = new Date().getTime();

            whammy.frames.push({
                image: cloneCanvas(),
                duration: duration
            });

            if (isRecording) {
                setTimeout(drawCanvasFrame, config.frameInterval);
            }
            return;
        }

        html2canvas(htmlElement, {
            grabMouse: typeof config.showMousePointer === 'undefined' || config.showMousePointer,
            onrendered: function(canvas) {
                var duration = new Date().getTime() - lastTime;
                if (!duration) {
                    return setTimeout(drawCanvasFrame, config.frameInterval);
                }

                // via #206, by Jack i.e. @Seymourr
                lastTime = new Date().getTime();

                whammy.frames.push({
                    image: canvas.toDataURL('image/webp', 1),
                    duration: duration
                });

                if (isRecording) {
                    setTimeout(drawCanvasFrame, config.frameInterval);
                }
            }
        });
    }

    var lastTime = new Date().getTime();

    var whammy = new Whammy.Video(100);
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.CanvasRecorder = CanvasRecorder;
}

// _________________
// WhammyRecorder.js

/**
 * WhammyRecorder is a standalone class used by {@link RecordRTC} to bring video recording in Chrome. It runs top over {@link Whammy}.
 * @summary Video recording feature in Chrome.
 * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
 * @author {@link https://MuazKhan.com|Muaz Khan}
 * @typedef WhammyRecorder
 * @class
 * @example
 * var recorder = new WhammyRecorder(mediaStream);
 * recorder.record();
 * recorder.stop(function(blob) {
 *     video.src = URL.createObjectURL(blob);
 * });
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 * @param {object} config - {disableLogs: true, initCallback: function, video: HTMLVideoElement, etc.}
 */

function WhammyRecorder(mediaStream, config) {

    config = config || {};

    if (!config.frameInterval) {
        config.frameInterval = 10;
    }

    if (!config.disableLogs) {
        console.log('Using frames-interval:', config.frameInterval);
    }

    /**
     * This method records video.
     * @method
     * @memberof WhammyRecorder
     * @example
     * recorder.record();
     */
    this.record = function() {
        if (!config.width) {
            config.width = 320;
        }

        if (!config.height) {
            config.height = 240;
        }

        if (!config.video) {
            config.video = {
                width: config.width,
                height: config.height
            };
        }

        if (!config.canvas) {
            config.canvas = {
                width: config.width,
                height: config.height
            };
        }

        canvas.width = config.canvas.width || 320;
        canvas.height = config.canvas.height || 240;

        context = canvas.getContext('2d');

        // setting defaults
        if (config.video && config.video instanceof HTMLVideoElement) {
            video = config.video.cloneNode();

            if (config.initCallback) {
                config.initCallback();
            }
        } else {
            video = document.createElement('video');

            setSrcObject(mediaStream, video);

            video.onloadedmetadata = function() { // "onloadedmetadata" may NOT work in FF?
                if (config.initCallback) {
                    config.initCallback();
                }
            };

            video.width = config.video.width;
            video.height = config.video.height;
        }

        video.muted = true;
        video.play();

        lastTime = new Date().getTime();
        whammy = new Whammy.Video();

        if (!config.disableLogs) {
            console.log('canvas resolutions', canvas.width, '*', canvas.height);
            console.log('video width/height', video.width || canvas.width, '*', video.height || canvas.height);
        }

        drawFrames(config.frameInterval);
    };

    /**
     * Draw and push frames to Whammy
     * @param {integer} frameInterval - set minimum interval (in milliseconds) between each time we push a frame to Whammy
     */
    function drawFrames(frameInterval) {
        frameInterval = typeof frameInterval !== 'undefined' ? frameInterval : 10;

        var duration = new Date().getTime() - lastTime;
        if (!duration) {
            return setTimeout(drawFrames, frameInterval, frameInterval);
        }

        if (isPausedRecording) {
            lastTime = new Date().getTime();
            return setTimeout(drawFrames, 100);
        }

        // via #206, by Jack i.e. @Seymourr
        lastTime = new Date().getTime();

        if (video.paused) {
            // via: https://github.com/muaz-khan/WebRTC-Experiment/pull/316
            // Tweak for Android Chrome
            video.play();
        }

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        whammy.frames.push({
            duration: duration,
            image: canvas.toDataURL('image/webp')
        });

        if (!isStopDrawing) {
            setTimeout(drawFrames, frameInterval, frameInterval);
        }
    }

    function asyncLoop(o) {
        var i = -1,
            length = o.length;

        (function loop() {
            i++;
            if (i === length) {
                o.callback();
                return;
            }

            // "setTimeout" added by Jim McLeod
            setTimeout(function() {
                o.functionToLoop(loop, i);
            }, 1);
        })();
    }


    /**
     * remove black frames from the beginning to the specified frame
     * @param {Array} _frames - array of frames to be checked
     * @param {number} _framesToCheck - number of frame until check will be executed (-1 - will drop all frames until frame not matched will be found)
     * @param {number} _pixTolerance - 0 - very strict (only black pixel color) ; 1 - all
     * @param {number} _frameTolerance - 0 - very strict (only black frame color) ; 1 - all
     * @returns {Array} - array of frames
     */
    // pull#293 by @volodalexey
    function dropBlackFrames(_frames, _framesToCheck, _pixTolerance, _frameTolerance, callback) {
        var localCanvas = document.createElement('canvas');
        localCanvas.width = canvas.width;
        localCanvas.height = canvas.height;
        var context2d = localCanvas.getContext('2d');
        var resultFrames = [];

        var checkUntilNotBlack = _framesToCheck === -1;
        var endCheckFrame = (_framesToCheck && _framesToCheck > 0 && _framesToCheck <= _frames.length) ?
            _framesToCheck : _frames.length;
        var sampleColor = {
            r: 0,
            g: 0,
            b: 0
        };
        var maxColorDifference = Math.sqrt(
            Math.pow(255, 2) +
            Math.pow(255, 2) +
            Math.pow(255, 2)
        );
        var pixTolerance = _pixTolerance && _pixTolerance >= 0 && _pixTolerance <= 1 ? _pixTolerance : 0;
        var frameTolerance = _frameTolerance && _frameTolerance >= 0 && _frameTolerance <= 1 ? _frameTolerance : 0;
        var doNotCheckNext = false;

        asyncLoop({
            length: endCheckFrame,
            functionToLoop: function(loop, f) {
                var matchPixCount, endPixCheck, maxPixCount;

                var finishImage = function() {
                    if (!doNotCheckNext && maxPixCount - matchPixCount <= maxPixCount * frameTolerance) {
                        // console.log('removed black frame : ' + f + ' ; frame duration ' + _frames[f].duration);
                    } else {
                        // console.log('frame is passed : ' + f);
                        if (checkUntilNotBlack) {
                            doNotCheckNext = true;
                        }
                        resultFrames.push(_frames[f]);
                    }
                    loop();
                };

                if (!doNotCheckNext) {
                    var image = new Image();
                    image.onload = function() {
                        context2d.drawImage(image, 0, 0, canvas.width, canvas.height);
                        var imageData = context2d.getImageData(0, 0, canvas.width, canvas.height);
                        matchPixCount = 0;
                        endPixCheck = imageData.data.length;
                        maxPixCount = imageData.data.length / 4;

                        for (var pix = 0; pix < endPixCheck; pix += 4) {
                            var currentColor = {
                                r: imageData.data[pix],
                                g: imageData.data[pix + 1],
                                b: imageData.data[pix + 2]
                            };
                            var colorDifference = Math.sqrt(
                                Math.pow(currentColor.r - sampleColor.r, 2) +
                                Math.pow(currentColor.g - sampleColor.g, 2) +
                                Math.pow(currentColor.b - sampleColor.b, 2)
                            );
                            // difference in color it is difference in color vectors (r1,g1,b1) <=> (r2,g2,b2)
                            if (colorDifference <= maxColorDifference * pixTolerance) {
                                matchPixCount++;
                            }
                        }
                        finishImage();
                    };
                    image.src = _frames[f].image;
                } else {
                    finishImage();
                }
            },
            callback: function() {
                resultFrames = resultFrames.concat(_frames.slice(endCheckFrame));

                if (resultFrames.length <= 0) {
                    // at least one last frame should be available for next manipulation
                    // if total duration of all frames will be < 1000 than ffmpeg doesn't work well...
                    resultFrames.push(_frames[_frames.length - 1]);
                }
                callback(resultFrames);
            }
        });
    }

    var isStopDrawing = false;

    /**
     * This method stops recording video.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof WhammyRecorder
     * @example
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
     */
    this.stop = function(callback) {
        callback = callback || function() {};

        isStopDrawing = true;

        var _this = this;
        // analyse of all frames takes some time!
        setTimeout(function() {
            // e.g. dropBlackFrames(frames, 10, 1, 1) - will cut all 10 frames
            // e.g. dropBlackFrames(frames, 10, 0.5, 0.5) - will analyse 10 frames
            // e.g. dropBlackFrames(frames, 10) === dropBlackFrames(frames, 10, 0, 0) - will analyse 10 frames with strict black color
            dropBlackFrames(whammy.frames, -1, null, null, function(frames) {
                whammy.frames = frames;

                // to display advertisement images!
                if (config.advertisement && config.advertisement.length) {
                    whammy.frames = config.advertisement.concat(whammy.frames);
                }

                /**
                 * @property {Blob} blob - Recorded frames in video/webm blob.
                 * @memberof WhammyRecorder
                 * @example
                 * recorder.stop(function() {
                 *     var blob = recorder.blob;
                 * });
                 */
                whammy.compile(function(blob) {
                    _this.blob = blob;

                    if (_this.blob.forEach) {
                        _this.blob = new Blob([], {
                            type: 'video/webm'
                        });
                    }

                    if (callback) {
                        callback(_this.blob);
                    }
                });
            });
        }, 10);
    };

    var isPausedRecording = false;

    /**
     * This method pauses the recording process.
     * @method
     * @memberof WhammyRecorder
     * @example
     * recorder.pause();
     */
    this.pause = function() {
        isPausedRecording = true;
    };

    /**
     * This method resumes the recording process.
     * @method
     * @memberof WhammyRecorder
     * @example
     * recorder.resume();
     */
    this.resume = function() {
        isPausedRecording = false;

        if (isStopDrawing) {
            this.record();
        }
    };

    /**
     * This method resets currently recorded data.
     * @method
     * @memberof WhammyRecorder
     * @example
     * recorder.clearRecordedData();
     */
    this.clearRecordedData = function() {
        if (!isStopDrawing) {
            this.stop(clearRecordedDataCB);
        }
        clearRecordedDataCB();
    };

    function clearRecordedDataCB() {
        whammy.frames = [];
        isStopDrawing = true;
        isPausedRecording = false;
    }

    // for debugging
    this.name = 'WhammyRecorder';
    this.toString = function() {
        return this.name;
    };

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    var video;
    var lastTime;
    var whammy;
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.WhammyRecorder = WhammyRecorder;
}

// https://github.com/antimatter15/whammy/blob/master/LICENSE
// _________
// Whammy.js

// todo: Firefox now supports webp for webm containers!
// their MediaRecorder implementation works well!
// should we provide an option to record via Whammy.js or MediaRecorder API is a better solution?

/**
 * Whammy is a standalone class used by {@link RecordRTC} to bring video recording in Chrome. It is written by {@link https://github.com/antimatter15|antimatter15}
 * @summary A real time javascript webm encoder based on a canvas hack.
 * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
 * @author {@link https://MuazKhan.com|Muaz Khan}
 * @typedef Whammy
 * @class
 * @example
 * var recorder = new Whammy().Video(15);
 * recorder.add(context || canvas || dataURL);
 * var output = recorder.compile();
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 */

var Whammy = (function() {
    // a more abstract-ish API

    function WhammyVideo(duration) {
        this.frames = [];
        this.duration = duration || 1;
        this.quality = 0.8;
    }

    /**
     * Pass Canvas or Context or image/webp(string) to {@link Whammy} encoder.
     * @method
     * @memberof Whammy
     * @example
     * recorder = new Whammy().Video(0.8, 100);
     * recorder.add(canvas || context || 'image/webp');
     * @param {string} frame - Canvas || Context || image/webp
     * @param {number} duration - Stick a duration (in milliseconds)
     */
    WhammyVideo.prototype.add = function(frame, duration) {
        if ('canvas' in frame) { //CanvasRenderingContext2D
            frame = frame.canvas;
        }

        if ('toDataURL' in frame) {
            frame = frame.toDataURL('image/webp', this.quality);
        }

        if (!(/^data:image\/webp;base64,/ig).test(frame)) {
            throw 'Input must be formatted properly as a base64 encoded DataURI of type image/webp';
        }
        this.frames.push({
            image: frame,
            duration: duration || this.duration
        });
    };

    function processInWebWorker(_function) {
        var blob = URL.createObjectURL(new Blob([_function.toString(),
            'this.onmessage =  function (eee) {' + _function.name + '(eee.data);}'
        ], {
            type: 'application/javascript'
        }));

        var worker = new Worker(blob);
        URL.revokeObjectURL(blob);
        return worker;
    }

    function whammyInWebWorker(frames) {
        function ArrayToWebM(frames) {
            var info = checkFrames(frames);
            if (!info) {
                return [];
            }

            var clusterMaxDuration = 30000;

            var EBML = [{
                'id': 0x1a45dfa3, // EBML
                'data': [{
                    'data': 1,
                    'id': 0x4286 // EBMLVersion
                }, {
                    'data': 1,
                    'id': 0x42f7 // EBMLReadVersion
                }, {
                    'data': 4,
                    'id': 0x42f2 // EBMLMaxIDLength
                }, {
                    'data': 8,
                    'id': 0x42f3 // EBMLMaxSizeLength
                }, {
                    'data': 'webm',
                    'id': 0x4282 // DocType
                }, {
                    'data': 2,
                    'id': 0x4287 // DocTypeVersion
                }, {
                    'data': 2,
                    'id': 0x4285 // DocTypeReadVersion
                }]
            }, {
                'id': 0x18538067, // Segment
                'data': [{
                    'id': 0x1549a966, // Info
                    'data': [{
                        'data': 1e6, //do things in millisecs (num of nanosecs for duration scale)
                        'id': 0x2ad7b1 // TimecodeScale
                    }, {
                        'data': 'whammy',
                        'id': 0x4d80 // MuxingApp
                    }, {
                        'data': 'whammy',
                        'id': 0x5741 // WritingApp
                    }, {
                        'data': doubleToString(info.duration),
                        'id': 0x4489 // Duration
                    }]
                }, {
                    'id': 0x1654ae6b, // Tracks
                    'data': [{
                        'id': 0xae, // TrackEntry
                        'data': [{
                            'data': 1,
                            'id': 0xd7 // TrackNumber
                        }, {
                            'data': 1,
                            'id': 0x73c5 // TrackUID
                        }, {
                            'data': 0,
                            'id': 0x9c // FlagLacing
                        }, {
                            'data': 'und',
                            'id': 0x22b59c // Language
                        }, {
                            'data': 'V_VP8',
                            'id': 0x86 // CodecID
                        }, {
                            'data': 'VP8',
                            'id': 0x258688 // CodecName
                        }, {
                            'data': 1,
                            'id': 0x83 // TrackType
                        }, {
                            'id': 0xe0, // Video
                            'data': [{
                                'data': info.width,
                                'id': 0xb0 // PixelWidth
                            }, {
                                'data': info.height,
                                'id': 0xba // PixelHeight
                            }]
                        }]
                    }]
                }]
            }];

            //Generate clusters (max duration)
            var frameNumber = 0;
            var clusterTimecode = 0;
            while (frameNumber < frames.length) {

                var clusterFrames = [];
                var clusterDuration = 0;
                do {
                    clusterFrames.push(frames[frameNumber]);
                    clusterDuration += frames[frameNumber].duration;
                    frameNumber++;
                } while (frameNumber < frames.length && clusterDuration < clusterMaxDuration);

                var clusterCounter = 0;
                var cluster = {
                    'id': 0x1f43b675, // Cluster
                    'data': getClusterData(clusterTimecode, clusterCounter, clusterFrames)
                }; //Add cluster to segment
                EBML[1].data.push(cluster);
                clusterTimecode += clusterDuration;
            }

            return generateEBML(EBML);
        }

        function getClusterData(clusterTimecode, clusterCounter, clusterFrames) {
            return [{
                'data': clusterTimecode,
                'id': 0xe7 // Timecode
            }].concat(clusterFrames.map(function(webp) {
                var block = makeSimpleBlock({
                    discardable: 0,
                    frame: webp.data.slice(4),
                    invisible: 0,
                    keyframe: 1,
                    lacing: 0,
                    trackNum: 1,
                    timecode: Math.round(clusterCounter)
                });
                clusterCounter += webp.duration;
                return {
                    data: block,
                    id: 0xa3
                };
            }));
        }

        // sums the lengths of all the frames and gets the duration

        function checkFrames(frames) {
            if (!frames[0]) {
                postMessage({
                    error: 'Something went wrong. Maybe WebP format is not supported in the current browser.'
                });
                return;
            }

            var width = frames[0].width,
                height = frames[0].height,
                duration = frames[0].duration;

            for (var i = 1; i < frames.length; i++) {
                duration += frames[i].duration;
            }
            return {
                duration: duration,
                width: width,
                height: height
            };
        }

        function numToBuffer(num) {
            var parts = [];
            while (num > 0) {
                parts.push(num & 0xff);
                num = num >> 8;
            }
            return new Uint8Array(parts.reverse());
        }

        function strToBuffer(str) {
            return new Uint8Array(str.split('').map(function(e) {
                return e.charCodeAt(0);
            }));
        }

        function bitsToBuffer(bits) {
            var data = [];
            var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
            bits = pad + bits;
            for (var i = 0; i < bits.length; i += 8) {
                data.push(parseInt(bits.substr(i, 8), 2));
            }
            return new Uint8Array(data);
        }

        function generateEBML(json) {
            var ebml = [];
            for (var i = 0; i < json.length; i++) {
                var data = json[i].data;

                if (typeof data === 'object') {
                    data = generateEBML(data);
                }

                if (typeof data === 'number') {
                    data = bitsToBuffer(data.toString(2));
                }

                if (typeof data === 'string') {
                    data = strToBuffer(data);
                }

                var len = data.size || data.byteLength || data.length;
                var zeroes = Math.ceil(Math.ceil(Math.log(len) / Math.log(2)) / 8);
                var sizeToString = len.toString(2);
                var padded = (new Array((zeroes * 7 + 7 + 1) - sizeToString.length)).join('0') + sizeToString;
                var size = (new Array(zeroes)).join('0') + '1' + padded;

                ebml.push(numToBuffer(json[i].id));
                ebml.push(bitsToBuffer(size));
                ebml.push(data);
            }

            return new Blob(ebml, {
                type: 'video/webm'
            });
        }

        function toBinStrOld(bits) {
            var data = '';
            var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
            bits = pad + bits;
            for (var i = 0; i < bits.length; i += 8) {
                data += String.fromCharCode(parseInt(bits.substr(i, 8), 2));
            }
            return data;
        }

        function makeSimpleBlock(data) {
            var flags = 0;

            if (data.keyframe) {
                flags |= 128;
            }

            if (data.invisible) {
                flags |= 8;
            }

            if (data.lacing) {
                flags |= (data.lacing << 1);
            }

            if (data.discardable) {
                flags |= 1;
            }

            if (data.trackNum > 127) {
                throw 'TrackNumber > 127 not supported';
            }

            var out = [data.trackNum | 0x80, data.timecode >> 8, data.timecode & 0xff, flags].map(function(e) {
                return String.fromCharCode(e);
            }).join('') + data.frame;

            return out;
        }

        function parseWebP(riff) {
            var VP8 = riff.RIFF[0].WEBP[0];

            var frameStart = VP8.indexOf('\x9d\x01\x2a'); // A VP8 keyframe starts with the 0x9d012a header
            for (var i = 0, c = []; i < 4; i++) {
                c[i] = VP8.charCodeAt(frameStart + 3 + i);
            }

            var width, height, tmp;

            //the code below is literally copied verbatim from the bitstream spec
            tmp = (c[1] << 8) | c[0];
            width = tmp & 0x3FFF;
            tmp = (c[3] << 8) | c[2];
            height = tmp & 0x3FFF;
            return {
                width: width,
                height: height,
                data: VP8,
                riff: riff
            };
        }

        function getStrLength(string, offset) {
            return parseInt(string.substr(offset + 4, 4).split('').map(function(i) {
                var unpadded = i.charCodeAt(0).toString(2);
                return (new Array(8 - unpadded.length + 1)).join('0') + unpadded;
            }).join(''), 2);
        }

        function parseRIFF(string) {
            var offset = 0;
            var chunks = {};

            while (offset < string.length) {
                var id = string.substr(offset, 4);
                var len = getStrLength(string, offset);
                var data = string.substr(offset + 4 + 4, len);
                offset += 4 + 4 + len;
                chunks[id] = chunks[id] || [];

                if (id === 'RIFF' || id === 'LIST') {
                    chunks[id].push(parseRIFF(data));
                } else {
                    chunks[id].push(data);
                }
            }
            return chunks;
        }

        function doubleToString(num) {
            return [].slice.call(
                new Uint8Array((new Float64Array([num])).buffer), 0).map(function(e) {
                return String.fromCharCode(e);
            }).reverse().join('');
        }

        var webm = new ArrayToWebM(frames.map(function(frame) {
            var webp = parseWebP(parseRIFF(atob(frame.image.slice(23))));
            webp.duration = frame.duration;
            return webp;
        }));

        postMessage(webm);
    }

    /**
     * Encodes frames in WebM container. It uses WebWorkinvoke to invoke 'ArrayToWebM' method.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof Whammy
     * @example
     * recorder = new Whammy().Video(0.8, 100);
     * recorder.compile(function(blob) {
     *    // blob.size - blob.type
     * });
     */
    WhammyVideo.prototype.compile = function(callback) {
        var webWorker = processInWebWorker(whammyInWebWorker);

        webWorker.onmessage = function(event) {
            if (event.data.error) {
                console.error(event.data.error);
                return;
            }
            callback(event.data);
        };

        webWorker.postMessage(this.frames);
    };

    return {
        /**
         * A more abstract-ish API.
         * @method
         * @memberof Whammy
         * @example
         * recorder = new Whammy().Video(0.8, 100);
         * @param {?number} speed - 0.8
         * @param {?number} quality - 100
         */
        Video: WhammyVideo
    };
})();

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.Whammy = Whammy;
}

// ______________ (indexed-db)
// DiskStorage.js

/**
 * DiskStorage is a standalone object used by {@link RecordRTC} to store recorded blobs in IndexedDB storage.
 * @summary Writing blobs into IndexedDB.
 * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
 * @author {@link https://MuazKhan.com|Muaz Khan}
 * @example
 * DiskStorage.Store({
 *     audioBlob: yourAudioBlob,
 *     videoBlob: yourVideoBlob,
 *     gifBlob  : yourGifBlob
 * });
 * DiskStorage.Fetch(function(dataURL, type) {
 *     if(type === 'audioBlob') { }
 *     if(type === 'videoBlob') { }
 *     if(type === 'gifBlob')   { }
 * });
 * // DiskStorage.dataStoreName = 'recordRTC';
 * // DiskStorage.onError = function(error) { };
 * @property {function} init - This method must be called once to initialize IndexedDB ObjectStore. Though, it is auto-used internally.
 * @property {function} Fetch - This method fetches stored blobs from IndexedDB.
 * @property {function} Store - This method stores blobs in IndexedDB.
 * @property {function} onError - This function is invoked for any known/unknown error.
 * @property {string} dataStoreName - Name of the ObjectStore created in IndexedDB storage.
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 */


var DiskStorage = {
    /**
     * This method must be called once to initialize IndexedDB ObjectStore. Though, it is auto-used internally.
     * @method
     * @memberof DiskStorage
     * @internal
     * @example
     * DiskStorage.init();
     */
    init: function() {
        var self = this;

        if (typeof indexedDB === 'undefined' || typeof indexedDB.open === 'undefined') {
            console.error('IndexedDB API are not available in this browser.');
            return;
        }

        var dbVersion = 1;
        var dbName = this.dbName || location.href.replace(/\/|:|#|%|\.|\[|\]/g, ''),
            db;
        var request = indexedDB.open(dbName, dbVersion);

        function createObjectStore(dataBase) {
            dataBase.createObjectStore(self.dataStoreName);
        }

        function putInDB() {
            var transaction = db.transaction([self.dataStoreName], 'readwrite');

            if (self.videoBlob) {
                transaction.objectStore(self.dataStoreName).put(self.videoBlob, 'videoBlob');
            }

            if (self.gifBlob) {
                transaction.objectStore(self.dataStoreName).put(self.gifBlob, 'gifBlob');
            }

            if (self.audioBlob) {
                transaction.objectStore(self.dataStoreName).put(self.audioBlob, 'audioBlob');
            }

            function getFromStore(portionName) {
                transaction.objectStore(self.dataStoreName).get(portionName).onsuccess = function(event) {
                    if (self.callback) {
                        self.callback(event.target.result, portionName);
                    }
                };
            }

            getFromStore('audioBlob');
            getFromStore('videoBlob');
            getFromStore('gifBlob');
        }

        request.onerror = self.onError;

        request.onsuccess = function() {
            db = request.result;
            db.onerror = self.onError;

            if (db.setVersion) {
                if (db.version !== dbVersion) {
                    var setVersion = db.setVersion(dbVersion);
                    setVersion.onsuccess = function() {
                        createObjectStore(db);
                        putInDB();
                    };
                } else {
                    putInDB();
                }
            } else {
                putInDB();
            }
        };
        request.onupgradeneeded = function(event) {
            createObjectStore(event.target.result);
        };
    },
    /**
     * This method fetches stored blobs from IndexedDB.
     * @method
     * @memberof DiskStorage
     * @internal
     * @example
     * DiskStorage.Fetch(function(dataURL, type) {
     *     if(type === 'audioBlob') { }
     *     if(type === 'videoBlob') { }
     *     if(type === 'gifBlob')   { }
     * });
     */
    Fetch: function(callback) {
        this.callback = callback;
        this.init();

        return this;
    },
    /**
     * This method stores blobs in IndexedDB.
     * @method
     * @memberof DiskStorage
     * @internal
     * @example
     * DiskStorage.Store({
     *     audioBlob: yourAudioBlob,
     *     videoBlob: yourVideoBlob,
     *     gifBlob  : yourGifBlob
     * });
     */
    Store: function(config) {
        this.audioBlob = config.audioBlob;
        this.videoBlob = config.videoBlob;
        this.gifBlob = config.gifBlob;

        this.init();

        return this;
    },
    /**
     * This function is invoked for any known/unknown error.
     * @method
     * @memberof DiskStorage
     * @internal
     * @example
     * DiskStorage.onError = function(error){
     *     alerot( JSON.stringify(error) );
     * };
     */
    onError: function(error) {
        console.error(JSON.stringify(error, null, '\t'));
    },

    /**
     * @property {string} dataStoreName - Name of the ObjectStore created in IndexedDB storage.
     * @memberof DiskStorage
     * @internal
     * @example
     * DiskStorage.dataStoreName = 'recordRTC';
     */
    dataStoreName: 'recordRTC',
    dbName: null
};

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.DiskStorage = DiskStorage;
}

// ______________
// GifRecorder.js

/**
 * GifRecorder is standalone calss used by {@link RecordRTC} to record video or canvas into animated gif.
 * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
 * @author {@link https://MuazKhan.com|Muaz Khan}
 * @typedef GifRecorder
 * @class
 * @example
 * var recorder = new GifRecorder(mediaStream || canvas || context, { onGifPreview: function, onGifRecordingStarted: function, width: 1280, height: 720, frameRate: 200, quality: 10 });
 * recorder.record();
 * recorder.stop(function(blob) {
 *     img.src = URL.createObjectURL(blob);
 * });
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object or HTMLCanvasElement or CanvasRenderingContext2D.
 * @param {object} config - {disableLogs:true, initCallback: function, width: 320, height: 240, frameRate: 200, quality: 10}
 */

function GifRecorder(mediaStream, config) {
    if (typeof GIFEncoder === 'undefined') {
        var script = document.createElement('script');
        script.src = 'https://cdn.webrtc-experiment.com/gif-recorder.js';
        (document.body || document.documentElement).appendChild(script);
    }

    config = config || {};

    var isHTMLObject = mediaStream instanceof CanvasRenderingContext2D || mediaStream instanceof HTMLCanvasElement;

    /**
     * This method records MediaStream.
     * @method
     * @memberof GifRecorder
     * @example
     * recorder.record();
     */
    this.record = function() {
        if (typeof GIFEncoder === 'undefined') {
            setTimeout(self.record, 1000);
            return;
        }

        if (!isLoadedMetaData) {
            setTimeout(self.record, 1000);
            return;
        }

        if (!isHTMLObject) {
            if (!config.width) {
                config.width = video.offsetWidth || 320;
            }

            if (!config.height) {
                config.height = video.offsetHeight || 240;
            }

            if (!config.video) {
                config.video = {
                    width: config.width,
                    height: config.height
                };
            }

            if (!config.canvas) {
                config.canvas = {
                    width: config.width,
                    height: config.height
                };
            }

            canvas.width = config.canvas.width || 320;
            canvas.height = config.canvas.height || 240;

            video.width = config.video.width || 320;
            video.height = config.video.height || 240;
        }

        // external library to record as GIF images
        gifEncoder = new GIFEncoder();

        // void setRepeat(int iter) 
        // Sets the number of times the set of GIF frames should be played. 
        // Default is 1; 0 means play indefinitely.
        gifEncoder.setRepeat(0);

        // void setFrameRate(Number fps) 
        // Sets frame rate in frames per second. 
        // Equivalent to setDelay(1000/fps).
        // Using "setDelay" instead of "setFrameRate"
        gifEncoder.setDelay(config.frameRate || 200);

        // void setQuality(int quality) 
        // Sets quality of color quantization (conversion of images to the 
        // maximum 256 colors allowed by the GIF specification). 
        // Lower values (minimum = 1) produce better colors, 
        // but slow processing significantly. 10 is the default, 
        // and produces good color mapping at reasonable speeds. 
        // Values greater than 20 do not yield significant improvements in speed.
        gifEncoder.setQuality(config.quality || 10);

        // Boolean start() 
        // This writes the GIF Header and returns false if it fails.
        gifEncoder.start();

        if (typeof config.onGifRecordingStarted === 'function') {
            config.onGifRecordingStarted();
        }

        startTime = Date.now();

        function drawVideoFrame(time) {
            if (self.clearedRecordedData === true) {
                return;
            }

            if (isPausedRecording) {
                return setTimeout(function() {
                    drawVideoFrame(time);
                }, 100);
            }

            lastAnimationFrame = requestAnimationFrame(drawVideoFrame);

            if (typeof lastFrameTime === undefined) {
                lastFrameTime = time;
            }

            // ~10 fps
            if (time - lastFrameTime < 90) {
                return;
            }

            if (!isHTMLObject && video.paused) {
                // via: https://github.com/muaz-khan/WebRTC-Experiment/pull/316
                // Tweak for Android Chrome
                video.play();
            }

            if (!isHTMLObject) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
            }

            if (config.onGifPreview) {
                config.onGifPreview(canvas.toDataURL('image/png'));
            }

            gifEncoder.addFrame(context);
            lastFrameTime = time;
        }

        lastAnimationFrame = requestAnimationFrame(drawVideoFrame);

        if (config.initCallback) {
            config.initCallback();
        }
    };

    /**
     * This method stops recording MediaStream.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof GifRecorder
     * @example
     * recorder.stop(function(blob) {
     *     img.src = URL.createObjectURL(blob);
     * });
     */
    this.stop = function(callback) {
        callback = callback || function() {};

        if (lastAnimationFrame) {
            cancelAnimationFrame(lastAnimationFrame);
        }

        endTime = Date.now();

        /**
         * @property {Blob} blob - The recorded blob object.
         * @memberof GifRecorder
         * @example
         * recorder.stop(function(){
         *     var blob = recorder.blob;
         * });
         */
        this.blob = new Blob([new Uint8Array(gifEncoder.stream().bin)], {
            type: 'image/gif'
        });

        callback(this.blob);

        // bug: find a way to clear old recorded blobs
        gifEncoder.stream().bin = [];
    };

    var isPausedRecording = false;

    /**
     * This method pauses the recording process.
     * @method
     * @memberof GifRecorder
     * @example
     * recorder.pause();
     */
    this.pause = function() {
        isPausedRecording = true;
    };

    /**
     * This method resumes the recording process.
     * @method
     * @memberof GifRecorder
     * @example
     * recorder.resume();
     */
    this.resume = function() {
        isPausedRecording = false;
    };

    /**
     * This method resets currently recorded data.
     * @method
     * @memberof GifRecorder
     * @example
     * recorder.clearRecordedData();
     */
    this.clearRecordedData = function() {
        self.clearedRecordedData = true;
        clearRecordedDataCB();
    };

    function clearRecordedDataCB() {
        if (gifEncoder) {
            gifEncoder.stream().bin = [];
        }
    }

    // for debugging
    this.name = 'GifRecorder';
    this.toString = function() {
        return this.name;
    };

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    if (isHTMLObject) {
        if (mediaStream instanceof CanvasRenderingContext2D) {
            context = mediaStream;
            canvas = context.canvas;
        } else if (mediaStream instanceof HTMLCanvasElement) {
            context = mediaStream.getContext('2d');
            canvas = mediaStream;
        }
    }

    var isLoadedMetaData = true;

    if (!isHTMLObject) {
        var video = document.createElement('video');
        video.muted = true;
        video.autoplay = true;

        isLoadedMetaData = false;
        video.onloadedmetadata = function() {
            isLoadedMetaData = true;
        };

        setSrcObject(mediaStream, video);

        video.play();
    }

    var lastAnimationFrame = null;
    var startTime, endTime, lastFrameTime;

    var gifEncoder;

    var self = this;
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.GifRecorder = GifRecorder;
}

// Last time updated: 2019-06-21 4:09:42 AM UTC

// ________________________
// MultiStreamsMixer v1.2.2

// Open-Sourced: https://github.com/muaz-khan/MultiStreamsMixer

// --------------------------------------------------
// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
// --------------------------------------------------

function MultiStreamsMixer(arrayOfMediaStreams, elementClass) {

    var browserFakeUserAgent = 'Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45';

    (function(that) {
        if (typeof RecordRTC !== 'undefined') {
            return;
        }

        if (!that) {
            return;
        }

        if (typeof window !== 'undefined') {
            return;
        }

        if (typeof global === 'undefined') {
            return;
        }

        global.navigator = {
            userAgent: browserFakeUserAgent,
            getUserMedia: function() {}
        };

        if (!global.console) {
            global.console = {};
        }

        if (typeof global.console.log === 'undefined' || typeof global.console.error === 'undefined') {
            global.console.error = global.console.log = global.console.log || function() {
                console.log(arguments);
            };
        }

        if (typeof document === 'undefined') {
            /*global document:true */
            that.document = {
                documentElement: {
                    appendChild: function() {
                        return '';
                    }
                }
            };

            document.createElement = document.captureStream = document.mozCaptureStream = function() {
                var obj = {
                    getContext: function() {
                        return obj;
                    },
                    play: function() {},
                    pause: function() {},
                    drawImage: function() {},
                    toDataURL: function() {
                        return '';
                    },
                    style: {}
                };
                return obj;
            };

            that.HTMLVideoElement = function() {};
        }

        if (typeof location === 'undefined') {
            /*global location:true */
            that.location = {
                protocol: 'file:',
                href: '',
                hash: ''
            };
        }

        if (typeof screen === 'undefined') {
            /*global screen:true */
            that.screen = {
                width: 0,
                height: 0
            };
        }

        if (typeof URL === 'undefined') {
            /*global screen:true */
            that.URL = {
                createObjectURL: function() {
                    return '';
                },
                revokeObjectURL: function() {
                    return '';
                }
            };
        }

        /*global window:true */
        that.window = global;
    })(typeof global !== 'undefined' ? global : null);

    // requires: chrome://flags/#enable-experimental-web-platform-features

    elementClass = elementClass || 'multi-streams-mixer';

    var videos = [];
    var isStopDrawingFrames = false;

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.style.opacity = 0;
    canvas.style.position = 'absolute';
    canvas.style.zIndex = -1;
    canvas.style.top = '-1000em';
    canvas.style.left = '-1000em';
    canvas.className = elementClass;
    (document.body || document.documentElement).appendChild(canvas);

    this.disableLogs = false;
    this.frameInterval = 10;

    this.width = 360;
    this.height = 240;

    // use gain node to prevent echo
    this.useGainNode = true;

    var self = this;

    // _____________________________
    // Cross-Browser-Declarations.js

    // WebAudio API representer
    var AudioContext = window.AudioContext;

    if (typeof AudioContext === 'undefined') {
        if (typeof webkitAudioContext !== 'undefined') {
            /*global AudioContext:true */
            AudioContext = webkitAudioContext;
        }

        if (typeof mozAudioContext !== 'undefined') {
            /*global AudioContext:true */
            AudioContext = mozAudioContext;
        }
    }

    /*jshint -W079 */
    var URL = window.URL;

    if (typeof URL === 'undefined' && typeof webkitURL !== 'undefined') {
        /*global URL:true */
        URL = webkitURL;
    }

    if (typeof navigator !== 'undefined' && typeof navigator.getUserMedia === 'undefined') { // maybe window.navigator?
        if (typeof navigator.webkitGetUserMedia !== 'undefined') {
            navigator.getUserMedia = navigator.webkitGetUserMedia;
        }

        if (typeof navigator.mozGetUserMedia !== 'undefined') {
            navigator.getUserMedia = navigator.mozGetUserMedia;
        }
    }

    var MediaStream = window.MediaStream;

    if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
        MediaStream = webkitMediaStream;
    }

    /*global MediaStream:true */
    if (typeof MediaStream !== 'undefined') {
        // override "stop" method for all browsers
        if (typeof MediaStream.prototype.stop === 'undefined') {
            MediaStream.prototype.stop = function() {
                this.getTracks().forEach(function(track) {
                    track.stop();
                });
            };
        }
    }

    var Storage = {};

    if (typeof AudioContext !== 'undefined') {
        Storage.AudioContext = AudioContext;
    } else if (typeof webkitAudioContext !== 'undefined') {
        Storage.AudioContext = webkitAudioContext;
    }

    function setSrcObject(stream, element) {
        if ('srcObject' in element) {
            element.srcObject = stream;
        } else if ('mozSrcObject' in element) {
            element.mozSrcObject = stream;
        } else {
            element.srcObject = stream;
        }
    }

    this.startDrawingFrames = function() {
        drawVideosToCanvas();
    };

    function drawVideosToCanvas() {
        if (isStopDrawingFrames) {
            return;
        }

        var videosLength = videos.length;

        var fullcanvas = false;
        var remaining = [];
        videos.forEach(function(video) {
            if (!video.stream) {
                video.stream = {};
            }

            if (video.stream.fullcanvas) {
                fullcanvas = video;
            } else {
                // todo: video.stream.active or video.stream.live to fix blank frames issues?
                remaining.push(video);
            }
        });

        if (fullcanvas) {
            canvas.width = fullcanvas.stream.width;
            canvas.height = fullcanvas.stream.height;
        } else if (remaining.length) {
            canvas.width = videosLength > 1 ? remaining[0].width * 2 : remaining[0].width;

            var height = 1;
            if (videosLength === 3 || videosLength === 4) {
                height = 2;
            }
            if (videosLength === 5 || videosLength === 6) {
                height = 3;
            }
            if (videosLength === 7 || videosLength === 8) {
                height = 4;
            }
            if (videosLength === 9 || videosLength === 10) {
                height = 5;
            }
            canvas.height = remaining[0].height * height;
        } else {
            canvas.width = self.width || 360;
            canvas.height = self.height || 240;
        }

        if (fullcanvas && fullcanvas instanceof HTMLVideoElement) {
            drawImage(fullcanvas);
        }

        remaining.forEach(function(video, idx) {
            drawImage(video, idx);
        });

        setTimeout(drawVideosToCanvas, self.frameInterval);
    }

    function drawImage(video, idx) {
        if (isStopDrawingFrames) {
            return;
        }

        var x = 0;
        var y = 0;
        var width = video.width;
        var height = video.height;

        if (idx === 1) {
            x = video.width;
        }

        if (idx === 2) {
            y = video.height;
        }

        if (idx === 3) {
            x = video.width;
            y = video.height;
        }

        if (idx === 4) {
            y = video.height * 2;
        }

        if (idx === 5) {
            x = video.width;
            y = video.height * 2;
        }

        if (idx === 6) {
            y = video.height * 3;
        }

        if (idx === 7) {
            x = video.width;
            y = video.height * 3;
        }

        if (typeof video.stream.left !== 'undefined') {
            x = video.stream.left;
        }

        if (typeof video.stream.top !== 'undefined') {
            y = video.stream.top;
        }

        if (typeof video.stream.width !== 'undefined') {
            width = video.stream.width;
        }

        if (typeof video.stream.height !== 'undefined') {
            height = video.stream.height;
        }

        context.drawImage(video, x, y, width, height);

        if (typeof video.stream.onRender === 'function') {
            video.stream.onRender(context, x, y, width, height, idx);
        }
    }

    function getMixedStream() {
        isStopDrawingFrames = false;
        var mixedVideoStream = getMixedVideoStream();

        var mixedAudioStream = getMixedAudioStream();
        if (mixedAudioStream) {
            mixedAudioStream.getTracks().filter(function(t) {
                return t.kind === 'audio';
            }).forEach(function(track) {
                mixedVideoStream.addTrack(track);
            });
        }

        var fullcanvas;
        arrayOfMediaStreams.forEach(function(stream) {
            if (stream.fullcanvas) {
                fullcanvas = true;
            }
        });

        // mixedVideoStream.prototype.appendStreams = appendStreams;
        // mixedVideoStream.prototype.resetVideoStreams = resetVideoStreams;
        // mixedVideoStream.prototype.clearRecordedData = clearRecordedData;

        return mixedVideoStream;
    }

    function getMixedVideoStream() {
        resetVideoStreams();

        var capturedStream;

        if ('captureStream' in canvas) {
            capturedStream = canvas.captureStream();
        } else if ('mozCaptureStream' in canvas) {
            capturedStream = canvas.mozCaptureStream();
        } else if (!self.disableLogs) {
            console.error('Upgrade to latest Chrome or otherwise enable this flag: chrome://flags/#enable-experimental-web-platform-features');
        }

        var videoStream = new MediaStream();

        capturedStream.getTracks().filter(function(t) {
            return t.kind === 'video';
        }).forEach(function(track) {
            videoStream.addTrack(track);
        });

        canvas.stream = videoStream;

        return videoStream;
    }

    function getMixedAudioStream() {
        // via: @pehrsons
        if (!Storage.AudioContextConstructor) {
            Storage.AudioContextConstructor = new Storage.AudioContext();
        }

        self.audioContext = Storage.AudioContextConstructor;

        self.audioSources = [];

        if (self.useGainNode === true) {
            self.gainNode = self.audioContext.createGain();
            self.gainNode.connect(self.audioContext.destination);
            self.gainNode.gain.value = 0; // don't hear self
        }

        var audioTracksLength = 0;
        arrayOfMediaStreams.forEach(function(stream) {
            if (!stream.getTracks().filter(function(t) {
                    return t.kind === 'audio';
                }).length) {
                return;
            }

            audioTracksLength++;

            var audioSource = self.audioContext.createMediaStreamSource(stream);

            if (self.useGainNode === true) {
                audioSource.connect(self.gainNode);
            }

            self.audioSources.push(audioSource);
        });

        if (!audioTracksLength) {
            // because "self.audioContext" is not initialized
            // that's why we've to ignore rest of the code
            return;
        }

        self.audioDestination = self.audioContext.createMediaStreamDestination();
        self.audioSources.forEach(function(audioSource) {
            audioSource.connect(self.audioDestination);
        });
        return self.audioDestination.stream;
    }

    function getVideo(stream) {
        var video = document.createElement('video');

        setSrcObject(stream, video);

        video.className = elementClass;

        video.muted = true;
        video.volume = 0;

        video.width = stream.width || self.width || 360;
        video.height = stream.height || self.height || 240;

        video.play();

        return video;
    }

    this.appendStreams = function(streams) {
        if (!streams) {
            throw 'First parameter is required.';
        }

        if (!(streams instanceof Array)) {
            streams = [streams];
        }

        streams.forEach(function(stream) {
            var newStream = new MediaStream();

            if (stream.getTracks().filter(function(t) {
                    return t.kind === 'video';
                }).length) {
                var video = getVideo(stream);
                video.stream = stream;
                videos.push(video);

                newStream.addTrack(stream.getTracks().filter(function(t) {
                    return t.kind === 'video';
                })[0]);
            }

            if (stream.getTracks().filter(function(t) {
                    return t.kind === 'audio';
                }).length) {
                var audioSource = self.audioContext.createMediaStreamSource(stream);
                self.audioDestination = self.audioContext.createMediaStreamDestination();
                audioSource.connect(self.audioDestination);

                newStream.addTrack(self.audioDestination.stream.getTracks().filter(function(t) {
                    return t.kind === 'audio';
                })[0]);
            }

            arrayOfMediaStreams.push(newStream);
        });
    };

    this.releaseStreams = function() {
        videos = [];
        isStopDrawingFrames = true;

        if (self.gainNode) {
            self.gainNode.disconnect();
            self.gainNode = null;
        }

        if (self.audioSources.length) {
            self.audioSources.forEach(function(source) {
                source.disconnect();
            });
            self.audioSources = [];
        }

        if (self.audioDestination) {
            self.audioDestination.disconnect();
            self.audioDestination = null;
        }

        if (self.audioContext) {
            self.audioContext.close();
        }

        self.audioContext = null;

        context.clearRect(0, 0, canvas.width, canvas.height);

        if (canvas.stream) {
            canvas.stream.stop();
            canvas.stream = null;
        }
    };

    this.resetVideoStreams = function(streams) {
        if (streams && !(streams instanceof Array)) {
            streams = [streams];
        }

        resetVideoStreams(streams);
    };

    function resetVideoStreams(streams) {
        videos = [];
        streams = streams || arrayOfMediaStreams;

        // via: @adrian-ber
        streams.forEach(function(stream) {
            if (!stream.getTracks().filter(function(t) {
                    return t.kind === 'video';
                }).length) {
                return;
            }

            var video = getVideo(stream);
            video.stream = stream;
            videos.push(video);
        });
    }

    // for debugging
    this.name = 'MultiStreamsMixer';
    this.toString = function() {
        return this.name;
    };

    this.getMixedStream = getMixedStream;

}

if (typeof RecordRTC === 'undefined') {
    if (true /* && !!module.exports*/ ) {
        module.exports = MultiStreamsMixer;
    }

    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
            return MultiStreamsMixer;
        }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
}

// ______________________
// MultiStreamRecorder.js

/*
 * Video conference recording, using captureStream API along with WebAudio and Canvas2D API.
 */

/**
 * MultiStreamRecorder can record multiple videos in single container.
 * @summary Multi-videos recorder.
 * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
 * @author {@link https://MuazKhan.com|Muaz Khan}
 * @typedef MultiStreamRecorder
 * @class
 * @example
 * var options = {
 *     mimeType: 'video/webm'
 * }
 * var recorder = new MultiStreamRecorder(ArrayOfMediaStreams, options);
 * recorder.record();
 * recorder.stop(function(blob) {
 *     video.src = URL.createObjectURL(blob);
 *
 *     // or
 *     var blob = recorder.blob;
 * });
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStreams} mediaStreams - Array of MediaStreams.
 * @param {object} config - {disableLogs:true, frameInterval: 1, mimeType: "video/webm"}
 */

function MultiStreamRecorder(arrayOfMediaStreams, options) {
    arrayOfMediaStreams = arrayOfMediaStreams || [];
    var self = this;

    var mixer;
    var mediaRecorder;

    options = options || {
        elementClass: 'multi-streams-mixer',
        mimeType: 'video/webm',
        video: {
            width: 360,
            height: 240
        }
    };

    if (!options.frameInterval) {
        options.frameInterval = 10;
    }

    if (!options.video) {
        options.video = {};
    }

    if (!options.video.width) {
        options.video.width = 360;
    }

    if (!options.video.height) {
        options.video.height = 240;
    }

    /**
     * This method records all MediaStreams.
     * @method
     * @memberof MultiStreamRecorder
     * @example
     * recorder.record();
     */
    this.record = function() {
        // github/muaz-khan/MultiStreamsMixer
        mixer = new MultiStreamsMixer(arrayOfMediaStreams, options.elementClass || 'multi-streams-mixer');

        if (getAllVideoTracks().length) {
            mixer.frameInterval = options.frameInterval || 10;
            mixer.width = options.video.width || 360;
            mixer.height = options.video.height || 240;
            mixer.startDrawingFrames();
        }

        if (options.previewStream && typeof options.previewStream === 'function') {
            options.previewStream(mixer.getMixedStream());
        }

        // record using MediaRecorder API
        mediaRecorder = new MediaStreamRecorder(mixer.getMixedStream(), options);
        mediaRecorder.record();
    };

    function getAllVideoTracks() {
        var tracks = [];
        arrayOfMediaStreams.forEach(function(stream) {
            getTracks(stream, 'video').forEach(function(track) {
                tracks.push(track);
            });
        });
        return tracks;
    }

    /**
     * This method stops recording MediaStream.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof MultiStreamRecorder
     * @example
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
     */
    this.stop = function(callback) {
        if (!mediaRecorder) {
            return;
        }

        mediaRecorder.stop(function(blob) {
            self.blob = blob;

            callback(blob);

            self.clearRecordedData();
        });
    };

    /**
     * This method pauses the recording process.
     * @method
     * @memberof MultiStreamRecorder
     * @example
     * recorder.pause();
     */
    this.pause = function() {
        if (mediaRecorder) {
            mediaRecorder.pause();
        }
    };

    /**
     * This method resumes the recording process.
     * @method
     * @memberof MultiStreamRecorder
     * @example
     * recorder.resume();
     */
    this.resume = function() {
        if (mediaRecorder) {
            mediaRecorder.resume();
        }
    };

    /**
     * This method resets currently recorded data.
     * @method
     * @memberof MultiStreamRecorder
     * @example
     * recorder.clearRecordedData();
     */
    this.clearRecordedData = function() {
        if (mediaRecorder) {
            mediaRecorder.clearRecordedData();
            mediaRecorder = null;
        }

        if (mixer) {
            mixer.releaseStreams();
            mixer = null;
        }
    };

    /**
     * Add extra media-streams to existing recordings.
     * @method
     * @memberof MultiStreamRecorder
     * @param {MediaStreams} mediaStreams - Array of MediaStreams
     * @example
     * recorder.addStreams([newAudioStream, newVideoStream]);
     */
    this.addStreams = function(streams) {
        if (!streams) {
            throw 'First parameter is required.';
        }

        if (!(streams instanceof Array)) {
            streams = [streams];
        }

        arrayOfMediaStreams.concat(streams);

        if (!mediaRecorder || !mixer) {
            return;
        }

        mixer.appendStreams(streams);

        if (options.previewStream && typeof options.previewStream === 'function') {
            options.previewStream(mixer.getMixedStream());
        }
    };

    /**
     * Reset videos during live recording. Replace old videos e.g. replace cameras with full-screen.
     * @method
     * @memberof MultiStreamRecorder
     * @param {MediaStreams} mediaStreams - Array of MediaStreams
     * @example
     * recorder.resetVideoStreams([newVideo1, newVideo2]);
     */
    this.resetVideoStreams = function(streams) {
        if (!mixer) {
            return;
        }

        if (streams && !(streams instanceof Array)) {
            streams = [streams];
        }

        mixer.resetVideoStreams(streams);
    };

    /**
     * Returns MultiStreamsMixer
     * @method
     * @memberof MultiStreamRecorder
     * @param {MediaStreams} mediaStreams - Array of MediaStreams
     * @example
     * let mixer = recorder.getMixer();
     * mixer.appendStreams([newStream]);
     */
    this.getMixer = function(streams) {
        return mixer;
    };

    // for debugging
    this.name = 'MultiStreamRecorder';
    this.toString = function() {
        return this.name;
    };
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.MultiStreamRecorder = MultiStreamRecorder;
}

// _____________________
// RecordRTC.promises.js

/**
 * RecordRTCPromisesHandler adds promises support in {@link RecordRTC}. Try a {@link https://github.com/muaz-khan/RecordRTC/blob/master/simple-demos/RecordRTCPromisesHandler.html|demo here}
 * @summary Promises for {@link RecordRTC}
 * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
 * @author {@link https://MuazKhan.com|Muaz Khan}
 * @typedef RecordRTCPromisesHandler
 * @class
 * @example
 * var recorder = new RecordRTCPromisesHandler(mediaStream, options);
 * recorder.startRecording()
 *         .then(successCB)
 *         .catch(errorCB);
 * // Note: You can access all RecordRTC API using "recorder.recordRTC" e.g. 
 * recorder.recordRTC.onStateChanged = function(state) {};
 * recorder.recordRTC.setRecordingDuration(5000);
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - Single media-stream object, array of media-streams, html-canvas-element, etc.
 * @param {object} config - {type:"video", recorderType: MediaStreamRecorder, disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, etc.}
 * @throws Will throw an error if "new" keyword is not used to initiate "RecordRTCPromisesHandler". Also throws error if first argument "MediaStream" is missing.
 * @requires {@link RecordRTC}
 */

function RecordRTCPromisesHandler(mediaStream, options) {
    if (!this) {
        throw 'Use "new RecordRTCPromisesHandler()"';
    }

    if (typeof mediaStream === 'undefined') {
        throw 'First argument "MediaStream" is required.';
    }

    var self = this;

    /**
     * @property {Blob} blob - Access/reach the native {@link RecordRTC} object.
     * @memberof RecordRTCPromisesHandler
     * @example
     * let internal = recorder.recordRTC.getInternalRecorder();
     * alert(internal instanceof MediaStreamRecorder);
     * recorder.recordRTC.onStateChanged = function(state) {};
     */
    self.recordRTC = new RecordRTC(mediaStream, options);

    /**
     * This method records MediaStream.
     * @method
     * @memberof RecordRTCPromisesHandler
     * @example
     * recorder.startRecording()
     *         .then(successCB)
     *         .catch(errorCB);
     */
    this.startRecording = function() {
        return new Promise(function(resolve, reject) {
            try {
                self.recordRTC.startRecording();
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    };

    /**
     * This method stops the recording.
     * @method
     * @memberof RecordRTCPromisesHandler
     * @example
     * recorder.stopRecording().then(function() {
     *     var blob = recorder.getBlob();
     * }).catch(errorCB);
     */
    this.stopRecording = function() {
        return new Promise(function(resolve, reject) {
            try {
                self.recordRTC.stopRecording(function(url) {
                    self.blob = self.recordRTC.getBlob();

                    if (!self.blob || !self.blob.size) {
                        reject('Empty blob.', self.blob);
                        return;
                    }

                    resolve(url);
                });
            } catch (e) {
                reject(e);
            }
        });
    };

    /**
     * This method pauses the recording. You can resume recording using "resumeRecording" method.
     * @method
     * @memberof RecordRTCPromisesHandler
     * @example
     * recorder.pauseRecording()
     *         .then(successCB)
     *         .catch(errorCB);
     */
    this.pauseRecording = function() {
        return new Promise(function(resolve, reject) {
            try {
                self.recordRTC.pauseRecording();
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    };

    /**
     * This method resumes the recording.
     * @method
     * @memberof RecordRTCPromisesHandler
     * @example
     * recorder.resumeRecording()
     *         .then(successCB)
     *         .catch(errorCB);
     */
    this.resumeRecording = function() {
        return new Promise(function(resolve, reject) {
            try {
                self.recordRTC.resumeRecording();
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    };

    /**
     * This method returns data-url for the recorded blob.
     * @method
     * @memberof RecordRTCPromisesHandler
     * @example
     * recorder.stopRecording().then(function() {
     *     recorder.getDataURL().then(function(dataURL) {
     *         window.open(dataURL);
     *     }).catch(errorCB);;
     * }).catch(errorCB);
     */
    this.getDataURL = function(callback) {
        return new Promise(function(resolve, reject) {
            try {
                self.recordRTC.getDataURL(function(dataURL) {
                    resolve(dataURL);
                });
            } catch (e) {
                reject(e);
            }
        });
    };

    /**
     * This method returns the recorded blob.
     * @method
     * @memberof RecordRTCPromisesHandler
     * @example
     * recorder.stopRecording().then(function() {
     *     recorder.getBlob().then(function(blob) {})
     * }).catch(errorCB);
     */
    this.getBlob = function() {
        return new Promise(function(resolve, reject) {
            try {
                resolve(self.recordRTC.getBlob());
            } catch (e) {
                reject(e);
            }
        });
    };

    /**
     * Destroy RecordRTC instance. Clear all recorders and objects.
     * @method
     * @memberof RecordRTCPromisesHandler
     * @example
     * let internalRecorder = await recorder.getInternalRecorder();
     * if(internalRecorder instanceof MultiStreamRecorder) {
     *     internalRecorder.addStreams([newAudioStream]);
     *     internalRecorder.resetVideoStreams([screenStream]);
     * }
     * @returns {Object} Returns internal recording object.
     */
    this.getInternalRecorder = function() {
        return new Promise(function(resolve, reject) {
            try {
                resolve(self.recordRTC.getInternalRecorder());
            } catch (e) {
                reject(e);
            }
        });
    };

    /**
     * This method resets the recorder. So that you can reuse single recorder instance many times.
     * @method
     * @memberof RecordRTCPromisesHandler
     * @example
     * await recorder.reset();
     * recorder.startRecording(); // record again
     */
    this.reset = function() {
        return new Promise(function(resolve, reject) {
            try {
                resolve(self.recordRTC.reset());
            } catch (e) {
                reject(e);
            }
        });
    };

    /**
     * Destroy RecordRTC instance. Clear all recorders and objects.
     * @method
     * @memberof RecordRTCPromisesHandler
     * @example
     * recorder.destroy().then(successCB).catch(errorCB);
     */
    this.destroy = function() {
        return new Promise(function(resolve, reject) {
            try {
                resolve(self.recordRTC.destroy());
            } catch (e) {
                reject(e);
            }
        });
    };

    /**
     * Get recorder's readonly state.
     * @method
     * @memberof RecordRTCPromisesHandler
     * @example
     * let state = await recorder.getState();
     * // or
     * recorder.getState().then(state => { console.log(state); })
     * @returns {String} Returns recording state.
     */
    this.getState = function() {
        return new Promise(function(resolve, reject) {
            try {
                resolve(self.recordRTC.getState());
            } catch (e) {
                reject(e);
            }
        });
    };

    /**
     * @property {Blob} blob - Recorded data as "Blob" object.
     * @memberof RecordRTCPromisesHandler
     * @example
     * await recorder.stopRecording();
     * let blob = recorder.getBlob(); // or "recorder.recordRTC.blob"
     * invokeSaveAsDialog(blob);
     */
    this.blob = null;

    /**
     * RecordRTC version number
     * @property {String} version - Release version number.
     * @memberof RecordRTCPromisesHandler
     * @static
     * @readonly
     * @example
     * alert(recorder.version);
     */
    this.version = '5.5.8';
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.RecordRTCPromisesHandler = RecordRTCPromisesHandler;
}

// ______________________
// WebAssemblyRecorder.js

/**
 * WebAssemblyRecorder lets you create webm videos in JavaScript via WebAssembly. The library consumes raw RGBA32 buffers (4 bytes per pixel) and turns them into a webm video with the given framerate and quality. This makes it compatible out-of-the-box with ImageData from a CANVAS. With realtime mode you can also use webm-wasm for streaming webm videos.
 * @summary Video recording feature in Chrome, Firefox and maybe Edge.
 * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
 * @author {@link https://MuazKhan.com|Muaz Khan}
 * @typedef WebAssemblyRecorder
 * @class
 * @example
 * var recorder = new WebAssemblyRecorder(mediaStream);
 * recorder.record();
 * recorder.stop(function(blob) {
 *     video.src = URL.createObjectURL(blob);
 * });
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 * @param {object} config - {webAssemblyPath:'webm-wasm.wasm',workerPath: 'webm-worker.js', frameRate: 30, width: 1920, height: 1080, bitrate: 1024}
 */
function WebAssemblyRecorder(stream, config) {
    // based on: github.com/GoogleChromeLabs/webm-wasm

    if (typeof ReadableStream === 'undefined' || typeof WritableStream === 'undefined') {
        // because it fixes readable/writable streams issues
        console.error('Following polyfill is strongly recommended: https://unpkg.com/@mattiasbuelens/web-streams-polyfill/dist/polyfill.min.js');
    }

    config = config || {};

    config.width = config.width || 640;
    config.height = config.height || 480;
    config.frameRate = config.frameRate || 30;
    config.bitrate = config.bitrate || 1200;

    function createBufferURL(buffer, type) {
        return URL.createObjectURL(new Blob([buffer], {
            type: type || ''
        }));
    }

    function cameraStream() {
        return new ReadableStream({
            start: function(controller) {
                var cvs = document.createElement('canvas');
                var video = document.createElement('video');
                video.srcObject = stream;
                video.onplaying = function() {
                    cvs.width = config.width;
                    cvs.height = config.height;
                    var ctx = cvs.getContext('2d');
                    var frameTimeout = 1000 / config.frameRate;
                    setTimeout(function f() {
                        ctx.drawImage(video, 0, 0);
                        controller.enqueue(
                            ctx.getImageData(0, 0, config.width, config.height)
                        );
                        setTimeout(f, frameTimeout);
                    }, frameTimeout);
                };
                video.play();
            }
        });
    }

    var worker;

    function startRecording(stream, buffer) {
        if (!config.workerPath && !buffer) {
            // is it safe to use @latest ?
            fetch(
                'https://unpkg.com/webm-wasm@latest/dist/webm-worker.js'
            ).then(function(r) {
                r.arrayBuffer().then(function(buffer) {
                    startRecording(stream, buffer);
                });
            });
            return;
        }

        if (!config.workerPath && buffer instanceof ArrayBuffer) {
            var blob = new Blob([buffer], {
                type: 'text/javascript'
            });
            config.workerPath = URL.createObjectURL(blob);
        }

        if (!config.workerPath) {
            console.error('workerPath parameter is missing.');
        }

        worker = new Worker(config.workerPath);

        worker.postMessage(config.webAssemblyPath || 'https://unpkg.com/webm-wasm@latest/dist/webm-wasm.wasm');
        worker.addEventListener('message', function(event) {
            if (event.data === 'READY') {
                worker.postMessage({
                    width: config.width,
                    height: config.height,
                    bitrate: config.bitrate || 1200,
                    timebaseDen: config.frameRate || 30,
                    realtime: true
                });

                cameraStream().pipeTo(new WritableStream({
                    write: function(image) {
                        if (!worker) {
                            return;
                        }

                        worker.postMessage(image.data.buffer, [image.data.buffer]);
                    }
                }));
            } else if (!!event.data) {
                if (!isPaused) {
                    arrayOfBuffers.push(event.data);
                }
            }
        });
    }

    /**
     * This method records video.
     * @method
     * @memberof WebAssemblyRecorder
     * @example
     * recorder.record();
     */
    this.record = function() {
        arrayOfBuffers = [];
        isPaused = false;
        this.blob = null;
        startRecording(stream);

        if (typeof config.initCallback === 'function') {
            config.initCallback();
        }
    };

    var isPaused;

    /**
     * This method pauses the recording process.
     * @method
     * @memberof WebAssemblyRecorder
     * @example
     * recorder.pause();
     */
    this.pause = function() {
        isPaused = true;
    };

    /**
     * This method resumes the recording process.
     * @method
     * @memberof WebAssemblyRecorder
     * @example
     * recorder.resume();
     */
    this.resume = function() {
        isPaused = false;
    };

    function terminate() {
        if (!worker) {
            return;
        }

        worker.postMessage(null);
        worker.terminate();
        worker = null;
    }

    var arrayOfBuffers = [];

    /**
     * This method stops recording video.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof WebAssemblyRecorder
     * @example
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
     */
    this.stop = function(callback) {
        terminate();

        this.blob = new Blob(arrayOfBuffers, {
            type: 'video/webm'
        });

        callback(this.blob);
    };

    // for debugging
    this.name = 'WebAssemblyRecorder';
    this.toString = function() {
        return this.name;
    };

    /**
     * This method resets currently recorded data.
     * @method
     * @memberof WebAssemblyRecorder
     * @example
     * recorder.clearRecordedData();
     */
    this.clearRecordedData = function() {
        arrayOfBuffers = [];
        isPaused = false;
        this.blob = null;

        // todo: if recording-ON then STOP it first
    };

    /**
     * @property {Blob} blob - The recorded blob object.
     * @memberof WebAssemblyRecorder
     * @example
     * recorder.stop(function(){
     *     var blob = recorder.blob;
     * });
     */
    this.blob = null;
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.WebAssemblyRecorder = WebAssemblyRecorder;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var url = __webpack_require__(30);
var parser = __webpack_require__(8);
var Manager = __webpack_require__(15);
var debug = __webpack_require__(4)('socket.io-client');

/**
 * Module exports.
 */

module.exports = exports = lookup;

/**
 * Managers cache.
 */

var cache = exports.managers = {};

/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @api public
 */

function lookup (uri, opts) {
  if (typeof uri === 'object') {
    opts = uri;
    uri = undefined;
  }

  opts = opts || {};

  var parsed = url(uri);
  var source = parsed.source;
  var id = parsed.id;
  var path = parsed.path;
  var sameNamespace = cache[id] && path in cache[id].nsps;
  var newConnection = opts.forceNew || opts['force new connection'] ||
                      false === opts.multiplex || sameNamespace;

  var io;

  if (newConnection) {
    debug('ignoring socket cache for %s', source);
    io = Manager(source, opts);
  } else {
    if (!cache[id]) {
      debug('new io instance for %s', source);
      cache[id] = Manager(source, opts);
    }
    io = cache[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.query;
  }
  return io.socket(parsed.path, opts);
}

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = parser.protocol;

/**
 * `connect`.
 *
 * @param {String} uri
 * @api public
 */

exports.connect = lookup;

/**
 * Expose constructors for standalone build.
 *
 * @api public
 */

exports.Manager = __webpack_require__(15);
exports.Socket = __webpack_require__(21);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var parseuri = __webpack_require__(12);
var debug = __webpack_require__(4)('socket.io-client:url');

/**
 * Module exports.
 */

module.exports = url;

/**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */

function url (uri, loc) {
  var obj = uri;

  // default to window.location
  loc = loc || (typeof location !== 'undefined' && location);
  if (null == uri) uri = loc.protocol + '//' + loc.host;

  // relative path support
  if ('string' === typeof uri) {
    if ('/' === uri.charAt(0)) {
      if ('/' === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug('protocol-less url %s', uri);
      if ('undefined' !== typeof loc) {
        uri = loc.protocol + '//' + uri;
      } else {
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
    obj = parseuri(uri);
  }

  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';

  var ipv6 = obj.host.indexOf(':') !== -1;
  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

  // define unique id
  obj.id = obj.protocol + '://' + host + ':' + obj.port;
  // define href
  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : (':' + obj.port));

  return obj;
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(32);

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* Active `debug` instances.
	*/
	createDebug.instances = [];

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return match;
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = selectColor(namespace);
		debug.destroy = destroy;
		debug.extend = extend;
		// Debug.formatArgs = formatArgs;
		// debug.rawLog = rawLog;

		// env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		createDebug.instances.push(debug);

		return debug;
	}

	function destroy() {
		const index = createDebug.instances.indexOf(this);
		if (index !== -1) {
			createDebug.instances.splice(index, 1);
			return true;
		}
		return false;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}

		for (i = 0; i < createDebug.instances.length; i++) {
			const instance = createDebug.instances[i];
			instance.enabled = createDebug.enabled(instance.namespace);
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(34);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(35);

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 35 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/*global Blob,File*/

/**
 * Module requirements
 */

var isArray = __webpack_require__(13);
var isBuf = __webpack_require__(14);
var toString = Object.prototype.toString;
var withNativeBlob = typeof Blob === 'function' || (typeof Blob !== 'undefined' && toString.call(Blob) === '[object BlobConstructor]');
var withNativeFile = typeof File === 'function' || (typeof File !== 'undefined' && toString.call(File) === '[object FileConstructor]');

/**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */

exports.deconstructPacket = function(packet) {
  var buffers = [];
  var packetData = packet.data;
  var pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return {packet: pack, buffers: buffers};
};

function _deconstructPacket(data, buffers) {
  if (!data) return data;

  if (isBuf(data)) {
    var placeholder = { _placeholder: true, num: buffers.length };
    buffers.push(data);
    return placeholder;
  } else if (isArray(data)) {
    var newData = new Array(data.length);
    for (var i = 0; i < data.length; i++) {
      newData[i] = _deconstructPacket(data[i], buffers);
    }
    return newData;
  } else if (typeof data === 'object' && !(data instanceof Date)) {
    var newData = {};
    for (var key in data) {
      newData[key] = _deconstructPacket(data[key], buffers);
    }
    return newData;
  }
  return data;
}

/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @api public
 */

exports.reconstructPacket = function(packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  packet.attachments = undefined; // no longer useful
  return packet;
};

function _reconstructPacket(data, buffers) {
  if (!data) return data;

  if (data && data._placeholder) {
    return buffers[data.num]; // appropriate buffer (should be natural order anyway)
  } else if (isArray(data)) {
    for (var i = 0; i < data.length; i++) {
      data[i] = _reconstructPacket(data[i], buffers);
    }
  } else if (typeof data === 'object') {
    for (var key in data) {
      data[key] = _reconstructPacket(data[key], buffers);
    }
  }

  return data;
}

/**
 * Asynchronously removes Blobs or Files from data via
 * FileReader's readAsArrayBuffer method. Used before encoding
 * data as msgpack. Calls callback with the blobless data.
 *
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

exports.removeBlobs = function(data, callback) {
  function _removeBlobs(obj, curKey, containingObject) {
    if (!obj) return obj;

    // convert any blob
    if ((withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File)) {
      pendingBlobs++;

      // async filereader
      var fileReader = new FileReader();
      fileReader.onload = function() { // this.result == arraybuffer
        if (containingObject) {
          containingObject[curKey] = this.result;
        }
        else {
          bloblessData = this.result;
        }

        // if nothing pending its callback time
        if(! --pendingBlobs) {
          callback(bloblessData);
        }
      };

      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
    } else if (isArray(obj)) { // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (typeof obj === 'object' && !isBuf(obj)) { // and object
      for (var key in obj) {
        _removeBlobs(obj[key], key, obj);
      }
    }
  }

  var pendingBlobs = 0;
  var bloblessData = data;
  _removeBlobs(bloblessData);
  if (!pendingBlobs) {
    callback(bloblessData);
  }
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 38 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 39 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {


module.exports = __webpack_require__(41);

/**
 * Exports parser
 *
 * @api public
 *
 */
module.exports.parser = __webpack_require__(1);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var transports = __webpack_require__(16);
var Emitter = __webpack_require__(0);
var debug = __webpack_require__(7)('engine.io-client:socket');
var index = __webpack_require__(20);
var parser = __webpack_require__(1);
var parseuri = __webpack_require__(12);
var parseqs = __webpack_require__(5);

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */

function Socket (uri, opts) {
  if (!(this instanceof Socket)) return new Socket(uri, opts);

  opts = opts || {};

  if (uri && 'object' === typeof uri) {
    opts = uri;
    uri = null;
  }

  if (uri) {
    uri = parseuri(uri);
    opts.hostname = uri.host;
    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
    opts.port = uri.port;
    if (uri.query) opts.query = uri.query;
  } else if (opts.host) {
    opts.hostname = parseuri(opts.host).host;
  }

  this.secure = null != opts.secure ? opts.secure
    : (typeof location !== 'undefined' && 'https:' === location.protocol);

  if (opts.hostname && !opts.port) {
    // if no port is specified manually, use the protocol default
    opts.port = this.secure ? '443' : '80';
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname ||
    (typeof location !== 'undefined' ? location.hostname : 'localhost');
  this.port = opts.port || (typeof location !== 'undefined' && location.port
      ? location.port
      : (this.secure ? 443 : 80));
  this.query = opts.query || {};
  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
  this.upgrade = false !== opts.upgrade;
  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.jsonp = false !== opts.jsonp;
  this.forceBase64 = !!opts.forceBase64;
  this.enablesXDR = !!opts.enablesXDR;
  this.withCredentials = false !== opts.withCredentials;
  this.timestampParam = opts.timestampParam || 't';
  this.timestampRequests = opts.timestampRequests;
  this.transports = opts.transports || ['polling', 'websocket'];
  this.transportOptions = opts.transportOptions || {};
  this.readyState = '';
  this.writeBuffer = [];
  this.prevBufferLen = 0;
  this.policyPort = opts.policyPort || 843;
  this.rememberUpgrade = opts.rememberUpgrade || false;
  this.binaryType = null;
  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;

  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
    this.perMessageDeflate.threshold = 1024;
  }

  // SSL options for Node.js client
  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;
  this.forceNode = !!opts.forceNode;

  // detect ReactNative environment
  this.isReactNative = (typeof navigator !== 'undefined' && typeof navigator.product === 'string' && navigator.product.toLowerCase() === 'reactnative');

  // other options for Node.js or ReactNative client
  if (typeof self === 'undefined' || this.isReactNative) {
    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
      this.extraHeaders = opts.extraHeaders;
    }

    if (opts.localAddress) {
      this.localAddress = opts.localAddress;
    }
  }

  // set on handshake
  this.id = null;
  this.upgrades = null;
  this.pingInterval = null;
  this.pingTimeout = null;

  // set on heartbeat
  this.pingIntervalTimer = null;
  this.pingTimeoutTimer = null;

  this.open();
}

Socket.priorWebsocketSuccess = false;

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = __webpack_require__(11);
Socket.transports = __webpack_require__(16);
Socket.parser = __webpack_require__(1);

/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug('creating transport "%s"', name);
  var query = clone(this.query);

  // append engine.io protocol identifier
  query.EIO = parser.protocol;

  // transport name
  query.transport = name;

  // per-transport options
  var options = this.transportOptions[name] || {};

  // session id if we already have one
  if (this.id) query.sid = this.id;

  var transport = new transports[name]({
    query: query,
    socket: this,
    agent: options.agent || this.agent,
    hostname: options.hostname || this.hostname,
    port: options.port || this.port,
    secure: options.secure || this.secure,
    path: options.path || this.path,
    forceJSONP: options.forceJSONP || this.forceJSONP,
    jsonp: options.jsonp || this.jsonp,
    forceBase64: options.forceBase64 || this.forceBase64,
    enablesXDR: options.enablesXDR || this.enablesXDR,
    withCredentials: options.withCredentials || this.withCredentials,
    timestampRequests: options.timestampRequests || this.timestampRequests,
    timestampParam: options.timestampParam || this.timestampParam,
    policyPort: options.policyPort || this.policyPort,
    pfx: options.pfx || this.pfx,
    key: options.key || this.key,
    passphrase: options.passphrase || this.passphrase,
    cert: options.cert || this.cert,
    ca: options.ca || this.ca,
    ciphers: options.ciphers || this.ciphers,
    rejectUnauthorized: options.rejectUnauthorized || this.rejectUnauthorized,
    perMessageDeflate: options.perMessageDeflate || this.perMessageDeflate,
    extraHeaders: options.extraHeaders || this.extraHeaders,
    forceNode: options.forceNode || this.forceNode,
    localAddress: options.localAddress || this.localAddress,
    requestTimeout: options.requestTimeout || this.requestTimeout,
    protocols: options.protocols || void (0),
    isReactNative: this.isReactNative
  });

  return transport;
};

function clone (obj) {
  var o = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

/**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */
Socket.prototype.open = function () {
  var transport;
  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
    transport = 'websocket';
  } else if (0 === this.transports.length) {
    // Emit error on next tick so it can be listened to
    var self = this;
    setTimeout(function () {
      self.emit('error', 'No transports available');
    }, 0);
    return;
  } else {
    transport = this.transports[0];
  }
  this.readyState = 'opening';

  // Retry with the next transport if the transport is disabled (jsonp: false)
  try {
    transport = this.createTransport(transport);
  } catch (e) {
    this.transports.shift();
    this.open();
    return;
  }

  transport.open();
  this.setTransport(transport);
};

/**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */

Socket.prototype.setTransport = function (transport) {
  debug('setting transport %s', transport.name);
  var self = this;

  if (this.transport) {
    debug('clearing existing transport %s', this.transport.name);
    this.transport.removeAllListeners();
  }

  // set up transport
  this.transport = transport;

  // set up transport listeners
  transport
  .on('drain', function () {
    self.onDrain();
  })
  .on('packet', function (packet) {
    self.onPacket(packet);
  })
  .on('error', function (e) {
    self.onError(e);
  })
  .on('close', function () {
    self.onClose('transport close');
  });
};

/**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */

Socket.prototype.probe = function (name) {
  debug('probing transport "%s"', name);
  var transport = this.createTransport(name, { probe: 1 });
  var failed = false;
  var self = this;

  Socket.priorWebsocketSuccess = false;

  function onTransportOpen () {
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }
    if (failed) return;

    debug('probe transport "%s" opened', name);
    transport.send([{ type: 'ping', data: 'probe' }]);
    transport.once('packet', function (msg) {
      if (failed) return;
      if ('pong' === msg.type && 'probe' === msg.data) {
        debug('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport);
        if (!transport) return;
        Socket.priorWebsocketSuccess = 'websocket' === transport.name;

        debug('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' === self.readyState) return;
          debug('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport);
          transport.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport);
          transport = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug('probe transport "%s" failed', name);
        var err = new Error('probe error');
        err.transport = transport.name;
        self.emit('upgradeError', err);
      }
    });
  }

  function freezeTransport () {
    if (failed) return;

    // Any callback called by transport should be ignored since now
    failed = true;

    cleanup();

    transport.close();
    transport = null;
  }

  // Handle any error that happens while probing
  function onerror (err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport.name;

    freezeTransport();

    debug('probe transport "%s" failed because of error: %s', name, err);

    self.emit('upgradeError', error);
  }

  function onTransportClose () {
    onerror('transport closed');
  }

  // When the socket is closed while we're probing
  function onclose () {
    onerror('socket closed');
  }

  // When the socket is upgraded while we're probing
  function onupgrade (to) {
    if (transport && to.name !== transport.name) {
      debug('"%s" works - aborting "%s"', to.name, transport.name);
      freezeTransport();
    }
  }

  // Remove all listeners on the transport and on self
  function cleanup () {
    transport.removeListener('open', onTransportOpen);
    transport.removeListener('error', onerror);
    transport.removeListener('close', onTransportClose);
    self.removeListener('close', onclose);
    self.removeListener('upgrading', onupgrade);
  }

  transport.once('open', onTransportOpen);
  transport.once('error', onerror);
  transport.once('close', onTransportClose);

  this.once('close', onclose);
  this.once('upgrading', onupgrade);

  transport.open();
};

/**
 * Called when connection is deemed open.
 *
 * @api public
 */

Socket.prototype.onOpen = function () {
  debug('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
    debug('starting upgrade probes');
    for (var i = 0, l = this.upgrades.length; i < l; i++) {
      this.probe(this.upgrades[i]);
    }
  }
};

/**
 * Handles a packet.
 *
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('opening' === this.readyState || 'open' === this.readyState ||
      'closing' === this.readyState) {
    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

    this.emit('packet', packet);

    // Socket is live - any packet counts
    this.emit('heartbeat');

    switch (packet.type) {
      case 'open':
        this.onHandshake(JSON.parse(packet.data));
        break;

      case 'pong':
        this.setPing();
        this.emit('pong');
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.onError(err);
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with socket readyState "%s"', this.readyState);
  }
};

/**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */

Socket.prototype.onHandshake = function (data) {
  this.emit('handshake', data);
  this.id = data.sid;
  this.transport.query.sid = data.sid;
  this.upgrades = this.filterUpgrades(data.upgrades);
  this.pingInterval = data.pingInterval;
  this.pingTimeout = data.pingTimeout;
  this.onOpen();
  // In case open handler closes socket
  if ('closed' === this.readyState) return;
  this.setPing();

  // Prolong liveness of socket on heartbeat
  this.removeListener('heartbeat', this.onHeartbeat);
  this.on('heartbeat', this.onHeartbeat);
};

/**
 * Resets ping timeout.
 *
 * @api private
 */

Socket.prototype.onHeartbeat = function (timeout) {
  clearTimeout(this.pingTimeoutTimer);
  var self = this;
  self.pingTimeoutTimer = setTimeout(function () {
    if ('closed' === self.readyState) return;
    self.onClose('ping timeout');
  }, timeout || (self.pingInterval + self.pingTimeout));
};

/**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */

Socket.prototype.setPing = function () {
  var self = this;
  clearTimeout(self.pingIntervalTimer);
  self.pingIntervalTimer = setTimeout(function () {
    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
    self.ping();
    self.onHeartbeat(self.pingTimeout);
  }, self.pingInterval);
};

/**
* Sends a ping packet.
*
* @api private
*/

Socket.prototype.ping = function () {
  var self = this;
  this.sendPacket('ping', function () {
    self.emit('ping');
  });
};

/**
 * Called on `drain` event
 *
 * @api private
 */

Socket.prototype.onDrain = function () {
  this.writeBuffer.splice(0, this.prevBufferLen);

  // setting prevBufferLen = 0 is very important
  // for example, when upgrading, upgrade packet is sent over,
  // and a nonzero prevBufferLen could cause problems on `drain`
  this.prevBufferLen = 0;

  if (0 === this.writeBuffer.length) {
    this.emit('drain');
  } else {
    this.flush();
  }
};

/**
 * Flush write buffers.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' !== this.readyState && this.transport.writable &&
    !this.upgrading && this.writeBuffer.length) {
    debug('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer);
    // keep track of current length of writeBuffer
    // splice writeBuffer and callbackBuffer on `drain`
    this.prevBufferLen = this.writeBuffer.length;
    this.emit('flush');
  }
};

/**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @param {Object} options.
 * @return {Socket} for chaining.
 * @api public
 */

Socket.prototype.write =
Socket.prototype.send = function (msg, options, fn) {
  this.sendPacket('message', msg, options, fn);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Object} options.
 * @param {Function} callback function.
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, options, fn) {
  if ('function' === typeof data) {
    fn = data;
    data = undefined;
  }

  if ('function' === typeof options) {
    fn = options;
    options = null;
  }

  if ('closing' === this.readyState || 'closed' === this.readyState) {
    return;
  }

  options = options || {};
  options.compress = false !== options.compress;

  var packet = {
    type: type,
    data: data,
    options: options
  };
  this.emit('packetCreate', packet);
  this.writeBuffer.push(packet);
  if (fn) this.once('flush', fn);
  this.flush();
};

/**
 * Closes the connection.
 *
 * @api private
 */

Socket.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.readyState = 'closing';

    var self = this;

    if (this.writeBuffer.length) {
      this.once('drain', function () {
        if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      });
    } else if (this.upgrading) {
      waitForUpgrade();
    } else {
      close();
    }
  }

  function close () {
    self.onClose('forced close');
    debug('socket closing - telling transport to close');
    self.transport.close();
  }

  function cleanupAndClose () {
    self.removeListener('upgrade', cleanupAndClose);
    self.removeListener('upgradeError', cleanupAndClose);
    close();
  }

  function waitForUpgrade () {
    // wait for upgrade to finish since we can't send packets while pausing a transport
    self.once('upgrade', cleanupAndClose);
    self.once('upgradeError', cleanupAndClose);
  }

  return this;
};

/**
 * Called upon transport error
 *
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('socket error %j', err);
  Socket.priorWebsocketSuccess = false;
  this.emit('error', err);
  this.onClose('transport error', err);
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Socket.prototype.onClose = function (reason, desc) {
  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
    debug('socket close with reason: "%s"', reason);
    var self = this;

    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // stop event from firing again for transport
    this.transport.removeAllListeners('close');

    // ensure transport won't stay open
    this.transport.close();

    // ignore further transport communication
    this.transport.removeAllListeners();

    // set ready state
    this.readyState = 'closed';

    // clear session id
    this.id = null;

    // emit close event
    this.emit('close', reason, desc);

    // clean buffers after, so users can still
    // grab the buffers on `close` event
    self.writeBuffer = [];
    self.prevBufferLen = 0;
  }
};

/**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */

Socket.prototype.filterUpgrades = function (upgrades) {
  var filteredUpgrades = [];
  for (var i = 0, j = upgrades.length; i < j; i++) {
    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
  }
  return filteredUpgrades;
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {


/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' &&
    'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

/* global attachEvent */

/**
 * Module requirements.
 */

var XMLHttpRequest = __webpack_require__(10);
var Polling = __webpack_require__(17);
var Emitter = __webpack_require__(0);
var inherit = __webpack_require__(6);
var debug = __webpack_require__(7)('engine.io-client:polling-xhr');

/**
 * Module exports.
 */

module.exports = XHR;
module.exports.Request = Request;

/**
 * Empty function
 */

function empty () {}

/**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */

function XHR (opts) {
  Polling.call(this, opts);
  this.requestTimeout = opts.requestTimeout;
  this.extraHeaders = opts.extraHeaders;

  if (typeof location !== 'undefined') {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    this.xd = (typeof location !== 'undefined' && opts.hostname !== location.hostname) ||
      port !== opts.port;
    this.xs = opts.secure !== isSSL;
  }
}

/**
 * Inherits from Polling.
 */

inherit(XHR, Polling);

/**
 * XHR supports binary
 */

XHR.prototype.supportsBinary = true;

/**
 * Creates a request.
 *
 * @param {String} method
 * @api private
 */

XHR.prototype.request = function (opts) {
  opts = opts || {};
  opts.uri = this.uri();
  opts.xd = this.xd;
  opts.xs = this.xs;
  opts.agent = this.agent || false;
  opts.supportsBinary = this.supportsBinary;
  opts.enablesXDR = this.enablesXDR;
  opts.withCredentials = this.withCredentials;

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  opts.requestTimeout = this.requestTimeout;

  // other options for Node.js client
  opts.extraHeaders = this.extraHeaders;

  return new Request(opts);
};

/**
 * Sends data.
 *
 * @param {String} data to send.
 * @param {Function} called upon flush.
 * @api private
 */

XHR.prototype.doWrite = function (data, fn) {
  var isBinary = typeof data !== 'string' && data !== undefined;
  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
  var self = this;
  req.on('success', fn);
  req.on('error', function (err) {
    self.onError('xhr post error', err);
  });
  this.sendXhr = req;
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

XHR.prototype.doPoll = function () {
  debug('xhr poll');
  var req = this.request();
  var self = this;
  req.on('data', function (data) {
    self.onData(data);
  });
  req.on('error', function (err) {
    self.onError('xhr poll error', err);
  });
  this.pollXhr = req;
};

/**
 * Request constructor
 *
 * @param {Object} options
 * @api public
 */

function Request (opts) {
  this.method = opts.method || 'GET';
  this.uri = opts.uri;
  this.xd = !!opts.xd;
  this.xs = !!opts.xs;
  this.async = false !== opts.async;
  this.data = undefined !== opts.data ? opts.data : null;
  this.agent = opts.agent;
  this.isBinary = opts.isBinary;
  this.supportsBinary = opts.supportsBinary;
  this.enablesXDR = opts.enablesXDR;
  this.withCredentials = opts.withCredentials;
  this.requestTimeout = opts.requestTimeout;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;

  this.create();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Creates the XHR object and sends the request.
 *
 * @api private
 */

Request.prototype.create = function () {
  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  var xhr = this.xhr = new XMLHttpRequest(opts);
  var self = this;

  try {
    debug('xhr open %s: %s', this.method, this.uri);
    xhr.open(this.method, this.uri, this.async);
    try {
      if (this.extraHeaders) {
        xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
        for (var i in this.extraHeaders) {
          if (this.extraHeaders.hasOwnProperty(i)) {
            xhr.setRequestHeader(i, this.extraHeaders[i]);
          }
        }
      }
    } catch (e) {}

    if ('POST' === this.method) {
      try {
        if (this.isBinary) {
          xhr.setRequestHeader('Content-type', 'application/octet-stream');
        } else {
          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        }
      } catch (e) {}
    }

    try {
      xhr.setRequestHeader('Accept', '*/*');
    } catch (e) {}

    // ie6 check
    if ('withCredentials' in xhr) {
      xhr.withCredentials = this.withCredentials;
    }

    if (this.requestTimeout) {
      xhr.timeout = this.requestTimeout;
    }

    if (this.hasXDR()) {
      xhr.onload = function () {
        self.onLoad();
      };
      xhr.onerror = function () {
        self.onError(xhr.responseText);
      };
    } else {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 2) {
          try {
            var contentType = xhr.getResponseHeader('Content-Type');
            if (self.supportsBinary && contentType === 'application/octet-stream' || contentType === 'application/octet-stream; charset=UTF-8') {
              xhr.responseType = 'arraybuffer';
            }
          } catch (e) {}
        }
        if (4 !== xhr.readyState) return;
        if (200 === xhr.status || 1223 === xhr.status) {
          self.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          setTimeout(function () {
            self.onError(typeof xhr.status === 'number' ? xhr.status : 0);
          }, 0);
        }
      };
    }

    debug('xhr data %s', this.data);
    xhr.send(this.data);
  } catch (e) {
    // Need to defer since .create() is called directly fhrom the constructor
    // and thus the 'error' event can only be only bound *after* this exception
    // occurs.  Therefore, also, we cannot throw here at all.
    setTimeout(function () {
      self.onError(e);
    }, 0);
    return;
  }

  if (typeof document !== 'undefined') {
    this.index = Request.requestsCount++;
    Request.requests[this.index] = this;
  }
};

/**
 * Called upon successful response.
 *
 * @api private
 */

Request.prototype.onSuccess = function () {
  this.emit('success');
  this.cleanup();
};

/**
 * Called if we have data.
 *
 * @api private
 */

Request.prototype.onData = function (data) {
  this.emit('data', data);
  this.onSuccess();
};

/**
 * Called upon error.
 *
 * @api private
 */

Request.prototype.onError = function (err) {
  this.emit('error', err);
  this.cleanup(true);
};

/**
 * Cleans up house.
 *
 * @api private
 */

Request.prototype.cleanup = function (fromError) {
  if ('undefined' === typeof this.xhr || null === this.xhr) {
    return;
  }
  // xmlhttprequest
  if (this.hasXDR()) {
    this.xhr.onload = this.xhr.onerror = empty;
  } else {
    this.xhr.onreadystatechange = empty;
  }

  if (fromError) {
    try {
      this.xhr.abort();
    } catch (e) {}
  }

  if (typeof document !== 'undefined') {
    delete Request.requests[this.index];
  }

  this.xhr = null;
};

/**
 * Called upon load.
 *
 * @api private
 */

Request.prototype.onLoad = function () {
  var data;
  try {
    var contentType;
    try {
      contentType = this.xhr.getResponseHeader('Content-Type');
    } catch (e) {}
    if (contentType === 'application/octet-stream' || contentType === 'application/octet-stream; charset=UTF-8') {
      data = this.xhr.response || this.xhr.responseText;
    } else {
      data = this.xhr.responseText;
    }
  } catch (e) {
    this.onError(e);
  }
  if (null != data) {
    this.onData(data);
  }
};

/**
 * Check if it has XDomainRequest.
 *
 * @api private
 */

Request.prototype.hasXDR = function () {
  return typeof XDomainRequest !== 'undefined' && !this.xs && this.enablesXDR;
};

/**
 * Aborts the request.
 *
 * @api public
 */

Request.prototype.abort = function () {
  this.cleanup();
};

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

Request.requestsCount = 0;
Request.requests = {};

if (typeof document !== 'undefined') {
  if (typeof attachEvent === 'function') {
    attachEvent('onunload', unloadHandler);
  } else if (typeof addEventListener === 'function') {
    var terminationEvent = 'onpagehide' in self ? 'pagehide' : 'unload';
    addEventListener(terminationEvent, unloadHandler, false);
  }
}

function unloadHandler () {
  for (var i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}


/***/ }),
/* 44 */
/***/ (function(module, exports) {


/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

module.exports = Object.keys || function keys (obj){
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

/**
 * An abstraction for slicing an arraybuffer even when
 * ArrayBuffer.prototype.slice is not supported
 *
 * @api public
 */

module.exports = function(arraybuffer, start, end) {
  var bytes = arraybuffer.byteLength;
  start = start || 0;
  end = end || bytes;

  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }

  if (start < 0) { start += bytes; }
  if (end < 0) { end += bytes; }
  if (end > bytes) { end = bytes; }

  if (start >= bytes || start >= end || bytes === 0) {
    return new ArrayBuffer(0);
  }

  var abv = new Uint8Array(arraybuffer);
  var result = new Uint8Array(end - start);
  for (var i = start, ii = 0; i < end; i++, ii++) {
    result[ii] = abv[i];
  }
  return result.buffer;
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = after

function after(count, callback, err_cb) {
    var bail = false
    err_cb = err_cb || noop
    proxy.count = count

    return (count === 0) ? callback() : proxy

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times')
        }
        --proxy.count

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true
            callback(err)
            // future error callbacks will go to error handler
            callback = err_cb
        } else if (proxy.count === 0 && !bail) {
            callback(null, result)
        }
    }
}

function noop() {}


/***/ }),
/* 48 */
/***/ (function(module, exports) {

/*! https://mths.be/utf8js v2.1.2 by @mathias */

var stringFromCharCode = String.fromCharCode;

// Taken from https://mths.be/punycode
function ucs2decode(string) {
	var output = [];
	var counter = 0;
	var length = string.length;
	var value;
	var extra;
	while (counter < length) {
		value = string.charCodeAt(counter++);
		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
			// high surrogate, and there is a next character
			extra = string.charCodeAt(counter++);
			if ((extra & 0xFC00) == 0xDC00) { // low surrogate
				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
			} else {
				// unmatched surrogate; only append this code unit, in case the next
				// code unit is the high surrogate of a surrogate pair
				output.push(value);
				counter--;
			}
		} else {
			output.push(value);
		}
	}
	return output;
}

// Taken from https://mths.be/punycode
function ucs2encode(array) {
	var length = array.length;
	var index = -1;
	var value;
	var output = '';
	while (++index < length) {
		value = array[index];
		if (value > 0xFFFF) {
			value -= 0x10000;
			output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
			value = 0xDC00 | value & 0x3FF;
		}
		output += stringFromCharCode(value);
	}
	return output;
}

function checkScalarValue(codePoint, strict) {
	if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
		if (strict) {
			throw Error(
				'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
				' is not a scalar value'
			);
		}
		return false;
	}
	return true;
}
/*--------------------------------------------------------------------------*/

function createByte(codePoint, shift) {
	return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
}

function encodeCodePoint(codePoint, strict) {
	if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
		return stringFromCharCode(codePoint);
	}
	var symbol = '';
	if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
		symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
	}
	else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
		if (!checkScalarValue(codePoint, strict)) {
			codePoint = 0xFFFD;
		}
		symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
		symbol += createByte(codePoint, 6);
	}
	else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
		symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
		symbol += createByte(codePoint, 12);
		symbol += createByte(codePoint, 6);
	}
	symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
	return symbol;
}

function utf8encode(string, opts) {
	opts = opts || {};
	var strict = false !== opts.strict;

	var codePoints = ucs2decode(string);
	var length = codePoints.length;
	var index = -1;
	var codePoint;
	var byteString = '';
	while (++index < length) {
		codePoint = codePoints[index];
		byteString += encodeCodePoint(codePoint, strict);
	}
	return byteString;
}

/*--------------------------------------------------------------------------*/

function readContinuationByte() {
	if (byteIndex >= byteCount) {
		throw Error('Invalid byte index');
	}

	var continuationByte = byteArray[byteIndex] & 0xFF;
	byteIndex++;

	if ((continuationByte & 0xC0) == 0x80) {
		return continuationByte & 0x3F;
	}

	// If we end up here, it’s not a continuation byte
	throw Error('Invalid continuation byte');
}

function decodeSymbol(strict) {
	var byte1;
	var byte2;
	var byte3;
	var byte4;
	var codePoint;

	if (byteIndex > byteCount) {
		throw Error('Invalid byte index');
	}

	if (byteIndex == byteCount) {
		return false;
	}

	// Read first byte
	byte1 = byteArray[byteIndex] & 0xFF;
	byteIndex++;

	// 1-byte sequence (no continuation bytes)
	if ((byte1 & 0x80) == 0) {
		return byte1;
	}

	// 2-byte sequence
	if ((byte1 & 0xE0) == 0xC0) {
		byte2 = readContinuationByte();
		codePoint = ((byte1 & 0x1F) << 6) | byte2;
		if (codePoint >= 0x80) {
			return codePoint;
		} else {
			throw Error('Invalid continuation byte');
		}
	}

	// 3-byte sequence (may include unpaired surrogates)
	if ((byte1 & 0xF0) == 0xE0) {
		byte2 = readContinuationByte();
		byte3 = readContinuationByte();
		codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
		if (codePoint >= 0x0800) {
			return checkScalarValue(codePoint, strict) ? codePoint : 0xFFFD;
		} else {
			throw Error('Invalid continuation byte');
		}
	}

	// 4-byte sequence
	if ((byte1 & 0xF8) == 0xF0) {
		byte2 = readContinuationByte();
		byte3 = readContinuationByte();
		byte4 = readContinuationByte();
		codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
			(byte3 << 0x06) | byte4;
		if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
			return codePoint;
		}
	}

	throw Error('Invalid UTF-8 detected');
}

var byteArray;
var byteCount;
var byteIndex;
function utf8decode(byteString, opts) {
	opts = opts || {};
	var strict = false !== opts.strict;

	byteArray = ucs2decode(byteString);
	byteCount = byteArray.length;
	byteIndex = 0;
	var codePoints = [];
	var tmp;
	while ((tmp = decodeSymbol(strict)) !== false) {
		codePoints.push(tmp);
	}
	return ucs2encode(codePoints);
}

module.exports = {
	version: '2.1.2',
	encode: utf8encode,
	decode: utf8decode
};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(){
  "use strict";

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  // Use a lookup table to find the index.
  var lookup = new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  exports.encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode =  function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = lookup[base64.charCodeAt(i)];
      encoded2 = lookup[base64.charCodeAt(i+1)];
      encoded3 = lookup[base64.charCodeAt(i+2)];
      encoded4 = lookup[base64.charCodeAt(i+3)];

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})();


/***/ }),
/* 50 */
/***/ (function(module, exports) {

/**
 * Create a blob builder even when vendor prefixes exist
 */

var BlobBuilder = typeof BlobBuilder !== 'undefined' ? BlobBuilder :
  typeof WebKitBlobBuilder !== 'undefined' ? WebKitBlobBuilder :
  typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder :
  typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : 
  false;

/**
 * Check if Blob constructor is supported
 */

var blobSupported = (function() {
  try {
    var a = new Blob(['hi']);
    return a.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if Blob constructor supports ArrayBufferViews
 * Fails in Safari 6, so we need to map to ArrayBuffers there.
 */

var blobSupportsArrayBufferView = blobSupported && (function() {
  try {
    var b = new Blob([new Uint8Array([1,2])]);
    return b.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if BlobBuilder is supported
 */

var blobBuilderSupported = BlobBuilder
  && BlobBuilder.prototype.append
  && BlobBuilder.prototype.getBlob;

/**
 * Helper function that maps ArrayBufferViews to ArrayBuffers
 * Used by BlobBuilder constructor and old browsers that didn't
 * support it in the Blob constructor.
 */

function mapArrayBufferViews(ary) {
  return ary.map(function(chunk) {
    if (chunk.buffer instanceof ArrayBuffer) {
      var buf = chunk.buffer;

      // if this is a subarray, make a copy so we only
      // include the subarray region from the underlying buffer
      if (chunk.byteLength !== buf.byteLength) {
        var copy = new Uint8Array(chunk.byteLength);
        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
        buf = copy.buffer;
      }

      return buf;
    }

    return chunk;
  });
}

function BlobBuilderConstructor(ary, options) {
  options = options || {};

  var bb = new BlobBuilder();
  mapArrayBufferViews(ary).forEach(function(part) {
    bb.append(part);
  });

  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
};

function BlobConstructor(ary, options) {
  return new Blob(mapArrayBufferViews(ary), options || {});
};

if (typeof Blob !== 'undefined') {
  BlobBuilderConstructor.prototype = Blob.prototype;
  BlobConstructor.prototype = Blob.prototype;
}

module.exports = (function() {
  if (blobSupported) {
    return blobSupportsArrayBufferView ? Blob : BlobConstructor;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return undefined;
  }
})();


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(52);

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* Active `debug` instances.
	*/
	createDebug.instances = [];

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return match;
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = selectColor(namespace);
		debug.destroy = destroy;
		debug.extend = extend;
		// Debug.formatArgs = formatArgs;
		// debug.rawLog = rawLog;

		// env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		createDebug.instances.push(debug);

		return debug;
	}

	function destroy() {
		const index = createDebug.instances.indexOf(this);
		if (index !== -1) {
			createDebug.instances.splice(index, 1);
			return true;
		}
		return false;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}

		for (i = 0; i < createDebug.instances.length; i++) {
			const instance = createDebug.instances[i];
			instance.enabled = createDebug.enabled(instance.namespace);
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),
/* 52 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module requirements.
 */

var Polling = __webpack_require__(17);
var inherit = __webpack_require__(6);

/**
 * Module exports.
 */

module.exports = JSONPPolling;

/**
 * Cached regular expressions.
 */

var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

var callbacks;

/**
 * Noop.
 */

function empty () { }

/**
 * Until https://github.com/tc39/proposal-global is shipped.
 */
function glob () {
  return typeof self !== 'undefined' ? self
      : typeof window !== 'undefined' ? window
      : typeof global !== 'undefined' ? global : {};
}

/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */

function JSONPPolling (opts) {
  Polling.call(this, opts);

  this.query = this.query || {};

  // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution
  if (!callbacks) {
    // we need to consider multiple engines in the same page
    var global = glob();
    callbacks = global.___eio = (global.___eio || []);
  }

  // callback identifier
  this.index = callbacks.length;

  // add callback to jsonp global
  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  });

  // append to query string
  this.query.j = this.index;

  // prevent spurious errors from being emitted when the window is unloaded
  if (typeof addEventListener === 'function') {
    addEventListener('beforeunload', function () {
      if (self.script) self.script.onerror = empty;
    }, false);
  }
}

/**
 * Inherits from Polling.
 */

inherit(JSONPPolling, Polling);

/*
 * JSONP only supports binary as base64 encoded strings
 */

JSONPPolling.prototype.supportsBinary = false;

/**
 * Closes the socket.
 *
 * @api private
 */

JSONPPolling.prototype.doClose = function () {
  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  if (this.form) {
    this.form.parentNode.removeChild(this.form);
    this.form = null;
    this.iframe = null;
  }

  Polling.prototype.doClose.call(this);
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

JSONPPolling.prototype.doPoll = function () {
  var self = this;
  var script = document.createElement('script');

  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  script.async = true;
  script.src = this.uri();
  script.onerror = function (e) {
    self.onError('jsonp poll error', e);
  };

  var insertAt = document.getElementsByTagName('script')[0];
  if (insertAt) {
    insertAt.parentNode.insertBefore(script, insertAt);
  } else {
    (document.head || document.body).appendChild(script);
  }
  this.script = script;

  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

  if (isUAgecko) {
    setTimeout(function () {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      document.body.removeChild(iframe);
    }, 100);
  }
};

/**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data, fn) {
  var self = this;

  if (!this.form) {
    var form = document.createElement('form');
    var area = document.createElement('textarea');
    var id = this.iframeId = 'eio_iframe_' + this.index;
    var iframe;

    form.className = 'socketio';
    form.style.position = 'absolute';
    form.style.top = '-1000px';
    form.style.left = '-1000px';
    form.target = id;
    form.method = 'POST';
    form.setAttribute('accept-charset', 'utf-8');
    area.name = 'd';
    form.appendChild(area);
    document.body.appendChild(form);

    this.form = form;
    this.area = area;
  }

  this.form.action = this.uri();

  function complete () {
    initIframe();
    fn();
  }

  function initIframe () {
    if (self.iframe) {
      try {
        self.form.removeChild(self.iframe);
      } catch (e) {
        self.onError('jsonp polling iframe removal error', e);
      }
    }

    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
      iframe = document.createElement(html);
    } catch (e) {
      iframe = document.createElement('iframe');
      iframe.name = self.iframeId;
      iframe.src = 'javascript:0';
    }

    iframe.id = self.iframeId;

    self.form.appendChild(iframe);
    self.iframe = iframe;
  }

  initIframe();

  // escape \n to prevent it from being converted into \r\n by some UAs
  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
  data = data.replace(rEscapedNewline, '\\\n');
  this.area.value = data.replace(rNewline, '\\n');

  try {
    this.form.submit();
  } catch (e) {}

  if (this.iframe.attachEvent) {
    this.iframe.onreadystatechange = function () {
      if (self.iframe.readyState === 'complete') {
        complete();
      }
    };
  } else {
    this.iframe.onload = complete;
  }
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/**
 * Module dependencies.
 */

var Transport = __webpack_require__(11);
var parser = __webpack_require__(1);
var parseqs = __webpack_require__(5);
var inherit = __webpack_require__(6);
var yeast = __webpack_require__(19);
var debug = __webpack_require__(7)('engine.io-client:websocket');

var BrowserWebSocket, NodeWebSocket;

if (typeof WebSocket !== 'undefined') {
  BrowserWebSocket = WebSocket;
} else if (typeof self !== 'undefined') {
  BrowserWebSocket = self.WebSocket || self.MozWebSocket;
}

if (typeof window === 'undefined') {
  try {
    NodeWebSocket = __webpack_require__(55);
  } catch (e) { }
}

/**
 * Get either the `WebSocket` or `MozWebSocket` globals
 * in the browser or try to resolve WebSocket-compatible
 * interface exposed by `ws` for Node-like environment.
 */

var WebSocketImpl = BrowserWebSocket || NodeWebSocket;

/**
 * Module exports.
 */

module.exports = WS;

/**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */

function WS (opts) {
  var forceBase64 = (opts && opts.forceBase64);
  if (forceBase64) {
    this.supportsBinary = false;
  }
  this.perMessageDeflate = opts.perMessageDeflate;
  this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
  this.protocols = opts.protocols;
  if (!this.usingBrowserWebSocket) {
    WebSocketImpl = NodeWebSocket;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(WS, Transport);

/**
 * Transport name.
 *
 * @api public
 */

WS.prototype.name = 'websocket';

/*
 * WebSockets support binary
 */

WS.prototype.supportsBinary = true;

/**
 * Opens socket.
 *
 * @api private
 */

WS.prototype.doOpen = function () {
  if (!this.check()) {
    // let probe timeout
    return;
  }

  var uri = this.uri();
  var protocols = this.protocols;
  var opts = {
    agent: this.agent,
    perMessageDeflate: this.perMessageDeflate
  };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  if (this.extraHeaders) {
    opts.headers = this.extraHeaders;
  }
  if (this.localAddress) {
    opts.localAddress = this.localAddress;
  }

  try {
    this.ws =
      this.usingBrowserWebSocket && !this.isReactNative
        ? protocols
          ? new WebSocketImpl(uri, protocols)
          : new WebSocketImpl(uri)
        : new WebSocketImpl(uri, protocols, opts);
  } catch (err) {
    return this.emit('error', err);
  }

  if (this.ws.binaryType === undefined) {
    this.supportsBinary = false;
  }

  if (this.ws.supports && this.ws.supports.binary) {
    this.supportsBinary = true;
    this.ws.binaryType = 'nodebuffer';
  } else {
    this.ws.binaryType = 'arraybuffer';
  }

  this.addEventListeners();
};

/**
 * Adds event listeners to the socket
 *
 * @api private
 */

WS.prototype.addEventListeners = function () {
  var self = this;

  this.ws.onopen = function () {
    self.onOpen();
  };
  this.ws.onclose = function () {
    self.onClose();
  };
  this.ws.onmessage = function (ev) {
    self.onData(ev.data);
  };
  this.ws.onerror = function (e) {
    self.onError('websocket error', e);
  };
};

/**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */

WS.prototype.write = function (packets) {
  var self = this;
  this.writable = false;

  // encodePacket efficient as it uses WS framing
  // no need for encodePayload
  var total = packets.length;
  for (var i = 0, l = total; i < l; i++) {
    (function (packet) {
      parser.encodePacket(packet, self.supportsBinary, function (data) {
        if (!self.usingBrowserWebSocket) {
          // always create a new object (GH-437)
          var opts = {};
          if (packet.options) {
            opts.compress = packet.options.compress;
          }

          if (self.perMessageDeflate) {
            var len = 'string' === typeof data ? Buffer.byteLength(data) : data.length;
            if (len < self.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }

        // Sometimes the websocket has already been closed but the browser didn't
        // have a chance of informing us about it yet, in that case send will
        // throw an error
        try {
          if (self.usingBrowserWebSocket) {
            // TypeError is thrown when passing the second argument on Safari
            self.ws.send(data);
          } else {
            self.ws.send(data, opts);
          }
        } catch (e) {
          debug('websocket closed before onclose event');
        }

        --total || done();
      });
    })(packets[i]);
  }

  function done () {
    self.emit('flush');

    // fake drain
    // defer to next tick to allow Socket to clear writeBuffer
    setTimeout(function () {
      self.writable = true;
      self.emit('drain');
    }, 0);
  }
};

/**
 * Called upon close
 *
 * @api private
 */

WS.prototype.onClose = function () {
  Transport.prototype.onClose.call(this);
};

/**
 * Closes socket.
 *
 * @api private
 */

WS.prototype.doClose = function () {
  if (typeof this.ws !== 'undefined') {
    this.ws.close();
  }
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

WS.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'wss' : 'ws';
  var port = '';

  // avoid port if default for schema
  if (this.port && (('wss' === schema && Number(this.port) !== 443) ||
    ('ws' === schema && Number(this.port) !== 80))) {
    port = ':' + this.port;
  }

  // append timestamp to URI
  if (this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  // communicate binary support capabilities
  if (!this.supportsBinary) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */

WS.prototype.check = function () {
  return !!WebSocketImpl && !('__initialize' in WebSocketImpl && this.name === WS.prototype.name);
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).Buffer))

/***/ }),
/* 55 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = toArray

function toArray(list, index) {
    var array = []

    index = index || 0

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i]
    }

    return array
}


/***/ }),
/* 57 */
/***/ (function(module, exports) {


/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};



/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {var require;var require;(function (f) {
    if (true) {
        module.exports = f();
    }
    else if (typeof define === "function" && define.amd) {
        define([], f);
    }
    else {
        var g;
        if (typeof window !== "undefined") {
            g = window;
        }
        else if (typeof global !== "undefined") {
            g = global;
        }
        else if (typeof self !== "undefined") {
            g = self;
        }
        else {
            g = this;
        }
        g.ss = f();
    }
})(function () {
    var define, module, exports;
    return (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a)
                        return require(o, !0);
                    if (i)
                        return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f;
                }
                var l = n[o] = { exports: {} };
                t[o][0].call(l.exports, function (e) { var n = t[o][1][e]; return s(n ? n : e); }, l, l.exports, e, t, n, r);
            }
            return n[o].exports;
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++)
            s(r[o]);
        return s;
    })({ 1: [function (require, module, exports) {
                module.exports = require('./lib');
            }, { "./lib": 3 }], 2: [function (require, module, exports) {
                (function (Buffer) {
                    var util = require('util');
                    var Readable = require('stream').Readable;
                    var bind = require('component-bind');
                    module.exports = BlobReadStream;
                    util.inherits(BlobReadStream, Readable);
                    /**
                     * Readable stream for Blob and File on browser.
                     *
                     * @param {Object} options
                     * @api private
                     */
                    function BlobReadStream(blob, options) {
                        if (!(this instanceof BlobReadStream)) {
                            return new BlobReadStream(blob, options);
                        }
                        Readable.call(this, options);
                        options = options || {};
                        this.blob = blob;
                        this.slice = blob.slice || blob.webkitSlice || blob.mozSlice;
                        this.start = 0;
                        this.sync = options.synchronous || false;
                        var fileReader;
                        if (options.synchronous) {
                            fileReader = this.fileReader = new FileReaderSync();
                        }
                        else {
                            fileReader = this.fileReader = new FileReader();
                        }
                        fileReader.onload = bind(this, '_onload');
                        fileReader.onerror = bind(this, '_onerror');
                    }
                    BlobReadStream.prototype._read = function (size) {
                        var start = this.start;
                        var end = this.start = this.start + size;
                        var chunk = this.slice.call(this.blob, start, end);
                        if (chunk.size) {
                            if (this.sync) {
                                var bufferChunk = new Buffer(new Uint8Array(this.fileReader.readAsArrayBuffer(chunk)));
                                this.push(bufferChunk);
                            }
                            else {
                                this.fileReader.readAsArrayBuffer(chunk);
                            }
                        }
                        else {
                            this.push(null);
                        }
                    };
                    BlobReadStream.prototype._onload = function (e) {
                        var chunk = new Buffer(new Uint8Array(e.target.result));
                        this.push(chunk);
                    };
                    BlobReadStream.prototype._onerror = function (e) {
                        var err = e.target.error;
                        this.emit('error', err);
                    };
                }).call(this, require("buffer").Buffer);
            }, { "buffer": 11, "component-bind": 12, "stream": 35, "util": 40 }], 3: [function (require, module, exports) {
                (function (Buffer) {
                    var Socket = require('./socket');
                    var IOStream = require('./iostream');
                    var BlobReadStream = require('./blob-read-stream');
                    exports = module.exports = lookup;
                    /**
                     * Expose Node Buffer for browser.
                     *
                     * @api public
                     */
                    exports.Buffer = Buffer;
                    /**
                     * Expose Socket constructor.
                     *
                     * @api public
                     */
                    exports.Socket = Socket;
                    /**
                     * Expose IOStream constructor.
                     *
                     * @api public
                     */
                    exports.IOStream = IOStream;
                    /**
                     * Forces base 64 encoding when emitting. Must be set to true for Socket.IO v0.9 or lower.
                     *
                     * @api public
                     */
                    exports.forceBase64 = false;
                    /**
                     * Look up an existing Socket.
                     *
                     * @param {socket.io#Socket} socket.io
                     * @param {Object} options
                     * @return {Socket} Socket instance
                     * @api public
                     */
                    function lookup(sio, options) {
                        options = options || {};
                        if (null == options.forceBase64) {
                            options.forceBase64 = exports.forceBase64;
                        }
                        if (!sio._streamSocket) {
                            sio._streamSocket = new Socket(sio, options);
                        }
                        return sio._streamSocket;
                    }
                    /**
                     * Creates a new duplex stream.
                     *
                     * @param {Object} options
                     * @return {IOStream} duplex stream
                     * @api public
                     */
                    exports.createStream = function (options) {
                        return new IOStream(options);
                    };
                    /**
                     * Creates a new readable stream for Blob/File on browser.
                     *
                     * @param {Blob} blob
                     * @param {Object} options
                     * @return {BlobReadStream} stream
                     * @api public
                     */
                    exports.createBlobReadStream = function (blob, options) {
                        return new BlobReadStream(blob, options);
                    };
                }).call(this, require("buffer").Buffer);
            }, { "./blob-read-stream": 2, "./iostream": 4, "./socket": 6, "buffer": 11 }], 4: [function (require, module, exports) {
                var util = require('util');
                var Duplex = require('stream').Duplex;
                var bind = require('component-bind');
                var uuid = require('./uuid');
                var debug = require('debug')('socket.io-stream:iostream');
                module.exports = IOStream;
                util.inherits(IOStream, Duplex);
                /**
                 * Duplex
                 *
                 * @param {Object} options
                 * @api private
                 */
                function IOStream(options) {
                    if (!(this instanceof IOStream)) {
                        return new IOStream(options);
                    }
                    IOStream.super_.call(this, options);
                    this.options = options;
                    this.id = uuid();
                    this.socket = null;
                    // Buffers
                    this.pushBuffer = [];
                    this.writeBuffer = [];
                    // Op states
                    this._readable = false;
                    this._writable = false;
                    this.destroyed = false;
                    // default to *not* allowing half open sockets
                    this.allowHalfOpen = options && options.allowHalfOpen || false;
                    this.on('finish', this._onfinish);
                    this.on('end', this._onend);
                    this.on('error', this._onerror);
                }
                /**
                 * Ensures that no more I/O activity happens on this stream.
                 * Not necessary in the usual case.
                 *
                 * @api public
                 */
                IOStream.prototype.destroy = function () {
                    debug('destroy');
                    if (this.destroyed) {
                        debug('already destroyed');
                        return;
                    }
                    this.readable = this.writable = false;
                    if (this.socket) {
                        debug('clean up');
                        this.socket.cleanup(this.id);
                        this.socket = null;
                    }
                    this.destroyed = true;
                };
                /**
                 * Local read
                 *
                 * @api private
                 */
                IOStream.prototype._read = function (size) {
                    var push;
                    // We can not read from the socket if it's destroyed obviously ...
                    if (this.destroyed)
                        return;
                    if (this.pushBuffer.length) {
                        // flush buffer and end if it exists.
                        while (push = this.pushBuffer.shift()) {
                            if (!push())
                                break;
                        }
                        return;
                    }
                    this._readable = true;
                    // Go get data from remote stream
                    // Calls
                    // ._onread remotely
                    // then
                    // ._onwrite locally
                    this.socket._read(this.id, size);
                };
                /**
                 * Read from remote stream
                 *
                 * @api private
                 */
                IOStream.prototype._onread = function (size) {
                    var write = this.writeBuffer.shift();
                    if (write)
                        return write();
                    this._writable = true;
                };
                /**
                 * Write local data to remote stream
                 * Calls
                 * remtote ._onwrite
                 *
                 * @api private
                 */
                IOStream.prototype._write = function (chunk, encoding, callback) {
                    var self = this;
                    function write() {
                        // We can not write to the socket if it's destroyed obviously ...
                        if (self.destroyed)
                            return;
                        self._writable = false;
                        self.socket._write(self.id, chunk, encoding, callback);
                    }
                    if (this._writable) {
                        write();
                    }
                    else {
                        this.writeBuffer.push(write);
                    }
                };
                /**
                 * Write the data fetched remotely
                 * so that we can now read locally
                 *
                 * @api private
                 */
                IOStream.prototype._onwrite = function (chunk, encoding, callback) {
                    var self = this;
                    function push() {
                        self._readable = false;
                        var ret = self.push(chunk || '', encoding);
                        callback();
                        return ret;
                    }
                    if (this._readable) {
                        push();
                    }
                    else {
                        this.pushBuffer.push(push);
                    }
                };
                /**
                 * When ending send 'end' event to remote stream
                 *
                 * @api private
                 */
                IOStream.prototype._end = function () {
                    if (this.pushBuffer.length) {
                        // end after flushing buffer.
                        this.pushBuffer.push(bind(this, '_done'));
                    }
                    else {
                        this._done();
                    }
                };
                /**
                 * Remote stream just ended
                 *
                 * @api private
                 */
                IOStream.prototype._done = function () {
                    this._readable = false;
                    // signal the end of the data.
                    return this.push(null);
                };
                /**
                 * the user has called .end(), and all the bytes have been
                 * sent out to the other side.
                 * If allowHalfOpen is false, or if the readable side has
                 * ended already, then destroy.
                 * If allowHalfOpen is true, then we need to set writable false,
                 * so that only the writable side will be cleaned up.
                 *
                 * @api private
                 */
                IOStream.prototype._onfinish = function () {
                    debug('_onfinish');
                    // Local socket just finished
                    // send 'end' event to remote
                    if (this.socket) {
                        this.socket._end(this.id);
                    }
                    this.writable = false;
                    this._writableState.ended = true;
                    if (!this.readable || this._readableState.ended) {
                        debug('_onfinish: ended, destroy %s', this._readableState);
                        return this.destroy();
                    }
                    debug('_onfinish: not ended');
                    if (!this.allowHalfOpen) {
                        this.push(null);
                        // just in case we're waiting for an EOF.
                        if (this.readable && !this._readableState.endEmitted) {
                            this.read(0);
                        }
                    }
                };
                /**
                 * the EOF has been received, and no more bytes are coming.
                 * if the writable side has ended already, then clean everything
                 * up.
                 *
                 * @api private
                 */
                IOStream.prototype._onend = function () {
                    debug('_onend');
                    this.readable = false;
                    this._readableState.ended = true;
                    if (!this.writable || this._writableState.finished) {
                        debug('_onend: %s', this._writableState);
                        return this.destroy();
                    }
                    debug('_onend: not finished');
                    if (!this.allowHalfOpen) {
                        this.end();
                    }
                };
                /**
                 * When error in local stream
                 * notyify remote
                 * if err.remote = true
                 * then error happened on remote stream
                 *
                 * @api private
                 */
                IOStream.prototype._onerror = function (err) {
                    // check if the error came from remote stream.
                    if (!err.remote && this.socket) {
                        // notify the error to the corresponding remote stream.
                        this.socket._error(this.id, err);
                    }
                    this.destroy();
                };
            }, { "./uuid": 7, "component-bind": 12, "debug": 14, "stream": 35, "util": 40 }], 5: [function (require, module, exports) {
                var util = require('util');
                var EventEmitter = require('events').EventEmitter;
                var IOStream = require('./iostream');
                var slice = Array.prototype.slice;
                exports.Encoder = Encoder;
                exports.Decoder = Decoder;
                util.inherits(Encoder, EventEmitter);
                function Encoder() {
                    EventEmitter.call(this);
                }
                /**
                 * Encode streams to placeholder objects.
                 *
                 * @api public
                 */
                Encoder.prototype.encode = function (v) {
                    if (v instanceof IOStream) {
                        return this.encodeStream(v);
                    }
                    else if (util.isArray(v)) {
                        return this.encodeArray(v);
                    }
                    else if (v && 'object' == typeof v) {
                        return this.encodeObject(v);
                    }
                    return v;
                };
                Encoder.prototype.encodeStream = function (stream) {
                    this.emit('stream', stream);
                    // represent a stream in an object.
                    var v = { $stream: stream.id };
                    if (stream.options) {
                        v.options = stream.options;
                    }
                    return v;
                };
                Encoder.prototype.encodeArray = function (arr) {
                    var v = [];
                    for (var i = 0, len = arr.length; i < len; i++) {
                        v.push(this.encode(arr[i]));
                    }
                    return v;
                };
                Encoder.prototype.encodeObject = function (obj) {
                    var v = {};
                    for (var k in obj) {
                        if (obj.hasOwnProperty(k)) {
                            v[k] = this.encode(obj[k]);
                        }
                    }
                    return v;
                };
                util.inherits(Decoder, EventEmitter);
                function Decoder() {
                    EventEmitter.call(this);
                }
                /**
                 * Decode placeholder objects to streams.
                 *
                 * @api public
                 */
                Decoder.prototype.decode = function (v) {
                    if (v && v.$stream) {
                        return this.decodeStream(v);
                    }
                    else if (util.isArray(v)) {
                        return this.decodeArray(v);
                    }
                    else if (v && 'object' == typeof v) {
                        return this.decodeObject(v);
                    }
                    return v;
                };
                Decoder.prototype.decodeStream = function (obj) {
                    var stream = new IOStream(obj.options);
                    stream.id = obj.$stream;
                    this.emit('stream', stream);
                    return stream;
                };
                Decoder.prototype.decodeArray = function (arr) {
                    var v = [];
                    for (var i = 0, len = arr.length; i < len; i++) {
                        v.push(this.decode(arr[i]));
                    }
                    return v;
                };
                Decoder.prototype.decodeObject = function (obj) {
                    var v = {};
                    for (var k in obj) {
                        if (obj.hasOwnProperty(k)) {
                            v[k] = this.decode(obj[k]);
                        }
                    }
                    return v;
                };
            }, { "./iostream": 4, "events": 16, "util": 40 }], 6: [function (require, module, exports) {
                (function (global, Buffer) {
                    var util = require('util');
                    var EventEmitter = require('events').EventEmitter;
                    var bind = require('component-bind');
                    var IOStream = require('./iostream');
                    var parser = require('./parser');
                    var debug = require('debug')('socket.io-stream:socket');
                    var emit = EventEmitter.prototype.emit;
                    var on = EventEmitter.prototype.on;
                    var slice = Array.prototype.slice;
                    exports = module.exports = Socket;
                    /**
                     * Base event name for messaging.
                     *
                     * @api public
                     */
                    exports.event = '$stream';
                    exports.events = [
                        'error',
                        'newListener',
                        'removeListener'
                    ];
                    util.inherits(Socket, EventEmitter);
                    /**
                     * Bidirectional stream socket which wraps Socket.IO.
                     *
                     * @param {socket.io#Socket} socket.io
                     * @api public
                     */
                    function Socket(sio, options) {
                        if (!(this instanceof Socket)) {
                            return new Socket(sio, options);
                        }
                        EventEmitter.call(this);
                        options = options || {};
                        this.sio = sio;
                        this.forceBase64 = !!options.forceBase64;
                        this.streams = {};
                        this.encoder = new parser.Encoder();
                        this.decoder = new parser.Decoder();
                        var eventName = exports.event;
                        sio.on(eventName, bind(this, emit));
                        sio.on(eventName + '-read', bind(this, '_onread'));
                        sio.on(eventName + '-write', bind(this, '_onwrite'));
                        sio.on(eventName + '-end', bind(this, '_onend'));
                        sio.on(eventName + '-error', bind(this, '_onerror'));
                        sio.on('error', bind(this, emit, 'error'));
                        sio.on('disconnect', bind(this, '_ondisconnect'));
                        this.encoder.on('stream', bind(this, '_onencode'));
                        this.decoder.on('stream', bind(this, '_ondecode'));
                    }
                    /**
                     * Original emit function.
                     *
                     * @api private
                     */
                    Socket.prototype.$emit = emit;
                    /**
                     * Emits streams to this corresponding server/client.
                     *
                     * @return {Socket} self
                     * @api public
                     */
                    Socket.prototype.emit = function (type) {
                        if (~exports.events.indexOf(type)) {
                            return emit.apply(this, arguments);
                        }
                        this._stream.apply(this, arguments);
                        return this;
                    };
                    Socket.prototype.on = function (type, listener) {
                        if (~exports.events.indexOf(type)) {
                            return on.apply(this, arguments);
                        }
                        this._onstream(type, listener);
                        return this;
                    };
                    /**
                     * Sends a new stream request.
                     *
                     * @param {String} event type
                     * @api private
                     */
                    Socket.prototype._stream = function (type) {
                        debug('sending new streams');
                        var self = this;
                        var args = slice.call(arguments, 1);
                        var ack = args[args.length - 1];
                        if ('function' == typeof ack) {
                            args[args.length - 1] = function () {
                                var args = slice.call(arguments);
                                args = self.decoder.decode(args);
                                ack.apply(this, args);
                            };
                        }
                        args = this.encoder.encode(args);
                        var sio = this.sio;
                        sio.emit.apply(sio, [exports.event, type].concat(args));
                    };
                    /**
                     * Notifies the read event.
                     *
                     * @api private
                     */
                    Socket.prototype._read = function (id, size) {
                        this.sio.emit(exports.event + '-read', id, size);
                    };
                    /**
                     * Requests to write a chunk.
                     *
                     * @api private
                     */
                    Socket.prototype._write = function (id, chunk, encoding, callback) {
                        if (Buffer.isBuffer(chunk)) {
                            if (this.forceBase64) {
                                encoding = 'base64';
                                chunk = chunk.toString(encoding);
                            }
                            else if (!global.Buffer) {
                                // socket.io can't handle Buffer when using browserify.
                                if (chunk.toArrayBuffer) {
                                    chunk = chunk.toArrayBuffer();
                                }
                                else {
                                    chunk = chunk.buffer;
                                }
                            }
                        }
                        this.sio.emit(exports.event + '-write', id, chunk, encoding, callback);
                    };
                    Socket.prototype._end = function (id) {
                        this.sio.emit(exports.event + '-end', id);
                    };
                    Socket.prototype._error = function (id, err) {
                        this.sio.emit(exports.event + '-error', id, err.message || err);
                    };
                    /**
                     * Handles a new stream request.
                     *
                     * @param {String} event type
                     * @param {Function} listener
                     *
                     * @api private
                     */
                    Socket.prototype._onstream = function (type, listener) {
                        if ('function' != typeof listener) {
                            throw TypeError('listener must be a function');
                        }
                        function onstream() {
                            debug('new streams');
                            var self = this;
                            var args = slice.call(arguments);
                            var ack = args[args.length - 1];
                            if ('function' == typeof ack) {
                                args[args.length - 1] = function () {
                                    var args = slice.call(arguments);
                                    args = self.encoder.encode(args);
                                    ack.apply(this, args);
                                };
                            }
                            args = this.decoder.decode(args);
                            listener.apply(this, args);
                        }
                        // for removeListener
                        onstream.listener = listener;
                        on.call(this, type, onstream);
                    };
                    Socket.prototype._onread = function (id, size) {
                        debug('read: "%s"', id);
                        var stream = this.streams[id];
                        if (stream) {
                            stream._onread(size);
                        }
                        else {
                            debug('ignore invalid stream id');
                        }
                    };
                    Socket.prototype._onwrite = function (id, chunk, encoding, callback) {
                        debug('write: "%s"', id);
                        var stream = this.streams[id];
                        if (!stream) {
                            callback('invalid stream id: ' + id);
                            return;
                        }
                        if (global.ArrayBuffer && chunk instanceof ArrayBuffer) {
                            // make sure that chunk is a buffer for stream
                            chunk = new Buffer(new Uint8Array(chunk));
                        }
                        stream._onwrite(chunk, encoding, callback);
                    };
                    Socket.prototype._onend = function (id) {
                        debug('end: "%s"', id);
                        var stream = this.streams[id];
                        if (!stream) {
                            debug('ignore non-existent stream id: "%s"', id);
                            return;
                        }
                        stream._end();
                    };
                    Socket.prototype._onerror = function (id, message) {
                        debug('error: "%s", "%s"', id, message);
                        var stream = this.streams[id];
                        if (!stream) {
                            debug('invalid stream id: "%s"', id);
                            return;
                        }
                        var err = new Error(message);
                        err.remote = true;
                        stream.emit('error', err);
                    };
                    Socket.prototype._ondisconnect = function () {
                        var stream;
                        for (var id in this.streams) {
                            stream = this.streams[id];
                            stream.destroy();
                            // Close streams when the underlaying
                            // socket.io connection is closed (regardless why)
                            stream.emit('close');
                            stream.emit('error', new Error('Connection aborted'));
                        }
                    };
                    Socket.prototype._onencode = function (stream) {
                        if (stream.socket || stream.destroyed) {
                            throw new Error('stream has already been sent.');
                        }
                        var id = stream.id;
                        if (this.streams[id]) {
                            throw new Error('Encoded stream already exists: ' + id);
                        }
                        this.streams[id] = stream;
                        stream.socket = this;
                    };
                    Socket.prototype._ondecode = function (stream) {
                        var id = stream.id;
                        if (this.streams[id]) {
                            this._error(id, new Error('Decoded stream already exists: ' + id));
                            return;
                        }
                        this.streams[id] = stream;
                        stream.socket = this;
                    };
                    Socket.prototype.cleanup = function (id) {
                        delete this.streams[id];
                    };
                }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer);
            }, { "./iostream": 4, "./parser": 5, "buffer": 11, "component-bind": 12, "debug": 14, "events": 16, "util": 40 }], 7: [function (require, module, exports) {
                // UUID function from https://gist.github.com/jed/982883
                // More lightweight than node-uuid
                function b(a // placeholder
                ) {
                    return a // if the placeholder was passed, return
                        ? (a ^ // unless b is 8,
                            Math.random() // in which case
                                * 16 // a random number from
                                >> a / 4 // 8 to 11
                        ).toString(16) // in hexadecimal
                        : ([1e7] + // 10000000 +
                            -1e3 + // -1000 +
                            -4e3 + // -4000 +
                            -8e3 + // -80000000 +
                            -1e11 // -100000000000,
                        ).replace(// replacing
                        /[018]/g, // zeroes, ones, and eights with
                        b // random hex digits
                        );
                }
                module.exports = b;
            }, {}], 8: [function (require, module, exports) {
                'use strict';
                exports.byteLength = byteLength;
                exports.toByteArray = toByteArray;
                exports.fromByteArray = fromByteArray;
                var lookup = [];
                var revLookup = [];
                var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
                var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                for (var i = 0, len = code.length; i < len; ++i) {
                    lookup[i] = code[i];
                    revLookup[code.charCodeAt(i)] = i;
                }
                revLookup['-'.charCodeAt(0)] = 62;
                revLookup['_'.charCodeAt(0)] = 63;
                function placeHoldersCount(b64) {
                    var len = b64.length;
                    if (len % 4 > 0) {
                        throw new Error('Invalid string. Length must be a multiple of 4');
                    }
                    // the number of equal signs (place holders)
                    // if there are two placeholders, than the two characters before it
                    // represent one byte
                    // if there is only one, then the three characters before it represent 2 bytes
                    // this is just a cheap hack to not do indexOf twice
                    return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;
                }
                function byteLength(b64) {
                    // base64 is 4/3 + up to two characters of the original data
                    return b64.length * 3 / 4 - placeHoldersCount(b64);
                }
                function toByteArray(b64) {
                    var i, j, l, tmp, placeHolders, arr;
                    var len = b64.length;
                    placeHolders = placeHoldersCount(b64);
                    arr = new Arr(len * 3 / 4 - placeHolders);
                    // if there are placeholders, only get up to the last complete 4 chars
                    l = placeHolders > 0 ? len - 4 : len;
                    var L = 0;
                    for (i = 0, j = 0; i < l; i += 4, j += 3) {
                        tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
                        arr[L++] = (tmp >> 16) & 0xFF;
                        arr[L++] = (tmp >> 8) & 0xFF;
                        arr[L++] = tmp & 0xFF;
                    }
                    if (placeHolders === 2) {
                        tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
                        arr[L++] = tmp & 0xFF;
                    }
                    else if (placeHolders === 1) {
                        tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
                        arr[L++] = (tmp >> 8) & 0xFF;
                        arr[L++] = tmp & 0xFF;
                    }
                    return arr;
                }
                function tripletToBase64(num) {
                    return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
                }
                function encodeChunk(uint8, start, end) {
                    var tmp;
                    var output = [];
                    for (var i = start; i < end; i += 3) {
                        tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
                        output.push(tripletToBase64(tmp));
                    }
                    return output.join('');
                }
                function fromByteArray(uint8) {
                    var tmp;
                    var len = uint8.length;
                    var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
                    var output = '';
                    var parts = [];
                    var maxChunkLength = 16383; // must be multiple of 3
                    // go through the array every three bytes, we'll deal with trailing stuff later
                    for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
                        parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
                    }
                    // pad the end with zeros, but make sure to not forget the extra bytes
                    if (extraBytes === 1) {
                        tmp = uint8[len - 1];
                        output += lookup[tmp >> 2];
                        output += lookup[(tmp << 4) & 0x3F];
                        output += '==';
                    }
                    else if (extraBytes === 2) {
                        tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
                        output += lookup[tmp >> 10];
                        output += lookup[(tmp >> 4) & 0x3F];
                        output += lookup[(tmp << 2) & 0x3F];
                        output += '=';
                    }
                    parts.push(output);
                    return parts.join('');
                }
            }, {}], 9: [function (require, module, exports) {
            }, {}], 10: [function (require, module, exports) {
                (function (global) {
                    'use strict';
                    var buffer = require('buffer');
                    var Buffer = buffer.Buffer;
                    var SlowBuffer = buffer.SlowBuffer;
                    var MAX_LEN = buffer.kMaxLength || 2147483647;
                    exports.alloc = function alloc(size, fill, encoding) {
                        if (typeof Buffer.alloc === 'function') {
                            return Buffer.alloc(size, fill, encoding);
                        }
                        if (typeof encoding === 'number') {
                            throw new TypeError('encoding must not be number');
                        }
                        if (typeof size !== 'number') {
                            throw new TypeError('size must be a number');
                        }
                        if (size > MAX_LEN) {
                            throw new RangeError('size is too large');
                        }
                        var enc = encoding;
                        var _fill = fill;
                        if (_fill === undefined) {
                            enc = undefined;
                            _fill = 0;
                        }
                        var buf = new Buffer(size);
                        if (typeof _fill === 'string') {
                            var fillBuf = new Buffer(_fill, enc);
                            var flen = fillBuf.length;
                            var i = -1;
                            while (++i < size) {
                                buf[i] = fillBuf[i % flen];
                            }
                        }
                        else {
                            buf.fill(_fill);
                        }
                        return buf;
                    };
                    exports.allocUnsafe = function allocUnsafe(size) {
                        if (typeof Buffer.allocUnsafe === 'function') {
                            return Buffer.allocUnsafe(size);
                        }
                        if (typeof size !== 'number') {
                            throw new TypeError('size must be a number');
                        }
                        if (size > MAX_LEN) {
                            throw new RangeError('size is too large');
                        }
                        return new Buffer(size);
                    };
                    exports.from = function from(value, encodingOrOffset, length) {
                        if (typeof Buffer.from === 'function' && (!global.Uint8Array || Uint8Array.from !== Buffer.from)) {
                            return Buffer.from(value, encodingOrOffset, length);
                        }
                        if (typeof value === 'number') {
                            throw new TypeError('"value" argument must not be a number');
                        }
                        if (typeof value === 'string') {
                            return new Buffer(value, encodingOrOffset);
                        }
                        if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
                            var offset = encodingOrOffset;
                            if (arguments.length === 1) {
                                return new Buffer(value);
                            }
                            if (typeof offset === 'undefined') {
                                offset = 0;
                            }
                            var len = length;
                            if (typeof len === 'undefined') {
                                len = value.byteLength - offset;
                            }
                            if (offset >= value.byteLength) {
                                throw new RangeError('\'offset\' is out of bounds');
                            }
                            if (len > value.byteLength - offset) {
                                throw new RangeError('\'length\' is out of bounds');
                            }
                            return new Buffer(value.slice(offset, offset + len));
                        }
                        if (Buffer.isBuffer(value)) {
                            var out = new Buffer(value.length);
                            value.copy(out, 0, 0, value.length);
                            return out;
                        }
                        if (value) {
                            if (Array.isArray(value) || (typeof ArrayBuffer !== 'undefined' && value.buffer instanceof ArrayBuffer) || 'length' in value) {
                                return new Buffer(value);
                            }
                            if (value.type === 'Buffer' && Array.isArray(value.data)) {
                                return new Buffer(value.data);
                            }
                        }
                        throw new TypeError('First argument must be a string, Buffer, ' + 'ArrayBuffer, Array, or array-like object.');
                    };
                    exports.allocUnsafeSlow = function allocUnsafeSlow(size) {
                        if (typeof Buffer.allocUnsafeSlow === 'function') {
                            return Buffer.allocUnsafeSlow(size);
                        }
                        if (typeof size !== 'number') {
                            throw new TypeError('size must be a number');
                        }
                        if (size >= MAX_LEN) {
                            throw new RangeError('size is too large');
                        }
                        return new SlowBuffer(size);
                    };
                }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
            }, { "buffer": 11 }], 11: [function (require, module, exports) {
                (function (global) {
                    /*!
                     * The buffer module from node.js, for the browser.
                     *
                     * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
                     * @license  MIT
                     */
                    /* eslint-disable no-proto */
                    'use strict';
                    var base64 = require('base64-js');
                    var ieee754 = require('ieee754');
                    var isArray = require('isarray');
                    exports.Buffer = Buffer;
                    exports.SlowBuffer = SlowBuffer;
                    exports.INSPECT_MAX_BYTES = 50;
                    /**
                     * If `Buffer.TYPED_ARRAY_SUPPORT`:
                     *   === true    Use Uint8Array implementation (fastest)
                     *   === false   Use Object implementation (most compatible, even IE6)
                     *
                     * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
                     * Opera 11.6+, iOS 4.2+.
                     *
                     * Due to various browser bugs, sometimes the Object implementation will be used even
                     * when the browser supports typed arrays.
                     *
                     * Note:
                     *
                     *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
                     *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
                     *
                     *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
                     *
                     *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
                     *     incorrect length in some situations.
                    
                     * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
                     * get the Object implementation, which is slower but behaves correctly.
                     */
                    Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
                        ? global.TYPED_ARRAY_SUPPORT
                        : typedArraySupport();
                    /*
                     * Export kMaxLength after typed array support is determined.
                     */
                    exports.kMaxLength = kMaxLength();
                    function typedArraySupport() {
                        try {
                            var arr = new Uint8Array(1);
                            arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42; } };
                            return arr.foo() === 42 && // typed array instances can be augmented
                                typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
                                arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
                        }
                        catch (e) {
                            return false;
                        }
                    }
                    function kMaxLength() {
                        return Buffer.TYPED_ARRAY_SUPPORT
                            ? 0x7fffffff
                            : 0x3fffffff;
                    }
                    function createBuffer(that, length) {
                        if (kMaxLength() < length) {
                            throw new RangeError('Invalid typed array length');
                        }
                        if (Buffer.TYPED_ARRAY_SUPPORT) {
                            // Return an augmented `Uint8Array` instance, for best performance
                            that = new Uint8Array(length);
                            that.__proto__ = Buffer.prototype;
                        }
                        else {
                            // Fallback: Return an object instance of the Buffer class
                            if (that === null) {
                                that = new Buffer(length);
                            }
                            that.length = length;
                        }
                        return that;
                    }
                    /**
                     * The Buffer constructor returns instances of `Uint8Array` that have their
                     * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
                     * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
                     * and the `Uint8Array` methods. Square bracket notation works as expected -- it
                     * returns a single octet.
                     *
                     * The `Uint8Array` prototype remains unmodified.
                     */
                    function Buffer(arg, encodingOrOffset, length) {
                        if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
                            return new Buffer(arg, encodingOrOffset, length);
                        }
                        // Common case.
                        if (typeof arg === 'number') {
                            if (typeof encodingOrOffset === 'string') {
                                throw new Error('If encoding is specified then the first argument must be a string');
                            }
                            return allocUnsafe(this, arg);
                        }
                        return from(this, arg, encodingOrOffset, length);
                    }
                    Buffer.poolSize = 8192; // not used by this implementation
                    // TODO: Legacy, not needed anymore. Remove in next major version.
                    Buffer._augment = function (arr) {
                        arr.__proto__ = Buffer.prototype;
                        return arr;
                    };
                    function from(that, value, encodingOrOffset, length) {
                        if (typeof value === 'number') {
                            throw new TypeError('"value" argument must not be a number');
                        }
                        if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
                            return fromArrayBuffer(that, value, encodingOrOffset, length);
                        }
                        if (typeof value === 'string') {
                            return fromString(that, value, encodingOrOffset);
                        }
                        return fromObject(that, value);
                    }
                    /**
                     * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
                     * if value is a number.
                     * Buffer.from(str[, encoding])
                     * Buffer.from(array)
                     * Buffer.from(buffer)
                     * Buffer.from(arrayBuffer[, byteOffset[, length]])
                     **/
                    Buffer.from = function (value, encodingOrOffset, length) {
                        return from(null, value, encodingOrOffset, length);
                    };
                    if (Buffer.TYPED_ARRAY_SUPPORT) {
                        Buffer.prototype.__proto__ = Uint8Array.prototype;
                        Buffer.__proto__ = Uint8Array;
                        if (typeof Symbol !== 'undefined' && Symbol.species &&
                            Buffer[Symbol.species] === Buffer) {
                            // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
                            Object.defineProperty(Buffer, Symbol.species, {
                                value: null,
                                configurable: true
                            });
                        }
                    }
                    function assertSize(size) {
                        if (typeof size !== 'number') {
                            throw new TypeError('"size" argument must be a number');
                        }
                        else if (size < 0) {
                            throw new RangeError('"size" argument must not be negative');
                        }
                    }
                    function alloc(that, size, fill, encoding) {
                        assertSize(size);
                        if (size <= 0) {
                            return createBuffer(that, size);
                        }
                        if (fill !== undefined) {
                            // Only pay attention to encoding if it's a string. This
                            // prevents accidentally sending in a number that would
                            // be interpretted as a start offset.
                            return typeof encoding === 'string'
                                ? createBuffer(that, size).fill(fill, encoding)
                                : createBuffer(that, size).fill(fill);
                        }
                        return createBuffer(that, size);
                    }
                    /**
                     * Creates a new filled Buffer instance.
                     * alloc(size[, fill[, encoding]])
                     **/
                    Buffer.alloc = function (size, fill, encoding) {
                        return alloc(null, size, fill, encoding);
                    };
                    function allocUnsafe(that, size) {
                        assertSize(size);
                        that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
                        if (!Buffer.TYPED_ARRAY_SUPPORT) {
                            for (var i = 0; i < size; ++i) {
                                that[i] = 0;
                            }
                        }
                        return that;
                    }
                    /**
                     * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
                     * */
                    Buffer.allocUnsafe = function (size) {
                        return allocUnsafe(null, size);
                    };
                    /**
                     * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
                     */
                    Buffer.allocUnsafeSlow = function (size) {
                        return allocUnsafe(null, size);
                    };
                    function fromString(that, string, encoding) {
                        if (typeof encoding !== 'string' || encoding === '') {
                            encoding = 'utf8';
                        }
                        if (!Buffer.isEncoding(encoding)) {
                            throw new TypeError('"encoding" must be a valid string encoding');
                        }
                        var length = byteLength(string, encoding) | 0;
                        that = createBuffer(that, length);
                        var actual = that.write(string, encoding);
                        if (actual !== length) {
                            // Writing a hex string, for example, that contains invalid characters will
                            // cause everything after the first invalid character to be ignored. (e.g.
                            // 'abxxcd' will be treated as 'ab')
                            that = that.slice(0, actual);
                        }
                        return that;
                    }
                    function fromArrayLike(that, array) {
                        var length = array.length < 0 ? 0 : checked(array.length) | 0;
                        that = createBuffer(that, length);
                        for (var i = 0; i < length; i += 1) {
                            that[i] = array[i] & 255;
                        }
                        return that;
                    }
                    function fromArrayBuffer(that, array, byteOffset, length) {
                        array.byteLength; // this throws if `array` is not a valid ArrayBuffer
                        if (byteOffset < 0 || array.byteLength < byteOffset) {
                            throw new RangeError('\'offset\' is out of bounds');
                        }
                        if (array.byteLength < byteOffset + (length || 0)) {
                            throw new RangeError('\'length\' is out of bounds');
                        }
                        if (byteOffset === undefined && length === undefined) {
                            array = new Uint8Array(array);
                        }
                        else if (length === undefined) {
                            array = new Uint8Array(array, byteOffset);
                        }
                        else {
                            array = new Uint8Array(array, byteOffset, length);
                        }
                        if (Buffer.TYPED_ARRAY_SUPPORT) {
                            // Return an augmented `Uint8Array` instance, for best performance
                            that = array;
                            that.__proto__ = Buffer.prototype;
                        }
                        else {
                            // Fallback: Return an object instance of the Buffer class
                            that = fromArrayLike(that, array);
                        }
                        return that;
                    }
                    function fromObject(that, obj) {
                        if (Buffer.isBuffer(obj)) {
                            var len = checked(obj.length) | 0;
                            that = createBuffer(that, len);
                            if (that.length === 0) {
                                return that;
                            }
                            obj.copy(that, 0, 0, len);
                            return that;
                        }
                        if (obj) {
                            if ((typeof ArrayBuffer !== 'undefined' &&
                                obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
                                if (typeof obj.length !== 'number' || isnan(obj.length)) {
                                    return createBuffer(that, 0);
                                }
                                return fromArrayLike(that, obj);
                            }
                            if (obj.type === 'Buffer' && isArray(obj.data)) {
                                return fromArrayLike(that, obj.data);
                            }
                        }
                        throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
                    }
                    function checked(length) {
                        // Note: cannot use `length < kMaxLength()` here because that fails when
                        // length is NaN (which is otherwise coerced to zero.)
                        if (length >= kMaxLength()) {
                            throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                                'size: 0x' + kMaxLength().toString(16) + ' bytes');
                        }
                        return length | 0;
                    }
                    function SlowBuffer(length) {
                        if (+length != length) {
                            length = 0;
                        }
                        return Buffer.alloc(+length);
                    }
                    Buffer.isBuffer = function isBuffer(b) {
                        return !!(b != null && b._isBuffer);
                    };
                    Buffer.compare = function compare(a, b) {
                        if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
                            throw new TypeError('Arguments must be Buffers');
                        }
                        if (a === b)
                            return 0;
                        var x = a.length;
                        var y = b.length;
                        for (var i = 0, len = Math.min(x, y); i < len; ++i) {
                            if (a[i] !== b[i]) {
                                x = a[i];
                                y = b[i];
                                break;
                            }
                        }
                        if (x < y)
                            return -1;
                        if (y < x)
                            return 1;
                        return 0;
                    };
                    Buffer.isEncoding = function isEncoding(encoding) {
                        switch (String(encoding).toLowerCase()) {
                            case 'hex':
                            case 'utf8':
                            case 'utf-8':
                            case 'ascii':
                            case 'latin1':
                            case 'binary':
                            case 'base64':
                            case 'ucs2':
                            case 'ucs-2':
                            case 'utf16le':
                            case 'utf-16le':
                                return true;
                            default:
                                return false;
                        }
                    };
                    Buffer.concat = function concat(list, length) {
                        if (!isArray(list)) {
                            throw new TypeError('"list" argument must be an Array of Buffers');
                        }
                        if (list.length === 0) {
                            return Buffer.alloc(0);
                        }
                        var i;
                        if (length === undefined) {
                            length = 0;
                            for (i = 0; i < list.length; ++i) {
                                length += list[i].length;
                            }
                        }
                        var buffer = Buffer.allocUnsafe(length);
                        var pos = 0;
                        for (i = 0; i < list.length; ++i) {
                            var buf = list[i];
                            if (!Buffer.isBuffer(buf)) {
                                throw new TypeError('"list" argument must be an Array of Buffers');
                            }
                            buf.copy(buffer, pos);
                            pos += buf.length;
                        }
                        return buffer;
                    };
                    function byteLength(string, encoding) {
                        if (Buffer.isBuffer(string)) {
                            return string.length;
                        }
                        if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
                            (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
                            return string.byteLength;
                        }
                        if (typeof string !== 'string') {
                            string = '' + string;
                        }
                        var len = string.length;
                        if (len === 0)
                            return 0;
                        // Use a for loop to avoid recursion
                        var loweredCase = false;
                        for (;;) {
                            switch (encoding) {
                                case 'ascii':
                                case 'latin1':
                                case 'binary':
                                    return len;
                                case 'utf8':
                                case 'utf-8':
                                case undefined:
                                    return utf8ToBytes(string).length;
                                case 'ucs2':
                                case 'ucs-2':
                                case 'utf16le':
                                case 'utf-16le':
                                    return len * 2;
                                case 'hex':
                                    return len >>> 1;
                                case 'base64':
                                    return base64ToBytes(string).length;
                                default:
                                    if (loweredCase)
                                        return utf8ToBytes(string).length; // assume utf8
                                    encoding = ('' + encoding).toLowerCase();
                                    loweredCase = true;
                            }
                        }
                    }
                    Buffer.byteLength = byteLength;
                    function slowToString(encoding, start, end) {
                        var loweredCase = false;
                        // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
                        // property of a typed array.
                        // This behaves neither like String nor Uint8Array in that we set start/end
                        // to their upper/lower bounds if the value passed is out of range.
                        // undefined is handled specially as per ECMA-262 6th Edition,
                        // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
                        if (start === undefined || start < 0) {
                            start = 0;
                        }
                        // Return early if start > this.length. Done here to prevent potential uint32
                        // coercion fail below.
                        if (start > this.length) {
                            return '';
                        }
                        if (end === undefined || end > this.length) {
                            end = this.length;
                        }
                        if (end <= 0) {
                            return '';
                        }
                        // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
                        end >>>= 0;
                        start >>>= 0;
                        if (end <= start) {
                            return '';
                        }
                        if (!encoding)
                            encoding = 'utf8';
                        while (true) {
                            switch (encoding) {
                                case 'hex':
                                    return hexSlice(this, start, end);
                                case 'utf8':
                                case 'utf-8':
                                    return utf8Slice(this, start, end);
                                case 'ascii':
                                    return asciiSlice(this, start, end);
                                case 'latin1':
                                case 'binary':
                                    return latin1Slice(this, start, end);
                                case 'base64':
                                    return base64Slice(this, start, end);
                                case 'ucs2':
                                case 'ucs-2':
                                case 'utf16le':
                                case 'utf-16le':
                                    return utf16leSlice(this, start, end);
                                default:
                                    if (loweredCase)
                                        throw new TypeError('Unknown encoding: ' + encoding);
                                    encoding = (encoding + '').toLowerCase();
                                    loweredCase = true;
                            }
                        }
                    }
                    // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
                    // Buffer instances.
                    Buffer.prototype._isBuffer = true;
                    function swap(b, n, m) {
                        var i = b[n];
                        b[n] = b[m];
                        b[m] = i;
                    }
                    Buffer.prototype.swap16 = function swap16() {
                        var len = this.length;
                        if (len % 2 !== 0) {
                            throw new RangeError('Buffer size must be a multiple of 16-bits');
                        }
                        for (var i = 0; i < len; i += 2) {
                            swap(this, i, i + 1);
                        }
                        return this;
                    };
                    Buffer.prototype.swap32 = function swap32() {
                        var len = this.length;
                        if (len % 4 !== 0) {
                            throw new RangeError('Buffer size must be a multiple of 32-bits');
                        }
                        for (var i = 0; i < len; i += 4) {
                            swap(this, i, i + 3);
                            swap(this, i + 1, i + 2);
                        }
                        return this;
                    };
                    Buffer.prototype.swap64 = function swap64() {
                        var len = this.length;
                        if (len % 8 !== 0) {
                            throw new RangeError('Buffer size must be a multiple of 64-bits');
                        }
                        for (var i = 0; i < len; i += 8) {
                            swap(this, i, i + 7);
                            swap(this, i + 1, i + 6);
                            swap(this, i + 2, i + 5);
                            swap(this, i + 3, i + 4);
                        }
                        return this;
                    };
                    Buffer.prototype.toString = function toString() {
                        var length = this.length | 0;
                        if (length === 0)
                            return '';
                        if (arguments.length === 0)
                            return utf8Slice(this, 0, length);
                        return slowToString.apply(this, arguments);
                    };
                    Buffer.prototype.equals = function equals(b) {
                        if (!Buffer.isBuffer(b))
                            throw new TypeError('Argument must be a Buffer');
                        if (this === b)
                            return true;
                        return Buffer.compare(this, b) === 0;
                    };
                    Buffer.prototype.inspect = function inspect() {
                        var str = '';
                        var max = exports.INSPECT_MAX_BYTES;
                        if (this.length > 0) {
                            str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
                            if (this.length > max)
                                str += ' ... ';
                        }
                        return '<Buffer ' + str + '>';
                    };
                    Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
                        if (!Buffer.isBuffer(target)) {
                            throw new TypeError('Argument must be a Buffer');
                        }
                        if (start === undefined) {
                            start = 0;
                        }
                        if (end === undefined) {
                            end = target ? target.length : 0;
                        }
                        if (thisStart === undefined) {
                            thisStart = 0;
                        }
                        if (thisEnd === undefined) {
                            thisEnd = this.length;
                        }
                        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
                            throw new RangeError('out of range index');
                        }
                        if (thisStart >= thisEnd && start >= end) {
                            return 0;
                        }
                        if (thisStart >= thisEnd) {
                            return -1;
                        }
                        if (start >= end) {
                            return 1;
                        }
                        start >>>= 0;
                        end >>>= 0;
                        thisStart >>>= 0;
                        thisEnd >>>= 0;
                        if (this === target)
                            return 0;
                        var x = thisEnd - thisStart;
                        var y = end - start;
                        var len = Math.min(x, y);
                        var thisCopy = this.slice(thisStart, thisEnd);
                        var targetCopy = target.slice(start, end);
                        for (var i = 0; i < len; ++i) {
                            if (thisCopy[i] !== targetCopy[i]) {
                                x = thisCopy[i];
                                y = targetCopy[i];
                                break;
                            }
                        }
                        if (x < y)
                            return -1;
                        if (y < x)
                            return 1;
                        return 0;
                    };
                    // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
                    // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
                    //
                    // Arguments:
                    // - buffer - a Buffer to search
                    // - val - a string, Buffer, or number
                    // - byteOffset - an index into `buffer`; will be clamped to an int32
                    // - encoding - an optional encoding, relevant is val is a string
                    // - dir - true for indexOf, false for lastIndexOf
                    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
                        // Empty buffer means no match
                        if (buffer.length === 0)
                            return -1;
                        // Normalize byteOffset
                        if (typeof byteOffset === 'string') {
                            encoding = byteOffset;
                            byteOffset = 0;
                        }
                        else if (byteOffset > 0x7fffffff) {
                            byteOffset = 0x7fffffff;
                        }
                        else if (byteOffset < -0x80000000) {
                            byteOffset = -0x80000000;
                        }
                        byteOffset = +byteOffset; // Coerce to Number.
                        if (isNaN(byteOffset)) {
                            // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
                            byteOffset = dir ? 0 : (buffer.length - 1);
                        }
                        // Normalize byteOffset: negative offsets start from the end of the buffer
                        if (byteOffset < 0)
                            byteOffset = buffer.length + byteOffset;
                        if (byteOffset >= buffer.length) {
                            if (dir)
                                return -1;
                            else
                                byteOffset = buffer.length - 1;
                        }
                        else if (byteOffset < 0) {
                            if (dir)
                                byteOffset = 0;
                            else
                                return -1;
                        }
                        // Normalize val
                        if (typeof val === 'string') {
                            val = Buffer.from(val, encoding);
                        }
                        // Finally, search either indexOf (if dir is true) or lastIndexOf
                        if (Buffer.isBuffer(val)) {
                            // Special case: looking for empty string/buffer always fails
                            if (val.length === 0) {
                                return -1;
                            }
                            return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
                        }
                        else if (typeof val === 'number') {
                            val = val & 0xFF; // Search for a byte value [0-255]
                            if (Buffer.TYPED_ARRAY_SUPPORT &&
                                typeof Uint8Array.prototype.indexOf === 'function') {
                                if (dir) {
                                    return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
                                }
                                else {
                                    return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
                                }
                            }
                            return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
                        }
                        throw new TypeError('val must be string, number or Buffer');
                    }
                    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
                        var indexSize = 1;
                        var arrLength = arr.length;
                        var valLength = val.length;
                        if (encoding !== undefined) {
                            encoding = String(encoding).toLowerCase();
                            if (encoding === 'ucs2' || encoding === 'ucs-2' ||
                                encoding === 'utf16le' || encoding === 'utf-16le') {
                                if (arr.length < 2 || val.length < 2) {
                                    return -1;
                                }
                                indexSize = 2;
                                arrLength /= 2;
                                valLength /= 2;
                                byteOffset /= 2;
                            }
                        }
                        function read(buf, i) {
                            if (indexSize === 1) {
                                return buf[i];
                            }
                            else {
                                return buf.readUInt16BE(i * indexSize);
                            }
                        }
                        var i;
                        if (dir) {
                            var foundIndex = -1;
                            for (i = byteOffset; i < arrLength; i++) {
                                if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                                    if (foundIndex === -1)
                                        foundIndex = i;
                                    if (i - foundIndex + 1 === valLength)
                                        return foundIndex * indexSize;
                                }
                                else {
                                    if (foundIndex !== -1)
                                        i -= i - foundIndex;
                                    foundIndex = -1;
                                }
                            }
                        }
                        else {
                            if (byteOffset + valLength > arrLength)
                                byteOffset = arrLength - valLength;
                            for (i = byteOffset; i >= 0; i--) {
                                var found = true;
                                for (var j = 0; j < valLength; j++) {
                                    if (read(arr, i + j) !== read(val, j)) {
                                        found = false;
                                        break;
                                    }
                                }
                                if (found)
                                    return i;
                            }
                        }
                        return -1;
                    }
                    Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
                        return this.indexOf(val, byteOffset, encoding) !== -1;
                    };
                    Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
                        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
                    };
                    Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
                        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
                    };
                    function hexWrite(buf, string, offset, length) {
                        offset = Number(offset) || 0;
                        var remaining = buf.length - offset;
                        if (!length) {
                            length = remaining;
                        }
                        else {
                            length = Number(length);
                            if (length > remaining) {
                                length = remaining;
                            }
                        }
                        // must be an even number of digits
                        var strLen = string.length;
                        if (strLen % 2 !== 0)
                            throw new TypeError('Invalid hex string');
                        if (length > strLen / 2) {
                            length = strLen / 2;
                        }
                        for (var i = 0; i < length; ++i) {
                            var parsed = parseInt(string.substr(i * 2, 2), 16);
                            if (isNaN(parsed))
                                return i;
                            buf[offset + i] = parsed;
                        }
                        return i;
                    }
                    function utf8Write(buf, string, offset, length) {
                        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
                    }
                    function asciiWrite(buf, string, offset, length) {
                        return blitBuffer(asciiToBytes(string), buf, offset, length);
                    }
                    function latin1Write(buf, string, offset, length) {
                        return asciiWrite(buf, string, offset, length);
                    }
                    function base64Write(buf, string, offset, length) {
                        return blitBuffer(base64ToBytes(string), buf, offset, length);
                    }
                    function ucs2Write(buf, string, offset, length) {
                        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
                    }
                    Buffer.prototype.write = function write(string, offset, length, encoding) {
                        // Buffer#write(string)
                        if (offset === undefined) {
                            encoding = 'utf8';
                            length = this.length;
                            offset = 0;
                            // Buffer#write(string, encoding)
                        }
                        else if (length === undefined && typeof offset === 'string') {
                            encoding = offset;
                            length = this.length;
                            offset = 0;
                            // Buffer#write(string, offset[, length][, encoding])
                        }
                        else if (isFinite(offset)) {
                            offset = offset | 0;
                            if (isFinite(length)) {
                                length = length | 0;
                                if (encoding === undefined)
                                    encoding = 'utf8';
                            }
                            else {
                                encoding = length;
                                length = undefined;
                            }
                            // legacy write(string, encoding, offset, length) - remove in v0.13
                        }
                        else {
                            throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
                        }
                        var remaining = this.length - offset;
                        if (length === undefined || length > remaining)
                            length = remaining;
                        if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
                            throw new RangeError('Attempt to write outside buffer bounds');
                        }
                        if (!encoding)
                            encoding = 'utf8';
                        var loweredCase = false;
                        for (;;) {
                            switch (encoding) {
                                case 'hex':
                                    return hexWrite(this, string, offset, length);
                                case 'utf8':
                                case 'utf-8':
                                    return utf8Write(this, string, offset, length);
                                case 'ascii':
                                    return asciiWrite(this, string, offset, length);
                                case 'latin1':
                                case 'binary':
                                    return latin1Write(this, string, offset, length);
                                case 'base64':
                                    // Warning: maxLength not taken into account in base64Write
                                    return base64Write(this, string, offset, length);
                                case 'ucs2':
                                case 'ucs-2':
                                case 'utf16le':
                                case 'utf-16le':
                                    return ucs2Write(this, string, offset, length);
                                default:
                                    if (loweredCase)
                                        throw new TypeError('Unknown encoding: ' + encoding);
                                    encoding = ('' + encoding).toLowerCase();
                                    loweredCase = true;
                            }
                        }
                    };
                    Buffer.prototype.toJSON = function toJSON() {
                        return {
                            type: 'Buffer',
                            data: Array.prototype.slice.call(this._arr || this, 0)
                        };
                    };
                    function base64Slice(buf, start, end) {
                        if (start === 0 && end === buf.length) {
                            return base64.fromByteArray(buf);
                        }
                        else {
                            return base64.fromByteArray(buf.slice(start, end));
                        }
                    }
                    function utf8Slice(buf, start, end) {
                        end = Math.min(buf.length, end);
                        var res = [];
                        var i = start;
                        while (i < end) {
                            var firstByte = buf[i];
                            var codePoint = null;
                            var bytesPerSequence = (firstByte > 0xEF) ? 4
                                : (firstByte > 0xDF) ? 3
                                    : (firstByte > 0xBF) ? 2
                                        : 1;
                            if (i + bytesPerSequence <= end) {
                                var secondByte, thirdByte, fourthByte, tempCodePoint;
                                switch (bytesPerSequence) {
                                    case 1:
                                        if (firstByte < 0x80) {
                                            codePoint = firstByte;
                                        }
                                        break;
                                    case 2:
                                        secondByte = buf[i + 1];
                                        if ((secondByte & 0xC0) === 0x80) {
                                            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
                                            if (tempCodePoint > 0x7F) {
                                                codePoint = tempCodePoint;
                                            }
                                        }
                                        break;
                                    case 3:
                                        secondByte = buf[i + 1];
                                        thirdByte = buf[i + 2];
                                        if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                                            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
                                            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                                                codePoint = tempCodePoint;
                                            }
                                        }
                                        break;
                                    case 4:
                                        secondByte = buf[i + 1];
                                        thirdByte = buf[i + 2];
                                        fourthByte = buf[i + 3];
                                        if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                                            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
                                            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                                                codePoint = tempCodePoint;
                                            }
                                        }
                                }
                            }
                            if (codePoint === null) {
                                // we did not generate a valid codePoint so insert a
                                // replacement char (U+FFFD) and advance only 1 byte
                                codePoint = 0xFFFD;
                                bytesPerSequence = 1;
                            }
                            else if (codePoint > 0xFFFF) {
                                // encode to utf16 (surrogate pair dance)
                                codePoint -= 0x10000;
                                res.push(codePoint >>> 10 & 0x3FF | 0xD800);
                                codePoint = 0xDC00 | codePoint & 0x3FF;
                            }
                            res.push(codePoint);
                            i += bytesPerSequence;
                        }
                        return decodeCodePointsArray(res);
                    }
                    // Based on http://stackoverflow.com/a/22747272/680742, the browser with
                    // the lowest limit is Chrome, with 0x10000 args.
                    // We go 1 magnitude less, for safety
                    var MAX_ARGUMENTS_LENGTH = 0x1000;
                    function decodeCodePointsArray(codePoints) {
                        var len = codePoints.length;
                        if (len <= MAX_ARGUMENTS_LENGTH) {
                            return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
                        }
                        // Decode in chunks to avoid "call stack size exceeded".
                        var res = '';
                        var i = 0;
                        while (i < len) {
                            res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
                        }
                        return res;
                    }
                    function asciiSlice(buf, start, end) {
                        var ret = '';
                        end = Math.min(buf.length, end);
                        for (var i = start; i < end; ++i) {
                            ret += String.fromCharCode(buf[i] & 0x7F);
                        }
                        return ret;
                    }
                    function latin1Slice(buf, start, end) {
                        var ret = '';
                        end = Math.min(buf.length, end);
                        for (var i = start; i < end; ++i) {
                            ret += String.fromCharCode(buf[i]);
                        }
                        return ret;
                    }
                    function hexSlice(buf, start, end) {
                        var len = buf.length;
                        if (!start || start < 0)
                            start = 0;
                        if (!end || end < 0 || end > len)
                            end = len;
                        var out = '';
                        for (var i = start; i < end; ++i) {
                            out += toHex(buf[i]);
                        }
                        return out;
                    }
                    function utf16leSlice(buf, start, end) {
                        var bytes = buf.slice(start, end);
                        var res = '';
                        for (var i = 0; i < bytes.length; i += 2) {
                            res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
                        }
                        return res;
                    }
                    Buffer.prototype.slice = function slice(start, end) {
                        var len = this.length;
                        start = ~~start;
                        end = end === undefined ? len : ~~end;
                        if (start < 0) {
                            start += len;
                            if (start < 0)
                                start = 0;
                        }
                        else if (start > len) {
                            start = len;
                        }
                        if (end < 0) {
                            end += len;
                            if (end < 0)
                                end = 0;
                        }
                        else if (end > len) {
                            end = len;
                        }
                        if (end < start)
                            end = start;
                        var newBuf;
                        if (Buffer.TYPED_ARRAY_SUPPORT) {
                            newBuf = this.subarray(start, end);
                            newBuf.__proto__ = Buffer.prototype;
                        }
                        else {
                            var sliceLen = end - start;
                            newBuf = new Buffer(sliceLen, undefined);
                            for (var i = 0; i < sliceLen; ++i) {
                                newBuf[i] = this[i + start];
                            }
                        }
                        return newBuf;
                    };
                    /*
                     * Need to make sure that buffer isn't trying to write out of bounds.
                     */
                    function checkOffset(offset, ext, length) {
                        if ((offset % 1) !== 0 || offset < 0)
                            throw new RangeError('offset is not uint');
                        if (offset + ext > length)
                            throw new RangeError('Trying to access beyond buffer length');
                    }
                    Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
                        offset = offset | 0;
                        byteLength = byteLength | 0;
                        if (!noAssert)
                            checkOffset(offset, byteLength, this.length);
                        var val = this[offset];
                        var mul = 1;
                        var i = 0;
                        while (++i < byteLength && (mul *= 0x100)) {
                            val += this[offset + i] * mul;
                        }
                        return val;
                    };
                    Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
                        offset = offset | 0;
                        byteLength = byteLength | 0;
                        if (!noAssert) {
                            checkOffset(offset, byteLength, this.length);
                        }
                        var val = this[offset + --byteLength];
                        var mul = 1;
                        while (byteLength > 0 && (mul *= 0x100)) {
                            val += this[offset + --byteLength] * mul;
                        }
                        return val;
                    };
                    Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
                        if (!noAssert)
                            checkOffset(offset, 1, this.length);
                        return this[offset];
                    };
                    Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
                        if (!noAssert)
                            checkOffset(offset, 2, this.length);
                        return this[offset] | (this[offset + 1] << 8);
                    };
                    Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
                        if (!noAssert)
                            checkOffset(offset, 2, this.length);
                        return (this[offset] << 8) | this[offset + 1];
                    };
                    Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
                        if (!noAssert)
                            checkOffset(offset, 4, this.length);
                        return ((this[offset]) |
                            (this[offset + 1] << 8) |
                            (this[offset + 2] << 16)) +
                            (this[offset + 3] * 0x1000000);
                    };
                    Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
                        if (!noAssert)
                            checkOffset(offset, 4, this.length);
                        return (this[offset] * 0x1000000) +
                            ((this[offset + 1] << 16) |
                                (this[offset + 2] << 8) |
                                this[offset + 3]);
                    };
                    Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
                        offset = offset | 0;
                        byteLength = byteLength | 0;
                        if (!noAssert)
                            checkOffset(offset, byteLength, this.length);
                        var val = this[offset];
                        var mul = 1;
                        var i = 0;
                        while (++i < byteLength && (mul *= 0x100)) {
                            val += this[offset + i] * mul;
                        }
                        mul *= 0x80;
                        if (val >= mul)
                            val -= Math.pow(2, 8 * byteLength);
                        return val;
                    };
                    Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
                        offset = offset | 0;
                        byteLength = byteLength | 0;
                        if (!noAssert)
                            checkOffset(offset, byteLength, this.length);
                        var i = byteLength;
                        var mul = 1;
                        var val = this[offset + --i];
                        while (i > 0 && (mul *= 0x100)) {
                            val += this[offset + --i] * mul;
                        }
                        mul *= 0x80;
                        if (val >= mul)
                            val -= Math.pow(2, 8 * byteLength);
                        return val;
                    };
                    Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
                        if (!noAssert)
                            checkOffset(offset, 1, this.length);
                        if (!(this[offset] & 0x80))
                            return (this[offset]);
                        return ((0xff - this[offset] + 1) * -1);
                    };
                    Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
                        if (!noAssert)
                            checkOffset(offset, 2, this.length);
                        var val = this[offset] | (this[offset + 1] << 8);
                        return (val & 0x8000) ? val | 0xFFFF0000 : val;
                    };
                    Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
                        if (!noAssert)
                            checkOffset(offset, 2, this.length);
                        var val = this[offset + 1] | (this[offset] << 8);
                        return (val & 0x8000) ? val | 0xFFFF0000 : val;
                    };
                    Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
                        if (!noAssert)
                            checkOffset(offset, 4, this.length);
                        return (this[offset]) |
                            (this[offset + 1] << 8) |
                            (this[offset + 2] << 16) |
                            (this[offset + 3] << 24);
                    };
                    Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
                        if (!noAssert)
                            checkOffset(offset, 4, this.length);
                        return (this[offset] << 24) |
                            (this[offset + 1] << 16) |
                            (this[offset + 2] << 8) |
                            (this[offset + 3]);
                    };
                    Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
                        if (!noAssert)
                            checkOffset(offset, 4, this.length);
                        return ieee754.read(this, offset, true, 23, 4);
                    };
                    Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
                        if (!noAssert)
                            checkOffset(offset, 4, this.length);
                        return ieee754.read(this, offset, false, 23, 4);
                    };
                    Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
                        if (!noAssert)
                            checkOffset(offset, 8, this.length);
                        return ieee754.read(this, offset, true, 52, 8);
                    };
                    Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
                        if (!noAssert)
                            checkOffset(offset, 8, this.length);
                        return ieee754.read(this, offset, false, 52, 8);
                    };
                    function checkInt(buf, value, offset, ext, max, min) {
                        if (!Buffer.isBuffer(buf))
                            throw new TypeError('"buffer" argument must be a Buffer instance');
                        if (value > max || value < min)
                            throw new RangeError('"value" argument is out of bounds');
                        if (offset + ext > buf.length)
                            throw new RangeError('Index out of range');
                    }
                    Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
                        value = +value;
                        offset = offset | 0;
                        byteLength = byteLength | 0;
                        if (!noAssert) {
                            var maxBytes = Math.pow(2, 8 * byteLength) - 1;
                            checkInt(this, value, offset, byteLength, maxBytes, 0);
                        }
                        var mul = 1;
                        var i = 0;
                        this[offset] = value & 0xFF;
                        while (++i < byteLength && (mul *= 0x100)) {
                            this[offset + i] = (value / mul) & 0xFF;
                        }
                        return offset + byteLength;
                    };
                    Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
                        value = +value;
                        offset = offset | 0;
                        byteLength = byteLength | 0;
                        if (!noAssert) {
                            var maxBytes = Math.pow(2, 8 * byteLength) - 1;
                            checkInt(this, value, offset, byteLength, maxBytes, 0);
                        }
                        var i = byteLength - 1;
                        var mul = 1;
                        this[offset + i] = value & 0xFF;
                        while (--i >= 0 && (mul *= 0x100)) {
                            this[offset + i] = (value / mul) & 0xFF;
                        }
                        return offset + byteLength;
                    };
                    Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
                        value = +value;
                        offset = offset | 0;
                        if (!noAssert)
                            checkInt(this, value, offset, 1, 0xff, 0);
                        if (!Buffer.TYPED_ARRAY_SUPPORT)
                            value = Math.floor(value);
                        this[offset] = (value & 0xff);
                        return offset + 1;
                    };
                    function objectWriteUInt16(buf, value, offset, littleEndian) {
                        if (value < 0)
                            value = 0xffff + value + 1;
                        for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
                            buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
                                (littleEndian ? i : 1 - i) * 8;
                        }
                    }
                    Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
                        value = +value;
                        offset = offset | 0;
                        if (!noAssert)
                            checkInt(this, value, offset, 2, 0xffff, 0);
                        if (Buffer.TYPED_ARRAY_SUPPORT) {
                            this[offset] = (value & 0xff);
                            this[offset + 1] = (value >>> 8);
                        }
                        else {
                            objectWriteUInt16(this, value, offset, true);
                        }
                        return offset + 2;
                    };
                    Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
                        value = +value;
                        offset = offset | 0;
                        if (!noAssert)
                            checkInt(this, value, offset, 2, 0xffff, 0);
                        if (Buffer.TYPED_ARRAY_SUPPORT) {
                            this[offset] = (value >>> 8);
                            this[offset + 1] = (value & 0xff);
                        }
                        else {
                            objectWriteUInt16(this, value, offset, false);
                        }
                        return offset + 2;
                    };
                    function objectWriteUInt32(buf, value, offset, littleEndian) {
                        if (value < 0)
                            value = 0xffffffff + value + 1;
                        for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
                            buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
                        }
                    }
                    Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
                        value = +value;
                        offset = offset | 0;
                        if (!noAssert)
                            checkInt(this, value, offset, 4, 0xffffffff, 0);
                        if (Buffer.TYPED_ARRAY_SUPPORT) {
                            this[offset + 3] = (value >>> 24);
                            this[offset + 2] = (value >>> 16);
                            this[offset + 1] = (value >>> 8);
                            this[offset] = (value & 0xff);
                        }
                        else {
                            objectWriteUInt32(this, value, offset, true);
                        }
                        return offset + 4;
                    };
                    Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
                        value = +value;
                        offset = offset | 0;
                        if (!noAssert)
                            checkInt(this, value, offset, 4, 0xffffffff, 0);
                        if (Buffer.TYPED_ARRAY_SUPPORT) {
                            this[offset] = (value >>> 24);
                            this[offset + 1] = (value >>> 16);
                            this[offset + 2] = (value >>> 8);
                            this[offset + 3] = (value & 0xff);
                        }
                        else {
                            objectWriteUInt32(this, value, offset, false);
                        }
                        return offset + 4;
                    };
                    Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
                        value = +value;
                        offset = offset | 0;
                        if (!noAssert) {
                            var limit = Math.pow(2, 8 * byteLength - 1);
                            checkInt(this, value, offset, byteLength, limit - 1, -limit);
                        }
                        var i = 0;
                        var mul = 1;
                        var sub = 0;
                        this[offset] = value & 0xFF;
                        while (++i < byteLength && (mul *= 0x100)) {
                            if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
                                sub = 1;
                            }
                            this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
                        }
                        return offset + byteLength;
                    };
                    Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
                        value = +value;
                        offset = offset | 0;
                        if (!noAssert) {
                            var limit = Math.pow(2, 8 * byteLength - 1);
                            checkInt(this, value, offset, byteLength, limit - 1, -limit);
                        }
                        var i = byteLength - 1;
                        var mul = 1;
                        var sub = 0;
                        this[offset + i] = value & 0xFF;
                        while (--i >= 0 && (mul *= 0x100)) {
                            if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
                                sub = 1;
                            }
                            this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
                        }
                        return offset + byteLength;
                    };
                    Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
                        value = +value;
                        offset = offset | 0;
                        if (!noAssert)
                            checkInt(this, value, offset, 1, 0x7f, -0x80);
                        if (!Buffer.TYPED_ARRAY_SUPPORT)
                            value = Math.floor(value);
                        if (value < 0)
                            value = 0xff + value + 1;
                        this[offset] = (value & 0xff);
                        return offset + 1;
                    };
                    Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
                        value = +value;
                        offset = offset | 0;
                        if (!noAssert)
                            checkInt(this, value, offset, 2, 0x7fff, -0x8000);
                        if (Buffer.TYPED_ARRAY_SUPPORT) {
                            this[offset] = (value & 0xff);
                            this[offset + 1] = (value >>> 8);
                        }
                        else {
                            objectWriteUInt16(this, value, offset, true);
                        }
                        return offset + 2;
                    };
                    Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
                        value = +value;
                        offset = offset | 0;
                        if (!noAssert)
                            checkInt(this, value, offset, 2, 0x7fff, -0x8000);
                        if (Buffer.TYPED_ARRAY_SUPPORT) {
                            this[offset] = (value >>> 8);
                            this[offset + 1] = (value & 0xff);
                        }
                        else {
                            objectWriteUInt16(this, value, offset, false);
                        }
                        return offset + 2;
                    };
                    Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
                        value = +value;
                        offset = offset | 0;
                        if (!noAssert)
                            checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
                        if (Buffer.TYPED_ARRAY_SUPPORT) {
                            this[offset] = (value & 0xff);
                            this[offset + 1] = (value >>> 8);
                            this[offset + 2] = (value >>> 16);
                            this[offset + 3] = (value >>> 24);
                        }
                        else {
                            objectWriteUInt32(this, value, offset, true);
                        }
                        return offset + 4;
                    };
                    Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
                        value = +value;
                        offset = offset | 0;
                        if (!noAssert)
                            checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
                        if (value < 0)
                            value = 0xffffffff + value + 1;
                        if (Buffer.TYPED_ARRAY_SUPPORT) {
                            this[offset] = (value >>> 24);
                            this[offset + 1] = (value >>> 16);
                            this[offset + 2] = (value >>> 8);
                            this[offset + 3] = (value & 0xff);
                        }
                        else {
                            objectWriteUInt32(this, value, offset, false);
                        }
                        return offset + 4;
                    };
                    function checkIEEE754(buf, value, offset, ext, max, min) {
                        if (offset + ext > buf.length)
                            throw new RangeError('Index out of range');
                        if (offset < 0)
                            throw new RangeError('Index out of range');
                    }
                    function writeFloat(buf, value, offset, littleEndian, noAssert) {
                        if (!noAssert) {
                            checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
                        }
                        ieee754.write(buf, value, offset, littleEndian, 23, 4);
                        return offset + 4;
                    }
                    Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
                        return writeFloat(this, value, offset, true, noAssert);
                    };
                    Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
                        return writeFloat(this, value, offset, false, noAssert);
                    };
                    function writeDouble(buf, value, offset, littleEndian, noAssert) {
                        if (!noAssert) {
                            checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
                        }
                        ieee754.write(buf, value, offset, littleEndian, 52, 8);
                        return offset + 8;
                    }
                    Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
                        return writeDouble(this, value, offset, true, noAssert);
                    };
                    Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
                        return writeDouble(this, value, offset, false, noAssert);
                    };
                    // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
                    Buffer.prototype.copy = function copy(target, targetStart, start, end) {
                        if (!start)
                            start = 0;
                        if (!end && end !== 0)
                            end = this.length;
                        if (targetStart >= target.length)
                            targetStart = target.length;
                        if (!targetStart)
                            targetStart = 0;
                        if (end > 0 && end < start)
                            end = start;
                        // Copy 0 bytes; we're done
                        if (end === start)
                            return 0;
                        if (target.length === 0 || this.length === 0)
                            return 0;
                        // Fatal error conditions
                        if (targetStart < 0) {
                            throw new RangeError('targetStart out of bounds');
                        }
                        if (start < 0 || start >= this.length)
                            throw new RangeError('sourceStart out of bounds');
                        if (end < 0)
                            throw new RangeError('sourceEnd out of bounds');
                        // Are we oob?
                        if (end > this.length)
                            end = this.length;
                        if (target.length - targetStart < end - start) {
                            end = target.length - targetStart + start;
                        }
                        var len = end - start;
                        var i;
                        if (this === target && start < targetStart && targetStart < end) {
                            // descending copy from end
                            for (i = len - 1; i >= 0; --i) {
                                target[i + targetStart] = this[i + start];
                            }
                        }
                        else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
                            // ascending copy from start
                            for (i = 0; i < len; ++i) {
                                target[i + targetStart] = this[i + start];
                            }
                        }
                        else {
                            Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
                        }
                        return len;
                    };
                    // Usage:
                    //    buffer.fill(number[, offset[, end]])
                    //    buffer.fill(buffer[, offset[, end]])
                    //    buffer.fill(string[, offset[, end]][, encoding])
                    Buffer.prototype.fill = function fill(val, start, end, encoding) {
                        // Handle string cases:
                        if (typeof val === 'string') {
                            if (typeof start === 'string') {
                                encoding = start;
                                start = 0;
                                end = this.length;
                            }
                            else if (typeof end === 'string') {
                                encoding = end;
                                end = this.length;
                            }
                            if (val.length === 1) {
                                var code = val.charCodeAt(0);
                                if (code < 256) {
                                    val = code;
                                }
                            }
                            if (encoding !== undefined && typeof encoding !== 'string') {
                                throw new TypeError('encoding must be a string');
                            }
                            if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
                                throw new TypeError('Unknown encoding: ' + encoding);
                            }
                        }
                        else if (typeof val === 'number') {
                            val = val & 255;
                        }
                        // Invalid ranges are not set to a default, so can range check early.
                        if (start < 0 || this.length < start || this.length < end) {
                            throw new RangeError('Out of range index');
                        }
                        if (end <= start) {
                            return this;
                        }
                        start = start >>> 0;
                        end = end === undefined ? this.length : end >>> 0;
                        if (!val)
                            val = 0;
                        var i;
                        if (typeof val === 'number') {
                            for (i = start; i < end; ++i) {
                                this[i] = val;
                            }
                        }
                        else {
                            var bytes = Buffer.isBuffer(val)
                                ? val
                                : utf8ToBytes(new Buffer(val, encoding).toString());
                            var len = bytes.length;
                            for (i = 0; i < end - start; ++i) {
                                this[i + start] = bytes[i % len];
                            }
                        }
                        return this;
                    };
                    // HELPER FUNCTIONS
                    // ================
                    var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
                    function base64clean(str) {
                        // Node strips out invalid characters like \n and \t from the string, base64-js does not
                        str = stringtrim(str).replace(INVALID_BASE64_RE, '');
                        // Node converts strings with length < 2 to ''
                        if (str.length < 2)
                            return '';
                        // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
                        while (str.length % 4 !== 0) {
                            str = str + '=';
                        }
                        return str;
                    }
                    function stringtrim(str) {
                        if (str.trim)
                            return str.trim();
                        return str.replace(/^\s+|\s+$/g, '');
                    }
                    function toHex(n) {
                        if (n < 16)
                            return '0' + n.toString(16);
                        return n.toString(16);
                    }
                    function utf8ToBytes(string, units) {
                        units = units || Infinity;
                        var codePoint;
                        var length = string.length;
                        var leadSurrogate = null;
                        var bytes = [];
                        for (var i = 0; i < length; ++i) {
                            codePoint = string.charCodeAt(i);
                            // is surrogate component
                            if (codePoint > 0xD7FF && codePoint < 0xE000) {
                                // last char was a lead
                                if (!leadSurrogate) {
                                    // no lead yet
                                    if (codePoint > 0xDBFF) {
                                        // unexpected trail
                                        if ((units -= 3) > -1)
                                            bytes.push(0xEF, 0xBF, 0xBD);
                                        continue;
                                    }
                                    else if (i + 1 === length) {
                                        // unpaired lead
                                        if ((units -= 3) > -1)
                                            bytes.push(0xEF, 0xBF, 0xBD);
                                        continue;
                                    }
                                    // valid lead
                                    leadSurrogate = codePoint;
                                    continue;
                                }
                                // 2 leads in a row
                                if (codePoint < 0xDC00) {
                                    if ((units -= 3) > -1)
                                        bytes.push(0xEF, 0xBF, 0xBD);
                                    leadSurrogate = codePoint;
                                    continue;
                                }
                                // valid surrogate pair
                                codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
                            }
                            else if (leadSurrogate) {
                                // valid bmp char, but last char was a lead
                                if ((units -= 3) > -1)
                                    bytes.push(0xEF, 0xBF, 0xBD);
                            }
                            leadSurrogate = null;
                            // encode utf8
                            if (codePoint < 0x80) {
                                if ((units -= 1) < 0)
                                    break;
                                bytes.push(codePoint);
                            }
                            else if (codePoint < 0x800) {
                                if ((units -= 2) < 0)
                                    break;
                                bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
                            }
                            else if (codePoint < 0x10000) {
                                if ((units -= 3) < 0)
                                    break;
                                bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
                            }
                            else if (codePoint < 0x110000) {
                                if ((units -= 4) < 0)
                                    break;
                                bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
                            }
                            else {
                                throw new Error('Invalid code point');
                            }
                        }
                        return bytes;
                    }
                    function asciiToBytes(str) {
                        var byteArray = [];
                        for (var i = 0; i < str.length; ++i) {
                            // Node's code seems to be doing this and not & 0x7F..
                            byteArray.push(str.charCodeAt(i) & 0xFF);
                        }
                        return byteArray;
                    }
                    function utf16leToBytes(str, units) {
                        var c, hi, lo;
                        var byteArray = [];
                        for (var i = 0; i < str.length; ++i) {
                            if ((units -= 2) < 0)
                                break;
                            c = str.charCodeAt(i);
                            hi = c >> 8;
                            lo = c % 256;
                            byteArray.push(lo);
                            byteArray.push(hi);
                        }
                        return byteArray;
                    }
                    function base64ToBytes(str) {
                        return base64.toByteArray(base64clean(str));
                    }
                    function blitBuffer(src, dst, offset, length) {
                        for (var i = 0; i < length; ++i) {
                            if ((i + offset >= dst.length) || (i >= src.length))
                                break;
                            dst[i + offset] = src[i];
                        }
                        return i;
                    }
                    function isnan(val) {
                        return val !== val; // eslint-disable-line no-self-compare
                    }
                }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
            }, { "base64-js": 8, "ieee754": 17, "isarray": 20 }], 12: [function (require, module, exports) {
                /**
                 * Slice reference.
                 */
                var slice = [].slice;
                /**
                 * Bind `obj` to `fn`.
                 *
                 * @param {Object} obj
                 * @param {Function|String} fn or string
                 * @return {Function}
                 * @api public
                 */
                module.exports = function (obj, fn) {
                    if ('string' == typeof fn)
                        fn = obj[fn];
                    if ('function' != typeof fn)
                        throw new Error('bind() requires a function');
                    var args = slice.call(arguments, 2);
                    return function () {
                        return fn.apply(obj, args.concat(slice.call(arguments)));
                    };
                };
            }, {}], 13: [function (require, module, exports) {
                (function (Buffer) {
                    // Copyright Joyent, Inc. and other Node contributors.
                    //
                    // Permission is hereby granted, free of charge, to any person obtaining a
                    // copy of this software and associated documentation files (the
                    // "Software"), to deal in the Software without restriction, including
                    // without limitation the rights to use, copy, modify, merge, publish,
                    // distribute, sublicense, and/or sell copies of the Software, and to permit
                    // persons to whom the Software is furnished to do so, subject to the
                    // following conditions:
                    //
                    // The above copyright notice and this permission notice shall be included
                    // in all copies or substantial portions of the Software.
                    //
                    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
                    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
                    // USE OR OTHER DEALINGS IN THE SOFTWARE.
                    // NOTE: These type checking functions intentionally don't use `instanceof`
                    // because it is fragile and can be easily faked with `Object.create()`.
                    function isArray(arg) {
                        if (Array.isArray) {
                            return Array.isArray(arg);
                        }
                        return objectToString(arg) === '[object Array]';
                    }
                    exports.isArray = isArray;
                    function isBoolean(arg) {
                        return typeof arg === 'boolean';
                    }
                    exports.isBoolean = isBoolean;
                    function isNull(arg) {
                        return arg === null;
                    }
                    exports.isNull = isNull;
                    function isNullOrUndefined(arg) {
                        return arg == null;
                    }
                    exports.isNullOrUndefined = isNullOrUndefined;
                    function isNumber(arg) {
                        return typeof arg === 'number';
                    }
                    exports.isNumber = isNumber;
                    function isString(arg) {
                        return typeof arg === 'string';
                    }
                    exports.isString = isString;
                    function isSymbol(arg) {
                        return typeof arg === 'symbol';
                    }
                    exports.isSymbol = isSymbol;
                    function isUndefined(arg) {
                        return arg === void 0;
                    }
                    exports.isUndefined = isUndefined;
                    function isRegExp(re) {
                        return objectToString(re) === '[object RegExp]';
                    }
                    exports.isRegExp = isRegExp;
                    function isObject(arg) {
                        return typeof arg === 'object' && arg !== null;
                    }
                    exports.isObject = isObject;
                    function isDate(d) {
                        return objectToString(d) === '[object Date]';
                    }
                    exports.isDate = isDate;
                    function isError(e) {
                        return (objectToString(e) === '[object Error]' || e instanceof Error);
                    }
                    exports.isError = isError;
                    function isFunction(arg) {
                        return typeof arg === 'function';
                    }
                    exports.isFunction = isFunction;
                    function isPrimitive(arg) {
                        return arg === null ||
                            typeof arg === 'boolean' ||
                            typeof arg === 'number' ||
                            typeof arg === 'string' ||
                            typeof arg === 'symbol' || // ES6 symbol
                            typeof arg === 'undefined';
                    }
                    exports.isPrimitive = isPrimitive;
                    exports.isBuffer = Buffer.isBuffer;
                    function objectToString(o) {
                        return Object.prototype.toString.call(o);
                    }
                }).call(this, { "isBuffer": require("../../is-buffer/index.js") });
            }, { "../../is-buffer/index.js": 19 }], 14: [function (require, module, exports) {
                /**
                 * This is the web browser implementation of `debug()`.
                 *
                 * Expose `debug()` as the module.
                 */
                exports = module.exports = require('./debug');
                exports.log = log;
                exports.formatArgs = formatArgs;
                exports.save = save;
                exports.load = load;
                exports.useColors = useColors;
                exports.storage = 'undefined' != typeof chrome
                    && 'undefined' != typeof chrome.storage
                    ? chrome.storage.local
                    : localstorage();
                /**
                 * Colors.
                 */
                exports.colors = [
                    'lightseagreen',
                    'forestgreen',
                    'goldenrod',
                    'dodgerblue',
                    'darkorchid',
                    'crimson'
                ];
                /**
                 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
                 * and the Firebug extension (any Firefox version) are known
                 * to support "%c" CSS customizations.
                 *
                 * TODO: add a `localStorage` variable to explicitly enable/disable colors
                 */
                function useColors() {
                    // is webkit? http://stackoverflow.com/a/16459606/376773
                    return ('WebkitAppearance' in document.documentElement.style) ||
                        // is firebug? http://stackoverflow.com/a/398120/376773
                        (window.console && (console.firebug || (console.exception && console.table))) ||
                        // is firefox >= v31?
                        // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
                        (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
                }
                /**
                 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
                 */
                exports.formatters.j = function (v) {
                    return JSON.stringify(v);
                };
                /**
                 * Colorize log arguments if enabled.
                 *
                 * @api public
                 */
                function formatArgs() {
                    var args = arguments;
                    var useColors = this.useColors;
                    args[0] = (useColors ? '%c' : '')
                        + this.namespace
                        + (useColors ? ' %c' : ' ')
                        + args[0]
                        + (useColors ? '%c ' : ' ')
                        + '+' + exports.humanize(this.diff);
                    if (!useColors)
                        return args;
                    var c = 'color: ' + this.color;
                    args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
                    // the final "%c" is somewhat tricky, because there could be other
                    // arguments passed either before or after the %c, so we need to
                    // figure out the correct index to insert the CSS into
                    var index = 0;
                    var lastC = 0;
                    args[0].replace(/%[a-z%]/g, function (match) {
                        if ('%%' === match)
                            return;
                        index++;
                        if ('%c' === match) {
                            // we only are interested in the *last* %c
                            // (the user may have provided their own)
                            lastC = index;
                        }
                    });
                    args.splice(lastC, 0, c);
                    return args;
                }
                /**
                 * Invokes `console.log()` when available.
                 * No-op when `console.log` is not a "function".
                 *
                 * @api public
                 */
                function log() {
                    // this hackery is required for IE8/9, where
                    // the `console.log` function doesn't have 'apply'
                    return 'object' === typeof console
                        && console.log
                        && Function.prototype.apply.call(console.log, console, arguments);
                }
                /**
                 * Save `namespaces`.
                 *
                 * @param {String} namespaces
                 * @api private
                 */
                function save(namespaces) {
                    try {
                        if (null == namespaces) {
                            exports.storage.removeItem('debug');
                        }
                        else {
                            exports.storage.debug = namespaces;
                        }
                    }
                    catch (e) { }
                }
                /**
                 * Load `namespaces`.
                 *
                 * @return {String} returns the previously persisted debug modes
                 * @api private
                 */
                function load() {
                    var r;
                    try {
                        r = exports.storage.debug;
                    }
                    catch (e) { }
                    return r;
                }
                /**
                 * Enable namespaces listed in `localStorage.debug` initially.
                 */
                exports.enable(load());
                /**
                 * Localstorage attempts to return the localstorage.
                 *
                 * This is necessary because safari throws
                 * when a user disables cookies/localstorage
                 * and you attempt to access it.
                 *
                 * @return {LocalStorage}
                 * @api private
                 */
                function localstorage() {
                    try {
                        return window.localStorage;
                    }
                    catch (e) { }
                }
            }, { "./debug": 15 }], 15: [function (require, module, exports) {
                /**
                 * This is the common logic for both the Node.js and web browser
                 * implementations of `debug()`.
                 *
                 * Expose `debug()` as the module.
                 */
                exports = module.exports = debug;
                exports.coerce = coerce;
                exports.disable = disable;
                exports.enable = enable;
                exports.enabled = enabled;
                exports.humanize = require('ms');
                /**
                 * The currently active debug mode names, and names to skip.
                 */
                exports.names = [];
                exports.skips = [];
                /**
                 * Map of special "%n" handling functions, for the debug "format" argument.
                 *
                 * Valid key names are a single, lowercased letter, i.e. "n".
                 */
                exports.formatters = {};
                /**
                 * Previously assigned color.
                 */
                var prevColor = 0;
                /**
                 * Previous log timestamp.
                 */
                var prevTime;
                /**
                 * Select a color.
                 *
                 * @return {Number}
                 * @api private
                 */
                function selectColor() {
                    return exports.colors[prevColor++ % exports.colors.length];
                }
                /**
                 * Create a debugger with the given `namespace`.
                 *
                 * @param {String} namespace
                 * @return {Function}
                 * @api public
                 */
                function debug(namespace) {
                    // define the `disabled` version
                    function disabled() {
                    }
                    disabled.enabled = false;
                    // define the `enabled` version
                    function enabled() {
                        var self = enabled;
                        // set `diff` timestamp
                        var curr = +new Date();
                        var ms = curr - (prevTime || curr);
                        self.diff = ms;
                        self.prev = prevTime;
                        self.curr = curr;
                        prevTime = curr;
                        // add the `color` if not set
                        if (null == self.useColors)
                            self.useColors = exports.useColors();
                        if (null == self.color && self.useColors)
                            self.color = selectColor();
                        var args = Array.prototype.slice.call(arguments);
                        args[0] = exports.coerce(args[0]);
                        if ('string' !== typeof args[0]) {
                            // anything else let's inspect with %o
                            args = ['%o'].concat(args);
                        }
                        // apply any `formatters` transformations
                        var index = 0;
                        args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
                            // if we encounter an escaped % then don't increase the array index
                            if (match === '%%')
                                return match;
                            index++;
                            var formatter = exports.formatters[format];
                            if ('function' === typeof formatter) {
                                var val = args[index];
                                match = formatter.call(self, val);
                                // now we need to remove `args[index]` since it's inlined in the `format`
                                args.splice(index, 1);
                                index--;
                            }
                            return match;
                        });
                        if ('function' === typeof exports.formatArgs) {
                            args = exports.formatArgs.apply(self, args);
                        }
                        var logFn = enabled.log || exports.log || console.log.bind(console);
                        logFn.apply(self, args);
                    }
                    enabled.enabled = true;
                    var fn = exports.enabled(namespace) ? enabled : disabled;
                    fn.namespace = namespace;
                    return fn;
                }
                /**
                 * Enables a debug mode by namespaces. This can include modes
                 * separated by a colon and wildcards.
                 *
                 * @param {String} namespaces
                 * @api public
                 */
                function enable(namespaces) {
                    exports.save(namespaces);
                    var split = (namespaces || '').split(/[\s,]+/);
                    var len = split.length;
                    for (var i = 0; i < len; i++) {
                        if (!split[i])
                            continue; // ignore empty strings
                        namespaces = split[i].replace(/\*/g, '.*?');
                        if (namespaces[0] === '-') {
                            exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
                        }
                        else {
                            exports.names.push(new RegExp('^' + namespaces + '$'));
                        }
                    }
                }
                /**
                 * Disable debug output.
                 *
                 * @api public
                 */
                function disable() {
                    exports.enable('');
                }
                /**
                 * Returns true if the given mode name is enabled, false otherwise.
                 *
                 * @param {String} name
                 * @return {Boolean}
                 * @api public
                 */
                function enabled(name) {
                    var i, len;
                    for (i = 0, len = exports.skips.length; i < len; i++) {
                        if (exports.skips[i].test(name)) {
                            return false;
                        }
                    }
                    for (i = 0, len = exports.names.length; i < len; i++) {
                        if (exports.names[i].test(name)) {
                            return true;
                        }
                    }
                    return false;
                }
                /**
                 * Coerce `val`.
                 *
                 * @param {Mixed} val
                 * @return {Mixed}
                 * @api private
                 */
                function coerce(val) {
                    if (val instanceof Error)
                        return val.stack || val.message;
                    return val;
                }
            }, { "ms": 21 }], 16: [function (require, module, exports) {
                // Copyright Joyent, Inc. and other Node contributors.
                //
                // Permission is hereby granted, free of charge, to any person obtaining a
                // copy of this software and associated documentation files (the
                // "Software"), to deal in the Software without restriction, including
                // without limitation the rights to use, copy, modify, merge, publish,
                // distribute, sublicense, and/or sell copies of the Software, and to permit
                // persons to whom the Software is furnished to do so, subject to the
                // following conditions:
                //
                // The above copyright notice and this permission notice shall be included
                // in all copies or substantial portions of the Software.
                //
                // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
                // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
                // USE OR OTHER DEALINGS IN THE SOFTWARE.
                function EventEmitter() {
                    this._events = this._events || {};
                    this._maxListeners = this._maxListeners || undefined;
                }
                module.exports = EventEmitter;
                // Backwards-compat with node 0.10.x
                EventEmitter.EventEmitter = EventEmitter;
                EventEmitter.prototype._events = undefined;
                EventEmitter.prototype._maxListeners = undefined;
                // By default EventEmitters will print a warning if more than 10 listeners are
                // added to it. This is a useful default which helps finding memory leaks.
                EventEmitter.defaultMaxListeners = 10;
                // Obviously not all Emitters should be limited to 10. This function allows
                // that to be increased. Set to zero for unlimited.
                EventEmitter.prototype.setMaxListeners = function (n) {
                    if (!isNumber(n) || n < 0 || isNaN(n))
                        throw TypeError('n must be a positive number');
                    this._maxListeners = n;
                    return this;
                };
                EventEmitter.prototype.emit = function (type) {
                    var er, handler, len, args, i, listeners;
                    if (!this._events)
                        this._events = {};
                    // If there is no 'error' event listener then throw.
                    if (type === 'error') {
                        if (!this._events.error ||
                            (isObject(this._events.error) && !this._events.error.length)) {
                            er = arguments[1];
                            if (er instanceof Error) {
                                throw er; // Unhandled 'error' event
                            }
                            else {
                                // At least give some kind of context to the user
                                var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
                                err.context = er;
                                throw err;
                            }
                        }
                    }
                    handler = this._events[type];
                    if (isUndefined(handler))
                        return false;
                    if (isFunction(handler)) {
                        switch (arguments.length) {
                            // fast cases
                            case 1:
                                handler.call(this);
                                break;
                            case 2:
                                handler.call(this, arguments[1]);
                                break;
                            case 3:
                                handler.call(this, arguments[1], arguments[2]);
                                break;
                            // slower
                            default:
                                args = Array.prototype.slice.call(arguments, 1);
                                handler.apply(this, args);
                        }
                    }
                    else if (isObject(handler)) {
                        args = Array.prototype.slice.call(arguments, 1);
                        listeners = handler.slice();
                        len = listeners.length;
                        for (i = 0; i < len; i++)
                            listeners[i].apply(this, args);
                    }
                    return true;
                };
                EventEmitter.prototype.addListener = function (type, listener) {
                    var m;
                    if (!isFunction(listener))
                        throw TypeError('listener must be a function');
                    if (!this._events)
                        this._events = {};
                    // To avoid recursion in the case that type === "newListener"! Before
                    // adding it to the listeners, first emit "newListener".
                    if (this._events.newListener)
                        this.emit('newListener', type, isFunction(listener.listener) ?
                            listener.listener : listener);
                    if (!this._events[type])
                        // Optimize the case of one listener. Don't need the extra array object.
                        this._events[type] = listener;
                    else if (isObject(this._events[type]))
                        // If we've already got an array, just append.
                        this._events[type].push(listener);
                    else
                        // Adding the second element, need to change to array.
                        this._events[type] = [this._events[type], listener];
                    // Check for listener leak
                    if (isObject(this._events[type]) && !this._events[type].warned) {
                        if (!isUndefined(this._maxListeners)) {
                            m = this._maxListeners;
                        }
                        else {
                            m = EventEmitter.defaultMaxListeners;
                        }
                        if (m && m > 0 && this._events[type].length > m) {
                            this._events[type].warned = true;
                            console.error('(node) warning: possible EventEmitter memory ' +
                                'leak detected. %d listeners added. ' +
                                'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
                            if (typeof console.trace === 'function') {
                                // not supported in IE 10
                                console.trace();
                            }
                        }
                    }
                    return this;
                };
                EventEmitter.prototype.on = EventEmitter.prototype.addListener;
                EventEmitter.prototype.once = function (type, listener) {
                    if (!isFunction(listener))
                        throw TypeError('listener must be a function');
                    var fired = false;
                    function g() {
                        this.removeListener(type, g);
                        if (!fired) {
                            fired = true;
                            listener.apply(this, arguments);
                        }
                    }
                    g.listener = listener;
                    this.on(type, g);
                    return this;
                };
                // emits a 'removeListener' event iff the listener was removed
                EventEmitter.prototype.removeListener = function (type, listener) {
                    var list, position, length, i;
                    if (!isFunction(listener))
                        throw TypeError('listener must be a function');
                    if (!this._events || !this._events[type])
                        return this;
                    list = this._events[type];
                    length = list.length;
                    position = -1;
                    if (list === listener ||
                        (isFunction(list.listener) && list.listener === listener)) {
                        delete this._events[type];
                        if (this._events.removeListener)
                            this.emit('removeListener', type, listener);
                    }
                    else if (isObject(list)) {
                        for (i = length; i-- > 0;) {
                            if (list[i] === listener ||
                                (list[i].listener && list[i].listener === listener)) {
                                position = i;
                                break;
                            }
                        }
                        if (position < 0)
                            return this;
                        if (list.length === 1) {
                            list.length = 0;
                            delete this._events[type];
                        }
                        else {
                            list.splice(position, 1);
                        }
                        if (this._events.removeListener)
                            this.emit('removeListener', type, listener);
                    }
                    return this;
                };
                EventEmitter.prototype.removeAllListeners = function (type) {
                    var key, listeners;
                    if (!this._events)
                        return this;
                    // not listening for removeListener, no need to emit
                    if (!this._events.removeListener) {
                        if (arguments.length === 0)
                            this._events = {};
                        else if (this._events[type])
                            delete this._events[type];
                        return this;
                    }
                    // emit removeListener for all listeners on all events
                    if (arguments.length === 0) {
                        for (key in this._events) {
                            if (key === 'removeListener')
                                continue;
                            this.removeAllListeners(key);
                        }
                        this.removeAllListeners('removeListener');
                        this._events = {};
                        return this;
                    }
                    listeners = this._events[type];
                    if (isFunction(listeners)) {
                        this.removeListener(type, listeners);
                    }
                    else if (listeners) {
                        // LIFO order
                        while (listeners.length)
                            this.removeListener(type, listeners[listeners.length - 1]);
                    }
                    delete this._events[type];
                    return this;
                };
                EventEmitter.prototype.listeners = function (type) {
                    var ret;
                    if (!this._events || !this._events[type])
                        ret = [];
                    else if (isFunction(this._events[type]))
                        ret = [this._events[type]];
                    else
                        ret = this._events[type].slice();
                    return ret;
                };
                EventEmitter.prototype.listenerCount = function (type) {
                    if (this._events) {
                        var evlistener = this._events[type];
                        if (isFunction(evlistener))
                            return 1;
                        else if (evlistener)
                            return evlistener.length;
                    }
                    return 0;
                };
                EventEmitter.listenerCount = function (emitter, type) {
                    return emitter.listenerCount(type);
                };
                function isFunction(arg) {
                    return typeof arg === 'function';
                }
                function isNumber(arg) {
                    return typeof arg === 'number';
                }
                function isObject(arg) {
                    return typeof arg === 'object' && arg !== null;
                }
                function isUndefined(arg) {
                    return arg === void 0;
                }
            }, {}], 17: [function (require, module, exports) {
                exports.read = function (buffer, offset, isLE, mLen, nBytes) {
                    var e, m;
                    var eLen = nBytes * 8 - mLen - 1;
                    var eMax = (1 << eLen) - 1;
                    var eBias = eMax >> 1;
                    var nBits = -7;
                    var i = isLE ? (nBytes - 1) : 0;
                    var d = isLE ? -1 : 1;
                    var s = buffer[offset + i];
                    i += d;
                    e = s & ((1 << (-nBits)) - 1);
                    s >>= (-nBits);
                    nBits += eLen;
                    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) { }
                    m = e & ((1 << (-nBits)) - 1);
                    e >>= (-nBits);
                    nBits += mLen;
                    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) { }
                    if (e === 0) {
                        e = 1 - eBias;
                    }
                    else if (e === eMax) {
                        return m ? NaN : ((s ? -1 : 1) * Infinity);
                    }
                    else {
                        m = m + Math.pow(2, mLen);
                        e = e - eBias;
                    }
                    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
                };
                exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
                    var e, m, c;
                    var eLen = nBytes * 8 - mLen - 1;
                    var eMax = (1 << eLen) - 1;
                    var eBias = eMax >> 1;
                    var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
                    var i = isLE ? 0 : (nBytes - 1);
                    var d = isLE ? 1 : -1;
                    var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
                    value = Math.abs(value);
                    if (isNaN(value) || value === Infinity) {
                        m = isNaN(value) ? 1 : 0;
                        e = eMax;
                    }
                    else {
                        e = Math.floor(Math.log(value) / Math.LN2);
                        if (value * (c = Math.pow(2, -e)) < 1) {
                            e--;
                            c *= 2;
                        }
                        if (e + eBias >= 1) {
                            value += rt / c;
                        }
                        else {
                            value += rt * Math.pow(2, 1 - eBias);
                        }
                        if (value * c >= 2) {
                            e++;
                            c /= 2;
                        }
                        if (e + eBias >= eMax) {
                            m = 0;
                            e = eMax;
                        }
                        else if (e + eBias >= 1) {
                            m = (value * c - 1) * Math.pow(2, mLen);
                            e = e + eBias;
                        }
                        else {
                            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
                            e = 0;
                        }
                    }
                    for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) { }
                    e = (e << mLen) | m;
                    eLen += mLen;
                    for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) { }
                    buffer[offset + i - d] |= s * 128;
                };
            }, {}], 18: [function (require, module, exports) {
                if (typeof Object.create === 'function') {
                    // implementation from standard node.js 'util' module
                    module.exports = function inherits(ctor, superCtor) {
                        ctor.super_ = superCtor;
                        ctor.prototype = Object.create(superCtor.prototype, {
                            constructor: {
                                value: ctor,
                                enumerable: false,
                                writable: true,
                                configurable: true
                            }
                        });
                    };
                }
                else {
                    // old school shim for old browsers
                    module.exports = function inherits(ctor, superCtor) {
                        ctor.super_ = superCtor;
                        var TempCtor = function () { };
                        TempCtor.prototype = superCtor.prototype;
                        ctor.prototype = new TempCtor();
                        ctor.prototype.constructor = ctor;
                    };
                }
            }, {}], 19: [function (require, module, exports) {
                /*!
                 * Determine if an object is a Buffer
                 *
                 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
                 * @license  MIT
                 */
                // The _isBuffer check is for Safari 5-7 support, because it's missing
                // Object.prototype.constructor. Remove this eventually
                module.exports = function (obj) {
                    return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
                };
                function isBuffer(obj) {
                    return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
                }
                // For Node v0.10 support. Remove this eventually.
                function isSlowBuffer(obj) {
                    return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
                }
            }, {}], 20: [function (require, module, exports) {
                var toString = {}.toString;
                module.exports = Array.isArray || function (arr) {
                    return toString.call(arr) == '[object Array]';
                };
            }, {}], 21: [function (require, module, exports) {
                /**
                 * Helpers.
                 */
                var s = 1000;
                var m = s * 60;
                var h = m * 60;
                var d = h * 24;
                var y = d * 365.25;
                /**
                 * Parse or format the given `val`.
                 *
                 * Options:
                 *
                 *  - `long` verbose formatting [false]
                 *
                 * @param {String|Number} val
                 * @param {Object} options
                 * @return {String|Number}
                 * @api public
                 */
                module.exports = function (val, options) {
                    options = options || {};
                    if ('string' == typeof val)
                        return parse(val);
                    return options.long
                        ? long(val)
                        : short(val);
                };
                /**
                 * Parse the given `str` and return milliseconds.
                 *
                 * @param {String} str
                 * @return {Number}
                 * @api private
                 */
                function parse(str) {
                    str = '' + str;
                    if (str.length > 10000)
                        return;
                    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
                    if (!match)
                        return;
                    var n = parseFloat(match[1]);
                    var type = (match[2] || 'ms').toLowerCase();
                    switch (type) {
                        case 'years':
                        case 'year':
                        case 'yrs':
                        case 'yr':
                        case 'y':
                            return n * y;
                        case 'days':
                        case 'day':
                        case 'd':
                            return n * d;
                        case 'hours':
                        case 'hour':
                        case 'hrs':
                        case 'hr':
                        case 'h':
                            return n * h;
                        case 'minutes':
                        case 'minute':
                        case 'mins':
                        case 'min':
                        case 'm':
                            return n * m;
                        case 'seconds':
                        case 'second':
                        case 'secs':
                        case 'sec':
                        case 's':
                            return n * s;
                        case 'milliseconds':
                        case 'millisecond':
                        case 'msecs':
                        case 'msec':
                        case 'ms':
                            return n;
                    }
                }
                /**
                 * Short format for `ms`.
                 *
                 * @param {Number} ms
                 * @return {String}
                 * @api private
                 */
                function short(ms) {
                    if (ms >= d)
                        return Math.round(ms / d) + 'd';
                    if (ms >= h)
                        return Math.round(ms / h) + 'h';
                    if (ms >= m)
                        return Math.round(ms / m) + 'm';
                    if (ms >= s)
                        return Math.round(ms / s) + 's';
                    return ms + 'ms';
                }
                /**
                 * Long format for `ms`.
                 *
                 * @param {Number} ms
                 * @return {String}
                 * @api private
                 */
                function long(ms) {
                    return plural(ms, d, 'day')
                        || plural(ms, h, 'hour')
                        || plural(ms, m, 'minute')
                        || plural(ms, s, 'second')
                        || ms + ' ms';
                }
                /**
                 * Pluralization helper.
                 */
                function plural(ms, n, name) {
                    if (ms < n)
                        return;
                    if (ms < n * 1.5)
                        return Math.floor(ms / n) + ' ' + name;
                    return Math.ceil(ms / n) + ' ' + name + 's';
                }
            }, {}], 22: [function (require, module, exports) {
                (function (process) {
                    'use strict';
                    if (!process.version ||
                        process.version.indexOf('v0.') === 0 ||
                        process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
                        module.exports = nextTick;
                    }
                    else {
                        module.exports = process.nextTick;
                    }
                    function nextTick(fn, arg1, arg2, arg3) {
                        if (typeof fn !== 'function') {
                            throw new TypeError('"callback" argument must be a function');
                        }
                        var len = arguments.length;
                        var args, i;
                        switch (len) {
                            case 0:
                            case 1:
                                return process.nextTick(fn);
                            case 2:
                                return process.nextTick(function afterTickOne() {
                                    fn.call(null, arg1);
                                });
                            case 3:
                                return process.nextTick(function afterTickTwo() {
                                    fn.call(null, arg1, arg2);
                                });
                            case 4:
                                return process.nextTick(function afterTickThree() {
                                    fn.call(null, arg1, arg2, arg3);
                                });
                            default:
                                args = new Array(len - 1);
                                i = 0;
                                while (i < args.length) {
                                    args[i++] = arguments[i];
                                }
                                return process.nextTick(function afterTick() {
                                    fn.apply(null, args);
                                });
                        }
                    }
                }).call(this, require('_process'));
            }, { "_process": 23 }], 23: [function (require, module, exports) {
                // shim for using process in browser
                var process = module.exports = {};
                // cached from whatever global is present so that test runners that stub it
                // don't break things.  But we need to wrap it in a try catch in case it is
                // wrapped in strict mode code which doesn't define any globals.  It's inside a
                // function because try/catches deoptimize in certain engines.
                var cachedSetTimeout;
                var cachedClearTimeout;
                function defaultSetTimout() {
                    throw new Error('setTimeout has not been defined');
                }
                function defaultClearTimeout() {
                    throw new Error('clearTimeout has not been defined');
                }
                (function () {
                    try {
                        if (typeof setTimeout === 'function') {
                            cachedSetTimeout = setTimeout;
                        }
                        else {
                            cachedSetTimeout = defaultSetTimout;
                        }
                    }
                    catch (e) {
                        cachedSetTimeout = defaultSetTimout;
                    }
                    try {
                        if (typeof clearTimeout === 'function') {
                            cachedClearTimeout = clearTimeout;
                        }
                        else {
                            cachedClearTimeout = defaultClearTimeout;
                        }
                    }
                    catch (e) {
                        cachedClearTimeout = defaultClearTimeout;
                    }
                }());
                function runTimeout(fun) {
                    if (cachedSetTimeout === setTimeout) {
                        //normal enviroments in sane situations
                        return setTimeout(fun, 0);
                    }
                    // if setTimeout wasn't available but was latter defined
                    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                        cachedSetTimeout = setTimeout;
                        return setTimeout(fun, 0);
                    }
                    try {
                        // when when somebody has screwed with setTimeout but no I.E. maddness
                        return cachedSetTimeout(fun, 0);
                    }
                    catch (e) {
                        try {
                            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                            return cachedSetTimeout.call(null, fun, 0);
                        }
                        catch (e) {
                            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                            return cachedSetTimeout.call(this, fun, 0);
                        }
                    }
                }
                function runClearTimeout(marker) {
                    if (cachedClearTimeout === clearTimeout) {
                        //normal enviroments in sane situations
                        return clearTimeout(marker);
                    }
                    // if clearTimeout wasn't available but was latter defined
                    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                        cachedClearTimeout = clearTimeout;
                        return clearTimeout(marker);
                    }
                    try {
                        // when when somebody has screwed with setTimeout but no I.E. maddness
                        return cachedClearTimeout(marker);
                    }
                    catch (e) {
                        try {
                            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                            return cachedClearTimeout.call(null, marker);
                        }
                        catch (e) {
                            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                            return cachedClearTimeout.call(this, marker);
                        }
                    }
                }
                var queue = [];
                var draining = false;
                var currentQueue;
                var queueIndex = -1;
                function cleanUpNextTick() {
                    if (!draining || !currentQueue) {
                        return;
                    }
                    draining = false;
                    if (currentQueue.length) {
                        queue = currentQueue.concat(queue);
                    }
                    else {
                        queueIndex = -1;
                    }
                    if (queue.length) {
                        drainQueue();
                    }
                }
                function drainQueue() {
                    if (draining) {
                        return;
                    }
                    var timeout = runTimeout(cleanUpNextTick);
                    draining = true;
                    var len = queue.length;
                    while (len) {
                        currentQueue = queue;
                        queue = [];
                        while (++queueIndex < len) {
                            if (currentQueue) {
                                currentQueue[queueIndex].run();
                            }
                        }
                        queueIndex = -1;
                        len = queue.length;
                    }
                    currentQueue = null;
                    draining = false;
                    runClearTimeout(timeout);
                }
                process.nextTick = function (fun) {
                    var args = new Array(arguments.length - 1);
                    if (arguments.length > 1) {
                        for (var i = 1; i < arguments.length; i++) {
                            args[i - 1] = arguments[i];
                        }
                    }
                    queue.push(new Item(fun, args));
                    if (queue.length === 1 && !draining) {
                        runTimeout(drainQueue);
                    }
                };
                // v8 likes predictible objects
                function Item(fun, array) {
                    this.fun = fun;
                    this.array = array;
                }
                Item.prototype.run = function () {
                    this.fun.apply(null, this.array);
                };
                process.title = 'browser';
                process.browser = true;
                process.env = {};
                process.argv = [];
                process.version = ''; // empty string to avoid regexp issues
                process.versions = {};
                function noop() { }
                process.on = noop;
                process.addListener = noop;
                process.once = noop;
                process.off = noop;
                process.removeListener = noop;
                process.removeAllListeners = noop;
                process.emit = noop;
                process.binding = function (name) {
                    throw new Error('process.binding is not supported');
                };
                process.cwd = function () { return '/'; };
                process.chdir = function (dir) {
                    throw new Error('process.chdir is not supported');
                };
                process.umask = function () { return 0; };
            }, {}], 24: [function (require, module, exports) {
                module.exports = require("./lib/_stream_duplex.js");
            }, { "./lib/_stream_duplex.js": 25 }], 25: [function (require, module, exports) {
                // a duplex stream is just a stream that is both readable and writable.
                // Since JS doesn't have multiple prototypal inheritance, this class
                // prototypally inherits from Readable, and then parasitically from
                // Writable.
                'use strict';
                /*<replacement>*/
                var objectKeys = Object.keys || function (obj) {
                    var keys = [];
                    for (var key in obj) {
                        keys.push(key);
                    }
                    return keys;
                };
                /*</replacement>*/
                module.exports = Duplex;
                /*<replacement>*/
                var processNextTick = require('process-nextick-args');
                /*</replacement>*/
                /*<replacement>*/
                var util = require('core-util-is');
                util.inherits = require('inherits');
                /*</replacement>*/
                var Readable = require('./_stream_readable');
                var Writable = require('./_stream_writable');
                util.inherits(Duplex, Readable);
                var keys = objectKeys(Writable.prototype);
                for (var v = 0; v < keys.length; v++) {
                    var method = keys[v];
                    if (!Duplex.prototype[method])
                        Duplex.prototype[method] = Writable.prototype[method];
                }
                function Duplex(options) {
                    if (!(this instanceof Duplex))
                        return new Duplex(options);
                    Readable.call(this, options);
                    Writable.call(this, options);
                    if (options && options.readable === false)
                        this.readable = false;
                    if (options && options.writable === false)
                        this.writable = false;
                    this.allowHalfOpen = true;
                    if (options && options.allowHalfOpen === false)
                        this.allowHalfOpen = false;
                    this.once('end', onend);
                }
                // the no-half-open enforcer
                function onend() {
                    // if we allow half-open state, or if the writable side ended,
                    // then we're ok.
                    if (this.allowHalfOpen || this._writableState.ended)
                        return;
                    // no more data can be written.
                    // But allow more writes to happen in this tick.
                    processNextTick(onEndNT, this);
                }
                function onEndNT(self) {
                    self.end();
                }
                function forEach(xs, f) {
                    for (var i = 0, l = xs.length; i < l; i++) {
                        f(xs[i], i);
                    }
                }
            }, { "./_stream_readable": 27, "./_stream_writable": 29, "core-util-is": 13, "inherits": 18, "process-nextick-args": 22 }], 26: [function (require, module, exports) {
                // a passthrough stream.
                // basically just the most minimal sort of Transform stream.
                // Every written chunk gets output as-is.
                'use strict';
                module.exports = PassThrough;
                var Transform = require('./_stream_transform');
                /*<replacement>*/
                var util = require('core-util-is');
                util.inherits = require('inherits');
                /*</replacement>*/
                util.inherits(PassThrough, Transform);
                function PassThrough(options) {
                    if (!(this instanceof PassThrough))
                        return new PassThrough(options);
                    Transform.call(this, options);
                }
                PassThrough.prototype._transform = function (chunk, encoding, cb) {
                    cb(null, chunk);
                };
            }, { "./_stream_transform": 28, "core-util-is": 13, "inherits": 18 }], 27: [function (require, module, exports) {
                (function (process) {
                    'use strict';
                    module.exports = Readable;
                    /*<replacement>*/
                    var processNextTick = require('process-nextick-args');
                    /*</replacement>*/
                    /*<replacement>*/
                    var isArray = require('isarray');
                    /*</replacement>*/
                    Readable.ReadableState = ReadableState;
                    /*<replacement>*/
                    var EE = require('events').EventEmitter;
                    var EElistenerCount = function (emitter, type) {
                        return emitter.listeners(type).length;
                    };
                    /*</replacement>*/
                    /*<replacement>*/
                    var Stream;
                    (function () {
                        try {
                            Stream = require('st' + 'ream');
                        }
                        catch (_) { }
                        finally {
                            if (!Stream)
                                Stream = require('events').EventEmitter;
                        }
                    })();
                    /*</replacement>*/
                    var Buffer = require('buffer').Buffer;
                    /*<replacement>*/
                    var bufferShim = require('buffer-shims');
                    /*</replacement>*/
                    /*<replacement>*/
                    var util = require('core-util-is');
                    util.inherits = require('inherits');
                    /*</replacement>*/
                    /*<replacement>*/
                    var debugUtil = require('util');
                    var debug = void 0;
                    if (debugUtil && debugUtil.debuglog) {
                        debug = debugUtil.debuglog('stream');
                    }
                    else {
                        debug = function () { };
                    }
                    /*</replacement>*/
                    var BufferList = require('./internal/streams/BufferList');
                    var StringDecoder;
                    util.inherits(Readable, Stream);
                    function prependListener(emitter, event, fn) {
                        if (typeof emitter.prependListener === 'function') {
                            return emitter.prependListener(event, fn);
                        }
                        else {
                            // This is a hack to make sure that our error handler is attached before any
                            // userland ones.  NEVER DO THIS. This is here only because this code needs
                            // to continue to work with older versions of Node.js that do not include
                            // the prependListener() method. The goal is to eventually remove this hack.
                            if (!emitter._events || !emitter._events[event])
                                emitter.on(event, fn);
                            else if (isArray(emitter._events[event]))
                                emitter._events[event].unshift(fn);
                            else
                                emitter._events[event] = [fn, emitter._events[event]];
                        }
                    }
                    var Duplex;
                    function ReadableState(options, stream) {
                        Duplex = Duplex || require('./_stream_duplex');
                        options = options || {};
                        // object stream flag. Used to make read(n) ignore n and to
                        // make all the buffer merging and length checks go away
                        this.objectMode = !!options.objectMode;
                        if (stream instanceof Duplex)
                            this.objectMode = this.objectMode || !!options.readableObjectMode;
                        // the point at which it stops calling _read() to fill the buffer
                        // Note: 0 is a valid value, means "don't call _read preemptively ever"
                        var hwm = options.highWaterMark;
                        var defaultHwm = this.objectMode ? 16 : 16 * 1024;
                        this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
                        // cast to ints.
                        this.highWaterMark = ~~this.highWaterMark;
                        // A linked list is used to store data chunks instead of an array because the
                        // linked list can remove elements from the beginning faster than
                        // array.shift()
                        this.buffer = new BufferList();
                        this.length = 0;
                        this.pipes = null;
                        this.pipesCount = 0;
                        this.flowing = null;
                        this.ended = false;
                        this.endEmitted = false;
                        this.reading = false;
                        // a flag to be able to tell if the onwrite cb is called immediately,
                        // or on a later tick.  We set this to true at first, because any
                        // actions that shouldn't happen until "later" should generally also
                        // not happen before the first write call.
                        this.sync = true;
                        // whenever we return null, then we set a flag to say
                        // that we're awaiting a 'readable' event emission.
                        this.needReadable = false;
                        this.emittedReadable = false;
                        this.readableListening = false;
                        this.resumeScheduled = false;
                        // Crypto is kind of old and crusty.  Historically, its default string
                        // encoding is 'binary' so we have to make this configurable.
                        // Everything else in the universe uses 'utf8', though.
                        this.defaultEncoding = options.defaultEncoding || 'utf8';
                        // when piping, we only care about 'readable' events that happen
                        // after read()ing all the bytes and not getting any pushback.
                        this.ranOut = false;
                        // the number of writers that are awaiting a drain event in .pipe()s
                        this.awaitDrain = 0;
                        // if true, a maybeReadMore has been scheduled
                        this.readingMore = false;
                        this.decoder = null;
                        this.encoding = null;
                        if (options.encoding) {
                            if (!StringDecoder)
                                StringDecoder = require('string_decoder/').StringDecoder;
                            this.decoder = new StringDecoder(options.encoding);
                            this.encoding = options.encoding;
                        }
                    }
                    var Duplex;
                    function Readable(options) {
                        Duplex = Duplex || require('./_stream_duplex');
                        if (!(this instanceof Readable))
                            return new Readable(options);
                        this._readableState = new ReadableState(options, this);
                        // legacy
                        this.readable = true;
                        if (options && typeof options.read === 'function')
                            this._read = options.read;
                        Stream.call(this);
                    }
                    // Manually shove something into the read() buffer.
                    // This returns true if the highWaterMark has not been hit yet,
                    // similar to how Writable.write() returns true if you should
                    // write() some more.
                    Readable.prototype.push = function (chunk, encoding) {
                        var state = this._readableState;
                        if (!state.objectMode && typeof chunk === 'string') {
                            encoding = encoding || state.defaultEncoding;
                            if (encoding !== state.encoding) {
                                chunk = bufferShim.from(chunk, encoding);
                                encoding = '';
                            }
                        }
                        return readableAddChunk(this, state, chunk, encoding, false);
                    };
                    // Unshift should *always* be something directly out of read()
                    Readable.prototype.unshift = function (chunk) {
                        var state = this._readableState;
                        return readableAddChunk(this, state, chunk, '', true);
                    };
                    Readable.prototype.isPaused = function () {
                        return this._readableState.flowing === false;
                    };
                    function readableAddChunk(stream, state, chunk, encoding, addToFront) {
                        var er = chunkInvalid(state, chunk);
                        if (er) {
                            stream.emit('error', er);
                        }
                        else if (chunk === null) {
                            state.reading = false;
                            onEofChunk(stream, state);
                        }
                        else if (state.objectMode || chunk && chunk.length > 0) {
                            if (state.ended && !addToFront) {
                                var e = new Error('stream.push() after EOF');
                                stream.emit('error', e);
                            }
                            else if (state.endEmitted && addToFront) {
                                var _e = new Error('stream.unshift() after end event');
                                stream.emit('error', _e);
                            }
                            else {
                                var skipAdd;
                                if (state.decoder && !addToFront && !encoding) {
                                    chunk = state.decoder.write(chunk);
                                    skipAdd = !state.objectMode && chunk.length === 0;
                                }
                                if (!addToFront)
                                    state.reading = false;
                                // Don't add to the buffer if we've decoded to an empty string chunk and
                                // we're not in object mode
                                if (!skipAdd) {
                                    // if we want the data now, just emit it.
                                    if (state.flowing && state.length === 0 && !state.sync) {
                                        stream.emit('data', chunk);
                                        stream.read(0);
                                    }
                                    else {
                                        // update the buffer info.
                                        state.length += state.objectMode ? 1 : chunk.length;
                                        if (addToFront)
                                            state.buffer.unshift(chunk);
                                        else
                                            state.buffer.push(chunk);
                                        if (state.needReadable)
                                            emitReadable(stream);
                                    }
                                }
                                maybeReadMore(stream, state);
                            }
                        }
                        else if (!addToFront) {
                            state.reading = false;
                        }
                        return needMoreData(state);
                    }
                    // if it's past the high water mark, we can push in some more.
                    // Also, if we have no data yet, we can stand some
                    // more bytes.  This is to work around cases where hwm=0,
                    // such as the repl.  Also, if the push() triggered a
                    // readable event, and the user called read(largeNumber) such that
                    // needReadable was set, then we ought to push more, so that another
                    // 'readable' event will be triggered.
                    function needMoreData(state) {
                        return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
                    }
                    // backwards compatibility.
                    Readable.prototype.setEncoding = function (enc) {
                        if (!StringDecoder)
                            StringDecoder = require('string_decoder/').StringDecoder;
                        this._readableState.decoder = new StringDecoder(enc);
                        this._readableState.encoding = enc;
                        return this;
                    };
                    // Don't raise the hwm > 8MB
                    var MAX_HWM = 0x800000;
                    function computeNewHighWaterMark(n) {
                        if (n >= MAX_HWM) {
                            n = MAX_HWM;
                        }
                        else {
                            // Get the next highest power of 2 to prevent increasing hwm excessively in
                            // tiny amounts
                            n--;
                            n |= n >>> 1;
                            n |= n >>> 2;
                            n |= n >>> 4;
                            n |= n >>> 8;
                            n |= n >>> 16;
                            n++;
                        }
                        return n;
                    }
                    // This function is designed to be inlinable, so please take care when making
                    // changes to the function body.
                    function howMuchToRead(n, state) {
                        if (n <= 0 || state.length === 0 && state.ended)
                            return 0;
                        if (state.objectMode)
                            return 1;
                        if (n !== n) {
                            // Only flow one buffer at a time
                            if (state.flowing && state.length)
                                return state.buffer.head.data.length;
                            else
                                return state.length;
                        }
                        // If we're asking for more than the current hwm, then raise the hwm.
                        if (n > state.highWaterMark)
                            state.highWaterMark = computeNewHighWaterMark(n);
                        if (n <= state.length)
                            return n;
                        // Don't have enough
                        if (!state.ended) {
                            state.needReadable = true;
                            return 0;
                        }
                        return state.length;
                    }
                    // you can override either this method, or the async _read(n) below.
                    Readable.prototype.read = function (n) {
                        debug('read', n);
                        n = parseInt(n, 10);
                        var state = this._readableState;
                        var nOrig = n;
                        if (n !== 0)
                            state.emittedReadable = false;
                        // if we're doing read(0) to trigger a readable event, but we
                        // already have a bunch of data in the buffer, then just trigger
                        // the 'readable' event and move on.
                        if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
                            debug('read: emitReadable', state.length, state.ended);
                            if (state.length === 0 && state.ended)
                                endReadable(this);
                            else
                                emitReadable(this);
                            return null;
                        }
                        n = howMuchToRead(n, state);
                        // if we've ended, and we're now clear, then finish it up.
                        if (n === 0 && state.ended) {
                            if (state.length === 0)
                                endReadable(this);
                            return null;
                        }
                        // All the actual chunk generation logic needs to be
                        // *below* the call to _read.  The reason is that in certain
                        // synthetic stream cases, such as passthrough streams, _read
                        // may be a completely synchronous operation which may change
                        // the state of the read buffer, providing enough data when
                        // before there was *not* enough.
                        //
                        // So, the steps are:
                        // 1. Figure out what the state of things will be after we do
                        // a read from the buffer.
                        //
                        // 2. If that resulting state will trigger a _read, then call _read.
                        // Note that this may be asynchronous, or synchronous.  Yes, it is
                        // deeply ugly to write APIs this way, but that still doesn't mean
                        // that the Readable class should behave improperly, as streams are
                        // designed to be sync/async agnostic.
                        // Take note if the _read call is sync or async (ie, if the read call
                        // has returned yet), so that we know whether or not it's safe to emit
                        // 'readable' etc.
                        //
                        // 3. Actually pull the requested chunks out of the buffer and return.
                        // if we need a readable event, then we need to do some reading.
                        var doRead = state.needReadable;
                        debug('need readable', doRead);
                        // if we currently have less than the highWaterMark, then also read some
                        if (state.length === 0 || state.length - n < state.highWaterMark) {
                            doRead = true;
                            debug('length less than watermark', doRead);
                        }
                        // however, if we've ended, then there's no point, and if we're already
                        // reading, then it's unnecessary.
                        if (state.ended || state.reading) {
                            doRead = false;
                            debug('reading or ended', doRead);
                        }
                        else if (doRead) {
                            debug('do read');
                            state.reading = true;
                            state.sync = true;
                            // if the length is currently zero, then we *need* a readable event.
                            if (state.length === 0)
                                state.needReadable = true;
                            // call internal read method
                            this._read(state.highWaterMark);
                            state.sync = false;
                            // If _read pushed data synchronously, then `reading` will be false,
                            // and we need to re-evaluate how much data we can return to the user.
                            if (!state.reading)
                                n = howMuchToRead(nOrig, state);
                        }
                        var ret;
                        if (n > 0)
                            ret = fromList(n, state);
                        else
                            ret = null;
                        if (ret === null) {
                            state.needReadable = true;
                            n = 0;
                        }
                        else {
                            state.length -= n;
                        }
                        if (state.length === 0) {
                            // If we have nothing in the buffer, then we want to know
                            // as soon as we *do* get something into the buffer.
                            if (!state.ended)
                                state.needReadable = true;
                            // If we tried to read() past the EOF, then emit end on the next tick.
                            if (nOrig !== n && state.ended)
                                endReadable(this);
                        }
                        if (ret !== null)
                            this.emit('data', ret);
                        return ret;
                    };
                    function chunkInvalid(state, chunk) {
                        var er = null;
                        if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
                            er = new TypeError('Invalid non-string/buffer chunk');
                        }
                        return er;
                    }
                    function onEofChunk(stream, state) {
                        if (state.ended)
                            return;
                        if (state.decoder) {
                            var chunk = state.decoder.end();
                            if (chunk && chunk.length) {
                                state.buffer.push(chunk);
                                state.length += state.objectMode ? 1 : chunk.length;
                            }
                        }
                        state.ended = true;
                        // emit 'readable' now to make sure it gets picked up.
                        emitReadable(stream);
                    }
                    // Don't emit readable right away in sync mode, because this can trigger
                    // another read() call => stack overflow.  This way, it might trigger
                    // a nextTick recursion warning, but that's not so bad.
                    function emitReadable(stream) {
                        var state = stream._readableState;
                        state.needReadable = false;
                        if (!state.emittedReadable) {
                            debug('emitReadable', state.flowing);
                            state.emittedReadable = true;
                            if (state.sync)
                                processNextTick(emitReadable_, stream);
                            else
                                emitReadable_(stream);
                        }
                    }
                    function emitReadable_(stream) {
                        debug('emit readable');
                        stream.emit('readable');
                        flow(stream);
                    }
                    // at this point, the user has presumably seen the 'readable' event,
                    // and called read() to consume some data.  that may have triggered
                    // in turn another _read(n) call, in which case reading = true if
                    // it's in progress.
                    // However, if we're not ended, or reading, and the length < hwm,
                    // then go ahead and try to read some more preemptively.
                    function maybeReadMore(stream, state) {
                        if (!state.readingMore) {
                            state.readingMore = true;
                            processNextTick(maybeReadMore_, stream, state);
                        }
                    }
                    function maybeReadMore_(stream, state) {
                        var len = state.length;
                        while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
                            debug('maybeReadMore read 0');
                            stream.read(0);
                            if (len === state.length)
                                // didn't get any data, stop spinning.
                                break;
                            else
                                len = state.length;
                        }
                        state.readingMore = false;
                    }
                    // abstract method.  to be overridden in specific implementation classes.
                    // call cb(er, data) where data is <= n in length.
                    // for virtual (non-string, non-buffer) streams, "length" is somewhat
                    // arbitrary, and perhaps not very meaningful.
                    Readable.prototype._read = function (n) {
                        this.emit('error', new Error('not implemented'));
                    };
                    Readable.prototype.pipe = function (dest, pipeOpts) {
                        var src = this;
                        var state = this._readableState;
                        switch (state.pipesCount) {
                            case 0:
                                state.pipes = dest;
                                break;
                            case 1:
                                state.pipes = [state.pipes, dest];
                                break;
                            default:
                                state.pipes.push(dest);
                                break;
                        }
                        state.pipesCount += 1;
                        debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
                        var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
                        var endFn = doEnd ? onend : cleanup;
                        if (state.endEmitted)
                            processNextTick(endFn);
                        else
                            src.once('end', endFn);
                        dest.on('unpipe', onunpipe);
                        function onunpipe(readable) {
                            debug('onunpipe');
                            if (readable === src) {
                                cleanup();
                            }
                        }
                        function onend() {
                            debug('onend');
                            dest.end();
                        }
                        // when the dest drains, it reduces the awaitDrain counter
                        // on the source.  This would be more elegant with a .once()
                        // handler in flow(), but adding and removing repeatedly is
                        // too slow.
                        var ondrain = pipeOnDrain(src);
                        dest.on('drain', ondrain);
                        var cleanedUp = false;
                        function cleanup() {
                            debug('cleanup');
                            // cleanup event handlers once the pipe is broken
                            dest.removeListener('close', onclose);
                            dest.removeListener('finish', onfinish);
                            dest.removeListener('drain', ondrain);
                            dest.removeListener('error', onerror);
                            dest.removeListener('unpipe', onunpipe);
                            src.removeListener('end', onend);
                            src.removeListener('end', cleanup);
                            src.removeListener('data', ondata);
                            cleanedUp = true;
                            // if the reader is waiting for a drain event from this
                            // specific writer, then it would cause it to never start
                            // flowing again.
                            // So, if this is awaiting a drain, then we just call it now.
                            // If we don't know, then assume that we are waiting for one.
                            if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
                                ondrain();
                        }
                        // If the user pushes more data while we're writing to dest then we'll end up
                        // in ondata again. However, we only want to increase awaitDrain once because
                        // dest will only emit one 'drain' event for the multiple writes.
                        // => Introduce a guard on increasing awaitDrain.
                        var increasedAwaitDrain = false;
                        src.on('data', ondata);
                        function ondata(chunk) {
                            debug('ondata');
                            increasedAwaitDrain = false;
                            var ret = dest.write(chunk);
                            if (false === ret && !increasedAwaitDrain) {
                                // If the user unpiped during `dest.write()`, it is possible
                                // to get stuck in a permanently paused state if that write
                                // also returned false.
                                // => Check whether `dest` is still a piping destination.
                                if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
                                    debug('false write response, pause', src._readableState.awaitDrain);
                                    src._readableState.awaitDrain++;
                                    increasedAwaitDrain = true;
                                }
                                src.pause();
                            }
                        }
                        // if the dest has an error, then stop piping into it.
                        // however, don't suppress the throwing behavior for this.
                        function onerror(er) {
                            debug('onerror', er);
                            unpipe();
                            dest.removeListener('error', onerror);
                            if (EElistenerCount(dest, 'error') === 0)
                                dest.emit('error', er);
                        }
                        // Make sure our error handler is attached before userland ones.
                        prependListener(dest, 'error', onerror);
                        // Both close and finish should trigger unpipe, but only once.
                        function onclose() {
                            dest.removeListener('finish', onfinish);
                            unpipe();
                        }
                        dest.once('close', onclose);
                        function onfinish() {
                            debug('onfinish');
                            dest.removeListener('close', onclose);
                            unpipe();
                        }
                        dest.once('finish', onfinish);
                        function unpipe() {
                            debug('unpipe');
                            src.unpipe(dest);
                        }
                        // tell the dest that it's being piped to
                        dest.emit('pipe', src);
                        // start the flow if it hasn't been started already.
                        if (!state.flowing) {
                            debug('pipe resume');
                            src.resume();
                        }
                        return dest;
                    };
                    function pipeOnDrain(src) {
                        return function () {
                            var state = src._readableState;
                            debug('pipeOnDrain', state.awaitDrain);
                            if (state.awaitDrain)
                                state.awaitDrain--;
                            if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
                                state.flowing = true;
                                flow(src);
                            }
                        };
                    }
                    Readable.prototype.unpipe = function (dest) {
                        var state = this._readableState;
                        // if we're not piping anywhere, then do nothing.
                        if (state.pipesCount === 0)
                            return this;
                        // just one destination.  most common case.
                        if (state.pipesCount === 1) {
                            // passed in one, but it's not the right one.
                            if (dest && dest !== state.pipes)
                                return this;
                            if (!dest)
                                dest = state.pipes;
                            // got a match.
                            state.pipes = null;
                            state.pipesCount = 0;
                            state.flowing = false;
                            if (dest)
                                dest.emit('unpipe', this);
                            return this;
                        }
                        // slow case. multiple pipe destinations.
                        if (!dest) {
                            // remove all.
                            var dests = state.pipes;
                            var len = state.pipesCount;
                            state.pipes = null;
                            state.pipesCount = 0;
                            state.flowing = false;
                            for (var _i = 0; _i < len; _i++) {
                                dests[_i].emit('unpipe', this);
                            }
                            return this;
                        }
                        // try to find the right one.
                        var i = indexOf(state.pipes, dest);
                        if (i === -1)
                            return this;
                        state.pipes.splice(i, 1);
                        state.pipesCount -= 1;
                        if (state.pipesCount === 1)
                            state.pipes = state.pipes[0];
                        dest.emit('unpipe', this);
                        return this;
                    };
                    // set up data events if they are asked for
                    // Ensure readable listeners eventually get something
                    Readable.prototype.on = function (ev, fn) {
                        var res = Stream.prototype.on.call(this, ev, fn);
                        if (ev === 'data') {
                            // Start flowing on next tick if stream isn't explicitly paused
                            if (this._readableState.flowing !== false)
                                this.resume();
                        }
                        else if (ev === 'readable') {
                            var state = this._readableState;
                            if (!state.endEmitted && !state.readableListening) {
                                state.readableListening = state.needReadable = true;
                                state.emittedReadable = false;
                                if (!state.reading) {
                                    processNextTick(nReadingNextTick, this);
                                }
                                else if (state.length) {
                                    emitReadable(this, state);
                                }
                            }
                        }
                        return res;
                    };
                    Readable.prototype.addListener = Readable.prototype.on;
                    function nReadingNextTick(self) {
                        debug('readable nexttick read 0');
                        self.read(0);
                    }
                    // pause() and resume() are remnants of the legacy readable stream API
                    // If the user uses them, then switch into old mode.
                    Readable.prototype.resume = function () {
                        var state = this._readableState;
                        if (!state.flowing) {
                            debug('resume');
                            state.flowing = true;
                            resume(this, state);
                        }
                        return this;
                    };
                    function resume(stream, state) {
                        if (!state.resumeScheduled) {
                            state.resumeScheduled = true;
                            processNextTick(resume_, stream, state);
                        }
                    }
                    function resume_(stream, state) {
                        if (!state.reading) {
                            debug('resume read 0');
                            stream.read(0);
                        }
                        state.resumeScheduled = false;
                        state.awaitDrain = 0;
                        stream.emit('resume');
                        flow(stream);
                        if (state.flowing && !state.reading)
                            stream.read(0);
                    }
                    Readable.prototype.pause = function () {
                        debug('call pause flowing=%j', this._readableState.flowing);
                        if (false !== this._readableState.flowing) {
                            debug('pause');
                            this._readableState.flowing = false;
                            this.emit('pause');
                        }
                        return this;
                    };
                    function flow(stream) {
                        var state = stream._readableState;
                        debug('flow', state.flowing);
                        while (state.flowing && stream.read() !== null) { }
                    }
                    // wrap an old-style stream as the async data source.
                    // This is *not* part of the readable stream interface.
                    // It is an ugly unfortunate mess of history.
                    Readable.prototype.wrap = function (stream) {
                        var state = this._readableState;
                        var paused = false;
                        var self = this;
                        stream.on('end', function () {
                            debug('wrapped end');
                            if (state.decoder && !state.ended) {
                                var chunk = state.decoder.end();
                                if (chunk && chunk.length)
                                    self.push(chunk);
                            }
                            self.push(null);
                        });
                        stream.on('data', function (chunk) {
                            debug('wrapped data');
                            if (state.decoder)
                                chunk = state.decoder.write(chunk);
                            // don't skip over falsy values in objectMode
                            if (state.objectMode && (chunk === null || chunk === undefined))
                                return;
                            else if (!state.objectMode && (!chunk || !chunk.length))
                                return;
                            var ret = self.push(chunk);
                            if (!ret) {
                                paused = true;
                                stream.pause();
                            }
                        });
                        // proxy all the other methods.
                        // important when wrapping filters and duplexes.
                        for (var i in stream) {
                            if (this[i] === undefined && typeof stream[i] === 'function') {
                                this[i] = function (method) {
                                    return function () {
                                        return stream[method].apply(stream, arguments);
                                    };
                                }(i);
                            }
                        }
                        // proxy certain important events.
                        var events = ['error', 'close', 'destroy', 'pause', 'resume'];
                        forEach(events, function (ev) {
                            stream.on(ev, self.emit.bind(self, ev));
                        });
                        // when we try to consume some more bytes, simply unpause the
                        // underlying stream.
                        self._read = function (n) {
                            debug('wrapped _read', n);
                            if (paused) {
                                paused = false;
                                stream.resume();
                            }
                        };
                        return self;
                    };
                    // exposed for testing purposes only.
                    Readable._fromList = fromList;
                    // Pluck off n bytes from an array of buffers.
                    // Length is the combined lengths of all the buffers in the list.
                    // This function is designed to be inlinable, so please take care when making
                    // changes to the function body.
                    function fromList(n, state) {
                        // nothing buffered
                        if (state.length === 0)
                            return null;
                        var ret;
                        if (state.objectMode)
                            ret = state.buffer.shift();
                        else if (!n || n >= state.length) {
                            // read it all, truncate the list
                            if (state.decoder)
                                ret = state.buffer.join('');
                            else if (state.buffer.length === 1)
                                ret = state.buffer.head.data;
                            else
                                ret = state.buffer.concat(state.length);
                            state.buffer.clear();
                        }
                        else {
                            // read part of list
                            ret = fromListPartial(n, state.buffer, state.decoder);
                        }
                        return ret;
                    }
                    // Extracts only enough buffered data to satisfy the amount requested.
                    // This function is designed to be inlinable, so please take care when making
                    // changes to the function body.
                    function fromListPartial(n, list, hasStrings) {
                        var ret;
                        if (n < list.head.data.length) {
                            // slice is the same for buffers and strings
                            ret = list.head.data.slice(0, n);
                            list.head.data = list.head.data.slice(n);
                        }
                        else if (n === list.head.data.length) {
                            // first chunk is a perfect match
                            ret = list.shift();
                        }
                        else {
                            // result spans more than one buffer
                            ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
                        }
                        return ret;
                    }
                    // Copies a specified amount of characters from the list of buffered data
                    // chunks.
                    // This function is designed to be inlinable, so please take care when making
                    // changes to the function body.
                    function copyFromBufferString(n, list) {
                        var p = list.head;
                        var c = 1;
                        var ret = p.data;
                        n -= ret.length;
                        while (p = p.next) {
                            var str = p.data;
                            var nb = n > str.length ? str.length : n;
                            if (nb === str.length)
                                ret += str;
                            else
                                ret += str.slice(0, n);
                            n -= nb;
                            if (n === 0) {
                                if (nb === str.length) {
                                    ++c;
                                    if (p.next)
                                        list.head = p.next;
                                    else
                                        list.head = list.tail = null;
                                }
                                else {
                                    list.head = p;
                                    p.data = str.slice(nb);
                                }
                                break;
                            }
                            ++c;
                        }
                        list.length -= c;
                        return ret;
                    }
                    // Copies a specified amount of bytes from the list of buffered data chunks.
                    // This function is designed to be inlinable, so please take care when making
                    // changes to the function body.
                    function copyFromBuffer(n, list) {
                        var ret = bufferShim.allocUnsafe(n);
                        var p = list.head;
                        var c = 1;
                        p.data.copy(ret);
                        n -= p.data.length;
                        while (p = p.next) {
                            var buf = p.data;
                            var nb = n > buf.length ? buf.length : n;
                            buf.copy(ret, ret.length - n, 0, nb);
                            n -= nb;
                            if (n === 0) {
                                if (nb === buf.length) {
                                    ++c;
                                    if (p.next)
                                        list.head = p.next;
                                    else
                                        list.head = list.tail = null;
                                }
                                else {
                                    list.head = p;
                                    p.data = buf.slice(nb);
                                }
                                break;
                            }
                            ++c;
                        }
                        list.length -= c;
                        return ret;
                    }
                    function endReadable(stream) {
                        var state = stream._readableState;
                        // If we get here before consuming all the bytes, then that is a
                        // bug in node.  Should never happen.
                        if (state.length > 0)
                            throw new Error('"endReadable()" called on non-empty stream');
                        if (!state.endEmitted) {
                            state.ended = true;
                            processNextTick(endReadableNT, state, stream);
                        }
                    }
                    function endReadableNT(state, stream) {
                        // Check that we didn't get one last unshift.
                        if (!state.endEmitted && state.length === 0) {
                            state.endEmitted = true;
                            stream.readable = false;
                            stream.emit('end');
                        }
                    }
                    function forEach(xs, f) {
                        for (var i = 0, l = xs.length; i < l; i++) {
                            f(xs[i], i);
                        }
                    }
                    function indexOf(xs, x) {
                        for (var i = 0, l = xs.length; i < l; i++) {
                            if (xs[i] === x)
                                return i;
                        }
                        return -1;
                    }
                }).call(this, require('_process'));
            }, { "./_stream_duplex": 25, "./internal/streams/BufferList": 30, "_process": 23, "buffer": 11, "buffer-shims": 10, "core-util-is": 13, "events": 16, "inherits": 18, "isarray": 20, "process-nextick-args": 22, "string_decoder/": 36, "util": 9 }], 28: [function (require, module, exports) {
                // a transform stream is a readable/writable stream where you do
                // something with the data.  Sometimes it's called a "filter",
                // but that's not a great name for it, since that implies a thing where
                // some bits pass through, and others are simply ignored.  (That would
                // be a valid example of a transform, of course.)
                //
                // While the output is causally related to the input, it's not a
                // necessarily symmetric or synchronous transformation.  For example,
                // a zlib stream might take multiple plain-text writes(), and then
                // emit a single compressed chunk some time in the future.
                //
                // Here's how this works:
                //
                // The Transform stream has all the aspects of the readable and writable
                // stream classes.  When you write(chunk), that calls _write(chunk,cb)
                // internally, and returns false if there's a lot of pending writes
                // buffered up.  When you call read(), that calls _read(n) until
                // there's enough pending readable data buffered up.
                //
                // In a transform stream, the written data is placed in a buffer.  When
                // _read(n) is called, it transforms the queued up data, calling the
                // buffered _write cb's as it consumes chunks.  If consuming a single
                // written chunk would result in multiple output chunks, then the first
                // outputted bit calls the readcb, and subsequent chunks just go into
                // the read buffer, and will cause it to emit 'readable' if necessary.
                //
                // This way, back-pressure is actually determined by the reading side,
                // since _read has to be called to start processing a new chunk.  However,
                // a pathological inflate type of transform can cause excessive buffering
                // here.  For example, imagine a stream where every byte of input is
                // interpreted as an integer from 0-255, and then results in that many
                // bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
                // 1kb of data being output.  In this case, you could write a very small
                // amount of input, and end up with a very large amount of output.  In
                // such a pathological inflating mechanism, there'd be no way to tell
                // the system to stop doing the transform.  A single 4MB write could
                // cause the system to run out of memory.
                //
                // However, even in such a pathological case, only a single written chunk
                // would be consumed, and then the rest would wait (un-transformed) until
                // the results of the previous transformed chunk were consumed.
                'use strict';
                module.exports = Transform;
                var Duplex = require('./_stream_duplex');
                /*<replacement>*/
                var util = require('core-util-is');
                util.inherits = require('inherits');
                /*</replacement>*/
                util.inherits(Transform, Duplex);
                function TransformState(stream) {
                    this.afterTransform = function (er, data) {
                        return afterTransform(stream, er, data);
                    };
                    this.needTransform = false;
                    this.transforming = false;
                    this.writecb = null;
                    this.writechunk = null;
                    this.writeencoding = null;
                }
                function afterTransform(stream, er, data) {
                    var ts = stream._transformState;
                    ts.transforming = false;
                    var cb = ts.writecb;
                    if (!cb)
                        return stream.emit('error', new Error('no writecb in Transform class'));
                    ts.writechunk = null;
                    ts.writecb = null;
                    if (data !== null && data !== undefined)
                        stream.push(data);
                    cb(er);
                    var rs = stream._readableState;
                    rs.reading = false;
                    if (rs.needReadable || rs.length < rs.highWaterMark) {
                        stream._read(rs.highWaterMark);
                    }
                }
                function Transform(options) {
                    if (!(this instanceof Transform))
                        return new Transform(options);
                    Duplex.call(this, options);
                    this._transformState = new TransformState(this);
                    // when the writable side finishes, then flush out anything remaining.
                    var stream = this;
                    // start out asking for a readable event once data is transformed.
                    this._readableState.needReadable = true;
                    // we have implemented the _read method, and done the other things
                    // that Readable wants before the first _read call, so unset the
                    // sync guard flag.
                    this._readableState.sync = false;
                    if (options) {
                        if (typeof options.transform === 'function')
                            this._transform = options.transform;
                        if (typeof options.flush === 'function')
                            this._flush = options.flush;
                    }
                    this.once('prefinish', function () {
                        if (typeof this._flush === 'function')
                            this._flush(function (er) {
                                done(stream, er);
                            });
                        else
                            done(stream);
                    });
                }
                Transform.prototype.push = function (chunk, encoding) {
                    this._transformState.needTransform = false;
                    return Duplex.prototype.push.call(this, chunk, encoding);
                };
                // This is the part where you do stuff!
                // override this function in implementation classes.
                // 'chunk' is an input chunk.
                //
                // Call `push(newChunk)` to pass along transformed output
                // to the readable side.  You may call 'push' zero or more times.
                //
                // Call `cb(err)` when you are done with this chunk.  If you pass
                // an error, then that'll put the hurt on the whole operation.  If you
                // never call cb(), then you'll never get another chunk.
                Transform.prototype._transform = function (chunk, encoding, cb) {
                    throw new Error('Not implemented');
                };
                Transform.prototype._write = function (chunk, encoding, cb) {
                    var ts = this._transformState;
                    ts.writecb = cb;
                    ts.writechunk = chunk;
                    ts.writeencoding = encoding;
                    if (!ts.transforming) {
                        var rs = this._readableState;
                        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
                            this._read(rs.highWaterMark);
                    }
                };
                // Doesn't matter what the args are here.
                // _transform does all the work.
                // That we got here means that the readable side wants more data.
                Transform.prototype._read = function (n) {
                    var ts = this._transformState;
                    if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
                        ts.transforming = true;
                        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
                    }
                    else {
                        // mark that we need a transform, so that any data that comes in
                        // will get processed, now that we've asked for it.
                        ts.needTransform = true;
                    }
                };
                function done(stream, er) {
                    if (er)
                        return stream.emit('error', er);
                    // if there's nothing in the write buffer, then that means
                    // that nothing more will ever be provided
                    var ws = stream._writableState;
                    var ts = stream._transformState;
                    if (ws.length)
                        throw new Error('Calling transform done when ws.length != 0');
                    if (ts.transforming)
                        throw new Error('Calling transform done when still transforming');
                    return stream.push(null);
                }
            }, { "./_stream_duplex": 25, "core-util-is": 13, "inherits": 18 }], 29: [function (require, module, exports) {
                (function (process) {
                    // A bit simpler than readable streams.
                    // Implement an async ._write(chunk, encoding, cb), and it'll handle all
                    // the drain event emission and buffering.
                    'use strict';
                    module.exports = Writable;
                    /*<replacement>*/
                    var processNextTick = require('process-nextick-args');
                    /*</replacement>*/
                    /*<replacement>*/
                    var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
                    /*</replacement>*/
                    Writable.WritableState = WritableState;
                    /*<replacement>*/
                    var util = require('core-util-is');
                    util.inherits = require('inherits');
                    /*</replacement>*/
                    /*<replacement>*/
                    var internalUtil = {
                        deprecate: require('util-deprecate')
                    };
                    /*</replacement>*/
                    /*<replacement>*/
                    var Stream;
                    (function () {
                        try {
                            Stream = require('st' + 'ream');
                        }
                        catch (_) { }
                        finally {
                            if (!Stream)
                                Stream = require('events').EventEmitter;
                        }
                    })();
                    /*</replacement>*/
                    var Buffer = require('buffer').Buffer;
                    /*<replacement>*/
                    var bufferShim = require('buffer-shims');
                    /*</replacement>*/
                    util.inherits(Writable, Stream);
                    function nop() { }
                    function WriteReq(chunk, encoding, cb) {
                        this.chunk = chunk;
                        this.encoding = encoding;
                        this.callback = cb;
                        this.next = null;
                    }
                    var Duplex;
                    function WritableState(options, stream) {
                        Duplex = Duplex || require('./_stream_duplex');
                        options = options || {};
                        // object stream flag to indicate whether or not this stream
                        // contains buffers or objects.
                        this.objectMode = !!options.objectMode;
                        if (stream instanceof Duplex)
                            this.objectMode = this.objectMode || !!options.writableObjectMode;
                        // the point at which write() starts returning false
                        // Note: 0 is a valid value, means that we always return false if
                        // the entire buffer is not flushed immediately on write()
                        var hwm = options.highWaterMark;
                        var defaultHwm = this.objectMode ? 16 : 16 * 1024;
                        this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
                        // cast to ints.
                        this.highWaterMark = ~~this.highWaterMark;
                        this.needDrain = false;
                        // at the start of calling end()
                        this.ending = false;
                        // when end() has been called, and returned
                        this.ended = false;
                        // when 'finish' is emitted
                        this.finished = false;
                        // should we decode strings into buffers before passing to _write?
                        // this is here so that some node-core streams can optimize string
                        // handling at a lower level.
                        var noDecode = options.decodeStrings === false;
                        this.decodeStrings = !noDecode;
                        // Crypto is kind of old and crusty.  Historically, its default string
                        // encoding is 'binary' so we have to make this configurable.
                        // Everything else in the universe uses 'utf8', though.
                        this.defaultEncoding = options.defaultEncoding || 'utf8';
                        // not an actual buffer we keep track of, but a measurement
                        // of how much we're waiting to get pushed to some underlying
                        // socket or file.
                        this.length = 0;
                        // a flag to see when we're in the middle of a write.
                        this.writing = false;
                        // when true all writes will be buffered until .uncork() call
                        this.corked = 0;
                        // a flag to be able to tell if the onwrite cb is called immediately,
                        // or on a later tick.  We set this to true at first, because any
                        // actions that shouldn't happen until "later" should generally also
                        // not happen before the first write call.
                        this.sync = true;
                        // a flag to know if we're processing previously buffered items, which
                        // may call the _write() callback in the same tick, so that we don't
                        // end up in an overlapped onwrite situation.
                        this.bufferProcessing = false;
                        // the callback that's passed to _write(chunk,cb)
                        this.onwrite = function (er) {
                            onwrite(stream, er);
                        };
                        // the callback that the user supplies to write(chunk,encoding,cb)
                        this.writecb = null;
                        // the amount that is being written when _write is called.
                        this.writelen = 0;
                        this.bufferedRequest = null;
                        this.lastBufferedRequest = null;
                        // number of pending user-supplied write callbacks
                        // this must be 0 before 'finish' can be emitted
                        this.pendingcb = 0;
                        // emit prefinish if the only thing we're waiting for is _write cbs
                        // This is relevant for synchronous Transform streams
                        this.prefinished = false;
                        // True if the error was already emitted and should not be thrown again
                        this.errorEmitted = false;
                        // count buffered requests
                        this.bufferedRequestCount = 0;
                        // allocate the first CorkedRequest, there is always
                        // one allocated and free to use, and we maintain at most two
                        this.corkedRequestsFree = new CorkedRequest(this);
                    }
                    WritableState.prototype.getBuffer = function writableStateGetBuffer() {
                        var current = this.bufferedRequest;
                        var out = [];
                        while (current) {
                            out.push(current);
                            current = current.next;
                        }
                        return out;
                    };
                    (function () {
                        try {
                            Object.defineProperty(WritableState.prototype, 'buffer', {
                                get: internalUtil.deprecate(function () {
                                    return this.getBuffer();
                                }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
                            });
                        }
                        catch (_) { }
                    })();
                    var Duplex;
                    function Writable(options) {
                        Duplex = Duplex || require('./_stream_duplex');
                        // Writable ctor is applied to Duplexes, though they're not
                        // instanceof Writable, they're instanceof Readable.
                        if (!(this instanceof Writable) && !(this instanceof Duplex))
                            return new Writable(options);
                        this._writableState = new WritableState(options, this);
                        // legacy.
                        this.writable = true;
                        if (options) {
                            if (typeof options.write === 'function')
                                this._write = options.write;
                            if (typeof options.writev === 'function')
                                this._writev = options.writev;
                        }
                        Stream.call(this);
                    }
                    // Otherwise people can pipe Writable streams, which is just wrong.
                    Writable.prototype.pipe = function () {
                        this.emit('error', new Error('Cannot pipe, not readable'));
                    };
                    function writeAfterEnd(stream, cb) {
                        var er = new Error('write after end');
                        // TODO: defer error events consistently everywhere, not just the cb
                        stream.emit('error', er);
                        processNextTick(cb, er);
                    }
                    // If we get something that is not a buffer, string, null, or undefined,
                    // and we're not in objectMode, then that's an error.
                    // Otherwise stream chunks are all considered to be of length=1, and the
                    // watermarks determine how many objects to keep in the buffer, rather than
                    // how many bytes or characters.
                    function validChunk(stream, state, chunk, cb) {
                        var valid = true;
                        var er = false;
                        // Always throw error if a null is written
                        // if we are not in object mode then throw
                        // if it is not a buffer, string, or undefined.
                        if (chunk === null) {
                            er = new TypeError('May not write null values to stream');
                        }
                        else if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
                            er = new TypeError('Invalid non-string/buffer chunk');
                        }
                        if (er) {
                            stream.emit('error', er);
                            processNextTick(cb, er);
                            valid = false;
                        }
                        return valid;
                    }
                    Writable.prototype.write = function (chunk, encoding, cb) {
                        var state = this._writableState;
                        var ret = false;
                        if (typeof encoding === 'function') {
                            cb = encoding;
                            encoding = null;
                        }
                        if (Buffer.isBuffer(chunk))
                            encoding = 'buffer';
                        else if (!encoding)
                            encoding = state.defaultEncoding;
                        if (typeof cb !== 'function')
                            cb = nop;
                        if (state.ended)
                            writeAfterEnd(this, cb);
                        else if (validChunk(this, state, chunk, cb)) {
                            state.pendingcb++;
                            ret = writeOrBuffer(this, state, chunk, encoding, cb);
                        }
                        return ret;
                    };
                    Writable.prototype.cork = function () {
                        var state = this._writableState;
                        state.corked++;
                    };
                    Writable.prototype.uncork = function () {
                        var state = this._writableState;
                        if (state.corked) {
                            state.corked--;
                            if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest)
                                clearBuffer(this, state);
                        }
                    };
                    Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
                        // node::ParseEncoding() requires lower case.
                        if (typeof encoding === 'string')
                            encoding = encoding.toLowerCase();
                        if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1))
                            throw new TypeError('Unknown encoding: ' + encoding);
                        this._writableState.defaultEncoding = encoding;
                        return this;
                    };
                    function decodeChunk(state, chunk, encoding) {
                        if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
                            chunk = bufferShim.from(chunk, encoding);
                        }
                        return chunk;
                    }
                    // if we're already writing something, then just put this
                    // in the queue, and wait our turn.  Otherwise, call _write
                    // If we return false, then we need a drain event, so set that flag.
                    function writeOrBuffer(stream, state, chunk, encoding, cb) {
                        chunk = decodeChunk(state, chunk, encoding);
                        if (Buffer.isBuffer(chunk))
                            encoding = 'buffer';
                        var len = state.objectMode ? 1 : chunk.length;
                        state.length += len;
                        var ret = state.length < state.highWaterMark;
                        // we must ensure that previous needDrain will not be reset to false.
                        if (!ret)
                            state.needDrain = true;
                        if (state.writing || state.corked) {
                            var last = state.lastBufferedRequest;
                            state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
                            if (last) {
                                last.next = state.lastBufferedRequest;
                            }
                            else {
                                state.bufferedRequest = state.lastBufferedRequest;
                            }
                            state.bufferedRequestCount += 1;
                        }
                        else {
                            doWrite(stream, state, false, len, chunk, encoding, cb);
                        }
                        return ret;
                    }
                    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
                        state.writelen = len;
                        state.writecb = cb;
                        state.writing = true;
                        state.sync = true;
                        if (writev)
                            stream._writev(chunk, state.onwrite);
                        else
                            stream._write(chunk, encoding, state.onwrite);
                        state.sync = false;
                    }
                    function onwriteError(stream, state, sync, er, cb) {
                        --state.pendingcb;
                        if (sync)
                            processNextTick(cb, er);
                        else
                            cb(er);
                        stream._writableState.errorEmitted = true;
                        stream.emit('error', er);
                    }
                    function onwriteStateUpdate(state) {
                        state.writing = false;
                        state.writecb = null;
                        state.length -= state.writelen;
                        state.writelen = 0;
                    }
                    function onwrite(stream, er) {
                        var state = stream._writableState;
                        var sync = state.sync;
                        var cb = state.writecb;
                        onwriteStateUpdate(state);
                        if (er)
                            onwriteError(stream, state, sync, er, cb);
                        else {
                            // Check if we're actually ready to finish, but don't emit yet
                            var finished = needFinish(state);
                            if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
                                clearBuffer(stream, state);
                            }
                            if (sync) {
                                /*<replacement>*/
                                asyncWrite(afterWrite, stream, state, finished, cb);
                                /*</replacement>*/
                            }
                            else {
                                afterWrite(stream, state, finished, cb);
                            }
                        }
                    }
                    function afterWrite(stream, state, finished, cb) {
                        if (!finished)
                            onwriteDrain(stream, state);
                        state.pendingcb--;
                        cb();
                        finishMaybe(stream, state);
                    }
                    // Must force callback to be called on nextTick, so that we don't
                    // emit 'drain' before the write() consumer gets the 'false' return
                    // value, and has a chance to attach a 'drain' listener.
                    function onwriteDrain(stream, state) {
                        if (state.length === 0 && state.needDrain) {
                            state.needDrain = false;
                            stream.emit('drain');
                        }
                    }
                    // if there's something in the buffer waiting, then process it
                    function clearBuffer(stream, state) {
                        state.bufferProcessing = true;
                        var entry = state.bufferedRequest;
                        if (stream._writev && entry && entry.next) {
                            // Fast case, write everything using _writev()
                            var l = state.bufferedRequestCount;
                            var buffer = new Array(l);
                            var holder = state.corkedRequestsFree;
                            holder.entry = entry;
                            var count = 0;
                            while (entry) {
                                buffer[count] = entry;
                                entry = entry.next;
                                count += 1;
                            }
                            doWrite(stream, state, true, state.length, buffer, '', holder.finish);
                            // doWrite is almost always async, defer these to save a bit of time
                            // as the hot path ends with doWrite
                            state.pendingcb++;
                            state.lastBufferedRequest = null;
                            if (holder.next) {
                                state.corkedRequestsFree = holder.next;
                                holder.next = null;
                            }
                            else {
                                state.corkedRequestsFree = new CorkedRequest(state);
                            }
                        }
                        else {
                            // Slow case, write chunks one-by-one
                            while (entry) {
                                var chunk = entry.chunk;
                                var encoding = entry.encoding;
                                var cb = entry.callback;
                                var len = state.objectMode ? 1 : chunk.length;
                                doWrite(stream, state, false, len, chunk, encoding, cb);
                                entry = entry.next;
                                // if we didn't call the onwrite immediately, then
                                // it means that we need to wait until it does.
                                // also, that means that the chunk and cb are currently
                                // being processed, so move the buffer counter past them.
                                if (state.writing) {
                                    break;
                                }
                            }
                            if (entry === null)
                                state.lastBufferedRequest = null;
                        }
                        state.bufferedRequestCount = 0;
                        state.bufferedRequest = entry;
                        state.bufferProcessing = false;
                    }
                    Writable.prototype._write = function (chunk, encoding, cb) {
                        cb(new Error('not implemented'));
                    };
                    Writable.prototype._writev = null;
                    Writable.prototype.end = function (chunk, encoding, cb) {
                        var state = this._writableState;
                        if (typeof chunk === 'function') {
                            cb = chunk;
                            chunk = null;
                            encoding = null;
                        }
                        else if (typeof encoding === 'function') {
                            cb = encoding;
                            encoding = null;
                        }
                        if (chunk !== null && chunk !== undefined)
                            this.write(chunk, encoding);
                        // .end() fully uncorks
                        if (state.corked) {
                            state.corked = 1;
                            this.uncork();
                        }
                        // ignore unnecessary end() calls.
                        if (!state.ending && !state.finished)
                            endWritable(this, state, cb);
                    };
                    function needFinish(state) {
                        return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
                    }
                    function prefinish(stream, state) {
                        if (!state.prefinished) {
                            state.prefinished = true;
                            stream.emit('prefinish');
                        }
                    }
                    function finishMaybe(stream, state) {
                        var need = needFinish(state);
                        if (need) {
                            if (state.pendingcb === 0) {
                                prefinish(stream, state);
                                state.finished = true;
                                stream.emit('finish');
                            }
                            else {
                                prefinish(stream, state);
                            }
                        }
                        return need;
                    }
                    function endWritable(stream, state, cb) {
                        state.ending = true;
                        finishMaybe(stream, state);
                        if (cb) {
                            if (state.finished)
                                processNextTick(cb);
                            else
                                stream.once('finish', cb);
                        }
                        state.ended = true;
                        stream.writable = false;
                    }
                    // It seems a linked list but it is not
                    // there will be only 2 of these for each stream
                    function CorkedRequest(state) {
                        var _this = this;
                        this.next = null;
                        this.entry = null;
                        this.finish = function (err) {
                            var entry = _this.entry;
                            _this.entry = null;
                            while (entry) {
                                var cb = entry.callback;
                                state.pendingcb--;
                                cb(err);
                                entry = entry.next;
                            }
                            if (state.corkedRequestsFree) {
                                state.corkedRequestsFree.next = _this;
                            }
                            else {
                                state.corkedRequestsFree = _this;
                            }
                        };
                    }
                }).call(this, require('_process'));
            }, { "./_stream_duplex": 25, "_process": 23, "buffer": 11, "buffer-shims": 10, "core-util-is": 13, "events": 16, "inherits": 18, "process-nextick-args": 22, "util-deprecate": 37 }], 30: [function (require, module, exports) {
                'use strict';
                var Buffer = require('buffer').Buffer;
                /*<replacement>*/
                var bufferShim = require('buffer-shims');
                /*</replacement>*/
                module.exports = BufferList;
                function BufferList() {
                    this.head = null;
                    this.tail = null;
                    this.length = 0;
                }
                BufferList.prototype.push = function (v) {
                    var entry = { data: v, next: null };
                    if (this.length > 0)
                        this.tail.next = entry;
                    else
                        this.head = entry;
                    this.tail = entry;
                    ++this.length;
                };
                BufferList.prototype.unshift = function (v) {
                    var entry = { data: v, next: this.head };
                    if (this.length === 0)
                        this.tail = entry;
                    this.head = entry;
                    ++this.length;
                };
                BufferList.prototype.shift = function () {
                    if (this.length === 0)
                        return;
                    var ret = this.head.data;
                    if (this.length === 1)
                        this.head = this.tail = null;
                    else
                        this.head = this.head.next;
                    --this.length;
                    return ret;
                };
                BufferList.prototype.clear = function () {
                    this.head = this.tail = null;
                    this.length = 0;
                };
                BufferList.prototype.join = function (s) {
                    if (this.length === 0)
                        return '';
                    var p = this.head;
                    var ret = '' + p.data;
                    while (p = p.next) {
                        ret += s + p.data;
                    }
                    return ret;
                };
                BufferList.prototype.concat = function (n) {
                    if (this.length === 0)
                        return bufferShim.alloc(0);
                    if (this.length === 1)
                        return this.head.data;
                    var ret = bufferShim.allocUnsafe(n >>> 0);
                    var p = this.head;
                    var i = 0;
                    while (p) {
                        p.data.copy(ret, i);
                        i += p.data.length;
                        p = p.next;
                    }
                    return ret;
                };
            }, { "buffer": 11, "buffer-shims": 10 }], 31: [function (require, module, exports) {
                module.exports = require("./lib/_stream_passthrough.js");
            }, { "./lib/_stream_passthrough.js": 26 }], 32: [function (require, module, exports) {
                (function (process) {
                    var Stream = (function () {
                        try {
                            return require('st' + 'ream'); // hack to fix a circular dependency issue when used with browserify
                        }
                        catch (_) { }
                    }());
                    exports = module.exports = require('./lib/_stream_readable.js');
                    exports.Stream = Stream || exports;
                    exports.Readable = exports;
                    exports.Writable = require('./lib/_stream_writable.js');
                    exports.Duplex = require('./lib/_stream_duplex.js');
                    exports.Transform = require('./lib/_stream_transform.js');
                    exports.PassThrough = require('./lib/_stream_passthrough.js');
                    if (!process.browser && process.env.READABLE_STREAM === 'disable' && Stream) {
                        module.exports = Stream;
                    }
                }).call(this, require('_process'));
            }, { "./lib/_stream_duplex.js": 25, "./lib/_stream_passthrough.js": 26, "./lib/_stream_readable.js": 27, "./lib/_stream_transform.js": 28, "./lib/_stream_writable.js": 29, "_process": 23 }], 33: [function (require, module, exports) {
                module.exports = require("./lib/_stream_transform.js");
            }, { "./lib/_stream_transform.js": 28 }], 34: [function (require, module, exports) {
                module.exports = require("./lib/_stream_writable.js");
            }, { "./lib/_stream_writable.js": 29 }], 35: [function (require, module, exports) {
                // Copyright Joyent, Inc. and other Node contributors.
                //
                // Permission is hereby granted, free of charge, to any person obtaining a
                // copy of this software and associated documentation files (the
                // "Software"), to deal in the Software without restriction, including
                // without limitation the rights to use, copy, modify, merge, publish,
                // distribute, sublicense, and/or sell copies of the Software, and to permit
                // persons to whom the Software is furnished to do so, subject to the
                // following conditions:
                //
                // The above copyright notice and this permission notice shall be included
                // in all copies or substantial portions of the Software.
                //
                // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
                // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
                // USE OR OTHER DEALINGS IN THE SOFTWARE.
                module.exports = Stream;
                var EE = require('events').EventEmitter;
                var inherits = require('inherits');
                inherits(Stream, EE);
                Stream.Readable = require('readable-stream/readable.js');
                Stream.Writable = require('readable-stream/writable.js');
                Stream.Duplex = require('readable-stream/duplex.js');
                Stream.Transform = require('readable-stream/transform.js');
                Stream.PassThrough = require('readable-stream/passthrough.js');
                // Backwards-compat with node 0.4.x
                Stream.Stream = Stream;
                // old-style streams.  Note that the pipe method (the only relevant
                // part of this class) is overridden in the Readable class.
                function Stream() {
                    EE.call(this);
                }
                Stream.prototype.pipe = function (dest, options) {
                    var source = this;
                    function ondata(chunk) {
                        if (dest.writable) {
                            if (false === dest.write(chunk) && source.pause) {
                                source.pause();
                            }
                        }
                    }
                    source.on('data', ondata);
                    function ondrain() {
                        if (source.readable && source.resume) {
                            source.resume();
                        }
                    }
                    dest.on('drain', ondrain);
                    // If the 'end' option is not supplied, dest.end() will be called when
                    // source gets the 'end' or 'close' events.  Only dest.end() once.
                    if (!dest._isStdio && (!options || options.end !== false)) {
                        source.on('end', onend);
                        source.on('close', onclose);
                    }
                    var didOnEnd = false;
                    function onend() {
                        if (didOnEnd)
                            return;
                        didOnEnd = true;
                        dest.end();
                    }
                    function onclose() {
                        if (didOnEnd)
                            return;
                        didOnEnd = true;
                        if (typeof dest.destroy === 'function')
                            dest.destroy();
                    }
                    // don't leave dangling pipes when there are errors.
                    function onerror(er) {
                        cleanup();
                        if (EE.listenerCount(this, 'error') === 0) {
                            throw er; // Unhandled stream error in pipe.
                        }
                    }
                    source.on('error', onerror);
                    dest.on('error', onerror);
                    // remove all the event listeners that were added.
                    function cleanup() {
                        source.removeListener('data', ondata);
                        dest.removeListener('drain', ondrain);
                        source.removeListener('end', onend);
                        source.removeListener('close', onclose);
                        source.removeListener('error', onerror);
                        dest.removeListener('error', onerror);
                        source.removeListener('end', cleanup);
                        source.removeListener('close', cleanup);
                        dest.removeListener('close', cleanup);
                    }
                    source.on('end', cleanup);
                    source.on('close', cleanup);
                    dest.on('close', cleanup);
                    dest.emit('pipe', source);
                    // Allow for unix-like usage: A.pipe(B).pipe(C)
                    return dest;
                };
            }, { "events": 16, "inherits": 18, "readable-stream/duplex.js": 24, "readable-stream/passthrough.js": 31, "readable-stream/readable.js": 32, "readable-stream/transform.js": 33, "readable-stream/writable.js": 34 }], 36: [function (require, module, exports) {
                // Copyright Joyent, Inc. and other Node contributors.
                //
                // Permission is hereby granted, free of charge, to any person obtaining a
                // copy of this software and associated documentation files (the
                // "Software"), to deal in the Software without restriction, including
                // without limitation the rights to use, copy, modify, merge, publish,
                // distribute, sublicense, and/or sell copies of the Software, and to permit
                // persons to whom the Software is furnished to do so, subject to the
                // following conditions:
                //
                // The above copyright notice and this permission notice shall be included
                // in all copies or substantial portions of the Software.
                //
                // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
                // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
                // USE OR OTHER DEALINGS IN THE SOFTWARE.
                var Buffer = require('buffer').Buffer;
                var isBufferEncoding = Buffer.isEncoding
                    || function (encoding) {
                        switch (encoding && encoding.toLowerCase()) {
                            case 'hex':
                            case 'utf8':
                            case 'utf-8':
                            case 'ascii':
                            case 'binary':
                            case 'base64':
                            case 'ucs2':
                            case 'ucs-2':
                            case 'utf16le':
                            case 'utf-16le':
                            case 'raw': return true;
                            default: return false;
                        }
                    };
                function assertEncoding(encoding) {
                    if (encoding && !isBufferEncoding(encoding)) {
                        throw new Error('Unknown encoding: ' + encoding);
                    }
                }
                // StringDecoder provides an interface for efficiently splitting a series of
                // buffers into a series of JS strings without breaking apart multi-byte
                // characters. CESU-8 is handled as part of the UTF-8 encoding.
                //
                // @TODO Handling all encodings inside a single object makes it very difficult
                // to reason about this code, so it should be split up in the future.
                // @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
                // points as used by CESU-8.
                var StringDecoder = exports.StringDecoder = function (encoding) {
                    this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
                    assertEncoding(encoding);
                    switch (this.encoding) {
                        case 'utf8':
                            // CESU-8 represents each of Surrogate Pair by 3-bytes
                            this.surrogateSize = 3;
                            break;
                        case 'ucs2':
                        case 'utf16le':
                            // UTF-16 represents each of Surrogate Pair by 2-bytes
                            this.surrogateSize = 2;
                            this.detectIncompleteChar = utf16DetectIncompleteChar;
                            break;
                        case 'base64':
                            // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
                            this.surrogateSize = 3;
                            this.detectIncompleteChar = base64DetectIncompleteChar;
                            break;
                        default:
                            this.write = passThroughWrite;
                            return;
                    }
                    // Enough space to store all bytes of a single character. UTF-8 needs 4
                    // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
                    this.charBuffer = new Buffer(6);
                    // Number of bytes received for the current incomplete multi-byte character.
                    this.charReceived = 0;
                    // Number of bytes expected for the current incomplete multi-byte character.
                    this.charLength = 0;
                };
                // write decodes the given buffer and returns it as JS string that is
                // guaranteed to not contain any partial multi-byte characters. Any partial
                // character found at the end of the buffer is buffered up, and will be
                // returned when calling write again with the remaining bytes.
                //
                // Note: Converting a Buffer containing an orphan surrogate to a String
                // currently works, but converting a String to a Buffer (via `new Buffer`, or
                // Buffer#write) will replace incomplete surrogates with the unicode
                // replacement character. See https://codereview.chromium.org/121173009/ .
                StringDecoder.prototype.write = function (buffer) {
                    var charStr = '';
                    // if our last write ended with an incomplete multibyte character
                    while (this.charLength) {
                        // determine how many remaining bytes this buffer has to offer for this char
                        var available = (buffer.length >= this.charLength - this.charReceived) ?
                            this.charLength - this.charReceived :
                            buffer.length;
                        // add the new bytes to the char buffer
                        buffer.copy(this.charBuffer, this.charReceived, 0, available);
                        this.charReceived += available;
                        if (this.charReceived < this.charLength) {
                            // still not enough chars in this buffer? wait for more ...
                            return '';
                        }
                        // remove bytes belonging to the current character from the buffer
                        buffer = buffer.slice(available, buffer.length);
                        // get the character that was split
                        charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
                        // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
                        var charCode = charStr.charCodeAt(charStr.length - 1);
                        if (charCode >= 0xD800 && charCode <= 0xDBFF) {
                            this.charLength += this.surrogateSize;
                            charStr = '';
                            continue;
                        }
                        this.charReceived = this.charLength = 0;
                        // if there are no more bytes in this buffer, just emit our char
                        if (buffer.length === 0) {
                            return charStr;
                        }
                        break;
                    }
                    // determine and set charLength / charReceived
                    this.detectIncompleteChar(buffer);
                    var end = buffer.length;
                    if (this.charLength) {
                        // buffer the incomplete character bytes we got
                        buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
                        end -= this.charReceived;
                    }
                    charStr += buffer.toString(this.encoding, 0, end);
                    var end = charStr.length - 1;
                    var charCode = charStr.charCodeAt(end);
                    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
                    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
                        var size = this.surrogateSize;
                        this.charLength += size;
                        this.charReceived += size;
                        this.charBuffer.copy(this.charBuffer, size, 0, size);
                        buffer.copy(this.charBuffer, 0, 0, size);
                        return charStr.substring(0, end);
                    }
                    // or just emit the charStr
                    return charStr;
                };
                // detectIncompleteChar determines if there is an incomplete UTF-8 character at
                // the end of the given buffer. If so, it sets this.charLength to the byte
                // length that character, and sets this.charReceived to the number of bytes
                // that are available for this character.
                StringDecoder.prototype.detectIncompleteChar = function (buffer) {
                    // determine how many bytes we have to check at the end of this buffer
                    var i = (buffer.length >= 3) ? 3 : buffer.length;
                    // Figure out if one of the last i bytes of our buffer announces an
                    // incomplete char.
                    for (; i > 0; i--) {
                        var c = buffer[buffer.length - i];
                        // See http://en.wikipedia.org/wiki/UTF-8#Description
                        // 110XXXXX
                        if (i == 1 && c >> 5 == 0x06) {
                            this.charLength = 2;
                            break;
                        }
                        // 1110XXXX
                        if (i <= 2 && c >> 4 == 0x0E) {
                            this.charLength = 3;
                            break;
                        }
                        // 11110XXX
                        if (i <= 3 && c >> 3 == 0x1E) {
                            this.charLength = 4;
                            break;
                        }
                    }
                    this.charReceived = i;
                };
                StringDecoder.prototype.end = function (buffer) {
                    var res = '';
                    if (buffer && buffer.length)
                        res = this.write(buffer);
                    if (this.charReceived) {
                        var cr = this.charReceived;
                        var buf = this.charBuffer;
                        var enc = this.encoding;
                        res += buf.slice(0, cr).toString(enc);
                    }
                    return res;
                };
                function passThroughWrite(buffer) {
                    return buffer.toString(this.encoding);
                }
                function utf16DetectIncompleteChar(buffer) {
                    this.charReceived = buffer.length % 2;
                    this.charLength = this.charReceived ? 2 : 0;
                }
                function base64DetectIncompleteChar(buffer) {
                    this.charReceived = buffer.length % 3;
                    this.charLength = this.charReceived ? 3 : 0;
                }
            }, { "buffer": 11 }], 37: [function (require, module, exports) {
                (function (global) {
                    /**
                     * Module exports.
                     */
                    module.exports = deprecate;
                    /**
                     * Mark that a method should not be used.
                     * Returns a modified function which warns once by default.
                     *
                     * If `localStorage.noDeprecation = true` is set, then it is a no-op.
                     *
                     * If `localStorage.throwDeprecation = true` is set, then deprecated functions
                     * will throw an Error when invoked.
                     *
                     * If `localStorage.traceDeprecation = true` is set, then deprecated functions
                     * will invoke `console.trace()` instead of `console.error()`.
                     *
                     * @param {Function} fn - the function to deprecate
                     * @param {String} msg - the string to print to the console when `fn` is invoked
                     * @returns {Function} a new "deprecated" version of `fn`
                     * @api public
                     */
                    function deprecate(fn, msg) {
                        if (config('noDeprecation')) {
                            return fn;
                        }
                        var warned = false;
                        function deprecated() {
                            if (!warned) {
                                if (config('throwDeprecation')) {
                                    throw new Error(msg);
                                }
                                else if (config('traceDeprecation')) {
                                    console.trace(msg);
                                }
                                else {
                                    console.warn(msg);
                                }
                                warned = true;
                            }
                            return fn.apply(this, arguments);
                        }
                        return deprecated;
                    }
                    /**
                     * Checks `localStorage` for boolean values for the given `name`.
                     *
                     * @param {String} name
                     * @returns {Boolean}
                     * @api private
                     */
                    function config(name) {
                        // accessing global.localStorage can trigger a DOMException in sandboxed iframes
                        try {
                            if (!global.localStorage)
                                return false;
                        }
                        catch (_) {
                            return false;
                        }
                        var val = global.localStorage[name];
                        if (null == val)
                            return false;
                        return String(val).toLowerCase() === 'true';
                    }
                }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
            }, {}], 38: [function (require, module, exports) {
                arguments[4][18][0].apply(exports, arguments);
            }, { "dup": 18 }], 39: [function (require, module, exports) {
                module.exports = function isBuffer(arg) {
                    return arg && typeof arg === 'object'
                        && typeof arg.copy === 'function'
                        && typeof arg.fill === 'function'
                        && typeof arg.readUInt8 === 'function';
                };
            }, {}], 40: [function (require, module, exports) {
                (function (process, global) {
                    // Copyright Joyent, Inc. and other Node contributors.
                    //
                    // Permission is hereby granted, free of charge, to any person obtaining a
                    // copy of this software and associated documentation files (the
                    // "Software"), to deal in the Software without restriction, including
                    // without limitation the rights to use, copy, modify, merge, publish,
                    // distribute, sublicense, and/or sell copies of the Software, and to permit
                    // persons to whom the Software is furnished to do so, subject to the
                    // following conditions:
                    //
                    // The above copyright notice and this permission notice shall be included
                    // in all copies or substantial portions of the Software.
                    //
                    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
                    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
                    // USE OR OTHER DEALINGS IN THE SOFTWARE.
                    var formatRegExp = /%[sdj%]/g;
                    exports.format = function (f) {
                        if (!isString(f)) {
                            var objects = [];
                            for (var i = 0; i < arguments.length; i++) {
                                objects.push(inspect(arguments[i]));
                            }
                            return objects.join(' ');
                        }
                        var i = 1;
                        var args = arguments;
                        var len = args.length;
                        var str = String(f).replace(formatRegExp, function (x) {
                            if (x === '%%')
                                return '%';
                            if (i >= len)
                                return x;
                            switch (x) {
                                case '%s': return String(args[i++]);
                                case '%d': return Number(args[i++]);
                                case '%j':
                                    try {
                                        return JSON.stringify(args[i++]);
                                    }
                                    catch (_) {
                                        return '[Circular]';
                                    }
                                default:
                                    return x;
                            }
                        });
                        for (var x = args[i]; i < len; x = args[++i]) {
                            if (isNull(x) || !isObject(x)) {
                                str += ' ' + x;
                            }
                            else {
                                str += ' ' + inspect(x);
                            }
                        }
                        return str;
                    };
                    // Mark that a method should not be used.
                    // Returns a modified function which warns once by default.
                    // If --no-deprecation is set, then it is a no-op.
                    exports.deprecate = function (fn, msg) {
                        // Allow for deprecating things in the process of starting up.
                        if (isUndefined(global.process)) {
                            return function () {
                                return exports.deprecate(fn, msg).apply(this, arguments);
                            };
                        }
                        if (process.noDeprecation === true) {
                            return fn;
                        }
                        var warned = false;
                        function deprecated() {
                            if (!warned) {
                                if (process.throwDeprecation) {
                                    throw new Error(msg);
                                }
                                else if (process.traceDeprecation) {
                                    console.trace(msg);
                                }
                                else {
                                    console.error(msg);
                                }
                                warned = true;
                            }
                            return fn.apply(this, arguments);
                        }
                        return deprecated;
                    };
                    var debugs = {};
                    var debugEnviron;
                    exports.debuglog = function (set) {
                        if (isUndefined(debugEnviron))
                            debugEnviron = process.env.NODE_DEBUG || '';
                        set = set.toUpperCase();
                        if (!debugs[set]) {
                            if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
                                var pid = process.pid;
                                debugs[set] = function () {
                                    var msg = exports.format.apply(exports, arguments);
                                    console.error('%s %d: %s', set, pid, msg);
                                };
                            }
                            else {
                                debugs[set] = function () { };
                            }
                        }
                        return debugs[set];
                    };
                    /**
                     * Echos the value of a value. Trys to print the value out
                     * in the best way possible given the different types.
                     *
                     * @param {Object} obj The object to print out.
                     * @param {Object} opts Optional options object that alters the output.
                     */
                    /* legacy: obj, showHidden, depth, colors*/
                    function inspect(obj, opts) {
                        // default options
                        var ctx = {
                            seen: [],
                            stylize: stylizeNoColor
                        };
                        // legacy...
                        if (arguments.length >= 3)
                            ctx.depth = arguments[2];
                        if (arguments.length >= 4)
                            ctx.colors = arguments[3];
                        if (isBoolean(opts)) {
                            // legacy...
                            ctx.showHidden = opts;
                        }
                        else if (opts) {
                            // got an "options" object
                            exports._extend(ctx, opts);
                        }
                        // set default options
                        if (isUndefined(ctx.showHidden))
                            ctx.showHidden = false;
                        if (isUndefined(ctx.depth))
                            ctx.depth = 2;
                        if (isUndefined(ctx.colors))
                            ctx.colors = false;
                        if (isUndefined(ctx.customInspect))
                            ctx.customInspect = true;
                        if (ctx.colors)
                            ctx.stylize = stylizeWithColor;
                        return formatValue(ctx, obj, ctx.depth);
                    }
                    exports.inspect = inspect;
                    // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
                    inspect.colors = {
                        'bold': [1, 22],
                        'italic': [3, 23],
                        'underline': [4, 24],
                        'inverse': [7, 27],
                        'white': [37, 39],
                        'grey': [90, 39],
                        'black': [30, 39],
                        'blue': [34, 39],
                        'cyan': [36, 39],
                        'green': [32, 39],
                        'magenta': [35, 39],
                        'red': [31, 39],
                        'yellow': [33, 39]
                    };
                    // Don't use 'blue' not visible on cmd.exe
                    inspect.styles = {
                        'special': 'cyan',
                        'number': 'yellow',
                        'boolean': 'yellow',
                        'undefined': 'grey',
                        'null': 'bold',
                        'string': 'green',
                        'date': 'magenta',
                        // "name": intentionally not styling
                        'regexp': 'red'
                    };
                    function stylizeWithColor(str, styleType) {
                        var style = inspect.styles[styleType];
                        if (style) {
                            return '\u001b[' + inspect.colors[style][0] + 'm' + str +
                                '\u001b[' + inspect.colors[style][1] + 'm';
                        }
                        else {
                            return str;
                        }
                    }
                    function stylizeNoColor(str, styleType) {
                        return str;
                    }
                    function arrayToHash(array) {
                        var hash = {};
                        array.forEach(function (val, idx) {
                            hash[val] = true;
                        });
                        return hash;
                    }
                    function formatValue(ctx, value, recurseTimes) {
                        // Provide a hook for user-specified inspect functions.
                        // Check that value is an object with an inspect function on it
                        if (ctx.customInspect &&
                            value &&
                            isFunction(value.inspect) &&
                            // Filter out the util module, it's inspect function is special
                            value.inspect !== exports.inspect &&
                            // Also filter out any prototype objects using the circular check.
                            !(value.constructor && value.constructor.prototype === value)) {
                            var ret = value.inspect(recurseTimes, ctx);
                            if (!isString(ret)) {
                                ret = formatValue(ctx, ret, recurseTimes);
                            }
                            return ret;
                        }
                        // Primitive types cannot have properties
                        var primitive = formatPrimitive(ctx, value);
                        if (primitive) {
                            return primitive;
                        }
                        // Look up the keys of the object.
                        var keys = Object.keys(value);
                        var visibleKeys = arrayToHash(keys);
                        if (ctx.showHidden) {
                            keys = Object.getOwnPropertyNames(value);
                        }
                        // IE doesn't make error fields non-enumerable
                        // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
                        if (isError(value)
                            && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
                            return formatError(value);
                        }
                        // Some type of object without properties can be shortcutted.
                        if (keys.length === 0) {
                            if (isFunction(value)) {
                                var name = value.name ? ': ' + value.name : '';
                                return ctx.stylize('[Function' + name + ']', 'special');
                            }
                            if (isRegExp(value)) {
                                return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
                            }
                            if (isDate(value)) {
                                return ctx.stylize(Date.prototype.toString.call(value), 'date');
                            }
                            if (isError(value)) {
                                return formatError(value);
                            }
                        }
                        var base = '', array = false, braces = ['{', '}'];
                        // Make Array say that they are Array
                        if (isArray(value)) {
                            array = true;
                            braces = ['[', ']'];
                        }
                        // Make functions say that they are functions
                        if (isFunction(value)) {
                            var n = value.name ? ': ' + value.name : '';
                            base = ' [Function' + n + ']';
                        }
                        // Make RegExps say that they are RegExps
                        if (isRegExp(value)) {
                            base = ' ' + RegExp.prototype.toString.call(value);
                        }
                        // Make dates with properties first say the date
                        if (isDate(value)) {
                            base = ' ' + Date.prototype.toUTCString.call(value);
                        }
                        // Make error with message first say the error
                        if (isError(value)) {
                            base = ' ' + formatError(value);
                        }
                        if (keys.length === 0 && (!array || value.length == 0)) {
                            return braces[0] + base + braces[1];
                        }
                        if (recurseTimes < 0) {
                            if (isRegExp(value)) {
                                return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
                            }
                            else {
                                return ctx.stylize('[Object]', 'special');
                            }
                        }
                        ctx.seen.push(value);
                        var output;
                        if (array) {
                            output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
                        }
                        else {
                            output = keys.map(function (key) {
                                return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
                            });
                        }
                        ctx.seen.pop();
                        return reduceToSingleString(output, base, braces);
                    }
                    function formatPrimitive(ctx, value) {
                        if (isUndefined(value))
                            return ctx.stylize('undefined', 'undefined');
                        if (isString(value)) {
                            var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                .replace(/'/g, "\\'")
                                .replace(/\\"/g, '"') + '\'';
                            return ctx.stylize(simple, 'string');
                        }
                        if (isNumber(value))
                            return ctx.stylize('' + value, 'number');
                        if (isBoolean(value))
                            return ctx.stylize('' + value, 'boolean');
                        // For some reason typeof null is "object", so special case here.
                        if (isNull(value))
                            return ctx.stylize('null', 'null');
                    }
                    function formatError(value) {
                        return '[' + Error.prototype.toString.call(value) + ']';
                    }
                    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
                        var output = [];
                        for (var i = 0, l = value.length; i < l; ++i) {
                            if (hasOwnProperty(value, String(i))) {
                                output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
                            }
                            else {
                                output.push('');
                            }
                        }
                        keys.forEach(function (key) {
                            if (!key.match(/^\d+$/)) {
                                output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
                            }
                        });
                        return output;
                    }
                    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
                        var name, str, desc;
                        desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
                        if (desc.get) {
                            if (desc.set) {
                                str = ctx.stylize('[Getter/Setter]', 'special');
                            }
                            else {
                                str = ctx.stylize('[Getter]', 'special');
                            }
                        }
                        else {
                            if (desc.set) {
                                str = ctx.stylize('[Setter]', 'special');
                            }
                        }
                        if (!hasOwnProperty(visibleKeys, key)) {
                            name = '[' + key + ']';
                        }
                        if (!str) {
                            if (ctx.seen.indexOf(desc.value) < 0) {
                                if (isNull(recurseTimes)) {
                                    str = formatValue(ctx, desc.value, null);
                                }
                                else {
                                    str = formatValue(ctx, desc.value, recurseTimes - 1);
                                }
                                if (str.indexOf('\n') > -1) {
                                    if (array) {
                                        str = str.split('\n').map(function (line) {
                                            return '  ' + line;
                                        }).join('\n').substr(2);
                                    }
                                    else {
                                        str = '\n' + str.split('\n').map(function (line) {
                                            return '   ' + line;
                                        }).join('\n');
                                    }
                                }
                            }
                            else {
                                str = ctx.stylize('[Circular]', 'special');
                            }
                        }
                        if (isUndefined(name)) {
                            if (array && key.match(/^\d+$/)) {
                                return str;
                            }
                            name = JSON.stringify('' + key);
                            if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                                name = name.substr(1, name.length - 2);
                                name = ctx.stylize(name, 'name');
                            }
                            else {
                                name = name.replace(/'/g, "\\'")
                                    .replace(/\\"/g, '"')
                                    .replace(/(^"|"$)/g, "'");
                                name = ctx.stylize(name, 'string');
                            }
                        }
                        return name + ': ' + str;
                    }
                    function reduceToSingleString(output, base, braces) {
                        var numLinesEst = 0;
                        var length = output.reduce(function (prev, cur) {
                            numLinesEst++;
                            if (cur.indexOf('\n') >= 0)
                                numLinesEst++;
                            return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
                        }, 0);
                        if (length > 60) {
                            return braces[0] +
                                (base === '' ? '' : base + '\n ') +
                                ' ' +
                                output.join(',\n  ') +
                                ' ' +
                                braces[1];
                        }
                        return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
                    }
                    // NOTE: These type checking functions intentionally don't use `instanceof`
                    // because it is fragile and can be easily faked with `Object.create()`.
                    function isArray(ar) {
                        return Array.isArray(ar);
                    }
                    exports.isArray = isArray;
                    function isBoolean(arg) {
                        return typeof arg === 'boolean';
                    }
                    exports.isBoolean = isBoolean;
                    function isNull(arg) {
                        return arg === null;
                    }
                    exports.isNull = isNull;
                    function isNullOrUndefined(arg) {
                        return arg == null;
                    }
                    exports.isNullOrUndefined = isNullOrUndefined;
                    function isNumber(arg) {
                        return typeof arg === 'number';
                    }
                    exports.isNumber = isNumber;
                    function isString(arg) {
                        return typeof arg === 'string';
                    }
                    exports.isString = isString;
                    function isSymbol(arg) {
                        return typeof arg === 'symbol';
                    }
                    exports.isSymbol = isSymbol;
                    function isUndefined(arg) {
                        return arg === void 0;
                    }
                    exports.isUndefined = isUndefined;
                    function isRegExp(re) {
                        return isObject(re) && objectToString(re) === '[object RegExp]';
                    }
                    exports.isRegExp = isRegExp;
                    function isObject(arg) {
                        return typeof arg === 'object' && arg !== null;
                    }
                    exports.isObject = isObject;
                    function isDate(d) {
                        return isObject(d) && objectToString(d) === '[object Date]';
                    }
                    exports.isDate = isDate;
                    function isError(e) {
                        return isObject(e) &&
                            (objectToString(e) === '[object Error]' || e instanceof Error);
                    }
                    exports.isError = isError;
                    function isFunction(arg) {
                        return typeof arg === 'function';
                    }
                    exports.isFunction = isFunction;
                    function isPrimitive(arg) {
                        return arg === null ||
                            typeof arg === 'boolean' ||
                            typeof arg === 'number' ||
                            typeof arg === 'string' ||
                            typeof arg === 'symbol' || // ES6 symbol
                            typeof arg === 'undefined';
                    }
                    exports.isPrimitive = isPrimitive;
                    exports.isBuffer = require('./support/isBuffer');
                    function objectToString(o) {
                        return Object.prototype.toString.call(o);
                    }
                    function pad(n) {
                        return n < 10 ? '0' + n.toString(10) : n.toString(10);
                    }
                    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
                        'Oct', 'Nov', 'Dec'];
                    // 26 Feb 16:19:34
                    function timestamp() {
                        var d = new Date();
                        var time = [pad(d.getHours()),
                            pad(d.getMinutes()),
                            pad(d.getSeconds())].join(':');
                        return [d.getDate(), months[d.getMonth()], time].join(' ');
                    }
                    // log is just a thin wrapper to console.log that prepends a timestamp
                    exports.log = function () {
                        console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
                    };
                    /**
                     * Inherit the prototype methods from one constructor into another.
                     *
                     * The Function.prototype.inherits from lang.js rewritten as a standalone
                     * function (not on Function.prototype). NOTE: If this file is to be loaded
                     * during bootstrapping this function needs to be rewritten using some native
                     * functions as prototype setup using normal JavaScript does not work as
                     * expected during bootstrapping (see mirror.js in r114903).
                     *
                     * @param {function} ctor Constructor function which needs to inherit the
                     *     prototype.
                     * @param {function} superCtor Constructor function to inherit prototype from.
                     */
                    exports.inherits = require('inherits');
                    exports._extend = function (origin, add) {
                        // Don't do anything if add isn't an object
                        if (!add || !isObject(add))
                            return origin;
                        var keys = Object.keys(add);
                        var i = keys.length;
                        while (i--) {
                            origin[keys[i]] = add[keys[i]];
                        }
                        return origin;
                    };
                    function hasOwnProperty(obj, prop) {
                        return Object.prototype.hasOwnProperty.call(obj, prop);
                    }
                }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
            }, { "./support/isBuffer": 39, "_process": 23, "inherits": 38 }] }, {}, [1])(1);
});

//# sourceMappingURL=socket.io-stream.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(59).setImmediate))

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(60);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ })
/******/ ]);
//# sourceMappingURL=speech.sdk.bundle.js.map