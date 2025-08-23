---
layout: post
title: BranchCache Enabling Windows Server
date: 2022-08-26 18:35
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":4180,"width":584,"height":329,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/branchcache.jpg?w=1024" alt="" class="wp-image-4180" width="584" height="329" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>I will talk about the BranchCache feature that comes with Windows 7 and Windows Server 2008 R2. BranchCache offers us great benefits in making the most effective and efficient use of our existing network and preventing unnecessary network traffic. For example, when the client computer pulls a file or an application from our central server, the BranchCache feature keeps this file in the cache of the downloaded client computer instead of downloading it from the server many times, and when another client computer requests the same file, BranchCache takes the same file from the first downloaded client computer and prevents unnecessary network traffic. . One of the biggest benefits this brings us will be to use our bandwidth at the maximum level. To expand our example further, in a business with 1000 clients, a high bandwidth will consume your speed and time when the <strong>(X) </strong>file or application has to be downloaded to each client computer. The BranchCache feature kicks in at this very moment and saves you.<br><strong>You can activate it easily with the GPO.</strong> (Group Policy)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Supported protocols</strong><br><strong>HTTP-HTTPS: </strong>Web browser and other applications<br><strong>SMB: </strong>File sharing<br><strong>BITS: </strong>It is a Windows component. Its main purpose is to send a piece of content from the server to the client when the network usage is low.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Kolaylıklar dilerim. – I wish everyone good luck.</strong></p>
<!-- /wp:paragraph -->
