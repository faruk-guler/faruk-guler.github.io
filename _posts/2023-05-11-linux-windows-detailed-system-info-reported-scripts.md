---
layout: post
title: Linux &amp; Windows Detailed System Info Reported Scripts
date: 2023-05-11 20:26
author: theguler
comments: true
categories: [Common]
---
<!-- wp:image {"id":1924,"width":588,"height":179,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://faruk-guler.github.io/assets/post_images/pic_server_install-1.jpg?w=980" alt="" class="wp-image-1924" style="width:588px;height:179px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Windows:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"># Rapor için dosya yolu ve adı
$reportPath = "C:\rapor.html"

# Systeminfo komutunun çıktısını metin dosyasına kaydet
systeminfo &gt; C:\systeminfo.txt

# CPU bilgilerini al
$cpuInfo = Get-WmiObject -Class Win32_Processor

# RAM bilgilerini al
$ramInfo = Get-WmiObject -Class Win32_ComputerSystem

# GPU bilgilerini al (NVIDIA GPU'lar için)
$gpuInfo = Get-WmiObject -Namespace "Root\CIMv2" -Class Win32_PnPEntity | Where-Object { $_.Name -like "NVIDIA*" }

# Harici cihaz bilgilerini al
$externalDevices = Get-WmiObject -Class Win32_PnPEntity | Where-Object { $_.ConfigManagerErrorCode -eq 0 }

# HTML raporunu oluştur
New-Item -ItemType file -Path $reportPath -Force | Out-Null
Add-Content -Path $reportPath -Value "&lt;html&gt;&lt;head&gt;&lt;style&gt;table, th, td {border: 1px solid black;border-collapse: collapse;padding: 5px;}&lt;/style&gt;&lt;/head&gt;&lt;body&gt;"
Add-Content -Path $reportPath -Value "&lt;h1&gt;Sistem Bilgileri Raporu&lt;/h1&gt;"

# Sistem bilgilerini tabloya ekle
Add-Content -Path $reportPath -Value "&lt;h2&gt;Genel Sistem Bilgileri&lt;/h2&gt;"
Add-Content -Path $reportPath -Value "&lt;table&gt;"
Get-Content -Path C:\systeminfo.txt | ForEach-Object {
    $line = $_
    if ($line -match "^\s*([^:]+):\s+(.*)$") {
        $property = $Matches[1]
        $value = $Matches[2]
        Add-Content -Path $reportPath -Value "&lt;tr&gt;&lt;td&gt;$property&lt;/td&gt;&lt;td&gt;$value&lt;/td&gt;&lt;/tr&gt;"
    }
}
Add-Content -Path $reportPath -Value "&lt;/table&gt;"

# CPU bilgilerini rapora ekle
Add-Content -Path $reportPath -Value "&lt;h2&gt;CPU Bilgileri&lt;/h2&gt;"
Add-Content -Path $reportPath -Value "&lt;table&gt;"
Add-Content -Path $reportPath -Value "&lt;tr&gt;&lt;td&gt;İşlemci Modeli&lt;/td&gt;&lt;td&gt;$($cpuInfo.Name)&lt;/td&gt;&lt;/tr&gt;"
Add-Content -Path $reportPath -Value "&lt;tr&gt;&lt;td&gt;Çekirdek Sayısı&lt;/td&gt;&lt;td&gt;$($cpuInfo.NumberOfCores)&lt;/td&gt;&lt;/tr&gt;"
Add-Content -Path $reportPath -Value "&lt;tr&gt;&lt;td&gt;İşlemci Hızı&lt;/td&gt;&lt;td&gt;$($cpuInfo.MaxClockSpeed) MHz&lt;/td&gt;&lt;/tr&gt;"
Add-Content -Path $reportPath -Value "&lt;/table&gt;"

# RAM bilgilerini rapora ekle
Add-Content -Path $reportPath -Value "&lt;h2&gt;RAM Bilgileri&lt;/h2&gt;"
Add-Content -Path $reportPath -Value "&lt;table&gt;"
Add-Content -Path $reportPath -Value "&lt;tr&gt;&lt;td&gt;Toplam RAM&lt;/td&gt;&lt;td&gt;$($ramInfo.TotalPhysicalMemory / 1GB) GB&lt;/td&gt;&lt;/tr&gt;"
Add-Content -Path $reportPath -Value "&lt;tr&gt;&lt;td&gt;Boş RAM&lt;/td&gt;&lt;td&gt;$($ramInfo.FreePhysicalMemory / 1MB) MB&lt;/td&gt;&lt;/tr&gt;"
Add-Content -Path $reportPath -Value "&lt;/table&gt;"

# GPU bilgilerini rapora ekle
Add-Content -Path $reportPath -Value "&lt;h2&gt;GPU Bilgileri&lt;/h2&gt;"
Add-Content -Path $reportPath -Value "&lt;table&gt;"
foreach ($gpu in $gpuInfo) {
    Add-Content -Path $reportPath -Value "&lt;tr&gt;&lt;td&gt;GPU&lt;/td&gt;&lt;td&gt;$($gpu.Name)&lt;/td&gt;&lt;/tr&gt;"
}
Add-Content -Path $reportPath -Value "&lt;/table&gt;"

# Harici cihaz bilgilerini rapora ekle
Add-Content -Path $reportPath -Value "&lt;h2&gt;Harici Cihazlar&lt;/h2&gt;"
Add-Content -Path $reportPath -Value "&lt;table&gt;"
foreach ($device in $externalDevices) {
    Add-Content -Path $reportPath -Value "&lt;tr&gt;&lt;td&gt;Cihaz Adı&lt;/td&gt;&lt;td&gt;$($device.Name)&lt;/td&gt;&lt;/tr&gt;"
    Add-Content -Path $reportPath -Value "&lt;tr&gt;&lt;td&gt;Sürücü&lt;/td&gt;&lt;td&gt;$($device.DriverName)&lt;/td&gt;&lt;/tr&gt;"
}
Add-Content -Path $reportPath -Value "&lt;/table&gt;"

# Raporu tamamla
Add-Content -Path $reportPath -Value "&lt;/body&gt;&lt;/html&gt;"
</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Linux:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"></pre>
<!-- /wp:preformatted -->
