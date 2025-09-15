# Development Workflow

This article explains the daily development workflow for component developers: from forking to merging changes.

## Quick Start: Contributing from Another GitHub Account

If you want to contribute to UI5 Web Components using a different GitHub account than the main repository owner, follow this streamlined process:

1. **Fork** the repository to your GitHub account
2. **Clone** your fork to your local machine
3. **Create a branch** for your changes
4. **Make your changes** and commit them
5. **Push** your branch to your fork
6. **Create a Pull Request** from your fork to the original repository

The sections below provide detailed instructions for each step.


## 1. Fork the UI5 Web Components repository

**If you want to contribute from another GitHub account:**

1. Sign in to your GitHub account (the one you want to use for contributions)
2. Navigate to the [UI5 Web Components repository](https://github.com/UI5/webcomponents)
3. Click the **"Fork"** button in the top-right corner of the repository page
4. Select your GitHub account/organization as the destination for the fork
5. Wait for GitHub to create your personal fork of the repository

For detailed instructions, see [GitHub's guide on forking a repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo).

## 2. Clone your forked repository

**Important:** Clone your personal fork, not the original UI5 repository.

### Option A: Clone using HTTPS (recommended for most users)
```sh
git clone https://github.com/YOUR_USERNAME/webcomponents.git
cd webcomponents
```

### Option B: Clone using SSH (if you have SSH keys set up)
```sh
git clone git@github.com:YOUR_USERNAME/webcomponents.git
cd webcomponents
```

**Replace `YOUR_USERNAME` with your actual GitHub username.**

For detailed instructions on cloning, see [GitHub's guide on cloning a repository](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository).


## 3. Run the project

**3.0.** Make sure you have the following prerequisites installed:
- [Yarn](https://yarnpkg.com/en);
- [Node.js](https://nodejs.org/) (**version 21 or higher**).

**Note:** These requirements are also documented in the main [README.md](../../README.md#requirements) file.


**3.1.** Install all dependencies.
```sh
yarn
```

**3.2.** Build and serve the project.
```sh
yarn start
```
Once the project is served, you can explore the components in the browser that will automaticall open the dev server URL, usually:
 - http://localhost:8080/

The server will reload the pages whenever you make changes in the code.

## 4. Develop

**4.1.** Read the dedicated tutorials for component developers:

- [Development Conventions and Guidelines](02-conventions-and-guidelines.md);
- [Developing Custom UI5 Web Components](../4-development/01-package.md);

**4.2.** Create a local branch within your fork and work with it as usual.

**Creating a new branch for your contribution:**
```sh
# Make sure you're on the main branch and it's up to date
git checkout main
git pull origin main

# Create and switch to a new branch for your feature/fix
git checkout -b your-feature-branch-name

# Example branch names:
# git checkout -b fix/button-focus-issue
# git checkout -b feat/new-component-dialog
# git checkout -b docs/improve-getting-started
```

**Branch naming conventions:**
- Use descriptive names that indicate the purpose of your changes
- Prefix with the type of change: `fix/`, `feat/`, `docs/`, `refactor/`, etc.
- Use kebab-case (lowercase with hyphens)

**4.3.** Before committing, run the linter to check if your code is written according to the project eslint configuration.

```sh
$ yarn lint
```

**4.4.** Before committing, run the test of the component you are working on (see the article for testing above) to catch issues as soon as possible.

```sh
$ cd packages/main
$ yarn test test/specs/Button.spec.js
```

## 5. Open pull request (PR) from fork

You can open a pull request to the upstream repository from any branch or commit in your fork.
We recommend that you make changes in a topic branch (not in your local main branch), so that you can push followup commits if you receive feedback on your pull request. 

You can open a pull request from the Github UI. 

**5.1.** Find the "Pull requests" tab and then press the "New pull request" button.

**5.2.** Compare the main branch of the upstream with a branch from your fork.

**Note:** The full guide on how to open PR from fork can be found [here](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork).

**5.3.** Once the PR is created you would have to accept a Developer Certificate of Origin (DCO).
Just follow the link posted in the PR by the CLA assistant.

**Note:** This is required only for your first PR.

**5.4.** Immediately after the PR is created, a central build process starts to verify the change,
building the project and running all tests.
In case you are interested in the build output, you can follow the link at the bottom of the PR page.

**5.5.** Wait for our code review and approval. 
After the PR is approved, the UI5 Web Components team will merge the change into the main branch.


## 6. Update pull request, created from a fork

You often would need to update your pull request, especially when you need to address review comments.
To update your pull request, you have to push commits to the branch, that the pull request is based on
and the changes will be reflected in the pull request.

**Note:** We recommend syncing your fork before pushing commits to resolve merge conflicts beforehand.

**Note:** The full guide on how to update PR can be found [here](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/committing-changes-to-a-pull-request-branch-created-from-a-fork).

## 7. Sync your fork with the upstream repository

Over time, your fork will become out of sync with the original repository and you'll need to update it. This is especially important before starting new work.

**7.1.** Configure the upstream remote (do this once after cloning):

```sh
# Add the original UI5 Web Components repository as upstream
git remote add upstream https://github.com/UI5/webcomponents.git

# Verify your remotes are set up correctly
git remote -v
# Should show:
# origin    https://github.com/YOUR_USERNAME/webcomponents.git (fetch)
# origin    https://github.com/YOUR_USERNAME/webcomponents.git (push)
# upstream  https://github.com/UI5/webcomponents.git (fetch)
# upstream  https://github.com/UI5/webcomponents.git (push)
```

**7.2.** Fetch the latest changes from the upstream repository:

```sh
# Fetch all branches and commits from upstream
git fetch upstream
```

**7.3.** Sync your local main branch:

```sh
# Switch to your local main branch
git checkout main

# Merge the upstream changes into your local main branch
git merge upstream/main
```

**7.4.** Update your fork on GitHub:

```sh
# Push the updated main branch to your fork
git push origin main
```

**7.5.** Update your feature branch (if you have one):

```sh
# Switch to your feature branch
git checkout your-feature-branch-name

# Merge or rebase the latest main branch into your feature branch
git merge main
# OR
git rebase main

# Push the updated feature branch to your fork
git push origin your-feature-branch-name
```

**Note:** For detailed instructions, see [GitHub's guide on syncing a fork](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork).

## 8. Authentication and Troubleshooting

### GitHub Authentication

**Using HTTPS (Username/Password or Personal Access Token):**
- For HTTPS cloning, you may need to provide your GitHub username and password (or personal access token)
- If you have 2FA enabled, you'll need to use a personal access token instead of your password
- See [GitHub's guide on creating personal access tokens](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)

**Using SSH (Recommended for frequent contributors):**
- Set up SSH keys for easier authentication without entering credentials
- See [GitHub's guide on SSH keys](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh)

### Common Issues and Solutions

**Issue: "Permission denied" when pushing**
- Make sure you're pushing to your fork (`origin`), not the upstream repository
- Verify your authentication credentials are correct
- For SSH: `ssh -T git@github.com` to test your connection

**Issue: "Your branch is behind" after syncing**
- This is normal - just run `git push origin main` to update your fork

**Issue: Merge conflicts when syncing**
- If you have local changes on main branch (not recommended), you may need to resolve conflicts
- Best practice: keep your main branch clean and always work on feature branches

**Issue: Fork is very behind the upstream**
- Consider deleting your fork and creating a fresh one if it's significantly behind
- Or follow the detailed sync process above
