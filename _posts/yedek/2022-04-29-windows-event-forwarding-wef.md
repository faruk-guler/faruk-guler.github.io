---
layout: post
title: Windows Event Forwarding (WEF)
date: 2022-04-29 20:29
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":2964,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/wef.png?w=398" alt="" class="wp-image-2964" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Windows Event Forwarding (WEF) allows you to collect event logs of windows based systems on a central server or SIEM. There are two operating modes for WEF;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Pull mode: </strong>In this mode, the WEF server goes and collects the logs on its own, which is not a preferred method as it will impose a load on the server.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Push mode: </strong>In this mode, clients send logs to WEF server over http TCP 5985 and https 5986 ports via WinRM service. The biggest advantage of this mode is that it will prevent performance problems as it does not create a load on the WEF server.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Collector Iniated(Pull mode): </strong>Starts the WEF server to collect logs. WEF server connects to clients and pulls logs on itself. This method is not recommended as it is not economical in terms of resource usage.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Source Computer Initiated(Push mode): </strong>Clients send their logs to the WinRM ports of the target WEF server (such as WinRM over HTTPS (TCP\5985) or WinRM over HTTP (TCP\5986)) via the WinRM service. This method is similar to transmitting log records with syslog. Here, the source is the clients, which is the source of the spent log, and these systems register to the WEF server with Kerberos Authetincation.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#Windows Remote Management (WInRM) enabled
<strong>winrm qc</strong>

#Configure Event Collection Services enable
<strong>wecutil qc</strong>

#You need to allow TCP 5985 and https 5986 ports over firewall.

<strong>netsh advfirewall firewall add rule name="NETBIOS UDP Port 5985" dir=in action=allow protocol=UDP localport=5985</strong>
<strong>netsh advfirewall firewall add rule name="NETBIOS UDP Port 5986" dir=in action=allow protocol=UDP localport=5986</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":2972,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/ax.png?w=1006" alt="" class="wp-image-2972" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Computer Configuration &gt;Polices &gt; Administrative Templates &gt; Windows Components &gt; Event Forwarding” altında “SubscriptionManager Enabled</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Computer Configuration -&gt; <strong>Polices &gt; </strong>Administrative Templates -&gt; Windows Components -&gt; Windows Remote Management (WinRM) -&gt; WinRM Service -&gt; Turn On Compatibility HTTP &amp; HTTPS Listener Enabled</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Computer Configuration&gt;Windows Settings &gt; Security Settings &gt; System Services</strong> &gt; <strong>Windows Remote management </strong>&gt; <strong>Automatic</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Let's enter the following value in the Subscription Manager section. Of course, you will arrange it according to your own WEF server. <strong>(I redirected to DC)</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Server=http://anatolia.guler.com:5985/wsman/SubscriptionManager/WEC,Refresh=60</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>After these processes, we open the Event Viewer on the server you have designated as the WEF server. From the Subscriptions section, we click on Create Subscription. From the Source Computer Initiated section, we configure the settings as seen. If there is a warning, it will probably be a warning that your disk and performance will decrease because you have chosen to take too many logs.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Note: If the log will be collected with the Collector Initiated method, the WEF server must be added to the “Event Log Readers” group with Restricted Groups as <strong>“Computer” account.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":2975,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/logs.png?w=1024" alt="" class="wp-image-2975" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>At the end of these processes, we will start to see our logs in Forwarded Events.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Faydalı olması dileğiyle - Hope it's useful</strong></p>
<!-- /wp:paragraph -->
