---
layout: post
title: What is Microsoft Exchange 2019 Edge Transport?
date: 2022-07-31 15:31
author: theguler
comments: true
categories: [Microsoft Exchange Server]
---
<!-- wp:image {"id":3816,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/exchange-edge-transport.png?w=695" alt="" class="wp-image-3816" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>The Edge Transport role is an optional Exchange role that is typically installed on a server in an Exchange organization's DMZ network and is designed to minimize the organization's attack surface. The Edge Transport server role manages the entire internet-facing mail flow by providing SMTP relay and smart host services for on-premises Exchange servers in your organization. Agents running on the Edge Transport server provide additional layers of message protection and security, while these agents protect against spam and enforce mail flow rules (also known as transport rules) to control mail flow. All of these features work together to help minimize the exposure of your internal Exchange to threats on the Internet. If you do not want to expose the on-premises Exchange servers directly to the internet, you have the option to use the Edge Transport servers.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Because the Edge Transport server is installed in the DMZ network, it is never a member of your organization's internal Active Directory forest and cannot access Active Directory information. However, the Edge Transport server requires data that resides in Active Directory: for example, connector information for mail flow and recipient information for antispam recipient tasks. This data is synchronized to the Edge Transport server by the Microsoft Exchange EdgeSync service (EdgeSync). EdgeSync is a collection of operations executed on an Exchange 2010, Exchange 2013, Exchange 2016, or Exchange 2019 mailbox server to provide one-way replication of recipient and configuration information from Active Directory to the Active Directory Lightweight Directory Services (AD LDS) service on the Edge Transport server. EdgeSync copies only the information required for the Edge Transport server to perform antispam configuration tasks and enable end-to-end mail flow.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>In summary, it is a good security practice for your Exchange environment; With the Edge role, you can better isolate your mailbox role from the internet. Edge also helps you manage spam and email security policies.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Exchange 2013-2019-2019 organizations that want to use Edge Transport servers have the option to use Edge Transport servers by having the latest Exchange 2010 or higher. Exchange 2019 version does not support Exchange 2010. For up-to-date information, please check the reference link below.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>https://docs.microsoft.com/en-us/exchange/plan-and-deploy/system-requirements?view=exchserver-2019#supported-coexistence-scenarios-for-exchange-2019</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>https://docs.microsoft.com/en-us/exchange/plan-and-deploy/system-requirements?view=exchserver-2016#supported-coexistence-scenarios-for-exchange-2016</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>You can also set up multiple Edge Transport servers in the DMZ network. Deploying more than one Edge Transport server provides backup and failover features for your incoming message flow, and you can distribute SMTP traffic between Edge Transport servers in your organization by defining multiple MX records with the same priority value for your mail domain.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>When we examine the architecture of the edge role;</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>From Mailbox servers to EDGE servers, port 50636 should be open,</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Bi-directional port 25 is open between EDGE servers and Mailbox servers,</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Bi-directional port 25 for mail traffic from External to Internal EDGE servers,</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>In order to access the outside world via EDGE servers, 53/UDP,53/TCP DNS ports must be open.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image {"id":3823,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/ex2019edge_16-1.png?w=769" alt="" class="wp-image-3823" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
