---
layout: post
title: Microsoft AD user or group based Fine-Grained Password Policies
date: 2022-04-21 19:31
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:image {"id":2270,"width":390,"height":213,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ad.jpg?w=704" alt="" class="wp-image-2270" width="390" height="213" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Fine-Grained Password Policy, </strong>Active Directory ortamında kullanıcı bazlı spesifik parola ve hesap kilitleme ayarlarının yapılmasına imkan veren önemli bir yapıdır. Bu yapı sayesinde, özellikle büyük şirketlerde birden fazla kullanıcının yönetimi sırasında parola politikalarının daha ayrıntılı bir şekilde yapılandırılması mümkündür.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Örneğin, bir şirketin müdürleri için daha az esnek bir parola ve hesap kilitleme politikası belirleyerek, daha yüksek bir güvenlik seviyesi sağlayabilirken, çalışanlar için daha kısıtlı ayarlar yaparak kullanıcı deneyimini artırabilirsiniz. Böylece, şirket içindeki farklı kullanıcı gruplarına özel olarak uyarlanmış parola politikaları oluşturarak, güvenliği artırmak ve kullanıcı deneyimini geliştirmek mümkün olur.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Fine-Grained Password Policy'nin avantajlarından biri de, sadece kullanıcı bazlı değil, aynı zamanda kullanıcı gruplarına da detaylı parola ayarları yapabilme imkanı sağlamasıdır. Bu özellik sayesinde, farklı departmanlar veya ekipler için farklı parola politikaları belirleyebilirsiniz. Örneğin, mali işler departmanı için daha yüksek bir güvenlik seviyesi gerektiren bir parola politikası belirleyerek, IT departmanı için daha esnek bir politika belirleyebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sonuç olarak, Fine-Grained Password Policy'nin kullanımı, Active Directory ortamında parola politikalarının daha ayrıntılı bir şekilde yapılandırılmasını ve farklı kullanıcı gruplarına özel olarak uyarlanmasını mümkün kılar. Bu sayede, güvenliği artırarak şirket içindeki bilgi güvenliğini korumak ve kullanıcı deneyimini geliştirmek mümkün olur.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":2933,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/1-1.png?w=1024" alt="" class="wp-image-2933" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":2935,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/22.png?w=1024" alt="" class="wp-image-2935" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":2936,"width":626,"height":324,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/33.png?w=1024" alt="" class="wp-image-2936" width="626" height="324" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>1) <strong>Name</strong>: oluşturulacak password settings objesinin adını belirle</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>2) <strong>Precedence</strong>: Password Settings objesinin öncelik değerini belirle</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>3) <strong>Protect: </strong>policy i yanlışlıkla silinmeye karşı koru</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>4)<strong> Password must meet complexity requirements:</strong> şifrenin karmaşık olup olmayacağının belirle</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>5) <strong>Enforce minimum password age: </strong>kullanıcı şifrelerine minimum süre atanmasını zorunlu hale getir</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>6) <strong>Enforce maximum password age: </strong>kullanıcı şifrelerine maksimum yaşam süresi atanmasını zorunlu hale getir</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>7) <strong>Enforce account lockout policy: </strong>hesap kilitlenme kurallarını aktif et</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>8) <strong>Add:</strong> Policy nin uygulanacağı grubu ekle</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
