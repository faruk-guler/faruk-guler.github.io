---
layout: post
title: Disabling Shutdown Event Monitor
date: 2022-10-07 20:56
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":4962,"width":511,"height":328,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/tracker.png?w=724" alt="" class="wp-image-4962" width="511" height="328" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>In order to solve the related problem, after I find and delete the values I have selected in the screenshot below via regedit, my problem is solved. There is no need to reboot the machine. When you close and reconnect, you can see that Event Tracker no longer opens.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>You can turn off this warning via <strong>local GPO</strong>, but you will not receive any warning for problems that occur afterwards.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>REG:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Reliability

<strong>#DirtyShutdown</strong>
<strong>#DirtyShutdownTime</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4965,"width":842,"height":149,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/reg_delete.png?w=1024" alt="" class="wp-image-4965" width="842" height="149" /></figure>
<!-- /wp:image -->
