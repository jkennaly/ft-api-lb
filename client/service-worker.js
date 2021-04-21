(()=>{"use strict";var e={895:()=>{try{self["workbox:cacheable-response:6.1.2"]&&_()}catch(e){}},913:()=>{try{self["workbox:core:6.1.2"]&&_()}catch(e){}},550:()=>{try{self["workbox:expiration:6.1.2"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:6.1.2"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.1.2"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.1.2"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,s),r.exports}(()=>{s(913);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const a=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),"");s(895);class n{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some(t=>e.headers.get(t)===this._headers[t])),t}}const r={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},i=e=>[r.prefix,e,r.suffix].filter(e=>e&&e.length>0).join("-"),c=e=>e||i(r.precache),o=e=>e||i(r.runtime);function h(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class l{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}const u=new Set;s(873);function d(e){return"string"==typeof e?new Request(e):e}class p{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new l,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let a=d(e);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const r=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=d(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,r=await this.getCacheKey(t,"read"),i={...n,cacheName:a};s=await caches.match(r,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(e,s){const n=d(e);var r;await(r=0,new Promise(e=>setTimeout(e,r)));const i=await this.getCacheKey(n,"write");if(!s)throw new t("cache-put-with-no-response",{url:a(i.url)});const c=await this._ensureResponseSafeToCache(s);if(!c)return!1;const{cacheName:o,matchOptions:l}=this._strategy,p=await self.caches.open(o),f=this.hasCallback("cacheDidUpdate"),g=f?await async function(e,t,s,a){const n=h(t.url,s);if(t.url===n)return e.match(t,a);const r={...a,ignoreSearch:!0},i=await e.keys(t,r);for(const t of i){if(n===h(t.url,s))return e.match(t,a)}}(p,i.clone(),["__WB_REVISION__"],l):null;try{await p.put(i,f?c.clone():c)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of u)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:g,newResponse:c.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){if(!this._cacheKeys[t]){let s=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))s=d(await e({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[t]=s}return this._cacheKeys[t]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n={...a,state:s};return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve()}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class f{constructor(e={}){this.cacheName=o(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new p(this,{event:t,request:s,params:a}),r=this._getResponse(n,s,t);return[r,this._awaitComplete(r,n,s,t)]}async _getResponse(e,s,a){await e.runCallbacks("handlerWillStart",{event:a,request:s});let n=void 0;try{if(n=await this._handle(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(t){for(const r of e.iterateCallbacks("handlerDidError"))if(n=await r({error:t,event:a,request:s}),n)break;if(!n)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,r;try{n=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){r=e}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:r}),t.destroy(),r)throw r}}function g(e,t){const s=t();return e.waitUntil(s),s}s(977);function w(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:a}=e;if(!a)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),r=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:r.href}}class y{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class _{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=t&&t.cacheKey||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s):e},this._precacheController=e}}let m,R;async function b(e,s){let a=null;if(e.url){a=new URL(e.url).origin}if(a!==self.location.origin)throw new t("cross-origin-copy-response",{origin:a});const n=e.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=s?s(r):r,c=function(){if(void 0===m){const e=new Response("");if("body"in e)try{new Response(e.body),m=!0}catch(e){m=!1}m=!1}return m}()?n.body:await n.blob();return new Response(c,i)}class v extends f{constructor(e={}){e.cacheName=c(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(v.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let a;if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return a=await s.fetch(e),a}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(e);if(!await s.cachePut(e,a.clone()))throw new t("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==v.copyRedirectedCacheableResponsesPlugin&&(a===v.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(v.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}v.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},v.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await b(e):e};class x{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new v({cacheName:c(e),plugins:[...t,new _({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const a of e){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:e,url:n}=w(a),r="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==a.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,a.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return g(e,async()=>{const t=new y;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),r=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}})}activate(e){return g(e,async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params={cacheKey:s,...t.params},this.strategy.handle(t))}}const C=()=>(R||(R=new x),R);function U(e){e.then(()=>{})}class q{constructor(e,t,{onupgradeneeded:s,onversionchange:a}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=s,this._onversionchange=a||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const a=indexedDB.open(this._name,this._version);a.onerror=()=>t(a.error),a.onupgradeneeded=e=>{s?(a.transaction.abort(),a.result.close()):"function"==typeof this._onupgradeneeded&&this._onupgradeneeded(e)},a.onsuccess=()=>{const t=a.result;s?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:a="next",count:n,includeKeys:r=!1}={}){return await this.transaction([e],"readonly",(i,c)=>{const o=i.objectStore(e),h=t?o.index(t):o,l=[],u=h.openCursor(s,a);u.onsuccess=()=>{const e=u.result;e?(l.push(r?e:e.value),n&&l.length>=n?c(l):e.continue()):c(l)}})}async transaction(e,t,s){return await this.open(),await new Promise((a,n)=>{const r=this._db.transaction(e,t);r.onabort=()=>n(r.error),r.oncomplete=()=>a(),s(r,e=>a(e))})}async _call(e,t,s,...a){return await this.transaction([t],s,(s,n)=>{const r=s.objectStore(t),i=r[e].apply(r,a);i.onsuccess=()=>n(i.result)})}close(){this._db&&(this._db.close(),this._db=null)}}q.prototype.OPEN_TIMEOUT=2e3;const L={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(L))for(const s of t)s in IDBObjectStore.prototype&&(q.prototype[s]=async function(t,...a){return await this._call(s,t,e,...a)});s(550);const T=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class k{constructor(e){this._cacheName=e,this._db=new q("workbox-expiration",1,{onupgradeneeded:e=>this._handleUpgrade(e)})}_handleUpgrade(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const a=indexedDB.deleteDatabase(e);a.onerror=()=>{s(a.error)},a.onblocked=()=>{s(new Error("Delete blocked"))},a.onsuccess=()=>{t()}})})(this._cacheName)}async setTimestamp(e,t){const s={url:e=T(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)};await this._db.put("cache-entries",s)}async getTimestamp(e){return(await this._db.get("cache-entries",this._getId(e))).timestamp}async expireEntries(e,t){const s=await this._db.transaction("cache-entries","readwrite",(s,a)=>{const n=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),r=[];let i=0;n.onsuccess=()=>{const s=n.result;if(s){const a=s.value;a.cacheName===this._cacheName&&(e&&a.timestamp<e||t&&i>=t?r.push(s.value):i++),s.continue()}else a(r)}}),a=[];for(const e of s)await this._db.delete("cache-entries",e.id),a.push(e.url);return a}_getId(e){return this._cacheName+"|"+T(e)}}class E{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new k(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const e of t)await s.delete(e,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,U(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){return await this._timestampModel.getTimestamp(e)<Date.now()-1e3*this._maxAgeSeconds}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}s(80);const N=e=>e&&"object"==typeof e?e:{handle:e};class K{constructor(e,t,s="GET"){this.handler=N(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=N(e)}}class A extends K{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}class M{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map(t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const a=s.origin===location.origin,{params:n,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:a,url:s});let i=r&&r.handler;const c=e.method;if(!i&&this._defaultHandlerMap.has(c)&&(i=this._defaultHandlerMap.get(c)),!i)return void 0;let o;try{o=i.handle({url:s,request:e,event:t,params:n})}catch(e){o=Promise.reject(e)}const h=r&&r.catchHandler;return o instanceof Promise&&(this._catchHandler||h)&&(o=o.catch(async a=>{if(h){0;try{return await h.handle({url:s,request:e,event:t,params:n})}catch(e){a=e}}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw a})),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:a}){const n=this._routes.get(s.method)||[];for(const r of n){let n;const i=r.match({url:e,sameOrigin:t,request:s,event:a});if(i)return n=i,(Array.isArray(i)&&0===i.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:r,params:n}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,N(e))}setCatchHandler(e){this._catchHandler=N(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this._routes.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this._routes.get(e.method).splice(s,1)}}let P;const S=()=>(P||(P=new M,P.addFetchListener(),P.addCacheListener()),P);function O(e,s,a){let n;if("string"==typeof e){const t=new URL(e,location.href);0;n=new K(({url:e})=>e.href===t.href,s,a)}else if(e instanceof RegExp)n=new A(e,s,a);else if("function"==typeof e)n=new K(e,s,a);else{if(!(e instanceof K))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}return S().registerRoute(n),n}class D extends K{constructor(e,t){super(({request:s})=>{const a=e.getURLsToCacheKeys();for(const e of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:a=!0,urlManipulation:n}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(a){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(n){const e=n({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=a.get(e);if(t)return{cacheKey:t}}},e.strategy)}}self.__WB_DISABLE_DEV_LOGS=!0;const I=[{'revision':'31aa415a97069f41d697ca2c2d519f78','url':'bundle.js'},{'revision':'6d02927749b0503eba19d114d01b9df1','url':'bundle.js.LICENSE.txt'},{'revision':'8221dfb6a367ec8cb84eb9aabe421ba6','url':'fav/browserconfig.xml'},{'revision':'5b36cc7c4a4675217450c1248f03379a','url':'fav/favicon-114.png'},{'revision':'f75c241d977ed3bfdb116ec1007cd770','url':'fav/favicon-120.png'},{'revision':'765e3c4d58a19057518d16c6786dbe25','url':'fav/favicon-144.png'},{'revision':'52f4dcbbb528e99ddbdda35115be4553','url':'fav/favicon-150.png'},{'revision':'dc55f27be4074dbabbddc6ee3dd9e9d0','url':'fav/favicon-152.png'},{'revision':'f5279fdcffedf968df258088f064d168','url':'fav/favicon-16.png'},{'revision':'ff918ce1963e2b24e849322fc41ff221','url':'fav/favicon-160.png'},{'revision':'2fb99dea1e96ef01b74a367192dbdd1e','url':'fav/favicon-180.png'},{'revision':'b858d60501458c41bdc373825c497ce4','url':'fav/favicon-192.png'},{'revision':'449c64c00a42969c75076ca93fb94496','url':'fav/favicon-310.png'},{'revision':'6a9eaf7313798370e9246174152da72b','url':'fav/favicon-32.png'},{'revision':'e0d050c15a6c2f9c912bf1b133bf816d','url':'fav/favicon-57.png'},{'revision':'5da2a8d4c6700229b82ebda37e2a7959','url':'fav/favicon-60.png'},{'revision':'e274228acc9e90bb1299288725556c63','url':'fav/favicon-64.png'},{'revision':'87ffd286549f0c35c9f3ff452d8a841b','url':'fav/favicon-70.png'},{'revision':'b1d702da34ded16efe6e227ea26a9b9e','url':'fav/favicon-72.png'},{'revision':'b2ebf7f594b55bd09cf4ad6703e66071','url':'fav/favicon-76.png'},{'revision':'a03de3c7d26d90e40d6f5ce95181a1da','url':'fav/favicon-96.png'},{'revision':'53da0fd17ce4662d33ce5c2bb81b678f','url':'fav/favicon.ico'},{'revision':'1c4a2b42e0c9424538819dcf5a364142','url':'fav/faviconit-instructions.txt'},{'revision':'73951d8fb7b813f09d4fd1bd7f3401b0','url':'img/Crowdshot.jpg'},{'revision':'6b3b6bb8757dad5ed6739eb3b2962096','url':'img/has-access.svg'},{'revision':'b415ef89d2fdded33db5ba18e2f6b7b0','url':'img/insignia lighter 512x512.png'},{'revision':'6f1eb45a015f54ca60c5f277c2356485','url':'img/live-access.svg'},{'revision':'ad0fbb88d89c46d46646dee17a5c4ef5','url':'img/symbol-defs.svg'},{'revision':'73b7b17006b50ac7f1224a2812b4aec7','url':'index.html'},{'revision':'b2c4abb263439e8ead0e4139a985f851','url':'main.css'},{'revision':'f13eb5f8bf3a76504ef865144c7599c8','url':'manifest.json'}];var W;(function(e){C().precache(e)})(I),function(e){const t=C();O(new D(t,e))}(W);const H=[/bucks/,/\/gtt/,/\/Profiles/];O(({url:e,sameOrigin:t})=>{if(!t)return!1;const s=/\/api\/.*/.test(e),a=s&&H.some(t=>t.test(e));return s&&!a},new class extends f{async _handle(e,s){let a,n=await s.cacheMatch(e);if(n)0;else{0;try{n=await s.fetchAndCachePut(e)}catch(e){a=e}0}if(!n)throw new t("no-response",{url:e.url,error:a});return n}}({cacheName:"short-cache",matchOptions:{ignoreVary:!0},plugins:[new class{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:a})=>{if(!a)return null;const n=this._isResponseDateFresh(a),r=this._getCacheExpiration(s);U(r.expireEntries());const i=r.updateTimestamp(t.url);if(e)try{e.waitUntil(i)}catch(e){0}return n?a:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),u.add(t))}_getCacheExpiration(e){if(e===o())throw new t("expire-custom-caches-only");let s=this._cacheExpirations.get(e);return s||(s=new E(e,this._config),this._cacheExpirations.set(e,s)),s}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(null===t)return!0;return t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}({maxEntries:500,maxAgeSeconds:300,purgeOnQuotaError:!0}),new class{constructor(e){this.cacheWillUpdate=async({response:e})=>this._cacheableResponse.isResponseCacheable(e)?e:null,this._cacheableResponse=new n(e)}}({statuses:[0,200]})]})),self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),self.addEventListener("install",e=>{e.waitUntil(self.skipWaiting())}),self.addEventListener("activate",e=>self.clients.claim())})()})();
//# sourceMappingURL=service-worker.js.map