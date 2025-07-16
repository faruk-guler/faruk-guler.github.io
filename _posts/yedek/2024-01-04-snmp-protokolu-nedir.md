---
layout: post
title: SNMP Protokolü Nedir?
date: 2024-01-04 21:14
tag: [Monitoring]
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"lightbox":{"enabled":true},"id":10508,"width":"378px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/snmp.jpeg?w=568" alt="" class="wp-image-10508" style="width:378px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>SNMP (Simple Network Management Protocol), ağ cihazlarını izlemek, yönetmek ve konfigüre etmek için kullanılan bir ağ yönetim protokolüdür. SNMP, TCP/IP protokol ailesi içinde yer alan bir uygulama katmanı protokolüdür. Genellikle bilgisayar ağlarındaki cihazların durumunu izlemek ve yönetmek amacıyla kullanılır. SNMP Default olarak UDP 161 ve 162 portlarını kullanmaktadır.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>SNMP'nin temel bileşenleri:</strong></h2>
<!-- /wp:heading -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>Yönetici (Manager):</strong> SNMP yöneticisi, ağdaki cihazları izleyen ve yöneten bir yazılımdır. Bu yönetici, ağdaki cihazlardan veri toplar, olayları izler ve gerekirse cihazları yapılandırabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Ajan (Agent):</strong> SNMP ajanı, yöneticinin sorgularını yanıtlayan ve yöneticiye bilgi sağlayan cihaz veya uygulamalardır. Ajanlar, ağdaki cihazlara entegre edilen yazılım veya donanım modülleridir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Yönetim Bilgi Sistemi (MIB - Management Information Base):</strong> MIB, ağdaki cihazların durumu hakkında bilgi içeren bir veritabanıdır. MIB, bir ağdaki cihazların özelliklerini, durumlarını ve diğer önemli bilgileri tanımlayan bir hiyerarşik yapıya sahiptir. Her cihazın MIB'e bağlı olarak kendine özgü bir MIB yapısı bulunur.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>SNMP</strong> <strong>Versions</strong></h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>SNMPv1 :</strong> 1988 yılında ilk kez tanıtılan SNMPv1, temel ağ yönetimi ihtiyaçlarını karşılamak için oluşturuldu. Ancak, veri yapıları oldukça basitti ve güvenlik önlemleri sınırlıdır. Güvenlik, topluluk dizisi (community string) kullanılarak sağlanıyordu. SNMPv1, cihazların durumunu izlemek ve temel ağ yönetimi görevlerini gerçekleştirmek için kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>SNMPv2c :</strong> 1993'te geliştirilen SNMPv2c, SNMPv1'in özelliklerini genişletti. Daha gelişmiş veri yapılarına ve toplu veri işleme yeteneklerine sahiptir. Ancak, güvenlik konusunda eksiklikleri vardır. Topluluk dizisi yine temel kimlik doğrulama mekanizmasıdır. Hala yaygın olarak kullanılmaktadır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>SNMPv3 :</strong> 1998 yılında tanıtılan SNMPv3, önceki versiyonlardaki güvenlik eksikliklerini gidermeyi amaçladı. Kimlik doğrulama, şifreleme ve yetkilendirme gibi gelişmiş güvenlik özellikleri içerir. SNMPv3, daha güvenli ve karmaşık ağ yönetimi ortamlarında kullanılmak üzere tasarlandı. Bu versiyon, özellikle büyük ölçekli ağlarda ve endüstriyel sistemlerde yaygın olarak kullanılır.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>SNMP on Debian -OS</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>##SNMP Clients:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">##SNMP Clients:<br>#SNMP client install on Debian<br>sudo apt update<br>apt-get install snmp<br><br>#MIBs (Management Information Base) download-install<br>apt-get install snmp-mibs-downloader<br><br>#SNMP server running on localhost, you can test<br>snmpwalk -v1 -c public localhost<br><br>#Edit/Add conf. File: <br>sudo nano /etc/snmp/snmp.conf<br>mibs :<br><br>#Update the MIBS to latest versions<br>download-mibs</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>##SNMP Servers:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>##SNMP Servers:</strong><br><strong>#SNMP server install on Debian</strong><br>sudo apt update<br>apt-get install snmpd<br><br><strong>#Edit SNMP conf. file </strong><br>sudo nano /etc/snmp/snmpd.conf<br>rocommunity genel localhost<br><br><strong>#<strong>SNMP </strong>Service</strong><br>sudo systemctl restart snmpd<br>sudo systemctl status snmpd<br>sudo systemctl enable snmpd</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>##SNMPWALK Using - Test</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>##SNMPWALK Using - Test</strong><br><br><strong>#snmpwalk v1:</strong><br>snmpwalk -v1 -c public 10.7.60.65 1.3.6.1.2.1.1.5.0<br><br><strong>#snmpwalk v2:</strong><br>snmpwalk -v 2c -c public 10.7.60.65 1.3.6.1.2.1.1.5.0<br><br><strong>#snmpwalk v3:</strong><br>snmpwalk -v3 -l authPriv -u USER -a SHA -A “PASSWORD1” -x AES -X “PASSWORD1” 10.7.60.65:161</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Best Regards. – Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
