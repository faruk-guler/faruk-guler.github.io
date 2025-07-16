---
layout: post
title: Installing Exe Application With Group Policy
date: 2022-02-07 23:08
author: theguler
comments: true
categories: [Windows Group Policy GPO]
---
<!-- wp:image {"id":1526,"width":154,"height":154,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/exe.png?w=512" alt="" class="wp-image-1526" width="154" height="154" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Domain ortamında kurmak istediğimiz uygulamaları&nbsp;<strong>.MSİ</strong>&nbsp;paketlerini kullanarak&nbsp;Group&nbsp;Policy&nbsp;vasıtasıyla dağıtabilir. Kuracağınız yazılımın <strong>.Msi</strong> hali yok sadece <strong>.Exe </strong>hali varsa o programı GPO ile kuramayacağınız anlamına gelir. (Eğer ilgili script yoksa)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Peki herşey buraya kadarmıydı ?</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu yazımızda şuanda sadece  <strong>.Exe </strong> kurulum hali bulunan<strong> Internet Download Manager</strong> (İDM) yazılımının <strong>idm_64.msi </strong>dosyasına dönüştürme işlemini yaparak Domain ortamında GPO ile kurulumunu yapacağız.</p>
<!-- /wp:paragraph -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://www.internetdownloadmanager.com/register/IDMlib/images/idman_logos.png" alt="" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Bu dönüşüm için <strong>EMCO MSI Package Builder </strong>yazılımı kullanacağız. bu yazılımın 30 günlük demene sürümünü indirip kurulumu yapıyoruz.. </p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1792,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/v1.png?w=1024" alt="" class="wp-image-1792" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Resimlerde aşama aşama belirtiğim şekilde <strong>idman 64.exe</strong> dosyasının kurulumunu yapıyoruz. biz kurulumu yaparken <strong>EMCO MSI Package Builder </strong>bu adımları <strong>capture</strong> edecek ve otomatik bir <strong>.MSi </strong>dosyası oluşturacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1794,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/v2-1.png?w=1024" alt="" class="wp-image-1794" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":1795,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/v3.png?w=1024" alt="" class="wp-image-1795" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":1796,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/v4.png?w=1024" alt="" class="wp-image-1796" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":1798,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/v5.png?w=1024" alt="" class="wp-image-1798" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":1799,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/v6.png?w=1024" alt="" class="wp-image-1799" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":1800,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/v7.png?w=1024" alt="" class="wp-image-1800" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":1802,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/v8.png?w=1024" alt="" class="wp-image-1802" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":1804,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/v10.png?w=1024" alt="" class="wp-image-1804" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Bu kısımda yeniden build edeceğimiz için <strong>versiyon numarası:</strong> <strong>iconu:</strong> <strong>platformu:</strong> x64, x86 <strong>dil: </strong> kaydedeceğimiz <strong>path:</strong> vb. belirleyip FINISH diyerek bitirelim, bu kısımda Capture alacağı için istediğiniz ayarlar ile <strong>idman 64.exe</strong> yazılımını kurmanızı isteyecektir. <strong>Kuruyoruz...</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1806,"width":549,"height":414,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/v11.png?w=1024" alt="" class="wp-image-1806" width="549" height="414" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":1807,"width":617,"height":460,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/v12.png?w=1024" alt="" class="wp-image-1807" width="617" height="460" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":1808,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/v13.png?w=1024" alt="" class="wp-image-1808" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><span style="text-decoration:underline">Evet buraya kadardı</span> :) Bu aşamada (<strong>IDM </strong>bilgisayarınıza kuralacaktır ama bunu artık kaldırabilirsiniz) yol olarak belirttiğim Desktop üzerinde <strong>idm_64.msi </strong>dosyamız build edilmiş şekilde duruyor. Artık GPO için kullanılabilir haldedir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
