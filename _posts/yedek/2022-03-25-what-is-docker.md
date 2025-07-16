---
layout: post
title: Docker nedir ? - What is a Docker?
date: 2022-03-25 22:28
author: theguler
comments: true
categories: [Containerization]
---
<!-- wp:image {"id":2426,"width":415,"height":343,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/homepage-docker-logo.png?w=960" alt="" class="wp-image-2426" width="415" height="343" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Docker, </strong>uygulama ve yazılım geliştiricilerinin yazdıkları kodu bir "konteyner" adı verilen hafif ve taşınabilir bir ortamda paketlemelerine ve çalıştırmalarına izin veren açık kaynaklı bir platformdur. Docker, uygulama geliştirme, dağıtımı ve çalıştırılması için bir dizi araç sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Docker'ın temel amacı, yazılım uygulamalarının herhangi bir ortamda tutarlı bir şekilde çalışmasını sağlamaktır. Bir yazılım uygulaması Docker kullanılarak bir konteyner içinde paketlendiğinde, konteyner tüm gereksinimleriyle birlikte taşınabilir hale gelir. Bu konteyner, geliştiricilerin yazdıkları kodun farklı bilgisayarlarda, sunucularda ve bulut ortamlarında çalıştırılabilmesini sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Docker'ın başlıca avantajlarından biri, yazılım uygulamalarının taşınabilirliğini artırmasıdır. Docker konteynerleri, farklı işletim sistemleri veya donanım ortamlarında da çalışabilir. Bu nedenle, bir uygulamanın Docker konteynerinde paketlenmesi, uygulamanın başka bir yerde çalıştırılmasını kolaylaştırır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Docker, uygulamaların hızlı bir şekilde dağıtılmasını da sağlar. Docker Hub gibi birçok farklı kaynak, hazır kullanıma hazır konteynerler sağlar. Bu konteynerler, uygulama geliştiricilerinin uygulama kısımlarını hızlı bir şekilde oluşturmasını sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Docker'ın diğer avantajlarından biri de, herhangi bir bağımlılık sorunlarının ortadan kaldırılmasıdır. Docker, tüm gereksinimleri konteyner içine dahil ederek, konteynerin farklı ortamlarda çalışması için herhangi bir dış bağımlılık gerektirmez.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sonuç olarak, Docker, uygulama geliştiricilerinin yazılım uygulamalarını paketlemelerini, dağıtmalarını ve çalıştırmalarını sağlayan açık kaynaklı bir platformdur. Bu platform, uygulama taşınabilirliğini artırır, hızlı bir şekilde dağıtım yapılmasına olanak sağlar ve bağımlılık sorunlarını ortadan kaldırır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Docker'ın ana sürümleri şunlardır:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>Docker Engine Community(CE): </strong>Docker'ın açık kaynaklı topluluk sürümüdür. Docker'ın en son özelliklerinin birçoğunu içerir ve ücretsizdir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Docker Engine Enterprise(EE): </strong>Docker'ın iş sınıfı sürümüdür. Ticari kullanım için lisanslanmıştır ve çeşitli ek özellikler, hizmetler ve desteği içerir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Docker Desktop: </strong>Docker'ın macOS ve Windows için masaüstü sürümüdür. Docker Engine Community ve ek masaüstü araçları ile birlikte gelir.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Docker, kendi içinde birçok terim barındıran bir platformdur. Bazı temel terimler şunlardır:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>Container:</strong> Docker'ın temel yapı birimi. Bir container, uygulamanın çalıştırıldığı izole bir ortamdır. Containerlar, birçok avantaj sağlar, örneğin uygulama bağımlılıklarının tek bir yerde toplanması, uygulamanın taşınabilirliği, yüksek ölçeklenebilirlik ve daha hızlı dağıtım.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Image: </strong>Docker container'ının oluşturulması için kullanılan temel yapı bloklarından biridir. Bir image, bir uygulama için gerekli olan tüm bileşenleri içerir, örneğin uygulama dosyaları, bağımlılıkları ve konfigürasyon dosyaları. Bir image, bir container oluşturmak için kullanılabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Dockerfile: </strong>Docker'ın imaj oluşturma sürecini otomatikleştirmek için kullanılan bir dosyadır. Dockerfile, bir imajın nasıl oluşturulacağını belirler ve tüm bağımlılıkların tanımlanmasını sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Registry: </strong>Docker image'lerinin depolanmasını, yönetimini ve paylaşımını sağlayan bir sistemdir. Docker Hub, en popüler Docker registry kaynaklarından biridir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Volume: </strong>Bir container'da depolama alanı olarak kullanılan bir mekanizmadır. Volume, uygulama verilerini container'dan bağımsız olarak saklamak için kullanılabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Network: </strong>Docker container'ları arasındaki iletişimi sağlamak için kullanılan bir mekanizmadır. Docker network'ü, containerlar arasında güvenli bir şekilde veri paylaşımı sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Compose: </strong>Birden fazla container'ı bir arada çalıştırmak için kullanılan bir araçtır. Docker Compose, birden fazla container'ın tek bir sistemde çalıştırılmasını sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Swarm:</strong> Docker'ın varsayılan olarak sunulan container yönetim sistemidir. Docker Swarm, birden fazla container'ın birbirleriyle etkileşimini ve dağıtımını yönetir.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Bu terimler, Docker platformunun temel yapısını oluşturur. Docker kullanıcıları, bu terimleri anlamak ve doğru şekilde kullanmak, uygulamalarını daha etkili bir şekilde yönetmelerine yardımcı olabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Docker Avantajları:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Taşınabilirlik: Docker konteynerleri, uygulamaların farklı ortamlarda ve sistemlerde tutarlı bir şekilde çalışmasını sağlar. Konteynerlerin taşınabilirliği sayesinde, bir uygulama geliştirildikten sonra farklı ortamlarda kolayca çalıştırılabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Hızlı dağıtım: Docker, uygulama geliştiricilerinin uygulama dağıtımını hızlandırır. Konteynerler, hazır kullanıma hazır olarak dağıtılabilir ve uygulama geliştiricileri, uygulamalarının bir kısmını hızlı bir şekilde oluşturabilirler.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Etkili kaynak kullanımı: Docker, kaynakların daha etkili kullanımını sağlar. Konteynerler, sanal makinelerden daha hafiftir ve aynı anda birçok konteyner çalıştırılabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Güvenlik: Docker, uygulamaların güvenli bir şekilde çalışmasını sağlar. Konteynerler, birbirinden izole edilir ve bir konteynerin diğerine müdahale etmesi önlenir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Kolay yönetim: Docker, uygulama geliştiricilerinin uygulamalarını ve bileşenlerini bir arada tutmalarına olanak tanır. Bu, uygulama geliştiricilerinin uygulamalarını daha kolay yönetmelerini ve bakımlarını yapmalarını sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Çeviklik: Docker, uygulama geliştiricilerinin uygulamalarını hızlı bir şekilde geliştirmelerine olanak tanır. Konteynerler, uygulamanın farklı bölümlerinin ayrı ayrı geliştirilmesine izin verir ve uygulamanın hızlı bir şekilde test edilmesini sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Yeniden kullanılabilirlik: Docker, uygulama geliştiricilerinin uygulama bileşenlerini yeniden kullanmalarına olanak tanır. Bu, uygulama geliştiricilerinin daha hızlı ve verimli bir şekilde uygulama geliştirmelerine yardımcı olur.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Destek: Docker, geniş bir topluluk tarafından desteklenmektedir ve birçok kaynak, öğretici ve yardım dokümantasyonu mevcuttur. Bu, uygulama geliştiricilerinin sorunları çözmelerine ve daha iyi bir Docker deneyimi yaşamalarına yardımcı olur.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Tüm bu avantajlar, Docker'ı uygulama geliştiricileri için popüler bir platform haline getirmiştir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Docker vs (VM) Virtual Machine:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Docker ve sanal makineler (VM) arasında bazı temel farklılıklar vardır. İşte bazıları:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>Mimari: </strong>Docker konteynerleri, ana bilgisayarın işletim sistemi çekirdeğini kullanırken, sanal makineler tam bir işletim sistemi üzerinde çalışır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Performans:</strong> Docker konteynerleri, sanal makinelerden daha hızlı çalışır. Çünkü konteynerler, ana bilgisayarın kaynaklarını daha etkili kullanır ve sanal makinelerden daha hafiftir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Taşınabilirlik: </strong>Docker konteynerleri, farklı ortamlarda kolayca taşınabilirken, sanal makineler, farklı ortamlara taşınırken uyumluluk sorunları yaşayabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Kaynak kullanımı:</strong> Docker konteynerleri, daha az kaynak kullanır. Çünkü aynı anda birçok konteyner çalıştırılabilirken, sanal makineler daha fazla kaynak gerektirir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Güvenlik: </strong>Sanal makineler, daha yüksek bir güvenlik seviyesine sahip olabilir, çünkü her sanal makine, kendi işletim sistemi ve diğer bileşenleri ile birlikte tamamen izole edilmiştir. Docker konteynerleri de güvenlidir ancak izolasyon seviyesi daha düşüktür.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Yönetim: </strong>Docker konteynerleri, daha kolay yönetilir. Konteynerler, aynı anda birden fazla uygulama veya bileşen çalıştırmak için kullanılabilirken, sanal makineler, yalnızca tek bir işletim sistemi ve uygulama çalıştırmak için kullanılabilir.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Her iki teknolojinin de kendine özgü avantajları vardır ve hangisinin kullanılacağı, kullanım senaryosuna ve gereksinimlere bağlı olarak değişir. Genel olarak, Docker uygulama geliştirme ve dağıtımı için daha hızlı ve daha verimli bir seçenek olabilirken, sanal makineler daha yüksek bir güvenlik seviyesi veya tamamen izole edilmiş bir ortam gerektiren durumlarda daha iyi bir seçenek olabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Herkese kolaylıklar dilerim. – I wish everyone good luck.</strong></p>
<!-- /wp:paragraph -->
