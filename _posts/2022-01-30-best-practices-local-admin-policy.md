---
layout: post
title: Best Practices Local Admin Group  Policy
date: 2022-01-30 01:14
author: theguler
comments: true
categories: [Windows Group Policy GPO]
---
<!-- wp:image {"id":1155,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/gpo_logo.jpg?w=439" alt="" class="wp-image-1155" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Domain ortamında bulunan Bilgisayarların (Yerel) Local Gruplarına gerek kurulum gerek Destek Masası görevinde bulunacak, yeri geldiğinde yedekleme yapacak ve benzeri işler için bazı kullanıcılar eklememiz gerekebiliyor, bu durumda şirketimizdeki  bütün bilgisayarları tek tek gezmek yerine Group Policy ile bu işlemi hem zaman, hem de iş yükünü azaltarak yapabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Group Policy Management üzerinde yeni policy oluşturalım - </p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1165,"width":829,"height":261,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/la.png?w=1024" alt="" class="wp-image-1165" width="829" height="261" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Sırası ile&nbsp;<strong>Computer Configuration</strong>&nbsp;=&gt;&nbsp;<strong>Prefences</strong>&nbsp;=&gt;&nbsp;<strong>Control Panel Settings</strong>&nbsp;=&gt;&nbsp;<strong>Local User and Group</strong>&nbsp;yoluna gidelim. - </p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1168,"width":675,"height":539,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/la0-2.png?w=998" alt="" class="wp-image-1168" width="675" height="539" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Açılan ekranda Sağ tıklayıp&nbsp;<strong>New</strong>&nbsp;=&gt;&nbsp;<strong><strong>Local Group</strong>’u</strong>&nbsp;tıklıyoruz. Dilerseniz <strong>Local User</strong> da oluşturabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Action: Create(oluştur)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Action: Update(güncelle)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Action: Replace(değiştir)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Action: Delete (sil)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu kısımda Client'ler üzerindeki Local Grupları görüyoruz. Bu gruplara kullanıcı ekleyip, silecek veya güncelleyeceğiz. biz grupların içini güncelleyeceğimiz için <span style="text-decoration:underline">Update </span>seçiyoruz. <span style="text-decoration:underline">Members</span> kısmında bize bu gruplara kimleri dahil edeceğimizi soracaktır. Ben Yedekleme Operatörü grubuna <strong>Zeliha KISAOĞLU </strong>' nu ekledim.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p> </p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1171,"width":842,"height":356,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/la01.png?w=1024" alt="" class="wp-image-1171" width="842" height="356" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Aşağıdaki resimde görüldüğü gibi Policy 'ler oluşturuldu.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>(Local administrators Backup Operatör, RDP yapacak kişiler vb.)</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1175,"width":863,"height":343,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/la1.png?w=1024" alt="" class="wp-image-1175" width="863" height="343" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":1185,"width":865,"height":430,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/l2-1.png?w=987" alt="" class="wp-image-1185" width="865" height="430" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Son olarak ekranı kapatarak Policy 'i uygun OU altına alıp link edelim. artık clientler üzerinde görebiliriz. yaptığımız değişikliği kaldırmak için policyleri silmek veya devre dışı bırakmak yetkileri kaldırmayacaktır, bunun için policy üzerinde delete Actionu vererek tekrar oluşturmak gerekir. Clientler policyleri aldıktan(<strong>Zeliha KISAOĞLU</strong> backup operator grubundan çıktıktan sonra) policy 'i silebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 id="bu-islemin-bir-benzerini-bir-sonraki-makalede-restricted-groups-policy-ile-yapacagiz">Bu işlemin bir benzerini  bir sonraki makalede Restricted Groups Policy&nbsp;ile yapacağız...</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Sağlıcakla...</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
