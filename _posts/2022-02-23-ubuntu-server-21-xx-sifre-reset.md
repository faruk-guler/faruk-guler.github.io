---
layout: post
title: Ubuntu Server Root Password Resetting
date: 2022-02-23 23:00
author: theguler
comments: true
categories: [Linux / Unix]
---
<!-- wp:image {"id":1950,"width":"386px","height":"auto","aspectRatio":"1.502824858757062","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/password.webp?w=600" alt="" class="wp-image-1950" style="aspect-ratio:1.502824858757062;width:386px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Ubuntu</strong>&nbsp;Server şifrenizi unuttunuz diyelim ne yapmanız gerekiyor bu gün sizlere bundan bahsetmek istiyorum. Unutulan şifreyi ubuntu ve diğer linux dağıtımlarında sıfırlamak için yapmanız gereken ufak bir kaç işlem vardır. burada <strong>Ubuntu Server 21.xx </strong>versiyonu test edeceğiz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1979,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/u1.png?w=783" alt="" class="wp-image-1979" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>bu işlemi yapabilmek için öncelikle server' in konsol ekranında olanız gerekirki reboot edebilelim.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>sistemi yeniden başlatıyoruz. yeniden başlama esnasında&nbsp;<strong>"Shift" tuşuna</strong>&nbsp;basıyoruz ve&nbsp;<strong>grub</strong>&nbsp;ekranında 'Advanced options for Ubuntu' seçelim.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1981,"width":"580px","height":"330px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/u2.png?w=769" alt="" class="wp-image-1981" style="width:580px;height:330px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>(<strong>recovery mode</strong>) seçeneğiyle devam edelim.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1983,"width":"601px","height":"362px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/u3.png?w=674" alt="" class="wp-image-1983" style="width:601px;height:362px" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":1985,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/u4.png?w=823" alt="" class="wp-image-1985" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>root</strong> parametresi ile devam ediyoruz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1986,"width":"625px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/u5.png?w=746" alt="" class="wp-image-1986" style="width:625px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>görüldüğü gibi bakım modu kısmında Konsola düşmüş durumdayız, konsol üzerinde <strong>Root ve Faruk </strong>kullanıcısını resetlemek istiyorum. komutları uygulayıp makineyi restart ediyoruz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>CLI:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre id="block-212c4770-1090-40f9-a3aa-882bb19bd474" class="wp-block-preformatted">mount -o remount,rw /<br>passwd root<br>passwd faruk<br>passwd andrean<br>reboot</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
