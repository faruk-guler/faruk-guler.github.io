---
layout: post
title: What is OpenSSL ? - Olaf ile OpenSSL Üzerine
date: 2023-11-12 21:17
author: theguler
comments: true
categories: [Hacking - Security]
---
<!-- wp:image {"lightbox":{"enabled":false},"id":9391,"width":"215px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://faruk-guler.github.io/assets/post_images/olaf_openssl-1.jpg?w=694" alt="" class="wp-image-9391" style="width:215px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Selam dostlar, bugün Olaf ile eğlenceli bir OpenSSL macerasına çıkıyoruz! 🚀 OpenSSL, güvenli iletişim dünyasında süper kahramanımız olacak. Olaf'ın neşeli rehberliğinde, verilerimizi ve iletişimimizi korumanın, şenlendirmenin yollarını keşfedeceğiz. Hadi birlikte bu heyecan verici yolculuğa başlayalım... 🌟</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">✍ <strong>OpenSSL </strong><strong>Nedir?</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>OpenSSL, </strong>Açık kaynaklı bir kriptografi kütüphanesidir ve kriptografik işlemleri gerçekleştirmek için kullanılan bir yazılımdır. OpenSSL, güvenli iletişim sağlamak, verileri şifrelemek, dijital sertifikaları oluşturmak ve doğrulamak gibi birçok kriptografik işlemi destekler. İşletim sistemleri üzerinde geniş çapta kullanılabilir ve SSL/TLS protokollerinin uygulanmasında sıkça tercih edilir. <strong>SSL (Secure Sockets Layer)</strong> ve <strong>TLS (Transport Layer Security)</strong> gibi popüler güvenlik protokollerini destekler.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>OpenSSL,</strong> halka açık anahtarlı şifreleme (asimetrik şifreleme), simetrik şifreleme, karma (hash) fonksiyonları ve dijital imzalama gibi kriptografik algoritmaları içerir. Bu algoritmalar, güvenli iletişim, veri bütünlüğü ve kimlik doğrulama gibi güvenlik amaçlarına hizmet eder. OpenSSL ayrıca <strong>X.509</strong> sertifikalarını oluşturma, yönetme ve doğrulama işlemlerini de destekler.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>OpenSSL'in kullanımı çok yönlüdür. Bir komut satırı arayüzü (CLI) sağlar ve bir dizi komutla kriptografik işlemler gerçekleştirmenize olanak tanır. OpenSSL ayrıca bir programlama arayüzü (API) sunar ve C dilinde yazılan uygulamalara kriptografik işlevlerin entegrasyonunu kolaylaştırır. Bu sayede geliştiriciler, OpenSSL'i kullanarak güvenli uygulamalar oluşturabilir ve kriptografik işlemleri programlarına entegre edebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">📜 <strong>OpenSSL'in temel yetenekleri nelerdir?</strong></h2>
<!-- /wp:heading -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li><strong>SSL/TLS İletişimi:</strong> OpenSSL, güvenli iletişim sağlamak için SSL/TLS protokollerini destekler. Bu, sunucu ve istemci arasında şifreli bir kanal oluşturarak veri güvenliğini sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Kriptografik Algoritmalar: </strong>OpenSSL, simetrik şifreleme algoritmaları (örneğin AES), halka açık anahtarlı şifreleme algoritmaları (örneğin RSA), karma fonksiyonları (örneğin SHA) ve dijital imza algoritmaları (örneğin ECDSA) dahil olmak üzere bir dizi kriptografik algoritmayı destekler.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Sertifika İşlemleri:</strong> OpenSSL, X.509 sertifikalarının oluşturulması, yönetimi ve doğrulaması için işlevler sağlar. Bu, dijital sertifikaların kullanılmasıyla kimlik doğrulama ve güvenli iletişim süreçlerinin gerçekleştirilmesini sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Özel Anahtar Yönetimi: </strong>OpenSSL, özel anahtarların oluşturulması, depolanması ve kullanılması için işlevler sunar. Özel anahtarlar, şifrelemeyi gerçekleştiren tarafların gizli anahtarlarını temsil eder.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>OpenSSL, geniş bir kullanıcı tabanına sahip ve birçok farklı projede yaygın olarak kullanılmaktadır. Güvenli iletişim, veri bütünlüğü ve kimlik doğrulama gibi güvenlik gereksinimlerini karşılamak için yaygın olarak tercih edilen bir kriptografi kütüphanesidir.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">✅ <strong>SSL/TLS için bazı yaygın kriptografik dosya formatları:</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>🔥✅ #Bazı kriptografik dosya formatları
🔥✅ #Some cryptographic file formats</strong>

<strong>*.CRT (Certificate)</strong>
CRT (Certificate) uzantısı, X.509 standartına uygun olarak oluşturulmuş bir dijital sertifikayı temsil eder. CRT dosyası genellikle sertifika otoritesi (CA) tarafından imzalanmış ve bir sunucunun veya hizmetin kimliğini doğrulamak için kullanılır. CRT dosyası genellikle sertifika zincirini içerebilir ve genellikle halka açık anahtar (public key) bilgisini içerir.

<strong>*.KEY (Private Key)</strong>
KEY uzantısı, genellikle bir RSA veya ECC gibi asimetrik şifreleme algoritması için kullanılan özel anahtarın bir dosyasını temsil eder. Bu özel anahtar, bir sertifikayı oluştururken kullanılır ve sertifikayı imzalayan taraf tarafından gizli olarak tutulmalıdır. Özel anahtarın güvenli bir şekilde saklanması önemlidir, çünkü yetkisiz erişim, güvenliği ciddi şekilde tehlikeye atabilir.

<strong>*.CSR (Certificate Signing Request)</strong>
CSR (Certificate Signing Request), bir dijital sertifika talebini temsil eder. Bir sunucu veya hizmetin sertifikasını elde etmek için kullanılır. CSR dosyası, sertifika otoritesine (CA) sunulur ve CA, CSR'yi inceleyerek ve doğrulayarak sertifika talebini onaylar ve bir sertifika oluşturur. CSR genellikle sertifika bilgilerini (konu), başvuru sahibinin halka açık anahtarını ve diğer kimlik bilgilerini içerir.

<strong>*.PFX/P12 (PKCS #12)</strong>
PFX (Personal Information Exchange) veya P12 (PKCS #12), bir kişisel bilgi değişimi dosyasını temsil eder. Bu dosya, genellikle bir sertifika ve özel anahtarın birleşik bir şekilde depolandığı bir formattır. PFX/P12 dosyası, sertifika ve özel anahtarı bir arada tutmak için kullanılır ve sıklıkla sunucu yapılandırmalarında veya kimlik doğrulama süreçlerinde kullanılır.

<strong>*.P12: </strong>
PFX formatına atıfta bulunan bir başka dosya uzantısıdır. PFX ve P12 dosyaları aynı dosya formatını temsil eder.

<strong>*.PEM (Privacy-Enhanced Mail)</strong>
PEM (Privacy-Enhanced Mail), bir dizi farklı şifreleme için kullanılan dosya formatını temsil eder. PEM dosyası, Base64 kodlanmış ASCII metnini içerir ve genellikle sertifika veya özel anahtarı depolamak için kullanılır. PEM dosyaları genellikle sertifika, özel anahtar veya CA sertifikalarını içerebilir.

<strong>*.DER (Distinguished Encoding Rules)</strong>
DER (Distinguished Encoding Rules), verileri ikili formatta temsil etmek için kullanılan bir formatı ifade eder. DER dosyaları, genellikle sertifikalar, anahtarlar ve diğer kriptografik veriler için kullanılır. DER dosyaları, biner (binary) formatta depolanan verileri içerir ve genellikle PEM formatına dönüştürülebilirler.

<strong>*.CER (Certificate)</strong>
CER (Certificate) uzantısı, X.509 standartına uygun olarak oluşturulmuş bir dijital sertifikayı temsil eder. CRT dosyası ile aynı amaçla kullanılır, ancak bazı platformlarda veya işletim sistemlerinde kullanılan alternatif bir uzantıdır.

<strong>*.PKCS7/P7B (Public Key Cryptography Standards #7)</strong>
PKCS7/P7B dosyası, genellikle bir sertifika zinciri (CA sertifikasıyla birlikte) veya sertifika deposunu temsil eder. Bu format, sertifikaların paylaşılması veya taşınması için kullanılabilir.

<strong>*.CRL (Certificate Revocation List)</strong>
CRL dosyası, sertifikaların geçerlilik durumunu kontrol etmek için kullanılan bir sertifika geri alma listesini temsil eder. CRL, bir sertifikanın geri alındığı durumda veya geçerliliğini yitirdiği durumlarda kullanılır.

<strong>*.JKS (Java KeyStore)</strong>
JKS dosyası, Java platformunda kullanılan bir anahtar deposunu temsil eder. Bu dosya, çeşitli amaçlarla kullanılan özel anahtarları, sertifikaları ve diğer güvenlik materyallerini depolamak için kullanılır.

<strong>*.KEYSTORE</strong>
KEYSTORE dosyası, çeşitli kriptografik anahtar ve sertifikaları depolayan genel bir terimdir. Genellikle bir uygulamanın veya platformun kullanıcı anahtarlarını ve sertifikalarını saklamak için kullanılır.

<strong>*.JCEKS (Java Cryptography Extension KeyStore)</strong>
Java Cryptography Extension (JCE) kullanılarak oluşturulan anahtar deposu formatını temsil eder. Anahtarlar, sertifikalar ve diğer güvenlik materyalleri depolanabilir.

<strong>*.ASC (ASCII)
</strong>ASCII dosyasını temsil eder. Sertifikalar, anahtarlar ve diğer kriptografik verilerin ASCII metin formatında depolanmasını sağlar.

<strong>*.SST (Microsoft Serialized Certificate Store)</strong>
Microsoft Windows'ta kullanılan bir sertifika deposu formatını temsil eder. Sertifikaların depolanması ve yönetimi için kullanılır.

<strong>................ .etc</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Bu dosya uzantıları/formatlar kriptografik sertifikalar, anahtarlar ve taleplerin farklı formatlarda depolanmasını, kullanılmasını, ve yönetimi temsil eder. Kullanılan uzantı/format; kullanılan uygulama veya gereksinimlere bağlı olabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">🧨 <strong>Nasıl Kullanılır? - How to Use?</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>#Ubuntu/Debian: </strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo apt-get update
sudo apt install openssl</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#Centos/RHEL:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo yum update
sudo yum install openssl</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#Windows:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li><strong>OpenSSL İndirme:</strong><!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>OpenSSL'i resmi web sitesinden indirmek için aşağıdaki adrese gidin: </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a rel="noreferrer noopener" href="https://slproweb.com/products/Win32OpenSSL.html" target="_blank">https://slproweb.com/products/Win32OpenSSL.html</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>"<strong>Download Win32/Win64 OpenSSL</strong>"</strong> bölümüne gidin.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Windows sürümünü indirmek için <strong>"Win64"</strong> veya <strong>"Win32"</strong> bağlantılarından size uygun olanı seçin.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Kurulum dosyasını bilgisayarınıza indirin.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li><strong>OpenSSL Kurulumu:</strong><!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>İndirdiğiniz kurulum dosyasını çalıştırın.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>İstediğiniz hedef dizini seçin ve kurulumu başlatın.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Kurulum tamamlandığında, OpenSSL kullanıma hazır olacaktır.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>OpenSSL Kullanımı:</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>OpenSSL komutlarını çalıştırmak için ilgili uygulama dizinine gitmelisiniz. Varsayılan olarak, OpenSSL, <strong>"C:\Program Files\OpenSSL-Win64\bin" </strong>veya <strong>"C:\Program Files\OpenSSL-Win32\bin" </strong>dizininde kurulur.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>🔔 <strong>Windows &amp; Linux:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">PowerShell:<strong>
cd '.\Program Files\OpenSSL-Win64\bin'
.\start.bat</strong>

TERMINAL:
<strong>openssl version</strong>
<strong>openssl s_client -connect farukguler.com:443</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>★ OpenSSL Sürümünü Kontrol Etme</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>openssl version</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>🏁 Rastgele Veri Üretme</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#Kriptografik olarak güvenilir rastgele veriler üretmek için OpenSSL'i kullanabilirsiniz (örn:20 karakter):
<strong>openssl rand 20</strong>
<strong>openssl rand -hex 20</strong>
<strong>openssl rand -base64 20</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>📝</strong>🔑 <strong>(RSA): Anahtar Çifti Oluşturma (Public Key) ve (Private Key)</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>RSA (Rivest–Shamir–Adleman) algoritması, genel anahtarlı şifreleme için yaygın olarak kullanılan bir şifreleme algoritmasıdır. RSA, her bir kullanıcının iki anahtara sahip olduğu bir sistemdir: <strong>Genel anahtar (public key)</strong> ve <strong>Özel anahtar (private key)</strong> Genel anahtar ile şifreleme yapılırken, özel anahtar ile de şifreli veriyi çözme işlemi gerçekleştirilir.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":5} -->
<h5 class="wp-block-heading" id="user-content-gizli-anahtar-private-key"><strong>★ Gizli Anahtar (Private Key)</strong></h5>
<!-- /wp:heading -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Sadece sunucunun bildiği ve kimseyle paylaşılmayacak dosyadır</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>-----BEGIN PRIVATE KEY-----</code>&nbsp;satırıyla başlayan dosyadır</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code><strong>.pem</strong></code>&nbsp;veya&nbsp;<code><strong>.crt</strong></code>&nbsp;uzantili olabilir</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading {"level":5} -->
<h5 class="wp-block-heading" id="user-content-acik-anahtar-public-key"><strong>★ </strong><strong>Acık Anahtar (Public Key)</strong></h5>
<!-- /wp:heading -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Şifreli konuşmak istediğiniz istemcilerle paylaşılır</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>-----BEGIN CERTIFICATE-----</code>&nbsp;diye başlayan dosyadır</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code><strong>.pem</strong></code>&nbsp;veya&nbsp;<strong><code>.crt</code>&nbsp;</strong>uzantılı olabilir</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#RSA şifreleme için bir anahtar çifti oluşturabilirsiniz.
<strong>(Gizli Anahtar (Private Key) &amp; Acik Anahtar (Public Key)</strong>

<strong>#Özel Anahtar Oluşturması:</strong>
#Bu komutla birlikte 2048 bit bir özel anahtar oluşturulur ve <strong>"Private_key.pem"</strong> adlı bir dosyaya kaydedilir. Bu dosya, özel anahtarı içerir.

<strong>openssl genpkey -algorithm RSA -out Private_key.pem -pkeyopt rsa_keygen_bits:2048</strong>

<strong>#Genel Anahtar Oluşturulması:</strong>
#Bu komutla, oluşturulan özel anahtardan genel anahtar türetilir ve <strong>"Public_key.pem"</strong> adlı bir dosyaya kaydedilir. Genel anahtarın bit uzunluğu, onunla birlikte kullanılan özel anahtarın bit uzunluğuna eşit olacaktır.
<strong>
openssl rsa -pubout -in Private_key.pem -out Public_key.pem</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>🔥 RSA ile Dosya Şifreleme ve Çözme</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>RSA (Rivest-Shamir-Adleman) </strong>genellikle küçük veri parçalarının şifrelenmesi ve çözülmesi için kullanılır. Büyük veri dosyalarını doğrudan RSA ile şifrelemek pratik olmayabilir, çünkü RSA'nın genel anahtarıyla şifreleme ve özel anahtarla çözme süreci oldukça yavaş olabilir. Bu tür durumlarda genellikle daha hızlı simetrik şifreleme algoritmaları kullanılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Bu nedenle,</strong> genellikle daha hızlı ve verimli olan simetrik şifreleme algoritmaları kullanılır. Simetrik şifreleme, aynı anahtarın hem şifreleme hem de çözme için kullanıldığı bir şifreleme türüdür. Örneğin, <strong>AES (Advanced Encryption Standard)</strong> gibi simetrik şifreleme algoritmaları genellikle büyük veri dosyalarını hızlı bir şekilde şifrelemek ve çözmek için tercih edilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>🔑 <strong>(AES): "Simetrik" Anahtar Oluşturma</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Anahtar Oluşturma:</strong>
<strong>openssl rand -hex 32 &gt; hexadecimal.txt</strong>
#Bu komut, 32 byte <strong>(256 bit)</strong> uzunluğunda rastgele bir <strong>hexadecimal</strong> değer üretecektir.

<strong>***</strong>Anahtar oluşturduktan sonra, bu anahtarı şifreleme ve deşifreleme işlemlerinde kullanabilirsiniz. Ancak, unutmayın ki anahtar güvenli bir şekilde saklanmalıdır, çünkü başkalarının anahtarınızı elde etmesi şifreleme güvenliğinizi tehlikeye atabilir.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>🔥🔑 <strong>(AES):  (Advanced Encryption Standard) ile "Simetrik"<strong> Şifreleme &amp; Çözme:</strong></strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>AES (Advanced Encryption Standard),</strong> güvenli ve hızlı bir şifreleme algoritmasıdır ve genellikle dosya şifreleme işlemlerinde kullanılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>#AES, şifrelenen verinin orijinal haline anahtarla erişim sağlandığı sürece dönüşümünü gerçekleştirebilen bir algoritmadır. SHA-256 ise geri dönüşümü olmayan bir algoritmadır.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">🔒 <strong>Dosyayı Şifreleme:
</strong>
<strong>-aes-256-cbc:</strong> AES algoritması ve <strong>CBC modu </strong>kullanılır.
<strong>-salt:</strong> Rastgele bir tuz (salt) kullanılır.
<strong>-iter:</strong> Türetilmiş anahtar üretecek ve bu anahtar kullanılarak dosya şifrelenir.
<strong>- 100000:</strong> türetilmiş anahtarın oluşturulma işlemi için kullanılacak iterasyon

Bu komut: <strong>"olaf.ts"</strong> adlı bir video dosyasını AES-256-CBC algoritması kullanarak şifreler ve şifrelenmiş halini <strong>encrypted_file.enc</strong> adlı bir dosyaya kaydeder. Kullanıcıya bir şifre girmesi istenecektir.

<strong>openssl enc -aes-256-cbc -salt -iter 100000 -in olaf.ts -out encrypted_file.enc</strong>

🔓 <strong>Dosyayı Çözme:</strong>
<strong>openssl enc -d -aes-256-cbc -iter 100000 -in encrypted_file.enc -out decrypted_olaf.ts</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>🧅 <strong>SHA-256 İmza Oluşturma ve Doğrulama</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#İlk adım olarak, dijital olarak imzalanacak verinizi bulun: Örneğin, <strong>data.txt</strong> adlı bir dosya içinde veri bulunuyor olsun.

#Özel Anahtar ile İmza Oluşturm<strong>a:</strong>
<strong>openssl dgst -sha256 -sign private_key.pem -out signature.bin data.txt</strong>

#Genel Anahtar ile İmzayı Doğrulama:
<strong>openssl dgst -sha256 -verify public_key.pem -signature signature.bin data.txt</strong>

#Yukarıdaki komutlar, <strong>data.txt</strong> dosyasının <strong>SHA-256</strong> hash değerini hesaplayarak özel anahtarla imzalar ve imzayı <strong>signature.bin</strong> dosyasına kaydeder. Sonra, imzayı genel anahtarla doğrular ve veri parçasının bütünlüğünü kontrol eder. Eğer <strong>data.txt </strong>dosyası içeriğinde herhangi bir değişiklik yapılmışsa bütünlük doğrulanamaz!

#Veri parçasının bütünlüğünü doğrulanırsa:
<strong>Verified OK</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>🦨 <strong>Hash Oluşturma:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#OpenSSL ile bir metnin (örneğin bir parolanın) hash değerini oluşturabilir.
#Bu komut, bu metni SHA-256 <strong>(Secure Hash Algorithm 256-bit)</strong> algoritması kullanarak özetler (hash) ve ardından elde edilen hash değerini görüntüler.
<strong>echo -n "Parola565cc*!" | openssl dgst -sha256</strong>

<strong>#Hash</strong>
<strong>5b0b69d932d717fdd1fd92e3ba42110de41ee49a30782a6e4e3ba1fe94a4960d</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li><strong>✅ Self Signed SSL Certificate (Kendinden İmzalı SSL Sertifikası)</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>✅ SSL certificates from trusted CA (Güvenilir CA'dan SSL Sertifikası)</strong></li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:image {"id":9483,"width":"203px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://faruk-guler.github.io/assets/post_images/obraz-frozen.jpg?w=571" alt="" class="wp-image-9483" style="width:203px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>SSL/TLS sertifikası oluşturmak için genellikle bir sertifika otoritesine (GoDaddy, GlobalSign, GlobalSign vb.) gibi global (CA - Certificate Authority) başvurulur. Ancak, geliştirme ve test ortamlarında, kendinden imzalı <strong>("Self-Signed Certificate")</strong> olarak adlandırılan bir sertifika kullanabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>"Self-Signed Certificate" (kendi imzalı sertifika), bir güvenlik sertifikasının <strong>(SSL/TLS sertifikası gibi)</strong> sahibinin kendi tarafından imzalandığı ve bir üçüncü taraf sertifika otoritesi (CA - Certificate Authority) tarafından <strong>onaylanMadığı</strong> bir sertifikadır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Genel Sertifika Otoriteleri, genellikle tarayıcılar ve işletim sistemleri tarafından tanınan, güvenilirliklerini doğrulayan ve sertifikaları imzalayarak kullanıcılara güvenli bir bağlantı sağlama sürecini yöneten üçüncü taraf kuruluşlardır.</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li>GoDaddy</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Let's Encrypt</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>VeriSign (Symantec)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>DigiCert</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>GlobalSign</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Comodo (Sectigo)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>............................. .etc</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong><strong>📝</strong></strong> <strong>HTTPS sunucularında kullanılan SSL/TLS sertifikalarını oluşturmak için aşağıdaki adımları izleyebilirsiniz:<br><strong>📝</strong></strong> <strong>Aşağıdaki komutlar, önce özel anahtarı oluşturur, ardından sertifika isteğini (Certificate.csr) oluşturur ve son olarak self-signed sertifikayı (.*crt ve *.pfx) oluşturur.</strong><br><br><strong>📝🔑 (RSA): Anahtar Çifti Oluşturma <strong>(Private Key)</strong></strong> ve <strong>(Public Key)</strong><br><br><strong>#(Private Key)</strong><br><strong>openssl genpkey -algorithm RSA -out Private_key.pem -pkeyopt rsa_keygen_bits:2048</strong><br><br><strong>#(Public Key</strong><br><strong>openssl rsa -pubout -in Private_key.pem -out Public_key.pem</strong><br><br>🔥 Parola Korumalı &amp; Korumasız(-nodes) &amp; -newkey CSR Oluşturma:<strong><br>openssl req -new -newkey rsa:2048 -keyout Private_key.pem -out Certificate.csr<br>openssl req -new -newkey rsa:2048 -keyout Private_key.pem -out Certificate.csr -nodes</strong><br><strong>openssl req -newkey rsa:2048 -keyout guler_com.key -out Certificate.csr</strong> <strong>-nodes</strong><br><br># OpenSSL CSR Sihirbazı (Spesifik)<strong><br>https://www.digicert.com/easy-csr/openssl.htm</strong><br># Genel CSR Oluşturma Yönergeleri (Spesifik)<strong><br>https://www.digicert.com/kb/csr-creation.htm</strong><br><br><strong>🔥 Self-Signed (Kendinden İmzalı) Sertifika Oluşturma:<br>🔥 ###################################################</strong><br><br><strong>🔥🔥🔥</strong> CA (GULER.com) Başvurusu Üzerinden İmzalı Sertifika: <strong>[CRT ve PFX]</strong><br>🍄 <strong>openssl x509 -req -days 365 -in Certificate.csr -signkey Private_key.pem -out Crt_certificate.crt</strong><br><strong>🍄 openssl pkcs12 -export -in <strong>Crt_certificate.crt</strong> -inkey Private_key.pem -out Pfx_certificate.pfx</strong><br><br><strong>🔥🔥🔥</strong> <strong>"CSR İsteği Yapmadan"</strong> Doğrudan Kendine İmzalı Sertifika: <strong>[PEM]</strong><br>Sertifika başvurusu yapma adımını atlayarak, özel anahtar ile doğrudan bir sertifika oluşturur.<br>🍄 <strong>openssl req -new -x509 -key <strong>Private_key.pem</strong> -out Pem_self<strong>certificate</strong>.pem -sha256 -days 365</strong><br><br><br><strong>🍁Congrats! Everything is ready</strong><br><strong>🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁</strong><br>Certificate request self-signature ok<br>subject=C = TR,<br>ST = ISTANBUL,<br>L = TURKEY,<br>O = GULER.CORP,<br>OU = GULER,<br>CN = *.guler.com,<br>emailAddress = admin@guler.com<strong><br></strong><br>📝 Tebrikler, bu adımlar sonunda Self-Signed sertifikalarınızı oluşturdunuz. Kriptografik işlemleri yaparken dikkatli olmalı ve gizli anahtarları güvenli bir şekilde saklamalısınız.</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>## CSR(Certificate Signing Request) </strong>Configuration File <strong>"csr.conf"</strong>:<br><br>[req]<br>default_bits = 2048<br>distinguished_name = dn<br>prompt             = no<br>req_extensions = req_ext<br><br>[dn]<br>C="TR"<br>ST="Turkiye"<br>L="Ankara"<br>O="GULER"<br>OU="IT Service"<br>emailAddress="admin@guler.com"<br>CN="guler.com"<br><br>[req_ext]<br>subjectAltName = @alt_names<br><br>[alt_names]<br>DNS.0 = *.guler.com<br>DNS.1 = 10.x.x.x<br><br><strong>## Create the Private Key:</strong><br>openssl genrsa -out self-ssl.key 2048<br><br><strong>##Extracting Public Key from Private key:</strong><br>openssl rsa -in self-ssl.key -pubout -out public_self_ssl.key<br><br><strong>## Create the CSR</strong>(Certificate Signing Request)<strong>:</strong><br>openssl req -new -key self-ssl.key -out self-ssl.csr -config csr.conf -sha256<br><br><strong>## Verify the <strong>CSR</strong>:</strong><br>openssl req -text -in self-ssl.csr -verify<br>openssl req -text -in self-ssl.csr -noout -verify<br><br><strong>## Sign the <strong>CSR</strong>:</strong><br>openssl x509 -req -days 365 -in self-ssl.csr -signkey self_ssl.key -out self-ssl.crt -extensions req_ext -extfile csr.conf -sha256</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"lightbox":{"enabled":true},"id":9704,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://faruk-guler.github.io/assets/post_images/cert_exp.png?w=923" alt="" class="wp-image-9704" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>🧶 OpenSSL' ile Sertifika Formatlarını dönüştürmek:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sertifika formatlarını dönüştürmek, genellikle farklı sertifika formatları arasında geçiş yapmayı ifade eder. OpenSSL, birçok farklı sertifika formatını destekler ve bu formatlar arasında dönüşümler yapabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>CRT &gt;&gt;&gt; CER:</strong>
openssl x509 -in certificate.crt -out cer_certificate.cer -outform DER

<strong>CER &gt;&gt;&gt; CRT:</strong>
openssl x509 -inform DER -in cer_certificate.cer -out cert_certificate.crt

<strong>CRT &gt;&gt;&gt; PEM:</strong>
openssl x509 -in certificate.crt -out your_certificate.pem

<strong>PEM &gt;&gt;&gt; CER:</strong>
openssl x509 -in pem_certificate.pem -outform DER -out y_certificate.cer

<strong>PEM &gt;&gt;&gt; CRT:</strong>
openssl x509 -in pem_certificate.pem -outform DER -out x_certificate.crt

<strong>CRT &gt;&gt;&gt; P12:</strong>
openssl pkcs12 -export -in certificate.crt -inkey private_key.pem -out p12_certificate.p12

<strong>P12 &gt;&gt;&gt; CER:</strong>
openssl pkcs12 -in p12_certificate.p12 -clcerts -nokeys -out yyy_certificate.cer

<strong>CRT &gt;&gt;&gt; PFX:</strong>
openssl pkcs12 -export -in certificate.crt -inkey private_key.pem -out pfx_certificate.pfx

<strong>PFX &gt;&gt;&gt; PEM:</strong>
openssl pkcs12 -in pfx_certificate.pfx -out z_certificate.pem -nodes

<strong>PEM &gt;&gt;&gt; PFX:</strong>
openssl pkcs12 -export -out certificate.pfx -inkey private_key.pem -in certificate.pem

<strong>................ .etc</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>🛑</strong> <strong>TLS/SSL Sertifikasının Süresi Dolduğunda ne olur ?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>HTTPS yerine uyarılar ve HTTP işaretiyle kullanıcılarınızı korkutabilir, <strong>ancak tarayıcı, kullanıcıyı 'güvenilmeyen sertifika<strong>'</strong></strong> <strong>uyaracaktır.</strong> Ancak bu, sunucudan kullanıcının tarayıcısına <strong>gelen-giden verilerin şifrelenmesini durdurMAZ.</strong> Bağlantı yine de şifreli olmaya devam edecektir. Ancak MITM saldırılarına karşı açıktır. Bir MITM saldırganı sertifikanızı kendi sertifikasıyla değiştirerek trafiğinizi dinleyebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":9399,"width":"320px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://faruk-guler.github.io/assets/post_images/ct_frozen.jpeg?w=600" alt="" class="wp-image-9399" style="width:320px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Ve işte böyle...</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Kriptografi dünyasının derinliklerinde kaybolduktan sonra, şifrelerin ve anahtarların dansını izleyerek OpenSSL okyanusunda bir yolculuğa çıktınız. Bilgi güvenliği sularında yüzüp, karmaşık algoritmaların dalgalarını atlattınız. Eğer hala kendinizi kaybolmuş hissediyorsanız, endişelenmeyin. Hatırlayın ki, bir problemle karşılaştığınızda, OpenSSL sizin yanınızda olaf kalitesinde bir yardımcıdır. Şimdi, bilgisayarınızdaki kapıları güvenle kilitleyin ve biraz dinlenmeye geçin.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p> 🎩💻✨</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Umarım hem eğlendirip hem de öğrettim</strong> <strong>-Olaf</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>I hope I both entertained and taught.  -Olaf</strong></p>
<!-- /wp:paragraph -->
