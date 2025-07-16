---
layout: post
title: Active Directory Tiering Model Nedir? Örnek Yapı
date: 2024-04-22 22:26
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":11370,"width":"629px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/tiers-active-directorys-5.jpg?w=1024" alt="" class="wp-image-11370" style="width:629px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Active Directory Tiering Model,</strong> Active Directory (AD) ortamında güvenlik ve erişim kontrolü için kullanılan bir yöntemdir. Bu model, kullanıcıların ve sistem yöneticilerinin belirli katman/seviyelerdeki yetkilere erişmesini <strong>***[sadece kendi katmanı , alt katmanlar vb.]</strong> sağlar. bu katman/seviyeler arasında erişim kontrolleri ve izinler sağlayarak, veriye erişimi sınırlamayı temel alır. Bu sayede, kritik sistemlere erişimi olan bu hesapları daha sıkı bir şekilde kontrol ederken, olası tehditlere karşı korumaya yardımcı olur.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Genellikle Tier 0, Tier 1 ve Tier 2 [xx... ] gibi seviyelerden oluşur.</strong></h2>
<!-- /wp:heading -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li><strong>Tier 0 (Yüksek Güvenlik Seviyesi)</strong>:<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Tier 0, en üst seviyedeki kritik sistemlere ve verilere erişimi olan kullanıcıları ve rolleri içerir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Bu seviye, genellikle Domain Controllerlar, CA Server, Veri tabanları ve benzeri kritik altyapı sistemlerini yöneten hesapları kapsar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Tier 0 hesapları, sadece özel durumlarda ve güvenlik kontrollerinden geçerek kullanılmalıdır.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Tier 1 (Orta Seviye Güvenlik)</strong>:<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Tier 1, sunucu ve uygulama yönetimi gibi önemli sistemlere erişimi olan kullanıcıları ve rolleri içerir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Bu seviyedeki hesaplar, genellikle sunucu yönetimi, uygulama yönetimi gibi rolleri kapsar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Tier 1 hesapları, Tier 0'dan daha yaygın olarak kullanılabilir, ancak yine de dikkatli bir şekilde kontrol edilmelidir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Tier 2 (Düşük Güvenlik Seviyesi)</strong>:<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Tier 2, genellikle masaüstü kullanıcıları ve diğer genel kullanıcılar için ayrılmıştır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Bu seviyedeki hesaplar, genellikle ofis uygulamalarına, dosya paylaşımına ve benzeri kaynaklara erişim sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Tier 2 hesapları, daha geniş bir kullanıcı kitlesine hizmet vermek için kullanılır, ancak yine de güvenlik politikalarına uygun şekilde yönetilmelidir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Örnek Yapı:</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">                 <strong>Realm of AD</strong><br>        <strong>-----------------------------</strong><br>        <strong>| </strong>         <strong>Tier 0</strong>           <strong>|</strong><br>        <strong>-----------------------------</strong><br>        |  -AD Domain Controllers   |<br>        |  -AD Certificate          |<br>        |  -Authority (CA)          |<br>        |  -Critical Services       |<br>        |  -                        |<br>        |                           |<br>        |  Allow Access From:       |<br>        |  - Tier 0                 |<br>        -----------------------------<br>                   /\<br>                   ||<br>                 ╔════╗<br>                ║<strong>Denied!</strong>║<br>                 ╚════╝ <br>                   ||<br>                   \/<br>        <strong>-----------------------------</strong><br>        <strong>|</strong>          <strong>Tier 1 </strong>          <strong>|</strong><br>        <strong>-----------------------------</strong><br>        |  -Authentication Services |<br>        |  -DNS Servers             |<br>        |  -DHCP Servers            |<br>        |  -                        |<br>        |                           |<br>        |  Allow Access From:       |<br>        |  - Tier 1                 |<br>        -----------------------------<br>                   /\<br>                   ||<br>                 ╔════╗<br>                ║<strong>Denied!</strong>║<br>                 ╚════╝<br>                   ||<br>                   \/<br>        <strong>-----------------------------</strong><br>        <strong>|</strong>          <strong>Tier 2 </strong>          <strong>|</strong><br>        <strong>-----------------------------</strong><br>        |  -File and Print Servers |<br>        |  -Application Servers    |<br>        |  -Web Servers            |<br>        |  -                       |<br>        |                          |<br>        |  Allow Access From:      |<br>        |  - Tier 2                |<br>        -----------------------------</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":15296,"width":"448px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/example_ad_organization.jpeg?w=530" alt="" class="wp-image-15296" style="width:448px;height:auto" /></figure>
<!-- /wp:image -->
