---
layout: post
title: Deep Dive Exploring Event Viewer with "PowerShell"
date: 2023-10-24 20:02
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":8971,"width":"473px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ps_event.jpg?w=1024" alt="" class="wp-image-8971" style="width:473px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#To list Windows event log types</strong>
Get-WinEvent –ListLog *
Get-EventLog -List


<strong>#Show only security events in list format:</strong> <strong>(Application, System, Security etc.)</strong>
Get-WinEvent -LogName Security | Format-List

#Get Log (GridView) fetch by id:
Get-EventLog -LogName "Security" -InstanceId 4738 | Out-GridView

<strong>#Show (Specific) Event ID in security events list:</strong>
Get-WinEvent -LogName Security | Where-Object { $_.Id -eq 4738 } | Format-List

<strong>#Get-WinEvent data in HTML (Table) format Export:</strong>
Get-WinEvent -LogName Security | Where-Object { $_.Id -eq 4672 } | ConvertTo-Html -As Table -Property * | Out-File C:\Report.html

<strong>#Get-WinEvent data in HTML (List) format Export:</strong>
Get-WinEvent -LogName Security | Where-Object { $_.Id -eq 4672 } | ConvertTo-Html -As List -Property * | Out-File C:\Report.html

<strong>#The path where the system event logs are stored</strong>
C:\Windows\System32\winevt\
C:\Windows\System32\winevt\Logs</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Event Viewer'in Sınırı Nedir ?</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Maksimum Kaynak Boyutudur (Maximum Size):</strong> Olay günlüğünün toplam boyutunu belirler. Bu boyut genellikle kilobayt (KB) veya megabayt (MB) cinsinden ifade edilir. Eğer bir olay günlüğü bu boyutu aşarsa, eski kayıtların silinmesi veya başka bir aksiyon alınması gerekebilir. </p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":9007,"width":"484px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/resize_log_conf.png?w=1024" alt="" class="wp-image-9007" style="width:484px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>"Maksimum log size (KB)"</strong> ifadesi olay günlüğünün ne kadar yer kaplayabileceğini belirleyen bir parametredir. Bu parametre, olay günlüğünün Max kaç kilobayt (KB) boyutunda olabileceğini belirler. Örneğin, bir sistem veya uygulama için "Maksimum Log Size (KB)" değeri 1024 KB olarak ayarlanmışsa, olay günlüğü 1 megabayt (MB) boyutuna ulaşana kadar veri kaydetmeye devam eder. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>***Eğer bu boyut sınırına ulaşılırsa, aşağıda belirtilen günlük yönetim seçeneklerinden biri uygulanacaktır.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Gerektiğinde olayların üzerine yaz (öncelikle eskiler):</strong> Bu seçenek, olay günlüğünün maksimum boyutuna ulaştığında, olayları üzerine yazmayı ifade eder. Yani günlüğün boyut sınırına ulaşıldığında, yeni olaylar eski olayların üzerine yazılarak kaydedilir. Bu, olay günlüğünün sürekli güncel olmasını sağlar, ancak eski olayların kalıcı olarak silinmesine neden olabilir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Günlük dolduğunda arşivle, olayları üzerine yazma:</strong> Bu seçenek, olay günlüğünün maksimum boyutuna ulaştığında verilerin başka bir günlüğe taşınmasını içerir. Eski veriler, başka bir günlük dosyasına taşınarak korunur ve orijinal günlük temizlenir. Bu seçenek, eski olayların korunmasına ve günlüğün temizlenmesine olanak tanır.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Olayları üzerine yazma (günlüğü manuel temizle):</strong> Bu seçenek, olay günlüğünün dolduğunda herhangi bir taşma eylemi uygulanmamasını ifade eder. Bu, yeni veri yazmayı durdurmaz veya verileri taşımaz. Günlük maksimum boyutuna ulaştığında yeni olaylar kaydedilmez. Eğer bu seçenek seçilirse, olay günlüğü manuel olarak temizlenmelidir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla – Best Regards</strong></p>
<!-- /wp:paragraph -->
