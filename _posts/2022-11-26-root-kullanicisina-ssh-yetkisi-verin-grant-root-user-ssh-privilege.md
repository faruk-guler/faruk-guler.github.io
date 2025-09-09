---
layout: post
title: Root kullanıcısına SSH Yetkisi verin
date: 2022-11-26 21:52
author: theguler
comments: true
categories: [Linux / Unix]
---
<!-- wp:image {"id":3705,"width":460,"height":287,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/root.jpg?w=800" alt="" class="wp-image-3705" width="460" height="287" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Sunucuya&nbsp;root kullanıcısı ve şifresi ile&nbsp;bağlanmak için root kullanıcısına bir şifre belirlemek gerekir.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo passwd root</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Sonra sunucuya root ile girişe izin verilmelidir. Bunun için <strong>sshd_config </strong>dosyasını düzenleyeceğiz.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo nano /etc/ssh/sshd_config</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":5646,"width":589,"height":374,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/configfile.png?w=989" alt="" class="wp-image-5646" width="589" height="374" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>"PermitRootLogin"</strong> ile başlayan satırı bulup <strong>"PermitRootLogin yes" </strong>şeklinde değiştireceksiniz. Bu işlemlerden sonra <strong>sshd ve <strong>ssh </strong> </strong>servisini yeniden başlatın.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo service sshd restart</strong>
<strong>sudo service ssh restart</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Artık sunucunuza direkt <strong>"root" </strong>kullanıcısı ve şifresi ile SSH bağlantısı üzerinden giriş yapabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
