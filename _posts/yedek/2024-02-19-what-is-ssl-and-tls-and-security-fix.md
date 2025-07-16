---
layout: post
title: What is SSL and TLS? and Security Fix
date: 2024-02-19 22:43
author: theguler
comments: true
categories: [Hacking - Security]
---
<!-- wp:image {"id":10927,"width":"423px","height":"auto","aspectRatio":"1.6388059701492537","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ss-tls.jpg?w=589" alt="" class="wp-image-10927" style="aspect-ratio:1.6388059701492537;width:423px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>TLS (Transport Layer Security) </strong>and <strong>SSL (Secure Sockets Layer) </strong>are cryptographic protocols used to secure communication on the internet. Both provide encryption of information during data transfer, thus providing security services such as confidentiality, integrity and authentication.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>SSL: (Secure Sockets Layer):</strong><br>SSL was developed by Netscape Communications and first published in 1995. It was the first protocol used to encrypt and secure communications on the Internet. The main goal of SSL is to ensure that communication between client and server is confidential. SSL forms the basis of the HTTPS (HTTP Secure) protocol commonly used on websites. It is used in communication between browsers and servers, allowing websites to provide a secure connection to their visitors. However, due to the emergence of SSL's security vulnerabilities and its inability to keep up with developing technology, it was replaced by TLS over time.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>TLS: (Transport Layer Security):</strong><br>TLS was developed to replace SSL and was released in 1999. TLS is an improved and vulnerable version of SSL. The process, which started with the transition from SSL 3.0 to TLS 1.0, continues today with TLS 1.2 and TLS 1.3 versions. TLS makes communication on the internet more secure. This protocol increases the security of data by using advanced encryption algorithms. Additionally, it provides authentication and data integrity. Nowadays, TLS is more common to use because SSL has security vulnerabilities and is no longer supported. It allows a secure connection to be used in communication between browsers and servers.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>How (TLS) Transport Layer Security Works?</strong></h2>
<!-- /wp:heading -->

<!-- wp:image {"id":5305,"width":"345px","height":"auto","aspectRatio":"1.9183006535947713","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/tls-preview.png?w=1024" alt="" class="wp-image-5305" style="aspect-ratio:1.9183006535947713;width:345px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Handshake: </strong>A handshake process takes place between the client and the server that initiates the communication. In this process, parties share their certificates and generate encryption keys to authenticate each other. This step is a fundamental step to ensure the security of communication.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Encryption and Authentication: </strong>After the handshake process, communication between the parties is encrypted and authenticated. This step ensures the security and confidentiality of the data.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Data Transfer: </strong>Encrypted data is transmitted securely between parties. Data integrity is ensured, meaning it is verified that the data has not been modified or corrupted.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Connection Termination:</strong> When communication is completed, the connection between the parties is terminated. This step ensures that the communication ends safely.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>How (SSL) Secure Sockets Layer Works? </strong></h2>
<!-- /wp:heading -->

<!-- wp:image {"id":10943,"width":"394px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ssl-works.jpg?w=624" alt="" class="wp-image-10943" style="width:394px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Client Connection:</strong> The client (for example, a web browser) connects to the server and wants to establish a secure connection.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Server Authentication: </strong>The server typically sends a digital certificate to the client. This certificate authenticates the server and proves that a secure connection has been established.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Private Key Sharing:</strong> The server sends a private key to the client, which will be used to encrypt the connection. This key is used to securely transmit the symmetric encryption key that will be used to secure the connection.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Generation of Symmetric Encryption Key:</strong> The client creates a symmetric encryption key for the connection using the private key sent by the server. This key is used to encrypt and decrypt communications.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Encryption and Transmission of Data: </strong>All data between the client and the server is now encrypted and transmitted securely using the generated symmetric encryption key.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Termination of Connection:</strong> When communication is completed, the connection between the client and server is terminated and the encryption keys are deleted.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>These steps constitute the basic working principle of SSL. In this way, communication on the internet is made secure and data is transmitted securely.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>TLS ⚔️ SSL</strong></h2>
<!-- /wp:heading -->

<!-- wp:image {"id":5315,"width":"378px","height":"auto","aspectRatio":"2.8545454545454545","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/tls-vs-ssl.jpg?w=1000" alt="" class="wp-image-5315" style="aspect-ratio:2.8545454545454545;width:378px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>People continue to use SSL when referring to TLS even now, but SSL is no longer supported by most web browsers as this protocol has been considered insecure for many years. The latest version of SSL, SSL 3.0, has been deprecated since 2015.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">The most common uses of SSL and TLS:</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Secure Web Communication (HTTPS):</strong> SSL and TLS are used in the HTTPS protocol to encrypt communication between web browsers and servers. In this way, users can communicate with websites securely.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Email Security:</strong> SSL and TLS are used to encrypt communications between email servers. In this way, e-mail traffic is protected from surveillance by malicious individuals or institutions.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>VPN Connections:</strong> Some VPN services use SSL and TLS to encrypt and securely transmit users' internet traffic.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Secure File Transfer:</strong> SSL and TLS are used to encrypt file transfers through file transfer protocols <strong>(FTP, SFTP, SCP, etc.)</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Secure API Communication:</strong> SSL and TLS are used to encrypt communication between web services and APIs, ensuring data security.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>The most common use of SSL/TLS that you can find on the internet is that it is applied on top of the HTTP (Hypertext Transfer Protocol) protocol and creates an extension known as HTTPS (Secure Hypertext Transfer Protocol). Therefore, any website that uses HTTPS also uses SSL/TLS encryption on a daily basis.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Difference Between HTTP and HTTP(S)</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>HTTP, which stands for Hyper Text Transfer Protocol, is the protocol used to view web pages. HTTPS stands for Secure Hyper Text Transfer Protocol. So it is Http with security feature.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Differences Between SSL and TLS in Summary:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>SSL Version History: </strong>SSL has been replaced by TLS. SSL has versions 1.0, 2.0 and 3.0.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>TLS Version History:</strong> TLS is the upgraded version of SSL, available in versions 1.0, 1.1, 1.2 and 1.3.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Event: </strong>All SSL versions are deprecated. TLS versions 1.2 and 1.3 are actively used.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Warning Messages:</strong> SSL has only two types of warning messages, and the warning messages are not encrypted. On the other hand, TLS alert messages are encrypted and are more diverse.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Message Authentication:</strong> SSL uses MACs, while TLS uses HMACs.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Cipher Suites:</strong> SSL supports legacy algorithms with known vulnerabilities, while TLS uses advanced encryption algorithms.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Handshake: </strong>While the SSL handshake process is complex and slow, the TLS handshake has fewer steps and a faster connection.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>How to Check the SSL/TLS Version</strong></h2>
<!-- /wp:heading -->

<!-- wp:image {"id":3588,"width":"330px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://theguler.wordpress.com/wp-content/uploads/2022/07/health_check.jpg?w=1024" alt="" class="wp-image-3588" style="width:330px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Check For Windows Server and Client:</strong><br>HKLM\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols<br><br>⚠️🔴<strong>Insecure SSL/TLS Versions:</strong><br>&gt; SSL 2.0<br>&gt; SSL 3.0<br>&gt; TLS 1.0<br>&gt; TLS 1.1<br><br>✅✅✅<strong>Secure SSL/TLS Versions:</strong><br>&gt; TLS 1.2<br>&gt; TLS 1.3<br><br><strong>IIS Crypto Tool:</strong> https://www.nartac.com/Products/IISCrypto<br><strong>Check For ssllabs:</strong> https://www.ssllabs.com/ssltest<br><br><strong>REG Dir Server and Client:</strong><br>HKLM\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.2\Server\Server<br>HKLM\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.2\Client<br><br><strong>Enable</strong>✅<strong> Registry Configuration:</strong><br>&gt; Protocols<br> &gt; SSL 2.0<br> &gt; SSL 3.0<br> &gt; TLS 1.0<br> &gt; TLS 1.1<br>✔️✅ &gt; TLS 1.2 <strong>***</strong><br>  &gt; <strong>Server</strong><br>   :DisabledByDefault (0)<br>   :Enabled (1)<br> &gt; <strong>Client</strong><br>   :DisabledByDefault (0)<br>   :Enabled (1)<br><br> &gt; TLS 1.3<br><br><strong>Check For Linux Server and Client:</strong><br><br><strong>Apache:</strong><br>To turn off SSL v3.0 on Apache;<br>SSLProtocol All -SSLv2 -SSLv3<br><br><strong>Nginx:</strong><br>For both TLS version 1.2 and 1.3 use the following in nginx config file:<br>ssl_protocols TLSv1 TLSv1.1 TLSv1.2;</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>⚠️<strong>Note:</strong>&nbsp;TLS 1.3 is only supported in Windows Server 2022 and later.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Security Fix All Version REG File:</strong> Year 2024</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Windows Registry Editor Version 5.00<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols]<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\Multi-Protocol Unified Hello]<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\Multi-Protocol Unified Hello\Client]<br>"Enabled"=dword:00000000<br>"DisabledByDefault"=dword:00000001<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\Multi-Protocol Unified Hello\Server]<br>"Enabled"=dword:00000000<br>"DisabledByDefault"=dword:00000001<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\PCT 1.0]<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\PCT 1.0\Client]<br>"Enabled"=dword:00000000<br>"DisabledByDefault"=dword:00000001<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\PCT 1.0\Server]<br>"Enabled"=dword:00000000<br>"DisabledByDefault"=dword:00000001<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\SSL 2.0]<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\SSL 2.0\Client]<br>"Enabled"=dword:00000000<br>"DisabledByDefault"=dword:00000001<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\SSL 2.0\Server]<br>"Enabled"=dword:00000000<br>"DisabledByDefault"=dword:00000001<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\SSL 3.0]<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\SSL 3.0\Client]<br>"Enabled"=dword:00000000<br>"DisabledByDefault"=dword:00000001<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\SSL 3.0\Server]<br>"Enabled"=dword:00000000<br>"DisabledByDefault"=dword:00000001<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.0]<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.0\Client]<br>"Enabled"=dword:00000000<br>"DisabledByDefault"=dword:00000001<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.0\Server]<br>"Enabled"=dword:00000000<br>"DisabledByDefault"=dword:00000001<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.1]<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.1\Client]<br>"Enabled"=dword:00000000<br>"DisabledByDefault"=dword:00000001<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.1\Server]<br>"Enabled"=dword:00000000<br>"DisabledByDefault"=dword:00000001<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.2]<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.2\Client]<br>"Enabled"=dword:ffffffff<br>"DisabledByDefault"=dword:00000000<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.2\Server]<br>"Enabled"=dword:ffffffff<br>"DisabledByDefault"=dword:00000000<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.3]<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.3\Client]<br>"Enabled"=dword:ffffffff<br>"DisabledByDefault"=dword:00000000<br><br>[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.3\Server]<br>"Enabled"=dword:ffffffff<br>"DisabledByDefault"=dword:00000000</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Result:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":10970,"width":"651px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/hard-ssl-tls.png?w=953" alt="" class="wp-image-10970" style="width:651px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":10980,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/slllabs.png?w=1024" alt="" class="wp-image-10980" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Written by theguler with love in Turkey 💖</p>
<!-- /wp:paragraph -->
