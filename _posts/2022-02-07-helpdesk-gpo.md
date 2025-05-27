---
layout: post
title: Helpdesk GPO Windows Uzaktan Yardım
date: 2022-02-07 20:08
author: theguler
comments: true
categories: [Windows Group Policy GPO]
---
<!-- wp:image {"id":1474,"width":533,"height":244,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/windows-1.png?w=1024" alt="" class="wp-image-1474" width="533" height="244" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Helpdesk hizmeti vermek için birçok araç mevcuttur ve bunlar arasında MECM Remote Control ve Windows Remote Assistance gibi araçlar da yer almaktadır. Bu yazıda, Windows Remote Assistance aracının kullanımı incelenecektir. Bu araç, kullanıcının oturumunu kapatması gerekmeden bağlanılmasını sağlar. Kullanıcının açtığı oturuma bağlanabilir, oturumu yönetebilir ve kendi mesajlaşma ara yüzünden kullanıcıya mesaj gönderebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>"<strong>Computer configuration &gt; Policies &gt; Administrative Templates &gt; System</strong>" bölümünde yer alan “<strong>Remote Assistance</strong>” a gidelim.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1996,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/h1.png?w=1024" alt="" class="wp-image-1996" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Buradan  “<strong>Configure Offer Remote Assistance</strong>” politikasını seçelim.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu politika üzerinden (3) üç ayar yapacağız.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Öncelikle politikamızı aktif hale getiriyoruz.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Yardım ekibinin bilgisayara bağlanabilmesini sağlıyoruz.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Kimlerin bağlanabileceğini kişi yada grup seçiyoruz.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image {"id":1997,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/h2.png?w=1024" alt="" class="wp-image-1997" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Uzak bağlantı araçları bir port ya da uygulama üzerinden bağlanır. Bu sebeple güvenlik duvarında da bazı ayarlar yapmak gerekiyor.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Aynı politikada "<strong>Computer Configuration &gt; Policies &gt; Windows Settings &gt; Security Settings &gt; Windows Firewall and Advanced Security</strong>" bölümüne geliyoruz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu bölümde inbound kurallar tanımlamamız gerekiyor. Bu kurallar uygulamalara ve port a yönelik olmalıdır. Sırasıyla aşağıdaki kuralları tanımlıyoruz:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>İzin vermemiz gereken (4) adet  program ve port kuralları:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>%systemroot%\system32\sessmgr.exe</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>%systemroot%\PCHEALTH\HELPCTR\Binaries\helpsvc.exe</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>%systemroot%\system32\Raserver.exe</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Port ise TCP 135 portudur.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image {"id":1999,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/h3.png?w=1024" alt="" class="wp-image-1999" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":2003,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/h4.png?w=1024" alt="" class="wp-image-2003" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Son olarak "<strong>Computer Configuration &gt; Policies &gt; Windows Settings &gt; Security &gt; Local Policies</strong>"&nbsp; e geliyoruz. <strong>Secuirty Options </strong>ı seçiyoruz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Açılan politikalardan User Account Control: <strong>Allow UIAccess applications to prompt for elevation without using the secure desktop</strong>&nbsp; politikasını aktif ediyoruz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":2006,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/h5.png?w=1024" alt="" class="wp-image-2006" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>ilgili GPO' dosyasını ilgili OU altına link ettikten sonra tüm clientler' in policy almasını bekleyelim. yada tetikleyelim. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Artık yönetici ya da destek ekibimizde yer alan personel kendi makinelerinden group ilkesini alan makinelere bağlanabilirler.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Uzak bağlantı aracını açmak için arama yada çalıştır bölümüne <strong>msra.exe /offerra</strong> yazabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":2010,"width":443,"height":335,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/h7.png?w=729" alt="" class="wp-image-2010" width="443" height="335" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":2008,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/h6.png?w=997" alt="" class="wp-image-2008" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Umarım faydalı olmuştur. - I hope it was helpful.</strong></p>
<!-- /wp:paragraph -->
