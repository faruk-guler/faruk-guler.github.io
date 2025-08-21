---
layout: post
title: Who included a computer in the domain?
date: 2023-04-17 16:35
author: faruk guler
comments: true
categories: [Windows Group Policy GPO]
---
<!-- wp:image {"id":333,"width":414,"height":233,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-4-sdn.jpg?w=1024" alt="" class="wp-image-333" style="width:414px;height:233px" width="414" height="233" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Yetkili bir kullanıcı ile windows\debug klasörü altındaki NetSetup.log dosyasını inceler, Ağınızdaki tüm bilgisayarların C:\ yolunu paylaşıma açmayı unutmayınız.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Examine the NetSetup.log file under the windows\debug folder with an effective user. Do not forget to share the C:\ path of all computers in your network.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">$NoInfo = $null
$Offline = $null
$List = $null

#Get-Content getir.txt | foreach {
Get-ADComputer  -Filter * | foreach {
    $FQDN = $_.DNSHostName 
    $Path = "\\$FQDN\c`$\Windows\debug\NetSetup.log"
    if (Test-Connection $FQDN -Count 1 -ErrorAction SilentlyContinue) { 
        if (Test-Path $Path) {
            write-host "`n`nChecking $FQDN..."        
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

<!-- wp:paragraph -->
<p>Test Script!</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
