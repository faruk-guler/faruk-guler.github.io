---
layout: post
title: "Searchsploit Nedir? Nasıl Kullanılır? (Kapsamlı ve Güncel Rehber)"
date: 2023-04-20 21:10
author: theguler
comments: true
categories: [Hacking - Security]
tags: [Searchsploit, Exploit-DB, Kali Linux, Penetrasyon Testi, Exploit, Zafiyet Analizi, Siber Güvenlik]
---

<img src="https://farukguler.com/assets/post_images/exploit-db-kopya.jpg?w=1024" alt="Searchsploit ve Exploit-DB" width="400" style="border-radius:8px; display:block; margin-right: auto;" />

Siber güvenlik testlerinde (özellikle sızma testleri ve Red Team operasyonlarında) bilgi toplama (*Reconnaissance*) ve servis/versiyon tarama (*Enumeration*) adımlarından sonra gelen en kritik aşama, tespit edilen açıklara yönelik istismar araçlarının (**exploit**) araştırılmasıdır.

Bu aşamada güvenlik uzmanlarının en çok başvurduğu araçlardan biri **Searchsploit**'tir. Bu rehberde Searchsploit'in ne olduğunu, arkasındaki çalışma mantığını, en güncel kullanım parametrelerini, Nmap ile otomatikleştirilmiş tarama süreçlerini ve güvenli kullanım pratiklerini ele alacağız.

---

## 1. Searchsploit Nedir?

**Searchsploit**, Offensive Security (OffSec) tarafından sürdürülen dünyanın en büyük açık istismar arşivi [Exploit-DB](https://www.exploit-db.com/)'nin resmi **komut satırı arama aracıdır**.

> 💡 **Önemli Bilgi:** Searchsploit, Metasploit Framework'ün bir parçası **değildir**. Exploit-DB'nin yerel bir kopyası (`exploitdb` paketi) üzerinde çalışan bağımsız bir arama ve yönetim aracıdır.

### Temel Avantajları:
1. **Tamamen Çevrimdışı (Offline) Çalışma:** İnternet erişiminin olmadığı veya güvenlik gereği izole edilmiş kapalı ağ testlerinde (Air-gapped / Internal Pentest) arama yapmanıza olanak tanır.
2. **Yüksek Hız ve Filtreleme:** Web arayüzü ile zaman kaybetmeden doğrudan terminal üzerinden gelişmiş mantıksal filtrelerle hedef odaklı sonuçlar döndürür.
3. **Nmap XML Entegrasyonu:** Nmap servis tarama çıktılarını doğrudan ayrıştırarak (parse ederek) bulunan versiyonlara uygun exploitleri otomatik listeler.
4. **Kolay Dosya Yönetimi:** Bulunan exploit kaynak kodlarını veya PoC (Proof of Concept) scriptlerini anında mevcut çalışma dizinine kopyalama ve inceleme imkânı sunar.

---

## 2. Kurulum ve Güncelleme

Searchsploit; **Kali Linux**, **Parrot Security OS** ve **BlackArch** gibi penetrasyon testi dağıtımlarında önyüklü olarak gelir.

### 2.1. Kurulum (Debian / Ubuntu / Kali)
Sisteminizde yüklü değilse:
```bash
sudo apt update
sudo apt install exploitdb -y
```

### 2.2. Manuel Kurulum (Git Üzerinden)
```bash
sudo git clone https://gitlab.com/exploit-database/exploitdb.git /opt/exploitdb
sudo ln -sf /opt/exploitdb/searchsploit /usr/local/bin/searchsploit
```

### 2.3. Veritabanını Güncel Tutma
Exploit-DB deposuna her gün yeni zafiyetler ve PoC kodları eklenmektedir. Yerel veritabanınızı güncellemek için:

```bash
# Searchsploit dahili güncelleme komutu:
searchsploit -u

# Paket yöneticisi üzerinden güncelleme:
sudo apt update && sudo apt install --only-upgrade exploitdb
```

---

## 3. Temel Arama Mantığı

Searchsploit arama yaparken girilen anahtar kelimeleri varsayılan olarak **AND (VE)** mantığıyla eşleştirir. Yani girilen tüm ifadelerin sonuç içinde yer alması beklenir.

### 3.1. Örnek Arama Komutları
```bash
# Windows 10 için mevcut exploitler:
searchsploit windows 10

# Belirli bir servis ve versiyon:
searchsploit apache 2.4.49

# Yetki yükseltme (Privilege Escalation) odaklı Linux kernel araması:
searchsploit linux kernel 5.4 privilege escalation

# WordPress eklenti zafiyeti araması:
searchsploit wordpress wp-file-manager
```

---

## 4. Gelişmiş Parametreler ve Fonksiyonlar

Searchsploit, hedef zafiyeti hızlıca bulup analiz etmeniz için geniş bir parametre yelpazesi sunar:

| Parametre | Açıklama |
| :--- | :--- |
| `-t`, `--title` | Yalnızca başlık (Title) kısmında geçen kelimelere göre arama yapar (sonuç kalabalığını engeller). |
| `-e`, `--exact` | Kesin ve birebir eşleşme arar. |
| `-x`, `--examine` | Exploit kaynak kodunu doğrudan terminalde (pager ile) açıp incelemenizi sağlar. |
| `-m`, `--mirror` | EDB-ID numarası verilen exploiti mevcut çalışma dizininize kopyalar. |
| `-p`, `--path` | Exploit dosyasının yerel diskteki tam yolunu ve meta bilgilerini gösterir. |
| `-w`, `--www` | Exploit-DB üzerindeki orijinal web linkini (URL) listeler. |
| `-j`, `--json` | Çıktıyı JSON formatında verir (Otomasyon ve Python scriptleri için idealdir). |
| `--cve` | Belirli bir CVE (Common Vulnerabilities and Exposures) numarasına göre arama yapar. |
| `--exclude` | Belirtilen kelimeyi veya kategoriyi içeren sonuçları filtre dışı bırakır. |
| `--nmap` | Nmap tarafından üretilen XML tarama dosyasını okuyarak otomatik exploit eşleştirmesi yapar. |

---

### 4.1. Başlıkta Arama Yapma (`-t`)
Açıklamalarda geçen gereksiz eşleşmeleri eleyerek doğrudan yazılım adına odaklanır:
```bash
searchsploit -t apache 2.4
```

### 4.2. Exploit Kodunu Terminalde İnceleme (`-x`)
Bulduğunuz bir exploit'in (örneğin EDB-ID `50383`) kaynak kodunu, yazar notlarını ve kullanım şeklini terminalden çıkmadan okuyabilirsiniz:
```bash
searchsploit -x 50383
```

### 4.3. Exploiti Çalışma Alanına Kopyalama (`-m`)
İlgili exploit dosyasını düzenlemek veya çalıştırmak üzere mevcut klasörünüze kopyalamak için:
```bash
searchsploit -m 50383
```
*Bu işlem sonucunda `50383.py`, `50383.c` veya ilgili script dosya formatında geçerli dizine indirilir.*

### 4.4. CVE Numarası ile Arama (`--cve`)
Hedef sistemde tespit edilen CVE kodu üzerinden doğrudan arama yapabilirsiniz:
```bash
searchsploit --cve 2021-44228
```

### 4.5. Sonuçları Filtreleme / Hariç Tutma (`--exclude`)
Örneğin DoS (Denial of Service) sonuçlarını hariç tutup yalnızca RCE / Yetki Yükseltme odaklı sonuçları görmek için:
```bash
searchsploit apache 2.4 --exclude="Denial of Service"
```

---

## 5. Nmap ile Otomatik Zafiyet Eşleştirme (`--nmap`)

Sızma testlerinde zaman kazanmanın en etkili yollarından biri, Nmap servis taramasını Searchsploit ile birleştirmektir.

```mermaid
flowchart LR
    A[Nmap Servis Taraması] -->|'-oX target.xml'| B[target.xml]
    B -->|'searchsploit --nmap target.xml'| C[Exploit-DB Eşleşmeleri]
    C -->|'-m / -x'| D[PoC Analizi ve Test]
```

### Adım Adım Uygulama:

1. **Nmap ile detaylı servis ve versiyon taraması yapın ve çıktıyı XML olarak kaydedin:**
   ```bash
   nmap -sV -sC -Pn 192.168.1.100 -oX target_scan.xml
   ```

2. **Oluşan XML dosyasını Searchsploit'e verin:**
   ```bash
   searchsploit --nmap target_scan.xml
   ```
   *Searchsploit, Nmap çıktısındaki tüm açık portları, servis adlarını ve versiyonları okuyarak yerel veritabanında otomatik arama yapar ve uygun exploitleri listeler.*

---

## 6. Güvenlik ve Etik İlkeler (Önemli Uyarılar)

1. **PoC Kodlarını Asla İncelemeden Çalıştırmayın:**
   Exploit-DB ve benzeri platformlardan indirilen kodları çalıştırmadan önce `-x` parametresi ile mutlaka kaynak kodunu okuyun. İçerisinde zararlı shellcode, ters bağlantı (backdoor) veya yerel sisteminize zarar verebilecek komutlar bulunabilir.

2. **Hedef ve Port Ayarları:**
   Birçok exploit kodu statik IP/Port değişkenleri içerir. Kodu çalıştırmadan önce `LHOST`, `LPORT`, `RHOST` ve `RPORT` gibi parametreleri kendi test ortamınıza göre düzenleyin.

3. **Derleme İhtiyacı:**
   C/C++ dilinde yazılmış exploitler doğrudan çalıştırılamaz. Derleme gerektirir:
   ```bash
   gcc 12345.c -o exploit
   ```

4. **Yasal Çerçeve:**
   Bu araç ve içerisindeki istismar kodları yalnızca izinli sızma testlerinde, laboratuvar ortamlarında (CTF, HackTheBox, TryHackMe vb.) ve yasal sınırlar dahilinde kullanılmalıdır.

---

## 7. Hızlı Başvuru Kartı (Cheat Sheet)

```bash
# 1. Veritabanını güncelle
searchsploit -u

# 2. Başlıkta filtreli arama yap
searchsploit -t openssh 7.2

# 3. CVE ile ara
searchsploit --cve 2021-41773

# 4. Exploit kodunu oku/incele
searchsploit -x <EDB-ID>

# 5. Exploiti geçerli klasöre kopyala
searchsploit -m <EDB-ID>

# 6. Web linklerini gör
searchsploit -w log4j

# 7. Nmap çıktısını tara
searchsploit --nmap scan.xml
```

---

*Detaylı teknik dokümantasyon ve güncel veritabanı için [Exploit-DB Resmi Kılavuzu](https://www.exploit-db.com/searchsploit) adresini inceleyebilirsiniz.*
