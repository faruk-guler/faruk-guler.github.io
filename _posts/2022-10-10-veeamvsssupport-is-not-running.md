---
layout: post
title: Zabbix "VeeamVssSupport" (VeeamVssSupport) is not running
date: 2022-10-10 10:18
author: theguler
comments: true
categories: [Fix - Troubleshooting]
---
<!-- wp:image {"id":5089,"width":1027,"height":58,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/vss.jpg?w=1024" alt="" class="wp-image-5089" width="1027" height="58" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>-I don't see this service in the Services list. Should I?</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-Should this service be stopping?</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-Should I tell ServerAssist to no longer start this service when it sees that it is stopped?</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Reply:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>+VeeamVssSupport is not a service and you should not see it in the Services list. It is a non-persistent runtime "agent" that is automatically deployed to the VM when you make a backup, and it is normal for it to stop during the backup (after performing a VSS freeze).</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-Bu hizmeti Hizmetler listesinde göremiyorum.&nbsp;Ne Yapmalıyım?</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-Bu hizmet durdurulmalı mı?</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-ServerAssist durdurulduğunu gördüğümde bu hizmeti başlatmalı mıyım?</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Yanıt:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>+VeeamVssSupport bir hizmet değildir ve onu Hizmetler listesinde görmemelisiniz.&nbsp;Yedekleme yaptığınızda VM'ye otomatik olarak dağıtılan kalıcı olmayan çalışma zamanı "aracı"dır ve yedekleme sırasında (VSS dondurması gerçekleştirildikten sonra) durması normaldir.</p>
<!-- /wp:paragraph -->
