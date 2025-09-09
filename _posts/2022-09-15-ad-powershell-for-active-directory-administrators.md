---
layout: post
title: AD-Powershell for Active Directory Administrators
date: 2022-09-15 15:16
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:image {"id":4474,"width":384,"height":384,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/slim_powershell.jpg?w=600" alt="" class="wp-image-4474" width="384" height="384" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>PowerShell Run as Administrator:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Computer object commands</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>List all computer accounts in a domain</strong>

Get-ADComputer –Filter {Name –Like "*"}

<strong>View all computers that are logged in for 90 days to the Active Directory</strong>

Search-ADaccount -AccountInactive -Timespan 90 -ComputersOnly

<strong>OR</strong>

$lastLogon = (get-date).adddays(-90).ToFileTime()

Get-ADComputer -filter {lastLogonTimestamp -gt $lastLogon}

<strong>Find and delete all disabled Computer accounts in Active Directory</strong>

Search-ADAccount -AccountDisabled -ComputersOnly | Sort-Object | Remove-ADComputer

<strong>Find and delete disabled computer accounts from a specific OU</strong>

Search-ADAccount -AccountDisabled -Searchbase "OU=IT,DC=Contoso,DC=Com" -ComputersOnly | Sort-Object | Remove-ADComputer

<strong>Find and delete all computer accounts that no longer have signed up since 11/20/2011 to the Active Directory</strong>

Search-ADAccount -AccountInactive -DateTime "20.11.2011" –ComputersOnly | Sort-Object | Remove-ADComputer

<strong>List only disabled Computer accounts in Domain</strong>

Search-ADAccount -AccountDisabled -ComputersOnly | Format-Table Name

<strong>Move Computer to other OU (example: Computer=CLIENT1 to OU=IT)</strong>

Get-ADComputer CLIENT1 | Move-ADObject -TargetPath "OU=IT,DC=Contoso,DC=Com"

<strong>See Computer account detail (example: Computer=CLIENT1)</strong>

Get-ADComputer -Filter {Name -Like "CLIENT1"}

<strong>Get a specific computer showing all the properties (example: Computer=CLIENT1)</strong>

Get-ADComputer "CLIENT1" -Properties *

<strong>List Computers (Name, Operating System, Service Pack, Operating System version)</strong>

Get-ADComputer -Filter * -Property * | Format-Table Name,OperatingSystem,OperatingSystemServicePack,OperatingSystemVersion -Wrap –Auto

<strong>Export Computers List (Name, Operating System, Service Pack, Operating System version)to CSV File</strong>

Get-ADComputer -Filter * -Property * | Select-Object Name,OperatingSystem,OperatingSystemServicePack,OperatingSystemVersion | Export-CSV AllWindows.csv -NoTypeInformation -Encoding UTF8

<strong>Get Computer IPv4 Address and DnsHostName</strong>

Get-ADComputer -Filter {Name -Like "Computer-Name"} -Properties IPv4Address | Format-List Name,DnsHostName,IPv4Address

<strong>Get all Computers in a specific OU (example: OU=IT, Domain=Contoso.com)</strong>

Get-ADComputer -SearchBase "OU=IT,DC=Contoso,DC=Com" -filter *

<strong>Get all the Computers without a specific DNS suffix</strong>

Get-ADComputer -filter "DnsHostName -notlike '*.Contoso.Com'"

<strong>Get Computer Service Principal Names (SPNs)</strong>

Get-ADComputer "Computer-Name" –Properties ServicePrincipalNames | Select-Object –Expand ServicePrincipalNames

<strong>Get Computers Security Identifiers (SIDs)</strong>

Get-ADComputer -Filter {Name -like "*"} | Select Name,SID | Format-Table -Auto

<strong>All computer accounts that were created in the last 90 days in the Active Directory</strong>

Get-ADComputer -Filter * -Properties whenCreated | ? { ((Get-Date) - $_.whenCreated).Days -lt 90} | Format-Table Name,WhenCreated,Name,DistinguishedName -Autosize -Wrap

<strong>All computer accounts that were created as of December 1, 2011 (12/01/2011) in the Active Directory</strong>

Get-ADComputer -LDAPFilter "(&amp;(objectCategory=person)(whenCreated&gt;=20111201000000.0Z))" -Properties whenCreated | Format-Table Name,whenCreated,distinguishedName -Autosize -Wrap

<strong>All computer accounts that were created here in a given time, between the 10/01/2011 and 12/01/2011 in Active Directory</strong>

$Start = Get-Date -Day 01 -Month 10 -Year 2011 -Hour 00

$End = Get-Date -Day 01 -Month 12 -Year 2011 -Hour 23 -Minute 59

Get-ADComputer -Filter * -Properties whenCreated | ? { ($_.whenCreated -gt $Start) -and ($_.whenCreated -le $End) } | Format-Table Name,WhenCreated,DistinguishedName -Autosize -Wrap

<strong>All computer accounts, Last Password Set in a given time, between the 10/01/2011 and 12/01/2011 in Active Directory</strong>

$Start = Get-Date -Day 01 -Month 10 -Year 2011 -Hour 00

$End = Get-Date -Day 01 -Month 12 -Year 2011 -Hour 23 -Minute 59

Get-ADComputer -Filter * -Properties PasswordLastSet | ? { ($_.PasswordLastSet -gt $Start) -and ($_.PasswordLastSet -le $End) } | Format-Table Name,WhenCreated,DistinguishedName -Autosize -Wrap

<strong>All computer accounts, Last Password Set in the last 90 days in Active Directory</strong>

$Date = (Get-Date).AddDays(-90)

Get-ADComputer -Filter * -Properties PasswordLastSet | where { $_.PasswordLastSet -le $Date } | Format-Table Name,PasswordLastSet,DistinguishedName -Autosize -Wrap</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Group object commands</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>List all members of a group (example: Group=Experts)</strong>

Get-ADGroupMember Experts | Format-Table Name

<strong>All properties of a group (example: Group=IT)</strong>

Get-ADGroup IT -Properties *

<strong>List only Universal Security groups</strong>

Get-ADGroup –LDAPFilter "(&amp;(objectCategory=group)(groupType:1.2.840.113556.1.4.803:=-2147483640))"

<strong>List only Global Security groups</strong>

Get-ADGroup –LDAPFilter "(&amp;(objectCategory=group)(groupType:1.2.840.113556.1.4.803:=-2147483646))"

<strong>List only Domain Local Security groups</strong>

Get-ADGroup –LDAPFilter "(&amp;(objectCategory=group)(groupType:1.2.840.113556.1.4.803:=-2147483644))"

<strong>List all Group memberships for a user (example: User=EdPrice)</strong>

Get-ADAccountAuthorizationGroup EdPrice

Move a Group to another OU (example: Group=Experts, Old-OU=IT, New-OU=Service, Domain=Contoso.com)
Move-ADObject "CN=Experts,OU=IT,DC=Contoso,DC=com" -TargetPath "OU=Service,DC=Contoso,DC=com"

<strong>Add members to a group (example: Group=Experts, User=EdPrice)</strong>

Add-ADGroupmember Experts -Member EdPrice

<strong>Delete Group (example: Group=Experts)</strong>

Remove-ADGroup Experts

<strong>Delete a User from a Group (example: Group=Experts, User=EdPrice)</strong>

Remove-ADGroupMember Experts -Member EdPrice

<strong>Set Description for a Group (example: Group=JoinPC, Description=This group is allowed join PCs to Domain)</strong>

Set-ADGroup JoinPC -Description "This group is allowed join PCs to Domain"

<strong>Add Users from one Group to another Group (example: from Group1=DataUsers to Group2=SQLUsers)</strong>

Get-ADGroupMember DataUsers | Select sAMAccountName | ForEach { Add-ADGroupMember SQLUsers -Members $_.sAMAccountName }

<strong>Comparing two Groups to see the Group memberships (example: Group1=Administratorso, Group2=DNSAdmins)</strong>

Compare-Object ( Get-ADGroupMember Administrators) ( Get-ADGroupMember DNSAdmins) -IncludeEqual</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Organizational Unit (OU) commands</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>All OUs in Domain</strong>

Get-ADOrganizationalUnit -Filter {Name -like „*“} | FT Name, DistinguishedName -A

<strong>Create OU (example: OU=IT, Domain=Contoso.com)</strong>

New-ADOrganizationalUnit -Name IT -Path "DC=Contoso,DC=Com"

<strong>Contents of a specific OU (example: OU=IT, Domain=Contoso.com)</strong>

Get-ADObject -Filter {Name -Like "*"} -Searchbase "OU=IT,DC=Contoso,DC=Com"

<strong>Rename OU (example: Old-Name=IT, New-Name=Admin, Domain=Contoso.com)</strong>

Rename-ADObject "OU=IT,DC=Contoso,DC=Com" -NewName Admin

<strong>Delete OU including contents (example: OU=IT, Domain=Contoso.com)</strong>

Remove-ADOrganizationalUnit IT -Recursive

<strong>Delete user from specific OU (example: User=EdPrice, OU=IT, Domain=Contoso.com)</strong>

Remove-ADObject "CN=EdPrice,OU=IT,DC=Contoso,DC=Com"

<strong>Move all objects from one OU to another OU (example: Old-OU=IT, New-OU=Manager, Domain=Contoso.com)</strong>

Get-ADObject -Filter {Name -Like "*"} -Searchbase "OU=IT,DC=Contoso,DC=Com" -SearchScope OneLevel | Move-ADObject -TargetPath "OU=Manager,DC=Contoso,DC=Com"</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>User object commands</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>List all User accounts in the Domain</strong>

Get-ADUser –Filter *

<strong>List all User accounts in a specific OU (example: OU=IT, Domain=Contoso.com)</strong>

Get-ADUser –Filter * -Searchbase "OU=IT,DC=Contoso,DC=Com" | FT

<strong>List all User accounts from specific City (example: City=NewYork)</strong>

Get ADUser -Filter {city - like "NewYork"} | FT

<strong>List only disabled User accounts in Domain
</strong>
Search-ADAccount –AccountDisabled –Usersonly | FT Name

<strong>List all User accounts whose First Name is Ed</strong>

Get-ADUser –Filter {givenName –Like "Ed"} | FT

<strong>List all User accounts whose Last Name is Price</strong>

Get-ADUser –Filter {Surname –Like "Price"} | FT

<strong>List all User accounts from the specific Department (example: Department=Support)</strong>

Get-ADUser –Filter {Department –Like "Support"} | FT

<strong>List a User's Group memberships (example: User=Richard)</strong>

Get-ADPrincipalGroupMembership -Identity Richard

<strong>List all Users from specific Group and move Users to another OU (example: Group=People, Target OU=NewYork, Domain=Contoso.com)</strong>

Get-ADGroupMember People -Recursive | Move-ADObject  –TargetPath "OU=NewYork,DC=Contoso,DC=Com"

<strong>Remove all users in an OU from a specific Group (example: Group=People, OU=NewYork, Domain=Contoso.com)</strong>

$Users = Get-ADUser -Filter * -Searchbase "OU=NewYork,DC=Contoso,DC=Com"

Remove-ADGroupMember -Identity People -Member $Users -Confirm:0</pre>
<!-- /wp:preformatted -->
