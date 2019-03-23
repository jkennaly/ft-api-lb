/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js')

if (workbox) {
  	//console.log(`Yay! Workbox is loaded 🎉`);

  	workbox.skipWaiting()
  	//workbox.clientsClaim()

	const bgSyncPlugin = new workbox.backgroundSync.Plugin('myQueueName', {
	  maxRetentionTime: 24 * 60 * 7 // Retry for max of 1 week
	})

	  workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "09f35d7daf5af990acf275b0c9a955c1"
  },
  {
    "url": "bundle.js",
    "revision": "eebcfe3ef348f9e6ac7693d5b7c136e7"
  },
  {
    "url": "img/Crowdshot.jpg",
    "revision": "73951d8fb7b813f09d4fd1bd7f3401b0"
  },
  {
    "url": "favicon.ico",
    "revision": "8ceda9cc1988836b1d45f13aa3371e1d"
  },
  {
    "url": "main.css",
    "revision": "397a6c6fa7bece76cc214acd9f13cfb9"
  }
])

	  workbox.routing.registerRoute(
		  /\/api\/Messages\/*/,
		  workbox.strategies.networkOnly({
		    plugins: [bgSyncPlugin]
		  }),
		  'POST'
	)
	  workbox.routing.registerRoute(
		  /\/api\/*/,
		  workbox.strategies.networkFirst({
      		cacheName: 'api-get',
		    plugins: [
		        new workbox.expiration.Plugin({
		          maxAgeSeconds: 30 * 24 * 60 * 60,
		          maxEntries: 30,
		        }),
		        new workbox.cacheableResponse.Plugin({
		          statuses: [0, 200],
		        }),
		    ],
  		}),
		  'GET'
	)

	workbox.routing.registerRoute(
  		/(.*)widget.cloudinary.com\/(.*)/,
  		workbox.strategies.cacheFirst({
      		cacheName: 'cloud-images',
		    plugins: [
		        new workbox.expiration.Plugin({
		          maxAgeSeconds: 30 * 24 * 60 * 60,
		          maxEntries: 300,
		        }),
		        new workbox.cacheableResponse.Plugin({
		          statuses: [0, 200],
		        }),
		    ],
  		}),
	)

	workbox.routing.registerRoute(
  		new RegExp('(.*)fontawesome.com/(.*)'),
  		workbox.strategies.cacheFirst({
      		cacheName: 'fonts',
		    plugins: [
		        new workbox.expiration.Plugin({
		          maxAgeSeconds: 30 * 24 * 60 * 60,
		          maxEntries: 300,
		        }),
		        new workbox.cacheableResponse.Plugin({
		          statuses: [0, 200],
		        }),
		    ],
  		}),
	)

	workbox.routing.registerRoute(
  		new RegExp('(.*)googleapis.com/(.*)'),
  		workbox.strategies.cacheFirst({
      		cacheName: 'fonts',
		    plugins: [
		        new workbox.expiration.Plugin({
		          maxAgeSeconds: 30 * 24 * 60 * 60,
		          maxEntries: 300,
		        }),
		        new workbox.cacheableResponse.Plugin({
		          statuses: [0, 200],
		        }),
		    ],
  		}),
	)

	workbox.routing.registerRoute(
  		new RegExp('(.*)gstatic.com/(.*)'),
  		workbox.strategies.cacheFirst({
      		cacheName: 'fonts',
		    plugins: [
		        new workbox.expiration.Plugin({
		          maxAgeSeconds: 30 * 24 * 60 * 60,
		          maxEntries: 300,
		        }),
		        new workbox.cacheableResponse.Plugin({
		          statuses: [0, 200],
		        }),
		    ],
  		}),
	)


} else {
	console.log('Boo! Workbox didn\'t load 😬')
}