---
title: "Oturumunuz Gecici Profille Acildi Hatasi"
author: faruk-guler
categories: [Windows OS]
tags: [windows hata]
render_with_liquid: false
layout: post
published: true  
---
![Resim](https://farukguler.com/assets/post_images/we3.jpg)

Bu işlem genelde “Kullanıcı profili yüklenemedi / Temporary profile ile oturum açıldı” gibi hataları düzeltmek içindir. Sorun, kayıt defterinde ProfileList altında kullanıcıya ait SID anahtarının yanına .BAK uzantılı bir kopya oluşmasıdır. Doğru olan kayıt .BAK’li olandır; Windows bazen yanlış olanı yüklemeye çalışır.

Aşağıda hem güvenli hazırlıklar hem de önerilen onarım yöntemi (Microsoft’un klasik yaklaşımı) var. En sonda, yalnızca .BAK anahtarını silmeyi içeren “hızlı yöntem”in artı-eksi yönlerini da belirttim.

<br>

## **Nasıl Düzeltilebilir?**


```console
-1 Kayıt defteri dizinine git:
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList

-2 Sol bölmede, S-1-5 (SID anahtarı) ile başlayan ve onu uzun bir sayının izlediği klasör adını arayın.
-3 Sonu.BAK olan dizini bulup Ayarları ver - Export diyerek registery ayarlarını masaüstüne yedekleyin.****** önemli
-4 Yedek aldıktan sonra sonu .BAK olan dizini silin
-5 Bilgisayarı yeniden başlatın.


1- Go to Regedit directory:
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList

-2 In the left pane, look for the folder name that starts with S-1-5 (SID key) followed by a long number.
-3 Find the directory with .BAK at the end and click Export Settings - Export to back up the registery settings to the desktop.****** important
-4 Delete directory with .BAK after backup
-5 Restart your computer.


Saygılarımla. – Best regards.
```
<style>
.center img {
  display:block;
  margin-left:auto;
  margin-right:auto;
}
.wrap pre{
    white-space: pre-wrap;
}

.post-desc {
  font-family: 'Open Sans', sans-serif !important;
}
</style>

