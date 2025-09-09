---
layout: post
title: Domain users 10 days Logon-Logoff Report
date: 2021-12-05 01:03
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":333,"width":435,"height":244,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-4-sdn.jpg?w=1024" alt="" class="wp-image-333" width="435" height="244" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>PS ISE:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Param (
[string]$Computer = (Read-Host hedef Bilgisayar adi=ip: – target Computer name-ip ),
[int]$Days = 10 # Bu bölümde son kaç günlük rapor istendiği belirtilir. Örnekte son 10 günlüK – In the example the last 10 days
)

$now=get-date
Set-Variable -Name ExportFolder -Value “C:\”
$startdate=$now.adddays(-$EventAgeDays)
$ExportFile=$ExportFolder + $Computer + “Logon_Logoff_Report__” + $now.ToString(“yyyy-MM-dd—hh-mm-ss”) + “.csv”
cls

$Result = @()
Write-Host “Turkish:Loglar toplanıyor, bu işlem biraz zaman alabilir… ENGLish: PLease Wait…”
$ELogs = Get-EventLog System -Source Microsoft-Windows-WinLogon -After (Get-Date).AddDays(-$Days) -ComputerName $Computer
If ($ELogs)
{ Write-Host “isleniyor… is running…”
ForEach ($Log in $ELogs)
{ If ($Log.InstanceId -eq 7001)
{ $ET = “Logon”
}
ElseIf ($Log.InstanceId -eq 7002)
{ $ET = “Logoff”
}
Else
{ Continue
}
$Result += New-Object PSObject -Property @{
Time = $Log.TimeWritten
‘Event Type’ = $ET
User = (New-Object System.Security.Principal.SecurityIdentifier $Log.ReplacementStrings[1]).Translate([System.Security.Principal.NTAccount])
}
}
$Result | Select Time,”Event Type”,User | Sort Time -Descending | Export-CSV $ExportFile -NoTypeInformation
Write-Host “Tamamlandı. Okey Enjoy!”
}
Else
{ Write-Host “Bu bilgisayarda sorun oluştu – Problem occurred on this computer: $Computer.”
Write-Host “Eğer ‘Ağ yolu bulunamadı’ hatasını alıyorsanız bu bilgisayarda Remote Registry servisini başlatınız.”
Write-Host “If you are getting the ‘No network path found’ error, start the Remote Registry service on this computer.”
Write-Host “Ayrıca auditing açık olmalıdır – Also, auditing should be open.)”
}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Kolay gelsin. - I wish conveniences</strong></p>
<!-- /wp:paragraph -->
