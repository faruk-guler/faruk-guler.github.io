---
layout: post
title: SIEM DHCP-DNS and more Integration
date: 2022-10-12 22:37
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":15388,"width":"451px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/siem_logo.webp?w=959" alt="" class="wp-image-15388" style="width:451px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading">DHCP Server</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>By default, the maximum log file size of the Windows DHCP server is 70 MB. When the log file reaches 70 MB, new events will stop being added to the log file. From 00.00 AM, it will start writing new logs to the next day.<br>As ipV4 and ipV6, the log files are stored separately in 10MB and the sum of day+mb equals= 70MB. Default log path: <em>"C:\Windows\System32\dhcp"</em></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Logs can be activated both via <strong>Default</strong> and <strong>Event viewer.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":15391,"width":"372px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/1_dhcp_enable.PNG?w=501" alt="" class="wp-image-15391" style="width:372px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Registry Editor:</strong><br>HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\DHCPServer\Parameters"<br><br>"DhcpLogFilesMaxSize"<br>"Decimal"<br>"700"</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">&gt; PS\.<br>&gt; Get-DhcpServerAuditLog<br><br>Path              : C:\Windows\system32\dhcp<br>Enable            : True<br>MaxMBFileSize     : 700<br>DiskCheckInterval : 50<br>MinMBDiskSpace    : 20<br><br>&gt; Restart-Service DHCPServer</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":15393,"width":"401px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/2_dhcp_enable.PNG?w=643" alt="" class="wp-image-15393" style="width:401px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading">DNS Server</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>By default, Debug logging can be enabled both via <strong>Debug logging</strong> and via the <strong>Event viewer.</strong><br>Debug logging is also used for debugging.<br>Microsoft says that by default the max log file can reach a size of about<strong> 4.2 GB</strong> [4294967295 byte]  The size is calculated in <strong>[bytes].</strong> Default log path: <em>"C:\Windows\System32\dns"</em> </p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":15403,"width":"433px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/1_dns_enable.PNG?w=735" alt="" class="wp-image-15403" style="width:433px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Registry Editor:</strong><br>"HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\DNS\Parameters"<br><br>"LogFileMaxSize"<br>"Decimal"<br>"4294967295"</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">&gt; PS\.<br>&gt; 4GB / 1 #gb to byte<br>&gt; Get-DNSServerDiagnostics<br>&gt; Restart-Service -Name "DNS"</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":15399,"width":"575px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/2_dns_enable.PNG?w=999" alt="" class="wp-image-15399" style="width:575px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Click OK again to enable the DNS Server Analytic event log. By default, analytic logs are written to the file: <em>"%SystemRoot%\System32\Winevt\Logs\Microsoft-Windows-DNSServer%4Analytical.etl</em>"</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>You can also enable Log file rotation for SIEM. <a href="https://www.google.com/search?q=dns+server+enable+Log+file+rotation.&amp;oq=dns+server+enable+Log+file+rotation.&amp;gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDcwNTRqMGo3qAIAsAIA&amp;sourceid=chrome&amp;ie=UTF-8">https://www.google.com/search?q=dns+server+enable+Log+file+rotation</a></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">and more</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Written by theguler with love in Turkey 💖</p>
<!-- /wp:paragraph -->
