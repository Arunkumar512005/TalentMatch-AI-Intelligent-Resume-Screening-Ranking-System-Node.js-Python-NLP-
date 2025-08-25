const axios = require("axios");
const PY_NLP_URL = process.env.PY_NLP_URL || "http://127.0.0.1:5000";

exports.nlpMatchSingle = async (resumeText, jdText) => {
  const { data } = await axios.post(`${PY_NLP_URL}/match`, {
    resume_text: resumeText,
    jd_text: jdText
  });
  return data; // { score, missing_keywords }
};

exports.nlpMatchBatch = async (resumes, jdText) => {
  // resumes: [{ name, text }]
  const { data } = await axios.post(`${PY_NLP_URL}/batch_match`, {
    jd_text: jdText,
    resumes: resumes.map(r => ({ name: r.name, text: r.text }))
  });
  return data; // { candidates: [{name, score, missing_keywords}] }
};
