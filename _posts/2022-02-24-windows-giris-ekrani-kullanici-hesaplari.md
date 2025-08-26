---
layout: post
title: Windows Giriş Ekranından Hesaplar Nasıl Gizlenir
date: 2022-02-24 16:48
author: theguler
comments: true
categories: [Windows Group Policy GPO]
---
<!-- wp:image {"id":1155,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/gpo_logo.jpg?w=439" alt="" class="wp-image-1155" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Windows Oturum Açma Ekranında en son oturum açan hesap adı görüntülendiğinde kolaylık sağlayacaktır, Ancak bu yöntem bir saldırganın bilgisayarınıza erişmesini kolaylaştırır. Cihazınıza erişmek için yalnızca doğru şifreyi bulması yeterlidir. Bunu yapmak için, çeşitli sosyal mühendislik, brute force saldırısı düzenleyebilir. buna bir nebzede olsun çözüm getirmek için bu policy in kullanımı önemlidir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Aşağıdaki GPO aracılığıyla bir Windows oturum açma ekranında en son oturum açan kullanıcı adını gizleyebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>GPO: </strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Computer Configuration -&gt; Windows Settings -&gt; Security Settings -&gt; Local Policies -&gt; Security Options</strong>. altında <strong>Interactive logon:&nbsp;</strong>Don't display last signed-in seçeneğini aktif hale getirin.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>It will be convenient when the last registered account name is displayed on the Windows Login Screen, However, this method makes it easier for an attacker to gain access to your computer. It only needs to find the correct password to access your device. To do this, various social engineering can mount a brute force attack.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>You can hide the last logged username on a Windows logon screen through the GPO. Open the domain (<code>gpmc.msc</code>) or local Group Policy editor (<a href="https://woshub.com/group-policy-editor-gpedit-msc-for-windows-10-home/">gpedit.msc</a>) [Woshub] and go to the section.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>GPO: </strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Computer Configuration -&gt; Windows Settings -&gt; Security Settings -&gt; Local Policies -&gt; Security Options</strong>. Enable the policy “<strong>Interactive logon:&nbsp;</strong>Don't display last signed-in</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":2047,"width":437,"height":441,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/usr.png?w=579" alt="" class="wp-image-2047" width="437" height="441" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
