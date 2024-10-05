---
layout: post
title: Triggering Client Scan Configuration Manager
date: 2022-12-25 22:23
author: theguler
comments: true
categories: [Microsoft System Center Family]
---
<!-- wp:paragraph -->
<p>Bazı durumlarda hızlı sonuçlar almak için <strong>Microsoft Endpoint Configuration Manager (MECM) ***</strong>eski adıyla (SCCM) Client Action bölümünde bulunan başlıkları elle ya da bir script üzerinden tetiklemeniz gerekir. Ayrıca bunu clientleriniz üzerinde Task Scheduler veya GPO oluşturarak Otomatize edebilirsiniz.<br>Aşağıdaki tablolarda Powershell ve WMI üzerinden bazı tetikleme komutlarını bulabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Daha fazlası için: </strong>https://learn.microsoft.com/en-us/mem/configmgr</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5866,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://theguler.wordpress.com/wp-content/uploads/2022/12/system-center-config-mgr-client.webp?w=428" alt="" class="wp-image-5866" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Powershell Command:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td><strong>Client Agent</strong></td><td><strong>Powershell Command</strong></td></tr><tr><td><strong>Application Deployment Evaluation Cycle</strong></td><td>Invoke-WMIMethod -ComputerName $Server -Namespace root\ccm -Class SMS_CLIENT -Name TriggerSchedule “{00000000-0000-0000-0000-000000000121}”</td></tr><tr><td><strong>Discovery Data Collection Cycle</strong></td><td><br>Invoke-WMIMethod -ComputerName $Server -Namespace root\ccm -Class SMS_CLIENT -Name TriggerSchedule “{00000000-0000-0000-0000-000000000003}”</td></tr><tr><td><strong>File Collection Cycle</strong></td><td>Invoke-WMIMethod -ComputerName $Server -Namespace root\ccm -Class SMS_CLIENT -Name TriggerSchedule “{00000000-0000-0000-0000-000000000010}”</td></tr><tr><td><strong>Hardware Inventory Cycle</strong></td><td>Invoke-WMIMethod -ComputerName $Server -Namespace root\ccm -Class SMS_CLIENT -Name TriggerSchedule “{00000000-0000-0000-0000-000000000001}”</td></tr><tr><td><strong>Machine Policy Retrieval Cycle</strong></td><td>Invoke-WMIMethod -ComputerName $Server -Namespace root\ccm -Class SMS_CLIENT -Name TriggerSchedule “{00000000-0000-0000-0000-000000000021}”</td></tr><tr><td><strong>Machine Policy Evaluation Cycle</strong></td><td>Invoke-WMIMethod -ComputerName $Server -Namespace root\ccm -Class SMS_CLIENT -Name TriggerSchedule “{00000000-0000-0000-0000-000000000022}”</td></tr><tr><td><strong>Software Inventory Cycle</strong></td><td>Invoke-WMIMethod -ComputerName $Server -Namespace root\ccm -Class SMS_CLIENT -Name TriggerSchedule “{00000000-0000-0000-0000-000000000002}”</td></tr><tr><td><strong>Software Metering Usage Report Cycle</strong></td><td>Invoke-WMIMethod -ComputerName $Server -Namespace root\ccm -Class SMS_CLIENT -Name TriggerSchedule “{00000000-0000-0000-0000-000000000031}”</td></tr><tr><td><strong>Software Update Deployment Evaluation Cycle</strong></td><td>Invoke-WMIMethod -ComputerName $Server -Namespace root\ccm -Class SMS_CLIENT -Name TriggerSchedule “{00000000-0000-0000-0000-000000000114}”</td></tr><tr><td><strong>Software Update Scan Cycle</strong></td><td>Invoke-WMIMethod -ComputerName $Server -Namespace root\ccm -Class SMS_CLIENT -Name TriggerSchedule “{00000000-0000-0000-0000-000000000113}</td></tr><tr><td><strong>State Message Refresh</strong></td><td>Invoke-WMIMethod -ComputerName $Server -Namespace root\ccm -Class SMS_CLIENT -Name TriggerSchedule “{00000000-0000-0000-0000-000000000111}”</td></tr><tr><td><strong>User Policy Retrieval Cycle</strong></td><td>Invoke-WMIMethod -ComputerName $Server -Namespace root\ccm -Class SMS_CLIENT -Name TriggerSchedule “{00000000-0000-0000-0000-000000000026}”</td></tr><tr><td><strong>User Policy Evaluation Cycle</strong></td><td>Invoke-WMIMethod -ComputerName $Server -Namespace root\ccm -Class SMS_CLIENT -Name TriggerSchedule “{00000000-0000-0000-0000-000000000027}”</td></tr><tr><td><strong>Windows Installers Source List Update Cycle</strong></td><td>Invoke-WMIMethod -ComputerName $Server -Namespace root\ccm -Class SMS_CLIENT -Name TriggerSchedule “{00000000-0000-0000-0000-000000000032}”</td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>WMI Command:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td><strong>Client Agent</strong></td><td><strong>WMI Command</strong></td></tr><tr><td><strong>Application Deployment Evaluation Cycle</strong></td><td>WMIC /namespace:\\root\ccm path sms_client CALL TriggerSchedule “{00000000-0000-0000-0000-000000000121}” /NOINTERACTIVE</td></tr><tr><td><strong>Discovery Data Collection Cycle</strong></td><td>WMIC /namespace:\\root\ccm path sms_client CALL TriggerSchedule “{00000000-0000-0000-0000-000000000003}” /NOINTERACTIVE</td></tr><tr><td><strong>File Collection Cycle</strong></td><td>WMIC /namespace:\\root\ccm path sms_client CALL TriggerSchedule “{00000000-0000-0000-0000-000000000010}” /NOINTERACTIVE</td></tr><tr><td><strong>Hardware Inventory Cycle</strong></td><td>WMIC /namespace:\\root\ccm path sms_client CALL TriggerSchedule “{00000000-0000-0000-0000-000000000001}” /NOINTERACTIVE&nbsp;Silmek için:<br>WMIC /namespace:\\root\ccm\invagt path inventoryActionStatus where InventoryActionID=”{00000000-0000-0000-0000-000000000001}” DELETE /NOINTERACTIVE</td></tr><tr><td><strong>Machine Policy Retrieval Cycle</strong></td><td>WMIC /namespace:\\root\ccm path sms_client CALL TriggerSchedule “{00000000-0000-0000-0000-000000000021}” /NOINTERACTIVE</td></tr><tr><td><strong>Machine Policy Evaluation Cycle</strong></td><td>WMIC /namespace:\\root\ccm path sms_client CALL TriggerSchedule “{00000000-0000-0000-0000-000000000022}” /NOINTERACTIVE</td></tr><tr><td><strong>Software Inventory Cycle</strong></td><td>WMIC /namespace:\\root\ccm path sms_client CALL TriggerSchedule “{00000000-0000-0000-0000-000000000002}” /NOINTERACTIVE</td></tr><tr><td><strong>Software Metering Usage Report Cycle</strong></td><td>WMIC /namespace:\\root\ccm path sms_client CALL TriggerSchedule “{00000000-0000-0000-0000-000000000031}” /NOINTERACTIVE</td></tr><tr><td><strong>Software Updates Assignments Evaluation Cycle</strong></td><td>WMIC /namespace:\\root\ccm path sms_client CALL TriggerSchedule “{00000000-0000-0000-0000-000000000108}” /NOINTERACTIVE</td></tr><tr><td><strong>Software Update Scan Cycle</strong></td><td>WMIC /namespace:\\root\ccm path sms_client CALL TriggerSchedule “{00000000-0000-0000-0000-000000000113}” /NOINTERACTIVE</td></tr><tr><td><strong>State Message Refresh</strong></td><td>WMIC /namespace:\\root\ccm path sms_client CALL TriggerSchedule “{00000000-0000-0000-0000-000000000111}” /NOINTERACTIVE</td></tr><tr><td><strong>User Policy Retrieval Cycle</strong></td><td>WMIC /namespace:\\root\ccm path sms_client CALL TriggerSchedule “{00000000-0000-0000-0000-000000000026}” /NOINTERACTIVE</td></tr><tr><td><strong>User Policy Evaluation Cycle</strong></td><td>WMIC /namespace:\\root\ccm path sms_client CALL TriggerSchedule “{00000000-0000-0000-0000-000000000027}” /NOINTERACTIVE</td></tr><tr><td><strong>Windows Installers Source List Update Cycle</strong></td><td>WMIC /namespace:\\root\ccm path sms_client CALL TriggerSchedule “{00000000-0000-0000-0000-000000000032}” /NOINTERACTIVE</td></tr></tbody></table></figure>
<!-- /wp:table -->