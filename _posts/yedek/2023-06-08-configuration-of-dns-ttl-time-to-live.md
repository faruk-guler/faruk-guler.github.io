---
layout: post
title: Configuration of DNS TTL (Time-To-Live)
date: 2023-06-08 15:43
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":13642,"width":"451px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dns-time-to-live-ttl.webp?w=1024" alt="" class="wp-image-13642" style="width:451px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>TTL</strong> (Time-To-Live) on DNS <strong>(Domain Name System)</strong> is a value that indicates how long a DNS record will be stored in the cache. During this time, when a DNS query is made, DNS resolvers cache the response they receive and retain this response for the specified TTL period.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>For example, when you make a DNS query for www.farukguler.com, the resolver learns the IP address of that domain and caches that information. If the TTL time is set to 3600 seconds (1 hour), the parser will use the same response without querying the same record again for one hour. To view the TTL assigned to the record on the DNS server, you need to find and use the authoritative DNS server for the record you are examining.<br><strong>Found in this Statement of Authority (SOA) record:</strong><br>Keep your DNS TTL minimum greater than 0, as setting it to 0 may cause your DNS information to be ignored or rejected.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>What is the TTL time in Best practices?</strong><br>1 hour (3600 seconds) for static recordings<br>20 minutes (1200 seconds) for dynamic recordings</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The TTL setting for a DNS can be changed via the dns record.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":13672,"width":"640px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/mail_soa.png?w=1024" alt="" class="wp-image-13672" style="width:640px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>The default TTL setting for a zone is changed via SOA.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":13670,"width":"337px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/soa_rec.png?w=499" alt="" class="wp-image-13670" style="width:337px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>***</strong>For these operations, you need to activate the View &gt; Advanced setting.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>&gt; PS:</strong><br>Get:<br>Get-DnsServerResourceRecord -ZoneName "guler.com"<br>Get-DnsServerResourceRecord -ZoneName "guler.com" -RRType "A"<br>Get-DnsServerResourceRecord -ZoneName "guler.com" -Name "mail"<br><br>Set:<br>Add-DnsServerResourceRecordA -Name "posta" -ZoneName "guler.com" -AllowUpdateAny -IPv4Address "10.5.11.24" -TimeToLive 05:00:00<br><br>Add-DnsServerResourceRecord -CName -Name "host14" -HostNameAlias "Host34.lab.contoso.com" -ZoneName "guler.com" -AllowUpdateAny  -TimeToLive 01:00:00<br><br>Add-DnsServerResourceRecord -Name "." -MX -ZoneName "guler.com" -MailExchange "mail.guler.com" -Preference 10</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>SET Windows DNS Server:</strong><br>-Explained above<br><br><strong>SET Linux DNS Server:</strong><br><strong>RedHat / CentOS:</strong><br>sudo nano /var/named/guler.com.db<br>$TTL 86400 #in seconds<br>sudo named-checkconf<br>sudo systemctl restart named<br><br><strong>Debian:</strong><br>sudo nano /etc/bind/guler.com.db<br>$TTL 86400 #in seconds<br>sudo named-checkconf<br>sudo systemctl restart named<br><br><strong>Windows TTL Check:</strong> (spesific: MX, CNAME, TXT, A, NS)<br>nslookup -type=A -debug farukguler.com<br>nslookup -type=cname -debug farukguler.com<br>Resolve-DnsName -Name farukguler.com<br><br><strong>Linux TTL Check:</strong><br>dig www.farukguler.com<br>dig A www.farukguler.com<br>dig +nocmd +noall +answer +ttlunits A www.farukguler.com<br><br><strong>Check the Google Web Toool:</strong><br><a href="https://toolbox.googleapps.com/apps/dig/">https://toolbox.googleapps.com/apps/dig/</a></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>How to change Lifetime in cPanel.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":13647,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/cpanel_edit.webp?w=1024" alt="" class="wp-image-13647" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Stay hungry to learn</strong>.</p>
<!-- /wp:paragraph -->
