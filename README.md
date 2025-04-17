# ARCHIVED!

The new and improved version of the website is located at https://github.com/SiegfriedSchmidt/MeshMurmur

# Best serverless platform for chatting

### Site

https://siegfriedschmidt.github.io/testTrysteroChat/

# Contribution

## Issues

If you have any ideas to improve the project,
you can add new issue with label "enhancement".
And if you encounter any errors while using our chat, feel
free to add an issue describing this error.

## Pull requests

Create a fork of this repository, make the appropriate changes,
contribute by creating a pull request. Add a valuable description
of what you are want to add with this PR.
Our staff will review your PR request as soon as possible.
And you may get the opportunity to become one of the contributors to our project :).

## Development

Node.js 20.X version is required for development.
You can install Node.js on official website https://nodejs.org

Also you need to install git https://git-scm.com

### Clone repository

```bash
$ git clone https://github.com/SiegfriedSchmidt/testTrysteroChat.git
```

### Install nodejs dependencies

```bash
$ cd testTrysteroChat
$ npm i
```

### Add https certs

The application must run over https because
The WebRTC protocol and webcrypto API
requires the use of a secure context

You can add your certificates to the certs folder in
the root directory of the project:

```bash
$ mkdir certs
$ cp tls.crt certs
$ cp tls.key certs
```

Or you can change the vite.config.ts
to automatically generate certificates:

Install vite-plugin-mkcert dependency

```bash
$ npm i vite-plugin-mkcert -D
```

Change this:

```ts
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as fs from "fs";

export default defineConfig({
  server: {
    port: 8000,
    host: '0.0.0.0',
    https: {
      cert: fs.readFileSync('./certs/tls.crt'),
      key: fs.readFileSync('./certs/tls.key')
    },
  },
  base: process.env.NODE_ENV === 'production' ? '/testTrysteroChat/' : '/',
  plugins: [react()],
})
```

To this:

```ts
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  server: {
    port: 8000,
    host: '0.0.0.0',
    https: true,
  },
  base: process.env.NODE_ENV === 'production' ? '/testTrysteroChat/' : '/',
  plugins: [react(), mkcert()],
})
```

### Run dev server

```bash
vite
```

The Dev server will run on the local network
on port 8000

## Also don't forget to add a star to the repository :)
