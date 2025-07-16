---
layout: post
title: Disabling inactive computer in Active Directory (180 days)
date: 2023-05-08 13:52
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":8141,"width":"400px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/p-remoting.jpg?w=660" alt="" class="wp-image-8141" style="width:400px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">$DaysInactive = 181<br>$time = (Get-Date).Adddays(-($DaysInactive))<br>Get-ADComputer -Filter {LastLogonTimeStamp -lt $time} -ResultPageSize 2000 -resultSetSize $null -Properties Name, OperatingSystem, SamAccountName, DistinguishedNamE | Disable-ADAccount</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">1. The <strong>$DaysInactive</strong> variable is set to <strong>181,</strong> indicating the number of days of inactivity after which a computer account is considered inactive.<br><br>2. The <strong>$time </strong>variable is calculated by subtracting the number of days specified in $DaysInactive from the current date and time.<br><br>3. The Get-ADComputer cmdlet is used to retrieve computer accounts from Active Directory based on the <strong>filter</strong> <strong>{LastLogonTimeStamp -lt $time}.</strong> This filter selects computer accounts whose LastLogonTimeStamp is less than the specified $time.<br><br>4. The <strong>-ResultPageSize</strong> parameter limits the number of results returned per page to 2000.<br><br>5. The -resultSetSize <strong>$null</strong> parameter ensures that all results are retrieved.<br><br>6. The -Properties parameter specifies the properties to be included in the output, such as Name,<br><strong>OperatingSystem,</strong> <strong>SamAccountName,</strong> and <strong>DistinguishedName.</strong><br><br>7. The retrieved computer accounts are piped to the <strong>Disable-ADAccount</strong> cmdlet, which disables<br>the accounts in Active Directory.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
