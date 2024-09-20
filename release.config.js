module.exports = {
    branches: [
        {
            name: "master",
            level: "none",
            prerelease: true,
            channel: "next",
            devDependencies: ["@zowe/cli", "@zowe/imperative", "@zowe/cli-test-utils"]
        },
        {
            name: "zowe-v?-lts",
            level: "patch",
            devDependencies: ["@zowe/cli", "@zowe/imperative"]
        }
    ],
    plugins: [
        "@octorelease/changelog",
        ["@octorelease/npm", {
            aliasTags: {
                latest: ["zowe-v2-lts"],
                next: ["zowe-v3-lts"]
            },
            pruneShrinkwrap: true
        }],
        ["@octorelease/github", {
            checkPrLabels: true
        }],
        "@octorelease/git"
    ]
};
