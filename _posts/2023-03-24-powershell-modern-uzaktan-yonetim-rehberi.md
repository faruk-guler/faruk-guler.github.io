---
layout: post
title: "PowerShell ile Modern Uzaktan Yönetim: Protokoller, Portlar ve Pratik Komut Rehberi"
date: 2023-03-24 00:16
author: faruk-guler
comments: true
categories: [PowerShell, Sistem Yönetimi]
---

<!-- markdownlint-disable MD033 -->
<img src="https://farukguler.com/assets/post_images/powershell-scripting.jpg" alt="PowerShell Modern Uzaktan Yönetim ve Betik Mimarisi" width="520" style="display: block; margin: 20px 0; max-width: 100%; height: auto;" />
<!-- markdownlint-enable MD033 -->
*Windows sistem yönetiminde modern protokoller, standartlar ve PowerShell araçları.*

Windows tabanlı sistemlerde ve kurumsal ortamlarda sistem yöneticiliği yaparken sistemleri uzaktan yönetmek, envanter toplamak ve güvenli iletişim kurmak için kullanılan temel mimari bileşenler şunlardır: **CIM (WMI Veri Modeli)**, **WinRM**, **PSRemoting**, **OpenSSH**, **PowerShell Direct**, **JEA**, **CredSSP**, **RPC** ve **SMB**. Bu rehberde; protokollerin çalışma mantığını, güvenlik duvarı (Firewall) port yapılandırmalarını, toplu sunucu yönetimini, sahada karşılaşılan Double-Hop ve Workgroup gibi kritik senaryoların çözümlerini ve doğrudan üretim ortamında kullanabileceğiniz pratik komutları bulabilirsiniz.

---

## 1. Mimari Genel Bakış: Hangisi Ne İşe Yarar?

Modern uzaktan yönetim mimarisi 4 temel katman üzerinden çalışır:

| Katman | Kavram / Teknoloji | Görevi ve Tanımı | Kullanım Alanı |
| :--- | :--- | :--- | :--- |
| **1. Bilgi Deposu (Veri Modeli)** | **CIM & WMI** | İşletim sisteminin donanım, yazılım, servis ve kullanıcı gibi tüm kaynaklarını sınıflar halinde tutan standart veri modelidir. | Sistem & Donanım Envanteri |
| **2. Taşıyıcı Protokol (Ağ Tüneli)** | **WinRM, WS-Man, OpenSSH, RPC** | İstemci ile sunucu arasındaki veri aktarımını sağlayan ağ iletişim protokolleridir. | Ağ İletişimi & Şifreleme |
| **3. Oturum Yeteneği** | **PSRemoting** | PowerShell'in uzaktaki makinede etkileşimli oturum açma veya komut yürütme altyapısıdır (Windows'un SSH kabuğu gibi). | Uzaktan Konsol & Script Yürütme |
| **4. Yönetim Araçları (İstemci)** | **Get-CimInstance, Invoke-Command, Enter-PSSession** | Yöneticinin doğrudan çalıştırdığı modern PowerShell komut satırı araçlarıdır. | Yönetici Konsolu |

---

## 2. Temel Kavramlar ve Tanımlar

- **CIM (Common Information Model) & WMI:** DMTF tarafından belirlenmiş açık standartlı veri modelidir. Donanım, işletim sistemi ayarları ve süreçler gibi sistem kaynaklarını standart sınıflar altında sunar. Modern PowerShell dünyasında tüm veri sorgulamaları **CIM cmdlet'leri (`Get-CimInstance`, `Invoke-CimMethod` vb.)** ile doğrudan modern ve firewall dostu **WinRM** protokolü üzerinden yürütülür.
- **WinRM (Windows Remote Management):** Microsoft'un WS-Management protokolünü uygulayan yerel uzaktan yönetim servisidir. Windows sistemlerin uzaktan standart ve güvenli portlar üzerinden yönetilmesini sağlar.
- **PSRemoting (PowerShell Remoting):** PowerShell'in uzak bilgisayarlar üzerinde etkileşimli konsol açma (`Enter-PSSession`) ve uzaktan tekil veya toplu script blokları çalıştırma (`Invoke-Command`) yeteneğidir. PSRemoting varsayılan olarak **WinRM** protokolünü kullanır.
- **PowerShell Direct:** Hyper-V ana makinesinden sanal makinelere (VM) ağ bağlantısı, IP adresi veya güvenlik duvarı kuralına ihtiyaç duymadan doğrudan Hyper-V VMBus üzerinden bağlanan özel yönetim kanalıdır.
- **JEA (Just Enough Administration):** Kullanıcılara tam yerel yönetici hakkı vermek yerine, yalnızca izin verilen PowerShell komutlarını ve parametrelerini çalıştırmalarını sağlayan rol tabanlı güvenlik (RBAC) altyapısıdır.
- **WS-Management (WS-Man):** Sistemler arasında SOAP ve XML tabanlı web servisleri mesajlaşmasıyla yönetim verisi transferi sağlayan açık web protokolüdür. WinRM, bu protokolün Microsoft implementasyonudur.
- **OpenSSH (SSH Remoting):** PowerShell 7+ ile birlikte yerel olarak desteklenen, Windows ve Linux karma ortamlarında anahtar tabanlı güvenli kimlik doğrulama sunan endüstri standardı uzaktan yönetim protokolüdür (Port 22).
- **CredSSP (Credential Security Support Provider):** Bir sunucudan başka bir sunucuya atlama yapılırken (Double-Hop senaryolarında) kimlik bilgilerinin güvenli bir şekilde devredilmesini sağlayan kimlik doğrulama mekanizmasıdır.
- **RPC (Remote Procedure Call):** Bir programın ağ üzerindeki başka bir bilgisayarda kod çalıştırmasını sağlayan alt seviye işletim sistemi iletişim protokolüdür. Modern sistemlerde yönetim trafiği doğrudan RPC yerine güvenlik duvarı dostu WinRM üzerinden taşınır.
- **SMB (Server Message Block):** Windows ortamlarında dosya, yazıcı ve adlandırılmış boru (named pipe) paylaşımını sağlayan ağ protokolüdür (TCP 445). Uzak bilgisayarların yönetimsel disk paylaşımlarına (örn. `\\Sunucu\C$`) erişirken SMB protokolü devreye girer.

<!-- markdownlint-disable MD033 -->
<img src="https://farukguler.com/assets/post_images/p-remoting.jpg" alt="PowerShell Remoting Mimarisi ve İletişim Protokolleri" width="520" style="display: block; margin: 20px 0; max-width: 100%; height: auto;" />
<!-- markdownlint-enable MD033 -->
*WinRM, OpenSSH ve güvenli uzaktan yönetim ağ mimarisi.*

---

## 3. İletişim Portları ve Güvenlik Duvarı Rehberi

Uzak yönetim işlemlerinin güvenlik duvarına (Firewall) takılmaması için ilgili servislerin dinlediği varsayılan portlar:

| Protokol / Servis | Varsayılan Port | Taşıma & Şifreleme Durumu | Kullanım Alanı |
| :--- | :--- | :--- | :--- |
| **WinRM & WS-Man (HTTP)** | **TCP 5985** | HTTP protokolü taşır ancak Kerberos/NTLM ile paket yükü (payload) **AES-256 ile şifrelidir**. | Domain içi varsayılan WinRM / PSRemoting bağlantısı. |
| **WinRM & WS-Man (HTTPS)** | **TCP 5986** | TLS / SSL sertifikası ile uçtan uca şifreli HTTPS bağlantısı. | Güvenli / DMZ ve Workgroup WinRM bağlantıları. |
| **PSRemoting (SSH)** | **TCP 22** | OpenSSH anahtar veya parola şifrelemesi. | PowerShell 7+ karma (Windows/Linux) ortamlar. |
| **CIM Cmdlet'leri** | **TCP 5985 / 5986** | Varsayılan olarak WinRM kullanır; firewall üzerinden kolayca geçer. | Modern PowerShell CIM sorguları. |
| **SMB (Dosya Paylaşımı)** | **TCP 445** | SMB 3.x şifreleme destekli dosya paylaşım protokolü. | Yönetimsel paylaşımlar (C$, Admin$, dosya yazma). |
| **PowerShell Direct** | **Port Yok (VMBus)** | Donanım veriyolu üzerinden izole kanal; ağ ve firewall gerektirmez. | Hyper-V Host'tan Sanal Makine (VM) yönetimi. |
| **RPC Endpoint Mapper** | **TCP 135** | RPC tabanlı alt servisler ve eski entegrasyonlar. | İşletim sistemi çekirdek servis iletişimi. |
| **RPC Dinamik Portları** | **TCP 49152 - 65535** | RPC oturumlarında dinamik tahsis edilen port aralığı. | Özel RPC servis trafiği. |

> **Not:** Belirtilen portlar varsayılan değerlerdir. Kurumsal ağlarda sistem yöneticileri bu portları özelleştirebilir veya IP bazlı erişim listeleriyle (ACL) sınırlandırabilir.

---

## 4. Hızlı Donanım ve Sistem Envanteri Sorgulama (Temel CIM Sınıfları)

Sistem yöneticilerinin en sık ihtiyaç duyduğu donanım ve sistem bileşenlerini sorgulamak için kullanılan temel CIM sınıfları ve doğrudan çalıştırabileceğiniz hazır PowerShell komutları:

| Bileşen / Kaynak | İlgili CIM Sınıfı | Hazır PowerShell Komutu |
| :--- | :--- | :--- |
| **İşlemci (CPU)** | `Win32_Processor` | `Get-CimInstance Win32_Processor \| Select-Object Name, NumberOfCores, MaxClockSpeed` |
| **BIOS & Seri No** | `Win32_Bios` | `(Get-CimInstance Win32_Bios).SerialNumber` |
| **Anakart Modeli** | `Win32_BaseBoard` | `(Get-CimInstance Win32_BaseBoard).Product` |
| **Fiziksel Diskler** | `Win32_DiskDrive` | `Get-CimInstance Win32_DiskDrive \| Select-Object Model, Size, MediaType` |
| **Bellek (RAM Toplamı)** | `Win32_PhysicalMemory` | `(Get-CimInstance Win32_PhysicalMemory \| Measure-Object Capacity -Sum).Sum / 1GB` |
| **İşletim Sistemi** | `Win32_OperatingSystem` | `Get-CimInstance Win32_OperatingSystem \| Select-Object Caption, Version, OSArchitecture` |
| **Ekran Kartı (GPU)** | `Win32_VideoController` | `Get-CimInstance Win32_VideoController \| Select-Object Name, DriverVersion` |
| **Aktif IP Yapılandırması** | `Win32_NetworkAdapterConfiguration` | `Get-CimInstance Win32_NetworkAdapterConfiguration -Filter "IPEnabled = True" \| Select-Object Description, IPAddress` |

---

## 5. Her Kavram ve Protokol İçin Hazır PowerShell Komutları

Rehberde adı geçen tüm protokol, servis ve kavramlar için sistem yöneticilerinin günlük işlerde doğrudan kullanabileceği komut örnekleri:

### A. Bağlantı, Port ve Protokol Test Komutları (Troubleshooting)

**1. WinRM ve WS-Management servisinin yanıt verip vermediğini test etme:**

```powershell
Test-WSMan -ComputerName "MUHASEBE-03"
```

**2. WinRM HTTP (5985) portunun ağ üzerinden açık olduğunu doğrulama:**

```powershell
Test-NetConnection -ComputerName "MUHASEBE-03" -Port 5985
```

**3. RPC Endpoint Mapper (135) port erişimini test etme:**

```powershell
Test-NetConnection -ComputerName "MUHASEBE-03" -Port 135
```

**4. SMB (445) dosya paylaşım port erişimini test etme:**

```powershell
Test-NetConnection -ComputerName "MUHASEBE-03" -CommonTCPPort SMB
```

### B. WinRM ve PSRemoting Oturum Yönetimi

**5. Sunucuda WinRM ve PSRemoting servisini aktif edip güvenlik duvarını açma:**

```powershell
Enable-PSRemoting -Force
```

**6. WinRM (Port 5985) üzerinden uzak makinede etkileşimli konsol açma:**

```powershell
Enter-PSSession -ComputerName "MUHASEBE-03"
```

**7. PowerShell 7+ ile OpenSSH (Port 22) üzerinden etkileşimli konsol açma:**

```powershell
Enter-PSSession -HostName "MUHASEBE-03" -UserName "admin"
```

**8. Kalıcı oturum (PSSession) açma ve SMB kapalıyken WinRM tünelinden dosya kopyalama:**

```powershell
$session = New-PSSession -ComputerName "MUHASEBE-03"
Copy-Item -Path "C:\LocalScript.ps1" -Destination "C:\Temp\" -ToSession $session
Remove-PSSession -Session $session
```

### C. Uzaktan Komut ve Script Yürütme (Invoke-Command)

**9. Uzak bilgisayarda en çok CPU kullanan ilk 10 işlemi listeleme:**

```powershell
Invoke-Command -ComputerName "MUHASEBE-03" -ScriptBlock { 
    Get-Process | Sort-Object -Property CPU -Descending | Select-Object -First 10 
}
```

**10. Uzak bilgisayardaki bir servisi kontrol etme ve yeniden başlatma:**

```powershell
Invoke-Command -ComputerName "MUHASEBE-03" -ScriptBlock {
    Get-Service -Name "Spooler" | Restart-Service -Force -PassThru
}
```

**11. Uzak sunucuda yüklü yazılımları güvenli Registry yoluyla listeleme:**

```powershell
Invoke-Command -ComputerName "MUHASEBE-03" -ScriptBlock {
    Get-ItemProperty HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*,
                     HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* |
    Where-Object DisplayName |
    Select-Object DisplayName, DisplayVersion, Publisher, InstallDate
}
```

**12. Uzak makinedeki aktif TCP ağ bağlantılarını çekme:**

```powershell
Invoke-Command -ComputerName "MUHASEBE-03" -ScriptBlock {
    Get-NetTCPConnection | Where-Object { $_.State -eq "Established" } | 
    Select-Object LocalAddress, LocalPort, RemoteAddress, RemotePort, OwningProcess
}
```

### D. CIM Oturumu ve Sistem Sorgulama (Get-CimInstance & Invoke-CimMethod)

**13. Tekrarlayan sorgular için WinRM tabanlı kalıcı CIM Oturumu açma:**

```powershell
$cim = New-CimSession -ComputerName "MUHASEBE-03"
Get-CimInstance -CimSession $cim -ClassName Win32_OperatingSystem | Select-Object Caption, Version
```

**14. WinRM kapalı sistemler için DCOM/RPC üzerinden CIM Oturumu açma:**

```powershell
$dcomOption = New-CimSessionOption -Protocol Dcom
$cimDcom = New-CimSession -ComputerName "MUHASEBE-03" -SessionOption $dcomOption
Get-CimInstance -CimSession $cimDcom -ClassName Win32_OperatingSystem
```

**15. Uzak makinenin donanım ve üretici özetini çekme:**

```powershell
Get-CimInstance -ClassName Win32_ComputerSystem -ComputerName "MUHASEBE-03" | 
    Select-Object Name, Manufacturer, Model, TotalPhysicalMemory, PrimaryOwnerName
```

**16. Disk kullanım oranlarını ve boş alanları (GB) hesaplama:**

```powershell
Get-CimInstance -ClassName Win32_LogicalDisk -ComputerName "MUHASEBE-03" -Filter "DriveType=3" |
    Select-Object DeviceID, 
                  @{Name="Size(GB)";Expression={[math]::Round($_.Size/1GB,2)}}, 
                  @{Name="FreeSpace(GB)";Expression={[math]::Round($_.FreeSpace/1GB,2)}}
```

**17. Yerel kullanıcı hesaplarını listeleme:**

```powershell
Get-CimInstance -ClassName Win32_UserAccount -ComputerName "MUHASEBE-03" | 
    Select-Object Name, Caption, AccountType, Disabled, PasswordRequired
```

**18. Uzak bilgisayarda açık olan kullanıcı oturumunu zorla sonlandırma (Method Call):**

```powershell
Invoke-CimMethod -ClassName Win32_OperatingSystem -MethodName Win32Shutdown -Arguments @{Flags = 4} -ComputerName "MUHASEBE-03"
```

### E. Olay Günlükleri ve SMB Dosya Yönetimi

**19. Sistem Olay Günlüğünden son 50 kaydı hızlıca çekme (Get-WinEvent):**

```powershell
Get-WinEvent -FilterHashtable @{LogName='System'} -MaxEvents 50 -ComputerName "MUHASEBE-03" | 
    Select-Object TimeCreated, Id, LevelDisplayName, Message
```

**20. Güvenlik günlüğünden başarılı kullanıcı oturum açma (Event ID 4624) kayıtlarını süzme:**

```powershell
Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4624; StartTime=(Get-Date).AddDays(-7)} |
    Where-Object { $_.Properties[5].Value -eq 'ahmet.yilmaz' } |
    Select-Object TimeCreated, Id, Message
```

**21. SMB (Port 445) üzerinden uzak bilgisayara dosya ve veri yazma:**

```powershell
$remotePath = "\\MUHASEBE-03\C$\Temp\config.json"
$configData = @{ Environment = "Production"; Version = "1.2.0"; UpdatedBy = "Admin" } | ConvertTo-Json
Set-Content -Path $remotePath -Value $configData
```

### F. Toplu Sunucu Yönetimi ve Performans Optimizasyonu (Scale & Performance)

**22. Yüzlerce sunucuya paralel komut gönderme ve iş parçacığı havuzunu sınırlama (-ThrottleLimit):**

```powershell
# Bir metin dosyasındaki sunucu listesini okuyup aynı anda en fazla 30 iş parçacığı ile komut yürütme
$servers = Get-Content -Path "C:\Admins\ServerList.txt"
Invoke-Command -ComputerName $servers -ThrottleLimit 30 -ScriptBlock {
    Get-Service -Name "wuauserv" | Select-Object Status, StartType
}
```

**23. Uzun süren uzaktan yönetim görevlerini arka plan işine (-AsJob) devretme:**

```powershell
# Uzak sunucuda arka planda komut başlatma (konsolu kilitlemez)
$job = Invoke-Command -ComputerName "MUHASEBE-03" -ScriptBlock {
    Start-Sleep -Seconds 60
    Get-Volume
} -AsJob -JobName "DiskKontrolGorevi"

# Arka plan işlerinin durumunu kontrol etme ve çıktıyı alma
Get-Job -Name "DiskKontrolGorevi"
Receive-Job -Name "DiskKontrolGorevi" -Keep
```

**24. PowerShell 7+ ile ForEach-Object -Parallel kullanarak çok çekirdekli CIM sorgusu:**

```powershell
# Yerel işlemci çekirdeklerini kullanarak çoklu CIM sorgularını paralel koşturma
$servers = @("SUNUCU-01", "SUNUCU-02", "SUNUCU-03", "SUNUCU-04")
$servers | ForEach-Object -Parallel {
    $os = Get-CimInstance -ComputerName $_ -ClassName Win32_OperatingSystem
    [PSCustomObject]@{
        Server = $_
        OS     = $os.Caption
        Uptime = (Get-Date) - $os.LastBootUpTime
    }
} -ThrottleLimit 10
```

### G. Oturum Sürekliliği (Disconnected Sessions) ve Kaynak Kotaları

**25. Uzak sunucuda çalışan oturumu bağlantıyı keserek (Disconnect) açık bırakma:**

```powershell
# Uzun sürecek bir işlem başlatıp oturumu arka planda çalışmaya bırakarak bağlantıyı koparma
$session = New-PSSession -ComputerName "MUHASEBE-03" -Name "YedeklemeOturumu"
Invoke-Command -Session $session -ScriptBlock { Start-Process -FilePath "C:\backup.bat" -Wait } -InDisconnectedSession
```

**26. Kesilmiş (Disconnected) oturuma başka bir bilgisayardan yeniden bağlanma:**

```powershell
# Uzak makinedeki açık/bekleyen oturumları sorgulama ve kaldığı yerden bağlanma
Get-PSSession -ComputerName "MUHASEBE-03"
Connect-PSSession -ComputerName "MUHASEBE-03" -Name "YedeklemeOturumu"
```

**27. WinRM oturum başı bellek limitini (MaxMemoryPerShellMB) artırma:**

```powershell
# Büyük veri sorgularında "Bellek yetersiz" hatasını önlemek için 1024 MB sınırını 2048 MB'a yükseltme
Set-Item -Path "WSMan:\localhost\Shell\MaxMemoryPerShellMB" -Value 2048
Restart-Service -Name WinRM
```

### H. Sanallaştırma ve Konteyner Yönetimi (PowerShell Direct & Container)

**28. Hyper-V Sanal Makinesine IP ve ağ kartı olmadan doğrudan erişme (PowerShell Direct):**

```powershell
# Ağ katmanını ve güvenlik duvarını tamamen atlayarak Hyper-V VMBus üzerinden VM içine bağlanma
Enter-PSSession -VMName "Database-VM" -Credential (Get-Credential)
```

**29. Windows Container veya Docker içerisine PowerShell ile doğrudan bağlanma:**

```powershell
# Belirli bir konteyner ID'si üzerinden doğrudan izole ortama girme
Enter-PSSession -ContainerId "c1a2b3c4d5e6" -RunAsAdministrator
```

### I. Çapraz Platform ve OpenSSH ile Güvenli Bağlantı (PowerShell 7+)

**30. SSH anahtarı (Key-based) kullanarak Linux veya Windows sunucuda PSRemoting oturumu açma:**

```powershell
# Parola girmeden Ed25519 özel anahtarı ile güvenli SSH Remoting konsolu başlatma
Enter-PSSession -HostName "192.168.1.100" -UserName "sysadmin" -KeyFilePath "~/.ssh/id_ed25519"
```

**31. SSH üzerinden uzak sunucuda tek satırda script bloğu çalıştırma:**

```powershell
Invoke-Command -HostName "192.168.1.100" -UserName "sysadmin" -KeyFilePath "~/.ssh/id_ed25519" -ScriptBlock {
    uname -a; uptime
}
```

---

## 6. Sahadan Gerçek Dünya Senaryoları ve İleri Düzey Çözümler

### 6.1. "Double-Hop" (Çift Sıçrama) Problemi ve Çözümü

Sistem yöneticilerinin uzaktan yönetim yaparken en sık karşılaştığı kısıtlama **Double-Hop** sorunudur.

- **Sorun Nedir?** Bilgisayarınızdan **Sunucu-A**'ya WinRM ile bağlandığınızda kimliğiniz Kerberos ile doğrulanır. Ancak Sunucu-A üzerindeyken **Sunucu-B**'deki bir dosya paylaşımına (`\\Sunucu-B\Yedek`) veya SQL veritabanına erişmeye çalıştığınızda varsayılan olarak `Access is Denied` hatası alırsınız. Çünkü Kerberos varsayılan güvenlik kuralı gereği kimlik bilginizi ikinci bir uzak noktaya otomatik olarak devretmez.
- **Çözüm 1: CredSSP (Credential Security Support Provider) Kullanımı:**
  İstemci ve hedef sunucu üzerinde CredSSP devredilmesini etkinleştirerek kimlik bilgilerinin ikinci sıçramaya aktarılması sağlanır:

```powershell
# 1. İstemci bilgisayarda CredSSP istemci rolünü ve hedef sunucu desenini onaylama:
Enable-WSManCredSSP -Role Client -DelegateComputer "*.sirket.local" -Force

# 2. Hedef sunucuda (Sunucu-A) CredSSP sunucu rolünü aktif etme:
Enable-WSManCredSSP -Role Server -Force

# 3. İstemciden CredSSP kimlik doğrulaması ile komut yürütme:
Invoke-Command -ComputerName "Sunucu-A.sirket.local" -Authentication CredSSP -Credential (Get-Credential) -ScriptBlock {
    Get-ChildItem -Path "\\Sunucu-B.sirket.local\Yedek"
}
```

- **Çözüm 2: Modern Yaklaşım (RBCD):**
  Kurumsal Active Directory ortamlarında CredSSP yerine **Kaynak Tabanlı Kısıtlı Yetkilendirme (Resource-Based Constrained Delegation - RBCD)** yapılandırılarak kimlik bilgileri istemciden hedef sunucuya açık metin taşınmadan güvenli delegasyon sağlanır.

---

### 6.2. Domain Dışı (Workgroup) Sunucuların Yönetimi ve `TrustedHosts`

Active Directory olmayan veya farklı bağımsız çalışma gruplarındaki (Workgroup) sunuculara WinRM ile bağlanırken Kerberos karşılıklı güveni bulunmadığı için bağlantı reddedilir.

- **Çözüm:** İstemci makinenin WinRM yapılandırmasındaki `TrustedHosts` listesine hedef IP veya isimlerin eklenmesi gerekir:

```powershell
# 1. İstemci makinede TrustedHosts listesine uzak sunucunun IP adresini ekleme:
Set-Item -Path "WSMan:\localhost\Client\TrustedHosts" -Value "192.168.1.50,192.168.1.51" -Concatenate -Force

# 2. Güncel güvenilen host listesini kontrol etme:
Get-Item -Path "WSMan:\localhost\Client\TrustedHosts"

# 3. Workgroup ortamında yerel kullanıcı kimliği ile oturum açma:
Enter-PSSession -ComputerName "192.168.1.50" -Credential (Get-Credential)
```

> **Güvenlik Notu:** `TrustedHosts` değerine asla genel ağlarda `*` (yıldız) atamayın. Yalnızca yönetmek istediğiniz spesifik IP adreslerini veya FQDN isimlerini virgülle ayırarak ekleyin.

---

### 6.3. DMZ ve Güvensiz Ağlar İçin WinRM HTTPS (Port 5986) Listener Kurulumu

Firewall arkasında, DMZ bölgesinde veya genel ağ üzerinden yönetilecek sunucularda HTTP (Port 5985) yerine TLS/SSL sertifikalı HTTPS dinleyicisi kurulmalıdır:

```powershell
# 1. Sunucu üzerinde geçerli bir Server Authentication sertifikası oluşturma (veya CA sertifikası alma):
$cert = New-SelfSignedCertificate -DnsName "sunucu.sirket.com" -CertStoreLocation "Cert:\LocalMachine\My"

# 2. Sertifika parmak izini kullanarak HTTPS dinleyicisini (TCP 5986) tanımlama:
New-Item -Path WSMan:\LocalHost\Listener -Transport HTTPS -Address * -CertificateThumbprint $cert.Thumbprint -Force

# 3. Güvenlik duvarında 5986 portuna izin verme:
New-NetFirewallRule -DisplayName "WinRM HTTPS Port 5986" -Direction Inbound -LocalPort 5986 -Protocol TCP -Action Allow

# 4. İstemciden HTTPS protokolü üzerinden güvenle bağlanma:
Enter-PSSession -ComputerName "sunucu.sirket.com" -UseSSL -Credential (Get-Credential)
```

---

### 6.4. JEA (Just Enough Administration) ile Sıfır Güven (Zero Trust) Yönetimi

Klasik sistem yönetiminde destek uzmanlarına sunucu üzerinde tam "Local Administrator" yetkisi vermek büyük bir güvenlik açığıdır. **JEA**, kullanıcıya yalnızca işini yapmaya yetecek kadar yetki verir.

- **Çalışma Mantığı:**
  1. **Role Capability (`.psrc`):** Kullanıcının çalıştırabileceği cmdlet'ler ve parametreler filtrelenir (Örn: Sadece `Restart-Service -Name Spooler` serbest, `Stop-Service` yasak).
  2. **Session Configuration (`.pssc`):** Bu rolün hangi Active Directory grubuna atanacağı ve arka planda hangi sanal yüksek yetkili hesapla çalıştırılacağı tanımlanır.

```powershell
# 1. Sunucu tarafında hazırlanan JEA yapılandırma dosyasını (.pssc) uç nokta olarak kaydetme:
Register-PSSessionConfiguration -Name "ServisYonetimUcu" -Path "C:\JEA\ServisYonetimi.pssc" -Force

# 2. Yetkilendirilmiş kullanıcının kısıtlı JEA uç noktasına bağlanması:
Enter-PSSession -ComputerName "MUHASEBE-03" -ConfigurationName "ServisYonetimUcu"
```

Bu oturumda kullanıcı `Get-Process` veya yetkisi dışındaki herhangi bir komutu çalıştırmayı denediğinde komut sistem tarafından tanınmaz ve engellenir.

---

### 6.5. Güvenlik Denetimi: Script Block Logging ve Transcription

Kurumsal ortamlarda uzaktan çalıştırılan tüm betiklerin denetlenmesi ve SIEM sistemlerine aktarılması siber güvenlik standardıdır.

- **Script Block Logging (Olay ID 4104):**
  PowerShell motorunun bellekte derlediği ve yürüttüğü her komut bloğu doğrudan `Microsoft-Windows-PowerShell/Operational` günlüğüne kaydedilir. Gizlenmiş (obfuscated) saldırı kodları bile çözüldükten sonra ham haliyle yakalanır.
- **PowerShell Transcription:**
  Oturum boyunca ekrana gelen ve girilen her karakterin belirlenen merkezi bir ağ paylaşımına `.txt` dosyası olarak kaydedilmesini sağlar.

```powershell
# 1. Script Block Logging (Olay ID 4104) özelliğini Kayıt Defteri üzerinden aktif etme:
$logPath = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging"
if (-not (Test-Path $logPath)) { New-Item -Path $logPath -Force }
Set-ItemProperty -Path $logPath -Name "EnableScriptBlockLogging" -Value 1 -Type DWord

# 2. Transcription (Tüm konsol trafiğini merkezi bir paylaşıma metin olarak kaydetme):
$transPath = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\Transcription"
if (-not (Test-Path $transPath)) { New-Item -Path $transPath -Force }
Set-ItemProperty -Path $transPath -Name "EnableTranscripting" -Value 1 -Type DWord
Set-ItemProperty -Path $transPath -Name "OutputDirectory" -Value "\\LogServer\PSTranscripts" -Type String
```

---

## 7. Hızlı Sorun Giderme: En Sık Karşılaşılan WinRM Hataları ve Teşhis Rehberi

Uzak yönetim sırasında bir hata ile karşılaşıldığında sorunun ağdan mı, kimlik doğrulamasından mı yoksa servis yapılandırmasından mı kaynaklandığını tespit etmek için aşağıdaki tablodan yararlanabilirsiniz:

| Karşılaşılan Hata / Belirti | Temel Neden | Çözüm Adımı |
| :--- | :--- | :--- |
| **0x803380E4 (WSMAN_STATUS_TIMEDOUT)** | Sunucuya ulaşılamıyor veya Firewall 5985 portunu engelliyor. | `Test-NetConnection -ComputerName HEDEF -Port 5985` ile portu test edin; sunucuda `Enable-PSRemoting -Force` çalıştırın. |
| **0x8009030E / Access is Denied** | Kimlik doğrulama reddedildi veya Workgroup ortamında Kerberos arandı. | Domain ortamında FQDN kullanın; Workgroup ise istemcide IP'yi `TrustedHosts` listesine ekleyin. |
| **Connecting to remote server failed (Client cannot connect)** | WinRM servisi durmuş veya dinleyici (listener) silinmiş. | Sunucuda `winrm quickconfig` çalıştırarak dinleyicileri yeniden oluşturun ve servisi başlatın. |
| **MaxMemoryPerShellMB quota exceeded** | Oturum için ayrılan RAM limiti aşıldı. | `Set-Item WSMan:\localhost\Shell\MaxMemoryPerShellMB -Value 2048` ile kotayı artırın. |
| **The SSL connection cannot be established** | 5986 HTTPS sertifikasının adı sunucu adı ile uyuşmuyor veya geçersiz. | Sertifikanın CN/SAN adını kontrol edin; istemcide CA kök sertifikasının yüklü olduğunu doğrulayın. |

### WinRM Servis Teşhis ve Doğrulama Komutları

Sunucu tarafındaki WinRM altyapısını yerel olarak doğrulamak için komut satırından çalıştırabileceğiniz temel araçlar:

```powershell
# 1. Aktif dinleyicileri (HTTP 5985 / HTTPS 5986) listeleme:
winrm enumerate winrm/config/listener

# 2. Tüm WinRM istemci ve servis ayarlarını dökme:
winrm get winrm/config

# 3. Uzak sunucunun WS-Management kimliğini ve sürümünü test etme:
winrm id -r:MUHASEBE-03
```

---

## 8. Sistem Yöneticileri İçin 10 Altın Kural

1. **CIM Standartlarını Kullanın:** Tüm envanter ve veri çekme operasyonlarınızda doğrudan `Get-CimInstance` kullanın. WinRM üzerinden çalıştığı için modern güvenlik duvarlarından kolayca geçer ve yüksek performans sunar.
2. **Yazılım Envanterinde Registry'i Tercih Edin:** Canlı sistemlerde yazılım listesi toplarken sunucu performansını korumak için doğrudan Kayıt Defteri (Uninstall) yollarını sorgulayın.
3. **WinRM Şifreleme Mekanizmasını Bilin:** Port 5985 (HTTP) adından dolayı şifresiz sanılsa da Active Directory ortamında Kerberos/NTLM ile paket yükü AES-256 ile şifrelenir. DMZ ve Workgroup ağlarında ise Port 5986 (HTTPS) veya OpenSSH (Port 22) tercih edin.
4. **Ağ Portlarını Sıkılaştırın:** WinRM altyapısına geçildiğinde, güvenlik duvarında geniş dinamik RPC port aralıklarını (TCP 49152-65535) açık tutma zorunluluğu ortadan kalkar; sadece gerekli yönetim portlarını açarak saldırı yüzeyini daraltın.
5. **Protokolleri Görevine Göre Ayırın:** Dosya ve paylaşım erişimlerinde SMB (Port 445), oturum açma ve uzaktan komut yürütmede WinRM/PSRemoting (Port 5985/5986), veri sorgulamada ise CIM sınıflarını kullanın.
6. **Toplu Yönetimde ThrottleLimit Tanımlayın:** 50'den fazla sunucuya aynı anda komut gönderirken ağın ve yerel makinenin tıkanmaması için `-ThrottleLimit` parametresiyle iş parçacığı havuzunu kontrol altında tutun.
7. **Uzun Süren Görevleri Arka Plana Devredin:** Saatler süren yedekleme veya analiz scriptlerinde konsolunuzun kilitlenmemesi için `-AsJob` veya `Disconnect-PSSession` kullanın.
8. **Double-Hop Çözümünde Güvenliği Elden Bırakmayın:** CredSSP kullanırken yetki devrini genel desenler (`*`) yerine sadece belirli hedef sunucularla (`*.sirket.local`) sınırlandırın; mümkünse modern RBCD yaklaşımını tercih edin.
9. **En Az Yetki (Least Privilege) ve JEA Uygulayın:** Sunucu üzerinde rutin görevleri yürüten ekiplere yerel yönetici şifresi vermek yerine, sadece izin verilen komutları çalıştırabilecekleri JEA uç noktaları sağlayın.
10. **Tüm Yönetimsel Aktiviteleri Kayıt Altına Alın:** Kurumsal sunucularda Script Block Logging (Olay 4104) ve Transcription özelliklerini grup ilkesi (GPO) ile aktif ederek tüm uzaktan yürütülen işlemleri denetlenebilir kılın.

---

**Umarım faydalı bir başvuru kaynağı olmuştur. Sorularınızı ve katkılarınızı yorumlarda paylaşabilirsiniz!**
