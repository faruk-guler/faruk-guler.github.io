---
layout: post
title: Windows NTP Settings Automated
date: 2023-05-07 23:12
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:paragraph -->
<p>Windows sistemlerde sistem saati ayarları</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7068,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/reg.jpg?w=256" alt="" class="wp-image-7068" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Run:
<strong>ms-settings:dateandtime</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">REG:
<strong>HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\W32Time\Parameters</strong>

Type:
<strong>"Type"="NoSync" </strong>- Saati Otomatik olarak Ayarla <strong>Kapalı</strong>
<strong>"Type"="NTP" </strong>- Saati Otomatik olarak Ayarla <strong>Aktif</strong></pre>
<!-- /wp:preformatted -->
