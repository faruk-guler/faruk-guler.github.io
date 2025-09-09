---
layout: post
title: Connecting to Azure Portal with PowerShell
date: 2023-01-02 20:52
author: theguler
comments: true
categories: [Azure]
---
<!-- wp:image {"id":5913,"width":517,"height":248,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/azure_logo.png?w=832" alt="" class="wp-image-5913" width="517" height="248" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Windows OS üzerinden Azure modullerini yükleyerek Azure portalınızı Azure Cloud Shell düzeyinde Powershell ile yönetebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Azure PowerShell modülünün yüklemek için <strong>aşağıdaki komutu</strong> kullanabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">if (Get-Module -Name AzureRM -ListAvailable) {
    Write-Warning -Message 'Az module not installed. Having both the AzureRM and Az modules installed at the same time is not supported.'
} else {
    Install-Module -Name Az -AllowClobber -Scope CurrentUser
}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Modül yükleme işlemi sırasında gelen soruları <strong> [Y] </strong>Yes ve <strong>[A]</strong> All şeklinde yanıt vererek devam edebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5915,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/azure_connect.png?w=1024" alt="" class="wp-image-5915" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Daha sonra ise PowerShell ile Azure hesabınızın bağlantısı icin <strong>"Connect-AzAccount"</strong> komutunu kullanmanız gerekir. Bu size Azure Logon sayfası popup kısmını açacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5917,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/azure_popup.png?w=1024" alt="" class="wp-image-5917" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Bağlantı tamamlandığında aşağıdaki şekilde örnek komut çıktısını göreceksiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Şuan Azure Portal hesabınız Powershell üzerindesiniz. </strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">PS C:\Users\Administrator&gt; Connect-AzAccount

Account                   SubscriptionName            TenantId                             Environment
-------                   ----------------            --------                             -------
farukguler@xmail.com Microsoft Azure Sponsorship 4544886484542599004 AzureCloud

PS C:\Users\Administrator&gt;</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Azure hesabınızla oturum açtıktan sonra, aşağıdaki komutu çalıştırarak aboneliklerinizi listeleyin. Bu komut size hesabınıza bağlı olan tüm abonelikleri gösterir.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Get-AzSubscription</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Hangi aboneliğe bağlanmak istediğinize karar verin ve aşağıdaki komutu kullanarak bağlanın. Burada <code>&lt;subscription-id&gt;</code> yerine bağlanmak istediğiniz aboneliğin kimlik bilgilerini girin.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Set-AzContext -SubscriptionId &lt;subscription-id&gt;</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Aşağıdaki komutla mevcut tüm sanal makineleri listeleyebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Get-AzVM</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla – Best Regards</strong>.</p>
<!-- /wp:paragraph -->
