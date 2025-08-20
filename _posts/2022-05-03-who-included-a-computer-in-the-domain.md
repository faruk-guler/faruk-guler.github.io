---
layout: post
title: "Who included a computer in the domain"
date: 2022-05-03
author: faruk-guler
comments: true
categories: [PowerShell]
tags: [powershell, active-directory, domain]
---

![PowerShell Logo](https://farukguler.com/assets/post_images/powershell-4-sdn.jpg)

## Giriş

**Yetkili bir kullanıcı ile C:\Windows\Debug klasörü altındaki NetSetup.log dosyasını inceleyerek tespit etmeye çalışınız. Ağınızdaki tüm bilgisayarların C:\ yolunu paylaşıma açmayı unutmayınız.**

**Examine the NetSetup.log file under the C:\Windows\Debug folder with an authorized user. Do not forget to share the C:\ path of all computers in your network.**

## PowerShell ISE

```powershell
$NoInfo = $null
$Offline = $null
$List = $null
#Get-Content getir.txt | foreach {
Get-ADComputer  -Filter * | foreach {
    $FQDN = $_.DNSHostName 
    $Path = "\\$FQDN\c`$\Windows\debug\NetSetup.log"
    if (Test-Connection $FQDN -Count 1 -ErrorAction SilentlyContinue) { 
        if (Test-Path $Path) {
            write-host "`n`nChecking $FQDN..."        
            $User = ($($(Select-String -Path $Path -Pattern "lpAccount: " -CaseSensitive)  -split " ")[3])
            $User
            [array]$List += Write-Output $FQDN";"$User
        } 
    else {[array]$NoInfo += $FQDN}
    } 
    else {[array]$Offline += $FQDN}
}
$list
```

## Uzak Makinelerden WinRM ile Erişim

Uzak makinelerden Winrm ile talep edebilirsiniz.

```powershell
# WinRM ile alternatif yöntem
Invoke-Command -ComputerName $ComputerName -ScriptBlock {
    if (Test-Path "C:\Windows\Debug\NetSetup.log") {
        Select-String -Path "C:\Windows\Debug\NetSetup.log" -Pattern "lpAccount: " -CaseSensitive | Select-Object -Last 1
    }
}
```

## Notlar

- Bu script, domain'e katılan bilgisayarlarda hangi kullanıcı hesabının kullanıldığını tespit eder
- NetSetup.log dosyası domain join/unjoin işlemlerini kaydeder
- Yönetici yetkisi gereklidir
- Network paylaşımları aktif olmalıdır
