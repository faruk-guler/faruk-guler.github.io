---
layout: post
title: Delete User Profiles Older Than a Specified Number Days [GPO]
date: 2022-07-21 23:25
tags: [AD]
author: theguler
comments: true
categories: [Windows Group Policy GPO]
---
<!-- wp:image {"id":3626,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/siler.png?w=1024" alt="" class="wp-image-3626" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>This policy setting allows an administrator to automatically delete user profiles on system restart that have not been used within a specified number of days. Note: One day is interpreted as 24 hours after a specific user profile was accessed.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>If you enable this policy setting, the User Profile Service will automatically delete on the next system restart all user profiles on the computer that have not been used within the specified number of days.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>If you disable or do not configure this policy setting, User Profile Service will not automatically delete any profiles on the next system restart.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>GPO:</strong> <strong>Computer Configuration -&gt; Administrative Templates -&gt; System -&gt; User Profiles.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The main troubles associated with this automatic method of profile removal is waiting for the server restart and non-selectivity (you cannot prohibit deleting certain user profiles like local accounts, administrative accounts, etc.). Also, this policy may not work if some third-party software (most often it is an antivirus) accesses NTUSER.DAT file in user profiles and updates the date of last use.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
