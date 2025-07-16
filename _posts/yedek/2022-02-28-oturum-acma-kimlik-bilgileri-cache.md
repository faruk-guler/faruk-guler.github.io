---
layout: post
title: Etki Alanı Kimlik Bilgilerinin Cache Alınması
date: 2022-02-28 22:11
author: theguler
comments: true
categories: [Windows Group Policy GPO]
---
<!-- wp:image {"id":1155,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/gpo_logo.jpg?w=439" alt="" class="wp-image-1155" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Bir etki alanı kullanıcısı Windows'ta oturum açtığında, kimlik bilgileri varsayılan olarak yerel bilgisayara kaydedilir (Önbelleğe Alınmış Kimlik Bilgileri: <strong>kullanıcı adı ve parola</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu, AD etki alanı denetleyicileri kullanılamıyor, kapalı veya ağ kablosu bilgisayardan çıkarılmış olsa bile kullanıcının bilgisayarda oturum açmasını sağlar.&nbsp;Etki alanı hesabı kimlik bilgilerinin önbelleğe alınması, Ağ mevcut olmadığında bir cihazdaki yerel verilerine erişebilen dizüstü bilgisayar kullanıcıları için çok uygundur.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bir kullanıcı bu bilgisayarda en az bir kez kimlik doğrulaması yaptıysa ve o zamandan beri parolasını değiştirilmediyse, önbelleğe alınmış kimlik bilgileri Windows'ta oturum açmak için kullanılabilir.&nbsp;Nakit olarak verilen kimlik bilgilerindeki kullanıcı parolasının süresi asla&nbsp;dolmaz&nbsp;.&nbsp;Etki&nbsp;alanı parola ilkesi&nbsp;bir kullanıcıyı parolayı değiştirmeye zorlarsa, yerel önbelleğe kaydedilen parola, <strong>kullanıcı yeni bir parolayla oturum açana kadar değişmez.</strong>&nbsp;Bilgisayarda son oturum açıldıktan sonra&nbsp;AD' deki kullanıcı şifresi değiştirilmişse&nbsp;ve bilgisayar çevrimdışıysa. kablo veya ağ sorunları (<strong>özetle etki alanı ağına erişim yoksa</strong>), kullanıcı eski şifre ile bilgisayara girip oturum açabilecektir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Varsayılan olarak, Windows 10 ve Windows Server, başka profille oturum açmadığınız sürece en&nbsp;son oturum açan&nbsp;<strong>Default olarak (10) kullanıcının kimlik bilgilerini depolar.&nbsp;</strong>Bu değeri aşağıdaki GPO seçeneğiyle değiştirebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>GPO:&nbsp;</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Computer Configuration &gt; Policies &gt; Windows Settings &gt; Security Settings &gt; Local Policies &gt; Security Options </strong>altından <strong>Interactive logon: Number of previous logons to cache&nbsp;</strong>ayarıyla Cache üzerinden açılabilecek oturum sayısını ayarlayabilirsiniz. </p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":2175,"width":908,"height":295,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/l1.png?w=1024" alt="" class="wp-image-2175" width="908" height="295" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Uygulanan policy' i client REGEDIT <strong>CashedLogonsCount</strong>&nbsp; üzerinden kontrol edebilirsiniz. </p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre id="block-212c4770-1090-40f9-a3aa-882bb19bd474" class="wp-block-preformatted"><code><strong>HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon</strong></code></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":2187,"width":700,"height":336,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/l2.png?w=931" alt="" class="wp-image-2187" width="700" height="336" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Eğer bu eşik değerini (<strong>0</strong>)&nbsp;olarak ayarlarsanız, bu Windows'un kullanıcı kimlik bilgilerini önbelleğe almasını engeller.&nbsp;Bu durumda etki alanı kullanılamadığında bir kullanıcı oturum açmaya çalışırsa şu hatayı görür ve oturum açamaz.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre id="block-212c4770-1090-40f9-a3aa-882bb19bd474" class="wp-block-preformatted"><strong>There are currently no logon servers available to service the logon request.</strong>

<strong>Oturum açma isteğine hizmet edecek geçerli sunucu yok.</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":2185,"width":575,"height":373,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/l3-1.png?w=684" alt="" class="wp-image-2185" width="575" height="373" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Cache Alınmış Windows Kimlik Bilgilerinin Güvenlik Riskleri - Security Risks of Cacheed Windows Credentials</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Kimlik bilgilerini önbelleğe almanın bazı güvenlik riskleri vardır.&nbsp;Önbelleğe alınmış verilerle bir bilgisayara/dizüstü bilgisayara fiziksel erişim sağladıktan sonra, bir saldırgan bir kaba kuvvet saldırısı yada farklı bir metot kullanarak parolanızı şifresini çözebilir.&nbsp;(özellikle burada oturum açılan <strong>Domain Admin,Enterprise Admin</strong> gibi önemli kullanıcılarsa <span style="text-decoration:underline">tehlikelidir</span>) bu nedenle etki alanı yönetici hesabına sahip kullanıcılar için önbelleğe almanın kullanılması <strong>kesinlikle</strong> önerilmez.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
