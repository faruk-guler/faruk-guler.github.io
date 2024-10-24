---
layout: post
title: The service did not respond to the start or control request in a timely fashion
date: 2022-10-11 21:25
author: theguler
comments: true
categories: [Fix - Troubleshooting]
---
<!-- wp:image {"id":5097,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/error1053.jpg?w=501" alt="" class="wp-image-5097" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Microsoft Windows Service Control Manager is a mechanism that controls the states of Windows services or Apps (starting, stopping, pausing). However, certain configurations, technical limitations, missing DLL files , or performance issues are subject to a timeout that forces them to cancel and shut down. this time By default, it is 30,000 milliseconds (30 seconds). If the service you are trying to start takes too long to respond, the job will be (kill) cancelled. and it will return the Error "<strong>Error 1053: The service did not respond to the start or control request in a timely fashion</strong>".<br>Let's get rid of this problem with <strong>"Regedit"</strong>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>&amp;</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Microsoft Windows Service Control Manager, Windows uygulama ve hizmetlerin (başlatılması, durdurulması, duraklatılması) durumlarını denetleyen bir mekanizmadır. Ancak, belirli yapılandırmalar, eksik DLL dosyaları, teknik kısıtlamalar veya performans sorunları, onları iptal etmeye ve kapanmaya zorlayan bir zaman aşımı süresine tabidir. bu süre Varsayılan olarak, 30.000 milisaniye (30 saniye) dir. Başlatmaya çalıştığınız hizmetin yanıt vermesi çok daha uzun sürerse, iş (kill)iptal edilecektir. ve "<strong>Error 1053: The service did not respond to the start or control request in a timely fashion</strong>" Hatasını döndürecektir.<br>gelin bu sorundan <strong>"Regedit" </strong>sayesinde kurtulalım.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5105,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/timeout.png?w=1024" alt="" class="wp-image-5105" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Open <strong>New &gt; DWORD (32bit) Value</strong> and create new key. Name the key "ServicesPipeTimeout" and set the value to (300000). If you have the value, set it to (<strong>300000</strong>).</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>New &gt; DWORD (32bit) Value </strong>öğesini açıp yeni anahtar oluşturun. Anahtarı "ServicesPipeTimeout" olarak adlandırın ve değeri (300000) olarak ayarlayın. Eğer değer sizde mevcutsa bunu (<strong>300000</strong>) olarak düzenleyin.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Reg:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control</strong>\
<strong>ServicesPipeTimeOut</strong>

Add: ServicesPipeTimeOut 300000 (5 minute)
or Edit: ServicesPipeTimeOut 300000 (5 minute)</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla – Best Regards</strong></p>
<!-- /wp:paragraph -->
