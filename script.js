// ===============================
// BOTÓN COMENZAR
// ===============================

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {

    document.getElementById("cuba").scrollIntoView({

        behavior: "smooth"

    });

});

// ===============================
// TARJETAS DE HAITÍ
// ===============================

const haitiData = [

    {
        titulo: "📚 Acceso",
        descripcion: "Muchos niños tienen dificultades para acceder a la educación debido a la pobreza y a la falta de escuelas."
    },

    {
        titulo: "🏫 Escuelas",
        descripcion: "Gran parte de las instituciones educativas son privadas y presentan recursos limitados."
    },

    {
        titulo: "👩‍🏫 Docentes",
        descripcion: "Existe escasez de docentes capacitados y oportunidades de formación continua."
    },

    {
        titulo: "💻 Tecnología",
        descripcion: "El acceso a internet y equipos tecnológicos sigue siendo reducido en muchas regiones."
    },

    {
        titulo: "🌍 Apoyo Internacional",
        descripcion: "UNICEF, UNESCO y otras organizaciones colaboran para fortalecer el sistema educativo."
    },

    {
        titulo: "⚠ Desafíos",
        descripcion: "La inestabilidad política, los desastres naturales y la pobreza afectan la educación."
    }

];

const haitiContainer = document.getElementById("haitiCards");

haitiData.forEach(item => {

    const card = document.createElement("div");

    card.className = "flip-card";

    card.innerHTML = `

        <div class="flip-inner">

            <div class="front">

                ${item.titulo}

            </div>

            <div class="back">

                ${item.descripcion}

            </div>

        </div>

    `;

    haitiContainer.appendChild(card);

});

// ===============================
// TABLA COMPARATIVA
// ===============================

const comparisonData = [

    ["Acceso a la educación", "Gratuita y amplia cobertura", "Cobertura limitada"],

    ["Alfabetización", "Muy alta", "Más baja"],

    ["Infraestructura", "Aceptable", "Limitada"],

    ["Tecnología", "Moderada", "Escasa"],

    ["Formación docente", "Constante", "Limitada"],

    ["Retos principales", "Recursos económicos", "Pobreza e inestabilidad"]

];

const comparison = document.getElementById("comparisonTable");

let table = `

<table>

<thead>

<tr>

<th>Aspecto</th>

<th>🇨🇺 Cuba</th>

<th>🇭🇹 Haití</th>

</tr>

</thead>

<tbody>

`;

comparisonData.forEach(row => {

    table += `

    <tr>

        <td>${row[0]}</td>

        <td>${row[1]}</td>

        <td>${row[2]}</td>

    </tr>

    `;

});

table += `

</tbody>

</table>

`;

comparison.innerHTML = table;

// ===============================
// ANIMACIÓN AL HACER SCROLL
// ===============================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

}, {

    threshold: 0.2

});

sections.forEach(section => {

    section.style.opacity = "0";

    section.style.transform = "translateY(70px)";

    section.style.transition = "1s";

    observer.observe(section);

});

// ===============================
// EFECTO EN BOTONES
// ===============================

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "scale(1.08)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "scale(1)";

    });

});

// ===============================
// MENSAJE DE BIENVENIDA
// ===============================

window.addEventListener("load", () => {

    console.log("Proyecto Educación y Oportunidades cargado correctamente.");

});
