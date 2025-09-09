---
layout: post
title: Exchange Server 2019 Relay Connector Configuration
date: 2022-07-27 21:53
author: theguler
comments: true
categories: [Microsoft Exchange Server]
---
<!-- wp:image {"id":3728,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/exchange-2013-smtp-relay-1.png?w=397" alt="" class="wp-image-3728" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Exchange servers, as it is known, use the SMTP protocol for mail traffic and authentication. It is necessary to give Relay permission on Exchange Server to get information from Printers, Firewalls and Switches, etc. software and hardware that do not have the ability to authenticate for SMTP.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>1- To create a new Relay connector, we connect to the ECP screen and create a new connector. We give our connector a new name. We proceed with Frontend in the Role part and Custom in the Type part.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>2- It specifies which ip and port the connector we will create will provide access. It comes with 25 ports as standard. I recommend that you change it.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>3- We change our default port: <strong>8181</strong> After changing our port, we continue.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>4- We determine which IP Addresses will use the connector we created.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>5- We choose the Anonymous option from the Security features of the connector we created.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>6- We are trying to connect using <strong>telnet servic</strong>e through the server we allow to test the connector. Thanks to the connector, we were able to successfully connect to our mail server.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>7- We can perform all the operations we do in one go with the help of the following <strong>Powershell ISE command.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:gallery {"linkTo":"none"} -->
<figure class="wp-block-gallery has-nested-images columns-default is-cropped"><!-- wp:image {"id":3729,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/relay-ecp.png?w=1024" alt="" class="wp-image-3729" /></figure>
<!-- /wp:image --></figure>
<!-- /wp:gallery -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>New-ReceiveConnector -Name Printer -TransportRole Frontend -Custom -Bindings 0.0.0.0:8181 -RemoteIPRanges 10.5.10.45 -PermissionGroups AnonymousUsers</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>8- If we have more than one server and we want to create a connector on a particular server, you can apply the following command.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>New-ReceiveConnector -Name Printer -TransportRole Frontend -Custom -Bindings 0.0.0.0:8181 -RemoteIPRanges <strong>10.5.10.45</strong> -PermissionGroups AnonymousUsers -Server ExcGuler</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>9- That was the action. If we want to get information about our current connectors, you can use the command below. In the command below, we list our connectors using port 8181.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Get-ReceiveConnector | where {$_.Bindings -like '*8181'} | Format-List Identity,RemoteIPRanges,PermissionGroups,AuthMechanism </strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
