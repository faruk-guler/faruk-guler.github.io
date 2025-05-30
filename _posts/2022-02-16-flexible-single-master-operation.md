---
layout: post
title: Flexible Single Master Operation (FSMO) Rolleri
date: 2022-02-16 20:06
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:image {"id":1835,"width":"710px","height":"202px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/fsmo.png?w=952" alt="" class="wp-image-1835" style="width:710px;height:202px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Active Directory Forest yapısında <strong>2</strong> tanesi forest tabanlı (Schema Master, Domain Naming Master) <strong>3</strong> tanesi de domain tabanlı (RID Master, PDC (Emulator), Infrastructure Master) olmak üzere toplamda <strong>(5 tane</strong> FSMO rolü vardır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>FSMO Rollerinin İncelenmesi</strong>:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>1</strong>) <strong>Şema Yöneticisi (Schema master ) :</strong>&nbsp;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Şema Yöneticisi (Schema Master), Active Directory (AD) ortamında bulunan ve şema güncellemelerini yöneten özel bir rolü ifade eder. Şema, AD veritabanının bir parçasıdır ve kullanıcıların, grupların, bilgisayarların ve diğer nesnelerin niteliklerini tanımlayan bir yapıdır. Şema, AD nesnelerinin ne tür nitelikleri olabileceği, hangi tipte olabileceği ve hangi değerlerin kabul edilebileceği gibi bilgileri tanımlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Şema Yöneticisi rolü, bir domain ortamında yalnızca bir adet bulunabilir ve bu rol sadece bir domain içerisindeki tüm şema güncellemelerini yönetir. Diğer domainlerdeki domain kontrolcüleri, şema güncellemelerini şema master olan sunucudan replike ederler.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Şema Yöneticisi rolünün görevleri arasında şunlar yer alır:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Şema güncellemelerinin yapılması: Yeni nesnelerin veya niteliklerin şemaya eklenmesi, mevcut nesnelerin veya niteliklerin güncellenmesi veya kaldırılması gibi işlemler, şema master tarafından yapılmalıdır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Şema replikasyonunun yönetimi: Şema master, domain kontrolcüleri arasında şema güncellemelerinin doğru bir şekilde replike edilmesinden sorumludur.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Şema uyumluluğunun sağlanması: Şema master, şema güncellemelerinin uyumlu olduğundan emin olmak için şema uyumluluk denetimlerini yapar.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Şema Yöneticisi rolünün korunması, AD ortamının sağlıklı çalışması için çok önemlidir. Bu rolü taşıyan sunucu başarısız olduğunda, şema güncellemeleri yapmak mümkün olmaz ve AD ortamı etkilenir. Bu nedenle, Şema Yöneticisi rolü taşıyan sunucunun yedeklenmesi, bakımı ve güncel tutulması gerekmektedir. Ayrıca, bu rolün taşındığı sunucunun doğru seçilmesi ve yönetilmesi de kritik önem taşımaktadır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>2</strong>) <strong>Etki alanı adlandırma yöneticisi (Domain naming master) :</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Etki alanı adlandırma yöneticisi (Domain Naming Master), Active Directory (AD) ortamında bulunan ve etki alanı adlarının değiştirilmesi, eklenmesi veya kaldırılması işlemlerini yöneten özel bir rolü ifade eder. Etki alanı adı, AD ortamında kayıtlı olan tüm nesnelerin tanımlandığı ve birbiriyle ilişkilendirildiği bir adlandırma mekanizmasıdır. Bu nedenle, etki alanı adının doğru şekilde tanımlanması ve yönetilmesi, AD ortamının doğru çalışması için kritik önem taşır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Etki alanı adlandırma yöneticisi rolü, bir AD ortamında yalnızca bir adet bulunabilir ve bu rol, etki alanı adının değiştirilmesi veya kaldırılması işlemlerinde tek yetkili olarak hareket eder. Ayrıca, yeni bir etki alanı eklemek istendiğinde de etki alanı adının belirlenmesi ve kaydedilmesi işlemlerini yürüten rol de etki alanı adlandırma yöneticisidir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Etki alanı adlandırma yöneticisinin görevleri arasında şunlar yer alır:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Etki alanı adının belirlenmesi: Etki alanı adlandırma yöneticisi, yeni bir etki alanı eklenmek istendiğinde etki alanı adını belirler ve kaydeder.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Etki alanı adının değiştirilmesi: Etki alanı adlandırma yöneticisi, mevcut bir etki alanı adının değiştirilmesi istendiğinde, bu işlemi yürütür ve diğer domain kontrolcülerine değişikliği bildirir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Etki alanı adının kaldırılması: Etki alanı adlandırma yöneticisi, bir etki alanının tamamen kaldırılması istendiğinde, bu işlemi yürütür ve etki alanı adını AD ortamından kaldırır.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Etki alanı adlandırma yöneticisi rolünün korunması, AD ortamının sağlıklı çalışması için kritik önem taşır. Bu rolü taşıyan sunucunun doğru seçilmesi, yedeklenmesi, bakımı ve güncel tutulması gerekmektedir. Etki alanı adlandırma yöneticisi rolü, diğer rol sahipleriyle birlikte çalışarak AD ortamının doğru şekilde yönetilmesini sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>3</strong>) <strong>PDC benzeştirici (PDC emulator) :</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>PDC emulator, Active Directory (AD) ortamında bulunan ve eski Windows NT 4.0 işletim sistemi döneminden kalan bir terimdir. Bu terim, Primary Domain Controller (PDC) görevini yerine getiren ve zaman senkronizasyonu ile hesap kimlik doğrulama işlemlerini sağlayan bir rolü ifade eder.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>PDC emulator rolü, bir AD ortamında yalnızca bir adet bulunabilir ve tüm domain kontrolcülerinin sahip olduğu roller arasında en önemlilerinden biridir. PDC emulator rolü, aşağıdaki işlevleri yerine getirir:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Zaman senkronizasyonu: PDC emulator, tüm domain kontrolcülerinin sistem saatlerinin senkronize olmasını sağlar. Bu sayede, farklı zaman dilimlerinde bulunan domain kontrolcülerinin saati doğru şekilde ayarlanır ve zamanla ilgili sorunlar önlenir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Hesap kimlik doğrulama: PDC emulator, eski Windows NT 4.0 işletim sistemi ile uyumlu olarak, hesap kimlik doğrulama işlemlerini sağlar. Böylece, eski NT 4.0 istemcileri ve sunucuları gibi eski sistemler de AD ortamı ile uyumlu hale getirilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>FSMO rolü atama/denetleme: PDC emulator, diğer FSMO (Flexible Single Master Operation) rollerini atamak ve denetlemek için kullanılır. Bu nedenle, PDC emulator rolü, AD ortamının sağlıklı ve doğru şekilde yönetilmesi için kritik önem taşır.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>PDC emulator rolü, bir domain kontrolcüsüne atanabilir ve gerektiğinde değiştirilebilir. Ancak, PDC emulator rolü değiştirilirken dikkatli olunmalıdır çünkü bu değişiklik, tüm domain kontrolcülerinde senkronizasyon sorunlarına ve hesap kimlik doğrulama sorunlarına neden olabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>PDC emulator rolü, eski Windows NT 4.0 işletim sistemi döneminden kalma bir terim olmasına rağmen, hala AD ortamında önemli bir rol oynamaktadır ve AD ortamının sağlıklı şekilde yönetilmesi için kritik öneme sahiptir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>4</strong>) <strong>Göreli kimlik yöneticisi (RID master ) :</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Göreli Kimlik Yöneticisi (Relative ID Master - RID master), Active Directory (AD) ortamında bulunan ve Güvenlik Tanımlayıcıları (Security Identifiers - SIDs) için benzersiz sayıların oluşturulması ve yönetilmesinden sorumlu olan bir Flexible Single Master Operations (FSMO) rolüdür.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Her AD nesnesi için bir SID oluşturulur ve bu SID, AD nesnesinin güvenlik kimliğini tanımlar. SID, her bir AD nesnesine özgüdür ancak bu nesneler için aynı özelliklerin kullanılmasına izin verir. SID, doğru bir şekilde oluşturulması için belirli bir formata sahiptir. Bu formatta, belirli bir etki alanı için belirli bir sayı ile başlanır ve nesnenin benzersiz kimliğini belirleyen ek bir sayı ile tamamlanır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>RID master, bu benzersiz sayıların oluşturulmasından sorumludur. Her bir AD nesnesi için benzersiz bir SID oluşturulması gerektiğinde, RID master, nesne için kullanılabilecek bir SID aralığı belirler. Bu aralık, RID master tarafından tutulan ve yönetilen bir dizi numaradan oluşur.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Eğer bir AD nesnesi için yeni bir SID gerekiyorsa, RID master bir numara seçer ve bu numarayı SID'in belirli bir kısmına ekler. Bu sayede, benzersiz bir SID oluşturulmuş olur. RID master, ayrıca kullanılmış SID'leri takip ederek, herhangi bir çakışma olmamasını sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>RID master rolü, bir AD ortamında yalnızca bir tane olabilir ve bu rolü atamak veya değiştirmek ciddi sorunlara neden olabilir. Bu nedenle, RID master rolünün yönetimi dikkatli bir şekilde yapılmalıdır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>RID master rolü, AD ortamında benzersiz güvenlik kimlikleri oluşturulması ve yönetilmesi için önemli bir FSMO rolüdür ve AD ortamının sağlıklı şekilde yönetilmesi için kritik öneme sahiptir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>5</strong>) <strong>Altyapı yöneticisi (Infrastructure master ) :</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Altyapı Yöneticisi (Infrastructure Master), Active Directory (AD) ortamında bulunan ve değişen nesneler arasındaki bağlantıların yönetilmesinden sorumlu olan bir Flexible Single Master Operations (FSMO) rolüdür. Bu rol, güncellenen nesnelerin diğer etki alanlarındaki referanslarını doğru bir şekilde takip ederek, güncellemelerin tutarlılığını sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Özellikle birden fazla etki alanına sahip bir AD ortamında, altyapı yöneticisi rolü, etki alanları arasındaki referanslar arasındaki çakışmaları önlemek için önemlidir. Altyapı yöneticisi rolü, her bir etki alanındaki nesnelere benzersiz kimlikler verir ve bu kimlikleri kullanarak diğer etki alanlarındaki referansları yönetir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Altyapı yöneticisi rolü, etki alanları arasındaki ilişkileri yönetmek için gereklidir. Bir etki alanındaki nesne kimliği değiştirildiğinde, diğer etki alanlarındaki referanslar otomatik olarak güncellenmez. Bunun yerine, referanslar, altyapı yöneticisi rolüne sahip olan etki alanı denetleyicisi tarafından güncellenir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu nedenle, altyapı yöneticisi rolü, AD ortamının sağlıklı bir şekilde çalışması için kritik öneme sahiptir. Ancak, yalnızca birden fazla etki alanı içeren AD ortamlarında gereklidir. Tek bir etki alanına sahip bir AD ortamında, altyapı yöneticisi rolü gereksizdir ve hatta yanlış yapılandırıldığında sorunlara neden olabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>FSMO Rollerin Sorgulanması</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Şimdi, FSMO rollerinin hangi domain controller üzerinde olduğunu nasıl görüntüleyebileceğimizi öğreneceğiz. Komut satırı veya Powershell konsolu üzerinde <strong>"netdom query fsmo"</strong> komutunu kullanarak FSMO rollerinin hangi DC üzerinde olduğunu görüntüleyebiliriz. Şu anda, yapımızdaki FSMO rolleri ilk kurulan anatolia.guler.com sunucusunda bulunmaktadır. Ancak Microsoft tarafından önerilen ve genel olarak kullanılan yöntem tüm rollerin tek bir DC üzerinde tutulmasıdır. Yapımızdaki DC'lerin Global Catalog özelliği, FSMO rollerinin son halini kurtarmamıza yardımcı olacaktır. Global Catalog özelliği olan DC'ler, "Domain Controllers" OU'su altındaki "DC Type" alanında "GC" ibaresi ile belirtilir. Bu özelliği taşıyan DC'ler arasında yedekli (PDC) sunucum olmadığı için Global Catalog ANATOLIA DC sunucum üzerinde bulunuyor.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1844,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/gc-1.png?w=1024" alt="" class="wp-image-1844" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Global Catalog, bir domain controller'ın kendisi için ait domain'in tam bir kopyasını ve forest içindeki diğer domainlere dair bilgilerin kısmi bir kopyasını tutar. Bu kopya içinde forest içindeki tüm nesneler ve en çok aranan/sorgulanan nesne özellikleri bulunur. Global Catalog sunucusu, aynı forest içinde bulunan uygulamalar ve kullanıcılar için farklı forest'lardaki tüm domainleri sorgulama imkanı sağlar. Varsayılan olarak, domain controller'lar Global Catalog sunucusu değildir ve bir domain kurulduğunda ilk kurulan domain controller Global Catalog rolü ile gelir. Ancak, diğer domain controller sunucularına kurumun gereksinimlerine göre bu rol de atanabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>FSMO Rollerinin Transfer Edilmesi</strong>:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bir Active Directory upgrade işlemi gerçekleştireceğimizde, ek DC'lerin kurulumu veya Microsoft tarafından yayınlanan Windows Update paketlerinin yüklenmesi gibi durumlarda, sunucuya erişimin kaybedilmesi veya rollerin üzerinde bulunduğu sunucuda bir sorun meydana gelmesi söz konusu olabilir. Bu nedenle, FSMO rollerinin hangi DC üzerinde olduğunu belirlemek ve gerektiğinde rollerin taşınması, sorunları gidermek için önemlidir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu yazıda FSMO rollerinin hangi DC üzerinde olduğunu belirlemenin önemine değinildi. Ancak <strong>RID Master,</strong> <strong>PDC Emulator, Infrastructure Master</strong>, <strong>Domain Naming Master</strong> ve <strong>Schema Master</strong> rollerinin taşımasına dair detaylı bilgiyi başka bir yazıda ele alacağız.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Sağlıcakla. – Best Regards</strong>.</p>
<!-- /wp:paragraph -->
