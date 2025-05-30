---
layout: post
title: Windows Defender Group Policy and Infected LOGS Inspection
date: 2022-12-11 20:23
author: theguler
comments: true
categories: [Antivirus]
---
<!-- wp:image {"id":5708,"width":481,"height":270,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/windows-defender.jpeg?w=1024" alt="" class="wp-image-5708" style="width:481px;height:270px" width="481" height="270" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Windows Defender Version Check Powershell:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>PS:</strong>

Get-MpComputerStatus
#AMProductVersion : <strong>4.18.2211.5</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":5711,"width":640,"height":276,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/am.png?w=999" alt="" class="wp-image-5711" style="width:640px;height:276px" width="640" height="276" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Windows Defender Loglarını detaylı şekilde inceleyelim:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Windows Defender'ın bir günlük dosyası var mı?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Evet var, Windows Defender'ın birden çok günlük dosyası vardır.&nbsp;Bilgisayarınızda her tarama yaptığınızda bir günlük oluşturur.&nbsp;Hızlı tarama, Tam tarama, Özel tarama veya Microsoft Defender Çevrimdışı taraması olsun, Windows Defender her seferinde bir günlük oluşturur.&nbsp;Günlük dosyalarını burada bulabilirsiniz: <strong>C:\ProgramData\Microsoft\Windows Defender\Support</strong>&nbsp;Ancak, günlük dosyalarını kullanıcı dostu bir şekilde okumak istiyorsanız, WinDefLogView'dan yararlanabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5728,"width":576,"height":349,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/tinywow_read-windows-defender.png?w=700" alt="" class="wp-image-5728" style="width:576px;height:349px" width="576" height="349" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>WinDefLogView v1.00<br>Copyright (c) 2022 Nir Sofer</strong><br>https://github.com/theguler0x/Tools/blob/main/win_defender_logviewer.zip<strong> (Github</strong>)<br>Web site: https://www.nirsoft.net/utils/windows_defender_log_Viewer.html</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>WinDefLogView, şu kaynaklardan gelen verileri algılayabilir:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Bu sistem</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Harici Klasör</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Uzak bilgisayar</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Çoklu Uzak Bilgisayarlar</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Shadow Copy</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Kendi bilgisayarınızı kullandığınız için&nbsp;<strong>Bu Sistem</strong>&nbsp;seçeneğini seçiniz ve&nbsp;<strong>Tamam</strong>&nbsp;butonuna tıklayınız.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Algılanan tüm tehditleri ekranınızda görüntüler.&nbsp;Tüm ayrıntıları bulmak için herhangi bir tehdide sağ tıklayıp&nbsp;<strong>Properties</strong> seçeneğini açabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5720,"width":586,"height":319,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/tinywow_read-windows-defender-event.png?w=700" alt="" class="wp-image-5720" style="width:586px;height:319px" width="586" height="319" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Windows Defender Group Policy</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Windows Defender’in Group Policy</strong> </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Yeni bir GPO oluşturup adını tanımlayalım. Aşağıdaki ayarları test ortamınızda  deneyerek gerçek ortamlarınıza uygulamanızı tavsiye ederim.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":8056,"width":415,"height":191,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/defenfder-gpo.webp?w=774" alt="" class="wp-image-8056" style="width:415px;height:191px" width="415" height="191" /></figure>
<!-- /wp:image -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Computer Configuration &gt; Policies &gt; Administrative Templates &gt; Windows Components &gt; Windows Defender</strong><em> </em>yolunda "Windows Defender GPO" ayarlarını bulabilirsiniz.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image {"id":8058,"width":551,"height":392,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/gpo-def.webp?w=1023" alt="" class="wp-image-8058" style="width:551px;height:392px" width="551" height="392" /></figure>
<!-- /wp:image -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Computer Configuration &gt; Policies &gt; Administrative Templates &gt; Windows Components &gt; Windows Defender &gt; Turn off Windows Defender’ı </strong>Disabled yaparak Windows Defender’in son kullanıcılar tarafından kapatılmasını engelleyebilirsiniz.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Computer Configuration &gt; Policies &gt; Administrative Templates &gt; Windows Components &gt; Windows Defender &gt; Client Interface &gt; Suppress all notifications</strong> seçeneğini enabled yaparak kullanıcılara bildirim gitmesini engelleyebilir veya disabled yaparak bildirimleri aktif edebilirsiniz.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Computer Configuration &gt; Policies &gt; Administrative Templates &gt; Windows Components &gt; Windows Defender &gt; Client Interface &gt; Enable headless UI mode</strong> seçeneğini kullanarak detaylı ekranların görünmesi engelleyebilirsiniz.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Computer Configuration &gt; Policies &gt; Administrative Templates &gt; Windows Components &gt; Windows Defender &gt; Exclusions</strong><em> </em>yolunu takip ederek belli process, uzantı, path vs. için istisnalar tanımlayabilirsiniz.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Computer Configuration &gt; Policies &gt; Administrative Templates &gt; Windows Components &gt; Windows Defender &gt; Quarantine &gt; Configure removel of items form Quarantine folder </strong>seçeneğiyle karantinada kalacak dosyaların kaç gün sonra silineceğini seçebilirsiniz.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Computer Configuration &gt; Policies &gt; Administrative Templates &gt; Windows Components &gt; Windows Defender &gt; Scan&gt; Allow users to pause scan</strong><em> </em>yolunu takip ederek kullanıcıların taramaları durdurmalarını engelleyebilirsiniz.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><em><strong>Computer Configuration &gt; Policies &gt; Administrative Templates &gt; Windows Components &gt; Windows Defender &gt; Scan &gt; Specify the day of the week to run a scheduled full scan to complete remediation</strong> </em>seçeneğini kullanarak istemcilerde zamanlanmış görevler oluşturabilirsiniz.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Computer Configuration &gt; Policies &gt; Administrative Templates &gt; Windows Components &gt; Windows Defender &gt; MAPS &gt; Send the file samples when further analysis is required</strong><em> </em>yolunu takip ederek örneklerin gönderilip gönderilmeyeceğini düzenleyebilirsiniz.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Computer Configuration &gt; Policies &gt; Administrative Templates &gt; Windows Components &gt; Windows Defender &gt; Scan &gt; Scan removable drives</strong> seçeneğiyle şayet full tarama başladıysa removable/çıkarılabilir driverlarında taranamasını sağlayabilirsiniz.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>vs.....</strong></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla – Best Regards...</strong></p>
<!-- /wp:paragraph -->
