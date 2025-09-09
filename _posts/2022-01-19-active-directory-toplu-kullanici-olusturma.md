---
layout: post
title: AD Toplu Kullanıcı Oluşturma-AD Bulk
date: 2022-01-19 16:44
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":1087,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/add-1.webp?w=719" alt="" class="wp-image-1087" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Active Directory'e yeni kullanıcı eklemek, IT personeli için basit bir işlem olabilir, ancak büyük bir kullanıcı sayısı veya farklı bir etki alanından kullanıcıların taşınması durumunda bu işlem oldukça zahmetli hale gelecektir. Bu nedenle, toplu kullanıcı oluşturmak veya taşımak için PowerShell betikleri hazırlamak, IT ekibinin işini kolaylaştırır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu amaçla, virgülle ayrılmış bir Excel dosyası (uyeler.csv) hazırlanabilir ve bu dosyadaki kullanıcıları AD ortamına yüklemek için PowerShell betiği yazılabilir. Dosyadaki bilgileri sütunlara dönüştürmek ve pars etmek için Excel'in "Metni Sütunlara Dönüştür" özelliği kullanılabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>PowerShell betiği, CSV dosyasındaki tüm bilgileri alarak kullanıcıları AD ortamına yükleyebilir. Örneğin, isim, soyisim, kullanıcı adı, şifre, e-posta, telefon numarası vb. gibi tüm bilgileri içerebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Aşağıdaki örnekte, <strong>"Muhasebe_uyeleri.csv" </strong>dosyasından kullanıcıları AD ortamına yüklemek için bir PowerShell betiği yazılmıştır;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>PS:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Import-Csv -Path 'C:\eklenecek\Muhasebe_uyeleri.csv' |<br><br> foreach {<br><br>   $NewUserParams = @{<br>     Displayname           = $_.displayname    # ad+soyad görünen Displayname<br>     Name                  = $_.name       # ad+soyad - name + surname<br>     department            = $_.department # görevi<br>     division              = $_.division   # birimi, unit of job<br>     givenname             = $_.givenname  # ad<br>     surname               = $_.surname    # soyad<br>     employeeID            = $_.employeeID  # personID<br>     SamAccountName        = $_.SAM        # kimlik-identity<br>     UserPrincipalName     = $_.SAM+"@guler.com" # user logon name<br>     path                  = 'OU=test,DC=guler,DC=com' #eklenecegi OU<br>     AccountPassword       =  ConvertTo-SecureString 'Pass9*x+' -AsPlainText -Force #<br>     Enabled               = $true     # hesap açılışta aktif mi? evet-hayır<br>     ChangePasswordAtLogon = $true     # Next logon? true-false<br>     PasswordNeverExpires  = $false    # şifre asla sona ermesin? true-false<br>     Server                = 'guler.com'<br>    }<br><br>   New-ADUser @NewUserParams<br> }</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":1103,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/sss-1.png?w=1024" alt="" class="wp-image-1103" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Virgülle ayrılmış uyeler.CSV dosyası örneği.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
