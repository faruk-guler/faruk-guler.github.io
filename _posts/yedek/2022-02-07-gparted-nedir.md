---
layout: post
title: GParted disk genişletme işlemi nasıl yapılır
date: 2022-02-07 22:20
author: theguler
comments: true
categories: [3th Party / Tools]
---
<!-- wp:paragraph -->
<p><strong>GPARTED&nbsp;(<em>Gnome Partition Editor</em>)</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1482,"width":328,"height":328,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/gnome-partition-editor.jpg?w=483" alt="" class="wp-image-1482" width="328" height="328" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>GParted (Gnome Partition Editor), GNU Genel Kamu Lisansı altında yayınlanan, açık kaynak kodlu bir disk bölümlendirme ve yönetim aracıdır. GParted, Linux, Windows ve diğer birçok işletim sistemi için kullanılabilen bir yazılımdır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>GParted, sabit disklerin bölümlendirilmesini, yeniden boyutlandırılmasını, biçimlendirilmesini, taşınmasını ve kopyalanmasını sağlar. Ayrıca, dosya sistemleri hakkında bilgi sağlar, ayrılmış bölümleri birleştirir, yeni bölümler oluşturur ve hatta birleştirir. GParted, işletim sisteminin ana bölümünü boyutlandırmak gibi riskli işlemleri gerçekleştirebilir, bu nedenle doğru şekilde kullanılmazsa verilerin kaybedilmesine neden olabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>GParted, bir USB sürücü veya CD/DVD üzerinden bir önyükleme disketi olarak kullanılabilir ve grafik kullanıcı arayüzü sayesinde, işlemler görselleştirilerek gerçekleştirilebilir. Program, kullanıcıların bölümlendirme işlemlerini daha kolay ve güvenli hale getirerek, kullanıcıların verilerini daha iyi yönetmelerine yardımcı olur. Ancak, herhangi bir disk yönetimi aracı gibi, GParted'ın kullanımı özenli ve doğru yapılmalıdır, aksi takdirde önemli veri kayıpları yaşanabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Hazırlanması - To Prepare</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>İlk olarak, GParted web sitesine gidin ve en son sürümü indirin. <a href="https://gparted.org/download.php">https://gparted.org/download.php</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>GParted sürümünü, indirdiğiniz ISO dosyasını bir CD/DVD ya da bir USB sürücüye yazmanız gerekiyor. İndirdiğiniz ISO dosyasını bir CD veya DVD'ye yazdırmak için uygun bir yazılım kullanabilirsiniz. USB sürücüye yazdırmak için ise Rufus, Universal USB Installer veya Etcher gibi ücretsiz araçlar kullanabilirsiniz.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Kullanılması - HOW TO USE</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Hazırladığınız CD ya da USB belleği bilgisayarınıza bağlayın.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Bilgisayarınızı bu CD ya da USB bellekten başlatın.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Bilgisayarı GParted CD/USB ile açtığınızda ilk olarak alttaki açılış ekranı sizi karşılar.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image {"id":1486,"width":630,"height":465,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/c1.png?w=665" alt="" class="wp-image-1486" width="630" height="465" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Burada enter tuşuna basarak devam ediniz. Devamında klavye düzeni ile seçeneklerin sunulduğu bir ekran gelir orada da Okey'leyip devam edebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Bir sonraki ekranda alttaki gibi, programı kullanmaya hangi dille devam etmek istediğimizi soracaktır.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image {"id":1489,"width":539,"height":432,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/c3.png?w=753" alt="" class="wp-image-1489" width="539" height="432" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Türkçe'yi seçmek için klvayeden 31 yazıp enter ile devam ediniz, ben ingilizce kullanmak istediğim için 33 seçiyorum.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Aşağıdaki gibi GParted canlı sistem masaüstü karşımıza geldi. Masaüstü açılır açılmaz, GParted programı da açılarak karşımıza gelecektir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image {"id":1491,"width":522,"height":376,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/c5.png?w=778" alt="" class="wp-image-1491" width="522" height="376" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Altta görüldüğü 142.22 MB kullanımda olan ext3 formatında 5.28 gb boyutunda LOG diskim bulunuyor ve bu diski dolduğu gerekçesiyle sonradan ekleme yaptığım 24.72 GB boyutundaki unallocated(ayrılmamış) diskimi' de ekleyerek toplamda 30 Gb boyutuna çıkaracağım. bu GUI alanı alanı olduğu için mause kullanabiliyoruz. ve seçmiş olduğum disk yeşil renkle çevreleniyor.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Ayrıca <strong>sağ üst köşede</strong> ise toplam boyutun 30 Gb olduğu yazmakta.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1493,"width":606,"height":338,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/c6.png?w=809" alt="" class="wp-image-1493" width="606" height="338" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>****Yapılacak yanlış bir işlem (sunucunuzu) kullanılmaz hale getirecektir!!!</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>*Her ihtimale karşın Snapchat veya Sistem yedeğimizin olduğundan emin olunuz!</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sonradan eklediğim <strong>Unallocated</strong> olan 24.72 Gb'lik alanı, LOGUSEDx9D.....  isimli log diskime eklemek için /dev/sda1 üzerinde <strong>Sağ Click </strong>ve <strong>Resize/Move</strong> yaparak yeniden boyutlandırıp genişleteceğim. bu kısmı windows dosya sisteminden biliyor olduğunuzu varsayıyorum.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Alt kısımda ise 24.72 GB boyutundaki alanımdan New diyerek yeni 2. diski oluşturabilirim.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1495,"width":593,"height":395,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/c7.png?w=813" alt="" class="wp-image-1495" width="593" height="395" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>yada alttaki gibi Format to Kısmından varolan diskimin formatını değiştirebilirim.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1497,"width":586,"height":375,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/c8.png?w=794" alt="" class="wp-image-1497" width="586" height="375" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":1499,"width":586,"height":452,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/c9.png?w=781" alt="" class="wp-image-1499" width="586" height="452" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Diskimi FAT32 Formatında 2Gb diskim isminde oluşturacağım.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1501,"width":645,"height":272,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/c12.png?w=773" alt="" class="wp-image-1501" width="645" height="272" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Değerleri elle doldurmak yerine <strong>yeşil bar çubuğunu</strong> ilerleterek tüm diski seçiyorum. ve <strong>Add </strong>diyorum.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1503,"width":647,"height":191,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/c13.png?w=813" alt="" class="wp-image-1503" width="647" height="191" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Görüldüğü yeni diskim gibi fat32 formatında 2.10 GB boyutunda 2Gb diskim adıyla oluşturulmak üzere hazırlandı.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Eğer tüm yapılanlardan eminsek ayrıca bir (snapchat veya sistem yedeğimizin olduğundan eminsek) orta kısımdaki YEŞİL onaylama butonu <strong>Appl</strong>y sekmesi ile yeni diskimizi oluşturuyoruz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1505,"width":561,"height":363,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/c14.png?w=631" alt="" class="wp-image-1505" width="561" height="363" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Görüldüğü gibi yeni diskimiz istediğimiz şekilde oluşturuldu.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1509,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/c13-1.png?w=794" alt="" class="wp-image-1509" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Yararlı olması dileğiyle - Best Regards.</strong></p>
<!-- /wp:paragraph -->
