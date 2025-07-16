---
layout: post
title: Otomatik domaine alma Powershell Script
date: 2021-12-02 16:48
By: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":294,"width":"496px","height":"264px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/join-1.jpg?w=640" alt="" class="wp-image-294" style="width:496px;height:264px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>PS:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">$domain = "guler.com"<br>$password = "Password1234565" | ConvertTo-SecureString -asPlainText -Force<br>$username = "$guler\faruk"<br>$credential = New-Object System.Management.Automation.PSCredential($username,$password)<br>Add-Computer -DomainName $domain -Credential $credential<br>shutdown.exe -R -T 00 -F</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>DHCP tarafından oto dns ve ip almış sunucularda manuel olarak tıkla ile domain join gerçekleştirmektedir.<br>Buradaki unutulmaması gerek bir husus ise script içindeki <strong>kullanıcı şifresi</strong> hash edilmediği sürece herkese açık olup <strong>görünecektir!!.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Not: Pc adları ise ilk kurulumdaki gibi rastgele gelecektir. örnek:COMPUTER-MMFK5GXX</p>
<!-- /wp:paragraph -->
