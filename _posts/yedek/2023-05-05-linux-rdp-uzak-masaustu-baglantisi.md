---
layout: post
title: Linux Uzak Masaüstü Bağlantısı
date: 2023-05-05 23:11
author: theguler
comments: true
categories: [Linux / Unix]
---
<!-- wp:image {"id":7008,"width":600,"height":337,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/kali_rdp.jpg?w=750" alt="" class="wp-image-7008" width="600" height="337" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Linux işletim sistemleri, </strong>sunucu ve masaüstü gibi çeşitli kullanım senaryolarına uygun olarak tasarlanmıştır. Ancak, uzaktan erişim ve yönetim için yerleşik bir ara yüzleri yoktur. Bu nedenle, Linux kullanıcıları uzaktan erişim gerektiğinde, birçok farklı seçenek arasından seçim yapmak zorunda kalırlar.<br>Bir seçenek, uzaktan erişim için SSH (Secure Shell) protokolünü kullanmaktır. SSH, bir Linux makinesine güvenli bir şekilde uzaktan erişim sağlamak için kullanılan bir protokoldür. Ancak, SSH sadece komut satırı arayüzü (CLI) üzerinden çalışır ve GUI (grafik arayüz) desteği yoktur.<br>Bunun yerine, bir GUI'ye sahip uzak bir masaüstü bağlantısı oluşturmak istiyorsanız, uzak masaüstü protokolleri kullanmanız gerekir. Birçok uzak masaüstü protokolü mevcuttur, ancak en yaygın kullanılanı Microsoft Uzak Masaüstü Protokolü (RDP) ve Virtual Network Computing (VNC) protokolüdür.<br>Linux kullanıcıları, bir RDP sunucusu kurarak uzak bir Windows masaüstüne veya bir VNC sunucusu kullanarak başka bir Linux veya Unix tabanlı sisteme bağlanabilirler. Alternatif olarak, XRDP gibi açık kaynaklı bir RDP sunucusu da kullanılabilir.<br>İşte bu makalede ise XRDP kurulumu ve gerekli Konfigürasyonlara değineceğim.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">"<strong>XRDP" Nedir?</strong></h2>
<!-- /wp:heading -->

<!-- wp:image {"id":7031,"width":363,"height":420,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/xrdp-1.png?w=820" alt="" class="wp-image-7031" width="363" height="420" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>XRDP,</strong> Linux işletim sistemi üzerinde RDP (Remote Desktop Protocol) bağlantısı sağlayan bir açık kaynaklı bir yazılımdır. XRDP, Windows uzak masaüstü bağlantısı gibi bir uzak masaüstü bağlantısı oluşturmanıza olanak tanır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>XRDP, </strong>bir X sunucusu aracılığıyla çalışır ve Linux masaüstü ortamlarında (örneğin, XFCE, GNOME, KDE) çalışabilir. XRDP'nin kullanımı kolaydır ve çoğu Linux dağıtımı tarafından desteklenir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://www.xrdp.org">https://www.xrdp.org</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Öncelikle Sunucumuza XRDP paketini yükleyelim.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo apt update
sudo apt upgrade
sudo apt install xrdp</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>XRDP konfigürasyon dosyasını düzenleyelim</strong> <strong>ve servisi restart edelim.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#XRDP yapılandırma dosyasını düzenlemek için:
<strong>sudo nano /etc/xrdp/xrdp.ini</strong>











#Servisi yeniden başlatalım.
<strong>sudo service xrdp restart</strong>
<strong>sudo systemctl restart xrdp</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>XRDP için Firewall ayarlarını yapılandıralım. XRDP, varsayılan olarak "3389" portunu kullanır</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#Firewall (ufw) nin açık olduğundan emin olmak için:
<strong>sudo ufw enable
sudo ufw status</strong>

#XRDP'nin kullanacağı portu açmak için: Varsayılan olarak, XRDP 3389 numaralı portu kullanır.
<strong>sudo ufw allow 3389/tcp</strong>

#xrdp-sesman TCP Portu üzerinden gelen başka bir trafiğe izin vermek için:
#<strong>sudo ufw allow 3350/tcp</strong>

#Firewall kurallarını listeyebilmek için:
<strong>sudo ufw status numbered</strong>

#IP adresi ve portlardan gelen bağlantılara izin vermek için:
<strong>sudo ufw allow from 192.168.1.100 to any port 3389/tcp
sudo ufw allow from 192.168.1.200 to any port <strong>3350</strong>/tcp</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>XRDP servisini yönetmek için gerekli komutlar:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#XRDP servisini başlatmak için:
<strong>sudo systemctl start xrdp</strong>

#XRDP servisini durdurmak için:
<strong>sudo systemctl stop xrdp</strong>

#XRDP hizmetini yeniden başlatmak için:
<strong>sudo systemctl restart xrdp</strong>
<strong>sudo service xrdp restart</strong>

#XRDP hizmetinin sistem başlangıcında otomatik olarak başlaması için:
<strong>sudo systemctl enable xrdp</strong>

#Ubuntu 20.04'de bir xrdp kullanıcısına sertifika erişimi vermek için: (komutu, "xrdp" kullanıcısını "ssl-cert" grubuna ekler. Bu işlem, xrdp'nin <strong>SSL/TLS </strong>sertifikalarını kullanabilmesi için gereklidir.)
<strong>sudo usermod -a -G ssl-cert xrdp</strong>

#XRDP yapılandırma dosyasını düzenlemek için:
<strong>sudo nano /etc/xrdp/xrdp.ini</strong>

#XRDP oturumu açıldığında başlatılacak masaüstü ortamını yapılandırmak için:
<strong>sudo nano /etc/xrdp/startwm.sh</strong>

#XRDP hizmetinin durumunu görmek için:
<strong>sudo systemctl status xrdp</strong>

#XRDP hizmetini yeniden yüklemek için:
<strong>#sudo systemctl reload xrdp</strong>

#netstat ile RDP bağlantılarını dinlediğini doğrulamak için:
<strong>sudo netstat -plnt | grep rdp
sudo netstat -antp | grep xrdp</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>XRDP, </strong>den daha fazla performans almak isteğimiz için<strong> "Unity" </strong>veya <strong>"Gnome" </strong>masaüstü kullanmak yerine, daha hafif bir masaüstü ortamı olan<strong> "XFCE" </strong>masaüstü ortamını yükleyelim.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">"<strong>XFCE" Nedir?</strong></h2>
<!-- /wp:heading -->

<!-- wp:image {"id":7016,"width":426,"height":222,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/xfce-1.png?w=728" alt="" class="wp-image-7016" width="426" height="222" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>XFCE, </strong>açık kaynak kodlu bir masaüstü ortamıdır. Linux, BSD ve diğer Unix benzeri işletim sistemleri üzerinde çalışabilir. XFCE, hafif bir tasarımı ve minimum sistem kaynağı kullanımı ile öne çıkar. Bu nedenle, daha az güçlü bilgisayarlarda ve düşük sistem kaynaklarına sahip cihazlarda hızlı ve düzgün bir şekilde çalışabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong><a href="https://www.xfce.org">https://www.xfce.org</a></strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#XFCE masaüstü ortamını yüklemek için:
<strong>sudo apt-get install xfce4</strong>

#XFCE masaüstü ortamını başlatmak için:
<strong>startxfce4</strong>

#Oturumunuzu başlattığınızda kullanmak istediğiniz masaüstü ortamını seçmek için:
<strong>echo xfce4-session &gt;~/.xsession</strong>
<strong>echo gnome-session &gt;~/.xsession</strong>
...........
.........
....

#İstediğiniz masaüstünden çıkış yapmak veya oturumu sonlandırmak için:
<strong>xfce4-session-logout
gnome-session-quit</strong>

#XFCE ayarlarını yapılandırmak için: Örneğin, masaüstü arka planını, çözünürlüğü, etc.
<strong>xfconf-query</strong>

#XFCE ayarlarını grafik arayüzü kullanarak değiştirmek için:
<strong>xfce4-settings-manager</strong>

#XFCE pencere yöneticisini yeniden başlatmak için:
<strong>xfwm4 --replace</strong>

#Ekran çözünürlüğünü yapılandırmak için:(Bu komuttan sonra, "Display" ayarlarının yapılandırılması için grafik arayüzü açılacaktır.) 
<strong>xfce4-display-settings</strong>

#Ses ayarlarını yapmak için:
<strong>xfce4-mixer</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>“<strong>GNOME" Nedir?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7071,"width":460,"height":271,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/gnome-1.jpg?w=1024" alt="" class="wp-image-7071" width="460" height="271" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>GNOME, özgür ve açık kaynak kodlu bir masaüstü ortamıdır. GNOME, GNU Projesi'nin bir parçası olarak geliştirilmiştir ve genellikle Linux tabanlı işletim sistemleri için kullanılmaktadır, ancak aynı zamanda diğer işletim sistemleri için de kullanılabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://www.gnome.org"><strong>https://www.gnome.org</strong></a></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#GNOME masaüstü ortamını yüklemek için:
<strong>sudo apt install ubuntu-gnome-desktop</strong>
<strong>#sudo reboot</strong>

#GNOMEmasaüstü ortamını başlatmak için:
<strong>startx</strong>
<strong>sudo systemctl start gdm</strong>
<strong>gnome-session</strong>

#Oturumunuzu başlattığınızda kullanmak istediğiniz masaüstü ortamını seçmek için:
<strong>echo gnome-session &gt;~/.xsession
echo xfce4-session &gt;~/.xsession</strong>

.............
.......
......
...</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Umarım faydalı olmuştur. - I hope it was useful.</strong></p>
<!-- /wp:paragraph -->
