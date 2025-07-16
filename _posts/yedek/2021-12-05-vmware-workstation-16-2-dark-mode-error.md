---
layout: post
title: Vmware Workstation 16.2 dark mode fix
date: 2021-12-05 20:45
author: theguler
comments: true
categories: [Vmware Virtualization]
---
<!-- wp:image {"id":402,"width":200,"height":200,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/vmware.png?w=256" alt="" class="wp-image-402" width="200" height="200" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Yayınlanan Vmware Workstation 16.2.0 güncellemesi ile karanlık arayüz modu kapatılmıştı wmware tarafı konu ile ilgili bir patch yayınlayacaklarını duyurdu.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>bizde bu yamayı beklemeden karanlık modu açmak için aşağıdaki dizine giderek (preferences.ini) dosyasını editliyoruz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu dosya yoluna git - Look: C:\Users\yourUsername\AppData\Roaming\VMware\preferences.ini</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Add line at end: - satırın en sonuna bunu ekleyin:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>wsFeatureDarkModeSupported = "TRUE"</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Save file. Restart VMware Workstation app.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Dosyayı kaydettikten sonra VMware Workstation uygulamasını yeniden başlatın.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
