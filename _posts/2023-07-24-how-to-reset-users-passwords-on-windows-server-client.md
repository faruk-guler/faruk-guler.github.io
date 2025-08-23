---
layout: post
title: HOW TO RESET USER'S PASSWORDS ON WINDOWS SERVER &amp; CLIENT
date: 2023-07-24 00:14
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":7872,"width":"602px","height":"343px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/reset-windows-10-password.jpg?w=600" alt="" class="wp-image-7872" style="width:602px;height:343px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Windows Server 2019'da unutulan veya kaybedilen yönetici parolası, sunucuya erişimi engelleyebilir ve önemli sorunlara yol açabilir. Neyse ki, Windows'un <strong>"Sorun Giderme"</strong> modu ve <strong>"Komut İstemi"</strong> aracılığıyla yönetici parolasını sıfırlamak mümkündür. Bu detaylı kılavuzda, Windows Server 2019'da yönetici parolasını nasıl sıfırlayacağınız adım adım anlatılmıştır</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Gereksinimler:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Windows Server 2019 ISO dosyası: Microsoft'un resmi web sitesinden indirilebilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>IPMI erişimi veya fiziksel erişim: Bu işlemi gerçekleştirmek için sunucuya uzaktan veya fiziksel erişim sağlamanız gerekmektedir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Adım 1 –</strong> <strong>IPMI'ye Erişin:</strong> Eğer IPMI erişiminiz varsa, yönetici parolasını sıfırlamak için uzaktan erişim sağlayabilirsiniz. IPMI erişimi hakkında bilgi almak için şu kılavuzu takip edin: [IPMI'ye Nasıl Erişilir Kılavuzu - <a href="https://console.clouvider.co.uk/index.php?cmd=knowledgebase&amp;action=article&amp;id=1">https://console.clouvider.co.uk</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Adım 2 –</strong> <strong>Boot Menüsüne Girin: </strong>Sunucuyu yeniden başlatın ve açılış sırasında F11 tuşuna basarak önyükleme menüsüne girin. Bu menüde Windows Server 2019 ISO'sunu seçin ve devam edin.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7860,"width":"449px","height":"315px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/res0.png?w=895" alt="" class="wp-image-7860" style="width:449px;height:315px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Adım 3 – Kurulum Penceresi:</strong> Windows kurulum penceresi açıldığında, "İleri" seçeneğine tıklayarak devam edin.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7859,"width":"552px","height":"370px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/res1.png?w=800" alt="" class="wp-image-7859" style="width:552px;height:370px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Adım 4 – "Bilgisayarınızı Onarın":</strong> "İleri" seçeneğini tıkladıktan sonra "Bilgisayarınızı Onarın" seçeneğini seçin.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7878,"width":"532px","height":"392px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/reset.png?w=800" alt="" class="wp-image-7878" style="width:532px;height:392px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Adım 5 – "Sorun Giderme":</strong> "Bilgisayarınızı Onarın" seçeneğini seçtikten sonra, "Sorun Giderme" seçeneğini seçin.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7858,"width":"593px","height":"339px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/res3.png?w=800" alt="" class="wp-image-7858" style="width:593px;height:339px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Adım 6 – "Komut İstemi":</strong> "Sorun Giderme" seçeneğini tıkladıktan sonra, "Komut İstemi" seçeneğini seçin.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7861,"width":"543px","height":"379px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/res4.png?w=800" alt="" class="wp-image-7861" style="width:543px;height:379px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Adım 7 – CMD:</strong> "Komut İstemi"ni seçtikten sonra, aşağıdaki komutları sırasıyla girin:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#Bozulmalara karşı CMD.exe ve UTILMAN.exe dosyalarının <strong>C:\</strong> dizinine yedeklemek:
<strong>copy C:\Windows\System32\utilman.exe C:\ &amp;&amp; copy C:\Windows\System32\cmd.exe C:\</strong>

#Change Directory
#d:
<strong>c:</strong>
<strong>cd Windows
cd System32
move utilman.exe utilman.exe.bak
copy cmd.exe utilman.exe
net user administrator /active:yes
shutdown -r -t 0</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Bu komutlar, <strong>utilman.exe</strong> dosyasını <strong>cmd.exe</strong> ile değiştirerek <strong>Yönetici hesabını etkinleştirir</strong> ve <strong>sunucuyu yeniden başlatır.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Adım 8 – Yeni Parola: </strong>Sunucu yeniden başladığında, ana oturum açma ekranında <strong>"Win+U"</strong> tuşlarına basarak <strong>Erişilebilirlik özelliklerini açın</strong> ve CMD penceresini başlatın.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#Yeni bir Yönetici parolası belirlemek için aşağıdaki komutları girin:
<strong>net user Administrator AdmPasswd365**
exit</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Yeni parolanızı belirledikten sonra, CMD penceresini kapatın.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Adım 9 – Geri Alma:</strong> Parola sıfırlama işlemi tamamlandıktan sonra, <strong>utilman.exe</strong> dosyasını eski hâline getirmek gereklidir. Bu nedenle, sunucuyu yeniden başlatın ve adımları tekrarlayın. "Komut İstemi"ni seçerek aşağıdaki komutları girin:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>cd Windows
cd System32
del utilman.exe
ren utilman.exe.bak utilman.exe
shutdown -r -t 0</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Sonuç: </strong>Bu adımları takip ederek, Windows Server 2019'daki Yönetici Parolasını sıfırlayabilir ve sunucunuza yeniden erişebilirsiniz. Unutmayın ki bu işlemi sadece yetkili kişiler yapmalı ve gerekli güvenlik önlemleri alınmalıdır.</p>
<!-- /wp:paragraph -->
