---
layout: post
title: GPO Reset By PowerShell
date: 2022-05-13 07:16
author: faruk-guler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":333,"width":414,"height":233,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-4-sdn.jpg?w=1024" alt="" class="wp-image-333" width="414" height="233" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<strong>Windows işletim sistemlerinde Grup İlkesi (Group Policy - GPO) ve Yerel Güvenlik İlkesi (Local Security Policy) ayarları PowerShell ve CMD komutlarıyla varsayılan haline döndürülebilir.
<!-- /wp:paragraph -->


<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Nasıl Kullanılır?</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
```bash
Stop-Service -Name gpsvc -Force
Start-Service -Name gpsvc

Bulk Reset Group Policy Settings PS:
(gpedit.msc)
Remove-Item -Path "C:\Windows\System32\GroupPolicy\*" -Force -Recurse -ErrorAction SilentlyContinue
Remove-Item -Path "C:\Windows\System32\GroupPolicyUsers\*" -Force -Recurse -ErrorAction SilentlyContinue
gpupdate /force

Reset Local Security Policy Settings to Default in Windows CMD:
(secpol.msc)
secedit /configure /cfg %windir%\inf\defltbase.inf /db defltbase.sdb /verbose
secedit /configure /cfg "$env:windir\inf\defltbase.inf" /db "$env:windir\security\database\defltbase.sdb" /verbose

Log Wiew:
notepad "$env:windir\security\logs\scesrv.log"
```
<!-- wp:paragraph -->
