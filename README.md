# MindSphere Hello World example in Node.js
## Description
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
### backendServer creation creation
```
express backendServer
```