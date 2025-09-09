---
layout: post
title: Bind 9 Nedir ? - What is Bind 9?
date: 2022-05-23 09:18
tags: [dns]
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":3224,"width":"452px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/bind-nedir.png?w=1024" alt="" class="wp-image-3224" style="width:452px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>BIND</strong>;&nbsp;internet üzerinde kullanılan en yaygın DNS sunucusu yazılımıdır. BIND (Berkeley Internet Name Domain) 1980lerde Berkeley Üniversitesinde 4 öğrenci tarafından ortaya atılan bir projedir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>BIND ve DNS:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sunucu yapılandırmasını ve altyapısını yönetmenin önemli bir parçasıdır, uygun bir Etki Alanı Adı Sistemi (DNS) kurarak ağ arabirimlerini ve IP adreslerini ada göre aramanın kolay bir yoludur.&nbsp;Ağ adreslerini belirtmek için IP adresleri yerine tam etki alanı adlarının (FQDN'ler) kullanılması, hizmetlerin ve uygulamaların yapılandırılmasını kolaylaştırır ve yapılandırma dosyalarının sürdürülebilirliğini artırır.&nbsp;Özel ağınız için kendi DNS'nizi kurmak, sunucularınızın yönetimini iyileştirmenin harika bir yoludur.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu Tools ortamınız birkaç ana bilgisayardan daha fazla büyüdünüğüzde vazgeçilmez olan dahili ana bilgisayar adlarınızı ve özel IP adreslerinizi merkezi şekilde yönetmenin harika bir yoludur.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#Example Conf.<br>#named.conf<br>listen-on port 53 { 127.0.0.1; any; }; #any; (her gelen) isteğe cevap ver.<br>listen-on-v6 port 53 { ::1; };<br>directory       "/var/named";<br>dump-file       "/var/named/data/cache_dump.db";<br>statistics-file "/var/named/data/named_stats.txt";<br>memstatistics-file "/var/named/data/named_mem_stats.txt";<br>secroots-file   "/var/named/data/named.secroots";<br>recursing-file  "/var/named/data/named.recursing";<br>allow-query     { localhost; };<br>allow-query-cache   { localhost; any; }; #istekleri cache al. (her gelen dahil)</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">more...</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Yararlı olması dileğiyle. – Hope it’s useful.</strong></p>
<!-- /wp:paragraph -->
