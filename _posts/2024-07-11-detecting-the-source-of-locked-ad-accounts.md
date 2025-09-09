---
layout: post
title: Detecting the source of locked AD accounts
date: 2024-07-11 21:47
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:image {"id":890,"width":"413px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ads.jpeg?w=1024" alt="" class="wp-image-890" style="width:413px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Informational summary</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Incorrect password attempts exceeding the account lockout threshold in a domain results in the user account being locked out, with event ID<strong> 4740</strong> recorded in the Security log of domain controllers. If audit logging is enabled on client computers, event ID <strong>4625 </strong>is also recorded. The event log provides valuable information like user account name, domain controller name, source computer name, timestamp, etc. For large AD environments, querying domain controllers first to find the source computer's details is more practical than querying all client computers.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Expand the Security Log size</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Increasing the Security log size on a domain controller is recommended for large AD environments. The default size is 128 MB, leading to automatic overwriting of old events when full. To identify account lockout sources, adjust the log size through modifying the default domain controller policy.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":13217,"width":"547px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/icrs.png?w=822" alt="" class="wp-image-13217" style="width:547px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Audit logging enabled.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Enable audit logging on domain controllers by modifying the default domain controller policy as follows:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Log on to any domain controller and launch the Group Policy ManageConsole <em>gpmc.msc</em></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Navigate to&nbsp;<em>Computer Configuration</em>&nbsp;&gt;&nbsp;<em>Policies</em>&nbsp;&gt;&nbsp;<em>Windows Settings</em>&nbsp;&gt;&nbsp;<em>Security Settings</em>&nbsp;&gt;&nbsp;<em>Advanced Audit Policy Configuration</em>&nbsp;&gt;&nbsp;<em>Audit Policies</em>&nbsp;&gt;&nbsp;<em>Account Management</em>.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Now enable the&nbsp;<em>Audit User Account Management</em>&nbsp;subcategory for&nbsp;<em>Success</em>&nbsp;and&nbsp;<em>Failure,&nbsp;</em>as shown in the screenshot below:</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image {"id":13199,"width":"518px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ad-ena.png?w=820" alt="" class="wp-image-13199" style="width:518px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>If event ID 4740 is missing on domain controllers, Computer Configuration&nbsp;&gt;&nbsp;Policies&nbsp;&gt;&nbsp;Windows Settings&nbsp;&gt;&nbsp;Security Settings&nbsp;&gt;&nbsp;Advanced Audit Policy Configuration&nbsp;&gt;&nbsp;Audit Policies&nbsp;&gt;&nbsp;Account Logon.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":13201,"width":"506px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dc_enas.png?w=825" alt="" class="wp-image-13201" style="width:506px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><em>Event ID <strong>4771</strong> shows source IP of failed Kerberos authentication with pre-authentication failure.</em></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Audit logging enabled.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Modify domain policy for audit logging on clients.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Navigate to&nbsp;Computer Configuration&nbsp;&gt;&nbsp;Policies&nbsp;&gt;&nbsp;Windows Settings&nbsp;&gt;&nbsp;Security Settings&nbsp;&gt;&nbsp;Advanced Audit Policy Configuration&nbsp;&gt;&nbsp;Audit Policies&nbsp;&gt;&nbsp;Logon/Logoff.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Now enable&nbsp;Audit Account Lockout, Audit Logoff, Audit Logon,&nbsp;and&nbsp;Audit Other Logon/Logoff Events, as shown in the following screenshot:</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image {"id":13194,"width":"555px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/enabling-audit-logs-on-client-computers.png?w=792" alt="" class="wp-image-13194" style="width:555px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Detecting lockout</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Auditing is enabled on domain controllers and client computers. Account lockouts are processed on the PDC emulator role holder. Use PowerShell command to determine the PDC role holder in the domain.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>(Get-ADDomain).PDCEmulator</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Get events using PowerShell code snippet:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong># Getting the PDC emulator DC<br>$pdc = (Get-ADDomain).PDCEmulator<br><br># Creating filter criteria for events<br>$filterHash = @{LogName = "Security"; Id = 4740; StartTime = (Get-Date).AddDays(-1)}<br><br># Getting lockout events from the PDC emulator<br>$lockoutEvents = Get-WinEvent -ComputerName $pdc -FilterHashTable $filterHash -ErrorAction SilentlyContinue<br><br># Building output based on advanced properties<br>$lockoutEvents | Select @{Name = "LockedUser"; Expression = {$_.Properties[0].Value}}, `<br>                        @{Name = "SourceComputer"; Expression = {$_.Properties[1].Value}}, `<br>                        @{Name = "DomainController"; Expression = {$_.Properties[4].Value}}, TimeCreated</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":13205,"width":"628px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/find_lock_ad_users.png?w=944" alt="" class="wp-image-13205" style="width:628px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Filter criteria were set to search for event ID 4740 in the Security log within the last 24 hours. Get-WinEvent cmdlet was utilized to extract logs based on the filter hash. Calculated properties were used to generate output with locked-out user name, source computer name, DC name, and timestamp of the event creation. More details on these properties will be provided later.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Query source computer for events with ID 4625 to identify process causing account lockout. Review updated code snippet:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong># Creating filter criteria for events<br>$filterHash = @{LogName = "Security"; Id = 4625; StartTime = (Get-Date).AddDays(-1)}<br><br># Getting lockout events from the source computer<br>$lockoutEvents = Get-WinEvent -ComputerName WRK-NODE0051 -FilterHashTable $filterHash -MaxEvents 1 -ErrorAction 0<br><br># Building output based on advanced properties<br>$lockoutEvents | Select @{Name = "LockedUserName"; Expression = {$_.Properties[5].Value}}, `<br>                        @{Name = "LogonType"; Expression = {$_.Properties[10].Value}}, `<br>                        @{Name = "LogonProcessName"; Expression = {$_.Properties[11].Value}}, `<br>                        @{Name = "ProcessName"; Expression = {$_.Properties[18].Value}}</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":13208,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/rem_find.png?w=1024" alt="" class="wp-image-13208" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>The screenshot displays LogonProcessName as User32, ProcessName as svchost.exe, and LogonType as 2, indicating an interactive logon attempt. The user entered a wrong password, resulting in the account being locked out. LogonType field has various possible values</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Logon Type	Title	Description</strong><br>2	Interactive	An interactive logon to a local computer.<br>3	Network	A logon from the network to a local computer.<br>4	Batch	A batch logon type means a process is executed on behalf of a user account.<br>5	Service	A service was started by a service control manager.<br>7	Unlock	A local workstation is unlocked.<br>8	NetworkCleartext	A user logged on to a local computer from the network, and the password was passed in cleartext.<br>9	NewCredentials	A cloned token was used so the new session has the same user identity locally but uses a different credential for remote network connections. This logon type is recorded when you use RunAs with the /netonly switch.<br>10	RemoteInteractive	A user was logged on using Remote Desktop or Terminal Services.<br>11	CachedInteractive	A user was logged on using cached credentials without contacting the domain controller to verify credentials.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>The LogonType field helps identify the cause of account lockouts. The properties used to create the output are defined in the security auditing XML template of event logs. To access these properties, use a specific command.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>((Get-WinEvent -ListProvider "Microsoft-Windows-Security-Auditing").events | Where -Property ID -eq 4625).template</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":13219,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/rd_nef.png?w=600" alt="" class="wp-image-13219" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><em>Properties of XML template in event logs understanding.</em></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The Get-WinEvent cmdlet in the snippet stored properties in an array and accessed them by index number. For instance, to retrieve the target username from the event log property, {$_.properties[5].value} was used as it was at index 5. Similarly, for logon type, {$_.properties[10].value} was used. This method was also applied to event ID</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Thanks to: <strong>Surender Kumar/4sysops</strong></p>
<!-- /wp:paragraph -->
