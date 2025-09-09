---
layout: post
title: Apply and Block a GPO to specific user, group, or computers
date: 2022-04-02 01:37
author: theguler
comments: true
categories: [Windows Group Policy GPO]
---
<!-- wp:image {"id":1155,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/gpo_logo.jpg?w=439" alt="" class="wp-image-1155" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Belirli (Spesifik) bir GPO'nun  belirli kullanıcılara, gruplara veya bilgisayarlara uygulanmasını engellemenin veya izin vermenin birçok yolu vardır . <strong>"Item-Level Targeting, Security Filtering, or WMI Filtering"</strong> gibi.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>There are many ways to prevent or allow a specific (Specific) GPO from being applied to specific users, groups or computers. Such as <strong>"Item-Level Targeting, Security Filtering, or WMI Filtering"</strong></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Bir grubun üyelerine GPO uygulanmasını engelle:</strong></h2>
<!-- /wp:heading -->

<!-- wp:image {"id":8162,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/add_gr.png?w=1024" alt="" class="wp-image-8162" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":8163,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/add_gr2.png?w=723" alt="" class="wp-image-8163" /></figure>
<!-- /wp:image -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>İlk olarak, Grup İlkesi Yönetim Konsolu'nu <strong>(GPMC)</strong>  başlatın.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Sol bölmeden değiştirmek istediğiniz GPO'yu bulun ve tıklayın.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Ardından, ayrıntılar bölmesinden <strong>Delegation</strong> sekmesine tıklayın.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Advanced'e tıklayın.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Grup veya kullanıcı adları listesi altında Ekle'ye tıklayın.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Ardından, dileğiniz <strong>Kullanıcı, Bilgisayar veya Grupları</strong> listeleyin. <strong>(Object&nbsp;Typs)</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Şimdi üyelerinin GPO'yu uygulamasını engellemek istediğiniz <strong>Grubun</strong> adını yazın ve Tamam'a tıklayın. <strong>(örnek: Sales)</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Etki alanında bulunan grupların listesine göz atmak için Gelişmiş'i de tıklayabilirsiniz.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Ardından, Grup veya kullanıcı adları listesinden Grubu seçin ve hem &gt;<strong> Read/Oku</strong> için <strong>"Allow/İzin Ver" </strong>kutucuğunu seçin.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Apply group policy/GPO Uygula</strong> grup ilkesi için <strong>"Deny/Reddet" </strong>sütunundaki kutuyu seçin.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Son olarak, Tamam &gt; tıklayın.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image {"id":8179,"width":"612px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/bg_adv.png?w=718" alt="" class="wp-image-8179" style="width:612px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Not 1:</strong></h2>
<!-- /wp:heading -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Başlangıçta atanan Read yetkisi için <strong>Allow </strong>iznini kaldır<strong>MAMALI</strong>sınız.<strong> </strong>Çünkü eğer Allow iznini kaldırırsanız veya doğrudan <strong>Read</strong> için <strong>DENY</strong> tanımlarsanız, ilgili kullanıcı veya kullanıcılar GPO nesnesini okuma yapamayacakları için kendi üzerlerinde tanımlanan filtrelemeyi hiç görmeyeceklerdir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Sadece ilgili kullanıcı veya kullanıcı grubu için <strong>"Apply Group Policy" </strong>izni karşısındaki <strong>"DENY" </strong>seçeneğini işaretlemeniz ise gpo'nun hiç uygulanmayıp reddedileceği anlamına gelir.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Bu adımlarda , belirttiğiniz kullanıcı veya kullanıcı grubu GPO'nun içeriğini okuyamayacak ancak üzerlerinde tanımlanan <strong>filtrelemeyi</strong> <strong>(allow/deny)</strong> uygulayabilecektir. </p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Not 2:</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>GPO'yu yalnızca sizin belirttiğiniz gruplarla kısıtlamak için kimliği doğrulanmış <strong>(authenticated users) </strong>tüm kullanıcılara ve bilgisayarlara verilen varsayılan izni kaldırmalısınız. Ama GPO, Kullanıcı ayarları içeriyorsa ve <strong>(authenticated users)</strong> grubu kaldırılırsa ve yalnızca kullanıcı hesaplarını içeren bir güvenlik grubu kullanılarak yeni güvenlik filtrelemesi eklenirse, GPO uygulana<strong>MAYA</strong>yabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
