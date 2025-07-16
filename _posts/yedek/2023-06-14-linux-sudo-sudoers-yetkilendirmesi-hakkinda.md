---
layout: post
title: Linux "Sudo" Yetkilendirmesi ve Sudoers Hakkında
date: 2023-06-14 14:57
author: theguler
comments: true
categories: [Linux / Unix]
---
<!-- wp:image {"id":3252,"sizeSlug":"large","linkDestination":"none","className":"is-resized"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/sudo.jpg?w=297" alt="" class="wp-image-3252" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>"su" ve "sudo"</strong> komutları, kullanıcı kimliklerini geçici olarak değiştirerek süper kullanıcı yetkilerini kullanmayı sağlar.<strong> "su" </strong>komutu doğrudan başka bir kullanıcının kimliğine geçişi sağlarken, <strong>"sudo"</strong> komutu kullanıcıya yetkilendirilmiş komutları süper kullanıcı yetkileriyle çalıştırma yetkisi verir. Bu şekilde, kullanıcılar güvenli ve kontrollü bir şekilde süper kullanıcı ayrıcalıklarını kullanabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>"su" (switch user) komutu: </strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu komut<strong> "su"</strong> ifadesi, <strong>"su faruk" </strong>komutu ile "faruk" kullanıcısının oturumunu açmayı ifade eder. "su" komutu, "switch user"ın kısaltmasıdır ve bir kullanıcının mevcut oturumunu başka bir kullanıcıya değiştirmek için kullanılır. Eğer <strong>"su faruk" </strong>komutunu çalıştırırsanız, sistem sizden <strong>"faruk" </strong>kullanıcısının parolasını girmenizi isteyecektir. Eğer girdiğiniz parola doğruysa, mevcut oturumunuz <strong>"faruk" </strong>kullanıcısı olarak değişir ve <strong>"faruk" </strong>kullanıcısının hesabına erişim sağlarsınız. Bu şekilde, <strong>"faruk" </strong>kullanıcısının sahip olduğu dosyalara ve kaynaklara erişebilir ve onun yetkilendirilmiş işlemlerini gerçekleştirebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>"sudo" (superuser do) komutu: </strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu komut, belirli bir kullanıcının belirli bir süre komutları süper kullanıcı yetkileriyle çalıştırmasına izin verir. Bir kullanıcı <strong>"sudo"</strong> komutunu kullanarak belirli bir komutu süper kullanıcı yetkileriyle çalıştırabilir, ancak bu komutu çalıştırmak için kullanıcının kendi parolasını girmesi gereklidir (süper kullanıcı parolasını değil). Sudo, genellikle sistem yöneticilerine, belirli komutları süper kullanıcı yetkileriyle güvenli bir şekilde çalıştırma esnekliği sağlar. sudo komutunun varsayılan yapılandırmasında, genellikle "timestamp_timeout" parametresi 5 - 15 dakika olarak ayarlanmıştır. Bu, kullanıcının sudo komutunu çalıştırdıktan itibaren 15 dakika boyunca tekrar şifre girmesi gerekmeyeceği anlamına gelir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Eğer sistemde root kullanıcısına erişiminiz varsa, genellikle <strong>"su" </strong>komutunu kullanarak doğrudan root kullanıcısının oturumunu açabilirsiniz. Örneğin, "su" komutunu kullanarak <strong>"su root" </strong>veya <strong>"su -" </strong>komutunu çalıştırabilir ve root kullanıcısının parolasını girebilirsiniz. Bu şekilde, root kullanıcısı olarak doğrudan oturum açabilir ve root yetkileriyle çalışabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Özetle, </strong>"su" komutu bir kullanıcının oturumunu başka bir kullanıcıya değiştirirken, "sudo" komutu belirli bir komutu süper kullanıcı yetkileriyle çalıştırmak için kullanılır. "su" komutu kullanıcı oturumunu tamamen değiştirirken,<strong> "sudo" </strong>komutu sadece belirli bir komutu süper kullanıcı yetkileriyle çalıştırırken geçici olarak yetki verir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>***</strong>Eğer zaten root kullanıcısıysanız, "sudo root" komutunu kullanmanıza gerek yoktur. Root kullanıcısı olarak oturum açtığınızda, root yetkileriyle komutları doğrudan çalıştırabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>"visudo" komutu ve Sudoers dosyası:</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>"visudo" </strong>sudo yetkilendirmesi için kullanılan sudoers dosyasını düzenlemek için kullanılan bir komuttur. <strong>"sudoers" </strong>dosyası ise sudo programının davranışını ve kullanıcılara verilen yetkileri kontrol etmek için kullanılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>sudoers dosyası, </strong>sistem yöneticileri tarafından düzenlenen bir metin dosyasıdır. Bu dosyada, belirli kullanıcılar veya kullanıcı grupları için sudo ile çalıştırılabilecek komutlar ve işlemler belirtilir. Ayrıca, hangi kullanıcıların belirli komutları veya komut gruplarını süper kullanıcı yetkileriyle çalıştırabileceği, şifre gerekliliği gibi özel yetkilendirme kuralları da belirtilebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>"visudo komutu, sudoers dosyasını düzenlerken hataları önlemek ve dosyanın <strong>tutarlı bir şekilde işlenmesini sağlamak için</strong> kullanılır" visudo, sudoers dosyasını düzenlemek için özel bir düzenleyici kullanır. Bu, hatalı bir düzenleme yapmanın veya dosyayı bozma riskini en aza indirir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>sudoers dosyası ve visudo komutu, güvenlik politikalarını uygulamak, ayrıcalıklı işlemleri yönetmek ve kullanıcıların süper kullanıcı yetkilerine erişimini kontrol etmek için önemli araçlardır. Sudoers dosyasının düzenlenmesi dikkatle yapılmalı ve gereksiz veya yanlış yetkilendirmelerden kaçınılmalıdır, çünkü yanlış yapılandırılmış bir sudoers dosyası, sistem güvenliğini tehlikeye atabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Sudoers dosyasının "visudo" komutuyla düzenlenmesi</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>*****Not: Sudoers dosyasını düzenlerken dikkatli olun. Hatalı bir yapılandırma, sisteminizin düzgün çalışmasını engelleyebilir.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>*****Visudo, sudoers dosyasında yapılan değişiklikleri doğrulamak için bir kontrol yapar. Eğer yapılandırmada hatalı bir satır varsa, kullanıcıya bir uyarı mesajı gösterir ve düzeltmeler yapmadan dosyayı kaydetmesine izin vermez. Bu, hatalı yapılandırmaların sistemdeki sudo erişimini engellemesini veya bozmasını önler.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#Sudoers dosyasını "visudo" komutuyla açmak için.
<strong>sudo visudo</strong>

#Sudoers dosyasının doğruluğunu hata veya tutarsızlıkları kontrol etmek için:
<strong>sudo visudo -c</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Sudoers dosyası, özel bir düzenleyici (genellikle <strong>vi </strong>veya <strong>nano</strong>) ile açılacaktır. Sudoers dosyasını düzenlemek için aşağıdaki örnek satırları ekleyin. bu satırlar dosyanın yapısı, kullanıcı tanımlamaları ve yetkilendirmeleri içerir.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#sudoers dosyası icerigi<br>#-----------------------<br><br>#<strong>Her zaman süper kullanıcı</strong> yetkilerine sahip olmak için:<br><strong>root ALL=(ALL:ALL) ALL</strong><br>faruk ALL=(ALL:ALL) ALL<br><br>#Kullanıcının parola sorulmadan süper user komutlarını yürütmesine izin ver: touch /etc/sudoers.d/sudoer_faruk<br>faruk ALL=(ALL) NOPASSWD: ALL<br><br>#faruk, belirli bir komutu süper kullanıcı yetkileriyle çalıştırabilir.<br><strong>faruk ALL=(ALL) /usr/bin/ifconfig</strong><br><br>#faruk, kullanıcısına <strong>"/bin/ls"</strong> komutunu süper kullanıcı yetkileriyle çalıştırma izni vermek.<br><strong>faruk ALL=(ALL) /bin/ls</strong><br><br>#burak, belirli bir komutu ve parametreleriyle şifre istemeden süper kullanıcı yetkileriyle çalıştırabilir.<br><strong>burak ALL=(ALL) NOPASSWD: /usr/bin/komut2 parametre1, /usr/bin/komut2 parametre2</strong><br><br>#Burada <strong>"burak" </strong>kullanıcısına "/usr/sbin/service apache2 restart" komutunu süper kullanıcı yetkileriyle yalnızca "root" kullanıcı kimliğiyle çalıştırma izni veriliyor.<br><strong>burak ALL=(root) /usr/sbin/service apache2 restart</strong><br><br>#murat, belirli bir komutu belirli bir kullanıcı kimliğiyle süper kullanıcı yetkileriyle çalıştırabilir.<br><strong>murat ALL=(user1) /usr/bin/whoami</strong><br><br>#Bu örnekte, "murat" kullanıcısına <strong>"/usr/bin/apt-get update"</strong> komutunu süper kullanıcı yetkileriyle şifre gerektirmeden çalıştırma izni veriliyor.<br><strong>murat ALL=(ALL) NOPASSWD: /usr/bin/apt-get update</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Ayrıca birden fazla kullanıcıya aynı yetkileri vermeniz gerekirse; grup bazında yetkilendirme yapmanız daha kolay olacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sudoers dosyasında grup bazlı yetkilendirme yapmak için aşağıdaki adımları izleyebilirsiniz:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#Öncelikle, grupları ve kullanıcıları oluşturun veya varolanları gruplara ekleyin. Örneğin, <strong>"adminler"</strong> adında bir grup oluşturalım ve Faruk, Burak ve Murat kullanıcılarını bu gruba ekleyelim:

<strong>sudo groupadd adminler
sudo usermod -aG <strong>adminler</strong> faruk
sudo usermod -aG <strong>adminler</strong> burak
sudo usermod -aG <strong>adminler</strong> murat</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>***</strong>Bu adımlarla <strong>"adminler" </strong>adında bir grup oluşturulacak ve Faruk, Burak ve Murat kullanıcıları bu gruba eklenecektir.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#Sudoers dosyasını "visudo" komutuyla düzenleyin:
<strong>sudo visudo</strong>

#Sudoers dosyasında grup bazlı yetkilendirme ekleyin. Örneğin, "adminler" grubundaki tüm kullanıcılara aynı yetkileri tanımlamak için aşağıdaki satırı ekleyin:
<strong>%adminler ALL=(ALL) /usr/bin/reboot</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>***</strong>Bu örnekte, <strong>"%adminler"</strong> ifadesi adminler grubunu temsil eder ve tüm grubun "/usr/bin/reboot" komutunu süper kullanıcı yetkileriyle çalıştırma izni verilir. Düzenlemeleri tamamladıktan sonra, dosyayı kaydedin ve düzenleyiciyi kapatın.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>***s</strong>udoers dosyasında <strong>"%" </strong>karakteri, bir grubu temsil etmek için kullanılan bir özel karakterdir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Artık <strong>"adminler" </strong>grubuna üye olan Faruk, Burak ve Murat kullanıcıları, "/usr/bin/reboot" komutunu süper kullanıcı yetkileriyle çalıştırabilecek ve sunucuyu <strong>reboot etme hakkı</strong> kazanacaklardır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Peki "sudoers" dosyasında grup bazlı yetkilendirme kullanarak bazı komutları engellemeniz gerekirse;</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#Bu örnekte, <strong>"/usr/sbin/userdel" </strong>ve <strong>"/bin/rm" </strong>komutları engellenmektedir. Yani, <strong>"silmeyi_engelle" </strong>grubuna üye olan kullanıcılar bu komutları <strong>"sudo" </strong>yetkileriyle çalıştıramazlar ve silme işlemi yapamazlar.

<strong>%silmeyi_engelle ALL=(ALL) !/usr/sbin/userdel
%silmeyi_engelle ALL=(ALL) !/bin/rm</strong>

#Bu örnek, ""blokla" grubunun ağ hizmetlerini durdurma veya başlatma komutlarını engellemektedir. "/etc/init.d/networking start &amp; stop" önünde <strong>"!" </strong>sembolünü kullanarak, bu komutun açıkça yürütülmesinin reddedildiğini belirtiyorsunuz.

<strong>%blokla ALL=(ALL) !/etc/init.d/networking stop
%blokla ALL=(ALL) !/etc/init.d/networking start</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7427,"sizeSlug":"large","linkDestination":"none","className":"is-resized"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/sudo-e1571154617286.jpg?w=800" alt="" class="wp-image-7427" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>#sudoers dosyasını düzenlerken aşağıdaki kurallara dikkat etmelisiniz:</strong></h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Her satır, bir kullanıcı veya kullanıcı grubunun yetkilendirmesini belirtir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Kullanıcı adı veya grup adı, yetkilendirmenin başında belirtilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Yetkilendirmenin ardından, hangi komutları veya komut parametrelerini çalıştırabileceği belirtilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Yetkilendirme için çeşitli seçenekler kullanılabilir, örneğin NOPASSWD seçeneği parola gerektirmeden yetkilendirme yapılmasını sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>PASSWD seçeneği ise tam tersi olarak parola istenmesini sağlar.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li>Düzenlemeleri tamamladıktan sonra, dosyayı kaydedin ve düzenleyiciyi kapatın. "visudo" komutu, dosyanın geçerliliğini kontrol edecek ve hataları tespit edecektir. Hata olması durumunda, düzeltilmesi gereken satırları gösterecektir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>"visudo" komutunun tamamlanmasının ardından, sudoers dosyası güncellenmiş olacaktır. Artık düzenlediğiniz yetkilendirmeleri kullanabilirsiniz.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Yukarıdaki adımları izleyerek sudoers dosyası sayesinde yetkileri düzenleyebilirsiniz. <strong>Sudoers</strong> dosyasının yapısı ve sözdizimi oldukça hassas olduğundan, dosyayı dikkatli bir şekilde düzenlemek ve hatalardan kaçınmak önemlidir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
