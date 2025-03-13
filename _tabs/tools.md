---
layout: default
icon: fa-solid fa-toolbox
order: 3
---

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Toolbox - Tüm Araçlar Tek Yerde</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: auto;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #007bff;
        }
        .tool-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        .tool-card {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s;
        }
        .tool-card:hover {
            transform: translateY(-5px);
        }
        .tool-card a {
            text-decoration: none;
            color: #333;
            font-size: 18px;
            font-weight: bold;
        }
        .tool-card a:hover {
            color: #007bff;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Toolbox - Tüm Araçlar Tek Yerde</h1>
    <div class="tool-list">
        <div class="tool-card">
            <a href="ipv4-subnet-calculator.html">IPv4 Subnet Calculator</a>
        </div>
        <div class="tool-card">
            <a href="base64.html">Base64 Encode/Decode</a>
        </div>
        <div class="tool-card">
            <a href="converter.html">Byte Converter</a>
        </div>
        <div class="tool-card">
            <a href="md-viewer.html">Markdown Viewer</a>
        </div>
        <div class="tool-card">
            <a href="my-ip.html">My IP Checker</a>
        </div>
        <div class="tool-card">
            <a href="reverse-ip.html">Reverse IP Lookup</a>
        </div>
        <div class="tool-card">
            <a href="ssl-tls-checker.html">SSL/TLS Checker</a>
        </div>
        <div class="tool-card">
            <a href="whois-lookup.html">WHOIS Lookup</a>
        </div>
    </div>
</div>

</body>
</html>