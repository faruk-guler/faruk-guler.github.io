---
layout: post
title: Database 'DB_name' is low on log volume space.
date: 2022-04-18 09:29
author: theguler
comments: true
categories: [Fix - Troubleshooting]
---
<!-- wp:image {"id":284,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/exchange-2016-1.png?w=400" alt="" class="wp-image-284" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Database 'Servername' is low on log volume space, 'DBname' is low on log volume space, "low on log volume space"</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>uyarının  nedeni, günlük disk alanı için belirli bir değer sınırına (&nbsp;<strong>Sizin: 175.78GB</strong>&nbsp;) sahip olmamızdır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>bunu tekrar check ederek doğrulayabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Get-ServerHealth –Identity EXCH02 –HealthSet MailboxSpace</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Günlük disk alanı sorununu düzeltmek için, kayıt defteri anahtarını (&nbsp;<strong>DWORD</strong>) değiştirin veya yoksa oluşturun</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">:<strong>HKLM\Software\Microsoft\ExchangeServer\v15\Replay\Parameters\SpaceMonitorLowSpaceThresholdInMB</strong>

:<strong>HKLM\Software\Microsoft\ExchangeServer\v15\ActiveMonitoring\Parameters</strong>

<strong>REG_DWORD: SpaceMonitorLowSpaceThresholdInMB 0x0000c350(50000)</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":3369,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/dword.jpg?w=482" alt="" class="wp-image-3369" /></figure>
<!-- /wp:image -->
