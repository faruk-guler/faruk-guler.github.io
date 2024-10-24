---
layout: post
title: Listing the Updates of the Servers under a Certain "OU"
date: 2023-08-03 21:10
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":2148,"width":461,"height":215,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-as-admin.webp?w=1024" alt="" class="wp-image-2148" style="width:461px;height:215px" width="461" height="215" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>
$OU= "OU=MUHASEBE,DC=guler,DC=com"

foreach ($Serverlist in (Get-ADComputer -Filter * -SearchBase $OU | select name).Name)
{
"Servername: "+ $Serverlist
Get-Hotfix -cn $Serverlist | Select HotfixID, Description, InstalledOn, ServicePackLevel
" "
}</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>This PowerShell script gets the list of computers in the Organization Unit named "ACCOUNTING" in the "guler.com" domain. Then it shows the server name and installed hotfixes for each server.</p>
<!-- /wp:paragraph -->
