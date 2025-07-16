---
layout: post
title: Permission to perform this operation was denied. Hatası
date: 2023-06-16 22:35
author: theguler
comments: true
categories: [Vmware Virtualization]
---
<!-- wp:image {"id":7466,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/hata_esxi.png?w=1024" alt="" class="wp-image-7466" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>ESXi, kullanıcıların yönetici işlevlerini gerçekleştirmek için varsayılan rollerle birlikte gelir. Bu roller, ESXi sunucusunda belirli ayrıcalıklara sahip kullanıcıları tanımlar. Etki alanı kullanıcıları bu rolleri alabilir veya kendi özel rollerini oluşturabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Varsayılan ESXi rolleri aşağıdaki gibi hiyerarşik bir yapıda bulunur:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li><strong>Administrator: </strong>Tam erişim yetkilerine sahip olan rol. ESXi sunucusunda tüm yönetim görevlerini gerçekleştirebilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>No Access: </strong>Verilen erişimi kısıtlayan bir rol. Bu rol, kullanıcıya hiçbir erişim hakkı tanımaz.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Read-only: </strong>Nesnelerin detaylarını görüntüleyebilir ancak değişiklik yapamaz. Sadece okuma erişimine sahiptir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>No Cryptography Administrator: </strong>Kriptografik işlemler ve Güvenilir Altyapı ayrıcalıklarına sahip olmadan tam erişim sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>No Trusted Infrastructure Administrator: </strong>Güvenilir Altyapı ayrıcalıklarına sahip olmadan tam erişim sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>View: </strong>Sadece görünürlük erişimine sahip bir rol. Bu rol, kullanıcıya erişim vermez, yalnızca görüntüleme yapabilir.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Yukarıdaki roller, ESXi sunucusunda kullanılabilen varsayılan rollerdir. Bunların dışında, özel roller de oluşturabilir ve kullanıcılara özelleştirilmiş ayrıcalıklar ve yetkiler atayabilirsiniz. ESXi web arayüzünde, kullanıcılar ve rollerle ilgili yapılandırmaları gerçekleştirebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Simdi ESXI ana bilgisayarı<strong> "admin"</strong> kullanıcısına tam ayrıcalıklara sahip alan yöneticisi olarak eklemeniz gerekir. <strong>root </strong>kullanıcısı ile oturum açın. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Host &gt; Permissions &gt; Manage Permissions </strong>yoluna gidin.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7479,"width":"781px","height":"285px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/root_logon.png?w=1024" alt="" class="wp-image-7479" style="width:781px;height:285px" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":7482,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/esxi_perm.png?w=1024" alt="" class="wp-image-7482" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":7471,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/perm_esxi2.png?w=1009" alt="" class="wp-image-7471" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":7472,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/add_exsi.png?w=1002" alt="" class="wp-image-7472" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":7474,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/esxi_adder.png?w=1006" alt="" class="wp-image-7474" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":7476,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/admin_login.png?w=1024" alt="" class="wp-image-7476" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":7477,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/admin_logon.png?w=1024" alt="" class="wp-image-7477" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>gerekli yetkilendirmelerden sonra <strong>"admin" </strong>ismiyle oluşturduğumuz kullanıcıya gerekli yetkileri vererek ESXI arayüzüne giriş yapabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Best Regards. – Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
