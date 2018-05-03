# MindSphere Hello World example in Node.js
## Introduction
This is a hello world example application for [Siemens MindSphere](https://www.siemens.com/global/en/home/products/software/mindsphere.html) v3 platform. <br />
This repository is composed by three components:
*  **backendServer**
    * [Node.js](https://nodejs.org/) server that exposes application APIs.
*  **frontendServer**
    * [Node.js](https://nodejs.org/) server that serves the UI.
*  **ui**
    *  [Vue.js](https://vuejs.org/) project to build the user interface. This project will be built and served as static files by frontendServer component.

Only **backendServer** and **frontendServer** are going to be deployed to MindSphere. <br />
[MindSphere Developer Official Documentation](https://developer.mindsphere.io/howto/howto-cloud-foundry/index.html)

## Requirements
*   Siemens MindSphere developer partnership
*   [CloudFoundry CLI](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html)
*   [Node.js](https://nodejs.org/en/download/)
*   [Express application generator](https://expressjs.com/en/starter/generator.html) *(optional)*
*   [Vue.js](https://vuejs.org/v2/guide/installation.html#NPM)

## Cheatsheet
### backendServer
Create Express application
```
express backendServer
```
Download and install the needed npm packages
```
cd backendServer
npm install
```
Exlude node_modules folder during CloudFoundry deployment
```
echo "node_modules" > .cfignore
```
Add a test route in backendServer/routes/index.js
```
router.get('/appapi/test', function(req, res, next) {
  res.send("Hi, it's MindSphere");
});
```
Allow Cross Origin Access. Add the following in backendServer/app.js before any routing settings:
```
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
```
### frontendServer
Create Express application
```
express frontendServer
```
Download and install the needed npm packages
```
cd frontendServer
npm install
```
Exlude node_modules folder during CloudFoundry deployment
```
echo "node_modules" > .cfignore
```
Add a route to in frontendServer/routes/index.js <br />
It will serve the Vue single page application for any requested url
```
router.get('*', function(req, res, next) {
  res.sendfile("public/index.html");
});
```
### ui
Create Vue application. To be compliant with Content Security Policies, choose *runtime only* as Vue build when prompted during the application generation.
```
vue init webpack ui
```
Install axios
```
cd ui
npm install axios --save
```
In ui/src/App.vue replace the template with:
```
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
```
In ui/src/components/HelloWorld.vue replace the template with:
```
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>
```
Import axios
```
import axios from 'axios'
```
Add *created* method
```
 created: function () {
    var url = '/appapi/test'
    if (process.env.NODE_ENV == 'development') {
      url = 'http://localhost:3000/appapi/test'
    }
    axios.get(url)
    .then(function (response) {
      this.msg = response.data
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }
}
```
In ui/src/router/index.js replace the Router with:
```
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/app/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
```
In ui/package.json replace the build command with:
```
"build": "node build/build.js && rm -rf ../frontendServer/public/static/ && cp -r dist/ ../frontendServer/public/"
```
## Deployment
Go to the Vue project root directory and build the project
```
npm run build
```
Create an application from the MindSphere Launchpad > Developer Cockpit. <br />
Create two components:
*   backendserver
    *   Cloud Foundry Direct URL: https://[yourCFComponent1].apps.eu1.mindsphere.io
*   frontendserver
    *   Cloud Foundry Direct URL: https://[yourCFComponent2].apps.eu1.mindsphere.io

Perform the initial CF login ([guide](https://developer.mindsphere.io/howto/howto-cloud-foundry/index.html#connecting-to-cloud-foundry-via-cf-cli)) <br />
Go to the backendServer project root directory and push the project to MindSphere
```
cf push [yourCFComponent1]
```
Go to the frontendServer project root directory and push the project to MindSphere
```
cf push [yourCFComponent2]
```
