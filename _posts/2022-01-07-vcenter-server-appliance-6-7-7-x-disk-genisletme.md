---
layout: post
title: VMware vCenter Server Appliance 6.7, 7.x Disk Genişletme
date: 2022-01-07 14:50
author: theguler
comments: true
categories: [Vmware Virtualization]
---
<!-- wp:paragraph -->
<p>Bu yazımızda sizlere vCenter Server Appliance üzerinde nasıl disk genişletme yapıldığını anlatacağız.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Öncelikle disk denişletme sürekli kullanılmamaktadır, ihtiyaç duyulduğu zamanlarda arayüzden gerekli kadar arttırılarak terminal üzerinde açılması gereklidir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Disklerimizin durumunu iki yerden kontrol edebiliriz.</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>Putty yardımı ile consol üzerinden vCenter Server Appliance’ımıza bağlanarak df -h komutu ile görebilirsiniz</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Web arayüzünden https://vcenter_fqdn:5480 bağlanarak monitör disk tabından görebilirsiniz</strong>.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Disk açma işlemi yapılmadan önce her ihtimale karşı <span style="text-decoration:underline">Config</span> alınması gerekir!</strong></li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:image {"id":950,"width":571,"height":423,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/a2.png?w=681" alt="" class="wp-image-950" width="571" height="423" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre id="block-212c4770-1090-40f9-a3aa-882bb19bd474" class="wp-block-preformatted">Puty or other terminal Aplication
1: shell
2: df -h</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":952,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/a1.png?w=1024" alt="" class="wp-image-952" /><figcaption class="wp-element-caption">yada üstteki gibi vCenter Server Appliance üzerinden görelim. <strong><a href="https://vcenter_fqdn:5480/">https://vcenter_fqdn:5480</a></strong></figcaption></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Artık genişletmek istediğimiz diski seçelim ve vSphere web client yardımı ile diskin boyutunu settings tabından arttırıyoruz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Ben 50 GB kapasitesi olan archive diskini 60 GB yükseltebiliriz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":954,"width":614,"height":498,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/disk_buyutme.jpg?w=847" alt="" class="wp-image-954" width="614" height="498" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre id="block-212c4770-1090-40f9-a3aa-882bb19bd474" class="wp-block-preformatted">1: vpxd_servicecfg storage lvm autogrow
2: VC_CFG_RESULT=0 başarılı ise bu sonucu göreceksiniz.
3: df -h
4: exit

Eğer başarılı olmazsa alttaki yeni versiyon(7.x) komutunu deneyebilirsiniz.
1: /usr/lib/applmgmt/support/scripts/autogrow.sh
2: df -h
3: exit</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":959,"width":596,"height":400,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ddd.jpg?w=1024" alt="" class="wp-image-959" width="596" height="400" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Web arayüzünden yada CLI üzerinden df -h komutunu çalıştırdığınızda diskinizin arttığını göreceksiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Saygılarımla. – Best regards.</p>
<!-- /wp:paragraph -->
