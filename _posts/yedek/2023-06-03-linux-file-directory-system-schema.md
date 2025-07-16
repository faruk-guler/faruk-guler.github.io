---
layout: post
title: Linux Dizin/Dosya Sistemi Şeması
date: 2023-06-03 03:08
author: theguler
comments: true
categories: [Linux / Unix]
---
<!-- wp:image {"lightbox":{"enabled":true},"id":7323,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/fs.png?w=1024" alt="" class="wp-image-7323" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Linux dosya sistemi yapısı dağıtıma ve sistem yapılandırmasına bağlı olarak farklılıklar gösterebilir. Ancak, aşağıda belirtilen hiyerarşi genel olarak Linux dosya sisteminin standart yapısını yansıtmaktadır.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>/: </strong>Kök dizin olarak bilinir. Tüm dosya sistemi bu noktada başlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>/bin: </strong>Bu dizin, kullanıcıların sistemi yönetmek için temel sistem programlarını içerir. Örneğin, ls, cp, rm gibi komutlar bu dizinde bulunur.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>/boot: </strong>Bu dizin, sistem başlatma işlemi için gereken dosyaları içerir. Önyükleme yükleyicisi, çekirdek ve başlatma konfigürasyon dosyaları gibi öğeler bu dizinde yer alır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>/dev: </strong>Bu dizin, aygıt dosyalarını içerir. Her bir donanım cihazı veya sanal aygıt, bu dizinde bir dosya olarak temsil edilir. Örneğin, sabit diskler /dev/sda, /dev/sdb şeklinde temsil edilebilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>/etc:</strong> Bu dizin, sistem yapılandırma dosyalarını içerir. Örneğin, ağ ayarları, kullanıcı hesapları, servis yapılandırmaları gibi dosyalar bu dizinde bulunur.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>/home: </strong>Bu dizin, kullanıcıların kişisel dosyalarını ve dizinlerini içerir. Her kullanıcının genellikle adıyla aynı olan bir alt dizini bulunur.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>/lib:</strong> Bu dizin, temel sistem kütüphanelerini içerir. Programlar tarafından kullanılan ortak kütüphaneler bu dizinde bulunur.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>/media: </strong>Bu dizin, taşınabilir medya cihazları için bir noktadır. Örneğin, CD veya USB sürücüleri bu dizinde otomatik olarak bağlanabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>/mnt: Bu</strong> dizin, geçici olarak bağlanmış dosya sistemlerini içerir. Başka bir dosya sistemi geçici olarak bu dizine bağlandığında, içeriği bu dizinde görüntülenebilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>/opt: </strong>Bu dizin, isteğe bağlı yazılım paketlerini içerir. Sistemle entegre olmayan veya ayrı olarak yüklenen yazılımlar bu dizinde bulunabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>/proc: </strong>Bu dizin, çalışan süreçler ve sistem bilgileri gibi kernel ve süreç bilgilerini içerir. Özel bir dosya sistemini temsil eder ve gerçek dosyalar yerine sanal dosyalar içerir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>/root: </strong>Bu dizin, sistem yöneticisi<strong> (root) </strong>için kişisel dizindir. Diğer kullanıcıların kişisel dizinlerinden farklı olarak, root kullanıcısı için ayrı bir dizin oluşturulur. <strong>"Dosya sisteminin en üstündeki kök “/” dizini ile karıştırılmaması gerekir."</strong></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>/run: Bu</strong> dizin, çalışma zamanı verilerini içerir. Örneğin, çalışan süreçlerin PID dosyaları bu dizinde bulunabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>/sbin: </strong>Bu dizin, sistem yönetimi için temel programları içerir. /bin dizinindeki programlara benzer şekilde, ancak genellikle sadece root kullanıcısı tarafından kullanılabilirler.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>/srv: </strong>Bu dizin, sunucu ile ilgili verileri içerir. Örneğin, web sunucusu için sunucu belgeleri veya veritabanları bu dizinde tutulabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>/sys: </strong>Bu dizin, Linux kerneliyle ilgili bilgileri içerir. Donanım aygıtlarının, sürücülerin ve kernel parametrelerinin sanal bir temsilini sağlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>/tmp: </strong>Bu dizin, geçici dosyaları içerir. Programlar tarafından kullanılan geçici veriler ve işlemler bu dizinde depolanabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>/lost+found:</strong> Kurtarılan dosyalardır. Hasar almış veya kesinti nedeniyle çalışması yarıda kalmış dosyaların bitlerinin tutulduğu dizindir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>/usr: </strong>Bu dizin, ikincil programlar, kütüphaneler ve belgeleri içeren ayrı bir hiyerarşiye sahiptir. Örneğin, kullanıcıların yüklediği uygulamalar ve sistemle birlikte gelen ikincil programlar bu dizinde bulunabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>/var:</strong> Bu dizin, değişken verileri içerir. Örneğin, günlük dosyaları, veritabanları, e-posta ve diğer değişken veriler bu dizinde bulunabilir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Bu, Linux Ubuntu Server'ın genel dosya sistemi hiyerarşisi ve dizinleridir. Her dizin, farklı bir amaç için kullanılır ve belirli türde dosyaları veya verileri içerir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
