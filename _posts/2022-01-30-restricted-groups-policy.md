---
layout: post
title: What is Restricted Groups?
date: 2022-01-30 16:58
author: theguler
comments: true
categories: [Windows Group Policy GPO]
---
<!-- wp:image {"id":1155,"width":"344px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/gpo_logo.jpg?w=439" alt="" class="wp-image-1155" style="width:344px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Specifying and limiting which accounts on computers can be members of local groups can sometimes be necessary on systems running in an AD domain. Specifically, the local administrators group is the group with the highest privileges on computers in the domain. User accounts that are members of this group can perform operations such as uninstalling, installing, writing and executing programs, adding new members, etc. Also, by default, the Domain Administrators group is a member of the Local Administrators group for the entire domain. (<strong>**</strong> <strong>I recommend removing this for security purposes</strong>) Therefore, specifying and limiting which accounts can be members of these groups is very important for security purposes.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The Restricted Groups policy setting has been around since the earliest versions of Windows. However, it is not as comprehensive or flexible as the Preferences/Local Users and Groups policy setting. It has one purpose: to compare the list sent through this policy to Clients and purge members in local groups that are not included in the GPO (even if added by the client administrator)</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p><strong>How do I make a Restricted Groups Policy?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Computer Configuration &gt; Windows Settings &gt; Security Settings &gt; Restricted Groups</strong> <strong>&gt;</strong> <strong>Add Group</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>You can directly type the name of the local group you want to control, or you can find a <strong>Computer Account in the AD</strong> structure by clicking Browse and select the local group name via the <strong>remote computer account.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Information:</strong><br><strong>-</strong> Domain administrators group can be added here, but it poses a potential security risk.<br><strong>-</strong> This can be applied based on policy (Computer Configuration). For this reason, computer accounts must be included under the OU to which the Restricted Groups policy setting is linked.<br>- Another feature of this policy is that when this GPO is removed, the remnants in the SAM database on the clients are cleaned up and returned to their original state.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>**NOTE</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>1# Members of this group:</strong> In this section, (**Add Group) you should add <strong>the user accounts or groups</strong> you want to make members of the group you selected as the target. It is more strict and will delete all other members, it works as Overwrite. (<strong>***</strong>If the target group is left blank, all members except the administrator on the client side will be deleted.)</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":14864,"width":"480px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/rest_2-2.png?w=756" alt="" class="wp-image-14864" style="width:480px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p><strong>2# This group is a member of:</strong> This section is more secure and healthy. (Existing members in the group you target will not be deleted and because it does not work as Overwrite, so you will not break the target group) You can only create a default group or a specific group <strong>(**ITHelpdesk, etc.)</strong> and add it to the target group. Unfortunately, this section is not strict and you will tolerate members added by client admins, This may pose a security risk.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":14861,"width":"523px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/rest_2-1.png?w=822" alt="" class="wp-image-14861" style="width:523px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Hope it is useful. – Best regards.</strong></p>
<!-- /wp:paragraph -->
