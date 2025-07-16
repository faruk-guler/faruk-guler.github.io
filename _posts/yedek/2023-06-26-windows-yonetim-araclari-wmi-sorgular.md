---
layout: post
title: Windows Yönetim Araçları (WMI) Sorgular (user,caption,Manufacturer, etc.)
date: 2023-06-26 15:13
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":2148,"width":"460px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-as-admin.webp?w=1024" alt="" class="wp-image-2148" style="width:460px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">$computer=read-host "Computer Name/IP:"
gwmi win32_computersystem -comp $computer | select USername,Caption,Manufacturer</pre>
<!-- /wp:preformatted -->
