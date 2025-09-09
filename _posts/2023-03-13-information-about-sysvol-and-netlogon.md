---
layout: post
title: Some information about SYSVOL and NETLOGON
date: 2023-03-13 21:03
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:image {"id":8466,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/sysvol-netlogon-1.png?w=1024" alt="" class="wp-image-8466" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>"SYSVOL" ve "NETLOGON" dizinleri, Windows etki alanı denetleyicileri üzerinde tutulan özel paylaşılan dizinlerdir. Bu dizinler, etki alanı politikaları, oturum açma komut dosyaları ve diğer etki alanı ilişkilendirilmiş dosyaları içerir.</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>"SYSVOL" Dizini Yolu:</strong><ul><li>Varsayılan Yol: <code><strong>C:\Windows\SYSVOL</strong></code></li></ul></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>"NETLOGON" Dizini Yolu (SYSVOL Dizini Altında)</strong><ul><li>Varsayılan Yol: <code><strong>C:\Windows\SYSVOL\sysvol\<code>guler.com</code>\scripts</strong></code></li></ul></li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>NETLOGON</strong>&nbsp;Paylaşımı, Etki Alanı denetleyicisindeki&nbsp;<strong>Netlogon</strong>&nbsp;adlı bir klasör değildir .</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>sysvol klasörüne girip netlogon klasörünü ararsanız, bunu sysvol altında bulamazsınız çünkü Netlogon bir klasör değildir. scripts klasörünün paylaşım adının Netlogon olarak görünmesidir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Unutmayın ki, Sysvol klasörü altındaki Script klasörü Netlogon paylaşımı görevi görmektedir.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":9048,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/netlogon.png?w=984" alt="" class="wp-image-9048" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Not: Bu dizinlere erişim, yalnızca etki alanı yöneticileri veya belirli izinlere sahip kullanıcılar tarafından yapılmalıdır. Bu dizinlerle çalışmadan önce dikkatli olmalısınız çünkü yanlışlıkla bu dosyalara zarar verebilirsiniz. Ayrıca, bu dizinler içindeki dosyaların doğru şekilde yapılandırılması ve kullanılması gerekmektedir. Bu dizinlerin içeriği, etki alanı politikalarının ve oturum açma komut dosyalarının düzgün çalışmasını sağlamak için önemlidir.</p>
<!-- /wp:paragraph -->
