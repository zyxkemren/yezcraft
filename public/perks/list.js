// Menggunakan kelas umum untuk menutup semua popup
const closePopupBtns = document.querySelectorAll(".close");
const popupContainers = document.querySelectorAll(".popup-container");

// Fungsi untuk menutup semua popup
function closeAllPopups() {
  popupContainers.forEach((container) => {
    container.style.display = "none";
  });
}

// Menambahkan event listener untuk tombol close pada setiap popup
closePopupBtns.forEach((btn) => {
  btn.addEventListener("click", closeAllPopups);
});

// Menambahkan event listener untuk setiap tombol rank
document.querySelectorAll(".rank").forEach((rank) => {
  rank.addEventListener("click", function () {
    const overlayId = rank.dataset.overlay; // Mendapatkan ID overlay dari atribut data
    const overlay = document.getElementById(overlayId);
    closeAllPopups(); // Menutup semua popup sebelum menampilkan yang baru
    overlay.style.display = "block"; // Menampilkan overlay yang sesuai dengan tombol yang ditekan
  });
});
