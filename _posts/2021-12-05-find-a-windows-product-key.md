---
layout: post
title: Finding a Windows Product Key
date: 2021-12-05 17:08
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":333,"width":516,"height":290,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-4-sdn.jpg?w=1024" alt="" class="wp-image-333" width="516" height="290" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><br></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">PS:
powershell “(Get-WmiObject -query ‘select * from SoftwareLicensingService’).OA3xOriginalProductKey”

CMD:
wmic path softwarelicensingservice get OA3xOriginalProductKey</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Faydalı olması dileğiyle. – Hope it’s useful.</strong></p>
<!-- /wp:paragraph -->
