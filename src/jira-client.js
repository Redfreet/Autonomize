const axios = require("axios");
const { JIRA_URL, JIRA_API, JIRA_EMAIL } = require("../config/config.js");

const authHeader = `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API}`).toString(
  "base64"
)}`;

//for auth
const options = {
  headers: {
    Authorization: authHeader,
    Accept: "application/json",
  },
};

//get open issues for a user
async function getAssignedIssues(username) {
  const jql = `assignee = "${username}" AND status != Done ORDER BY updated DESC`;

  try {
    const response = await axios.post(
      `${JIRA_URL}/rest/api/3/search/jql`,
      {
        jql: jql,
        fields: ["summary", "status", "updated"],
        maxResults: 5,
      },
      options
    );

    return response.data.issues;
  } catch (error) {
    console.error(`Error fetching JIRA issues for ${username}:`, error.message);
    if (error.response) {
      console.error("JIRA Error Data:", error.response.data);
    }
    throw new Error("Failed to fetch JIRA issues");
  }
}

module.exports = {
  getAssignedIssues,
};
