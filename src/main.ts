import './style.css'
import { socket } from './services.ts'

const formTest = document.getElementById("form") as HTMLFormElement;

async function postData(formData: FormData) {
    const url = "http://localhost:3000/videos-upload"
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        })
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const result = await response.json()
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
