---
layout: post
title: Domaine Alma Limitinin Arttırılması
date: 2021-12-20 17:00
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:paragraph -->
<p>Domain ortamında varsayılan olarak standart bir kullanıcının en fazla 10 bilgisayarı domaine dahil edebilmesi mümkündür. Ancak bu sayı yetersiz kalabilir ve kullanıcıların ihtiyaçlarına göre arttırılması gerekebilir. Bu durumda <strong>ADSIEdit konsolu</strong> kullanılarak yapılan bir değişiklikle <strong>"ms-DS-MachineAccountQuota"</strong> değeri arttırılabilir. Bu değer varsayılan olarak 10 olarak belirlenmiştir ancak ihtiyaçlar doğrultusunda arttırılabilir. Yapılacak olan işlem, Default naming context altında yer alan <strong>DC=guler.com </strong>yazan bölümün üzerinde sağ tıklayarak Properties seçeneğine tıklamak ve burada <strong>"ms-DS-MachineAccountQuota" </strong>değerini düzenlemektir.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":724,"width":624,"height":379,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dd.png?w=1024" alt="" class="wp-image-724" width="624" height="379" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Bu ayarlama tüm domain kullanıcıları için geçerlidir. Eğer bunu <strong>Group Policy </strong>yaparak sadece belli bir gruba ve kişilere (işletmen yada Personel) atamak istersek <strong>ms-DS-MachineAccountQuota</strong> değerini  <strong>0 yada 1</strong> yaparak standart kullanıcıların domaine katma yetkisini kısıtlayabiliriz. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Group Policy Manager üzerinde <strong>Default Domain Policy</strong>’ i açalım.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Computer Configuration &gt; Policies &gt; Windows Settings &gt; Security Settings &gt; Local Policies içerisinde User Rights Assigment</strong> kısmını açınız. Sağ tarafta <strong>“Add Workstations to domain”</strong> kısmını açarak yetkili grubu veya kişileri ekleyelim..</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":727,"width":896,"height":450,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/cdgf.png?w=1024" alt="" class="wp-image-727" width="896" height="450" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Yararlı Olması dileğiyle. -  Hope it's useful.</strong></p>
<!-- /wp:paragraph -->
