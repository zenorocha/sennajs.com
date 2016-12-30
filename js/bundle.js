(function() {
this.metal = this.metal || {};
this.metalNamed = this.metalNamed || {};
var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

babelHelpers.defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers.toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

babelHelpers;
'use strict';

/**
 * A collection of core utility functions.
 * @const
 */

(function () {
  var compatibilityModeData_ = void 0;

  /**
   * Counter for unique id.
   * @type {Number}
   * @private
   */
  var uniqueIdCounter_ = 1;

  /**
   * Unique id property prefix.
   * @type {String}
   * @protected
   */
  var UID_PROPERTY = 'core_' + (Math.random() * 1e9 >>> 0);

  this['metalNamed']['coreNamed'] = this['metalNamed']['coreNamed'] || {};
  this['metalNamed']['coreNamed']['UID_PROPERTY'] = UID_PROPERTY; /**
                                                                   * When defining a class Foo with an abstract method bar(), you can do:
                                                                   * Foo.prototype.bar = abstractMethod
                                                                   *
                                                                   * Now if a subclass of Foo fails to override bar(), an error will be thrown
                                                                   * when bar() is invoked.
                                                                   *
                                                                   * @type {!Function}
                                                                   * @throws {Error} when invoked to indicate the method should be overridden.
                                                                   */

  function abstractMethod() {
    throw Error('Unimplemented abstract method');
  }

  this['metalNamed']['coreNamed']['abstractMethod'] = abstractMethod; /**
                                                                       * Disables Metal.js's compatibility mode.
                                                                       */

  function disableCompatibilityMode() {
    compatibilityModeData_ = undefined;
  }

  this['metalNamed']['coreNamed']['disableCompatibilityMode'] = disableCompatibilityMode; /**
                                                                                           * Enables Metal.js's compatibility mode with the following features from rc
                                                                                           * and 1.x versions:
                                                                                           *     - Using "key" to reference component instances. In the current version
                                                                                           *       this should be done via "ref" instead. This allows old code still
                                                                                           *       using "key" to keep working like before. NOTE: this may cause
                                                                                           *       problems, since "key" is meant to be used differently. Only use this
                                                                                           *       if it's not possible to upgrade the code to use "ref" instead.
                                                                                           * @param {Object=} opt_data Optional object with data to specify more
                                                                                           *     details, such as:
                                                                                           *         - renderers {Array} the template renderers that should be in
                                                                                           *           compatibility mode, either their constructors or strings
                                                                                           *           representing them (e.g. 'soy' or 'jsx'). By default, all the ones
                                                                                           *           that extend from IncrementalDomRenderer.
                                                                                           * @type {Object}
                                                                                           */

  function enableCompatibilityMode() {
    var opt_data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    compatibilityModeData_ = opt_data;
  }

  this['metalNamed']['coreNamed']['enableCompatibilityMode'] = enableCompatibilityMode; /**
                                                                                         * Returns the data used for compatibility mode, or nothing if it hasn't been
                                                                                         * enabled.
                                                                                         * @return {Object}
                                                                                         */

  function getCompatibilityModeData() {
    // Compatibility mode can be set via the __METAL_COMPATIBILITY__ global var.
    if (compatibilityModeData_ === undefined) {
      if (typeof window !== 'undefined' && window.__METAL_COMPATIBILITY__) {
        enableCompatibilityMode(window.__METAL_COMPATIBILITY__);
      }
    }
    return compatibilityModeData_;
  }

  this['metalNamed']['coreNamed']['getCompatibilityModeData'] = getCompatibilityModeData; /**
                                                                                           * Returns the first argument if it's truthy, or the second otherwise.
                                                                                           * @param {*} a
                                                                                           * @param {*} b
                                                                                           * @return {*}
                                                                                           * @protected
                                                                                           */

  function getFirstTruthy_(a, b) {
    return a || b;
  }

  /**
   * Gets the name of the given function. If the current browser doesn't
   * support the `name` property, this will calculate it from the function's
   * content string.
   * @param {!function()} fn
   * @return {string}
   */
  function getFunctionName(fn) {
    if (!fn.name) {
      var str = fn.toString();
      fn.name = str.substring(9, str.indexOf('('));
    }
    return fn.name;
  }

  this['metalNamed']['coreNamed']['getFunctionName'] = getFunctionName; /**
                                                                         * Gets the value of a static property in the given class. The value will be
                                                                         * inherited from ancestors as expected, unless a custom merge function is given,
                                                                         * which can change how the super classes' value for that property will be merged
                                                                         * together.
                                                                         * The final merged value will be stored in another property, so that it won't
                                                                         * be recalculated even if this function is called multiple times.
                                                                         * @param {!function()} ctor Class constructor.
                                                                         * @param {string} propertyName Property name to be merged.
                                                                         * @param {function(*, *):*=} opt_mergeFn Function that receives the merged
                                                                         *     value of the property so far and the next value to be merged to it.
                                                                         *     Should return these two merged together. If not passed the final property
                                                                         *     will be the first truthy value among ancestors.
                                                                         */

  function getStaticProperty(ctor, propertyName, opt_mergeFn) {
    var mergedName = propertyName + '_MERGED';
    if (!ctor.hasOwnProperty(mergedName)) {
      var merged = ctor.hasOwnProperty(propertyName) ? ctor[propertyName] : null;
      if (ctor.__proto__ && !ctor.__proto__.isPrototypeOf(Function)) {
        var mergeFn = opt_mergeFn || getFirstTruthy_;
        merged = mergeFn(merged, getStaticProperty(ctor.__proto__, propertyName, mergeFn));
      }
      ctor[mergedName] = merged;
    }
    return ctor[mergedName];
  }

  this['metalNamed']['coreNamed']['getStaticProperty'] = getStaticProperty; /**
                                                                             * Gets an unique id. If `opt_object` argument is passed, the object is
                                                                             * mutated with an unique id. Consecutive calls with the same object
                                                                             * reference won't mutate the object again, instead the current object uid
                                                                             * returns. See {@link UID_PROPERTY}.
                                                                             * @param {Object=} opt_object Optional object to be mutated with the uid. If
                                                                             *     not specified this method only returns the uid.
                                                                             * @param {boolean=} opt_noInheritance Optional flag indicating if this
                                                                             *     object's uid property can be inherited from parents or not.
                                                                             * @throws {Error} when invoked to indicate the method should be overridden.
                                                                             */

  function getUid(opt_object, opt_noInheritance) {
    if (opt_object) {
      var id = opt_object[UID_PROPERTY];
      if (opt_noInheritance && !opt_object.hasOwnProperty(UID_PROPERTY)) {
        id = null;
      }
      return id || (opt_object[UID_PROPERTY] = uniqueIdCounter_++);
    }
    return uniqueIdCounter_++;
  }

  this['metalNamed']['coreNamed']['getUid'] = getUid; /**
                                                       * The identity function. Returns its first argument.
                                                       * @param {*=} opt_returnValue The single value that will be returned.
                                                       * @return {?} The first argument.
                                                       */

  function identityFunction(opt_returnValue) {
    return opt_returnValue;
  }

  this['metalNamed']['coreNamed']['identityFunction'] = identityFunction; /**
                                                                           * Returns true if the specified value is a boolean.
                                                                           * @param {?} val Variable to test.
                                                                           * @return {boolean} Whether variable is boolean.
                                                                           */

  function isBoolean(val) {
    return typeof val === 'boolean';
  }

  this['metalNamed']['coreNamed']['isBoolean'] = isBoolean; /**
                                                             * Returns true if the specified value is not undefined.
                                                             * @param {?} val Variable to test.
                                                             * @return {boolean} Whether variable is defined.
                                                             */

  function isDef(val) {
    return val !== undefined;
  }

  this['metalNamed']['coreNamed']['isDef'] = isDef; /**
                                                     * Returns true if value is not undefined or null.
                                                     * @param {*} val
                                                     * @return {boolean}
                                                     */

  function isDefAndNotNull(val) {
    return isDef(val) && !isNull(val);
  }

  this['metalNamed']['coreNamed']['isDefAndNotNull'] = isDefAndNotNull; /**
                                                                         * Returns true if value is a document.
                                                                         * @param {*} val
                                                                         * @return {boolean}
                                                                         */

  function isDocument(val) {
    return val && (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) === 'object' && val.nodeType === 9;
  }

  this['metalNamed']['coreNamed']['isDocument'] = isDocument; /**
                                                               * Returns true if value is a dom element.
                                                               * @param {*} val
                                                               * @return {boolean}
                                                               */

  function isElement(val) {
    return val && (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) === 'object' && val.nodeType === 1;
  }

  this['metalNamed']['coreNamed']['isElement'] = isElement; /**
                                                             * Returns true if the specified value is a function.
                                                             * @param {?} val Variable to test.
                                                             * @return {boolean} Whether variable is a function.
                                                             */

  function isFunction(val) {
    return typeof val === 'function';
  }

  this['metalNamed']['coreNamed']['isFunction'] = isFunction; /**
                                                               * Returns true if value is null.
                                                               * @param {*} val
                                                               * @return {boolean}
                                                               */

  function isNull(val) {
    return val === null;
  }

  this['metalNamed']['coreNamed']['isNull'] = isNull; /**
                                                       * Returns true if the specified value is a number.
                                                       * @param {?} val Variable to test.
                                                       * @return {boolean} Whether variable is a number.
                                                       */

  function isNumber(val) {
    return typeof val === 'number';
  }

  this['metalNamed']['coreNamed']['isNumber'] = isNumber; /**
                                                           * Returns true if value is a window.
                                                           * @param {*} val
                                                           * @return {boolean}
                                                           */

  function isWindow(val) {
    return val !== null && val === val.window;
  }

  this['metalNamed']['coreNamed']['isWindow'] = isWindow; /**
                                                           * Returns true if the specified value is an object. This includes arrays
                                                           * and functions.
                                                           * @param {?} val Variable to test.
                                                           * @return {boolean} Whether variable is an object.
                                                           */

  function isObject(val) {
    var type = typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val);
    return type === 'object' && val !== null || type === 'function';
  }

  this['metalNamed']['coreNamed']['isObject'] = isObject; /**
                                                           * Returns true if value is a Promise.
                                                           * @param {*} val
                                                           * @return {boolean}
                                                           */

  function isPromise(val) {
    return val && (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) === 'object' && typeof val.then === 'function';
  }

  this['metalNamed']['coreNamed']['isPromise'] = isPromise; /**
                                                             * Returns true if value is a string.
                                                             * @param {*} val
                                                             * @return {boolean}
                                                             */

  function isString(val) {
    return typeof val === 'string' || val instanceof String;
  }

  this['metalNamed']['coreNamed']['isString'] = isString; /**
                                                           * Null function used for default values of callbacks, etc.
                                                           * @return {void} Nothing.
                                                           */

  function nullFunction() {}
  this['metalNamed']['coreNamed']['nullFunction'] = nullFunction;
}).call(this);
'use strict';

// This file exists just for backwards compatibility, making sure that old
// default imports for this file still work. It's best to use the named exports
// for each function instead though, since that allows bundlers like Rollup to
// reduce the bundle size by removing unused code.

(function () {
  var core = this['metalNamed']['coreNamed'];
  this['metal']['core'] = core;
  this['metalNamed']['core'] = this['metalNamed']['core'] || {};
  this['metalNamed']['core']['core'] = core;
  Object.keys(this['metalNamed']['coreNamed']).forEach(function (key) {
    this['metalNamed']['core'][key] = this['metalNamed']['coreNamed'][key];
  });
}).call(this);
'use strict';

(function () {
	var isDef = this['metalNamed']['core']['isDef'];

	var array = function () {
		function array() {
			babelHelpers.classCallCheck(this, array);
		}

		babelHelpers.createClass(array, null, [{
			key: 'equal',

			/**
    * Checks if the given arrays have the same content.
    * @param {!Array<*>} arr1
    * @param {!Array<*>} arr2
    * @return {boolean}
    */
			value: function equal(arr1, arr2) {
				if (arr1.length !== arr2.length) {
					return false;
				}
				for (var i = 0; i < arr1.length; i++) {
					if (arr1[i] !== arr2[i]) {
						return false;
					}
				}
				return true;
			}

			/**
    * Returns the first value in the given array that isn't undefined.
    * @param {!Array} arr
    * @return {*}
    */

		}, {
			key: 'firstDefinedValue',
			value: function firstDefinedValue(arr) {
				for (var i = 0; i < arr.length; i++) {
					if (arr[i] !== undefined) {
						return arr[i];
					}
				}
			}

			/**
    * Transforms the input nested array to become flat.
    * @param {Array.<*|Array.<*>>} arr Nested array to flatten.
    * @param {Array.<*>} opt_output Optional output array.
    * @return {Array.<*>} Flat array.
    */

		}, {
			key: 'flatten',
			value: function flatten(arr, opt_output) {
				var output = opt_output || [];
				for (var i = 0; i < arr.length; i++) {
					if (Array.isArray(arr[i])) {
						array.flatten(arr[i], output);
					} else {
						output.push(arr[i]);
					}
				}
				return output;
			}

			/**
    * Removes the first occurrence of a particular value from an array.
    * @param {Array.<T>} arr Array from which to remove value.
    * @param {T} obj Object to remove.
    * @return {boolean} True if an element was removed.
    * @template T
    */

		}, {
			key: 'remove',
			value: function remove(arr, obj) {
				var i = arr.indexOf(obj);
				var rv;
				if (rv = i >= 0) {
					array.removeAt(arr, i);
				}
				return rv;
			}

			/**
    * Removes from an array the element at index i
    * @param {Array} arr Array or array like object from which to remove value.
    * @param {number} i The index to remove.
    * @return {boolean} True if an element was removed.
    */

		}, {
			key: 'removeAt',
			value: function removeAt(arr, i) {
				return Array.prototype.splice.call(arr, i, 1).length === 1;
			}

			/**
    * Slices the given array, just like Array.prototype.slice, but this
    * is faster and working on all array-like objects (like arguments).
    * @param {!Object} arr Array-like object to slice.
    * @param {number} start The index that should start the slice.
    * @param {number=} opt_end The index where the slice should end, not
    *   included in the final array. If not given, all elements after the
    *   start index will be included.
    * @return {!Array}
    */

		}, {
			key: 'slice',
			value: function slice(arr, start, opt_end) {
				var sliced = [];
				var end = isDef(opt_end) ? opt_end : arr.length;
				for (var i = start; i < end; i++) {
					sliced.push(arr[i]);
				}
				return sliced;
			}
		}]);
		return array;
	}();

	this['metal']['array'] = array;
}).call(this);
/*!
 * Polyfill from Google's Closure Library.
 * Copyright 2013 The Closure Library Authors. All Rights Reserved.
 */

'use strict';

(function () {
	var async = {};

	/**
  * Throw an item without interrupting the current execution context.  For
  * example, if processing a group of items in a loop, sometimes it is useful
  * to report an error while still allowing the rest of the batch to be
  * processed.
  * @param {*} exception
  */
	async.throwException = function (exception) {
		// Each throw needs to be in its own context.
		async.nextTick(function () {
			throw exception;
		});
	};

	/**
  * Fires the provided callback just before the current callstack unwinds, or as
  * soon as possible after the current JS execution context.
  * @param {function(this:THIS)} callback
  * @param {THIS=} opt_context Object to use as the "this value" when calling
  *     the provided function.
  * @template THIS
  */
	async.run = function (callback, opt_context) {
		if (!async.run.workQueueScheduled_) {
			// Nothing is currently scheduled, schedule it now.
			async.nextTick(async.run.processWorkQueue);
			async.run.workQueueScheduled_ = true;
		}

		async.run.workQueue_.push(new async.run.WorkItem_(callback, opt_context));
	};

	/** @private {boolean} */
	async.run.workQueueScheduled_ = false;

	/** @private {!Array.<!async.run.WorkItem_>} */
	async.run.workQueue_ = [];

	/**
  * Run any pending async.run work items. This function is not intended
  * for general use, but for use by entry point handlers to run items ahead of
  * async.nextTick.
  */
	async.run.processWorkQueue = function () {
		// NOTE: additional work queue items may be pushed while processing.
		while (async.run.workQueue_.length) {
			// Don't let the work queue grow indefinitely.
			var workItems = async.run.workQueue_;
			async.run.workQueue_ = [];
			for (var i = 0; i < workItems.length; i++) {
				var workItem = workItems[i];
				try {
					workItem.fn.call(workItem.scope);
				} catch (e) {
					async.throwException(e);
				}
			}
		}

		// There are no more work items, reset the work queue.
		async.run.workQueueScheduled_ = false;
	};

	/**
  * @constructor
  * @final
  * @struct
  * @private
  *
  * @param {function()} fn
  * @param {Object|null|undefined} scope
  */
	async.run.WorkItem_ = function (fn, scope) {
		/** @const */
		this.fn = fn;
		/** @const */
		this.scope = scope;
	};

	/**
  * Fires the provided callbacks as soon as possible after the current JS
  * execution context. setTimeout(…, 0) always takes at least 5ms for legacy
  * reasons.
  * @param {function(this:SCOPE)} callback Callback function to fire as soon as
  *     possible.
  * @param {SCOPE=} opt_context Object in whose scope to call the listener.
  * @template SCOPE
  */
	async.nextTick = function (callback, opt_context) {
		var cb = callback;
		if (opt_context) {
			cb = callback.bind(opt_context);
		}
		cb = async.nextTick.wrapCallback_(cb);
		// Introduced and currently only supported by IE10.
		// Verify if variable is defined on the current runtime (i.e., node, browser).
		// Can't use typeof enclosed in a function (such as core.isFunction) or an
		// exception will be thrown when the function is called on an environment
		// where the variable is undefined.
		if (typeof setImmediate === 'function') {
			setImmediate(cb);
			return;
		}
		// Look for and cache the custom fallback version of setImmediate.
		if (!async.nextTick.setImmediate_) {
			async.nextTick.setImmediate_ = async.nextTick.getSetImmediateEmulator_();
		}
		async.nextTick.setImmediate_(cb);
	};

	/**
  * Cache for the setImmediate implementation.
  * @type {function(function())}
  * @private
  */
	async.nextTick.setImmediate_ = null;

	/**
  * Determines the best possible implementation to run a function as soon as
  * the JS event loop is idle.
  * @return {function(function())} The "setImmediate" implementation.
  * @private
  */
	async.nextTick.getSetImmediateEmulator_ = function () {
		// Create a private message channel and use it to postMessage empty messages
		// to ourselves.
		var Channel;

		// Verify if variable is defined on the current runtime (i.e., node, browser).
		// Can't use typeof enclosed in a function (such as core.isFunction) or an
		// exception will be thrown when the function is called on an environment
		// where the variable is undefined.
		if (typeof MessageChannel === 'function') {
			Channel = MessageChannel;
		}

		// If MessageChannel is not available and we are in a browser, implement
		// an iframe based polyfill in browsers that have postMessage and
		// document.addEventListener. The latter excludes IE8 because it has a
		// synchronous postMessage implementation.
		if (typeof Channel === 'undefined' && typeof window !== 'undefined' && window.postMessage && window.addEventListener) {
			/** @constructor */
			Channel = function Channel() {
				// Make an empty, invisible iframe.
				var iframe = document.createElement('iframe');
				iframe.style.display = 'none';
				iframe.src = '';
				document.documentElement.appendChild(iframe);
				var win = iframe.contentWindow;
				var doc = win.document;
				doc.open();
				doc.write('');
				doc.close();
				var message = 'callImmediate' + Math.random();
				var origin = win.location.protocol + '//' + win.location.host;
				var onmessage = function (e) {
					// Validate origin and message to make sure that this message was
					// intended for us.
					if (e.origin !== origin && e.data !== message) {
						return;
					}
					this.port1.onmessage();
				}.bind(this);
				win.addEventListener('message', onmessage, false);
				this.port1 = {};
				this.port2 = {
					postMessage: function postMessage() {
						win.postMessage(message, origin);
					}
				};
			};
		}
		if (typeof Channel !== 'undefined') {
			var channel = new Channel();
			// Use a fifo linked list to call callbacks in the right order.
			var head = {};
			var tail = head;
			channel.port1.onmessage = function () {
				head = head.next;
				var cb = head.cb;
				head.cb = null;
				cb();
			};
			return function (cb) {
				tail.next = {
					cb: cb
				};
				tail = tail.next;
				channel.port2.postMessage(0);
			};
		}
		// Implementation for IE6-8: Script elements fire an asynchronous
		// onreadystatechange event when inserted into the DOM.
		if (typeof document !== 'undefined' && 'onreadystatechange' in document.createElement('script')) {
			return function (cb) {
				var script = document.createElement('script');
				script.onreadystatechange = function () {
					// Clean up and call the callback.
					script.onreadystatechange = null;
					script.parentNode.removeChild(script);
					script = null;
					cb();
					cb = null;
				};
				document.documentElement.appendChild(script);
			};
		}
		// Fall back to setTimeout with 0. In browsers this creates a delay of 5ms
		// or more.
		return function (cb) {
			setTimeout(cb, 0);
		};
	};

	/**
  * Helper function that is overrided to protect callbacks with entry point
  * monitor if the application monitors entry points.
  * @param {function()} callback Callback function to fire as soon as possible.
  * @return {function()} The wrapped callback.
  * @private
  */
	async.nextTick.wrapCallback_ = function (opt_returnValue) {
		return opt_returnValue;
	};

	this['metal']['async'] = async;
}).call(this);
'use strict';

/**
 * Disposable utility. When inherited provides the `dispose` function to its
 * subclass, which is responsible for disposing of any object references
 * when an instance won't be used anymore. Subclasses should override
 * `disposeInternal` to implement any specific disposing logic.
 * @constructor
 */

(function () {
	var Disposable = function () {
		function Disposable() {
			babelHelpers.classCallCheck(this, Disposable);

			/**
    * Flag indicating if this instance has already been disposed.
    * @type {boolean}
    * @protected
    */
			this.disposed_ = false;
		}

		/**
   * Disposes of this instance's object references. Calls `disposeInternal`.
   */


		babelHelpers.createClass(Disposable, [{
			key: 'dispose',
			value: function dispose() {
				if (!this.disposed_) {
					this.disposeInternal();
					this.disposed_ = true;
				}
			}

			/**
    * Subclasses should override this method to implement any specific
    * disposing logic (like clearing references and calling `dispose` on other
    * disposables).
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {}

			/**
    * Checks if this instance has already been disposed.
    * @return {boolean}
    */

		}, {
			key: 'isDisposed',
			value: function isDisposed() {
				return this.disposed_;
			}
		}]);
		return Disposable;
	}();

	this['metal']['Disposable'] = Disposable;
}).call(this);
'use strict';

(function () {
	var object = function () {
		function object() {
			babelHelpers.classCallCheck(this, object);
		}

		babelHelpers.createClass(object, null, [{
			key: 'mixin',

			/**
    * Copies all the members of a source object to a target object.
    * @param {Object} target Target object.
    * @param {...Object} var_args The objects from which values will be copied.
    * @return {Object} Returns the target object reference.
    */
			value: function mixin(target) {
				var key, source;
				for (var i = 1; i < arguments.length; i++) {
					source = arguments[i];
					for (key in source) {
						target[key] = source[key];
					}
				}
				return target;
			}

			/**
    * Returns an object based on its fully qualified external name.
    * @param {string} name The fully qualified name.
    * @param {object=} opt_obj The object within which to look; default is
    *     <code>window</code>.
    * @return {?} The value (object or primitive) or, if not found, undefined.
    */

		}, {
			key: 'getObjectByName',
			value: function getObjectByName(name, opt_obj) {
				var scope = opt_obj || window;
				var parts = name.split('.');
				return parts.reduce(function (part, key) {
					return part[key];
				}, scope);
			}

			/**
    * Returns a new object with the same keys as the given one, but with
    * their values set to the return values of the specified function.
    * @param {!Object} obj
    * @param {!function(string, *)} fn
    * @return {!Object}
    */

		}, {
			key: 'map',
			value: function map(obj, fn) {
				var mappedObj = {};
				var keys = Object.keys(obj);
				for (var i = 0; i < keys.length; i++) {
					mappedObj[keys[i]] = fn(keys[i], obj[keys[i]]);
				}
				return mappedObj;
			}

			/**
    * Checks if the two given objects are equal. This is done via a shallow
    * check, including only the keys directly contained by the 2 objects.
    * @return {boolean}
    */

		}, {
			key: 'shallowEqual',
			value: function shallowEqual(obj1, obj2) {
				if (obj1 === obj2) {
					return true;
				}

				var keys1 = Object.keys(obj1);
				var keys2 = Object.keys(obj2);
				if (keys1.length !== keys2.length) {
					return false;
				}

				for (var i = 0; i < keys1.length; i++) {
					if (obj1[keys1[i]] !== obj2[keys1[i]]) {
						return false;
					}
				}
				return true;
			}
		}]);
		return object;
	}();

	this['metal']['object'] = object;
}).call(this);
'use strict';

(function () {
	var string = function () {
		function string() {
			babelHelpers.classCallCheck(this, string);
		}

		babelHelpers.createClass(string, null, [{
			key: 'caseInsensitiveCompare',

			/**
    * Compares the given strings without taking the case into account.
    * @param {string|number} str1
    * @param {string|number} str2
    * @return {number} Either -1, 0 or 1, according to if the first string is
    *     "smaller", equal or "bigger" than the second given string.
    */
			value: function caseInsensitiveCompare(str1, str2) {
				var test1 = String(str1).toLowerCase();
				var test2 = String(str2).toLowerCase();

				if (test1 < test2) {
					return -1;
				} else if (test1 === test2) {
					return 0;
				} else {
					return 1;
				}
			}

			/**
    * Removes the breaking spaces from the left and right of the string and
    * collapses the sequences of breaking spaces in the middle into single spaces.
    * The original and the result strings render the same way in HTML.
    * @param {string} str A string in which to collapse spaces.
    * @return {string} Copy of the string with normalized breaking spaces.
    */

		}, {
			key: 'collapseBreakingSpaces',
			value: function collapseBreakingSpaces(str) {
				return str.replace(/[\t\r\n ]+/g, ' ').replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, '');
			}

			/**
   * Escapes characters in the string that are not safe to use in a RegExp.
   * @param {*} str The string to escape. If not a string, it will be casted
   *     to one.
   * @return {string} A RegExp safe, escaped copy of {@code s}.
   */

		}, {
			key: 'escapeRegex',
			value: function escapeRegex(str) {
				return String(str).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').replace(/\x08/g, '\\x08');
			}

			/**
   * Returns a string with at least 64-bits of randomness.
   * @return {string} A random string, e.g. sn1s7vb4gcic.
   */

		}, {
			key: 'getRandomString',
			value: function getRandomString() {
				var x = 2147483648;
				return Math.floor(Math.random() * x).toString(36) + Math.abs(Math.floor(Math.random() * x) ^ Date.now()).toString(36);
			}

			/**
    * Calculates the hashcode for a string. The hashcode value is computed by
    * the sum algorithm: s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]. A nice
    * property of using 31 prime is that the multiplication can be replaced by
    * a shift and a subtraction for better performance: 31*i == (i<<5)-i.
    * Modern VMs do this sort of optimization automatically.
    * @param {String} val Target string.
    * @return {Number} Returns the string hashcode.
    */

		}, {
			key: 'hashCode',
			value: function hashCode(val) {
				var hash = 0;
				for (var i = 0, len = val.length; i < len; i++) {
					hash = 31 * hash + val.charCodeAt(i);
					hash %= 0x100000000;
				}
				return hash;
			}

			/**
    * Replaces interval into the string with specified value, e.g.
    * `replaceInterval("abcde", 1, 4, "")` returns "ae".
    * @param {string} str The input string.
    * @param {Number} start Start interval position to be replaced.
    * @param {Number} end End interval position to be replaced.
    * @param {string} value The value that replaces the specified interval.
    * @return {string}
    */

		}, {
			key: 'replaceInterval',
			value: function replaceInterval(str, start, end, value) {
				return str.substring(0, start) + value + str.substring(end);
			}
		}]);
		return string;
	}();

	this['metal']['string'] = string;
}).call(this);
'use strict';

(function () {
  var core = this['metal']['core'];
  var array = this['metal']['array'];
  var async = this['metal']['async'];
  var Disposable = this['metal']['Disposable'];
  var object = this['metal']['object'];
  var string = this['metal']['string'];
  this['metalNamed']['metal'] = this['metalNamed']['metal'] || {};
  Object.keys(this['metalNamed']['core']).forEach(function (key) {
    this['metalNamed']['metal'][key] = this['metalNamed']['core'][key];
  });
  this['metalNamed']['metal']['array'] = array;
  this['metalNamed']['metal']['async'] = async;
  this['metalNamed']['metal']['Disposable'] = Disposable;
  this['metalNamed']['metal']['object'] = object;
  this['metalNamed']['metal']['string'] = string;
  this['metal']['metal'] = core;
}).call(this);
'use strict';

(function () {
	var METAL_DATA = '__metal_data__';

	var domData = function () {
		function domData() {
			babelHelpers.classCallCheck(this, domData);
		}

		babelHelpers.createClass(domData, null, [{
			key: 'get',

			/**
    * Gets Metal.js's data for the given element.
    * @param {!Element} element
    * @param {string=} opt_name Optional property from the data to be returned.
    * @param {*} opt_initialVal Optinal value to the set the requested property
    *     to if it doesn't exist yet in the data.
    * @return {!Object}
    */
			value: function get(element, opt_name, opt_initialVal) {
				if (!element[METAL_DATA]) {
					element[METAL_DATA] = {};
				}
				if (!opt_name) {
					return element[METAL_DATA];
				}
				if (!element[METAL_DATA][opt_name] && opt_initialVal) {
					element[METAL_DATA][opt_name] = opt_initialVal;
				}
				return element[METAL_DATA][opt_name];
			}

			/**
    * Checks if the given element has data stored in it.
    * @param {!Element} element
    * @return {boolean}
    */

		}, {
			key: 'has',
			value: function has(element) {
				return !!element[METAL_DATA];
			}
		}]);
		return domData;
	}();

	this['metal']['domData'] = domData;
}).call(this);
'use strict';

(function () {
	var Disposable = this['metalNamed']['metal']['Disposable'];

	/**
  * EventHandle utility. Holds information about an event subscription, and
  * allows removing them easily.
  * EventHandle is a Disposable, but it's important to note that the
  * EventEmitter that created it is not the one responsible for disposing it.
  * That responsibility is for the code that holds a reference to it.
  * @param {!EventEmitter} emitter Emitter the event was subscribed to.
  * @param {string} event The name of the event that was subscribed to.
  * @param {!Function} listener The listener subscribed to the event.
  * @constructor
  * @extends {Disposable}
  */

	var EventHandle = function (_Disposable) {
		babelHelpers.inherits(EventHandle, _Disposable);

		function EventHandle(emitter, event, listener) {
			babelHelpers.classCallCheck(this, EventHandle);

			/**
    * The EventEmitter instance that the event was subscribed to.
    * @type {EventEmitter}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (EventHandle.__proto__ || Object.getPrototypeOf(EventHandle)).call(this));

			_this.emitter_ = emitter;

			/**
    * The name of the event that was subscribed to.
    * @type {string}
    * @protected
    */
			_this.event_ = event;

			/**
    * The listener subscribed to the event.
    * @type {Function}
    * @protected
    */
			_this.listener_ = listener;
			return _this;
		}

		/**
   * Disposes of this instance's object references.
   * @override
   */


		babelHelpers.createClass(EventHandle, [{
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.removeListener();
				this.emitter_ = null;
				this.listener_ = null;
			}

			/**
    * Removes the listener subscription from the emitter.
    */

		}, {
			key: 'removeListener',
			value: function removeListener() {
				if (!this.emitter_.isDisposed()) {
					this.emitter_.removeListener(this.event_, this.listener_);
				}
			}
		}]);
		return EventHandle;
	}(Disposable);

	this['metal']['EventHandle'] = EventHandle;
}).call(this);
'use strict';

(function () {
	var array = this['metalNamed']['metal']['array'];
	var Disposable = this['metalNamed']['metal']['Disposable'];
	var isFunction = this['metalNamed']['metal']['isFunction'];
	var isString = this['metalNamed']['metal']['isString'];
	var EventHandle = this['metal']['EventHandle'];


	var singleArray_ = [0];

	/**
  * EventEmitter utility.
  * @constructor
  * @extends {Disposable}
  */

	var EventEmitter = function (_Disposable) {
		babelHelpers.inherits(EventEmitter, _Disposable);

		function EventEmitter() {
			babelHelpers.classCallCheck(this, EventEmitter);

			/**
    * Holds event listeners scoped by event type.
    * @type {Object<string, !Array<!function()>>}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (EventEmitter.__proto__ || Object.getPrototypeOf(EventEmitter)).call(this));

			_this.events_ = null;

			/**
    * Handlers that are triggered when an event is listened to.
    * @type {Array}
    */
			_this.listenerHandlers_ = null;

			/**
    * Configuration option which determines if an event facade should be sent
    * as a param of listeners when emitting events. If set to true, the facade
    * will be passed as the first argument of the listener.
    * @type {boolean}
    * @protected
    */
			_this.shouldUseFacade_ = false;
			return _this;
		}

		/**
   * Adds a handler to given holder variable. If the holder doesn't have a
   * value yet, it will receive the handler directly. If the holder is an array,
   * the value will just be added to it. Otherwise, the holder will be set to a
   * new array containing its previous value plus the new handler.
   * @param {*} holder
   * @param {!function()|Object} handler
   * @return {*} The holder's new value.
   * @protected
   */


		babelHelpers.createClass(EventEmitter, [{
			key: 'addHandler_',
			value: function addHandler_(holder, handler) {
				if (!holder) {
					holder = handler;
				} else {
					if (!Array.isArray(holder)) {
						holder = [holder];
					}
					holder.push(handler);
				}
				return holder;
			}

			/**
    * Adds a listener to the end of the listeners array for the specified events.
    * @param {!(Array|string)} event
    * @param {!Function} listener
    * @param {boolean} opt_default Flag indicating if this listener is a default
    *   action for this event. Default actions are run last, and only if no previous
    *   listener call `preventDefault()` on the received event facade.
    * @return {!EventHandle} Can be used to remove the listener.
    */

		}, {
			key: 'addListener',
			value: function addListener(event, listener, opt_default) {
				this.validateListener_(listener);

				var events = this.toEventsArray_(event);
				for (var i = 0; i < events.length; i++) {
					this.addSingleListener_(events[i], listener, opt_default);
				}

				return new EventHandle(this, event, listener);
			}

			/**
    * Adds a listener to the end of the listeners array for a single event.
    * @param {string} event
    * @param {!Function} listener
    * @param {boolean} opt_default Flag indicating if this listener is a default
    *   action for this event. Default actions are run last, and only if no previous
    *   listener call `preventDefault()` on the received event facade.
    * @return {!EventHandle} Can be used to remove the listener.
    * @param {Function=} opt_origin The original function that was added as a
    *   listener, if there is any.
    * @protected
    */

		}, {
			key: 'addSingleListener_',
			value: function addSingleListener_(event, listener, opt_default, opt_origin) {
				this.runListenerHandlers_(event);
				if (opt_default || opt_origin) {
					listener = {
						default: opt_default,
						fn: listener,
						origin: opt_origin
					};
				}
				this.events_ = this.events_ || {};
				this.events_[event] = this.addHandler_(this.events_[event], listener);
			}

			/**
    * Builds facade for the given event.
    * @param {string} event
    * @return {Object}
    * @protected
    */

		}, {
			key: 'buildFacade_',
			value: function buildFacade_(event) {
				var _this2 = this;

				if (this.getShouldUseFacade()) {
					var _ret = function () {
						var facade = {
							preventDefault: function preventDefault() {
								facade.preventedDefault = true;
							},
							target: _this2,
							type: event
						};
						return {
							v: facade
						};
					}();

					if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret)) === "object") return _ret.v;
				}
			}

			/**
    * Disposes of this instance's object references.
    * @override
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.events_ = null;
			}

			/**
    * Execute each of the listeners in order with the supplied arguments.
    * @param {string} event
    * @param {*} opt_args [arg1], [arg2], [...]
    * @return {boolean} Returns true if event had listeners, false otherwise.
    */

		}, {
			key: 'emit',
			value: function emit(event) {
				var listeners = toArray(this.getRawListeners_(event)).concat();
				if (listeners.length === 0) {
					return false;
				}

				var args = array.slice(arguments, 1);
				this.runListeners_(listeners, args, this.buildFacade_(event));
				return true;
			}

			/**
    * Gets the listener objects for the given event, if there are any.
    * @param {string} event
    * @return {Array}
    * @protected
    */

		}, {
			key: 'getRawListeners_',
			value: function getRawListeners_(event) {
				return this.events_ && this.events_[event];
			}

			/**
    * Gets the configuration option which determines if an event facade should
    * be sent as a param of listeners when emitting events. If set to true, the
    * facade will be passed as the first argument of the listener.
    * @return {boolean}
    */

		}, {
			key: 'getShouldUseFacade',
			value: function getShouldUseFacade() {
				return this.shouldUseFacade_;
			}

			/**
    * Returns an array of listeners for the specified event.
    * @param {string} event
    * @return {Array} Array of listeners.
    */

		}, {
			key: 'listeners',
			value: function listeners(event) {
				return toArray(this.getRawListeners_(event)).map(function (listener) {
					return listener.fn ? listener.fn : listener;
				});
			}

			/**
    * Adds a listener that will be invoked a fixed number of times for the
    * events. After each event is triggered the specified amount of times, the
    * listener is removed for it.
    * @param {!(Array|string)} event
    * @param {number} amount The amount of times this event should be listened
    * to.
    * @param {!Function} listener
    * @return {!EventHandle} Can be used to remove the listener.
    */

		}, {
			key: 'many',
			value: function many(event, amount, listener) {
				var events = this.toEventsArray_(event);
				for (var i = 0; i < events.length; i++) {
					this.many_(events[i], amount, listener);
				}

				return new EventHandle(this, event, listener);
			}

			/**
    * Adds a listener that will be invoked a fixed number of times for a single
    * event. After the event is triggered the specified amount of times, the
    * listener is removed.
    * @param {string} event
    * @param {number} amount The amount of times this event should be listened
    * to.
    * @param {!Function} listener
    * @protected
    */

		}, {
			key: 'many_',
			value: function many_(event, amount, listener) {
				var self = this;

				if (amount <= 0) {
					return;
				}

				function handlerInternal() {
					if (--amount === 0) {
						self.removeListener(event, handlerInternal);
					}
					listener.apply(self, arguments);
				}

				self.addSingleListener_(event, handlerInternal, false, listener);
			}

			/**
    * Checks if a listener object matches the given listener function. To match,
    * it needs to either point to that listener or have it as its origin.
    * @param {!Object} listenerObj
    * @param {!Function} listener
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'matchesListener_',
			value: function matchesListener_(listenerObj, listener) {
				var fn = listenerObj.fn || listenerObj;
				return fn === listener || listenerObj.origin && listenerObj.origin === listener;
			}

			/**
    * Removes a listener for the specified events.
    * Caution: changes array indices in the listener array behind the listener.
    * @param {!(Array|string)} events
    * @param {!Function} listener
    * @return {!Object} Returns emitter, so calls can be chained.
    */

		}, {
			key: 'off',
			value: function off(event, listener) {
				this.validateListener_(listener);
				if (!this.events_) {
					return this;
				}

				var events = this.toEventsArray_(event);
				for (var i = 0; i < events.length; i++) {
					this.events_[events[i]] = this.removeMatchingListenerObjs_(toArray(this.events_[events[i]]), listener);
				}

				return this;
			}

			/**
    * Adds a listener to the end of the listeners array for the specified events.
    * @param {!(Array|string)} events
    * @param {!Function} listener
    * @return {!EventHandle} Can be used to remove the listener.
    */

		}, {
			key: 'on',
			value: function on() {
				return this.addListener.apply(this, arguments);
			}

			/**
    * Adds handler that gets triggered when an event is listened to on this
    * instance.
    * @param {!function()}
    */

		}, {
			key: 'onListener',
			value: function onListener(handler) {
				this.listenerHandlers_ = this.addHandler_(this.listenerHandlers_, handler);
			}

			/**
    * Adds a one time listener for the events. This listener is invoked only the
    * next time each event is fired, after which it is removed.
    * @param {!(Array|string)} events
    * @param {!Function} listener
    * @return {!EventHandle} Can be used to remove the listener.
    */

		}, {
			key: 'once',
			value: function once(events, listener) {
				return this.many(events, 1, listener);
			}

			/**
    * Removes all listeners, or those of the specified events. It's not a good
    * idea to remove listeners that were added elsewhere in the code,
    * especially when it's on an emitter that you didn't create.
    * @param {(Array|string)=} opt_events
    * @return {!Object} Returns emitter, so calls can be chained.
    */

		}, {
			key: 'removeAllListeners',
			value: function removeAllListeners(opt_events) {
				if (this.events_) {
					if (opt_events) {
						var events = this.toEventsArray_(opt_events);
						for (var i = 0; i < events.length; i++) {
							this.events_[events[i]] = null;
						}
					} else {
						this.events_ = null;
					}
				}
				return this;
			}

			/**
    * Removes all listener objects from the given array that match the given
    * listener function.
    * @param {Array.<Object>} listenerObjs
    * @param {!Function} listener
    * @return {Array.<Object>|Object} The new listeners array for this event.
    * @protected
    */

		}, {
			key: 'removeMatchingListenerObjs_',
			value: function removeMatchingListenerObjs_(listenerObjs, listener) {
				var finalListeners = [];
				for (var i = 0; i < listenerObjs.length; i++) {
					if (!this.matchesListener_(listenerObjs[i], listener)) {
						finalListeners.push(listenerObjs[i]);
					}
				}
				return finalListeners.length > 0 ? finalListeners : null;
			}

			/**
    * Removes a listener for the specified events.
    * Caution: changes array indices in the listener array behind the listener.
    * @param {!(Array|string)} events
    * @param {!Function} listener
    * @return {!Object} Returns emitter, so calls can be chained.
    */

		}, {
			key: 'removeListener',
			value: function removeListener() {
				return this.off.apply(this, arguments);
			}

			/**
    * Runs the handlers when an event is listened to.
    * @param {string} event
    * @protected
    */

		}, {
			key: 'runListenerHandlers_',
			value: function runListenerHandlers_(event) {
				var handlers = this.listenerHandlers_;
				if (handlers) {
					handlers = toArray(handlers);
					for (var i = 0; i < handlers.length; i++) {
						handlers[i](event);
					}
				}
			}

			/**
    * Runs the given listeners.
    * @param {!Array} listeners
    * @param {!Array} args
    * @param (Object) facade
    * @protected
    */

		}, {
			key: 'runListeners_',
			value: function runListeners_(listeners, args, facade) {
				if (facade) {
					args.push(facade);
				}

				var defaultListeners = [];
				for (var i = 0; i < listeners.length; i++) {
					var listener = listeners[i].fn || listeners[i];
					if (listeners[i].default) {
						defaultListeners.push(listener);
					} else {
						listener.apply(this, args);
					}
				}
				if (!facade || !facade.preventedDefault) {
					for (var j = 0; j < defaultListeners.length; j++) {
						defaultListeners[j].apply(this, args);
					}
				}
			}

			/**
    * Sets the configuration option which determines if an event facade should
    * be sent as a param of listeners when emitting events. If set to true, the
    * facade will be passed as the first argument of the listener.
    * @param {boolean} shouldUseFacade
    * @return {!Object} Returns emitter, so calls can be chained.
    */

		}, {
			key: 'setShouldUseFacade',
			value: function setShouldUseFacade(shouldUseFacade) {
				this.shouldUseFacade_ = shouldUseFacade;
				return this;
			}

			/**
    * Converts the parameter to an array if only one event is given. Reuses the
    * same array each time this conversion is done, to avoid using more memory
    * than necessary.
    * @param  {!(Array|string)} events
    * @return {!Array}
    * @protected
    */

		}, {
			key: 'toEventsArray_',
			value: function toEventsArray_(events) {
				if (isString(events)) {
					singleArray_[0] = events;
					events = singleArray_;
				}
				return events;
			}

			/**
    * Checks if the given listener is valid, throwing an exception when it's not.
    * @param  {*} listener
    * @protected
    */

		}, {
			key: 'validateListener_',
			value: function validateListener_(listener) {
				if (!isFunction(listener)) {
					throw new TypeError('Listener must be a function');
				}
			}
		}]);
		return EventEmitter;
	}(Disposable);

	function toArray(val) {
		val = val || [];
		return Array.isArray(val) ? val : [val];
	}

	this['metal']['EventEmitter'] = EventEmitter;
}).call(this);
'use strict';

(function () {
	var array = this['metalNamed']['metal']['array'];
	var Disposable = this['metalNamed']['metal']['Disposable'];

	/**
  * EventEmitterProxy utility. It's responsible for linking two EventEmitter
  * instances together, emitting events from the first emitter through the
  * second one. That means that listening to a supported event on the target
  * emitter will mean listening to it on the origin emitter as well.
  * @param {EventEmitter} originEmitter Events originated on this emitter
  *   will be fired for the target emitter's listeners as well.
  * @param {EventEmitter} targetEmitter Event listeners attached to this emitter
  *   will also be triggered when the event is fired by the origin emitter.
  * @param {Object} opt_blacklist Optional blacklist of events that should not be
  *   proxied.
  * @constructor
  * @extends {Disposable}
  */

	var EventEmitterProxy = function (_Disposable) {
		babelHelpers.inherits(EventEmitterProxy, _Disposable);

		function EventEmitterProxy(originEmitter, targetEmitter, opt_blacklist, opt_whitelist) {
			babelHelpers.classCallCheck(this, EventEmitterProxy);

			/**
    * Map of events that should not be proxied.
    * @type {Object}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (EventEmitterProxy.__proto__ || Object.getPrototypeOf(EventEmitterProxy)).call(this));

			_this.blacklist_ = opt_blacklist;

			/**
    * The origin emitter. This emitter's events will be proxied through the
    * target emitter.
    * @type {EventEmitter}
    * @protected
    */
			_this.originEmitter_ = originEmitter;

			/**
    * A list of events that are pending to be listened by an actual origin
    * emitter. Events are stored here when the origin doesn't exist, so they
    * can be set on a new origin when one is set.
    * @type {Array}
    * @protected
    */
			_this.pendingEvents_ = null;

			/**
    * Holds a map of events from the origin emitter that are already being proxied.
    * @type {Object<string, !EventHandle>}
    * @protected
    */
			_this.proxiedEvents_ = null;

			/**
    * The target emitter. This emitter will emit all events that come from
    * the origin emitter.
    * @type {EventEmitter}
    * @protected
    */
			_this.targetEmitter_ = targetEmitter;

			/**
    * Map of events that should be proxied. If whitelist is set blacklist is ignored.
    * @type {Object}
    * @protected
    */
			_this.whitelist_ = opt_whitelist;

			_this.startProxy_();
			return _this;
		}

		/**
   * Adds the given listener for the given event.
   * @param {string} event
   * @param {!function()} listener
   * @return {!EventHandle} The listened event's handle.
   * @protected
   */


		babelHelpers.createClass(EventEmitterProxy, [{
			key: 'addListener_',
			value: function addListener_(event, listener) {
				return this.originEmitter_.on(event, listener);
			}

			/**
    * Adds the proxy listener for the given event.
    * @param {string} event
    * @return {!EventHandle} The listened event's handle.
    * @protected
    */

		}, {
			key: 'addListenerForEvent_',
			value: function addListenerForEvent_(event) {
				return this.addListener_(event, this.emitOnTarget_.bind(this, event));
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.removeListeners_();
				this.proxiedEvents_ = null;
				this.originEmitter_ = null;
				this.targetEmitter_ = null;
			}

			/**
    * Emits the specified event type on the target emitter.
    * @param {string} eventType
    * @protected
    */

		}, {
			key: 'emitOnTarget_',
			value: function emitOnTarget_(eventType) {
				var args = [eventType].concat(array.slice(arguments, 1));
				this.targetEmitter_.emit.apply(this.targetEmitter_, args);
			}

			/**
    * Proxies the given event from the origin to the target emitter.
    * @param {string} event
    */

		}, {
			key: 'proxyEvent',
			value: function proxyEvent(event) {
				if (this.shouldProxyEvent_(event)) {
					this.tryToAddListener_(event);
				}
			}

			/**
    * Removes the proxy listener for all events.
    * @protected
    */

		}, {
			key: 'removeListeners_',
			value: function removeListeners_() {
				if (this.proxiedEvents_) {
					var events = Object.keys(this.proxiedEvents_);
					for (var i = 0; i < events.length; i++) {
						this.proxiedEvents_[events[i]].removeListener();
					}
					this.proxiedEvents_ = null;
				}
				this.pendingEvents_ = null;
			}

			/**
    * Changes the origin emitter. This automatically detaches any events that
    * were already being proxied from the previous emitter, and starts proxying
    * them on the new emitter instead.
    * @param {!EventEmitter} originEmitter
    */

		}, {
			key: 'setOriginEmitter',
			value: function setOriginEmitter(originEmitter) {
				var _this2 = this;

				var events = this.originEmitter_ && this.proxiedEvents_ ? Object.keys(this.proxiedEvents_) : this.pendingEvents_;
				this.originEmitter_ = originEmitter;
				if (events) {
					this.removeListeners_();
					events.forEach(function (event) {
						return _this2.proxyEvent(event);
					});
				}
			}

			/**
    * Checks if the given event should be proxied.
    * @param {string} event
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'shouldProxyEvent_',
			value: function shouldProxyEvent_(event) {
				if (this.whitelist_ && !this.whitelist_[event]) {
					return false;
				}
				if (this.blacklist_ && this.blacklist_[event]) {
					return false;
				}
				return !this.proxiedEvents_ || !this.proxiedEvents_[event];
			}

			/**
    * Starts proxying all events from the origin to the target emitter.
    * @protected
    */

		}, {
			key: 'startProxy_',
			value: function startProxy_() {
				this.targetEmitter_.onListener(this.proxyEvent.bind(this));
			}

			/**
    * Adds a listener to the origin emitter, if it exists. Otherwise, stores
    * the pending listener so it can be used on a future origin emitter.
    * @param {string} event
    * @protected
    */

		}, {
			key: 'tryToAddListener_',
			value: function tryToAddListener_(event) {
				if (this.originEmitter_) {
					this.proxiedEvents_ = this.proxiedEvents_ || {};
					this.proxiedEvents_[event] = this.addListenerForEvent_(event);
				} else {
					this.pendingEvents_ = this.pendingEvents_ || [];
					this.pendingEvents_.push(event);
				}
			}
		}]);
		return EventEmitterProxy;
	}(Disposable);

	this['metal']['EventEmitterProxy'] = EventEmitterProxy;
}).call(this);
'use strict';

(function () {
	var Disposable = this['metalNamed']['metal']['Disposable'];

	/**
  * EventHandler utility. It's useful for easily removing a group of
  * listeners from different EventEmitter instances.
  * @constructor
  * @extends {Disposable}
  */

	var EventHandler = function (_Disposable) {
		babelHelpers.inherits(EventHandler, _Disposable);

		function EventHandler() {
			babelHelpers.classCallCheck(this, EventHandler);

			/**
    * An array that holds the added event handles, so the listeners can be
    * removed later.
    * @type {Array.<EventHandle>}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (EventHandler.__proto__ || Object.getPrototypeOf(EventHandler)).call(this));

			_this.eventHandles_ = [];
			return _this;
		}

		/**
   * Adds event handles to be removed later through the `removeAllListeners`
   * method.
   * @param {...(!EventHandle)} var_args
   */


		babelHelpers.createClass(EventHandler, [{
			key: 'add',
			value: function add() {
				for (var i = 0; i < arguments.length; i++) {
					this.eventHandles_.push(arguments[i]);
				}
			}

			/**
    * Disposes of this instance's object references.
    * @override
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.eventHandles_ = null;
			}

			/**
    * Removes all listeners that have been added through the `add` method.
    */

		}, {
			key: 'removeAllListeners',
			value: function removeAllListeners() {
				for (var i = 0; i < this.eventHandles_.length; i++) {
					this.eventHandles_[i].removeListener();
				}

				this.eventHandles_ = [];
			}
		}]);
		return EventHandler;
	}(Disposable);

	this['metal']['EventHandler'] = EventHandler;
}).call(this);
'use strict';

(function () {
  var EventEmitter = this['metal']['EventEmitter'];
  var EventEmitterProxy = this['metal']['EventEmitterProxy'];
  var EventHandle = this['metal']['EventHandle'];
  var EventHandler = this['metal']['EventHandler'];
  this['metal']['events'] = EventEmitter;
  this['metalNamed']['events'] = this['metalNamed']['events'] || {};
  this['metalNamed']['events']['EventEmitter'] = EventEmitter;
  this['metalNamed']['events']['EventEmitterProxy'] = EventEmitterProxy;
  this['metalNamed']['events']['EventHandle'] = EventHandle;
  this['metalNamed']['events']['EventHandler'] = EventHandler;
}).call(this);
'use strict';

(function () {
	var array = this['metalNamed']['metal']['array'];
	var isString = this['metalNamed']['metal']['isString'];
	var domData = this['metal']['domData'];
	var EventHandle = this['metalNamed']['events']['EventHandle'];

	/**
  * This is a special EventHandle, that is responsible for dom delegated events
  * (only the ones that receive a target element, not a selector string).
  * @extends {EventHandle}
  */

	var DomDelegatedEventHandle = function (_EventHandle) {
		babelHelpers.inherits(DomDelegatedEventHandle, _EventHandle);

		/**
   * The constructor for `DomDelegatedEventHandle`.
   * @param {!Event} emitter Element the event was subscribed to.
   * @param {string} event The name of the event that was subscribed to.
   * @param {!Function} listener The listener subscribed to the event.
   * @param {string=} opt_selector An optional selector used when delegating
   *     the event.
   * @constructor
   */
		function DomDelegatedEventHandle(emitter, event, listener, opt_selector) {
			babelHelpers.classCallCheck(this, DomDelegatedEventHandle);

			var _this = babelHelpers.possibleConstructorReturn(this, (DomDelegatedEventHandle.__proto__ || Object.getPrototypeOf(DomDelegatedEventHandle)).call(this, emitter, event, listener));

			_this.selector_ = opt_selector;
			return _this;
		}

		/**
   * @inheritDoc
   */


		babelHelpers.createClass(DomDelegatedEventHandle, [{
			key: 'removeListener',
			value: function removeListener() {
				var delegating = domData.get(this.emitter_, 'delegating', {});
				var listeners = domData.get(this.emitter_, 'listeners', {});
				var selector = this.selector_;
				var arr = isString(selector) ? delegating[this.event_].selectors : listeners;
				var key = isString(selector) ? selector : this.event_;

				array.remove(arr[key] || [], this.listener_);
				if (arr[key] && arr[key].length === 0) {
					delete arr[key];
				}
			}
		}]);
		return DomDelegatedEventHandle;
	}(EventHandle);

	this['metal']['DomDelegatedEventHandle'] = DomDelegatedEventHandle;
}).call(this);
'use strict';

(function () {
	var EventHandle = this['metalNamed']['events']['EventHandle'];

	/**
  * This is a special EventHandle, that is responsible for dom events, instead
  * of EventEmitter events.
  * @extends {EventHandle}
  */

	var DomEventHandle = function (_EventHandle) {
		babelHelpers.inherits(DomEventHandle, _EventHandle);

		/**
   * The constructor for `DomEventHandle`.
   * @param {!EventEmitter} emitter Emitter the event was subscribed to.
   * @param {string} event The name of the event that was subscribed to.
   * @param {!Function} listener The listener subscribed to the event.
   * @param {boolean} opt_capture Flag indicating if listener should be triggered
   *   during capture phase, instead of during the bubbling phase. Defaults to false.
   * @constructor
   */
		function DomEventHandle(emitter, event, listener, opt_capture) {
			babelHelpers.classCallCheck(this, DomEventHandle);

			var _this = babelHelpers.possibleConstructorReturn(this, (DomEventHandle.__proto__ || Object.getPrototypeOf(DomEventHandle)).call(this, emitter, event, listener));

			_this.capture_ = opt_capture;
			return _this;
		}

		/**
   * @inheritDoc
   */


		babelHelpers.createClass(DomEventHandle, [{
			key: 'removeListener',
			value: function removeListener() {
				this.emitter_.removeEventListener(this.event_, this.listener_, this.capture_);
			}
		}]);
		return DomEventHandle;
	}(EventHandle);

	this['metal']['DomEventHandle'] = DomEventHandle;
}).call(this);
'use strict';

(function () {
	var isDef = this['metalNamed']['metal']['isDef'];
	var isDocument = this['metalNamed']['metal']['isDocument'];
	var isElement = this['metalNamed']['metal']['isElement'];
	var isObject = this['metalNamed']['metal']['isObject'];
	var isString = this['metalNamed']['metal']['isString'];
	var object = this['metalNamed']['metal']['object'];
	var domData = this['metal']['domData'];
	var DomDelegatedEventHandle = this['metal']['DomDelegatedEventHandle'];
	var DomEventHandle = this['metal']['DomEventHandle'];


	var elementsByTag_ = {};
	var supportCache_ = {};
	var customEvents = {};

	this['metalNamed']['domNamed'] = this['metalNamed']['domNamed'] || {};
	this['metalNamed']['domNamed']['customEvents'] = customEvents;
	var NEXT_TARGET = '__metal_next_target__';
	var USE_CAPTURE = {
		blur: true,
		error: true,
		focus: true,
		invalid: true,
		load: true,
		scroll: true
	};

	/**
  * Adds the requested CSS classes to an element.
  * @param {!Element|!Nodelist} elements The element or elements to add CSS classes to.
  * @param {string} classes CSS classes to add.
  */
	function addClasses(elements, classes) {
		if (!isObject(elements) || !isString(classes)) {
			return;
		}

		if (!elements.length) {
			elements = [elements];
		}

		for (var i = 0; i < elements.length; i++) {
			if ('classList' in elements[i]) {
				addClassesWithNative_(elements[i], classes);
			} else {
				addClassesWithoutNative_(elements[i], classes);
			}
		}
	}

	this['metalNamed']['domNamed']['addClasses'] = addClasses; /**
                                                             * Adds the requested CSS classes to an element using classList.
                                                             * @param {!Element} element The element to add CSS classes to.
                                                             * @param {string} classes CSS classes to add.
                                                             * @private
                                                             */

	function addClassesWithNative_(element, classes) {
		classes.split(' ').forEach(function (className) {
			if (className) {
				element.classList.add(className);
			}
		});
	}

	/**
  * Adds the requested CSS classes to an element without using classList.
  * @param {!Element} element The element to add CSS classes to.
  * @param {string} classes CSS classes to add.
  * @private
  */
	function addClassesWithoutNative_(element, classes) {
		var elementClassName = ' ' + element.className + ' ';
		var classesToAppend = '';

		classes = classes.split(' ');

		for (var i = 0; i < classes.length; i++) {
			var className = classes[i];

			if (elementClassName.indexOf(' ' + className + ' ') === -1) {
				classesToAppend += ' ' + className;
			}
		}

		if (classesToAppend) {
			element.className = element.className + classesToAppend;
		}
	}

	/**
  * Adds an event listener to the given element, to be triggered via delegate.
  * @param {!Element} element
  * @param {string} eventName
  * @param {!function()} listener
  * @private
  */
	function addElementListener_(element, eventName, listener) {
		addToArr_(domData.get(element, 'listeners', {}), eventName, listener);
	}

	/**
  * Adds an event listener to the given element, to be triggered via delegate
  * selectors.
  * @param {!Element} element
  * @param {string} eventName
  * @param {string} selector
  * @param {!function()} listener
  * @private
  */
	function addSelectorListener_(element, eventName, selector, listener) {
		var delegatingData = domData.get(element, 'delegating', {});
		addToArr_(delegatingData[eventName].selectors, selector, listener);
	}

	/**
  * Adds a value to an array inside an object, creating it first if it doesn't
  * yet exist.
  * @param {!Array} arr
  * @param {string} key
  * @param {*} value
  * @private
  */
	function addToArr_(arr, key, value) {
		if (!arr[key]) {
			arr[key] = [];
		}
		arr[key].push(value);
	}

	/**
  * Attaches a delegate listener, unless there's already one attached.
  * @param {!Element} element
  * @param {string} eventName
  * @private
  */
	function attachDelegateEvent_(element, eventName) {
		var delegatingData = domData.get(element, 'delegating', {});
		if (!delegatingData[eventName]) {
			delegatingData[eventName] = {
				handle: on(element, eventName, handleDelegateEvent_, !!USE_CAPTURE[eventName]),
				selectors: {}
			};
		}
	}

	/**
  * Gets the closest element up the tree from the given element (including
  * itself) that matches the specified selector, or null if none match.
  * @param {Element} element
  * @param {string} selector
  * @return {Element}
  */
	function closest(element, selector) {
		while (element && !match(element, selector)) {
			element = element.parentNode;
		}
		return element;
	}

	this['metalNamed']['domNamed']['closest'] = closest; /**
                                                       * Appends a child node with text or other nodes to a parent node. If
                                                       * child is a HTML string it will be automatically converted to a document
                                                       * fragment before appending it to the parent.
                                                       * @param {!Element} parent The node to append nodes to.
                                                       * @param {!(Element|NodeList|string)} child The thing to append to the parent.
                                                       * @return {!Element} The appended child.
                                                       */

	function append(parent, child) {
		if (isString(child)) {
			child = buildFragment(child);
		}
		if (child instanceof NodeList) {
			var childArr = Array.prototype.slice.call(child);
			for (var i = 0; i < childArr.length; i++) {
				parent.appendChild(childArr[i]);
			}
		} else {
			parent.appendChild(child);
		}
		return child;
	}

	this['metalNamed']['domNamed']['append'] = append; /**
                                                     * Helper for converting a HTML string into a document fragment.
                                                     * @param {string} htmlString The HTML string to convert.
                                                     * @return {!Element} The resulting document fragment.
                                                     */

	function buildFragment(htmlString) {
		var tempDiv = document.createElement('div');
		tempDiv.innerHTML = '<br>' + htmlString;
		tempDiv.removeChild(tempDiv.firstChild);

		var fragment = document.createDocumentFragment();
		while (tempDiv.firstChild) {
			fragment.appendChild(tempDiv.firstChild);
		}
		return fragment;
	}

	this['metalNamed']['domNamed']['buildFragment'] = buildFragment; /**
                                                                   * Checks if the first element contains the second one.
                                                                   * @param {!Element} element1
                                                                   * @param {!Element} element2
                                                                   * @return {boolean}
                                                                   */

	function contains(element1, element2) {
		if (isDocument(element1)) {
			// document.contains is not defined on IE9, so call it on documentElement instead.
			return element1.documentElement.contains(element2);
		} else {
			return element1.contains(element2);
		}
	}

	this['metalNamed']['domNamed']['contains'] = contains; /**
                                                         * Listens to the specified event on the given DOM element, but only calls the
                                                         * given callback listener when it's triggered by elements that match the
                                                         * given selector or target element.
                                                         * @param {!Element} element The DOM element the event should be listened on.
                                                         * @param {string} eventName The name of the event to listen to.
                                                         * @param {!Element|string} selectorOrTarget Either an element or css selector
                                                         *     that should match the event for the listener to be triggered.
                                                         * @param {!function(!Object)} callback Function to be called when the event
                                                         *     is triggered. It will receive the normalized event object.
                                                         * @param {boolean=} opt_default Optional flag indicating if this is a default
                                                         *     listener. That means that it would only be executed after all non
                                                         *     default listeners, and only if the event isn't prevented via
                                                         *     `preventDefault`.
                                                         * @return {!EventHandle} Can be used to remove the listener.
                                                         */

	function delegate(element, eventName, selectorOrTarget, callback, opt_default) {
		var customConfig = customEvents[eventName];
		if (customConfig && customConfig.delegate) {
			eventName = customConfig.originalEvent;
			callback = customConfig.handler.bind(customConfig, callback);
		}

		if (opt_default) {
			// Wrap callback so we don't set property directly on it.
			callback = callback.bind();
			callback.defaultListener_ = true;
		}

		attachDelegateEvent_(element, eventName);
		if (isString(selectorOrTarget)) {
			addSelectorListener_(element, eventName, selectorOrTarget, callback);
		} else {
			addElementListener_(selectorOrTarget, eventName, callback);
		}

		return new DomDelegatedEventHandle(isString(selectorOrTarget) ? element : selectorOrTarget, eventName, callback, isString(selectorOrTarget) ? selectorOrTarget : null);
	}

	this['metalNamed']['domNamed']['delegate'] = delegate; /**
                                                         * Verifies if the element is able to trigger the Click event,
                                                         * simulating browsers behaviour, avoiding event listeners to be called by triggerEvent method.
                                                         * @param {Element} node Element to be checked.
                                                         * @param {string} eventName The event name.
                                                         * @private
                                                         */

	function isAbleToInteractWith_(node, eventName, opt_eventObj) {
		if (opt_eventObj && eventName === 'click' && opt_eventObj.button === 2) {
			// Firefox triggers "click" events on the document for right clicks. This
			// causes our delegate logic to trigger it for regular elements too, which
			// shouldn't happen. Ignoring them here.
			return false;
		}

		var matchesSelector = ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'FIELDSET'];
		if (eventName === 'click' && matchesSelector.indexOf(node.tagName) > -1) {
			return !(node.disabled || parent(node, 'fieldset[disabled]'));
		}
		return true;
	}

	/**
  * Inserts node in document as last element.
  * @param {Element} node Element to remove children from.
  */
	function enterDocument(node) {
		node && append(document.body, node);
	}

	this['metalNamed']['domNamed']['enterDocument'] = enterDocument; /**
                                                                   * Removes node from document.
                                                                   * @param {Element} node Element to remove children from.
                                                                   */

	function exitDocument(node) {
		if (node && node.parentNode) {
			node.parentNode.removeChild(node);
		}
	}

	this['metalNamed']['domNamed']['exitDocument'] = exitDocument; /**
                                                                 * This is called when an event is triggered by a delegate listener. All
                                                                 * matching listeners of this event type from `target` to `currentTarget` will
                                                                 * be triggered.
                                                                 * @param {!Event} event The event payload.
                                                                 * @return {boolean} False if at least one of the triggered callbacks returns
                                                                 *     false, or true otherwise.
                                                                 * @private
                                                                 */

	function handleDelegateEvent_(event) {
		normalizeDelegateEvent_(event);
		var currElement = isDef(event[NEXT_TARGET]) ? event[NEXT_TARGET] : event.target;
		var ret = true;
		var container = event.currentTarget;
		var limit = event.currentTarget.parentNode;
		var defFns = [];

		ret &= triggerDelegatedListeners_(container, currElement, event, limit, defFns);
		ret &= triggerDefaultDelegatedListeners_(defFns, event);

		event.delegateTarget = null;
		event[NEXT_TARGET] = limit;
		return ret;
	}

	/**
  * Checks if the given element has the requested css class.
  * @param {!Element} element
  * @param {string} className
  * @return {boolean}
  */
	function hasClass(element, className) {
		if ('classList' in element) {
			return hasClassWithNative_(element, className);
		} else {
			return hasClassWithoutNative_(element, className);
		}
	}

	this['metalNamed']['domNamed']['hasClass'] = hasClass; /**
                                                         * Checks if the given element has the requested css class using classList.
                                                         * @param {!Element} element
                                                         * @param {string} className
                                                         * @return {boolean}
                                                         * @private
                                                         */

	function hasClassWithNative_(element, className) {
		return element.classList.contains(className);
	}

	/**
  * Checks if the given element has the requested css class without using classList.
  * @param {!Element} element
  * @param {string} className
  * @return {boolean}
  * @private
  */
	function hasClassWithoutNative_(element, className) {
		return (' ' + element.className + ' ').indexOf(' ' + className + ' ') >= 0;
	}

	/**
  * Checks if the given element is empty or not.
  * @param {!Element} element
  * @return {boolean}
  */
	function isEmpty(element) {
		return element.childNodes.length === 0;
	}

	this['metalNamed']['domNamed']['isEmpty'] = isEmpty; /**
                                                       * Check if an element matches a given selector.
                                                       * @param {Element} element
                                                       * @param {string} selector
                                                       * @return {boolean}
                                                       */

	function match(element, selector) {
		if (!element || element.nodeType !== 1) {
			return false;
		}

		var p = Element.prototype;
		var m = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector;
		if (m) {
			return m.call(element, selector);
		}

		return matchFallback_(element, selector);
	}

	this['metalNamed']['domNamed']['match'] = match; /**
                                                   * Check if an element matches a given selector, using an internal implementation
                                                   * instead of calling existing javascript functions.
                                                   * @param {Element} element
                                                   * @param {string} selector
                                                   * @return {boolean}
                                                   * @private
                                                   */

	function matchFallback_(element, selector) {
		var nodes = document.querySelectorAll(selector, element.parentNode);
		for (var i = 0; i < nodes.length; ++i) {
			if (nodes[i] === element) {
				return true;
			}
		}
		return false;
	}

	/**
  * Returns the next sibling of the given element that matches the specified
  * selector, or null if there is none.
  * @param {!Element} element
  * @param {?string} selector
  */
	function next(element, selector) {
		do {
			element = element.nextSibling;
			if (element && match(element, selector)) {
				return element;
			}
		} while (element);
		return null;
	}

	this['metalNamed']['domNamed']['next'] = next; /**
                                                 * Normalizes the event payload for delegate listeners.
                                                 * @param {!Event} event
                                                 * @private
                                                 */

	function normalizeDelegateEvent_(event) {
		event.stopPropagation = stopPropagation_;
		event.stopImmediatePropagation = stopImmediatePropagation_;
	}

	/**
  * Listens to the specified event on the given DOM element. This function normalizes
  * DOM event payloads and functions so they'll work the same way on all supported
  * browsers.
  * @param {!Element|string} element The DOM element to listen to the event on, or
  *   a selector that should be delegated on the entire document.
  * @param {string} eventName The name of the event to listen to.
  * @param {!function(!Object)} callback Function to be called when the event is
  *   triggered. It will receive the normalized event object.
  * @param {boolean} opt_capture Flag indicating if listener should be triggered
  *   during capture phase, instead of during the bubbling phase. Defaults to false.
  * @return {!DomEventHandle} Can be used to remove the listener.
  */
	function on(element, eventName, callback, opt_capture) {
		if (isString(element)) {
			return delegate(document, eventName, element, callback);
		}
		var customConfig = customEvents[eventName];
		if (customConfig && customConfig.event) {
			eventName = customConfig.originalEvent;
			callback = customConfig.handler.bind(customConfig, callback);
		}
		element.addEventListener(eventName, callback, opt_capture);
		return new DomEventHandle(element, eventName, callback, opt_capture);
	}

	this['metalNamed']['domNamed']['on'] = on; /**
                                             * Listens to the specified event on the given DOM element once. This
                                             * function normalizes DOM event payloads and functions so they'll work the
                                             * same way on all supported browsers.
                                             * @param {!Element} element The DOM element to listen to the event on.
                                             * @param {string} eventName The name of the event to listen to.
                                             * @param {!function(!Object)} callback Function to be called when the event
                                             *   is triggered. It will receive the normalized event object.
                                             * @return {!DomEventHandle} Can be used to remove the listener.
                                             */

	function once(element, eventName, callback) {
		var domEventHandle = on(element, eventName, function () {
			domEventHandle.removeListener();
			return callback.apply(this, arguments);
		});
		return domEventHandle;
	}

	this['metalNamed']['domNamed']['once'] = once; /**
                                                 * Gets the first parent from the given element that matches the specified
                                                 * selector, or null if none match.
                                                 * @param {!Element} element
                                                 * @param {string} selector
                                                 * @return {Element}
                                                 */

	function parent(element, selector) {
		return closest(element.parentNode, selector);
	}

	this['metalNamed']['domNamed']['parent'] = parent; /**
                                                     * Registers a custom event.
                                                     * @param {string} eventName The name of the custom event.
                                                     * @param {!Object} customConfig An object with information about how the event
                                                     *   should be handled.
                                                     */

	function registerCustomEvent(eventName, customConfig) {
		customEvents[eventName] = customConfig;
	}

	this['metalNamed']['domNamed']['registerCustomEvent'] = registerCustomEvent; /**
                                                                               * Removes all the child nodes on a DOM node.
                                                                               * @param {Element} node Element to remove children from.
                                                                               */

	function removeChildren(node) {
		var child;
		while (child = node.firstChild) {
			node.removeChild(child);
		}
	}

	this['metalNamed']['domNamed']['removeChildren'] = removeChildren; /**
                                                                     * Removes the requested CSS classes from an element.
                                                                     * @param {!Element|!NodeList} elements The element or elements to remove CSS classes from.
                                                                     * @param {string} classes CSS classes to remove.
                                                                     */

	function removeClasses(elements, classes) {
		if (!isObject(elements) || !isString(classes)) {
			return;
		}

		if (!elements.length) {
			elements = [elements];
		}

		for (var i = 0; i < elements.length; i++) {
			if ('classList' in elements[i]) {
				removeClassesWithNative_(elements[i], classes);
			} else {
				removeClassesWithoutNative_(elements[i], classes);
			}
		}
	}

	this['metalNamed']['domNamed']['removeClasses'] = removeClasses; /**
                                                                   * Removes the requested CSS classes from an element using classList.
                                                                   * @param {!Element} element The element to remove CSS classes from.
                                                                   * @param {string} classes CSS classes to remove.
                                                                   * @private
                                                                   */

	function removeClassesWithNative_(element, classes) {
		classes.split(' ').forEach(function (className) {
			if (className) {
				element.classList.remove(className);
			}
		});
	}

	/**
  * Removes the requested CSS classes from an element without using classList.
  * @param {!Element} element The element to remove CSS classes from.
  * @param {string} classes CSS classes to remove.
  * @private
  */
	function removeClassesWithoutNative_(element, classes) {
		var elementClassName = ' ' + element.className + ' ';

		classes = classes.split(' ');

		for (var i = 0; i < classes.length; i++) {
			elementClassName = elementClassName.replace(' ' + classes[i] + ' ', ' ');
		}

		element.className = elementClassName.trim();
	}

	/**
  * Replaces the first element with the second.
  * @param {Element} element1
  * @param {Element} element2
  */
	function replace(element1, element2) {
		if (element1 && element2 && element1 !== element2 && element1.parentNode) {
			element1.parentNode.insertBefore(element2, element1);
			element1.parentNode.removeChild(element1);
		}
	}

	this['metalNamed']['domNamed']['replace'] = replace; /**
                                                       * The function that replaces `stopImmediatePropagation_` for events.
                                                       * @private
                                                       */

	function stopImmediatePropagation_() {
		var event = this; // jshint ignore:line
		event.stopped = true;
		event.stoppedImmediate = true;
		Event.prototype.stopImmediatePropagation.call(event);
	}

	/**
  * The function that replaces `stopPropagation` for events.
  * @private
  */
	function stopPropagation_() {
		var event = this; // jshint ignore:line
		event.stopped = true;
		Event.prototype.stopPropagation.call(event);
	}

	/**
  * Checks if the given element supports the given event type.
  * @param {!Element|string} element The DOM element or element tag name to check.
  * @param {string} eventName The name of the event to check.
  * @return {boolean}
  */
	function supportsEvent(element, eventName) {
		if (customEvents[eventName]) {
			return true;
		}

		if (isString(element)) {
			if (!elementsByTag_[element]) {
				elementsByTag_[element] = document.createElement(element);
			}
			element = elementsByTag_[element];
		}

		var tag = element.tagName;
		if (!supportCache_[tag] || !supportCache_[tag].hasOwnProperty(eventName)) {
			supportCache_[tag] = supportCache_[tag] || {};
			supportCache_[tag][eventName] = 'on' + eventName in element;
		}
		return supportCache_[tag][eventName];
	}

	this['metalNamed']['domNamed']['supportsEvent'] = supportsEvent; /**
                                                                   * This triggers all default matched delegated listeners of a given event type.
                                                                   * @param {!Array} defaultFns Array to collect default listeners in, instead
                                                                   * @param {!Event} event
                                                                   * @return {boolean} False if at least one of the triggered callbacks returns
                                                                   *     false, or true otherwise.
                                                                   * @private
                                                                   */

	function triggerDefaultDelegatedListeners_(defFns, event) {
		var ret = true;

		for (var i = 0; i < defFns.length && !event.defaultPrevented; i++) {
			event.delegateTarget = defFns[i].element;
			ret &= defFns[i].fn(event);
		}

		return ret;
	}

	/**
  * This triggers all matched delegated listeners of a given event type when its
  * delegated target is able to interact.
  * @param {!Element} container
  * @param {!Element} currElement
  * @param {!Event} event
  * @param {!Element} limit the fartest parent of the given element
  * @param {!Array} defaultFns Array to collect default listeners in, instead
  *     of running them.
  * @return {boolean} False if at least one of the triggered callbacks returns
  *     false, or true otherwise.
  * @private
  */
	function triggerDelegatedListeners_(container, currElement, event, limit, defaultFns) {
		var ret = true;

		while (currElement && currElement !== limit && !event.stopped) {
			if (isAbleToInteractWith_(currElement, event.type, event)) {
				event.delegateTarget = currElement;
				ret &= triggerMatchedListeners_(container, currElement, event, defaultFns);
			}
			currElement = currElement.parentNode;
		}

		return ret;
	}

	/**
  * Converts the given argument to a DOM element. Strings are assumed to
  * be selectors, and so a matched element will be returned. If the arg
  * is already a DOM element it will be the return value.
  * @param {string|Element|Document} selectorOrElement
  * @return {Element} The converted element, or null if none was found.
  */
	function toElement(selectorOrElement) {
		if (isElement(selectorOrElement) || isDocument(selectorOrElement)) {
			return selectorOrElement;
		} else if (isString(selectorOrElement)) {
			if (selectorOrElement[0] === '#' && selectorOrElement.indexOf(' ') === -1) {
				return document.getElementById(selectorOrElement.substr(1));
			} else {
				return document.querySelector(selectorOrElement);
			}
		} else {
			return null;
		}
	}

	this['metalNamed']['domNamed']['toElement'] = toElement; /**
                                                           * Adds or removes one or more classes from an element. If any of the classes
                                                           * is present, it will be removed from the element, or added otherwise.
                                                           * @param {!Element} element The element which classes will be toggled.
                                                           * @param {string} classes The classes which have to added or removed from the element.
                                                           */

	function toggleClasses(element, classes) {
		if (!isObject(element) || !isString(classes)) {
			return;
		}

		if ('classList' in element) {
			toggleClassesWithNative_(element, classes);
		} else {
			toggleClassesWithoutNative_(element, classes);
		}
	}

	this['metalNamed']['domNamed']['toggleClasses'] = toggleClasses; /**
                                                                   * Adds or removes one or more classes from an element using classList.
                                                                   * If any of the classes is present, it will be removed from the element,
                                                                   * or added otherwise.
                                                                   * @param {!Element} element The element which classes will be toggled.
                                                                   * @param {string} classes The classes which have to added or removed from the element.
                                                                   * @private
                                                                   */

	function toggleClassesWithNative_(element, classes) {
		classes.split(' ').forEach(function (className) {
			element.classList.toggle(className);
		});
	}

	/**
  * Adds or removes one or more classes from an element without using classList.
  * If any of the classes is present, it will be removed from the element,
  * or added otherwise.
  * @param {!Element} element The element which classes will be toggled.
  * @param {string} classes The classes which have to added or removed from the element.
  * @private
  */
	function toggleClassesWithoutNative_(element, classes) {
		var elementClassName = ' ' + element.className + ' ';

		classes = classes.split(' ');

		for (var i = 0; i < classes.length; i++) {
			var className = ' ' + classes[i] + ' ';
			var classIndex = elementClassName.indexOf(className);

			if (classIndex === -1) {
				elementClassName = elementClassName + classes[i] + ' ';
			} else {
				elementClassName = elementClassName.substring(0, classIndex) + ' ' + elementClassName.substring(classIndex + className.length);
			}
		}

		element.className = elementClassName.trim();
	}

	/**
  * Triggers the specified event on the given element.
  * NOTE: This should mostly be used for testing, not on real code.
  * @param {!Element} element The node that should trigger the event.
  * @param {string} eventName The name of the event to be triggred.
  * @param {Object=} opt_eventObj An object with data that should be on the
  *   triggered event's payload.
  */
	function triggerEvent(element, eventName, opt_eventObj) {
		if (isAbleToInteractWith_(element, eventName, opt_eventObj)) {
			var eventObj = document.createEvent('HTMLEvents');
			eventObj.initEvent(eventName, true, true);
			object.mixin(eventObj, opt_eventObj);
			element.dispatchEvent(eventObj);
		}
	}

	this['metalNamed']['domNamed']['triggerEvent'] = triggerEvent; /**
                                                                 * Triggers the given listeners array.
                                                                 * @param {Array<!function()>} listeners
                                                                 * @param {!Event} event
                                                                 * @param {!Element} element
                                                                 * @param {!Array} defaultFns Array to collect default listeners in, instead
                                                                 *     of running them.
                                                                 * @return {boolean} False if at least one of the triggered callbacks returns
                                                                 *     false, or true otherwise.
                                                                 * @private
                                                                 */

	function triggerListeners_(listeners, event, element, defaultFns) {
		var ret = true;
		listeners = listeners || [];
		for (var i = 0; i < listeners.length && !event.stoppedImmediate; i++) {
			if (listeners[i].defaultListener_) {
				defaultFns.push({
					element: element,
					fn: listeners[i]
				});
			} else {
				ret &= listeners[i](event);
			}
		}
		return ret;
	}

	/**
  * Triggers all listeners for the given event type that are stored in the
  * specified element.
  * @param {!Element} container
  * @param {!Element} element
  * @param {!Event} event
  * @param {!Array} defaultFns Array to collect default listeners in, instead
  *     of running them.
  * @return {boolean} False if at least one of the triggered callbacks returns
  *     false, or true otherwise.
  * @private
  */
	function triggerMatchedListeners_(container, element, event, defaultFns) {
		var listeners = domData.get(element, 'listeners', {})[event.type];
		var ret = triggerListeners_(listeners, event, element, defaultFns);

		var delegatingData = domData.get(container, 'delegating', {});
		var selectorsMap = delegatingData[event.type].selectors;
		var selectors = Object.keys(selectorsMap);
		for (var i = 0; i < selectors.length && !event.stoppedImmediate; i++) {
			if (match(element, selectors[i])) {
				listeners = selectorsMap[selectors[i]];
				ret &= triggerListeners_(listeners, event, element, defaultFns);
			}
		}

		return ret;
	}
}).call(this);
'use strict';

// This file exists just for backwards compatibility, making sure that old
// default imports for this file still work. It's best to use the named exports
// for each function instead though, since that allows bundlers like Rollup to
// reduce the bundle size by removing unused code.

(function () {
  var dom = this['metalNamed']['domNamed'];
  this['metal']['dom'] = dom;
  this['metalNamed']['dom'] = this['metalNamed']['dom'] || {};
  this['metalNamed']['dom']['dom'] = dom;
  Object.keys(this['metalNamed']['domNamed']).forEach(function (key) {
    this['metalNamed']['dom'][key] = this['metalNamed']['domNamed'][key];
  });
}).call(this);
'use strict';

(function () {
	var delegate = this['metalNamed']['dom']['delegate'];
	var on = this['metalNamed']['dom']['on'];
	var supportsEvent = this['metalNamed']['dom']['supportsEvent'];
	var EventEmitterProxy = this['metalNamed']['events']['EventEmitterProxy'];

	/**
  * DomEventEmitterProxy utility. It extends `EventEmitterProxy` to also accept
  * dom elements as origin emitters.
  * @extends {EventEmitterProxy}
  */

	var DomEventEmitterProxy = function (_EventEmitterProxy) {
		babelHelpers.inherits(DomEventEmitterProxy, _EventEmitterProxy);

		function DomEventEmitterProxy() {
			babelHelpers.classCallCheck(this, DomEventEmitterProxy);
			return babelHelpers.possibleConstructorReturn(this, (DomEventEmitterProxy.__proto__ || Object.getPrototypeOf(DomEventEmitterProxy)).apply(this, arguments));
		}

		babelHelpers.createClass(DomEventEmitterProxy, [{
			key: 'addListener_',

			/**
    * Adds the given listener for the given event.
    * @param {string} event
    * @param {!function()} listener
    * @return {!EventHandle} The listened event's handle.
    * @protected
    * @override
    */
			value: function addListener_(event, listener) {
				if (this.originEmitter_.addEventListener) {
					if (this.isDelegateEvent_(event)) {
						var index = event.indexOf(':', 9);
						var eventName = event.substring(9, index);
						var selector = event.substring(index + 1);
						return delegate(this.originEmitter_, eventName, selector, listener);
					} else {
						return on(this.originEmitter_, event, listener);
					}
				} else {
					return babelHelpers.get(DomEventEmitterProxy.prototype.__proto__ || Object.getPrototypeOf(DomEventEmitterProxy.prototype), 'addListener_', this).call(this, event, listener);
				}
			}

			/**
    * Checks if the given event is of the delegate type.
    * @param {string} event
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'isDelegateEvent_',
			value: function isDelegateEvent_(event) {
				return event.substr(0, 9) === 'delegate:';
			}

			/**
    * Checks if the given event is supported by the origin element.
    * @param {string} event
    * @protected
    */

		}, {
			key: 'isSupportedDomEvent_',
			value: function isSupportedDomEvent_(event) {
				if (!this.originEmitter_ || !this.originEmitter_.addEventListener) {
					return true;
				}
				return this.isDelegateEvent_(event) && event.indexOf(':', 9) !== -1 || supportsEvent(this.originEmitter_, event);
			}

			/**
    * Checks if the given event should be proxied.
    * @param {string} event
    * @return {boolean}
    * @protected
    * @override
    */

		}, {
			key: 'shouldProxyEvent_',
			value: function shouldProxyEvent_(event) {
				return babelHelpers.get(DomEventEmitterProxy.prototype.__proto__ || Object.getPrototypeOf(DomEventEmitterProxy.prototype), 'shouldProxyEvent_', this).call(this, event) && this.isSupportedDomEvent_(event);
			}
		}]);
		return DomEventEmitterProxy;
	}(EventEmitterProxy);

	this['metal']['DomEventEmitterProxy'] = DomEventEmitterProxy;
}).call(this);
'use strict';

(function () {
	var append = this['metalNamed']['dom']['append'];
	var string = this['metalNamed']['metal']['string'];

	/**
  * Class with static methods responsible for doing browser feature checks.
  */

	var features = function () {
		function features() {
			babelHelpers.classCallCheck(this, features);
		}

		babelHelpers.createClass(features, null, [{
			key: 'checkAnimationEventName',

			/**
    * Some browsers still supports prefixed animation events. This method can
    * be used to retrieve the current browser event name for both, animation
    * and transition.
    * @return {object}
    */
			value: function checkAnimationEventName() {
				if (features.animationEventName_ === undefined) {
					features.animationEventName_ = {
						animation: features.checkAnimationEventName_('animation'),
						transition: features.checkAnimationEventName_('transition')
					};
				}
				return features.animationEventName_;
			}

			/**
    * @protected
    * @param {string} type Type to test: animation, transition.
    * @return {string} Browser event name.
    */

		}, {
			key: 'checkAnimationEventName_',
			value: function checkAnimationEventName_(type) {
				var prefixes = ['Webkit', 'MS', 'O', ''];
				var typeTitleCase = string.replaceInterval(type, 0, 1, type.substring(0, 1).toUpperCase());
				var suffixes = [typeTitleCase + 'End', typeTitleCase + 'End', typeTitleCase + 'End', type + 'end'];
				for (var i = 0; i < prefixes.length; i++) {
					if (features.animationElement_.style[prefixes[i] + typeTitleCase] !== undefined) {
						return prefixes[i].toLowerCase() + suffixes[i];
					}
				}
				return type + 'end';
			}

			/**
    * Some browsers (like IE9) change the order of element attributes, when html
    * is rendered. This method can be used to check if this behavior happens on
    * the current browser.
    * @return {boolean}
    */

		}, {
			key: 'checkAttrOrderChange',
			value: function checkAttrOrderChange() {
				if (features.attrOrderChange_ === undefined) {
					var originalContent = '<div data-component="" data-ref=""></div>';
					var element = document.createElement('div');
					append(element, originalContent);
					features.attrOrderChange_ = originalContent !== element.innerHTML;
				}
				return features.attrOrderChange_;
			}
		}]);
		return features;
	}();

	features.animationElement_ = document.createElement('div');
	features.animationEventName_ = undefined;
	features.attrOrderChange_ = undefined;

	this['metal']['features'] = features;
}).call(this);
'use strict';

(function () {
	var async = this['metalNamed']['metal']['async'];
	var exitDocument = this['metalNamed']['dom']['exitDocument'];
	var once = this['metalNamed']['dom']['once'];

	/**
  * Utility functions for running javascript code in the global scope.
  */

	var globalEval = function () {
		function globalEval() {
			babelHelpers.classCallCheck(this, globalEval);
		}

		babelHelpers.createClass(globalEval, null, [{
			key: 'run',

			/**
    * Evaluates the given string in the global scope.
    * @param {string} text
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    * @return {Element} script
    */
			value: function run(text, opt_appendFn) {
				var script = document.createElement('script');
				script.text = text;
				if (opt_appendFn) {
					opt_appendFn(script);
				} else {
					document.head.appendChild(script);
				}
				exitDocument(script);
				return script;
			}

			/**
    * Evaluates the given javascript file in the global scope.
    * @param {string} src The file's path.
    * @param {function()=} opt_callback Optional function to be called
    *   when the script has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    * @return {Element} script
    */

		}, {
			key: 'runFile',
			value: function runFile(src, opt_callback, opt_appendFn) {
				var script = document.createElement('script');
				script.src = src;

				var callback = function callback() {
					exitDocument(script);
					opt_callback && opt_callback();
				};
				once(script, 'load', callback);
				once(script, 'error', callback);

				if (opt_appendFn) {
					opt_appendFn(script);
				} else {
					document.head.appendChild(script);
				}

				return script;
			}

			/**
    * Evaluates the code referenced by the given script element.
    * @param {!Element} script
    * @param {function()=} opt_callback Optional function to be called
    *   when the script has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    * @return {Element} script
    */

		}, {
			key: 'runScript',
			value: function runScript(script, opt_callback, opt_appendFn) {
				var callback = function callback() {
					opt_callback && opt_callback();
				};
				if (script.type && script.type !== 'text/javascript') {
					async.nextTick(callback);
					return;
				}
				exitDocument(script);
				if (script.src) {
					return globalEval.runFile(script.src, opt_callback, opt_appendFn);
				} else {
					async.nextTick(callback);
					return globalEval.run(script.text, opt_appendFn);
				}
			}

			/**
    * Evaluates any script tags present in the given element.
    * @param {!Element} element
    * @param {function()=} opt_callback Optional function to be called
    *   when the script has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    */

		}, {
			key: 'runScriptsInElement',
			value: function runScriptsInElement(element, opt_callback, opt_appendFn) {
				var scripts = element.querySelectorAll('script');
				if (scripts.length) {
					globalEval.runScriptsInOrder(scripts, 0, opt_callback, opt_appendFn);
				} else if (opt_callback) {
					async.nextTick(opt_callback);
				}
			}

			/**
    * Runs the given scripts elements in the order that they appear.
    * @param {!NodeList} scripts
    * @param {number} index
    * @param {function()=} opt_callback Optional function to be called
    *   when the script has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    */

		}, {
			key: 'runScriptsInOrder',
			value: function runScriptsInOrder(scripts, index, opt_callback, opt_appendFn) {
				globalEval.runScript(scripts.item(index), function () {
					if (index < scripts.length - 1) {
						globalEval.runScriptsInOrder(scripts, index + 1, opt_callback, opt_appendFn);
					} else if (opt_callback) {
						async.nextTick(opt_callback);
					}
				}, opt_appendFn);
			}
		}]);
		return globalEval;
	}();

	this['metal']['globalEval'] = globalEval;
}).call(this);
'use strict';

(function () {
	var async = this['metalNamed']['metal']['async'];
	var once = this['metalNamed']['dom']['once'];

	/**
  * Utility functions for running styles.
  */

	var globalEvalStyles = function () {
		function globalEvalStyles() {
			babelHelpers.classCallCheck(this, globalEvalStyles);
		}

		babelHelpers.createClass(globalEvalStyles, null, [{
			key: 'run',

			/**
    * Evaluates the given style.
    * @param {string} text
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    * @return {Element} style
    */
			value: function run(text, opt_appendFn) {
				var style = document.createElement('style');
				style.innerHTML = text;
				if (opt_appendFn) {
					opt_appendFn(style);
				} else {
					document.head.appendChild(style);
				}
				return style;
			}

			/**
    * Evaluates the given style file.
    * @param {string} href The file's path.
    * @param {function()=} opt_callback Optional function to be called
    *   when the styles has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    * @return {Element} style
    */

		}, {
			key: 'runFile',
			value: function runFile(href, opt_callback, opt_appendFn) {
				var link = document.createElement('link');
				link.rel = 'stylesheet';
				link.href = href;
				globalEvalStyles.runStyle(link, opt_callback, opt_appendFn);
				return link;
			}

			/**
    * Evaluates the code referenced by the given style/link element.
    * @param {!Element} style
    * @param {function()=} opt_callback Optional function to be called
    *   when the script has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    *  @return {Element} style
    */

		}, {
			key: 'runStyle',
			value: function runStyle(style, opt_callback, opt_appendFn) {
				var callback = function callback() {
					opt_callback && opt_callback();
				};
				if (style.rel && style.rel !== 'stylesheet') {
					async.nextTick(callback);
					return;
				}

				if (style.tagName === 'STYLE') {
					async.nextTick(callback);
				} else {
					once(style, 'load', callback);
					once(style, 'error', callback);
				}

				if (opt_appendFn) {
					opt_appendFn(style);
				} else {
					document.head.appendChild(style);
				}

				return style;
			}

			/**
    * Evaluates any style present in the given element.
    * @param {!Element} element
    * @param {function()=} opt_callback Optional function to be called when the
    *   style has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    */

		}, {
			key: 'runStylesInElement',
			value: function runStylesInElement(element, opt_callback, opt_appendFn) {
				var styles = element.querySelectorAll('style,link');
				if (styles.length === 0 && opt_callback) {
					async.nextTick(opt_callback);
					return;
				}

				var loadCount = 0;
				var callback = function callback() {
					if (opt_callback && ++loadCount === styles.length) {
						async.nextTick(opt_callback);
					}
				};
				for (var i = 0; i < styles.length; i++) {
					globalEvalStyles.runStyle(styles[i], callback, opt_appendFn);
				}
			}
		}]);
		return globalEvalStyles;
	}();

	this['metal']['globalEvalStyles'] = globalEvalStyles;
}).call(this);
'use strict';

(function () {
	var registerCustomEvent = this['metalNamed']['dom']['registerCustomEvent'];
	var features = this['metal']['features'];


	var mouseEventMap = {
		mouseenter: 'mouseover',
		mouseleave: 'mouseout',
		pointerenter: 'pointerover',
		pointerleave: 'pointerout'
	};
	Object.keys(mouseEventMap).forEach(function (eventName) {
		registerCustomEvent(eventName, {
			delegate: true,
			handler: function handler(callback, event) {
				var related = event.relatedTarget;
				var target = event.delegateTarget;
				if (!related || related !== target && !target.contains(related)) {
					event.customType = eventName;
					return callback(event);
				}
			},
			originalEvent: mouseEventMap[eventName]
		});
	});

	var animationEventMap = {
		animation: 'animationend',
		transition: 'transitionend'
	};
	Object.keys(animationEventMap).forEach(function (eventType) {
		var eventName = animationEventMap[eventType];
		registerCustomEvent(eventName, {
			event: true,
			delegate: true,
			handler: function handler(callback, event) {
				event.customType = eventName;
				return callback(event);
			},
			originalEvent: features.checkAnimationEventName()[eventType]
		});
	});
}).call(this);
'use strict';

(function () {
  var dom = this['metal']['dom'];
  var domData = this['metal']['domData'];
  var DomEventEmitterProxy = this['metal']['DomEventEmitterProxy'];
  var DomEventHandle = this['metal']['DomEventHandle'];
  var features = this['metal']['features'];
  var globalEval = this['metal']['globalEval'];
  var globalEvalStyles = this['metal']['globalEvalStyles'];
  this['metalNamed']['dom'] = this['metalNamed']['dom'] || {};
  Object.keys(this['metalNamed']['dom']).forEach(function (key) {
    this['metalNamed']['dom'][key] = this['metalNamed']['dom'][key];
  });
  this['metalNamed']['dom']['domData'] = domData;
  this['metalNamed']['dom']['DomEventEmitterProxy'] = DomEventEmitterProxy;
  this['metalNamed']['dom']['DomEventHandle'] = DomEventHandle;
  this['metalNamed']['dom']['features'] = features;
  this['metalNamed']['dom']['globalEval'] = globalEval;
  this['metalNamed']['dom']['globalEvalStyles'] = globalEvalStyles;
  this['metal']['dom'] = dom;
}).call(this);
'use strict';

(function () {
	var getFunctionName = this['metalNamed']['metal']['getFunctionName'];
	var isDef = this['metalNamed']['metal']['isDef'];
	var isDefAndNotNull = this['metalNamed']['metal']['isDefAndNotNull'];
	var isNull = this['metalNamed']['metal']['isNull'];

	/**
  * Provides access to various type validators that will return an
  * instance of Error when validation fails. Note that all type validators
  * will also accept null or undefined values. To not accept these you should
  * instead make your state property required.
  */

	var validators = {
		any: function any() {
			return function () {
				return true;
			};
		},
		array: validateType('array'),
		bool: validateType('boolean'),
		func: validateType('function'),
		number: validateType('number'),
		object: validateType('object'),
		string: validateType('string'),

		/**
   * Creates a validator that checks the values of an array against a type.
   * @param {function()} validator Type validator to check each index against.
   * @return {function()} Validator.
   */
		arrayOf: function arrayOf(validator) {
			return maybe(function (value, name, context) {
				var result = validators.array(value, name, context);
				if (isInvalid(result)) {
					return result;
				}
				for (var i = 0; i < value.length; i++) {
					if (isInvalid(validator(value[i], name, context))) {
						return composeError('Expected an array of single type', name, context);
					}
				}
				return true;
			});
		},

		/**
   * Creates a validator that compares a value to a specific class.
   * @param {function()} expectedClass Class to check value against.
   * @return {function()} Validator.
   */
		instanceOf: function instanceOf(expectedClass) {
			return maybe(function (value, name, context) {
				if (!(value instanceof expectedClass)) {
					return composeError('Expected instance of ' + expectedClass, name, context);
				}
				return true;
			});
		},

		/**
   * Creates a validator that checks the values of an object against a type.
   * @param {function()} typeValidator Validator to check value against.
   * @return {function()} Validator.
   */
		objectOf: function objectOf(typeValidator) {
			return maybe(function (value, name, context) {
				for (var key in value) {
					if (isInvalid(typeValidator(value[key]))) {
						return composeError('Expected object of one type', name, context);
					}
				}
				return true;
			});
		},

		/**
   * Creates a validator that checks equality against specific values.
   * @param {!Array} arrayOfValues Array of values to check equality against.
   * @return {function()} Validator.
   */
		oneOf: function oneOf(arrayOfValues) {
			return maybe(function (value, name, context) {
				var result = validators.array(arrayOfValues, name, context);
				if (isInvalid(result)) {
					return result;
				}

				for (var i = 0; i < arrayOfValues.length; i++) {
					var oneOfValue = arrayOfValues[i];
					if (value === oneOfValue) {
						return true;
					}
				}

				return composeError('Expected one of given values.', name, context);
			});
		},

		/**
   * Creates a validator that checks a value against multiple types and only has
   * to pass one.
   * @param {!Array} arrayOfTypeValidators Array of validators to check value
   *     against.
   * @return {function()} Validator.
   */
		oneOfType: function oneOfType(arrayOfTypeValidators) {
			return maybe(function (value, name, context) {
				var result = validators.array(arrayOfTypeValidators, name, context);
				if (isInvalid(result)) {
					return result;
				}

				for (var i = 0; i < arrayOfTypeValidators.length; i++) {
					if (!isInvalid(arrayOfTypeValidators[i](value, name, context))) {
						return true;
					}
				}

				return composeError('Expected one of given types.', name, context);
			});
		},

		/**
   * Creates a validator that checks the shape of an object.
   * @param {!Object} shape An object containing type validators for each key.
   * @return {function()} Validator.
   */
		shapeOf: function shapeOf(shape) {
			return maybe(function (value, name, context) {
				var result = validators.object(shape, name, context);
				if (isInvalid(result)) {
					return result;
				}

				for (var key in shape) {
					var required = false;
					var validator = shape[key];
					if (validator.config) {
						required = validator.config.required;
						validator = validator.config.validator;
					}
					if (required && !isDefAndNotNull(value[key]) || isInvalid(validator(value[key]))) {
						return composeError('Expected object with a specific shape', name, context);
					}
				}

				return true;
			});
		}
	};

	/**
  * Composes a warning a warning message.
  * @param {string} error Error message to display to console.
  * @param {?string} name Name of state property that is giving the error.
  * @param {Object} context
  * @return {!Error} Instance of Error class.
  */
	function composeError(error, name, context) {
		var compName = context ? getFunctionName(context.constructor) : null;
		var renderer = context && context.getRenderer && context.getRenderer();
		var parent = renderer && renderer.getParent ? context.getRenderer().getParent() : null;
		var parentName = parent ? getFunctionName(parent.constructor) : null;
		var location = parentName ? 'Check render method of \'' + parentName + '\'.' : '';
		return new Error('Warning: Invalid state passed to \'' + name + '\'. ' + (error + ' Passed to \'' + compName + '\'. ' + location));
	}

	/**
  * Returns the type of the given value.
  * @param {*} value Any value.
  * @return {string} Type of value.
  */
	function getType(value) {
		var type = typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);
		if (Array.isArray(value)) {
			return 'array';
		}
		return type;
	}

	/**
  * Checks if the given validator result says that the value is invalid.
  * @param {boolean|!Error} result
  * @return {boolean}
  */
	function isInvalid(result) {
		return result instanceof Error;
	}

	/**
  * Creates a validator that checks a value against a single type, null, or
  * undefined.
  * @param {function()} typeValidator Validator to check value against.
  * @return {function()} Validator.
  */
	function maybe(typeValidator) {
		return function (value, name, context) {
			if (!isDef(value) || isNull(value)) {
				return true;
			}
			return typeValidator(value, name, context);
		};
	}

	/**
  * Creates a validator that checks against a specific primitive type. If this
  * validator is called with no arguments, it will return the actual validator
  * function instead of running it. That's done to allow all validators to be
  * used consistently, since some (like `arrayOf`) always require that you call
  * the function before receiving the actual validator.
  * @param {string} expectedType Type to check against.
  * @return {function()} Validator if called with arguments, or wrapper function
  *     that returns the validator otherwise.
  */
	function validateType(expectedType) {
		var validatorFn = maybe(function (value, name, context) {
			var type = getType(value);
			if (type !== expectedType) {
				return composeError('Expected type \'' + expectedType + '\', but received type \'' + type + '\'.', name, context);
			}
			return true;
		});
		return function () {
			if (arguments.length === 0) {
				return validatorFn;
			} else {
				return validatorFn.apply(undefined, arguments);
			}
		};
	}

	this['metal']['validators'] = validators;
}).call(this);
'use strict';

(function () {
	var object = this['metalNamed']['metal']['object'];
	var validators = this['metal']['validators'];

	/**
  * Sugar api that can be used as an alternative for manually building `State`
  * configuration in the expected format. For example, instead of having
  * something like this:
  *
  * ```js
  * MyClass.STATE = {
  *   foo: {
  *     required: true,
  *     validator: validators.number,
  *     value: 13
  *   }
  * };
  * ```
  *
  * You could instead do:
  *
  * ```js
  * MyClass.STATE = {
  *   foo: Config.required().number().value(13)
  * };
  * ```
  */

	var Config = {
		/**
   * Adds the `required` flag to the `State` configuration.
   * @param {boolean} required Flag to set "required" to. True by default.
   * @return {!Object} `State` configuration object.
   */
		required: function required() {
			var _required = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			return mergeConfig(this, { required: _required });
		},


		/**
   * Adds a setter to the `State` configuration.
   * @param {!function()} setter
   * @return {!Object} `State` configuration object.
   */
		setter: function setter(_setter) {
			return mergeConfig(this, { setter: _setter });
		},


		/**
   * Adds a validator to the `State` configuration.
   * @param {!function()} validator
   * @return {!Object} `State` configuration object.
   */
		validator: function validator(_validator) {
			return mergeConfig(this, { validator: _validator });
		},


		/**
   * Adds a default value to the `State` configuration.
   * @param {*} value
   * @return {!Object} `State` configuration object.
   */
		value: function value(_value) {
			return mergeConfig(this, { value: _value });
		}
	};

	/**
  * Merges the given config object into the one that has been built so far.
  * @param {!Object} context The object calling this function.
  * @param {!Object} config The object to merge to the built config.
  * @return {!Object} The final object containing the built config.
  */
	function mergeConfig(context, config) {
		var obj = context;
		if (obj === Config) {
			obj = Object.create(Config);
			obj.config = {};
		}
		object.mixin(obj.config, config);
		return obj;
	}

	// Add all validators to `Config`.
	var fnNames = Object.keys(validators);
	fnNames.forEach(function (name) {
		return Config[name] = function () {
			return this.validator(validators[name]);
		};
	});

	this['metal']['Config'] = Config;
}).call(this);
'use strict';

(function () {
	var async = this['metalNamed']['metal']['async'];
	var getStaticProperty = this['metalNamed']['metal']['getStaticProperty'];
	var isDefAndNotNull = this['metalNamed']['metal']['isDefAndNotNull'];
	var isFunction = this['metalNamed']['metal']['isFunction'];
	var isObject = this['metalNamed']['metal']['isObject'];
	var isString = this['metalNamed']['metal']['isString'];
	var object = this['metalNamed']['metal']['object'];
	var EventEmitter = this['metalNamed']['events']['EventEmitter'];

	/**
  * State adds support for having object properties that can be watched for
  * changes, as well as configured with validators, setters and other options.
  * See the `configState` method for a complete list of available configuration
  * options for each state key.
  * @extends {EventEmitter}
  */

	var State = function (_EventEmitter) {
		babelHelpers.inherits(State, _EventEmitter);

		/**
   * Constructor function for `State`.
   * @param {Object=} opt_config Optional config object with initial values to
   *     set state properties to.
   * @param {Object=} opt_obj Optional object that should hold the state
   *     properties. If none is given, they will be added directly to `this`
   *     instead.
   * @param {Object=} opt_context Optional context to call functions (like
   *     validators and setters) on. Defaults to `this`.
   */
		function State(opt_config, opt_obj, opt_context) {
			babelHelpers.classCallCheck(this, State);

			/**
    * Context to call functions (like validators and setters) on.
    * @type {!Object}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).call(this));

			_this.context_ = opt_context || _this;

			/**
    * Map of keys that can not be used as state keys.
    * @type {Object<string, boolean>}
    * @protected
    */
			_this.keysBlacklist_ = null;

			/**
    * Object that should hold the state properties.
    * @type {!Object}
    * @protected
    */
			_this.obj_ = opt_obj || _this;

			_this.eventData_ = null;

			/**
    * Object with information about the batch event that is currently
    * scheduled, or null if none is.
    * @type {Object}
    * @protected
    */
			_this.scheduledBatchData_ = null;

			/**
    * Object that contains information about all this instance's state keys.
    * @type {!Object<string, !Object>}
    * @protected
    */
			_this.stateInfo_ = {};

			_this.stateConfigs_ = {};

			_this.initialValues_ = object.mixin({}, opt_config);

			_this.setShouldUseFacade(true);
			_this.configStateFromStaticHint_();

			Object.defineProperty(_this.obj_, State.STATE_REF_KEY, {
				configurable: true,
				enumerable: false,
				value: _this
			});
			return _this;
		}

		/**
   * Logs an error if the given property is required but wasn't given.
   * @param {string} name
   * @protected
   */


		babelHelpers.createClass(State, [{
			key: 'assertGivenIfRequired_',
			value: function assertGivenIfRequired_(name) {
				var config = this.stateConfigs_[name];
				if (config.required) {
					var info = this.getStateInfo(name);
					var value = info.state === State.KeyStates.INITIALIZED ? this.get(name) : this.initialValues_[name];
					if (!isDefAndNotNull(value)) {
						console.error('The property called "' + name + '" is required but didn\'t ' + 'receive a value.');
					}
				}
			}

			/**
    * Checks that the given name is a valid state key name. If it's not, an error
    * will be thrown.
    * @param {string} name The name to be validated.
    * @throws {Error}
    * @protected
    */

		}, {
			key: 'assertValidStateKeyName_',
			value: function assertValidStateKeyName_(name) {
				if (this.keysBlacklist_ && this.keysBlacklist_[name]) {
					throw new Error('It\'s not allowed to create a state key with the name "' + name + '".');
				}
			}

			/**
    * Builds the property definition object for the specified state key.
    * @param {string} name The name of the key.
    * @return {!Object}
    * @protected
    */

		}, {
			key: 'buildKeyPropertyDef_',
			value: function buildKeyPropertyDef_(name) {
				return {
					configurable: true,
					enumerable: true,
					get: function get() {
						return this[State.STATE_REF_KEY].getStateKeyValue_(name);
					},
					set: function set(val) {
						this[State.STATE_REF_KEY].setStateKeyValue_(name, val);
					}
				};
			}

			/**
    * Calls the requested function, running the appropriate code for when it's
    * passed as an actual function object or just the function's name.
    * @param {!Function|string} fn Function, or name of the function to run.
    * @param {!Array} An optional array of parameters to be passed to the
    *   function that will be called.
    * @return {*} The return value of the called function.
    * @protected
    */

		}, {
			key: 'callFunction_',
			value: function callFunction_(fn, args) {
				if (isString(fn)) {
					return this.context_[fn].apply(this.context_, args);
				} else if (isFunction(fn)) {
					return fn.apply(this.context_, args);
				}
			}

			/**
    * Calls the state key's setter, if there is one.
    * @param {string} name The name of the key.
    * @param {*} value The value to be set.
    * @param {*} currentValue The current value.
    * @return {*} The final value to be set.
    * @protected
    */

		}, {
			key: 'callSetter_',
			value: function callSetter_(name, value, currentValue) {
				var config = this.stateConfigs_[name];
				if (config.setter) {
					value = this.callFunction_(config.setter, [value, currentValue]);
				}
				return value;
			}

			/**
    * Calls the state key's validator, if there is one. Emits console
    * warning if validator returns a string.
    * @param {string} name The name of the key.
    * @param {*} value The value to be validated.
    * @return {boolean} Flag indicating if value is valid or not.
    * @protected
    */

		}, {
			key: 'callValidator_',
			value: function callValidator_(name, value) {
				var config = this.stateConfigs_[name];
				if (config.validator) {
					var validatorReturn = this.callFunction_(config.validator, [value, name, this.context_]);

					if (validatorReturn instanceof Error) {
						console.error('Warning: ' + validatorReturn);
					}
					return validatorReturn;
				}
				return true;
			}

			/**
    * Checks if the it's allowed to write on the requested state key.
    * @param {string} name The name of the key.
    * @return {boolean}
    */

		}, {
			key: 'canSetState',
			value: function canSetState(name) {
				var info = this.getStateInfo(name);
				return !this.stateConfigs_[name].writeOnce || !info.written;
			}

			/**
    * Adds the given key(s) to the state, together with its(their) configs.
    * Config objects support the given settings:
    *     required - When set to `true`, causes errors to be printed (via
    *     `console.error`) if no value is given for the property.
    *
    *     setter - Function for normalizing state key values. It receives the new
    *     value that was set, and returns the value that should be stored.
    *
    *     validator - Function that validates state key values. When it returns
    *     false, the new value is ignored. When it returns an instance of Error,
    *     it will emit the error to the console.
    *
    *     value - The default value for the state key. Note that setting this to
    *     an object will cause all class instances to use the same reference to
    *     the object. To have each instance use a different reference for objects,
    *     use the `valueFn` option instead.
    *
    *     valueFn - A function that returns the default value for a state key.
    *
    *     writeOnce - Ignores writes to the state key after it's been first
    *     written to. That is, allows writes only when setting the value for the
    *     first time.
    * @param {!Object.<string, !Object>|string} configs An object that maps
    *     configuration options for keys to be added to the state.
    * @param {boolean|Object|*=} opt_context The context where the added state
    *     keys will be defined (defaults to `this`), or false if they shouldn't
    *     be defined at all.
    */

		}, {
			key: 'configState',
			value: function configState(configs, opt_context) {
				var names = Object.keys(configs);
				if (names.length === 0) {
					return;
				}

				if (opt_context !== false) {
					var props = {};
					for (var i = 0; i < names.length; i++) {
						var name = names[i];
						this.assertValidStateKeyName_(name);
						props[name] = this.buildKeyPropertyDef_(name);
					}
					Object.defineProperties(opt_context || this.obj_, props);
				}

				this.stateConfigs_ = configs;
				for (var _i = 0; _i < names.length; _i++) {
					var _name = names[_i];
					configs[_name] = configs[_name].config ? configs[_name].config : configs[_name];
					this.assertGivenIfRequired_(names[_i]);
					this.validateInitialValue_(names[_i]);
				}
			}

			/**
    * Adds state keys from super classes static hint `MyClass.STATE = {};`.
    * @param {Object.<string, !Object>=} opt_config An object that maps all the
    *     configurations for state keys.
    * @protected
    */

		}, {
			key: 'configStateFromStaticHint_',
			value: function configStateFromStaticHint_() {
				var ctor = this.constructor;
				if (ctor !== State) {
					var defineContext;
					if (this.obj_ === this) {
						defineContext = ctor.hasConfiguredState_ ? false : ctor.prototype;
						ctor.hasConfiguredState_ = true;
					}
					this.configState(State.getStateStatic(ctor), defineContext);
				}
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				babelHelpers.get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), 'disposeInternal', this).call(this);
				this.initialValues_ = null;
				this.stateInfo_ = null;
				this.stateConfigs_ = null;
				this.scheduledBatchData_ = null;
			}

			/**
    * Emits the state change batch event.
    * @protected
    */

		}, {
			key: 'emitBatchEvent_',
			value: function emitBatchEvent_() {
				if (!this.isDisposed()) {
					var data = this.scheduledBatchData_;
					this.scheduledBatchData_ = null;
					this.context_.emit('stateChanged', data);
				}
			}

			/**
    * Returns the value of the requested state key.
    * Note: this can and should be accomplished by accessing the value as a
    * regular property. This should only be used in cases where a function is
    * actually needed.
    * @param {string} name
    * @return {*}
    */

		}, {
			key: 'get',
			value: function get(name) {
				return this.obj_[name];
			}

			/**
    * Returns an object that maps state keys to their values.
    * @param {Array<string>=} opt_names A list of names of the keys that should
    *   be returned. If none is given, the whole state will be returned.
    * @return {Object.<string, *>}
    */

		}, {
			key: 'getState',
			value: function getState(opt_names) {
				var state = {};
				var names = opt_names || this.getStateKeys();

				for (var i = 0; i < names.length; i++) {
					state[names[i]] = this.get(names[i]);
				}

				return state;
			}

			/**
    * Gets information about the specified state property.
    * @param {string} name
    * @return {!Object}
    */

		}, {
			key: 'getStateInfo',
			value: function getStateInfo(name) {
				if (!this.stateInfo_[name]) {
					this.stateInfo_[name] = {};
				}
				return this.stateInfo_[name];
			}

			/**
    * Gets the config object for the requested state key.
    * @param {string} name The key's name.
    * @return {Object}
    * @protected
    */

		}, {
			key: 'getStateKeyConfig',
			value: function getStateKeyConfig(name) {
				return this.stateConfigs_ ? this.stateConfigs_[name] : null;
			}

			/**
    * Returns an array with all state keys.
    * @return {!Array.<string>}
    */

		}, {
			key: 'getStateKeys',
			value: function getStateKeys() {
				return this.stateConfigs_ ? Object.keys(this.stateConfigs_) : [];
			}

			/**
    * Gets the value of the specified state key. This is passed as that key's
    * getter to the `Object.defineProperty` call inside the `addKeyToState` method.
    * @param {string} name The name of the key.
    * @return {*}
    * @protected
    */

		}, {
			key: 'getStateKeyValue_',
			value: function getStateKeyValue_(name) {
				if (!this.warnIfDisposed_(name)) {
					this.initStateKey_(name);
					return this.getStateInfo(name).value;
				}
			}

			/**
    * Merges the STATE static variable for the given constructor function.
    * @param  {!Function} ctor Constructor function.
    * @return {boolean} Returns true if merge happens, false otherwise.
    * @static
    */

		}, {
			key: 'hasBeenSet',


			/**
    * Checks if the value of the state key with the given name has already been
    * set. Note that this doesn't run the key's getter.
    * @param {string} name The name of the key.
    * @return {boolean}
    */
			value: function hasBeenSet(name) {
				var info = this.getStateInfo(name);
				return info.state === State.KeyStates.INITIALIZED || this.hasInitialValue_(name);
			}

			/**
    * Checks if an initial value was given to the specified state property.
    * @param {string} name The name of the key.
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'hasInitialValue_',
			value: function hasInitialValue_(name) {
				return this.initialValues_.hasOwnProperty(name);
			}

			/**
    * Checks if the given key is present in this instance's state.
    * @param {string} key
    * @return {boolean}
    */

		}, {
			key: 'hasStateKey',
			value: function hasStateKey(key) {
				if (!this.warnIfDisposed_(key)) {
					return !!this.stateConfigs_[key];
				}
			}

			/**
    * Informs of changes to a state key's value through an event. Won't trigger
    * the event if the value hasn't changed or if it's being initialized.
    * @param {string} name The name of the key.
    * @param {*} prevVal The previous value of the key.
    * @protected
    */

		}, {
			key: 'informChange_',
			value: function informChange_(name, prevVal) {
				if (this.shouldInformChange_(name, prevVal)) {
					var data = object.mixin({
						key: name,
						newVal: this.get(name),
						prevVal: prevVal
					}, this.eventData_);
					this.context_.emit(name + 'Changed', data);
					this.context_.emit('stateKeyChanged', data);
					this.scheduleBatchEvent_(data);
				}
			}

			/**
    * Initializes the specified state key, giving it a first value.
    * @param {string} name The name of the key.
    * @protected
    */

		}, {
			key: 'initStateKey_',
			value: function initStateKey_(name) {
				var info = this.getStateInfo(name);
				if (info.state !== State.KeyStates.UNINITIALIZED) {
					return;
				}

				info.state = State.KeyStates.INITIALIZING;
				this.setInitialValue_(name);
				if (!info.written) {
					this.setDefaultValue(name);
				}
				info.state = State.KeyStates.INITIALIZED;
			}

			/**
    * Merges two values for the STATE property into a single object.
    * @param {Object} mergedVal
    * @param {Object} currVal
    * @return {!Object} The merged value.
    * @static
    */

		}, {
			key: 'removeStateKey',


			/**
    * Removes the requested state key.
    * @param {string} name The name of the key.
    */
			value: function removeStateKey(name) {
				this.stateInfo_[name] = null;
				this.stateConfigs_[name] = null;
				delete this.obj_[name];
			}

			/**
    * Schedules a state change batch event to be emitted asynchronously.
    * @param {!Object} changeData Information about a state key's update.
    * @protected
    */

		}, {
			key: 'scheduleBatchEvent_',
			value: function scheduleBatchEvent_(changeData) {
				if (!this.scheduledBatchData_) {
					async.nextTick(this.emitBatchEvent_, this);
					this.scheduledBatchData_ = object.mixin({
						changes: {}
					}, this.eventData_);
				}

				var name = changeData.key;
				var changes = this.scheduledBatchData_.changes;
				if (changes[name]) {
					changes[name].newVal = changeData.newVal;
				} else {
					changes[name] = changeData;
				}
			}

			/**
    * Sets the value of the requested state key.
    * Note: this can and should be accomplished by setting the state key as a
    * regular property. This should only be used in cases where a function is
    * actually needed.
    * @param {string} name
    * @param {*} value
    * @return {*}
    */

		}, {
			key: 'set',
			value: function set(name, value) {
				if (this.hasStateKey(name)) {
					this.obj_[name] = value;
				}
			}

			/**
    * Sets the default value of the requested state key.
    * @param {string} name The name of the key.
    * @return {*}
    */

		}, {
			key: 'setDefaultValue',
			value: function setDefaultValue(name) {
				var config = this.stateConfigs_[name];

				if (config.value !== undefined) {
					this.set(name, config.value);
				} else {
					this.set(name, this.callFunction_(config.valueFn));
				}
			}

			/**
    * Sets data to be sent with all events emitted from this instance.
    * @param {Object}
    */

		}, {
			key: 'setEventData',
			value: function setEventData(data) {
				this.eventData_ = data;
			}

			/**
    * Sets the initial value of the requested state key.
    * @param {string} name The name of the key.
    * @return {*}
    * @protected
    */

		}, {
			key: 'setInitialValue_',
			value: function setInitialValue_(name) {
				if (this.hasInitialValue_(name)) {
					this.set(name, this.initialValues_[name]);
					this.initialValues_[name] = undefined;
				}
			}

			/**
    * Sets a map of keys that are not valid state keys.
    * @param {!Object<string, boolean>}
    */

		}, {
			key: 'setKeysBlacklist_',
			value: function setKeysBlacklist_(blacklist) {
				this.keysBlacklist_ = blacklist;
			}

			/**
    * Sets the value of all the specified state keys.
    * @param {!Object.<string,*>} values A map of state keys to the values they
    *   should be set to.
    * @param {function()=} opt_callback An optional function that will be run
    *   after the next batched update is triggered.
    */

		}, {
			key: 'setState',
			value: function setState(values, opt_callback) {
				var _this2 = this;

				Object.keys(values).forEach(function (name) {
					return _this2.set(name, values[name]);
				});
				if (opt_callback && this.scheduledBatchData_) {
					this.context_.once('stateChanged', opt_callback);
				}
			}

			/**
    * Sets the value of the specified state key. This is passed as that key's
    * setter to the `Object.defineProperty` call inside the `addKeyToState`
    * method.
    * @param {string} name The name of the key.
    * @param {*} value The new value of the key.
    * @protected
    */

		}, {
			key: 'setStateKeyValue_',
			value: function setStateKeyValue_(name, value) {
				if (this.warnIfDisposed_(name) || !this.canSetState(name) || !this.validateKeyValue_(name, value)) {
					return;
				}

				var info = this.getStateInfo(name);
				if (!this.hasInitialValue_(name) && info.state === State.KeyStates.UNINITIALIZED) {
					info.state = State.KeyStates.INITIALIZED;
				}

				var prevVal = this.get(name);
				info.value = this.callSetter_(name, value, prevVal);
				this.assertGivenIfRequired_(name);
				info.written = true;
				this.informChange_(name, prevVal);
			}

			/**
    * Checks if we should inform about a state update. Updates are ignored during
    * state initialization. Otherwise, updates to primitive values are only
    * informed when the new value is different from the previous one. Updates to
    * objects (which includes functions and arrays) are always informed outside
    * initialization though, since we can't be sure if all of the internal data
    * has stayed the same.
    * @param {string} name The name of the key.
    * @param {*} prevVal The previous value of the key.
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'shouldInformChange_',
			value: function shouldInformChange_(name, prevVal) {
				var info = this.getStateInfo(name);
				return info.state === State.KeyStates.INITIALIZED && (isObject(prevVal) || prevVal !== this.get(name));
			}

			/**
    * Validates the initial value for the state property with the given name.
    * @param {string} name
    * @protected
    */

		}, {
			key: 'validateInitialValue_',
			value: function validateInitialValue_(name) {
				if (this.hasInitialValue_(name) && !this.callValidator_(name, this.initialValues_[name])) {
					delete this.initialValues_[name];
				}
			}

			/**
    * Validates the state key's value, which includes calling the validator
    * defined in the key's configuration object, if there is one.
    * @param {string} name The name of the key.
    * @param {*} value The value to be validated.
    * @return {boolean} Flag indicating if value is valid or not.
    * @protected
    */

		}, {
			key: 'validateKeyValue_',
			value: function validateKeyValue_(name, value) {
				var info = this.getStateInfo(name);
				return info.state === State.KeyStates.INITIALIZING || this.callValidator_(name, value);
			}

			/**
    * Warns if this instance has already been disposed.
    * @param {string} name Name of the property to be accessed if not disposed.
    * @return {boolean} True if disposed, or false otherwise.
    * @protected
    */

		}, {
			key: 'warnIfDisposed_',
			value: function warnIfDisposed_(name) {
				var disposed = this.isDisposed();
				if (disposed) {
					console.warn('Error. Trying to access property "' + name + '" on disposed instance');
				}
				return disposed;
			}
		}], [{
			key: 'getStateStatic',
			value: function getStateStatic(ctor) {
				return getStaticProperty(ctor, 'STATE', State.mergeState);
			}
		}, {
			key: 'mergeState',
			value: function mergeState(mergedVal, currVal) {
				return object.mixin({}, currVal, mergedVal);
			}
		}]);
		return State;
	}(EventEmitter);

	State.STATE_REF_KEY = '__METAL_STATE_REF_KEY__';

	/**
  * Constants that represent the states that a state key can be in.
  * @type {!Object}
  */
	State.KeyStates = {
		UNINITIALIZED: undefined,
		INITIALIZING: 1,
		INITIALIZED: 2
	};

	this['metal']['State'] = State;
}).call(this);
'use strict';

(function () {
  var validators = this['metal']['validators'];
  var Config = this['metal']['Config'];
  var State = this['metal']['State'];
  this['metal']['state'] = State;
  this['metalNamed']['state'] = this['metalNamed']['state'] || {};
  this['metalNamed']['state']['validators'] = validators;
  this['metalNamed']['state']['Config'] = Config;
  this['metalNamed']['state']['State'] = State;
}).call(this);
'use strict';

(function () {
	var object = this['metalNamed']['metal']['object'];
	var State = this['metal']['state'];


	var ComponentDataManager = {
		BLACKLIST: {
			components: true,
			context: true,
			element: true,
			refs: true,
			state: true,
			stateKey: true,
			wasRendered: true
		},

		/**
   * Creates the `State` instance that will handle the main component data.
   * @param {!Component} component
   * @param {!Object} data
   * @protected
   */
		createState_: function createState_(component, data) {
			var state = new State(component.getInitialConfig(), component, component);
			state.setKeysBlacklist_(this.BLACKLIST);
			state.configState(object.mixin({}, data, State.getStateStatic(component.constructor)));
			this.getManagerData(component).state_ = state;
		},


		/**
   * Disposes of any data being used by the manager in this component.
   * @param {!Component} component
   */
		dispose: function dispose(component) {
			var data = this.getManagerData(component);
			if (data.state_) {
				data.state_.dispose();
			}
			component.__DATA_MANAGER_DATA__ = null;
		},


		/**
   * Gets the data with the given name.
   * @param {!Component} component
   * @param {string} name
   * @return {*}
   */
		get: function get(component, name) {
			return this.getManagerData(component).state_.get(name);
		},


		/**
   * Gets the manager data for the given component.
   * @param {!Component} component
   * @return {Object}
   */
		getManagerData: function getManagerData(component) {
			return component.__DATA_MANAGER_DATA__;
		},


		/**
   * Gets the keys for state data that can be synced via `sync` functions.
   * @param {!Component} component
   * @return {!Array<string>}
   */
		getSyncKeys: function getSyncKeys(component) {
			return this.getManagerData(component).state_.getStateKeys();
		},


		/**
   * Gets the keys for state data.
   * @param {!Component} component
   * @return {!Array<string>}
   */
		getStateKeys: function getStateKeys(component) {
			return this.getManagerData(component).state_.getStateKeys();
		},


		/**
   * Gets the whole state data.
   * @param {!Component} component
   * @return {!Object}
   */
		getState: function getState(component) {
			return this.getManagerData(component).state_.getState();
		},


		/**
   * Gets the `State` instance being used.
   * @param {!Component} component
   * @return {!Object}
   */
		getStateInstance: function getStateInstance(component) {
			return this.getManagerData(component).state_;
		},


		/**
   * Updates all non internal data with the given values (or to the default
   * value if none is given).
   * @param {!Component} component
   * @param {!Object} data
   * @param {State=} opt_state
   */
		replaceNonInternal: function replaceNonInternal(component, data, opt_state) {
			var state = opt_state || this.getManagerData(component).state_;
			var keys = state.getStateKeys();
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				if (!state.getStateKeyConfig(key).internal) {
					if (data.hasOwnProperty(key)) {
						state.set(key, data[key]);
					} else {
						state.setDefaultValue(key);
					}
				}
			}
		},


		/**
   * Sets the value of all the specified state keys.
   * @param {!Component} component
   * @param {!Object.<string,*>} values A map of state keys to the values they
   *   should be set to.
   * @param {function()=} opt_callback An optional function that will be run
   *   after the next batched update is triggered.
   */
		setState: function setState(component, state, opt_callback) {
			this.getManagerData(component).state_.setState(state, opt_callback);
		},


		/**
   * Sets up the specified component's data.
   * @param {!Component} component
   * @param {!Object} data
   */
		setUp: function setUp(component, data) {
			component.__DATA_MANAGER_DATA__ = {};
			this.createState_(component, data);
		}
	};

	this['metal']['ComponentDataManager'] = ComponentDataManager;
}).call(this);
'use strict';

(function () {
	var getStaticProperty = this['metalNamed']['metal']['getStaticProperty'];
	var Disposable = this['metalNamed']['metal']['Disposable'];

	/**
  * Base class that component renderers should extend from. It defines the
  * required methods all renderers should have.
  */

	var ComponentRenderer = function (_Disposable) {
		babelHelpers.inherits(ComponentRenderer, _Disposable);

		/**
   * Constructor function for `ComponentRenderer`.
   * @param {!Component} component The component that this renderer is
   *     responsible for.
   */
		function ComponentRenderer(component) {
			babelHelpers.classCallCheck(this, ComponentRenderer);

			var _this = babelHelpers.possibleConstructorReturn(this, (ComponentRenderer.__proto__ || Object.getPrototypeOf(ComponentRenderer)).call(this));

			_this.component_ = component;

			_this.syncUpdates_ = getStaticProperty(component.constructor, 'SYNC_UPDATES');
			if (_this.hasSyncUpdates()) {
				_this.component_.on('stateKeyChanged', _this.handleRendererStateKeyChanged_.bind(_this));
			}
			return _this;
		}

		/**
   * Returns this renderer's component.
   * @return {!Component}
   */


		babelHelpers.createClass(ComponentRenderer, [{
			key: 'getComponent',
			value: function getComponent() {
				return this.component_;
			}

			/**
    * Returns extra configuration for data that should be added to the manager.
    * @return {Object}
    */

		}, {
			key: 'getExtraDataConfig',
			value: function getExtraDataConfig() {
				return null;
			}

			/**
    * Handles the "rendered" event.
    * @protected
    */

		}, {
			key: 'handleRendered_',
			value: function handleRendered_() {
				var firstRender = !this.isRendered_;
				this.isRendered_ = true;
				this.component_.rendered(firstRender);
				this.component_.emit('rendered', firstRender);
			}

			/**
    * Handles a `dataPropChanged` event from the component's data manager. This
    * is similar to `handleRendererStateChanged_`, but only called for
    * components that have requested updates to happen synchronously.
    * @param {!{key: string, newVal: *, prevVal: *}} data
    * @protected
    */

		}, {
			key: 'handleRendererStateKeyChanged_',
			value: function handleRendererStateKeyChanged_(data) {
				if (this.shouldRerender_()) {
					this.update({
						changes: babelHelpers.defineProperty({}, data.key, data)
					});
				}
			}

			/**
    * Checks if this component has sync updates enabled.
    * @return {boolean}
    */

		}, {
			key: 'hasSyncUpdates',
			value: function hasSyncUpdates() {
				return this.syncUpdates_;
			}

			/**
    * Renders the component's whole content (including its main element).
    */

		}, {
			key: 'render',
			value: function render() {
				if (!this.component_.element) {
					this.component_.element = document.createElement('div');
				}
				this.handleRendered_();
			}

			/**
    * Checks if changes should cause a rerender right now.
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'shouldRerender_',
			value: function shouldRerender_() {
				return this.isRendered_ && !this.skipUpdates_;
			}

			/**
    * Rerenders the component according to the given changes.
    * @param {!Object<string, Object>} changes Object containing the names
    *     of all changed state keys, each mapped to an object with its new
    *     (newVal) and previous (prevVal) values.
    */

		}, {
			key: 'sync',
			value: function sync(changes) {
				if (!this.hasSyncUpdates() && this.shouldRerender_()) {
					this.update(changes);
				}
			}

			/**
    * Skips updates until `stopSkipUpdates` is called.
    */

		}, {
			key: 'startSkipUpdates',
			value: function startSkipUpdates() {
				this.skipUpdates_ = true;
			}

			/**
    * Stops skipping updates.
    */

		}, {
			key: 'stopSkipUpdates',
			value: function stopSkipUpdates() {
				this.skipUpdates_ = false;
			}

			/**
    * Updates the component's element html. This is automatically called when
    * the value of at least one of the component's state keys has changed.
    * @param {Object.<string, Object>} changes Object containing the names
    *     of all changed state keys, each mapped to an object with its new
    *     (newVal) and previous (prevVal) values.
    */

		}, {
			key: 'update',
			value: function update() {}
		}]);
		return ComponentRenderer;
	}(Disposable);

	this['metal']['ComponentRenderer'] = ComponentRenderer;
}).call(this);
'use strict';

(function () {
	var getFunctionName = this['metalNamed']['metal']['getFunctionName'];
	var getStaticProperty = this['metalNamed']['metal']['getStaticProperty'];
	var isBoolean = this['metalNamed']['metal']['isBoolean'];
	var isDefAndNotNull = this['metalNamed']['metal']['isDefAndNotNull'];
	var isElement = this['metalNamed']['metal']['isElement'];
	var isFunction = this['metalNamed']['metal']['isFunction'];
	var isObject = this['metalNamed']['metal']['isObject'];
	var isString = this['metalNamed']['metal']['isString'];
	var object = this['metalNamed']['metal']['object'];
	var DomEventEmitterProxy = this['metalNamed']['dom']['DomEventEmitterProxy'];
	var toElement = this['metalNamed']['dom']['toElement'];
	var ComponentDataManager = this['metal']['ComponentDataManager'];
	var ComponentRenderer = this['metal']['ComponentRenderer'];
	var EventEmitter = this['metalNamed']['events']['EventEmitter'];
	var EventHandler = this['metalNamed']['events']['EventHandler'];

	/**
  * Component collects common behaviors to be followed by UI components, such
  * as Lifecycle, CSS classes management, events encapsulation and support for
  * different types of rendering.
  * Rendering logic can be done by either:
  *     - Listening to the `render` event inside the `created` lifecycle function
  *       and adding the rendering logic to the listener.
  *     - Using an existing implementation of `ComponentRenderer` like `Soy`,
  *       and following its patterns.
  *     - Building your own implementation of a `ComponentRenderer`.
  * Specifying the renderer that will be used can be done by setting the RENDERER
  * static variable to the renderer's constructor function.
  *
  * Example:
  *
  * <code>
  * class CustomComponent extends Component {
  *   constructor(config) {
  *     super(config);
  *   }
  *
  *   created() {
  *   }
  *
  *   rendered() {
  *   }
  *
  *   attached() {
  *   }
  *
  *   detached() {
  *   }
  * }
  *
  * CustomComponent.RENDERER = MyRenderer;
  *
  * CustomComponent.STATE = {
  *   title: { value: 'Title' },
  *   fontSize: { value: '10px' }
  * };
  * </code>
  *
  * @extends {State}
  */

	var Component = function (_EventEmitter) {
		babelHelpers.inherits(Component, _EventEmitter);

		/**
   * Constructor function for `Component`.
   * @param {Object=} opt_config An object with the initial values for this
   *     component's state.
   * @param {boolean|string|Element=} opt_parentElement The element where the
   *     component should be rendered. Can be given as a selector or an element.
   *     If `false` is passed, the component won't be rendered automatically
   *     after created.
   * @constructor
   */
		function Component(opt_config, opt_parentElement) {
			babelHelpers.classCallCheck(this, Component);

			/**
    * Gets all nested components.
    * @type {!Array<!Component>}
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this));

			_this.components = {};

			/**
    * Instance of `DomEventEmitterProxy` which proxies events from the component's
    * element to the component itself.
    * @type {!DomEventEmitterProxy}
    * @protected
    */
			_this.elementEventProxy_ = new DomEventEmitterProxy(null, _this, proxyBlackList_);

			/**
    * The `EventHandler` instance for events attached from the `events` state key.
    * @type {EventHandler}
    * @protected
    */
			_this.eventsStateKeyHandler_ = null;

			/**
    * Whether the element is in document.
    * @type {boolean}
    */
			_this.inDocument = false;

			/**
    * The initial config option passed to this constructor.
    * @type {!Object}
    * @protected
    */
			_this.initialConfig_ = opt_config || {};

			/**
    * Whether the element was rendered.
    * @type {boolean}
    */
			_this.wasRendered = false;

			/**
    * The component's element will be appended to the element this variable is
    * set to, unless the user specifies another parent when calling `render` or
    * `attach`.
    * @type {!Element}
    */
			_this.DEFAULT_ELEMENT_PARENT = document.body;

			_this.setShouldUseFacade(true);
			_this.element = _this.initialConfig_.element;

			_this.renderer_ = _this.createRenderer();
			_this.dataManager_ = getStaticProperty(_this.constructor, 'DATA_MANAGER');
			_this.dataManager_.setUp(_this, object.mixin({}, _this.renderer_.getExtraDataConfig(), Component.DATA));

			_this.on('stateChanged', _this.handleStateChanged_);
			_this.on('eventsChanged', _this.onEventsChanged_);
			_this.addListenersFromObj_(_this.dataManager_.get(_this, 'events'));

			_this.created();
			_this.componentCreated_ = true;
			if (opt_parentElement !== false) {
				_this.render_(opt_parentElement);
			}
			return _this;
		}

		/**
   * Getter logic for the element property.
   * @return {Element}
   */


		babelHelpers.createClass(Component, [{
			key: 'addListenersFromObj_',


			/**
    * Adds the listeners specified in the given object.
    * @param {Object} events
    * @protected
    */
			value: function addListenersFromObj_(events) {
				var eventNames = Object.keys(events || {});
				for (var i = 0; i < eventNames.length; i++) {
					var info = this.extractListenerInfo_(events[eventNames[i]]);
					if (info.fn) {
						var handler;
						if (info.selector) {
							handler = this.delegate(eventNames[i], info.selector, info.fn);
						} else {
							handler = this.on(eventNames[i], info.fn);
						}
						if (!this.eventsStateKeyHandler_) {
							this.eventsStateKeyHandler_ = new EventHandler();
						}
						this.eventsStateKeyHandler_.add(handler);
					}
				}
			}

			/**
    * Invokes the attached Lifecycle. When attached, the component element is
    * appended to the DOM and any other action to be performed must be
    * implemented in this method, such as, binding DOM events. A component can
    * be re-attached multiple times.
    * @param {(string|Element)=} opt_parentElement Optional parent element
    *     to render the component.
    * @param {(string|Element)=} opt_siblingElement Optional sibling element
    *     to render the component before it. Relevant when the component needs
    *     to be rendered before an existing element in the DOM.
    * @protected
    * @chainable
    */

		}, {
			key: 'attach',
			value: function attach(opt_parentElement, opt_siblingElement) {
				if (!this.inDocument) {
					this.renderElement_(opt_parentElement, opt_siblingElement);
					this.inDocument = true;
					this.attachData_ = {
						parent: opt_parentElement,
						sibling: opt_siblingElement
					};
					this.emit('attached', this.attachData_);
					this.attached();
				}
				return this;
			}

			/**
    * Lifecycle. When attached, the component element is appended to the DOM
    * and any other action to be performed must be implemented in this method,
    * such as, binding DOM events. A component can be re-attached multiple
    * times, therefore the undo behavior for any action performed in this phase
    * must be implemented on the detach phase.
    */

		}, {
			key: 'attached',
			value: function attached() {}

			/**
    * Adds the given sub component, replacing any existing one with the same ref.
    * @param {string} ref
    * @param {!Component} component
    */

		}, {
			key: 'addSubComponent',
			value: function addSubComponent(ref, component) {
				this.components[ref] = component;
			}

			/**
    * Lifecycle. This is called when the component has just been created, before
    * it's rendered.
    */

		}, {
			key: 'created',
			value: function created() {}

			/**
    * Creates the renderer for this component. Sub classes can override this to
    * return a custom renderer as needed.
    * @return {!ComponentRenderer}
    */

		}, {
			key: 'createRenderer',
			value: function createRenderer() {
				var RendererCtor = getStaticProperty(this.constructor, 'RENDERER');
				return new RendererCtor(this);
			}

			/**
    * Listens to a delegate event on the component's element.
    * @param {string} eventName The name of the event to listen to.
    * @param {string} selector The selector that matches the child elements that
    *   the event should be triggered for.
    * @param {!function(!Object)} callback Function to be called when the event is
    *   triggered. It will receive the normalized event object.
    * @return {!EventHandle} Can be used to remove the listener.
    */

		}, {
			key: 'delegate',
			value: function delegate(eventName, selector, callback) {
				return this.on('delegate:' + eventName + ':' + selector, callback);
			}

			/**
    * Invokes the detached Lifecycle. When detached, the component element is
    * removed from the DOM and any other action to be performed must be
    * implemented in this method, such as, unbinding DOM events. A component
    * can be detached multiple times.
    * @chainable
    */

		}, {
			key: 'detach',
			value: function detach() {
				if (this.inDocument) {
					if (this.element && this.element.parentNode) {
						this.element.parentNode.removeChild(this.element);
					}
					this.inDocument = false;
					this.detached();
				}
				this.emit('detached');
				return this;
			}

			/**
    * Lifecycle. When detached, the component element is removed from the DOM
    * and any other action to be performed must be implemented in this method,
    * such as, unbinding DOM events. A component can be detached multiple
    * times, therefore the undo behavior for any action performed in this phase
    * must be implemented on the attach phase.
    */

		}, {
			key: 'detached',
			value: function detached() {}

			/**
    * Lifecycle. Called when the component is disposed. Should be overridden by
    * sub classes to dispose of any internal data or events.
    */

		}, {
			key: 'disposed',
			value: function disposed() {}

			/**
    * @inheritDoc
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.disposed();

				this.detach();

				this.elementEventProxy_.dispose();
				this.elementEventProxy_ = null;

				this.disposeSubComponents(Object.keys(this.components));
				this.components = null;

				this.dataManager_.dispose(this);
				this.dataManager_ = null;

				this.renderer_.dispose();
				this.renderer_ = null;

				babelHelpers.get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'disposeInternal', this).call(this);
			}

			/**
    * Calls `dispose` on all subcomponents.
    * @param {!Array<string>} keys
    */

		}, {
			key: 'disposeSubComponents',
			value: function disposeSubComponents(keys) {
				for (var i = 0; i < keys.length; i++) {
					var component = this.components[keys[i]];
					if (component && !component.isDisposed()) {
						component.element = null;
						component.dispose();
						delete this.components[keys[i]];
					}
				}
			}

			/**
    * Extracts listener info from the given value.
    * @param {function()|string|{selector:string,fn:function()|string}} value
    * @return {!{selector:string,fn:function()}}
    * @protected
    */

		}, {
			key: 'extractListenerInfo_',
			value: function extractListenerInfo_(value) {
				var info = {
					fn: value
				};
				if (isObject(value) && !isFunction(value)) {
					info.selector = value.selector;
					info.fn = value.fn;
				}
				if (isString(info.fn)) {
					info.fn = this.getListenerFn(info.fn);
				}
				return info;
			}

			/**
    * Gets data about where this component was attached at.
    * @return {!Object}
    */

		}, {
			key: 'getAttachData',
			value: function getAttachData() {
				return this.attachData_;
			}

			/**
    * Gets the `ComponentDataManager` being used.
    * @return {!ComponentDataManager}
    */

		}, {
			key: 'getDataManager',
			value: function getDataManager() {
				return this.dataManager_;
			}

			/**
    * Gets the configuration object that was passed to this component's constructor.
    * @return {!Object}
    */

		}, {
			key: 'getInitialConfig',
			value: function getInitialConfig() {
				return this.initialConfig_;
			}

			/**
    * Gets the listener function from its name. If the name is prefixed with a
    * component id, the function will be called on that specified component. Otherwise
    * it will be called on this component instead.
    * @param {string} fnName
    * @return {function()}
    */

		}, {
			key: 'getListenerFn',
			value: function getListenerFn(fnName) {
				if (isFunction(this[fnName])) {
					return this[fnName].bind(this);
				} else {
					console.error('No function named "' + fnName + '" was found in the ' + 'component "' + getFunctionName(this.constructor) + '". Make ' + 'sure that you specify valid function names when adding inline listeners.');
				}
			}

			/**
    * Gets state data for this component.
    * @return {!Object}
    */

		}, {
			key: 'getState',
			value: function getState() {
				return this.dataManager_.getState(this);
			}

			/**
    * Gets the keys for the state data.
    * @return {!Array<string>}
    */

		}, {
			key: 'getStateKeys',
			value: function getStateKeys() {
				return this.dataManager_.getStateKeys(this);
			}

			/**
    * Gets the `sync` methods for this component's state.
    * @return {!Object}
    * @protected
    */

		}, {
			key: 'getSyncFns_',
			value: function getSyncFns_() {
				var ctor = this.constructor;
				if (!ctor.hasOwnProperty('__METAL_SYNC_FNS__')) {
					var fns = {};
					var keys = this.dataManager_.getSyncKeys(this);
					var shouldCache = true;
					for (var i = 0; i < keys.length; i++) {
						var name = 'sync' + keys[i].charAt(0).toUpperCase() + keys[i].slice(1);
						var fn = ctor.prototype[name] || this[name];
						if (fn) {
							fns[keys[i]] = fn;
							shouldCache = shouldCache && ctor.prototype[name];
						}
					}
					if (!shouldCache) {
						return fns;
					}
					ctor.__METAL_SYNC_FNS__ = fns;
				}
				return ctor.__METAL_SYNC_FNS__;
			}

			/**
    * Calls the synchronization function for the state key.
    * @param {string} key
    * @param {Object.<string, Object>=} opt_change Object containing newVal and
    *     prevVal keys.
    * @protected
    */

		}, {
			key: 'fireStateKeyChange_',
			value: function fireStateKeyChange_(key, opt_change) {
				var fn = this.getSyncFns_()[key];
				if (isFunction(fn)) {
					if (!opt_change) {
						var manager = this.getDataManager();
						opt_change = {
							newVal: manager.get(this, key),
							prevVal: undefined
						};
					}
					fn.call(this, opt_change.newVal, opt_change.prevVal);
				}
			}

			/**
    * Gets the `ComponentRenderer` instance being used.
    * @return {!ComponentRenderer}
    */

		}, {
			key: 'getRenderer',
			value: function getRenderer() {
				return this.renderer_;
			}

			/**
    * Handles state batch changes. Calls any existing `sync` functions that
    * match the changed state keys.
    * @param {Event} event
    * @protected
    */

		}, {
			key: 'handleStateChanged_',
			value: function handleStateChanged_(event) {
				this.getRenderer().sync(event);
				this.syncStateFromChanges_(event.changes);
				this.emit('stateSynced', event);
			}

			/**
    * Checks if the given function is a component constructor.
    * @param {!function()} fn Any function
    * @return {boolean}
    */

		}, {
			key: 'mergeElementClasses_',


			/**
    * Merges two values for the ELEMENT_CLASSES property into a single one.
    * @param {string} val1
    * @param {string} val2
    * @return {string} The merged value.
    * @protected
    */
			value: function mergeElementClasses_(val1, val2) {
				return val1 ? val1 + ' ' + (val2 || '') : val2;
			}

			/**
    * Fired when the `events` state value is changed.
    * @param {!Object} event
    * @protected
    */

		}, {
			key: 'onEventsChanged_',
			value: function onEventsChanged_(event) {
				if (this.eventsStateKeyHandler_) {
					this.eventsStateKeyHandler_.removeAllListeners();
				}
				this.addListenersFromObj_(event.newVal);
			}

			/**
    * Creates and renders a component for the given constructor function. This
    * will always make sure that the constructor runs without rendering the
    * component, having the `render` step happen only after it has finished.
    * @param {!function()} Ctor The component's constructor function.
    * @param {Object|Element=} opt_configOrElement Optional config data or parent
    *     for the component.
    * @param {Element=} opt_element Optional parent for the component.
    * @return {!Component} The rendered component's instance.
    */

		}, {
			key: 'render_',


			/**
    * Lifecycle. Renders the component into the DOM.
    *
    * Render Lifecycle:
    *   render event - The "render" event is emitted. Renderers act on this step.
    *   state synchronization - All synchronization methods are called.
    *   attach - Attach Lifecycle is called.
    *
    * @param {(string|Element|boolean)=} opt_parentElement Optional parent element
    *     to render the component. If set to `false`, the element won't be
    *     attached to any element after rendering. In this case, `attach` should
    *     be called manually later to actually attach it to the dom.
    * @param {boolean=} opt_skipRender Optional flag indicating that the actual
    *     rendering should be skipped. Only the other render lifecycle logic will
    *     be run, like syncing state and attaching the element. Should only
    *     be set if the component has already been rendered, like sub components.
    * @protected
    */
			value: function render_(opt_parentElement, opt_skipRender) {
				if (!opt_skipRender) {
					this.getRenderer().render();
					this.emit('render');
				}
				this.syncState_();
				this.attach(opt_parentElement);
				this.wasRendered = true;
			}

			/**
    * Renders this component as a subcomponent, meaning that no actual rendering is
    * needed since it was already rendered by the parent component. This just handles
    * other logics from the rendering lifecycle, like calling sync methods for the
    * state.
    */

		}, {
			key: 'renderAsSubComponent',
			value: function renderAsSubComponent() {
				this.render_(null, true);
			}

			/**
    * Renders the component element into the DOM.
    * @param {(string|Element)=} opt_parentElement Optional parent element
    *     to render the component.
    * @param {(string|Element)=} opt_siblingElement Optional sibling element
    *     to render the component before it. Relevant when the component needs
    *     to be rendered before an existing element in the DOM, e.g.
    *     `component.attach(null, existingElement)`.
    * @protected
    */

		}, {
			key: 'renderElement_',
			value: function renderElement_(opt_parentElement, opt_siblingElement) {
				var element = this.element;
				if (element && (opt_siblingElement || !element.parentNode)) {
					var parent = toElement(opt_parentElement) || this.DEFAULT_ELEMENT_PARENT;
					parent.insertBefore(element, toElement(opt_siblingElement));
				}
			}

			/**
    * Setter logic for the element property.
    * @param {?string|Element} val
    */

		}, {
			key: 'setState',


			/**
    * Sets the value of all the specified state keys.
    * @param {!Object.<string,*>} values A map of state keys to the values they
    *   should be set to.
    * @param {function()=} opt_callback An optional function that will be run
    *   after the next batched update is triggered.
    */
			value: function setState(state, opt_callback) {
				this.dataManager_.setState(this, state, opt_callback);
			}

			/**
    * Setter for the `elementClasses` data property. Appends given value with
    * the one specified in `ELEMENT_CLASSES`.
    * @param {string} val
    * @return {string}
    * @protected
    */

		}, {
			key: 'setterElementClassesFn_',
			value: function setterElementClassesFn_(val) {
				var elementClasses = getStaticProperty(this.constructor, 'ELEMENT_CLASSES', this.mergeElementClasses_);
				if (elementClasses) {
					val += ' ' + elementClasses;
				}
				return val.trim();
			}

			/**
    * Fires state synchronization functions.
    * @protected
    */

		}, {
			key: 'syncState_',
			value: function syncState_() {
				var keys = Object.keys(this.getSyncFns_());
				for (var i = 0; i < keys.length; i++) {
					this.fireStateKeyChange_(keys[i]);
				}
			}

			/**
    * Fires synchronization changes for state keys.
    * @param {Object.<string, Object>} changes Object containing the state key
    *     name as key and an object with newVal and prevVal as value.
    * @protected
    */

		}, {
			key: 'syncStateFromChanges_',
			value: function syncStateFromChanges_(changes) {
				for (var key in changes) {
					this.fireStateKeyChange_(key, changes[key]);
				}
			}

			/**
    * State synchronization logic for `visible` state key.
    * Updates the element's display value according to its visibility.
    * @param {boolean} newVal
    */

		}, {
			key: 'syncVisible',
			value: function syncVisible(newVal) {
				if (this.element) {
					this.element.style.display = newVal ? '' : 'none';
				}
			}

			/**
    * Lifecycle. Called whenever the component has just been rendered.
    * @param {boolean} firstRender Flag indicating if this was the component's
    *     first render.
    */

		}, {
			key: 'rendered',
			value: function rendered() {}

			/**
    * Validator logic for the `events` state key.
    * @param {Object} val
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'validatorEventsFn_',
			value: function validatorEventsFn_(val) {
				return !isDefAndNotNull(val) || isObject(val);
			}
		}, {
			key: 'element',
			get: function get() {
				return this.elementVal_;
			},
			set: function set(val) {
				if (!isElement(val) && !isString(val) && isDefAndNotNull(val)) {
					return;
				}

				if (val) {
					val = toElement(val) || this.elementVal_;
				}

				if (this.elementVal_ !== val) {
					var prev = this.elementVal_;
					this.elementVal_ = val;
					this.elementEventProxy_.setOriginEmitter(val);
					if (this.componentCreated_) {
						this.emit('elementChanged', {
							prevVal: prev,
							newVal: val
						});
						if (val && this.wasRendered) {
							this.syncVisible(this.dataManager_.get(this, 'visible'));
						}
					}
				}
			}
		}], [{
			key: 'isComponentCtor',
			value: function isComponentCtor(fn) {
				return fn.prototype && fn.prototype[Component.COMPONENT_FLAG];
			}
		}, {
			key: 'render',
			value: function render(Ctor, opt_configOrElement, opt_element) {
				var config = opt_configOrElement;
				var element = opt_element;
				if (isElement(opt_configOrElement)) {
					config = null;
					element = opt_configOrElement;
				}
				var instance = new Ctor(config, false);
				instance.render_(element);
				return instance;
			}
		}]);
		return Component;
	}(EventEmitter);

	/**
  * Component data definition.
  * @type {Object}
  * @static
  */


	Component.DATA = {
		/**
   * Objects describing children elements that were passed to be rendered inside
   * this component.
   * @type {!Array<!Object>}
   */
		children: {
			validator: Array.isArray,
			value: []
		},

		/**
   * CSS classes to be applied to the element.
   * @type {string}
   */
		elementClasses: {
			setter: 'setterElementClassesFn_',
			validator: isString,
			value: ''
		},

		/**
   * Listeners that should be attached to this component. Should be provided as an object,
   * where the keys are event names and the values are the listener functions (or function
   * names).
   * @type {Object<string, (function()|string|{selector: string, fn: function()|string})>}
   */
		events: {
			validator: 'validatorEventsFn_',
			value: null
		},

		/**
   * Indicates if the component is visible or not.
   * @type {boolean}
   */
		visible: {
			validator: isBoolean,
			value: true
		}
	};

	Component.COMPONENT_FLAG = '__metal_component__';

	/**
  * The `ComponentDataManager` class that should be used. This class will be
  * responsible for handling the component's data. Each component may have its
  * own implementation.
  */
	Component.DATA_MANAGER = ComponentDataManager;

	/**
  * CSS classes to be applied to the element.
  * @type {string}
  * @protected
  * @static
  */
	Component.ELEMENT_CLASSES = '';

	/**
  * The `ComponentRenderer` that should be used. Components need to set this
  * to a subclass of `ComponentRenderer` that has the rendering logic, like
  * `SoyRenderer`.
  * @type {!ComponentRenderer}
  * @static
  */
	Component.RENDERER = ComponentRenderer;

	/**
  * Flag indicating if component updates will happen synchronously. Updates are
  * done asynchronously by default, which allows changes to be batched and
  * applied together.
  * @type {boolean}
  */
	Component.SYNC_UPDATES = false;

	/**
  * Sets a prototype flag to easily determine if a given constructor is for
  * a component or not.
  */
	Component.prototype[Component.COMPONENT_FLAG] = true;

	var proxyBlackList_ = {
		eventsChanged: true,
		stateChanged: true,
		stateKeyChanged: true
	};

	this['metal']['Component'] = Component;
}).call(this);
'use strict';

(function () {
	var getFunctionName = this['metalNamed']['metal']['getFunctionName'];

	/**
  * The component registry is used to register components, so they can
  * be accessible by name.
  * @type {Object}
  */

	var ComponentRegistry = function () {
		function ComponentRegistry() {
			babelHelpers.classCallCheck(this, ComponentRegistry);
		}

		babelHelpers.createClass(ComponentRegistry, null, [{
			key: 'getConstructor',

			/**
    * Gets the constructor function for the given component name, or
    * undefined if it hasn't been registered yet.
    * @param {string} name The component's name.
    * @return {?function()}
    * @static
    */
			value: function getConstructor(name) {
				var constructorFn = ComponentRegistry.components_[name];
				if (!constructorFn) {
					console.error('There\'s no constructor registered for the component ' + 'named ' + name + '. Components need to be registered via ' + 'ComponentRegistry.register.');
				}
				return constructorFn;
			}

			/**
    * Registers a component, so it can be found by its name.
    * @param {!Function} constructorFn The component's constructor function.
    * @param {string=} opt_name Name of the registered component. If none is given
    *   the name defined by the NAME static variable will be used instead. If that
    *   isn't set as well, the name of the constructor function will be used.
    * @static
    */

		}, {
			key: 'register',
			value: function register(constructorFn, opt_name) {
				var name = opt_name;
				if (!name) {
					if (constructorFn.hasOwnProperty('NAME')) {
						name = constructorFn.NAME;
					} else {
						name = getFunctionName(constructorFn);
					}
				}
				constructorFn.NAME = name;
				ComponentRegistry.components_[name] = constructorFn;
			}
		}]);
		return ComponentRegistry;
	}();

	/**
  * Holds all registered components, indexed by their names.
  * @type {!Object<string, function()>}
  * @protected
  * @static
  */


	ComponentRegistry.components_ = {};

	this['metal']['ComponentRegistry'] = ComponentRegistry;
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['Component'];
  var ComponentDataManager = this['metal']['ComponentDataManager'];
  var ComponentRegistry = this['metal']['ComponentRegistry'];
  var ComponentRenderer = this['metal']['ComponentRenderer'];
  this['metal']['component'] = Component;
  this['metalNamed']['component'] = this['metalNamed']['component'] || {};
  this['metalNamed']['component']['Component'] = Component;
  this['metalNamed']['component']['ComponentDataManager'] = ComponentDataManager;
  this['metalNamed']['component']['ComponentRegistry'] = ComponentRegistry;
  this['metalNamed']['component']['ComponentRenderer'] = ComponentRenderer;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */

  /**
   * @license
   * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS-IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  (function (global, factory) {
    factory(global.IncrementalDOM = global.IncrementalDOM || {});
  })(window, function (exports) {
    'use strict';

    /**
     * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * A cached reference to the hasOwnProperty function.
     */

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    /**
     * A constructor function that will create blank objects.
     * @constructor
     */
    function Blank() {}

    Blank.prototype = Object.create(null);

    /**
     * Used to prevent property collisions between our "map" and its prototype.
     * @param {!Object<string, *>} map The map to check.
     * @param {string} property The property to check.
     * @return {boolean} Whether map has property.
     */
    var has = function has(map, property) {
      return hasOwnProperty.call(map, property);
    };

    /**
     * Creates an map object without a prototype.
     * @return {!Object}
     */
    var createMap = function createMap() {
      return new Blank();
    };

    /**
     * The property name where we store Incremental DOM data.
     */
    var DATA_PROP = '__incrementalDOMData';

    /**
     * Keeps track of information needed to perform diffs for a given DOM node.
     * @param {!string} nodeName
     * @param {?string=} key
     * @constructor
     */
    function NodeData(nodeName, key) {
      /**
       * The attributes and their values.
       * @const {!Object<string, *>}
       */
      this.attrs = createMap();

      /**
       * An array of attribute name/value pairs, used for quickly diffing the
       * incomming attributes to see if the DOM node's attributes need to be
       * updated.
       * @const {Array<*>}
       */
      this.attrsArr = [];

      /**
       * The incoming attributes for this Node, before they are updated.
       * @const {!Object<string, *>}
       */
      this.newAttrs = createMap();

      /**
       * Whether or not the statics have been applied for the node yet.
       * {boolean}
       */
      this.staticsApplied = false;

      /**
       * The key used to identify this node, used to preserve DOM nodes when they
       * move within their parent.
       * @const
       */
      this.key = key;

      /**
       * Keeps track of children within this node by their key.
       * {!Object<string, !Element>}
       */
      this.keyMap = createMap();

      /**
       * Whether or not the keyMap is currently valid.
       * @type {boolean}
       */
      this.keyMapValid = true;

      /**
       * Whether or the associated node is, or contains, a focused Element.
       * @type {boolean}
       */
      this.focused = false;

      /**
       * The node name for this node.
       * @const {string}
       */
      this.nodeName = nodeName;

      /**
       * @type {?string}
       */
      this.text = null;
    }

    /**
     * Initializes a NodeData object for a Node.
     *
     * @param {Node} node The node to initialize data for.
     * @param {string} nodeName The node name of node.
     * @param {?string=} key The key that identifies the node.
     * @return {!NodeData} The newly initialized data object
     */
    var initData = function initData(node, nodeName, key) {
      var data = new NodeData(nodeName, key);
      node[DATA_PROP] = data;
      return data;
    };

    /**
     * Retrieves the NodeData object for a Node, creating it if necessary.
     *
     * @param {?Node} node The Node to retrieve the data for.
     * @return {!NodeData} The NodeData for this Node.
     */
    var getData = function getData(node) {
      importNode(node);
      return node[DATA_PROP];
    };

    /**
     * Imports node and its subtree, initializing caches.
     *
     * @param {?Node} node The Node to import.
     */
    var importNode = function importNode(node) {
      if (node[DATA_PROP]) {
        return;
      }

      var isElement = node instanceof Element;
      var nodeName = isElement ? node.localName : node.nodeName;
      var key = isElement ? node.getAttribute('key') : null;
      var data = initData(node, nodeName, key);

      if (key) {
        getData(node.parentNode).keyMap[key] = node;
      }

      if (isElement) {
        var attributes = node.attributes;
        var attrs = data.attrs;
        var newAttrs = data.newAttrs;
        var attrsArr = data.attrsArr;

        for (var i = 0; i < attributes.length; i += 1) {
          var attr = attributes[i];
          var name = attr.name;
          var value = attr.value;

          attrs[name] = value;
          newAttrs[name] = undefined;
          attrsArr.push(name);
          attrsArr.push(value);
        }
      }

      for (var child = node.firstChild; child; child = child.nextSibling) {
        importNode(child);
      }
    };

    /**
     * Gets the namespace to create an element (of a given tag) in.
     * @param {string} tag The tag to get the namespace for.
     * @param {?Node} parent
     * @return {?string} The namespace to create the tag in.
     */
    var getNamespaceForTag = function getNamespaceForTag(tag, parent) {
      if (tag === 'svg') {
        return 'http://www.w3.org/2000/svg';
      }

      if (getData(parent).nodeName === 'foreignObject') {
        return null;
      }

      return parent.namespaceURI;
    };

    /**
     * Creates an Element.
     * @param {Document} doc The document with which to create the Element.
     * @param {?Node} parent
     * @param {string} tag The tag for the Element.
     * @param {?string=} key A key to identify the Element.
     * @return {!Element}
     */
    var createElement = function createElement(doc, parent, tag, key) {
      var namespace = getNamespaceForTag(tag, parent);
      var el = undefined;

      if (namespace) {
        el = doc.createElementNS(namespace, tag);
      } else {
        el = doc.createElement(tag);
      }

      initData(el, tag, key);

      return el;
    };

    /**
     * Creates a Text Node.
     * @param {Document} doc The document with which to create the Element.
     * @return {!Text}
     */
    var createText = function createText(doc) {
      var node = doc.createTextNode('');
      initData(node, '#text', null);
      return node;
    };

    /**
     * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /** @const */
    var notifications = {
      /**
       * Called after patch has compleated with any Nodes that have been created
       * and added to the DOM.
       * @type {?function(Array<!Node>)}
       */
      nodesCreated: null,

      /**
       * Called after patch has compleated with any Nodes that have been removed
       * from the DOM.
       * Note it's an applications responsibility to handle any childNodes.
       * @type {?function(Array<!Node>)}
       */
      nodesDeleted: null
    };

    /**
     * Keeps track of the state of a patch.
     * @constructor
     */
    function Context() {
      /**
       * @type {(Array<!Node>|undefined)}
       */
      this.created = notifications.nodesCreated && [];

      /**
       * @type {(Array<!Node>|undefined)}
       */
      this.deleted = notifications.nodesDeleted && [];
    }

    /**
     * @param {!Node} node
     */
    Context.prototype.markCreated = function (node) {
      if (this.created) {
        this.created.push(node);
      }
    };

    /**
     * @param {!Node} node
     */
    Context.prototype.markDeleted = function (node) {
      if (this.deleted) {
        this.deleted.push(node);
      }
    };

    /**
     * Notifies about nodes that were created during the patch opearation.
     */
    Context.prototype.notifyChanges = function () {
      if (this.created && this.created.length > 0) {
        notifications.nodesCreated(this.created);
      }

      if (this.deleted && this.deleted.length > 0) {
        notifications.nodesDeleted(this.deleted);
      }
    };

    /**
     * Copyright 2016 The Incremental DOM Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * @param {!Node} node
     * @return {boolean} True if the node the root of a document, false otherwise.
     */
    var isDocumentRoot = function isDocumentRoot(node) {
      // For ShadowRoots, check if they are a DocumentFragment instead of if they
      // are a ShadowRoot so that this can work in 'use strict' if ShadowRoots are
      // not supported.
      return node instanceof Document || node instanceof DocumentFragment;
    };

    /**
     * @param {!Node} node The node to start at, inclusive.
     * @param {?Node} root The root ancestor to get until, exclusive.
     * @return {!Array<!Node>} The ancestry of DOM nodes.
     */
    var getAncestry = function getAncestry(node, root) {
      var ancestry = [];
      var cur = node;

      while (cur !== root) {
        ancestry.push(cur);
        cur = cur.parentNode;
      }

      return ancestry;
    };

    /**
     * @param {!Node} node
     * @return {!Node} The root node of the DOM tree that contains node.
     */
    var getRoot = function getRoot(node) {
      var cur = node;
      var prev = cur;

      while (cur) {
        prev = cur;
        cur = cur.parentNode;
      }

      return prev;
    };

    /**
     * @param {!Node} node The node to get the activeElement for.
     * @return {?Element} The activeElement in the Document or ShadowRoot
     *     corresponding to node, if present.
     */
    var getActiveElement = function getActiveElement(node) {
      var root = getRoot(node);
      return isDocumentRoot(root) ? root.activeElement : null;
    };

    /**
     * Gets the path of nodes that contain the focused node in the same document as
     * a reference node, up until the root.
     * @param {!Node} node The reference node to get the activeElement for.
     * @param {?Node} root The root to get the focused path until.
     * @return {!Array<Node>}
     */
    var getFocusedPath = function getFocusedPath(node, root) {
      var activeElement = getActiveElement(node);

      if (!activeElement || !node.contains(activeElement)) {
        return [];
      }

      return getAncestry(activeElement, root);
    };

    /**
     * Like insertBefore, but instead instead of moving the desired node, instead
     * moves all the other nodes after.
     * @param {?Node} parentNode
     * @param {!Node} node
     * @param {?Node} referenceNode
     */
    var moveBefore = function moveBefore(parentNode, node, referenceNode) {
      var insertReferenceNode = node.nextSibling;
      var cur = referenceNode;

      while (cur !== node) {
        var next = cur.nextSibling;
        parentNode.insertBefore(cur, insertReferenceNode);
        cur = next;
      }
    };

    /** @type {?Context} */
    var context = null;

    /** @type {?Node} */
    var currentNode = null;

    /** @type {?Node} */
    var currentParent = null;

    /** @type {?Document} */
    var doc = null;

    /**
     * @param {!Array<Node>} focusPath The nodes to mark.
     * @param {boolean} focused Whether or not they are focused.
     */
    var markFocused = function markFocused(focusPath, focused) {
      for (var i = 0; i < focusPath.length; i += 1) {
        getData(focusPath[i]).focused = focused;
      }
    };

    /**
     * Returns a patcher function that sets up and restores a patch context,
     * running the run function with the provided data.
     * @param {function((!Element|!DocumentFragment),!function(T),T=): ?Node} run
     * @return {function((!Element|!DocumentFragment),!function(T),T=): ?Node}
     * @template T
     */
    var patchFactory = function patchFactory(run) {
      /**
       * TODO(moz): These annotations won't be necessary once we switch to Closure
       * Compiler's new type inference. Remove these once the switch is done.
       *
       * @param {(!Element|!DocumentFragment)} node
       * @param {!function(T)} fn
       * @param {T=} data
       * @return {?Node} node
       * @template T
       */
      var f = function f(node, fn, data) {
        var prevContext = context;
        var prevDoc = doc;
        var prevCurrentNode = currentNode;
        var prevCurrentParent = currentParent;
        var previousInAttributes = false;
        var previousInSkip = false;

        context = new Context();
        doc = node.ownerDocument;
        currentParent = node.parentNode;

        if ('production' !== 'production') {}

        var focusPath = getFocusedPath(node, currentParent);
        markFocused(focusPath, true);
        var retVal = run(node, fn, data);
        markFocused(focusPath, false);

        if ('production' !== 'production') {}

        context.notifyChanges();

        context = prevContext;
        doc = prevDoc;
        currentNode = prevCurrentNode;
        currentParent = prevCurrentParent;

        return retVal;
      };
      return f;
    };

    /**
     * Patches the document starting at node with the provided function. This
     * function may be called during an existing patch operation.
     * @param {!Element|!DocumentFragment} node The Element or Document
     *     to patch.
     * @param {!function(T)} fn A function containing elementOpen/elementClose/etc.
     *     calls that describe the DOM.
     * @param {T=} data An argument passed to fn to represent DOM state.
     * @return {!Node} The patched node.
     * @template T
     */
    var patchInner = patchFactory(function (node, fn, data) {
      currentNode = node;

      enterNode();
      fn(data);
      exitNode();

      if ('production' !== 'production') {}

      return node;
    });

    /**
     * Patches an Element with the the provided function. Exactly one top level
     * element call should be made corresponding to `node`.
     * @param {!Element} node The Element where the patch should start.
     * @param {!function(T)} fn A function containing elementOpen/elementClose/etc.
     *     calls that describe the DOM. This should have at most one top level
     *     element call.
     * @param {T=} data An argument passed to fn to represent DOM state.
     * @return {?Node} The node if it was updated, its replacedment or null if it
     *     was removed.
     * @template T
     */
    var patchOuter = patchFactory(function (node, fn, data) {
      var startNode = /** @type {!Element} */{ nextSibling: node };
      var expectedNextNode = null;
      var expectedPrevNode = null;

      if ('production' !== 'production') {}

      currentNode = startNode;
      fn(data);

      if ('production' !== 'production') {}

      if (node !== currentNode && node.parentNode) {
        removeChild(currentParent, node, getData(currentParent).keyMap);
      }

      return startNode === currentNode ? null : currentNode;
    });

    /**
     * Checks whether or not the current node matches the specified nodeName and
     * key.
     *
     * @param {!Node} matchNode A node to match the data to.
     * @param {?string} nodeName The nodeName for this node.
     * @param {?string=} key An optional key that identifies a node.
     * @return {boolean} True if the node matches, false otherwise.
     */
    var matches = function matches(matchNode, nodeName, key) {
      var data = getData(matchNode);

      // Key check is done using double equals as we want to treat a null key the
      // same as undefined. This should be okay as the only values allowed are
      // strings, null and undefined so the == semantics are not too weird.
      return nodeName === data.nodeName && key == data.key;
    };

    /**
     * Aligns the virtual Element definition with the actual DOM, moving the
     * corresponding DOM node to the correct location or creating it if necessary.
     * @param {string} nodeName For an Element, this should be a valid tag string.
     *     For a Text, this should be #text.
     * @param {?string=} key The key used to identify this element.
     */
    var alignWithDOM = function alignWithDOM(nodeName, key) {
      if (currentNode && matches(currentNode, nodeName, key)) {
        return;
      }

      var parentData = getData(currentParent);
      var currentNodeData = currentNode && getData(currentNode);
      var keyMap = parentData.keyMap;
      var node = undefined;

      // Check to see if the node has moved within the parent.
      if (key) {
        var keyNode = keyMap[key];
        if (keyNode) {
          if (matches(keyNode, nodeName, key)) {
            node = keyNode;
          } else if (keyNode === currentNode) {
            context.markDeleted(keyNode);
          } else {
            removeChild(currentParent, keyNode, keyMap);
          }
        }
      }

      // Create the node if it doesn't exist.
      if (!node) {
        if (nodeName === '#text') {
          node = createText(doc);
        } else {
          node = createElement(doc, currentParent, nodeName, key);
        }

        if (key) {
          keyMap[key] = node;
        }

        context.markCreated(node);
      }

      // Re-order the node into the right position, preserving focus if either
      // node or currentNode are focused by making sure that they are not detached
      // from the DOM.
      if (getData(node).focused) {
        // Move everything else before the node.
        moveBefore(currentParent, node, currentNode);
      } else if (currentNodeData && currentNodeData.key && !currentNodeData.focused) {
        // Remove the currentNode, which can always be added back since we hold a
        // reference through the keyMap. This prevents a large number of moves when
        // a keyed item is removed or moved backwards in the DOM.
        currentParent.replaceChild(node, currentNode);
        parentData.keyMapValid = false;
      } else {
        currentParent.insertBefore(node, currentNode);
      }

      currentNode = node;
    };

    /**
     * @param {?Node} node
     * @param {?Node} child
     * @param {?Object<string, !Element>} keyMap
     */
    var removeChild = function removeChild(node, child, keyMap) {
      if (child.parentNode === node) {
        node.removeChild(child);
      }
      context.markDeleted( /** @type {!Node}*/child);

      var key = getData(child).key;
      if (key) {
        delete keyMap[key];
      }
    };

    /**
     * Clears out any unvisited Nodes, as the corresponding virtual element
     * functions were never called for them.
     */
    var clearUnvisitedDOM = function clearUnvisitedDOM() {
      var node = currentParent;
      var data = getData(node);
      var keyMap = data.keyMap;
      var keyMapValid = data.keyMapValid;
      var child = node.lastChild;
      var key = undefined;

      if (child === currentNode && keyMapValid) {
        return;
      }

      while (child !== currentNode) {
        removeChild(node, child, keyMap);
        child = node.lastChild;
      }

      // Clean the keyMap, removing any unusued keys.
      if (!keyMapValid) {
        for (key in keyMap) {
          child = keyMap[key];
          if (child.parentNode !== node) {
            context.markDeleted(child);
            delete keyMap[key];
          }
        }

        data.keyMapValid = true;
      }
    };

    /**
     * Changes to the first child of the current node.
     */
    var enterNode = function enterNode() {
      currentParent = currentNode;
      currentNode = null;
    };

    /**
     * @return {?Node} The next Node to be patched.
     */
    var getNextNode = function getNextNode() {
      if (currentNode) {
        return currentNode.nextSibling;
      } else {
        return currentParent.firstChild;
      }
    };

    /**
     * Changes to the next sibling of the current node.
     */
    var nextNode = function nextNode() {
      currentNode = getNextNode();
    };

    /**
     * Changes to the parent of the current node, removing any unvisited children.
     */
    var exitNode = function exitNode() {
      clearUnvisitedDOM();

      currentNode = currentParent;
      currentParent = currentParent.parentNode;
    };

    /**
     * Makes sure that the current node is an Element with a matching tagName and
     * key.
     *
     * @param {string} tag The element's tag.
     * @param {?string=} key The key used to identify this element. This can be an
     *     empty string, but performance may be better if a unique value is used
     *     when iterating over an array of items.
     * @return {!Element} The corresponding Element.
     */
    var coreElementOpen = function coreElementOpen(tag, key) {
      nextNode();
      alignWithDOM(tag, key);
      enterNode();
      return (/** @type {!Element} */currentParent
      );
    };

    /**
     * Closes the currently open Element, removing any unvisited children if
     * necessary.
     *
     * @return {!Element} The corresponding Element.
     */
    var coreElementClose = function coreElementClose() {
      if ('production' !== 'production') {}

      exitNode();
      return (/** @type {!Element} */currentNode
      );
    };

    /**
     * Makes sure the current node is a Text node and creates a Text node if it is
     * not.
     *
     * @return {!Text} The corresponding Text Node.
     */
    var coreText = function coreText() {
      nextNode();
      alignWithDOM('#text', null);
      return (/** @type {!Text} */currentNode
      );
    };

    /**
     * Gets the current Element being patched.
     * @return {!Element}
     */
    var currentElement = function currentElement() {
      if ('production' !== 'production') {}
      return (/** @type {!Element} */currentParent
      );
    };

    /**
     * @return {Node} The Node that will be evaluated for the next instruction.
     */
    var currentPointer = function currentPointer() {
      if ('production' !== 'production') {}
      return getNextNode();
    };

    /**
     * Skips the children in a subtree, allowing an Element to be closed without
     * clearing out the children.
     */
    var skip = function skip() {
      if ('production' !== 'production') {}
      currentNode = currentParent.lastChild;
    };

    /**
     * Skips the next Node to be patched, moving the pointer forward to the next
     * sibling of the current pointer.
     */
    var skipNode = nextNode;

    /**
     * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /** @const */
    var symbols = {
      default: '__default'
    };

    /**
     * @param {string} name
     * @return {string|undefined} The namespace to use for the attribute.
     */
    var getNamespace = function getNamespace(name) {
      if (name.lastIndexOf('xml:', 0) === 0) {
        return 'http://www.w3.org/XML/1998/namespace';
      }

      if (name.lastIndexOf('xlink:', 0) === 0) {
        return 'http://www.w3.org/1999/xlink';
      }
    };

    /**
     * Applies an attribute or property to a given Element. If the value is null
     * or undefined, it is removed from the Element. Otherwise, the value is set
     * as an attribute.
     * @param {!Element} el
     * @param {string} name The attribute's name.
     * @param {?(boolean|number|string)=} value The attribute's value.
     */
    var applyAttr = function applyAttr(el, name, value) {
      if (value == null) {
        el.removeAttribute(name);
      } else {
        var attrNS = getNamespace(name);
        if (attrNS) {
          el.setAttributeNS(attrNS, name, value);
        } else {
          el.setAttribute(name, value);
        }
      }
    };

    /**
     * Applies a property to a given Element.
     * @param {!Element} el
     * @param {string} name The property's name.
     * @param {*} value The property's value.
     */
    var applyProp = function applyProp(el, name, value) {
      el[name] = value;
    };

    /**
     * Applies a value to a style declaration. Supports CSS custom properties by
     * setting properties containing a dash using CSSStyleDeclaration.setProperty.
     * @param {CSSStyleDeclaration} style
     * @param {!string} prop
     * @param {*} value
     */
    var setStyleValue = function setStyleValue(style, prop, value) {
      if (prop.indexOf('-') >= 0) {
        style.setProperty(prop, /** @type {string} */value);
      } else {
        style[prop] = value;
      }
    };

    /**
     * Applies a style to an Element. No vendor prefix expansion is done for
     * property names/values.
     * @param {!Element} el
     * @param {string} name The attribute's name.
     * @param {*} style The style to set. Either a string of css or an object
     *     containing property-value pairs.
     */
    var applyStyle = function applyStyle(el, name, style) {
      if (typeof style === 'string') {
        el.style.cssText = style;
      } else {
        el.style.cssText = '';
        var elStyle = el.style;
        var obj = /** @type {!Object<string,string>} */style;

        for (var prop in obj) {
          if (has(obj, prop)) {
            setStyleValue(elStyle, prop, obj[prop]);
          }
        }
      }
    };

    /**
     * Updates a single attribute on an Element.
     * @param {!Element} el
     * @param {string} name The attribute's name.
     * @param {*} value The attribute's value. If the value is an object or
     *     function it is set on the Element, otherwise, it is set as an HTML
     *     attribute.
     */
    var applyAttributeTyped = function applyAttributeTyped(el, name, value) {
      var type = typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);

      if (type === 'object' || type === 'function') {
        applyProp(el, name, value);
      } else {
        applyAttr(el, name, /** @type {?(boolean|number|string)} */value);
      }
    };

    /**
     * Calls the appropriate attribute mutator for this attribute.
     * @param {!Element} el
     * @param {string} name The attribute's name.
     * @param {*} value The attribute's value.
     */
    var updateAttribute = function updateAttribute(el, name, value) {
      var data = getData(el);
      var attrs = data.attrs;

      if (attrs[name] === value) {
        return;
      }

      var mutator = attributes[name] || attributes[symbols.default];
      mutator(el, name, value);

      attrs[name] = value;
    };

    /**
     * A publicly mutable object to provide custom mutators for attributes.
     * @const {!Object<string, function(!Element, string, *)>}
     */
    var attributes = createMap();

    // Special generic mutator that's called for any attribute that does not
    // have a specific mutator.
    attributes[symbols.default] = applyAttributeTyped;

    attributes['style'] = applyStyle;

    /**
     * The offset in the virtual element declaration where the attributes are
     * specified.
     * @const
     */
    var ATTRIBUTES_OFFSET = 3;

    /**
     * Builds an array of arguments for use with elementOpenStart, attr and
     * elementOpenEnd.
     * @const {Array<*>}
     */
    var argsBuilder = [];

    /**
     * @param {string} tag The element's tag.
     * @param {?string=} key The key used to identify this element. This can be an
     *     empty string, but performance may be better if a unique value is used
     *     when iterating over an array of items.
     * @param {?Array<*>=} statics An array of attribute name/value pairs of the
     *     static attributes for the Element. These will only be set once when the
     *     Element is created.
     * @param {...*} var_args, Attribute name/value pairs of the dynamic attributes
     *     for the Element.
     * @return {!Element} The corresponding Element.
     */
    var elementOpen = function elementOpen(tag, key, statics, var_args) {
      if ('production' !== 'production') {}

      var node = coreElementOpen(tag, key);
      var data = getData(node);

      if (!data.staticsApplied) {
        if (statics) {
          for (var _i = 0; _i < statics.length; _i += 2) {
            var name = /** @type {string} */statics[_i];
            var value = statics[_i + 1];
            updateAttribute(node, name, value);
          }
        }
        // Down the road, we may want to keep track of the statics array to use it
        // as an additional signal about whether a node matches or not. For now,
        // just use a marker so that we do not reapply statics.
        data.staticsApplied = true;
      }

      /*
       * Checks to see if one or more attributes have changed for a given Element.
       * When no attributes have changed, this is much faster than checking each
       * individual argument. When attributes have changed, the overhead of this is
       * minimal.
       */
      var attrsArr = data.attrsArr;
      var newAttrs = data.newAttrs;
      var isNew = !attrsArr.length;
      var i = ATTRIBUTES_OFFSET;
      var j = 0;

      for (; i < arguments.length; i += 2, j += 2) {
        var _attr = arguments[i];
        if (isNew) {
          attrsArr[j] = _attr;
          newAttrs[_attr] = undefined;
        } else if (attrsArr[j] !== _attr) {
          break;
        }

        var value = arguments[i + 1];
        if (isNew || attrsArr[j + 1] !== value) {
          attrsArr[j + 1] = value;
          updateAttribute(node, _attr, value);
        }
      }

      if (i < arguments.length || j < attrsArr.length) {
        for (; i < arguments.length; i += 1, j += 1) {
          attrsArr[j] = arguments[i];
        }

        if (j < attrsArr.length) {
          attrsArr.length = j;
        }

        /*
         * Actually perform the attribute update.
         */
        for (i = 0; i < attrsArr.length; i += 2) {
          var name = /** @type {string} */attrsArr[i];
          var value = attrsArr[i + 1];
          newAttrs[name] = value;
        }

        for (var _attr2 in newAttrs) {
          updateAttribute(node, _attr2, newAttrs[_attr2]);
          newAttrs[_attr2] = undefined;
        }
      }

      return node;
    };

    /**
     * Declares a virtual Element at the current location in the document. This
     * corresponds to an opening tag and a elementClose tag is required. This is
     * like elementOpen, but the attributes are defined using the attr function
     * rather than being passed as arguments. Must be folllowed by 0 or more calls
     * to attr, then a call to elementOpenEnd.
     * @param {string} tag The element's tag.
     * @param {?string=} key The key used to identify this element. This can be an
     *     empty string, but performance may be better if a unique value is used
     *     when iterating over an array of items.
     * @param {?Array<*>=} statics An array of attribute name/value pairs of the
     *     static attributes for the Element. These will only be set once when the
     *     Element is created.
     */
    var elementOpenStart = function elementOpenStart(tag, key, statics) {
      if ('production' !== 'production') {}

      argsBuilder[0] = tag;
      argsBuilder[1] = key;
      argsBuilder[2] = statics;
    };

    /***
     * Defines a virtual attribute at this point of the DOM. This is only valid
     * when called between elementOpenStart and elementOpenEnd.
     *
     * @param {string} name
     * @param {*} value
     */
    var attr = function attr(name, value) {
      if ('production' !== 'production') {}

      argsBuilder.push(name);
      argsBuilder.push(value);
    };

    /**
     * Closes an open tag started with elementOpenStart.
     * @return {!Element} The corresponding Element.
     */
    var elementOpenEnd = function elementOpenEnd() {
      if ('production' !== 'production') {}

      var node = elementOpen.apply(null, argsBuilder);
      argsBuilder.length = 0;
      return node;
    };

    /**
     * Closes an open virtual Element.
     *
     * @param {string} tag The element's tag.
     * @return {!Element} The corresponding Element.
     */
    var elementClose = function elementClose(tag) {
      if ('production' !== 'production') {}

      var node = coreElementClose();

      if ('production' !== 'production') {}

      return node;
    };

    /**
     * Declares a virtual Element at the current location in the document that has
     * no children.
     * @param {string} tag The element's tag.
     * @param {?string=} key The key used to identify this element. This can be an
     *     empty string, but performance may be better if a unique value is used
     *     when iterating over an array of items.
     * @param {?Array<*>=} statics An array of attribute name/value pairs of the
     *     static attributes for the Element. These will only be set once when the
     *     Element is created.
     * @param {...*} var_args Attribute name/value pairs of the dynamic attributes
     *     for the Element.
     * @return {!Element} The corresponding Element.
     */
    var elementVoid = function elementVoid(tag, key, statics, var_args) {
      elementOpen.apply(null, arguments);
      return elementClose(tag);
    };

    /**
     * Declares a virtual Text at this point in the document.
     *
     * @param {string|number|boolean} value The value of the Text.
     * @param {...(function((string|number|boolean)):string)} var_args
     *     Functions to format the value which are called only when the value has
     *     changed.
     * @return {!Text} The corresponding text node.
     */
    var text = function text(value, var_args) {
      if ('production' !== 'production') {}

      var node = coreText();
      var data = getData(node);

      if (data.text !== value) {
        data.text = /** @type {string} */value;

        var formatted = value;
        for (var i = 1; i < arguments.length; i += 1) {
          /*
           * Call the formatter function directly to prevent leaking arguments.
           * https://github.com/google/incremental-dom/pull/204#issuecomment-178223574
           */
          var fn = arguments[i];
          formatted = fn(formatted);
        }

        node.data = formatted;
      }

      return node;
    };

    exports.patch = patchInner;
    exports.patchInner = patchInner;
    exports.patchOuter = patchOuter;
    exports.currentElement = currentElement;
    exports.currentPointer = currentPointer;
    exports.skip = skip;
    exports.skipNode = skipNode;
    exports.elementVoid = elementVoid;
    exports.elementOpenStart = elementOpenStart;
    exports.elementOpenEnd = elementOpenEnd;
    exports.elementOpen = elementOpen;
    exports.elementClose = elementClose;
    exports.text = text;
    exports.attr = attr;
    exports.symbols = symbols;
    exports.attributes = attributes;
    exports.applyAttr = applyAttr;
    exports.applyProp = applyProp;
    exports.notifications = notifications;
    exports.importNode = importNode;
  });

  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {

	/**
  * Class responsible for intercepting incremental dom functions through AOP.
  */
	var IncrementalDomAop = function () {
		function IncrementalDomAop() {
			babelHelpers.classCallCheck(this, IncrementalDomAop);
		}

		babelHelpers.createClass(IncrementalDomAop, null, [{
			key: 'getOriginalFns',

			/**
    * Gets the original functions that are intercepted by `IncrementalDomAop`.
    * @return {!Object}
    */
			value: function getOriginalFns() {
				return originalFns;
			}

			/**
    * Gets the original functions that are intercepted by `IncrementalDomAop`.
    * @return {!Object}
    */

		}, {
			key: 'getOriginalFn',
			value: function getOriginalFn(name) {
				return originalFns[name];
			}

			/**
    * Starts intercepting calls to incremental dom, replacing them with the given
    * functions. Note that `elementVoid`, `elementOpenStart`, `elementOpenEnd`
    * and `attr` are the only ones that can't be intercepted, since they'll
    * automatically be converted into equivalent calls to `elementOpen` and
    * `elementClose`.
    * @param {!Object} fns Functions to be called instead of the original ones
    *     from incremental DOM. Should be given as a map from the function name
    *     to the function that should intercept it. All interceptors will receive
    *     the original function as the first argument, the actual arguments from
    *     from the original call following it.
    * @param {Object=} opt_context Optional context that will be used when
    *     calling the given functions.
    */

		}, {
			key: 'startInterception',
			value: function startInterception(fns, opt_context) {
				fns.attr = fnAttr;
				fns.elementOpenEnd = fnOpenEnd;
				fns.elementOpenStart = fnOpenStart;
				fns.elementVoid = fnVoid;
				fns.context = opt_context;
				fnStack.push(fns);
			}

			/**
    * Restores the original `elementOpen` function from incremental dom to the
    * implementation it used before the last call to `startInterception`.
    */

		}, {
			key: 'stopInterception',
			value: function stopInterception() {
				fnStack.pop();
			}
		}]);
		return IncrementalDomAop;
	}();

	var originalFns = {
		attr: IncrementalDOM.attr,
		attributes: IncrementalDOM.attributes[IncrementalDOM.symbols.default],
		elementClose: IncrementalDOM.elementClose,
		elementOpen: IncrementalDOM.elementOpen,
		elementOpenEnd: IncrementalDOM.elementOpenEnd,
		elementOpenStart: IncrementalDOM.elementOpenStart,
		elementVoid: IncrementalDOM.elementVoid,
		text: IncrementalDOM.text
	};

	var fnStack = [];

	var collectedArgs = [];

	function fnAttr(name, value) {
		collectedArgs.push(name, value);
	}

	function fnOpenStart(tag, key, statics) {
		collectedArgs = [tag, key, statics];
	}

	function fnOpenEnd() {
		var _IncrementalDOM;

		return (_IncrementalDOM = IncrementalDOM).elementOpen.apply(_IncrementalDOM, babelHelpers.toConsumableArray(collectedArgs));
	}

	function fnVoid() {
		IncrementalDOM.elementOpen.apply(null, arguments);
		return IncrementalDOM.elementClose.apply(null, arguments);
	}

	function getStack() {
		return fnStack.length > 0 ? fnStack[fnStack.length - 1] : null;
	}

	function buildHandleCall(name) {
		var data = { name: name };
		var fn = handleCall.bind(data);
		return fn;
	}

	function handleCall() {
		var name = this.name; // jshint ignore:line
		var stack = getStack();
		var fn = stack && stack[name] || originalFns[name];
		return fn.apply(stack ? stack.context : null, arguments);
	}

	IncrementalDOM.attr = buildHandleCall('attr');
	IncrementalDOM.elementClose = buildHandleCall('elementClose');
	IncrementalDOM.elementOpen = buildHandleCall('elementOpen');
	IncrementalDOM.elementOpenEnd = buildHandleCall('elementOpenEnd');
	IncrementalDOM.elementOpenStart = buildHandleCall('elementOpenStart');
	IncrementalDOM.elementVoid = buildHandleCall('elementVoid');
	IncrementalDOM.text = buildHandleCall('text');

	IncrementalDOM.attributes[IncrementalDOM.symbols.default] = buildHandleCall('attributes');

	this['metal']['IncrementalDomAop'] = IncrementalDomAop;
}).call(this);
'use strict';

(function () {
	var isString = this['metalNamed']['metal']['isString'];

	/**
  * Utility functions used to handle incremental dom calls.
  */

	var IncrementalDomUtils = function () {
		function IncrementalDomUtils() {
			babelHelpers.classCallCheck(this, IncrementalDomUtils);
		}

		babelHelpers.createClass(IncrementalDomUtils, null, [{
			key: 'buildConfigFromCall',

			/**
    * Builds the component config object from its incremental dom call's
    * arguments.
    * @param {!Array} args
    * @return {!Object}
    */
			value: function buildConfigFromCall(args) {
				var config = {};
				if (args[1]) {
					config.key = args[1];
				}
				var attrsArr = (args[2] || []).concat(args.slice(3));
				for (var i = 0; i < attrsArr.length; i += 2) {
					config[attrsArr[i]] = attrsArr[i + 1];
				}
				return config;
			}

			/**
    * Builds an incremental dom call array from the given tag and config object.
    * @param {string} tag
    * @param {!Object} config
    * @return {!Array}
    */

		}, {
			key: 'buildCallFromConfig',
			value: function buildCallFromConfig(tag, config) {
				var call = [tag, config.key, []];
				var keys = Object.keys(config);
				for (var i = 0; i < keys.length; i++) {
					if (keys[i] !== 'children') {
						call.push(keys[i], config[keys[i]]);
					}
				}
				return call;
			}

			/**
    * Checks if the given tag represents a metal component.
    * @param {string} tag
    * @return {boolean}
    */

		}, {
			key: 'isComponentTag',
			value: function isComponentTag(tag) {
				return !isString(tag) || tag[0] === tag[0].toUpperCase();
			}
		}]);
		return IncrementalDomUtils;
	}();

	this['metal']['IncrementalDomUtils'] = IncrementalDomUtils;
}).call(this);
'use strict';

(function () {
	var isDef = this['metalNamed']['metal']['isDef'];
	var IncrementalDomAop = this['metal']['IncrementalDomAop'];
	var IncrementalDomUtils = this['metal']['IncrementalDomUtils'];

	/**
  * Provides helpers for capturing children elements from incremental dom calls,
  * as well as actually rendering those captured children via incremental dom
  * later.
  */

	var IncrementalDomChildren = function () {
		function IncrementalDomChildren() {
			babelHelpers.classCallCheck(this, IncrementalDomChildren);
		}

		babelHelpers.createClass(IncrementalDomChildren, null, [{
			key: 'capture',

			/**
    * Captures all child elements from incremental dom calls.
    * @param {!IncrementalDomRenderer} renderer The renderer that is capturing
    *   children.
    * @param {!function()} callback Function to be called when children have all
    *     been captured.
   	 */
			value: function capture(renderer, callback) {
				renderer_ = renderer;
				callback_ = callback;
				tree_ = {
					props: {
						children: []
					}
				};
				tree_.config = tree_.props;
				currentParent_ = tree_;
				isCapturing_ = true;
				IncrementalDomAop.startInterception({
					elementClose: handleInterceptedCloseCall_,
					elementOpen: handleInterceptedOpenCall_,
					text: handleInterceptedTextCall_
				});
			}

			/**
    * Returns the owner of the current child node being rendered (or nothing
    * if there's no child being rendered).
    * @return {ComponentRenderer}
    */

		}, {
			key: 'getCurrentOwner',
			value: function getCurrentOwner() {
				return currNodeOwner_;
			}

			/**
    * Gets the node's original owner's renderer.
    * @param {!Object} node
    * @return {ComponentRenderer}
    */

		}, {
			key: 'getOwner',
			value: function getOwner(node) {
				return node[IncrementalDomChildren.CHILD_OWNER];
			}

			/**
    * Renders a children tree through incremental dom.
    * @param {!{args: Array, children: !Array, isText: ?boolean}}
    * @param {function()=} opt_skipNode Optional function that is called for
    *     each node to be rendered. If it returns true, the node will be skipped.
    * @param {Object=} opt_context Optional context that will be used when
    *     calling the given functions.
    * @protected
    */

		}, {
			key: 'render',
			value: function render(tree, opt_skipNode, opt_context) {
				if (isCapturing_) {
					// If capturing, just add the node directly to the captured tree.
					addChildToTree(tree);
					return;
				}

				currNodeOwner_ = null;
				if (opt_skipNode && opt_skipNode.call(opt_context, tree)) {
					return;
				}

				if (isDef(tree.text)) {
					var args = tree.args ? tree.args : [];
					args[0] = tree.text;
					IncrementalDOM.text.apply(null, args);
				} else {
					var _args = IncrementalDomUtils.buildCallFromConfig(tree.tag, tree.props);
					currNodeOwner_ = IncrementalDomChildren.getOwner(tree);
					IncrementalDOM.elementOpen.apply(null, _args);
					currNodeOwner_ = null;
					if (tree.props.children) {
						for (var i = 0; i < tree.props.children.length; i++) {
							IncrementalDomChildren.render(tree.props.children[i], opt_skipNode, opt_context);
						}
					}
					IncrementalDOM.elementClose(tree.tag);
				}
			}
		}]);
		return IncrementalDomChildren;
	}();

	var callback_;
	var currNodeOwner_;
	var currentParent_;
	var isCapturing_ = false;
	var renderer_;
	var tree_;

	/**
  * Adds a child element to the tree.
  * @param {!Array} args The arguments passed to the incremental dom call.
  * @param {boolean=} opt_isText Optional flag indicating if the child is a
  *     text element.
  * @protected
  */
	function addChildCallToTree_(args, opt_isText) {
		var child = babelHelpers.defineProperty({
			parent: currentParent_
		}, IncrementalDomChildren.CHILD_OWNER, renderer_);

		if (opt_isText) {
			child.text = args[0];
			if (args.length > 1) {
				child.args = args;
			}
		} else {
			child.tag = args[0];
			child.props = IncrementalDomUtils.buildConfigFromCall(args);
			child.props.children = [];
			child.config = child.props;
		}

		addChildToTree(child);
		return child;
	}

	function addChildToTree(child) {
		currentParent_.props.children.push(child);
	}

	/**
  * Handles an intercepted call to the `elementClose` function from incremental
  * dom.
  * @protected
  */
	function handleInterceptedCloseCall_() {
		if (currentParent_ === tree_) {
			IncrementalDomAop.stopInterception();
			isCapturing_ = false;
			var node = callback_.call(renderer_, tree_);
			callback_ = null;
			currentParent_ = null;
			renderer_ = null;
			tree_ = null;
			return node;
		} else {
			currentParent_ = currentParent_.parent;
			return true;
		}
	}

	/**
  * Handles an intercepted call to the `elementOpen` function from incremental
  * dom.
  * @param {!function()} originalFn The original function before interception.
  * @protected
  */
	function handleInterceptedOpenCall_() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		currentParent_ = addChildCallToTree_(args);
	}

	/**
  * Handles an intercepted call to the `text` function from incremental dom.
  * @param {!function()} originalFn The original function before interception.
  * @protected
  */
	function handleInterceptedTextCall_() {
		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		addChildCallToTree_(args, true);
	}

	/**
  * Property identifying a specific object as a Metal.js child node, and
  * pointing to the renderer instance that created it.
  * @type {string}
  * @static
  */
	IncrementalDomChildren.CHILD_OWNER = '__metalChildOwner';

	this['metal']['IncrementalDomChildren'] = IncrementalDomChildren;
}).call(this);
'use strict';

(function () {
	var comps_ = [];
	var disposing_ = false;

	var IncrementalDomUnusedComponents = function () {
		function IncrementalDomUnusedComponents() {
			babelHelpers.classCallCheck(this, IncrementalDomUnusedComponents);
		}

		babelHelpers.createClass(IncrementalDomUnusedComponents, null, [{
			key: 'disposeUnused',

			/**
    * Disposes all sub components that were not rerendered since the last
    * time this function was scheduled.
    */
			value: function disposeUnused() {
				if (disposing_) {
					return;
				}
				disposing_ = true;

				for (var i = 0; i < comps_.length; i++) {
					var comp = comps_[i];
					if (!comp.isDisposed() && !comp.getRenderer().getParent()) {
						// Don't let disposing cause the element to be removed, since it may
						// be currently being reused by another component.
						comp.element = null;
						comp.dispose();
					}
				}
				comps_ = [];
				disposing_ = false;
			}

			/**
    * Schedules the given components to be checked and disposed if not used
    * anymore, when `IncrementalDomUnusedComponents.disposeUnused` is called.
    * @param {!Array<!Component>} comps
    */

		}, {
			key: 'schedule',
			value: function schedule(comps) {
				for (var i = 0; i < comps.length; i++) {
					if (!comps[i].isDisposed()) {
						comps[i].getRenderer().parent_ = null;
						comps_.push(comps[i]);
					}
				}
			}
		}]);
		return IncrementalDomUnusedComponents;
	}();

	this['metal']['IncrementalDomUnusedComponents'] = IncrementalDomUnusedComponents;
}).call(this);
'use strict';

(function () {
	var getCompatibilityModeData = this['metalNamed']['metal']['getCompatibilityModeData'];
	var getUid = this['metalNamed']['metal']['getUid'];
	var isBoolean = this['metalNamed']['metal']['isBoolean'];
	var isDef = this['metalNamed']['metal']['isDef'];
	var isDefAndNotNull = this['metalNamed']['metal']['isDefAndNotNull'];
	var isString = this['metalNamed']['metal']['isString'];
	var object = this['metalNamed']['metal']['object'];
	var append = this['metalNamed']['dom']['append'];
	var delegate = this['metalNamed']['dom']['delegate'];
	var domData = this['metalNamed']['dom']['domData'];
	var exitDocument = this['metalNamed']['dom']['exitDocument'];
	var Component = this['metalNamed']['component']['Component'];
	var ComponentRegistry = this['metalNamed']['component']['ComponentRegistry'];
	var ComponentRenderer = this['metalNamed']['component']['ComponentRenderer'];
	var IncrementalDomAop = this['metal']['IncrementalDomAop'];
	var IncrementalDomChildren = this['metal']['IncrementalDomChildren'];
	var IncrementalDomUnusedComponents = this['metal']['IncrementalDomUnusedComponents'];
	var IncrementalDomUtils = this['metal']['IncrementalDomUtils'];

	/**
  * Class responsible for rendering components via incremental dom.
  */

	var IncrementalDomRenderer = function (_ComponentRenderer) {
		babelHelpers.inherits(IncrementalDomRenderer, _ComponentRenderer);

		/**
   * @inheritDoc
   */
		function IncrementalDomRenderer(comp) {
			babelHelpers.classCallCheck(this, IncrementalDomRenderer);

			var _this = babelHelpers.possibleConstructorReturn(this, (IncrementalDomRenderer.__proto__ || Object.getPrototypeOf(IncrementalDomRenderer)).call(this, comp));

			comp.context = {};
			comp.refs = {};
			_this.config_ = comp.getInitialConfig();
			_this.clearChanges_();

			// Binds functions that will be used many times, to avoid creating new
			// functions each time.
			_this.renderInsidePatchDontSkip_ = _this.renderInsidePatchDontSkip_.bind(_this);

			if (!_this.hasSyncUpdates()) {
				// If the component is being updated synchronously we'll just reuse the
				// `handleRendererStateKeyChanged_` function from `ComponentRenderer`.
				_this.component_.on('stateKeyChanged', _this.handleStateKeyChanged_.bind(_this));
			}
			return _this;
		}

		/**
   * Adds the given css classes to the specified arguments for an incremental
   * dom call, merging with the existing value if there is one.
   * @param {string} elementClasses
   * @param {!Array} args
   * @protected
   */


		babelHelpers.createClass(IncrementalDomRenderer, [{
			key: 'addElementClasses_',
			value: function addElementClasses_(elementClasses, args) {
				for (var i = 3; i < args.length; i += 2) {
					if (args[i] === 'class') {
						args[i + 1] = this.removeDuplicateClasses_(args[i + 1] + ' ' + elementClasses);
						return;
					}
				}
				while (args.length < 3) {
					args.push(null);
				}
				args.push('class', elementClasses);
			}

			/**
    * Attaches inline listeners found on the first component render, since those
    * may come from existing elements on the page that already have
    * data-on[eventname] attributes set to its final value. This won't trigger
    * `handleInterceptedAttributesCall_`, so we need manual work to guarantee
    * that projects using progressive enhancement like this will still work.
    * @param {!Element} node
    * @param {!Array} args
    * @protected
    */

		}, {
			key: 'attachDecoratedListeners_',
			value: function attachDecoratedListeners_(node, args) {
				if (!this.component_.wasRendered) {
					var attrs = (args[2] || []).concat(args.slice(3));
					for (var i = 0; i < attrs.length; i += 2) {
						var eventName = this.getEventFromListenerAttr_(attrs[i]);
						if (eventName && !node[eventName + '__handle__']) {
							this.attachEvent_(node, attrs[i], eventName, attrs[i + 1]);
						}
					}
				}
			}

			/**
    * Listens to the specified event, attached via incremental dom calls.
    * @param {!Element} element
    * @param {string} key
    * @param {string} eventName
    * @param {function()|string} fn
    * @protected
    */

		}, {
			key: 'attachEvent_',
			value: function attachEvent_(element, key, eventName, fn) {
				var handleKey = eventName + '__handle__';
				if (element[handleKey]) {
					element[handleKey].removeListener();
					element[handleKey] = null;
				}

				element[key] = fn;
				if (fn) {
					if (isString(fn)) {
						if (key[0] === 'd') {
							// Allow data-on[eventkey] listeners to stay in the dom, as they
							// won't cause conflicts.
							element.setAttribute(key, fn);
						}
						fn = this.component_.getListenerFn(fn);
					}
					element[handleKey] = delegate(document, eventName, element, fn);
				} else {
					element.removeAttribute(key);
				}
			}

			/**
    * Builds the "children" array to be passed to the current component.
    * @param {!Array<!Object>} children
    * @return {!Array<!Object>}
    * @protected
    */

		}, {
			key: 'buildChildren_',
			value: function buildChildren_(children) {
				return children.length === 0 ? emptyChildren_ : children;
			}

			/**
    * Returns an array with the args that should be passed to the component's
    * `shouldUpdate` method. This can be overridden by sub classes to change
    * what the method should receive.
    * @return {!Array}
    * @protected
    */

		}, {
			key: 'buildShouldUpdateArgs_',
			value: function buildShouldUpdateArgs_() {
				return [this.changes_ || {}];
			}

			/**
    * Clears the changes object.
    * @protected;
    */

		}, {
			key: 'clearChanges_',
			value: function clearChanges_() {
				this.changes_ = null;
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				babelHelpers.get(IncrementalDomRenderer.prototype.__proto__ || Object.getPrototypeOf(IncrementalDomRenderer.prototype), 'disposeInternal', this).call(this);

				var comp = this.component_;
				var ref = this.config_.ref;
				var owner = this.getOwner();
				if (owner && owner.components && owner.components[ref] === comp) {
					delete owner.components[ref];
				}

				if (this.childComponents_) {
					for (var i = 0; i < this.childComponents_.length; i++) {
						var child = this.childComponents_[i];
						if (!child.isDisposed()) {
							child.element = null;
							child.dispose();
						}
					}
					this.childComponents_ = null;
				}
			}

			/**
    * Removes the most recent component from the queue of rendering components.
    */

		}, {
			key: 'generateKey_',


			/**
    * Generates a key for the next element to be rendered.
    * @param {?string} The key originally passed to the element.
    * @return {?string}
    * @protected
    */
			value: function generateKey_(key) {
				var currComp = IncrementalDomRenderer.getComponentBeingRendered();
				var currRenderer = currComp.getRenderer();
				if (!currRenderer.rootElementReached_ && currRenderer.config_.key) {
					return currRenderer.config_.key;
				}
				return key;
			}

			/**
    * Gets this renderer's current child components.
    * @return {!Array<!Component>}
    */

		}, {
			key: 'getChildComponents',
			value: function getChildComponents() {
				this.childComponents_ = this.childComponents_ || [];
				return this.childComponents_;
			}

			/**
    * Gets the component being currently rendered via `IncrementalDomRenderer`.
    * @return {Component}
    */

		}, {
			key: 'getEventFromListenerAttr_',


			/**
    * Returns the event name if the given attribute is a listener (of the form
    * "on<EventName>"), or null if it isn't.
    * @param {string} attr
    * @return {?string}
    * @protected
    */
			value: function getEventFromListenerAttr_(attr) {
				var matches = IncrementalDomRenderer.LISTENER_REGEX.exec(attr);
				var eventName = matches ? matches[1] ? matches[1] : matches[2] : null;
				return eventName ? eventName.toLowerCase() : null;
			}

			/**
    * Gets the component that is this component's owner (that is, the one that
    * passed its data and holds its ref), or null if there's none.
    * @return {Component}
    */

		}, {
			key: 'getOwner',
			value: function getOwner() {
				return this.owner_;
			}

			/**
    * Gets the component that is this component's parent (that is, the one that
    * actually rendered it), or null if there's no parent.
    * @return {Component}
    */

		}, {
			key: 'getParent',
			value: function getParent() {
				return this.parent_;
			}

			/**
    * Gets the component that triggered the current patch operation.
    * @return {Component}
    */

		}, {
			key: 'getRef_',


			/**
    * Returns the "ref" to be used for a component. Uses "key" as "ref" when
    * compatibility mode is on for the current renderer.
    * @param {!Object} config
    * @param {?string} ref
    * @protected
    */
			value: function getRef_(config) {
				var compatData = getCompatibilityModeData();
				if (compatData) {
					var renderers = compatData.renderers;
					var useKey = !renderers || renderers.indexOf(this.constructor) !== -1 || renderers.indexOf(this.constructor.RENDERER_NAME) !== -1;
					if (useKey && config.key && !config.ref) {
						return config.key;
					}
				}
				return config.ref;
			}

			/**
    * Gets the sub component referenced by the given tag and config data,
    * creating it if it doesn't yet exist.
    * @param {string|!Function} tagOrCtor The tag name.
    * @param {!Object} config The config object for the sub component.
    * @param {!Component} owner
    * @return {!Component} The sub component.
    * @protected
    */

		}, {
			key: 'getSubComponent_',
			value: function getSubComponent_(tagOrCtor, config, owner) {
				var Ctor = tagOrCtor;
				if (isString(Ctor)) {
					Ctor = ComponentRegistry.getConstructor(tagOrCtor);
				}

				var ref = this.getRef_(config);
				var comp = void 0;
				if (isDef(ref)) {
					comp = this.match_(owner.components[ref], Ctor, config);
					owner.addSubComponent(ref, comp);
					owner.refs[ref] = comp;
				} else {
					var data = IncrementalDomRenderer.getCurrentData();
					var key = config.key;
					if (!isDef(key)) {
						var type = getUid(Ctor, true);
						data.currCount = data.currCount || {};
						data.currCount[type] = data.currCount[type] || 0;
						key = '__METAL_IC__' + type + '_' + data.currCount[type];
						data.currCount[type]++;
					}
					comp = this.match_(data.prevComps ? data.prevComps[key] : null, Ctor, config);
					data.currComps = data.currComps || {};
					data.currComps[key] = comp;
				}

				return comp;
			}

			/**
    * Guarantees that the component's element has a parent. That's necessary
    * when calling incremental dom's `patchOuter` for now, as otherwise it will
    * throw an error if the element needs to be replaced.
    * @return {Element} The parent, in case it was added.
    * @protected
    */

		}, {
			key: 'guaranteeParent_',
			value: function guaranteeParent_() {
				var element = this.component_.element;
				if (!element || !element.parentNode) {
					var parent = document.createElement('div');
					if (element) {
						append(parent, element);
					}
					return parent;
				}
			}

			/**
    * Handles the event of children having finished being captured.
    * @param {!Object} The captured children in tree format.
    * @protected
    */

		}, {
			key: 'handleChildrenCaptured_',
			value: function handleChildrenCaptured_(tree) {
				var _componentToRender_ = this.componentToRender_,
				    props = _componentToRender_.props,
				    tag = _componentToRender_.tag;

				props.children = this.buildChildren_(tree.props.children);
				this.componentToRender_ = null;
				return this.renderFromTag_(tag, props);
			}

			/**
    * Handles a child being rendered via `IncrementalDomChildren.render`. Skips
    * component nodes so that they can be rendered the correct way without
    * having to recapture both them and their children via incremental dom.
    * @param {!Object} node
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'handleChildRender_',
			value: function handleChildRender_(node) {
				if (node.tag && IncrementalDomUtils.isComponentTag(node.tag)) {
					node.props.children = this.buildChildren_(node.props.children);
					var owner = IncrementalDomChildren.getOwner(node);
					this.renderFromTag_(node.tag, node.props, owner);
					return true;
				}
			}

			/**
    * Handles an intercepted call to the attributes default handler from
    * incremental dom.
    * @param {!Element} element
    * @param {string} name
    * @param {*} value
    * @protected
    */

		}, {
			key: 'handleInterceptedAttributesCall_',
			value: function handleInterceptedAttributesCall_(element, name, value) {
				var eventName = this.getEventFromListenerAttr_(name);
				if (eventName) {
					this.attachEvent_(element, name, eventName, value);
					return;
				}

				if (name === 'checked') {
					// This is a temporary fix to account for incremental dom setting
					// "checked" as an attribute only, which can cause bugs since that won't
					// necessarily check/uncheck the element it's set on. See
					// https://github.com/google/incremental-dom/issues/198 for more details.
					value = isDefAndNotNull(value) && value !== false;
				}

				if (name === 'value' && element.value !== value) {
					// This is a temporary fix to account for incremental dom setting
					// "value" as an attribute only, which can cause bugs since that won't
					// necessarily update the input's content it's set on. See
					// https://github.com/google/incremental-dom/issues/239 for more details.
					// We only do this if the new value is different though, as otherwise the
					// browser will automatically move the typing cursor to the end of the
					// field.
					element[name] = value;
				}

				if (isBoolean(value)) {
					// Incremental dom sets boolean values as string data attributes, which
					// is counter intuitive. This changes the behavior to use the actual
					// boolean value.
					element[name] = value;
					if (value) {
						element.setAttribute(name, '');
					} else {
						element.removeAttribute(name);
					}
				} else {
					IncrementalDomAop.getOriginalFn('attributes')(element, name, value);
				}
			}

			/**
    * Handles an intercepted call to the `elementOpen` function from incremental
    * dom.
    * @param {string} tag
    * @protected
    */

		}, {
			key: 'handleInterceptedOpenCall_',
			value: function handleInterceptedOpenCall_(tag) {
				if (IncrementalDomUtils.isComponentTag(tag)) {
					return this.handleSubComponentCall_.apply(this, arguments);
				} else {
					return this.handleRegularCall_.apply(this, arguments);
				}
			}

			/**
    * Handles the `dataPropChanged` event. Overrides original method from
    * `ComponentRenderer` to guarantee that `IncrementalDomRenderer`'s logic
    * will run first.
    * @param {!Object} data
    * @override
    * @protected
    */

		}, {
			key: 'handleRendererStateKeyChanged_',
			value: function handleRendererStateKeyChanged_(data) {
				this.handleStateKeyChanged_(data);
				babelHelpers.get(IncrementalDomRenderer.prototype.__proto__ || Object.getPrototypeOf(IncrementalDomRenderer.prototype), 'handleRendererStateKeyChanged_', this).call(this, data);
			}

			/**
    * Handles an intercepted call to the `elementOpen` function from incremental
    * dom, done for a regular element. Adds any inline listeners found on the
    * first render and makes sure that component root elements are always reused.
    * @protected
    */

		}, {
			key: 'handleRegularCall_',
			value: function handleRegularCall_() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				args[1] = this.generateKey_(args[1]);
				var currComp = IncrementalDomRenderer.getComponentBeingRendered();
				var currRenderer = currComp.getRenderer();
				if (!currRenderer.rootElementReached_) {
					var elementClasses = currComp.getDataManager().get(currComp, 'elementClasses');
					if (elementClasses) {
						this.addElementClasses_(elementClasses, args);
					}
				}

				var node = IncrementalDomAop.getOriginalFn('elementOpen').apply(null, args);
				this.resetNodeData_(node);
				this.attachDecoratedListeners_(node, args);
				this.updateElementIfNotReached_(node);

				var ref = node.getAttribute('ref');
				if (isDefAndNotNull(ref)) {
					var owner = IncrementalDomChildren.getCurrentOwner() || this;
					owner.getComponent().refs[ref] = node;
				}
				return node;
			}

			/**
    * Handles the `stateKeyChanged` event. Stores data that has changed since the
    * last render.
    * @param {!Object} data
    * @protected
    */

		}, {
			key: 'handleStateKeyChanged_',
			value: function handleStateKeyChanged_(data) {
				this.changes_ = this.changes_ || {};
				this.changes_[data.key] = data;
			}

			/**
    * Handles an intercepted call to the `elementOpen` function from incremental
    * dom, done for a sub component element. Creates and updates the appropriate
    * sub component.
    * @protected
    */

		}, {
			key: 'handleSubComponentCall_',
			value: function handleSubComponentCall_() {
				for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					args[_key2] = arguments[_key2];
				}

				var props = IncrementalDomUtils.buildConfigFromCall(args);
				this.componentToRender_ = {
					props: props,
					tag: args[0]
				};
				IncrementalDomChildren.capture(this, this.handleChildrenCaptured_);
			}

			/**
    * Checks if the component's data has changed.
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'hasDataChanged_',
			value: function hasDataChanged_() {
				return this.changes_ && Object.keys(this.changes_).length > 0;
			}

			/**
    * Intercepts incremental dom calls from this component.
    * @protected
    */

		}, {
			key: 'intercept_',
			value: function intercept_() {
				IncrementalDomAop.startInterception({
					attributes: this.handleInterceptedAttributesCall_,
					elementOpen: this.handleInterceptedOpenCall_
				}, this);
			}

			/**
    * Checks if the given object is an incremental dom node.
    * @param {!Object} node
    * @return {boolean}
    */

		}, {
			key: 'isMatch_',


			/**
    * Checks if the given component can be a match for a constructor.
    * @param {!Component} comp
    * @param {!function()} Ctor
    * @return {boolean}
    * @protected
    */
			value: function isMatch_(comp, Ctor) {
				if (!comp || comp.constructor !== Ctor || comp.isDisposed()) {
					return false;
				}
				return comp.getRenderer().getOwner() === this.component_;
			}

			/**
    * Returns the given component if it matches the specified constructor
    * function. Otherwise, returns a new instance of the given constructor. On
    * both cases the component's state and config will be updated.
    * @param {Component} comp
    * @param {!function()} Ctor
    * @param {!Object} config
    * @return {!Component}
    * @protected
    */

		}, {
			key: 'match_',
			value: function match_(comp, Ctor, config) {
				var shouldUpdate = true;
				if (!this.isMatch_(comp, Ctor)) {
					comp = new Ctor(config, false);
					shouldUpdate = false;
				}
				if (shouldUpdate) {
					comp.getRenderer().startSkipUpdates();
					comp.getDataManager().replaceNonInternal(comp, config);
					comp.getRenderer().stopSkipUpdates();
				}
				comp.getRenderer().config_ = config;
				return comp;
			}

			/**
    * Patches the component's element with the incremental dom function calls
    * done by `renderInsidePatchDontSkip_`.
    */

		}, {
			key: 'patch',
			value: function patch() {
				patchingComponents_.push(this.component_);
				if (!this.component_.element && this.parent_) {
					// If the component has no content but was rendered from another component,
					// we'll need to patch this parent to make sure that any new content will
					// be added in the right place.
					this.parent_.getRenderer().patch();
					return;
				}

				var tempParent = this.guaranteeParent_();
				if (tempParent) {
					IncrementalDOM.patch(tempParent, this.renderInsidePatchDontSkip_);
					exitDocument(this.component_.element);
					if (this.component_.element && this.component_.inDocument) {
						var attachData = this.component_.getAttachData();
						this.component_.renderElement_(attachData.parent, attachData.sibling);
					}
				} else {
					var element = this.component_.element;
					IncrementalDOM.patchOuter(element, this.renderInsidePatchDontSkip_);
				}
				patchingComponents_.pop();
			}

			/**
    * Removes duplicate css classes from the given string.
    * @param {string} cssClasses
    * @return {string}
    * @protected
    */

		}, {
			key: 'removeDuplicateClasses_',
			value: function removeDuplicateClasses_(cssClasses) {
				var noDuplicates = [];
				var all = cssClasses.split(/\s+/);
				var used = {};
				for (var i = 0; i < all.length; i++) {
					if (!used[all[i]]) {
						used[all[i]] = true;
						noDuplicates.push(all[i]);
					}
				}
				return noDuplicates.join(' ');
			}

			/**
    * Creates and renders the given function, which can either be a simple
    * incremental dom function or a component constructor.
    * @param {!function()} fnOrCtor Either be a simple incremental dom function
    or a component constructor.
    * @param {Object|Element=} opt_dataOrElement Optional config data for the
    *     function or parent for the rendered content.
    * @param {Element=} opt_parent Optional parent for the rendered content.
    * @return {!Component} The rendered component's instance.
    */

		}, {
			key: 'render',


			/**
    * Renders the renderer's component for the first time, patching its element
    * through the incremental dom function calls done by `renderIncDom`.
    */
			value: function render() {
				this.patch();
			}

			/**
    * Renders the given child node via its owner renderer.
    * @param {!Object} child
    */

		}, {
			key: 'renderChild',


			/**
    * Renders the given child node.
    * @param {!Object} child
    */
			value: function renderChild(child) {
				this.intercept_();
				IncrementalDomChildren.render(child, this.handleChildRender_, this);
				IncrementalDomAop.stopInterception();
			}

			/**
    * Renders the contents for the given tag.
    * @param {!function()|string} tag
    * @param {!Object} config
    * @param {ComponentRenderer=} opt_owner
    * @protected
    */

		}, {
			key: 'renderFromTag_',
			value: function renderFromTag_(tag, config, opt_owner) {
				if (isString(tag) || tag.prototype.getRenderer) {
					var comp = this.renderSubComponent_(tag, config, opt_owner);
					this.updateElementIfNotReached_(comp.element);
					return comp.element;
				} else {
					return tag(config);
				}
			}

			/**
    * Calls functions from `IncrementalDOM` to build the component element's
    * content. Can be overriden by subclasses (for integration with template
    * engines for example).
    */

		}, {
			key: 'renderIncDom',
			value: function renderIncDom() {
				if (this.component_.render) {
					this.component_.render();
				} else {
					IncrementalDOM.elementVoid('div');
				}
			}

			/**
    * Runs the incremental dom functions for rendering this component, but
    * doesn't call `patch` yet. Rather, this will be the function that should be
    * called by `patch`.
    */

		}, {
			key: 'renderInsidePatch',
			value: function renderInsidePatch() {
				if (this.component_.wasRendered && !this.shouldUpdate() && IncrementalDOM.currentPointer() === this.component_.element) {
					if (this.component_.element) {
						this.skipRender_();
					}
					return;
				}
				this.renderInsidePatchDontSkip_();
			}

			/**
    * The same as `renderInsidePatch`, but without the check that may skip the
    * render action.
    * @protected
    */

		}, {
			key: 'renderInsidePatchDontSkip_',
			value: function renderInsidePatchDontSkip_() {
				IncrementalDomRenderer.startedRenderingComponent(this.component_);
				this.resetData_(this.incDomData_);
				this.clearChanges_();
				this.rootElementReached_ = false;
				if (this.childComponents_) {
					IncrementalDomUnusedComponents.schedule(this.childComponents_);
					this.childComponents_ = null;
				}
				this.component_.refs = {};
				this.intercept_();
				this.renderIncDom();
				IncrementalDomAop.stopInterception();
				if (!this.rootElementReached_) {
					this.component_.element = null;
				}
				this.handleRendered_();
				IncrementalDomRenderer.finishedRenderingComponent();
			}

			/**
    * This updates the sub component that is represented by the given data.
    * The sub component is created, added to its parent and rendered. If it
    * had already been rendered before though, it will only have its state
    * updated instead.
    * @param {string|!function()} tagOrCtor The tag name or constructor function.
    * @param {!Object} config The config object for the sub component.
    * @param {ComponentRenderer=} opt_owner
    * @return {!Component} The updated sub component.
    * @protected
    */

		}, {
			key: 'renderSubComponent_',
			value: function renderSubComponent_(tagOrCtor, config, opt_owner) {
				var ownerRenderer = opt_owner || this;
				var owner = ownerRenderer.getComponent();
				var comp = this.getSubComponent_(tagOrCtor, config, owner);
				this.updateContext_(comp);
				var renderer = comp.getRenderer();
				if (renderer instanceof IncrementalDomRenderer) {
					var parentComp = IncrementalDomRenderer.getComponentBeingRendered();
					var parentRenderer = parentComp.getRenderer();
					parentRenderer.getChildComponents().push(comp);
					renderer.parent_ = parentComp;
					renderer.owner_ = owner;
					if (!config.key && !parentRenderer.rootElementReached_) {
						config.key = parentRenderer.config_.key;
					}
					renderer.renderInsidePatch();
				} else {
					console.warn('IncrementalDomRenderer doesn\'t support rendering sub components ' + 'that don\'t use IncrementalDomRenderer as well, like:', comp);
				}
				if (!comp.wasRendered) {
					comp.renderAsSubComponent();
				}
				return comp;
			}

			/**
    * Resets the given incremental dom data object, preparing it for the next
    * pass.
    * @param {Object} data
    * @protected
    */

		}, {
			key: 'resetData_',
			value: function resetData_(data) {
				if (data) {
					data.prevComps = data.currComps;
					data.currComps = null;
					data.currCount = null;
				}
			}

			/**
    * Resets all data stored in the given node.
    * @param {!Element} node
    * @protected
    */

		}, {
			key: 'resetNodeData_',
			value: function resetNodeData_(node) {
				if (domData.has(node)) {
					this.resetData_(domData.get(node).incDomData_);
				}
			}

			/**
    * Checks if the component should be updated with the current state changes.
    * Can be overridden by subclasses or implemented by components to provide
    * customized behavior (only updating when a state property used by the
    * template changes, for example).
    * @return {boolean}
    */

		}, {
			key: 'shouldUpdate',
			value: function shouldUpdate() {
				if (!this.hasDataChanged_()) {
					return false;
				}
				if (this.component_.shouldUpdate) {
					var _component_;

					return (_component_ = this.component_).shouldUpdate.apply(_component_, babelHelpers.toConsumableArray(this.buildShouldUpdateArgs_()));
				}
				return true;
			}

			/**
    * Skips the next disposal of children components, by clearing the array as
    * if there were no children rendered the last time. This can be useful for
    * allowing components to be reused by other parent components in separate
    * render update cycles.
    */

		}, {
			key: 'skipNextChildrenDisposal',
			value: function skipNextChildrenDisposal() {
				this.childComponents_ = null;
			}

			/**
    * Skips rendering this component.
    * @protected
    */

		}, {
			key: 'skipRender_',
			value: function skipRender_() {
				IncrementalDOM.skipNode();
			}

			/**
    * Stores the component that has just started being rendered.
    * @param {!Component} comp
    */

		}, {
			key: 'update',


			/**
    * Updates the renderer's component when state changes, patching its element
    * through the incremental dom function calls done by `renderIncDom`. Makes
    * sure that it won't cause a rerender if the only change was for the
    * "element" property.
    */
			value: function update() {
				if (this.shouldUpdate()) {
					this.patch();
				}
			}

			/**
    * Updates this renderer's component's element with the given values, unless
    * it has already been reached by an earlier call.
    * @param {!Element} node
    * @protected
    */

		}, {
			key: 'updateElementIfNotReached_',
			value: function updateElementIfNotReached_(node) {
				var currComp = IncrementalDomRenderer.getComponentBeingRendered();
				var currRenderer = currComp.getRenderer();
				if (!currRenderer.rootElementReached_) {
					currRenderer.rootElementReached_ = true;
					if (currComp.element !== node) {
						currComp.element = node;
					}
				}
			}

			/**
    * Updates the given component's context according to the data from the
    * component that is currently being rendered.
    * @param {!Component} comp
    * @protected
    */

		}, {
			key: 'updateContext_',
			value: function updateContext_(comp) {
				var context = comp.context;
				var parent = IncrementalDomRenderer.getComponentBeingRendered();
				var childContext = parent.getChildContext ? parent.getChildContext() : null;
				object.mixin(context, parent.context, childContext);
				comp.context = context;
			}
		}], [{
			key: 'finishedRenderingComponent',
			value: function finishedRenderingComponent() {
				renderingComponents_.pop();
				if (renderingComponents_.length === 0) {
					IncrementalDomUnusedComponents.disposeUnused();
				}
			}
		}, {
			key: 'getComponentBeingRendered',
			value: function getComponentBeingRendered() {
				return renderingComponents_[renderingComponents_.length - 1];
			}

			/**
    * Gets the data object that should be currently used. This object will either
    * come from the current element being rendered by incremental dom or from
    * the component instance being rendered (only when the current element is the
    * component's direct parent).
    * @return {!Object}
    */

		}, {
			key: 'getCurrentData',
			value: function getCurrentData() {
				var element = IncrementalDOM.currentElement();
				var comp = IncrementalDomRenderer.getComponentBeingRendered();
				var renderer = comp.getRenderer();
				var obj = renderer;
				if (renderer.rootElementReached_ && element !== comp.element.parentNode) {
					obj = domData.get(element);
				}
				obj.incDomData_ = obj.incDomData_ || {};
				return obj.incDomData_;
			}
		}, {
			key: 'getPatchingComponent',
			value: function getPatchingComponent() {
				return patchingComponents_[patchingComponents_.length - 1];
			}
		}, {
			key: 'isIncDomNode',
			value: function isIncDomNode(node) {
				return !!node[IncrementalDomChildren.CHILD_OWNER];
			}
		}, {
			key: 'render',
			value: function render(fnOrCtor, opt_dataOrElement, opt_parent) {
				if (!Component.isComponentCtor(fnOrCtor)) {
					var fn = fnOrCtor;

					var TempComponent = function (_Component) {
						babelHelpers.inherits(TempComponent, _Component);

						function TempComponent() {
							babelHelpers.classCallCheck(this, TempComponent);
							return babelHelpers.possibleConstructorReturn(this, (TempComponent.__proto__ || Object.getPrototypeOf(TempComponent)).apply(this, arguments));
						}

						babelHelpers.createClass(TempComponent, [{
							key: 'created',
							value: function created() {
								if (IncrementalDomRenderer.getComponentBeingRendered()) {
									this.getRenderer().updateContext_(this);
								}
							}
						}, {
							key: 'render',
							value: function render() {
								fn(this.getRenderer().config_);
							}
						}]);
						return TempComponent;
					}(Component);

					TempComponent.RENDERER = IncrementalDomRenderer;
					fnOrCtor = TempComponent;
				}
				return Component.render(fnOrCtor, opt_dataOrElement, opt_parent);
			}
		}, {
			key: 'renderChild',
			value: function renderChild(child) {
				child[IncrementalDomChildren.CHILD_OWNER].renderChild(child);
			}
		}, {
			key: 'startedRenderingComponent',
			value: function startedRenderingComponent(comp) {
				renderingComponents_.push(comp);
			}
		}]);
		return IncrementalDomRenderer;
	}(ComponentRenderer);

	var renderingComponents_ = [];
	var patchingComponents_ = [];
	var emptyChildren_ = [];

	// Regex pattern used to find inline listeners.
	IncrementalDomRenderer.LISTENER_REGEX = /^(?:on([A-Z].+))|(?:data-on(.+))$/;

	// Name of this renderer. Renderers should provide this as a way to identify
	// them via a simple string (when calling enableCompatibilityMode to add
	// support to old features for specific renderers for example).
	IncrementalDomRenderer.RENDERER_NAME = 'incremental-dom';

	this['metal']['IncrementalDomRenderer'] = IncrementalDomRenderer;
}).call(this);
'use strict';

(function () {

  (function () {
    this.CLOSURE_NO_DEPS = true;
    this.goog = this.goog || {};

    // Copyright 2006 The Closure Library Authors. All Rights Reserved.
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    //      http://www.apache.org/licenses/LICENSE-2.0
    //
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS-IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.

    /**
     * @fileoverview Bootstrap for the Google JS Library (Closure).
     *
     * In uncompiled mode base.js will write out Closure's deps file, unless the
     * global <code>CLOSURE_NO_DEPS</code> is set to true.  This allows projects to
     * include their own deps file(s) from different locations.
     *
     * @author arv@google.com (Erik Arvidsson)
     *
     * @provideGoog
     */

    /**
     * @define {boolean} Overridden to true by the compiler when
     *     --process_closure_primitives is specified.
     */
    var COMPILED = false;

    /**
     * Base namespace for the Closure library.  Checks to see goog is already
     * defined in the current scope before assigning to prevent clobbering if
     * base.js is loaded more than once.
     *
     * @const
     */
    var goog = this.goog || {};

    /**
     * Reference to the global context.  In most cases this will be 'window'.
     */
    goog.global = this;

    /**
     * A hook for overriding the define values in uncompiled mode.
     *
     * In uncompiled mode, {@code CLOSURE_UNCOMPILED_DEFINES} may be defined before
     * loading base.js.  If a key is defined in {@code CLOSURE_UNCOMPILED_DEFINES},
     * {@code goog.define} will use the value instead of the default value.  This
     * allows flags to be overwritten without compilation (this is normally
     * accomplished with the compiler's "define" flag).
     *
     * Example:
     * <pre>
     *   var CLOSURE_UNCOMPILED_DEFINES = {'goog.DEBUG': false};
     * </pre>
     *
     * @type {Object<string, (string|number|boolean)>|undefined}
     */
    goog.global.CLOSURE_UNCOMPILED_DEFINES;

    /**
     * A hook for overriding the define values in uncompiled or compiled mode,
     * like CLOSURE_UNCOMPILED_DEFINES but effective in compiled code.  In
     * uncompiled code CLOSURE_UNCOMPILED_DEFINES takes precedence.
     *
     * Also unlike CLOSURE_UNCOMPILED_DEFINES the values must be number, boolean or
     * string literals or the compiler will emit an error.
     *
     * While any @define value may be set, only those set with goog.define will be
     * effective for uncompiled code.
     *
     * Example:
     * <pre>
     *   var CLOSURE_DEFINES = {'goog.DEBUG': false} ;
     * </pre>
     *
     * @type {Object<string, (string|number|boolean)>|undefined}
     */
    goog.global.CLOSURE_DEFINES;

    /**
     * Returns true if the specified value is not undefined.
     * WARNING: Do not use this to test if an object has a property. Use the in
     * operator instead.
     *
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is defined.
     */
    goog.isDef = function (val) {
      // void 0 always evaluates to undefined and hence we do not need to depend on
      // the definition of the global variable named 'undefined'.
      return val !== void 0;
    };

    /**
     * Builds an object structure for the provided namespace path, ensuring that
     * names that already exist are not overwritten. For example:
     * "a.b.c" -> a = {};a.b={};a.b.c={};
     * Used by goog.provide and goog.exportSymbol.
     * @param {string} name name of the object that this file defines.
     * @param {*=} opt_object the object to expose at the end of the path.
     * @param {Object=} opt_objectToExportTo The object to add the path to; default
     *     is |goog.global|.
     * @private
     */
    goog.exportPath_ = function (name, opt_object, opt_objectToExportTo) {
      var parts = name.split('.');
      var cur = opt_objectToExportTo || goog.global;

      // Internet Explorer exhibits strange behavior when throwing errors from
      // methods externed in this manner.  See the testExportSymbolExceptions in
      // base_test.html for an example.
      if (!(parts[0] in cur) && cur.execScript) {
        cur.execScript('var ' + parts[0]);
      }

      // Certain browsers cannot parse code in the form for((a in b); c;);
      // This pattern is produced by the JSCompiler when it collapses the
      // statement above into the conditional loop below. To prevent this from
      // happening, use a for-loop and reserve the init logic as below.

      // Parentheses added to eliminate strict JS warning in Firefox.
      for (var part; parts.length && (part = parts.shift());) {
        if (!parts.length && goog.isDef(opt_object)) {
          // last part and we have an object; use it
          cur[part] = opt_object;
        } else if (cur[part]) {
          cur = cur[part];
        } else {
          cur = cur[part] = {};
        }
      }
    };

    /**
     * Defines a named value. In uncompiled mode, the value is retrieved from
     * CLOSURE_DEFINES or CLOSURE_UNCOMPILED_DEFINES if the object is defined and
     * has the property specified, and otherwise used the defined defaultValue.
     * When compiled the default can be overridden using the compiler
     * options or the value set in the CLOSURE_DEFINES object.
     *
     * @param {string} name The distinguished name to provide.
     * @param {string|number|boolean} defaultValue
     */
    goog.define = function (name, defaultValue) {
      var value = defaultValue;
      if (!COMPILED) {
        if (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, name)) {
          value = goog.global.CLOSURE_UNCOMPILED_DEFINES[name];
        } else if (goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, name)) {
          value = goog.global.CLOSURE_DEFINES[name];
        }
      }
      goog.exportPath_(name, value);
    };

    /**
     * @define {boolean} DEBUG is provided as a convenience so that debugging code
     * that should not be included in a production js_binary can be easily stripped
     * by specifying --define goog.DEBUG=false to the JSCompiler. For example, most
     * toString() methods should be declared inside an "if (goog.DEBUG)" conditional
     * because they are generally used for debugging purposes and it is difficult
     * for the JSCompiler to statically determine whether they are used.
     */
    goog.define('goog.DEBUG', true);

    /**
     * @define {string} LOCALE defines the locale being used for compilation. It is
     * used to select locale specific data to be compiled in js binary. BUILD rule
     * can specify this value by "--define goog.LOCALE=<locale_name>" as JSCompiler
     * option.
     *
     * Take into account that the locale code format is important. You should use
     * the canonical Unicode format with hyphen as a delimiter. Language must be
     * lowercase, Language Script - Capitalized, Region - UPPERCASE.
     * There are few examples: pt-BR, en, en-US, sr-Latin-BO, zh-Hans-CN.
     *
     * See more info about locale codes here:
     * http://www.unicode.org/reports/tr35/#Unicode_Language_and_Locale_Identifiers
     *
     * For language codes you should use values defined by ISO 693-1. See it here
     * http://www.w3.org/WAI/ER/IG/ert/iso639.htm. There is only one exception from
     * this rule: the Hebrew language. For legacy reasons the old code (iw) should
     * be used instead of the new code (he), see http://wiki/Main/IIISynonyms.
     */
    goog.define('goog.LOCALE', 'en'); // default to en


    /**
     * @define {boolean} Whether this code is running on trusted sites.
     *
     * On untrusted sites, several native functions can be defined or overridden by
     * external libraries like Prototype, Datejs, and JQuery and setting this flag
     * to false forces closure to use its own implementations when possible.
     *
     * If your JavaScript can be loaded by a third party site and you are wary about
     * relying on non-standard implementations, specify
     * "--define goog.TRUSTED_SITE=false" to the JSCompiler.
     */
    goog.define('goog.TRUSTED_SITE', true);

    /**
     * @define {boolean} Whether a project is expected to be running in strict mode.
     *
     * This define can be used to trigger alternate implementations compatible with
     * running in EcmaScript Strict mode or warn about unavailable functionality.
     * @see https://goo.gl/g5EoHI
     *
     */
    goog.define('goog.STRICT_MODE_COMPATIBLE', false);

    /**
     * @define {boolean} Whether code that calls {@link goog.setTestOnly} should
     *     be disallowed in the compilation unit.
     */
    goog.define('goog.DISALLOW_TEST_ONLY_CODE', COMPILED && !goog.DEBUG);

    /**
     * @define {boolean} Whether to use a Chrome app CSP-compliant method for
     *     loading scripts via goog.require. @see appendScriptSrcNode_.
     */
    goog.define('goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING', false);

    /**
     * Defines a namespace in Closure.
     *
     * A namespace may only be defined once in a codebase. It may be defined using
     * goog.provide() or goog.module().
     *
     * The presence of one or more goog.provide() calls in a file indicates
     * that the file defines the given objects/namespaces.
     * Provided symbols must not be null or undefined.
     *
     * In addition, goog.provide() creates the object stubs for a namespace
     * (for example, goog.provide("goog.foo.bar") will create the object
     * goog.foo.bar if it does not already exist).
     *
     * Build tools also scan for provide/require/module statements
     * to discern dependencies, build dependency files (see deps.js), etc.
     *
     * @see goog.require
     * @see goog.module
     * @param {string} name Namespace provided by this file in the form
     *     "goog.package.part".
     */
    goog.provide = function (name) {
      if (!COMPILED) {
        // Ensure that the same namespace isn't provided twice.
        // A goog.module/goog.provide maps a goog.require to a specific file
        if (goog.isProvided_(name)) {
          throw Error('Namespace "' + name + '" already declared.');
        }
      }

      goog.constructNamespace_(name);
    };

    /**
     * @param {string} name Namespace provided by this file in the form
     *     "goog.package.part".
     * @param {Object=} opt_obj The object to embed in the namespace.
     * @private
     */
    goog.constructNamespace_ = function (name, opt_obj) {
      if (!COMPILED) {
        delete goog.implicitNamespaces_[name];

        var namespace = name;
        while (namespace = namespace.substring(0, namespace.lastIndexOf('.'))) {
          if (goog.getObjectByName(namespace)) {
            break;
          }
          goog.implicitNamespaces_[namespace] = true;
        }
      }

      goog.exportPath_(name, opt_obj);
    };

    /**
     * Module identifier validation regexp.
     * Note: This is a conservative check, it is very possible to be more lenient,
     *   the primary exclusion here is "/" and "\" and a leading ".", these
     *   restrictions are intended to leave the door open for using goog.require
     *   with relative file paths rather than module identifiers.
     * @private
     */
    goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;

    /**
     * Defines a module in Closure.
     *
     * Marks that this file must be loaded as a module and claims the namespace.
     *
     * A namespace may only be defined once in a codebase. It may be defined using
     * goog.provide() or goog.module().
     *
     * goog.module() has three requirements:
     * - goog.module may not be used in the same file as goog.provide.
     * - goog.module must be the first statement in the file.
     * - only one goog.module is allowed per file.
     *
     * When a goog.module annotated file is loaded, it is enclosed in
     * a strict function closure. This means that:
     * - any variables declared in a goog.module file are private to the file
     * (not global), though the compiler is expected to inline the module.
     * - The code must obey all the rules of "strict" JavaScript.
     * - the file will be marked as "use strict"
     *
     * NOTE: unlike goog.provide, goog.module does not declare any symbols by
     * itself. If declared symbols are desired, use
     * goog.module.declareLegacyNamespace().
     *
     *
     * See the public goog.module proposal: http://goo.gl/Va1hin
     *
     * @param {string} name Namespace provided by this file in the form
     *     "goog.package.part", is expected but not required.
     */
    goog.module = function (name) {
      if (!goog.isString(name) || !name || name.search(goog.VALID_MODULE_RE_) == -1) {
        throw Error('Invalid module identifier');
      }
      if (!goog.isInModuleLoader_()) {
        throw Error('Module ' + name + ' has been loaded incorrectly.');
      }
      if (goog.moduleLoaderState_.moduleName) {
        throw Error('goog.module may only be called once per module.');
      }

      // Store the module name for the loader.
      goog.moduleLoaderState_.moduleName = name;
      if (!COMPILED) {
        // Ensure that the same namespace isn't provided twice.
        // A goog.module/goog.provide maps a goog.require to a specific file
        if (goog.isProvided_(name)) {
          throw Error('Namespace "' + name + '" already declared.');
        }
        delete goog.implicitNamespaces_[name];
      }
    };

    /**
     * @param {string} name The module identifier.
     * @return {?} The module exports for an already loaded module or null.
     *
     * Note: This is not an alternative to goog.require, it does not
     * indicate a hard dependency, instead it is used to indicate
     * an optional dependency or to access the exports of a module
     * that has already been loaded.
     * @suppress {missingProvide}
     */
    goog.module.get = function (name) {
      return goog.module.getInternal_(name);
    };

    /**
     * @param {string} name The module identifier.
     * @return {?} The module exports for an already loaded module or null.
     * @private
     */
    goog.module.getInternal_ = function (name) {
      if (!COMPILED) {
        if (goog.isProvided_(name)) {
          // goog.require only return a value with-in goog.module files.
          return name in goog.loadedModules_ ? goog.loadedModules_[name] : goog.getObjectByName(name);
        } else {
          return null;
        }
      }
    };

    /**
     * @private {?{moduleName: (string|undefined), declareLegacyNamespace:boolean}}
     */
    goog.moduleLoaderState_ = null;

    /**
     * @private
     * @return {boolean} Whether a goog.module is currently being initialized.
     */
    goog.isInModuleLoader_ = function () {
      return goog.moduleLoaderState_ != null;
    };

    /**
     * Provide the module's exports as a globally accessible object under the
     * module's declared name.  This is intended to ease migration to goog.module
     * for files that have existing usages.
     * @suppress {missingProvide}
     */
    goog.module.declareLegacyNamespace = function () {
      if (!COMPILED && !goog.isInModuleLoader_()) {
        throw new Error('goog.module.declareLegacyNamespace must be called from ' + 'within a goog.module');
      }
      if (!COMPILED && !goog.moduleLoaderState_.moduleName) {
        throw Error('goog.module must be called prior to ' + 'goog.module.declareLegacyNamespace.');
      }
      goog.moduleLoaderState_.declareLegacyNamespace = true;
    };

    /**
     * Marks that the current file should only be used for testing, and never for
     * live code in production.
     *
     * In the case of unit tests, the message may optionally be an exact namespace
     * for the test (e.g. 'goog.stringTest'). The linter will then ignore the extra
     * provide (if not explicitly defined in the code).
     *
     * @param {string=} opt_message Optional message to add to the error that's
     *     raised when used in production code.
     */
    goog.setTestOnly = function (opt_message) {
      if (goog.DISALLOW_TEST_ONLY_CODE) {
        opt_message = opt_message || '';
        throw Error('Importing test-only code into non-debug environment' + (opt_message ? ': ' + opt_message : '.'));
      }
    };

    if (!COMPILED) {
      /**
       * Check if the given name has been goog.provided. This will return false for
       * names that are available only as implicit namespaces.
       * @param {string} name name of the object to look for.
       * @return {boolean} Whether the name has been provided.
       * @private
       */
      goog.isProvided_ = function (name) {
        return name in goog.loadedModules_ || !goog.implicitNamespaces_[name] && goog.isDefAndNotNull(goog.getObjectByName(name));
      };

      /**
       * Namespaces implicitly defined by goog.provide. For example,
       * goog.provide('goog.events.Event') implicitly declares that 'goog' and
       * 'goog.events' must be namespaces.
       *
       * @type {!Object<string, (boolean|undefined)>}
       * @private
       */
      goog.implicitNamespaces_ = { 'goog.module': true };

      // NOTE: We add goog.module as an implicit namespace as goog.module is defined
      // here and because the existing module package has not been moved yet out of
      // the goog.module namespace. This satisifies both the debug loader and
      // ahead-of-time dependency management.
    }

    /**
     * Returns an object based on its fully qualified external name.  The object
     * is not found if null or undefined.  If you are using a compilation pass that
     * renames property names beware that using this function will not find renamed
     * properties.
     *
     * @param {string} name The fully qualified name.
     * @param {Object=} opt_obj The object within which to look; default is
     *     |goog.global|.
     * @return {?} The value (object or primitive) or, if not found, null.
     */
    goog.getObjectByName = function (name, opt_obj) {
      var parts = name.split('.');
      var cur = opt_obj || goog.global;
      for (var part; part = parts.shift();) {
        if (goog.isDefAndNotNull(cur[part])) {
          cur = cur[part];
        } else {
          return null;
        }
      }
      return cur;
    };

    /**
     * Globalizes a whole namespace, such as goog or goog.lang.
     *
     * @param {!Object} obj The namespace to globalize.
     * @param {Object=} opt_global The object to add the properties to.
     * @deprecated Properties may be explicitly exported to the global scope, but
     *     this should no longer be done in bulk.
     */
    goog.globalize = function (obj, opt_global) {
      var global = opt_global || goog.global;
      for (var x in obj) {
        global[x] = obj[x];
      }
    };

    /**
     * Adds a dependency from a file to the files it requires.
     * @param {string} relPath The path to the js file.
     * @param {!Array<string>} provides An array of strings with
     *     the names of the objects this file provides.
     * @param {!Array<string>} requires An array of strings with
     *     the names of the objects this file requires.
     * @param {boolean|!Object<string>=} opt_loadFlags Parameters indicating
     *     how the file must be loaded.  The boolean 'true' is equivalent
     *     to {'module': 'goog'} for backwards-compatibility.  Valid properties
     *     and values include {'module': 'goog'} and {'lang': 'es6'}.
     */
    goog.addDependency = function (relPath, provides, requires, opt_loadFlags) {
      if (goog.DEPENDENCIES_ENABLED) {
        var provide, require;
        var path = relPath.replace(/\\/g, '/');
        var deps = goog.dependencies_;
        if (!opt_loadFlags || typeof opt_loadFlags === 'boolean') {
          opt_loadFlags = opt_loadFlags ? { 'module': 'goog' } : {};
        }
        for (var i = 0; provide = provides[i]; i++) {
          deps.nameToPath[provide] = path;
          deps.pathIsModule[path] = opt_loadFlags['module'] == 'goog';
        }
        for (var j = 0; require = requires[j]; j++) {
          if (!(path in deps.requires)) {
            deps.requires[path] = {};
          }
          deps.requires[path][require] = true;
        }
      }
    };

    // NOTE(nnaze): The debug DOM loader was included in base.js as an original way
    // to do "debug-mode" development.  The dependency system can sometimes be
    // confusing, as can the debug DOM loader's asynchronous nature.
    //
    // With the DOM loader, a call to goog.require() is not blocking -- the script
    // will not load until some point after the current script.  If a namespace is
    // needed at runtime, it needs to be defined in a previous script, or loaded via
    // require() with its registered dependencies.
    //
    // User-defined namespaces may need their own deps file. For a reference on
    // creating a deps file, see:
    // Externally: https://developers.google.com/closure/library/docs/depswriter
    //
    // Because of legacy clients, the DOM loader can't be easily removed from
    // base.js.  Work is being done to make it disableable or replaceable for
    // different environments (DOM-less JavaScript interpreters like Rhino or V8,
    // for example). See bootstrap/ for more information.


    /**
     * @define {boolean} Whether to enable the debug loader.
     *
     * If enabled, a call to goog.require() will attempt to load the namespace by
     * appending a script tag to the DOM (if the namespace has been registered).
     *
     * If disabled, goog.require() will simply assert that the namespace has been
     * provided (and depend on the fact that some outside tool correctly ordered
     * the script).
     */
    goog.define('goog.ENABLE_DEBUG_LOADER', true);

    /**
     * @param {string} msg
     * @private
     */
    goog.logToConsole_ = function (msg) {
      if (goog.global.console) {
        goog.global.console['error'](msg);
      }
    };

    /**
     * Implements a system for the dynamic resolution of dependencies that works in
     * parallel with the BUILD system. Note that all calls to goog.require will be
     * stripped by the JSCompiler when the --process_closure_primitives option is
     * used.
     * @see goog.provide
     * @param {string} name Namespace to include (as was given in goog.provide()) in
     *     the form "goog.package.part".
     * @return {?} If called within a goog.module file, the associated namespace or
     *     module otherwise null.
     */
    goog.require = function (name) {
      // If the object already exists we do not need do do anything.
      if (!COMPILED) {
        if (goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_) {
          goog.maybeProcessDeferredDep_(name);
        }

        if (goog.isProvided_(name)) {
          if (goog.isInModuleLoader_()) {
            return goog.module.getInternal_(name);
          } else {
            return null;
          }
        }

        if (goog.ENABLE_DEBUG_LOADER) {
          var path = goog.getPathFromDeps_(name);
          if (path) {
            goog.writeScripts_(path);
            return null;
          }
        }

        var errorMessage = 'goog.require could not find: ' + name;
        goog.logToConsole_(errorMessage);

        throw Error(errorMessage);
      }
    };

    /**
     * Path for included scripts.
     * @type {string}
     */
    goog.basePath = '';

    /**
     * A hook for overriding the base path.
     * @type {string|undefined}
     */
    goog.global.CLOSURE_BASE_PATH;

    /**
     * Whether to write out Closure's deps file. By default, the deps are written.
     * @type {boolean|undefined}
     */
    goog.global.CLOSURE_NO_DEPS;

    /**
     * A function to import a single script. This is meant to be overridden when
     * Closure is being run in non-HTML contexts, such as web workers. It's defined
     * in the global scope so that it can be set before base.js is loaded, which
     * allows deps.js to be imported properly.
     *
     * The function is passed the script source, which is a relative URI. It should
     * return true if the script was imported, false otherwise.
     * @type {(function(string): boolean)|undefined}
     */
    goog.global.CLOSURE_IMPORT_SCRIPT;

    /**
     * Null function used for default values of callbacks, etc.
     * @return {void} Nothing.
     */
    goog.nullFunction = function () {};

    /**
     * When defining a class Foo with an abstract method bar(), you can do:
     * Foo.prototype.bar = goog.abstractMethod
     *
     * Now if a subclass of Foo fails to override bar(), an error will be thrown
     * when bar() is invoked.
     *
     * Note: This does not take the name of the function to override as an argument
     * because that would make it more difficult to obfuscate our JavaScript code.
     *
     * @type {!Function}
     * @throws {Error} when invoked to indicate the method should be overridden.
     */
    goog.abstractMethod = function () {
      throw Error('unimplemented abstract method');
    };

    /**
     * Adds a {@code getInstance} static method that always returns the same
     * instance object.
     * @param {!Function} ctor The constructor for the class to add the static
     *     method to.
     */
    goog.addSingletonGetter = function (ctor) {
      ctor.getInstance = function () {
        if (ctor.instance_) {
          return ctor.instance_;
        }
        if (goog.DEBUG) {
          // NOTE: JSCompiler can't optimize away Array#push.
          goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = ctor;
        }
        return ctor.instance_ = new ctor();
      };
    };

    /**
     * All singleton classes that have been instantiated, for testing. Don't read
     * it directly, use the {@code goog.testing.singleton} module. The compiler
     * removes this variable if unused.
     * @type {!Array<!Function>}
     * @private
     */
    goog.instantiatedSingletons_ = [];

    /**
     * @define {boolean} Whether to load goog.modules using {@code eval} when using
     * the debug loader.  This provides a better debugging experience as the
     * source is unmodified and can be edited using Chrome Workspaces or similar.
     * However in some environments the use of {@code eval} is banned
     * so we provide an alternative.
     */
    goog.define('goog.LOAD_MODULE_USING_EVAL', true);

    /**
     * @define {boolean} Whether the exports of goog.modules should be sealed when
     * possible.
     */
    goog.define('goog.SEAL_MODULE_EXPORTS', goog.DEBUG);

    /**
     * The registry of initialized modules:
     * the module identifier to module exports map.
     * @private @const {!Object<string, ?>}
     */
    goog.loadedModules_ = {};

    /**
     * True if goog.dependencies_ is available.
     * @const {boolean}
     */
    goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;

    if (goog.DEPENDENCIES_ENABLED) {
      /**
       * This object is used to keep track of dependencies and other data that is
       * used for loading scripts.
       * @private
       * @type {{
       *   pathIsModule: !Object<string, boolean>,
       *   nameToPath: !Object<string, string>,
       *   requires: !Object<string, !Object<string, boolean>>,
       *   visited: !Object<string, boolean>,
       *   written: !Object<string, boolean>,
       *   deferred: !Object<string, string>
       * }}
       */
      goog.dependencies_ = {
        pathIsModule: {}, // 1 to 1

        nameToPath: {}, // 1 to 1

        requires: {}, // 1 to many

        // Used when resolving dependencies to prevent us from visiting file twice.
        visited: {},

        written: {}, // Used to keep track of script files we have written.

        deferred: {} // Used to track deferred module evaluations in old IEs
      };

      /**
       * Tries to detect whether is in the context of an HTML document.
       * @return {boolean} True if it looks like HTML document.
       * @private
       */
      goog.inHtmlDocument_ = function () {
        /** @type {Document} */
        var doc = goog.global.document;
        return doc != null && 'write' in doc; // XULDocument misses write.
      };

      /**
       * Tries to detect the base path of base.js script that bootstraps Closure.
       * @private
       */
      goog.findBasePath_ = function () {
        if (goog.isDef(goog.global.CLOSURE_BASE_PATH)) {
          goog.basePath = goog.global.CLOSURE_BASE_PATH;
          return;
        } else if (!goog.inHtmlDocument_()) {
          return;
        }
        /** @type {Document} */
        var doc = goog.global.document;
        var scripts = doc.getElementsByTagName('SCRIPT');
        // Search backwards since the current script is in almost all cases the one
        // that has base.js.
        for (var i = scripts.length - 1; i >= 0; --i) {
          var script = /** @type {!HTMLScriptElement} */scripts[i];
          var src = script.src;
          var qmark = src.lastIndexOf('?');
          var l = qmark == -1 ? src.length : qmark;
          if (src.substr(l - 7, 7) == 'base.js') {
            goog.basePath = src.substr(0, l - 7);
            return;
          }
        }
      };

      /**
       * Imports a script if, and only if, that script hasn't already been imported.
       * (Must be called at execution time)
       * @param {string} src Script source.
       * @param {string=} opt_sourceText The optionally source text to evaluate
       * @private
       */
      goog.importScript_ = function (src, opt_sourceText) {
        var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
        if (importScript(src, opt_sourceText)) {
          goog.dependencies_.written[src] = true;
        }
      };

      /** @const @private {boolean} */
      goog.IS_OLD_IE_ = !!(!goog.global.atob && goog.global.document && goog.global.document.all);

      /**
       * Given a URL initiate retrieval and execution of the module.
       * @param {string} src Script source URL.
       * @private
       */
      goog.importModule_ = function (src) {
        // In an attempt to keep browsers from timing out loading scripts using
        // synchronous XHRs, put each load in its own script block.
        var bootstrap = 'goog.retrieveAndExecModule_("' + src + '");';

        if (goog.importScript_('', bootstrap)) {
          goog.dependencies_.written[src] = true;
        }
      };

      /** @private {!Array<string>} */
      goog.queuedModules_ = [];

      /**
       * Return an appropriate module text. Suitable to insert into
       * a script tag (that is unescaped).
       * @param {string} srcUrl
       * @param {string} scriptText
       * @return {string}
       * @private
       */
      goog.wrapModule_ = function (srcUrl, scriptText) {
        if (!goog.LOAD_MODULE_USING_EVAL || !goog.isDef(goog.global.JSON)) {
          return '' + 'goog.loadModule(function(exports) {' + '"use strict";' + scriptText + '\n' + // terminate any trailing single line comment.
          ';return exports' + '});' + '\n//# sourceURL=' + srcUrl + '\n';
        } else {
          return '' + 'goog.loadModule(' + goog.global.JSON.stringify(scriptText + '\n//# sourceURL=' + srcUrl + '\n') + ');';
        }
      };

      // On IE9 and earlier, it is necessary to handle
      // deferred module loads. In later browsers, the
      // code to be evaluated is simply inserted as a script
      // block in the correct order. To eval deferred
      // code at the right time, we piggy back on goog.require to call
      // goog.maybeProcessDeferredDep_.
      //
      // The goog.requires are used both to bootstrap
      // the loading process (when no deps are available) and
      // declare that they should be available.
      //
      // Here we eval the sources, if all the deps are available
      // either already eval'd or goog.require'd.  This will
      // be the case when all the dependencies have already
      // been loaded, and the dependent module is loaded.
      //
      // But this alone isn't sufficient because it is also
      // necessary to handle the case where there is no root
      // that is not deferred.  For that there we register for an event
      // and trigger goog.loadQueuedModules_ handle any remaining deferred
      // evaluations.

      /**
       * Handle any remaining deferred goog.module evals.
       * @private
       */
      goog.loadQueuedModules_ = function () {
        var count = goog.queuedModules_.length;
        if (count > 0) {
          var queue = goog.queuedModules_;
          goog.queuedModules_ = [];
          for (var i = 0; i < count; i++) {
            var path = queue[i];
            goog.maybeProcessDeferredPath_(path);
          }
        }
      };

      /**
       * Eval the named module if its dependencies are
       * available.
       * @param {string} name The module to load.
       * @private
       */
      goog.maybeProcessDeferredDep_ = function (name) {
        if (goog.isDeferredModule_(name) && goog.allDepsAreAvailable_(name)) {
          var path = goog.getPathFromDeps_(name);
          goog.maybeProcessDeferredPath_(goog.basePath + path);
        }
      };

      /**
       * @param {string} name The module to check.
       * @return {boolean} Whether the name represents a
       *     module whose evaluation has been deferred.
       * @private
       */
      goog.isDeferredModule_ = function (name) {
        var path = goog.getPathFromDeps_(name);
        if (path && goog.dependencies_.pathIsModule[path]) {
          var abspath = goog.basePath + path;
          return abspath in goog.dependencies_.deferred;
        }
        return false;
      };

      /**
       * @param {string} name The module to check.
       * @return {boolean} Whether the name represents a
       *     module whose declared dependencies have all been loaded
       *     (eval'd or a deferred module load)
       * @private
       */
      goog.allDepsAreAvailable_ = function (name) {
        var path = goog.getPathFromDeps_(name);
        if (path && path in goog.dependencies_.requires) {
          for (var requireName in goog.dependencies_.requires[path]) {
            if (!goog.isProvided_(requireName) && !goog.isDeferredModule_(requireName)) {
              return false;
            }
          }
        }
        return true;
      };

      /**
       * @param {string} abspath
       * @private
       */
      goog.maybeProcessDeferredPath_ = function (abspath) {
        if (abspath in goog.dependencies_.deferred) {
          var src = goog.dependencies_.deferred[abspath];
          delete goog.dependencies_.deferred[abspath];
          goog.globalEval(src);
        }
      };

      /**
       * Load a goog.module from the provided URL.  This is not a general purpose
       * code loader and does not support late loading code, that is it should only
       * be used during page load. This method exists to support unit tests and
       * "debug" loaders that would otherwise have inserted script tags. Under the
       * hood this needs to use a synchronous XHR and is not recommeneded for
       * production code.
       *
       * The module's goog.requires must have already been satisified; an exception
       * will be thrown if this is not the case. This assumption is that no
       * "deps.js" file exists, so there is no way to discover and locate the
       * module-to-be-loaded's dependencies and no attempt is made to do so.
       *
       * There should only be one attempt to load a module.  If
       * "goog.loadModuleFromUrl" is called for an already loaded module, an
       * exception will be throw.
       *
       * @param {string} url The URL from which to attempt to load the goog.module.
       */
      goog.loadModuleFromUrl = function (url) {
        // Because this executes synchronously, we don't need to do any additional
        // bookkeeping. When "goog.loadModule" the namespace will be marked as
        // having been provided which is sufficient.
        goog.retrieveAndExecModule_(url);
      };

      /**
       * @param {function(?):?|string} moduleDef The module definition.
       */
      goog.loadModule = function (moduleDef) {
        // NOTE: we allow function definitions to be either in the from
        // of a string to eval (which keeps the original source intact) or
        // in a eval forbidden environment (CSP) we allow a function definition
        // which in its body must call {@code goog.module}, and return the exports
        // of the module.
        var previousState = goog.moduleLoaderState_;
        try {
          goog.moduleLoaderState_ = {
            moduleName: undefined,
            declareLegacyNamespace: false
          };
          var exports;
          if (goog.isFunction(moduleDef)) {
            exports = moduleDef.call(goog.global, {});
          } else if (goog.isString(moduleDef)) {
            exports = goog.loadModuleFromSource_.call(goog.global, moduleDef);
          } else {
            throw Error('Invalid module definition');
          }

          var moduleName = goog.moduleLoaderState_.moduleName;
          if (!goog.isString(moduleName) || !moduleName) {
            throw Error('Invalid module name \"' + moduleName + '\"');
          }

          // Don't seal legacy namespaces as they may be uses as a parent of
          // another namespace
          if (goog.moduleLoaderState_.declareLegacyNamespace) {
            goog.constructNamespace_(moduleName, exports);
          } else if (goog.SEAL_MODULE_EXPORTS && Object.seal) {
            Object.seal(exports);
          }

          goog.loadedModules_[moduleName] = exports;
        } finally {
          goog.moduleLoaderState_ = previousState;
        }
      };

      /**
       * @private @const {function(string):?}
       *
       * The new type inference warns because this function has no formal
       * parameters, but its jsdoc says that it takes one argument.
       * (The argument is used via arguments[0], but NTI does not detect this.)
       * @suppress {newCheckTypes}
       */
      goog.loadModuleFromSource_ = function () {
        // NOTE: we avoid declaring parameters or local variables here to avoid
        // masking globals or leaking values into the module definition.
        'use strict';

        var exports = {};
        eval(arguments[0]);
        return exports;
      };

      /**
       * Writes a new script pointing to {@code src} directly into the DOM.
       *
       * NOTE: This method is not CSP-compliant. @see goog.appendScriptSrcNode_ for
       * the fallback mechanism.
       *
       * @param {string} src The script URL.
       * @private
       */
      goog.writeScriptSrcNode_ = function (src) {
        goog.global.document.write('<script type="text/javascript" src="' + src + '"></' + 'script>');
      };

      /**
       * Appends a new script node to the DOM using a CSP-compliant mechanism. This
       * method exists as a fallback for document.write (which is not allowed in a
       * strict CSP context, e.g., Chrome apps).
       *
       * NOTE: This method is not analogous to using document.write to insert a
       * <script> tag; specifically, the user agent will execute a script added by
       * document.write immediately after the current script block finishes
       * executing, whereas the DOM-appended script node will not be executed until
       * the entire document is parsed and executed. That is to say, this script is
       * added to the end of the script execution queue.
       *
       * The page must not attempt to call goog.required entities until after the
       * document has loaded, e.g., in or after the window.onload callback.
       *
       * @param {string} src The script URL.
       * @private
       */
      goog.appendScriptSrcNode_ = function (src) {
        /** @type {Document} */
        var doc = goog.global.document;
        var scriptEl =
        /** @type {HTMLScriptElement} */doc.createElement('script');
        scriptEl.type = 'text/javascript';
        scriptEl.src = src;
        scriptEl.defer = false;
        scriptEl.async = false;
        doc.head.appendChild(scriptEl);
      };

      /**
       * The default implementation of the import function. Writes a script tag to
       * import the script.
       *
       * @param {string} src The script url.
       * @param {string=} opt_sourceText The optionally source text to evaluate
       * @return {boolean} True if the script was imported, false otherwise.
       * @private
       */
      goog.writeScriptTag_ = function (src, opt_sourceText) {
        if (goog.inHtmlDocument_()) {
          /** @type {!HTMLDocument} */
          var doc = goog.global.document;

          // If the user tries to require a new symbol after document load,
          // something has gone terribly wrong. Doing a document.write would
          // wipe out the page. This does not apply to the CSP-compliant method
          // of writing script tags.
          if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && doc.readyState == 'complete') {
            // Certain test frameworks load base.js multiple times, which tries
            // to write deps.js each time. If that happens, just fail silently.
            // These frameworks wipe the page between each load of base.js, so this
            // is OK.
            var isDeps = /\bdeps.js$/.test(src);
            if (isDeps) {
              return false;
            } else {
              throw Error('Cannot write "' + src + '" after document load');
            }
          }

          var isOldIE = goog.IS_OLD_IE_;

          if (opt_sourceText === undefined) {
            if (!isOldIE) {
              if (goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING) {
                goog.appendScriptSrcNode_(src);
              } else {
                goog.writeScriptSrcNode_(src);
              }
            } else {
              var state = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ";
              doc.write('<script type="text/javascript" src="' + src + '"' + state + '></' + 'script>');
            }
          } else {
            doc.write('<script type="text/javascript">' + opt_sourceText + '</' + 'script>');
          }
          return true;
        } else {
          return false;
        }
      };

      /** @private {number} */
      goog.lastNonModuleScriptIndex_ = 0;

      /**
       * A readystatechange handler for legacy IE
       * @param {!HTMLScriptElement} script
       * @param {number} scriptIndex
       * @return {boolean}
       * @private
       */
      goog.onScriptLoad_ = function (script, scriptIndex) {
        // for now load the modules when we reach the last script,
        // later allow more inter-mingling.
        if (script.readyState == 'complete' && goog.lastNonModuleScriptIndex_ == scriptIndex) {
          goog.loadQueuedModules_();
        }
        return true;
      };

      /**
       * Resolves dependencies based on the dependencies added using addDependency
       * and calls importScript_ in the correct order.
       * @param {string} pathToLoad The path from which to start discovering
       *     dependencies.
       * @private
       */
      goog.writeScripts_ = function (pathToLoad) {
        /** @type {!Array<string>} The scripts we need to write this time. */
        var scripts = [];
        var seenScript = {};
        var deps = goog.dependencies_;

        /** @param {string} path */
        function visitNode(path) {
          if (path in deps.written) {
            return;
          }

          // We have already visited this one. We can get here if we have cyclic
          // dependencies.
          if (path in deps.visited) {
            return;
          }

          deps.visited[path] = true;

          if (path in deps.requires) {
            for (var requireName in deps.requires[path]) {
              // If the required name is defined, we assume that it was already
              // bootstrapped by other means.
              if (!goog.isProvided_(requireName)) {
                if (requireName in deps.nameToPath) {
                  visitNode(deps.nameToPath[requireName]);
                } else {
                  throw Error('Undefined nameToPath for ' + requireName);
                }
              }
            }
          }

          if (!(path in seenScript)) {
            seenScript[path] = true;
            scripts.push(path);
          }
        }

        visitNode(pathToLoad);

        // record that we are going to load all these scripts.
        for (var i = 0; i < scripts.length; i++) {
          var path = scripts[i];
          goog.dependencies_.written[path] = true;
        }

        // If a module is loaded synchronously then we need to
        // clear the current inModuleLoader value, and restore it when we are
        // done loading the current "requires".
        var moduleState = goog.moduleLoaderState_;
        goog.moduleLoaderState_ = null;

        for (var i = 0; i < scripts.length; i++) {
          var path = scripts[i];
          if (path) {
            if (!deps.pathIsModule[path]) {
              goog.importScript_(goog.basePath + path);
            } else {
              goog.importModule_(goog.basePath + path);
            }
          } else {
            goog.moduleLoaderState_ = moduleState;
            throw Error('Undefined script input');
          }
        }

        // restore the current "module loading state"
        goog.moduleLoaderState_ = moduleState;
      };

      /**
       * Looks at the dependency rules and tries to determine the script file that
       * fulfills a particular rule.
       * @param {string} rule In the form goog.namespace.Class or project.script.
       * @return {?string} Url corresponding to the rule, or null.
       * @private
       */
      goog.getPathFromDeps_ = function (rule) {
        if (rule in goog.dependencies_.nameToPath) {
          return goog.dependencies_.nameToPath[rule];
        } else {
          return null;
        }
      };

      goog.findBasePath_();

      // Allow projects to manage the deps files themselves.
      if (!goog.global.CLOSURE_NO_DEPS) {
        goog.importScript_(goog.basePath + 'deps.js');
      }
    }

    /**
     * Normalize a file path by removing redundant ".." and extraneous "." file
     * path components.
     * @param {string} path
     * @return {string}
     * @private
     */
    goog.normalizePath_ = function (path) {
      var components = path.split('/');
      var i = 0;
      while (i < components.length) {
        if (components[i] == '.') {
          components.splice(i, 1);
        } else if (i && components[i] == '..' && components[i - 1] && components[i - 1] != '..') {
          components.splice(--i, 2);
        } else {
          i++;
        }
      }
      return components.join('/');
    };

    /**
     * Loads file by synchronous XHR. Should not be used in production environments.
     * @param {string} src Source URL.
     * @return {string} File contents.
     * @private
     */
    goog.loadFileSync_ = function (src) {
      if (goog.global.CLOSURE_LOAD_FILE_SYNC) {
        return goog.global.CLOSURE_LOAD_FILE_SYNC(src);
      } else {
        /** @type {XMLHttpRequest} */
        var xhr = new goog.global['XMLHttpRequest']();
        xhr.open('get', src, false);
        xhr.send();
        return xhr.responseText;
      }
    };

    /**
     * Retrieve and execute a module.
     * @param {string} src Script source URL.
     * @private
     */
    goog.retrieveAndExecModule_ = function (src) {
      if (!COMPILED) {
        // The full but non-canonicalized URL for later use.
        var originalPath = src;
        // Canonicalize the path, removing any /./ or /../ since Chrome's debugging
        // console doesn't auto-canonicalize XHR loads as it does <script> srcs.
        src = goog.normalizePath_(src);

        var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;

        var scriptText = goog.loadFileSync_(src);

        if (scriptText != null) {
          var execModuleScript = goog.wrapModule_(src, scriptText);
          var isOldIE = goog.IS_OLD_IE_;
          if (isOldIE) {
            goog.dependencies_.deferred[originalPath] = execModuleScript;
            goog.queuedModules_.push(originalPath);
          } else {
            importScript(src, execModuleScript);
          }
        } else {
          throw new Error('load of ' + src + 'failed');
        }
      }
    };

    //==============================================================================
    // Language Enhancements
    //==============================================================================


    /**
     * This is a "fixed" version of the typeof operator.  It differs from the typeof
     * operator in such a way that null returns 'null' and arrays return 'array'.
     * @param {?} value The value to get the type of.
     * @return {string} The name of the type.
     */
    goog.typeOf = function (value) {
      var s = typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);
      if (s == 'object') {
        if (value) {
          // Check these first, so we can avoid calling Object.prototype.toString if
          // possible.
          //
          // IE improperly marshals typeof across execution contexts, but a
          // cross-context object will still return false for "instanceof Object".
          if (value instanceof Array) {
            return 'array';
          } else if (value instanceof Object) {
            return s;
          }

          // HACK: In order to use an Object prototype method on the arbitrary
          //   value, the compiler requires the value be cast to type Object,
          //   even though the ECMA spec explicitly allows it.
          var className = Object.prototype.toString.call(
          /** @type {!Object} */value);
          // In Firefox 3.6, attempting to access iframe window objects' length
          // property throws an NS_ERROR_FAILURE, so we need to special-case it
          // here.
          if (className == '[object Window]') {
            return 'object';
          }

          // We cannot always use constructor == Array or instanceof Array because
          // different frames have different Array objects. In IE6, if the iframe
          // where the array was created is destroyed, the array loses its
          // prototype. Then dereferencing val.splice here throws an exception, so
          // we can't use goog.isFunction. Calling typeof directly returns 'unknown'
          // so that will work. In this case, this function will return false and
          // most array functions will still work because the array is still
          // array-like (supports length and []) even though it has lost its
          // prototype.
          // Mark Miller noticed that Object.prototype.toString
          // allows access to the unforgeable [[Class]] property.
          //  15.2.4.2 Object.prototype.toString ( )
          //  When the toString method is called, the following steps are taken:
          //      1. Get the [[Class]] property of this object.
          //      2. Compute a string value by concatenating the three strings
          //         "[object ", Result(1), and "]".
          //      3. Return Result(2).
          // and this behavior survives the destruction of the execution context.
          if (className == '[object Array]' ||
          // In IE all non value types are wrapped as objects across window
          // boundaries (not iframe though) so we have to do object detection
          // for this edge case.
          typeof value.length == 'number' && typeof value.splice != 'undefined' && typeof value.propertyIsEnumerable != 'undefined' && !value.propertyIsEnumerable('splice')) {
            return 'array';
          }
          // HACK: There is still an array case that fails.
          //     function ArrayImpostor() {}
          //     ArrayImpostor.prototype = [];
          //     var impostor = new ArrayImpostor;
          // this can be fixed by getting rid of the fast path
          // (value instanceof Array) and solely relying on
          // (value && Object.prototype.toString.vall(value) === '[object Array]')
          // but that would require many more function calls and is not warranted
          // unless closure code is receiving objects from untrusted sources.

          // IE in cross-window calls does not correctly marshal the function type
          // (it appears just as an object) so we cannot use just typeof val ==
          // 'function'. However, if the object has a call property, it is a
          // function.
          if (className == '[object Function]' || typeof value.call != 'undefined' && typeof value.propertyIsEnumerable != 'undefined' && !value.propertyIsEnumerable('call')) {
            return 'function';
          }
        } else {
          return 'null';
        }
      } else if (s == 'function' && typeof value.call == 'undefined') {
        // In Safari typeof nodeList returns 'function', and on Firefox typeof
        // behaves similarly for HTML{Applet,Embed,Object}, Elements and RegExps. We
        // would like to return object for those and we can detect an invalid
        // function by making sure that the function object has a call method.
        return 'object';
      }
      return s;
    };

    /**
     * Returns true if the specified value is null.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is null.
     */
    goog.isNull = function (val) {
      return val === null;
    };

    /**
     * Returns true if the specified value is defined and not null.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is defined and not null.
     */
    goog.isDefAndNotNull = function (val) {
      // Note that undefined == null.
      return val != null;
    };

    /**
     * Returns true if the specified value is an array.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is an array.
     */
    goog.isArray = function (val) {
      return goog.typeOf(val) == 'array';
    };

    /**
     * Returns true if the object looks like an array. To qualify as array like
     * the value needs to be either a NodeList or an object with a Number length
     * property. As a special case, a function value is not array like, because its
     * length property is fixed to correspond to the number of expected arguments.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is an array.
     */
    goog.isArrayLike = function (val) {
      var type = goog.typeOf(val);
      // We do not use goog.isObject here in order to exclude function values.
      return type == 'array' || type == 'object' && typeof val.length == 'number';
    };

    /**
     * Returns true if the object looks like a Date. To qualify as Date-like the
     * value needs to be an object and have a getFullYear() function.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is a like a Date.
     */
    goog.isDateLike = function (val) {
      return goog.isObject(val) && typeof val.getFullYear == 'function';
    };

    /**
     * Returns true if the specified value is a string.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is a string.
     */
    goog.isString = function (val) {
      return typeof val == 'string';
    };

    /**
     * Returns true if the specified value is a boolean.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is boolean.
     */
    goog.isBoolean = function (val) {
      return typeof val == 'boolean';
    };

    /**
     * Returns true if the specified value is a number.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is a number.
     */
    goog.isNumber = function (val) {
      return typeof val == 'number';
    };

    /**
     * Returns true if the specified value is a function.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is a function.
     */
    goog.isFunction = function (val) {
      return goog.typeOf(val) == 'function';
    };

    /**
     * Returns true if the specified value is an object.  This includes arrays and
     * functions.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is an object.
     */
    goog.isObject = function (val) {
      var type = typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val);
      return type == 'object' && val != null || type == 'function';
      // return Object(val) === val also works, but is slower, especially if val is
      // not an object.
    };

    /**
     * Gets a unique ID for an object. This mutates the object so that further calls
     * with the same object as a parameter returns the same value. The unique ID is
     * guaranteed to be unique across the current session amongst objects that are
     * passed into {@code getUid}. There is no guarantee that the ID is unique or
     * consistent across sessions. It is unsafe to generate unique ID for function
     * prototypes.
     *
     * @param {Object} obj The object to get the unique ID for.
     * @return {number} The unique ID for the object.
     */
    goog.getUid = function (obj) {
      // TODO(arv): Make the type stricter, do not accept null.

      // In Opera window.hasOwnProperty exists but always returns false so we avoid
      // using it. As a consequence the unique ID generated for BaseClass.prototype
      // and SubClass.prototype will be the same.
      return obj[goog.UID_PROPERTY_] || (obj[goog.UID_PROPERTY_] = ++goog.uidCounter_);
    };

    /**
     * Whether the given object is already assigned a unique ID.
     *
     * This does not modify the object.
     *
     * @param {!Object} obj The object to check.
     * @return {boolean} Whether there is an assigned unique id for the object.
     */
    goog.hasUid = function (obj) {
      return !!obj[goog.UID_PROPERTY_];
    };

    /**
     * Removes the unique ID from an object. This is useful if the object was
     * previously mutated using {@code goog.getUid} in which case the mutation is
     * undone.
     * @param {Object} obj The object to remove the unique ID field from.
     */
    goog.removeUid = function (obj) {
      // TODO(arv): Make the type stricter, do not accept null.

      // In IE, DOM nodes are not instances of Object and throw an exception if we
      // try to delete.  Instead we try to use removeAttribute.
      if (obj !== null && 'removeAttribute' in obj) {
        obj.removeAttribute(goog.UID_PROPERTY_);
      }
      /** @preserveTry */
      try {
        delete obj[goog.UID_PROPERTY_];
      } catch (ex) {}
    };

    /**
     * Name for unique ID property. Initialized in a way to help avoid collisions
     * with other closure JavaScript on the same page.
     * @type {string}
     * @private
     */
    goog.UID_PROPERTY_ = 'closure_uid_' + (Math.random() * 1e9 >>> 0);

    /**
     * Counter for UID.
     * @type {number}
     * @private
     */
    goog.uidCounter_ = 0;

    /**
     * Adds a hash code field to an object. The hash code is unique for the
     * given object.
     * @param {Object} obj The object to get the hash code for.
     * @return {number} The hash code for the object.
     * @deprecated Use goog.getUid instead.
     */
    goog.getHashCode = goog.getUid;

    /**
     * Removes the hash code field from an object.
     * @param {Object} obj The object to remove the field from.
     * @deprecated Use goog.removeUid instead.
     */
    goog.removeHashCode = goog.removeUid;

    /**
     * Clones a value. The input may be an Object, Array, or basic type. Objects and
     * arrays will be cloned recursively.
     *
     * WARNINGS:
     * <code>goog.cloneObject</code> does not detect reference loops. Objects that
     * refer to themselves will cause infinite recursion.
     *
     * <code>goog.cloneObject</code> is unaware of unique identifiers, and copies
     * UIDs created by <code>getUid</code> into cloned results.
     *
     * @param {*} obj The value to clone.
     * @return {*} A clone of the input value.
     * @deprecated goog.cloneObject is unsafe. Prefer the goog.object methods.
     */
    goog.cloneObject = function (obj) {
      var type = goog.typeOf(obj);
      if (type == 'object' || type == 'array') {
        if (obj.clone) {
          return obj.clone();
        }
        var clone = type == 'array' ? [] : {};
        for (var key in obj) {
          clone[key] = goog.cloneObject(obj[key]);
        }
        return clone;
      }

      return obj;
    };

    /**
     * A native implementation of goog.bind.
     * @param {Function} fn A function to partially apply.
     * @param {Object|undefined} selfObj Specifies the object which this should
     *     point to when the function is run.
     * @param {...*} var_args Additional arguments that are partially applied to the
     *     function.
     * @return {!Function} A partially-applied form of the function bind() was
     *     invoked as a method of.
     * @private
     * @suppress {deprecated} The compiler thinks that Function.prototype.bind is
     *     deprecated because some people have declared a pure-JS version.
     *     Only the pure-JS version is truly deprecated.
     */
    goog.bindNative_ = function (fn, selfObj, var_args) {
      return (/** @type {!Function} */fn.call.apply(fn.bind, arguments)
      );
    };

    /**
     * A pure-JS implementation of goog.bind.
     * @param {Function} fn A function to partially apply.
     * @param {Object|undefined} selfObj Specifies the object which this should
     *     point to when the function is run.
     * @param {...*} var_args Additional arguments that are partially applied to the
     *     function.
     * @return {!Function} A partially-applied form of the function bind() was
     *     invoked as a method of.
     * @private
     */
    goog.bindJs_ = function (fn, selfObj, var_args) {
      if (!fn) {
        throw new Error();
      }

      if (arguments.length > 2) {
        var boundArgs = Array.prototype.slice.call(arguments, 2);
        return function () {
          // Prepend the bound arguments to the current arguments.
          var newArgs = Array.prototype.slice.call(arguments);
          Array.prototype.unshift.apply(newArgs, boundArgs);
          return fn.apply(selfObj, newArgs);
        };
      } else {
        return function () {
          return fn.apply(selfObj, arguments);
        };
      }
    };

    /**
     * Partially applies this function to a particular 'this object' and zero or
     * more arguments. The result is a new function with some arguments of the first
     * function pre-filled and the value of this 'pre-specified'.
     *
     * Remaining arguments specified at call-time are appended to the pre-specified
     * ones.
     *
     * Also see: {@link #partial}.
     *
     * Usage:
     * <pre>var barMethBound = goog.bind(myFunction, myObj, 'arg1', 'arg2');
     * barMethBound('arg3', 'arg4');</pre>
     *
     * @param {?function(this:T, ...)} fn A function to partially apply.
     * @param {T} selfObj Specifies the object which this should point to when the
     *     function is run.
     * @param {...*} var_args Additional arguments that are partially applied to the
     *     function.
     * @return {!Function} A partially-applied form of the function goog.bind() was
     *     invoked as a method of.
     * @template T
     * @suppress {deprecated} See above.
     */
    goog.bind = function (fn, selfObj, var_args) {
      // TODO(nicksantos): narrow the type signature.
      if (Function.prototype.bind &&
      // NOTE(nicksantos): Somebody pulled base.js into the default Chrome
      // extension environment. This means that for Chrome extensions, they get
      // the implementation of Function.prototype.bind that calls goog.bind
      // instead of the native one. Even worse, we don't want to introduce a
      // circular dependency between goog.bind and Function.prototype.bind, so
      // we have to hack this to make sure it works correctly.
      Function.prototype.bind.toString().indexOf('native code') != -1) {
        goog.bind = goog.bindNative_;
      } else {
        goog.bind = goog.bindJs_;
      }
      return goog.bind.apply(null, arguments);
    };

    /**
     * Like goog.bind(), except that a 'this object' is not required. Useful when
     * the target function is already bound.
     *
     * Usage:
     * var g = goog.partial(f, arg1, arg2);
     * g(arg3, arg4);
     *
     * @param {Function} fn A function to partially apply.
     * @param {...*} var_args Additional arguments that are partially applied to fn.
     * @return {!Function} A partially-applied form of the function goog.partial()
     *     was invoked as a method of.
     */
    goog.partial = function (fn, var_args) {
      var args = Array.prototype.slice.call(arguments, 1);
      return function () {
        // Clone the array (with slice()) and append additional arguments
        // to the existing arguments.
        var newArgs = args.slice();
        newArgs.push.apply(newArgs, arguments);
        return fn.apply(this, newArgs);
      };
    };

    /**
     * Copies all the members of a source object to a target object. This method
     * does not work on all browsers for all objects that contain keys such as
     * toString or hasOwnProperty. Use goog.object.extend for this purpose.
     * @param {Object} target Target.
     * @param {Object} source Source.
     */
    goog.mixin = function (target, source) {
      for (var x in source) {
        target[x] = source[x];
      }

      // For IE7 or lower, the for-in-loop does not contain any properties that are
      // not enumerable on the prototype object (for example, isPrototypeOf from
      // Object.prototype) but also it will not include 'replace' on objects that
      // extend String and change 'replace' (not that it is common for anyone to
      // extend anything except Object).
    };

    /**
     * @return {number} An integer value representing the number of milliseconds
     *     between midnight, January 1, 1970 and the current time.
     */
    goog.now = goog.TRUSTED_SITE && Date.now || function () {
      // Unary plus operator converts its operand to a number which in
      // the case of
      // a date is done by calling getTime().
      return +new Date();
    };

    /**
     * Evals JavaScript in the global scope.  In IE this uses execScript, other
     * browsers use goog.global.eval. If goog.global.eval does not evaluate in the
     * global scope (for example, in Safari), appends a script tag instead.
     * Throws an exception if neither execScript or eval is defined.
     * @param {string} script JavaScript string.
     */
    goog.globalEval = function (script) {
      if (goog.global.execScript) {
        goog.global.execScript(script, 'JavaScript');
      } else if (goog.global.eval) {
        // Test to see if eval works
        if (goog.evalWorksForGlobals_ == null) {
          goog.global.eval('var _evalTest_ = 1;');
          if (typeof goog.global['_evalTest_'] != 'undefined') {
            try {
              delete goog.global['_evalTest_'];
            } catch (ignore) {
              // Microsoft edge fails the deletion above in strict mode.
            }
            goog.evalWorksForGlobals_ = true;
          } else {
            goog.evalWorksForGlobals_ = false;
          }
        }

        if (goog.evalWorksForGlobals_) {
          goog.global.eval(script);
        } else {
          /** @type {Document} */
          var doc = goog.global.document;
          var scriptElt =
          /** @type {!HTMLScriptElement} */doc.createElement('SCRIPT');
          scriptElt.type = 'text/javascript';
          scriptElt.defer = false;
          // Note(user): can't use .innerHTML since "t('<test>')" will fail and
          // .text doesn't work in Safari 2.  Therefore we append a text node.
          scriptElt.appendChild(doc.createTextNode(script));
          doc.body.appendChild(scriptElt);
          doc.body.removeChild(scriptElt);
        }
      } else {
        throw Error('goog.globalEval not available');
      }
    };

    /**
     * Indicates whether or not we can call 'eval' directly to eval code in the
     * global scope. Set to a Boolean by the first call to goog.globalEval (which
     * empirically tests whether eval works for globals). @see goog.globalEval
     * @type {?boolean}
     * @private
     */
    goog.evalWorksForGlobals_ = null;

    /**
     * Optional map of CSS class names to obfuscated names used with
     * goog.getCssName().
     * @private {!Object<string, string>|undefined}
     * @see goog.setCssNameMapping
     */
    goog.cssNameMapping_;

    /**
     * Optional obfuscation style for CSS class names. Should be set to either
     * 'BY_WHOLE' or 'BY_PART' if defined.
     * @type {string|undefined}
     * @private
     * @see goog.setCssNameMapping
     */
    goog.cssNameMappingStyle_;

    /**
     * Handles strings that are intended to be used as CSS class names.
     *
     * This function works in tandem with @see goog.setCssNameMapping.
     *
     * Without any mapping set, the arguments are simple joined with a hyphen and
     * passed through unaltered.
     *
     * When there is a mapping, there are two possible styles in which these
     * mappings are used. In the BY_PART style, each part (i.e. in between hyphens)
     * of the passed in css name is rewritten according to the map. In the BY_WHOLE
     * style, the full css name is looked up in the map directly. If a rewrite is
     * not specified by the map, the compiler will output a warning.
     *
     * When the mapping is passed to the compiler, it will replace calls to
     * goog.getCssName with the strings from the mapping, e.g.
     *     var x = goog.getCssName('foo');
     *     var y = goog.getCssName(this.baseClass, 'active');
     *  becomes:
     *     var x = 'foo';
     *     var y = this.baseClass + '-active';
     *
     * If one argument is passed it will be processed, if two are passed only the
     * modifier will be processed, as it is assumed the first argument was generated
     * as a result of calling goog.getCssName.
     *
     * @param {string} className The class name.
     * @param {string=} opt_modifier A modifier to be appended to the class name.
     * @return {string} The class name or the concatenation of the class name and
     *     the modifier.
     */
    goog.getCssName = function (className, opt_modifier) {
      var getMapping = function getMapping(cssName) {
        return goog.cssNameMapping_[cssName] || cssName;
      };

      var renameByParts = function renameByParts(cssName) {
        // Remap all the parts individually.
        var parts = cssName.split('-');
        var mapped = [];
        for (var i = 0; i < parts.length; i++) {
          mapped.push(getMapping(parts[i]));
        }
        return mapped.join('-');
      };

      var rename;
      if (goog.cssNameMapping_) {
        rename = goog.cssNameMappingStyle_ == 'BY_WHOLE' ? getMapping : renameByParts;
      } else {
        rename = function rename(a) {
          return a;
        };
      }

      if (opt_modifier) {
        return className + '-' + rename(opt_modifier);
      } else {
        return rename(className);
      }
    };

    /**
     * Sets the map to check when returning a value from goog.getCssName(). Example:
     * <pre>
     * goog.setCssNameMapping({
     *   "goog": "a",
     *   "disabled": "b",
     * });
     *
     * var x = goog.getCssName('goog');
     * // The following evaluates to: "a a-b".
     * goog.getCssName('goog') + ' ' + goog.getCssName(x, 'disabled')
     * </pre>
     * When declared as a map of string literals to string literals, the JSCompiler
     * will replace all calls to goog.getCssName() using the supplied map if the
     * --process_closure_primitives flag is set.
     *
     * @param {!Object} mapping A map of strings to strings where keys are possible
     *     arguments to goog.getCssName() and values are the corresponding values
     *     that should be returned.
     * @param {string=} opt_style The style of css name mapping. There are two valid
     *     options: 'BY_PART', and 'BY_WHOLE'.
     * @see goog.getCssName for a description.
     */
    goog.setCssNameMapping = function (mapping, opt_style) {
      goog.cssNameMapping_ = mapping;
      goog.cssNameMappingStyle_ = opt_style;
    };

    /**
     * To use CSS renaming in compiled mode, one of the input files should have a
     * call to goog.setCssNameMapping() with an object literal that the JSCompiler
     * can extract and use to replace all calls to goog.getCssName(). In uncompiled
     * mode, JavaScript code should be loaded before this base.js file that declares
     * a global variable, CLOSURE_CSS_NAME_MAPPING, which is used below. This is
     * to ensure that the mapping is loaded before any calls to goog.getCssName()
     * are made in uncompiled mode.
     *
     * A hook for overriding the CSS name mapping.
     * @type {!Object<string, string>|undefined}
     */
    goog.global.CLOSURE_CSS_NAME_MAPPING;

    if (!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING) {
      // This does not call goog.setCssNameMapping() because the JSCompiler
      // requires that goog.setCssNameMapping() be called with an object literal.
      goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING;
    }

    /**
     * Gets a localized message.
     *
     * This function is a compiler primitive. If you give the compiler a localized
     * message bundle, it will replace the string at compile-time with a localized
     * version, and expand goog.getMsg call to a concatenated string.
     *
     * Messages must be initialized in the form:
     * <code>
     * var MSG_NAME = goog.getMsg('Hello {$placeholder}', {'placeholder': 'world'});
     * </code>
     *
     * @param {string} str Translatable string, places holders in the form {$foo}.
     * @param {Object<string, string>=} opt_values Maps place holder name to value.
     * @return {string} message with placeholders filled.
     */
    goog.getMsg = function (str, opt_values) {
      if (opt_values) {
        str = str.replace(/\{\$([^}]+)}/g, function (match, key) {
          return opt_values != null && key in opt_values ? opt_values[key] : match;
        });
      }
      return str;
    };

    /**
     * Gets a localized message. If the message does not have a translation, gives a
     * fallback message.
     *
     * This is useful when introducing a new message that has not yet been
     * translated into all languages.
     *
     * This function is a compiler primitive. Must be used in the form:
     * <code>var x = goog.getMsgWithFallback(MSG_A, MSG_B);</code>
     * where MSG_A and MSG_B were initialized with goog.getMsg.
     *
     * @param {string} a The preferred message.
     * @param {string} b The fallback message.
     * @return {string} The best translated message.
     */
    goog.getMsgWithFallback = function (a, b) {
      return a;
    };

    /**
     * Exposes an unobfuscated global namespace path for the given object.
     * Note that fields of the exported object *will* be obfuscated, unless they are
     * exported in turn via this function or goog.exportProperty.
     *
     * Also handy for making public items that are defined in anonymous closures.
     *
     * ex. goog.exportSymbol('public.path.Foo', Foo);
     *
     * ex. goog.exportSymbol('public.path.Foo.staticFunction', Foo.staticFunction);
     *     public.path.Foo.staticFunction();
     *
     * ex. goog.exportSymbol('public.path.Foo.prototype.myMethod',
     *                       Foo.prototype.myMethod);
     *     new public.path.Foo().myMethod();
     *
     * @param {string} publicPath Unobfuscated name to export.
     * @param {*} object Object the name should point to.
     * @param {Object=} opt_objectToExportTo The object to add the path to; default
     *     is goog.global.
     */
    goog.exportSymbol = function (publicPath, object, opt_objectToExportTo) {
      goog.exportPath_(publicPath, object, opt_objectToExportTo);
    };

    /**
     * Exports a property unobfuscated into the object's namespace.
     * ex. goog.exportProperty(Foo, 'staticFunction', Foo.staticFunction);
     * ex. goog.exportProperty(Foo.prototype, 'myMethod', Foo.prototype.myMethod);
     * @param {Object} object Object whose static property is being exported.
     * @param {string} publicName Unobfuscated name to export.
     * @param {*} symbol Object the name should point to.
     */
    goog.exportProperty = function (object, publicName, symbol) {
      object[publicName] = symbol;
    };

    /**
     * Inherit the prototype methods from one constructor into another.
     *
     * Usage:
     * <pre>
     * function ParentClass(a, b) { }
     * ParentClass.prototype.foo = function(a) { };
     *
     * function ChildClass(a, b, c) {
     *   ChildClass.base(this, 'constructor', a, b);
     * }
     * goog.inherits(ChildClass, ParentClass);
     *
     * var child = new ChildClass('a', 'b', 'see');
     * child.foo(); // This works.
     * </pre>
     *
     * @param {!Function} childCtor Child class.
     * @param {!Function} parentCtor Parent class.
     */
    goog.inherits = function (childCtor, parentCtor) {
      /** @constructor */
      function tempCtor() {}
      tempCtor.prototype = parentCtor.prototype;
      childCtor.superClass_ = parentCtor.prototype;
      childCtor.prototype = new tempCtor();
      /** @override */
      childCtor.prototype.constructor = childCtor;

      /**
       * Calls superclass constructor/method.
       *
       * This function is only available if you use goog.inherits to
       * express inheritance relationships between classes.
       *
       * NOTE: This is a replacement for goog.base and for superClass_
       * property defined in childCtor.
       *
       * @param {!Object} me Should always be "this".
       * @param {string} methodName The method name to call. Calling
       *     superclass constructor can be done with the special string
       *     'constructor'.
       * @param {...*} var_args The arguments to pass to superclass
       *     method/constructor.
       * @return {*} The return value of the superclass method/constructor.
       */
      childCtor.base = function (me, methodName, var_args) {
        // Copying using loop to avoid deop due to passing arguments object to
        // function. This is faster in many JS engines as of late 2014.
        var args = new Array(arguments.length - 2);
        for (var i = 2; i < arguments.length; i++) {
          args[i - 2] = arguments[i];
        }
        return parentCtor.prototype[methodName].apply(me, args);
      };
    };

    /**
     * Call up to the superclass.
     *
     * If this is called from a constructor, then this calls the superclass
     * constructor with arguments 1-N.
     *
     * If this is called from a prototype method, then you must pass the name of the
     * method as the second argument to this function. If you do not, you will get a
     * runtime error. This calls the superclass' method with arguments 2-N.
     *
     * This function only works if you use goog.inherits to express inheritance
     * relationships between your classes.
     *
     * This function is a compiler primitive. At compile-time, the compiler will do
     * macro expansion to remove a lot of the extra overhead that this function
     * introduces. The compiler will also enforce a lot of the assumptions that this
     * function makes, and treat it as a compiler error if you break them.
     *
     * @param {!Object} me Should always be "this".
     * @param {*=} opt_methodName The method name if calling a super method.
     * @param {...*} var_args The rest of the arguments.
     * @return {*} The return value of the superclass method.
     * @suppress {es5Strict} This method can not be used in strict mode, but
     *     all Closure Library consumers must depend on this file.
     */
    goog.base = function (me, opt_methodName, var_args) {
      var caller = arguments.callee.caller;

      if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !caller) {
        throw Error('arguments.caller not defined.  goog.base() cannot be used ' + 'with strict mode code. See ' + 'http://www.ecma-international.org/ecma-262/5.1/#sec-C');
      }

      if (caller.superClass_) {
        // Copying using loop to avoid deop due to passing arguments object to
        // function. This is faster in many JS engines as of late 2014.
        var ctorArgs = new Array(arguments.length - 1);
        for (var i = 1; i < arguments.length; i++) {
          ctorArgs[i - 1] = arguments[i];
        }
        // This is a constructor. Call the superclass constructor.
        return caller.superClass_.constructor.apply(me, ctorArgs);
      }

      // Copying using loop to avoid deop due to passing arguments object to
      // function. This is faster in many JS engines as of late 2014.
      var args = new Array(arguments.length - 2);
      for (var i = 2; i < arguments.length; i++) {
        args[i - 2] = arguments[i];
      }
      var foundCaller = false;
      for (var ctor = me.constructor; ctor; ctor = ctor.superClass_ && ctor.superClass_.constructor) {
        if (ctor.prototype[opt_methodName] === caller) {
          foundCaller = true;
        } else if (foundCaller) {
          return ctor.prototype[opt_methodName].apply(me, args);
        }
      }

      // If we did not find the caller in the prototype chain, then one of two
      // things happened:
      // 1) The caller is an instance method.
      // 2) This method was not called by the right caller.
      if (me[opt_methodName] === caller) {
        return me.constructor.prototype[opt_methodName].apply(me, args);
      } else {
        throw Error('goog.base called from a method of one name ' + 'to a method of a different name');
      }
    };

    /**
     * Allow for aliasing within scope functions.  This function exists for
     * uncompiled code - in compiled code the calls will be inlined and the aliases
     * applied.  In uncompiled code the function is simply run since the aliases as
     * written are valid JavaScript.
     *
     *
     * @param {function()} fn Function to call.  This function can contain aliases
     *     to namespaces (e.g. "var dom = goog.dom") or classes
     *     (e.g. "var Timer = goog.Timer").
     */
    goog.scope = function (fn) {
      fn.call(goog.global);
    };

    /*
     * To support uncompiled, strict mode bundles that use eval to divide source
     * like so:
     *    eval('someSource;//# sourceUrl sourcefile.js');
     * We need to export the globally defined symbols "goog" and "COMPILED".
     * Exporting "goog" breaks the compiler optimizations, so we required that
     * be defined externally.
     * NOTE: We don't use goog.exportSymbol here because we don't want to trigger
     * extern generation when that compiler option is enabled.
     */
    if (!COMPILED) {
      goog.global['COMPILED'] = COMPILED;
    }

    goog.provide('goog.string');

    /**
     * Does simple python-style string substitution.
     * subs("foo%s hot%s", "bar", "dog") becomes "foobar hotdog".
     * @param {string} str The string containing the pattern.
     * @param {...*} var_args The items to substitute into the pattern.
     * @return {string} A copy of {@code str} in which each occurrence of
     *     {@code %s} has been replaced an argument from {@code var_args}.
     */
    goog.string.subs = function (str, var_args) {
      var splitParts = str.split('%s');
      var returnString = '';

      var subsArguments = Array.prototype.slice.call(arguments, 1);
      while (subsArguments.length &&
      // Replace up to the last split part. We are inserting in the
      // positions between split parts.
      splitParts.length > 1) {
        returnString += splitParts.shift() + subsArguments.shift();
      }

      return returnString + splitParts.join('%s'); // Join unused '%s'
    };

    /**
     * Regular expression that matches an ampersand, for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.AMP_RE_ = /&/g;

    /**
     * Regular expression that matches a less than sign, for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.LT_RE_ = /</g;

    /**
     * Regular expression that matches a greater than sign, for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.GT_RE_ = />/g;

    /**
     * Regular expression that matches a double quote, for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.QUOT_RE_ = /"/g;

    /**
     * Regular expression that matches a single quote, for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.SINGLE_QUOTE_RE_ = /'/g;

    /**
     * Regular expression that matches null character, for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.NULL_RE_ = /\x00/g;

    /**
     * Regular expression that matches a lowercase letter "e", for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.E_RE_ = /e/g;

    /**
     * Regular expression that matches any character that needs to be escaped.
     * @const {!RegExp}
     * @private
     */
    goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;

    /**
     * Unescapes an HTML string.
     *
     * @param {string} str The string to unescape.
     * @return {string} An unescaped copy of {@code str}.
     */
    goog.string.unescapeEntities = function (str) {
      if (goog.string.contains(str, '&')) {
        // We are careful not to use a DOM if we do not have one or we explicitly
        // requested non-DOM html unescaping.
        if (!goog.string.FORCE_NON_DOM_HTML_UNESCAPING && 'document' in goog.global) {
          return goog.string.unescapeEntitiesUsingDom_(str);
        } else {
          // Fall back on pure XML entities
          return goog.string.unescapePureXmlEntities_(str);
        }
      }
      return str;
    };

    /**
     * Unescapes an HTML string using a DOM to resolve non-XML, non-numeric
     * entities. This function is XSS-safe and whitespace-preserving.
     * @private
     * @param {string} str The string to unescape.
     * @param {Document=} opt_document An optional document to use for creating
     *     elements. If this is not specified then the default window.document
     *     will be used.
     * @return {string} The unescaped {@code str} string.
     */
    goog.string.unescapeEntitiesUsingDom_ = function (str, opt_document) {
      /** @type {!Object<string, string>} */
      var seen = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"' };
      var div;
      if (opt_document) {
        div = opt_document.createElement('div');
      } else {
        div = goog.global.document.createElement('div');
      }
      // Match as many valid entity characters as possible. If the actual entity
      // happens to be shorter, it will still work as innerHTML will return the
      // trailing characters unchanged. Since the entity characters do not include
      // open angle bracket, there is no chance of XSS from the innerHTML use.
      // Since no whitespace is passed to innerHTML, whitespace is preserved.
      return str.replace(goog.string.HTML_ENTITY_PATTERN_, function (s, entity) {
        // Check for cached entity.
        var value = seen[s];
        if (value) {
          return value;
        }
        // Check for numeric entity.
        if (entity.charAt(0) == '#') {
          // Prefix with 0 so that hex entities (e.g. &#x10) parse as hex numbers.
          var n = Number('0' + entity.substr(1));
          if (!isNaN(n)) {
            value = String.fromCharCode(n);
          }
        }
        // Fall back to innerHTML otherwise.
        if (!value) {
          // Append a non-entity character to avoid a bug in Webkit that parses
          // an invalid entity at the end of innerHTML text as the empty string.
          div.innerHTML = s + ' ';
          // Then remove the trailing character from the result.
          value = div.firstChild.nodeValue.slice(0, -1);
        }
        // Cache and return.
        return seen[s] = value;
      });
    };

    /**
     * Unescapes XML entities.
     * @private
     * @param {string} str The string to unescape.
     * @return {string} An unescaped copy of {@code str}.
     */
    goog.string.unescapePureXmlEntities_ = function (str) {
      return str.replace(/&([^;]+);/g, function (s, entity) {
        switch (entity) {
          case 'amp':
            return '&';
          case 'lt':
            return '<';
          case 'gt':
            return '>';
          case 'quot':
            return '"';
          default:
            if (entity.charAt(0) == '#') {
              // Prefix with 0 so that hex entities (e.g. &#x10) parse as hex.
              var n = Number('0' + entity.substr(1));
              if (!isNaN(n)) {
                return String.fromCharCode(n);
              }
            }
            // For invalid entities we just return the entity
            return s;
        }
      });
    };

    /**
     * Regular expression that matches an HTML entity.
     * See also HTML5: Tokenization / Tokenizing character references.
     * @private
     * @type {!RegExp}
     */
    goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;

    /**
     * Determines whether a string contains a substring.
     * @param {string} str The string to search.
     * @param {string} subString The substring to search for.
     * @return {boolean} Whether {@code str} contains {@code subString}.
     */
    goog.string.contains = function (str, subString) {
      return str.indexOf(subString) != -1;
    };

    /**
     * Escapes double quote '"' and single quote '\'' characters in addition to
     * '&', '<', and '>' so that a string can be included in an HTML tag attribute
     * value within double or single quotes.
     *
     * It should be noted that > doesn't need to be escaped for the HTML or XML to
     * be valid, but it has been decided to escape it for consistency with other
     * implementations.
     *
     * With goog.string.DETECT_DOUBLE_ESCAPING, this function escapes also the
     * lowercase letter "e".
     *
     * NOTE(user):
     * HtmlEscape is often called during the generation of large blocks of HTML.
     * Using statics for the regular expressions and strings is an optimization
     * that can more than half the amount of time IE spends in this function for
     * large apps, since strings and regexes both contribute to GC allocations.
     *
     * Testing for the presence of a character before escaping increases the number
     * of function calls, but actually provides a speed increase for the average
     * case -- since the average case often doesn't require the escaping of all 4
     * characters and indexOf() is much cheaper than replace().
     * The worst case does suffer slightly from the additional calls, therefore the
     * opt_isLikelyToContainHtmlChars option has been included for situations
     * where all 4 HTML entities are very likely to be present and need escaping.
     *
     * Some benchmarks (times tended to fluctuate +-0.05ms):
     *                                     FireFox                     IE6
     * (no chars / average (mix of cases) / all 4 chars)
     * no checks                     0.13 / 0.22 / 0.22         0.23 / 0.53 / 0.80
     * indexOf                       0.08 / 0.17 / 0.26         0.22 / 0.54 / 0.84
     * indexOf + re test             0.07 / 0.17 / 0.28         0.19 / 0.50 / 0.85
     *
     * An additional advantage of checking if replace actually needs to be called
     * is a reduction in the number of object allocations, so as the size of the
     * application grows the difference between the various methods would increase.
     *
     * @param {string} str string to be escaped.
     * @param {boolean=} opt_isLikelyToContainHtmlChars Don't perform a check to see
     *     if the character needs replacing - use this option if you expect each of
     *     the characters to appear often. Leave false if you expect few html
     *     characters to occur in your strings, such as if you are escaping HTML.
     * @return {string} An escaped copy of {@code str}.
     */
    goog.string.htmlEscape = function (str, opt_isLikelyToContainHtmlChars) {

      if (opt_isLikelyToContainHtmlChars) {
        str = str.replace(goog.string.AMP_RE_, '&amp;').replace(goog.string.LT_RE_, '&lt;').replace(goog.string.GT_RE_, '&gt;').replace(goog.string.QUOT_RE_, '&quot;').replace(goog.string.SINGLE_QUOTE_RE_, '&#39;').replace(goog.string.NULL_RE_, '&#0;');
        if (goog.string.DETECT_DOUBLE_ESCAPING) {
          str = str.replace(goog.string.E_RE_, '&#101;');
        }
        return str;
      } else {
        // quick test helps in the case when there are no chars to replace, in
        // worst case this makes barely a difference to the time taken
        if (!goog.string.ALL_RE_.test(str)) return str;

        // str.indexOf is faster than regex.test in this case
        if (str.indexOf('&') != -1) {
          str = str.replace(goog.string.AMP_RE_, '&amp;');
        }
        if (str.indexOf('<') != -1) {
          str = str.replace(goog.string.LT_RE_, '&lt;');
        }
        if (str.indexOf('>') != -1) {
          str = str.replace(goog.string.GT_RE_, '&gt;');
        }
        if (str.indexOf('"') != -1) {
          str = str.replace(goog.string.QUOT_RE_, '&quot;');
        }
        if (str.indexOf('\'') != -1) {
          str = str.replace(goog.string.SINGLE_QUOTE_RE_, '&#39;');
        }
        if (str.indexOf('\x00') != -1) {
          str = str.replace(goog.string.NULL_RE_, '&#0;');
        }
        if (goog.string.DETECT_DOUBLE_ESCAPING && str.indexOf('e') != -1) {
          str = str.replace(goog.string.E_RE_, '&#101;');
        }
        return str;
      }
    };

    goog.debug = {};

    /**
     * Returns the type of a value. If a constructor is passed, and a suitable
     * string cannot be found, 'unknown type name' will be returned.
     *
     * <p>Forked rather than moved from {@link goog.asserts.getType_}
     * to avoid adding a dependency to goog.asserts.
     * @param {*} value A constructor, object, or primitive.
     * @return {string} The best display name for the value, or 'unknown type name'.
     */
    goog.debug.runtimeType = function (value) {
      if (value instanceof Function) {
        return value.displayName || value.name || 'unknown type name';
      } else if (value instanceof Object) {
        return value.constructor.displayName || value.constructor.name || Object.prototype.toString.call(value);
      } else {
        return value === null ? 'null' : typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);
      }
    };

    // Copyright 2009 The Closure Library Authors. All Rights Reserved.
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    //      http://www.apache.org/licenses/LICENSE-2.0
    //
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS-IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.

    /**
     * @fileoverview Provides a base class for custom Error objects such that the
     * stack is correctly maintained.
     *
     * You should never need to throw goog.debug.Error(msg) directly, Error(msg) is
     * sufficient.
     *
     */

    /**
     * Base class for custom error objects.
     * @param {*=} opt_msg The message associated with the error.
     * @constructor
     * @extends {Error}
     */
    goog.debug.Error = function (opt_msg) {

      // Attempt to ensure there is a stack trace.
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, goog.debug.Error);
      } else {
        var stack = new Error().stack;
        if (stack) {
          this.stack = stack;
        }
      }

      if (opt_msg) {
        this.message = String(opt_msg);
      }

      /**
       * Whether to report this error to the server. Setting this to false will
       * cause the error reporter to not report the error back to the server,
       * which can be useful if the client knows that the error has already been
       * logged on the server.
       * @type {boolean}
       */
      this.reportErrorToServer = true;
    };
    goog.inherits(goog.debug.Error, Error);

    /** @override */
    goog.debug.Error.prototype.name = 'CustomError';

    /**
     * @fileoverview Definition of goog.dom.NodeType.
     */

    goog.dom = {};

    /**
     * Constants for the nodeType attribute in the Node interface.
     *
     * These constants match those specified in the Node interface. These are
     * usually present on the Node object in recent browsers, but not in older
     * browsers (specifically, early IEs) and thus are given here.
     *
     * In some browsers (early IEs), these are not defined on the Node object,
     * so they are provided here.
     *
     * See http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-1950641247
     * @enum {number}
     */
    goog.dom.NodeType = {
      ELEMENT: 1,
      ATTRIBUTE: 2,
      TEXT: 3,
      CDATA_SECTION: 4,
      ENTITY_REFERENCE: 5,
      ENTITY: 6,
      PROCESSING_INSTRUCTION: 7,
      COMMENT: 8,
      DOCUMENT: 9,
      DOCUMENT_TYPE: 10,
      DOCUMENT_FRAGMENT: 11,
      NOTATION: 12
    };

    // Copyright 2007 The Closure Library Authors. All Rights Reserved.
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    //      http://www.apache.org/licenses/LICENSE-2.0
    //
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS-IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.

    /**
     * @fileoverview Utility functions for supporting Bidi issues.
     */

    /**
     * Namespace for bidi supporting functions.
     */
    goog.provide('goog.i18n.bidi');
    goog.provide('goog.i18n.bidi.Dir');
    goog.provide('goog.i18n.bidi.DirectionalString');
    goog.provide('goog.i18n.bidi.Format');

    /**
     * @define {boolean} FORCE_RTL forces the {@link goog.i18n.bidi.IS_RTL} constant
     * to say that the current locale is a RTL locale.  This should only be used
     * if you want to override the default behavior for deciding whether the
     * current locale is RTL or not.
     *
     * {@see goog.i18n.bidi.IS_RTL}
     */
    goog.define('goog.i18n.bidi.FORCE_RTL', false);

    /**
     * Constant that defines whether or not the current locale is a RTL locale.
     * If {@link goog.i18n.bidi.FORCE_RTL} is not true, this constant will default
     * to check that {@link goog.LOCALE} is one of a few major RTL locales.
     *
     * <p>This is designed to be a maximally efficient compile-time constant. For
     * example, for the default goog.LOCALE, compiling
     * "if (goog.i18n.bidi.IS_RTL) alert('rtl') else {}" should produce no code. It
     * is this design consideration that limits the implementation to only
     * supporting a few major RTL locales, as opposed to the broader repertoire of
     * something like goog.i18n.bidi.isRtlLanguage.
     *
     * <p>Since this constant refers to the directionality of the locale, it is up
     * to the caller to determine if this constant should also be used for the
     * direction of the UI.
     *
     * {@see goog.LOCALE}
     *
     * @type {boolean}
     *
     * TODO(user): write a test that checks that this is a compile-time constant.
     */
    goog.i18n.bidi.IS_RTL = goog.i18n.bidi.FORCE_RTL || (goog.LOCALE.substring(0, 2).toLowerCase() == 'ar' || goog.LOCALE.substring(0, 2).toLowerCase() == 'fa' || goog.LOCALE.substring(0, 2).toLowerCase() == 'he' || goog.LOCALE.substring(0, 2).toLowerCase() == 'iw' || goog.LOCALE.substring(0, 2).toLowerCase() == 'ps' || goog.LOCALE.substring(0, 2).toLowerCase() == 'sd' || goog.LOCALE.substring(0, 2).toLowerCase() == 'ug' || goog.LOCALE.substring(0, 2).toLowerCase() == 'ur' || goog.LOCALE.substring(0, 2).toLowerCase() == 'yi') && (goog.LOCALE.length == 2 || goog.LOCALE.substring(2, 3) == '-' || goog.LOCALE.substring(2, 3) == '_') || goog.LOCALE.length >= 3 && goog.LOCALE.substring(0, 3).toLowerCase() == 'ckb' && (goog.LOCALE.length == 3 || goog.LOCALE.substring(3, 4) == '-' || goog.LOCALE.substring(3, 4) == '_');

    /**
     * Unicode formatting characters and directionality string constants.
     * @enum {string}
     */
    goog.i18n.bidi.Format = {
      /** Unicode "Left-To-Right Embedding" (LRE) character. */
      LRE: '\u202A',
      /** Unicode "Right-To-Left Embedding" (RLE) character. */
      RLE: '\u202B',
      /** Unicode "Pop Directional Formatting" (PDF) character. */
      PDF: '\u202C',
      /** Unicode "Left-To-Right Mark" (LRM) character. */
      LRM: '\u200E',
      /** Unicode "Right-To-Left Mark" (RLM) character. */
      RLM: '\u200F'
    };

    /**
     * Directionality enum.
     * @enum {number}
     */
    goog.i18n.bidi.Dir = {
      /**
       * Left-to-right.
       */
      LTR: 1,

      /**
       * Right-to-left.
       */
      RTL: -1,

      /**
       * Neither left-to-right nor right-to-left.
       */
      NEUTRAL: 0
    };

    /**
     * 'right' string constant.
     * @type {string}
     */
    goog.i18n.bidi.RIGHT = 'right';

    /**
     * 'left' string constant.
     * @type {string}
     */
    goog.i18n.bidi.LEFT = 'left';

    /**
     * 'left' if locale is RTL, 'right' if not.
     * @type {string}
     */
    goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT;

    /**
     * 'right' if locale is RTL, 'left' if not.
     * @type {string}
     */
    goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT;

    /**
     * Convert a directionality given in various formats to a goog.i18n.bidi.Dir
     * constant. Useful for interaction with different standards of directionality
     * representation.
     *
     * @param {goog.i18n.bidi.Dir|number|boolean|null} givenDir Directionality given
     *     in one of the following formats:
     *     1. A goog.i18n.bidi.Dir constant.
     *     2. A number (positive = LTR, negative = RTL, 0 = neutral).
     *     3. A boolean (true = RTL, false = LTR).
     *     4. A null for unknown directionality.
     * @param {boolean=} opt_noNeutral Whether a givenDir of zero or
     *     goog.i18n.bidi.Dir.NEUTRAL should be treated as null, i.e. unknown, in
     *     order to preserve legacy behavior.
     * @return {?goog.i18n.bidi.Dir} A goog.i18n.bidi.Dir constant matching the
     *     given directionality. If given null, returns null (i.e. unknown).
     */
    goog.i18n.bidi.toDir = function (givenDir, opt_noNeutral) {
      if (typeof givenDir == 'number') {
        // This includes the non-null goog.i18n.bidi.Dir case.
        return givenDir > 0 ? goog.i18n.bidi.Dir.LTR : givenDir < 0 ? goog.i18n.bidi.Dir.RTL : opt_noNeutral ? null : goog.i18n.bidi.Dir.NEUTRAL;
      } else if (givenDir == null) {
        return null;
      } else {
        // Must be typeof givenDir == 'boolean'.
        return givenDir ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
      }
    };

    /**
     * A practical pattern to identify strong LTR characters. This pattern is not
     * theoretically correct according to the Unicode standard. It is simplified for
     * performance and small code size.
     * @type {string}
     * @private
     */
    goog.i18n.bidi.ltrChars_ = 'A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u0300-\u0590\u0800-\u1FFF' + '\u200E\u2C00-\uFB1C\uFE00-\uFE6F\uFEFD-\uFFFF';

    /**
     * A practical pattern to identify strong RTL character. This pattern is not
     * theoretically correct according to the Unicode standard. It is simplified
     * for performance and small code size.
     * @type {string}
     * @private
     */
    goog.i18n.bidi.rtlChars_ = '\u0591-\u06EF\u06FA-\u07FF\u200F\uFB1D-\uFDFF\uFE70-\uFEFC';

    /**
     * Simplified regular expression for an HTML tag (opening or closing) or an HTML
     * escape. We might want to skip over such expressions when estimating the text
     * directionality.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g;

    /**
     * Returns the input text with spaces instead of HTML tags or HTML escapes, if
     * opt_isStripNeeded is true. Else returns the input as is.
     * Useful for text directionality estimation.
     * Note: the function should not be used in other contexts; it is not 100%
     * correct, but rather a good-enough implementation for directionality
     * estimation purposes.
     * @param {string} str The given string.
     * @param {boolean=} opt_isStripNeeded Whether to perform the stripping.
     *     Default: false (to retain consistency with calling functions).
     * @return {string} The given string cleaned of HTML tags / escapes.
     * @private
     */
    goog.i18n.bidi.stripHtmlIfNeeded_ = function (str, opt_isStripNeeded) {
      return opt_isStripNeeded ? str.replace(goog.i18n.bidi.htmlSkipReg_, '') : str;
    };

    /**
     * Regular expression to check for RTL characters.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.rtlCharReg_ = new RegExp('[' + goog.i18n.bidi.rtlChars_ + ']');

    /**
     * Regular expression to check for LTR characters.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.ltrCharReg_ = new RegExp('[' + goog.i18n.bidi.ltrChars_ + ']');

    /**
     * Test whether the given string has any RTL characters in it.
     * @param {string} str The given string that need to be tested.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether the string contains RTL characters.
     */
    goog.i18n.bidi.hasAnyRtl = function (str, opt_isHtml) {
      return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml));
    };

    /**
     * Test whether the given string has any RTL characters in it.
     * @param {string} str The given string that need to be tested.
     * @return {boolean} Whether the string contains RTL characters.
     * @deprecated Use hasAnyRtl.
     */
    goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl;

    /**
     * Test whether the given string has any LTR characters in it.
     * @param {string} str The given string that need to be tested.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether the string contains LTR characters.
     */
    goog.i18n.bidi.hasAnyLtr = function (str, opt_isHtml) {
      return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml));
    };

    /**
     * Regular expression pattern to check if the first character in the string
     * is LTR.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.ltrRe_ = new RegExp('^[' + goog.i18n.bidi.ltrChars_ + ']');

    /**
     * Regular expression pattern to check if the first character in the string
     * is RTL.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.rtlRe_ = new RegExp('^[' + goog.i18n.bidi.rtlChars_ + ']');

    /**
     * Check if the first character in the string is RTL or not.
     * @param {string} str The given string that need to be tested.
     * @return {boolean} Whether the first character in str is an RTL char.
     */
    goog.i18n.bidi.isRtlChar = function (str) {
      return goog.i18n.bidi.rtlRe_.test(str);
    };

    /**
     * Check if the first character in the string is LTR or not.
     * @param {string} str The given string that need to be tested.
     * @return {boolean} Whether the first character in str is an LTR char.
     */
    goog.i18n.bidi.isLtrChar = function (str) {
      return goog.i18n.bidi.ltrRe_.test(str);
    };

    /**
     * Check if the first character in the string is neutral or not.
     * @param {string} str The given string that need to be tested.
     * @return {boolean} Whether the first character in str is a neutral char.
     */
    goog.i18n.bidi.isNeutralChar = function (str) {
      return !goog.i18n.bidi.isLtrChar(str) && !goog.i18n.bidi.isRtlChar(str);
    };

    /**
     * Regular expressions to check if a piece of text is of LTR directionality
     * on first character with strong directionality.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.ltrDirCheckRe_ = new RegExp('^[^' + goog.i18n.bidi.rtlChars_ + ']*[' + goog.i18n.bidi.ltrChars_ + ']');

    /**
     * Regular expressions to check if a piece of text is of RTL directionality
     * on first character with strong directionality.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.rtlDirCheckRe_ = new RegExp('^[^' + goog.i18n.bidi.ltrChars_ + ']*[' + goog.i18n.bidi.rtlChars_ + ']');

    /**
     * Check whether the first strongly directional character (if any) is RTL.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether RTL directionality is detected using the first
     *     strongly-directional character method.
     */
    goog.i18n.bidi.startsWithRtl = function (str, opt_isHtml) {
      return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml));
    };

    /**
     * Check whether the first strongly directional character (if any) is RTL.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether RTL directionality is detected using the first
     *     strongly-directional character method.
     * @deprecated Use startsWithRtl.
     */
    goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl;

    /**
     * Check whether the first strongly directional character (if any) is LTR.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether LTR directionality is detected using the first
     *     strongly-directional character method.
     */
    goog.i18n.bidi.startsWithLtr = function (str, opt_isHtml) {
      return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml));
    };

    /**
     * Check whether the first strongly directional character (if any) is LTR.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether LTR directionality is detected using the first
     *     strongly-directional character method.
     * @deprecated Use startsWithLtr.
     */
    goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr;

    /**
     * Regular expression to check if a string looks like something that must
     * always be LTR even in RTL text, e.g. a URL. When estimating the
     * directionality of text containing these, we treat these as weakly LTR,
     * like numbers.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/;

    /**
     * Check whether the input string either contains no strongly directional
     * characters or looks like a url.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether neutral directionality is detected.
     */
    goog.i18n.bidi.isNeutralText = function (str, opt_isHtml) {
      str = goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml);
      return goog.i18n.bidi.isRequiredLtrRe_.test(str) || !goog.i18n.bidi.hasAnyLtr(str) && !goog.i18n.bidi.hasAnyRtl(str);
    };

    /**
     * Regular expressions to check if the last strongly-directional character in a
     * piece of text is LTR.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp('[' + goog.i18n.bidi.ltrChars_ + '][^' + goog.i18n.bidi.rtlChars_ + ']*$');

    /**
     * Regular expressions to check if the last strongly-directional character in a
     * piece of text is RTL.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp('[' + goog.i18n.bidi.rtlChars_ + '][^' + goog.i18n.bidi.ltrChars_ + ']*$');

    /**
     * Check if the exit directionality a piece of text is LTR, i.e. if the last
     * strongly-directional character in the string is LTR.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether LTR exit directionality was detected.
     */
    goog.i18n.bidi.endsWithLtr = function (str, opt_isHtml) {
      return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml));
    };

    /**
     * Check if the exit directionality a piece of text is LTR, i.e. if the last
     * strongly-directional character in the string is LTR.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether LTR exit directionality was detected.
     * @deprecated Use endsWithLtr.
     */
    goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr;

    /**
     * Check if the exit directionality a piece of text is RTL, i.e. if the last
     * strongly-directional character in the string is RTL.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether RTL exit directionality was detected.
     */
    goog.i18n.bidi.endsWithRtl = function (str, opt_isHtml) {
      return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml));
    };

    /**
     * Check if the exit directionality a piece of text is RTL, i.e. if the last
     * strongly-directional character in the string is RTL.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether RTL exit directionality was detected.
     * @deprecated Use endsWithRtl.
     */
    goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl;

    /**
     * A regular expression for matching right-to-left language codes.
     * See {@link #isRtlLanguage} for the design.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.rtlLocalesRe_ = new RegExp('^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|' + '.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))' + '(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)', 'i');

    /**
     * Check if a BCP 47 / III language code indicates an RTL language, i.e. either:
     * - a language code explicitly specifying one of the right-to-left scripts,
     *   e.g. "az-Arab", or<p>
     * - a language code specifying one of the languages normally written in a
     *   right-to-left script, e.g. "fa" (Farsi), except ones explicitly specifying
     *   Latin or Cyrillic script (which are the usual LTR alternatives).<p>
     * The list of right-to-left scripts appears in the 100-199 range in
     * http://www.unicode.org/iso15924/iso15924-num.html, of which Arabic and
     * Hebrew are by far the most widely used. We also recognize Thaana, N'Ko, and
     * Tifinagh, which also have significant modern usage. The rest (Syriac,
     * Samaritan, Mandaic, etc.) seem to have extremely limited or no modern usage
     * and are not recognized to save on code size.
     * The languages usually written in a right-to-left script are taken as those
     * with Suppress-Script: Hebr|Arab|Thaa|Nkoo|Tfng  in
     * http://www.iana.org/assignments/language-subtag-registry,
     * as well as Central (or Sorani) Kurdish (ckb), Sindhi (sd) and Uyghur (ug).
     * Other subtags of the language code, e.g. regions like EG (Egypt), are
     * ignored.
     * @param {string} lang BCP 47 (a.k.a III) language code.
     * @return {boolean} Whether the language code is an RTL language.
     */
    goog.i18n.bidi.isRtlLanguage = function (lang) {
      return goog.i18n.bidi.rtlLocalesRe_.test(lang);
    };

    /**
     * Regular expression for bracket guard replacement in text.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.bracketGuardTextRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;

    /**
     * Apply bracket guard using LRM and RLM. This is to address the problem of
     * messy bracket display frequently happens in RTL layout.
     * This function works for plain text, not for HTML. In HTML, the opening
     * bracket might be in a different context than the closing bracket (such as
     * an attribute value).
     * @param {string} s The string that need to be processed.
     * @param {boolean=} opt_isRtlContext specifies default direction (usually
     *     direction of the UI).
     * @return {string} The processed string, with all bracket guarded.
     */
    goog.i18n.bidi.guardBracketInText = function (s, opt_isRtlContext) {
      var useRtl = opt_isRtlContext === undefined ? goog.i18n.bidi.hasAnyRtl(s) : opt_isRtlContext;
      var mark = useRtl ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
      return s.replace(goog.i18n.bidi.bracketGuardTextRe_, mark + '$&' + mark);
    };

    /**
     * Enforce the html snippet in RTL directionality regardless overall context.
     * If the html piece was enclosed by tag, dir will be applied to existing
     * tag, otherwise a span tag will be added as wrapper. For this reason, if
     * html snippet start with with tag, this tag must enclose the whole piece. If
     * the tag already has a dir specified, this new one will override existing
     * one in behavior (tested on FF and IE).
     * @param {string} html The string that need to be processed.
     * @return {string} The processed string, with directionality enforced to RTL.
     */
    goog.i18n.bidi.enforceRtlInHtml = function (html) {
      if (html.charAt(0) == '<') {
        return html.replace(/<\w+/, '$& dir=rtl');
      }
      // '\n' is important for FF so that it won't incorrectly merge span groups
      return '\n<span dir=rtl>' + html + '</span>';
    };

    /**
     * Enforce RTL on both end of the given text piece using unicode BiDi formatting
     * characters RLE and PDF.
     * @param {string} text The piece of text that need to be wrapped.
     * @return {string} The wrapped string after process.
     */
    goog.i18n.bidi.enforceRtlInText = function (text) {
      return goog.i18n.bidi.Format.RLE + text + goog.i18n.bidi.Format.PDF;
    };

    /**
     * Enforce the html snippet in RTL directionality regardless overall context.
     * If the html piece was enclosed by tag, dir will be applied to existing
     * tag, otherwise a span tag will be added as wrapper. For this reason, if
     * html snippet start with with tag, this tag must enclose the whole piece. If
     * the tag already has a dir specified, this new one will override existing
     * one in behavior (tested on FF and IE).
     * @param {string} html The string that need to be processed.
     * @return {string} The processed string, with directionality enforced to RTL.
     */
    goog.i18n.bidi.enforceLtrInHtml = function (html) {
      if (html.charAt(0) == '<') {
        return html.replace(/<\w+/, '$& dir=ltr');
      }
      // '\n' is important for FF so that it won't incorrectly merge span groups
      return '\n<span dir=ltr>' + html + '</span>';
    };

    /**
     * Enforce LTR on both end of the given text piece using unicode BiDi formatting
     * characters LRE and PDF.
     * @param {string} text The piece of text that need to be wrapped.
     * @return {string} The wrapped string after process.
     */
    goog.i18n.bidi.enforceLtrInText = function (text) {
      return goog.i18n.bidi.Format.LRE + text + goog.i18n.bidi.Format.PDF;
    };

    /**
     * Regular expression to find dimensions such as "padding: .3 0.4ex 5px 6;"
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;

    /**
     * Regular expression for left.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.leftRe_ = /left/gi;

    /**
     * Regular expression for right.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.rightRe_ = /right/gi;

    /**
     * Placeholder regular expression for swapping.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.tempRe_ = /%%%%/g;

    /**
     * Swap location parameters and 'left'/'right' in CSS specification. The
     * processed string will be suited for RTL layout. Though this function can
     * cover most cases, there are always exceptions. It is suggested to put
     * those exceptions in separate group of CSS string.
     * @param {string} cssStr CSS spefication string.
     * @return {string} Processed CSS specification string.
     */
    goog.i18n.bidi.mirrorCSS = function (cssStr) {
      return cssStr.
      // reverse dimensions
      replace(goog.i18n.bidi.dimensionsRe_, ':$1 $4 $3 $2').replace(goog.i18n.bidi.leftRe_, '%%%%'). // swap left and right
      replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT);
    };

    /**
     * Regular expression for hebrew double quote substitution, finding quote
     * directly after hebrew characters.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g;

    /**
     * Regular expression for hebrew single quote substitution, finding quote
     * directly after hebrew characters.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g;

    /**
     * Replace the double and single quote directly after a Hebrew character with
     * GERESH and GERSHAYIM. In such case, most likely that's user intention.
     * @param {string} str String that need to be processed.
     * @return {string} Processed string with double/single quote replaced.
     */
    goog.i18n.bidi.normalizeHebrewQuote = function (str) {
      return str.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, '$1\u05F4').replace(goog.i18n.bidi.singleQuoteSubstituteRe_, '$1\u05F3');
    };

    /**
     * Regular expression to split a string into "words" for directionality
     * estimation based on relative word counts.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.wordSeparatorRe_ = /\s+/;

    /**
     * Regular expression to check if a string contains any numerals. Used to
     * differentiate between completely neutral strings and those containing
     * numbers, which are weakly LTR.
     *
     * Native Arabic digits (\u0660 - \u0669) are not included because although they
     * do flow left-to-right inside a number, this is the case even if the  overall
     * directionality is RTL, and a mathematical expression using these digits is
     * supposed to flow right-to-left overall, including unary plus and minus
     * appearing to the right of a number, and this does depend on the overall
     * directionality being RTL. The digits used in Farsi (\u06F0 - \u06F9), on the
     * other hand, are included, since Farsi math (including unary plus and minus)
     * does flow left-to-right.
     *
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.hasNumeralsRe_ = /[\d\u06f0-\u06f9]/;

    /**
     * This constant controls threshold of RTL directionality.
     * @type {number}
     * @private
     */
    goog.i18n.bidi.rtlDetectionThreshold_ = 0.40;

    /**
     * Estimates the directionality of a string based on relative word counts.
     * If the number of RTL words is above a certain percentage of the total number
     * of strongly directional words, returns RTL.
     * Otherwise, if any words are strongly or weakly LTR, returns LTR.
     * Otherwise, returns UNKNOWN, which is used to mean "neutral".
     * Numbers are counted as weakly LTR.
     * @param {string} str The string to be checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {goog.i18n.bidi.Dir} Estimated overall directionality of {@code str}.
     */
    goog.i18n.bidi.estimateDirection = function (str, opt_isHtml) {
      var rtlCount = 0;
      var totalCount = 0;
      var hasWeaklyLtr = false;
      var tokens = goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml).split(goog.i18n.bidi.wordSeparatorRe_);
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        if (goog.i18n.bidi.startsWithRtl(token)) {
          rtlCount++;
          totalCount++;
        } else if (goog.i18n.bidi.isRequiredLtrRe_.test(token)) {
          hasWeaklyLtr = true;
        } else if (goog.i18n.bidi.hasAnyLtr(token)) {
          totalCount++;
        } else if (goog.i18n.bidi.hasNumeralsRe_.test(token)) {
          hasWeaklyLtr = true;
        }
      }

      return totalCount == 0 ? hasWeaklyLtr ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.NEUTRAL : rtlCount / totalCount > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
    };

    /**
     * Check the directionality of a piece of text, return true if the piece of
     * text should be laid out in RTL direction.
     * @param {string} str The piece of text that need to be detected.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether this piece of text should be laid out in RTL.
     */
    goog.i18n.bidi.detectRtlDirectionality = function (str, opt_isHtml) {
      return goog.i18n.bidi.estimateDirection(str, opt_isHtml) == goog.i18n.bidi.Dir.RTL;
    };

    /**
     * Sets text input element's directionality and text alignment based on a
     * given directionality. Does nothing if the given directionality is unknown or
     * neutral.
     * @param {Element} element Input field element to set directionality to.
     * @param {goog.i18n.bidi.Dir|number|boolean|null} dir Desired directionality,
     *     given in one of the following formats:
     *     1. A goog.i18n.bidi.Dir constant.
     *     2. A number (positive = LRT, negative = RTL, 0 = neutral).
     *     3. A boolean (true = RTL, false = LTR).
     *     4. A null for unknown directionality.
     */
    goog.i18n.bidi.setElementDirAndAlign = function (element, dir) {
      if (element) {
        dir = goog.i18n.bidi.toDir(dir);
        if (dir) {
          element.style.textAlign = dir == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT;
          element.dir = dir == goog.i18n.bidi.Dir.RTL ? 'rtl' : 'ltr';
        }
      }
    };

    /**
     * Sets element dir based on estimated directionality of the given text.
     * @param {!Element} element
     * @param {string} text
     */
    goog.i18n.bidi.setElementDirByTextDirectionality = function (element, text) {
      switch (goog.i18n.bidi.estimateDirection(text)) {
        case goog.i18n.bidi.Dir.LTR:
          element.dir = 'ltr';
          break;
        case goog.i18n.bidi.Dir.RTL:
          element.dir = 'rtl';
          break;
        default:
          // Default for no direction, inherit from document.
          element.removeAttribute('dir');
      }
    };

    /**
     * Strings that have an (optional) known direction.
     *
     * Implementations of this interface are string-like objects that carry an
     * attached direction, if known.
     * @interface
     */
    goog.i18n.bidi.DirectionalString = function () {};

    /**
     * Interface marker of the DirectionalString interface.
     *
     * This property can be used to determine at runtime whether or not an object
     * implements this interface.  All implementations of this interface set this
     * property to {@code true}.
     * @type {boolean}
     */
    goog.i18n.bidi.DirectionalString.prototype.implementsGoogI18nBidiDirectionalString;

    /**
     * Retrieves this object's known direction (if any).
     * @return {?goog.i18n.bidi.Dir} The known direction. Null if unknown.
     */
    goog.i18n.bidi.DirectionalString.prototype.getDirection;

    /* jshint ignore:start */

    // Copyright 2008 The Closure Library Authors. All Rights Reserved.
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    //      http://www.apache.org/licenses/LICENSE-2.0
    //
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS-IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.

    /**
     * @fileoverview Utilities to check the preconditions, postconditions and
     * invariants runtime.
     *
     * Methods in this package should be given special treatment by the compiler
     * for type-inference. For example, <code>goog.asserts.assert(foo)</code>
     * will restrict <code>foo</code> to a truthy value.
     *
     * The compiler has an option to disable asserts. So code like:
     * <code>
     * var x = goog.asserts.assert(foo()); goog.asserts.assert(bar());
     * </code>
     * will be transformed into:
     * <code>
     * var x = foo();
     * </code>
     * The compiler will leave in foo() (because its return value is used),
     * but it will remove bar() because it assumes it does not have side-effects.
     *
     * @author agrieve@google.com (Andrew Grieve)
     */

    goog.provide('goog.asserts');

    /**
     * @define {boolean} Whether to strip out asserts or to leave them in.
     */
    goog.define('goog.asserts.ENABLE_ASSERTS', goog.DEBUG);

    /**
     * Error object for failed assertions.
     * @param {string} messagePattern The pattern that was used to form message.
     * @param {!Array<*>} messageArgs The items to substitute into the pattern.
     * @constructor
     * @extends {goog.debug.Error}
     * @final
     */
    goog.asserts.AssertionError = function (messagePattern, messageArgs) {
      messageArgs.unshift(messagePattern);
      goog.debug.Error.call(this, goog.string.subs.apply(null, messageArgs));
      // Remove the messagePattern afterwards to avoid permanently modifying the
      // passed in array.
      messageArgs.shift();

      /**
       * The message pattern used to format the error message. Error handlers can
       * use this to uniquely identify the assertion.
       * @type {string}
       */
      this.messagePattern = messagePattern;
    };
    goog.inherits(goog.asserts.AssertionError, goog.debug.Error);

    /** @override */
    goog.asserts.AssertionError.prototype.name = 'AssertionError';

    /**
     * The default error handler.
     * @param {!goog.asserts.AssertionError} e The exception to be handled.
     */
    goog.asserts.DEFAULT_ERROR_HANDLER = function (e) {
      throw e;
    };

    /**
     * The handler responsible for throwing or logging assertion errors.
     * @private {function(!goog.asserts.AssertionError)}
     */
    goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;

    /**
     * Throws an exception with the given message and "Assertion failed" prefixed
     * onto it.
     * @param {string} defaultMessage The message to use if givenMessage is empty.
     * @param {Array<*>} defaultArgs The substitution arguments for defaultMessage.
     * @param {string|undefined} givenMessage Message supplied by the caller.
     * @param {Array<*>} givenArgs The substitution arguments for givenMessage.
     * @throws {goog.asserts.AssertionError} When the value is not a number.
     * @private
     */
    goog.asserts.doAssertFailure_ = function (defaultMessage, defaultArgs, givenMessage, givenArgs) {
      var message = 'Assertion failed';
      if (givenMessage) {
        message += ': ' + givenMessage;
        var args = givenArgs;
      } else if (defaultMessage) {
        message += ': ' + defaultMessage;
        args = defaultArgs;
      }
      // The '' + works around an Opera 10 bug in the unit tests. Without it,
      // a stack trace is added to var message above. With this, a stack trace is
      // not added until this line (it causes the extra garbage to be added after
      // the assertion message instead of in the middle of it).
      var e = new goog.asserts.AssertionError('' + message, args || []);
      goog.asserts.errorHandler_(e);
    };

    /**
     * Sets a custom error handler that can be used to customize the behavior of
     * assertion failures, for example by turning all assertion failures into log
     * messages.
     * @param {function(!goog.asserts.AssertionError)} errorHandler
     */
    goog.asserts.setErrorHandler = function (errorHandler) {
      if (goog.asserts.ENABLE_ASSERTS) {
        goog.asserts.errorHandler_ = errorHandler;
      }
    };

    /**
     * Checks if the condition evaluates to true if goog.asserts.ENABLE_ASSERTS is
     * true.
     * @template T
     * @param {T} condition The condition to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {T} The value of the condition.
     * @throws {goog.asserts.AssertionError} When the condition evaluates to false.
     */
    goog.asserts.assert = function (condition, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !condition) {
        goog.asserts.doAssertFailure_('', null, opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return condition;
    };

    /**
     * Fails if goog.asserts.ENABLE_ASSERTS is true. This function is useful in case
     * when we want to add a check in the unreachable area like switch-case
     * statement:
     *
     * <pre>
     *  switch(type) {
     *    case FOO: doSomething(); break;
     *    case BAR: doSomethingElse(); break;
     *    default: goog.assert.fail('Unrecognized type: ' + type);
     *      // We have only 2 types - "default:" section is unreachable code.
     *  }
     * </pre>
     *
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @throws {goog.asserts.AssertionError} Failure.
     */
    goog.asserts.fail = function (opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS) {
        goog.asserts.errorHandler_(new goog.asserts.AssertionError('Failure' + (opt_message ? ': ' + opt_message : ''), Array.prototype.slice.call(arguments, 1)));
      }
    };

    /**
     * Checks if the value is a number if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {number} The value, guaranteed to be a number when asserts enabled.
     * @throws {goog.asserts.AssertionError} When the value is not a number.
     */
    goog.asserts.assertNumber = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !goog.isNumber(value)) {
        goog.asserts.doAssertFailure_('Expected number but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {number} */value
      );
    };

    /**
     * Checks if the value is a string if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {string} The value, guaranteed to be a string when asserts enabled.
     * @throws {goog.asserts.AssertionError} When the value is not a string.
     */
    goog.asserts.assertString = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !goog.isString(value)) {
        goog.asserts.doAssertFailure_('Expected string but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {string} */value
      );
    };

    /**
     * Checks if the value is a function if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {!Function} The value, guaranteed to be a function when asserts
     *     enabled.
     * @throws {goog.asserts.AssertionError} When the value is not a function.
     */
    goog.asserts.assertFunction = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !goog.isFunction(value)) {
        goog.asserts.doAssertFailure_('Expected function but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {!Function} */value
      );
    };

    /**
     * Checks if the value is an Object if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {!Object} The value, guaranteed to be a non-null object.
     * @throws {goog.asserts.AssertionError} When the value is not an object.
     */
    goog.asserts.assertObject = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !goog.isObject(value)) {
        goog.asserts.doAssertFailure_('Expected object but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {!Object} */value
      );
    };

    /**
     * Checks if the value is an Array if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {!Array<?>} The value, guaranteed to be a non-null array.
     * @throws {goog.asserts.AssertionError} When the value is not an array.
     */
    goog.asserts.assertArray = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !goog.isArray(value)) {
        goog.asserts.doAssertFailure_('Expected array but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {!Array<?>} */value
      );
    };

    /**
     * Checks if the value is a boolean if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {boolean} The value, guaranteed to be a boolean when asserts are
     *     enabled.
     * @throws {goog.asserts.AssertionError} When the value is not a boolean.
     */
    goog.asserts.assertBoolean = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(value)) {
        goog.asserts.doAssertFailure_('Expected boolean but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {boolean} */value
      );
    };

    /**
     * Checks if the value is a DOM Element if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {!Element} The value, likely to be a DOM Element when asserts are
     *     enabled.
     * @throws {goog.asserts.AssertionError} When the value is not an Element.
     */
    goog.asserts.assertElement = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && (!goog.isObject(value) || value.nodeType != goog.dom.NodeType.ELEMENT)) {
        goog.asserts.doAssertFailure_('Expected Element but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {!Element} */value
      );
    };

    /**
     * Checks if the value is an instance of the user-defined type if
     * goog.asserts.ENABLE_ASSERTS is true.
     *
     * The compiler may tighten the type returned by this function.
     *
     * @param {?} value The value to check.
     * @param {function(new: T, ...)} type A user-defined constructor.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @throws {goog.asserts.AssertionError} When the value is not an instance of
     *     type.
     * @return {T}
     * @template T
     */
    goog.asserts.assertInstanceof = function (value, type, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !(value instanceof type)) {
        goog.asserts.doAssertFailure_('Expected instanceof %s but got %s.', [goog.asserts.getType_(type), goog.asserts.getType_(value)], opt_message, Array.prototype.slice.call(arguments, 3));
      }
      return value;
    };

    /**
     * Checks that no enumerable keys are present in Object.prototype. Such keys
     * would break most code that use {@code for (var ... in ...)} loops.
     */
    goog.asserts.assertObjectPrototypeIsIntact = function () {
      for (var key in Object.prototype) {
        goog.asserts.fail(key + ' should not be enumerable in Object.prototype.');
      }
    };

    /**
     * Returns the type of a value. If a constructor is passed, and a suitable
     * string cannot be found, 'unknown type name' will be returned.
     * @param {*} value A constructor, object, or primitive.
     * @return {string} The best display name for the value, or 'unknown type name'.
     * @private
     */
    goog.asserts.getType_ = function (value) {
      if (value instanceof Function) {
        return value.displayName || value.name || 'unknown type name';
      } else if (value instanceof Object) {
        return value.constructor.displayName || value.constructor.name || Object.prototype.toString.call(value);
      } else {
        return value === null ? 'null' : typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);
      }
    };

    /**
     * @fileoverview Utility for fast string concatenation.
     */

    /**
     * Utility class to facilitate string concatenation.
     *
     * @param {*=} opt_a1 Optional first initial item to append.
     * @param {...*} var_args Other initial items to
     *     append, e.g., new goog.string.StringBuffer('foo', 'bar').
     * @constructor
     */
    goog.string.StringBuffer = function (opt_a1, var_args) {
      if (opt_a1 != null) {
        this.append.apply(this, arguments);
      }
    };

    /**
     * Internal buffer for the string to be concatenated.
     * @type {string}
     * @private
     */
    goog.string.StringBuffer.prototype.buffer_ = '';

    /**
     * Sets the contents of the string buffer object, replacing what's currently
     * there.
     *
     * @param {*} s String to set.
     */
    goog.string.StringBuffer.prototype.set = function (s) {
      this.buffer_ = '' + s;
    };

    /**
     * Appends one or more items to the buffer.
     *
     * Calling this with null, undefined, or empty arguments is an error.
     *
     * @param {*} a1 Required first string.
     * @param {*=} opt_a2 Optional second string.
     * @param {...?} var_args Other items to append,
     *     e.g., sb.append('foo', 'bar', 'baz').
     * @return {!goog.string.StringBuffer} This same StringBuffer object.
     * @suppress {duplicate}
     */
    goog.string.StringBuffer.prototype.append = function (a1, opt_a2, var_args) {
      // Use a1 directly to avoid arguments instantiation for single-arg case.
      this.buffer_ += String(a1);
      if (opt_a2 != null) {
        // second argument is undefined (null == undefined)
        for (var i = 1; i < arguments.length; i++) {
          this.buffer_ += arguments[i];
        }
      }
      return this;
    };

    /**
     * Clears the internal buffer.
     */
    goog.string.StringBuffer.prototype.clear = function () {
      this.buffer_ = '';
    };

    /**
     * @return {number} the length of the current contents of the buffer.
     */
    goog.string.StringBuffer.prototype.getLength = function () {
      return this.buffer_.length;
    };

    /**
     * @return {string} The concatenated string.
     * @override
     */
    goog.string.StringBuffer.prototype.toString = function () {
      return this.buffer_;
    };

    // Copyright 2012 The Closure Library Authors. All Rights Reserved.
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    //      http://www.apache.org/licenses/LICENSE-2.0
    //
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS-IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.

    /**
     * @fileoverview Soy data primitives.
     *
     * The goal is to encompass data types used by Soy, especially to mark content
     * as known to be "safe".
     *
     * @author gboyer@google.com (Garrett Boyer)
     */

    goog.soy = {};
    goog.soy.data = {};

    /**
     * A type of textual content.
     *
     * This is an enum of type Object so that these values are unforgeable.
     *
     * @enum {!Object}
     */
    goog.soy.data.SanitizedContentKind = {

      /**
       * A snippet of HTML that does not start or end inside a tag, comment, entity,
       * or DOCTYPE; and that does not contain any executable code
       * (JS, {@code <object>}s, etc.) from a different trust domain.
       */
      HTML: goog.DEBUG ? { sanitizedContentKindHtml: true } : {},

      /**
       * Executable Javascript code or expression, safe for insertion in a
       * script-tag or event handler context, known to be free of any
       * attacker-controlled scripts. This can either be side-effect-free
       * Javascript (such as JSON) or Javascript that's entirely under Google's
       * control.
       */
      JS: goog.DEBUG ? { sanitizedContentJsChars: true } : {},

      /** A properly encoded portion of a URI. */
      URI: goog.DEBUG ? { sanitizedContentUri: true } : {},

      /** A resource URI not under attacker control. */
      TRUSTED_RESOURCE_URI: goog.DEBUG ? { sanitizedContentTrustedResourceUri: true } : {},

      /**
       * Repeated attribute names and values. For example,
       * {@code dir="ltr" foo="bar" onclick="trustedFunction()" checked}.
       */
      ATTRIBUTES: goog.DEBUG ? { sanitizedContentHtmlAttribute: true } : {},

      // TODO: Consider separating rules, declarations, and values into
      // separate types, but for simplicity, we'll treat explicitly blessed
      // SanitizedContent as allowed in all of these contexts.
      /**
       * A CSS3 declaration, property, value or group of semicolon separated
       * declarations.
       */
      CSS: goog.DEBUG ? { sanitizedContentCss: true } : {},

      /**
       * Unsanitized plain-text content.
       *
       * This is effectively the "null" entry of this enum, and is sometimes used
       * to explicitly mark content that should never be used unescaped. Since any
       * string is safe to use as text, being of ContentKind.TEXT makes no
       * guarantees about its safety in any other context such as HTML.
       */
      TEXT: goog.DEBUG ? { sanitizedContentKindText: true } : {}
    };

    /**
     * A string-like object that carries a content-type and a content direction.
     *
     * IMPORTANT! Do not create these directly, nor instantiate the subclasses.
     * Instead, use a trusted, centrally reviewed library as endorsed by your team
     * to generate these objects. Otherwise, you risk accidentally creating
     * SanitizedContent that is attacker-controlled and gets evaluated unescaped in
     * templates.
     *
     * @constructor
     */
    goog.soy.data.SanitizedContent = function () {
      throw Error('Do not instantiate directly');
    };

    /**
     * The context in which this content is safe from XSS attacks.
     * @type {goog.soy.data.SanitizedContentKind}
     */
    goog.soy.data.SanitizedContent.prototype.contentKind;

    /**
     * The content's direction; null if unknown and thus to be estimated when
     * necessary.
     * @type {?goog.i18n.bidi.Dir}
     */
    goog.soy.data.SanitizedContent.prototype.contentDir = null;

    /**
     * The already-safe content.
     * @protected {string}
     */
    goog.soy.data.SanitizedContent.prototype.content;

    /**
     * Gets the already-safe content.
     * @return {string}
     */
    goog.soy.data.SanitizedContent.prototype.getContent = function () {
      return this.content;
    };

    /** @override */
    goog.soy.data.SanitizedContent.prototype.toString = function () {
      return this.content;
    };

    /**
     * An intermediary base class to allow the type system to sepcify text templates
     * without referencing the soydata package.
     * @extends {goog.soy.data.SanitizedContent}
     * @constructor
     */
    goog.soy.data.UnsanitizedText = function () {
      // TODO(gboyer): Delete this class after moving soydata to Closure.
      goog.soy.data.UnsanitizedText.base(this, 'constructor');
    };
    goog.inherits(goog.soy.data.UnsanitizedText, goog.soy.data.SanitizedContent);

    /*
     * Copyright 2008 Google Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * @fileoverview
     * Utility functions and classes for Soy.
     *
     * <p>
     * The top portion of this file contains utilities for Soy users:<ul>
     *   <li> soy.StringBuilder: Compatible with the 'stringbuilder' code style.
     * </ul>
     *
     * <p>
     * The bottom portion of this file contains utilities that should only be called
     * by Soy-generated JS code. Please do not use these functions directly from
     * your hand-writen code. Their names all start with '$$'.
     *
     */

    // -----------------------------------------------------------------------------
    // StringBuilder (compatible with the 'stringbuilder' code style).

    (function () {
      var soy = {};
      soy.asserts = {};
      soy.esc = {};
      var soydata = {};

      /**
       * Utility class to facilitate much faster string concatenation in IE,
       * using Array.join() rather than the '+' operator. For other browsers
       * we simply use the '+' operator.
       *
       * @param {Object} var_args Initial items to append,
       *     e.g., new soy.StringBuilder('foo', 'bar').
       * @constructor
       */
      soy.StringBuilder = goog.string.StringBuffer;

      // -----------------------------------------------------------------------------
      // soydata: Defines typed strings, e.g. an HTML string {@code "a<b>c"} is
      // semantically distinct from the plain text string {@code "a<b>c"} and smart
      // templates can take that distinction into account.

      /**
       * A type of textual content.
       *
       * This is an enum of type Object so that these values are unforgeable.
       *
       * @enum {!Object}
       */
      soydata.SanitizedContentKind = goog.soy.data.SanitizedContentKind;

      /**
       * Checks whether a given value is of a given content kind.
       *
       * @param {*} value The value to be examined.
       * @param {soydata.SanitizedContentKind} contentKind The desired content
       *     kind.
       * @return {boolean} Whether the given value is of the given kind.
       * @private
       */
      soydata.isContentKind = function (value, contentKind) {
        // TODO(user): This function should really include the assert on
        // value.constructor that is currently sprinkled at most of the call sites.
        // Unfortunately, that would require a (debug-mode-only) switch statement.
        // TODO(user): Perhaps we should get rid of the contentKind property
        // altogether and only at the constructor.
        return value != null && value.contentKind === contentKind;
      };

      /**
       * Content of type {@link soydata.SanitizedContentKind.URI}.
       *
       * The content is a URI chunk that the caller knows is safe to emit in a
       * template. The content direction is LTR.
       *
       * @constructor
       * @extends {goog.soy.data.SanitizedContent}
       */
      soydata.SanitizedUri = function () {
        goog.soy.data.SanitizedContent.call(this); // Throws an exception.
      };
      goog.inherits(soydata.SanitizedUri, goog.soy.data.SanitizedContent);

      /** @override */
      soydata.SanitizedUri.prototype.contentKind = soydata.SanitizedContentKind.URI;

      /** @override */
      soydata.SanitizedUri.prototype.contentDir = goog.i18n.bidi.Dir.LTR;

      /**
       * Unsanitized plain text string.
       *
       * While all strings are effectively safe to use as a plain text, there are no
       * guarantees about safety in any other context such as HTML. This is
       * sometimes used to mark that should never be used unescaped.
       *
       * @param {*} content Plain text with no guarantees.
       * @param {?goog.i18n.bidi.Dir=} opt_contentDir The content direction; null if
       *     unknown and thus to be estimated when necessary. Default: null.
       * @constructor
       * @extends {goog.soy.data.UnsanitizedText}
       */
      soydata.UnsanitizedText = function (content, opt_contentDir) {
        /** @override */
        this.content = String(content);
        this.contentDir = opt_contentDir != null ? opt_contentDir : null;
      };
      goog.inherits(soydata.UnsanitizedText, goog.soy.data.UnsanitizedText);

      /** @override */
      soydata.UnsanitizedText.prototype.contentKind = soydata.SanitizedContentKind.TEXT;

      /**
       * Empty string, used as a type in Soy templates.
       * @enum {string}
       * @private
       */
      soydata.$$EMPTY_STRING_ = {
        VALUE: ''
      };

      /**
       * Creates a factory for SanitizedContent types.
       *
       * This is a hack so that the soydata.VERY_UNSAFE.ordainSanitized* can
       * instantiate Sanitized* classes, without making the Sanitized* constructors
       * publicly usable. Requiring all construction to use the VERY_UNSAFE names
       * helps callers and their reviewers easily tell that creating SanitizedContent
       * is not always safe and calls for careful review.
       *
       * @param {function(new: T)} ctor A constructor.
       * @return {!function(*, ?goog.i18n.bidi.Dir=): T} A factory that takes
       *     content and an optional content direction and returns a new instance. If
       *     the content direction is undefined, ctor.prototype.contentDir is used.
       * @template T
       * @private
       */
      soydata.$$makeSanitizedContentFactory_ = function (ctor) {
        /**
         * @param {string} content
         * @constructor
         * @extends {goog.soy.data.SanitizedContent}
         */
        function InstantiableCtor(content) {
          /** @override */
          this.content = content;
        }
        InstantiableCtor.prototype = ctor.prototype;
        /**
         * Creates a ctor-type SanitizedContent instance.
         *
         * @param {*} content The content to put in the instance.
         * @param {?goog.i18n.bidi.Dir=} opt_contentDir The content direction. If
         *     undefined, ctor.prototype.contentDir is used.
         * @return {!goog.soy.data.SanitizedContent} The new instance. It is actually
         *     of type T above (ctor's type, a descendant of SanitizedContent), but
         *     there is no way to express that here.
         */
        function sanitizedContentFactory(content, opt_contentDir) {
          var result = new InstantiableCtor(String(content));
          if (opt_contentDir !== undefined) {
            result.contentDir = opt_contentDir;
          }
          return result;
        }
        return sanitizedContentFactory;
      };

      /**
       * Creates a factory for SanitizedContent types that should always have their
       * default directionality.
       *
       * This is a hack so that the soydata.VERY_UNSAFE.ordainSanitized* can
       * instantiate Sanitized* classes, without making the Sanitized* constructors
       * publicly usable. Requiring all construction to use the VERY_UNSAFE names
       * helps callers and their reviewers easily tell that creating SanitizedContent
       * is not always safe and calls for careful review.
       *
       * @param {function(new: T, string)} ctor A constructor.
       * @return {!function(*): T} A factory that takes content and returns a new
       *     instance (with default directionality, i.e. ctor.prototype.contentDir).
       * @template T
       * @private
       */
      soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_ = function (ctor) {
        /**
         * @param {string} content
         * @constructor
         * @extends {goog.soy.data.SanitizedContent}
         */
        function InstantiableCtor(content) {
          /** @override */
          this.content = content;
        }
        InstantiableCtor.prototype = ctor.prototype;
        /**
         * Creates a ctor-type SanitizedContent instance.
         *
         * @param {*} content The content to put in the instance.
         * @return {!goog.soy.data.SanitizedContent} The new instance. It is actually
         *     of type T above (ctor's type, a descendant of SanitizedContent), but
         *     there is no way to express that here.
         */
        function sanitizedContentFactory(content) {
          var result = new InstantiableCtor(String(content));
          return result;
        }
        return sanitizedContentFactory;
      };

      // -----------------------------------------------------------------------------
      // Sanitized content ordainers. Please use these with extreme caution (with the
      // exception of markUnsanitizedText). A good recommendation is to limit usage
      // of these to just a handful of files in your source tree where usages can be
      // carefully audited.


      /**
       * Protects a string from being used in an noAutoescaped context.
       *
       * This is useful for content where there is significant risk of accidental
       * unescaped usage in a Soy template. A great case is for user-controlled
       * data that has historically been a source of vulernabilities.
       *
       * @param {*} content Text to protect.
       * @param {?goog.i18n.bidi.Dir=} opt_contentDir The content direction; null if
       *     unknown and thus to be estimated when necessary. Default: null.
       * @return {!soydata.UnsanitizedText} A wrapper that is rejected by the
       *     Soy noAutoescape print directive.
       */
      soydata.markUnsanitizedText = function (content, opt_contentDir) {
        return new soydata.UnsanitizedText(content, opt_contentDir);
      };

      soydata.VERY_UNSAFE = {};

      /**
      * Takes a leap of faith that the provided content is "safe" to use as a URI
      * in a Soy template.
      *
      * This creates a Soy SanitizedContent object which indicates to Soy there is
      * no need to escape it when printed as a URI (e.g. in an href or src
      * attribute), such as if it's already been encoded or  if it's a Javascript:
      * URI.
      *
      * @param {*} content A chunk of URI that the caller knows is safe to
      *     emit in a template.
      * @return {!soydata.SanitizedUri} Sanitized content wrapper that indicates to
      *     Soy not to escape or filter when printed in URI context.
      */
      soydata.VERY_UNSAFE.ordainSanitizedUri = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_(soydata.SanitizedUri);

      // -----------------------------------------------------------------------------
      // Below are private utilities to be used by Soy-generated code only.

      /**
       * Builds an augmented map. The returned map will contain mappings from both
       * the base map and the additional map. If the same key appears in both, then
       * the value from the additional map will be visible, while the value from the
       * base map will be hidden. The base map will be used, but not modified.
       *
       * @param {!Object} baseMap The original map to augment.
       * @param {!Object} additionalMap A map containing the additional mappings.
       * @return {!Object} An augmented map containing both the original and
       *     additional mappings.
       */
      soy.$$augmentMap = function (baseMap, additionalMap) {
        return soy.$$assignDefaults(soy.$$assignDefaults({}, additionalMap), baseMap);
      };

      /**
       * Copies extra properties into an object if they do not already exist. The
       * destination object is mutated in the process.
       *
       * @param {!Object} obj The destination object to update.
       * @param {!Object} defaults An object with default properties to apply.
       * @return {!Object} The destination object for convenience.
       */
      soy.$$assignDefaults = function (obj, defaults) {
        for (var key in defaults) {
          if (!(key in obj)) {
            obj[key] = defaults[key];
          }
        }

        return obj;
      };

      /**
       * Checks that the given map key is a string.
       * @param {*} key Key to check.
       * @return {string} The given key.
       */
      soy.$$checkMapKey = function (key) {
        // TODO: Support map literal with nonstring key.
        if (typeof key != 'string') {
          throw Error('Map literal\'s key expression must evaluate to string' + ' (encountered type "' + (typeof key === 'undefined' ? 'undefined' : babelHelpers.typeof(key)) + '").');
        }
        return key;
      };

      /**
       * Gets the keys in a map as an array. There are no guarantees on the order.
       * @param {Object} map The map to get the keys of.
       * @return {!Array<string>} The array of keys in the given map.
       */
      soy.$$getMapKeys = function (map) {
        var mapKeys = [];
        for (var key in map) {
          mapKeys.push(key);
        }
        return mapKeys;
      };

      /**
       * Returns the argument if it is not null.
       *
       * @param {T} val The value to check
       * @return {T} val if is isn't null
       * @template T
       */
      soy.$$checkNotNull = function (val) {
        if (val == null) {
          throw Error('unexpected null value');
        }
        return val;
      };

      /**
       * Gets a consistent unique id for the given delegate template name. Two calls
       * to this function will return the same id if and only if the input names are
       * the same.
       *
       * <p> Important: This function must always be called with a string constant.
       *
       * <p> If Closure Compiler is not being used, then this is just this identity
       * function. If Closure Compiler is being used, then each call to this function
       * will be replaced with a short string constant, which will be consistent per
       * input name.
       *
       * @param {string} delTemplateName The delegate template name for which to get a
       *     consistent unique id.
       * @return {string} A unique id that is consistent per input name.
       *
       * @consistentIdGenerator
       */
      soy.$$getDelTemplateId = function (delTemplateName) {
        return delTemplateName;
      };

      /**
       * Map from registered delegate template key to the priority of the
       * implementation.
       * @type {Object}
       * @private
       */
      soy.$$DELEGATE_REGISTRY_PRIORITIES_ = {};

      /**
       * Map from registered delegate template key to the implementation function.
       * @type {Object}
       * @private
       */
      soy.$$DELEGATE_REGISTRY_FUNCTIONS_ = {};

      /**
       * Registers a delegate implementation. If the same delegate template key (id
       * and variant) has been registered previously, then priority values are
       * compared and only the higher priority implementation is stored (if
       * priorities are equal, an error is thrown).
       *
       * @param {string} delTemplateId The delegate template id.
       * @param {string} delTemplateVariant The delegate template variant (can be
       *     empty string).
       * @param {number} delPriority The implementation's priority value.
       * @param {Function} delFn The implementation function.
       */
      soy.$$registerDelegateFn = function (delTemplateId, delTemplateVariant, delPriority, delFn) {

        var mapKey = 'key_' + delTemplateId + ':' + delTemplateVariant;
        var currPriority = soy.$$DELEGATE_REGISTRY_PRIORITIES_[mapKey];
        if (currPriority === undefined || delPriority > currPriority) {
          // Registering new or higher-priority function: replace registry entry.
          soy.$$DELEGATE_REGISTRY_PRIORITIES_[mapKey] = delPriority;
          soy.$$DELEGATE_REGISTRY_FUNCTIONS_[mapKey] = delFn;
        } else if (delPriority == currPriority) {
          // Registering same-priority function: error.
          throw Error('Encountered two active delegates with the same priority ("' + delTemplateId + ':' + delTemplateVariant + '").');
        } else {
          // Registering lower-priority function: do nothing.
        }
      };

      /**
       * Retrieves the (highest-priority) implementation that has been registered for
       * a given delegate template key (id and variant). If no implementation has
       * been registered for the key, then the fallback is the same id with empty
       * variant. If the fallback is also not registered, and allowsEmptyDefault is
       * true, then returns an implementation that is equivalent to an empty template
       * (i.e. rendered output would be empty string).
       *
       * @param {string} delTemplateId The delegate template id.
       * @param {string} delTemplateVariant The delegate template variant (can be
       *     empty string).
       * @param {boolean} allowsEmptyDefault Whether to default to the empty template
       *     function if there's no active implementation.
       * @return {Function} The retrieved implementation function.
       */
      soy.$$getDelegateFn = function (delTemplateId, delTemplateVariant, allowsEmptyDefault) {

        var delFn = soy.$$DELEGATE_REGISTRY_FUNCTIONS_['key_' + delTemplateId + ':' + delTemplateVariant];
        if (!delFn && delTemplateVariant != '') {
          // Fallback to empty variant.
          delFn = soy.$$DELEGATE_REGISTRY_FUNCTIONS_['key_' + delTemplateId + ':'];
        }

        if (delFn) {
          return delFn;
        } else if (allowsEmptyDefault) {
          return soy.$$EMPTY_TEMPLATE_FN_;
        } else {
          throw Error('Found no active impl for delegate call to "' + delTemplateId + ':' + delTemplateVariant + '" (and not allowemptydefault="true").');
        }
      };

      /**
       * Private helper soy.$$getDelegateFn(). This is the empty template function
       * that is returned whenever there's no delegate implementation found.
       *
       * @param {Object<string, *>=} opt_data
       * @param {soy.StringBuilder=} opt_sb
       * @param {Object<string, *>=} opt_ijData
       * @return {string}
       * @private
       */
      soy.$$EMPTY_TEMPLATE_FN_ = function (opt_data, opt_sb, opt_ijData) {
        return '';
      };

      // -----------------------------------------------------------------------------
      // Basic directives/functions.


      /**
       * Truncates a string to a given max length (if it's currently longer),
       * optionally adding ellipsis at the end.
       *
       * @param {*} str The string to truncate. Can be other types, but the value will
       *     be coerced to a string.
       * @param {number} maxLen The maximum length of the string after truncation
       *     (including ellipsis, if applicable).
       * @param {boolean} doAddEllipsis Whether to add ellipsis if the string needs
       *     truncation.
       * @return {string} The string after truncation.
       */
      soy.$$truncate = function (str, maxLen, doAddEllipsis) {

        str = String(str);
        if (str.length <= maxLen) {
          return str; // no need to truncate
        }

        // If doAddEllipsis, either reduce maxLen to compensate, or else if maxLen is
        // too small, just turn off doAddEllipsis.
        if (doAddEllipsis) {
          if (maxLen > 3) {
            maxLen -= 3;
          } else {
            doAddEllipsis = false;
          }
        }

        // Make sure truncating at maxLen doesn't cut up a unicode surrogate pair.
        if (soy.$$isHighSurrogate_(str.charAt(maxLen - 1)) && soy.$$isLowSurrogate_(str.charAt(maxLen))) {
          maxLen -= 1;
        }

        // Truncate.
        str = str.substring(0, maxLen);

        // Add ellipsis.
        if (doAddEllipsis) {
          str += '...';
        }

        return str;
      };

      /**
       * Private helper for $$truncate() to check whether a char is a high surrogate.
       * @param {string} ch The char to check.
       * @return {boolean} Whether the given char is a unicode high surrogate.
       * @private
       */
      soy.$$isHighSurrogate_ = function (ch) {
        return 0xD800 <= ch && ch <= 0xDBFF;
      };

      /**
       * Private helper for $$truncate() to check whether a char is a low surrogate.
       * @param {string} ch The char to check.
       * @return {boolean} Whether the given char is a unicode low surrogate.
       * @private
       */
      soy.$$isLowSurrogate_ = function (ch) {
        return 0xDC00 <= ch && ch <= 0xDFFF;
      };

      // -----------------------------------------------------------------------------
      // Assertion methods used by runtime.

      /**
       * Checks if the type assertion is true if goog.asserts.ENABLE_ASSERTS is
       * true. Report errors on runtime types if goog.DEBUG is true.
       * @template T
       * @param {T} typeCheck An condition for type checks.
       * @param {string} paramName The Soy name of the parameter.
       * @param {?Object} param The resolved JS object for the parameter.
       * @param {!string} jsDocTypeStr JSDoc type str to cast the value to if the
       *     type test succeeds
       * @param {...*} var_args The items to substitute into the failure message.
       * @return {T} The value of the condition.
       * @throws {goog.asserts.AssertionError} When the condition evaluates to false.
       */
      soy.asserts.assertType = function (typeCheck, paramName, param, jsDocTypeStr, var_args) {
        var msg = 'expected param ' + paramName + ' of type ' + jsDocTypeStr + (goog.DEBUG ? ', but got ' + goog.debug.runtimeType(param) : '') + '.';
        return goog.asserts.assert(typeCheck, msg, var_args);
      };

      // -----------------------------------------------------------------------------
      // Generated code.


      // START GENERATED CODE FOR ESCAPERS.

      /**
       * @type {function (*) : string}
       */
      soy.esc.$$escapeHtmlHelper = function (v) {
        return goog.string.htmlEscape(String(v));
      };

      /**
       * Allows only data-protocol image URI's.
       *
       * @param {*} value The value to process. May not be a string, but the value
       *     will be coerced to a string.
       * @return {!soydata.SanitizedUri} An escaped version of value.
       */
      soy.$$filterImageDataUri = function (value) {
        // NOTE: Even if it's a SanitizedUri, we will still filter it.
        return soydata.VERY_UNSAFE.ordainSanitizedUri(soy.esc.$$filterImageDataUriHelper(value));
      };

      /**
       * A pattern that vets values produced by the named directives.
       * @private {!RegExp}
       */
      soy.esc.$$FILTER_FOR_FILTER_IMAGE_DATA_URI_ = /^data:image\/(?:bmp|gif|jpe?g|png|tiff|webp);base64,[a-z0-9+\/]+=*$/i;

      /**
       * A helper for the Soy directive |filterImageDataUri
       * @param {*} value Can be of any type but will be coerced to a string.
       * @return {string} The escaped text.
       */
      soy.esc.$$filterImageDataUriHelper = function (value) {
        var str = String(value);
        if (!soy.esc.$$FILTER_FOR_FILTER_IMAGE_DATA_URI_.test(str)) {
          goog.asserts.fail('Bad value `%s` for |filterImageDataUri', [str]);
          return 'data:image/gif;base64,zSoyz';
        }
        return str;
      };

      // END GENERATED CODE

      goog.loadModule(function () {
        goog.module('soy');
        return soy;
      });

      goog.loadModule(function () {
        goog.module('soydata');
        return soydata;
      });

      goog.loadModule(function () {
        goog.module('soy.asserts');
        return soy;
      });
    })();

    /* jshint ignore:end */

    goog.loadModule(function () {
      goog.module('incrementaldom');
      return IncrementalDOM;
    });
  }).call(window);
}).call(this);
"use strict";

(function () {
	/* jshint ignore:start */

	/*
  * HTML5 Parser By Sam Blowes
  *
  * Designed for HTML5 documents
  *
  * Original code by John Resig (ejohn.org)
  * http://ejohn.org/blog/pure-javascript-html-parser/
  * Original code by Erik Arvidsson, Mozilla Public License
  * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
  *
  * ----------------------------------------------------------------------------
  * License
  * ----------------------------------------------------------------------------
  *
  * This code is triple licensed using Apache Software License 2.0,
  * Mozilla Public License or GNU Public License
  *
  * ////////////////////////////////////////////////////////////////////////////
  *
  * Licensed under the Apache License, Version 2.0 (the "License"); you may not
  * use this file except in compliance with the License.  You may obtain a copy
  * of the License at http://www.apache.org/licenses/LICENSE-2.0
  *
  * ////////////////////////////////////////////////////////////////////////////
  *
  * The contents of this file are subject to the Mozilla Public License
  * Version 1.1 (the "License"); you may not use this file except in
  * compliance with the License. You may obtain a copy of the License at
  * http://www.mozilla.org/MPL/
  *
  * Software distributed under the License is distributed on an "AS IS"
  * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
  * License for the specific language governing rights and limitations
  * under the License.
  *
  * The Original Code is Simple HTML Parser.
  *
  * The Initial Developer of the Original Code is Erik Arvidsson.
  * Portions created by Erik Arvidssson are Copyright (C) 2004. All Rights
  * Reserved.
  *
  * ////////////////////////////////////////////////////////////////////////////
  *
  * This program is free software; you can redistribute it and/or
  * modify it under the terms of the GNU General Public License
  * as published by the Free Software Foundation; either version 2
  * of the License, or (at your option) any later version.
  *
  * This program is distributed in the hope that it will be useful,
  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  * GNU General Public License for more details.
  *
  * You should have received a copy of the GNU General Public License
  * along with this program; if not, write to the Free Software
  * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
  * @license
  */

	/*
  *
  * ----------------------------------------------------------------------------
  * Usage
  * ----------------------------------------------------------------------------
  *
  * // Use like so:
  * HTMLParser(htmlString, {
  *     start: function(tag, attrs, unary) {},
  *     end: function(tag) {},
  *     chars: function(text) {},
  *     comment: function(text) {}
  * });
  *
  * // or to get an XML string:
  * HTMLtoXML(htmlString);
  *
  * // or to get an XML DOM Document
  * HTMLtoDOM(htmlString);
  *
  * // or to inject into an existing document/DOM node
  * HTMLtoDOM(htmlString, document);
  * HTMLtoDOM(htmlString, document.body);
  *
  */

	(function () {
		// Regular Expressions for parsing tags and attributes
		var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
		    endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
		    attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

		// Empty Elements - HTML 5
		var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");

		// Block Elements - HTML 5
		var block = makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

		// Inline Elements - HTML 5
		var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

		// Elements that you can, intentionally, leave open
		// (and which close themselves)
		var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

		// Attributes that have their values filled in disabled="disabled"
		var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

		// Special Elements (can contain anything)
		var special = makeMap("script,style");

		var HTMLParser = window.HTMLParser = function (html, handler) {
			var index,
			    chars,
			    match,
			    stack = [],
			    last = html;
			stack.last = function () {
				return this[this.length - 1];
			};

			while (html) {
				chars = true;

				// Make sure we're not in a script or style element
				if (!stack.last() || !special[stack.last()]) {

					// Comment
					if (html.indexOf("<!--") == 0) {
						index = html.indexOf("-->");

						if (index >= 0) {
							if (handler.comment) handler.comment(html.substring(4, index));
							html = html.substring(index + 3);
							chars = false;
						}

						// end tag
					} else if (html.indexOf("</") == 0) {
						match = html.match(endTag);

						if (match) {
							html = html.substring(match[0].length);
							match[0].replace(endTag, parseEndTag);
							chars = false;
						}

						// start tag
					} else if (html.indexOf("<") == 0) {
						match = html.match(startTag);

						if (match) {
							html = html.substring(match[0].length);
							match[0].replace(startTag, parseStartTag);
							chars = false;
						}
					}

					if (chars) {
						index = html.indexOf("<");

						var text = index < 0 ? html : html.substring(0, index);
						html = index < 0 ? "" : html.substring(index);

						if (handler.chars) handler.chars(text);
					}
				} else {
					html = html.replace(new RegExp("([\\s\\S]*?)<\/" + stack.last() + "[^>]*>"), function (all, text) {
						text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
						if (handler.chars) handler.chars(text);

						return "";
					});

					parseEndTag("", stack.last());
				}

				if (html == last) throw "Parse Error: " + html;
				last = html;
			}

			// Clean up any remaining tags
			parseEndTag();

			function parseStartTag(tag, tagName, rest, unary) {
				tagName = tagName.toLowerCase();

				if (block[tagName]) {
					// Close last tag if it's inline, except if it's a "span" (since people
					// usually add anything they want to spans, and browsers allow it).
					// Note: this exception for "span" was added manually (i.e. it's not
					// present in the original code).
					while (stack.last() && inline[stack.last()] && stack.last() !== 'span') {
						parseEndTag("", stack.last());
					}
				}

				if (closeSelf[tagName] && stack.last() == tagName) {
					parseEndTag("", tagName);
				}

				unary = empty[tagName] || !!unary;

				if (!unary) stack.push(tagName);

				if (handler.start) {
					var attrs = [];

					rest.replace(attr, function (match, name) {
						var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";

						attrs.push({
							name: name,
							value: value,
							escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
						});
					});

					if (handler.start) handler.start(tagName, attrs, unary);
				}
			}

			function parseEndTag(tag, tagName) {
				// If no tag name is provided, clean shop
				if (!tagName) var pos = 0;

				// Find the closest opened tag of the same type
				else for (var pos = stack.length - 1; pos >= 0; pos--) {
						if (stack[pos] == tagName) break;
					}if (pos >= 0) {
					// Close all the open elements, up the stack
					for (var i = stack.length - 1; i >= pos; i--) {
						if (handler.end) handler.end(stack[i]);
					} // Remove the open elements from the stack
					stack.length = pos;
				}
			}
		};

		function makeMap(str) {
			var obj = {},
			    items = str.split(",");
			for (var i = 0; i < items.length; i++) {
				obj[items[i]] = true;
			}return obj;
		}
	}).call(this);

	/* jshint ignore:end */
}).call(this);
'use strict';

// Copyright 2006 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Unescapes an HTML string using a DOM to resolve non-XML, non-numeric
 * entities. This function is XSS-safe and whitespace-preserving.
 * @private
 * @param {string} str The string to unescape.
 * @return {string} The unescaped {@code str} string.
 */

(function () {
  function unescape(str) {
    /** @type {!Object<string, string>} */
    var seen = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"' };
    var div = document.createElement('div');

    // Match as many valid entity characters as possible. If the actual entity
    // happens to be shorter, it will still work as innerHTML will return the
    // trailing characters unchanged. Since the entity characters do not include
    // open angle bracket, there is no chance of XSS from the innerHTML use.
    // Since no whitespace is passed to innerHTML, whitespace is preserved.
    return str.replace(HTML_ENTITY_PATTERN_, function (s, entity) {
      // Check for cached entity.
      var value = seen[s];
      if (value) {
        return value;
      }
      // Check for numeric entity.
      if (entity.charAt(0) === '#') {
        // Prefix with 0 so that hex entities (e.g. &#x10) parse as hex numbers.
        var n = Number('0' + entity.substr(1));
        if (!isNaN(n)) {
          value = String.fromCharCode(n);
        }
      }
      // Fall back to innerHTML otherwise.
      if (!value) {
        // Append a non-entity character to avoid a bug in Webkit that parses
        // an invalid entity at the end of innerHTML text as the empty string.
        div.innerHTML = s + ' ';
        // Then remove the trailing character from the result.
        value = div.firstChild.nodeValue.slice(0, -1);
      }
      // Cache and return.
      seen[s] = value;
      return value;
    });
  }

  this['metal']['unescape'] = unescape;

  /**
   * Regular expression that matches an HTML entity.
   * @type {!RegExp}
   */

  var HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
}).call(this);
'use strict';

(function () {
	var unescape = this['metal']['unescape'];


	var parser_;

	var HTML2IncDom = function () {
		function HTML2IncDom() {
			babelHelpers.classCallCheck(this, HTML2IncDom);
		}

		babelHelpers.createClass(HTML2IncDom, null, [{
			key: 'buildFn',

			/**
    * Should convert the given html string to a function with calls to
    * incremental dom methods.
    * @param {string} html
    * @return {!function()} Function with incremental dom calls for building
    *     the given html string.
    */
			value: function buildFn(html) {
				return function () {
					return HTML2IncDom.run(html);
				};
			}

			/**
    * Gets the html parser being currently used.
    * @return {!function()}
    */

		}, {
			key: 'getParser',
			value: function getParser() {
				return parser_ || window.HTMLParser;
			}

			/**
    * Should convert the given html string to calls to incremental dom methods.
    * @param {string} html
    */

		}, {
			key: 'run',
			value: function run(html) {
				HTML2IncDom.getParser()(html, {
					start: function start(tag, attrs, unary) {
						var fn = unary ? IncrementalDOM.elementVoid : IncrementalDOM.elementOpen;
						var args = [tag, null, []];
						for (var i = 0; i < attrs.length; i++) {
							args.push(attrs[i].name, attrs[i].value);
						}
						fn.apply(null, args);
					},

					end: function end(tag) {
						IncrementalDOM.elementClose(tag);
					},

					chars: function chars(text) {
						IncrementalDOM.text(text, unescape);
					}
				});
			}

			/**
    * Changes the function that will be used to parse html strings. By default
    * this will use the `HTMLParser` function from
    * https://github.com/blowsie/Pure-JavaScript-HTML5-Parser. This will accept
    * any function that follows that same api, basically accepting the html
    * string and an object with `start`, `end` and `chars` functions to be called
    * during the parsing.
    * @param {!function(string, !Object} newParser
    */

		}, {
			key: 'setParser',
			value: function setParser(newParser) {
				parser_ = newParser;
			}
		}]);
		return HTML2IncDom;
	}();

	this['metal']['HTML2IncDom'] = HTML2IncDom;
}).call(this);
'use strict';

(function () {
  var HTML2IncDom = this['metal']['HTML2IncDom'];
  this['metal']['withParser'] = HTML2IncDom;
}).call(this);
'use strict';

(function () {
	var SoyAop = {
		/**
   * The functions that should be called instead of a template call. The last
   * function in the array is the one that is intercepting at the moment. If the
   * array is empty, the original function will be called instead.
   * @type {!Array<function()>}
   * @protected
   */
		interceptFns_: [],

		/**
   * Gets the original function of the given template function. If no original exists,
   * returns the given function itself.
   * @param {!function()} fn
   * @return {!function()}
   */
		getOriginalFn: function getOriginalFn(fn) {
			return fn.originalFn ? fn.originalFn : fn;
		},

		/**
   * Handles a template call, calling the current interception function if one
   * is set, or otherwise just calling the original function instead.
   * @param {!function()} originalFn The original template function that was
   *     intercepted.
   * @param {Object} opt_data Template data object.
   * @param {*} opt_ignored
   * @param {Object} opt_ijData Template injected data object.
   * @return {*} The return value of the function that is called to handle this
   *     interception.
   */
		handleTemplateCall_: function handleTemplateCall_(originalFn, opt_data, opt_ignored, opt_ijData) {
			var interceptFn = SoyAop.interceptFns_[SoyAop.interceptFns_.length - 1];
			if (interceptFn) {
				return interceptFn.call(null, originalFn, opt_data, opt_ignored, opt_ijData);
			} else {
				return originalFn.call(null, opt_data, opt_ignored, opt_ijData);
			}
		},

		/**
   * Registers a template function that should be intercepted.
   * @param {!Object} templates The original templates object containing the
   *     function to be intercepted.
   * @param {string} name The name of the template function to intercept.
   */
		registerForInterception: function registerForInterception(templates, name) {
			var originalFn = templates[name];
			if (!originalFn.originalFn) {
				templates[name] = SoyAop.handleTemplateCall_.bind(null, originalFn);
				templates[name].originalFn = originalFn;
			}
		},

		/**
   * Starts intercepting all template calls, replacing them with a call to the
   * given function instead.
   * @param {!function()} fn
   */
		startInterception: function startInterception(fn) {
			SoyAop.interceptFns_.push(fn);
		},

		/**
   * Stops intercepting template calls.
   */
		stopAllInterceptions: function stopAllInterceptions() {
			SoyAop.interceptFns_ = [];
		},

		/**
   * Stops intercepting template calls with the last registered function.
   */
		stopInterception: function stopInterception() {
			SoyAop.interceptFns_.pop();
		}
	};

	this['metal']['SoyAop'] = SoyAop;
}).call(this);
'use strict';

(function () {
	var isFunction = this['metalNamed']['metal']['isFunction'];
	var isObject = this['metalNamed']['metal']['isObject'];
	var isString = this['metalNamed']['metal']['isString'];
	var object = this['metalNamed']['metal']['object'];
	var ComponentRegistry = this['metalNamed']['component']['ComponentRegistry'];
	var HTML2IncDom = this['metal']['withParser'];
	var IncrementalDomRenderer = this['metal']['IncrementalDomRenderer'];
	var SoyAop = this['metal']['SoyAop'];

	// The injected data that will be passed to soy templates.

	var ijData = {};

	var Soy = function (_IncrementalDomRender) {
		babelHelpers.inherits(Soy, _IncrementalDomRender);

		function Soy() {
			babelHelpers.classCallCheck(this, Soy);
			return babelHelpers.possibleConstructorReturn(this, (Soy.__proto__ || Object.getPrototypeOf(Soy)).apply(this, arguments));
		}

		babelHelpers.createClass(Soy, [{
			key: 'getExtraDataConfig',

			/**
    * Adds the template params to the component's state, if they don't exist yet.
    * @protected
    */
			value: function getExtraDataConfig() {
				var elementTemplate = this.component_.constructor.TEMPLATE;
				if (!isFunction(elementTemplate)) {
					return;
				}

				elementTemplate = SoyAop.getOriginalFn(elementTemplate);
				this.soyParamTypes_ = elementTemplate.types || {};

				var keys = elementTemplate.params || [];
				var component = this.component_;
				var configs = {};
				for (var i = 0; i < keys.length; i++) {
					if (!component[keys[i]]) {
						configs[keys[i]] = {};
					}
				}
				return configs;
			}

			/**
    * Copies the component's state to an object so it can be passed as it's
    * template call's data. The copying needs to be done because, if the component
    * itself is passed directly, some problems occur when soy tries to merge it
    * with other data, due to property getters and setters. This is safer.
    * @param {!Array<string>} params The params used by this template.
    * @return {!Object}
    * @protected
    */

		}, {
			key: 'buildTemplateData_',
			value: function buildTemplateData_(params) {
				var _this2 = this;

				var component = this.component_;
				var data = object.mixin({}, this.config_);
				component.getStateKeys().forEach(function (key) {
					var value = component[key];
					if (_this2.isHtmlParam_(key)) {
						value = Soy.toIncDom(value);
					}
					data[key] = value;
				});
				for (var i = 0; i < params.length; i++) {
					if (!data[params[i]] && isFunction(component[params[i]])) {
						data[params[i]] = component[params[i]].bind(component);
					}
				}
				return data;
			}

			/**
    * Returns the requested template function. This function will be wrapped in
    * another though, just to defer the requirement of the template's module
    * being ready until the function is actually called.
    * @param {string} namespace The soy template's namespace.
    * @param {string} templateName The name of the template function.
    * @return {!function()}
    */

		}, {
			key: 'isHtmlParam_',


			/**
    * Checks if the given param type is html.
    * @param {string} name
    * @protected
    */
			value: function isHtmlParam_(name) {
				var state = this.component_.getDataManager().getStateInstance(this.component_);
				if (state.getStateKeyConfig(name).isHtml) {
					return true;
				}
				var type = this.soyParamTypes_[name] || '';
				return type.split('|').indexOf('html') !== -1;
			}

			/**
    * Registers the given templates to be used by `Soy` for the specified
    * component constructor.
    * @param {!Function} componentCtor The constructor of the component that
    *     should use the given templates.
    * @param {!Object} templates Object containing soy template functions.
    * @param {string=} mainTemplate The name of the main template that should be
    *     used to render the component. Defaults to "render".
    */

		}, {
			key: 'renderIncDom',


			/**
    * Overrides the default method from `IncrementalDomRenderer` so the component's
    * soy template can be used for rendering.
    * @param {!Object} data Data passed to the component when rendering it.
    * @override
    */
			value: function renderIncDom() {
				var elementTemplate = this.component_.constructor.TEMPLATE;
				if (isFunction(elementTemplate) && !this.component_.render) {
					elementTemplate = SoyAop.getOriginalFn(elementTemplate);
					SoyAop.startInterception(Soy.handleInterceptedCall_);
					elementTemplate(this.buildTemplateData_(elementTemplate.params || []), null, ijData);
					SoyAop.stopInterception();
				} else {
					babelHelpers.get(Soy.prototype.__proto__ || Object.getPrototypeOf(Soy.prototype), 'renderIncDom', this).call(this);
				}
			}

			/**
    * Sets the injected data object that should be passed to templates.
    * @param {Object} data
    */

		}, {
			key: 'shouldUpdate',


			/**
    * Overrides the original `IncrementalDomRenderer` method so that only
    * state keys used by the main template can cause updates.
    * @return {boolean}
    */
			value: function shouldUpdate() {
				var should = babelHelpers.get(Soy.prototype.__proto__ || Object.getPrototypeOf(Soy.prototype), 'shouldUpdate', this).call(this);
				if (!should || this.component_.shouldUpdate) {
					return should;
				}

				var fn = this.component_.constructor.TEMPLATE;
				var params = fn ? SoyAop.getOriginalFn(fn).params : [];
				for (var i = 0; i < params.length; i++) {
					if (this.changes_[params[i]]) {
						return true;
					}
				}
				return false;
			}

			/**
    * Converts the given incremental dom function into an html string.
    * @param {!function()} incDomFn
    * @return {string}
    */

		}], [{
			key: 'getTemplate',
			value: function getTemplate(namespace, templateName) {
				return function (opt_data, opt_ignored, opt_ijData) {
					if (!goog.loadedModules_[namespace]) {
						throw new Error('No template with namespace "' + namespace + '" has been loaded yet.');
					}
					return goog.loadedModules_[namespace][templateName](opt_data, opt_ignored, opt_ijData);
				};
			}

			/**
    * Handles an intercepted soy template call. If the call is for a component's
    * main template, then it will be replaced with a call that incremental dom
    * can use for both handling an instance of that component and rendering it.
    * @param {!function()} originalFn The original template function that was
    *     intercepted.
    * @param {Object} data The data the template was called with.
    * @protected
    */

		}, {
			key: 'handleInterceptedCall_',
			value: function handleInterceptedCall_(originalFn) {
				var opt_data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

				var args = [originalFn.componentCtor, null, []];
				for (var key in opt_data) {
					args.push(key, opt_data[key]);
				}
				IncrementalDOM.elementVoid.apply(null, args);
			}
		}, {
			key: 'register',
			value: function register(componentCtor, templates) {
				var mainTemplate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'render';

				componentCtor.RENDERER = Soy;
				componentCtor.TEMPLATE = SoyAop.getOriginalFn(templates[mainTemplate]);
				componentCtor.TEMPLATE.componentCtor = componentCtor;
				SoyAop.registerForInterception(templates, mainTemplate);
				ComponentRegistry.register(componentCtor);
			}
		}, {
			key: 'setInjectedData',
			value: function setInjectedData(data) {
				ijData = data || {};
			}
		}, {
			key: 'toHtmlString',
			value: function toHtmlString(incDomFn) {
				var element = document.createElement('div');
				IncrementalDOM.patch(element, incDomFn);
				return element.innerHTML;
			}

			/**
    * Converts the given html string into an incremental dom function.
    * @param {string|{contentKind: string, content: string}} value
    * @return {!function()}
    */

		}, {
			key: 'toIncDom',
			value: function toIncDom(value) {
				if (isObject(value) && isString(value.content) && value.contentKind === 'HTML') {
					value = value.content;
				}
				if (isString(value)) {
					value = HTML2IncDom.buildFn(value);
				}
				return value;
			}
		}]);
		return Soy;
	}(IncrementalDomRenderer);

	Soy.RENDERER_NAME = 'soy';

	this['metal']['Soy'] = Soy;
	this['metalNamed']['Soy'] = this['metalNamed']['Soy'] || {};
	this['metalNamed']['Soy']['Soy'] = Soy;
	this['metalNamed']['Soy']['SoyAop'] = SoyAop;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from SSGNavigation.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace SSGNavigation.
     * @hassoydeltemplate {SSGNavigation.anchor.idom}
     * @hassoydelcall {SSGNavigation.anchor.idom}
     * @public
     */

    goog.module('SSGNavigation.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      var $$temp;
      var localAnchorVariant__soy3 = ($$temp = opt_data.anchorVariant) == null ? 'basic' : $$temp;
      var localCurrentDepth__soy4 = ($$temp = opt_data.currentDepth) == null ? 0 : $$temp;
      var localListItemActiveClasses__soy5 = ($$temp = opt_data.listItemActiveClasses) == null ? 'active' : $$temp;
      if (opt_data.section.children) {
        ie_open('ul', null, null, 'class', ($$temp = opt_data.elementClasses) == null ? '' : $$temp);
        var pageList32 = opt_data.section.children;
        var pageListLen32 = pageList32.length;
        for (var pageIndex32 = 0; pageIndex32 < pageListLen32; pageIndex32++) {
          var pageData32 = pageList32[pageIndex32];
          if (!pageData32.hidden) {
            ie_open('li', null, null, 'class', (($$temp = opt_data.listItemClasses) == null ? '' : $$temp) + (pageData32.active ? ' ' + localListItemActiveClasses__soy5 : ''));
            soy.$$getDelegateFn(soy.$$getDelTemplateId('SSGNavigation.anchor.idom'), localAnchorVariant__soy3, false)(soy.$$assignDefaults({ page: pageData32 }, opt_data), null, opt_ijData);
            if (!opt_data.depth || localCurrentDepth__soy4 + 1 < opt_data.depth) {
              $render({ anchorVariant: localAnchorVariant__soy3, currentDepth: localCurrentDepth__soy4 + 1, currentURL: opt_data.currentURL, depth: opt_data.depth, elementClasses: opt_data.elementClasses, linkClasses: opt_data.linkClasses, listItemActiveClasses: opt_data.listItemActiveClasses, listItemClasses: opt_data.listItemClasses, section: pageData32 }, null, opt_ijData);
            }
            ie_close('li');
          }
        }
        ie_close('ul');
      }
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'SSGNavigation.render';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function __deltemplate_s35_57c79033(opt_data, opt_ignored, opt_ijData) {
      var $$temp;
      if (opt_data.page.url) {
        ie_open('a', null, null, 'class', ($$temp = opt_data.linkClasses) == null ? '' : $$temp, 'href', opt_data.page.url);
        ie_open('span');
        var dyn0 = ($$temp = opt_data.page.title) == null ? 'Missing' : $$temp;
        if (typeof dyn0 == 'function') dyn0();else if (dyn0 != null) itext(dyn0);
        ie_close('span');
        ie_close('a');
      } else {
        ie_open('span', null, null, 'class', ($$temp = opt_data.linkClasses) == null ? '' : $$temp);
        var dyn1 = ($$temp = opt_data.page.title) == null ? 'Missing' : $$temp;
        if (typeof dyn1 == 'function') dyn1();else if (dyn1 != null) itext(dyn1);
        ie_close('span');
      }
    }
    exports.__deltemplate_s35_57c79033 = __deltemplate_s35_57c79033;
    if (goog.DEBUG) {
      __deltemplate_s35_57c79033.soyTemplateName = 'SSGNavigation.__deltemplate_s35_57c79033';
    }
    soy.$$registerDelegateFn(soy.$$getDelTemplateId('SSGNavigation.anchor.idom'), 'basic', 0, __deltemplate_s35_57c79033);

    exports.render.params = ["section", "anchorVariant", "currentDepth", "currentURL", "depth", "elementClasses", "linkClasses", "listItemActiveClasses", "listItemClasses"];
    exports.render.types = { "section": "any", "anchorVariant": "any", "currentDepth": "any", "currentURL": "any", "depth": "any", "elementClasses": "any", "linkClasses": "any", "listItemActiveClasses": "any", "listItemClasses": "any" };
    templates = exports;
    return exports;
  });

  var SSGNavigation = function (_Component) {
    babelHelpers.inherits(SSGNavigation, _Component);

    function SSGNavigation() {
      babelHelpers.classCallCheck(this, SSGNavigation);
      return babelHelpers.possibleConstructorReturn(this, (SSGNavigation.__proto__ || Object.getPrototypeOf(SSGNavigation)).apply(this, arguments));
    }

    return SSGNavigation;
  }(Component);

  Soy.register(SSGNavigation, templates);
  this['metalNamed']['SSGNavigation'] = this['metalNamed']['SSGNavigation'] || {};
  this['metalNamed']['SSGNavigation']['SSGNavigation'] = SSGNavigation;
  this['metalNamed']['SSGNavigation']['templates'] = templates;
  this['metal']['SSGNavigation'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var Component = this['metal']['component'];
	var Soy = this['metal']['Soy'];
	var templates = this['metal']['SSGNavigation'];

	var SSGNavigation = function (_Component) {
		babelHelpers.inherits(SSGNavigation, _Component);

		function SSGNavigation() {
			babelHelpers.classCallCheck(this, SSGNavigation);
			return babelHelpers.possibleConstructorReturn(this, (SSGNavigation.__proto__ || Object.getPrototypeOf(SSGNavigation)).apply(this, arguments));
		}

		babelHelpers.createClass(SSGNavigation, [{
			key: 'attached',
			value: function attached() {}
		}]);
		return SSGNavigation;
	}(Component);

	;

	Soy.register(SSGNavigation, templates);

	this['metal']['SSGNavigation'] = SSGNavigation;
}).call(this);
'use strict';

(function () {
	var Geometry = function () {
		function Geometry() {
			babelHelpers.classCallCheck(this, Geometry);
		}

		babelHelpers.createClass(Geometry, null, [{
			key: 'intersectRect',

			/**
      * Tests if a rectangle intersects with another.
      *
      * <pre>
      *  x0y0 --------       x2y2 --------
      *      |       |           |       |
      *      -------- x1y1       -------- x3y3
      * </pre>
      *
      * Note that coordinates starts from top to down (y), left to right (x):
      *
      * <pre>
      *      ------> (x)
      *      |
      *      |
      *     (y)
      * </pre>
      *
      * @param {number} x0 Horizontal coordinate of P0.
      * @param {number} y0 Vertical coordinate of P0.
      * @param {number} x1 Horizontal coordinate of P1.
      * @param {number} y1 Vertical coordinate of P1.
      * @param {number} x2 Horizontal coordinate of P2.
      * @param {number} y2 Vertical coordinate of P2.
      * @param {number} x3 Horizontal coordinate of P3.
      * @param {number} y3 Vertical coordinate of P3.
      * @return {boolean}
      */
			value: function intersectRect(x0, y0, x1, y1, x2, y2, x3, y3) {
				return !(x2 > x1 || x3 < x0 || y2 > y1 || y3 < y0);
			}
		}]);
		return Geometry;
	}();

	this['metal']['Geometry'] = Geometry;
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var Geometry = this['metal']['Geometry'];

	/**
  * Class with static methods responsible for doing browser position checks.
  */

	var Position = function () {
		function Position() {
			babelHelpers.classCallCheck(this, Position);
		}

		babelHelpers.createClass(Position, null, [{
			key: 'getClientHeight',

			/**
    * Gets the client height of the specified node. Scroll height is not
    * included.
    * @param {Element|Document|Window=} node
    * @return {number}
    */
			value: function getClientHeight(node) {
				return this.getClientSize_(node, 'Height');
			}

			/**
    * Gets the client height or width of the specified node. Scroll height is
    * not included.
    * @param {Element|Document|Window=} node
    * @param {string} `Width` or `Height` property.
    * @return {number}
    * @protected
    */

		}, {
			key: 'getClientSize_',
			value: function getClientSize_(node, prop) {
				var el = node;
				if (core.isWindow(node)) {
					el = node.document.documentElement;
				}
				if (core.isDocument(node)) {
					el = node.documentElement;
				}
				return el['client' + prop];
			}

			/**
    * Gets the client width of the specified node. Scroll width is not
    * included.
    * @param {Element|Document|Window=} node
    * @return {number}
    */

		}, {
			key: 'getClientWidth',
			value: function getClientWidth(node) {
				return this.getClientSize_(node, 'Width');
			}

			/**
    * Gets the region of the element, document or window.
    * @param {Element|Document|Window=} opt_element Optional element to test.
    * @return {!DOMRect} The returned value is a simulated DOMRect object which
    *     is the union of the rectangles returned by getClientRects() for the
    *     element, i.e., the CSS border-boxes associated with the element.
    * @protected
    */

		}, {
			key: 'getDocumentRegion_',
			value: function getDocumentRegion_(opt_element) {
				var height = this.getHeight(opt_element);
				var width = this.getWidth(opt_element);
				return this.makeRegion(height, height, 0, width, 0, width);
			}

			/**
    * Gets the height of the specified node. Scroll height is included.
    * @param {Element|Document|Window=} node
    * @return {number}
    */

		}, {
			key: 'getHeight',
			value: function getHeight(node) {
				return this.getSize_(node, 'Height');
			}

			/**
    * Gets the top offset position of the given node. This fixes the `offsetLeft` value of
    * nodes that were translated, which don't take that into account at all. That makes
    * the calculation more expensive though, so if you don't want that to be considered
    * either pass `opt_ignoreTransform` as true or call `offsetLeft` directly on the node.
    * @param {!Element} node
    * @param {boolean=} opt_ignoreTransform When set to true will ignore transform css
    *   when calculating the position. Defaults to false.
    * @return {number}
    */

		}, {
			key: 'getOffsetLeft',
			value: function getOffsetLeft(node, opt_ignoreTransform) {
				return node.offsetLeft + (opt_ignoreTransform ? 0 : Position.getTranslation(node).left);
			}

			/**
    * Gets the top offset position of the given node. This fixes the `offsetTop` value of
    * nodes that were translated, which don't take that into account at all. That makes
    * the calculation more expensive though, so if you don't want that to be considered
    * either pass `opt_ignoreTransform` as true or call `offsetTop` directly on the node.
    * @param {!Element} node
    * @param {boolean=} opt_ignoreTransform When set to true will ignore transform css
    *   when calculating the position. Defaults to false.
    * @return {number}
    */

		}, {
			key: 'getOffsetTop',
			value: function getOffsetTop(node, opt_ignoreTransform) {
				return node.offsetTop + (opt_ignoreTransform ? 0 : Position.getTranslation(node).top);
			}

			/**
    * Gets the size of an element and its position relative to the viewport.
    * @param {!Document|Element|Window} node
    * @param {boolean=} opt_includeScroll Flag indicating if the document scroll
    *   position should be considered in the element's region coordinates. Defaults
    *   to false.
    * @return {!DOMRect} The returned value is a DOMRect object which is the
    *     union of the rectangles returned by getClientRects() for the element,
    *     i.e., the CSS border-boxes associated with the element.
    */

		}, {
			key: 'getRegion',
			value: function getRegion(node, opt_includeScroll) {
				if (core.isDocument(node) || core.isWindow(node)) {
					return this.getDocumentRegion_(node);
				}
				return this.makeRegionFromBoundingRect_(node.getBoundingClientRect(), opt_includeScroll);
			}

			/**
    * Gets the scroll left position of the specified node.
    * @param {Element|Document|Window=} node
    * @return {number}
    */

		}, {
			key: 'getScrollLeft',
			value: function getScrollLeft(node) {
				if (core.isWindow(node)) {
					return node.pageXOffset;
				}
				if (core.isDocument(node)) {
					return node.defaultView.pageXOffset;
				}
				return node.scrollLeft;
			}

			/**
    * Gets the scroll top position of the specified node.
    * @param {Element|Document|Window=} node
    * @return {number}
    */

		}, {
			key: 'getScrollTop',
			value: function getScrollTop(node) {
				if (core.isWindow(node)) {
					return node.pageYOffset;
				}
				if (core.isDocument(node)) {
					return node.defaultView.pageYOffset;
				}
				return node.scrollTop;
			}

			/**
    * Gets the height or width of the specified node. Scroll height is
    * included.
    * @param {Element|Document|Window=} node
    * @param {string} `Width` or `Height` property.
    * @return {number}
    * @protected
    */

		}, {
			key: 'getSize_',
			value: function getSize_(node, prop) {
				if (core.isWindow(node)) {
					return this.getClientSize_(node, prop);
				}
				if (core.isDocument(node)) {
					var docEl = node.documentElement;
					return Math.max(node.body['scroll' + prop], docEl['scroll' + prop], node.body['offset' + prop], docEl['offset' + prop], docEl['client' + prop]);
				}
				return Math.max(node['client' + prop], node['scroll' + prop], node['offset' + prop]);
			}

			/**
    * Gets the transform matrix values for the given node.
    * @param {!Element} node
    * @return {Array<number>}
    */

		}, {
			key: 'getTransformMatrixValues',
			value: function getTransformMatrixValues(node) {
				var style = getComputedStyle(node);
				var transform = style.msTransform || style.transform || style.webkitTransform || style.mozTransform;
				if (transform !== 'none') {
					var values = [];
					var regex = /([\d-\.\s]+)/g;
					var matches = regex.exec(transform);
					while (matches) {
						values.push(matches[1]);
						matches = regex.exec(transform);
					}
					return values;
				}
			}

			/**
    * Gets the number of translated pixels for the given node, for both the top and
    * left positions.
    * @param {!Element} node
    * @return {number}
    */

		}, {
			key: 'getTranslation',
			value: function getTranslation(node) {
				var values = Position.getTransformMatrixValues(node);
				var translation = {
					left: 0,
					top: 0
				};
				if (values) {
					translation.left = parseFloat(values.length === 6 ? values[4] : values[13]);
					translation.top = parseFloat(values.length === 6 ? values[5] : values[14]);
				}
				return translation;
			}

			/**
    * Gets the width of the specified node. Scroll width is included.
    * @param {Element|Document|Window=} node
    * @return {number}
    */

		}, {
			key: 'getWidth',
			value: function getWidth(node) {
				return this.getSize_(node, 'Width');
			}

			/**
    * Tests if a region intersects with another.
    * @param {DOMRect} r1
    * @param {DOMRect} r2
    * @return {boolean}
    */

		}, {
			key: 'intersectRegion',
			value: function intersectRegion(r1, r2) {
				return Geometry.intersectRect(r1.top, r1.left, r1.bottom, r1.right, r2.top, r2.left, r2.bottom, r2.right);
			}

			/**
    * Tests if a region is inside another.
    * @param {DOMRect} r1
    * @param {DOMRect} r2
    * @return {boolean}
    */

		}, {
			key: 'insideRegion',
			value: function insideRegion(r1, r2) {
				return r2.top >= r1.top && r2.bottom <= r1.bottom && r2.right <= r1.right && r2.left >= r1.left;
			}

			/**
    * Tests if a region is inside viewport region.
    * @param {DOMRect} region
    * @return {boolean}
    */

		}, {
			key: 'insideViewport',
			value: function insideViewport(region) {
				return this.insideRegion(this.getRegion(window), region);
			}

			/**
    * Computes the intersection region between two regions.
    * @param {DOMRect} r1
    * @param {DOMRect} r2
    * @return {?DOMRect} Intersection region or null if regions doesn't
    *     intersects.
    */

		}, {
			key: 'intersection',
			value: function intersection(r1, r2) {
				if (!this.intersectRegion(r1, r2)) {
					return null;
				}
				var bottom = Math.min(r1.bottom, r2.bottom);
				var right = Math.min(r1.right, r2.right);
				var left = Math.max(r1.left, r2.left);
				var top = Math.max(r1.top, r2.top);
				return this.makeRegion(bottom, bottom - top, left, right, top, right - left);
			}

			/**
    * Makes a region object. It's a writable version of DOMRect.
    * @param {number} bottom
    * @param {number} height
    * @param {number} left
    * @param {number} right
    * @param {number} top
    * @param {number} width
    * @return {!DOMRect} The returned value is a DOMRect object which is the
    *     union of the rectangles returned by getClientRects() for the element,
    *     i.e., the CSS border-boxes associated with the element.
    */

		}, {
			key: 'makeRegion',
			value: function makeRegion(bottom, height, left, right, top, width) {
				return {
					bottom: bottom,
					height: height,
					left: left,
					right: right,
					top: top,
					width: width
				};
			}

			/**
    * Makes a region from a DOMRect result from `getBoundingClientRect`.
    * @param  {!DOMRect} The returned value is a DOMRect object which is the
    *     union of the rectangles returned by getClientRects() for the element,
    *     i.e., the CSS border-boxes associated with the element.
    * @param {boolean=} opt_includeScroll Flag indicating if the document scroll
    *   position should be considered in the element's region coordinates. Defaults
    *   to false.
    * @return {DOMRect} Writable version of DOMRect.
    * @protected
    */

		}, {
			key: 'makeRegionFromBoundingRect_',
			value: function makeRegionFromBoundingRect_(rect, opt_includeScroll) {
				var deltaX = opt_includeScroll ? Position.getScrollLeft(document) : 0;
				var deltaY = opt_includeScroll ? Position.getScrollTop(document) : 0;
				return this.makeRegion(rect.bottom + deltaY, rect.height, rect.left + deltaX, rect.right + deltaX, rect.top + deltaY, rect.width);
			}

			/**
    * Checks if the given point coordinates are inside a region.
    * @param {number} x
    * @param {number} y
    * @param {!Object} region
    * @return {boolean}
    */

		}, {
			key: 'pointInsideRegion',
			value: function pointInsideRegion(x, y, region) {
				return Position.insideRegion(region, Position.makeRegion(y, 0, x, x, y, 0));
			}
		}]);
		return Position;
	}();

	this['metal']['Position'] = Position;
}).call(this);
'use strict';

(function () {
	var Position = this['metal']['Position'];

	/**
  * Align utility. Computes region or best region to align an element with
  * another. Regions are relative to viewport, make sure to use element with
  * position fixed, or position absolute when the element first positioned
  * parent is the body element.
  */

	var Align = function () {
		function Align() {
			babelHelpers.classCallCheck(this, Align);
		}

		babelHelpers.createClass(Align, null, [{
			key: 'align',


			/**
    * Aligns the element with the best region around alignElement. The best
    * region is defined by clockwise rotation starting from the specified
    * `position`. The element is always aligned in the middle of alignElement
    * axis.
    * @param {!Element} element Element to be aligned.
    * @param {!Element} alignElement Element to align with.
    * @param {Align.Top|Align.Right|Align.Bottom|Align.Left} pos
    *     The initial position to try. Options `Align.Top`, `Align.Right`,
    *     `Align.Bottom`, `Align.Left`.
    * @return {string} The final chosen position for the aligned element.
    * @static
    */
			value: function align(element, alignElement, position) {
				var suggestion = this.suggestAlignBestRegion(element, alignElement, position);
				var bestRegion = suggestion.region;

				var computedStyle = window.getComputedStyle(element, null);
				if (computedStyle.getPropertyValue('position') !== 'fixed') {
					bestRegion.top += window.pageYOffset;
					bestRegion.left += window.pageXOffset;

					var offsetParent = element;
					while (offsetParent = offsetParent.offsetParent) {
						bestRegion.top -= Position.getOffsetTop(offsetParent);
						bestRegion.left -= Position.getOffsetLeft(offsetParent);
					}
				}

				element.style.top = bestRegion.top + 'px';
				element.style.left = bestRegion.left + 'px';
				return suggestion.position;
			}

			/**
    * Returns the best region to align element with alignElement. This is similar
    * to `Align.suggestAlignBestRegion`, but it only returns the region information,
    * while `Align.suggestAlignBestRegion` also returns the chosen position.
    * @param {!Element} element Element to be aligned.
    * @param {!Element} alignElement Element to align with.
    * @param {Align.Top|Align.Right|Align.Bottom|Align.Left} pos
    *     The initial position to try. Options `Align.Top`, `Align.Right`,
    *     `Align.Bottom`, `Align.Left`.
    * @return {DOMRect} Best region to align element.
    * @static
    */

		}, {
			key: 'getAlignBestRegion',
			value: function getAlignBestRegion(element, alignElement, position) {
				return Align.suggestAlignBestRegion(element, alignElement, position).region;
			}

			/**
    * Returns the region to align element with alignElement. The element is
    * always aligned in the middle of alignElement axis.
    * @param {!Element} element Element to be aligned.
    * @param {!Element} alignElement Element to align with.
    * @param {Align.Top|Align.Right|Align.Bottom|Align.Left} pos
    *     The position to align. Options `Align.Top`, `Align.Right`,
    *     `Align.Bottom`, `Align.Left`.
    * @return {DOMRect} Region to align element.
    * @static
    */

		}, {
			key: 'getAlignRegion',
			value: function getAlignRegion(element, alignElement, position) {
				var r1 = Position.getRegion(alignElement);
				var r2 = Position.getRegion(element);
				var top = 0;
				var left = 0;

				switch (position) {
					case Align.TopCenter:
						top = r1.top - r2.height;
						left = r1.left + r1.width / 2 - r2.width / 2;
						break;
					case Align.RightCenter:
						top = r1.top + r1.height / 2 - r2.height / 2;
						left = r1.left + r1.width;
						break;
					case Align.BottomCenter:
						top = r1.bottom;
						left = r1.left + r1.width / 2 - r2.width / 2;
						break;
					case Align.LeftCenter:
						top = r1.top + r1.height / 2 - r2.height / 2;
						left = r1.left - r2.width;
						break;
					case Align.TopRight:
						top = r1.top - r2.height;
						left = r1.right - r2.width;
						break;
					case Align.BottomRight:
						top = r1.bottom;
						left = r1.right - r2.width;
						break;
					case Align.BottomLeft:
						top = r1.bottom;
						left = r1.left;
						break;
					case Align.TopLeft:
						top = r1.top - r2.height;
						left = r1.left;
						break;
				}

				return {
					bottom: top + r2.height,
					height: r2.height,
					left: left,
					right: left + r2.width,
					top: top,
					width: r2.width
				};
			}

			/**
    * Checks if specified value is a valid position. Options `Align.Top`,
    *     `Align.Right`, `Align.Bottom`, `Align.Left`.
    * @param {Align.Top|Align.Right|Align.Bottom|Align.Left} val
    * @return {boolean} Returns true if value is a valid position.
    * @static
    */

		}, {
			key: 'isValidPosition',
			value: function isValidPosition(val) {
				return 0 <= val && val <= 8;
			}

			/**
    * Looks for the best region for aligning the given element. The best
    * region is defined by clockwise rotation starting from the specified
    * `position`. The element is always aligned in the middle of alignElement
    * axis.
    * @param {!Element} element Element to be aligned.
    * @param {!Element} alignElement Element to align with.
    * @param {Align.Top|Align.Right|Align.Bottom|Align.Left} pos
    *     The initial position to try. Options `Align.Top`, `Align.Right`,
    *     `Align.Bottom`, `Align.Left`.
    * @return {{position: string, region: DOMRect}} Best region to align element.
    * @static
    */

		}, {
			key: 'suggestAlignBestRegion',
			value: function suggestAlignBestRegion(element, alignElement, position) {
				var bestArea = 0;
				var bestPosition = position;
				var bestRegion = this.getAlignRegion(element, alignElement, bestPosition);
				var tryPosition = bestPosition;
				var tryRegion = bestRegion;
				var viewportRegion = Position.getRegion(window);

				for (var i = 0; i < 8;) {
					if (Position.intersectRegion(viewportRegion, tryRegion)) {
						var visibleRegion = Position.intersection(viewportRegion, tryRegion);
						var area = visibleRegion.width * visibleRegion.height;
						if (area > bestArea) {
							bestArea = area;
							bestRegion = tryRegion;
							bestPosition = tryPosition;
						}
						if (Position.insideViewport(tryRegion)) {
							break;
						}
					}
					tryPosition = (position + ++i) % 8;
					tryRegion = this.getAlignRegion(element, alignElement, tryPosition);
				}

				return {
					position: bestPosition,
					region: bestRegion
				};
			}
		}]);
		return Align;
	}();

	/**
  * Constants that represent the supported positions for `Align`.
  * @type {number}
  * @static
  */

	Align.TopCenter = 0;
	Align.TopRight = 1;
	Align.RightCenter = 2;
	Align.BottomRight = 3;
	Align.BottomCenter = 4;
	Align.BottomLeft = 5;
	Align.LeftCenter = 6;
	Align.TopLeft = 7;

	/**
  * Aliases for position constants.
  * @type {number}
  * @static
  */
	Align.Top = Align.TopCenter;
	Align.Right = Align.RightCenter;
	Align.Bottom = Align.BottomCenter;
	Align.Left = Align.LeftCenter;

	this['metal']['Align'] = Align;
}).call(this);
'use strict';

(function () {
  var Align = this['metal']['Align'];
  var Geometry = this['metal']['Geometry'];
  var Position = this['metal']['Position'];
  this['metal']['position'] = Position;
  this['metalNamed']['position'] = this['metalNamed']['position'] || {};
  this['metalNamed']['position']['Align'] = Align;
  this['metalNamed']['position']['Geometry'] = Geometry;
  this['metalNamed']['position']['Position'] = Position;
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var dom = this['metalNamed']['dom']['dom'];
	var DomEventEmitterProxy = this['metalNamed']['dom']['DomEventEmitterProxy'];
	var State = this['metal']['state'];
	var EventEmitter = this['metal']['events'];
	var Position = this['metal']['position'];

	/**
  * Affix utility.
  */

	var Affix = function (_State) {
		babelHelpers.inherits(Affix, _State);

		/**
   * @inheritDoc
   */
		function Affix(opt_config) {
			babelHelpers.classCallCheck(this, Affix);

			var _this = babelHelpers.possibleConstructorReturn(this, (Affix.__proto__ || Object.getPrototypeOf(Affix)).call(this, opt_config));

			if (!Affix.emitter_) {
				Affix.emitter_ = new EventEmitter();
				Affix.proxy_ = new DomEventEmitterProxy(document, Affix.emitter_, null, {
					scroll: true
				});
			}

			/**
    * Holds the last position.
    * @type {Position.Bottom|Position.Default|Position.Top}
    * @private
    */
			_this.lastPosition_ = null;

			/**
    * Holds event handle that listens scroll shared event emitter proxy.
    * @type {EventHandle}
    * @protected
    */
			_this.scrollHandle_ = Affix.emitter_.on('scroll', _this.checkPosition.bind(_this));

			_this.on('elementChanged', _this.checkPosition);
			_this.on('offsetTopChanged', _this.checkPosition);
			_this.on('offsetBottomChanged', _this.checkPosition);
			_this.checkPosition();
			return _this;
		}

		/**
   * @inheritDoc
   */


		babelHelpers.createClass(Affix, [{
			key: 'disposeInternal',
			value: function disposeInternal() {
				dom.removeClasses(this.element, Affix.Position.Bottom + ' ' + Affix.Position.Default + ' ' + Affix.Position.Top);
				this.scrollHandle_.dispose();
				babelHelpers.get(Affix.prototype.__proto__ || Object.getPrototypeOf(Affix.prototype), 'disposeInternal', this).call(this);
			}

			/**
    * Synchronize bottom, top and element regions and checks if position has
    * changed. If position has changed syncs position.
    */

		}, {
			key: 'checkPosition',
			value: function checkPosition() {
				if (this.intersectTopRegion()) {
					this.syncPosition(Affix.Position.Top);
				} else if (this.intersectBottomRegion()) {
					this.syncPosition(Affix.Position.Bottom);
				} else {
					this.syncPosition(Affix.Position.Default);
				}
			}

			/**
    * Whether the element is intersecting with bottom region defined by
    * offsetBottom.
    * @return {boolean}
    */

		}, {
			key: 'intersectBottomRegion',
			value: function intersectBottomRegion() {
				if (!core.isDef(this.offsetBottom)) {
					return false;
				}
				var clientHeight = Position.getHeight(this.scrollElement);
				var scrollElementClientHeight = Position.getClientHeight(this.scrollElement);
				return Position.getScrollTop(this.scrollElement) + scrollElementClientHeight >= clientHeight - this.offsetBottom;
			}

			/**
    * Whether the element is intersecting with top region defined by
    * offsetTop.
    * @return {boolean}
    */

		}, {
			key: 'intersectTopRegion',
			value: function intersectTopRegion() {
				if (!core.isDef(this.offsetTop)) {
					return false;
				}
				return Position.getScrollTop(this.scrollElement) <= this.offsetTop;
			}

			/**
    * Synchronizes element css classes to match with the specified position.
    * @param {Position.Bottom|Position.Default|Position.Top} position
    */

		}, {
			key: 'syncPosition',
			value: function syncPosition(position) {
				if (this.lastPosition_ !== position) {
					dom.addClasses(this.element, position);
					dom.removeClasses(this.element, this.lastPosition_);
					this.lastPosition_ = position;
				}
			}
		}]);
		return Affix;
	}(State);

	/**
  * Holds positions enum.
  * @enum {string}
  */


	Affix.Position = {
		Top: 'affix-top',
		Bottom: 'affix-bottom',
		Default: 'affix'
	};

	Affix.STATE = {
		/**
   * The scrollElement element to be used as scrollElement area for affix. The scrollElement is
   * where the scroll event is listened from.
   * @type {Element|Window}
   */
		scrollElement: {
			setter: dom.toElement,
			value: document
		},

		/**
   * Defines the offset bottom that triggers affix.
   * @type {number}
   */
		offsetTop: {
			validator: core.isNumber
		},

		/**
   * Defines the offset top that triggers affix.
   * @type {number}
   */
		offsetBottom: {
			validator: core.isNumber
		},

		/**
   * Element to be used as alignment reference of affix.
   * @type {Element}
   */
		element: {
			setter: dom.toElement
		}
	};

	this['metal']['Affix'] = Affix;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from ReadingProgress.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace ReadingProgress.
     * @public
     */

    goog.module('ReadingProgress.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'class', 'reading-progress' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''));
      ie_open('ul');
      var itemList8 = opt_data.items;
      var itemListLen8 = itemList8.length;
      for (var itemIndex8 = 0; itemIndex8 < itemListLen8; itemIndex8++) {
        var itemData8 = itemList8[itemIndex8];
        $item({ item: itemData8 }, null, opt_ijData);
      }
      ie_close('ul');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'ReadingProgress.render';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $item(opt_data, opt_ignored, opt_ijData) {
      ie_open('li');
      ie_open('a', null, null, 'href', opt_data.item.href);
      if (opt_data.item.title) {
        ie_open('span', null, null, 'class', 'reading-title');
        itext((goog.asserts.assert(opt_data.item.title != null), opt_data.item.title));
        ie_close('span');
      }
      if (opt_data.item.time) {
        ie_open('span', null, null, 'class', 'reading-subtitle');
        itext((goog.asserts.assert((opt_data.item.time < 60 ? opt_data.item.time + ' sec read' : Math.round(opt_data.item.time / 60) + ' min read') != null), opt_data.item.time < 60 ? opt_data.item.time + ' sec read' : Math.round(opt_data.item.time / 60) + ' min read'));
        ie_close('span');
      }
      ie_open('svg', null, null, 'x', '0px', 'y', '0px', 'width', '36px', 'height', '36px', 'viewBox', '0 0 36 36');
      ie_void('circle', null, null, 'fill', 'none', 'stroke-width', '2', 'cx', '18', 'cy', '18', 'r', '16', 'stroke-dasharray', '100 100', 'transform', 'rotate(-90 18 18)');
      ie_close('svg');
      ie_close('a');
      ie_close('li');
    }
    exports.item = $item;
    if (goog.DEBUG) {
      $item.soyTemplateName = 'ReadingProgress.item';
    }

    exports.render.params = ["elementClasses", "items"];
    exports.render.types = { "elementClasses": "any", "items": "any" };
    exports.item.params = ["item"];
    exports.item.types = { "item": "any" };
    templates = exports;
    return exports;
  });

  var ReadingProgress = function (_Component) {
    babelHelpers.inherits(ReadingProgress, _Component);

    function ReadingProgress() {
      babelHelpers.classCallCheck(this, ReadingProgress);
      return babelHelpers.possibleConstructorReturn(this, (ReadingProgress.__proto__ || Object.getPrototypeOf(ReadingProgress)).apply(this, arguments));
    }

    return ReadingProgress;
  }(Component);

  Soy.register(ReadingProgress, templates);
  this['metalNamed']['ReadingProgress'] = this['metalNamed']['ReadingProgress'] || {};
  this['metalNamed']['ReadingProgress']['ReadingProgress'] = ReadingProgress;
  this['metalNamed']['ReadingProgress']['templates'] = templates;
  this['metal']['ReadingProgress'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var dom = this['metal']['dom'];
	var Position = this['metal']['position'];
	var State = this['metal']['state'];

	/**
  * Scrollspy utility.
  */

	var Scrollspy = function (_State) {
		babelHelpers.inherits(Scrollspy, _State);

		/**
   * @inheritDoc
   */
		function Scrollspy(opt_config) {
			babelHelpers.classCallCheck(this, Scrollspy);

			/**
    * Holds the regions cache.
    * @type {!Array}
    * @private
    * @default []
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (Scrollspy.__proto__ || Object.getPrototypeOf(Scrollspy)).call(this, opt_config));

			_this.regions = [];

			/**
    * Holds event handle that listens scroll shared event emitter proxy.
    * @type {!EventHandle}
    * @protected
    */
			_this.scrollHandle_ = dom.on(_this.scrollElement, 'scroll', _this.checkPosition.bind(_this));

			_this.init();
			return _this;
		}

		/**
   * @inheritDoc
   */


		babelHelpers.createClass(Scrollspy, [{
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.deactivateAll();
				this.scrollHandle_.dispose();
				babelHelpers.get(Scrollspy.prototype.__proto__ || Object.getPrototypeOf(Scrollspy.prototype), 'disposeInternal', this).call(this);
			}

			/**
    * Activates index matching element.
    * @param {number} index
    */

		}, {
			key: 'activate',
			value: function activate(index) {
				if (this.activeIndex >= 0) {
					this.deactivate(this.activeIndex);
				}
				this.activeIndex = index;
				dom.addClasses(this.getElementForIndex(index), this.activeClass);
			}

			/**
    * Checks position of elements and activate the one in region.
    */

		}, {
			key: 'checkPosition',
			value: function checkPosition() {
				var scrollHeight = this.getScrollHeight_();
				var scrollTop = Position.getScrollTop(this.scrollElement);

				if (scrollHeight < scrollTop + this.offset) {
					this.activate(this.regions.length - 1);
					return;
				}

				var index = this.findBestRegionAt_();
				if (index !== this.activeIndex) {
					if (index === -1) {
						this.deactivateAll();
					} else {
						this.activate(index);
					}
				}
			}

			/**
    * Deactivates index matching element.
    * @param {number} index
    */

		}, {
			key: 'deactivate',
			value: function deactivate(index) {
				dom.removeClasses(this.getElementForIndex(index), this.activeClass);
			}

			/**
    * Deactivates all elements.
    */

		}, {
			key: 'deactivateAll',
			value: function deactivateAll() {
				for (var i = 0; i < this.regions.length; i++) {
					this.deactivate(i);
				}
				this.activeIndex = -1;
			}

			/**
    * Finds best region to activate.
    * @return {number} The index of best region found.
    */

		}, {
			key: 'findBestRegionAt_',
			value: function findBestRegionAt_() {
				var index = -1;
				var origin = this.getCurrentPosition();
				if (this.regions.length > 0 && origin >= this.regions[0].top) {
					for (var i = 0; i < this.regions.length; i++) {
						var region = this.regions[i];
						var lastRegion = i === this.regions.length - 1;
						if (origin >= region.top && (lastRegion || origin < this.regions[i + 1].top)) {
							index = i;
							break;
						}
					}
				}
				return index;
			}

			/**
    * Gets the current position in the page.
    * @return {number}
    */

		}, {
			key: 'getCurrentPosition',
			value: function getCurrentPosition() {
				var scrollTop = Position.getScrollTop(this.scrollElement);
				return scrollTop + this.offset + this.scrollElementRegion_.top;
			}

			/**
    * Returns the element that should be used for the link at the given index.
    * @param {number} index
    * @return {!Element}
    */

		}, {
			key: 'getElementForIndex',
			value: function getElementForIndex(index) {
				return this.resolveElement(this.regions[index].link);
			}

			/**
    * Gets the scroll height of `scrollElement`.
    * @return {number}
    * @protected
    */

		}, {
			key: 'getScrollHeight_',
			value: function getScrollHeight_() {
				var scrollHeight = Position.getHeight(this.scrollElement);
				scrollHeight += this.scrollElementRegion_.top;
				scrollHeight -= Position.getClientHeight(this.scrollElement);
				return scrollHeight;
			}

			/**
    * Initializes the behavior of scrollspy. It's important to have this as a
    * separate function so subclasses can override it (babel doesn't allow using
    * `this` on constructors before calling `super()`).
    */

		}, {
			key: 'init',
			value: function init() {
				this.refresh();
				this.on('elementChanged', this.refresh);
				this.on('offsetChanged', this.checkPosition);
				this.on('scrollElementChanged', this.onScrollElementChanged_);
				this.on('selectorChanged', this.refresh);
			}

			/**
    * Fired when the value of the `scrollElement` state changes.
    * Refreshes the spy and updates the event handler to listen to the new scroll element.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'onScrollElementChanged_',
			value: function onScrollElementChanged_(event) {
				this.refresh();

				this.scrollHandle_.dispose();
				this.scrollHandle_ = dom.on(event.newVal, 'scroll', this.checkPosition.bind(this));
			}

			/**
    * Refreshes all regions from document. Relevant when spying elements that
    * nodes can be added and removed.
    */

		}, {
			key: 'refresh',
			value: function refresh() {
				// Removes the "active" class from all current regions.
				this.deactivateAll();

				this.scrollElementRegion_ = Position.getRegion(this.scrollElement);
				this.scrollHeight_ = this.getScrollHeight_();

				this.regions = [];
				var links = this.element.querySelectorAll(this.selector);
				var scrollTop = Position.getScrollTop(this.scrollElement);
				for (var i = 0; i < links.length; ++i) {
					var link = links[i];
					if (link.hash && link.hash.length > 1) {
						var element = document.getElementById(link.hash.substring(1));
						if (element) {
							var region = Position.getRegion(element);
							this.regions.push({
								link: link,
								top: region.top + scrollTop,
								bottom: region.bottom + scrollTop
							});
						}
					}
				}
				this.sortRegions_();

				// Removes the "active" class from all new regions and then activate the right one for
				// the current position.
				this.deactivateAll();
				this.checkPosition();
			}

			/**
    * Sorts regions from lower to higher on y-axis.
    * @protected
    */

		}, {
			key: 'sortRegions_',
			value: function sortRegions_() {
				this.regions.sort(function (a, b) {
					return a.top - b.top;
				});
			}
		}]);
		return Scrollspy;
	}(State);

	Scrollspy.STATE = {
		/**
   * Class to be used as active class.
   * @type {string}
   */
		activeClass: {
			validator: core.isString,
			value: 'active'
		},

		/**
   * The index of the currently active link.
   * @type {number}
   */
		activeIndex: {
			validator: core.isNumber,
			value: -1
		},

		/**
   * Function that receives the matching element as argument and return
   * itself. Relevant when the `activeClass` must be applied to a different
   * element, e.g. a parentNode.
   * @type {function}
   * @default core.identityFunction
   */
		resolveElement: {
			validator: core.isFunction,
			value: core.identityFunction
		},

		/**
   * The scrollElement element to be used as scrollElement area for scrollspy.
   * The scrollElement is where the scroll event is listened from.
   * @type {Element|Window}
   */
		scrollElement: {
			setter: dom.toElement,
			value: document
		},

		/**
   * Defines the offset that triggers scrollspy.
   * @type {number}
   * @default 0
   */
		offset: {
			validator: core.isNumber,
			value: 0
		},

		/**
   * Element to be used as alignment reference of scrollspy.
   * @type {Element}
   */
		element: {
			setter: dom.toElement
		},

		/**
   * Selector to query elements inside `element` to be activated.
   * @type {Element}
   * @default 'a'
   */
		selector: {
			validator: core.isString,
			value: 'a'
		}
	};

	this['metal']['Scrollspy'] = Scrollspy;
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var dom = this['metal']['dom'];
	var Scrollspy = this['metal']['Scrollspy'];

	/**
  * A Scrollspy implementation that also tracks the percentage of the text that
  * has already been covered by the scrolling, instead of just marking the one
  * being currently viewed.
  */

	var ReadingProgressTracker = function (_Scrollspy) {
		babelHelpers.inherits(ReadingProgressTracker, _Scrollspy);

		function ReadingProgressTracker() {
			babelHelpers.classCallCheck(this, ReadingProgressTracker);
			return babelHelpers.possibleConstructorReturn(this, (ReadingProgressTracker.__proto__ || Object.getPrototypeOf(ReadingProgressTracker)).apply(this, arguments));
		}

		babelHelpers.createClass(ReadingProgressTracker, [{
			key: 'init',

			/**
    * Initializes the main behavior. This is being overriden instead of the
    * constructor because the events need to be attached before the `Scrollspy`
    * super class init code runs. Unfortunately, it's not possible to reference
    * `this` before calling `super` on ES2015 constructors (compilers like babel
    * throw errors).
    * @override
    */
			value: function init() {
				this.on('activeIndexChanged', this.handleActiveIndexChanged);
				this.on('progressChanged', this.handleProgressChanged);

				babelHelpers.get(ReadingProgressTracker.prototype.__proto__ || Object.getPrototypeOf(ReadingProgressTracker.prototype), 'init', this).call(this);
			}

			/**
    * Overrides the original method from `Scrollspy` to also calculate the
    * reading progress of the currently active link.
    */

		}, {
			key: 'checkPosition',
			value: function checkPosition() {
				babelHelpers.get(ReadingProgressTracker.prototype.__proto__ || Object.getPrototypeOf(ReadingProgressTracker.prototype), 'checkPosition', this).call(this);
				this.updateProgress();
			}

			/**
    * Handles the `activeIndexChanged` event. Removes reading progress information
    * from the previously active link and updates the markup of links according
    * to their completion state.
    * @param {!Object} data
    */

		}, {
			key: 'handleActiveIndexChanged',
			value: function handleActiveIndexChanged(data) {
				if (core.isDef(data.prevVal) && data.prevVal >= 0) {
					var prevElement = this.getElementForIndex(data.prevVal);
					prevElement.removeAttribute('data-reading-progress');
				}
				this.updateCompleted();
			}

			/**
    * Handles the `progressChanged` event. Updates the `data-reading-progress`
    * attribute of the currently active link.
    * @param {!Object} data
    */

		}, {
			key: 'handleProgressChanged',
			value: function handleProgressChanged(data) {
				var element = this.getElementForIndex(this.activeIndex);
				element.setAttribute('data-reading-progress', data.newVal);
				if (data.newVal < 100) {
					dom.removeClasses(element, this.completedClass);
				} else {
					dom.addClasses(element, this.completedClass);
				}
			}

			/**
    * Updates the links with the class specified by the `completedClass`
    * attribute, adding it to the links that have been scrolled through and
    * removing from the links that haven't.
    */

		}, {
			key: 'updateCompleted',
			value: function updateCompleted() {
				for (var i = 0; i < this.regions.length; i++) {
					var element = this.resolveElement(this.regions[i].link);
					if (i < this.activeIndex) {
						dom.addClasses(element, this.completedClass);
					} else {
						dom.removeClasses(element, this.completedClass);
					}
				}
			}

			/**
    * Updates the current reading progress value.
    */

		}, {
			key: 'updateProgress',
			value: function updateProgress() {
				var index = this.activeIndex;
				if (index >= 0) {
					var region = this.regions[index];
					var position = this.getCurrentPosition();
					var maxBottom = this.getScrollHeight_() + this.offset;
					var bottom = Math.min(maxBottom, region.bottom);
					this.progress = Math.min(100 * (position - region.top) / (bottom - region.top), 100);
				}
			}
		}]);
		return ReadingProgressTracker;
	}(Scrollspy);

	/**
  * ReadingProgressTracker' state config.
  * @type {!Object}
  */


	ReadingProgressTracker.STATE = {
		/**
   * The CSS class that will be added to links that reach 100% percentage.
   * @type {string}
   */
		completedClass: {
			validator: core.isString,
			value: 'reading-progress-completed'
		},

		/**
   * The reading progress for the currently active link, in percentage.
   * @type {number}
   */
		progress: {
			validator: core.isNumber,
			value: 0
		}
	};

	this['metal']['ReadingProgressTracker'] = ReadingProgressTracker;
}).call(this);
'use strict';

(function () {
	var core = this['metalNamed']['metal']['core'];
	var object = this['metalNamed']['metal']['object'];
	var templates = this['metal']['ReadingProgress'];
	var Component = this['metal']['component'];
	var ReadingProgressTracker = this['metal']['ReadingProgressTracker'];
	var Soy = this['metal']['Soy'];

	/**
  * This components renders a list of links to contents on the page. These links
  * show the reading progress for these contents, as well as the expected time
  * for reading them.
  */

	var ReadingProgress = function (_Component) {
		babelHelpers.inherits(ReadingProgress, _Component);

		function ReadingProgress() {
			babelHelpers.classCallCheck(this, ReadingProgress);
			return babelHelpers.possibleConstructorReturn(this, (ReadingProgress.__proto__ || Object.getPrototypeOf(ReadingProgress)).apply(this, arguments));
		}

		babelHelpers.createClass(ReadingProgress, [{
			key: 'disposed',

			/**
    * @inheritDoc
    */
			value: function disposed() {
				this.tracker_ && this.tracker_.dispose();
			}

			/**
    * Generates any data that is missing from the given item config object.
    * @param {!Object}
    */

		}, {
			key: 'generateItemMissingData_',
			value: function generateItemMissingData_(item) {
				if (item.href[0] !== '#') {
					// We only generate data for items that use hash links, since we use
					// the contents of the referenced element for that.
					return;
				}

				var element = document.getElementById(item.href.substr(1));
				if (!item.title) {
					item.title = element.querySelector(this.titleSelector).textContent;
				}
				if (!item.time) {
					var charCount = element.textContent.length;
					item.time = Math.round(charCount * 60 / 1500); // Assumes 1500 chars/min
				}
			}

			/**
    * Gets the `ReadingProgressTracker` instance being used.
    * @return {ReadingProgressTracker}
    */

		}, {
			key: 'getTracker',
			value: function getTracker() {
				return this.tracker_;
			}

			/**
    * Handles the `rendered` lifecycle. Creates the `ReadingProgressTracker`
    * instance that will be used to calculate reading progress value used by the
    * ui.
    * @protected
    */

		}, {
			key: 'rendered',
			value: function rendered(firstRender) {
				if (firstRender) {
					this.tracker_ = new ReadingProgressTracker(object.mixin({
						element: this.element
					}, this.trackerConfig));
					this.tracker_.on('progressChanged', this.updateProgress.bind(this));
					this.updateProgress();
				}
			}

			/**
    * Setter function for the `items` attribute. Converts items to the expected
    * format, generating any info that is not given.
    * @param {!Array<string|!{href: string, title: ?string, time: ?string}>} items
    * @return {!{href: string, title: string, time: string}}
    * @protected
    */

		}, {
			key: 'setterItemsFn_',
			value: function setterItemsFn_(items) {
				for (var i = 0; i < items.length; i++) {
					if (core.isString(items[i])) {
						items[i] = {
							href: items[i]
						};
					}
					this.generateItemMissingData_(items[i]);
				}
				return items;
			}

			/**
    * Updates the UI according to the new progress value.
    */

		}, {
			key: 'updateProgress',
			value: function updateProgress() {
				var activeIndex = this.tracker_.activeIndex;
				if (activeIndex >= 0) {
					var link = this.tracker_.getElementForIndex(activeIndex);
					link.querySelector('circle').setAttribute('stroke-dashoffset', 100 - this.tracker_.progress);
				}
			}
		}]);
		return ReadingProgress;
	}(Component);

	Soy.register(ReadingProgress, templates);

	/**
  * `ReadingProgress`'s state configuration.
  */
	ReadingProgress.STATE = {
		/**
   * An array of items representing links to the elements in the page that this
   * component should track reading progress for. This can either be an array of
   * href strings, or an object with more specific configuration for each item,
   * as follows:
   *   - href: The link this item refers to.
   *   - title: Optional. The title of the item.
   *   - time: Optional. The expected time, in seconds, for reading this item.
   * Optional info that is not given will be generated by analizyng the contents
   * of the elements that are being linked to.
   * @type {!Array<string|!{href: string, title: ?string, time: ?string}>}
   */
		items: {
			setter: 'setterItemsFn_',
			validator: Array.isArray
		},

		/**
   * The DOM selector to be used for finding the titles to be used by the items,
   * when they're not given via the `items` attribute.
   * @type {string}
   */
		titleSelector: {
			validator: core.isString,
			value: 'h1'
		},

		/**
   * A configuration object to be used when creating the `ReadingProgressTracker`.
   * @type {Object}
   */
		trackerConfig: {
			validator: core.isObject,
			writeOnce: true
		}
	};

	this['metal']['ReadingProgress'] = ReadingProgress;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from SSGReadingProgress.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace SSGReadingProgress.
     * @public
     */

    goog.module('SSGReadingProgress.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      ie_open('div', null, null, 'class', 'affix-top' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''));
      ie_void('div', null, null, 'ref', 'readingContainer');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'SSGReadingProgress.render';
    }

    exports.render.params = ["elementClasses"];
    exports.render.types = { "elementClasses": "any" };
    templates = exports;
    return exports;
  });

  var SSGReadingProgress = function (_Component) {
    babelHelpers.inherits(SSGReadingProgress, _Component);

    function SSGReadingProgress() {
      babelHelpers.classCallCheck(this, SSGReadingProgress);
      return babelHelpers.possibleConstructorReturn(this, (SSGReadingProgress.__proto__ || Object.getPrototypeOf(SSGReadingProgress)).apply(this, arguments));
    }

    return SSGReadingProgress;
  }(Component);

  Soy.register(SSGReadingProgress, templates);
  this['metalNamed']['SSGReadingProgress'] = this['metalNamed']['SSGReadingProgress'] || {};
  this['metalNamed']['SSGReadingProgress']['SSGReadingProgress'] = SSGReadingProgress;
  this['metalNamed']['SSGReadingProgress']['templates'] = templates;
  this['metal']['SSGReadingProgress'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var Affix = this['metal']['Affix'];
	var Component = this['metal']['component'];
	var core = this['metal']['metal'];
	var dom = this['metal']['dom'];
	var ReadingProgress = this['metal']['ReadingProgress'];
	var Soy = this['metal']['Soy'];
	var templates = this['metal']['SSGReadingProgress'];

	var SSGReadingProgress = function (_Component) {
		babelHelpers.inherits(SSGReadingProgress, _Component);

		function SSGReadingProgress() {
			babelHelpers.classCallCheck(this, SSGReadingProgress);
			return babelHelpers.possibleConstructorReturn(this, (SSGReadingProgress.__proto__ || Object.getPrototypeOf(SSGReadingProgress)).apply(this, arguments));
		}

		babelHelpers.createClass(SSGReadingProgress, [{
			key: 'attached',
			value: function attached() {
				this.renderReadingProgress_();
			}
		}, {
			key: 'renderReadingProgress_',
			value: function renderReadingProgress_() {
				var articleContainer = this.articleContainer,
				    articleSelector = this.articleSelector,
				    element = this.element,
				    offsetTop = this.offsetTop,
				    titleSelector = this.titleSelector;


				if (articleContainer) {
					var articles = articleContainer.querySelectorAll(articleSelector);

					var articleIds = [].map.call(articles, function (article) {
						return '#' + article.id;
					});

					this.progress = new metal.ReadingProgress({
						items: articleIds,
						titleSelector: titleSelector,
						trackerConfig: {
							activeClass: 'reading',
							completedClass: 'read'
						}
					}, this.refs.readingContainer);

					this.affix = new metal.Affix({
						element: element,
						offsetTop: offsetTop
					});
				}
			}
		}]);
		return SSGReadingProgress;
	}(Component);

	;

	SSGReadingProgress.STATE = {
		articleContainer: {
			setter: dom.toElement,
			value: '.docs-guide'
		},

		articleSelector: {
			validator: core.isString,
			value: 'article'
		},

		offsetTop: {
			validator: core.isNumber,
			value: 230
		},

		titleSelector: {
			validator: core.isString,
			value: 'h2'
		}
	};

	Soy.register(SSGReadingProgress, templates);

	this['metal']['SSGReadingProgress'] = SSGReadingProgress;
}).call(this);
'use strict';

(function () {
	var Component = this['metal']['component'];
	var core = this['metal']['metal'];

	var SSGSearchBase = function (_Component) {
		babelHelpers.inherits(SSGSearchBase, _Component);

		function SSGSearchBase() {
			babelHelpers.classCallCheck(this, SSGSearchBase);
			return babelHelpers.possibleConstructorReturn(this, (SSGSearchBase.__proto__ || Object.getPrototypeOf(SSGSearchBase)).apply(this, arguments));
		}

		babelHelpers.createClass(SSGSearchBase, [{
			key: 'attached',
			value: function attached() {
				this.on('queryChanged', this.handleQueryChange_.bind(this));
			}
		}, {
			key: 'filterResults_',
			value: function filterResults_(data, query) {
				var _this2 = this;

				var children = data.children,
				    description = data.description,
				    hidden = data.hidden,
				    title = data.title;


				var results = [];

				description = description ? description.toLowerCase() : '';
				title = title ? title.toLowerCase() : '';

				if (!hidden && title.indexOf(query) > -1 || description.indexOf(query) > -1) {
					results.push(data);
				}

				if (children) {
					children.forEach(function (child) {
						results = results.concat(_this2.filterResults_(child, query));
					});
				}

				return results;
			}
		}, {
			key: 'handleQueryChange_',
			value: function handleQueryChange_(_ref) {
				var newVal = _ref.newVal;

				this.results = this.search_(newVal);
			}
		}, {
			key: 'search_',
			value: function search_(query) {
				var maxResults = this.maxResults,
				    section = this.section;


				var results = [];

				if (section && query) {
					results = this.filterResults_(section, query.toLowerCase());

					if (results.length > maxResults) {
						results = results.slice(0, maxResults);
					}
				}

				return results;
			}
		}]);
		return SSGSearchBase;
	}(Component);

	;

	SSGSearchBase.STATE = {
		maxResults: {
			validator: core.isNumber,
			value: 4
		},

		query: {
			validator: core.isString,
			value: ''
		},

		results: {
			validator: core.isArray,
			value: []
		},

		section: {
			validator: core.isObject
		}
	};

	this['metal']['SSGSearchBase'] = SSGSearchBase;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from SSGSearch.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace SSGSearch.
     * @public
     */

    goog.module('SSGSearch.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      ie_open('div', null, null, 'class', 'search');
      $form(opt_data, null, opt_ijData);
      $results(opt_data, null, opt_ijData);
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'SSGSearch.render';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $form(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      ie_open('form', null, null, 'class', 'docs-home-top-form', 'action', opt_data.action, 'method', 'GET', 'enctype', 'multipart/form-data');
      ie_open('div', null, null, 'class', 'row');
      ie_open('div', null, null, 'class', 'col-md-7 col-md-offset-3 col-xs-16');
      ie_open('div', null, null, 'class', 'form-group');
      ie_open('div', null, null, 'class', 'input-inner-addon input-inner-addon-right');
      ie_open('input', null, null, 'autocomplete', 'off', 'class', 'form-control', 'name', 'q', 'onInput', 'handleInput_', 'placeholder', opt_data.placeholder, 'value', opt_data.query, 'type', 'text');
      ie_close('input');
      ie_void('span', null, null, 'class', 'input-inner-icon-helper icon-16-magnifier');
      ie_close('div');
      ie_close('div');
      ie_close('div');
      ie_open('div', null, null, 'class', 'col-md-3 col-xs-16');
      ie_open('button', null, null, 'class', 'btn btn-accent btn-block', 'type', 'submit');
      itext('Search');
      ie_close('button');
      ie_close('div');
      ie_close('div');
      ie_close('form');
    }
    exports.form = $form;
    if (goog.DEBUG) {
      $form.soyTemplateName = 'SSGSearch.form';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $results(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      ie_open('div', null, null, 'class', 'search-result-container');
      if (opt_data.query) {
        ie_open('p', null, null, 'class', 'search-result-summary');
        itext('Showing ');
        var dyn2 = opt_data.results.length;
        if (typeof dyn2 == 'function') dyn2();else if (dyn2 != null) itext(dyn2);
        itext(' results for ');
        ie_open('strong');
        itext('"');
        var dyn3 = opt_data.query;
        if (typeof dyn3 == 'function') dyn3();else if (dyn3 != null) itext(dyn3);
        itext('"');
        ie_close('strong');
        ie_close('p');
      }
      if (opt_data.results) {
        var resultList94 = opt_data.results;
        var resultListLen94 = resultList94.length;
        for (var resultIndex94 = 0; resultIndex94 < resultListLen94; resultIndex94++) {
          var resultData94 = resultList94[resultIndex94];
          ie_open('div', null, null, 'class', 'search-result');
          if (resultData94.icon) {
            ie_open('div', null, null, 'class', 'search-result-icon');
            ie_void('span', null, null, 'class', 'icon-16-' + resultData94.icon);
            ie_close('div');
          }
          ie_open('a', null, null, 'class', 'search-result-link', 'href', resultData94.url);
          var dyn4 = resultData94.title;
          if (typeof dyn4 == 'function') dyn4();else if (dyn4 != null) itext(dyn4);
          ie_close('a');
          ie_open('p', null, null, 'class', 'search-result-text');
          var dyn5 = resultData94.description;
          if (typeof dyn5 == 'function') dyn5();else if (dyn5 != null) itext(dyn5);
          ie_close('p');
          ie_close('div');
        }
      }
      ie_close('div');
    }
    exports.results = $results;
    if (goog.DEBUG) {
      $results.soyTemplateName = 'SSGSearch.results';
    }

    exports.render.params = ["action", "placeholder", "query", "results"];
    exports.render.types = { "action": "any", "placeholder": "any", "query": "any", "results": "any" };
    exports.form.params = ["action", "placeholder", "query"];
    exports.form.types = { "action": "any", "placeholder": "any", "query": "any" };
    exports.results.params = ["results", "query"];
    exports.results.types = { "results": "any", "query": "any" };
    templates = exports;
    return exports;
  });

  var SSGSearch = function (_Component) {
    babelHelpers.inherits(SSGSearch, _Component);

    function SSGSearch() {
      babelHelpers.classCallCheck(this, SSGSearch);
      return babelHelpers.possibleConstructorReturn(this, (SSGSearch.__proto__ || Object.getPrototypeOf(SSGSearch)).apply(this, arguments));
    }

    return SSGSearch;
  }(Component);

  Soy.register(SSGSearch, templates);
  this['metalNamed']['SSGSearch'] = this['metalNamed']['SSGSearch'] || {};
  this['metalNamed']['SSGSearch']['SSGSearch'] = SSGSearch;
  this['metalNamed']['SSGSearch']['templates'] = templates;
  this['metal']['SSGSearch'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var Soy = this['metal']['Soy'];
	var SSGSearchBase = this['metal']['SSGSearchBase'];
	var templates = this['metal']['SSGSearch'];

	var SSGSearch = function (_SSGSearchBase) {
		babelHelpers.inherits(SSGSearch, _SSGSearchBase);

		function SSGSearch() {
			babelHelpers.classCallCheck(this, SSGSearch);
			return babelHelpers.possibleConstructorReturn(this, (SSGSearch.__proto__ || Object.getPrototypeOf(SSGSearch)).apply(this, arguments));
		}

		babelHelpers.createClass(SSGSearch, [{
			key: 'attached',
			value: function attached() {
				SSGSearchBase.prototype.attached.apply(this);

				var queryString = window.location.search;
				var queryIndex = queryString.indexOf('q=');

				if (queryIndex !== -1) {
					this.query = queryString.substr(queryIndex + 2);
				}
			}
		}, {
			key: 'handleInput_',
			value: function handleInput_(event) {
				var target = event.target;


				this.query = target.value;
			}
		}]);
		return SSGSearch;
	}(SSGSearchBase);

	;

	Soy.register(SSGSearch, templates);

	this['metal']['SSGSearch'] = SSGSearch;
}).call(this);
'use strict';

/**
  * Debounces function execution.
  * @param {!function()} fn
  * @param {number} delay
  * @return {!function()}
  */

(function () {
	function debounce(fn, delay) {
		return function debounced() {
			var args = arguments;
			cancelDebounce(debounced);
			debounced.id = setTimeout(function () {
				fn.apply(null, args);
			}, delay);
		};
	}

	/**
  * Cancels the scheduled debounced function.
  */
	function cancelDebounce(debounced) {
		clearTimeout(debounced.id);
	}

	this['metal']['debounce'] = debounce;
	this['metalNamed']['debounce'] = this['metalNamed']['debounce'] || {};
	this['metalNamed']['debounce']['cancelDebounce'] = cancelDebounce;
	this['metalNamed']['debounce']['debounce'] = debounce;
}).call(this);
/*!
 * Promises polyfill from Google's Closure Library.
 *
 *      Copyright 2013 The Closure Library Authors. All Rights Reserved.
 *
 * NOTE(eduardo): Promise support is not ready on all supported browsers,
 * therefore metal-promise is temporarily using Google's promises as polyfill.
 * It supports cancellable promises and has clean and fast implementation.
 */

'use strict';

(function () {
  var isDef = this['metalNamed']['metal']['isDef'];
  var isFunction = this['metalNamed']['metal']['isFunction'];
  var isObject = this['metalNamed']['metal']['isObject'];
  var async = this['metalNamed']['metal']['async'];

  /**
   * Provides a more strict interface for Thenables in terms of
   * http://promisesaplus.com for interop with {@see CancellablePromise}.
   *
   * @interface
   * @extends {IThenable.<TYPE>}
   * @template TYPE
   */

  var Thenable = function Thenable() {};

  /**
   * Adds callbacks that will operate on the result of the Thenable, returning a
   * new child Promise.
   *
   * If the Thenable is fulfilled, the {@code onFulfilled} callback will be
   * invoked with the fulfillment value as argument, and the child Promise will
   * be fulfilled with the return value of the callback. If the callback throws
   * an exception, the child Promise will be rejected with the thrown value
   * instead.
   *
   * If the Thenable is rejected, the {@code onRejected} callback will be invoked
   * with the rejection reason as argument, and the child Promise will be rejected
   * with the return value of the callback or thrown value.
   *
   * @param {?(function(this:THIS, TYPE):
   *             (RESULT|IThenable.<RESULT>|Thenable))=} opt_onFulfilled A
   *     function that will be invoked with the fulfillment value if the Promise
   *     is fullfilled.
   * @param {?(function(*): *)=} opt_onRejected A function that will be invoked
   *     with the rejection reason if the Promise is rejected.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     with the default this.
   * @return {!CancellablePromise.<RESULT>} A new Promise that will receive the
   *     result of the fulfillment or rejection callback.
   * @template RESULT,THIS
   */
  Thenable.prototype.then = function () {};

  /**
   * An expando property to indicate that an object implements
   * {@code Thenable}.
   *
   * {@see addImplementation}.
   *
   * @const
   */
  Thenable.IMPLEMENTED_BY_PROP = '$goog_Thenable';

  /**
   * Marks a given class (constructor) as an implementation of Thenable, so
   * that we can query that fact at runtime. The class must have already
   * implemented the interface.
   * Exports a 'then' method on the constructor prototype, so that the objects
   * also implement the extern {@see Thenable} interface for interop with
   * other Promise implementations.
   * @param {function(new:Thenable,...[?])} ctor The class constructor. The
   *     corresponding class must have already implemented the interface.
   */
  Thenable.addImplementation = function (ctor) {
    ctor.prototype.then = ctor.prototype.then;
    ctor.prototype.$goog_Thenable = true;
  };

  /**
   * @param {*} object
   * @return {boolean} Whether a given instance implements {@code Thenable}.
   *     The class/superclass of the instance must call {@code addImplementation}.
   */
  Thenable.isImplementedBy = function (object) {
    if (!object) {
      return false;
    }
    try {
      return !!object.$goog_Thenable;
    } catch (e) {
      // Property access seems to be forbidden.
      return false;
    }
  };

  /**
   * Like bind(), except that a 'this object' is not required. Useful when the
   * target function is already bound.
   *
   * Usage:
   * var g = partial(f, arg1, arg2);
   * g(arg3, arg4);
   *
   * @param {Function} fn A function to partially apply.
   * @param {...*} var_args Additional arguments that are partially applied to fn.
   * @return {!Function} A partially-applied form of the function bind() was
   *     invoked as a method of.
   */
  var partial = function partial(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
      // Clone the array (with slice()) and append additional arguments
      // to the existing arguments.
      var newArgs = args.slice();
      newArgs.push.apply(newArgs, arguments);
      return fn.apply(this, newArgs);
    };
  };

  /**
   * Promises provide a result that may be resolved asynchronously. A Promise may
   * be resolved by being fulfilled or rejected with a value, which will be known
   * as the fulfillment value or the rejection reason. Whether fulfilled or
   * rejected, the Promise result is immutable once it is set.
   *
   * Promises may represent results of any type, including undefined. Rejection
   * reasons are typically Errors, but may also be of any type. Closure Promises
   * allow for optional type annotations that enforce that fulfillment values are
   * of the appropriate types at compile time.
   *
   * The result of a Promise is accessible by calling {@code then} and registering
   * {@code onFulfilled} and {@code onRejected} callbacks. Once the Promise
   * resolves, the relevant callbacks are invoked with the fulfillment value or
   * rejection reason as argument. Callbacks are always invoked in the order they
   * were registered, even when additional {@code then} calls are made from inside
   * another callback. A callback is always run asynchronously sometime after the
   * scope containing the registering {@code then} invocation has returned.
   *
   * If a Promise is resolved with another Promise, the first Promise will block
   * until the second is resolved, and then assumes the same result as the second
   * Promise. This allows Promises to depend on the results of other Promises,
   * linking together multiple asynchronous operations.
   *
   * This implementation is compatible with the Promises/A+ specification and
   * passes that specification's conformance test suite. A Closure Promise may be
   * resolved with a Promise instance (or sufficiently compatible Promise-like
   * object) created by other Promise implementations. From the specification,
   * Promise-like objects are known as "Thenables".
   *
   * @see http://promisesaplus.com/
   *
   * @param {function(
   *             this:RESOLVER_CONTEXT,
   *             function((TYPE|IThenable.<TYPE>|Thenable)),
   *             function(*)): void} resolver
   *     Initialization function that is invoked immediately with {@code resolve}
   *     and {@code reject} functions as arguments. The Promise is resolved or
   *     rejected with the first argument passed to either function.
   * @param {RESOLVER_CONTEXT=} opt_context An optional context for executing the
   *     resolver function. If unspecified, the resolver function will be executed
   *     in the default scope.
   * @constructor
   * @struct
   * @final
   * @implements {Thenable.<TYPE>}
   * @template TYPE,RESOLVER_CONTEXT
   */
  var CancellablePromise = function CancellablePromise(resolver, opt_context) {
    /**
     * The internal state of this Promise. Either PENDING, FULFILLED, REJECTED, or
     * BLOCKED.
     * @private {CancellablePromise.State_}
     */
    this.state_ = CancellablePromise.State_.PENDING;

    /**
     * The resolved result of the Promise. Immutable once set with either a
     * fulfillment value or rejection reason.
     * @private {*}
     */
    this.result_ = undefined;

    /**
     * For Promises created by calling {@code then()}, the originating parent.
     * @private {CancellablePromise}
     */
    this.parent_ = null;

    /**
     * The list of {@code onFulfilled} and {@code onRejected} callbacks added to
     * this Promise by calls to {@code then()}.
     * @private {Array.<CancellablePromise.CallbackEntry_>}
     */
    this.callbackEntries_ = null;

    /**
     * Whether the Promise is in the queue of Promises to execute.
     * @private {boolean}
     */
    this.executing_ = false;

    if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
      /**
       * A timeout ID used when the {@code UNHANDLED_REJECTION_DELAY} is greater
       * than 0 milliseconds. The ID is set when the Promise is rejected, and
       * cleared only if an {@code onRejected} callback is invoked for the
       * Promise (or one of its descendants) before the delay is exceeded.
       *
       * If the rejection is not handled before the timeout completes, the
       * rejection reason is passed to the unhandled rejection handler.
       * @private {number}
       */
      this.unhandledRejectionId_ = 0;
    } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
      /**
       * When the {@code UNHANDLED_REJECTION_DELAY} is set to 0 milliseconds, a
       * boolean that is set if the Promise is rejected, and reset to false if an
       * {@code onRejected} callback is invoked for the Promise (or one of its
       * descendants). If the rejection is not handled before the next timestep,
       * the rejection reason is passed to the unhandled rejection handler.
       * @private {boolean}
       */
      this.hadUnhandledRejection_ = false;
    }

    try {
      var self = this;
      resolver.call(opt_context, function (value) {
        self.resolve_(CancellablePromise.State_.FULFILLED, value);
      }, function (reason) {
        self.resolve_(CancellablePromise.State_.REJECTED, reason);
      });
    } catch (e) {
      this.resolve_(CancellablePromise.State_.REJECTED, e);
    }
  };

  /**
   * The delay in milliseconds before a rejected Promise's reason is passed to
   * the rejection handler. By default, the rejection handler rethrows the
   * rejection reason so that it appears in the developer console or
   * {@code window.onerror} handler.
   * Rejections are rethrown as quickly as possible by default. A negative value
   * disables rejection handling entirely.
   * @type {number}
   */
  CancellablePromise.UNHANDLED_REJECTION_DELAY = 0;

  /**
   * The possible internal states for a Promise. These states are not directly
   * observable to external callers.
   * @enum {number}
   * @private
   */
  CancellablePromise.State_ = {
    /** The Promise is waiting for resolution. */
    PENDING: 0,

    /** The Promise is blocked waiting for the result of another Thenable. */
    BLOCKED: 1,

    /** The Promise has been resolved with a fulfillment value. */
    FULFILLED: 2,

    /** The Promise has been resolved with a rejection reason. */
    REJECTED: 3
  };

  /**
   * Typedef for entries in the callback chain. Each call to {@code then},
   * {@code thenCatch}, or {@code thenAlways} creates an entry containing the
   * functions that may be invoked once the Promise is resolved.
   *
   * @typedef {{
   *   child: CancellablePromise,
   *   onFulfilled: function(*),
   *   onRejected: function(*)
   * }}
   * @private
   */
  CancellablePromise.CallbackEntry_ = null;

  /**
   * @param {(TYPE|Thenable.<TYPE>|Thenable)=} opt_value
   * @return {!CancellablePromise.<TYPE>} A new Promise that is immediately resolved
   *     with the given value.
   * @template TYPE
   */
  CancellablePromise.resolve = function (opt_value) {
    return new CancellablePromise(function (resolve) {
      resolve(opt_value);
    });
  };

  /**
   * @param {*=} opt_reason
   * @return {!CancellablePromise} A new Promise that is immediately rejected with the
   *     given reason.
   */
  CancellablePromise.reject = function (opt_reason) {
    return new CancellablePromise(function (resolve, reject) {
      reject(opt_reason);
    });
  };

  /**
   * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
   * @return {!CancellablePromise.<TYPE>} A Promise that receives the result of the
   *     first Promise (or Promise-like) input to complete.
   * @template TYPE
   */
  CancellablePromise.race = function (promises) {
    return new CancellablePromise(function (resolve, reject) {
      if (!promises.length) {
        resolve(undefined);
      }
      for (var i = 0, promise; promise = promises[i]; i++) {
        promise.then(resolve, reject);
      }
    });
  };

  /**
   * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
   * @return {!CancellablePromise.<!Array.<TYPE>>} A Promise that receives a list of
   *     every fulfilled value once every input Promise (or Promise-like) is
   *     successfully fulfilled, or is rejected by the first rejection result.
   * @template TYPE
   */
  CancellablePromise.all = function (promises) {
    return new CancellablePromise(function (resolve, reject) {
      var toFulfill = promises.length;
      var values = [];

      if (!toFulfill) {
        resolve(values);
        return;
      }

      var onFulfill = function onFulfill(index, value) {
        toFulfill--;
        values[index] = value;
        if (toFulfill === 0) {
          resolve(values);
        }
      };

      var onReject = function onReject(reason) {
        reject(reason);
      };

      for (var i = 0, promise; promise = promises[i]; i++) {
        promise.then(partial(onFulfill, i), onReject);
      }
    });
  };

  /**
   * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
   * @return {!CancellablePromise.<TYPE>} A Promise that receives the value of
   *     the first input to be fulfilled, or is rejected with a list of every
   *     rejection reason if all inputs are rejected.
   * @template TYPE
   */
  CancellablePromise.firstFulfilled = function (promises) {
    return new CancellablePromise(function (resolve, reject) {
      var toReject = promises.length;
      var reasons = [];

      if (!toReject) {
        resolve(undefined);
        return;
      }

      var onFulfill = function onFulfill(value) {
        resolve(value);
      };

      var onReject = function onReject(index, reason) {
        toReject--;
        reasons[index] = reason;
        if (toReject === 0) {
          reject(reasons);
        }
      };

      for (var i = 0, promise; promise = promises[i]; i++) {
        promise.then(onFulfill, partial(onReject, i));
      }
    });
  };

  /**
   * Adds callbacks that will operate on the result of the Promise, returning a
   * new child Promise.
   *
   * If the Promise is fulfilled, the {@code onFulfilled} callback will be invoked
   * with the fulfillment value as argument, and the child Promise will be
   * fulfilled with the return value of the callback. If the callback throws an
   * exception, the child Promise will be rejected with the thrown value instead.
   *
   * If the Promise is rejected, the {@code onRejected} callback will be invoked
   * with the rejection reason as argument, and the child Promise will be rejected
   * with the return value (or thrown value) of the callback.
   *
   * @override
   */
  CancellablePromise.prototype.then = function (opt_onFulfilled, opt_onRejected, opt_context) {
    return this.addChildPromise_(isFunction(opt_onFulfilled) ? opt_onFulfilled : null, isFunction(opt_onRejected) ? opt_onRejected : null, opt_context);
  };
  Thenable.addImplementation(CancellablePromise);

  /**
   * Adds a callback that will be invoked whether the Promise is fulfilled or
   * rejected. The callback receives no argument, and no new child Promise is
   * created. This is useful for ensuring that cleanup takes place after certain
   * asynchronous operations. Callbacks added with {@code thenAlways} will be
   * executed in the same order with other calls to {@code then},
   * {@code thenAlways}, or {@code thenCatch}.
   *
   * Since it does not produce a new child Promise, cancellation propagation is
   * not prevented by adding callbacks with {@code thenAlways}. A Promise that has
   * a cleanup handler added with {@code thenAlways} will be canceled if all of
   * its children created by {@code then} (or {@code thenCatch}) are canceled.
   *
   * @param {function(this:THIS): void} onResolved A function that will be invoked
   *     when the Promise is resolved.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     in the global scope.
   * @return {!CancellablePromise.<TYPE>} This Promise, for chaining additional calls.
   * @template THIS
   */
  CancellablePromise.prototype.thenAlways = function (onResolved, opt_context) {
    var callback = function callback() {
      try {
        // Ensure that no arguments are passed to onResolved.
        onResolved.call(opt_context);
      } catch (err) {
        CancellablePromise.handleRejection_.call(null, err);
      }
    };

    this.addCallbackEntry_({
      child: null,
      onRejected: callback,
      onFulfilled: callback
    });
    return this;
  };

  /**
   * Adds a callback that will be invoked only if the Promise is rejected. This
   * is equivalent to {@code then(null, onRejected)}.
   *
   * @param {!function(this:THIS, *): *} onRejected A function that will be
   *     invoked with the rejection reason if the Promise is rejected.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     in the global scope.
   * @return {!CancellablePromise} A new Promise that will receive the result of the
   *     callback.
   * @template THIS
   */
  CancellablePromise.prototype.thenCatch = function (onRejected, opt_context) {
    return this.addChildPromise_(null, onRejected, opt_context);
  };

  /**
   * Alias of {@link CancellablePromise.prototype.thenCatch}
   */
  CancellablePromise.prototype.catch = CancellablePromise.prototype.thenCatch;

  /**
   * Cancels the Promise if it is still pending by rejecting it with a cancel
   * Error. No action is performed if the Promise is already resolved.
   *
   * All child Promises of the canceled Promise will be rejected with the same
   * cancel error, as with normal Promise rejection. If the Promise to be canceled
   * is the only child of a pending Promise, the parent Promise will also be
   * canceled. Cancellation may propagate upward through multiple generations.
   *
   * @param {string=} opt_message An optional debugging message for describing the
   *     cancellation reason.
   */
  CancellablePromise.prototype.cancel = function (opt_message) {
    if (this.state_ === CancellablePromise.State_.PENDING) {
      async.run(function () {
        var err = new CancellablePromise.CancellationError(opt_message);
        err.IS_CANCELLATION_ERROR = true;
        this.cancelInternal_(err);
      }, this);
    }
  };

  /**
   * Cancels this Promise with the given error.
   *
   * @param {!Error} err The cancellation error.
   * @private
   */
  CancellablePromise.prototype.cancelInternal_ = function (err) {
    if (this.state_ === CancellablePromise.State_.PENDING) {
      if (this.parent_) {
        // Cancel the Promise and remove it from the parent's child list.
        this.parent_.cancelChild_(this, err);
      } else {
        this.resolve_(CancellablePromise.State_.REJECTED, err);
      }
    }
  };

  /**
   * Cancels a child Promise from the list of callback entries. If the Promise has
   * not already been resolved, reject it with a cancel error. If there are no
   * other children in the list of callback entries, propagate the cancellation
   * by canceling this Promise as well.
   *
   * @param {!CancellablePromise} childPromise The Promise to cancel.
   * @param {!Error} err The cancel error to use for rejecting the Promise.
   * @private
   */
  CancellablePromise.prototype.cancelChild_ = function (childPromise, err) {
    if (!this.callbackEntries_) {
      return;
    }
    var childCount = 0;
    var childIndex = -1;

    // Find the callback entry for the childPromise, and count whether there are
    // additional child Promises.
    for (var i = 0, entry; entry = this.callbackEntries_[i]; i++) {
      var child = entry.child;
      if (child) {
        childCount++;
        if (child === childPromise) {
          childIndex = i;
        }
        if (childIndex >= 0 && childCount > 1) {
          break;
        }
      }
    }

    // If the child Promise was the only child, cancel this Promise as well.
    // Otherwise, reject only the child Promise with the cancel error.
    if (childIndex >= 0) {
      if (this.state_ === CancellablePromise.State_.PENDING && childCount === 1) {
        this.cancelInternal_(err);
      } else {
        var callbackEntry = this.callbackEntries_.splice(childIndex, 1)[0];
        this.executeCallback_(callbackEntry, CancellablePromise.State_.REJECTED, err);
      }
    }
  };

  /**
   * Adds a callback entry to the current Promise, and schedules callback
   * execution if the Promise has already been resolved.
   *
   * @param {CancellablePromise.CallbackEntry_} callbackEntry Record containing
   *     {@code onFulfilled} and {@code onRejected} callbacks to execute after
   *     the Promise is resolved.
   * @private
   */
  CancellablePromise.prototype.addCallbackEntry_ = function (callbackEntry) {
    if ((!this.callbackEntries_ || !this.callbackEntries_.length) && (this.state_ === CancellablePromise.State_.FULFILLED || this.state_ === CancellablePromise.State_.REJECTED)) {
      this.scheduleCallbacks_();
    }
    if (!this.callbackEntries_) {
      this.callbackEntries_ = [];
    }
    this.callbackEntries_.push(callbackEntry);
  };

  /**
   * Creates a child Promise and adds it to the callback entry list. The result of
   * the child Promise is determined by the state of the parent Promise and the
   * result of the {@code onFulfilled} or {@code onRejected} callbacks as
   * specified in the Promise resolution procedure.
   *
   * @see http://promisesaplus.com/#the__method
   *
   * @param {?function(this:THIS, TYPE):
   *          (RESULT|CancellablePromise.<RESULT>|Thenable)} onFulfilled A callback that
   *     will be invoked if the Promise is fullfilled, or null.
   * @param {?function(this:THIS, *): *} onRejected A callback that will be
   *     invoked if the Promise is rejected, or null.
   * @param {THIS=} opt_context An optional execution context for the callbacks.
   *     in the default calling context.
   * @return {!CancellablePromise} The child Promise.
   * @template RESULT,THIS
   * @private
   */
  CancellablePromise.prototype.addChildPromise_ = function (onFulfilled, onRejected, opt_context) {

    var callbackEntry = {
      child: null,
      onFulfilled: null,
      onRejected: null
    };

    callbackEntry.child = new CancellablePromise(function (resolve, reject) {
      // Invoke onFulfilled, or resolve with the parent's value if absent.
      callbackEntry.onFulfilled = onFulfilled ? function (value) {
        try {
          var result = onFulfilled.call(opt_context, value);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      } : resolve;

      // Invoke onRejected, or reject with the parent's reason if absent.
      callbackEntry.onRejected = onRejected ? function (reason) {
        try {
          var result = onRejected.call(opt_context, reason);
          if (!isDef(result) && reason.IS_CANCELLATION_ERROR) {
            // Propagate cancellation to children if no other result is returned.
            reject(reason);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      } : reject;
    });

    callbackEntry.child.parent_ = this;
    this.addCallbackEntry_(
    /** @type {CancellablePromise.CallbackEntry_} */callbackEntry);
    return callbackEntry.child;
  };

  /**
   * Unblocks the Promise and fulfills it with the given value.
   *
   * @param {TYPE} value
   * @private
   */
  CancellablePromise.prototype.unblockAndFulfill_ = function (value) {
    if (this.state_ !== CancellablePromise.State_.BLOCKED) {
      throw new Error('CancellablePromise is not blocked.');
    }
    this.state_ = CancellablePromise.State_.PENDING;
    this.resolve_(CancellablePromise.State_.FULFILLED, value);
  };

  /**
   * Unblocks the Promise and rejects it with the given rejection reason.
   *
   * @param {*} reason
   * @private
   */
  CancellablePromise.prototype.unblockAndReject_ = function (reason) {
    if (this.state_ !== CancellablePromise.State_.BLOCKED) {
      throw new Error('CancellablePromise is not blocked.');
    }
    this.state_ = CancellablePromise.State_.PENDING;
    this.resolve_(CancellablePromise.State_.REJECTED, reason);
  };

  /**
   * Attempts to resolve a Promise with a given resolution state and value. This
   * is a no-op if the given Promise has already been resolved.
   *
   * If the given result is a Thenable (such as another Promise), the Promise will
   * be resolved with the same state and result as the Thenable once it is itself
   * resolved.
   *
   * If the given result is not a Thenable, the Promise will be fulfilled or
   * rejected with that result based on the given state.
   *
   * @see http://promisesaplus.com/#the_promise_resolution_procedure
   *
   * @param {CancellablePromise.State_} state
   * @param {*} x The result to apply to the Promise.
   * @private
   */
  CancellablePromise.prototype.resolve_ = function (state, x) {
    if (this.state_ !== CancellablePromise.State_.PENDING) {
      return;
    }

    if (this === x) {
      state = CancellablePromise.State_.REJECTED;
      x = new TypeError('CancellablePromise cannot resolve to itself');
    } else if (Thenable.isImplementedBy(x)) {
      x = /** @type {!Thenable} */x;
      this.state_ = CancellablePromise.State_.BLOCKED;
      x.then(this.unblockAndFulfill_, this.unblockAndReject_, this);
      return;
    } else if (isObject(x)) {
      try {
        var then = x.then;
        if (isFunction(then)) {
          this.tryThen_(x, then);
          return;
        }
      } catch (e) {
        state = CancellablePromise.State_.REJECTED;
        x = e;
      }
    }

    this.result_ = x;
    this.state_ = state;
    this.scheduleCallbacks_();

    if (state === CancellablePromise.State_.REJECTED && !x.IS_CANCELLATION_ERROR) {
      CancellablePromise.addUnhandledRejection_(this, x);
    }
  };

  /**
   * Attempts to call the {@code then} method on an object in the hopes that it is
   * a Promise-compatible instance. This allows interoperation between different
   * Promise implementations, however a non-compliant object may cause a Promise
   * to hang indefinitely. If the {@code then} method throws an exception, the
   * dependent Promise will be rejected with the thrown value.
   *
   * @see http://promisesaplus.com/#point-70
   *
   * @param {Thenable} thenable An object with a {@code then} method that may be
   *     compatible with the Promise/A+ specification.
   * @param {!Function} then The {@code then} method of the Thenable object.
   * @private
   */
  CancellablePromise.prototype.tryThen_ = function (thenable, then) {
    this.state_ = CancellablePromise.State_.BLOCKED;
    var promise = this;
    var called = false;

    var resolve = function resolve(value) {
      if (!called) {
        called = true;
        promise.unblockAndFulfill_(value);
      }
    };

    var reject = function reject(reason) {
      if (!called) {
        called = true;
        promise.unblockAndReject_(reason);
      }
    };

    try {
      then.call(thenable, resolve, reject);
    } catch (e) {
      reject(e);
    }
  };

  /**
   * Executes the pending callbacks of a resolved Promise after a timeout.
   *
   * Section 2.2.4 of the Promises/A+ specification requires that Promise
   * callbacks must only be invoked from a call stack that only contains Promise
   * implementation code, which we accomplish by invoking callback execution after
   * a timeout. If {@code startExecution_} is called multiple times for the same
   * Promise, the callback chain will be evaluated only once. Additional callbacks
   * may be added during the evaluation phase, and will be executed in the same
   * event loop.
   *
   * All Promises added to the waiting list during the same browser event loop
   * will be executed in one batch to avoid using a separate timeout per Promise.
   *
   * @private
   */
  CancellablePromise.prototype.scheduleCallbacks_ = function () {
    if (!this.executing_) {
      this.executing_ = true;
      async.run(this.executeCallbacks_, this);
    }
  };

  /**
   * Executes all pending callbacks for this Promise.
   *
   * @private
   */
  CancellablePromise.prototype.executeCallbacks_ = function () {
    while (this.callbackEntries_ && this.callbackEntries_.length) {
      var entries = this.callbackEntries_;
      this.callbackEntries_ = [];

      for (var i = 0; i < entries.length; i++) {
        this.executeCallback_(entries[i], this.state_, this.result_);
      }
    }
    this.executing_ = false;
  };

  /**
   * Executes a pending callback for this Promise. Invokes an {@code onFulfilled}
   * or {@code onRejected} callback based on the resolved state of the Promise.
   *
   * @param {!CancellablePromise.CallbackEntry_} callbackEntry An entry containing the
   *     onFulfilled and/or onRejected callbacks for this step.
   * @param {CancellablePromise.State_} state The resolution status of the Promise,
   *     either FULFILLED or REJECTED.
   * @param {*} result The resolved result of the Promise.
   * @private
   */
  CancellablePromise.prototype.executeCallback_ = function (callbackEntry, state, result) {
    if (state === CancellablePromise.State_.FULFILLED) {
      callbackEntry.onFulfilled(result);
    } else {
      this.removeUnhandledRejection_();
      callbackEntry.onRejected(result);
    }
  };

  /**
   * Marks this rejected Promise as having being handled. Also marks any parent
   * Promises in the rejected state as handled. The rejection handler will no
   * longer be invoked for this Promise (if it has not been called already).
   *
   * @private
   */
  CancellablePromise.prototype.removeUnhandledRejection_ = function () {
    var p;
    if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
      for (p = this; p && p.unhandledRejectionId_; p = p.parent_) {
        clearTimeout(p.unhandledRejectionId_);
        p.unhandledRejectionId_ = 0;
      }
    } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
      for (p = this; p && p.hadUnhandledRejection_; p = p.parent_) {
        p.hadUnhandledRejection_ = false;
      }
    }
  };

  /**
   * Marks this rejected Promise as unhandled. If no {@code onRejected} callback
   * is called for this Promise before the {@code UNHANDLED_REJECTION_DELAY}
   * expires, the reason will be passed to the unhandled rejection handler. The
   * handler typically rethrows the rejection reason so that it becomes visible in
   * the developer console.
   *
   * @param {!CancellablePromise} promise The rejected Promise.
   * @param {*} reason The Promise rejection reason.
   * @private
   */
  CancellablePromise.addUnhandledRejection_ = function (promise, reason) {
    if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
      promise.unhandledRejectionId_ = setTimeout(function () {
        CancellablePromise.handleRejection_.call(null, reason);
      }, CancellablePromise.UNHANDLED_REJECTION_DELAY);
    } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
      promise.hadUnhandledRejection_ = true;
      async.run(function () {
        if (promise.hadUnhandledRejection_) {
          CancellablePromise.handleRejection_.call(null, reason);
        }
      });
    }
  };

  /**
   * A method that is invoked with the rejection reasons for Promises that are
   * rejected but have no {@code onRejected} callbacks registered yet.
   * @type {function(*)}
   * @private
   */
  CancellablePromise.handleRejection_ = async.throwException;

  /**
   * Sets a handler that will be called with reasons from unhandled rejected
   * Promises. If the rejected Promise (or one of its descendants) has an
   * {@code onRejected} callback registered, the rejection will be considered
   * handled, and the rejection handler will not be called.
   *
   * By default, unhandled rejections are rethrown so that the error may be
   * captured by the developer console or a {@code window.onerror} handler.
   *
   * @param {function(*)} handler A function that will be called with reasons from
   *     rejected Promises. Defaults to {@code async.throwException}.
   */
  CancellablePromise.setUnhandledRejectionHandler = function (handler) {
    CancellablePromise.handleRejection_ = handler;
  };

  /**
   * Error used as a rejection reason for canceled Promises.
   *
   * @param {string=} opt_message
   * @constructor
   * @extends {Error}
   * @final
   */
  CancellablePromise.CancellationError = function (_Error) {
    babelHelpers.inherits(_class, _Error);

    function _class(opt_message) {
      babelHelpers.classCallCheck(this, _class);

      var _this = babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, opt_message));

      if (opt_message) {
        _this.message = opt_message;
      }
      return _this;
    }

    return _class;
  }(Error);

  /** @override */
  CancellablePromise.CancellationError.prototype.name = 'cancel';

  this['metalNamed']['Promise'] = this['metalNamed']['Promise'] || {};
  this['metalNamed']['Promise']['CancellablePromise'] = CancellablePromise;
  this['metal']['Promise'] = CancellablePromise;
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var dom = this['metal']['dom'];
	var CancellablePromise = this['metal']['Promise'];
	var Component = this['metal']['component'];
	var EventHandler = this['metalNamed']['events']['EventHandler'];

	/*
  * AutocompleteBase component.
  */

	var AutocompleteBase = function (_Component) {
		babelHelpers.inherits(AutocompleteBase, _Component);

		function AutocompleteBase() {
			babelHelpers.classCallCheck(this, AutocompleteBase);
			return babelHelpers.possibleConstructorReturn(this, (AutocompleteBase.__proto__ || Object.getPrototypeOf(AutocompleteBase)).apply(this, arguments));
		}

		babelHelpers.createClass(AutocompleteBase, [{
			key: 'created',

			/**
    * @inheritDoc
    */
			value: function created() {
				this.eventHandler_ = new EventHandler();
				this.on('select', this.select);
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'attached',
			value: function attached() {
				if (this.inputElement) {
					this.eventHandler_.add(dom.on(this.inputElement, 'input', this.handleUserInput_.bind(this)));
				}
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'detached',
			value: function detached() {
				this.eventHandler_.removeAllListeners();
			}

			/**
    * Handles the user input.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleUserInput_',
			value: function handleUserInput_() {
				this.request(this.inputElement.value);
			}

			/**
    * Cancels pending request and starts a request for the user input.
    * @param {string} query
    * @return {!CancellablePromise} Deferred request.
    */

		}, {
			key: 'request',
			value: function request(query) {
				var self = this;

				if (this.pendingRequest) {
					this.pendingRequest.cancel('Cancelled by another request');
				}

				var deferredData = self.data(query);
				if (!core.isPromise(deferredData)) {
					deferredData = CancellablePromise.resolve(deferredData);
				}

				this.pendingRequest = deferredData.then(function (data) {
					if (Array.isArray(data)) {
						return data.map(self.format.bind(self)).filter(function (val) {
							return core.isDefAndNotNull(val);
						});
					}
				});

				return this.pendingRequest;
			}

			/**
    * Normalizes the provided data value. If the value is not a function, the
    * value will be wrapped in a function which returns the provided value.
    * @param {Array.<object>|Promise|function} val The provided value which
    *     have to be normalized.
    * @protected
    */

		}, {
			key: 'setData_',
			value: function setData_(val) {
				if (!core.isFunction(val)) {
					return function () {
						return val;
					};
				}
				return val;
			}
		}]);
		return AutocompleteBase;
	}(Component);

	/**
  * AutocompleteBase state definition.
  * @type {!Object}
  * @static
  */


	AutocompleteBase.STATE = {
		/**
   * List's main element ID value. It is also used to compose List items' id.
   * @type {string}
   * @default autocomplete- + core.getUid()
   */
		listId: {
			valueFn: function valueFn() {
				return 'autocomplete-' + core.getUid();
			}
		},

		/**
   * Function or array, which have to return the results from the query.
   * If function, it should return an `array` or a `Promise`. In case of
   * Promise, it should be resolved with an array containing the results.
   * @type {Array.<object>|function}
   */
		data: {
			setter: 'setData_'
		},

		/**
   * Function that formats each item of the data.
   * @type {function}
   * @default Identity function.
   */
		format: {
			value: core.identityFunction,
			validator: core.isFunction
		},

		/**
   * The element which will be used source for the data queries.
   * @type {DOMElement|string}
   */
		inputElement: {
			setter: dom.toElement
		},

		/**
   * Handles item selection. It will receive two parameters - the selected
   * value from the user and the current value from the input element.
   * @type {function}
   * @default
   *   function(selectedValue) {
   *	   this.inputElement.value = selectedValue;
   *	   this.inputElement.focus();
   *   }
   */
		select: {
			value: function value(selectedValue) {
				this.inputElement.value = selectedValue.text;
				this.inputElement.focus();
			},
			validator: core.isFunction
		},

		/**
   * Indicates if the component is visible or not.
   * @type {boolean}
   */
		visible: {
			validator: core.isBoolean,
			value: false
		}
	};

	this['metal']['AutocompleteBase'] = AutocompleteBase;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from ListItem.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace ListItem.
     * @public
     */

    goog.module('ListItem.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      ie_open_start('li');
      iattr('class', 'listitem list-group-item ' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + ' clearfix');
      iattr('data-index', opt_data.index);
      if (opt_data.id) {
        iattr('id', opt_data.id);
      }
      iattr('role', 'listitem');
      ie_open_end();
      if (opt_data.item.avatar) {
        if (opt_data.item.avatar.link) {
          itext(' ');
          ie_open('a', null, null, 'href', opt_data.item.avatar.link, 'class', 'avatar-link');
          itext(' ');
        }
        ie_open('span', null, null, 'class', 'list-image pull-left ' + opt_data.item.avatar['class']);
        var dyn0 = opt_data.item.avatar.content;
        if (typeof dyn0 == 'function') dyn0();else if (dyn0 != null) itext(dyn0);
        ie_close('span');
        if (opt_data.item.avatar.link) {
          itext(' ');
          ie_close('a');
          itext(' ');
        }
      }
      ie_open('div', null, null, 'class', 'list-main-content pull-left');
      ie_open('div', null, null, 'class', 'list-text-primary');
      var dyn1 = opt_data.item.textPrimary;
      if (typeof dyn1 == 'function') dyn1();else if (dyn1 != null) itext(dyn1);
      ie_close('div');
      if (opt_data.item.textSecondary) {
        ie_open('div', null, null, 'class', 'list-text-secondary');
        var dyn2 = opt_data.item.textSecondary;
        if (typeof dyn2 == 'function') dyn2();else if (dyn2 != null) itext(dyn2);
        ie_close('div');
      }
      ie_close('div');
      if (opt_data.item.icons) {
        var iconList66 = opt_data.item.icons;
        var iconListLen66 = iconList66.length;
        for (var iconIndex66 = 0; iconIndex66 < iconListLen66; iconIndex66++) {
          var iconData66 = iconList66[iconIndex66];
          ie_void('span', null, null, 'class', 'btn-icon ' + iconData66 + ' pull-right');
        }
      }
      if (opt_data.item.iconsHtml) {
        ie_open('div', null, null, 'class', 'pull-right');
        var iconHtmlList72 = opt_data.item.iconsHtml;
        var iconHtmlListLen72 = iconHtmlList72.length;
        for (var iconHtmlIndex72 = 0; iconHtmlIndex72 < iconHtmlListLen72; iconHtmlIndex72++) {
          var iconHtmlData72 = iconHtmlList72[iconHtmlIndex72];
          var dyn3 = iconHtmlData72;
          if (typeof dyn3 == 'function') dyn3();else if (dyn3 != null) itext(dyn3);
        }
        ie_close('div');
      }
      if (opt_data.item.label) {
        ie_open('span', null, null, 'class', 'label list-label pull-right ' + opt_data.item.label['class']);
        var dyn4 = opt_data.item.label.content;
        if (typeof dyn4 == 'function') dyn4();else if (dyn4 != null) itext(dyn4);
        ie_close('span');
      }
      ie_close('li');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'ListItem.render';
    }

    exports.render.params = ["id", "index", "item", "elementClasses"];
    exports.render.types = { "id": "any", "index": "any", "item": "any", "elementClasses": "any" };
    templates = exports;
    return exports;
  });

  var ListItem = function (_Component) {
    babelHelpers.inherits(ListItem, _Component);

    function ListItem() {
      babelHelpers.classCallCheck(this, ListItem);
      return babelHelpers.possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
    }

    return ListItem;
  }(Component);

  Soy.register(ListItem, templates);
  this['metalNamed']['ListItem'] = this['metalNamed']['ListItem'] || {};
  this['metalNamed']['ListItem']['ListItem'] = ListItem;
  this['metalNamed']['ListItem']['templates'] = templates;
  this['metal']['ListItem'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var Component = this['metal']['component'];
	var Soy = this['metal']['Soy'];
	var templates = this['metal']['ListItem'];

	/**
  * List component.
  */

	var ListItem = function (_Component) {
		babelHelpers.inherits(ListItem, _Component);

		function ListItem() {
			babelHelpers.classCallCheck(this, ListItem);
			return babelHelpers.possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
		}

		babelHelpers.createClass(ListItem, [{
			key: 'setterItemFn_',

			/**
    * Setter function for the `item` state key.
    * @param {!Object} item
    * @protected
    */
			value: function setterItemFn_(item) {
				if (item.textPrimary && core.isString(item.textPrimary)) {
					item.textPrimary = Soy.toIncDom(item.textPrimary);
				}
				if (item.textSecondary && core.isString(item.textSecondary)) {
					item.textSecondary = Soy.toIncDom(item.textSecondary);
				}
				if (item.avatar && item.avatar.content && core.isString(item.avatar.content)) {
					item.avatar.content = Soy.toIncDom(item.avatar.content);
				}
				if (Array.isArray(item.iconsHtml)) {
					item.iconsHtml = item.iconsHtml.map(Soy.toIncDom);
				}
				return item;
			}
		}]);
		return ListItem;
	}(Component);

	Soy.register(ListItem, templates);

	/**
  * List state definition.
  * @type {Object}
  * @static
  */
	ListItem.STATE = {
		/**
   * A unique identifier for each item.
   * @type {string}
   */
		id: {
			valueFn: function valueFn() {
				return 'list-component-item' + core.getUid();
			}
		},

		/**
   * The item to be rendered.
   * @type {!Object}
   */
		item: {
			validator: core.isObject,
			setter: 'setterItemFn_'
		},

		/**
   * The index of the item in the list.
   * @type {number}
   */
		index: {
			value: -1
		}
	};

	this['metal']['ListItem'] = ListItem;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from List.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace List.
     * @public
     */

    goog.module('List.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('soy.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('ListItem.incrementaldom', 'render');

    /**
     * @param {{
     *    id: (?),
     *    elementClasses: (?),
     *    items: (?),
     *    itemsHtml: (?soydata.SanitizedHtml|string|undefined)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      soy.asserts.assertType(opt_data.itemsHtml == null || opt_data.itemsHtml instanceof Function || opt_data.itemsHtml instanceof soydata.UnsanitizedText || goog.isString(opt_data.itemsHtml), 'itemsHtml', opt_data.itemsHtml, '?soydata.SanitizedHtml|string|undefined');
      var itemsHtml = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.itemsHtml;
      ie_open('div', null, null, 'class', 'list' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''));
      ie_open_start('ul');
      iattr('class', 'list-group');
      iattr('data-onclick', 'handleClick');
      if (opt_data.id) {
        iattr('id', opt_data.id);
      }
      iattr('role', 'list');
      ie_open_end();
      if (itemsHtml != null) {
        itemsHtml();
      } else {
        var itemList21 = opt_data.items;
        var itemListLen21 = itemList21.length;
        for (var itemIndex21 = 0; itemIndex21 < itemListLen21; itemIndex21++) {
          var itemData21 = itemList21[itemIndex21];
          $templateAlias1({ id: opt_data.id + '-item-' + (itemIndex21 + 1), index: itemIndex21, item: itemData21, key: '-items-' + itemIndex21 }, null, opt_ijData);
        }
      }
      ie_close('ul');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'List.render';
    }

    exports.render.params = ["itemsHtml", "id", "elementClasses", "items"];
    exports.render.types = { "itemsHtml": "html", "id": "any", "elementClasses": "any", "items": "any" };
    templates = exports;
    return exports;
  });

  var List = function (_Component) {
    babelHelpers.inherits(List, _Component);

    function List() {
      babelHelpers.classCallCheck(this, List);
      return babelHelpers.possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
    }

    return List;
  }(Component);

  Soy.register(List, templates);
  this['metalNamed']['List'] = this['metalNamed']['List'] || {};
  this['metalNamed']['List']['List'] = List;
  this['metalNamed']['List']['templates'] = templates;
  this['metal']['List'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var dom = this['metal']['dom'];
	var Component = this['metal']['component'];
	var Soy = this['metal']['Soy'];
	var templates = this['metal']['List'];

	/**
  * List component.
  */

	var List = function (_Component) {
		babelHelpers.inherits(List, _Component);

		function List() {
			babelHelpers.classCallCheck(this, List);
			return babelHelpers.possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
		}

		babelHelpers.createClass(List, [{
			key: 'handleClick',

			/**
    * Handles click event on the list. The function fires an
    * {@code itemSelected} event.
    * @param {!Event} event The native click event
    */
			value: function handleClick(event) {
				var target = event.target;
				while (target) {
					if (dom.match(target, '.listitem')) {
						break;
					}
					target = target.parentNode;
				}
				this.emit('itemSelected', target);
			}
		}]);
		return List;
	}(Component);

	Soy.register(List, templates);

	/**
  * List state definition.
  * @type {!Object}
  * @static
  */
	List.STATE = {
		/**
   * A unique identifier for the component. It's also used to compound the
   * items' ID attribute unless if itemsHtml attribute is used.
   * @type {string}
   */
		id: {
			valueFn: function valueFn() {
				return 'list-component-' + core.getUid();
			}
		},

		/**
   * The list items. Each is represented by an object that can have the following keys:
   *   - textPrimary: The item's main content.
   *   - textSecondary: (Optional) The item's help content.
   *   - icons: (Optional) A list of icon css classes to render on the right side.
   *   - iconsHtml: (Optional) A list of icon css classes to render on the right side.
   *   - avatar: (Optional) An object that specifies the avatar's content and, optionally, a css
   *       class it should use.
   * @type {!Array<!Object>}
   * @default []
   */
		items: {
			validator: Array.isArray,
			valueFn: function valueFn() {
				return [];
			}
		},

		/**
   * The list items as HTML to be added directly to the list.
   * @type {string}
   */
		itemsHtml: {
			isHtml: true
		}
	};

	this['metal']['List'] = List;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from Autocomplete.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace Autocomplete.
     * @public
     */

    goog.module('Autocomplete.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('List.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      ie_open('div', null, null, 'class', 'autocomplete autocomplete-list component ' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''), 'data-onclick', 'handleClick_');
      $templateAlias1({ events: { itemSelected: opt_data.onListItemSelected_ }, id: opt_data.listId, ref: 'list' }, null, opt_ijData);
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'Autocomplete.render';
    }

    exports.render.params = ["listId", "elementClasses", "onListItemSelected_"];
    exports.render.types = { "listId": "any", "elementClasses": "any", "onListItemSelected_": "any" };
    templates = exports;
    return exports;
  });

  var Autocomplete = function (_Component) {
    babelHelpers.inherits(Autocomplete, _Component);

    function Autocomplete() {
      babelHelpers.classCallCheck(this, Autocomplete);
      return babelHelpers.possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).apply(this, arguments));
    }

    return Autocomplete;
  }(Component);

  Soy.register(Autocomplete, templates);
  this['metalNamed']['Autocomplete'] = this['metalNamed']['Autocomplete'] || {};
  this['metalNamed']['Autocomplete']['Autocomplete'] = Autocomplete;
  this['metalNamed']['Autocomplete']['templates'] = templates;
  this['metal']['Autocomplete'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var debounce = this['metal']['debounce'];
	var dom = this['metal']['dom'];
	var Promise = this['metalNamed']['Promise']['CancellablePromise'];
	var Align = this['metalNamed']['position']['Align'];
	var AutocompleteBase = this['metal']['AutocompleteBase'];
	var Soy = this['metal']['Soy'];
	var templates = this['metal']['Autocomplete'];


	var DOWN = 40;
	var ENTER = 13;
	var SPACE = 32;
	var UP = 38;

	/*
  * Autocomplete component.
  */

	var Autocomplete = function (_AutocompleteBase) {
		babelHelpers.inherits(Autocomplete, _AutocompleteBase);

		function Autocomplete() {
			babelHelpers.classCallCheck(this, Autocomplete);
			return babelHelpers.possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).apply(this, arguments));
		}

		babelHelpers.createClass(Autocomplete, [{
			key: 'attached',

			/**
    * @inheritDoc
    */
			value: function attached() {
				babelHelpers.get(Autocomplete.prototype.__proto__ || Object.getPrototypeOf(Autocomplete.prototype), 'attached', this).call(this);
				this.setAriaAttributes_();
				this.eventHandler_.add(dom.on(this.inputElement, 'focus', this.handleInputFocus_.bind(this)));
				this.eventHandler_.add(dom.on(document, 'click', this.handleDocClick_.bind(this)));
				this.eventHandler_.add(dom.on(window, 'resize', debounce(this.handleWindowResize_.bind(this), 100)));
				this.eventHandler_.add(dom.on(this.inputElement, 'keydown', this.handleKeyDown_.bind(this)));
				this.eventHandler_.add(this.getList().on('rendered', this.handleListRender_.bind(this)));
				if (this.visible) {
					this.align();
				}
			}

			/**
    * Aligns main element to the input element.
    */

		}, {
			key: 'align',
			value: function align() {
				this.element.style.width = this.inputElement.offsetWidth + 'px';
				var position = Align.align(this.element, this.inputElement, Align.Bottom);

				dom.removeClasses(this.element, this.positionCss_);
				switch (position) {
					case Align.Top:
					case Align.TopLeft:
					case Align.TopRight:
						this.positionCss_ = 'autocomplete-top';
						break;
					case Align.Bottom:
					case Align.BottomLeft:
					case Align.BottomRight:
						this.positionCss_ = 'autocomplete-bottom';
						break;
					default:
						this.positionCss_ = null;

				}
				dom.addClasses(this.element, this.positionCss_);
			}

			/**
    * Actives an option of the suggestion list by inform an index.
    * @param {number} index
    * @protected
    */

		}, {
			key: 'activateListItem_',
			value: function activateListItem_(index) {
				var option = this.currentList_[index];
				dom.removeClasses(this.currentList_[this.activeIndex_], 'active');
				this.activeIndex_ = index;
				this.inputElement.setAttribute('aria-activedescendant', option.getAttribute('id'));
				dom.addClasses(option, 'active');
			}

			/**
    * Returns the previous index or the last one if the active index was the first.
    * @protected
    * @return {number} Index
    */

		}, {
			key: 'decreaseIndex_',
			value: function decreaseIndex_() {
				return this.activeIndex_ === 0 ? this.getLastIndex_() : this.activeIndex_ - 1;
			}

			/**
    * Returns the last index of the list.
    * @protected
    * @return {number} Index
    */

		}, {
			key: 'getLastIndex_',
			value: function getLastIndex_() {
				return this.getList().items.length - 1;
			}

			/**
    * Returns the `List` component being used to render the matched items.
    * @return {!List}
    */

		}, {
			key: 'getList',
			value: function getList() {
				return this.components.list;
			}

			/**
    * Handles action keys interactions.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleActionKeys_',
			value: function handleActionKeys_() {
				var selectedItem = this.getList().items[this.activeIndex_];
				this.selectOption_(selectedItem);
			}

			/**
    * Handles `click` events, stopping their propagation.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleClick_',
			value: function handleClick_(event) {
				event.stopPropagation();
			}

			/**
    * Handles document click in order to hide autocomplete. If input element is
    * focused autocomplete will not hide.
    * @param {!Event} event
    */

		}, {
			key: 'handleDocClick_',
			value: function handleDocClick_() {
				if (document.activeElement === this.inputElement) {
					return;
				}
				this.visible = false;
			}

			/**
    * Handles input focus.
    * @param {!Event} event
    */

		}, {
			key: 'handleInputFocus_',
			value: function handleInputFocus_() {
				this.request(this.inputElement.value);
			}

			/**
    * Executed after List rendering.
    * @param {number} index
    * @protected
    */

		}, {
			key: 'handleListRender_',
			value: function handleListRender_() {
				if (this.visible) {
					this.currentList_ = this.element.querySelectorAll('.listitem');
					this.activateListItem_(0);
				}
			}

			/**
    * Handles a `keydown` event on this component. Handles keyboard controls.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleKeyDown_',
			value: function handleKeyDown_(event) {
				if (this.visible) {
					switch (event.keyCode) {
						case UP:
							this.activateListItem_(this.decreaseIndex_());
							event.preventDefault();
							break;
						case DOWN:
							this.activateListItem_(this.increaseIndex_());
							event.preventDefault();
							break;
						case ENTER:
						case SPACE:
							this.handleActionKeys_();
							event.preventDefault();
							break;
					}
				}
			}

			/**
    * Handles window resize events. Realigns the autocomplete results list to
    * the input field.
    */

		}, {
			key: 'handleWindowResize_',
			value: function handleWindowResize_() {
				if (this.visible) {
					this.align();
				}
			}

			/**
    * Returns the next index or zero if the active index was the last.
    * @protected
    * @return {number} Index
    */

		}, {
			key: 'increaseIndex_',
			value: function increaseIndex_() {
				return this.activeIndex_ === this.getLastIndex_() ? 0 : this.activeIndex_ + 1;
			}

			/**
    * Listens to the itemSelected event and it tells autocomplete which
    * element was selected.
    * @param {!Element} item The list selected item.
    * @protected
    */

		}, {
			key: 'onListItemSelected_',
			value: function onListItemSelected_(item) {
				var selectedIndex = parseInt(item.getAttribute('data-index'), 10);
				var selectedItem = this.getList().items[selectedIndex];
				this.selectOption_(selectedItem);
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'request',
			value: function request(query) {
				if (this.autocompleteClosing_) {
					// While closing the input element will be focused, causing another
					// request. This request should be ignored though, since we wish to close
					// the dropdown list, not open it again.
					return;
				}

				var self = this;
				return babelHelpers.get(Autocomplete.prototype.__proto__ || Object.getPrototypeOf(Autocomplete.prototype), 'request', this).call(this, query).then(function (data) {
					if (data) {
						data.forEach(self.assertItemObjectStructure_);
						self.getList().items = data;
					}
					self.visible = !!(data && data.length > 0);
				});
			}

			/**
    * Emits a `select` event with the information about the selected item and
    * hides the list element.
    * @param {!Object} item The list selected item.
    * @protected
    */

		}, {
			key: 'selectOption_',
			value: function selectOption_(selectedItem) {
				this.autocompleteClosing_ = true;
				this.emit('select', selectedItem);
				this.visible = false;
				this.autocompleteClosing_ = false;
			}

			/**
    * Set the required ARIA attributes to the inputElement.
    * @protected
    */

		}, {
			key: 'setAriaAttributes_',
			value: function setAriaAttributes_() {
				this.inputElement.setAttribute('aria-activedescendant', '');
				this.inputElement.setAttribute('aria-autocomplete', 'list');
				this.inputElement.setAttribute('aria-haspopup', true);
				this.inputElement.setAttribute('aria-owns', this.listId);
				this.inputElement.setAttribute('role', 'combobox');
			}

			/**
    * Synchronization logic for `visible` state.
    * @param {boolean} visible
    */

		}, {
			key: 'syncVisible',
			value: function syncVisible(visible) {
				babelHelpers.get(Autocomplete.prototype.__proto__ || Object.getPrototypeOf(Autocomplete.prototype), 'syncVisible', this).call(this, visible);

				if (visible) {
					this.align();
				}
			}

			/**
    * Asserts that formatted data is valid. Throws error if item is not in the
    * valid syntax.
    * @param {*} item
    * @protected
    */

		}, {
			key: 'assertItemObjectStructure_',
			value: function assertItemObjectStructure_(item) {
				if (!core.isObject(item)) {
					throw new Promise.CancellationError('Autocomplete item must be an object');
				}
				if (!item.hasOwnProperty('textPrimary')) {
					throw new Promise.CancellationError('Autocomplete item must be an object with \'textPrimary\' key');
				}
			}
		}]);
		return Autocomplete;
	}(AutocompleteBase);

	Soy.register(Autocomplete, templates);

	/**
  * State definition.
  * @type {!Object}
  * @static
  */
	Autocomplete.STATE = {
		/**
   * Function that converts a given item to the format that should be used by
   * the autocomplete.
   * @type {!function()}
   */
		format: {
			value: function value(item) {
				if (core.isString(item)) {
					item = {
						textPrimary: item
					};
				}
				if (core.isObject(item) && !item.text) {
					item.text = item.textPrimary;
				}
				return item;
			}
		}
	};

	this['metal']['Autocomplete'] = Autocomplete;
}).call(this);
'use strict';

(function () {
  var Autocomplete = this['metal']['Autocomplete'];
  var AutocompleteBase = this['metal']['AutocompleteBase'];
  this['metal']['autocomplete'] = Autocomplete;
  this['metalNamed']['autocomplete'] = this['metalNamed']['autocomplete'] || {};
  this['metalNamed']['autocomplete']['Autocomplete'] = Autocomplete;
  this['metalNamed']['autocomplete']['AutocompleteBase'] = AutocompleteBase;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from SSGSearchAutocomplete.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace SSGSearchAutocomplete.
     * @public
     */

    goog.module('SSGSearchAutocomplete.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      var $$temp;
      opt_data = opt_data || {};
      ie_open('div', null, null, 'class', 'page-autocomplete');
      ie_open('div', null, null, 'class', 'form-group');
      ie_open('div', null, null, 'class', 'input-inner-addon input-inner-addon-right');
      ie_open('input', null, null, 'autocomplete', 'off', 'class', 'form-control', 'name', 'query', 'placeholder', ($$temp = opt_data.placeholder) == null ? '' : $$temp, 'ref', 'input', 'required', '', 'type', 'text');
      ie_close('input');
      ie_void('span', null, null, 'class', 'input-inner-icon-helper icon-16-magnifier');
      ie_close('div');
      ie_close('div');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'SSGSearchAutocomplete.render';
    }

    exports.render.params = ["placeholder"];
    exports.render.types = { "placeholder": "any" };
    templates = exports;
    return exports;
  });

  var SSGSearchAutocomplete = function (_Component) {
    babelHelpers.inherits(SSGSearchAutocomplete, _Component);

    function SSGSearchAutocomplete() {
      babelHelpers.classCallCheck(this, SSGSearchAutocomplete);
      return babelHelpers.possibleConstructorReturn(this, (SSGSearchAutocomplete.__proto__ || Object.getPrototypeOf(SSGSearchAutocomplete)).apply(this, arguments));
    }

    return SSGSearchAutocomplete;
  }(Component);

  Soy.register(SSGSearchAutocomplete, templates);
  this['metalNamed']['SSGSearchAutocomplete'] = this['metalNamed']['SSGSearchAutocomplete'] || {};
  this['metalNamed']['SSGSearchAutocomplete']['SSGSearchAutocomplete'] = SSGSearchAutocomplete;
  this['metalNamed']['SSGSearchAutocomplete']['templates'] = templates;
  this['metal']['SSGSearchAutocomplete'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var Autocomplete = this['metal']['autocomplete'];
	var core = this['metal']['metal'];
	var Soy = this['metal']['Soy'];
	var SSGSearchBase = this['metal']['SSGSearchBase'];
	var templates = this['metal']['SSGSearchAutocomplete'];

	var SSGSearchAutocomplete = function (_SSGSearchBase) {
		babelHelpers.inherits(SSGSearchAutocomplete, _SSGSearchBase);

		function SSGSearchAutocomplete() {
			babelHelpers.classCallCheck(this, SSGSearchAutocomplete);
			return babelHelpers.possibleConstructorReturn(this, (SSGSearchAutocomplete.__proto__ || Object.getPrototypeOf(SSGSearchAutocomplete)).apply(this, arguments));
		}

		babelHelpers.createClass(SSGSearchAutocomplete, [{
			key: 'attached',
			value: function attached() {
				var element = this.element;
				var input = this.refs.input;


				if (input) {
					var autocomplete = new Autocomplete({
						data: this.search_.bind(this),
						format: this.format_.bind(this),
						inputElement: input,
						select: function select(_ref) {
							var url = _ref.url;

							window.location = url;
						}
					});
				}
			}
		}, {
			key: 'format_',
			value: function format_(data) {
				var title = data.title,
				    description = data.description,
				    url = data.url;


				if (description && description.length > 100) {
					description = description.substr(0, 100) + '...';
				}

				return {
					textPrimary: '<a class="autocomplete-link" href="' + url + '">\n\t\t\t\t<div class="autocomplete-result">\n\t\t\t\t\t<p class="autocomplete-title">' + title + '</p>\n\t\t\t\t\t<p class="autocomplete-text">' + description + '</p>\n\t\t\t\t</div>\n\t\t\t</a>',
					url: url
				};
			}
		}]);
		return SSGSearchAutocomplete;
	}(SSGSearchBase);

	;

	Soy.register(SSGSearchAutocomplete, templates);

	this['metal']['SSGSearchAutocomplete'] = SSGSearchAutocomplete;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from SSGUpdates.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace SSGUpdates.
     * @hassoydeltemplate {SSGUpdates.feature.idom}
     * @hassoydelcall {SSGUpdates.feature.idom}
     * @public
     */

    goog.module('SSGUpdates.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'class', 'updates');
      ie_open('div', null, null, 'class', 'container');
      $updates(opt_data, null, opt_ijData);
      ie_close('div');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'SSGUpdates.render';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $updates(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'class', 'row');
      ie_open('div', null, null, 'class', 'col-lg-10 col-lg-offset-3 col-md-16 col-md-offset-0');
      if (opt_data.updates) {
        var updateList119 = opt_data.updates;
        var updateListLen119 = updateList119.length;
        for (var updateIndex119 = 0; updateIndex119 < updateListLen119; updateIndex119++) {
          var updateData119 = updateList119[updateIndex119];
          ie_open('section', null, null, 'class', 'update');
          ie_open('div', null, null, 'class', 'row update-row');
          ie_open('div', null, null, 'class', 'col-sm-3 ' + (updateData119.major ? 'major' : 'minor') + '-update update-timeline');
          ie_open('div', null, null, 'class', 'update-point');
          var dyn6 = updateData119.version;
          if (typeof dyn6 == 'function') dyn6();else if (dyn6 != null) itext(dyn6);
          ie_close('div');
          ie_close('div');
          ie_open('div', null, null, 'class', 'col-sm-13 update-features');
          $features(soy.$$assignDefaults({ features: updateData119.features }, opt_data), null, opt_ijData);
          ie_close('div');
          ie_close('div');
          ie_close('section');
        }
      }
      ie_close('div');
      ie_close('div');
    }
    exports.updates = $updates;
    if (goog.DEBUG) {
      $updates.soyTemplateName = 'SSGUpdates.updates';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $features(opt_data, opt_ignored, opt_ijData) {
      var $$temp;
      var localFeatureVariant__soy123 = ($$temp = opt_data.featureVariant) == null ? 'basic' : $$temp;
      ie_open('div', null, null, 'class', 'row');
      var featureList127 = opt_data.features;
      var featureListLen127 = featureList127.length;
      for (var featureIndex127 = 0; featureIndex127 < featureListLen127; featureIndex127++) {
        var featureData127 = featureList127[featureIndex127];
        soy.$$getDelegateFn(soy.$$getDelTemplateId('SSGUpdates.feature.idom'), localFeatureVariant__soy123, false)(soy.$$assignDefaults({ feature: featureData127 }, opt_data), null, opt_ijData);
      }
      ie_close('div');
    }
    exports.features = $features;
    if (goog.DEBUG) {
      $features.soyTemplateName = 'SSGUpdates.features';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function __deltemplate_s130_8b51fcf6(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'class', 'col-xs-16 col-sm-8 update-feature');
      ie_open('div', null, null, 'class', 'feature-topper');
      ie_void('span', null, null, 'class', 'feature-icon icon-16-' + opt_data.feature.icon);
      ie_open('h1', null, null, 'class', 'feature-header');
      var dyn7 = opt_data.feature.title;
      if (typeof dyn7 == 'function') dyn7();else if (dyn7 != null) itext(dyn7);
      ie_close('h1');
      ie_close('div');
      ie_open('div', null, null, 'class', 'feature-content');
      ie_open('p', null, null, 'class', 'feature-lead');
      var dyn8 = opt_data.feature.description;
      if (typeof dyn8 == 'function') dyn8();else if (dyn8 != null) itext(dyn8);
      ie_close('p');
      ie_open('div', null, null, 'class', 'read-more');
      ie_open('a', null, null, 'href', opt_data.feature.url);
      itext('Read more\u2026');
      ie_close('a');
      ie_close('div');
      ie_close('div');
      ie_close('div');
    }
    exports.__deltemplate_s130_8b51fcf6 = __deltemplate_s130_8b51fcf6;
    if (goog.DEBUG) {
      __deltemplate_s130_8b51fcf6.soyTemplateName = 'SSGUpdates.__deltemplate_s130_8b51fcf6';
    }
    soy.$$registerDelegateFn(soy.$$getDelTemplateId('SSGUpdates.feature.idom'), 'basic', 0, __deltemplate_s130_8b51fcf6);

    exports.render.params = ["featureVariant", "updates"];
    exports.render.types = { "featureVariant": "any", "updates": "any" };
    exports.updates.params = ["featureVariant", "updates"];
    exports.updates.types = { "featureVariant": "any", "updates": "any" };
    exports.features.params = ["featureVariant", "features"];
    exports.features.types = { "featureVariant": "any", "features": "any" };
    templates = exports;
    return exports;
  });

  var SSGUpdates = function (_Component) {
    babelHelpers.inherits(SSGUpdates, _Component);

    function SSGUpdates() {
      babelHelpers.classCallCheck(this, SSGUpdates);
      return babelHelpers.possibleConstructorReturn(this, (SSGUpdates.__proto__ || Object.getPrototypeOf(SSGUpdates)).apply(this, arguments));
    }

    return SSGUpdates;
  }(Component);

  Soy.register(SSGUpdates, templates);
  this['metalNamed']['SSGUpdates'] = this['metalNamed']['SSGUpdates'] || {};
  this['metalNamed']['SSGUpdates']['SSGUpdates'] = SSGUpdates;
  this['metalNamed']['SSGUpdates']['templates'] = templates;
  this['metal']['SSGUpdates'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var Component = this['metal']['component'];
	var core = this['metal']['metal'];
	var Soy = this['metal']['Soy'];
	var templates = this['metal']['SSGUpdates'];

	var SSGUpdates = function (_Component) {
		babelHelpers.inherits(SSGUpdates, _Component);

		function SSGUpdates() {
			babelHelpers.classCallCheck(this, SSGUpdates);
			return babelHelpers.possibleConstructorReturn(this, (SSGUpdates.__proto__ || Object.getPrototypeOf(SSGUpdates)).apply(this, arguments));
		}

		babelHelpers.createClass(SSGUpdates, [{
			key: 'attached',
			value: function attached() {}
		}]);
		return SSGUpdates;
	}(Component);

	;

	SSGUpdates.STATE = {
		updates: {
			validator: core.isArray,
			value: []
		}
	};

	Soy.register(SSGUpdates, templates);

	this['metal']['SSGUpdates'] = SSGUpdates;
}).call(this);
'use strict';

(function () {
	var SSGNavigation = this['metal']['SSGNavigation'];
	var SSGReadingProgress = this['metal']['SSGReadingProgress'];
	var SSGSearch = this['metal']['SSGSearch'];
	var SSGSearchAutocomplete = this['metal']['SSGSearchAutocomplete'];
	var SSGSearchBase = this['metal']['SSGSearchBase'];
	var SSGUpdates = this['metal']['SSGUpdates'];
	this['metalNamed']['components'] = this['metalNamed']['components'] || {};
	this['metalNamed']['components']['SSGNavigation'] = SSGNavigation;
	this['metalNamed']['components']['SSGReadingProgress'] = SSGReadingProgress;
	this['metalNamed']['components']['SSGSearch'] = SSGSearch;
	this['metalNamed']['components']['SSGSearchAutocomplete'] = SSGSearchAutocomplete;
	this['metalNamed']['components']['SSGSearchBase'] = SSGSearchBase;
	this['metalNamed']['components']['SSGUpdates'] = SSGUpdates;
	this['metal']['components'] = SSGNavigation;
}).call(this);
'use strict';

(function () {}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from SidebarHome.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace sidebarHome.
     * @public
     */

    goog.module('sidebarHome.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'class', 'sidebar-home sidebar-list-1 ' + opt_data.activeClass);
      ie_open('a', null, null, 'href', opt_data.section.url, 'class', 'sidebar-link');
      ie_void('span', null, null, 'class', 'sidebar-icon icon-16-house');
      ie_open('span');
      var dyn0 = opt_data.section.title;
      if (typeof dyn0 == 'function') dyn0();else if (dyn0 != null) itext(dyn0);
      itext(' Home');
      ie_close('span');
      ie_close('a');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'sidebarHome.render';
    }

    exports.render.params = ["section", "activeClass"];
    exports.render.types = { "section": "any", "activeClass": "any" };
    templates = exports;
    return exports;
  });

  var sidebarHome = function (_Component) {
    babelHelpers.inherits(sidebarHome, _Component);

    function sidebarHome() {
      babelHelpers.classCallCheck(this, sidebarHome);
      return babelHelpers.possibleConstructorReturn(this, (sidebarHome.__proto__ || Object.getPrototypeOf(sidebarHome)).apply(this, arguments));
    }

    return sidebarHome;
  }(Component);

  Soy.register(sidebarHome, templates);
  this['metalNamed']['SidebarHome'] = this['metalNamed']['SidebarHome'] || {};
  this['metalNamed']['SidebarHome']['sidebarHome'] = sidebarHome;
  this['metalNamed']['SidebarHome']['templates'] = templates;
  this['metal']['SidebarHome'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
		var Component = this['metal']['component'];
		var Soy = this['metal']['Soy'];
		var templates = this['metal']['SidebarHome'];

		var SidebarHome = function (_Component) {
				babelHelpers.inherits(SidebarHome, _Component);

				function SidebarHome() {
						babelHelpers.classCallCheck(this, SidebarHome);
						return babelHelpers.possibleConstructorReturn(this, (SidebarHome.__proto__ || Object.getPrototypeOf(SidebarHome)).apply(this, arguments));
				}

				babelHelpers.createClass(SidebarHome, [{
						key: 'created',
						value: function created() {
								var section = this.section;
								var childrenActive = section.children.find(function (child) {
										return child.active;
								});

								this.activeClass = childrenActive ? '' : 'active';
						}
				}]);
				return SidebarHome;
		}(Component);

		Soy.register(SidebarHome, templates);

		this['metal']['SidebarHome'] = SidebarHome;
}).call(this);
"use strict";

(function () {}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from topbar.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace Topbar.
     * @public
     */

    goog.module('Topbar.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('SSGNavigation.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      ie_open('nav', null, null, 'class', 'topbar');
      $logo(opt_data, null, opt_ijData);
      $menu(opt_data, null, opt_ijData);
      ie_close('nav');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'Topbar.render';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $logo(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'class', 'topbar-logo');
      ie_open('a', null, null, 'class', 'topbar-logo-link', 'href', '/');
      ie_open('img', null, null, 'src', '/img/logo-yellow.png', 'alt', 'senna.js logo', 'height', '38');
      ie_close('img');
      ie_open('span', null, null, 'class', 'name');
      itext('Senna.js');
      ie_close('span');
      ie_open('span', null, null, 'class', 'by');
      itext('by Liferay');
      ie_close('span');
      ie_close('a');
      ie_close('div');
    }
    exports.logo = $logo;
    if (goog.DEBUG) {
      $logo.soyTemplateName = 'Topbar.logo';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $menu(opt_data, opt_ignored, opt_ijData) {
      $templateAlias1({ depth: 1, elementClasses: 'topbar-list', linkClasses: 'topbar-link', listItemClasses: 'topbar-item', section: opt_data.site.index }, null, opt_ijData);
      ie_open('div', null, null, 'id', 'topbar-button', 'class', 'topbar-cta');
      ie_open('a', null, null, 'id', 'topbar-button-download', 'href', 'https://github.com/liferay/senna.js/archive/master.zip', 'class', 'btn btn-accent');
      itext('Download');
      ie_close('a');
      ie_close('div');
    }
    exports.menu = $menu;
    if (goog.DEBUG) {
      $menu.soyTemplateName = 'Topbar.menu';
    }

    exports.render.params = ["site"];
    exports.render.types = { "site": "any" };
    exports.logo.params = [];
    exports.logo.types = {};
    exports.menu.params = ["site"];
    exports.menu.types = { "site": "any" };
    templates = exports;
    return exports;
  });

  var Topbar = function (_Component) {
    babelHelpers.inherits(Topbar, _Component);

    function Topbar() {
      babelHelpers.classCallCheck(this, Topbar);
      return babelHelpers.possibleConstructorReturn(this, (Topbar.__proto__ || Object.getPrototypeOf(Topbar)).apply(this, arguments));
    }

    return Topbar;
  }(Component);

  Soy.register(Topbar, templates);
  this['metalNamed']['topbar'] = this['metalNamed']['topbar'] || {};
  this['metalNamed']['topbar']['Topbar'] = Topbar;
  this['metalNamed']['topbar']['templates'] = templates;
  this['metal']['topbar'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['topbar'];

  var Topbar = function (_Component) {
    babelHelpers.inherits(Topbar, _Component);

    function Topbar() {
      babelHelpers.classCallCheck(this, Topbar);
      return babelHelpers.possibleConstructorReturn(this, (Topbar.__proto__ || Object.getPrototypeOf(Topbar)).apply(this, arguments));
    }

    return Topbar;
  }(Component);

  ;

  Soy.register(Topbar, templates);

  this['metal']['Topbar'] = Topbar;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from topbarDocs.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace TopbarDocs.
     * @public
     */

    goog.module('TopbarDocs.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('SSGNavigation.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'class', 'sidebar-offset');
      ie_open('nav', null, null, 'id', 'docs', 'class', 'topbar');
      $logo(opt_data, null, opt_ijData);
      $menu(opt_data, null, opt_ijData);
      ie_close('nav');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'TopbarDocs.render';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $logo(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'class', 'topbar-logo');
      ie_open('a', null, null, 'class', 'topbar-logo-link', 'href', '/');
      ie_open('img', null, null, 'src', '/img/logo-yellow.png', 'alt', 'senna.js logo', 'height', '38');
      ie_close('img');
      ie_open('span', null, null, 'class', 'name');
      itext('Senna.js');
      ie_close('span');
      ie_open('span', null, null, 'class', 'by');
      itext('by Liferay');
      ie_close('span');
      ie_close('a');
      ie_close('div');
    }
    exports.logo = $logo;
    if (goog.DEBUG) {
      $logo.soyTemplateName = 'TopbarDocs.logo';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $menu(opt_data, opt_ignored, opt_ijData) {
      $templateAlias1({ depth: 1, elementClasses: 'topbar-list', linkClasses: 'topbar-link', listItemClasses: 'topbar-item', section: opt_data.site.index }, null, opt_ijData);
      ie_open('div', null, null, 'id', 'topbar-button', 'class', 'topbar-cta');
      ie_open('a', null, null, 'id', 'topbar-button-download', 'href', 'https://github.com/liferay/senna.js/archive/master.zip', 'class', 'btn btn-accent');
      itext('Download');
      ie_close('a');
      ie_close('div');
    }
    exports.menu = $menu;
    if (goog.DEBUG) {
      $menu.soyTemplateName = 'TopbarDocs.menu';
    }

    exports.render.params = ["site"];
    exports.render.types = { "site": "any" };
    exports.logo.params = [];
    exports.logo.types = {};
    exports.menu.params = ["site"];
    exports.menu.types = { "site": "any" };
    templates = exports;
    return exports;
  });

  var TopbarDocs = function (_Component) {
    babelHelpers.inherits(TopbarDocs, _Component);

    function TopbarDocs() {
      babelHelpers.classCallCheck(this, TopbarDocs);
      return babelHelpers.possibleConstructorReturn(this, (TopbarDocs.__proto__ || Object.getPrototypeOf(TopbarDocs)).apply(this, arguments));
    }

    return TopbarDocs;
  }(Component);

  Soy.register(TopbarDocs, templates);
  this['metalNamed']['topbarDocs'] = this['metalNamed']['topbarDocs'] || {};
  this['metalNamed']['topbarDocs']['TopbarDocs'] = TopbarDocs;
  this['metalNamed']['topbarDocs']['templates'] = templates;
  this['metal']['topbarDocs'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['topbarDocs'];

  var TopbarDocs = function (_Component) {
    babelHelpers.inherits(TopbarDocs, _Component);

    function TopbarDocs() {
      babelHelpers.classCallCheck(this, TopbarDocs);
      return babelHelpers.possibleConstructorReturn(this, (TopbarDocs.__proto__ || Object.getPrototypeOf(TopbarDocs)).apply(this, arguments));
    }

    return TopbarDocs;
  }(Component);

  ;

  Soy.register(TopbarDocs, templates);

  this['metal']['TopbarDocs'] = TopbarDocs;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from topbarUpdates.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace TopbarUpdates.
     * @public
     */

    goog.module('TopbarUpdates.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('SSGNavigation.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      ie_open('nav', null, null, 'class', 'topbar');
      $logo(opt_data, null, opt_ijData);
      $menu(opt_data, null, opt_ijData);
      ie_close('nav');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'TopbarUpdates.render';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $logo(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'class', 'topbar-logo');
      ie_open('a', null, null, 'class', 'topbar-logo-link', 'href', '/');
      ie_open('img', null, null, 'src', '/img/logo-yellow.png', 'alt', 'senna.js logo', 'height', '38');
      ie_close('img');
      ie_open('span', null, null, 'class', 'name');
      itext('Senna.js');
      ie_close('span');
      ie_open('span', null, null, 'class', 'by');
      itext('by Liferay');
      ie_close('span');
      ie_close('a');
      ie_close('div');
    }
    exports.logo = $logo;
    if (goog.DEBUG) {
      $logo.soyTemplateName = 'TopbarUpdates.logo';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $menu(opt_data, opt_ignored, opt_ijData) {
      $templateAlias1({ depth: 1, elementClasses: 'topbar-list', linkClasses: 'topbar-link', listItemClasses: 'topbar-item', section: opt_data.site.index }, null, opt_ijData);
      ie_open('div', null, null, 'id', 'topbar-button', 'class', 'topbar-cta');
      ie_open('a', null, null, 'id', 'topbar-button-download', 'href', 'https://github.com/liferay/senna.js/archive/master.zip', 'class', 'btn btn-accent');
      itext('Download');
      ie_close('a');
      ie_close('div');
    }
    exports.menu = $menu;
    if (goog.DEBUG) {
      $menu.soyTemplateName = 'TopbarUpdates.menu';
    }

    exports.render.params = ["site"];
    exports.render.types = { "site": "any" };
    exports.logo.params = [];
    exports.logo.types = {};
    exports.menu.params = ["site"];
    exports.menu.types = { "site": "any" };
    templates = exports;
    return exports;
  });

  var TopbarUpdates = function (_Component) {
    babelHelpers.inherits(TopbarUpdates, _Component);

    function TopbarUpdates() {
      babelHelpers.classCallCheck(this, TopbarUpdates);
      return babelHelpers.possibleConstructorReturn(this, (TopbarUpdates.__proto__ || Object.getPrototypeOf(TopbarUpdates)).apply(this, arguments));
    }

    return TopbarUpdates;
  }(Component);

  Soy.register(TopbarUpdates, templates);
  this['metalNamed']['topbarUpdates'] = this['metalNamed']['topbarUpdates'] || {};
  this['metalNamed']['topbarUpdates']['TopbarUpdates'] = TopbarUpdates;
  this['metalNamed']['topbarUpdates']['templates'] = templates;
  this['metal']['topbarUpdates'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['topbarUpdates'];

  var TopbarUpdates = function (_Component) {
    babelHelpers.inherits(TopbarUpdates, _Component);

    function TopbarUpdates() {
      babelHelpers.classCallCheck(this, TopbarUpdates);
      return babelHelpers.possibleConstructorReturn(this, (TopbarUpdates.__proto__ || Object.getPrototypeOf(TopbarUpdates)).apply(this, arguments));
    }

    return TopbarUpdates;
  }(Component);

  ;

  Soy.register(TopbarUpdates, templates);

  this['metal']['TopbarUpdates'] = TopbarUpdates;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from guide.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace guide.
     * @hassoydeltemplate {SSGNavigation.anchor.idom}
     * @public
     */

    goog.module('guide.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias5 = Soy.getTemplate('SSGNavigation.incrementaldom', 'render');

    var $templateAlias2 = Soy.getTemplate('SSGReadingProgress.incrementaldom', 'render');

    var $templateAlias3 = Soy.getTemplate('SSGSearchAutocomplete.incrementaldom', 'render');

    var $templateAlias1 = Soy.getTemplate('mainDocs.incrementaldom', 'render');

    var $templateAlias4 = Soy.getTemplate('sidebarHome.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      var param13 = function param13() {
        $sidebar(soy.$$assignDefaults({ section: opt_data.site.index.children[0] }, opt_data), null, opt_ijData);
        $guide(opt_data, null, opt_ijData);
      };
      $templateAlias1(soy.$$assignDefaults({ elementClasses: 'docs', content: param13 }, opt_data), null, opt_ijData);
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'guide.render';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $guide(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'class', 'sidebar-offset');
      ie_open('header', null, null, 'class', 'guide-header');
      ie_open('div', null, null, 'class', 'container-hybrid');
      ie_open('h1', null, null, 'class', 'guide-header-title');
      var dyn1 = opt_data.page.category;
      if (typeof dyn1 == 'function') dyn1();else if (dyn1 != null) itext(dyn1);
      ie_close('h1');
      ie_close('div');
      ie_close('header');
      ie_open('div', null, null, 'class', 'container-hybrid');
      ie_open('div', null, null, 'class', 'docs-guide row');
      ie_open('div', null, null, 'class', 'docs-content col-xs-16 col-md-9');
      var dyn2 = opt_data.content;
      if (typeof dyn2 == 'function') dyn2();else if (dyn2 != null) itext(dyn2);
      $feedback(opt_data, null, opt_ijData);
      ie_close('div');
      ie_open('nav', null, null, 'class', 'col-xs-16 col-md-offset-2 col-md-5');
      ie_open('div', null, null, 'class', 'docs-nav-container');
      $templateAlias2({ elementClasses: 'docs-nav' }, null, opt_ijData);
      ie_close('div');
      ie_close('nav');
      ie_close('div');
      ie_close('div');
      ie_close('div');
    }
    exports.guide = $guide;
    if (goog.DEBUG) {
      $guide.soyTemplateName = 'guide.guide';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $feedback(opt_data, opt_ignored, opt_ijData) {
      var $$temp;
      ie_open('div');
      ie_open('div', null, null, 'class', 'guide-feedback');
      ie_open('p');
      itext('Was this section helpful?');
      ie_close('p');
      ie_open('button', null, null, 'class', 'btn btn-accent guide-feedback-btn guide-feedback-btn-yes');
      itext('Yes');
      ie_close('button');
      ie_open('button', null, null, 'class', 'btn btn-accent guide-feedback-btn guide-feedback-btn-no');
      itext('No');
      ie_close('button');
      ie_close('div');
      ie_open('div', null, null, 'class', 'guide-github');
      ie_open('div', null, null, 'class', 'guide-github-img');
      ie_open('img', null, null, 'src', '/img/octocat.png', 'alt', 'octocat');
      ie_close('img');
      ie_close('div');
      ie_open('div', null, null, 'class', 'guide-github-text');
      ie_open('p');
      itext('Contribute to this Doc on Github! ');
      ie_open('a', null, null, 'href', (($$temp = opt_data.site.repo) == null ? '' : $$temp) + '/tree/master/' + opt_data.page.srcFilePath, 'class', 'docs-github-link', 'target', '_blank');
      itext('Edit this section');
      ie_close('a');
      itext('.');
      ie_close('p');
      ie_close('div');
      ie_close('div');
      ie_close('div');
    }
    exports.feedback = $feedback;
    if (goog.DEBUG) {
      $feedback.soyTemplateName = 'guide.feedback';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $sidebar(opt_data, opt_ignored, opt_ijData) {
      ie_open('nav', null, null, 'class', 'sidebar');
      ie_open('a', null, null, 'class', 'sidebar-header toggler-header-collapsed');
      ie_void('span', null, null, 'class', 'sidebar-icon icon-16-menu');
      ie_open('span');
      itext('Docs Menu');
      ie_close('span');
      ie_open('span', null, null, 'class', 'sidebar-icon-right');
      ie_void('span', null, null, 'class', 'icon-12-arrow-down-short');
      ie_void('span', null, null, 'class', 'icon-12-arrow-up-short');
      ie_close('span');
      ie_close('a');
      ie_open('div', null, null, 'class', 'sidebar-search');
      $templateAlias3({ section: opt_data.section, placeholder: 'Search Docs' }, null, opt_ijData);
      ie_close('div');
      $templateAlias4(opt_data, null, opt_ijData);
      $templateAlias5({ elementClasses: 'sidebar-list sidebar-list-1 toggler-collapsed', listItemClasses: 'sidebar-item', anchorVariant: 'sidebar', section: opt_data.section }, null, opt_ijData);
      ie_close('nav');
    }
    exports.sidebar = $sidebar;
    if (goog.DEBUG) {
      $sidebar.soyTemplateName = 'guide.sidebar';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function __deltemplate_s47_a2205383(opt_data, opt_ignored, opt_ijData) {
      ie_open('a', null, null, 'class', 'sidebar-link ' + (opt_data.page.active ? 'sidebar-link-selected' : ''), 'href', opt_data.page.url);
      if (opt_data.page.icon) {
        ie_void('span', null, null, 'class', 'sidebar-icon icon-16-' + opt_data.page.icon);
      }
      ie_open('span');
      var dyn3 = opt_data.page.title;
      if (typeof dyn3 == 'function') dyn3();else if (dyn3 != null) itext(dyn3);
      ie_close('span');
      ie_close('a');
    }
    exports.__deltemplate_s47_a2205383 = __deltemplate_s47_a2205383;
    if (goog.DEBUG) {
      __deltemplate_s47_a2205383.soyTemplateName = 'guide.__deltemplate_s47_a2205383';
    }
    soy.$$registerDelegateFn(soy.$$getDelTemplateId('SSGNavigation.anchor.idom'), 'sidebar', 0, __deltemplate_s47_a2205383);

    exports.render.params = ["page", "site"];
    exports.render.types = { "page": "any", "site": "any" };
    exports.guide.params = ["page", "content"];
    exports.guide.types = { "page": "any", "content": "any" };
    exports.feedback.params = ["page", "site"];
    exports.feedback.types = { "page": "any", "site": "any" };
    exports.sidebar.params = ["section"];
    exports.sidebar.types = { "section": "any" };
    templates = exports;
    return exports;
  });

  var guide = function (_Component) {
    babelHelpers.inherits(guide, _Component);

    function guide() {
      babelHelpers.classCallCheck(this, guide);
      return babelHelpers.possibleConstructorReturn(this, (guide.__proto__ || Object.getPrototypeOf(guide)).apply(this, arguments));
    }

    return guide;
  }(Component);

  Soy.register(guide, templates);
  this['metalNamed']['guide'] = this['metalNamed']['guide'] || {};
  this['metalNamed']['guide']['guide'] = guide;
  this['metalNamed']['guide']['templates'] = templates;
  this['metal']['guide'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['guide'];

  var guide = function (_Component) {
    babelHelpers.inherits(guide, _Component);

    function guide() {
      babelHelpers.classCallCheck(this, guide);
      return babelHelpers.possibleConstructorReturn(this, (guide.__proto__ || Object.getPrototypeOf(guide)).apply(this, arguments));
    }

    return guide;
  }(Component);

  ;

  Soy.register(guide, templates);

  this['metal']['guide'] = guide;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from guideAdvanced.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace guideAdvanced.
     * @hassoydeltemplate {SSGNavigation.anchor.idom}
     * @public
     */

    goog.module('guideAdvanced.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias5 = Soy.getTemplate('SSGNavigation.incrementaldom', 'render');

    var $templateAlias2 = Soy.getTemplate('SSGReadingProgress.incrementaldom', 'render');

    var $templateAlias3 = Soy.getTemplate('SSGSearchAutocomplete.incrementaldom', 'render');

    var $templateAlias1 = Soy.getTemplate('mainDocs.incrementaldom', 'render');

    var $templateAlias4 = Soy.getTemplate('sidebarHome.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'id', 'advanced');
      var param65 = function param65() {
        $sidebar(soy.$$assignDefaults({ section: opt_data.site.index.children[0] }, opt_data), null, opt_ijData);
        $guide(opt_data, null, opt_ijData);
      };
      $templateAlias1(soy.$$assignDefaults({ elementClasses: 'docs', content: param65 }, opt_data), null, opt_ijData);
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'guideAdvanced.render';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $guide(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'class', 'sidebar-offset');
      ie_open('header', null, null, 'class', 'guide-header');
      ie_open('div', null, null, 'class', 'container-hybrid');
      ie_open('h1', null, null, 'class', 'guide-header-title');
      var dyn4 = opt_data.page.category;
      if (typeof dyn4 == 'function') dyn4();else if (dyn4 != null) itext(dyn4);
      ie_close('h1');
      ie_close('div');
      ie_close('header');
      ie_open('div', null, null, 'class', 'container-hybrid');
      ie_open('div', null, null, 'class', 'docs-guide row');
      ie_open('div', null, null, 'class', 'docs-content col-xs-16 col-md-9');
      var dyn5 = opt_data.content;
      if (typeof dyn5 == 'function') dyn5();else if (dyn5 != null) itext(dyn5);
      $feedback(opt_data, null, opt_ijData);
      ie_close('div');
      ie_open('nav', null, null, 'class', 'col-xs-16 col-md-offset-2 col-md-5');
      ie_open('div', null, null, 'class', 'docs-nav-container');
      $templateAlias2({ elementClasses: 'docs-nav' }, null, opt_ijData);
      ie_close('div');
      ie_close('nav');
      ie_close('div');
      ie_close('div');
      ie_close('div');
    }
    exports.guide = $guide;
    if (goog.DEBUG) {
      $guide.soyTemplateName = 'guideAdvanced.guide';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $feedback(opt_data, opt_ignored, opt_ijData) {
      var $$temp;
      ie_open('div');
      ie_open('div', null, null, 'class', 'guide-feedback');
      ie_open('p');
      itext('Was this section helpful?');
      ie_close('p');
      ie_open('button', null, null, 'class', 'btn btn-accent guide-feedback-btn guide-feedback-btn-yes');
      itext('Yes');
      ie_close('button');
      ie_open('button', null, null, 'class', 'btn btn-accent guide-feedback-btn guide-feedback-btn-no');
      itext('No');
      ie_close('button');
      ie_close('div');
      ie_open('div', null, null, 'class', 'guide-github');
      ie_open('div', null, null, 'class', 'guide-github-img');
      ie_open('img', null, null, 'src', '/img/octocat.png', 'alt', 'octocat');
      ie_close('img');
      ie_close('div');
      ie_open('div', null, null, 'class', 'guide-github-text');
      ie_open('p');
      itext('Contribute to this Doc on Github! ');
      ie_open('a', null, null, 'href', (($$temp = opt_data.site.repo) == null ? '' : $$temp) + '/tree/master/' + opt_data.page.srcFilePath, 'class', 'docs-github-link', 'target', '_blank');
      itext('Edit this section');
      ie_close('a');
      itext('.');
      ie_close('p');
      ie_close('div');
      ie_close('div');
      ie_close('div');
    }
    exports.feedback = $feedback;
    if (goog.DEBUG) {
      $feedback.soyTemplateName = 'guideAdvanced.feedback';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $sidebar(opt_data, opt_ignored, opt_ijData) {
      ie_open('nav', null, null, 'class', 'sidebar');
      ie_open('a', null, null, 'class', 'sidebar-header toggler-header-collapsed');
      ie_void('span', null, null, 'class', 'sidebar-icon icon-16-menu');
      ie_open('span');
      itext('Docs Menu');
      ie_close('span');
      ie_open('span', null, null, 'class', 'sidebar-icon-right');
      ie_void('span', null, null, 'class', 'icon-12-arrow-down-short');
      ie_void('span', null, null, 'class', 'icon-12-arrow-up-short');
      ie_close('span');
      ie_close('a');
      ie_open('div', null, null, 'class', 'sidebar-search');
      $templateAlias3({ section: opt_data.section, placeholder: 'Search Docs' }, null, opt_ijData);
      ie_close('div');
      $templateAlias4(opt_data, null, opt_ijData);
      $templateAlias5({ elementClasses: 'sidebar-list sidebar-list-1 toggler-collapsed', listItemClasses: 'sidebar-item', anchorVariant: 'advanced', section: opt_data.section }, null, opt_ijData);
      ie_close('nav');
    }
    exports.sidebar = $sidebar;
    if (goog.DEBUG) {
      $sidebar.soyTemplateName = 'guideAdvanced.sidebar';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function __deltemplate_s100_a67d11bb(opt_data, opt_ignored, opt_ijData) {
      ie_open('a', null, null, 'class', 'sidebar-link ' + (opt_data.page.active ? 'sidebar-link-selected' : ''), 'href', opt_data.page.url);
      if (opt_data.page.icon) {
        ie_void('span', null, null, 'class', 'sidebar-icon icon-16-' + opt_data.page.icon);
      }
      ie_open('span');
      var dyn6 = opt_data.page.title;
      if (typeof dyn6 == 'function') dyn6();else if (dyn6 != null) itext(dyn6);
      ie_close('span');
      ie_close('a');
    }
    exports.__deltemplate_s100_a67d11bb = __deltemplate_s100_a67d11bb;
    if (goog.DEBUG) {
      __deltemplate_s100_a67d11bb.soyTemplateName = 'guideAdvanced.__deltemplate_s100_a67d11bb';
    }
    soy.$$registerDelegateFn(soy.$$getDelTemplateId('SSGNavigation.anchor.idom'), 'advanced', 0, __deltemplate_s100_a67d11bb);

    exports.render.params = ["page", "site"];
    exports.render.types = { "page": "any", "site": "any" };
    exports.guide.params = ["page", "content"];
    exports.guide.types = { "page": "any", "content": "any" };
    exports.feedback.params = ["page", "site"];
    exports.feedback.types = { "page": "any", "site": "any" };
    exports.sidebar.params = ["section"];
    exports.sidebar.types = { "section": "any" };
    templates = exports;
    return exports;
  });

  var guideAdvanced = function (_Component) {
    babelHelpers.inherits(guideAdvanced, _Component);

    function guideAdvanced() {
      babelHelpers.classCallCheck(this, guideAdvanced);
      return babelHelpers.possibleConstructorReturn(this, (guideAdvanced.__proto__ || Object.getPrototypeOf(guideAdvanced)).apply(this, arguments));
    }

    return guideAdvanced;
  }(Component);

  Soy.register(guideAdvanced, templates);
  this['metalNamed']['guideAdvanced'] = this['metalNamed']['guideAdvanced'] || {};
  this['metalNamed']['guideAdvanced']['guideAdvanced'] = guideAdvanced;
  this['metalNamed']['guideAdvanced']['templates'] = templates;
  this['metal']['guideAdvanced'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['guideAdvanced'];

  var guideAdvanced = function (_Component) {
    babelHelpers.inherits(guideAdvanced, _Component);

    function guideAdvanced() {
      babelHelpers.classCallCheck(this, guideAdvanced);
      return babelHelpers.possibleConstructorReturn(this, (guideAdvanced.__proto__ || Object.getPrototypeOf(guideAdvanced)).apply(this, arguments));
    }

    return guideAdvanced;
  }(Component);

  ;

  Soy.register(guideAdvanced, templates);

  this['metal']['guideAdvanced'] = guideAdvanced;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from guideFeatures.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace guideFeatures.
     * @hassoydeltemplate {SSGNavigation.anchor.idom}
     * @public
     */

    goog.module('guideFeatures.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias5 = Soy.getTemplate('SSGNavigation.incrementaldom', 'render');

    var $templateAlias2 = Soy.getTemplate('SSGReadingProgress.incrementaldom', 'render');

    var $templateAlias3 = Soy.getTemplate('SSGSearchAutocomplete.incrementaldom', 'render');

    var $templateAlias1 = Soy.getTemplate('mainDocs.incrementaldom', 'render');

    var $templateAlias4 = Soy.getTemplate('sidebarHome.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'id', 'features');
      var param118 = function param118() {
        $sidebar(soy.$$assignDefaults({ section: opt_data.site.index.children[0] }, opt_data), null, opt_ijData);
        $guide(opt_data, null, opt_ijData);
      };
      $templateAlias1(soy.$$assignDefaults({ elementClasses: 'docs', content: param118 }, opt_data), null, opt_ijData);
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'guideFeatures.render';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $guide(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'class', 'sidebar-offset');
      ie_open('header', null, null, 'class', 'guide-header');
      ie_open('div', null, null, 'class', 'container-hybrid');
      ie_open('h1', null, null, 'class', 'guide-header-title');
      var dyn7 = opt_data.page.category;
      if (typeof dyn7 == 'function') dyn7();else if (dyn7 != null) itext(dyn7);
      ie_close('h1');
      ie_close('div');
      ie_close('header');
      ie_open('div', null, null, 'class', 'container-hybrid');
      ie_open('div', null, null, 'class', 'docs-guide row');
      ie_open('div', null, null, 'class', 'docs-content col-xs-16 col-md-9');
      var dyn8 = opt_data.content;
      if (typeof dyn8 == 'function') dyn8();else if (dyn8 != null) itext(dyn8);
      $feedback(opt_data, null, opt_ijData);
      ie_close('div');
      ie_open('nav', null, null, 'class', 'col-xs-16 col-md-offset-2 col-md-5');
      ie_open('div', null, null, 'class', 'docs-nav-container');
      $templateAlias2({ elementClasses: 'docs-nav' }, null, opt_ijData);
      ie_close('div');
      ie_close('nav');
      ie_close('div');
      ie_close('div');
      ie_close('div');
    }
    exports.guide = $guide;
    if (goog.DEBUG) {
      $guide.soyTemplateName = 'guideFeatures.guide';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $feedback(opt_data, opt_ignored, opt_ijData) {
      var $$temp;
      ie_open('div');
      ie_open('div', null, null, 'class', 'guide-feedback');
      ie_open('p');
      itext('Was this section helpful?');
      ie_close('p');
      ie_open('button', null, null, 'class', 'btn btn-accent guide-feedback-btn guide-feedback-btn-yes');
      itext('Yes');
      ie_close('button');
      ie_open('button', null, null, 'class', 'btn btn-accent guide-feedback-btn guide-feedback-btn-no');
      itext('No');
      ie_close('button');
      ie_close('div');
      ie_open('div', null, null, 'class', 'guide-github');
      ie_open('div', null, null, 'class', 'guide-github-img');
      ie_open('img', null, null, 'src', '/img/octocat.png', 'alt', 'octocat');
      ie_close('img');
      ie_close('div');
      ie_open('div', null, null, 'class', 'guide-github-text');
      ie_open('p');
      itext('Contribute to this Doc on Github! ');
      ie_open('a', null, null, 'href', (($$temp = opt_data.site.repo) == null ? '' : $$temp) + '/tree/master/' + opt_data.page.srcFilePath, 'class', 'docs-github-link', 'target', '_blank');
      itext('Edit this section');
      ie_close('a');
      itext('.');
      ie_close('p');
      ie_close('div');
      ie_close('div');
      ie_close('div');
    }
    exports.feedback = $feedback;
    if (goog.DEBUG) {
      $feedback.soyTemplateName = 'guideFeatures.feedback';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $sidebar(opt_data, opt_ignored, opt_ijData) {
      ie_open('nav', null, null, 'class', 'sidebar');
      ie_open('a', null, null, 'class', 'sidebar-header toggler-header-collapsed');
      ie_void('span', null, null, 'class', 'sidebar-icon icon-16-menu');
      ie_open('span');
      itext('Docs Menu');
      ie_close('span');
      ie_open('span', null, null, 'class', 'sidebar-icon-right');
      ie_void('span', null, null, 'class', 'icon-12-arrow-down-short');
      ie_void('span', null, null, 'class', 'icon-12-arrow-up-short');
      ie_close('span');
      ie_close('a');
      ie_open('div', null, null, 'class', 'sidebar-search');
      $templateAlias3({ section: opt_data.section, placeholder: 'Search Docs' }, null, opt_ijData);
      ie_close('div');
      $templateAlias4(opt_data, null, opt_ijData);
      $templateAlias5({ elementClasses: 'sidebar-list sidebar-list-1 toggler-collapsed', listItemClasses: 'sidebar-item', anchorVariant: 'features', section: opt_data.section }, null, opt_ijData);
      ie_close('nav');
    }
    exports.sidebar = $sidebar;
    if (goog.DEBUG) {
      $sidebar.soyTemplateName = 'guideFeatures.sidebar';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function __deltemplate_s153_8c51d3e6(opt_data, opt_ignored, opt_ijData) {
      ie_open('a', null, null, 'class', 'sidebar-link ' + (opt_data.page.active ? 'sidebar-link-selected' : ''), 'href', opt_data.page.url);
      if (opt_data.page.icon) {
        ie_void('span', null, null, 'class', 'sidebar-icon icon-16-' + opt_data.page.icon);
      }
      ie_open('span');
      var dyn9 = opt_data.page.title;
      if (typeof dyn9 == 'function') dyn9();else if (dyn9 != null) itext(dyn9);
      ie_close('span');
      ie_close('a');
    }
    exports.__deltemplate_s153_8c51d3e6 = __deltemplate_s153_8c51d3e6;
    if (goog.DEBUG) {
      __deltemplate_s153_8c51d3e6.soyTemplateName = 'guideFeatures.__deltemplate_s153_8c51d3e6';
    }
    soy.$$registerDelegateFn(soy.$$getDelTemplateId('SSGNavigation.anchor.idom'), 'features', 0, __deltemplate_s153_8c51d3e6);

    exports.render.params = ["page", "site"];
    exports.render.types = { "page": "any", "site": "any" };
    exports.guide.params = ["page", "content"];
    exports.guide.types = { "page": "any", "content": "any" };
    exports.feedback.params = ["page", "site"];
    exports.feedback.types = { "page": "any", "site": "any" };
    exports.sidebar.params = ["section"];
    exports.sidebar.types = { "section": "any" };
    templates = exports;
    return exports;
  });

  var guideFeatures = function (_Component) {
    babelHelpers.inherits(guideFeatures, _Component);

    function guideFeatures() {
      babelHelpers.classCallCheck(this, guideFeatures);
      return babelHelpers.possibleConstructorReturn(this, (guideFeatures.__proto__ || Object.getPrototypeOf(guideFeatures)).apply(this, arguments));
    }

    return guideFeatures;
  }(Component);

  Soy.register(guideFeatures, templates);
  this['metalNamed']['guideFeatures'] = this['metalNamed']['guideFeatures'] || {};
  this['metalNamed']['guideFeatures']['guideFeatures'] = guideFeatures;
  this['metalNamed']['guideFeatures']['templates'] = templates;
  this['metal']['guideFeatures'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['guideFeatures'];

  var guideFeatures = function (_Component) {
    babelHelpers.inherits(guideFeatures, _Component);

    function guideFeatures() {
      babelHelpers.classCallCheck(this, guideFeatures);
      return babelHelpers.possibleConstructorReturn(this, (guideFeatures.__proto__ || Object.getPrototypeOf(guideFeatures)).apply(this, arguments));
    }

    return guideFeatures;
  }(Component);

  ;

  Soy.register(guideFeatures, templates);

  this['metal']['guideFeatures'] = guideFeatures;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from guideIntro.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace guideIntro.
     * @hassoydeltemplate {SSGNavigation.anchor.idom}
     * @public
     */

    goog.module('guideIntro.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias5 = Soy.getTemplate('SSGNavigation.incrementaldom', 'render');

    var $templateAlias2 = Soy.getTemplate('SSGReadingProgress.incrementaldom', 'render');

    var $templateAlias3 = Soy.getTemplate('SSGSearchAutocomplete.incrementaldom', 'render');

    var $templateAlias1 = Soy.getTemplate('mainDocs.incrementaldom', 'render');

    var $templateAlias4 = Soy.getTemplate('sidebarHome.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'id', 'intro');
      var param171 = function param171() {
        $sidebar(soy.$$assignDefaults({ section: opt_data.site.index.children[0] }, opt_data), null, opt_ijData);
        $guide(opt_data, null, opt_ijData);
      };
      $templateAlias1(soy.$$assignDefaults({ elementClasses: 'docs', content: param171 }, opt_data), null, opt_ijData);
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'guideIntro.render';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $guide(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'class', 'sidebar-offset');
      ie_open('header', null, null, 'class', 'guide-header');
      ie_open('div', null, null, 'class', 'container-hybrid');
      ie_open('h1', null, null, 'class', 'guide-header-title');
      var dyn10 = opt_data.page.category;
      if (typeof dyn10 == 'function') dyn10();else if (dyn10 != null) itext(dyn10);
      ie_close('h1');
      ie_close('div');
      ie_close('header');
      ie_open('div', null, null, 'class', 'container-hybrid');
      ie_open('div', null, null, 'class', 'docs-guide row');
      ie_open('div', null, null, 'class', 'docs-content col-xs-16 col-md-9');
      var dyn11 = opt_data.content;
      if (typeof dyn11 == 'function') dyn11();else if (dyn11 != null) itext(dyn11);
      $feedback(opt_data, null, opt_ijData);
      ie_close('div');
      ie_open('nav', null, null, 'class', 'col-xs-16 col-md-offset-2 col-md-5');
      ie_open('div', null, null, 'class', 'docs-nav-container');
      $templateAlias2({ elementClasses: 'docs-nav' }, null, opt_ijData);
      ie_close('div');
      ie_close('nav');
      ie_close('div');
      ie_close('div');
      ie_close('div');
    }
    exports.guide = $guide;
    if (goog.DEBUG) {
      $guide.soyTemplateName = 'guideIntro.guide';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $feedback(opt_data, opt_ignored, opt_ijData) {
      var $$temp;
      ie_open('div');
      ie_open('div', null, null, 'class', 'guide-feedback');
      ie_open('p');
      itext('Was this section helpful?');
      ie_close('p');
      ie_open('button', null, null, 'class', 'btn btn-accent guide-feedback-btn guide-feedback-btn-yes');
      itext('Yes');
      ie_close('button');
      ie_open('button', null, null, 'class', 'btn btn-accent guide-feedback-btn guide-feedback-btn-no');
      itext('No');
      ie_close('button');
      ie_close('div');
      ie_open('div', null, null, 'class', 'guide-github');
      ie_open('div', null, null, 'class', 'guide-github-img');
      ie_open('img', null, null, 'src', '/img/octocat.png', 'alt', 'octocat');
      ie_close('img');
      ie_close('div');
      ie_open('div', null, null, 'class', 'guide-github-text');
      ie_open('p');
      itext('Contribute to this Doc on Github! ');
      ie_open('a', null, null, 'href', (($$temp = opt_data.site.repo) == null ? '' : $$temp) + '/tree/master/' + opt_data.page.srcFilePath, 'class', 'docs-github-link', 'target', '_blank');
      itext('Edit this section');
      ie_close('a');
      itext('.');
      ie_close('p');
      ie_close('div');
      ie_close('div');
      ie_close('div');
    }
    exports.feedback = $feedback;
    if (goog.DEBUG) {
      $feedback.soyTemplateName = 'guideIntro.feedback';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $sidebar(opt_data, opt_ignored, opt_ijData) {
      ie_open('nav', null, null, 'class', 'sidebar');
      ie_open('a', null, null, 'class', 'sidebar-header toggler-header-collapsed');
      ie_void('span', null, null, 'class', 'sidebar-icon icon-16-menu');
      ie_open('span');
      itext('Docs Menu');
      ie_close('span');
      ie_open('span', null, null, 'class', 'sidebar-icon-right');
      ie_void('span', null, null, 'class', 'icon-12-arrow-down-short');
      ie_void('span', null, null, 'class', 'icon-12-arrow-up-short');
      ie_close('span');
      ie_close('a');
      ie_open('div', null, null, 'class', 'sidebar-search');
      $templateAlias3({ section: opt_data.section, placeholder: 'Search Docs' }, null, opt_ijData);
      ie_close('div');
      $templateAlias4(opt_data, null, opt_ijData);
      $templateAlias5({ elementClasses: 'sidebar-list sidebar-list-1 toggler-collapsed', listItemClasses: 'sidebar-item', anchorVariant: 'intro', section: opt_data.section }, null, opt_ijData);
      ie_close('nav');
    }
    exports.sidebar = $sidebar;
    if (goog.DEBUG) {
      $sidebar.soyTemplateName = 'guideIntro.sidebar';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function __deltemplate_s206_bc2d3fab(opt_data, opt_ignored, opt_ijData) {
      ie_open('a', null, null, 'class', 'sidebar-link ' + (opt_data.page.active ? 'sidebar-link-selected' : ''), 'href', opt_data.page.url);
      if (opt_data.page.icon) {
        ie_void('span', null, null, 'class', 'sidebar-icon icon-16-' + opt_data.page.icon);
      }
      ie_open('span');
      var dyn12 = opt_data.page.title;
      if (typeof dyn12 == 'function') dyn12();else if (dyn12 != null) itext(dyn12);
      ie_close('span');
      ie_close('a');
    }
    exports.__deltemplate_s206_bc2d3fab = __deltemplate_s206_bc2d3fab;
    if (goog.DEBUG) {
      __deltemplate_s206_bc2d3fab.soyTemplateName = 'guideIntro.__deltemplate_s206_bc2d3fab';
    }
    soy.$$registerDelegateFn(soy.$$getDelTemplateId('SSGNavigation.anchor.idom'), 'intro', 0, __deltemplate_s206_bc2d3fab);

    exports.render.params = ["page", "site"];
    exports.render.types = { "page": "any", "site": "any" };
    exports.guide.params = ["page", "content"];
    exports.guide.types = { "page": "any", "content": "any" };
    exports.feedback.params = ["page", "site"];
    exports.feedback.types = { "page": "any", "site": "any" };
    exports.sidebar.params = ["section"];
    exports.sidebar.types = { "section": "any" };
    templates = exports;
    return exports;
  });

  var guideIntro = function (_Component) {
    babelHelpers.inherits(guideIntro, _Component);

    function guideIntro() {
      babelHelpers.classCallCheck(this, guideIntro);
      return babelHelpers.possibleConstructorReturn(this, (guideIntro.__proto__ || Object.getPrototypeOf(guideIntro)).apply(this, arguments));
    }

    return guideIntro;
  }(Component);

  Soy.register(guideIntro, templates);
  this['metalNamed']['guideIntro'] = this['metalNamed']['guideIntro'] || {};
  this['metalNamed']['guideIntro']['guideIntro'] = guideIntro;
  this['metalNamed']['guideIntro']['templates'] = templates;
  this['metal']['guideIntro'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['guideIntro'];

  var guideIntro = function (_Component) {
    babelHelpers.inherits(guideIntro, _Component);

    function guideIntro() {
      babelHelpers.classCallCheck(this, guideIntro);
      return babelHelpers.possibleConstructorReturn(this, (guideIntro.__proto__ || Object.getPrototypeOf(guideIntro)).apply(this, arguments));
    }

    return guideIntro;
  }(Component);

  ;

  Soy.register(guideIntro, templates);

  this['metal']['guideIntro'] = guideIntro;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from main.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace main.
     * @public
     */

    goog.module('main.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('Topbar.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      var $$temp;
      ie_open('div', null, null, 'class', ($$temp = opt_data.elementClasses) == null ? 'main' : $$temp);
      ie_open('main', null, null, 'class', 'content');
      $templateAlias1(opt_data, null, opt_ijData);
      var dyn13 = opt_data.content;
      if (typeof dyn13 == 'function') dyn13();else if (dyn13 != null) itext(dyn13);
      ie_close('main');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'main.render';
    }

    exports.render.params = ["content", "elementClasses"];
    exports.render.types = { "content": "any", "elementClasses": "any" };
    templates = exports;
    return exports;
  });

  var main = function (_Component) {
    babelHelpers.inherits(main, _Component);

    function main() {
      babelHelpers.classCallCheck(this, main);
      return babelHelpers.possibleConstructorReturn(this, (main.__proto__ || Object.getPrototypeOf(main)).apply(this, arguments));
    }

    return main;
  }(Component);

  Soy.register(main, templates);
  this['metalNamed']['main'] = this['metalNamed']['main'] || {};
  this['metalNamed']['main']['main'] = main;
  this['metalNamed']['main']['templates'] = templates;
  this['metal']['main'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['main'];

  var main = function (_Component) {
    babelHelpers.inherits(main, _Component);

    function main() {
      babelHelpers.classCallCheck(this, main);
      return babelHelpers.possibleConstructorReturn(this, (main.__proto__ || Object.getPrototypeOf(main)).apply(this, arguments));
    }

    return main;
  }(Component);

  ;

  Soy.register(main, templates);

  this['metal']['main'] = main;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from mainDocs.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace mainDocs.
     * @public
     */

    goog.module('mainDocs.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('TopbarDocs.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      var $$temp;
      ie_open('div', null, null, 'class', ($$temp = opt_data.elementClasses) == null ? 'main' : $$temp);
      ie_open('main', null, null, 'class', 'content');
      $templateAlias1(opt_data, null, opt_ijData);
      var dyn14 = opt_data.content;
      if (typeof dyn14 == 'function') dyn14();else if (dyn14 != null) itext(dyn14);
      ie_close('main');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'mainDocs.render';
    }

    exports.render.params = ["content", "elementClasses"];
    exports.render.types = { "content": "any", "elementClasses": "any" };
    templates = exports;
    return exports;
  });

  var mainDocs = function (_Component) {
    babelHelpers.inherits(mainDocs, _Component);

    function mainDocs() {
      babelHelpers.classCallCheck(this, mainDocs);
      return babelHelpers.possibleConstructorReturn(this, (mainDocs.__proto__ || Object.getPrototypeOf(mainDocs)).apply(this, arguments));
    }

    return mainDocs;
  }(Component);

  Soy.register(mainDocs, templates);
  this['metalNamed']['mainDocs'] = this['metalNamed']['mainDocs'] || {};
  this['metalNamed']['mainDocs']['mainDocs'] = mainDocs;
  this['metalNamed']['mainDocs']['templates'] = templates;
  this['metal']['mainDocs'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['mainDocs'];

  var mainDocs = function (_Component) {
    babelHelpers.inherits(mainDocs, _Component);

    function mainDocs() {
      babelHelpers.classCallCheck(this, mainDocs);
      return babelHelpers.possibleConstructorReturn(this, (mainDocs.__proto__ || Object.getPrototypeOf(mainDocs)).apply(this, arguments));
    }

    return mainDocs;
  }(Component);

  ;

  Soy.register(mainDocs, templates);

  this['metal']['mainDocs'] = mainDocs;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from mainUpdates.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace mainUpdates.
     * @public
     */

    goog.module('mainUpdates.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('TopbarUpdates.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      var $$temp;
      ie_open('div', null, null, 'class', ($$temp = opt_data.elementClasses) == null ? 'main' : $$temp);
      ie_open('main', null, null, 'id', 'updates', 'class', 'content');
      $templateAlias1(opt_data, null, opt_ijData);
      var dyn15 = opt_data.content;
      if (typeof dyn15 == 'function') dyn15();else if (dyn15 != null) itext(dyn15);
      ie_close('main');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'mainUpdates.render';
    }

    exports.render.params = ["content", "elementClasses"];
    exports.render.types = { "content": "any", "elementClasses": "any" };
    templates = exports;
    return exports;
  });

  var mainUpdates = function (_Component) {
    babelHelpers.inherits(mainUpdates, _Component);

    function mainUpdates() {
      babelHelpers.classCallCheck(this, mainUpdates);
      return babelHelpers.possibleConstructorReturn(this, (mainUpdates.__proto__ || Object.getPrototypeOf(mainUpdates)).apply(this, arguments));
    }

    return mainUpdates;
  }(Component);

  Soy.register(mainUpdates, templates);
  this['metalNamed']['mainUpdates'] = this['metalNamed']['mainUpdates'] || {};
  this['metalNamed']['mainUpdates']['mainUpdates'] = mainUpdates;
  this['metalNamed']['mainUpdates']['templates'] = templates;
  this['metal']['mainUpdates'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['mainUpdates'];

  var mainUpdates = function (_Component) {
    babelHelpers.inherits(mainUpdates, _Component);

    function mainUpdates() {
      babelHelpers.classCallCheck(this, mainUpdates);
      return babelHelpers.possibleConstructorReturn(this, (mainUpdates.__proto__ || Object.getPrototypeOf(mainUpdates)).apply(this, arguments));
    }

    return mainUpdates;
  }(Component);

  ;

  Soy.register(mainUpdates, templates);

  this['metal']['mainUpdates'] = mainUpdates;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from index.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace pageIndex.
     * @public
     */

    goog.module('pageIndex.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('main.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'id', 'senna-body-default');
      var param295 = function param295() {
        $header(opt_data, null, opt_ijData);
        $why(null, null, opt_ijData);
        $highlights(null, null, opt_ijData);
        $how(null, null, opt_ijData);
        $features(null, null, opt_ijData);
        $footer(null, null, opt_ijData);
      };
      $templateAlias1(soy.$$assignDefaults({ content: param295 }, opt_data), null, opt_ijData);
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'pageIndex.render';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $header(opt_data, opt_ignored, opt_ijData) {
      ie_open('header', null, null, 'class', 'header');
      ie_open('div', null, null, 'class', 'container');
      ie_open('img', null, null, 'id', 'header-logo', 'src', '../img/logo-yellow.png', 'alt', 'senna.js logo', 'height', '256');
      ie_close('img');
      ie_open('h1', null, null, 'id', 'header-h1', 'class', 'header-title');
      itext('SENNA.JS');
      ie_close('h1');
      ie_open('h2', null, null, 'class', 'header-subtitle', 'id', 'header-h2');
      var dyn16 = opt_data.site.index.description;
      if (typeof dyn16 == 'function') dyn16();else if (dyn16 != null) itext(dyn16);
      ie_close('h2');
      ie_open('div', null, null, 'id', 'header-button', 'class', 'header-cta');
      ie_open('a', null, null, 'id', 'header-button-download', 'href', 'https://github.com/liferay/senna.js/archive/master.zip', 'class', 'btn btn-accent');
      itext('Download');
      ie_close('a');
      ie_open('a', null, null, 'id', 'header-button-github', 'href', 'https://github.com/liferay/senna.js/', 'class', 'btn btn-default', 'target', '_blank');
      ie_void('span', null, null, 'class', 'icon-16-github');
      itext(' GitHub');
      ie_close('a');
      ie_close('div');
      ie_open('h2', null, null, 'id', 'header-code', 'class', 'header-subtitle');
      ie_open('code');
      itext('npm install senna');
      ie_close('code');
      ie_close('h2');
      ie_close('div');
      ie_close('header');
    }
    exports.header = $header;
    if (goog.DEBUG) {
      $header.soyTemplateName = 'pageIndex.header';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $why(opt_data, opt_ignored, opt_ijData) {
      ie_open('article', null, null, 'class', 'about');
      ie_open('div', null, null, 'class', 'container');
      ie_open('div', null, null, 'class', 'row');
      ie_open('div', null, null, 'class', 'col-md-12 col-md-offset-2');
      ie_open('h3', null, null, 'class', 'about-title');
      itext('Why Senna.js?');
      ie_close('h3');
      ie_open('p', null, null, 'class', 'about-description');
      itext('We built Senna.js to be a lightweight plugin that can turn any static site into a fast and responsive app without changing frameworks or rewriting tons of code.');
      ie_close('p');
      ie_void('p');
      ie_close('div');
      ie_close('div');
      ie_close('div');
      ie_close('article');
    }
    exports.why = $why;
    if (goog.DEBUG) {
      $why.soyTemplateName = 'pageIndex.why';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $highlights(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'id', 'view-4-highlights', 'class', 'highlights');
      ie_open('div', null, null, 'id', 'view-4', 'class', 'container');
      ie_open('section', null, null, 'class', 'highlight row');
      ie_open('div', null, null, 'class', 'col-md-6 col-md-offset-2');
      ie_open('h4', null, null, 'class', 'highlight-title');
      itext('Blazing Fast');
      ie_close('h4');
      ie_open('p', null, null, 'class', 'highlight-description');
      itext('Our clean API\'s can turn your static site into a blazing fast single-page application in just a couple clicks.');
      ie_close('p');
      ie_close('div');
      ie_open('div', null, null, 'class', 'col-md-5 col-md-offset-1');
      ie_open('img', null, null, 'class', 'highlight-image', 'src', '/img/blazingFast.png', 'width', '300px', 'alt', 'blazing fast');
      ie_close('img');
      ie_close('div');
      ie_close('section');
      ie_open('section', null, null, 'class', 'highlight row');
      ie_open('div', null, null, 'class', 'col-md-6 col-md-push-8 col-md-offset-1');
      ie_open('h4', null, null, 'class', 'highlight-title');
      itext('Minimal Bandwidth');
      ie_close('h4');
      ie_open('p', null, null, 'class', 'highlight-description');
      itext('By cacheing reusable resources like CSS and Script files, Senna significantly lowers your user\'s bandwidth.');
      ie_close('p');
      ie_close('div');
      ie_open('div', null, null, 'class', 'col-md-5 col-md-offset-1 col-md-pull-6');
      ie_open('img', null, null, 'class', 'highlight-image', 'src', '/img/minimalBandwidth.png', 'width', '300px', 'alt', 'minimal bandwidth');
      ie_close('img');
      ie_close('div');
      ie_close('section');
      ie_open('section', null, null, 'class', 'highlight row');
      ie_open('div', null, null, 'class', 'col-md-6 col-md-offset-2');
      ie_open('h4', null, null, 'class', 'highlight-title');
      itext('Incredibly Versatile');
      ie_close('h4');
      ie_open('p', null, null, 'class', 'highlight-description');
      itext('No need to switch frameworks. Senna is unobtrusive and can be easily added to your existing HTML or JavaScript.');
      ie_close('p');
      ie_close('div');
      ie_open('div', null, null, 'class', 'col-md-5 col-md-offset-1');
      ie_open('img', null, null, 'class', 'highlight-image', 'src', '/img/incrediblyVersatile.png', 'width', '300px', 'alt', 'incredibly versatile');
      ie_close('img');
      ie_close('div');
      ie_close('section');
      ie_close('div');
      ie_close('div');
    }
    exports.highlights = $highlights;
    if (goog.DEBUG) {
      $highlights.soyTemplateName = 'pageIndex.highlights';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $how(opt_data, opt_ignored, opt_ijData) {}
    exports.how = $how;
    if (goog.DEBUG) {
      $how.soyTemplateName = 'pageIndex.how';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $features(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'id', 'view-4-features', 'class', 'features');
      ie_open('div', null, null, 'class', 'container');
      ie_open('div', null, null, 'class', 'row');
      ie_open('section', null, null, 'class', 'feature col-md-16');
      ie_open('h1', null, null, 'class', 'feature-header');
      itext('How does it work?');
      ie_close('h1');
      ie_close('section');
      ie_open('section', null, null, 'class', 'feature col-md-4');
      ie_open('div', null, null, 'class', 'icon-container');
      ie_open('div', null, null, 'class', 'feature-icon flex-center-center');
      ie_void('span', null, null, 'class', 'icon-16-house');
      ie_close('div');
      ie_open('div', null, null, 'class', 'sjs-container');
      ie_open('div', null, null, 'class', 'sjs flex-center-center');
      ie_open('span');
      itext('1');
      ie_close('span');
      ie_close('div');
      ie_close('div');
      ie_close('div');
      ie_open('h3', null, null, 'class', 'feature-title');
      itext('LOAD');
      ie_close('h3');
      ie_open('p', null, null, 'class', 'feature-description');
      itext('Your app will load all the background resources on the initial page load and caches them for future use.');
      ie_close('p');
      ie_close('section');
      ie_open('section', null, null, 'class', 'feature col-md-4');
      ie_open('div', null, null, 'class', 'icon-container');
      ie_open('div', null, null, 'class', 'feature-icon flex-center-center');
      ie_void('span', null, null, 'class', 'icon-16-arrow-right-rod');
      ie_close('div');
      ie_open('div', null, null, 'class', 'sjs-container');
      ie_open('div', null, null, 'class', 'sjs flex-center-center');
      ie_open('span');
      itext('2');
      ie_close('span');
      ie_close('div');
      ie_close('div');
      ie_close('div');
      ie_open('h3', null, null, 'class', 'feature-title');
      itext('NAVIGATE');
      ie_close('h3');
      ie_open('p', null, null, 'class', 'feature-description');
      itext('A link is clicked and Senna.js populates the new url even though it is not fully loading a new page.');
      ie_close('p');
      ie_close('section');
      ie_open('section', null, null, 'class', 'feature col-md-4');
      ie_open('div', null, null, 'class', 'icon-container');
      ie_open('div', null, null, 'class', 'feature-icon flex-center-center');
      ie_void('span', null, null, 'class', 'icon-16-database');
      ie_close('div');
      ie_open('div', null, null, 'class', 'sjs-container');
      ie_open('div', null, null, 'class', 'sjs flex-center-center');
      ie_open('span');
      itext('3');
      ie_close('span');
      ie_close('div');
      ie_close('div');
      ie_close('div');
      ie_open('h3', null, null, 'class', 'feature-title');
      itext('REQUEST');
      ie_close('h3');
      ie_open('p', null, null, 'class', 'feature-description');
      itext('The request is made but Senna.js utilizes the cached resources before pulling any new elements. ');
      ie_close('p');
      ie_close('section');
      ie_open('section', null, null, 'class', 'feature col-md-4');
      ie_open('div', null, null, 'class', 'icon-container');
      ie_open('div', null, null, 'class', 'feature-icon flex-center-center');
      ie_void('span', null, null, 'class', 'icon-16-streams');
      ie_close('div');
      ie_open('div', null, null, 'class', 'sjs-container');
      ie_open('div', null, null, 'class', 'sjs flex-center-center');
      ie_open('span');
      itext('4');
      ie_close('span');
      ie_close('div');
      ie_close('div');
      ie_close('div');
      ie_open('h3', null, null, 'class', 'feature-title');
      itext('PAINT');
      ie_close('h3');
      ie_open('p', null, null, 'class', 'feature-description');
      itext('Quickly, Senna.js finds what content is new to the requested page and paints only the new content to the screen.');
      ie_close('p');
      ie_close('section');
      ie_close('div');
      ie_open('div');
      ie_open('div', null, null, 'id', 'header-button footer-download', 'class', 'header-cta row flex-center-center');
      ie_open('a', null, null, 'id', 'header-button-download', 'href', 'https://github.com/liferay/senna.js/archive/master.zip', 'class', 'btn btn-accent');
      itext('DOWNLOAD - Speed up your app now');
      ie_close('a');
      ie_close('div');
      ie_close('div');
      ie_close('div');
      ie_close('div');
    }
    exports.features = $features;
    if (goog.DEBUG) {
      $features.soyTemplateName = 'pageIndex.features';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $footer(opt_data, opt_ignored, opt_ijData) {
      ie_open('footer', null, null, 'class', 'footer');
      ie_open('div', null, null, 'class', 'container');
      ie_open('div', null, null, 'class', 'row');
      ie_open('p', null, null, 'class', 'footer-description col-md-6 col-md-offset-2');
      itext('Copyright \xA9 2016 ');
      ie_open('a', null, null, 'href', 'https://liferay.com', 'target', '_blank');
      itext('Liferay, Inc');
      ie_close('a');
      ie_close('p');
      ie_open('p', null, null, 'class', 'footer-description col-md-6');
      itext('Powered by ');
      ie_open('a', null, null, 'href', 'http://wedeploy.com', 'target', '_blank');
      itext('WeDeploy\u2122');
      ie_close('a');
      ie_close('p');
      ie_close('div');
      ie_close('div');
      ie_close('footer');
    }
    exports.footer = $footer;
    if (goog.DEBUG) {
      $footer.soyTemplateName = 'pageIndex.footer';
    }

    exports.render.params = ["site"];
    exports.render.types = { "site": "any" };
    exports.header.params = ["site"];
    exports.header.types = { "site": "any" };
    exports.why.params = [];
    exports.why.types = {};
    exports.highlights.params = [];
    exports.highlights.types = {};
    exports.how.params = [];
    exports.how.types = {};
    exports.features.params = [];
    exports.features.types = {};
    exports.footer.params = [];
    exports.footer.types = {};
    templates = exports;
    return exports;
  });

  var pageIndex = function (_Component) {
    babelHelpers.inherits(pageIndex, _Component);

    function pageIndex() {
      babelHelpers.classCallCheck(this, pageIndex);
      return babelHelpers.possibleConstructorReturn(this, (pageIndex.__proto__ || Object.getPrototypeOf(pageIndex)).apply(this, arguments));
    }

    return pageIndex;
  }(Component);

  Soy.register(pageIndex, templates);
  this['metalNamed']['index'] = this['metalNamed']['index'] || {};
  this['metalNamed']['index']['pageIndex'] = pageIndex;
  this['metalNamed']['index']['templates'] = templates;
  this['metal']['index'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['index'];

  var pageIndex = function (_Component) {
    babelHelpers.inherits(pageIndex, _Component);

    function pageIndex() {
      babelHelpers.classCallCheck(this, pageIndex);
      return babelHelpers.possibleConstructorReturn(this, (pageIndex.__proto__ || Object.getPrototypeOf(pageIndex)).apply(this, arguments));
    }

    return pageIndex;
  }(Component);

  ;

  Soy.register(pageIndex, templates);

  this['metal']['pageIndex'] = pageIndex;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from index.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace pageDocsIndex.
     * @public
     */

    goog.module('pageDocsIndex.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias2 = Soy.getTemplate('guide.incrementaldom', 'sidebar');

    var $templateAlias1 = Soy.getTemplate('mainDocs.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      var param320 = function param320() {
        $templateAlias2({ section: opt_data.site.index.children[0] }, null, opt_ijData);
        $topics(opt_data, null, opt_ijData);
      };
      $templateAlias1(soy.$$assignDefaults({ elementClasses: 'docs', content: param320 }, opt_data), null, opt_ijData);
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'pageDocsIndex.render';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $topics(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'class', 'sidebar-offset');
      ie_open('div', null, null, 'class', 'container-hybrid docs-home-top');
      ie_open('div', null, null, 'class', 'row');
      ie_open('div', null, null, 'class', 'col-xs-16');
      ie_open('h1', null, null, 'class', 'docs-home-top-title');
      ie_open('span');
      itext('SENNA.JS');
      ie_close('span');
      itext(' Docs Center');
      ie_close('h1');
      ie_open('p', null, null, 'class', 'docs-home-top-description');
      itext('Start learning how to leverage the power of Senna.js in your project.');
      ie_close('p');
      ie_close('div');
      ie_close('div');
      ie_open('div', null, null, 'class', 'row');
      ie_open('form', null, null, 'class', 'docs-home-top-form', 'action', '/docs/search.html', 'method', 'GET', 'enctype', 'multipart/form-data');
      ie_open('div', null, null, 'class', 'col-md-7 col-md-offset-3 col-xs-16');
      ie_open('div', null, null, 'class', 'form-group');
      ie_open('div', null, null, 'class', 'input-inner-addon input-inner-addon-right');
      ie_open('input', null, null, 'name', 'q', 'class', 'form-control', 'type', 'text', 'placeholder', 'Enter a search term here', 'autocomplete', 'off', 'required', '');
      ie_close('input');
      ie_void('span', null, null, 'class', 'input-inner-icon-helper icon-16-magnifier');
      ie_close('div');
      ie_close('div');
      ie_close('div');
      ie_open('div', null, null, 'class', 'col-md-3 col-xs-16');
      ie_open('button', null, null, 'class', 'btn btn-accent btn-block', 'type', 'submit');
      itext('Search');
      ie_close('button');
      ie_close('div');
      ie_close('form');
      ie_close('div');
      ie_close('div');
      ie_open('div', null, null, 'class', 'docs-home-topics');
      ie_open('div', null, null, 'class', 'container-hybrid');
      ie_open('div', null, null, 'class', 'row');
      ie_open('div', null, null, 'class', 'col-xs-16');
      ie_open('section', null, null, 'class', 'docs-home-middle');
      ie_open('h2', null, null, 'class', 'docs-home-middle-subtitle');
      itext('Choose a Guide');
      ie_close('h2');
      ie_open('p', null, null, 'class', 'docs-home-middle-description');
      itext('Each one provides step by step coverage for every core element of Senna.js.');
      ie_close('p');
      ie_close('section');
      ie_close('div');
      ie_close('div');
      ie_open('div', null, null, 'class', 'row');
      ie_open('div', null, null, 'class', 'col-md-13 col-md-offset-3 col-xs-16');
      ie_open('div', null, null, 'class', 'row');
      var topicList338 = opt_data.site.index.children[0].children;
      var topicListLen338 = topicList338.length;
      for (var topicIndex338 = 0; topicIndex338 < topicListLen338; topicIndex338++) {
        var topicData338 = topicList338[topicIndex338];
        if (!topicData338.hidden) {
          ie_open('div', null, null, 'class', 'col-md-6 col-xs-16');
          ie_open('a', null, null, 'class', 'topic topic-' + topicData338.icon + ' radial-out', 'href', topicData338.url);
          ie_open('div', null, null, 'class', 'topic-icon $topic');
          ie_void('span', null, null, 'class', 'icon-16-' + topicData338.icon);
          ie_close('div');
          ie_open('h3', null, null, 'class', 'topic-title');
          var dyn17 = topicData338.title;
          if (typeof dyn17 == 'function') dyn17();else if (dyn17 != null) itext(dyn17);
          ie_close('h3');
          ie_close('a');
          ie_close('div');
        }
      }
      ie_close('div');
      ie_close('div');
      ie_close('div');
      ie_close('div');
      ie_close('div');
      ie_close('div');
    }
    exports.topics = $topics;
    if (goog.DEBUG) {
      $topics.soyTemplateName = 'pageDocsIndex.topics';
    }

    exports.render.params = ["site"];
    exports.render.types = { "site": "any" };
    exports.topics.params = ["site"];
    exports.topics.types = { "site": "any" };
    templates = exports;
    return exports;
  });

  var pageDocsIndex = function (_Component) {
    babelHelpers.inherits(pageDocsIndex, _Component);

    function pageDocsIndex() {
      babelHelpers.classCallCheck(this, pageDocsIndex);
      return babelHelpers.possibleConstructorReturn(this, (pageDocsIndex.__proto__ || Object.getPrototypeOf(pageDocsIndex)).apply(this, arguments));
    }

    return pageDocsIndex;
  }(Component);

  Soy.register(pageDocsIndex, templates);
  this['metalNamed']['index'] = this['metalNamed']['index'] || {};
  this['metalNamed']['index']['pageDocsIndex'] = pageDocsIndex;
  this['metalNamed']['index']['templates'] = templates;
  this['metal']['index'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['index'];

  var pageDocsIndex = function (_Component) {
    babelHelpers.inherits(pageDocsIndex, _Component);

    function pageDocsIndex() {
      babelHelpers.classCallCheck(this, pageDocsIndex);
      return babelHelpers.possibleConstructorReturn(this, (pageDocsIndex.__proto__ || Object.getPrototypeOf(pageDocsIndex)).apply(this, arguments));
    }

    return pageDocsIndex;
  }(Component);

  ;

  Soy.register(pageDocsIndex, templates);

  this['metal']['pageDocsIndex'] = pageDocsIndex;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from search.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace pageDocsSearch.
     * @public
     */

    goog.module('pageDocsSearch.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias2 = Soy.getTemplate('SSGSearch.incrementaldom', 'render');

    var $templateAlias1 = Soy.getTemplate('guide.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      var param344 = function param344() {
        ie_open('div', null, null, 'class', 'container-hybrid docs-home-top');
        $templateAlias2({ action: '/docs/search.html', placeholder: 'Search Docs', section: opt_data.site.index.children[0] }, null, opt_ijData);
        ie_close('div');
      };
      $templateAlias1(soy.$$assignDefaults({ elementClasses: 'docs', content: param344 }, opt_data), null, opt_ijData);
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'pageDocsSearch.render';
    }

    exports.render.params = ["site"];
    exports.render.types = { "site": "any" };
    templates = exports;
    return exports;
  });

  var pageDocsSearch = function (_Component) {
    babelHelpers.inherits(pageDocsSearch, _Component);

    function pageDocsSearch() {
      babelHelpers.classCallCheck(this, pageDocsSearch);
      return babelHelpers.possibleConstructorReturn(this, (pageDocsSearch.__proto__ || Object.getPrototypeOf(pageDocsSearch)).apply(this, arguments));
    }

    return pageDocsSearch;
  }(Component);

  Soy.register(pageDocsSearch, templates);
  this['metalNamed']['search'] = this['metalNamed']['search'] || {};
  this['metalNamed']['search']['pageDocsSearch'] = pageDocsSearch;
  this['metalNamed']['search']['templates'] = templates;
  this['metal']['search'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['search'];

  var pageDocsSearch = function (_Component) {
    babelHelpers.inherits(pageDocsSearch, _Component);

    function pageDocsSearch() {
      babelHelpers.classCallCheck(this, pageDocsSearch);
      return babelHelpers.possibleConstructorReturn(this, (pageDocsSearch.__proto__ || Object.getPrototypeOf(pageDocsSearch)).apply(this, arguments));
    }

    return pageDocsSearch;
  }(Component);

  ;

  Soy.register(pageDocsSearch, templates);

  this['metal']['pageDocsSearch'] = pageDocsSearch;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from index.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace updatesIndex.
     * @hassoydeltemplate {SSGUpdates.feature.idom}
     * @public
     */

    goog.module('updatesIndex.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias2 = Soy.getTemplate('SSGUpdates.incrementaldom', 'render');

    var $templateAlias1 = Soy.getTemplate('mainUpdates.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      var param354 = function param354() {
        ie_open('div');
        ie_open('header', null, null, 'class', 'header');
        ie_open('div', null, null, 'class', 'container');
        ie_open('h1', null, null, 'class', 'header-title');
        itext('Updates');
        ie_close('h1');
        ie_open('h1', null, null, 'class', 'header-subtitle');
        itext('Check out what\'s new.');
        ie_close('h1');
        ie_close('div');
        ie_close('header');
        $templateAlias2({ updates: opt_data.page.updates, featureVariant: 'sennajs' }, null, opt_ijData);
        ie_close('div');
      };
      $templateAlias1(soy.$$assignDefaults({ content: param354 }, opt_data), null, opt_ijData);
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'updatesIndex.render';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function __deltemplate_s361_09f21d91(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'class', 'col-xs-16 col-sm-16 update-feature');
      ie_open('div', null, null, 'class', 'feature-topper');
      ie_void('span', null, null, 'class', 'feature-icon icon-16-' + opt_data.feature.icon);
      ie_open('h1', null, null, 'class', 'feature-header');
      var dyn18 = opt_data.feature.title;
      if (typeof dyn18 == 'function') dyn18();else if (dyn18 != null) itext(dyn18);
      itext(' ');
      ie_close('h1');
      ie_open('h3', null, null, 'class', 'feature-author');
      itext('Released by ');
      ie_close('h3');
      ie_open('a', null, null, 'href', 'https://github.com/eduardolundgren', 'target', '_blank', 'class', 'feature-author-name');
      itext('Eduardo Lundgren');
      ie_close('a');
      ie_close('div');
      ie_open('div', null, null, 'class', 'feature-content');
      ie_open('p', null, null, 'class', 'feature-lead');
      var dyn19 = opt_data.feature.description;
      if (typeof dyn19 == 'function') dyn19();else if (dyn19 != null) itext(dyn19);
      ie_close('p');
      ie_open('div', null, null, 'class', 'read-more');
      ie_open('a', null, null, 'href', opt_data.feature.url, 'target', '_blank');
      itext('Read more...');
      ie_close('a');
      ie_close('div');
      ie_close('div');
      ie_close('div');
    }
    exports.__deltemplate_s361_09f21d91 = __deltemplate_s361_09f21d91;
    if (goog.DEBUG) {
      __deltemplate_s361_09f21d91.soyTemplateName = 'updatesIndex.__deltemplate_s361_09f21d91';
    }
    soy.$$registerDelegateFn(soy.$$getDelTemplateId('SSGUpdates.feature.idom'), 'sennajs', 0, __deltemplate_s361_09f21d91);

    exports.render.params = ["page"];
    exports.render.types = { "page": "any" };
    templates = exports;
    return exports;
  });

  var updatesIndex = function (_Component) {
    babelHelpers.inherits(updatesIndex, _Component);

    function updatesIndex() {
      babelHelpers.classCallCheck(this, updatesIndex);
      return babelHelpers.possibleConstructorReturn(this, (updatesIndex.__proto__ || Object.getPrototypeOf(updatesIndex)).apply(this, arguments));
    }

    return updatesIndex;
  }(Component);

  Soy.register(updatesIndex, templates);
  this['metalNamed']['index'] = this['metalNamed']['index'] || {};
  this['metalNamed']['index']['updatesIndex'] = updatesIndex;
  this['metalNamed']['index']['templates'] = templates;
  this['metal']['index'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['index'];

  var updatesIndex = function (_Component) {
    babelHelpers.inherits(updatesIndex, _Component);

    function updatesIndex() {
      babelHelpers.classCallCheck(this, updatesIndex);
      return babelHelpers.possibleConstructorReturn(this, (updatesIndex.__proto__ || Object.getPrototypeOf(updatesIndex)).apply(this, arguments));
    }

    return updatesIndex;
  }(Component);

  ;

  Soy.register(updatesIndex, templates);

  this['metal']['updatesIndex'] = updatesIndex;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from errorHandling.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace docsDevelopErrorHandlingHtml.
     * @public
     */

    goog.module('docsDevelopErrorHandlingHtml.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('guide.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      var param406 = function param406() {
        ie_open('h1');
        itext('Error Handling');
        ie_close('h1');
        ie_open('article', null, null, 'id', 'error-handling');
        ie_open('h2');
        itext('Error Handling');
        ie_close('h2');
        ie_open('p');
        itext('It\'s important to understand how to handle errors when using Senna.js. The three error handling options in Senna.js are Invalid Status, Request Error, and Timeout.');
        ie_close('p');
        ie_open('blockquote');
        ie_open('p');
        ie_open('strong');
        itext('Invalid Status:');
        ie_close('strong');
        ie_close('p');
        ie_open('p');
        itext('Returns true for an invalid status. Any status code 2xx or 3xx is considered valid.');
        ie_close('p');
        ie_close('blockquote');
        ie_open('blockquote');
        ie_open('p');
        ie_open('strong');
        itext('Request Error:');
        ie_close('strong');
        ie_close('p');
        ie_open('p');
        itext('Returns true if there was an error with the request.');
        ie_close('p');
        ie_close('blockquote');
        ie_open('blockquote');
        ie_open('p');
        ie_open('strong');
        itext('Timeout:');
        ie_close('strong');
        ie_close('p');
        ie_open('p');
        itext('Returns true if the request timed out.');
        ie_close('p');
        ie_close('blockquote');
        ie_open('p');
        itext('With just one simple funciton, you can control how your app handles those errors.');
        ie_close('p');
        ie_void('p');
        itext('\n');
        ie_open('pre');
        ie_open('code');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('script');
        ie_close('span');
        itext('>');
        ie_close('span');
        ie_open('span', null, null, 'class', 'actionscript');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('var');
        ie_close('span');
        itext(' app = ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('new');
        ie_close('span');
        itext(' senna.App();\n\n  app.on(');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('\'endNavigate\'');
        ie_close('span');
        itext(', ');
        ie_open('span', null, null, 'class', 'hljs-function');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('function');
        ie_close('span');
        ie_open('span', null, null, 'class', 'hljs-params');
        itext('(event)');
        ie_close('span');
        itext(' ');
        ie_close('span');
        itext('{\n    ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('if');
        ie_close('span');
        itext(' (event.error) {\n      ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('if');
        ie_close('span');
        itext(' (event.error.invalidStatus) {\n        ');
        ie_open('span', null, null, 'class', 'hljs-comment');
        itext('//do something to handle invalid status');
        ie_close('span');
        itext('\n      }\n\n      ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('if');
        ie_close('span');
        itext(' (event.error.requestError) {\n        ');
        ie_open('span', null, null, 'class', 'hljs-comment');
        itext('//do something to handle an error with the request');
        ie_close('span');
        itext('\n      }\n\n      ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('if');
        ie_close('span');
        itext(' (event.error.timeout) {\n        ');
        ie_open('span', null, null, 'class', 'hljs-comment');
        itext('//do something to handle a timeout');
        ie_close('span');
        itext('\n      }\n\n      ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('if');
        ie_close('span');
        itext(' (event.error.statusCode == ');
        ie_open('span', null, null, 'class', 'hljs-number');
        itext('404');
        ie_close('span');
        itext(') {\n        ');
        ie_open('span', null, null, 'class', 'hljs-comment');
        itext('//return "Page Not Found" message');
        ie_close('span');
        itext('\n      }\n    }\n  });\n');
        ie_close('span');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('script');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_close('code');
        ie_close('pre');
        itext('\n');
        ie_void('p');
        ie_close('article');
      };
      $templateAlias1(soy.$$assignDefaults({ content: param406 }, opt_data), null, opt_ijData);
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'docsDevelopErrorHandlingHtml.render';
    }

    exports.render.params = [];
    exports.render.types = {};
    templates = exports;
    return exports;
  });

  var docsDevelopErrorHandlingHtml = function (_Component) {
    babelHelpers.inherits(docsDevelopErrorHandlingHtml, _Component);

    function docsDevelopErrorHandlingHtml() {
      babelHelpers.classCallCheck(this, docsDevelopErrorHandlingHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsDevelopErrorHandlingHtml.__proto__ || Object.getPrototypeOf(docsDevelopErrorHandlingHtml)).apply(this, arguments));
    }

    return docsDevelopErrorHandlingHtml;
  }(Component);

  Soy.register(docsDevelopErrorHandlingHtml, templates);
  this['metalNamed']['errorHandling'] = this['metalNamed']['errorHandling'] || {};
  this['metalNamed']['errorHandling']['docsDevelopErrorHandlingHtml'] = docsDevelopErrorHandlingHtml;
  this['metalNamed']['errorHandling']['templates'] = templates;
  this['metal']['errorHandling'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['errorHandling'];

  var docsDevelopErrorHandlingHtml = function (_Component) {
    babelHelpers.inherits(docsDevelopErrorHandlingHtml, _Component);

    function docsDevelopErrorHandlingHtml() {
      babelHelpers.classCallCheck(this, docsDevelopErrorHandlingHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsDevelopErrorHandlingHtml.__proto__ || Object.getPrototypeOf(docsDevelopErrorHandlingHtml)).apply(this, arguments));
    }

    return docsDevelopErrorHandlingHtml;
  }(Component);

  ;

  Soy.register(docsDevelopErrorHandlingHtml, templates);

  this['metal']['docsDevelopErrorHandlingHtml'] = docsDevelopErrorHandlingHtml;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from index.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace docsDevelopIndexHtml.
     * @public
     */

    goog.module('docsDevelopIndexHtml.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('guide.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      var param411 = function param411() {};
      $templateAlias1(soy.$$assignDefaults({ content: param411 }, opt_data), null, opt_ijData);
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'docsDevelopIndexHtml.render';
    }

    exports.render.params = [];
    exports.render.types = {};
    templates = exports;
    return exports;
  });

  var docsDevelopIndexHtml = function (_Component) {
    babelHelpers.inherits(docsDevelopIndexHtml, _Component);

    function docsDevelopIndexHtml() {
      babelHelpers.classCallCheck(this, docsDevelopIndexHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsDevelopIndexHtml.__proto__ || Object.getPrototypeOf(docsDevelopIndexHtml)).apply(this, arguments));
    }

    return docsDevelopIndexHtml;
  }(Component);

  Soy.register(docsDevelopIndexHtml, templates);
  this['metalNamed']['index'] = this['metalNamed']['index'] || {};
  this['metalNamed']['index']['docsDevelopIndexHtml'] = docsDevelopIndexHtml;
  this['metalNamed']['index']['templates'] = templates;
  this['metal']['index'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['index'];

  var docsDevelopIndexHtml = function (_Component) {
    babelHelpers.inherits(docsDevelopIndexHtml, _Component);

    function docsDevelopIndexHtml() {
      babelHelpers.classCallCheck(this, docsDevelopIndexHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsDevelopIndexHtml.__proto__ || Object.getPrototypeOf(docsDevelopIndexHtml)).apply(this, arguments));
    }

    return docsDevelopIndexHtml;
  }(Component);

  ;

  Soy.register(docsDevelopIndexHtml, templates);

  this['metal']['docsDevelopIndexHtml'] = docsDevelopIndexHtml;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from jsAPI.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace docsDevelopJsApiHtml.
     * @public
     */

    goog.module('docsDevelopJsApiHtml.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('guide.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      var param415 = function param415() {
        ie_open('p');
        itext('JavaScript APIs');
        ie_close('p');
        ie_open('article', null, null, 'id', 'js-api');
        ie_open('h2');
        itext('Full control using JavaScript APIs');
        ie_close('h2');
        ie_open('p');
        itext('It\'s easy to create your own screen whenever you want.');
        ie_close('p');
        ie_open('p');
        itext('Let\'s say for example that you need a screen that injects the content "Header changed" and "Body changed" on the respective surface elements when you navigate to the path ');
        ie_open('code');
        itext('/foo');
        ie_close('code');
        itext('.');
        ie_close('p');
        ie_void('p');
        itext('\n');
        ie_open('pre');
        ie_open('code');
        ie_open('span', null, null, 'class', 'hljs-function');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('function');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-title');
        itext('FooScreen');
        ie_close('span');
        ie_open('span', null, null, 'class', 'hljs-params');
        itext('()');
        ie_close('span');
        itext(' ');
        ie_close('span');
        itext('{\n  FooScreen.base(');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('this');
        ie_close('span');
        itext(', ');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('\'constructor\'');
        ie_close('span');
        itext(');\n}\nsenna.inherits(FooScreen, senna.Screen);\n\nFooScreen.prototype.cached = ');
        ie_open('span', null, null, 'class', 'hljs-literal');
        itext('true');
        ie_close('span');
        itext(';\n\nFooScreen.prototype.getSurfaceContent = ');
        ie_open('span', null, null, 'class', 'hljs-function');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('function');
        ie_close('span');
        ie_open('span', null, null, 'class', 'hljs-params');
        itext('(surfaceId)');
        ie_close('span');
        itext(' ');
        ie_close('span');
        itext('{\n  ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('switch');
        ie_close('span');
        itext('(surfaceId) {\n    ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('case');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('\'header\'');
        ie_close('span');
        itext(':\n      ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('return');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('\'Header changed\'');
        ie_close('span');
        itext(';\n    ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('case');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('\'body\'');
        ie_close('span');
        itext(':\n      ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('return');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('\'Body changed\'');
        ie_close('span');
        itext(';\n  }\n};\n');
        ie_close('code');
        ie_close('pre');
        itext('\n');
        ie_void('p');
        ie_void('p');
        itext('\n');
        ie_open('pre');
        ie_open('code');
        ie_open('span', null, null, 'class', 'hljs-meta');
        itext('<!doctype html>');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('html');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('head');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('meta');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('charset');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"utf-8"');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('title');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('Senna - hello');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('title');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-comment');
        itext('<!-- Senna optional styles -->');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('link');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('rel');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"stylesheet"');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('href');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"../build/senna.css"');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-comment');
        itext('<!-- Senna -->');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('script');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('src');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"../build/senna-debug.js"');
        ie_close('span');
        itext('>');
        ie_close('span');
        ie_void('span', null, null, 'class', 'undefined');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('script');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('head');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('body');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-comment');
        itext('<!-- Content surface -->');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('div');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('id');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"header"');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n    Header\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('div');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('div');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('id');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"body"');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n    Body\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('div');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-comment');
        itext('<!-- End of content surface -->');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('script');
        ie_close('span');
        itext('>');
        ie_close('span');
        ie_open('span', null, null, 'class', 'actionscript');
        itext('\n    ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('var');
        ie_close('span');
        itext(' app = ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('new');
        ie_close('span');
        itext(' senna.App();\n    app.addSurfaces([');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('\'header\'');
        ie_close('span');
        itext(', ');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('\'body\'');
        ie_close('span');
        itext(']);\n    app.addRoutes(');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('new');
        ie_close('span');
        itext(' senna.Route(');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('\'/foo\'');
        ie_close('span');
        itext(', FooScreen));\n  ');
        ie_close('span');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('script');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('body');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('html');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_close('code');
        ie_close('pre');
        itext('\n');
        ie_void('p');
        ie_close('article');
      };
      $templateAlias1(soy.$$assignDefaults({ content: param415 }, opt_data), null, opt_ijData);
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'docsDevelopJsApiHtml.render';
    }

    exports.render.params = [];
    exports.render.types = {};
    templates = exports;
    return exports;
  });

  var docsDevelopJsApiHtml = function (_Component) {
    babelHelpers.inherits(docsDevelopJsApiHtml, _Component);

    function docsDevelopJsApiHtml() {
      babelHelpers.classCallCheck(this, docsDevelopJsApiHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsDevelopJsApiHtml.__proto__ || Object.getPrototypeOf(docsDevelopJsApiHtml)).apply(this, arguments));
    }

    return docsDevelopJsApiHtml;
  }(Component);

  Soy.register(docsDevelopJsApiHtml, templates);
  this['metalNamed']['jsAPI'] = this['metalNamed']['jsAPI'] || {};
  this['metalNamed']['jsAPI']['docsDevelopJsApiHtml'] = docsDevelopJsApiHtml;
  this['metalNamed']['jsAPI']['templates'] = templates;
  this['metal']['jsAPI'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['jsAPI'];

  var docsDevelopJsApiHtml = function (_Component) {
    babelHelpers.inherits(docsDevelopJsApiHtml, _Component);

    function docsDevelopJsApiHtml() {
      babelHelpers.classCallCheck(this, docsDevelopJsApiHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsDevelopJsApiHtml.__proto__ || Object.getPrototypeOf(docsDevelopJsApiHtml)).apply(this, arguments));
    }

    return docsDevelopJsApiHtml;
  }(Component);

  ;

  Soy.register(docsDevelopJsApiHtml, templates);

  this['metal']['docsDevelopJsApiHtml'] = docsDevelopJsApiHtml;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from routes.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace docsDevelopRoutesHtml.
     * @public
     */

    goog.module('docsDevelopRoutesHtml.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('guide.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      var param420 = function param420() {
        ie_open('h1');
        itext('Routes');
        ie_close('h1');
        ie_open('article', null, null, 'id', 'Routes');
        ie_open('h2');
        itext('Routes');
        ie_close('h2');
        ie_open('p');
        itext('As seen on the previous example, you can register ');
        ie_open('code');
        itext('senna.Route');
        ie_close('code');
        itext(' on ');
        ie_open('code');
        itext('senna.App');
        ie_close('code');
        itext('. A route is a tuple containing a path and a handler function:');
        ie_close('p');
        ie_void('p');
        itext('\n');
        ie_open('pre');
        ie_open('code');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('var');
        ie_close('span');
        itext(' route = ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('new');
        ie_close('span');
        itext(' senna.Route(');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('\'/path/file.html\'');
        ie_close('span');
        itext(', ');
        ie_open('span', null, null, 'class', 'hljs-function');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('function');
        ie_close('span');
        ie_open('span', null, null, 'class', 'hljs-params');
        itext('()');
        ie_close('span');
        itext(' ');
        ie_close('span');
        itext('{\n  ');
        ie_open('span', null, null, 'class', 'hljs-comment');
        itext('// Fires when a link with path /path/file.html is clicked.');
        ie_close('span');
        itext('\n});\n');
        ie_close('code');
        ie_close('pre');
        itext('\n');
        ie_void('p');
        ie_open('p');
        itext('The path also supports strings, regular expressions or functions.');
        ie_close('p');
        ie_void('p');
        itext('\n');
        ie_open('pre');
        ie_open('code');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('var');
        ie_close('span');
        itext(' route = ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('new');
        ie_close('span');
        itext(' senna.Route(');
        ie_open('span', null, null, 'class', 'hljs-regexp');
        itext('/.*/');
        ie_close('span');
        itext(', ');
        ie_open('span', null, null, 'class', 'hljs-function');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('function');
        ie_close('span');
        itext('(');
        ie_void('span', null, null, 'class', 'hljs-params');
        itext(') ');
        ie_close('span');
        itext('{\n  ');
        ie_open('span', null, null, 'class', 'hljs-comment');
        itext('// Fires when any link is clicked.');
        ie_close('span');
        itext('\n});\n');
        ie_close('code');
        ie_close('pre');
        itext('\n');
        ie_void('p');
        ie_void('p');
        itext('\n');
        ie_open('pre');
        ie_open('code');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('var');
        ie_close('span');
        itext(' resolvePath = ');
        ie_open('span', null, null, 'class', 'hljs-function');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('function');
        ie_close('span');
        ie_open('span', null, null, 'class', 'hljs-params');
        itext('()');
        ie_close('span');
        itext(' ');
        ie_close('span');
        itext('{\n  ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('return');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('\'/path/file.html\'');
        ie_close('span');
        itext(';\n}\n');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('var');
        ie_close('span');
        itext(' route = ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('new');
        ie_close('span');
        itext(' senna.Route(resolvePath, ');
        ie_open('span', null, null, 'class', 'hljs-function');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('function');
        ie_close('span');
        ie_open('span', null, null, 'class', 'hljs-params');
        itext('()');
        ie_close('span');
        itext(' ');
        ie_close('span');
        itext('{\n  ');
        ie_open('span', null, null, 'class', 'hljs-comment');
        itext('// Fires when a link with path /path/file.html is clicked.');
        ie_close('span');
        itext('\n});\n');
        ie_close('code');
        ie_close('pre');
        itext('\n');
        ie_void('p');
        ie_open('p');
        itext('From the handler callback you can update parts of your page, though it is hard to grow your application from a simple callback like this. For that reason, Senna.js provides ');
        ie_open('code');
        itext('senna.Screen');
        ie_close('code');
        itext('. A screen is nothing more than a special type of route handler that provides an asynchronous lifecycle. The following section will detail how ');
        ie_open('code');
        itext('senna.Screen');
        ie_close('code');
        itext(' can help you manage your surfaces.');
        ie_close('p');
        ie_close('article');
      };
      $templateAlias1(soy.$$assignDefaults({ content: param420 }, opt_data), null, opt_ijData);
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'docsDevelopRoutesHtml.render';
    }

    exports.render.params = [];
    exports.render.types = {};
    templates = exports;
    return exports;
  });

  var docsDevelopRoutesHtml = function (_Component) {
    babelHelpers.inherits(docsDevelopRoutesHtml, _Component);

    function docsDevelopRoutesHtml() {
      babelHelpers.classCallCheck(this, docsDevelopRoutesHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsDevelopRoutesHtml.__proto__ || Object.getPrototypeOf(docsDevelopRoutesHtml)).apply(this, arguments));
    }

    return docsDevelopRoutesHtml;
  }(Component);

  Soy.register(docsDevelopRoutesHtml, templates);
  this['metalNamed']['routes'] = this['metalNamed']['routes'] || {};
  this['metalNamed']['routes']['docsDevelopRoutesHtml'] = docsDevelopRoutesHtml;
  this['metalNamed']['routes']['templates'] = templates;
  this['metal']['routes'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['routes'];

  var docsDevelopRoutesHtml = function (_Component) {
    babelHelpers.inherits(docsDevelopRoutesHtml, _Component);

    function docsDevelopRoutesHtml() {
      babelHelpers.classCallCheck(this, docsDevelopRoutesHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsDevelopRoutesHtml.__proto__ || Object.getPrototypeOf(docsDevelopRoutesHtml)).apply(this, arguments));
    }

    return docsDevelopRoutesHtml;
  }(Component);

  ;

  Soy.register(docsDevelopRoutesHtml, templates);

  this['metal']['docsDevelopRoutesHtml'] = docsDevelopRoutesHtml;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from trackableResources.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace docsDevelopTrackableResourcesHtml.
     * @public
     */

    goog.module('docsDevelopTrackableResourcesHtml.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('guide.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      var param425 = function param425() {
        ie_open('h1');
        itext('Trackable Resources');
        ie_close('h1');
        ie_open('article', null, null, 'id', 'trackable-resources');
        ie_open('h2');
        itext('Trackable Resources');
        ie_close('h2');
        ie_open('p');
        itext('Senna.js provides an easy way to manage external style and script resources on the page. When including resources in the ');
        ie_open('code');
        itext('<head>');
        ie_close('code');
        itext(', they can be annotated with the ');
        ie_open('code');
        itext('data-senna-track');
        ie_close('code');
        itext(' attribute. This attribute can be set to ');
        ie_open('code');
        itext('temporary');
        ie_close('code');
        itext(' or ');
        ie_open('code');
        itext('permanent');
        ie_close('code');
        itext(', which determines whether a resource remains on the page permanently or is removed after navigation;');
        ie_close('p');
        ie_void('p');
        itext('\n');
        ie_open('pre');
        ie_open('code');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('link');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('data-senna-track');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"permanent"');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('href');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"main.css"');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('rel');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"stylesheet"');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('script');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('data-senna-track');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"temporary"');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('src');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"main.js"');
        ie_close('span');
        itext('>');
        ie_close('span');
        ie_void('span', null, null, 'class', 'undefined');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('script');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_close('code');
        ie_close('pre');
        itext('\n');
        ie_void('p');
        ie_close('article');
      };
      $templateAlias1(soy.$$assignDefaults({ content: param425 }, opt_data), null, opt_ijData);
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'docsDevelopTrackableResourcesHtml.render';
    }

    exports.render.params = [];
    exports.render.types = {};
    templates = exports;
    return exports;
  });

  var docsDevelopTrackableResourcesHtml = function (_Component) {
    babelHelpers.inherits(docsDevelopTrackableResourcesHtml, _Component);

    function docsDevelopTrackableResourcesHtml() {
      babelHelpers.classCallCheck(this, docsDevelopTrackableResourcesHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsDevelopTrackableResourcesHtml.__proto__ || Object.getPrototypeOf(docsDevelopTrackableResourcesHtml)).apply(this, arguments));
    }

    return docsDevelopTrackableResourcesHtml;
  }(Component);

  Soy.register(docsDevelopTrackableResourcesHtml, templates);
  this['metalNamed']['trackableResources'] = this['metalNamed']['trackableResources'] || {};
  this['metalNamed']['trackableResources']['docsDevelopTrackableResourcesHtml'] = docsDevelopTrackableResourcesHtml;
  this['metalNamed']['trackableResources']['templates'] = templates;
  this['metal']['trackableResources'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['trackableResources'];

  var docsDevelopTrackableResourcesHtml = function (_Component) {
    babelHelpers.inherits(docsDevelopTrackableResourcesHtml, _Component);

    function docsDevelopTrackableResourcesHtml() {
      babelHelpers.classCallCheck(this, docsDevelopTrackableResourcesHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsDevelopTrackableResourcesHtml.__proto__ || Object.getPrototypeOf(docsDevelopTrackableResourcesHtml)).apply(this, arguments));
    }

    return docsDevelopTrackableResourcesHtml;
  }(Component);

  ;

  Soy.register(docsDevelopTrackableResourcesHtml, templates);

  this['metal']['docsDevelopTrackableResourcesHtml'] = docsDevelopTrackableResourcesHtml;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from uiFeedback.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace docsDevelopUiFeedbackHtml.
     * @public
     */

    goog.module('docsDevelopUiFeedbackHtml.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('guide.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      var param430 = function param430() {
        ie_open('h1');
        itext('UI Feedback');
        ie_close('h1');
        ie_open('article', null, null, 'id', 'default-ui-feedback');
        ie_open('h6');
        itext('If you have large content on your page and it takes time to load, you can give your users feedback so they know the content is coming.');
        ie_close('h6');
        ie_open('h2');
        itext('1. Add UI Feedback');
        ie_close('h2');
        ie_open('p');
        itext('Senna comes with working UI feedback straight out of the box. All you have to do is add ');
        ie_open('code');
        itext('<div class="senn-loading-bar"></div>');
        ie_close('code');
        itext(' to the top of your ');
        ie_open('code');
        itext('<body>');
        ie_close('code');
        itext('.');
        ie_close('p');
        ie_void('p');
        itext('\n');
        ie_open('pre');
        ie_open('code');
        ie_open('span', null, null, 'class', 'hljs-meta');
        itext('<!doctype html>');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('html');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('head');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n    ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('meta');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('charset');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"UTF-8"');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n    ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('title');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('UI Feedback');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('title');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n    ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('link');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('rel');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"shortcut icon"');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('href');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"http://sennajs.com/images/favicon.ico"');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n    ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('script');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('src');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"../../build/globals/senna-debug.js"');
        ie_close('span');
        itext('>');
        ie_close('span');
        ie_void('span', null, null, 'class', 'undefined');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('script');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('head');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('body');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('data-senna');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('data-senna-surface');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n    ');
        ie_open('span', null, null, 'class', 'hljs-comment');
        itext('<!-- Add Senna UI Feedback -->');
        ie_close('span');
        itext('\n    ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('div');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('class');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"senn-loading-bar"');
        ie_close('span');
        itext('>');
        ie_close('span');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('div');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n    ');
        ie_open('span', null, null, 'class', 'hljs-comment');
        itext('<!-- Body content -->');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('body');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('html');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_close('code');
        ie_close('pre');
        itext('\n');
        ie_void('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'customize-feedback');
        ie_open('h2');
        itext('2. Customize using CSS');
        ie_close('h2');
        ie_open('p');
        itext('Now that you have added the default UI Feedback, you can edit the style of the animation inside of ');
        ie_open('code');
        itext('senna/src/senna.css');
        ie_close('code');
        itext('.');
        ie_close('p');
        ie_void('p');
        itext('\n');
        ie_open('pre');
        ie_open('code');
        ie_open('span', null, null, 'class', 'hljs-selector-class');
        itext('.senna-loading');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-selector-class');
        itext('.senna-loading-bar');
        ie_close('span');
        itext(' {\n  ');
        ie_open('span', null, null, 'class', 'hljs-attribute');
        itext('animation');
        ie_close('span');
        itext(': shift-rightwards ');
        ie_open('span', null, null, 'class', 'hljs-number');
        itext('1s');
        ie_close('span');
        itext(' ease-in-out infinite;\n  ');
        ie_open('span', null, null, 'class', 'hljs-attribute');
        itext('animation-delay');
        ie_close('span');
        itext(': .');
        ie_open('span', null, null, 'class', 'hljs-number');
        itext('4s');
        ie_close('span');
        itext(';\n  ');
        ie_open('span', null, null, 'class', 'hljs-attribute');
        itext('display');
        ie_close('span');
        itext(': block;\n}\n\n');
        ie_open('span', null, null, 'class', 'hljs-selector-class');
        itext('.senna-loading-bar');
        ie_close('span');
        itext(' {\n  ');
        ie_open('span', null, null, 'class', 'hljs-attribute');
        itext('transform');
        ie_close('span');
        itext(': ');
        ie_open('span', null, null, 'class', 'hljs-built_in');
        itext('translateX');
        ie_close('span');
        itext('(100%);\n  \n  ');
        ie_open('span', null, null, 'class', 'hljs-comment');
        itext('/* Change color of feedback bar */');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-attribute');
        itext('background');
        ie_close('span');
        itext(': ');
        ie_open('span', null, null, 'class', 'hljs-number');
        itext('#2fa4f5');
        ie_close('span');
        itext(';\n\n  ');
        ie_open('span', null, null, 'class', 'hljs-attribute');
        itext('display');
        ie_close('span');
        itext(': none;\n  ');
        ie_open('span', null, null, 'class', 'hljs-attribute');
        itext('height');
        ie_close('span');
        itext(': ');
        ie_open('span', null, null, 'class', 'hljs-number');
        itext('2px');
        ie_close('span');
        itext(';\n  ');
        ie_open('span', null, null, 'class', 'hljs-attribute');
        itext('left');
        ie_close('span');
        itext(': ');
        ie_open('span', null, null, 'class', 'hljs-number');
        itext('0');
        ie_close('span');
        itext(';\n  ');
        ie_open('span', null, null, 'class', 'hljs-attribute');
        itext('position');
        ie_close('span');
        itext(': fixed;\n  ');
        ie_open('span', null, null, 'class', 'hljs-attribute');
        itext('right');
        ie_close('span');
        itext(': ');
        ie_open('span', null, null, 'class', 'hljs-number');
        itext('0');
        ie_close('span');
        itext(';\n  ');
        ie_open('span', null, null, 'class', 'hljs-attribute');
        itext('top');
        ie_close('span');
        itext(': ');
        ie_open('span', null, null, 'class', 'hljs-number');
        itext('0');
        ie_close('span');
        itext(';\n  ');
        ie_open('span', null, null, 'class', 'hljs-attribute');
        itext('z-index');
        ie_close('span');
        itext(': ');
        ie_open('span', null, null, 'class', 'hljs-number');
        itext('10000');
        ie_close('span');
        itext(';\n}\n');
        ie_close('code');
        ie_close('pre');
        itext('\n');
        ie_void('p');
        ie_close('article');
      };
      $templateAlias1(soy.$$assignDefaults({ content: param430 }, opt_data), null, opt_ijData);
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'docsDevelopUiFeedbackHtml.render';
    }

    exports.render.params = [];
    exports.render.types = {};
    templates = exports;
    return exports;
  });

  var docsDevelopUiFeedbackHtml = function (_Component) {
    babelHelpers.inherits(docsDevelopUiFeedbackHtml, _Component);

    function docsDevelopUiFeedbackHtml() {
      babelHelpers.classCallCheck(this, docsDevelopUiFeedbackHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsDevelopUiFeedbackHtml.__proto__ || Object.getPrototypeOf(docsDevelopUiFeedbackHtml)).apply(this, arguments));
    }

    return docsDevelopUiFeedbackHtml;
  }(Component);

  Soy.register(docsDevelopUiFeedbackHtml, templates);
  this['metalNamed']['uiFeedback'] = this['metalNamed']['uiFeedback'] || {};
  this['metalNamed']['uiFeedback']['docsDevelopUiFeedbackHtml'] = docsDevelopUiFeedbackHtml;
  this['metalNamed']['uiFeedback']['templates'] = templates;
  this['metal']['uiFeedback'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['uiFeedback'];

  var docsDevelopUiFeedbackHtml = function (_Component) {
    babelHelpers.inherits(docsDevelopUiFeedbackHtml, _Component);

    function docsDevelopUiFeedbackHtml() {
      babelHelpers.classCallCheck(this, docsDevelopUiFeedbackHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsDevelopUiFeedbackHtml.__proto__ || Object.getPrototypeOf(docsDevelopUiFeedbackHtml)).apply(this, arguments));
    }

    return docsDevelopUiFeedbackHtml;
  }(Component);

  ;

  Soy.register(docsDevelopUiFeedbackHtml, templates);

  this['metal']['docsDevelopUiFeedbackHtml'] = docsDevelopUiFeedbackHtml;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from controllingSurfaces.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace docsFullyFunctionalControllingSurfacesHtml.
     * @public
     */

    goog.module('docsFullyFunctionalControllingSurfacesHtml.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('guide.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      var param373 = function param373() {
        ie_open('h1');
        itext('Controlling Surfaces');
        ie_close('h1');
        ie_open('article', null, null, 'id', 'data-attributes-explained');
        ie_open('h2');
        itext('How do you make sure Senna does exactly what you want?');
        ie_close('h2');
        ie_open('p');
        itext('By default, Senna is setup to route every link to ');
        ie_open('code');
        itext('senna.HTMLScreen');
        ie_close('code');
        itext('- the out-of-the-box screen that senna provides to handle navigation so you don\'t have to change anything in your existing back end.');
        ie_close('p');
        ie_open('p');
        itext('For most situations, this will be the ideal use of Senna because it is smart enough to know how to paint your surfaces with the new information when you navigate.');
        ie_close('p');
        ie_open('p');
        itext('But what if you want Senna to only be active during certain navigations? We make it easy for you to control what screens of your app interact with Senna and which ones do not. We call this ');
        ie_open('a', null, null, 'href', '#taking-control');
        itext('Controlling Data Attributes');
        ie_close('a');
        itext('.');
        ie_close('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'taking-control');
        ie_open('h2');
        itext('Taking control of your surfaces');
        ie_close('h2');
        ie_open('p');
        itext('Once you have Senna fully running (see ');
        ie_open('a', null, null, 'href', '/docs/intro/gettingStarted.html');
        itext('Getting Started');
        ie_close('a');
        itext(' if you are not sure), you can choose to limit Senna by controlling the data attributes.');
        ie_close('p');
        ie_open('p');
        itext('In order to limit your whole app from routing through ');
        ie_open('code');
        itext('senna.HTMLScreen');
        ie_close('code');
        itext(', you can add ');
        ie_open('code');
        itext('<link rel="senna-route">');
        ie_close('code');
        itext(' to the ');
        ie_open('code');
        itext('head');
        ie_close('code');
        itext(' of your document. This will tell Senna to ');
        ie_open('strong');
        itext('only');
        ie_close('strong');
        itext(' route your specified paths through ');
        ie_open('code');
        itext('senna.HTMLScreen');
        ie_close('code');
        itext('. Your document would look like this:');
        ie_close('p');
        ie_void('p');
        itext('\n');
        ie_open('pre');
        ie_open('code');
        ie_open('span', null, null, 'class', 'hljs-meta');
        itext('<!doctype html>');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('html');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('head');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('meta');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('charset');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"utf-8"');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('title');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('Senna - blazing fast apps');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('title');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('link');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('rel');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"stylesheet"');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('href');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"../build/senna.css"');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n    ');
        ie_open('span', null, null, 'class', 'hljs-comment');
        itext('<!-- Controlling Data Attributes -->');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('link');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('rel');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"senna-route"');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('href');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"/examplePage1.html"');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('type');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"senna.HtmlScreen"');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('script');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('src');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"../build/senna-debug.js"');
        ie_close('span');
        itext('>');
        ie_close('span');
        ie_void('span', null, null, 'class', 'undefined');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('script');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('head');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('body');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('data-senna');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('a');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('href');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"/pages/examplePage1.html"');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('Page 1');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('a');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('a');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('href');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"/pages/examplePage2.html"');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('Page 2');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('a');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('div');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('id');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"my-awesome-surface"');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('data-senna-surface');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n    ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('p');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('Default content of my website.');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('p');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('div');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('body');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('html');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_close('code');
        ie_close('pre');
        itext('\n');
        ie_void('p');
        ie_open('p');
        itext('You can also use ');
        ie_open('a', null, null, 'href', 'https://en.wikipedia.org/wiki/Regular_expression', 'target', '_blank');
        itext('RegEx');
        ie_close('a');
        itext(' to select multiple paths with one string.');
        ie_close('p');
        ie_void('p');
        itext('\n');
        ie_open('pre');
        ie_open('code');
        itext('<link ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('rel');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"senna-route"');
        ie_close('span');
        itext(' href=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"examplePage1.html"');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('type');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"senna.HtmlScreen"');
        ie_close('span');
        itext('>\n<link ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('rel');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"senna-route"');
        ie_close('span');
        itext(' href=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"regex:examplePage[1-9].html"');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('type');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"senna.HtmlScreen"');
        ie_close('span');
        itext('>\n');
        ie_close('code');
        ie_close('pre');
        itext('\n');
        ie_void('p');
        ie_close('article');
      };
      $templateAlias1(soy.$$assignDefaults({ content: param373 }, opt_data), null, opt_ijData);
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'docsFullyFunctionalControllingSurfacesHtml.render';
    }

    exports.render.params = [];
    exports.render.types = {};
    templates = exports;
    return exports;
  });

  var docsFullyFunctionalControllingSurfacesHtml = function (_Component) {
    babelHelpers.inherits(docsFullyFunctionalControllingSurfacesHtml, _Component);

    function docsFullyFunctionalControllingSurfacesHtml() {
      babelHelpers.classCallCheck(this, docsFullyFunctionalControllingSurfacesHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsFullyFunctionalControllingSurfacesHtml.__proto__ || Object.getPrototypeOf(docsFullyFunctionalControllingSurfacesHtml)).apply(this, arguments));
    }

    return docsFullyFunctionalControllingSurfacesHtml;
  }(Component);

  Soy.register(docsFullyFunctionalControllingSurfacesHtml, templates);
  this['metalNamed']['controllingSurfaces'] = this['metalNamed']['controllingSurfaces'] || {};
  this['metalNamed']['controllingSurfaces']['docsFullyFunctionalControllingSurfacesHtml'] = docsFullyFunctionalControllingSurfacesHtml;
  this['metalNamed']['controllingSurfaces']['templates'] = templates;
  this['metal']['controllingSurfaces'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['controllingSurfaces'];

  var docsFullyFunctionalControllingSurfacesHtml = function (_Component) {
    babelHelpers.inherits(docsFullyFunctionalControllingSurfacesHtml, _Component);

    function docsFullyFunctionalControllingSurfacesHtml() {
      babelHelpers.classCallCheck(this, docsFullyFunctionalControllingSurfacesHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsFullyFunctionalControllingSurfacesHtml.__proto__ || Object.getPrototypeOf(docsFullyFunctionalControllingSurfacesHtml)).apply(this, arguments));
    }

    return docsFullyFunctionalControllingSurfacesHtml;
  }(Component);

  ;

  Soy.register(docsFullyFunctionalControllingSurfacesHtml, templates);

  this['metal']['docsFullyFunctionalControllingSurfacesHtml'] = docsFullyFunctionalControllingSurfacesHtml;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from index.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace docsFullyFunctionalIndexHtml.
     * @public
     */

    goog.module('docsFullyFunctionalIndexHtml.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('guide.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      var param378 = function param378() {};
      $templateAlias1(soy.$$assignDefaults({ content: param378 }, opt_data), null, opt_ijData);
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'docsFullyFunctionalIndexHtml.render';
    }

    exports.render.params = [];
    exports.render.types = {};
    templates = exports;
    return exports;
  });

  var docsFullyFunctionalIndexHtml = function (_Component) {
    babelHelpers.inherits(docsFullyFunctionalIndexHtml, _Component);

    function docsFullyFunctionalIndexHtml() {
      babelHelpers.classCallCheck(this, docsFullyFunctionalIndexHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsFullyFunctionalIndexHtml.__proto__ || Object.getPrototypeOf(docsFullyFunctionalIndexHtml)).apply(this, arguments));
    }

    return docsFullyFunctionalIndexHtml;
  }(Component);

  Soy.register(docsFullyFunctionalIndexHtml, templates);
  this['metalNamed']['index'] = this['metalNamed']['index'] || {};
  this['metalNamed']['index']['docsFullyFunctionalIndexHtml'] = docsFullyFunctionalIndexHtml;
  this['metalNamed']['index']['templates'] = templates;
  this['metal']['index'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['index'];

  var docsFullyFunctionalIndexHtml = function (_Component) {
    babelHelpers.inherits(docsFullyFunctionalIndexHtml, _Component);

    function docsFullyFunctionalIndexHtml() {
      babelHelpers.classCallCheck(this, docsFullyFunctionalIndexHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsFullyFunctionalIndexHtml.__proto__ || Object.getPrototypeOf(docsFullyFunctionalIndexHtml)).apply(this, arguments));
    }

    return docsFullyFunctionalIndexHtml;
  }(Component);

  ;

  Soy.register(docsFullyFunctionalIndexHtml, templates);

  this['metal']['docsFullyFunctionalIndexHtml'] = docsFullyFunctionalIndexHtml;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from screens.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace docsFullyFunctionalScreensHtml.
     * @public
     */

    goog.module('docsFullyFunctionalScreensHtml.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('guide.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      var param382 = function param382() {
        ie_open('h1');
        itext('Screens');
        ie_close('h1');
        ie_open('article', null, null, 'id', 'senna.HTMLScreen');
        ie_open('h2');
        itext('Senna.HTMLscreen');
        ie_close('h2');
        ie_open('p');
        itext('Senna.js provides a special type of route handler, or interface, called ');
        ie_open('code');
        itext('senna.Screen');
        ie_close('code');
        itext('. This in itself is not an active class, rather, it merely defines the screen interface methods and demonstrates how to use the API. The real magic happens when we extend ');
        ie_open('code');
        itext('senna.Screen');
        ie_close('code');
        itext('.');
        ie_close('p');
        ie_open('p');
        itext('We knew this might be a little tricky at first, so we creating our own extention: ');
        ie_open('code');
        itext('senna.HTMLScreen');
        ie_close('code');
        itext('- the default screen we created to make Senna.js ready to work straight out of the box.');
        ie_close('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'senna.screenToWork');
        ie_open('h2');
        itext('How can you put Senna.HTMLScreen to work?');
        ie_close('h2');
        ie_open('p');
        itext('We designed Senna to use ');
        ie_open('code');
        itext('senna.HTMLScreen');
        ie_close('code');
        itext(' as the default extension for all navigation so you can start using Senna without worrying about changing anything in your back end. But how do I start setting up my screens with ');
        ie_open('code');
        itext('senna.HTMLScreen');
        ie_close('code');
        itext('? That\'s the thing, you already did!');
        ie_close('p');
        ie_open('p');
        itext('When you added ');
        ie_open('code');
        itext('data-senna');
        ie_close('code');
        itext(' and ');
        ie_open('code');
        itext('data-senna-surface');
        ie_close('code');
        itext(' to your document (see ');
        ie_open('a', null, null, 'href', '/docs/intro/gettingStarted.html');
        itext('Getting Started');
        ie_close('a');
        itext('), you told senna to route all the navigations through ');
        ie_open('code');
        itext('senna.HTMLScreen');
        ie_close('code');
        itext('.');
        ie_close('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'moreScreens');
        ie_open('h2');
        itext('Screens, screens, and more screens');
        ie_close('h2');
        ie_open('p');
        itext('We want you to know how Senna works so that you can fully trust it to empower your app. Bellow are the cycle logs for senna.Screen. Feel free to look at them or even inspect your own browser console during a link navigation using Senna.');
        ie_close('p');
        ie_open('p');
        itext('You can also jump to ');
        ie_open('a', null, null, 'href', '/docs/advancedUsage/controllingSurfaces.html');
        itext('Controlling Surfaces');
        ie_close('a');
        itext(' to learn more about how to customize screens on your app.');
        ie_close('p');
        ie_void('p');
        itext('\n');
        ie_open('pre');
        ie_open('code');
        itext('Navigate to [/examples/mysite/pages/page1.html]\n');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('Create');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('screen');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('for');
        ie_close('span');
        itext(' [/examples/mysite/pages/page1.html]\n');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('Screen');
        ie_close('span');
        itext(' [screen_1408572719183] ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('load');
        ie_close('span');
        itext('\nXHR finished loading: GET ');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"http://localhost:8000/examples/mysite/pages/page1.html"');
        ie_close('span');
        itext('.\n');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('Screen');
        ie_close('span');
        itext(' [screen_1408572719183] add content to ');
        ie_open('span', null, null, 'class', 'hljs-built_in');
        itext('surface');
        ie_close('span');
        itext(' [');
        ie_open('span', null, null, 'class', 'hljs-built_in');
        itext('header');
        ie_close('span');
        itext(']\n');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('Screen');
        ie_close('span');
        itext(' [screen_1408572719183] add content to ');
        ie_open('span', null, null, 'class', 'hljs-built_in');
        itext('surface');
        ie_close('span');
        itext(' [content]\n');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('Screen');
        ie_close('span');
        itext(' [screen_1408572719183] flip\n');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('Screen');
        ie_close('span');
        itext(' [screen_1408572719183] activate\nNavigation done\n');
        ie_close('code');
        ie_close('pre');
        itext('\n');
        ie_void('p');
        ie_close('article');
      };
      $templateAlias1(soy.$$assignDefaults({ content: param382 }, opt_data), null, opt_ijData);
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'docsFullyFunctionalScreensHtml.render';
    }

    exports.render.params = [];
    exports.render.types = {};
    templates = exports;
    return exports;
  });

  var docsFullyFunctionalScreensHtml = function (_Component) {
    babelHelpers.inherits(docsFullyFunctionalScreensHtml, _Component);

    function docsFullyFunctionalScreensHtml() {
      babelHelpers.classCallCheck(this, docsFullyFunctionalScreensHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsFullyFunctionalScreensHtml.__proto__ || Object.getPrototypeOf(docsFullyFunctionalScreensHtml)).apply(this, arguments));
    }

    return docsFullyFunctionalScreensHtml;
  }(Component);

  Soy.register(docsFullyFunctionalScreensHtml, templates);
  this['metalNamed']['screens'] = this['metalNamed']['screens'] || {};
  this['metalNamed']['screens']['docsFullyFunctionalScreensHtml'] = docsFullyFunctionalScreensHtml;
  this['metalNamed']['screens']['templates'] = templates;
  this['metal']['screens'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['screens'];

  var docsFullyFunctionalScreensHtml = function (_Component) {
    babelHelpers.inherits(docsFullyFunctionalScreensHtml, _Component);

    function docsFullyFunctionalScreensHtml() {
      babelHelpers.classCallCheck(this, docsFullyFunctionalScreensHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsFullyFunctionalScreensHtml.__proto__ || Object.getPrototypeOf(docsFullyFunctionalScreensHtml)).apply(this, arguments));
    }

    return docsFullyFunctionalScreensHtml;
  }(Component);

  ;

  Soy.register(docsFullyFunctionalScreensHtml, templates);

  this['metal']['docsFullyFunctionalScreensHtml'] = docsFullyFunctionalScreensHtml;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from gettingStarted.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace docsGettingStartedGettingStartedHtml.
     * @public
     */

    goog.module('docsGettingStartedGettingStartedHtml.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('guide.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      var param387 = function param387() {
        ie_open('h1');
        itext('Installing Senna');
        ie_close('h1');
        ie_open('article', null, null, 'id', 'getting-the-project');
        ie_open('h2');
        itext('Getting the Project');
        ie_close('h2');
        ie_open('p');
        itext('To get started, ');
        ie_open('a', null, null, 'href', 'https://github.com/liferay/senna.js/archive/master.zip');
        itext('download the project');
        ie_close('a');
        itext('. This project includes an initial version of the project plus all of the Senna.js examples (source code dependencies that will help you get started).');
        ie_close('p');
        ie_open('p');
        itext('Unzip the project somewhere on your local drive. While you\'re working, you\'ll need a basic HTTP server to serve your pages because Senna will not be able to fully run if you simply open the files of your app in a browser. If you already have a local server ready to run, then skip to the ');
        ie_open('a', null, null, 'href', '#start-using');
        itext('Start using Senna.js in your app');
        ie_close('a');
        itext('.');
        ie_close('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'http-server');
        ie_open('h2');
        itext('Setting up a local server');
        ie_close('h2');
        ie_open('p');
        itext('If you don\'t already have a server, ');
        ie_open('a', null, null, 'href', 'https://www.npmjs.com/package/http-server', 'target', '_blank');
        itext('http-server');
        ie_close('a');
        itext(' is a great solution. The easiest way to install ');
        ie_open('code');
        itext('http-server');
        ie_close('code');
        itext(' is via npm by running the following command in the command line.');
        ie_close('p');
        ie_void('p');
        itext('\n');
        ie_open('pre');
        ie_open('code');
        itext('npm ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('install');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('http');
        ie_close('span');
        itext('-');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('server');
        ie_close('span');
        itext(' -g\n');
        ie_close('code');
        ie_close('pre');
        itext('\n');
        ie_void('p');
        ie_open('p');
        itext('This will install ');
        ie_open('code');
        itext('http-server');
        ie_close('code');
        itext('. To run your local server, go to the directory that contains your app and run:');
        ie_close('p');
        ie_void('p');
        itext('\n');
        ie_open('pre');
        ie_open('code');
        itext('http-');
        ie_open('span', null, null, 'class', 'hljs-keyword');
        itext('server');
        ie_close('span');
        itext('\n');
        ie_close('code');
        ie_close('pre');
        itext('\n');
        ie_void('p');
        ie_open('p');
        itext('Your app is now live at ');
        ie_open('a', null, null, 'href', 'http://localhost:8080', 'target', '_blank');
        itext('http://localhost:8080');
        ie_close('a');
        itext('.');
        ie_close('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'start-using');
        ie_open('h2');
        itext('Start using Senna.js in your app');
        ie_close('h2');
        ie_open('p');
        itext('Setting up Senna.js is as easy as linking Senna.js to your document and adding ');
        ie_open('code');
        itext('data-senna');
        ie_close('code');
        itext(' and ');
        ie_open('code');
        itext('data-senna-surface');
        ie_close('code');
        itext(' as attributes to your ');
        ie_open('code');
        itext('<body>');
        ie_close('code');
        itext(' element.');
        ie_close('p');
        ie_void('p');
        itext('\n');
        ie_open('pre');
        ie_open('code');
        ie_open('span', null, null, 'class', 'hljs-meta');
        itext('<!doctype html>');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('html');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('head');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('meta');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('charset');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"UTF-8"');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('title');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('Turbolinks');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('title');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('link');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('rel');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"shortcut icon"');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('href');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"http://sennajs.com/images/favicon.ico"');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-comment');
        itext('<!-- Link Senna to document -->');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('script');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('src');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"../../build/globals/senna-debug.js"');
        ie_close('span');
        itext('>');
        ie_close('span');
        ie_void('span', null, null, 'class', 'undefined');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('script');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('head');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-comment');
        itext('<!-- Add Senna attributes -->');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('body');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('data-senna');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('data-senna-surface');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-comment');
        itext('<!-- Senna surface -->');
        ie_close('span');
        itext('\n    ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('a');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('href');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"/pages/page1.html"');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('Page 1');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('a');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n    ');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('<');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('a');
        ie_close('span');
        itext(' ');
        ie_open('span', null, null, 'class', 'hljs-attr');
        itext('href');
        ie_close('span');
        itext('=');
        ie_open('span', null, null, 'class', 'hljs-string');
        itext('"/pages/page2.html"');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('Page 2');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('a');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n  ');
        ie_open('span', null, null, 'class', 'hljs-comment');
        itext('<!-- End of Senna surface -->');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('body');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_open('span', null, null, 'class', 'hljs-tag');
        itext('</');
        ie_open('span', null, null, 'class', 'hljs-name');
        itext('html');
        ie_close('span');
        itext('>');
        ie_close('span');
        itext('\n');
        ie_close('code');
        ie_close('pre');
        itext('\n');
        ie_void('p');
        ie_open('p');
        itext('Now your page is already faster! By adding ');
        ie_open('code');
        itext('data-senna');
        ie_close('code');
        itext(' and ');
        ie_open('code');
        itext('data-senna-surface');
        ie_close('code');
        itext(', we are telling the browser to replace just the body on each navigation and keep the rest of the resources instead of completly reloading a new page.');
        ie_close('p');
        ie_close('article');
      };
      $templateAlias1(soy.$$assignDefaults({ content: param387 }, opt_data), null, opt_ijData);
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'docsGettingStartedGettingStartedHtml.render';
    }

    exports.render.params = [];
    exports.render.types = {};
    templates = exports;
    return exports;
  });

  var docsGettingStartedGettingStartedHtml = function (_Component) {
    babelHelpers.inherits(docsGettingStartedGettingStartedHtml, _Component);

    function docsGettingStartedGettingStartedHtml() {
      babelHelpers.classCallCheck(this, docsGettingStartedGettingStartedHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsGettingStartedGettingStartedHtml.__proto__ || Object.getPrototypeOf(docsGettingStartedGettingStartedHtml)).apply(this, arguments));
    }

    return docsGettingStartedGettingStartedHtml;
  }(Component);

  Soy.register(docsGettingStartedGettingStartedHtml, templates);
  this['metalNamed']['gettingStarted'] = this['metalNamed']['gettingStarted'] || {};
  this['metalNamed']['gettingStarted']['docsGettingStartedGettingStartedHtml'] = docsGettingStartedGettingStartedHtml;
  this['metalNamed']['gettingStarted']['templates'] = templates;
  this['metal']['gettingStarted'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['gettingStarted'];

  var docsGettingStartedGettingStartedHtml = function (_Component) {
    babelHelpers.inherits(docsGettingStartedGettingStartedHtml, _Component);

    function docsGettingStartedGettingStartedHtml() {
      babelHelpers.classCallCheck(this, docsGettingStartedGettingStartedHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsGettingStartedGettingStartedHtml.__proto__ || Object.getPrototypeOf(docsGettingStartedGettingStartedHtml)).apply(this, arguments));
    }

    return docsGettingStartedGettingStartedHtml;
  }(Component);

  ;

  Soy.register(docsGettingStartedGettingStartedHtml, templates);

  this['metal']['docsGettingStartedGettingStartedHtml'] = docsGettingStartedGettingStartedHtml;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from howdoesitwork.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace docsGettingStartedHowdoesitworkHtml.
     * @public
     */

    goog.module('docsGettingStartedHowdoesitworkHtml.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('guide.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      var param392 = function param392() {
        ie_open('h1');
        itext('How Does It Work?');
        ie_close('h1');
        ie_open('article', null, null, 'id', 'step1');
        ie_open('h2');
        itext('1. Initial page load');
        ie_close('h2');
        ie_open('p');
        itext('When using Senna.js, your app will load all the background content, like css and script files, on the initial page load. They will be cached and used to speed up future navigation.');
        ie_close('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'step2');
        ie_open('h2');
        itext('2. User clicks link to another page');
        ie_close('h2');
        ie_open('p');
        itext('When the user clicks a link to another page of your app, Senna.js begins to work its magic, first by populating a new URL even though the page did not fully reload. Everything feels normal to your user because Senna.js supports the ');
        ie_open('a', null, null, 'href', '/docs/intro/capabilities.html');
        itext('native browser capabilities');
        ie_close('a');
        itext('.');
        ie_close('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'step3');
        ie_open('h2');
        itext('3. Request is made for matching screen');
        ie_close('h2');
        ie_open('p');
        itext('The request is made for the new page but instead of pulling down a completely new package of elements from the server, Senna.js utilizes the cached resources that are redundant to both the pages.');
        ie_close('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'step4');
        ie_open('h2');
        itext('4. Screen paints surfaces with new content');
        ie_close('h2');
        ie_open('p');
        itext('Quickly, Senna.js finds what content is new to the requested page and paints only the new content to the screen\'s surfaces, preventing your site from wasting time and bandwidth to download redundant resources.');
        ie_close('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'thateasy');
        ie_open('h2');
        itext('And voil\xE0! Your app is now blazing fast!');
        ie_close('h2');
        ie_open('p');
        itext('Not only is Senna.js a powerful, easy-to-use tool, it also provides plenty of control so you can tailor it to your project. Keep reading through the docs to learn more about how you can leverage the power of Senna.js in your app.');
        ie_close('p');
        ie_close('article');
      };
      $templateAlias1(soy.$$assignDefaults({ content: param392 }, opt_data), null, opt_ijData);
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'docsGettingStartedHowdoesitworkHtml.render';
    }

    exports.render.params = [];
    exports.render.types = {};
    templates = exports;
    return exports;
  });

  var docsGettingStartedHowdoesitworkHtml = function (_Component) {
    babelHelpers.inherits(docsGettingStartedHowdoesitworkHtml, _Component);

    function docsGettingStartedHowdoesitworkHtml() {
      babelHelpers.classCallCheck(this, docsGettingStartedHowdoesitworkHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsGettingStartedHowdoesitworkHtml.__proto__ || Object.getPrototypeOf(docsGettingStartedHowdoesitworkHtml)).apply(this, arguments));
    }

    return docsGettingStartedHowdoesitworkHtml;
  }(Component);

  Soy.register(docsGettingStartedHowdoesitworkHtml, templates);
  this['metalNamed']['howdoesitwork'] = this['metalNamed']['howdoesitwork'] || {};
  this['metalNamed']['howdoesitwork']['docsGettingStartedHowdoesitworkHtml'] = docsGettingStartedHowdoesitworkHtml;
  this['metalNamed']['howdoesitwork']['templates'] = templates;
  this['metal']['howdoesitwork'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['howdoesitwork'];

  var docsGettingStartedHowdoesitworkHtml = function (_Component) {
    babelHelpers.inherits(docsGettingStartedHowdoesitworkHtml, _Component);

    function docsGettingStartedHowdoesitworkHtml() {
      babelHelpers.classCallCheck(this, docsGettingStartedHowdoesitworkHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsGettingStartedHowdoesitworkHtml.__proto__ || Object.getPrototypeOf(docsGettingStartedHowdoesitworkHtml)).apply(this, arguments));
    }

    return docsGettingStartedHowdoesitworkHtml;
  }(Component);

  ;

  Soy.register(docsGettingStartedHowdoesitworkHtml, templates);

  this['metal']['docsGettingStartedHowdoesitworkHtml'] = docsGettingStartedHowdoesitworkHtml;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from index.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace docsGettingStartedIndexHtml.
     * @public
     */

    goog.module('docsGettingStartedIndexHtml.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('guide.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      var param397 = function param397() {};
      $templateAlias1(soy.$$assignDefaults({ content: param397 }, opt_data), null, opt_ijData);
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'docsGettingStartedIndexHtml.render';
    }

    exports.render.params = [];
    exports.render.types = {};
    templates = exports;
    return exports;
  });

  var docsGettingStartedIndexHtml = function (_Component) {
    babelHelpers.inherits(docsGettingStartedIndexHtml, _Component);

    function docsGettingStartedIndexHtml() {
      babelHelpers.classCallCheck(this, docsGettingStartedIndexHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsGettingStartedIndexHtml.__proto__ || Object.getPrototypeOf(docsGettingStartedIndexHtml)).apply(this, arguments));
    }

    return docsGettingStartedIndexHtml;
  }(Component);

  Soy.register(docsGettingStartedIndexHtml, templates);
  this['metalNamed']['index'] = this['metalNamed']['index'] || {};
  this['metalNamed']['index']['docsGettingStartedIndexHtml'] = docsGettingStartedIndexHtml;
  this['metalNamed']['index']['templates'] = templates;
  this['metal']['index'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['index'];

  var docsGettingStartedIndexHtml = function (_Component) {
    babelHelpers.inherits(docsGettingStartedIndexHtml, _Component);

    function docsGettingStartedIndexHtml() {
      babelHelpers.classCallCheck(this, docsGettingStartedIndexHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsGettingStartedIndexHtml.__proto__ || Object.getPrototypeOf(docsGettingStartedIndexHtml)).apply(this, arguments));
    }

    return docsGettingStartedIndexHtml;
  }(Component);

  ;

  Soy.register(docsGettingStartedIndexHtml, templates);

  this['metal']['docsGettingStartedIndexHtml'] = docsGettingStartedIndexHtml;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from theBuildingblocks.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace docsGettingStartedTheBuildingblocksHtml.
     * @public
     */

    goog.module('docsGettingStartedTheBuildingblocksHtml.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('guide.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      var param401 = function param401() {
        ie_open('h1');
        itext('The Building Blocks');
        ie_close('h1');
        ie_open('article', null, null, 'id', 'App');
        ie_open('h2');
        itext('App');
        ie_close('h2');
        ie_open('p');
        itext('Think of this as your canvas. Everything about your site, namely your surfaces and routes, are contained within in this element.');
        ie_close('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'Surfaces');
        ie_open('h2');
        itext('Surfaces');
        ie_close('h2');
        ie_open('p');
        itext('The basic visual building blocks of your page. They are elements like your header, navbar, body, or footer.');
        ie_close('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'Screen');
        ie_open('h2');
        itext('Screen');
        ie_close('h2');
        ie_open('p');
        itext('The specific rendering of all relevant surfaces. Every-time a page is requested, the navigated path will match a respective screen. This matching screen will scan all surfaces and paint the new content for those surfaces. Every screen has a unique url, but does not load as a separate page.');
        ie_close('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'Route');
        ie_open('h2');
        itext('Route');
        ie_close('h2');
        ie_open('p');
        itext('Every app navigation will consist of a route and a correlating screen. The route is the entire process of navigation, from when you click a link to when your app paints the new information on the screen.');
        ie_close('p');
        ie_close('article');
        ie_open('h1');
        itext('Native Browser Behavior');
        ie_close('h1');
        ie_open('article', null, null, 'id', 'seo');
        ie_open('h6');
        itext('In order to create a single page application with good perceived latency and good user experience, the SPA engine must handle many aspects of the browser\u2019s native behavior. Here are some of the amazing capabilities of Senna.js.');
        ie_close('h6');
        ie_open('h2');
        itext('SEO & Bookmarkability:');
        ie_close('h2');
        ie_open('p');
        itext('So if the browser is simply gathering more information rather than refreshing to a separate page, how do you make sure that your users can bookmark and share the content they are viewing? With Senna.js, your app will create specific urls that correlate to the information that your users are viewing. This not only makes it seamless for your users, but it also enables search engines to index that same information just like it would if it was a traditional webpage.');
        ie_close('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'hybrid-rendering');
        ie_open('h2');
        itext('Hybrid Rendering:');
        ie_close('h2');
        ie_open('p');
        itext('Ajax + server-side rendering allows you to disable pushState at any time, enabling progressive enhancement. The way you render the server-side does not matter, it can be simple HTML fragments or even template views.');
        ie_close('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'state-retention');
        ie_open('h2');
        itext('State Retention:');
        ie_close('h2');
        ie_open('p');
        itext('When you reload or navigate through the history of the page, Senna will take you right back to the state of the screen that you previously viewed, including the same scroll placement.');
        ie_close('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'ui-feedback');
        ie_open('h2');
        itext('UI Feedback:');
        ie_close('h2');
        ie_open('p');
        itext('If you have large content on your page and it takes time to load, you can give your users feedback so they know the content will be fully loaded soon. Checkout ');
        ie_open('a', null, null, 'href', '/docs/features/uiFeedback.html');
        itext('UI Feedback');
        ie_close('a');
        itext(' to learn how to enable this feature in your app.');
        ie_close('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'pending-nav');
        ie_open('h2');
        itext('Pending Navigation:');
        ie_close('h2');
        ie_open('p');
        itext('To prevent multiple portions of your site from loading at different speeds, you can block UI rendering until the data is fully loaded so that all the content will display at once. In this situation, UI Feedback is a great tool to make sure your users know the content is coming.');
        ie_close('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'timeout');
        ie_open('h2');
        itext('Timeout Detection:');
        ie_close('h2');
        ie_open('p');
        itext('Senna.js will timeout if the request takes too long to load or if the user navigates to a different link while another request is pending. If an error occurs, Senna is already setup with ');
        ie_open('a', null, null, 'href', '/docs/features/errorHandling.html');
        itext('Error Handling');
        ie_close('a');
        itext('.');
        ie_close('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'history-nav');
        ie_open('h2');
        itext('History Navigation:');
        ie_close('h2');
        ie_open('p');
        itext('By using History API, you can manipulate the browser history to use the browser\'s back and forward buttons.');
        ie_close('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'cacheable-screens');
        ie_open('h2');
        itext('Cacheable Screens:');
        ie_close('h2');
        ie_open('p');
        itext('Once you load a certain surface, this content is cached in memory and will be retrieved later on without any additional request to the server.');
        ie_close('p');
        ie_close('article');
        ie_open('article', null, null, 'id', 'prm');
        ie_open('h2');
        itext('Page Resources Management:');
        ie_close('h2');
        ie_open('p');
        itext('Evaluate scripts and stylesheets from dynamic loaded resources. Additional content loaded using XMLHttpRequest can be appended to the DOM. For security reasons some browsers will not evaluate ');
        ie_open('code');
        itext('<script>');
        ie_close('code');
        itext(' tags from the new fragment, so the SPA engine should handle extracting scripts from the content and parsing them, respecting the browser contract for loading scripts.');
        ie_close('p');
        ie_close('article');
      };
      $templateAlias1(soy.$$assignDefaults({ content: param401 }, opt_data), null, opt_ijData);
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'docsGettingStartedTheBuildingblocksHtml.render';
    }

    exports.render.params = [];
    exports.render.types = {};
    templates = exports;
    return exports;
  });

  var docsGettingStartedTheBuildingblocksHtml = function (_Component) {
    babelHelpers.inherits(docsGettingStartedTheBuildingblocksHtml, _Component);

    function docsGettingStartedTheBuildingblocksHtml() {
      babelHelpers.classCallCheck(this, docsGettingStartedTheBuildingblocksHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsGettingStartedTheBuildingblocksHtml.__proto__ || Object.getPrototypeOf(docsGettingStartedTheBuildingblocksHtml)).apply(this, arguments));
    }

    return docsGettingStartedTheBuildingblocksHtml;
  }(Component);

  Soy.register(docsGettingStartedTheBuildingblocksHtml, templates);
  this['metalNamed']['theBuildingblocks'] = this['metalNamed']['theBuildingblocks'] || {};
  this['metalNamed']['theBuildingblocks']['docsGettingStartedTheBuildingblocksHtml'] = docsGettingStartedTheBuildingblocksHtml;
  this['metalNamed']['theBuildingblocks']['templates'] = templates;
  this['metal']['theBuildingblocks'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];
  var templates = this['metal']['theBuildingblocks'];

  var docsGettingStartedTheBuildingblocksHtml = function (_Component) {
    babelHelpers.inherits(docsGettingStartedTheBuildingblocksHtml, _Component);

    function docsGettingStartedTheBuildingblocksHtml() {
      babelHelpers.classCallCheck(this, docsGettingStartedTheBuildingblocksHtml);
      return babelHelpers.possibleConstructorReturn(this, (docsGettingStartedTheBuildingblocksHtml.__proto__ || Object.getPrototypeOf(docsGettingStartedTheBuildingblocksHtml)).apply(this, arguments));
    }

    return docsGettingStartedTheBuildingblocksHtml;
  }(Component);

  ;

  Soy.register(docsGettingStartedTheBuildingblocksHtml, templates);

  this['metal']['docsGettingStartedTheBuildingblocksHtml'] = docsGettingStartedTheBuildingblocksHtml;
}).call(this);
}).call(this);
//# sourceMappingURL=bundle.js.map
