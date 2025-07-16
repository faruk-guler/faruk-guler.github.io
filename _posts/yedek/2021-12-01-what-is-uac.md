---
layout: post
title: What is UAC? User Account Control Disabled Group Policy
date: 2021-12-01 13:03
author: theguler
comments: true
categories: [Windows Group Policy GPO]
---
<!-- wp:image {"id":237,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/uac-user-account-control.jpg?w=310" alt="" class="wp-image-237" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>User Account Control (UAC) is a security component in Windows operating systems. "UAC allows users to temporarily escalate their privileges so they can perform tasks that require administrative privileges, such as switching users, logging out, or using the Run As feature."</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The main purpose of UAC is to increase the security of users and limit unauthorized or potentially harmful actions. UAC obtains your permission by presenting you with a warning or confirmation screen when you want to perform an operation that requires administrative authority. These screens prevent the user from unintentionally or unknowingly initiating a harmful process.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>"Computer Configuration &gt; Policies &gt; Windows Settings &gt; Security Settings &gt; Local Policies &gt; Security Options" </strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>To completely disable UAC, you can adjust the main parameter values ​​I have mentioned below.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>1:</strong> User Account Control: Behavior of the elevation prompt for administrators in Admin Approval Mode = <strong>Elevate without prompting</strong>

<strong>2:</strong> User Account Control: Detect application installations and prompt for elevation = <strong>Disabled</strong>

<strong>3: </strong>User Account Control: Only elevate UIAccess applications that are installed in secure locations = <strong>Disabled</strong>

4:User Account Control: Run all administrators in Admin Approval Mode = <strong>Disabled</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":9282,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/uac_select_now.png?w=984" alt="" class="wp-image-9282" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>(UAC) is a security component in Windows operating systems designed to increase the security of users and limit unauthorized or harmful actions. UAC gives users greater control and security to perform operations that require administrative authority.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>***Disabling User Account Control is not recommended because it allows users to make unauthorized changes to your computer.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Good Luck</strong></p>
<!-- /wp:paragraph -->
