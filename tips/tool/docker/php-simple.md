# PHP の実行環境を docker-compose で簡単 1 分でつくる -『Docker』

`docker-compose.yml` ファイルひとつで、php の実行環境を構築します。php ファイルをインクルードして、テンプレートを組むように開発環境を構築したり、プレビューしたいときなどに利用します。データベースは含みません。

Docker for Mac を導入前提とします。

- [Docker For Mac | Docker](https://www.docker.com/docker-mac)

次のファイルをプロジェクトルートに作ります。

#### docker-compose.yml

```bath

app:
  image: debian:jessie
  volumes:
    - ./www:/usr/share/php/html
  tty: true
php:
  image: php:7.0-cli
  expose:
    - "80"
  ports:
    - "80:80"
  volumes_from:
    - app
  working_dir: /usr/share/php/html
  command: php -S 0.0.0.0:80

```

プロジェクトルートで`docker-compose up`します。

#### terminal

```bath

docker-compose up

```

`http://0.0.0.0/` にアクセスすると、サーバが立ち上がっています。

おわります。
