---
layout: post
title: What is MTU? (Maximum Transmission Unit) Maksimum İletim Birimi Nedir ?
date: 2022-09-02 00:36
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":4226,"width":709,"height":278,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/mtu.png?w=1024" alt="" class="wp-image-4226" width="709" height="278" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>mturoute.exe - Debug the MTU</strong> <strong>Measurement Tool</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>mturoute.exe – MTU Ölçüm ve hata ayıklama Toolu</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Download: </strong><a href="https://elifulkerson.com/projects/mturoute.php">https://elifulkerson.com/projects/mturoute.php</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>The maximum amount of data that a physical network can carry in the data section of its frame is called MTU (Maximum Transmission Unit). MTU is the maximum number of bytes that a Data-Link protocol can wrap. MTU values may vary from network to network. </strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The maximum size of a data packet is 65,535 bytes. If the size of the sent data packet is larger than the MTU (Maximum Transmission Unit) value of the sent network, this data packet is sent by dividing it into smaller units. These units are also called Fragmentation. This division process is executed by routers. The router determines the incoming packet according to the type of network to which it will go and sends it by dividing it into smaller units according to the MTU value of that network. Networks are not responsible for the separation into these units. Splitting data packets into too many fragmentations can lead to inefficiency. It will also take some time to convert these fragmentations to the original packet. This causes the speed of the network to decrease. So MTU needs to be fine tuned. Networks are given some priority to support the widest MTUs. Especially to networks related to research. The MTU value for Ethernet networks is 1500 Bytes. This means that a packet entering an Ethernet network can have a maximum size of <strong>1500 bytes.</strong> <strong>Too low MTU size can also cause significant performance loss.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>MTU values for network types:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>HYPERchannel 65,535</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Token Ring(16Mbps) 17,914</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Token Ring(4Mbps) 4.464</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>FDDI 4,352</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Ethernet 1,500 X.25 5.76</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Dial-up 576</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>PPP 296</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>xDSL 1442 – 1492</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Umarım faydalı olmuştur. – I hope it was useful.</strong></p>
<!-- /wp:paragraph -->
