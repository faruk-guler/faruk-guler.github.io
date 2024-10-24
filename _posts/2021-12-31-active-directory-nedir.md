---
layout: post
title: Active Directory Nedir ? - What is Active Directory?
date: 2021-12-31 10:28
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:image {"id":890,"width":"540px","height":"auto","aspectRatio":"2.047923322683706","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ads.jpeg?w=1024" alt="" class="wp-image-890" style="aspect-ratio:2.047923322683706;width:540px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Active Directory (AD) Microsoft tarafından geliştirilmiş bir dizin hizmetidir. Active Directory, ağdaki kaynakları yönetmek, kullanıcı hesaplarını ve bilgisayar hesaplarını barındırmak, bu hesaplar için kimlik doğrulama ve yetkilendirme sağlamak, ağdaki kaynaklara erişim izinlerini yönetmek için kullanılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Active Directory, ağda bulunan kaynakları merkezi bir şekilde yönetebilmemizi sağlar. Bu kaynaklar, kullanıcı hesapları, bilgisayar hesapları, yazıcılar, dosya sunucuları, veritabanları, e-posta sunucuları gibi birçok ağ kaynağıdır. Active Directory, tüm bu kaynakların merkezi bir yerden yönetilmesine olanak sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Active Directory, bir dizin hizmeti olarak çalışır. Bir dizin hizmeti, ağdaki kaynakların bir hiyerarşi içinde organize edilmesine olanak sağlayan bir veritabanıdır. Active Directory'de, her bir kaynak bir nesne olarak temsil edilir ve bu nesneler birbirleriyle ilişkilendirilebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Active Directory, ayrıca kullanıcıların ve bilgisayarların kimlik doğrulamasını ve yetkilendirmesini de yönetir. Kullanıcılar ve bilgisayarlar, Active Directory'de bir hesap oluşturulduktan sonra, kaynaklara erişim izni verilir ve bu hesaplar üzerinden kimlik doğrulama sağlanır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Active Directory, bir Windows Domain Controller üzerinde çalışır ve genellikle bir Windows domain ortamında kullanılır. Active Directory, Windows Server işletim sistemlerinin Enterprise ve Datacenter sürümlerinde bulunur ve bu sürümler, Active Directory kurulumuna olanak sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Kısacası, Active Directory, bir ağda bulunan kaynakların merkezi bir şekilde yönetilmesini sağlayan bir dizin hizmetidir.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Active Directory envanterinde neler bulunur?</strong></h2>
<!-- /wp:heading -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Kullanıcı Hesapları</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Gruplar</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Bilgisayar Hesapları</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Organizasyon Birimleri (OU'lar)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Paylaşılan Klasörler</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>DNS (Alan Adı Sistemi) Kayıtları</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Grup İlkesi Nesneleri (GPO'lar)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Sertifikalar ve Sertifika Yetkilileri</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Kullanıcı Profil Bilgileri</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>İzinler ve Erişim Kontrolleri</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Günlük Kayıtları (Loglar)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Replication (Çoğaltma) Topolojileri</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>..........vb</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Active Directory mantıksal yapısı nasıldır?</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Active Directory mantıksal olarak bir ağdaki kaynakların yönetimini sağlamak için tasarlanmış bir dizin hizmetidir. Active Directory, mantıksal olarak ağdaki nesneleri (örneğin, kullanıcılar, gruplar, bilgisayarlar, yazıcılar ve diğer ağ kaynakları) ve bu nesneler arasındaki ilişkileri hiyerarşik olarak organize eder.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Active Directory, nesnelerin ve ilişkilerin özelliklerinin tanımlandığı bir veritabanıdır. Bu veritabanı, <strong>"schema"</strong> olarak adlandırılan önceden tanımlanmış bir şablonu takip eder ve yeni nesnelerin ve ilişkilerin eklenmesine izin verir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Active Directory, nesnelerin hiyerarşik bir yapıda örgütlendiği bir "domain" modeli kullanır. Her domain, tek bir kuruluşu veya işletmeyi temsil eder ve kendi güvenlik politikalarına sahip olabilir. Domain'ler bir araya gelerek bir "forest" oluşturur ve forest'lar arasında güvenlik ve kaynak paylaşımı gibi işlemler gerçekleştirilebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Active Directory'nin mantıksal yapısı, bir dizi önceden tanımlanmış işlevsel rolü olan FSMO (Flexible Single Master Operations) rollerini de içerir. Bu roller, Active Directory veritabanının güncel kalmasını sağlar ve domainler ve forest'lar arasında çeşitli işlevleri yönetir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sonuç olarak, Active Directory'nin mantıksal yapısı, ağdaki kaynakların hiyerarşik olarak organize edilmesini ve yönetilmesini sağlayan bir veritabanı, domain ve forest yapısı ve FSMO rolleri gibi bir dizi işlevsel rol içerir.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Active Directory fiziksel yapısı nasıldır?</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Active Directory fiziksel olarak bir veya birden fazla sunucuda bulunur. Bu sunucular, Active Directory veritabanını barındıran ve Active Directory hizmetlerini sağlayan Domain Controller (DC) olarak adlandırılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>DC'ler, fiziksel olarak bulundukları yer ve network segmentlerine göre organize edilirler. Bu organizasyon bir Active Directory sites yapısı oluşturur. Active Directory sites, ağ trafiğini yönetmek ve optimize etmek için kullanılır. Site'lar, DC'ler arasındaki replikasyon trafiğini ve istemci trafiğini yönetir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>DC'ler arasındaki Active Directory bilgilerinin senkronizasyonu, Active Directory replikasyonu denilen bir işlemle gerçekleştirilir. Replikasyon, DC'ler arasındaki değişikliklerin dağıtımını sağlayarak, veri bütünlüğünü korur ve her DC'nin aynı verileri içermesini sağlar. Replikasyon trafikleri, Active Directory Sites and Services yönetim aracı kullanılarak kontrol edilebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sonuç olarak, Active Directory fiziksel olarak sunucular üzerinde barındırılan bir veritabanıdır ve bir veya birden fazla sunucuda bulunur. Bu sunucular, DC olarak adlandırılır ve Active Directory sites yapısı ile organize edilirler. Replikasyon işlemi sayesinde DC'ler arasındaki veri bütünlüğü ve senkronizasyon sağlanır.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>AD DS kurulumu sonrasında hangi araçlar yüklenmektedir?</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Windows Server üzerinde standart bir Active Directory Domain Services (AD DS) kurulumu sırasında, yönetim araçları otomatik olarak yüklenir. Bu yönetim araçları şunları içerir:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>Active Directory Administrative Center (ADAC)</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Active Directory Domains and Trusts</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Active Directory Module for Windows PowerShell</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Active Directory Sites and Services</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Active Directory Users and Computers</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>ADSI Edit</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>DFS Management</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>DNS Manager</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Group Policy Management</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Server Manager (with AD DS role tools)</strong></li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Bu araçlar, Active Directory ortamını yönetmek için kullanılır. Active Directory Kullanıcıları ve Bilgisayarları, kullanıcı hesapları, gruplar ve bilgisayar hesapları gibi nesnelerin oluşturulması ve yönetilmesine olanak tanır. Active Directory Siteleri ve Hizmetleri, Active Directory yapılandırmasını site, site bağlantıları ve alt siteler gibi kavramlarla yönetmeyi sağlar. Active Directory Etki Alanı ve Güvenlik Politikaları, etki alanı güvenlik ayarlarının yapılandırılmasını sağlar. Active Directory Yönetim Merkezi, tüm yönetim araçlarını tek bir yerde birleştirir ve genel bir yönetim arayüzü sağlar. DNS Yöneticisi, Active Directory bölgesinin DNS ayarlarını yönetmeyi sağlar. Grup İlkesi Yöneticisi, Grup İlkesi nesnelerinin oluşturulması, düzenlenmesi ve uygulanmasına olanak tanır. AD PowerShell modülleri, PowerShell komut satırı aracılığıyla Active Directory yönetimini sağlar.</p>
<!-- /wp:paragraph -->
