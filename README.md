# BlankClub

<a href="https://gitmoji.dev">
<img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a>

# Initialization

### docker

- https://docs.docker.com/desktop/mac/install/

### install packages

#### Install brew

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### Install library

```shell
make init
```

### Run

#### Run Infra

```shell
make docker-up
```

#### Run Service

```shell
# All service except app
yarn dev
```

### Test & Lint

```
yarn lint
```

