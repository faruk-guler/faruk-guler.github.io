---
layout: post
title: Exchange Shell Mass Mailbox Activated
date: 2021-12-01 22:31
author: theguler
comments: true
categories: [Microsoft Exchange Server]
---
<!-- wp:image {"id":284,"sizeSlug":"large","linkDestination":"none","className":"is-resized"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/exchange-2016-1.png?w=400" alt="" class="wp-image-284" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Active Directory </strong>de belli bir OU altındaki kullanıcıların bilgisini alıp <strong>Exchange Server </strong>üzerinde mail kutularını aktif edip dil ve bölge seçimi yapmak için kullanabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong># Exchange Management Shell!</strong>
############################

<strong># OU ve Database</strong>
Get-User -OrganizationalUnit "guler.com/uyeler" | Enable-Mailbox -Database "personel_db"

<strong># Dil</strong>
Get-Mailbox -OrganizationalUnit "guler.com/uyeler" -ResultSize Unlimited | Set-Mailbox -Language "tr-TR"

<strong># TimeZone</strong>
Get-Mailbox -OrganizationalUnit "guler.com/uyeler" | Set-MailboxRegionalConfiguration -TimeZone "Turkey Standard Time"</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong># PowerShell ISE<br>#################</strong><br><br><strong># Active Directory ve Exchange modüllerini içe aktar</strong><br>Import-Module ActiveDirectory<br>Import-Module Exchange<br><br><strong># Gerekirse aşağıdaki satırları kullanabilirsiniz.</strong><br># Install-windowsFeature -Name "RSAT-AD-powershell"<br> Add-PSSnapin microsoft.exchange.management.powershell.snapin<br><br><br><strong># Belirli bir Organizasyonel Birimdeki (OU) tüm kullanıcıları al</strong><br>$users = Get-ADUser -LDAPfilter '(name=*)' -searchBase "OU=test,DC=guler,DC=com"<br><br><strong># Her bir kullanıcı için işlemi gerçekleştir</strong><br>foreach ($user in $users) {<br><br>    try {<br><br>        <strong># Kullanıcı posta kutusu etkinleştir - veritabanını sec</strong><br>        Enable-Mailbox -Identity $user.SamAccountName -Database "Mailbox_Ogrenci"<br><br>        <strong># Kullanıcının Dil - Bölgesel yapılandırmasını ayarla</strong><br>        Set-MailboxRegionalConfiguration -Identity $user.SamAccountName -TimeZone "Turkey Standard Time" -Language "tr-TR"<br><br>      <strong>  # Başarı durumu çıktısını yaz</strong><br>        Write-Output "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - $($user.Name) için posta kutusu etkinleştirildi ve bölgesel yapılandırma başarıyla ayarlandı."<br><br>    } catch {<br><br>        <strong># Hata durumu çıktısını yaz</strong><br>        Write-Error "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - Hata! $($user.Name) için posta kutusu etkinleştirilirken bir sorun oluştu: $_"<br><br>        <strong># Hata durumunda işle</strong><br>    }<br><br>}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>kolay gelsin..</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
