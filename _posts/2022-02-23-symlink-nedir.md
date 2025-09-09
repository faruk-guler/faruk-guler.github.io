---
layout: post
title: Symlink Nedir? Symlink ile Web Hacking
date: 2022-02-23 21:26
author: theguler
comments: true
categories: [Hacking - Security]
---
<!-- wp:image {"id":8866,"width":"461px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/link-in-chain.webp?w=1024" alt="" class="wp-image-8866" style="width:461px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Symlink (sembolik link),</strong> bir dosya ya da dizinin referansını tutan, dosya sistemlerinde kullanılan bir dosya türüdür. Bir dosyanın sembolik bağlantısı, asıl dosya veya dizine referans verir. Bu referanslar, çoğu durumda, mutlak veya göreceli yol isimleri kullanarak tanımlanır. Sembolik bağlantılar, aynı dosyanın farklı adlar altında kullanılmasını sağlar. Örneğin, bir dizinin sembolik bağlantısı, bu dizinin başka bir yere yerleştirilmiş gibi kullanılmasını sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Symlink,</strong> web hacking saldırılarında da sıklıkla kullanılır. Örneğin, web sunucularının alt dizinlerinde yer alan dosyaları hedef almak için kullanılabilir. Bu tür saldırılarda, saldırgan, sitenin sunucusunda bulunan web uygulamasının bağlantılarını değiştirerek, hassas dosyalara erişebilir. Bu tür saldırılarda, saldırgan, sembolik bağlantıların hedef dosyaların bulunduğu dizine işaret ettiğinden emin olmalıdır. Saldırgan, sembolik bağlantıların hedef dizinin izinlerini ve sunucunun dosya sistemi yapısını da bilmelidir. Ayrıca, sembolik bağlantıların hedef dizinlerine erişim izni olmadan saldırı gerçekleştirilemez.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Örnek verecek olursak;</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bir web sitesinde, kullanıcının profil resimleri için yükleyebileceği bir alan olduğunu varsayalım. Bu resimler, web sunucusunda belirli bir klasöre yüklenir. Diyelim ki bu klasörün yolu:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong> /home/user/public_html/images/</strong> </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>olsun.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bir saldırgan, web sunucusuna girdiğinde, bu klasörün izinlerini kontrol eder ve yazma izni olan bir symlink (sembolik bağlantı) oluşturur. Saldırgan, symlink'i bir başka klasöre veya sunucuya bağlayarak, saldırıya uğrayan web sitesindeki kritik dosyalara veya veritabanlarına erişebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Örneğin, saldırgan /home/user/public_html/images/klasor1/ dizinine bir symlink oluşturur ve bu symlink'i /etc/passwd dosyasına bağlar. Ardından, saldırgan, saldırıya uğrayan web sitesinde bir istek gönderirken, isteğin hedefi olan resim yükleme alanına /home/user/public_html/images/klasor1/etc/passwd yolunu verir. Bu sayede, saldırgan, hedef dosyaya erişebilir ve hassas bilgileri ele geçirebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu nedenle, web sunucularında symlink saldırılarına karşı korunmak için gerekli önlemler alınması önemlidir. Bunlar arasında izinlerin sıkı bir şekilde kontrol edilmesi, symlink oluşturmanın engellenmesi veya sınırlanması ve güvenlik açığı tespit sistemlerinin kullanılması yer alabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Symlink Saldırısını Engelleme</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Aşağıdaki senaryoda bir Symlink saldırısını önleme örneği:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Varsayalım ki bir web sunucusunda "example.com" adında bir web sitesi barındırılıyor ve bu site için "/home/user1/example.com" dizini kullanılıyor.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Bir saldırgan, "/home/user2/malicious/" dizininde kötü amaçlı bir betik barındırıyor ve bu betiğin "example.com" sitesinde çalıştırılmasını amaçlıyor.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Saldırgan, "/home/user2/malicious/" dizinindeki kötü amaçlı betiği "/home/user1/example.com/public_html/img/malicious.jpg" adı altında bir sembolik bağlantı olarak oluşturur.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Saldırgan, "example.com" sitesindeki bir sayfada bu sembolik bağlantıya bağlantı verir ve kullanıcılar bu bağlantıyı tıkladıklarında kötü amaçlı betik çalıştırılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Bu saldırıyı önlemek için, web sunucusu yöneticisi "/home/user1/example.com" dizinine sadece "user1" kullanıcısının erişebileceğinden emin olabilir. Bu, saldırganın "/home/user2" dizinindeki dosyalara erişememesini ve sembolik bağlantı oluşturamamasını sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Ayrıca, web sunucusu yöneticisi sembolik bağlantı oluşturmaya izin verilmemesi için Apache konfigürasyon dosyalarında "FollowSymLinks" direktifini "SymLinksIfOwnerMatch" ile değiştirebilir. Bu, yalnızca sembolik bağlantıların dosya sahibi tarafından oluşturulmasına izin verir ve böylece saldırganların sembolik bağlantılar oluşturmasını önler.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Symlink Engellemesini Bypass Etme</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Symlink engellemeleri, web sitelerinin güvenliğini arttırmak için yaygın olarak kullanılan bir yöntemdir. Ancak, bazı durumlarda symlink engellemeleri bypass edilebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Örneğin, symlink engellemesi, bir web sitesindeki dosyalara doğrudan erişimi engellemek için kullanılır. Ancak, bir saldırgan, symlink engellemesi bypass ederek, hedef web sitesindeki dosyalara erişebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bununla birlikte, symlink engellemesini bypass etmek, yasadışı bir eylemdir ve sadece web sitesi sahibinin önceden izni ile gerçekleştirilebilir. Aksi takdirde, bu tür bir eylem, yasal sonuçlara yol açabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu nedenle, symlink engellemesi bypass etmek gibi yasadışı eylemler yerine, web sitelerinin güvenliğini arttırmak için doğru yöntemler kullanılmalıdır. Bunlar arasında, web sitelerinin güvenliği için gerekli olan tüm güncellemelerin yapılması, güçlü parolaların kullanılması ve giriş yapan kullanıcıların kimlik doğrulama gereksinimlerinin artırılması gibi önlemler yer alabilir.</p>
<!-- /wp:paragraph -->
