---
layout: post
title: 90 Gün login olmayan Bilgisayarlarının Disable Edilmesi veya silinmesi
date: 2022-06-14 16:15
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":333,"width":485,"height":272,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-4-sdn.jpg?w=1024" alt="" class="wp-image-333" width="485" height="272" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>PS ISE:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Userların Tespiti ve Disable Edilmesi veya silinmesi:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Import-Module ActiveDirectory 
 
$domain = "guler.com"

//Date Degiskeni
$day= 90 
$time= (get-date).AddDays(-($day))

$users= Get-ADUser -Filter -SearchBase "OU=personals,DC=guler,DC=com" {LastlogonTimeStamp -lt $time} -Properties LastLogonTimeStamp | Select-Object Name,@{Name="Stamp"; Expression={[DateTime]::FromFileTime($_.lastLogonTimestamp)}}

//Tespit edilen kullanicilar içinden service accountlari siliniz! - Delete the service accounts among the detected users!
$users | Export-Csv c:\Users.csv

//Tespit edilen kullanıcıların Disable edilmesi
//Import-Csv C:\Users.csv |ForEach-Object{Set-ADUser -Identity $_.Name -Enabled $false}

// <strong>** Dikkat: Silinmesi - Important: Deletion</strong>

//test ps command</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Bilgisayarların Tespiti ve Disable Edilmesi veya silinmesi:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Import-Module ActiveDirectory
 
$domain = "guler.com"

//Date Degiskeni
$day= 90
$time= (get-date).AddDays(-($day))

//tespiti bu kısımda SearchBase ile OU belirtebilirsiniz.
$computer= Get-ADComputer -Filter {LastlogonTimeStamp -lt $time} -Properties LastLogonTimeStamp | Select-Object Name,@{Name="Stamp"; Expression={[DateTime]::FromFileTime($_.lastLogonTimestamp)}}
 
//Tespit edilen bilgisayarların Disable edilmesi
foreach($com in $computer){
Set-ADComputer -Identity $com.Name -Enabled $false}

<strong>//<strong> ** Dikkat: Silinmesi - Important: Deletion</strong>

</strong>//test ps command</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
