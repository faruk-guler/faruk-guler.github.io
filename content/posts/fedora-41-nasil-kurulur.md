---
title: "Fedora 41 Nasıl Kurulur? Adım Adım Kurulum Rehberi"
date: 2024-11-13
# weight: 1
# aliases: ["/first"]
tags: ["Linux","Fedora"]
categories: ["Linux"]
author: "Furkan YILMAZ"
# author: ["Me", "You"] # multiple authors
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "Fedora'nın kişisel bilgisayarlara nasıl kurulacağını adım adım anlattığım rehber niteliğinde yazım."
canonicalURL: "https://canonical.url/to/page"
disableHLJS: true # to disable highlightjs
disableShare: false
disableHLJS: false
hideSummary: false
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
ShowRssButtonInSectionTermList: true
UseHugoToc: true
ShowCodeCopyButtons: true
---
## Giriş
Merhabalar, bir süre önce kişisel bilgisayarımda GNU/Linux işletim sistemi kullanma kararı aldım. Bu kararı almamdaki en büyük etmen, aslında _"Open Source"_ projelere olan sempatim diyebilirim. Aynı zamanda Linux'un kanımca teknolojik bir devrim niteliği taşıyor olması da bu tercihimi elbette etkiledi. GNU/Linux'un ilgililerin hoşuna gideceği bir hikayesi var. _(Bu konu hakkında çok daha detaylı bir yazı hazırlamayı düşünüyorum)_ 

## Fedora 41 Nasıl Kurulur? | Adım Adım Kurulum Rehberi 2024 - YouTube
{{< youtube 4wzRKargwXA >}}

## Donanım Uyumluluğu Kontrolü
Popüler GNU/Linux dağıtımlarının birçoğunda artık güncel çekirdekler kullanılıyor. Bu çekirdekler, içerisinde çok eski olmayan birçok donanım için sürücüleri de hazır olarak barındırıyorlar. Ancak özellikle çok eski veya çok yeni donanımlara sahipseniz, birçok dağıtımda sürücü sorunu yaşayabilirsiniz. 

_Örneğin; Benim şuanda kişisel bilgisayarım Huawei Matebook D14 ve bu modelle ilgili yakın zamana kadar birçok dağıtımın kullandığı Linux çekirdeklerinde hoparlör sürücüsü kaynaklı sorunlar yaşanıyordu. Bu yüzden distro (dağıtım) tercihimi Fedora'dan yana kullandım._

Donanım uyumluluğunu kontrol etmek için önünüzde birkaç seneçenek var; 
- Kullanmak istediğiniz GNU/Linux dağıtımlarının Wiki sayfalarını incelemek.
- Bilgisayar donanımlarınız veya dağıtımlarınızla ilgili topluluk forumlarını araştırmak.
- [Linux-Hardware](https://linux-hardware.org/) platformu üzerinden çok daha detaylı bir şekilde donanım uyumluluğunu kontrol edebilirsiniz. 
---
## Fedora Kurulumuna Başlayalım! 
Eğer dağıtım tercihinizi yaptıysanız ki bizim için bu **"Fedora"** olacak, kurulum aşamalarına geçebiliriz. Kurulumda kullanacağım dağıtımın Fedora olması sizi korkutmasın. Popüler olan Linux Mint, Ubuntu vb. birçok dağıtımın kurulum aşamaları benzer şekilde ilerliyor. Bu yüzden aynı adımlarla farklı dağıtımlarıda elbette kişisel bilgisayarınıza kurabilirsiniz. 
### Kurulum Hazırlıkları
Kurulum için bizlere aslında pek fazla şey gerekmiyor. Liste hazırlayacak olsak;
- Kurulum yapacağınız kişisel bilgisayarınız
- İşletim sistemini boot edebileceğimiz bir **USB Bellek**
- Tercih ettğiniz dağıtımın **ISO Dosyası**

Burada dikkat edilmesi gereken durum, USB belleğinizin boyutunun ISO dosyası boyutuna uygun olması. Peki, ISO dosyasını nerden temin edebiliriz? Bunun için dağıtımların resmi web sitelerine girip burdan indirmek istediğiniz sürümün sayfasına ulaşmanız gerekiyor. Biz bu yazımızda [Fedora Workstation](https://fedoraproject.org/workstation/download) kuracağız. Örneğin; [Linux Mint Cinnamon](https://www.linuxmint.com/edition.php?id=316) tercih edecekler buradan indirebilir.

#### Bootable USB Bellek Hazırlamak
ISO dosyasını indirdikten sonra, USB belleğimizi hazırlamamız gerekiyor. Fedora özelinde bu durum oldukça kolay. [Fedora WorkStation Download](https://fedoraproject.org/workstation/download) sayfasına girdiğinizde, sol tarafda **"Fedora Media Writer"** isimli yazılımın indirme bağlantılarını görebilirsiniz. Bu yazılımla dilerseniz ISO dosyasını ayrı olarak indirmeye gerek kalmadan, direkt olarak indirip USB belleğinizi hazırlayabiliyorsunuz. Programın kullanımı oldukça basit. ISO dosyanızın yolunu belirterek, kolay ve kısa bir sürede "Bootable Disk" hazırlığınızı tamamlayabiliyorsunuz. 
> ⚠️ _Burada benim önerim yazılımla indirmek yerine, ISO dosyasını ayrı olarak indirmeniz yönünde olacaktır. Aksi takdirde eksik inebilecek dosyalar yüzünden kurulum aşamasında sorunlar yaşayabilirsiniz._

Farklı GNU/Linux dağıtımlarını tercih edecek olan kişiler için bu aşamada ilgili dağıtımın dökümanlarını incelemelerini tavsiye ediyorum. Örneğin; Linux Mint'in [Create the bootable media](https://linuxmint-installation-guide.readthedocs.io/en/latest/burn.html) sayfasında, [Etcher](https://etcher.balena.io/) isimli bir yazılım önerisinde bulunuyor ve izlemeniz gereken yönergeler detaylı bir şekilde belirtiliyor. 

> 🗃️ Kuruluma geçmeden önce, bir önceki işletim sisteminde bulunan önemli dosyalarınızı **yedeklemenizi** şiddetle tavsiye ediyorum! 

### BIOS Ayarları
Kurulumu yapabilmek adına, BIOS ekranında ayarlamalar yapmamız gerekiyor. Bunun için öncelikli olarak bilgisayarınızda BIOS ekranına nasıl giriş yapılabildiğini öğrenmeniz gerekiyor. Çoğu anakart için BIOS ekranına giriş tuşu **"F2"** fonksiyon tuşudur. Bilgisayarınızı tamamen kapatıp, tekrardan açma tuşuna bastıktan hemen sonra bir kaç defa "F2" tuşuna spam atarak 😅 genelde BIOS ekranına giriş sağlayabilirsiniz. 

BIOS ekranında herhangi bir USB mouse çalışmaz. Eğer laptop kullanıcısıysanız genelde optik mouse kullanılabilir. Bunun haricinde tüm ayarlamaları klavye üzerinden yapmamız gerekiyor. 

BIOS ekranında "Bootable Device" kısmını bulmanız gerekiyor. Bu kısım yine her BIOS'da aynı yerde bulunmuyor. Ancak direkt olarak açılan ana ekranda genelde bulabiliyorsunuz. Bu kısmı bulduktan sonra muhtemelen ilk sırada "HDD" olduğunu göreceksiniz. Burada **"USB"**'yi ilk sıraya almalıyız. Bunun için BIOS ekranının en altında bulunan tuş yönergelerini takip edebiliriz. Ayarımızı yaptıktan sonra "F10" tuşuna basarak kaydedip BIOS'dan çıkabiliriz. 

---
### Fedora Live Test
BIOS ayarımızı yaptıktan sonra bilgisayarımız kapanıp tekrardan açılacaktır. Açılan bilgisayarımızda ise bizleri _"GRUB"_ ekranı karşılayacaktır. Burada bulunan "Test" seçeneğiyle dilerseniz ISO dosyasınızı önden bir testten geçirebilirsiniz. Bende bu test aşaması hata verdi. Direkt olarak "Start Fedora Live ISO" seçeneğine geçtim. 

Bu aşamada dilerseniz Fedora'yı canlı bir şekilde test edebiliyorsunuz. Test esnasında ufak tefek performans düşüklüğü yaşamanız gayet doğal! Zira şuanda USB bellek üzerinden boot edilen bir işletim sistemi kullanıyorsunuz. Bu performans sorunlarının direkt olarak USB belleğinizin yazma hızına göre değişeceğini unutmayın. Ancak yine de bazı sürücülerinizin testini yapabilir, yüklü olarak gelen uygulamaları falan kontrol edebilirsiniz. Örneğin; benim ilk yaptığım iş hoparlör sürücülerini kontrol etmek ve denemek olmuştu. 😅

### Sonunda Fedora Kurulumu! 
Testleri yaptıktan sonra, ekrandaki "Dock" üzerinde yer alan **"Install to Hard Drive"** yazılımını çalıştırmanız gerekiyor. 

Yazılımı çalıştırdığınızda artık kalıcı olarak HDD'nize Fedora kurulumuna geçmiş oluyorsunuz. Dil seçimi gibi basit ayarları zaten kolaylıkla yapabilirsiniz. Bu aşamada kafanızı karıştıran tek seçenek disk aşaması olacaktır. Kaldı ki benim de bir tık kafamı karıştırdı.😑 Ancak ben komple diski silip, sıfırdan bir kurulum yapacağım için herhangi bir endişem olmadı. Direkt tüm diski silerek kurulum gerçekleştirdim. Nasıl yaptığımı görmek isteyenler [buradan](https://youtu.be/4wzRKargwXA?si=4r1TVLz_Ukw_xvT3&t=995) seyredebilir. 

Disk biçimlendirme ayarlarından sonra, kuruluma direkt olarak başlayabilirsiniz. Kurulum, donanımınızın özelliklerine bağlı olarak biraz sürecektir. 

> ‼️ Kurulum sonrasında bilgisayarınızı kapatıp, tekrardan BIOS ekranına dönerek "Bootable Device" kısmını **"HDD"** olarak ayarlamayı unutmayın. 

Bu işlemleri yaptıktan sonra artık bilgisayarınızı Fedora veya _tercih ettiğiniz GNU/Linux_ dağıtımıyla kullanmaya başlayabilirsiniz. Keyfini çıkarın. 🤓



