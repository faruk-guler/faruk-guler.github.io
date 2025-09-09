---
layout: post
title: Bulk Change AD User Login Name with powershell
description:
date: 2024-10-09 10:57
By: theguler
comments: true
categories: [Hybride]
tags:
pin:
math:
mermaid:
image:
  path: https://farukguler.com/assets/post_images/powershell-4-sdn.jpg
  width: 500
  height: 200
  lqip:
  alt:
---


<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong># Active Directory Module Install</strong><br>#Import-Module ActiveDirectory<br><br><strong># CSV file:</strong><br>$kullanicilar = Import-Csv -Path "C:\news.csv"<br><br><strong># Domain name:</strong><br>$domain = "guler.com"<br><br><strong># Logon Name Update:</strong><br>foreach ($kullanici in $kullanicilar) {<br>    $oldUsername = $kullanici.old_username<br>    $newLogonName = $kullanici.new_username<br><br>    if ($oldUsername -and $newLogonName) {<br>        try {<br>           <strong> # User find and update:</strong><br>            $user = Get-ADUser -Identity $oldUsername -ErrorAction Stop<br>            $newUserPrincipalName = "$newLogonName@$domain"<br>            Set-ADUser -Identity $user -UserPrincipalName $newUserPrincipalName -SamAccountName $newLogonName -ErrorAction Stop<br>            Write-Host "$oldUsername için $newUserPrincipalName olarak güncellendi."<br>        } catch {<br>            Write-Host "$oldUsername için hata oluştu: $_"<br>        }<br>    } else {<br>        Write-Host "Hata: Boş veya geçersiz kullanıcı adı tespit edildi. old: '$oldUsername', new: '$newLogonName'"<br>    }<br>}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>When you change a user's samAccountName in Active Directory, the user's SID (Security Identifier) ​​and GUID (Globally Unique Identifier) ​​do not change.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>At the end of this process the following Attributes will be changed:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>msDS-Principalname </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>sAMAccountName</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>userPrincipalName</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>mailNickname(*If there is an Exchange)</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->
