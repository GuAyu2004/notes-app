const API_URL = "http://localhost:3000";

async function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
}

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    
    if (res.status !== 201) {
        // Display an error if login fails
        const data = await res.json();
        alert(`Login failed: ${data.message}`);
        return;
    }

    const data = await res.json();
    localStorage.setItem("token", data.access_token); // Store JWT
    localStorage.setItem("email", data.email); // Store email in localStorage
    
    alert(data.message); // Show login success message
    window.location.href = "dashboard.html"; // Redirect to dashboard
}

async function createNote() {
    console.log('getting')

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const token = localStorage.getItem("token");
 console.log('getting')
    if (!token) {
        alert("❌ No token found. Please log in again.");
        return;
    }

    const res = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
    });
    fetchNotes();

    const data = await res.json();
    if (!res.ok) {
        console.error("❌ Error:", data);
        alert(`❌ Error: ${data.message || "Something went wrong"}`);
    } else {
        alert("✅ Note added successfully!");
    }
}


async function fetchNotes() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("You must be logged in to view notes.");
        return;
    }
console.log("jjj")
    const res = await fetch(`${API_URL}/notes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Ensure token is passed here too
        }
    });

    if (res.status === 403) {
        alert("Forbidden: Access Denied");
        return;
    }

    const notes = await res.json();
    if (!Array.isArray(notes)) {
        alert("Failed to fetch notes. Invalid response format.");
        return;
    }

    const notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = ''; // Clear previous notes
    notes.forEach(note => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p><button onclick="deleteNote(${note.id})">Delete</button>`;
        notesContainer.appendChild(noteElement);
    });
}




async function deleteNote(noteId) {
    await fetch(`${API_URL}/notes/${noteId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
    fetchNotes(); // Refresh the notes list after deleting
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "index.html"; // Redirect to login page
}
