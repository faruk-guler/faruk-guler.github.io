---
layout: post
title: Exchange Server Konuya göre mail silmek
date: 2022-03-19 18:38
author: theguler
comments: true
categories: [Microsoft Exchange Server]
---
<!-- wp:paragraph -->
<p>Örneğimizde sunucunuz üzerindeki tüm<strong> DB'lerden</strong> tüm mailboxlar içinde konu kısmında “Hemen 100 dolar kazan” ibaresi geçen tüm mailler reklam içerdiği gerekçesiyle silinmek istenirse;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bulma ve silme işlemini öncesinde işlemi yapacak olan Exchange yöneticisine <strong>Mailbox Search</strong> ve <strong>Mailbox Import Export </strong>yetkilerinin atanması gerekmektedir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>In our example, if you want to delete all mails from all DBs on your server, among all mailboxes, with the phrase "technology summit" in the subject part, on the grounds that they contain advertisements;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Before the discovery and deletion process, the Exchange administrator must be assigned <strong>Mailbox Search</strong> and <strong>Mailbox Import Expor</strong>t privileges.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Uygulamadan önce mutlaka yedeğinizi alınız.!
Be sure to take a backup before applying.!</strong>

<strong>Bulma:</strong>
Get-Mailbox -Resultsize unlimited | Search-Mailbox -SearchQuery ‘subject:”Hemen 100 dolar kazan”‘ –EstimateResultOnly

<strong>Silme:</strong>
Get-Mailbox -Resultsize unlimited | Search-Mailbox -SearchQuery ‘subject:”Hemen 100 dolar kazan”‘ –DeleteContent -Force</pre>
<!-- /wp:preformatted -->
