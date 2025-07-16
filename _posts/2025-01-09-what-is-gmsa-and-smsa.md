---
layout: post
title: What is gMSA and sMSA?
date: 2025-01-09 01:07
By: faruk-guler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":15489,"width":"558px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/gmsa_ad.JPG?w=625" alt="" class="wp-image-15489" style="width:558px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading"><strong>gMSA (Group Managed Service Account)</strong></h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Group Managed Service Account (gMSA) is an account type introduced in Windows Server 2012. gMSAs provide automatically managed, highly secure accounts across multiple servers or services. gMSA securely manages these passwords through Active Directory and automatically renews them at specified intervals, by default every 30 days. [To create a GMSA account, you will need the Active Directory module of Server 2012 or later]</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>SMSA (Stand-Alone Managed Service Account)</strong></h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Stand-Alone Managed Service Account (SMSA) is a service account designed for use on a single server, introduced with Windows Server 2008 R2. SMSA is the predecessor of gMSA. Designed for a single server and does not require a domain. I will not cover the SMSA account in this article [because Windows Server 2008 support has ended]</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>How to Create - Configure gMSA?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Query/Create KDS Root Key:</strong><br>Get-KdsRootKey<br>#Add-KdsRootKey -EffectiveImmediately<br>Add-KdsRootKey -EffectiveTime (Get-Date).AddHours(-10) <strong>[Activate root key Now]</strong><br><br><strong>#Create gMSA Account:</strong><br>New-ADServiceAccount -Name <strong>IISgMSAAccount</strong> -DNSHostName <strong>guler.com</strong> -PrincipalsAllowedToRetrieveManagedPassword <strong>"IIS_Servers" [Can be added individually "iisServer1$,iisServer2$"]</strong><br><br><strong>#Activate/Query gMSA Account on Server:</strong><br>Install-ADServiceAccount -Identity <strong>"IISgMSAAccount"</strong><br>Test-ADServiceAccount -Identity <strong>IISgMSAAccount</strong><br><br><strong>#Use gMSA Account:</strong><br>Enter the gMSA account in the format <strong>DOMAIN\MygMSAAccount$</strong> The <strong>$</strong> sign indicates that it is a service account.<br><br><strong>#Password Management/General Query:</strong><br>Set-ADServiceAccount -Identity "<strong>IISgMSAAccount</strong>" -PasswordChangeInterval <strong>15</strong><br>Get-ADServiceAccount -Identity <strong>"IISgMSAAccount"</strong> -Properties *</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>SMSA 🆚 GMSA</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The choice to choose one over the other depends on the requirement of the application or service that will use these accounts. If the application is on a single server only, you can use an sMSA, but if the service needs to run on multiple servers, You should choose gMSA that provides this width.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Additionally, Windows Server 2025 introduced the Delegated Managed Service Account (dMSA) as a natural successor to gMSA and sMSA. It is a new service account model that takes things further in terms of security and flexibility.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-farukguler</p>
<!-- /wp:paragraph -->
