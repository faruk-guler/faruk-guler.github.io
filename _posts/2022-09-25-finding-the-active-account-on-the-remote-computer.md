---
layout: post
title: Finding the Active Account on the Remote Computer
date: 2022-09-25 00:03
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":333,"width":415,"height":233,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://faruk-guler.github.io/assets/post_images/powershell-4-sdn.jpg?w=1024" alt="" class="wp-image-333" width="415" height="233" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Ps:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">$computer=read-host "CumputerName/IP:"
gwmi win32_computersystem -comp $computer | select USername,Caption,Manufacturer</pre>
<!-- /wp:preformatted -->
