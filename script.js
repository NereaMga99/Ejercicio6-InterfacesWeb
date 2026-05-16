// Tema claro/oscuro 
const toggleBtn = document.getElementById("toggle-theme");
if (toggleBtn) {
    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("theme-dark");
        toggleBtn.textContent = "☀️";
        toggleBtn.setAttribute("aria-pressed", "true");
    } else {
        toggleBtn.setAttribute("aria-pressed", "false");
    }

    toggleBtn.addEventListener("click", () => {
        document.documentElement.classList.toggle("theme-dark");
        const dark = document.documentElement.classList.contains("theme-dark");
        
        toggleBtn.textContent = dark ? "☀️" : "🌙";
        toggleBtn.setAttribute("aria-pressed", dark ? "true" : "false");

        localStorage.setItem("theme", dark ? "dark" : "light");
    });
}

// Menú principal (hamburguesa)
const hamburger = document.querySelector(".hamburger");
const navMenu  = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.setAttribute("aria-expanded", "false");
    navMenu.setAttribute("aria-hidden", "true");

    hamburger.addEventListener("click", () => {
        const abierto = hamburger.getAttribute("aria-expanded") === "true";

    hamburger.setAttribute("aria-expanded", String(!abierto));
    navMenu.setAttribute("aria-hidden", String(abierto));

    navMenu.classList.toggle("active");
    });
}

//  Menú de idioma 
const dropBtn = document.querySelector(".dropbtn");
const dropMenu = document.querySelector(".dropdown-content");

if (dropBtn && dropMenu) {
    dropBtn.addEventListener("click", (event) => {
    event.preventDefault(); 

    const abierto = dropBtn.getAttribute("aria-expanded") === "true";

    dropBtn.setAttribute("aria-expanded", String(!abierto));
    dropMenu.setAttribute("aria-hidden", String(abierto));

    dropMenu.classList.toggle("active");
    });
}

//  Menú TEMÁTICA (biblioteca) 
document.addEventListener("DOMContentLoaded", () => {
    const aside = document.getElementById("menu-tematicas");
    if (!aside) return;
    const title = aside.querySelector("h2");
    if (!title) return;
    title.addEventListener("click", () => {
        aside.classList.toggle("active");
    });
});

//  Animacion de hacer scroll 
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

// Aplicar a las tarjetas y secciones
document.querySelectorAll('.libro-card, .tematicas-container').forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
});

// ANIMACION DE REVEAL 
document.addEventListener("DOMContentLoaded", function() {
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 
    });

    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));
});

// GRAFICA DE INICIOS DE SESION DE LA SECCION PERFIL 
document.addEventListener("DOMContentLoaded", function() {
            const ctx = document.getElementById('graficoPerfil');
            if (ctx) {
                new Chart(ctx, {
                    type: 'line', 
                    data: {
                        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                        datasets: [{
                            label: 'Libros Leídos',
                            data: [2, 4, 3, 5, 2, 6],
                            borderColor: '#7ab57a', 
                            backgroundColor: 'rgba(122, 181, 122, 0.2)', 
                            borderWidth: 2,
                            tension: 0.4, 
                            fill: true,
                            pointBackgroundColor: '#556b2f'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: { 
                        y: { 
                        beginAtZero: true, ticks: { stepSize: 1 } } }
                    }
                });
            // Cuando el ratón ENTRA en la zona de la gráfica
            ctx.addEventListener('mouseenter', () => {
                miGrafico.data.datasets[0].borderColor = colorAzul;
                miGrafico.data.datasets[0].backgroundColor = fondoAzul;
                miGrafico.update(); 
            });

            ctx.addEventListener('mouseleave', () => {
                miGrafico.data.datasets[0].borderColor = colorVerde;
                miGrafico.data.datasets[0].backgroundColor = fondoVerde;
                miGrafico.update(); 
            });
                }
        });

// Accesibilidad skip-link
const skipLink = document.querySelector('.skip-link');
if (skipLink) {
    skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = skipLink.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.focus();
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Atajos de Teclado Personalizados
window.addEventListener('keydown', (e) => {
    // Atajo Alt + S -> Volver a la parte superior
    if (e.altKey && e.key.toLowerCase() === 's') {
        e.preventDefault(); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        if (skipLink) {
            skipLink.focus();
        }
    }

    // Atajo Alt + B -> Ir directamente a la barra de búsqueda (tienda y biblioteca)
    if (e.altKey && e.key.toLowerCase() === 'b') {
        const searchInput = document.querySelector('.search-input input');
        if (searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    }
});

// Botón de Subir (Scroll) 
document.addEventListener("DOMContentLoaded", () => {
    const btnSubir = document.getElementById('btn-subir');

    if (btnSubir) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                btnSubir.classList.add('mostrar');
            } else {
                btnSubir.classList.remove('mostrar');
            }
        });

        btnSubir.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            document.documentElement.scrollTop = 0; 
            document.body.scrollTop = 0; 
        });
    }
});

// SISTEMA DE NOTIFICACIONES TOAST 
(function () {
    let cont = document.getElementById('toast-contenedor');
    if (!cont) {
        cont = document.createElement('div');
        cont.id = 'toast-contenedor';
        cont.setAttribute('aria-live', 'polite');
        cont.setAttribute('aria-atomic', 'false');
        document.body.appendChild(cont);
    }

    window.mostrarToast = function (msg, tipo, duracion) {
        tipo     = tipo     || 'exito';
        duracion = duracion || 3200;
        var iconos = { exito: '✅', error: '❌', aviso: '⚠️', info: 'ℹ️' };
        var clases = { exito: '', error: 'toast-error', aviso: 'toast-aviso', info: 'toast-info' };

        var t = document.createElement('div');
        t.className = 'toast-notif ' + (clases[tipo] || '');
        t.setAttribute('role', 'alert');
        t.innerHTML =
            '<span class="toast-icono-notif" aria-hidden="true">' + (iconos[tipo] || '📢') + '</span>' +
            '<span>' + msg + '</span>' +
            '<button class="toast-cerrar-notif" aria-label="Cerrar">✕</button>';

        t.querySelector('.toast-cerrar-notif').addEventListener('click', function () { cerrar(t); });
        cont.appendChild(t);

        var timer = setTimeout(function () { cerrar(t); }, duracion);
        t._timer = timer;
    };

    function cerrar(t) {
        clearTimeout(t._timer);
        t.classList.add('saliendo');
        setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 380);
    }
})();

// NOTIFICACIONES EN BOTONES 
document.addEventListener('DOMContentLoaded', function () {

    // Estrellas de valoración
    document.querySelectorAll('.rating').forEach(function (grupo) {
        grupo.querySelectorAll('input[type="radio"]').forEach(function (radio) {
            radio.addEventListener('change', function () {
                mostrarToast('¡Valoración de ' + radio.value + ' estrella' + (radio.value > 1 ? 's' : '') + ' guardada!', 'exito', 2800);
            });
        });
    });

    // Botones del perfil
    var btnEditar = document.getElementById('btn-editar-perfil');
    if (btnEditar) btnEditar.addEventListener('click', function () { mostrarToast('Abriendo editor de perfil…', 'info'); });

    var btnPass = document.getElementById('btn-cambiar-pass');
    if (btnPass) btnPass.addEventListener('click', function () { mostrarToast('Redirigiendo al cambio de contraseña…', 'info'); });

    var btnFoto = document.getElementById('btn-cambiar-foto');
    if (btnFoto) btnFoto.addEventListener('click', function () { mostrarToast('Selecciona una nueva foto de perfil.', 'aviso'); });

    var btnCerrar = document.getElementById('btn-cerrar-sesion');
    if (btnCerrar) btnCerrar.addEventListener('click', function () { mostrarToast('Sesión cerrada correctamente. ¡Hasta pronto!', 'exito', 3500); });

    var btnVolver = document.querySelector('.volver-biblioteca');
    if (btnVolver) {
        btnVolver.addEventListener('click', function (e) {
            e.preventDefault();
            mostrarToast('Volviendo a tu biblioteca…', 'info', 1800);
            var href = btnVolver.getAttribute('href');
            setTimeout(function () { window.location.href = href; }, 1600);
        });
    }
});

// CARRUSEL (sección Últimos libros leídos) 
document.addEventListener('DOMContentLoaded', function () {
    var pista  = document.getElementById('carrusel-pista-libros');
    var dots   = document.getElementById('carrusel-dots-libros');
    var btnP   = document.getElementById('carrusel-prev');
    var btnN   = document.getElementById('carrusel-next');
    if (!pista) return;

    var items   = pista.querySelectorAll('article');
    var total   = items.length;
    var indice  = 0;
    var timer   = null;

    function anchoItem() {
        return items[0] ? (items[0].offsetWidth + 32) : 232; 
    }

    function maxI() {
        var ventana = pista.parentElement;
        var visibles = ventana ? Math.floor(ventana.clientWidth / anchoItem()) : 1;
        visibles = Math.max(visibles, 1);
        return Math.max(0, total - visibles);
    }

    function irA(n) {
        indice = Math.max(0, Math.min(n, maxI()));
        pista.style.transform = 'translateX(-' + (indice * anchoItem()) + 'px)';
        actualizarDots();
    }

    function siguiente() { irA(indice >= maxI() ? 0 : indice + 1); }
    function anterior()  { irA(indice <= 0 ? maxI() : indice - 1); }
    function crearDots() {
        if (!dots) return;
        dots.innerHTML = '';
        for (var i = 0; i <= maxI(); i++) {
            (function (idx) {
                var d = document.createElement('button');
                d.className = 'carrusel-dot-libros' + (idx === 0 ? ' activo' : '');
                d.setAttribute('aria-label', 'Ir a página ' + (idx + 1));
                d.addEventListener('click', function () { irA(idx); iniciarAuto(); });
                dots.appendChild(d);
            })(i);
        }
    }

    function actualizarDots() {
        if (!dots) return;
        dots.querySelectorAll('.carrusel-dot-libros').forEach(function (d, i) {
            d.classList.toggle('activo', i === indice);
        });
    }

    function iniciarAuto() { pararAuto(); timer = setInterval(siguiente, 3800); }
    function pararAuto()   { if (timer) { clearInterval(timer); timer = null; } }

    if (btnP) btnP.addEventListener('click', function () { anterior(); iniciarAuto(); });
    if (btnN) btnN.addEventListener('click', function () { siguiente(); iniciarAuto(); });

    var wrapper = document.getElementById('carrusel-libros');
    if (wrapper) {
        wrapper.addEventListener('mouseenter', pararAuto);
        wrapper.addEventListener('mouseleave', iniciarAuto);
        var tx = null;
        wrapper.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
        wrapper.addEventListener('touchend',   function (e) {
            if (tx === null) return;
            var d = tx - e.changedTouches[0].clientX;
            if (Math.abs(d) > 40) { d > 0 ? siguiente() : anterior(); iniciarAuto(); }
            tx = null;
        }, { passive: true });
    }

    crearDots();
    iniciarAuto();
    window.addEventListener('resize', function () { crearDots(); irA(0); });
});

// PESTAÑAS (sección Explora por temáticas)
document.addEventListener('DOMContentLoaded', function () {
    var tabList = document.querySelector('.pestanas-nav[role="tablist"]');
    if (!tabList) return;

    var botones = tabList.querySelectorAll('.pestana-btn');

    botones.forEach(function (btn) {
        btn.addEventListener('click', function () {
            botones.forEach(function (b) {
                b.classList.remove('pestana-activa');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('pestana-activa');
            btn.setAttribute('aria-selected', 'true');

            var panelIds = ['tab-todos', 'tab-fantasia', 'tab-romance', 'tab-terror', 'tab-accion'];
            panelIds.forEach(function (id) {
                var panel = document.getElementById(id);
                if (panel) panel.hidden = true;
            });

            var panelId = btn.getAttribute('aria-controls');
            var panelActivo = document.getElementById(panelId);
            if (panelActivo) panelActivo.hidden = false;
        });

        btn.addEventListener('keydown', function (e) {
            var lista = Array.from(botones);
            var pos   = lista.indexOf(btn);
            if (e.key === 'ArrowRight' && pos < lista.length - 1) lista[pos + 1].click();
            if (e.key === 'ArrowLeft'  && pos > 0)                lista[pos - 1].click();
        });
    });
});


// ACORDEÓN 
document.addEventListener('DOMContentLoaded', function () {
    var acord = document.getElementById('acordeon-faq');
    if (!acord) return;

    acord.querySelectorAll('.acordeon-cabecera').forEach(function (cab) {
        cab.addEventListener('click', function () {
            var abierto = cab.getAttribute('aria-expanded') === 'true';
            var idContenido = cab.getAttribute('aria-controls');
            var cuerpo = document.getElementById(idContenido);

            acord.querySelectorAll('.acordeon-cabecera').forEach(function (c) {
                c.setAttribute('aria-expanded', 'false');
                var id = c.getAttribute('aria-controls');
                var cu = document.getElementById(id);
                if (cu) { cu.classList.remove('abierto'); }
            });

            if (!abierto && cuerpo) {
                cab.setAttribute('aria-expanded', 'true');
                requestAnimationFrame(function () { cuerpo.classList.add('abierto'); });
            }
        });
    });
});

// CARRITO (almacenamiento + panel lateral + notificaciones)
const KEY = 'mina_carrito';
const corta = (t, n = 30) => t.length > n ? t.slice(0, n) + '…' : t;

// CARRITO (localStorage)
const Carrito = {
    obtener: () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } },
    guardar(items) {
        localStorage.setItem(KEY, JSON.stringify(items));
        this.actualizarBadge();
    },
    aniadir(p) {
        const items = this.obtener();
        const ex = items.find(i => i.id == p.id);
        ex ? ex.cantidad++ : items.push({ ...p, cantidad: 1 });
        this.guardar(items);
        toast(`✅ "${corta(p.nombre)}" añadido al carrito.`);
    },
    eliminar(id) { this.guardar(this.obtener().filter(i => i.id != id)); },
    cambiarCantidad(id, d) {
        const items = this.obtener();
        const it = items.find(i => i.id == id);
        if (!it) return;
        it.cantidad += d;
        this.guardar(it.cantidad <= 0 ? items.filter(i => i.id != id) : items);
    },
    vaciar() { localStorage.removeItem(KEY); this.actualizarBadge(); },
    actualizarBadge() {
        const n = this.obtener().reduce((a, i) => a + i.cantidad, 0);
        document.querySelectorAll('.carrito-badge').forEach(b => {
            b.textContent = n || '';
            b.style.display = n ? 'flex' : 'none';
        });
    }
};

// TOAST
function toast(msg) {
    let t = document.getElementById('carrito-toast');
    if (!t) {
        t = Object.assign(document.createElement('div'), { id: 'carrito-toast', role: 'alert' });
        document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('toast-visible');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('toast-visible'), 3000);
}

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
    Carrito.actualizarBadge();

    // Panel lateral. Se usa <div> (no <aside>) porque <aside> tiene rol
    // implícito "complementary" que entra en conflicto con role="dialog".
    const panel = Object.assign(document.createElement('div'), {
        id: 'panel-carrito',
        innerHTML: `
            <div class="panel-carrito-header">
                <h2>🛒 Tu carrito</h2>
                <button class="panel-carrito-cerrar" aria-label="Cerrar">✕</button>
            </div>
            <ul class="panel-carrito-lista"></ul>
            <div class="panel-carrito-footer">
                <div class="panel-total-linea"><span>Total:</span><strong>0.00€</strong></div>
                <a href="carrito.html" class="panel-btn-carrito">Pagar ahora</a>
            </div>`
    });
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'Resumen del carrito');

    const overlay = Object.assign(document.createElement('div'), { id: 'panel-carrito-overlay' });
    document.body.append(panel, overlay);

    const lista = panel.querySelector('.panel-carrito-lista');
    const totalEl = panel.querySelector('.panel-total-linea strong');

    const togglePanel = (abrir) => {
        if (abrir) render();
        panel.classList.toggle('panel-abierto', abrir);
        overlay.classList.toggle('overlay-visible', abrir);
        document.body.style.overflow = abrir ? 'hidden' : '';
    };

    const render = () => {
        const items = Carrito.obtener();
        let total = 0;
        lista.innerHTML = items.length
            ? items.map(it => {
                const sub = (+it.precio * it.cantidad).toFixed(2);
                total += +sub;
                return `
                    <li class="panel-item">
                        <img src="${it.img}" alt="${it.nombre}">
                        <div style="flex:1">
                            <p class="panel-item-nombre">${corta(it.nombre)}</p>
                            <p class="panel-item-det">×${it.cantidad} — ${sub}€</p>
                        </div>
                        <button class="panel-item-borrar" data-id="${it.id}" aria-label="Eliminar">🗑️</button>
                    </li>`;
            }).join('')
            : '<li class="panel-vacio">Tu carrito está vacío.</li>';
        totalEl.textContent = total.toFixed(2) + '€';
    };

    // Eventos del panel
    overlay.addEventListener('click', () => togglePanel(false));
    panel.querySelector('.panel-carrito-cerrar').addEventListener('click', () => togglePanel(false));
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && panel.classList.contains('panel-abierto')) togglePanel(false);
    });
    lista.addEventListener('click', e => {
        const btn = e.target.closest('.panel-item-borrar');
        if (btn) { Carrito.cambiarCantidad(btn.dataset.id, -1); render(); }
    });

    // Interceptar icono del carrito (excepto en carrito.html)
    if (!location.pathname.endsWith('carrito.html')) {
        document.querySelectorAll('a[href="carrito.html"]').forEach(a =>
            a.addEventListener('click', e => { e.preventDefault(); togglePanel(true); })
        );
    }

    // Botones "Añadir al carrito" 
    document.querySelectorAll('.btn-aniadir-carrito').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('[data-id]');
            if (!card) return;
            const { id, nombre, precio, img } = card.dataset;
            Carrito.aniadir({ id, nombre, precio, img });
            btn.textContent = '✔ Añadido';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = '🛒 Añadir al carrito';
                btn.disabled = false;
            }, 2000);
        });
    });
});