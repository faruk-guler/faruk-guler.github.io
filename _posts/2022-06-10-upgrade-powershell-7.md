---
layout: post
title: Windows 10 PowerShell 7 En Son Sürüme yükseltilmesi
date: 2022-06-10 17:30
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":2148,"width":415,"height":233,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-as-admin.webp?w=1024" alt="" class="wp-image-2148" width="415" height="233" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading">PowerShell 7'deki Yenilikler</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>PowerShell 5</strong>&nbsp;, Windows 10'da varsayılan olarak yüklenen sürüm çok güçlü bir araçtır ve çoğu kullanıcı için fazlasıyla yeterlidir. Ancak, özellikle bu tür komut dosyalarıyla çalışan ileri düzey kullanıcılar ve geliştiriciler için her zaman iyileştirme için yer vardır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu nedenle, PowerShell'in yeni sürümlerinde şu ana kadar bu araçta bulunmayan işlevleri ve özellikleri bulabiliriz, örneğin:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Parallel pipeline</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Yeni operatörler</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Yeni cmdlet (ConciseView ve Get-Error)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Yeni sürüm bildirimleri</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Kapalı oturumlarda modülleri çağırmak için uyumluluk katmanları</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Kaynakları doğrudan konsol penceresinden çağırabilme</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Update PowerShell to the latest version - PowerShell'i en son sürüme güncelleyin</strong>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>PS:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#powershell version check - #powershell sürüm kontrolü</strong>
$PSversionTable

<strong>#latest Powershell download and install (msi) - Sonsürüm Powershell indir ve yükle</strong>
iex "&amp; { $(irm https://aka.ms/install-powershell.ps1) } -UseMSI"

<strong>#rety powershell version check - tekrar powershell versiyon kontrolü</strong>
$PSversionTable</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading">MSI paketi aracılığıyla PowerShell 7 Yüklemek için:</h2>
<!-- /wp:heading -->

<a href="https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows">https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows</a>


<!-- wp:image {"id":3389,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/pwsh1.webp?w=495" alt="" class="wp-image-3389" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":3390,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/pwsh2.webp?w=495" alt="" class="wp-image-3390" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":3391,"width":597,"height":282,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/pwsh7.jpg?w=605" alt="" class="wp-image-3391" width="597" height="282" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
