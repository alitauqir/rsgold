/**
 * Copyright 2016 Google Inc. All rights reserved.
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

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["about.html","83d47c0a900eef9ea86a6d49df3f6803"],["assets/css/bootstrap.min.css","94994c66fec8c3468b269dc0cc242151"],["assets/css/datepicker.css","2d18263884e2d54fcef171ffe0c88fd2"],["assets/css/gallery.css","f6528d76c169479a79bf025bb56cd5f0"],["assets/css/style.css","47a1e07e92bbf8906e07c122bfac5e35"],["assets/img/banner1.jpg","2b22c7edde8fd21a86aad6befe0f48ac"],["assets/img/banner2.jpg","7b77950f07f833884653c880409d2635"],["assets/img/banner3.jpg","24bfdd9171dff87bf6290c9f987d7846"],["assets/img/choker.jpg","76340a2f88ecf670e43216398f039e8e"],["assets/img/earrings.jpg","846972bb44c235cab67d5e5aa40dc7bf"],["assets/img/f-qc.png","7941595fd2a198a44d6f2f52cb011432"],["assets/img/gallery/1.jpg","4c3d214ea6601031b4ce5fb26d2590e4"],["assets/img/gallery/10.jpg","ee39e545e3d9311ea2547d6bf563b142"],["assets/img/gallery/2.jpg","b31d7aa883db08f791ab5365eb09033a"],["assets/img/gallery/3.jpg","6615c640c6fcb4697ebc7bc19ea3eb6e"],["assets/img/gallery/4.jpg","32e2d9b1d992819ce465557c21598a3a"],["assets/img/gallery/5.jpg","1e3b9659a66d6c76a3845de429f2f8a4"],["assets/img/gallery/6.jpg","5ce73a1e6422f1196517c8026a53ed39"],["assets/img/gallery/7.jpg","152998d4c89184b201a88c0f1194db28"],["assets/img/gallery/8.jpg","68378bd4b1d9d9b1b307b112c97bf8ec"],["assets/img/gallery/9.jpg","5fec50ce346e5942c2c073a6b1e05b7a"],["assets/img/haram.jpg","ccb6f103e8df9637fff2a309beb957d0"],["assets/img/icons/ban.png","c8755ae7a240d84ce2860baafed59748"],["assets/img/icons/calling.png","49266e48e72a77f8a75b973fcb5e23e4"],["assets/img/icons/cho.png","3722b777d1ac296b324f45a1105b2575"],["assets/img/icons/download.png","3fc9fc9787b9302232474bedfb3a31cd"],["assets/img/icons/ear.png","5ee99d98d75b65032e691921c4c7277c"],["assets/img/icons/har.png","3108c15aee57e0363f5f4e7f487c3a6c"],["assets/img/icons/mail.png","ec051681eddd669e90f2b9e1cc8e30c7"],["assets/img/icons/neck.png","10184b820d4be57bec17bd11ece18fc1"],["assets/img/icons/ring.png","262154353e94f04c3d3d11a34db9348b"],["assets/img/icons/share.png","d4a8e22ae505a15852a6215a7105a9ad"],["assets/img/icons/whtpp.png","4bd3c9842ec84b0cd628100c9e3f5346"],["assets/img/icons/www.png","c8a8b3ebc4c9e4fe6c38c7a2e4474dc1"],["assets/img/logo-w.png","1a127d6a9bdce1a40291c7b7db499abd"],["assets/img/necklace.jpg","24f8e1c68e8432a60d7c74a0a1a9c11f"],["assets/img/products/b1.jpg","4aebbf5ed32a6e64872b3fc43b3257fc"],["assets/img/products/b2.jpg","84ae818c5f7332fc0781be805fdd6508"],["assets/img/products/b3.jpg","5a3e915e02c6e5dcef03935abccbd2de"],["assets/img/products/b4.jpg","6ae386802b0348738568fdf820dd9b35"],["assets/img/products/b5.jpg","6ebc6c74307e57a5d7eb31deea947dbd"],["assets/img/products/b6.jpg","27a1d223f8d2fa225b7426fede409fed"],["assets/img/products/c1.jpg","db3edfd49b5e822fb3294bf1092714fe"],["assets/img/products/c2.jpg","c2574358c66f479b77790ea174bb6a73"],["assets/img/products/c3.jpg","c08646fadcfcd25eb2557fc5fddf4ef3"],["assets/img/products/c4.jpg","71922cc87be524dad326914f80b4c991"],["assets/img/products/c5.jpg","53b50d59ae72884f85a7e771a49f3e55"],["assets/img/products/c6.jpg","e2a14f75bfbc6f01e84da48cb309f1b7"],["assets/img/products/e1.jpg","1f38606acebfa4246eeba21537d603db"],["assets/img/products/e2.jpg","18d3a6df9606a51d04ee3401b2c7c008"],["assets/img/products/e3.jpg","89e9cbd1435124e0199c49c2395e009a"],["assets/img/products/e4.jpg","1eeca0b0935964b0d5be845553292b14"],["assets/img/products/e5.jpg","12289ad9384b5abc77d62b237ec656d7"],["assets/img/products/e6.jpg","53e2a0cb8c10afe789f9e6132d1d44b3"],["assets/img/products/h1.jpg","28660ece9634fa849a4baf224cc99b81"],["assets/img/products/h2.jpg","4c82728cc46b3f106f3d156d90dbd11d"],["assets/img/products/h3.jpg","9820083437af99ff5e6dbddebe73df76"],["assets/img/products/h4.jpg","d7ee4b282c736bc63eb953dfb2fe72e9"],["assets/img/products/h5.jpg","6a5d71a6871d852b59e28c869aaf3e83"],["assets/img/products/h6.jpg","3db9853f1a97750424787e0442f74bcd"],["assets/img/products/n1.jpg","4d7083d5300cbc5f7272f949f62de0b6"],["assets/img/products/n2.jpg","9d00ecaafb4339b50c09a7d2c784e319"],["assets/img/products/n3.jpg","1fb8659461a5e48645b4157845bd7339"],["assets/img/products/n4.jpg","91cc56e9efbf80327e8c79f8fd8182bc"],["assets/img/products/n5.jpg","42720f70732ea9ac8ee9b52b56be6019"],["assets/img/products/n6.jpg","e20069cac8b24e41ecb725f55ebfea84"],["assets/img/products/r1.jpg","d3570b0297da08a08929f194772d02b1"],["assets/img/products/r2.jpg","b371db170a461a65536b33c805d59ebe"],["assets/img/products/r3.jpg","bfa579c4ef7e6bc17acb5e1e0bb44a6e"],["assets/img/products/r4.jpg","8310dbd149c21bcec69fb85241852f26"],["assets/img/products/r5.jpg","9bfb1e0d53b82a675d4d62b569fb5f1d"],["assets/img/products/r6.jpg","bf2f83d9151ffe7a80b04b721bb2db29"],["assets/img/rings.jpg","d532e3f37f9edf3e078916d7a897eda8"],["assets/img/sir192.png","1975bd3e9c14491af419e5184e31a42d"],["assets/img/sir512.png","7776d4e70c4e853b4ea65b71b60e0a74"],["assets/img/women-earrings-cat-web.jpg","1377bca938ca37bc310cc4a50ba72854"],["assets/js/bootstrap-datepicker.js","e57deec51cabd2274ff0e967cb6ca167"],["assets/js/bootstrap.min.js","259e416ef6833be43801b8b68a93b008"],["assets/js/jquery-3.3.1.min.js","a09e13ee94d51c524b7e2a728c7d4039"],["assets/js/main.js","bec438f2d95164aed1ea894434d89f21"],["assets/js/masonry.pkgd.min.js","ba6cf724c8bb1cf5b084e79ff230626e"],["bangles.html","df407d1235b7cdd02d24568f09200c5d"],["category.html","6223b2b4a551f08ad62814ac50d38efb"],["chokers.html","30d37e2b984916e558a862860c0f1803"],["contact.html","f62b273be3f6bb4d7a751a356427e452"],["earrings.html","b4f963943bac6b61659f9f717cbbed3e"],["gallery.html","5ac7bd22b339d2569eaefac9cad1926a"],["harams.html","1a518574398600d51ac5f005c25e96a2"],["index.html","0703c0c0447dc09b5f21084d3b761f4a"],["manifest.json","24a43449e1968293cd96711001ab487c"],["necklaces.html","1d93a8a621c5146753f7157188c50b43"],["products/b1.html","fb3b70cb8d3f1f4b4b2c7db765f1d070"],["products/b2.html","d9ef0ca422c9e79251e69d05161c2044"],["products/b3.html","aaae7e3d2dd73dfaa8be725c8ad0ea37"],["products/b4.html","059c27184c80881595b2067837c4d359"],["products/b5.html","797304b32a04fde0194220f34814ca52"],["products/b6.html","96e7d18d0a609286decd0da6cb8c0472"],["products/c1.html","6b95819bbb243260fb19726c961bea51"],["products/c2.html","573615bc4e12636ec058c2b110c3a5c1"],["products/c3.html","6073ddc546443e0216a03df4b8986b94"],["products/c4.html","a3590f402d68ad0c020c7a24a05a860e"],["products/c5.html","2bcdbff787b834456af96892ad5cb95d"],["products/c6.html","3bf1044f8ae0fd13bb0657b54d072a04"],["products/e1.html","988c9b92d01a5d5cec6a373267600585"],["products/e2.html","e70531899c6744607cfa5f752b18a624"],["products/e3.html","7ffd03118223bb2f1c5d94a49afa5ff8"],["products/e4.html","450b69a6b20db73206a10a18a7246162"],["products/e5.html","c865f4055649b64baa325d912d457b0b"],["products/e6.html","8dacecc3fed9d23b2da6d075c2cb2637"],["products/h1.html","7fc655139c9ae007970796aacbda1253"],["products/h2.html","95aa525d2fb7f22dedee53e31dd3aebb"],["products/h3.html","2ac9df7b9d0a1ae2d7bc1cf041c94ac6"],["products/h4.html","1ecad0df7129c9e9d683773ad2252451"],["products/h5.html","40e2675d8cba124fc46b7f588a41c1d0"],["products/h6.html","93b9edc42292e2ea8e16f945a5c1ed6e"],["products/n1.html","d301089ce49c6d8614497202bd99267c"],["products/n2.html","3e5ae3b72f011c5598f925259731881e"],["products/n3.html","3883ea9bd596d6403150c3ff4e8b66eb"],["products/n4.html","4351b6128abdb00582480e59d3082e35"],["products/n5.html","5af805cc544a13be6e8db95650ef09ea"],["products/n6.html","ae10701a6c347ef70a4f19ff9fc2b1bb"],["products/r1.html","a0a015cf1cf4638c4b9e3224195e9df0"],["products/r2.html","98defd86c1d1f4d706daeae82638e41b"],["products/r3.html","42603c80a76b4cd28da24c12dd007e7d"],["products/r4.html","923aacb42b08f6ff678f89c6b6aafb33"],["products/r5.html","3f21657d8627c52e5e8658b614fdfc08"],["products/r6.html","500b6195dad82fa0a6d964ec85d04081"],["rings.html","e20a02da8a88108dad65ab5260e7ddcd"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







