---
layout: post
title: PsExec Nedir?
date: 2022-09-13 22:00
author: theguler
comments: true
categories: [3th Party / Tools]
---
<!-- wp:image {"id":4426,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/psexec-2.png?w=669" alt="" class="wp-image-4426" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>PsExec </strong>uygulayacağınız komutları uzak Windows sistemlerde çalıştırarak sonuçları kendi ekranınızda monitör edebilmenizi sağlayan bir uzak yönetim aracıdır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>PsExec</strong> Toollunun mimarı <a rel="noreferrer noopener" href="https://en.wikipedia.org/wiki/Mark_Russinovich" target="_blank">Mark Russinovich</a>‘dir. Microsoft&nbsp;bu aracı satın alarak genel kullanıma sunmuştur.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Download Link: <a rel="noreferrer noopener" href="https://technet.microsoft.com/en-us/sysinternals/bb896649" target="_blank">buradan</a>&nbsp;:&nbsp;PsTools.ZIP</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Paket olarak indirilebilen PsTools paketindeki araçlar şunlardır:</strong>

<strong>PsExec </strong>- <strong>İşlemleri uzaktan yürütme</strong>
<strong>PsFile </strong>- uzaktan açılan dosyaları gösterir
<strong>PsGetSid</strong> - Bir bilgisayarın veya kullanıcının SID'sini görüntüleme
<strong>PsInfo -</strong> sistemle ilgili bilgileri listeleme
<strong>PsPing </strong>- ağ performansını ölçme
<strong>PsKill </strong>- işlemleri ada veya işlem kimliğine göre sonlandırma
<strong>PsList </strong>- işlemler hakkında ayrıntılı bilgileri listeleyin
<strong>PsLoggedOn</strong> - Yerel olarak ve kaynak paylaşımı aracılığıyla kimlerin oturum açtığını görün (tam kaynak dahildir)
<strong>PsLogList </strong>- olay günlüğü kayıtlarının dökümünü oluşturma
<strong>PsPasswd</strong> - hesap parolalarını değiştirir
<strong>PsService </strong>- hizmetleri görüntüleme ve denetleme
<strong>PsShutdown</strong> - Bilgisayarı kapatır ve isteğe bağlı olarak yeniden başlatır
<strong>PsSuspend </strong>- işlemleri askıya alır
<strong>PsUptime</strong> - Sistemin son yeniden başlatılmasından bu yana ne kadar süreyle çalıştığını gösterir (<strong>PsUptime</strong>'ın işlevselliği <strong>PsInfo</strong>'ya dahil edilmiştir</pre>
<!-- /wp:preformatted -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td><strong>Parametre</strong></td><td><strong>Kullanımı Hakkında</strong></td></tr><tr><td><strong>-a</strong></td><td>Uygulamanın hangi işlemcide uygulanacağı belirlenir. Örnek olarak uygulamayı CPU 1 ve CPU 2 de işletmek için “-a 1,2″ parametresini girmek gerekir.</td></tr><tr><td><strong>-c</strong></td><td>Belirtilen programı uzak bilgisayara kopyalar. Eğer boş bırakılırsa uygulamanın uzak sistemde çalıştırılabilir sistem yolu üzerinde bulunması gereklidir.</td></tr><tr><td><strong>-d</strong></td><td>Uygulamanın bitmesini bekleme.</td></tr><tr><td><strong>-e</strong></td><td>Belirlenmiş kullanıcı profilini yükler.</td></tr><tr><td><strong>-f</strong></td><td>Program uzak sistemde yüklü olsa bile kopyalama yapar.</td></tr><tr><td><strong>-i</strong></td><td>Uzak sistemin masaüstü ile etkileşecek şekilde programı çalıştırır.</td></tr><tr><td><strong>-l</strong></td><td>Süreç limitli kullanıcı olarak çalıştırır.</td></tr><tr><td><strong>-n</strong></td><td>Uzak bilgisayardan timeout zamanını saniye olarak belirler.</td></tr><tr><td><strong>-p</strong></td><td>Kullanıcı adına şifre belirler. Değer boş geçilirse şifre girişi için bir ekran açar.</td></tr><tr><td><strong>-s</strong></td><td>Uzak süreç Sistem hesabı ile çalışır</td></tr><tr><td><strong>-u</strong></td><td>Uzak bilgisayara giriş için kullanıcı adı belirler.</td></tr><tr><td><strong>-v</strong></td><td>Program eğer uzak bilgisayardakinden yeni veya daha üst versiyonda ise kopyalama işlemi yapar.</td></tr><tr><td><strong>-w</strong></td><td>Sürecin çalışacağı klasörü belirler.</td></tr><tr><td><strong>-x</strong></td><td>Kullanıcı arabirimini Winlogon masaüstünde gösterir.</td></tr><tr><td><strong>-priority</strong></td><td>Sürecin çalışma önceliğini belirler -low, -belownormal, -abovenormal, -high veya -realtime</td></tr><tr><td><strong>computer</strong></td><td>PsExec’in hangi bilgisayar veya bilgisayarlarda çalıştırılacağı belirler. Eğer boş bırakırsanız lokal sistemde çalışır, eğer bilgisayar ismi olarak “\\*” verilirse içinde bulunulan domaindeki bütün bilgisayarlarda uygulama çalıştırılır.</td></tr><tr><td><strong>@file</strong></td><td>PsExec’in yazi dosyasında listelenen her bilgisayar için çalışmasını sağlar</td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>CMD:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Uzak Bilgisayara Domain admin ve şifresi ile bağlanmak</strong>
<strong>psexec \\remote_computer &amp; ip -u domain\admin -p password -i process_name</strong>
psexec \\10.5.10.53 -u guler.com\faruk -p Password524+* -i cmd

<strong>#Uzak bilgisayarda uygulama(örn:NOTEPAD) başlatmak</strong>
psexec \\computer-istanbul -u guler.com\faruk -p Password524+* -i calc

<strong>#Uzak bilgisayarda PID numarasına bakarak uygulama sonlandırmak</strong>
pskill \\computer-istanbul -t 2672

<strong>#Uzak bilgisayarın ip adres bilgilerini almak</strong>
psexec \\COMPUTER-istanbul ipconfig -all

<strong>#Uzak bilgisayara mesaj göndermek</strong>
psexec \\COMPUTER-istanbul msg * merhaba-hello</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Uzak bilgisayarda Powershell'i açmak</strong>
psexec \\computer-istanbul -s -i -d powershell

<strong>#Uzak bilgisayarda Regedit'i açmak</strong>
psExec \\computer-istanbul -s -i regedit.exe
PsExec \\computer-istanbul -i -d "C:\windows\regedit.exe

<strong>#Uzak bilgisayarda Chrome çalıştırmak</strong>
PsExec \\10.5.x.x -i -d "C:\Program Files\Google\Chrome\Application\chrome.exe"

<strong>#Uzak bilgisayarda kullanıcı oluşturup parola tanımlamak</strong>
Net user wordpress Password123+ /add</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4420,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/psexec_add_user.png?w=1024" alt="" class="wp-image-4420" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best Regards.</strong></p>
<!-- /wp:paragraph -->
