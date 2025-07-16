---
layout: post
title: GPO Remote Desktop Portunu Değişimini Engelleme
date: 2022-01-07 12:56
author: theguler
comments: true
categories: [Windows Group Policy GPO]
---
<!-- wp:paragraph -->
<p>Group Policy aracılığıyla, Registry'deki değerleri değiştirmek mümkündür ve aynı zamanda hiçbir kullanıcının bu değerleri değiştirmesini engellemek de mümkündür. Örneğin, güvenlik amaçları için, bütün makinelerdeki Uzak Masaüstü (Remote Desktop) bağlantı noktasının değiştirilmemesini isteyebilirsiniz. Tüm makinelerde tek tek bu ayarları yapmak yerine, Group Policy aracılığıyla bu işlemi gerçekleştirebilirsiniz. Varsayılan olarak, <strong>Uzak Masaüstü bağlantı noktası 3389 numaralı porttur.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":939,"width":734,"height":390,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/g1-1.png?w=1024" alt="" class="wp-image-939" width="734" height="390" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Default Domain Policy üzerinde, fare sağ tuşu ile düzenleme (edit) seçeneği seçilerek Group Policy Management Console açılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Registry ayarlarına erişmek için, <strong>"Computer Configuration\Policies\Windows Settings\Security Settings\Registry"</strong> seçenekleri izlenir. Bu seçeneklerin altında sağ tık yapılarak "Add key" seçeneği seçilir. Ayrıca, bu ayarlara Regedit aracılığıyla da erişilebilir. Bunun için aşağıdaki yol izlenir:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>REG: MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":941,"width":733,"height":421,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/f1.png?w=1024" alt="" class="wp-image-941" width="733" height="421" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>İlgili grup yada users grupları üzerindeki Full Control yetkisi kaldırılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best Regards.</strong></p>
<!-- /wp:paragraph -->
