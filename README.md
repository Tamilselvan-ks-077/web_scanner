# ScanLite 🔍

A lightweight web application scanner built for detecting common vulnerabilities during bug bounty reconnaissance and testing.

---

## 🚀 Features

* 🔎 Detects reflected input (XSS testing points)
* 💉 Basic SQL Injection checks (error-based)
* 🌐 Simple crawler for endpoint discovery
* 🛡️ Security headers analysis
* 📊 JSON report generation
* ⚠️ Designed for reconnaissance, not full vulnerability validation
* ⚡ Fast and minimal CLI-based tool

---

## 🧠 How It Works

The scanner:

1. Takes a target URL
2. Identifies parameters and endpoints
3. Injects payloads
4. Analyzes server responses
5. Reports possible vulnerabilities (not guaranteed exploits)

---

## ⚙️ Installation

```bash
git clone https://github.com/YOUR-USERNAME/ScanLite.git
cd ScanLite
pip install -r requirements.txt
```

---

## ▶️ Usage

```bash
python scanner.py https://target.com
```

Optional flags (if implemented):

```bash
--threads 10  
--output report.json
```

---

## 📂 Project Structure

```
ScanLite/
│── scanner.py
│── modules/
│   ├── xss.py
│   ├── sqli.py
│   ├── crawler.py
│   └── headers.py
│── report/
│── requirements.txt
```

---

## 📊 Sample Output

```json
{
  "target": "https://example.com",
  "vulnerabilities": [
    {
      "type": "XSS",
      "url": "https://example.com?q=payload",
      "status": "reflection detected"
    }
  ]
}
```

---

## 🧪 Limitations

* This tool does **not guarantee accurate vulnerability detection**
* Results may include **false positives and false negatives**
* Detection is based on **basic payload reflection and response analysis**
* It does **not confirm exploitability** of vulnerabilities
* Manual verification is required for all findings

---

## ⚠️ Important Note

This scanner is designed to **assist in identifying potential attack surfaces**, not to replace manual testing.

For accurate results, always validate findings using tools like Burp Suite or manual testing techniques.

---

## ⚠️ Disclaimer

This tool is created for **educational purposes and authorized testing only**.
Do not use it on systems without proper permission.

---

## 💡 Future Improvements

* Headless browser for real XSS execution detection
* Advanced payload obfuscation
* Parameter discovery automation
* Authentication & logic bug testing (IDOR, JWT)

---

## ✅ Project Highlights

* ✔ Clean and simple code structure for easy understanding and modification
* ✔ Honest representation of capabilities and limitations
* ✔ Built with a bug bounty mindset (focus on recon and attack surface)
* ✔ Designed to showcase practical security testing skills for recruiters

---

## 👨‍💻 Author

Tamilselvan
Cybersecurity Student | Bug Bounty Learner

---

## ⭐ Support

If you like this project, consider giving it a star ⭐
