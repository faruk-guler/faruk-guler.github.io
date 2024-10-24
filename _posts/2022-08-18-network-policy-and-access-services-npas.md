---
layout: post
title: Network Policy and Access Services (NPAS)
date: 2022-08-18 12:44
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":4072,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/radius-auth.png?w=1024" alt="" class="wp-image-4072" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>In summary,</strong> <strong>NPS</strong> is a Windows Server role where you can create and manage various security and network access policies for your users who will make VPN connections.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Network policy and access services – NPAS is basically a server role that helps you maintain the health and security of your corporate network. This server role includes the following components.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Network Policy Server (NPS)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>· Health Registration Authority (HRA)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Host Credential Authorization Protocol (HCAP)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Network Policy Server (NPS)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>NPS is a network component of the Windows server system. With this component, you can create network access policies at the organization level. Thanks to these rules, you can set the protocols to be used in the health check, authentication and authorization processes of the clients that will connect to the company network. Again, a Windows server operating system with NPS can also act as a RADIUS Proxy, that is, it can direct incoming requests to a remote RADIUS server.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Health Registration Authority (HRA)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>It is one of the NAP Components. Its main task is to provide certificates for clients with confirmed health. Thanks to this certificate, client machines with appropriate health status can securely communicate with clients in the other intranet over the IPSec protocol. In other words, it plays a fundamental role for IPSec rules in the NAP infrastructure.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Host Credential Authorization Protocol (HCAP)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>HCAP is basically a protocol that enables Microsoft Network Access Protection (NAP) solution and Cisco Network Admission Control product to work together.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>In case of using HCAP with NPS and NAP, Cisco 802.1x clients can connect to our network through our existing access policies.</p>
<!-- /wp:paragraph -->
