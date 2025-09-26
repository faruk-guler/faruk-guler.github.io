---
layout: post
title: What's DNS Scavenging?
date: 2023-03-23 21:06
by: faruk-guler
comments: true
categories: [Hybride]
---
<!-- wp:paragraph -->
<p><strong>DNS Scavenging,</strong> bir DNS sunucusunudaki, kayıtlı kaynakların zaman aşımını izleyerek eski kayıtları temizlemesi işlemidir. Bu işlem artık kullanılmayan veya güncel olmayan DNS kayıtlarının DNS Zone database'inden silinmesini sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Ancak, </strong>DNS bölgesi (Zone) kayıtların sonsuza kadar saklanması uygun olmaz. Kaynakların IP adresleri değiştikçe veya kaynaklar ağdan kaldırıldıkça, DNS bölgesi (Zone) kayıtlar zamanla eski hale gelebilir. Bu eski kayıtlar, hatalı sorgu sonuçlarına neden olabilir ve ağ performansını olumsuz etkileyebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>DNS Scavenging,</strong> bu eski kayıtların temizlenmesine yardımcı olur. DNS sunucusu, DNS bölgesi(Zone) kayıtların ömrünü izleyerek, ömrü dolmuş kayıtları siler. Bu işlem, ağ performansını iyileştirir ve hatalı sorgu döndürme sonuçlarını azaltır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Peki Nasıl kullanılır?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":6174,"width":376,"height":441,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dns_cnf1.png?w=501" alt="" class="wp-image-6174" width="376" height="441" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>✔✔✔ “Enable automatic scavenging of stale records”</strong> seçeneğini enable etmelisiniz. Bunu yapmadan zoneler üzerinde yaptığınız bir ayarın hiçbir etkisi olmayacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":6177,"width":616,"height":262,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dns_conf2.png?w=1024" alt="" class="wp-image-6177" width="616" height="262" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>✔✔✔ </strong>Bu işlemi toplu halde yapmak, zone’lar üzerinde aging özelliğini açmak için  <strong>Server &gt; sağ tık &gt; “Set Aging/Scavenging for all zones”</strong> seçeneğini seçebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>✔✔✔ </strong>Bu toplu işlem sadece Active Directory <strong>Integrated zoneleri </strong>etkiler. <strong>Primary zone'ler</strong> için bu işlemi yapmak istiyorsanız ilgili zonenin Properties/Özelliklerinden bu seçeneği aktif etmeniz gerekir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>✔✔✔ </strong>Bu işlemi istediğiniz herhangi bir zamanda <strong>manuel olarak</strong> tetikleyebilirsiniz.       <strong>Server &gt; sağ tık &gt; "Scavenge Stale Resource Records"</strong> girdiğiniz&nbsp;<strong>Aging</strong>(saat-gün) tanımlamalarına göre&nbsp;<strong>Stale</strong>(süresi geçmiş)&nbsp;duruma düşen tüm kayıtlar tanımladığınız zonelerden anında silinecektir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>✔✔✔ </strong>Timestamp değeri ise clientlerın kendisini DNS'e kaydettirdiği en son <strong>gün ve saati</strong> göstermektedir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>✔✔✔</strong>Manuel olarak girilen DNS kayıtları, DNS scavenging işlemine tabi değildirler. Yani bu kayıtlar, Timestamp değeri olmadığı için belirli bir süre sonra otomatik olarak silinmezler ve kullanılmayan kayıt listesine eklenmezler. Manuel olarak girilen kayıtların ne zaman silineceği veya güncellenmesi gerektiği, <strong>sistem yöneticisi </strong>tarafından takip edilmelidir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>✔</strong>Ortamınızda hali hazırda bir <strong>DHCP Server </strong>veya Yapılandırması kullanıyorsanız <strong>Scaveng Periyod </strong>sürelerinin, DHCP<strong> (Lease Duration</strong>)&nbsp;IP kira süresinden daha uzun veya eşit olmasına dikkat edin. Çünkü DHCP kirası dolan ip adresini farklı bir cihaz/client'e verdiğinde eski DNS kaydı <strong>DNS Scavenging </strong>tarafından çoktan silinmiş olmalıdır. Yoksa çakışma yaşanacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":6178,"width":322,"height":338,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dns_conf33.png?w=489" alt="" class="wp-image-6178" width="322" height="338" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>✔✔✔</strong> <strong>“Apply these settings to the existing Active Directory Integrated Zones” </strong>seçeneği işaretlerseniz varolan zone’lar üzerinde de bu işlemi gerçekleşecektir. Eğer bu seçeneği işaretlemezseniz sadece yeni zoneler içinde scavenging işlemi gerçekleştirilir. Mevcut zone'lerin ayarı değişmez.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>DNS scavenging'in etkinleştirilmesiyle birlikte, DNS sunucusu artık kayıtları otomatik olarak temizleyecektir. Bu süre defaultta 7+7= (14) gündür. Bu, ağ performansını iyileştirir ve hatalı sorgu sonuçlarını azaltır. Ancak, DNS scavenging işlemi, doğru şekilde yapılandırılmalıdır. Yanlış yapılandırılmış bir DNS scavenging, ağ sorunlarına neden olabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong><strong>No-refresh interval </strong>ve <strong>Refresh interval</strong> Nedir?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":6190,"width":353,"height":387,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dns_conf_54.png?w=476" alt="" class="wp-image-6190" width="353" height="387" /></figure>
<!-- /wp:image -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>No-refresh interval:</strong> Yukarıda, 10 gün içerisinde istemci kayıt yenileme isteği gönderse bile timestamp değerinin güncellemesine izin verilmeyen süredir. Buda istemcilerin gereksiz yere sık sık kayıt güncellemesini engeller.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Refresh interval:</strong> Aşağıda, 5 gün daha bekledikten sonra, bu clientleri "stale" olarak işaretle, Toplamda <strong>10+5</strong>  yani <strong>(15) </strong>gün daha kendisini DNS' e kayıt ettirmezlerse "<strong>Host kayıtlarını sil" </strong>anlamına gelmektedir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Sağlıcakla – Best Regards</strong></p>
<!-- /wp:paragraph -->
