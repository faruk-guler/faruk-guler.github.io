---
title: "Fedora Kurulumu Sonrası Yapılacaklar"
date: 2024-11-18
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
description: "Fedora kurulumu sonrasında yapılacaklar hakkında önerilerimin yer aldığı yazım."
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
Merhabalar, daha önce Fedora dağıtımını kişisel bilgisayarınıza nasıl kurabileceğinizle ilgili basit bir videolu anlatım yazısı hazırlamıştım. Bknz.[Fedora 41 Nasıl Kurulur? Adım Adım Kurulum Rehberi](https://furkanyilmaz.me/posts/fedora-41-nasil-kurulur/) Bu yazımdaysa Fedora kurulumu sonrasında basit anlamıyla yapmamız gerekenler veya yapabileceğimiz opsiyonları konu almayı planlıyorum. Özellikle Windows'dan GNU/Linux ortamlarına geçiş yapan kişiler için bu durumu şuna benzetebilirsiniz; Windows bilgisayarınıza yeniden kurulum (genelde "Format" olarak bilinir) yapıldığında, sonrasında bazı ayarlamaları yapmak, sürücüleri kurmak, gerekli yazılımları kurmak gibi çalışmalar yapmak zorundayızdır değil mi? İşte GNU/Linux dağıtımlarında sürücü kurulumları haricinde (NVIDIA şart) bu aşamayı çok daha kişiselleştirilebilir bir şekilde yapabiliyorsunuz.

## Fedora 41 Kurulumu Sonrası Yapılacaklar - YouTube
{{< youtube xpULiWdva8s >}}

### Sistem ve Yazılım Güncelleştirmeleri 
Her ne kadar tercih ettiğiniz dağıtımın son sürümünü, resmi websitesi üzerinden indirmiş olsanız dahi yeni kurulum yaptığınız işletim sisteminin güncel olamayabileceğini unutmamalısınız! Elbette, güncel bir sürümü kullanmak hem işlevsellik hem de güvenlik zaafiyeti vermemek adına (çoğu zaman) daha iyidir. Bu yüzden Fedora kurulumu sonrasında da ilk iş olarak sistem ve yazılım güncelleştirmelerini yapmanız kesinlikle öneriyorum. Peki, bu güncelleştirmeleri nasıl yapabilirsiniz? 

Günümüzde popüler olan birçok dağıtım artık içerisinde kolay kullanıma sahip bir yazılım mağazası da barındırıyor. İşlevsel bir arayüze sahip olan bu mağaza üzerinden çoğu zaman güncelleştirmeleri sorunsuz bir şekilde yapabiliyorsunuz. Ancak gel gelelim Linux kullandığını sonuna kadar hissetmek isteyenler için benim önerim _"Terminal"_ kullanmak olacaktır.

Terminal üzerinden güncelleştirmelerinizi yapabilmek için öncelikli olarak _"Terminal (Uçbirim) Yöneticinizi"_ açmanız gerekiyor. Daha sonrasında Fedora özelinde _"DNF"_ paket yöneticisi kullanıldığı için şu komutla güncelleştirmeleri başlatabilirsiniz; 

```properties
sudo dnf update
```

Eğer farklı bir paket yöneticisi kullanıyorsanız bu komutu ona göre düzenlemeniz gerekir. Debian tabanlı dağıtımlarda genelde "APT" paket yöneticisi kullanıldığından bu güncelleştirme komutu genelde şöyle olur; 

```properties
sudo apt update
```

### Terminal Kısayolu Atamak 
Popüler dağıtımlar incelendiğinde artık birçok işlemin, terminal kullanımı olmadan yapılabildiği görülebilir. Gün geçtikçe de GNU/Linux sistemleri son kullanıcıya daha uygun bir şekilde optimize edilmeye devam ediliyor. Ancak şuanda şöyle de bir gerçek var ki; eğer orta/ileri düzey bir bilgisayar kullanımına sahipseniz GNU/Linux sistemlerinde terminal kullanımı şart! Bu yüzden ben de şimdiden tüm işlemlerimi terminal üzerinden halletmeye çalışıyorum ve ilk işlerimden birisi terminale kısayol tuşu atamak oldu. 

Fedora özelinde araştırmalar yaptığımda terminale erişmek için varsayılan olarak herhangi bir kısayol tuşunun atanmamamış olduğunu gördüm. Ya da böyle bir durum varsa da ben bulamadım. Bu yüzden Ayarlar>Klavye>Kısayolları Gör ve Özelleştir>Özel Kısayollar aşamalarını izleyerek kendime bir kısayol oluşturdum. 

>⚠️ İnternet üzerinden birçok kaynakta kısayol tuşu atanırken kullanılması gereken komutun "gnome-terminal" olduğu yazıyor. Ancak Fedora 41'de varsayılan terminal yazılımı **"ptyxis"** olarak geliyor. (En azından benim için) Bu yüzden terminal kısayolu atarken komut satırına bu şekilde belirtmeniz gerekli.  

Ben kendi çalışma düzenime göre "Ctrl+Alt+T" tuş kombinasyonunu terminal kısayolum olarak atadım. Sizler kendi düzeninize göre bir tuş kombinasyonu belirleyebilirsiniz.

### NVIDIA Driver Kurulumu 
GNU/Linux popüler işletim sistemlerinde, donanım sürücüleri hali hazırda kernel içerisinde yüklü bir şekilde geliyor. Eğer çok eski donanımlara sahip değilseniz veya henüz çok yeni olan bir donanım kullanmıyorsanız, genellikle herhangi bir şekilde sürücü yazılımı yüklemenize gerek kalmıyor. Ancak bu durum grafik sürücüleri için her zaman geçerli olmuyor. Eğer grafik donanımınız (ekran kartı) Intel veya AMD tabanlıysa, yine herhangi bir şekilde dışarıdan müdehale olmadan Linux çekirdeği içerisinde sürücüleriniz hazır olarak gelecektir. Ancak NVIDIA grafik donanımları kullanıyorsanız çok büyük ihtimalle ekstra yazılım kurmanız gerekecektir.

> ✅ Bazı kaynaklarda belirtildiği ve ilk akla gelen seçenek olan NVIDIA'nın resmi websitesine girerek donanım sürücülerini kurmak, sürücülere gelecek olan güncellemelerin takibi ve kurulumunu pek mümkün kılmıyor. Bu yüzden paket yöneticilerinin uygun NVIDIA donanım sürücülerini tercih etmeniz çok daha pratik bir çözüm olacaktır. 

NVIDIA sürücülerini bilgisayarınıza nasıl kurabileceğinizi öğrenmek için _"How to install NVIDIA driver on (dağıtımınız)"_ şeklinde bir aramayla araştırabilirsiniz. Çünkü dağıtımlar arasında farklı aşamalar olabiliyor. 

### RPM Fusion ve Üçüncü Parti Depo Kurulumu
Fedora özelinde konuşursak, varsayılan olarak üçüncü parti depolar kurulu olarak sisteminizde bulunmuyor. Fedora 41 kurulumunda, bir aşamada bana üçüncü parti yazılım depoları konusunda bir seçenek sunmuştu. Dilerseniz bunu kurulum aşamasında da aktif edebiliyorsunuz. Ancak ben kurulum aşamasında istemediğimden dolayı, sonradan yüklemek zorunda kaldım. Fedora'da _"Yazılımlar"_ isimli yazılım mağazasını açtığınızda sol üst köşedeki _üç çizgi_ butonuna tıkladığınızda "Yazılım Depoları" kısmından dilediğiniz üçüncü parti yazılım deposunu aktif edebiliyorsunuz. Bir diğer seçenek ise terminal üzerinden kurulum yapmak. Onun için de RPM Fusion özelinde komutlar şöyle;

```properties
sudo dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm
sudo dnf install https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```

### Multimedia Eklentilerini Kurun 
Fedora kurulumu sonrasında özellikle bilgisayarınızdaki video dosyalarını açarken veya internet üzerinden videoları oynatırken bazı sorunlarla karşılaşabilirsiniz. Bu sorunları çözmek için multimedia eklentilerini kurmanız gerekiyor. Bunun için "VLC" kurulumu yeterli olacaktır. VLC beraberinde birçok codec ile gelir. Bunun için terminal üzerinde şu komutu çalıştırabilirsiniz; 

```properties
sudo dnf install vlc
```

### Aygıt Adınızı Değiştirin 
Fedora kurulumu sonrasında aygıt adınız, varsayılan olarak random bir şekilde belirleniyor. Ancak aygıt adınızı kendinize göre değiştirmeniz elbette daha iyi olacaktır. Bunun için terminal üzerinde çalıştıracağınız komut şu şekilde; 

```properties
sudo hostnamectl set-hostname "Aygıt Adınız"
```

Terminal kullanmadan değiştirmek içinse; Ayarlar>Sistem>Hakkında>Aygıt Adı aşamalarını yaparak değiştirmeniz mümkündür. 

### Kullanacağınız Yazılımları Kurun 
Sizlere bir diğer önerim ise kullanacağınız yazılımları kurmanız yönünde olacak. Fedora özelinde konuşursak, ihtiyacınız olan tüm yazılımlar elbette sistemle birlikte kurulu olarak gelmiyor. Sadece Mozilla Firefox, Libre Office gibi basit bilgisayar yazılımlarına erişebiliyorsunuz. Windows üzerinde kullanmış olduğunuz yazılımların Linux versiyonlarının olup olmadığını kontrol edebilirsiniz. Bu yazılımların Linux versiyonları eğer yoksa, farklı ama aynı işlevde olan yazılımlar elbette bulunabilir. Ancak bu konuda biraz araştırma yapmak gerekiyor. Yazılımları kurmak için yine "Yazılımlar" mağazası veya terminal kullanılabilir. 

>✅ Eğer Windows üzerinde kullandığınız bir yazılımın alternatifi yoksa "Wine, Bottles" gibi yazılımlarla bunları Linux üzerinde çalıştırmayı denemeniz de bir çözüm olabilir. Bununla ilgili ilerleyen zamanlarda bir yazı hazırlayacağım elbette. 

>⚠️ Adobe programlarını Linux üzerinden çalıştırmak bazen oldukça sorunlu olabiliyor ve çoğu zaman işlevsel olmuyor. Bu yüzden misal Adobe Photoshop alternatifi olan **GIMP**, Adobe Illustrator alternatifi olan **Inkscape**, Adobe After Effects alternatifi olan Natron, Adobe Premiere alternatifi KDENLIVE veya Davinci Resolve gibi uygulamalar tercih edilebilir. Bir diğer seçenek ise Linux yanında sırf Adobe benzeri durumdaki programlarınız için Windows kurulu yapmanız olacaktır. 

### GNOME Eklentilerini Yapılandırabilirsiniz 
GNU/Linux işletim sistemlerinin en büyük avantajlarından birisi kendi donanımınız ve zevklerinize göre kişiselleştirmeler yapabilmenizdir. Fedora 41 varsayılan olarak GNOME masaüstü kurulu olarak geliyor. Ancak dilerseniz sonradan KDE gibi farklı masaüstü ortamlarına da elbette geçiş yapabiliyorsunuz. GNOME özelinde kişiselleştirmeleri yapabilmeniz için terminal üzerinden şu komutu çalıştırmanız gerekiyor;

```properties
sudo dnf install gnome-tweaks gnome-extensions-app 
```
Bu sayede GNOME için "İnce Ayarlar" yazılımıyla bazı kişiselleştirilebilir ayarlar yapabilirsiniz. Aynı zamanda [GNOME Extensions](https://extensions.gnome.org/) sayfasından işlevsellik açısından hoşunuza giden eklentileri bulup kurabiliyorsunuz. 

### Ekran Kilidi ve Güç Ayarlarını Yapılandırın 
Özellikle laptop kullanıcıları için bunu kesinlikle öneriyorum! Ayarlar>Güç sekmesinden veya ekranın sol üst kısmında bulunan bar üzerinden erişebileceğiniz ekrandan, güç ve ekran kilidi ayarlarınızı kendi kullanımınıza göre ayarlayabilirsiniz.

Sonuç olarak GNU/Linux dünyası, oldukça geniş bir yapıya sahip. Farklı dağıtımları, masaüstü ortamlarını ve bunları dilediğiniz gibi optimize etme özgürlüğüne sahip oluyorsunuz. Bu yazıda ve videomda sadece basit anlamda kurulum sonrası neler yapılabilir ona değinmeye çalıştım. Umarım faydalı olmuştur... 