---
layout: post
title: NT AUTHORITY SYSTEM Nedir?
date: 2025-08-23 00:51
author: faruk-guler
comments: true
categories: [Windows]
---
<!-- wp:image {"id":15489,"width":"516px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://sddfder.wordpress.com/wp-content/uploads/2024/12/large_files_.png?w=625" alt="" class="wp-image-15489" style="width:516px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>NT AUTHORITY\SYSTEM </strong>refers to the user account with the highest privileges on the system in Windows NT and later versions. This account is used by the operating system to execute or manage a program or process. The "SYSTEM" account has a much higher level of permissions and authorities than regular user accounts. Access to this account is typically used for operations required at the administrator level.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Has the highest privileges</strong>:&nbsp;<strong>SYSTEM</strong>&nbsp;is the account with the highest privileges on a system, including full access to the operating system's kernel mode. This includes the ability to perform operations such as making file and registry changes, starting and stopping services, and performing operations that are not permitted to other users. For example, some versions of SQL Server use the NT AUTHORITY\SYSTEM account.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Cannot be created or deleted by the user:&nbsp;</strong>The SYSTEM account is automatically created by the operating system and cannot be managed by a user.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>The SYSTEM account has no password because a local "token" is used for authentication instead of a password.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>The SYSTEM account does not have a profile for logging in.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>The SYSTEM account cannot be used to access a computer remotely.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>It is used to manage the services of the operating system.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Accessing system resources:</strong>&nbsp;The SYSTEM account is used to access system resources such as files and registry.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>The SYSTEM account is used to perform administrative tasks such as creating and deleting user accounts, managing groups, and configuring system policies.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Backup and Restore:&nbsp;</strong>Backup software can usually access and back up all files and folders using the "NT AUTHORITY\SYSTEM" account.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Security:</strong>&nbsp;This account has the highest security privileges in the system. Therefore, malwares may try to take over this account.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Important:&nbsp;</strong>Due to the privileges of the SYSTEM account, it is important that only authorized users use this account. Access to the SYSTEM account by unauthorized users may compromise the security and integrity of the system.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Defend yourself, be stay strong. -Faruk GULER</strong></p>
<!-- /wp:paragraph -->
