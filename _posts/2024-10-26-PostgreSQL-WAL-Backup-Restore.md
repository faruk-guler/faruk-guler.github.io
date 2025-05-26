---
layout: post
title: PostgreSQL WAL Backup &amp; Restore
date: 2024-10-26 23:04
By: theguler
comments: true
categories: [Databases]
---
<!-- wp:image {"id":237,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/elephants.jpg?w=310" alt="" class="wp-image-237" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>WAL Nedir? (Write-Ahead Logging)</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>WAL, veritabanı işlemlerinin güvenilirliğini sağlamak için verilerin disk üzerinde kaydedilmeden önce bir günlük dosyasında (WAL dosyası) yazılmasını sağlayan bir mekanizmadır. Bu yaklaşım, veri kaybını minimize etmek ve veri tabanının beklenmedik kapanmalar sonrası eski durumuna geri yüklenebilmesini sağlamak amacıyla kullanılır.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>WAL Yedekleme (Backup)</strong></h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading">a: Archive Mode'u Etkinleştirme</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>WAL dosyalarını yedeklemek için ilk adım, <code>archive_mode</code>'u etkinleştirmektir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>PostgreSQL’in konfigürasyon dosyasını açın. Genellikle <code>/etc/postgresql/&lt;version&gt;/main/postgresql.conf</code> konumundadır.</p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code -->
<pre class="wp-block-syntaxhighlighter-code">wal_level = replica
archive_mode = on
archive_command = 'cp %p /path/to/archive/directory/%f'</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><code>wal_level = replica</code>:  WAL düzeyini 'replica' olarak ayarlar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>archive_mode = on</code>: Arşivleme modunu etkinleştirir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>archive_command</code>: Her yeni WAL dosyası oluşturulduğunda çalışır. <code>%p</code> kaynak dosyanın yolunu, <code>%f</code> hedef dosyanın adını temsil eder. Bu komut ile WAL dosyaları belirtilen arşiv dizinine kopyalanır.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading">b: Arşiv Dizini Oluşturma</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>PostgreSQL, WAL dosyalarını otomatik olarak arşivleyecektir. Ancak, arşivleme işleminin düzgün çalıştığını kontrol etmek için log dosyalarını inceleyebilirsiniz. Log dosyaları genellikle şu konumda bulunur:</p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code -->
<pre class="wp-block-syntaxhighlighter-code">/var/log/postgresql/postgresql-&lt;version&gt;-main.log</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:paragraph -->
<p>Arşiv&nbsp;dosyalarını&nbsp;saklayacağınız&nbsp;bir&nbsp;dizin&nbsp;oluşturun:</p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code -->
<pre class="wp-block-syntaxhighlighter-code">mkdir -p /path/to/archive/directory</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading">c: PostgreSQL Sunucusunu Yeniden Başlatma</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Yapılandırma dosyasındaki değişikliklerin etkinleştirilmesi için PostgreSQL'i  yeniden başlatın:</p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code -->
<pre class="wp-block-syntaxhighlighter-code">sudo systemctl restart postgresql</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">WAL Geri Yükleme (Restore)</h3>
<!-- /wp:heading -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading">a: Veritabanını Kapatma</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>PostgreSQL&nbsp;sunucusunu&nbsp;kapatın:</p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code -->
<pre class="wp-block-syntaxhighlighter-code">sudo systemctl stop postgresql</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading">b: <code>recovery.conf</code> Dosyasını Oluşturma</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><code>PGDATA</code>&nbsp;dizininde&nbsp;(<code>/var/lib/postgresql/data</code>&nbsp;gibi)&nbsp;bir&nbsp;<code>recovery.conf</code>&nbsp;dosyası&nbsp;oluşturun&nbsp;ve&nbsp;aşağıdaki&nbsp;içeriği&nbsp;ekleyin:</p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code -->
<pre class="wp-block-syntaxhighlighter-code">restore_command = 'cp /path/to/archive/directory/%f %p'
recovery_target_time = '2024-10-26 22:00:00'</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><code>restore_command</code>: WAL dosyalarını belirtilen arşiv dizininden kopyalar.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>recovery_target_time</code>: Belirli bir tarihe kadar olan tüm verileri geri yükler.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading">c: Veritabanını Başlatma</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>PostgreSQL sunucusunu tekrar başlatın</p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code -->
<pre class="wp-block-syntaxhighlighter-code">sudo systemctl start postgresql</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Notlar:</h3>
<!-- /wp:heading -->

<!-- wp:list {"ordered":true,"start":1} -->
<ol start="1" class="wp-block-list"><!-- wp:list-item -->
<li><strong>PostgreSQL Versiyonu</strong>: PostgreSQL 12 ve sonrası sürümlerde <code>recovery.conf</code> dosyası yerine <code>recovery.signal</code> dosyası kullanılır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Tam Yedekleme ile Kullanım</strong>: WAL arşivlemeyi tam yedeklemelerle birlikte kullanmak en iyi uygulamadır.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>İzinler:</strong> WAL dosyalarının saklandığı dizinlerin PostgreSQL kullanıcısının erişim iznine sahip olduğundan emin olun.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->


<script src="https://giscus.app/client.js"
        data-repo="faruk-guler/faruk-guler.github.io"
        data-repo-id="R_kgDOM77PCQ"
        data-category="[ENTER CATEGORY NAME HERE]"
        data-category-id="[ENTER CATEGORY ID HERE]"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="en"
        crossorigin="anonymous"
        async>
</script>