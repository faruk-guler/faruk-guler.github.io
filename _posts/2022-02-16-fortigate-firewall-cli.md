---
layout: post
title: Fortigate Firewall ip Konfigürasyonu CLI
date: 2022-02-16 21:02
author: theguler
comments: true
categories: [UTM (Unified Threat Management)]
---
<!-- wp:image {"id":1852,"width":"470px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/maxresdf.jpg?w=1024" alt="" class="wp-image-1852" style="width:470px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Fortigate Firewall 7.0.3 UTM</strong></p>
<!-- /wp:paragraph -->

<!-- wp:separator {"opacity":"css"} -->
<hr class="wp-block-separator has-css-opacity" />
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p><a href="https://www.fortinet.com/">https://www.fortinet.com</a> oturum açılarak tüm sanal makineleri ve Güncel Firmwareler buradan indirilebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>https://support.fortinet.com/Download/VMImages.aspx https://support.fortinet.com/Download/FirmwareImages.aspx</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Bazı Notlar:</strong><br>Yapılacak her configürasyondan önce snapshots yada config backup alınmalıdır.<br>İlk olarak Fortigate 7.0.3 UTM cihazımızı Static Route yaparak internete erişir hale getirelim. DHCP den ip alınırsa Static Route gerek yoktur.<br>Sorunsuz internet erişimi için sistem saatini İstanbul-Türkiye yapmamız gerekmektedir.<br>Clientlerin internet erişimi yapması için ilk iş olarak Policy &amp; Object altından Firewall Policy yazılmalıdır.<br>Fortigate üzerinde DHCP servisi açılarak ip dağıtımı yaptırılabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Mimari: <strong>Clients </strong>&gt; <strong>Network adapter</strong> &gt; <strong>Fortigate Fw </strong>&gt; <strong>Wifi-Modem</strong> &gt; <strong>Internet </strong>olacak şekildedir.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre id="block-212c4770-1090-40f9-a3aa-882bb19bd474" class="wp-block-preformatted"><strong>Konfigürasyon - Configuration:</strong><br>Admin<br>Passwd<br>Passwd<br><br><strong>Tüm portları göster - Show all ports</strong><br><strong>#</strong> show ports <br><strong>#</strong> show system interface<br><br><strong>portları yapılandır - configure ports </strong><br><strong>#</strong> config system interface<br><br><strong>ilgili portu seçelim - let's select the relevant port </strong><br><strong>#</strong> edit port2<br><br><strong>statik ip ver - give static ip </strong><br><strong>#</strong> set mode static<br><br><strong>bu porta statik ip verelim - Let's give this port a static ip </strong><br><strong>#</strong> set ip 10.5.10.30 255.255.255.0<br><br><strong>yada bu porta DHCP den ip ver - give ip to this port from DHCP</strong><br><strong>#</strong> set mode dhcp<br><br><strong>işlemi sonlandırıp CLI ekrana geri dön - end process return to CLI screen</strong><br><strong>#</strong> end<br><br><strong>portları tekrar göster - show ports again</strong><br><strong>#</strong> show system interface<br><br><strong>port Configlerini yapılandır - configure port Configs</strong><br><strong>#</strong> config system interface<br><br><strong>port 2 yi yapılandır - configure port 2</strong><br><strong>#</strong> edit port2<br><br><strong>bu portta şunlara izin ver - allow on this port</strong><br> <strong>#</strong> set allowaccess ping http https ssh<br><br><strong>portları tekrar göster - show ports again</strong><br><strong>#</strong> show system interface<br><br><strong>sistemi restart et - restart the system</strong><br><strong>#</strong> execute reboot<br><br><strong>sistemi tamamen kapat - shut down the system completely</strong><br><strong>#</strong> execute shutdown<br><br><strong>Dikkat!! Cihazı fabrika ayarlarına döndür - Caution! Reset device to factory settings</strong><br><strong>#</strong> execute factoryreset</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong># Faydalı olması dileğiyle. – Hope it’s useful.</strong></p>
<!-- /wp:paragraph -->
