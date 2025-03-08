document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("currentyear").textContent = new Date().getFullYear();
});

document.getElementById("lastModified").textContent = "Last Update: " + document.lastModified;
