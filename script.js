// LinkedIn 주소를 여기에 한 번만 넣으면 모든 LinkedIn 버튼에 적용됩니다.
const LINKEDIN_URL = "https://www.linkedin.com/";

document.querySelectorAll("[data-linkedin]").forEach((a) => (a.href = LINKEDIN_URL));

// Hide hero video if assets/hero.mp4 is missing (portrait photo shows instead)
const video = document.querySelector(".hero-video");
video.querySelector("source").addEventListener("error", () => video.remove());
video.addEventListener("loadeddata", () => video.parentElement.classList.add("has-video"));

// Nav background once the page scrolls
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Reveal sections on scroll
const observer = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("visible"), observer.unobserve(e.target))),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Experience filter by organization type
const filterButtons = document.querySelectorAll(".filters button");
filterButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.toggle("active", b === btn));
    const f = btn.dataset.filter;
    document.querySelectorAll(".timeline > li").forEach((li) => (li.hidden = f !== "all" && li.dataset.type !== f));
  })
);

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
document.querySelectorAll(".gallery figure").forEach((fig) =>
  fig.addEventListener("click", () => {
    const img = fig.querySelector("img");
    lightbox.querySelector("img").src = img.src;
    lightbox.querySelector("img").alt = img.alt;
    lightbox.querySelector("p").textContent = fig.querySelector("figcaption").textContent;
    lightbox.showModal();
  })
);
lightbox.addEventListener("click", () => lightbox.close());

// Dark mode toggle
const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
} catch {}
document.getElementById("themeToggle").addEventListener("click", () => {
  const isDark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = isDark ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch {}
});
