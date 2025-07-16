---
layout: post
title: PowerShell (Execution Policy) Nedir?
date: 2023-11-05 21:23
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":4474,"width":"265px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/slim_powershell.jpg?w=600" alt="" class="wp-image-4474" style="width:265px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>💡</strong> <strong>PowerShell yürütme politikası (Execution Policy) Nedir?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>PowerShell komutlarının nasıl çalıştırılacağını denetleyen bir güvenlik mekanizmasıdır. PowerShell yürütme politikası, PowerShell oturumunun başladığında belirli komutları veya komut dosyalarını çalıştırmak için belirli bir politikayı gerektirir. Bu, kötü amaçlı yazılımların veya zararlı komut dosyalarının yanlışlıkla veya kötü niyetle çalıştırılmasını önlemeye yardımcı olur. </p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>PowerShell "ExecutionPolicy" parametreleri:</strong></h2>
<!-- /wp:heading -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>Restricted (Sınırlı):</strong> <strong>Varsayılan olarak gelen parametredir. </strong>Bu politika, hiçbir PowerShell betiğinin çalıştırılmasına izin vermez, yani Internet'ten indirilen betikler veya yerel olarak oluşturulan betikler çalıştırılamaz. Bu en güvenli yürütme politikasıdır, ancak betik tek tek komut çalıştırmaya müsaittir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Unrestricted (Sınırsız):</strong> Bu politika, her türlü PowerShell betiğinin çalıştırılmasına izin verir. İnternetten indirilen betikler bile onay gerektirmez. Bu, daha az güvenli bir seçenektir ve dikkatli kullanılmalıdır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>AllSigned (Tüm İmzalı):</strong> Bu politika, yalnızca güvenilir bir yayıncı tarafından dijital olarak imzalanmış PowerShell betiklerinin çalıştırılmasına izin verir. Yerelde oluşturulan betikler dahil, imzalı betikler çalıştırılabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>RemoteSigned (Uzaktan İmzalı):</strong> Bu politika, yerelde oluşturulan betiklerin imza gerektirmeden çalıştırılmasına izin verirken, Internet'ten indirilen betiklerin güvenilir bir yayıncı tarafından imzalanmasını şart koşar. Yerelde oluşturulan betikler imza gerektirmez.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Undefined (Tanımsız):</strong> Bu parametre, geçerli ExecutionPolicy ayarını siler. Ancak GPO (Grop Policy) tarafından ayarlanmış ExecutionPolicy'e müdahale edemez. Yani, bilgisayarınıza veya kullanıcınıza uygulanan<strong> "GPO" </strong>tarafından belirlenen neyse o ExecutionPolicy geçerli olur.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Bypass (Atla):</strong> Bu politika, her türlü PowerShell betiğinin çalıştırılmasına izin verir, ve hiçbir şekilde onay istemez.<strong> Bu, en az güvenli seçenektir ve dikkatli bir şekilde kullanılmalıdır.</strong></li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>✍ Ayrıca bunların dışında kalan <strong>(7.) </strong>değerde <strong>Default</strong>  değeridir. Bu değer yürütme ilkesini Windows istemci bilgisayarları için <strong>"Restricted" </strong>, Windows Server makineleri için ise <strong>"RemoteSigned"</strong> olarak ayarlar.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>"Get-ExecutionPolicy -List" Nedir?</strong></h2>
<!-- /wp:heading -->

<!-- wp:image {"id":9312,"width":"809px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ex_ps.png?w=985" alt="" class="wp-image-9312" style="width:809px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>"Get-ExecutionPolicy -List" komutu,</strong> PowerShell'de mevcut olan tüm yürütme politikalarını ve bunların öncelik sıralamasını görüntülemenize olanak tanır. Ayrıca bu politikaların etki alanı düzeyinde (GPO tarafından) ayarlanmış olup olmadığını da gösterir.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">PS C:\Windows\system32&gt; <strong>Get-ExecutionPolicy -List</strong>

<strong>Scope ExecutionPolicy
----- ---------------
MachinePolicy       Undefined
UserPolicy          Undefined
Process             Undefined
CurrentUser         Undefined
LocalMachine        Bypass</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#PowerShell betiği yürütme politikaları hakkında detaylı bilgi al:</strong>
Get-Help about_Execution_Policy

<strong>#Mevcut execution policies ve kapsamlarını göster:</strong>
Get-ExecutionPolicy -List

<strong>#PowerShell yürütme politikası durumunu kontrol et:</strong>
Get-ExecutionPolicy


<strong>##Yürütme Politikalarını Ayarlayın:</strong>

<strong>#Restricted:</strong>
Set-ExecutionPolicy Restricted

<strong>#AllSigned:</strong>
Set-ExecutionPolicy AllSigned

<strong>#RemoteSigned:</strong>
Set-ExecutionPolicy RemoteSigned

<strong>#Unrestricted:</strong>
Set-ExecutionPolicy Unrestricted

<strong>#Bypass:</strong>
Set-ExecutionPolicy Bypass

<strong>#Undefined:</strong>
Set-ExecutionPolicy Undefined</pre>
<!-- /wp:preformatted -->

<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading"><strong>🚩 PowerShell ExecutionPolicy kapsamları (Scopes)</strong></h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Öğrendiğiniz gibi <strong>"PowerShell ExecutionPolicy" </strong>komut dosyası yürütmesini kısıtlamaktadır, ancak PowerShell komut dosyalarını birçok farklı bağlamda yürütebilir.&nbsp;PowerShell, komut dosyalarını kullanıcının oturum açtığı bağlam veya genel makine bağlamı altında, SİSTEM olarak çalışan zamanlanmış görevler aracılığıyla veya tek bir açık PowerShell konsolu aracılığıyla yürütülebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>✍ Tüm bu bağlamlara uyum sağlamak için PowerShell'de&nbsp;bir yürütme ilkesi tanımlayabileceğiniz beş farklı bağlam veya&nbsp;scope vardır.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>MachinePolicy:</strong> Bu kapsam düzeyi, bilgisayarın Grup Politika Nesneleri (GPO) tarafından belirlenen yürütme politikalarını ifade eder. Bilgisayar düzeyinde uygulanır ve tüm kullanıcılar için geçerlidir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>UserPolicy:</strong> Bu kapsam düzeyi, kullanıcının Grup Politika Nesneleri (GPO) tarafından belirlenen yürütme politikalarını ifade eder. Kullanıcı düzeyinde tanımlanan politikalar, yalnızca belirli bir kullanıcı hesabı için geçerli olur.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Process:</strong> Bu kapsam düzeyi, on andaki PowerShell oturumu veya işlemi için geçerli olan yürütme politikasıdır. Bu, PowerShell oturumları veya işlemleri arasında farklı yürütme politikaları kullanmanız gereken durumlarda kullanılır. Powershell oturumu kapandığında bu policy silinir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>CurrentUser:</strong> Bu kapsam düzeyi, mevcut kullanıcı hesabının yürütme politikasını ifade eder. Yani, yalnızca belirli bir kullanıcı için geçerlidir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong><strong>LocalMachine</strong>:</strong> Kapsamı, PowerShell'de bilgisayarın yerel yürütme politikasını temsil eder. Bu yürütme politikası, bilgisayarın genel yürütme politikasını ifade eder ve tüm kullanıcı hesapları için geçerlidir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading">📜 <strong>PowerShell (Execution Policy) GPO</strong></h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>"Computer Configuration&nbsp;&gt;&nbsp;Administrative Templates&nbsp;&gt;&nbsp;Windows Components&nbsp;&gt;&nbsp;Windows PowerShell"</strong>  ✍(öncelikli)</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>"User Configuration&nbsp;&gt;&nbsp;Administrative Templates&nbsp;&gt;&nbsp;Windows Components&nbsp;&gt;&nbsp;Windows PowerShell"</strong></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image {"id":9290,"width":"770px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ps_exc_policys.png?w=1024" alt="" class="wp-image-9290" style="width:770px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>"Not Configured" : </strong>Belirli bir ayarın yapılmadığını veya belirli policy' in kullanılmadığını ifade eder. </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>"Allow all scripts" <strong>:</strong> </strong>Tüm komut dosyalarının çalıştırılmasına izin verir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>"Allow only signed scripts" <strong>:</strong> </strong>komut dosyalarının yalnızca güvenilir bir yayımcı tarafından imzalanmış olması durumunda yürütülmesine izin verir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>"Allow local scripts and remote signed scripts"</strong> <strong><strong>:</strong> </strong>Tüm yerel komut dosyalarının çalıştırılmasına izin verir;&nbsp;İnternetten gelen komut dosyalarının güvenilir bir yayıncı tarafından imzalanmasını şart koşar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>"Disabled" :</strong> Bu ilke ayarını devre dışı bırakırsanız <strong>"hiçbir komut dosyasının" çalıştırılmasına"</strong> izin verilmez.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading">🩸 <strong><strong>PowerShell (Execution Policy) </strong>REG</strong></h2>
<!-- /wp:heading -->

<!-- wp:image {"id":9303,"width":"824px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ex_policys_reg.png?w=1024" alt="" class="wp-image-9303" style="width:824px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">HKLM\SOFTWARE\Microsoft\PowerShell\1\ShellIds\Microsoft.PowerShell</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Değer verisi girdileri:  </strong>Restricted,&nbsp;AllSigned,&nbsp;RemoteSigned,&nbsp;Unrestricted,&nbsp;UnDefinition, etc.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
