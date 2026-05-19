document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menú Dinámico (Responsive)
    const btnMenu = document.getElementById('btn-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if(btnMenu && mobileMenu) {
        btnMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // 2. Filtros de Productos
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if(filterBtns.length > 0 && productCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remover clase active de todos los botones
                filterBtns.forEach(b => {
                    b.classList.remove('bg-[#B64E28]', 'text-[#F4F0EB]');
                    b.classList.add('bg-transparent', 'text-[#2A1F1A]');
                });
                // Añadir clase active al botón actual
                btn.classList.add('bg-[#B64E28]', 'text-[#F4F0EB]');
                btn.classList.remove('bg-transparent', 'text-[#2A1F1A]');

                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    if(filterValue === 'all') {
                        card.classList.remove('hide-item');
                    } else {
                        if(card.getAttribute('data-category') === filterValue) {
                            card.classList.remove('hide-item');
                        } else {
                            card.classList.add('hide-item');
                        }
                    }
                });
            });
        });
    }

    // 3. Modales de Productos
    const modal = document.getElementById('product-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalPrice = document.getElementById('modal-price');
    const modalImg = document.getElementById('modal-img');

    if(modal) {
        // Abrir modal
        document.querySelectorAll('.btn-reservar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.product-card');
                const title = card.querySelector('.product-title').innerText;
                const desc = card.querySelector('.product-desc').innerText;
                const price = card.querySelector('.product-price').innerText;
                const imgSrc = card.querySelector('img').src;

                modalTitle.innerText = title;
                modalDesc.innerText = desc;
                modalPrice.innerText = price;
                modalImg.src = imgSrc;

                modal.classList.add('active');
            });
        });

        // Cerrar modal
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Cerrar modal clic afuera
        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // 4. Validación de Formulario (Contacto)
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            const formStatus = document.getElementById('form-status');

            if(nombre === '' || email === '' || mensaje === '') {
                formStatus.innerHTML = '<span class="text-red-500 font-bold">Por favor, completa todos los campos requeridos.</span>';
                return;
            }

            // Validación simple de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)) {
                formStatus.innerHTML = '<span class="text-red-500 font-bold">Por favor, ingresa un correo válido.</span>';
                return;
            }

            // Simular envío
            formStatus.innerHTML = '<span class="text-[#7C8566] font-bold">¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.</span>';
            contactForm.reset();
        });
    }
});