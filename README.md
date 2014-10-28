# Gifalicious

Your deliciousest gifs.

## Install

To quickly get up and running:

```bash
git clone
npm install
hoodie start
```

You have to run hoodie start once to set up everything.

Set the used hoodie WWW port in the Gruntfile in the connect proxies settings.

### Development

This will start grunt and hoodie. Ready to use jade, sass and livereload.

```bash
grunt serve
```

### Build

Minify, Concat, …

The `www` folder contains the ready build app. So hoodie can use that one to run without grunt.

```bash
grunt build
hoodie start
```
