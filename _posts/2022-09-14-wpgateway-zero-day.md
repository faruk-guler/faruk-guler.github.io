---
layout: post
title: WPGateway Zero-Day 280.000’den Fazla Web Sitesini Etkiliyor.
date: 2022-09-14 21:07
author: theguler
comments: true
categories: [Hacking - Security]
---
<!-- wp:image {"id":1816,"width":463,"height":260,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/wordpress.jpg?w=778" alt="" class="wp-image-1816" width="463" height="260" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>WPGateway Zero-Day, WordPress tabanlı sitelerin bir güvenlik açığına sahip olan bir eklentisine verilen addır. Bu güvenlik açığı, WPGateway eklentisinin sürüm 1.0.5.3 ve öncesindeki sürümlerde bulunmaktadır. Bu güvenlik açığı, saldırganların siteye kötü amaçlı kod enjekte etmesine ve siteyi ele geçirmesine izin verir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu güvenlik açığına sahip olan WPGateway eklentisi, siteye gönderilen form verilerinde yeterli veri doğrulaması yapmamaktadır. Bu nedenle, saldırganlar siteye özel olarak hazırlanmış bir form göndererek, kötü amaçlı kod enjekte edebilirler. Bu kod, site üzerinde farklı işlemler yapabilir, kullanıcıların bilgilerini çalabilir ya da sitenin kontrolünü ele geçirebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>WPGateway Zero-Day, WordPress tabanlı sitelerin güvenliği için önemli bir tehdittir. Bu nedenle, site sahipleri, WPGateway eklentisinin sürümünü güncellemeli ve güvenlik açığının kapatıldığı sürüme geçmelidir. Ayrıca, site sahiplerinin, güvenlik açıklarını tespit etmek ve sitelerini güvence altına almak için güvenlik taraması yapmaları da önerilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong> Loglarla tespit etmek için:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">“https:///site.com<strong>//wp-content/plugins/wpgateway/wpgateway-webservice-new.php?wp_new_credentials=1” </strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
