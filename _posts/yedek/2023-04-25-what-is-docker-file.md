---
layout: post
title: Docker File Nedir? - What is Docker File?
date: 2023-04-25 02:31
author: theguler
comments: true
categories: [Containerization]
---
<!-- wp:image {"id":6686,"width":"571px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/docker_mimari.png?w=1024" alt="" class="wp-image-6686" style="width:571px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Docker tarafından kullanılan bir konfigürasyon dosyasıdır. Bu dosya, bir yazılımın ve uygulamanın Docker konteynerine dahil edilmesi için gerekli olan tüm adımları ve komutları içerir. Docker tarafından bir konteyner oluşturulurken kullanılır ve konteynerin nasıl yapılandırılacağı, hangi yazılım paketlerinin yükleneceği, hangi portların açık olacağı, hangi dosyaların dahil edileceği vb. ayarlamaları içerir. Yani Dockerfile, bir uygulamanın Docker konteynerine nasıl konumlandırılacağı hakkında talimatlar içerir.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading"><strong>Dockerfile'ın temel bileşenleri şunlardır:</strong></h1>
<!-- /wp:heading -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>FROM: </strong>Bu satır, Docker image'ının neye dayanacağını belirler. Yani oluşturulan imajın hangi temel görüntüden başlayacağını belirler. Örneğin: FROM ubuntu:20.04</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>MAINTAINER: </strong>Bu satır, Dockerfile'ın kim tarafından yönetildiğini belirtir. Örneğin: MAINTAINER isimsoyisim <a href="mailto:email@farukguler.net">email@farukguler.com</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>RUN: </strong>Bu satır, imajda çalıştırılacak komutları belirler. Örneğin: RUN apt-get update &amp;&amp; apt-get install -y nginx</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>CMD:</strong> Bu satır, konteyner başlatıldığında çalıştırılacak varsayılan komutu belirler. Örneğin: CMD ["nginx", "-g", "daemon off;"]</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>EXPOSE: </strong>Bu satır, konteynerın hangi portlarını kullanacağını belirtir. Örneğin: EXPOSE 80 443</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>ENV: </strong>Bu satır, konteyner ortam değişkenlerini belirler. Örneğin: ENV MY_VAR="my_value"</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>ADD/COPY:</strong> Bu satırlar, Docker imajına dosya eklemek veya kopyalamak için kullanılır. Örneğin: COPY ./src /app</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>WORKDIR:</strong> Bu satır, komutların çalışacağı dizini belirler. Örneğin: WORKDIR /app</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>USER:</strong> Bu satır, çalışacak kullanıcı adını belirler. Örneğin: USER nginx</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>VOLUME: </strong>Bu satır, konteynerın bağlanabileceği bir hacim oluşturur. Örneğin: VOLUME /data</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>ARG: </strong>Bu satır, Dockerfile içinde kullanılacak değişkenleri tanımlar. Bu değişkenler, "docker build" sırasında kullanılabilir. Örneğin: ARG NODE_VERSION=14</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>LABEL: </strong>Bu satır, imaj hakkında açıklama ve meta verileri eklemek için kullanılır. Örneğin: LABEL description="This is a custom Docker image for Node.js applications"</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>ONBUILD: </strong>Bu satır, başka bir Dockerfile tarafından kullanılacak işlemleri belirler. Örneğin: ONBUILD COPY . /app</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>HEALTHCHECK: </strong>Bu satır, konteynerın sağlığını kontrol etmek için kullanılır. Örneğin: HEALTHCHECK --interval=5m --timeout=3s CMD curl --fail <a href="http://localhost/">http://localhost:80</a> || exit 1</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>SHELL: </strong>Bu satır, Dockerfile içinde kullanılacak kabuk (shell) tipini belirler. Örneğin: SHELL ["/bin/bash", "-c"]</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>***Docker File Pattern:</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">FROM apache:latest<br><br>LABEL name="test-server"<br>LABEL maintainer="guler"<br>LABEL version="4.5.8"<br><br>WORKDIR /usr/share<br><br>COPY homepage.php /usr/share .<br><br>ENV cls="clear"<br><br>EXPOSE<br><br>USER faruk[:adminler]<br>USER Göksel<br><br>ARG version <br><br>RUN apt install php curl net-tools<br><br>ADD https://farukguler.com/repos/container.zip/icerik .<br><br>HEALTHCHECK<br><br>CMD [ "node" ]<br><br>ENTRYPOINT ["docker-entrypoint.sh"]<br><br>SHELL [“/bin/bash”, “-c”]<br><br>VOLUME</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Best Regards. – Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
