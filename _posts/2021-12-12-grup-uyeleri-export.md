---
layout: post
title: Grup Üyelerini Export Etmek Powershell
date: 2021-12-12 11:22
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":333,"width":440,"height":247,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-4-sdn.jpg?w=1024" alt="" class="wp-image-333" width="440" height="247" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>PS:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Get-ADGroup "toplu_kisiler-Grup Nameee" -Properties Member | Select-Object -ExpandProperty Member | Get-ADUSer -properties Displayname,Description,wWWHomePage | Select Name,Displayname,Description,wWWHomePage | Export-csv -path C:\VPNkullanicilari.csv -Encoding Unicode</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Kolay gelsin...</strong></p>
<!-- /wp:paragraph -->
