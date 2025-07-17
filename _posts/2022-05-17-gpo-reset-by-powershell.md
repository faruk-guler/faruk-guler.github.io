---
layout: post
title: GPO Reset By PowerShell
date: 2022-05-17 13:53:00 +03:00
author: faruk-guler
comments: true
categories: [Windows Group Policy GPO]
---

![GPO Reset Image](https://farukguler.com/assets/post_images/powershell-4-sdn.jpg)

```powershell
Bulk Reset Group Policy Settings PS:
(gpedit.msc)
Remove-Item -Path "C:\Windows\System32\GroupPolicy\*" -Force -Recurse
Remove-Item -Path "C:\Windows\System32\GroupPolicyUsers\*" -Force -Recurse
gpupdate /force

Reset Local Security Policy Settings to Default in Windows CMD:
(secpol.msc)
secedit /configure /cfg %windir%\inf\defltbase.inf /db defltbase.sdb /verbose

Log Wiew:
%windir%\security\logs\scesrv.log for detail info.

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"></pre>
<!-- /wp:preformatted -->

