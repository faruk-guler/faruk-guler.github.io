---
layout: post
title: Generate a Self-Signed Digital Certificate Powershell
date: 2022-10-13 16:53
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":15422,"width":"514px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/self-signed-powershell.PNG?w=1024" alt="" class="wp-image-15422" style="width:514px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li><strong>✅ Self Signed SSL Certificate</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>✅ SSL Certificates from Trusted CA</strong></li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>To create an SSL/TLS certificate, a global (CA - Certificate Authority) such as GoDaddy, GlobalSign, GlobalSign, etc. is usually consulted. However, in development and testing environments, you can use a certificate called "Self-Signed Certificate". However, browsers do not trust these certificates even though the connection is encrypted, it is normal to receive warnings that the connection is not secure. You can overcome this problem by adding it to the trusted certificates in your browser.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>A "self-signed certificate" is a certificate that is signed by the owner of a security certificate (such as an SSL/TLS certificate) and is <strong>not approved</strong> by a third-party certificate authority (CA - Certificate Authority).</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Public Certificate Authorities are third-party organizations that are generally recognized by browsers and operating systems, verify their trustworthiness, and manage the process of providing users with a secure connection by signing certificates.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>GoDaddy<br>Let's Encrypt<br>VeriSign (Symantec)<br>DigiCert<br>GlobalSign<br>Comodo (Sectigo)<br>.etc</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Generate Basic Self-Signed Certificate:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">New-SelfSignedCertificate -CertStoreLocation Cert:\LocalMachine\My -DnsName "*.guler.com"<br><br><strong>**Creating one certificate with Subject Alternative Name: [SAN]</strong><br>New-SelfSignedCertificate -DnsName "*.guler.com", "*.itteam.org" -CertStoreLocation "cert:\LocalMachine\My"<br><br><strong>#Verify:</strong><br>Get-ChildItem -Path Cert:\LocalMachine\My<br><br><strong>#Get Certificate Expire Date:</strong><br>Get-ChildItem -path Cert:\LocalMachine\My | select FriendlyName, NotAfter, DNSNamelist</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":15457,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/verify_cert.PNG?w=1024" alt="" class="wp-image-15457" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>In PowerShell, <strong>"Get-Command -Module PKI"</strong> lists all the cmdlets available in the PKI (Public Key Infrastructure) module. This module provides tools for working with digital certificates and certificate stores.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Some of the most important parameters of the <strong>New-SelfSignedCertificate</strong> cmdlet:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Parameter</th><th>DescrIptIon</th><th>Example</th></tr></thead><tbody><tr><td><strong>-DnsName</strong></td><td>Specifies the DNS names the certificate will be valid for.</td><td><code>New-SelfSignedCertificate -DnsName "guler.com"</code></td></tr><tr><td><strong>-CertStoreLocation</strong></td><td>Specifies the certificate store location.</td><td><code>New-SelfSignedCertificate -DnsName "<code>guler.com</code>" -CertStoreLocation "Cert:\LocalMachine\My"</code></td></tr><tr><td><strong>-KeyLength</strong></td><td>Specifies the length of the key in bits.</td><td><code>New-SelfSignedCertificate -DnsName "<code>guler.com</code>" -KeyLength 2048</code></td></tr><tr><td><strong>-Subject</strong></td><td>Specifies the subject name (CN) of the certificate.</td><td><code>New-SelfSignedCertificate -DnsName "<code>guler.com</code>" -Subject "CN=<code>guler.com</code>"</code></td></tr><tr><td><strong>-NotBefore</strong></td><td>Specifies the start date and time of the certificate’s validity period.</td><td><code>New-SelfSignedCertificate -DnsName "<code>guler.com</code>" -NotBefore (Get-Date).AddDays(-1)</code></td></tr><tr><td><strong>-NotAfter</strong></td><td>Specifies the end date and time of the certificate’s validity period.</td><td><code>New-SelfSignedCertificate -DnsName "<code>guler.com</code>" -NotAfter (Get-Date).AddYears(2)</code></td></tr><tr><td><strong>-FriendlyName</strong></td><td>Specifies a friendly name for the certificate.</td><td><code>New-SelfSignedCertificate -DnsName "<code>guler.com</code>" -FriendlyName "Guler Wildcard Certificate"</code></td></tr><tr><td><strong>-KeyAlgorithm</strong></td><td>Specifies the key algorithm to use.</td><td><code>New-SelfSignedCertificate -DnsName "guler.com" -KeyAlgorithm RSA</code></td></tr><tr><td><strong>-HashAlgorithm</strong></td><td>Specifies the hash algorithm to use.</td><td><code>New-SelfSignedCertificate -DnsName "guler.com" -HashAlgorithm SHA256</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>Generate Advanced Self-Signed Certificate:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">New-SelfSignedCertificate `<br>    -CertStoreLocation Cert:\LocalMachine\My `<br>    -DnsName "*.guler.com", "guler.com" `<br>    -FriendlyName "Guler Wildcard Certificate" `<br>    -Subject "CN=*.guler.com, O=GTech, OU=IT, L=OP, S=IST, C=TR, E=jd@jd.com" `<br>    -NotBefore (Get-Date) `<br>    -NotAfter (Get-Date).AddYears(2) `<br>    -KeyAlgorithm RSA `<br>    -KeyLength 2048 `<br>    -KeyUsage DigitalSignature, KeyEncipherment, KeyAgreement `<br>    -KeyExportPolicy Exportable `<br>    -HashAlgorithm "SHA256" `<br>    -Provider "Microsoft Enhanced RSA and AES Cryptographic Provider" `<br>    -Type SSLServerAuthentication</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>**This script creates a self-signed certificate for the DNS name <strong>“*.guler.com</strong>” and installs it in <strong>the local machine’s personal certificate store.</strong> [Cert:\LocalMachine\My]</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":15476,"width":"612px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/certlm.PNG?w=668" alt="" class="wp-image-15476" style="width:612px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Export to Dir:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Export the certificate with its private key as a PFX:</strong><br>Get-ChildItem -Path Cert:\LocalMachine\My # *Thumbprint<br><br>Export-PfxCertificate -Cert Cert:\LocalMachine\My\[Thumbprint] -FilePath C:\example.pfx -Password (ConvertTo-SecureString -String "pass123" -Force -AsPlainText)<br><br><strong>#Export all certificates under cert:\LocalMachine\my store:</strong> [SST]<br>Get-ChildItem -Path cert:\LocalMachine\my | Export-Certificate -FilePath c:\allcerts.sst<br><strong><br>#Export all certificate without its private key as a CER:</strong><br>New-Item -ItemType Directory -Path "C:\CertExports" -Force | Out-Null<br>$certs = Get-ChildItem -Path cert:\LocalMachine\My<br>foreach ($cert in $certs) {<br>    Export-Certificate -Cert $cert -FilePath "C:\CertExports\$($cert.Thumbprint).cer"<br>}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#Import the Certificate to Trusted Root CAs.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Import pfx file:</strong><br>Import-PfxCertificate -FilePath C:\example.pfx -CertStoreLocation Cert:\LocalMachine\Root -Password (ConvertTo-SecureString -String "pass123" -AsPlainText -Force)<br><br><strong>#Import cert file:</strong><br>Import-Certificate -FilePath "C:\guler.cer" -CertStoreLocation cert:\LocalMachine\Root</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":15468,"width":"509px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/cert_view.PNG?w=630" alt="" class="wp-image-15468" style="width:509px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>✨You can now sign scripts with your certificate, convert them to the format you want and use them in other web services (Apache, Nginx, etc.).</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>#Delete Self-Signed Certificate:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#Remove-Item -Path Cert:\CurrentUser\My\[Thumbprint] -DeleteKey<br>#Remove-Item Cert:\LocalMachine\My\[THUMBPRINT] -Force</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Error resolution is considered successful if you can put the pieces of the puzzle together. 💖❤︎</p>
<!-- /wp:paragraph -->
