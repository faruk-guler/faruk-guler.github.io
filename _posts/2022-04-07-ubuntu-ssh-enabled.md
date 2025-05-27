---
layout: post
title: Ubuntu’da SSH Servisini Etkinleştirme
date: 2022-04-07 19:21
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":2571,"width":541,"height":288,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ssh-connect.png?w=750" alt="" class="wp-image-2571" width="541" height="288" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>SSH Nedir?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>SSH, İngilizce "Secure Shell" kelimelerinin kısaltması olan güvenli bir ağ protokolüdür. SSH, ağ trafiğini şifreleyerek ve kimlik doğrulaması yaparak ağ güvenliğini arttırır. Bu, bilgisayar kullanıcılarının uzak sunuculara ve diğer ağ kaynaklarına güvenli bir şekilde erişmesini sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>SSH, bilgisayar kullanıcılarının uzak sunuculara ve diğer ağ kaynaklarına güvenli bir şekilde erişmesine olanak tanır. Örneğin, bir sistem yöneticisi, bir sunucuya SSH kullanarak uzaktan erişim sağlayabilir ve sunucunun yapılandırmasını veya bakımını gerçekleştirebilir. SSH, aynı zamanda ağ kaynaklarına güvenli bir şekilde dosya transferi yapmak için de kullanılabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>SSH, ağ trafiğini şifreleyerek ve kimlik doğrulaması yaparak ağ güvenliğini arttırır. Şifreleme işlemi, ağ trafiğinin saldırganlar tarafından ele geçirilmesini önleyerek, bilgilerin gizliliğini korur. Kimlik doğrulama işlemi ise, kullanıcının doğru bir şekilde kimliklendirilmesini sağlar ve izinsiz erişimlerin önlenmesine yardımcı olur.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>SSH, ayrıca farklı depolama biçimleriyle de kullanılabilir. Örneğin, SSH tünelleri, ağ trafiğinin güvenli bir şekilde yönlendirilmesine olanak tanır ve ağ kaynaklarına güvenli bir şekilde erişim sağlar. SSH, ayrıca X11 iletişim protokolü üzerinden grafiksel arabirimlerin uzaktan erişimini de sağlayabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sonuç olarak, SSH, güvenli bir ağ protokolüdür ve bilgisayar kullanıcılarının uzak sunuculara ve diğer ağ kaynaklarına güvenli bir şekilde erişmesini sağlar. Şifreleme ve kimlik doğrulama gibi özellikleri sayesinde ağ güvenliğini artırır ve farklı depolama biçimleriyle de kullanılabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Öncelikle ağ araçlarını kuralım. - First, let's set up the network tools.</strong>
sudo apt install net-tools

<strong>SSH Servisini Etkinleştirmek için</strong> <strong>- To Enable SSH Service</strong>:
sudo apt install openssh-server

<strong>SSH Server kontrol etmek için</strong> <strong>- To check SSH Server:</strong>
sudo systemctl status ssh
<strong>#Active: active (running) şeklinde döndürecektir.</strong>

<strong>SSH 'a izin vermek için</strong> <strong>- To allow SSH:</strong>
sudo ufw enable
sudo ufw allow ssh

<strong>CMD &amp; Powershell ile SSH Bağlantısı için</strong> <strong>- For SSH Connection with CMD &amp; Powershell:</strong>
ssh username@ip_addresi
<strong>#ssh farukguler@10.4.45.93</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Bu değişikliğin etkili olabilmesi için servisi yeniden başlatmak gerekir.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo systemctl restart ssh</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Servis yeniden başladıktan sonra sorunsuz bir şekilde SSH bağlantısı kurabilirsiniz. eğer hala bağlantı kuramıyorsanız kuruluşunuzdaki<strong>(şirket-kurum vs)</strong> network yöneticisine başvurunuz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla - Best regads</strong></p>
<!-- /wp:paragraph -->
