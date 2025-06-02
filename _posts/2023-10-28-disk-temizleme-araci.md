---
layout: post
title: Disk temizleme aracı Windows güncelleme temizleme işlemi neden bu kadar uzun sürüyor?
date: 2023-10-28 22:11
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":9057,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/clean-1.png?w=495" alt="" class="wp-image-9057" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Disk Temizleme aracından Windows Update dosyalarını temizlemesini isterseniz, bunun uzun sürdüğünü ve çok fazla CPU tükettiğini görebilirsiniz.&nbsp;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Ne yapıyor bu?&nbsp;Dosyaları silmek neden kadar zor ?</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Windows Update Temizleme seçeneği yalnızca dosyaları silmekten daha fazlasını yapar.&nbsp;Temelde<strong> (iki şey) </strong>yapıyor.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Eşdeğerini Yapma (Deep Clean)</strong>: Bu,<em> </em><strong><em>"deep clean</em>"</strong> takma adıyla geçen bir komuttur ve artık referans verilmeyen bileşenleri arayarak bileşen kataloğunu temizler. Normalde sistem, programlı bakım görevinde otomatik olarak bileşen temizleme işlemini gerçekleştirir. Otomatik temizlemenin, referans verilmeyen bir bileşeni kaldırmadan önce <strong>"30 gün bekleme" </strong>politikası vardır ve ayrıca kendi kendine belirlediği bir saatlik süre sınırına sahiptir. Ancak yukarıdaki özel komut satırı hem 30 günlük yetkisiz kullanım süresini hem de 1 saatlik zaman aşımını atlar. Başvurulmayan bileşenler hemen kaldırılır ve görev bir saatten fazla sürse bile tamamlanana kadar çalıştırılır.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#DISM (Deployment Imaging Service and Management Tool) Windows görüntüsündeki bileşenleri temizlemek ve gereksiz dosyaları kaldırmak içindir.</strong>

dism /Online /Cleanup-Image /StartComponentCleanup</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Bu işlem, sistemin daha hızlı ve daha temiz olmasını sağlar. Bu nedenle, özellikle gereksiz dosyaların biriktiği durumlarda, kullanışlıdır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Windows Update Temizleme&nbsp;görevinin yaptığı diğer şey,&nbsp;</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>"Wof­Should­Compress­Binaries" Kontrolü</strong>: Bu adım, <strong>"Wof­Should­Compress­Binaries"</strong> adlı bir işlev aracılığıyla gerçekleştirilir. Bu işlev, sistemin sistem dosyalarının sıkıştırılmasının faydalı olup olmadığını değerlendirir. Eğer sıkıştırmanın faydalı olduğu sonucuna varılırsa, işlem devam eder. </p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Dosyaların Sıkıştırılması</strong>: Sıkıştırmaya uygun olan ve daha önce sıkıştırılmamış işletim sistemi dosyaları, bu adımda sıkıştırılır. Sıkıştırma işlemi, dosyaların boyutunu küçültür ve bu sayede daha fazla verinin daha az alan kaplamasını sağlar.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Sonuçların Saklanması</strong>: Sıkıştırma işlemi sonucunda elde edilen veriler, <strong>"WofCompressedData" </strong>adlı alternatif bir veri akışında saklanır. Bu, sıkıştırılmış verilerin orijinal verilere göre daha verimli bir şekilde depolanmasını sağlar.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Bu sıkıştırma işlemi için Windows Kaplama Filtresi tarafından kullanılan sıkıştırma algoritması, gerçek zamanlı sıkıştırma algoritmalarına göre daha yüksek kalitede bir sıkıştırma sunar. Ancak bu yüksek kalite, sıkıştırma işleminin maliyetli olmasına neden olur. Sıkıştırma işlemi, daha fazla CPU zamanı gerektirir. Bu nedenle, Windows Update Temizleme işlemi sırasında çok fazla CPU kaynağı kullanmasının nedeni budur.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Umarım yararlı olmuştur. - I hope it was useful.</strong></p>
<!-- /wp:paragraph -->
