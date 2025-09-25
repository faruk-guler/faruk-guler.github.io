---
layout: post
title: Powershell PasswordNeverExpire to detect users
date: 2022-03-24 02:35
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":333,"width":426,"height":239,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-4-sdn.jpg?w=1024" alt="" class="wp-image-333" width="426" height="239" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>PS:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Password Never Expire kullanıcıları tespit et - Identify Password Never Expire users</strong>
get-ADUser -Filter {useraccountcontrol -band 66048} -Properties useraccountcontrol
get-aduser -Filter {passwordNeverExpires -eq "true"} |Select-Object name

<strong>kullanıcıdan Password Never Expire kaldır - Remove Password Never Expire from user</strong>
get-aduser "username"| set-aduser -PasswordNeverExpires $false

<strong>Kullanıcılardan Password Never Expire kaldır - Remove Password Never Expire from all users</strong>
get-aduser -Filter {passwordNeverExpires -eq "true"} |et-aduser -PasswordNeverExpires $false</pre>
<!-- /wp:preformatted -->
