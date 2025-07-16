---
layout: post
title: How to uninstall Docker on Linux?
date: 2022-11-20 22:34
author: theguler
comments: true
categories: [Containerization]
---
<!-- wp:image {"id":11540,"width":"448px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/unss.jpg?w=800" alt="" class="wp-image-11540" style="width:448px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Docker, birçok sistem yöneticisi ve geliştirici tarafından kullanılan bir konteyner yazılımıdır. Ancak, bazen kaldırılması gerekebilir :/</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Docker'ı Ubuntu üzerinden kaldırmak için şu adımları izleyebilirsiniz:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Kaldırmadan önce, hangi sürümü yüklediğinizi kontrol etmeniz gerekirse:<br><strong>docker version</strong><br><br>Öncelikle Docker'ı durdurmanız gerekir:<br><strong>sudo systemctl stop docker</strong><br><strong>sudo systemctl status docker</strong><br><br>#Docker'ı kaldırmak için aşağıdaki komutu kullanın:<br><strong>#sudo apt-get purge docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras</strong><br><br>#Docker ile ilgili tüm dosyaları silmek için:<br><strong>#sudo rm -rf /var/lib/docker</strong><br><br>#Docker kullanıcısı ve grubunu silmek için aşağıdaki komutu kullanın:<br><strong>#sudo deluser docker</strong><br><strong>#sudo deluser faruk<br>#sudo delgroup docker</strong><br><br>Docker'ın kurulumu sırasında oluşturulan dizinleri ve dosyaları da silmek için:<strong><br>#sudo rm -rf /etc/docker<br>#sudo rm -rf /etc/apparmor.d/docker<br>#sudo rm -rf /var/run/docker.sock</strong><br><strong>#sudo rm <strong>-rf </strong>/usr/local/bin/docker-compose</strong><br><strong>#sudo rm -rf /var/lib/docker<br><strong>#</strong>sudo rm -rf /var/lib/containerd</strong><br><br>Son olarak, sistemde kalan gereksiz paketlerin temizlenmesi için:<br><strong>#sudo apt-get autoremove<br>#sudo apt-get autopurge</strong></pre>
<!-- /wp:preformatted -->
