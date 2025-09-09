---
layout: post
title: Active Directory Özel Attribute Oluşturma
date: 2022-02-12 20:30
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:image {"id":1737,"width":654,"height":287,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ae.png?w=1024" alt="" class="wp-image-1737" width="654" height="287" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Önemli:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Bu uygulamayı yapmadan önce mutlaka bir test yapısında deneyiniz.***</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Uygulamaya başlamadan önce DC lerinizin yedeğini mutlaka alın.***</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Oluşturulan attribute leri silmek zordur. Haberiniz olsun. Yanlış oluşturulursa sıkıntı yaşayabilirsiniz.***</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Important:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Before making this application, you should definitely try it in a test structure.***</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Before starting the application, make sure to back up your DCs.***</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>It is difficult to delete created attributes. Let me know. If it is created incorrectly, you may experience problems.***</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Object Identifier Nedir? - What is Object Identifier? (OID)</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Object Identifier (OID), genellikle uluslararası bir standartta tanımlanmış ve benzersiz bir şekilde belirtilmiş bir nesneyi temsil etmek için kullanılan bir dize numarasıdır. Bir OID, bir hiyerarşideki herhangi bir düzeydeki bir nesneyi tanımlayabilir. Örneğin, bir OID, bir ülkeyi, bir şirketi, bir bölümü, bir makineyi, bir protokolü veya bir özellik setini tanımlayabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>OID'ler, genellikle İnternet üzerindeki protokollerde veya diğer standartlarda kullanılır. Örneğin, bir SSL sertifikası için benzersiz bir OID, sertifikanın sahibinin kimliğini doğrulamak için kullanılabilir. Ayrıca, bir DNS adı çözümleme işlemi sırasında, bir alan adının benzersiz bir şekilde tanımlanması için kullanılabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>OID'ler, tipik olarak birkaç sayıdan oluşan bir dize olarak ifade edilir. Sayılar, her bir hiyerarşik düzeydeki nesneleri temsil eder. Örneğin, bir OID, 1.2.840.10045.4.3.2 şeklinde olabilir. Burada, ilk iki sayı, ISO (Uluslararası Standartlar Örgütü) tarafından tanımlanmıştır. 840, Amerika Birleşik Devletleri'nin bir alt bileşenini temsil eder. Sonraki sayılar, belirli bir nesneyi tanımlar. Bu örnekte, 10045, bir kriptografik algoritmayı, 4.3.2 ise ilgili özellikleri temsil eder.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>OID'ler, nesnelerin benzersiz tanımlanması için kullanıldığından, genellikle standartlarda tanımlanan bir numaralandırma sistemine dayanırlar. Bu sayede, farklı uygulamalar arasında nesnelerin benzersiz bir şekilde tanımlanması mümkün olur.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sıra geldi <strong>O</strong>id'imizi öğrenmeye bu Oid bize lazım olacak altta linkini vermiş olduğumuz .vbs script dosyasını C:\dizinine atalım ve çalıştıralım. attaki gibi bir ekran çıkacak ve succeded uyarsı verecektir,aynı zamanda oid' çıktısını ise C:\ dizini altına .TXT dosyası şeklinde oluşturacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Download:</strong> <a href="https://github.com/theguler0x/activedirectory_dosyalari/blob/main/My_AD_OID.rar">https://github.com/theguler0x/activedirectory_dosyalari/blob/main/My_AD_OID.rar</a></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1746,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/0ae.png?w=1024" alt="" class="wp-image-1746" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>devamında ise <strong>Çalıştır</strong>: <strong>MMC </strong>yazıp açarak schema master konsolunu ekliyoruz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1747,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/ae1.png?w=1024" alt="" class="wp-image-1747" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>File</strong> &gt; <strong>Add/Remove Snap-in</strong> &gt; <strong>Active Directory Schema</strong> &gt; <strong>Add</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1749,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/ae2.png?w=1024" alt="" class="wp-image-1749" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>artık bu alana Classes ve Attributes kısmı gelmiş bulunuyor.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1751,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/ae3.png?w=1024" alt="" class="wp-image-1751" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Attributes</strong> &gt;Sağ click &gt; <strong>New </strong>&gt; <strong>Attributes</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1753,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/ae4.png?w=1024" alt="" class="wp-image-1753" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":1756,"width":658,"height":295,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ae6.png?w=1012" alt="" class="wp-image-1756" width="658" height="295" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>burada bizi bir uyarı karşılıyor bu uyarılar yukardaki  ***<strong>Important</strong> <strong>- Önemli </strong>kısmında belirttiğim uyarılardır. onaylıyoruz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>National Identification Number</strong> adında yeni bir attribute oluşturmak istiyorum.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bunu şirkette çalışan yabancı ülke vatandaşlarını da kapsayacak Ülke Kimliği (TC kimlik No) diye düşünebiliriz. kullanıcıların tüm ülke kimlik numaralarını bu attribute üzerinde tutacağım.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Common name ve LDAP display name kısmına yukarıdaki gibi dolduruyorum. Unique ID ise başta çalıştırmış olduğumuz .vbs çıktısı ile C:\ MY_oidinfo.txt içinden alıyoruz ve unique x500 objext id: kısmına yapıştırıyoruz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1757,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/ae5.png?w=1024" alt="" class="wp-image-1757" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Son olarak da syntax ı belirtiyoruz. <strong>Burası önemli bir alandır</strong>. Nasıl değer gireceğimizi burada belirliyoruz. </p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Kimlik numarası gibi uzun bir sayı için <strong>Case Insensitive String</strong> kullanılabilir.
True/False şeklinde bir bilgi içerecekse <strong>Boolean</strong> seçilir. 
Bir multi-valued attribute eklenecekse Multi-Valued seçilir.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Menu de farklı ihtiyaçlar için bir çok syntax yer almaktadır. Altta görüldüğü gibi Attributes altında ilgili <strong>Attribute</strong> oluşturuldu.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1760,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/ae7.png?w=1024" alt="" class="wp-image-1760" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Simdi ise oluşturduğumuz Attribute' i Kullanıcılara ya da farklı nesnelere atamasını yapacağız, bunu <strong>class'lar </strong>ile yapıyoruz. Ben userlara atayacağım.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1762,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/ae8.png?w=1024" alt="" class="wp-image-1762" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Şimdi ise <strong>Classes </strong>kısmı içinde <strong>User</strong> &gt; <strong>Properties</strong> &gt; <strong>Attributes</strong> &gt; <strong>Add </strong>&gt; <strong>oluşturduğumuz atribute</strong> &gt; son olarak ise <strong>OK</strong> tıklıyoruz...</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Herşey tamam</strong>. User Class içine başarı ile eklendi.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1764,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/ae9.png?w=1024" alt="" class="wp-image-1764" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":1766,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/ae10.png?w=1024" alt="" class="wp-image-1766" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Eğer yedekli yapıda <strong>(2) </strong>veya daha fazla DC kullanıyorsanız her DC üzerinde oluşturduğumuz Attribute'nin görünmesi zaman alabilir, bunu beklememek için <strong>AD Schema</strong> &gt; <strong>Reload the Schema</strong> üzerinden manuel tetikliyorum.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1768,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/ae11.png?w=1024" alt="" class="wp-image-1768" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Görüldüğü üzere <strong>userler </strong>için oluşturduğumuz <span style="text-decoration:underline">Attribute</span> <strong>Kullanıcı özellikleri</strong> &gt; <strong>Attribute Editor</strong> ksımında görüntüleyip içeriğini düzenleyebileceğimiz şekilde oluştu.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>See you in my next post. - Bir dahaki yazımda görüşmek üzere sağlıcakla</strong>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p> </p>
<!-- /wp:paragraph -->
