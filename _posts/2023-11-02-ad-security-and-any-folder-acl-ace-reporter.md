---
layout: post
title: Mass  AD Security and Any Folder [ACL-ACE] Reporter
date: 2023-11-02 23:07
author: theguler
comments: true
categories: [Pentest]
---
<!-- wp:image {"id":13050,"width":"565px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://faruk-guler.github.io/assets/post_images/acl_reporter.png?w=1024" alt="" class="wp-image-13050" style="width:565px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>ACL (Access Control List) Nedir?</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Güvenlik denetimleri, belirli kullanıcıların veya grupların bir kaynağa örneğin, <strong>(dosya, klasör, network cihazı, server vb.)</strong> erişim düzeyini kontrol etmek için kullanılır. Bu tür bir güvenlik denetimi, sistem yöneticilerinin ve organizasyonların verilere ve kaynaklara erişimi sınırlamak, izlemek ve güvence altına almak için kullanılan bir güvenlik yöntemidir. Gelin biraz inceleyelim.</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li><strong>Erişim İzinleri ve Kontrol</strong>: ACL'ler, kullanıcılara veya gruplara, belirli kaynaklara <strong>(dosyalar, klasörler, paylaşımlar, vb.)</strong> erişim düzeyini belirleme yetkisi verir. Örneğin, bir belgeye sadece belirli bir kullanıcının veya grup üyelerinin erişmesine izin verilebilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Gizlilik ve Güvenlik</strong>: Hassas verilere sahip organizasyonlar, bu verilere yetkisiz erişimi engellemek için ACL'leri kullanabilir. Bu, verilerin gizliliğini ve güvenliğini korur.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>İzleme ve Denetim</strong>: ACL'ler, kimin hangi kaynaklara erişebildiğini izlemek ve denetlemek için kullanılabilir. Erişim günlükleri, belirli kaynakların kullanımını izlemek için önemlidir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Paylaşılan Kaynaklar</strong> <strong>ve Klasörler: </strong>Paylaşılan dosyalar veya klasörler, işbirliği yapmak için farklı kullanıcılar veya gruplar arasında erişim düzenlemeleri yapılmasını gerektirebilir.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>ACL vs ACE</strong> </p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":9220,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://faruk-guler.github.io/assets/post_images/ace-acl.jpg?w=807" alt="" class="wp-image-9220" /></figure>
<!-- /wp:image -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>++ACL </strong>(Access Control List), bir bilgisayar sistemi veya ağdaki kaynaklara (dosyalar, klasörler, ağ kaynakları, vb.) erişimi kontrol etmek için kullanılan bir güvenlik mekanizmasıdır. ACL'ler, bu kaynaklara kimin erişebileceğini ve hangi işlemleri yapabileceğini belirleyen kurallar listesini içerir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>+ACE </strong>(Access Control Entry), bir ACL içindeki her bir erişim kontrol girişini ifade eder. ACE'ler, kaynağa erişim izinlerini veya kısıtlamaların belirlenmesidir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Örnek 1: Dosya Sistemi İçin ACL</strong>

Diyelim ki bir dosya sistemi üzerinde çalışıyorsunuz ve belirli bir dosyayı paylaşmanız gerekiyor. 
<strong>Bu dosya için bir ACL oluşturalım ve ACE'leri inceleyelim:</strong>

Dosya Adı: <strong>"gizli_dosya.txt"</strong>

ACL:

ACE 1: Kullanıcı <strong>"Ahmet" -&gt; Okuma İzni</strong>
ACE 2: Grup <strong>"Çalışanlar" -&gt; Okuma ve Yazma İzni</strong>
ACE 3: Kullanıcı <strong>"Mehmet" -&gt; Okuma ve Yazma İzni</strong>
Bu ACL, "gizli_dosya.txt" dosyasına erişim kontrolünü tanımlar. Ahmet sadece dosyayı okuyabilir, Çalışanlar grubundaki kullanıcılar okuyabilir ve yazabilir, Mehmet ise okuyabilir ve yazabilir.</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Örnek 2: Ağ Cihazı İçin ACL</strong>

Bir ağ yöneticisi olarak, ağ cihazınızda bir erişim denetimi listesi oluşturmanız gerekebilir:

ACL:

ACE 1: Kaynak IP: <strong>192.168.1.10, Hedef Port: 443 (HTTPS) -&gt; İzin Ver</strong>
ACE 2: Kaynak IP: <strong>192.168.1.20, Hedef Port: 22 (SSH) -&gt; İzin Ver</strong>
ACE 3: Kaynak IP: <strong>192.168.1.30, Hedef Port: 80 (HTTP) -&gt; Reddet</strong>
Bu ACL, ağ cihazınıza gelen trafiği kontrol eder. 192.168.1.10 IP'sinden gelen HTTPS trafiğine izin verilir, 192.168.1.20 IP'sinden gelen SSH trafiğine izin verilir ve 192.168.1.30 IP'sinden gelen HTTP trafiği reddedilir.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>🚩 🚩 Her iki örnek de ACL ve ACE kavramlarını gösterir. ACL, bir kaynağa (dosya, ağ cihazı vb.) erişimi kontrol etmek için kullanılırken, ACE 'ler, belirli kullanıcılar veya kaynaklar için izinlerin veya reddetmelerin ayrıntılarını içerir. ACL, bu ACE'leri bir araya getirir.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":333,"width":"423px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://faruk-guler.github.io/assets/post_images/powershell-4-sdn.jpg?w=1024" alt="" class="wp-image-333" style="width:423px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#AD Spesific OU ACL Reporter:
# | TheGuler0x |</strong>
<strong>
# Active Directory module import
Import-Module ActiveDirectory

# OU [DistinguishedName]
dsacls "OU=test,DC=guler,DC=com"</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Group/User ACL Report
dsacls "CN=HelpDesk,CN=users,DC=guler,DC=com"</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong># Object ACL Report
# [DistinguishedName]
dsacls "CN=DESKTOP-N035,OU=MUHASEBE,DC=GULER,DC=COM"</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong># Folder ACL Reporter Script 
# | TheGuler0x |
#####################
function Get-FolderAcl {
    param (
        [string]$FolderPath
    )

    # Ana klasörün ACL bilgilerini al
    $Acl = Get-Acl -Path $FolderPath

    Write-Host "ACL bilgileri: $FolderPath"
    Write-Host "-------------------------------------"

    # Ana klasörün ACL bilgilerini görüntüle
    $Acl.Access | ForEach-Object {
        $AccessRule = $_
        Write-Host "User/Group: $($AccessRule.IdentityReference)"
        Write-Host "Permissions: $($AccessRule.FileSystemRights)"
        Write-Host "Access Control Type: $($AccessRule.AccessControlType)"
        Write-Host "Is Inherited: $($AccessRule.IsInherited)"
        Write-Host "--------"
    }

    # Alt klasörlerin ACL bilgilerini al ve görüntüle
    Get-ChildItem -Path $FolderPath -Recurse -Directory | ForEach-Object {
        $Subfolder = $_.FullName
        $SubfolderAcl = Get-Acl -Path $Subfolder

        Write-Host "ACL bilgileri: $Subfolder"
        Write-Host "-------------------------------------"

        $SubfolderAcl.Access | ForEach-Object {
            $AccessRule = $_
            Write-Host "User/Group: $($AccessRule.IdentityReference)"
            Write-Host "Permissions: $($AccessRule.FileSystemRights)"
            Write-Host "Access Control Type: $($AccessRule.AccessControlType)"
            Write-Host "Is Inherited: $($AccessRule.IsInherited)"
            Write-Host "----------------------------"
        }
    }
}

# Directory
Get-FolderAcl -FolderPath "C:\Users\Administrator\Desktop\My_folder"</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>🚩 🚩 🚩 Active Directory <strong>[Inheritance-Miras] </strong>Organizasyon Birimleri (OU) bağlamında, izinlerin ve ayarların üst birimden alt birimlere ve bu birimlerdeki nesnelere nasıl aktarılmasıdır. Eğer alt OU ağacı altında bazı yetkiler eksik görünüyorsa Inheritance-Miras konrol edilmelidir.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">I recommend you to use the Professional Tools.....</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Link: <a href="https://github.com/faruk-guler/Microsoft-Active-Directory-Tools/blob/main/Mass-ACL-Reporter.ps1"><strong>https://github.com/faruk-guler/Microsoft-Active-Directory-Tools/blob/main/Mass-ACL-Reporter.ps1</strong></a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Öğrenmeye aç kalın - Be hungry to learn</strong></p>
<!-- /wp:paragraph -->
