document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".star");
    const messageBox = document.getElementById("message-box");
    const messageText = document.getElementById("message-text"); // Elemen teks
    const messageImage = document.getElementById("message-image"); // Elemen gambar
    const bgMusic = document.getElementById("bg-music");
    const playMusicBtn = document.getElementById("play-music");
    const fakeEnding = document.getElementById("fake-ending");
    const superStar = document.getElementById("super-star");
    const videoContainer = document.getElementById("video-container");
    const surpriseVideo = document.getElementById("surprise-video");
    const closeVideoBtn = document.getElementById("close-video");
    
    let clickedStars = 0;
    const totalStars = stars.length;
    
    // Menentukan sumber musik dan memuatnya
    bgMusic.src = "The 1975 - About You.mp3"; // Pastikan file ada di lokasi yang benar
    bgMusic.load();

    // Fungsi untuk memunculkan pesan & gambar saat bintang diklik
    stars.forEach(star => {
        star.addEventListener("click", function () {
            const message = this.getAttribute("data-message");
            const imageSrc = this.getAttribute("data-image"); // Ambil gambar dari atribut
            showMessage(message, imageSrc, this);
            
            clickedStars++;
            if (clickedStars === totalStars) {
                setTimeout(triggerFakeEnding, 3000); // Fake Ending muncul setelah semua bintang diklik
            }
        });
    });

    // Fungsi untuk menampilkan pesan & gambar
    function showMessage(message, imageSrc, starElement) {
        messageText.innerText = message; // Set teks pesan

        // Tampilkan gambar jika ada
        if (imageSrc) {
            messageImage.src = imageSrc;
            messageImage.style.display = "block";
        } else {
            messageImage.style.display = "none"; // Sembunyikan gambar jika tidak ada
        }

        messageBox.style.display = "block";

        setTimeout(() => {
            messageBox.style.display = "none";
        }, 5000);

        // Efek animasi bintang dikembalikan seperti sebelumnya
        starElement.style.transform = "scale(2)";
        starElement.style.opacity = "0";
        setTimeout(() => {
            starElement.style.transform = "scale(1)";
            starElement.style.opacity = "1";
        }, 500);
    }

    // Fake Ending muncul
    function triggerFakeEnding() {
        document.body.style.filter = "brightness(30%)";
        fakeEnding.style.display = "block";
        superStar.style.display = "block";
    }

    // Klik Super Star untuk kejutan terakhir
    superStar.addEventListener("click", function () {
        document.body.style.filter = "brightness(100%)";
        fakeEnding.style.display = "none";
        
        // Tampilkan video kejutan
        videoContainer.style.display = "block";
        surpriseVideo.play();
    });

    // Tombol untuk menutup video
    closeVideoBtn.addEventListener("click", function () {
        surpriseVideo.pause();
        surpriseVideo.currentTime = 0;
        videoContainer.style.display = "none";
    });

    // Memainkan musik saat tombol diklik
    playMusicBtn.addEventListener("click", function () {
        bgMusic.play().then(() => {
            playMusicBtn.style.display = "none"; // Sembunyikan tombol setelah dipencet
            document.getElementById("record-disc").style.display = "block"; // Munculkan vinyl
        }).catch(error => {
            console.error("Gagal memutar musik:", error);
        });
    });

    // Fungsi untuk membuat efek bintang jatuh
    function getRandomColor() {
        const colors = ["#ff0000", "#ff7300", "#ffeb00", "#00ff00", "#007bff", "#6f00ff", "#ff00ff"];
        return colors[Math.floor(Math.random() * colors.length)];
    }
});
