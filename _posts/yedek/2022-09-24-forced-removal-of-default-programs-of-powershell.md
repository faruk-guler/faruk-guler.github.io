---
layout: post
title: Forced removal of default programs with the help of Powershell
date: 2022-09-24 23:53
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":2148,"width":399,"height":224,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-as-admin.webp?w=1024" alt="" class="wp-image-2148" width="399" height="224" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Windows 10 ile gelen varsayılan programlar normalde kaldırılamayan uygulamalardır. işte bu uygulamaları eğer kullanmayacağınızdan kesinlikle eminseniz Powershell yardımı ile sisteminizden zorla kaldırabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>PS:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Get-AppxPackage *
#Xbox: <strong>xboxapp</strong>
#Groove Music: <strong>zunemusic</strong>
#Maps: <strong>windowsmaps</strong>

Get-AppxPackage *<strong>xboxapp</strong>* | Remove-AppxPackage
</pre>
<!-- /wp:preformatted -->
