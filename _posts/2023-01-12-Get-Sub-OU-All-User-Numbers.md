---
layout: post
title: Get Sub OU All User Numbers
date: 2023-01-12 22:28
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":15422,"width":"521px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-4-sdn.jpg?w=625" alt="" class="wp-image-15422" style="width:521px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"># Import-Module ActiveDirectory<br># Target OU.<br>$ou = "OU=Personel,DC=ankara,DC=edu,DC=tr"<br><br># OU check.<br>try {<br>    $ouExists = Get-ADOrganizationalUnit -Identity $ou -ErrorAction Stop<br>    Write-Host "OU bulundu: $ou"<br>} catch {<br>    Write-Host "HATA: Belirtilen OU bulunamadı. Lütfen OU yapısını kontrol edin."<br>    exit<br>}<br><br># Get all OU users<br>try {<br>    $users = Get-ADUser -Filter * -SearchBase $ou<br>    if ($users.Count -eq 0) {<br>        Write-Host "HATA: Bu OU altında hiç kullanıcı bulunamadı."<br>        exit<br>    }<br>} catch {<br>    Write-Host "HATA: Kullanıcıları çekerken bir sorun oluştu."<br>    exit<br>}<br><br># User size.<br>$totalUsers = $users.Count<br><br># Enabled (Etkin) ve Disabled (Devre Dışı) kullanıcı sayılarını hesapla<br>$enabledUsers = ($users | Where-Object { $_.Enabled -eq $true }).Count<br>$disabledUsers = ($users | Where-Object { $_.Enabled -eq $false }).Count<br><br># Print data.<br>Write-Host "Toplam Kullanıcı Sayısı: $totalUsers"<br>Write-Host "Enabled (Etkin) Kullanıcı Sayısı: $enabledUsers"<br>Write-Host "Disabled (Devre Dışı) Kullanıcı Sayısı: $disabledUsers"</pre>
<!-- /wp:preformatted -->
