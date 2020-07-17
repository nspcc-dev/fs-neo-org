# Neofs

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Building a distribution for a testbench

To build and publish a tarball with test code to the internal artifactory,
one should run a command:
```
drone exec --secret-file=secrets.txt --include 'make test tarball'
```
It will trigger a local build of pipeline step and produce a tarball.
To push a tarball to the artifactory, one need to specify his Artifactory
API Key in `secrets.txt` file. One might make an API Key in Artifactory
settings.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
