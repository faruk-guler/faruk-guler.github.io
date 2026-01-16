---
layout: post
title: Linux Firewall’ı detaylı inceliyorum
date: 2026-01-12 21:47
by: faruk-guler
comments: true
categories: [Linux / Unix]
---
## Firewall Nedir?
![Linux Firewall Logosu](https://farukguler.com/assets/post_images/linux-firewall-guide.png) 
Firewall (güvenlik duvarı), bir bilgisayar ağına veya sistemine gelen/çıkan ağ trafiğini önceden tanımlanmış kurallara göre denetleyen bir güvenlik mekanizmasıdır. 

Amacı:

- Yetkisiz erişimleri engellemek,
- Saldırıları sınırlamak,
- İç kaynakları korumak,
- Ağ trafiğini denetlemek ve loglamaktır.
Linux’ta firewall mekanizması çekirdek (kernel) seviyesinde çalışan Netfilter altyapısıdır. Yani kullanıcı alanı (user space) değil, işletim sisteminin en temel katmanında çalışır.

## 1. 🏗️ Mimari: Donanım (Network) vs Yazılım (Host) Firewall

Güvenlikte altın kural **"Derinlemesine Savunma" (Defense in Depth)** ilkesidir. Tek bir koruma katmanına güvenmek modern mimaride intihardır. Güvenlik, **Ağ** ve **Sunucu** seviyesinde iki aşamalı olmalıdır.

## A. 🏢 Donanım Firewall:

*(Örn: Fortinet, Palo Alto, Cisco)*

Donanımsal firewall, sunuculara yüklenen bir program değil, **kablo takılan fiziksel, ayrı bir cihazdır (Appliance)**. İnternet hattı önce bu cihaza girer, trafik burada süzüldükten sonra sunuculara dağılır.


- **⚡ Neden Özel Bir Cihaz? (ASIC Teknolojisi):**
    Normal bilgisayarların işlemcisi (CPU) her işi yapar ama yavaştır. Bu cihazların içinde sadece paket süzmek için üretilmiş **Özel Çipler (ASIC)** bulunur. Bu sayede saniyede milyarlarca veriyi (Gigabit/Terabit) hiç takılmadan işleyebilir.

- **✅ İlk Savunma Hattı:** DDoS saldırılarını ve kaba trafiği sunuculara ulaşmadan durdurur.
- **✅ Geniş Görüş Açısı:** Tüm binanın (Veri Merkezi) trafiğini görür, IPS/IDS ile imza tabanlı saldırıları durdurur.
- **❌ İçeriye Kör:** Bir saldırgan kapıdan girdikten sonra (veya içeriden biri) daireler arası gezerken (**Lateral Movement**) donanım firewall bunu göremez.

## B. 🐧 (Host) Firewall:

*(Örn: Netfilter, Iptables, Nftables)*

- ✅ **Sıfır Güven (Zero Trust):** Yan komşunuz (aynı ağdaki diğer sunucu) zarar görse bile sizi izole edecektir.
- ✅ **Uygulama Farkındalığı:** İşletim sistemiyle konuşur. Hangi kullanıcının (root vs apache) hangi process ile ağa çıktığını bilir.
- ✅ **Konteyner Uyumu:** Docker/Kubernetes gibi dinamik ortamların ağ trafiğini yönetebilir.


## 2. 🟢 Default Policy **Whitelist (Her şeyi yasakla!)**
(İzin Verilen Liste) - Temel Firewall mantığı budur ama bu aşağıdaki alan sadece `iptables` komutlarına odaklıdır.

```bash
# Varsayılan olarak her şeyi yasakla IPv4
iptables -P INPUT DROP
iptables -P FORWARD DROP
# iptables -P OUTPUT DROP  # veya ACCEPT (önerilmez)
```
```bash
# Varsayılan olarak her şeyi yasakla IPv6
ip6tables -P INPUT DROP
ip6tables -P FORWARD DROP
# ip6tables -P OUTPUT DROP # veya ACCEPT (önerilmez)
```
- **Güvenli:** Sadece açıkça izin verilenler geçer
- **Önerilen:** Üretim sunucuları için

> ⚠️
> Default policy'yi DROP yapmadan önce kritik kuralları (ssh etc.) eklemeyi unutmayın, yoksa sunucuya erişimi kaybedersiniz.!
> Sıralama önemlidir: Kurallar yukarıdan aşağıya işlenir, ilk eşleşen kural kazanır

## 3. 🚦 Trafikte yönünü bul (IN / OUT / FORWARD)
Linux firewall’da IN/OUT gibi soyut bir yön kavramı yoktur.
Bir paketin hangi yönde olduğu, **yazıldığı zincir (INPUT, OUTPUT, FORWARD) ile belirlenir**.

- **INPUT (COMING):** ← gelen trafik
- **OUTPUT (GOING):** → giden trafik 
- **FORWARD:** ↑ Bu makineye gelen ama bu makinede sonlanmayan başka bir hedefe yönlendirilen trafiktir.

> ⚠️
> Bir kuralın hangi trafiği kontrol ettiğini belirleyen en temel unsur yazıldığı (INPUT, OUTPUT, FORWARD) Zincir'dir. Zincir, paketin yönünü tanımlar

### Netfilter, Iptables ve Ötesi

Linux'ta güvenlik duvarı (firewall), aslında bir "yazılım" değil, Linux çekirdeğinin (Kernel) ağ yığınına gömülü bir çerçevedir (framework). Bu çerçevenin adı Netfilter'dır. Kullandığımız `iptables`, `nftables`, `ufw` veya `firewalld` gibi araçlar, sadece bu çekirdek modülüyle konuşmamızı sağlayan arayüzlerdir.

---

## 4. Temel Mimari: Netfilter ve Packet Flow (Paket Akışı)

Bir Linux sunucusuna bir ağ paketi geldiğinde, rastgele hareket etmez. Belirli kontrol noktalarından (Hooks) geçer. Bu akışı anlamak, sorunu çözmenin %90'ıdır.

### Netfilter Hook  “Kanca” Noktaları (Paketin Yolculuğu)

Bir paket ağ kartından (eth0) içeri girdiğinde şu sırayı izler: 
a. **PREROUTING (Ön Yönlendirme):** Paket sisteme girer girmez buraya uğrar. Henüz yönlendirme kararı (routing decision) verilmemiştir.
    * *Kullanım:* Genelde DNAT (Port yönlendirme) burada yapılır. "Bu paket bana mı geldi, başkasına mı gidecek?" sorusu henüz sorulmamıştır.

b. **Routing Decision (Yönlendirme Kararı):** Çekirdek paketin hedef IP'sine bakar.
    * Hedef *bu sunucu* ise -> Adım 3'e (INPUT) gider.
    * Hedef *başka bir yer* ise (Router gibi davranıyorsa) -> Adım 4'e (FORWARD) gider.

c. **INPUT (Giriş):** Paket doğrudan bu sunucudaki bir sürece (örn: Nginx, SSH) geliyorsa buraya girer.
    * *Kullanım:* Sunucuyu koruyan ana kurallar buraya yazılır (Port 80'i aç, 22'yi kısıtla vb.).

d. **FORWARD (İletme):** Paket bu sunucuya gelmedi, bu sunucu üzerinden başka bir yere (örn: VPN arkasındaki bir makineye veya Docker konteynerine) gidiyor.
    * *Kullanım:* Router, Gateway veya Docker köprüleri için filtreleme burada yapılır.

e. **OUTPUT (Çıkış):** Bu sunucunun kendisi (local process) bir paket oluşturup dışarı göndermek istiyorsa (örn: `curl google.com`), paket buradan başlar.

f. **POSTROUTING (Son Yönlendirme):** Paket (ister içeriden, ister dışarıdan gelsin) sunucuyu terk etmeden önceki son çıkış kapısıdır.
    * *Kullanım:* Genelde SNAT veya Masquerading (İnternet paylaşımı) burada yapılır.

## 5. Stateful Inspection -(conntrack) (Durum Denetimi) Nedir?

Eski firewall'lar "Stateless" (Durumsuz) idi. Yani giden paketi bilirdi ama dönen cevabın o pakete ait olduğunu bilmezdi. Linux Netfilter Stateful'dur. Yani bağlantıları takip eder (Conntrack).

Bir kural yazarken şu 4 durumu bilmen şarttır: 

* **NEW:** Yeni bir bağlantı başlatma isteği (Örn: SYN paketi).

* **ESTABLISHED:** Daha önce izin verilmiş bir bağlantının devamı olan paketler.
    * *Önemli:* Çok önemlidir! Eğer buna izin vermezsen, sunucu Google'a ping atar ama cevabı alamaz çünkü cevap NEW değil, ESTABLISHED olmazsa DROP edilir.

* **RELATED:** Mevcut bir bağlantıyla ilişkili yeni bir bağlantı (Örn: FTP data kanalı veya ICMP hata mesajları).

* **INVALID:** Hiçbir duruma uymayan, bozuk paketler. Genelde doğrudan Drop edilir.
> Conntrack (Connection Tracking): Stateful özelliği sağlar. "conntrack -L" bağlantıları görebilirsiniz.

> Conntrack yüksek trafikte bellek tüketebilir → nf_conntrack_max ayarı yapılmalıdır.
```bash
sysctl -w net.netfilter.nf_conntrack_max=524288
sysctl -w net.netfilter.nf_conntrack_tcp_timeout_established=600   # saniye
```

## 6. ➦ NAT Nedir?

NAT, paketlerin üzerindeki "Gönderen" (Source) veya "Alıcı" (Destination) IP adreslerini değiştirme sanatıdır. Linux'ta bu işlem nat tablosunda yapılır.

### A. SNAT (Source NAT - Kaynak Adres Çevirisi)

Paketin **gönderen (source)** IP adresini değiştirmek için kullanılır.

* **Amaç:** İç ağdaki (LAN) bilgisayarların, internete çıkarken sahip oldukları yerel IP (örn: 192.168.1.5) yerine, sunucunun/router'ın **Sabit (Static) Dış IP** adresiyle görünmesini sağlamak.
* **Zincir (Chain):** `POSTROUTING` (Paket tam çıkış yaparken değiştirilir).
* **Kullanım Yeri:** Sunucunun dış IP adresi **sabitse** (Static IP) kullanılır.

**Örnek Senaryo:**
İç ağdaki (10.0.0.0/24) tüm makineler internete çıkarken, dış dünyada `203.0.113.5` olarak görünsün.

```bash
iptables -t nat -A POSTROUTING -s 10.0.0.0/24 -o eth0 -j SNAT --to-source 203.0.113.5
```

---

### B. MASQUERADE (Maskeleme)

SNAT'ın özel ve dinamik bir türüdür.

* **Amaç:** Yine iç ağdaki makinelerin internete çıkmasını sağlar. Ancak hedef IP belirtmek yerine, "O an çıkış arabirimi (interface) hangi IP'ye sahipse onu kullan" der.
* **Zincir (Chain):** `POSTROUTING`
* **Kullanım Yeri:** Sunucunun dış IP adresi **değişkense** (DHCP, ADSL, 4G, Bulut instance'ları) kullanılır.
* **Farkı:** SNAT'tan biraz daha yavaştır çünkü her pakette "Acaba şu an IP adresim ne?" diye kontrol eder. Ancak IP değiştiğinde yeni bağlantılar otomatik olarak yeni IP ile çıkar.

**Örnek Senaryo:**
İç ağdaki cihazlar `eth0` üzerinden internete çıksın, `eth0`'ın IP'si ne olursa olsun (IP adresini bilmemize gerek yok).

```bash
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
```

---

### C. DNAT (Destination NAT - Hedef Adres Çevirisi)

Paketin **hedef (destination)** IP adresini (ve genellikle portunu) değiştirmek için kullanılır. Bilinen adıyla **Port Forwarding** (Port Yönlendirme).

* **Amaç:** Dış dünyadan (İnternet) gelen bir isteği, güvenlik duvarının arkasındaki (LAN) başka bir sunucuya veya servise yönlendirmek.
* **Zincir (Chain):** `PREROUTING` (Paket sisteme girer girmez, yönlendirme kararı verilmeden önce değiştirilir).
* **Önemli Not:** DNAT tek başına yetmez, genellikle `FORWARD` zincirinde de izin verilmesi gerekir.

**Örnek Senaryo:**
Sunucunun dış IP'sine (`203.0.113.5`) gelen **8080** portu isteklerini, iç ağdaki **192.168.1.50** IP'li sunucunun **80** portuna yönlendir.

```bash
# 1. Kural: Hedefi değiştir (DNAT)
iptables -t nat -A PREROUTING -p tcp --dport 8080 -j DNAT --to-destination 192.168.1.50:80

# 2. Kural: Trafiğin geçmesine izin ver (FORWARD zinciri kuralı)
iptables -A FORWARD -p tcp -d 192.168.1.50 --dport 80 -j ACCEPT
```
### D. REDIRECT (Yerel Yönlendirme)

Gelen paketleri aynı makinedeki farklı bir porta yönlendirir.

- **Zincir:** `PREROUTING` veya `OUTPUT`
- **Kullanım:** Transparent proxy (Squid, Tor), yerel port yönlendirme

**Örnek Senaryo:**
80 portuna gelen trafiği yerel 3128 (proxy) portuna yönlendir.

```bash
# 80 portuna gelen trafiği 3128 (proxy) portuna yönlendir
iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3128
```

---

## 7. 🚧 Tablolar ve Öncelik Sırası (Tables Priority)

Netfilter sadece zincirlerden ibaret değildir; zincirler **tablolar** (tables) içinde organize edilir. Her tablo belirli bir amaç için kullanılır ve paketler **hook** noktalarında (PREROUTING, INPUT, FORWARD, OUTPUT, POSTROUTING) belirli bir **sırayla** tabloları dolaşır.

1. **raw**  
   - En yüksek öncelikli tablo (hook priority ~ -300).  
   - Conntrack (bağlantı takibi) **öncesinde** çalışır.  
   - Kullanım: Paketleri conntrack'tan muaf tutmak (NOTRACK), rate limiting, saldırı önleme veya izlenmeyecek paketler için.

2. **mangle**  
   - Paket başlıklarını değiştirmek için (TTL, TOS, MARK, DSCP vb.).  
   - Tüm hook'larda mevcut (PREROUTING, INPUT, FORWARD, OUTPUT, POSTROUTING).

3. **nat**  
   - Adres ve port çevirisi (DNAT, SNAT, MASQUERADE, REDIRECT).  
   - Sadece ilk pakette (NEW state) çalışır; conntrack sonrası paketler otomatik uygulanır.  
   - PREROUTING (DNAT), POSTROUTING (SNAT/MASQUERADE), OUTPUT (yerel NAT).

4. **filter**  
   - Varsayılan tablo – paket filtreleme (ACCEPT, DROP, REJECT, LOG).  
   - Genellikle INPUT, FORWARD, OUTPUT zincirlerinde kullanılır.

5. **security** (ekstra, SELinux için)  
   - secmark ayarlamak için (Mandatory Access Control).  
   - INPUT ve OUTPUT'ta filter sonrası çalışır.
  
> Sıralama: Bir paket geldiğinde işlem sırası şöyledir: RAW → MANGLE → NAT (PREROUTING) → ROUTING → FILTER (INPUT)

## 8. ⟳  Loopback (lo) Arayüzü (Localhost)
Loopback (lo arayüzü), sunucunun kendi kendine konuşmasıdır (127.0.0.1). Sistem içindeki process’lerin (systemd-resolved, cups, docker, veritabanları, web uygulamaları vb.) kendi aralarında iletişim kurmasını sağlar. Fiziksel ağ donanımına bağlı değildir; tüm trafiği çekirdek içinde döner. Kapatılırsa Sistem servisleri birbirine ulaşamaz, hatalar oluşur, sistem kilitlenebilir.

> ⚠️
> Loopback her zaman açık olmalı, Loopback kuralları her zaman firewall kurallarının EN BAŞINDA olmalıdır!

### Loopback Önerilen Temel Sıralama ve Kural:
```bash
# 1. İZİN VER: Sunucunun kendi kendine (lo üzerinden) konuşmasını serbest bırak.
# Loopback gelen trafiğine izin ver
iptables -A INPUT -i lo -j ACCEPT

# Loopback giden trafiğe izin ver
iptables -A OUTPUT -o lo -j ACCEPT

# 2. ENGELLE (Anti-Spoofing): 'lo' arayüzü DIŞINDAN gelip 127.0.0.0/8 taklidi yapanları yakala ve at.
# Gelen trafiği kontrol et
iptables -A INPUT ! -i lo -s 127.0.0.0/8 -j DROP

# Giden trafiği de kontrol et (kaynak olarak localhost kullanılamaz)
iptables -A OUTPUT ! -o lo -s 127.0.0.0/8 -j DROP
```
```bash
# IPv6 Loopback izni
ip6tables -A INPUT -i lo -j ACCEPT
ip6tables -A OUTPUT -o lo -j ACCEPT
```
## 9. 🐳 Docker ve Firewall (Bypass Riski)

Docker, ağ trafiğini yönetmek için iptables kurallarını manipüle eder. Trafiği `PREROUTING` aşamasında yakalayıp doğrudan `FORWARD` zincirine yönlendirir.

**⚠️ Kritik Sorun:** Docker, arka planda çalışan root yetkili servisi (dockerd) nedeniyle ağ kurallarına agresif müdahale eder ve trafiği `PREROUTING` aşamasında yakalayarak FORWARD zincirine atar.

Sonuç: `INPUT` zincirine yazdığınız kurallar ezilir. Güvenlik duvarında kapattığınızı sandığınız bir porta, Docker üzerinden erişilebilir.

### ✅ Çözüm: `DOCKER-USER` Zinciri

Docker trafiğini filtrelemek için kurallarınızı `INPUT` değil, **`DOCKER-USER`** zincirine yazmalısınız. Bu zincir, Docker kurallarından **önce** işlenir.

```bash
# ÖRNEK: Tüm Docker konteynerlerine dışarıdan erişimi kapat, sadece yerel ağa (192.168.1.0/24) izin ver.
iptables -I DOCKER-USER -i eth0 ! -s 192.168.1.0/24 -j DROP
```

> ⚠️
> `Bypass` sorunu mimari gereği genellikle sadece Docker Daemon (rootful) için geçerlidir. Podman, Containerd vb. varsayılan olarak `INPUT` kurallarına daha sadıktır.

## 10. 💾 Kalıcılık (Persistence) - Kuralları Tutun

Linux çekirdeğinde (**Kernel**) güvenlik duvarı kuralları **RAM (Geçici Bellek)** üzerinde çalışır. Bu, performansı maksimize eder ancak büyük bir risk taşır: **Sunucu yeniden başlatıldığında (reboot) veya elektrik kesildiğinde tüm kurallar silinir!**

Emeklerinizin boşa gitmemesi ve sunucunun yeniden başladığında korumasız kalmaması için kuralları diske kaydetmeniz şarttır.

Linux dünyasında kullandığınız araca göre kalıcılık davranışı değişir:

| Araç | Kalıcılık | Durum |
| :--- | :---: | :--- |
| **Iptables** | ❌ **HAYIR** | Kurallar her değişiklikten sonra manuel kaydedilmelidir. Genellikle `iptables-save > /etc/iptables/rules.v4` komutu veya `iptables-persistent` paketi kullanılır. |
| **Nftables** | ✅ **EVET** | Modern sistemlerde `nftables` servisi (/etc/nftables.conf) otomatik yükler. Dosyayı doğru yere koyarsanız kalıcıdır. |
| **UFW** | ✅ **EVET** | Kural eklediğiniz anda sistem arka planda kuralları diske yazar. Reboot sonrası hatırlar. |
| **Firewalld** | ⚠️ **KISMEN** | Kural eklerken `--permanent` parametresini kullanmazsanız kurallar geçicidir (Runtime). Kalıcı olması için parametre şarttır ve sonrasında `firewall-cmd --reload` gerekir. |

## 11. 👻 Görünmez Tehlike: IPv6 (Arka Kapı)

Günümüzde modern Linux dağıtımları (Debian 13, Alma 10, Ubuntu 22.04+ vb.) varsayılan olarak **Dual Stack** (Çift Yığın) mimarisiyle gelir. Yani sistemde hem IPv4 hem de IPv6 aktiftir.

### ⚠️ Risk Nedir?

**`iptables` komutları sadece IPv4 trafiğini etkiler.**

Siz `iptables -P INPUT DROP` komutuyla ön kapıyı (IPv4) kilitleseniz bile, eğer sunucunun bir IPv6 adresi varsa (ki çoğu sunucuda otomatik atanır), arka kapı (IPv6) sonuna kadar açıktır. Saldırganlar IPv6 üzerinden SSH veya Web servisinize erişebilir.

---

### 🛡️ Nasıl Önlem Alınır?

Güvenliği tam sağlamak için aynı ciddiyeti IPv6 için de göstermelisiniz. İki yolunuz var:

#### 1. Yöntem: IPv6 Kullanmıyorsanız (En Kesin Çözüm)

Kullanmadığınız bir kapıyı kilitlemekle uğraşmayın, direkt duvar örün (protokolü kapatın).

`/etc/sysctl.d/99-disable-ipv6.conf` dosyası oluşturup şu satırları ekleyin:

```bash
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
# net.ipv6.conf.lo.disable_ipv6 = 1
```
#### 2. Yöntem:  ip6tables komutunu kullanın.

IPv6 trafiğini de aynı titizlikle yapılandırmak için `ip6tables` komutunu kullanın. Kurallar iptables ile aynı syntax'a sahiptir.

## 12. 🌐 Çoklu Ağ Kartları (Multi-NIC)

Eğer sunucunuzda birden fazla ağ kartı varsa (Örn: `eth0` WAN, `eth1` LAN), Linux bir **Router** gibi davranabilir. Bu durumda trafiği yönetmek için **Hangi karttan girip, hangi karttan çıktığına** bakmalısınız.

### A. Yönlendirmeyi Açmak (IP Forwarding)

Linux varsayılan olarak paketleri bir karttan diğerine geçirmez. Bunu çekirdek seviyesinde açmanız gerekir.

```bash
# Geçici olarak açmak için:
sysctl -w net.ipv4.ip_forward=1

# Kalıcı yapmak için (/etc/sysctl.conf):
net.ipv4.ip_forward = 1
```

### B. Trafik Kontrolü (FORWARD Zinciri)

Çoklu kartlarda `INPUT` (Sunucunun kendisine gelen) değil, **`FORWARD`** (Sunucu üzerinden geçen) zinciri kritiktir. Kuralları yazarken **Giriş (-i)** ve **Çıkış (-o)** arayüzlerini belirtmelisiniz.

**Örnek Senaryo:**

* **eth0 (WAN/İnternet):** Güvensiz bölge.
* **eth1 (LAN/İç Ağ):** Güvenli bölge.

```bash
# 1. LAN'dan İnternet'e çıkışa İZİN VER
# İçeriden (eth1) gelip, Dışarı (eth0) giden tüm paketleri geçir.
iptables -A FORWARD -i eth1 -o eth0 -j ACCEPT

# 2. İnternet'ten LAN'a girişi ENGELLE
# Dışarıdan gelip içeriye girmek isteyeni engelle.
# ANCAK: İçeriden başlatılan bağlantıların cevaplarına izin ver (Stateful)
iptables -A FORWARD -i eth0 -o eth1 -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# Kural dışı kalan her şeyi DROP et
iptables -A FORWARD -i eth0 -o eth1 -j DROP
```

> ⚠️
> **Router Modu:** Sunucunun tam bir router gibi çalışması için genellikle **NAT (Masquerade)** işleminin de yapılması gerekir (Bkz: Bölüm 3-B).

> ⚠️
> **rp_filter (Anti-Spoofing):** Çoklu kartlarda "IP Spoofing" riskini önlemek için `rp_filter` (Reverse Path Filter) ayarının açık olduğundan emin olun.

---
## 13. 💡 Bağlam Dışına Çık! Cockpit GUI ile Firewald üzerinde (Zone)

Firewalld, klasik **iptables zincirlerinden** farklı olarak **Zone (Bölge)** tabanlı bir güvenlik modeli kullanır.  
Bu model, ağ arayüzlerini (`eth0`, `eth1`, `wlan0` vb.) **güvendiğiniz veya güvenmediğiniz** bölgelere atamanızı sağlar.

Cockpit web arayüzünde veya terminalde bir kural yazarken aslında şu soruyu sorarsınız:

> **“Bu kural hangi güven seviyesindeki (Zone) bağlantılar için geçerli?”**

### 🌍 Zone (Bölge) Tanımları ve Güven Seviyeleri

Firewalld kurulduğunda varsayılan olarak **`public` zone** aktiftir.  
Ancak sunucunuzun rolüne göre (Router, Web Server, Ev Bilgisayarı) **doğru zone seçimi hayati önem taşır.**

| Zone | Güven Seviyesi | Açıklama |
| :--- | :--- | :--- |
| **drop** | ⚫ **Sıfır Güven** | En paranoyak seviyedir. Gelen tüm paketleri **sessizce DROP** eder. Karşı tarafa hiçbir ICMP cevabı dönmez. Sadece dışarı giden bağlantılara izin verilir. |
| **block** | 🔴 **Düşük** | Gelen bağlantılar reddedilir ancak karşı tarafa **icmp-host-prohibited** mesajı gönderilir. “Buradayım ama sana kapalıyım” der. |

|  |  |  |
| :--- | :--- | :--- |
| **public** | 🟠 **Orta (Varsayılan)** | Halka açık ağlar içindir. Diğer cihazlara güvenilmez. **Sadece açıkça izin verilen portlar** (SSH, HTTP vb.) kabul edilir. |
| **external** | 🌐 **Router / WAN** | Router olarak çalışan sunucuların **WAN bacağı** içindir. **Masquerading (NAT)** varsayılan olarak açıktır. |
| **dmz** | 🏰 **İzole** | *Demilitarized Zone*. Halka açık servisler (Web, Mail) buradadır ancak **iç ağa erişimleri kısıtlıdır**. |
| **work** | 🏢 **Ofis / İş** | Kurumsal ağlar içindir. Ağdaki diğer cihazlara **kısmen güvenilir**. |
| **home** | 🏠 **Ev** | Ev ağları içindir. TV, telefon, PC gibi cihazlara **yüksek güven** vardır. |
| **internal** | 🔒 **İç Ağ** | Tamamen güvenilen **iç ağ bacağıdır**. Dış dünyadan izoledir. |

|  |  |  |
| :--- | :--- | :--- |
| **trusted** | 🟢 **Tam Güven** | Tüm gelen trafik **koşulsuz kabul edilir**. ⚠️ **Çok dikkatli kullanılmalıdır!** |

### 🚀 Cockpit Arayüzü ile Zone Yönetimi

Terminal komutlarıyla (`firewall-cmd`) uğraşmak yerine **Cockpit Web Konsolu** üzerinden bu bölgeleri görsel olarak yönetebilirsiniz:

1.  **Networking (Ağ)** > **Firewall** menüsüne gidin.
2.  **Active Zones** kısmında hangi arayüzün (örn: `eth0`) hangi Zone'a bağlı olduğunu görürsünüz.
3.  **Add Services** butonuna tıkladığınızda, kuralı **hangi Zone için** eklediğinize dikkat edin.

> 💡
> **Hangi Zone'dayım?**
> Terminalden hızlıca aktif bölge ve arayüz eşleşmesini görmek için:
> `firewall-cmd --get-active-zones`

> ⚠️
> **Interface Kuralı:** Bir ağ kartı (interface) aynı anda sadece bir zone'a üye olabilir. Ancak bir Zone, birden fazla interface'i kapsayabilir.


## 14. 🛡️ Saldırı Önleme ve "Hardening" (Sertleştirme)

Sadece portları açıp kapatmak yeterli değildir. Gerçek bir güvenlik duvarı, anormal paketleri ve saldırı girişimlerini de filtrelemelidir. Bu bölümde modern Linux çekirdeğinin standardı olan **Nftables** kullanılacaktır.

### A. Geçersiz Paketleri Temizle (INVALID)

Bağlantı durum tablosunda (conntrack) karşılığı olmayan, bozuk veya yetkisiz paketleri anında (DROP) çöpe atın.

```bash
# 'ct state invalid' yakala ve at
nft add rule inet filter input ct state invalid drop
```

### B. TCP Bayrak Saldırıları (Scan Protection)

Nmap gibi tarayıcıların gönderdiği mantıksız bayrak kombinasyonlarını engelleyin.

```bash
# SYN harici bayraklı NEW paketleri at (Protokol uyumluluğu)
nft add rule inet filter input tcp flags != syn ct state new drop

# XMAS & NULL Packets (Anormal bayrak kombinasyonları)
nft add rule inet filter input tcp flags & (fin|syn|rst|psh|ack|urg) == (fin|syn|rst|psh|ack|urg) drop
nft add rule inet filter input tcp flags & (fin|syn|rst|psh|ack|urg) == 0 drop
```

### C. SYN Flood Koruması (Rate Limiting)

Bir saniyede binlerce bağlantı açmaya çalışan saldırganları sınırlayın.

```bash
# Saniyede 60 limit koy, aşanı reddet (Burst 20 paket toleransı)
nft add rule inet filter input tcp flags syn limit rate 60/second burst 20 packets accept
nft add rule inet filter input tcp flags syn drop
```

### D. Ping Flood (ICMP) Koruması

Ping'i tamamen kapatmak yerine hız sınırı (rate limit) koyun.

```bash
# IPv4 ve IPv6 ping (echo-request) için ortak kural: Saniyede 1 paket
nft add rule inet filter input icmp type echo-request limit rate 1/second accept
nft add rule inet filter input icmpv6 type echo-request limit rate 1/second accept
nft add rule inet filter input icmp type echo-request drop
nft add rule inet filter input icmpv6 type echo-request drop
```

### E. SSH Brute Force Koruması

Dakikada yüzlerce şifre denemesi yapan saldırganları otomatik olarak engelleyin.

```bash
# SSH portuna dakikada 10'dan fazla yeni bağlantı açan IP'yi engelle
# 'meter' özelliği IP bazlı dinamik izleme yapar (Fail2Ban'a gerek kalmaz)
nft add rule inet filter input tcp dport 22 ct state new \
    meter ssh-meter { ip saddr limit rate 10/minute } accept

nft add rule inet filter input tcp dport 22 ct state new drop
```

> 💡
> **Meter Nedir?**: Nftables'ın dinamik IP izleme özelliğidir. Her kaynak IP için ayrı sayaç tutar ve dakikada 10 bağlantıyı geçenleri otomatik bloklar. Fail2Ban gibi harici araca gerek kalmaz.

## 15. 🧾 Loglama: (Gözler ve Kulaklar)
Linux firewall loglama, güvenlik duvarı kurallarının işlediği paketlerin kaydını tutma işlemidir. Amaç, ağ trafiğini izlemek, hatalı kuralları tespit etmek ve güvenlik olaylarını analiz etmektir.

> ⚠️
> Loglama performans etkisi yaratır (özellikle yüksek trafik varsa), bu yüzden genelde sadece kritik paketler (DROP edilenler, NEW bağlantılar, şüpheli IP'ler) için kullanılması önerilir.

```bash
- Ubuntu/Debian: /var/log/syslog - /var/log/kern.log
- RHEL/CentOS: /var/log/messages
- dmesg | grep "SSH"
- conntrack -L | grep SSH
- journalctl -k
```

## 16. 🕷️ Debug ve Troubleshooting
Firewall kuralları bazen beklenmedik şekilde çalışabilir: erişim kaybı, yanlış yönlendirme, performans düşüşü… Bu durumda sistematik bir debug yaklaşımı gerekir.

```bash
tcpdump -i eth0 port 80
conntrack -E
journalctl -kf | grep "TRACE"
nft monitor trace
bpftrace -e 'k:nf_hook_slow{@++;}i:s:1{printf("%d\n",@);clear(@);}'
```

## 17. 🚨 Acil Durum: Fabrika Ayarlarına Dönüş

Firewall kurallarında hata yaptınız ve sunucuya erişimi kaybettiniz mi? Ya da baştan başlamak mı istiyorsunuz? Bu bölüm hayat kurtarıcınızdır.

> ⚠️
> **Kritik Uyarı:** Bu işlemler sunucunuzu geçici olarak tamamen korumasız bırakır. Sadece güvenli bir ortamda (yerel ağ, fiziksel erişim) veya mutlaka gerektiğinde uygulayın!

> ⚠️
Bu işlemler sunucuya erişiminizi kesebilir. Lokal erişim veya KVM konsolu olmadan uzak sunucuda dikkatli kullanın!

```bash
# Servisleri durdur
systemctl stop firewalld
systemctl stop ufw
systemctl stop nftables
```

```bash
# Servisleri Devre Dışı Bırak
systemctl disable firewalld
systemctl disable ufw
systemctl disable nftables
```

```bash
# Mevcut Kuralları Yedekle (Opsiyonel ama Önerilir)
# iptables & ip6tables
iptables-save   > ~/iptables-backup-$(date +%F).txt 2>/dev/null
ip6tables-save  > ~/ip6tables-backup-$(date +%F).txt 2>/dev/null

# nftables
nft list ruleset > ~/nftables-backup-$(date +%F).txt 2>/dev/null
cp /etc/nftables.conf /etc/nftables.conf.bak.$(date +%F)
```

```bash
# Tüm Kuralları Temizle (Flush & Reset)
# iptables
iptables -F
iptables -X
iptables -t nat -F
iptables -t mangle -F
ip6tables -F
ip6tables -X

# nftables
nft flush ruleset

# ufw
ufw reset
```

**Yazar:** [github/faruk-guler](https://github.com/faruk-guler)