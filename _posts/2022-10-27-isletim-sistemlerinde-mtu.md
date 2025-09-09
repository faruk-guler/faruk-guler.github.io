---
layout: post
title: MTU değerini nasıl değiştirirsiniz?
date: 2022-10-27 22:35
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":5209,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/mtusizer.png?w=986" alt="" class="wp-image-5209" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>MTU (Maximum Transmission Unit)</strong> ağ iletişiminde kullanılan bir terimdir ve bir veri paketinin taşıyabileceği en büyük veri miktarını belirtir. MTU değeri, bir ağ arayüzü tarafından gönderilebilecek en büyük veri boyutunu belirler. Bu nedenle, ağdaki diğer cihazlar ile iletişimde kullanılan MTU değerleri uyumlu olmalıdır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Windows işletim sistemlerinde, <strong>MTU değeri varsayılan olarak 1500'dür.</strong> Bu değer, Ethernet ve Wi-Fi gibi geniş bant ağ bağlantılarında kullanılır. Ancak, bazı durumlarda, özellikle VPN veya DSL bağlantıları gibi daha yavaş bağlantılar için bu değer optimize edilmelidir. MTU değeri, Windows'ta "netsh" komutu kullanılarak değiştirilebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Öte yandan, Linux işletim sistemleri için MTU değeri farklı şekilde yönetilir. Linux, farklı ağ arayüzleri için farklı MTU değerleri atayabilir. MTU değeri, "ifconfig" komutu kullanılarak görüntülenebilir ve değiştirilebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Linux'ta, MTU ayarlamaları ayrıca "ip" komutu ile de yapılabilmektedir. "ip link" komutu kullanılarak ağ arayüzleri listelenebilir ve "ip link set" komutu kullanılarak MTU ayarlamaları yapılabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>MTU ayarları genellikle ağ performansını artırmak veya sorunları çözmek için yapılmaktadır. Ancak, uygun olmayan MTU ayarları ağ performansını olumsuz yönde etkileyebilir veya hatta bağlantı kesintilerine neden olabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Windows Sistemlerde MTU Ayarı:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Windows Sistemlerde MTU:</strong>
<strong>PowerS<strong>h</strong>ell:</strong>
netsh interface ipv4 show interfaces
netsh interface ipv4 show subinterfaces

netsh interface ipv4 set subinterface "Ethernet" mtu=1458 store=persistent</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Ubuntu</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#<strong>Ubuntu</strong></strong> <strong>shell</strong>
ifconfig | grep mtu
ifconfig eth0
ifconfig dev mtu 9000</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Rhel7</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Rhel7 shell</strong>
ip link show dev eth0
ip link set dev eth0 9000</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>CentOS7</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#<strong>CentOS7</strong></strong> <strong>shell</strong>
ifconfig eth0
ip link show dev eth0
ip link set mtu 9000 dev eth0

<strong>#bu değişikliğin sunucu her yeniden başlatıldığında devam etmesi için;</strong>
<strong>/etc/sysconfig/network-scripts/ifcfg-eth0</strong> dosyasına bir “<strong>MTU=</strong>” değer satırı ekleyin.
<strong>MTU=9000</strong>
</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>VMware Esxi</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>VMware vSphere Interface</strong>
1:<strong>VMware vSphere </strong> istemcisiyle ana bilgisayarda  oturum açın.
2:<strong>Yapılandırma </strong> sekmesini açın.
3:<strong>Donanım </strong>altında <strong>Ağ </strong>seçeneğini seçin.
4:<strong>Yapılandırılacak vSwitch</strong> üzerinden <strong>özellikleri</strong> seçin.
5:<strong>Gelişmiş </strong>altında <strong>MTU seti </strong>görünür hale gelecektir. Varsayılan değer 1500'dür. 
6:<strong>vSwitch </strong>seçiliyken alttan <strong>Düzenle</strong>'ye tıklayın.
7:<strong>Genel </strong>sekmesinde Gelişmiş <strong>Özellikler</strong> etiketli bir kutuyu açın.
8:Buradaki <strong>MTU</strong>'yu  <strong>1500</strong>'den <strong>9000</strong>'e  değiştirin  ve Tamam'a  tıklayın.
9:Ayrıca VMK <strong>(VM çekirdeği)</strong> için MTU'yu değiştirin.
10:Aynı  <strong>vSwitch Properties</strong> kutusunda listelenen ilk <strong>VMK</strong>'yi seçin.
11:<strong>MAC adresi</strong> ve <strong>MTU</strong>, <strong>NIC Ayarları altında</strong> listelenir.
12:Özellikler kutusunda, Genel sekmesindeki NIC ayarlarından <strong>MTU</strong>'yu  9000 olarak ayarlayın.
13:Bunu sanal anahtar altındaki tüm <strong>VMK</strong>'ler için tekrarlayın.
14:<strong>vSwitch özellikleri</strong> iletişim kutusunu kapatın diğer vSwitch'ler için tekrarlayın.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
