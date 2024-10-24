---
layout: post
title: Exchange Remote Management with Powershell
date: 2022-09-07 11:25
author: theguler
comments: true
categories: [Microsoft Exchange Server]
---
<!-- wp:image {"id":2148,"width":"402px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-as-admin.webp?w=1024" alt="" class="wp-image-2148" style="width:402px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Define credentials and connection details</strong><br>$adminUsername = "faruk"  # Replace with your admin username<br>$adminPassword = "123passwd+"   # Replace with your admin password<br>$exchangeUri = "http://exc1.guler/Powershell/"  # Exchange PowerShell endpoint<br><br><strong>#Create a PSCredential object</strong><br>$UserCredential = New-Object System.Management.Automation.PSCredential($adminUsername, (ConvertTo-SecureString $adminPassword -AsPlainText -Force))<br><br><strong>#Establish a remote PowerShell session to Exchange</strong><br>$Session = New-PSSession -ConfigurationName Microsoft.Exchange -ConnectionUri $exchangeUri -Authentication Kerberos -Credential $UserCredential<br><br><strong>#Import the session into the current PowerShell session</strong><br>Import-PSSession $Session -DisableNameChecking -AllowClobber<br><br><strong>#Define mailbox details</strong><br>$password = ConvertTo-SecureString "passwd$$" -AsPlainText -Force  # Replace with the desired password<br>$userPrincipalName = "test_user12@guler.com"  # the user's email address<br>$alias = "test_user12"  # Replace with the desired alias<br>$database = "Mailbox_DB1"  # Replace with the mailbox database name<br>$displayName = "Test 12"  # Replace with the display name<br>$ou = "OU=Test_BN,DC=guler,DC=com"  # Replace with the organizational unit path<br>$firstName = "Ahmet"  # Replace with the user's first name<br>$lastName = "Mehmet"  # Replace with the user's last name<br><br><strong>#Create a new mailbox</strong><br>New-Mailbox -UserPrincipalName $userPrincipalName -Alias $alias -Database $database -Name $displayName -OrganizationalUnit $ou -Password $password -FirstName $firstName -LastName $lastName<br><br><strong>##Any other operations</strong><br># create<br># delete<br># other exc ops.<br><br><strong>#Remove the remote session</strong><br>Remove-PSSession $Session</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
