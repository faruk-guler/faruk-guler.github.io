---
layout: post
title: AD KRBTGT Account Password Reset
date: 2023-10-29 17:26
author: theguler
comments: true
categories: [Health Check]
---
<!-- wp:image {"id":9086,"width":"767px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/krbtgt.png?w=1024" alt="" class="wp-image-9086" style="width:767px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>KRBTGT Hesabı Nedir?</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>KRBTGT (Kerberos Ticket Granting Ticket)</strong> hesabı, Active Directory (AD) içinde bulunan ve Kerberos kimlik doğrulama protokolünün temel bir bileşeni olan özel bir hesaptır. Bu hesap, bilgisayar ağlarında güvenli kimlik doğrulama işlemlerini desteklemek için kullanılır. </p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>KRBTGT hesabı, Active Directory (AD) içinde bulunan özel bir hesaptır. Bu hesap, Kerberos kimlik doğrulama protokolünün çalışmasında merkezi bir rol oynar.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>KRBTGT hesabı, Ticket Granting Ticket (TGT) bileti üretir ve doğrular. Kullanıcılar bu bileti alarak AD içinde güvenli kimlik doğrulama yapabilirler.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>TGT bileti, kullanıcının kimliğini doğrulamak için kullanılır. Kullanıcılar TGT bileti ile diğer hizmetlere erişim sağlayabilirler.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>KRBTGT hesabı, bu bileti oluşturmak ve doğrulamak için kullanılan anahtarları ve şifrelemeyi yönetir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>KRBTGT Parolasını Neden Değiştirmelisiniz?</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Çoğu büyük kuruluş Kerberos şifrelerini düzenli olarak değiştirir.&nbsp;Ancak küçük ve orta ölçekli işletmeler, etki alanı altyapılarını uygulamaya koyduklarından beri bunları değiştirmemiş olabilir.&nbsp;Bir saldırgan bir ağa girdiğinde <strong>"golden ticket"</strong> saldırı dizisini kullanabilir.&nbsp;Active Directory (AD), Kerberos biletleri için AD etki alanındaki KRBTGT'yi kullanır.&nbsp;KRBTGT hesabının şifre karması çalınırsa veya bir saldırıyla kırılırsa, saldırganlar gerekli kimlik doğrulamayla kendilerine ağınıza tam erişim izni verebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu sebeple KRBTGT hesabı parolasının değiştirilmesi önerilmektedir. <strong>***Microsoft tarafından önerilen 6/ay da bir (180 gün/1)</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>***KRBTGT hesabı, Key Distribution Center(KDC) hizmeti için hizmet hesabı görevi gören yerel bir varsayılan hesaptır. Bu hesap silinemez ve hesap adı değiştirilemez.&nbsp;KRBTGT hesabı Active Directory üzerinde etkinleştirilemez.</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>***KRBTGT</strong> hesabının şifre geçmişi değeri 2'dir, yani en yeni 2 şifreyi içerir.&nbsp;Parolayı iki kez sıfırlayarak geçmişteki tüm eski parolaları etkili bir şekilde temizlersiniz; böylece başka bir DC'nin eski bir parola kullanarak bu DC ile çoğaltma yapması mümkün olmaz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>***Şifre geçmişini etkili bir şekilde kaldırmak için şifrenin iki kez değiştirilmesi gerekir.&nbsp;</strong>Bir kez değiştirmek, çoğaltmanın tamamlanmasını beklemek ve tekrar değiştirmek sorun riskini azaltır.&nbsp;Ancak Hızlı bir şekilde art arda iki kez değişiklik yapmak, istemcileri yeniden kimlik doğrulamaya zorlar<strong> (uygulama hizmetleri dahil)</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>***Önemli:&nbsp;Birçok çevresel nedenden dolayı işler ters gidebileceği için PowerShell betiğini (Windows Task Scheduler) olarak planlamanızı önermiyoruz.</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":9140,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/resetpass_krbtgt-1.png?w=1024" alt="" class="wp-image-9140" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>***Manuel parola değişiminde,</strong> belirttiğiniz parola önemli değildir çünkü sistem, belirttiğiniz paroladan bağımsız olarak otomatik olarak güçlü bir parola oluşturacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Kerberos Kimlik Doğrulama Protokolü</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Kerberos, bilgisayar ağlarında güvenli kimlik doğrulama sağlayan bir protokoldür. Kullanıcıların, kaynaklara erişmek için kimliklerini güvenli bir şekilde doğrulamalarını sağlar. Kerberos, kullanıcıların kimliklerini doğrulamak için şifreler ve biletler kullanır. Bu protokol, bilgisayar ağlarının güvenliğini artırmak ve yetkilendirme işlemlerini sağlamak için yaygın olarak kullanılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>KRBTGT Hesap Parolası Sıfırlama PowerShell Betiği</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Link:</strong> <a href="https://github.com/zjorz/Public-AD-Scripts/tree/master" target="_blank" rel="noreferrer noopener">https://github.com/zjorz/Public-AD-Scripts/tree/master</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>#Written by: Jorge de Almeida Pinto - zjorz [MVP]</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Not:</strong>&nbsp;Sürüm v1, <strong>Jared Poeppelman (Microsoft)</strong> tarafından yazılmıştır.
<strong>Not: </strong>Bundan sonra <strong>Jorge de Almeida Pintore(zjorz)</strong> senaryoyu yeniden yazdı, tonlarca özellik ekledi ve 2. versiyon böylece doğmuş oldu.
<strong>Not:</strong> Resmi komut dosyası adı <strong>Reset-KrbTgt-Password-For-RWDCs-And-RODCs.ps1</strong>
<strong>**Not:</strong> Versiyon 2'yi kullanmanızı öneririm.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Bu Scriptin Aşamaları:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>KRBTGT Hesabı Şifresini Sıfırlama</strong>: İlk adımda, script KRBTGT hesabının şifresini sıfırlar ve yeni bir parola karma değeri oluşturur. Bu, güvenlik açısından kritik bir işlemdir, çünkü KRBTGT hesabının şifresi <strong>180 </strong>günde bir değiştirilmesi önerilmektedir. (</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>KRBTGT Hesabını Çoğaltma</strong>: Sıfırlanan KRBTGT hesabı ve ilgili anahtarlar, hemen tüm etki alanı denetleyicilerine (Domain Controller) çoğaltılır. Bu, değişikliklerin etki alanı genelinde tutarlı bir şekilde uygulanmasını sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Doğrulama İşlemi</strong>: Script, tüm etki alanı denetleyicilerine yeni anahtarların başarıyla çoğaltıldığını doğrular. Bu doğrulama, değişikliklerin her bir DC tarafından başarıyla kabul edildiğini ve etki alanının tutarlı bir şekilde güncellendiğini doğrular.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Bu script, KRBTGT hesabının şifresini düzenli aralıklarla sıfırlayarak Active Directory güvenliğini artırmak için kullanışlıdır. KRBTGT hesabının şifresinin düzenli olarak değiştirilmesi, potansiyel güvenlik tehditlerine karşı bir önlem sağlar ve kötü amaçlı kullanımların önlenmesine yardımcı olur.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Son olarak
#Hesabın son şifre değiştirme tarihini göster.</strong>
Get-aduser krbtgt -properties passwordlastset

<strong>#KRBTGT şifre çoğaltmasını tüm domainde dogrula:</strong>
repadmin.exe /showattr *.guler.com "cn=krbtgt,cn=users,dc=guler,dc=com" /atts:pwdLastSet</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Random PASS Generator PS ISE:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Random PASS Generator PS ISE | TheGuler0x |
#33: "!" (unlem isareti)
#48-57: "0" ile "9" arası rakamlar
#65-90: "A" ile "Z" arası buyuk harf karakter
#97-122: "a" ile "z" arası kucuk harf karakter
#126: "~" (tilde)</strong>

$Length = 20 # Parola uzunlugu
$RandomPassword = -join (33..126 | Get-Random -Count $Length | ForEach-Object {[char]$_})
$RandomPassword</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Umarım yararlı olmuştur. – I hope it was useful.</strong></p>
<!-- /wp:paragraph -->
