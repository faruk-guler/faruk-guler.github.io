---
layout: post
title: Windows Defender dışlamalar hakkında
date: 2022-03-12 16:21
author: theguler
comments: true
categories: [Antivirus]
---
<!-- wp:paragraph -->
<p>Arkadaşlar bugün tesadüfen Windows Defender dışlamalara göz atarken ve bazı bilgim dışında dosyalarla karşılaştım. biliyorsunuz bu kısım Windows Defender' in virüs taramalarında<strong> virüs taraması yapmaması</strong> için bazı uygulama ve klasörleri tanımladığımız kısımdır. bu kısımdaki dışlamalara eklenmiş dosyaları acilen kaldırarak temizledim, gördüğüm kadarıyla virüs Windows Defender' e müdahale ederek kendini dışlamalara eklemeyi başarmış. bilgilendirme için paylaşma gereği duydum.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Friends, today I took a look at Windows Defender exclusions by coincidence and came across some files without my knowledge. You know, this is the part where we define some applications and folders so that Windows Defender does not <strong>scan for viruses </strong>during virus scans. I urgently removed the files added to the exclusions in this section and cleaned them. As far as I can see, the virus has managed to add itself to the exclusions by interfering with Windows Defender. I felt the need to share for information.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Dışlamalar <strong>Virüs ve tehdit koruması</strong> <strong>ayarları&nbsp;</strong>altında&nbsp;<strong>Ayarları yönet</strong>' i ve ardından&nbsp;<strong>Dışlamalar&nbsp;</strong>altında&nbsp;<strong>Dışlama ekle veya kaldır</strong> kısmında bulunur.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":2243,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/dislama.jpg?w=1024" alt="" class="wp-image-2243" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Buradaki <strong>"bilginiz dışında" </strong>dosya yollarını veya uygulama uzantıları varsa acilen kaldırmanız gerekir!</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>If there are file paths or application extensions without your knowledge here, <strong>you should remove them immediately.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":2245,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/dis.jpg?w=1024" alt="" class="wp-image-2245" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>PowerShell kullanarak Windows Defender istisnalarını yönetmek:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Windows Defender İstisnalarını Listeleme:</strong>
Get-MpPreference | Select-Object -ExpandProperty ExclusionPath

<strong>#Windows Defender İstisnaları Ekleme:</strong>
Add-MpPreference -ExclusionPath "C:\Example\Path"
Belirtilen bir yolu (örneğin, "C:\Example\Path")

<strong>#Windows Defender İstisnalarını Kaldırma:</strong>
Remove-MpPreference -ExclusionPath "C:\Example\Path"</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
