# Reactapp-Docker

## How to run

## 1. clone the repo

```
git clone https://github.com/LiliTaleb/reactproject
```

## 1. build docker container

```
cd reactproject/
docker-compose up --build
```

## 2. Check container

```
docker ps
```

```
CONTAINER ID   IMAGE                   COMMAND                  CREATED       STATUS       PORTS                              NAMES
954239db0985   reactproject_frontend   "docker-entrypoint.s…"   6 hours ago   Up 6 hours   9229/tcp, 0.0.0.0:3001->3000/tcp   frontend
87b4fc4d07af   reactproject_backend    "docker-entrypoint.s…"   6 hours ago   Up 6 hours   0.0.0.0:3000->3000/tcp             backend
```

### 3. Browse this url

```
http://localhost:3001/
```
