---
layout: post
title: DNS Kayıt Tipleri Detaylı - DNS Record Types in Detailed
date: 2023-05-13 22:16
by: faruk-guler
comments: true
categories: [Hybride]
---

<!-- markdownlint-disable MD033 -->
<img src="https://farukguler.com/assets/post_images/dns-records.png" alt="DNS Records" width="520" style="display: block; margin: 20px 0; max-width: 100%; height: auto; border-radius: 10px;" />
<!-- markdownlint-enable MD033 -->

# DNS Kayıt Tipleri Detaylı - DNS Record Types in Detail

**DNS (Domain Name System)**, insan tarafından okunabilir alan adlarını (örn. `farukguler.com`), bilgisayarların ve sunucuların internet üzerinde birbirleriyle iletişim kurmak için kullandığı sayısal IP adreslerine (örn. `93.184.216.34` veya `2606:2800:220:1:248:1893:25c8:1946`) çözümleyen, dağıtık ve hiyerarşik bir veritabanı sistemidir.

Bir alan adına bağlı web sitelerinin, e-posta altyapılarının, alt alan adlarının (subdomains) ve güvenlik mekanizmalarının doğru çalışabilmesi **DNS Kayıt Tipleri (Resource Records - RR)** aracılığıyla yönetilir.

> 💡 **Analoji ile Anlamak:** İnternette gezinmeyi devasa bir otele giriş yapmaya benzetebiliriz. Otele vardığınızda (tarayıcıya alan adını yazdığınızda), resepsiyon (DNS Sunucusu) size hangi odada kalacağınızı veya aradığınız kişinin hangi odada olduğunu (A/AAAA Kaydı - IP Adresi), adınıza gelen kargoların hangi görevliye teslim edileceğini (MX Kaydı - Mail Sunucusu) ve otelin Wi-Fi şifresi, kimlik doğrulama veya güvenlik kuralları gibi çeşitli ek bildirimlerini (TXT Kaydı - SPF/DKIM/DMARC vb.) iletir. Kısacası DNS, internetin sizi doğru odaya ve doğru hizmete yönlendiren akıllı resepsiyonudur.

Bu rehber iki ana bölümden oluşmaktadır:

1. **Kurumsal ve Temel DNS Kayıtları (Bölüm 1):** Şirketlerde, kurumlarda ve web operasyonlarında en sık kullanılan çekirdek kayıtlar (derinlemesine teknik detaylar, e-posta güvenlik protokolleri ve pratik yapılandırma örnekleri).
2. **İleri Düzey, Özel ve Tarihi DNS Kayıtları (Bölüm 2):** DNSSEC mimarisi, yeni nesil web protokolleri (HTTPS / SVCB), kriptografik doğrulamalar, ağ protokolleri ve kullanımdan kaldırılmış tarihi kayıtlar.

> *Not: DNS sürekli gelişen yaşayan bir standart olduğu için, zamanla güncellenen yeni parametreleri ve RFC belgelerini takip edebileceğiniz resmi kaynaklar ve teşhis araçları dokümanın sonunda listelenmiştir.*

---

## DNS Bölge Dosyası (Zone File) ve Kayıt Anatomisi

Bir DNS sunucusunda her kayıt satırı (Resource Record) standart olarak şu 5 temel bileşenden meydana gelir:

```text
<Sahip / Hostname>   <TTL>   <Sınıf>   <Kayıt Tipi>   <Veri / RDATA>
```

* **Sahip (Owner / Name):** Kaydın ait olduğu alan adı veya alt alan adı (`example.com.`, `www`, `mail`). Kök dizini (Zone Apex / Naked Domain) temsil etmek için `@` simgesi kullanılır.
* **TTL (Time to Live):** Kaydın recursive DNS sunucuları ve istemciler tarafından kaç saniye boyunca önbellekte (cache) tutulacağını belirler (örn. `3600` = 1 saat, `86400` = 24 saat).
* **Sınıf (Class):** İnternet protokolü için neredeyse evrensel olarak `IN` (Internet) kullanılır. (Tarihi olarak `CH` - Chaosnet veya `HS` - Hesiod mevcuttur).
* **Kayıt Tipi (Type):** İlgili kaydın işlevini belirten standart kısaltma (`A`, `AAAA`, `CNAME`, `MX`, `TXT`, `NS`, `SOA` vb.).
* **Kayıt Verisi (RDATA):** Kayıt tipine göre değişkenlik gösteren hedef veridir (IP adresi, hedef domain adı, öncelik değeri, metin dizisi vb.).

---

## 🌐 BÖLÜM 1: En Çok Kullanılan Temel DNS Kayıtları (Ayrıntılı Teknik İnceleme)

Bu bölümde internet trafiğinin %90'ından fazlasını yöneten ve her sistem yöneticisi, yazılımcı ve web uzmanının derinlemesine bilmesi gereken temel kayıtlar yer almaktadır.

---

### 1. A Kaydı (Address Record - IPv4)

* **Tip ID:** `1` | **RFC:** [RFC 1035](https://www.rfc-editor.org/rfc/rfc1035)
* **Temel Görevi:** Bir alan adını 32-bitlik standart bir **IPv4** adresine bağlar.

> 💡 **Benzetme:** Otel resepsiyonuna gidip *"Faruk nerede kalıyor?"* diye sorduğunuzda resepsiyonistin size doğrudan **"304 numaralı odada" (IPv4 adresi)** demesidir.

#### A Kaydı Teknik Detayları ve Çalışma Mantığı

* İstemci tarayıcısına `example.com` yazdığında, işletim sistemi DNS çözümleyicisine başvurur. Çözümleyici, kök sunuculardan başlayarak yetkili sunucuya kadar sorgulama yapar ve geriye 4 oktetten oluşan IPv4 adresini (örn. `93.184.216.34`) döner.
* **DNS Round-Robin (Yük Dengeleme):** Bir alan adına birden fazla A kaydı tanımlanabilir. DNS sunucusu her sorguda bu IP'lerin sırasını değiştirerek basit bir istemci seviyesi yük dağıtımı (load balancing) sağlar.
* **DNSBL (Blacklist) Kullanımı:** E-posta anti-spam filtrelerinde (Spamhaus, Barracuda vb.), şüpheli IP'lerin kara listede olup olmadığını sorgulamak için de A kayıtları kullanılır (IP ters çevrilip sorgulandığında `127.0.0.2` gibi bir A kaydı dönüyorsa IP kara listededir).

#### A Kaydı Sözdizimi ve Örnek Yapılandırma

```dns
; Kök domain IPv4 yönlendirmesi
example.com.        3600    IN    A    93.184.216.34

; Alt alan adları yönlendirmesi
api.example.com.    300     IN    A    198.51.100.10

; DNS Round-Robin ile yük dengeleme (aynı isme birden çok IP)
web.example.com.    60      IN    A    192.0.2.1
web.example.com.    60      IN    A    192.0.2.2
web.example.com.    60      IN    A    192.0.2.3
```

---

### 2. AAAA Kaydı (IPv6 Address Record - "Quad-A")

* **Tip ID:** `28` | **RFC:** [RFC 3596](https://www.rfc-editor.org/rfc/rfc3596)
* **Temel Görevi:** Bir alan adını 128-bitlik yeni nesil **IPv6** adresine bağlar.

> 💡 **Benzetme:** Otel devasa bir gökdelene dönüştüğünde, 3 haneli eski oda numaraları tükenir. Resepsiyonun adresi **"B Blok, 14. Kat, 1402 numaralı süit" (128-bit IPv6 adresi)** olarak tarif etmesidir.

#### AAAA Kaydı Teknik Detayları ve Çalışma Mantığı

* İsmini, IPv4'ün 32-bitlik adres alanının 4 katı büyüklükte (128-bit) olmasından ("Quad-A") alır.
* **Dual-Stack Mimarisi:** Modern sistemlerde genellikle aynı host için hem `A` (IPv4) hem de `AAAA` (IPv6) kaydı birlikte tanımlanır.
* **Happy Eyeballs Algoritması (RFC 8305):** Modern tarayıcılar hem A hem AAAA kaydı olan bir siteye bağlanırken her iki adrese eşzamanlı bağlantı denemesi başlatır; hangisi daha düşük gecikmeyle (latency) yanıt verirse o bağlantı üzerinden devam edilir.

#### AAAA Kaydı Sözdizimi ve Örnek Yapılandırma

```dns
; IPv6 adres eşlemesi
example.com.        3600    IN    AAAA    2606:2800:220:1:248:1893:25c8:1946
ipv6.example.com.   3600    IN    AAAA    2001:0db8:85a3:0000:0000:8a2e:0370:7334
```

---

### 3. CNAME Kaydı (Canonical Name Record)

* **Tip ID:** `5` | **RFC:** [RFC 1035](https://www.rfc-editor.org/rfc/rfc1035)
* **Temel Görevi:** Bir alan adını başka bir kurallı (canonical) alan adına takma ad (alias) olarak yönlendirir.

> 💡 **Benzetme:** Resepsiyona *"Ahmet Bey ile görüşecektim"* dediğinizde, resepsiyonistin *"Ahmet Bey otelin Genel Müdürüdür; siz doğrudan **Genel Müdür Odası'na** gidiniz"* diyerek sizi asıl unvana/isime yönlendirmesidir.

#### CNAME Kaydı Teknik Detayları ve Kritik Kurallar

* İstemci `www.example.com` için sorgu yaptığında CNAME kaydıyla karşılaşırsa, çözümleme işlemi durmaz; DNS çözümleyicisi hedef alan adının (`example.com`) IP adresini bulmak için yeni bir sorgu başlatır.
* **Farklı Domain Hedefleme (Cross-Domain CNAME):** CNAME hedefinin kendi alan adınız altında olması zorunlu değildir. Bir alan adı tamamen başka bir şirkete, harici bir domaine (`ahmet.com`), CDN sağlayıcısına (`edgekey.net`) veya bulut servisine (`shops.myshopify.com`) yönlendirilebilir. Hedef sunucuda bu alan adı için Virtual Host tanımı ve SSL sertifikası bulunduğu sürece web sitesi sorunsuz açılır.
* **Hayati Kısıtlama (RFC 1035):** Bir hostname için CNAME kaydı girilmişse, **aynı isim altında başka hiçbir kayıt türü (MX, TXT, A, NS vb.) bulunamaz!**
* **Apex Domain Kısıtı:** Bir domainin kök dizininde (`example.com`) zorunlu olarak `SOA` ve `NS` kayıtları bulunmak zorundadır. Bu nedenle kök domaine CNAME kaydı **kesinlikle verilemez**. Bu kısıtlama günümüzde *ALIAS / ANAME / CNAME Flattening* teknolojileriyle aşılmaktadır.
* **CNAME Chaining (Zincirleme) Riski:** Bir CNAME'in başka bir CNAME'e bağlanması mümkündür ancak her atlama DNS çözümleme süresini uzatır ve döngü (loop) riskleri oluşturur.

#### CNAME Kaydı Sözdizimi ve Örnek Yapılandırma

```dns
; www takma adını kendi kök domainine yönlendirme
www.example.com.      3600    IN    CNAME    example.com.

; Tamamen farklı bir harici alan adına yönlendirme (Örn: mehmet.com'u ahmet.com'a bağlama)
www.mehmet.com.       3600    IN    CNAME    ahmet.com.

; Harici bir CDN, PaaS veya E-Ticaret servisine yönlendirme
magaza.mehmet.com.    3600    IN    CNAME    shops.myshopify.com.
blog.example.com.     3600    IN    CNAME    domains.hashnode.network.
app.example.com.      300     IN    CNAME    my-app.herokuapp.com.
```

---

### 4. ALIAS / ANAME (Apex CNAME / CNAME Flattening)

* **Tip ID:** Standart IETF RFC'si bulunmamaktadır (Draft: `draft-ietf-dnsop-aname-04` / De Facto Standart)
* **Temel Görevi:** Kök domainde (`example.com`) CNAME kural kısıtını ihlal etmeden, domaini bir hostname'e (CDN, Vercel, AWS vb.) yönlendirme imkânı sunar.

> 💡 **Benzetme:** Otelin ana giriş kapısına tabela asmak gibidir. Normalde kök kapıya takma ad tabelası koyma yasağı varken, resepsiyonistin dışarıdan gelen misafire hissettirmeden arka planda asıl hedefin oda numarasını anlık öğrenip eline vermesidir.

#### ALIAS ve ANAME Teknik Detayları ve Çalışma Mantığı

* Bulut sağlayıcıları (AWS Route 53, Cloudflare, DNSimple) dinamik IP altyapıları nedeniyle web sitelerinin doğrudan bir hostname'e (örn. `lb-12345.elb.amazonaws.com`) yönlendirilmesini talep eder.
* Standart DNS kuralları gereği kök domainde CNAME kullanılamadığı için **CNAME Flattening** mimarisi geliştirilmiştir:
  1. Siz yönetim panelinde `example.com -> my-cdn.com` şeklinde bir ALIAS/ANAME tanımı yaparsınız.
  2. DNS sağlayıcısının sunucusu arka planda düzenli olarak `my-cdn.com` adresinin A ve AAAA kayıtlarını sorgular.
  3. Dış dünyadan bir istemci `example.com` adresini sorguladığında, DNS sunucusu sanki doğrudan statik A/AAAA kaydı varmış gibi sentezlenmiş IP adreslerini döner. İstemci arka planda bir takma ad olduğunu asla anlamaz.

#### ALIAS ve ANAME Sözdizimi ve Örnek Yapılandırma

```dns
; DNS sağlayıcısının paneli üzerinden girilen örnek sanal ALIAS/ANAME kaydı
example.com.          3600    IN    ALIAS    my-app.vercel-dns.com.
example.com.          3600    IN    ANAME    d123456.cloudfront.net.

; Dış dünyadaki bir istemci sorguladığında DNS sunucusunun döndüğü sentezlenmiş A kaydı
; example.com.        300     IN    A        76.76.21.21
```

---

### 5. MX Kaydı (Mail Exchange Record)

* **Tip ID:** `15` | **RFC:** [RFC 1035](https://www.rfc-editor.org/rfc/rfc1035), [RFC 7505](https://www.rfc-editor.org/rfc/rfc7505)
* **Temel Görevi:** Alan adına gelen e-postaların hangi posta sunucuları tarafından kabul edileceğini ve sunucuların öncelik sırasını belirler.

> 💡 **Benzetme:** Otele gelen mektup, kargo ve paketlerin müşterilerin odalarına değil; doğrudan otelin **Mal Kabul ve Posta Ayrıştırma Ofisi'ne** teslim edilmesini sağlayan yönlendirmedir. Öncelik numaraları ise *"Önce 1. masaya teslim et, meşgulse 2. masaya bırak"* talimatıdır.

#### MX Kaydı Teknik Detayları ve Öncelik Mantığı

* **Öncelik (Priority / Preference):** MX kaydı yanında `10`, `20`, `30` gibi bir sayısal değer alır. **Sayı ne kadar küçükse öncelik o kadar yüksektir**. Gönderen sunucu daima en düşük sayılı sunucuya bağlanmayı dener; ulaşamazsa bir sonraki yüksek sayılı sunucuya geçer.
* **CNAME Yasağı:** MX kaydının gösterdiği hedef adres bir CNAME olamaz; doğrudan A veya AAAA kaydı bulunan bir hostname olmalıdır.
* **Null MX (RFC 7505):** Eğer bir alan adı **hiçbir şekilde e-posta almıyorsa**, spam gönderenlerin bu alan adı üzerinden sahte mail trafiği üretmesini engellemek için `0 .` (öncelik 0, hedef nokta) girilmelidir. Bu kayıt dünyaya "Bu domain kesinlikle e-posta kabul etmez" mesajı verir.

#### MX Kaydı Sözdizimi ve Örnek Yapılandırma

```dns
; Öncelik sırasına göre e-posta sunucuları
example.com.    3600    IN    MX    10    mail.example.com.
example.com.    3600    IN    MX    20    backupmail.example.com.

; Google Workspace için tipik MX yapılandırması
example.com.    3600    IN    MX    1     aspmx.l.google.com.
example.com.    3600    IN    MX    5     alt1.aspmx.l.google.com.
example.com.    3600    IN    MX    5     alt2.aspmx.l.google.com.

; E-posta kabul etmeyen alan adları için Null MX (RFC 7505)
no-email.com.   3600    IN    MX    0     .
```

---

### 6. TXT Kaydı (Text Record) ve E-Posta Güvenlik Protokolleri

* **Tip ID:** `16` | **RFC:** [RFC 1035](https://www.rfc-editor.org/rfc/rfc1035), [RFC 1464](https://www.rfc-editor.org/rfc/rfc1464)
* **Temel Görevi:** Başlangıçta insan tarafından okunabilir notlar tutmak için tasarlandıysa da, günümüzde **kriptografik e-posta güvenliği**, **alan adı mülkiyet doğrulaması** ve **güvenlik politikaları** için internetin en kritik kayıtlarından biridir.

> 💡 **Benzetme:** Otelin resmi güvenlik ve duyuru panosudur. Resepsiyonun misafirlere Wi-Fi şifresini vermesi veya kapıdaki güvenliğe *"Otelimiz adına kargo teslim almaya yalnızca şu kuryeler yetkilidir (SPF), evrakların altında otel mührü bulunmalıdır (DKIM), sahte kuryeleri derhal polise bildirin (DMARC)"* talimatını asmasıdır.

#### TXT Üzerinde Çalışan Standartlar (Derinlemesine İnceleme)

---

#### 6.1. SPF (Sender Policy Framework - RFC 7208)

##### A. SPF Nedir ve Neden Hayatidir

SPF kontrolünün aktif olduğu e-posta sunucularında; gelen bir iletinin zarf başlığındaki (envelope header / Return-Path / Mail From) gönderici IP adresi ile göndericinin DNS kayıtlarında ilan ettiği izinli IP adreslerinin örtüşüp örtüşmediğini denetleyen bir güvenlik kaydıdır.

* **Alıcı Açısından:** Kurumsal firmalardan geliyormuş gibi görünen fakat saldırganlar tarafından sahte kimlikle (spoofed) gönderilen oltalama (phishing) ve CEO dolandırıcılığı maillerini filtreler.
* **Gönderici Açısından:** Çalışanlarınızın, müşterilerinizin ve iş ortaklarınızın sizin alan adınız adına gönderilen sahte e-postalara kurban gitmesini engeller; alan adınızın itibarını (sender reputation) korur.

##### B. Altın Kural - Alan Adı Başına Yalnızca 1 Adet SPF Kaydı

> [!CAUTION]
> Her alan adı için DNS'te **yalnızca 1 adet SPF kaydı bulunmalıdır**. Birden fazla SPF kaydı (`v=spf1 ...`) girilmesi durumunda RFC 7208 standardı gereğince sunucular **PermError (Kalıcı Hata)** üretir ve tüm SPF koruması devre dışı kalabilir! Farklı servis sağlayıcılar tek bir kayıt içinde birleştirilmelidir.

##### C. Adım Adım SPF Kaydı Oluşturma Süreci

1. **Gönderici Envanterinin Tespiti:** Alan adınız adına e-posta gönderen tüm kaynakları listeleyin:
   * Şirket içi yerel mail sunucuları ve statik IP adresleri (Exchange, Postfix vb.).
   * Kurumsal bulut sağlayıcıları (Google Workspace, Microsoft 365).
   * Toplu gönderim, bülten ve pazarlama servisleri (SendGrid, Mailchimp, Brevo).
   * Web sitenizin form ve transactional bildirim gönderen web sunucusu IP'leri.
2. **Versiyon Belirtme:** Standart olarak daima `v=spf1` ile başlar.
3. **Mekanizmaların Yazılması:**
   * `ip4:x.x.x.x` veya `ip4:x.x.x.x/24`: Doğrudan izinli IPv4 adresi veya CIDR bloğu.
   * `ip6:x:x::x`: İzinli IPv6 adresi veya bloğu.
   * `include:<alan-adi>`: Harici bir e-posta servisinin SPF politikasını içe aktarır (örn. `include:_spf.google.com`).
   * `a`: Alan adının A kaydındaki IP'ye izin verir.
   * `mx`: Alan adının MX kayıtlarındaki sunucuların IP'lerine izin verir.
   * `ptr`: IP'den ters DNS (rDNS) sorgulaması yapar. *(RFC 7208 standardı gereğince yüksek DNS sorgu yükü ve güvenlik zafiyetleri sebebiyle kesinlikle KULLANILMAMALIDIR - Deprecated).*
   * `redirect=<alan-adi>`: SPF politikasını tamamen başka bir alan adına devreder.
4. **Kritik Kural: 10 DNS Lookup Sınırı!**
   * SPF çözümlemesi sırasında yapılan `include:`, `a`, `mx`, `ptr`, `redirect`, `exists` sorgularının toplamı **en fazla 10 DNS lookup** olabilir.
   * `ip4` ve `ip6` mekanizmaları doğrudan IP belirttiği için lookup sayılmaz.
   * 10 lookup sınırı aşılırsa alıcı sunucu `PermError` vererek SPF'i yok sayar.
5. **Aksiyon Niteleyicisinin (Qualifier) Belirlenmesi:**
   * `-all` (**HardFail - Kesin Ret**): Listelenen kaynaklar haricindeki tüm gönderimlerin reddedilmesini ve düşürülmesini (drop) söyler. En güvenli durumdur; envanterinizden eminseniz kesinlikle `-all` kullanılmalıdır.
   * `~all` (**SoftFail - Şüpheli / Karantina**): Envanterinizde eksik bir IP olabileceğinden şüpheleniyorsanız geçiş dönemi için önerilen kuraldır. Alıcı sunucu maili genellikle doğrudan reddetmek yerine spam klasörüne taşır.
   * `?all` (**Neutral - Nötr**): Herhangi bir politika beyan edilmez; IP doğrulanamasa bile geçersiz sayılmaz.
   * `+all` (**Pass - Açık Kapı**): İnternetteki tüm IP'lerin alan adınız adına mail atabilmesine izin verir. **Aşırı derecede tehlikelidir ve asla kullanılmamalıdır!**

##### D. Örnek SPF Yapılandırmaları

```dns
; Google Workspace kullanan standart kurumsal alan adı
example.com.    3600    IN    TXT    "v=spf1 include:_spf.google.com ~all"

; Microsoft 365 + Ofis Statik IP'si + SendGrid kullanan alan adı (Sıkı koruma: -all)
example.com.    3600    IN    TXT    "v=spf1 ip4:198.51.100.25 include:spf.protection.outlook.com include:sendgrid.net -all"

; Sadece kendi A ve MX sunucuları üzerinden mail atan alan adı
example.com.    3600    IN    TXT    "v=spf1 a mx ip4:192.0.2.10/29 -all"
```

##### E. Doğrulama ve Test Araçları

* **MXToolbox SPF Check:** `https://mxtoolbox.com/spf.aspx`
* **SPF Wizard:** `https://www.spfwizard.com/`
* **DMARC Analyzer SPF Checker:** `https://www.dmarcanalyzer.com/spf/checker/`
* **Mail-Tester:** `https://www.mail-tester.com/spf-dkim-check`

---

#### 6.2. DKIM (DomainKeys Identified Mail - RFC 6376)

##### A. DKIM Nedir ve Nasıl Çalışır

DKIM, e-posta gönderen sunucunun giden iletiye (başlıklar ve gövde) kriptografik bir özel anahtar (private key) ile dijital imza eklemesi ve alıcı sunucunun bu imzayı göndericinin DNS kayıtlarında yayınlanan genel anahtar (public key) ile çözerek doğrulaması esasına dayanan bir kimlik doğrulama yöntemidir.

* E-postanın iletim sırasında hackerlar, aradaki proxy'ler veya kötü niyetli aktörler tarafından **değiştirilmediğini (bütünlük)** kanıtlar.
* İletinin gerçekten belirtilen alan adının sunucusundan çıktığını **(kimlik doğrulama)** garanti eder.
* **Gelen E-postada DKIM Nasıl Görünür?** Gmail veya kurumsal bir istemcide gelen bir e-postayı açıp *"Diğer > Orijinali Göster (Show Original)"* menüsüne girdiğinizde:
  * `DKIM: 'PASS' with domain example.com` satırını ve e-posta başlığındaki `DKIM-Signature:` bloğunu görebilirsiniz.

##### B. Adım Adım DKIM Kurulumu

1. **Anahtar Çifti (Keypair) Oluşturma:**
   * Google Workspace veya Microsoft 365 gibi bir bulut sağlayıcı kullanıyorsanız, admin panelinden tek tıkla DKIM anahtarı üretebilirsiniz.
   * Kendi sunucunuzu (Postfix, Exim, cPanel, Plesk) yönetiyorsanız OpenSSL veya `ssh-keygen` ile 2048-bit RSA anahtar çifti oluşturulur:

     ```bash
     openssl genrsa -out dkim_private.key 2048
     openssl rsa -in dkim_private.key -pubout -out dkim_public.key
     ```

     *(Not: 1024-bit anahtarlar artık kriptografik olarak yetersiz sayıldığından günümüzde standart olarak **2048-bit** tercih edilmelidir).*

2. **DNS'e Genel Anahtarın (Public Key) Eklenmesi:**
   * DNS üzerinde bir TXT kaydı açılır.
   * **Kayıt İsmi (Name):** `<selector>._domainkey.example.com.`

     *(Selector, aynı domain üzerinde farklı mail sunucularının veya departmanların kendi bağımsız anahtarlarını kullanabilmesini sağlayan bir seçicidir; örn. `google`, `default`, `s1`, `mail`).*

   * **Kayıt İçeriği (Value):**

     ```text
     v=DKIM1; k=rsa; t=s; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...[Public Key]...
     ```

     * `v=DKIM1`: DKIM protokol versiyonu.
     * `k=rsa`: Kullanılan şifreleme algoritması (genellikle RSA veya Ed25519).
     * `t=s`: Subdomain kısıtı (imzanın yalnızca bu alan adı için geçerli olduğunu, alt alan adlarına otomatik devredilmediğini belirtir).
     * `p=`: Base64 ile kodlanmış genel anahtar dizesi.
3. **Gönderici Platformda İmzanın Etkinleştirilmesi:**
   * DNS kaydı eklendikten sonra e-posta sağlayıcınızın yönetim konsolundan *"İmzalamayı Başlat / Start Authentication"* butonuna tıklayarak DKIM imzasını canlıya alın.
4. **Doğrulama ve Kontrol:**
   * Terminal üzerinden DNS sorgulaması:

     ```bash
     dig TXT google._domainkey.example.com +short
     nslookup -type=TXT google._domainkey.example.com
     ```

   * Online test: [DMARC Analyzer DKIM Check](https://www.dmarcanalyzer.com/dkim/dkim-check/) veya [Mail-Tester](https://www.mail-tester.com/).

---

#### 6.3. DMARC (Domain-based Message Authentication, Reporting & Conformance - RFC 7489)

##### A. DMARC Nedir ve Neden SPF + DKIM'in Zirvesidir

SPF yalnızca e-postanın görünmeyen zarf başlığındaki `Return-Path` IP'sini denetler. DKIM ise yalnızca imzanın geçerliliğini onaylar. Ancak saldırganlar, `Return-Path` alanına kendi domainlerini yazıp SPF'i geçebilirken, kullanıcının e-posta programında gördüğü `From:` (Gönderen) satırına sizin kurumsal domaininizi (`ceo@sirketiniz.com`) yazabilirler!

**DMARC işte bu açığı kapatır:**

1. Kullanıcının gördüğü `From:` başlığındaki alan adı ile SPF ve DKIM'in doğruladığı alan adının birbiriyle uyumlu (Aligned) olmasını zorunlu kılar.
2. Kimlik doğrulaması başarısız olan sahte e-postalara alıcı sunucunun ne yapacağını (reddetme, karantinaya alma) kesin kurallara bağlar.
3. Dünyadaki tüm büyük servis sağlayıcılardan (Google, Microsoft, Yahoo, Apple vb.) alan adınız adına kimlerin e-posta gönderdiğini gösteren **ayrıntılı XML raporları** toplar.

##### B. DMARC Kayıt İsmi ve Sözdizimi

* **Kayıt İsmi (Name):** `_dmarc.example.com.` (Daima `_dmarc` öneki ile başlar).
* **Kayıt Türü:** `TXT`

##### C. Tüm DMARC Parametreleri Sözlüğü

| Parametre | Zorunlu mu? | Varsayılan | Açıklama ve Seçenekler |
| :--- | :--- | :--- | :--- |
| `v=DMARC1` | **Evet** | - | Protokol versiyonu; kaydın en başında yer alması mecburidir. |
| `p=` | **Evet** | - | **Ana Politika:** Doğrulamadan geçemeyen iletilere ne yapılacağını belirler: `none` (Sadece izle ve rapor topla, engelleme); `quarantine` (İletileri alıcının Spam kutusuna taşı); `reject` (İletileri sunucu seviyesinde tamamen reddet ve düşür). |
| `sp=` | Hayır | `p=` değeri | **Alt Alan Adı (Subdomain) Politikası:** Alt alan adları için ana domainden farklı bir kural koyar (örn. `p=quarantine; sp=reject;`). |
| `pct=` | Hayır | `100` | **Yüzde Oranı (Percentage):** Politikanın giden trafiğin yüzde kaçına uygulanacağını belirler (`0` - `100`). Aşamalı geçiş için kritik bir ayardır (örn. `pct=20`). |
| `rua=` | **Önerilir** | - | **Toplu Özet Raporlar (Aggregate Reports):** Günlük XML istatistik raporlarının iletileceği mail adresi (örn. `mailto:dmarc-rua@example.com`). |
| `ruf=` | Hayır | - | **Adli Hata Raporları (Forensic / Failure Reports):** Başarısız olan her bir sahte e-posta için anlık teknik hata dökümünün gideceği adres (örn. `mailto:dmarc-ruf@example.com`). |
| `rf=` | Hayır | `afrf` | **Adli Rapor Formatı:** Hata raporlarının biçimi (`afrf`: Authentication Failure Reporting Format, `iodef`). |
| `ri=` | Hayır | `86400` | **Raporlama Aralığı:** Raporların kaç saniyede bir gönderileceği (varsayılan: 86400 sn = 24 saat). |
| `aspf=` | Hayır | `r` | **SPF Uyum Modu (Alignment):** `r` (Relaxed - Esnek: Alt domain eşleşmelerine izin verir); `s` (Strict - Katı: Tam ve birebir domain eşleşmesi şarttır). |
| `adkim=` | Hayır | `r` | **DKIM Uyum Modu (Alignment):** `r` (Relaxed - Esnek: Alt domain imzalarına tolerans tanır); `s` (Strict - Katı: DKIM imzasındaki domain ile `From:` domaini birebir aynı olmalıdır). |
| `fo=` | Hayır | `0` | **Adli Rapor Tetikleme Koşulu (Forensic Options):** `0` (Hem SPF hem DKIM başarısızsa); `1` (SPF veya DKIM'den biri başarısızsa - Önerilen); `d` (Yalnızca DKIM imza doğrulaması başarısızsa); `s` (Yalnızca SPF IP doğrulaması başarısızsa). |

##### D. Güvenli DMARC Canlıya Alma Yol Haritası (Staging Strategy)

Bir şirkette doğrudan `p=reject` politikası uygulamak, bilinmeyen meşru e-posta akışlarının (muhasebe yazılımları, CRM bildirimleri) kesilmesine yol açabilir. Bu nedenle sektör standardı 3 aşamalı geçiş uygulanır:

```text
[ Aşama 1: Gözlem ] ───> [ Aşama 2: Kademeli Karantina ] ───> [ Aşama 3: Kesin Koruma ]
p=none; pct=100;         p=quarantine; pct=10 -> 50 -> 100;     p=reject; sp=reject; pct=100;
(Raporları İncele)       (Şüphelileri Spam'e At)                (Sıfır Tolerans / Tam Koruma)
```

1. **Aşama 1 (İzleme & Teşhis - 4-8 Hafta):**

   ```dns
   _dmarc.example.com.  3600  IN  TXT  "v=DMARC1; p=none; pct=100; rua=mailto:dmarc-rua@example.com; fo=1;"
   ```

   *Mailler engellenmez; gelen XML raporları analiz edilerek yetkisiz veya eksik kalmış tüm meşru mail sunucuları tespit edilip SPF/DKIM'e eklenir.*

2. **Aşama 2 (Kademeli Karantina):**

   ```dns
   _dmarc.example.com.  3600  IN  TXT  "v=DMARC1; p=quarantine; pct=25; rua=mailto:dmarc-rua@example.com; sp=quarantine;"
   ```

   *Trafiğin %25'i ile başlanıp risk görülmedikçe oran %50, %75 ve %100'e çıkarılır.*

3. **Aşama 3 (Tam Koruma ve Reddetme):**

   ```dns
   _dmarc.example.com.  3600  IN  TXT  "v=DMARC1; p=reject; sp=reject; pct=100; rua=mailto:dmarc-rua@example.com; aspf=r; adkim=r;"
   ```

   *Artık alan adınızı taklit eden hiçbir sahte e-posta alıcıların gelen kutusuna dahi ulaşamaz; doğrudan sunucu seviyesinde yok edilir.*

##### E. DMARC Test, Analiz ve Doğrulama Araçları

* **MXToolbox DMARC Lookup:** `https://mxtoolbox.com/dmarc.aspx`
* **DMARC Analyzer Checker:** `https://www.dmarcanalyzer.com/dmarc/dmarc-record-check/`
* **Mail-Tester (Kapsamlı Skorlama):** `https://www.mail-tester.com/`
* **Dmarcian DMARC Inspector:** `https://dmarcian.com/dmarc-inspector/`

---

#### 6.4. BIMI (Brand Indicators for Message Identification)

DMARC politikası en az `p=quarantine` veya `p=reject` seviyesine ulaşmış kurumsal firmaların; destekleyen istemcilerde (Gmail, Apple Mail vb.) resmi onaylı logolarını göstermesini sağlar.

* **Gereksinimler:** DMARC `reject/quarantine`, SVG Tiny Portable/Secure formatında logo ve Entrust / DigiCert gibi otoritelerden temin edilen **VMC (Verified Mark Certificate)** sertifikası.

```dns
default._bimi.example.com.    3600    IN    TXT    "v=BIMI1; l=https://example.com/logo.svg; a=https://example.com/vmc.pem"
```

---

#### 6.5. MTA-STS (RFC 8461) ve TLS-RPT (RFC 8460)

Mail sunucuları arasındaki SMTP trafiğinde TLS şifrelemesini zorunlu kılarak araya girme (Man-in-the-Middle) ve şifresiz bağlantıya zorlama (Downgrade) saldırılarını engeller:

```dns
_mta-sts.example.com.    3600    IN    TXT    "v=STSv1; id=2023051301"
_smtp._tls.example.com.  3600    IN    TXT    "v=TLSRPTv1; rua=mailto:tls-reports@example.com"
```

---

#### 6.6. Alan Adı Mülkiyet Doğrulamaları (Site Verification)

Üçüncü taraf kurumsal servisler, alan adının yasal sahibinin siz olduğunu doğrulamak için rastgele üretilmiş anahtarları DNS TXT kaydı olarak eklemenizi ister:

```dns
example.com.    3600    IN    TXT    "google-site-verification=abcdef1234567890"
example.com.    3600    IN    TXT    "MS=ms12345678"
example.com.    3600    IN    TXT    "atlassian-domain-verification=12345678"
```

---

### 7. NS Kaydı (Name Server Record)

* **Tip ID:** `2` | **RFC:** [RFC 1035](https://www.rfc-editor.org/rfc/rfc1035)
* **Temel Görevi:** Bir alan adının veya alt alan adının DNS kayıtlarını yöneten **yetkili ad sunucularını (Authoritative Name Servers)** belirler.

> 💡 **Benzetme:** Şehir girişindeki turizm danışma merkezinin, *"Biz otelin odalarını tek tek bilmeyiz; otelle ilgili tüm detayları öğrenmek için doğrudan otelin kendi merkez resepsiyonuna (Yetkili Ad Sunucusu) gidiniz"* diyerek yetkiyi devretmesidir.

#### NS Kaydı Teknik Detayları, Glue Record ve Anycast Mimarisi

* İnternet hiyerarşisinde kök sunucular TLD sunucularına (`.com`, `.net`), TLD sunucuları ise NS kayıtları aracılığıyla sizin alan adınızın yetkili sunucularına (örn. Cloudflare, AWS Route 53, Google Cloud DNS veya kendi BIND sunucunuz) yetki devreder (Delegation).
* **Anycast DNS Mimarisi:** Modern yetkili ad sunucusu sağlayıcıları (örn. Cloudflare'in küresel Anycast ağı), NS kayıtlarına atanan IP adreslerini BGP (Border Gateway Protocol) üzerinden dünya genelindeki yüzlerce PoP (Point of Presence) noktasından eşzamanlı olarak anons eder. İstemci hangi ülkede veya şehirdeyse, internet yönlendirmesi onu fiziksel olarak en yakın veri merkezine yönlendirir. Bu mimari, DNS çözümleme gecikmesini (latency) 1-10 ms seviyesine indirirken devasa DDoS saldırılarını küresel ölçekte absorbe ederek alan adının ayakta kalmasını sağlar.
* **Glue Records (Yapıştırıcı Kayıtlar):** Eğer alan adınızın yetkili ad sunucusu kendi alan adınızın altında bir isimse (örn. `example.com`'un ad sunucusu `ns1.example.com` ise), tavuk-yumurta ikilemi oluşur; `ns1.example.com`'un IP'sini öğrenmek için `example.com`'a gitmek gerekir, ona gitmek için ise `ns1.example.com`'un IP'si lazımdır. Bu döngüyü kırmak için TLD sunucularına IP adresini doğrudan içeren **Glue Record (Yapıştırıcı A/AAAA kaydı)** tanımlanması zorunludur.

#### NS Kaydı Sözdizimi ve Örnek Yapılandırma

```dns
; Alan adının yetkili ad sunucuları (yedeklilik için en az 2 adet)
example.com.          86400    IN    NS    ns1.cloudflare.com.
example.com.          86400    IN    NS    ns2.cloudflare.com.

; Alt alan adını başka bir DNS sunucusuna devretme (Zone Delegation)
subdomain.example.com. 86400   IN    NS    ns1.otherprovider.com.
```

---

### 8. SOA Kaydı (Start of Authority Record)

* **Tip ID:** `6` | **RFC:** [RFC 1035](https://www.rfc-editor.org/rfc/rfc1035), [RFC 2308](https://www.rfc-editor.org/rfc/rfc2308)
* **Temel Görevi:** Her DNS bölge dosyasının **en başında yer almak zorunda olan** ve bölgeye ilişkin birincil yönetim parametrelerini barındıran yetki kaydıdır.

> 💡 **Benzetme:** Otelin lobisinde asılı duran **Resmi İşletme Ruhsatı ve Yönetim Künyesi**dir. Otelin müdürünün kim olduğunu, vardiya devir saatlerini ve denetim periyotlarını gösterir.

#### SOA Kaydı Teknik Detayları ve Alanlarının Anlamı

1. **MNAME (Primary Master):** Bölgenin orijinal kayıtlarını tutan birincil DNS sunucusu (örn. `ns1.example.com`).
2. **RNAME (Responsible Email):** Bölge yöneticisinin e-posta adresi. E-postadaki `@` işareti yerine `.` (nokta) kullanılır (örn. `hostmaster.example.com` = `hostmaster@example.com`).
3. **SERIAL (Seri No):** Bölge dosyasının revizyon numarasıdır. Standart olarak `YYYYMMDDnn` formatı kullanılır (örn. `2023051301`). Birincil sunucudaki bu sayı büyütüldüğünde ikincil (slave) sunucular bölgenin güncellendiğini anlar ve transfer başlatır.
4. **REFRESH:** İkincil sunucuların birincilden güncelleme olup olmadığını kontrol etme sıklığı (saniye cinsinden, örn. `7200` = 2 saat).
5. **RETRY:** Birincil sunucuya ulaşılamadığında yeniden deneme bekleme süresi (örn. `3600` = 1 saat).
6. **EXPIRE:** Birincil sunucuya uzun süre ulaşılamazsa ikincil sunucunun bu bölgeyi ne kadar süre daha yayında tutacağı (örn. `1209600` = 2 hafta). Bu süre biterse ikincil sunucu bölgeyi yayından kaldırır.
7. **MINIMUM (Negative Cache TTL - RFC 2308):** Olmayan bir kayıt sorgulandığında (NXDOMAIN cevabı alındığında) çözümleyicilerin bu "bulunamadı" cevabını ne kadar süre önbellekte saklayacağı.

#### SOA Kaydı Sözdizimi ve Örnek Yapılandırma

```dns
example.com.    86400    IN    SOA    ns1.example.com. admin.example.com. (
                                      2023051301 ; Serial
                                      7200       ; Refresh (2 saat)
                                      3600       ; Retry (1 saat)
                                      1209600    ; Expire (14 gün)
                                      3600       ; Negative Cache TTL (1 saat)
                                      )
```

---

### 9. PTR Kaydı (Pointer Record - Reverse DNS)

* **Tip ID:** `12` | **RFC:** [RFC 1035](https://www.rfc-editor.org/rfc/rfc1035)
* **Temel Görevi:** A kaydının tam tersidir; **bir IP adresini hostname'e bağlar (Reverse DNS / rDNS)**.

> 💡 **Benzetme:** Resepsiyonun oda numarasından (IP) yola çıkarak *"Bu 304 numaralı odada kayıtlı olarak hangi misafir kalıyor?"* (Hostname) teyidini yapmasıdır; A kaydının tam tersi yönde çalışan kimlik denetimidir.

#### PTR Kaydı Teknik Detayları ve E-Posta Güvenliğindeki Rolü

* Standart domainler yerine IPv4 için özel `in-addr.arpa`, IPv6 için `ip6.arpa` alan adı ağacında barındırılır.
* IPv4 adresinin oktetleri ters sırada yazılır. Örneğin `192.0.2.25` IP adresi `25.2.0.192.in-addr.arpa.` olarak sorgulanır.
* **FCrDNS (Forward-Confirmed Reverse DNS):** Bir mail sunucusunun IP adresi rDNS ile bir hostname veriyorsa, o hostname de A kaydı ile aynı IP adresine geri dönmelidir. Gmail, Outlook ve Yahoo gibi dev e-posta sağlayıcıları FCrDNS doğrulaması tutmayan IP'lerden gelen iletileri doğrudan spam sayar veya reddeder.

#### PTR Kaydı Sözdizimi ve Örnek Yapılandırma

```dns
; 192.0.2.25 IP adresinin Reverse DNS kaydı:
25.2.0.192.in-addr.arpa.    3600    IN    PTR    mail.example.com.
```

---

### 10. CAA Kaydı (Certification Authority Authorization)

* **Tip ID:** `257` | **RFC:** [RFC 8659](https://www.rfc-editor.org/rfc/rfc8659)
* **Temel Görevi:** Alan adınız için hangi Sertifika Otoritelerinin (CA - Let's Encrypt, Sectigo, DigiCert vb.) SSL/TLS sertifikası düzenleyebileceğini sınırlandırır.

> 💡 **Benzetme:** Otel yönetiminin güvenliğe verdiği resmi talimattır: *"Bu otelin kapı kilitlerini ve anahtarlarını sadece 'Kale Kilit' firması (yetkili Sertifika Otoritesi) kopyalayabilir; başka bir çilingirden gelen anahtarları kesinlikle kabul etmeyin."*

#### CAA Kaydı Teknik Detayları ve Çalışma Mantığı

* 8 Eylül 2017'den bu yana CA/Browser Forum kararıyla tüm resmi sertifika otoriteleri, bir alan adına sertifika basmadan önce **DNS'teki CAA kayıtlarını kontrol etmekle kanunen yükümlüdür**.
* **Kayıt Olmaması Durumu:** Bir alan adında hiçbir CAA kaydı yoksa, geçerli herhangi bir sertifika otoritesi bu alan adına sertifika düzenleyebilir. CAA tanımlandığı anda ise listede olmayan tüm otoritelerin sertifika basması engellenir.
* **Alt Alan Adı Mirası (Subdomain Inheritance):** CAA kayıtları tüm alt alan adları tarafından otomatik olarak miras alınır (`blog.example.com`, `example.com`'un CAA kurallarına bağlı kalır). Ancak istenirse belirli bir alt alan adına özel CAA kaydı eklenerek üst alan adının politikası ezilebilir.
* Alan adınıza CAA kaydı girerek saldırganların zayıf bir sertifika otoritesini kandırıp adınıza sahte SSL sertifikası üretmesini (Man-in-the-Middle) imkânsız hale getirirsiniz.
* **Etiketler:**
  * `issue`: Standart domain sertifikası verebilecek yetkili CA.
  * `issuewild`: Wildcard (`*.example.com`) sertifika verebilecek CA.
  * `iodef`: Yetkisiz bir sertifika üretim teşebbüsü olduğunda alarmın bildirileceği mail/URL.

#### CAA Kaydı Sözdizimi ve Örnek Yapılandırma

```dns
; Yalnızca Let's Encrypt sertifika üretebilir, ihlaller security mailine gider:
example.com.    3600    IN    CAA    0 issue "letsencrypt.org"
example.com.    3600    IN    CAA    0 issuewild "letsencrypt.org"
example.com.    3600    IN    CAA    0 iodef "mailto:security@example.com"
```

---

### 11. SRV Kaydı (Service Locator)

* **Tip ID:** `33` | **RFC:** [RFC 2782](https://www.rfc-editor.org/rfc/rfc2782)
* **Temel Görevi:** Belirli bir ağ protokolünün veya servisin (Active Directory, SIP/VoIP, XMPP, Teams, Minecraft) hangi hostname ve port üzerinden çalıştığını belirtir.

> 💡 **Benzetme:** Resepsiyonistin yalnızca oda numarası vermekle kalmayıp, *"Konferans için 2. kattaki 204 numaralı salona (Host) gidin ve 5060 numaralı yan kapıyı (Port) kullanın"* şeklinde hem konumu hem de spesifik kapı/port numarasını tarif etmesidir.

#### SRV Kaydı Teknik Detayları ve Öncelik ve Ağırlık Sistemi

* Standart A kaydı port bilgisi içermezken, SRV kaydı port bilgisini DNS seviyesinde dinamikleştirir.
* **Sözdizimi:** `_servis._protokol.domain. TTL IN SRV <Öncelik> <Ağırlık> <Port> <Hedef>`
  * **Öncelik (Priority):** En düşük sayı önce denenir.
  * **Ağırlık (Weight):** Aynı önceliğe sahip sunucular arasında yüzdesel yük paylaştırma sağlar.

#### SRV Kaydı Sözdizimi ve Örnek Yapılandırma

```dns
; VoIP / SIP Sunucusu
_sip._tcp.example.com.       3600    IN    SRV    10 60 5060  bigbox.example.com.
_sip._tcp.example.com.       3600    IN    SRV    10 40 5060  smallbox.example.com.

; Minecraft Sunucusu (Farklı portta çalışan oyun sunucusu yönlendirmesi)
_minecraft._tcp.mc.play.com. 3600    IN    SRV    0  5  25565 server1.hosting.com.
```

---

## ⚙️ BÖLÜM 2: İleri Düzey, Özel ve Modern DNS Kayıtları

Bu alandaki kayıtlar; modern şifreleme mekanizmaları, DNSSEC mimarisi, DANE kimlik doğrulama modelleri, telekomünikasyon sistemleri ve altyapı protokolleri için geliştirilmiş ileri düzey kayıtlardır.

---

### 1. Modern Web ve Servis Keşfi Kayıtları

#### 1.1. HTTPS (Type 65) ve SVCB (Type 64) Kayıtları

* **Tip ID:** `65` (HTTPS), `64` (SVCB) | **RFC:** [RFC 9460](https://www.rfc-editor.org/rfc/rfc9460)
* **Teknik İşlevi:** Web tarayıcılarının web sunucusuyla TLS el sıkışması (handshake) kurmadan önce ihtiyaç duyacağı parametreleri tek bir DNS yanıtında istemciye sunar.
  * **HTTP/3 ve ALPN İpuçları:** İstemci daha ilk TCP paketini atmadan sunucunun HTTP/3 (QUIC) desteklediğini öğrenir; böylece HTTP/1.1 -> HTTP/2 -> HTTP/3 yükseltme gecikmesi ortadan kalkar.
  * **Encrypted Client Hello (ECH):** TLS el sıkışmasındaki en büyük gizlilik açığı olan açık metin SNI (hangi siteye bağlanıldığı bilgisi) artık ECH ile şifrelenir. ECH'in genel anahtarı DNS'teki HTTPS kaydıyla dağıtılır.
  * **Apex Domain Çözümü:** Apex domainde (`example.com`) CNAME alternatifi takma adlandırma (aliasing) desteği sunar.
* **Örnek:**

  ```dns
  example.com.    3600    IN    HTTPS    1 . (
                                alpn="h3,h2"
                                ipv4hint=93.184.216.34
                                ipv6hint=2606:2800:220:1:248:1893:25c8:1946
                                ech="AEn+DQBFBwAgACAB..."
                                )
  ```

#### 1.2. URI Kaydı (Uniform Resource Identifier)

* **Tip ID:** `256` | **RFC:** [RFC 7553](https://www.rfc-editor.org/rfc/rfc7553)
* **Teknik İşlevi:** Bir hostname'i doğrudan eksiksiz bir URI/URL adresine (örn. `ftp://`, `https://`) yönlendirmek için kullanılır.
* **Örnek:**

  ```dns
  _ftp._tcp.example.com.    3600    IN    URI    10 1 "ftp://ftp.example.com/files"
  ```

#### 1.3. NAPTR Kaydı (Naming Authority Pointer)

* **Tip ID:** `35` | **RFC:** [RFC 3403](https://www.rfc-editor.org/rfc/rfc3403)
* **Teknik İşlevi:** Düzenli ifadeler (RegEx) kullanarak alan adlarını ve uluslararası telefon numaralarını (E.164 / ENUM standartları) SIP URI'lerine veya web adreslerine dönüştürür. Telekomünikasyon ve IP telefon altyapılarında yaygındır.
* **Örnek:**

  ```dns
  example.com.    3600    IN    NAPTR    100 50 "s" "SIP+D2U" "" _sip._udp.example.com.
  ```

#### 1.4. DNAME Kaydı (Delegation Name Record)

* **Tip ID:** `39` | **RFC:** [RFC 6672](https://www.rfc-editor.org/rfc/rfc6672)
* **Teknik İşlevi:** CNAME yalnızca tek bir ana bilgisayar adını (FQDN) başka bir isme yönlendirirken, DNAME bir alan adını ve **altındaki tüm alt alan adları ağacını (subdomains)** topluca başka bir hedef domaine yönlendirir.
* **Pratik Kullanım Senaryosu (Domain Takma Adı):** Örneğin `example.com` sahibi bir şirket, marka koruması veya alan adı değişikliği için `website.net` alan adını satın aldığında; `website.net` köküne `example.com` hedefli bir DNAME kaydı eklerse, `blog.website.net`, `api.website.net` ve ileride açılabilecek tüm alt alan adları otomatik olarak `blog.example.com` ve `api.example.com` hedeflerine yönlendirilir.

---

### 2. DNSSEC (DNS Güvenlik Eklentileri) Kayıtları

DNSSEC, DNS yanıtlarına hiyerarşik dijital imzalar ekleyerek DNS önbellek zehirleme (Cache Poisoning / DNS Spoofing) saldırılarını engeller ve kök sunucudan son kullanıcıya kadar kırılmaz bir güven zinciri kurar.

> **Modern Kriptografi: ECDSA ve Algoritma 13 (Cloudflare Standardı):** Geleneksel DNSSEC dağıtımlarında kullanılan RSA anahtarları (1024-2048 bit), DNS paket boyutlarını 1500 baytın üzerine çıkararak UDP parçalanmasına (IP fragmentation) ve devasa DNS Amplification (DDoS) saldırılarına yol açıyordu. Modern DNS altyapılarında (başta Cloudflare Universal DNSSEC olmak üzere) standart haline gelen **ECDSA (Algoritma 13: ECDSAP256SHA256 - RFC 6605)**; 2048-bit RSA ile aynı (veya daha üstün) güvenlik seviyesini yalnızca 64 baytlık küçük anahtarlarla sunar. Bu sayede DNSSEC yanıtları standart 512 bayt UDP paket sınırlarında kalarak hem web sitelerinin açılış hızını korur hem de DDoS vektörlerini etkisiz kılar.

#### 2.1. DNSKEY Kaydı

* **Tip ID:** `48` | **RFC:** [RFC 4034](https://www.rfc-editor.org/rfc/rfc4034)
* **Teknik İşlevi:** Bölgedeki DNSSEC imzalarını doğrulamak için kullanılan genel anahtarları barındırır. İki anahtardan oluşur:
  * **ZSK (Zone Signing Key):** Bölgedeki kayıtları imzalar; performansı korumak için sık aralıklarla yenilenir.
  * **KSK (Key Signing Key):** ZSK'yı imzalar ve üst bölgeye (TLD) tanıtılan anahtardır.

#### 2.2. DS Kaydı (Delegation Signer)

* **Tip ID:** `43` | **RFC:** [RFC 4034](https://www.rfc-editor.org/rfc/rfc4034)
* **Teknik İşlevi:** Alt bölgenin KSK anahtarının kriptografik özetidir (SHA-256 hash). Alan adı kayıt firmanız (Registrar) aracılığıyla üst bölgeye (örneğin `.com` kayıt defterine) teslim edilir. Güven zincirinin kopmamasını sağlar.

#### 2.3. RRSIG Kaydı (Resource Record Signature)

* **Tip ID:** `46` | **RFC:** [RFC 4034](https://www.rfc-editor.org/rfc/rfc4034)
* **Teknik İşlevi:** Bölgedeki kayıt setlerinin (RRset) dijital imzasıdır. Başlangıç ve bitiş geçerlilik tarihlerini taşır; süresi dolduğunda imza geçersiz kalır.

#### 2.4. NSEC ve NSEC3 / NSEC3PARAM Kayıtları

* **Tip ID:** `47` (NSEC), `50` (NSEC3), `51` (NSEC3PARAM) | **RFC:** [RFC 4034](https://www.rfc-editor.org/rfc/rfc4034), [RFC 5155](https://www.rfc-editor.org/rfc/rfc5155)
* **Teknik İşlevi:** Bir alan adının **mevcut olmadığını** (NXDOMAIN) kriptografik olarak kanıtlar (Authenticated Denial of Existence).
* **Zone Walking Koruması:** Eski NSEC kayıtları bir sonraki mevcut ismi açık metin olarak söylediği için saldırganlar tüm bölge haritasını çıkartabiliyordu (Zonewalking). **NSEC3**, isimleri salt ve iterasyon ile hash'leyerek bu güvenlik açığını kapatmıştır.

#### 2.5. CDS ve CDNSKEY (Child DS / Child DNSKEY)

* **Tip ID:** `59` (CDS), `60` (CDNSKEY) | **RFC:** [RFC 7344](https://www.rfc-editor.org/rfc/rfc7344)
* **Teknik İşlevi:** KSK anahtar yenilemelerinde (Key Rollover) üst bölgedeki DS kaydının manuel müdahale olmadan otomatik güncellenmesini sağlayan otomasyon kayıtlarıdır.

#### 2.6. CSYNC (Child-to-Parent Synchronization)

* **Tip ID:** `62` | **RFC:** [RFC 7477](https://www.rfc-editor.org/rfc/rfc7477)
* **Teknik İşlevi:** Alt bölgede yapılan NS ve IP değişikliklerinin otomatik olarak üst kayıt operatörüne senkronize edilmesini sağlar.

---

### 3. Kriptografik ve Kimlik Doğrulama Kayıtları

#### 3.1. TLSA Kaydı (DANE Protokolü)

* **Tip ID:** `52` | **RFC:** [RFC 6698](https://www.rfc-editor.org/rfc/rfc6698)
* **Teknik İşlevi:** DANE (DNS-based Authentication of Named Entities) standardı ile sunucunun TLS sertifikasını doğrudan DNSSEC korumalı DNS üzerinden doğrular. Sertifika Otoritelerine olan bağımlılığı azaltır.
* **Örnek:**

  ```dns
  _443._tcp.www.example.com. 3600 IN TLSA 3 1 1 70A3D2CD...
  ```

#### 3.2. SSHFP Kaydı (SSH Host Key Fingerprint)

* **Tip ID:** `44` | **RFC:** [RFC 4255](https://www.rfc-editor.org/rfc/rfc4255), [RFC 6594](https://www.rfc-editor.org/rfc/rfc6594)
* **Teknik İşlevi:** SSH sunucularının açık anahtar parmak izlerini (SHA-256 / Ed25519) DNSSEC korumalı DNS üzerinde depolar. İstemciler sunucuya ilk kez bağlanırken Ortadaki Adam (MitM) saldırısına uğramadan parmak izini DNS'ten otomatik onaylar.

#### 3.3. OPENPGPKEY ve SMIMEA Kayıtları

* **Tip ID:** `61` (OPENPGPKEY - RFC 7929), `53` (SMIMEA - RFC 8162)
* **Teknik İşlevi:** E-posta adresleri için uçtan uca şifreleme anahtarlarını (OpenPGP ve S/MIME sertifikaları) üçüncü taraf anahtar sunucularına gerek kalmadan doğrudan alan adının DNS'inde yayınlar.

#### 3.4. CERT ve IPSECKEY Kayıtları

* **Tip ID:** `37` (CERT - RFC 4398), `45` (IPSECKEY - RFC 4025)
* **Teknik İşlevi:** PKIX, PGP sertifikalarını (CERT) ve IPsec VPN tünelleri kurmak için gereken ortak anahtarları (IPSECKEY) doğrudan DNS üzerinde depolar.

#### 3.5. KX Kaydı (Key Exchanger Record)

* **Tip ID:** `36` | **RFC:** [RFC 2230](https://www.rfc-editor.org/rfc/rfc2230)
* **Teknik İşlevi:** Kriptografik sistemlerde (DNSSEC harici) ilgili alan adı için anahtar yönetim ajanını (key management agent) belirler. MX kaydına benzer bir öncelik yapısıyla çalışır.

#### 3.6. KEY ve SIG Kayıtları (Tarihçe ve Özel Kullanım)

* **Tip ID:** `25` (KEY - RFC 2535), `24` (SIG - RFC 2535)
* **Teknik İşlevi:** Orijinal DNSSEC spesifikasyonunda anahtar ve imza tutmak için tanımlanmıştı. RFC 3755 ile DNSSEC tarafında yerlerini `DNSKEY` ve `RRSIG` aldı; IPsec için ise yerini `IPSECKEY` aldı. Günümüzde yalnızca `SIG(0)` (RFC 2931) işlem kimlik doğrulaması ve `TKEY` (RFC 2930) için sınırlı olarak kullanılır.

#### 3.7. TA Kaydı (DNSSEC Trust Authorities)

* **Tip ID:** `32768` | **Spesifikasyon:** Weiler Spec / IANA
* **Teknik İşlevi:** Kök DNS bölgesi dijital olarak imzalanmadan önce, imzasız kök altında DNSSEC dağıtımı sağlamak amacıyla önerilen harici güven çıpası (Trust Anchor) kaydıdır. DS kaydıyla aynı formatı kullanır.

---

### 4. Ağ, Donanım ve Altyapı Kayıtları

#### 4.1. HINFO (Host Information) ve RFC 8482 ANY Mitigasyonu

* **Tip ID:** `13` | **RFC:** [RFC 1035](https://www.rfc-editor.org/rfc/rfc1035), [RFC 8482](https://www.rfc-editor.org/rfc/rfc8482)
* **Orijinal Kullanım:** Sunucunun CPU ve işletim sistemi tipini ilan etmek için tasarlanmıştı (örn. `"PC-Intel"` `"Linux"`).
* **Modern Kullanım (RFC 8482):** DNS Amplification (DDoS) saldırılarına karşı `ANY` sorgularına artık tüm kayıtlar dönülmez; bunun yerine Cloudflare ve modern DNS sağlayıcıları saldırıları boşa düşürmek için statik bir HINFO kaydı yanıtı (`"RFC8482" ""`) döner.

#### 4.2. LOC Kaydı (Location Record)

* **Tip ID:** `29` | **RFC:** [RFC 1876](https://www.rfc-editor.org/rfc/rfc1876)
* **Teknik İşlevi:** Sunucunun fiziki coğrafi koordinatlarını (enlem, boylam, rakım ve hassasiyet çapı) tanımlar.
* **Örnek:**

  ```dns
  example.com. 3600 IN LOC 41 0 49 N 28 57 18 E 100m 10m 100m 10m
  ```

#### 4.3. DHCID (DHCP Identifier)

* **Tip ID:** `49` | **RFC:** [RFC 4701](https://www.rfc-editor.org/rfc/rfc4701)
* **Teknik İşlevi:** Dinamik DNS (DDNS) güncellemelerinde DHCP istemcilerinin isim çakışmasını önleyen benzersiz parmak izidir.

#### 4.4. APL (Address Prefix List)

* **Tip ID:** `42` | **RFC:** [RFC 3123](https://www.rfc-editor.org/rfc/rfc3123)
* **Teknik İşlevi:** Bir alan adına izinli veya engelli CIDR IP blokları listesi (örn. `1:192.0.2.0/24 !1:198.51.100.0/24`) ekler.

#### 4.5. HIP (Host Identity Protocol)

* **Tip ID:** `55` | **RFC:** [RFC 8005](https://www.rfc-editor.org/rfc/rfc8005)
* **Teknik İşlevi:** IP adresinin "kimlik" ve "konum" rollerini ayırarak mobil cihazlar ağ değiştirdiğinde dahi TCP bağlantılarının kopmamasını sağlar.

#### 4.6. EUI48 ve EUI64 Kayıtları

* **Tip ID:** `108` (EUI48), `109` (EUI64) | **RFC:** [RFC 7043](https://www.rfc-editor.org/rfc/rfc7043)
* **Teknik İşlevi:** Ağ kartlarının 48-bit ve 64-bit IEEE MAC adreslerini DNS üzerinde saklar.

#### 4.7. ZONEMD (Message Digests for DNS Zones)

* **Tip ID:** `63` | **RFC:** [RFC 8976](https://www.rfc-editor.org/rfc/rfc8976)
* **Teknik İşlevi:** Tüm DNS bölge dosyasının diskte veya transfer edilirken bütünlüğünü doğrulamak için SHA-384 / SHA-512 kriptografik özetini taşır.

#### 4.8. AFSDB Kaydı

* **Tip ID:** `18` | **RFC:** [RFC 1183](https://www.rfc-editor.org/rfc/rfc1183)
* **Teknik İşlevi:** Andrew File System (AFS) dağıtık dosya sistemi hücre veritabanı sunucularının yerini belirtir.

#### 4.9. RP Kaydı (Responsible Person)

* **Tip ID:** `17` | **RFC:** [RFC 1183](https://www.rfc-editor.org/rfc/rfc1183)
* **Teknik İşlevi:** Alan adından teknik olarak sorumlu kişinin e-posta adresini ve detaylı bilgi içeren TXT kaydının referansını taşır.

---

### 5. Protokol Operasyonları ve Sözde Kayıtlar (Pseudo-RRs)

Bu kayıtlar fiziksel olarak bölge dosyasında tek bir satır veri olmaktan ziyade, DNS protokolünün işleyişi ve yönetim operasyonları için kullanılır:

* **ANY (\* - Tip ID: 255 - RFC 1035):** Bir domain hakkındaki tüm kayıtları aynı anda çekmek için tasarlanmış genel sorgu tipidir. Ancak DDoS yükseltme (amplification) saldırılarında kötüye kullanılması nedeniyle modern sunucularda (RFC 8482 ile) minimal yanıt verecek şekilde kısıtlanmıştır.
* **AXFR (Tip ID: 252 - RFC 1035):** Tam Bölge Transferi (Authoritative Zone Transfer). Birincil sunucudan ikincil sunuculara bölge dosyasının tamamını aktarır. Dış dünyaya açık olması ciddi bir bilgi sızıntısı (reconnaissance) açığıdır.
* **IXFR (Tip ID: 251 - RFC 1996):** Artımlı Bölge Transferi (Incremental Zone Transfer). Sadece değişen kayıtları aktararak bant genişliği tasarrufu sağlar.
* **OPT (Tip ID: 41 - RFC 6891):** EDNS0 (Extended DNS) sözde kaydıdır. Standart 512 bayt UDP paket sınırını 4096 bayta çıkarır, DNSSEC bayraklarını ve istemci subnet bilgilerini (ECS) taşır.
* **TSIG ve TKEY (Tip ID: 250 / 249):** Bölge transferlerini (AXFR) ve dinamik güncellemeleri simetrik gizli anahtar (HMAC) ile şifreler ve kimlik doğrulaması sağlar.

---

### 6. Kullanımdan Kaldırılmış, Tarihi ve Deneysel (Obsolete / Historic / Experimental) Kayıt Tipleri

DNS'in 40 yılı aşkın evriminde; internetin erken dönemlerinde kullanılan veya yerini daha güvenli/modern alternatiflere bırakan tüm tarihi kayıtlar:

| Eski Kayıt | Tip ID | Tanımlayan RFC | Yerine Geçen / Durum | Açıklama |
| :--- | :--- | :--- | :--- | :--- |
| **MD / MF** | 3 / 4 | RFC 883 | **MX** (RFC 973) | İlk posta hedefi (MD) ve ileticisi (MF) kayıtlarıydı; MX ile birleştirildi. |
| **MAILA / MAILB** | 254 / 253 | RFC 883 | **MX** | Posta listeleri ve posta kutuları sorgu tipleriydi. |
| **MB, MG, MR, MINFO** | 7, 8, 9, 14 | RFC 883 | Terk Edildi (RFC 2505) | SMTP VRFY ve EXPN komutlarının yerine düşünülmüştü; spam ve güvenlik gerekçesiyle terk edildi. |
| **WKS** | 11 | RFC 883, 1035 | **SRV** / Port Taraması | Sunucunun desteklediği ağ servislerini listeliyordu; RFC 1123 ile güvenilmez ilan edildi. |
| **A6** | 38 | RFC 2874 | **AAAA** (RFC 3596) | Parçalı IPv6 adresi denemesiydi; gereksiz karmaşık bulundu ve RFC 6563 ile tarihi statüye alındı. |
| **NXT** | 30 | RFC 2065 | **NSEC** (RFC 3755) | DNSSEC'in ilk yokluk kanıtı kaydıydı; güncellenen DNSSEC standartlarıyla NSEC'e devredildi. |
| **SPF (Type 99)** | 99 | RFC 4408 | **TXT** (RFC 7208) | Özel SPF kayıt tipi yaygınlaşamadı; RFC 7208 ile TXT kaydı zorunlu kılındı. |
| **NULL** | 10 | RFC 883 | Terk Edildi (RFC 1035) | Tamamlama sorguları için test amaçlı boş kayıt; RFC 1035 ile kaldırıldı. |
| **DLV** | 32769 | RFC 4431 | Terk Edildi | DNS kök bölgesi dijital imzalanmadan önce harici güven çıpasıydı (Lookaside Validation). |
| **X25** | 19 | RFC 1183 | Terk Edildi | X.25 paket anahtarlamalı ağ adreslerini saklamak için tasarlanmıştı. |
| **ISDN** | 20 | RFC 1183 | Terk Edildi | ISDN telefon numaraları ve alt adreslerini DNS'e eşlemek için kullanılıyordu. |
| **RT** | 21 | RFC 1183 | Terk Edildi | Route Through (X.25 ve ISDN gibi ağlarda ara yönlendirme adresi belirleme). |
| **NSAP / NSAP-PTR** | 22 / 23 | RFC 1706 | Terk Edildi | OSI Network Service Access Point (NSAP) adresleme eşlemesi. |
| **PX** | 26 | RFC 2163 | Terk Edildi | X.400 ve RFC 822 e-posta adresleme modelleri arasında köprü kurma kaydı. |
| **GPOS** | 27 | RFC 1712 | **LOC** (RFC 1876) | Erken dönem coğrafi konum belirleme kaydı; yerini çok daha gelişmiş LOC kaydına bıraktı. |
| **EID / NIMLOC** | 31 / 32 | Internet Draft | Terk Edildi | Nimrod ağ mimarisi için tasarlanmış uç nokta kimliği ve konumlayıcı taslakları. |
| **NB / NBSTAT** | 32 / 33 | RFC 1002 | Terk Edildi / Düzeltildi | NetBIOS için ayrılmıştı; RFC 1002'deki çakışma hatası sonrası numaralar NIMLOC ve SRV'ye devredildi. |
| **ATMA** | 34 | ATM Forum | Terk Edildi | ATM (Asynchronous Transfer Mode) ağları için isim çözümleme kaydı. |
| **SINK** | 40 | Internet Draft | Terk Edildi | Kitchen Sink deneysel DNS taslağı; standartlaşmadı. |
| **NINFO / RKEY / TALINK** | 56, 57, 58 | Internet Draft | Süresi Doldu | Bölge durumu (NINFO), NAPTR şifreleme (RKEY) ve güven çıpası geçmişi (TALINK) taslakları. |
| **UINFO / UID / GID / UNSPEC** | 100-103 | IANA Reserved | BIND 90'lar | 1990'ların başında Unix kullanıcı ve grup kimliklerini DNS'te tutma denemeleri; BIND'den kaldırıldı. |
| **ILNP (NID / L32 / L64 / LP)** | 104-107 | RFC 6742 | Deneysel | Identifier-Locator Network Protocol (ILNP) deneysel adresleme kayıtları. |
| **DOA** | 259 | Internet Draft | Süresi Doldu | DOA over DNS mimarisi taslağı. |

---

## Sistem Yöneticileri İçin Güvenlik ve Yapılandırma En İyi Uygulamaları (Best Practices)

1. **DNSSEC Güvenlik Zincirini Kurun ve ECDSA Kullanın:** Alan adınızda DNSSEC'i aktif edin ve registrar'ınıza DS kaydını girin. Paket boyutunu ve DDoS amplifikasyon riskini minimize etmek için RSA yerine modern **ECDSA (Algoritma 13 - ECDSAP256SHA256)** anahtarlarını tercih edin.
2. **E-Posta Güvenlik Üçlüsünü (SPF, DKIM, DMARC) Mutlaka Tamamlayın:**
   * SPF kaydınızda 10 DNS lookup sınırını aşmayın.
   * DKIM için en az 2048-bit anahtar kullanın.
   * DMARC politikanızı kademeli olarak `p=none` -> `p=quarantine` -> `p=reject` seviyesine getirin.
3. **E-Posta Göndermeyen ve Park Edilmiş Alan Adlarını Savunmasız Bırakmayın (Cloudflare Savunma Modeli):**
   * Şirketlerin marka koruması veya yazım hataları (typosquatting) için aldığı pasif alan adları, saldırganların e-posta sahteciliği (spoofing) için en çok istismar ettiği hedeflerdir.
   * E-posta trafiği olmayan alan adları için şu 3 savunma kaydını mutlaka uygulayın:
     * **Null MX (RFC 7505):** `@ IN MX 0 .` (Domainin e-posta kabul etmediğini ve göndermediğini küresel olarak deklare eder).
     * **Kısıtlayıcı SPF:** `@ IN TXT "v=spf1 -all"` ve `* IN TXT "v=spf1 -all"` (Hem kök hem de tüm alt alan adlarından mail çıkışını yasaklar).
     * **Sert DMARC:** `_dmarc IN TXT "v=DMARC1; p=reject; sp=reject; rua=mailto:security-reports@primarydomain.com"` (Yetkisiz her sahtecilik girişimini reddeder ve güvenlik ekibine raporlar).
4. **CAA Kaydı Ekleyin:** Sadece hizmet aldığınız SSL sağlayıcısına yetki vererek adınıza yetkisiz sertifika üretilmesini önleyin (alt alan adlarının bu kaydı otomatik miras aldığını unutmayın).
5. **Zone Apex Yönlendirmelerinde CNAME Flattening Kullanın:** Kök domainlerde CNAME kullanılamayacağı için DNS sağlayıcınızın ALIAS/ANAME veya modern HTTPS (Type 65) desteğinden faydalanın.
6. **Bölge Transferini (AXFR) Sıkılaştırın:** Yetkisiz kişilerin tüm DNS veritabanınızı indirmesini önlemek için AXFR'ı yalnızca güvenilir ikincil IP'lere ve TSIG anahtarına açın.
7. **RFC 8482 Uyumluluğu:** DNS amplifikasyon saldırılarına alet olmamak için sunucunuzda ANY sorgularını HINFO veya boş yanıtla kısıtlayın.

---

## Pratik DNS Teşhis, Sorgulama ve Test Araçları (Diagnostic Tools)

DNS kayıtlarının yayılımını (propagation), sözdizimi doğruluğunu ve güvenlik standartlarını test etmek için sektörde en çok kullanılan profesyonel araçlar:

* **DNS Çözümleme ve Yayılım (Propagation) Araçları:**
  * **[NsLookup.io](https://www.nslookup.io/):** A, AAAA, MX, CNAME, TXT, SOA ve DNSSEC kayıtlarını tek ekranda detaylı analiz eder; IP'den web sitesine ve ters DNS (rDNS) sorgulamalarını destekler.
  * **[DNSChecker.org](https://dnschecker.org/):** Dünya genelindeki 30+ farklı coğrafi DNS sunucusundan kayıt yayılım hızını canlı harita üzerinde gösterir.
  * **Terminal (`dig` / `nslookup`):** Ağ mühendislerinin vazgeçilmez komut satırı araçları (`dig example.com +trace`, `dig example.com TXT +short`).
* **E-Posta Güvenliği ve Doğrulama Araçları:**
  * **[EasyDMARC](https://easydmarc.com/tools/):** SPF, DKIM, DMARC ve BIMI kayıt denetleyicileri; SPF ve DMARC kayıt oluşturma sihirbazları (generator).
  * **[MXToolbox SuperTool](https://mxtoolbox.com/):** E-posta sunucu sağlık raporu, MX öncelik kontrolleri ve global IP kara liste (DNSBL) taramaları.
  * **[Mail-Tester](https://www.mail-tester.com/):** Gönderdiğiniz test e-postasına 10 üzerinden spam puanı verir; SPF, DKIM ve DMARC başlıklarını adli olarak inceler.
* **DNSSEC ve Bölge Güvenliği Denetleyicileri:**
  * **[DNSViz](https://dnsviz.net/):** Kök sunucudan alan adınıza kadar olan DNSSEC güven zincirini (Root -> TLD -> Domain -> RRSIG) görsel ağaç şeması halinde çizer.
  * **[Verisign DNSSEC Debugger](https://dnssec-debugger.verisignlabs.com/):** DS ve DNSKEY kayıtlarındaki kriptografik imza eşleşmelerini adım adım test eder.

---

## Kaynaklar ve İleri Okuma

1. [Wikipedia - List of DNS Record Types](https://en.wikipedia.org/wiki/List_of_DNS_record_types)
2. [Cloudflare Learning - What Are DNS Records?](https://www.cloudflare.com/learning/dns/dns-records)
3. [NSlookup.io - DNS Record Types Explained](https://www.nslookup.io/learning/dns-record-types)
4. [IANA DNS Parameters - Resmi Kayıt Tipi Listesi](https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml)
5. [RFC 1035 - Domain Names: Implementation and Specification](https://www.rfc-editor.org/rfc/rfc1035)
6. [RFC 4034 - Resource Records for the DNS Security Extensions (DNSSEC)](https://www.rfc-editor.org/rfc/rfc4034)
7. [RFC 9460 - Service Binding and Parameter Specification via the DNS (HTTPS & SVCB RRs)](https://www.rfc-editor.org/rfc/rfc9460)
8. [RFC 8482 - Providing Minimal-Sized Responses to DNS Queries with QTYPE=ANY](https://www.rfc-editor.org/rfc/rfc8482)

---

**Best Regards. – Saygılarımla.**
