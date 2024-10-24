---
layout: post
title: Scom Agent Proxy Not Enabled Error Fixed
date: 2023-03-20 19:35
author: theguler
comments: true
categories: [Microsoft System Center Family]
---
<!-- wp:image {"id":6043,"width":361,"height":361,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/scom-icon.webp?w=256" alt="" class="wp-image-6043" width="361" height="361" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong><br>Scom&nbsp;Agent Proxy Not Enabled Sorunu Nedir?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>"Agent proxy not enabled"</strong> (ajan vekili etkin değil) genellikle bir bilgisayar ağı sorunudur ve bir ağ cihazının belirli bir özelliğinin devre dışı bırakılması sonucu ortaya çıkar. Bu genellikle bir proxy sunucusu kullanarak internete erişmeye çalışırken ortaya çıkar. Ayrıca bu hata System Center Operations Manager (SCOM) iletişimini engelleyen bir sorundur. Bu hata, SCOM ajanının proxy yapılandırmasının doğru olmadığını veya hiç yapılandırılmadığını gösterir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bir proxy sunucusu, bir ağdaki birçok bilgisayarın internete erişimini sağlayan bir sunucudur. Proxy sunucusu, internete erişim taleplerini alır, bunları kendisi tarafından gönderir ve yanıtı alır, ardından bu yanıtı orijinal istekte bulunan bilgisayara gönderir. Bu sayede, ağdaki tüm bilgisayarlar tek bir IP adresi kullanarak internete erişebilirler.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>"Agent proxy not enabled"</strong> hatası, genellikle bir bilgisayarın proxy sunucusu ayarlarının yanlış yapılandırılmasından kaynaklanır. Bu nedenle, sorunu çözmek için, bilgisayarın proxy ayarlarını kontrol etmek ve doğru şekilde yapılandırdığından emin olmak gerekir. Proxy ayarlarını doğru şekilde yapılandırdıktan sonra, sorunun giderilmesi gerektiğini düşünüyorum.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>"<strong>Scom agent proxy not enabled" </strong>hatası, Microsoft System Center Operations Manager (SCOM) yönetim aracının bir parçası olan SCOM ajanının, bir başka bilgisayar üzerindeki işlemleri izlemek veya yönetmek için gereken "Proxy" yetkisine sahip olmadığı anlamına gelir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu hatanın nedeni, SCOM ajanının hedef bilgisayara ulaşamaması veya yetkisiz bir şekilde erişmeye çalışması olabilir. Bu durumda, ajanın çalıştığı sunucunun ve hedef bilgisayarın ağ bağlantısının düzgün olduğundan emin olmak gereklidir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu hatayı çözmek için, SCOM yönetim aracı üzerinden ajanın Proxy yetkisini etkinleştirmek gereklidir. Bunu GUI aracılığıyla, <strong>Administration</strong>-Device Management-<strong>Agent Managed</strong> SCOM tarafından yönetilen söz konusu bilgisayara sağ tıklayın ve Özellikler altında, Güvenlik sekmesine tıklayın ve onay kutusuna tıklayın: <strong>Allow this agent to act as a proxy and discover managed objects on other computers.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":6046,"width":509,"height":485,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/scom_fixed.webp?w=647" alt="" class="wp-image-6046" width="509" height="485" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Ayrıca, hedef bilgisayarın ağ ayarlarının doğru olduğundan ve SCOM ajanının çalıştığı sunucunun yönetim aracına doğru bir şekilde yapılandırıldığından emin olunması gereklidir. Bu adımların tamamlanmasına rağmen, sorun devam ediyorsa, ajanın yeniden yüklenmesi veya SCOM yönetim aracının tamamen yeniden yapılandırılması gerekebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Scom Agent Proxy Not Enabled PowerShell</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>PowerShell yönetici olarak çalıştırın.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Get-SCOMAgent | where {$_.ProxyingEnabled -match "False"}</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Eğer sonuç "True" yerine "False" ise, ajan proxy özelliği etkinleştirilmemiştir. Aşağıdaki komutu kullanarak proxy özelliğini etkinleştirin.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Get-SCOMAgent | where {$_.ProxyingEnabled -match "False"} | Enable-SCOMAgentProxy</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Proxy özelliğinin etkinleştirildiğinden emin olmak için aşağıdaki komutu tekrar çalıştırın.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Get-SCOMAgent | where {$_.ProxyingEnabled -match "False"}</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Bu işlemi tamamladıktan sonra, SCOM agent proxy özelliği etkinleştirilmiş olmalıdır. Hata mesajının artık görüntülenmediğinden emin olmak için SCOM ortamınızı yeniden başlatmayı da deneyebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Sorun Hala düzelmedi mi?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Eğer yukarıdaki adımları uyguladıysanız ve sorun hala devam ediyorsa, aşağıdaki önerileri deneyebilirsiniz:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>SCOM agent'ını yeniden yükleyin ve yeniden yapılandırın.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>SCOM agent'ını yönettiğiniz sunucu ve SCOM yönetim sunucusu arasındaki bağlantıyı kontrol edin. Bu bağlantı doğru yapılandırılmamışsa veya kesintiye uğramışsa, SCOM agent proxy özelliği de çalışmayabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>SCOM yönetim sunucusu ve agent'ı arasındaki güvenlik duvarı veya diğer ağ bileşenlerini kontrol edin. Bu bileşenler, SCOM agent proxy özelliğinin doğru şekilde çalışmasını engelleyebilir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>SCOM <strong>Agent Proxy </strong>özelliğini etkinleştirdikten sonra, SCOM agent'ının yeniden başlatılması gerektiğinden emin olun. Bu işlemi yapmak için aşağıdaki komutu kullanabilirsiniz:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Restart-Service HealthService</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Eğer sorun hala devam ederse, System Center Operations Manager (SCOM) yeniden kurulması gerekebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla – Best Regards</strong>.</p>
<!-- /wp:paragraph -->
