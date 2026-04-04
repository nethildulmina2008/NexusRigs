let productCategories = [
    { id: "Display", name: "Displays & Screens", image: "https://images.unsplash.com/photo-1592899677974-bed54b5dfd4f?ixlib=rb-4.0.3&w=600&q=80" },
    { id: "Battery", name: "Batteries", image: "https://images.unsplash.com/photo-1601524909162-ae8725290836?ixlib=rb-4.0.3&w=600&q=80" },
    { id: "Housing", name: "Back Covers & Housing", image: "https://images.unsplash.com/photo-1591337676887-a4b7f041fb82?ixlib=rb-4.0.3&w=600&q=80" },
    { id: "Flex", name: "Flex Cables & Ports", image: "https://images.unsplash.com/photo-1601784551446-20c9e07cd8d3?ixlib=rb-4.0.3&w=600&q=80" },
    { id: "Motherboard", name: "Motherboards", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&w=600&q=80" },
    { id: "Camera", name: "Camera Modules", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&w=600&q=80" }
];

const defaultProducts = [
    // Displays
    { id: 1, name: "iPhone 13 Pro Max OLED Display", category: "Display", condition: "Brand New", price: 45000, image: "https://images.unsplash.com/photo-1592899677974-bed54b5dfd4f?ixlib=rb-4.0.3&w=600&q=80", description: "Original Pulled OLED Display for iPhone 13 Pro Max." },
    { id: 2, name: "Samsung Galaxy S22 Ultra Display", category: "Display", condition: "Brand New", price: 55000, image: "https://images.unsplash.com/photo-1592899677974-bed54b5dfd4f?ixlib=rb-4.0.3&w=600&q=80", description: "Service Pack Original Display with frame." },
    { id: 3, name: "iPhone X LCD Incell Screen", category: "Display", condition: "Brand New", price: 6500, image: "https://images.unsplash.com/photo-1592899677974-bed54b5dfd4f?ixlib=rb-4.0.3&w=600&q=80", description: "High-quality Incell aftermarket screen." },

    // Batteries
    { id: 4, name: "iPhone 11 Original Battery", category: "Battery", condition: "Brand New", price: 7500, badge: "Best Seller", image: "https://images.unsplash.com/photo-1601524909162-ae8725290836?ixlib=rb-4.0.3&w=600&q=80", description: "100% Health Original capacity battery." },
    { id: 5, name: "Samsung A52 Battery (Used)", category: "Battery", condition: "Used", price: 2000, image: "https://images.unsplash.com/photo-1601524909162-ae8725290836?ixlib=rb-4.0.3&w=600&q=80", description: "Used battery with 85% remaining life." },

    // Housings
    { id: 6, name: "iPhone 14 Back Glass Housing", category: "Housing", condition: "Brand New", price: 12500, image: "https://images.unsplash.com/photo-1591337676887-a4b7f041fb82?ixlib=rb-4.0.3&w=600&q=80", description: "Full back housing with small parts included." },
    
    // Flex Cables
    { id: 7, name: "iPhone 12 Charging Port Flex", category: "Flex", condition: "Brand New", price: 3500, image: "https://images.unsplash.com/photo-1601784551446-20c9e07cd8d3?ixlib=rb-4.0.3&w=600&q=80", description: "Original charging port flex cable." },
    { id: 8, name: "Redmi Note 10 Power Button Flex", category: "Flex", condition: "Brand New", price: 800, image: "https://images.unsplash.com/photo-1601784551446-20c9e07cd8d3?ixlib=rb-4.0.3&w=600&q=80", description: "Volume and Power button flex cable." },

    // Camera
    { id: 9, name: "iPhone 13 Pro Rear Camera Module", category: "Camera", condition: "Brand New", price: 18000, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&w=600&q=80", description: "Original pulled rear camera." }
];

let products = [];
let orders = [];
let allUsers = [];

// ====== FIREBASE SETUP ======
const firebaseConfig = {
  apiKey: "AIzaSyDmo8Z16XTIC7AiwpaSFGwywCFv-iWtB7I",
  authDomain: "nexus-2722e.firebaseapp.com",
  databaseURL: "https://nexus-2722e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nexus-2722e",
  storageBucket: "nexus-2722e.firebasestorage.app",
  messagingSenderId: "1003347378649",
  appId: "1:1003347378649:web:a39602f040014ab94219c8"
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
} catch (e) {}

const database = firebase.database();

// ONE TIME MIGRATION: Wipe old PC parts and replace with Phone parts
if(!localStorage.getItem('zap_pro_migrated_v1')) {
    database.ref('categories').set(productCategories);
    database.ref('products').set(defaultProducts);
    localStorage.setItem('zap_pro_migrated_v1', 'true');
}

// Listen to categories
database.ref('categories').on('value', (snapshot) => {
    let data = snapshot.val();
    if (data) {
        productCategories = Array.isArray(data) ? data : Object.values(data);
    } else {
        database.ref('categories').set(productCategories); // seed defaults
    }
    
    populateAdminCategories();
    // Only re-render if we are actively on shop categories page
    const pageShop = document.getElementById('page-shop');
    if (pageShop && pageShop.classList.contains('active') && !currentCategory) {
        renderCategories();
    }
    
    // Update admin view if active
    const adminPage = document.getElementById('page-admin');
    if (adminPage && adminPage.classList.contains('active') && document.getElementById('tab-admin-categories').classList.contains('active')) {
        renderAdminCategories();
    }
});

// Listen to products
database.ref('products').on('value', (snapshot) => {
    let data = snapshot.val();
    if (data) {
        products = Array.isArray(data) ? data : Object.values(data);
    } else {
        products = defaultProducts;
        saveProducts(); // Seed initial data
    }
    
    if (currentCategory) renderCategoryProducts();
    const adminPage = document.getElementById('page-admin');
    if (adminPage && adminPage.classList.contains('active') && document.getElementById('tab-admin-products').classList.contains('active')) {
        renderAdminProducts();
    }
}, (error) => {
    console.error("Firebase Read Error: ", error);
});

function saveProducts() {
    database.ref('products').set(products).catch(error => {
        console.error("Firebase Write Error: ", error);
    });
}

// Listen to orders
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

// Listen to users
database.ref('users').on('value', (snapshot) => {
    let data = snapshot.val();
    allUsers = [];
    if (data) {
        allUsers = Object.values(data);
    }
    
    // Update local profile view if logged in
    if(currentUserEmail && !isAdmin) {
        const myUser = allUsers.find(u => u.email === currentUserEmail);
        if(myUser) {
            document.getElementById('profileNameDisplay').innerText = myUser.name;
            document.getElementById('profileEmailDisplay').innerText = myUser.email;
            renderUserOrders(myUser.orders || []);
            
            // Sync cart on initial load if local cart is empty
            if(cart.length === 0 && myUser.cart && myUser.cart.length > 0) {
                cart = myUser.cart;
                updateCartIcon();
                renderCart();
            }
        }
    }

    const adminPage = document.getElementById('page-admin');
    if (adminPage && adminPage.classList.contains('active') && document.getElementById('tab-admin-users').classList.contains('active')) {
        renderAdminUsers();
    }
});

let isAdmin = localStorage.getItem('nexus_admin') === 'true';
let currentUserEmail = localStorage.getItem('nexus_user');

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
    } else if (currentUserEmail) {
        loginContainer.innerHTML = `
            <div class="login-btn-top" onclick="navigateTo('profile')" style="background:var(--accent-cyan); color:#000;">
                <i class="fas fa-user"></i> <span>Profile</span>
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
    if (pageId === 'profile' && !currentUserEmail) {
        alert('Please login first.');
        return;
    }

    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    
    if(pageId === 'shop') {
        renderCategories();
        document.getElementById('categoryGrid').style.display = 'grid';
        document.getElementById('productView').style.display = 'none';
        document.getElementById('shopTitle').innerText = 'Component Categories';
        currentCategory = null;
    } else if(pageId === 'admin') {
        renderAdminProducts();
        renderAdminOrders();
        renderAdminCategories();
        renderAdminUsers();
        switchAdminTab('products');
    }
}

// --- CATEGORY RENDERING ---
function renderCategories() {
    const grid = document.getElementById('categoryGrid');
    if(!grid) return;
    grid.innerHTML = '';
    
    productCategories.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.onclick = () => openCategory(cat.id || cat.name);
        
        card.innerHTML = `
            <img src="${cat.image}" alt="${cat.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%; box-shadow: 0 0 15px rgba(0,229,255,0.2);">
            <h3>${cat.name}</h3>
        `;
        grid.appendChild(card);
    });
}

function populateAdminCategories() {
    const select = document.getElementById('pCategory');
    if(select) {
        select.innerHTML = '';
        productCategories.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat.name; // Use name as identifier
            opt.innerText = cat.name;
            select.appendChild(opt);
        });
    }
}

function openCategory(categoryId) {
    currentCategory = categoryId;
    currentFilter = 'All'; // Reset filter
    
    const buttons = document.querySelectorAll('.filter-btn');
    if(buttons.length > 0) {
        buttons.forEach(btn => btn.classList.remove('active'));
        buttons[0].classList.add('active');
    }

    const catObj = productCategories.find(c => (c.id || c.name) === categoryId);
    if(catObj) {
        document.getElementById('shopTitle').innerText = catObj.name;
    }
    
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
    
    // Find category name
    const catObj = productCategories.find(c => (c.id || c.name) === currentCategory);
    if(!catObj) return;

    let filteredList = products.filter(p => p.category === catObj.name || p.category === catObj.id);
    
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

function syncCartToDB() {
    if(currentUserEmail && !isAdmin) {
        const uKey = currentUserEmail.replace(/\./g, '_');
        database.ref('users/' + uKey + '/cart').set(cart);
    }
}

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
        syncCartToDB();
        
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
    syncCartToDB();
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
    if (!currentUserEmail) {
        alert("Please login or register to place an order.");
        closeCart();
        navigateTo('login');
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

window.togglePaymentOptions = function(value) {
    const fields = document.getElementById('onlinePaymentFields');
    const btnText = document.getElementById('btnText');
    const btnIcon = document.getElementById('btnIcon');
    if(value === 'ONLINE') {
        fields.style.display = 'block';
        btnText.innerText = 'Pay Securely & Place Order';
        btnIcon.className = 'fas fa-lock';
        document.getElementById('chkCardNo').required = true;
    } else {
        fields.style.display = 'none';
        btnText.innerText = 'Place Order (COD)';
        btnIcon.className = 'fas fa-truck';
        document.getElementById('chkCardNo').required = false;
    }
};

window.placeOrder = function(e) {
    e.preventDefault();
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const btn = e.target.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 8px;"></i> Processing...';
    btn.disabled = true;

    const paymentMethodSelected = document.querySelector('input[name="paymentOption"]:checked').value;

    // Simulate payment gateway delay
    setTimeout(() => {
        let paymentDesc = "Cash on Delivery";
        if(paymentMethodSelected === 'ONLINE') {
            let cardNum = document.getElementById('chkCardNo').value;
            let last4 = cardNum.length > 4 ? cardNum.slice(-4) : "0000";
            paymentDesc = "Online Card (**** " + last4 + ")";
        }
        
        const orderId = "ORD-" + new Date().getTime();

        const orderData = {
            id: orderId,
            date: new Date().toLocaleDateString(),
            customer: document.getElementById('chkName').value,
            phone: document.getElementById('chkPhone').value,
            address: document.getElementById('chkAddress').value + ", " + document.getElementById('chkCity').value,
            paymentMethod: paymentDesc,
            items: [...cart],
            total: cart.reduce((sum, item) => sum + item.price, 0)
        };

        orders.push(orderData);
        saveOrders();

        // Save order to User profile
        if(currentUserEmail) {
            const uKey = currentUserEmail.replace(/\./g, '_');
            const myUser = allUsers.find(u => u.email === currentUserEmail);
            if(myUser) {
                let userOrders = myUser.orders || [];
                userOrders.push(orderData);
                database.ref('users/' + uKey + '/orders').set(userOrders);
            }
        }

        alert("Order Successful! \\nYour order code is " + orderId + ". Thank you for choosing Zap Pro.");
        
        // Clear cart
        cart = [];
        updateCartIcon();
        renderCart();
        syncCartToDB(); // clear db cart
        document.getElementById('checkoutForm').reset();
        
        btn.innerHTML = originalHTML;
        btn.disabled = false;

        navigateTo('profile');
    }, 2000); // 2 seconds processing delay
};

// --- AUTHENTICATION ---
window.handleRegister = function(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const pass = document.getElementById('regPass').value;
    const uKey = email.replace(/\./g, '_');

    database.ref('users/' + uKey).once('value', snapshot => {
        if (snapshot.exists()) {
            alert("Email already registered!");
        } else {
            const newUser = { name, email, password: pass, cart: [], orders: [] };
            database.ref('users/' + uKey).set(newUser).then(() => {
                alert("Registration successful! You are now logged in.");
                currentUserEmail = email;
                localStorage.setItem('nexus_user', email);
                updateNavAuth();
                navigateTo('home');
                document.getElementById('registerForm').reset();
            });
        }
    });
};

window.handleLogin = function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;

    if (email === 'nethildulmina2008@gmail.com' && pass === 'SANdeepa@346') {
        isAdmin = true;
        currentUserEmail = null;
        localStorage.setItem('nexus_admin', 'true');
        localStorage.removeItem('nexus_user');
        alert('Admin Login Successful!');
        updateNavAuth();
        navigateTo('admin');
        document.getElementById('loginForm').reset();
        return;
    }

    const uKey = email.replace(/\./g, '_');
    database.ref('users/' + uKey).once('value', snapshot => {
        if(snapshot.exists() && snapshot.val().password === pass) {
            currentUserEmail = email;
            isAdmin = false;
            localStorage.removeItem('nexus_admin');
            localStorage.setItem('nexus_user', email);
            updateNavAuth();
            alert("Login successful!");
            
            // Load user cart
            if(snapshot.val().cart) {
                cart = snapshot.val().cart;
                updateCartIcon();
                renderCart();
            }
            
            navigateTo('home');
            document.getElementById('loginForm').reset();
        } else {
            alert("Invalid Email or Password!");
        }
    });
};

window.logoutUser = function() {
    currentUserEmail = null;
    cart = [];
    localStorage.removeItem('nexus_user');
    updateCartIcon();
    renderCart();
    updateNavAuth();
    navigateTo('home');
};

window.logoutAdmin = function() {
    isAdmin = false;
    localStorage.removeItem('nexus_admin');
    updateNavAuth();
    navigateTo('home');
    alert('Logged out from Admin Panel.');
};

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

// User Profile Rendering
function renderUserOrders(ordersList) {
    const tbody = document.getElementById('userOrdersTableBody');
    if(!tbody) return;
    tbody.innerHTML = '';
    
    if(!ordersList || ordersList.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">No orders found.</td></tr>';
        return;
    }
    
    const sorted = [...ordersList].reverse();
    sorted.forEach(o => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-weight:bold; color:var(--accent-cyan);">${o.id}</td>
            <td>${o.date}</td>
            <td>${o.paymentMethod || 'Online'}</td>
            <td style="font-weight:bold;">${formatLKR(o.total)}</td>
            <td><span style="background:rgba(0,255,100,0.2); color:#00ff88; padding:4px 8px; border-radius:5px; font-size:0.8rem;">Processing</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// --- ADMIN SYSTEM ---
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
        const index = products.findIndex(p => p.id == idVal);
        if(index !== -1) {
            products[index] = { ...products[index], ...productData };
        }
    } else {
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        productData.id = newId;
        products.push(productData);
    }
    
    saveProducts();
    closeAdminModal();
    renderAdminProducts();
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
    document.getElementById('tab-admin-categories').classList.remove('active');
    document.getElementById('tab-admin-users').classList.remove('active');
    
    document.getElementById('admin-products-view').style.display = 'none';
    document.getElementById('admin-orders-view').style.display = 'none';
    document.getElementById('admin-categories-view').style.display = 'none';
    document.getElementById('admin-users-view').style.display = 'none';
    
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

window.saveAdminCategory = function(e) {
    e.preventDefault();
    const name = document.getElementById('catAddName').value;
    const image = document.getElementById('catAddImage').value;
    const id = name.replace(/\s+/g, '-');
    
    productCategories.push({id, name, image});
    database.ref('categories').set(productCategories);
    
    document.getElementById('catAddName').value = '';
    document.getElementById('catAddImage').value = '';
    alert("Category Added Successfully!");
};

function renderAdminCategories() {
    const tbody = document.getElementById('adminCategoriesTableBody');
    if(!tbody) return;
    tbody.innerHTML = '';
    
    productCategories.forEach((cat, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${cat.image}" class="admin-prod-img" alt="${cat.name}"></td>
            <td style="font-weight:bold;">${cat.name}</td>
            <td>
                <button class="action-btn delete-btn" onclick="deleteAdminCategory(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.deleteAdminCategory = function(index) {
    if(confirm("Delete this category?")) {
        productCategories.splice(index, 1);
        database.ref('categories').set(productCategories);
    }
};

function renderAdminUsers() {
    const tbody = document.getElementById('adminUsersTableBody');
    if(!tbody) return;
    tbody.innerHTML = '';
    
    if(allUsers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; color:var(--text-muted);">No registered users yet.</td></tr>';
        return;
    }
    
    allUsers.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${u.name}</strong></td>
            <td>${u.email}</td>
            <td style="color: #ffcc00; font-family: monospace;">${u.password}</td>
        `;
        tbody.appendChild(tr);
    });
}

// --- CHATBOT ---
const chatWidget = document.getElementById('chatWidget');
const chatHeader = document.getElementById('chatHeader');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');

chatHeader.addEventListener('click', () => chatWidget.classList.toggle('open'));

let aiModeActive = false;

window.selectChatOption = function(option) {
    if(option === 'AI') {
        aiModeActive = true;
        document.getElementById('chatOptionsContainer').style.display = 'none';
        const bMsg = document.createElement('div');
        bMsg.className = 'chat-message bot-msg';
        bMsg.innerText = "ඔබ දැන් AI Bot සමග සම්බන්ධ වී සිටී. ගැටළුවක් ඇත්නම් අසන්න.";
        chatBody.appendChild(bMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
};

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
            
            if(aiModeActive) {
                bMsg.innerText = "මෙම උපකරණය ගැන දැනට තොරතුරු සොයාගත නොහැක. සාමාන්‍යයෙන් අපගේ සියලුම අලුත් කොටස් සඳහා වසර 3 ක වගකීමක් හිමිවේ.";
            } else {
                bMsg.innerHTML = "කරුණාකර ඉහත විකල්පයකින් එකක් තෝරන්න.";
            }
            
            chatBody.appendChild(bMsg);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000);
    }
}
sendChatBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') sendMessage(); });

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

// Init
checkMobileMenu();
updateNavAuth();

