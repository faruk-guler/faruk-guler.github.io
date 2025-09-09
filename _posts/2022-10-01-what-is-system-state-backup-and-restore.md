---
layout: post
title: What is System State Backup and Restore?
date: 2022-10-01 23:12
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":4934,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/restore_backup.png?w=400" alt="" class="wp-image-4934" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>System State Backup and Restore, also known as (Active Directory Backup) is actually used in environments without Active Directory and backs up boot files and windows operating system files and registry contents in the boot partition. However, the general use of the application today is (taking an Active Directory backup).<br>The items that the application can fully back up are as follows;</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Boot Files</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>OS files (%windir%)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Internet Information Services metadirectory</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Registry</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Cluster Services info</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Active Directory Certificate Services database</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Active Directory database and log files</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>COM+ Class registration database</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Sysvol share folder (directory with group policy and scripts)</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>We need the Windows Server Backup application to perform the backup process. The application does not come installed by default. First we need to install it.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
