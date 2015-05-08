# angular-glimpse

Have Glimpse Heads-Up Display on you AngularJS single-page application.

## Install

This project isn't available on any package manager. Use directly from GitHub.

## Configuring

```js
var app = angular.module('myApp', ['wt.glimpse']);
...
app.config(function (glimpseProvider) {
	// configure site hosting Glimpse.axd 
    glimpseProvider.setGlimpseSite('/webapiendpoint');
	// configure a pre-flight URL (this is the default)
    glimpseProvider.setApiUrl('/elmah.axd');
});
app.run(function (glimpse) {
    glimpse.run();
});
```
