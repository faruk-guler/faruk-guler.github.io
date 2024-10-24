---
layout: post
title: User Principal Name and Name Suffix Routing
date: 2022-05-01 19:32
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:image {"id":2270,"width":390,"height":214,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ad.jpg?w=704" alt="" class="wp-image-2270" width="390" height="214" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Kullanıcının User Principal Name’indeki “@” işaretinden sonraki kısma “UPN Suffix” denir. Her kullanıcının UPN Suffix’i oluşturduğu domain adı ile aynıdır. Yeni bir UPN Suffix eklemek istiyorsanız <strong>Active Directory Domains and Trusts &gt; Properties </strong>yönetim konsolunu kullanabilirsiniz. Genelde local olarak ayarlanmış domain name kısmının Exchange ile entegre olabilmesi için kullanılır.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":2998,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/trusts.png?w=1024" alt="" class="wp-image-2998" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>kullanıcılar üzerinde test edelim;</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":3000,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/trst.png?w=604" alt="" class="wp-image-3000" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Görüldüğü üzere Exchange için istenilen UPN name dönüştürülebilmektedir.</p>
<!-- /wp:paragraph -->
