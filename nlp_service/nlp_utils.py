import re
import nltk
from nltk.corpus import stopwords
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# ensure stopwords
nltk.download("stopwords", quiet=True)
STOP = set(stopwords.words("english"))

# load a lightweight sentence-BERT
MODEL = SentenceTransformer("all-MiniLM-L6-v2")

def clean_text(txt: str) -> str:
    txt = re.sub(r"[^A-Za-z0-9\s]", " ", (txt or "").lower())
    tokens = [w for w in txt.split() if w not in STOP]
    return " ".join(tokens)

def embed(text: str):
    return MODEL.encode([text])

def similarity(a: str, b: str) -> float:
    ea = embed(a)
    eb = embed(b)
    return float(cosine_similarity(ea, eb)[0][0]) * 100.0

def missing_keywords(resume_text: str, jd_text: str, limit=20):
    rs = set(resume_text.split())
    js = set(jd_text.split())
    miss = [w for w in js - rs if len(w) > 2]
    return miss[:limit]
