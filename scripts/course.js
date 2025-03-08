document.addEventListener("DOMContentLoaded", function () {
    const courses = [
        { name: "CSE 110", category: "CSE", completed: true, credits: 3 },
        { name: "WDD 130", category: "WDD", completed: true, credits: 3 },
        { name: "CSE 111", category: "CSE", completed: false, credits: 3 },
        { name: "CSE 210", category: "CSE", completed: true, credits: 4 },
        { name: "WDD 131", category: "WDD", completed: true, credits: 3 },
        { name: "WDD 231", category: "WDD", completed: true, credits: 3 },
        { name: "CSE 120", category: "CSE", completed: true, credits: 3 },
        { name: "WDD 150", category: "WDD", completed: false, credits: 3 },
        { name: "CSE 200", category: "CSE", completed: false, credits: 3 },
        { name: "WDD 200", category: "WDD", completed: false, credits: 3 },
        { name: "CSE 250", category: "CSE", completed: false, credits: 4 },
        { name: "WDD 270", category: "WDD", completed: false, credits: 3 }
    ];

    const courseList = document.getElementById("course-list");
    const totalCourses = document.createElement("p");
    totalCourses.id = "total-courses";
    courseList.before(totalCourses);

    const totalCredits = document.createElement("p");
    totalCredits.id = "total-credits";
    courseList.before(totalCredits);

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
            courseDiv.textContent = course.name;

            if (course.completed) {
                courseDiv.style.backgroundColor = "#EE9EDA"; 
                courseDiv.innerHTML = `✓ ${course.name}`; 
            } else {
                courseDiv.style.backgroundColor = "#EDEBD7"; 
            }

            courseList.appendChild(courseDiv);
        });
    }

    displayCourses();

    document.getElementById("all").addEventListener("click", () => displayCourses("All"));
    document.getElementById("cse").addEventListener("click", () => displayCourses("CSE"));
    document.getElementById("wdd").addEventListener("click", () => displayCourses("WDD"));
});
