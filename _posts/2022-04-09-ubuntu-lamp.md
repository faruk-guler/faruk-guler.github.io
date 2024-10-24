---
layout: post
title: Ubuntu LAMP Server Kurulumu
date: 2022-04-09 14:10
author: theguler
comments: true
categories: [Web Servers]
---
<!-- wp:image {"id":2597,"width":"548px","height":"308px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/lamp.webp?w=1024" alt="" class="wp-image-2597" style="width:548px;height:308px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>LAMP Server kurulumunu <strong>(7) </strong>başlık altında topladım</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li><strong>Apache Web Server kurulumu:</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>PHP kurulumu:</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>MySQL Server Kurulumu:</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>phpMyAdmin Kurulumu:</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Güvenlik Duvarı Yapılandırılmaları</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Virtual-Sanal Hostların Ayarlanması</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Let’s Encrypt İle SSL Sertifikası Kurulumu</strong> (sonra farklı bir yazıda anlatılacak)</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Öncelikle <strong>Ubuntu</strong> depolarımızı güncelleyelim:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>lsb_release -a
#ubuntu version check</strong>

<strong>sudo apt update</strong>
<strong>sudo apt-get upgrade</strong> <strong>#upgrade</strong> <strong>etmek istenirse</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Apache Web Server kurulumu:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Öncelikle Apache kurulumu yapacağız. Bu işlem sayesinde Web server  hizmetini başlatmış olacağız. kurulumda gelen tüm sorulara 'yes' diyerek devam edelim.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo apt install apache2</strong>

<strong>apache2 -v
#<strong>Apache</strong></strong> <strong>versiyon check</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>PHP kurulumu:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Apache Web servisi kurumundan sonra  sonra PHP son versiyonunun kurulumunu yapacağız.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo apt install php libapache2-mod-php php-mysql -y</strong>
#PHP 'nin Apache altında çalışabilmesi ve <strong>MySQL</strong> ile iletişim kurabilmesi için bazı yardımcı paketleri kurar:

<strong>sudo apt install php</strong>
#sade bir şekilde PHP kur

<strong>sudo nano /etc/apache2/mods-enabled/dir.conf</strong>
#öncelik olarak PHP dosyalarını tanıtmak

<strong>sudo systemctl restart apache2</strong>
#apache sevisini restart et

<strong>sudo systemctl status apache2</strong>
#apache sevisini kontrol et

<strong>apt search php- | less</strong>
#PHP 'nin işlevselliğini artırmak için bazı ek modüller gerekir, bunları gör (istek üzerine kurabilirsiniz.

<strong>sudo apt install php-cli</strong>
#Örneğin <strong>php-cli</strong> modülünün ihtiyacınız olan bir şey olduğuna karar verdiyseniz şu komutmuz bu</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Eğer son sürüm değil de eski sürümler ile çalışmak istiyorsanız PHP sürümünü belirtmeniz gerekir.&nbsp;<em>(Örnek : sudo apt install php5)</em></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Kurulum sonu yüklenen PHP versiyonunu kontrol edelim.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>php --version</strong>
#<strong>PHP <strong>version</strong></strong> check</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":2631,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/version.png?w=782" alt="" class="wp-image-2631" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>MySQL Nedir? MySQL Server Kurulumu:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>MySQL, SQL(Structured Query Language) </strong>tabanlı, Oracle destekli bir açık kaynaklı ilişkisel veritabanı yönetim sistemidir. <strong>(RDBMS). MySQL, Linux, UNIX ve Windows </strong>dahil olmak üzere hemen hemen tüm platformlarda çalışır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>MySQL, <strong>LAMP</strong> adı verilen açık kaynaklı bir kurumsal yığının önemli bir bileşenidir. LAMP, işletim sistemi olarak Linux, web sunucusu olarak Apache, ilişkisel veritabanı yönetim sistemi olarak <strong>MySQL </strong>ve nesne yönelimli komut dosyası dili olarak <strong>PHP</strong> kullanan bir web geliştirme platformudur. (Bazen PHP yerine Perl veya Python kullanılır.)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>MySQL Server kurulumu</strong>:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu kurulumda dikkat edilecek bazı noktalar vardır. MySQL’de kullanılacak<strong> “root” </strong>parolasının girilmesi gibi.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>MySQL server kurulumu için gerekli komutlar:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#<strong>sudo apt install php-mysql</strong>
<strong># Belirli bir sürüm için (Örnek:sudo apt install php5-mysql)</strong>

<strong>sudo apt install mysql-server</strong>

<strong>sudo mysql_secure_installation</strong>
#Güvenlik komut dosyasını çalıştıralım(msysql DB için 3 farklı şifre düzeyi vardır)

<strong>sudo mysql</strong>
#şifre işleminden sonra MySQL konsoluna giriş yapın:

<strong>SELECT user,authentication_string,plugin,host FROM mysql.user;</strong>
#kullanıcıyı doğrula

<strong>ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Sifrem123';</strong>
#root kullanıcısını phpMyadmin üzerinen login olacak hale getir.


<strong>FLUSH PRIVILEGES;</strong>
# veritabanı dosyalarını auth_socket yeniden düzenle


<strong>SELECT user,authentication_string,plugin,host FROM mysql.user;</strong>
#kullanıcıyı tekrar doğrula

<strong>mysql -V</strong>
#mysql version check</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":2661,"width":"825px","height":"380px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/mysqly6u.png?w=1024" alt="" class="wp-image-2661" style="width:825px;height:380px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>görüldüğü gibi root kullanıcısı <strong>mysql_native_password</strong> şifre ile giriş yapabilir hale geldi.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>MySQL kurulumu ve gerekli ayarları tamamlandı.  kurulum sonu Apache Web servisini yeniden başlatmamız gerekecektir.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo /etc/init.d/apache2 restart</strong>
#Apache Web servisini restart et</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Apache için Ubuntu Güvenlik Duvarının Yapılandırması</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#Apache Güvenlik Duvarının Yapılandırması
<strong>sudo ufw status</strong>
<strong>sudo ufw app list
sudo ufw allow apache
sudo ufw allow in "Apache Full"
sudo ufw allow https
sudo ufw allow http</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Apache her açılışa dizinleri altında&nbsp;<code><strong>index.html</strong></code>&nbsp;adlı dosyayı arar. Ancak biz sunucumuzda ağırlıklı olarak PHP dosyaları kullanacaksak, Yani web sunucumuza öncelikle PHP dosyalarını yok ise HTML dosyalarını tercih etmesini söylememiz gerekir. bunu sıralamayı değiştirerek düzenleyebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo nano /etc/apache2/mods-enabled/dir.conf</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">&lt;IfModule mod_dir.c&gt;
        DirectoryIndex <strong>index.php</strong> <strong>index.html</strong> index.cgi index.pl index.xhtml index.htm
&lt;/IfModule&gt;

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Eğer elinizde hazır test PHP dosyaları var ise, bu dosyayı&nbsp;<strong>&nbsp;/var/www/html/</strong>&nbsp;dizin içerisine atıp tarayıcıdan&nbsp;<em><strong>http://localhost/dosyaadi.php</strong></em>&nbsp;adresinden kontrol edebilirsiniz. yada <em><strong>http://localhost</strong></em> yazarak sayfaya ulaşabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":2635,"width":"746px","height":"340px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/site-1.png?w=1024" alt="" class="wp-image-2635" style="width:746px;height:340px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Bunun yerine bir deneme sayfası oluşturacağım ve tarayıcıdan testini gerçekleştireceğim.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo nano /var/www/html/test_sayfasi.php</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":2638,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/test-1.png?w=773" alt="" class="wp-image-2638" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":2639,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/test2.png?w=837" alt="" class="wp-image-2639" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>LAMP (Apache, Mysql, Php)</strong>&nbsp;paketini tek komutla bile kurabileceğinizi biliyor muydunuz? (bunu en sona sakladık...)</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo apt-get install lamp-server^</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>phpMyAdmin Kurulumu:</strong> <strong>phpMyAdmin Nedir?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>phpMyAdmin, bir veri tabanı yönetim yazılımıdır.</strong>&nbsp;PHP programlama diliyle yazılan sistem, web tabanlı bir altyapıya sahiptir.&nbsp;<strong>Başlıca kullanım alanı MySQL veri tabanı yönetimi </strong>olan phpMyAdmin,&nbsp;<strong>80</strong> farklı programlama dilini destekler. Burada yapılacak <strong>SQL</strong> sorguları , tablo işlemleri , <strong>veri tabanı</strong> <strong>kaldırma/ekleme/düzenleme</strong> , kullanıcı yetki ve anahtarları yönetmek gibi temel işlevler için kullanılır.  işlemlerini pratik ve hızlı bir şekilde yapabilme imkânı sunan <strong>PHP</strong>&nbsp;tabanlı yazılmış bir ücretsiz araçtır.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo apt update &amp;&amp; sudo apt install phpmyadmin -y</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Kurulum işlemi başladıktan sonra aşağıdaki gibi bir ekran ile karşılaşacaksınız. Apache servere uyumlu bir kurulum  yaptığımız için <strong>Apache </strong>seçeneğini seçip gelen sorulara evet diyerek devam edelim.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":2641,"width":"615px","height":"353px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/mayadminphp.png?w=640" alt="" class="wp-image-2641" style="width:615px;height:353px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Şimdi de phpMyAdmin ve MySQL sunucusunun eşleşebilmesi için parola girilecektir. Dikkat edilmesi gereken nokta MySQL server kurulumu yaparken oluşturulan parolayı burada kullanacağız. Eğer Yanlış parola girilirse phpMyAdmin'i  baştan kaldırıp kurmak zorunda kalabilirsiniz. onun bu kısım çok önemlidir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Test amaçlı olarak Sistemde Yüklü Program ve uygulamaların Listesini görelim.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>dpkg --get-selections</strong>
<strong>dpkg-query -l </strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":2640,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/myadmin.png?w=725" alt="" class="wp-image-2640" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Görüldüğü üzere <strong>phpmyadmin </strong>ve <strong>php7.4 </strong>kuruludur.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Son olarak phpMyAdmin’ini localde çalışabilmesi için <strong>/var/www/html/</strong> altına aşağıdaki komut ile linkleme işlemi yapacağız.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo ln -sf /usr/share/phpmyadmin /var/www/html/phpmyadmin</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Servisleri restart ettikten sonra <strong>http://localhost/phpmyadmin</strong> adresine giderseniz aşağıdaki giriş ekranı ile karşılaşacaksınız.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":2690,"width":"644px","height":"auto","aspectRatio":"2.196132596685083","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/admin.png?w=1024" alt="" class="wp-image-2690" style="aspect-ratio:2.196132596685083;width:644px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":2693,"width":"642px","height":"auto","aspectRatio":"1.8132118451025057","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/managed.png?w=1024" alt="" class="wp-image-2693" style="aspect-ratio:1.8132118451025057;width:642px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
