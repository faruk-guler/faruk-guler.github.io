---
layout: post
title: User SID Number operations with Powershell
date: 2022-02-09 09:16
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":333,"width":"403px","height":"auto","aspectRatio":"1.7781065088757397","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-4-sdn.jpg?w=1024" alt="" class="wp-image-333" style="aspect-ratio:1.7781065088757397;width:403px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>SID </strong>(Security Identifier) kısaltmasıdır, bilgisayar sistemlerinde, kullanıcılara ve güvenlik gruplarına özel olarak atanmış benzersiz bir kimlik numarasıdır. Her bireyin kendine özgü bir T.C. kimlik numarası gibi, bilgisayara yeni bir işletim sistemi yüklediğinizde veya yeni bir kullanıcı hesabı oluşturduğunuzda, bu işlemle birlikte oluşturulan benzersiz bir kimlik numarasıdır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bir bilgisayarın veya kullanıcının SID numarası, bir ağa dahil olduğunda tanınabilmesini sağlar. Bilgisayarlar ve kullanıcılar, SID numaraları aracılığıyla ağa bağlandıklarında kimlik doğrulama işlemleri gerçekleştirilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bir bilgisayarın, etki alanına bağlanması veya etki alanından ayrılması durumunda, SID numarası değişmez. Ancak, bir veya daha fazla bilgisayarı aynı yapılandırmayla oluşturmak istiyorsanız, sysprep adı verilen bir araç kullanarak işletim sistemi görüntülerini hazırlamanız gerekir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>PS:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">1- <strong>Kullanıcı Adı ile SID Bulmak - Finding SID by Username :</strong>
Get-ADUser -Identity ‘ahmet.karacan’ | select SID

2- <strong>SID ile Kullanıcı Adı Bulmak</strong> <strong>- Finding Username by SID:</strong>
Get-ADUser -id sidnumarasi | select SamAccountName

3- <strong>Grup Adı ile SID Bulmak - Finding SID by Group Name:</strong>
Get-ADGroup -Identity ‘grupadi’ | select SID

4- <strong>SID ile Grup Adı Bulmak</strong> <strong>- Finding Group Name by SID:</strong>
Get-AdGroup -id sidnumarasi | select name</pre>
<!-- /wp:preformatted -->
