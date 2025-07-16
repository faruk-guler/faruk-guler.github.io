---
layout: post
title: vCenter Server 7 Appliance Backup &amp; Restore
date: 2022-01-17 10:53
author: theguler
comments: true
categories: [Vmware Virtualization]
---
<!-- wp:image {"id":1050,"width":726,"height":428,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/x1-2.png?w=1024" alt="" class="wp-image-1050" width="726" height="428" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>vCenter Server 7'nin backup'ını alabilmek için öncelikle VMware Appliance Management'e giriş yapmanız gerekmektedir. VMware Appliance Management'e giriş yapmak için aşağıdaki bağlantıyı kullanabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://VCENTER-IP-ADRESI:5480">https://VCENTER-IP-ADRESI:5480</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Backup oluşturma işlemine başlamak için öncelikle vSphere web istemcisine giriş yapmanız gerekiyor. Ardından Backup sekmesine geçiş yaparak iki seçenekle karşılaşacaksınız: "Backup Now" ve "Backup Schedule".</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>"Backup Now" seçeneği ile anlık backup alabilirsiniz. Ancak, belirli bir tarih veya zaman aralığında otomatik backup almak için "Backup Schedule" seçeneğini kullanabilirsiniz. Bu bölümde backup job'u oluşturarak, istediğiniz sıklıkta backup alabilirsiniz. Günlük, haftalık veya özel tarih aralıkları seçebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1110,"width":758,"height":566,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/x2-1-1.png?w=1024" alt="" class="wp-image-1110" width="758" height="566" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Backup now bölümüne giriş yaptığımızda karşımıza birden fazla seçenek çıkacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Backup location:</strong> </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Başlangıçta belirttiğim gibi, Backup programı birden fazla protokolü destekler ve yedekleme işlemini farklı yerlere yapabilirsiniz. Bu örnekte, SMB protokolünü kullanarak yedekleme işlemini gerçekleştireceğiz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>SMB (Server Message Block), Windows işletim sistemi ve ağ kaynakları arasında dosya paylaşımı için kullanılan bir ağ protokolüdür. Backup programı, SMB protokolünü kullanarak yedeklemeyi ağdaki başka bir bilgisayarda veya sunucuda bulunan bir paylaşıma kaydedebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Örneğin, yedeklemeyi ağdaki bir SMB paylaşımına kaydetmek isterseniz, Backup programı üzerinde yedekleme ayarlarına gidin ve yedekleme konumu olarak SMB adresini belirtin. Daha sonra kullanıcı adı ve şifre bilgilerini girin ve yedekleme işlemini başlatın. Backup programı, SMB protokolünü kullanarak yedeklemeyi belirttiğiniz paylaşıma kaydedecektir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu şekilde yedekleme işlemlerinizi ağ üzerindeki başka bir bilgisayarda veya sunucuda bulunan paylaşıma kaydederek verilerinizi güvenli bir şekilde saklayabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Backup server credentials:</strong> </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Yedekleme işlemini gerçekleştirmek için belirttiğiniz backup location'a erişmek için gerekli olan kullanıcı adı ve şifre bilgileri, Backup programı üzerinde belirtilmelidir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Örneğin, SMB protokolü üzerinden yedekleme işlemini gerçekleştirmek için kullanıcı adı ve şifre bilgileriniz "backupuser" ve "password123" ise, Backup programı üzerinde yedekleme ayarlarına gidin ve "backupuser" kullanıcı adını "Kullanıcı adı" bölümüne yazın. "password123" şifresini "Şifre" bölümüne yazın ve kaydedin.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Encrypted backup:</strong> </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Yedekleme işlemi tamamlandıktan sonra, yedeklenen verilerin güvenliği için encrypt (şifreleme) yapmak isteyebilirsiniz. Böylece, yedeklenen verilere sadece belirttiğiniz şifreyi bilen kişilerin erişebilmesi sağlanır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Encrypt işlemi yapmak için Backup programı üzerinde ilgili ayarlara girin ve şifreleme seçeneğini etkinleştirin. Ardından, bir şifre belirleyin ve kaydedin. Bu şifreyi restore etmek istediğinizde kullanmanız gerekecektir. Şifreyi unutursanız, yedeklenen verilerinize erişemeyeceksiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>DB Health Check:</strong> Backup işlemi öncesinde, veritabanının genel performansını kontrol etmek önerilir. Bu seçenek seçilirse, backup işlemi daha uzun sürebilir çünkü veritabanı önce kontrol edilecektir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Veritabanı boyutuna göre değişebilen süreç, bazı durumlarda uzun sürebilir ancak performans kontrolü yapmadan yapılan backup işlemleri, olası hatalara neden olabilir. Bu nedenle, verilerin güvenliği için backup öncesinde performans kontrolü yapılması önerilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Data:</strong> Backup işlemi sırasında "Stats, Events and Tasks" seçeneği isteğe bağlıdır ve bu seçeneği seçmeyebilirsiniz. Ancak bu seçeneği seçmemeniz durumunda, backup işleminiz daha kısa sürede tamamlanacaktır. Ancak, restore işlemi yapmak istediğinizde vCenter Server'ın performance stats, events ve task'ları geri yüklenmeyecektir ve geri yüklenen veri boş olacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu nedenle, vCenter Server verilerinin tamamının restore edilebilmesi için bu seçeneğin seçili olması önerilir. Zaten varsayılan olarak bu seçenek seçili gelmektedir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Description:</strong> Aldığınız backup, verilerinizi yedeklemek amacıyla oluşturulmuştur. Birden fazla backup alıyorsanız, bu farklı senaryolara yönelik olabilir. Örneğin, farklı zamanlarda alınan backup'lar sayesinde, veri kaybı yaşandığı durumlarda geri dönüş yapabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1112,"width":784,"height":361,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/x4-1-1.png?w=1024" alt="" class="wp-image-1112" width="784" height="361" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Start butonuna bastığınızda backup’ınız başlayacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Schedule:</strong> Bu seçenekte, 3 ek seçenek daha bulunmaktadır: Günlük, Haftalık ve Özel (Custom) seçenekleri. Bu seçenekler aracılığıyla günlük veya haftalık programlar ayarlayabilir, isterseniz özel seçenekle belirli günleri seçerek otomatik yedekleme yapabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>İlgili video: https://www.youtube.com/watch?v=LBjj12va7ms</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla – Best Regards</strong></p>
<!-- /wp:paragraph -->
