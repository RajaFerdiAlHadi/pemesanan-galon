document.addEventListener("DOMContentLoaded", initDB);

// Show form based on formType
function showForm(formType) {
  document.querySelectorAll(".form-section").forEach((form) => {
    form.style.display = "none";
  });
  document.getElementById(formType + "Form").style.display = "block";
}

// Handle Pesanan form submission
document.getElementById("formPesanan").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    nama: document.getElementById("nama").value,
    alamat: document.getElementById("alamat").value,
    hp: document.getElementById("hp").value,
    tanggalPesanan: new Date().toISOString(),
  };

  const transaction = db.transaction(["pesanan"], "readwrite");
  const store = transaction.objectStore("pesanan");

  const id = document.getElementById("pesananId").value;
  if (id) {
    data.id = parseInt(id);
    store.put(data);
  } else {
    store.add(data);
  }

  transaction.oncomplete = () => {
    document.getElementById("formPesanan").reset();
    document.getElementById("pesananId").value = "";
    loadPesananList();
  };
});

// Handle Pelanggan form submission
document.getElementById("formPelanggan").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    namaPelanggan: document.getElementById("namaPelanggan").value,
    umur: document.getElementById("umur").value,
    email: document.getElementById("email").value,
  };

  const transaction = db.transaction(["pelanggan"], "readwrite");
  const store = transaction.objectStore("pelanggan");

  const id = document.getElementById("pelangganId").value;
  if (id) {
    data.id = parseInt(id);
    store.put(data);
  } else {
    store.add(data);
  }

  transaction.oncomplete = () => {
    document.getElementById("formPelanggan").reset();
    document.getElementById("pelangganId").value = "";
    loadPelangganList();
  };
});

// Handle Produk form submission
document.getElementById("formProduk").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    namaProduk: document.getElementById("namaProduk").value,
  };

  const transaction = db.transaction(["produk"], "readwrite");
  const store = transaction.objectStore("produk");

  const id = document.getElementById("produkId").value;
  if (id) {
    data.id = parseInt(id);
    store.put(data);
  } else {
    store.add(data);
  }

  transaction.oncomplete = () => {
    document.getElementById("formProduk").reset();
    document.getElementById("produkId").value = "";
    loadProdukList();
  };
});

// Handle Pembayaran form submission
document.getElementById("formPembayaran").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    pembayaran: document.getElementById("pembayaran").value,
  };

  const transaction = db.transaction(["pembayaran"], "readwrite");
  const store = transaction.objectStore("pembayaran");

  const id = document.getElementById("pembayaranId").value;
  if (id) {
    data.id = parseInt(id);
    store.put(data);
  } else {
    store.add(data);
  }

  transaction.oncomplete = () => {
    document.getElementById("formPembayaran").reset();
    document.getElementById("pembayaranId").value = "";
    loadPembayaranList();
  };
});

// Handle Pengiriman form submission
document.getElementById("formPengiriman").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    pengiriman: document.getElementById("pengiriman").value,
  };

  const transaction = db.transaction(["pengiriman"], "readwrite");
  const store = transaction.objectStore("pengiriman");

  const id = document.getElementById("pengirimanId").value;
  if (id) {
    data.id = parseInt(id);
    store.put(data);
  } else {
    store.add(data);
  }

  transaction.oncomplete = () => {
    document.getElementById("formPengiriman").reset();
    document.getElementById("pengirimanId").value = "";
    loadPengirimanList();
  };
});

// Load all data at once
function loadAllData() {
  loadPesananList();
  loadPelangganList();
  loadProdukList();
  loadPembayaranList();
  loadPengirimanList();
}

// Load Pesanan list
function loadPesananList() {
  const pesananList = document.getElementById("pesananList");
  pesananList.innerHTML = "";

  const transaction = db.transaction(["pesanan"], "readonly");
  const store = transaction.objectStore("pesanan");
  const request = store.openCursor();

  request.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      const div = document.createElement("div");
      div.className = "list-item";
      div.innerHTML = `
        <strong>Nama:</strong> ${cursor.value.nama}<br>
        <strong>Alamat:</strong> ${cursor.value.alamat}<br>
        <strong>HP:</strong> ${cursor.value.hp}<br>
        <div class="action-buttons">
  <button class="submit-bt" onclick="editPesanan(${cursor.value.id})">
    <i class="fas fa-edit"></i>
    Edit
  </button>
  <button class="submit-btnn" onclick="deletePesanan(${cursor.value.id})">
    <i class="fas fa-trash"></i>
    Hapus
  </button>
</div>
      `;
      pesananList.appendChild(div);
      cursor.continue();
    }
  };
}

// Load Pelanggan list
function loadPelangganList() {
  const pelangganList = document.getElementById("pelangganList");
  pelangganList.innerHTML = "";

  const transaction = db.transaction(["pelanggan"], "readonly");
  const store = transaction.objectStore("pelanggan");
  const request = store.openCursor();

  request.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      const div = document.createElement("div");
      div.className = "list-item";
      div.innerHTML = `
        <strong>Nama:</strong> ${cursor.value.namaPelanggan}<br>
        <strong>Umur:</strong> ${cursor.value.umur}<br>
        <strong>Email:</strong> ${cursor.value.email}<br>
        <div class="action-buttons">
  <button class="submit-bt" onclick="editPelanggan(${cursor.value.id})">
    <i class="fas fa-edit"></i>
    Edit
  </button>
  <button class="submit-btnn" onclick="deletePelanggan(${cursor.value.id})">
    <i class="fas fa-trash"></i>
    Hapus
  </button>
</div>
      `;
      pelangganList.appendChild(div);
      cursor.continue();
    }
  };
}

// Load Produk list
function loadProdukList() {
  const produkList = document.getElementById("produkList");
  produkList.innerHTML = "";

  const transaction = db.transaction(["produk"], "readonly");
  const store = transaction.objectStore("produk");
  const request = store.openCursor();

  request.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      const div = document.createElement("div");
      div.className = "list-item";
      div.innerHTML = `
        <strong>Nama Produk:</strong> ${cursor.value.namaProduk}<br>
        <div class="action-buttons">
  <button class="submit-bt" onclick="editProduk(${cursor.value.id})">
    <i class="fas fa-edit"></i>
    Edit
  </button>
  <button class="submit-btnn" onclick="deleteProduk(${cursor.value.id})">
    <i class="fas fa-trash"></i>
    Hapus
  </button>
</div>
      `;
      produkList.appendChild(div);
      cursor.continue();
    }
  };
}

// Load Pembayaran list
function loadPembayaranList() {
  const pembayaranList = document.getElementById("pembayaranList");
  pembayaranList.innerHTML = "";

  const transaction = db.transaction(["pembayaran"], "readonly");
  const store = transaction.objectStore("pembayaran");
  const request = store.openCursor();

  request.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      const div = document.createElement("div");
      div.className = "list-item";
      div.innerHTML = `
        <strong>Pembayaran:</strong> ${cursor.value.pembayaran}<br>
        <div class="action-buttons">
  <button class="submit-bt" onclick="editPembayaran(${cursor.value.id})">
    <i class="fas fa-edit"></i>
    Edit
  </button>
  <button class="submit-btnn" onclick="deletePembayaran(${cursor.value.id})">
    <i class="fas fa-trash"></i>
    Hapus
  </button>
</div>
      `;
      pembayaranList.appendChild(div);
      cursor.continue();
    }
  };
}

// Load Pengiriman list
function loadPengirimanList() {
  const pengirimanList = document.getElementById("pengirimanList");
  pengirimanList.innerHTML = "";

  const transaction = db.transaction(["pengiriman"], "readonly");
  const store = transaction.objectStore("pengiriman");
  const request = store.openCursor();

  request.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      const div = document.createElement("div");
      div.className = "list-item";
      div.innerHTML = `
        <strong>Pengiriman:</strong> ${cursor.value.pengiriman}<br>
        <div class="action-buttons">
  <button class="submit-bt" onclick="editPengiriman(${cursor.value.id})">
    <i class="fas fa-edit"></i>
    Edit
  </button>
  <button class="submit-btnn" onclick="deletePengiriman(${cursor.value.id})">
    <i class="fas fa-trash"></i>
    Hapus
  </button>
</div>
      `;
      pengirimanList.appendChild(div);
      cursor.continue();
    }
  };
}

// Edit functions
function editPesanan(id) {
  const transaction = db.transaction(["pesanan"], "readonly");
  const store = transaction.objectStore("pesanan");
  const request = store.get(id);

  request.onsuccess = () => {
    const data = request.result;
    document.getElementById("pesananId").value = data.id;
    document.getElementById("nama").value = data.nama;
    document.getElementById("alamat").value = data.alamat;
    document.getElementById("hp").value = data.hp;
  };
}

function editPelanggan(id) {
  const transaction = db.transaction(["pelanggan"], "readonly");
  const store = transaction.objectStore("pelanggan");
  const request = store.get(id);

  request.onsuccess = () => {
    const data = request.result;
    document.getElementById("pelangganId").value = data.id;
    document.getElementById("namaPelanggan").value = data.namaPelanggan;
    document.getElementById("umur").value = data.umur;
    document.getElementById("email").value = data.email;
  };
}

function editProduk(id) {
  const transaction = db.transaction(["produk"], "readonly");
  const store = transaction.objectStore("produk");
  const request = store.get(id);

  request.onsuccess = () => {
    const data = request.result;
    document.getElementById("produkId").value = data.id;
    document.getElementById("namaProduk").value = data.namaProduk;
  };
}

function editPembayaran(id) {
  const transaction = db.transaction(["pembayaran"], "readonly");
  const store = transaction.objectStore("pembayaran");
  const request = store.get(id);

  request.onsuccess = () => {
    const data = request.result;
    document.getElementById("pembayaranId").value = data.id;
    document.getElementById("pembayaran").value = data.pembayaran;
  };
}

function editPengiriman(id) {
  const transaction = db.transaction(["pengiriman"], "readonly");
  const store = transaction.objectStore("pengiriman");
  const request = store.get(id);

  request.onsuccess = () => {
    const data = request.result;
    document.getElementById("pengirimanId").value = data.id;
    document.getElementById("pengiriman").value = data.pengiriman;
  };
}

// Delete functions
function deletePesanan(id) {
  if (confirm("Yakin ingin menghapus pesanan ini?")) {
    const transaction = db.transaction(["pesanan"], "readwrite");
    const store = transaction.objectStore("pesanan");
    store.delete(id);
    transaction.oncomplete = loadPesananList;
  }
}

function deletePelanggan(id) {
  if (confirm("Yakin ingin menghapus pelanggan ini?")) {
    const transaction = db.transaction(["pelanggan"], "readwrite");
    const store = transaction.objectStore("pelanggan");
    store.delete(id);
    transaction.oncomplete = loadPelangganList;
  }
}

function deleteProduk(id) {
  if (confirm("Yakin ingin menghapus produk ini?")) {
    const transaction = db.transaction(["produk"], "readwrite");
    const store = transaction.objectStore("produk");
    store.delete(id);
    transaction.oncomplete = loadProdukList;
  }
}

function deletePembayaran(id) {
  if (confirm("Yakin ingin menghapus pembayaran ini?")) {
    const transaction = db.transaction(["pembayaran"], "readwrite");
    const store = transaction.objectStore("pembayaran");
    store.delete(id);
    transaction.oncomplete = loadPembayaranList;
  }
}

function deletePengiriman(id) {
  if (confirm("Yakin ingin menghapus pengiriman ini?")) {
    const transaction = db.transaction(["pengiriman"], "readwrite");
    const store = transaction.objectStore("pengiriman");
    store.delete(id);
    transaction.oncomplete = loadPengirimanList;
  }
}
