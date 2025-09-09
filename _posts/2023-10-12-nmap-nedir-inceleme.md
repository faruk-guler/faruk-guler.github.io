---
layout: post
title: WHAT IS NMAP? EXAMINATION
date: 2023-10-12 12:47
author: theguler
comments: true
categories: [Hacking - Security]
---
<!-- wp:image {"id":7764,"width":"525px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/nmap.webp?w=650" alt="" class="wp-image-7764" style="width:525px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>theguler@Norden:~# nmap -V</strong><br><strong>Nmap version 7.80 ( https://nmap.org )<br>Platform: x86_64-pc-linux-gnu<br>Compiled with:<br>Compiled without:<br>Available nsock engines:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Nmap,</strong> (Network Map) ağ keşfi için kullanılan tarayıcılarının <strong>tanrısıdır.</strong><br>Bir sızma testinin ilk aşamalarında çoğu güvenlik araştırmacısının temel aralarından birisidir.<br>1990'ların sonlarına doğru Fyodor AKA Gordon Lyon tarafından yazılmış ve bakımı yapılmıştır.<br>Nmap, aralarında The Matrix Reloaded, Die Hard 4, Girl With the Dragon Tattoo ve The Bourne Ultimatum'un da bulunduğu on iki filmde adı geçmektedir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Nmap ne yapar:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Ana Makine Keşfi:</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Bağlantı Noktası Bulma/Numaralandırma:</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Servis Keşfi:</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>İşletim Sistemi Sürümü Tespiti:</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Donanım (MAC) Adresi Tespiti:</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Servis Sürümü Tespiti:</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Nmap Komut Dosyaları (NSE) Kullanılarak Güvenlik Açığı/Kötüye Kullanım Tespiti:</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Nmap IDS / Port Tarama Tespiti ve Tarama Süresi Optimizasyonu:</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Nmap'i indirin ve yükleyin:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Nmap genellikle Linux dağıtım paket yöneticiniz aracılığıyla yüklenir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Debian / Ubuntu / Kali</strong><br>APT paket yöneticisini kullanarak: <strong>apt install nmap</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>RHEL / Fedora, CentOS, Rocky Linux</strong><br>DNF paket yöneticisini kullanarak: <strong>dnf install nmap</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Windows</strong><br>Windows için Nmap'i indirin ve yükleyin: <strong>https://nmap.org/download#windows</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>MacOS</strong><br>Brew kullanarak: <strong>brew install nmap</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Nmap Commands:</strong><br><br><strong>#Specific to scan general most common (1,000 ports in total):</strong><br>nmap 10.5.41.36<br><br><strong>#To specifically scan all ports (65535 ports and more):</strong><br>nmap -p- 10.5.41.36<br><br><strong>#Supported (grep) to specifically scan all ports (65535 ports and more):</strong><br>nmap -p- 10.5.41.36 | grep 'open'<br><br><strong>#Scan only certain ports:</strong><br>nmap -p- 80,443 10.4.44.85<br><br><strong>#Subdomain Dns scanning (grep) supported:</strong><br>sudo nmap -sn 10.8.40.0/24 | grep "report for"<br><br><strong>For #Sub Mac Address scanning:</strong><br>sudo nmap -sn 10.5.50.0/24<br>sudo nmap -sP -n 10.5.50.2/24<br><br><strong>#Specific public port scanning and service information:</strong><br>nmap -sV 10.5.41.36<br><br><strong>#Operating system and version check:</strong><br>nmap -A 10.5.41.36<br><br><strong>#Operating system and version information</strong><br>nmap -A 10.5.41.36<br><br><strong>#Detect whether the target is protected by firewall:</strong><br>sudo nmap -sA 10.5.48.36<br><br><strong>#To scan the system protected by firewall:</strong><br>sudo nmap -PN 10.5.42.152<br><br><strong>#Most frequently used (10) ports:</strong><br>nmap -top-ports 10 10.5.25.36<br><br><strong>#All incoming and outgoing packages:</strong><br>nmap -packet-trace 10.5.48.125<br><br><strong>#you can scan ip addresses from file:</strong><br>nmap -iL iplist.txt<br><br><strong>#Accessing operating system information:</strong><br>sudo nmap -O 10.8.45.32<br><br><strong>#To scan all tcp ports:</strong><br>sudo nmap -sT 10.5.89.66<br><br><strong>#To scan all udp ports:</strong><br>sudo nmap -sU 10.5.63.45<br><br><strong>#To print out #Nmap results:</strong><br>nmap 10.9.25.25 &gt; output.txt</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Taramalarda Kullanılan Bazı Parametler:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>-T: Tarama hızını belirlemek için kullanılır. -T5 daha hızlı bir tarama yaparken, -T1 daha yavaş ve dikkatli bir tarama yapar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-n: DNS çözümlemesi yapma anlamına gelir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-v, -vv, -vvv: Ekrana gösterilecek detayları artırır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-F: Daha hızlı tarama yapar. Daha az sonuç bulur.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>--reason: Bulduğu bir sonucun sebebini gösterir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>--open: Sadece açık portları gösterir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-p-: Bir IP üzerinde bulunması muhtemel 65535 portun hepsini tarar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-sV: Açık portta çalışan servisin ne olduğunu bulmaya çalışır. -sC ile birlikte kullanılırsa işe yarar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-sC: -sV ile versiyon tespiti yapılırken Nmap scriptlerini kullanır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-p: Sadece bu parametreden sonra belirtilen portları tarar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>--top-ports: En çok kullanılan portları tarar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>--Pn: Ping atmak istenmediğinde kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>--h: Yardım almak için kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>--V: Nmap versiyon kontrolü için kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>--6: IPv6 aktif edilmek istendiğinde kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>--A: Agresif tarama opsiyonunu aktifleştirir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>--e [interface]: Network kartı tanımlamak amaçlı kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>--ttl: TTL değerinin ayarlanmasını sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>--badsum: Hatalı checksuma sahip paketler gönderir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>--data-length: Paketlerin boyutunun ayarlanmasını sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-a: Tüm taramaları yap (TCP, UDP, SCTP, vs…)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-p-: Tüm portları tara.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-sT: TCP Connect taraması yap.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-sU: UDP taraması yap.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-sV: Servis sürümü tespiti yap.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-A: İşletim sistemi ve sürüm tespiti yap.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-O: İşletim sistemi tespiti yap.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-v: Ayrıntılı çıktı ver.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-vv: Daha fazla ayrıntılı çıktı ver.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-oN: Çıktıyı normal dosyaya kaydet.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-oX: XML çıktı dosyası oluştur.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-oG: Grep-uyumlu çıktı dosyası oluştur.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-iL: Dosyadan hedefleri al.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>--exclude: Belirli IP adreslerini hariç tut.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>--script: NSE betiklerini çalıştır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>--open: Açık portları göster.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>--scanflags: Özel tarama bayrakları belirle.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-T: Tarama hızını belirlemek için kullanılır. -T5 daha hızlı bir tarama yaparken, -T1 daha yavaş ve dikkatli bir tarama yapar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-sn: Port taraması yapma anlamına gelir. Sadece ping atarak online/offline olarak kontrol eder. Aynı zamanda subdomain DNS tarar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-n: DNS çözümlemesi yapma anlamına gelir. Yani, IP adreslerini çözümleme işlemini atlar ve doğrudan IP adreslerini kullanır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-v, -vv, -vvv: Ekrana gösterilecek detayları artırır. -v daha az detay gösterirken, -vvv daha fazla detay sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-F: Daha hızlı tarama yapar, ancak daha az sonuç bulur. Yani, tarama hızını artırır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-sS: SYN taraması yapar. SYN/ACK yanıtı bekler.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>--reason: Bulduğu bir sonucun sebebini gösterir. Yani, neden bir portun açık veya kapalı olduğunu açıklar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>--open: Sadece açık portları gösterir. Diğer tüm sonuçları görmezden gelir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-p-: Bir IP üzerinde bulunması muhtemel 65535 portun hepsini tarar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-sV: Açık portta çalışan servisin ne olduğunu bulmaya çalışır. -sC ile birlikte kullanılırsa işe yarar. Yani, hedefteki servislerin versiyonlarını saptamaya çalışır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-sC: -sV ile servis tespiti yapılırken Nmap scriptlerini (NSE) kullanır. Bu, daha fazla bilgi elde etmek için kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>-p: Sadece bu parametreden sonra belirtilen portları tarar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>--top-ports: En çok kullanılan portları tarar. Bu, yaygın olarak kullanılan servisleri hedeflemek için kullanışlıdır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>--Pn: Ping atmak istenmediğinde kullanılır. Yani, hedeflere ping göndermeyi atlar.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Tarama Sonucu Port Durum Terimleri:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Open = </strong>Portun aktif olduğu ve bağlantıyı kabul ettiğini gösterir.<br><strong>Closed =</strong> Portun erişilebilir olduğu ancak üzerine işlem yapılamadığını gösterir.<br><strong>Filtered = </strong>Bir firewall tarafından engellendiğini gösterir.<br><strong>Unfiltered =</strong> ACK taraması sonucunda portun isteklere yanıt verdiğini fakat durumunun tespit edilmediğini gösterir.<br><strong>Open | Filtered =</strong> Portun açık fakat bir firewall tarafından engellendiğini gösterir.<br><strong>Closed | Filtered = </strong>Portun kapalı veya firewall olup olmadığını gösterir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Nmap ile kullanabileceğiniz bazı temel tarama tipleri:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>TCP Taraması (TCP SYN Taraması):</strong> Bu, Nmap'in varsayılan tarama türüdür. Nmap, TCP bağlantıları kurmadan hedef sistemlerin belirli portlarını denemek için TCP SYN paketleri kullanır. Bu yöntem hedef sistemlerdeki açık portları tespit etmek için yaygın olarak kullanılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>UDP Taraması: </strong>TCP taraması gibi, hedef sistemlerin UDP portlarını taramak için UDP paketlerini kullanır. UDP taraması, bazı servislerin ve uygulamaların gizli UDP portlarını tespit etmek için kullanılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>TCP Bağlantı Taraması (TCP Connect Taraması):</strong> Bu yöntemde Nmap, hedef portlara tam bir TCP bağlantısı kurar. Bu, hedef portların gerçekten açık ve erişilebilir olup olmadığını belirlemek için kullanılır, ancak daha kolay tespit edilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>ACK Taraması: </strong>ACK taraması, hedef sistemlerin güvenlik duvarları ve filtreleri tarafından nasıl işlendiğini belirlemek için kullanılır. Hedef sistem, ACK yanıtlarını nasıl ele aldığına bağlı olarak tespit edilebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>FIN Taraması: </strong>Bu tarama türü, hedef sistemlerin FIN paketlerine nasıl yanıt verdiğini test etmek için kullanılır. FIN taraması, sistemlerin belirli portlara sahip olup olmadığını belirlemek için kullanılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>XMAS Taraması: </strong>XMAS taraması, hedef sistemlerin belirli portlara ilişkin davranışlarını analiz etmek için kullanılır. Bu tarama, belirli bayrakların (FIN, URG ve PSH) açık veya kapalı olup olmadığını kontrol eder.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>SCTP INIT Taraması:</strong> Stream Control Transmission Protocol (SCTP) kullanılan sistemlerde SCTP INIT taraması yapar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>IDLE Taraması: </strong>Bu tarama türü, hedef sistemlerdeki filtreleri analiz etmek için kullanılır ve hedef sistemdeki portlar hakkında bilgi toplamak amacıyla tasarlanmıştır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>ICMP Taraması:</strong> ICMP (Internet Control Message Protocol) taraması, hedef sistemlerin ICMP yanıtlarına nasıl tepki verdiğini incelemek için kullanılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Custom Taramalar: </strong>Nmap, kullanıcının özel tarama tipleri oluşturmasına da izin verir. Kullanıcılar, belirli portları, protokolleri ve diğer tarama seçeneklerini özelleştirebilirler.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Nmap Scripting Engine (NSE) Nedir?</strong></h2>
<!-- /wp:heading -->

<!-- wp:image {"id":8803,"width":"520px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/use-nmap-1-1.jpg?w=1024" alt="" class="wp-image-8803" style="width:520px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><img src="https://s0.wp.com/wp-content/mu-plugins/wpcom-smileys/twemoji/2/svg/26d4.svg" alt="⛔" style="width: 15px"> <strong>https://nmap.org/nsedoc/scripts/</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Nmap Scripting Engine (NSE), popüler bir ağ keşif aracı olan Nmap'in (Network Mapper) bir bileşenidir. Nmap, ağdaki bilgisayarları, hizmetleri ve açık portları taramak, izlemek ve incelemek için kullanılan bir açık kaynaklı araçtır. NSE, Nmap'in yeteneklerini genişletmek ve özelleştirmek için kullanılan güçlü bir özelliktir. Ağ keşif işlemlerini otomatize etmek, belirli hizmetlerin ve güvenlik açıklarının tespiti için özelleştirilmiş taramaları çalıştırmak ve hatta özel ağ zafiyetlerini belirlemek gibi çeşitli görevler için NSE kullanılabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>NSE, önceden yazılmış ve kullanılabilir olan birçok betikle birlikte gelir ve kullanıcılar kendi özel betiklerini yazabilir. Bu betikler, ağdaki cihazlar ve hizmetler hakkında bilgi toplamak, güvenlik açıklarını tespit etmek veya özel tarama işlemleri gerçekleştirmek için kullanılabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>7 Nmap NSE Custom Scripts:</strong> https://hackertarget.com/7-nmap-nse-scripts-recon/</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>NSE'nin avantajları şunlardır:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>Hızlı ve özelleştirilebilir:</strong> NSE, hızlı ve özelleştirilebilir tarama işlemleri yapmanıza olanak tanır, böylece ağınızdaki özel gereksinimleri karşılayabilirsiniz.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Bilgi toplama:</strong> Betikler, ağdaki cihazlar ve hizmetler hakkında daha fazla bilgi toplamak için kullanılabilir. Örneğin, bir cihazın çalıştırdığı hizmetler, hizmet sürümleri, işletim sistemi tespiti ve daha fazlası.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Güvenlik açıklarının tespiti: </strong>NSE, potansiyel güvenlik açıklarını tespit etmek için kullanılabilir. Özel betikler, belirli zafiyetlerin varlığını kontrol etmek veya hedef sistemlerdeki güvenlik açıklarını değerlendirmek için kullanılabilir.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>NSE, ağ yöneticileri, güvenlik uzmanları ve sızma testi uzmanları gibi profesyoneller için güçlü bir araçtır ve ağ güvenliği, performans izleme ve ağ sorunlarını tespit etme gibi çeşitli görevlerde kullanılabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>NSE Script Kategorileri:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>Auth (Kimlik Doğrulama)</strong>:<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Bu kategori, hedef sistemlere kimlik doğrulama yapmak için kullanılan scriptleri içerir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Broadcast (Yayın)</strong>:<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Bu kategori, yerel ağda keşif yapmak için yayın yapılan scriptleri içerir. Genellikle listelenmeyen hostları keşfetmek için kullanılır.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Brute (Kaba Kuvvet)</strong>:<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Kaba kuvvet saldırıları ile hedef sistemlerin kimlik doğrulama bilgilerini tahmin etmek için kullanılan scriptleri içerir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Default (Varsayılan)</strong>:<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Bu kategori, varsayılan NSE scriptlerini içerir ve genellikle <code>-A</code> seçeneğiyle kullanılır. Hız, kullanışlılık, güvenilirlik gibi script özelliklerini içerebilir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Discovery (Keşif)</strong>:<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Bu kategori, ağdaki cihazlar ve hizmetler hakkında bilgi toplamak için kullanılan scriptleri içerir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Dos (Hizmet Reddi)</strong>:<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Bu kategori, hizmet reddi saldırılarını tespit etmek ve test etmek için kullanılan scriptleri içerir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Exploit (Sömürü)</strong>:<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Bu kategori, hedef sistemlerde bulunan güvenlik açıklarını sömürmek için kullanılan scriptleri içerir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>External (Harici)</strong>:<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Bu kategori, üçüncü taraf veritabanlarına veya diğer harici kaynaklara veri göndermek veya almak için kullanılan scriptleri içerir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Fuzzer (Fuzzer)</strong>:<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Bu kategori, rastgele verilerle istekler göndererek hedef sistemi test etmek için kullanılan scriptleri içerir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Intrusive (İzinsiz)</strong>:<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Bu kategori, hedef sistemi izinsiz olarak etkileyen veya saldırı olarak algılanabilen scriptleri içerir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Malware (Kötü Amaçlı Yazılım)</strong>:<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Bu kategori, hedef platformda kötü amaçlı yazılım veya arka kapı varlığını tespit etmek için kullanılan scriptleri içerir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Safe (Güvenli)</strong>:<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Bu kategori, güvenlik açıklarından yararlanmayan ve hizmetleri etkilemeyen scriptleri içerir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Version (Sürüm)</strong>:<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Bu kategori, hedef sistemlerin hizmet sürümlerini tespit etmek için kullanılan scriptleri içerir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Vuln (Zafiyet)</strong>:<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Bu kategori, bilinen güvenlik açıklarını hedef sistemlerde tespit etmek için kullanılan scriptleri içerir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>NSE Commands:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Temel NSE komutu:</strong>
nmap -sC 10.8.45.78.0/24

<strong>#Sadece tek bir script çalıştırılmak istenirse:</strong>
nmap –script=promiscuous.nse 10.8.45.78.0/24

<strong>#Belli bir dizinin altındaki scriptleri çalıştırmak için:</strong>
nmap –script=/my-scripts 10.8.45.78.0/24

<strong>#NSE Tüm scriptlerin çalıştırılması için:</strong>
nmap –script=all 10.8.45.78.0/24</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>***Sisteminizde Nmap Scripting Engine (NSE) Script dosyalarını belirle:</strong>
locate *.nse
locate nse | grep scripts | grep dns
nmap --script-help all

<strong>***isteğe göre filtrele:</strong>
locate nse | grep scripts | grep dns

<strong>***Nmap Scripting Engine (<strong>NSE</strong></strong>)<strong> scriptlerin (konumu):</strong>
/usr/share/nmap/scripts/
/usr/local/share/nmap/scripts/</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>***Örnek Kullanım:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Auth (Kimlik Doğrulama):</strong>
Örnek: SSH kimlik doğrulaması yapmak için <strong>"ssh-brute"</strong>
nmap --script ssh-brute -p 22 10.8.45.78

<strong>Broadcast (Yayın):</strong>
Örnek: Yerel ağdaki cihazları bulmak için <strong>"broadcast-ping"</strong>
nmap --script broadcast-ping 10.8.45.78

<strong>Brute (Kaba Kuvvet):</strong>
Örnek: SSH şifrelerini kaba kuvvet saldırısıyla denemek için <strong>"ssh-brute"</strong>
nmap --script ssh-brute -p 22 10.8.45.78

<strong>Default (Varsayılan):</strong>
Bu kategori varsayılan NSE scriptlerini içerir, bu nedenle özel bir kullanım örneği sunulmaz.

<strong>Discovery (Keşif):</strong>
Örnek: Hedef sistemde çalışan hizmetleri tespit etmek için <strong>"all"</strong>
nmap --script all 10.8.45.78

<strong>Dos (Hizmet Reddi):</strong>
Örnek: Hizmet reddi saldırılarını tespit etmek için <strong>"syn-flood"</strong>
nmap --script syn-flood -p 80 10.8.45.78

<strong>Exploit (Sömürü):</strong>
Örnek: Hedef sistemde bulunan bir açığı sömürmek için <strong>"smb-vuln-ms17-010" </strong>(Etkilenen sistemleri taramak için dikkatli olun):
nmap --script smb-vuln-ms17-010 -p 445 10.8.45.78

<strong>External (Harici):</strong>
Örnek: Hedef sistem için WHOIS bilgilerini almak için <strong>whois-ip</strong>
nmap --script whois-ip 10.8.45.78

<strong>Fuzzer (Fuzzer):</strong>
Örnek: DNS sunucusunu hatalı DNS istekleriyle bombalamak için <strong>"dns-fuzz"</strong>
nmap --script dns-fuzz -p 53 10.8.45.78

<strong>Intrusive (İzinsiz):</strong>
Örnek: HTTP proxy'si olarak kullanmaya çalışmak için <strong>"http-open-proxy
arduino"</strong>
nmap --script http-open-proxy 10.8.45.78

<strong>Malware (Kötü Amaçlı Yazılım):</strong>
Örnek: Hedef sistemde kötü amaçlı yazılım veya arka kapı tespit etmek için <strong>"smtp-strangeport"</strong>
nmap --script smtp-strangeport 10.8.45.78

<strong>Safe (Güvenli):</strong>
Örnek: SSH anahtarını tespit etmek için <strong>"ssh-hostkey"</strong>
nmap --script ssh-hostkey -p 22 10.8.45.78

<strong>Version (Sürüm):</strong>
Örnek: Hedef sistemde çalışan hizmetlerin sürümünü tespit etmek için <strong>"-sV"</strong>
nmap -sV 10.8.45.78

<strong>Vuln (Zafiyet):</strong>
Örnek: Belirli bir zafiyeti tespit etmek için <strong>"smb-vuln-ms17-010"  </strong>     (Etkilenen sistemleri taramak için dikkatli olun):
nmap --script smb-vuln-ms17-010 -p 445 10.8.45.78</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Nmap'ın Resmi yardım belgeleri ve daha fazlası için:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Nmap'ın Resmi yardım belgeleri ve daha fazlası için:</strong>
nmap --help
man nmap
nmap -h
nmap -V</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla – Best Regards</strong></p>
<!-- /wp:paragraph -->
