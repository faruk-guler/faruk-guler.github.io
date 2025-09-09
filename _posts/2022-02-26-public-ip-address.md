---
layout: post
title: About Public IP Address
date: 2022-02-26 19:01
tags: [Network]
author: theguler
comments: true
categories: [Network]
---
<!-- wp:image {"id":2088,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/ips.png?w=714" alt="" class="wp-image-2088" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Public IP adresleri, internete doğrudan bağlı cihazlar tarafından kullanılır ve tüm internet kullanıcıları arasında benzersizdir. Private IP adresleri ise, belirli bir ağda yerel cihazlar tarafından kullanılır ve ağda benzersizdir. Bununla birlikte, PublicIP adresleri, internetin tamamında benzersizdir ve internet servis sağlayıcıları (ISP’ler) tarafından sağlanır.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":1,"className":"wp-block-heading"} -->
<h1 class="wp-block-heading"><strong>Public IPv4&nbsp;Adresi Sınıfları - Public IPv4&nbsp;Address Classes:</strong></h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>IP adresleri</strong>, Classful Addressing adı verilen bir yöntemle sınıflara ayrılır. Bu sınıflandırma, IP adreslerinin hangi <strong>ağ ve host</strong> kısımlarının olduğunu belirler. IP adresleri<strong>, A, B, C, D ve E</strong> olmak üzere beş farklı sınıfa ayrılır. Her sınıfın belirli bir aralığı vardır ve her sınıfın ağ ve host sayısı farklıdır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>A Sınıfı:</strong> A sınıfı IP adresleri, 0.0.0.0 ile 127.255.255.255 arasındaki IP adresleri aralığını kapsar. A sınıfı IP adreslerinde ilk bit her zaman 0'dır. Bu, IP adresinin ağ kısmının en az 8 bitlik olduğu anlamına gelir. Bu nedenle, A sınıfı IP adresleri, en az 24 bitlik bir ağ kısmı ve 8 bitlik bir host kısmı kullanır. A sınıfı IP adresleri genellikle büyük ağlar için ayrılır ve bu nedenle bir A sınıfı IP adresi, 16 milyonu aşkın hostu destekleyebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>B Sınıfı: </strong>B sınıfı IP adresleri, 128.0.0.0 ile 191.255.255.255 arasındaki IP adresleri aralığını kapsar. B sınıfı IP adreslerinde ilk iki bit her zaman 10'dur. Bu, IP adresinin ağ kısmının en az 16 bitlik olduğu anlamına gelir. Bu nedenle, B sınıfı IP adresleri, en az 16 bitlik bir ağ kısmı ve 16 bitlik bir host kısmı kullanır. B sınıfı IP adresleri, orta ölçekli ağlar için ayrılır ve bir B sınıfı IP adresi, yaklaşık 65,000 hostu destekleyebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>C Sınıfı: </strong>C sınıfı IP adresleri, 192.0.0.0 ile 223.255.255.255 arasındaki IP adresleri aralığını kapsar. C sınıfı IP adreslerinde ilk üç bit her zaman 110'dır. Bu, IP adresinin ağ kısmının en az 24 bitlik olduğu anlamına gelir. Bu nedenle, C sınıfı IP adresleri, en az 8 bitlik bir ağ kısmı ve 24 bitlik bir host kısmı kullanır. C sınıfı IP adresleri, küçük ağlar için ayrılır ve bir C sınıfı IP adresi, yaklaşık 254 hostu destekleyebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>D Sınıfı: </strong>D sınıfı IP adresleri, 224.0.0.0 ile 239.255.255.255 arasındaki IP adresleri aralığını kapsar. D sınıfı IP adreslerinde ilk dört bit her zaman 1110'dur. Bu sınıf, çoklu yayın adresleri için ayrılır. Çoklu yayın, bir mesajın birden fazla cihaza aynı anda gönderilmesini sağlayan bir iletişim yöntemidir. Bu nedenle, D sınıfı IP adresleri genellikle multicast trafiği için kullanılır. D sınıfı IP adreslerinin host kısmı, 28 bit uzunluğundadır. Bu nedenle, D sınıfı IP adresleri 2^28 veya yaklaşık 268 milyon farklı multicast adresini destekleyebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>E Sınıfı: </strong>E sınıfı IP adresleri, 240.0.0.0 ile 255.255.255.255 arasındaki IP adresleri aralığını kapsar. E sınıfı IP adreslerinde ilk beş bit her zaman 11110'dur. Bu sınıf, özel amaçlı kullanımlar için ayrılır. E sınıfı IP adresleri, genellikle deneyler, araştırmalar ve gelecekteki protokoller için ayrılır. Bu sınıfın kullanımı oldukça sınırlıdır ve internet protokolünde pek kullanılmaz. E sınıfı IP adreslerinin host kısmı 24 bit uzunluğundadır. Bu nedenle, E sınıfı IP adresleri 2^24 veya yaklaşık 16 milyon farklı özel amaçlı IP adresini destekleyebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":6259,"width":"1156px","height":"299px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/gg.png?w=1024" alt="" class="wp-image-6259" style="width:1156px;height:299px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Private Ip adreslerine ise başka bir makalede değineceğiz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Umarım faydalı olmuştur. - I hope it was useful.</strong></p>
<!-- /wp:paragraph -->
