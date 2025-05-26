---
layout: post
title: Detect Large Files on Windows with PowerShell
date: 2024-12-12 23:27
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
<p><strong>#Basic</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong># Ignore access errors and just list files</strong><br>Get-ChildItem C:\ -r -Force -ErrorAction SilentlyContinue |sort -descending -property length | select -first 10 name, DirectoryName, @{Name="GB";Expression={[Math]::round($_.length / 1GB, 2)}}</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>#Ps Script</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong># Specified directory:</strong><br>$targetPath = "C:\"<br><br>if (-Not (Test-Path $targetPath)) {<br>    Write-Host "Hedef dizin bulunamadı: $targetPath" -ForegroundColor Red<br>    exit<br>}<br>if (-Not (Get-ChildItem -Path $targetPath -File -Recurse -ErrorAction SilentlyContinue)) {<br>    Write-Host "Hedef dizin boş veya erişilemez: $targetPath" -ForegroundColor Yellow<br>    exit<br>}<br><br># Finding the largest files<br>$largestFiles = Get-ChildItem -Path $targetPath -Recurse -File -ErrorAction SilentlyContinue | <br>    Sort-Object Length -Descending | <br>    Select-Object @{Name="FullName"; Expression={$_.FullName}}, <br>                  @{Name="SizeMB"; Expression={[math]::Round($_.Length / 1MB, 2)}} -First 10<br><br># Finding the largest directories<br>$largestDirectories = Get-ChildItem -Path $targetPath -Recurse -Directory -ErrorAction SilentlyContinue | <br>    ForEach-Object {<br>        $dirSize = (Get-ChildItem -Path $_.FullName -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum<br>        $_ | Select-Object @{Name="FullName"; Expression={$_.FullName}}, <br>                            @{Name="SizeMB"; Expression={[math]::Round($dirSize / 1MB, 2)}}<br>    } | Sort-Object SizeMB -Descending -ErrorAction SilentlyContinue |<br>    Select-Object -First 20<br><br># Generate the report<br>Write-Host "En Büyük 10 Dosya:" -ForegroundColor Cyan<br>$largestFiles | Format-Table -AutoSize<br><br>Write-Host "`nEn Büyük 10 Dizin:" -ForegroundColor Cyan<br>$largestDirectories | Format-Table -AutoSize<br><br># Saving the report to a file (optional)<br>$outputFile = "C:\LargeReport_$(Get-Date -Format 'yyyyMMdd_HHmmss').txt"<br>$reportContent = @"<br>En Büyük 10 Dosya:<br>$($largestFiles | Format-Table -AutoSize | Out-String)<br><br>En Büyük 10 Dizin:<br>$($largestDirectories | Format-Table -AutoSize | Out-String)<br>"@<br>$reportContent | Set-Content -Path $outputFile<br><br>$largestFiles = Get-ChildItem -Path $targetPath -Recurse -File -ErrorAction SilentlyContinue | <br>    Sort-Object Length -Descending | <br>    Select-Object @{Name="DosyaYolu"; Expression={$_.FullName}}, <br>                  @{Name="Boyut(MB)"; Expression={[math]::Round($_.Length / 1MB, 2)}} -First 10<br><br>$largestFiles | Format-Table -AutoSize<br><br><br>Write-Host "`nThe report was saved to file: $outputFile" -ForegroundColor Green</pre>
<!-- /wp:preformatted -->
