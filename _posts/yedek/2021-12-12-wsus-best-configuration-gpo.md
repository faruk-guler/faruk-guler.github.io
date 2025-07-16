---
layout: post
title: Wsus Best Configuration (GPO)
date: 2021-12-12 12:55
author: theguler
comments: true
categories: [Windows Group Policy GPO]
---
<!-- wp:image {"id":532,"width":"448px","height":"auto","aspectRatio":"1.7928994082840237","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/sccm-wsus.jpg?w=541" alt="" class="wp-image-532" style="aspect-ratio:1.7928994082840237;width:448px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Firewall İzinleri:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre id="block-212c4770-1090-40f9-a3aa-882bb19bd474" class="wp-block-preformatted"><strong>Allow URL's:</strong>
https://*.microsoft.com
https://*.windowsupdate.com
http://*.microsoft.com
http://*.windowsupdate.com

<strong>Allow PORTS:</strong>
80 , 443</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>GPO: </strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>"Computer Configuration &gt; Policies &gt; Administrative Templates &gt; Windows Components &gt; Windows updates &gt; Configure Automatic Updates"</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading" id="1-settings-state-gpo-name-status-durum">1) Settings State GPO Name Status - Durum</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>1) Configure Automatic Updates Enabled<br>2) Always automatically restart at the scheduled time Enabled<br>3) Specify intranet Microsoft update service <strong>"location"</strong> Enabled  <a href="https://wsus.guler.com:8530">https://wsus.guler.com:8530</a><br>4) Automatic Updates detection frequency Enabled<br>5) Allow non-administrators to receive update notifications Enabled</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>[a] Configure Automatic Updates</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>[1]</strong> Notify for download and notify for install: Yeni update geldiğinde indireyim mi diye sor ve indirdikten sonrada kurulumu yapılsın mı diye sor.<br><strong>[2]</strong> Auto download and notify for install: Otomatik olarak indir ve kurulum yapılsın mı diye sor.<br><strong>[3] </strong>Auto download and schedule the install: Hiç bir şey sorma otomatik olarak indir ve benim aşağıdaki bölümde belirteceğim gün ve saatte kurulumu yap.<br><strong>[4]</strong> Allow local admin to choose setting: Local admin nasıl istiyorsa update’leri one indirip kurulumu yapsın.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Ben <strong>[2] </strong>seçenek olan Auto download and notify for install ‘ı seçiyorum. <strong>“Apply”</strong> diyorum.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>[b]</strong> Always automatically restart at the scheduled time:<br>Windows Update önemli güncellemeleri yükledikten sonra kullanıcıları oturum açma ekranında en az iki gün boyunca bilgilendirmek yerine her zaman bir yeniden başlatma süresi 15 dk vs.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>[c]</strong> Specify intranet Microsoft update service location:<br>Intranet Microsoft güncelleştirme hizmeti konumunu belirtiyorum.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>[d<strong>]</strong> </strong>Automatic Updates detection frequency:<br>Otomatik güncelleme denetleme zamanını 12 saatte 1 olarak ayarlıyorum.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>[e]</strong> Allow non-administrators to receive update notifications:<br>Yönetici olmayanların güncelleştirme yapabilmesi için bu seçeneğini aktif ediyorum.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>WSUS Group policy Regedit üzerinden test edilmeldir. - WSUS Group policy should be tested via Regedit.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>REG:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre id="block-212c4770-1090-40f9-a3aa-882bb19bd474" class="wp-block-preformatted">HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\WindowsUpdate</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Clientler Üzerinden Test Ededelim - Let's Test on Clients</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>İstemcilerin WSUS sunucuya erişimini web tarayıcısından kontrol edebilirsiniz.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Clientlerdeki browser(chrome,firefox vs) üzerinden <a href="https://wsus.guler.com/iuident.cab" target="_blank" rel="noreferrer noopener">https://wsus.guler.com/iuident.cab</a>  adresine girerseniz .cab dosyasını indirebiliyor olmanız gerekmektedir. eğer indiremiyorsanız ağınızdaki güvenlik cihazının port ayarlarını yada GPO üzerindeki ayarları vs. kontrol ediniz.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading" id="clientler-wsus-consolu-uzerinde-gorunmuyor-clients-do-not-appear-on-wsus-console"><strong>Clientler Wsus consolu üzerinde görünmüyor ? - Clients do not appear on Wsus console?</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Powershell’i administrator olarak açın aşağıdai komutları sırasıyla çalıştırın. - Open Powershell as administrator and run the following commands in order.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Windows Server 2016 ve 2019 için;</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>PS:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre id="block-212c4770-1090-40f9-a3aa-882bb19bd474" class="wp-block-preformatted">Stop-Service -Name BITS, wuauserv -Force
Start-Service -Name BITS, wuauserv
wuauclt /resetauthorization /detectnowwuauclt /reportnow
(New-Object -ComObject Microsoft.Update.AutoUpdate).DetectNow()</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Windows Server 2012 için;</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre id="block-212c4770-1090-40f9-a3aa-882bb19bd474" class="wp-block-preformatted">Stop-Service -Name BITS, wuauserv -Force
Start-Service -Name BITS, wuauserv
wuauclt /resetauthorization /detectnow
wuauclt /reportnow</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Eğer GPO iptal edilip bilgisayarlar GPO dan çıkarılacaksa  Yukarıdaki <strong>Regedit</strong> ayarları silinmelidir. Bunu tüm domainde yapacağınız için tek tek uğraşmak yerine <strong>reg policy</strong> yapabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Yararlı olması dileğiyle. - Hope it's useful.</strong></p>
<!-- /wp:paragraph -->
