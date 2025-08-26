---
layout: post
title: YAML Nedir? - What is YAML?
date: 2022-12-21 19:35
author: theguler
comments: true
categories: [AI / Machine Learning]
---
<!-- wp:image {"id":5851,"width":485,"height":256,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/yaml.png?w=1000" alt="" class="wp-image-5851" width="485" height="256" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>YAML</strong> (YAML Ain't Markup Language), insanların okumak ve yazmak için tasarlanmış bir veri serileştirme formatıdır. YAML, JSON'a benzer bir sözdizimine sahiptir ve sıklıkla yapılandırma dosyaları, veritabanı kayıtları, API istekleri ve diğer veri dosyaları gibi yapısal verilerin depolanması için kullanılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>YAML, okunabilirliği artırmak için boşluklar, satır atlama ve düzenli bir yapı kullanır. Bu, YAML dosyalarının insanlar tarafından kolayca okunup anlaşılabilmesini sağlar. Ayrıca, YAML dosyaları genellikle diğer formatlara dönüştürülürken kolayca işlenebilir ve çevrilebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>YAML dosyaları, YAML derleyicisi olarak bilinen bir araç kullanılarak oluşturulabilir veya herhangi bir metin düzenleyici veya IDE (Entegre Geliştirme Ortamı) ile de yazılabilir. YAML, birçok programlama dili tarafından desteklenmektedir ve özellikle Ruby, Python, PHP ve JavaScript gibi dillerde popülerdir.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>YAML vs XML vs JSON</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>AML, XML ve JSON, farklı programlama dilleri, uygulamalar ve sistemler arasında veri depolama ve değiş tokuşu için yaygın olarak kullanılan veri serileştirme formatlarıdır. İşte üç format arasındaki farklılıklar:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>YAML (YAML Ain't Markup Language), insanlar tarafından kolayca okunup yazılması için tasarlanmış, okunabilir bir veri serileştirme formatıdır. Veri bloklarını ayırmak için boşluklara bağımlıdır ve yapılandırma dosyaları gibi metin tabanlı veriler için özellikle uygundur. YAML, web geliştirme ve DevOps iş akışlarında sunucuları yapılandırmak ve uygulamaları dağıtmak gibi görevler için sıklıkla kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>XML (Extensible Markup Language), yapısal verileri depolamak için tasarlanmış bir metin tabanlı bir formattır. Özellikle belge işleme için kullanılır ve açık standartları nedeniyle web hizmetlerinde ve veri paylaşımında da yaygın olarak kullanılır. XML, ayrıca SOAP (Simple Object Access Protocol) gibi web hizmetleri için temel bir bileşen olabilir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>JSON (JavaScript Object Notation), JavaScript dilindeki nesnelerin bir temsilidir ve modern web uygulamalarında yaygın olarak kullanılan bir veri serileştirme formatıdır. JSON, YAML ve XML'den daha hafif bir formattır ve genellikle API'lerde veri paylaşımı için kullanılır. JSON, diğer iki formata göre daha kolay okunabilir ve yazılabilir, ancak YAML kadar insan dostu değildir.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Genel olarak, YAML, insanların kolayca okuyup yazabilmesi için tasarlanmış bir formattır. XML, yapısal veriler için idealdir ve web hizmetleri için standart bir formattır. JSON, modern web uygulamaları için hafif ve kullanımı kolay bir formattır.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Örneğin;</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Aşağıda her bir format için bir örnek verilmiştir</strong>:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>1-XML Örneği:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">&lt;book&gt;
  &lt;title&gt;The Hitchhiker's Guide to the Galaxy&lt;/title&gt;
  &lt;author&gt;Ahmet DEMIR&lt;/author&gt;
  &lt;publisher&gt;Pan Books&lt;/publisher&gt;
  &lt;year&gt;1979&lt;/year&gt;
&lt;/book&gt;</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>2-JSON Örneği:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">{
  "book": {
    "title": "The Hitchhiker's Guide to the Galaxy",
    "author": "Ahmet DEMIR",
    "publisher": "Pan Books",
    "year": 1979
  }
}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>3-YAML Örneği:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">book:
  title: The Hitchhiker's Guide to the Galaxy
  author: Ahmet DEMIR
  publisher: Pan Books
  year: 1979</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Not: XML, JSON, YAML arası dönüşümleri<a href="https://codebeautify.org/yaml-to-json-xml-csv"> https://codebeautify.org/yaml-to-json-xml-csv</a> adresinden yapabilirsiniz</p>
<!-- /wp:paragraph -->
