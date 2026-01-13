    // ========= CONFIG =========
    const WHATS_NUMBER = "5562991606500"; // troque aqui se quiser (formato: 55 + DDD + número)
    const MAPS_QUERY = encodeURIComponent("Goiânia GO"); // troque para o endereço real (ex: "Rua X, 123 - Goiânia - GO")

    // ========= WhatsApp Links =========
    const baseWhats = (msg) => `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(msg)}`;
    const quickMsg = "Olá! Quero agendar um horário na Barbearia Gold.";
    document.querySelectorAll("#whatsTop, #whatsHero, #whatsFooter").forEach(a => a.href = baseWhats(quickMsg));

    // Google Maps open link
    const openMaps = document.getElementById("openMaps");
    openMaps.href = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

    // ========= Mobile Menu =========
    const burger = document.getElementById("burger");
    const menu = document.getElementById("mobilemenu");
    burger?.addEventListener("click", () => {
      const isOpen = menu.style.display === "block";
      menu.style.display = isOpen ? "none" : "block";
      burger.textContent = isOpen ? "☰" : "✕";
    });
    menu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      menu.style.display = "none";
      burger.textContent = "☰";
    }));

    // ========= Reveal on scroll =========
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting){
          e.target.classList.add("show");
          io.unobserve(e.target);
        }
      });
    }, {threshold: .12});
    els.forEach(el => io.observe(el));

    // ========= Subtle tilt on hover (desktop) =========
    const tilts = document.querySelectorAll(".tilt");
    const isTouch = matchMedia("(hover: none)").matches;
    if(!isTouch){
      tilts.forEach(card => {
        card.addEventListener("mousemove", (ev) => {
          const r = card.getBoundingClientRect();
          const x = (ev.clientX - r.left) / r.width - .5;
          const y = (ev.clientY - r.top) / r.height - .5;
          card.style.transform = `perspective(900px) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg) translateY(-2px)`;
        });
        card.addEventListener("mouseleave", () => {
          card.style.transform = "none";
        });
      });
    }

    // ========= Form -> WhatsApp =========
    const form = document.getElementById("formAgendar");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("nome").value.trim();
      const servico = document.getElementById("servico").value;
      const data = document.getElementById("data").value;
      const hora = document.getElementById("hora").value;
      const obs = document.getElementById("obs").value.trim();

      const msg =
`Olá! Quero agendar na Barbearia Gold.

• Nome: ${nome}
• Serviço: ${servico}
• Data: ${data}
• Horário: ${hora}
${obs ? "• Obs: " + obs : ""}

Pode confirmar disponibilidade?`;

      window.open(baseWhats(msg), "_blank", "noopener");
    });

    // Footer year
    document.getElementById("year").textContent = new Date().getFullYear();