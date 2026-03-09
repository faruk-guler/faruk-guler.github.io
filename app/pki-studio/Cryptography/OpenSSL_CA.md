# 🏛️ OpenSSL ile CA (Certificate Authority) Rehberi

> OpenSSL, açık kaynaklı bir kriptografi kütüphanesi ve araç setidir.  
> Kendi kendinize bir kök CA (Root CA) veya ara CA (Intermediate CA) oluşturmanıza olanak tanır.  
> Test ortamları, iç ağlar (intranet), geliştirme amaçlı TLS/SSL sertifikaları veya  
> kendi altyapınızda güvenilen özel sertifikalar oluşturmak için kullanılır.

---

## 📌 Neden CA Yöntemi?

| | Self-Signed | Basit CA | Kurumsal CA |
|---|---|---|---|
| Tarayıcıya ne eklenir | Her sertifika ayrı | Sadece CA bir kez | Sadece CA bir kez |
| Sertifika takibi | Yok | Yok | `index.txt` ile tam kayıt |
| CRL desteği | Yok | Yok | Var |
| Key güvenliği | Şifresiz | Şifresiz | AES256 şifreli |
| Kullanım | Test | Küçük ortam | Kurumsal/Production |

---

## 🚀 BÖLÜM 1 — Basit CA (Hızlı Kurulum)

> Küçük ortamlar ve test için idealdir.

### 1. CA Private Key ve Sertifikası Oluştur
```bash
openssl genrsa -out myCA.key 4096

openssl req -x509 -new -nodes \
  -key myCA.key \
  -sha256 \
  -days 3650 \
  -out myCA.crt \
  -subj "/C=TR/ST=Istanbul/L=Istanbul/O=Guler/OU=IT/CN=Guler Root CA"
# OpenSSL 3.x'te -nodes yerine -noenc de kullanabilirsiniz.
```

### 2. Sunucu Private Key ve CSR Oluştur

#### Yöntem A — Hızlı (Inline)
```bash
openssl genrsa -out server.key 4096

openssl req -new -key server.key \
  -out server.csr \
  -subj "/C=TR/ST=Istanbul/L=Istanbul/O=Guler/CN=bbb.guler.com"
```

#### Yöntem B — Kurumsal (csr.conf ile)
Birden fazla domain, IP veya e-posta alanı gerekiyorsa bu yöntem tercih edilir.

**1. `csr.conf` dosyasını oluştur:**
```ini
[req]
default_bits       = 4096
prompt             = no
distinguished_name = dn
req_extensions     = req_ext

[dn]
C  = TR
ST = Istanbul
L  = Istanbul
O  = Guler
OU = IT
emailAddress = admin@guler.com
CN = bbb.guler.com

[req_ext]
subjectAltName = @alt_names

[alt_names]
DNS.1 = bbb.guler.com
DNS.2 = *.guler.com
IP.1  = 192.168.1.100
```

**2. Key ve CSR'ı oluştur:**
```bash
openssl genrsa -out server.key 4096
openssl req -new -key server.key -out server.csr -config csr.conf
```
> `O = Guler` alanı CA'daki `O=` ile **birebir eşleşmelidir** (`policy_strict` gereği).

### 3. SAN Konfigürasyon Dosyası Oluştur
```bash
cat > server.ext << EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage=digitalSignature,nonRepudiation,keyEncipherment,dataEncipherment
extendedKeyUsage=serverAuth
subjectAltName=@alt_names

[alt_names]
DNS.1=bbb.guler.com
DNS.2=*.guler.com
EOF
```
> `alt_names` bölümüne ihtiyacın olan tüm domain ve IP adreslerini ekleyebilirsin:
> ```
> DNS.3=mail.guler.com
> IP.1=192.168.1.100
> ```

### 4. CA ile Sertifikayı İmzala
```bash
openssl x509 -req \
  -in server.csr \
  -CA myCA.crt \
  -CAkey myCA.key \
  -CAcreateserial \
  -out server.crt \
  -days 3650 \
  -sha256 \
  -extfile server.ext
```

### 5. Doğrula
```bash
openssl verify -CAfile myCA.crt server.crt
```
> Çıktı `server.crt: OK` olmalı.

---

## 🏢 BÖLÜM 2 — Kurumsal CA (Production)

> Tam dizin yapısı, sertifika veritabanı ve CRL desteği ile production ortamlar için idealdir.

### 1. Dizin Yapısını Oluştur
```bash
mkdir -p myCA/{certs,crl,newcerts,private}
chmod 700 myCA/private
touch myCA/index.txt
echo "unique_subject = no" > myCA/index.txt.attr
echo 1000 > myCA/serial
```

### 2. OpenSSL Yapılandırma Dosyası Oluştur
```bash
cat > myCA/openssl.cnf << 'EOF'
[ ca ]
default_ca = CA_default

[ CA_default ]
dir             = ./myCA
certs           = $dir/certs
crl_dir         = $dir/crl
new_certs_dir   = $dir/newcerts
database        = $dir/index.txt
serial          = $dir/serial
RANDFILE        = $dir/private/.rand
private_key     = $dir/private/ca.key.pem
certificate     = $dir/certs/ca.cert.pem
default_days    = 375
default_crl_days= 30
default_md      = sha256
preserve        = no
email_in_dn     = no
nameopt         = default_ca
certopt         = default_ca
policy          = policy_strict

[ policy_strict ]
countryName             = match
stateOrProvinceName     = match
organizationName        = match
organizationalUnitName  = optional
commonName              = supplied
emailAddress            = optional

[ req ]
default_bits        = 4096
distinguished_name  = req_distinguished_name
string_mask         = utf8only
default_md          = sha256
x509_extensions     = v3_ca

[ req_distinguished_name ]
countryName                     = Ülke Kodu (örn. TR)
stateOrProvinceName             = İl (örn. Istanbul)
localityName                    = İlçe (örn. Kadikoy)
organizationName                = Kurum Adı (örn. MyCompany)
organizationalUnitName          = Birim (örn. IT)
commonName                      = CA Adı (örn. MyRootCA)

[ v3_ca ]
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid:always,issuer
basicConstraints = critical, CA:true
keyUsage = critical, digitalSignature, cRLSign, keyCertSign
EOF
```

### 3. CA Private Key Oluştur (AES256 Şifreli)
```bash
openssl genrsa -aes256 -out myCA/private/ca.key.pem 4096
chmod 400 myCA/private/ca.key.pem
```
> Bu key'i güvenli sakla — tüm sertifikaların güveni buna dayanır.

### 4. Root CA Sertifikası Oluştur (20 Yıl)
```bash
openssl req -config myCA/openssl.cnf \
  -key myCA/private/ca.key.pem \
  -new -x509 -days 7300 -sha256 \
  -extensions v3_ca \
  -out myCA/certs/ca.cert.pem \
  -subj "/C=TR/ST=Istanbul/L=Istanbul/O=Guler/OU=IT/CN=Guler Enterprise CA"
```

### 5. CA Sertifikasını Doğrula
```bash
openssl x509 -in myCA/certs/ca.cert.pem -text -noout | grep -E "Subject|Issuer|Not After"
```

> ✅ **Artık CA Hazır!** Bu CA ile artık diğer sertifikaları (sunucu, istemci vb.) imzalayabilirsiniz.

---

## 🐧 BÖLÜM 3 — Linux'a CA Ekle

> ⚠️ **Önemli Not:** Aşağıdaki komutlar **Basit CA** (`myCA.crt`) içindir. **Kurumsal CA** kullanıyorsanız işlem yapılacak dosya `myCA/certs/ca.cert.pem` olmalıdır. Özellikle Ubuntu/Debian sistemlerinde `update-ca-certificates` komutunun çalışması için kopyalanan dosyanın uzantısının **mutlaka** `.crt` olması gerektiğini unutmayın (örnek: `sudo cp myCA/certs/ca.cert.pem /usr/local/share/ca-certificates/myCA.crt`).

### Ubuntu / Debian
```bash
sudo cp myCA.crt /usr/local/share/ca-certificates/myCA.crt
sudo update-ca-certificates
```

### CentOS / RHEL / Fedora
```bash
sudo cp myCA.crt /etc/pki/ca-trust/source/anchors/myCA.crt
sudo update-ca-trust
```

### Doğrula
```bash
openssl verify -CAfile /etc/ssl/certs/ca-certificates.crt server.crt
```

---

## 🪟 BÖLÜM 4 — Windows'a CA Ekle

> ⚠️ **Kurumsal CA** kullanıyorsanız aşağıdaki adımlarda `myCA.crt` yerine `myCA/certs/ca.cert.pem` dosyasını kullanın.

### Yöntem 1 — Grafik Arayüz (Kolay)
1. `myCA.crt` dosyasına **çift tıkla**
2. **Sertifikayı Yükle** → **Yerel Makine** → İleri
3. **Tüm sertifikaları aşağıdaki depoya yerleştir** → Gözat
4. **Güvenilen Kök Sertifika Yetkilileri** → Tamam → Son

### Yöntem 2 — PowerShell (Otomatik)
```powershell
Import-Certificate -FilePath "myCA.crt" -CertStoreLocation Cert:\LocalMachine\Root
```

### Yöntem 3 — CMD (certutil)
```cmd
certutil -addstore -enterprise -f "Root" myCA.crt
```
> `-enterprise` anahtarı, sertifikanın tüm bilgisayar için geçerli olmasını sağlar (Local Machine). Mavi onay ekranı açabilir.

### Doğrula (PowerShell)
```powershell
Get-ChildItem Cert:\LocalMachine\Root | Where-Object { $_.Subject -like "*Guler*" }
```

---

## 🦊 BÖLÜM 5 — Firefox'a CA Ekle

> Firefox kendi sertifika deposunu kullanır, Windows deposunu kullanmaz!
> ⚠️ **Kurumsal CA** kullanıyorsanız 4. adımda `myCA.crt` yerine `myCA/certs/ca.cert.pem` dosyasını seçeceksiniz.

1. Firefox → **Ayarlar** → **Gizlilik & Güvenlik**
2. Sayfanın altında **Sertifikalar** → **Sertifikaları Görüntüle**
3. **Yetkililer** sekmesi → **İçe Aktar**
4. `myCA.crt` dosyasını seç
5. **Bu CA'ya web sitelerini tanımlamak için güven** → Tamam

---

## 📦 BÖLÜM 6 — Extras

### Yeni Sunucu İçin Hızlı Sertifika (CA Hazırsa)

> ⚠️ **Basit CA** kullanıyorsanız (BÖLÜM 1):
```bash
openssl genrsa -out yeniserver.key 4096
openssl req -new -key yeniserver.key -out yeniserver.csr \
  -subj "/C=TR/ST=Istanbul/L=Istanbul/O=Guler/CN=yeni.guler.com"
openssl x509 -req -in yeniserver.csr \
  -CA myCA.crt -CAkey myCA.key \
  -CAcreateserial -out yeniserver.crt -days 3650 -sha256 -extfile server.ext
```

> ⚠️ **Kurumsal CA** kullanıyorsanız (BÖLÜM 2), `openssl ca` komutu kullanılır (veritabanına kaydeder):
```bash
openssl genrsa -out yeniserver.key 4096
openssl req -new -key yeniserver.key -out yeniserver.csr \
  -subj "/C=TR/ST=Istanbul/L=Istanbul/O=Guler/CN=yeni.guler.com"
openssl ca -config myCA/openssl.cnf \
  -in yeniserver.csr \
  -out yeniserver.crt \
  -days 375 -notext -md sha256 \
  -extfile server.ext
```
> **Not:** `-extensions` flag'i kullanılmaz. `server.ext` içindeki uzantılar kök düzeyde tanımlıdır; ayrı bir bölüm adı belirtmek gerekmiyor.

### Sertifika Geçerlilik Tarihini Kontrol Et
```bash
openssl x509 -in server.crt -noout -dates
```

### Uzak Sunucunun Sertifikasını Kontrol Et
Bağlantının asılı kalmasını (hang) önlemek için `echo` kullanılır:
```bash
echo | openssl s_client -connect bbb.guler.com:443 -servername bbb.guler.com 2>/dev/null \
  | openssl x509 -noout -dates
```

### Sertifikayı PFX Formatına Çevir (Windows/IIS)
```bash
openssl pkcs12 -export -out server.pfx -inkey server.key -in server.crt -certfile myCA.crt
```

### Diffie-Hellman Parametresi Oluştur (Nginx için)
```bash
openssl dhparam -out dhp-4096.pem 4096
```
> Nginx/WebRTC için Kusursuz İletim Gizliliği (Perfect Forward Secrecy) sağlar.

---

## 📁 Dosya Yapısı

### Basit CA
```
/etc/nginx/ssl/
├── myCA.key          # CA private key (GİZLİ!)
├── myCA.crt          # CA sertifikası (Windows/Linux'a eklenecek)
├── myCA.srl          # CA seri numarası
├── server.key        # Sunucu private key
├── server.csr        # Sunucu CSR
├── server.crt        # Sunucu sertifikası
├── server.ext        # SAN konfigürasyonu
├── csr.conf          # CSR yapılandırma dosyası (Yöntem B)
└── dhp-4096.pem      # Diffie-Hellman parametresi
```

### Kurumsal CA
```
myCA/
├── openssl.cnf           # CA konfigürasyonu
├── index.txt             # Sertifika veritabanı
├── index.txt.attr        # unique_subject ayarı
├── serial                # Seri numarası
├── certs/
│   └── ca.cert.pem       # CA sertifikası
├── crl/                  # İptal listesi
├── newcerts/             # İmzalanan sertifikalar
└── private/
    └── ca.key.pem        # CA private key (GİZLİ!)
```

---

## ⚠️ Önemli Notlar

- CA private key'ini **asla paylaşma** — ele geçirilirse tüm sertifikalar tehlikeye girer
- CA sertifikasını tüm istemci makinelere **bir kez** eklemen yeterli
- **Basit CA** ile yeni sunucu eklerken sadece **Bölüm 1 Adım 2-4**'ü tekrar yap
- **Kurumsal CA** ile yeni sunucu eklerken **Bölüm 6**'daki `openssl ca` bloğunu kullan
- `server.ext` dosyasını her sunucu için özelleştir
- Kurumsal CA'da key **AES256 şifreli** — her işlemde şifre sorulur

---

## 📚 Kaynaklar
- https://jamielinux.com/docs/openssl-certificate-authority/index.html
- https://www.digicert.com/kb/csr-creation.htm
- https://ssl-config.mozilla.org
