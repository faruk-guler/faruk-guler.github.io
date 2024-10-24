---
layout: post
title: What is docker-compose.yml File?
date: 2023-06-22 20:11
tags: [Docker]
author: theguler
comments: true
categories: [Containerization]
---
<!-- wp:image {"id":11426,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/docker-compose-diagram.png?w=629" alt="" class="wp-image-11426" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Docker Compose, </strong>birden çok Docker konteynerini tek bir konfigürasyon dosyasında tanımlamak ve yönetmek için kullanılan bir araçtır.  "<code>docker-compose.yml</code>" dosyası ise Docker Compose tarafından kullanılan yapılandırma dosyasıdır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>"<code>docker-compose.yml</code>" </strong>dosyası, YAML <strong>(YAML Ain't Markup Language)</strong> formatında yazılır ve Docker Compose ile çalışacak konteynerlerin yapılandırmalarını içerir. Bu dosya, bir proje veya uygulama için gerekli olan tüm <strong>konteynerleri, bağlantıları, ağları, ortam değişkenlerini ve diğer parametreleri</strong> tanımlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Docker Compose, varsayılanda proje tanım dosyasını <code>docker-compose.yml</code> adıyla arar. Ancak, farklı bir dosya adı kullanmak istiyorsanız, <code>-f</code> veya <code>--file</code> bayrağını kullanarak belirtmeniz gerekir.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">docker compose -f son-compose.yml up -d<br>docker compose -f son-compose.yml down</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Docker-Compose.yml örnekleri:</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Wordpress + Mysq</strong>l<br>version: "3.9"<br><br>services:<br>  wordpress:<br>    image: wordpress:latest<br>    restart: always<br>    ports:<br>      - "4040:80"<br>    environment:<br>      WORDPRESS_DB_HOST: mysql<br>      WORDPRESS_DB_USER: root<br>      WORDPRESS_DB_PASSWORD: example<br>      WORDPRESS_DB_NAME: wordpress<br>    volumes:<br>      - wordpress:/var/www/html<br><br>  mysql:<br>    image: mysql:5.7<br>    restart: always<br>    environment:<br>      MYSQL_ROOT_PASSWORD: example<br>      MYSQL_DATABASE: wordpress<br><br>volumes:<br>  wordpress:</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Basit bir NGINX Web Sayfasi</strong><br>version: '3.8'<br>services:<br>  web:<br>    image: nginx:latest<br>    ports:<br>      - "8080:80"<br>    volumes:<br>      - ./html:/usr/share/nginx/html</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#<strong>Portainer</strong><br>version: '3.8'<br>services:<br>  portainer:<br>    image: portainer/portainer-ce<br>    restart: always<br>    container_name: portainer<br>    ports:<br>      - "8000:8000"<br>      - "9000:9000"<br>    volumes:<br>      - /var/run/docker.sock:/var/run/docker.sock<br>      - portainer_data:/data<br>volumes:<br>  portainer_data:</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Best Regards. – Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
