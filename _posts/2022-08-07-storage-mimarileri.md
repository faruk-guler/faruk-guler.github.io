---
layout: post
title: About Storage Architectures Storage Mimarileri
date: 2022-08-07 01:50
author: theguler
comments: true
categories: [Storage]
---
<!-- wp:image {"id":3740,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/nas.jpeg?w=1024" alt="" class="wp-image-3740" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>1- <span style="text-decoration:underline">Local Disk:</span></strong> Sabit disk&nbsp;ya da&nbsp;Hard(ware) disk&nbsp;kısaca&nbsp;HDD&nbsp;ya da SSD veri depolanması&nbsp;amacı ile kullanılan manyetik kayıt ortamlarıdır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>2</strong>- <strong><span style="text-decoration:underline">NAS</span> (Network Arae Storage)</strong> Bir network hatları üzerinden TCP/IP üzerinden sunucuların storage e ulaşması işlemi demektir. Genelde küçük ve orta yapıdaki kurum ve işletmelerde kullanılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>NAS</strong> <strong>Cihazı: </strong>Web arayüzü ile lunlara erişip configure ederek kullandığımız fiziksel cihazdır. sunucularınızı network üzerinden bu storage bağlarız.bu cihazında en az 2 nic kartı olması ve hızlı olması istenir ve yedeklilik adına teaming yapılması önerilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>3- <span style="text-decoration:underline">SAN:</span> (Storage Area Network)</strong> Tamamen kendi altyapısı kullanır. NAS sistemlere göre daha hızlı ve stabildir. TCP/IP Switchleri ve Network altyapısı kullanmaz. tamamen storage üzerine dizayn edilmiş en üst Segment altyapı olduğu söylenebilir. NAS'tan en büyük farkı network altyapısı kullanmaz tamamen kendi SAN switchde denilen kendi altyapısını kullanır. <strong>HBA</strong>(Host Bus Adapter) adı verilip sunucular üzerine takılan farklı kartlar kullanır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-(FC) <strong>Fibre Channel&nbsp;</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-(GbE) <strong>Gigabit Ethernet&nbsp;Adaptor</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>SAN</strong> <strong>Cihazı-Sistemleri:</strong> üzerinde 2 tane controller vardır. TCP/IP Switchleri ve Network altyapısı kullanmaz bu sebeple bir <strong>ip adreside yoktur.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>4- <span style="text-decoration:underline">VSAN</span>:</strong> <strong>(Virtual Storage Area Network)</strong> Bir software yardımıyla Fiziksel Disklerden ortak sanal bir storage yaratılmasıdır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>5</strong>- <strong>DAS:</strong> <strong>(Direct Attached Storage)</strong> Bir bilgisayar ağı üzerinden erişilen depolamanın aksine, kendisine erişen bilgisayara doğrudan bağlı dijital depolamadır. DAS, harici bir muhafaza içindeki sabit sürücüler, katı hal sürücüleri, optik disk sürücüleri gibi bir veya daha fazla fiziksel depolama biriminden oluşur.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>RAID</strong>: <strong>(Redundant Array of Independent Disks)</strong> sabit sürücülerde veri okuma ve yazma için birden fazla sabit sürücüyü aynı anda farklı şekillerde kullanarak yapılan veri depolama yapılandırmasıdır. RAID, tek bir mantıksal sürücüyü, çoklu diskler üzerinde birleştirir. Bu şekilde işletim sistemi birçok farklı sabit disk görmek yerine sadece bir tane görür. Tek sürücüye göre RAID kombinasyonları; veri bütünlüğünü/güvenliğini sağlar, hata toleransını azaltır, verileri korur, performansı ve disk kapasitesini arttırır. <strong>Yazılımsal ve Donanımsal </strong>olarak <strong>ikiye </strong>ayrılırlar. Yazılımsal raid, ek bir donanıma ihtiyaç duymayacağı için genellikle Windows işletim sistemlerinde kullanılır. Donanımsal raid için ise, bir raid kartı gerekir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Raid tipleri genel olarak:</strong> Raid0 , Raid1 , Raid5 , Raid6, Raid10, Raid50 seklindedir. Toplamda 13 adet raid tipi bulunmaktadır.&nbsp;</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":3937,"width":736,"height":344,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/das-nas-san.webp?w=1024" alt="" class="wp-image-3937" width="736" height="344" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Umarım faydalı olmuştur. – Best regards.</strong></p>
<!-- /wp:paragraph -->
