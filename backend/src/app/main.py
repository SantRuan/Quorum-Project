
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.legislator_router import router as legislator_router
from routes.bills_router import router as bills_router
from routes.votes_router import router as vote_router
from routes.vote_result_router import router as vote_result_router
import uvicorn


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(legislator_router)
app.include_router(bills_router)
app.include_router(vote_router)
app.include_router(vote_result_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
