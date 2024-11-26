---
layout: post
title: CIDR and IP Subnetting
date: 2024-05-18 22:39
author: theguler
comments: true
categories: [Network]
---
<!-- wp:image {"id":14695,"width":"488px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/fiber-optic-ip.jpeg?w=1024" alt="" class="wp-image-14695" style="width:488px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Günümüz ağ yapıları, büyüklüğüne ve karmaşıklığına rağmen verimli bir şekilde yönetilmelidir. Bu Makalede, IP adresleme ve ağ yönetimi için kullanılan iki temel kavram olan <strong>CIDR </strong> ve <strong>IP Subnetting</strong>'in ne olduğunu, nasıl çalıştığını ve ağlar üzerindeki etkilerini inceleyeceğiz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":14721,"width":"438px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/nh.png?w=916" alt="" class="wp-image-14721" style="width:438px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>İlk olarak, IP adresi <strong>Network</strong> ve <strong>Host</strong> olmak üzere iki bölümden oluşmaktadır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong> # IPv4:</strong><br><strong>Tanım: </strong>Noktalarla ayrılmış 4 sayı olarak yazılan 32 bitlik sayısal bir adrestir.<br><strong>Octet: </strong>Noktalarla ayrılmış her sayı grubuna octet (sekizlik) denir. Her octet’in sayı aralığı <strong>0–255</strong> arasındadır.<br><strong>Örnek:</strong> 192.168.1.1</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":14775,"width":"424px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ipv4_address.png?w=817" alt="" class="wp-image-14775" style="width:424px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong># IPv6:</strong><br><strong>Tanım:</strong> İki nokta üst üste ile ayrılmış 8 grup olarak yazılan 128 bitlik sayısal bir adrestir.<br><strong>Grup:</strong> Her grup 16 bitlik hexadecimal (onaltılık) sayılardan oluşur ve bu gruplara hextet denir. Her hextet’in sayı aralığı 0–FFFF (hexadecimal) arasındadır.<br><strong>Örnek:</strong> 2001:0db8:85a3:0000:0000:8a2e:0370:7334</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":14719,"width":"433px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ipv6.png?w=1024" alt="" class="wp-image-14719" style="width:433px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>💊 CIDR(Classless Inter-Domain Routing) Nedir?</strong><br>CIDR, Subnet Mask'ın daha net ve anlaşılır bir biçimde gösterimidir. IP adreslerini ve ağları verimli bir şekilde bölmek için kullanılır.<br>CIDR, IP adresinin sonuna eklenen bir eğik çizgi ve sayı ile gösterilir.<strong> [/*]</strong><br>Bu sayı, ağın kaç bitlik kısmının ağ adresi olduğunu veya bit’lerin soldan sağa kaç tanesinin <strong>1</strong> olduğunu gösterir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Örnek:<br>10.5.83.0/24 Buradaki <strong>"/24"</strong> IP adresinin <strong>ilk 24 </strong>biti <strong>Ağ</strong>, kalan 8 biti ise <strong>Hostlar </strong>için kullanılır.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>| CIDR | Binary                               | Decimal</strong><br><strong>/8 </strong> =&gt; 11111111.00000000.00000000.00000000 --&gt; 255.0.0.0<br><strong>--</strong><br><strong>/24</strong> =&gt; 11111111.11111111.11111111.00000000 --&gt; 255.255.255.0<br><strong>/25 </strong>=&gt; 11111111.11111111.11111111.10000000 --&gt; 255.255.255.128<br><strong>/26</strong> =&gt; 11111111.11111111.11111111.11000000 --&gt; 255.255.255.192<br><strong>--<br>--</strong><br>## Buradaki "1" ler network'ü temsil ederken "0" lar hostları temsil eder.</pre>
<!-- /wp:preformatted -->

<!-- wp:table {"align":"left"} -->
<figure class="wp-block-table alignleft"><table class="has-fixed-layout"><thead><tr><td><strong>Subnet Mask</strong></td><td class="has-text-align-left" data-align="left"><strong>Decimal</strong></td><td><strong>Wildcard</strong></td><td><strong>Decimal</strong></td></tr></thead><tbody><tr><td>0</td><td class="has-text-align-left" data-align="left">00000000</td><td>255</td><td>11111111</td></tr><tr><td>128</td><td class="has-text-align-left" data-align="left">10000000</td><td>127</td><td>01111111</td></tr><tr><td>192</td><td class="has-text-align-left" data-align="left">11000000</td><td>63</td><td>00111111</td></tr><tr><td>224</td><td class="has-text-align-left" data-align="left">11100000</td><td>31</td><td>00011111</td></tr><tr><td>240</td><td class="has-text-align-left" data-align="left">11110000</td><td>15</td><td>00001111</td></tr><tr><td>248</td><td class="has-text-align-left" data-align="left">11111000</td><td>7</td><td>00000111</td></tr><tr><td>252</td><td class="has-text-align-left" data-align="left">11111100</td><td>3</td><td>00000011</td></tr><tr><td>254</td><td class="has-text-align-left" data-align="left">11111110</td><td>1</td><td>00000001</td></tr><tr><td>255</td><td class="has-text-align-left" data-align="left">11111111</td><td>0</td><td>00000000</td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>😷 Subnet Mask/Netmask Nedir?</strong><br>Subnet Mask bir IP adresi için bir tür filtre işlevi görür. Cihazlar bir alt ağ maskesiyle, bir IP adresine bakabilir ve hangi kısımların ağ bitleri ve hangilerinin ana bilgisayar bitleri olduğunu anlayabilir. Daha sonra bunları kullanarak, diğer cihazlarla iletişim kurmanın yolunu bulmaya çalışır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>&gt;Subnet Mask neden gerekli?</strong><br>Neden Subnet'lere ihtiyaç duyarız tek bir ağ yeterli olmaz mı? Çok sayıda cihazın bulunduğu devasa ağ hayal edelim, bir bilgisayar diğer cihazlarla iletişim kurması gerektiğinde, ona ulaşmak için bir yayın (broadcast) kullanır. Ağdaki tüm cihazlara yapılan bu çağrı trafik oluşturarak ağı yavaşlatır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>En büyük nedeni Broadcast trafiğini önlemektir,</strong> Bu yüzden ağın küçük alt ağlara bölünmesi gerekir. Router kullanılarak ağlar parçalanır ve fiziksel olarak ayrılır. Broadcast Router' dan geçemediği için yalnızca bir ağ içerisinde hapsolur ve diğer ağlara erişemez. Bu sayede trafik sorunu ortadan kalkar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>📝 IP Adres Sınıfları:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Class| IP Range| Netmask | CIDR</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p id="0485"><strong>A Sınıfı:</strong>&nbsp;1–126 Ağ Maskesi: 255.0.0.0<strong>/8</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p id="ad94"><strong>B Sınıfı:</strong>&nbsp;128–191 Ağ Maskesi: 255.255.0.0<strong>/16</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p id="07fe"><strong>C Sınıfı:</strong>&nbsp;192–223 Ağ Maskesi: 255.255.255.0<strong>/24</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p id="0c82"><strong>D Sınıfı:</strong>&nbsp;224–239 Multicast içindir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p id="ae43"><strong>E Sınıfı:</strong>&nbsp;240–254 Deneyler ve araştırmalar için ayrılmıştır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p id="f815"><strong>127: </strong>Loopback olarak ayrılmıştır.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Public ve Private IP Adresleri Hakkında:</strong><br><br>https://farukguler.com/2023/03/25/private-ip-address<br>https://farukguler.com/2022/02/26/public-ip-address</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>IPv4 Subnet Mask Cheat Sheet</strong></p>
<!-- /wp:paragraph -->

<!-- wp:table {"align":"left"} -->
<figure class="wp-block-table alignleft"><table class="has-fixed-layout"><thead><tr><td><strong>CIDR</strong></td><td><strong>Subnet Mask</strong></td><td><strong>Wildcard Mask</strong></td><td><strong>IP</strong></td><td><strong>Available IP</strong></td></tr></thead><tbody><tr><td><strong>/32</strong></td><td>255.255.255.255</td><td>0.0.0.0</td><td>1</td><td>1</td></tr><tr><td><strong>/31</strong></td><td>255.255.255.254</td><td>0.0.0.1</td><td>2</td><td>2*</td></tr><tr><td><strong>/30</strong></td><td>255.255.255.252</td><td>0.0.0.3</td><td>4</td><td>2</td></tr><tr><td><strong>/29</strong></td><td>255.255.255.248</td><td>0.0.0.7</td><td>8</td><td>6</td></tr><tr><td><strong>/28</strong></td><td>255.255.255.240</td><td>0.0.0.15</td><td>16</td><td>14</td></tr><tr><td><strong>/27</strong></td><td>255.255.255.224</td><td>0.0.0.31</td><td>32</td><td>30</td></tr><tr><td><strong>/26</strong></td><td>255.255.255.192</td><td>0.0.0.63</td><td>64</td><td>62</td></tr><tr><td><strong>/25</strong></td><td>255.255.255.128</td><td>0.0.0.127</td><td>128</td><td>126</td></tr><tr><td><strong>/24</strong></td><td>255.255.255.0</td><td>0.0.0.255</td><td>256</td><td>254</td></tr><tr><td><strong>/23</strong></td><td>255.255.254.0</td><td>0.0.1.255</td><td>512</td><td>510</td></tr><tr><td><strong>/22</strong></td><td>255.255.252.0</td><td>0.0.3.255</td><td>1,024</td><td>1,022</td></tr><tr><td><strong>/21</strong></td><td>255.255.248.0</td><td>0.0.7.255</td><td>2,048</td><td>2,046</td></tr><tr><td><strong>/20</strong></td><td>255.255.240.0</td><td>0.0.15.255</td><td>4,096</td><td>4,094</td></tr><tr><td><strong>/19</strong></td><td>255.255.224.0</td><td>0.0.31.255</td><td>8,192</td><td>8,190</td></tr><tr><td><strong>/18</strong></td><td>255.255.192.0</td><td>0.0.63.255</td><td>16,384</td><td>16,382</td></tr><tr><td><strong>/17</strong></td><td>255.255.128.0</td><td>0.0.127.255</td><td>32,768</td><td>32,766</td></tr><tr><td><strong>/16</strong></td><td>255.255.0.0</td><td>0.0.255.255</td><td>65,536</td><td>65,534</td></tr><tr><td><strong>/15</strong></td><td>255.254.0.0</td><td>0.1.255.255</td><td>131,072</td><td>131,070</td></tr><tr><td><strong>/14</strong></td><td>255.252.0.0</td><td>0.3.255.255</td><td>262,144</td><td>262,142</td></tr><tr><td><strong>/13</strong></td><td>255.248.0.0</td><td>0.7.255.255</td><td>524,288</td><td>524,286</td></tr><tr><td><strong>/12</strong></td><td>255.240.0.0</td><td>0.15.255.255</td><td>1,048,576</td><td>1,048,574</td></tr><tr><td><strong>/11</strong></td><td>255.224.0.0</td><td>0.31.255.255</td><td>2,097,152</td><td>2,097,150</td></tr><tr><td><strong>/10</strong></td><td>255.192.0.0</td><td>0.63.255.255</td><td>4,194,304</td><td>4,194,302</td></tr><tr><td><strong>/9</strong></td><td>255.128.0.0</td><td>0.127.255.255</td><td>8,388,608</td><td>8,388,606</td></tr><tr><td><strong>/8</strong></td><td>255.0.0.0</td><td>0.255.255.255</td><td>16,777,216</td><td>16,777,214</td></tr><tr><td><strong>/7</strong></td><td>254.0.0.0</td><td>1.255.255.255</td><td>33,554,432</td><td>33,554,430</td></tr><tr><td><strong>/6</strong></td><td>252.0.0.0</td><td>3.255.255.255</td><td>67,108,864</td><td>67,108,862</td></tr><tr><td><strong>/5</strong></td><td>248.0.0.0</td><td>7.255.255.255</td><td>134,217,728</td><td>134,217,726</td></tr><tr><td><strong>/4</strong></td><td>240.0.0.0</td><td>15.255.255.255</td><td>268,435,456</td><td>268,435,454</td></tr><tr><td><strong>/3</strong></td><td>224.0.0.0</td><td>31.255.255.255</td><td>536,870,912</td><td>536,870,910</td></tr><tr><td><strong>/2</strong></td><td>192.0.0.0</td><td>63.255.255.255</td><td>1,073,741,824</td><td>1,073,741,822</td></tr><tr><td><strong>/1</strong></td><td>128.0.0.0</td><td>127.255.255.255</td><td>2,147,483,648</td><td>2,147,483,646</td></tr><tr><td><strong>/0</strong></td><td>0.0.0.0</td><td>255.255.255.255</td><td>4,294,967,296</td><td>4,294,967,294</td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading"><strong>🛡️ 2ⁿ - 2 Formülü Nedir?</strong></h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Bu formül, bir subnet içerisindeki <strong>kullanılabilir IP adreslerini</strong> hesaplar. Formülü anlamak için önce <strong>"n"</strong> terimini açıklayalım:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>n</strong>: Subnet maskesine göre, host'lara ayrılan bitlerin sayısını ifade eder. Örneğin, bir <strong>/24 </strong>subnet maskesi, IP adresinin ilk <strong>24 </strong>bit'ini <strong>ağ kısmı</strong> (network) olarak ayırır, geri kalan <strong>8 </strong>bit'ini ise <strong>host </strong>kısmı olarak kullanır, ve burada toplam <strong>2⁸ = 256 </strong>IP adresi bulunur.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">╰┈➤🔴 Network ve Broadcast Adresi Hakkında:</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Network Adresi: </strong>Genellikle subnet’in ilk adresidir ve tüm host bitleri 0’dır (örneğin, 192.168.1.0)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Broadcast Adresi: </strong>Subnet’in son adresidir ve tüm host bitleri 1’dir (örneğin, 192.168.1.255)</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>+Her subnet'te bir <strong>Network adresi</strong> ve bir <strong>Broadcast adresi</strong> bulunur</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>+Network adresi, subnet içindeki cihazların iletişimi için kullanılır ve hiçbir host 'a atanamaz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>+Broadcast adresi ise, subnet içerisindeki tüm cihazlara mesaj göndermek için kullanılır ve yine hiçbir host 'a atanamaz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>📋Network ve Broadcast'in Çıkarılması:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Subnet'teki toplam IP adresi sayısı <strong>2ⁿ</strong> ile bulunur. Ancak, her subnet 'te bulunan <strong>Network adresi</strong> ve <strong>Broadcast adresi</strong> hiçbir host 'a atanamaz ve çıkarılması gerekir. Bu yüzden available host IP sayısı: <strong>2ⁿ - 2</strong>'dir.<strong> [2⁸ = 256-2] = 254</strong> ' tür.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>📌<strong>📌</strong>📌</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>2ⁿ : </strong>Bu ifade, IP adreslerinin subnetting (alt ağlama) işlemlerinde kullanılan bir terimdir. Genellikle, bir subnet maskesi belirtildiğinde, host kısmındaki IP adreslerinin sayısını belirlemek için kullanılır. Örneğin, bir /24 subnet maskesi (255.255.255.0) kullanıldığında, bu subnette 2⁸ = 256 adet IP adresi kullanılabilir (Network adresi ve Broadcast adresi hariç).</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>CIDR Gösterimi: </strong>CIDR, IP adreslerinin ve subnet maskelerinin daha esnek bir şekilde yönetilmesini sağlayan bir sistemdir. IP adreslerinin CIDR gösterimi, IP adresinin sonuna eklenen bir eğik çizgi <strong>(/)</strong> ve bir sayıdan oluşur. Bu sayı, subnet maskesinin ağ kısmındaki 1'leri (bitleri) sayarak ağın kaç bitlik kısmının ağ adresi olduğunu belirtir. Örneğin, /24 CIDR gösterimi, 24 bitlik ağ maskesi anlamına gelir (255.255.255.0).</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu iki kavram birbirine karıştırılmamalıdır. 2⁸ (256) host kısmındaki IP adreslerinin sayısını belirtirken, CIDR gösterimi ağ maskesinin ağ kısmının uzunluğunu belirtir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>IPv4 and <strong>IP</strong>v6 Subnet Mask Cheat Sheet:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://github.com/theguler0x/Networking/">https://github.com/theguler0x/Networking</a></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Calculators:</strong><br><a href="https://jodies.de/ipcalc">https://jodies.de/ipcalc</a><br><a href="https://www.solarwinds.com/free-tools/advanced-subnet-calculator">https://www.solarwinds.com/free-tools/advanced-subnet-calculator</a><a href="https://mxtoolbox.com/subnetcalculator.aspx"><br>https://mxtoolbox.com/subnetcalculator.aspx</a><br><a href="https://www.calculator.net/ip-subnet-calculator.html">https://www.calculator.net/ip-subnet-calculator.html</a><br><a href="https://www.tunnelsup.com/subnet-calculator/">https://www.tunnelsup.com/subnet-calculator</a><br><a href="https://www.internex.at/de/toolbox/ipv6">https://www.internex.at/de/toolbox/ipv6</a></pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>📖 Terminology:</strong></h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>IP Adresi:</strong> İnternet Protokolü adresidir ve ağdaki her cihazın benzersiz tanımlayıcısıdır. IPv4 (32 bitlik) ve IPv6 (128 bitlik) olmak üzere iki ana sürümü vardır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Pv6:</strong> IPv4'ün yerine geçmek üzere geliştirilmiş yeni nesil IP adresleme sistemidir. Adres tükenmesi sorununu çözmek için daha geniş bir adres alanı sunar ve IPv4'ten farklı olarak hexadecimal tabanında adresleri kullanır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Subnet Maskesi:</strong> IP adresinin ağ kısmını ve host kısmını belirlemek için kullanılan bir numaralı yöntemdir. Örneğin, /24 subnet maskesi (255.255.255.0) IP adresinin ilk 24 bitinin ağ kısmını ve son 8 bitinin host kısmını belirtir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>CIDR (Classless Inter-Domain Routing):</strong> IP adreslerinin ve subnet maskelerinin esnek bir şekilde yönetilmesini sağlayan bir sistemdir. CIDR gösterimi, IP adresinin sonuna eklenen bir eğik çizgi (/) ve bir sayı ile belirtilir (örneğin, /24).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Broadcast Adresi:</strong> Bir ağdaki tüm cihazlara gönderilen mesajların ulaştırıldığı adresdir. Örneğin, /24 subnet maskesi ile 192.168.1.0 IP ağı için broadcast adresi 192.168.1.255'tir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Network Adresi:</strong> Bir IP ağı için belirtilen ilk IP adresidir ve genellikle tüm host bitleri 0 olarak ayarlanmıştır. Örneğin, /24 subnet maskesi ile 192.168.1.0 IP ağı için network adresi 192.168.1.0'dır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Routing (Yönlendirme):</strong> IP paketlerinin ağlar arasında yönlendirilmesi ve iletilmesi işlemidir. Router'lar bu işlevi yerine getirir ve ağ iletişiminin temelini oluşturur.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>DHCP (Dynamic Host Configuration Protocol):</strong> Ağdaki cihazlara dinamik olarak IP adresi ve diğer ağ yapılandırma bilgilerini dağıtan bir protokoldür. Yeni cihazların ağa bağlanması ve IP adresi alması için kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>NAT (Network Address Translation):</strong> Ağdaki özel IP adreslerini genel (public) IP adreslerine dönüştüren bir yöntemdir. Birden fazla cihazın aynı genel IP adresini kullanabilmesini sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>ARP Address Resolution Protocol</strong>: RFC 826 ile tanımlanan, IP adresinden MAC adresini bulan protokoldür.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Bant genişliği:</strong>&nbsp;Ağ sinyalleri arasında kullanılan en yüksek ve en düşük frekanslar arasındaki aralık. Yaygın olarak, bir ağ protokolü veya ortamının, ölçülen throughput (yapılan iş) kapasitesine işaret eder.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Binary:</strong>&nbsp;Birleri ve sıfırları kullanan, iki-karakter bir numaralama yöntemi. İkili numaralama sistemi, bilgilerin tamamen dijital gösterimi temeline dayanır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Bit:</strong>&nbsp;Bir 1 veya 0 olan ikili sayı. Sekiz bit, bir byte yapar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Bridge</strong>: Bir ağdaki iki segmenti bağlamak ve aralarında paketleri aktarmak için bir cihaz. Her iki segment, iletişim kurabilmek için aynı protokolleri kullanmak zorundadır. Bridge’ler, OSI referans modelinin 2.katmanı, Veri Hattı katmanında çalışırlar. Bridge’in amacı, gelen bir frame’i, MAC adresine bağlı olarak filtrelemek, göndermek ve yaymaktır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Broadcast Domain:</strong>&nbsp;Gruptaki herhangi bir cihazdan başlatılan broadcast frame’lerini alan cihazların bir grubudur. Router’lar broadcast frame’lerini iletmediklerinden, broadcast domain’leri bir broadcast’ten diğerine iletilmezler.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>CIDR Classless Inter-Domain Routing:</strong>&nbsp;Bir IP ağ grubunun, diğer ağlara, birleşik, daha geniş olarak görünmesine izin verir. CIDR’da, IP adresleri ve subnet mask’lar, noktalarla ayrılmış 4 oktet ve sonuna maskelenen bitleri temsil eden rakamın eklendiği bir adres olarak yazılmaktadır. (Bir subneti temsil eden kısaltma şekli).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Collision Domain</strong>: Çarpışan frame’lerin tespit edildiği ethernet’teki ağ alanı. Collision’lar, hub ve repeater’lar ile yayınlanır, fakat LAN switch ve router’larla yayınlanmazlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Collision:</strong>&nbsp;Ethernet’te aynı anda aktarım gönderen iki düğümün etkisi. Fiziksel ortamda karşılaştıklarında, her bir düğümden frame’ler çarpışacak ve hasar görecektir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Connectionless (bağlantısız):</strong>&nbsp;Bir sanal devre yaratmaksızın olan veri transferidir. Düşük ek yüke sahiptir, en güçlü taşımayı kullanır ve güvenli değildir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Connection-Oriented (bağlantı-tabanlı):</strong>&nbsp;Herhangi bir veri transfer edilmeden önce sanal bir devre oluşturan, veri transfer yöntemi. Güvenli veri transferi için onay ve akış kontrolü kullanır. Connectionless ile zıttır.&nbsp;</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Crossover Kablo:</strong>&nbsp;Bir switch’i switch’e, kullanıcıyı-kullanıcıya, hub’ı hub’a veya switch’i hub’a bağlayan Ethernet kablo çeşididir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Data Link Katmanı:</strong>&nbsp;OSI referans modelinin 2. katmanı, fiziksel bir hat üzerinde güvenli veri aktarımından emin olur ve öncelikle, fiziksel adresleme, hat disiplini, ağ topolojisi, hata uyarısı, istenilen frame’lerin taşınması ve akış kontrolü sağlar. IEEE, bu katmanı, MAC alt katmanı ve LLC alt katmanı olarak daha çok sayıda bölümlemiştir. Aynı zamanda Link Katmanı olarak da bilinir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Deencapsulation:</strong>&nbsp;Bir katmanın, alt katmandan gelen Protocol Data Unit’deki (PDU) başlık bilgisini sildiği, katmanlaşmış protokoller tarafından kullanılan teknik.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Default Route:</strong>&nbsp;Routing tablosunda bir sonraki hop’un belirtilmediği frame’leri yöneltmek için kullanılan static routing tablo girişi.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>DNS Domain Name System:&nbsp;</strong>Host isimlerini IP adreslerine çözmek için kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Enkapsülasyon:</strong>&nbsp;Bir katmanın, üzerindeki bir katmandan Protocol Data Unit’e (PDU) başlık bilgisini eklediği, katmanlı protokol tarafından kullanılan teknik. Örneğin, internet terminolojisinde, bir paket, Network katmanından (IP) bir başlık, Transport katmanından (TCP) bir başlık, uygulama protokol bilgisi ilave edilen bir Data link katmanı başlığı içerebilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Ethernet:</strong>&nbsp;Xerox Corporation tarafından oluşturulan ve daha sonra Xerox, Digital Equipment Corporation ve Intel’in müşterek katkılarıyla geliştirilen bant tabanlı bir düzenlemedir. Ethernet, IEEE 802.3 serisi standarda benzerdir ve CSMA/CD kullanarak, 10Mbps’de çeşitli kablo türleri üzerinde çalışır. Aynı zamanda, DIX (Digital/Intel/Xerox) Ethernet olarak bilinir. Ayrıca bakınız: 10BaseT, Fast Ethernet ve IEEE.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Fast Ethernet:&nbsp;</strong>100Mbps hızında bir Ethernet düzenlemesidir. Fast Ethernet, MAC mekanizmaları, MTU ve frame formatı gibi özellikler korunarak, 10BaseT den 10 kat daha hızlıdır. Bu benzerlikler onu, Fast Ethernet ağlarında, mevcut 10BaseT uygulamaları ve yönetim araçları ile uyumlu kılar. Fast Ethernet, IEEE 802.3 düzenlemesinin bir uzantısına dayanmaktadır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Frame:</strong>&nbsp;Bir aktarım ortamına Data Link katmanı tarafından gönderilen bilginin mantıksal bir birimi.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>FTP File Transfer Protocol:</strong>&nbsp;Ağ düğümleri arasında dosya aktarılması için kullanılan bir TCP/IP protokolüdür. Geniş bir dosya çeşidi aralığını destekler ve RFC 959’la tanımlıdır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Handshake:&nbsp;</strong>Senkronize operasyonlardan emin olmak için ağdaki bir veya daha fazla cihaz arasında gidip gelen aktarımların bir serisi.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Hop sayısı</strong>: Yoldaki router’ların sayısına bağlı, bir kaynak ve bir hedef arasındaki uzaklığı hesap eden bir routing metriği. RIP, tek metriği olarak hop sayısını kullanır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Hub’lar:&nbsp;</strong>Gerçekte sadece çok portlu repeater olan physical katman cihazlarıdır. Bir porttan elektronik dijital bir sinyal alındığında, sinyal, tekrar kuvvetlendirilir, tekrar üretilir ve sinyalin alındığı segment dışındaki tüm segmentlere gönderilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>IEEE (Institute of Electrical and Electronics Engineers):</strong>&nbsp;Diğer aktiviteleri arasında, ağ kurulumu ve haberleşmeyi de içeren, bilgi işlem ve elektronikteki birçok alanın standartlarını tanımlayan, profesyonel bir organizasyondur. IEEE standartları, endüstride bugün kullanılan hakim LAN standartlarıdır. Birçok protokol, yaygın olarak, uygun IEEE standardının referans numarasıyla bilinmektedir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Internet:</strong>&nbsp;Popülaritesi, 1990’ların ortasında yayılmaya başlayan, evrensel ağların ağıdır. Orijinal olarak, ortak akademik araştırma için bir araç olan internet, tüm bilgi çeşitlerinin değiş tokuş edildiği ve dağıtıldığı bir ortam oldu. İnternetin, tamamen farklı bilgisayar platform ve teknolojilerine bağlanma ihtiyacı, tek tip protokol ve standart gelişimine öncülük yaptı ki aynı zamanda firma LAN’larında yaygın olarak kullanılması başladı.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>IP Adresi:&nbsp;</strong>Sık olarak bir internet adresi olarak belirtilir. Bu, internetteki (veya herhangi bir TCP/IP ağında) herhangi bir cihazı (host) eşsiz olarak tanımlayan bir adrestir. Her bir adres, noktalarla ayrılan desimal numaralar olarak gösterilen dört oktetten oluşmaktadır (“noktalı-desimal” olarak bilinen bir format). Her adres, bir ağ numarası, isteğe bağlı bir alt ağ ve bir host numarasından oluşmuştur. Host adresi, ağ veya alt ağdaki özel bir düğümü adreslerken, ağ ve alt ağ numaraları, beraber, routing için kullanılmaktadır. Ağ ve alt ağ bilgisi, subnet maskesi kullanılarak IP adresinden çıkarılır. A’dan C’ye klasların, adreslerin ağ, alt ağ ve host bölümlerine farklı bitler ayırdığı, beş IP adres klası vardır (A-E). Ayrıca bakınız: CIDR, IP ve subnet maskesi.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>IP Internet Protokolü</strong>: RFC 791 de tanımlı, TCP/IP yığının parçası ve bağlantısız servis öneren bir Ağ katmanı protokolüdür. IP, adresleme, servis tipi teknik özellikleri, parçalama ve tekrar bir araya getirme ile güvenlik için özelliklerin düzenlenmesini sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>IP Multicast:</strong>&nbsp;Bir kaynaktan çeşitli uç noktalara veya çoklu kaynaklardan birçok hedefe IP trafiğinin tekrar çoğaltılmasını mümkün kılan bir routing tekniği. Her özel hedef noktasına bir paket yerine, grup için sadece bir IP uç noktası belirtilen bir multicast grubuna bir paket gönderilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Katman:&nbsp;</strong>Ağdaki aktarım için verinin enkapsüle edilmesinde, OSI modelinin nasıl çalıştığını hiyerarşik olarak belirtmek için kullanılan terim.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>LAN:</strong>&nbsp;Lokal area network: Yaygın olarak, limitli coğrafi bir alandaki (birkaç kilometreye kadar) ilgili cihazlar ve iki ya da daha fazla bilgisayarı bağlayan bir ağ. LAN’lar, tipik olarak, bir firmadaki, yüksek-hızlı, düşük-hatlı ağlardır. OSI’nin Fiziksel ve Veri Hattı katmanlarındaki kablolama ve sinyalleşme, LAN standartları tarafından dikte edilmektedir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>LAN Switch:</strong>&nbsp;Genel olarak, özellikle bir Ethernet switch olarak belirtilen, veri hattı segmentleri arasındaki paketleri aktaran, yüksek-hızlı, çoklu interface’i olan bir köprüleme mekanizmasıdır. LAN switch’ler, MAC adres tabanlı trafiği transfer ederler.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>MAC Adresi:</strong>&nbsp;Bir LAN segmentine bağlanmak için gerekli tüm port ve cihazların bir Data link katmanı donanım adresi. Bu cihazlar mantıksal adreslerin doğru lokasyonu için ağdaki cihazlar tarafından kullanılmaktadır. MAC adresleri, IEEE standartları tarafından tanımlanmaktadır ve tipik olarak lokal LAN arayüzlerinde burned-in address (BIA) kullanılır, 48 bit uzunluğundadır. Farklı şekillerde adlandırılan donanım adresleri, fiziksel adres, burned-in adresi veya MAC katmanı adresidir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>MAC Media Access Control:&nbsp;</strong>Donanım adreslemesi, ortam erişimi ve frameler için hata tespitinden sorumlu, Data link katmanının alt katmanı.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Maksimum Hop Sayısı:</strong>&nbsp;Sonlandırılmadan önce, bir paketin aktarılmasına izin verilen router’ların sayısı. Bu, bir paketin bir ağda sonsuza kadar dönmesini engellemek için oluşturulmuştur.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Multicast:&nbsp;</strong>Yaygın olarak, tek bir verici ile çoklu alıcılar arasındaki bir bağlantıdır. Broadcast adreslerin aksine, ağdaki tüm adreslere gönderilen, multicast mesajlar, ağ adreslerinin tanımlı bir altkümesine gönderilir, bu altküme, paketin hedef adresinde gösterilen bir grup multicast adresine sahiptir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>NAT Network Address Translation:&nbsp;</strong>Evrensel benzersiz IP adres gereksinimlerini minimize etmekte faydalı bir algoritma. Kuruluşlara, public olmayan adreslerini, evrensel yönlenebilir adres aralığına çevirmeleri imkanı verir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Native VLAN:&nbsp;</strong>Cisco switch’lerin hepsi, VLAN1 olarak adlandırılan bir native VLAN’e sahiptir. Bu, herhangi bir yolla silinemez ve değiştirilemez. Tüm switch portları, varsayılan olarak VLAN1’dedir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Oktet:&nbsp;</strong>Noktalı, ondalıklı bir IP adresinin bir bölümünü tanımlamak için kullanılan 8-tabanlı numaralama sistemi. Ayrıca, byte olarak da belirtilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>OSI Open Systems Interconnection:&nbsp;</strong>Farklı üretici ekipmanlarının birlikte çalışabilirliğini gerçekleştiren, veri ağı kurulumu standartlarının gelişimi için ISO ve ITU-T tarafından geliştirilen uluslararası standartlaştırma programı.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>OSI Referans Modeli Open Systems Interconnection Referans Modeli:</strong>&nbsp;Cihazların herhangi bir kombinasyonunun, iletişim amacıyla nasıl bağlanabileceğini açıklayan, International Organization for Standardization (ISO) tarafından tanımlanan kavramsal bir modeldir. OSI modeli, görevleri, en üstte uygulamaların, en altta fiziksel ortamın bulunduğu bir hiyerarşi oluşturan yedi fonksiyonel katmana böler ve her bir katmanın sağladığı fonksiyonları tanımlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>OUI Organizationally Unique İdentifier:&nbsp;</strong>Network Interface kartı yapan bir kuruluşa IEEE tarafından tahsis edilen koddur. Daha sonra kuruluş bu OUI’yı ürettiği tüm kartlara koyar. OUI, 3 byte (24 bit) uzunluğundadır. Sonra üretici, istemciyi eşsiz olarak tanımlamak için 3-byte tanıtıcı ekler. Adresin toplam uzunluğu 48 bittir (6 byte) ve donanım ya da MAC adresi olarak bilinir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Paket Switching:</strong>&nbsp;Paketlerle veri aktarım tabanlı bir ağ kurulumu teknolojisidir. Sürekli bir iletişimi ufak birimlere-paketlere bölmek, bir ağdaki çoklu cihazlardaki veriyi, eşzamanlı aynı iletişim kanallarına paylaştırmayı mümkün kılar, fakat ayrıca tam routing bilgisinin kullanımı gerekmektedir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Paket</strong>: Veri iletişiminde, transfer edilen bilginin temel mantıksal birimidir. Bir paket, paketin nereden geldiği, nereye gittiği ve saire hakkında bilgiler içeren başlık ve/veya kuyrukta paketlenmiş ya da enkapsüle edilmiş, belirli sayıda veri byte’larından oluşmaktadır. Bir iletim göndermekle görevli çeşitli protokoller, daha sonra alıcı cihazlardaki ilgili protokollerin işledikleri, kendi katmanlarının başlık bilgilerini eklerler.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Physical Katman:</strong>&nbsp;OSI referans katmanındaki en alttaki katman (katman 1). Veri frame’lerini, Data Link katmanından (katman 2) elektrik sinyaline çevirmekten sorumludur. Physical katman protokolleri ve standartları, örneğin, pin atamaları ile 0 ve 1 değerinde sinyalleşme için şifreleme planlaması içeren, kablo ve konnektörleri tanımlar</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Router:</strong>&nbsp;Ağ trafiğinin aktarımında kullanmak için en iyi yola karar vermekte bir veya daha fazla metrik kullanan, donanımsal veya yazılımsal bir Network katmanı mekanizması. Router’lar tarafından ağlar arasında paketler göndermek, Network katmanında sağlanan bilgiye bağlıdır. Geçmişte bu cihaz bazen bir gateway olarak belirtilmiştir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Sequencing:&nbsp;</strong>Sanal devrelerde ve segment’leri numaralamak için bölümlenmesinde kullanılır, böylece doğru sırayla tekrar geri konulabilirler.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Subnetwork (Alt ağ):</strong>&nbsp;Geniş bir IP ağının parçası olan bir ağdır ve bir subnet adresi tarafından tanımlanmaktadır. Bir ağ yöneticisi, hiyerarşik, çok seviyeli bir routing yapısı sağlamak ve aynı zamanda bağlı ağların adresleme karmaşıklığından alt ağı korumak için bir ağı segmentlerine ayırır. Ayrıca bir subnet olarak da bilinir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Switch (1):&nbsp;</strong>Ağ kurulumunda, frame filtreleme, yayma ve gönderme gibi çoklu fonksiyonlardan sorumlu bir cihazdır. Özel frame’lerin hedefini kullanarak çalışır. Switch’ler OSI modelinin Data Link katmanında çalışır. (2) Yaygın olarak, ihtiyaç duyulduğunda kurulan ve artık ihtiyaç olmadığında sonlandırılan bağlantılara izin verilen elektronik/mekanik bir cihaz.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Telnet:&nbsp;</strong>TCP/IP protokol ailesinde standart terminal emülasyon protokolü. Uzak terminal bağlantı yöntemi, kullanıcıların uzak ağlarda login olmalarını mümkün kılar ve lokal olarak bağlanır gibi, bu kaynakları kullanırlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>TFTP Trivial File Transfer Protocol:</strong>&nbsp;Kavramsal olarak, FTP’nin kısıtlı versiyonudur. Ne istediğinizi ve nerede bulunacağını tam olarak bilip bilmeme seçeneğinin protokolüdür. TFTP, FTP’nin sahip olduğu fonksiyon zenginliğini içermez. Özellikle, directory arama özelliği yoktur, dosyaları alıp göndermek dışında hiçbir şey yapamaz.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>TTL Time to live:&nbsp;</strong>Bir paketin geçerli olduğu zamanı belirten, IP başlığındaki bir alan.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>UDP User Datagram Protocol:</strong>&nbsp;Basit olarak, onay veya taşıma garantisi olmaksızın datagramların değiş tokuş edilmesine izin veren, TCP/IP protokol yığınındaki, bir connectionless transport katman protokolüdür,. UDP, RFC 768’de tanımlıdır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>UTP Unshielded twisted-pair:</strong>&nbsp;Kullanıcı cihazlarını switch ya da hub’a bağlamak için küçükten-genişe ağlarda kullanılan, bakır kablolaması. Ayrıca switch’i-switch’e veya hub’ı hub’a bağlamakta da kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>VLAN Virtual LAN:&nbsp;</strong>Bir veya daha fazla mantıksal segmentlere ayrılmış LAN’da (yönetim yazılımı kullanılarak yapılandırılan) cihazlar grubu. Cihazların, gerçekten çok farklı LAN segmentlerinde bulunduklarında, aynı fiziksel ortam aracına bağlıymış gibi iletişimde olmalarını mümkün kılar. VLAN’ler, fiziksel bağlantılar yerine mantıksal tabanlıdırlar ve bundan dolayı çok esnektirler.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><a href="https://gelecegiyazanlar.turkcell.com.tr/konu/egitim/temel-network-egitimi/terimler-sozlugu">https://gelecegiyazanlar.turkcell.com.tr/konu/egitim/temel-network-egitimi/terimler-sozlugu</a></p>
<!-- /wp:paragraph -->
