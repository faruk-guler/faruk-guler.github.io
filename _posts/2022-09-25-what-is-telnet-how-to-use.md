---
layout: post
title: What is Telnet How to use?
date: 2022-09-25 17:22
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":4797,"width":481,"height":265,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/telnet_cmd.jpeg?w=607" alt="" class="wp-image-4797" width="481" height="265" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Hi dears, in this article, we will tell you what telnet service we use frequently in our business life and<br>I will talk about its use. First of all, Telnet runs on the TCP/IP protocol. Telnet, a network<br>device or a remote computer remote access service. As I mentioned above TCP/IP<br>It is part of the protocol stack.<br>Telnet client service is installed by default on Windows Server 2019 operating system<br>is not coming. First, components will need to be installed on the client and server. telnet<br>To install the service, select the roles and Features wizard from the server manager.<br>Features Installation can be done easily by selecting Telnet client. Windows 2019 operating system<br>There is no Telnet server component on it. Newer ones like Powershell Remoting instead<br>You can use next-generation services. Operating the Telnet Server component on Windows Server 2016 and 2019</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><br>It should be noted that it does not come built-in on the systems.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>After the Telnet client installation mentioned above is done, the service named Telnet is disabled.<br>case will come. You can activate it from services.msc if you wish, or you can use the command line.<br>over;<br>net start telnet can start the service,<br>You can also stop the service in the form of net stop telnet.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>After the Telnet client installation mentioned above is done, the service named Telnet is disabled.<br>case will come. You can activate it from services.msc if you wish, or you can use the <strong>command line:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#can start the service</strong>
net start telnet

<strong>#to stop the service</strong>
net stop telnet</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Telnet client application on Windows Server 2019; users to a server<br>to connect and manage server resources using command line tools.<br>provides their use. Maximum 2 people at the same time by default to a Telnet server<br>can be connected. You can increase this number if you wish. What you need to do to increase Windows Server<br>By logging into the command line on the telnet server:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#You can upgrade with this command. It should also be said that;
You can configure the settings you want on Telnet with the config command. For example, Telnet
service communicates over port 23:</strong>
tlntadmn config maxconn=10 #

<strong>#To forward to port 500:</strong>
tlntadmn config port =500

<strong>#To open the Telnet server management console on the server:</strong>
tlntadmn</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Using Telnet</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>We said that you need to type <strong>"tlntadmn"</strong> on the command line to run the telnet service. General<br>usage is as follows</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">tlntadmn [computer-name] [options] start | stop | pause | continue | -s | -k | -m | config</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>You can use the following parameters to use the Telnet service:</strong><br><strong>-s parameter: </strong>Lists the connections made to the Telnet server.<br><strong>-m parameter</strong>: It is used to send a message to a session on Telnet server.<br><strong>-k parameter:</strong> Terminates connections to Telnet server.<br><strong>-config parameter:</strong> It is used to set telnet server parameters and registry values.<br><strong>-u parameter: </strong>Used to create a user account.<br><strong>-p parameter: </strong>Used to set the user password</p>
<!-- /wp:paragraph -->
