---
layout: post
title: Group policy deploy Desktop icons
date: 2022-02-08 22:39
author: theguler
comments: true
categories: [Windows Group Policy GPO]
---
<!-- wp:image {"align":"left","id":1559,"width":718,"height":218,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image alignleft size-large is-resized"><img src="https://farukguler.com/assets/post_images/0-1.png?w=1024" alt="" class="wp-image-1559" width="718" height="218" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Bugün onlarca forumda sorulan ve nasıl yapılacağı tam olarak bilinmeyen <strong>(2) </strong>konuya değineceğim. </p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>Domain ortamında GPO ile .REG (regedit) dosyası dağıtmak</strong> <strong>-</strong> <strong>Group policy REG file deploy</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>GPO ile Masaüstü simgeleri oluşturmak</strong> <strong>- Creating desktop icons Group policy</strong></li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>ilgili</strong> <strong>REG' i indirmek için:</strong> <a rel="noreferrer noopener" href="https://github.com/faruk-guler/JumpTools" target="_blank">https://github.com/faruk-guler/JumpTools</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Kısaca Domain ortamında GPO ile .REG (regedit) dosyası <strong>deploy ederek</strong>, Masaüstü simgeleri(iconları) <strong>oluşturacağız.</strong> iki işlemi tek yazıda açıklamam gerekirse;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>İlk olarak yeni bir GPO oluşturalım. <strong>example: Masaustu_simgeleri2022</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Edit diyerek <strong><em>User Configuration</em>&nbsp;\ <em>Windows Settings</em>&nbsp;\&nbsp;<em>Scripts (Logon/Logoff</em> </strong>alanına gidelim.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1561,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/s1.png?w=1024" alt="" class="wp-image-1561" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":1562,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/s0.png?w=1024" alt="" class="wp-image-1562" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Userler oturum açtığında uygulanacak bir GPO olduğu için <strong>Logon </strong>kısmını editliyorum ve yukarıda göründüğü şekilde dolduruyorum.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Script Name: </strong>regedit.exe<br><strong>Script Parameters:</strong> /S regfile_Name.reg</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>/S </strong>parametresi (Silent) yani kullanıcılara görünmeden (<strong>sessizce çalıştır) </strong>anlamındadır. bu parametreyi kesinlikle ekliyoruz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>son olarak ise <a href="https://github.com/faruk-guler/JumpTools" target="_blank" rel="noreferrer noopener">https://github.com/faruk-guler/JumpTools</a> indirme linkini vermiş olduğum dosyayı indirerek aşağıdaki görüldüğü gibi <strong>Show Files:</strong> <strong>user\scripts\logon</strong> dizini altına yapıştıralım.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1564,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/s2.png?w=1024" alt="" class="wp-image-1564" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":1566,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/s3.png?w=1024" alt="" class="wp-image-1566" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>GPO ayarlarını kaydettikten sonra User bazlı yazmış olduğumuz için kullanıcıların bulunduğu <strong>OU</strong>= altına link edelim.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla – Best Regards</strong></p>
<!-- /wp:paragraph -->
