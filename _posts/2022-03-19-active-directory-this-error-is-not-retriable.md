---
layout: post
title: Active Directory operation failed on Exchange.guler.com. This error is not retriable.
date: 2022-03-19 18:25
author: theguler
comments: true
categories: [Fix - Troubleshooting]
---
<!-- wp:image {"id":2330,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/exchange-err.png?w=413" alt="" class="wp-image-2330" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>&nbsp;Active Directory operation failed on Exc.guler.com This error is not retriable.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Additional information: Access is denied.Active directory response: 00000005: SecErr: DSID-03152612, problem 4003 (INSUFF_ACCESS_RIGHTS), data 0</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>ECP ekranında kullanıcı/grup özelliklerine girildiğinde&nbsp; ” Grup Temsilcisi ” alanına kullanıcıyı eklemek yada silmek istediğinizde bu hatayı alabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>When you enter the user/group properties on the ECP screen, you may get this error when you want to add or delete the user in the "Group Representative" field.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":2334,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/retrival_exc.png?w=807" alt="" class="wp-image-2334" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Let's open Active Directory Users and Computers.
Click Advanced Features from the View menu.
Right on the OU where the user and group to be mailed to are located &gt; <strong>Properties
Let's go to Security &gt; Advanced.</strong>
Permissions &gt; Add
On the screen that opens, let's select the Exchange trusted subsystem in the Principal part.
<strong>TYPE : Allow</strong>
L<strong>et's mark Applies to :This object and all descendants objects.</strong>
Let's tick Modify Permissions from the Permissions list.
Let's save it by clicking Apply.
Enjoy

Active Directory Users and Computers açalım.
View menüsünden <strong>Advanced Features</strong> tıklayalım.
Yerine mail atılacak kullanıcı ve grubun olduğu OU üzerinde s<strong>ağtık &gt; Properties
Security &gt; Advanced</strong> kısmına gelelim.
<strong>Permissions &gt; Add</strong>
Açılan ekranda Principal kısmına Exchange trusted subsystem seçelim.
<strong>TYPE : Allow</strong>
<strong>Applies to :This object and all descendants objects işaretleyelim.</strong> 
Permissions listesinden Modify Permissions işaretleyelim.
Apply diyerek kaydedelim.</pre>
<!-- /wp:preformatted -->
