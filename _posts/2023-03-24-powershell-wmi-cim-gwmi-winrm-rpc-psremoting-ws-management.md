---
layout: post
title: PowerShell "WMI, CIM, GWMI, WinRM, PsRemoting, RPC, WS-Management"
date: 2023-03-24 00:16
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":6213,"width":536,"height":381,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-scripting.jpg?w=758" alt="" class="wp-image-6213" style="width:536px;height:381px" width="536" height="381" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>WMI </strong>(Windows Management Instrumentation), <strong>CIM </strong>(Common Information Model), <strong>GWMI</strong> (Get-WmiObject), WinRM (Windows Remote Management), <strong>PSRemoting </strong>(PowerShell Remoting), <strong>RPC </strong>(Remote Procedure Call) ve <strong>WS-Management</strong> (Web Services for Management) Windows tabanlı sistemlerde <strong>"uzaktan yönetim"</strong> ve <strong>"bilgi alışverişi"</strong> için kullanılan protokol ve araçları içeren bir dizi teknolojidir.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>WMI</strong>: (Windows Management Instrumentation), sistem yönetimi için bir altyapı sağlayan Microsoft teknolojisidir. WMI, Windows işletim sistemine dahil edilmiştir ve bilgisayar kaynaklarını yönetmek için kullanılabilir. WMI, özellikle uzak bilgisayarlardaki sistem bilgilerini toplamak ve yönetmek için kullanışlıdır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>CIM: </strong>(Common Information Model), sistem yönetimi için bir standarttır. CIM, WMI gibi teknolojilerin de temelini oluşturur ve sistemlerdeki bilgi ve kaynakların yönetimi için standart bir model sağlar. CIM, farklı işletim sistemleri ve cihazlar arasında biletişimi kolaylaştırarak, sistem yönetimini standartlaştırmak ve basitleştirmek için kullanışlıdır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>GWMI (Get-WMIObject): </strong>PowerShell üzerinde WMI sorgularını çalıştırmak için kullanılır. GWMI, özellikle uzak bilgisayarlardaki sistem bilgilerini toplamak ve yönetmek için kullanışlıdır. GWMI ile, WMI sınıflarına ve özelliklerine erişebilir ve bu özelliklerin değerlerini alabilirsiniz.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>RPC:</strong>RPC (Remote Procedure Call), genellikle bir programlama dilinin işlevlerini uzaktaki bir sunucuda çağırmak ve çalıştırmak için kullanılan bir protokoldür. RPC tabanlı işlemler, belirli bir programlama diline veya platforma bağlı olarak farklı komutlara sahip olabilir. Örneğin, Python'da RPC komutları farklı olabilirken, Java'da farklı olabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>WinRM:</strong> WinRM (Windows Remote Management), Microsoft Windows işletim sisteminde uzaktan yönetimi sağlayan bir yönetim protokolüdür. WinRM, sistem yöneticilerinin uzaktaki Windows tabanlı sistemleri uzaktan yönetmelerine ve komutları çalıştırmalarına olanak tanır. Unix tabanlı sistemlerde kullanılan SSH'nin benzeri şekilde, Windows tabanlı sistemler için standartlaştırılmış iletişim sağlar. PowerShell, WinRM'i uzaktan yönetim görevleri için kullanabileceğiniz <code><strong>Enter-PSSession</strong></code> ve <code><strong>Invoke-Command</strong></code> gibi cmdlet'lerle sağlar. Bu cmdlet'leri kullanarak yöneticiler uzaktan oturumlar oluşturabilir, komutları çalıştırabilir ve uzaktaki Windows makinelerinden sonuçları alabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>PSRemoting:</strong>PSRemoting, PowerShell Uzaktan Yönetimi anlamına gelir ve PowerShell'in uzaktaki bilgisayarlar üzerinde komutlar çalıştırma ve yönetim görevlerini gerçekleştirme yeteneğini ifade eder. PSRemoting, WinRM (Windows Remote Management) protokolünü kullanarak uzaktaki Windows makineleri ile iletişim kurar ve bu sayede uzaktaki sistemlere komutlar göndererek işlemleri gerçekleştirir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>WS-Management: </strong>WS-Management (Web Services for Management) veya WS-Man, ağ üzerinde sistem yönetimi için kullanılan bir web hizmetleri tabanlı protokoldür. WS-Management, Microsoft ve diğer şirketler tarafından geliştirilmiş ve DMTF (Distributed Management Task Force) tarafından standartlaştırılmıştır. Bu protokol, sistemler arasında veri ve komut değişimi yapmak için SOAP (Simple Object Access Protocol) ve XML tabanlı mesajlaşma kullanır. <strong>"WS-Management" </strong>uzaktan yönetim ve izleme işlemlerini destekler. Bir ağdaki sistemleri ve cihazları uzaktan izlemek, yapılandırmak ve yönetmek için kullanılır.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image {"id":8141,"width":595,"height":298,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/p-remoting.jpg?w=660" alt="" class="wp-image-8141" style="width:595px;height:298px" width="595" height="298" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>WMI, CIM, GWMI, WinRM, RPC, PSRemoting ve WS-Management için yaygın olarak kullanılan portlar:</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>WMI (Windows Management Instrumentation):</strong>
<strong>TCP 135:</strong> WMI, RPC (Remote Procedure Call) üzerinden hizmete bağlanmak için bu portu kullanır.
<strong>Dinamik Portlar:</strong> WMI, RPC istemci ve sunucu tarafında dinamik olarak bir port aralığı seçer. Bu port aralığı genellikle <strong>49152 ile 65535</strong> arasındadır.

<strong>CIM (Common Information Model):</strong>
CIM, doğrudan bir port kullanmaz. WMI gibi, CIM de RPC (Remote Procedure Call) aracılığıyla çalışır ve <strong>TCP 135</strong> üzerinden hizmete bağlanır.

<strong>GWMI (Get-WmiObject):</strong>
GWMI, WMI sorguları yapmak için kullanılan PowerShell cmdlet'lerinden biridir. GWMI'nın doğrudan bir portu yoktur. WMI'ın kullandığı portlarla iletişim kurar.

<strong>WinRM (Windows Remote Management):</strong>
<strong>TCP 5985:</strong> WinRM varsayılan olarak HTTP üzerinden çalışır ve bu portu kullanır. Bu port, HTTP üzerinden metinsel verileri şifrelenmeden ileten açık bir porttur.
<strong>TCP 5986: </strong>WinRM, HTTPS üzerinden çalıştırıldığında bu portu kullanır. Bu port, verilerin şifrelenmesini sağlar ve daha güvenlidir.

<strong>PSRemoting (PowerShell Remoting):</strong>
PSRemoting, WinRM protokolünü kullandığından, PSRemoting portları da WinRM portları ile aynıdır.
<strong>TCP 5985:</strong> HTTP üzerinden çalışan PSRemoting için kullanılır.
<strong>TCP 5986:</strong> HTTPS üzerinden çalışan PSRemoting için kullanılır.

<strong>RPC (Remote Procedure Call):</strong>
<strong>TCP 135:</strong> RPC hizmeti için kullanılır.
Dinamik yüksek portlar <strong>(49152-65535):</strong> RPC sunucuları ve istemcileri arasında dinamik olarak atanır.

<strong>WS-Management (Web Services for Management):</strong>
<strong>TCP 5985:</strong> WinRM protokolü üzerinden WS-Management hizmetini "HTTP" üzerinden çalıştırmak için kullanılır.
<strong>TCP 5986:</strong> WinRM protokolü üzerinden WS-Management hizmetini "HTTPS" üzerinden çalıştırmak için kullanılır.

<strong>***Not: Yukarıda belirtilen port numaraları varsayılan portlardır. Sistem yöneticileri ve güvenlik politikaları, bu port numaralarını değiştirebilir veya kısıtlayabilir</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>PowerShell Üzerinde Örnek Sorgular:</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Uzak bir bilgisayarda etkileşimli bir PowerShell oturumu açmak:</strong>
Enter-PSSession -ComputerName MUHASEBE-03</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Uzak bir bilgisayarda yeni bir dosya oluşturma:</strong>
New-Item -Path "\\RemoteComputerName\C$\Temp" -Name "NewFile.txt" -ItemType File</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#MUHASEBE-03 adlı uzaktaki bilgisayarda "Get-Process" komutunu çalıştırır işlem listesini alır.</strong>
Invoke-Command -ComputerName MUHASEBE-03 -ScriptBlock { Get-Process }</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Uzak bir bilgisayarda yeni bir dosya oluşturma ve içeriğini düzenleme:</strong>
$filePath = "\\MUHASEBE-03\C$\users\ayse\desktop\indexed.php"
$content = @"
&lt;?php
echo "Hello, world!";
?&gt;
"@

Set-Content -Path $filePath -Value $content</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Bu komut uzak sunucu üzerinde yüklü olan yazılımların bir listesini döndürecektir.</strong>
$ComputerName = "MUHASEBE-03"
$SoftwareList = Get-WmiObject -Class Win32_Product -ComputerName $ComputerName | Select-Object Name, Version, Vendor, InstallDate, Product
$SoftwareList</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Uzak bir bilgisayarın açık TCP bağlantılarını görüntüleme:</strong>
Get-NetTCPConnection -ComputerName "MUHASEBE-03" | Where-Object { $_.State -eq "Established" } | Select-Object -Property LocalAddress,LocalPort,RemoteAddress,RemotePort</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Uzak bir bilgisayarın sistem bilgisini görüntüleme:</strong>
Get-WmiObject -Class Win32_ComputerSystem -ComputerName "MUHASEBE-03" | Select-Object -Property Name,Manufacturer,Model,TotalPhysicalMemory</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Uzak bir bilgisayardaki Windows günlük kayıtlarını görüntüleme:</strong>
Get-EventLog -LogName System -ComputerName "MUHASEBE-03" | Select-Object -Property TimeGenerated,Message</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Uzak bir bilgisayardaki etkin oturumları görüntüleme:</strong>
Get-CimInstance -ClassName Win32_LogonSession -ComputerName "MUHASEBE-03" | Select-Object -Property LogonId</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Uzak bir bilgisayarda kullanıcı hesaplarını listeleme:</strong>
Get-WmiObject -Class Win32_UserAccount -ComputerName "MUHASEBE-03"</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Uzak bir bilgisayarda kullanıcı hesaplarını listeleme:</strong>
Get-WmiObject -Class Win32_UserAccount -ComputerName "MUHASEBE-03"</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Uzak bir bilgisayarın belirli bir kullanıcısının oturumunu kapatma:</strong>
Invoke-WmiMethod -Class Win32_OperatingSystem -Name Win32Shutdown -ArgumentList 4 -ComputerName "MUHASEBE-03" -Credential (Get-Credential)</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Uzak bir bilgisayarda bir programı kaldırma:</strong>
$program = Get-WmiObject -Class Win32_Product -Filter "Name='ProgramName'" -ComputerName "MUHASEBE-03"
$program.Uninstall()</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Yerel bilgisayarınızın disk kullanımını görüntüleme:</strong>
Get-Volume | Select-Object -Property DriveLetter,FileSystemLabel,Size,UsedSpace,DriveType | Sort-Object -Property DriveType,DriveLetter</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Yerel bir kullanıcının oturum açma istatistiklerini almak için "Get-WinEvent" kullanmak:</strong>
Get-WinEvent -FilterHashtable @{LogName='Security';ID=4624;Level=0;StartTime=(Get-Date).AddDays(-7)} | Where-Object {$_.Properties[5].Value -eq 'username'} | Select-Object TimeCreated,
Message</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>ve daha niceleri...</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Umarım faydalı olmuştur – I hope it was helpful</strong></p>
<!-- /wp:paragraph -->
