---
layout: post
title: Yönetilen Hizmet Hesapları (sMSA ve gMSA) Kullanımı Hakkında

date: 2025-01-09 01:07
By: faruk-guler
comments: true
categories: [Windows OS]
---

Yönetilen Hizmet Hesapları (Managed Service Accounts - MSA), sistem yöneticilerinin Active Directory ortamında servisler ve uygulamalar için daha güvenli bir altyapı sağlamalarına yardımcı olan özel domain hesaplarıdır.

Normal kullanıcı hesaplarını hizmet hesapları olarak kullanan birçok kuruluş, parola değişimlerinde servislerin kesintiye uğramaması için karmaşık olmaktan ziyade basit ve statik parolalar belirleme eğilimindedir. Yönetilen hesaplar bu güvenlik zafiyetini ve operasyonel yükü tamamen ortadan kaldırır.

![gMSA Active Directory](https://farukguler.com/assets/post_images/gmsa_ad.JPG?w=625)

## Hesap Türleri Arasındaki Farklar

**1. Normal Hizmet Hesapları (Standart AD Kullanıcıları):**

* Bir hizmet veya zamanlanmış görevi çalıştırmak için kullanılan standart Active Directory kullanıcı hesaplarıdır.
* Parolayı manuel olarak ayarlamanız ve yönetmeniz gerekir. Parolalar genellikle süresiz (never expire) olarak ayarlanır ve nadiren değiştirilir, bu da büyük bir güvenlik riski oluşturur.
* Varsayılan olarak birden fazla bilgisayarda kullanılabilir.

**2. sMSA (Stand-Alone Managed Service Account):**

* Hizmetleri çalıştırmak için özel tasarlanmıştır. Güçlü ve karmaşık (240 baytlık) şifreler kullanır.
* Active Directory, şifreyi varsayılan olarak her 30 günde bir otomatik olarak yeniler.
* En önemli kısıtlaması: **Yalnızca tek bir bilgisayara/sunucuya** bağlanabilir ve sadece o makinede kullanılabilir.

**3. gMSA (Group Managed Service Account):**

* MSA'ların işlevselliğini genişletir. Aynı yönetilen hizmet hesabının **birden fazla bilgisayarda** (Örn: Web Farm, Cluster, ADFS) aynı anda kullanılmasına izin verir ve yük dengeleme (load-balance) senaryolarını destekler.

## Ön Koşullar ve Desteklenen Sistemler

* sMSA için ortamda **Windows Server 2008 R2** veya daha yeni bir Etki Alanı Denetleyicisi (DC) bulunmalıdır. gMSA kullanımı için ise **Forest işlev düzeyi (Forest Functional Level)** en az Windows Server 2012 olmalı ve **AD Schema versiyonu en az 52 (Windows Server 2012)** olmalıdır.
* Windows 7 ve Windows Server 2008 R2 işletim sistemlerinde de MSA çalışabilmektedir, ancak günümüzde "not-supported" (desteklenmeyen) durumdadır.
* Yönetilecek sunucuların domain'e katılmış (domain-joined) olması gerekir.
* İşlemler için Active Directory yönetim haklarına sahip bir kullanıcı (Örn: Domain Admin) ve AD PowerShell modülü gereklidir.

> [!TIP]
> **Geçiş Öncesi İpucu:** Yönetilen hizmet hesaplarına (MSA/gMSA) geçiş yapmadan önce, ortamınızdaki mevcut tüm geleneksel hizmet hesaplarını tespit etmek ve nerede kullanıldıklarını bulmak (envanter çıkarmak) geçiş sürecini çok daha güvenli ve planlı hale getirecektir.

---

## Güvenlik ve En İyi Uygulamalar (Best Practices)

Yönetilen hizmet hesaplarını yapılandırırken aşağıdaki güvenlik standartlarına uyulması tavsiye edilir:

* **En Az Ayrıcalık İlkesi (Principle of Least Privilege):** gMSA hesaplarına asla `Domain Admin` veya `Enterprise Admin` gibi yüksek ayrıcalıklı yetkiler vermeyin. Sadece çalıştıracağı servisin ihtiyaç duyduğu minimum yetkilerle donatın.
* **Güvenlik Grupları Kullanımı:** `PrincipalsAllowedToRetrieveManagedPassword` parametresine doğrudan sunucu adlarını girmek yerine, her gMSA için Active Directory'de özel bir Güvenlik Grubu (Security Group) oluşturun ve sunucuları bu gruba ekleyin. Bu sayede yönetim çok daha kolay ve güvenli olur.
* **Aşırı Paylaşımdan Kaçının (Avoid Over-Sharing):** Aynı gMSA hesabını, birbirleriyle ilgisi olmayan farklı servis kümelerinde (Örn: Hem Web farm hem de Veritabanı cluster'ı) kullanmayın. Her izole sistem için ayrı bir gMSA hesabı oluşturun.

---

## ADIM 1: KDS Kök Anahtarını (Root Key) Oluşturma (Ortak Adım)

Etki alanı denetleyicileri, gMSA ve MSA'lar için benzersiz parolalar oluşturmak ve saklamak amacıyla Anahtar Dağıtım Hizmeti (KDS) kök anahtarına ihtiyaç duyar.

> [!IMPORTANT]
> Her Active Directory Forest'ı için **yalnızca bir adet** KDS Root Key oluşturulmalıdır.

Üretim ortamı için (Anahtarın tüm DC'lere çoğaltılması 10 saat sürebilir):

```powershell
Add-KdsRootKey -EffectiveImmediately
```

**"Key does not exist" Hatası:** Kök anahtar tüm DC'lere çoğaltılmadan hesap açmaya çalışırsanız bu hatayı alırsınız. Test ortamındaysanız veya hemen hesabı kullanmak istiyorsanız, başlangıç zamanını 10 saat geriye ayarlayabilirsiniz:

```powershell
# KDS Root Key'i 10 saat geçmişten başlatarak hemen aktif hale getirir
Add-KdsRootKey -EffectiveTime (Get-Date).AddHours(-10)
```

Anahtarın başarıyla oluşturulduğunu kontrol etmek için:

```powershell
Get-KdsRootKey
```

---

## ADIM 2: Hesap Oluşturma ve Yetkilendirme

İhtiyacınıza göre gMSA veya standart sMSA oluşturabilirsiniz. Oluşturulan hesaplar ADUC konsolunda varsayılan olarak **Managed Service Accounts** kapsayıcısında tutulur.

### Seçenek A: gMSA Oluşturma (Çoklu Sunucu İçin)

Hesaba erişim vereceğiniz sunucuları bir Active Directory Security Group (Örn: `SQL_Sunuculari`) içinde toplayın.

```powershell
New-ADServiceAccount -Name "SQLServices" `
                     -DNSHostName "sqlservices.domain.local" `
                     -PrincipalsAllowedToRetrieveManagedPassword "SQL_Sunuculari"
```

> [!IMPORTANT]
> **Kerberos Güncellemesi:** Sunucunuzun Computer objesini bu güvenlik grubuna ekledikten sonra, sunucunun yeni grup üyeliğini algılayabilmesi için hesabı kuracağınız **sunucuyu yeniden başlatmanız (Restart)** gerekir.

**gMSA Hesabına Sonradan Yeni Sunucu Ekleme (Dikkat):**
Hesaba sonradan sadece komutla (`Set-ADServiceAccount`) bir sunucu eklemek isterseniz dikkatli olmalısınız. Eğer komuta mevcut sunucuları da dahil etmezseniz, **eskiler silinir**. Bu yüzden Security Group kullanmak her zaman en güvenli ve kolay yöntemdir. Komutla yapacaksanız önce mevcutları listeleyin:

```powershell
Get-ADServiceAccount -Identity "SQLServices" -Properties PrincipalsAllowedToRetrieveManagedPassword
```

Daha sonra eski ve yeni sunucuları bir arada yazarak güncelleyin:

```powershell
Set-ADServiceAccount -Identity "SQLServices" -PrincipalsAllowedToRetrieveManagedPassword "EskiSunucu$", "YeniSunucu$"
```

### Seçenek B: Stand-Alone MSA Oluşturma (Tek Sunucu İçin)

Sadece tek bir sunucuda çalışacak standart bir sMSA oluşturmak için komut şöyledir:

> [!NOTE]
> sMSA oluştururken gMSA'da kullanılan `-DNSHostName` parametresi **kullanılmaz**. Bunun yerine hesabı tek bir makineye kilitlemek için `-RestrictToSingleComputer` parametresi kullanılır.

```powershell
# 1. sMSA hesabını oluşturun (-RestrictToSingleComputer tek makine kısıtlamasını uygular)
New-ADServiceAccount -Name "AppTestMsa" -RestrictToSingleComputer

# 2. sMSA hesabını doğrudan çalışacağı bilgisayara bağlayın
Add-ADComputerServiceAccount -Identity "SunucuAdi" -ServiceAccount "AppTestMsa"
```

---

## ADIM 3: Sunucuyu Hizmet Hesabı İçin Hazırlama

Oluşturulan hesabı kullanmak için ilgili sunucuda (Örn: IIS, SQL, ADFS sunucusu) hesabı yüklemeniz gerekir:

```powershell
# Eğer yüklü değilse RSAT (Remote Server Administration Tools) AD modülünü yükleyin.
Install-WindowsFeature RSAT-AD-PowerShell

# Hesabı sunucuya kurun
Install-ADServiceAccount -Identity "SQLServices"

# Kurulumun başarılı olduğunu doğrulamak için test edin (True dönmelidir)
Test-ADServiceAccount -Identity "SQLServices"
```

### Yerel İzinler ve Gruplara Ekleme

Hizmet hesabının sunucuda sorunsuz çalışabilmesi için işletim sistemi tarafında bazı haklara sahip olması gerekir:

* **Windows Servisleri** için hesabın **"Log on as a service"** (Servis olarak oturum açma) hakkına ihtiyacı vardır.
* **Zamanlanmış Görevler** için hesabın **"Log on as a batch job"** (Toplu iş olarak oturum açma) hakkına ihtiyacı vardır.

Eğer hesap sunucuda yerel `Administrators` grubunda değilse, bu izinleri `secpol.msc` (Local Security Policy) üzerinden verebilir veya hesabı PowerShell ile yerel bir gruba dahil edebilirsiniz:

```powershell
Add-LocalGroupMember -Group "Administrators" -Member "SQLServices$"
```

---

## ADIM 4: Servisi, Uygulamayı veya Görevi Hesap ile Çalıştırma

Oluşturulan hesabı bir servise atarken, hesap adının sonuna her zaman **`$` (dolar)** işareti koymayı unutmayın (Örn: `DOMAIN\SQLServices$`). Windows bu hesabın bir MSA/gMSA olduğunu kendisi algılar.

### A. Windows Servisleri

`services.msc` üzerinden servisin "Log On" sekmesini seçin. Hesap adı kısmına `DOMAIN\SQLServices$` yazın ve **şifre kısımlarını tamamen boş bırakın**.

### B. IIS Application Pool

AppPool "Advanced Settings" > "Identity" alanına girin. "Custom account" seçerek `DOMAIN\SQLServices$` yazıp şifreyi boş bırakın.

### C. Zamanlanmış Görevler (Scheduled Tasks)

**1. Arayüz (GUI) Kullanarak (Püf Noktası):**
Görev Zamanlayıcı (Task Scheduler) arayüzünde hesabı arattığınızda gMSA hesabını bulamayabilirsiniz. Seçim ekranında **"Object Types" (Nesne Türleri)** butonuna tıklayın. Gelen ekranda sadece **"Service Accounts" (Hizmet Hesapları)** seçeneğini işaretli bırakın (Users ve diğerlerini kaldırın). Ardından hesabınızı aratıp seçebilirsiniz.

**2. PowerShell Kullanarak:**
Arayüz yerine PowerShell ile atama yapmak isterseniz şu komutları kullanabilirsiniz:

```powershell
$Principal = New-ScheduledTaskPrincipal -UserID "DOMAIN\SQLServices$" -LogonType Password -RunLevel Highest
Set-ScheduledTask -TaskName "GorevinAdi" -Principal $Principal
```

> [!IMPORTANT]
> **Hizmet Yeniden Başlatma:** Hesabı atadıktan sonra, ayarların geçerli olması için ilgili **hizmeti veya uygulama havuzunu yeniden başlatmanız** şarttır. Zamanlanmış görevlerde ise yetki hatası alırsanız sunucuyu yeniden başlatmak Kerberos biletini güncelleyecektir.

---

## ADIM 5: Parola Yönetimi ve Döngüsü

Parola yönetimi tamamen Windows işletim sistemi (Active Directory) tarafından yapılır. Parola döngüsü varsayılan olarak **30 gün**dür.

> [!CAUTION]
> Parola yenileme süresi (`ManagedPasswordIntervalInDays`) yalnızca hesap **oluşturulurken** `-ManagedPasswordIntervalInDays` parametresiyle belirlenebilir ve sonradan değiştirilemez. Hesabı oluşturduktan sonra bu değeri güncellemek isterseniz hesabı silip yeniden oluşturmanız gerekir.

```powershell
# Parola döngüsünü 20 gün olarak ayarlamak için (YALNıZCA HESAP OLUŞTURULURKEN kullanılır)
New-ADServiceAccount -Name "SQLServices" `
                     -DNSHostName "sqlservices.domain.local" `
                     -PrincipalsAllowedToRetrieveManagedPassword "SQL_Sunuculari" `
                     -ManagedPasswordIntervalInDays 20
```

---

## ADIM 6: Hesap Kaldırma (Gerektiğinde)

Eğer bir yönetilen hizmet hesabını kaldırmak isterseniz şu adımları izleyin:

```powershell
# 1. Önce sunucudan hesabı kaldırın (İlgili sunucuda çalıştırın)
Uninstall-ADServiceAccount -Identity "SQLServices"

# 2. Sonra Active Directory'den hesabı silin (Domain Controller'da çalıştırın)
Remove-ADServiceAccount -Identity "SQLServices"
```

---

## İleri Seviye: SQL Server ve SPN (Service Principal Name) Yönetimi

gMSA hesapları parolalarını otomatik yönetse de, **varsayılan olarak Active Directory üzerine kendi SPN'lerini (Service Principal Name) yazma yetkilerine sahip değillerdir.**

Eğer SQL Server servisini bir gMSA ile çalıştırıyorsanız ve SPN yazılamazsa, SQL Server **Kerberos** yerine daha güvensiz olan **NTLM** kimlik doğrulamasına düşer (veya loglarda SPN kayıt hataları alırsınız).

SQL Server'ın Kerberos ile güvenli çalışabilmesi için gMSA nesnesine `SELF` için `Write servicePrincipalName` yetkisi verilmelidir:

```powershell
# 1. Active Directory PowerShell modülünü kullanarak hesabı bulun
$gMSA = Get-ADServiceAccount -Identity "SQLServices$"

# 2. dsacls aracı ile gMSA'ya kendi SPN'ini yazma yetkisi verin
dsacls $gMSA.DistinguishedName /G "SELF:RPWP;servicePrincipalName"
```

Bu yetki verildikten sonra SQL Server servisini yeniden başlattığınızda, servis kendi SPN kayıtlarını başarıyla oluşturacak ve Kerberos kimlik doğrulaması aktif hale gelecektir.

---

## Sorun Giderme ve İleri Seviye İpuçları

* **İsimlendirme Sınırı:** gMSA oluştururken `-Name` parametresi, Active Directory `sAMAccountName` kısıtlamalarından dolayı **en fazla 15 karakter** uzunluğunda olabilir.
* **MSA Hesabı ile Komut Çalıştırma (Test Etme):** Bir komut satırını veya PowerShell'i MSA hesabıyla çalıştırmak için `RunAs` komutu işe yaramaz. Sorun giderme için **PsExec** aracını kullanmalısınız:

  ```cmd
  PsExec64.exe -i -u DOMAIN\SQLServices$ -p ~ cmd.exe
  ```

* **PowerShell Send-MailMessage Hatası:** Bir zamanlanmış görev MSA ile çalışırken e-posta göndermeye çalışırsa (kimlik doğrulama olmadan) `net_io_connectionclosed` hatası verebilir. Bu durumda anonim gönderimi zorlamak için boş bir kimlik bilgisi (NT AUTHORITY\ANONYMOUS LOGON) tanımlamak gerekebilir.

---

## Sık Sorulan Sorular

* **Yönetilen hizmet hesapları neden daha güvenlidir?** Parolaları (240 baytlık karmaşık şifreler) otomatik olarak oluşturup periyodik olarak değiştirdiği için kaba kuvvet (brute-force) saldırılarını ve statik şifre risklerini engeller.
* **KDS kök anahtarının oluşturulması neden 10 saat sürebilir?** Kök anahtar, Active Directory yapısındaki tüm etki alanı denetleyicilerine (DC) çoğaltılmalıdır ve bu replikasyon süreci varsayılan olarak zaman alır.

---

## sMSA 🆚 gMSA

İkisi arasındaki tercih, hesabı kullanacak uygulama veya servisin gereksinimlerine bağlıdır. Eğer uygulama yalnızca tek bir sunucuda çalışıyorsa sMSA tercih edilebilir; ancak servisin birden fazla sunucuda çalışması gerekiyorsa gMSA kullanılmalıdır.

| Özellik | sMSA | gMSA |
| --- | --- | --- |
| Desteklenen Sunucu Sayısı | Yalnızca 1 | Birden fazla |
| Minimum Gereksinim | Windows Server 2008 R2 | Windows Server 2012 (Forest FL) |
| Parola Yönetimi | Otomatik (AD tarafından) | Otomatik (AD tarafından) |
| Load Balancing / Cluster | ❌ | ✅ |
| Kerberos Şifreleme Tipi | Varsayılan | Yapılandırılabilir (AES128/AES256) |

> [!NOTE]
> Windows Server 2025 ile birlikte **dMSA (Delegated Managed Service Account)** adı verilen yeni bir hesap modeli tanıtılmıştır. Bu model, gMSA ve sMSA'nın doğal halefi olup güvenlik ve esneklik açısından daha ileri bir seviyeyi temsil etmektedir.

*— farukguler*