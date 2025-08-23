---
layout: post
title: Transfer of WSUS updates to Private Networks
date: 2021-12-20 13:41
author: theguler
comments: true
categories: [Microsoft System Center Family]
---
<!-- wp:paragraph -->
<p>Örnek topolojimizde İnternet erişimi olan Networkten, <strong>"erişim olmayan kapalı" </strong>ağa yapılan aktarım anlatılmaktadır.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":684,"sizeSlug":"large","linkDestination":"none","className":"is-resized"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/wsus_local.png?w=507" alt="" class="wp-image-684" /></figure>
<!-- /wp:image -->


<!-- wp:paragraph -->
<p><strong>İnternet erişimli ağdan</strong> indirilen güncellemeler <strong>wsus.guler.com</strong> sunucusunda <strong>D:\Wsus\WsusContent</strong> dizininde kendi hiyerarşisine göre klasörler oluşturmaktadır. Oluşturulan bu klasörler Export işleminden sonra kapalı networkümüze taşımamız gerekmekte.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":684,"sizeSlug":"large","linkDestination":"none","className":"is-resized"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/2.jpg?w=907" alt="" class="wp-image-684" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>İnternet erişimli sunucumuzda (<strong>wsus.guler.com</strong>) D:\Wsus altında Export adında bir klasör oluşturalım ardından komut satırını açalım ve komutumuz çalıştıralım. <strong>D:\Wsus\Export\WsusUtil.exe export WsusExport.xml.gz WsusWxport.log &nbsp;</strong>(Komut satırını açarken mutlaka &nbsp;“<strong>Run as administrator</strong>” ile açmamız gerekir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Komut satırında <strong>Export </strong>işlemi başarılı bir şekilde bittikten sonra Şekildeki gibi <strong>successfully</strong> görmemiz gerekmektedir. (<strong>Export</strong> işlemi indirilen güncellemenin boyutuna göre birkaç saat sürebilir.)</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":686,"sizeSlug":"large","linkDestination":"none","className":"is-resized"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/3.jpg?w=676" alt="" class="wp-image-686" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Export işlemi bittikten sonra, <strong>Expor</strong>t klasörü ve <strong>WsusContent</strong> Klasörlerini Kapalı ağda bulunan <strong>guler.local</strong> sunucusuna kopyalamalıyız. “WsusContent” klasörü kopyalarken klasörün içeriğini <strong>guler.local </strong>sunucusundaki<strong> </strong>gibi&nbsp; <strong>WsusContent</strong> &nbsp;klasörünün içerisine yapıştırınız. <strong><span style="text-decoration:underline">Klasör olarak üzerine yaz işlemi yapmayınız!!</span></strong></p>
<!-- /wp:paragraph -->

<!-- wp:gallery {"linkTo":"none"} -->
<figure class="wp-block-gallery has-nested-images columns-default is-cropped"><!-- wp:image {"id":689,"width":486,"height":246,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/4.jpg?w=545" alt="" class="wp-image-689" style="width:486px;height:246px" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":690,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/5.jpg?w=483" alt="" class="wp-image-690" /></figure>
<!-- /wp:image --></figure>
<!-- /wp:gallery -->

<!-- wp:image {"id":692,"sizeSlug":"large","linkDestination":"none","className":"is-resized"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/6.jpg?w=897" alt="" class="wp-image-692" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Kopyalama işlemi bitikten sonra Kapalı Networkteki <strong>Guler.local </strong>sunucusunda cmd<strong> “Run as administrator” </strong>olarak açılır ve komut çalıştırılarak import işlemi yapılır. <strong>E:\Wsus\import&gt;WsusuUtil.exe import WsusExport.xml.gz WsusExport.log</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Komut satırında <strong>İmport</strong> işlemi başarılı bir şekilde bittikten sonra Şekildeki gibi <strong>successfully </strong>&nbsp;görmemiz gerekmektedir. (<strong>İmport</strong> işlemi indirilen güncellemenin boyutuna göre birkaç saat sürebilir.)</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":694,"sizeSlug":"large","linkDestination":"none","className":"is-resized"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/7.jpg?w=672" alt="" class="wp-image-694" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Başarılı.. - <span style="font-weight:bold;text-decoration:underline">Import Succesfully.</span><b>..</b></strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>İmport işlemi bittikten sonra Kapalı ağ<strong> guler.local</strong> domainindeki SCCM sunucusu açılır ve şekildeki gibi <strong>Synchronize </strong>işlemi yapılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Son olarak ise güncellemeler kontrol edilmelidir.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":698,"sizeSlug":"large","linkDestination":"none","className":"is-resized"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/8-1.jpg?w=1024" alt="" class="wp-image-698" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
