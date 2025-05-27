---
layout: post
title: Kerberos Nedir? - What is Kerberos?
date: 2022-05-10 20:08
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":3054,"width":496,"height":310,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/kerberos.png?w=574" alt="" class="wp-image-3054" width="496" height="310" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Kerberos, </strong>ağ tabanlı bir kimlik doğrulama protokolüdür. İlk olarak MIT (Massachusetts Institute of Technology) tarafından 1980'lerde geliştirilmiştir ve daha sonra IETF (Internet Engineering Task Force) tarafından standartlaştırılmıştır. Kerberos, kullanıcıların kimliklerinin doğrulanmasına ve ağ hizmetlerine güvenli bir şekilde erişmelerine olanak tanır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Kerberos, adını Yunan mitolojisinden alır. Kerberos, üç başlı bir köpektir ve Hades'in yeraltı dünyasını korumak için görevlendirilmiştir. Kerberos protokolü, ağ güvenliği için bir köpek gibi görev yapar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Kerberos, aşağıdaki bileşenlerden oluşur:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Kullanıcı: Kullanıcılar, ağ kaynaklarına erişmek istediklerinde Kerberos kimlik bilgilerini kullanırlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Sunucu: Sunucular, ağ kaynaklarına erişim sağlamak için kullanıcıların kimliklerini doğrularlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Kerberos sunucusu: Kerberos sunucusu, kullanıcıların kimliklerini doğrular ve ağ kaynaklarına erişim izni verir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Kullanıcı istemcisi: Kullanıcı istemcisi, kullanıcıların kimliklerini doğrulamak için Kerberos sunucusuyla iletişim kurar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Veritabanı sunucusu: Veritabanı sunucusu, Kerberos kimlik bilgileri ve diğer verileri saklar.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Kerberos, aşağıdaki adımları takip eder:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Kullanıcı, ağ kaynaklarına erişmek istediğinde, Kerberos kimlik bilgilerini kullanır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Kullanıcı istemcisi, Kerberos sunucusundan bir bilet talep eder.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Kerberos sunucusu, kullanıcının kimliğini doğrular ve bir bilet verir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Kullanıcı istemcisi, bilet ile birlikte sunucuya istek gönderir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Sunucu, biletin doğruluğunu kontrol eder ve kullanıcının kimliğini doğrular.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Sunucu, kullanıcının istediği kaynaklara erişim izni verir.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Kerberos, kimlik doğrulama için şifreli anahtarlar kullanır. Kullanıcı, Kerberos sunucusundan bir anahtar isteyebilir ve anahtar, kullanıcının şifresini kullanarak şifrelenir. Kullanıcının bu anahtarı alması, ağ kaynaklarına erişmesine izin verir. Anahtar, kullanıcının istekleri sırasında geçici olarak kullanılır ve her seferinde yenisi oluşturulur.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Kerberos,</strong> ayrıca ağ trafiğinin şifrelenmesiyle güvenliği artırır. Kullanıcıların şifreleri de şifrelenir, bu da saldırganların kullanıcı şifrelerini ele geçirmelerini zorlaştırır. Kerberos ayrıca zaman sınırlamaları ve oturum süresi gibi yönetim özellikleri sunar, bu da yöneticilerin ağ güvenliğini daha da artırmasına olanak tanır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Kerberos, birçok işletme ve kuruluş için özellikle yararlıdır. Örneğin, büyük bir kuruluşun birçok farklı bilgisayarı ve kullanıcısı olabilir. Kerberos, her kullanıcının doğrulanması ve kimliklerinin doğru bir şekilde yönetilmesi için merkezi bir yönetim sağlar. Ayrıca, farklı birimler arasında paylaşılan ağ kaynaklarına güvenli bir şekilde erişim sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Kerberos, ayrıca hizmet sağlayıcılar ve uygulama geliştiricileri için de yararlıdır. Kerberos, uygulamaların doğrulanmasını ve güvenli bir şekilde erişim sağlamasını sağlayarak, ağ güvenliği açısından bir katman daha ekler. Örneğin, bir web uygulaması Kerberos kimlik doğrulamasını kullanarak, kullanıcıların web sitesine güvenli bir şekilde erişim sağlamasına olanak tanır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sonuç olarak, Kerberos, ağ güvenliği için önemli bir protokoldür. Kimlik doğrulama, şifreleme ve zaman sınırlamaları gibi özellikleri sayesinde, saldırganların ağ kaynaklarına erişmesini önler. Kuruluşlar, kullanıcılar ve uygulama geliştiricileri için yararlıdır ve birçok kuruluş için güvenli ağ erişimi sağlar.</p>
<!-- /wp:paragraph -->
