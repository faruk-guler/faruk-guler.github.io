---
layout: post
title: Exchange Server içerik odaklı mailler nasıl silinir
date: 2022-03-19 18:45
author: theguler
comments: true
categories: [Microsoft Exchange Server]
---
<!-- wp:image {"id":2148,"width":423,"height":237,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-as-admin.webp?w=1024" alt="" class="wp-image-2148" width="423" height="237" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Örneğimizde sunucunuz üzerindeki tüm <strong>DB' lerderdeki </strong>tüm mailboxlar içinde body yani mail içerisinde “Bu teklifle ilgileniyorsan” ibaresi geçen tüm mailler reklam içerdiği gerekçesiyle acilen silinecektir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bulma ve silme işlemini öncesinde işlemi yapacak olan Exchange yöneticisine <strong>Mailbox Search</strong> ve <strong>Mailbox Import</strong> <strong>Export</strong> yetkilerinin atanması gerekmektedir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>In our example, in all mailboxes in all DBs on your server, all mails with the phrase "If you are interested in this offer" in the body will be deleted on the grounds that they contain advertisements.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Before the discovery and deletion process, the Exchange administrator must be assigned <strong>Mailbox Search </strong>and <strong>Mailbox Import Export </strong>privileges.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Komutu uygulamadan önce mutlaka yedeğinizi almış olun.
Make sure you have a backup before applying the command.</strong>

<strong>Bulma:</strong>
Get-Mailbox -ResultSize unlimited | Search-Mailbox -SearchQuery ‘Body:”<strong>If you are interested in this offer</strong>”’ –EstimateResultOnly

<strong>Silme:</strong>
Get-Mailbox -ResultSize unlimited | Search-Mailbox -SearchQuery ‘Body:”<strong>If you are interested in this offer</strong>”’ –DeleteContent -Force</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Faydalı olması dileğiyle – Hope it’s useful</strong></p>
<!-- /wp:paragraph -->
