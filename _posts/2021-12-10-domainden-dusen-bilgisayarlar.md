---
layout: post
title: Domainden Düşen Bilgisayarlar İçin Çözümler (Secure Channel Issues)
date: 2021-12-10 12:22
by: faruk-guler
comments: true
categories: [Active Directory]
---

<!-- markdownlint-disable MD033 -->
<img src="https://farukguler.com/assets/post_images/connection-broked.webp?w=1024" width="280" alt="Domain Connection Broken">
<!-- markdownlint-enable MD033 -->

## **Bilgisayarlar Domainden Neden Düşer? (Why do Computers Lose Domain Trust?)**

Active Directory yapısında istemci makineler ile Domain Controller (DC) arasındaki **Secure Channel** (Güvenli Kanal) iletişimi koptuğunda, kullanıcılar "The trust relationship between this workstation and the primary domain failed" hatasıyla karşılaşır.

### **Başlıca Nedenler (Common Causes):**

1. **Zaman Senkronizasyonu (Time Sync):** İstemci ve DC arasındaki saat farkı 5 dakikadan fazlaysa Kerberos doğrulaması başarısız olur.
2. **SID Çakışmaları:** `Sysprep` uygulanmamış klonlanmış makinelerin aynı SID'e sahip olması.
3. **Makine Parolası Senkronizasyonu:** Bilgisayarın AD üzerindeki parolasının (varsayılan 30 günde bir değişir) istemci tarafında güncellenememesi.
4. **DNS Sorunları:** İstemcinin DC'yi (SRV kayıtlarını) çözememesi.

---

## **Soruna Ait Hata Örnekleri (Error Visuals)**

![Trust Relationship Error](https://farukguler.com/assets/post_images/trust-.png?w=1024)

---

## **Çözüm Yöntemleri (Step-by-Step Solutions)**

> [!IMPORTANT]
>
> * İşlemlere başlamadan önce istemci makinenin DC'ye fiziksel olarak erişebildiğinden ve doğru DNS adreslerini aldığından emin olun.
> * **Kritik:** Güven ilişkisi koptuğu için domain hesaplarıyla oturum açamayabilirsiniz. Bu adımları uygulamak için bilgisayarda **Yerel Yönetici (Local Administrator)** hesabıyla oturum açmanız gerekmektedir.
>
> [!TIP]
> İşlemlere başlamadan önce DNS önbelleğini temizlemek çözüm sürecini hızlandırabilir: `ipconfig /flushdns`

### **1. Yöntem: Bilgisayar Hesabını AD Üzerinden Sıfırlama**

En basit yöntemdir. **ADUC (Active Directory Users and Computers)** konsolunda ilgili bilgisayar nesnesine sağ tıklayıp **"Reset Account"** dedikten sonra istemci makineyi yeniden başlatın.

---

### **2. Yöntem: PowerShell ile Hızlı Onarım (Rejoin Gerektirmez)**

Bu yöntem sunucuyu domainden çıkarıp almadan (reboot gerektirmeden) güven ilişkisini onarır.

```powershell
# 1. Mevcut durumu test edin (False dönüyorsa sorun vardır)
Test-ComputerSecureChannel -Verbose

# 2. Güveni onarın (Kimlik bilgisi soracaktır)
Test-ComputerSecureChannel -Repair -Credential (Get-Credential)
```

> [!TIP]
> Eğer PowerShell erişiminiz yoksa CMD üzerinden şu komutu kullanabilirsiniz:
> `nltest /sc_verify:domain_adinizi_yaziniz`

---

### **3. Yöntem: PowerShell ile Makine Parolası Sıfırlama**

Eğer yukarıdaki komut yetersiz kalırsa makine parolasını manuel olarak tetikleyebilirsiniz:

```powershell
$cred = Get-Credential
Reset-ComputerMachinePassword -Credential $cred
Restart-Computer
```

---

### **4. Yöntem: Klasik Yöntem (Domainden Çıkar / Tekrar Dahil Et)**

Diğer tüm yöntemler başarısız olursa izlenecek kesin çözümdür:

1. Bilgisayarı **Workgroup**'a çekin ve **yeniden başlatın**.
2. AD üzerinden eski bilgisayar nesnesini silin (isteğe bağlı).
3. Bilgisayarı tekrar **Domain**'e dahil edin ve **yeniden başlatın**.

---

## **Ekstra: Uzaktan Onarım (Remote Repair)**

> [!NOTE]
> Uzaktan onarım komutunun çalışması için hedef bilgisayarda **WinRM** servisinin açık olması ve güvenlik duvarının izin vermesi gerekmektedir.

```powershell
$cred = Get-Credential
Invoke-Command -ComputerName "SORUNLU-PC-ADI" -ScriptBlock {Test-ComputerSecureChannel -Repair -Credential $using:cred}
```

---
**Saygılarımla / Thank you.**
