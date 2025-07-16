---
layout: post
title: Whoami Commands for Windows
date: 2023-07-31 11:41
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":333,"width":391,"height":205,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-4-sdn.jpg?w=1024" alt="" class="wp-image-333" style="width:391px;height:205px" width="391" height="205" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>WHOAMI:</strong> Bu temel komut, mevcut kullanıcı hakkında bilgi sağlar. Kullanıcının adını ve güvenlik kimliğini (Security ID - SID) gösterir.

<strong>WHOAMI /UPN:</strong> Kullanıcının Üst Düzey Alan Adı (User Principal Name) bilgisini gösterir. UPN, kullanıcının etki alanı hesabını tanımlayan kullanıcı adıdır.

<strong>WHOAMI /FQDN:</strong> Kullanıcının Tam Yetkili Alan Adı (Fully Qualified Domain Name) bilgisini gösterir. Bu, kullanıcının ait olduğu etki alanını ve bilgisayar adını içerir.

<strong>WHOAMI /LOGONID:</strong> Kullanıcının oturum açma kimliğini (Logon ID) gösterir. Oturum açma kimliği, oturum açtığınızda size atanan benzersiz bir kimlik numarasıdır.

<strong>WHOAMI /USER:</strong> Kullanıcının adını ve güvenlik kimliğini (SID) gösterir. Kullanıcının etki alanı hesabını temsil eder.

<strong>WHOAMI /USER /FO LIST:</strong> Kullanıcı bilgilerini liste biçiminde gösterir. Bu, daha kolay okunabilir bir çıktı sağlar.

<strong>WHOAMI /USER /FO CSV:</strong> Kullanıcı bilgilerini CSV (Virgülle Ayrılmış Değerler) biçiminde gösterir. Bu, başka bir program veya betikle kullanmak için uygun bir veri formatıdır.

<strong>WHOAMI /GROUPS:</strong> Kullanıcının üye olduğu grupları gösterir. Kullanıcı, birden fazla grup üyeliğine sahip olabilir.

<strong>WHOAMI /GROUPS /FO CSV /NH:</strong> Kullanıcının üye olduğu grupları CSV formatında gösterir, başlık satırı olmadan (No Header).

<strong>WHOAMI /CLAIMS:</strong> Kullanıcının taleplerini (claims) gösterir. Talepler, kimlik doğrulama ve yetkilendirme süreçlerinde kullanıcı hakkındaki ek bilgileri içerir.

<strong>WHOAMI /CLAIMS /FO LIST:</strong> Kullanıcının taleplerini liste biçiminde gösterir. Bu, taleplerin ayrıntılı bir görünümünü sağlar.

<strong>WHOAMI /PRIV:</strong> Kullanıcının sahip olduğu ayrıcalıkları (privileges) gösterir. Ayrıcalıklar, işletim sisteminde özel yetkilere sahip olmayı ifade eder.

<strong>WHOAMI /PRIV /FO TABLE:</strong> Kullanıcının sahip olduğu ayrıcalıkları tablo biçiminde gösterir.

<strong>WHOAMI /USER /GROUPS:</strong> Kullanıcının üye olduğu gruplarıyla birlikte kullanıcı bilgilerini gösterir. Kullanıcının grup üyeliği ve temel bilgileri bir arada sunar.

<strong>WHOAMI /USER /GROUPS /CLAIMS /PRIV:</strong> Kullanıcının üye olduğu gruplar, talepler ve ayrıcalıklar dahil olmak üzere tüm detaylı bilgileri gösterir. En kapsamlı bilgi çıktısını verir.

<strong>WHOAMI /ALL:</strong> Kullanıcının tüm bilgilerini gösterir. Kullanıcı, gruplar, talepler ve ayrıcalıklar dahil olmak üzere tüm bilgileri içerir.

<strong>WHOAMI /ALL /FO LIST:</strong> Tüm bilgileri liste biçiminde gösterir. Kapsamlı bir çıktı sağlar.

<strong>WHOAMI /ALL /FO CSV /NH:</strong> Tüm bilgileri CSV formatında gösterir, başlık satırı olmadan (No Header).

<strong>WHOAMI /?:</strong> Komutun yardım metnini gösterir, parametreleri açıklar. Bu parametre, kullanım hakkında daha fazla bilgi almanıza yardımcı olur.</pre>
<!-- /wp:preformatted -->
