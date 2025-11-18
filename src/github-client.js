const axios = require("axios");
const { GITHUB_API } = require("../config/config.js");

const GITHUB_URL = "https://api.github.com";

//For auth
const options = {
  headers: {
    Authorization: `token ${GITHUB_API}`,
    Accept: "application/vnd.github.v3+json",
  },
};

//Active PR
async function getActivePullRequests(username) {
  const query = `is:pr author:${username} is:open`;
  try {
    const response = await axios.get(`${GITHUB_URL}/search/issues`, {
      ...options, //auth
      params: { q: query }, //send to URL
    });

    return response.data.items;
  } catch (error) {
    console.error(`Error fetching PRs for ${username}:`, error.message);
    throw new Error("Failed to fetch GitHub PRs");
  }
}

//Recent commits
async function getRecentCommits(username) {
  try {
    console.log(`Searching commits for: ${username}`);

    const response = await axios.get(`${GITHUB_URL}/search/commits`, {
      ...options,
      params: {
        q: `author:${username}`,
        sort: "committer-date",
        order: "desc",
        per_page: 5,
      },
    });

    if (!response.data.items) {
      console.log("No commit found.");
      return [];
    }

    return response.data.items.map((item) => ({
      message: item.commit.message.split("\n")[0],
      repo: item.repository.full_name,
    }));
  } catch (error) {
    console.error(`Error fetching commits for ${username}:`, error.message);
    throw new Error("Failed to fetch commits");
  }
}

module.exports = {
  getActivePullRequests,
  getRecentCommits,
};
