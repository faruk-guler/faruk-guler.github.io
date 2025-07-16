---
layout: post
title: Round Robin DNS Load Balancer
date: 2024-04-30 14:11
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":11739,"width":"518px","height":"258px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/round-robin-cf.jpg?w=1024" alt="" class="wp-image-11739" style="width:518px;height:258px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>There are many different methods for Load Balancing between Servers and Services. For example, hardware can be used<br>(Kemp LoadMaster, Riverbed, BigIP F5, Netscaler vs.) or software solutions can be used.<br>I would like to talk about the DNS Round Robin feature, which is a frequently used method today.<br>As you all know, more than one partner server is set up for the continuity of the services, especially on the Internet.<br>A problem will arise here.<br>Clients send a query to DNS server to access these services such as web server, if DNS server client<br>If he always returns to his queries with the same IP address, an incredible band contraction (traffic) will occur on that service. This is where the DNS Round Robin (Load Balancing) feature comes into play.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Round Robin; </strong>DNS works with the method of entering more than one A (Host) Record for the same domain. And the system shares the incoming requests to the servers. In fact, what we call apportionment is that it is done with the Round Robin algorithm, not according to the current load situation. The algorithm queues the servers and sends the incoming request to the first server and sends that server to the back. In this way, the requests are distributed to the servers. The request is sent even if the server is not currently running.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Activating the first DNS – Round Robin feature:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":4969,"width":"577px","height":"384px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/robin.png?w=841" alt="" class="wp-image-4969" style="width:577px;height:384px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Then we create a zone called </strong>(test.guler.com)<strong> on the DNS server:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":4972,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/zone_create.png?w=811" alt="" class="wp-image-4972" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Then you will enter the IP addresses of your partner servers in your Zone record that you have created on DNS</strong> (<strong>test.guler.com</strong>)<strong>:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":4970,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/test_web.png?w=859" alt="" class="wp-image-4970" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>That's the deal. After that, you will test Round Robin by pinging from different devices and you will see that each request is directed to different ip addresses.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":4975,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/nslookup.png?w=1024" alt="" class="wp-image-4975" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Umarım faydalı olmuştur. – I hope it was helpful</strong>.</p>
<!-- /wp:paragraph -->
