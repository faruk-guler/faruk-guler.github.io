---
layout: post
title: SMTP Server kullanımı "Powershell" - Using SMTP Server "Powershell"
date: 2023-06-17 21:22
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":7499,"width":604,"height":339,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/send-email-in-powershell-script.jpg?w=1024" alt="" class="wp-image-7499" width="604" height="339" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>***Varsayılanda SMTP sunucusu portu, SSL kullanmadan port 25 numaralı portla, (alternatif olarakta SMTP port 26) çalışır.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>PS ISE Script:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Outlook mail sender script</strong>
<strong>#From &gt; To</strong>
$EmailFrom = “<strong>sendermail@outlook.com</strong>”
$EmailTo = “<strong>faxoce7574@anomgo.com</strong>”

$Subject = “Windows spooler servisi kapandi!"
$Body = “Servis maili Test v1”

$SMTPServer = “<strong>smtp.outlook.com</strong>”

<strong>#SMTP</strong>
$SMTPClient = New-Object Net.Mail.SmtpClient($SmtpServer, <strong>587</strong>)

$SMTPClient.EnableSsl = $true

<strong>#mail and password</strong>
<strong>#password cleartext olduğu icin güvenlik riski taşır!!</strong>
$SMTPClient.Credentials = New-Object System.Net.NetworkCredential(“<strong><strong>sendermail</strong>@outlook.com</strong>”, “<strong>passwd!!65++</strong>”);
$SMTPClient.Send($EmailFrom, $EmailTo, $Subject, $Body)</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Ücretsiz olarak kullanılabilecek SMTP server listesi:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Gmail</strong>
smtp.gmail.com SSL 465
smtp.gmail.com StartTLS 587
pop.gmail.com SSL 995

<strong>Not: </strong>POP3’ü Gmail hesap ayarlarınızdan etkinleştirmeniz gerekir.
Hesabınıza giriş yapın ve POP3’ü etkinleştirin.
Ayrıca Gmail ayarlarında “daha az güvenli uygulamaları” (<strong>üçüncü taraf uygulamaları</strong>) etkinleştirmeniz gerekir:

<strong>#Outlook.com</strong>
smtp.live.com StartTLS 587
pop3.live.com SSL 995

<strong>#Office365.com</strong>
smtp.office365.com StartTLS 587
outlook.office365.com SSL 995

<strong>#Yahoo</strong> <strong>Mail</strong>
smtp.mail.yahoo.com StartTLS 587
pop.mail.yahoo.com SSL 995

<strong>#AOL.com</strong>
smtp.aol.com
pop.aol.com

<strong>#Hotmail</strong>
smtp.live.com SSL 465
pop3.live.com SSL 995

<strong>#Zoho Mail</strong>
smtp.zoho.com SSL 465
pop.zoho.com SSL 995

<strong>#Mail.com</strong>
smtp.mail.com StartTLS 587
pop.mail.com SSL 995

<strong>#GMX.com</strong>
smtp.gmx.com StartTLS 587
pop.gmx.com SSL 995</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Varsayılan Sunucu Bağlantı Noktaları:</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>SMTP Sunucusu (Giden Sunucu)</strong>

Sunucu tipi (Şifrelenmemiş) Kimlik doğrulama tipi (Yok) Bağlantı Noktası No 25 ve 26

Sunucu tipi (Güvenli TLS) Kimlik doğrulama tipi (StartTLS) Port No 587

Sunucu tipi (Güvenli SSL) Kimlik doğrulama tipi (SSL) Port No 465


<strong>POP3 Sunucusu (Gelen Sunucu)</strong>

Sunucu tipi (Şifrelenmemiş) Kimlik doğrulama tipi (Yok) Port No 110

Sunucu tipi (Güvenli SSL) Kimlik doğrulama tipi (SSL) Port No 995


<strong>IMAP Sunucusu (Gelen Sunucu)</strong>

Sunucu tipi (Şifrelenmemiş) Kimlik doğrulama tipi (Yok) Port No 143

Sunucu tipi (Güvenli SSL) Kimlik doğrulama tipi (SSL) Port No 993

<strong>***Genel SMTP sunucularının tümü sunucularında SSL sertifikaları kullanır.</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
