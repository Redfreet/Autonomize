const express = require("express");
const path = require("path");

const github = require("./github-client.js");
const jira = require("./jira-client.js");
const parser = require("./query-parser.js");
const generator = require("./response-generator.js");

const app = express();
const PORT = 3000;

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

app.get("/api/activity", async (req, res) => {
  const query = req.query.q;
  console.log(`query: ${query}`);
  const user = parser.extractMemberName(query);

  if (!user) {
    console.log("Error: User not found.");
    return res.status(404).json({ error: "User not found." });
  }

  console.log(`Fetching data for: JIRA(${user.jira}), GitHub(${user.github})`);

  try {
    //fetching at the same time
    const [jiraIssues, githubPRs, githubCommits] = await Promise.all([
      jira.getAssignedIssues(user.jira),
      github.getActivePullRequests(user.github),
      github.getRecentCommits(user.github),
    ]);

    const combinedData = {
      jira: jiraIssues,
      github: {
        pullRequests: githubPRs,
        commits: githubCommits,
      },
    };

    const finalResponse = generator.formatResponse(combinedData);

    res.json({ response: finalResponse });
  } catch (error) {
    console.error("Error in endpoint:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
