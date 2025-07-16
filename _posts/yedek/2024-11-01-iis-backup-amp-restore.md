---
layout: post
title: IIS Server Backup and Restore
date: 2024-11-01 23:24
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":15349,"width":"451px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/iis.PNG?w=1024" alt="" class="wp-image-15349" style="width:451px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>IIS (Internet Information Services) running on Windows Server is a preferred web server platform with its reliability and wide configuration options. However, it is very important to back up IIS configurations securely and restore them quickly when necessary against risks such as configuration errors, system crashes or cyber threats. In this article, we will discuss how to perform IIS backup and restore operations and why it is a critical step.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#IIS Version Check:</strong><br><strong>#PS</strong><br>get-itemproperty HKLM:\SOFTWARE\Microsoft\InetStp\ | select setupstring,versionstring</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Storage for IIS published sites</strong> <strong>[Move to new server]</strong><br>C:\inetpub\<br>C:\inetpub\wwwroot<br>C:\My_Web_page\</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Storage of System files and Administrative tools required for IIS</strong><br>cd %windir%\system32\inetsrv</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Backup current IIS Certificates:</strong><br>**Before restoring IIS, move any SSL certificates you are using to the new server<br><br><strong>#PS</strong><br>netsh http show sslcert<br>netsh http show sslcertdir cert:\localmachine\my | Where-Object { $_.hasPrivateKey } | Foreach-Object { [system.IO.file]::WriteAllBytes("C:\Windows\IIS_BCK\$($_.Subject).pfx",($_.Export('PFX', 'secret')) ) }</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Management for the IIS appcmd tool:</strong><br>cd %windir%\system32\inetsrv<br>appcmd list backup<br>appcmd list site<br>appcmd list site demo<br>appcmd list config</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Backup:</strong><br>Appcmd add backup ANS_yedek1<br>#Backup-WebConfiguration -Name ANS_yedek1 <strong>[PS]</strong><br><br><strong>#Restore:</strong><br>appcmd list backup [list backups]<br>Appcmd restore backup ANS_yedek1<br>Appcmd restore backup /stop:true ANS_yedek1 <strong>#stop IIS Service and backup</strong><br>Restore-WebConfiguration -Name ANS_yedek1 <strong>[PS]</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Öğrenmeye aç kalın – Be hungry to learn</strong></p>
<!-- /wp:paragraph -->
