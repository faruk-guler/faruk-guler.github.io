---
layout: post
title: Determining the Lock Screen Duration of Clients
date: 2022-05-17 14:04
author: theguler
comments: true
categories: [Windows Group Policy GPO]
---
<!-- wp:image {"id":3167,"width":556,"height":311,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/lock.jpg?w=1024" alt="" class="wp-image-3167" width="556" height="311" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Bu özellik, bilgisayarları kullanmayan ve uzun süre boşta bırakan kullanıcıların güvenliğini sağlamak için oldukça önemlidir. Bu sayede, bir kullanıcının bilgisayarını bırakıp gitmesi veya yanında olmayan birinin bilgisayarına erişmesi durumunda bilgisayar ekranının kilitlenerek güvenliği sağlanabilir. Group Policy yönetim konsolu üzerinden oluşturulan ve istemci bilgisayarlarında uygulanan bir Policy ile bu işlem gerçekleştirilebilir. Policy, kullanıcıların bilgisayarlarını ne kadar süre boşta bırakabileceğini belirler ve belirlenen süre sonunda bilgisayar ekranını otomatik olarak kilitler. Bu sayede, kullanıcıların bilgisayarlarını kullanmayı bıraktıklarında güvenliği sağlanmış olur. Ayrıca, kullanıcıların parola ile giriş yapmaları da zorunlu hale getirilerek, başka bir kişinin bilgisayarına erişmesi veya bilgisayarın başında olmayan bir kullanıcının bilgisayarına erişmesi durumunda güvenliği artırır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p> <strong>GPO: User Configuration &gt; Policies &gt; Administrative Templates &gt; Control Panel &gt; Personalization</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":3175,"width":751,"height":357,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/saver.jpg?w=1024" alt="" class="wp-image-3175" width="751" height="357" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>1)-</strong> Enable screen saver (Ekran korucuyu etkinleştir) &gt; Enabled - Ok</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>2)- </strong>Password protect the screen saver (Ekran koruyucuyu parola ile koru) - OK</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>3)- </strong>Screen saver timeout second (Ekran koruyucu zaman aşımı *saniye) - Enabled</p>
<!-- /wp:paragraph -->
