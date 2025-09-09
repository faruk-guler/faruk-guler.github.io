---
layout: post
title: Microsoft Local Administrator Password Solution (LAPS) Detaylı
date: 2023-07-26 23:57
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":7909,"width":"458px","height":"auto","aspectRatio":"2.083682008368201","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/laps-logo.png?w=832" alt="" class="wp-image-7909" style="aspect-ratio:2.083682008368201;width:458px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Local Administrator Password Solution (LAPS) Nedir?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>LAPS </strong>(Local Administrator Password Solution), Microsoft tarafından geliştirilen ve kurumların yerel yönetici hesaplarının parola güvenliğini artırmayı amaçlayan bir çözümdür. Bu çözüm, bilgisayarların yerel Administrator hesaplarının parolalarını belirli algoritmalar kullanarak rastgele bir şekilde oluşturur ve bu parolaları Active Directory içerisinde bulunan bilgisayar hesaplarının özelliklerine saklar. Bu sayede tüm bilgisayarların aynı parolayı kullanmaması ve parolaların düzenli olarak değiştirilmesi sağlanarak güvenlik riskleri büyük ölçüde azaltılır.  <strong>***LAPS'ı kullanmak için bir ücret ödemenize gerekmez</strong></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>LAPS'ın Çalışma Mekanizması:</strong></h2>
<!-- /wp:heading -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li><strong>Kurulum:</strong> LAPS, Active Directory ortamına özel bir Group Policy (Grup İlkesi) eklentisi olarak kurulur. Bu işlem, LAPS'ın Active Directory'de yeni bir özellik eklemesini sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Active Directory "Şema" Genişletilmesi: </strong>LAPS şemasının halihazırda şu özniteliklerle başarılı bir şekilde genişletilmesi gerekir.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>msLAPS-PasswordExpirationTime</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>msLAPS-Password</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>msLAPS-EncryptedPassword</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>msLAPS-EncryptedPasswordHistory</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>msLAPS-EncryptedDSRMPassword</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>msLAPS-EncryptedDSRMPasswordHistory</strong></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>3. <strong>Erişim Kontrolü ve Gerekli izinler: </strong>LAPS, yalnızca yetkili kişilerin yerel yönetici parolalarını görüntülemesine ve kullanmasına izin verir. Bu yetkililer genellikle Active Directory üzerinde belirli izinlere sahip sistem yöneticileridir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>4. <strong>Group Policy&nbsp;Yönetimi: </strong>LAPS, yerel yönetici parolalarını güncellemek ve saklamak için bir dizi özelleştirilebilir Grup İlkesi sunar. Bu sayede organizasyon, belirli gereksinimlere uygun şekilde LAPS'ı yapılandırabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>5. <strong>İstemci Bilgisayarların Gerekli Kurulum ve Yapılandırılmaları:</strong> LAPS'ı kullanarak yerel Administrator kullanıcısının parolasını yönetmek için, ilgili bilgisayarlara uygun LAPS istemci yazılımının kurulması gerekmektedir. Bu istemci yazılımı, parola değişiklikleri ve yönetimini otomatik olarak gerçekleştirir ve değiştirilen parolaları AD üzerinde bulunan bilgisayar nesnesine yazar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>6. <strong>Parolanın görülmesi ve Değiştirilme Tarihinin Belirlenmesi:</strong> Bu aşamada <strong>LAPS</strong>'ı başarıyla yapılandırdıktan sonra yerel Administrator kullanıcısının parolasını görüntülemek ve değiştirme tarihini ayarlamak için farklı yöntemler kullanılacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>LAPS Bileşenleri Nelerdir?</strong></h2>
<!-- /wp:heading -->

<!-- wp:image {"id":7946,"width":"619px","height":"274px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/laps-3-1.png?w=621" alt="" class="wp-image-7946" style="width:619px;height:274px" /></figure>
<!-- /wp:image -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li><strong>AdmPwd GPO Extension: </strong>LAPS'ın etkin olması için gereken ana bileşendir. Bu GPO uzantısı, yerel Administrator parolasını yönetmek için gerekli ayarları sağlar ve parolayı düzenli olarak yeniler. Bu sayede bilgisayarların yerel yönetici hesaplarının zayıf veya statik parolalardan kaynaklanan güvenlik açıklarını azaltır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Fat Client UI: </strong>Bu bileşen, LAPS ile yönetilen bilgisayarların parolalarını okumak ve parolanın ne zaman yenileneceğini belirlemek için kullanılan bir arayüzdür. Parola okuma ve tarih belirleme işlemleri için bu bileşene yetki verilmesi gerekir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Powershell Module:</strong> LAPS ile ilgili tüm ayarları yapmak ve parola okuma ve sıfırlama gibi yönetim işlemlerini gerçekleştirmek için kullanılan Powershell komutlarını içerir. Bu modül, LAPS ile ilişkili tüm işlemleri kolayca gerçekleştirmeyi sağlar. Bu modülü çalıştırmak için gerekli yetkilendirmelerin Active Directory (AD) üzerinde yapılmış olması gerekir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>GPO Editor Templates: </strong>Bilgisayarların parola politikalarını merkezi olarak yönetmek için Group Policy (Grup İlkesi) kullanılır. LAPS ayarları da GPO Editor Templates içinde bulunur ve LAPS'ın etkinleştirilmesi ve yapılandırılması için kullanılır.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>LAPS Kurulum Adımları:</strong> LAPS'ı <strong>Y</strong>önetim makineniz/AD yükleyin</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><em><strong>LAPS için gerekli link:</strong></em></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://www.microsoft.com/en-us/download/details.aspx?id=46899"><strong>https://www.microsoft.com/en-us/download/details.aspx?id=46899</strong></a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Version: Version: 6.2.0.0</strong></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Kurulum:</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Linkten dosyalar indirilip&nbsp;gerekli olan <strong><em>LAPS.x64.msi</em>&nbsp;</strong>dosyası çalıştırılarak <strong>Yönetim makineniz/AD ortamında </strong>kurulum işlemi başlatılacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7935,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/laps-1.png?w=1024" alt="" class="wp-image-7935" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":7937,"width":"502px","height":"309px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/laps-2.png?w=833" alt="" class="wp-image-7937" style="width:502px;height:309px" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":7939,"width":"480px","height":"285px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/laps-3.png?w=816" alt="" class="wp-image-7939" style="width:480px;height:285px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>***Custom Setup&nbsp;bölümünde sadece Management Tools&nbsp;ve altındaki bileşenler seçilmelidir.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7941,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/laps-4.png?w=874" alt="" class="wp-image-7941" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Kurulum tamamladıktan sonra <strong>Yönetim makineniz/AD</strong> <strong>"<em>C:\Program Files\LAPS</em>"</strong>&nbsp;klasörünün içeriğine erişebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Active Directory "Şema" Genişletilmesi: </strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>LAPS (Local Administrator Password Solution) kullanabilmek için, Active Directory şemasının genişletilmesi gerekmektedir. Bu işlem bir defaya mahsustur.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>NOT: ****Bu işlemi gerçekleştirmeden önce, AD şemanızın yedeğini almanızı şiddetle öneririm.</strong><br><br><strong>#AdmPwd.PS modülünü içe aktar:</strong><br>Import-Module AdmPwd.PS<br><br><strong>#LAPS modülünün yüklendiğini doğrulamak için:<br></strong>Get-Module -Name AdmPwd.PS -ListAvailable<br><br><strong>#Şemayı genişletmek için:</strong><br>Update-AdmPwdADSchema<br><br><strong>#Şema genişletme işlemi LAPS ile ilişkilendirilmiş yeni özellikleri Active Directory şemasına ekler.</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Yönetim makineniz-AD'deki hakların kaldırılması:</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Bu adım, kullanıcıların AD'de parolaları görüntülemesine izin veren genişletilmiş hakları kaldırmak için gereklidir. Bunu yaptıktan sonra, bunu yapabilmesi gereken belirli kullanıcılara parolayı görüntülemek ve değiştirmek için gereken belirli izinleri vereceğiz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>***</strong>Kaldırmak istediğimiz izne "<strong>Tüm Genişletilmiş Haklar</strong>" denir.&nbsp;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu, kullanıcıların&nbsp;<strong><em>ms-Mcs-AdmPwd</em>&nbsp;</strong>özniteliğini okumasına olanak tanır ve tüm kullanıcıların bu haklara sahip olması gerekmez. Active Directory'ye giderek, bilgisayarlarınızın bulunduğu OU'ya sağ tıklayıp&nbsp;<strong>Özellikler'i</strong>&nbsp;seçerek izinleri bulabilirsiniz. <strong>Security &gt; Advanced</strong>'e gidin, değiştirmek istediğiniz Kullanıcıları veya Grubu seçin ve <strong>Edit </strong>tıklayın.<br>"<strong>All Extended Rights</strong>"ın işaretini kaldırın.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":13253,"width":"422px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ad_remove_permissions.webp?w=437" alt="" class="wp-image-13253" style="width:422px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Devam ederek bunu değiştirilmesi gereken tüm Kullanıcılar ve Gruplar için yapın. Bazı durumlarda, izinler devralınır ve dizininizin daha yüksek bir düzeyinde değiştirilmesi gerekir.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Erişim Kontrolü ve Gerekli izinler:</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Active Directory'de LAPS özelliklerini kullanabilmek için gerekli <strong>"Grup ve OU" </strong>yetkilendirme işlemleri belirtilen <strong>Manuel veya Powershell</strong> komutları ile yapılabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7977,"width":"526px","height":"293px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/helpdesk.png?w=918" alt="" class="wp-image-7977" style="width:526px;height:293px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>#Parolaları Görüntüleme Yetkisi İçin</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#"<strong>MUHASEBE</strong>" OU'su içindeki bilgisayarlar için,<strong> </strong>"<strong>HelpDesk</strong>" grubuna, LAPS parolalarını görüntüleme izni ver.<br><strong>Set-AdmPwdReadPasswordPermission -OrgUnit "MUHASEBE" -AllowedPrincipals "HelpDesk"</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#Parolaları Değiştirme Yetkisi İçin:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7982,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/delegated.png?w=1024" alt="" class="wp-image-7982" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#"<strong>MUHASEBE</strong>" OU'su içindeki bilgisayarlar için, "<strong>HelpDesk</strong>" grubuna, LAPS parolalarını değiştirme izni ver.<br><strong>Set-AdmPwdResetPasswordPermission -OrgUnit "<strong>MUHASEBE</strong>" -AllowedPrincipals "<strong>HelpDesk</strong>"</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#Computer Write Access için:</strong> Bilgisayarların parolalarını Active Directory'e yazmasına izin verin</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Set-AdmPwdComputerSelfPermission -OrgUnit "MUHASEBE"</strong><br><br><strong>#</strong>LAPS'ı kullanabilmek için bilgisayar hesaplarının kendi parolalarını Active Directory'e yazma yetkisi<strong>(write access)</strong> vermeniz gerekir.<br><strong>#</strong>Eğer birden fazla <strong>OU </strong>içinde LAPS'ı etkinleştirmek istiyorsanız, bu komutu her bir OU için ayrı ayrı çalıştırmanız gerekecektir.<br><strong>#</strong>Önemli bir nokta, bu komutun verilen OU'daki tüm alt <strong>OU'lar</strong> için otomatik olarak yetkilendirmeyi miras bırakmasıdır. Yani, alt OU'lar için ayrı bir işlem yapmanıza gerekmez.</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Parolaları okuma/yazma yetkisine sahip user ve groupları göster:</strong><br>Find-AdmPwdExtendedRights -Identity MUHASEBE | Out-GridView</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#<strong>LAPS Toolkit<br>####################################################################</strong><br><br><strong># Get groups that can read passwords</strong><br>Find-LAPSDelegatedGroups<br><br>OrgUnit                                           Delegated Groups<br>-------                                           ----------------<br>OU=Servers,DC=DOMAIN_NAME,DC=LOCAL                DOMAIN_NAME\Domain Admins<br>OU=Workstations,DC=DOMAIN_NAME,DC=LOCAL           DOMAIN_NAME\LAPS Admin<br><br><strong># Checks the rights on each computer with LAPS enabled for any groups<br># with read access and users with "All Extended Rights"</strong><br>Find-AdmPwdExtendedRights<br>ComputerName                Identity                    Reason<br>------------                --------                    ------<br>MSQL01.DOMAIN_NAME.LOCAL    DOMAIN_NAME\Domain Admins   Delegated<br>MSQL01.DOMAIN_NAME.LOCAL    DOMAIN_NAME\LAPS Admins     Delegated<br><br><strong># Get computers with LAPS enabled, expirations time and the password (if you have access)</strong><br>Get-LAPSComputers<br>ComputerName                Password       Expiration<br>------------                --------       ----------<br>DC01.DOMAIN_NAME.LOCAL      +%4(d45-H7= 12/10/2022 13:24:41</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Group Policy&nbsp;Yönetimi: </strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Bilgisayarların yerel Administrator kullanıcısı için parola politikalarını merkezi olarak Group Policy ile düzenlemek için aşağıdaki adımları takip edebilirsiniz:</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7955,"width":"689px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/laps-gpo.png?w=1024" alt="" class="wp-image-7955" style="width:689px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>***Computer Configuration" &gt; "Policies" &gt; "Administrative Templates" altında "LAPS" alanına gidin.</strong> <strong>"GPO NAME:LAPS"</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>***LAPS ile uygulanabilecek dört adet kural bulunur.</strong> <strong>2 tanesi zorunludur.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Password Settings (Zorunlu): </strong>Bu kural, LAPS ile yönetilecek yerel yönetici hesaplarının parola ayarlarını tanımlar. Bu ayarlar, otomatik olarak güçlü rastgele parolaların oluşturulmasını ve uygulanmasını içerir. Böylece her yönetilen bilgisayarın yerel yönetici hesabının güvenliği artırılır.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Enable local admin password management (Zorunlu): </strong>LAPS'ın etkinleştirilmesini sağlayan zorunlu bir kuraldır. Bu kuralın etkinleştirilmesi, LAPS'ın yerel yönetici hesaplarının parolalarını yönetme yeteneğini devreye sokar.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Name of the administrator account to manage (Spesifk):</strong> Bu tercihe bağlı kural, LAPS'ın yöneteceği özel bir yönetici hesabı adını belirtir. Eğer belirli bir yönetici hesabı adı belirtilmezse, LAPS varsayılan olarak <strong>"Administrator"</strong> adlı yerel yönetici hesabını yönetir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Do not allow password expiration time longer than required by policy (Spesifk):</strong> Bu tercihe bağlı kural, belirli bir parola süresi politikasına uymayan uzun süreli parolaların kullanılmasını engeller. Böylece parola süresi politikasına uygun olarak düzenli parola değişiklikleri teşvik edilir ve güvenlik sağlanmış olur.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image {"id":7959,"width":"653px","height":"282px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/gpo-details.png?w=1024" alt="" class="wp-image-7959" style="width:653px;height:282px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>***</strong>Görüldüğü üzere: <strong>parola karmaşıklığı,</strong> <strong>parola uzunluğu </strong>ve <strong>parola geçerlilik süresini </strong>belirledim. <strong>büyük harf, küçük harf ve rakam</strong> içerecek, <strong>8 </strong>karakterden oluşacak ve her <strong>30 </strong>günde bir değiştirilecek şekilde ayarladım.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7962,"width":"767px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/enabled-labs.png?w=1024" alt="" class="wp-image-7962" style="width:767px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Local Administrator hesabının gerekli ise GPO ile aktif hale getirilmesi:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Birçok organizasyon, güvenlik nedenleriyle yerel Yönetici Hesaplarını devre dışı bırakma eğilimindedir ve bunun yerine yönetilen bir hesap veya başka bir kimlik doğrulama yöntemi kullanmayı tercih eder. Ancak bazı durumlarda, yerel Yönetici Hesaplarının etkin olması gerekebilir. LAPS uygulamasında özel bir <strong>"yerel admin"</strong> hesabı kullanmadığınız sürece <strong>(Administrator)</strong> hesabının aktif olması gereklidir.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":8567,"width":"860px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/local_admin_enabled.png?w=1024" alt="" class="wp-image-8567" style="width:860px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>İstemci Bilgisayarların Gerekli Kurulum ve Yapılandırılmaları:</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>LAPS'ı bilgisayarlarınıza dağıtın:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Şimdi yönetmek istediğiniz cihazlara LAPS istemcisini yüklemeniz gerekiyor. Bir MSI olduğu için bunu yapmanın birden çok yolu vardır. Kullanabileceğiniz seçeneklere bağlı olarak&nbsp;<strong>MECM</strong>&nbsp;veya benzeri bir platform kullanmanızı tavsiye ederim.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>GPO</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>MECM (Microsoft Endpoint Configuration Manager)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Oturum Açma Komut Dosyası</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Manuel</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Yükleme string:</strong><br>msiexec /i "LAPS.x64.msi" /q<br><br><strong>#Kaldırma string:</strong><br>Msiexec /x {EA8CB806-C109-4700-96B4-F1F268E5036C} /passive</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Hangi yöntemin kullanılacağı, organizasyonun büyüklüğüne ve yapılandırma yönetimi tercihlerine bağlı olarak değişebilir. Her durumda, LAPS'ın istemci yazılımının doğru mimari (32 bit veya 64 bit) için uygun olanı seçilerek kurulması önemlidir.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7966,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/laps-client.png?w=757" alt="" class="wp-image-7966" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Manuel kurulumda Custom Setup&nbsp;bölümünde sadece&nbsp;<strong>"AdmPwd GPO Extension"&nbsp;</strong>bileşenini seçilmelidir, Diğerlerini kurmayabilirsiniz. <strong>***GPO yada MECM üzerinden yapılan dağıtımlarda tamamı kurulacaktır.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Kurulum sonu Client <strong>"C:\Program Files\LAPS\CSE"&nbsp;</strong>dizini içeriği aşağıdaki gibi olacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7968,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/laps-son.png?w=761" alt="" class="wp-image-7968" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Parolanın görülmesi ve Değiştirilme Tarihinin Belirlenmesi:</strong></h2>
<!-- /wp:heading -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li><strong>"Fat Client UI" ile:</strong></li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Uygulama başlat menüsünde <strong>"Fat Client UI"</strong> arayüzü bulunur ve çalıştırılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>"Computer Name" </strong>alanına bilgisayarın adı girilir ve <strong>"Search"</strong> edilirse, o bilgisayarın yerel Administrator kullanıcısının parolasını çeker.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>"New Expiration Time"</strong> alanına ileri farklı bir tarih girilip <strong>"Set"</strong> edilirse, o tarihten itibaren bilgisayar yeni bir Administrator parolası üretir ve AD bilgisayar nesnesine bu parolayı yazar.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image {"id":7995,"width":"639px","height":"280px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/laps-ui.png?w=887" alt="" class="wp-image-7995" style="width:639px;height:280px" /></figure>
<!-- /wp:image -->

<!-- wp:list {"ordered":true,"start":2} -->
<ol start="2" class="wp-block-list"><!-- wp:list-item -->
<li><strong>ADUC </strong>"dsa.msc"<strong> (Active Directory Users and Computers) ile:</strong></li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>"Active Directory Users and Computers"</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Administrator kullanıcısının parolası görülmek istenen bilgisayarın <strong>özelliklerine</strong> girilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>"Attributes" </strong>sekmesinde <strong>"Show only attributes that have values"</strong> izlenir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Parolanın ve parola süresinin dolacağı tarihleri gösteren attribute'leri içerir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image {"id":7997,"width":"633px","height":"273px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/laps-dsac.png?w=785" alt="" class="wp-image-7997" style="width:633px;height:273px" /></figure>
<!-- /wp:image -->

<!-- wp:list {"ordered":true,"start":3} -->
<ol start="3" class="wp-block-list"><!-- wp:list-item -->
<li><strong>PowerShell aracılığı ile:</strong></li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>PowerShell'da <strong>"AdmPwd.PS"</strong> modülü içe aktarılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Get-AdmPwdPassword </strong>cmdlet'i kullanılarak, belirtilen bilgisayarların parolası görüntülenir veya set edilebilir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Import-Module AdmPwd.PS
Get-AdmPwdPassword -ComputerName MUHASEBE-03

Get-AdmpwdPassword -ComputerName  * #All Computers</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":8002,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/laps-ps.png?w=987" alt="" class="wp-image-8002" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Faruk Güler Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
