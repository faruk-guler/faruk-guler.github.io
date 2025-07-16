---
layout: post
title: VMware Appliance Management NTP
date: 2021-12-31 09:26
author: theguler
comments: true
categories: [Vmware Virtualization]
---
<!-- wp:paragraph -->
<p>VMware Appliance Management arayüzü, NTP (Network Time Protocol) değişikliği yapmanın iki popüler yönteminden biridir. Bu yöntem, VMware sanallaştırma platformunun yönetim arayüzü üzerinden yapılabilmektedir. Aşağıdaki adımları takip ederek NTP değişikliği yapabilirsiniz:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Vcenteradresi.domain.local:5480</strong> adresine giderek giriş yapıyoruz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":845,"width":644,"height":377,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/as4.png?w=1024" alt="" class="wp-image-845" width="644" height="377" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>"Time" sekmesinde, NTP ayarlarının yanında yer alan "Time Zone" bölümünün düzenlemesi için "Edit" seçeneğine tıklamanız gerekmektedir. Karşınıza bölgesel zaman dilimlerinin listelendiği bir pencere çıkacaktır. Buradan, kullanmak istediğiniz zaman dilimini seçtikten sonra "Save" düğmesine tıklayarak değişiklikleri kaydedebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":846,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/as2-1.png?w=1024" alt="" class="wp-image-846" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Time Zone’un sağında bulunan EDIT’e tıkladığımızda bölgesel olarak bir Zone belirtmemizi istiyor. Seçimi yaptıktan sonra Save diyoruz,</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":849,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/as3.png?w=650" alt="" class="wp-image-849" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>"Time Synchronization Settings" bölümüne erişmek için, "Time" sekmesindeki "Edit" düğmesine tıkladıktan sonra, açılan penceredeki bu bölüme tıklayın. Bu bölümde, VMware sanallaştırma platformunda yer alan tüm sanal makinelerin saatlerinin senkronizasyon ayarları yapılabilmektedir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Eğer bölgesel zaman dilimini doğru bir şekilde belirlediyseniz ancak saatler hala uyumsuzsa, senkronizasyon sorunu mevcut olabilir. Bu durumda, NTP seçeneğini kullanarak NTP sunucu adreslerini girerek senkronizasyon sorununu çözebilirsiniz. NTP sunucularını girerken, her bir adresi virgülle ayırarak yazmanız gerekmektedir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Eğer senkronizasyon sorunu yoksa, "Disabled" seçeneğini işaretleyebilirsiniz. vCenter'ın bağlı olduğu Host'un halihazırda bir NTP konfigürasyonu varsa, "Host Mode" seçeneğini işaretleyerek kaydedebilirsiniz. Bu durumda, vCenter otomatik olarak Host'un NTP ayarlarına göre güncellenecektir.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":850,"width":724,"height":422,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/as1.png?w=1024" alt="" class="wp-image-850" width="724" height="422" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>"Time Servers" bölümü, sanal makinenin saatini senkronize etmek için kullanılacak NTP sunucularını belirlemek için kullanılır. Burada, "Use specific NTP servers" seçeneğini işaretleyerek, hedef bir sunucu veya sunucuların IP adreslerini girerek sanal makinenin saatini bu sunuculara senkronize etmesini sağlayabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Örneğin, siz Domain Controller sunucularınızın IP adreslerini girerek sanal makinenizin saat konfigürasyonunu bu sunucular üzerinden almaya başlayabilirsiniz. Böylece, sanal makinenin saati, domain kontrolleriniz tarafından yönetilen saatle senkronize olacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
