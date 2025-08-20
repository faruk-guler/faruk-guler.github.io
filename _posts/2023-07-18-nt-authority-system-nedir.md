---
title: "Ghidra NSA'nın Tersine Mühendislik Araç Seti"
author: faruk-guler
date: 2022-11-26 00:44:00 +07:00
categories: [Reverse Engineering]
tags: [Reverse Engineering, PoC,]
layout: post
published: true
---

<!-- wp:gallery {"linkTo":"none"} -->
<figure class="wp-block-gallery has-nested-images columns-default is-cropped"><!-- wp:image {"id":11231,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/nt-user.jpg?w=1024" alt="" class="wp-image-11231" /></figure>
<!-- /wp:image --></figure>
<!-- /wp:gallery -->

<!-- wp:paragraph -->
<p>“NT AUTHORITY\SYSTEM” refers to the user account with the highest privileges on the system in Windows NT and later versions. This account is used by the operating system to execute or manage a program or process. The “SYSTEM” account has a much higher level of permissions and authorities than regular user accounts. Access to this account is typically used for operations required at the administrator level.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>- Has the highest privileges: SYSTEM is the account with the highest privileges on a system, including full access to the operating system’s kernel mode. This includes the ability to perform operations such as making file and registry changes, starting and stopping services, and performing operations that are not permitted to other users. For example, some versions of SQL Server use the NT AUTHORITY\SYSTEM account.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>- Cannot be created or deleted by the user: The SYSTEM account is automatically created by the operating system and cannot be managed by a user.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>- The SYSTEM account has no password because a local “token” is used for authentication instead of a password.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>- The SYSTEM account does not have a profile for logging in.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>- The SYSTEM account cannot be used to access a computer remotely.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>- It is used to manage the services of the operating system.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>- Accessing system resources: The SYSTEM account is used to access system resources such as files and registry.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>- The SYSTEM account is used to perform administrative tasks such as creating and deleting user accounts, managing groups, and configuring system policies.</p>
<!-- /wp:paragraph -->


<!-- wp:paragraph -->
<p>- Backup and Restore: Backup software can usually access and back up all files and folders using the “NT AUTHORITY\SYSTEM” account.</p>
<!-- /wp:paragraph -->


<!-- wp:paragraph -->
<p>- Security: This account has the highest security privileges in the system. Therefore, malwares may try to take over this account.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Important: Due to the privileges of the SYSTEM account, it is important that only authorized users use this account. Access to the SYSTEM account by unauthorized users may compromise the security and integrity of the system.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Defend yourself, be stay strong. -Faruk GULER</p>
<!-- /wp:paragraph -->
