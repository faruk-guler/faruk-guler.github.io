---
layout: post
title: Winscp permission denied, error code 3 error
date: 2022-02-03 20:51
author: theguler
comments: true
categories: [Linux / Unix]
---
<!-- wp:image {"id":1306,"width":"514px","height":"auto","aspectRatio":"2.0229508196721313","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/scp.png?w=464" alt="" class="wp-image-1306" style="aspect-ratio:2.0229508196721313;width:514px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Winscp sayesinde Linux makinelerde Kullanıcı adımız ve şifremizle  Varsayılan olarak yalnızca uzak ana dizine (/home/guler) aktarabilir/düzenleyebilir ve alanda bunlarla çalışabiliriz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Ama iş tüm dizinleri görmek ve üzerinde işlem yapmaya gelince <strong>Root </strong>olmadığınız için yukarıdaki hatayı alacaksınız. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Şimdi nasıl bunu nasıl aşacağımızı görelim. Linux makinelerde root kullanıcısı default'ta pasif durumda gelmektedir. <strong>Root </strong>kullanıcısına şifre tanımlayıp aktif ederek tüm dizinlerde söz sahibi olmamız gerekiyor. yukarıdaki hatada tam olarak bundan kaynaklanmaktadır. Root kullanıcısını aktif ederek gerekli yetkileri verelim.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>For Ubuntu Servers</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre id="block-212c4770-1090-40f9-a3aa-882bb19bd474" class="wp-block-preformatted">Bir server kiraladığınızda veya kurduğunuzda size bir bir kullanıcı oluşturur sonrasında ssh üzerinden işlem yapmak için root kullanıcını aktif etmeniz gerekir. <br><br>Aktif etmek için aşağıdaki adımları izleyebilirsiniz.<br>-----------------------------------------------------<br><br><strong>sudo passwd root</strong><br>#İlk önce root şifremizi sıfırlayalım ve 2 kere yeni şifremizi girelim.<br><br><strong>su root</strong><br>#İşlem yaptıktan sonra root kullanıcısına geçelim.<br><br><strong>sudo sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config</strong><br>#Root için SSH girişini aktif edelim.<br><br><strong>service sshd restart</strong><br>#SSH servisini resetleyelim</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p id="yararli-olmasi-dilegiyle-best-regards"><strong>Yararlı olması dileğiyle. – Best regards.</strong></p>
<!-- /wp:paragraph -->
