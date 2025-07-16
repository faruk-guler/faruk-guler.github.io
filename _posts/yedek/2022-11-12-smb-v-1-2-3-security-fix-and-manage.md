---
layout: post
title: SMB v.1, 2, 3 Security Fix and Manage
date: 2022-11-12 09:55
author: theguler
comments: true
categories: [Hacking - Security]
---
<!-- wp:image {"id":2148,"width":"399px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-as-admin.webp?w=1024" alt="" class="wp-image-2148" style="width:399px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>SMB</strong> (Server Message Block) is a communication protocol used for file sharing, printer sharing and other resources sharing on the network. <strong>SMB1 is an older version</strong> of this protocol and is generally not recommended because it contains security vulnerabilities.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Microsoft and other security experts recommend discontinuing the use of SMB1 and disabling it if possible. Because SMB1 has known security vulnerabilities and modern SMB versions (SMB2 and SMB3) are more secure.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This is often a consideration for network security or management policies. Continuing to use SMB1 may increase potential security risks. So, the recommended step is to disable SMB1 and switch to <strong>modern SMB versions.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Server: Server 2012 R2 and 2016 and later</strong><br><strong>Detect:</strong><br>Get-SmbServerConfiguration | select EnableSMB1Protocol,EnableSMB2Protocol,EnableSMB3Protocol<br><br><strong>SMBv1 Protocol Set:</strong><br>#Set-SmbServerConfiguration -EnableSMB1Protocol $false<br>#Set-SmbServerConfiguration -EnableSMB1Protocol $true<br><br><strong>SMB v2/v3 Protocol Set:</strong><br>#Set-SmbServerConfiguration -EnableSMB2Protocol $false<br>#Set-SmbServerConfiguration -EnableSMB2Protocol $true<br><br><strong>Client:Windows 8.1 and Windows 10 and later</strong><br><br><strong>SMB v1</strong> <strong>Protocol</strong> <strong>Detect/Set:</strong><br><strong>Detect:</strong><br>Get-WindowsOptionalFeature –Online –FeatureName SMB1Protocol<br>#Disable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol<br>#Enable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol<br><br><strong>SMB v2/v3 Protocol</strong> <strong>Detect/Set:</strong><br><strong>Detect:</strong><br>Get-SmbServerConfiguration | Select EnableSMB2Protocol<br>#Set-SmbServerConfiguration –EnableSMB2Protocol $false<br>#Set-SmbServerConfiguration –EnableSMB2Protocol $true</pre>
<!-- /wp:preformatted -->
