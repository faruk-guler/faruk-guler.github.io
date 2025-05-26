---
layout: post
title: Finding and Cleaning Unused Computers in Active Directory
date: 2021-12-21 16:49
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":333,"width":375,"height":211,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-4-sdn.jpg?w=1024" alt="" class="wp-image-333" width="375" height="211" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>PS:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Import-Module activedirectory

# Parametreler girelim.

$domain = “guler.com”

$DaysInactive = 180

$time = (Get-Date).Adddays(-($DaysInactive))

$date = Get-Date ($time) -UFormat %d.%m.%y

$File = “c:\Inactive_Computers.csv”

# Son 180 günde oturum açılmamış bilgisayarları $file yolundaki dosyaya listeler

$CompList = Get-ADComputer -Filter {LastLogonTimeStamp -lt $time -and operatingSystem -notlike “*server*”} -SearchBase “DC=guler, DC=com” -Properties Name,LastLogonTimeStamp,OperatingSystem |

Select-Object Name, OperatingSystem, @{Name=”Last Logon TimeStamp”; Expression={[DateTime]::FromFileTime($_.lastLogonTimestamp)}} | Export-Csv $File -encoding UTF8 -notypeinformation

# Son 180 günde oturum açılmamış bilgisayarların isimlerini toplar

$Computers = Get-ADComputer -Filter {LastLogonTimeStamp -lt $time -and operatingSystem -notlike “*server*”} -SearchBase “DC=guler, DC=com” -Properties Name,LastLogonTimeStamp,OperatingSystem |

Select-Object -ExpandProperty Name

# Toplanan bilgisayarları domainden siler. Silinenleri ve silinmeyenleri loglar

ForEach ($Computer in $Computers)

{   Try {

        Remove-ADComputer -Identity $Computer -ErrorAction Stop -confirm:$false

        Add-Content C:\removed-computers.log -Value “$Computer silindi”

    }

    Catch {

        Add-Content C:\not-removed-computers.log -Value “$Computer bulunamadi $($Error[0])”

    }

}
</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Faydalı olması dileğiyle. – Hope it’s useful.</p>
<!-- /wp:paragraph -->
