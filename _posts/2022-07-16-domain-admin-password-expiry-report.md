---
layout: post
title: Domain Admin Password Expiry Report
date: 2022-07-16 20:32
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":2148,"width":"481px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-as-admin.webp?w=625" alt="" class="wp-image-2148" style="width:481px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong># Settings</strong><br>$smtpServer = "relay.guler.com"  # SMTP server<br>$smtpFrom = "passexpire@guler.com"  # Receiver<br>$smtpTo = ("farukguler@guler.com")  # Receiver e-mail<br>$subject = "Domain admin Password Expiry Report"<br>$body = "Domain Admin users will expire""<br><br><strong># Password expiration calculation</strong><br>$expiryDays = 30<br>$currentDate = Get-Date<br><br>$report = Get-ADGroupMember -Identity "Domain Admins" | ForEach-Object {<br>    $user = Get-ADUser -Identity $_.SamAccountName -Properties "PasswordLastSet", "PasswordNeverExpires"<br>    if ($user.PasswordNeverExpires -eq $false) {<br>        $lastSet = $user.PasswordLastSet<br>        $expiryDate = $lastSet.AddDays($expiryDays)<br>        [PSCustomObject]@{<br>            UserName = $user.Name<br>            <strong>#PasswordLastSet = $lastSet</strong><br>            Pass_Expire_date_time = $expiryDate<br>        }<br>    }<br>} | Format-Table -AutoSize | Out-String<br><br><strong># Sending an email</strong><br>$message = New-Object system.net.mail.mailmessage<br>$message.from = $smtpFrom<br>$message.To.Add($smtpTo)<br>$message.Subject = $subject<br>$message.Body = "$body`n`n$report"<br>$smtp = New-Object Net.Mail.SmtpClient($smtpServer)<br><br><strong># Add recipient addresses</strong><br>foreach ($recipient in $smtpTo) {<br>    $message.To.Add($recipient)<br>}<br><br><strong># Sending emails</strong><br>$smtp.Send($message)<br><br><strong>Write-Output "Email sent successfully."</strong></pre>
<!-- /wp:preformatted -->
