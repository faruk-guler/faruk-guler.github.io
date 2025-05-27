---
layout: post
title: Best Client NTP Services Configuration
date: 2023-09-04 13:54
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":8343,"width":"232px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/date-time-location.jpg?w=1024" alt="" class="wp-image-8343" style="width:232px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>PS ISE</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Show current timezone</strong><br>Get-TimeZone<br><br><strong>#List all available time zones</strong><br>Get-TimeZone -ListAvailable<br><br><strong>#Set time and date</strong><br>Set-Date -Date "2023-09-04 11:20:00"<br><br><strong>#Show and set timezone(Turkey)Get-TimeZone</strong><br>Set-TimeZone -Id "Turkey Standard Time"<br><br><strong>#Setting the date and time manually (Interface)</strong><br>start ms-settings:dateandtime<br><br><strong>#See current system time</strong><br>Get-Date<br><br><strong>#Configure Faster (TimeZone) (UTC+03:00) Istanbul</strong><br>Set-TimeZone -Id "Turkey Standard Time"<br>Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\TimeZoneInformation" -Name "Bias" -Value 180 #180 Minutes &amp; 3 Hours &amp; (UTC+03:00) İstanbul<br>Restart-Service w32time<br><br><strong>#Configure Faster(NTP Server Manual)</strong> #Flag 0x1,0x8,0x9,0x10 ..etc<br>w32tm.exe /config /syncfromflags:manual /manualpeerlist:<strong>NTP-srv.guler.com</strong>,0x8<strong> </strong>/reliable:yes /update<br>w32tm.exe /config /update<br>Restart-Service w32time<br>w32tm /resync /rediscover /nowait<br><br><strong>#Configure Faster(NTP to "Default Domain Controller") #All DC's</strong><br>w32tm /config /syncfromflags:DOMHIER /reliable:YES /update<br>w32tm /config /update<br>net time /domain<br>w32tm /resync<br>Restart-Service w32time<br><br><strong>#Delete and Re-Register Time Service Registration</strong><br>w32tm /unregister<br>w32tm /register<br><br><strong>#Verify if the time is from the domain or manually</strong><br>w32tm /query /configuration | Select-String ‘type’<br><br>***Type: <strong>NT5DS</strong> (Local) Default Domain Controller<br>***Type: <strong>NTP</strong> (Local) NTP Server <strong>"0.tr.pool.ntp.org"</strong> ..etc<br><br><strong>#Some List of Public Time (Top NTP Servers)</strong><br>time.google.com<br>time.cloudflare.com<br>time.windows.com<br>server 0.tr.pool.ntp.org<br>server 1.tr.pool.ntp.org<br>server 2.tr.pool.ntp.org<br>server 3.tr.pool.ntp.org<br>time.facebook.com<br>time.apple.com<br>time.nist.gov<br><br><strong>#View Client Information about #Windows Time Service:</strong><br>w32tm /query /status<br>w32tm /query /source<br>w32tm /query /peers</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Ayrıca incelemek için: </strong>(RHEL) Centos 8 NTP Server Configuration</h2>
<!-- /wp:heading -->

<!-- wp:embed {"url":"https://farukguler.com/2022/09/16/centos8-ntp-server-and-clients-best-configuration","type":"wp-embed","providerNameSlug":"guler-information-technology-platform"} -->
<figure class="wp-block-embed is-type-wp-embed is-provider-guler-information-technology-platform wp-block-embed-guler-information-technology-platform"><div class="wp-block-embed__wrapper">
https://farukguler.com/2022/09/16/centos8-ntp-server-and-clients-best-configuration
</div></figure>
<!-- /wp:embed -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
