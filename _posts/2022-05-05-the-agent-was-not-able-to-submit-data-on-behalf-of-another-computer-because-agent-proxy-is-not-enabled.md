---
layout: post
title: The agent was not able to submit data on behalf of another computer because agent proxy is not enabled.
date: 2022-05-05 09:11
author: theguler
comments: true
categories: [Fix - Troubleshooting]
---
<!-- wp:image {"id":3028,"width":500,"height":281,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/sytemcenter.jpg?w=1024" alt="" class="wp-image-3028" width="500" height="281" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Microsoft.SystemCenter.DiscoveryWriteActionModule.AgentProxyingNotEnabled.Alert</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu uyarı, bir Operations Manager aracısının başka bir bilgisayarda bulunan bir nesne hakkında veri bulmaya veya oluşturmaya çalıştığını gösterir. Buna varsayılan olarak izin verilmez, ancak bazen uygun izleme için bu gereklidir. Örneğin bir sanal küme clusterini keşfetmeye çalışıyor olabilir. Aracının başka bir bilgisayar adına veri bulabilmesi ve gönderebilmesi gerektiğinden eminseniz, bu aracı için proxy'yi etkinleştirmelisiniz:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>SCOM Operations Manager Consolu üzerinden</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Agent Managed view kısmını açın</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sonra Özellikler'i açın</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Güvenlik sekmesinde, Bu aracının proxy görevi görmesine izin ver seçeneğini işaretleyin. Tamam'ı tıklayın.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>&amp;</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This alert indicates that an SCOM Operations Manager agent is trying to find or create data about an object located on another computer. This is not allowed by default, but is sometimes required for proper monitoring. For example, it might be trying to discover a virtual cluster cluster.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Go to the Administration space in the Operations Manager Console</li><li>Find the agent in the <strong>Agent Managed</strong> view</li><li>Open <strong>Properties</strong> for that agent</li><li>In the <strong>Security </strong>tab, check the <strong>Allow this agent to act as a proxy</strong> option</li><li>Click OK</li></ul>
<!-- /wp:list -->
