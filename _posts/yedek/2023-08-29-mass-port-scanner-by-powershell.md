---
layout: post
title: Mass Port Scanner by Powershell (Specific and All Ports)
date: 2023-08-29 16:30
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":2148,"width":"416px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-as-admin.webp?w=1024" alt="" class="wp-image-2148" style="width:416px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>PS:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>$ports = @(25, 53, 88, 135, 139, 389, 445, 636, 9389, 3269, 5722, 123, 464)
# tum portlari tara ornek: </strong>53.. 65535<strong>
$serverIP = "10.5.10.217"
</strong>
#Note: You cannot use cmdlet(Powershell) to Check UDP ports.
#Note: UDP bağlantı noktalarını Denetlemek için cmdlet(Powershell) kullanamazsınız.

<strong>
foreach ($port in $ports) {
    $socket = New-Object System.Net.Sockets.TcpClient
    $result = $socket.BeginConnect($serverIP, $port, $null, $null)
    Start-Sleep -Milliseconds 500  # gecikme suresi
    if ($socket.Connected) {
        Write-Host "Port $port ACIK"
        $socket.Close()
    } else {
        Write-Host "Port $port KAPALI"
    }
}</strong></pre>
<!-- /wp:preformatted -->
