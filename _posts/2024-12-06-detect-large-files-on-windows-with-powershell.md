---
layout: post
title: Detect Large Files on Windows with PowerShell
date: 2024-12-06 20:35
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":15489,"width":"530px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/large_files_ps.PNG?w=667" alt="" class="wp-image-15489" style="width:530px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong># Ignore access errors and just list directorys</strong><br>Get-ChildItem C:\ -Recurse -Force -ErrorAction SilentlyContinue |<br>ForEach-Object {<br>    if ($_.PSIsContainer) {<br>        $folderSize = (Get-ChildItem $_.FullName -Recurse -Force -ErrorAction SilentlyContinue |<br>                       Where-Object { -not $_.PSIsContainer } | # only file<br>                       Measure-Object -Property Length -Sum).Sum<br><br>        [PSCustomObject]@{<br>            Name = $_.Name<br>            DirectoryName = $_.FullName<br>            GB = if ($folderSize) { [Math]::Round($folderSize / 1GB, 2) } else { 0 }<br>        }<br>    } else {<br>        [PSCustomObject]@{<br>            Name = $_.Name<br>            DirectoryName = $_.DirectoryName<br>            GB = [Math]::Round($_.Length / 1GB, 2)<br>        }<br>    }<br>} |<br>Where-Object { $_.GB -gt 0 } | # filter 0<br>Sort-Object -Property GB -Descending | # Sort<br>Select-Object -First 10 # Select top 10 items<br></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>First Only 10 items:</strong>;)</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong># Ignore access errors and just list files</strong><br>Get-ChildItem C:\ -r -Force -ErrorAction SilentlyContinue |sort -descending -property length | select -first 10 name, DirectoryName, @{Name="GB";Expression={[Math]::round($_.length / 1GB, 2)}}</pre>
<!-- /wp:preformatted -->
