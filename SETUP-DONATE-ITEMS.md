# Donate Items Page - Setup Guide

This guide explains how to connect your donation items page to Google Sheets and Google Forms for managing items and collecting commitments.

## Overview

The system works as follows:
1. **Google Sheet** stores all donation items (name, description, price, category, etc.)
2. **Website** fetches items from the Sheet and displays them
3. **Google Form** collects commitment submissions from donors
4. **Form responses** are automatically saved to a Sheet for you to review

---

## Step 1: Create the Google Sheet

### 1.1 Create a new Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it: "GGM Temple Donation Items"

### 1.2 Set up the Items tab

Create columns in **Row 1** (headers):

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| id | name | description | category | amount | icon | status | quantity |

### 1.3 Add your items

Example data starting from Row 2:

| id | name | description | category | amount | icon | status | quantity |
|----|------|-------------|----------|--------|------|--------|----------|
| 1 | Main Temple Bell | Large brass bell for entrance | mandir | 2500 | bell emoji | available | |
| 2 | Brass Diya Set | Set of 12 oil lamps for aarti | mandir | 500 | lamp emoji | available | |
| 3 | Ceiling Fan | Decorative ceiling fan | infrastructure | 200 | fan emoji | available | 20 |

**Column explanations:**
- **id**: Unique number for each item
- **name**: Item display name
- **description**: Short description
- **category**: One of: `mandir`, `kitchen`, `infrastructure`, `furniture`, `outdoor`
- **amount**: Dollar amount (number only, no $ symbol)
- **icon**: Emoji to display (optional)
- **status**: `available`, `committed`, or `funded`
- **quantity**: Number needed (optional, leave blank for single items)

### 1.4 Publish the Sheet

1. Go to **File → Share → Publish to web**
2. Under "Link", select:
   - The sheet name (or "Entire document")
   - Format: **Comma-separated values (.csv)**
3. Click **Publish**
4. Copy the published URL (it will look like):
   ```
   https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?output=csv
   ```

---

## Step 2: Create the Google Form

### 2.1 Create a new Form

1. Go to [Google Forms](https://forms.google.com)
2. Create a new blank form
3. Name it: "Temple Item Donation Commitment"

### 2.2 Add form fields

Add these fields in order:

1. **Item** (Short answer) - This will be pre-filled automatically
   - Make it required

2. **Your Name** (Short answer)
   - Make it required

3. **Email Address** (Short answer)
   - Make it required
   - Add email validation

4. **Phone Number** (Short answer)
   - Optional

5. **Notes** (Paragraph)
   - Optional
   - Description: "Any special notes or dedication message"

### 2.3 Get the Form URL and Entry ID

1. Click the **Send** button
2. Click the link icon to get the form URL
3. Copy the URL (looks like):
   ```
   https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform
   ```

**To find the Entry ID for the Item field:**

1. Click on the form link to open it
2. Right-click on the "Item" field and select "Inspect" (or press F12)
3. Look for an input element with a name like `entry.123456789`
4. Copy the number after `entry.`

Alternatively:
1. Pre-fill the form manually by clicking ⋮ → Get pre-filled link
2. Fill in the Item field with any text
3. Click "Get link"
4. The URL will contain `entry.XXXXXXXXX=your+text`
5. Copy the number after `entry.`

### 2.4 Link Form responses to Sheet (Optional)

1. In Google Forms, click the **Responses** tab
2. Click the green Sheets icon
3. Select "Create a new spreadsheet" or link to your existing items Sheet
4. This creates a "Commitments" tab where all responses are saved

---

## Step 3: Update the Website Code

### 3.1 Open donate-items.js

Edit the configuration section at the top of `donate-items.js`:

```javascript
// ===========================================
// CONFIGURATION - UPDATE THESE VALUES
// ===========================================

// Replace with your published Google Sheet CSV URL
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?output=csv';

// Replace with your Google Form URL
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform';

// The entry ID for the item name field in your Google Form
const FORM_ITEM_ENTRY_ID = '123456789';
```

### 3.2 Test the integration

1. Open `donate-items.html` in a browser
2. Verify items load from your Google Sheet
3. Click "Commit to Donate" on any item
4. Verify the Google Form opens with the item name pre-filled
5. Submit a test response
6. Check the Form responses in Google Sheets

---

## Managing Items

### To add new items:
1. Add a new row in your Google Sheet
2. The website will automatically show the new item (may take a few minutes due to caching)

### To mark an item as committed:
1. Change the `status` column to `committed`
2. A yellow "Committed" badge will appear on the item

### To mark an item as fully funded:
1. Change the `status` column to `funded`
2. A green "Fully Funded" badge will appear on the item

### To remove an item:
1. Delete the row from the Google Sheet, OR
2. Change the status to something other than `available`, `committed`, or `funded`

---

## Troubleshooting

### Items not loading?
- Make sure the Sheet is published to the web
- Check that the CSV URL is correct
- Wait a few minutes (Google caches the published data)

### Form not pre-filling?
- Verify the Entry ID is correct
- Make sure the Form URL is correct
- Check browser console for errors

### Changes not appearing?
- Google Sheets cache can take 5-10 minutes to update
- Try appending `&cachebuster=123` to the Sheet URL (change the number to force refresh)

---

## Sample Google Sheet Template

You can copy this template to get started quickly:

[Create your own copy - Coming Soon]

Or manually create with these sample items:

```
id,name,description,category,amount,icon,status,quantity
1,Main Temple Bell (Ghanta),Large brass bell for the main mandir hall entrance,mandir,2500,🔔,available,
2,Brass Diya Set (12 pieces),Traditional oil lamps for daily aarti ceremonies,mandir,500,🪔,available,
3,Marble Deity Platform,Hand-carved marble platform for main deity installation,mandir,15000,🕉️,available,
4,Commercial Gas Range (6 Burner),Professional grade stove for prasad preparation,kitchen,3500,🔥,available,
5,Ceiling Fan,Decorative ceiling fan for temple halls,infrastructure,200,🌀,available,20
6,Garden Bench,Decorative bench for meditation garden,outdoor,450,🪷,available,6
```

---

## Need Help?

If you need assistance setting this up, contact the web administrator or refer to Google's documentation:
- [Publish Google Sheets](https://support.google.com/docs/answer/183965)
- [Create Google Forms](https://support.google.com/docs/answer/6281888)
