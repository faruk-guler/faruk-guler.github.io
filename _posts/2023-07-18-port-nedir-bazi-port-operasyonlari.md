---
layout: post
title: Port Nedir? Port Operations
date: 2023-07-18 22:38
author: theguler
comments: true
categories: [Network]
---
<!-- wp:image {"id":8382,"width":"448px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/port-scanning.webp?w=640" alt="" class="wp-image-8382" style="width:448px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Port, </strong>Bilgisayar ağlarında bir iletişim kanalını veya hizmetin belirli bir noktasını temsil eden numaralardır. İletişim kurmak için bilgisayarlar arasında paketlerin aktarıldığı bağlantı noktalarıdır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bir port numarası, 16 bitlik bir tamsayı olarak ifade edilir ve genellikle <strong>0 ile 65535</strong> arasında değer alır. <strong>"Ama genel olarak kabul edilen port numaraları arasında yer almayan özel portlarda bulunmaktadır."</strong> </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Port numaraları, <strong>TCP</strong> (Transmission Control Protocol) veya<strong> UDP</strong> (User Datagram Protocol) gibi ağ protokollerinin üzerinde çalışan hizmetlerin tanımlanmasında kullanılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Port numaraları <strong>"0 ile 65,535" </strong>arasında değer alabilir. Bu aralıktaki belirli port numaraları, belirli hizmetler veya protokoller tarafından kullanılır. İşte Bazı portların Wikipedia üzerinde bir listesi: <a rel="noreferrer noopener" href="https://tr.wikipedia.org/wiki/TCP_ve_UDP_ba%C4%9Flant%C4%B1_noktas%C4%B1_numaralar%C4%B1_listesi" target="_blank">https://tr.wikipedia.org</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Söz konusu 65,535 adet port,</strong> bu port numaralarının birbiriyle çakışmasını engellemek ve belirli hizmetleri veya protokolleri tanımlamak için standartlaştırılmıştır. Ancak, tüm port numaraları kullanılmamaktadır. Bazı port numaraları belirli bir hizmet veya protokolle ilişkilendirilmiştir, ancak bazıları da kullanıcıların özgürce kullanabileceği geçici portlardır. Port numaraları, ağ güvenliği, yönlendirme ve ağ trafiği yönetimi gibi konularda önemli bir rol oynar.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#PORTS (1..65535 Total) and more<br><br><strong>Some Linux Port Check Operations</strong><br>#################################<br><br><strong>sudo netstat -nlptu </strong>#(Sadece açık portları kullanan servisleri göster.)<br><strong>sudo netstat -tulpan</strong> #Serverde tüm açık portları ve diğer bilgileri incelemek için.<br><strong>sudo</strong> <strong>netstat -tpn | more</strong> #Aktif bağlantılarınızı ve bağlantılı işlemleri göster.<br><strong>sudo</strong> <strong>ss -tulpn</strong> #Açık portları, soketleri, servislerin durumunu ağ bilgilerini görüntüler.<br><strong>sudo ss -tulpan </strong>#TCP(-t) ve UDP(-u) bağlantılarını ve dinleme portlarını (-l) listeler.<br><strong>sudo lsof -i</strong> #Açık olan ağ bağlantılarını ve ilgili süreçleri listeler.<br><br><strong>#Some Windows Powershell Local Netstat</strong><br>#######################################<br><br><strong>netstat<br>netstat -a<br>netstat -an</strong><br><strong>netstat -ano</strong> #Aktif bağlantıları, dinlenen portları &amp; bağlı (PID)'leri listele.<br><strong>netstat -o -n -a | findstr 0.0:80</strong><br><strong>netstat -o -n -a | findstr 0.0:443</strong><br><strong>Get-NetTCPConnection</strong><br><strong>Get-NetTCPConnection | Where-Object { $_.State -eq 'Established' } | Select-Object -Property LocalAddress, LocalPort, RemoteAddress, RemotePort</strong><br><strong>Get-NetTcpConnection -State Listen | Select-Object LocalAddress,LocalPort| Sort-Object -Property LocalPort | Format-Table</strong><br><strong>netstat -ano | findstr /i "listening"</strong> #(bilgisayarınızda açık ve dinleme modunda olan TCP ve UDP bağlantısı ve işlem kimliklerini (PID) noktaları göster)<br><strong>netstat -an |findstr /i "established"</strong> #(bilgisayarınızda kurulmuş olan TCP bağlantılarının bir listesini göster)<br><strong>netstat -an | findstr "443"</strong> #(443 numaralı portu kullanan tüm ağ bağlantılarının bir listesini getir)<br><strong>netstat -ano | findstr "3389"</strong> #(43389 numaralı portu kullanan tüm ağ bağlantılarının bir listesini getir)<br><br><strong>##TELNET Enable/Disable</strong><br>#CMD<br>dism /online /Enable-Feature /FeatureName:TelnetClient #telnet enabled<br>dism /Online /Disable-Feature /FeatureName:TelnetClient<br>#PS Powershell<br>Enable-WindowsOptionalFeature -Online -FeatureName TelnetClient<br>Disable-WindowsOptionalFeature -Online -FeatureName TelnetClient<br><br><strong>#Some Port Checks<br>#################</strong><br><br><strong>#Powershell</strong><br><strong>Test-NetConnection -ComputerName 127.0.0.1 -Port 80</strong> #(Local check)<br><strong>Test-NetConnection -ComputerName 10.5.40.200 -Port 3389</strong> #(Remote check)<br><strong>Test-NetConnection 10.5.10.10 -port 3389|Format-List *</strong><br><strong>TNC 10.5.10.10 -Port 3389 -InformationLevel Detailed</strong><br><strong>foreach ($port in 1..65535) {If (($a=Test-NetConnection 10.5.10.10 -Port $port -WarningAction SilentlyContinue).tcpTestSucceeded -eq $true){ "port $port acik!!"}}</strong><br><strong>Test-NetConnection -ComputerName 10.5.10.85 -TraceRoute</strong> #Hedefte izlenen yol<br><br><strong>###Note:</strong> UDP bağlantı noktalarını Denetlemek için cmdlet(Powershell) kullanamazsınız!<br><strong>###Note:</strong> You cannot use cmdlet(Powershell) to Check UDP ports!<br><br><strong>#NETCAT</strong><br><strong>nc -zv 10.5.12.41 443</strong> #TCP #(Netcat gerektirir, Specific)<br><strong>nc -zv 10.5.10.10 1-65535 2&gt;&amp;1 | grep succeeded </strong>#(Mass port check)<br><strong>nc -v -n -z -w5 10.5.8.12 1-3389</strong> #(Specific)<br><strong>nc -v -n -z -w5 10.5.8.12 1-3389 2&gt;&amp;1 | grep succeeded!</strong> #(Mass port check)<br><strong>nc -z -v -u 10.5.10.30 123</strong> #Sadece UDP olup tutarlı degildir. #(Netcat gerektirir, Specific)<br><br><strong>#TELNET</strong><br><strong>telnet 10.5.10.121 22</strong> #(Telnet gerektirir, Specific)<br><strong>for port in {1..3390}; do (echo "quit") | telnet 10.5.10.10 $port 2&gt;/dev/null | grep "Escape character is" &amp;&amp; echo "Port $port is open"; done</strong><br>#(Mass port check)<br><br><strong>#LSOF:</strong><br>sudo lsof -nP -iTCP -sTCP:LISTEN<br>sudo lsof -i<br><br><strong>#NMAP</strong><br><strong>nmap -sV --version-all -p- 10.5.80.47</strong> #tüm servis ve portlar icin<br><strong>nmap -p 80 10.5.5.240</strong> #(Nmap gerektirir, Temel tarama)<br><strong>nmap -p 80,443 10.5.16.240</strong> #(Specific)<br><strong>nmap -p- 10.5.23.10</strong> #Tüm açık portları hızlı bir şekilde tespit et<br><strong>nmap -p 1-65535 --open -T4 10.5.20.245 | grep 'open'</strong> #(Mass port check)<br><strong>sudo nmap -sU 10.5.55.20</strong> #Nmap ile sadece UDP portları tara<br><strong>sudo nmap -p- -sU 10.5.55.20</strong> #Nmap ile "TCP ve UDP" portlarını tara<br><strong>sudo nmap -sS -p 1-100 -sV 10.5.20.48</strong> #portları ve çalışan servisleri tespit et<br><strong>sudo nmap -O 192.168.78.25</strong> #OS Scan</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Saygı ve sevgiyle.  -  With respect and love.</strong></p>
<!-- /wp:paragraph -->
