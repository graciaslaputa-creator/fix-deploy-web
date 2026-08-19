document.addEventListener("DOMContentLoaded", () => {
  // Tahun footer otomatis.
  document.getElementById("year").textContent = new Date().getFullYear();

  // Tutup menu mobile setelah user memilih menu (kecuali dropdown toggle).
  document.querySelectorAll("#mainNav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (link.classList.contains("dropdown-toggle")) return; // Fix for mobile dropdown

      const nav = document.getElementById("mainNav");
      if (nav.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });

  // Active navigation berdasarkan section yang sedang terlihat.
  const sections = document.querySelectorAll("main section[id], header[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => link.classList.remove("active"));
        const active = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]`,
        );
        if (active) active.classList.add("active");
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));
});
