// Product Data
const products = [
    {
        id: 1,
        name: "NVIDIA GeForce RTX 5090",
        category: "GPU",
        price: 1999.99,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "The ultimate flagship graphics card for extreme 8K gaming and creative workloads.",
        badge: "New Release"
    },
    {
        id: 2,
        name: "Intel Core Ultra 9 285K",
        category: "CPU",
        price: 649.99,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "24-core powerhouse designed for flawless multitasking and heavy rendering.",
        badge: "Best Seller"
    },
    {
        id: 3,
        name: "ASUS ROG Maximus Z890 Hero",
        category: "Motherboard",
        price: 599.99,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Premium motherboard featuring robust power delivery, Wi-Fi 7, and DDR5 support.",
        badge: ""
    },
    {
        id: 4,
        name: "Corsair Dominator Titanium 64GB",
        category: "RAM",
        price: 329.99,
        image: "https://images.unsplash.com/photo-1562976540-1502c2145186?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Ultra-low latency DDR5-8000MHz RAM with stunning customizable RGB lighting.",
        badge: ""
    },
    {
        id: 5,
        name: "Samsung 990 PRO 4TB",
        category: "Storage",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1592659762303-90081d34b277?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Blazing fast PCIe 4.0 NVMe SSD with read speeds up to 7450 MB/s.",
        badge: "Must Have"
    },
    {
        id: 6,
        name: "NZXT Kraken Elite 360",
        category: "Cooling",
        price: 279.99,
        image: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "High-performance AIO liquid cooler with a built-in LCD display.",
        badge: ""
    }
];

// Cart State
let cart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

// Initialize Store
function initStore() {
    renderProducts();
    updateCartIcon();
    checkMobileMenu();
}

// Render Products to Grid
function renderProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const badgeHTML = product.badge ? `<div class="badge">${product.badge}</div>` : '';
        
        card.innerHTML = `
            ${badgeHTML}
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
            </div>
            <div class="product-footer">
                <div class="price">$${product.price.toFixed(2)}</div>
                <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        
        productGrid.appendChild(card);
    });
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if(product) {
        cart.push(product);
        updateCartIcon();
        
        // Simple animation feedback
        const btn = event.target;
        const originalText = btn.innerText;
        btn.innerText = "Added!";
        btn.style.background = "var(--accent-cyan)";
        btn.style.color = "#000";
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "";
            btn.style.color = "";
        }, 1500);
    }
}

// Update Cart Badge
function updateCartIcon() {
    cartCount.innerText = cart.length;
    
    if(cart.length > 0) {
        cartCount.style.transform = "scale(1.2)";
        setTimeout(() => {
            cartCount.style.transform = "scale(1)";
        }, 200);
    }
}

// Mobile Menu Toggle logic
function checkMobileMenu() {
    if(window.innerWidth <= 900) {
        menuBtn.style.display = 'block';
    } else {
        menuBtn.style.display = 'none';
        navLinks.style.display = 'flex';
    }
}

menuBtn.addEventListener('click', () => {
    if(navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'var(--bg-glass)';
        navLinks.style.padding = '2rem';
        navLinks.style.backdropFilter = 'blur(16px)';
        navLinks.style.borderBottom = '1px solid var(--border-glass)';
    }
});

window.addEventListener('resize', checkMobileMenu);

// Initialize
initStore();
