---
layout: post
title: Windows 10 internet simgesi yok, açılmıyor, disable
date: 2022-09-03 23:37
author: theguler
comments: true
categories: [Fix - Troubleshooting]
---
<!-- wp:image {"id":4245,"width":540,"height":310,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/wifi-error.jpg?w=1024" alt="" class="wp-image-4245" width="540" height="310" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Wi-Fi simgesi veya Kablolu simgesi, bilgisayarımızdaki internet bağlantısının durumunu gösterir. Ancak bazen, bu simgeler kaybolabilir veya görünmez olabilir. Bu durum genellikle bağlantı sorunları, sürücü eksikliği veya virüsler nedeniyle ortaya çıkar. Aşağıdaki adımları izleyerek bu sorunu çözebilirsiniz:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Regedit:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\NlaSvc\Parameters\Internet
<strong>ADD</strong>: <strong>EnableActiveProbing</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4247,"width":566,"height":282,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/enabled_probing.png?w=1002" alt="" class="wp-image-4247" width="566" height="282" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":4249,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/disabled_network.png?w=960" alt="" class="wp-image-4249" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":4256,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/enabled_conn-1.png?w=633" alt="" class="wp-image-4256" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Kolaylıklar dilerim. – I wish everyone good luck.</strong></p>
<!-- /wp:paragraph -->
