// ===========================
// Variables globales
// ===========================
let challengesData = [];
let currentChallenge = null;
const STORAGE_KEY = "completedChallenges";

// ===========================
// Funciones para LocalStorage
// ===========================
function guardarProgreso(idsCompletados) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(idsCompletados));
}

function obtenerProgresoGuardado() {
  const guardado = localStorage.getItem(STORAGE_KEY);
  return guardado ? JSON.parse(guardado) : [];
}

// ===========================
// Inicialización al cargar DOM
// ===========================
document.addEventListener("DOMContentLoaded", async function () {
  // ===========================
  // Gestión de temas (claro/oscuro/sistema)
  // ===========================
  const themeBtns = document.querySelectorAll(".theme-btn");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  const currentTheme =
    localStorage.getItem("theme") ||
    (prefersDarkScheme.matches ? "dark" : "light");

  aplicarTema(currentTheme);

  themeBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const theme = this.classList.contains("light")
        ? "light"
        : this.classList.contains("dark")
        ? "dark"
        : "system";
      aplicarTema(theme);
    });
  });

  prefersDarkScheme.addEventListener("change", (e) => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "system" || !savedTheme) {
      aplicarTema(e.matches ? "dark" : "light");
    }
  });

  function aplicarTema(theme) {
    if (theme === "system") {
      localStorage.setItem("theme", "system");
      document.documentElement.setAttribute(
        "data-theme",
        prefersDarkScheme.matches ? "dark" : "light"
      );
    } else {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }

    themeBtns.forEach((btn) => {
      btn.classList.remove("active");
      if (
        (theme === "system" && btn.classList.contains("system")) ||
        (theme === "light" && btn.classList.contains("light")) ||
        (theme === "dark" && btn.classList.contains("dark"))
      ) {
        btn.classList.add("active");
      }
    });
  }

  // ===========================
  // Sección: Progreso de desafíos
  // ===========================
  const progressCount = document.getElementById("progress-count");
  const progressFill = document.querySelector(".progress-fill");
  const totalChallenges = 10;

  function actualizarProgreso(completados) {
    progressCount.textContent = `${completados}/${totalChallenges}`;
    progressFill.style.width = `${(completados / totalChallenges) * 100}%`;
  }

  // ===========================
  // Sección: Tarjetas de desafíos
  // ===========================
  const challengeCards = document.querySelectorAll(".challenge-card");
  const progresoGuardado = obtenerProgresoGuardado();

  challengeCards.forEach((card) => {
    const challengeId = card.getAttribute("data-challenge-id");
    const statusIcon = card.querySelector(".status-icons span");

    // Marcar como completados desde el localStorage
    if (progresoGuardado.includes(challengeId)) {
      card.classList.add("completed");
      statusIcon.classList.remove("incomplete-icon");
      statusIcon.classList.add("completed-icon");
      statusIcon.textContent = "✓";
      statusIcon.setAttribute("title", "Completado");
    }

    // Toggle de estado al hacer clic
    card.addEventListener("click", function (e) {
      if (
        e.target.tagName === "BUTTON" ||
        e.target.classList.contains("icon")
      ) {
        return;
      }

      const isCompleted = card.classList.contains("completed");

      if (isCompleted) {
        card.classList.remove("completed");
        statusIcon.classList.remove("completed-icon");
        statusIcon.classList.add("incomplete-icon");
        statusIcon.textContent = "○";
        statusIcon.setAttribute("title", "No iniciado");
      } else {
        card.classList.add("completed");
        statusIcon.classList.remove("incomplete-icon");
        statusIcon.classList.add("completed-icon");
        statusIcon.textContent = "✓";
        statusIcon.setAttribute("title", "Completado");
      }

      // Actualizar progreso y guardar en localStorage
      const nuevasCompletadas = Array.from(
        document.querySelectorAll(".challenge-card.completed")
      ).map((card) => card.getAttribute("data-challenge-id"));

      guardarProgreso(nuevasCompletadas);
      actualizarProgreso(nuevasCompletadas.length);
    });
  });

  // Mostrar progreso al cargar
  actualizarProgreso(progresoGuardado.length);
});

// ===========================
// Cargar datos de desafíos desde JSON
// ===========================
async function loadChallengesData() {
  try {
    const response = await fetch("challenges.json");
    if (!response.ok) throw new Error("Fallo en la red");

    const data = await response.json();
    challengesData = data.challenges;
    console.log("Datos de desafíos cargados:", challengesData);
  } catch (error) {
    console.error("Error al cargar el JSON:", error);

    challengesData = [
      {
        id: "default",
        title: "Desafío por defecto",
        requirements: [
          "HTML semántico: Usa etiquetas adecuadas.",
          "CSS: Aplica estilos básicos.",
        ],
        demoUrl: "#",
        githubUrl: "#",
      },
    ];
  }
}

// ===========================
// Abrir modal con información del desafío
// ===========================
function openModal(challengeId) {
  currentChallenge = challengesData.find(
    (challenge) => challenge.id === challengeId
  );

  if (!currentChallenge) {
    console.error("Desafío no encontrado:", challengeId);
    return;
  }

  document.getElementById("modal-title").textContent = currentChallenge.title;

  const requirementsList = document.getElementById("requirements-list");
  requirementsList.innerHTML = "";

  currentChallenge.requirements.forEach((req) => {
    const [title, description] = req.split(": ");
    const li = document.createElement("li");
    li.innerHTML = `<strong>${title}:</strong> ${description}`;
    requirementsList.appendChild(li);
  });

  document.getElementById("demo-btn").onclick = () => {
    window.open(currentChallenge.demoUrl, "_blank");
  };
  document.getElementById("github-btn").onclick = () => {
    window.open(currentChallenge.githubUrl, "_blank");
  };

  document.getElementById("modal-overlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

// ===========================
// Cierre del modal
// ===========================
function closeModal() {
  document.getElementById("modal-overlay").classList.remove("active");
  document.body.style.overflow = "";
}

// ===========================
// Inicialización de botones del modal
// ===========================
document.addEventListener("DOMContentLoaded", async () => {
  await loadChallengesData();

  document.querySelectorAll(".statement-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const challengeCard = this.closest(".challenge-card");
      const challengeId = challengeCard.getAttribute("data-challenge-id");
      openModal(challengeId);
    });
  });

  document.querySelector(".modal-close").addEventListener("click", closeModal);
  document
    .getElementById("modal-overlay")
    .addEventListener("click", function (e) {
      if (e.target === this) closeModal();
    });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
});
