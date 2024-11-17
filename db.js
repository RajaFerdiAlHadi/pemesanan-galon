let db;

const initDB = () => {
  const request = indexedDB.open("GalonOrderDB", 1);

  request.onerror = (event) => {
    console.error("Database error:", event.target.error);
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    console.log("Database opened successfully");
    loadAllData(); // Assuming loadAllData is a function to load data into the UI
  };

  request.onupgradeneeded = (event) => {
    db = event.target.result;

    // Tabel Pesanan
    if (!db.objectStoreNames.contains("pesanan")) {
      const pesananStore = db.createObjectStore("pesanan", {
        keyPath: "id",
        autoIncrement: true,
      });
      pesananStore.createIndex("nama", "nama", {
        unique: true,
      });
      pesananStore.createIndex("alamat", "alamat", {
        unique: false,
      });
      pesananStore.createIndex("hp", "hp", {
        unique: false,
      });
    }

    // Tabel Pelanggan
    if (!db.objectStoreNames.contains("pelanggan")) {
      const pelangganStore = db.createObjectStore("pelanggan", {
        keyPath: "id",
        autoIncrement: true,
      });
      pelangganStore.createIndex("namaPelanggan", "namaPelanggan", {
        unique: false,
      });
      pelangganStore.createIndex("umur", "umur", {
        unique: false,
      });
      
    
      pelangganStore.createIndex("email", "email", { unique: false });
      
    }

    // Tabel Produk
    if (!db.objectStoreNames.contains("produk")) {
      const produkStore = db.createObjectStore("produk", {
        keyPath: "id",
        autoIncrement: true,
      });
      produkStore.createIndex("namaProduk", "namaProduk", { unique: false });
    }

    // Tabel Pembayaran
    if (!db.objectStoreNames.contains("pembayaran")) {
      const pembayaranStore = db.createObjectStore("pembayaran", {
        keyPath: "id",
        autoIncrement: true,
      });
      pembayaranStore.createIndex("pembayaran", "pembayaran", {
        unique: false,
      });
    }

    // Tabel Pengiriman
    if (!db.objectStoreNames.contains("pengiriman")) {
      const pengirimanStore = db.createObjectStore("pengiriman", {
        keyPath: "id",
        autoIncrement: true,
      });
      pengirimanStore.createIndex("pengiriman", "pengiriman", { unique: false });
     
    }
  };
};
