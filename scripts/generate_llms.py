#!/usr/bin/env python3
"""
generate_llms.py — Guler Open IT Platform
Reads all Jekyll posts from _posts/ and regenerates:
  - llms.txt       (curated, last 15 posts in Recent Articles)
  - llms-full.txt  (full categorized index of every post)

Run manually:  python3 scripts/generate_llms.py
GitHub Action: triggered automatically on push when _posts/** changes
"""

import os
import re
import sys
from collections import defaultdict
from datetime import datetime
from pathlib import Path

try:
    import yaml
except ImportError:
    print("PyYAML not found. Installing...")
    os.system("pip install pyyaml -q")
    import yaml

# ─────────────────────────────────────────────
# Config
# ─────────────────────────────────────────────
SITE_URL   = "https://farukguler.com"
POSTS_DIR  = "_posts"
RECENT_N   = 15          # how many posts to show in llms.txt Recent Articles

# Maps category keywords (lowercase) → human-readable section heading
DOMAIN_MAP = {
    "Linux & Unix Administration": [
        "linux", "unix", "debian", "ubuntu", "centos", "almalinux",
        "alpine", "lms", "moodle", "bigbluebutton",
    ],
    "Storage & Distributed Systems": [
        "storage", "ceph", "lvm", "btrfs", "partition",
        "postgresql", "mysql", "elasticsearch", "database",
    ],
    "Network & Security": [
        "network", "security", "firewall", "waf", "dns", "ssl", "tls",
        "vpn", "nmap", "siem", "cve", "utm", "tcpdump", "netstat",
        "cidr", "subnet", "snmp", "port", "unicast", "multicast",
    ],
    "Active Directory & Windows Server": [
        "windows", "active directory", "ad", "powershell", "gpo",
        "exchange", "iis", "hyper-v", "azure", "sccm", "laps", "pki",
        "certutil", "smb", "rdp", "kms", "scom",
    ],
    "Virtualization & Cloud": [
        "vmware", "proxmox", "kvm", "cloud", "virtualization",
        "esxi", "vsphere", "vsan", "azure", "hypervisor",
    ],
    "Docker & Kubernetes": [
        "docker", "kubernetes", "container", "rancher", "portainer",
        "k8s", "helm", "swarm", "compose", "dockerfile",
    ],
    "Blockchain & DeFi": [
        "blockchain", "defi", "crypto", "layer 1", "layer1", "layer-1",
        "nft", "web3", "bitcoin", "ethereum", "coin", "token", "dex",
        "dao", "zk", "rollup",
    ],
}


# ─────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────

def slug_from_filename(filename: str) -> str:
    """'2026-03-27-my-post-title.md'  →  'my-post-title'"""
    return re.sub(r"^\d{4}-\d{2}-\d{2}-", "", Path(filename).stem)


def parse_front_matter(filepath: str) -> dict | None:
    """Return front matter dict from a Jekyll markdown file, or None."""
    try:
        with open(filepath, encoding="utf-8") as f:
            content = f.read()
    except OSError:
        return None

    match = re.match(r"^---\s*\n(.*?)\n---", content, re.DOTALL)
    if not match:
        return None

    try:
        fm = yaml.safe_load(match.group(1))
    except yaml.YAMLError:
        return None

    return fm if isinstance(fm, dict) else None


def parse_post(filepath: str) -> dict | None:
    """Parse a single Jekyll post file into a metadata dict."""
    fm = parse_front_matter(filepath)
    if not fm:
        return None

    title = str(fm.get("title", "")).strip()
    if not title:
        return None

    # Date — prefer filename prefix, fall back to front matter
    filename = Path(filepath).name
    date_match = re.match(r"^(\d{4}-\d{2}-\d{2})", filename)
    if date_match:
        date_str = date_match.group(1)
    else:
        raw_date = fm.get("date", "")
        date_str = raw_date.strftime("%Y-%m-%d") if hasattr(raw_date, "strftime") else str(raw_date)[:10]

    # URL — honour explicit permalink front matter, otherwise build from slug
    permalink = fm.get("permalink", "")
    if permalink:
        url = SITE_URL + permalink.rstrip("/") + "/"
    else:
        slug = slug_from_filename(filename)
        url = f"{SITE_URL}/posts/{slug}/"

    # Categories
    raw_cats = fm.get("categories", fm.get("category", []))
    if isinstance(raw_cats, str):
        raw_cats = [raw_cats]
    cats = [str(c) for c in (raw_cats or [])]

    return {
        "title":      title,
        "date":       date_str,
        "url":        url,
        "categories": cats,
    }


def load_all_posts() -> list[dict]:
    """Load and sort all posts newest-first."""
    posts = []
    posts_path = Path(POSTS_DIR)
    if not posts_path.exists():
        sys.exit(f"ERROR: '{POSTS_DIR}/' directory not found. Run from repo root.")

    for f in posts_path.glob("*.md"):
        post = parse_post(str(f))
        if post:
            posts.append(post)

    posts.sort(key=lambda p: p["date"], reverse=True)
    return posts


def assign_domain(post: dict) -> str:
    """Return the best-matching domain section for a post."""
    cats_lower = " ".join(post["categories"]).lower()
    title_lower = post["title"].lower()
    haystack = cats_lower + " " + title_lower

    for domain, keywords in DOMAIN_MAP.items():
        if any(kw in haystack for kw in keywords):
            return domain
    return "Other"


def year_tag(date_str: str) -> str:
    return date_str[:4] if date_str else "Unknown"


# ─────────────────────────────────────────────
# llms.txt generator
# ─────────────────────────────────────────────

LLMS_HEADER = """\
# Guler Open IT Platform

> A high-authority technical blog focused on System Administration, Networking,
> Cloud Infrastructure, Virtualization, and Cybersecurity.
> Curated and written by Faruk Güler.

## Main Sections

- [Home](https://farukguler.com/): Latest technical articles and infrastructure guides.
- [About](https://farukguler.com/about/): Profile of Faruk Güler, IT System Administrator & Developer.
- [Categories](https://farukguler.com/categories/): Organized content by technology stack.
- [Tags](https://farukguler.com/tags/): Full topic index across all articles.
- [Archives](https://farukguler.com/archives/): Complete chronological post archive.
- [AppBox](https://farukguler.com/appbox/): Documentation for custom applications and tools.
- [Blockchain](https://farukguler.com/blockchain/): In-depth analysis of Layer 1 protocols and DeFi.

## Primary Projects & Tools

- [Neutron](https://github.com/faruk-guler/neutron): Lightweight multi-server management and automation tool for Linux/Unix.
- [Lagrange](https://farukguler.com/projects/lagrange): Python-based security auditing and system hardening framework.
- [Keepser](https://farukguler.com/projects/keepser): Privacy-focused, cross-platform note-taking application.

## Core Technical Domains

- **Linux Infrastructure:** Debian, Ubuntu, AlmaLinux, and Alpine server hardening.
- **Windows Ecosystem:** Active Directory, gMSA, PKI, and advanced GPO configurations.
- **Network & Security:** WAF, Firewall management, CVE remediation, threat hunting.
- **DevOps & Cloud:** Ansible, Terraform, Kubernetes (RKE2), container orchestration.
- **Storage:** Distributed systems including Ceph (Reef/Quincy) with cephadm.
- **Educational Tech:** Moodle 5.x, BigBlueButton 3.x, Scalelite, Pilos.
"""

LLMS_FOOTER = """
## Content Access

- [RSS Feed](https://farukguler.com/feed.xml): Machine-readable XML feed for the latest updates.
- [Full Directory](https://farukguler.com/llms-full.txt): Detailed index of all articles for deep crawling.
"""


def generate_llms_txt(posts: list[dict]) -> str:
    lines = [LLMS_HEADER]
    lines.append(f"## Recent Articles\n")
    lines.append(f"<!-- Auto-generated on {datetime.utcnow().strftime('%Y-%m-%d')} — do not edit manually -->\n")

    for post in posts[:RECENT_N]:
        cats = ", ".join(post["categories"]) if post["categories"] else ""
        suffix = f" — {cats}" if cats else ""
        lines.append(f"- [{post['title']}]({post['url']}){suffix} ({year_tag(post['date'])})")

    lines.append(LLMS_FOOTER)
    return "\n".join(lines)


# ─────────────────────────────────────────────
# llms-full.txt generator
# ─────────────────────────────────────────────

FULL_HEADER = """\
# Guler Open IT Platform — Full Article Index

> Complete index of all technical articles published on farukguler.com.
> Author: Faruk Güler — IT System Administrator, DevOps Engineer & Developer.
> Topics: Linux, Windows, Active Directory, Networking, Security,
>         Virtualization, Cloud, Docker, Kubernetes, Blockchain.
"""

FULL_FOOTER = """
---

## Content Access

- [RSS Feed](https://farukguler.com/feed.xml): Latest updates feed.
- [llms.txt](https://farukguler.com/llms.txt): Curated priority index.
- [Archives](https://farukguler.com/archives/): Full chronological archive.
- [Categories](https://farukguler.com/categories/): By technology stack.
- [Tags](https://farukguler.com/tags/): Full topic tag index.
"""


def generate_llms_full_txt(posts: list[dict]) -> str:
    # Bucket posts by domain
    buckets: dict[str, list] = defaultdict(list)
    for post in posts:
        domain = assign_domain(post)
        buckets[domain].append(post)

    # Ordered sections: defined domains first, then Other
    ordered_domains = list(DOMAIN_MAP.keys()) + ["Other"]

    lines = [FULL_HEADER]
    lines.append(f"<!-- Auto-generated on {datetime.utcnow().strftime('%Y-%m-%d')} "
                 f"— {len(posts)} articles total -->\n")
    lines.append("---\n")

    for domain in ordered_domains:
        domain_posts = buckets.get(domain, [])
        if not domain_posts:
            continue
        lines.append(f"## {domain}\n")
        for post in domain_posts:
            cats = ", ".join(post["categories"]) if post["categories"] else ""
            suffix = f" — {cats}" if cats else ""
            lines.append(f"- [{post['title']}]({post['url']}){suffix} ({year_tag(post['date'])})")
        lines.append("")

    lines.append(FULL_FOOTER)
    return "\n".join(lines)


# ─────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────

def main():
    print(f"Reading posts from '{POSTS_DIR}/'...")
    posts = load_all_posts()
    print(f"  → {len(posts)} posts found.")

    # llms.txt
    llms_content = generate_llms_txt(posts)
    with open("llms.txt", "w", encoding="utf-8") as f:
        f.write(llms_content)
    print(f"  ✓ llms.txt updated  (last {RECENT_N} posts in Recent Articles)")

    # llms-full.txt
    full_content = generate_llms_full_txt(posts)
    with open("llms-full.txt", "w", encoding="utf-8") as f:
        f.write(full_content)
    print(f"  ✓ llms-full.txt updated  ({len(posts)} posts, categorized)")


if __name__ == "__main__":
    main()
