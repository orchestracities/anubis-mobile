# ANUBIS MOBILE

## Setup

In order to run Anubis mobile you must at first configure React native using this [guide](https://reactnative.dev/docs/environment-setup).
After that run inside the folder

```bash
$ npm install
$ react-native run-android
```

### If watchman is doing an error:

This error is very common with the port on OSX to fix it, run this commands in order and then start the application again 

```bash
$ watchman watch-del-all
$ watchman shutdown-server
```