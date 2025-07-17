---
layout: post
title: AD Query User by Last Logon Date [Value=LastLogonTimeStamp]
date: 2022-08-29 12:50
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":2148,"width":"436px","height":"245px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-as-admin.webp?w=1024" alt="" class="wp-image-2148" style="width:436px;height:245px" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Get-ADUser -Filter * -SearchBase “ou=uyeler,dc=guler,dc=com” -ResultPageSize 0 -Prop CN,lastLogonTimestamp | Select CN,@{n=”lastLogonTimestamp”;e={[datetime]::FromFileTime($_.lastLogonTimestamp)}} | Export-CSV c:\pw_last_logon_users.csv -NoTypeInformation</pre>
<!-- /wp:preformatted -->
