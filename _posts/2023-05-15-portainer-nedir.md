---
layout: post
title: Portainer Nedir Nasıl Kurulur ?
date: 2023-05-15 20:52
author: theguler
comments: true
categories: [Containerization]
---
<!-- wp:image {"id":7144,"width":"495px","height":"auto","aspectRatio":"2.465217391304348","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/portainer.io_.png?w=1024" alt="" class="wp-image-7144" style="aspect-ratio:2.465217391304348;width:495px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Portainer,</strong> Docker ve Kubernetes gibi konteyner tabanlı uygulama yönetim sistemlerini kullanmayı kolaylaştıran <strong>"açık kaynak ve kullanması ücretsiz(CE)" </strong>bir araçtır. Portainer, kullanıcıların Docker veya Kubernetes ortamlarını yönetmelerine yardımcı olmak için bir web tabanlı arayüz sunar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu arayüz sayesinde, kullanıcılar konteynerlerin oluşturulması, başlatılması, durdurulması, yeniden başlatılması, silinmesi gibi işlemleri kolayca gerçekleştirebilirler. Ayrıca, mevcut konteynerlerin durumunu, kaynak kullanımını ve ağ yapılandırmalarını görmek için izleme ve görselleştirme özelliklerine de sahiptir. Portainer, birden fazla Docker veya Kubernetes ortamını yönetme yeteneğine sahiptir.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7141,"width":"533px","height":"311px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/edge-mockup.webp?w=1024" alt="" class="wp-image-7141" style="width:533px;height:311px" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Portainer Kullanım Alanları nelerdir?</strong></h2>
<!-- /wp:heading -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>Konteyner Yönetimi:</strong> Portainer, Docker konteynerlerinizi oluşturmanıza, başlatmanıza, durdurmanıza ve yönetmenize olanak tanır. Konteynerlerinizi tek bir arayüzden kolayca görüntüleyebilir ve yönetebilirsiniz.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Görsel Konteyner Yönetimi: </strong>Portainer, Docker API'sını kullanarak konteynerlerinizi görsel bir arayüz üzerinden yönetmenize olanak sağlar. Bu, Docker komut satırı aracılığıyla uğraşmak yerine kullanıcı dostu bir deneyim sunar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Kullanıcı ve Erişim Kontrolü: </strong>Portainer, kullanıcı yönetimi ve erişim kontrolü için yetenekler sunar. Kullanıcılar ve roller oluşturabilir, kullanıcıların belirli konteynerlere erişimini sınırlayabilir veya özel izinler atayabilirsiniz.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Loglar ve İzleme: </strong>Portainer, konteynerlerinizin durumunu ve kaynak kullanımını izlemenizi sağlar. Ayrıca konteynerlerin günlüklerini görüntüleyebilir ve izleyebilirsiniz.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Konteyner İzleme ve Ölçeklendirme: </strong>Portainer, konteynerlerinizi izlemenize ve gerektiğinde ölçeklendirmenize olanak tanır. Kaynak kullanımını izleyebilir, performans sorunlarını tespit edebilir ve gerektiğinde yeni konteynerler oluşturabilirsiniz.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Veri Yönetimi: </strong>Portainer, Docker veri depolarını yönetmenize yardımcı olur. Bir veri deposu oluşturabilir, veri tabanları ve dosya depolama sistemlerini yönetebilir ve veri depolarını konteynerlere bağlayabilirsiniz.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Uygulama Yönetimi: </strong>Portainer, Docker Swarm ve Kubernetes gibi konteyner orkestrasyon araçlarıyla entegrasyon sağlar. Bu sayede birden fazla konteyneri gruplandırabilir, uygulamaları yönetebilir ve yük dengelemesi yapabilirsiniz.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Bu makalede <strong>[3]</strong> adımda Docker Kurulumu, Portainer kurulumu ve Upgrade işlemlerini yapacağız:</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7156,"width":"464px","height":"auto","aspectRatio":"1.5028409090909092","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dock.jpg?w=828" alt="" class="wp-image-7156" style="aspect-ratio:1.5028409090909092;width:464px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>1: Docker'ı Kurma & Kaldırma</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Portainer'ı çalıştırmak için Docker'ın sisteminizde yüklü olması gerekmektedir. Docker kurulumunu daha önce yapmıştık:</p>
<p><a href="https://farukguler.com/posts/docker-install-on-linux/">https://farukguler.com/posts/docker-install-on-linux/</a></p>
<p><a href="https://farukguler.com/posts/how-to-uninstall-docker-on-linux/">https://farukguler.com/posts/how-to-uninstall-docker-on-linux/</a></p>
<!-- /wp:paragraph -->


<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>2: Portainer'ı Kurma</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>"Portainer'ı harici olarak kurabilirsiniz ama burada docker imajı üzerinden kuracağız" </strong>Portainer, Docker image olarak kullanılabilir ve Docker ortamında çalışabilir. Bu sayede Portainer'ı istediğiniz Docker motoruna erişmesini sağlayabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Portainer minimum sistem gereksinimleri:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>İşletim Sistemi: Portainer, Windows, macOS veya Linux gibi yaygın işletim sistemlerinde çalışabilir. Portainer, Docker üzerinde çalıştığından, Docker'ın işletim sisteminize uyumlu olarak yüklü ve çalışır durumda olması gerekmektedir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>CPU: Portainer'ın minimum CPU gereksinimi, Docker'ın çalışması için gereken minimum CPU gereksinimlerine bağlıdır. <strong>Genellikle düşük güçlü bir işlemci</strong> bile yeterli olabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Bellek (RAM): Portainer'ın minimum RAM gereksinimi, Docker'ın çalışması için gereken minimum RAM gereksinimlerine bağlıdır. <strong>Genellikle en az 2 GB RAM</strong> önerilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Disk Alanı: Portainer'ın minimum disk alanı gereksinimi, Docker'ın çalışması ve konteynerlar için depolama alanı sağlamak için gereken minimum disk alanı gereksinimlerine bağlıdır. <strong>Genellikle en az 5 GB boş disk alanı</strong> önerilir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Portainer Konteynerinin Oluşturulması</strong>: Portainer'ı bir Docker konteyneri olarak çalıştıracağız. Konteyneri oluşturmak için aşağıdaki komutu çalıştırın, Ayrıca oluşturduğumuz bu Volume, konteyner silinse dahi verileri kalıcı olarak tutabilmeyi sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>##Portainer Kurulum:</strong><br>#ilk olarak sistemimizi güncelleyin:<br><strong>sudo apt-get update</strong><br><strong>sudo apt-get upgrade</strong><br><br>#Eğer Portainer imajı yerel Docker ortamınızda bulunmuyorsa, o zaman önce <strong>docker pull </strong>komutuyla imajı indirmeniz gerekir:<br><strong>docker pull portainer/portainer-ce:latest</strong><br>#docker pull portainer/portainer-ce:x.xx<br><br>#docker volume oluşturmak için:<br><strong>docker volume create portainer_data</strong><br><br>#Docker volumlerini görüntülemek için:<br><strong>docker volume ls</strong><br><br>#Docker volumleri hakkında daha ayrıntılı bilgi almak için:<br><strong>docker volume inspect portainer_data</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Portainer CE'ı indirmek,kurmak,çalıştırmak için kullanılan Toplu Docker komutu:</strong><br>docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":7205,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/port_installler.png?w=1024" alt="" class="wp-image-7205" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>***Bu docker komutunun işlevleri ve parametreleri şu şekildedir:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu komut, Portainer'ı Docker konteynerı olarak çalıştırmak için kullanılan komuttur. İşlevleri ve parametreleri şu şekildedir:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong><code>docker run</code>:</strong> Docker konteynerını başlatmak için kullanılan komut.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong><code>-d</code>: </strong>Konteynerı arka planda (detached modda) çalıştırır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong><code>-p 8000:8000</code>: </strong>Konteynerın 8000 numaralı yerel portunu 8000 numaralı konteyner portuna eşler. Bu, Portainer web arayüzüne yerel makineden erişim sağlamak için kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong><code>-p 9000:9000</code>: </strong>Konteynerın 9000 numaralı yerel portunu 9000 numaralı konteyner portuna eşler. Bu, Portainer'ın agentleri iletişim kurabilmesi için kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong><code>--name=portainer</code>: </strong>Konteynera "portainer" adını verir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong><code>--restart=always</code>:</strong> Konteynerın her zaman otomatik olarak yeniden başlatılmasını sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong><code>-v /var/run/docker.sock:/var/run/docker.sock</code>:</strong> Docker API'sine erişim sağlamak için Docker soket dosyasını konteynere bağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong><code>-v portainer_data:/data</code>: </strong>Portainer'ın konteyner içindeki verilerini tutması için bir Docker birimi oluşturur ve <code>/data</code> yoluna bağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong><code>portainer/portainer-ce:latest</code>: </strong>Portainer'ın resmi Docker görüntüsünü belirtir. <code>portainer-ce</code> etiketiyle en son sürümünü kullanır.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>***Bu komut, Portainer konteynerını çalıştırır ve Docker API'sine erişerek Docker konteynerlarını yönetmenizi sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>***<strong>3: </strong>Portainer Upgrade:</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>##Portainer Upgrade:</strong><br><br><strong>#Linkler</strong><br><a href="https://docs.portainer.io/admin/settings#backup-portainer">https://docs.portainer.io/admin/settings#backup-portainer</a><br>https://docs.portainer.io/start/upgrade<br>https://docs.portainer.io/start/upgrade/docker<br>https://docs.portainer.io/start/upgrade/swarm<br>https://docs.portainer.io/start/upgrade/kubernetes<br>https://docs.portainer.io/start/upgrade/edge<br><br>#Portainer yedekleyin:<br><a href="https://docs.portainer.io/admin/settings#backup-portainer">https://docs.portainer.io/admin/settings#backup-portainer</a><br>----<br><br>#Yedekten geri yükleyin (gerekirse)<br>----<br><br><strong>#Portaineri durdurun</strong><br>docker stop portainer<br>#docker rm portainer<br><br><strong>#Local olarak görüntünün en son sürümünü indirin</strong><br>docker pull portainer/portainer-ce:latest<br><br><strong>#Son olarak Portainer'ın güncellenmiş sürümünü yükleyin</strong><br><span style="font-size: 13.7143px">docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest</span><br><br><strong>***Portainer'ın en yeni sürümü artık önceki sürümdeki kalıcı verileri kullanarak yüklenecek ve ayrıca Portainer veritabanını yeni sürüme yükseltecektir.</strong><br><br><strong>***SSL sertifikalarınızı; sertifikayı ve anahtar dosyalarını sağlamak üzere aşağıdaki komut kullanabilir</strong><br>docker run -d -p 8000:8000 -p 9443:9443 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest --sslcert /path/to/cert/portainer.crt --sslkey /path/to/cert/portainer.key<br><br><strong>#Adreslere gidin</strong><br>#http://your-server-address:9000<br>#https://your-server-address:9443</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Portainer'a Erişim</strong>: </h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Portainer konteynerı başlatıldıktan sonra, web tarayıcınızda :</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong><a href="https://farukguler.com/?page_id=7192">"<code>http://localhost:9000</code></a>"</strong> HTTP adresine gidin. Eğer Docker'ı başka bir makinede çalıştırıyorsanız, IP adresini veya alan adını(FQDN) kullanarak ulaşabilirsiniz. Ayrıca, Portainer'ın agentleriyle iletişim kurabilmesi için default olarak HTTP:9000 numaralı portu kullanır.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7235,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/login_page-1.png?w=1024" alt="" class="wp-image-7235" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Portainer'ı başarıyla kurduktan sonra, Artık Portainer üzerinden Docker konteynerlerinizi yönetebilir, izleyebilir ve dağıtabilirsiniz. Arayüzde sunulan özellikler arasında konteynerlerin oluşturulması, durdurulması, silinmesi, görüntülerin yönetimi, ağ yapılandırmaları ve günlüklerin görüntülenmesi gibi birçok özellik bulunmaktadır.</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>Portainer Yönetici Hesabının Oluşturulması</strong>: İlk ziyaretinizde Portainer, bir yönetici hesabı oluşturmanızı isteyecektir. Yönergeleri izleyerek bir <strong>"kullanıcı adı ve şifre" </strong>oluşturun ve ardından oturum açın. <strong>****Bu parola en az 12 karakter olmalıdır.</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Docker Ortamının Yapılandırılması</strong>: Portainer'a giriş yaptıktan sonra, Docker ortamınızın yapılandırılması için bazı adımları izlemeniz gerekebilir. Bu adımlar genellikle Docker bağlantısı, API anahtarları vb. ile ilgilidir. Portainer, Docker sunucusuna bağlanmanızı sağlayacak talimatları size sunacaktır.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Portainer Web Arayüzü:</strong></h2>
<!-- /wp:heading -->

<!-- wp:image {"id":7211,"width":"700px","height":"342px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dashboard_port.png?w=1024" alt="" class="wp-image-7211" style="width:700px;height:342px" /></figure>
<!-- /wp:image -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>Dashboard</strong>: Portainer'ın ana sayfasıdır ve sistemde çalışan Docker konteynerlarının bir özetini gösterir. Konteynerlerin durumu, ağlar, görüntüler, birimler ve diğer önemli bilgiler burada görüntülenir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Containers</strong>: Bu bölümde mevcut Docker konteynerlarını görüntüleyebilir, yeni konteynerlar oluşturabilir, çalıştırabilir, durdurabilir ve silme işlemleri yapabilirsiniz. Konteynerlerin durumu, kullanılan kaynaklar ve ağ bilgileri gibi ayrıntıları da görebilirsiniz.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Images</strong>: Docker görüntülerini yönetmek için kullanılır. Bu bölümde mevcut görüntüleri görüntüleyebilir, yeni görüntüler indirebilir veya mevcut görüntülerden yeni konteynerlar oluşturabilirsiniz. Ayrıca görüntülerin etiketleri, boyutları ve diğer özellikleri de görüntülenebilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Networks</strong>: Docker ağ yapılandırmalarını yönetmek için kullanılır. Bu bölümde mevcut ağları görüntüleyebilir, yeni ağlar oluşturabilir ve konteynerleri bu ağlara bağlayabilirsiniz. Ağ ayarlarını düzenleyebilir, IP adreslerini görüntüleyebilir ve ağlara ilişkin diğer yapılandırmaları yapabilirsiniz.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Volumes</strong>: Docker birimlerini yönetmek için kullanılır. Bu bölümde mevcut birimleri görüntüleyebilir, yeni birimler oluşturabilir ve birimler arasında veri paylaşabilirsiniz. Ayrıca birimlerin bağlantılarını düzenleyebilir, veri hacmini görüntüleyebilir ve birimlere ilişkin diğer yapılandırmaları yapabilirsiniz.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Stacks</strong>: Docker Stack'lerini oluşturmak ve yönetmek için kullanılır. Bir Stack, birden fazla konteyneri içeren ve bunları bir arada çalıştıran bir yapıdır. Bu bölümde mevcut Stack'leri görüntüleyebilir, yeni Stack'ler oluşturabilir, Stack'leri başlatabilir, durdurabilir ve silme işlemleri yapabilirsiniz.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Settings</strong>: Portainer'ın genel yapılandırmasını yapabileceğiniz bölümdür. Bu bölümde kullanıcı hesaplarını yönetebilir, Docker sunucusuna bağlanma ayarlarını düzenleyebilir, kaynak kullanımını yapılandırabilir ve diğer Portainer ayarlarını değiştirebilirsiniz.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Containerlar’a Shell ile bağlanmak:</strong> (Exec Console &amp; Attach)</h2>
<!-- /wp:heading -->

<!-- wp:image {"id":7228,"width":"696px","height":"290px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/execute.png?w=1024" alt="" class="wp-image-7228" style="width:696px;height:290px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Portainer üzerinden herhangi bir Containera shell ile bağlanmak için aşağıdaki adımları izleyebilirsiniz:(Ben Nginx containerine bağlandım)</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Nginx konteynerinin bulunduğu satırı bulun ve <strong>"Quick Actions"</strong> (Hızlı İşlemler) bölümündeki <strong>"Exec Console" </strong>(Kabukta Yürüt) düğmesine tıklayın.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>"Exec Console" düğmesine tıkladığınızda bir pencere açılacaktır ve karşınıza birkaç seçenek çıkacaktır. Bağlanmak istediğiniz kabuğu seçebilirsiniz. Genellikle <strong>"bash"</strong> kabuğu kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>"bash" kabuğunu seçtikten sonra <strong>"Connect"</strong> (Bağlan) düğmesine tıklayın. Bu, seçtiğiniz kabuğa doğrudan bağlanmanızı sağlayacaktır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Ardından, Nginx konteynerinin içinde bir terminal açılacak ve istediğiniz komutları burada çalıştırabileceksiniz.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Bu şekilde Portainer üzerinden Nginx konteynerine bağlanabilir ve içindeki kabuğa erişebilirsiniz. Bu şekilde yapılandırma dosyalarını düzenleyebilir veya diğer işlemleri gerçekleştirebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#Nginx Container’ımızı güncellemek , gereli configleri yapabilmek için <strong>"Nano Editor" </strong>yükleyelim: (Ben nano tercih ettim)<br><strong>apt update &amp;&amp; apt install nano</strong><br><br>#NGINX publish yoluna gitmek için:<br><strong>cd /usr/share/nginx/html</strong><br><br>#index.html dosyasını editlemek için:<br><strong>nano/usr/share/nginx/html/index.html</strong><br><br>#Nginx yapılandırma dosyasının doğruluğunu kontrol etmek için:<br><strong>sudo nginx -t -c /etc/nginx/nginx.conf</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":7216,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/test_page.png?w=1024" alt="" class="wp-image-7216" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Umarım faydalı olmuştur, Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
