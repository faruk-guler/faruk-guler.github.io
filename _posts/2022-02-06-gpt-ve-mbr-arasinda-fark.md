---
layout: post
title: GPT ve MBR arasındaki fark nedir?
date: 2022-02-06 18:51
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":1424,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/sabit-diskler.jpg?w=536" alt="" class="wp-image-1424" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>GPT (GUID Partition Table) ve MBR (Master Boot Record),</strong> bilgisayar sabit disklerinde bölümleme (partitioning) yöntemleri olarak kullanılan iki farklı disk bölümleme yöntemidir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>MBR, bilgisayarların ilk ortaya çıktığı dönemlerde kullanılmaya başlanmıştır ve 2 TB'a kadar sabit disklerde kullanılabilir. MBR, diskteki ilk sektöre kaydedilir ve disk bölümlerinin yerini ve boyutunu tutar. Ancak MBR'nin sınırlamaları vardır, örneğin yalnızca dört birincil bölüm veya üç birincil ve bir genişletilmiş bölüm oluşturulabilir. Ayrıca, her bir bölüm maksimum 2 TB boyutunda olabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>GPT, MBR'nin sınırlamalarını aşmak için geliştirilmiştir. GPT, diskteki ilk sektörden değil, disk sonundaki bir alanı kullanır. Bu nedenle, daha büyük disklerde kullanılabilir ve disk bölümlerinin sayısı sınırlı değildir. GPT, yüzlerce bölüm oluşturulmasına izin verir ve her bir bölümün boyutu terabaytlarla ifade edilebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Ayrıca, GPT diskleri, MBR diskleri için gereken önyükleme koduna ihtiyaç duymazlar. Bunun yerine, UEFI (Unified Extensible Firmware Interface) firmware tarafından önyükleme yapmak için kullanılan özel bir sistem bölümüne sahiptirler. Bu nedenle, UEFI uyumlu sistemlerde GPT diskleri kullanmak önerilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Özetle, MBR diskleri daha eski ve küçük sabit disklerde kullanılırken, GPT diskleri daha yeni ve büyük sabit diskler için tercih edilir.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"anchor":"mbr-nedir"} -->
<h2 class="wp-block-heading" id="mbr-nedir"><strong>MBR nedir?</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>MBR (Master Boot Record), bilgisayarların sabit disklerinde bölümlendirme (partitioning) yöntemleri olarak kullanılan bir disk bölümleme yöntemidir. MBR, diskteki ilk sektöre kaydedilir ve disk bölümlerinin yerini ve boyutunu tutar. Ayrıca, önyükleme sürecinde kullanılan önyükleme kodunu da içerir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>MBR, bilgisayarların ilk ortaya çıktığı dönemlerde kullanılmaya başlanmıştır ve halen yaygın olarak kullanılmaktadır. Ancak MBR'nin bazı sınırlamaları vardır. Örneğin, yalnızca dört birincil bölüm veya üç birincil ve bir genişletilmiş bölüm oluşturulabilir. Ayrıca, her bir bölüm maksimum 2 TB boyutunda olabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>MBR, Windows işletim sistemlerinde varsayılan disk bölümleme yöntemidir. Ancak, daha büyük disklerde veya çok sayıda bölüm oluşturulması gereken durumlarda, GPT (GUID Partition Table) disk bölümleme yöntemi kullanılabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"anchor":"gpt-nedir"} -->
<h2 class="wp-block-heading" id="gpt-nedir"><strong>GPT Nedir?</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>GPT (GUID Partition Table), bilgisayarların sabit disklerinde bölümlendirme (partitioning) yöntemi olarak kullanılan modern bir disk bölümleme yöntemidir. GPT, disk bölümlerinin yerini ve boyutunu tutan bir tabloya sahiptir ve diskteki her bir bölümü benzersiz bir kimlik (GUID) ile tanımlar. Ayrıca, önyükleme sürecinde kullanılan önyükleme kodunu da içerir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>GPT, MBR (Master Boot Record) disk bölümleme yöntemi ile karşılaştırıldığında birçok avantaja sahiptir. Örneğin, GPT disklerde maksimum bölüm boyutu 9.4 ZB (zettabyte) olabilir, yani çok daha büyük boyutlu bölümler oluşturulabilir. Ayrıca, GPT disklerde birincil bölümlerin sayısı sınırlandırılmamıştır ve bölümler arasında geçiş yapmak için özel bir genişletilmiş bölüm oluşturma ihtiyacı yoktur.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>GPT, Windows 7 ve daha sonraki sürümlerinde desteklenmektedir. Ancak, GPT disk bölümleme yöntemi kullanılarak bölümlendirilmiş bir disk, MBR disk bölümleme yöntemi kullanılarak bölümlendirilmiş bir bilgisayarda önyükleme yapamaz. Ayrıca, eski bir bilgisayarda GPT disk bölümleme yöntemi kullanarak bölümlendirilmiş bir disk kullanıyorsanız, eski bir BIOS yerine UEFI (Unified Extensible Firmware Interface) kullanmanız gerekebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Yararlı olması dileğiyle. – Best Regards.</strong></p>
<!-- /wp:paragraph -->
