function formatResponse(data) {
  let htmlString = "";
  const { jira, github } = data;

  //JIRA
  htmlString += '<div class="result">';
  htmlString += "<h3>JIRA Issues:</h3>";
  if (jira.length === 0) {
    htmlString += "<p>No recent activity found.</p>";
  } else {
    htmlString += "<ul>";
    jira.forEach((issue) => {
      htmlString += `<li>${issue.fields.status.name}- ${issue.fields.summary}</li>`;
    });
    htmlString += "</ul>";
  }
  htmlString += "</div>";

  //PR
  htmlString += '<div class="result">';
  htmlString += "<h3>GitHub Pull Requests:</h3>";
  if (github.pullRequests.length === 0) {
    htmlString += "<p>No recent activity found.</p>";
  } else {
    htmlString += "<ul>";
    github.pullRequests.forEach((pr) => {
      let repoName = "";
      if (pr.repository_url) {
        const parts = pr.repository_url.split("/");
        const name = parts.pop();
        const owner = parts.pop();
        repoName = ` (in ${owner}/${name})`;
      }
      htmlString += `<li>${pr.title} ${repoName}</li>`;
    });
    htmlString += "</ul>";
  }
  htmlString += "</div>";

  //Commits
  htmlString += '<div class="result">';
  htmlString += "<h3>Recent Commits:</h3>";
  if (github.commits.length === 0) {
    htmlString += "<p>No recent activity found.</p>";
  } else {
    htmlString += "<ul>";
    github.commits.forEach((commit) => {
      htmlString += `<li>${commit.message} (in ${commit.repo})</li>`;
    });
    htmlString += "</ul>";
  }
  htmlString += "</div>";

  return htmlString;
}

module.exports = {
  formatResponse,
};
