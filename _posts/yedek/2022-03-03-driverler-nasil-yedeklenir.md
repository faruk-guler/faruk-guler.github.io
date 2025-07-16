---
layout: post
title: Programsız driverler nasıl yedeklenir
date: 2022-03-03 18:46
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:paragraph -->
<p>Bilgisayarınızı ve sunucunuzu sıfırlamadan öncen önce Network, Grafik, Donanım vs gibi önemli driverların yedeklenmesi tavsiye edilmektedir</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu sayede bilgisayarınızdaki bütün driverlari yedekleyebilir ve bu yedeği kullanarak geri yükleyebilirsiniz. ayrıca tüm ağınızdaki ve kurumunuzdaki diğer makinelere bu almış olduğunuz yedek driverleri yükleyerek zaman tasarrufu yapabilirsiniz</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Önce nereye yedekleme yapacağınızı belirlemeniz gerekiyor. Örneğin masaüstünde "driverbackup" diye bir klasör oluşturup oraya yedekleme yapmak istiyorum.&nbsp;Komut sistemi veya Powershell konsolu yönetici haklarıyla çalıştırılarak aşağıdaki komutu yazmam yeterli.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>PS &amp; CMD:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre id="block-212c4770-1090-40f9-a3aa-882bb19bd474" class="wp-block-preformatted">dism /online /export-driver /destination:"C:\Users\faruk\Desktop\driverbackup"</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":2223,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/bckp.png?w=1024" alt="" class="wp-image-2223" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
