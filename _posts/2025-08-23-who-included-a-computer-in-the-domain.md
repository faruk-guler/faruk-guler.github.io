---
layout: post
title: Who included a computer in the domain?
date: 2025-08-23 00:51
author: faruk-guler
comments: true
categories: [Windows Servers]
---
<!-- wp:image {"id":15559,"width":"384px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://sddfder.wordpress.com/wp-content/uploads/2025/08/powershell-4-sdn.jpg?w=1024" alt="" class="wp-image-15559" style="width:384px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Yetkili bir kullanıcı ile windows\debug klasörü altındaki NetSetup.log dosyasını inceler, Ağınızdaki tüm bilgisayarların C:\ yolunu paylaşıma açmayı unutmayınız.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Examine the NetSetup.log file under the windows\debug folder with an effective user. Do not forget to share the C:\ path of all computers in your network.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">$NoInfo = $null<br>$Offline = $null<br>$List = $null<br>#Get-Content getir.txt | foreach {<br>Get-ADComputer  -Filter * | foreach {<br>$FQDN = $_.DNSHostName<br>$Path = "\$FQDN\c$\Windows\debug\NetSetup.log" if (Test-Connection $FQDN -Count 1 -ErrorAction SilentlyContinue) { if (Test-Path $Path) { write-host "n`nChecking $FQDN..."<br><br>$User = ($($(Select-String -Path $Path -Pattern "lpAccount: " -CaseSensitive)  -split " ")[3])<br>$User<br>[array]$List += Write-Output $FQDN";"$User<br><br><br>    } <br>else {[array]$NoInfo += $FQDN}<br>} <br>else {[array]$Offline += $FQDN}<br><br>}<br>$list</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
