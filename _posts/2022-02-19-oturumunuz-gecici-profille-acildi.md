---
layout: post
title: Oturumunuz Geçici Profille Açıldı
date: 2022-02-19 03:15
author: theguler
comments: true
categories: [Windows OS]
---

![Geçici Profil Sorunu Görseli](https://farukguler.com/assets/post_images/we3.png?w=740)

## Sorun Giderme Yöntemi / Troubleshooting Method

### Kayıt Defteri Üzerinde Yapılacaklar / Registry Modifications

#### Türkçe:

1. Aşağıdaki kayıt defteri dizinine gidin:  
   `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList`

2. Sol bölmede, **S-1-5** ile başlayan ve uzun bir sayı ile devam eden klasörleri bulun.

3. Sonu **.BAK** ile biten klasörü bulun ve üzerine sağ tıklayarak "Dışa Aktar" (Export) seçeneğiyle yedek alın.  
   ⚠️ Bu adım çok önemlidir.

4. Yedekleme tamamlandıktan sonra **.BAK** uzantılı klasörü silin.

5. Bilgisayarı yeniden başlatın.

#### English:

1. Navigate to the following registry path:  
   `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList`

2. In the left pane, locate the folder starting with **S-1-5** followed by a long number.

3. Find the one ending in **.BAK**, right-click it, and choose "Export" to back it up to your desktop.  
   ⚠️ This step is very important.

4. After backing it up, delete the **.BAK** key.

5. Restart your computer.

---

**Saygılarımla. / Best regards.**
