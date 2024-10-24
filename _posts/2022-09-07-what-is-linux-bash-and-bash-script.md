---
layout: post
title: What is Linux Bash and Bash Script
date: 2022-09-07 00:27
author: theguler
comments: true
categories: [Linux / Unix]
---
<!-- wp:image {"id":4320,"width":"612px","height":"auto","sizeSlug":"large","linkDestination":"none","className":"is-resized"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/bash.webp?w=1024" alt="" class="wp-image-4320" style="width:612px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Linux Bash, bir Unix/Linux tabanlı işletim sistemi için varsayılan komut satırı kabuğudur. Kabuk, kullanıcının sistemle etkileşimde bulunabilmesi için bir arayüz sağlar. Kullanıcılar kabuk aracılığıyla komutlar yazabilir, programlar çalıştırabilir, dosyaları yönetebilir ve sistem yapılandırmasını değiştirebilirler.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bash script ise, Bash kabuğu komutlarının bir araya getirilmesiyle oluşturulan betiklerdir. Bash scriptler, birçok görevi otomatikleştirmek ve sistem yönetimi için özelleştirilmiş görevleri yerine getirmek için kullanılabilir. Bash scriptler, sistem yönetimi, günlük dosyalarını yönetme, yedekleme işlemleri, ağ yönetimi ve diğer birçok görev için kullanılabilir. Bash scriptler, sh uzantılı dosyalar olarak kaydedilir ve yürütülebilir hale getirilebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Bash harici Sıkça kullanılan bazı diğer Sheller:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Zsh (Z Shell):</strong> Bash ile benzer özelliklere sahip olan bir kabuk ancak daha gelişmiş özellikler sunar. Otomatik tamamlama, renkli çıktı, dosya yönetimi ve araçları gibi gelişmiş özelliklere sahiptir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Ksh (Korn Shell):</strong> AT&amp;T tarafından geliştirilen bir kabuk. Bash ile benzer özelliklere sahip olan Ksh, Bash'tan daha hızlı ve daha düşük bellek tüketimine sahiptir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Csh (C Shell):</strong> C programlama diline benzer bir dil yapısına sahip olan kabuk. Unix ve Linux sistemlerinde sıkça kullanılan bir kabuk olmasına rağmen, bazı eleştirmenler tarafından kaba bir dil yapısına sahip olduğu ve sınırlı özellikleri olduğu için önerilmez.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Fish (Friendly Interactive SHell):</strong> Kullanımı kolay, modern ve etkileşimli bir kabuk. Otomatik tamamlama ve renkli çıktı gibi özelliklere sahiptir. Kullanıcı dostu arayüzü ve zengin bir özellik kümesi ile dikkat çeker.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Tcsh (TENEX C Shell):</strong> Csh'nin geliştirilmiş bir versiyonu olan Tcsh, Csh'ye kıyasla daha gelişmiş özellikler sunar. Otomatik tamamlama, komut satırı düzenleme ve tarih işleme gibi özelliklere sahiptir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Peki Bash Shell Script Nedir?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bash shell script, Bash kabuğu tarafından yürütülebilen betiklerdir. Bash shell scriptleri, Bash komutları ve programlama yapıları kullanılarak yazılır ve kabuğun etkileşimli kullanımıyla aynı işlevleri yerine getirebilirler. Bu scriptler, sistem yönetimi, dosya yönetimi, ağ yönetimi, yedekleme işlemleri, günlük dosyalarının yönetimi ve diğer birçok görev için kullanılabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bash shell scriptleri, bir veya daha fazla komutu bir araya getirerek betik dosyaları olarak yazılır. Bu betikler, çalıştırılabilir dosya olarak işaretlenebilir ve ardından terminalde "./script_name" komutu kullanılarak çalıştırılabilir. Bash shell scriptleri, komutları ardışık olarak yürütmek, koşul ve döngü işlemleri, değişkenler ve fonksiyonlar gibi programlama yapıları kullanılarak karmaşık görevleri otomatikleştirmek için kullanılabilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>UNIX&nbsp;kabuğu&nbsp;(shell)&nbsp;tarafından çalıştırılması veya yürütülmesi için hazırlanan komut satırı tabanlı küçük bilgisayar programlarıdır. Basit bir metin dosyasının içine yerleştirilen&nbsp;Shell&nbsp;Script’in içinde UNIX kabuğunundakine benzeyen çalıştırılabilir komutlar yer alır. Tıpkı gerçek bir programda olduğu gibi Shell Script’in içinde sistem kabuğuna ne yapacağı talimatını veren komutlar, parametreler ve alt komutlar vardır. bunu <strong>Windows</strong> tarafındaki Powershell ISE toolu' na benzetebiliriz.  Powershell' de script uzantısı<strong> ipcheck.Ps1</strong> iken Bash Shell' de bu uzantı <strong>ipcheck.sh </strong>olacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Bash Script’i nasıl kullanacağız:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">1) <strong>ipcheck.sh</strong> uzantılı yeni bir dosya oluşturalım. <br>2) satır başına <strong>#!/bin/bash </strong>ekleyin. Bu, “çalıştırılabilir yapacağım” demektir.<br>3) komut satırında kullanacağımız satırları ekleyip kaydedelim.<br>4) scripti ilgili dizine gidip "<strong>sudo</strong> <strong>bash ipcheck.sh" </strong>veya <strong>sudo sh ipcheck.sh</strong> komutuyla çalıştıralım.<br>4) yetki sorunu ile karşılaşırsak "<strong>chmod u+x ipcheck.sh</strong>" kendimize execute  yetkisi verelim.<br>5) ek olarak "<strong>./ipcheck.sh</strong>" bu komutla yazdığımız Script'i çalıştırabiliriz.</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Aşağıdaki komutla sistemimizdeki mevcut kabukları görelim:</strong>
cat /etc/shells

<strong>#Şuan hangi kabuk üzerinde yer aldığımızı öğrenmek için:</strong>
echo $SHELL</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>İlgili dizine dosya indirmek için(indir.sh):</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#!/bin/bash
# cekilecek dosya/yol
wget '<strong>egm.gov.tr/kurumlar/egm.gov.tr/anasayfaTasarim/Ataturk/atam_2.jpg</strong>'</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Fiziksel Ip Adresi öğrenmek<strong>(<strong>ipcheck.sh</strong></strong>):</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#! /bin/bash
# gerekli bash komutu
ip=$(ip address| awk '/inet/ {print $2}' | grep -v ^::1 | grep -v ^127)
#IP adresini yansıt
echo "IP adres / MAC"
echo "$ip"</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Dış Ip Adresi öğrenme):</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#! /bin/bash
# gerekli bash komutu - Ext_ipcheck.sh
wget -qO- ifconfig.me/ip</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla – Best regards</strong>.</p>
<!-- /wp:paragraph -->
