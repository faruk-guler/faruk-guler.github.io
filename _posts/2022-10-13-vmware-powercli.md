---
layout: post
title: Vmware Snapshot Mail Notifications, ESXI Mismatch Check
date: 2022-10-13 16:59
author: theguler
comments: true
categories: [Vmware Virtualization]
---
<!-- wp:image {"id":717,"width":"457px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/vmware.jpg?w=1024" alt="" class="wp-image-717" style="width:457px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>PS ISE</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Vmware Snapshot Check <strong>Mail </strong>Notifications</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Connect-VIServer "YourvCenter"<br><br>$Header = @"<br>&lt;style&gt;<br><br>BODY{font-family: Arial; font-size: 12pt;}"<br><br>TABLE {border-width: 1px; border-style: solid; border-color: black; border-collapse: collapse;}<br><br>TH {border-width: 1px; padding: 3px; border-style: solid; border-color: black; background-color: #6495ED;}<br><br>TD {border-width: 1px; padding: 3px; border-style: solid; border-color: black;}<br>&lt;/style&gt;<br><br>"@<br>$Date = Get-Date<br><br>$AllVMs = Get-VM -Location "clustername"<br><br>$owners = $AllVMs.CustomFields | Where-Object -Property key -EQ "VM Owner" | select -Unique<br>foreach($owner in $owners)<br>{<br>$vms = $allvms | where {$_.CustomFields.value -eq $owner.value}<br>$Result=foreach($vm in $vms)<br><br>{<br>    $VMOwner = ($VM.CustomFields | Where-Object -Property key -EQ "VM Owner").Value.Replace('@domain.com', '')<br><br>    $VMSnapshots = $VM | Get-Snapshot<br><br>     $e= $VMOwner+"@domain.com"<br><br>    foreach ($Snapshot in $VMSnapshots)<br>    {<br>        [pscustomobject]@{<br><br>            "VM Name:"                     = $VM.Name<br><br>            "VM Owner:"                    = $VMOwner<br><br>            "Snapshot Name:"              = $Snapshot.Name<br><br>            "Snapshot Description:"       = $Snapshot.Description<br><br>            "Total Snapshots in this VM:" = ($VMSnapshots |  Measure-Object).Count<br>            "Date Creation:"              = $Snapshot.created<br><br>            "Snapshot age (Days):"         = [System.Math]::Round( ($Date - $Snapshot.Created).TotalDays / 1)<br>            "Snapshot SizeGB"            = [System.Math]::Round($Snapshot.SizeGB, 1)<br>            "Total Snapshots SizeGB:"     = [System.Math]::Round( ($VMSnapshots | Measure-Object -Sum SizeGB).Sum, 1)<br><br>}<br>   }<br><br>}<br><br>$Email = $Result| ConvertTo-Html -Head $Header <br><br>$e= ($VM.CustomFields | Where-Object -Property key -EQ "VM Owner").value<br>  if($result -eq "" -or $result -eq $null)<br>  {<br>write host "no snap on $vm"<br>}<br>else<br>{<br>Send-MailMessage -Subject "Your VM's have snapshot!" -Body " &lt;h1 style=color:black;font-size:20px;&gt;Dear, $VMOwner&lt;/h1&gt;&lt;span  style=color:black;font-size:16px;&gt; We notice that the following VM includes snapshots, &lt;br /&gt;<br>this means that snapshots are utilized storage capacity and degraded the server performance.&lt;br /&gt; Please login to the vCenter and delete unnecessary snapshots, otherwise, you can send us email at infra@domain.com and we'll do it for you. &lt;br /&gt; &lt;br /&gt;  - If snapshot is required, send us email to exclude this vm from alert.&lt;br /&gt;&lt;br /&gt; Thank you very much.&lt;br /&gt;&lt;br /&gt;&lt;/p&gt; &lt;/span &gt;&lt;/style&gt; $Email " -BodyAsHtml -SmtpServer "EmailServer" -From VMware@domain.com -to  $e<br><br>}<br>}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Get all ESXI details Powercli</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">$myESXiHosts = Get-VMHost | %{ $_ | Select Name,<br>@{N="ESXi Version";E={"$($_.Version) build $($_.Build)"}},<br>@{N="vCenter";E={$_.cluster.Split('/')[2]}},<br>@{N="vCenter version";E={<br>$global:DefaultVIServers | <br>where {$_.Name -eq ($_.ExtensionData.Client.ServiceUrl.Split('/')[2])} | <br>%{"$($_.Version) build $($_.Build)"}<br>}},<br>@{N="Make";E={(Get-EsxCli -VMHost $_.Name).hardware.platform.get().VendorName}},<br>@{N="Model";E={(Get-EsxCli -VMHost $_.Name).hardware.platform.get().ProductName}},<br>@{N="Serial";E={(Get-EsxCli -VMHost $_.Name).hardware.platform.get().SerialNumber}}<br><br>}<br><br>$myESXiHosts | Export-csv C:\Esxi.csv</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Find VM name and Folder is mismatch</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">$VMFolder = @()<br>Foreach ($VM in (Get-VM |Get-View)){<br>$Details = “” |Select-Object VM,Path<br>$Folder = ((($VM.Summary.Config.VmPathName).Split(‘]‘)[1]).Split(‘/‘))[0].TrimStart(‘ ‘)<br>$Path = ($VM.Summary.Config.VmPathName).Split(‘/‘)[0]<br>If ($VM.Name-ne $Folder){<br>$Details.VM= $VM.Name<br>$Details.Path= $Path<br>$VMFolder += $Details<br><br>}<br>}<br>$VMFolder |Export-Csv -NoTypeInformation C:\Mismatch.csv</pre>
<!-- /wp:preformatted -->
