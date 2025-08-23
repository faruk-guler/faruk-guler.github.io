---
layout: post
title: Extend Windows Server Evaluation 180 days Trial
date: 2022-07-24 17:45
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":3691,"width":800,"height":132,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/microsoft-licence.png?w=1024" alt="" class="wp-image-3691" width="800" height="132" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>The evaluation version of Windows <strong>Server</strong> 2012/2016/2019/2022 is valid for 180 days and you can extend your trial version for 3 years.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Open with PowerShell <strong>Administrato</strong>r privilege.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>PowerShell:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>slmgr -dli</strong>
#Find out the current trial period

<strong>slmgr -dlv</strong>
#Find out about the remaining trial
#If Remaining Windows rearm count: 5, it can be extended 5 more times.

<strong>slmgr -rearm</strong>
#Extending the period by another 180 days

<strong>Restart-Computer</strong>
#Now restart your computer.

#After restarting the computer you can check the time again with <strong>slmgr -dli</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
