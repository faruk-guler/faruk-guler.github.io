---
layout: post
title: What is Azure Bastion? - Azure Bastion Nedir?
date: 2023-01-06 14:01
author: theguler
comments: true
categories: [Azure]
---
<!-- wp:image {"id":5938,"width":489,"height":275,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/azure_bastion.jpg?w=1024" alt="" class="wp-image-5938" width="489" height="275" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>"Bastion" </strong>dilimizde korunan yer, güvenli alan, kale gibi korunaklı anlamlara gelmektedir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Azure Bastion, Azure Portal üzerinden uzak masaüstü erişimi sağlayan bir hizmettir. Bu hizmet sayesinde, sanal makinelerinize RDP veya SSH protokolleri aracılığıyla erişebilirsiniz, ancak önceden yapılandırılmış bir sanal ağda (Virtual Network) açık bir IP adresi gerektirmeden ve Azure Active Directory kimlik doğrulamasını kullanarak.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Azure Bastion, sanal makinelerinizin yönetimine daha güvenli bir erişim sağlamak için tasarlanmıştır. Bu hizmet, sanal makinelerinize doğrudan erişmek için kullanabileceğiniz tek bir noktadır ve kullanıcıların sanal ağ kaynaklarını doğrudan internet üzerinden erişmeleri gerekmeyerek güvenlik risklerini en aza indirir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Azure Bastion, sanal ağınızdaki sanal makinelerin yönetimi için ihtiyacınız olan güvenli, sezgisel ve kullanımı kolay bir arayüz sağlar. Ayrıca, Azure Portal üzerinden tek bir tıklamayla Azure Bastion'u yapılandırabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5939,"width":613,"height":407,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/bastion.png?w=909" alt="" class="wp-image-5939" width="613" height="407" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":5953,"width":613,"height":327,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/connected-bastion.png?w=1024" alt="" class="wp-image-5953" width="613" height="327" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Bastion temel özellikleri nelerdir:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Azure Basiton servisine <strong>HTML5</strong> desteği olan tüm tarayıcılar tarafından erişim sağlanabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Sanal makinenizde bir aracı veya tarayıcınızda ek yazılım gerekmeden destekler.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>SSL(443) üzerinden erişim ile güvenlik duvarlarında bir kural yazmanıza&nbsp; gerek yoktur.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Sanal makineden dünyaya açılan Public IP adresi zorunluluğu yoktur, sanal makinalarınıza Private IP kullanarak RDP/SSH bağlantısını açar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Eğer bir  Ağ Güvenlik Grubu’nuz varsa sadece HTTPS ’e izin vermeniz yeterlidir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Azure Bastion bir PaaS hizmeti olarak sunulur. Gelecekte karşılaşılabilecek Zero-day ataklara karşı Microsoft koruma garantisi içerir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Güvenli Erişim: Azure Bastion, internet üzerinden sanal makinelerinize güvenli bir şekilde erişmenizi sağlar. Bu, sanal makinelerinizi herhangi bir VPN veya RDP istemcisine ihtiyaç duymadan yönetmenizi sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Tamamen Yönetilen: Azure Bastion, tamamen yönetilen bir hizmettir, bu nedenle altyapı yönetimi, yükseltme ve güncelleme gibi tüm sorumluluklar Microsoft tarafından yönetilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Dahili Ağa Erişim: Azure Bastion, bir sanal ağa bağlanmanızı sağlar. Bu, sanal ağınızda bulunan tüm kaynaklara erişmenizi sağlar ve böylece daha güvenli bir şekilde çalışabilirsiniz.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Doğrudan Bağlantı: Azure Bastion, doğrudan bağlantı sağlar. Bu, sanal makinelerinize erişirken ek bir ağ geçidi veya yönlendirici kullanmanızı gerektirmez.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Çoklu Oturumlar: Azure Bastion, aynı anda birden fazla kullanıcıya izin verir. Bu, ekip üyelerinin birbirleriyle kolayca işbirliği yapmasını sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Loglar: Azure Bastion, günlük kayıtları izler ve raporlar. Bu, sanal makinenizdeki işlemleri takip etmenizi ve potansiyel güvenlik sorunlarını belirlemenizi sağlar.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Bastion hangi bölgelerde destekleniyor ?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Şimdilik:</strong>&nbsp;</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Batı ABD - <em>West USA</em></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Doğu ABD - <em>East USA,</em></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Batı Avrupa - <em>West Europe</em></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Orta Güney ABD - <em>Central South USA</em></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Doğu Avustralya - <em>East Australia</em></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Doğu Japonya - <em>East Japan</em></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>bölgelerinde destekleniyor.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Powershell veya Manuel olarak <strong>Azure Bastion</strong> kurulum ve yapılandırmasını yapabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla – Best Regards</strong>.</p>
<!-- /wp:paragraph -->
