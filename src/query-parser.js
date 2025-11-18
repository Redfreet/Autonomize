const userMap = {
  ravi: {
    jira: "ravigood7@gmail.com",
    github: "Redfreet",
  },
  sarah: {
    jira: "Sarah Smith",
    github: "sarah-codes",
  },
  lisa: {
    jira: "Lisa Ray",
    github: "lisaray",
  },
};

function extractMemberName(query) {
  if (!query) return null;

  const queryLower = query.toLowerCase();
  //search in map
  for (const name in userMap) {
    if (queryLower.includes(name)) {
      return userMap[name]; //found
    }
  }

  return null;
}

module.exports = { extractMemberName };
