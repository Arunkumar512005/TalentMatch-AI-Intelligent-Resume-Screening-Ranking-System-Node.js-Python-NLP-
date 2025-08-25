const { extractText } = require("../services/fileservice");
const { nlpMatchBatch } = require("../services/nlpservice");

exports.handleHrMatch = async (req, res) => {
  try {
    const jdText = req.body.jd?.trim() || "";
    const files = req.files || [];
    if (!files.length || !jdText) {
      return res.status(400).render("hr_dashboard", {
        results: { error: "Upload at least one resume and paste the job description." },
      });
    }

    // extract text from resumes
    const resumes = [];
    for (const f of files) {
      const text = await extractText(f);
      resumes.push({ name: f.originalname, text });
    }

    // call Python batch endpoint
    const results = await nlpMatchBatch(resumes, jdText);

    // results now has: candidates[], top_recommendation, score_distribution[]
    results.candidates.sort((a, b) => b.score - a.score);

    return res.render("hr_dashboard", { results });
  } catch (err) {
    console.error(err);
    return res.status(500).render("hr_dashboard", {
      results: { error: "Server error. Try again." },
    });
  }
};
