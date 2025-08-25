from fastapi import FastAPI
from pydantic import BaseModel
from .nlp_utils import clean_text, similarity, missing_keywords   # your utils

app = FastAPI(title="NLP Service", version="1.1.0")

class MatchRequest(BaseModel):
    resume_text: str
    jd_text: str

class BatchResume(BaseModel):
    name: str
    text: str

class BatchRequest(BaseModel):
    jd_text: str
    resumes: list[BatchResume]

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/match")
def match(req: MatchRequest):
    clean_r = clean_text(req.resume_text)
    clean_j = clean_text(req.jd_text)

    score = similarity(clean_r, clean_j)
    missing = missing_keywords(clean_r, clean_j, limit=10)

    # Covered keywords = JD keywords present in resume
    jd_words = set(clean_j.split())
    resume_words = set(clean_r.split())
    covered = list(jd_words & resume_words)

    # Simple suggestion generator
    suggestions = [f"Add more details about {kw}." for kw in missing[:5]]

    coverage_percent = round(len(covered) / len(jd_words) * 100, 2) if jd_words else 0

    return {
        "score": round(score, 2),
        "missing_keywords": missing,
        "covered_keywords": covered,
        "suggestions": suggestions,
        "skill_coverage": {
            "covered_count": len(covered),
            "missing_count": len(missing),
            "coverage_percent": coverage_percent
        }
    }

@app.post("/batch_match")
def batch_match(req: BatchRequest):
    clean_j = clean_text(req.jd_text)
    jd_words = set(clean_j.split())

    results = []
    scores = []

    for r in req.resumes:
        clean_r = clean_text(r.text)
        score = similarity(clean_r, clean_j)
        miss = missing_keywords(clean_r, clean_j, limit=10)
        covered = list(jd_words & set(clean_r.split()))

        results.append({
            "name": r.name,
            "score": round(score, 2),
            "missing_keywords": miss,
            "covered_keywords": covered,
            "strengths": covered[:5]  # top covered keywords
        })
        scores.append(round(score, 2))

    # Sort by score descending
    results = sorted(results, key=lambda x: x["score"], reverse=True)
    top_rec = results[0]["name"] if results else None

    return {
        "candidates": results,
        "top_recommendation": top_rec,
        "score_distribution": scores
    }
