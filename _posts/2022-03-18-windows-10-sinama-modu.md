---
layout: post
title: Windows 10 Sınama Modu Ne İşe Yarar ?
date: 2022-03-18 15:18
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":2293,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/mod.jpg?w=368" alt="" class="wp-image-2293" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Bu özellik aslında&nbsp;<strong>Microsoft&nbsp;</strong>tarafından onaylanmamış onların tabiriyle imzalanmamış projeleri açmak için kullanılır. Yani sınama modu'nu açıp Microsoft tarafından imzalı olmayan sürücü, uygulama vb. şeyleri açabilirsiniz. Sınama modunu açmadığınız takdirde Microsoft imzasız projeler açılmaz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>CMD:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre id="block-212c4770-1090-40f9-a3aa-882bb19bd474" class="wp-block-preformatted">1: bcdedit.exe -set loadoptions ENABLE_INTEGRITY_CHECKS
2: bcdedit.exe -set TESTSIGNING OFF

<strong>Eğer tekrar açmak isterseniz - If you want to reactivate</strong>
1:bcdedit.exe -set TESTSIGNING ON
</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Bilgisayarınızı yeniden başlatığınızda&nbsp;<strong>sınama modu</strong>&nbsp;kapanmış olduğunu göreceksiniz.</p>
<!-- /wp:paragraph -->
