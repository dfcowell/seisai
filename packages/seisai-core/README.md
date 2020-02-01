# Seisai Core

<p align="center">Seisai is an open-core photo management and publishing platform. Seisai is built with Nest JS.</p>

## Description

This application is built using Nest JS and uses `docker-compose` for provisioning the development environment.

During development, the source code directory is mounted inside the docker container and the application is run in watch mode.

## Installation

You can optionally install dependencies yourself and run the application outside of Docker.

```bash
$ yarn
```

## Running the app

```bash
# development (watch mode)
$ docker-compose up

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Dan Cowell](https://dfcowell.net)

## License

Seisai Core is [MIT licensed](LICENSE).
