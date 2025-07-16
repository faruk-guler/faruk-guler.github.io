---
layout: post
title: Active Directory Database is CORRUPTED! Fixed
date: 2022-12-18 14:58
tag: [Restoring]
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:image {"id":5808,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/corrupted.png?w=816" alt="" class="wp-image-5808" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Sorun:</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Active Directory <strong>(AD)</strong> veritabanı bozuktur; sunucu AD etki alanı üyelerini doğrulayamaz, şifre değiştirme vb. hatalar oluşursa ve normal modda başlatılamaz veya tüm domainde <strong>"An internal error occurred" </strong>gibi belirsiz uyarıların oluşmaya başlaması sonucu Active Directory Veri Tabanının(bkz: <a href="https://farukguler.com/2022/12/18/ntds-dit-nedir">Ntds.dit</a> nedir?) bozulduğu anlamına gelir.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5813,"sizeSlug":"large","linkDestination":"none","align":"left","className":"is-resized"} -->
<figure class="wp-block-image alignleft size-large is-resized"><img src="https://farukguler.com/assets/post_images/occured.png?w=478" alt="" class="wp-image-5813" /></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading"><strong>Çözüm:</strong></h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Yakın zamanda bir sistem yedeği veya snapshot almadıysanız, AD kurtarma girişimi olarak aşağıdaki adımları gerçekleştirebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>DC'yi Dizin Hizmetleri Geri Yükleme Modu'nda&nbsp;<strong>(DSRM)</strong>&nbsp;modda başlatalım.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong> </strong>Dizin Hizmetleri Geri Yükleme Modu, Active Directory Etki Alanı Denetleyicilerinde, acil bakım için, özellikle de AD nesnelerinin yedeklerini geri yüklemek için sunucuyu çevrimdışına alan bir işlevdir. Güvenli moda benzer şekilde, Windows Server'da gelişmiş başlangıç ​​menüsü aracılığıyla erişilir. DSRM modunda login olabilmek için DSRM şifremizi bilmemiz gerekir, DSRM şifresi domain kurulumunda oluşturulan <strong>".\Administrator"</strong> hesabına tanımlanan bir şifredir. Unutulduğu zaman resetlenmesi mümkündür. <strong>bkz:</strong> <a href="https://farukguler.com/2022/06/17/resetting-dsrm-directory-services-restore-mode-password/">Resetting AD DSRM</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"placeholder":"Son zamanlarda hangi becerileri edindiniz veya dersleri aldınız?"} -->
<p><strong>Serveri DSRM Modda yeniden başlatmak için:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Bcdedit /set safeboot dsrepair
Shutdown /r /t 0</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Serveri DSRM Modundan çıkarıp yeniden başlatmak için:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>bcdedit /deletevalue safeboot
shutdown -t 0 -r</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>İlk  veri tabanı bütünlük kontrolünü check etmek için:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#PS &amp; CMD:
<strong>ESENTUTL /g C:\windows\NTDS\ntds.dit /!10240 /8 /o</strong>

#Checking database integrity.

 Scanning Status (% complete)

 0    10   20   30   40   50   60   70   80   90  100
 |----|----|----|----|----|----|----|----|----|----|
 ..................................................
 Integrity check completed.  <strong>Database is CORRUPTED!</strong>

#Veritabanı tutarsızlıkları durumunda "results CORRUPTED, -1206" (sonuçlar  BOZUK, -1206) gibi hata mesajı döndürür.</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":5808,"sizeSlug":"large","linkDestination":"none","className":"is-resized"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/corrupted.png?w=816" alt="" class="wp-image-5808" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Eğer CORRUPTED değerini döndürürse, Soft Recovery için ntdsutil aracını başlatalım:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>ntdsutil<br>activate instance ntds<br>files<br>info<br></strong>#<strong>("Recover" Kurtar komutu ile kurtarma işlemine başlayalım)</strong> Bu komut, AD veritabanı yumuşak bir şekilde kurtarılmasını başlatacaktır.<br><strong>recover<br>quit<br>quit</strong><br><br><strong>#DC yeniden başlatarak kurtarma işlemi başarılı olup, hataların giderip giderilmediği tekrar kontrol edilmelidir.</strong> <strong>kontrol sonrası hala hatalar devam ediyorsa "hard" kurtarma moduna geçmelisiniz!</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>AD Veritabanı günlük(LOG) dosyalarının kontrol edilip - silinmesi:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#Log Check:
<strong>ESENTUTL /ml c:\windows\ntds\edb</strong>

#Tüm logları Sil:
<strong>del c:\Windows\NTDS\*.log
del c:\Windows\NTDS\*.chk</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Hard Recovery Moduna devam edilmesi:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>ESENTUTL /p c:\Windows\NTDS\ntds.dit /!10240 /8 /o</strong>

#Initiating REPAIR mode...
        Database: c:\Windows\NTDS\ntds.dit
  Temp. Database: TEMPREPAIR4840.EDB

#Checking database integrity.

 Scanning Status (% complete)

 0    10   20   30   40   50   60   70   80   90  100
 |----|----|----|----|----|----|----|----|----|----|
 ...................................................

#Initiating DEFRAGMENTATION mode...
            Database: c:\Windows\NTDS\ntds.dit

 #Defragmentation Status (% complete)

 0    10   20   30   40   50   60   70   80   90  100
 |----|----|----|----|----|----|----|----|----|----|
 ...................................................


#Moving 'TEMPREPAIR4840.EDB' to 'c:\Windows\NTDS\ntds.dit'... DONE!

3Moving 'TEMPREPAIR4840.jfm' to 'c:\Windows\NTDS\ntds.jfm'... DONE!

3Note:
  It is recommended that you immediately perform a full backup
  of this database. If you restore a backup made before the
  defragmentation, the database will be rolled back to the state
  it was in at the time of that backup.

Operation completed successfully in 6.203 seconds.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Veri tabanı bütünlük kontrolünü tekrar check edin:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>ESENTUTL /g C:\windows\NTDS\ntds.dit /!10240 /8 /o</strong><br><br>Initiating INTEGRITY mode...<br>Database: C:\windows\NTDS\ntds.dit<br>Temp. Database: .\TEMPINTEG1636.EDB<br><br>Checking database integrity.<br><br>Scanning Status (% complete)<br><br> 0    10   20   30   40   50   60   70   80   90  100<br>|----|----|----|----|----|----|----|----|----|----|<br>...................................................<br><br><br><strong>Integrity check successful.</strong><br><br>Operation completed successfully in 6.813 seconds.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>&nbsp;"NTDSUTIL" aracına tekrar dönüp "Veritabanı Anlam Çözümlemesi" kontrol edelim:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>ntdsutil
activate instance ntds
semantic database analysis
go
go fix
quit
quit</strong>

<strong>#GO Fix Report:</strong>
semantic checker: go fix
Fixup mode is turned on
Opening DIT database... Done.

Done.
......Done.
Writing summary into log file dsdit.dmp.1
SDs scanned:            105
Records scanned:       3724
Processing records..Done. Elapsed time 0 seconds.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Serveri DSRM Modundan çıkarıp yeniden başlatın:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>bcdedit /deletevalue safeboot 
shutdown -t 0 -r</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla – Best Regard</strong></p>
<!-- /wp:paragraph -->
