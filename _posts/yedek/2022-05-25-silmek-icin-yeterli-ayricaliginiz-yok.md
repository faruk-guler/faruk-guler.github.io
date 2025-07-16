---
layout: post
title: "you do not have sufficient privileges to delete CN=outlook................. or this object is protected from accidental deletion."
date: 2022-05-25 09:14
author: theguler
comments: true
categories: [Fix - Troubleshooting]
---
<!-- wp:image {"id":3241,"width":434,"height":245,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/solved.webp?w=852" alt="" class="wp-image-3241" width="434" height="245" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Active Directory Users and Computers Kullanıcı veya grup silme problemi</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Active Directory Users and Computers User or group deletion problem</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Advanced ayarları aktif ederek Nesneyi yanlışlıkla silinmeye karşı koru" kutusunun işaretini kaldırın.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>“Üst öğeden devralınabilen izinlerin bu nesneye ve tüm alt nesnelere yayılmasına izin verin.(mirası aktif hale getirin)</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>&amp;</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Uncheck the "Protect object from accidental deletion" box by activating advanced settings.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>“Allow inheritable permissions from the parent to propagate to this object and all child objects.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->
