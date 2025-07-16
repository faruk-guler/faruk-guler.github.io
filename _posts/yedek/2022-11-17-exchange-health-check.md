---
layout: post
title: Exchange Server Health Checking with Powershell
date: 2022-11-17 20:32
tag: [Checks]
author: theguler
comments: true
categories: [Health Check]
---
<!-- wp:image {"id":5549,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/exc-status-2.png?w=970" alt="" class="wp-image-5549" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Exchange Server HealthChecker.ps1, Microsoft Exchange Server ortamınızın sağlığını izlemenize yardımcı olan bir PowerShell scriptidir. Bu script, Exchange sunucularınızın sağlığını kontrol etmek, performans sorunlarını tanımlamak ve Exchange sunucularınız üzerindeki olası hataları belirlemek için kullanılabilir. Ayrıca, Exchange sunucularının zorunlu olarak gereksinim duyduğu tüm güvenlik güncelleştirme yamalarının (CVE-202x.xxx) sisteminizde yüklü olup olmadığını da kontrol etmenize olanak tanır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Exchange Server HealthChecker.ps1, PowerShell 2.0 veya daha yeni bir sürümü gerektirir ve Exchange Server 2007, 2010, 2013, 2016 ve 2019 ile uyumludur. Bu script, Exchange sunucularının çeşitli bileşenlerinin durumunu kontrol ederek, performans sorunlarını tanımlayarak ve hataları belirleyerek, Exchange ortamınızın daha sağlıklı ve daha performanslı çalışmasına yardımcı olur.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Exchange Server Sağlık denetimi yapan "PowerShell" betiği hakkında:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Exchange Server 2013/2016/2019'u destekler</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Tüm düzeltmeler/özellikler ile tutulan bir değişiklik günlüğü</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Microsoft Mühendisleri tarafından oluşturulur ve korunur</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Her zaman güncel iyileştirmeler yaparlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Öneri ve tavsiyelere açıktır. (extoolsfeedback@microsoft.com)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>%100 PowerShell'dir</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Betik yalnızca Exchange 2013/2016/2019&nbsp;için geçerlidir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Betik, Exchange 2010/2007'de kısıtlı çalışacaktır, çıktıları ise daha sınırlıdır.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Devamlı güncel tutulan Betiği indirmek/download için:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>&gt;&gt;&gt;</strong> https://github.com/microsoft/CSS-Exchange/releases/latest/download/HealthChecker.ps1</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>&gt;&gt;&gt;</strong> https://github.com/faruk-guler/Microsoft-Exchange-Server</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>***Güvenlik gerekçesiyle Microsoft'un geçerli sayfaları harici bir yerden Script temin <strong>etmeyiniz !!!</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Öncelikle HealthChecker.ps1 PowerShell betiğini Exchange Server&nbsp;<strong>C:\script</strong>&nbsp;klasörüne atın.&nbsp;Bu isimde klasörünüz yoksa, bir tane oluşturalım.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5554,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/exc-ps.png?w=915" alt="" class="wp-image-5554" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Exchange Server'da Exchange Management Shell'i yönetici olarak çalıştırın.&nbsp;Dizin yolunu&nbsp;<strong>C:\script</strong>&nbsp;olarak değiştirin .&nbsp;HealthChecker.ps1 içinde Exchange Sunucusunu belirtin.&nbsp;Exchange Sunucusunu tanımlamazsanız, yerel ana bilgisayarı (<strong>şu anda üzerinde bulunduğunuz sunucuyu</strong>) baz alacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>&nbsp;Scripti çalıştırdığınız zaman, scriptin bulunduğu konumda 2 adet dosya oluşur.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>file.txt: </strong>PowerShell penceresinde bulunan çıktısı file.txt olarak klasör içerisinde oluşur.
<strong>file.xml: </strong>Raporu daha detaylı incelemek için bir file.xml olarak oluşturur.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Eğer gerekliyse PowerShell ISE'de Exchange Komutlarını çalıştırmak için,  "Exchange Yönetimi ek bileşeni"ni yükleyin:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Exchange yönetimi ek bileşeni Exchange 2010</strong>
<strong>PS:</strong>
C:\&gt; Add-PSsnapin Microsoft.Exchange.Management.PowerShell.E2010

<strong>Exchange yönetimi ek bileşeni Exchange 2013/2016/2019</strong>
<strong>PS:</strong>
C:\&gt; Add-PSSnapin Microsoft.Exchange.Management.PowerShell.SnapIn

</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Exchange sağlık raporu oluştur:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>PS:</strong>
C:\script\HealthChecker.ps1 -BuildHtmlServersReport -HtmlReportFile "C:\script\Exc-2019Report.htm"</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Output File - Muhtemel Rapor Dosyaları:</strong>

Output file written to: <strong>.\HealthChecker-EXC1-3551547545.txt</strong>
Exported Data Object Written to: <strong>.\HealthChecker-EXC1-25236.xml</strong>
Exported file path to: <strong>C:\script\Exc-2019Report.htm</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Tüm Exchange Sunucuları için sağlık raporu oluşturun:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>PS:</strong>
C:\scripts&gt;Get-ExchangeServer | ?{$_.AdminDisplayVersion -Match "^Version 15"} | %{.\HealthChecker.ps1 -Server $_.Name}; .\HealthChecker.ps1 -BuildHtmlServersReport; .\Exc-AllServers-Report.htm
</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Her şey yeşil görünüyorsa, hiçbir sorununuz yok demektir.&nbsp;Sarı ise, gözden geçirmeniz gerekebilir.  Eğer Exchange sağlık raporunda<strong> "kırmızı öğeler" </strong>görüyorsanız bu müdahale etmeniz gerektiği anlamına gelir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. - Best regards.</strong></p>
<!-- /wp:paragraph -->
