import requests
import ssl
import socket
import datetime
import json
import os
import time
import whois
from concurrent.futures import ThreadPoolExecutor, as_completed

DOMAINS_FILE = "domains.txt"
DATA_FILE = "data.json"

def get_domain_expiration_whois(domain):
    try:
        w = whois.whois(domain)
        expiration_date = w.expiration_date
        
        # In case of multiple dates, find the first valid datetime
        if isinstance(expiration_date, list):
            for d in expiration_date:
                if isinstance(d, datetime.datetime):
                    return d
            return None
            
        if isinstance(expiration_date, datetime.datetime):
            return expiration_date
    except Exception as e:
        # Silently fail, it's a fallback
        pass
    return None

def get_domain_expiration(domain):
    # 1. Try RDAP first (Fast and reliable) for .com and .net
    if domain.endswith(".com") or domain.endswith(".net"):
        rdap_url = f"https://rdap.verisign.com/com/v1/domain/{domain}"
        attempts = 2
        for i in range(attempts):
            try:
                response = requests.get(rdap_url, timeout=5)
                if response.status_code == 200:
                    data = response.json()
                    events = data.get("events", [])
                    for event in events:
                        if event.get("eventAction") == "expiration":
                            date_str = event.get("eventDate")
                            expiration_date = datetime.datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ")
                            return expiration_date
            except Exception:
                if i < attempts - 1:
                    time.sleep(1)

    # 2. Fallback to WHOIS if RDAP failed or unsupported extension
    return get_domain_expiration_whois(domain)

def get_ssl_expiration(domain):
    try:
        context = ssl.create_default_context()
        with socket.create_connection((domain, 443), timeout=10) as sock:
            with context.wrap_socket(sock, server_hostname=domain) as ssock:
                cert = ssock.getpeercert()
                expiration_date = datetime.datetime.strptime(cert['notAfter'], '%b %d %H:%M:%S %Y %Z')
                return expiration_date
    except Exception:
        pass
    return None

def process_domain(domain):
    print(f"Checking: {domain}...")
    
    domain_expiry = None
    ssl_expiry = None
    
    try:
        domain_expiry = get_domain_expiration(domain)
        if not isinstance(domain_expiry, datetime.datetime):
            domain_expiry = None
    except Exception:
        pass
        
    try:
        ssl_expiry = get_ssl_expiration(domain)
        if not isinstance(ssl_expiry, datetime.datetime):
            ssl_expiry = None
    except Exception:
        pass
        
    now = datetime.datetime.utcnow()
    
    return {
        "domain_name": domain,
        "domain": {
            "expiry": domain_expiry.isoformat() if domain_expiry else None,
            "days_left": (domain_expiry - now).days if domain_expiry else "Error"
        },
        "ssl": {
            "expiry": ssl_expiry.isoformat() if ssl_expiry else None,
            "days_left": (ssl_expiry - now).days if ssl_expiry else "Error"
        }
    }

def main():
    if not os.path.exists(DOMAINS_FILE):
        print(f"Error: {DOMAINS_FILE} not found.")
        return

    with open(DOMAINS_FILE, "r") as f:
        domains = [line.strip() for line in f if line.strip()]

    print(f"Turbo Mode Enabled. Total {len(domains)} domains will be scanned in parallel.")
    print("---------------------------------")
    
    start_time = time.time()
    results = []

    # Parallel processing with 10 threads
    with ThreadPoolExecutor(max_workers=10) as executor:
        future_to_domain = {executor.submit(process_domain, domain): domain for domain in domains}
        for future in as_completed(future_to_domain):
            domain = future_to_domain[future]
            try:
                result = future.result()
                results.append(result)
            except Exception as e:
                print(f"{domain} generated an exception: {e}")

    end_time = time.time()
    total_time = round(end_time - start_time, 2)

    # Sort results to match the order in domains.txt
    results.sort(key=lambda x: domains.index(x['domain_name']))

    data = {
        "items": results,
        "last_updated": datetime.datetime.now().isoformat()
    }
    
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=4)
        
    print("---------------------------------")
    print(f"Scan complete. {len(results)} domains saved in {total_time}s.")

if __name__ == "__main__":
    main()
