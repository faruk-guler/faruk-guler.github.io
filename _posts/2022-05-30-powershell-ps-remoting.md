---
layout: post
title: PowerShell PS Remoting Nedir?
date: 2022-05-30 08:10
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":333,"width":414,"height":233,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-4-sdn.jpg?w=1024" alt="" class="wp-image-333" width="414" height="233" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>PowerShell PS Remoting, </strong>bir PowerShell oturumu başlatmak ve bir uzak bilgisayarda PowerShell komutlarını çalıştırmak için kullanılan bir özelliktir. Bu özellik sayesinde PowerShell komutları, uzak bir bilgisayar üzerinde de çalıştırılabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>PS Remoting, PowerShell'in WinRM <strong>(Windows Remote Management) </strong>teknolojisini kullanarak çalışır. WinRM, uzak bir bilgisayar üzerinde birleşik bir yönetim denetleyicisi sağlar ve WinRM istemcisi, bir uzak bilgisayarla iletişim kurmak için WinRM sunucusunu kullanır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>PS Remoting ile uzak bir bilgisayarda PowerShell oturumu başlatmak için, öncelikle uzak bilgisayarın PS Remoting özelliği etkinleştirilmelidir. Bu işlem, uzak bilgisayarda çalıştırılacak birkaç PowerShell komutu ile gerçekleştirilebilir. Ardından, bir PowerShell oturumu başlatmak için Invoke-Command cmdlet'i kullanılabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>PS Remoting, birçok yönetim senaryosunda oldukça faydalıdır. Örneğin, uzak bir bilgisayarda bulunan belirli bir uygulama hakkında bilgi almak, bir uzak sunucuda bir PowerShell betiği çalıştırmak, bir uzak bilgisayarda bulunan servislerin durumunu denetlemek gibi birçok görev, PS Remoting kullanılarak kolayca gerçekleştirilebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Nasıl Kullanılır?</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
```bash
# WinRm servisi ve PowerShell Remoting sorgusu:
Get-PSSessionConfiguration

# PowerShell Remoting özelliğini manual olarak açmak için:
Enable-PSRemoting -Force

# PowerShell Remoting özelliğini kapatmak için:
Disable-PSRemoting -Force

# "Enter-PSSession" komutunu kullanarak uzak bilgisayara bağlanıp komut vermek için:
Enter-PSSession -ComputerName 192.168.1.100 -Credential guler.com\Admin04
Enter-PSSession -ComputerName COMPUTER-696YS5KF -Credential guler.com\Admin04

# Doğrudan komut vermek için:
Invoke-Command -ComputerName 192.168.1.100 -Credential guler.com\Admin04 -ScriptBlock { ipconfig }

# Bağlantıyı Kapatmak için:
Exit-PSSession
```
<!-- wp:paragraph -->
<h2 class="wp-block-heading"><strong>#Uzak makinelerde Komut yada GPO ile aktif edebilirsiniz.</strong></h2>
<!-- /wp:paragraph -->
