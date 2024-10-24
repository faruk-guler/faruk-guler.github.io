---
layout: post
title: Hiding Server Name and Ip Address in mail Header in Exchange
date: 2022-09-30 22:18
author: theguler
comments: true
categories: [Microsoft Exchange Server]
---
<!-- wp:image {"id":4918,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/exchange-server.jpg?w=810" alt="" class="wp-image-4918" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>If you are using a Microsoft Exchange Server with default settings in your company, the hostname and IP address information of your Exchange Server will be forwarded to the recipients in the header section of the mail content sent by the users.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>For security reasons, many administrators do not want Exchange server computer names and IP addresses to appear in the message header. In this article, we will cover removing Exchange Server computer names and IP address from email header.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#First of all, let's learn the Exchange Server send connector name</strong>
	
Get-SendConnector

<strong>#Identity       AddressSpaces Enabled
#--------       ------------- -------
#Dis-email {SMTP:*;1}    True</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Then find the send connector permissions assigned to Security principals. The security principal is <strong>NT AUTHORITY\ANONYMOUS LOGON</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Get-SendConnector "<strong>Dis-email</strong>" | Get-ADPermission | Where-Object { $_.ExtendedRights -like "*routing*"} | Format-table User,AccessRights,ExtendedRights</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>We need to remove Ms-Exch-Send-Headers-Routing permission from NT AUTHORITY\ANONYMOUS LOGON.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">	
Get-SendConnector "<strong>Dis-email</strong>" | Remove-ADPermission -AccessRight ExtendedRight -ExtendedRights ms-Exch-Send-Headers-Routing -User "NT AUTHORITY\ANONYMOUS LOGON"</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Verify that NT AUTHORITY\ANONYMOUS LOGON is not shown in the output.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Get-SendConnector "<strong>Dis-email</strong>" | Get-ADPermission | Where-Object { $_.ExtendedRights -like "*routing*"} | Format-table User,AccessRights,ExtendedRights</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>To check this process, send an e-mail to a real recipient. After that, analyze the received headers in the message. Make sure that Exchange Server internal names and IP addresses are not shown in the email header information.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Your Mail recipients will still see your server name if you haven't set a "FQDN" in the Send connector. I definitely recommend that you define a "FQDN" information in Send Connector. You can do this with Exchange Admin Center or Exchange PowerShell.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Check the Send Connector FQDN with Exchange Management Shell. In the command output below, we can see that the FQDN is empty.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Get-SendConnector -id "<strong>Dis-email</strong>" | Format-Table Name,Fqdn

#Name      FQDN
#--------  -----
#Dis-email</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Run the following command to define the <strong>"FQDN"</strong> for the Send Connector.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Get-SendConnector -id "<strong>Dis-email</strong>" | Set-SendConnector -Fqdn:mail.farukguler.net

#Name         FQDN
#--------     -----
#Dis-email    <strong>mail.farukguler.net</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>If you need to undo these changes; Use the Add-AdPermission command instead of Remove-ADPermission.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Get-SendConnector "<strong>Dis-email</strong>" | <strong>Add-ADPermission</strong> -User "NT AUTHORITY\ANONYMOUS LOGON" -ExtendedRights ms-Exch-Send-Headers-Routing
</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Umarım faydalı olmuştur. – I hope it was helpful</strong>.</p>
<!-- /wp:paragraph -->
