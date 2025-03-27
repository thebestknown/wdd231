document.addEventListener("DOMContentLoaded", function () {
    const courses = [
        { name: "CSE 110", category: "CSE", completed: true, credits: 3, title: "Programming Principles", certificate: "Web and Computer Programming", description: "Intro to computer science and programming.", technology: ["Python"] },
        { name: "WDD 130", category: "WDD", completed: true, credits: 2, title: "Web Fundamentals", certificate: "Web and Computer Programming", description: "Intro to the World Wide Web and basic web development.", technology: ["HTML", "CSS"] },
        { name: "CSE 111", category: "CSE", completed: false, credits: 3, title: "Programming with Functions", certificate: "Web and Computer Programming", description: "Functions and data processing.", technology: ["Python"] },
        { name: "CSE 210", category: "CSE", completed: true, credits: 4, title: "OOP", certificate: "Web and Computer Programming", description: "Object-Oriented Programming.", technology: ["Python"] },
        { name: "WDD 131", category: "WDD", completed: true, credits: 3, title: "Dynamic Web", certificate: "Web and Computer Programming", description: "JavaScript programming basics.", technology: ["JavaScript"] },
        { name: "WDD 231", category: "WDD", completed: true, credits: 3, title: "Front-End Frameworks", certificate: "Web and Computer Programming", description: "Intermediate front-end skills.", technology: ["HTML", "CSS", "JavaScript"] },
        { name: "WDD 150", category: "WDD", completed: false, credits: 3, title: "User Experience Design", certificate: "Web and Computer Programming", description: "Introduction to UX.", technology: ["UX Tools"] }
    ];

    const courseList = document.getElementById("course-list");
    const totalCourses = document.createElement("p");
    totalCourses.id = "total-courses";
    courseList.before(totalCourses);

    const totalCredits = document.createElement("p");
    totalCredits.id = "total-credits";
    courseList.before(totalCredits);

    const courseDetails = document.getElementById("course-details");

    function calculateTotalCredits(filteredCourses) {
        return filteredCourses.reduce((total, course) => total + course.credits, 0);
    }

    function displayCourses(filter = "All") {
        courseList.innerHTML = "";

        const filteredCourses = courses.filter(course => filter === "All" || course.category === filter);

        totalCourses.innerHTML = `The total number of courses listed below is <strong>${filteredCourses.length}</strong>`;

        const totalCreditsValue = calculateTotalCredits(filteredCourses);
        totalCredits.innerHTML = `Total Credits: <strong>${totalCreditsValue}</strong>`;

        filteredCourses.forEach(course => {
            const courseDiv = document.createElement("div");
            courseDiv.classList.add("course-card");
            courseDiv.textContent = course.completed ? `✓ ${course.name}` : course.name;
            courseDiv.style.backgroundColor = course.completed ? "#EE9EDA" : "#EDEBD7";

            courseDiv.addEventListener("click", () => displayCourseDetails(course));

            courseList.appendChild(courseDiv);
        });
    }

    function displayCourseDetails(course) {
        courseDetails.innerHTML = `
            <button id="closeModal">❌</button>
            <h2>${course.name}</h2>
            <h3>${course.title}</h3>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p><strong>Certificate:</strong> ${course.certificate}</p>
            <p>${course.description}</p>
            <p><strong>Technologies:</strong> ${course.technology.join(", ")}</p>
        `;
        courseDetails.showModal();

        document.getElementById("closeModal").addEventListener("click", () => {
            courseDetails.close();
        });
    }

    document.getElementById("all").addEventListener("click", () => displayCourses("All"));
    document.getElementById("cse").addEventListener("click", () => displayCourses("CSE"));
    document.getElementById("wdd").addEventListener("click", () => displayCourses("WDD"));

    displayCourses();
});