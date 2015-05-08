(function () {
"use strict";

var app = angular.module('wt.glimpse');

app.provider('glimpse', function () {
	var _eval = eval;
	var url = '/',
		apiPage = '/elmah.axd',
		hash = '2e34b611';

	this.setGlimpseSite = function (glimpseAxdUrl) {
		url = glimpseAxdUrl;
	};

	this.setApiPage = function (apiPageUrl) {
		apiPage = apiPageUrl;
	};

	var run = function glimpseRun($http, $q) {
		return function () {
			var s1, s2,
				html;

			// get scripts
			s1 = $http.get(url + '/Glimpse.axd?n=glimpse_client&hash=' + hash, { responseType: 'application/x-javascript' })
				.then(data => data.data);
			s2 = $http.get(url + '/Glimpse.axd?n=glimpse_metadata&hash=' + hash + '&callback=glimpse.data.initMetadata', { responseType: 'application/x-javascript' })
				.then(data => data.data);

			// fetch some html to get access to Glimpse-RequestID
			html = $http.head(url + apiPage, {
				responseType: 'text/html',
				headers: {
					'X-Requested-With': ''
				}
			}).then(data => {
				var requestId = data.headers("Glimpse-RequestID");
				var glimpseUrl = url + '/Glimpse.axd?n=glimpse_request&requestId=' + requestId + '&hash=' + hash + '&callback=glimpse.data.initData';
				return $http.get(glimpseUrl);
			}).then(data => data.data);

			$q.all([s1, s2, html])
				.then(function (data) {
					data.forEach(script => _eval(script));
				});
		};
	};

	this.$get = function ($http, $q) {
		return {
			run: run($http, $q)
		};
	};
});

})();