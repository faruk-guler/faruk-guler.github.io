---
title: "GitHub Pages ve HUGO Kullanarak Ücretsiz Kişisel Blog Oluşturma"
date: 2024-11-30
# weight: 1
# aliases: ["/first"]
tags: ["GitHub Pages","HUGO"]
categories: ["Open-Source"]
author: "Furkan YILMAZ"
# author: ["Me", "You"] # multiple authors
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "GitHub Pages ve HUGO kullanarak, ücretsiz bir şekilde kendi kişisel blogunuzu oluşturabilirsiniz."
canonicalURL: "https://canonical.url/to/page"
disableHLJS: true # to disable highlightjs
disableShare: false
disableHLJS: false
hideSummary: false
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
ShowRssButtonInSectionTermList: true
UseHugoToc: true
ShowCodeCopyButtons: true
---

## Giriş 
İnternet üzerinde kendinizi göstermenin en güzeli kişisel bir blog sayfası oluşturmak olabilir. Aslında bunu yapmak için günümüzde popüler sosyal medya platformları ağırlıklı olarak kullanılıyor. Ancak benim gibi yazarak kendini ifade etmek isteyen, yazma becerilerini geliştirmek isteyen kişiler için **blog** halen en iyi seçenek gibi duruyor.

Blog yazmanın birçok farklı yöntemi var. Gerek ücretli, gerekse de ücretsiz olarak size en uygun seçeneği belirleyerek bir blog sayfası oluşturabilir ve yazmaya hemen başlayabilirsiniz. Bu yazımda ve video içeriğimde bizler GitHub Pages ve HUGO altyapısını kullanarak kişisel bir blog sayfası oluşturacağız.
##  Github Pages ve Hugo Kullanarak Ücretsiz Kişisel Blog Oluşturma - YouTube
{{< youtube O-Kxwi9PMV8 >}}

## GitHub Pages Nedir? 
GitHub Pages, GitHub kullanıcılarının kendi kişisel blog, CV veya proje web sitelerini barındırmasına olanak sağlayan bir hizmettir. GitHub üzerinden oluşturulan bir *repository (depo)* ile HTML, CSS ve JavaScript dosyalarından oluşan statik web sayfalarınızı yayınlamanıza olanak tanır. Peki, GitHub Pages'in avantajları nelerdir? 

- **Statik Web Site Oluşturma:** GitHubPages, statik web site oluşturmanıza olanak tanır. Yani sunucu taraflı işlemeye ihtiyaç duymayacağınız sayfaları barındırabilirsiniz. *Elbette bazı JavaScript kodlarıyla dinamik içerikler eklenebilir.* Bu durumun avantajı, özellikle web sitelerinin oldukça hafif ve hızlı yapıda olmalarını sağlamasıdır. Ancak dezavantaj olarak, yönetim paneli gibi bir durum söz konusu olmadığından düzenleme, güncelleme işlerinin anlık bir şekilde yapılamaması sayılabilir. 
- **Ücretsiz Barındırma Hizmeti:** GitHub Pages, kullanıcılarına ücretsiz bir şekilde web sitelerini barındırma hizmeti verir. Özellikle kişisel bloglar, portföyler, proje sayfaları vs. için oldukça ideal bir çözüm üretir. 
- **Kolay Kullanabilirlik:** GitHub Pages hizmetinin kullanımı aslında oldukça kolaydır. GitHub üzerinden bir depo oluşturup, *Markdown* belgeleriyle bile sayfanızı internete açmak mümkündür. 
- **Özelleştirilebilir Web Sayfaları:** Web sayfalarınızı yayınlamak için CSS ve JavaScript dosyaları kullanabiliyorsunuz. Bizim burada yaptığımız gibi **"Static Web Site Oluşturucu"** yazılımlarını kullanarak harika tema ve şablonlarla sayfalarınızı yayınlayabilirsiniz. 
- **Alan Adı (Domain) Desteği:** GitHub Pages, sizlere ücretsiz bir şekilde kullanabileceğiniz sub domain desteği sunuyor. Örneğin; *"https://kullanaciadiniz.github.io/"* şeklinde veya *"https://kullaniciadiniz.github.io/depoismi/"* şeklinde bir alan adına sahip olabiliyorsunuz. Aynı zamanda ücretli bir şekilde satın aldığınız domain uzantılarını da GitHub Pages ile kullanarak web sayfalarınızı özel bir alan adıyla yayına alabiliyorsunuz. 
### GitHub Pages Kullanım Limitleri Nedir? 
GitHub Pages, sizlere ücretsiz bir hizmet sunuyor sunmasına da elbette bunun için bir kullanım sınırı da belirliyor. Ancak bu sınırlar gözünüzü çok kokurtmasın. Zira biz *statik web site oluşturucu* kullanacağımızdan bu sınırlar bize fazlasıyla yetecektir. Peki, bu limitler nelerdir? *Bknz. [GitHub Pages Kullanım Limitleri](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#usage-limits)*
1. **Depo Alanı Sınırı:** GitHub, genel olarak depolarının toplam büyüklüğünün **1 GB**'dan fazla olmasına izin vermiyor. Bu da bizim web site boyutumuzun da bu sınırı aşmaması gerektiği anlamına geliyor. Eğer web sitenizde kullandığınız görsel, video vb. büyük boyutlu belgeleri deponuzda barındırmazsanız, HUGO altyapısında bu depolama alanı bize fazlasıyla yetecektir. Genel olarak HUGO'nın dosyaları ortalama **1-2 MB** arasında bir depolama alanı kaplıyor. Evet, şaşırtıcı olabilir ama durum gerçekten böyle! Peki, içeriklerimiz ne kadar alan kaplıyor? HUGO kullanırken içeriklerimizi *".md"* uzantısıyla yani *"Markdown"* kullanarak oluşturuyoruz. Blogunuzda yayınlamak için oluşturacağınız *1000 kelimelik* markdown belgesinin kaplayacağı alan ortalama **"10-15 KB** oluyor. Yani bu da demek oluyor ki; ortalama 1000 kelimelik yazacağınız **60 blog yazısı** toplamda sadece **1 MB** civarında bir yer kaplayacak.

> ⚠️ Hem depolama alanı hem de bant genişliği konusunda önem arz eden bir durum var! Daha önce de belirttiğimiz gibi eğer fotoğraf, video, resim vb. görsel içerikleri deponuzda barındırırsanız bu kullanım değerleri oldukça yüksek boyutlara çıkacaktır. Bu da kullanım durumunuza göre GitHub Pages sınırlarına çok daha kolay bir şekilde ulaşmanız anlamına gelir! Yapmanız gereken; fotoğraf, resim vb. içerikler için herhangi bir resim barındıcırı hizmeti kullanabilir veya kendi resim sunucunuzu oluşturubilirsiniz. Video gibi içerikleriniz için *YouTube, Vimeo* gibi platformları tercih edebilirsiniz. 

2. **Deployment ve Action Sınırları:** GitHub Pages üzerinde gerçekleştirdiğiniz işlemlerin deploy (dağıtım) süreleri **10** dakikayı aşmamalıdır. Yani tek seferde çok büyük bir dosya deploy ederseniz bu durum muhtemelen işlemin **zaman aşımına** uğraması anlamına gelecektir. Aynı zamanda yapacağınzı her değişiklik *"GitHub Actions"* iş akışı üzerinde bir veya birkaç işlem başlatacaktır. Saatlik olarak bu iş akışı liminitiniz ise **10** olarak sınırlandırılmıştır. 

3. **Bant Genişliği Sınırı:** GitHub Pages hizmeti aylık ortalama **100 GB** bir bant genişliği sağlar. Bu limit daha önce de bahsettiğimiz şartlar altında, amaca uygun bir kullanım için oldukça yeterlidir. Kendi sayfalarım üzerinden baktığımda; sayfalarımın ortalama yüklenme boyutu **"35-40 KB"** olarak görünmekte. Ortalama bir blog sayfası üzerinden hesap edersek; günde *5000 sayfa gösterimi* aldığımda aylık olarak tüketeceğim bant genişliği yaklaşık **10-15 GB** civarında olacaktır. Gördüğünüz üzere amaca uygun bir kullanımda sınırlara yaklaşmanız bile söz konusu olmuyor! 

## HUGO Nedir? 
Aslına bakarsanız HUGO hakkında çok fazla şey yazmak mümkün... Ancak biz sadece yüzeysel olarak üzerinde duracağız. Hugo, oldukça hızlı ve modern yapıya sahip olan bir **statik web site oluşturucu** desek tanımı yapmış oluruz sanırım. Hugo, içeriklerinizi hazırlamanız için "Markdown" desteği sunuyor. Bu yüzden oldukça zengin içerikleri kolaylıkla hazırlayabiliyorsunuz. Aynı zamanda birçok alanda kullanabileceğiniz, gelişmiş temaları da içerisinde barındırıyor. *Bknz. [HUGO Themes](https://themes.gohugo.io/)*

### Lokal HUGO Kurulumu
HUGO ve Github Pages kullanarak kişisel bir blog oluşturmanın en pratik yolu, öncelikli olarak HUGO'yu lokalinize kurmaktan geçiyor. Ben Fedora sistemi üzerinden kurulum yapacağım. Eğer Windows kullanıyorsanız; [Install HUGO on Windows](https://gohugo.io/installation/windows/) dökümanından faydalanabilirsiniz. 

Öncelikli olarak HUGO'yu özelleştirmek ve Github depomuz ile arasındaki bağlantıyı kurabilmek için **"Git"** kurulumu yapmamız gerekiyor. Bunun için terminale şu komutu yazın;
```properties
sudo dnf install git
```
#### HUGO Tema Seçimi ve Blog Kurulumu
HUGO kurulumuna geçmeden önce, kullanmak istediğiniz temayı belirlemeniz çok daha iyi olacaktır. Temanın kurulum yönergelerine göre alt yapınızı oluşturmanız, temanın düzgün bir şekilde çalışması ve kolay yönetilebilmesi için önemlidir. Biz tema olarak [Papermod](https://github.com/adityatelange/hugo-PaperMod) kullanacağız. Örneğin; PaperMod'un yapımcısı bizlere HUGO kurulumunu "YAML" formatında yapmamızın, dosyaların okunması ve kullanımı hakkında çok daha rahat olacağını belirtiyor. YAML formatında yeni bir HUGO blog kurulumu için terminale şu komutu girmemiz gerekiyor;
```properties
hugo new site BenimBlogum --format yaml
# Burada "BenimBlogum" yazan yeri kendinize göre değiştirmeniz gerekiyor.
```
> ℹ️ Tema yükleme işlemine geçmeden önce terminal üzerinde kendi blog klasörünüzde Git ilişkilendirilmesini ayarlamanız gerekiyor. Bunun için **"git init"** komutunu klasör içerisinde çalıştırmalısınız.

Daha sonrasında PaperMod temasının kurulumuna geçeceğiz. Bunun için geliştiricinin önerdiği şekilde "Git Submodule" ile kurulum gerçekleştireceğiz;
```properties
git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
git submodule update --init --recursive 
```
Ardından HUGO blogunuzun kurulu olduğu dizinde şu komutu çalıştırın; 
```properties
git submodule update --remote --merge
```
Tema dosyaları kendi klasörümüze yüklendiğine göre artık "config" dosyası yapılandırma işlemine geçebiliriz. Klasörünüzde bulunan **"hugo.yaml"** isimli dosyaya şu satırı eklemeniz gerekiyor;

```properties
theme: ["PaperMod"]
```

Bu ayarlamayı yaptıktan sonra, başka hiç bir şey yapmadan HUGO bloğumuzun aktif bir şekilde lokalde çalışıyor olması gerekiyor. Bunu test etmek için terminalde hugo kurulumu yaptığımız klasörde şu komutu yazıyoruz; 
```properties
hugo serve
```

![Lokal Bağlantı Adresi GÖrseli](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhCZISmECoQjICk4829oxOSBRtVHduMeI0MBYVXZusJf0W0ZKIcELugayeBN2vwghUA-CYNE99Q51073zgFWLb9fzXEravc5ubOR-2uQany7eusdj8GahmWbAC70Kb58hMZDVVIumzbIqiZ2_rBBG16QpvliGMCWStEq0o7V6Rz3zj9116qmUO-UoAy9RI/s811/Lokal%20Ba%C4%9Flant%C4%B1%20Adresimiz.png)

Her şey yolunda giderse gördüğünüz gibi bir lokal bağlantı adresi elde ediyoruz ve bu bağlantıyı tarayıcımızla açtığımızda HUGO blogumuz bizi karşılıyor. 

>ℹ️ Lokal sitemize baktığımızda boş bir sayfa görebilirsiniz. Bunun için yine config dosyamızı optimize etmemiz gerekiyor. Çok fazla uğraşmadan [PaperMod Örnek config.yaml dosyası](https://adityatelange.github.io/hugo-PaperMod/posts/papermod/papermod-installation/#sample-configyml) sayfasındaki örneği kullanabilirsiniz. Elbette burda kullanmayacağınız özellikleri silebilir, kullanacağınız kısımları düzenleyebilirsiniz. Yine **"posts"** klasörü altında *"yaziniz.md"* isimli bir dosya oluşturarak [Örnek Sayfa Dosyası](https://adityatelange.github.io/hugo-PaperMod/posts/papermod/papermod-installation/#sample-pagemd) kısmındaki hazır şablonu kullanarak ilk yazınızı hazırlayabilirsiniz. Yazılarınızı "markdown" formatında yazmanız gerektiğini lütfen unutmayın. Bknz. [Markdown Basic Syntax](https://www.markdownguide.org/basic-syntax/)

## Lokal Proje Github Pages Deploy Aşaması 
Lokal üzerinden hazırlamış blogumuzu internete açabilmek için (Github Pages Deploy), öncelikli olarak Github üzerinden bir hesap oluşturmanız gerekiyor. Hemen sonrasındayda bir repository (depo) oluşturmanız gerekli. 

>ℹ️ Depo isminizi belirlerken eğer ana dizinde subdomain kullanmak istiyorsanız depo isminizi *"github-kullanici-adiniz.github.io"* şeklinde belirlemeniz gerekiyor. Aksi halde "Blog" tarzı bir depo ismi belirlemeniz durumunda web siteniz *"kullanici-adiniz.github.io/blog"* gibi bir adreste yayınlanacaktır.

Depoyu oluşturduktan sonra lokal projemizi depoya göndermemiz gerekiyor. Bunun için sırasıyla terminalde blog dizininde şu komutları çalıştırmalısınız;

```properties
git add . 
git commit -m "İlk HUGO Kurulumu"
## Burda tırnak içerisindeki kısma kendinize göre yaptığınız işlemler hakkındaki yorumu girebilirsiniz.
git remote add origin https://github.com/kullanici-adiniz/depo-isminiz.git
## Burada kullanıcı adı ve depo ismini düzenleyiniz!
git branch -M main
git push -u origin main
```
>⚠️ Bu aşamada terminal sizden Github kullanıcı adı ve şifrenizi isteyecektir. Burada şifre olarak kullanmak için bir "Token" oluşturmanız gerekiyor. Bunun için Github Settings>Developer Settings>Personel access tokens>Tokens(classic)>Generete New Token aşamalarını izleyerek **"repo ve workflow"** yetkileri olan bir token oluşturmanız gerekiyor. Bunu terminal üzerinde Github şifremiz olarak kullanacağız!

Bu aşamada dosyalarımız artık Github depomuza gönderilmiş oluyor. Ancak "Deploy" aşamasında sorun yaşamamak için bir ayar yapmamız lazım. 

>ℹ️ Blog klasörümüzde "Gizli Klasörleri Göster" seçeneğini aktif etmeli ve ardından *".github/workflows"* klasörlerini oluşturmalıyız. Bu dizine **"hugo.yaml"** isimli bir dosya oluşuturup bu dosyayı da [Hugo Host on Github Pages](https://gohugo.io/hosting-and-deployment/hosting-on-github/) sayfasında gösterildiği şeklilde yapılandıralım. (Step 6'da belirtilen kodu dosya içerisine kopyala yapıştır yapmanız yeterli olacaktır)

Daha sonrasında lokal üzerinde bazı değişiklikler yaptığımız için bu değişiklikleri tekrardan Github depomuza göndermemiz gerekecek. Bunun için terminalde;

```properties
git add . 
git commit -m "Create a Github Workflow HUGO.YAML"
## Burda tırnak içerisindeki kısma kendinize göre yaptığınız işlemler hakkındaki yorumu girebilirsiniz.
git push -u origin main
```
Bu aşamadan sonra deponun "Settings" kısmına gelmeniz ve sonrasında "Pages" sayfasına girmeniz gerekiyor. Açılan sayfada "Branc" kısmını **"main"** olarak ayarlayıp kaydetmelisiniz. Bu aşamadan sonra artık HUGO blogumuz deploy edilmeye başlamıştır. Aşamaları *"Actions"* kısmından takip edebilirsiniz. 

>ℹ️ Deployment tamamlandıktan sonra muhtemelen web sayfanızda "404" hatası alacaksınız. Bunun başlıca sebebi "baseURL" ayarını yapılandırmamış olmamız. Bunların hepsini karşılaştığımız sorunlarla çözmeye çalışıyorum ki daha anlaşılır olsun. Bu sorunu aşmak için lokal üzerinde config dosyamız olan "hugo.yaml" üzerinde "baseURL" kısmını ayarlamamız gerekiyor. 

```properties
baseURL: "https://examplesite.com/" // Buraya kendi github depo adresinizi yazmalısınız.
```

Bu ayarı yaptıktan sonra aktif olabilmesi için tekrardan git komutlarıyla depomuza göndermemiz gerekiyor. Sanırım bu komutları artık tekrar belirtmeme gerek yok. 😅

>ℹ️ Eğer web sitenizi özel bir domain üzerinden yayınlamak istiyorsanız, yine "Pages" sayfasında yer alan "Custom Domain" kısmındaki yapılandırmaları takip etmeniz gerekiyor. Burası çok ayrı bir kategori olduğu için yazı da detaylarına yer vermeyeceğim ancak video üzerinden nasıl yapılandırılması gerektiğine değindim.

Tüm yapılandırmaları tamamladıktan sonra artık web siteniz yayınlanmış durumda olacaktır. HUGO ve kullandığınız temaların birçok eklentileri ve özellikleri olabilir. Bunları ilgili wiki sayfalarından inceleyebilirsiniz. Bu özelliklere göre kendi sayfalarınızı düzenleyebilir ve yayınlayabilirsiniz. 