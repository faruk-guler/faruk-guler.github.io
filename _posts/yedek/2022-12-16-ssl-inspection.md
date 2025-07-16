---
layout: post
title: SSL Inspection Nedir?
date: 2022-12-16 22:00
author: theguler
comments: true
categories: [UTM (Unified Threat Management)]
---
<!-- wp:image {"id":5784,"width":481,"height":331,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ssl-inspection.jpg?w=1024" alt="" class="wp-image-5784" width="481" height="331" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>SSL Inspection </strong>(Secure Sockets Layer Inspection) olarak da bilinen SSL Decryption veya TLS Interception, ağ güvenliği için kullanılan bir tekniktir. Bu teknik, ağ üzerinden iletilen şifreli trafiği şifresini çözerek inceler.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>SSL Inspection, ağ trafiğindeki zararlı içerikleri veya kötü amaçlı yazılımları tespit etmek, önlemek veya engellemek için kullanılır. SSL/TLS şifreleme protokollerini kullanan web siteleri, e-posta hesapları, mesajlaşma uygulamaları ve diğer ağ hizmetleri bu teknolojiden faydalanır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu teknik, ağ güvenliği için gereklidir, ancak bazı kullanıcılar tarafından gizlilik ihlali olarak görülebilir. Bu nedenle, SSL Inspection işlemi gerçekleştirilirken, organizasyonlar gizlilik politikalarını ihlal etmeden ağ trafiği üzerinde kontrol sağlamak için uygun teknikler kullanmalıdır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>SSL Inspection teknolojisi, <strong>Man-in-the-Middle (MITM)</strong> saldırılarına benzer bir şekilde çalışır. MITM saldırıları, bir saldırganın ağ trafiğini izleyerek, değiştirerek veya yeniden yönlendirerek iletişim kurulan iki tarafa kendisini araya sokmasıdır. SSL Inspection, ağ trafiğini izleyen bir araç kullanarak, şifreli trafiği çözerek ve kontrol ederek araya girer.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Check Point Next Generation Firewalls (NGFWs)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Palo Alto Network</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>FortiGate.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>WatchGuard Network Security.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>SonicWall.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Cisco Meraki.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Huawei Firewall.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Sophos.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Cisco ASA 5500-X Series</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>vb..<a href="https://www.cloudflare.com/learning/security/what-is-a-firewall/"></a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>HTTPS Inspection, SSL Inspection, TLS denetimi, TLS Cracking and inspectione ve HTTPS Interception gibi birçok adla anılır.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"align":"right","id":5774,"width":278,"height":280,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image alignright size-large is-resized"><img src="https://farukguler.com/assets/post_images/ssl-ins.png?w=559" alt="" class="wp-image-5774" width="278" height="280" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>SSL Inspection Nasıl Çalışır?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>SSL Inspection, aşağıdaki adımları izleyerek çalışır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>SSL/TLS trafiği: İlk adım, şifreli trafiği oluşturan SSL/TLS protokollerinin tespit edilmesidir. Bu protokoller, HTTPS, SMTPS, IMAPS, FTPS, ve diğer birçok şifreli protokolü içerir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Şifreli trafik yönlendirilmesi: İkinci adım, şifreli trafiğin önce SSL Inspection aracına yönlendirilmesidir. Bu, ağ trafiği yönlendirme cihazları veya proxy sunucuları tarafından gerçekleştirilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Şifre çözme: SSL Inspection aracı, şifreli trafikte kullanılan SSL/TLS protokollerinin şifrelerini çözer ve şifreli verileri açığa çıkarır. Bu adım, araca önceden yüklenen SSL/TLS sertifikaları veya özel anahtarlar kullanılarak gerçekleştirilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Veri kontrolü: Şifre çözme adımından sonra, açığa çıkarılan veriler kontrol edilir. Bu adımda, içerik filtreleme, kötü amaçlı yazılım taraması, güvenlik duvarı kontrolleri vb. yapılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Veri yeniden şifreleme: Verilerin kontrolünden sonra, SSL Inspection aracı, yeniden şifreleme işlemi ile verileri tekrar şifreleyerek hedef sunucuya gönderir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Hedef sunucuya iletme: SSL Inspection aracı, yeniden şifrelenmiş verileri, hedef sunucuya gönderir.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5782,"width":590,"height":381,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/https-interception.jpg?w=1024" alt="" class="wp-image-5782" width="590" height="381" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Normalde bir Web sitesi TLS kullandığında, istemci cihaz-client (kullanıcının bilgisayarı veya akıllı telefonu) doğrudan web sitesinin ana sunucusuna bağlanır ve şifreli bir bağlantı-trafik oluşturur.&nbsp;Şifreli bağlantı kurulduktan sonra, istemci ile sunucu arasındaki trafik tamamen şifrelenir ve ortadaki hiç kimse trafiği görüntüleyemez.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>HTTPS Inspection</strong> sırasında ise ürün, biri sunucuya, diğeri istemciye olmak üzere iki adet SSL bağlantısı kurar.&nbsp;İstemci açısından, aracı olmadan doğrudan sunucuya bağlanmaktır.&nbsp;Bunun yerine trafik, web sitesini taklit eden <strong>inceleme ürünü'</strong>ne yönlendirilir.&nbsp;Güvenlik ürünümüz trafiğin içeriğini görüntüleme, değiştirme ve engelleme yeteneği kazanır.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Normal SSL Trafiği Olan Network:</strong>
Clinet ---&gt; SSL Trafiği ---&gt; Hedef Server (binance.com - (18.177.194.58)
 
<strong>Ssl Inspection Etkili Olan Network:</strong>
Client ----&gt; SSL Trafiği ---&gt; <strong>Gateway/Proxy</strong> ---&gt; hedef sunucu (binance.com -(18.177.194.58)

----------&gt;

<strong>Network with Normal SSL Traffic:</strong>
Clinet ---&gt; SSL Traffic ---&gt; Destination Server (binance.com - (18.177.194.58)
 
<strong>Network With Ssl Inspection Effective:</strong>
Client ----&gt; SSL Traffic ---&gt; <strong>Gateway/Proxy</strong> ---&gt; target server (binance.com -(18.177.194.58)</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Normal SSL trafiğinde Gateway <strong>(binance.com - (18.177.194.58)</strong>  adresine giden trafiğin içeriğindeki verileri okuyamaz ancak<strong> SSL Inspection</strong> uygulanmış olan bir trafikte SSL trafiği Gateway'de sonlandığı için Gateway içeriği okuyabilir, değiştirebilir veya engelleyebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Kısaca, SSL Inspection teknolojisi, ağ trafiğini dinlemek ve denetlemek için araya girer. Şifreli trafiği çözerek içerik filtreleme, kötü amaçlı yazılım taraması, güvenlik duvarı kontrolleri gibi işlemleri gerçekleştirmek için şifreli trafiği önce kendisine yönlendirir. Bu nedenle, SSL Inspection işlemi bazı kullanıcılar tarafından gizlilik ihlali olarak görülebilir. Ancak, bu teknoloji genellikle kurumsal ağ güvenliği için kullanılır ve gizlilik politikalarına uygun olarak kullanılması gerekmektedir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla – Best Regards…</strong></p>
<!-- /wp:paragraph -->
