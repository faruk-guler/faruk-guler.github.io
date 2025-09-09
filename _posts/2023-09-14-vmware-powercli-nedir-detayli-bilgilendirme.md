---
layout: post
title: What is VMware PowerCLI? Detailed Information
date: 2023-09-14 12:59
author: theguler
comments: true
categories: [Vmware Virtualization]
---
<!-- wp:image {"id":8548,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/cli_vmware.png?w=576" alt="" class="wp-image-8548" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong><a href="https://developer.vmware.com/powercli">https://developer.vmware.com/powercli</a></strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>VMware PowerCLI, </strong>VMware sanallaştırma ortamlarını otomatikleştirmek, yönetmek ve izlemek için kullanılan PowerShell tabanlı bir araçtır. Bu araç, VMware vSphere ve vCenter ürün ailesi ile entegre çalışır ve aşağıdaki görevleri kolaylaştırır:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Sanal makine yönetimi:</strong> Oluşturma, başlatma, durdurma, kaldırma ve yapılandırma işlemleri.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Sanal Makine Yönetimi</strong>: Sanal makine oluşturma, başlatma, durdurma, kaldırma ve yapılandırma gibi işlemleri yönetmek için kullanılır. Ayrıca sanal makine snapshot'ları oluşturma, düzenleme ve silme.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Otomasyon ve betikler: </strong>Rutin görevleri otomatikleştirme, betikler oluşturma ve tekrarlayan işlemleri hızlandırma.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Depolama ve ağ yapılandırma: </strong>Depolama hizmeti sağlayıcıları, ağ yapılandırmaları ve VLAN'lar gibi yapılandırmaları yönetme.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Raporlama ve izleme: </strong>Performans verilerini izleme, raporlar oluşturma ve sorunları tespit etme.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Güvenlik ve yetkilendirme: </strong>Kullanıcı yönetimi, yetkilendirme yapılandırma ve erişim kontrolü sağlama.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>vCenter sunucusu yönetimi:</strong> vCenter sunucusunu yapılandırma, izleme, yedekleme ve kurtarma işlemleri.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>VMware PowerCLI, büyük ve karmaşık VMware sanallaştırma altyapılarını daha etkili bir şekilde yönetmenizi sağlar ve otomasyon için güçlü bir araçtır.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>VMware PowerCLI:</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Install and Activate PowerCLI:</strong><br>Install-Module -Name VMware.PowerCLI -Force -AllowClobber<br><br><strong>#Import PowerCLI</strong><br>Import-Module VMware.PowerCLI<br><br>#PowerCLI See current version:<br>Get-Module -Name VMware.PowerCLI -ListAvailable | Select-Object Name, Version<br><br><strong>#PowerCLI Modülünü Güncelleme:</strong><br>Update-Module -Name VMware.PowerCLI<br><br><strong>PowerCLI Modülünü Kaldırma:</strong><br>#Uninstall-Module -Name VMware.PowerCLI</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Connect to vCenter Server:</strong><br>connect-VIserver “IP/ hostname/FQDN of vCenter”<br>Connect-VIServer -Server IP/ hostname/FQDN of vCenter -User faruk -Password Passwd12345+<br><br><strong>#List existing connections:</strong><br>Get-VIServer<br><br><strong>#List virtual machines by hosts and other features:</strong><br>Get-VM | Select-Object Name, VMHost, MemoryGB, NumCPU, PowerState<br><br><strong>#To get a Snapshot for the #DC2 virtual machine:</strong><br>Get-VM -Name "DC2" | New-Snapshot -Name "Snapshotname" -Description "Aciklama..."<br><br><strong>#Listing All Snapshots:</strong><br>Get-VM | Get-Snapshot<br>Get-VM | Get-Snapshot | select VM, Name, Created, Size<br>Get-VM | Get-Snapshot | Select-Object VM, Name, Created, @{Name="Description"; Expression={$_.Description}}, @{Name="SizeGB"; Expression={[math]::Round($_.SizeGB, 2)}}, Quiesced, Parent, @{Name=<strong>"PowerState"</strong>; Expression={$_.VM.PowerState}}, @{Name="VMHost"; Expression={$_.VM.VMHost}}<br>Get-VM | Get-Snapshot | Select-Object VM, Name, Created, Description, @{Name=<strong>"SizeGB"</strong>; Expression={[math]::Round($_.SizeGB, 2)}}, @{Name="Host"; Expression={$_.VM.VMHost.Name}}<br><br>Get-Snapshot -VM * | select VM, Name, SizeGB, @{Name=<strong>"Snapshot Creator"</strong>; Expression={(Get-VIEvent -Entity $_.VM | Where {$_.Info.DescriptionId -eq "VirtualMachine.createSnapshot"} | Select-Object -First 1).UserName}}<br><br><strong>#Deleting All/Specific Snapshots: Approved and Unapproved</strong><br>Spesifik: Get-VM -Name "DC-2-server" | Get-Snapshot | Remove-Snapshot<br>Onaylı: Get-VM | Get-Snapshot | Remove-Snapshot<br>Onaysız: Get-VM | Get-Snapshot | Remove-Snapshot -Confirm:$false<br><br><strong>#Log Out from a specific vCenter:</strong><br>Disconnect-VIServer -Server IP/ hostname/FQDN of vCenter -Confirm:$false<br><br><strong>#Log out of all vCenter or ESXi sessions in the PowerCLI session:</strong><br>Disconnect-VIServer<br><br><strong>#Log out of their session by disabling the confirmation message:</strong><br>Disconnect-VIServer -Confirm:$false<br><strong><br>#Some commonly used VMware PowerCLI commands:</strong><br>########################################################<br><br><strong>Connection Commands:</strong><br><strong>Connect-VIServer:</strong> vCenter sunucusuna veya ESXi ana bilgisayarına bağlanı<br><strong>Disconnect-VIServer:</strong> Bağlantıyı kapatır ve vCenter sunucusundan veya ESXi ana bilgisayarından çıkar.<br><br><strong>Virtual Machine Operations:</strong><br><strong>Get-VM: </strong>Tüm sanal makineleri listeler.<br><strong>New-VM:</strong> Yeni bir sanal makine oluşturur.<br><strong>Start-VM:</strong> Sanal makineyi başlatır.<br><strong>Stop-VM:</strong> Sanal makineyi durdurur.<br><strong>Remove-VM:</strong> Sanal makineyi kaldırır.<br><br><strong>Snapshot Operations:</strong><br><strong>Get-Snapshot:</strong> Sanal makine için mevcut anlık görüntüleri listeler.<br><strong>New-Snapshot:</strong> Yeni bir anlık görüntü oluşturur.<br><strong>Remove-Snapshot:</strong> Belirli bir anlık görüntüyü siler.<br><strong>Revert-ToSnapshot:</strong> Bir anlık görüntüyü geri yükler.<br><br><strong>Storage Operations:</strong><br><strong>Get-Datastore:</strong> Veri mağazalarını listeler.<br><strong>New-Datastore: </strong>Yeni bir veri deposu oluşturur.<br><strong>Remove-Datastore:</strong> Veri deposunu kaldırır.<br><br><strong>Network Configuration:</strong><br><strong>Get-VirtualSwitch:</strong> Sanal anahtarları listeler.<br><strong>Get-VMHostNetworkAdapter:</strong> Ana bilgisayar ağ adaptörlerini listeler.<br><br><strong>Reports and Monitoring:</strong><br><strong>Get-Stat: Performans istatistiklerini alır.<br>Get-Event:</strong> VMware olaylarını alır.<br><strong>Get-AlarmDefinition: </strong>Uyarı tanımlarını listeler.<br><br><strong>User and Authorization:</strong><br><strong>Get-VIPermission:</strong> Yetkilendirmeleri listeler.<br><strong>New-VIPermission:</strong> Yeni bir yetkilendirme oluşturur.<br><strong>Remove-VIPermission: </strong>Yetkilendirmeyi kaldırır.<br><br><strong>vCenter Server Operations:</strong><br><strong>Get-VC:</strong> Mevcut vCenter sunucusunu alır.<br><strong>Connect-VIServer:</strong> vCenter sunucusuna veya ESXi ana bilgisayarına yeniden bağlanır.<br><br><strong>***Bunlar,bazı temel komutlardan sadece birkaçıdır. </strong><br>VMware PowerCLI, çok daha fazla komut içerir ve VMware vSphere ve vCenter ortamlarınızı otomasyonlaştırmanıza ve yönetmenize olanak tanır. <br>İhtiyaca göre özel komutlar ve betikler oluşturabilirsiniz.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong> Saygılarımla - Best regards</strong></p>
<!-- /wp:paragraph -->
