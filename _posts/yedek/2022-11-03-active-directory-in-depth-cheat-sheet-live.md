---
layout: post
title: Active Directory in Depth Cheat Sheet -Live
date: 2022-11-03 22:21
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:image {"id":13725,"width":"442px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ad-detailed-ch.jpg?w=1024" alt="" class="wp-image-13725" style="width:442px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>What is Forest?</strong><br>It is the highest level management unit in the Active Directory (AD) structure, formed by the logical combination of multiple domains. Forest contains all domains and inter-domain relationships in AD.It must contain at least 1 domain.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Forest, Domain, Child Domain, Site, RODC, GC, Schema, FSMO, DSRM, LDAP</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Domain Functional Level and Forest Functional Level: +Upgrade:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Forest Functional Level (FFL):</strong> Determines the operating system-based version of the Domain Controllers in all your Domain Controller servers in your Forest structure.<br><strong>Domain Functional Level (DFL):</strong> Determines the operating system version of all Domain Controller servers within your domain structure on a Domain Controller basis.<br><br><strong>&gt; Domain &gt; Properties</strong><br><strong>&gt; Active Directory Domains and Trusts &gt; Raise FL</strong><br><br><strong>DFL and FFL Levels:</strong><br>Windows 2000 Native<br>-----<br>Windows Server 2012 R2<br>Windows Server 2016<br>Windows Server 2019<br>-----<br><br><strong>Important Notes:</strong><br>- In order to use new features, both DFL and FFL levels must be at the appropriate level.<br>- Each DFL and FFL level offers new features and improvements compared to previous levels.<br>- FFL and DFL levels cannot be lowered after they have been raised.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Active Directory DNS:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">- AD cannot be established and managed without DNS.<br>- AD can be set up with an additional DNS.<br>- AD Data of integrated zones are kept in the AD Database.<br>- </pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Active Directory Domains and Trusts:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Active Directory Sites and Services:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Active Directory Trust Relationships:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Domain Controller +Migration, +Backup &amp; Restore, +Remove:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>- Backup &amp; Restore: </strong>Recycle Bin, System State, 3rd Party</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Group Policy Management:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>About LDAP:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>LDAP Ports:</strong><br>Port 389: (LDAP)<br>Port 636: (LDAPS)</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Stay hungry to learn. .\Faruk GÜLER</strong></p>
<!-- /wp:paragraph -->
