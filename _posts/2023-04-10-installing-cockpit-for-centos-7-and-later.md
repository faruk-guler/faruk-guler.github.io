---
layout: post
title: Installing Cockpit for CentOS 7 and later
date: 2023-04-10 00:23
tags: [Linux OS]
author: theguler
comments: true
categories: [RedHat]
---
<!-- wp:image {"id":6458,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/cockpit-1.png?w=1024" alt="" class="wp-image-6458" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Cockpit,</strong> CentOS işletim sistemleri için kullanılabilen bir web tabanlı arayüz uygulamasıdır. Cockpit, sunucularınızı yönetmenizi, izlemenizi ve ayarlamanızı sağlar. Aşağıdaki adımları izleyerek CentOS üzerine Cockpit kurabilir ve kaldırabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Kurulum:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>CentOS sunucunuza bağlanın.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Cockpit paketlerinin en son sürümünü yüklemek için aşağıdaki komutu çalıştırın:</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo yum install cockpit</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Firewall'ınızın 9090 portunun aktif olduğundan emin olun:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo firewall-cmd --add-port=9090/tcp --permanent</strong>
<strong>sudo firewall-cmd --permanent --add-service=cockpit
sudo firewall-cmd --reload</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Cockpit servisini başlatın ve sistem açılışında otomatik olarak başlamasını sağlayın:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo systemctl start cockpit</strong>
<strong>#sudo systemctl stopcockpit</strong>
<strong>sudo systemctl restart cockpit</strong>
<strong>sudo systemctl enable --now cockpit.socket</strong>
<strong>#sudo systemctl disable --now cockpit.socket</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Tarayıcınızda <a href="https://sunucu_IP_adresi:9090 "><strong>https://sunucu_IP_adresi:9090 </strong></a>adresine gidin ve Cockpit arayüzüne erişim yapabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Cockpit Versionu ve servisinin genel durumunu ayrıca logları kontrol etmek için:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo systemctl status cockpit
sudo journalctl -u cockpit.service</strong>
<strong>rpm -qi cockpit</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Kaldırma:</strong></h2>
<!-- /wp:heading -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>CentOS sunucunuza bağlanın.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Aşağıdaki komutu kullanarak Cockpit paketini kaldırın:</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo yum remove cockpit</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Eğer isterseniz, kaldırma işlemi sırasında sistemdeki konfigürasyon dosyalarını da kaldırmak için aşağıdaki komutu kullanın:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo yum remove cockpit --config-files</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Not: </strong>Cockpit arayüzünün kullandığı dosyaları ve konfigürasyonları manuel olarak da silmeniz gerekebilir. Bu dosyaları silmek için aşağıdaki komutları kullanabilirsiniz:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo rm -rf /etc/cockpit/
sudo rm -rf /var/lib/cockpit/</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Sertfika nasıl yükleyebilirsiniz:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Cockpit üzerinde HTTPS üzerinden bağlantı yapabilmek için bir sertifika kullanmanız gerekmektedir. Kendi sertifikanızı oluşturmak ve Cockpit'e yüklemek için aşağıdaki adımları takip edebilirsiniz:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Öncelikle, OpenSSL paketini yüklemelisiniz. Bu paket, sertifika oluşturma ve yönetimi için gerekli araçları içerir. CentOS için aşağıdaki komutu kullanabilirsiniz:</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo dnf install openssl</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Open SSL kurulumundan sonra Sertifikanızı oluşturmak için aşağıdaki komutu kullanabilirsiniz:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/cockpit/ws-certs.d/server.key -out /etc/cockpit/ws-certs.d/server.crt</strong>
</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Bu komut, 365 gün süreyle geçerli, RSA 2048-bit uzunluğunda bir anahtar oluşturur ve anahtarın saklanacağı dosya adı "server.key", sertifikanın saklanacağı dosya adı ise "server.crt" olarak belirlenir. Komutu çalıştırdıktan sonra, sertifikanın ayrıntılarını girmeniz istenir. Bu ayrıntılar genellikle ülke, bölge, şehir, kuruluş adı, bölüm adı, tam alan adı ve e-posta adresini içerir.</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true,"start":3} -->
<ol start="3"><!-- wp:list-item -->
<li>Son olarak, sertifika dosyalarının erişim haklarını ayarlamak için aşağıdaki komutları kullanabilirsiniz:</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo chmod 400 /etc/cockpit/ws-certs.d/server.key
sudo chmod 444 /etc/cockpit/ws-certs.d/server.crt</strong>
<strong>sudo chown root:cockpit-ws /etc/cockpit/ws-certs.d/server.key /etc/cockpit/ws-certs.d/server.crt</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Bu komutlar, "server.key" dosyasının sadece root kullanıcısı tarafından okunabilir olmasını "server.crt" dosyasınında tüm kullanıcılar tarafından okunabilir olmasını sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sertifikanızın doğru şekilde oluşturulup oluşturulmadığını doğrulamak için aşağıdaki komutu kullanabilirsiniz:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo openssl x509 -noout -text -in /etc/cockpit/ws-certs.d/server.crt</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Cockpit servisini yeniden başlatarak, sertifikanın etkinleştirildiğinden emin olabilirsiniz:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo systemctl restart cockpit</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Best Regards. – Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
