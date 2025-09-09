---
layout: post
title: AD DSRM (Directory Services Restore Mode) Parolasının Sıfırlanması
date: 2022-06-17 11:30
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:image {"id":2270,"width":416,"height":228,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ad.jpg?w=704" alt="" class="wp-image-2270" width="416" height="228" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Active Directory Domain Services (AD DS) Restore Mode (DSRM), bir Windows Domain Controller sunucusunda Active Directory veritabanını kurtarma işlemi için kullanılan özel bir moddur. Bu modda, yerel bir hesap olan "Administrator" hesabı, normalde etkin olmayan bir durumda olan bir yönetici hesabı haline gelir ve bu hesap, etkin dizin hizmetleri (Active Directory) rolüne sahip tüm sunucularda kullanılabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Ancak, zaman zaman DSRM parolasının sıfırlanması gerekebilir. Bunun nedeni, DSRM parolasının unutulması veya kaybolmasıdır. DSRM parolası, sunucunun Active Directory veritabanını kurtarma işlemleri sırasında kullanılan önemli bir güvenlik öğesidir. Bu parola, yalnızca sunucunun yerel Administrator hesabı tarafından bilinir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>DSRM parolasının sıfırlanması işlemi, Active Directory Restore Mode'da (DSRM) yerel bir hesap olan "Administrator" hesabı kullanılarak gerçekleştirilir. Bu işlem, sunucunun normal çalışma modunda değil, ancak DSRM'de olduğu durumlarda gerçekleştirilir.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":3473,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/dsrm.jpg?w=525" alt="" class="wp-image-3473" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>CMD:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>$ntdsutil
$set dsrm password
$reset password on server null</strong>

#eğer partner dc varsa: reset password on server *dc2.guler.com *192.168.10.25
#yeni şifreyi giriniz - please confirm new password</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Umarım faydalı olmuştur. – I hope it was useful.</strong></p>
<!-- /wp:paragraph -->
