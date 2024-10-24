---
layout: post
title: Windows Kayıtlı Wifi Şifrelerinin Öğrenilmesi
date: 2021-12-14 12:33
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:paragraph -->
<p>Powershell üzerinde - On Powershell</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>PS:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre id="block-212c4770-1090-40f9-a3aa-882bb19bd474" class="wp-block-preformatted">netsh wlan show profiles</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":648,"width":666,"height":356,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/wf.jpg?w=933" alt="" class="wp-image-648" width="666" height="356" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Bağlandığınız tüm&nbsp;<strong>Wi-Fi</strong>&nbsp;ağlarının ismini gösterecektir. - Will display the name of all Wifi networks.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>PS:</strong> </p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre id="block-212c4770-1090-40f9-a3aa-882bb19bd474" class="wp-block-preformatted">netsh wlan show profile name="istediğim Wifi adı" key=clear</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":651,"width":718,"height":406,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/inkedwi-fi.jpg?w=932" alt="" class="wp-image-651" width="718" height="406" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Key Content</strong>&nbsp;yazan kısımda şifreniz yazmaktadır. - Your password is written in the section that says <strong>Key Content</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Bunu tüm ağlar için yapalım - Let's do this for all networks</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>PS</strong>: </p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre id="block-212c4770-1090-40f9-a3aa-882bb19bd474" class="wp-block-preformatted"><strong>(netsh wlan show profiles) | Select-String “\:(.+)$” | %{$name=$_.Matches.Groups[1].Value.Trim(); $_} | %{(netsh wlan show profile name=”$name” key=clear)} | Select-String “Key Content\W+\:(.+)$” | %{$pass=$_.Matches.Groups[1].Value.Trim(); $_} | %{[PSCustomObject]@{ PROFILE_NAME=$name;PASSWORD=$pass }} | Format-Table -AutoSize</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":655,"width":672,"height":214,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/toplu.png?w=750" alt="" class="wp-image-655" width="672" height="214" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Saygılarımla. – Best regards.</p>
<!-- /wp:paragraph -->
