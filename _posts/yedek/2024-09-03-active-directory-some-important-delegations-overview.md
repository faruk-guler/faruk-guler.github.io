---
layout: post
title: Active Directory Delegations [Overview]
date: 2024-09-03 21:57
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:image {"id":1879,"width":"556px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/delegasyon.png?w=770" alt="" class="wp-image-1879" style="width:556px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Delegation is a process of transferring authority,</strong> especially in large and complex Active Directory environments. This process allows people who manage a system to give teams below them the authority to perform certain tasks. This way, administrative tasks can be performed more quickly and efficiently. For example, people working on the user help desk team can gain the authority to manage user accounts. <strong>***</strong> For security reasons, I recommend that you be very careful when granting these permissions.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Informations</strong><br><br><strong>- </strong>Granted permissions are valid only for the selected OU and Tree.<br>- You can remove and edit permissions from the Security tab.</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":14347,"width":"457px","height":"auto","sizeSlug":"large","linkDestination":"none","style":{"color":{"duotone":"unset"}}} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/perm_obj.png?w=1024" alt="" class="wp-image-14347" style="width:457px;height:auto" /><figcaption class="wp-element-caption">The field shown in Picture is important. Checking the checkboxes gives the authorized user/group the <strong>[right] </strong>to create and delete the selected object subgroup.</figcaption></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>##Frequently used Delegations</strong><br><strong>####################################</strong><br><br><strong>Authorization to create and delete users or groups</strong><br><br>OU &gt; delegate control &gt; create &amp; delete &amp; manage user account ve create &amp; delete &amp; manage and force next logon and groups<br><br><strong>User account password reset authorization</strong><br><br>OU &gt; delegate control &gt; Reset User Passwords and Force Password Change at Next Logon<br><br><strong>User account Lock/Unlock authorization</strong><br><br>OU &gt; delegate control &gt; Create a custom task to delegate &gt; Select: User objects &gt; Property-specific &gt; Read check lockoutTime and Write lockoutTime boxes<br><br><strong>Authorization</strong> <strong>User account enable/disable</strong><br><br>OU &gt; delegate control &gt; Create a custom task to delegate &gt; Select: User objects &gt; General &amp; Property-specific &gt; Read userAccountControl &amp; Write userAccountControl<br><br><strong>Authorization to add &amp; remove clients to domain </strong><br><br>OU &gt; delegate control &gt; Create a custom task to delegate &gt; Select Computer objects &gt; Create selected objects in this folder and Delete selected objects in this folder checkbox &gt; General and Creation/Deletion of specific child objects &gt; Create All Child Objects and Delete All Child Objects<br><br><strong>Authorization to create and delete new OU and subtree</strong><br><br>OU &gt; delegate control &gt; Create a custom task to delegate &gt; create and delete selected &gt; Organizational Unit objects &gt; General &gt; create &amp; delete child objects<br><br><strong>Attribute Editing Authorization</strong><br><br>OU &gt; delegate control &gt; Create a custom task to delegate &gt; Only the following objects in the folder &gt; User objects &gt; Uncheck General, Only check Property-specific &gt; check Attribute Name<br><br><strong>Authorization to Rename Computers</strong><br><br>OU&gt; delegate control &gt; Create a custom task to delegate &gt; Computer objects &gt; &gt; General &amp; Property-specific &gt; Checkbox Write All Properties<br><br><strong>##TheGuler0x</strong><br><br><strong>Yararlı Olması Dileğiyle. – Hope it will be useful.</strong></pre>
<!-- /wp:preformatted -->
