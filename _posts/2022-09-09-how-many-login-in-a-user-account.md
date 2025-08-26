---
layout: post
title: Bir kullanıcı etki alanı içinde aynı anda kaç makineden giriş yapabilir ?
date: 2022-09-09 20:46
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:image {"id":890,"width":470,"height":230,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ads.jpeg?w=1024" alt="" class="wp-image-890" width="470" height="230" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Herhangi bir NAC kuralı ile müdahale edilmediği sürece Varsayılanda herhangi bir sınır yoktur. </strong>Etkin bir oturum açmalar AD kaynağını kalıcı olarak işgal etmez ve "oturum açma durumları" için herhangi bir merkezi izleme sistemi yoktur.<br>Etki alanı denetleyicisi yalnızca bir Kerberos oturum açma bileti verir ve bunu sonra unutur. (Yeni alınan biletler eskileri geçersiz kılmaz.)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Eğer (Gezici Profil) kullanıyorsanız , o zaman bu sınır (1) olacaktır. çünkü bir kullanıcının dosya sunucusundaki "merkezi" profili aynı anda yalnızca bir bilgisayar tarafından kullanılabilir ve ek bilgisayarlardaki oturum açma işlemleri geçici olarak hataya düşecektir.<br>Ayrıca; (gezici profiller) varsayılan olarak etkin değildir ve Microsoft genellikle bunun kullanılmasını önermez.)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Default has no limits unless tampered with by any NAC rule.</strong> Active logins do not occupy the AD resource permanently and there is no central monitoring system for "login sessions".<br>The domain controller simply issues a Kerberos login ticket and then forgets it. (Newly purchased tickets do not invalidate old ones.)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>If you are using (Roaming Profile), then this limit will be (1). because a user's "central" profile on the file server can only be used by one computer at a time, and logins on additional computers will fail temporarily.<br>Moreover; (roaming profiles) are not enabled by default and Microsoft generally does not recommend using it.)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Yararlı Olması Dileğiyle. – Best Regards.</strong></p>
<!-- /wp:paragraph -->
