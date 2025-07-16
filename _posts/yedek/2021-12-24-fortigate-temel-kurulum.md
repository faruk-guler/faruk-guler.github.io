---
layout: post
title: FORTİGATE İLK KURULUM NASIL YAPILIR ?
date: 2021-12-24 09:54
author: theguler
comments: true
categories: [UTM (Unified Threat Management)]
---
<!-- wp:paragraph -->
<p><strong>FortiGate,</strong> Fortinet tarafından geliştirilen bir ağ güvenlik donanımıdır. Geniş bir yelpazedeki ağ güvenliği çözümlerini tek bir platformda birleştirir ve ağ güvenliğini yönetmek için bir arayüz sağlar. FortiGate, Firewall, VPN, İçerik Filtreleme, Intrusion Prevention System (IPS), Antivirüs ve Web Filtreleme gibi çeşitli güvenlik özelliklerine sahiptir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>FortiGate, </strong>küçük, orta ve büyük ölçekli işletmeler için uygun şekilde ölçeklenebilir. Ayrıca, bulut tabanlı veya sanal FortiGate seçenekleri de mevcuttur. FortiGate'in çeşitli modelleri, farklı bant genişlikleri, arayüz sayısı ve özellikleri sunar ve kullanıcılara ihtiyaçlarına uygun bir seçim yapma imkanı sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>FortiGate, kolay kullanımı, yüksek performansı ve ölçeklenebilirliği ile tanınır. Ayrıca, güvenlik özellikleri sürekli olarak güncellenerek yeni tehditlere karşı koruma sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Cihazın fiziksel bağlantılarını yaptıktan sonra, varsayılan olarak atanan IP adresine, "<a href="https://192.168.1.99/">https://192.168.1.99</a>" adresinden erişebilirsiniz. Bu erişim için, kullanıcı adını "admin" olarak ve şifreyi boş bırakarak giriş yapabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":771,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/1-2.png?w=1024" alt="" class="wp-image-771" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Giriş yaptıktan sonra, WAN ayarlarına erişmek için "Interfaces -&gt; WAN" adımlarını takip edin.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Eğer internet sağlayıcınız PPoE ile giriş yapmanızı sağlıyorsa ve kullanıcı ayarlarını sizinle paylaşıyorsa, internet çıkışınızı sağlamak için modeminizin bridge mode özelliğini etkinleştirerek, önce gerekli ayarları yapmanız gerekmektedir. Yukarıda belirtildiği gibi, gerekli ayarları yaptıktan sonra internet çıkışınızı sağlayabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Yukarıda belirtildiği gibi değilse, size özel bir IP adresi atandıysa, aşağıdaki iki adımı takip etmeniz gerekmektedir.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":774,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/3.png?w=1024" alt="" class="wp-image-774" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>WAN ayarlarından "Manuel" seçeneğini seçtikten sonra, internet sağlayıcınızın size verdiği IP adresini ve subnet bilgisini, yukarıda işaretli olan alana girerek kaydedin.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":776,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/4.png?w=1024" alt="" class="wp-image-776" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Internet çıkışını sağlamak için "Static Routes" eklememiz gerekiyor. Eğer Static Routes eklenmezse internet çıkışı sağlanamaz. Internet sağlayıcınızın size verdiği Gateway adresini firewall ayarlarına tanıtmanız gerekiyor. Bu adımdan sonra internet erişiminiz sağlanacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":778,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/5.png?w=630" alt="" class="wp-image-778" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>"Interfaces -&gt; LAN" ayarlarına girdikten sonra, yukarıda işaretlenen alandan, Firewall'unuzu erişim IP adresinizi ve gateway bilgisini belirleyiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":780,"width":566,"height":516,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/6.png?w=639" alt="" class="wp-image-780" width="566" height="516" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":781,"width":513,"height":327,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/77.png?w=513" alt="" class="wp-image-781" width="513" height="327" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Eğer 192.168.1.1'den farklı bir gateway belirlediyseniz, yukarıdaki işlemi yaparak gateway'inize uygun DHCP ile dağıtılacak IP aralığınızı otomatik olarak belirleyebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Daha detaylı anlatım için <strong>MikronBilgisayar </strong>' <strong>FORTİGATE</strong> Temel Kurulum videosunuda izleyebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:embed {"url":"https://www.youtube.com/watch?time_continue=60\u0026amp;v=9Fi6sUtT5TE\u0026amp;feature=emb_title","type":"rich","providerNameSlug":"gomme-tutucu","responsive":true,"align":"left","className":"wp-embed-aspect-16-9 wp-has-aspect-ratio"} -->
<figure class="wp-block-embed alignleft is-type-rich is-provider-gomme-tutucu wp-block-embed-gomme-tutucu wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
https://www.youtube.com/watch?time_continue=60&amp;v=9Fi6sUtT5TE&amp;feature=emb_title
</div></figure>
<!-- /wp:embed -->

<!-- wp:paragraph -->
<p><strong>Faydalı olması dileğiyle. – Hope it’s useful.</strong></p>
<!-- /wp:paragraph -->
