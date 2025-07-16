---
layout: post
title: Useful Powershell commands
date: 2022-08-12 19:08
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":333,"width":424,"height":238,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-4-sdn.jpg?w=1024" alt="" class="wp-image-333" width="424" height="238" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>PS:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Enable / Command that allows us to get some attributes of active users</strong>:
Get-ADUser -f * -pr * -searchbase “dc=guler,dc=com” | where {$_.enabled -eq “Enabled”} | select name, sAMAccountName, employeeID, department, distinguishedname | export-csv c:\liste.csv -delimiter “;” -NoTypeInformation -Encoding UTF8

<strong>#To retrieve deleted users</strong>:
Get-ADObject -IncludeDeletedObjects -Filter {objectClass -eq “user” -and IsDeleted -eq $True} -Properties displayname, whencreated,whenchanged | select -Property displayname, whencreated,whenchanged | Export-csv -path C:\delete_user.csv -NoTypeInformation -Encoding Unicode

<strong>#To attract members from a group:</strong>
Get-ADGroupMember -identity “grup adı” | select samaccountname,name | Export-csv -path C:\grupuser.csv -NoTypeInformation

<strong>#Get a List of Users with Password Never Expires</strong>
Get-ADuser -filter * -properties Name, PasswordNeverExpires | where { $_.passwordNeverExpires -eq "true" } |  Select-Object DistinguishedName,Name,Enabled | Export-csv c:\pw_never_expires.csv -NoTypeInformation


<strong>#To retrieve the last login dates of users in a specific OU:</strong>
Get-ADUser -f * -pr * -searchbase “ou=test,dc=guler,dc=com” | where {$_.enabled -eq “Enabled”} | select name, lastlogindate | export-csv C:\user_lastlogon.csv -Encoding Unicode

<strong>#To pull computer objects in a particular OU:</strong>
Get-ADComputer -Filter * -SearchBase “OU=test, DC=guler, DC=com” -Properties OperatingSystem | Select Name, OperatingSystem | Format-Table -AutoSize | Out-File C:\comp.txt

<strong>#To get the computer number only:</strong>
Get-ADComputer -SearchBase “OU=TestOU,DC=guler,DC=com”` -Filter ‘OperatingSystem -like “*”‘ -Properties * | Select -Property Name,operatingSystem,@{Name=”LastLogon”; Expression={[DateTime]::FromFileTime($_.lastLogon).ToString()}} | # Export AD Computers to CSV file Export-CSV “C:\ADComputers.csv” -NoTypeInformation -Encoding UTF8

<strong>#sending a message to the screen of a device on the network:</strong>
$name = read-host "Enter computer name "
$msg = read-host "Enter your message "
Invoke-WmiMethod -Path Win32_Process -Name Create -ArgumentList "msg * $msg" -ComputerName $name</pre>
<!-- /wp:preformatted -->
