---
layout: post
title: DNS Kayıt Tipleri Detaylı
date: 2023-05-13 22:16
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":7124,"width":451,"height":236,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dns-records.png?w=1024" alt="" class="wp-image-7124" width="451" height="236" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>DNS, </strong>İngilizce<strong> "Domain Name System" </strong>ifadesinin kısaltmasıdır ve internet üzerindeki hizmetlerin doğru bir şekilde yönlendirilmesini sağlamak için kullanılır. <strong>DNS Kayıt Tipleri, </strong>bir alan adının farklı türdeki bilgilerinin yönetimini sağlar. Şirketler, İşletmeler, web siteleri, e-posta hizmetleri ve diğer internet hizmetleri, uygun DNS kayıt tiplerinin kullanılmasıyla doğru şekilde çalışacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>A kaydı (A Record) </strong>A kaydı, bir alan adının IPv4 adresini belirlemek için kullanılır. Bu kayıt türü, bir web sitesinin veya diğer hizmetlerin hangi IP adresinde yayınlandığını belirler.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>AAAA kaydı (AAAA Record)</strong> AAAA kaydı, bir alan adının IPv6 adresini belirlemek için kullanılır. Bu kayıt türü, bir web sitesinin veya diğer hizmetlerin hangi IPv6 adresinde yayınlandığını belirler.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Alias(CNAME) kaydı (CNAME Record)</strong> CNAME kaydı, bir alan adının başka bir alan adına yönlendirilmesini sağlar. Bu kayıt türü, bir web sitesinin veya diğer hizmetlerin farklı bir alan adı ile erişilebilir olmasını sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>MX kaydı (MX Record)</strong> MX kaydı, bir alan adının e-posta sunucusunun hangi IP adresinde bulunduğunu belirler. Bu kayıt türü, bir alan adı üzerinden e-posta göndermek veya almak için kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>NS kaydı (NS Record)</strong> NS kaydı, bir alan adının yetkili DNS sunucularını belirler. Bu kayıt türü, bir alan adının DNS kayıtlarını yöneten sunucuların listesini içerir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>PTR kaydı (PTR Record) </strong>PTR kaydı, bir IP adresinin alan adını belirler. Bu kayıt türü, bir IP adresinin doğru bir şekilde kimlik doğrulaması için kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>TXT kaydı (TXT Record)</strong> TXT kaydı, bir alan adının belirli bir metin bilgisini içerir. Bu kayıt türü, örneğin bir web sitesinin kimlik doğrulama bilgilerini içerir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>SRV kaydı (SRV Record)</strong> SRV kaydı, bir alan adının belirli bir TCP/IP hizmetinin hangi sunucuda ve bağlantı noktasında sağlanacağını belirlemek için kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>SOA kaydı (SOA Record) </strong>SOA kaydı, bir alan adının DNS kayıtlarının yönetim bilgilerini içerir. Bu kayıt türü, bir alan adının kim tarafından yönetildiği, son güncelleme tarihi ve diğer yönetim bilgilerini içerir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>SPF kaydı (SPF Record) </strong>SPF kaydı, bir alan adının e-posta gönderimine izin verdiği IP adreslerini belirler. Bu kayıt türü, bir alan adının e-posta spam'lerinden korunmasına yardımcı olur ve doğru kimlik doğrulamasını sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>DKIM kaydı (DKIM Record) </strong>DKIM kaydı, bir alan adının e-posta gönderimini kimlik doğrulamasını sağlamak için kullanılır. Bu kayıt türü, e-posta alıcısına, e-postanın doğru bir şekilde gönderildiğini ve değiştirilmediğini doğrulamak için kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>DMARC kaydı (DMARC Record) </strong>DMARC kaydı, SPF ve DKIM kayıtlarını kullanarak e-posta gönderenlerin kimlik doğrulamasını sağlar. Bu kayıt türü, bir alan adının e-posta spam'lerinden korunmasına yardımcı olur ve e-posta alıcılarının doğru kimlik doğrulamasını yapmasını sağlar.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Bu kayıt tipleri, bir alan adının doğru bir şekilde yönlendirilmesini, e-posta gönderimini kimlik doğrulamasını sağlamak gibi önemli işlevleri yerine getirir. Her kayıt türü farklı bir amaç için kullanılır ve alan adının sağlıklı çalışması için gerekli olan kayıtların tamamının doğru bir şekilde yapılandırılması çok önemlidir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu şekilde kısaca anlattığımız kayıt tipleri dışında daha spesifik bazı DNS kayıt tipleri de mevcut olabilir. Örneğin, <strong>CAA kaydı, SIG, KEY, RT, NAPTR kaydı, vb. </strong>gibi kayıt tipleri de bulunmaktadır. Ancak, bu kayıt tipleri özellikle belirli hizmetler veya özellikler içindir ve genel olarak pek yaygın kullanılmaz</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>CAA kaydı (CAA Record) </strong>SSL/TLS sertifikalarının yönetimi için kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>NAPTR kaydı (NAPTR Record) </strong>SIP protokolünde kullanılan telefon numaralarının çözülmesi için kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>SSHFP kaydı (SSHFP Record) </strong>SSH anahtarlarının doğrulanması için kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>TLSA kaydı (TLSA Record) </strong>SSL/TLS sertifikalarının doğrulanması için kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>DS kaydı (DS Record)</strong> DNS'de "Delegation Signer" olarak bilinir ve DNSSEC doğrulamasında kullanılır. DS kaydı, bir alan adının DNSSEC doğrulamasında kullanılan anahtarlarını belirler.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>SSHFP kaydı (SSHFP Record) </strong>SSH sunucularının doğrulanmasında kullanılan anahtarları belirlemek için kullanılır.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Aşağıdaki bağlantılara göz atabilirsiniz:
1. [Wiki](https://en.wikipedia.org/wiki/List_of_DNS_record_types)
2. [Cloudflare](https://www.cloudflare.com/learning/dns/dns-records)
3. [NSlookup](https://www.nslookup.io/learning/dns-record-types).

<!-- wp:paragraph -->
<p><strong>Best Regards. – Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
