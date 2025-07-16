---
layout: post
title: Wazuh Nedir? Wazuh Kurulumu 
date: 2023-03-11 17:07
author: theguler
comments: true
categories: [SIEM]
---
<!-- wp:image {"id":6000,"width":571,"height":298,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/wazuh.png?w=729" alt="" class="wp-image-6000" width="571" height="298" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Wazuh; </strong>Wazuh bir güvenlik olayı yönetimi (SIEM) platformudur ve açık kaynaklı olarak sunulmaktadır. Wazuh, şirketlerin, kurumların ve diğer organizasyonların ağ güvenliği ve sistemlerinin izlenmesi, tehditlere karşı korunması ve olaylarını analiz etmesi için kullanılan bir yazılımdır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Wazuh, farklı kaynaklardan gelen verileri toplar, bu verileri analiz eder ve olayların tespit edilmesi ve tepki verilmesi gereken durumları belirlemek için kullanılır. Wazuh, ağ ve sistemlerdeki aktiviteleri sürekli olarak izler ve anormal veya şüpheli aktiviteleri tespit ettiğinde uyarılar gönderir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Wazuh, önceden tanımlanmış bir dizi kurala ve özel durumlar için özelleştirilebilir politikalara dayanan bir olay yönetimi sistemidir. Wazuh, gelişmiş bir tehdit algılama ve yanıt sistemi içerir ve kullanıcıların isteğe bağlı olarak Wazuh'ı bir IDS<strong> (Intrusion Detection System) </strong>olarak da kullanmasına olanak tanır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Wazuh aynı zamanda birçok farklı veri kaynağından veri toplayabilir. Örneğin, ağ trafiği, güvenlik günlükleri, Windows ve Linux sunucuları ve hatta cloud servisleri gibi farklı kaynaklardan veriler toplayabilir. Toplanan veriler daha sonra Wazuh tarafından analiz edilir ve kullanıcılar tarafından önceden tanımlanmış kurallar ve politikalar ile karşılaştırılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sonuç olarak, Wazuh, birçok farklı kaynaktan gelen verileri toplayan, analiz eden ve olayların tespit edilmesi ve tepki verilmesi gereken durumları belirlemek için kullanılan bir açık kaynaklı SIEM platformudur.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Wazuh indexer: </strong>Wazuh indeksleyici, oldukça ölçeklenebilir, tam metin arama ve analiz motorudur.<br>Bu merkezi bileşen, Wazuh sunucusu tarafından oluşturulan uyarıları endeksler ve depolar.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Wazuh server: </strong>Wazuh sunucusu, ajanlardan alınan verileri analiz eder ve tehdit istihbaratını kullanarak işler.<br>Tek bir sunucu, binlerce aracıdan gelen verileri analiz edebilir ve bir küme olarak kurulduğunda ölçeklenebilir.&nbsp;Aracıları yönetmek ve gerektiğinde uzaktan yapılandırmak için de kullanılır.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Wazuh dashboard: </strong>Wazuh panosu, veri görselleştirme, analiz ve yönetim için web kullanıcı arayüzüdür.<br>Mevzuat uyumluluğu, güvenlik açıkları, dosya bütünlüğü, yapılandırma değerlendirmesi, bulut altyapı olayları ve diğerleri için panolar içerir.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Single universal agent: </strong>Wazuh ajanları dizüstü bilgisayarlar, masaüstü bilgisayarlar, sunucular, bulut örnekleri veya sanal makineler gibi uç noktalara kurulur.&nbsp;Tehdit önleme, algılama ve yanıt verme yetenekleri sağlarlar.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Kurallar ÖRNEKLER:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>İmza Tabanlı Log Analizi</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Otomatik log analizi sistemlerinizdeki olası tehditlerin algılanmasını hızlandırır. Altyapınızda bulunan sistemlerin, cihazların ve uygulamaların loglarında bir saldırının kanıtının bulunabileceği muhtemel durumlar vardır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Wazuh, log verilerini otomatik olarak toplayabilmek ve analiz edebilmek için kullanılabilir. Mesela burada Wazuh agentı yüklenmiş ve çalışan bir sistemin işletim sistemi logları okunmaktadır ve bu loglar analiz edilmek üzere Wazuh sunucusuna yönlendirilir. Agent kullanmanın haricinde, sunucular üzerinden doğrudan Syslog, JSON ve birçok formatta network üzerinden veri alabilmektedir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Wazuh, logların hangi uygulamadan geldiğini tespit edebilmek için decoderlar kullanmaktadır ve akabinde bu uygulamalara göre özel kurallar kullanarak verileri analiz eder.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Şüpheli Giriş Denemesi  tespit edebilmek için kullanılan kural örneği;</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu örnekte, kural belirli bir kullanıcı (johndoe) için oluşturulmuştur. Eğer bu kullanıcı 10 dakika içinde üç kez başarısız bir giriş denemesi yaparsa, bu kural tetiklenecektir. Kural, sadece hafta içi iş günleri ve normal çalışma saatleri dışında çalışır (8:00-18:00 arası). Kural, auth.log dosyasındaki belirli bir log türüne bağlıdır ve e-posta uyarıları için yapılandırılmamıştır.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">&lt;rule id="100001" level="5"&gt;
  &lt;description&gt;Suspicious Login Attempt Detected&lt;/description&gt;
  &lt;group&gt;system,login,authentication_failed&lt;/group&gt;
  &lt;options&gt;no_email_alert&lt;/options&gt;
  &lt;field name="log_name"&gt;auth.log&lt;/field&gt;
  &lt;field name="user"&gt;johndoe&lt;/field&gt;
  &lt;field name="timeframe"&gt;600&lt;/field&gt;
  &lt;field name="threshold"&gt;3&lt;/field&gt;
  &lt;condition&gt;
    &lt;or&gt;
      &lt;hour&gt;0-8,18-23&lt;/hour&gt;
      &lt;dayofweek&gt;1-5&lt;/dayofweek&gt;
    &lt;/or&gt;
  &lt;/condition&gt;
&lt;/rule&gt;
</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Wazuh antivirüs tespiti kuralı;</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu kural, Windows işletim sistemi üzerinde çalışan bir antivirüs programı tarafından tespit edilen bilinen bir kötü amaçlı yazılımı algılar. Kuralların yapısı XML formatındadır ve her kural, benzersiz bir kimlik numarası (id) ve bir açıklama içermelidir. Kuralın düzeyi (level), sıklığı (frequency) ve zaman aralığı (timeframe) gibi özellikleri de ayarlanabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Kural, "antivirus" ve "malware_detection" gruplarına aittir ve "no_full_log" seçeneği kullanılarak tam kayıt tutulması engellenir. Kurallar, farklı alanlardan gelen verileri (field) analiz eder ve belirli koşullar altında tetiklenir (condition).</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu örnekteki koşul, antivirüsün etkinleştirilmiş olması, güncel olmaması ve temizlenmemiş bir kötü amaçlı yazılım etkinliği tespit ettiği durumlarda tetiklenir.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">&lt;rule id="100100" level="6" frequency="8" timeframe="60" xmlns="http://www.wazuh.com/schema/3.12/ruleset" &gt;
  &lt;description&gt;Antivirus detection of known malware.&lt;/description&gt;
  &lt;group&gt;antivirus, malware_detection&lt;/group&gt;
  &lt;options&gt;no_full_log&lt;/options&gt;
  &lt;field name="win.antivirus" normalize="lowercase"&gt;.*&lt;/field&gt;
  &lt;field name="win.antivirus_status"&gt;.*&lt;/field&gt;
  &lt;field name="win.antivirus_event"&gt;.*&lt;/field&gt;
  &lt;condition&gt;
    &lt;and&gt;
      &lt;equals field="win.antivirus" value="enabled" /&gt;
      &lt;notequals field="win.antivirus_status" value="up-to-date" /&gt;
      &lt;notequals field="win.antivirus_event" value="clean" /&gt;
    &lt;/and&gt;
  &lt;/condition&gt;
&lt;/rule&gt;
</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>SSH Kimlik doğrulaması hatası olaylarını tespit edebilmek için kullanılan kural örneği;</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">&lt;rule id="5716" level="5"&gt;
 &lt;if_sid&gt;5700&lt;/if_sid&gt;
 &lt;match&gt;^Failed|^error: PAM: Authentication&lt;/match&gt;
 &lt;description&gt;SSHD authentication failed.&lt;/description&gt;
 &lt;group&gt;authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,&lt;/group&gt;
&lt;/rule&gt;</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Linux/Windows Komut Satırını Takip</strong> <strong>edebilmek için kullanılan kural örneği;</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Loglarda olmayan şeyleri izlemek isteyebileceğiniz zamanlar vardır. Wazuh, belirli komutların<br>çıktısını izleme ve çıktıyı log dosyası içeriğiymiş gibi ele alma becerisine sahiptir.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">&lt;localfile&gt;
 &lt;log_format&gt;command&lt;/log_format&gt;
 &lt;command&gt;df -P&lt;/command&gt;
&lt;/localfile&gt;</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">&lt;rule id="531" level="7" ignore="7200"&gt;
 &lt;if_sid&gt;530&lt;/if_sid&gt;
 &lt;match&gt;ossec: output: 'df -P': /dev/&lt;/match&gt;
 &lt;regex&gt;100%&lt;/regex&gt;
 &lt;description&gt;Partition usage reached 100% (disk space
monitor).&lt;/description&gt;
 &lt;group&gt;low_diskspace,pci_dss_10.6.1,&lt;/group&gt;
&lt;/rule&gt;</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Aşağıdaki özellikler bu modül ile birlikte kullanılabilmektedir:<br>● Windows processlerini izleme<br>● Disk alanı kullanımı<br>● Output Değişikliği<br>● Load average<br>● USB Cihazları Algılama</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Rootkit Tespit</strong> <strong>edebilmek için kullanılan kural örneği;</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Wazuh agentları, hem kernel hem de kullanıcı düzeyinde rootkitleri tespit etmek için yüklü<br>olduğu sistemi periyodik olarak taramaktadır. Bu tür zararlı yazılımlar genellikle sistemin<br>davranışlarını değiştirmek için mevcut işletim sistemi bileşenlerinin yerine geçmektedir.<br>Wazuh, sistem anormalliklerini veya iyi bilinen saldırıları aramak için farklı tespit<br>mekanizmaları kullanır. Bu, Rootcheck modülü tarafından periyodik olarak<br>gerçekleştirilmektedir.<br>Aşağıda gizli bir "process" bulunduğunda oluşturulan bir alarm bulunmaktadır. Etkilenen<br>sistem Linux kernel düzeyinde bir rootkit (Diamorphine) çalıştırılmıştır.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">{
 "agent": {
 "id": "1030",
 "ip": "10.0.0.59",
 "name": "diamorphine-POC"
 },
 "decoder": {
 "name": "rootcheck"
 },
 "full_log": "Process '562' hidden from /proc. Possible kernel level
rootkit.",
 "location": "rootcheck",
 "manager": {
 "name": "vpc-ossec-manager"
 },
 "rule": {
 "description": "Host-based anomaly detection event (rootcheck).",
 "firedtimes": 4,
 "groups": [
 "ossec",
 "rootcheck"
 ],
 "id": "510",
 "level": 7
 },
 "timestamp": "2017-03-05T15:13:04-0800",
 "title": "Process '562' hidden from /proc."
}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Wazuh DDOS saldırı tespiti kural örneği;</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>DDOS saldırıları, genellikle birçok farklı kaynak IP adresinden gerçekleştirilir. Bu nedenle, Wazuh'un DDOS saldırılarını tespit etmek için kullanabileceği bir kural, bir kaynak IP adresinin belirli bir süre içinde çok sayıda bağlantı girişimi yapmasıdır. Bu tür bir saldırı, genellikle "SYN Flood" saldırısı olarak adlandırılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Aşağıda bir örnek Wazuh kuralı verilmiştir, bu kural bir IP adresinden 30 saniye içinde 10'dan fazla SYN bağlantı girişimi yapılırsa bir alarm tetikleyecektir. Ancak, DDOS saldırıları genellikle çok sayıda farklı IP adresinden gerçekleştirildiği için, tek bir kural yeterli olmayabilir. Bu nedenle, farklı IP adreslerinden gelen SYN paketlerini izlemek için farklı kural setleri kullanılması önerilir.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">&lt;rule id="100100" level="10"&gt;
  &lt;if_sid&gt;110002&lt;/if_sid&gt;
  &lt;match&gt;srcip&lt;/match&gt;
  &lt;relation&gt;eq&lt;/relation&gt;
  &lt;value&gt;IP_ADRESI&lt;/value&gt;
  &lt;check_diff&gt;30&lt;/check_diff&gt;
  &lt;check_diff_count&gt;10&lt;/check_diff_count&gt;
  &lt;description&gt;Too many SYN packets from IP_ADRESI in 30 seconds&lt;/description&gt;
  &lt;group&gt;ddos&lt;/group&gt;
&lt;/rule&gt;
</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>***Wazuh Kullanım Amacı</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>tomatik log analizi sistemlerinizdeki olası tehditlerin algılanmasını hızlandırır. Altyapınızda bulunan sistemlerin, cihazların ve uygulamaların loglarında bir saldırının kanıtının bulunabileceği muhtemel durumlar vardır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Wazuh, log verilerini otomatik olarak toplayabilmek ve analiz edebilmek için kullanılabilir. Mesela burada Wazuh agentı yüklenmiş ve çalışan bir sistemin işletim sistemi logları okunmaktadır ve bu loglar analiz edilmek üzere Wazuh sunucusuna yönlendirilir. Agent kullanmanın haricinde, sunucular üzerinden doğrudan Syslog, JSON ve birçok formatta network üzerinden veri alabilmektedir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Wazuh, logların hangi uygulamadan geldiğini tespit edebilmek için decoderlar kullanmaktadır ve akabinde bu uygulamalara göre özel kurallar kullanarak verileri analiz eder.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Kurallar, kuralın aranacağı paterni tanımlayabilmek için kullanılan bir eşleşme alanını içerisinde barındırır. Log içerisinde geçen tanımlamalar bu alanda oluşturulur ve alarmın hangi level'da (seviyede) olacağını belirten<br>bir level (Seviye) alanı bulunmaktadır. Wazuh sunucusu, agentlardan birisi ya da syslog tarafından toplanan bir log içerisinde<br>sıfırdan daha yüksek bir seviyeye sahip bir kuralla her eşleştiğinde alarm üretecektir.&nbsp;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Wazuh Quickstart &amp; Installation guide: </strong>https://wazuh.com/install/</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Virtual Machine (OVA) Download Link: </strong>https://documentation.wazuh.com/current/deployment-options/virtual-machine/virtual-machine.html</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":6007,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/wzh.png?w=1024" alt="" class="wp-image-6007" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":6014,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/dashboard_screenshot.png?w=1024" alt="" class="wp-image-6014" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":6015,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/2_dashboard_screenshot.png?w=1024" alt="" class="wp-image-6015" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla – Best Regards</strong>.</p>
<!-- /wp:paragraph -->
