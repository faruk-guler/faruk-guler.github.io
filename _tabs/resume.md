---
layout: page
icon: fa-solid fa-chess-knight
order: 5
---

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Özgeçmiş - Faruk Güler</title>
    <style>
        /* Genel stil ayarları */
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
            color: #333;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
        }

        .header h1 {
            font-size: 2.5em;
            color: #4ecdc4;
            margin: 0;
        }

        .subheading {
            font-size: 1.2em;
            color: #666;
            margin: 5px 0 20px 0;
        }

        .contact-info p {
            margin: 5px 0;
            font-size: 1em;
        }

        .contact-info a {
            color: #4ecdc4;
            text-decoration: none;
        }

        .contact-info a:hover {
            text-decoration: underline;
        }

        section {
            margin-bottom: 40px;
        }

        h2 {
            font-size: 1.8em;
            color: #333;
            margin-bottom: 10px;
            border-bottom: 2px solid #4ecdc4;
            padding-bottom: 5px;
        }

        h3 {
            font-size: 1.3em;
            color: #333;
            margin-top: 10px;
        }

        .job-dates, .degree, .dates {
            font-size: 1em;
            color: #777;
        }

        ul {
            list-style-type: none;
            padding-left: 0;
        }

        ul li {
            font-size: 1em;
            margin: 5px 0;
        }

        .skills ul {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }

        .skills ul li {
            font-size: 1.1em;
        }

        .languages ul {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }

        .references p {
            font-size: 1.1em;
            color: #555;
        }

        @media (max-width: 768px) {
            .skills ul, .languages ul {
                grid-template-columns: 1fr;
            }

            h2 {
                font-size: 1.5em;
            }

            h3 {
                font-size: 1.2em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>Faruk Güler</h1>
            <p class="subheading">Sistem Yöneticisi & Yazılım Geliştirici</p>
            <div class="contact-info">
                <p>Email: faruk.guler@example.com</p>
                <p>Telefon: +90 555 123 45 67</p>
                <p>LinkedIn: <a href="https://www.linkedin.com/in/farukguler" target="_blank">linkedin.com/in/farukguler</a></p>
            </div>
        </header>

        <section class="summary">
            <h2>Özet</h2>
            <p>
                Deneyimli bir sistem yöneticisi ve yazılım geliştirici olarak, web uygulamaları ve sunucu altyapılarını optimize etme konusunda geniş deneyime sahibim. Çeşitli yazılım ve ağ sistemleri üzerinde çalışarak, sorunları hızlıca çözme ve projeleri başarıyla tamamlamada yetkinim.
            </p>
        </section>

        <section class="experience">
            <h2>İş Deneyimi</h2>
            
            <div class="job">
                <h3>Başlangıç Teknolojileri A.Ş. - Sistem Yöneticisi</h3>
                <p class="job-dates">Ocak 2020 - Günümüz</p>
                <ul>
                    <li>Sunucu yönetimi, ağ güvenliği ve performans izleme işlemlerini yürütmek.</li>
                    <li>Linux ve Windows tabanlı sunucularda sistem kurulumu, bakımı ve güncellenmesi.</li>
                    <li>Yedekleme çözümleri ve felaket kurtarma senaryoları geliştirme.</li>
                </ul>
            </div>
            
            <div class="job">
                <h3>TechSoft Yazılım - Yazılım Geliştirici</h3>
                <p class="job-dates">Eylül 2017 - Aralık 2019</p>
                <ul>
                    <li>PHP, JavaScript ve Python kullanarak web uygulamaları geliştirme.</li>
                    <li>Veritabanı yönetimi (MySQL, PostgreSQL) ve API entegrasyonu.</li>
                    <li>Projelerin zamanında teslim edilmesi için Agile metodolojisiyle çalışmak.</li>
                </ul>
            </div>
        </section>

        <section class="education">
            <h2>Eğitim</h2>
            
            <div class="school">
                <h3>Boğaziçi Üniversitesi</h3>
                <p class="degree">Bilgisayar Mühendisliği, Lisans</p>
                <p class="dates">Eylül 2013 - Haziran 2017</p>
            </div>
        </section>

        <section class="skills">
            <h2>Beceriler</h2>
            <ul>
                <li>Linux & Windows Sunucu Yönetimi</li>
                <li>Web Teknolojileri: HTML, CSS, JavaScript, PHP</li>
                <li>Veritabanı Yönetimi: MySQL, PostgreSQL</li>
                <li>Python ve Bash Scripting</li>
                <li>Git & GitHub</li>
                <li>Ağ ve Sistem Güvenliği</li>
            </ul>
        </section>

        <section class="languages">
            <h2>Diller</h2>
            <ul>
                <li>Türkçe: Ana dil</li>
                <li>İngilizce: İleri Seviye</li>
            </ul>
        </section>

        <section class="references">
            <h2>Referanslar</h2>
            <p>Referanslar isteğe bağlı olarak sağlanacaktır.</p>
        </section>
    </div>
</body>
</html>
