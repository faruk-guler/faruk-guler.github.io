---
layout: post
title: Active Directory “Protected Users” Güvenlik Grubu Nedir?
date: 2023-03-24 22:27
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":6234,"width":432,"height":494,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/protected_group.png?w=496" alt="" class="wp-image-6234" width="432" height="494" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Active Directory "Protected Users" güvenlik grubu, Windows Server 2012 R2 ve sonraki sürümlerde mevcut olan özel bir kullanıcı güvenlik grubudur. Bu güvenlik grubu, yüksek riskli hesapları korumak için tasarlanmıştır ve bazı özellikleri kısıtlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Bu özellikler şunlardır:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>NTLM kimlik doğrulamasını engeller: NTLM, eski bir kimlik doğrulama protokolüdür ve şifreleme düzeyi düşüktür. "Protected Users" grubuna dahil olan hesaplar, NTLM kullanarak kimlik doğrulaması yapamazlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Des şifreleme çözümlerini engeller: DES, Windows Server 2003 ve öncesinde kullanılan bir şifreleme algoritmasıdır ve güvenli değildir. "Protected Users" grubuna dahil olan hesaplar, DES şifreleme çözümlerini kullanarak veri şifrelemesi yapamazlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Kullanıcı hesaplarına yönelik bazı atakları engeller: "Protected Users" grubuna dahil olan hesaplar, birçok kullanıcı hesabıyla yapılan atakların hedefi olmazlar. Örneğin, bu hesaplar, parola çalma, hesap taklit etme ve pasif dinleme gibi ataklara karşı daha korunaklıdır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Kerberos bileşenlerini günceller: Kerberos, Windows Active Directory'de kullanılan bir kimlik doğrulama protokolüdür. "Protected Users" grubuna dahil olan hesaplar, Kerberos bileşenlerini otomatik olarak güncelleyerek daha güvenli bir kimlik doğrulama süreci sağlar.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Özetle, "Protected Users" grubuna dahil olan hesaplar, daha güçlü bir kimlik doğrulama süreci sağlar ve yüksek riskli hesapları korur.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Active Directory <strong>"Protected Users" </strong>grubuna dahil olan hesaplar için etkinleştirilen korumalar aşağıdaki gibidir:</strong></h2>
<!-- /wp:heading -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>NTLM kimlik doğrulaması engellenir: <strong>"Protected Users" </strong>grubuna dahil olan hesaplar, NTLM kullanarak kimlik doğrulaması yapamazlar. NTLM, eski bir kimlik doğrulama protokolüdür ve şifreleme düzeyi düşüktür. Bu koruma, daha güçlü bir kimlik doğrulama süreci sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Kerberos bileşenleri otomatik olarak güncellenir: <strong>"Protected Users"</strong> grubuna dahil olan hesaplar, Kerberos bileşenlerini otomatik olarak günceller ve daha güvenli bir kimlik doğrulama süreci sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>DES ve RC4 şifreleme çözümleri engellenir: <strong>"Protected Users"</strong>" grubuna dahil olan hesaplar, DES ve RC4 şifreleme çözümlerini kullanarak veri şifrelemesi yapamazlar. Bu şifreleme yöntemleri, güvenli değildir ve korumalı kullanıcılar grubu, daha güçlü bir şifreleme yöntemi olan AES'i kullanır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Hesap taklit etme saldırıları engellenir: <strong>"Protected Users"</strong> grubuna dahil olan hesaplar, hesap taklit etme saldırılarına karşı daha korunaklı hale gelir. Bu koruma, hesapların çalınmasını veya taklit edilmesini zorlaştırır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Kullanıcı hesaplarına yönelik bazı atakları engeller: <strong>"Protected Users"</strong> grubuna dahil olan hesaplar, birçok kullanıcı hesabıyla yapılan atakların hedefi olmazlar. Örneğin, bu hesaplar, parola çalma, hesap taklit etme ve pasif dinleme gibi ataklara karşı daha korunaklıdır.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Bu korumalar, <strong>"Protected Users"</strong> grubuna dahil olan hesaplar için varsayılan olarak etkinleştirilir ve hesaplar bu korumalardan faydalanır. Ancak, bazı durumlarda, bu korumaların etkinleştirilmesi cihazın uyumluluğunu veya performansını etkileyebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
