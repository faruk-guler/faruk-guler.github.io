---
layout: post
title: EFS (Şifreleme Dosya Sistemi) Nedir?
date: 2022-11-15 20:15
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":5504,"width":629,"height":314,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/encrypting-file-system.png?w=1024" alt="" class="wp-image-5504" width="629" height="314" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>EFS, Windows işletim sistemleri tarafından kullanılan bir dosya şifreleme sistemidir. EFS, kullanıcıların özel verilerini ve dosyalarını şifrelemelerine, korumalarına ve gizli tutmalarına olanak tanır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>EFS, NTFS dosya sistemine entegre edilmiştir ve şifreleme anahtarları kullanarak dosyaları şifreler. Kullanıcılar, EFS kullanarak dosyaları şifreleyebilir ve yalnızca kendilerinin dosyalara erişebilmesini sağlayabilirler. Diğer kullanıcılar, dosyaları açamaz veya okuyamaz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>EFS, kullanıcıların dosyalarını şifrelemelerine izin verirken, dosyaların diğer kullanıcılar tarafından açılmasını zorlaştırır. Ancak, EFS, kullanıcıların dosyalarını yedekleme yaparken kaybetmelerine veya kullanıcı hesaplarını kaybettiklerinde dosyalara erişememelerine neden olabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>EFS, verilerinizi şifrelerken, Windows işletim sistemi tarafından kullanılan bir sertifika hizmeti kullanır. Bu sertifika hizmeti, kullanıcıların kimliklerini doğrular ve şifreleme anahtarlarına erişimlerini sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>EFS, kullanıcıların dosyalarını şifrelerken, kullanıcının profilinde saklanan bir özel anahtar kullanır. Bu özel anahtar, dosyaların şifreleme anahtarlarını şifreler ve çözme işlemi sırasında kullanılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>EFS, Windows işletim sisteminin bir parçasıdır ve kullanıcılara dosyalarını güvenli bir şekilde saklama ve paylaşma olanağı sağlar. Ancak, kullanıcıların EFS kullanmadan önce doğru bir şekilde yapılandırılması ve kullanıcıların EFS hakkında bilgi sahibi olması gerekmektedir. Ayrıca, kullanıcıların şifreleme anahtarlarının ve sertifikalarının güvenli bir şekilde saklanması önemlidir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sonuç olarak, EFS Windows işletim sistemi kullanıcıları için güvenli bir dosya şifreleme sistemi sunar. Kullanıcılar, dosyalarını şifreleyerek gizliliğini koruyabilir ve yalnızca kendilerinin dosyalara erişmesini sağlayabilirler. Ancak, doğru yapılandırma ve yönetim gereklidir ve kullanıcıların şifreleme anahtarlarının ve sertifikalarının güvenli bir şekilde saklanması önemlidir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Temel EFS özellikleri</strong>:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>EFS (Encrypting File System), Windows işletim sistemi tarafından sunulan bir dosya şifreleme sistemi olup, kullanıcılara dosyalarını şifreleme ve gizliliklerini koruma olanağı sunar. EFS'in temel özellikleri şunlardır:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Dosya düzeyinde şifreleme: EFS, dosya düzeyinde şifreleme yaparak yalnızca belirli dosyaların şifrelenmesini sağlar. Bu özelliği sayesinde, kullanıcılar özel ve hassas verilerini seçerek şifreleyebilirler.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Şifreleme anahtarları: EFS, dosyaları şifrelemek için kullanılan bir anahtar kullanır. Kullanıcıların şifreleme anahtarları, kullanıcı hesaplarının özel bölümünde saklanır. Bu, kullanıcıların dosyalara erişim yetkisi olmadan önce kimliklerini doğrulamalarını sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Yönetim: EFS, dosya ve klasör şifrelemesi için bir yönetim aracı sağlar. Yöneticiler, EFS'i kullanarak kullanıcıların dosyalarını şifreleyebilir ve yönetebilirler. Bu özellik, kurumsal ortamlarda özellikle faydalıdır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Esneklik: EFS, kullanıcıların dosyalarını şifrelemelerine izin verirken, diğer kullanıcıların bu dosyalara erişmesini engellemez. Kullanıcılar, dosyaları seçerek şifreleyebilir ve diğer kullanıcılara erişim yetkisi verebilirler.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Yedekleme ve Kurtarma: EFS, dosya şifrelemesini gerçekleştirirken, kullanıcıların dosyalarının kaybolmasını önleyen bir yedekleme ve kurtarma özelliği sunar. Bu özellik sayesinde, kullanıcılar dosyalarını kaybetmeleri durumunda bile kurtarabilirler.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Güvenlik: EFS, dosyaları şifrelemek için RSA sertifikalarını kullanır. Bu sertifikalar, kullanıcının kimliğini doğrular ve şifreleme anahtarlarına erişim sağlar. Bu özellik, EFS'in güvenli bir dosya şifreleme sistemi olmasını sağlar.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>EFS, Windows işletim sistemi tarafından sunulan bir dosya şifreleme sistemi olup, kullanıcılara dosyalarını güvenli bir şekilde saklama ve paylaşma olanağı sağlar. EFS'in temel özellikleri arasında dosya düzeyinde şifreleme, şifreleme anahtarları, yönetim aracı, esneklik, yedekleme ve kurtarma, ve güvenlik yer alır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>O vakit başlayalım, <strong>Win+Çalıştır : certmgr.msc</strong>&nbsp;yazarak sertifika yönetim paneline giriş yapalım.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5507,"width":460,"height":278,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/cert.png?w=460" alt="" class="wp-image-5507" width="460" height="278" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5509,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/cert-adobe.png?w=906" alt="" class="wp-image-5509" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Bu panel üzerinde <strong>Personel&gt; Certificates</strong>&nbsp;kısmında eğer daha önce EFS işlemi gerçekleştirmediyseniz burada herhangi bir sertifika görmemeniz gerekir. (bende ek olarak  Adobe güvenlik sertfikaları mevcut)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>EFS' i test etmek için <strong>şirket bilgilerimin</strong> bulunduğu bir klasörü meraklı kişilerden korumak için şifreleyeceğim.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5514,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/gizli-efs.png?w=890" alt="" class="wp-image-5514" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":5515,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/subs-folders.png?w=842" alt="" class="wp-image-5515" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":5516,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/kilit.png?w=665" alt="" class="wp-image-5516" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>İşlem sonunda EFS ile şifrelenen klasörün üzerinde bir <strong>kilit simgesi </strong>göreceksiniz. Eğer Domain ortamında bir Client makinesi üzerinde bu işlemi gerçekleştiriyorsanız şifreleme için kullanılan sertfikanız Domain Controller üzerinde tutulacaktır.(bu dosyaya sektörde <strong>"maymuncuk" </strong>diye de tabir edilir.)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Kullanıcı adımıza özel oluşan sertifika:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5518,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/real-cert.png?w=1024" alt="" class="wp-image-5518" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Şimdi tekrar <strong>Personel&gt;Certificates</strong>&nbsp;alanına dönelim gördüğünüz gibi burada kullanıcı adımız ile bir sertifika oluşmuş durumdadır. bu sertfikanın kesinlikle bir yedeğini almanıza gerektiğini <strong>unutmayın!!!</strong> Eğer bu serfikanın olmadığı bir makinede bu dosyayı açmaya çalışırsanız(administrator dahil) hiçbir şekilde <strong>açamazsınız!!</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>İlk defa bir dosya şifrelendiğinde, kullanıcı hesabına özel bir sertifika oluşturulur ve bu sertifikaya ait bir anahtar çifti oluşturulur. Bu anahtar çifti, dosyaların şifrelenmesi ve çözülmesi için kullanılır. Özel anahtarın güvenliğinin korunması önemlidir çünkü bu anahtarın kaybolması, kullanıcının şifrelenmiş dosyalara erişimini kaybetmesine neden olabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>EFS'in dosya ve klasör şifreleme özelliği sayesinde, şifrelenmiş bir dosya ya da dizin, sadece geçerli sertifikaya sahip olan hesaplar tarafından erişilebilir. Bu nedenle, dosyaların güvenliği artar ve sadece belirli kullanıcılar tarafından erişilmesi sağlanır. Şifrelenmiş bir dosyanın artık şifreli olmaması gerektiğinde, kullanıcılar aynı işlemleri yaparak dosyanın şifresini kaldırabilirler. Bu işlem, dosyanın eski haline dönmesini sağlar ve kullanıcılar tarafından tekrar erişilebilir hale gelir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Sertfikanın yedeklenmesi ve yedekten geri yüklenmesi: (farklı bir makine dahil</strong>)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Sertfikanın yedeklenmesi: {Ver}</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5521,"width":600,"height":269,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ver.png?w=1024" alt="" class="wp-image-5521" width="600" height="269" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Yedekten geri yüklenmesi:</strong> <strong>{Al}</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5523,"width":598,"height":379,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/al.png?w=878" alt="" class="wp-image-5523" width="598" height="379" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":5524,"width":600,"height":524,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/al-2.png?w=645" alt="" class="wp-image-5524" width="600" height="524" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
