---
layout: post
title: AD Bulk Attribute "Mail, Name, etc." Export
date: 2022-02-03 10:47
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":2148,"width":"537px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-as-admin.webp?w=1024" alt="" class="wp-image-2148" style="width:537px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"># Import the Active Directory module if not already loaded
Import-Module ActiveDirectory

# Get all users from Active Directory and retrieve the "mail" attribute
$users = Get-ADUser -Filter * -Properties mail | Select-Object <strong>Name, mail</strong>

# Export the user names and email addresses to a CSV file
$users | Export-Csv -Path "C:\Guler_User_Emails.csv" -NoTypeInformation</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
