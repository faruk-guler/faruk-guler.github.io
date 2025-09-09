---
layout: post
title: Let's Run Your Files with Admin Permissions
date: 2023-06-01 21:33
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":7315,"width":494,"height":348,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/batch-scripting-1.webp?w=451" alt="" class="wp-image-7315" width="494" height="348" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Öncelike UAC' ın kapatılması gerekmektedir. Bu yazımda <a href="https://farukguler.com/posts/what-is-uac/"><strong>https://farukguler.com/assets/post_images/uac-nedir-gpo </strong></a>UAC nedir? nasıl kapatılır vb. diğer bilgiler verilmiştir. Ancak UAC' ın kapatılması güvenlik sebebiyle önerilmez.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Powershell çağırarak <strong>script.bat veya script.cmd</strong> dosyasını admin yetkilerinde çalıştıralım. (v1)</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>@echo off
net session &gt;NUL 2&gt;&amp;1|| powershell Start-Process '%0' -Verb RunAs&amp;&amp; exit /b|| exit /b

ipconfig/all
whoami
hostname
pause</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>script.bat veya script.cmd</strong> dosyasını admin yetkilerinde çalıştıralım (v2)</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">@echo off

:: BatchGotAdmin
:-------------------------------------
REM --&gt; İzin kontrolü yapılıyor
&gt;nul 2&gt;&amp;1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"

REM --&gt; Eget hata alınırsa yönetici değiliz demektir.
if '%errorlevel%' NEQ '0' (
echo Administrator izni isteniyor...
goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
echo Set UAC = CreateObject^("Shell.Application"^) &gt; "%temp%\getadmin.vbs"
set params = %*:"=""
echo UAC.ShellExecute "cmd.exe", "/c %~s0 %params%", "", "runas", 1 &gt;&gt; "%temp%\getadmin.vbs"

"%temp%\getadmin.vbs"
del "%temp%\getadmin.vbs"
exit /B

:gotAdmin
pushd "%CD%"
CD /D "%~dp0"

:komutları buraya yaziniz..
ipconfig
whoami
hostname
pause</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Powershell <strong>script.ps1 </strong>dosyasını admin yetkilerinde çalıştıralım.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>$isAdmin=[bool](([System.Security.Principal.WindowsIdentity]::GetCurrent()).groups -match "S-1-5-32-544")
if (-not $isAdmin) {
  $arguments = "&amp; '" + $MyInvocation.MyCommand.Path + "'"
  Start-Process powershell -Verb runAs -ArgumentList $arguments
  exit
}</strong>

<strong>#S-1-5-32-544</strong> (Alias: BUILTIN\Administrators)
#Buraya PowerShell içeriğinizi ekleyin.
ipconfig
whoami
hostname
pause</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Microsoft VBScript</strong> (Visual Basic Script) <strong>script.vbs </strong>dosyasını admin yetkilerinde çalıştıralım. (Bu VBScript kodu örneği, <code>Shell</code> nesnesini kullanarak, <strong>yüksek yetkilere sahip </strong>bir Komut İstemi<strong>(CMD) </strong>penceresinde <strong>"<code>ipconfig</code>"</strong> komutunu çalıştırır.)</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Set objShell = CreateObject("Shell.Application")
objShell.ShellExecute "cmd.exe", "/k <strong>ipconfig</strong>", "", "runas", 1</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Best Regards. – Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
