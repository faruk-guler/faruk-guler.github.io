---
layout: post
title: AD Domain Affiliation Check PowerShell
date: 2024-10-01 19:28
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":8141,"width":"490px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/p-remoting.jpg?w=660" alt="" class="wp-image-8141" style="width:490px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Enabling PowerShell Remoting:</strong> In order to use PowerShell Remoting, the Enable-PSRemoting -Force command must be run on each computer. This command makes the necessary settings to establish and manage remote PowerShell sessions.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Firewall Settings:</strong> In firewalls such as Windows Firewall, rules must be created that allow PowerShell Remoting traffic. Otherwise, remote connections may fail.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Permissions: </strong>You must have the necessary permissions to run this script. In particular, you must have permission to read computer objects in Active Directory (to be able to run the Get-ADComputer command)</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong># Get computers in OU</strong><br>$computers = Get-ADComputer -SearchBase "OU=uyeler,DC=guler,DC=com" -Filter * | Select-Object -ExpandProperty Name<br><br><strong># Check every computer</strong><br>foreach ($computer in $computers) {<br>    try {<br>        $session = New-PSSession -ComputerName $computer -ErrorAction Stop<br>        Remove-PSSession $session<br>        Write-Host "${computer}: Connected to Domain"<br>    } catch {<br>        Write-Host "${computer}: Not connected to Domain" }}</pre>
<!-- /wp:preformatted -->


<script src="https://giscus.app/client.js"
        data-repo="faruk-guler/faruk-guler.github.io"
        data-repo-id="R_kgDOM77PCQ"
        data-category="[ENTER CATEGORY NAME HERE]"
        data-category-id="[ENTER CATEGORY ID HERE]"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="en"
        crossorigin="anonymous"
        async>
</script>