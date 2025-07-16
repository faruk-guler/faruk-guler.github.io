---
layout: post
title: AD Mass Department+Division+Description And More Changer
date: 2023-10-18 10:48
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":2148,"width":"471px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-as-admin.webp?w=1024" alt="" class="wp-image-2148" style="width:471px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#fromOU</strong>

# OU'nun DistinguishedName'ini belirleyin
$ouDistinguishedName = "OU=test,DC=guler,DC=com"

# Yeni değerleri belirtin
$newDepartment = "YeniDepartman"
$newDivision = "YeniBölüm"
$newDescription = "YeniAçıklama"

# Belirtilen OU altındaki kullanıcıların tüm alanlarını güncelleyin
Get-ADUser -Filter * -SearchBase $ouDistinguishedName | ForEach-Object {
    Set-ADUser -Identity $_ -Replace @{
        Department = $newDepartment
        Division = $newDivision
        Description = $newDescription
    }
}</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#from CSV FILE</strong>

# CSV dosyasının yolunu belirtin:
$csvFilePath = "C:\files\degistir.csv"

# Yeni değerler:
$newDepartment = "YeniDepartman"
$newDescription = "YeniAçıklama"

# CSV dosyasını içe aktar:
$userData = Import-Csv -Path $csvFilePath

# Her bir kullanıcı için güncelle:
foreach ($user in $userData) {
    $sAMAccountName = $user.sAMAccountName

    # Kullanıcıyı sAMAccountName'e göre bulun:
    $userToUpdate = Get-ADUser -Filter {sAMAccountName -eq $sAMAccountName}

    if ($userToUpdate) {
        # Kullanıcının özelliklerini güncelleyin
        Set-ADUser -Identity $userToUpdate -Replace @{
            Department = $newDepartment
            Description = $newDescription
        }
        Write-Host "Kullanıcı $sAMAccountName güncellendi."
    } else {
        Write-Host "Kullanıcı $sAMAccountName bulunamadı."
    }
}</pre>
<!-- /wp:preformatted -->
