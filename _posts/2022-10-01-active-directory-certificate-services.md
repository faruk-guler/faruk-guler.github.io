---
layout: post
title: Whats is Active Directory Certificate Services(ADCS)
date: 2022-10-01 23:35
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":4938,"width":648,"height":204,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/adcs.png?w=1024" alt="" class="wp-image-4938" width="648" height="204" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>This article, I will talk about the definition of Active Directory Certificate Services (ADCS) Active Directory Certificate Services is used to create and manage certificates for server and software security systems. It also provides issuance, verification and tracking of certificates.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Some supported servers and applications:</strong><br>Skype For Business (Lync), IIS, VPN (Virtual Private Network), Exchange Server, Remote Desktop Connection (RDP), Secure Wireless Networks, IPSec, EFS, Smart Card logon, Secure Socket Layer, Transport Layer Socket and Terminal Service</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":4950,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/ca.png?w=736" alt="" class="wp-image-4950" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Active Directory Certificate Services, with its public key infrastructure, is a service that uses public key technologies and is used in software security systems. I would like to briefly talk about the roles and services of the service;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Certification Authority (CA):</strong><br>-Web Enrollment<br>-Online Responder<br>-Network Device Enrollment Service<br>-Certificate Enrollment Policy Web Service<br>-Certificate Enrollment Web Service<br>-Now let's talk about a brief description of these roles and services.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Certification Authority (CA)</strong><br>This service is used for issuing and managing certificates to users, computers and servers. Two options are available as Root or Subordinate.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Web Enrollment</strong><br>It allows users to perform certificate creation and certificate revocation requests using the web interface. It is the management screen.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Online Responder</strong><br>It is used during the process of accepting and canceling the requests of the users regarding the certificates they have requested. At the end of the certificate evaluation process, the Online Responder service evaluates the status and sends back the information containing the status information of the transactions related to the requested certificate by signing.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Network Device Enrollment Service</strong><br>It is used to obtain certificate information about Routers and devices on the network. It is also a service that enables network devices on the domain to receive certificates.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Certificate Enrollment Policy Web Service</strong><br>This feature is used to obtain information about certificate enrollment policies created by active users and computers on the Web Service. It ensures that certificates are automatically uploaded to user and computer accounts that are not members of the domain, within the framework of determined policies.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Certificate Enrollment Web Service</strong><br>Certificate Enrollment Web Service is an Active Directory Certificate Services service that enables Users and Computers to perform certificate enrollment using the HTTPS authentication protocol.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>I hope it was useful.</strong></p>
<!-- /wp:paragraph -->
