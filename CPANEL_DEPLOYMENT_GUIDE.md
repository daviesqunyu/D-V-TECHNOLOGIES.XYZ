# cPanel Deployment Guide - D&V Technologies

Complete guide to deploy your React app to cPanel hosting at **dvtechnologies.xyz**

---

## 📋 Pre-Deployment Checklist

- ✅ All bugs fixed
- ✅ `.htaccess` file created in `/public` folder
- ✅ Environment variables configured
- ✅ Supabase backend URLs set correctly
- ✅ Build tested locally

---

## 🔧 Step 1: Configure Environment Variables

### Create `.env.production` file:

```bash
# .env.production
VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**⚠️ IMPORTANT:** Replace with your actual Supabase credentials

---

## 🏗️ Step 2: Build for Production

Run the build command:

```bash
npm run build
```

This creates a `dist` folder with your production-ready files.

**Expected output:**
```
dist/
├── index.html
├── .htaccess (from public folder)
├── robots.txt
├── sitemap.xml
├── favicon.svg
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
```

---

## 📤 Step 3: Upload to cPanel

### Option A: File Manager (Recommended for beginners)

1. **Login to cPanel**
   - Go to: https://dvtechnologies.xyz:2083
   - Enter your credentials

2. **Navigate to File Manager**
   - Click "File Manager" icon
   - Go to `public_html` folder

3. **Clean existing files** (if any)
   - Select all files in `public_html`
   - Delete them (keep `.htaccess` if it's correct)

4. **Upload dist folder contents**
   - Click "Upload" button
   - Select ALL files from your `dist` folder
   - Upload them to `public_html`

5. **Verify .htaccess**
   - Make sure `.htaccess` is in `public_html`
   - Check "Show Hidden Files" in settings if you can't see it

### Option B: FTP (Recommended for faster uploads)

1. **Get FTP credentials from cPanel**
   - In cPanel, go to "FTP Accounts"
   - Use main FTP account or create new one

2. **Connect with FTP Client** (FileZilla recommended)
   ```
   Host: ftp.dvtechnologies.xyz
   Username: your-username
   Password: your-password
   Port: 21
   ```

3. **Upload files**
   - Navigate to `public_html`
   - Upload all contents from `dist` folder
   - Make sure `.htaccess` is uploaded

### Option C: Terminal/SSH (Advanced)

```bash
# From your local project
cd dist
zip -r site.zip ./*

# Upload site.zip to cPanel
# Then in cPanel Terminal or SSH:
cd public_html
unzip site.zip
rm site.zip
```

---

## 🔍 Step 4: Verify .htaccess

SSH into your server or use cPanel Terminal:

```bash
cd public_html
ls -la | grep htaccess
```

Should show: `.htaccess`

**Check contents:**
```bash
cat .htaccess
```

Should start with:
```apache
# .htaccess for D&V Technologies (dvtechnologies.xyz)
# React SPA + Supabase Backend Configuration
```

---

## 🌐 Step 5: Configure Domain Settings

### In cPanel -> Domains

1. **Set Document Root**
   - Domain: dvtechnologies.xyz
   - Document Root: `/public_html`

2. **Enable HTTPS**
   - Go to "SSL/TLS Status"
   - Install/Activate SSL for dvtechnologies.xyz
   - Select "AutoSSL" or upload Let's Encrypt cert

3. **Force HTTPS** (already in .htaccess)
   - The .htaccess automatically redirects HTTP → HTTPS

---

## 🔧 Step 6: Set Correct Permissions

Via cPanel File Manager or SSH:

```bash
# Set correct permissions
cd public_html
chmod 644 .htaccess
chmod 644 index.html
chmod 755 assets
chmod 644 robots.txt
chmod 644 sitemap.xml
```

**Permission Summary:**
- Files: `644` (readable by everyone)
- Directories: `755` (executable/browsable)
- .htaccess: `644`

---

## 🧪 Step 7: Test Your Deployment

### 1. Test Main URL
```
https://dvtechnologies.xyz
```
Should load homepage ✅

### 2. Test Routes
```
https://dvtechnologies.xyz/services
https://dvtechnologies.xyz/contact
https://dvtechnologies.xyz/ai-assistant
```
Should load without 404 errors ✅

### 3. Test 404 Handling
```
https://dvtechnologies.xyz/random-page
```
Should show your 404 page, not cPanel error ✅

### 4. Test HTTPS Redirect
```
http://dvtechnologies.xyz
```
Should redirect to `https://` ✅

### 5. Test WWW Redirect
```
https://www.dvtechnologies.xyz
```
Should redirect to non-www ✅

### 6. Test API/Backend
- Open browser console (F12)
- Navigate through site
- Check for Supabase connection errors
- Test contact form submission

---

## 🐛 Common Issues & Solutions

### Issue 1: 404 on Routes (e.g., /services)
**Problem:** React Router not working  
**Solution:**
- Verify `.htaccess` is uploaded
- Check `.htaccess` is in `public_html` (not in subdirectory)
- Enable `mod_rewrite` in cPanel (ask hosting provider)

### Issue 2: .htaccess Not Working
**Problem:** Apache not reading .htaccess  
**Solution:**
```bash
# Check if mod_rewrite is enabled
# In cPanel Terminal:
httpd -M | grep rewrite
```
If not enabled, contact hosting support to enable it.

### Issue 3: 500 Internal Server Error
**Problem:** Syntax error in .htaccess  
**Solution:**
- Check error logs in cPanel → Errors
- Verify .htaccess syntax
- Try commenting out CSP header if too restrictive

### Issue 4: Supabase Not Connecting
**Problem:** CORS or API errors  
**Solution:**
- Verify environment variables in build
- Check Supabase project settings → API → URL
- Update CORS settings in Supabase dashboard
- Add your domain to allowed origins

### Issue 5: Assets Not Loading
**Problem:** Incorrect base path  
**Solution:**
- Check `vite.config.ts` has correct base
- Verify assets are uploaded to `public_html/assets/`
- Check file permissions (644 for files, 755 for dirs)

### Issue 6: Fonts Not Loading
**Problem:** CORS blocking Google Fonts  
**Solution:** Already handled in .htaccess CORS section

---

## 📊 Step 8: Verify SEO & Performance

### Check Sitemap
```
https://dvtechnologies.xyz/sitemap.xml
```
Should display XML sitemap ✅

### Check robots.txt
```
https://dvtechnologies.xyz/robots.txt
```
Should show robots.txt content ✅

### Test Page Speed
- Use Google PageSpeed Insights
- Check Core Web Vitals
- Verify GZIP compression working

### Submit to Google Search Console
1. Go to: https://search.google.com/search-console
2. Add property: dvtechnologies.xyz
3. Verify ownership (HTML tag or DNS)
4. Submit sitemap: https://dvtechnologies.xyz/sitemap.xml

---

## 🔐 Security Checklist

- ✅ HTTPS forced (HTTP redirects to HTTPS)
- ✅ Security headers enabled (X-Frame-Options, CSP, etc.)
- ✅ Hidden files protected (.env, .git, etc.)
- ✅ Directory browsing disabled
- ✅ PHP execution blocked in uploads
- ✅ GZIP compression enabled
- ✅ Browser caching configured

---

## 📱 Mobile Testing

Test on mobile devices:
1. Clear cache
2. Visit https://dvtechnologies.xyz
3. Test theme toggle
4. Test navigation menu
5. Test forms
6. Test responsiveness

---

## 🔄 Future Updates

To update your site:

1. Make changes locally
2. Test with `npm run dev`
3. Build: `npm run build`
4. Upload only changed files from `dist` to `public_html`
5. Clear browser cache
6. Test live site

**Quick update via FTP:**
```bash
npm run build
# Upload dist/assets/* to public_html/assets/
# Upload dist/index.html to public_html/
```

---

## 🆘 Emergency Rollback

If something breaks:

1. **Via cPanel File Manager**
   - Restore from cPanel Backups
   - Or upload previous version

2. **Via SSH**
   ```bash
   cd public_html
   rm -rf *
   # Upload previous working version
   ```

---

## 📞 Support Contacts

**Hosting Provider Support:**
- Access via cPanel → Support
- Or contact your hosting provider directly

**Domain Issues:**
- Check domain registrar (where you bought dvtechnologies.xyz)
- Verify nameservers point to hosting

**Supabase Issues:**
- Check Supabase dashboard
- Review project logs
- Check API quotas

---

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] Homepage loads (`https://dvtechnologies.xyz`)
- [ ] All routes work (`/services`, `/contact`, etc.)
- [ ] Theme toggle works (light/dark mode)
- [ ] Testimonials carousel auto-plays
- [ ] Contact form submits successfully
- [ ] AI Assistant works (if applicable)
- [ ] No console errors (F12)
- [ ] Mobile responsive
- [ ] HTTPS active (green padlock)
- [ ] Sitemap accessible
- [ ] robots.txt accessible
- [ ] No 404 errors on refresh
- [ ] Fast loading (< 3 seconds)

---

## 🎉 Deployment Complete!

Your site should now be live at:
**https://dvtechnologies.xyz**

Share it on:
- LinkedIn
- Twitter/X
- Instagram
- Facebook
- WhatsApp Business

---

**Need Help?**
- Check error logs in cPanel
- Review browser console (F12)
- Contact hosting support
- Check Supabase dashboard

**Built with 💙 in Nairobi, Kenya**  
*Silicon Savannah 2030*
