### 빌드 및 배포 관련

1. **ip 주소 및 도메인**

```
공인IP : 13.124.171.154
서버도메인 : i5a102.p.ssafy.io
```

1. **버전**

   JVM : 1.8

   Nginx : nginx/1.18.0 (Ubuntu

   nodejs : 14.17.3

   Springboot : 2.5.3

   Intelij : 2021.1

1. 빌드 전 웹서버 reverse proxy

   nginx.conf 수정

   ```sql
   sudo vi /etc/nginx/nginx.conf
   ```

   - etc/nginx/nginx.conf

     ```sql
     user www-data;
     worker_processes auto;
     pid /run/nginx.pid;
     include /etc/nginx/modules-enabled/*.conf;

     events {
     	worker_connections 768;
     	# multi_accept on;
     }

     http {

     	##
     	# Basic Settings
     	##

     	sendfile on;
     	tcp_nopush on;
     	tcp_nodelay on;
     	keepalive_timeout 65;
     	types_hash_max_size 2048;
     	# server_tokens off;

     	# server_names_hash_bucket_size 64;
     	# server_name_in_redirect off;

     	include /etc/nginx/mime.types;
     	default_type application/octet-stream;

     	##
     	# SSL Settings
     	##s

     	ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
     	ssl_prefer_server_ciphers on;

     	##
     	# Logging Settings
     	##

     	access_log /var/log/nginx/access.log;
     	error_log /var/log/nginx/error.log;

     	##
     	# Gzip Settings
     	##

     	gzip on;

     	# gzip_vary on;
     	# gzip_proxied any;
     	# gzip_comp_level 6;
     	# gzip_buffers 16 8k;
     	# gzip_http_version 1.1;
     	# gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

     	##
     	# Virtual Host Configs
     	##

     	include /etc/nginx/conf.d/*.conf;
     	include /etc/nginx/sites-enabled/*;

     	server {
     			listen 443 ssl; # managed by Certbot
     			server_name i5a102.p.ssafy.io;

     			ssl_certificate /etc/letsencrypt/live/i5a102.p.ssafy.io/fullchain.pem; # managed by Certbot
                 ssl_certificate_key /etc/letsencrypt/live/i5a102.p.ssafy.io/privkey.pem; # managed by Certbot
                 include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
                 ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

                 location / {
                     proxy_pass http://172.22.0.1:3000;
                 }

                 location /api {
                     proxy_pass http://172.22.0.1:8080;
                 }

     	    location /static/img {
     		proxy_pass http://172.22.0.1:8080/static/img;
     	   }

         }

         server {
         	    listen 80;
         	    server_name i5a102.p.ssafy.io;

         	    if ($host = i5a102.p.ssafy.io) {
                      return 301 https://$host$request_uri;
                 } # managed by Certbot
                 return 404; # managed by Certbot
         }

     }

     ```

1. SSH 연결

   ssh로 접근 시 포트 번호는 "2222", ubuntu 계정으로 접근

1. DB 접속 정보

   ```sql
   id : kyp
   password : qwerty2570#
   ```

   ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1eb52401-359d-4019-afd4-cda6f87f4fa1/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1eb52401-359d-4019-afd4-cda6f87f4fa1/Untitled.png)

   ```sql
   cd /etc/mysql/mysql.conf.d
   sudo vi mysqld.cnf
   bind-address 127.0.0.1 가 적힌줄 맨앞에 # 를 넣어 주석처리 해주기
   mysql 접속(sudo /usr/bin/mysql -u root -p)

   mysql> create user 'root'@'%' identified by '[password]';
   mysql> grant all privileges on *.* to 'root'@'%' with grant option;

   create user 'kyp'@'%' identified by '~~qwerty2570#~~';
   grant all privileges on *.* to 'kyp'@'%';
   flush privileges;

   sudo ufw allow mysql
   sudo systemctl start mysql
   sudo systemctl enable mysql
   ```

1. **빌드시 주의할 점**

   **React**

   - 따로 빌드를 하지 않고, 도커를 이용해 이미지 생성해서 frontend를 실행한다.

   1. Dockerfile이 있는 곳에서 도커 이미지 생성

      ```sql
      cd S05P13A102/frontend/front
      docker build -t eoneofront:v0.1 .
      ```

   1. 이미지 실행 ⇒ 컨테이너, 3000번 포트로 포트포워딩 실행

      ```sql
      docker run -d -p 3000:3000 --network eoneo --name eoneofront eoneofront:v0.1
      ```

   **Springboot**

   1. 빌드하기전 ./gradlew 권한부여

   ```sql
   sudo chmod 777 ./gradlew
   ```

   1. 빌드

   ```sql
   ./gradlew build && java -jar build/libs/eoneo**-0.0.1.jar**
   ```

   1. 도커 이미지 생성

   ```sql
   docker build --build-arg JAR_FILE=build/libs/eoneo-0.0.1-SNAPSHOT.jar -t eoneoback:v0.0 .
   ```

   1. 도커 컨테이너 실행, 8080포트로 포트포워딩 및 이미지 마운트를 위한 -v 경로 주의

   ```sql
   docker run -d -p 8080:8080 --network eoneo --name eoneoback -v /home/ubuntu/images:/var/eoneo/images eoneoback:v0.0
   ```

- 실행시 Cors Error 관련 수정사항

  backend/src/main/java/com/kyp/eoneo/config/CorsConfig.js

  config.addAllowedOrigin("") 부분을 해당 domain으로 수정필요

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/384523de-62c4-4974-8079-f339c0728279/Untitled.png)

    backend/src/main/java/com/kyp/eoneo/config/WebSocketConfig.js

    setAllowedOrigins("") 부분을 해당 domain으로 수정 필요

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b716a509-02b4-4174-9d4a-63d44ad6d2ab/Untitled.png)

### 외부서비스 정보 문서

1. **OpenVidu 적용**

기존 저희 프로젝트와 동일한 버전의 오픈비두를 사용하기 위해 dockerhub에 image들을 올려놨습니다.

```sql
docker pull seona8854/kurento-media-server
docker pull seona8854/openvidu-call
docker pull seona8854/openvidu-server-kms
docker pull seona8854/openvidu-server
docker pull seona8854/openvidu-coturn
docker pull seona8854/openvidu-proxy
docker pull seona8854/openvidu-redis
```

1. 실행

```sql
sudo su

cd /opt

cd openvidu

./openvidu start
```

추가 사항은 오픈비두 공식문서에서 참고해주세요!

[](https://docs.openvidu.io/en/2.19.0/deployment/ce/on-premises/#1-prerequisites)

1. **Certbot SSL 인증서 적용**

   running nginx on ubuntu 20.04

1. certbot 설치

```sql
sudo apt-get install snapd
sudo snap install core;
sudo snap install --classic certbot
```

1. certbot symbolic link 연결

   ```sql
   sudo ln -s /snap/bin/certbot /usr/bin/certbot
   ```

2. certbot이 알아서 nginx 설정까지 잡아주는 명령어 이용

   ```sql
   sudo certbot --nginx
   ```

3. nginx.conf 수정

   - nginx.conf

     ```sql
     	server {
     			listen 443 ssl; # managed by Certbot
     			server_name i5a102.p.ssafy.io;

     			ssl_certificate /etc/letsencrypt/live/i5a102.p.ssafy.io/fullchain.pem; # managed by Certbot
           ssl_certificate_key /etc/letsencrypt/live/i5a102.p.ssafy.io/privkey.pem; # managed by Certbot
           include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
           ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

           location / {
                 proxy_pass http://172.22.0.1:3000;
            }

           location /api {
                proxy_pass http://172.22.0.1:8080;
            }

         }

         server {
         	    listen 80;
         	    server_name i5a102.p.ssafy.io;

         	    if ($host = i5a102.p.ssafy.io) {
                      return 301 https://$host$request_uri;
                 } # managed by Certbot
                return 404; # managed by Certbot
         }

     }
     ****
     ```
