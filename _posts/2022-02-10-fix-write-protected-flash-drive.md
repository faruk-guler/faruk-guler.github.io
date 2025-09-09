---
layout: post
title: Write Protected Flash Drive &amp; Windows could not finish formatting
date: 2022-02-10 08:58
author: theguler
comments: true
categories: [3th Party / Tools]
---
<!-- wp:image {"id":1608,"width":615,"height":346,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/maxresd.jpg?w=1024" alt="" class="wp-image-1608" width="615" height="346" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Elinizdeki USB bellek yazma korumalı bir duruma geldiyse ve format atamıyorsanız, bazı durumlarda disk salt okunur hale de gelebilir. Bu sorunun sebebi, bellek çipi ve MCU'daki program arasındaki yapılandırma verilerinde meydana gelen hasarlardır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>MCU'nun model numarası öğrenildikten sonra, flashboot.ru ve usdev.ru gibi sitelerden uygun firmware ve yazma programını indirerek, yeniden yükleme işlemini gerçekleştirebilirsiniz. Ancak, bellek çipi ve MCU arasındaki yapılandırma verilerini yeniden düzenleyerek sorunun çözülmesini sağlayan bu işlem, bellekteki tüm verileri siler. Bu nedenle, işlemi gerçekleştirmeden önce mutlaka verilerinizi yedeklemenizi öneririm.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Ayrıca, bu işlem sırasında bir hata yapmanız durumunda USB bellek tamamen kullanılamaz hale gelebilir. Bu nedenle, işlemi yapmak için tecrübeli bir kullanıcı veya teknik destek almanız daha doğru olacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Sandisk </strong>markasının kendi ürünleri ile ilgili firmware ve yazma programlarını pek paylaşmadığı için uygun firmware bulamayabilirsiniz. Ancak, genel olarak üreticinin kendi web sitesinde veya destek sayfasında, yazılım ve firmware güncellemeleri bulunabilir. Bu nedenle, öncelikle üreticinin web sitesini kontrol etmeniz de fayda var.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>USB belleğin yazma koruması sorununu çözmek için öncelikle içini açmadan veya ChipGenius ve Phison GetInfo gibi programları kullanarak belleğin MCU model numarasını öğrenebilirsiniz. Daha sonra flashboot.ru veya usdev.ru gibi sitelerden uygun firmware ve yazma programını indirip belleğin yazma koruması sorununu çözebilirsiniz. Ancak Sandisk marka ürünler için kendi firmware ve yazma programlarını paylaşmadıkları için uygun firmware bulmak zor olabilir. <strong>Phison GetInfo</strong> virüslü olduğu içinde paylaşmayı uygun görmedim.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>https://github.com/faruk-guler/Programlar-Programs/blob/main/GetInfo_v3.12.0.2.rar</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>https://flashboot.ru/iflash/</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1618,"width":498,"height":228,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/fhjh.png?w=480" alt="" class="wp-image-1618" width="498" height="228" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Sağlıcakla – Best Regards</strong></p>
<!-- /wp:paragraph -->
