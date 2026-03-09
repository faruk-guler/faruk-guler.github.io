# 🔑 GPG (GNU Privacy Guard) Rehberi

> GPG, verileri şifrelemek, dijital olarak imzalamak ve güvenli iletişim kurmak için kullanılan açık kaynaklı bir şifreleme yazılımıdır. PGP (Pretty Good Privacy) standardını uygular. Asimetrik şifreleme (Public/Private Key) mantığıyla çalışır.

---

## 📌 Temel Kullanım Alanları
*   E-postaları ve mesajları uçtan uca şifreleme.
*   Hassas dosyaları güvenli bir şekilde saklama (`.gpg`, `.asc`).
*   Yazılım paketlerinin (apt, rpm vb.) ve Git commitlerinin (imza) doğruluğunu kanıtlama.
*   Kimlik doğrulama.

---

## 🚀 1. Anahtar Yönetimi

### Yeni Anahtar Çifti Oluşturma
```bash
gpg --full-generate-key
```
> Çıkan menüde `RSA and RSA (default)` seçeneğini, `4096` bit boyutunu ve geçerlilik süresini (örn: `1y` veya `0` sınırsız) seçin. Son olarak adınızı ve e-posta adresinizi girin.

### Mevcut Anahtarları Listeleme
```bash
# Public (Genel) anahtarları listele:
gpg --list-keys
# veya kısaca
gpg -k

# Private (Gizli) anahtarları listele:
gpg --list-secret-keys
# veya kısaca
gpg -K
```

### Public Key'i Dışa Aktarma (Başkalarına Vermek İçin)
Bu anahtarı, size şifreli mesaj gönderecek kişilere veya doğrulama yapacak servislere (GitHub, GitLab vb.) verirsiniz.
```bash
gpg --export -a "İsim veya Email" > mykey.asc
# -a (--armor) parametresi, çıktının base64 (metin) formatında olmasını sağlar.
```

### Private Key'i Yedekleme (GİZLİ TUTUN)
```bash
gpg --export-secret-keys -a "İsim veya Email" > private_key.asc
```

### Başkasının Public Key'ini İçe Aktarma
Size gönderilen şifreli mesajları açabilmeleri veya onların imzalarını doğrulayabilmeniz için onların Public Key'ine ihtiyacınız vardır.
```bash
gpg --import baskasinin_anahtari.asc
```

### Anahtar Silme
```bash
# Önce Private Key'i silmelisiniz:
gpg --delete-secret-key "İsim veya Email"

# Sonra Public Key'i silebilirsiniz:
gpg --delete-key "İsim veya Email"
```

---

## 🔒 2. Dosya Şifreleme ve Şifre Çözme

### Dosya Şifreleme (Asimetrik)
Bir dosyayı, sadece belirlediğiniz alıcı(lar) açabilsin diye onların Public Key'i ile şifrelersiniz.
```bash
# -e (encrypt), -r (recipient), -a (armor: metin çıktısı verir, opsiyoneldir)
gpg -e -r "Alıcı İsim veya Email" dosya.txt
# Sonuç olarak 'dosya.txt.gpg' dosyası oluşur.
```

### Dosya Şifre Çözme
Biri size şifreli bir dosya gönderdiyse, kendi Private Key'iniz (ve parolanız) ile açarsınız.
```bash
# -d (decrypt)
gpg -d dosya.txt.gpg > cozulmus_dosya.txt
# veya sadece içeriği ekranda görmek için:
gpg -d dosya.txt.gpg
```

### Simetrik Şifreleme (Sadece Parola ile)
Bir dosyayı Public/Private Key olmadan, sadece belirlediğiniz bir parola ile şifrelemek isterseniz:
```bash
# -c (symmetric)
gpg -c dosya.txt
# Size bir parola sorar ve 'dosya.txt.gpg' oluşturur. Çözmek için yine 'gpg -d' kullanılır.
```

---

## 📝 3. İmzalama ve Doğrulama
İmzalama, bir dosyanın içeriğinin değişmediğini ve gerçekten **sizin tarafınızdan** oluşturulduğunu kanıtlar.

### Dosyayı İmzalama (Clear Sign)
Dosyanın içeriğini bozmadan, altına imza bloğu ekler. Metin dosyaları için idealdir.
```bash
gpg --clearsign dosya.txt
# 'dosya.txt.asc' oluşur.
```

### Dosyayı Şifreli İmzalama (Detached Sign)
Orijinal dosyaya dokunmaz, yanına sadece imzayı içeren ayrı bir dosya (ör: `.sig`) oluşturur. Yazılım/ISO kalıpları yayınlarken sık kullanılır.
```bash
# -b (detach-sign)
gpg -b dosya.iso
# 'dosya.iso.sig' oluşur.
```

### İmzayı Doğrulama
Biri size bir dosya ve imzası ile geldiğinde (veya siz bir yazılım indirdiğinizde):
```bash
# Entegre imza için (.asc):
gpg --verify dosya.txt.asc

# Ayrı imza için (.sig):
gpg --verify dosya.iso.sig dosya.iso
# Çıktıda "Good signature from..." görmelisiniz.
```

---

## ⚙️ 4. İleri Seviye (Güven Tesis Etme)

Birinin anahtarını içe aktardığınızda, GPG size "Bu anahtara ne kadar güveniyorsunuz?" diye sorar. `unknown` uyarısını kaldırmak için anahtarı düzenleyip güven seviyesini ayarlayabilirsiniz.

```bash
gpg --edit-key "Alıcı İsim veya Email"
> trust
# 1 = Bilmiyorum, 5 = Tam güveniyorum (Ultimate) gibi seçenekler sunar. 
# 5 seçip 'y' ile onayladıktan sonra:
> quit
```
