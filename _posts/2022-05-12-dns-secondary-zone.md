---
layout: post
title: DNS Failover Secondary Zone Kurulumu
date: 2022-05-12 22:35
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":2765,"width":366,"height":205,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dns_nedir.webp?w=731" alt="" class="wp-image-2765" width="366" height="205" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":3103,"width":608,"height":195,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dns1.png?w=1010" alt="" class="wp-image-3103" width="608" height="195" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Yeni bir Server ve üzerine DNS rolü de  dahil kurulumu yapılarak domaine dahil edilir.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":3115,"width":774,"height":247,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dns4-1.png?w=1024" alt="" class="wp-image-3115" width="774" height="247" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Eski DNS server üzerinde DNS Zone Transfer aktif hale getirilir. <strong>(eski dns serverim ANATOLIA)</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":3107,"width":550,"height":198,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dns5.png?w=892" alt="" class="wp-image-3107" width="550" height="198" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Yeni kurup üzerinde DNS rolünü aktif ettiğim <strong>ANGORA</strong> server üzerinde <strong>Forward Lookup Zone &gt; New Zone &gt; Secondary Zone &gt; guler.com(yedeklenmesini istediğim zone) &gt; ip adress veya hostname &gt; Tamam- Finish</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu işlem sonucunda yeni kurduğumuz <strong>ANGORA</strong> sunucunuz üzerine eski sunucunuzdaki zone kayıtlarınızın transfer olduğunu göreceksiniz, bu server Secondary<strong>(yedek) </strong>olduğu için burada kayıt oluşturamaz ve bazı özellikleri ise kullanamazsınız.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
