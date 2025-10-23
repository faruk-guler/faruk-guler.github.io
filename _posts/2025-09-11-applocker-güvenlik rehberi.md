---
layout: post
title: Windows AppLocker'i inceliyorum.
date: 2025-09-11 09:33
by: faruk-guler
comments: true
categories: [Windows OS]
---


# Windows AppLocker: Kapsamlı şekilde incelemesini yapalım...

Windows AppLocker, Microsoft'un gelişmiş bir uygulama beyaz liste (whitelist) çözümüdür. Temel amacı, bir kuruluş içindeki bilgisayarlarda yalnızca yetkili ve onaylanmış yazılımların çalışmasına izin vermek; yetkisiz yazılımları, betikleri, yükleyicileri ve DLL'leri proaktif olarak engellemektir.

Bu sistem, güvenlik politikalarınızı Grup İlkesi (GPO) üzerinden merkezi olarak yönetmenize olanak tanır ve modern siber güvenlik tehditlerine karşı katmanlı bir savunma hattı oluşturur.

> **Temel Prensip:** AppLocker, "Sadece izin verilenler çalışır" (whitelist) prensibiyle çalışır.

Geleneksel Yazılım Kısıtlama Politikaları (Software Restriction Policies - SRP) ile karşılaştırıldığında AppLocker, çok daha esnek, yönetilebilir ve güçlü bir yapı sunar. Windows 7 ve sonrasındaki sistemler için SRP yerine AppLocker'ın kullanılması tavsiye edilmektedir.

---

## Çalışma Mimarisi ve Kurallar

AppLocker'ın çalışma mantığı, hangi dosyaların çalıştırılıp çalıştırılamayacağını tanımlayan kurallara dayanır. Bu kurallar beş ana dosya kategorisi için ayrı ayrı yapılandırılabilir:

1.  **Yürütülebilir Dosyalar (.exe, .com):** Uygulamaların, programların ve bazı betiklerin çalışmasını kontrol eder.
2.  **Betik Dosyaları (.ps1, .vbs, .js, .cmd, .bat):** PowerShell, VBScript, JavaScript ve komut istemi betiklerinin çalışmasını yönetir.
3.  **Windows Installer Dosyaları (.msi, .msp):** Yazılım kurulumlarını, güncellemelerini ve yamalarını kontrol eder.
4.  **Uygulama Paketi Dosyaları (.appx):** Windows 8 ve sonrası modern (Universal Windows Platform - UWP) uygulamaların çalışmasını yönetir.
5.  **DLL Dosyaları (.dll, .ocx):** Uygulamaların ihtiyaç duyduğu dinamik bağlantı kütüphanelerinin (Dynamic Link Libraries) yüklenmesini kontrol eder.
    * **Not:** DLL kuralları, diğerlerine göre daha karmaşıktır ve sistem üzerinde ciddi bir performans etkisi yaratabilir. Genellikle varsayılan olarak devre dışıdır ve sadece çok yüksek güvenlik gerektiren senaryolarda dikkatlice yapılandırılmalıdır.

### Kural Türleri (Rule Types)

AppLocker, dosyaları tanımlamak için üç farklı kural koşulu sunar:

* **Yayıncı (Publisher):** En esnek ve en çok tavsiye edilen yöntemdir. Kural, dosyanın dijital imzasına (yayıncı adı, ürün adı, dosya adı, sürüm) dayanır. Bu sayede, uygulama güncellense bile (sürümü değişse bile) kural geçerliliğini korur.
* **Yol (Path):** Dosyanın bulunduğu konuma (örneğin, `C:\Program Files\`) göre izin veya engel belirler. Yönetimi kolaydır ancak dosya konumu değişirse veya kullanıcı dosyayı başka bir yere kopyalarsa kural etkisiz kalabilir.
* **Hash (Karma):** Dosyanın benzersiz kriptografik parmak izine (hash) göre kural oluşturur. Çok güvenlidir ancak dosyanın en ufak bir güncelleme alması (hash değerinin değişmesi) kuralın bozulmasına ve manuel güncelleme gerektirmesine neden olur.

---

## Yapılandırma ve Gereksinimler

AppLocker politikalarını merkezi olarak dağıtmak için Grup İlkesi Yönetimi (GPO) kullanılır. İki temel yapılandırma noktası vardır:

1.  **AppLocker Politikaları:**
    * `Computer Configuration` → `Policies` → `Windows Settings` → `Security Settings` → `Application Control Policies` → `AppLocker`
2.  **Gerekli Hizmet (Application Identity):**
    * AppLocker kurallarının uygulanabilmesi için `Application Identity` (AppIDSvc) servisinin çalışıyor olması zorunludur. Bu hizmetin GPO üzerinden otomatik olarak başlatılması sağlanmalıdır:
    * `Computer Configuration` → `Policies` → `Windows Settings` → `Security Settings` → `System Services` → `Application Identity` (Başlangıç Türü: Otomatik)

![Application Identity Servisini Etkinleştirme](https://farukguler.com/assets/post_images/app-locker1.PNG)

### Uygulama Modları (Enforcement Modes)

AppLocker kuralları, her dosya kategorisi için iki farklı modda çalıştırılabilir:

![AppLocker Uygulama Modları - Enforce ve Audit](https://farukguler.com/assets/post_images/app-locker2.PNG)

* **Denetim Modu (Audit Only):**
    * Bu modda, kurallara uymayan uygulamalar **engellenmez**. Bunun yerine, tüm kural eşleşmeleri (izin verilen veya engellenecek olan) olay günlüğüne (Event Logs) kaydedilir.
    * **Kullanım Amacı:** Üretim ortamını etkilemeden önce oluşturduğunuz politikaların etkisini test etmek ve mevcut uygulama envanterini (kim ne kullanıyor?) analiz etmek için idealdir.
* **Uygulama Modu (Enforce rules):**
    * Kurallar aktif olarak uygulanır. Beyaz listede olmayan ve kurallara uymayan tüm uygulamalar **bloke edilir**. Bu mod, politikalarınızdan emin olduktan sonra üretim ortamında kullanılır.

---

## Kritik Uyarı: Varsayılan Kurallar (Default Rules)

AppLocker'da **ilk kuralınızı** oluşturduğunuz anda, varsayılan "her şeye izin ver" kuralı devre dışı kalır. Eğer bu aşamada varsayılan sistem kurallarını eklemezseniz, **Windows'un kendisi de dahil olmak üzere kritik sistem bileşenleri çalışmaz hale gelir.**

Bu nedenle, ilk yapılandırmada mutlaka "Default Rules" oluşturulmalıdır. Bu kurallar temel olarak şunlara izin verir:

* `BUILTIN\Administrators`: Yöneticilerin her şeyi çalıştırmasına izin verir.
* `%ProgramFiles%\*`: `Program Files` klasöründeki uygulamalara izin verir.
* `%WINDIR%\*` veya `%SystemRoot%\*`: Windows sistem dosyalarının çalışmasına izin verir.

---

## En İyi Uygulamalar (Best Practices)

Başarılı bir AppLocker dağıtımı için aşağıdaki en iyi uygulamalar takip edilmelidir:

* **Audit ile Başlayın:** Yeni kuralları asla doğrudan "Enforce" modunda uygulamayın. Her zaman `Audit Only` ile başlayın ve bir süre olay günlüklerini izleyerek yanlış yapılandırılmış bir kuralın kullanıcıların işini durdurmadığından emin olun.
* **Publisher Kurallarını Tercih Edin:** Mümkün olan her yerde `Publisher` (Yayıncı) kurallarını kullanın. Bu kurallar, uygulama güncellemelerinden (patch, update) etkilenmez, bu da yönetim yükünüzü azaltır.
* **Engelleme (Deny) Kurallarını Dikkatli Kullanın:** AppLocker bir beyaz liste çözümüdür. "Her şeyi engelle, sadece bunlara izin ver" mantığı daha güvenlidir. `Deny` (Engelle) kuralları, her zaman `Allow` (İzin Ver) kurallarından önce değerlendirilir ve kural çakışmalarına neden olabilir.
* **Departman Bazlı (OU) Politikalar:** Tüm şirkete tek bir politika uygulamak yerine, Active Directory'deki Organizasyonel Birimlere (OU) göre ayrı politikalar oluşturun. (Örn: Finans, IT, Üretim departmanlarının uygulama ihtiyaçları farklıdır).
* **Envanter Çıkarın:** `Audit Only` modunu kullanarak "Kullanıcılar hangi uygulamaları gerçekten kullanıyor?" sorusunun cevabını loglardan öğrenin. Bu envantere göre beyaz listenizi oluşturun.
* **GPO ve Lokal Politikalar:** GPO ile dağıtılan AppLocker kuralları, ilgili bilgisayardaki lokal AppLocker kurallarını her zaman ezer (override eder).
* **Beyaz Liste (Whitelist) Önceliği:** Önce çalışması gereken tüm uygulamalara (sistem, antivirüs, ofis yazılımları vb.) izin veren bir beyaz liste oluşturun. Daha sonra spesifik olarak engellemek istediğiniz (blacklist) uygulamalar için `Deny` kuralı yazabilirsiniz.
* **DLL kuralları varsayılan olarak devre dışıdır, DLL kuralları: Performans maliyeti yüksektir, genellikle sadece yüksek güvenlik ihtiyacı olan senaryolarda kullanılır.
---

## Olay Günlüğü Yönetimi (Event Log Management)

AppLocker'ın ne yaptığını anlamak için olay günlükleri hayati önem taşır.

* **Log Yolu:** `Applications and Services Logs` → `Microsoft` → `Windows` → `AppLocker`
* Bu yolun altında her dosya tipi (EXE and DLL, MSI and Script, Packaged App) için ayrı alt günlükler bulunur.

### Önemli Event ID'ler

*Event Wiewer: Applications and Services Logs → Microsoft → Windows → AppLocker*

| Event ID | Açıklama |
| :--- | :--- |
| **8003** | Uygulamanın çalışmasına **izin verildi** (Denetim modunda). |
| **8004** | Uygulama **engellendi** (Uygulama modunda). |
| 8005 | Kural yoksayıldı (Denetim modunda, engellenecekti). |
| 8006 | Kural yoksayıldı (Uygulama modunda, engellenecekti). |
| 8007 | Kural silindi. |

*Not: 8004 (Engellendi) ve 8003 (İzin Verildi - Audit) logları, politikanızın etkisini analiz etmek için en kritik olanlardır.*

---

## Bilinen Zafiyetler ve Bypass Senaryoları

AppLocker güçlü bir araç olsa da, Windows'un bazı yerleşik araçları (LOLBAS - Living Off The Land Binaries) kötüye kullanılarak atlatılabilir. Güvenlik ekiplerinin bu senaryoları bilmesi ve bunlara karşı ek önlemler (örn. betik kuralları, PowerShell kısıtlamaları) alması önemlidir:

* `InstallUtil.exe` (.NET assembly çalıştırma)
* `MSBuild.exe` (C# kodu derleme/çalıştırma)
* `Rundll32.exe` (DLL fonksiyonlarını çağırma)
* `Regsvr32.exe` (Scriptlet çalıştırma)
* `WMIC.exe` (XSL betiklerini çalıştırma)
* `PowerShell.exe` (Çeşitli kısıtlama atlatma teknikleri)

---

## PowerShell ile Yönetim

AppLocker politikaları PowerShell komutları ile de yönetilebilir, yedeklenebilir ve dağıtılabilir.

```powershell
# Mevcut AppLocker policy'sini bir XML dosyasına aktar (Yedekleme)
Export-AppLockerPolicy -Xml -FilePath C:\temp\AppLocker.xml

# XML dosyasından policy'i mevcut sisteme uygula (Geri Yükleme/Dağıtım)
Set-AppLockerPolicy -XmlPolicy C:\temp\AppLocker.xml

# Policy içindeki tüm 'Engelleme' (Deny) kurallarını göster
Get-AppLockerPolicy -Xml | Select-Xml "//Rule[@Action='Deny']" | ForEach-Object {$_.Node}

```
## Referanslar:
https://en.wikipedia.org/wiki/AppLocker