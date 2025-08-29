---
layout: post
title: Who included a computer in the domain
date: 2025-06-13 00:51
author: faruk-guler
comments: true
categories: [[Windows OS]
---
<!-- wp:image {"id":13844,"width":"438px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-4-sdn.jpg?w=540" alt="" class="wp-image-13844" style="width:438px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Info:</strong>Yetkili bir kullanıcı ile windows\debug klasörü altındaki NetSetup.log dosyasını inceler, Ağınızdaki tüm bilgisayarların C:\ yolunu paylaşıma açmayı unutmayınız.

Examine the NetSetup.log file under the windows\debug folder with an effective user. Do not forget to share the C:\ path of all computers in your network.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong># PS:</strong><br>$NoInfo = $null
$Offline = $null
$List = $null
#Get-Content getir.txt | foreach {
Get-ADComputer  -Filter * | foreach {
$FQDN = $_.DNSHostName
$Path = "\$FQDN\c$\Windows\debug\NetSetup.log" if (Test-Connection $FQDN -Count 1 -ErrorAction SilentlyContinue) { if (Test-Path $Path) { write-host "n`nChecking $FQDN..."

$User = ($($(Select-String -Path $Path -Pattern "lpAccount: " -CaseSensitive)  -split " ")[3])
$User
[array]$List += Write-Output $FQDN";"$User


    } 
else {[array]$NoInfo += $FQDN}
} 
else {[array]$Offline += $FQDN}

}
$list</pre>
<!-- /wp:preformatted -->
