---
layout: post
title: SSH Nedir? - What is SSH?
date: 2022-09-25 18:25
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":4802,"width":461,"height":228,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ssh.png?w=1024" alt="" class="wp-image-4802" width="461" height="228" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>SSH (Secure Shell), </strong>bir ağ protokolüdür ve uzaktan erişim için güvenli bir bağlantı sağlar. SSH, bir sunucuya veya başka bir bilgisayara güvenli bir şekilde bağlanmak için kullanılabilir ve verilerin güvenli bir şekilde aktarılmasını sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>SSH, birkaç farklı bileşenden oluşur:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>SSH Protokolü: SSH protokolü, bir sunucu ile istemci arasındaki veri iletişimini sağlar. Bu protokol, şifreleme, kimlik doğrulama ve veri bütünlüğü gibi güvenlik özelliklerini içerir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>SSH Sunucusu: SSH sunucusu, uzaktan erişim sağlamak isteyen bilgisayarda çalışan bir yazılımdır. Bu sunucu, gelen bağlantıları kabul eder ve kimlik doğrulama gibi işlemleri gerçekleştirir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>SSH İstemcisi: SSH istemcisi, bir bilgisayardan bir SSH sunucusuna erişmek için kullanılan bir yazılımdır. İstemci, SSH sunucusuna bağlanmak için gerekli kimlik bilgilerini sağlar ve sunucudan yanıt alır.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>SSH'nin en önemli özelliklerinden biri, verilerin şifrelenmesidir. SSH, verilerin şifrelenmesi için çeşitli şifreleme algoritmaları kullanır ve bu sayede verilerin güvenli bir şekilde aktarılmasını sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Ayrıca, SSH, kimlik doğrulama işlemi için kullanıcı adı ve şifre gibi basit kimlik bilgileri yerine, güvenli anahtar tabanlı kimlik doğrulama yöntemlerini kullanır. Bu yöntemler, kullanıcıların bir anahtar çifti oluşturmasına ve anahtarın sunucuda depolanmasına izin verir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>SSH ayrıca, farklı ağ bağlantıları üzerinden bağlantı kurma imkanı sağlar. Örneğin, bir kullanıcı internet üzerinden SSH ile bir sunucuya bağlanabilir veya ağ üzerindeki bir diğer bilgisayara SSH ile erişebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>SSH, birçok Linux ve Unix tabanlı işletim sistemi tarafından desteklenir ve ayrıca Windows ve Mac OS gibi diğer işletim sistemleri için de SSH istemcileri mevcuttur.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>SSH nasıl çalışır?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":4808,"width":564,"height":251,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ssh-blog.png?w=1024" alt="" class="wp-image-4808" width="564" height="251" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>SSH (Secure Shell), bir sunucuya veya başka bir bilgisayara güvenli bir şekilde uzaktan erişim sağlar. SSH, bir istemci-sunucu modeli kullanır ve birkaç adımda çalışır:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Bağlantı Kurulumu: SSH istemcisi, bir sunucuya bağlanmak için öncelikle bir bağlantı talebi gönderir. Bu talep, sunucunun IP adresi, kullanıcı adı ve kimlik doğrulama yöntemi gibi bilgileri içerir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Kimlik Doğrulama: Sunucu, kullanıcının kimliğini doğrulamak için kimlik bilgilerini kontrol eder. SSH, basit kullanıcı adı ve şifre kimlik doğrulama yöntemini kullanabileceği gibi, daha güçlü ve güvenli anahtar tabanlı kimlik doğrulama yöntemlerini de kullanabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Şifreleme ve Veri Aktarımı: Eğer kimlik doğrulama işlemi başarılı olursa, SSH istemcisi ve sunucusu, verilerin güvenli bir şekilde aktarımı için şifreleme kullanır. Bu şifreleme, verilerin çalınmasını veya kötü niyetli bir saldırganın verileri okumasını engeller.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Oturum Yönetimi: SSH, bir kullanıcının bir sunucuya erişimini bir oturum olarak adlandırır. Oturum, bir kullanıcının bir sunucuya bağlı olduğu süredir ve oturum yönetimi, SSH sunucusu tarafından yönetilir. SSH sunucusu, oturumların yönetimi için birkaç farklı yöntem kullanabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Bağlantı Sonlandırma: SSH istemcisi, kullanıcının bir sunucu ile olan bağlantısını sonlandırmak istediğinde, bağlantıyı sonlandırmak için sunucuya bir istek gönderir.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>SSH, ayrıca port yönlendirme ve dosya aktarımı gibi diğer özellikleri de içerir. Port yönlendirme, bir sunucudan diğerine veri yönlendirmek için kullanılırken, dosya aktarımı ise dosyaların güvenli bir şekilde aktarılmasını sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>SSH Anahtarları:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Kullanılabilecek kaç farklı SSH anahtarı türü vardır ?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>RSA anahtarları: RSA, popüler bir açık anahtarlı şifreleme algoritmasıdır ve SSH anahtarları oluşturmak için yaygın olarak kullanılır. RSA anahtarları, 768 ila 16.384 bit arasında değişen anahtar uzunluklarına sahip olabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>DSA anahtarları: DSA, SSH için diğer bir açık anahtarlı şifreleme algoritmasıdır. DSA anahtarları, 512 ila 1.024 bit arasında değişen anahtar uzunluklarına sahip olabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>ECDSA anahtarları: ECDSA, Elliptic Curve Digital Signature Algorithm kısaltmasıdır ve RSA ve DSA algoritmalarına kıyasla daha az yer kaplar. ECDSA anahtarları, 256 ila 521 bit arasında değişen anahtar uzunluklarına sahip olabilir.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Her üç anahtar türü de güvenli ve güvenilirdir. Ancak, anahtar uzunluğu daha uzun olduğunda anahtarın güvenliği artar. SSH anahtarları genellikle anahtar uzunluğuna bağlı olarak 2048 bit veya daha uzun olacak şekilde oluşturulur.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":4823,"width":479,"height":319,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ssh-tutorial.png?w=1000" alt="" class="wp-image-4823" width="479" height="319" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>SSH Tüneli Nedir?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>SSH tüneli, bir ağ trafiğini güvenli bir şekilde yönlendirmek için kullanılan bir tekniktir. Bu teknik, SSH protokolü üzerinden şifrelenmiş bir bağlantı oluşturarak, iki farklı nokta arasında bir sanal tünel oluşturulmasını sağlar. Bu sanal tünel, iki nokta arasında bir bağlantı kurarak, tüm veri trafiğini şifreli bir şekilde yönlendirir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>SSH tüneli, özellikle internete açık bir ağda gezinirken, kullanıcıların trafiği şifrelenmiş bir bağlantı üzerinden yönlendirmesine olanak tanır. Bu şekilde, verilerin izinsiz erişime karşı korunması ve veri hırsızlığına karşı önlem alınması sağlanır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Ayrıca, SSH tüneli, bir sunucunun yerel ağdaki kaynaklara güvenli bir şekilde erişmesine olanak tanır. Örneğin, bir sunucu, yerel ağdaki bir veritabanına erişmek istediğinde, SSH tüneli oluşturarak, veri trafiğini şifrelenmiş bir bağlantı üzerinden yönlendirebilir ve verilerin güvenliği sağlanabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>SSH tüneli, farklı amaçlar için kullanılabilir ve özellikle güvenlik gerektiren durumlarda tercih edilir. Ancak, SSH tüneli oluşturmak için bilgi ve tecrübe gerektirdiği için, kullanıcılar dikkatli olmalı ve doğru yapılandırma ayarlarını yapmalıdır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>SSH Depolama Biçimleri nelerdir?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":4825,"width":282,"height":254,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/pem_der.png?w=500" alt="" class="wp-image-4825" width="282" height="254" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>SSH protokolü, verilerin güvenli ve şifreli bir şekilde iletilmesi için kullanılırken, SSH depolama biçimleri de farklı amaçlar için kullanılır. İşte, SSH depolama biçimleri:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>SSH Anahtarları: SSH anahtarları, güvenli bir şekilde kimlik doğrulama yapmak için kullanılır. SSH anahtarları, her kullanıcı için benzersizdir ve genellikle bir çift oluşturulur: özel anahtar ve genel anahtar. Özel anahtar, kullanıcının bilgisayarında saklanırken, genel anahtar sunucuda saklanır ve kullanıcının kimliğini doğrulamak için kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>SSH Dosyaları: SSH dosyaları, SSH istemcisi ve sunucusu arasındaki güvenli bir bağlantı kurmak için gereken ayarları içerir. Bu dosyalar, özel anahtar, kimlik doğrulama yöntemleri ve sunucu adresi gibi bilgileri içerir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>SSH Tüneli: SSH tünelleri, güvenli bir şekilde bir ağ trafiğini yönlendirmek için kullanılır. Örneğin, bir SSH tüneli oluşturarak, bir kullanıcının internete açık bir ağda gezinirken, tüm trafiği güvenli bir şekilde şifrelenmiş bir bağlantı üzerinden iletilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>SCP Dosyaları: Secure Copy Protocol (SCP), SSH protokolünü kullanarak dosya transferi yapmak için kullanılır. Bu dosyalar, güvenli bir şekilde dosya aktarımı yapmak için kullanılır ve özellikle uzaktaki bir sunucuyla dosya paylaşımı yapmak için idealdir.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Bu SSH depolama biçimleri, farklı amaçlar için kullanılabilir ve her birinin kendine özgü avantajları ve dezavantajları vardır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Akılda Tutulması Gerekenler Nelerdir?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>SSH kullanırken akılda tutulması gereken bazı önemli hususlar vardır. İşte, dikkat edilmesi gereken bazı noktalar:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Güvenlik: SSH, güvenli bir protokoldür, ancak kullanıcının güvenlik önlemlerini de almaları gerekir. Şifrelerin güçlü olması, güncellemelerin düzenli yapılması ve güvenlik açıklarının önlenmesi için gerekli önlemler alınmalıdır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Yetkilendirme: SSH erişimi verirken, yalnızca gerekli erişim düzeyinde yetkilendirmeler yapılmalıdır. Ayrıca, root hesabına erişim, sadece gerektiği durumlarda sağlanmalıdır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Anahtar yönetimi: SSH anahtarları, özel anahtarlar olduğu için iyi bir şekilde yönetilmelidir. Anahtarların düzenli olarak değiştirilmesi, kimlik doğrulama için birden fazla anahtar kullanılması ve anahtarların güvenli bir şekilde saklanması önemlidir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Veri bütünlüğü: Veri bütünlüğü, verilerin güvenliği açısından önemlidir. Verilerin şifrelenmesi, doğru bir şekilde yönlendirilmesi ve doğru bir şekilde işlenmesi gerektiğini unutmamak gerekir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>SSH tünelleri: SSH tünelleri kullanılırken, doğru ayarlar yapılmalı ve tünellerin güvenliği sağlanmalıdır. Ayrıca, tünellerin izlenip izlenmediği de takip edilmelidir.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Bu hususlar, SSH kullanımında dikkat edilmesi gereken bazı önemli konulardır. SSH kullanırken, bu noktaların göz önünde bulundurulması, daha güvenli bir ortam oluşturulmasına yardımcı olabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Herşey tamam ama SSH neden kullanayım ki?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>SSH, birçok avantajı olan güvenli bir protokoldür ve çeşitli amaçlar için kullanılabilir. İşte, SSH kullanmanın bazı nedenleri:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Güvenlik: SSH protokolü, verilerin şifrelenmesi ve güvenli bir şekilde iletilmesi için kullanılır. Bu sayede, veri hırsızlığına karşı korunarak, verilerin izinsiz erişime karşı korunması sağlanır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Uzak erişim: SSH, uzaktaki bir sunucuya erişim sağlamak için kullanılabilir. Bu sayede, bir kullanıcı, bir sunucudaki dosyalara veya uygulamalara erişebilir ve yönetebilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Komut satırı arayüzü: SSH, bir komut satırı arayüzü sağlar. Bu sayede, bir kullanıcı, komut satırından işlemleri gerçekleştirebilir ve dosyaları yönetebilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Dosya transferi: SCP (Secure Copy Protocol), SSH protokolü üzerinden güvenli bir şekilde dosya transferi yapmak için kullanılır. Bu sayede, bir kullanıcı, uzaktaki bir sunucudaki dosyaları güvenli bir şekilde indirebilir veya yükleyebilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Güvenli ağ tünelleri: SSH tünelleri, güvenli bir şekilde bir ağ trafiğini yönlendirmek için kullanılabilir. Bu sayede, verilerin güvenliği sağlanarak, veri hırsızlığına karşı önlem alınması sağlanır.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Bu nedenlerden dolayı, SSH, birçok uygulama için ideal bir güvenli protokol olarak kabul edilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Neden SSH'yi seçmelisiniz?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>SSH'yi seçmek için birçok neden vardır. İşte, bazıları:</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Güvenlik: SSH, güvenli bir protokol olduğu için, verilerinizi şifreleyerek güvenli bir şekilde taşır. Bu sayede, veri hırsızlığına karşı korunmanızı sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Uzak erişim: SSH, uzaktaki bir sunucuya erişim sağlamak için kullanılabilir. Bu sayede, bir kullanıcı, bir sunucudaki dosyalara veya uygulamalara erişebilir ve yönetebilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Komut satırı arayüzü: SSH, bir komut satırı arayüzü sağlar. Bu sayede, bir kullanıcı, komut satırından işlemleri gerçekleştirebilir ve dosyaları yönetebilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Dosya transferi: SCP (Secure Copy Protocol), SSH protokolü üzerinden güvenli bir şekilde dosya transferi yapmak için kullanılır. Bu sayede, bir kullanıcı, uzaktaki bir sunucudaki dosyaları güvenli bir şekilde indirebilir veya yükleyebilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Güvenli ağ tünelleri: SSH tünelleri, güvenli bir şekilde bir ağ trafiğini yönlendirmek için kullanılabilir. Bu sayede, verilerin güvenliği sağlanarak, veri hırsızlığına karşı önlem alınması sağlanır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Çok yönlülük: SSH, birçok işletim sistemi ve cihazda kullanılabilir. Bu sayede, farklı platformlarda çalışan cihazlara erişebilir ve yönetebilirsiniz.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Ücretsiz ve açık kaynaklı: SSH, ücretsiz ve açık kaynaklı bir yazılımdır. Bu sayede, kullanıcılar için ekonomik bir çözüm sunar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Bu nedenlerden dolayı, SSH, birçok uygulama için ideal bir güvenli protokol olarak kabul edilir ve birçok kullanıcı tarafından tercih edilir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>SSH yalnızca sunucunuza bağlanmaktan çok daha fazlasıdır!</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>SSH yalnızca sunucunuza bağlanmaktan çok daha fazla kullanım alanı vardır!&nbsp;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>İşte bazı örnekler: bilgisayarlar arasında dosya paylaşımı ve gerçek zamanlı olarak başka bir makinedeki kabuğa erişim,&nbsp;VPN olarak kullanmak veya diğer makineler üzerinden trafiği tünellemek,&nbsp;ve güvenli iletişim için kullanmak.&nbsp;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>SSH;</strong> her sistem yöneticisinin aşina olması gereken inanılmaz derecede çok yönlü ve güçlü bir araçtır!</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Umarım faydalı olmuştur. - I hope it was helpful</strong>.</p>
<!-- /wp:paragraph -->
