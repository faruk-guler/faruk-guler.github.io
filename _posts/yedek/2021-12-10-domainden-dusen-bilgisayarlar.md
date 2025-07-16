---
layout: post
title: Solutions for computers Losing from the domain
date: 2021-12-10 12:22
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:image {"id":4434,"width":280,"height":280,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images//connection-broked.webp?w=1024" alt="" class="wp-image-4434" style="width:280px;height:280px" width="280" height="280" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading" id="bilgisayarlar-domainden-neden-duser-why-do-computers-falling-from-domain"><strong>Bilgisayarlar Domainden Neden Düşer ? - Why do Computers Losing from Domain?</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Active Directory yapısında bazı sıkıntılardan dolayı istemci makineler domainden düşebilirler.&nbsp; Bu durum istemci makinler ile domain kontroller arasında<strong> Secure Channel </strong>olarak bilinen güvenli iletişimin kaybedilmesi sonucunda gerçekleşir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>1)-</strong> <strong>Saat ve tarih ayarları yanlış yapılandırılmış</strong>&nbsp;- İstemci&nbsp;<strong>tarafındaki yanlış yapılandırılmış</strong>&nbsp;saat ve tarih ayarları sorunlara neden olacak ve hatayı görüntüleyecektir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>2)-</strong> <strong>Sysprep yapılmadan imaj alınıp domainde dağıtılmış </strong>- aynı ağ üzerinde farklı SID’e sahip olmaları gerektiğinden ağda çakışmalara neden olacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>3)-</strong> <strong>İstemci ve etki alanı denetleyicisi arasındaki bağlantı zaman aşımına uğramış olabilir</strong>&nbsp;- Bu durumda bağlantıyı yeniden başlatmanız ve yeniden başlatmanız gerekir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>4)-</strong> <strong>DNS ve Windows Güvenlik Duvarı sorunları</strong>&nbsp;- DNS adresleri veya Windows Güvenlik Duvarı ilkeleri soruna neden olabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading" id="error-examples-and-pictures-soruna-ait-bazi-gorseller">Error examples and pictures - Soruna ait Bazı görseller</h2>
<!-- /wp:heading -->

<!-- wp:gallery {"linkTo":"none"} -->
<figure class="wp-block-gallery has-nested-images columns-default is-cropped"><!-- wp:image {"id":460,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/116183-error-dc.png?w=550" alt="" class="wp-image-460" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":461,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/trust-.png?w=1024" alt="" class="wp-image-461" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":462,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/23.jpg?w=1024" alt="" class="wp-image-462" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":509,"sizeSlug":"full","linkDestination":"none","className":"is-style-default"} -->
<figure class="wp-block-image size-full is-style-default"><img src="https://farukguler.com/assets/post_images/ddd-1.jpg" alt="" class="wp-image-509" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":459,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/tr-1.jpeg?w=479" alt="" class="wp-image-459" /></figure>
<!-- /wp:image --></figure>
<!-- /wp:gallery -->

<!-- wp:heading -->
<h2 class="wp-block-heading" id="cozumler-solveds">Çözümler - Solveds</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>1)- <span style="text-decoration:underline">Bilgisayar hesabını sıfırlayın - Reset computer account</span>.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>İlgili OU altındaki , etki alanına bağlanamayan <strong>bilgisayar hesabını</strong> bulun sağ tıklayın ve&nbsp;<strong>"Hesabı Sıfırla"</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Locate the <strong>computer account</strong> that cannot be connected to the domain under the relevant OU, right-click it and click <strong>"Reset Account"</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":4448,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images//fixed.png?w=454" alt="" class="wp-image-4448" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong><span style="text-decoration:underline">2)- Domainle Güveni yeniden kurun - Restore Trust</span></strong> <strong>to Domain</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":467,"width":557,"height":262,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/fixed-trustd-3.png?w=1024" alt="" class="wp-image-467" style="width:557px;height:262px" width="557" height="262" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>PS Administrator:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>$Credential = Get-Credential</strong>
#komutu sonrası gelen ekranda Etki alanı yöneticisinin kullanıcı adı ve şifresini girin

<strong>Reset-ComputerMachinePassword -Credential $credential</strong>
#sonra bilgisayar hesabınızı resetleyin. 

<strong>Restart-Computer</strong>
#sonra bilgisayarınızı yeniden başlatın. </pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>3) <span style="text-decoration:underline">Bilgisayarın etki alanıyla bağlantısını kesin ve yeniden bağlayın - Disconnect the Computer from the Domain and Reconnect it</span></strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":476,"width":607,"height":398,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/fixf.png?w=1024" alt="" class="wp-image-476" style="width:607px;height:398px" width="607" height="398" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Bu bilgisayar</strong>&nbsp;&gt; <strong>Özellikler</strong> &gt; Sonra <strong>Gelişmiş Sistem Ayarları</strong> kısmına gidelim <strong>Bilgisayar Adı / Etki Alanı Değişiklikleri</strong>&nbsp;kısmından workgroup' a alıp sonra ise yeniden domaine alalım. son olarak ise bilgisayarınızı yeniden başlatın. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Let's go to <strong>This computer</strong>&gt; <strong>Properties</strong> &gt; Then go to <strong>Advanced System Settings</strong>, take it to the workgroup from the <strong>Computer Name / Domain</strong> <strong>Changes </strong>section and then take it to the domain again. Finally, restart your computer.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>4)</strong> Yada yerel bilgisayar ile domain arasındaki bağlantıyı test etmek ve onarmak  için <strong>Powershell'i</strong> kullanalım;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>(bu sayede client'i domainden çıkarıp ve tekrar almaya gerek kalmayacaktır)</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>PS:
Test-ComputerSecureChannel -Verbose</strong>
#Bu komut, yerel bilgisayar ile bağlı olduğu etki alanı arasındaki güvenli kanalı (güven ilişkisini) test eder.

<strong>Test-ComputerSecureChannel -Repair -Credential (Get-Credential)</strong>
#Bu komut, yerel bilgisayar ile etki alanı arasındaki güvenli kanalı test eder ve bir sorun bulunursa, güven ilişkisini onarmaya çalışır.

<strong>Get-ADComputer -Identity MUHASEBE-25 -Properties PasswordLastSet</strong>
#Bu komut, Aktif Dizin'den bir bilgisayar nesnesi hakkında bilgi alır.

<strong>Reset-ComputerMachinePassword</strong>
#Bu komut, bilgisayarın etki alanındaki hesap şifresini sıfırlar. bilgisayarın etki alanıyla yeni bir güvenli kanal kurmasını sağlar ve güncellenmiş şifreyi kullanır.

#Uzak bilgisayarında bir komut çalıştırıp parola sıfırlamak için:
<strong>$cred = Get-Credential
Invoke-Command -ComputerName "MUHASEBE-25" -ScriptBlock {Reset-ComputerMachinePassword -Credential $using:cred}</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Thank you - Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
