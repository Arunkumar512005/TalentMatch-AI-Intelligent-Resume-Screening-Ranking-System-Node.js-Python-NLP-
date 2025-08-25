const { extractText } = require("../services/fileservice");
const { nlpMatchSingle } = require("../services/nlpservice");

exports.handleStudentMatch = async (req, res) => {
  try {
    const jdText = req.body.jd?.trim() || "";
    if (!req.file || !jdText) {
      return res.status(400).render("student_dashboard", {
        result: { error: "Please upload a resume and paste the job description." },
      });
    }

    const resumeText = await extractText(req.file);
    const result = await nlpMatchSingle(resumeText, jdText);

    // result now has: score, missing_keywords, covered_keywords, suggestions, skill_coverage
    return res.render("student_dashboard", { result });
  } catch (err) {
    console.error(err);
    return res.status(500).render("student_dashboard", {
      result: { error: "Server error. Try again." },
    });
  }
};
