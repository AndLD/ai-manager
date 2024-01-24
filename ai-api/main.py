import nest_asyncio
nest_asyncio.apply()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from uvicorn import run
from pydantic import BaseModel
from db import init, db
from ai import query, docs_to_indexes

init()

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # allow all headers
)

class PostMessage(BaseModel):
    text: str
    userId: str

class PostRebuildDocs(BaseModel):
    userId: str


@app.post("/api/message")
async def create_message(msg: PostMessage):
    cursor = db.docs.find({"userId": msg.userId})
    docs = list(cursor)

    answer = query(msg.text, msg.userId, docs)

    return {"result": answer}

@app.post("/api/docs/rebuild")
async def rebuild_docs(body: PostRebuildDocs):
    cursor = db.docs.find({"userId": body.userId})
    docs = list(cursor)

    docs_to_indexes(body.userId, docs, True)

    return {"result": True}

if __name__ == "__main__":
    run('main:app', host="127.0.0.1", port=8081, reload=False)