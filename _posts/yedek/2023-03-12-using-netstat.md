---
layout: post
title: Netstat Kullanımı - Using Netstat Linux &amp; WinOS
date: 2023-03-12 00:20
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":6028,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/netstat.png?w=735" alt="" class="wp-image-6028" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Netstat,</strong> Windows işletim sistemiyle birlikte gelen güçlü bir komut satırı aracıdır ve ağ izleme, bağlantı durumu inceleme, port dinleme ve diğer ağla ilgili görevleri gerçekleştirmek için oldukça kullanışlıdır. Bu komut, bilgisayarınızın ağ bağlantılarını ve portlarını ayrıntılı bir şekilde incelemek ve yönetmek için mükemmel bir araçtır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>TCP/IP </strong>iletişim prensibi,<strong> </strong>farklı ağ cihazları arasında veri alışverişi yapmak için kullanılır. Her paket, kaynak cihazdan hedef cihaza taşınır ve bu sayede iletişim sağlanır. Bu prensip, internetin ve modern ağların çalışma temelini oluşturur</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>State (Durumlar):</strong></h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Listening (Dinleme):</strong> Bu durum, bir bilgisayarın belirli bir portu dinlediğini ve bu port üzerinden gelen bağlantıları beklediğini gösterir. Yani, dışarıdan gelen bağlantıları bu port üzerinden kabul etmeye hazır durumdadır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Established (Kurulmuş/Sağlanmış):</strong> <strong>"Established"</strong> durumu, iki bilgisayar arasında başarılı bir bağlantının kurulduğunu gösterir. Örneğin, bir web tarayıcısı bir web sunucusuna bağlandığında, bağlantı "established" durumuna geçer ve veri alışverişi bu bağlantı üzerinden gerçekleşir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Close_wait (Kapanma Beklemesi):</strong> Bu durum, bir bilgisayarın bir bağlantının kapatılmasını beklediğini gösterir. Genellikle bu durum, her iki tarafın bağlantının tamamen kapatılması için gereken son veri paketlerini beklediği bir aşamadır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Time_wait (Zaman Beklemesi):</strong> "Time_wait" durumu, bir bağlantının kapatıldığını gösterir, ancak belirli bir süre boyunca bağlantının tamamen kapanmasının beklediğini gösterir. </li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Windows CMD &amp; PowerShell:</strong>

<strong>netstat -a</strong> Tüm bağlantıları ve dinleme bağlantı noktalarını görüntüler.
<strong>netstat -a | more</strong>
<strong>netstat -at</strong> Sadece TCP Portları Listeleme
<strong>netstat -b </strong>Her Bağlantı veya Dinleme Bağlantı Noktası İle İlişkili Çalıştırılabilir Dosyayı Gösterir.
<strong>netstat -e </strong>Ethernet İstatistiklerini Gösterir.
<strong>netstat -f </strong>Yabancı adresler için Tam Etki Alanı Adlarını <strong>(FQDN)</strong> görüntüler.
<strong>netstat -n </strong>Adresleri ve Bağlantı Noktalarının Numaralarını Sayısal Biçimde Gösterir
<strong>netstat -an</strong> Dosya Alırken Karşıdakinin IP adresini Gösterir.
<strong>netstat -any</strong>
<strong>netstat -o</strong> Her Bağlantıyla İlişkili Sahip İşlem Kimliğini Gösterir.
<strong>netstat -p</strong> İletişim Kuralının Bağlantılarını Gösterir.
<strong>netstat -tp</strong> PID Numarasıyla Portu Kullanan Servisi Görüntüleme
<strong>netstat -q</strong> Bağlantı kuyruğu <strong>(connection queue)</strong> bilgilerini görüntüler.
<strong>netstat -s</strong> protokol başına istatistikleri görüntüleme seçeneği, protokol aşağıdakilerden herhangi biri olabilir: IP, IPv6, ICMP, ICMPv6, TCP, TCPv6, UDP veya UDPv6
<strong>netstat -r </strong>Yönlendirme Tablosunu Gösterir.
<strong>netstat -s</strong> her İletişim Kuralları İçin İstatistikleri Gösterir.
<strong>netstat -t</strong> Geçerli bağlantı boşaltma durumunu görüntüler.
<strong>netstat -x </strong>NetworkDirect bağlantılarını, dinleyicileri ve paylaşılan uç noktaları görüntüler.
<strong>netstat -v </strong>En Önemli Netstat Komutu Olan -v -b İle Birlikte Kullanılırsa Tüm Çalışan Dosyalar İçin Bağlantı ve Bağlantı Noktası Oluşumu İle İlgili Bileşenlerin Sırasını Gösterir.
<strong>netstat -y </strong>Tüm bağlantılar için TCP bağlantı şablonunu görüntüler. Diğer seçeneklerle birleştirilemez.
<strong>netstat -y 5 </strong> 5 saniye aralıklarla tekrar kontrol eder.


<strong>Linux Terminal:</strong>
.
.</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":8915,"width":"574px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/pid.png?w=772" alt="" class="wp-image-8915" style="width:574px;height:auto" /></figure>
<!-- /wp:image -->
