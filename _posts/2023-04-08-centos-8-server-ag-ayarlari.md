---
layout: post
title: CentOS 8 Ağ Ayarları - CentOS 8 Network Configuration
date: 2023-04-08 23:54
author: theguler
comments: true
categories: [RedHat]
---
<!-- wp:image {"id":6384,"width":578,"height":384,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dfdf.jpg?w=901" alt="" class="wp-image-6384" width="578" height="384" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Öncelikle Sistemde bulunan <strong>tüm ağ cihazlarını </strong>listeleyelim.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo nmcli d</strong>
<strong>sudo nmcli con show</strong>


DEVICE  TYPE      STATE      CONNECTION
<strong>ens160 </strong> ethernet  connected  <strong>ens160</strong>
lo      loopback  unmanaged  --</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":6387,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/conf_cent_eth1.png?w=745" alt="" class="wp-image-6387" /></figure>
<!-- /wp:image -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>İlk olarak, ağ yapılandırma dosyasını açın. </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Bu dosya bu dizinde <strong>"/etc/sysconfig/network-scripts/ifcfg-"</strong> ile başlar ve ardından ağ arayüzünüzün adını içerir. Örneğin, birincil ağ arayüzü "<strong>eth0</strong>" ise, dosya adı <strong>"/etc/sysconfig/network-scripts/ifcfg-eth0" </strong>olacaktır. Bu dosyayı düzenlemek için <strong>"vi"</strong> veya <strong>"nano</strong>" gibi bir metin düzenleyicisi kullanabilirsiniz. bendeki arayüzünüzün adı görüldüğü gibi <strong>"ens160" </strong>olarak görünüyor bu ismi <strong>DEVICE=</strong> kısmından değiştirebilirsiniz.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo nano /etc/sysconfig/network-scripts/ifcfg-ens160</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Ağ yapılandırma dosyasında, aşağıdaki satırları ekleyin veya var olanları düzenleyin: bendeki adaptörü: DEVICE=<strong>ens160</strong>  işlem sonunda yapılandırma dosyasını kaydedin ve düzenleyiciden çıkın.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=none
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=eui64
<strong>NAME=ens160</strong>
UUID=77325761-b31e-4646-acb8-d4f74a6f4799
<strong>DEVICE=ens160</strong>
ONBOOT=yes
IPADDR=10.5.10.58
PREFIX=24
GATEWAY=10.5.10.1
DNS1=10.5.10.10
<strong>DOMAIN=guler.com</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Burada, "DEVICE" satırında ağ arayüzünüzün adını belirtin. "BOOTPROTO" satırı, IP adresi için "static" veya "dhcp" seçeneklerinden birini içermelidir. Eğer statik bir IP kullanacaksanız, "IPADDR", "NETMASK" ve "GATEWAY" satırlarına doğru değerleri girin. "DNS1" ve "DNS2" satırları, DNS sunucularınızın IP adreslerini içermelidir. "ONBOOT" satırı, ağ arayüzünüzün her açılışta otomatik olarak etkinleştirilmesini sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Bu değişikliklerin etkili olması için&nbsp;ağı&nbsp;şu komutla yeniden başlatmanız gerekir:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo systemctl restart NetworkManager
sudo systemctl start NetworkManager
#sudo systemctl stop NetworkManager
systemctl status NetworkManager</strong>
</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>CentOS 8'de GUI Kullanarak Ağ Ayarlarının Yapılandırılması</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Bu yöntem, nmtui (<strong>NetworkManager Text User Interface) </strong>adlı arayüzü kullanır ve ağ yapılandırmasını daha kullanıcı dostu bir şekilde yapmanızı sağlar. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>CentOS, Fedora ve RHEL </strong>gibi bazı Linux dağıtımlarında NetworkManager zaten varsayılan olarak yüklüdür ve NMTUI'yi kurmak için sadece aşağıdaki komutu çalıştırmanız yeterlidir</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo yum install NetworkManager-tui</strong>
</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Ubuntu ve Debian </strong>gibi diğer Linux dağıtımlarında ise imdilik defaut olarak gelmiyor aşağıdaki komutu kullanarak NMTUI'yi yükleyebilirsiniz:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo apt-get install network-manager</strong>
</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":6393,"width":543,"height":311,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/conf_cent_eth2.png?w=694" alt="" class="wp-image-6393" width="543" height="311" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo nmtui</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:list {"ordered":true,"start":2} -->
<ol start="2"><!-- wp:list-item -->
<li>"Activate a connection" seçeneğini seçin ve "OK" düğmesine basın.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Açılan listeden istedğiniz ağ arayüzünüzü seçin ve "OK" düğmesine basın.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>"Edit a connection" seçeneğini seçin ve "OK" düğmesine basın.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Yeni açılan pencerede, aşağıdaki ağ ayarlarını yapılandırın:</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>IPv4</strong> CONFIGURATION: "Manual" seçeneğini seçin.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>IP ADDRESSES: Statik IP adresinizi ve netmask'ınızı girin.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>GATEWAY: Ağ geçidinizi girin.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>DNS: DNS sunucularınızın IP adreslerini girin.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>veya </strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>IPv6 </strong>CONFIGURATION: "Manual" seçeneğini seçin.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>IP ADDRESSES: Statik IP adresinizi ve netmask'ınızı girin.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>GATEWAY: Ağ geçidinizi girin.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>DNS: DNS sunucularınızın IP adreslerini girin.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list {"ordered":true,"start":6} -->
<ol start="6"><!-- wp:list-item -->
<li>Ayarlarınızı kaydetmek için "OK" düğmesine basın ve ardından "Quit" düğmesine basarak <strong>nmtui</strong>'yi kapatın.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Ağ bağlantınızı yeniden başlatmak için aşağıdaki komutu çalıştırın:</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo systemctl restart NetworkManager
sudo systemctl start NetworkManager
#sudo systemctl stop NetworkManager
systemctl status NetworkManager</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Ağ bağlantınızı test etmek için "ping" komutunu kullanabilirsiniz. Örneğin, "ping farukguler.net"</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>ping farukguler.net</strong>

PING farukguler.net (192.0.78.24) 56(84) bytes of data.
64 bytes from 192.0.78.24 (192.0.78.24): icmp_seq=1 ttl=128 time=106 ms
64 bytes from 192.0.78.24 (192.0.78.24): icmp_seq=2 ttl=128 time=72.7 ms
64 bytes from 192.0.78.24 (192.0.78.24): icmp_seq=3 ttl=128 time=71.5 ms
64 bytes from 192.0.78.24 (192.0.78.24): icmp_seq=4 ttl=128 time=67.5 ms
64 bytes from 192.0.78.24 (192.0.78.24): icmp_seq=5 ttl=128 time=70.4 ms
64 bytes from 192.0.78.24 (192.0.78.24): icmp_seq=6 ttl=128 time=96.8 ms
64 bytes from 192.0.78.24 (192.0.78.24): icmp_seq=7 ttl=128 time=97.7 ms
64 bytes from 192.0.78.24 (192.0.78.24): icmp_seq=8 ttl=128 time=73.9 ms</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":6398,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/eth_conf_ping.png?w=903" alt="" class="wp-image-6398" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Görüldüğü üzere "<strong>ens160</strong>" ağ adaptörü sorunsuz çalışmakta, başka bir makalede görüşmek üzere.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Best Regards. – Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
