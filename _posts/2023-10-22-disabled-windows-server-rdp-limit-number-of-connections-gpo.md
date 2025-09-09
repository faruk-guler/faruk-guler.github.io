---
layout: post
title: Disabled Windows Server RDP Limit Number of Connections (GPO)
date: 2023-10-22 15:57
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":8947,"width":"508px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/maxresdefault_rdp-1.jpg?w=837" alt="" class="wp-image-8947" style="width:508px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>RDP (Remote Desktop Protocol) oturum açma limiti kaldırma politikaları, Windows işletim sistemi tabanlı sunucularda kullanılan bir özelliktir. Bu politikalar, RDP ile uzak masaüstü bağlantılarının yönetimini etkiler.  Bu politikalar sadece<strong> "Sunucu/Server Tarafında" </strong>yapılandırılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Computer Configuration &gt; Administrative Templates &gt; Windows Components &gt; Remote Desktop Services &gt; Remote Desktop Session Host &gt; Connections "Limit number of connections</strong>"</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":8944,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/limit_rd1.png?w=1024" alt="" class="wp-image-8944" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":8946,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/limit_rd2.png?w=1024" alt="" class="wp-image-8946" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>RDP oturum açma limiti kaldırma politikaları, aynı anda kaç RDP oturumu açılabileceğini veya belirli kullanıcıların RDP oturumu açma yetkisini sınırlamayı veya sınırsız bağlantıya izin vermeye yarar. Bu politikalar, sunucunun <strong>"Local Group Policy Editor" veya "Group Policy Management Console" </strong>gibi araçlarla yapılandırılabilir. Sunucu yöneticileri veya sistem yöneticileri bu politikaları sunucu üzerinde yapılandırarak RDP oturum açma sınırlamalarını kaldırabilirler.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Clientler, bu politikalardan etkilemezler ve üzerinde bu tür ayarlar yapılamamaktadır. Bu nedenle, RDP oturum açma limiti kaldırma politikaları yalnızca <strong>"sunucu/server"</strong> tarafında çalışır.<strong> </strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Windows Server 2025</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Windows Server 2022</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Windows Server 2019</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Windows Server 2016</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Windows Server 2012&nbsp;(R2)</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Windows Server 2008&nbsp;(R2)</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Windows Server 2003&nbsp;(R2)</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Windows 2000 Server</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Windows NT 4.0</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Windows NT 3.51</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Windows NT 3.5</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Windows NT 3.1</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>etc.</strong></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->
