/**
 * Donate Items Page - JavaScript
 * Fetches items from Google Sheets and handles commitment form
 */

// ===========================================
// CONFIGURATION - UPDATE THESE VALUES
// ===========================================

// Replace with your published Google Sheet CSV URL (see setup instructions)
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmjgjJDLVIyT5NdckHNCX3zFlS1O2Tlt4-DBqntWGM5B_d-NjNeppXWmiZimzgCXUKcxLR9PJwV8x/pub?gid=0&single=true&output=csv';

// Replace with your Google Form URL for commitments
// Add ?usp=pp_url&entry.XXXXXX= to pre-fill the item name
// Example: https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?usp=pp_url&entry.123456789=
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeXzcAs2EgFNhRty3P8ZypdvzJ2J3jcfZmc0ALFDkiyIuv8-w/viewform';

// The entry ID for the item name field in your Google Form
// Find this by inspecting the form or pre-filling it manually
const FORM_ITEM_ENTRY_ID = '296852045';

// ===========================================
// SAMPLE DATA (Used when Google Sheet is not configured)
// ===========================================

const SAMPLE_ITEMS = [
    // Mandir Hall Items
    {
        id: 1,
        name: "Main Temple Bell (Ghanta)",
        description: "Large brass bell for the main mandir hall entrance",
        category: "mandir",
        amount: 2500,
        icon: "🔔",
        status: "available"
    },
    {
        id: 2,
        name: "Brass Diya Set (12 pieces)",
        description: "Traditional oil lamps for daily aarti ceremonies",
        category: "mandir",
        amount: 500,
        icon: "🪔",
        status: "available"
    },
    {
        id: 3,
        name: "Marble Deity Platform",
        description: "Hand-carved marble platform for main deity installation",
        category: "mandir",
        amount: 15000,
        icon: "🕉️",
        status: "available"
    },
    {
        id: 4,
        name: "Silver Kalash Set",
        description: "Sacred water vessels for puja ceremonies",
        category: "mandir",
        amount: 1200,
        icon: "🏺",
        status: "available"
    },
    {
        id: 5,
        name: "Puja Thali Set (Brass)",
        description: "Complete brass puja set with all accessories",
        category: "mandir",
        amount: 350,
        icon: "🙏",
        status: "available"
    },
    {
        id: 6,
        name: "Silk Deity Clothing Set",
        description: "Premium silk garments for deity decoration",
        category: "mandir",
        amount: 800,
        icon: "👘",
        status: "available"
    },

    // Kitchen Items
    {
        id: 7,
        name: "Commercial Gas Range (6 Burner)",
        description: "Professional grade stove for prasad preparation",
        category: "kitchen",
        amount: 3500,
        icon: "🔥",
        status: "available"
    },
    {
        id: 8,
        name: "Large Pressure Cookers (Set of 4)",
        description: "Industrial size cookers for community meals",
        category: "kitchen",
        amount: 600,
        icon: "🍲",
        status: "available"
    },
    {
        id: 9,
        name: "Stainless Steel Serving Set",
        description: "50-piece serving dishes and utensils",
        category: "kitchen",
        amount: 1500,
        icon: "🍽️",
        status: "available"
    },
    {
        id: 10,
        name: "Commercial Refrigerator",
        description: "Large capacity fridge for food storage",
        category: "kitchen",
        amount: 2800,
        icon: "❄️",
        status: "available"
    },
    {
        id: 11,
        name: "Roti Making Station",
        description: "Complete setup for making rotis/chapatis",
        category: "kitchen",
        amount: 1200,
        icon: "🫓",
        status: "available"
    },

    // Infrastructure Items
    {
        id: 12,
        name: "Ceiling Fan",
        description: "Decorative ceiling fan for temple halls",
        category: "infrastructure",
        amount: 200,
        icon: "🌀",
        status: "available",
        quantity: 20
    },
    {
        id: 13,
        name: "LED Chandelier",
        description: "Ornate chandelier for main hall",
        category: "infrastructure",
        amount: 3000,
        icon: "💡",
        status: "available"
    },
    {
        id: 14,
        name: "Sound System Speaker",
        description: "Professional audio speaker for bhajan/kirtan",
        category: "infrastructure",
        amount: 800,
        icon: "🔊",
        status: "available",
        quantity: 8
    },
    {
        id: 15,
        name: "Air Conditioning Unit",
        description: "HVAC unit for climate control",
        category: "infrastructure",
        amount: 4500,
        icon: "❄️",
        status: "available",
        quantity: 6
    },
    {
        id: 16,
        name: "Security Camera System",
        description: "Complete CCTV security setup",
        category: "infrastructure",
        amount: 5000,
        icon: "📹",
        status: "available"
    },

    // Furniture Items
    {
        id: 17,
        name: "Meditation Cushion Set (20)",
        description: "Comfortable floor cushions for meditation",
        category: "furniture",
        amount: 400,
        icon: "🧘",
        status: "available"
    },
    {
        id: 18,
        name: "Shoe Rack Unit",
        description: "Large capacity shoe storage unit",
        category: "furniture",
        amount: 350,
        icon: "👟",
        status: "available",
        quantity: 4
    },
    {
        id: 19,
        name: "Library Bookshelf",
        description: "Wooden bookshelf for spiritual texts",
        category: "furniture",
        amount: 600,
        icon: "📚",
        status: "available",
        quantity: 6
    },
    {
        id: 20,
        name: "Folding Tables (Set of 10)",
        description: "Portable tables for events and prasad",
        category: "furniture",
        amount: 800,
        icon: "🪑",
        status: "available"
    },
    {
        id: 21,
        name: "Reception Desk",
        description: "Welcome desk for temple entrance",
        category: "furniture",
        amount: 1500,
        icon: "🏛️",
        status: "available"
    },

    // Outdoor Items
    {
        id: 22,
        name: "Garden Bench",
        description: "Decorative bench for meditation garden",
        category: "outdoor",
        amount: 450,
        icon: "🪷",
        status: "available",
        quantity: 6
    },
    {
        id: 23,
        name: "Flagpole with Flag",
        description: "Temple flagpole with saffron dhwaja",
        category: "outdoor",
        amount: 1200,
        icon: "🚩",
        status: "available"
    },
    {
        id: 24,
        name: "Outdoor Lighting Set",
        description: "Decorative pathway and garden lights",
        category: "outdoor",
        amount: 2000,
        icon: "✨",
        status: "available"
    },
    {
        id: 25,
        name: "Temple Signage",
        description: "Main entrance sign with temple name",
        category: "outdoor",
        amount: 3500,
        icon: "🪧",
        status: "available"
    },
    {
        id: 26,
        name: "Tulsi Garden Setup",
        description: "Sacred Tulsi plant garden with enclosure",
        category: "outdoor",
        amount: 800,
        icon: "🌿",
        status: "available"
    }
];

// ===========================================
// MAIN FUNCTIONALITY
// ===========================================

let allItems = [];
let currentCategory = 'all';

/**
 * Initialize the page
 */
document.addEventListener('DOMContentLoaded', function() {
    loadItems();
    initFilters();
    initMobileMenu();
    initNavbar();
});

/**
 * Load items from Google Sheets or use sample data
 */
async function loadItems() {
    const loadingEl = document.getElementById('items-loading');
    const gridEl = document.getElementById('items-grid');

    try {
        if (GOOGLE_SHEET_URL) {
            // Fetch from Google Sheets
            const response = await fetch(GOOGLE_SHEET_URL);
            const csvText = await response.text();
            allItems = parseCSV(csvText);
        } else {
            // Use sample data
            console.log('Using sample data. Configure GOOGLE_SHEET_URL to load from Google Sheets.');
            allItems = SAMPLE_ITEMS;
        }

        loadingEl.style.display = 'none';
        renderItems(allItems);

    } catch (error) {
        console.error('Error loading items:', error);
        // Fall back to sample data
        allItems = SAMPLE_ITEMS;
        loadingEl.style.display = 'none';
        renderItems(allItems);
    }
}

/**
 * Parse CSV data from Google Sheets
 * Expected columns: id, name, description, category, amount, icon, status, quantity
 */
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

    const items = [];
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length >= 5) {
            const item = {};
            headers.forEach((header, index) => {
                let value = values[index] || '';
                // Convert numeric fields
                if (header === 'amount' || header === 'quantity' || header === 'id') {
                    value = parseFloat(value) || 0;
                }
                item[header] = value;
            });
            // Only add items with valid data
            if (item.name && item.amount > 0) {
                items.push(item);
            }
        }
    }
    return items;
}

/**
 * Parse a single CSV line (handles quoted values with commas)
 */
function parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current.trim());
    return values;
}

/**
 * Render items to the grid
 */
function renderItems(items) {
    const gridEl = document.getElementById('items-grid');
    const emptyEl = document.getElementById('items-empty');

    // Filter by category
    const filteredItems = currentCategory === 'all'
        ? items
        : items.filter(item => item.category === currentCategory);

    if (filteredItems.length === 0) {
        gridEl.innerHTML = '';
        emptyEl.style.display = 'block';
        return;
    }

    emptyEl.style.display = 'none';

    gridEl.innerHTML = filteredItems.map(item => `
        <div class="item-card" data-category="${item.category}">
            <div class="item-icon">${item.icon || '🙏'}</div>
            <div class="item-content">
                <h3 class="item-name">${escapeHtml(item.name)}</h3>
                <p class="item-description">${escapeHtml(item.description)}</p>
                ${item.quantity ? `<p class="item-quantity">Quantity needed: ${item.quantity}</p>` : ''}
                <div class="item-footer">
                    <span class="item-amount">$${formatNumber(item.amount)}</span>
                    <button class="item-commit-btn" onclick="commitToItem('${escapeHtml(item.name)}', ${item.amount})">
                        Commit to Donate
                    </button>
                </div>
            </div>
            ${item.status === 'committed' ? '<div class="item-badge committed">Committed</div>' : ''}
            ${item.status === 'funded' ? '<div class="item-badge funded">Fully Funded</div>' : ''}
        </div>
    `).join('');

    // Add scroll reveal animation
    initItemAnimations();
}

/**
 * Initialize filter buttons
 */
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            currentCategory = this.dataset.category;
            renderItems(allItems);
        });
    });
}

/**
 * Handle commitment button click
 */
function commitToItem(itemName, amount) {
    if (GOOGLE_FORM_URL && FORM_ITEM_ENTRY_ID) {
        // Open Google Form with pre-filled item name
        const encodedItem = encodeURIComponent(itemName + ' ($' + formatNumber(amount) + ')');
        const formUrl = `${GOOGLE_FORM_URL}?usp=pp_url&entry.${FORM_ITEM_ENTRY_ID}=${encodedItem}`;
        window.open(formUrl, '_blank');
    } else {
        // Fallback: show alert with instructions
        alert(`Thank you for your interest in sponsoring:\n\n${itemName} - $${formatNumber(amount)}\n\nPlease contact us at gayatrigyanmandir.org/contact to complete your commitment.`);
    }
}

/**
 * Initialize scroll animations for items
 */
function initItemAnimations() {
    const cards = document.querySelectorAll('.item-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => observer.observe(card));
}

/**
 * Initialize mobile menu (same as main page)
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!mobileMenuBtn || !navLinks) return;

    // Create mobile menu overlay
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <div class="mobile-menu-content">
            ${navLinks.innerHTML}
            <a href="https://app.gayatrigyanmandir.org/donate/index" target="_blank" rel="noopener noreferrer" class="mobile-donate-btn">Donate Now</a>
        </div>
    `;
    document.body.appendChild(mobileMenu);

    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Initialize navbar scroll behavior (same as main page)
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
