/* 1.DARK MODE TOGGLE */

const darkToggle = document.getElementById('darkToggle'); 
const body = document.body; 


if (localStorage.getItem('darkMode') === 'active') { 
    body.classList.add('dark-mode'); 
    darkToggle.textContent = '☀️'; 
} 

darkToggle.addEventListener('click', function() { 
    body.classList.toggle('dark-mode'); 
    
    if (body.classList.contains('dark-mode')) { 
        darkToggle.textContent = '☀️'; 
        localStorage.setItem('darkMode', 'active'); 
    } else { 
        darkToggle.textContent = '🌙'; 
        localStorage.setItem('darkMode', 'inactive'); 
    } 
}); 

/* 2.MOBILE HAMBURGER MENU */

const hamburger = document.getElementById('hamburger'); 
const navMenu = document.getElementById('nav-menu'); 

hamburger.addEventListener('click', function() { 
    navMenu.classList.toggle('active'); 
    
    if (navMenu.classList.contains('active')) { 
        hamburger.textContent = '✕'; 
    } else { 
        hamburger.textContent = '☰'; 
    } 
}); 


const navLinks = document.querySelectorAll('#nav-menu a'); 
navLinks.forEach(link => { 
    link.addEventListener('click', function() { 
        navMenu.classList.remove('active'); 
        hamburger.textContent = '☰'; 
    }); 
}); 

/* 3.FORM CONTACT (AJAX TANPA REDIRECT) */

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const successMsg = document.getElementById('successMessage');
const errorMsg = document.getElementById('errorMessage');

if(contactForm) {
    contactForm.addEventListener('submit', async function(e) { 
        e.preventDefault(); // Mencegah redirect/pindah halaman
        
        // Ubah tombol jadi loading
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        
        try {
            // Kirim data ke Formspree via Fetch API
            const response = await fetch('https://formspree.io/f/xvkpgjqw', {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // SUKSES: Tampilkan pesan & kosongkan form
                successMsg.style.display = 'block';
                errorMsg.style.display = 'none';
                contactForm.reset(); // Ini yang bikin input hilang saat Go Back
                
                // Sembunyikan pesan setelah 5 detik
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 5000);
            } else {
                // GAGAL: Tampilkan error
                throw new Error('Gagal mengirim');
            }
        } catch (error) {
            errorMsg.style.display = 'block';
            successMsg.style.display = 'none';
        } finally {
            // Kembalikan tombol seperti semula
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }); 
}


/* 4.SCROLL REVEAL & TYPING EFFECT */

const sections = document.querySelectorAll('section'); 
const revealOnScroll = function() { 
    sections.forEach(section => { 
        const sectionTop = section.getBoundingClientRect().top; 
        const screenHeight = window.innerHeight; 
        
        if (sectionTop < screenHeight - 100) { 
            section.style.opacity = '1'; 
            section.style.transform = 'translateY(0)'; 
        } 
    }); 
}; 

sections.forEach(section => { 
    section.style.opacity = '0'; 
    section.style.transform = 'translateY(30px)'; 
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease'; 
}); 

window.addEventListener('scroll', revealOnScroll); 
revealOnScroll(); 

const typingElement = document.getElementById('typing-effect');

if (typingElement) { 
    const text = typingElement.textContent; 
    typingElement.textContent = '';
    
    let i = 0; 
    
    function typeWriter() { 
        if (i < text.length) { 
            typingElement.textContent += text.charAt(i); 
            i++; 
            setTimeout(typeWriter, 80);
        } 
    } 
    
    // Jalankan saat halaman dimuat
    window.addEventListener('load', typeWriter); 
} 



    function updateClock() {
    const now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleTimeString();
}

setInterval(updateClock, 1000);