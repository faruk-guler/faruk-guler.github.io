---
layout: post
title: Active Directory'de Default OU Değiştirilmesi
date: 2021-12-01 23:36
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:gallery {"linkTo":"none"} -->
<figure class="wp-block-gallery has-nested-images columns-default is-cropped"><!-- wp:image {"id":2148,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/powershell-as-admin.webp?w=1024" alt="" class="wp-image-2148" /></figure>
<!-- /wp:image --></figure>
<!-- /wp:gallery -->

<!-- wp:paragraph -->
<p>Active Directory ortamında Domain’e eklenen kullanıcı yada computers Default olarak belirlenen Container’lara düşmektedir.<br>powershell ile Objelerin bu Container’lar haricinde herhangi bir yere (OU yada Container) düşmesini istiyorsanız redirect anlamına gelen redir komutunu kullanabiliriz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Redir</strong> komutunun örnek kullanımı aşağıdaki gibidir ;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>PS:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#<strong>Bilgisayar öğelerinin default Container’ını değiştirmek için;</strong>
redircmp ou=computers,dc=guler,dc=com

<strong>#Bu komut OU değişkeninde belirtilen isime yönlendirme yapmaktadır.</strong>

<strong>#User objelerinin default container’ını değiştirmek için;</strong>

redirusr ou=kullanicilar,dc=guler,dc=com</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Sağlıcakla....</strong></p>
<!-- /wp:paragraph -->
