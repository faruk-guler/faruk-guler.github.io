---
layout: post
title: DNS Recursion Nedir-Nasıl Kapatılır?
date: 2023-03-25 21:01
author: theguler
comments: true
categories: [Hybride]
---

<!-- wp:paragraph -->
<p><strong>DNS rekürsif sorgulama (recursion), </strong>bir DNS sunucusunun, bir istemcinin DNS sorgusunu yanıtlayabilmek için, diğer DNS sunucularına yönelik sorgular yapmasıdır. Bu işlem, DNS sunucusunun, istemciye hızlı ve doğru bir yanıt sağlaması için gereklidir. Ancak, DNS rekürsif sorgulama özelliği, DNS sunucusunu potansiyel saldırılara açık hale getirebilir. Bu nedenle, bazı durumlarda DNS rekürsif sorgulama özelliği kapatılması gerekebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Windows için DNS Recursion Kapatma</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":6246,"width":"407px","height":"auto","aspectRatio":"0.8977955911823647","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/recursion.png?w=500" alt="" class="wp-image-6246" style="aspect-ratio:0.8977955911823647;width:407px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li>DNS Yöneticisi aracını açın: Başlat menüsünden "DNS Yöneticisi" aracını açın.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>DNS sunucusunu seçin: DNS sunucunuzu seçin ve "Properties" özelliklerine tıklayın.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>"Advanced" sekmesini seçin: "Advanced" sekmesine tıklayarak, DNS sunucu ayarlarını görüntüleyin.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>"Disable recursion (also disables forwarders)" seçeneğini işaretleyin: "Advanced" sekmesinde, "Disable recursion (also disables forwarders)" seçeneğini işaretleyin.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Kapatma işleminden sonra DNS servisini restart etmeniz gerekir. </li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Linux için DNS Recursion Kapatma</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":6246,"width":"607px","height":"250","aspectRatio":"0.8977955911823647","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/recursion_linux.png?w=500" alt="" class="wp-image-6246" style="aspect-ratio:0.8977955911823647;width:607px;height:250" /></figure>
<!-- /wp:image -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li><strong>BIND </strong>(Berkeley Internet Name Domain) açık kaynaklı bir DNS sunucusu yazılımıdır. DNS rekürsif sorgulama özelliğini yönetmek ve devre dışı bırakmak için kullanılabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Linux'ta DNS sunucunuz <strong>"named" </strong>adlı servis tarafından yönetilir. DNS sunucunuzun yapılandırma dosyası olan named.conf dosyasını açın.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Bu dosya genellikle <strong>/etc/bind/ </strong>dizini altında bulunur. Aşağıdaki komutu kullanarak <strong>named.conf </strong>dosyasını açabilirsiniz</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo nano /etc/bind/named.conf</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li>"options" bölümünde <strong>"recursion no;" </strong>satırını ekleyin: <strong>named.conf</strong> dosyasındaki <strong>"options" </strong>bölümüne aşağıdaki satırı ekleyin</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">options {<br>    directory "/var/cache/bind";<br>    // Allow recursion only to trusted clients<br><br>   // recursion yes;<br><br><strong>    recursion no;</strong><br><br>    // If there is a firewall between you and nameservers you want<br>    // to talk to, you may need to fix the firewall to allow multiple<br>    // ports to talk.  See http://www.kb.cert.org/vuls/id/800113<br>    // If your ISP provided one or more IP addresses for stable <br>    // nameservers, you probably want to use them as forwarders.  <br>    // Uncomment the following block, and insert the addresses replacing <br>    // the all-0's placeholder.<br>    // forwarders {<br>    //      0.0.0.0;<br>    // };<br>    // ...<br>}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>named.conf </strong>dosyasındaki değişiklikleri kaydedin ve named servisini yeniden başlatın. Ayrıca sonucu NMAP ile test edebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo systemctl restart named</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo systemctl restart bind9</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Ancak, unutmayın ki DNS rekürsif sorgulama özelliği, DNS sunucunuzun doğru çalışması için gereklidir. Bu nedenle, bu özelliği devre dışı bırakırken, doğru yapılandırmayı sağlamak için DNS sunucunuzun diğer özelliklerini de gözden geçirmeniz gerekebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Son olarak, belirli bir DNS sunucusu üzerinde rekürsif sorgulamayı devre dışı bırakmak, genellikle bir ağda bulunan tüm cihazlar için geçerli değildir. Diğer DNS sunucuları üzerinden hala rekürsif sorgulama yapılabilir. Bu nedenle, ağınızdaki tüm DNS sunucularında bu ayarı yapmanız gerekmektedir.</p>
<!-- /wp:paragraph -->
