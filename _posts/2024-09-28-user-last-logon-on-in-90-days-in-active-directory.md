---
layout: post
title: User last logon on in 90 days in Active Directory
date: 2024-09-28 22:19
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:image {"id":890,"width":"454px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ads.jpeg?w=625" alt="" class="wp-image-890" style="width:454px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Hello, As a system administrator, it is important to track the last logon timestamps of Active Directory (AD) user accounts, ensure network security, and review old and inactive users. In this article, I will explain the differences between attributes such as <strong>LastLogon</strong>, <strong>LastLogonTimeStamp</strong>, and what <strong>LastLogonDate</strong> is, and how to obtain this information.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>✅ LastLogon:</strong> <strong>***This value is used to determine the exact logon time</strong>. However, it is not replicated across other domain controllers, which requires checking for each DC. Because users may have logged in to different DCs. This attribute is updated instantly with each logon.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>🚫 LastLogonTimeStamp: </strong>This value is an attribute in Active Directory that allows tracking user logon information more centrally. This value is not updated immediately for each logon. (<strong>Default is updated with a delay of 9-14 days</strong>) However, it is replicated among other domain controllers and becomes a common source of information among all DCs. <strong>*** However, it cannot be used to determine the exact logon time!</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>📜 LastLogonDate:</strong> LastLogonDate is not an attribute! It is the conversion of LastLogonTimeStamp from raw format to a readable date format using PowerShell. You cannot access this data directly from the Active Directory management interface, but you can read the data using PowerShell.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sample Raw Format: 133720509101693344 etc.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>📌 The following scripts are only used for user accounts. If you want to use them on computer accounts, you need to change Get-ADUser to Get-ADComputer.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">🎯<strong>LastLogonDate Check:</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#All Users:</strong><br>Get-ADUser -Filter * -Properties lastLogon | Select name, surname, samaccountname, @{Name="lastLogon";Expression={[datetime]::FromFileTime($_.'lastLogon')}}<br><br><strong>#Spesfic OU:</strong><br>Get-ADUser -Filter {Enabled -eq $true} -SearchBase "OU=uyeler,DC=guler,DC=com" -Properties LastLogon | Select-Object -Property SamAccountName, Name, Surname, @{n="LastLogonDate"; e={[datetime]::FromFileTime($_.LastLogon)}}<br><br><strong>#Spesific User:</strong><br>Get-ADUser -Identity "hakan" -Properties “LastLogon” | Select Name, @{N=’LastLogon:’; E={[DateTime]::FromFileTime($_.LastLogon)}}<br><br><strong>#90 days LastLogondate:</strong><br>$When = ((Get-Date).AddDays(-10)).ToFileTime()<br>Get-ADUser -Filter * -SearchBase "OU=personel,DC=guler,DC=com" -Properties samaccountname, givenName, surname, lastLogon | <br>Where-Object { $_.lastLogon -lt $When -and $_.lastLogon -ne $null } |<br>Select-Object name, surname, samaccountname, @{Name="lastLogon"; Expression={[datetime]::FromFileTime($_.'lastLogon')}}<br><br><strong>#90 days LastLogondate Disabled:</strong><br>$When = ((Get-Date).AddDays(-90)).ToFileTime()<br>Get-ADUser -Filter * -SearchBase "OU=personel,DC=guler,DC=com" -Properties samaccountname, givenName, surname, lastLogon |<br>Where-Object { $_.lastLogon -lt $When -and $_.lastLogon -ne $null } |<br>ForEach-Object { Disable-ADAccount -Identity $_.samaccountname }<br><br><strong>---NOTE:</strong><br><strong>#Users who have never logged in [12/31/1600 4:00:00 PM]<br>SamAccountName Name  Surname LastLogonDate        <br>-------------- ----  ------- -------------</strong><br>yasin          yasin gencer  12/31/1600 4:00:00 PM<br>mert           mert          12/31/1600 4:00:00 PM<br>esin           esin  yildiz  12/31/1600 4:00:00 PM</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>🔀Multi DC's Spesific User LastLogonDate Check:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">foreach ($dc in Get-ADDomainController -Filter *)<br>   { $user = Get-ADUser <strong>"hakan"</strong> -Server $dc.HostName -Properties LastLogon<br>    [PSCustomObject]@{<br>        Domain    = $dc.HostName<br>        Name      = $user.Name<br>        LastLogon = if ($user.LastLogon) { <br>            [DateTime]::FromFileTime($user.LastLogon) } else { [DateTime]::FromFileTime(0) }}}</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>🔍LastLogonTimeStamp Check:</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>***NOTE:</strong> Cannot be used to determine exact login time!</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Spesfic OU:</strong><br>Get-ADUser -Filter {Enabled -eq $true} -SearchBase "OU=uyeler,DC=guler,DC=com" -ResultPageSize 0 -Properties lastLogonTimestamp | Select-Object samaccountname, name, surname, @{n="lastLogonTimestamp";e={[datetime]::FromFileTime($_.lastLogonTimestamp)}}<br><br><strong>#Spesific User:</strong><br>Get-ADUser -Identity "hakan" -Properties LastLogondate | Select-Object -Property Name, LastLogonDate<br><br><strong>#90 days LastLogonTimeStamp:</strong><br>Get-ADUser -Filter {enabled -eq $true} -SearchBase "OU=uyeler,DC=guler,DC=com" -SearchScope Subtree -Properties SamAccountName, Name, Surname, lastLogonTimeStamp | <br>Select-Object SamAccountName, Name, Surname, @{Name="lastLogonTimeStamp"; Expression={[datetime]::FromFileTime($_.lastLogonTimeStamp)}}<br><br><strong>#90 days <strong>LastLogonTimeStamp</strong> Disabled:</strong><br>$When = (Get-Date).AddDays(-90).ToFileTime()<br>Get-ADUser -Filter * -SearchBase "OU=personel,DC=guler,DC=com" -Properties SamAccountName, LastLogonTimestamp | <br>Where-Object { $_.LastLogonTimestamp -lt $When -or $_.LastLogonTimestamp -eq $null } |<br>ForEach-Object { Disable-ADAccount -Identity $_.DistinguishedName }</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>📌📌📌 <em>Users who have never logged in will not be found in searches, you can change this if you want.</em></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Find active users under specific OUs:</strong> <strong>-Filter {Enabled -eq $true}</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Get-ADUser <strong>-Filter {Enabled -eq $true}</strong> -SearchBase "OU=personel,DC=guler,DC=com" -Properties SamAccountName | Select-Object SamAccountName, Name, Surname</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>📝Data Exporting:</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>| Export-Csv -Path "C:\Users_report.csv" -NoTypeInformation</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong><strong>Stop stealing labor! because time and sweat are inestimable. #TheGuler</strong></strong></p>
<!-- /wp:paragraph -->
