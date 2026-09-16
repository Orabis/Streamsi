import './style.css'
import { socket, login } from './services.ts'

const formTest = document.getElementById("form") as HTMLFormElement;
const AuthToken  = prompt('Enter Auth Token');

if (AuthToken !== null && AuthToken.trim() !== '') {
    sessionStorage.setItem("AuthToken", AuthToken);
}

async function postData(formData: FormData) {
    const url = "http://localhost:3000/videos-upload"
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Authorization': sessionStorage.getItem("AuthToken") ?? ""
            },
            body: formData,
        })
        if (!response.ok) {
            return response
        }
        const result = await response.json()
        login(sessionStorage.getItem("AuthToken") ?? "")
        console.log(sessionStorage.getItem("AuthToken") ?? "")
        socket.emit("newChat", {"text": formData.get("name"), "videoName": result.videoName})
        console.log(result)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Erreur lors de la lecture :", error.message);
        }
    }
}

formTest.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(formTest)
    await postData(formData)
})
