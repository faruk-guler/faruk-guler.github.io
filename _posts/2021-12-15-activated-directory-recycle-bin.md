---
layout: post
title: Active Directory Recycle Bin Activated
date: 2021-12-15 21:17
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:paragraph -->
<p>Active Directory' de Nesne silindiğinde geri dönüşüm için default süre 180 gün(6 aydır) bu şekilde 180 gün sonunda <strong>Garbage Collection</strong>(çöp toplama işlemi) sayesinde objeler otomatik olarak silinir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>*</strong>Windows Server 2000 ve Windows Server 2003 = 60 Gün</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>*</strong>Windows Server 2003 Sp1 ve sonrası = 180 Gün</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>180 günlük süre  <strong>tombstoneLifetime</strong> attribute değeri değiştirilebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>"tombstoneLifetime"</strong>&nbsp;özelliği, &nbsp;silinen bir nesnenin Active Directory'den kalıcı olarak kaldırılmasından önceki gün sayısını tanımlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>"msDS-DeletedObjectLifetime"</strong> ise varsayılan olarak değeri, tombstoneLifetime özniteliğini(attribute) değeri ile aynıdır. (180 gün)</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">1:<strong>ADSI Edit </strong>Konsoluna erişin.
2: “Configuration” bölümüne bağlanın.
3: “CN=Configuration,DC=www,DC=domain,DC=com” → <strong>“CN=”Services”</strong>e gidin ve <strong>“CN=Windows NT”</strong>yi genişletin.
4: <strong>“CN=Directory Service”</strong> üzerine sağ tıklayın ve içerik menüsünden “Properties” seçeneğine tıklayın.
5: "Özellikler" iletişim kutusunda <strong>"msDS-deletedObjectLifetime"</strong> özelliğini arayın. Gün cinsinden varsayılan yaşam döngüsünü gösterir. bu kısımdan değiştirin</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Active Directory Recycle Bin özelliğini aktif edilmesi durumunda tekrar Disable <strong>(Pasif)</strong> <strong>edilemez!!!</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>If the Active Directory Recycle Bin feature is activated, it cannot be <strong>(Disabled) </strong>again.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Silinen OU' lar içinde Recycle Bin özelliğini sorunsuz olarak çalışmaktadır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Recycle Bin özelliğini aktif hale getirmeden önce silinmiş AD objeleriniz varsa, bu objeler Recycle Bin ile geri getirilemezler.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>A) <strong>Active Directory Administrative Center ( ADAC )&nbsp;</strong>konsolunu açıyoruz - We open the Active Directory Administrative Center (ADAC) console</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>AD Domain Name (Guler.com) üzerine gelip sağ tuş&nbsp;<strong>Enable&nbsp;Recycle Bin</strong>&nbsp;diyerek bu özelliği aktif edebiliriz. Active Directory Recycle Bin özelliğini aktif edilmesi durumunda tekrar Disable (Pasif) edemeyeceğiz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>We can activate this feature by hovering over AD Domain Name (Guler.com) and right-clicking&nbsp;Enable&nbsp;Recycle Bin.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>If the Active Directory Recycle Bin feature is activated, we will not be able to Disable it again. <span style="text-decoration:underline"><strong>IMPORTANT!!</strong></span></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":667,"width":906,"height":412,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dcc.png?w=1024" alt="" class="wp-image-667" width="906" height="412" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Ben daha önceden aktif ettiğim için burada pasif olarak görünmekte- It appears as passive because I activated it before.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":669,"width":681,"height":455,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/1.png?w=852" alt="" class="wp-image-669" width="681" height="455" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>AD Administrative Center (ADAC) konsolunda bulunan Deleted Objects klasörüne tıklıyoruz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Click on the Deleted Objects folder in the AD Administrative Center (ADAC) console.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":670,"width":865,"height":376,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/12.png?w=1024" alt="" class="wp-image-670" width="865" height="376" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Restore:</strong> Bu seçenek silinen kullanıcıyı silindiği OU içine direkt olarak geri getirecektir.<br><strong>Restore to:</strong> Bu seçenek ise silinen kullanıcıları belirleyeceğiniz Organizational Unit (OU) içine geri getirecektir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Restore:</strong> This option will directly restore the deleted user to the OU from which they were deleted.<br><strong>Restore to:</strong> This option will bring the deleted users back into the Organizational Unit (OU) you specify.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
