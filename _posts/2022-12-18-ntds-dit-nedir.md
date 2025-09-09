---
layout: post
title: Active Directory Veri tabanı Dosyası "NTDS.DIT" Nedir?
date: 2022-12-18 16:01
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:image {"id":5832,"width":608,"height":458,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ntds.dit_.png?w=624" alt="" class="wp-image-5832" width="608" height="458" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Active Directory verileri, veritabanı dosyası olarak bilinen NTDS.DIT dosyasında saklanır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>NTDS.DIT (NT Directory Service Database Information Tree) dosyası, Active Directory veritabanı dosyasıdır ve tüm Active Directory nesnelerinin ve ilişkilerinin bilgisini içerir. Bu dosya, etki alanı denetleyicilerinde (domain controller) bulunur ve Active Directory verilerinin depolandığı yegane yerdir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>NTDS.DIT dosyası, Active Directory'nin tüm verilerini saklar. Bu veriler, kullanıcı hesapları, gruplar, bilgisayar nesneleri, etki alanları, politikalar ve diğer birçok nesneyi içerir. NTDS.DIT dosyası aynı zamanda Active Directory yedeklemelerinin de alındığı dosyadır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Gerçek veri tabanı dosyası olan Active Directory veri deposu <strong>%SystemRoot%\ntds\NTDS.DIT</strong> ​​şeklindedir. Ntds.dit dosyası, kullanıcılar, objelerde dahil olmak üzere <strong>Active Directory' nin kalbidir.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Active Directory Veri tabanı NTDS.DIT ​​mantıksal olarak beş farklı bölümde incelenir</strong>, Bu alanların tümüne "ADSIEDIT" üzerinden alanından erişebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Domain Partitions</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Schema Partition</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Configuration Partition</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Global Catalog Partition</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Application Partition</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>Domain Directory Partitions:&nbsp;</strong>Domain içinde bulunan kullanıcılar, gruplar, bilgisayarlar ve diğer nesnelerin tutulduğu veritabanı bölümüdür.Bu alanda bulunan her şey domain içerisindeki domain controller bilgisayarlarına replikasyon yöntemi ile çoğalır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Schema Directory Partition:&nbsp;</strong>AD forest yapısı içerisindeki tüm nesnelere alt sınıflandırma ve özellik bilgilerini tutan şema(Shema) kataloğunu içermektedir. Bu bölüm AD forest yapısı içerisindeki tüm domain controller bilgisayarlarına güncellenir. Shema tüm forest kapsamın tek ve ortaktır. Forest içindeki tüm domain’ler aynı şema yapısını kullanırız.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Configuration Directory Partition:&nbsp;</strong>Forest içerisindeki konfigürasyon nesnelerini içeririr. Bunlar; siteler, domain controller sunucular, servisler ve dizin böülmleridir. Bu bölümde AD Forest yapısı içerisindeki tüm domain controller bilgisayarına güncellenir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Global Catalog Directory Parttition:</strong>&nbsp;AD forest içerisindeki bulunan tüm domain’lere ait kısmi bazı bilgileri içeren se sadece okunabilir olan bölümdür. Active directory forest yapısı içerisinde Global Catalog rolüne sahip tüm domain controller sunuculara güncellenir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Appication Directory Partition:</strong>&nbsp;AD veritabanı içerisindeki DNS vb. uygulamalar tarafından kullanılan ve o uygulamaya ait bilgilerin tutulduğu bölümdür. Özellikle active directory integrated zone yapısında çalışan DNS sunuculara ait bilgiler bu bölüm içerisinde saklanır. Bu bölüm içerisindeki bilgiler örneğin DNS için; o domain içerisinde ya da forest içerisinde bulunan tüm DNS sunuculara Active Directory replikasyonu üzerinden çoğaltırlar.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->
