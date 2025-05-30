---
layout: post
title: Linux Package and Archive Management
date: 2024-01-13 22:49
author: theguler
comments: true
categories: [Linux / Unix]
---
<!-- wp:image {"id":11183,"width":"436px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/lpmn-tar.jpg?w=825" alt="" class="wp-image-11183" style="width:436px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Linux'ta program/paket <strong>yükleme, güncelleme, onarma, kaldırma, temizleme</strong> genellikle dağıtımına bağlı olarak farklı yöntemlerle gerçekleştirilir. Yaygın olarak kullanılan birkaç yöntemi açıklamak istiyorum. Makale çok uzun olduğu için <strong>[güncelleme, onarma, kaldırma, temizleme]</strong> işlemlerinden tam olarak bahsedilmeyecektir. Kısa bir araştırma ile detaylı bilgilere erişebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->

## Master
1. **The Repository/Repo**:  

2. **Building from Source Code**:  

3. **Local installation File**:  

<br>#Package Management System<br>+ Synaptic<br>+ Apper<br>+ Aptitude<br>+ Snapd<br>+ Homebrew<br>+ Flatpak<br>+ AppImage<br>+ PackageKit<br>.........<br><br>#Packages<br>- bin file: ./file_name.bin<br>- sh file: ./file_name.sh<br>- run file: ./file_name.run<br>- py file: python file_name.py<br>- jar file: java -jar file_name.jar<br>- pl file: perl file_name.pl<br>- ruby file: ruby file_name.rb<br>...........<br><br>#Install Windows Software on Linux<br>- Wine<br>- Crossover:<br>...........
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong><strong>The Repositor</strong>y/Repo:</strong> Linux'un çoğu dağıtımında paket yöneticileri kullanılarak programları kurmak en yaygın ve önerilen yöntemdir. Paket yöneticileri, bağımlılıkları çözme, güncelleme ve kaldırma gibi işlemleri otomatik olarak yönetir. Aşağıda bazı yaygın paket yöneticileri bulunmaktadır:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>##Debian:<br>sudo apt update  # Paket listesini güncelle<br>sudo apt install paket_adı  # Paketi yükle<br><br>##Red Hat/Fedora:<br>sudo dnf install paket_adı  # Paketi yükle<br><br>##Arch Linux:<br>sudo pacman -S paket_adı  # Paketi yükle</strong><br><br><strong>##Slackware:<br>sudo installpkg paket_adı.tgz</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Building from Source Code:</strong> Programın kaynak kodunu indirip derleyerek yüklemek, özellikle belirli yapılandırmalara ihtiyaç duyulan durumlarda kullanışlı olabilir. Bu yöntem, genellikle aşağıdaki adımları içerir:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Kaynak kodunun indirilmesi</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Bağımlılıkların kontrol edilmesi ve gerekli bağımlılıkların yüklenmesi</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Yapılandırma (configure) ve derleme işlemlerinin gerçekleştirilmesi</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Kurulumun tamamlanması</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Debian<br>#Download:</strong><br>wget https://docs.farukguler.com/package/paket.tar.gz<br><br><strong>#Extract and install:</strong><br>sudo apt install build-essential # Install the necessary tools for compilation<br>tar -xvf source_code.tar.gz      # Extract source code<br>cd source_code_directory         # To source code directory<br>./configure                      # Check required libraries and components<br>make                             # Compilation process ....\.<br>sudo make install                # Installation-sending files to directories<br>make clean                       # Clean compiled files end of installation</pre>
<!-- /wp:preformatted -->

<p><strong>Local installation File:</strong> Bir "Yerel Kurulum Dosyası" genellikle tek bir bilgisayara veya belirli bir kullanıcı hesabına özel olarak indirilen ve kurulan bağımsız bir yazılım paketidir.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Download:</strong><br>wget https://docs.farukguler.com/repo/package_name.rpm<br><br><strong>##Debian/Ubuntu:</strong> (dpkg)<br>sudo dpkg -i package.deb # Install package<br>sudo apt install -f # Fix dependencies<br><br><strong>##Fedora/RHEL (Red Hat Enterprise Linux):</strong> (dnf)<br>sudo dnf install /path/to/package.rpm # Install the package<br><br><strong>##OpenSUSE:</strong> (zypper)<br>sudo zypper install /path/to/package.rpm # Install the package<br><br><strong>##Arch Linux:</strong> (pacman)<br>sudo pacman -U /path/to/package.pkg.tar.zst # Install package<br><br><strong>##Slackware:</strong> (installpkg)<br>installpkg package.tgz # Install package</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Synaptic, Snap, Flatpak, and other packages</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Synaptic: Gui<br>Snap: snap install package_name<br>Flatpak: flatpak install package_name</strong><br><strong>.........</strong><br><strong><br>bin file: ./file_name.bin<br>sh file: ./file_name.sh<br>run file: ./file_name.run</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":9699,"width":"297px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/4-distro.jpg?w=1024" alt="" class="wp-image-9699" style="width:297px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Tabanı farklı Linux dağıtımları, farklı paket yönetim sistemleri kullanır. Bu sistemler, yazılım paketlerini yönetmek, dağıtmak ve kurmak için kullanılan araçları içerir. Her dağıtımın kendi paket yöneticisi ve paket formatları farklı olabilir, bu nedenle kullanılan dağıtıma özgü dokümantasyonu kontrol etmek her zaman iyi bir uygulamadır.</p>
<!-- /wp:paragraph -->

<!-- wp:table {"align":"center"} -->
<figure class="wp-block-table aligncenter"><table><thead><tr><th>DebIan</th><th>RedHat/SUSE</th></tr></thead><tbody><tr><td><strong>Paket Uzantısı:</strong> <code>.deb</code></td><td><strong>Paket Uzantısı:</strong> <code>.rpm</code></td></tr><tr><td><strong>Paket Yöneticisi (Yükleyicisi):</strong> <code>dpkg</code></td><td><strong>Paket Yöneticisi (Yükleyicisi):</strong> <code>rpm</code></td></tr><tr><td><strong>Paket Ortamı (Distro’su):</strong> Debian, Ubuntu</td><td><strong>Paket Ortamı (Distro’su):</strong> RHEL, Fedora, openSUSE</td></tr><tr><td><strong>Paket Yöneticileri:</strong> <code>apt</code>, <code>aptitude</code></td><td><strong>Paket Yöneticileri:</strong> <code>yum</code>, <code>dnf</code>, <code>zypper</code></td></tr><tr><td>--------------------------------------------------------------------</td><td>---------------------------------------------------------------------------</td></tr></tbody></table><figcaption class="wp-element-caption"><strong>Debian &amp; RedHat/SUSE Distros</strong></figcaption></figure>
<!-- /wp:table -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Arch LInux</th><th>Slackware</th></tr></thead><tbody><tr><td><strong>Paket Uzantısı:</strong> <code>.pkg.tar.zst</code></td><td><strong>Paket Uzantısı:</strong> <code>.tgz</code></td></tr><tr><td><strong>Paket Yöneticisi (Yükleyicisi):</strong> <code>pacman</code></td><td><strong>Paket Yöneticisi (Yükleyicisi):</strong> <code>installpkg</code>, <code>removepkg</code></td></tr><tr><td><strong>Paket Ortamı (Distro’su):</strong> Arch Linux</td><td><strong>Paket Ortamı (Distro’su):</strong> Slackware</td></tr><tr><td>---------------------------------------------------------------</td><td>--------------------------------------------------------------------------------</td></tr></tbody></table><figcaption class="wp-element-caption"><strong>Arch Linux &amp; Slackware Distros</strong></figcaption></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>💾🗜️Archive Management🗜️</strong></p>
<!-- /wp:paragraph -->
<!-- wp:preformatted -->
<br><br>#Tar<br>tar -cvf dosya.tar /yol/klasoru #Tar Arşivi Oluştur<br>tar -xvf dosya.tar #Tar Arşivini Çıkart:<br>tar -tvf dosya.tar #Tar Arşivi İçeriğini Listele<br>tar cf arsiv.tar dosya1 dosya2 #Arsivle<br>tar xf arsiv.tar #Çıkar<br><br>#Tar ve Gzip<br>tar -czvf dosya.tar.gz /yol/klasoru #Arşiv Oluştur<br>tar -xzvf dosya.tar.gz #Sıkıştırılmış Tar Arşivini Çıkart<br>tar cfz arsiv.tgz dosya1 dosya2 #Arsivle<br>tar xfzv arsiv.tgz #Çıkar<br><br>#Tar ve Bzip2<br>tar -cjvf dosya.tar.bz2 /yol/klasoru #Sıkıştırılmış Arşiv Oluştur<br>tar -xjvf dosya.tar.bz2 # Sıkıştırılmış Tar Arşivini Çıkart<br>tar cfj arsiv.tar.bz2 dosya1 dosya2 #Arsivle<br>tar xfjv arsiv.tar.bz2 #Çıkar<br><br>#Zip<br>gzip dosya.txt #Dosyayı Sıkıştır<br>gzip -d dosya.txt.gz #Dosyayı Çıkart<br>zcat dosya.txt.gz #Dosyanın İçeriğini Görüntüle<br>zip arsiv.zip dosya1 dosya2 #Zip Arşiv Oluştur<br>unzip arsiv.zip #Çıkar<br><br>#Zip ve Unzip (PKZIP)<br>zip arsiv.zip dosya1 dosya2 #Arsivle<br>unzip arsiv.zip #Çıkar<br><br>#7-Zip<br>7z a arsiv.7z dosya1 dosya2 #Arsivle<br>7z x arsiv.7z #Çıkar<br>zip -l arsiv.zip #Zip Arşivi İçeriğini Listele<br><br>#Rar ve Unrar<br>rar a arsiv.rar dosya1 dosya2 #Rar Arşivi Oluştur<br>unrar x arsiv.rar #Rar Arşivini Çıkart<br>unrar x arsiv.rar /yol/klasoru #Belirtilen Dizine Çıkart<br>rar l arsiv.rar #Rar İçeriğini Listele</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Made with Love and Simplicity in Turkey ❤️</strong></p>
<!-- /wp:paragraph -->
