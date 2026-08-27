# Rhema Word Ministries: Domain & Custom Email Setup Guide

This guide outlines the steps to register the domain `rhemawordministries.com`, set up custom email accounts (such as `apostlekeith@rhemawordministries.com`), and configure email authentication records to prevent spoofing and ensure high delivery rates.

---

## 1. Domain Registration & Availability

To secure the domain name `rhemawordministries.com`:
1. **Choose a Registrar**: Use standard domain registrars such as Google Domains (now Squarespace Domains), GoDaddy, Namecheap, Cloudflare, or local providers (e.g. Webdev Zimbabwe / Broadband Zimbabwe for `.co.zw` if needed, but the client specifically requested `.com`).
2. **Check Availability**: Search for `rhemawordministries.com`.
3. **Register Domain**: Complete the purchase of the domain name. Set up auto-renewal to prevent domain expiration.

---

## 2. Setting Up Custom Domain Emails

To set up professional addresses (e.g., `apostlekeith@rhemawordministries.com`, `info@rhemawordministries.com`), connect the registered domain to an email hosting provider (Google Workspace, Zoho Mail, or Microsoft 365).

### Step 2.1: Add MX (Mail Exchange) Records
In your domain registrar's DNS Management console, add MX records to route emails to your provider. 

**Example: Google Workspace MX Records**

| Type | Host | Points To | Priority | TTL |
| :--- | :--- | :--- | :--- | :--- |
| MX | `@` (or empty) | `ASPMX.L.GOOGLE.COM.` | `1` | `3600` |
| MX | `@` (or empty) | `ALT1.ASPMX.L.GOOGLE.COM.` | `5` | `3600` |
| MX | `@` (or empty) | `ALT2.ASPMX.L.GOOGLE.COM.` | `5` | `3600` |
| MX | `@` (or empty) | `ALT3.ASPMX.L.GOOGLE.COM.` | `10` | `3600` |
| MX | `@` (or empty) | `ALT4.ASPMX.L.GOOGLE.COM.` | `10` | `3600` |

*Note: If using Zoho Mail or Microsoft 365, fetch the specific host endpoints and priority values directly from your administration setup wizard.*

---

## 3. Email Authentication Records (SPF, DKIM, DMARC)

Setting up these records is critical to ensure that emails sent from `apostlekeith@rhemawordministries.com` do not land in your recipients' spam folders.

### Step 3.1: SPF (Sender Policy Framework)
An SPF record specifies which mail servers are authorized to send email on behalf of your domain. Add this as a **TXT** record in your registrar's DNS settings.

- **Host/Name**: `@` or blank
- **Value**: `v=spf1 include:_spf.google.com ~all` *(if using Google Workspace)*
- **TTL**: `3600`

### Step 3.2: DKIM (DomainKeys Identified Mail)
DKIM adds a cryptographic signature to emails. 
1. Generate the DKIM TXT record key from your email host provider's administration panel (e.g., Google Admin Console > Gmail > Authenticate Email).
2. Add the generated TXT record to your DNS settings.
   - **Host/Name**: `google._domainkey` (or the selector specified by your host)
   - **Value**: `v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...` (insert the full public key provided by your host)
   - **TTL**: `3600`

### Step 3.3: DMARC (Domain-based Message Authentication, Reporting, and Conformance)
DMARC uses SPF and DKIM to tell receiving servers how to handle emails that fail authentication.
Add DMARC as a **TXT** record:

- **Host/Name**: `_dmarc`
- **Value**: `v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc-reports@rhemawordministries.com`
- **TTL**: `3600`

*Tip: In the early stages, setting `p=none` allows you to monitor mail delivery reports before switching to `p=quarantine` (sends failed emails to spam) or `p=reject` (blocks failed emails entirely).*

---

## Summary Checklist
- [ ] Domain `rhemawordministries.com` registered
- [ ] Email host account created (Google Workspace/Zoho)
- [ ] Domain verified by adding the validation TXT/CNAME record
- [ ] MX records configured in registrar panel
- [ ] SPF record published
- [ ] DKIM key generated and added to DNS
- [ ] DMARC TXT record added
