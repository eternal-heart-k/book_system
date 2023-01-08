from fastapi import FastAPI
import uvicorn
from settings import HOST, PORT
from view import book, user
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://127.0.0.1:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == '__main__':
    app.include_router(book.router)
    app.include_router(user.router)
    uvicorn.run(app, host=HOST, port=PORT)