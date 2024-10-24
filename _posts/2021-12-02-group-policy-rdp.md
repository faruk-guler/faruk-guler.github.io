---
layout: post
title: Activating RDP with group policy
date: 2021-12-02 20:50
author: theguler
comments: true
categories: [Windows Group Policy GPO]
---
<!-- wp:image {"id":230,"width":453,"height":305,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/rdp-tool-windows.jpg?w=424" alt="" class="wp-image-230" width="453" height="305" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>RDP veya VPN gibi araçlarla internet üzerinde güvenli bağlantılar kurmak isteyen kullanıcılar için Group Policy oldukça faydalı bir araçtır. Özellikle büyük ölçekli ağlarda, her bir bilgisayarda tek tek ayarlar yapmak yerine, Group Policy ile tek bir merkezi ayar yaparak tüm ağdaki bilgisayarları yönetmek mümkündür.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>RDP, Microsoft tarafından geliştirilen bir iletişim protokolüdür ve Uzak Masaüstü bağlantısı için kullanılır. Bu protokol sayesinde, Windows işletim sistemine sahip herhangi bir bilgisayara uzaktan bağlanarak, o makineyi yerel olarak kullanmak mümkündür. Ancak, RDP bağlantıları güvenlik riski taşıdığı için, bu bağlantıların yalnızca güvenilir kişiler tarafından kullanılması önemlidir. Bu noktada, Group Policy kullanarak, RDP bağlantılarına erişimi sınırlayabilir ve güvenlik açıklarını önleyebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>1) <strong>Computer Configuration &gt; Policies &gt; Administrative Templates &gt; Network &gt; Network Connections &gt; Windows Firewall &gt; Domain Profile &gt; “Windows Firewall:" </strong>Allow Inbound Remote Desktop Exception"</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>2) <strong>Computer Configuration &gt; Policies &gt; Administrative Templates &gt; Windows Components &gt; Remote Desktop Services &gt; Remote Desktop Session Host &gt; Connections &gt; enable the policy “Allow Users to connect remotely using Remote Desktop Services”</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla..</strong></p>
<!-- /wp:paragraph -->
