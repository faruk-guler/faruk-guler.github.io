# ⚙️ OpenSSL Yapılandırma (Configuration) Rehberi

> OpenSSL, farklı işlemler için kullanılacak ayarları ve varsayılan değerleri bir yapılandırma (configuration) dosyası üzerinden okuyabilir. Bu dosya; sertifika oluşturma, CA politikalarını belirleme ve OpenSSL komutları için varsayılanları ayarlamak amacıyla kullanılır.

---

## 📂 Dosya Konumu
Varsayılan olarak OpenSSL, yapılandırma dosyasını sisteminize göre `/etc/ssl/openssl.cnf` veya `/usr/local/ssl/openssl.cnf` dizininde arar.
Ayrıca, OpenSSL komutlarında `-config` parametresini kullanarak kendi oluşturduğunuz özel bir dosyayı da gösterebilirsiniz.

---

## 🏗️ Yapılandırma Dosyası Mimarisi
Yapılandırma dosyası, köşeli parantez içine yazılmış bölüm adlarıyla ayrılır (örneğin: `[req]`). Aşağıda örnek bir OpenSSL yapılandırması (CSR oluşturma odaklı) yer almaktadır:

```ini
# OpenSSL için varsayılan yapılandırma dosyası.

[ req ]
default_bits       = 2048
default_md         = sha256
default_keyfile    = privkey.pem
distinguished_name = req_distinguished_name
attributes         = req_attributes
x509_extensions    = v3_ca # Self-signed sertifikaya eklenecek uzantılar

[ req_distinguished_name ]
countryName                     = Ülke Kodu (2 harfli)
countryName_default             = TR
stateOrProvinceName             = İl veya Eyalet Adı
stateOrProvinceName_default     = Istanbul
localityName                    = İlçe veya Şehir Adı
localityName_default            = Kadikoy
organizationName                = Kurum veya Şirket Adı
organizationName_default        = Guler Corp
organizationalUnitName          = Organizasyon Birimi (örn: IT, HR)
commonName                      = Ortak Ad (örn: bbb.guler.com)
commonName_max                  = 64

[ req_attributes ]
challengePassword               = Bir challenge (meydan okuma) parolası
challengePassword_min           = 4
challengePassword_max           = 20

[ v3_ca ]
subjectKeyIdentifier            = hash
authorityKeyIdentifier          = keyid:always,issuer:always
basicConstraints                = critical, CA:true
```

---

## 🔑 Önemli Bölümler ve Seçenekleri

### `[req]` Bölümü
Sertifika istekleri (CSR) için varsayılan ayarları belirtir.
*   `default_bits`: Varsayılan anahtar uzunluğu (bit cinsinden, örn: 2048 veya 4096).
*   `default_md`: Varsayılan özet (hash) algoritması (örn: sha256).
*   `default_keyfile`: Private key için kullanılacak varsayılan dosya adı.
*   `distinguished_name`: Kimlik bilgilerinin (DN) tanımlandığı bölümü işaret eder.
*   `attributes`: İstek özniteliklerini içeren bölümü işaret eder.

### `[req_distinguished_name]` Bölümü
Sertifika isteklerindeki "Distinguished Name" (Sahip Kimliği) alanlarını tanımlar.
*   `countryName`: Ülke kodu (C).
*   `stateOrProvinceName`: İl/Eyalet adı (ST).
*   `localityName`: Şehir adı (L).
*   `organizationName`: Kurum adı (O).
*   `organizationalUnitName`: Birim adı (OU).
*   `commonName`: Ortak ad (CN - Örn: Tam nitelikli alan adı / FQDN).

### `[req_attributes]` Bölümü
Sertifika isteği için ek güvenlik veya öznitelik ayarlarını içerir.
*   `challengePassword`: Sertifika isteğini korumak veya geri çekmek için kullanılan isteğe bağlı bir parola.

### `[v3_ca]` Bölümü
Bir Sertifika Yetkilisi (CA) sertifikasına özgü uzantıları belirtir.
*   `subjectKeyIdentifier`: Belirli bir public key içeren sertifikaların tanımlanmasına olanak tanır.
*   `authorityKeyIdentifier`: Bir sertifikayı imzalamak için kullanılan private key'e karşılık gelen public key'i tanımlar.
*   `basicConstraints`: Sertifikanın bir CA'ya ait olup olmadığını (CA:TRUE) ve ne kadar derine inebileceğini belirler.

---

## 🚀 Özel Bir Yapılandırma Dosyası Kullanmak

OpenSSL komutlarıyla birlikte özel bir dosya (örneğin `csr.conf`) kullanmak için komutun sonuna `-config` parametresini eklemeniz yeterlidir:

```bash
openssl req -new -key private.key -out request.csr -config /path/to/openssl.cnf
```
> Otomasyon komutlarında sıkça sorulan "Kurum adı giriniz" gibi soruları atlamak için `[req]` bölümüne `prompt = no` satırını ekleyebilirsiniz.

---

## 📌 Kullanım Senaryoları (Neden İhtiyacımız Var?)

1.  **Sertifika İsteklerini Özelleştirme:** Konsolda manuel olarak tek tek değer girmek yerine tüm ayarlar ve SAN (Subject Alternative Name) gibi eklentiler dosya üzerinden hatasız bir şekilde okunur.
2.  **Otomasyon (Automating Certificate Generation):** Varsayılan değerler tanımlandığından, aynı özelliklere sahip yüzlerce sertifika manuel girdi olmadan sadece komut çalıştırılarak hızlıca üretilir. Tutarlılık sağlanır ve insani hatalar en aza iner.
3.  **CA Politikalarını Yönetme:** Kurumsal (Enterprise) CA altyapılarında her sertifikanın hangi uzantılara sahip olması gerektiği dosyadaki politikalar (örneğin `policy_strict` eşleşme kuralları) sayesinde merkezi olarak sınırlandırılır.

> Daha detaylı Kurumsal CA (Enterprise CA) kurulumu için → `OpenSSL_CA.md` dosyasına bakın.
