/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/workbox-cacheable-response/CacheableResponse.js":
/*!**********************************************************************!*\
  !*** ./node_modules/workbox-cacheable-response/CacheableResponse.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CacheableResponse": () => (/* binding */ CacheableResponse)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-cacheable-response/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_4__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/





/**
 * This class allows you to set up rules determining what
 * status codes and/or headers need to be present in order for a
 * [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response)
 * to be considered cacheable.
 *
 * @memberof module:workbox-cacheable-response
 */
class CacheableResponse {
    /**
     * To construct a new CacheableResponse instance you must provide at least
     * one of the `config` properties.
     *
     * If both `statuses` and `headers` are specified, then both conditions must
     * be met for the `Response` to be considered cacheable.
     *
     * @param {Object} config
     * @param {Array<number>} [config.statuses] One or more status codes that a
     * `Response` can have and be considered cacheable.
     * @param {Object<string,string>} [config.headers] A mapping of header names
     * and expected values that a `Response` can have and be considered cacheable.
     * If multiple headers are provided, only one needs to be present.
     */
    constructor(config = {}) {
        if (true) {
            if (!(config.statuses || config.headers)) {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__.WorkboxError('statuses-or-headers-required', {
                    moduleName: 'workbox-cacheable-response',
                    className: 'CacheableResponse',
                    funcName: 'constructor',
                });
            }
            if (config.statuses) {
                workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isArray(config.statuses, {
                    moduleName: 'workbox-cacheable-response',
                    className: 'CacheableResponse',
                    funcName: 'constructor',
                    paramName: 'config.statuses',
                });
            }
            if (config.headers) {
                workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(config.headers, 'object', {
                    moduleName: 'workbox-cacheable-response',
                    className: 'CacheableResponse',
                    funcName: 'constructor',
                    paramName: 'config.headers',
                });
            }
        }
        this._statuses = config.statuses;
        this._headers = config.headers;
    }
    /**
     * Checks a response to see whether it's cacheable or not, based on this
     * object's configuration.
     *
     * @param {Response} response The response whose cacheability is being
     * checked.
     * @return {boolean} `true` if the `Response` is cacheable, and `false`
     * otherwise.
     */
    isResponseCacheable(response) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isInstance(response, Response, {
                moduleName: 'workbox-cacheable-response',
                className: 'CacheableResponse',
                funcName: 'isResponseCacheable',
                paramName: 'response',
            });
        }
        let cacheable = true;
        if (this._statuses) {
            cacheable = this._statuses.includes(response.status);
        }
        if (this._headers && cacheable) {
            cacheable = Object.keys(this._headers).some((headerName) => {
                return response.headers.get(headerName) === this._headers[headerName];
            });
        }
        if (true) {
            if (!cacheable) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`The request for ` +
                    `'${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__.getFriendlyURL)(response.url)}' returned a response that does ` +
                    `not meet the criteria for being cached.`);
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`View cacheability criteria here.`);
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(`Cacheable statuses: ` +
                    JSON.stringify(this._statuses));
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(`Cacheable headers: ` +
                    JSON.stringify(this._headers, null, 2));
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
                const logFriendlyHeaders = {};
                response.headers.forEach((value, key) => {
                    logFriendlyHeaders[key] = value;
                });
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`View response status and headers here.`);
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(`Response status: ` + response.status);
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(`Response headers: ` +
                    JSON.stringify(logFriendlyHeaders, null, 2));
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`View full response details here.`);
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(response.headers);
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(response);
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
            }
        }
        return cacheable;
    }
}



/***/ }),

/***/ "./node_modules/workbox-cacheable-response/CacheableResponsePlugin.js":
/*!****************************************************************************!*\
  !*** ./node_modules/workbox-cacheable-response/CacheableResponsePlugin.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CacheableResponsePlugin": () => (/* binding */ CacheableResponsePlugin)
/* harmony export */ });
/* harmony import */ var _CacheableResponse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CacheableResponse.js */ "./node_modules/workbox-cacheable-response/CacheableResponse.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-cacheable-response/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * A class implementing the `cacheWillUpdate` lifecycle callback. This makes it
 * easier to add in cacheability checks to requests made via Workbox's built-in
 * strategies.
 *
 * @memberof module:workbox-cacheable-response
 */
class CacheableResponsePlugin {
    /**
     * To construct a new CacheableResponsePlugin instance you must provide at
     * least one of the `config` properties.
     *
     * If both `statuses` and `headers` are specified, then both conditions must
     * be met for the `Response` to be considered cacheable.
     *
     * @param {Object} config
     * @param {Array<number>} [config.statuses] One or more status codes that a
     * `Response` can have and be considered cacheable.
     * @param {Object<string,string>} [config.headers] A mapping of header names
     * and expected values that a `Response` can have and be considered cacheable.
     * If multiple headers are provided, only one needs to be present.
     */
    constructor(config) {
        /**
         * @param {Object} options
         * @param {Response} options.response
         * @return {Response|null}
         * @private
         */
        this.cacheWillUpdate = async ({ response }) => {
            if (this._cacheableResponse.isResponseCacheable(response)) {
                return response;
            }
            return null;
        };
        this._cacheableResponse = new _CacheableResponse_js__WEBPACK_IMPORTED_MODULE_0__.CacheableResponse(config);
    }
}



/***/ }),

/***/ "./node_modules/workbox-cacheable-response/_version.js":
/*!*************************************************************!*\
  !*** ./node_modules/workbox-cacheable-response/_version.js ***!
  \*************************************************************/
/***/ (() => {


// @ts-ignore
try {
    self['workbox:cacheable-response:6.1.2'] && _();
}
catch (e) { }


/***/ }),

/***/ "./node_modules/workbox-core/_private/DBWrapper.js":
/*!*********************************************************!*\
  !*** ./node_modules/workbox-core/_private/DBWrapper.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DBWrapper": () => (/* binding */ DBWrapper)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A class that wraps common IndexedDB functionality in a promise-based API.
 * It exposes all the underlying power and functionality of IndexedDB, but
 * wraps the most commonly used features in a way that's much simpler to use.
 *
 * @private
 */
class DBWrapper {
    /**
     * @param {string} name
     * @param {number} version
     * @param {Object=} [callback]
     * @param {!Function} [callbacks.onupgradeneeded]
     * @param {!Function} [callbacks.onversionchange] Defaults to
     *     DBWrapper.prototype._onversionchange when not specified.
     * @private
     */
    constructor(name, version, { onupgradeneeded, onversionchange, } = {}) {
        this._db = null;
        this._name = name;
        this._version = version;
        this._onupgradeneeded = onupgradeneeded;
        this._onversionchange = onversionchange || (() => this.close());
    }
    /**
     * Returns the IDBDatabase instance (not normally needed).
     * @return {IDBDatabase|undefined}
     *
     * @private
     */
    get db() {
        return this._db;
    }
    /**
     * Opens a connected to an IDBDatabase, invokes any onupgradedneeded
     * callback, and added an onversionchange callback to the database.
     *
     * @return {IDBDatabase}
     * @private
     */
    async open() {
        if (this._db)
            return;
        this._db = await new Promise((resolve, reject) => {
            // This flag is flipped to true if the timeout callback runs prior
            // to the request failing or succeeding. Note: we use a timeout instead
            // of an onblocked handler since there are cases where onblocked will
            // never never run. A timeout better handles all possible scenarios:
            // https://github.com/w3c/IndexedDB/issues/223
            let openRequestTimedOut = false;
            setTimeout(() => {
                openRequestTimedOut = true;
                reject(new Error('The open request was blocked and timed out'));
            }, this.OPEN_TIMEOUT);
            const openRequest = indexedDB.open(this._name, this._version);
            openRequest.onerror = () => reject(openRequest.error);
            openRequest.onupgradeneeded = (evt) => {
                if (openRequestTimedOut) {
                    openRequest.transaction.abort();
                    openRequest.result.close();
                }
                else if (typeof this._onupgradeneeded === 'function') {
                    this._onupgradeneeded(evt);
                }
            };
            openRequest.onsuccess = () => {
                const db = openRequest.result;
                if (openRequestTimedOut) {
                    db.close();
                }
                else {
                    db.onversionchange = this._onversionchange.bind(this);
                    resolve(db);
                }
            };
        });
        return this;
    }
    /**
     * Polyfills the native `getKey()` method. Note, this is overridden at
     * runtime if the browser supports the native method.
     *
     * @param {string} storeName
     * @param {*} query
     * @return {Array}
     * @private
     */
    async getKey(storeName, query) {
        return (await this.getAllKeys(storeName, query, 1))[0];
    }
    /**
     * Polyfills the native `getAll()` method. Note, this is overridden at
     * runtime if the browser supports the native method.
     *
     * @param {string} storeName
     * @param {*} query
     * @param {number} count
     * @return {Array}
     * @private
     */
    async getAll(storeName, query, count) {
        return await this.getAllMatching(storeName, { query, count });
    }
    /**
     * Polyfills the native `getAllKeys()` method. Note, this is overridden at
     * runtime if the browser supports the native method.
     *
     * @param {string} storeName
     * @param {*} query
     * @param {number} count
     * @return {Array}
     * @private
     */
    async getAllKeys(storeName, query, count) {
        const entries = await this.getAllMatching(storeName, { query, count, includeKeys: true });
        return entries.map((entry) => entry.key);
    }
    /**
     * Supports flexible lookup in an object store by specifying an index,
     * query, direction, and count. This method returns an array of objects
     * with the signature .
     *
     * @param {string} storeName
     * @param {Object} [opts]
     * @param {string} [opts.index] The index to use (if specified).
     * @param {*} [opts.query]
     * @param {IDBCursorDirection} [opts.direction]
     * @param {number} [opts.count] The max number of results to return.
     * @param {boolean} [opts.includeKeys] When true, the structure of the
     *     returned objects is changed from an array of values to an array of
     *     objects in the form {key, primaryKey, value}.
     * @return {Array}
     * @private
     */
    async getAllMatching(storeName, { index, query = null, // IE/Edge errors if query === `undefined`.
    direction = 'next', count, includeKeys = false, } = {}) {
        return await this.transaction([storeName], 'readonly', (txn, done) => {
            const store = txn.objectStore(storeName);
            const target = index ? store.index(index) : store;
            const results = [];
            const request = target.openCursor(query, direction);
            request.onsuccess = () => {
                const cursor = request.result;
                if (cursor) {
                    results.push(includeKeys ? cursor : cursor.value);
                    if (count && results.length >= count) {
                        done(results);
                    }
                    else {
                        cursor.continue();
                    }
                }
                else {
                    done(results);
                }
            };
        });
    }
    /**
     * Accepts a list of stores, a transaction type, and a callback and
     * performs a transaction. A promise is returned that resolves to whatever
     * value the callback chooses. The callback holds all the transaction logic
     * and is invoked with two arguments:
     *   1. The IDBTransaction object
     *   2. A `done` function, that's used to resolve the promise when
     *      when the transaction is done, if passed a value, the promise is
     *      resolved to that value.
     *
     * @param {Array<string>} storeNames An array of object store names
     *     involved in the transaction.
     * @param {string} type Can be `readonly` or `readwrite`.
     * @param {!Function} callback
     * @return {*} The result of the transaction ran by the callback.
     * @private
     */
    async transaction(storeNames, type, callback) {
        await this.open();
        return await new Promise((resolve, reject) => {
            const txn = this._db.transaction(storeNames, type);
            txn.onabort = () => reject(txn.error);
            txn.oncomplete = () => resolve();
            callback(txn, (value) => resolve(value));
        });
    }
    /**
     * Delegates async to a native IDBObjectStore method.
     *
     * @param {string} method The method name.
     * @param {string} storeName The object store name.
     * @param {string} type Can be `readonly` or `readwrite`.
     * @param {...*} args The list of args to pass to the native method.
     * @return {*} The result of the transaction.
     * @private
     */
    async _call(method, storeName, type, ...args) {
        const callback = (txn, done) => {
            const objStore = txn.objectStore(storeName);
            // TODO(philipwalton): Fix this underlying TS2684 error.
            // @ts-ignore
            const request = objStore[method].apply(objStore, args);
            request.onsuccess = () => done(request.result);
        };
        return await this.transaction([storeName], type, callback);
    }
    /**
     * Closes the connection opened by `DBWrapper.open()`. Generally this method
     * doesn't need to be called since:
     *   1. It's usually better to keep a connection open since opening
     *      a new connection is somewhat slow.
     *   2. Connections are automatically closed when the reference is
     *      garbage collected.
     * The primary use case for needing to close a connection is when another
     * reference (typically in another tab) needs to upgrade it and would be
     * blocked by the current, open connection.
     *
     * @private
     */
    close() {
        if (this._db) {
            this._db.close();
            this._db = null;
        }
    }
}
// Exposed on the prototype to let users modify the default timeout on a
// per-instance or global basis.
DBWrapper.prototype.OPEN_TIMEOUT = 2000;
// Wrap native IDBObjectStore methods according to their mode.
const methodsToWrap = {
    readonly: ['get', 'count', 'getKey', 'getAll', 'getAllKeys'],
    readwrite: ['add', 'put', 'clear', 'delete'],
};
for (const [mode, methods] of Object.entries(methodsToWrap)) {
    for (const method of methods) {
        if (method in IDBObjectStore.prototype) {
            // Don't use arrow functions here since we're outside of the class.
            DBWrapper.prototype[method] =
                async function (storeName, ...args) {
                    return await this._call(method, storeName, mode, ...args);
                };
        }
    }
}


/***/ }),

/***/ "./node_modules/workbox-core/_private/Deferred.js":
/*!********************************************************!*\
  !*** ./node_modules/workbox-core/_private/Deferred.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Deferred": () => (/* binding */ Deferred)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * The Deferred class composes Promises in a way that allows for them to be
 * resolved or rejected from outside the constructor. In most cases promises
 * should be used directly, but Deferreds can be necessary when the logic to
 * resolve a promise must be separate.
 *
 * @private
 */
class Deferred {
    /**
     * Creates a promise and exposes its resolve and reject functions as methods.
     */
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}



/***/ }),

/***/ "./node_modules/workbox-core/_private/WorkboxError.js":
/*!************************************************************!*\
  !*** ./node_modules/workbox-core/_private/WorkboxError.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorkboxError": () => (/* binding */ WorkboxError)
/* harmony export */ });
/* harmony import */ var _models_messages_messageGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/messages/messageGenerator.js */ "./node_modules/workbox-core/models/messages/messageGenerator.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Workbox errors should be thrown with this class.
 * This allows use to ensure the type easily in tests,
 * helps developers identify errors from workbox
 * easily and allows use to optimise error
 * messages correctly.
 *
 * @private
 */
class WorkboxError extends Error {
    /**
     *
     * @param {string} errorCode The error code that
     * identifies this particular error.
     * @param {Object=} details Any relevant arguments
     * that will help developers identify issues should
     * be added as a key on the context object.
     */
    constructor(errorCode, details) {
        const message = (0,_models_messages_messageGenerator_js__WEBPACK_IMPORTED_MODULE_0__.messageGenerator)(errorCode, details);
        super(message);
        this.name = errorCode;
        this.details = details;
    }
}



/***/ }),

/***/ "./node_modules/workbox-core/_private/assert.js":
/*!******************************************************!*\
  !*** ./node_modules/workbox-core/_private/assert.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assert": () => (/* binding */ finalAssertExports)
/* harmony export */ });
/* harmony import */ var _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/*
 * This method throws if the supplied value is not an array.
 * The destructed values are required to produce a meaningful error for users.
 * The destructed and restructured object is so it's clear what is
 * needed.
 */
const isArray = (value, details) => {
    if (!Array.isArray(value)) {
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('not-an-array', details);
    }
};
const hasMethod = (object, expectedMethod, details) => {
    const type = typeof object[expectedMethod];
    if (type !== 'function') {
        details['expectedMethod'] = expectedMethod;
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('missing-a-method', details);
    }
};
const isType = (object, expectedType, details) => {
    if (typeof object !== expectedType) {
        details['expectedType'] = expectedType;
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('incorrect-type', details);
    }
};
const isInstance = (object, expectedClass, details) => {
    if (!(object instanceof expectedClass)) {
        details['expectedClass'] = expectedClass;
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('incorrect-class', details);
    }
};
const isOneOf = (value, validValues, details) => {
    if (!validValues.includes(value)) {
        details['validValueDescription'] =
            `Valid values are ${JSON.stringify(validValues)}.`;
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('invalid-value', details);
    }
};
const isArrayOfClass = (value, expectedClass, details) => {
    const error = new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('not-array-of-class', details);
    if (!Array.isArray(value)) {
        throw error;
    }
    for (const item of value) {
        if (!(item instanceof expectedClass)) {
            throw error;
        }
    }
};
const finalAssertExports =  false ? 0 : {
    hasMethod,
    isArray,
    isInstance,
    isOneOf,
    isType,
    isArrayOfClass,
};



/***/ }),

/***/ "./node_modules/workbox-core/_private/cacheMatchIgnoreParams.js":
/*!**********************************************************************!*\
  !*** ./node_modules/workbox-core/_private/cacheMatchIgnoreParams.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cacheMatchIgnoreParams": () => (/* binding */ cacheMatchIgnoreParams)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2020 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

function stripParams(fullURL, ignoreParams) {
    const strippedURL = new URL(fullURL);
    for (const param of ignoreParams) {
        strippedURL.searchParams.delete(param);
    }
    return strippedURL.href;
}
/**
 * Matches an item in the cache, ignoring specific URL params. This is similar
 * to the `ignoreSearch` option, but it allows you to ignore just specific
 * params (while continuing to match on the others).
 *
 * @private
 * @param {Cache} cache
 * @param {Request} request
 * @param {Object} matchOptions
 * @param {Array<string>} ignoreParams
 * @return {Promise<Response|undefined>}
 */
async function cacheMatchIgnoreParams(cache, request, ignoreParams, matchOptions) {
    const strippedRequestURL = stripParams(request.url, ignoreParams);
    // If the request doesn't include any ignored params, match as normal.
    if (request.url === strippedRequestURL) {
        return cache.match(request, matchOptions);
    }
    // Otherwise, match by comparing keys
    const keysOptions = { ...matchOptions, ignoreSearch: true };
    const cacheKeys = await cache.keys(request, keysOptions);
    for (const cacheKey of cacheKeys) {
        const strippedCacheKeyURL = stripParams(cacheKey.url, ignoreParams);
        if (strippedRequestURL === strippedCacheKeyURL) {
            return cache.match(cacheKey, matchOptions);
        }
    }
    return;
}



/***/ }),

/***/ "./node_modules/workbox-core/_private/cacheNames.js":
/*!**********************************************************!*\
  !*** ./node_modules/workbox-core/_private/cacheNames.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cacheNames": () => (/* binding */ cacheNames)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const _cacheNameDetails = {
    googleAnalytics: 'googleAnalytics',
    precache: 'precache-v2',
    prefix: 'workbox',
    runtime: 'runtime',
    suffix: typeof registration !== 'undefined' ? registration.scope : '',
};
const _createCacheName = (cacheName) => {
    return [_cacheNameDetails.prefix, cacheName, _cacheNameDetails.suffix]
        .filter((value) => value && value.length > 0)
        .join('-');
};
const eachCacheNameDetail = (fn) => {
    for (const key of Object.keys(_cacheNameDetails)) {
        fn(key);
    }
};
const cacheNames = {
    updateDetails: (details) => {
        eachCacheNameDetail((key) => {
            if (typeof details[key] === 'string') {
                _cacheNameDetails[key] = details[key];
            }
        });
    },
    getGoogleAnalyticsName: (userCacheName) => {
        return userCacheName || _createCacheName(_cacheNameDetails.googleAnalytics);
    },
    getPrecacheName: (userCacheName) => {
        return userCacheName || _createCacheName(_cacheNameDetails.precache);
    },
    getPrefix: () => {
        return _cacheNameDetails.prefix;
    },
    getRuntimeName: (userCacheName) => {
        return userCacheName || _createCacheName(_cacheNameDetails.runtime);
    },
    getSuffix: () => {
        return _cacheNameDetails.suffix;
    },
};


/***/ }),

/***/ "./node_modules/workbox-core/_private/canConstructResponseFromBodyStream.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/workbox-core/_private/canConstructResponseFromBodyStream.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "canConstructResponseFromBodyStream": () => (/* binding */ canConstructResponseFromBodyStream)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

let supportStatus;
/**
 * A utility function that determines whether the current browser supports
 * constructing a new `Response` from a `response.body` stream.
 *
 * @return {boolean} `true`, if the current browser can successfully
 *     construct a `Response` from a `response.body` stream, `false` otherwise.
 *
 * @private
 */
function canConstructResponseFromBodyStream() {
    if (supportStatus === undefined) {
        const testResponse = new Response('');
        if ('body' in testResponse) {
            try {
                new Response(testResponse.body);
                supportStatus = true;
            }
            catch (error) {
                supportStatus = false;
            }
        }
        supportStatus = false;
    }
    return supportStatus;
}



/***/ }),

/***/ "./node_modules/workbox-core/_private/deleteDatabase.js":
/*!**************************************************************!*\
  !*** ./node_modules/workbox-core/_private/deleteDatabase.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteDatabase": () => (/* binding */ deleteDatabase)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Deletes the database.
 * Note: this is exported separately from the DBWrapper module because most
 * usages of IndexedDB in workbox dont need deleting, and this way it can be
 * reused in tests to delete databases without creating DBWrapper instances.
 *
 * @param {string} name The database name.
 * @private
 */
const deleteDatabase = async (name) => {
    await new Promise((resolve, reject) => {
        const request = indexedDB.deleteDatabase(name);
        request.onerror = () => {
            reject(request.error);
        };
        request.onblocked = () => {
            reject(new Error('Delete blocked'));
        };
        request.onsuccess = () => {
            resolve();
        };
    });
};


/***/ }),

/***/ "./node_modules/workbox-core/_private/dontWaitFor.js":
/*!***********************************************************!*\
  !*** ./node_modules/workbox-core/_private/dontWaitFor.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dontWaitFor": () => (/* binding */ dontWaitFor)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A helper function that prevents a promise from being flagged as unused.
 *
 * @private
 **/
function dontWaitFor(promise) {
    // Effective no-op.
    promise.then(() => { });
}


/***/ }),

/***/ "./node_modules/workbox-core/_private/executeQuotaErrorCallbacks.js":
/*!**************************************************************************!*\
  !*** ./node_modules/workbox-core/_private/executeQuotaErrorCallbacks.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "executeQuotaErrorCallbacks": () => (/* binding */ executeQuotaErrorCallbacks)
/* harmony export */ });
/* harmony import */ var _private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _models_quotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/quotaErrorCallbacks.js */ "./node_modules/workbox-core/models/quotaErrorCallbacks.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_2__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/



/**
 * Runs all of the callback functions, one at a time sequentially, in the order
 * in which they were registered.
 *
 * @memberof module:workbox-core
 * @private
 */
async function executeQuotaErrorCallbacks() {
    if (true) {
        _private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log(`About to run ${_models_quotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_1__.quotaErrorCallbacks.size} ` +
            `callbacks to clean up caches.`);
    }
    for (const callback of _models_quotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_1__.quotaErrorCallbacks) {
        await callback();
        if (true) {
            _private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log(callback, 'is complete.');
        }
    }
    if (true) {
        _private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log('Finished running callbacks.');
    }
}



/***/ }),

/***/ "./node_modules/workbox-core/_private/getFriendlyURL.js":
/*!**************************************************************!*\
  !*** ./node_modules/workbox-core/_private/getFriendlyURL.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFriendlyURL": () => (/* binding */ getFriendlyURL)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const getFriendlyURL = (url) => {
    const urlObj = new URL(String(url), location.href);
    // See https://github.com/GoogleChrome/workbox/issues/2323
    // We want to include everything, except for the origin if it's same-origin.
    return urlObj.href.replace(new RegExp(`^${location.origin}`), '');
};



/***/ }),

/***/ "./node_modules/workbox-core/_private/logger.js":
/*!******************************************************!*\
  !*** ./node_modules/workbox-core/_private/logger.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "logger": () => (/* binding */ logger)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const logger = ( false ? 0 : (() => {
    // Don't overwrite this value if it's already set.
    // See https://github.com/GoogleChrome/workbox/pull/2284#issuecomment-560470923
    if (!('__WB_DISABLE_DEV_LOGS' in self)) {
        self.__WB_DISABLE_DEV_LOGS = false;
    }
    let inGroup = false;
    const methodToColorMap = {
        debug: `#7f8c8d`,
        log: `#2ecc71`,
        warn: `#f39c12`,
        error: `#c0392b`,
        groupCollapsed: `#3498db`,
        groupEnd: null,
    };
    const print = function (method, args) {
        if (self.__WB_DISABLE_DEV_LOGS) {
            return;
        }
        if (method === 'groupCollapsed') {
            // Safari doesn't print all console.groupCollapsed() arguments:
            // https://bugs.webkit.org/show_bug.cgi?id=182754
            if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
                console[method](...args);
                return;
            }
        }
        const styles = [
            `background: ${methodToColorMap[method]}`,
            `border-radius: 0.5em`,
            `color: white`,
            `font-weight: bold`,
            `padding: 2px 0.5em`,
        ];
        // When in a group, the workbox prefix is not displayed.
        const logPrefix = inGroup ? [] : ['%cworkbox', styles.join(';')];
        console[method](...logPrefix, ...args);
        if (method === 'groupCollapsed') {
            inGroup = true;
        }
        if (method === 'groupEnd') {
            inGroup = false;
        }
    };
    const api = {};
    const loggerMethods = Object.keys(methodToColorMap);
    for (const key of loggerMethods) {
        const method = key;
        api[method] = (...args) => {
            print(method, args);
        };
    }
    return api;
})());



/***/ }),

/***/ "./node_modules/workbox-core/_private/timeout.js":
/*!*******************************************************!*\
  !*** ./node_modules/workbox-core/_private/timeout.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timeout": () => (/* binding */ timeout)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Returns a promise that resolves and the passed number of milliseconds.
 * This utility is an async/await-friendly version of `setTimeout`.
 *
 * @param {number} ms
 * @return {Promise}
 * @private
 */
function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


/***/ }),

/***/ "./node_modules/workbox-core/_private/waitUntil.js":
/*!*********************************************************!*\
  !*** ./node_modules/workbox-core/_private/waitUntil.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "waitUntil": () => (/* binding */ waitUntil)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2020 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A utility method that makes it easier to use `event.waitUntil` with
 * async functions and return the result.
 *
 * @param {ExtendableEvent} event
 * @param {Function} asyncFn
 * @return {Function}
 * @private
 */
function waitUntil(event, asyncFn) {
    const returnPromise = asyncFn();
    event.waitUntil(returnPromise);
    return returnPromise;
}



/***/ }),

/***/ "./node_modules/workbox-core/_version.js":
/*!***********************************************!*\
  !*** ./node_modules/workbox-core/_version.js ***!
  \***********************************************/
/***/ (() => {


// @ts-ignore
try {
    self['workbox:core:6.1.2'] && _();
}
catch (e) { }


/***/ }),

/***/ "./node_modules/workbox-core/copyResponse.js":
/*!***************************************************!*\
  !*** ./node_modules/workbox-core/copyResponse.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "copyResponse": () => (/* binding */ copyResponse)
/* harmony export */ });
/* harmony import */ var _private_canConstructResponseFromBodyStream_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_private/canConstructResponseFromBodyStream.js */ "./node_modules/workbox-core/_private/canConstructResponseFromBodyStream.js");
/* harmony import */ var _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_2__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/



/**
 * Allows developers to copy a response and modify its `headers`, `status`,
 * or `statusText` values (the values settable via a
 * [`ResponseInit`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Response/Response#Syntax}
 * object in the constructor).
 * To modify these values, pass a function as the second argument. That
 * function will be invoked with a single object with the response properties
 * `{headers, status, statusText}`. The return value of this function will
 * be used as the `ResponseInit` for the new `Response`. To change the values
 * either modify the passed parameter(s) and return it, or return a totally
 * new object.
 *
 * This method is intentionally limited to same-origin responses, regardless of
 * whether CORS was used or not.
 *
 * @param {Response} response
 * @param {Function} modifier
 * @memberof module:workbox-core
 */
async function copyResponse(response, modifier) {
    let origin = null;
    // If response.url isn't set, assume it's cross-origin and keep origin null.
    if (response.url) {
        const responseURL = new URL(response.url);
        origin = responseURL.origin;
    }
    if (origin !== self.location.origin) {
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__.WorkboxError('cross-origin-copy-response', { origin });
    }
    const clonedResponse = response.clone();
    // Create a fresh `ResponseInit` object by cloning the headers.
    const responseInit = {
        headers: new Headers(clonedResponse.headers),
        status: clonedResponse.status,
        statusText: clonedResponse.statusText,
    };
    // Apply any user modifications.
    const modifiedResponseInit = modifier ? modifier(responseInit) : responseInit;
    // Create the new response from the body stream and `ResponseInit`
    // modifications. Note: not all browsers support the Response.body stream,
    // so fall back to reading the entire body into memory as a blob.
    const body = (0,_private_canConstructResponseFromBodyStream_js__WEBPACK_IMPORTED_MODULE_0__.canConstructResponseFromBodyStream)() ?
        clonedResponse.body : await clonedResponse.blob();
    return new Response(body, modifiedResponseInit);
}



/***/ }),

/***/ "./node_modules/workbox-core/models/messages/messageGenerator.js":
/*!***********************************************************************!*\
  !*** ./node_modules/workbox-core/models/messages/messageGenerator.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "messageGenerator": () => (/* binding */ messageGenerator)
/* harmony export */ });
/* harmony import */ var _messages_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messages.js */ "./node_modules/workbox-core/models/messages/messages.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


const fallback = (code, ...args) => {
    let msg = code;
    if (args.length > 0) {
        msg += ` :: ${JSON.stringify(args)}`;
    }
    return msg;
};
const generatorFunction = (code, details = {}) => {
    const message = _messages_js__WEBPACK_IMPORTED_MODULE_0__.messages[code];
    if (!message) {
        throw new Error(`Unable to find message for code '${code}'.`);
    }
    return message(details);
};
const messageGenerator = ( false) ?
    0 : generatorFunction;


/***/ }),

/***/ "./node_modules/workbox-core/models/messages/messages.js":
/*!***************************************************************!*\
  !*** ./node_modules/workbox-core/models/messages/messages.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "messages": () => (/* binding */ messages)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const messages = {
    'invalid-value': ({ paramName, validValueDescription, value }) => {
        if (!paramName || !validValueDescription) {
            throw new Error(`Unexpected input to 'invalid-value' error.`);
        }
        return `The '${paramName}' parameter was given a value with an ` +
            `unexpected value. ${validValueDescription} Received a value of ` +
            `${JSON.stringify(value)}.`;
    },
    'not-an-array': ({ moduleName, className, funcName, paramName }) => {
        if (!moduleName || !className || !funcName || !paramName) {
            throw new Error(`Unexpected input to 'not-an-array' error.`);
        }
        return `The parameter '${paramName}' passed into ` +
            `'${moduleName}.${className}.${funcName}()' must be an array.`;
    },
    'incorrect-type': ({ expectedType, paramName, moduleName, className, funcName }) => {
        if (!expectedType || !paramName || !moduleName || !funcName) {
            throw new Error(`Unexpected input to 'incorrect-type' error.`);
        }
        return `The parameter '${paramName}' passed into ` +
            `'${moduleName}.${className ? (className + '.') : ''}` +
            `${funcName}()' must be of type ${expectedType}.`;
    },
    'incorrect-class': ({ expectedClass, paramName, moduleName, className, funcName, isReturnValueProblem }) => {
        if (!expectedClass || !moduleName || !funcName) {
            throw new Error(`Unexpected input to 'incorrect-class' error.`);
        }
        if (isReturnValueProblem) {
            return `The return value from ` +
                `'${moduleName}.${className ? (className + '.') : ''}${funcName}()' ` +
                `must be an instance of class ${expectedClass.name}.`;
        }
        return `The parameter '${paramName}' passed into ` +
            `'${moduleName}.${className ? (className + '.') : ''}${funcName}()' ` +
            `must be an instance of class ${expectedClass.name}.`;
    },
    'missing-a-method': ({ expectedMethod, paramName, moduleName, className, funcName }) => {
        if (!expectedMethod || !paramName || !moduleName || !className
            || !funcName) {
            throw new Error(`Unexpected input to 'missing-a-method' error.`);
        }
        return `${moduleName}.${className}.${funcName}() expected the ` +
            `'${paramName}' parameter to expose a '${expectedMethod}' method.`;
    },
    'add-to-cache-list-unexpected-type': ({ entry }) => {
        return `An unexpected entry was passed to ` +
            `'workbox-precaching.PrecacheController.addToCacheList()' The entry ` +
            `'${JSON.stringify(entry)}' isn't supported. You must supply an array of ` +
            `strings with one or more characters, objects with a url property or ` +
            `Request objects.`;
    },
    'add-to-cache-list-conflicting-entries': ({ firstEntry, secondEntry }) => {
        if (!firstEntry || !secondEntry) {
            throw new Error(`Unexpected input to ` +
                `'add-to-cache-list-duplicate-entries' error.`);
        }
        return `Two of the entries passed to ` +
            `'workbox-precaching.PrecacheController.addToCacheList()' had the URL ` +
            `${firstEntry._entryId} but different revision details. Workbox is ` +
            `unable to cache and version the asset correctly. Please remove one ` +
            `of the entries.`;
    },
    'plugin-error-request-will-fetch': ({ thrownError }) => {
        if (!thrownError) {
            throw new Error(`Unexpected input to ` +
                `'plugin-error-request-will-fetch', error.`);
        }
        return `An error was thrown by a plugins 'requestWillFetch()' method. ` +
            `The thrown error message was: '${thrownError.message}'.`;
    },
    'invalid-cache-name': ({ cacheNameId, value }) => {
        if (!cacheNameId) {
            throw new Error(`Expected a 'cacheNameId' for error 'invalid-cache-name'`);
        }
        return `You must provide a name containing at least one character for ` +
            `setCacheDetails({${cacheNameId}: '...'}). Received a value of ` +
            `'${JSON.stringify(value)}'`;
    },
    'unregister-route-but-not-found-with-method': ({ method }) => {
        if (!method) {
            throw new Error(`Unexpected input to ` +
                `'unregister-route-but-not-found-with-method' error.`);
        }
        return `The route you're trying to unregister was not  previously ` +
            `registered for the method type '${method}'.`;
    },
    'unregister-route-route-not-registered': () => {
        return `The route you're trying to unregister was not previously ` +
            `registered.`;
    },
    'queue-replay-failed': ({ name }) => {
        return `Replaying the background sync queue '${name}' failed.`;
    },
    'duplicate-queue-name': ({ name }) => {
        return `The Queue name '${name}' is already being used. ` +
            `All instances of backgroundSync.Queue must be given unique names.`;
    },
    'expired-test-without-max-age': ({ methodName, paramName }) => {
        return `The '${methodName}()' method can only be used when the ` +
            `'${paramName}' is used in the constructor.`;
    },
    'unsupported-route-type': ({ moduleName, className, funcName, paramName }) => {
        return `The supplied '${paramName}' parameter was an unsupported type. ` +
            `Please check the docs for ${moduleName}.${className}.${funcName} for ` +
            `valid input types.`;
    },
    'not-array-of-class': ({ value, expectedClass, moduleName, className, funcName, paramName }) => {
        return `The supplied '${paramName}' parameter must be an array of ` +
            `'${expectedClass}' objects. Received '${JSON.stringify(value)},'. ` +
            `Please check the call to ${moduleName}.${className}.${funcName}() ` +
            `to fix the issue.`;
    },
    'max-entries-or-age-required': ({ moduleName, className, funcName }) => {
        return `You must define either config.maxEntries or config.maxAgeSeconds` +
            `in ${moduleName}.${className}.${funcName}`;
    },
    'statuses-or-headers-required': ({ moduleName, className, funcName }) => {
        return `You must define either config.statuses or config.headers` +
            `in ${moduleName}.${className}.${funcName}`;
    },
    'invalid-string': ({ moduleName, funcName, paramName }) => {
        if (!paramName || !moduleName || !funcName) {
            throw new Error(`Unexpected input to 'invalid-string' error.`);
        }
        return `When using strings, the '${paramName}' parameter must start with ` +
            `'http' (for cross-origin matches) or '/' (for same-origin matches). ` +
            `Please see the docs for ${moduleName}.${funcName}() for ` +
            `more info.`;
    },
    'channel-name-required': () => {
        return `You must provide a channelName to construct a ` +
            `BroadcastCacheUpdate instance.`;
    },
    'invalid-responses-are-same-args': () => {
        return `The arguments passed into responsesAreSame() appear to be ` +
            `invalid. Please ensure valid Responses are used.`;
    },
    'expire-custom-caches-only': () => {
        return `You must provide a 'cacheName' property when using the ` +
            `expiration plugin with a runtime caching strategy.`;
    },
    'unit-must-be-bytes': ({ normalizedRangeHeader }) => {
        if (!normalizedRangeHeader) {
            throw new Error(`Unexpected input to 'unit-must-be-bytes' error.`);
        }
        return `The 'unit' portion of the Range header must be set to 'bytes'. ` +
            `The Range header provided was "${normalizedRangeHeader}"`;
    },
    'single-range-only': ({ normalizedRangeHeader }) => {
        if (!normalizedRangeHeader) {
            throw new Error(`Unexpected input to 'single-range-only' error.`);
        }
        return `Multiple ranges are not supported. Please use a  single start ` +
            `value, and optional end value. The Range header provided was ` +
            `"${normalizedRangeHeader}"`;
    },
    'invalid-range-values': ({ normalizedRangeHeader }) => {
        if (!normalizedRangeHeader) {
            throw new Error(`Unexpected input to 'invalid-range-values' error.`);
        }
        return `The Range header is missing both start and end values. At least ` +
            `one of those values is needed. The Range header provided was ` +
            `"${normalizedRangeHeader}"`;
    },
    'no-range-header': () => {
        return `No Range header was found in the Request provided.`;
    },
    'range-not-satisfiable': ({ size, start, end }) => {
        return `The start (${start}) and end (${end}) values in the Range are ` +
            `not satisfiable by the cached response, which is ${size} bytes.`;
    },
    'attempt-to-cache-non-get-request': ({ url, method }) => {
        return `Unable to cache '${url}' because it is a '${method}' request and ` +
            `only 'GET' requests can be cached.`;
    },
    'cache-put-with-no-response': ({ url }) => {
        return `There was an attempt to cache '${url}' but the response was not ` +
            `defined.`;
    },
    'no-response': ({ url, error }) => {
        let message = `The strategy could not generate a response for '${url}'.`;
        if (error) {
            message += ` The underlying error is ${error}.`;
        }
        return message;
    },
    'bad-precaching-response': ({ url, status }) => {
        return `The precaching request for '${url}' failed` +
            (status ? ` with an HTTP status of ${status}.` : `.`);
    },
    'non-precached-url': ({ url }) => {
        return `createHandlerBoundToURL('${url}') was called, but that URL is ` +
            `not precached. Please pass in a URL that is precached instead.`;
    },
    'add-to-cache-list-conflicting-integrities': ({ url }) => {
        return `Two of the entries passed to ` +
            `'workbox-precaching.PrecacheController.addToCacheList()' had the URL ` +
            `${url} with different integrity values. Please remove one of them.`;
    },
    'missing-precache-entry': ({ cacheName, url }) => {
        return `Unable to find a precached response in ${cacheName} for ${url}.`;
    },
    'cross-origin-copy-response': ({ origin }) => {
        return `workbox-core.copyResponse() can only be used with same-origin ` +
            `responses. It was passed a response with origin ${origin}.`;
    },
};


/***/ }),

/***/ "./node_modules/workbox-core/models/quotaErrorCallbacks.js":
/*!*****************************************************************!*\
  !*** ./node_modules/workbox-core/models/quotaErrorCallbacks.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "quotaErrorCallbacks": () => (/* binding */ quotaErrorCallbacks)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

// Callbacks to be executed whenever there's a quota error.
const quotaErrorCallbacks = new Set();



/***/ }),

/***/ "./node_modules/workbox-core/registerQuotaErrorCallback.js":
/*!*****************************************************************!*\
  !*** ./node_modules/workbox-core/registerQuotaErrorCallback.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "registerQuotaErrorCallback": () => (/* binding */ registerQuotaErrorCallback)
/* harmony export */ });
/* harmony import */ var _private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _private_assert_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var _models_quotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/quotaErrorCallbacks.js */ "./node_modules/workbox-core/models/quotaErrorCallbacks.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_3__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/




/**
 * Adds a function to the set of quotaErrorCallbacks that will be executed if
 * there's a quota error.
 *
 * @param {Function} callback
 * @memberof module:workbox-core
 */
function registerQuotaErrorCallback(callback) {
    if (true) {
        _private_assert_js__WEBPACK_IMPORTED_MODULE_1__.assert.isType(callback, 'function', {
            moduleName: 'workbox-core',
            funcName: 'register',
            paramName: 'callback',
        });
    }
    _models_quotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_2__.quotaErrorCallbacks.add(callback);
    if (true) {
        _private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log('Registered a callback to respond to quota errors.', callback);
    }
}



/***/ }),

/***/ "./node_modules/workbox-expiration/CacheExpiration.js":
/*!************************************************************!*\
  !*** ./node_modules/workbox-expiration/CacheExpiration.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CacheExpiration": () => (/* binding */ CacheExpiration)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_dontWaitFor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/dontWaitFor.js */ "./node_modules/workbox-core/_private/dontWaitFor.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _models_CacheTimestampsModel_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models/CacheTimestampsModel.js */ "./node_modules/workbox-expiration/models/CacheTimestampsModel.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-expiration/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_5__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/






/**
 * The `CacheExpiration` class allows you define an expiration and / or
 * limit on the number of responses stored in a
 * [`Cache`](https://developer.mozilla.org/en-US/docs/Web/API/Cache).
 *
 * @memberof module:workbox-expiration
 */
class CacheExpiration {
    /**
     * To construct a new CacheExpiration instance you must provide at least
     * one of the `config` properties.
     *
     * @param {string} cacheName Name of the cache to apply restrictions to.
     * @param {Object} config
     * @param {number} [config.maxEntries] The maximum number of entries to cache.
     * Entries used the least will be removed as the maximum is reached.
     * @param {number} [config.maxAgeSeconds] The maximum age of an entry before
     * it's treated as stale and removed.
     * @param {Object} [config.matchOptions] The [`CacheQueryOptions`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/delete#Parameters)
     * that will be used when calling `delete()` on the cache.
     */
    constructor(cacheName, config = {}) {
        this._isRunning = false;
        this._rerunRequested = false;
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(cacheName, 'string', {
                moduleName: 'workbox-expiration',
                className: 'CacheExpiration',
                funcName: 'constructor',
                paramName: 'cacheName',
            });
            if (!(config.maxEntries || config.maxAgeSeconds)) {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_3__.WorkboxError('max-entries-or-age-required', {
                    moduleName: 'workbox-expiration',
                    className: 'CacheExpiration',
                    funcName: 'constructor',
                });
            }
            if (config.maxEntries) {
                workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(config.maxEntries, 'number', {
                    moduleName: 'workbox-expiration',
                    className: 'CacheExpiration',
                    funcName: 'constructor',
                    paramName: 'config.maxEntries',
                });
            }
            if (config.maxAgeSeconds) {
                workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(config.maxAgeSeconds, 'number', {
                    moduleName: 'workbox-expiration',
                    className: 'CacheExpiration',
                    funcName: 'constructor',
                    paramName: 'config.maxAgeSeconds',
                });
            }
        }
        this._maxEntries = config.maxEntries;
        this._maxAgeSeconds = config.maxAgeSeconds;
        this._matchOptions = config.matchOptions;
        this._cacheName = cacheName;
        this._timestampModel = new _models_CacheTimestampsModel_js__WEBPACK_IMPORTED_MODULE_4__.CacheTimestampsModel(cacheName);
    }
    /**
     * Expires entries for the given cache and given criteria.
     */
    async expireEntries() {
        if (this._isRunning) {
            this._rerunRequested = true;
            return;
        }
        this._isRunning = true;
        const minTimestamp = this._maxAgeSeconds ?
            Date.now() - (this._maxAgeSeconds * 1000) : 0;
        const urlsExpired = await this._timestampModel.expireEntries(minTimestamp, this._maxEntries);
        // Delete URLs from the cache
        const cache = await self.caches.open(this._cacheName);
        for (const url of urlsExpired) {
            await cache.delete(url, this._matchOptions);
        }
        if (true) {
            if (urlsExpired.length > 0) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__.logger.groupCollapsed(`Expired ${urlsExpired.length} ` +
                    `${urlsExpired.length === 1 ? 'entry' : 'entries'} and removed ` +
                    `${urlsExpired.length === 1 ? 'it' : 'them'} from the ` +
                    `'${this._cacheName}' cache.`);
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__.logger.log(`Expired the following ${urlsExpired.length === 1 ?
                    'URL' : 'URLs'}:`);
                urlsExpired.forEach((url) => workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__.logger.log(`    ${url}`));
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__.logger.groupEnd();
            }
            else {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__.logger.debug(`Cache expiration ran and found no entries to remove.`);
            }
        }
        this._isRunning = false;
        if (this._rerunRequested) {
            this._rerunRequested = false;
            (0,workbox_core_private_dontWaitFor_js__WEBPACK_IMPORTED_MODULE_1__.dontWaitFor)(this.expireEntries());
        }
    }
    /**
     * Update the timestamp for the given URL. This ensures the when
     * removing entries based on maximum entries, most recently used
     * is accurate or when expiring, the timestamp is up-to-date.
     *
     * @param {string} url
     */
    async updateTimestamp(url) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(url, 'string', {
                moduleName: 'workbox-expiration',
                className: 'CacheExpiration',
                funcName: 'updateTimestamp',
                paramName: 'url',
            });
        }
        await this._timestampModel.setTimestamp(url, Date.now());
    }
    /**
     * Can be used to check if a URL has expired or not before it's used.
     *
     * This requires a look up from IndexedDB, so can be slow.
     *
     * Note: This method will not remove the cached entry, call
     * `expireEntries()` to remove indexedDB and Cache entries.
     *
     * @param {string} url
     * @return {boolean}
     */
    async isURLExpired(url) {
        if (!this._maxAgeSeconds) {
            if (true) {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_3__.WorkboxError(`expired-test-without-max-age`, {
                    methodName: 'isURLExpired',
                    paramName: 'maxAgeSeconds',
                });
            }
            return false;
        }
        else {
            const timestamp = await this._timestampModel.getTimestamp(url);
            const expireOlderThan = Date.now() - (this._maxAgeSeconds * 1000);
            return (timestamp < expireOlderThan);
        }
    }
    /**
     * Removes the IndexedDB object store used to keep track of cache expiration
     * metadata.
     */
    async delete() {
        // Make sure we don't attempt another rerun if we're called in the middle of
        // a cache expiration.
        this._rerunRequested = false;
        await this._timestampModel.expireEntries(Infinity); // Expires all.
    }
}



/***/ }),

/***/ "./node_modules/workbox-expiration/ExpirationPlugin.js":
/*!*************************************************************!*\
  !*** ./node_modules/workbox-expiration/ExpirationPlugin.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExpirationPlugin": () => (/* binding */ ExpirationPlugin)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/cacheNames.js */ "./node_modules/workbox-core/_private/cacheNames.js");
/* harmony import */ var workbox_core_private_dontWaitFor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core/_private/dontWaitFor.js */ "./node_modules/workbox-core/_private/dontWaitFor.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_registerQuotaErrorCallback_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! workbox-core/registerQuotaErrorCallback.js */ "./node_modules/workbox-core/registerQuotaErrorCallback.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _CacheExpiration_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CacheExpiration.js */ "./node_modules/workbox-expiration/CacheExpiration.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-expiration/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_8__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/









/**
 * This plugin can be used in a `workbox-strategy` to regularly enforce a
 * limit on the age and / or the number of cached requests.
 *
 * It can only be used with `workbox-strategy` instances that have a
 * [custom `cacheName` property set](/web/tools/workbox/guides/configure-workbox#custom_cache_names_in_strategies).
 * In other words, it can't be used to expire entries in strategy that uses the
 * default runtime cache name.
 *
 * Whenever a cached request is used or updated, this plugin will look
 * at the associated cache and remove any old or extra requests.
 *
 * When using `maxAgeSeconds`, requests may be used *once* after expiring
 * because the expiration clean up will not have occurred until *after* the
 * cached request has been used. If the request has a "Date" header, then
 * a light weight expiration check is performed and the request will not be
 * used immediately.
 *
 * When using `maxEntries`, the entry least-recently requested will be removed
 * from the cache first.
 *
 * @memberof module:workbox-expiration
 */
class ExpirationPlugin {
    /**
     * @param {Object} config
     * @param {number} [config.maxEntries] The maximum number of entries to cache.
     * Entries used the least will be removed as the maximum is reached.
     * @param {number} [config.maxAgeSeconds] The maximum age of an entry before
     * it's treated as stale and removed.
     * @param {Object} [config.matchOptions] The [`CacheQueryOptions`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/delete#Parameters)
     * that will be used when calling `delete()` on the cache.
     * @param {boolean} [config.purgeOnQuotaError] Whether to opt this cache in to
     * automatic deletion if the available storage quota has been exceeded.
     */
    constructor(config = {}) {
        /**
         * A "lifecycle" callback that will be triggered automatically by the
         * `workbox-strategies` handlers when a `Response` is about to be returned
         * from a [Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache) to
         * the handler. It allows the `Response` to be inspected for freshness and
         * prevents it from being used if the `Response`'s `Date` header value is
         * older than the configured `maxAgeSeconds`.
         *
         * @param {Object} options
         * @param {string} options.cacheName Name of the cache the response is in.
         * @param {Response} options.cachedResponse The `Response` object that's been
         *     read from a cache and whose freshness should be checked.
         * @return {Response} Either the `cachedResponse`, if it's
         *     fresh, or `null` if the `Response` is older than `maxAgeSeconds`.
         *
         * @private
         */
        this.cachedResponseWillBeUsed = async ({ event, request, cacheName, cachedResponse }) => {
            if (!cachedResponse) {
                return null;
            }
            const isFresh = this._isResponseDateFresh(cachedResponse);
            // Expire entries to ensure that even if the expiration date has
            // expired, it'll only be used once.
            const cacheExpiration = this._getCacheExpiration(cacheName);
            (0,workbox_core_private_dontWaitFor_js__WEBPACK_IMPORTED_MODULE_2__.dontWaitFor)(cacheExpiration.expireEntries());
            // Update the metadata for the request URL to the current timestamp,
            // but don't `await` it as we don't want to block the response.
            const updateTimestampDone = cacheExpiration.updateTimestamp(request.url);
            if (event) {
                try {
                    event.waitUntil(updateTimestampDone);
                }
                catch (error) {
                    if (true) {
                        // The event may not be a fetch event; only log the URL if it is.
                        if ('request' in event) {
                            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_4__.logger.warn(`Unable to ensure service worker stays alive when ` +
                                `updating cache entry for ` +
                                `'${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_3__.getFriendlyURL)(event.request.url)}'.`);
                        }
                    }
                }
            }
            return isFresh ? cachedResponse : null;
        };
        /**
         * A "lifecycle" callback that will be triggered automatically by the
         * `workbox-strategies` handlers when an entry is added to a cache.
         *
         * @param {Object} options
         * @param {string} options.cacheName Name of the cache that was updated.
         * @param {string} options.request The Request for the cached entry.
         *
         * @private
         */
        this.cacheDidUpdate = async ({ cacheName, request }) => {
            if (true) {
                workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(cacheName, 'string', {
                    moduleName: 'workbox-expiration',
                    className: 'Plugin',
                    funcName: 'cacheDidUpdate',
                    paramName: 'cacheName',
                });
                workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isInstance(request, Request, {
                    moduleName: 'workbox-expiration',
                    className: 'Plugin',
                    funcName: 'cacheDidUpdate',
                    paramName: 'request',
                });
            }
            const cacheExpiration = this._getCacheExpiration(cacheName);
            await cacheExpiration.updateTimestamp(request.url);
            await cacheExpiration.expireEntries();
        };
        if (true) {
            if (!(config.maxEntries || config.maxAgeSeconds)) {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_6__.WorkboxError('max-entries-or-age-required', {
                    moduleName: 'workbox-expiration',
                    className: 'Plugin',
                    funcName: 'constructor',
                });
            }
            if (config.maxEntries) {
                workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(config.maxEntries, 'number', {
                    moduleName: 'workbox-expiration',
                    className: 'Plugin',
                    funcName: 'constructor',
                    paramName: 'config.maxEntries',
                });
            }
            if (config.maxAgeSeconds) {
                workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(config.maxAgeSeconds, 'number', {
                    moduleName: 'workbox-expiration',
                    className: 'Plugin',
                    funcName: 'constructor',
                    paramName: 'config.maxAgeSeconds',
                });
            }
        }
        this._config = config;
        this._maxAgeSeconds = config.maxAgeSeconds;
        this._cacheExpirations = new Map();
        if (config.purgeOnQuotaError) {
            (0,workbox_core_registerQuotaErrorCallback_js__WEBPACK_IMPORTED_MODULE_5__.registerQuotaErrorCallback)(() => this.deleteCacheAndMetadata());
        }
    }
    /**
     * A simple helper method to return a CacheExpiration instance for a given
     * cache name.
     *
     * @param {string} cacheName
     * @return {CacheExpiration}
     *
     * @private
     */
    _getCacheExpiration(cacheName) {
        if (cacheName === workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_1__.cacheNames.getRuntimeName()) {
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_6__.WorkboxError('expire-custom-caches-only');
        }
        let cacheExpiration = this._cacheExpirations.get(cacheName);
        if (!cacheExpiration) {
            cacheExpiration = new _CacheExpiration_js__WEBPACK_IMPORTED_MODULE_7__.CacheExpiration(cacheName, this._config);
            this._cacheExpirations.set(cacheName, cacheExpiration);
        }
        return cacheExpiration;
    }
    /**
     * @param {Response} cachedResponse
     * @return {boolean}
     *
     * @private
     */
    _isResponseDateFresh(cachedResponse) {
        if (!this._maxAgeSeconds) {
            // We aren't expiring by age, so return true, it's fresh
            return true;
        }
        // Check if the 'date' header will suffice a quick expiration check.
        // See https://github.com/GoogleChromeLabs/sw-toolbox/issues/164 for
        // discussion.
        const dateHeaderTimestamp = this._getDateHeaderTimestamp(cachedResponse);
        if (dateHeaderTimestamp === null) {
            // Unable to parse date, so assume it's fresh.
            return true;
        }
        // If we have a valid headerTime, then our response is fresh iff the
        // headerTime plus maxAgeSeconds is greater than the current time.
        const now = Date.now();
        return dateHeaderTimestamp >= now - (this._maxAgeSeconds * 1000);
    }
    /**
     * This method will extract the data header and parse it into a useful
     * value.
     *
     * @param {Response} cachedResponse
     * @return {number|null}
     *
     * @private
     */
    _getDateHeaderTimestamp(cachedResponse) {
        if (!cachedResponse.headers.has('date')) {
            return null;
        }
        const dateHeader = cachedResponse.headers.get('date');
        const parsedDate = new Date(dateHeader);
        const headerTime = parsedDate.getTime();
        // If the Date header was invalid for some reason, parsedDate.getTime()
        // will return NaN.
        if (isNaN(headerTime)) {
            return null;
        }
        return headerTime;
    }
    /**
     * This is a helper method that performs two operations:
     *
     * - Deletes *all* the underlying Cache instances associated with this plugin
     * instance, by calling caches.delete() on your behalf.
     * - Deletes the metadata from IndexedDB used to keep track of expiration
     * details for each Cache instance.
     *
     * When using cache expiration, calling this method is preferable to calling
     * `caches.delete()` directly, since this will ensure that the IndexedDB
     * metadata is also cleanly removed and open IndexedDB instances are deleted.
     *
     * Note that if you're *not* using cache expiration for a given cache, calling
     * `caches.delete()` and passing in the cache's name should be sufficient.
     * There is no Workbox-specific method needed for cleanup in that case.
     */
    async deleteCacheAndMetadata() {
        // Do this one at a time instead of all at once via `Promise.all()` to
        // reduce the chance of inconsistency if a promise rejects.
        for (const [cacheName, cacheExpiration] of this._cacheExpirations) {
            await self.caches.delete(cacheName);
            await cacheExpiration.delete();
        }
        // Reset this._cacheExpirations to its initial state.
        this._cacheExpirations = new Map();
    }
}



/***/ }),

/***/ "./node_modules/workbox-expiration/_version.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-expiration/_version.js ***!
  \*****************************************************/
/***/ (() => {


// @ts-ignore
try {
    self['workbox:expiration:6.1.2'] && _();
}
catch (e) { }


/***/ }),

/***/ "./node_modules/workbox-expiration/models/CacheTimestampsModel.js":
/*!************************************************************************!*\
  !*** ./node_modules/workbox-expiration/models/CacheTimestampsModel.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CacheTimestampsModel": () => (/* binding */ CacheTimestampsModel)
/* harmony export */ });
/* harmony import */ var workbox_core_private_DBWrapper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/DBWrapper.js */ "./node_modules/workbox-core/_private/DBWrapper.js");
/* harmony import */ var workbox_core_private_deleteDatabase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/deleteDatabase.js */ "./node_modules/workbox-core/_private/deleteDatabase.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-expiration/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_2__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/



const DB_NAME = 'workbox-expiration';
const OBJECT_STORE_NAME = 'cache-entries';
const normalizeURL = (unNormalizedUrl) => {
    const url = new URL(unNormalizedUrl, location.href);
    url.hash = '';
    return url.href;
};
/**
 * Returns the timestamp model.
 *
 * @private
 */
class CacheTimestampsModel {
    /**
     *
     * @param {string} cacheName
     *
     * @private
     */
    constructor(cacheName) {
        this._cacheName = cacheName;
        this._db = new workbox_core_private_DBWrapper_js__WEBPACK_IMPORTED_MODULE_0__.DBWrapper(DB_NAME, 1, {
            onupgradeneeded: (event) => this._handleUpgrade(event),
        });
    }
    /**
     * Should perform an upgrade of indexedDB.
     *
     * @param {Event} event
     *
     * @private
     */
    _handleUpgrade(event) {
        const db = event.target.result;
        // TODO(philipwalton): EdgeHTML doesn't support arrays as a keyPath, so we
        // have to use the `id` keyPath here and create our own values (a
        // concatenation of `url + cacheName`) instead of simply using
        // `keyPath: ['url', 'cacheName']`, which is supported in other browsers.
        const objStore = db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
        // TODO(philipwalton): once we don't have to support EdgeHTML, we can
        // create a single index with the keyPath `['cacheName', 'timestamp']`
        // instead of doing both these indexes.
        objStore.createIndex('cacheName', 'cacheName', { unique: false });
        objStore.createIndex('timestamp', 'timestamp', { unique: false });
        // Previous versions of `workbox-expiration` used `this._cacheName`
        // as the IDBDatabase name.
        (0,workbox_core_private_deleteDatabase_js__WEBPACK_IMPORTED_MODULE_1__.deleteDatabase)(this._cacheName);
    }
    /**
     * @param {string} url
     * @param {number} timestamp
     *
     * @private
     */
    async setTimestamp(url, timestamp) {
        url = normalizeURL(url);
        const entry = {
            url,
            timestamp,
            cacheName: this._cacheName,
            // Creating an ID from the URL and cache name won't be necessary once
            // Edge switches to Chromium and all browsers we support work with
            // array keyPaths.
            id: this._getId(url),
        };
        await this._db.put(OBJECT_STORE_NAME, entry);
    }
    /**
     * Returns the timestamp stored for a given URL.
     *
     * @param {string} url
     * @return {number}
     *
     * @private
     */
    async getTimestamp(url) {
        const entry = await this._db.get(OBJECT_STORE_NAME, this._getId(url));
        return entry.timestamp;
    }
    /**
     * Iterates through all the entries in the object store (from newest to
     * oldest) and removes entries once either `maxCount` is reached or the
     * entry's timestamp is less than `minTimestamp`.
     *
     * @param {number} minTimestamp
     * @param {number} maxCount
     * @return {Array<string>}
     *
     * @private
     */
    async expireEntries(minTimestamp, maxCount) {
        const entriesToDelete = await this._db.transaction(OBJECT_STORE_NAME, 'readwrite', (txn, done) => {
            const store = txn.objectStore(OBJECT_STORE_NAME);
            const request = store.index('timestamp').openCursor(null, 'prev');
            const entriesToDelete = [];
            let entriesNotDeletedCount = 0;
            request.onsuccess = () => {
                const cursor = request.result;
                if (cursor) {
                    const result = cursor.value;
                    // TODO(philipwalton): once we can use a multi-key index, we
                    // won't have to check `cacheName` here.
                    if (result.cacheName === this._cacheName) {
                        // Delete an entry if it's older than the max age or
                        // if we already have the max number allowed.
                        if ((minTimestamp && result.timestamp < minTimestamp) ||
                            (maxCount && entriesNotDeletedCount >= maxCount)) {
                            // TODO(philipwalton): we should be able to delete the
                            // entry right here, but doing so causes an iteration
                            // bug in Safari stable (fixed in TP). Instead we can
                            // store the keys of the entries to delete, and then
                            // delete the separate transactions.
                            // https://github.com/GoogleChrome/workbox/issues/1978
                            // cursor.delete();
                            // We only need to return the URL, not the whole entry.
                            entriesToDelete.push(cursor.value);
                        }
                        else {
                            entriesNotDeletedCount++;
                        }
                    }
                    cursor.continue();
                }
                else {
                    done(entriesToDelete);
                }
            };
        });
        // TODO(philipwalton): once the Safari bug in the following issue is fixed,
        // we should be able to remove this loop and do the entry deletion in the
        // cursor loop above:
        // https://github.com/GoogleChrome/workbox/issues/1978
        const urlsDeleted = [];
        for (const entry of entriesToDelete) {
            await this._db.delete(OBJECT_STORE_NAME, entry.id);
            urlsDeleted.push(entry.url);
        }
        return urlsDeleted;
    }
    /**
     * Takes a URL and returns an ID that will be unique in the object store.
     *
     * @param {string} url
     * @return {string}
     *
     * @private
     */
    _getId(url) {
        // Creating an ID from the URL and cache name won't be necessary once
        // Edge switches to Chromium and all browsers we support work with
        // array keyPaths.
        return this._cacheName + '|' + normalizeURL(url);
    }
}



/***/ }),

/***/ "./node_modules/workbox-precaching/PrecacheController.js":
/*!***************************************************************!*\
  !*** ./node_modules/workbox-precaching/PrecacheController.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrecacheController": () => (/* binding */ PrecacheController)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/cacheNames.js */ "./node_modules/workbox-core/_private/cacheNames.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var workbox_core_private_waitUntil_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! workbox-core/_private/waitUntil.js */ "./node_modules/workbox-core/_private/waitUntil.js");
/* harmony import */ var _utils_createCacheKey_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/createCacheKey.js */ "./node_modules/workbox-precaching/utils/createCacheKey.js");
/* harmony import */ var _utils_PrecacheInstallReportPlugin_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/PrecacheInstallReportPlugin.js */ "./node_modules/workbox-precaching/utils/PrecacheInstallReportPlugin.js");
/* harmony import */ var _utils_PrecacheCacheKeyPlugin_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/PrecacheCacheKeyPlugin.js */ "./node_modules/workbox-precaching/utils/PrecacheCacheKeyPlugin.js");
/* harmony import */ var _utils_printCleanupDetails_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/printCleanupDetails.js */ "./node_modules/workbox-precaching/utils/printCleanupDetails.js");
/* harmony import */ var _utils_printInstallDetails_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/printInstallDetails.js */ "./node_modules/workbox-precaching/utils/printInstallDetails.js");
/* harmony import */ var _PrecacheStrategy_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./PrecacheStrategy.js */ "./node_modules/workbox-precaching/PrecacheStrategy.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_11__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/












/**
 * Performs efficient precaching of assets.
 *
 * @memberof module:workbox-precaching
 */
class PrecacheController {
    /**
     * Create a new PrecacheController.
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] The cache to use for precaching.
     * @param {string} [options.plugins] Plugins to use when precaching as well
     * as responding to fetch events for precached assets.
     * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
     * get the response from the network if there's a precache miss.
     */
    constructor({ cacheName, plugins = [], fallbackToNetwork = true } = {}) {
        this._urlsToCacheKeys = new Map();
        this._urlsToCacheModes = new Map();
        this._cacheKeysToIntegrities = new Map();
        this._strategy = new _PrecacheStrategy_js__WEBPACK_IMPORTED_MODULE_10__.PrecacheStrategy({
            cacheName: workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_1__.cacheNames.getPrecacheName(cacheName),
            plugins: [
                ...plugins,
                new _utils_PrecacheCacheKeyPlugin_js__WEBPACK_IMPORTED_MODULE_7__.PrecacheCacheKeyPlugin({ precacheController: this }),
            ],
            fallbackToNetwork,
        });
        // Bind the install and activate methods to the instance.
        this.install = this.install.bind(this);
        this.activate = this.activate.bind(this);
    }
    /**
     * @type {module:workbox-precaching.PrecacheStrategy} The strategy created by this controller and
     * used to cache assets and respond to fetch events.
     */
    get strategy() {
        return this._strategy;
    }
    /**
     * Adds items to the precache list, removing any duplicates and
     * stores the files in the
     * ["precache cache"]{@link module:workbox-core.cacheNames} when the service
     * worker installs.
     *
     * This method can be called multiple times.
     *
     * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
     */
    precache(entries) {
        this.addToCacheList(entries);
        if (!this._installAndActiveListenersAdded) {
            self.addEventListener('install', this.install);
            self.addEventListener('activate', this.activate);
            this._installAndActiveListenersAdded = true;
        }
    }
    /**
     * This method will add items to the precache list, removing duplicates
     * and ensuring the information is valid.
     *
     * @param {Array<module:workbox-precaching.PrecacheController.PrecacheEntry|string>} entries
     *     Array of entries to precache.
     */
    addToCacheList(entries) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isArray(entries, {
                moduleName: 'workbox-precaching',
                className: 'PrecacheController',
                funcName: 'addToCacheList',
                paramName: 'entries',
            });
        }
        const urlsToWarnAbout = [];
        for (const entry of entries) {
            // See https://github.com/GoogleChrome/workbox/issues/2259
            if (typeof entry === 'string') {
                urlsToWarnAbout.push(entry);
            }
            else if (entry && entry.revision === undefined) {
                urlsToWarnAbout.push(entry.url);
            }
            const { cacheKey, url } = (0,_utils_createCacheKey_js__WEBPACK_IMPORTED_MODULE_5__.createCacheKey)(entry);
            const cacheMode = (typeof entry !== 'string' && entry.revision) ?
                'reload' : 'default';
            if (this._urlsToCacheKeys.has(url) &&
                this._urlsToCacheKeys.get(url) !== cacheKey) {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_3__.WorkboxError('add-to-cache-list-conflicting-entries', {
                    firstEntry: this._urlsToCacheKeys.get(url),
                    secondEntry: cacheKey,
                });
            }
            if (typeof entry !== 'string' && entry.integrity) {
                if (this._cacheKeysToIntegrities.has(cacheKey) &&
                    this._cacheKeysToIntegrities.get(cacheKey) !== entry.integrity) {
                    throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_3__.WorkboxError('add-to-cache-list-conflicting-integrities', {
                        url,
                    });
                }
                this._cacheKeysToIntegrities.set(cacheKey, entry.integrity);
            }
            this._urlsToCacheKeys.set(url, cacheKey);
            this._urlsToCacheModes.set(url, cacheMode);
            if (urlsToWarnAbout.length > 0) {
                const warningMessage = `Workbox is precaching URLs without revision ` +
                    `info: ${urlsToWarnAbout.join(', ')}\nThis is generally NOT safe. ` +
                    `Learn more at https://bit.ly/wb-precache`;
                if (false) {}
                else {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__.logger.warn(warningMessage);
                }
            }
        }
    }
    /**
     * Precaches new and updated assets. Call this method from the service worker
     * install event.
     *
     * Note: this method calls `event.waitUntil()` for you, so you do not need
     * to call it yourself in your event handlers.
     *
     * @param {ExtendableEvent} event
     * @return {Promise<module:workbox-precaching.InstallResult>}
     */
    install(event) {
        return (0,workbox_core_private_waitUntil_js__WEBPACK_IMPORTED_MODULE_4__.waitUntil)(event, async () => {
            const installReportPlugin = new _utils_PrecacheInstallReportPlugin_js__WEBPACK_IMPORTED_MODULE_6__.PrecacheInstallReportPlugin();
            this.strategy.plugins.push(installReportPlugin);
            // Cache entries one at a time.
            // See https://github.com/GoogleChrome/workbox/issues/2528
            for (const [url, cacheKey] of this._urlsToCacheKeys) {
                const integrity = this._cacheKeysToIntegrities.get(cacheKey);
                const cacheMode = this._urlsToCacheModes.get(url);
                const request = new Request(url, {
                    integrity,
                    cache: cacheMode,
                    credentials: 'same-origin',
                });
                await Promise.all(this.strategy.handleAll({
                    params: { cacheKey },
                    request,
                    event,
                }));
            }
            const { updatedURLs, notUpdatedURLs } = installReportPlugin;
            if (true) {
                (0,_utils_printInstallDetails_js__WEBPACK_IMPORTED_MODULE_9__.printInstallDetails)(updatedURLs, notUpdatedURLs);
            }
            return { updatedURLs, notUpdatedURLs };
        });
    }
    /**
     * Deletes assets that are no longer present in the current precache manifest.
     * Call this method from the service worker activate event.
     *
     * Note: this method calls `event.waitUntil()` for you, so you do not need
     * to call it yourself in your event handlers.
     *
     * @param {ExtendableEvent} event
     * @return {Promise<module:workbox-precaching.CleanupResult>}
     */
    activate(event) {
        return (0,workbox_core_private_waitUntil_js__WEBPACK_IMPORTED_MODULE_4__.waitUntil)(event, async () => {
            const cache = await self.caches.open(this.strategy.cacheName);
            const currentlyCachedRequests = await cache.keys();
            const expectedCacheKeys = new Set(this._urlsToCacheKeys.values());
            const deletedURLs = [];
            for (const request of currentlyCachedRequests) {
                if (!expectedCacheKeys.has(request.url)) {
                    await cache.delete(request);
                    deletedURLs.push(request.url);
                }
            }
            if (true) {
                (0,_utils_printCleanupDetails_js__WEBPACK_IMPORTED_MODULE_8__.printCleanupDetails)(deletedURLs);
            }
            return { deletedURLs };
        });
    }
    /**
     * Returns a mapping of a precached URL to the corresponding cache key, taking
     * into account the revision information for the URL.
     *
     * @return {Map<string, string>} A URL to cache key mapping.
     */
    getURLsToCacheKeys() {
        return this._urlsToCacheKeys;
    }
    /**
     * Returns a list of all the URLs that have been precached by the current
     * service worker.
     *
     * @return {Array<string>} The precached URLs.
     */
    getCachedURLs() {
        return [...this._urlsToCacheKeys.keys()];
    }
    /**
     * Returns the cache key used for storing a given URL. If that URL is
     * unversioned, like `/index.html', then the cache key will be the original
     * URL with a search parameter appended to it.
     *
     * @param {string} url A URL whose cache key you want to look up.
     * @return {string} The versioned URL that corresponds to a cache key
     * for the original URL, or undefined if that URL isn't precached.
     */
    getCacheKeyForURL(url) {
        const urlObject = new URL(url, location.href);
        return this._urlsToCacheKeys.get(urlObject.href);
    }
    /**
     * This acts as a drop-in replacement for
     * [`cache.match()`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)
     * with the following differences:
     *
     * - It knows what the name of the precache is, and only checks in that cache.
     * - It allows you to pass in an "original" URL without versioning parameters,
     * and it will automatically look up the correct cache key for the currently
     * active revision of that URL.
     *
     * E.g., `matchPrecache('index.html')` will find the correct precached
     * response for the currently active service worker, even if the actual cache
     * key is `'/index.html?__WB_REVISION__=1234abcd'`.
     *
     * @param {string|Request} request The key (without revisioning parameters)
     * to look up in the precache.
     * @return {Promise<Response|undefined>}
     */
    async matchPrecache(request) {
        const url = request instanceof Request ? request.url : request;
        const cacheKey = this.getCacheKeyForURL(url);
        if (cacheKey) {
            const cache = await self.caches.open(this.strategy.cacheName);
            return cache.match(cacheKey);
        }
        return undefined;
    }
    /**
     * Returns a function that looks up `url` in the precache (taking into
     * account revision information), and returns the corresponding `Response`.
     *
     * @param {string} url The precached URL which will be used to lookup the
     * `Response`.
     * @return {module:workbox-routing~handlerCallback}
     */
    createHandlerBoundToURL(url) {
        const cacheKey = this.getCacheKeyForURL(url);
        if (!cacheKey) {
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_3__.WorkboxError('non-precached-url', { url });
        }
        return (options) => {
            options.request = new Request(url);
            options.params = { cacheKey, ...options.params };
            return this.strategy.handle(options);
        };
    }
}



/***/ }),

/***/ "./node_modules/workbox-precaching/PrecacheRoute.js":
/*!**********************************************************!*\
  !*** ./node_modules/workbox-precaching/PrecacheRoute.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrecacheRoute": () => (/* binding */ PrecacheRoute)
/* harmony export */ });
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var workbox_routing_Route_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-routing/Route.js */ "./node_modules/workbox-routing/Route.js");
/* harmony import */ var _utils_generateURLVariations_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/generateURLVariations.js */ "./node_modules/workbox-precaching/utils/generateURLVariations.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_4__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/





/**
 * A subclass of [Route]{@link module:workbox-routing.Route} that takes a
 * [PrecacheController]{@link module:workbox-precaching.PrecacheController}
 * instance and uses it to match incoming requests and handle fetching
 * responses from the precache.
 *
 * @memberof module:workbox-precaching
 * @extends module:workbox-routing.Route
 */
class PrecacheRoute extends workbox_routing_Route_js__WEBPACK_IMPORTED_MODULE_2__.Route {
    /**
     * @param {PrecacheController} precacheController A `PrecacheController`
     * instance used to both match requests and respond to fetch events.
     * @param {Object} [options] Options to control how requests are matched
     * against the list of precached URLs.
     * @param {string} [options.directoryIndex=index.html] The `directoryIndex` will
     * check cache entries for a URLs ending with '/' to see if there is a hit when
     * appending the `directoryIndex` value.
     * @param {Array<RegExp>} [options.ignoreURLParametersMatching=[/^utm_/, /^fbclid$/]] An
     * array of regex's to remove search params when looking for a cache match.
     * @param {boolean} [options.cleanURLs=true] The `cleanURLs` option will
     * check the cache for the URL with a `.html` added to the end of the end.
     * @param {module:workbox-precaching~urlManipulation} [options.urlManipulation]
     * This is a function that should take a URL and return an array of
     * alternative URLs that should be checked for precache matches.
     */
    constructor(precacheController, options) {
        const match = ({ request }) => {
            const urlsToCacheKeys = precacheController.getURLsToCacheKeys();
            for (const possibleURL of (0,_utils_generateURLVariations_js__WEBPACK_IMPORTED_MODULE_3__.generateURLVariations)(request.url, options)) {
                const cacheKey = urlsToCacheKeys.get(possibleURL);
                if (cacheKey) {
                    return { cacheKey };
                }
            }
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug(`Precaching did not find a match for ` +
                    (0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(request.url));
            }
            return;
        };
        super(match, precacheController.strategy);
    }
}



/***/ }),

/***/ "./node_modules/workbox-precaching/PrecacheStrategy.js":
/*!*************************************************************!*\
  !*** ./node_modules/workbox-precaching/PrecacheStrategy.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrecacheStrategy": () => (/* binding */ PrecacheStrategy)
/* harmony export */ });
/* harmony import */ var workbox_core_copyResponse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/copyResponse.js */ "./node_modules/workbox-core/copyResponse.js");
/* harmony import */ var workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/cacheNames.js */ "./node_modules/workbox-core/_private/cacheNames.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var workbox_strategies_Strategy_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! workbox-strategies/Strategy.js */ "./node_modules/workbox-strategies/Strategy.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_6__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/







/**
 * A [Strategy]{@link module:workbox-strategies.Strategy} implementation
 * specifically designed to work with
 * [PrecacheController]{@link module:workbox-precaching.PrecacheController}
 * to both cache and fetch precached assets.
 *
 * Note: an instance of this class is created automatically when creating a
 * `PrecacheController`; it's generally not necessary to create this yourself.
 *
 * @extends module:workbox-strategies.Strategy
 * @memberof module:workbox-precaching
 */
class PrecacheStrategy extends workbox_strategies_Strategy_js__WEBPACK_IMPORTED_MODULE_5__.Strategy {
    /**
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] Cache name to store and retrieve
     * requests. Defaults to the cache names provided by
     * [workbox-core]{@link module:workbox-core.cacheNames}.
     * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
     * to use in conjunction with this caching strategy.
     * @param {Object} [options.fetchOptions] Values passed along to the
     * [`init`]{@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters}
     * of all fetch() requests made by this strategy.
     * @param {Object} [options.matchOptions] The
     * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
     * for any `cache.match()` or `cache.put()` calls made by this strategy.
     * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
     * get the response from the network if there's a precache miss.
     */
    constructor(options = {}) {
        options.cacheName = workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_1__.cacheNames.getPrecacheName(options.cacheName);
        super(options);
        this._fallbackToNetwork = options.fallbackToNetwork === false ? false : true;
        // Redirected responses cannot be used to satisfy a navigation request, so
        // any redirected response must be "copied" rather than cloned, so the new
        // response doesn't contain the `redirected` flag. See:
        // https://bugs.chromium.org/p/chromium/issues/detail?id=669363&desc=2#c1
        this.plugins.push(PrecacheStrategy.copyRedirectedCacheableResponsesPlugin);
    }
    /**
     * @private
     * @param {Request|string} request A request to run this strategy for.
     * @param {module:workbox-strategies.StrategyHandler} handler The event that
     *     triggered the request.
     * @return {Promise<Response>}
     */
    async _handle(request, handler) {
        const response = await handler.cacheMatch(request);
        if (!response) {
            // If this is an `install` event then populate the cache. If this is a
            // `fetch` event (or any other event) then respond with the cached
            // response.
            if (handler.event && handler.event.type === 'install') {
                return await this._handleInstall(request, handler);
            }
            return await this._handleFetch(request, handler);
        }
        return response;
    }
    async _handleFetch(request, handler) {
        let response;
        // Fall back to the network if we don't have a cached response
        // (perhaps due to manual cache cleanup).
        if (this._fallbackToNetwork) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.warn(`The precached response for ` +
                    `${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__.getFriendlyURL)(request.url)} in ${this.cacheName} was not ` +
                    `found. Falling back to the network instead.`);
            }
            response = await handler.fetch(request);
        }
        else {
            // This shouldn't normally happen, but there are edge cases:
            // https://github.com/GoogleChrome/workbox/issues/1441
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_4__.WorkboxError('missing-precache-entry', {
                cacheName: this.cacheName,
                url: request.url,
            });
        }
        if (true) {
            const cacheKey = handler.params && handler.params.cacheKey ||
                await handler.getCacheKey(request, 'read');
            // Workbox is going to handle the route.
            // print the routing details to the console.
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`Precaching is responding to: ` +
                (0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__.getFriendlyURL)(request.url));
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(`Serving the precached url: ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__.getFriendlyURL)(cacheKey.url)}`);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`View request details here.`);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(request);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`View response details here.`);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(response);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
        }
        return response;
    }
    async _handleInstall(request, handler) {
        this._useDefaultCacheabilityPluginIfNeeded();
        const response = await handler.fetch(request);
        // Make sure we defer cachePut() until after we know the response
        // should be cached; see https://github.com/GoogleChrome/workbox/issues/2737
        const wasCached = await handler.cachePut(request, response.clone());
        if (!wasCached) {
            // Throwing here will lead to the `install` handler failing, which
            // we want to do if *any* of the responses aren't safe to cache.
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_4__.WorkboxError('bad-precaching-response', {
                url: request.url,
                status: response.status,
            });
        }
        return response;
    }
    /**
     * This method is complex, as there a number of things to account for:
     *
     * The `plugins` array can be set at construction, and/or it might be added to
     * to at any time before the strategy is used.
     *
     * At the time the strategy is used (i.e. during an `install` event), there
     * needs to be at least one plugin that implements `cacheWillUpdate` in the
     * array, other than `copyRedirectedCacheableResponsesPlugin`.
     *
     * - If this method is called and there are no suitable `cacheWillUpdate`
     * plugins, we need to add `defaultPrecacheCacheabilityPlugin`.
     *
     * - If this method is called and there is exactly one `cacheWillUpdate`, then
     * we don't have to do anything (this might be a previously added
     * `defaultPrecacheCacheabilityPlugin`, or it might be a custom plugin).
     *
     * - If this method is called and there is more than one `cacheWillUpdate`,
     * then we need to check if one is `defaultPrecacheCacheabilityPlugin`. If so,
     * we need to remove it. (This situation is unlikely, but it could happen if
     * the strategy is used multiple times, the first without a `cacheWillUpdate`,
     * and then later on after manually adding a custom `cacheWillUpdate`.)
     *
     * See https://github.com/GoogleChrome/workbox/issues/2737 for more context.
     *
     * @private
     */
    _useDefaultCacheabilityPluginIfNeeded() {
        let defaultPluginIndex = null;
        let cacheWillUpdatePluginCount = 0;
        for (const [index, plugin] of this.plugins.entries()) {
            // Ignore the copy redirected plugin when determining what to do.
            if (plugin === PrecacheStrategy.copyRedirectedCacheableResponsesPlugin) {
                continue;
            }
            // Save the default plugin's index, in case it needs to be removed.
            if (plugin === PrecacheStrategy.defaultPrecacheCacheabilityPlugin) {
                defaultPluginIndex = index;
            }
            if (plugin.cacheWillUpdate) {
                cacheWillUpdatePluginCount++;
            }
        }
        if (cacheWillUpdatePluginCount === 0) {
            this.plugins.push(PrecacheStrategy.defaultPrecacheCacheabilityPlugin);
        }
        else if (cacheWillUpdatePluginCount > 1 && defaultPluginIndex !== null) {
            // Only remove the default plugin; multiple custom plugins are allowed.
            this.plugins.splice(defaultPluginIndex, 1);
        }
        // Nothing needs to be done if cacheWillUpdatePluginCount is 1
    }
}
PrecacheStrategy.defaultPrecacheCacheabilityPlugin = {
    async cacheWillUpdate({ response }) {
        if (!response || response.status >= 400) {
            return null;
        }
        return response;
    }
};
PrecacheStrategy.copyRedirectedCacheableResponsesPlugin = {
    async cacheWillUpdate({ response }) {
        return response.redirected ? await (0,workbox_core_copyResponse_js__WEBPACK_IMPORTED_MODULE_0__.copyResponse)(response) : response;
    }
};



/***/ }),

/***/ "./node_modules/workbox-precaching/_version.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-precaching/_version.js ***!
  \*****************************************************/
/***/ (() => {


// @ts-ignore
try {
    self['workbox:precaching:6.1.2'] && _();
}
catch (e) { }


/***/ }),

/***/ "./node_modules/workbox-precaching/addRoute.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-precaching/addRoute.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addRoute": () => (/* binding */ addRoute)
/* harmony export */ });
/* harmony import */ var workbox_routing_registerRoute_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-routing/registerRoute.js */ "./node_modules/workbox-routing/registerRoute.js");
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _PrecacheRoute_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PrecacheRoute.js */ "./node_modules/workbox-precaching/PrecacheRoute.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_3__);
/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/




/**
 * Add a `fetch` listener to the service worker that will
 * respond to
 * [network requests]{@link https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Custom_responses_to_requests}
 * with precached assets.
 *
 * Requests for assets that aren't precached, the `FetchEvent` will not be
 * responded to, allowing the event to fall through to other `fetch` event
 * listeners.
 *
 * @param {Object} [options] See
 * [PrecacheRoute options]{@link module:workbox-precaching.PrecacheRoute}.
 *
 * @memberof module:workbox-precaching
 */
function addRoute(options) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_1__.getOrCreatePrecacheController)();
    const precacheRoute = new _PrecacheRoute_js__WEBPACK_IMPORTED_MODULE_2__.PrecacheRoute(precacheController, options);
    (0,workbox_routing_registerRoute_js__WEBPACK_IMPORTED_MODULE_0__.registerRoute)(precacheRoute);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/createHandlerBoundToURL.js":
/*!********************************************************************!*\
  !*** ./node_modules/workbox-precaching/createHandlerBoundToURL.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createHandlerBoundToURL": () => (/* binding */ createHandlerBoundToURL)
/* harmony export */ });
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Helper function that calls
 * {@link PrecacheController#createHandlerBoundToURL} on the default
 * {@link PrecacheController} instance.
 *
 * If you are creating your own {@link PrecacheController}, then call the
 * {@link PrecacheController#createHandlerBoundToURL} on that instance,
 * instead of using this function.
 *
 * @param {string} url The precached URL which will be used to lookup the
 * `Response`.
 * @param {boolean} [fallbackToNetwork=true] Whether to attempt to get the
 * response from the network if there's a precache miss.
 * @return {module:workbox-routing~handlerCallback}
 *
 * @memberof module:workbox-precaching
 */
function createHandlerBoundToURL(url) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.getOrCreatePrecacheController)();
    return precacheController.createHandlerBoundToURL(url);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/precache.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-precaching/precache.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "precache": () => (/* binding */ precache)
/* harmony export */ });
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Adds items to the precache list, removing any duplicates and
 * stores the files in the
 * ["precache cache"]{@link module:workbox-core.cacheNames} when the service
 * worker installs.
 *
 * This method can be called multiple times.
 *
 * Please note: This method **will not** serve any of the cached files for you.
 * It only precaches files. To respond to a network request you call
 * [addRoute()]{@link module:workbox-precaching.addRoute}.
 *
 * If you have a single array of files to precache, you can just call
 * [precacheAndRoute()]{@link module:workbox-precaching.precacheAndRoute}.
 *
 * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
 *
 * @memberof module:workbox-precaching
 */
function precache(entries) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.getOrCreatePrecacheController)();
    precacheController.precache(entries);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/precacheAndRoute.js":
/*!*************************************************************!*\
  !*** ./node_modules/workbox-precaching/precacheAndRoute.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "precacheAndRoute": () => (/* binding */ precacheAndRoute)
/* harmony export */ });
/* harmony import */ var _addRoute_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addRoute.js */ "./node_modules/workbox-precaching/addRoute.js");
/* harmony import */ var _precache_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./precache.js */ "./node_modules/workbox-precaching/precache.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_2__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/



/**
 * This method will add entries to the precache list and add a route to
 * respond to fetch events.
 *
 * This is a convenience method that will call
 * [precache()]{@link module:workbox-precaching.precache} and
 * [addRoute()]{@link module:workbox-precaching.addRoute} in a single call.
 *
 * @param {Array<Object|string>} entries Array of entries to precache.
 * @param {Object} [options] See
 * [PrecacheRoute options]{@link module:workbox-precaching.PrecacheRoute}.
 *
 * @memberof module:workbox-precaching
 */
function precacheAndRoute(entries, options) {
    (0,_precache_js__WEBPACK_IMPORTED_MODULE_1__.precache)(entries);
    (0,_addRoute_js__WEBPACK_IMPORTED_MODULE_0__.addRoute)(options);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/utils/PrecacheCacheKeyPlugin.js":
/*!*************************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/PrecacheCacheKeyPlugin.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrecacheCacheKeyPlugin": () => (/* binding */ PrecacheCacheKeyPlugin)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A plugin, designed to be used with PrecacheController, to translate URLs into
 * the corresponding cache key, based on the current revision info.
 *
 * @private
 */
class PrecacheCacheKeyPlugin {
    constructor({ precacheController }) {
        this.cacheKeyWillBeUsed = async ({ request, params, }) => {
            const cacheKey = params && params.cacheKey ||
                this._precacheController.getCacheKeyForURL(request.url);
            return cacheKey ? new Request(cacheKey) : request;
        };
        this._precacheController = precacheController;
    }
}



/***/ }),

/***/ "./node_modules/workbox-precaching/utils/PrecacheInstallReportPlugin.js":
/*!******************************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/PrecacheInstallReportPlugin.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrecacheInstallReportPlugin": () => (/* binding */ PrecacheInstallReportPlugin)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A plugin, designed to be used with PrecacheController, to determine the
 * of assets that were updated (or not updated) during the install event.
 *
 * @private
 */
class PrecacheInstallReportPlugin {
    constructor() {
        this.updatedURLs = [];
        this.notUpdatedURLs = [];
        this.handlerWillStart = async ({ request, state, }) => {
            // TODO: `state` should never be undefined...
            if (state) {
                state.originalRequest = request;
            }
        };
        this.cachedResponseWillBeUsed = async ({ event, state, cachedResponse, }) => {
            if (event.type === 'install') {
                // TODO: `state` should never be undefined...
                const url = state.originalRequest.url;
                if (cachedResponse) {
                    this.notUpdatedURLs.push(url);
                }
                else {
                    this.updatedURLs.push(url);
                }
            }
            return cachedResponse;
        };
    }
}



/***/ }),

/***/ "./node_modules/workbox-precaching/utils/createCacheKey.js":
/*!*****************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/createCacheKey.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCacheKey": () => (/* binding */ createCacheKey)
/* harmony export */ });
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


// Name of the search parameter used to store revision info.
const REVISION_SEARCH_PARAM = '__WB_REVISION__';
/**
 * Converts a manifest entry into a versioned URL suitable for precaching.
 *
 * @param {Object|string} entry
 * @return {string} A URL with versioning info.
 *
 * @private
 * @memberof module:workbox-precaching
 */
function createCacheKey(entry) {
    if (!entry) {
        throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('add-to-cache-list-unexpected-type', { entry });
    }
    // If a precache manifest entry is a string, it's assumed to be a versioned
    // URL, like '/app.abcd1234.js'. Return as-is.
    if (typeof entry === 'string') {
        const urlObject = new URL(entry, location.href);
        return {
            cacheKey: urlObject.href,
            url: urlObject.href,
        };
    }
    const { revision, url } = entry;
    if (!url) {
        throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('add-to-cache-list-unexpected-type', { entry });
    }
    // If there's just a URL and no revision, then it's also assumed to be a
    // versioned URL.
    if (!revision) {
        const urlObject = new URL(url, location.href);
        return {
            cacheKey: urlObject.href,
            url: urlObject.href,
        };
    }
    // Otherwise, construct a properly versioned URL using the custom Workbox
    // search parameter along with the revision info.
    const cacheKeyURL = new URL(url, location.href);
    const originalURL = new URL(url, location.href);
    cacheKeyURL.searchParams.set(REVISION_SEARCH_PARAM, revision);
    return {
        cacheKey: cacheKeyURL.href,
        url: originalURL.href,
    };
}


/***/ }),

/***/ "./node_modules/workbox-precaching/utils/generateURLVariations.js":
/*!************************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/generateURLVariations.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateURLVariations": () => (/* binding */ generateURLVariations)
/* harmony export */ });
/* harmony import */ var _removeIgnoredSearchParams_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./removeIgnoredSearchParams.js */ "./node_modules/workbox-precaching/utils/removeIgnoredSearchParams.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Generator function that yields possible variations on the original URL to
 * check, one at a time.
 *
 * @param {string} url
 * @param {Object} options
 *
 * @private
 * @memberof module:workbox-precaching
 */
function* generateURLVariations(url, { ignoreURLParametersMatching = [/^utm_/, /^fbclid$/], directoryIndex = 'index.html', cleanURLs = true, urlManipulation, } = {}) {
    const urlObject = new URL(url, location.href);
    urlObject.hash = '';
    yield urlObject.href;
    const urlWithoutIgnoredParams = (0,_removeIgnoredSearchParams_js__WEBPACK_IMPORTED_MODULE_0__.removeIgnoredSearchParams)(urlObject, ignoreURLParametersMatching);
    yield urlWithoutIgnoredParams.href;
    if (directoryIndex && urlWithoutIgnoredParams.pathname.endsWith('/')) {
        const directoryURL = new URL(urlWithoutIgnoredParams.href);
        directoryURL.pathname += directoryIndex;
        yield directoryURL.href;
    }
    if (cleanURLs) {
        const cleanURL = new URL(urlWithoutIgnoredParams.href);
        cleanURL.pathname += '.html';
        yield cleanURL.href;
    }
    if (urlManipulation) {
        const additionalURLs = urlManipulation({ url: urlObject });
        for (const urlToAttempt of additionalURLs) {
            yield urlToAttempt.href;
        }
    }
}


/***/ }),

/***/ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js":
/*!********************************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getOrCreatePrecacheController": () => (/* binding */ getOrCreatePrecacheController)
/* harmony export */ });
/* harmony import */ var _PrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PrecacheController.js */ "./node_modules/workbox-precaching/PrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


let precacheController;
/**
 * @return {PrecacheController}
 * @private
 */
const getOrCreatePrecacheController = () => {
    if (!precacheController) {
        precacheController = new _PrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.PrecacheController();
    }
    return precacheController;
};


/***/ }),

/***/ "./node_modules/workbox-precaching/utils/printCleanupDetails.js":
/*!**********************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/printCleanupDetails.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "printCleanupDetails": () => (/* binding */ printCleanupDetails)
/* harmony export */ });
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * @param {string} groupTitle
 * @param {Array<string>} deletedURLs
 *
 * @private
 */
const logGroup = (groupTitle, deletedURLs) => {
    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupCollapsed(groupTitle);
    for (const url of deletedURLs) {
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log(url);
    }
    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupEnd();
};
/**
 * @param {Array<string>} deletedURLs
 *
 * @private
 * @memberof module:workbox-precaching
 */
function printCleanupDetails(deletedURLs) {
    const deletionCount = deletedURLs.length;
    if (deletionCount > 0) {
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupCollapsed(`During precaching cleanup, ` +
            `${deletionCount} cached ` +
            `request${deletionCount === 1 ? ' was' : 's were'} deleted.`);
        logGroup('Deleted Cache Requests', deletedURLs);
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupEnd();
    }
}


/***/ }),

/***/ "./node_modules/workbox-precaching/utils/printInstallDetails.js":
/*!**********************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/printInstallDetails.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "printInstallDetails": () => (/* binding */ printInstallDetails)
/* harmony export */ });
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * @param {string} groupTitle
 * @param {Array<string>} urls
 *
 * @private
 */
function _nestedGroup(groupTitle, urls) {
    if (urls.length === 0) {
        return;
    }
    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupCollapsed(groupTitle);
    for (const url of urls) {
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log(url);
    }
    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupEnd();
}
/**
 * @param {Array<string>} urlsToPrecache
 * @param {Array<string>} urlsAlreadyPrecached
 *
 * @private
 * @memberof module:workbox-precaching
 */
function printInstallDetails(urlsToPrecache, urlsAlreadyPrecached) {
    const precachedCount = urlsToPrecache.length;
    const alreadyPrecachedCount = urlsAlreadyPrecached.length;
    if (precachedCount || alreadyPrecachedCount) {
        let message = `Precaching ${precachedCount} file${precachedCount === 1 ? '' : 's'}.`;
        if (alreadyPrecachedCount > 0) {
            message += ` ${alreadyPrecachedCount} ` +
                `file${alreadyPrecachedCount === 1 ? ' is' : 's are'} already cached.`;
        }
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupCollapsed(message);
        _nestedGroup(`View newly precached URLs.`, urlsToPrecache);
        _nestedGroup(`View previously precached URLs.`, urlsAlreadyPrecached);
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupEnd();
    }
}


/***/ }),

/***/ "./node_modules/workbox-precaching/utils/removeIgnoredSearchParams.js":
/*!****************************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/removeIgnoredSearchParams.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeIgnoredSearchParams": () => (/* binding */ removeIgnoredSearchParams)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Removes any URL search parameters that should be ignored.
 *
 * @param {URL} urlObject The original URL.
 * @param {Array<RegExp>} ignoreURLParametersMatching RegExps to test against
 * each search parameter name. Matches mean that the search parameter should be
 * ignored.
 * @return {URL} The URL with any ignored search parameters removed.
 *
 * @private
 * @memberof module:workbox-precaching
 */
function removeIgnoredSearchParams(urlObject, ignoreURLParametersMatching = []) {
    // Convert the iterable into an array at the start of the loop to make sure
    // deletion doesn't mess up iteration.
    for (const paramName of [...urlObject.searchParams.keys()]) {
        if (ignoreURLParametersMatching.some((regExp) => regExp.test(paramName))) {
            urlObject.searchParams.delete(paramName);
        }
    }
    return urlObject;
}


/***/ }),

/***/ "./node_modules/workbox-routing/NavigationRoute.js":
/*!*********************************************************!*\
  !*** ./node_modules/workbox-routing/NavigationRoute.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavigationRoute": () => (/* binding */ NavigationRoute)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _Route_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Route.js */ "./node_modules/workbox-routing/Route.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_3__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/




/**
 * NavigationRoute makes it easy to create a
 * [Route]{@link module:workbox-routing.Route} that matches for browser
 * [navigation requests]{@link https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#first_what_are_navigation_requests}.
 *
 * It will only match incoming Requests whose
 * [`mode`]{@link https://fetch.spec.whatwg.org/#concept-request-mode}
 * is set to `navigate`.
 *
 * You can optionally only apply this route to a subset of navigation requests
 * by using one or both of the `denylist` and `allowlist` parameters.
 *
 * @memberof module:workbox-routing
 * @extends module:workbox-routing.Route
 */
class NavigationRoute extends _Route_js__WEBPACK_IMPORTED_MODULE_2__.Route {
    /**
     * If both `denylist` and `allowlist` are provided, the `denylist` will
     * take precedence and the request will not match this route.
     *
     * The regular expressions in `allowlist` and `denylist`
     * are matched against the concatenated
     * [`pathname`]{@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/pathname}
     * and [`search`]{@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/search}
     * portions of the requested URL.
     *
     * @param {module:workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resulting in a Response.
     * @param {Object} options
     * @param {Array<RegExp>} [options.denylist] If any of these patterns match,
     * the route will not handle the request (even if a allowlist RegExp matches).
     * @param {Array<RegExp>} [options.allowlist=[/./]] If any of these patterns
     * match the URL's pathname and search parameter, the route will handle the
     * request (assuming the denylist doesn't match).
     */
    constructor(handler, { allowlist = [/./], denylist = [] } = {}) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isArrayOfClass(allowlist, RegExp, {
                moduleName: 'workbox-routing',
                className: 'NavigationRoute',
                funcName: 'constructor',
                paramName: 'options.allowlist',
            });
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isArrayOfClass(denylist, RegExp, {
                moduleName: 'workbox-routing',
                className: 'NavigationRoute',
                funcName: 'constructor',
                paramName: 'options.denylist',
            });
        }
        super((options) => this._match(options), handler);
        this._allowlist = allowlist;
        this._denylist = denylist;
    }
    /**
     * Routes match handler.
     *
     * @param {Object} options
     * @param {URL} options.url
     * @param {Request} options.request
     * @return {boolean}
     *
     * @private
     */
    _match({ url, request }) {
        if (request && request.mode !== 'navigate') {
            return false;
        }
        const pathnameAndSearch = url.pathname + url.search;
        for (const regExp of this._denylist) {
            if (regExp.test(pathnameAndSearch)) {
                if (true) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__.logger.log(`The navigation route ${pathnameAndSearch} is not ` +
                        `being used, since the URL matches this denylist pattern: ` +
                        `${regExp}`);
                }
                return false;
            }
        }
        if (this._allowlist.some((regExp) => regExp.test(pathnameAndSearch))) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__.logger.debug(`The navigation route ${pathnameAndSearch} ` +
                    `is being used.`);
            }
            return true;
        }
        if (true) {
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__.logger.log(`The navigation route ${pathnameAndSearch} is not ` +
                `being used, since the URL being navigated to doesn't ` +
                `match the allowlist.`);
        }
        return false;
    }
}



/***/ }),

/***/ "./node_modules/workbox-routing/RegExpRoute.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-routing/RegExpRoute.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegExpRoute": () => (/* binding */ RegExpRoute)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _Route_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Route.js */ "./node_modules/workbox-routing/Route.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_3__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/




/**
 * RegExpRoute makes it easy to create a regular expression based
 * [Route]{@link module:workbox-routing.Route}.
 *
 * For same-origin requests the RegExp only needs to match part of the URL. For
 * requests against third-party servers, you must define a RegExp that matches
 * the start of the URL.
 *
 * [See the module docs for info.]{@link https://developers.google.com/web/tools/workbox/modules/workbox-routing}
 *
 * @memberof module:workbox-routing
 * @extends module:workbox-routing.Route
 */
class RegExpRoute extends _Route_js__WEBPACK_IMPORTED_MODULE_2__.Route {
    /**
     * If the regular expression contains
     * [capture groups]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references},
     * the captured values will be passed to the
     * [handler's]{@link module:workbox-routing~handlerCallback} `params`
     * argument.
     *
     * @param {RegExp} regExp The regular expression to match against URLs.
     * @param {module:workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resulting in a Response.
     * @param {string} [method='GET'] The HTTP method to match the Route
     * against.
     */
    constructor(regExp, handler, method) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isInstance(regExp, RegExp, {
                moduleName: 'workbox-routing',
                className: 'RegExpRoute',
                funcName: 'constructor',
                paramName: 'pattern',
            });
        }
        const match = ({ url }) => {
            const result = regExp.exec(url.href);
            // Return immediately if there's no match.
            if (!result) {
                return;
            }
            // Require that the match start at the first character in the URL string
            // if it's a cross-origin request.
            // See https://github.com/GoogleChrome/workbox/issues/281 for the context
            // behind this behavior.
            if ((url.origin !== location.origin) && (result.index !== 0)) {
                if (true) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__.logger.debug(`The regular expression '${regExp}' only partially matched ` +
                        `against the cross-origin URL '${url}'. RegExpRoute's will only ` +
                        `handle cross-origin requests if they match the entire URL.`);
                }
                return;
            }
            // If the route matches, but there aren't any capture groups defined, then
            // this will return [], which is truthy and therefore sufficient to
            // indicate a match.
            // If there are capture groups, then it will return their values.
            return result.slice(1);
        };
        super(match, handler, method);
    }
}



/***/ }),

/***/ "./node_modules/workbox-routing/Route.js":
/*!***********************************************!*\
  !*** ./node_modules/workbox-routing/Route.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Route": () => (/* binding */ Route)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/constants.js */ "./node_modules/workbox-routing/utils/constants.js");
/* harmony import */ var _utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/normalizeHandler.js */ "./node_modules/workbox-routing/utils/normalizeHandler.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_3__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/




/**
 * A `Route` consists of a pair of callback functions, "match" and "handler".
 * The "match" callback determine if a route should be used to "handle" a
 * request by returning a non-falsy value if it can. The "handler" callback
 * is called when there is a match and should return a Promise that resolves
 * to a `Response`.
 *
 * @memberof module:workbox-routing
 */
class Route {
    /**
     * Constructor for Route class.
     *
     * @param {module:workbox-routing~matchCallback} match
     * A callback function that determines whether the route matches a given
     * `fetch` event by returning a non-falsy value.
     * @param {module:workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resolving to a Response.
     * @param {string} [method='GET'] The HTTP method to match the Route
     * against.
     */
    constructor(match, handler, method = _utils_constants_js__WEBPACK_IMPORTED_MODULE_1__.defaultMethod) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(match, 'function', {
                moduleName: 'workbox-routing',
                className: 'Route',
                funcName: 'constructor',
                paramName: 'match',
            });
            if (method) {
                workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isOneOf(method, _utils_constants_js__WEBPACK_IMPORTED_MODULE_1__.validMethods, { paramName: 'method' });
            }
        }
        // These values are referenced directly by Router so cannot be
        // altered by minificaton.
        this.handler = (0,_utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_2__.normalizeHandler)(handler);
        this.match = match;
        this.method = method;
    }
    /**
     *
     * @param {module:workbox-routing-handlerCallback} handler A callback
     * function that returns a Promise resolving to a Response
     */
    setCatchHandler(handler) {
        this.catchHandler = (0,_utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_2__.normalizeHandler)(handler);
    }
}



/***/ }),

/***/ "./node_modules/workbox-routing/Router.js":
/*!************************************************!*\
  !*** ./node_modules/workbox-routing/Router.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Router": () => (/* binding */ Router)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/constants.js */ "./node_modules/workbox-routing/utils/constants.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/normalizeHandler.js */ "./node_modules/workbox-routing/utils/normalizeHandler.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_6__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/







/**
 * The Router can be used to process a FetchEvent through one or more
 * [Routes]{@link module:workbox-routing.Route} responding  with a Request if
 * a matching route exists.
 *
 * If no route matches a given a request, the Router will use a "default"
 * handler if one is defined.
 *
 * Should the matching Route throw an error, the Router will use a "catch"
 * handler if one is defined to gracefully deal with issues and respond with a
 * Request.
 *
 * If a request matches multiple routes, the **earliest** registered route will
 * be used to respond to the request.
 *
 * @memberof module:workbox-routing
 */
class Router {
    /**
     * Initializes a new Router.
     */
    constructor() {
        this._routes = new Map();
        this._defaultHandlerMap = new Map();
    }
    /**
     * @return {Map<string, Array<module:workbox-routing.Route>>} routes A `Map` of HTTP
     * method name ('GET', etc.) to an array of all the corresponding `Route`
     * instances that are registered.
     */
    get routes() {
        return this._routes;
    }
    /**
     * Adds a fetch event listener to respond to events when a route matches
     * the event's request.
     */
    addFetchListener() {
        // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
        self.addEventListener('fetch', ((event) => {
            const { request } = event;
            const responsePromise = this.handleRequest({ request, event });
            if (responsePromise) {
                event.respondWith(responsePromise);
            }
        }));
    }
    /**
     * Adds a message event listener for URLs to cache from the window.
     * This is useful to cache resources loaded on the page prior to when the
     * service worker started controlling it.
     *
     * The format of the message data sent from the window should be as follows.
     * Where the `urlsToCache` array may consist of URL strings or an array of
     * URL string + `requestInit` object (the same as you'd pass to `fetch()`).
     *
     * ```
     * {
     *   type: 'CACHE_URLS',
     *   payload: {
     *     urlsToCache: [
     *       './script1.js',
     *       './script2.js',
     *       ['./script3.js', {mode: 'no-cors'}],
     *     ],
     *   },
     * }
     * ```
     */
    addCacheListener() {
        // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
        self.addEventListener('message', ((event) => {
            if (event.data && event.data.type === 'CACHE_URLS') {
                const { payload } = event.data;
                if (true) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.debug(`Caching URLs from the window`, payload.urlsToCache);
                }
                const requestPromises = Promise.all(payload.urlsToCache.map((entry) => {
                    if (typeof entry === 'string') {
                        entry = [entry];
                    }
                    const request = new Request(...entry);
                    return this.handleRequest({ request, event });
                    // TODO(philipwalton): TypeScript errors without this typecast for
                    // some reason (probably a bug). The real type here should work but
                    // doesn't: `Array<Promise<Response> | undefined>`.
                })); // TypeScript
                event.waitUntil(requestPromises);
                // If a MessageChannel was used, reply to the message on success.
                if (event.ports && event.ports[0]) {
                    requestPromises.then(() => event.ports[0].postMessage(true));
                }
            }
        }));
    }
    /**
     * Apply the routing rules to a FetchEvent object to get a Response from an
     * appropriate Route's handler.
     *
     * @param {Object} options
     * @param {Request} options.request The request to handle.
     * @param {ExtendableEvent} options.event The event that triggered the
     *     request.
     * @return {Promise<Response>|undefined} A promise is returned if a
     *     registered route can handle the request. If there is no matching
     *     route and there's no `defaultHandler`, `undefined` is returned.
     */
    handleRequest({ request, event }) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isInstance(request, Request, {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'handleRequest',
                paramName: 'options.request',
            });
        }
        const url = new URL(request.url, location.href);
        if (!url.protocol.startsWith('http')) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.debug(`Workbox Router only supports URLs that start with 'http'.`);
            }
            return;
        }
        const sameOrigin = url.origin === location.origin;
        const { params, route } = this.findMatchingRoute({
            event,
            request,
            sameOrigin,
            url,
        });
        let handler = route && route.handler;
        const debugMessages = [];
        if (true) {
            if (handler) {
                debugMessages.push([
                    `Found a route to handle this request:`, route,
                ]);
                if (params) {
                    debugMessages.push([
                        `Passing the following params to the route's handler:`, params,
                    ]);
                }
            }
        }
        // If we don't have a handler because there was no matching route, then
        // fall back to defaultHandler if that's defined.
        const method = request.method;
        if (!handler && this._defaultHandlerMap.has(method)) {
            if (true) {
                debugMessages.push(`Failed to find a matching route. Falling ` +
                    `back to the default handler for ${method}.`);
            }
            handler = this._defaultHandlerMap.get(method);
        }
        if (!handler) {
            if (true) {
                // No handler so Workbox will do nothing. If logs is set of debug
                // i.e. verbose, we should print out this information.
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.debug(`No route found for: ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(url)}`);
            }
            return;
        }
        if (true) {
            // We have a handler, meaning Workbox is going to handle the route.
            // print the routing details to the console.
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`Router is responding to: ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(url)}`);
            debugMessages.forEach((msg) => {
                if (Array.isArray(msg)) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(...msg);
                }
                else {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(msg);
                }
            });
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
        }
        // Wrap in try and catch in case the handle method throws a synchronous
        // error. It should still callback to the catch handler.
        let responsePromise;
        try {
            responsePromise = handler.handle({ url, request, event, params });
        }
        catch (err) {
            responsePromise = Promise.reject(err);
        }
        // Get route's catch handler, if it exists
        const catchHandler = route && route.catchHandler;
        if (responsePromise instanceof Promise && (this._catchHandler || catchHandler)) {
            responsePromise = responsePromise.catch(async (err) => {
                // If there's a route catch handler, process that first
                if (catchHandler) {
                    if (true) {
                        // Still include URL here as it will be async from the console group
                        // and may not make sense without the URL
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`Error thrown when responding to: ` +
                            ` ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(url)}. Falling back to route's Catch Handler.`);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error(`Error thrown by:`, route);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error(err);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
                    }
                    try {
                        return await catchHandler.handle({ url, request, event, params });
                    }
                    catch (catchErr) {
                        err = catchErr;
                    }
                }
                if (this._catchHandler) {
                    if (true) {
                        // Still include URL here as it will be async from the console group
                        // and may not make sense without the URL
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`Error thrown when responding to: ` +
                            ` ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(url)}. Falling back to global Catch Handler.`);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error(`Error thrown by:`, route);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error(err);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
                    }
                    return this._catchHandler.handle({ url, request, event });
                }
                throw err;
            });
        }
        return responsePromise;
    }
    /**
     * Checks a request and URL (and optionally an event) against the list of
     * registered routes, and if there's a match, returns the corresponding
     * route along with any params generated by the match.
     *
     * @param {Object} options
     * @param {URL} options.url
     * @param {Request} options.request The request to match.
     * @param {Event} options.event The corresponding event.
     * @return {Object} An object with `route` and `params` properties.
     *     They are populated if a matching route was found or `undefined`
     *     otherwise.
     */
    findMatchingRoute({ url, sameOrigin, request, event }) {
        const routes = this._routes.get(request.method) || [];
        for (const route of routes) {
            let params;
            const matchResult = route.match({ url, sameOrigin, request, event });
            if (matchResult) {
                if (true) {
                    // Warn developers that using an async matchCallback is almost always
                    // not the right thing to do. 
                    if (matchResult instanceof Promise) {
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.warn(`While routing ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(url)}, an async ` +
                            `matchCallback function was used. Please convert the ` +
                            `following route to use a synchronous matchCallback function:`, route);
                    }
                }
                // See https://github.com/GoogleChrome/workbox/issues/2079
                params = matchResult;
                if (Array.isArray(matchResult) && matchResult.length === 0) {
                    // Instead of passing an empty array in as params, use undefined.
                    params = undefined;
                }
                else if ((matchResult.constructor === Object &&
                    Object.keys(matchResult).length === 0)) {
                    // Instead of passing an empty object in as params, use undefined.
                    params = undefined;
                }
                else if (typeof matchResult === 'boolean') {
                    // For the boolean value true (rather than just something truth-y),
                    // don't set params.
                    // See https://github.com/GoogleChrome/workbox/pull/2134#issuecomment-513924353
                    params = undefined;
                }
                // Return early if have a match.
                return { route, params };
            }
        }
        // If no match was found above, return and empty object.
        return {};
    }
    /**
     * Define a default `handler` that's called when no routes explicitly
     * match the incoming request.
     *
     * Each HTTP method ('GET', 'POST', etc.) gets its own default handler.
     *
     * Without a default handler, unmatched requests will go against the
     * network as if there were no service worker present.
     *
     * @param {module:workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resulting in a Response.
     * @param {string} [method='GET'] The HTTP method to associate with this
     * default handler. Each method has its own default.
     */
    setDefaultHandler(handler, method = _utils_constants_js__WEBPACK_IMPORTED_MODULE_2__.defaultMethod) {
        this._defaultHandlerMap.set(method, (0,_utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_4__.normalizeHandler)(handler));
    }
    /**
     * If a Route throws an error while handling a request, this `handler`
     * will be called and given a chance to provide a response.
     *
     * @param {module:workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resulting in a Response.
     */
    setCatchHandler(handler) {
        this._catchHandler = (0,_utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_4__.normalizeHandler)(handler);
    }
    /**
     * Registers a route with the router.
     *
     * @param {module:workbox-routing.Route} route The route to register.
     */
    registerRoute(route) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(route, 'object', {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'registerRoute',
                paramName: 'route',
            });
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.hasMethod(route, 'match', {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'registerRoute',
                paramName: 'route',
            });
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(route.handler, 'object', {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'registerRoute',
                paramName: 'route',
            });
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.hasMethod(route.handler, 'handle', {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'registerRoute',
                paramName: 'route.handler',
            });
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(route.method, 'string', {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'registerRoute',
                paramName: 'route.method',
            });
        }
        if (!this._routes.has(route.method)) {
            this._routes.set(route.method, []);
        }
        // Give precedence to all of the earlier routes by adding this additional
        // route to the end of the array.
        this._routes.get(route.method).push(route);
    }
    /**
     * Unregisters a route with the router.
     *
     * @param {module:workbox-routing.Route} route The route to unregister.
     */
    unregisterRoute(route) {
        if (!this._routes.has(route.method)) {
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_5__.WorkboxError('unregister-route-but-not-found-with-method', {
                method: route.method,
            });
        }
        const routeIndex = this._routes.get(route.method).indexOf(route);
        if (routeIndex > -1) {
            this._routes.get(route.method).splice(routeIndex, 1);
        }
        else {
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_5__.WorkboxError('unregister-route-route-not-registered');
        }
    }
}



/***/ }),

/***/ "./node_modules/workbox-routing/_version.js":
/*!**************************************************!*\
  !*** ./node_modules/workbox-routing/_version.js ***!
  \**************************************************/
/***/ (() => {


// @ts-ignore
try {
    self['workbox:routing:6.1.2'] && _();
}
catch (e) { }


/***/ }),

/***/ "./node_modules/workbox-routing/registerRoute.js":
/*!*******************************************************!*\
  !*** ./node_modules/workbox-routing/registerRoute.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "registerRoute": () => (/* binding */ registerRoute)
/* harmony export */ });
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _Route_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Route.js */ "./node_modules/workbox-routing/Route.js");
/* harmony import */ var _RegExpRoute_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RegExpRoute.js */ "./node_modules/workbox-routing/RegExpRoute.js");
/* harmony import */ var _utils_getOrCreateDefaultRouter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/getOrCreateDefaultRouter.js */ "./node_modules/workbox-routing/utils/getOrCreateDefaultRouter.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_5__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/






/**
 * Easily register a RegExp, string, or function with a caching
 * strategy to a singleton Router instance.
 *
 * This method will generate a Route for you if needed and
 * call [registerRoute()]{@link module:workbox-routing.Router#registerRoute}.
 *
 * @param {RegExp|string|module:workbox-routing.Route~matchCallback|module:workbox-routing.Route} capture
 * If the capture param is a `Route`, all other arguments will be ignored.
 * @param {module:workbox-routing~handlerCallback} [handler] A callback
 * function that returns a Promise resulting in a Response. This parameter
 * is required if `capture` is not a `Route` object.
 * @param {string} [method='GET'] The HTTP method to match the Route
 * against.
 * @return {module:workbox-routing.Route} The generated `Route`(Useful for
 * unregistering).
 *
 * @memberof module:workbox-routing
 */
function registerRoute(capture, handler, method) {
    let route;
    if (typeof capture === 'string') {
        const captureUrl = new URL(capture, location.href);
        if (true) {
            if (!(capture.startsWith('/') || capture.startsWith('http'))) {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__.WorkboxError('invalid-string', {
                    moduleName: 'workbox-routing',
                    funcName: 'registerRoute',
                    paramName: 'capture',
                });
            }
            // We want to check if Express-style wildcards are in the pathname only.
            // TODO: Remove this log message in v4.
            const valueToCheck = capture.startsWith('http') ?
                captureUrl.pathname : capture;
            // See https://github.com/pillarjs/path-to-regexp#parameters
            const wildcards = '[*:?+]';
            if ((new RegExp(`${wildcards}`)).exec(valueToCheck)) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug(`The '$capture' parameter contains an Express-style wildcard ` +
                    `character (${wildcards}). Strings are now always interpreted as ` +
                    `exact matches; use a RegExp for partial or wildcard matches.`);
            }
        }
        const matchCallback = ({ url }) => {
            if (true) {
                if ((url.pathname === captureUrl.pathname) &&
                    (url.origin !== captureUrl.origin)) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug(`${capture} only partially matches the cross-origin URL ` +
                        `${url}. This route will only handle cross-origin requests ` +
                        `if they match the entire URL.`);
                }
            }
            return url.href === captureUrl.href;
        };
        // If `capture` is a string then `handler` and `method` must be present.
        route = new _Route_js__WEBPACK_IMPORTED_MODULE_2__.Route(matchCallback, handler, method);
    }
    else if (capture instanceof RegExp) {
        // If `capture` is a `RegExp` then `handler` and `method` must be present.
        route = new _RegExpRoute_js__WEBPACK_IMPORTED_MODULE_3__.RegExpRoute(capture, handler, method);
    }
    else if (typeof capture === 'function') {
        // If `capture` is a function then `handler` and `method` must be present.
        route = new _Route_js__WEBPACK_IMPORTED_MODULE_2__.Route(capture, handler, method);
    }
    else if (capture instanceof _Route_js__WEBPACK_IMPORTED_MODULE_2__.Route) {
        route = capture;
    }
    else {
        throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__.WorkboxError('unsupported-route-type', {
            moduleName: 'workbox-routing',
            funcName: 'registerRoute',
            paramName: 'capture',
        });
    }
    const defaultRouter = (0,_utils_getOrCreateDefaultRouter_js__WEBPACK_IMPORTED_MODULE_4__.getOrCreateDefaultRouter)();
    defaultRouter.registerRoute(route);
    return route;
}



/***/ }),

/***/ "./node_modules/workbox-routing/utils/constants.js":
/*!*********************************************************!*\
  !*** ./node_modules/workbox-routing/utils/constants.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultMethod": () => (/* binding */ defaultMethod),
/* harmony export */   "validMethods": () => (/* binding */ validMethods)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * The default HTTP method, 'GET', used when there's no specific method
 * configured for a route.
 *
 * @type {string}
 *
 * @private
 */
const defaultMethod = 'GET';
/**
 * The list of valid HTTP methods associated with requests that could be routed.
 *
 * @type {Array<string>}
 *
 * @private
 */
const validMethods = [
    'DELETE',
    'GET',
    'HEAD',
    'PATCH',
    'POST',
    'PUT',
];


/***/ }),

/***/ "./node_modules/workbox-routing/utils/getOrCreateDefaultRouter.js":
/*!************************************************************************!*\
  !*** ./node_modules/workbox-routing/utils/getOrCreateDefaultRouter.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getOrCreateDefaultRouter": () => (/* binding */ getOrCreateDefaultRouter)
/* harmony export */ });
/* harmony import */ var _Router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Router.js */ "./node_modules/workbox-routing/Router.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


let defaultRouter;
/**
 * Creates a new, singleton Router instance if one does not exist. If one
 * does already exist, that instance is returned.
 *
 * @private
 * @return {Router}
 */
const getOrCreateDefaultRouter = () => {
    if (!defaultRouter) {
        defaultRouter = new _Router_js__WEBPACK_IMPORTED_MODULE_0__.Router();
        // The helpers that use the default Router assume these listeners exist.
        defaultRouter.addFetchListener();
        defaultRouter.addCacheListener();
    }
    return defaultRouter;
};


/***/ }),

/***/ "./node_modules/workbox-routing/utils/normalizeHandler.js":
/*!****************************************************************!*\
  !*** ./node_modules/workbox-routing/utils/normalizeHandler.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "normalizeHandler": () => (/* binding */ normalizeHandler)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * @param {function()|Object} handler Either a function, or an object with a
 * 'handle' method.
 * @return {Object} An object with a handle method.
 *
 * @private
 */
const normalizeHandler = (handler) => {
    if (handler && typeof handler === 'object') {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.hasMethod(handler, 'handle', {
                moduleName: 'workbox-routing',
                className: 'Route',
                funcName: 'constructor',
                paramName: 'handler',
            });
        }
        return handler;
    }
    else {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(handler, 'function', {
                moduleName: 'workbox-routing',
                className: 'Route',
                funcName: 'constructor',
                paramName: 'handler',
            });
        }
        return { handle: handler };
    }
};


/***/ }),

/***/ "./node_modules/workbox-strategies/CacheFirst.js":
/*!*******************************************************!*\
  !*** ./node_modules/workbox-strategies/CacheFirst.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CacheFirst": () => (/* binding */ CacheFirst)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _Strategy_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Strategy.js */ "./node_modules/workbox-strategies/Strategy.js");
/* harmony import */ var _utils_messages_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/messages.js */ "./node_modules/workbox-strategies/utils/messages.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-strategies/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_5__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/






/**
 * An implementation of a [cache-first]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network}
 * request strategy.
 *
 * A cache first strategy is useful for assets that have been revisioned,
 * such as URLs like `/styles/example.a8f5f1.css`, since they
 * can be cached for long periods of time.
 *
 * If the network request fails, and there is no cache match, this will throw
 * a `WorkboxError` exception.
 *
 * @extends module:workbox-strategies.Strategy
 * @memberof module:workbox-strategies
 */
class CacheFirst extends _Strategy_js__WEBPACK_IMPORTED_MODULE_3__.Strategy {
    /**
     * @private
     * @param {Request|string} request A request to run this strategy for.
     * @param {module:workbox-strategies.StrategyHandler} handler The event that
     *     triggered the request.
     * @return {Promise<Response>}
     */
    async _handle(request, handler) {
        const logs = [];
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isInstance(request, Request, {
                moduleName: 'workbox-strategies',
                className: this.constructor.name,
                funcName: 'makeRequest',
                paramName: 'request',
            });
        }
        let response = await handler.cacheMatch(request);
        let error;
        if (!response) {
            if (true) {
                logs.push(`No response found in the '${this.cacheName}' cache. ` +
                    `Will respond with a network request.`);
            }
            try {
                response = await handler.fetchAndCachePut(request);
            }
            catch (err) {
                error = err;
            }
            if (true) {
                if (response) {
                    logs.push(`Got response from network.`);
                }
                else {
                    logs.push(`Unable to get a response from the network.`);
                }
            }
        }
        else {
            if (true) {
                logs.push(`Found a cached response in the '${this.cacheName}' cache.`);
            }
        }
        if (true) {
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__.logger.groupCollapsed(_utils_messages_js__WEBPACK_IMPORTED_MODULE_4__.messages.strategyStart(this.constructor.name, request));
            for (const log of logs) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__.logger.log(log);
            }
            _utils_messages_js__WEBPACK_IMPORTED_MODULE_4__.messages.printFinalResponse(response);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__.logger.groupEnd();
        }
        if (!response) {
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_2__.WorkboxError('no-response', { url: request.url, error });
        }
        return response;
    }
}



/***/ }),

/***/ "./node_modules/workbox-strategies/Strategy.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-strategies/Strategy.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Strategy": () => (/* binding */ Strategy)
/* harmony export */ });
/* harmony import */ var workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/cacheNames.js */ "./node_modules/workbox-core/_private/cacheNames.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var _StrategyHandler_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StrategyHandler.js */ "./node_modules/workbox-strategies/StrategyHandler.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-strategies/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_5__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/






/**
 * An abstract base class that all other strategy classes must extend from:
 *
 * @memberof module:workbox-strategies
 */
class Strategy {
    /**
     * Creates a new instance of the strategy and sets all documented option
     * properties as public instance properties.
     *
     * Note: if a custom strategy class extends the base Strategy class and does
     * not need more than these properties, it does not need to define its own
     * constructor.
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] Cache name to store and retrieve
     * requests. Defaults to the cache names provided by
     * [workbox-core]{@link module:workbox-core.cacheNames}.
     * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
     * to use in conjunction with this caching strategy.
     * @param {Object} [options.fetchOptions] Values passed along to the
     * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
     * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
     * `fetch()` requests made by this strategy.
     * @param {Object} [options.matchOptions] The
     * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
     * for any `cache.match()` or `cache.put()` calls made by this strategy.
     */
    constructor(options = {}) {
        /**
         * Cache name to store and retrieve
         * requests. Defaults to the cache names provided by
         * [workbox-core]{@link module:workbox-core.cacheNames}.
         *
         * @type {string}
         */
        this.cacheName = workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_0__.cacheNames.getRuntimeName(options.cacheName);
        /**
         * The list
         * [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
         * used by this strategy.
         *
         * @type {Array<Object>}
         */
        this.plugins = options.plugins || [];
        /**
         * Values passed along to the
         * [`init`]{@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters}
         * of all fetch() requests made by this strategy.
         *
         * @type {Object}
         */
        this.fetchOptions = options.fetchOptions;
        /**
         * The
         * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
         * for any `cache.match()` or `cache.put()` calls made by this strategy.
         *
         * @type {Object}
         */
        this.matchOptions = options.matchOptions;
    }
    /**
     * Perform a request strategy and returns a `Promise` that will resolve with
     * a `Response`, invoking all relevant plugin callbacks.
     *
     * When a strategy instance is registered with a Workbox
     * [route]{@link module:workbox-routing.Route}, this method is automatically
     * called when the route matches.
     *
     * Alternatively, this method can be used in a standalone `FetchEvent`
     * listener by passing it to `event.respondWith()`.
     *
     * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
     *     properties listed below.
     * @param {Request|string} options.request A request to run this strategy for.
     * @param {ExtendableEvent} options.event The event associated with the
     *     request.
     * @param {URL} [options.url]
     * @param {*} [options.params]
     */
    handle(options) {
        const [responseDone] = this.handleAll(options);
        return responseDone;
    }
    /**
     * Similar to [`handle()`]{@link module:workbox-strategies.Strategy~handle}, but
     * instead of just returning a `Promise` that resolves to a `Response` it
     * it will return an tuple of [response, done] promises, where the former
     * (`response`) is equivalent to what `handle()` returns, and the latter is a
     * Promise that will resolve once any promises that were added to
     * `event.waitUntil()` as part of performing the strategy have completed.
     *
     * You can await the `done` promise to ensure any extra work performed by
     * the strategy (usually caching responses) completes successfully.
     *
     * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
     *     properties listed below.
     * @param {Request|string} options.request A request to run this strategy for.
     * @param {ExtendableEvent} options.event The event associated with the
     *     request.
     * @param {URL} [options.url]
     * @param {*} [options.params]
     * @return {Array<Promise>} A tuple of [response, done]
     *     promises that can be used to determine when the response resolves as
     *     well as when the handler has completed all its work.
     */
    handleAll(options) {
        // Allow for flexible options to be passed.
        if (options instanceof FetchEvent) {
            options = {
                event: options,
                request: options.request,
            };
        }
        const event = options.event;
        const request = typeof options.request === 'string' ?
            new Request(options.request) :
            options.request;
        const params = 'params' in options ? options.params : undefined;
        const handler = new _StrategyHandler_js__WEBPACK_IMPORTED_MODULE_4__.StrategyHandler(this, { event, request, params });
        const responseDone = this._getResponse(handler, request, event);
        const handlerDone = this._awaitComplete(responseDone, handler, request, event);
        // Return an array of promises, suitable for use with Promise.all().
        return [responseDone, handlerDone];
    }
    async _getResponse(handler, request, event) {
        await handler.runCallbacks('handlerWillStart', { event, request });
        let response = undefined;
        try {
            response = await this._handle(request, handler);
            // The "official" Strategy subclasses all throw this error automatically,
            // but in case a third-party Strategy doesn't, ensure that we have a
            // consistent failure when there's no response or an error response.
            if (!response || response.type === 'error') {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__.WorkboxError('no-response', { url: request.url });
            }
        }
        catch (error) {
            for (const callback of handler.iterateCallbacks('handlerDidError')) {
                response = await callback({ error, event, request });
                if (response) {
                    break;
                }
            }
            if (!response) {
                throw error;
            }
            else if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__.logger.log(`While responding to '${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_3__.getFriendlyURL)(request.url)}', ` +
                    `an ${error} error occurred. Using a fallback response provided by ` +
                    `a handlerDidError plugin.`);
            }
        }
        for (const callback of handler.iterateCallbacks('handlerWillRespond')) {
            response = await callback({ event, request, response });
        }
        return response;
    }
    async _awaitComplete(responseDone, handler, request, event) {
        let response;
        let error;
        try {
            response = await responseDone;
        }
        catch (error) {
            // Ignore errors, as response errors should be caught via the `response`
            // promise above. The `done` promise will only throw for errors in
            // promises passed to `handler.waitUntil()`.
        }
        try {
            await handler.runCallbacks('handlerDidRespond', {
                event,
                request,
                response,
            });
            await handler.doneWaiting();
        }
        catch (waitUntilError) {
            error = waitUntilError;
        }
        await handler.runCallbacks('handlerDidComplete', {
            event,
            request,
            response,
            error,
        });
        handler.destroy();
        if (error) {
            throw error;
        }
    }
}

/**
 * Classes extending the `Strategy` based class should implement this method,
 * and leverage the [`handler`]{@link module:workbox-strategies.StrategyHandler}
 * arg to perform all fetching and cache logic, which will ensure all relevant
 * cache, cache options, fetch options and plugins are used (per the current
 * strategy instance).
 *
 * @name _handle
 * @instance
 * @abstract
 * @function
 * @param {Request} request
 * @param {module:workbox-strategies.StrategyHandler} handler
 * @return {Promise<Response>}
 *
 * @memberof module:workbox-strategies.Strategy
 */


/***/ }),

/***/ "./node_modules/workbox-strategies/StrategyHandler.js":
/*!************************************************************!*\
  !*** ./node_modules/workbox-strategies/StrategyHandler.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StrategyHandler": () => (/* binding */ StrategyHandler)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_cacheMatchIgnoreParams_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/cacheMatchIgnoreParams.js */ "./node_modules/workbox-core/_private/cacheMatchIgnoreParams.js");
/* harmony import */ var workbox_core_private_Deferred_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core/_private/Deferred.js */ "./node_modules/workbox-core/_private/Deferred.js");
/* harmony import */ var workbox_core_private_executeQuotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/executeQuotaErrorCallbacks.js */ "./node_modules/workbox-core/_private/executeQuotaErrorCallbacks.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_timeout_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! workbox-core/_private/timeout.js */ "./node_modules/workbox-core/_private/timeout.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-strategies/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_8__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/









function toRequest(input) {
    return (typeof input === 'string') ? new Request(input) : input;
}
/**
 * A class created every time a Strategy instance instance calls
 * [handle()]{@link module:workbox-strategies.Strategy~handle} or
 * [handleAll()]{@link module:workbox-strategies.Strategy~handleAll} that wraps all fetch and
 * cache actions around plugin callbacks and keeps track of when the strategy
 * is "done" (i.e. all added `event.waitUntil()` promises have resolved).
 *
 * @memberof module:workbox-strategies
 */
class StrategyHandler {
    /**
     * Creates a new instance associated with the passed strategy and event
     * that's handling the request.
     *
     * The constructor also initializes the state that will be passed to each of
     * the plugins handling this request.
     *
     * @param {module:workbox-strategies.Strategy} strategy
     * @param {Object} options
     * @param {Request|string} options.request A request to run this strategy for.
     * @param {ExtendableEvent} options.event The event associated with the
     *     request.
     * @param {URL} [options.url]
     * @param {*} [options.params]
     *     [match callback]{@link module:workbox-routing~matchCallback},
     *     (if applicable).
     */
    constructor(strategy, options) {
        this._cacheKeys = {};
        /**
         * The request the strategy is performing (passed to the strategy's
         * `handle()` or `handleAll()` method).
         * @name request
         * @instance
         * @type {Request}
         * @memberof module:workbox-strategies.StrategyHandler
         */
        /**
         * The event associated with this request.
         * @name event
         * @instance
         * @type {ExtendableEvent}
         * @memberof module:workbox-strategies.StrategyHandler
         */
        /**
         * A `URL` instance of `request.url` (if passed to the strategy's
         * `handle()` or `handleAll()` method).
         * Note: the `url` param will be present if the strategy was invoked
         * from a workbox `Route` object.
         * @name url
         * @instance
         * @type {URL|undefined}
         * @memberof module:workbox-strategies.StrategyHandler
         */
        /**
         * A `param` value (if passed to the strategy's
         * `handle()` or `handleAll()` method).
         * Note: the `param` param will be present if the strategy was invoked
         * from a workbox `Route` object and the
         * [match callback]{@link module:workbox-routing~matchCallback} returned
         * a truthy value (it will be that value).
         * @name params
         * @instance
         * @type {*|undefined}
         * @memberof module:workbox-strategies.StrategyHandler
         */
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isInstance(options.event, ExtendableEvent, {
                moduleName: 'workbox-strategies',
                className: 'StrategyHandler',
                funcName: 'constructor',
                paramName: 'options.event',
            });
        }
        Object.assign(this, options);
        this.event = options.event;
        this._strategy = strategy;
        this._handlerDeferred = new workbox_core_private_Deferred_js__WEBPACK_IMPORTED_MODULE_2__.Deferred();
        this._extendLifetimePromises = [];
        // Copy the plugins list (since it's mutable on the strategy),
        // so any mutations don't affect this handler instance.
        this._plugins = [...strategy.plugins];
        this._pluginStateMap = new Map();
        for (const plugin of this._plugins) {
            this._pluginStateMap.set(plugin, {});
        }
        this.event.waitUntil(this._handlerDeferred.promise);
    }
    /**
     * Fetches a given request (and invokes any applicable plugin callback
     * methods) using the `fetchOptions` (for non-navigation requests) and
     * `plugins` defined on the `Strategy` object.
     *
     * The following plugin lifecycle methods are invoked when using this method:
     * - `requestWillFetch()`
     * - `fetchDidSucceed()`
     * - `fetchDidFail()`
     *
     * @param {Request|string} input The URL or request to fetch.
     * @return {Promise<Response>}
     */
    async fetch(input) {
        const { event } = this;
        let request = toRequest(input);
        if (request.mode === 'navigate' &&
            event instanceof FetchEvent &&
            event.preloadResponse) {
            const possiblePreloadResponse = await event.preloadResponse;
            if (possiblePreloadResponse) {
                if (true) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.log(`Using a preloaded navigation response for ` +
                        `'${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(request.url)}'`);
                }
                return possiblePreloadResponse;
            }
        }
        // If there is a fetchDidFail plugin, we need to save a clone of the
        // original request before it's either modified by a requestWillFetch
        // plugin or before the original request's body is consumed via fetch().
        const originalRequest = this.hasCallback('fetchDidFail') ?
            request.clone() : null;
        try {
            for (const cb of this.iterateCallbacks('requestWillFetch')) {
                request = await cb({ request: request.clone(), event });
            }
        }
        catch (err) {
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_7__.WorkboxError('plugin-error-request-will-fetch', {
                thrownError: err,
            });
        }
        // The request can be altered by plugins with `requestWillFetch` making
        // the original request (most likely from a `fetch` event) different
        // from the Request we make. Pass both to `fetchDidFail` to aid debugging.
        const pluginFilteredRequest = request.clone();
        try {
            let fetchResponse;
            // See https://github.com/GoogleChrome/workbox/issues/1796
            fetchResponse = await fetch(request, request.mode === 'navigate' ?
                undefined : this._strategy.fetchOptions);
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`Network request for ` +
                    `'${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(request.url)}' returned a response with ` +
                    `status '${fetchResponse.status}'.`);
            }
            for (const callback of this.iterateCallbacks('fetchDidSucceed')) {
                fetchResponse = await callback({
                    event,
                    request: pluginFilteredRequest,
                    response: fetchResponse,
                });
            }
            return fetchResponse;
        }
        catch (error) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.log(`Network request for ` +
                    `'${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(request.url)}' threw an error.`, error);
            }
            // `originalRequest` will only exist if a `fetchDidFail` callback
            // is being used (see above).
            if (originalRequest) {
                await this.runCallbacks('fetchDidFail', {
                    error,
                    event,
                    originalRequest: originalRequest.clone(),
                    request: pluginFilteredRequest.clone(),
                });
            }
            throw error;
        }
    }
    /**
     * Calls `this.fetch()` and (in the background) runs `this.cachePut()` on
     * the response generated by `this.fetch()`.
     *
     * The call to `this.cachePut()` automatically invokes `this.waitUntil()`,
     * so you do not have to manually call `waitUntil()` on the event.
     *
     * @param {Request|string} input The request or URL to fetch and cache.
     * @return {Promise<Response>}
     */
    async fetchAndCachePut(input) {
        const response = await this.fetch(input);
        const responseClone = response.clone();
        this.waitUntil(this.cachePut(input, responseClone));
        return response;
    }
    /**
     * Matches a request from the cache (and invokes any applicable plugin
     * callback methods) using the `cacheName`, `matchOptions`, and `plugins`
     * defined on the strategy object.
     *
     * The following plugin lifecycle methods are invoked when using this method:
     * - cacheKeyWillByUsed()
     * - cachedResponseWillByUsed()
     *
     * @param {Request|string} key The Request or URL to use as the cache key.
     * @return {Promise<Response|undefined>} A matching response, if found.
     */
    async cacheMatch(key) {
        const request = toRequest(key);
        let cachedResponse;
        const { cacheName, matchOptions } = this._strategy;
        const effectiveRequest = await this.getCacheKey(request, 'read');
        const multiMatchOptions = { ...matchOptions, ...{ cacheName } };
        cachedResponse = await caches.match(effectiveRequest, multiMatchOptions);
        if (true) {
            if (cachedResponse) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`Found a cached response in '${cacheName}'.`);
            }
            else {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`No cached response found in '${cacheName}'.`);
            }
        }
        for (const callback of this.iterateCallbacks('cachedResponseWillBeUsed')) {
            cachedResponse = (await callback({
                cacheName,
                matchOptions,
                cachedResponse,
                request: effectiveRequest,
                event: this.event,
            })) || undefined;
        }
        return cachedResponse;
    }
    /**
     * Puts a request/response pair in the cache (and invokes any applicable
     * plugin callback methods) using the `cacheName` and `plugins` defined on
     * the strategy object.
     *
     * The following plugin lifecycle methods are invoked when using this method:
     * - cacheKeyWillByUsed()
     * - cacheWillUpdate()
     * - cacheDidUpdate()
     *
     * @param {Request|string} key The request or URL to use as the cache key.
     * @param {Response} response The response to cache.
     * @return {Promise<boolean>} `false` if a cacheWillUpdate caused the response
     * not be cached, and `true` otherwise.
     */
    async cachePut(key, response) {
        const request = toRequest(key);
        // Run in the next task to avoid blocking other cache reads.
        // https://github.com/w3c/ServiceWorker/issues/1397
        await (0,workbox_core_private_timeout_js__WEBPACK_IMPORTED_MODULE_6__.timeout)(0);
        const effectiveRequest = await this.getCacheKey(request, 'write');
        if (true) {
            if (effectiveRequest.method && effectiveRequest.method !== 'GET') {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_7__.WorkboxError('attempt-to-cache-non-get-request', {
                    url: (0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url),
                    method: effectiveRequest.method,
                });
            }
        }
        if (!response) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.error(`Cannot cache non-existent response for ` +
                    `'${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url)}'.`);
            }
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_7__.WorkboxError('cache-put-with-no-response', {
                url: (0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url),
            });
        }
        const responseToCache = await this._ensureResponseSafeToCache(response);
        if (!responseToCache) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`Response '${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url)}' ` +
                    `will not be cached.`, responseToCache);
            }
            return false;
        }
        const { cacheName, matchOptions } = this._strategy;
        const cache = await self.caches.open(cacheName);
        const hasCacheUpdateCallback = this.hasCallback('cacheDidUpdate');
        const oldResponse = hasCacheUpdateCallback ? await (0,workbox_core_private_cacheMatchIgnoreParams_js__WEBPACK_IMPORTED_MODULE_1__.cacheMatchIgnoreParams)(
        // TODO(philipwalton): the `__WB_REVISION__` param is a precaching
        // feature. Consider into ways to only add this behavior if using
        // precaching.
        cache, effectiveRequest.clone(), ['__WB_REVISION__'], matchOptions) :
            null;
        if (true) {
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`Updating the '${cacheName}' cache with a new Response ` +
                `for ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url)}.`);
        }
        try {
            await cache.put(effectiveRequest, hasCacheUpdateCallback ?
                responseToCache.clone() : responseToCache);
        }
        catch (error) {
            // See https://developer.mozilla.org/en-US/docs/Web/API/DOMException#exception-QuotaExceededError
            if (error.name === 'QuotaExceededError') {
                await (0,workbox_core_private_executeQuotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_3__.executeQuotaErrorCallbacks)();
            }
            throw error;
        }
        for (const callback of this.iterateCallbacks('cacheDidUpdate')) {
            await callback({
                cacheName,
                oldResponse,
                newResponse: responseToCache.clone(),
                request: effectiveRequest,
                event: this.event,
            });
        }
        return true;
    }
    /**
     * Checks the list of plugins for the `cacheKeyWillBeUsed` callback, and
     * executes any of those callbacks found in sequence. The final `Request`
     * object returned by the last plugin is treated as the cache key for cache
     * reads and/or writes. If no `cacheKeyWillBeUsed` plugin callbacks have
     * been registered, the passed request is returned unmodified
     *
     * @param {Request} request
     * @param {string} mode
     * @return {Promise<Request>}
     */
    async getCacheKey(request, mode) {
        if (!this._cacheKeys[mode]) {
            let effectiveRequest = request;
            for (const callback of this.iterateCallbacks('cacheKeyWillBeUsed')) {
                effectiveRequest = toRequest(await callback({
                    mode,
                    request: effectiveRequest,
                    event: this.event,
                    params: this.params,
                }));
            }
            this._cacheKeys[mode] = effectiveRequest;
        }
        return this._cacheKeys[mode];
    }
    /**
     * Returns true if the strategy has at least one plugin with the given
     * callback.
     *
     * @param {string} name The name of the callback to check for.
     * @return {boolean}
     */
    hasCallback(name) {
        for (const plugin of this._strategy.plugins) {
            if (name in plugin) {
                return true;
            }
        }
        return false;
    }
    /**
     * Runs all plugin callbacks matching the given name, in order, passing the
     * given param object (merged ith the current plugin state) as the only
     * argument.
     *
     * Note: since this method runs all plugins, it's not suitable for cases
     * where the return value of a callback needs to be applied prior to calling
     * the next callback. See
     * [`iterateCallbacks()`]{@link module:workbox-strategies.StrategyHandler#iterateCallbacks}
     * below for how to handle that case.
     *
     * @param {string} name The name of the callback to run within each plugin.
     * @param {Object} param The object to pass as the first (and only) param
     *     when executing each callback. This object will be merged with the
     *     current plugin state prior to callback execution.
     */
    async runCallbacks(name, param) {
        for (const callback of this.iterateCallbacks(name)) {
            // TODO(philipwalton): not sure why `any` is needed. It seems like
            // this should work with `as WorkboxPluginCallbackParam[C]`.
            await callback(param);
        }
    }
    /**
     * Accepts a callback and returns an iterable of matching plugin callbacks,
     * where each callback is wrapped with the current handler state (i.e. when
     * you call each callback, whatever object parameter you pass it will
     * be merged with the plugin's current state).
     *
     * @param {string} name The name fo the callback to run
     * @return {Array<Function>}
     */
    *iterateCallbacks(name) {
        for (const plugin of this._strategy.plugins) {
            if (typeof plugin[name] === 'function') {
                const state = this._pluginStateMap.get(plugin);
                const statefulCallback = (param) => {
                    const statefulParam = { ...param, state };
                    // TODO(philipwalton): not sure why `any` is needed. It seems like
                    // this should work with `as WorkboxPluginCallbackParam[C]`.
                    return plugin[name](statefulParam);
                };
                yield statefulCallback;
            }
        }
    }
    /**
     * Adds a promise to the
     * [extend lifetime promises]{@link https://w3c.github.io/ServiceWorker/#extendableevent-extend-lifetime-promises}
     * of the event event associated with the request being handled (usually a
     * `FetchEvent`).
     *
     * Note: you can await
     * [`doneWaiting()`]{@link module:workbox-strategies.StrategyHandler~doneWaiting}
     * to know when all added promises have settled.
     *
     * @param {Promise} promise A promise to add to the extend lifetime promises
     *     of the event that triggered the request.
     */
    waitUntil(promise) {
        this._extendLifetimePromises.push(promise);
        return promise;
    }
    /**
     * Returns a promise that resolves once all promises passed to
     * [`waitUntil()`]{@link module:workbox-strategies.StrategyHandler~waitUntil}
     * have settled.
     *
     * Note: any work done after `doneWaiting()` settles should be manually
     * passed to an event's `waitUntil()` method (not this handler's
     * `waitUntil()` method), otherwise the service worker thread my be killed
     * prior to your work completing.
     */
    async doneWaiting() {
        let promise;
        while (promise = this._extendLifetimePromises.shift()) {
            await promise;
        }
    }
    /**
     * Stops running the strategy and immediately resolves any pending
     * `waitUntil()` promises.
     */
    destroy() {
        this._handlerDeferred.resolve();
    }
    /**
     * This method will call cacheWillUpdate on the available plugins (or use
     * status === 200) to determine if the Response is safe and valid to cache.
     *
     * @param {Request} options.request
     * @param {Response} options.response
     * @return {Promise<Response|undefined>}
     *
     * @private
     */
    async _ensureResponseSafeToCache(response) {
        let responseToCache = response;
        let pluginsUsed = false;
        for (const callback of this.iterateCallbacks('cacheWillUpdate')) {
            responseToCache = (await callback({
                request: this.request,
                response: responseToCache,
                event: this.event,
            })) || undefined;
            pluginsUsed = true;
            if (!responseToCache) {
                break;
            }
        }
        if (!pluginsUsed) {
            if (responseToCache && responseToCache.status !== 200) {
                responseToCache = undefined;
            }
            if (true) {
                if (responseToCache) {
                    if (responseToCache.status !== 200) {
                        if (responseToCache.status === 0) {
                            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.warn(`The response for '${this.request.url}' ` +
                                `is an opaque response. The caching strategy that you're ` +
                                `using will not cache opaque responses by default.`);
                        }
                        else {
                            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`The response for '${this.request.url}' ` +
                                `returned a status code of '${response.status}' and won't ` +
                                `be cached as a result.`);
                        }
                    }
                }
            }
        }
        return responseToCache;
    }
}



/***/ }),

/***/ "./node_modules/workbox-strategies/_version.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-strategies/_version.js ***!
  \*****************************************************/
/***/ (() => {


// @ts-ignore
try {
    self['workbox:strategies:6.1.2'] && _();
}
catch (e) { }


/***/ }),

/***/ "./node_modules/workbox-strategies/utils/messages.js":
/*!***********************************************************!*\
  !*** ./node_modules/workbox-strategies/utils/messages.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "messages": () => (/* binding */ messages)
/* harmony export */ });
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-strategies/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_2__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/



const messages = {
    strategyStart: (strategyName, request) => `Using ${strategyName} to respond to '${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(request.url)}'`,
    printFinalResponse: (response) => {
        if (response) {
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupCollapsed(`View the final response here.`);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log(response || '[No response returned]');
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupEnd();
        }
    },
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/www/src-sw.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var workbox_cacheable_response_CacheableResponsePlugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-cacheable-response/CacheableResponsePlugin */ "./node_modules/workbox-cacheable-response/CacheableResponsePlugin.js");
/* harmony import */ var workbox_strategies_CacheFirst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-strategies/CacheFirst */ "./node_modules/workbox-strategies/CacheFirst.js");
/* harmony import */ var workbox_precaching_createHandlerBoundToURL__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-precaching/createHandlerBoundToURL */ "./node_modules/workbox-precaching/createHandlerBoundToURL.js");
/* harmony import */ var workbox_expiration_ExpirationPlugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-expiration/ExpirationPlugin */ "./node_modules/workbox-expiration/ExpirationPlugin.js");
/* harmony import */ var workbox_routing_NavigationRoute__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! workbox-routing/NavigationRoute */ "./node_modules/workbox-routing/NavigationRoute.js");
/* harmony import */ var workbox_precaching_precacheAndRoute__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! workbox-precaching/precacheAndRoute */ "./node_modules/workbox-precaching/precacheAndRoute.js");
/* harmony import */ var workbox_routing_registerRoute__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! workbox-routing/registerRoute */ "./node_modules/workbox-routing/registerRoute.js");
// src/www/src-sw.js
// Add any other logic here as needed.







self.__WB_DISABLE_DEV_LOGS = true;
const caching = [{'revision':'88a860d4b12f1ab463cf7cb51a1166f3','url':'bundle.js'},{'revision':'8221dfb6a367ec8cb84eb9aabe421ba6','url':'fav/browserconfig.xml'},{'revision':'5b36cc7c4a4675217450c1248f03379a','url':'fav/favicon-114.png'},{'revision':'f75c241d977ed3bfdb116ec1007cd770','url':'fav/favicon-120.png'},{'revision':'765e3c4d58a19057518d16c6786dbe25','url':'fav/favicon-144.png'},{'revision':'52f4dcbbb528e99ddbdda35115be4553','url':'fav/favicon-150.png'},{'revision':'dc55f27be4074dbabbddc6ee3dd9e9d0','url':'fav/favicon-152.png'},{'revision':'f5279fdcffedf968df258088f064d168','url':'fav/favicon-16.png'},{'revision':'ff918ce1963e2b24e849322fc41ff221','url':'fav/favicon-160.png'},{'revision':'2fb99dea1e96ef01b74a367192dbdd1e','url':'fav/favicon-180.png'},{'revision':'b858d60501458c41bdc373825c497ce4','url':'fav/favicon-192.png'},{'revision':'449c64c00a42969c75076ca93fb94496','url':'fav/favicon-310.png'},{'revision':'6a9eaf7313798370e9246174152da72b','url':'fav/favicon-32.png'},{'revision':'e0d050c15a6c2f9c912bf1b133bf816d','url':'fav/favicon-57.png'},{'revision':'5da2a8d4c6700229b82ebda37e2a7959','url':'fav/favicon-60.png'},{'revision':'e274228acc9e90bb1299288725556c63','url':'fav/favicon-64.png'},{'revision':'87ffd286549f0c35c9f3ff452d8a841b','url':'fav/favicon-70.png'},{'revision':'b1d702da34ded16efe6e227ea26a9b9e','url':'fav/favicon-72.png'},{'revision':'b2ebf7f594b55bd09cf4ad6703e66071','url':'fav/favicon-76.png'},{'revision':'a03de3c7d26d90e40d6f5ce95181a1da','url':'fav/favicon-96.png'},{'revision':'53da0fd17ce4662d33ce5c2bb81b678f','url':'fav/favicon.ico'},{'revision':'1c4a2b42e0c9424538819dcf5a364142','url':'fav/faviconit-instructions.txt'},{'revision':'73951d8fb7b813f09d4fd1bd7f3401b0','url':'img/Crowdshot.jpg'},{'revision':'6b3b6bb8757dad5ed6739eb3b2962096','url':'img/has-access.svg'},{'revision':'b415ef89d2fdded33db5ba18e2f6b7b0','url':'img/insignia lighter 512x512.png'},{'revision':'6f1eb45a015f54ca60c5f277c2356485','url':'img/live-access.svg'},{'revision':'12f539c4af6b36212364d6c802b92d49','url':'img/symbol-defs.svg'},{'revision':'84dfe249305dd214053892d289c2df43','url':'index.html'},{'revision':'b87c618d29c446f3c62bccfafa3e2489','url':'main.css'},{'revision':'f13eb5f8bf3a76504ef865144c7599c8','url':'manifest.json'},{'revision':'d41d8cd98f00b204e9800998ecf8427e','url':'robots.txt'}]; //console.log("caching stuff", caching)

(0,workbox_precaching_precacheAndRoute__WEBPACK_IMPORTED_MODULE_5__.precacheAndRoute)(caching);
(0,workbox_routing_registerRoute__WEBPACK_IMPORTED_MODULE_6__.registerRoute)(new workbox_routing_NavigationRoute__WEBPACK_IMPORTED_MODULE_4__.NavigationRoute((0,workbox_precaching_createHandlerBoundToURL__WEBPACK_IMPORTED_MODULE_2__.createHandlerBoundToURL)("/index.html"), {
  blacklist: [/\/activate\b/]
}));
(0,workbox_routing_registerRoute__WEBPACK_IMPORTED_MODULE_6__.registerRoute)(/\/api\/.*/, new workbox_strategies_CacheFirst__WEBPACK_IMPORTED_MODULE_1__.CacheFirst({
  cacheName: "short-cache",
  matchOptions: {
    ignoreVary: true
  },
  plugins: [new workbox_expiration_ExpirationPlugin__WEBPACK_IMPORTED_MODULE_3__.ExpirationPlugin({
    maxEntries: 500,
    maxAgeSeconds: 300,
    purgeOnQuotaError: true
  }), new workbox_cacheable_response_CacheableResponsePlugin__WEBPACK_IMPORTED_MODULE_0__.CacheableResponsePlugin({
    statuses: [0, 200]
  })]
}));
self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
self.addEventListener("install", event => {
  //console.log("[Service Worker] Installing Service Worker ...", event)
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", event => {
  //console.log("[Service Worker] Activating Service Worker ...", event)
  return self.clients.claim();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mZXN0aWdyYW0vLi9ub2RlX21vZHVsZXMvd29ya2JveC1jYWNoZWFibGUtcmVzcG9uc2UvQ2FjaGVhYmxlUmVzcG9uc2UuanMiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtLy4vbm9kZV9tb2R1bGVzL3dvcmtib3gtY2FjaGVhYmxlLXJlc3BvbnNlL0NhY2hlYWJsZVJlc3BvbnNlUGx1Z2luLmpzIiwid2VicGFjazovL2Zlc3RpZ3JhbS8uL25vZGVfbW9kdWxlcy93b3JrYm94LWNhY2hlYWJsZS1yZXNwb25zZS9fdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL19wcml2YXRlL0RCV3JhcHBlci5qcyIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL19wcml2YXRlL0RlZmVycmVkLmpzIiwid2VicGFjazovL2Zlc3RpZ3JhbS8uL25vZGVfbW9kdWxlcy93b3JrYm94LWNvcmUvX3ByaXZhdGUvV29ya2JveEVycm9yLmpzIiwid2VicGFjazovL2Zlc3RpZ3JhbS8uL25vZGVfbW9kdWxlcy93b3JrYm94LWNvcmUvX3ByaXZhdGUvYXNzZXJ0LmpzIiwid2VicGFjazovL2Zlc3RpZ3JhbS8uL25vZGVfbW9kdWxlcy93b3JrYm94LWNvcmUvX3ByaXZhdGUvY2FjaGVNYXRjaElnbm9yZVBhcmFtcy5qcyIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL19wcml2YXRlL2NhY2hlTmFtZXMuanMiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtLy4vbm9kZV9tb2R1bGVzL3dvcmtib3gtY29yZS9fcHJpdmF0ZS9jYW5Db25zdHJ1Y3RSZXNwb25zZUZyb21Cb2R5U3RyZWFtLmpzIiwid2VicGFjazovL2Zlc3RpZ3JhbS8uL25vZGVfbW9kdWxlcy93b3JrYm94LWNvcmUvX3ByaXZhdGUvZGVsZXRlRGF0YWJhc2UuanMiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtLy4vbm9kZV9tb2R1bGVzL3dvcmtib3gtY29yZS9fcHJpdmF0ZS9kb250V2FpdEZvci5qcyIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL19wcml2YXRlL2V4ZWN1dGVRdW90YUVycm9yQ2FsbGJhY2tzLmpzIiwid2VicGFjazovL2Zlc3RpZ3JhbS8uL25vZGVfbW9kdWxlcy93b3JrYm94LWNvcmUvX3ByaXZhdGUvZ2V0RnJpZW5kbHlVUkwuanMiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtLy4vbm9kZV9tb2R1bGVzL3dvcmtib3gtY29yZS9fcHJpdmF0ZS9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtLy4vbm9kZV9tb2R1bGVzL3dvcmtib3gtY29yZS9fcHJpdmF0ZS90aW1lb3V0LmpzIiwid2VicGFjazovL2Zlc3RpZ3JhbS8uL25vZGVfbW9kdWxlcy93b3JrYm94LWNvcmUvX3ByaXZhdGUvd2FpdFVudGlsLmpzIiwid2VicGFjazovL2Zlc3RpZ3JhbS8uL25vZGVfbW9kdWxlcy93b3JrYm94LWNvcmUvX3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtLy4vbm9kZV9tb2R1bGVzL3dvcmtib3gtY29yZS9jb3B5UmVzcG9uc2UuanMiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtLy4vbm9kZV9tb2R1bGVzL3dvcmtib3gtY29yZS9tb2RlbHMvbWVzc2FnZXMvbWVzc2FnZUdlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL21vZGVscy9tZXNzYWdlcy9tZXNzYWdlcy5qcyIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL21vZGVscy9xdW90YUVycm9yQ2FsbGJhY2tzLmpzIiwid2VicGFjazovL2Zlc3RpZ3JhbS8uL25vZGVfbW9kdWxlcy93b3JrYm94LWNvcmUvcmVnaXN0ZXJRdW90YUVycm9yQ2FsbGJhY2suanMiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtLy4vbm9kZV9tb2R1bGVzL3dvcmtib3gtZXhwaXJhdGlvbi9DYWNoZUV4cGlyYXRpb24uanMiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtLy4vbm9kZV9tb2R1bGVzL3dvcmtib3gtZXhwaXJhdGlvbi9FeHBpcmF0aW9uUGx1Z2luLmpzIiwid2VicGFjazovL2Zlc3RpZ3JhbS8uL25vZGVfbW9kdWxlcy93b3JrYm94LWV4cGlyYXRpb24vX3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtLy4vbm9kZV9tb2R1bGVzL3dvcmtib3gtZXhwaXJhdGlvbi9tb2RlbHMvQ2FjaGVUaW1lc3RhbXBzTW9kZWwuanMiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtLy4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcHJlY2FjaGluZy9QcmVjYWNoZUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtLy4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcHJlY2FjaGluZy9QcmVjYWNoZVJvdXRlLmpzIiwid2VicGFjazovL2Zlc3RpZ3JhbS8uL25vZGVfbW9kdWxlcy93b3JrYm94LXByZWNhY2hpbmcvUHJlY2FjaGVTdHJhdGVneS5qcyIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vLi9ub2RlX21vZHVsZXMvd29ya2JveC1wcmVjYWNoaW5nL192ZXJzaW9uLmpzIiwid2VicGFjazovL2Zlc3RpZ3JhbS8uL25vZGVfbW9kdWxlcy93b3JrYm94LXByZWNhY2hpbmcvYWRkUm91dGUuanMiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtLy4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcHJlY2FjaGluZy9jcmVhdGVIYW5kbGVyQm91bmRUb1VSTC5qcyIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vLi9ub2RlX21vZHVsZXMvd29ya2JveC1wcmVjYWNoaW5nL3ByZWNhY2hlLmpzIiwid2VicGFjazovL2Zlc3RpZ3JhbS8uL25vZGVfbW9kdWxlcy93b3JrYm94LXByZWNhY2hpbmcvcHJlY2FjaGVBbmRSb3V0ZS5qcyIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vLi9ub2RlX21vZHVsZXMvd29ya2JveC1wcmVjYWNoaW5nL3V0aWxzL1ByZWNhY2hlQ2FjaGVLZXlQbHVnaW4uanMiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtLy4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcHJlY2FjaGluZy91dGlscy9QcmVjYWNoZUluc3RhbGxSZXBvcnRQbHVnaW4uanMiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtLy4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcHJlY2FjaGluZy91dGlscy9jcmVhdGVDYWNoZUtleS5qcyIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vLi9ub2RlX21vZHVsZXMvd29ya2JveC1wcmVjYWNoaW5nL3V0aWxzL2dlbmVyYXRlVVJMVmFyaWF0aW9ucy5qcyIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vLi9ub2RlX21vZHVsZXMvd29ya2JveC1wcmVjYWNoaW5nL3V0aWxzL2dldE9yQ3JlYXRlUHJlY2FjaGVDb250cm9sbGVyLmpzIiwid2VicGFjazovL2Zlc3RpZ3JhbS8uL25vZGVfbW9kdWxlcy93b3JrYm94LXByZWNhY2hpbmcvdXRpbHMvcHJpbnRDbGVhbnVwRGV0YWlscy5qcyIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vLi9ub2RlX21vZHVsZXMvd29ya2JveC1wcmVjYWNoaW5nL3V0aWxzL3ByaW50SW5zdGFsbERldGFpbHMuanMiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtLy4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcHJlY2FjaGluZy91dGlscy9yZW1vdmVJZ25vcmVkU2VhcmNoUGFyYW1zLmpzIiwid2VicGFjazovL2Zlc3RpZ3JhbS8uL25vZGVfbW9kdWxlcy93b3JrYm94LXJvdXRpbmcvTmF2aWdhdGlvblJvdXRlLmpzIiwid2VicGFjazovL2Zlc3RpZ3JhbS8uL25vZGVfbW9kdWxlcy93b3JrYm94LXJvdXRpbmcvUmVnRXhwUm91dGUuanMiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtLy4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcm91dGluZy9Sb3V0ZS5qcyIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vLi9ub2RlX21vZHVsZXMvd29ya2JveC1yb3V0aW5nL1JvdXRlci5qcyIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vLi9ub2RlX21vZHVsZXMvd29ya2JveC1yb3V0aW5nL192ZXJzaW9uLmpzIiwid2VicGFjazovL2Zlc3RpZ3JhbS8uL25vZGVfbW9kdWxlcy93b3JrYm94LXJvdXRpbmcvcmVnaXN0ZXJSb3V0ZS5qcyIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vLi9ub2RlX21vZHVsZXMvd29ya2JveC1yb3V0aW5nL3V0aWxzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vLi9ub2RlX21vZHVsZXMvd29ya2JveC1yb3V0aW5nL3V0aWxzL2dldE9yQ3JlYXRlRGVmYXVsdFJvdXRlci5qcyIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vLi9ub2RlX21vZHVsZXMvd29ya2JveC1yb3V0aW5nL3V0aWxzL25vcm1hbGl6ZUhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtLy4vbm9kZV9tb2R1bGVzL3dvcmtib3gtc3RyYXRlZ2llcy9DYWNoZUZpcnN0LmpzIiwid2VicGFjazovL2Zlc3RpZ3JhbS8uL25vZGVfbW9kdWxlcy93b3JrYm94LXN0cmF0ZWdpZXMvU3RyYXRlZ3kuanMiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtLy4vbm9kZV9tb2R1bGVzL3dvcmtib3gtc3RyYXRlZ2llcy9TdHJhdGVneUhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtLy4vbm9kZV9tb2R1bGVzL3dvcmtib3gtc3RyYXRlZ2llcy9fdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vLi9ub2RlX21vZHVsZXMvd29ya2JveC1zdHJhdGVnaWVzL3V0aWxzL21lc3NhZ2VzLmpzIiwid2VicGFjazovL2Zlc3RpZ3JhbS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZmVzdGlncmFtL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9mZXN0aWdyYW0vLi9zcmMvd3d3L3NyYy1zdy5qcyJdLCJuYW1lcyI6WyJzZWxmIiwiX19XQl9ESVNBQkxFX0RFVl9MT0dTIiwiY2FjaGluZyIsIl9fV0JfTUFOSUZFU1QiLCJwcmVjYWNoZUFuZFJvdXRlIiwicmVnaXN0ZXJSb3V0ZSIsIk5hdmlnYXRpb25Sb3V0ZSIsImNyZWF0ZUhhbmRsZXJCb3VuZFRvVVJMIiwiYmxhY2tsaXN0IiwiQ2FjaGVGaXJzdCIsImNhY2hlTmFtZSIsIm1hdGNoT3B0aW9ucyIsImlnbm9yZVZhcnkiLCJwbHVnaW5zIiwiRXhwaXJhdGlvblBsdWdpbiIsIm1heEVudHJpZXMiLCJtYXhBZ2VTZWNvbmRzIiwicHVyZ2VPblF1b3RhRXJyb3IiLCJDYWNoZWFibGVSZXNwb25zZVBsdWdpbiIsInN0YXR1c2VzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiZGF0YSIsInR5cGUiLCJza2lwV2FpdGluZyIsIndhaXRVbnRpbCIsImNsaWVudHMiLCJjbGFpbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ3lEO0FBQ1k7QUFDSTtBQUNoQjtBQUNsQztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLGNBQWM7QUFDN0I7QUFDQSxlQUFlLHNCQUFzQjtBQUNyQztBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0IsWUFBWSxJ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Z0JBQUwsQ0FBc0IsU0FBdEIsRUFBaUNDLEtBQUssSUFBSTtBQUN6QztBQUVBQSxPQUFLLENBQUNJLFNBQU4sQ0FBZ0J6QixJQUFJLENBQUN3QixXQUFMLEVBQWhCO0FBQ0EsQ0FKRDtBQU1BeEIsSUFBSSxDQUFDb0IsZ0JBQUwsQ0FBc0IsVUFBdEIsRUFBa0NDLEtBQUssSUFBSTtBQUMxQztBQUVBLFNBQU9yQixJQUFJLENBQUMwQixPQUFMLENBQWFDLEtBQWIsRUFBUDtBQUNBLENBSkQsRSIsImZpbGUiOiJzZXJ2aWNlLXdvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9hc3NlcnQuanMnO1xuaW1wb3J0IHsgV29ya2JveEVycm9yIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL1dvcmtib3hFcnJvci5qcyc7XG5pbXBvcnQgeyBnZXRGcmllbmRseVVSTCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9nZXRGcmllbmRseVVSTC5qcyc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvbG9nZ2VyLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIFRoaXMgY2xhc3MgYWxsb3dzIHlvdSB0byBzZXQgdXAgcnVsZXMgZGV0ZXJtaW5pbmcgd2hhdFxuICogc3RhdHVzIGNvZGVzIGFuZC9vciBoZWFkZXJzIG5lZWQgdG8gYmUgcHJlc2VudCBpbiBvcmRlciBmb3IgYVxuICogW2BSZXNwb25zZWBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9SZXNwb25zZSlcbiAqIHRvIGJlIGNvbnNpZGVyZWQgY2FjaGVhYmxlLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6d29ya2JveC1jYWNoZWFibGUtcmVzcG9uc2VcbiAqL1xuY2xhc3MgQ2FjaGVhYmxlUmVzcG9uc2Uge1xuICAgIC8qKlxuICAgICAqIFRvIGNvbnN0cnVjdCBhIG5ldyBDYWNoZWFibGVSZXNwb25zZSBpbnN0YW5jZSB5b3UgbXVzdCBwcm92aWRlIGF0IGxlYXN0XG4gICAgICogb25lIG9mIHRoZSBgY29uZmlnYCBwcm9wZXJ0aWVzLlxuICAgICAqXG4gICAgICogSWYgYm90aCBgc3RhdHVzZXNgIGFuZCBgaGVhZGVyc2AgYXJlIHNwZWNpZmllZCwgdGhlbiBib3RoIGNvbmRpdGlvbnMgbXVzdFxuICAgICAqIGJlIG1ldCBmb3IgdGhlIGBSZXNwb25zZWAgdG8gYmUgY29uc2lkZXJlZCBjYWNoZWFibGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbY29uZmlnLnN0YXR1c2VzXSBPbmUgb3IgbW9yZSBzdGF0dXMgY29kZXMgdGhhdCBhXG4gICAgICogYFJlc3BvbnNlYCBjYW4gaGF2ZSBhbmQgYmUgY29uc2lkZXJlZCBjYWNoZWFibGUuXG4gICAgICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLHN0cmluZz59IFtjb25maWcuaGVhZGVyc10gQSBtYXBwaW5nIG9mIGhlYWRlciBuYW1lc1xuICAgICAqIGFuZCBleHBlY3RlZCB2YWx1ZXMgdGhhdCBhIGBSZXNwb25zZWAgY2FuIGhhdmUgYW5kIGJlIGNvbnNpZGVyZWQgY2FjaGVhYmxlLlxuICAgICAqIElmIG11bHRpcGxlIGhlYWRlcnMgYXJlIHByb3ZpZGVkLCBvbmx5IG9uZSBuZWVkcyB0byBiZSBwcmVzZW50LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZyA9IHt9KSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAoIShjb25maWcuc3RhdHVzZXMgfHwgY29uZmlnLmhlYWRlcnMpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignc3RhdHVzZXMtb3ItaGVhZGVycy1yZXF1aXJlZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtY2FjaGVhYmxlLXJlc3BvbnNlJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnQ2FjaGVhYmxlUmVzcG9uc2UnLFxuICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2NvbnN0cnVjdG9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb25maWcuc3RhdHVzZXMpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQuaXNBcnJheShjb25maWcuc3RhdHVzZXMsIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtY2FjaGVhYmxlLXJlc3BvbnNlJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnQ2FjaGVhYmxlUmVzcG9uc2UnLFxuICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2NvbnN0cnVjdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAnY29uZmlnLnN0YXR1c2VzJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb25maWcuaGVhZGVycykge1xuICAgICAgICAgICAgICAgIGFzc2VydC5pc1R5cGUoY29uZmlnLmhlYWRlcnMsICdvYmplY3QnLCB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWNhY2hlYWJsZS1yZXNwb25zZScsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ0NhY2hlYWJsZVJlc3BvbnNlJyxcbiAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6ICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2NvbmZpZy5oZWFkZXJzJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdGF0dXNlcyA9IGNvbmZpZy5zdGF0dXNlcztcbiAgICAgICAgdGhpcy5faGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3MgYSByZXNwb25zZSB0byBzZWUgd2hldGhlciBpdCdzIGNhY2hlYWJsZSBvciBub3QsIGJhc2VkIG9uIHRoaXNcbiAgICAgKiBvYmplY3QncyBjb25maWd1cmF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZXNwb25zZX0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlIHdob3NlIGNhY2hlYWJpbGl0eSBpcyBiZWluZ1xuICAgICAqIGNoZWNrZWQuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSBgUmVzcG9uc2VgIGlzIGNhY2hlYWJsZSwgYW5kIGBmYWxzZWBcbiAgICAgKiBvdGhlcndpc2UuXG4gICAgICovXG4gICAgaXNSZXNwb25zZUNhY2hlYWJsZShyZXNwb25zZSkge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgYXNzZXJ0LmlzSW5zdGFuY2UocmVzcG9uc2UsIFJlc3BvbnNlLCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtY2FjaGVhYmxlLXJlc3BvbnNlJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdDYWNoZWFibGVSZXNwb25zZScsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6ICdpc1Jlc3BvbnNlQ2FjaGVhYmxlJyxcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdyZXNwb25zZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2FjaGVhYmxlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuX3N0YXR1c2VzKSB7XG4gICAgICAgICAgICBjYWNoZWFibGUgPSB0aGlzLl9zdGF0dXNlcy5pbmNsdWRlcyhyZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9oZWFkZXJzICYmIGNhY2hlYWJsZSkge1xuICAgICAgICAgICAgY2FjaGVhYmxlID0gT2JqZWN0LmtleXModGhpcy5faGVhZGVycykuc29tZSgoaGVhZGVyTmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5oZWFkZXJzLmdldChoZWFkZXJOYW1lKSA9PT0gdGhpcy5faGVhZGVyc1toZWFkZXJOYW1lXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAoIWNhY2hlYWJsZSkge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5ncm91cENvbGxhcHNlZChgVGhlIHJlcXVlc3QgZm9yIGAgK1xuICAgICAgICAgICAgICAgICAgICBgJyR7Z2V0RnJpZW5kbHlVUkwocmVzcG9uc2UudXJsKX0nIHJldHVybmVkIGEgcmVzcG9uc2UgdGhhdCBkb2VzIGAgK1xuICAgICAgICAgICAgICAgICAgICBgbm90IG1lZXQgdGhlIGNyaXRlcmlhIGZvciBiZWluZyBjYWNoZWQuYCk7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmdyb3VwQ29sbGFwc2VkKGBWaWV3IGNhY2hlYWJpbGl0eSBjcml0ZXJpYSBoZXJlLmApO1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYENhY2hlYWJsZSBzdGF0dXNlczogYCArXG4gICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMuX3N0YXR1c2VzKSk7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgQ2FjaGVhYmxlIGhlYWRlcnM6IGAgK1xuICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh0aGlzLl9oZWFkZXJzLCBudWxsLCAyKSk7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmdyb3VwRW5kKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbG9nRnJpZW5kbHlIZWFkZXJzID0ge307XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuaGVhZGVycy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ0ZyaWVuZGx5SGVhZGVyc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmdyb3VwQ29sbGFwc2VkKGBWaWV3IHJlc3BvbnNlIHN0YXR1cyBhbmQgaGVhZGVycyBoZXJlLmApO1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJlc3BvbnNlIHN0YXR1czogYCArIHJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmVzcG9uc2UgaGVhZGVyczogYCArXG4gICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGxvZ0ZyaWVuZGx5SGVhZGVycywgbnVsbCwgMikpO1xuICAgICAgICAgICAgICAgIGxvZ2dlci5ncm91cEVuZCgpO1xuICAgICAgICAgICAgICAgIGxvZ2dlci5ncm91cENvbGxhcHNlZChgVmlldyBmdWxsIHJlc3BvbnNlIGRldGFpbHMgaGVyZS5gKTtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKHJlc3BvbnNlLmhlYWRlcnMpO1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGxvZ2dlci5ncm91cEVuZCgpO1xuICAgICAgICAgICAgICAgIGxvZ2dlci5ncm91cEVuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYWNoZWFibGU7XG4gICAgfVxufVxuZXhwb3J0IHsgQ2FjaGVhYmxlUmVzcG9uc2UgfTtcbiIsIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IENhY2hlYWJsZVJlc3BvbnNlIH0gZnJvbSAnLi9DYWNoZWFibGVSZXNwb25zZS5qcyc7XG5pbXBvcnQgJy4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBBIGNsYXNzIGltcGxlbWVudGluZyB0aGUgYGNhY2hlV2lsbFVwZGF0ZWAgbGlmZWN5Y2xlIGNhbGxiYWNrLiBUaGlzIG1ha2VzIGl0XG4gKiBlYXNpZXIgdG8gYWRkIGluIGNhY2hlYWJpbGl0eSBjaGVja3MgdG8gcmVxdWVzdHMgbWFkZSB2aWEgV29ya2JveCdzIGJ1aWx0LWluXG4gKiBzdHJhdGVnaWVzLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6d29ya2JveC1jYWNoZWFibGUtcmVzcG9uc2VcbiAqL1xuY2xhc3MgQ2FjaGVhYmxlUmVzcG9uc2VQbHVnaW4ge1xuICAgIC8qKlxuICAgICAqIFRvIGNvbnN0cnVjdCBhIG5ldyBDYWNoZWFibGVSZXNwb25zZVBsdWdpbiBpbnN0YW5jZSB5b3UgbXVzdCBwcm92aWRlIGF0XG4gICAgICogbGVhc3Qgb25lIG9mIHRoZSBgY29uZmlnYCBwcm9wZXJ0aWVzLlxuICAgICAqXG4gICAgICogSWYgYm90aCBgc3RhdHVzZXNgIGFuZCBgaGVhZGVyc2AgYXJlIHNwZWNpZmllZCwgdGhlbiBib3RoIGNvbmRpdGlvbnMgbXVzdFxuICAgICAqIGJlIG1ldCBmb3IgdGhlIGBSZXNwb25zZWAgdG8gYmUgY29uc2lkZXJlZCBjYWNoZWFibGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbY29uZmlnLnN0YXR1c2VzXSBPbmUgb3IgbW9yZSBzdGF0dXMgY29kZXMgdGhhdCBhXG4gICAgICogYFJlc3BvbnNlYCBjYW4gaGF2ZSBhbmQgYmUgY29uc2lkZXJlZCBjYWNoZWFibGUuXG4gICAgICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLHN0cmluZz59IFtjb25maWcuaGVhZGVyc10gQSBtYXBwaW5nIG9mIGhlYWRlciBuYW1lc1xuICAgICAqIGFuZCBleHBlY3RlZCB2YWx1ZXMgdGhhdCBhIGBSZXNwb25zZWAgY2FuIGhhdmUgYW5kIGJlIGNvbnNpZGVyZWQgY2FjaGVhYmxlLlxuICAgICAqIElmIG11bHRpcGxlIGhlYWRlcnMgYXJlIHByb3ZpZGVkLCBvbmx5IG9uZSBuZWVkcyB0byBiZSBwcmVzZW50LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAgICogQHBhcmFtIHtSZXNwb25zZX0gb3B0aW9ucy5yZXNwb25zZVxuICAgICAgICAgKiBAcmV0dXJuIHtSZXNwb25zZXxudWxsfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jYWNoZVdpbGxVcGRhdGUgPSBhc3luYyAoeyByZXNwb25zZSB9KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY2FjaGVhYmxlUmVzcG9uc2UuaXNSZXNwb25zZUNhY2hlYWJsZShyZXNwb25zZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fY2FjaGVhYmxlUmVzcG9uc2UgPSBuZXcgQ2FjaGVhYmxlUmVzcG9uc2UoY29uZmlnKTtcbiAgICB9XG59XG5leHBvcnQgeyBDYWNoZWFibGVSZXNwb25zZVBsdWdpbiB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBAdHMtaWdub3JlXG50cnkge1xuICAgIHNlbGZbJ3dvcmtib3g6Y2FjaGVhYmxlLXJlc3BvbnNlOjYuMS4yJ10gJiYgXygpO1xufVxuY2F0Y2ggKGUpIHsgfVxuIiwiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIEEgY2xhc3MgdGhhdCB3cmFwcyBjb21tb24gSW5kZXhlZERCIGZ1bmN0aW9uYWxpdHkgaW4gYSBwcm9taXNlLWJhc2VkIEFQSS5cbiAqIEl0IGV4cG9zZXMgYWxsIHRoZSB1bmRlcmx5aW5nIHBvd2VyIGFuZCBmdW5jdGlvbmFsaXR5IG9mIEluZGV4ZWREQiwgYnV0XG4gKiB3cmFwcyB0aGUgbW9zdCBjb21tb25seSB1c2VkIGZlYXR1cmVzIGluIGEgd2F5IHRoYXQncyBtdWNoIHNpbXBsZXIgdG8gdXNlLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBEQldyYXBwZXIge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZlcnNpb25cbiAgICAgKiBAcGFyYW0ge09iamVjdD19IFtjYWxsYmFja11cbiAgICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gW2NhbGxiYWNrcy5vbnVwZ3JhZGVuZWVkZWRdXG4gICAgICogQHBhcmFtIHshRnVuY3Rpb259IFtjYWxsYmFja3Mub252ZXJzaW9uY2hhbmdlXSBEZWZhdWx0cyB0b1xuICAgICAqICAgICBEQldyYXBwZXIucHJvdG90eXBlLl9vbnZlcnNpb25jaGFuZ2Ugd2hlbiBub3Qgc3BlY2lmaWVkLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgdmVyc2lvbiwgeyBvbnVwZ3JhZGVuZWVkZWQsIG9udmVyc2lvbmNoYW5nZSwgfSA9IHt9KSB7XG4gICAgICAgIHRoaXMuX2RiID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuX3ZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICB0aGlzLl9vbnVwZ3JhZGVuZWVkZWQgPSBvbnVwZ3JhZGVuZWVkZWQ7XG4gICAgICAgIHRoaXMuX29udmVyc2lvbmNoYW5nZSA9IG9udmVyc2lvbmNoYW5nZSB8fCAoKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgSURCRGF0YWJhc2UgaW5zdGFuY2UgKG5vdCBub3JtYWxseSBuZWVkZWQpLlxuICAgICAqIEByZXR1cm4ge0lEQkRhdGFiYXNlfHVuZGVmaW5lZH1cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0IGRiKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9wZW5zIGEgY29ubmVjdGVkIHRvIGFuIElEQkRhdGFiYXNlLCBpbnZva2VzIGFueSBvbnVwZ3JhZGVkbmVlZGVkXG4gICAgICogY2FsbGJhY2ssIGFuZCBhZGRlZCBhbiBvbnZlcnNpb25jaGFuZ2UgY2FsbGJhY2sgdG8gdGhlIGRhdGFiYXNlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7SURCRGF0YWJhc2V9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhc3luYyBvcGVuKCkge1xuICAgICAgICBpZiAodGhpcy5fZGIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuX2RiID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgLy8gVGhpcyBmbGFnIGlzIGZsaXBwZWQgdG8gdHJ1ZSBpZiB0aGUgdGltZW91dCBjYWxsYmFjayBydW5zIHByaW9yXG4gICAgICAgICAgICAvLyB0byB0aGUgcmVxdWVzdCBmYWlsaW5nIG9yIHN1Y2NlZWRpbmcuIE5vdGU6IHdlIHVzZSBhIHRpbWVvdXQgaW5zdGVhZFxuICAgICAgICAgICAgLy8gb2YgYW4gb25ibG9ja2VkIGhhbmRsZXIgc2luY2UgdGhlcmUgYXJlIGNhc2VzIHdoZXJlIG9uYmxvY2tlZCB3aWxsXG4gICAgICAgICAgICAvLyBuZXZlciBuZXZlciBydW4uIEEgdGltZW91dCBiZXR0ZXIgaGFuZGxlcyBhbGwgcG9zc2libGUgc2NlbmFyaW9zOlxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3czYy9JbmRleGVkREIvaXNzdWVzLzIyM1xuICAgICAgICAgICAgbGV0IG9wZW5SZXF1ZXN0VGltZWRPdXQgPSBmYWxzZTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG9wZW5SZXF1ZXN0VGltZWRPdXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ1RoZSBvcGVuIHJlcXVlc3Qgd2FzIGJsb2NrZWQgYW5kIHRpbWVkIG91dCcpKTtcbiAgICAgICAgICAgIH0sIHRoaXMuT1BFTl9USU1FT1VUKTtcbiAgICAgICAgICAgIGNvbnN0IG9wZW5SZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4odGhpcy5fbmFtZSwgdGhpcy5fdmVyc2lvbik7XG4gICAgICAgICAgICBvcGVuUmVxdWVzdC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KG9wZW5SZXF1ZXN0LmVycm9yKTtcbiAgICAgICAgICAgIG9wZW5SZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IChldnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob3BlblJlcXVlc3RUaW1lZE91dCkge1xuICAgICAgICAgICAgICAgICAgICBvcGVuUmVxdWVzdC50cmFuc2FjdGlvbi5hYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICBvcGVuUmVxdWVzdC5yZXN1bHQuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHRoaXMuX29udXBncmFkZW5lZWRlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vbnVwZ3JhZGVuZWVkZWQoZXZ0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgb3BlblJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRiID0gb3BlblJlcXVlc3QucmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmIChvcGVuUmVxdWVzdFRpbWVkT3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRiLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkYi5vbnZlcnNpb25jaGFuZ2UgPSB0aGlzLl9vbnZlcnNpb25jaGFuZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQb2x5ZmlsbHMgdGhlIG5hdGl2ZSBgZ2V0S2V5KClgIG1ldGhvZC4gTm90ZSwgdGhpcyBpcyBvdmVycmlkZGVuIGF0XG4gICAgICogcnVudGltZSBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0aGUgbmF0aXZlIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdG9yZU5hbWVcbiAgICAgKiBAcGFyYW0geyp9IHF1ZXJ5XG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhc3luYyBnZXRLZXkoc3RvcmVOYW1lLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gKGF3YWl0IHRoaXMuZ2V0QWxsS2V5cyhzdG9yZU5hbWUsIHF1ZXJ5LCAxKSlbMF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBvbHlmaWxscyB0aGUgbmF0aXZlIGBnZXRBbGwoKWAgbWV0aG9kLiBOb3RlLCB0aGlzIGlzIG92ZXJyaWRkZW4gYXRcbiAgICAgKiBydW50aW1lIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIHRoZSBuYXRpdmUgbWV0aG9kLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0b3JlTmFtZVxuICAgICAqIEBwYXJhbSB7Kn0gcXVlcnlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY291bnRcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGFzeW5jIGdldEFsbChzdG9yZU5hbWUsIHF1ZXJ5LCBjb3VudCkge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXRBbGxNYXRjaGluZyhzdG9yZU5hbWUsIHsgcXVlcnksIGNvdW50IH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQb2x5ZmlsbHMgdGhlIG5hdGl2ZSBgZ2V0QWxsS2V5cygpYCBtZXRob2QuIE5vdGUsIHRoaXMgaXMgb3ZlcnJpZGRlbiBhdFxuICAgICAqIHJ1bnRpbWUgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhlIG5hdGl2ZSBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RvcmVOYW1lXG4gICAgICogQHBhcmFtIHsqfSBxdWVyeVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudFxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgYXN5bmMgZ2V0QWxsS2V5cyhzdG9yZU5hbWUsIHF1ZXJ5LCBjb3VudCkge1xuICAgICAgICBjb25zdCBlbnRyaWVzID0gYXdhaXQgdGhpcy5nZXRBbGxNYXRjaGluZyhzdG9yZU5hbWUsIHsgcXVlcnksIGNvdW50LCBpbmNsdWRlS2V5czogdHJ1ZSB9KTtcbiAgICAgICAgcmV0dXJuIGVudHJpZXMubWFwKChlbnRyeSkgPT4gZW50cnkua2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3VwcG9ydHMgZmxleGlibGUgbG9va3VwIGluIGFuIG9iamVjdCBzdG9yZSBieSBzcGVjaWZ5aW5nIGFuIGluZGV4LFxuICAgICAqIHF1ZXJ5LCBkaXJlY3Rpb24sIGFuZCBjb3VudC4gVGhpcyBtZXRob2QgcmV0dXJucyBhbiBhcnJheSBvZiBvYmplY3RzXG4gICAgICogd2l0aCB0aGUgc2lnbmF0dXJlIC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdG9yZU5hbWVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHNdXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmluZGV4XSBUaGUgaW5kZXggdG8gdXNlIChpZiBzcGVjaWZpZWQpLlxuICAgICAqIEBwYXJhbSB7Kn0gW29wdHMucXVlcnldXG4gICAgICogQHBhcmFtIHtJREJDdXJzb3JEaXJlY3Rpb259IFtvcHRzLmRpcmVjdGlvbl1cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdHMuY291bnRdIFRoZSBtYXggbnVtYmVyIG9mIHJlc3VsdHMgdG8gcmV0dXJuLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdHMuaW5jbHVkZUtleXNdIFdoZW4gdHJ1ZSwgdGhlIHN0cnVjdHVyZSBvZiB0aGVcbiAgICAgKiAgICAgcmV0dXJuZWQgb2JqZWN0cyBpcyBjaGFuZ2VkIGZyb20gYW4gYXJyYXkgb2YgdmFsdWVzIHRvIGFuIGFycmF5IG9mXG4gICAgICogICAgIG9iamVjdHMgaW4gdGhlIGZvcm0ge2tleSwgcHJpbWFyeUtleSwgdmFsdWV9LlxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgYXN5bmMgZ2V0QWxsTWF0Y2hpbmcoc3RvcmVOYW1lLCB7IGluZGV4LCBxdWVyeSA9IG51bGwsIC8vIElFL0VkZ2UgZXJyb3JzIGlmIHF1ZXJ5ID09PSBgdW5kZWZpbmVkYC5cbiAgICBkaXJlY3Rpb24gPSAnbmV4dCcsIGNvdW50LCBpbmNsdWRlS2V5cyA9IGZhbHNlLCB9ID0ge30pIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMudHJhbnNhY3Rpb24oW3N0b3JlTmFtZV0sICdyZWFkb25seScsICh0eG4sIGRvbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlID0gdHhuLm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBpbmRleCA/IHN0b3JlLmluZGV4KGluZGV4KSA6IHN0b3JlO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9IHRhcmdldC5vcGVuQ3Vyc29yKHF1ZXJ5LCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3Vyc29yID0gcmVxdWVzdC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnNvcikge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goaW5jbHVkZUtleXMgPyBjdXJzb3IgOiBjdXJzb3IudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgJiYgcmVzdWx0cy5sZW5ndGggPj0gY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZG9uZShyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWNjZXB0cyBhIGxpc3Qgb2Ygc3RvcmVzLCBhIHRyYW5zYWN0aW9uIHR5cGUsIGFuZCBhIGNhbGxiYWNrIGFuZFxuICAgICAqIHBlcmZvcm1zIGEgdHJhbnNhY3Rpb24uIEEgcHJvbWlzZSBpcyByZXR1cm5lZCB0aGF0IHJlc29sdmVzIHRvIHdoYXRldmVyXG4gICAgICogdmFsdWUgdGhlIGNhbGxiYWNrIGNob29zZXMuIFRoZSBjYWxsYmFjayBob2xkcyBhbGwgdGhlIHRyYW5zYWN0aW9uIGxvZ2ljXG4gICAgICogYW5kIGlzIGludm9rZWQgd2l0aCB0d28gYXJndW1lbnRzOlxuICAgICAqICAgMS4gVGhlIElEQlRyYW5zYWN0aW9uIG9iamVjdFxuICAgICAqICAgMi4gQSBgZG9uZWAgZnVuY3Rpb24sIHRoYXQncyB1c2VkIHRvIHJlc29sdmUgdGhlIHByb21pc2Ugd2hlblxuICAgICAqICAgICAgd2hlbiB0aGUgdHJhbnNhY3Rpb24gaXMgZG9uZSwgaWYgcGFzc2VkIGEgdmFsdWUsIHRoZSBwcm9taXNlIGlzXG4gICAgICogICAgICByZXNvbHZlZCB0byB0aGF0IHZhbHVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBzdG9yZU5hbWVzIEFuIGFycmF5IG9mIG9iamVjdCBzdG9yZSBuYW1lc1xuICAgICAqICAgICBpbnZvbHZlZCBpbiB0aGUgdHJhbnNhY3Rpb24uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgQ2FuIGJlIGByZWFkb25seWAgb3IgYHJlYWR3cml0ZWAuXG4gICAgICogQHBhcmFtIHshRnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHJldHVybiB7Kn0gVGhlIHJlc3VsdCBvZiB0aGUgdHJhbnNhY3Rpb24gcmFuIGJ5IHRoZSBjYWxsYmFjay5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGFzeW5jIHRyYW5zYWN0aW9uKHN0b3JlTmFtZXMsIHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGF3YWl0IHRoaXMub3BlbigpO1xuICAgICAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHhuID0gdGhpcy5fZGIudHJhbnNhY3Rpb24oc3RvcmVOYW1lcywgdHlwZSk7XG4gICAgICAgICAgICB0eG4ub25hYm9ydCA9ICgpID0+IHJlamVjdCh0eG4uZXJyb3IpO1xuICAgICAgICAgICAgdHhuLm9uY29tcGxldGUgPSAoKSA9PiByZXNvbHZlKCk7XG4gICAgICAgICAgICBjYWxsYmFjayh0eG4sICh2YWx1ZSkgPT4gcmVzb2x2ZSh2YWx1ZSkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVsZWdhdGVzIGFzeW5jIHRvIGEgbmF0aXZlIElEQk9iamVjdFN0b3JlIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2QgVGhlIG1ldGhvZCBuYW1lLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdG9yZU5hbWUgVGhlIG9iamVjdCBzdG9yZSBuYW1lLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIENhbiBiZSBgcmVhZG9ubHlgIG9yIGByZWFkd3JpdGVgLlxuICAgICAqIEBwYXJhbSB7Li4uKn0gYXJncyBUaGUgbGlzdCBvZiBhcmdzIHRvIHBhc3MgdG8gdGhlIG5hdGl2ZSBtZXRob2QuXG4gICAgICogQHJldHVybiB7Kn0gVGhlIHJlc3VsdCBvZiB0aGUgdHJhbnNhY3Rpb24uXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhc3luYyBfY2FsbChtZXRob2QsIHN0b3JlTmFtZSwgdHlwZSwgLi4uYXJncykge1xuICAgICAgICBjb25zdCBjYWxsYmFjayA9ICh0eG4sIGRvbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9ialN0b3JlID0gdHhuLm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG4gICAgICAgICAgICAvLyBUT0RPKHBoaWxpcHdhbHRvbik6IEZpeCB0aGlzIHVuZGVybHlpbmcgVFMyNjg0IGVycm9yLlxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9IG9ialN0b3JlW21ldGhvZF0uYXBwbHkob2JqU3RvcmUsIGFyZ3MpO1xuICAgICAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiBkb25lKHJlcXVlc3QucmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMudHJhbnNhY3Rpb24oW3N0b3JlTmFtZV0sIHR5cGUsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xvc2VzIHRoZSBjb25uZWN0aW9uIG9wZW5lZCBieSBgREJXcmFwcGVyLm9wZW4oKWAuIEdlbmVyYWxseSB0aGlzIG1ldGhvZFxuICAgICAqIGRvZXNuJ3QgbmVlZCB0byBiZSBjYWxsZWQgc2luY2U6XG4gICAgICogICAxLiBJdCdzIHVzdWFsbHkgYmV0dGVyIHRvIGtlZXAgYSBjb25uZWN0aW9uIG9wZW4gc2luY2Ugb3BlbmluZ1xuICAgICAqICAgICAgYSBuZXcgY29ubmVjdGlvbiBpcyBzb21ld2hhdCBzbG93LlxuICAgICAqICAgMi4gQ29ubmVjdGlvbnMgYXJlIGF1dG9tYXRpY2FsbHkgY2xvc2VkIHdoZW4gdGhlIHJlZmVyZW5jZSBpc1xuICAgICAqICAgICAgZ2FyYmFnZSBjb2xsZWN0ZWQuXG4gICAgICogVGhlIHByaW1hcnkgdXNlIGNhc2UgZm9yIG5lZWRpbmcgdG8gY2xvc2UgYSBjb25uZWN0aW9uIGlzIHdoZW4gYW5vdGhlclxuICAgICAqIHJlZmVyZW5jZSAodHlwaWNhbGx5IGluIGFub3RoZXIgdGFiKSBuZWVkcyB0byB1cGdyYWRlIGl0IGFuZCB3b3VsZCBiZVxuICAgICAqIGJsb2NrZWQgYnkgdGhlIGN1cnJlbnQsIG9wZW4gY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYikge1xuICAgICAgICAgICAgdGhpcy5fZGIuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2RiID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIEV4cG9zZWQgb24gdGhlIHByb3RvdHlwZSB0byBsZXQgdXNlcnMgbW9kaWZ5IHRoZSBkZWZhdWx0IHRpbWVvdXQgb24gYVxuLy8gcGVyLWluc3RhbmNlIG9yIGdsb2JhbCBiYXNpcy5cbkRCV3JhcHBlci5wcm90b3R5cGUuT1BFTl9USU1FT1VUID0gMjAwMDtcbi8vIFdyYXAgbmF0aXZlIElEQk9iamVjdFN0b3JlIG1ldGhvZHMgYWNjb3JkaW5nIHRvIHRoZWlyIG1vZGUuXG5jb25zdCBtZXRob2RzVG9XcmFwID0ge1xuICAgIHJlYWRvbmx5OiBbJ2dldCcsICdjb3VudCcsICdnZXRLZXknLCAnZ2V0QWxsJywgJ2dldEFsbEtleXMnXSxcbiAgICByZWFkd3JpdGU6IFsnYWRkJywgJ3B1dCcsICdjbGVhcicsICdkZWxldGUnXSxcbn07XG5mb3IgKGNvbnN0IFttb2RlLCBtZXRob2RzXSBvZiBPYmplY3QuZW50cmllcyhtZXRob2RzVG9XcmFwKSkge1xuICAgIGZvciAoY29uc3QgbWV0aG9kIG9mIG1ldGhvZHMpIHtcbiAgICAgICAgaWYgKG1ldGhvZCBpbiBJREJPYmplY3RTdG9yZS5wcm90b3R5cGUpIHtcbiAgICAgICAgICAgIC8vIERvbid0IHVzZSBhcnJvdyBmdW5jdGlvbnMgaGVyZSBzaW5jZSB3ZSdyZSBvdXRzaWRlIG9mIHRoZSBjbGFzcy5cbiAgICAgICAgICAgIERCV3JhcHBlci5wcm90b3R5cGVbbWV0aG9kXSA9XG4gICAgICAgICAgICAgICAgYXN5bmMgZnVuY3Rpb24gKHN0b3JlTmFtZSwgLi4uYXJncykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fY2FsbChtZXRob2QsIHN0b3JlTmFtZSwgbW9kZSwgLi4uYXJncyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBUaGUgRGVmZXJyZWQgY2xhc3MgY29tcG9zZXMgUHJvbWlzZXMgaW4gYSB3YXkgdGhhdCBhbGxvd3MgZm9yIHRoZW0gdG8gYmVcbiAqIHJlc29sdmVkIG9yIHJlamVjdGVkIGZyb20gb3V0c2lkZSB0aGUgY29uc3RydWN0b3IuIEluIG1vc3QgY2FzZXMgcHJvbWlzZXNcbiAqIHNob3VsZCBiZSB1c2VkIGRpcmVjdGx5LCBidXQgRGVmZXJyZWRzIGNhbiBiZSBuZWNlc3Nhcnkgd2hlbiB0aGUgbG9naWMgdG9cbiAqIHJlc29sdmUgYSBwcm9taXNlIG11c3QgYmUgc2VwYXJhdGUuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgRGVmZXJyZWQge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBwcm9taXNlIGFuZCBleHBvc2VzIGl0cyByZXNvbHZlIGFuZCByZWplY3QgZnVuY3Rpb25zIGFzIG1ldGhvZHMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgICAgICB0aGlzLnJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0IHsgRGVmZXJyZWQgfTtcbiIsIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IG1lc3NhZ2VHZW5lcmF0b3IgfSBmcm9tICcuLi9tb2RlbHMvbWVzc2FnZXMvbWVzc2FnZUdlbmVyYXRvci5qcyc7XG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8qKlxuICogV29ya2JveCBlcnJvcnMgc2hvdWxkIGJlIHRocm93biB3aXRoIHRoaXMgY2xhc3MuXG4gKiBUaGlzIGFsbG93cyB1c2UgdG8gZW5zdXJlIHRoZSB0eXBlIGVhc2lseSBpbiB0ZXN0cyxcbiAqIGhlbHBzIGRldmVsb3BlcnMgaWRlbnRpZnkgZXJyb3JzIGZyb20gd29ya2JveFxuICogZWFzaWx5IGFuZCBhbGxvd3MgdXNlIHRvIG9wdGltaXNlIGVycm9yXG4gKiBtZXNzYWdlcyBjb3JyZWN0bHkuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgV29ya2JveEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVycm9yQ29kZSBUaGUgZXJyb3IgY29kZSB0aGF0XG4gICAgICogaWRlbnRpZmllcyB0aGlzIHBhcnRpY3VsYXIgZXJyb3IuXG4gICAgICogQHBhcmFtIHtPYmplY3Q9fSBkZXRhaWxzIEFueSByZWxldmFudCBhcmd1bWVudHNcbiAgICAgKiB0aGF0IHdpbGwgaGVscCBkZXZlbG9wZXJzIGlkZW50aWZ5IGlzc3VlcyBzaG91bGRcbiAgICAgKiBiZSBhZGRlZCBhcyBhIGtleSBvbiB0aGUgY29udGV4dCBvYmplY3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZXJyb3JDb2RlLCBkZXRhaWxzKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBtZXNzYWdlR2VuZXJhdG9yKGVycm9yQ29kZSwgZGV0YWlscyk7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm5hbWUgPSBlcnJvckNvZGU7XG4gICAgICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG4gICAgfVxufVxuZXhwb3J0IHsgV29ya2JveEVycm9yIH07XG4iLCIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBXb3JrYm94RXJyb3IgfSBmcm9tICcuLi9fcHJpdmF0ZS9Xb3JrYm94RXJyb3IuanMnO1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG4vKlxuICogVGhpcyBtZXRob2QgdGhyb3dzIGlmIHRoZSBzdXBwbGllZCB2YWx1ZSBpcyBub3QgYW4gYXJyYXkuXG4gKiBUaGUgZGVzdHJ1Y3RlZCB2YWx1ZXMgYXJlIHJlcXVpcmVkIHRvIHByb2R1Y2UgYSBtZWFuaW5nZnVsIGVycm9yIGZvciB1c2Vycy5cbiAqIFRoZSBkZXN0cnVjdGVkIGFuZCByZXN0cnVjdHVyZWQgb2JqZWN0IGlzIHNvIGl0J3MgY2xlYXIgd2hhdCBpc1xuICogbmVlZGVkLlxuICovXG5jb25zdCBpc0FycmF5ID0gKHZhbHVlLCBkZXRhaWxzKSA9PiB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCdub3QtYW4tYXJyYXknLCBkZXRhaWxzKTtcbiAgICB9XG59O1xuY29uc3QgaGFzTWV0aG9kID0gKG9iamVjdCwgZXhwZWN0ZWRNZXRob2QsIGRldGFpbHMpID0+IHtcbiAgICBjb25zdCB0eXBlID0gdHlwZW9mIG9iamVjdFtleHBlY3RlZE1ldGhvZF07XG4gICAgaWYgKHR5cGUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZGV0YWlsc1snZXhwZWN0ZWRNZXRob2QnXSA9IGV4cGVjdGVkTWV0aG9kO1xuICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCdtaXNzaW5nLWEtbWV0aG9kJywgZGV0YWlscyk7XG4gICAgfVxufTtcbmNvbnN0IGlzVHlwZSA9IChvYmplY3QsIGV4cGVjdGVkVHlwZSwgZGV0YWlscykgPT4ge1xuICAgIGlmICh0eXBlb2Ygb2JqZWN0ICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgZGV0YWlsc1snZXhwZWN0ZWRUeXBlJ10gPSBleHBlY3RlZFR5cGU7XG4gICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ2luY29ycmVjdC10eXBlJywgZGV0YWlscyk7XG4gICAgfVxufTtcbmNvbnN0IGlzSW5zdGFuY2UgPSAob2JqZWN0LCBleHBlY3RlZENsYXNzLCBkZXRhaWxzKSA9PiB7XG4gICAgaWYgKCEob2JqZWN0IGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgZGV0YWlsc1snZXhwZWN0ZWRDbGFzcyddID0gZXhwZWN0ZWRDbGFzcztcbiAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignaW5jb3JyZWN0LWNsYXNzJywgZGV0YWlscyk7XG4gICAgfVxufTtcbmNvbnN0IGlzT25lT2YgPSAodmFsdWUsIHZhbGlkVmFsdWVzLCBkZXRhaWxzKSA9PiB7XG4gICAgaWYgKCF2YWxpZFZhbHVlcy5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgZGV0YWlsc1sndmFsaWRWYWx1ZURlc2NyaXB0aW9uJ10gPVxuICAgICAgICAgICAgYFZhbGlkIHZhbHVlcyBhcmUgJHtKU09OLnN0cmluZ2lmeSh2YWxpZFZhbHVlcyl9LmA7XG4gICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ2ludmFsaWQtdmFsdWUnLCBkZXRhaWxzKTtcbiAgICB9XG59O1xuY29uc3QgaXNBcnJheU9mQ2xhc3MgPSAodmFsdWUsIGV4cGVjdGVkQ2xhc3MsIGRldGFpbHMpID0+IHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBXb3JrYm94RXJyb3IoJ25vdC1hcnJheS1vZi1jbGFzcycsIGRldGFpbHMpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIGZvciAoY29uc3QgaXRlbSBvZiB2YWx1ZSkge1xuICAgICAgICBpZiAoIShpdGVtIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxufTtcbmNvbnN0IGZpbmFsQXNzZXJ0RXhwb3J0cyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgPyBudWxsIDoge1xuICAgIGhhc01ldGhvZCxcbiAgICBpc0FycmF5LFxuICAgIGlzSW5zdGFuY2UsXG4gICAgaXNPbmVPZixcbiAgICBpc1R5cGUsXG4gICAgaXNBcnJheU9mQ2xhc3MsXG59O1xuZXhwb3J0IHsgZmluYWxBc3NlcnRFeHBvcnRzIGFzIGFzc2VydCB9O1xuIiwiLypcbiAgQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQ1xuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuZnVuY3Rpb24gc3RyaXBQYXJhbXMoZnVsbFVSTCwgaWdub3JlUGFyYW1zKSB7XG4gICAgY29uc3Qgc3RyaXBwZWRVUkwgPSBuZXcgVVJMKGZ1bGxVUkwpO1xuICAgIGZvciAoY29uc3QgcGFyYW0gb2YgaWdub3JlUGFyYW1zKSB7XG4gICAgICAgIHN0cmlwcGVkVVJMLnNlYXJjaFBhcmFtcy5kZWxldGUocGFyYW0pO1xuICAgIH1cbiAgICByZXR1cm4gc3RyaXBwZWRVUkwuaHJlZjtcbn1cbi8qKlxuICogTWF0Y2hlcyBhbiBpdGVtIGluIHRoZSBjYWNoZSwgaWdub3Jpbmcgc3BlY2lmaWMgVVJMIHBhcmFtcy4gVGhpcyBpcyBzaW1pbGFyXG4gKiB0byB0aGUgYGlnbm9yZVNlYXJjaGAgb3B0aW9uLCBidXQgaXQgYWxsb3dzIHlvdSB0byBpZ25vcmUganVzdCBzcGVjaWZpY1xuICogcGFyYW1zICh3aGlsZSBjb250aW51aW5nIHRvIG1hdGNoIG9uIHRoZSBvdGhlcnMpLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0NhY2hlfSBjYWNoZVxuICogQHBhcmFtIHtSZXF1ZXN0fSByZXF1ZXN0XG4gKiBAcGFyYW0ge09iamVjdH0gbWF0Y2hPcHRpb25zXG4gKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IGlnbm9yZVBhcmFtc1xuICogQHJldHVybiB7UHJvbWlzZTxSZXNwb25zZXx1bmRlZmluZWQ+fVxuICovXG5hc3luYyBmdW5jdGlvbiBjYWNoZU1hdGNoSWdub3JlUGFyYW1zKGNhY2hlLCByZXF1ZXN0LCBpZ25vcmVQYXJhbXMsIG1hdGNoT3B0aW9ucykge1xuICAgIGNvbnN0IHN0cmlwcGVkUmVxdWVzdFVSTCA9IHN0cmlwUGFyYW1zKHJlcXVlc3QudXJsLCBpZ25vcmVQYXJhbXMpO1xuICAgIC8vIElmIHRoZSByZXF1ZXN0IGRvZXNuJ3QgaW5jbHVkZSBhbnkgaWdub3JlZCBwYXJhbXMsIG1hdGNoIGFzIG5vcm1hbC5cbiAgICBpZiAocmVxdWVzdC51cmwgPT09IHN0cmlwcGVkUmVxdWVzdFVSTCkge1xuICAgICAgICByZXR1cm4gY2FjaGUubWF0Y2gocmVxdWVzdCwgbWF0Y2hPcHRpb25zKTtcbiAgICB9XG4gICAgLy8gT3RoZXJ3aXNlLCBtYXRjaCBieSBjb21wYXJpbmcga2V5c1xuICAgIGNvbnN0IGtleXNPcHRpb25zID0geyAuLi5tYXRjaE9wdGlvbnMsIGlnbm9yZVNlYXJjaDogdHJ1ZSB9O1xuICAgIGNvbnN0IGNhY2hlS2V5cyA9IGF3YWl0IGNhY2hlLmtleXMocmVxdWVzdCwga2V5c09wdGlvbnMpO1xuICAgIGZvciAoY29uc3QgY2FjaGVLZXkgb2YgY2FjaGVLZXlzKSB7XG4gICAgICAgIGNvbnN0IHN0cmlwcGVkQ2FjaGVLZXlVUkwgPSBzdHJpcFBhcmFtcyhjYWNoZUtleS51cmwsIGlnbm9yZVBhcmFtcyk7XG4gICAgICAgIGlmIChzdHJpcHBlZFJlcXVlc3RVUkwgPT09IHN0cmlwcGVkQ2FjaGVLZXlVUkwpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZS5tYXRjaChjYWNoZUtleSwgbWF0Y2hPcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm47XG59XG5leHBvcnQgeyBjYWNoZU1hdGNoSWdub3JlUGFyYW1zIH07XG4iLCIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbmNvbnN0IF9jYWNoZU5hbWVEZXRhaWxzID0ge1xuICAgIGdvb2dsZUFuYWx5dGljczogJ2dvb2dsZUFuYWx5dGljcycsXG4gICAgcHJlY2FjaGU6ICdwcmVjYWNoZS12MicsXG4gICAgcHJlZml4OiAnd29ya2JveCcsXG4gICAgcnVudGltZTogJ3J1bnRpbWUnLFxuICAgIHN1ZmZpeDogdHlwZW9mIHJlZ2lzdHJhdGlvbiAhPT0gJ3VuZGVmaW5lZCcgPyByZWdpc3RyYXRpb24uc2NvcGUgOiAnJyxcbn07XG5jb25zdCBfY3JlYXRlQ2FjaGVOYW1lID0gKGNhY2hlTmFtZSkgPT4ge1xuICAgIHJldHVybiBbX2NhY2hlTmFtZURldGFpbHMucHJlZml4LCBjYWNoZU5hbWUsIF9jYWNoZU5hbWVEZXRhaWxzLnN1ZmZpeF1cbiAgICAgICAgLmZpbHRlcigodmFsdWUpID0+IHZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IDApXG4gICAgICAgIC5qb2luKCctJyk7XG59O1xuY29uc3QgZWFjaENhY2hlTmFtZURldGFpbCA9IChmbikgPT4ge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKF9jYWNoZU5hbWVEZXRhaWxzKSkge1xuICAgICAgICBmbihrZXkpO1xuICAgIH1cbn07XG5leHBvcnQgY29uc3QgY2FjaGVOYW1lcyA9IHtcbiAgICB1cGRhdGVEZXRhaWxzOiAoZGV0YWlscykgPT4ge1xuICAgICAgICBlYWNoQ2FjaGVOYW1lRGV0YWlsKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGV0YWlsc1trZXldID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIF9jYWNoZU5hbWVEZXRhaWxzW2tleV0gPSBkZXRhaWxzW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0R29vZ2xlQW5hbHl0aWNzTmFtZTogKHVzZXJDYWNoZU5hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuIHVzZXJDYWNoZU5hbWUgfHwgX2NyZWF0ZUNhY2hlTmFtZShfY2FjaGVOYW1lRGV0YWlscy5nb29nbGVBbmFseXRpY3MpO1xuICAgIH0sXG4gICAgZ2V0UHJlY2FjaGVOYW1lOiAodXNlckNhY2hlTmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gdXNlckNhY2hlTmFtZSB8fCBfY3JlYXRlQ2FjaGVOYW1lKF9jYWNoZU5hbWVEZXRhaWxzLnByZWNhY2hlKTtcbiAgICB9LFxuICAgIGdldFByZWZpeDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gX2NhY2hlTmFtZURldGFpbHMucHJlZml4O1xuICAgIH0sXG4gICAgZ2V0UnVudGltZU5hbWU6ICh1c2VyQ2FjaGVOYW1lKSA9PiB7XG4gICAgICAgIHJldHVybiB1c2VyQ2FjaGVOYW1lIHx8IF9jcmVhdGVDYWNoZU5hbWUoX2NhY2hlTmFtZURldGFpbHMucnVudGltZSk7XG4gICAgfSxcbiAgICBnZXRTdWZmaXg6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIF9jYWNoZU5hbWVEZXRhaWxzLnN1ZmZpeDtcbiAgICB9LFxufTtcbiIsIi8qXG4gIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xubGV0IHN1cHBvcnRTdGF0dXM7XG4vKipcbiAqIEEgdXRpbGl0eSBmdW5jdGlvbiB0aGF0IGRldGVybWluZXMgd2hldGhlciB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzXG4gKiBjb25zdHJ1Y3RpbmcgYSBuZXcgYFJlc3BvbnNlYCBmcm9tIGEgYHJlc3BvbnNlLmJvZHlgIHN0cmVhbS5cbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBgdHJ1ZWAsIGlmIHRoZSBjdXJyZW50IGJyb3dzZXIgY2FuIHN1Y2Nlc3NmdWxseVxuICogICAgIGNvbnN0cnVjdCBhIGBSZXNwb25zZWAgZnJvbSBhIGByZXNwb25zZS5ib2R5YCBzdHJlYW0sIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNhbkNvbnN0cnVjdFJlc3BvbnNlRnJvbUJvZHlTdHJlYW0oKSB7XG4gICAgaWYgKHN1cHBvcnRTdGF0dXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCB0ZXN0UmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoJycpO1xuICAgICAgICBpZiAoJ2JvZHknIGluIHRlc3RSZXNwb25zZSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBuZXcgUmVzcG9uc2UodGVzdFJlc3BvbnNlLmJvZHkpO1xuICAgICAgICAgICAgICAgIHN1cHBvcnRTdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgc3VwcG9ydFN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN1cHBvcnRTdGF0dXMgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHN1cHBvcnRTdGF0dXM7XG59XG5leHBvcnQgeyBjYW5Db25zdHJ1Y3RSZXNwb25zZUZyb21Cb2R5U3RyZWFtIH07XG4iLCIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8qKlxuICogRGVsZXRlcyB0aGUgZGF0YWJhc2UuXG4gKiBOb3RlOiB0aGlzIGlzIGV4cG9ydGVkIHNlcGFyYXRlbHkgZnJvbSB0aGUgREJXcmFwcGVyIG1vZHVsZSBiZWNhdXNlIG1vc3RcbiAqIHVzYWdlcyBvZiBJbmRleGVkREIgaW4gd29ya2JveCBkb250IG5lZWQgZGVsZXRpbmcsIGFuZCB0aGlzIHdheSBpdCBjYW4gYmVcbiAqIHJldXNlZCBpbiB0ZXN0cyB0byBkZWxldGUgZGF0YWJhc2VzIHdpdGhvdXQgY3JlYXRpbmcgREJXcmFwcGVyIGluc3RhbmNlcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgZGF0YWJhc2UgbmFtZS5cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBkZWxldGVEYXRhYmFzZSA9IGFzeW5jIChuYW1lKSA9PiB7XG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKG5hbWUpO1xuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICByZWplY3QocmVxdWVzdC5lcnJvcik7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Qub25ibG9ja2VkID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignRGVsZXRlIGJsb2NrZWQnKSk7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9O1xuICAgIH0pO1xufTtcbiIsIi8qXG4gIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8qKlxuICogQSBoZWxwZXIgZnVuY3Rpb24gdGhhdCBwcmV2ZW50cyBhIHByb21pc2UgZnJvbSBiZWluZyBmbGFnZ2VkIGFzIHVudXNlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICoqL1xuZXhwb3J0IGZ1bmN0aW9uIGRvbnRXYWl0Rm9yKHByb21pc2UpIHtcbiAgICAvLyBFZmZlY3RpdmUgbm8tb3AuXG4gICAgcHJvbWlzZS50aGVuKCgpID0+IHsgfSk7XG59XG4iLCIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLi9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgcXVvdGFFcnJvckNhbGxiYWNrcyB9IGZyb20gJy4uL21vZGVscy9xdW90YUVycm9yQ2FsbGJhY2tzLmpzJztcbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBSdW5zIGFsbCBvZiB0aGUgY2FsbGJhY2sgZnVuY3Rpb25zLCBvbmUgYXQgYSB0aW1lIHNlcXVlbnRpYWxseSwgaW4gdGhlIG9yZGVyXG4gKiBpbiB3aGljaCB0aGV5IHdlcmUgcmVnaXN0ZXJlZC5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOndvcmtib3gtY29yZVxuICogQHByaXZhdGVcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZVF1b3RhRXJyb3JDYWxsYmFja3MoKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhgQWJvdXQgdG8gcnVuICR7cXVvdGFFcnJvckNhbGxiYWNrcy5zaXplfSBgICtcbiAgICAgICAgICAgIGBjYWxsYmFja3MgdG8gY2xlYW4gdXAgY2FjaGVzLmApO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIHF1b3RhRXJyb3JDYWxsYmFja3MpIHtcbiAgICAgICAgYXdhaXQgY2FsbGJhY2soKTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coY2FsbGJhY2ssICdpcyBjb21wbGV0ZS4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBsb2dnZXIubG9nKCdGaW5pc2hlZCBydW5uaW5nIGNhbGxiYWNrcy4nKTtcbiAgICB9XG59XG5leHBvcnQgeyBleGVjdXRlUXVvdGFFcnJvckNhbGxiYWNrcyB9O1xuIiwiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG5jb25zdCBnZXRGcmllbmRseVVSTCA9ICh1cmwpID0+IHtcbiAgICBjb25zdCB1cmxPYmogPSBuZXcgVVJMKFN0cmluZyh1cmwpLCBsb2NhdGlvbi5ocmVmKTtcbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS93b3JrYm94L2lzc3Vlcy8yMzIzXG4gICAgLy8gV2Ugd2FudCB0byBpbmNsdWRlIGV2ZXJ5dGhpbmcsIGV4Y2VwdCBmb3IgdGhlIG9yaWdpbiBpZiBpdCdzIHNhbWUtb3JpZ2luLlxuICAgIHJldHVybiB1cmxPYmouaHJlZi5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke2xvY2F0aW9uLm9yaWdpbn1gKSwgJycpO1xufTtcbmV4cG9ydCB7IGdldEZyaWVuZGx5VVJMIH07XG4iLCIvKlxuICBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG5jb25zdCBsb2dnZXIgPSAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyA/IG51bGwgOiAoKCkgPT4ge1xuICAgIC8vIERvbid0IG92ZXJ3cml0ZSB0aGlzIHZhbHVlIGlmIGl0J3MgYWxyZWFkeSBzZXQuXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9wdWxsLzIyODQjaXNzdWVjb21tZW50LTU2MDQ3MDkyM1xuICAgIGlmICghKCdfX1dCX0RJU0FCTEVfREVWX0xPR1MnIGluIHNlbGYpKSB7XG4gICAgICAgIHNlbGYuX19XQl9ESVNBQkxFX0RFVl9MT0dTID0gZmFsc2U7XG4gICAgfVxuICAgIGxldCBpbkdyb3VwID0gZmFsc2U7XG4gICAgY29uc3QgbWV0aG9kVG9Db2xvck1hcCA9IHtcbiAgICAgICAgZGVidWc6IGAjN2Y4YzhkYCxcbiAgICAgICAgbG9nOiBgIzJlY2M3MWAsXG4gICAgICAgIHdhcm46IGAjZjM5YzEyYCxcbiAgICAgICAgZXJyb3I6IGAjYzAzOTJiYCxcbiAgICAgICAgZ3JvdXBDb2xsYXBzZWQ6IGAjMzQ5OGRiYCxcbiAgICAgICAgZ3JvdXBFbmQ6IG51bGwsXG4gICAgfTtcbiAgICBjb25zdCBwcmludCA9IGZ1bmN0aW9uIChtZXRob2QsIGFyZ3MpIHtcbiAgICAgICAgaWYgKHNlbGYuX19XQl9ESVNBQkxFX0RFVl9MT0dTKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ2dyb3VwQ29sbGFwc2VkJykge1xuICAgICAgICAgICAgLy8gU2FmYXJpIGRvZXNuJ3QgcHJpbnQgYWxsIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoKSBhcmd1bWVudHM6XG4gICAgICAgICAgICAvLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTgyNzU0XG4gICAgICAgICAgICBpZiAoL14oKD8hY2hyb21lfGFuZHJvaWQpLikqc2FmYXJpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGVbbWV0aG9kXSguLi5hcmdzKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3R5bGVzID0gW1xuICAgICAgICAgICAgYGJhY2tncm91bmQ6ICR7bWV0aG9kVG9Db2xvck1hcFttZXRob2RdfWAsXG4gICAgICAgICAgICBgYm9yZGVyLXJhZGl1czogMC41ZW1gLFxuICAgICAgICAgICAgYGNvbG9yOiB3aGl0ZWAsXG4gICAgICAgICAgICBgZm9udC13ZWlnaHQ6IGJvbGRgLFxuICAgICAgICAgICAgYHBhZGRpbmc6IDJweCAwLjVlbWAsXG4gICAgICAgIF07XG4gICAgICAgIC8vIFdoZW4gaW4gYSBncm91cCwgdGhlIHdvcmtib3ggcHJlZml4IGlzIG5vdCBkaXNwbGF5ZWQuXG4gICAgICAgIGNvbnN0IGxvZ1ByZWZpeCA9IGluR3JvdXAgPyBbXSA6IFsnJWN3b3JrYm94Jywgc3R5bGVzLmpvaW4oJzsnKV07XG4gICAgICAgIGNvbnNvbGVbbWV0aG9kXSguLi5sb2dQcmVmaXgsIC4uLmFyZ3MpO1xuICAgICAgICBpZiAobWV0aG9kID09PSAnZ3JvdXBDb2xsYXBzZWQnKSB7XG4gICAgICAgICAgICBpbkdyb3VwID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWV0aG9kID09PSAnZ3JvdXBFbmQnKSB7XG4gICAgICAgICAgICBpbkdyb3VwID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGFwaSA9IHt9O1xuICAgIGNvbnN0IGxvZ2dlck1ldGhvZHMgPSBPYmplY3Qua2V5cyhtZXRob2RUb0NvbG9yTWFwKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBsb2dnZXJNZXRob2RzKSB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IGtleTtcbiAgICAgICAgYXBpW21ldGhvZF0gPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgcHJpbnQobWV0aG9kLCBhcmdzKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGFwaTtcbn0pKCkpO1xuZXhwb3J0IHsgbG9nZ2VyIH07XG4iLCIvKlxuICBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgYW5kIHRoZSBwYXNzZWQgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcy5cbiAqIFRoaXMgdXRpbGl0eSBpcyBhbiBhc3luYy9hd2FpdC1mcmllbmRseSB2ZXJzaW9uIG9mIGBzZXRUaW1lb3V0YC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gbXNcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGltZW91dChtcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xufVxuIiwiLypcbiAgQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQ1xuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBBIHV0aWxpdHkgbWV0aG9kIHRoYXQgbWFrZXMgaXQgZWFzaWVyIHRvIHVzZSBgZXZlbnQud2FpdFVudGlsYCB3aXRoXG4gKiBhc3luYyBmdW5jdGlvbnMgYW5kIHJldHVybiB0aGUgcmVzdWx0LlxuICpcbiAqIEBwYXJhbSB7RXh0ZW5kYWJsZUV2ZW50fSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXN5bmNGblxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB3YWl0VW50aWwoZXZlbnQsIGFzeW5jRm4pIHtcbiAgICBjb25zdCByZXR1cm5Qcm9taXNlID0gYXN5bmNGbigpO1xuICAgIGV2ZW50LndhaXRVbnRpbChyZXR1cm5Qcm9taXNlKTtcbiAgICByZXR1cm4gcmV0dXJuUHJvbWlzZTtcbn1cbmV4cG9ydCB7IHdhaXRVbnRpbCB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBAdHMtaWdub3JlXG50cnkge1xuICAgIHNlbGZbJ3dvcmtib3g6Y29yZTo2LjEuMiddICYmIF8oKTtcbn1cbmNhdGNoIChlKSB7IH1cbiIsIi8qXG4gIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGNhbkNvbnN0cnVjdFJlc3BvbnNlRnJvbUJvZHlTdHJlYW0gfSBmcm9tICcuL19wcml2YXRlL2NhbkNvbnN0cnVjdFJlc3BvbnNlRnJvbUJvZHlTdHJlYW0uanMnO1xuaW1wb3J0IHsgV29ya2JveEVycm9yIH0gZnJvbSAnLi9fcHJpdmF0ZS9Xb3JrYm94RXJyb3IuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogQWxsb3dzIGRldmVsb3BlcnMgdG8gY29weSBhIHJlc3BvbnNlIGFuZCBtb2RpZnkgaXRzIGBoZWFkZXJzYCwgYHN0YXR1c2AsXG4gKiBvciBgc3RhdHVzVGV4dGAgdmFsdWVzICh0aGUgdmFsdWVzIHNldHRhYmxlIHZpYSBhXG4gKiBbYFJlc3BvbnNlSW5pdGBde0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9SZXNwb25zZS9SZXNwb25zZSNTeW50YXh9XG4gKiBvYmplY3QgaW4gdGhlIGNvbnN0cnVjdG9yKS5cbiAqIFRvIG1vZGlmeSB0aGVzZSB2YWx1ZXMsIHBhc3MgYSBmdW5jdGlvbiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50LiBUaGF0XG4gKiBmdW5jdGlvbiB3aWxsIGJlIGludm9rZWQgd2l0aCBhIHNpbmdsZSBvYmplY3Qgd2l0aCB0aGUgcmVzcG9uc2UgcHJvcGVydGllc1xuICogYHtoZWFkZXJzLCBzdGF0dXMsIHN0YXR1c1RleHR9YC4gVGhlIHJldHVybiB2YWx1ZSBvZiB0aGlzIGZ1bmN0aW9uIHdpbGxcbiAqIGJlIHVzZWQgYXMgdGhlIGBSZXNwb25zZUluaXRgIGZvciB0aGUgbmV3IGBSZXNwb25zZWAuIFRvIGNoYW5nZSB0aGUgdmFsdWVzXG4gKiBlaXRoZXIgbW9kaWZ5IHRoZSBwYXNzZWQgcGFyYW1ldGVyKHMpIGFuZCByZXR1cm4gaXQsIG9yIHJldHVybiBhIHRvdGFsbHlcbiAqIG5ldyBvYmplY3QuXG4gKlxuICogVGhpcyBtZXRob2QgaXMgaW50ZW50aW9uYWxseSBsaW1pdGVkIHRvIHNhbWUtb3JpZ2luIHJlc3BvbnNlcywgcmVnYXJkbGVzcyBvZlxuICogd2hldGhlciBDT1JTIHdhcyB1c2VkIG9yIG5vdC5cbiAqXG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNwb25zZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbW9kaWZpZXJcbiAqIEBtZW1iZXJvZiBtb2R1bGU6d29ya2JveC1jb3JlXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGNvcHlSZXNwb25zZShyZXNwb25zZSwgbW9kaWZpZXIpIHtcbiAgICBsZXQgb3JpZ2luID0gbnVsbDtcbiAgICAvLyBJZiByZXNwb25zZS51cmwgaXNuJ3Qgc2V0LCBhc3N1bWUgaXQncyBjcm9zcy1vcmlnaW4gYW5kIGtlZXAgb3JpZ2luIG51bGwuXG4gICAgaWYgKHJlc3BvbnNlLnVybCkge1xuICAgICAgICBjb25zdCByZXNwb25zZVVSTCA9IG5ldyBVUkwocmVzcG9uc2UudXJsKTtcbiAgICAgICAgb3JpZ2luID0gcmVzcG9uc2VVUkwub3JpZ2luO1xuICAgIH1cbiAgICBpZiAob3JpZ2luICE9PSBzZWxmLmxvY2F0aW9uLm9yaWdpbikge1xuICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCdjcm9zcy1vcmlnaW4tY29weS1yZXNwb25zZScsIHsgb3JpZ2luIH0pO1xuICAgIH1cbiAgICBjb25zdCBjbG9uZWRSZXNwb25zZSA9IHJlc3BvbnNlLmNsb25lKCk7XG4gICAgLy8gQ3JlYXRlIGEgZnJlc2ggYFJlc3BvbnNlSW5pdGAgb2JqZWN0IGJ5IGNsb25pbmcgdGhlIGhlYWRlcnMuXG4gICAgY29uc3QgcmVzcG9uc2VJbml0ID0ge1xuICAgICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyhjbG9uZWRSZXNwb25zZS5oZWFkZXJzKSxcbiAgICAgICAgc3RhdHVzOiBjbG9uZWRSZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IGNsb25lZFJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgfTtcbiAgICAvLyBBcHBseSBhbnkgdXNlciBtb2RpZmljYXRpb25zLlxuICAgIGNvbnN0IG1vZGlmaWVkUmVzcG9uc2VJbml0ID0gbW9kaWZpZXIgPyBtb2RpZmllcihyZXNwb25zZUluaXQpIDogcmVzcG9uc2VJbml0O1xuICAgIC8vIENyZWF0ZSB0aGUgbmV3IHJlc3BvbnNlIGZyb20gdGhlIGJvZHkgc3RyZWFtIGFuZCBgUmVzcG9uc2VJbml0YFxuICAgIC8vIG1vZGlmaWNhdGlvbnMuIE5vdGU6IG5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB0aGUgUmVzcG9uc2UuYm9keSBzdHJlYW0sXG4gICAgLy8gc28gZmFsbCBiYWNrIHRvIHJlYWRpbmcgdGhlIGVudGlyZSBib2R5IGludG8gbWVtb3J5IGFzIGEgYmxvYi5cbiAgICBjb25zdCBib2R5ID0gY2FuQ29uc3RydWN0UmVzcG9uc2VGcm9tQm9keVN0cmVhbSgpID9cbiAgICAgICAgY2xvbmVkUmVzcG9uc2UuYm9keSA6IGF3YWl0IGNsb25lZFJlc3BvbnNlLmJsb2IoKTtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKGJvZHksIG1vZGlmaWVkUmVzcG9uc2VJbml0KTtcbn1cbmV4cG9ydCB7IGNvcHlSZXNwb25zZSB9O1xuIiwiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgbWVzc2FnZXMgfSBmcm9tICcuL21lc3NhZ2VzLmpzJztcbmltcG9ydCAnLi4vLi4vX3ZlcnNpb24uanMnO1xuY29uc3QgZmFsbGJhY2sgPSAoY29kZSwgLi4uYXJncykgPT4ge1xuICAgIGxldCBtc2cgPSBjb2RlO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbXNnICs9IGAgOjogJHtKU09OLnN0cmluZ2lmeShhcmdzKX1gO1xuICAgIH1cbiAgICByZXR1cm4gbXNnO1xufTtcbmNvbnN0IGdlbmVyYXRvckZ1bmN0aW9uID0gKGNvZGUsIGRldGFpbHMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBtZXNzYWdlc1tjb2RlXTtcbiAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gZmluZCBtZXNzYWdlIGZvciBjb2RlICcke2NvZGV9Jy5gKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lc3NhZ2UoZGV0YWlscyk7XG59O1xuZXhwb3J0IGNvbnN0IG1lc3NhZ2VHZW5lcmF0b3IgPSAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykgP1xuICAgIGZhbGxiYWNrIDogZ2VuZXJhdG9yRnVuY3Rpb247XG4iLCIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgJy4uLy4uL192ZXJzaW9uLmpzJztcbmV4cG9ydCBjb25zdCBtZXNzYWdlcyA9IHtcbiAgICAnaW52YWxpZC12YWx1ZSc6ICh7IHBhcmFtTmFtZSwgdmFsaWRWYWx1ZURlc2NyaXB0aW9uLCB2YWx1ZSB9KSA9PiB7XG4gICAgICAgIGlmICghcGFyYW1OYW1lIHx8ICF2YWxpZFZhbHVlRGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBpbnB1dCB0byAnaW52YWxpZC12YWx1ZScgZXJyb3IuYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGBUaGUgJyR7cGFyYW1OYW1lfScgcGFyYW1ldGVyIHdhcyBnaXZlbiBhIHZhbHVlIHdpdGggYW4gYCArXG4gICAgICAgICAgICBgdW5leHBlY3RlZCB2YWx1ZS4gJHt2YWxpZFZhbHVlRGVzY3JpcHRpb259IFJlY2VpdmVkIGEgdmFsdWUgb2YgYCArXG4gICAgICAgICAgICBgJHtKU09OLnN0cmluZ2lmeSh2YWx1ZSl9LmA7XG4gICAgfSxcbiAgICAnbm90LWFuLWFycmF5JzogKHsgbW9kdWxlTmFtZSwgY2xhc3NOYW1lLCBmdW5jTmFtZSwgcGFyYW1OYW1lIH0pID0+IHtcbiAgICAgICAgaWYgKCFtb2R1bGVOYW1lIHx8ICFjbGFzc05hbWUgfHwgIWZ1bmNOYW1lIHx8ICFwYXJhbU5hbWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBpbnB1dCB0byAnbm90LWFuLWFycmF5JyBlcnJvci5gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYFRoZSBwYXJhbWV0ZXIgJyR7cGFyYW1OYW1lfScgcGFzc2VkIGludG8gYCArXG4gICAgICAgICAgICBgJyR7bW9kdWxlTmFtZX0uJHtjbGFzc05hbWV9LiR7ZnVuY05hbWV9KCknIG11c3QgYmUgYW4gYXJyYXkuYDtcbiAgICB9LFxuICAgICdpbmNvcnJlY3QtdHlwZSc6ICh7IGV4cGVjdGVkVHlwZSwgcGFyYW1OYW1lLCBtb2R1bGVOYW1lLCBjbGFzc05hbWUsIGZ1bmNOYW1lIH0pID0+IHtcbiAgICAgICAgaWYgKCFleHBlY3RlZFR5cGUgfHwgIXBhcmFtTmFtZSB8fCAhbW9kdWxlTmFtZSB8fCAhZnVuY05hbWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBpbnB1dCB0byAnaW5jb3JyZWN0LXR5cGUnIGVycm9yLmApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgVGhlIHBhcmFtZXRlciAnJHtwYXJhbU5hbWV9JyBwYXNzZWQgaW50byBgICtcbiAgICAgICAgICAgIGAnJHttb2R1bGVOYW1lfS4ke2NsYXNzTmFtZSA/IChjbGFzc05hbWUgKyAnLicpIDogJyd9YCArXG4gICAgICAgICAgICBgJHtmdW5jTmFtZX0oKScgbXVzdCBiZSBvZiB0eXBlICR7ZXhwZWN0ZWRUeXBlfS5gO1xuICAgIH0sXG4gICAgJ2luY29ycmVjdC1jbGFzcyc6ICh7IGV4cGVjdGVkQ2xhc3MsIHBhcmFtTmFtZSwgbW9kdWxlTmFtZSwgY2xhc3NOYW1lLCBmdW5jTmFtZSwgaXNSZXR1cm5WYWx1ZVByb2JsZW0gfSkgPT4ge1xuICAgICAgICBpZiAoIWV4cGVjdGVkQ2xhc3MgfHwgIW1vZHVsZU5hbWUgfHwgIWZ1bmNOYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgaW5wdXQgdG8gJ2luY29ycmVjdC1jbGFzcycgZXJyb3IuYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUmV0dXJuVmFsdWVQcm9ibGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gYFRoZSByZXR1cm4gdmFsdWUgZnJvbSBgICtcbiAgICAgICAgICAgICAgICBgJyR7bW9kdWxlTmFtZX0uJHtjbGFzc05hbWUgPyAoY2xhc3NOYW1lICsgJy4nKSA6ICcnfSR7ZnVuY05hbWV9KCknIGAgK1xuICAgICAgICAgICAgICAgIGBtdXN0IGJlIGFuIGluc3RhbmNlIG9mIGNsYXNzICR7ZXhwZWN0ZWRDbGFzcy5uYW1lfS5gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgVGhlIHBhcmFtZXRlciAnJHtwYXJhbU5hbWV9JyBwYXNzZWQgaW50byBgICtcbiAgICAgICAgICAgIGAnJHttb2R1bGVOYW1lfS4ke2NsYXNzTmFtZSA/IChjbGFzc05hbWUgKyAnLicpIDogJyd9JHtmdW5jTmFtZX0oKScgYCArXG4gICAgICAgICAgICBgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBjbGFzcyAke2V4cGVjdGVkQ2xhc3MubmFtZX0uYDtcbiAgICB9LFxuICAgICdtaXNzaW5nLWEtbWV0aG9kJzogKHsgZXhwZWN0ZWRNZXRob2QsIHBhcmFtTmFtZSwgbW9kdWxlTmFtZSwgY2xhc3NOYW1lLCBmdW5jTmFtZSB9KSA9PiB7XG4gICAgICAgIGlmICghZXhwZWN0ZWRNZXRob2QgfHwgIXBhcmFtTmFtZSB8fCAhbW9kdWxlTmFtZSB8fCAhY2xhc3NOYW1lXG4gICAgICAgICAgICB8fCAhZnVuY05hbWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBpbnB1dCB0byAnbWlzc2luZy1hLW1ldGhvZCcgZXJyb3IuYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAke21vZHVsZU5hbWV9LiR7Y2xhc3NOYW1lfS4ke2Z1bmNOYW1lfSgpIGV4cGVjdGVkIHRoZSBgICtcbiAgICAgICAgICAgIGAnJHtwYXJhbU5hbWV9JyBwYXJhbWV0ZXIgdG8gZXhwb3NlIGEgJyR7ZXhwZWN0ZWRNZXRob2R9JyBtZXRob2QuYDtcbiAgICB9LFxuICAgICdhZGQtdG8tY2FjaGUtbGlzdC11bmV4cGVjdGVkLXR5cGUnOiAoeyBlbnRyeSB9KSA9PiB7XG4gICAgICAgIHJldHVybiBgQW4gdW5leHBlY3RlZCBlbnRyeSB3YXMgcGFzc2VkIHRvIGAgK1xuICAgICAgICAgICAgYCd3b3JrYm94LXByZWNhY2hpbmcuUHJlY2FjaGVDb250cm9sbGVyLmFkZFRvQ2FjaGVMaXN0KCknIFRoZSBlbnRyeSBgICtcbiAgICAgICAgICAgIGAnJHtKU09OLnN0cmluZ2lmeShlbnRyeSl9JyBpc24ndCBzdXBwb3J0ZWQuIFlvdSBtdXN0IHN1cHBseSBhbiBhcnJheSBvZiBgICtcbiAgICAgICAgICAgIGBzdHJpbmdzIHdpdGggb25lIG9yIG1vcmUgY2hhcmFjdGVycywgb2JqZWN0cyB3aXRoIGEgdXJsIHByb3BlcnR5IG9yIGAgK1xuICAgICAgICAgICAgYFJlcXVlc3Qgb2JqZWN0cy5gO1xuICAgIH0sXG4gICAgJ2FkZC10by1jYWNoZS1saXN0LWNvbmZsaWN0aW5nLWVudHJpZXMnOiAoeyBmaXJzdEVudHJ5LCBzZWNvbmRFbnRyeSB9KSA9PiB7XG4gICAgICAgIGlmICghZmlyc3RFbnRyeSB8fCAhc2Vjb25kRW50cnkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBpbnB1dCB0byBgICtcbiAgICAgICAgICAgICAgICBgJ2FkZC10by1jYWNoZS1saXN0LWR1cGxpY2F0ZS1lbnRyaWVzJyBlcnJvci5gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYFR3byBvZiB0aGUgZW50cmllcyBwYXNzZWQgdG8gYCArXG4gICAgICAgICAgICBgJ3dvcmtib3gtcHJlY2FjaGluZy5QcmVjYWNoZUNvbnRyb2xsZXIuYWRkVG9DYWNoZUxpc3QoKScgaGFkIHRoZSBVUkwgYCArXG4gICAgICAgICAgICBgJHtmaXJzdEVudHJ5Ll9lbnRyeUlkfSBidXQgZGlmZmVyZW50IHJldmlzaW9uIGRldGFpbHMuIFdvcmtib3ggaXMgYCArXG4gICAgICAgICAgICBgdW5hYmxlIHRvIGNhY2hlIGFuZCB2ZXJzaW9uIHRoZSBhc3NldCBjb3JyZWN0bHkuIFBsZWFzZSByZW1vdmUgb25lIGAgK1xuICAgICAgICAgICAgYG9mIHRoZSBlbnRyaWVzLmA7XG4gICAgfSxcbiAgICAncGx1Z2luLWVycm9yLXJlcXVlc3Qtd2lsbC1mZXRjaCc6ICh7IHRocm93bkVycm9yIH0pID0+IHtcbiAgICAgICAgaWYgKCF0aHJvd25FcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIGlucHV0IHRvIGAgK1xuICAgICAgICAgICAgICAgIGAncGx1Z2luLWVycm9yLXJlcXVlc3Qtd2lsbC1mZXRjaCcsIGVycm9yLmApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgQW4gZXJyb3Igd2FzIHRocm93biBieSBhIHBsdWdpbnMgJ3JlcXVlc3RXaWxsRmV0Y2goKScgbWV0aG9kLiBgICtcbiAgICAgICAgICAgIGBUaGUgdGhyb3duIGVycm9yIG1lc3NhZ2Ugd2FzOiAnJHt0aHJvd25FcnJvci5tZXNzYWdlfScuYDtcbiAgICB9LFxuICAgICdpbnZhbGlkLWNhY2hlLW5hbWUnOiAoeyBjYWNoZU5hbWVJZCwgdmFsdWUgfSkgPT4ge1xuICAgICAgICBpZiAoIWNhY2hlTmFtZUlkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGEgJ2NhY2hlTmFtZUlkJyBmb3IgZXJyb3IgJ2ludmFsaWQtY2FjaGUtbmFtZSdgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYFlvdSBtdXN0IHByb3ZpZGUgYSBuYW1lIGNvbnRhaW5pbmcgYXQgbGVhc3Qgb25lIGNoYXJhY3RlciBmb3IgYCArXG4gICAgICAgICAgICBgc2V0Q2FjaGVEZXRhaWxzKHske2NhY2hlTmFtZUlkfTogJy4uLid9KS4gUmVjZWl2ZWQgYSB2YWx1ZSBvZiBgICtcbiAgICAgICAgICAgIGAnJHtKU09OLnN0cmluZ2lmeSh2YWx1ZSl9J2A7XG4gICAgfSxcbiAgICAndW5yZWdpc3Rlci1yb3V0ZS1idXQtbm90LWZvdW5kLXdpdGgtbWV0aG9kJzogKHsgbWV0aG9kIH0pID0+IHtcbiAgICAgICAgaWYgKCFtZXRob2QpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBpbnB1dCB0byBgICtcbiAgICAgICAgICAgICAgICBgJ3VucmVnaXN0ZXItcm91dGUtYnV0LW5vdC1mb3VuZC13aXRoLW1ldGhvZCcgZXJyb3IuYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGBUaGUgcm91dGUgeW91J3JlIHRyeWluZyB0byB1bnJlZ2lzdGVyIHdhcyBub3QgIHByZXZpb3VzbHkgYCArXG4gICAgICAgICAgICBgcmVnaXN0ZXJlZCBmb3IgdGhlIG1ldGhvZCB0eXBlICcke21ldGhvZH0nLmA7XG4gICAgfSxcbiAgICAndW5yZWdpc3Rlci1yb3V0ZS1yb3V0ZS1ub3QtcmVnaXN0ZXJlZCc6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBUaGUgcm91dGUgeW91J3JlIHRyeWluZyB0byB1bnJlZ2lzdGVyIHdhcyBub3QgcHJldmlvdXNseSBgICtcbiAgICAgICAgICAgIGByZWdpc3RlcmVkLmA7XG4gICAgfSxcbiAgICAncXVldWUtcmVwbGF5LWZhaWxlZCc6ICh7IG5hbWUgfSkgPT4ge1xuICAgICAgICByZXR1cm4gYFJlcGxheWluZyB0aGUgYmFja2dyb3VuZCBzeW5jIHF1ZXVlICcke25hbWV9JyBmYWlsZWQuYDtcbiAgICB9LFxuICAgICdkdXBsaWNhdGUtcXVldWUtbmFtZSc6ICh7IG5hbWUgfSkgPT4ge1xuICAgICAgICByZXR1cm4gYFRoZSBRdWV1ZSBuYW1lICcke25hbWV9JyBpcyBhbHJlYWR5IGJlaW5nIHVzZWQuIGAgK1xuICAgICAgICAgICAgYEFsbCBpbnN0YW5jZXMgb2YgYmFja2dyb3VuZFN5bmMuUXVldWUgbXVzdCBiZSBnaXZlbiB1bmlxdWUgbmFtZXMuYDtcbiAgICB9LFxuICAgICdleHBpcmVkLXRlc3Qtd2l0aG91dC1tYXgtYWdlJzogKHsgbWV0aG9kTmFtZSwgcGFyYW1OYW1lIH0pID0+IHtcbiAgICAgICAgcmV0dXJuIGBUaGUgJyR7bWV0aG9kTmFtZX0oKScgbWV0aG9kIGNhbiBvbmx5IGJlIHVzZWQgd2hlbiB0aGUgYCArXG4gICAgICAgICAgICBgJyR7cGFyYW1OYW1lfScgaXMgdXNlZCBpbiB0aGUgY29uc3RydWN0b3IuYDtcbiAgICB9LFxuICAgICd1bnN1cHBvcnRlZC1yb3V0ZS10eXBlJzogKHsgbW9kdWxlTmFtZSwgY2xhc3NOYW1lLCBmdW5jTmFtZSwgcGFyYW1OYW1lIH0pID0+IHtcbiAgICAgICAgcmV0dXJuIGBUaGUgc3VwcGxpZWQgJyR7cGFyYW1OYW1lfScgcGFyYW1ldGVyIHdhcyBhbiB1bnN1cHBvcnRlZCB0eXBlLiBgICtcbiAgICAgICAgICAgIGBQbGVhc2UgY2hlY2sgdGhlIGRvY3MgZm9yICR7bW9kdWxlTmFtZX0uJHtjbGFzc05hbWV9LiR7ZnVuY05hbWV9IGZvciBgICtcbiAgICAgICAgICAgIGB2YWxpZCBpbnB1dCB0eXBlcy5gO1xuICAgIH0sXG4gICAgJ25vdC1hcnJheS1vZi1jbGFzcyc6ICh7IHZhbHVlLCBleHBlY3RlZENsYXNzLCBtb2R1bGVOYW1lLCBjbGFzc05hbWUsIGZ1bmNOYW1lLCBwYXJhbU5hbWUgfSkgPT4ge1xuICAgICAgICByZXR1cm4gYFRoZSBzdXBwbGllZCAnJHtwYXJhbU5hbWV9JyBwYXJhbWV0ZXIgbXVzdCBiZSBhbiBhcnJheSBvZiBgICtcbiAgICAgICAgICAgIGAnJHtleHBlY3RlZENsYXNzfScgb2JqZWN0cy4gUmVjZWl2ZWQgJyR7SlNPTi5zdHJpbmdpZnkodmFsdWUpfSwnLiBgICtcbiAgICAgICAgICAgIGBQbGVhc2UgY2hlY2sgdGhlIGNhbGwgdG8gJHttb2R1bGVOYW1lfS4ke2NsYXNzTmFtZX0uJHtmdW5jTmFtZX0oKSBgICtcbiAgICAgICAgICAgIGB0byBmaXggdGhlIGlzc3VlLmA7XG4gICAgfSxcbiAgICAnbWF4LWVudHJpZXMtb3ItYWdlLXJlcXVpcmVkJzogKHsgbW9kdWxlTmFtZSwgY2xhc3NOYW1lLCBmdW5jTmFtZSB9KSA9PiB7XG4gICAgICAgIHJldHVybiBgWW91IG11c3QgZGVmaW5lIGVpdGhlciBjb25maWcubWF4RW50cmllcyBvciBjb25maWcubWF4QWdlU2Vjb25kc2AgK1xuICAgICAgICAgICAgYGluICR7bW9kdWxlTmFtZX0uJHtjbGFzc05hbWV9LiR7ZnVuY05hbWV9YDtcbiAgICB9LFxuICAgICdzdGF0dXNlcy1vci1oZWFkZXJzLXJlcXVpcmVkJzogKHsgbW9kdWxlTmFtZSwgY2xhc3NOYW1lLCBmdW5jTmFtZSB9KSA9PiB7XG4gICAgICAgIHJldHVybiBgWW91IG11c3QgZGVmaW5lIGVpdGhlciBjb25maWcuc3RhdHVzZXMgb3IgY29uZmlnLmhlYWRlcnNgICtcbiAgICAgICAgICAgIGBpbiAke21vZHVsZU5hbWV9LiR7Y2xhc3NOYW1lfS4ke2Z1bmNOYW1lfWA7XG4gICAgfSxcbiAgICAnaW52YWxpZC1zdHJpbmcnOiAoeyBtb2R1bGVOYW1lLCBmdW5jTmFtZSwgcGFyYW1OYW1lIH0pID0+IHtcbiAgICAgICAgaWYgKCFwYXJhbU5hbWUgfHwgIW1vZHVsZU5hbWUgfHwgIWZ1bmNOYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgaW5wdXQgdG8gJ2ludmFsaWQtc3RyaW5nJyBlcnJvci5gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYFdoZW4gdXNpbmcgc3RyaW5ncywgdGhlICcke3BhcmFtTmFtZX0nIHBhcmFtZXRlciBtdXN0IHN0YXJ0IHdpdGggYCArXG4gICAgICAgICAgICBgJ2h0dHAnIChmb3IgY3Jvc3Mtb3JpZ2luIG1hdGNoZXMpIG9yICcvJyAoZm9yIHNhbWUtb3JpZ2luIG1hdGNoZXMpLiBgICtcbiAgICAgICAgICAgIGBQbGVhc2Ugc2VlIHRoZSBkb2NzIGZvciAke21vZHVsZU5hbWV9LiR7ZnVuY05hbWV9KCkgZm9yIGAgK1xuICAgICAgICAgICAgYG1vcmUgaW5mby5gO1xuICAgIH0sXG4gICAgJ2NoYW5uZWwtbmFtZS1yZXF1aXJlZCc6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBZb3UgbXVzdCBwcm92aWRlIGEgY2hhbm5lbE5hbWUgdG8gY29uc3RydWN0IGEgYCArXG4gICAgICAgICAgICBgQnJvYWRjYXN0Q2FjaGVVcGRhdGUgaW5zdGFuY2UuYDtcbiAgICB9LFxuICAgICdpbnZhbGlkLXJlc3BvbnNlcy1hcmUtc2FtZS1hcmdzJzogKCkgPT4ge1xuICAgICAgICByZXR1cm4gYFRoZSBhcmd1bWVudHMgcGFzc2VkIGludG8gcmVzcG9uc2VzQXJlU2FtZSgpIGFwcGVhciB0byBiZSBgICtcbiAgICAgICAgICAgIGBpbnZhbGlkLiBQbGVhc2UgZW5zdXJlIHZhbGlkIFJlc3BvbnNlcyBhcmUgdXNlZC5gO1xuICAgIH0sXG4gICAgJ2V4cGlyZS1jdXN0b20tY2FjaGVzLW9ubHknOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgWW91IG11c3QgcHJvdmlkZSBhICdjYWNoZU5hbWUnIHByb3BlcnR5IHdoZW4gdXNpbmcgdGhlIGAgK1xuICAgICAgICAgICAgYGV4cGlyYXRpb24gcGx1Z2luIHdpdGggYSBydW50aW1lIGNhY2hpbmcgc3RyYXRlZ3kuYDtcbiAgICB9LFxuICAgICd1bml0LW11c3QtYmUtYnl0ZXMnOiAoeyBub3JtYWxpemVkUmFuZ2VIZWFkZXIgfSkgPT4ge1xuICAgICAgICBpZiAoIW5vcm1hbGl6ZWRSYW5nZUhlYWRlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIGlucHV0IHRvICd1bml0LW11c3QtYmUtYnl0ZXMnIGVycm9yLmApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgVGhlICd1bml0JyBwb3J0aW9uIG9mIHRoZSBSYW5nZSBoZWFkZXIgbXVzdCBiZSBzZXQgdG8gJ2J5dGVzJy4gYCArXG4gICAgICAgICAgICBgVGhlIFJhbmdlIGhlYWRlciBwcm92aWRlZCB3YXMgXCIke25vcm1hbGl6ZWRSYW5nZUhlYWRlcn1cImA7XG4gICAgfSxcbiAgICAnc2luZ2xlLXJhbmdlLW9ubHknOiAoeyBub3JtYWxpemVkUmFuZ2VIZWFkZXIgfSkgPT4ge1xuICAgICAgICBpZiAoIW5vcm1hbGl6ZWRSYW5nZUhlYWRlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIGlucHV0IHRvICdzaW5nbGUtcmFuZ2Utb25seScgZXJyb3IuYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGBNdWx0aXBsZSByYW5nZXMgYXJlIG5vdCBzdXBwb3J0ZWQuIFBsZWFzZSB1c2UgYSAgc2luZ2xlIHN0YXJ0IGAgK1xuICAgICAgICAgICAgYHZhbHVlLCBhbmQgb3B0aW9uYWwgZW5kIHZhbHVlLiBUaGUgUmFuZ2UgaGVhZGVyIHByb3ZpZGVkIHdhcyBgICtcbiAgICAgICAgICAgIGBcIiR7bm9ybWFsaXplZFJhbmdlSGVhZGVyfVwiYDtcbiAgICB9LFxuICAgICdpbnZhbGlkLXJhbmdlLXZhbHVlcyc6ICh7IG5vcm1hbGl6ZWRSYW5nZUhlYWRlciB9KSA9PiB7XG4gICAgICAgIGlmICghbm9ybWFsaXplZFJhbmdlSGVhZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgaW5wdXQgdG8gJ2ludmFsaWQtcmFuZ2UtdmFsdWVzJyBlcnJvci5gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYFRoZSBSYW5nZSBoZWFkZXIgaXMgbWlzc2luZyBib3RoIHN0YXJ0IGFuZCBlbmQgdmFsdWVzLiBBdCBsZWFzdCBgICtcbiAgICAgICAgICAgIGBvbmUgb2YgdGhvc2UgdmFsdWVzIGlzIG5lZWRlZC4gVGhlIFJhbmdlIGhlYWRlciBwcm92aWRlZCB3YXMgYCArXG4gICAgICAgICAgICBgXCIke25vcm1hbGl6ZWRSYW5nZUhlYWRlcn1cImA7XG4gICAgfSxcbiAgICAnbm8tcmFuZ2UtaGVhZGVyJzogKCkgPT4ge1xuICAgICAgICByZXR1cm4gYE5vIFJhbmdlIGhlYWRlciB3YXMgZm91bmQgaW4gdGhlIFJlcXVlc3QgcHJvdmlkZWQuYDtcbiAgICB9LFxuICAgICdyYW5nZS1ub3Qtc2F0aXNmaWFibGUnOiAoeyBzaXplLCBzdGFydCwgZW5kIH0pID0+IHtcbiAgICAgICAgcmV0dXJuIGBUaGUgc3RhcnQgKCR7c3RhcnR9KSBhbmQgZW5kICgke2VuZH0pIHZhbHVlcyBpbiB0aGUgUmFuZ2UgYXJlIGAgK1xuICAgICAgICAgICAgYG5vdCBzYXRpc2ZpYWJsZSBieSB0aGUgY2FjaGVkIHJlc3BvbnNlLCB3aGljaCBpcyAke3NpemV9IGJ5dGVzLmA7XG4gICAgfSxcbiAgICAnYXR0ZW1wdC10by1jYWNoZS1ub24tZ2V0LXJlcXVlc3QnOiAoeyB1cmwsIG1ldGhvZCB9KSA9PiB7XG4gICAgICAgIHJldHVybiBgVW5hYmxlIHRvIGNhY2hlICcke3VybH0nIGJlY2F1c2UgaXQgaXMgYSAnJHttZXRob2R9JyByZXF1ZXN0IGFuZCBgICtcbiAgICAgICAgICAgIGBvbmx5ICdHRVQnIHJlcXVlc3RzIGNhbiBiZSBjYWNoZWQuYDtcbiAgICB9LFxuICAgICdjYWNoZS1wdXQtd2l0aC1uby1yZXNwb25zZSc6ICh7IHVybCB9KSA9PiB7XG4gICAgICAgIHJldHVybiBgVGhlcmUgd2FzIGFuIGF0dGVtcHQgdG8gY2FjaGUgJyR7dXJsfScgYnV0IHRoZSByZXNwb25zZSB3YXMgbm90IGAgK1xuICAgICAgICAgICAgYGRlZmluZWQuYDtcbiAgICB9LFxuICAgICduby1yZXNwb25zZSc6ICh7IHVybCwgZXJyb3IgfSkgPT4ge1xuICAgICAgICBsZXQgbWVzc2FnZSA9IGBUaGUgc3RyYXRlZ3kgY291bGQgbm90IGdlbmVyYXRlIGEgcmVzcG9uc2UgZm9yICcke3VybH0nLmA7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgbWVzc2FnZSArPSBgIFRoZSB1bmRlcmx5aW5nIGVycm9yIGlzICR7ZXJyb3J9LmA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfSxcbiAgICAnYmFkLXByZWNhY2hpbmctcmVzcG9uc2UnOiAoeyB1cmwsIHN0YXR1cyB9KSA9PiB7XG4gICAgICAgIHJldHVybiBgVGhlIHByZWNhY2hpbmcgcmVxdWVzdCBmb3IgJyR7dXJsfScgZmFpbGVkYCArXG4gICAgICAgICAgICAoc3RhdHVzID8gYCB3aXRoIGFuIEhUVFAgc3RhdHVzIG9mICR7c3RhdHVzfS5gIDogYC5gKTtcbiAgICB9LFxuICAgICdub24tcHJlY2FjaGVkLXVybCc6ICh7IHVybCB9KSA9PiB7XG4gICAgICAgIHJldHVybiBgY3JlYXRlSGFuZGxlckJvdW5kVG9VUkwoJyR7dXJsfScpIHdhcyBjYWxsZWQsIGJ1dCB0aGF0IFVSTCBpcyBgICtcbiAgICAgICAgICAgIGBub3QgcHJlY2FjaGVkLiBQbGVhc2UgcGFzcyBpbiBhIFVSTCB0aGF0IGlzIHByZWNhY2hlZCBpbnN0ZWFkLmA7XG4gICAgfSxcbiAgICAnYWRkLXRvLWNhY2hlLWxpc3QtY29uZmxpY3RpbmctaW50ZWdyaXRpZXMnOiAoeyB1cmwgfSkgPT4ge1xuICAgICAgICByZXR1cm4gYFR3byBvZiB0aGUgZW50cmllcyBwYXNzZWQgdG8gYCArXG4gICAgICAgICAgICBgJ3dvcmtib3gtcHJlY2FjaGluZy5QcmVjYWNoZUNvbnRyb2xsZXIuYWRkVG9DYWNoZUxpc3QoKScgaGFkIHRoZSBVUkwgYCArXG4gICAgICAgICAgICBgJHt1cmx9IHdpdGggZGlmZmVyZW50IGludGVncml0eSB2YWx1ZXMuIFBsZWFzZSByZW1vdmUgb25lIG9mIHRoZW0uYDtcbiAgICB9LFxuICAgICdtaXNzaW5nLXByZWNhY2hlLWVudHJ5JzogKHsgY2FjaGVOYW1lLCB1cmwgfSkgPT4ge1xuICAgICAgICByZXR1cm4gYFVuYWJsZSB0byBmaW5kIGEgcHJlY2FjaGVkIHJlc3BvbnNlIGluICR7Y2FjaGVOYW1lfSBmb3IgJHt1cmx9LmA7XG4gICAgfSxcbiAgICAnY3Jvc3Mtb3JpZ2luLWNvcHktcmVzcG9uc2UnOiAoeyBvcmlnaW4gfSkgPT4ge1xuICAgICAgICByZXR1cm4gYHdvcmtib3gtY29yZS5jb3B5UmVzcG9uc2UoKSBjYW4gb25seSBiZSB1c2VkIHdpdGggc2FtZS1vcmlnaW4gYCArXG4gICAgICAgICAgICBgcmVzcG9uc2VzLiBJdCB3YXMgcGFzc2VkIGEgcmVzcG9uc2Ugd2l0aCBvcmlnaW4gJHtvcmlnaW59LmA7XG4gICAgfSxcbn07XG4iLCIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8vIENhbGxiYWNrcyB0byBiZSBleGVjdXRlZCB3aGVuZXZlciB0aGVyZSdzIGEgcXVvdGEgZXJyb3IuXG5jb25zdCBxdW90YUVycm9yQ2FsbGJhY2tzID0gbmV3IFNldCgpO1xuZXhwb3J0IHsgcXVvdGFFcnJvckNhbGxiYWNrcyB9O1xuIiwiLypcbiAgQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi9fcHJpdmF0ZS9hc3NlcnQuanMnO1xuaW1wb3J0IHsgcXVvdGFFcnJvckNhbGxiYWNrcyB9IGZyb20gJy4vbW9kZWxzL3F1b3RhRXJyb3JDYWxsYmFja3MuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogQWRkcyBhIGZ1bmN0aW9uIHRvIHRoZSBzZXQgb2YgcXVvdGFFcnJvckNhbGxiYWNrcyB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgaWZcbiAqIHRoZXJlJ3MgYSBxdW90YSBlcnJvci5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQG1lbWJlcm9mIG1vZHVsZTp3b3JrYm94LWNvcmVcbiAqL1xuZnVuY3Rpb24gcmVnaXN0ZXJRdW90YUVycm9yQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBhc3NlcnQuaXNUeXBlKGNhbGxiYWNrLCAnZnVuY3Rpb24nLCB7XG4gICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1jb3JlJyxcbiAgICAgICAgICAgIGZ1bmNOYW1lOiAncmVnaXN0ZXInLFxuICAgICAgICAgICAgcGFyYW1OYW1lOiAnY2FsbGJhY2snLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcXVvdGFFcnJvckNhbGxiYWNrcy5hZGQoY2FsbGJhY2spO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGxvZ2dlci5sb2coJ1JlZ2lzdGVyZWQgYSBjYWxsYmFjayB0byByZXNwb25kIHRvIHF1b3RhIGVycm9ycy4nLCBjYWxsYmFjayk7XG4gICAgfVxufVxuZXhwb3J0IHsgcmVnaXN0ZXJRdW90YUVycm9yQ2FsbGJhY2sgfTtcbiIsIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9hc3NlcnQuanMnO1xuaW1wb3J0IHsgZG9udFdhaXRGb3IgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvZG9udFdhaXRGb3IuanMnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2xvZ2dlci5qcyc7XG5pbXBvcnQgeyBXb3JrYm94RXJyb3IgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvV29ya2JveEVycm9yLmpzJztcbmltcG9ydCB7IENhY2hlVGltZXN0YW1wc01vZGVsIH0gZnJvbSAnLi9tb2RlbHMvQ2FjaGVUaW1lc3RhbXBzTW9kZWwuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogVGhlIGBDYWNoZUV4cGlyYXRpb25gIGNsYXNzIGFsbG93cyB5b3UgZGVmaW5lIGFuIGV4cGlyYXRpb24gYW5kIC8gb3JcbiAqIGxpbWl0IG9uIHRoZSBudW1iZXIgb2YgcmVzcG9uc2VzIHN0b3JlZCBpbiBhXG4gKiBbYENhY2hlYF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0NhY2hlKS5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOndvcmtib3gtZXhwaXJhdGlvblxuICovXG5jbGFzcyBDYWNoZUV4cGlyYXRpb24ge1xuICAgIC8qKlxuICAgICAqIFRvIGNvbnN0cnVjdCBhIG5ldyBDYWNoZUV4cGlyYXRpb24gaW5zdGFuY2UgeW91IG11c3QgcHJvdmlkZSBhdCBsZWFzdFxuICAgICAqIG9uZSBvZiB0aGUgYGNvbmZpZ2AgcHJvcGVydGllcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjYWNoZU5hbWUgTmFtZSBvZiB0aGUgY2FjaGUgdG8gYXBwbHkgcmVzdHJpY3Rpb25zIHRvLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2NvbmZpZy5tYXhFbnRyaWVzXSBUaGUgbWF4aW11bSBudW1iZXIgb2YgZW50cmllcyB0byBjYWNoZS5cbiAgICAgKiBFbnRyaWVzIHVzZWQgdGhlIGxlYXN0IHdpbGwgYmUgcmVtb3ZlZCBhcyB0aGUgbWF4aW11bSBpcyByZWFjaGVkLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbY29uZmlnLm1heEFnZVNlY29uZHNdIFRoZSBtYXhpbXVtIGFnZSBvZiBhbiBlbnRyeSBiZWZvcmVcbiAgICAgKiBpdCdzIHRyZWF0ZWQgYXMgc3RhbGUgYW5kIHJlbW92ZWQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtjb25maWcubWF0Y2hPcHRpb25zXSBUaGUgW2BDYWNoZVF1ZXJ5T3B0aW9uc2BdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DYWNoZS9kZWxldGUjUGFyYW1ldGVycylcbiAgICAgKiB0aGF0IHdpbGwgYmUgdXNlZCB3aGVuIGNhbGxpbmcgYGRlbGV0ZSgpYCBvbiB0aGUgY2FjaGUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY2FjaGVOYW1lLCBjb25maWcgPSB7fSkge1xuICAgICAgICB0aGlzLl9pc1J1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcmVydW5SZXF1ZXN0ZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc1R5cGUoY2FjaGVOYW1lLCAnc3RyaW5nJywge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWV4cGlyYXRpb24nLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ0NhY2hlRXhwaXJhdGlvbicsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6ICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAnY2FjaGVOYW1lJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCEoY29uZmlnLm1heEVudHJpZXMgfHwgY29uZmlnLm1heEFnZVNlY29uZHMpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignbWF4LWVudHJpZXMtb3ItYWdlLXJlcXVpcmVkJywge1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1leHBpcmF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnQ2FjaGVFeHBpcmF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6ICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29uZmlnLm1heEVudHJpZXMpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQuaXNUeXBlKGNvbmZpZy5tYXhFbnRyaWVzLCAnbnVtYmVyJywge1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1leHBpcmF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnQ2FjaGVFeHBpcmF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6ICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2NvbmZpZy5tYXhFbnRyaWVzJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb25maWcubWF4QWdlU2Vjb25kcykge1xuICAgICAgICAgICAgICAgIGFzc2VydC5pc1R5cGUoY29uZmlnLm1heEFnZVNlY29uZHMsICdudW1iZXInLCB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWV4cGlyYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdDYWNoZUV4cGlyYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2NvbnN0cnVjdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAnY29uZmlnLm1heEFnZVNlY29uZHMnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21heEVudHJpZXMgPSBjb25maWcubWF4RW50cmllcztcbiAgICAgICAgdGhpcy5fbWF4QWdlU2Vjb25kcyA9IGNvbmZpZy5tYXhBZ2VTZWNvbmRzO1xuICAgICAgICB0aGlzLl9tYXRjaE9wdGlvbnMgPSBjb25maWcubWF0Y2hPcHRpb25zO1xuICAgICAgICB0aGlzLl9jYWNoZU5hbWUgPSBjYWNoZU5hbWU7XG4gICAgICAgIHRoaXMuX3RpbWVzdGFtcE1vZGVsID0gbmV3IENhY2hlVGltZXN0YW1wc01vZGVsKGNhY2hlTmFtZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEV4cGlyZXMgZW50cmllcyBmb3IgdGhlIGdpdmVuIGNhY2hlIGFuZCBnaXZlbiBjcml0ZXJpYS5cbiAgICAgKi9cbiAgICBhc3luYyBleHBpcmVFbnRyaWVzKCkge1xuICAgICAgICBpZiAodGhpcy5faXNSdW5uaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXJ1blJlcXVlc3RlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNSdW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgbWluVGltZXN0YW1wID0gdGhpcy5fbWF4QWdlU2Vjb25kcyA/XG4gICAgICAgICAgICBEYXRlLm5vdygpIC0gKHRoaXMuX21heEFnZVNlY29uZHMgKiAxMDAwKSA6IDA7XG4gICAgICAgIGNvbnN0IHVybHNFeHBpcmVkID0gYXdhaXQgdGhpcy5fdGltZXN0YW1wTW9kZWwuZXhwaXJlRW50cmllcyhtaW5UaW1lc3RhbXAsIHRoaXMuX21heEVudHJpZXMpO1xuICAgICAgICAvLyBEZWxldGUgVVJMcyBmcm9tIHRoZSBjYWNoZVxuICAgICAgICBjb25zdCBjYWNoZSA9IGF3YWl0IHNlbGYuY2FjaGVzLm9wZW4odGhpcy5fY2FjaGVOYW1lKTtcbiAgICAgICAgZm9yIChjb25zdCB1cmwgb2YgdXJsc0V4cGlyZWQpIHtcbiAgICAgICAgICAgIGF3YWl0IGNhY2hlLmRlbGV0ZSh1cmwsIHRoaXMuX21hdGNoT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGlmICh1cmxzRXhwaXJlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmdyb3VwQ29sbGFwc2VkKGBFeHBpcmVkICR7dXJsc0V4cGlyZWQubGVuZ3RofSBgICtcbiAgICAgICAgICAgICAgICAgICAgYCR7dXJsc0V4cGlyZWQubGVuZ3RoID09PSAxID8gJ2VudHJ5JyA6ICdlbnRyaWVzJ30gYW5kIHJlbW92ZWQgYCArXG4gICAgICAgICAgICAgICAgICAgIGAke3VybHNFeHBpcmVkLmxlbmd0aCA9PT0gMSA/ICdpdCcgOiAndGhlbSd9IGZyb20gdGhlIGAgK1xuICAgICAgICAgICAgICAgICAgICBgJyR7dGhpcy5fY2FjaGVOYW1lfScgY2FjaGUuYCk7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgRXhwaXJlZCB0aGUgZm9sbG93aW5nICR7dXJsc0V4cGlyZWQubGVuZ3RoID09PSAxID9cbiAgICAgICAgICAgICAgICAgICAgJ1VSTCcgOiAnVVJMcyd9OmApO1xuICAgICAgICAgICAgICAgIHVybHNFeHBpcmVkLmZvckVhY2goKHVybCkgPT4gbG9nZ2VyLmxvZyhgICAgICR7dXJsfWApKTtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZ3JvdXBFbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgQ2FjaGUgZXhwaXJhdGlvbiByYW4gYW5kIGZvdW5kIG5vIGVudHJpZXMgdG8gcmVtb3ZlLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzUnVubmluZyA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5fcmVydW5SZXF1ZXN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlcnVuUmVxdWVzdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBkb250V2FpdEZvcih0aGlzLmV4cGlyZUVudHJpZXMoKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSB0aW1lc3RhbXAgZm9yIHRoZSBnaXZlbiBVUkwuIFRoaXMgZW5zdXJlcyB0aGUgd2hlblxuICAgICAqIHJlbW92aW5nIGVudHJpZXMgYmFzZWQgb24gbWF4aW11bSBlbnRyaWVzLCBtb3N0IHJlY2VudGx5IHVzZWRcbiAgICAgKiBpcyBhY2N1cmF0ZSBvciB3aGVuIGV4cGlyaW5nLCB0aGUgdGltZXN0YW1wIGlzIHVwLXRvLWRhdGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlVGltZXN0YW1wKHVybCkge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHlwZSh1cmwsICdzdHJpbmcnLCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtZXhwaXJhdGlvbicsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnQ2FjaGVFeHBpcmF0aW9uJyxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ3VwZGF0ZVRpbWVzdGFtcCcsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAndXJsJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuX3RpbWVzdGFtcE1vZGVsLnNldFRpbWVzdGFtcCh1cmwsIERhdGUubm93KCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYW4gYmUgdXNlZCB0byBjaGVjayBpZiBhIFVSTCBoYXMgZXhwaXJlZCBvciBub3QgYmVmb3JlIGl0J3MgdXNlZC5cbiAgICAgKlxuICAgICAqIFRoaXMgcmVxdWlyZXMgYSBsb29rIHVwIGZyb20gSW5kZXhlZERCLCBzbyBjYW4gYmUgc2xvdy5cbiAgICAgKlxuICAgICAqIE5vdGU6IFRoaXMgbWV0aG9kIHdpbGwgbm90IHJlbW92ZSB0aGUgY2FjaGVkIGVudHJ5LCBjYWxsXG4gICAgICogYGV4cGlyZUVudHJpZXMoKWAgdG8gcmVtb3ZlIGluZGV4ZWREQiBhbmQgQ2FjaGUgZW50cmllcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIGFzeW5jIGlzVVJMRXhwaXJlZCh1cmwpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9tYXhBZ2VTZWNvbmRzKSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoYGV4cGlyZWQtdGVzdC13aXRob3V0LW1heC1hZ2VgLCB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZE5hbWU6ICdpc1VSTEV4cGlyZWQnLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdtYXhBZ2VTZWNvbmRzJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IGF3YWl0IHRoaXMuX3RpbWVzdGFtcE1vZGVsLmdldFRpbWVzdGFtcCh1cmwpO1xuICAgICAgICAgICAgY29uc3QgZXhwaXJlT2xkZXJUaGFuID0gRGF0ZS5ub3coKSAtICh0aGlzLl9tYXhBZ2VTZWNvbmRzICogMTAwMCk7XG4gICAgICAgICAgICByZXR1cm4gKHRpbWVzdGFtcCA8IGV4cGlyZU9sZGVyVGhhbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgSW5kZXhlZERCIG9iamVjdCBzdG9yZSB1c2VkIHRvIGtlZXAgdHJhY2sgb2YgY2FjaGUgZXhwaXJhdGlvblxuICAgICAqIG1ldGFkYXRhLlxuICAgICAqL1xuICAgIGFzeW5jIGRlbGV0ZSgpIHtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGRvbid0IGF0dGVtcHQgYW5vdGhlciByZXJ1biBpZiB3ZSdyZSBjYWxsZWQgaW4gdGhlIG1pZGRsZSBvZlxuICAgICAgICAvLyBhIGNhY2hlIGV4cGlyYXRpb24uXG4gICAgICAgIHRoaXMuX3JlcnVuUmVxdWVzdGVkID0gZmFsc2U7XG4gICAgICAgIGF3YWl0IHRoaXMuX3RpbWVzdGFtcE1vZGVsLmV4cGlyZUVudHJpZXMoSW5maW5pdHkpOyAvLyBFeHBpcmVzIGFsbC5cbiAgICB9XG59XG5leHBvcnQgeyBDYWNoZUV4cGlyYXRpb24gfTtcbiIsIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9hc3NlcnQuanMnO1xuaW1wb3J0IHsgY2FjaGVOYW1lcyB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9jYWNoZU5hbWVzLmpzJztcbmltcG9ydCB7IGRvbnRXYWl0Rm9yIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2RvbnRXYWl0Rm9yLmpzJztcbmltcG9ydCB7IGdldEZyaWVuZGx5VVJMIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2dldEZyaWVuZGx5VVJMLmpzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgcmVnaXN0ZXJRdW90YUVycm9yQ2FsbGJhY2sgfSBmcm9tICd3b3JrYm94LWNvcmUvcmVnaXN0ZXJRdW90YUVycm9yQ2FsbGJhY2suanMnO1xuaW1wb3J0IHsgV29ya2JveEVycm9yIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL1dvcmtib3hFcnJvci5qcyc7XG5pbXBvcnQgeyBDYWNoZUV4cGlyYXRpb24gfSBmcm9tICcuL0NhY2hlRXhwaXJhdGlvbi5qcyc7XG5pbXBvcnQgJy4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBUaGlzIHBsdWdpbiBjYW4gYmUgdXNlZCBpbiBhIGB3b3JrYm94LXN0cmF0ZWd5YCB0byByZWd1bGFybHkgZW5mb3JjZSBhXG4gKiBsaW1pdCBvbiB0aGUgYWdlIGFuZCAvIG9yIHRoZSBudW1iZXIgb2YgY2FjaGVkIHJlcXVlc3RzLlxuICpcbiAqIEl0IGNhbiBvbmx5IGJlIHVzZWQgd2l0aCBgd29ya2JveC1zdHJhdGVneWAgaW5zdGFuY2VzIHRoYXQgaGF2ZSBhXG4gKiBbY3VzdG9tIGBjYWNoZU5hbWVgIHByb3BlcnR5IHNldF0oL3dlYi90b29scy93b3JrYm94L2d1aWRlcy9jb25maWd1cmUtd29ya2JveCNjdXN0b21fY2FjaGVfbmFtZXNfaW5fc3RyYXRlZ2llcykuXG4gKiBJbiBvdGhlciB3b3JkcywgaXQgY2FuJ3QgYmUgdXNlZCB0byBleHBpcmUgZW50cmllcyBpbiBzdHJhdGVneSB0aGF0IHVzZXMgdGhlXG4gKiBkZWZhdWx0IHJ1bnRpbWUgY2FjaGUgbmFtZS5cbiAqXG4gKiBXaGVuZXZlciBhIGNhY2hlZCByZXF1ZXN0IGlzIHVzZWQgb3IgdXBkYXRlZCwgdGhpcyBwbHVnaW4gd2lsbCBsb29rXG4gKiBhdCB0aGUgYXNzb2NpYXRlZCBjYWNoZSBhbmQgcmVtb3ZlIGFueSBvbGQgb3IgZXh0cmEgcmVxdWVzdHMuXG4gKlxuICogV2hlbiB1c2luZyBgbWF4QWdlU2Vjb25kc2AsIHJlcXVlc3RzIG1heSBiZSB1c2VkICpvbmNlKiBhZnRlciBleHBpcmluZ1xuICogYmVjYXVzZSB0aGUgZXhwaXJhdGlvbiBjbGVhbiB1cCB3aWxsIG5vdCBoYXZlIG9jY3VycmVkIHVudGlsICphZnRlciogdGhlXG4gKiBjYWNoZWQgcmVxdWVzdCBoYXMgYmVlbiB1c2VkLiBJZiB0aGUgcmVxdWVzdCBoYXMgYSBcIkRhdGVcIiBoZWFkZXIsIHRoZW5cbiAqIGEgbGlnaHQgd2VpZ2h0IGV4cGlyYXRpb24gY2hlY2sgaXMgcGVyZm9ybWVkIGFuZCB0aGUgcmVxdWVzdCB3aWxsIG5vdCBiZVxuICogdXNlZCBpbW1lZGlhdGVseS5cbiAqXG4gKiBXaGVuIHVzaW5nIGBtYXhFbnRyaWVzYCwgdGhlIGVudHJ5IGxlYXN0LXJlY2VudGx5IHJlcXVlc3RlZCB3aWxsIGJlIHJlbW92ZWRcbiAqIGZyb20gdGhlIGNhY2hlIGZpcnN0LlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6d29ya2JveC1leHBpcmF0aW9uXG4gKi9cbmNsYXNzIEV4cGlyYXRpb25QbHVnaW4ge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2NvbmZpZy5tYXhFbnRyaWVzXSBUaGUgbWF4aW11bSBudW1iZXIgb2YgZW50cmllcyB0byBjYWNoZS5cbiAgICAgKiBFbnRyaWVzIHVzZWQgdGhlIGxlYXN0IHdpbGwgYmUgcmVtb3ZlZCBhcyB0aGUgbWF4aW11bSBpcyByZWFjaGVkLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbY29uZmlnLm1heEFnZVNlY29uZHNdIFRoZSBtYXhpbXVtIGFnZSBvZiBhbiBlbnRyeSBiZWZvcmVcbiAgICAgKiBpdCdzIHRyZWF0ZWQgYXMgc3RhbGUgYW5kIHJlbW92ZWQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtjb25maWcubWF0Y2hPcHRpb25zXSBUaGUgW2BDYWNoZVF1ZXJ5T3B0aW9uc2BdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DYWNoZS9kZWxldGUjUGFyYW1ldGVycylcbiAgICAgKiB0aGF0IHdpbGwgYmUgdXNlZCB3aGVuIGNhbGxpbmcgYGRlbGV0ZSgpYCBvbiB0aGUgY2FjaGUuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbY29uZmlnLnB1cmdlT25RdW90YUVycm9yXSBXaGV0aGVyIHRvIG9wdCB0aGlzIGNhY2hlIGluIHRvXG4gICAgICogYXV0b21hdGljIGRlbGV0aW9uIGlmIHRoZSBhdmFpbGFibGUgc3RvcmFnZSBxdW90YSBoYXMgYmVlbiBleGNlZWRlZC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcgPSB7fSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBcImxpZmVjeWNsZVwiIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSB0cmlnZ2VyZWQgYXV0b21hdGljYWxseSBieSB0aGVcbiAgICAgICAgICogYHdvcmtib3gtc3RyYXRlZ2llc2AgaGFuZGxlcnMgd2hlbiBhIGBSZXNwb25zZWAgaXMgYWJvdXQgdG8gYmUgcmV0dXJuZWRcbiAgICAgICAgICogZnJvbSBhIFtDYWNoZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0NhY2hlKSB0b1xuICAgICAgICAgKiB0aGUgaGFuZGxlci4gSXQgYWxsb3dzIHRoZSBgUmVzcG9uc2VgIHRvIGJlIGluc3BlY3RlZCBmb3IgZnJlc2huZXNzIGFuZFxuICAgICAgICAgKiBwcmV2ZW50cyBpdCBmcm9tIGJlaW5nIHVzZWQgaWYgdGhlIGBSZXNwb25zZWAncyBgRGF0ZWAgaGVhZGVyIHZhbHVlIGlzXG4gICAgICAgICAqIG9sZGVyIHRoYW4gdGhlIGNvbmZpZ3VyZWQgYG1heEFnZVNlY29uZHNgLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jYWNoZU5hbWUgTmFtZSBvZiB0aGUgY2FjaGUgdGhlIHJlc3BvbnNlIGlzIGluLlxuICAgICAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBvcHRpb25zLmNhY2hlZFJlc3BvbnNlIFRoZSBgUmVzcG9uc2VgIG9iamVjdCB0aGF0J3MgYmVlblxuICAgICAgICAgKiAgICAgcmVhZCBmcm9tIGEgY2FjaGUgYW5kIHdob3NlIGZyZXNobmVzcyBzaG91bGQgYmUgY2hlY2tlZC5cbiAgICAgICAgICogQHJldHVybiB7UmVzcG9uc2V9IEVpdGhlciB0aGUgYGNhY2hlZFJlc3BvbnNlYCwgaWYgaXQnc1xuICAgICAgICAgKiAgICAgZnJlc2gsIG9yIGBudWxsYCBpZiB0aGUgYFJlc3BvbnNlYCBpcyBvbGRlciB0aGFuIGBtYXhBZ2VTZWNvbmRzYC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2FjaGVkUmVzcG9uc2VXaWxsQmVVc2VkID0gYXN5bmMgKHsgZXZlbnQsIHJlcXVlc3QsIGNhY2hlTmFtZSwgY2FjaGVkUmVzcG9uc2UgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFjYWNoZWRSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaXNGcmVzaCA9IHRoaXMuX2lzUmVzcG9uc2VEYXRlRnJlc2goY2FjaGVkUmVzcG9uc2UpO1xuICAgICAgICAgICAgLy8gRXhwaXJlIGVudHJpZXMgdG8gZW5zdXJlIHRoYXQgZXZlbiBpZiB0aGUgZXhwaXJhdGlvbiBkYXRlIGhhc1xuICAgICAgICAgICAgLy8gZXhwaXJlZCwgaXQnbGwgb25seSBiZSB1c2VkIG9uY2UuXG4gICAgICAgICAgICBjb25zdCBjYWNoZUV4cGlyYXRpb24gPSB0aGlzLl9nZXRDYWNoZUV4cGlyYXRpb24oY2FjaGVOYW1lKTtcbiAgICAgICAgICAgIGRvbnRXYWl0Rm9yKGNhY2hlRXhwaXJhdGlvbi5leHBpcmVFbnRyaWVzKCkpO1xuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBtZXRhZGF0YSBmb3IgdGhlIHJlcXVlc3QgVVJMIHRvIHRoZSBjdXJyZW50IHRpbWVzdGFtcCxcbiAgICAgICAgICAgIC8vIGJ1dCBkb24ndCBgYXdhaXRgIGl0IGFzIHdlIGRvbid0IHdhbnQgdG8gYmxvY2sgdGhlIHJlc3BvbnNlLlxuICAgICAgICAgICAgY29uc3QgdXBkYXRlVGltZXN0YW1wRG9uZSA9IGNhY2hlRXhwaXJhdGlvbi51cGRhdGVUaW1lc3RhbXAocmVxdWVzdC51cmwpO1xuICAgICAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQud2FpdFVudGlsKHVwZGF0ZVRpbWVzdGFtcERvbmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBldmVudCBtYXkgbm90IGJlIGEgZmV0Y2ggZXZlbnQ7IG9ubHkgbG9nIHRoZSBVUkwgaWYgaXQgaXMuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJ3JlcXVlc3QnIGluIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLndhcm4oYFVuYWJsZSB0byBlbnN1cmUgc2VydmljZSB3b3JrZXIgc3RheXMgYWxpdmUgd2hlbiBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYHVwZGF0aW5nIGNhY2hlIGVudHJ5IGZvciBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYCcke2dldEZyaWVuZGx5VVJMKGV2ZW50LnJlcXVlc3QudXJsKX0nLmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGlzRnJlc2ggPyBjYWNoZWRSZXNwb25zZSA6IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIFwibGlmZWN5Y2xlXCIgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIHRyaWdnZXJlZCBhdXRvbWF0aWNhbGx5IGJ5IHRoZVxuICAgICAgICAgKiBgd29ya2JveC1zdHJhdGVnaWVzYCBoYW5kbGVycyB3aGVuIGFuIGVudHJ5IGlzIGFkZGVkIHRvIGEgY2FjaGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNhY2hlTmFtZSBOYW1lIG9mIHRoZSBjYWNoZSB0aGF0IHdhcyB1cGRhdGVkLlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yZXF1ZXN0IFRoZSBSZXF1ZXN0IGZvciB0aGUgY2FjaGVkIGVudHJ5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jYWNoZURpZFVwZGF0ZSA9IGFzeW5jICh7IGNhY2hlTmFtZSwgcmVxdWVzdCB9KSA9PiB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGFzc2VydC5pc1R5cGUoY2FjaGVOYW1lLCAnc3RyaW5nJywge1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1leHBpcmF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUGx1Z2luJyxcbiAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6ICdjYWNoZURpZFVwZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2NhY2hlTmFtZScsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LmlzSW5zdGFuY2UocmVxdWVzdCwgUmVxdWVzdCwge1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1leHBpcmF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUGx1Z2luJyxcbiAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6ICdjYWNoZURpZFVwZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ3JlcXVlc3QnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY2FjaGVFeHBpcmF0aW9uID0gdGhpcy5fZ2V0Q2FjaGVFeHBpcmF0aW9uKGNhY2hlTmFtZSk7XG4gICAgICAgICAgICBhd2FpdCBjYWNoZUV4cGlyYXRpb24udXBkYXRlVGltZXN0YW1wKHJlcXVlc3QudXJsKTtcbiAgICAgICAgICAgIGF3YWl0IGNhY2hlRXhwaXJhdGlvbi5leHBpcmVFbnRyaWVzKCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAoIShjb25maWcubWF4RW50cmllcyB8fCBjb25maWcubWF4QWdlU2Vjb25kcykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCdtYXgtZW50cmllcy1vci1hZ2UtcmVxdWlyZWQnLCB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWV4cGlyYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdQbHVnaW4nLFxuICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2NvbnN0cnVjdG9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb25maWcubWF4RW50cmllcykge1xuICAgICAgICAgICAgICAgIGFzc2VydC5pc1R5cGUoY29uZmlnLm1heEVudHJpZXMsICdudW1iZXInLCB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWV4cGlyYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdQbHVnaW4nLFxuICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2NvbnN0cnVjdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAnY29uZmlnLm1heEVudHJpZXMnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbmZpZy5tYXhBZ2VTZWNvbmRzKSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LmlzVHlwZShjb25maWcubWF4QWdlU2Vjb25kcywgJ251bWJlcicsIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtZXhwaXJhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ1BsdWdpbicsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdjb25maWcubWF4QWdlU2Vjb25kcycsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICAgICAgICB0aGlzLl9tYXhBZ2VTZWNvbmRzID0gY29uZmlnLm1heEFnZVNlY29uZHM7XG4gICAgICAgIHRoaXMuX2NhY2hlRXhwaXJhdGlvbnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGlmIChjb25maWcucHVyZ2VPblF1b3RhRXJyb3IpIHtcbiAgICAgICAgICAgIHJlZ2lzdGVyUXVvdGFFcnJvckNhbGxiYWNrKCgpID0+IHRoaXMuZGVsZXRlQ2FjaGVBbmRNZXRhZGF0YSgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpbXBsZSBoZWxwZXIgbWV0aG9kIHRvIHJldHVybiBhIENhY2hlRXhwaXJhdGlvbiBpbnN0YW5jZSBmb3IgYSBnaXZlblxuICAgICAqIGNhY2hlIG5hbWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2FjaGVOYW1lXG4gICAgICogQHJldHVybiB7Q2FjaGVFeHBpcmF0aW9ufVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZ2V0Q2FjaGVFeHBpcmF0aW9uKGNhY2hlTmFtZSkge1xuICAgICAgICBpZiAoY2FjaGVOYW1lID09PSBjYWNoZU5hbWVzLmdldFJ1bnRpbWVOYW1lKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ2V4cGlyZS1jdXN0b20tY2FjaGVzLW9ubHknKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2FjaGVFeHBpcmF0aW9uID0gdGhpcy5fY2FjaGVFeHBpcmF0aW9ucy5nZXQoY2FjaGVOYW1lKTtcbiAgICAgICAgaWYgKCFjYWNoZUV4cGlyYXRpb24pIHtcbiAgICAgICAgICAgIGNhY2hlRXhwaXJhdGlvbiA9IG5ldyBDYWNoZUV4cGlyYXRpb24oY2FjaGVOYW1lLCB0aGlzLl9jb25maWcpO1xuICAgICAgICAgICAgdGhpcy5fY2FjaGVFeHBpcmF0aW9ucy5zZXQoY2FjaGVOYW1lLCBjYWNoZUV4cGlyYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYWNoZUV4cGlyYXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UmVzcG9uc2V9IGNhY2hlZFJlc3BvbnNlXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2lzUmVzcG9uc2VEYXRlRnJlc2goY2FjaGVkUmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9tYXhBZ2VTZWNvbmRzKSB7XG4gICAgICAgICAgICAvLyBXZSBhcmVuJ3QgZXhwaXJpbmcgYnkgYWdlLCBzbyByZXR1cm4gdHJ1ZSwgaXQncyBmcmVzaFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlICdkYXRlJyBoZWFkZXIgd2lsbCBzdWZmaWNlIGEgcXVpY2sgZXhwaXJhdGlvbiBjaGVjay5cbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWVMYWJzL3N3LXRvb2xib3gvaXNzdWVzLzE2NCBmb3JcbiAgICAgICAgLy8gZGlzY3Vzc2lvbi5cbiAgICAgICAgY29uc3QgZGF0ZUhlYWRlclRpbWVzdGFtcCA9IHRoaXMuX2dldERhdGVIZWFkZXJUaW1lc3RhbXAoY2FjaGVkUmVzcG9uc2UpO1xuICAgICAgICBpZiAoZGF0ZUhlYWRlclRpbWVzdGFtcCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gVW5hYmxlIHRvIHBhcnNlIGRhdGUsIHNvIGFzc3VtZSBpdCdzIGZyZXNoLlxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIHZhbGlkIGhlYWRlclRpbWUsIHRoZW4gb3VyIHJlc3BvbnNlIGlzIGZyZXNoIGlmZiB0aGVcbiAgICAgICAgLy8gaGVhZGVyVGltZSBwbHVzIG1heEFnZVNlY29uZHMgaXMgZ3JlYXRlciB0aGFuIHRoZSBjdXJyZW50IHRpbWUuXG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIHJldHVybiBkYXRlSGVhZGVyVGltZXN0YW1wID49IG5vdyAtICh0aGlzLl9tYXhBZ2VTZWNvbmRzICogMTAwMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHdpbGwgZXh0cmFjdCB0aGUgZGF0YSBoZWFkZXIgYW5kIHBhcnNlIGl0IGludG8gYSB1c2VmdWxcbiAgICAgKiB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVzcG9uc2V9IGNhY2hlZFJlc3BvbnNlXG4gICAgICogQHJldHVybiB7bnVtYmVyfG51bGx9XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9nZXREYXRlSGVhZGVyVGltZXN0YW1wKGNhY2hlZFJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghY2FjaGVkUmVzcG9uc2UuaGVhZGVycy5oYXMoJ2RhdGUnKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0ZUhlYWRlciA9IGNhY2hlZFJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdkYXRlJyk7XG4gICAgICAgIGNvbnN0IHBhcnNlZERhdGUgPSBuZXcgRGF0ZShkYXRlSGVhZGVyKTtcbiAgICAgICAgY29uc3QgaGVhZGVyVGltZSA9IHBhcnNlZERhdGUuZ2V0VGltZSgpO1xuICAgICAgICAvLyBJZiB0aGUgRGF0ZSBoZWFkZXIgd2FzIGludmFsaWQgZm9yIHNvbWUgcmVhc29uLCBwYXJzZWREYXRlLmdldFRpbWUoKVxuICAgICAgICAvLyB3aWxsIHJldHVybiBOYU4uXG4gICAgICAgIGlmIChpc05hTihoZWFkZXJUaW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhlYWRlclRpbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgYSBoZWxwZXIgbWV0aG9kIHRoYXQgcGVyZm9ybXMgdHdvIG9wZXJhdGlvbnM6XG4gICAgICpcbiAgICAgKiAtIERlbGV0ZXMgKmFsbCogdGhlIHVuZGVybHlpbmcgQ2FjaGUgaW5zdGFuY2VzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHBsdWdpblxuICAgICAqIGluc3RhbmNlLCBieSBjYWxsaW5nIGNhY2hlcy5kZWxldGUoKSBvbiB5b3VyIGJlaGFsZi5cbiAgICAgKiAtIERlbGV0ZXMgdGhlIG1ldGFkYXRhIGZyb20gSW5kZXhlZERCIHVzZWQgdG8ga2VlcCB0cmFjayBvZiBleHBpcmF0aW9uXG4gICAgICogZGV0YWlscyBmb3IgZWFjaCBDYWNoZSBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIFdoZW4gdXNpbmcgY2FjaGUgZXhwaXJhdGlvbiwgY2FsbGluZyB0aGlzIG1ldGhvZCBpcyBwcmVmZXJhYmxlIHRvIGNhbGxpbmdcbiAgICAgKiBgY2FjaGVzLmRlbGV0ZSgpYCBkaXJlY3RseSwgc2luY2UgdGhpcyB3aWxsIGVuc3VyZSB0aGF0IHRoZSBJbmRleGVkREJcbiAgICAgKiBtZXRhZGF0YSBpcyBhbHNvIGNsZWFubHkgcmVtb3ZlZCBhbmQgb3BlbiBJbmRleGVkREIgaW5zdGFuY2VzIGFyZSBkZWxldGVkLlxuICAgICAqXG4gICAgICogTm90ZSB0aGF0IGlmIHlvdSdyZSAqbm90KiB1c2luZyBjYWNoZSBleHBpcmF0aW9uIGZvciBhIGdpdmVuIGNhY2hlLCBjYWxsaW5nXG4gICAgICogYGNhY2hlcy5kZWxldGUoKWAgYW5kIHBhc3NpbmcgaW4gdGhlIGNhY2hlJ3MgbmFtZSBzaG91bGQgYmUgc3VmZmljaWVudC5cbiAgICAgKiBUaGVyZSBpcyBubyBXb3JrYm94LXNwZWNpZmljIG1ldGhvZCBuZWVkZWQgZm9yIGNsZWFudXAgaW4gdGhhdCBjYXNlLlxuICAgICAqL1xuICAgIGFzeW5jIGRlbGV0ZUNhY2hlQW5kTWV0YWRhdGEoKSB7XG4gICAgICAgIC8vIERvIHRoaXMgb25lIGF0IGEgdGltZSBpbnN0ZWFkIG9mIGFsbCBhdCBvbmNlIHZpYSBgUHJvbWlzZS5hbGwoKWAgdG9cbiAgICAgICAgLy8gcmVkdWNlIHRoZSBjaGFuY2Ugb2YgaW5jb25zaXN0ZW5jeSBpZiBhIHByb21pc2UgcmVqZWN0cy5cbiAgICAgICAgZm9yIChjb25zdCBbY2FjaGVOYW1lLCBjYWNoZUV4cGlyYXRpb25dIG9mIHRoaXMuX2NhY2hlRXhwaXJhdGlvbnMpIHtcbiAgICAgICAgICAgIGF3YWl0IHNlbGYuY2FjaGVzLmRlbGV0ZShjYWNoZU5hbWUpO1xuICAgICAgICAgICAgYXdhaXQgY2FjaGVFeHBpcmF0aW9uLmRlbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlc2V0IHRoaXMuX2NhY2hlRXhwaXJhdGlvbnMgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG4gICAgICAgIHRoaXMuX2NhY2hlRXhwaXJhdGlvbnMgPSBuZXcgTWFwKCk7XG4gICAgfVxufVxuZXhwb3J0IHsgRXhwaXJhdGlvblBsdWdpbiB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBAdHMtaWdub3JlXG50cnkge1xuICAgIHNlbGZbJ3dvcmtib3g6ZXhwaXJhdGlvbjo2LjEuMiddICYmIF8oKTtcbn1cbmNhdGNoIChlKSB7IH1cbiIsIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IERCV3JhcHBlciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9EQldyYXBwZXIuanMnO1xuaW1wb3J0IHsgZGVsZXRlRGF0YWJhc2UgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvZGVsZXRlRGF0YWJhc2UuanMnO1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG5jb25zdCBEQl9OQU1FID0gJ3dvcmtib3gtZXhwaXJhdGlvbic7XG5jb25zdCBPQkpFQ1RfU1RPUkVfTkFNRSA9ICdjYWNoZS1lbnRyaWVzJztcbmNvbnN0IG5vcm1hbGl6ZVVSTCA9ICh1bk5vcm1hbGl6ZWRVcmwpID0+IHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHVuTm9ybWFsaXplZFVybCwgbG9jYXRpb24uaHJlZik7XG4gICAgdXJsLmhhc2ggPSAnJztcbiAgICByZXR1cm4gdXJsLmhyZWY7XG59O1xuLyoqXG4gKiBSZXR1cm5zIHRoZSB0aW1lc3RhbXAgbW9kZWwuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgQ2FjaGVUaW1lc3RhbXBzTW9kZWwge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNhY2hlTmFtZVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjYWNoZU5hbWUpIHtcbiAgICAgICAgdGhpcy5fY2FjaGVOYW1lID0gY2FjaGVOYW1lO1xuICAgICAgICB0aGlzLl9kYiA9IG5ldyBEQldyYXBwZXIoREJfTkFNRSwgMSwge1xuICAgICAgICAgICAgb251cGdyYWRlbmVlZGVkOiAoZXZlbnQpID0+IHRoaXMuX2hhbmRsZVVwZ3JhZGUoZXZlbnQpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvdWxkIHBlcmZvcm0gYW4gdXBncmFkZSBvZiBpbmRleGVkREIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaGFuZGxlVXBncmFkZShldmVudCkge1xuICAgICAgICBjb25zdCBkYiA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgIC8vIFRPRE8ocGhpbGlwd2FsdG9uKTogRWRnZUhUTUwgZG9lc24ndCBzdXBwb3J0IGFycmF5cyBhcyBhIGtleVBhdGgsIHNvIHdlXG4gICAgICAgIC8vIGhhdmUgdG8gdXNlIHRoZSBgaWRgIGtleVBhdGggaGVyZSBhbmQgY3JlYXRlIG91ciBvd24gdmFsdWVzIChhXG4gICAgICAgIC8vIGNvbmNhdGVuYXRpb24gb2YgYHVybCArIGNhY2hlTmFtZWApIGluc3RlYWQgb2Ygc2ltcGx5IHVzaW5nXG4gICAgICAgIC8vIGBrZXlQYXRoOiBbJ3VybCcsICdjYWNoZU5hbWUnXWAsIHdoaWNoIGlzIHN1cHBvcnRlZCBpbiBvdGhlciBicm93c2Vycy5cbiAgICAgICAgY29uc3Qgb2JqU3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZShPQkpFQ1RfU1RPUkVfTkFNRSwgeyBrZXlQYXRoOiAnaWQnIH0pO1xuICAgICAgICAvLyBUT0RPKHBoaWxpcHdhbHRvbik6IG9uY2Ugd2UgZG9uJ3QgaGF2ZSB0byBzdXBwb3J0IEVkZ2VIVE1MLCB3ZSBjYW5cbiAgICAgICAgLy8gY3JlYXRlIGEgc2luZ2xlIGluZGV4IHdpdGggdGhlIGtleVBhdGggYFsnY2FjaGVOYW1lJywgJ3RpbWVzdGFtcCddYFxuICAgICAgICAvLyBpbnN0ZWFkIG9mIGRvaW5nIGJvdGggdGhlc2UgaW5kZXhlcy5cbiAgICAgICAgb2JqU3RvcmUuY3JlYXRlSW5kZXgoJ2NhY2hlTmFtZScsICdjYWNoZU5hbWUnLCB7IHVuaXF1ZTogZmFsc2UgfSk7XG4gICAgICAgIG9ialN0b3JlLmNyZWF0ZUluZGV4KCd0aW1lc3RhbXAnLCAndGltZXN0YW1wJywgeyB1bmlxdWU6IGZhbHNlIH0pO1xuICAgICAgICAvLyBQcmV2aW91cyB2ZXJzaW9ucyBvZiBgd29ya2JveC1leHBpcmF0aW9uYCB1c2VkIGB0aGlzLl9jYWNoZU5hbWVgXG4gICAgICAgIC8vIGFzIHRoZSBJREJEYXRhYmFzZSBuYW1lLlxuICAgICAgICBkZWxldGVEYXRhYmFzZSh0aGlzLl9jYWNoZU5hbWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhc3luYyBzZXRUaW1lc3RhbXAodXJsLCB0aW1lc3RhbXApIHtcbiAgICAgICAgdXJsID0gbm9ybWFsaXplVVJMKHVybCk7XG4gICAgICAgIGNvbnN0IGVudHJ5ID0ge1xuICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICAgICAgY2FjaGVOYW1lOiB0aGlzLl9jYWNoZU5hbWUsXG4gICAgICAgICAgICAvLyBDcmVhdGluZyBhbiBJRCBmcm9tIHRoZSBVUkwgYW5kIGNhY2hlIG5hbWUgd29uJ3QgYmUgbmVjZXNzYXJ5IG9uY2VcbiAgICAgICAgICAgIC8vIEVkZ2Ugc3dpdGNoZXMgdG8gQ2hyb21pdW0gYW5kIGFsbCBicm93c2VycyB3ZSBzdXBwb3J0IHdvcmsgd2l0aFxuICAgICAgICAgICAgLy8gYXJyYXkga2V5UGF0aHMuXG4gICAgICAgICAgICBpZDogdGhpcy5fZ2V0SWQodXJsKSxcbiAgICAgICAgfTtcbiAgICAgICAgYXdhaXQgdGhpcy5fZGIucHV0KE9CSkVDVF9TVE9SRV9OQU1FLCBlbnRyeSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHRpbWVzdGFtcCBzdG9yZWQgZm9yIGEgZ2l2ZW4gVVJMLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgYXN5bmMgZ2V0VGltZXN0YW1wKHVybCkge1xuICAgICAgICBjb25zdCBlbnRyeSA9IGF3YWl0IHRoaXMuX2RiLmdldChPQkpFQ1RfU1RPUkVfTkFNRSwgdGhpcy5fZ2V0SWQodXJsKSk7XG4gICAgICAgIHJldHVybiBlbnRyeS50aW1lc3RhbXA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIHRocm91Z2ggYWxsIHRoZSBlbnRyaWVzIGluIHRoZSBvYmplY3Qgc3RvcmUgKGZyb20gbmV3ZXN0IHRvXG4gICAgICogb2xkZXN0KSBhbmQgcmVtb3ZlcyBlbnRyaWVzIG9uY2UgZWl0aGVyIGBtYXhDb3VudGAgaXMgcmVhY2hlZCBvciB0aGVcbiAgICAgKiBlbnRyeSdzIHRpbWVzdGFtcCBpcyBsZXNzIHRoYW4gYG1pblRpbWVzdGFtcGAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluVGltZXN0YW1wXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1heENvdW50XG4gICAgICogQHJldHVybiB7QXJyYXk8c3RyaW5nPn1cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgYXN5bmMgZXhwaXJlRW50cmllcyhtaW5UaW1lc3RhbXAsIG1heENvdW50KSB7XG4gICAgICAgIGNvbnN0IGVudHJpZXNUb0RlbGV0ZSA9IGF3YWl0IHRoaXMuX2RiLnRyYW5zYWN0aW9uKE9CSkVDVF9TVE9SRV9OQU1FLCAncmVhZHdyaXRlJywgKHR4biwgZG9uZSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RvcmUgPSB0eG4ub2JqZWN0U3RvcmUoT0JKRUNUX1NUT1JFX05BTUUpO1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9IHN0b3JlLmluZGV4KCd0aW1lc3RhbXAnKS5vcGVuQ3Vyc29yKG51bGwsICdwcmV2Jyk7XG4gICAgICAgICAgICBjb25zdCBlbnRyaWVzVG9EZWxldGUgPSBbXTtcbiAgICAgICAgICAgIGxldCBlbnRyaWVzTm90RGVsZXRlZENvdW50ID0gMDtcbiAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnNvciA9IHJlcXVlc3QucmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gY3Vyc29yLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPKHBoaWxpcHdhbHRvbik6IG9uY2Ugd2UgY2FuIHVzZSBhIG11bHRpLWtleSBpbmRleCwgd2VcbiAgICAgICAgICAgICAgICAgICAgLy8gd29uJ3QgaGF2ZSB0byBjaGVjayBgY2FjaGVOYW1lYCBoZXJlLlxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmNhY2hlTmFtZSA9PT0gdGhpcy5fY2FjaGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEZWxldGUgYW4gZW50cnkgaWYgaXQncyBvbGRlciB0aGFuIHRoZSBtYXggYWdlIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB3ZSBhbHJlYWR5IGhhdmUgdGhlIG1heCBudW1iZXIgYWxsb3dlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobWluVGltZXN0YW1wICYmIHJlc3VsdC50aW1lc3RhbXAgPCBtaW5UaW1lc3RhbXApIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1heENvdW50ICYmIGVudHJpZXNOb3REZWxldGVkQ291bnQgPj0gbWF4Q291bnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyhwaGlsaXB3YWx0b24pOiB3ZSBzaG91bGQgYmUgYWJsZSB0byBkZWxldGUgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW50cnkgcmlnaHQgaGVyZSwgYnV0IGRvaW5nIHNvIGNhdXNlcyBhbiBpdGVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBidWcgaW4gU2FmYXJpIHN0YWJsZSAoZml4ZWQgaW4gVFApLiBJbnN0ZWFkIHdlIGNhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBrZXlzIG9mIHRoZSBlbnRyaWVzIHRvIGRlbGV0ZSwgYW5kIHRoZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWxldGUgdGhlIHNlcGFyYXRlIHRyYW5zYWN0aW9ucy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvaXNzdWVzLzE5NzhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjdXJzb3IuZGVsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2Ugb25seSBuZWVkIHRvIHJldHVybiB0aGUgVVJMLCBub3QgdGhlIHdob2xlIGVudHJ5LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJpZXNUb0RlbGV0ZS5wdXNoKGN1cnNvci52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRyaWVzTm90RGVsZXRlZENvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkb25lKGVudHJpZXNUb0RlbGV0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFRPRE8ocGhpbGlwd2FsdG9uKTogb25jZSB0aGUgU2FmYXJpIGJ1ZyBpbiB0aGUgZm9sbG93aW5nIGlzc3VlIGlzIGZpeGVkLFxuICAgICAgICAvLyB3ZSBzaG91bGQgYmUgYWJsZSB0byByZW1vdmUgdGhpcyBsb29wIGFuZCBkbyB0aGUgZW50cnkgZGVsZXRpb24gaW4gdGhlXG4gICAgICAgIC8vIGN1cnNvciBsb29wIGFib3ZlOlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvaXNzdWVzLzE5NzhcbiAgICAgICAgY29uc3QgdXJsc0RlbGV0ZWQgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzVG9EZWxldGUpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX2RiLmRlbGV0ZShPQkpFQ1RfU1RPUkVfTkFNRSwgZW50cnkuaWQpO1xuICAgICAgICAgICAgdXJsc0RlbGV0ZWQucHVzaChlbnRyeS51cmwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmxzRGVsZXRlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGFrZXMgYSBVUkwgYW5kIHJldHVybnMgYW4gSUQgdGhhdCB3aWxsIGJlIHVuaXF1ZSBpbiB0aGUgb2JqZWN0IHN0b3JlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2dldElkKHVybCkge1xuICAgICAgICAvLyBDcmVhdGluZyBhbiBJRCBmcm9tIHRoZSBVUkwgYW5kIGNhY2hlIG5hbWUgd29uJ3QgYmUgbmVjZXNzYXJ5IG9uY2VcbiAgICAgICAgLy8gRWRnZSBzd2l0Y2hlcyB0byBDaHJvbWl1bSBhbmQgYWxsIGJyb3dzZXJzIHdlIHN1cHBvcnQgd29yayB3aXRoXG4gICAgICAgIC8vIGFycmF5IGtleVBhdGhzLlxuICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGVOYW1lICsgJ3wnICsgbm9ybWFsaXplVVJMKHVybCk7XG4gICAgfVxufVxuZXhwb3J0IHsgQ2FjaGVUaW1lc3RhbXBzTW9kZWwgfTtcbiIsIi8qXG4gIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9hc3NlcnQuanMnO1xuaW1wb3J0IHsgY2FjaGVOYW1lcyB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9jYWNoZU5hbWVzLmpzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgV29ya2JveEVycm9yIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL1dvcmtib3hFcnJvci5qcyc7XG5pbXBvcnQgeyB3YWl0VW50aWwgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvd2FpdFVudGlsLmpzJztcbmltcG9ydCB7IGNyZWF0ZUNhY2hlS2V5IH0gZnJvbSAnLi91dGlscy9jcmVhdGVDYWNoZUtleS5qcyc7XG5pbXBvcnQgeyBQcmVjYWNoZUluc3RhbGxSZXBvcnRQbHVnaW4gfSBmcm9tICcuL3V0aWxzL1ByZWNhY2hlSW5zdGFsbFJlcG9ydFBsdWdpbi5qcyc7XG5pbXBvcnQgeyBQcmVjYWNoZUNhY2hlS2V5UGx1Z2luIH0gZnJvbSAnLi91dGlscy9QcmVjYWNoZUNhY2hlS2V5UGx1Z2luLmpzJztcbmltcG9ydCB7IHByaW50Q2xlYW51cERldGFpbHMgfSBmcm9tICcuL3V0aWxzL3ByaW50Q2xlYW51cERldGFpbHMuanMnO1xuaW1wb3J0IHsgcHJpbnRJbnN0YWxsRGV0YWlscyB9IGZyb20gJy4vdXRpbHMvcHJpbnRJbnN0YWxsRGV0YWlscy5qcyc7XG5pbXBvcnQgeyBQcmVjYWNoZVN0cmF0ZWd5IH0gZnJvbSAnLi9QcmVjYWNoZVN0cmF0ZWd5LmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIFBlcmZvcm1zIGVmZmljaWVudCBwcmVjYWNoaW5nIG9mIGFzc2V0cy5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOndvcmtib3gtcHJlY2FjaGluZ1xuICovXG5jbGFzcyBQcmVjYWNoZUNvbnRyb2xsZXIge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBQcmVjYWNoZUNvbnRyb2xsZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmNhY2hlTmFtZV0gVGhlIGNhY2hlIHRvIHVzZSBmb3IgcHJlY2FjaGluZy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucGx1Z2luc10gUGx1Z2lucyB0byB1c2Ugd2hlbiBwcmVjYWNoaW5nIGFzIHdlbGxcbiAgICAgKiBhcyByZXNwb25kaW5nIHRvIGZldGNoIGV2ZW50cyBmb3IgcHJlY2FjaGVkIGFzc2V0cy5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmZhbGxiYWNrVG9OZXR3b3JrPXRydWVdIFdoZXRoZXIgdG8gYXR0ZW1wdCB0b1xuICAgICAqIGdldCB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgbmV0d29yayBpZiB0aGVyZSdzIGEgcHJlY2FjaGUgbWlzcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih7IGNhY2hlTmFtZSwgcGx1Z2lucyA9IFtdLCBmYWxsYmFja1RvTmV0d29yayA9IHRydWUgfSA9IHt9KSB7XG4gICAgICAgIHRoaXMuX3VybHNUb0NhY2hlS2V5cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fdXJsc1RvQ2FjaGVNb2RlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fY2FjaGVLZXlzVG9JbnRlZ3JpdGllcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fc3RyYXRlZ3kgPSBuZXcgUHJlY2FjaGVTdHJhdGVneSh7XG4gICAgICAgICAgICBjYWNoZU5hbWU6IGNhY2hlTmFtZXMuZ2V0UHJlY2FjaGVOYW1lKGNhY2hlTmFtZSksXG4gICAgICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICAgICAgLi4ucGx1Z2lucyxcbiAgICAgICAgICAgICAgICBuZXcgUHJlY2FjaGVDYWNoZUtleVBsdWdpbih7IHByZWNhY2hlQ29udHJvbGxlcjogdGhpcyB9KSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBmYWxsYmFja1RvTmV0d29yayxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEJpbmQgdGhlIGluc3RhbGwgYW5kIGFjdGl2YXRlIG1ldGhvZHMgdG8gdGhlIGluc3RhbmNlLlxuICAgICAgICB0aGlzLmluc3RhbGwgPSB0aGlzLmluc3RhbGwuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZSA9IHRoaXMuYWN0aXZhdGUuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHR5cGUge21vZHVsZTp3b3JrYm94LXByZWNhY2hpbmcuUHJlY2FjaGVTdHJhdGVneX0gVGhlIHN0cmF0ZWd5IGNyZWF0ZWQgYnkgdGhpcyBjb250cm9sbGVyIGFuZFxuICAgICAqIHVzZWQgdG8gY2FjaGUgYXNzZXRzIGFuZCByZXNwb25kIHRvIGZldGNoIGV2ZW50cy5cbiAgICAgKi9cbiAgICBnZXQgc3RyYXRlZ3koKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHJhdGVneTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBpdGVtcyB0byB0aGUgcHJlY2FjaGUgbGlzdCwgcmVtb3ZpbmcgYW55IGR1cGxpY2F0ZXMgYW5kXG4gICAgICogc3RvcmVzIHRoZSBmaWxlcyBpbiB0aGVcbiAgICAgKiBbXCJwcmVjYWNoZSBjYWNoZVwiXXtAbGluayBtb2R1bGU6d29ya2JveC1jb3JlLmNhY2hlTmFtZXN9IHdoZW4gdGhlIHNlcnZpY2VcbiAgICAgKiB3b3JrZXIgaW5zdGFsbHMuXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCBjYW4gYmUgY2FsbGVkIG11bHRpcGxlIHRpbWVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheTxPYmplY3R8c3RyaW5nPn0gW2VudHJpZXM9W11dIEFycmF5IG9mIGVudHJpZXMgdG8gcHJlY2FjaGUuXG4gICAgICovXG4gICAgcHJlY2FjaGUoZW50cmllcykge1xuICAgICAgICB0aGlzLmFkZFRvQ2FjaGVMaXN0KGVudHJpZXMpO1xuICAgICAgICBpZiAoIXRoaXMuX2luc3RhbGxBbmRBY3RpdmVMaXN0ZW5lcnNBZGRlZCkge1xuICAgICAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdpbnN0YWxsJywgdGhpcy5pbnN0YWxsKTtcbiAgICAgICAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignYWN0aXZhdGUnLCB0aGlzLmFjdGl2YXRlKTtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbGxBbmRBY3RpdmVMaXN0ZW5lcnNBZGRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2Qgd2lsbCBhZGQgaXRlbXMgdG8gdGhlIHByZWNhY2hlIGxpc3QsIHJlbW92aW5nIGR1cGxpY2F0ZXNcbiAgICAgKiBhbmQgZW5zdXJpbmcgdGhlIGluZm9ybWF0aW9uIGlzIHZhbGlkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheTxtb2R1bGU6d29ya2JveC1wcmVjYWNoaW5nLlByZWNhY2hlQ29udHJvbGxlci5QcmVjYWNoZUVudHJ5fHN0cmluZz59IGVudHJpZXNcbiAgICAgKiAgICAgQXJyYXkgb2YgZW50cmllcyB0byBwcmVjYWNoZS5cbiAgICAgKi9cbiAgICBhZGRUb0NhY2hlTGlzdChlbnRyaWVzKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBhc3NlcnQuaXNBcnJheShlbnRyaWVzLCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtcHJlY2FjaGluZycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUHJlY2FjaGVDb250cm9sbGVyJyxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2FkZFRvQ2FjaGVMaXN0JyxcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdlbnRyaWVzJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVybHNUb1dhcm5BYm91dCA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcbiAgICAgICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvaXNzdWVzLzIyNTlcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZW50cnkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdXJsc1RvV2FybkFib3V0LnB1c2goZW50cnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZW50cnkgJiYgZW50cnkucmV2aXNpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHVybHNUb1dhcm5BYm91dC5wdXNoKGVudHJ5LnVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB7IGNhY2hlS2V5LCB1cmwgfSA9IGNyZWF0ZUNhY2hlS2V5KGVudHJ5KTtcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlTW9kZSA9ICh0eXBlb2YgZW50cnkgIT09ICdzdHJpbmcnICYmIGVudHJ5LnJldmlzaW9uKSA/XG4gICAgICAgICAgICAgICAgJ3JlbG9hZCcgOiAnZGVmYXVsdCc7XG4gICAgICAgICAgICBpZiAodGhpcy5fdXJsc1RvQ2FjaGVLZXlzLmhhcyh1cmwpICYmXG4gICAgICAgICAgICAgICAgdGhpcy5fdXJsc1RvQ2FjaGVLZXlzLmdldCh1cmwpICE9PSBjYWNoZUtleSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ2FkZC10by1jYWNoZS1saXN0LWNvbmZsaWN0aW5nLWVudHJpZXMnLCB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RW50cnk6IHRoaXMuX3VybHNUb0NhY2hlS2V5cy5nZXQodXJsKSxcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW50cnk6IGNhY2hlS2V5LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBlbnRyeSAhPT0gJ3N0cmluZycgJiYgZW50cnkuaW50ZWdyaXR5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NhY2hlS2V5c1RvSW50ZWdyaXRpZXMuaGFzKGNhY2hlS2V5KSAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUtleXNUb0ludGVncml0aWVzLmdldChjYWNoZUtleSkgIT09IGVudHJ5LmludGVncml0eSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCdhZGQtdG8tY2FjaGUtbGlzdC1jb25mbGljdGluZy1pbnRlZ3JpdGllcycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlS2V5c1RvSW50ZWdyaXRpZXMuc2V0KGNhY2hlS2V5LCBlbnRyeS5pbnRlZ3JpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdXJsc1RvQ2FjaGVLZXlzLnNldCh1cmwsIGNhY2hlS2V5KTtcbiAgICAgICAgICAgIHRoaXMuX3VybHNUb0NhY2hlTW9kZXMuc2V0KHVybCwgY2FjaGVNb2RlKTtcbiAgICAgICAgICAgIGlmICh1cmxzVG9XYXJuQWJvdXQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdhcm5pbmdNZXNzYWdlID0gYFdvcmtib3ggaXMgcHJlY2FjaGluZyBVUkxzIHdpdGhvdXQgcmV2aXNpb24gYCArXG4gICAgICAgICAgICAgICAgICAgIGBpbmZvOiAke3VybHNUb1dhcm5BYm91dC5qb2luKCcsICcpfVxcblRoaXMgaXMgZ2VuZXJhbGx5IE5PVCBzYWZlLiBgICtcbiAgICAgICAgICAgICAgICAgICAgYExlYXJuIG1vcmUgYXQgaHR0cHM6Ly9iaXQubHkvd2ItcHJlY2FjaGVgO1xuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFVzZSBjb25zb2xlIGRpcmVjdGx5IHRvIGRpc3BsYXkgdGhpcyB3YXJuaW5nIHdpdGhvdXQgYmxvYXRpbmdcbiAgICAgICAgICAgICAgICAgICAgLy8gYnVuZGxlIHNpemVzIGJ5IHB1bGxpbmcgaW4gYWxsIG9mIHRoZSBsb2dnZXIgY29kZWJhc2UgaW4gcHJvZC5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKHdhcm5pbmdNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci53YXJuKHdhcm5pbmdNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJlY2FjaGVzIG5ldyBhbmQgdXBkYXRlZCBhc3NldHMuIENhbGwgdGhpcyBtZXRob2QgZnJvbSB0aGUgc2VydmljZSB3b3JrZXJcbiAgICAgKiBpbnN0YWxsIGV2ZW50LlxuICAgICAqXG4gICAgICogTm90ZTogdGhpcyBtZXRob2QgY2FsbHMgYGV2ZW50LndhaXRVbnRpbCgpYCBmb3IgeW91LCBzbyB5b3UgZG8gbm90IG5lZWRcbiAgICAgKiB0byBjYWxsIGl0IHlvdXJzZWxmIGluIHlvdXIgZXZlbnQgaGFuZGxlcnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V4dGVuZGFibGVFdmVudH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPG1vZHVsZTp3b3JrYm94LXByZWNhY2hpbmcuSW5zdGFsbFJlc3VsdD59XG4gICAgICovXG4gICAgaW5zdGFsbChldmVudCkge1xuICAgICAgICByZXR1cm4gd2FpdFVudGlsKGV2ZW50LCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnN0YWxsUmVwb3J0UGx1Z2luID0gbmV3IFByZWNhY2hlSW5zdGFsbFJlcG9ydFBsdWdpbigpO1xuICAgICAgICAgICAgdGhpcy5zdHJhdGVneS5wbHVnaW5zLnB1c2goaW5zdGFsbFJlcG9ydFBsdWdpbik7XG4gICAgICAgICAgICAvLyBDYWNoZSBlbnRyaWVzIG9uZSBhdCBhIHRpbWUuXG4gICAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS93b3JrYm94L2lzc3Vlcy8yNTI4XG4gICAgICAgICAgICBmb3IgKGNvbnN0IFt1cmwsIGNhY2hlS2V5XSBvZiB0aGlzLl91cmxzVG9DYWNoZUtleXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnRlZ3JpdHkgPSB0aGlzLl9jYWNoZUtleXNUb0ludGVncml0aWVzLmdldChjYWNoZUtleSk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FjaGVNb2RlID0gdGhpcy5fdXJsc1RvQ2FjaGVNb2Rlcy5nZXQodXJsKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCB7XG4gICAgICAgICAgICAgICAgICAgIGludGVncml0eSxcbiAgICAgICAgICAgICAgICAgICAgY2FjaGU6IGNhY2hlTW9kZSxcbiAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5zdHJhdGVneS5oYW5kbGVBbGwoe1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHsgY2FjaGVLZXkgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyB1cGRhdGVkVVJMcywgbm90VXBkYXRlZFVSTHMgfSA9IGluc3RhbGxSZXBvcnRQbHVnaW47XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIHByaW50SW5zdGFsbERldGFpbHModXBkYXRlZFVSTHMsIG5vdFVwZGF0ZWRVUkxzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHVwZGF0ZWRVUkxzLCBub3RVcGRhdGVkVVJMcyB9O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVsZXRlcyBhc3NldHMgdGhhdCBhcmUgbm8gbG9uZ2VyIHByZXNlbnQgaW4gdGhlIGN1cnJlbnQgcHJlY2FjaGUgbWFuaWZlc3QuXG4gICAgICogQ2FsbCB0aGlzIG1ldGhvZCBmcm9tIHRoZSBzZXJ2aWNlIHdvcmtlciBhY3RpdmF0ZSBldmVudC5cbiAgICAgKlxuICAgICAqIE5vdGU6IHRoaXMgbWV0aG9kIGNhbGxzIGBldmVudC53YWl0VW50aWwoKWAgZm9yIHlvdSwgc28geW91IGRvIG5vdCBuZWVkXG4gICAgICogdG8gY2FsbCBpdCB5b3Vyc2VsZiBpbiB5b3VyIGV2ZW50IGhhbmRsZXJzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFeHRlbmRhYmxlRXZlbnR9IGV2ZW50XG4gICAgICogQHJldHVybiB7UHJvbWlzZTxtb2R1bGU6d29ya2JveC1wcmVjYWNoaW5nLkNsZWFudXBSZXN1bHQ+fVxuICAgICAqL1xuICAgIGFjdGl2YXRlKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiB3YWl0VW50aWwoZXZlbnQsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlID0gYXdhaXQgc2VsZi5jYWNoZXMub3Blbih0aGlzLnN0cmF0ZWd5LmNhY2hlTmFtZSk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50bHlDYWNoZWRSZXF1ZXN0cyA9IGF3YWl0IGNhY2hlLmtleXMoKTtcbiAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkQ2FjaGVLZXlzID0gbmV3IFNldCh0aGlzLl91cmxzVG9DYWNoZUtleXMudmFsdWVzKCkpO1xuICAgICAgICAgICAgY29uc3QgZGVsZXRlZFVSTHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcmVxdWVzdCBvZiBjdXJyZW50bHlDYWNoZWRSZXF1ZXN0cykge1xuICAgICAgICAgICAgICAgIGlmICghZXhwZWN0ZWRDYWNoZUtleXMuaGFzKHJlcXVlc3QudXJsKSkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBjYWNoZS5kZWxldGUocmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZWRVUkxzLnB1c2gocmVxdWVzdC51cmwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcHJpbnRDbGVhbnVwRGV0YWlscyhkZWxldGVkVVJMcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBkZWxldGVkVVJMcyB9O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG1hcHBpbmcgb2YgYSBwcmVjYWNoZWQgVVJMIHRvIHRoZSBjb3JyZXNwb25kaW5nIGNhY2hlIGtleSwgdGFraW5nXG4gICAgICogaW50byBhY2NvdW50IHRoZSByZXZpc2lvbiBpbmZvcm1hdGlvbiBmb3IgdGhlIFVSTC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge01hcDxzdHJpbmcsIHN0cmluZz59IEEgVVJMIHRvIGNhY2hlIGtleSBtYXBwaW5nLlxuICAgICAqL1xuICAgIGdldFVSTHNUb0NhY2hlS2V5cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VybHNUb0NhY2hlS2V5cztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIHRoZSBVUkxzIHRoYXQgaGF2ZSBiZWVuIHByZWNhY2hlZCBieSB0aGUgY3VycmVudFxuICAgICAqIHNlcnZpY2Ugd29ya2VyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7QXJyYXk8c3RyaW5nPn0gVGhlIHByZWNhY2hlZCBVUkxzLlxuICAgICAqL1xuICAgIGdldENhY2hlZFVSTHMoKSB7XG4gICAgICAgIHJldHVybiBbLi4udGhpcy5fdXJsc1RvQ2FjaGVLZXlzLmtleXMoKV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNhY2hlIGtleSB1c2VkIGZvciBzdG9yaW5nIGEgZ2l2ZW4gVVJMLiBJZiB0aGF0IFVSTCBpc1xuICAgICAqIHVudmVyc2lvbmVkLCBsaWtlIGAvaW5kZXguaHRtbCcsIHRoZW4gdGhlIGNhY2hlIGtleSB3aWxsIGJlIHRoZSBvcmlnaW5hbFxuICAgICAqIFVSTCB3aXRoIGEgc2VhcmNoIHBhcmFtZXRlciBhcHBlbmRlZCB0byBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgQSBVUkwgd2hvc2UgY2FjaGUga2V5IHlvdSB3YW50IHRvIGxvb2sgdXAuXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgdmVyc2lvbmVkIFVSTCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEgY2FjaGUga2V5XG4gICAgICogZm9yIHRoZSBvcmlnaW5hbCBVUkwsIG9yIHVuZGVmaW5lZCBpZiB0aGF0IFVSTCBpc24ndCBwcmVjYWNoZWQuXG4gICAgICovXG4gICAgZ2V0Q2FjaGVLZXlGb3JVUkwodXJsKSB7XG4gICAgICAgIGNvbnN0IHVybE9iamVjdCA9IG5ldyBVUkwodXJsLCBsb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VybHNUb0NhY2hlS2V5cy5nZXQodXJsT2JqZWN0LmhyZWYpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGlzIGFjdHMgYXMgYSBkcm9wLWluIHJlcGxhY2VtZW50IGZvclxuICAgICAqIFtgY2FjaGUubWF0Y2goKWBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DYWNoZS9tYXRjaClcbiAgICAgKiB3aXRoIHRoZSBmb2xsb3dpbmcgZGlmZmVyZW5jZXM6XG4gICAgICpcbiAgICAgKiAtIEl0IGtub3dzIHdoYXQgdGhlIG5hbWUgb2YgdGhlIHByZWNhY2hlIGlzLCBhbmQgb25seSBjaGVja3MgaW4gdGhhdCBjYWNoZS5cbiAgICAgKiAtIEl0IGFsbG93cyB5b3UgdG8gcGFzcyBpbiBhbiBcIm9yaWdpbmFsXCIgVVJMIHdpdGhvdXQgdmVyc2lvbmluZyBwYXJhbWV0ZXJzLFxuICAgICAqIGFuZCBpdCB3aWxsIGF1dG9tYXRpY2FsbHkgbG9vayB1cCB0aGUgY29ycmVjdCBjYWNoZSBrZXkgZm9yIHRoZSBjdXJyZW50bHlcbiAgICAgKiBhY3RpdmUgcmV2aXNpb24gb2YgdGhhdCBVUkwuXG4gICAgICpcbiAgICAgKiBFLmcuLCBgbWF0Y2hQcmVjYWNoZSgnaW5kZXguaHRtbCcpYCB3aWxsIGZpbmQgdGhlIGNvcnJlY3QgcHJlY2FjaGVkXG4gICAgICogcmVzcG9uc2UgZm9yIHRoZSBjdXJyZW50bHkgYWN0aXZlIHNlcnZpY2Ugd29ya2VyLCBldmVuIGlmIHRoZSBhY3R1YWwgY2FjaGVcbiAgICAgKiBrZXkgaXMgYCcvaW5kZXguaHRtbD9fX1dCX1JFVklTSU9OX189MTIzNGFiY2QnYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfFJlcXVlc3R9IHJlcXVlc3QgVGhlIGtleSAod2l0aG91dCByZXZpc2lvbmluZyBwYXJhbWV0ZXJzKVxuICAgICAqIHRvIGxvb2sgdXAgaW4gdGhlIHByZWNhY2hlLlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8UmVzcG9uc2V8dW5kZWZpbmVkPn1cbiAgICAgKi9cbiAgICBhc3luYyBtYXRjaFByZWNhY2hlKHJlcXVlc3QpIHtcbiAgICAgICAgY29uc3QgdXJsID0gcmVxdWVzdCBpbnN0YW5jZW9mIFJlcXVlc3QgPyByZXF1ZXN0LnVybCA6IHJlcXVlc3Q7XG4gICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gdGhpcy5nZXRDYWNoZUtleUZvclVSTCh1cmwpO1xuICAgICAgICBpZiAoY2FjaGVLZXkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlID0gYXdhaXQgc2VsZi5jYWNoZXMub3Blbih0aGlzLnN0cmF0ZWd5LmNhY2hlTmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gY2FjaGUubWF0Y2goY2FjaGVLZXkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGxvb2tzIHVwIGB1cmxgIGluIHRoZSBwcmVjYWNoZSAodGFraW5nIGludG9cbiAgICAgKiBhY2NvdW50IHJldmlzaW9uIGluZm9ybWF0aW9uKSwgYW5kIHJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgYFJlc3BvbnNlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIHByZWNhY2hlZCBVUkwgd2hpY2ggd2lsbCBiZSB1c2VkIHRvIGxvb2t1cCB0aGVcbiAgICAgKiBgUmVzcG9uc2VgLlxuICAgICAqIEByZXR1cm4ge21vZHVsZTp3b3JrYm94LXJvdXRpbmd+aGFuZGxlckNhbGxiYWNrfVxuICAgICAqL1xuICAgIGNyZWF0ZUhhbmRsZXJCb3VuZFRvVVJMKHVybCkge1xuICAgICAgICBjb25zdCBjYWNoZUtleSA9IHRoaXMuZ2V0Q2FjaGVLZXlGb3JVUkwodXJsKTtcbiAgICAgICAgaWYgKCFjYWNoZUtleSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignbm9uLXByZWNhY2hlZC11cmwnLCB7IHVybCB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKG9wdGlvbnMpID0+IHtcbiAgICAgICAgICAgIG9wdGlvbnMucmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCk7XG4gICAgICAgICAgICBvcHRpb25zLnBhcmFtcyA9IHsgY2FjaGVLZXksIC4uLm9wdGlvbnMucGFyYW1zIH07XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdHJhdGVneS5oYW5kbGUob3B0aW9ucyk7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IHsgUHJlY2FjaGVDb250cm9sbGVyIH07XG4iLCIvKlxuICBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvbG9nZ2VyLmpzJztcbmltcG9ydCB7IGdldEZyaWVuZGx5VVJMIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2dldEZyaWVuZGx5VVJMLmpzJztcbmltcG9ydCB7IFJvdXRlIH0gZnJvbSAnd29ya2JveC1yb3V0aW5nL1JvdXRlLmpzJztcbmltcG9ydCB7IGdlbmVyYXRlVVJMVmFyaWF0aW9ucyB9IGZyb20gJy4vdXRpbHMvZ2VuZXJhdGVVUkxWYXJpYXRpb25zLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIEEgc3ViY2xhc3Mgb2YgW1JvdXRlXXtAbGluayBtb2R1bGU6d29ya2JveC1yb3V0aW5nLlJvdXRlfSB0aGF0IHRha2VzIGFcbiAqIFtQcmVjYWNoZUNvbnRyb2xsZXJde0BsaW5rIG1vZHVsZTp3b3JrYm94LXByZWNhY2hpbmcuUHJlY2FjaGVDb250cm9sbGVyfVxuICogaW5zdGFuY2UgYW5kIHVzZXMgaXQgdG8gbWF0Y2ggaW5jb21pbmcgcmVxdWVzdHMgYW5kIGhhbmRsZSBmZXRjaGluZ1xuICogcmVzcG9uc2VzIGZyb20gdGhlIHByZWNhY2hlLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6d29ya2JveC1wcmVjYWNoaW5nXG4gKiBAZXh0ZW5kcyBtb2R1bGU6d29ya2JveC1yb3V0aW5nLlJvdXRlXG4gKi9cbmNsYXNzIFByZWNhY2hlUm91dGUgZXh0ZW5kcyBSb3V0ZSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtQcmVjYWNoZUNvbnRyb2xsZXJ9IHByZWNhY2hlQ29udHJvbGxlciBBIGBQcmVjYWNoZUNvbnRyb2xsZXJgXG4gICAgICogaW5zdGFuY2UgdXNlZCB0byBib3RoIG1hdGNoIHJlcXVlc3RzIGFuZCByZXNwb25kIHRvIGZldGNoIGV2ZW50cy5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIE9wdGlvbnMgdG8gY29udHJvbCBob3cgcmVxdWVzdHMgYXJlIG1hdGNoZWRcbiAgICAgKiBhZ2FpbnN0IHRoZSBsaXN0IG9mIHByZWNhY2hlZCBVUkxzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5kaXJlY3RvcnlJbmRleD1pbmRleC5odG1sXSBUaGUgYGRpcmVjdG9yeUluZGV4YCB3aWxsXG4gICAgICogY2hlY2sgY2FjaGUgZW50cmllcyBmb3IgYSBVUkxzIGVuZGluZyB3aXRoICcvJyB0byBzZWUgaWYgdGhlcmUgaXMgYSBoaXQgd2hlblxuICAgICAqIGFwcGVuZGluZyB0aGUgYGRpcmVjdG9yeUluZGV4YCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge0FycmF5PFJlZ0V4cD59IFtvcHRpb25zLmlnbm9yZVVSTFBhcmFtZXRlcnNNYXRjaGluZz1bL151dG1fLywgL15mYmNsaWQkL11dIEFuXG4gICAgICogYXJyYXkgb2YgcmVnZXgncyB0byByZW1vdmUgc2VhcmNoIHBhcmFtcyB3aGVuIGxvb2tpbmcgZm9yIGEgY2FjaGUgbWF0Y2guXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5jbGVhblVSTHM9dHJ1ZV0gVGhlIGBjbGVhblVSTHNgIG9wdGlvbiB3aWxsXG4gICAgICogY2hlY2sgdGhlIGNhY2hlIGZvciB0aGUgVVJMIHdpdGggYSBgLmh0bWxgIGFkZGVkIHRvIHRoZSBlbmQgb2YgdGhlIGVuZC5cbiAgICAgKiBAcGFyYW0ge21vZHVsZTp3b3JrYm94LXByZWNhY2hpbmd+dXJsTWFuaXB1bGF0aW9ufSBbb3B0aW9ucy51cmxNYW5pcHVsYXRpb25dXG4gICAgICogVGhpcyBpcyBhIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIHRha2UgYSBVUkwgYW5kIHJldHVybiBhbiBhcnJheSBvZlxuICAgICAqIGFsdGVybmF0aXZlIFVSTHMgdGhhdCBzaG91bGQgYmUgY2hlY2tlZCBmb3IgcHJlY2FjaGUgbWF0Y2hlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwcmVjYWNoZUNvbnRyb2xsZXIsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSAoeyByZXF1ZXN0IH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVybHNUb0NhY2hlS2V5cyA9IHByZWNhY2hlQ29udHJvbGxlci5nZXRVUkxzVG9DYWNoZUtleXMoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcG9zc2libGVVUkwgb2YgZ2VuZXJhdGVVUkxWYXJpYXRpb25zKHJlcXVlc3QudXJsLCBvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gdXJsc1RvQ2FjaGVLZXlzLmdldChwb3NzaWJsZVVSTCk7XG4gICAgICAgICAgICAgICAgaWYgKGNhY2hlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGNhY2hlS2V5IH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoYFByZWNhY2hpbmcgZGlkIG5vdCBmaW5kIGEgbWF0Y2ggZm9yIGAgK1xuICAgICAgICAgICAgICAgICAgICBnZXRGcmllbmRseVVSTChyZXF1ZXN0LnVybCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICBzdXBlcihtYXRjaCwgcHJlY2FjaGVDb250cm9sbGVyLnN0cmF0ZWd5KTtcbiAgICB9XG59XG5leHBvcnQgeyBQcmVjYWNoZVJvdXRlIH07XG4iLCIvKlxuICBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBjb3B5UmVzcG9uc2UgfSBmcm9tICd3b3JrYm94LWNvcmUvY29weVJlc3BvbnNlLmpzJztcbmltcG9ydCB7IGNhY2hlTmFtZXMgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvY2FjaGVOYW1lcy5qcyc7XG5pbXBvcnQgeyBnZXRGcmllbmRseVVSTCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9nZXRGcmllbmRseVVSTC5qcyc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvbG9nZ2VyLmpzJztcbmltcG9ydCB7IFdvcmtib3hFcnJvciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9Xb3JrYm94RXJyb3IuanMnO1xuaW1wb3J0IHsgU3RyYXRlZ3kgfSBmcm9tICd3b3JrYm94LXN0cmF0ZWdpZXMvU3RyYXRlZ3kuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogQSBbU3RyYXRlZ3lde0BsaW5rIG1vZHVsZTp3b3JrYm94LXN0cmF0ZWdpZXMuU3RyYXRlZ3l9IGltcGxlbWVudGF0aW9uXG4gKiBzcGVjaWZpY2FsbHkgZGVzaWduZWQgdG8gd29yayB3aXRoXG4gKiBbUHJlY2FjaGVDb250cm9sbGVyXXtAbGluayBtb2R1bGU6d29ya2JveC1wcmVjYWNoaW5nLlByZWNhY2hlQ29udHJvbGxlcn1cbiAqIHRvIGJvdGggY2FjaGUgYW5kIGZldGNoIHByZWNhY2hlZCBhc3NldHMuXG4gKlxuICogTm90ZTogYW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzcyBpcyBjcmVhdGVkIGF1dG9tYXRpY2FsbHkgd2hlbiBjcmVhdGluZyBhXG4gKiBgUHJlY2FjaGVDb250cm9sbGVyYDsgaXQncyBnZW5lcmFsbHkgbm90IG5lY2Vzc2FyeSB0byBjcmVhdGUgdGhpcyB5b3Vyc2VsZi5cbiAqXG4gKiBAZXh0ZW5kcyBtb2R1bGU6d29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5XG4gKiBAbWVtYmVyb2YgbW9kdWxlOndvcmtib3gtcHJlY2FjaGluZ1xuICovXG5jbGFzcyBQcmVjYWNoZVN0cmF0ZWd5IGV4dGVuZHMgU3RyYXRlZ3kge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5jYWNoZU5hbWVdIENhY2hlIG5hbWUgdG8gc3RvcmUgYW5kIHJldHJpZXZlXG4gICAgICogcmVxdWVzdHMuIERlZmF1bHRzIHRvIHRoZSBjYWNoZSBuYW1lcyBwcm92aWRlZCBieVxuICAgICAqIFt3b3JrYm94LWNvcmVde0BsaW5rIG1vZHVsZTp3b3JrYm94LWNvcmUuY2FjaGVOYW1lc30uXG4gICAgICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBbb3B0aW9ucy5wbHVnaW5zXSBbUGx1Z2luc117QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL3Rvb2xzL3dvcmtib3gvZ3VpZGVzL3VzaW5nLXBsdWdpbnN9XG4gICAgICogdG8gdXNlIGluIGNvbmp1bmN0aW9uIHdpdGggdGhpcyBjYWNoaW5nIHN0cmF0ZWd5LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5mZXRjaE9wdGlvbnNdIFZhbHVlcyBwYXNzZWQgYWxvbmcgdG8gdGhlXG4gICAgICogW2Bpbml0YF17QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvd09yV29ya2VyR2xvYmFsU2NvcGUvZmV0Y2gjUGFyYW1ldGVyc31cbiAgICAgKiBvZiBhbGwgZmV0Y2goKSByZXF1ZXN0cyBtYWRlIGJ5IHRoaXMgc3RyYXRlZ3kuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLm1hdGNoT3B0aW9uc10gVGhlXG4gICAgICogW2BDYWNoZVF1ZXJ5T3B0aW9uc2Bde0BsaW5rIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby9TZXJ2aWNlV29ya2VyLyNkaWN0ZGVmLWNhY2hlcXVlcnlvcHRpb25zfVxuICAgICAqIGZvciBhbnkgYGNhY2hlLm1hdGNoKClgIG9yIGBjYWNoZS5wdXQoKWAgY2FsbHMgbWFkZSBieSB0aGlzIHN0cmF0ZWd5LlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuZmFsbGJhY2tUb05ldHdvcms9dHJ1ZV0gV2hldGhlciB0byBhdHRlbXB0IHRvXG4gICAgICogZ2V0IHRoZSByZXNwb25zZSBmcm9tIHRoZSBuZXR3b3JrIGlmIHRoZXJlJ3MgYSBwcmVjYWNoZSBtaXNzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBvcHRpb25zLmNhY2hlTmFtZSA9IGNhY2hlTmFtZXMuZ2V0UHJlY2FjaGVOYW1lKG9wdGlvbnMuY2FjaGVOYW1lKTtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2ZhbGxiYWNrVG9OZXR3b3JrID0gb3B0aW9ucy5mYWxsYmFja1RvTmV0d29yayA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIC8vIFJlZGlyZWN0ZWQgcmVzcG9uc2VzIGNhbm5vdCBiZSB1c2VkIHRvIHNhdGlzZnkgYSBuYXZpZ2F0aW9uIHJlcXVlc3QsIHNvXG4gICAgICAgIC8vIGFueSByZWRpcmVjdGVkIHJlc3BvbnNlIG11c3QgYmUgXCJjb3BpZWRcIiByYXRoZXIgdGhhbiBjbG9uZWQsIHNvIHRoZSBuZXdcbiAgICAgICAgLy8gcmVzcG9uc2UgZG9lc24ndCBjb250YWluIHRoZSBgcmVkaXJlY3RlZGAgZmxhZy4gU2VlOlxuICAgICAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD02NjkzNjMmZGVzYz0yI2MxXG4gICAgICAgIHRoaXMucGx1Z2lucy5wdXNoKFByZWNhY2hlU3RyYXRlZ3kuY29weVJlZGlyZWN0ZWRDYWNoZWFibGVSZXNwb25zZXNQbHVnaW4pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7UmVxdWVzdHxzdHJpbmd9IHJlcXVlc3QgQSByZXF1ZXN0IHRvIHJ1biB0aGlzIHN0cmF0ZWd5IGZvci5cbiAgICAgKiBAcGFyYW0ge21vZHVsZTp3b3JrYm94LXN0cmF0ZWdpZXMuU3RyYXRlZ3lIYW5kbGVyfSBoYW5kbGVyIFRoZSBldmVudCB0aGF0XG4gICAgICogICAgIHRyaWdnZXJlZCB0aGUgcmVxdWVzdC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFJlc3BvbnNlPn1cbiAgICAgKi9cbiAgICBhc3luYyBfaGFuZGxlKHJlcXVlc3QsIGhhbmRsZXIpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVyLmNhY2hlTWF0Y2gocmVxdWVzdCk7XG4gICAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgYW4gYGluc3RhbGxgIGV2ZW50IHRoZW4gcG9wdWxhdGUgdGhlIGNhY2hlLiBJZiB0aGlzIGlzIGFcbiAgICAgICAgICAgIC8vIGBmZXRjaGAgZXZlbnQgKG9yIGFueSBvdGhlciBldmVudCkgdGhlbiByZXNwb25kIHdpdGggdGhlIGNhY2hlZFxuICAgICAgICAgICAgLy8gcmVzcG9uc2UuXG4gICAgICAgICAgICBpZiAoaGFuZGxlci5ldmVudCAmJiBoYW5kbGVyLmV2ZW50LnR5cGUgPT09ICdpbnN0YWxsJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9oYW5kbGVJbnN0YWxsKHJlcXVlc3QsIGhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2hhbmRsZUZldGNoKHJlcXVlc3QsIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG4gICAgYXN5bmMgX2hhbmRsZUZldGNoKHJlcXVlc3QsIGhhbmRsZXIpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlO1xuICAgICAgICAvLyBGYWxsIGJhY2sgdG8gdGhlIG5ldHdvcmsgaWYgd2UgZG9uJ3QgaGF2ZSBhIGNhY2hlZCByZXNwb25zZVxuICAgICAgICAvLyAocGVyaGFwcyBkdWUgdG8gbWFudWFsIGNhY2hlIGNsZWFudXApLlxuICAgICAgICBpZiAodGhpcy5fZmFsbGJhY2tUb05ldHdvcmspIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLndhcm4oYFRoZSBwcmVjYWNoZWQgcmVzcG9uc2UgZm9yIGAgK1xuICAgICAgICAgICAgICAgICAgICBgJHtnZXRGcmllbmRseVVSTChyZXF1ZXN0LnVybCl9IGluICR7dGhpcy5jYWNoZU5hbWV9IHdhcyBub3QgYCArXG4gICAgICAgICAgICAgICAgICAgIGBmb3VuZC4gRmFsbGluZyBiYWNrIHRvIHRoZSBuZXR3b3JrIGluc3RlYWQuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IGhhbmRsZXIuZmV0Y2gocmVxdWVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBUaGlzIHNob3VsZG4ndCBub3JtYWxseSBoYXBwZW4sIGJ1dCB0aGVyZSBhcmUgZWRnZSBjYXNlczpcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9pc3N1ZXMvMTQ0MVxuICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignbWlzc2luZy1wcmVjYWNoZS1lbnRyeScsIHtcbiAgICAgICAgICAgICAgICBjYWNoZU5hbWU6IHRoaXMuY2FjaGVOYW1lLFxuICAgICAgICAgICAgICAgIHVybDogcmVxdWVzdC51cmwsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgY29uc3QgY2FjaGVLZXkgPSBoYW5kbGVyLnBhcmFtcyAmJiBoYW5kbGVyLnBhcmFtcy5jYWNoZUtleSB8fFxuICAgICAgICAgICAgICAgIGF3YWl0IGhhbmRsZXIuZ2V0Q2FjaGVLZXkocmVxdWVzdCwgJ3JlYWQnKTtcbiAgICAgICAgICAgIC8vIFdvcmtib3ggaXMgZ29pbmcgdG8gaGFuZGxlIHRoZSByb3V0ZS5cbiAgICAgICAgICAgIC8vIHByaW50IHRoZSByb3V0aW5nIGRldGFpbHMgdG8gdGhlIGNvbnNvbGUuXG4gICAgICAgICAgICBsb2dnZXIuZ3JvdXBDb2xsYXBzZWQoYFByZWNhY2hpbmcgaXMgcmVzcG9uZGluZyB0bzogYCArXG4gICAgICAgICAgICAgICAgZ2V0RnJpZW5kbHlVUkwocmVxdWVzdC51cmwpKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coYFNlcnZpbmcgdGhlIHByZWNhY2hlZCB1cmw6ICR7Z2V0RnJpZW5kbHlVUkwoY2FjaGVLZXkudXJsKX1gKTtcbiAgICAgICAgICAgIGxvZ2dlci5ncm91cENvbGxhcHNlZChgVmlldyByZXF1ZXN0IGRldGFpbHMgaGVyZS5gKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2cocmVxdWVzdCk7XG4gICAgICAgICAgICBsb2dnZXIuZ3JvdXBFbmQoKTtcbiAgICAgICAgICAgIGxvZ2dlci5ncm91cENvbGxhcHNlZChgVmlldyByZXNwb25zZSBkZXRhaWxzIGhlcmUuYCk7XG4gICAgICAgICAgICBsb2dnZXIubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIGxvZ2dlci5ncm91cEVuZCgpO1xuICAgICAgICAgICAgbG9nZ2VyLmdyb3VwRW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbiAgICBhc3luYyBfaGFuZGxlSW5zdGFsbChyZXF1ZXN0LCBoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuX3VzZURlZmF1bHRDYWNoZWFiaWxpdHlQbHVnaW5JZk5lZWRlZCgpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGhhbmRsZXIuZmV0Y2gocmVxdWVzdCk7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBkZWZlciBjYWNoZVB1dCgpIHVudGlsIGFmdGVyIHdlIGtub3cgdGhlIHJlc3BvbnNlXG4gICAgICAgIC8vIHNob3VsZCBiZSBjYWNoZWQ7IHNlZSBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvaXNzdWVzLzI3MzdcbiAgICAgICAgY29uc3Qgd2FzQ2FjaGVkID0gYXdhaXQgaGFuZGxlci5jYWNoZVB1dChyZXF1ZXN0LCByZXNwb25zZS5jbG9uZSgpKTtcbiAgICAgICAgaWYgKCF3YXNDYWNoZWQpIHtcbiAgICAgICAgICAgIC8vIFRocm93aW5nIGhlcmUgd2lsbCBsZWFkIHRvIHRoZSBgaW5zdGFsbGAgaGFuZGxlciBmYWlsaW5nLCB3aGljaFxuICAgICAgICAgICAgLy8gd2Ugd2FudCB0byBkbyBpZiAqYW55KiBvZiB0aGUgcmVzcG9uc2VzIGFyZW4ndCBzYWZlIHRvIGNhY2hlLlxuICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignYmFkLXByZWNhY2hpbmctcmVzcG9uc2UnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiByZXF1ZXN0LnVybCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgaXMgY29tcGxleCwgYXMgdGhlcmUgYSBudW1iZXIgb2YgdGhpbmdzIHRvIGFjY291bnQgZm9yOlxuICAgICAqXG4gICAgICogVGhlIGBwbHVnaW5zYCBhcnJheSBjYW4gYmUgc2V0IGF0IGNvbnN0cnVjdGlvbiwgYW5kL29yIGl0IG1pZ2h0IGJlIGFkZGVkIHRvXG4gICAgICogdG8gYXQgYW55IHRpbWUgYmVmb3JlIHRoZSBzdHJhdGVneSBpcyB1c2VkLlxuICAgICAqXG4gICAgICogQXQgdGhlIHRpbWUgdGhlIHN0cmF0ZWd5IGlzIHVzZWQgKGkuZS4gZHVyaW5nIGFuIGBpbnN0YWxsYCBldmVudCksIHRoZXJlXG4gICAgICogbmVlZHMgdG8gYmUgYXQgbGVhc3Qgb25lIHBsdWdpbiB0aGF0IGltcGxlbWVudHMgYGNhY2hlV2lsbFVwZGF0ZWAgaW4gdGhlXG4gICAgICogYXJyYXksIG90aGVyIHRoYW4gYGNvcHlSZWRpcmVjdGVkQ2FjaGVhYmxlUmVzcG9uc2VzUGx1Z2luYC5cbiAgICAgKlxuICAgICAqIC0gSWYgdGhpcyBtZXRob2QgaXMgY2FsbGVkIGFuZCB0aGVyZSBhcmUgbm8gc3VpdGFibGUgYGNhY2hlV2lsbFVwZGF0ZWBcbiAgICAgKiBwbHVnaW5zLCB3ZSBuZWVkIHRvIGFkZCBgZGVmYXVsdFByZWNhY2hlQ2FjaGVhYmlsaXR5UGx1Z2luYC5cbiAgICAgKlxuICAgICAqIC0gSWYgdGhpcyBtZXRob2QgaXMgY2FsbGVkIGFuZCB0aGVyZSBpcyBleGFjdGx5IG9uZSBgY2FjaGVXaWxsVXBkYXRlYCwgdGhlblxuICAgICAqIHdlIGRvbid0IGhhdmUgdG8gZG8gYW55dGhpbmcgKHRoaXMgbWlnaHQgYmUgYSBwcmV2aW91c2x5IGFkZGVkXG4gICAgICogYGRlZmF1bHRQcmVjYWNoZUNhY2hlYWJpbGl0eVBsdWdpbmAsIG9yIGl0IG1pZ2h0IGJlIGEgY3VzdG9tIHBsdWdpbikuXG4gICAgICpcbiAgICAgKiAtIElmIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCBhbmQgdGhlcmUgaXMgbW9yZSB0aGFuIG9uZSBgY2FjaGVXaWxsVXBkYXRlYCxcbiAgICAgKiB0aGVuIHdlIG5lZWQgdG8gY2hlY2sgaWYgb25lIGlzIGBkZWZhdWx0UHJlY2FjaGVDYWNoZWFiaWxpdHlQbHVnaW5gLiBJZiBzbyxcbiAgICAgKiB3ZSBuZWVkIHRvIHJlbW92ZSBpdC4gKFRoaXMgc2l0dWF0aW9uIGlzIHVubGlrZWx5LCBidXQgaXQgY291bGQgaGFwcGVuIGlmXG4gICAgICogdGhlIHN0cmF0ZWd5IGlzIHVzZWQgbXVsdGlwbGUgdGltZXMsIHRoZSBmaXJzdCB3aXRob3V0IGEgYGNhY2hlV2lsbFVwZGF0ZWAsXG4gICAgICogYW5kIHRoZW4gbGF0ZXIgb24gYWZ0ZXIgbWFudWFsbHkgYWRkaW5nIGEgY3VzdG9tIGBjYWNoZVdpbGxVcGRhdGVgLilcbiAgICAgKlxuICAgICAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvaXNzdWVzLzI3MzcgZm9yIG1vcmUgY29udGV4dC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3VzZURlZmF1bHRDYWNoZWFiaWxpdHlQbHVnaW5JZk5lZWRlZCgpIHtcbiAgICAgICAgbGV0IGRlZmF1bHRQbHVnaW5JbmRleCA9IG51bGw7XG4gICAgICAgIGxldCBjYWNoZVdpbGxVcGRhdGVQbHVnaW5Db3VudCA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgW2luZGV4LCBwbHVnaW5dIG9mIHRoaXMucGx1Z2lucy5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIC8vIElnbm9yZSB0aGUgY29weSByZWRpcmVjdGVkIHBsdWdpbiB3aGVuIGRldGVybWluaW5nIHdoYXQgdG8gZG8uXG4gICAgICAgICAgICBpZiAocGx1Z2luID09PSBQcmVjYWNoZVN0cmF0ZWd5LmNvcHlSZWRpcmVjdGVkQ2FjaGVhYmxlUmVzcG9uc2VzUGx1Z2luKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTYXZlIHRoZSBkZWZhdWx0IHBsdWdpbidzIGluZGV4LCBpbiBjYXNlIGl0IG5lZWRzIHRvIGJlIHJlbW92ZWQuXG4gICAgICAgICAgICBpZiAocGx1Z2luID09PSBQcmVjYWNoZVN0cmF0ZWd5LmRlZmF1bHRQcmVjYWNoZUNhY2hlYWJpbGl0eVBsdWdpbikge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRQbHVnaW5JbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsdWdpbi5jYWNoZVdpbGxVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICBjYWNoZVdpbGxVcGRhdGVQbHVnaW5Db3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjYWNoZVdpbGxVcGRhdGVQbHVnaW5Db3VudCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW5zLnB1c2goUHJlY2FjaGVTdHJhdGVneS5kZWZhdWx0UHJlY2FjaGVDYWNoZWFiaWxpdHlQbHVnaW4pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNhY2hlV2lsbFVwZGF0ZVBsdWdpbkNvdW50ID4gMSAmJiBkZWZhdWx0UGx1Z2luSW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIE9ubHkgcmVtb3ZlIHRoZSBkZWZhdWx0IHBsdWdpbjsgbXVsdGlwbGUgY3VzdG9tIHBsdWdpbnMgYXJlIGFsbG93ZWQuXG4gICAgICAgICAgICB0aGlzLnBsdWdpbnMuc3BsaWNlKGRlZmF1bHRQbHVnaW5JbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm90aGluZyBuZWVkcyB0byBiZSBkb25lIGlmIGNhY2hlV2lsbFVwZGF0ZVBsdWdpbkNvdW50IGlzIDFcbiAgICB9XG59XG5QcmVjYWNoZVN0cmF0ZWd5LmRlZmF1bHRQcmVjYWNoZUNhY2hlYWJpbGl0eVBsdWdpbiA9IHtcbiAgICBhc3luYyBjYWNoZVdpbGxVcGRhdGUoeyByZXNwb25zZSB9KSB7XG4gICAgICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzID49IDQwMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbn07XG5QcmVjYWNoZVN0cmF0ZWd5LmNvcHlSZWRpcmVjdGVkQ2FjaGVhYmxlUmVzcG9uc2VzUGx1Z2luID0ge1xuICAgIGFzeW5jIGNhY2hlV2lsbFVwZGF0ZSh7IHJlc3BvbnNlIH0pIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnJlZGlyZWN0ZWQgPyBhd2FpdCBjb3B5UmVzcG9uc2UocmVzcG9uc2UpIDogcmVzcG9uc2U7XG4gICAgfVxufTtcbmV4cG9ydCB7IFByZWNhY2hlU3RyYXRlZ3kgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gQHRzLWlnbm9yZVxudHJ5IHtcbiAgICBzZWxmWyd3b3JrYm94OnByZWNhY2hpbmc6Ni4xLjInXSAmJiBfKCk7XG59XG5jYXRjaCAoZSkgeyB9XG4iLCIvKlxuICBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgcmVnaXN0ZXJSb3V0ZSB9IGZyb20gJ3dvcmtib3gtcm91dGluZy9yZWdpc3RlclJvdXRlLmpzJztcbmltcG9ydCB7IGdldE9yQ3JlYXRlUHJlY2FjaGVDb250cm9sbGVyIH0gZnJvbSAnLi91dGlscy9nZXRPckNyZWF0ZVByZWNhY2hlQ29udHJvbGxlci5qcyc7XG5pbXBvcnQgeyBQcmVjYWNoZVJvdXRlIH0gZnJvbSAnLi9QcmVjYWNoZVJvdXRlLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIEFkZCBhIGBmZXRjaGAgbGlzdGVuZXIgdG8gdGhlIHNlcnZpY2Ugd29ya2VyIHRoYXQgd2lsbFxuICogcmVzcG9uZCB0b1xuICogW25ldHdvcmsgcmVxdWVzdHNde0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9TZXJ2aWNlX1dvcmtlcl9BUEkvVXNpbmdfU2VydmljZV9Xb3JrZXJzI0N1c3RvbV9yZXNwb25zZXNfdG9fcmVxdWVzdHN9XG4gKiB3aXRoIHByZWNhY2hlZCBhc3NldHMuXG4gKlxuICogUmVxdWVzdHMgZm9yIGFzc2V0cyB0aGF0IGFyZW4ndCBwcmVjYWNoZWQsIHRoZSBgRmV0Y2hFdmVudGAgd2lsbCBub3QgYmVcbiAqIHJlc3BvbmRlZCB0bywgYWxsb3dpbmcgdGhlIGV2ZW50IHRvIGZhbGwgdGhyb3VnaCB0byBvdGhlciBgZmV0Y2hgIGV2ZW50XG4gKiBsaXN0ZW5lcnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBTZWVcbiAqIFtQcmVjYWNoZVJvdXRlIG9wdGlvbnNde0BsaW5rIG1vZHVsZTp3b3JrYm94LXByZWNhY2hpbmcuUHJlY2FjaGVSb3V0ZX0uXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTp3b3JrYm94LXByZWNhY2hpbmdcbiAqL1xuZnVuY3Rpb24gYWRkUm91dGUob3B0aW9ucykge1xuICAgIGNvbnN0IHByZWNhY2hlQ29udHJvbGxlciA9IGdldE9yQ3JlYXRlUHJlY2FjaGVDb250cm9sbGVyKCk7XG4gICAgY29uc3QgcHJlY2FjaGVSb3V0ZSA9IG5ldyBQcmVjYWNoZVJvdXRlKHByZWNhY2hlQ29udHJvbGxlciwgb3B0aW9ucyk7XG4gICAgcmVnaXN0ZXJSb3V0ZShwcmVjYWNoZVJvdXRlKTtcbn1cbmV4cG9ydCB7IGFkZFJvdXRlIH07XG4iLCIvKlxuICBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBnZXRPckNyZWF0ZVByZWNhY2hlQ29udHJvbGxlciB9IGZyb20gJy4vdXRpbHMvZ2V0T3JDcmVhdGVQcmVjYWNoZUNvbnRyb2xsZXIuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgY2FsbHNcbiAqIHtAbGluayBQcmVjYWNoZUNvbnRyb2xsZXIjY3JlYXRlSGFuZGxlckJvdW5kVG9VUkx9IG9uIHRoZSBkZWZhdWx0XG4gKiB7QGxpbmsgUHJlY2FjaGVDb250cm9sbGVyfSBpbnN0YW5jZS5cbiAqXG4gKiBJZiB5b3UgYXJlIGNyZWF0aW5nIHlvdXIgb3duIHtAbGluayBQcmVjYWNoZUNvbnRyb2xsZXJ9LCB0aGVuIGNhbGwgdGhlXG4gKiB7QGxpbmsgUHJlY2FjaGVDb250cm9sbGVyI2NyZWF0ZUhhbmRsZXJCb3VuZFRvVVJMfSBvbiB0aGF0IGluc3RhbmNlLFxuICogaW5zdGVhZCBvZiB1c2luZyB0aGlzIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIHByZWNhY2hlZCBVUkwgd2hpY2ggd2lsbCBiZSB1c2VkIHRvIGxvb2t1cCB0aGVcbiAqIGBSZXNwb25zZWAuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmYWxsYmFja1RvTmV0d29yaz10cnVlXSBXaGV0aGVyIHRvIGF0dGVtcHQgdG8gZ2V0IHRoZVxuICogcmVzcG9uc2UgZnJvbSB0aGUgbmV0d29yayBpZiB0aGVyZSdzIGEgcHJlY2FjaGUgbWlzcy5cbiAqIEByZXR1cm4ge21vZHVsZTp3b3JrYm94LXJvdXRpbmd+aGFuZGxlckNhbGxiYWNrfVxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6d29ya2JveC1wcmVjYWNoaW5nXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUhhbmRsZXJCb3VuZFRvVVJMKHVybCkge1xuICAgIGNvbnN0IHByZWNhY2hlQ29udHJvbGxlciA9IGdldE9yQ3JlYXRlUHJlY2FjaGVDb250cm9sbGVyKCk7XG4gICAgcmV0dXJuIHByZWNhY2hlQ29udHJvbGxlci5jcmVhdGVIYW5kbGVyQm91bmRUb1VSTCh1cmwpO1xufVxuZXhwb3J0IHsgY3JlYXRlSGFuZGxlckJvdW5kVG9VUkwgfTtcbiIsIi8qXG4gIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGdldE9yQ3JlYXRlUHJlY2FjaGVDb250cm9sbGVyIH0gZnJvbSAnLi91dGlscy9nZXRPckNyZWF0ZVByZWNhY2hlQ29udHJvbGxlci5qcyc7XG5pbXBvcnQgJy4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBBZGRzIGl0ZW1zIHRvIHRoZSBwcmVjYWNoZSBsaXN0LCByZW1vdmluZyBhbnkgZHVwbGljYXRlcyBhbmRcbiAqIHN0b3JlcyB0aGUgZmlsZXMgaW4gdGhlXG4gKiBbXCJwcmVjYWNoZSBjYWNoZVwiXXtAbGluayBtb2R1bGU6d29ya2JveC1jb3JlLmNhY2hlTmFtZXN9IHdoZW4gdGhlIHNlcnZpY2VcbiAqIHdvcmtlciBpbnN0YWxscy5cbiAqXG4gKiBUaGlzIG1ldGhvZCBjYW4gYmUgY2FsbGVkIG11bHRpcGxlIHRpbWVzLlxuICpcbiAqIFBsZWFzZSBub3RlOiBUaGlzIG1ldGhvZCAqKndpbGwgbm90Kiogc2VydmUgYW55IG9mIHRoZSBjYWNoZWQgZmlsZXMgZm9yIHlvdS5cbiAqIEl0IG9ubHkgcHJlY2FjaGVzIGZpbGVzLiBUbyByZXNwb25kIHRvIGEgbmV0d29yayByZXF1ZXN0IHlvdSBjYWxsXG4gKiBbYWRkUm91dGUoKV17QGxpbmsgbW9kdWxlOndvcmtib3gtcHJlY2FjaGluZy5hZGRSb3V0ZX0uXG4gKlxuICogSWYgeW91IGhhdmUgYSBzaW5nbGUgYXJyYXkgb2YgZmlsZXMgdG8gcHJlY2FjaGUsIHlvdSBjYW4ganVzdCBjYWxsXG4gKiBbcHJlY2FjaGVBbmRSb3V0ZSgpXXtAbGluayBtb2R1bGU6d29ya2JveC1wcmVjYWNoaW5nLnByZWNhY2hlQW5kUm91dGV9LlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0fHN0cmluZz59IFtlbnRyaWVzPVtdXSBBcnJheSBvZiBlbnRyaWVzIHRvIHByZWNhY2hlLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6d29ya2JveC1wcmVjYWNoaW5nXG4gKi9cbmZ1bmN0aW9uIHByZWNhY2hlKGVudHJpZXMpIHtcbiAgICBjb25zdCBwcmVjYWNoZUNvbnRyb2xsZXIgPSBnZXRPckNyZWF0ZVByZWNhY2hlQ29udHJvbGxlcigpO1xuICAgIHByZWNhY2hlQ29udHJvbGxlci5wcmVjYWNoZShlbnRyaWVzKTtcbn1cbmV4cG9ydCB7IHByZWNhY2hlIH07XG4iLCIvKlxuICBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBhZGRSb3V0ZSB9IGZyb20gJy4vYWRkUm91dGUuanMnO1xuaW1wb3J0IHsgcHJlY2FjaGUgfSBmcm9tICcuL3ByZWNhY2hlLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIFRoaXMgbWV0aG9kIHdpbGwgYWRkIGVudHJpZXMgdG8gdGhlIHByZWNhY2hlIGxpc3QgYW5kIGFkZCBhIHJvdXRlIHRvXG4gKiByZXNwb25kIHRvIGZldGNoIGV2ZW50cy5cbiAqXG4gKiBUaGlzIGlzIGEgY29udmVuaWVuY2UgbWV0aG9kIHRoYXQgd2lsbCBjYWxsXG4gKiBbcHJlY2FjaGUoKV17QGxpbmsgbW9kdWxlOndvcmtib3gtcHJlY2FjaGluZy5wcmVjYWNoZX0gYW5kXG4gKiBbYWRkUm91dGUoKV17QGxpbmsgbW9kdWxlOndvcmtib3gtcHJlY2FjaGluZy5hZGRSb3V0ZX0gaW4gYSBzaW5nbGUgY2FsbC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdHxzdHJpbmc+fSBlbnRyaWVzIEFycmF5IG9mIGVudHJpZXMgdG8gcHJlY2FjaGUuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFNlZVxuICogW1ByZWNhY2hlUm91dGUgb3B0aW9uc117QGxpbmsgbW9kdWxlOndvcmtib3gtcHJlY2FjaGluZy5QcmVjYWNoZVJvdXRlfS5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOndvcmtib3gtcHJlY2FjaGluZ1xuICovXG5mdW5jdGlvbiBwcmVjYWNoZUFuZFJvdXRlKGVudHJpZXMsIG9wdGlvbnMpIHtcbiAgICBwcmVjYWNoZShlbnRyaWVzKTtcbiAgICBhZGRSb3V0ZShvcHRpb25zKTtcbn1cbmV4cG9ydCB7IHByZWNhY2hlQW5kUm91dGUgfTtcbiIsIi8qXG4gIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBBIHBsdWdpbiwgZGVzaWduZWQgdG8gYmUgdXNlZCB3aXRoIFByZWNhY2hlQ29udHJvbGxlciwgdG8gdHJhbnNsYXRlIFVSTHMgaW50b1xuICogdGhlIGNvcnJlc3BvbmRpbmcgY2FjaGUga2V5LCBiYXNlZCBvbiB0aGUgY3VycmVudCByZXZpc2lvbiBpbmZvLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIFByZWNhY2hlQ2FjaGVLZXlQbHVnaW4ge1xuICAgIGNvbnN0cnVjdG9yKHsgcHJlY2FjaGVDb250cm9sbGVyIH0pIHtcbiAgICAgICAgdGhpcy5jYWNoZUtleVdpbGxCZVVzZWQgPSBhc3luYyAoeyByZXF1ZXN0LCBwYXJhbXMsIH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gcGFyYW1zICYmIHBhcmFtcy5jYWNoZUtleSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuX3ByZWNhY2hlQ29udHJvbGxlci5nZXRDYWNoZUtleUZvclVSTChyZXF1ZXN0LnVybCk7XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVLZXkgPyBuZXcgUmVxdWVzdChjYWNoZUtleSkgOiByZXF1ZXN0O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9wcmVjYWNoZUNvbnRyb2xsZXIgPSBwcmVjYWNoZUNvbnRyb2xsZXI7XG4gICAgfVxufVxuZXhwb3J0IHsgUHJlY2FjaGVDYWNoZUtleVBsdWdpbiB9O1xuIiwiLypcbiAgQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIEEgcGx1Z2luLCBkZXNpZ25lZCB0byBiZSB1c2VkIHdpdGggUHJlY2FjaGVDb250cm9sbGVyLCB0byBkZXRlcm1pbmUgdGhlXG4gKiBvZiBhc3NldHMgdGhhdCB3ZXJlIHVwZGF0ZWQgKG9yIG5vdCB1cGRhdGVkKSBkdXJpbmcgdGhlIGluc3RhbGwgZXZlbnQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgUHJlY2FjaGVJbnN0YWxsUmVwb3J0UGx1Z2luIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy51cGRhdGVkVVJMcyA9IFtdO1xuICAgICAgICB0aGlzLm5vdFVwZGF0ZWRVUkxzID0gW107XG4gICAgICAgIHRoaXMuaGFuZGxlcldpbGxTdGFydCA9IGFzeW5jICh7IHJlcXVlc3QsIHN0YXRlLCB9KSA9PiB7XG4gICAgICAgICAgICAvLyBUT0RPOiBgc3RhdGVgIHNob3VsZCBuZXZlciBiZSB1bmRlZmluZWQuLi5cbiAgICAgICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgICAgIHN0YXRlLm9yaWdpbmFsUmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY2FjaGVkUmVzcG9uc2VXaWxsQmVVc2VkID0gYXN5bmMgKHsgZXZlbnQsIHN0YXRlLCBjYWNoZWRSZXNwb25zZSwgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdpbnN0YWxsJykge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IGBzdGF0ZWAgc2hvdWxkIG5ldmVyIGJlIHVuZGVmaW5lZC4uLlxuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IHN0YXRlLm9yaWdpbmFsUmVxdWVzdC51cmw7XG4gICAgICAgICAgICAgICAgaWYgKGNhY2hlZFJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90VXBkYXRlZFVSTHMucHVzaCh1cmwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVkVVJMcy5wdXNoKHVybCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFJlc3BvbnNlO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCB7IFByZWNhY2hlSW5zdGFsbFJlcG9ydFBsdWdpbiB9O1xuIiwiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgV29ya2JveEVycm9yIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL1dvcmtib3hFcnJvci5qcyc7XG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8vIE5hbWUgb2YgdGhlIHNlYXJjaCBwYXJhbWV0ZXIgdXNlZCB0byBzdG9yZSByZXZpc2lvbiBpbmZvLlxuY29uc3QgUkVWSVNJT05fU0VBUkNIX1BBUkFNID0gJ19fV0JfUkVWSVNJT05fXyc7XG4vKipcbiAqIENvbnZlcnRzIGEgbWFuaWZlc3QgZW50cnkgaW50byBhIHZlcnNpb25lZCBVUkwgc3VpdGFibGUgZm9yIHByZWNhY2hpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8c3RyaW5nfSBlbnRyeVxuICogQHJldHVybiB7c3RyaW5nfSBBIFVSTCB3aXRoIHZlcnNpb25pbmcgaW5mby5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG1lbWJlcm9mIG1vZHVsZTp3b3JrYm94LXByZWNhY2hpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNhY2hlS2V5KGVudHJ5KSB7XG4gICAgaWYgKCFlbnRyeSkge1xuICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCdhZGQtdG8tY2FjaGUtbGlzdC11bmV4cGVjdGVkLXR5cGUnLCB7IGVudHJ5IH0pO1xuICAgIH1cbiAgICAvLyBJZiBhIHByZWNhY2hlIG1hbmlmZXN0IGVudHJ5IGlzIGEgc3RyaW5nLCBpdCdzIGFzc3VtZWQgdG8gYmUgYSB2ZXJzaW9uZWRcbiAgICAvLyBVUkwsIGxpa2UgJy9hcHAuYWJjZDEyMzQuanMnLiBSZXR1cm4gYXMtaXMuXG4gICAgaWYgKHR5cGVvZiBlbnRyeSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgdXJsT2JqZWN0ID0gbmV3IFVSTChlbnRyeSwgbG9jYXRpb24uaHJlZik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjYWNoZUtleTogdXJsT2JqZWN0LmhyZWYsXG4gICAgICAgICAgICB1cmw6IHVybE9iamVjdC5ocmVmLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdCB7IHJldmlzaW9uLCB1cmwgfSA9IGVudHJ5O1xuICAgIGlmICghdXJsKSB7XG4gICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ2FkZC10by1jYWNoZS1saXN0LXVuZXhwZWN0ZWQtdHlwZScsIHsgZW50cnkgfSk7XG4gICAgfVxuICAgIC8vIElmIHRoZXJlJ3MganVzdCBhIFVSTCBhbmQgbm8gcmV2aXNpb24sIHRoZW4gaXQncyBhbHNvIGFzc3VtZWQgdG8gYmUgYVxuICAgIC8vIHZlcnNpb25lZCBVUkwuXG4gICAgaWYgKCFyZXZpc2lvbikge1xuICAgICAgICBjb25zdCB1cmxPYmplY3QgPSBuZXcgVVJMKHVybCwgbG9jYXRpb24uaHJlZik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjYWNoZUtleTogdXJsT2JqZWN0LmhyZWYsXG4gICAgICAgICAgICB1cmw6IHVybE9iamVjdC5ocmVmLFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvLyBPdGhlcndpc2UsIGNvbnN0cnVjdCBhIHByb3Blcmx5IHZlcnNpb25lZCBVUkwgdXNpbmcgdGhlIGN1c3RvbSBXb3JrYm94XG4gICAgLy8gc2VhcmNoIHBhcmFtZXRlciBhbG9uZyB3aXRoIHRoZSByZXZpc2lvbiBpbmZvLlxuICAgIGNvbnN0IGNhY2hlS2V5VVJMID0gbmV3IFVSTCh1cmwsIGxvY2F0aW9uLmhyZWYpO1xuICAgIGNvbnN0IG9yaWdpbmFsVVJMID0gbmV3IFVSTCh1cmwsIGxvY2F0aW9uLmhyZWYpO1xuICAgIGNhY2hlS2V5VVJMLnNlYXJjaFBhcmFtcy5zZXQoUkVWSVNJT05fU0VBUkNIX1BBUkFNLCByZXZpc2lvbik7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2FjaGVLZXk6IGNhY2hlS2V5VVJMLmhyZWYsXG4gICAgICAgIHVybDogb3JpZ2luYWxVUkwuaHJlZixcbiAgICB9O1xufVxuIiwiLypcbiAgQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgcmVtb3ZlSWdub3JlZFNlYXJjaFBhcmFtcyB9IGZyb20gJy4vcmVtb3ZlSWdub3JlZFNlYXJjaFBhcmFtcy5qcyc7XG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8qKlxuICogR2VuZXJhdG9yIGZ1bmN0aW9uIHRoYXQgeWllbGRzIHBvc3NpYmxlIHZhcmlhdGlvbnMgb24gdGhlIG9yaWdpbmFsIFVSTCB0b1xuICogY2hlY2ssIG9uZSBhdCBhIHRpbWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqXG4gKiBAcHJpdmF0ZVxuICogQG1lbWJlcm9mIG1vZHVsZTp3b3JrYm94LXByZWNhY2hpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uKiBnZW5lcmF0ZVVSTFZhcmlhdGlvbnModXJsLCB7IGlnbm9yZVVSTFBhcmFtZXRlcnNNYXRjaGluZyA9IFsvXnV0bV8vLCAvXmZiY2xpZCQvXSwgZGlyZWN0b3J5SW5kZXggPSAnaW5kZXguaHRtbCcsIGNsZWFuVVJMcyA9IHRydWUsIHVybE1hbmlwdWxhdGlvbiwgfSA9IHt9KSB7XG4gICAgY29uc3QgdXJsT2JqZWN0ID0gbmV3IFVSTCh1cmwsIGxvY2F0aW9uLmhyZWYpO1xuICAgIHVybE9iamVjdC5oYXNoID0gJyc7XG4gICAgeWllbGQgdXJsT2JqZWN0LmhyZWY7XG4gICAgY29uc3QgdXJsV2l0aG91dElnbm9yZWRQYXJhbXMgPSByZW1vdmVJZ25vcmVkU2VhcmNoUGFyYW1zKHVybE9iamVjdCwgaWdub3JlVVJMUGFyYW1ldGVyc01hdGNoaW5nKTtcbiAgICB5aWVsZCB1cmxXaXRob3V0SWdub3JlZFBhcmFtcy5ocmVmO1xuICAgIGlmIChkaXJlY3RvcnlJbmRleCAmJiB1cmxXaXRob3V0SWdub3JlZFBhcmFtcy5wYXRobmFtZS5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeVVSTCA9IG5ldyBVUkwodXJsV2l0aG91dElnbm9yZWRQYXJhbXMuaHJlZik7XG4gICAgICAgIGRpcmVjdG9yeVVSTC5wYXRobmFtZSArPSBkaXJlY3RvcnlJbmRleDtcbiAgICAgICAgeWllbGQgZGlyZWN0b3J5VVJMLmhyZWY7XG4gICAgfVxuICAgIGlmIChjbGVhblVSTHMpIHtcbiAgICAgICAgY29uc3QgY2xlYW5VUkwgPSBuZXcgVVJMKHVybFdpdGhvdXRJZ25vcmVkUGFyYW1zLmhyZWYpO1xuICAgICAgICBjbGVhblVSTC5wYXRobmFtZSArPSAnLmh0bWwnO1xuICAgICAgICB5aWVsZCBjbGVhblVSTC5ocmVmO1xuICAgIH1cbiAgICBpZiAodXJsTWFuaXB1bGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IGFkZGl0aW9uYWxVUkxzID0gdXJsTWFuaXB1bGF0aW9uKHsgdXJsOiB1cmxPYmplY3QgfSk7XG4gICAgICAgIGZvciAoY29uc3QgdXJsVG9BdHRlbXB0IG9mIGFkZGl0aW9uYWxVUkxzKSB7XG4gICAgICAgICAgICB5aWVsZCB1cmxUb0F0dGVtcHQuaHJlZjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qXG4gIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IFByZWNhY2hlQ29udHJvbGxlciB9IGZyb20gJy4uL1ByZWNhY2hlQ29udHJvbGxlci5qcyc7XG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbmxldCBwcmVjYWNoZUNvbnRyb2xsZXI7XG4vKipcbiAqIEByZXR1cm4ge1ByZWNhY2hlQ29udHJvbGxlcn1cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRPckNyZWF0ZVByZWNhY2hlQ29udHJvbGxlciA9ICgpID0+IHtcbiAgICBpZiAoIXByZWNhY2hlQ29udHJvbGxlcikge1xuICAgICAgICBwcmVjYWNoZUNvbnRyb2xsZXIgPSBuZXcgUHJlY2FjaGVDb250cm9sbGVyKCk7XG4gICAgfVxuICAgIHJldHVybiBwcmVjYWNoZUNvbnRyb2xsZXI7XG59O1xuIiwiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2xvZ2dlci5qcyc7XG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwVGl0bGVcbiAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gZGVsZXRlZFVSTHNcbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBsb2dHcm91cCA9IChncm91cFRpdGxlLCBkZWxldGVkVVJMcykgPT4ge1xuICAgIGxvZ2dlci5ncm91cENvbGxhcHNlZChncm91cFRpdGxlKTtcbiAgICBmb3IgKGNvbnN0IHVybCBvZiBkZWxldGVkVVJMcykge1xuICAgICAgICBsb2dnZXIubG9nKHVybCk7XG4gICAgfVxuICAgIGxvZ2dlci5ncm91cEVuZCgpO1xufTtcbi8qKlxuICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBkZWxldGVkVVJMc1xuICpcbiAqIEBwcml2YXRlXG4gKiBAbWVtYmVyb2YgbW9kdWxlOndvcmtib3gtcHJlY2FjaGluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gcHJpbnRDbGVhbnVwRGV0YWlscyhkZWxldGVkVVJMcykge1xuICAgIGNvbnN0IGRlbGV0aW9uQ291bnQgPSBkZWxldGVkVVJMcy5sZW5ndGg7XG4gICAgaWYgKGRlbGV0aW9uQ291bnQgPiAwKSB7XG4gICAgICAgIGxvZ2dlci5ncm91cENvbGxhcHNlZChgRHVyaW5nIHByZWNhY2hpbmcgY2xlYW51cCwgYCArXG4gICAgICAgICAgICBgJHtkZWxldGlvbkNvdW50fSBjYWNoZWQgYCArXG4gICAgICAgICAgICBgcmVxdWVzdCR7ZGVsZXRpb25Db3VudCA9PT0gMSA/ICcgd2FzJyA6ICdzIHdlcmUnfSBkZWxldGVkLmApO1xuICAgICAgICBsb2dHcm91cCgnRGVsZXRlZCBDYWNoZSBSZXF1ZXN0cycsIGRlbGV0ZWRVUkxzKTtcbiAgICAgICAgbG9nZ2VyLmdyb3VwRW5kKCk7XG4gICAgfVxufVxuIiwiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2xvZ2dlci5qcyc7XG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwVGl0bGVcbiAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gdXJsc1xuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9uZXN0ZWRHcm91cChncm91cFRpdGxlLCB1cmxzKSB7XG4gICAgaWYgKHVybHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbG9nZ2VyLmdyb3VwQ29sbGFwc2VkKGdyb3VwVGl0bGUpO1xuICAgIGZvciAoY29uc3QgdXJsIG9mIHVybHMpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyh1cmwpO1xuICAgIH1cbiAgICBsb2dnZXIuZ3JvdXBFbmQoKTtcbn1cbi8qKlxuICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSB1cmxzVG9QcmVjYWNoZVxuICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSB1cmxzQWxyZWFkeVByZWNhY2hlZFxuICpcbiAqIEBwcml2YXRlXG4gKiBAbWVtYmVyb2YgbW9kdWxlOndvcmtib3gtcHJlY2FjaGluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gcHJpbnRJbnN0YWxsRGV0YWlscyh1cmxzVG9QcmVjYWNoZSwgdXJsc0FscmVhZHlQcmVjYWNoZWQpIHtcbiAgICBjb25zdCBwcmVjYWNoZWRDb3VudCA9IHVybHNUb1ByZWNhY2hlLmxlbmd0aDtcbiAgICBjb25zdCBhbHJlYWR5UHJlY2FjaGVkQ291bnQgPSB1cmxzQWxyZWFkeVByZWNhY2hlZC5sZW5ndGg7XG4gICAgaWYgKHByZWNhY2hlZENvdW50IHx8IGFscmVhZHlQcmVjYWNoZWRDb3VudCkge1xuICAgICAgICBsZXQgbWVzc2FnZSA9IGBQcmVjYWNoaW5nICR7cHJlY2FjaGVkQ291bnR9IGZpbGUke3ByZWNhY2hlZENvdW50ID09PSAxID8gJycgOiAncyd9LmA7XG4gICAgICAgIGlmIChhbHJlYWR5UHJlY2FjaGVkQ291bnQgPiAwKSB7XG4gICAgICAgICAgICBtZXNzYWdlICs9IGAgJHthbHJlYWR5UHJlY2FjaGVkQ291bnR9IGAgK1xuICAgICAgICAgICAgICAgIGBmaWxlJHthbHJlYWR5UHJlY2FjaGVkQ291bnQgPT09IDEgPyAnIGlzJyA6ICdzIGFyZSd9IGFscmVhZHkgY2FjaGVkLmA7XG4gICAgICAgIH1cbiAgICAgICAgbG9nZ2VyLmdyb3VwQ29sbGFwc2VkKG1lc3NhZ2UpO1xuICAgICAgICBfbmVzdGVkR3JvdXAoYFZpZXcgbmV3bHkgcHJlY2FjaGVkIFVSTHMuYCwgdXJsc1RvUHJlY2FjaGUpO1xuICAgICAgICBfbmVzdGVkR3JvdXAoYFZpZXcgcHJldmlvdXNseSBwcmVjYWNoZWQgVVJMcy5gLCB1cmxzQWxyZWFkeVByZWNhY2hlZCk7XG4gICAgICAgIGxvZ2dlci5ncm91cEVuZCgpO1xuICAgIH1cbn1cbiIsIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBSZW1vdmVzIGFueSBVUkwgc2VhcmNoIHBhcmFtZXRlcnMgdGhhdCBzaG91bGQgYmUgaWdub3JlZC5cbiAqXG4gKiBAcGFyYW0ge1VSTH0gdXJsT2JqZWN0IFRoZSBvcmlnaW5hbCBVUkwuXG4gKiBAcGFyYW0ge0FycmF5PFJlZ0V4cD59IGlnbm9yZVVSTFBhcmFtZXRlcnNNYXRjaGluZyBSZWdFeHBzIHRvIHRlc3QgYWdhaW5zdFxuICogZWFjaCBzZWFyY2ggcGFyYW1ldGVyIG5hbWUuIE1hdGNoZXMgbWVhbiB0aGF0IHRoZSBzZWFyY2ggcGFyYW1ldGVyIHNob3VsZCBiZVxuICogaWdub3JlZC5cbiAqIEByZXR1cm4ge1VSTH0gVGhlIFVSTCB3aXRoIGFueSBpZ25vcmVkIHNlYXJjaCBwYXJhbWV0ZXJzIHJlbW92ZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBtZW1iZXJvZiBtb2R1bGU6d29ya2JveC1wcmVjYWNoaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVJZ25vcmVkU2VhcmNoUGFyYW1zKHVybE9iamVjdCwgaWdub3JlVVJMUGFyYW1ldGVyc01hdGNoaW5nID0gW10pIHtcbiAgICAvLyBDb252ZXJ0IHRoZSBpdGVyYWJsZSBpbnRvIGFuIGFycmF5IGF0IHRoZSBzdGFydCBvZiB0aGUgbG9vcCB0byBtYWtlIHN1cmVcbiAgICAvLyBkZWxldGlvbiBkb2Vzbid0IG1lc3MgdXAgaXRlcmF0aW9uLlxuICAgIGZvciAoY29uc3QgcGFyYW1OYW1lIG9mIFsuLi51cmxPYmplY3Quc2VhcmNoUGFyYW1zLmtleXMoKV0pIHtcbiAgICAgICAgaWYgKGlnbm9yZVVSTFBhcmFtZXRlcnNNYXRjaGluZy5zb21lKChyZWdFeHApID0+IHJlZ0V4cC50ZXN0KHBhcmFtTmFtZSkpKSB7XG4gICAgICAgICAgICB1cmxPYmplY3Quc2VhcmNoUGFyYW1zLmRlbGV0ZShwYXJhbU5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1cmxPYmplY3Q7XG59XG4iLCIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvYXNzZXJ0LmpzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgUm91dGUgfSBmcm9tICcuL1JvdXRlLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIE5hdmlnYXRpb25Sb3V0ZSBtYWtlcyBpdCBlYXN5IHRvIGNyZWF0ZSBhXG4gKiBbUm91dGVde0BsaW5rIG1vZHVsZTp3b3JrYm94LXJvdXRpbmcuUm91dGV9IHRoYXQgbWF0Y2hlcyBmb3IgYnJvd3NlclxuICogW25hdmlnYXRpb24gcmVxdWVzdHNde0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi9mdW5kYW1lbnRhbHMvcHJpbWVycy9zZXJ2aWNlLXdvcmtlcnMvaGlnaC1wZXJmb3JtYW5jZS1sb2FkaW5nI2ZpcnN0X3doYXRfYXJlX25hdmlnYXRpb25fcmVxdWVzdHN9LlxuICpcbiAqIEl0IHdpbGwgb25seSBtYXRjaCBpbmNvbWluZyBSZXF1ZXN0cyB3aG9zZVxuICogW2Btb2RlYF17QGxpbmsgaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2NvbmNlcHQtcmVxdWVzdC1tb2RlfVxuICogaXMgc2V0IHRvIGBuYXZpZ2F0ZWAuXG4gKlxuICogWW91IGNhbiBvcHRpb25hbGx5IG9ubHkgYXBwbHkgdGhpcyByb3V0ZSB0byBhIHN1YnNldCBvZiBuYXZpZ2F0aW9uIHJlcXVlc3RzXG4gKiBieSB1c2luZyBvbmUgb3IgYm90aCBvZiB0aGUgYGRlbnlsaXN0YCBhbmQgYGFsbG93bGlzdGAgcGFyYW1ldGVycy5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOndvcmtib3gtcm91dGluZ1xuICogQGV4dGVuZHMgbW9kdWxlOndvcmtib3gtcm91dGluZy5Sb3V0ZVxuICovXG5jbGFzcyBOYXZpZ2F0aW9uUm91dGUgZXh0ZW5kcyBSb3V0ZSB7XG4gICAgLyoqXG4gICAgICogSWYgYm90aCBgZGVueWxpc3RgIGFuZCBgYWxsb3dsaXN0YCBhcmUgcHJvdmlkZWQsIHRoZSBgZGVueWxpc3RgIHdpbGxcbiAgICAgKiB0YWtlIHByZWNlZGVuY2UgYW5kIHRoZSByZXF1ZXN0IHdpbGwgbm90IG1hdGNoIHRoaXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBUaGUgcmVndWxhciBleHByZXNzaW9ucyBpbiBgYWxsb3dsaXN0YCBhbmQgYGRlbnlsaXN0YFxuICAgICAqIGFyZSBtYXRjaGVkIGFnYWluc3QgdGhlIGNvbmNhdGVuYXRlZFxuICAgICAqIFtgcGF0aG5hbWVgXXtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSFRNTEh5cGVybGlua0VsZW1lbnRVdGlscy9wYXRobmFtZX1cbiAgICAgKiBhbmQgW2BzZWFyY2hgXXtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSFRNTEh5cGVybGlua0VsZW1lbnRVdGlscy9zZWFyY2h9XG4gICAgICogcG9ydGlvbnMgb2YgdGhlIHJlcXVlc3RlZCBVUkwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge21vZHVsZTp3b3JrYm94LXJvdXRpbmd+aGFuZGxlckNhbGxiYWNrfSBoYW5kbGVyIEEgY2FsbGJhY2tcbiAgICAgKiBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBQcm9taXNlIHJlc3VsdGluZyBpbiBhIFJlc3BvbnNlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtBcnJheTxSZWdFeHA+fSBbb3B0aW9ucy5kZW55bGlzdF0gSWYgYW55IG9mIHRoZXNlIHBhdHRlcm5zIG1hdGNoLFxuICAgICAqIHRoZSByb3V0ZSB3aWxsIG5vdCBoYW5kbGUgdGhlIHJlcXVlc3QgKGV2ZW4gaWYgYSBhbGxvd2xpc3QgUmVnRXhwIG1hdGNoZXMpLlxuICAgICAqIEBwYXJhbSB7QXJyYXk8UmVnRXhwPn0gW29wdGlvbnMuYWxsb3dsaXN0PVsvLi9dXSBJZiBhbnkgb2YgdGhlc2UgcGF0dGVybnNcbiAgICAgKiBtYXRjaCB0aGUgVVJMJ3MgcGF0aG5hbWUgYW5kIHNlYXJjaCBwYXJhbWV0ZXIsIHRoZSByb3V0ZSB3aWxsIGhhbmRsZSB0aGVcbiAgICAgKiByZXF1ZXN0IChhc3N1bWluZyB0aGUgZGVueWxpc3QgZG9lc24ndCBtYXRjaCkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaGFuZGxlciwgeyBhbGxvd2xpc3QgPSBbLy4vXSwgZGVueWxpc3QgPSBbXSB9ID0ge30pIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc0FycmF5T2ZDbGFzcyhhbGxvd2xpc3QsIFJlZ0V4cCwge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LXJvdXRpbmcnLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ05hdmlnYXRpb25Sb3V0ZScsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6ICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAnb3B0aW9ucy5hbGxvd2xpc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQuaXNBcnJheU9mQ2xhc3MoZGVueWxpc3QsIFJlZ0V4cCwge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LXJvdXRpbmcnLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ05hdmlnYXRpb25Sb3V0ZScsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6ICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAnb3B0aW9ucy5kZW55bGlzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlcigob3B0aW9ucykgPT4gdGhpcy5fbWF0Y2gob3B0aW9ucyksIGhhbmRsZXIpO1xuICAgICAgICB0aGlzLl9hbGxvd2xpc3QgPSBhbGxvd2xpc3Q7XG4gICAgICAgIHRoaXMuX2RlbnlsaXN0ID0gZGVueWxpc3Q7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJvdXRlcyBtYXRjaCBoYW5kbGVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge1VSTH0gb3B0aW9ucy51cmxcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3R9IG9wdGlvbnMucmVxdWVzdFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9tYXRjaCh7IHVybCwgcmVxdWVzdCB9KSB7XG4gICAgICAgIGlmIChyZXF1ZXN0ICYmIHJlcXVlc3QubW9kZSAhPT0gJ25hdmlnYXRlJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhdGhuYW1lQW5kU2VhcmNoID0gdXJsLnBhdGhuYW1lICsgdXJsLnNlYXJjaDtcbiAgICAgICAgZm9yIChjb25zdCByZWdFeHAgb2YgdGhpcy5fZGVueWxpc3QpIHtcbiAgICAgICAgICAgIGlmIChyZWdFeHAudGVzdChwYXRobmFtZUFuZFNlYXJjaCkpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBUaGUgbmF2aWdhdGlvbiByb3V0ZSAke3BhdGhuYW1lQW5kU2VhcmNofSBpcyBub3QgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgYmVpbmcgdXNlZCwgc2luY2UgdGhlIFVSTCBtYXRjaGVzIHRoaXMgZGVueWxpc3QgcGF0dGVybjogYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgJHtyZWdFeHB9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fYWxsb3dsaXN0LnNvbWUoKHJlZ0V4cCkgPT4gcmVnRXhwLnRlc3QocGF0aG5hbWVBbmRTZWFyY2gpKSkge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoYFRoZSBuYXZpZ2F0aW9uIHJvdXRlICR7cGF0aG5hbWVBbmRTZWFyY2h9IGAgK1xuICAgICAgICAgICAgICAgICAgICBgaXMgYmVpbmcgdXNlZC5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBsb2dnZXIubG9nKGBUaGUgbmF2aWdhdGlvbiByb3V0ZSAke3BhdGhuYW1lQW5kU2VhcmNofSBpcyBub3QgYCArXG4gICAgICAgICAgICAgICAgYGJlaW5nIHVzZWQsIHNpbmNlIHRoZSBVUkwgYmVpbmcgbmF2aWdhdGVkIHRvIGRvZXNuJ3QgYCArXG4gICAgICAgICAgICAgICAgYG1hdGNoIHRoZSBhbGxvd2xpc3QuYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydCB7IE5hdmlnYXRpb25Sb3V0ZSB9O1xuIiwiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2Fzc2VydC5qcyc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvbG9nZ2VyLmpzJztcbmltcG9ydCB7IFJvdXRlIH0gZnJvbSAnLi9Sb3V0ZS5qcyc7XG5pbXBvcnQgJy4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBSZWdFeHBSb3V0ZSBtYWtlcyBpdCBlYXN5IHRvIGNyZWF0ZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBiYXNlZFxuICogW1JvdXRlXXtAbGluayBtb2R1bGU6d29ya2JveC1yb3V0aW5nLlJvdXRlfS5cbiAqXG4gKiBGb3Igc2FtZS1vcmlnaW4gcmVxdWVzdHMgdGhlIFJlZ0V4cCBvbmx5IG5lZWRzIHRvIG1hdGNoIHBhcnQgb2YgdGhlIFVSTC4gRm9yXG4gKiByZXF1ZXN0cyBhZ2FpbnN0IHRoaXJkLXBhcnR5IHNlcnZlcnMsIHlvdSBtdXN0IGRlZmluZSBhIFJlZ0V4cCB0aGF0IG1hdGNoZXNcbiAqIHRoZSBzdGFydCBvZiB0aGUgVVJMLlxuICpcbiAqIFtTZWUgdGhlIG1vZHVsZSBkb2NzIGZvciBpbmZvLl17QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL3Rvb2xzL3dvcmtib3gvbW9kdWxlcy93b3JrYm94LXJvdXRpbmd9XG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTp3b3JrYm94LXJvdXRpbmdcbiAqIEBleHRlbmRzIG1vZHVsZTp3b3JrYm94LXJvdXRpbmcuUm91dGVcbiAqL1xuY2xhc3MgUmVnRXhwUm91dGUgZXh0ZW5kcyBSb3V0ZSB7XG4gICAgLyoqXG4gICAgICogSWYgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiBjb250YWluc1xuICAgICAqIFtjYXB0dXJlIGdyb3Vwc117QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvUmVnRXhwI2dyb3VwaW5nLWJhY2stcmVmZXJlbmNlc30sXG4gICAgICogdGhlIGNhcHR1cmVkIHZhbHVlcyB3aWxsIGJlIHBhc3NlZCB0byB0aGVcbiAgICAgKiBbaGFuZGxlcidzXXtAbGluayBtb2R1bGU6d29ya2JveC1yb3V0aW5nfmhhbmRsZXJDYWxsYmFja30gYHBhcmFtc2BcbiAgICAgKiBhcmd1bWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVnRXhwfSByZWdFeHAgVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBhZ2FpbnN0IFVSTHMuXG4gICAgICogQHBhcmFtIHttb2R1bGU6d29ya2JveC1yb3V0aW5nfmhhbmRsZXJDYWxsYmFja30gaGFuZGxlciBBIGNhbGxiYWNrXG4gICAgICogZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgUHJvbWlzZSByZXN1bHRpbmcgaW4gYSBSZXNwb25zZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW21ldGhvZD0nR0VUJ10gVGhlIEhUVFAgbWV0aG9kIHRvIG1hdGNoIHRoZSBSb3V0ZVxuICAgICAqIGFnYWluc3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVnRXhwLCBoYW5kbGVyLCBtZXRob2QpIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc0luc3RhbmNlKHJlZ0V4cCwgUmVnRXhwLCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtcm91dGluZycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUmVnRXhwUm91dGUnLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ3BhdHRlcm4nLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWF0Y2ggPSAoeyB1cmwgfSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVnRXhwLmV4ZWModXJsLmhyZWYpO1xuICAgICAgICAgICAgLy8gUmV0dXJuIGltbWVkaWF0ZWx5IGlmIHRoZXJlJ3Mgbm8gbWF0Y2guXG4gICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFJlcXVpcmUgdGhhdCB0aGUgbWF0Y2ggc3RhcnQgYXQgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiB0aGUgVVJMIHN0cmluZ1xuICAgICAgICAgICAgLy8gaWYgaXQncyBhIGNyb3NzLW9yaWdpbiByZXF1ZXN0LlxuICAgICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9pc3N1ZXMvMjgxIGZvciB0aGUgY29udGV4dFxuICAgICAgICAgICAgLy8gYmVoaW5kIHRoaXMgYmVoYXZpb3IuXG4gICAgICAgICAgICBpZiAoKHVybC5vcmlnaW4gIT09IGxvY2F0aW9uLm9yaWdpbikgJiYgKHJlc3VsdC5pbmRleCAhPT0gMCkpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoYFRoZSByZWd1bGFyIGV4cHJlc3Npb24gJyR7cmVnRXhwfScgb25seSBwYXJ0aWFsbHkgbWF0Y2hlZCBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGBhZ2FpbnN0IHRoZSBjcm9zcy1vcmlnaW4gVVJMICcke3VybH0nLiBSZWdFeHBSb3V0ZSdzIHdpbGwgb25seSBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGBoYW5kbGUgY3Jvc3Mtb3JpZ2luIHJlcXVlc3RzIGlmIHRoZXkgbWF0Y2ggdGhlIGVudGlyZSBVUkwuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIHRoZSByb3V0ZSBtYXRjaGVzLCBidXQgdGhlcmUgYXJlbid0IGFueSBjYXB0dXJlIGdyb3VwcyBkZWZpbmVkLCB0aGVuXG4gICAgICAgICAgICAvLyB0aGlzIHdpbGwgcmV0dXJuIFtdLCB3aGljaCBpcyB0cnV0aHkgYW5kIHRoZXJlZm9yZSBzdWZmaWNpZW50IHRvXG4gICAgICAgICAgICAvLyBpbmRpY2F0ZSBhIG1hdGNoLlxuICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIGNhcHR1cmUgZ3JvdXBzLCB0aGVuIGl0IHdpbGwgcmV0dXJuIHRoZWlyIHZhbHVlcy5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuc2xpY2UoMSk7XG4gICAgICAgIH07XG4gICAgICAgIHN1cGVyKG1hdGNoLCBoYW5kbGVyLCBtZXRob2QpO1xuICAgIH1cbn1cbmV4cG9ydCB7IFJlZ0V4cFJvdXRlIH07XG4iLCIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvYXNzZXJ0LmpzJztcbmltcG9ydCB7IGRlZmF1bHRNZXRob2QsIHZhbGlkTWV0aG9kcyB9IGZyb20gJy4vdXRpbHMvY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IG5vcm1hbGl6ZUhhbmRsZXIgfSBmcm9tICcuL3V0aWxzL25vcm1hbGl6ZUhhbmRsZXIuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogQSBgUm91dGVgIGNvbnNpc3RzIG9mIGEgcGFpciBvZiBjYWxsYmFjayBmdW5jdGlvbnMsIFwibWF0Y2hcIiBhbmQgXCJoYW5kbGVyXCIuXG4gKiBUaGUgXCJtYXRjaFwiIGNhbGxiYWNrIGRldGVybWluZSBpZiBhIHJvdXRlIHNob3VsZCBiZSB1c2VkIHRvIFwiaGFuZGxlXCIgYVxuICogcmVxdWVzdCBieSByZXR1cm5pbmcgYSBub24tZmFsc3kgdmFsdWUgaWYgaXQgY2FuLiBUaGUgXCJoYW5kbGVyXCIgY2FsbGJhY2tcbiAqIGlzIGNhbGxlZCB3aGVuIHRoZXJlIGlzIGEgbWF0Y2ggYW5kIHNob3VsZCByZXR1cm4gYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXNcbiAqIHRvIGEgYFJlc3BvbnNlYC5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOndvcmtib3gtcm91dGluZ1xuICovXG5jbGFzcyBSb3V0ZSB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IgZm9yIFJvdXRlIGNsYXNzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHttb2R1bGU6d29ya2JveC1yb3V0aW5nfm1hdGNoQ2FsbGJhY2t9IG1hdGNoXG4gICAgICogQSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGRldGVybWluZXMgd2hldGhlciB0aGUgcm91dGUgbWF0Y2hlcyBhIGdpdmVuXG4gICAgICogYGZldGNoYCBldmVudCBieSByZXR1cm5pbmcgYSBub24tZmFsc3kgdmFsdWUuXG4gICAgICogQHBhcmFtIHttb2R1bGU6d29ya2JveC1yb3V0aW5nfmhhbmRsZXJDYWxsYmFja30gaGFuZGxlciBBIGNhbGxiYWNrXG4gICAgICogZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgUHJvbWlzZSByZXNvbHZpbmcgdG8gYSBSZXNwb25zZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW21ldGhvZD0nR0VUJ10gVGhlIEhUVFAgbWV0aG9kIHRvIG1hdGNoIHRoZSBSb3V0ZVxuICAgICAqIGFnYWluc3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWF0Y2gsIGhhbmRsZXIsIG1ldGhvZCA9IGRlZmF1bHRNZXRob2QpIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc1R5cGUobWF0Y2gsICdmdW5jdGlvbicsIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1yb3V0aW5nJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdSb3V0ZScsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6ICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAnbWF0Y2gnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LmlzT25lT2YobWV0aG9kLCB2YWxpZE1ldGhvZHMsIHsgcGFyYW1OYW1lOiAnbWV0aG9kJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBUaGVzZSB2YWx1ZXMgYXJlIHJlZmVyZW5jZWQgZGlyZWN0bHkgYnkgUm91dGVyIHNvIGNhbm5vdCBiZVxuICAgICAgICAvLyBhbHRlcmVkIGJ5IG1pbmlmaWNhdG9uLlxuICAgICAgICB0aGlzLmhhbmRsZXIgPSBub3JtYWxpemVIYW5kbGVyKGhhbmRsZXIpO1xuICAgICAgICB0aGlzLm1hdGNoID0gbWF0Y2g7XG4gICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICAgIH1cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bW9kdWxlOndvcmtib3gtcm91dGluZy1oYW5kbGVyQ2FsbGJhY2t9IGhhbmRsZXIgQSBjYWxsYmFja1xuICAgICAqIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIFByb21pc2UgcmVzb2x2aW5nIHRvIGEgUmVzcG9uc2VcbiAgICAgKi9cbiAgICBzZXRDYXRjaEhhbmRsZXIoaGFuZGxlcikge1xuICAgICAgICB0aGlzLmNhdGNoSGFuZGxlciA9IG5vcm1hbGl6ZUhhbmRsZXIoaGFuZGxlcik7XG4gICAgfVxufVxuZXhwb3J0IHsgUm91dGUgfTtcbiIsIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9hc3NlcnQuanMnO1xuaW1wb3J0IHsgZ2V0RnJpZW5kbHlVUkwgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvZ2V0RnJpZW5kbHlVUkwuanMnO1xuaW1wb3J0IHsgZGVmYXVsdE1ldGhvZCB9IGZyb20gJy4vdXRpbHMvY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgbm9ybWFsaXplSGFuZGxlciB9IGZyb20gJy4vdXRpbHMvbm9ybWFsaXplSGFuZGxlci5qcyc7XG5pbXBvcnQgeyBXb3JrYm94RXJyb3IgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvV29ya2JveEVycm9yLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIFRoZSBSb3V0ZXIgY2FuIGJlIHVzZWQgdG8gcHJvY2VzcyBhIEZldGNoRXZlbnQgdGhyb3VnaCBvbmUgb3IgbW9yZVxuICogW1JvdXRlc117QGxpbmsgbW9kdWxlOndvcmtib3gtcm91dGluZy5Sb3V0ZX0gcmVzcG9uZGluZyAgd2l0aCBhIFJlcXVlc3QgaWZcbiAqIGEgbWF0Y2hpbmcgcm91dGUgZXhpc3RzLlxuICpcbiAqIElmIG5vIHJvdXRlIG1hdGNoZXMgYSBnaXZlbiBhIHJlcXVlc3QsIHRoZSBSb3V0ZXIgd2lsbCB1c2UgYSBcImRlZmF1bHRcIlxuICogaGFuZGxlciBpZiBvbmUgaXMgZGVmaW5lZC5cbiAqXG4gKiBTaG91bGQgdGhlIG1hdGNoaW5nIFJvdXRlIHRocm93IGFuIGVycm9yLCB0aGUgUm91dGVyIHdpbGwgdXNlIGEgXCJjYXRjaFwiXG4gKiBoYW5kbGVyIGlmIG9uZSBpcyBkZWZpbmVkIHRvIGdyYWNlZnVsbHkgZGVhbCB3aXRoIGlzc3VlcyBhbmQgcmVzcG9uZCB3aXRoIGFcbiAqIFJlcXVlc3QuXG4gKlxuICogSWYgYSByZXF1ZXN0IG1hdGNoZXMgbXVsdGlwbGUgcm91dGVzLCB0aGUgKiplYXJsaWVzdCoqIHJlZ2lzdGVyZWQgcm91dGUgd2lsbFxuICogYmUgdXNlZCB0byByZXNwb25kIHRvIHRoZSByZXF1ZXN0LlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6d29ya2JveC1yb3V0aW5nXG4gKi9cbmNsYXNzIFJvdXRlciB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgUm91dGVyLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX2RlZmF1bHRIYW5kbGVyTWFwID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtNYXA8c3RyaW5nLCBBcnJheTxtb2R1bGU6d29ya2JveC1yb3V0aW5nLlJvdXRlPj59IHJvdXRlcyBBIGBNYXBgIG9mIEhUVFBcbiAgICAgKiBtZXRob2QgbmFtZSAoJ0dFVCcsIGV0Yy4pIHRvIGFuIGFycmF5IG9mIGFsbCB0aGUgY29ycmVzcG9uZGluZyBgUm91dGVgXG4gICAgICogaW5zdGFuY2VzIHRoYXQgYXJlIHJlZ2lzdGVyZWQuXG4gICAgICovXG4gICAgZ2V0IHJvdXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvdXRlcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGZldGNoIGV2ZW50IGxpc3RlbmVyIHRvIHJlc3BvbmQgdG8gZXZlbnRzIHdoZW4gYSByb3V0ZSBtYXRjaGVzXG4gICAgICogdGhlIGV2ZW50J3MgcmVxdWVzdC5cbiAgICAgKi9cbiAgICBhZGRGZXRjaExpc3RlbmVyKCkge1xuICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8yODM1NyNpc3N1ZWNvbW1lbnQtNDM2NDg0NzA1XG4gICAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignZmV0Y2gnLCAoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHJlcXVlc3QgfSA9IGV2ZW50O1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VQcm9taXNlID0gdGhpcy5oYW5kbGVSZXF1ZXN0KHsgcmVxdWVzdCwgZXZlbnQgfSk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2VQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucmVzcG9uZFdpdGgocmVzcG9uc2VQcm9taXNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbWVzc2FnZSBldmVudCBsaXN0ZW5lciBmb3IgVVJMcyB0byBjYWNoZSBmcm9tIHRoZSB3aW5kb3cuXG4gICAgICogVGhpcyBpcyB1c2VmdWwgdG8gY2FjaGUgcmVzb3VyY2VzIGxvYWRlZCBvbiB0aGUgcGFnZSBwcmlvciB0byB3aGVuIHRoZVxuICAgICAqIHNlcnZpY2Ugd29ya2VyIHN0YXJ0ZWQgY29udHJvbGxpbmcgaXQuXG4gICAgICpcbiAgICAgKiBUaGUgZm9ybWF0IG9mIHRoZSBtZXNzYWdlIGRhdGEgc2VudCBmcm9tIHRoZSB3aW5kb3cgc2hvdWxkIGJlIGFzIGZvbGxvd3MuXG4gICAgICogV2hlcmUgdGhlIGB1cmxzVG9DYWNoZWAgYXJyYXkgbWF5IGNvbnNpc3Qgb2YgVVJMIHN0cmluZ3Mgb3IgYW4gYXJyYXkgb2ZcbiAgICAgKiBVUkwgc3RyaW5nICsgYHJlcXVlc3RJbml0YCBvYmplY3QgKHRoZSBzYW1lIGFzIHlvdSdkIHBhc3MgdG8gYGZldGNoKClgKS5cbiAgICAgKlxuICAgICAqIGBgYFxuICAgICAqIHtcbiAgICAgKiAgIHR5cGU6ICdDQUNIRV9VUkxTJyxcbiAgICAgKiAgIHBheWxvYWQ6IHtcbiAgICAgKiAgICAgdXJsc1RvQ2FjaGU6IFtcbiAgICAgKiAgICAgICAnLi9zY3JpcHQxLmpzJyxcbiAgICAgKiAgICAgICAnLi9zY3JpcHQyLmpzJyxcbiAgICAgKiAgICAgICBbJy4vc2NyaXB0My5qcycsIHttb2RlOiAnbm8tY29ycyd9XSxcbiAgICAgKiAgICAgXSxcbiAgICAgKiAgIH0sXG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGFkZENhY2hlTGlzdGVuZXIoKSB7XG4gICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzI4MzU3I2lzc3VlY29tbWVudC00MzY0ODQ3MDVcbiAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS50eXBlID09PSAnQ0FDSEVfVVJMUycpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHBheWxvYWQgfSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBDYWNoaW5nIFVSTHMgZnJvbSB0aGUgd2luZG93YCwgcGF5bG9hZC51cmxzVG9DYWNoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3RQcm9taXNlcyA9IFByb21pc2UuYWxsKHBheWxvYWQudXJsc1RvQ2FjaGUubWFwKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVudHJ5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50cnkgPSBbZW50cnldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdCguLi5lbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3QoeyByZXF1ZXN0LCBldmVudCB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyhwaGlsaXB3YWx0b24pOiBUeXBlU2NyaXB0IGVycm9ycyB3aXRob3V0IHRoaXMgdHlwZWNhc3QgZm9yXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvbWUgcmVhc29uIChwcm9iYWJseSBhIGJ1ZykuIFRoZSByZWFsIHR5cGUgaGVyZSBzaG91bGQgd29yayBidXRcbiAgICAgICAgICAgICAgICAgICAgLy8gZG9lc24ndDogYEFycmF5PFByb21pc2U8UmVzcG9uc2U+IHwgdW5kZWZpbmVkPmAuXG4gICAgICAgICAgICAgICAgfSkpOyAvLyBUeXBlU2NyaXB0XG4gICAgICAgICAgICAgICAgZXZlbnQud2FpdFVudGlsKHJlcXVlc3RQcm9taXNlcyk7XG4gICAgICAgICAgICAgICAgLy8gSWYgYSBNZXNzYWdlQ2hhbm5lbCB3YXMgdXNlZCwgcmVwbHkgdG8gdGhlIG1lc3NhZ2Ugb24gc3VjY2Vzcy5cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQucG9ydHMgJiYgZXZlbnQucG9ydHNbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFByb21pc2VzLnRoZW4oKCkgPT4gZXZlbnQucG9ydHNbMF0ucG9zdE1lc3NhZ2UodHJ1ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBseSB0aGUgcm91dGluZyBydWxlcyB0byBhIEZldGNoRXZlbnQgb2JqZWN0IHRvIGdldCBhIFJlc3BvbnNlIGZyb20gYW5cbiAgICAgKiBhcHByb3ByaWF0ZSBSb3V0ZSdzIGhhbmRsZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7UmVxdWVzdH0gb3B0aW9ucy5yZXF1ZXN0IFRoZSByZXF1ZXN0IHRvIGhhbmRsZS5cbiAgICAgKiBAcGFyYW0ge0V4dGVuZGFibGVFdmVudH0gb3B0aW9ucy5ldmVudCBUaGUgZXZlbnQgdGhhdCB0cmlnZ2VyZWQgdGhlXG4gICAgICogICAgIHJlcXVlc3QuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxSZXNwb25zZT58dW5kZWZpbmVkfSBBIHByb21pc2UgaXMgcmV0dXJuZWQgaWYgYVxuICAgICAqICAgICByZWdpc3RlcmVkIHJvdXRlIGNhbiBoYW5kbGUgdGhlIHJlcXVlc3QuIElmIHRoZXJlIGlzIG5vIG1hdGNoaW5nXG4gICAgICogICAgIHJvdXRlIGFuZCB0aGVyZSdzIG5vIGBkZWZhdWx0SGFuZGxlcmAsIGB1bmRlZmluZWRgIGlzIHJldHVybmVkLlxuICAgICAqL1xuICAgIGhhbmRsZVJlcXVlc3QoeyByZXF1ZXN0LCBldmVudCB9KSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBhc3NlcnQuaXNJbnN0YW5jZShyZXF1ZXN0LCBSZXF1ZXN0LCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtcm91dGluZycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUm91dGVyJyxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2hhbmRsZVJlcXVlc3QnLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ29wdGlvbnMucmVxdWVzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHJlcXVlc3QudXJsLCBsb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgaWYgKCF1cmwucHJvdG9jb2wuc3RhcnRzV2l0aCgnaHR0cCcpKSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgV29ya2JveCBSb3V0ZXIgb25seSBzdXBwb3J0cyBVUkxzIHRoYXQgc3RhcnQgd2l0aCAnaHR0cCcuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2FtZU9yaWdpbiA9IHVybC5vcmlnaW4gPT09IGxvY2F0aW9uLm9yaWdpbjtcbiAgICAgICAgY29uc3QgeyBwYXJhbXMsIHJvdXRlIH0gPSB0aGlzLmZpbmRNYXRjaGluZ1JvdXRlKHtcbiAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICAgIHNhbWVPcmlnaW4sXG4gICAgICAgICAgICB1cmwsXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgaGFuZGxlciA9IHJvdXRlICYmIHJvdXRlLmhhbmRsZXI7XG4gICAgICAgIGNvbnN0IGRlYnVnTWVzc2FnZXMgPSBbXTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgZGVidWdNZXNzYWdlcy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgYEZvdW5kIGEgcm91dGUgdG8gaGFuZGxlIHRoaXMgcmVxdWVzdDpgLCByb3V0ZSxcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlYnVnTWVzc2FnZXMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICBgUGFzc2luZyB0aGUgZm9sbG93aW5nIHBhcmFtcyB0byB0aGUgcm91dGUncyBoYW5kbGVyOmAsIHBhcmFtcyxcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYSBoYW5kbGVyIGJlY2F1c2UgdGhlcmUgd2FzIG5vIG1hdGNoaW5nIHJvdXRlLCB0aGVuXG4gICAgICAgIC8vIGZhbGwgYmFjayB0byBkZWZhdWx0SGFuZGxlciBpZiB0aGF0J3MgZGVmaW5lZC5cbiAgICAgICAgY29uc3QgbWV0aG9kID0gcmVxdWVzdC5tZXRob2Q7XG4gICAgICAgIGlmICghaGFuZGxlciAmJiB0aGlzLl9kZWZhdWx0SGFuZGxlck1hcC5oYXMobWV0aG9kKSkge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBkZWJ1Z01lc3NhZ2VzLnB1c2goYEZhaWxlZCB0byBmaW5kIGEgbWF0Y2hpbmcgcm91dGUuIEZhbGxpbmcgYCArXG4gICAgICAgICAgICAgICAgICAgIGBiYWNrIHRvIHRoZSBkZWZhdWx0IGhhbmRsZXIgZm9yICR7bWV0aG9kfS5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhhbmRsZXIgPSB0aGlzLl9kZWZhdWx0SGFuZGxlck1hcC5nZXQobWV0aG9kKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgLy8gTm8gaGFuZGxlciBzbyBXb3JrYm94IHdpbGwgZG8gbm90aGluZy4gSWYgbG9ncyBpcyBzZXQgb2YgZGVidWdcbiAgICAgICAgICAgICAgICAvLyBpLmUuIHZlcmJvc2UsIHdlIHNob3VsZCBwcmludCBvdXQgdGhpcyBpbmZvcm1hdGlvbi5cbiAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoYE5vIHJvdXRlIGZvdW5kIGZvcjogJHtnZXRGcmllbmRseVVSTCh1cmwpfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBXZSBoYXZlIGEgaGFuZGxlciwgbWVhbmluZyBXb3JrYm94IGlzIGdvaW5nIHRvIGhhbmRsZSB0aGUgcm91dGUuXG4gICAgICAgICAgICAvLyBwcmludCB0aGUgcm91dGluZyBkZXRhaWxzIHRvIHRoZSBjb25zb2xlLlxuICAgICAgICAgICAgbG9nZ2VyLmdyb3VwQ29sbGFwc2VkKGBSb3V0ZXIgaXMgcmVzcG9uZGluZyB0bzogJHtnZXRGcmllbmRseVVSTCh1cmwpfWApO1xuICAgICAgICAgICAgZGVidWdNZXNzYWdlcy5mb3JFYWNoKChtc2cpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtc2cpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coLi4ubXNnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2cobXNnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxvZ2dlci5ncm91cEVuZCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdyYXAgaW4gdHJ5IGFuZCBjYXRjaCBpbiBjYXNlIHRoZSBoYW5kbGUgbWV0aG9kIHRocm93cyBhIHN5bmNocm9ub3VzXG4gICAgICAgIC8vIGVycm9yLiBJdCBzaG91bGQgc3RpbGwgY2FsbGJhY2sgdG8gdGhlIGNhdGNoIGhhbmRsZXIuXG4gICAgICAgIGxldCByZXNwb25zZVByb21pc2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNwb25zZVByb21pc2UgPSBoYW5kbGVyLmhhbmRsZSh7IHVybCwgcmVxdWVzdCwgZXZlbnQsIHBhcmFtcyB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXNwb25zZVByb21pc2UgPSBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdldCByb3V0ZSdzIGNhdGNoIGhhbmRsZXIsIGlmIGl0IGV4aXN0c1xuICAgICAgICBjb25zdCBjYXRjaEhhbmRsZXIgPSByb3V0ZSAmJiByb3V0ZS5jYXRjaEhhbmRsZXI7XG4gICAgICAgIGlmIChyZXNwb25zZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlICYmICh0aGlzLl9jYXRjaEhhbmRsZXIgfHwgY2F0Y2hIYW5kbGVyKSkge1xuICAgICAgICAgICAgcmVzcG9uc2VQcm9taXNlID0gcmVzcG9uc2VQcm9taXNlLmNhdGNoKGFzeW5jIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSdzIGEgcm91dGUgY2F0Y2ggaGFuZGxlciwgcHJvY2VzcyB0aGF0IGZpcnN0XG4gICAgICAgICAgICAgICAgaWYgKGNhdGNoSGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RpbGwgaW5jbHVkZSBVUkwgaGVyZSBhcyBpdCB3aWxsIGJlIGFzeW5jIGZyb20gdGhlIGNvbnNvbGUgZ3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCBtYXkgbm90IG1ha2Ugc2Vuc2Ugd2l0aG91dCB0aGUgVVJMXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZ3JvdXBDb2xsYXBzZWQoYEVycm9yIHRocm93biB3aGVuIHJlc3BvbmRpbmcgdG86IGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAgJHtnZXRGcmllbmRseVVSTCh1cmwpfS4gRmFsbGluZyBiYWNrIHRvIHJvdXRlJ3MgQ2F0Y2ggSGFuZGxlci5gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgRXJyb3IgdGhyb3duIGJ5OmAsIHJvdXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmdyb3VwRW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBjYXRjaEhhbmRsZXIuaGFuZGxlKHsgdXJsLCByZXF1ZXN0LCBldmVudCwgcGFyYW1zIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChjYXRjaEVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyID0gY2F0Y2hFcnI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NhdGNoSGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RpbGwgaW5jbHVkZSBVUkwgaGVyZSBhcyBpdCB3aWxsIGJlIGFzeW5jIGZyb20gdGhlIGNvbnNvbGUgZ3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCBtYXkgbm90IG1ha2Ugc2Vuc2Ugd2l0aG91dCB0aGUgVVJMXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZ3JvdXBDb2xsYXBzZWQoYEVycm9yIHRocm93biB3aGVuIHJlc3BvbmRpbmcgdG86IGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAgJHtnZXRGcmllbmRseVVSTCh1cmwpfS4gRmFsbGluZyBiYWNrIHRvIGdsb2JhbCBDYXRjaCBIYW5kbGVyLmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBFcnJvciB0aHJvd24gYnk6YCwgcm91dGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZ3JvdXBFbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2F0Y2hIYW5kbGVyLmhhbmRsZSh7IHVybCwgcmVxdWVzdCwgZXZlbnQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZVByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyBhIHJlcXVlc3QgYW5kIFVSTCAoYW5kIG9wdGlvbmFsbHkgYW4gZXZlbnQpIGFnYWluc3QgdGhlIGxpc3Qgb2ZcbiAgICAgKiByZWdpc3RlcmVkIHJvdXRlcywgYW5kIGlmIHRoZXJlJ3MgYSBtYXRjaCwgcmV0dXJucyB0aGUgY29ycmVzcG9uZGluZ1xuICAgICAqIHJvdXRlIGFsb25nIHdpdGggYW55IHBhcmFtcyBnZW5lcmF0ZWQgYnkgdGhlIG1hdGNoLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge1VSTH0gb3B0aW9ucy51cmxcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3R9IG9wdGlvbnMucmVxdWVzdCBUaGUgcmVxdWVzdCB0byBtYXRjaC5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBvcHRpb25zLmV2ZW50IFRoZSBjb3JyZXNwb25kaW5nIGV2ZW50LlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQW4gb2JqZWN0IHdpdGggYHJvdXRlYCBhbmQgYHBhcmFtc2AgcHJvcGVydGllcy5cbiAgICAgKiAgICAgVGhleSBhcmUgcG9wdWxhdGVkIGlmIGEgbWF0Y2hpbmcgcm91dGUgd2FzIGZvdW5kIG9yIGB1bmRlZmluZWRgXG4gICAgICogICAgIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBmaW5kTWF0Y2hpbmdSb3V0ZSh7IHVybCwgc2FtZU9yaWdpbiwgcmVxdWVzdCwgZXZlbnQgfSkge1xuICAgICAgICBjb25zdCByb3V0ZXMgPSB0aGlzLl9yb3V0ZXMuZ2V0KHJlcXVlc3QubWV0aG9kKSB8fCBbXTtcbiAgICAgICAgZm9yIChjb25zdCByb3V0ZSBvZiByb3V0ZXMpIHtcbiAgICAgICAgICAgIGxldCBwYXJhbXM7XG4gICAgICAgICAgICBjb25zdCBtYXRjaFJlc3VsdCA9IHJvdXRlLm1hdGNoKHsgdXJsLCBzYW1lT3JpZ2luLCByZXF1ZXN0LCBldmVudCB9KTtcbiAgICAgICAgICAgIGlmIChtYXRjaFJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdhcm4gZGV2ZWxvcGVycyB0aGF0IHVzaW5nIGFuIGFzeW5jIG1hdGNoQ2FsbGJhY2sgaXMgYWxtb3N0IGFsd2F5c1xuICAgICAgICAgICAgICAgICAgICAvLyBub3QgdGhlIHJpZ2h0IHRoaW5nIHRvIGRvLiBcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoUmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLndhcm4oYFdoaWxlIHJvdXRpbmcgJHtnZXRGcmllbmRseVVSTCh1cmwpfSwgYW4gYXN5bmMgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYG1hdGNoQ2FsbGJhY2sgZnVuY3Rpb24gd2FzIHVzZWQuIFBsZWFzZSBjb252ZXJ0IHRoZSBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgZm9sbG93aW5nIHJvdXRlIHRvIHVzZSBhIHN5bmNocm9ub3VzIG1hdGNoQ2FsbGJhY2sgZnVuY3Rpb246YCwgcm91dGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvaXNzdWVzLzIwNzlcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBtYXRjaFJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRjaFJlc3VsdCkgJiYgbWF0Y2hSZXN1bHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEluc3RlYWQgb2YgcGFzc2luZyBhbiBlbXB0eSBhcnJheSBpbiBhcyBwYXJhbXMsIHVzZSB1bmRlZmluZWQuXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoKG1hdGNoUmVzdWx0LmNvbnN0cnVjdG9yID09PSBPYmplY3QgJiZcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMobWF0Y2hSZXN1bHQpLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSW5zdGVhZCBvZiBwYXNzaW5nIGFuIGVtcHR5IG9iamVjdCBpbiBhcyBwYXJhbXMsIHVzZSB1bmRlZmluZWQuXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG1hdGNoUmVzdWx0ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRm9yIHRoZSBib29sZWFuIHZhbHVlIHRydWUgKHJhdGhlciB0aGFuIGp1c3Qgc29tZXRoaW5nIHRydXRoLXkpLFxuICAgICAgICAgICAgICAgICAgICAvLyBkb24ndCBzZXQgcGFyYW1zLlxuICAgICAgICAgICAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS93b3JrYm94L3B1bGwvMjEzNCNpc3N1ZWNvbW1lbnQtNTEzOTI0MzUzXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIGVhcmx5IGlmIGhhdmUgYSBtYXRjaC5cbiAgICAgICAgICAgICAgICByZXR1cm4geyByb3V0ZSwgcGFyYW1zIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgbm8gbWF0Y2ggd2FzIGZvdW5kIGFib3ZlLCByZXR1cm4gYW5kIGVtcHR5IG9iamVjdC5cbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZpbmUgYSBkZWZhdWx0IGBoYW5kbGVyYCB0aGF0J3MgY2FsbGVkIHdoZW4gbm8gcm91dGVzIGV4cGxpY2l0bHlcbiAgICAgKiBtYXRjaCB0aGUgaW5jb21pbmcgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEVhY2ggSFRUUCBtZXRob2QgKCdHRVQnLCAnUE9TVCcsIGV0Yy4pIGdldHMgaXRzIG93biBkZWZhdWx0IGhhbmRsZXIuXG4gICAgICpcbiAgICAgKiBXaXRob3V0IGEgZGVmYXVsdCBoYW5kbGVyLCB1bm1hdGNoZWQgcmVxdWVzdHMgd2lsbCBnbyBhZ2FpbnN0IHRoZVxuICAgICAqIG5ldHdvcmsgYXMgaWYgdGhlcmUgd2VyZSBubyBzZXJ2aWNlIHdvcmtlciBwcmVzZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHttb2R1bGU6d29ya2JveC1yb3V0aW5nfmhhbmRsZXJDYWxsYmFja30gaGFuZGxlciBBIGNhbGxiYWNrXG4gICAgICogZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgUHJvbWlzZSByZXN1bHRpbmcgaW4gYSBSZXNwb25zZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW21ldGhvZD0nR0VUJ10gVGhlIEhUVFAgbWV0aG9kIHRvIGFzc29jaWF0ZSB3aXRoIHRoaXNcbiAgICAgKiBkZWZhdWx0IGhhbmRsZXIuIEVhY2ggbWV0aG9kIGhhcyBpdHMgb3duIGRlZmF1bHQuXG4gICAgICovXG4gICAgc2V0RGVmYXVsdEhhbmRsZXIoaGFuZGxlciwgbWV0aG9kID0gZGVmYXVsdE1ldGhvZCkge1xuICAgICAgICB0aGlzLl9kZWZhdWx0SGFuZGxlck1hcC5zZXQobWV0aG9kLCBub3JtYWxpemVIYW5kbGVyKGhhbmRsZXIpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWYgYSBSb3V0ZSB0aHJvd3MgYW4gZXJyb3Igd2hpbGUgaGFuZGxpbmcgYSByZXF1ZXN0LCB0aGlzIGBoYW5kbGVyYFxuICAgICAqIHdpbGwgYmUgY2FsbGVkIGFuZCBnaXZlbiBhIGNoYW5jZSB0byBwcm92aWRlIGEgcmVzcG9uc2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge21vZHVsZTp3b3JrYm94LXJvdXRpbmd+aGFuZGxlckNhbGxiYWNrfSBoYW5kbGVyIEEgY2FsbGJhY2tcbiAgICAgKiBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBQcm9taXNlIHJlc3VsdGluZyBpbiBhIFJlc3BvbnNlLlxuICAgICAqL1xuICAgIHNldENhdGNoSGFuZGxlcihoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuX2NhdGNoSGFuZGxlciA9IG5vcm1hbGl6ZUhhbmRsZXIoaGFuZGxlcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIHJvdXRlIHdpdGggdGhlIHJvdXRlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bW9kdWxlOndvcmtib3gtcm91dGluZy5Sb3V0ZX0gcm91dGUgVGhlIHJvdXRlIHRvIHJlZ2lzdGVyLlxuICAgICAqL1xuICAgIHJlZ2lzdGVyUm91dGUocm91dGUpIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc1R5cGUocm91dGUsICdvYmplY3QnLCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtcm91dGluZycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUm91dGVyJyxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ3JlZ2lzdGVyUm91dGUnLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ3JvdXRlJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0Lmhhc01ldGhvZChyb3V0ZSwgJ21hdGNoJywge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LXJvdXRpbmcnLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ1JvdXRlcicsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6ICdyZWdpc3RlclJvdXRlJyxcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdyb3V0ZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFzc2VydC5pc1R5cGUocm91dGUuaGFuZGxlciwgJ29iamVjdCcsIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1yb3V0aW5nJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdSb3V0ZXInLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAncmVnaXN0ZXJSb3V0ZScsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAncm91dGUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQuaGFzTWV0aG9kKHJvdXRlLmhhbmRsZXIsICdoYW5kbGUnLCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtcm91dGluZycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUm91dGVyJyxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ3JlZ2lzdGVyUm91dGUnLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ3JvdXRlLmhhbmRsZXInLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQuaXNUeXBlKHJvdXRlLm1ldGhvZCwgJ3N0cmluZycsIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1yb3V0aW5nJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdSb3V0ZXInLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAncmVnaXN0ZXJSb3V0ZScsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAncm91dGUubWV0aG9kJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fcm91dGVzLmhhcyhyb3V0ZS5tZXRob2QpKSB7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXMuc2V0KHJvdXRlLm1ldGhvZCwgW10pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdpdmUgcHJlY2VkZW5jZSB0byBhbGwgb2YgdGhlIGVhcmxpZXIgcm91dGVzIGJ5IGFkZGluZyB0aGlzIGFkZGl0aW9uYWxcbiAgICAgICAgLy8gcm91dGUgdG8gdGhlIGVuZCBvZiB0aGUgYXJyYXkuXG4gICAgICAgIHRoaXMuX3JvdXRlcy5nZXQocm91dGUubWV0aG9kKS5wdXNoKHJvdXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVW5yZWdpc3RlcnMgYSByb3V0ZSB3aXRoIHRoZSByb3V0ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge21vZHVsZTp3b3JrYm94LXJvdXRpbmcuUm91dGV9IHJvdXRlIFRoZSByb3V0ZSB0byB1bnJlZ2lzdGVyLlxuICAgICAqL1xuICAgIHVucmVnaXN0ZXJSb3V0ZShyb3V0ZSkge1xuICAgICAgICBpZiAoIXRoaXMuX3JvdXRlcy5oYXMocm91dGUubWV0aG9kKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcigndW5yZWdpc3Rlci1yb3V0ZS1idXQtbm90LWZvdW5kLXdpdGgtbWV0aG9kJywge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogcm91dGUubWV0aG9kLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm91dGVJbmRleCA9IHRoaXMuX3JvdXRlcy5nZXQocm91dGUubWV0aG9kKS5pbmRleE9mKHJvdXRlKTtcbiAgICAgICAgaWYgKHJvdXRlSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5fcm91dGVzLmdldChyb3V0ZS5tZXRob2QpLnNwbGljZShyb3V0ZUluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ3VucmVnaXN0ZXItcm91dGUtcm91dGUtbm90LXJlZ2lzdGVyZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCB7IFJvdXRlciB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBAdHMtaWdub3JlXG50cnkge1xuICAgIHNlbGZbJ3dvcmtib3g6cm91dGluZzo2LjEuMiddICYmIF8oKTtcbn1cbmNhdGNoIChlKSB7IH1cbiIsIi8qXG4gIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgV29ya2JveEVycm9yIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL1dvcmtib3hFcnJvci5qcyc7XG5pbXBvcnQgeyBSb3V0ZSB9IGZyb20gJy4vUm91dGUuanMnO1xuaW1wb3J0IHsgUmVnRXhwUm91dGUgfSBmcm9tICcuL1JlZ0V4cFJvdXRlLmpzJztcbmltcG9ydCB7IGdldE9yQ3JlYXRlRGVmYXVsdFJvdXRlciB9IGZyb20gJy4vdXRpbHMvZ2V0T3JDcmVhdGVEZWZhdWx0Um91dGVyLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIEVhc2lseSByZWdpc3RlciBhIFJlZ0V4cCwgc3RyaW5nLCBvciBmdW5jdGlvbiB3aXRoIGEgY2FjaGluZ1xuICogc3RyYXRlZ3kgdG8gYSBzaW5nbGV0b24gUm91dGVyIGluc3RhbmNlLlxuICpcbiAqIFRoaXMgbWV0aG9kIHdpbGwgZ2VuZXJhdGUgYSBSb3V0ZSBmb3IgeW91IGlmIG5lZWRlZCBhbmRcbiAqIGNhbGwgW3JlZ2lzdGVyUm91dGUoKV17QGxpbmsgbW9kdWxlOndvcmtib3gtcm91dGluZy5Sb3V0ZXIjcmVnaXN0ZXJSb3V0ZX0uXG4gKlxuICogQHBhcmFtIHtSZWdFeHB8c3RyaW5nfG1vZHVsZTp3b3JrYm94LXJvdXRpbmcuUm91dGV+bWF0Y2hDYWxsYmFja3xtb2R1bGU6d29ya2JveC1yb3V0aW5nLlJvdXRlfSBjYXB0dXJlXG4gKiBJZiB0aGUgY2FwdHVyZSBwYXJhbSBpcyBhIGBSb3V0ZWAsIGFsbCBvdGhlciBhcmd1bWVudHMgd2lsbCBiZSBpZ25vcmVkLlxuICogQHBhcmFtIHttb2R1bGU6d29ya2JveC1yb3V0aW5nfmhhbmRsZXJDYWxsYmFja30gW2hhbmRsZXJdIEEgY2FsbGJhY2tcbiAqIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIFByb21pc2UgcmVzdWx0aW5nIGluIGEgUmVzcG9uc2UuIFRoaXMgcGFyYW1ldGVyXG4gKiBpcyByZXF1aXJlZCBpZiBgY2FwdHVyZWAgaXMgbm90IGEgYFJvdXRlYCBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gW21ldGhvZD0nR0VUJ10gVGhlIEhUVFAgbWV0aG9kIHRvIG1hdGNoIHRoZSBSb3V0ZVxuICogYWdhaW5zdC5cbiAqIEByZXR1cm4ge21vZHVsZTp3b3JrYm94LXJvdXRpbmcuUm91dGV9IFRoZSBnZW5lcmF0ZWQgYFJvdXRlYChVc2VmdWwgZm9yXG4gKiB1bnJlZ2lzdGVyaW5nKS5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOndvcmtib3gtcm91dGluZ1xuICovXG5mdW5jdGlvbiByZWdpc3RlclJvdXRlKGNhcHR1cmUsIGhhbmRsZXIsIG1ldGhvZCkge1xuICAgIGxldCByb3V0ZTtcbiAgICBpZiAodHlwZW9mIGNhcHR1cmUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IGNhcHR1cmVVcmwgPSBuZXcgVVJMKGNhcHR1cmUsIGxvY2F0aW9uLmhyZWYpO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgaWYgKCEoY2FwdHVyZS5zdGFydHNXaXRoKCcvJykgfHwgY2FwdHVyZS5zdGFydHNXaXRoKCdodHRwJykpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignaW52YWxpZC1zdHJpbmcnLCB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LXJvdXRpbmcnLFxuICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ3JlZ2lzdGVyUm91dGUnLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdjYXB0dXJlJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFdlIHdhbnQgdG8gY2hlY2sgaWYgRXhwcmVzcy1zdHlsZSB3aWxkY2FyZHMgYXJlIGluIHRoZSBwYXRobmFtZSBvbmx5LlxuICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIHRoaXMgbG9nIG1lc3NhZ2UgaW4gdjQuXG4gICAgICAgICAgICBjb25zdCB2YWx1ZVRvQ2hlY2sgPSBjYXB0dXJlLnN0YXJ0c1dpdGgoJ2h0dHAnKSA/XG4gICAgICAgICAgICAgICAgY2FwdHVyZVVybC5wYXRobmFtZSA6IGNhcHR1cmU7XG4gICAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3BpbGxhcmpzL3BhdGgtdG8tcmVnZXhwI3BhcmFtZXRlcnNcbiAgICAgICAgICAgIGNvbnN0IHdpbGRjYXJkcyA9ICdbKjo/K10nO1xuICAgICAgICAgICAgaWYgKChuZXcgUmVnRXhwKGAke3dpbGRjYXJkc31gKSkuZXhlYyh2YWx1ZVRvQ2hlY2spKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBUaGUgJyRjYXB0dXJlJyBwYXJhbWV0ZXIgY29udGFpbnMgYW4gRXhwcmVzcy1zdHlsZSB3aWxkY2FyZCBgICtcbiAgICAgICAgICAgICAgICAgICAgYGNoYXJhY3RlciAoJHt3aWxkY2FyZHN9KS4gU3RyaW5ncyBhcmUgbm93IGFsd2F5cyBpbnRlcnByZXRlZCBhcyBgICtcbiAgICAgICAgICAgICAgICAgICAgYGV4YWN0IG1hdGNoZXM7IHVzZSBhIFJlZ0V4cCBmb3IgcGFydGlhbCBvciB3aWxkY2FyZCBtYXRjaGVzLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hdGNoQ2FsbGJhY2sgPSAoeyB1cmwgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBpZiAoKHVybC5wYXRobmFtZSA9PT0gY2FwdHVyZVVybC5wYXRobmFtZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgKHVybC5vcmlnaW4gIT09IGNhcHR1cmVVcmwub3JpZ2luKSkge1xuICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoYCR7Y2FwdHVyZX0gb25seSBwYXJ0aWFsbHkgbWF0Y2hlcyB0aGUgY3Jvc3Mtb3JpZ2luIFVSTCBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAke3VybH0uIFRoaXMgcm91dGUgd2lsbCBvbmx5IGhhbmRsZSBjcm9zcy1vcmlnaW4gcmVxdWVzdHMgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgaWYgdGhleSBtYXRjaCB0aGUgZW50aXJlIFVSTC5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdXJsLmhyZWYgPT09IGNhcHR1cmVVcmwuaHJlZjtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gSWYgYGNhcHR1cmVgIGlzIGEgc3RyaW5nIHRoZW4gYGhhbmRsZXJgIGFuZCBgbWV0aG9kYCBtdXN0IGJlIHByZXNlbnQuXG4gICAgICAgIHJvdXRlID0gbmV3IFJvdXRlKG1hdGNoQ2FsbGJhY2ssIGhhbmRsZXIsIG1ldGhvZCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNhcHR1cmUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgLy8gSWYgYGNhcHR1cmVgIGlzIGEgYFJlZ0V4cGAgdGhlbiBgaGFuZGxlcmAgYW5kIGBtZXRob2RgIG11c3QgYmUgcHJlc2VudC5cbiAgICAgICAgcm91dGUgPSBuZXcgUmVnRXhwUm91dGUoY2FwdHVyZSwgaGFuZGxlciwgbWV0aG9kKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNhcHR1cmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gSWYgYGNhcHR1cmVgIGlzIGEgZnVuY3Rpb24gdGhlbiBgaGFuZGxlcmAgYW5kIGBtZXRob2RgIG11c3QgYmUgcHJlc2VudC5cbiAgICAgICAgcm91dGUgPSBuZXcgUm91dGUoY2FwdHVyZSwgaGFuZGxlciwgbWV0aG9kKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY2FwdHVyZSBpbnN0YW5jZW9mIFJvdXRlKSB7XG4gICAgICAgIHJvdXRlID0gY2FwdHVyZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ3Vuc3VwcG9ydGVkLXJvdXRlLXR5cGUnLCB7XG4gICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1yb3V0aW5nJyxcbiAgICAgICAgICAgIGZ1bmNOYW1lOiAncmVnaXN0ZXJSb3V0ZScsXG4gICAgICAgICAgICBwYXJhbU5hbWU6ICdjYXB0dXJlJyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IGRlZmF1bHRSb3V0ZXIgPSBnZXRPckNyZWF0ZURlZmF1bHRSb3V0ZXIoKTtcbiAgICBkZWZhdWx0Um91dGVyLnJlZ2lzdGVyUm91dGUocm91dGUpO1xuICAgIHJldHVybiByb3V0ZTtcbn1cbmV4cG9ydCB7IHJlZ2lzdGVyUm91dGUgfTtcbiIsIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBUaGUgZGVmYXVsdCBIVFRQIG1ldGhvZCwgJ0dFVCcsIHVzZWQgd2hlbiB0aGVyZSdzIG5vIHNwZWNpZmljIG1ldGhvZFxuICogY29uZmlndXJlZCBmb3IgYSByb3V0ZS5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0TWV0aG9kID0gJ0dFVCc7XG4vKipcbiAqIFRoZSBsaXN0IG9mIHZhbGlkIEhUVFAgbWV0aG9kcyBhc3NvY2lhdGVkIHdpdGggcmVxdWVzdHMgdGhhdCBjb3VsZCBiZSByb3V0ZWQuXG4gKlxuICogQHR5cGUge0FycmF5PHN0cmluZz59XG4gKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IHZhbGlkTWV0aG9kcyA9IFtcbiAgICAnREVMRVRFJyxcbiAgICAnR0VUJyxcbiAgICAnSEVBRCcsXG4gICAgJ1BBVENIJyxcbiAgICAnUE9TVCcsXG4gICAgJ1BVVCcsXG5dO1xuIiwiLypcbiAgQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnLi4vUm91dGVyLmpzJztcbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xubGV0IGRlZmF1bHRSb3V0ZXI7XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcsIHNpbmdsZXRvbiBSb3V0ZXIgaW5zdGFuY2UgaWYgb25lIGRvZXMgbm90IGV4aXN0LiBJZiBvbmVcbiAqIGRvZXMgYWxyZWFkeSBleGlzdCwgdGhhdCBpbnN0YW5jZSBpcyByZXR1cm5lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybiB7Um91dGVyfVxuICovXG5leHBvcnQgY29uc3QgZ2V0T3JDcmVhdGVEZWZhdWx0Um91dGVyID0gKCkgPT4ge1xuICAgIGlmICghZGVmYXVsdFJvdXRlcikge1xuICAgICAgICBkZWZhdWx0Um91dGVyID0gbmV3IFJvdXRlcigpO1xuICAgICAgICAvLyBUaGUgaGVscGVycyB0aGF0IHVzZSB0aGUgZGVmYXVsdCBSb3V0ZXIgYXNzdW1lIHRoZXNlIGxpc3RlbmVycyBleGlzdC5cbiAgICAgICAgZGVmYXVsdFJvdXRlci5hZGRGZXRjaExpc3RlbmVyKCk7XG4gICAgICAgIGRlZmF1bHRSb3V0ZXIuYWRkQ2FjaGVMaXN0ZW5lcigpO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdFJvdXRlcjtcbn07XG4iLCIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvYXNzZXJ0LmpzJztcbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCl8T2JqZWN0fSBoYW5kbGVyIEVpdGhlciBhIGZ1bmN0aW9uLCBvciBhbiBvYmplY3Qgd2l0aCBhXG4gKiAnaGFuZGxlJyBtZXRob2QuXG4gKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCB3aXRoIGEgaGFuZGxlIG1ldGhvZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplSGFuZGxlciA9IChoYW5kbGVyKSA9PiB7XG4gICAgaWYgKGhhbmRsZXIgJiYgdHlwZW9mIGhhbmRsZXIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBhc3NlcnQuaGFzTWV0aG9kKGhhbmRsZXIsICdoYW5kbGUnLCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtcm91dGluZycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUm91dGUnLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2hhbmRsZXInLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhhbmRsZXI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHlwZShoYW5kbGVyLCAnZnVuY3Rpb24nLCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtcm91dGluZycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUm91dGUnLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2hhbmRsZXInLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgaGFuZGxlOiBoYW5kbGVyIH07XG4gICAgfVxufTtcbiIsIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9hc3NlcnQuanMnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2xvZ2dlci5qcyc7XG5pbXBvcnQgeyBXb3JrYm94RXJyb3IgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvV29ya2JveEVycm9yLmpzJztcbmltcG9ydCB7IFN0cmF0ZWd5IH0gZnJvbSAnLi9TdHJhdGVneS5qcyc7XG5pbXBvcnQgeyBtZXNzYWdlcyB9IGZyb20gJy4vdXRpbHMvbWVzc2FnZXMuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogQW4gaW1wbGVtZW50YXRpb24gb2YgYSBbY2FjaGUtZmlyc3Rde0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi9mdW5kYW1lbnRhbHMvaW5zdGFudC1hbmQtb2ZmbGluZS9vZmZsaW5lLWNvb2tib29rLyNjYWNoZS1mYWxsaW5nLWJhY2stdG8tbmV0d29ya31cbiAqIHJlcXVlc3Qgc3RyYXRlZ3kuXG4gKlxuICogQSBjYWNoZSBmaXJzdCBzdHJhdGVneSBpcyB1c2VmdWwgZm9yIGFzc2V0cyB0aGF0IGhhdmUgYmVlbiByZXZpc2lvbmVkLFxuICogc3VjaCBhcyBVUkxzIGxpa2UgYC9zdHlsZXMvZXhhbXBsZS5hOGY1ZjEuY3NzYCwgc2luY2UgdGhleVxuICogY2FuIGJlIGNhY2hlZCBmb3IgbG9uZyBwZXJpb2RzIG9mIHRpbWUuXG4gKlxuICogSWYgdGhlIG5ldHdvcmsgcmVxdWVzdCBmYWlscywgYW5kIHRoZXJlIGlzIG5vIGNhY2hlIG1hdGNoLCB0aGlzIHdpbGwgdGhyb3dcbiAqIGEgYFdvcmtib3hFcnJvcmAgZXhjZXB0aW9uLlxuICpcbiAqIEBleHRlbmRzIG1vZHVsZTp3b3JrYm94LXN0cmF0ZWdpZXMuU3RyYXRlZ3lcbiAqIEBtZW1iZXJvZiBtb2R1bGU6d29ya2JveC1zdHJhdGVnaWVzXG4gKi9cbmNsYXNzIENhY2hlRmlyc3QgZXh0ZW5kcyBTdHJhdGVneSB7XG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3R8c3RyaW5nfSByZXF1ZXN0IEEgcmVxdWVzdCB0byBydW4gdGhpcyBzdHJhdGVneSBmb3IuXG4gICAgICogQHBhcmFtIHttb2R1bGU6d29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5SGFuZGxlcn0gaGFuZGxlciBUaGUgZXZlbnQgdGhhdFxuICAgICAqICAgICB0cmlnZ2VyZWQgdGhlIHJlcXVlc3QuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxSZXNwb25zZT59XG4gICAgICovXG4gICAgYXN5bmMgX2hhbmRsZShyZXF1ZXN0LCBoYW5kbGVyKSB7XG4gICAgICAgIGNvbnN0IGxvZ3MgPSBbXTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc0luc3RhbmNlKHJlcXVlc3QsIFJlcXVlc3QsIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1zdHJhdGVnaWVzJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMuY29uc3RydWN0b3IubmFtZSxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ21ha2VSZXF1ZXN0JyxcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdyZXF1ZXN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGhhbmRsZXIuY2FjaGVNYXRjaChyZXF1ZXN0KTtcbiAgICAgICAgbGV0IGVycm9yO1xuICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGxvZ3MucHVzaChgTm8gcmVzcG9uc2UgZm91bmQgaW4gdGhlICcke3RoaXMuY2FjaGVOYW1lfScgY2FjaGUuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgV2lsbCByZXNwb25kIHdpdGggYSBuZXR3b3JrIHJlcXVlc3QuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gYXdhaXQgaGFuZGxlci5mZXRjaEFuZENhY2hlUHV0KHJlcXVlc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGVycm9yID0gZXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9ncy5wdXNoKGBHb3QgcmVzcG9uc2UgZnJvbSBuZXR3b3JrLmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbG9ncy5wdXNoKGBVbmFibGUgdG8gZ2V0IGEgcmVzcG9uc2UgZnJvbSB0aGUgbmV0d29yay5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGxvZ3MucHVzaChgRm91bmQgYSBjYWNoZWQgcmVzcG9uc2UgaW4gdGhlICcke3RoaXMuY2FjaGVOYW1lfScgY2FjaGUuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGxvZ2dlci5ncm91cENvbGxhcHNlZChtZXNzYWdlcy5zdHJhdGVneVN0YXJ0KHRoaXMuY29uc3RydWN0b3IubmFtZSwgcmVxdWVzdCkpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsb2cgb2YgbG9ncykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2cobG9nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1lc3NhZ2VzLnByaW50RmluYWxSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgICAgICBsb2dnZXIuZ3JvdXBFbmQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCduby1yZXNwb25zZScsIHsgdXJsOiByZXF1ZXN0LnVybCwgZXJyb3IgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbn1cbmV4cG9ydCB7IENhY2hlRmlyc3QgfTtcbiIsIi8qXG4gIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGNhY2hlTmFtZXMgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvY2FjaGVOYW1lcy5qcyc7XG5pbXBvcnQgeyBXb3JrYm94RXJyb3IgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvV29ya2JveEVycm9yLmpzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgZ2V0RnJpZW5kbHlVUkwgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvZ2V0RnJpZW5kbHlVUkwuanMnO1xuaW1wb3J0IHsgU3RyYXRlZ3lIYW5kbGVyIH0gZnJvbSAnLi9TdHJhdGVneUhhbmRsZXIuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogQW4gYWJzdHJhY3QgYmFzZSBjbGFzcyB0aGF0IGFsbCBvdGhlciBzdHJhdGVneSBjbGFzc2VzIG11c3QgZXh0ZW5kIGZyb206XG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTp3b3JrYm94LXN0cmF0ZWdpZXNcbiAqL1xuY2xhc3MgU3RyYXRlZ3kge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHN0cmF0ZWd5IGFuZCBzZXRzIGFsbCBkb2N1bWVudGVkIG9wdGlvblxuICAgICAqIHByb3BlcnRpZXMgYXMgcHVibGljIGluc3RhbmNlIHByb3BlcnRpZXMuXG4gICAgICpcbiAgICAgKiBOb3RlOiBpZiBhIGN1c3RvbSBzdHJhdGVneSBjbGFzcyBleHRlbmRzIHRoZSBiYXNlIFN0cmF0ZWd5IGNsYXNzIGFuZCBkb2VzXG4gICAgICogbm90IG5lZWQgbW9yZSB0aGFuIHRoZXNlIHByb3BlcnRpZXMsIGl0IGRvZXMgbm90IG5lZWQgdG8gZGVmaW5lIGl0cyBvd25cbiAgICAgKiBjb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuY2FjaGVOYW1lXSBDYWNoZSBuYW1lIHRvIHN0b3JlIGFuZCByZXRyaWV2ZVxuICAgICAqIHJlcXVlc3RzLiBEZWZhdWx0cyB0byB0aGUgY2FjaGUgbmFtZXMgcHJvdmlkZWQgYnlcbiAgICAgKiBbd29ya2JveC1jb3JlXXtAbGluayBtb2R1bGU6d29ya2JveC1jb3JlLmNhY2hlTmFtZXN9LlxuICAgICAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gW29wdGlvbnMucGx1Z2luc10gW1BsdWdpbnNde0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi90b29scy93b3JrYm94L2d1aWRlcy91c2luZy1wbHVnaW5zfVxuICAgICAqIHRvIHVzZSBpbiBjb25qdW5jdGlvbiB3aXRoIHRoaXMgY2FjaGluZyBzdHJhdGVneS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuZmV0Y2hPcHRpb25zXSBWYWx1ZXMgcGFzc2VkIGFsb25nIHRvIHRoZVxuICAgICAqIFtgaW5pdGBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3dPcldvcmtlckdsb2JhbFNjb3BlL2ZldGNoI1BhcmFtZXRlcnMpXG4gICAgICogb2YgW25vbi1uYXZpZ2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvaXNzdWVzLzE3OTYpXG4gICAgICogYGZldGNoKClgIHJlcXVlc3RzIG1hZGUgYnkgdGhpcyBzdHJhdGVneS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMubWF0Y2hPcHRpb25zXSBUaGVcbiAgICAgKiBbYENhY2hlUXVlcnlPcHRpb25zYF17QGxpbmsgaHR0cHM6Ly93M2MuZ2l0aHViLmlvL1NlcnZpY2VXb3JrZXIvI2RpY3RkZWYtY2FjaGVxdWVyeW9wdGlvbnN9XG4gICAgICogZm9yIGFueSBgY2FjaGUubWF0Y2goKWAgb3IgYGNhY2hlLnB1dCgpYCBjYWxscyBtYWRlIGJ5IHRoaXMgc3RyYXRlZ3kuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYWNoZSBuYW1lIHRvIHN0b3JlIGFuZCByZXRyaWV2ZVxuICAgICAgICAgKiByZXF1ZXN0cy4gRGVmYXVsdHMgdG8gdGhlIGNhY2hlIG5hbWVzIHByb3ZpZGVkIGJ5XG4gICAgICAgICAqIFt3b3JrYm94LWNvcmVde0BsaW5rIG1vZHVsZTp3b3JrYm94LWNvcmUuY2FjaGVOYW1lc30uXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNhY2hlTmFtZSA9IGNhY2hlTmFtZXMuZ2V0UnVudGltZU5hbWUob3B0aW9ucy5jYWNoZU5hbWUpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGxpc3RcbiAgICAgICAgICogW1BsdWdpbnNde0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi90b29scy93b3JrYm94L2d1aWRlcy91c2luZy1wbHVnaW5zfVxuICAgICAgICAgKiB1c2VkIGJ5IHRoaXMgc3RyYXRlZ3kuXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtBcnJheTxPYmplY3Q+fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wbHVnaW5zID0gb3B0aW9ucy5wbHVnaW5zIHx8IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogVmFsdWVzIHBhc3NlZCBhbG9uZyB0byB0aGVcbiAgICAgICAgICogW2Bpbml0YF17QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvd09yV29ya2VyR2xvYmFsU2NvcGUvZmV0Y2gjUGFyYW1ldGVyc31cbiAgICAgICAgICogb2YgYWxsIGZldGNoKCkgcmVxdWVzdHMgbWFkZSBieSB0aGlzIHN0cmF0ZWd5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5mZXRjaE9wdGlvbnMgPSBvcHRpb25zLmZldGNoT3B0aW9ucztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZVxuICAgICAgICAgKiBbYENhY2hlUXVlcnlPcHRpb25zYF17QGxpbmsgaHR0cHM6Ly93M2MuZ2l0aHViLmlvL1NlcnZpY2VXb3JrZXIvI2RpY3RkZWYtY2FjaGVxdWVyeW9wdGlvbnN9XG4gICAgICAgICAqIGZvciBhbnkgYGNhY2hlLm1hdGNoKClgIG9yIGBjYWNoZS5wdXQoKWAgY2FsbHMgbWFkZSBieSB0aGlzIHN0cmF0ZWd5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tYXRjaE9wdGlvbnMgPSBvcHRpb25zLm1hdGNoT3B0aW9ucztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIHJlcXVlc3Qgc3RyYXRlZ3kgYW5kIHJldHVybnMgYSBgUHJvbWlzZWAgdGhhdCB3aWxsIHJlc29sdmUgd2l0aFxuICAgICAqIGEgYFJlc3BvbnNlYCwgaW52b2tpbmcgYWxsIHJlbGV2YW50IHBsdWdpbiBjYWxsYmFja3MuXG4gICAgICpcbiAgICAgKiBXaGVuIGEgc3RyYXRlZ3kgaW5zdGFuY2UgaXMgcmVnaXN0ZXJlZCB3aXRoIGEgV29ya2JveFxuICAgICAqIFtyb3V0ZV17QGxpbmsgbW9kdWxlOndvcmtib3gtcm91dGluZy5Sb3V0ZX0sIHRoaXMgbWV0aG9kIGlzIGF1dG9tYXRpY2FsbHlcbiAgICAgKiBjYWxsZWQgd2hlbiB0aGUgcm91dGUgbWF0Y2hlcy5cbiAgICAgKlxuICAgICAqIEFsdGVybmF0aXZlbHksIHRoaXMgbWV0aG9kIGNhbiBiZSB1c2VkIGluIGEgc3RhbmRhbG9uZSBgRmV0Y2hFdmVudGBcbiAgICAgKiBsaXN0ZW5lciBieSBwYXNzaW5nIGl0IHRvIGBldmVudC5yZXNwb25kV2l0aCgpYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RmV0Y2hFdmVudHxPYmplY3R9IG9wdGlvbnMgQSBgRmV0Y2hFdmVudGAgb3IgYW4gb2JqZWN0IHdpdGggdGhlXG4gICAgICogICAgIHByb3BlcnRpZXMgbGlzdGVkIGJlbG93LlxuICAgICAqIEBwYXJhbSB7UmVxdWVzdHxzdHJpbmd9IG9wdGlvbnMucmVxdWVzdCBBIHJlcXVlc3QgdG8gcnVuIHRoaXMgc3RyYXRlZ3kgZm9yLlxuICAgICAqIEBwYXJhbSB7RXh0ZW5kYWJsZUV2ZW50fSBvcHRpb25zLmV2ZW50IFRoZSBldmVudCBhc3NvY2lhdGVkIHdpdGggdGhlXG4gICAgICogICAgIHJlcXVlc3QuXG4gICAgICogQHBhcmFtIHtVUkx9IFtvcHRpb25zLnVybF1cbiAgICAgKiBAcGFyYW0geyp9IFtvcHRpb25zLnBhcmFtc11cbiAgICAgKi9cbiAgICBoYW5kbGUob3B0aW9ucykge1xuICAgICAgICBjb25zdCBbcmVzcG9uc2VEb25lXSA9IHRoaXMuaGFuZGxlQWxsKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2VEb25lO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaW1pbGFyIHRvIFtgaGFuZGxlKClgXXtAbGluayBtb2R1bGU6d29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5fmhhbmRsZX0sIGJ1dFxuICAgICAqIGluc3RlYWQgb2YganVzdCByZXR1cm5pbmcgYSBgUHJvbWlzZWAgdGhhdCByZXNvbHZlcyB0byBhIGBSZXNwb25zZWAgaXRcbiAgICAgKiBpdCB3aWxsIHJldHVybiBhbiB0dXBsZSBvZiBbcmVzcG9uc2UsIGRvbmVdIHByb21pc2VzLCB3aGVyZSB0aGUgZm9ybWVyXG4gICAgICogKGByZXNwb25zZWApIGlzIGVxdWl2YWxlbnQgdG8gd2hhdCBgaGFuZGxlKClgIHJldHVybnMsIGFuZCB0aGUgbGF0dGVyIGlzIGFcbiAgICAgKiBQcm9taXNlIHRoYXQgd2lsbCByZXNvbHZlIG9uY2UgYW55IHByb21pc2VzIHRoYXQgd2VyZSBhZGRlZCB0b1xuICAgICAqIGBldmVudC53YWl0VW50aWwoKWAgYXMgcGFydCBvZiBwZXJmb3JtaW5nIHRoZSBzdHJhdGVneSBoYXZlIGNvbXBsZXRlZC5cbiAgICAgKlxuICAgICAqIFlvdSBjYW4gYXdhaXQgdGhlIGBkb25lYCBwcm9taXNlIHRvIGVuc3VyZSBhbnkgZXh0cmEgd29yayBwZXJmb3JtZWQgYnlcbiAgICAgKiB0aGUgc3RyYXRlZ3kgKHVzdWFsbHkgY2FjaGluZyByZXNwb25zZXMpIGNvbXBsZXRlcyBzdWNjZXNzZnVsbHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0ZldGNoRXZlbnR8T2JqZWN0fSBvcHRpb25zIEEgYEZldGNoRXZlbnRgIG9yIGFuIG9iamVjdCB3aXRoIHRoZVxuICAgICAqICAgICBwcm9wZXJ0aWVzIGxpc3RlZCBiZWxvdy5cbiAgICAgKiBAcGFyYW0ge1JlcXVlc3R8c3RyaW5nfSBvcHRpb25zLnJlcXVlc3QgQSByZXF1ZXN0IHRvIHJ1biB0aGlzIHN0cmF0ZWd5IGZvci5cbiAgICAgKiBAcGFyYW0ge0V4dGVuZGFibGVFdmVudH0gb3B0aW9ucy5ldmVudCBUaGUgZXZlbnQgYXNzb2NpYXRlZCB3aXRoIHRoZVxuICAgICAqICAgICByZXF1ZXN0LlxuICAgICAqIEBwYXJhbSB7VVJMfSBbb3B0aW9ucy51cmxdXG4gICAgICogQHBhcmFtIHsqfSBbb3B0aW9ucy5wYXJhbXNdXG4gICAgICogQHJldHVybiB7QXJyYXk8UHJvbWlzZT59IEEgdHVwbGUgb2YgW3Jlc3BvbnNlLCBkb25lXVxuICAgICAqICAgICBwcm9taXNlcyB0aGF0IGNhbiBiZSB1c2VkIHRvIGRldGVybWluZSB3aGVuIHRoZSByZXNwb25zZSByZXNvbHZlcyBhc1xuICAgICAqICAgICB3ZWxsIGFzIHdoZW4gdGhlIGhhbmRsZXIgaGFzIGNvbXBsZXRlZCBhbGwgaXRzIHdvcmsuXG4gICAgICovXG4gICAgaGFuZGxlQWxsKG9wdGlvbnMpIHtcbiAgICAgICAgLy8gQWxsb3cgZm9yIGZsZXhpYmxlIG9wdGlvbnMgdG8gYmUgcGFzc2VkLlxuICAgICAgICBpZiAob3B0aW9ucyBpbnN0YW5jZW9mIEZldGNoRXZlbnQpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgZXZlbnQ6IG9wdGlvbnMsXG4gICAgICAgICAgICAgICAgcmVxdWVzdDogb3B0aW9ucy5yZXF1ZXN0LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBldmVudCA9IG9wdGlvbnMuZXZlbnQ7XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSB0eXBlb2Ygb3B0aW9ucy5yZXF1ZXN0ID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgICBuZXcgUmVxdWVzdChvcHRpb25zLnJlcXVlc3QpIDpcbiAgICAgICAgICAgIG9wdGlvbnMucmVxdWVzdDtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gJ3BhcmFtcycgaW4gb3B0aW9ucyA/IG9wdGlvbnMucGFyYW1zIDogdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gbmV3IFN0cmF0ZWd5SGFuZGxlcih0aGlzLCB7IGV2ZW50LCByZXF1ZXN0LCBwYXJhbXMgfSk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlRG9uZSA9IHRoaXMuX2dldFJlc3BvbnNlKGhhbmRsZXIsIHJlcXVlc3QsIGV2ZW50KTtcbiAgICAgICAgY29uc3QgaGFuZGxlckRvbmUgPSB0aGlzLl9hd2FpdENvbXBsZXRlKHJlc3BvbnNlRG9uZSwgaGFuZGxlciwgcmVxdWVzdCwgZXZlbnQpO1xuICAgICAgICAvLyBSZXR1cm4gYW4gYXJyYXkgb2YgcHJvbWlzZXMsIHN1aXRhYmxlIGZvciB1c2Ugd2l0aCBQcm9taXNlLmFsbCgpLlxuICAgICAgICByZXR1cm4gW3Jlc3BvbnNlRG9uZSwgaGFuZGxlckRvbmVdO1xuICAgIH1cbiAgICBhc3luYyBfZ2V0UmVzcG9uc2UoaGFuZGxlciwgcmVxdWVzdCwgZXZlbnQpIHtcbiAgICAgICAgYXdhaXQgaGFuZGxlci5ydW5DYWxsYmFja3MoJ2hhbmRsZXJXaWxsU3RhcnQnLCB7IGV2ZW50LCByZXF1ZXN0IH0pO1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2hhbmRsZShyZXF1ZXN0LCBoYW5kbGVyKTtcbiAgICAgICAgICAgIC8vIFRoZSBcIm9mZmljaWFsXCIgU3RyYXRlZ3kgc3ViY2xhc3NlcyBhbGwgdGhyb3cgdGhpcyBlcnJvciBhdXRvbWF0aWNhbGx5LFxuICAgICAgICAgICAgLy8gYnV0IGluIGNhc2UgYSB0aGlyZC1wYXJ0eSBTdHJhdGVneSBkb2Vzbid0LCBlbnN1cmUgdGhhdCB3ZSBoYXZlIGFcbiAgICAgICAgICAgIC8vIGNvbnNpc3RlbnQgZmFpbHVyZSB3aGVuIHRoZXJlJ3Mgbm8gcmVzcG9uc2Ugb3IgYW4gZXJyb3IgcmVzcG9uc2UuXG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnR5cGUgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCduby1yZXNwb25zZScsIHsgdXJsOiByZXF1ZXN0LnVybCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgaGFuZGxlci5pdGVyYXRlQ2FsbGJhY2tzKCdoYW5kbGVyRGlkRXJyb3InKSkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gYXdhaXQgY2FsbGJhY2soeyBlcnJvciwgZXZlbnQsIHJlcXVlc3QgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBXaGlsZSByZXNwb25kaW5nIHRvICcke2dldEZyaWVuZGx5VVJMKHJlcXVlc3QudXJsKX0nLCBgICtcbiAgICAgICAgICAgICAgICAgICAgYGFuICR7ZXJyb3J9IGVycm9yIG9jY3VycmVkLiBVc2luZyBhIGZhbGxiYWNrIHJlc3BvbnNlIHByb3ZpZGVkIGJ5IGAgK1xuICAgICAgICAgICAgICAgICAgICBgYSBoYW5kbGVyRGlkRXJyb3IgcGx1Z2luLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgaGFuZGxlci5pdGVyYXRlQ2FsbGJhY2tzKCdoYW5kbGVyV2lsbFJlc3BvbmQnKSkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCBjYWxsYmFjayh7IGV2ZW50LCByZXF1ZXN0LCByZXNwb25zZSB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuICAgIGFzeW5jIF9hd2FpdENvbXBsZXRlKHJlc3BvbnNlRG9uZSwgaGFuZGxlciwgcmVxdWVzdCwgZXZlbnQpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlO1xuICAgICAgICBsZXQgZXJyb3I7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IHJlc3BvbnNlRG9uZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIElnbm9yZSBlcnJvcnMsIGFzIHJlc3BvbnNlIGVycm9ycyBzaG91bGQgYmUgY2F1Z2h0IHZpYSB0aGUgYHJlc3BvbnNlYFxuICAgICAgICAgICAgLy8gcHJvbWlzZSBhYm92ZS4gVGhlIGBkb25lYCBwcm9taXNlIHdpbGwgb25seSB0aHJvdyBmb3IgZXJyb3JzIGluXG4gICAgICAgICAgICAvLyBwcm9taXNlcyBwYXNzZWQgdG8gYGhhbmRsZXIud2FpdFVudGlsKClgLlxuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBoYW5kbGVyLnJ1bkNhbGxiYWNrcygnaGFuZGxlckRpZFJlc3BvbmQnLCB7XG4gICAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgaGFuZGxlci5kb25lV2FpdGluZygpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoICh3YWl0VW50aWxFcnJvcikge1xuICAgICAgICAgICAgZXJyb3IgPSB3YWl0VW50aWxFcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBoYW5kbGVyLnJ1bkNhbGxiYWNrcygnaGFuZGxlckRpZENvbXBsZXRlJywge1xuICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICByZXF1ZXN0LFxuICAgICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICAgICBlcnJvcixcbiAgICAgICAgfSk7XG4gICAgICAgIGhhbmRsZXIuZGVzdHJveSgpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IHsgU3RyYXRlZ3kgfTtcbi8qKlxuICogQ2xhc3NlcyBleHRlbmRpbmcgdGhlIGBTdHJhdGVneWAgYmFzZWQgY2xhc3Mgc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCxcbiAqIGFuZCBsZXZlcmFnZSB0aGUgW2BoYW5kbGVyYF17QGxpbmsgbW9kdWxlOndvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneUhhbmRsZXJ9XG4gKiBhcmcgdG8gcGVyZm9ybSBhbGwgZmV0Y2hpbmcgYW5kIGNhY2hlIGxvZ2ljLCB3aGljaCB3aWxsIGVuc3VyZSBhbGwgcmVsZXZhbnRcbiAqIGNhY2hlLCBjYWNoZSBvcHRpb25zLCBmZXRjaCBvcHRpb25zIGFuZCBwbHVnaW5zIGFyZSB1c2VkIChwZXIgdGhlIGN1cnJlbnRcbiAqIHN0cmF0ZWd5IGluc3RhbmNlKS5cbiAqXG4gKiBAbmFtZSBfaGFuZGxlXG4gKiBAaW5zdGFuY2VcbiAqIEBhYnN0cmFjdFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge1JlcXVlc3R9IHJlcXVlc3RcbiAqIEBwYXJhbSB7bW9kdWxlOndvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneUhhbmRsZXJ9IGhhbmRsZXJcbiAqIEByZXR1cm4ge1Byb21pc2U8UmVzcG9uc2U+fVxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6d29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5XG4gKi9cbiIsIi8qXG4gIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9hc3NlcnQuanMnO1xuaW1wb3J0IHsgY2FjaGVNYXRjaElnbm9yZVBhcmFtcyB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9jYWNoZU1hdGNoSWdub3JlUGFyYW1zLmpzJztcbmltcG9ydCB7IERlZmVycmVkIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL0RlZmVycmVkLmpzJztcbmltcG9ydCB7IGV4ZWN1dGVRdW90YUVycm9yQ2FsbGJhY2tzIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2V4ZWN1dGVRdW90YUVycm9yQ2FsbGJhY2tzLmpzJztcbmltcG9ydCB7IGdldEZyaWVuZGx5VVJMIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2dldEZyaWVuZGx5VVJMLmpzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgdGltZW91dCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS90aW1lb3V0LmpzJztcbmltcG9ydCB7IFdvcmtib3hFcnJvciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9Xb3JrYm94RXJyb3IuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbmZ1bmN0aW9uIHRvUmVxdWVzdChpbnB1dCkge1xuICAgIHJldHVybiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykgPyBuZXcgUmVxdWVzdChpbnB1dCkgOiBpbnB1dDtcbn1cbi8qKlxuICogQSBjbGFzcyBjcmVhdGVkIGV2ZXJ5IHRpbWUgYSBTdHJhdGVneSBpbnN0YW5jZSBpbnN0YW5jZSBjYWxsc1xuICogW2hhbmRsZSgpXXtAbGluayBtb2R1bGU6d29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5fmhhbmRsZX0gb3JcbiAqIFtoYW5kbGVBbGwoKV17QGxpbmsgbW9kdWxlOndvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneX5oYW5kbGVBbGx9IHRoYXQgd3JhcHMgYWxsIGZldGNoIGFuZFxuICogY2FjaGUgYWN0aW9ucyBhcm91bmQgcGx1Z2luIGNhbGxiYWNrcyBhbmQga2VlcHMgdHJhY2sgb2Ygd2hlbiB0aGUgc3RyYXRlZ3lcbiAqIGlzIFwiZG9uZVwiIChpLmUuIGFsbCBhZGRlZCBgZXZlbnQud2FpdFVudGlsKClgIHByb21pc2VzIGhhdmUgcmVzb2x2ZWQpLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6d29ya2JveC1zdHJhdGVnaWVzXG4gKi9cbmNsYXNzIFN0cmF0ZWd5SGFuZGxlciB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBhc3NvY2lhdGVkIHdpdGggdGhlIHBhc3NlZCBzdHJhdGVneSBhbmQgZXZlbnRcbiAgICAgKiB0aGF0J3MgaGFuZGxpbmcgdGhlIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgYWxzbyBpbml0aWFsaXplcyB0aGUgc3RhdGUgdGhhdCB3aWxsIGJlIHBhc3NlZCB0byBlYWNoIG9mXG4gICAgICogdGhlIHBsdWdpbnMgaGFuZGxpbmcgdGhpcyByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHttb2R1bGU6d29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5fSBzdHJhdGVneVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fHN0cmluZ30gb3B0aW9ucy5yZXF1ZXN0IEEgcmVxdWVzdCB0byBydW4gdGhpcyBzdHJhdGVneSBmb3IuXG4gICAgICogQHBhcmFtIHtFeHRlbmRhYmxlRXZlbnR9IG9wdGlvbnMuZXZlbnQgVGhlIGV2ZW50IGFzc29jaWF0ZWQgd2l0aCB0aGVcbiAgICAgKiAgICAgcmVxdWVzdC5cbiAgICAgKiBAcGFyYW0ge1VSTH0gW29wdGlvbnMudXJsXVxuICAgICAqIEBwYXJhbSB7Kn0gW29wdGlvbnMucGFyYW1zXVxuICAgICAqICAgICBbbWF0Y2ggY2FsbGJhY2tde0BsaW5rIG1vZHVsZTp3b3JrYm94LXJvdXRpbmd+bWF0Y2hDYWxsYmFja30sXG4gICAgICogICAgIChpZiBhcHBsaWNhYmxlKS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzdHJhdGVneSwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLl9jYWNoZUtleXMgPSB7fTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSByZXF1ZXN0IHRoZSBzdHJhdGVneSBpcyBwZXJmb3JtaW5nIChwYXNzZWQgdG8gdGhlIHN0cmF0ZWd5J3NcbiAgICAgICAgICogYGhhbmRsZSgpYCBvciBgaGFuZGxlQWxsKClgIG1ldGhvZCkuXG4gICAgICAgICAqIEBuYW1lIHJlcXVlc3RcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqIEB0eXBlIHtSZXF1ZXN0fVxuICAgICAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOndvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneUhhbmRsZXJcbiAgICAgICAgICovXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZXZlbnQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgcmVxdWVzdC5cbiAgICAgICAgICogQG5hbWUgZXZlbnRcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqIEB0eXBlIHtFeHRlbmRhYmxlRXZlbnR9XG4gICAgICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6d29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5SGFuZGxlclxuICAgICAgICAgKi9cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgYFVSTGAgaW5zdGFuY2Ugb2YgYHJlcXVlc3QudXJsYCAoaWYgcGFzc2VkIHRvIHRoZSBzdHJhdGVneSdzXG4gICAgICAgICAqIGBoYW5kbGUoKWAgb3IgYGhhbmRsZUFsbCgpYCBtZXRob2QpLlxuICAgICAgICAgKiBOb3RlOiB0aGUgYHVybGAgcGFyYW0gd2lsbCBiZSBwcmVzZW50IGlmIHRoZSBzdHJhdGVneSB3YXMgaW52b2tlZFxuICAgICAgICAgKiBmcm9tIGEgd29ya2JveCBgUm91dGVgIG9iamVjdC5cbiAgICAgICAgICogQG5hbWUgdXJsXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKiBAdHlwZSB7VVJMfHVuZGVmaW5lZH1cbiAgICAgICAgICogQG1lbWJlcm9mIG1vZHVsZTp3b3JrYm94LXN0cmF0ZWdpZXMuU3RyYXRlZ3lIYW5kbGVyXG4gICAgICAgICAqL1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBgcGFyYW1gIHZhbHVlIChpZiBwYXNzZWQgdG8gdGhlIHN0cmF0ZWd5J3NcbiAgICAgICAgICogYGhhbmRsZSgpYCBvciBgaGFuZGxlQWxsKClgIG1ldGhvZCkuXG4gICAgICAgICAqIE5vdGU6IHRoZSBgcGFyYW1gIHBhcmFtIHdpbGwgYmUgcHJlc2VudCBpZiB0aGUgc3RyYXRlZ3kgd2FzIGludm9rZWRcbiAgICAgICAgICogZnJvbSBhIHdvcmtib3ggYFJvdXRlYCBvYmplY3QgYW5kIHRoZVxuICAgICAgICAgKiBbbWF0Y2ggY2FsbGJhY2tde0BsaW5rIG1vZHVsZTp3b3JrYm94LXJvdXRpbmd+bWF0Y2hDYWxsYmFja30gcmV0dXJuZWRcbiAgICAgICAgICogYSB0cnV0aHkgdmFsdWUgKGl0IHdpbGwgYmUgdGhhdCB2YWx1ZSkuXG4gICAgICAgICAqIEBuYW1lIHBhcmFtc1xuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICogQHR5cGUgeyp8dW5kZWZpbmVkfVxuICAgICAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOndvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneUhhbmRsZXJcbiAgICAgICAgICovXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBhc3NlcnQuaXNJbnN0YW5jZShvcHRpb25zLmV2ZW50LCBFeHRlbmRhYmxlRXZlbnQsIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1zdHJhdGVnaWVzJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdTdHJhdGVneUhhbmRsZXInLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ29wdGlvbnMuZXZlbnQnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5ldmVudCA9IG9wdGlvbnMuZXZlbnQ7XG4gICAgICAgIHRoaXMuX3N0cmF0ZWd5ID0gc3RyYXRlZ3k7XG4gICAgICAgIHRoaXMuX2hhbmRsZXJEZWZlcnJlZCA9IG5ldyBEZWZlcnJlZCgpO1xuICAgICAgICB0aGlzLl9leHRlbmRMaWZldGltZVByb21pc2VzID0gW107XG4gICAgICAgIC8vIENvcHkgdGhlIHBsdWdpbnMgbGlzdCAoc2luY2UgaXQncyBtdXRhYmxlIG9uIHRoZSBzdHJhdGVneSksXG4gICAgICAgIC8vIHNvIGFueSBtdXRhdGlvbnMgZG9uJ3QgYWZmZWN0IHRoaXMgaGFuZGxlciBpbnN0YW5jZS5cbiAgICAgICAgdGhpcy5fcGx1Z2lucyA9IFsuLi5zdHJhdGVneS5wbHVnaW5zXTtcbiAgICAgICAgdGhpcy5fcGx1Z2luU3RhdGVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMuX3BsdWdpbnMpIHtcbiAgICAgICAgICAgIHRoaXMuX3BsdWdpblN0YXRlTWFwLnNldChwbHVnaW4sIHt9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV2ZW50LndhaXRVbnRpbCh0aGlzLl9oYW5kbGVyRGVmZXJyZWQucHJvbWlzZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZldGNoZXMgYSBnaXZlbiByZXF1ZXN0IChhbmQgaW52b2tlcyBhbnkgYXBwbGljYWJsZSBwbHVnaW4gY2FsbGJhY2tcbiAgICAgKiBtZXRob2RzKSB1c2luZyB0aGUgYGZldGNoT3B0aW9uc2AgKGZvciBub24tbmF2aWdhdGlvbiByZXF1ZXN0cykgYW5kXG4gICAgICogYHBsdWdpbnNgIGRlZmluZWQgb24gdGhlIGBTdHJhdGVneWAgb2JqZWN0LlxuICAgICAqXG4gICAgICogVGhlIGZvbGxvd2luZyBwbHVnaW4gbGlmZWN5Y2xlIG1ldGhvZHMgYXJlIGludm9rZWQgd2hlbiB1c2luZyB0aGlzIG1ldGhvZDpcbiAgICAgKiAtIGByZXF1ZXN0V2lsbEZldGNoKClgXG4gICAgICogLSBgZmV0Y2hEaWRTdWNjZWVkKClgXG4gICAgICogLSBgZmV0Y2hEaWRGYWlsKClgXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3R8c3RyaW5nfSBpbnB1dCBUaGUgVVJMIG9yIHJlcXVlc3QgdG8gZmV0Y2guXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxSZXNwb25zZT59XG4gICAgICovXG4gICAgYXN5bmMgZmV0Y2goaW5wdXQpIHtcbiAgICAgICAgY29uc3QgeyBldmVudCB9ID0gdGhpcztcbiAgICAgICAgbGV0IHJlcXVlc3QgPSB0b1JlcXVlc3QoaW5wdXQpO1xuICAgICAgICBpZiAocmVxdWVzdC5tb2RlID09PSAnbmF2aWdhdGUnICYmXG4gICAgICAgICAgICBldmVudCBpbnN0YW5jZW9mIEZldGNoRXZlbnQgJiZcbiAgICAgICAgICAgIGV2ZW50LnByZWxvYWRSZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc3QgcG9zc2libGVQcmVsb2FkUmVzcG9uc2UgPSBhd2FpdCBldmVudC5wcmVsb2FkUmVzcG9uc2U7XG4gICAgICAgICAgICBpZiAocG9zc2libGVQcmVsb2FkUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBVc2luZyBhIHByZWxvYWRlZCBuYXZpZ2F0aW9uIHJlc3BvbnNlIGZvciBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAnJHtnZXRGcmllbmRseVVSTChyZXF1ZXN0LnVybCl9J2ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zc2libGVQcmVsb2FkUmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBmZXRjaERpZEZhaWwgcGx1Z2luLCB3ZSBuZWVkIHRvIHNhdmUgYSBjbG9uZSBvZiB0aGVcbiAgICAgICAgLy8gb3JpZ2luYWwgcmVxdWVzdCBiZWZvcmUgaXQncyBlaXRoZXIgbW9kaWZpZWQgYnkgYSByZXF1ZXN0V2lsbEZldGNoXG4gICAgICAgIC8vIHBsdWdpbiBvciBiZWZvcmUgdGhlIG9yaWdpbmFsIHJlcXVlc3QncyBib2R5IGlzIGNvbnN1bWVkIHZpYSBmZXRjaCgpLlxuICAgICAgICBjb25zdCBvcmlnaW5hbFJlcXVlc3QgPSB0aGlzLmhhc0NhbGxiYWNrKCdmZXRjaERpZEZhaWwnKSA/XG4gICAgICAgICAgICByZXF1ZXN0LmNsb25lKCkgOiBudWxsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjYiBvZiB0aGlzLml0ZXJhdGVDYWxsYmFja3MoJ3JlcXVlc3RXaWxsRmV0Y2gnKSkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QgPSBhd2FpdCBjYih7IHJlcXVlc3Q6IHJlcXVlc3QuY2xvbmUoKSwgZXZlbnQgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcigncGx1Z2luLWVycm9yLXJlcXVlc3Qtd2lsbC1mZXRjaCcsIHtcbiAgICAgICAgICAgICAgICB0aHJvd25FcnJvcjogZXJyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIHJlcXVlc3QgY2FuIGJlIGFsdGVyZWQgYnkgcGx1Z2lucyB3aXRoIGByZXF1ZXN0V2lsbEZldGNoYCBtYWtpbmdcbiAgICAgICAgLy8gdGhlIG9yaWdpbmFsIHJlcXVlc3QgKG1vc3QgbGlrZWx5IGZyb20gYSBgZmV0Y2hgIGV2ZW50KSBkaWZmZXJlbnRcbiAgICAgICAgLy8gZnJvbSB0aGUgUmVxdWVzdCB3ZSBtYWtlLiBQYXNzIGJvdGggdG8gYGZldGNoRGlkRmFpbGAgdG8gYWlkIGRlYnVnZ2luZy5cbiAgICAgICAgY29uc3QgcGx1Z2luRmlsdGVyZWRSZXF1ZXN0ID0gcmVxdWVzdC5jbG9uZSgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGZldGNoUmVzcG9uc2U7XG4gICAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS93b3JrYm94L2lzc3Vlcy8xNzk2XG4gICAgICAgICAgICBmZXRjaFJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdCwgcmVxdWVzdC5tb2RlID09PSAnbmF2aWdhdGUnID9cbiAgICAgICAgICAgICAgICB1bmRlZmluZWQgOiB0aGlzLl9zdHJhdGVneS5mZXRjaE9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoYE5ldHdvcmsgcmVxdWVzdCBmb3IgYCArXG4gICAgICAgICAgICAgICAgICAgIGAnJHtnZXRGcmllbmRseVVSTChyZXF1ZXN0LnVybCl9JyByZXR1cm5lZCBhIHJlc3BvbnNlIHdpdGggYCArXG4gICAgICAgICAgICAgICAgICAgIGBzdGF0dXMgJyR7ZmV0Y2hSZXNwb25zZS5zdGF0dXN9Jy5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgdGhpcy5pdGVyYXRlQ2FsbGJhY2tzKCdmZXRjaERpZFN1Y2NlZWQnKSkge1xuICAgICAgICAgICAgICAgIGZldGNoUmVzcG9uc2UgPSBhd2FpdCBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0OiBwbHVnaW5GaWx0ZXJlZFJlcXVlc3QsXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBmZXRjaFJlc3BvbnNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZldGNoUmVzcG9uc2U7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYE5ldHdvcmsgcmVxdWVzdCBmb3IgYCArXG4gICAgICAgICAgICAgICAgICAgIGAnJHtnZXRGcmllbmRseVVSTChyZXF1ZXN0LnVybCl9JyB0aHJldyBhbiBlcnJvci5gLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBgb3JpZ2luYWxSZXF1ZXN0YCB3aWxsIG9ubHkgZXhpc3QgaWYgYSBgZmV0Y2hEaWRGYWlsYCBjYWxsYmFja1xuICAgICAgICAgICAgLy8gaXMgYmVpbmcgdXNlZCAoc2VlIGFib3ZlKS5cbiAgICAgICAgICAgIGlmIChvcmlnaW5hbFJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnJ1bkNhbGxiYWNrcygnZmV0Y2hEaWRGYWlsJywge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUmVxdWVzdDogb3JpZ2luYWxSZXF1ZXN0LmNsb25lKCksXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3Q6IHBsdWdpbkZpbHRlcmVkUmVxdWVzdC5jbG9uZSgpLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbHMgYHRoaXMuZmV0Y2goKWAgYW5kIChpbiB0aGUgYmFja2dyb3VuZCkgcnVucyBgdGhpcy5jYWNoZVB1dCgpYCBvblxuICAgICAqIHRoZSByZXNwb25zZSBnZW5lcmF0ZWQgYnkgYHRoaXMuZmV0Y2goKWAuXG4gICAgICpcbiAgICAgKiBUaGUgY2FsbCB0byBgdGhpcy5jYWNoZVB1dCgpYCBhdXRvbWF0aWNhbGx5IGludm9rZXMgYHRoaXMud2FpdFVudGlsKClgLFxuICAgICAqIHNvIHlvdSBkbyBub3QgaGF2ZSB0byBtYW51YWxseSBjYWxsIGB3YWl0VW50aWwoKWAgb24gdGhlIGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fHN0cmluZ30gaW5wdXQgVGhlIHJlcXVlc3Qgb3IgVVJMIHRvIGZldGNoIGFuZCBjYWNoZS5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFJlc3BvbnNlPn1cbiAgICAgKi9cbiAgICBhc3luYyBmZXRjaEFuZENhY2hlUHV0KGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5mZXRjaChpbnB1dCk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlQ2xvbmUgPSByZXNwb25zZS5jbG9uZSgpO1xuICAgICAgICB0aGlzLndhaXRVbnRpbCh0aGlzLmNhY2hlUHV0KGlucHV0LCByZXNwb25zZUNsb25lKSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2hlcyBhIHJlcXVlc3QgZnJvbSB0aGUgY2FjaGUgKGFuZCBpbnZva2VzIGFueSBhcHBsaWNhYmxlIHBsdWdpblxuICAgICAqIGNhbGxiYWNrIG1ldGhvZHMpIHVzaW5nIHRoZSBgY2FjaGVOYW1lYCwgYG1hdGNoT3B0aW9uc2AsIGFuZCBgcGx1Z2luc2BcbiAgICAgKiBkZWZpbmVkIG9uIHRoZSBzdHJhdGVneSBvYmplY3QuXG4gICAgICpcbiAgICAgKiBUaGUgZm9sbG93aW5nIHBsdWdpbiBsaWZlY3ljbGUgbWV0aG9kcyBhcmUgaW52b2tlZCB3aGVuIHVzaW5nIHRoaXMgbWV0aG9kOlxuICAgICAqIC0gY2FjaGVLZXlXaWxsQnlVc2VkKClcbiAgICAgKiAtIGNhY2hlZFJlc3BvbnNlV2lsbEJ5VXNlZCgpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3R8c3RyaW5nfSBrZXkgVGhlIFJlcXVlc3Qgb3IgVVJMIHRvIHVzZSBhcyB0aGUgY2FjaGUga2V5LlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8UmVzcG9uc2V8dW5kZWZpbmVkPn0gQSBtYXRjaGluZyByZXNwb25zZSwgaWYgZm91bmQuXG4gICAgICovXG4gICAgYXN5bmMgY2FjaGVNYXRjaChrZXkpIHtcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IHRvUmVxdWVzdChrZXkpO1xuICAgICAgICBsZXQgY2FjaGVkUmVzcG9uc2U7XG4gICAgICAgIGNvbnN0IHsgY2FjaGVOYW1lLCBtYXRjaE9wdGlvbnMgfSA9IHRoaXMuX3N0cmF0ZWd5O1xuICAgICAgICBjb25zdCBlZmZlY3RpdmVSZXF1ZXN0ID0gYXdhaXQgdGhpcy5nZXRDYWNoZUtleShyZXF1ZXN0LCAncmVhZCcpO1xuICAgICAgICBjb25zdCBtdWx0aU1hdGNoT3B0aW9ucyA9IHsgLi4ubWF0Y2hPcHRpb25zLCAuLi57IGNhY2hlTmFtZSB9IH07XG4gICAgICAgIGNhY2hlZFJlc3BvbnNlID0gYXdhaXQgY2FjaGVzLm1hdGNoKGVmZmVjdGl2ZVJlcXVlc3QsIG11bHRpTWF0Y2hPcHRpb25zKTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGlmIChjYWNoZWRSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgRm91bmQgYSBjYWNoZWQgcmVzcG9uc2UgaW4gJyR7Y2FjaGVOYW1lfScuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoYE5vIGNhY2hlZCByZXNwb25zZSBmb3VuZCBpbiAnJHtjYWNoZU5hbWV9Jy5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIHRoaXMuaXRlcmF0ZUNhbGxiYWNrcygnY2FjaGVkUmVzcG9uc2VXaWxsQmVVc2VkJykpIHtcbiAgICAgICAgICAgIGNhY2hlZFJlc3BvbnNlID0gKGF3YWl0IGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICBjYWNoZU5hbWUsXG4gICAgICAgICAgICAgICAgbWF0Y2hPcHRpb25zLFxuICAgICAgICAgICAgICAgIGNhY2hlZFJlc3BvbnNlLFxuICAgICAgICAgICAgICAgIHJlcXVlc3Q6IGVmZmVjdGl2ZVJlcXVlc3QsXG4gICAgICAgICAgICAgICAgZXZlbnQ6IHRoaXMuZXZlbnQsXG4gICAgICAgICAgICB9KSkgfHwgdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYWNoZWRSZXNwb25zZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHV0cyBhIHJlcXVlc3QvcmVzcG9uc2UgcGFpciBpbiB0aGUgY2FjaGUgKGFuZCBpbnZva2VzIGFueSBhcHBsaWNhYmxlXG4gICAgICogcGx1Z2luIGNhbGxiYWNrIG1ldGhvZHMpIHVzaW5nIHRoZSBgY2FjaGVOYW1lYCBhbmQgYHBsdWdpbnNgIGRlZmluZWQgb25cbiAgICAgKiB0aGUgc3RyYXRlZ3kgb2JqZWN0LlxuICAgICAqXG4gICAgICogVGhlIGZvbGxvd2luZyBwbHVnaW4gbGlmZWN5Y2xlIG1ldGhvZHMgYXJlIGludm9rZWQgd2hlbiB1c2luZyB0aGlzIG1ldGhvZDpcbiAgICAgKiAtIGNhY2hlS2V5V2lsbEJ5VXNlZCgpXG4gICAgICogLSBjYWNoZVdpbGxVcGRhdGUoKVxuICAgICAqIC0gY2FjaGVEaWRVcGRhdGUoKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fHN0cmluZ30ga2V5IFRoZSByZXF1ZXN0IG9yIFVSTCB0byB1c2UgYXMgdGhlIGNhY2hlIGtleS5cbiAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNwb25zZSBUaGUgcmVzcG9uc2UgdG8gY2FjaGUuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxib29sZWFuPn0gYGZhbHNlYCBpZiBhIGNhY2hlV2lsbFVwZGF0ZSBjYXVzZWQgdGhlIHJlc3BvbnNlXG4gICAgICogbm90IGJlIGNhY2hlZCwgYW5kIGB0cnVlYCBvdGhlcndpc2UuXG4gICAgICovXG4gICAgYXN5bmMgY2FjaGVQdXQoa2V5LCByZXNwb25zZSkge1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0gdG9SZXF1ZXN0KGtleSk7XG4gICAgICAgIC8vIFJ1biBpbiB0aGUgbmV4dCB0YXNrIHRvIGF2b2lkIGJsb2NraW5nIG90aGVyIGNhY2hlIHJlYWRzLlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdzNjL1NlcnZpY2VXb3JrZXIvaXNzdWVzLzEzOTdcbiAgICAgICAgYXdhaXQgdGltZW91dCgwKTtcbiAgICAgICAgY29uc3QgZWZmZWN0aXZlUmVxdWVzdCA9IGF3YWl0IHRoaXMuZ2V0Q2FjaGVLZXkocmVxdWVzdCwgJ3dyaXRlJyk7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAoZWZmZWN0aXZlUmVxdWVzdC5tZXRob2QgJiYgZWZmZWN0aXZlUmVxdWVzdC5tZXRob2QgIT09ICdHRVQnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignYXR0ZW1wdC10by1jYWNoZS1ub24tZ2V0LXJlcXVlc3QnLCB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogZ2V0RnJpZW5kbHlVUkwoZWZmZWN0aXZlUmVxdWVzdC51cmwpLFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IGVmZmVjdGl2ZVJlcXVlc3QubWV0aG9kLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBDYW5ub3QgY2FjaGUgbm9uLWV4aXN0ZW50IHJlc3BvbnNlIGZvciBgICtcbiAgICAgICAgICAgICAgICAgICAgYCcke2dldEZyaWVuZGx5VVJMKGVmZmVjdGl2ZVJlcXVlc3QudXJsKX0nLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignY2FjaGUtcHV0LXdpdGgtbm8tcmVzcG9uc2UnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiBnZXRGcmllbmRseVVSTChlZmZlY3RpdmVSZXF1ZXN0LnVybCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZVRvQ2FjaGUgPSBhd2FpdCB0aGlzLl9lbnN1cmVSZXNwb25zZVNhZmVUb0NhY2hlKHJlc3BvbnNlKTtcbiAgICAgICAgaWYgKCFyZXNwb25zZVRvQ2FjaGUpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBSZXNwb25zZSAnJHtnZXRGcmllbmRseVVSTChlZmZlY3RpdmVSZXF1ZXN0LnVybCl9JyBgICtcbiAgICAgICAgICAgICAgICAgICAgYHdpbGwgbm90IGJlIGNhY2hlZC5gLCByZXNwb25zZVRvQ2FjaGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgY2FjaGVOYW1lLCBtYXRjaE9wdGlvbnMgfSA9IHRoaXMuX3N0cmF0ZWd5O1xuICAgICAgICBjb25zdCBjYWNoZSA9IGF3YWl0IHNlbGYuY2FjaGVzLm9wZW4oY2FjaGVOYW1lKTtcbiAgICAgICAgY29uc3QgaGFzQ2FjaGVVcGRhdGVDYWxsYmFjayA9IHRoaXMuaGFzQ2FsbGJhY2soJ2NhY2hlRGlkVXBkYXRlJyk7XG4gICAgICAgIGNvbnN0IG9sZFJlc3BvbnNlID0gaGFzQ2FjaGVVcGRhdGVDYWxsYmFjayA/IGF3YWl0IGNhY2hlTWF0Y2hJZ25vcmVQYXJhbXMoXG4gICAgICAgIC8vIFRPRE8ocGhpbGlwd2FsdG9uKTogdGhlIGBfX1dCX1JFVklTSU9OX19gIHBhcmFtIGlzIGEgcHJlY2FjaGluZ1xuICAgICAgICAvLyBmZWF0dXJlLiBDb25zaWRlciBpbnRvIHdheXMgdG8gb25seSBhZGQgdGhpcyBiZWhhdmlvciBpZiB1c2luZ1xuICAgICAgICAvLyBwcmVjYWNoaW5nLlxuICAgICAgICBjYWNoZSwgZWZmZWN0aXZlUmVxdWVzdC5jbG9uZSgpLCBbJ19fV0JfUkVWSVNJT05fXyddLCBtYXRjaE9wdGlvbnMpIDpcbiAgICAgICAgICAgIG51bGw7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoYFVwZGF0aW5nIHRoZSAnJHtjYWNoZU5hbWV9JyBjYWNoZSB3aXRoIGEgbmV3IFJlc3BvbnNlIGAgK1xuICAgICAgICAgICAgICAgIGBmb3IgJHtnZXRGcmllbmRseVVSTChlZmZlY3RpdmVSZXF1ZXN0LnVybCl9LmApO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBjYWNoZS5wdXQoZWZmZWN0aXZlUmVxdWVzdCwgaGFzQ2FjaGVVcGRhdGVDYWxsYmFjayA/XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VUb0NhY2hlLmNsb25lKCkgOiByZXNwb25zZVRvQ2FjaGUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9ET01FeGNlcHRpb24jZXhjZXB0aW9uLVF1b3RhRXhjZWVkZWRFcnJvclxuICAgICAgICAgICAgaWYgKGVycm9yLm5hbWUgPT09ICdRdW90YUV4Y2VlZGVkRXJyb3InKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgZXhlY3V0ZVF1b3RhRXJyb3JDYWxsYmFja3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgdGhpcy5pdGVyYXRlQ2FsbGJhY2tzKCdjYWNoZURpZFVwZGF0ZScpKSB7XG4gICAgICAgICAgICBhd2FpdCBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgY2FjaGVOYW1lLFxuICAgICAgICAgICAgICAgIG9sZFJlc3BvbnNlLFxuICAgICAgICAgICAgICAgIG5ld1Jlc3BvbnNlOiByZXNwb25zZVRvQ2FjaGUuY2xvbmUoKSxcbiAgICAgICAgICAgICAgICByZXF1ZXN0OiBlZmZlY3RpdmVSZXF1ZXN0LFxuICAgICAgICAgICAgICAgIGV2ZW50OiB0aGlzLmV2ZW50LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyB0aGUgbGlzdCBvZiBwbHVnaW5zIGZvciB0aGUgYGNhY2hlS2V5V2lsbEJlVXNlZGAgY2FsbGJhY2ssIGFuZFxuICAgICAqIGV4ZWN1dGVzIGFueSBvZiB0aG9zZSBjYWxsYmFja3MgZm91bmQgaW4gc2VxdWVuY2UuIFRoZSBmaW5hbCBgUmVxdWVzdGBcbiAgICAgKiBvYmplY3QgcmV0dXJuZWQgYnkgdGhlIGxhc3QgcGx1Z2luIGlzIHRyZWF0ZWQgYXMgdGhlIGNhY2hlIGtleSBmb3IgY2FjaGVcbiAgICAgKiByZWFkcyBhbmQvb3Igd3JpdGVzLiBJZiBubyBgY2FjaGVLZXlXaWxsQmVVc2VkYCBwbHVnaW4gY2FsbGJhY2tzIGhhdmVcbiAgICAgKiBiZWVuIHJlZ2lzdGVyZWQsIHRoZSBwYXNzZWQgcmVxdWVzdCBpcyByZXR1cm5lZCB1bm1vZGlmaWVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3R9IHJlcXVlc3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbW9kZVxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8UmVxdWVzdD59XG4gICAgICovXG4gICAgYXN5bmMgZ2V0Q2FjaGVLZXkocmVxdWVzdCwgbW9kZSkge1xuICAgICAgICBpZiAoIXRoaXMuX2NhY2hlS2V5c1ttb2RlXSkge1xuICAgICAgICAgICAgbGV0IGVmZmVjdGl2ZVJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiB0aGlzLml0ZXJhdGVDYWxsYmFja3MoJ2NhY2hlS2V5V2lsbEJlVXNlZCcpKSB7XG4gICAgICAgICAgICAgICAgZWZmZWN0aXZlUmVxdWVzdCA9IHRvUmVxdWVzdChhd2FpdCBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICAgIG1vZGUsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3Q6IGVmZmVjdGl2ZVJlcXVlc3QsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiB0aGlzLmV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHRoaXMucGFyYW1zLFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2NhY2hlS2V5c1ttb2RlXSA9IGVmZmVjdGl2ZVJlcXVlc3Q7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlS2V5c1ttb2RlXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBzdHJhdGVneSBoYXMgYXQgbGVhc3Qgb25lIHBsdWdpbiB3aXRoIHRoZSBnaXZlblxuICAgICAqIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGNhbGxiYWNrIHRvIGNoZWNrIGZvci5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIGhhc0NhbGxiYWNrKG5hbWUpIHtcbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5fc3RyYXRlZ3kucGx1Z2lucykge1xuICAgICAgICAgICAgaWYgKG5hbWUgaW4gcGx1Z2luKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSdW5zIGFsbCBwbHVnaW4gY2FsbGJhY2tzIG1hdGNoaW5nIHRoZSBnaXZlbiBuYW1lLCBpbiBvcmRlciwgcGFzc2luZyB0aGVcbiAgICAgKiBnaXZlbiBwYXJhbSBvYmplY3QgKG1lcmdlZCBpdGggdGhlIGN1cnJlbnQgcGx1Z2luIHN0YXRlKSBhcyB0aGUgb25seVxuICAgICAqIGFyZ3VtZW50LlxuICAgICAqXG4gICAgICogTm90ZTogc2luY2UgdGhpcyBtZXRob2QgcnVucyBhbGwgcGx1Z2lucywgaXQncyBub3Qgc3VpdGFibGUgZm9yIGNhc2VzXG4gICAgICogd2hlcmUgdGhlIHJldHVybiB2YWx1ZSBvZiBhIGNhbGxiYWNrIG5lZWRzIHRvIGJlIGFwcGxpZWQgcHJpb3IgdG8gY2FsbGluZ1xuICAgICAqIHRoZSBuZXh0IGNhbGxiYWNrLiBTZWVcbiAgICAgKiBbYGl0ZXJhdGVDYWxsYmFja3MoKWBde0BsaW5rIG1vZHVsZTp3b3JrYm94LXN0cmF0ZWdpZXMuU3RyYXRlZ3lIYW5kbGVyI2l0ZXJhdGVDYWxsYmFja3N9XG4gICAgICogYmVsb3cgZm9yIGhvdyB0byBoYW5kbGUgdGhhdCBjYXNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGNhbGxiYWNrIHRvIHJ1biB3aXRoaW4gZWFjaCBwbHVnaW4uXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtIFRoZSBvYmplY3QgdG8gcGFzcyBhcyB0aGUgZmlyc3QgKGFuZCBvbmx5KSBwYXJhbVxuICAgICAqICAgICB3aGVuIGV4ZWN1dGluZyBlYWNoIGNhbGxiYWNrLiBUaGlzIG9iamVjdCB3aWxsIGJlIG1lcmdlZCB3aXRoIHRoZVxuICAgICAqICAgICBjdXJyZW50IHBsdWdpbiBzdGF0ZSBwcmlvciB0byBjYWxsYmFjayBleGVjdXRpb24uXG4gICAgICovXG4gICAgYXN5bmMgcnVuQ2FsbGJhY2tzKG5hbWUsIHBhcmFtKSB7XG4gICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgdGhpcy5pdGVyYXRlQ2FsbGJhY2tzKG5hbWUpKSB7XG4gICAgICAgICAgICAvLyBUT0RPKHBoaWxpcHdhbHRvbik6IG5vdCBzdXJlIHdoeSBgYW55YCBpcyBuZWVkZWQuIEl0IHNlZW1zIGxpa2VcbiAgICAgICAgICAgIC8vIHRoaXMgc2hvdWxkIHdvcmsgd2l0aCBgYXMgV29ya2JveFBsdWdpbkNhbGxiYWNrUGFyYW1bQ11gLlxuICAgICAgICAgICAgYXdhaXQgY2FsbGJhY2socGFyYW0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFjY2VwdHMgYSBjYWxsYmFjayBhbmQgcmV0dXJucyBhbiBpdGVyYWJsZSBvZiBtYXRjaGluZyBwbHVnaW4gY2FsbGJhY2tzLFxuICAgICAqIHdoZXJlIGVhY2ggY2FsbGJhY2sgaXMgd3JhcHBlZCB3aXRoIHRoZSBjdXJyZW50IGhhbmRsZXIgc3RhdGUgKGkuZS4gd2hlblxuICAgICAqIHlvdSBjYWxsIGVhY2ggY2FsbGJhY2ssIHdoYXRldmVyIG9iamVjdCBwYXJhbWV0ZXIgeW91IHBhc3MgaXQgd2lsbFxuICAgICAqIGJlIG1lcmdlZCB3aXRoIHRoZSBwbHVnaW4ncyBjdXJyZW50IHN0YXRlKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIGZvIHRoZSBjYWxsYmFjayB0byBydW5cbiAgICAgKiBAcmV0dXJuIHtBcnJheTxGdW5jdGlvbj59XG4gICAgICovXG4gICAgKml0ZXJhdGVDYWxsYmFja3MobmFtZSkge1xuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLl9zdHJhdGVneS5wbHVnaW5zKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHBsdWdpbltuYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fcGx1Z2luU3RhdGVNYXAuZ2V0KHBsdWdpbik7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdGVmdWxDYWxsYmFjayA9IChwYXJhbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGF0ZWZ1bFBhcmFtID0geyAuLi5wYXJhbSwgc3RhdGUgfTtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyhwaGlsaXB3YWx0b24pOiBub3Qgc3VyZSB3aHkgYGFueWAgaXMgbmVlZGVkLiBJdCBzZWVtcyBsaWtlXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgc2hvdWxkIHdvcmsgd2l0aCBgYXMgV29ya2JveFBsdWdpbkNhbGxiYWNrUGFyYW1bQ11gLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luW25hbWVdKHN0YXRlZnVsUGFyYW0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgeWllbGQgc3RhdGVmdWxDYWxsYmFjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgcHJvbWlzZSB0byB0aGVcbiAgICAgKiBbZXh0ZW5kIGxpZmV0aW1lIHByb21pc2VzXXtAbGluayBodHRwczovL3czYy5naXRodWIuaW8vU2VydmljZVdvcmtlci8jZXh0ZW5kYWJsZWV2ZW50LWV4dGVuZC1saWZldGltZS1wcm9taXNlc31cbiAgICAgKiBvZiB0aGUgZXZlbnQgZXZlbnQgYXNzb2NpYXRlZCB3aXRoIHRoZSByZXF1ZXN0IGJlaW5nIGhhbmRsZWQgKHVzdWFsbHkgYVxuICAgICAqIGBGZXRjaEV2ZW50YCkuXG4gICAgICpcbiAgICAgKiBOb3RlOiB5b3UgY2FuIGF3YWl0XG4gICAgICogW2Bkb25lV2FpdGluZygpYF17QGxpbmsgbW9kdWxlOndvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneUhhbmRsZXJ+ZG9uZVdhaXRpbmd9XG4gICAgICogdG8ga25vdyB3aGVuIGFsbCBhZGRlZCBwcm9taXNlcyBoYXZlIHNldHRsZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1Byb21pc2V9IHByb21pc2UgQSBwcm9taXNlIHRvIGFkZCB0byB0aGUgZXh0ZW5kIGxpZmV0aW1lIHByb21pc2VzXG4gICAgICogICAgIG9mIHRoZSBldmVudCB0aGF0IHRyaWdnZXJlZCB0aGUgcmVxdWVzdC5cbiAgICAgKi9cbiAgICB3YWl0VW50aWwocHJvbWlzZSkge1xuICAgICAgICB0aGlzLl9leHRlbmRMaWZldGltZVByb21pc2VzLnB1c2gocHJvbWlzZSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIG9uY2UgYWxsIHByb21pc2VzIHBhc3NlZCB0b1xuICAgICAqIFtgd2FpdFVudGlsKClgXXtAbGluayBtb2R1bGU6d29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5SGFuZGxlcn53YWl0VW50aWx9XG4gICAgICogaGF2ZSBzZXR0bGVkLlxuICAgICAqXG4gICAgICogTm90ZTogYW55IHdvcmsgZG9uZSBhZnRlciBgZG9uZVdhaXRpbmcoKWAgc2V0dGxlcyBzaG91bGQgYmUgbWFudWFsbHlcbiAgICAgKiBwYXNzZWQgdG8gYW4gZXZlbnQncyBgd2FpdFVudGlsKClgIG1ldGhvZCAobm90IHRoaXMgaGFuZGxlcidzXG4gICAgICogYHdhaXRVbnRpbCgpYCBtZXRob2QpLCBvdGhlcndpc2UgdGhlIHNlcnZpY2Ugd29ya2VyIHRocmVhZCBteSBiZSBraWxsZWRcbiAgICAgKiBwcmlvciB0byB5b3VyIHdvcmsgY29tcGxldGluZy5cbiAgICAgKi9cbiAgICBhc3luYyBkb25lV2FpdGluZygpIHtcbiAgICAgICAgbGV0IHByb21pc2U7XG4gICAgICAgIHdoaWxlIChwcm9taXNlID0gdGhpcy5fZXh0ZW5kTGlmZXRpbWVQcm9taXNlcy5zaGlmdCgpKSB7XG4gICAgICAgICAgICBhd2FpdCBwcm9taXNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0b3BzIHJ1bm5pbmcgdGhlIHN0cmF0ZWd5IGFuZCBpbW1lZGlhdGVseSByZXNvbHZlcyBhbnkgcGVuZGluZ1xuICAgICAqIGB3YWl0VW50aWwoKWAgcHJvbWlzZXMuXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5faGFuZGxlckRlZmVycmVkLnJlc29sdmUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2Qgd2lsbCBjYWxsIGNhY2hlV2lsbFVwZGF0ZSBvbiB0aGUgYXZhaWxhYmxlIHBsdWdpbnMgKG9yIHVzZVxuICAgICAqIHN0YXR1cyA9PT0gMjAwKSB0byBkZXRlcm1pbmUgaWYgdGhlIFJlc3BvbnNlIGlzIHNhZmUgYW5kIHZhbGlkIHRvIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fSBvcHRpb25zLnJlcXVlc3RcbiAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBvcHRpb25zLnJlc3BvbnNlXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxSZXNwb25zZXx1bmRlZmluZWQ+fVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhc3luYyBfZW5zdXJlUmVzcG9uc2VTYWZlVG9DYWNoZShyZXNwb25zZSkge1xuICAgICAgICBsZXQgcmVzcG9uc2VUb0NhY2hlID0gcmVzcG9uc2U7XG4gICAgICAgIGxldCBwbHVnaW5zVXNlZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIHRoaXMuaXRlcmF0ZUNhbGxiYWNrcygnY2FjaGVXaWxsVXBkYXRlJykpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlVG9DYWNoZSA9IChhd2FpdCBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgcmVxdWVzdDogdGhpcy5yZXF1ZXN0LFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiByZXNwb25zZVRvQ2FjaGUsXG4gICAgICAgICAgICAgICAgZXZlbnQ6IHRoaXMuZXZlbnQsXG4gICAgICAgICAgICB9KSkgfHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgcGx1Z2luc1VzZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZVRvQ2FjaGUpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXBsdWdpbnNVc2VkKSB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2VUb0NhY2hlICYmIHJlc3BvbnNlVG9DYWNoZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlVG9DYWNoZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlVG9DYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2VUb0NhY2hlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2VUb0NhY2hlLnN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci53YXJuKGBUaGUgcmVzcG9uc2UgZm9yICcke3RoaXMucmVxdWVzdC51cmx9JyBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGlzIGFuIG9wYXF1ZSByZXNwb25zZS4gVGhlIGNhY2hpbmcgc3RyYXRlZ3kgdGhhdCB5b3UncmUgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGB1c2luZyB3aWxsIG5vdCBjYWNoZSBvcGFxdWUgcmVzcG9uc2VzIGJ5IGRlZmF1bHQuYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoYFRoZSByZXNwb25zZSBmb3IgJyR7dGhpcy5yZXF1ZXN0LnVybH0nIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgcmV0dXJuZWQgYSBzdGF0dXMgY29kZSBvZiAnJHtyZXNwb25zZS5zdGF0dXN9JyBhbmQgd29uJ3QgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBiZSBjYWNoZWQgYXMgYSByZXN1bHQuYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlVG9DYWNoZTtcbiAgICB9XG59XG5leHBvcnQgeyBTdHJhdGVneUhhbmRsZXIgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gQHRzLWlnbm9yZVxudHJ5IHtcbiAgICBzZWxmWyd3b3JrYm94OnN0cmF0ZWdpZXM6Ni4xLjInXSAmJiBfKCk7XG59XG5jYXRjaCAoZSkgeyB9XG4iLCIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvbG9nZ2VyLmpzJztcbmltcG9ydCB7IGdldEZyaWVuZGx5VVJMIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2dldEZyaWVuZGx5VVJMLmpzJztcbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuZXhwb3J0IGNvbnN0IG1lc3NhZ2VzID0ge1xuICAgIHN0cmF0ZWd5U3RhcnQ6IChzdHJhdGVneU5hbWUsIHJlcXVlc3QpID0+IGBVc2luZyAke3N0cmF0ZWd5TmFtZX0gdG8gcmVzcG9uZCB0byAnJHtnZXRGcmllbmRseVVSTChyZXF1ZXN0LnVybCl9J2AsXG4gICAgcHJpbnRGaW5hbFJlc3BvbnNlOiAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBsb2dnZXIuZ3JvdXBDb2xsYXBzZWQoYFZpZXcgdGhlIGZpbmFsIHJlc3BvbnNlIGhlcmUuYCk7XG4gICAgICAgICAgICBsb2dnZXIubG9nKHJlc3BvbnNlIHx8ICdbTm8gcmVzcG9uc2UgcmV0dXJuZWRdJyk7XG4gICAgICAgICAgICBsb2dnZXIuZ3JvdXBFbmQoKTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHNyYy93d3cvc3JjLXN3LmpzXG5cbi8vIEFkZCBhbnkgb3RoZXIgbG9naWMgaGVyZSBhcyBuZWVkZWQuXG5cbmltcG9ydCB7IENhY2hlYWJsZVJlc3BvbnNlUGx1Z2luIH0gZnJvbSBcIndvcmtib3gtY2FjaGVhYmxlLXJlc3BvbnNlL0NhY2hlYWJsZVJlc3BvbnNlUGx1Z2luXCJcbmltcG9ydCB7IENhY2hlRmlyc3QgfSBmcm9tIFwid29ya2JveC1zdHJhdGVnaWVzL0NhY2hlRmlyc3RcIlxuaW1wb3J0IHsgY3JlYXRlSGFuZGxlckJvdW5kVG9VUkwgfSBmcm9tIFwid29ya2JveC1wcmVjYWNoaW5nL2NyZWF0ZUhhbmRsZXJCb3VuZFRvVVJMXCJcbmltcG9ydCB7IEV4cGlyYXRpb25QbHVnaW4gfSBmcm9tIFwid29ya2JveC1leHBpcmF0aW9uL0V4cGlyYXRpb25QbHVnaW5cIlxuaW1wb3J0IHsgTmF2aWdhdGlvblJvdXRlIH0gZnJvbSBcIndvcmtib3gtcm91dGluZy9OYXZpZ2F0aW9uUm91dGVcIlxuaW1wb3J0IHsgcHJlY2FjaGVBbmRSb3V0ZSB9IGZyb20gXCJ3b3JrYm94LXByZWNhY2hpbmcvcHJlY2FjaGVBbmRSb3V0ZVwiXG5pbXBvcnQgeyByZWdpc3RlclJvdXRlIH0gZnJvbSBcIndvcmtib3gtcm91dGluZy9yZWdpc3RlclJvdXRlXCJcblxuc2VsZi5fX1dCX0RJU0FCTEVfREVWX0xPR1MgPSB0cnVlXG5jb25zdCBjYWNoaW5nID0gc2VsZi5fX1dCX01BTklGRVNUXG4vL2NvbnNvbGUubG9nKFwiY2FjaGluZyBzdHVmZlwiLCBjYWNoaW5nKVxucHJlY2FjaGVBbmRSb3V0ZShjYWNoaW5nKVxuXG5yZWdpc3RlclJvdXRlKFxuXHRuZXcgTmF2aWdhdGlvblJvdXRlKGNyZWF0ZUhhbmRsZXJCb3VuZFRvVVJMKFwiL2luZGV4Lmh0bWxcIiksIHtcblx0XHRibGFja2xpc3Q6IFsvXFwvYWN0aXZhdGVcXGIvXSxcblx0fSlcbilcblxucmVnaXN0ZXJSb3V0ZShcblx0L1xcL2FwaVxcLy4qLyxcblx0bmV3IENhY2hlRmlyc3Qoe1xuXHRcdGNhY2hlTmFtZTogXCJzaG9ydC1jYWNoZVwiLFxuXHRcdG1hdGNoT3B0aW9uczoge1xuXHRcdFx0aWdub3JlVmFyeTogdHJ1ZSxcblx0XHR9LFxuXHRcdHBsdWdpbnM6IFtcblx0XHRcdG5ldyBFeHBpcmF0aW9uUGx1Z2luKHtcblx0XHRcdFx0bWF4RW50cmllczogNTAwLFxuXHRcdFx0XHRtYXhBZ2VTZWNvbmRzOiAzMDAsXG5cdFx0XHRcdHB1cmdlT25RdW90YUVycm9yOiB0cnVlLFxuXHRcdFx0fSksXG5cdFx0XHRuZXcgQ2FjaGVhYmxlUmVzcG9uc2VQbHVnaW4oe1xuXHRcdFx0XHRzdGF0dXNlczogWzAsIDIwMF0sXG5cdFx0XHR9KSxcblx0XHRdLFxuXHR9KVxuKVxuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGV2ZW50ID0+IHtcblx0aWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS50eXBlID09PSBcIlNLSVBfV0FJVElOR1wiKSB7XG5cdFx0c2VsZi5za2lwV2FpdGluZygpXG5cdH1cbn0pXG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcImluc3RhbGxcIiwgZXZlbnQgPT4ge1xuXHQvL2NvbnNvbGUubG9nKFwiW1NlcnZpY2UgV29ya2VyXSBJbnN0YWxsaW5nIFNlcnZpY2UgV29ya2VyIC4uLlwiLCBldmVudClcblxuXHRldmVudC53YWl0VW50aWwoc2VsZi5za2lwV2FpdGluZygpKVxufSlcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwiYWN0aXZhdGVcIiwgZXZlbnQgPT4ge1xuXHQvL2NvbnNvbGUubG9nKFwiW1NlcnZpY2UgV29ya2VyXSBBY3RpdmF0aW5nIFNlcnZpY2UgV29ya2VyIC4uLlwiLCBldmVudClcblxuXHRyZXR1cm4gc2VsZi5jbGllbnRzLmNsYWltKClcbn0pXG4iXSwic291cmNlUm9vdCI6IiJ9