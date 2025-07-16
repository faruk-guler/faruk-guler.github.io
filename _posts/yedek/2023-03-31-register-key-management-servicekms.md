---
layout: post
title: Register Key Management Service(KMS) Add In DNS Server
date: 2023-03-31 23:50
author: theguler
comments: true
categories: [Public]
---
<!-- wp:image {"id":6355,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/kms_add_dns.png?w=993" alt="" class="wp-image-6355" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>KMS,</strong> İşletmeler için Windows sunucularını ve istemcilerini etkinleştirmenin tercih edilen yoludur. Ancak, KMS sunucusunun kurulması yeterli değildir. KMS sunucusunun, ağdaki sunucuların ve istemcilerin KMS sunucusunu bulabilmesi ve Windows'u otomatik olarak etkinleştirebilmesi için DNS kaydı oluşturulması gereklidir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>DNS kaydı, sunucuların ve istemcilerin KMS sunucusunu bulmasına ve iletişim kurmasına olanak tanır. KMS sunucusu kurulduğunda, DNS kaydının otomatik olarak oluşturulması gerekir.  Ancak burada bilinmeyen bir nedenle silinmiş <strong>DNS Kaydının </strong>manuel olarak tekrar nasıl oluşturulabileceği anlatılmaktadır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Şimdi Powershell kullanarak KMS</strong>(Key Management Service<strong>) DNS kaydı oluşturalım:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Add-DnsServerResourceRecord  -Name "_vlmcs._tcp" -ZoneName "guler.com" -SRV -DomainName "kms-guler.com" -Priority 0 -Weight 0 -Port 1688 -ComputerName guler.com</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":6362,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/dns_kms.png?w=1024" alt="" class="wp-image-6362" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu PowerShell komutu, <strong>"Add-DnsServerResourceRecordSrv"</strong> cmdlet'ini kullanarak DNS sunucusuna bir SRV kaydı ekler. Bu SRV kaydı, <strong>"_vlmcs._tcp"</strong> adı altında oluşturulur. <strong>"_vlmcs._tcp"</strong> adı, KMS sunucusunun adresini ve iletişim portunu içerir ve Windows istemcilerinin KMS sunucusunu otomatik olarak bulmasına ve Windows'un otomatik olarak etkinleştirilmesine olanak tanır. bu portun ağınızda yasaklı olmadığına dikkat edin.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>yukarıdaki komutta, <strong>"kms-guler.com" </strong>alanını KMS sunucusunun adıyla değiştirmeniz gerekir.  Aynı zamanda, <strong>"-Port 1688"</strong> parametresi, KMS sunucusu için iletişim portunu belirtir. <strong>"-Priority 0"</strong> ve <strong>"-Weight 0"</strong> parametreleri, öncelik ve ağırlık ayarlarını belirler. Bu değerlerin genellikle varsayılan olarak kalması önerilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Son olarak, <strong>"-DomainName" </strong>parametresi <strong>guler.com</strong> etki alanını belirtir. Bu komut, <strong>"_vlmcs._tcp.guler.com" </strong>adında bir SRV kaydı oluşturur. Bu kayıt, Windows istemcilerinin KMS sunucusunu otomatik olarak bulmasına ve Windows'un otomatik olarak etkinleştirilmesine olanak tanır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>****SLMGR, </strong>Windows işletim sistemlerinde kullanılan bir komuttur ve Windows'un lisanslama işlemlerini yönetir.  Aşağıda bazı <strong>SLMGR komutları</strong> ve açıklamaları vardır.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>slmgr /ipk &lt;product key&gt;:</strong> Bu komut, Windows işletim sisteminin bir ürün anahtarını değiştirmek için kullanılır. "product key" yerine, lisans anahtarınızı girin.

<strong>slmgr /ato: </strong>Bu komut, Windows işletim sisteminizin lisansını etkinleştirmek için kullanılır.

<strong>slmgr /xpr:</strong> Bu komut, Windows işletim sisteminizin etkinleştirilip etkinleştirilmediğini kontrol etmek için kullanılır. Bu komutu çalıştırarak, Windows'un etkinleştirilmiş olup olmadığını ve lisansın ne zaman sona ereceğini görüntüleyebilirsiniz.

<strong>slmgr /dlv:</strong> Bu komut, Windows işletim sisteminizin lisanslama bilgilerini ayrıntılı olarak görüntülemek için kullanılır.

<strong>slmgr /rearm:</strong> Bu komut, Windows'un lisans süresini uzatmak için kullanılır. Bu komutu kullanarak, Windows'un etkinleştirilmesini birkaç kez daha erteleyebilirsiniz.

<strong>slmgr /cpky:</strong> Bu komut, Windows işletim sisteminin tüm lisans anahtarlarını kaldırmak için kullanılır. Bu komutu kullanarak, Windows'un mevcut lisans anahtarlarını kaldırabilir ve yeni bir lisans anahtarı girebilirsiniz.

<strong>slmgr /upk: </strong>Bu komut, Windows işletim sisteminin mevcut lisans anahtarını kaldırmak için kullanılır. Bu komutu kullanarak, Windows'un mevcut lisans anahtarını kaldırabilirsiniz.

<strong>slmgr /ckms:</strong> Bu komut, Windows işletim sistemindeki bilgisayarın KMS (Key Management Service) sunucusuna kayıt yapmış olduğu anahtar bilgisini kaldırmak için kullanılır.

<strong>slmgr /skms &lt;activation server&gt;:</strong> Bu komut, Windows işletim sisteminin bir aktivasyon sunucusuna bağlanmasını sağlamak için kullanılır. "activation server" yerine, Windows'un bağlanması gereken aktivasyon sunucusunun adını veya IP adresini giriniz.

<strong>-
-
-
-
-
-</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Best Regards. - Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
