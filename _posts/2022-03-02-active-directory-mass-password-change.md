---
layout: post
title: Active Directory kullanıcılara toplu olarak şifre verilmesi
date: 2022-03-02 14:31
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":333,"width":"469px","height":"auto","sizeSlug":"large","linkDestination":"none","className":"is-resized"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-4-sdn.jpg?w=1024" alt="" class="wp-image-333" style="width:469px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>PS:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">###############################################################################
###############################################################################
<strong>#Method 1</strong>
Import-Module ActiveDirectory
#Kullanıcı bigilerini ve passwordleri içeri al ve oku
$Resetpassword = Import-Csv "C:\parolasifirla.csv"

foreach ($Account in $Resetpassword) {
    $Account.sAMAccountName
    $Account.Password
        Set-ADAccountPassword -Identity $Account.sAMAccountName -NewPassword (ConvertTo-SecureString $Account.Password -AsPlainText -force) -Reset
}

###########################################################################
###########################################################################
<strong>#Method 2</strong>

Import-Module ActiveDirectory
#Yeni şifreyi belirleyin
$newPassword = ConvertTo-SecureString -AsPlainText <strong>“Password45++” </strong>-Force 
#Kullanıcı bigilerini içeri al ve oku
Import-Csv "C:\parolasifirla.csv" | ForEach-Object {
 $samAccountName = $_."samAccountName" 

#Kullanıcı şifresini sıfırlayın.
Set-ADAccountPassword -Identity $samAccountName -NewPassword $newPassword -Reset

# "Sifreyi Oturum Açmada Degistir" seçenegini devre <strong>disi birak/aktif et</strong>
Set-AdUser -Identity $samAccountName -ChangePasswordAtLogon $true
Write-Host " AD Password has been reset for: "$samAccountName
}

###########################################################################
###########################################################################
<strong>#Method 3</strong>

# Active Directory modülünü içe aktar
Import-Module ActiveDirectory

# Yeni sifreyi ayarla
$newPassword = ConvertTo-SecureString -AsPlainText <strong>"Passwd599+" </strong>-Force

# CSV dosyasindan kullanicilari içe aktar
$csvPath = "C:\Kayitlar\user_page.csv"
$users = Import-Csv $csvPath

# CSV içindeki her kullanici için ayarlari güncelle
foreach ($user in $users) {
    $samAccountName = $user."samAccountName"
    
    # Kullaniciyi Active Directory'de bul
    $userObj = Get-ADUser -Filter {SamAccountName -eq $samAccountName}

    if ($userObj) {
        # Kullanici için yeni sifreyi ayarla
        Set-ADAccountPassword -Identity $userObj -NewPassword $newPassword -Reset

        # "Sifreyi Oturum Açmada Degistir" seçenegini devre <strong>disi birak/aktif et</strong>
        Set-ADUser -Identity $userObj -ChangePasswordAtLogon $false
        Write-Host "$samAccountName için sifre ve 'Sifreyi Oturum Açmada Degistir' güncellendi."
    } else {
        Write-Host "Active Directory'de $samAccountName kullanicisi bulunamadi."
    }
}

###########################################################################
###########################################################################</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":2208,"sizeSlug":"large","linkDestination":"none","className":"is-resized"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/sifirlama.png?w=1024" alt="" class="wp-image-2208" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>virgülle ayrılmış - comma separated .csv file</strong> <strong>örneği</strong></p>
<!-- /wp:paragraph -->
