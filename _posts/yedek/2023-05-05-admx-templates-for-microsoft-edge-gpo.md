---
layout: post
title: ADMX Templates for Microsoft Edge (GPO)
date: 2023-05-05 11:36
author: theguler
comments: true
categories: [Windows Group Policy GPO]
---
<!-- wp:image {"id":10001,"width":"350px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/group_p.png?w=300" alt="" class="wp-image-10001" style="width:350px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Microsoft Edge tarayıcısı için ADMX şablonları tarayıcının Grup İlkesi Yönetimi için kullanılmasını sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Policy/Lolitikaları indirme:</strong> Microsoft Edge yönetim şablonlarını indirmek için aşağıdaki adımları takip edebilirsiniz:a. Tarayıcınızı açın ve Microsoft'un resmi Edge Enterprise sayfasına gidin. <a href="https://www.microsoft.com/edge/business/download">Microsoft Edge Enterprise Sayfası</a>  </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Buradan en son sürümün ADM/ADMX şablonlarını içeren sıkıştırılmış dosyaları indirin.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":10006,"width":"613px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/edge_1.png?w=1024" alt="" class="wp-image-10006" style="width:613px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>Dosyaları Çıkartma:</strong> İndirdiğiniz ZIP/CAB/RAR dosyasını bir klasöre çıkartın. İçinde "Microsoft Edge" veya benzeri bir klasör olmalıdır.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:image {"id":10020,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/edge_ext-1.png?w=826" alt="" class="wp-image-10020" /></figure>
<!-- /wp:image -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>ADMX/ADML Dosyalarını DC üzerine Yükleme:</strong> "C:\Windows\PolicyDefinitions" (veya benzeri bir klasör) dizinine gidin. Çıkarttığınız "Microsoft Edge" klasöründeki tüm <strong>ADMX/ADML</strong> dosyalarını aşağıdaki dizinlere kopyalayın.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>ADMX &amp; ADML:</strong><br>%systemroot%\PolicyDefinitions<br>%systemroot%\SYSVOL\domain\Policies\PolicyDefinitions </pre>
<!-- /wp:preformatted -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>Grup İlkesi Düzenleme:</strong> "gpedit.msc" üzerinde;</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>"Computer Configuration" &gt; "Administrative Templates"</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":10014,"width":"636px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/edge_general.png?w=754" alt="" class="wp-image-10014" style="width:636px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>***</strong>Benzer yöntemler Google Chrome ve Firefox içinde yapılandırılabilir.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Microsoft Edge: </strong>Edge tarayıcınız için zorunlu policyleri yapılandırır<br><strong>Microsoft Edge – Default Settings (users can override):</strong> Kullanıcıların değiştirebileceği policyleri yapılandırır.<br><strong>MS Edge Update:</strong> Microsoft Edge'in güncelleme süreçlerinin kontrol edilmesini sağlar.<br><strong>Microsoft Edge WebView2:</strong> Microsoft Edge WebView2, tarayıcının bir bileşeni olarak kullanılan bir web görüntüleyici kontrolüdür.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Faydalı olması dileği ile.</strong></p>
<!-- /wp:paragraph -->
