# 🚀 Quick Deployment Checklist - D&V Technologies

## Before Building

- [ ] All code changes committed
- [ ] Environment variables set in `.env.production`
- [ ] Supabase URL and API key configured
- [ ] Test locally with `npm run dev`
- [ ] Run `npm run lint` (should pass)
- [ ] `.htaccess` file exists in `/public` folder

## Build Process

```bash
# 1. Install dependencies (if needed)
npm install

# 2. Build for production
npm run build

# 3. Verify dist folder created
ls dist/
```

**Expected files in `dist/`:**
- ✅ index.html
- ✅ .htaccess
- ✅ robots.txt
- ✅ sitemap.xml
- ✅ favicon.svg
- ✅ assets/ folder with JS/CSS files

## Upload to cPanel

### Method 1: File Manager (Easy)
1. Login: https://dvtechnologies.xyz:2083
2. Open File Manager → `public_html`
3. Delete old files (backup first!)
4. Upload ALL files from `dist` folder
5. Verify `.htaccess` is there (enable "Show Hidden Files")

### Method 2: FTP (Faster)
1. Connect to: ftp.dvtechnologies.xyz
2. Navigate to `public_html`
3. Upload contents of `dist` folder
4. Check `.htaccess` uploaded

## After Upload

- [ ] Verify `.htaccess` is in `public_html`
- [ ] Check file permissions (644 for files, 755 for folders)
- [ ] SSL certificate active in cPanel
- [ ] Domain pointing to correct directory

## Testing Live Site

Visit these URLs and verify:

- [ ] https://dvtechnologies.xyz - Homepage loads
- [ ] https://dvtechnologies.xyz/services - Services page
- [ ] https://dvtechnologies.xyz/contact - Contact page
- [ ] https://dvtechnologies.xyz/ai-assistant - AI page
- [ ] http://dvtechnologies.xyz - Redirects to HTTPS ✅
- [ ] Theme toggle works (light/dark)
- [ ] Testimonials carousel auto-plays
- [ ] Mobile responsive
- [ ] No console errors (F12 Developer Tools)

## SEO & Files

- [ ] https://dvtechnologies.xyz/sitemap.xml - Displays
- [ ] https://dvtechnologies.xyz/robots.txt - Displays
- [ ] Favicon appears in browser tab
- [ ] Page titles correct
- [ ] Meta descriptions present

## Backend/API

- [ ] Supabase connection working
- [ ] Contact form submits successfully
- [ ] No CORS errors in console
- [ ] AI Assistant connects (if applicable)

## Performance

- [ ] Page loads in < 3 seconds
- [ ] GZIP compression active
- [ ] Browser caching working
- [ ] Images loading properly
- [ ] Fonts loading properly

## Troubleshooting

### If routes show 404:
```bash
# Check .htaccess exists
ls -la public_html/ | grep htaccess

# Verify mod_rewrite enabled (contact host if not)
```

### If assets not loading:
- Check file permissions
- Clear browser cache
- Verify assets/ folder uploaded

### If SSL not working:
- Go to cPanel → SSL/TLS Status
- Install AutoSSL or Let's Encrypt

## Final Steps

- [ ] Submit sitemap to Google Search Console
- [ ] Test on mobile devices
- [ ] Share on social media
- [ ] Monitor cPanel error logs for issues

---

## Quick Commands

```bash
# Build
npm run build

# Test build locally
npm run preview

# Check for errors
npm run lint
```

---

## Need Help?

1. Check `CPANEL_DEPLOYMENT_GUIDE.md` for detailed instructions
2. Check `BUG_REPORT.md` for known issues
3. Review cPanel error logs
4. Contact hosting support

---

**Site URL:** https://dvtechnologies.xyz  
**Status:** Ready for deployment ✅

🎉 **Your site is production-ready!**
