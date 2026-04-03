const productCategories = [
    { id: "CPU", name: "Processors (CPU)", image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: "Motherboard", name: "Motherboards", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: "RAM", name: "Memory (RAM)", image: "https://images.unsplash.com/photo-1562976540-1502c2145186?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: "Storage", name: "SSD / HDD", image: "https://images.unsplash.com/photo-1592659762303-90081d34b277?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: "GPU", name: "Graphics Cards", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: "Power Supply", name: "Power Supply", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: "Casing", name: "Casings", image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: "Cooler", name: "Coolers", image: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: "Laptop", name: "Laptops", image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
];

const defaultProducts = [
    // CPUs
    { id: 1, name: "Intel Core i9-14900K", category: "CPU", condition: "Brand New", price: 220000, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&w=600&q=80", description: "24-Core, 32-Thread Unlocked Processor." },
    { id: 2, name: "AMD RYZEN 5 3400G TRAY", category: "CPU", condition: "Used", price: 27500, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&w=600&q=80", description: "Without cooler, 03 Months Warranty." },
    { id: 3, name: "Intel Core i5-12400F", category: "CPU", condition: "Brand New", price: 55000, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&w=600&q=80", description: "LGA1700 Brand New CPU with Cooler." },

    // GPUs
    { id: 4, name: "ASUS DUAL RTX5060 8GB GDDR7", category: "GPU", condition: "Brand New", price: 155000, badge: "New Arrival", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&w=600&q=80", description: "Brand New Graphics Card (03 Years Warranty)" },
    { id: 5, name: "RTX 2060 8GB USED", category: "GPU", condition: "Used", price: 70000, image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&w=600&q=80", description: "Random brand, Used condition. 3 Months warranty." },
    { id: 6, name: "MSI GeForce RTX 4090 SUPRIM", category: "GPU", condition: "Brand New", price: 850000, image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&w=600&q=80", description: "The ultimate flagship graphics block." },

    // Motherboards
    { id: 7, name: "ASUS ROG Maximus Z890", category: "Motherboard", condition: "Brand New", price: 245000, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&w=600&q=80", description: "Premium motherboard Wi-Fi 7, DDR5." },
    { id: 8, name: "ASROCK AB350 M.2 Motherboard", category: "Motherboard", condition: "Used", price: 15500, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&w=600&q=80", description: "Used 4 RAM slot motherboard." },
    
    // RAM
    { id: 9, name: "Corsair Vengeance RGB 16GB", category: "RAM", condition: "Brand New", price: 24500, image: "https://images.unsplash.com/photo-1562976540-1502c2145186?ixlib=rb-4.0.3&w=600&q=80", description: "16GB DDR5 5200MHz RAM." },
    { id: 10, name: "Kingston FURY Beast 8GB DDR4", category: "RAM", condition: "Used", price: 6500, image: "https://images.unsplash.com/photo-1562976540-1502c2145186?ixlib=rb-4.0.3&w=600&q=80", description: "8GB DDR4 3200MHz Used." },

    // Storage
    { id: 11, name: "Samsung 990 PRO 2TB NVMe", category: "Storage", condition: "Brand New", price: 58000, image: "https://images.unsplash.com/photo-1592659762303-90081d34b277?ixlib=rb-4.0.3&w=600&q=80", description: "Blazing fast PCIe 4.0 NVMe SSD." },
    { id: 12, name: "128GB USED SATA SSD", category: "Storage", condition: "Used", price: 6500, image: "https://images.unsplash.com/photo-1592659762303-90081d34b277?ixlib=rb-4.0.3&w=600&q=80", description: "128GB SATA SSD - Random Brand." },
    { id: 13, name: "Seagate Barracuda 1TB HDD", category: "Storage", condition: "Brand New", price: 15500, image: "https://images.unsplash.com/photo-1592659762303-90081d34b277?ixlib=rb-4.0.3&w=600&q=80", description: "1TB 7200RPM Desktop internal hard drive." },

    // Casings
    { id: 14, name: "Lian Li O11 Dynamic EVO", category: "Casing", condition: "Brand New", price: 55000, image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?ixlib=rb-4.0.3&w=600&q=80", description: "Premium dual-chamber chassis." },
    { id: 15, name: "Used Standard ATX Casing", category: "Casing", condition: "Used", price: 4500, image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?ixlib=rb-4.0.3&w=600&q=80", description: "Used case with minor scratches." },

    // Coolers
    { id: 16, name: "NZXT Kraken Elite 360", category: "Cooler", condition: "Brand New", price: 95000, image: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?ixlib=rb-4.0.3&w=600&q=80", description: "AIO Liquid cooler with LCD screen." },
    { id: 17, name: "Intel Stock Cooler", category: "Cooler", condition: "Used", price: 1500, image: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?ixlib=rb-4.0.3&w=600&q=80", description: "Used original intel air cooler." },

    // Power Supply
    { id: 18, name: "Corsair RM850x 80+ Gold", category: "Power Supply", condition: "Brand New", price: 45000, image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&w=600&q=80", description: "850W Fully modular power supply." },
    { id: 19, name: "Used 500W Bronze PSU", category: "Power Supply", condition: "Used", price: 8500, image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&w=600&q=80", description: "Standard 500W PSU used for 1 year." },

    // Laptops
    { id: 20, name: "ASUS ROG Strix G16", category: "Laptop", condition: "Brand New", price: 450000, image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&w=600&q=80", description: "Intel i7 13th Gen, RTX 4060, 16GB RAM, 1TB SSD." },
    { id: 21, name: "MSI Katana 15", category: "Laptop", condition: "Brand New", price: 380000, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&w=600&q=80", description: "Intel i7 12th Gen, RTX 3050, 8GB RAM, 512GB SSD." },
    { id: 22, name: "Lenovo Legion 5 (Used)", category: "Laptop", condition: "Used", price: 290000, image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&w=600&q=80", description: "AMD Ryzen 7, RTX 3060, 16GB RAM." }
];

let products = [];
let orders = [];

// ====== FIREBASE SETUP ======
const firebaseConfig = {
  apiKey: "AIzaSyDmo8Z16XTIC7AiwpaSFGwywCFv-iWtB7I",
  authDomain: "nexus-2722e.firebaseapp.com",
  projectId: "nexus-2722e",
  storageBucket: "nexus-2722e.firebasestorage.app",
  messagingSenderId: "1003347378649",
  appId: "1:1003347378649:web:a39602f040014ab94219c8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Listen to products in Realtime Database
database.ref('products').on('value', (snapshot) => {
    let data = snapshot.val();
    if (data) {
        // Firebase might store arrays as objects if there are empty slots. Ensure it's an array.
        products = Array.isArray(data) ? data : Object.values(data);
    } else {
        products = defaultProducts;
        saveProducts(); // Seed initial data
    }
    
    // Auto-refresh UI on changes
    if (currentCategory) {
        renderCategoryProducts();
    }
    const adminPage = document.getElementById('page-admin');
    if (adminPage && adminPage.classList.contains('active') && document.getElementById('tab-admin-products').classList.contains('active')) {
        renderAdminProducts();
    }
});

function saveProducts() {
    database.ref('products').set(products);
}

// Listen to orders in Realtime Database
database.ref('orders').on('value', (snapshot) => {
    let data = snapshot.val();
    if (data) {
        orders = Array.isArray(data) ? data : Object.values(data);
    } else {
        orders = [];
    }
    
    const adminPage = document.getElementById('page-admin');
    if (adminPage && adminPage.classList.contains('active') && document.getElementById('tab-admin-orders').classList.contains('active')) {
        renderAdminOrders();
    }
});

function saveOrders() {
    database.ref('orders').set(orders);
}

let isAdmin = localStorage.getItem('nexus_admin') === 'true';

// --- APP STATE & ROUTING ---
let cart = [];
let currentFilter = 'All';
let currentCategory = null;

const formatLKR = (num) => 'Rs. ' + parseInt(num).toLocaleString('en-US');

function updateNavAuth() {
    const loginContainer = document.getElementById('loginBtnContainer');
    if (!loginContainer) return;
    
    if (isAdmin) {
        loginContainer.innerHTML = `
            <div class="login-btn-top" onclick="navigateTo('admin')" style="background:var(--accent-purple); border-color:var(--accent-purple);">
                <i class="fas fa-shield-alt"></i> <span>Admin</span>
            </div>
            <div class="login-btn-top" onclick="logoutAdmin()" style="margin-left:5px;">
                <i class="fas fa-sign-out-alt"></i>
            </div>
        `;
    } else {
        loginContainer.innerHTML = `
            <div class="login-btn-top" onclick="navigateTo('login')">
                <i class="fas fa-user-circle"></i> <span>Login</span>
            </div>
        `;
    }
}

function navigateTo(pageId) {
    if (pageId === 'admin' && !isAdmin) {
        alert('Access Denied');
        return;
    }

    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    
    if(pageId === 'shop') {
        renderCategories();
        document.getElementById('categoryGrid').style.display = 'grid';
        document.getElementById('productView').style.display = 'none';
        document.getElementById('shopTitle').innerText = 'Component Categories';
    } else if(pageId === 'admin') {
        renderAdminProducts();
        renderAdminOrders();
        switchAdminTab('products');
    }
}

// --- CATEGORY RENDERING ---
function renderCategories() {
    const grid = document.getElementById('categoryGrid');
    grid.innerHTML = '';
    
    productCategories.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.onclick = () => openCategory(cat.id);
        
        card.innerHTML = `
            <img src="${cat.image}" alt="${cat.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%; box-shadow: 0 0 15px rgba(0,229,255,0.2);">
            <h3>${cat.name}</h3>
        `;
        grid.appendChild(card);
    });
}

function openCategory(categoryId) {
    currentCategory = categoryId;
    currentFilter = 'All'; // Reset filter when opening a new category
    
    // Update filter buttons UI
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    buttons[0].classList.add('active'); // Set "All" as active

    const catName = productCategories.find(c => c.id === categoryId).name;
    document.getElementById('shopTitle').innerText = catName;
    
    document.getElementById('categoryGrid').style.display = 'none';
    document.getElementById('productView').style.display = 'block';
    
    renderCategoryProducts();
}

function closeCategory() {
    currentCategory = null;
    document.getElementById('categoryGrid').style.display = 'grid';
    document.getElementById('productView').style.display = 'none';
    document.getElementById('shopTitle').innerText = 'Component Categories';
}

window.filterProducts = function(condition, btnElement) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    currentFilter = condition;
    renderCategoryProducts();
};

function renderCategoryProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';
    
    let filteredList = products.filter(p => p.category === currentCategory);
    
    if(currentFilter !== 'All') {
        filteredList = filteredList.filter(p => p.condition === currentFilter);
    }
    
    if(filteredList.length === 0) {
        grid.innerHTML = '<h3 style="color:var(--text-muted); grid-column: 1 / -1; text-align:center;">No products found in this category.</h3>';
        return;
    }
    
    filteredList.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const badgeHTML = product.badge ? `<div class="badge">${product.badge}</div>` : '';
        const conditionBadge = product.condition === "Brand New" 
            ? `<div style="color:#00e5ff; font-weight:bold; font-size:0.8rem; margin-bottom:5px;">[BRAND NEW]</div>`
            : `<div style="color:#b400ff; font-weight:bold; font-size:0.8rem; margin-bottom:5px;">[USED]</div>`;
        
        card.innerHTML = `
            ${badgeHTML}
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                ${conditionBadge}
                <h3>${product.name}</h3>
                <p>${product.description}</p>
            </div>
            <div class="product-footer">
                <div class="price">${formatLKR(product.price)}</div>
                <button class="add-btn" onclick="addToCart(${product.id}, event)">Add</button>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// --- CART LOGIC ---
const cartModal = document.getElementById('cartModal');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartBtnIcon = document.getElementById('cartBtn');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotalValue = document.getElementById('cartTotalValue');

cartBtnIcon.addEventListener('click', () => {
    cartModal.classList.add('open');
    cartOverlay.style.display = 'block';
    renderCart();
});

function closeCart() {
    cartModal.classList.remove('open');
    cartOverlay.style.display = 'none';
}

closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

window.addToCart = function(productId, event) {
    const product = products.find(p => p.id === productId);
    if(product) {
        cart.push(product);
        updateCartIcon();
        renderCart();
        
        if(event) {
            const btn = event.target;
            const originalText = btn.innerText;
            btn.innerText = "Added!";
            btn.style.background = "var(--accent-cyan)";
            btn.style.color = "#000";
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "";
                btn.style.color = "";
            }, 1000);
        }
    }
};

function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    if(cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color:gray; margin-top:20px;">Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div style="color:var(--accent-cyan); font-weight:bold;">${formatLKR(item.price)}</div>
                    </div>
                    <i class="fas fa-trash" style="margin-top:auto; margin-bottom:auto; margin-left:auto; cursor:pointer; color:#ff4d4d; font-size:1.2rem;" onclick="removeFromCart(${index})"></i>
                </div>
            `;
        });
    }
    cartTotalValue.innerText = formatLKR(total);
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartIcon();
    renderCart();
};

function updateCartIcon() {
    document.getElementById('cartCount').innerText = cart.length;
}

// --- CHECKOUT LOGIC ---
window.proceedToCheckout = function() {
    if (cart.length === 0) {
        alert("Your cart is empty. Add some components first!");
        return;
    }
    closeCart();
    navigateTo('checkout');
    renderCheckoutSummary();
};

function renderCheckoutSummary() {
    const container = document.getElementById('checkoutItemsContainer');
    const totalEl = document.getElementById('checkoutTotalValue');
    container.innerHTML = '';
    
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        container.innerHTML += `
            <div class="checkout-item">
                <img src="${item.image}" alt="">
                <div class="checkout-item-details">
                    <h4>${item.name}</h4>
                    <div style="color:var(--accent-cyan); font-weight:bold;">${formatLKR(item.price)}</div>
                </div>
            </div>
        `;
    });
    totalEl.innerText = formatLKR(total);
}

window.placeOrder = function(e) {
    e.preventDefault();
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const orderData = {
        id: "ORD-" + new Date().getTime(),
        date: new Date().toLocaleDateString(),
        customer: document.getElementById('chkName').value,
        phone: document.getElementById('chkPhone').value,
        address: document.getElementById('chkAddress').value + ", " + document.getElementById('chkCity').value,
        items: [...cart],
        total: cart.reduce((sum, item) => sum + item.price, 0)
    };

    orders.push(orderData);
    saveOrders();

    alert("Order placed successfully! Thank you for choosing Nexus Rigs.");
    
    // Clear cart
    cart = [];
    updateCartIcon();
    renderCart();
    document.getElementById('checkoutForm').reset();
    
    navigateTo('home');
};

// --- MOBILE MENU ---
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

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

// --- ADMIN SYSTEM ---
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;

    if (email === 'nethildulmina2008@gmail.com' && pass === 'SANdeepa@346') {
        isAdmin = true;
        localStorage.setItem('nexus_admin', 'true');
        alert('Admin Login Successful!');
        updateNavAuth();
        navigateTo('admin');
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPass').value = '';
    } else {
        alert('Invalid Admin Credentials!');
    }
}

window.logoutAdmin = function() {
    isAdmin = false;
    localStorage.removeItem('nexus_admin');
    updateNavAuth();
    navigateTo('home');
    alert('Logged out from Admin Panel.');
};

// Admin UI Logic
function renderAdminProducts() {
    const tbody = document.getElementById('adminTableBody');
    tbody.innerHTML = '';
    
    products.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${p.image}" class="admin-prod-img" alt="product"></td>
            <td>${p.name} <br> <span style="font-size:0.8rem; color:var(--text-muted);">${p.condition}</span></td>
            <td>${p.category}</td>
            <td>${formatLKR(p.price)}</td>
            <td>
                <button class="action-btn edit-btn" onclick="openAdminModal(${p.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete-btn" onclick="deleteAdminProduct(${p.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.openAdminModal = function(id = null) {
    document.getElementById('adminModalOverlay').style.display = 'block';
    document.getElementById('adminModal').style.display = 'block';
    const form = document.getElementById('adminProductForm');
    form.reset();
    document.getElementById('editProductId').value = '';
    document.getElementById('adminModalTitle').innerText = 'Add Product';
    
    if (id !== null) {
        document.getElementById('adminModalTitle').innerText = 'Edit Product';
        const p = products.find(prod => prod.id === id);
        if(p) {
            document.getElementById('editProductId').value = p.id;
            document.getElementById('pName').value = p.name;
            document.getElementById('pCategory').value = p.category;
            document.getElementById('pCondition').value = p.condition;
            document.getElementById('pPrice').value = p.price;
            document.getElementById('pImage').value = p.image;
            document.getElementById('pDesc').value = p.description;
        }
    }
};

window.closeAdminModal = function() {
    document.getElementById('adminModalOverlay').style.display = 'none';
    document.getElementById('adminModal').style.display = 'none';
};

window.saveAdminProduct = function(e) {
    e.preventDefault();
    const idVal = document.getElementById('editProductId').value;
    
    const productData = {
        name: document.getElementById('pName').value,
        category: document.getElementById('pCategory').value,
        condition: document.getElementById('pCondition').value,
        price: parseFloat(document.getElementById('pPrice').value),
        image: document.getElementById('pImage').value,
        description: document.getElementById('pDesc').value
    };

    if (idVal) {
        // Edit existing
        const index = products.findIndex(p => p.id == idVal);
        if(index !== -1) {
            products[index] = { ...products[index], ...productData };
        }
    } else {
        // Add new
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        productData.id = newId;
        products.push(productData);
    }
    
    saveProducts();
    closeAdminModal();
    renderAdminProducts();
    
    // Refresh shop view if user goes back to components page
    renderCategoryProducts(); 
};

window.deleteAdminProduct = function(id) {
    if(confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== id);
        saveProducts();
        renderAdminProducts();
    }
};

window.switchAdminTab = function(tabId) {
    document.getElementById('tab-admin-products').classList.remove('active');
    document.getElementById('tab-admin-orders').classList.remove('active');
    
    document.getElementById('admin-products-view').style.display = 'none';
    document.getElementById('admin-orders-view').style.display = 'none';
    
    document.getElementById('tab-admin-' + tabId).classList.add('active');
    document.getElementById('admin-' + tabId + '-view').style.display = 'block';
};

function renderAdminOrders() {
    const tbody = document.getElementById('adminOrdersTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    if(orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">No orders found.</td></tr>';
        return;
    }

    // Sort newest first
    const sortedOrders = [...orders].reverse();
    
    sortedOrders.forEach(o => {
        const itemsList = o.items.map(i => i.name).join(', ');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${o.id}</strong></td>
            <td>
                ${o.customer}<br>
                <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">
                    <i class="fas fa-phone" style="margin-right:4px;"></i>${o.phone} <br>
                    <i class="fas fa-map-marker-alt" style="margin-right:4px;"></i>${o.address}
                </div>
            </td>
            <td style="max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${itemsList}">${itemsList}</td>
            <td style="color:var(--accent-cyan); font-weight:bold;">${formatLKR(o.total)}</td>
            <td>${o.date}</td>
        `;
        tbody.appendChild(tr);
    });
}

window.clearOrders = function() {
    if(confirm("Are you sure you want to delete all order history? This cannot be undone.")) {
        orders = [];
        saveOrders();
        renderAdminOrders();
    }
};

// --- CHATBOT ---
const chatWidget = document.getElementById('chatWidget');
const chatHeader = document.getElementById('chatHeader');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');

chatHeader.addEventListener('click', () => chatWidget.classList.toggle('open'));

function sendMessage() {
    const text = chatInput.value.trim();
    if(text !== "") {
        const uMsg = document.createElement('div');
        uMsg.className = 'chat-message user-msg';
        uMsg.innerText = text;
        chatBody.appendChild(uMsg);
        
        chatInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;
        
        setTimeout(() => {
            const bMsg = document.createElement('div');
            bMsg.className = 'chat-message bot-msg';
            bMsg.innerHTML = "ඔබට සහාය වීමට මා සූදානම්! කරුණාකර අපගේ WhatsApp අංකය හරහා සම්බන්ධ වන්න: <br><br> <a href='https://wa.me/94741304285' target='_blank' style='color:var(--accent-cyan); font-weight:bold; text-decoration:none;'><i class='fab fa-whatsapp'></i> +94 74 130 4285 වෙත පිවිසෙන්න</a>";
            chatBody.appendChild(bMsg);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000);
    }
}
sendChatBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') sendMessage(); });

// Init
checkMobileMenu();
updateNavAuth();

// Auth Logic
window.switchAuth = function(mode) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    
    if(mode === 'login') {
        loginForm.style.display = 'flex';
        registerForm.style.display = 'none';
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'flex';
        tabLogin.classList.remove('active');
        tabRegister.classList.add('active');
    }
};
