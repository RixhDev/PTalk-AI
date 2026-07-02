from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests, json, os

app = FastAPI()
# Habilitar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # puedes restringir a ["http://127.0.0.1:5501"] si quieres
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
LOG_DIR = "logs"
os.makedirs(LOG_DIR, exist_ok=True)

# Modelo de entrada para /chat
class ChatRequest(BaseModel):
    message: str
    model: str

# Modelo de entrada para /save
class SaveRequest(BaseModel):
    model: str
    user: str
    bot: str

def get_profiles():
    response = requests.get("http://localhost:11434/api/tags")
    data = response.json()
    # Normalizamos nombres (quitamos :latest)
    return [m.get("name").split(":")[0] for m in data.get("models", [])]

def get_log_file(model):
    return os.path.join(LOG_DIR, f"{model}.json")

def save_conversation(model, user, bot):
    entry = {"user": user, "bot": bot}
    log_file = get_log_file(model)
    with open(log_file, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")

def build_prompt(model, message, turns=10):
    log_file = get_log_file(model)
    history = []
    if os.path.exists(log_file):
        with open(log_file, "r", encoding="utf-8") as f:
            for line in f:
                entry = json.loads(line)
                history.append(f"User: {entry['user']}\nBot: {entry['bot']}")
    context = "\n".join(history[-turns:])
    return f"{context}\nUser: {message}\nBot:"

@app.get("/profiles")
def list_profiles():
    return {"profiles": get_profiles()}

@app.post("/chat")
async def chat(data: ChatRequest):
    profiles = get_profiles()
    model = data.model if data.model in profiles else profiles[0]

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": model, "prompt": build_prompt(model, data.message)},
        stream=True
    )

    full_response = ""
    for line in response.iter_lines():
        if line:
            obj = json.loads(line.decode("utf-8"))
            if "response" in obj:
                full_response += obj["response"]

    return {"response": full_response}

@app.post("/save")
async def save(data: SaveRequest):
    profiles = get_profiles()
    model = data.model if data.model in profiles else profiles[0]
    save_conversation(model, data.user, data.bot)
    return {"status": "saved", "model": model}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
