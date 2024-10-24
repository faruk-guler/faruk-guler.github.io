---
layout: post
title: Windows Server Active Directory Domain Rename
date: 2023-03-27 00:38
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:image {"id":6269,"width":"498px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/index_rename.jpg?w=1024" alt="" class="wp-image-6269" style="width:498px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Active Directory Domain Rename işlemi, Active Directory ortamındaki etki alanı adını değiştirmek için kullanılır. Bu işlem, etki alanı adını değiştirmenin gerekli olduğu durumlarda kullanılır, </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Active Directory Domain Rename işlemi, </strong>Active Directory ortamında yapısal değişikliklere neden olduğundan, doğru bir şekilde planlanmalı ve yürütülmelidir. Bu işlem, etki alanı adının değiştirilmesiyle birlikte, etki alanı denetleyicilerinin yeniden adlandırılması, DNS kayıtlarının güncellenmesi ve etki alanı adının kullanıldığı tüm hizmetlerin <strong>(</strong>Örneğin<strong> Exchange, SharePoint vb.</strong>) yeniden yapılandırılması gibi diğer adımları da içerir. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Active Directory Domain Rename işlemi, </strong>Windows Server 2003 veya daha yeni sürümlerinde desteklenir ve yapılması gereken bir dizi hazırlık adımı ve güvenlik denetimi vardır. Bu nedenle, bu işlemi gerçekleştirmeden önce, Microsoft tarafından sağlanan resmi belgeleri incelemeniz ve bu işlemi gerçekleştirmek için uygun bir plan hazırlamanız, kesinti ve hizmet aksamalarına hazırlıklı olmanız çok önemlidir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Genel olarak aşağıdaki nedenlerden dolayı yapılır:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li><strong>Kurumsal yeniden yapılandırma: </strong>Şirketlerin yapısında zaman içinde değişiklikler olabilir ve bu nedenle etki alanı adının değiştirilmesi gerekebilir. Örneğin, bir şirket, başka bir şirketi satın aldığında veya bir bölümünü ayırdığında, etki alanı adını değiştirmesi gerekebilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Kurumsal kimlik değişikliği:</strong> Kuruluşların isimleri, markaları veya kimlikleri zamanla değişebilir. Bu durumda, etki alanı adı da değiştirilebilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Mergers and Acquisitions: </strong>Şirketlerin birleşmesi veya satın alınması durumunda, farklı etki alanları birleştirilebilir veya bir etki alanı adı diğerine değiştirilebilir.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Peki bu işlemi Nasıl yapacağız?</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>****</strong>Etki Alanınızda Exchange mevcutsa AD etki alanı adını kesinlikle<strong> DEĞİŞTİRMEYİNİZ!</strong> (Exchange Server 2003 hariç)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>****</strong>Bir etki alanını yeniden adlandırmak için Windows Server 2003 veya daha yenisine ihtiyacınız vardır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>***** </strong>İşlem öncesi kesinlikle Etki alanı denetleyicilerinizin&nbsp;güncel bir yedeğini &amp; Snapshot almanız gerekmektedir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Öncelikle mevcut etki alanı denetleyicilerinizde yeni etki alanınız için bir DNS bölgesi oluşturun.&nbsp;Bunu yapmak için , DNS Manager'i  açın  <strong><strong>Forward Lookup Zone&nbsp;</strong></strong>üzerinden yeni bir zone <strong>oluşturun ve bunu eski guler.com etki alanınızdaki tüm DNS sunucularında </strong>replike edin. TÜM DNS Serverlerde replike olana kadar bekleyin.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>PowerShell'i kullanarak yeni bir <strong>DNS Zone</strong> oluşturalım:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Add-DnsServerPrimaryZone -Name gulmez.net -ReplicationScope "Domain" –PassThru</strong>


#PS C:\Users\Administrator&gt; Add-DnsServerPrimaryZone -Name gulmez.net -ReplicationScope "domain" –PassThru

#ZoneName                            ZoneType        IsAutoCreated   IsDsIntegrated  IsReverseLookupZone  IsSigned       
--------------  -------                 --------        -------------   --------------  -------------------  --------         ---------       -------------   --------------
<strong>gulmez.net</strong>                          Primary         False           True            False                False   
       
PS C:\Users\Administrator&gt; </pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>****Yeni oluşturulan </strong>gulmez.net <strong>DNS Zone'nin tüm DNS 'lerde replike olana kadar bekleyin.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Geçerli AD üzerinde bir&nbsp;<strong>Domainlist.xml</strong><code> </code><strong><code>***rendom /list</code>&nbsp;</strong>dosyası oluşturmak için:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>rendom /list
Get-Content .\Domainlist.xml</strong>

#Bu XLM dosyası "C:\Users\Administrator\Domainlist.xml" yoluna export edilecektir.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Domainlist.xml </strong>dosyasını açın ve yeni domain ismine göre editleyin ve kaydedin:</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":6275,"width":"566px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/xml_old.png?w=891" alt="" class="wp-image-6275" style="width:566px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":6276,"width":"566px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/xml_new.png?w=740" alt="" class="wp-image-6276" style="width:566px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Ardından Bu, mevcut Domainin yapılandırmasını ayrıntılı olarak gösteren bir çıktı sağlayacağız. Bu Powershell komutunu çalıştırıyoruz:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>rendom /showforest</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Buna müteakip , AD bölümlerinin yeni yapılandırmasıyla birlikte yeni Domainlist.xml'yi Etki Alanı adlandırma yöneticisi FSMO rolüne sahip etki alanı denetleyicisine yükleyeceğiz:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>rendom /upload</strong>

#PS C:\Users\Administrator&gt; rendom /upload

<strong>The operation completed successfully.</strong>

PS C:\Users\Administrator&gt;

#Görüldüğü üzere yeni XML dosyamız yüklendi.

<strong>netdom query fsmo</strong>
#FSMO rollerini sorgulayalım. hala eski isimleriyle göreceksiniz.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Ortamdaki tüm Domain Controller sunucuların, kullanılabilirliğini doğrulayalım ve herhangi bir hata döndürmediğinden emin olalım:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>rendom /prepare</strong>

#PS C:\Users\Administrator&gt; rendom /prepare 
Waiting for DCs to reply.

Waiting for DCs to reply.

ANATOLIA.guler.com was prepared successfully

1 server contacted, 0 servers returned Errors

The operation completed successfully.
PS C:\Users\Administrator&gt;</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>***Artık etki alanını yeniden adlandıracaktır. (yeni ayarların uygulanması için otomatik olarak yeniden başlatılacak):</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>rendom /execute</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":6281,"width":"744px","height":"auto","aspectRatio":"1.9667458432304037","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/shut_down.png?w=1024" alt="" class="wp-image-6281" style="aspect-ratio:1.9667458432304037;width:744px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Sunucumuz yeniden başlatıldı, yeni domain name ile login olmalısınız. login sonrası bunu <strong>Whoami </strong>ile doğrulayabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Whoami</strong>

PS C:\Users\Administrator&gt; whoami
gulmez\administrator
PS C:\Users\Administrator&gt;</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":6283,"width":"624px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/gulmez.png?w=1024" alt="" class="wp-image-6283" style="width:624px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>İşlem sonrası GPO Managere girerseniz açılamadığını ve hala eski alan adını aradığını göreceksiniz. bunu <strong>Powershell </strong>yardımı ile düzeltebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":6285,"width":"462px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/gpo_err.png?w=489" alt="" class="wp-image-6285" style="width:462px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>gpfixup /olddns:guler.com /newdns:gulmez.net</strong>


PS C:\Users\Administrator&gt; gpfixup /olddns:guler.com /newdns:gulmez.net


Start fixing group policy (GroupPolicyContainer) objects:

Start fixing site group policy links:

Start fixing non-site group policy links:Group Policy fix up utility Version 1.1 (Microsoft)


-----------------------------------
<strong>gpfixup tool executed with success.</strong>

PS C:\Users\Administrator&gt; </pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Ardından <strong>NetBIOS</strong> etki alanı adını da güncelleyip  <strong>restart </strong>etmemiz gerekiyor:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>gpfixup /oldnb:DCCompName /newnb:GULMEZ</strong>

PS C:\Users\Administrator&gt; gpfixup /oldnb:<strong>DCCompName</strong> /newnb:<strong>GULMEZ</strong>

Start fixing group policy (GroupPolicyContainer) objects:Group Policy fix up utility Version 1.1 (Microsoft)

............
gpfixup tool executed with success.

PS C:\Users\Administrator</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Ardından, her bir DC'yi manuel olarak kendi yapınıza göre yeniden adlandırın ve bunları birincil adlar yapın:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Devamında ise sunucuyu <strong>restart e</strong>diniz.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>netdom computername compname.guler.com /add:compname.gulmez.net
netdom computername compname.guler.com /makeprimary:compname.gulmez.net
#Restart-Computer -Force</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Aşağıdaki komut, eski etki alanınıza olan bağlantıları "DomainSid" adı verilen bir (geçici nesneyi) DC üzerinden 'den kaldıracaktır:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>rendom /clean</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Aşağıdaki komut, yapılandırma sırasında durdurduğumuz işlemleri devreye alarak yapılandırma kilidini açmamızı sağlayacaktır:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>rendom /end</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":6290,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/dns_enabled.png?w=1024" alt="" class="wp-image-6290" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#Etki alanı bilgilerimizi kontrol delim
<strong>Get-ADDomain gulmez.net </strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":6322,"width":"677px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/gulmez_exp.png?w=1024" alt="" class="wp-image-6322" style="width:677px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>****</strong>Görüldüğü gibi Etki alanınızı yeniden adlandırma işlemi başarı ile tamamlandı ve DNS Manager ve Powershell üzerinde teyit edildi, Son olarak DC' replikasyon durumunu ve DC'lerdeki hataları kontrol edin. (Örnek: CA, Failover Clusters, vb.)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla – Best Regards</strong></p>
<!-- /wp:paragraph -->
