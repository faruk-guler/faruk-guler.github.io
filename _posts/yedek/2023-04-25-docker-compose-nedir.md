---
layout: post
title: What is Docker Compose? - Docker Compose Nedir?
date: 2023-04-25 03:13
author: theguler
comments: true
categories: [Containerization]
---
<!-- wp:image {"id":11300,"width":"530px","height":"auto","aspectRatio":"2.089820359281437","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/composes.jpg?w=1024" alt="" class="wp-image-11300" style="aspect-ratio:2.089820359281437;width:530px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Docker Compose,</strong> Docker konteynerlarını yönetmek ve çoklu konteyner uygulamalarını tanımlamak için kullanılan bir araçtır. Bu araç, YAML dosyalarını kullanarak uygulamanızın hizmetlerini, ağlarını ve depolama ayarlarını tanımlamanıza olanak tanır. Docker Compose, Docker konteynerlarını başlatmak, durdurmak ve yeniden oluşturmak için kolay bir yol sunar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Docker Compose kullanarak, her bir konteyner için hangi Docker imajının kullanılacağını, hangi ağlarla bağlantı kurulacağını, hangi depolama ayarlarının kullanılacağını ve her hizmetin nasıl yapılandırılacağını belirten bir <code>docker-compose.yml</code> dosyası oluşturabilirsiniz. Ardından, bu dosyayı kullanarak tüm uygulamayı bir komutla başlatabilir, durdurabilir veya yeniden oluşturabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Docker Compose Kurulum:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">sudo apt-get update<br>sudo apt-get install docker-compose-plugin<br>docker compose version</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Bazı Docker Compose Komutları:</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>docker compose up</strong><br>Docker Compose dosyasındaki hizmetleri oluşturur ve başlatır. Eğer belirtilen hizmetler zaten varsa, sadece başlatılırlar. <strong>-d</strong> (detach) bayrağı kullanılarak hizmetler arka planda başlatılabilir.<br><strong><br>docker compose down</strong><br>Docker Compose dosyasındaki hizmetleri durdurur ve ilgili konteynerleri siler. Ayrıca, ilişkili ağları ve birimleri de kaldırır. Konteynerlerin durumunu ve verilerini korumak için -v (volumes) bayrağı kullanılabilir.<br><br><strong>docker compose start</strong><br>Duraklatılan hizmetleri başlatır.<br><br><strong>docker compose stop</strong><br>Hizmetleri durdurur.<br><br><strong>docker compose restart</strong><br>Hizmetleri yeniden başlatır.<br><br><strong>docker compose pause</strong><br>Hizmetleri duraklatır.<br><br><strong>docker compose unpause</strong><br>Duraklatılan hizmetleri devam ettirir.<br><br><strong>docker compose exec</strong><br>Belirli bir hizmetin içinde çalışan bir komutu yürütür. Örneğin, docker-compose exec &lt;hizmet-adı&gt; &lt;komut&gt; şeklinde kullanılır.<br><br><strong>docker compose logs</strong><br>Hizmetlerin günlük (log) çıktılarını görüntüler.<br><br><strong>docker compose ps</strong><br>Çalışan hizmetlerin durumunu ve bilgilerini görüntüler.<br><br><strong>docker compose build</strong><br>Docker Compose dosyasında tanımlanan hizmetlerin imajlarını oluşturur. Bu komut, Dockerfile dosyalarını temel alarak imajları oluşturur.<br><br><strong>docker compose pull</strong><br>Docker Compose dosyasında tanımlanan hizmetlerin imajlarını Docker Hub veya belirtilen bir imaj deposundan indirir.<br><br><strong>docker compose kill</strong><br>Hizmetlerin çalışmasını sonlandırır.<br><br><strong>docker compose rm</strong><br>urmuş hizmetleri ve ilişkili ağları, birimleri ve volümleri kaldırır.<br><br><strong>docker compose scale</strong><br>Bir hizmetin ölçeklendirilmesini sağlar. Örneğin, docker-compose scale &lt;hizmet-adı&gt;=&lt;numara&gt; şeklinde kullanılır.<br><br><strong>docker compose top</strong><br>Hizmetlerin çalışan işlemlerini görüntüler.<br><br><strong>docker compose config</strong><br>Docker Compose dosyasının geçerli olup olmadığını kontrol eder ve yapılandırma detaylarını görüntüler.<br><br><strong>docker compose events</strong><br>Docker Compose olaylarını (events) izler ve görüntüler.<br><br><strong>docker compose port</strong><br>Hizmetin bağlı olduğu portu görüntüler.<br><br><strong>docker compose version</strong><br>Kullanılan Docker Compose sürümünü görüntüler.</pre>
<!-- /wp:preformatted -->
