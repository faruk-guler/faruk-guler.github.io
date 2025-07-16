---
layout: post
title: Exchange Dağıtım Grupları nelerdir?
date: 2022-11-14 19:27
author: theguler
comments: true
categories: [Microsoft Exchange Server]
---
<!-- wp:image {"id":5494,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/groups-exc-1.png?w=497" alt="" class="wp-image-5494" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Distribution Groups Nedir ?</strong> <strong>- What are Distribution Groups?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Exchange Server'da oluşturulan dağıtım grupları, e-postaların birden fazla kişiye ulaşmasını sağlamak için kullanılır. Distribution Groups ve Dynamic Distribution Groups olmak üzere iki tür dağıtım grubu vardır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Distribution Groups:</strong> Normal bir dağıtım grubudur ve üyeleri ve grup yöneticilerini belirleyebilirsiniz. Gruba üye olan kişiler, siz çıkarmadıkça gruptan çıkamazlar ve gruba girmezler. Bu grubun yetkisi tamamen size aittir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Dynamic Distribution Groups: </strong> İçindeki kullanıcılar, verdiğiniz tanımlara göre değişebilir. Bu tanımları kurallar ile oluşturabilirsiniz. Örneğin, <strong>"Bilgi Sistemleri" </strong>departmanında çalışanlar ya da <strong>"İstanbul"</strong> ilinde olanlar gibi. Bu gruptaki üyeler, belirlenen kurallara uygun olan kullanıcılardan otomatik olarak seçilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Örneğin, bir firma içinde <strong>"Bilgi Sistemleri"</strong> departmanı var ve departmanda çalışanların Active Directory'deki departman kısmında <strong>"Bilgi Sistemleri"</strong> yazıyor. Distribution Group oluşturup bu gruba kullanıcıları eklerseniz, personel başka bir departmana geçse bile hala bu dağıtım grubundan e-posta alır. Ancak, Dynamic Distribution Group oluşturup departman kısmında <strong>"Bilgi Sistemleri"</strong> yazan kullanıcılar kurallarına dayalı olarak belirlerseniz, sadece bu kullanıcılar gruba dahil edilir. Departman değiştiğinde, bu kullanıcılar otomatik olarak gruptan çıkarılır ve yeni departmanın kriterlerine uygun olanlar gruba eklenir.</p>
<!-- /wp:paragraph -->
