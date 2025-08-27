2025-08-27T17:56:50.9588459Z Current runner version: '2.328.0'
2025-08-27T17:56:50.9621711Z ##[group]Runner Image Provisioner
2025-08-27T17:56:50.9623021Z Hosted Compute Agent
2025-08-27T17:56:50.9624065Z Version: 20250818.377
2025-08-27T17:56:50.9625062Z Commit: 3c593e9f75fe0b87e893bca80d6e12ba089c61fc
2025-08-27T17:56:50.9626455Z Build Date: 2025-08-18T14:52:18Z
2025-08-27T17:56:50.9627620Z ##[endgroup]
2025-08-27T17:56:50.9628465Z ##[group]Operating System
2025-08-27T17:56:50.9629432Z Ubuntu
2025-08-27T17:56:50.9630371Z 24.04.2
2025-08-27T17:56:50.9631167Z LTS
2025-08-27T17:56:50.9632139Z ##[endgroup]
2025-08-27T17:56:50.9633032Z ##[group]Runner Image
2025-08-27T17:56:50.9633976Z Image: ubuntu-24.04
2025-08-27T17:56:50.9634768Z Version: 20250818.1.0
2025-08-27T17:56:50.9636855Z Included Software: https://github.com/actions/runner-images/blob/ubuntu24/20250818.1/images/ubuntu/Ubuntu2404-Readme.md
2025-08-27T17:56:50.9640032Z Image Release: https://github.com/actions/runner-images/releases/tag/ubuntu24%2F20250818.1
2025-08-27T17:56:50.9641907Z ##[endgroup]
2025-08-27T17:56:50.9644075Z ##[group]GITHUB_TOKEN Permissions
2025-08-27T17:56:50.9646879Z Contents: write
2025-08-27T17:56:50.9647710Z Issues: write
2025-08-27T17:56:50.9648664Z Metadata: read
2025-08-27T17:56:50.9649407Z PullRequests: write
2025-08-27T17:56:50.9650233Z ##[endgroup]
2025-08-27T17:56:50.9653451Z Secret source: Actions
2025-08-27T17:56:50.9655235Z Prepare workflow directory
2025-08-27T17:56:51.0124313Z Prepare all required actions
2025-08-27T17:56:51.0182293Z Getting action download info
2025-08-27T17:56:51.2743361Z Download action repository 'actions/checkout@v4' (SHA:08eba0b27e820071cde6df949e0beb9ba4906955)
2025-08-27T17:56:51.3415510Z Download action repository 'pnpm/action-setup@v2' (SHA:eae0cfeb286e66ffb5155f1a79b90583a127a68b)
2025-08-27T17:56:51.7721925Z Download action repository 'actions/setup-node@v4' (SHA:49933ea5288caeca8642d1e84afbd3f7d6820020)
2025-08-27T17:56:51.9097778Z Download action repository 'actions/setup-python@v5' (SHA:a26af69be951a213d495a4c3e4e4022e16d87065)
2025-08-27T17:56:52.0827830Z Complete job name: release
2025-08-27T17:56:52.1548031Z ##[group]Run actions/checkout@v4
2025-08-27T17:56:52.1548868Z with:
2025-08-27T17:56:52.1549243Z   fetch-depth: 0
2025-08-27T17:56:52.1549843Z   token: ***
2025-08-27T17:56:52.1550268Z   repository: TOR968/csstats-extension
2025-08-27T17:56:52.1550776Z   ssh-strict: true
2025-08-27T17:56:52.1551173Z   ssh-user: git
2025-08-27T17:56:52.1551565Z   persist-credentials: true
2025-08-27T17:56:52.1552014Z   clean: true
2025-08-27T17:56:52.1552407Z   sparse-checkout-cone-mode: true
2025-08-27T17:56:52.1552897Z   fetch-tags: false
2025-08-27T17:56:52.1553301Z   show-progress: true
2025-08-27T17:56:52.1553694Z   lfs: false
2025-08-27T17:56:52.1554056Z   submodules: false
2025-08-27T17:56:52.1554461Z   set-safe-directory: true
2025-08-27T17:56:52.1555084Z ##[endgroup]
2025-08-27T17:56:52.2624625Z Syncing repository: TOR968/csstats-extension
2025-08-27T17:56:52.2626504Z ##[group]Getting Git version info
2025-08-27T17:56:52.2627363Z Working directory is '/home/runner/work/csstats-extension/csstats-extension'
2025-08-27T17:56:52.2628374Z [command]/usr/bin/git version
2025-08-27T17:56:52.4349460Z git version 2.51.0
2025-08-27T17:56:52.4376463Z ##[endgroup]
2025-08-27T17:56:52.4398416Z Temporarily overriding HOME='/home/runner/work/_temp/37041b29-2811-46c0-b3db-d686553a268c' before making global git config changes
2025-08-27T17:56:52.4399942Z Adding repository directory to the temporary git global config as a safe directory
2025-08-27T17:56:52.4403697Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/csstats-extension/csstats-extension
2025-08-27T17:56:52.4436547Z Deleting the contents of '/home/runner/work/csstats-extension/csstats-extension'
2025-08-27T17:56:52.4439899Z ##[group]Initializing the repository
2025-08-27T17:56:52.4443620Z [command]/usr/bin/git init /home/runner/work/csstats-extension/csstats-extension
2025-08-27T17:56:52.4498051Z hint: Using 'master' as the name for the initial branch. This default branch name
2025-08-27T17:56:52.4499921Z hint: is subject to change. To configure the initial branch name to use in all
2025-08-27T17:56:52.4501375Z hint: of your new repositories, which will suppress this warning, call:
2025-08-27T17:56:52.4502378Z hint:
2025-08-27T17:56:52.4502843Z hint: 	git config --global init.defaultBranch <name>
2025-08-27T17:56:52.4503400Z hint:
2025-08-27T17:56:52.4503974Z hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
2025-08-27T17:56:52.4504861Z hint: 'development'. The just-created branch can be renamed via this command:
2025-08-27T17:56:52.4505834Z hint:
2025-08-27T17:56:52.4506443Z hint: 	git branch -m <name>
2025-08-27T17:56:52.4507124Z hint:
2025-08-27T17:56:52.4507723Z hint: Disable this message with "git config set advice.defaultBranchName false"
2025-08-27T17:56:52.4508770Z Initialized empty Git repository in /home/runner/work/csstats-extension/csstats-extension/.git/
2025-08-27T17:56:52.4511662Z [command]/usr/bin/git remote add origin https://github.com/TOR968/csstats-extension
2025-08-27T17:56:52.4543325Z ##[endgroup]
2025-08-27T17:56:52.4544040Z ##[group]Disabling automatic garbage collection
2025-08-27T17:56:52.4546852Z [command]/usr/bin/git config --local gc.auto 0
2025-08-27T17:56:52.4574572Z ##[endgroup]
2025-08-27T17:56:52.4575249Z ##[group]Setting up auth
2025-08-27T17:56:52.4580973Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2025-08-27T17:56:52.4609960Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2025-08-27T17:56:52.4893735Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2025-08-27T17:56:52.4922611Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2025-08-27T17:56:52.5136344Z [command]/usr/bin/git config --local http.https://github.com/.extraheader AUTHORIZATION: basic ***
2025-08-27T17:56:52.5169856Z ##[endgroup]
2025-08-27T17:56:52.5170824Z ##[group]Fetching the repository
2025-08-27T17:56:52.5186739Z [command]/usr/bin/git -c protocol.version=2 fetch --prune --no-recurse-submodules origin +refs/heads/*:refs/remotes/origin/* +refs/tags/*:refs/tags/*
2025-08-27T17:56:52.7366095Z From https://github.com/TOR968/csstats-extension
2025-08-27T17:56:52.7366974Z  * [new branch]      main       -> origin/main
2025-08-27T17:56:52.7367610Z  * [new tag]         init       -> init
2025-08-27T17:56:52.7403652Z [command]/usr/bin/git branch --list --remote origin/main
2025-08-27T17:56:52.7427187Z   origin/main
2025-08-27T17:56:52.7436068Z [command]/usr/bin/git rev-parse refs/remotes/origin/main
2025-08-27T17:56:52.7457069Z 5832f39279ac50f78184270d92b794f48897aa73
2025-08-27T17:56:52.7462910Z ##[endgroup]
2025-08-27T17:56:52.7464089Z ##[group]Determining the checkout info
2025-08-27T17:56:52.7465049Z ##[endgroup]
2025-08-27T17:56:52.7468287Z [command]/usr/bin/git sparse-checkout disable
2025-08-27T17:56:52.7506402Z [command]/usr/bin/git config --local --unset-all extensions.worktreeConfig
2025-08-27T17:56:52.7531554Z ##[group]Checking out the ref
2025-08-27T17:56:52.7534906Z [command]/usr/bin/git checkout --progress --force -B main refs/remotes/origin/main
2025-08-27T17:56:52.7614006Z Switched to a new branch 'main'
2025-08-27T17:56:52.7615837Z branch 'main' set up to track 'origin/main'.
2025-08-27T17:56:52.7624013Z ##[endgroup]
2025-08-27T17:56:52.7662041Z [command]/usr/bin/git log -1 --format=%H
2025-08-27T17:56:52.7684421Z 5832f39279ac50f78184270d92b794f48897aa73
2025-08-27T17:56:52.7889677Z ##[group]Run pnpm/action-setup@v2
2025-08-27T17:56:52.7890337Z with:
2025-08-27T17:56:52.7890906Z   version: latest
2025-08-27T17:56:52.7891392Z   dest: ~/setup-pnpm
2025-08-27T17:56:52.7892058Z   run_install: null
2025-08-27T17:56:52.7892689Z   package_json_file: package.json
2025-08-27T17:56:52.7893481Z   standalone: false
2025-08-27T17:56:52.7893993Z ##[endgroup]
2025-08-27T17:56:52.8787916Z ##[group]Running self-installer...
2025-08-27T17:56:53.4471371Z Progress: resolved 1, reused 0, downloaded 0, added 0
2025-08-27T17:56:53.4560781Z Packages: +1
2025-08-27T17:56:53.4561656Z +
2025-08-27T17:56:54.2702290Z Packages are hard linked from the content-addressable store to the virtual store.
2025-08-27T17:56:54.2704530Z   Content-addressable store is at: /home/runner/.local/share/pnpm/store/v3
2025-08-27T17:56:54.2705762Z   Virtual store is at:             node_modules/.pnpm
2025-08-27T17:56:54.2957481Z 
2025-08-27T17:56:54.2958134Z dependencies:
2025-08-27T17:56:54.2959195Z + pnpm 10.15.0
2025-08-27T17:56:54.2986711Z 
2025-08-27T17:56:54.2986984Z Done in 1.2s
2025-08-27T17:56:54.4476310Z Progress: resolved 1, reused 0, downloaded 1, added 1, done
2025-08-27T17:56:54.4617705Z ##[endgroup]
2025-08-27T17:56:54.4620830Z Installation Completed!
2025-08-27T17:56:54.4794056Z ##[group]Run actions/setup-node@v4
2025-08-27T17:56:54.4794545Z with:
2025-08-27T17:56:54.4794842Z   node-version: 22
2025-08-27T17:56:54.4795204Z   cache: pnpm
2025-08-27T17:56:54.4795489Z   always-auth: false
2025-08-27T17:56:54.4796173Z   check-latest: false
2025-08-27T17:56:54.4796651Z   token: ***
2025-08-27T17:56:54.4796909Z env:
2025-08-27T17:56:54.4797391Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2025-08-27T17:56:54.4797770Z ##[endgroup]
2025-08-27T17:56:54.6809683Z Found in cache @ /opt/hostedtoolcache/node/22.18.0/x64
2025-08-27T17:56:54.6816742Z ##[group]Environment details
2025-08-27T17:56:57.5595150Z node: v22.18.0
2025-08-27T17:56:57.5596104Z npm: 10.9.3
2025-08-27T17:56:57.5596533Z yarn: 1.22.22
2025-08-27T17:56:57.5621947Z ##[endgroup]
2025-08-27T17:56:57.5622557Z [command]/home/runner/setup-pnpm/node_modules/.bin/pnpm store path --silent
2025-08-27T17:56:58.1383597Z /home/runner/setup-pnpm/node_modules/.bin/store/v10
2025-08-27T17:56:58.2712096Z pnpm cache is not found
2025-08-27T17:56:58.2842268Z ##[group]Run actions/setup-python@v5
2025-08-27T17:56:58.2842547Z with:
2025-08-27T17:56:58.2842755Z   python-version: 3.x
2025-08-27T17:56:58.2842953Z   check-latest: false
2025-08-27T17:56:58.2843271Z   token: ***
2025-08-27T17:56:58.2843459Z   update-environment: true
2025-08-27T17:56:58.2843672Z   allow-prereleases: false
2025-08-27T17:56:58.2843878Z   freethreaded: false
2025-08-27T17:56:58.2844054Z env:
2025-08-27T17:56:58.2844263Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2025-08-27T17:56:58.2844529Z ##[endgroup]
2025-08-27T17:56:58.4466198Z ##[group]Installed versions
2025-08-27T17:56:58.4544649Z Successfully set up CPython (3.13.7)
2025-08-27T17:56:58.4545340Z ##[endgroup]
2025-08-27T17:56:58.4637956Z ##[group]Run pnpm install --frozen-lockfile
2025-08-27T17:56:58.4638349Z [36;1mpnpm install --frozen-lockfile[0m
2025-08-27T17:56:58.4773785Z shell: /usr/bin/bash -e {0}
2025-08-27T17:56:58.4774050Z env:
2025-08-27T17:56:58.4774300Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2025-08-27T17:56:58.4774709Z   pythonLocation: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:56:58.4775147Z   PKG_CONFIG_PATH: /opt/hostedtoolcache/Python/3.13.7/x64/lib/pkgconfig
2025-08-27T17:56:58.4775718Z   Python_ROOT_DIR: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:56:58.4776092Z   Python2_ROOT_DIR: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:56:58.4776466Z   Python3_ROOT_DIR: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:56:58.4776838Z   LD_LIBRARY_PATH: /opt/hostedtoolcache/Python/3.13.7/x64/lib
2025-08-27T17:56:58.4777157Z ##[endgroup]
2025-08-27T17:56:58.8166153Z Lockfile is up to date, resolution step is skipped
2025-08-27T17:56:58.8846941Z Progress: resolved 1, reused 0, downloaded 0, added 0
2025-08-27T17:56:59.0142079Z Packages: +682
2025-08-27T17:56:59.0144579Z ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
2025-08-27T17:56:59.8854393Z Progress: resolved 682, reused 0, downloaded 153, added 150
2025-08-27T17:57:00.8852318Z Progress: resolved 682, reused 0, downloaded 501, added 500
2025-08-27T17:57:01.4570950Z Progress: resolved 682, reused 0, downloaded 682, added 682, done
2025-08-27T17:57:01.8569333Z 
2025-08-27T17:57:01.8569912Z dependencies:
2025-08-27T17:57:01.8570620Z + @steambrew/api 5.5.3
2025-08-27T17:57:01.8571160Z + @steambrew/client 5.5.3
2025-08-27T17:57:01.8571618Z + @steambrew/ttc 2.7.3
2025-08-27T17:57:01.8572038Z + @steambrew/webkit 5.5.3
2025-08-27T17:57:01.8572293Z 
2025-08-27T17:57:01.8572440Z devDependencies:
2025-08-27T17:57:01.8572855Z + @babel/preset-env 7.28.3
2025-08-27T17:57:01.8573302Z + @babel/preset-react 7.27.1
2025-08-27T17:57:01.8573760Z + @babel/traverse 7.28.3
2025-08-27T17:57:01.8574307Z + @semantic-release/changelog 6.0.3
2025-08-27T17:57:01.8574889Z + @semantic-release/commit-analyzer 11.1.0
2025-08-27T17:57:01.8575402Z + @semantic-release/exec 6.0.3
2025-08-27T17:57:01.8576192Z + @semantic-release/git 10.0.1
2025-08-27T17:57:01.8576774Z + @semantic-release/github 9.2.6
2025-08-27T17:57:01.8577345Z + @semantic-release/npm 11.0.3
2025-08-27T17:57:01.8578014Z + @semantic-release/release-notes-generator 12.1.0
2025-08-27T17:57:01.8578609Z + @types/node 20.19.11
2025-08-27T17:57:01.8579026Z + @types/react 19.1.12
2025-08-27T17:57:01.8579427Z + @types/react-dom 19.1.8
2025-08-27T17:57:01.8579825Z + @types/webpack 5.28.5
2025-08-27T17:57:01.8580158Z + postcss 8.5.6
2025-08-27T17:57:01.8580534Z + rollup-plugin-postcss 4.0.2
2025-08-27T17:57:01.8581084Z + semantic-release 22.0.12
2025-08-27T17:57:01.8581504Z + tsx 4.20.5
2025-08-27T17:57:01.8581858Z + typescript 5.9.2
2025-08-27T17:57:01.8582079Z 
2025-08-27T17:57:01.8583127Z ╭ Warning ─────────────────────────────────────────────────────────────────────╮
2025-08-27T17:57:01.8584188Z │                                                                              │
2025-08-27T17:57:01.8585197Z │   Ignored build scripts: esbuild.                                            │
2025-08-27T17:57:01.8586455Z │   Run "pnpm approve-builds" to pick which dependencies should be allowed     │
2025-08-27T17:57:01.8587648Z │   to run scripts.                                                            │
2025-08-27T17:57:01.8588546Z │                                                                              │
2025-08-27T17:57:01.8589608Z ╰──────────────────────────────────────────────────────────────────────────────╯
2025-08-27T17:57:01.8590102Z 
2025-08-27T17:57:01.8668095Z . prepare$ pnpm run build
2025-08-27T17:57:02.1388003Z . prepare: > csstats-extension@1.0.0 build /home/runner/work/csstats-extension/csstats-extension
2025-08-27T17:57:02.1389317Z . prepare: > millennium-ttc --build prod
2025-08-27T17:57:03.0152900Z . prepare: envVars Processing 0 environment variables... okay
2025-08-27T17:57:03.6613680Z . prepare: versionMon @steambrew/ttc@2.7.3 is up-to-date!
2025-08-27T17:57:03.6615811Z . prepare: config Building target: /home/runner/work/csstats-extension/csstats-extension with type: ProdBuild minify: true ...
2025-08-27T17:57:03.6632452Z . prepare: millenniumAPI Loading tsconfig from ./frontend/tsconfig.json... okay
2025-08-27T17:57:05.3504162Z . prepare: millenniumAPI Bundling into Plugin module... okay
2025-08-27T17:57:06.4470586Z . prepare: millenniumAPI Bundling into Webkit module... okay
2025-08-27T17:57:06.4991068Z . prepare: build Succeeded passing all tests in 3483.579 ms elapsed.
2025-08-27T17:57:06.5541550Z . prepare: Done
2025-08-27T17:57:06.5693767Z Done in 8s using pnpm v10.15.0
2025-08-27T17:57:06.5995040Z ##[group]Run pip install -r requirements.txt
2025-08-27T17:57:06.5995420Z [36;1mpip install -r requirements.txt[0m
2025-08-27T17:57:06.6037584Z shell: /usr/bin/bash -e {0}
2025-08-27T17:57:06.6037812Z env:
2025-08-27T17:57:06.6038037Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2025-08-27T17:57:06.6038392Z   pythonLocation: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:57:06.6038793Z   PKG_CONFIG_PATH: /opt/hostedtoolcache/Python/3.13.7/x64/lib/pkgconfig
2025-08-27T17:57:06.6039180Z   Python_ROOT_DIR: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:57:06.6039687Z   Python2_ROOT_DIR: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:57:06.6040028Z   Python3_ROOT_DIR: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:57:06.6040368Z   LD_LIBRARY_PATH: /opt/hostedtoolcache/Python/3.13.7/x64/lib
2025-08-27T17:57:06.6040653Z ##[endgroup]
2025-08-27T17:57:09.6885993Z Collecting requests>=2.25.0 (from -r requirements.txt (line 1))
2025-08-27T17:57:09.7360392Z   Downloading requests-2.32.5-py3-none-any.whl.metadata (4.9 kB)
2025-08-27T17:57:09.8199293Z Collecting charset_normalizer<4,>=2 (from requests>=2.25.0->-r requirements.txt (line 1))
2025-08-27T17:57:09.8235109Z   Downloading charset_normalizer-3.4.3-cp313-cp313-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl.metadata (36 kB)
2025-08-27T17:57:09.8448572Z Collecting idna<4,>=2.5 (from requests>=2.25.0->-r requirements.txt (line 1))
2025-08-27T17:57:09.8482153Z   Downloading idna-3.10-py3-none-any.whl.metadata (10 kB)
2025-08-27T17:57:09.8771431Z Collecting urllib3<3,>=1.21.1 (from requests>=2.25.0->-r requirements.txt (line 1))
2025-08-27T17:57:09.8820723Z   Downloading urllib3-2.5.0-py3-none-any.whl.metadata (6.5 kB)
2025-08-27T17:57:09.9028359Z Collecting certifi>=2017.4.17 (from requests>=2.25.0->-r requirements.txt (line 1))
2025-08-27T17:57:09.9061955Z   Downloading certifi-2025.8.3-py3-none-any.whl.metadata (2.4 kB)
2025-08-27T17:57:09.9152364Z Downloading requests-2.32.5-py3-none-any.whl (64 kB)
2025-08-27T17:57:09.9255988Z Downloading charset_normalizer-3.4.3-cp313-cp313-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl (151 kB)
2025-08-27T17:57:09.9320179Z Downloading idna-3.10-py3-none-any.whl (70 kB)
2025-08-27T17:57:09.9374543Z Downloading urllib3-2.5.0-py3-none-any.whl (129 kB)
2025-08-27T17:57:09.9434820Z Downloading certifi-2025.8.3-py3-none-any.whl (161 kB)
2025-08-27T17:57:09.9642721Z Installing collected packages: urllib3, idna, charset_normalizer, certifi, requests
2025-08-27T17:57:10.2111296Z 
2025-08-27T17:57:10.2126286Z Successfully installed certifi-2025.8.3 charset_normalizer-3.4.3 idna-3.10 requests-2.32.5 urllib3-2.5.0
2025-08-27T17:57:10.3315978Z ##[group]Run if [ -f "package.json" ] && grep -q '"test"' package.json; then
2025-08-27T17:57:10.3316504Z [36;1mif [ -f "package.json" ] && grep -q '"test"' package.json; then[0m
2025-08-27T17:57:10.3316840Z [36;1m  pnpm test[0m
2025-08-27T17:57:10.3317029Z [36;1melse[0m
2025-08-27T17:57:10.3317235Z [36;1m  echo "No tests found, skipping..."[0m
2025-08-27T17:57:10.3317487Z [36;1mfi[0m
2025-08-27T17:57:10.3358762Z shell: /usr/bin/bash -e {0}
2025-08-27T17:57:10.3358981Z env:
2025-08-27T17:57:10.3359209Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2025-08-27T17:57:10.3359566Z   pythonLocation: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:57:10.3359959Z   PKG_CONFIG_PATH: /opt/hostedtoolcache/Python/3.13.7/x64/lib/pkgconfig
2025-08-27T17:57:10.3360341Z   Python_ROOT_DIR: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:57:10.3360687Z   Python2_ROOT_DIR: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:57:10.3361055Z   Python3_ROOT_DIR: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:57:10.3361406Z   LD_LIBRARY_PATH: /opt/hostedtoolcache/Python/3.13.7/x64/lib
2025-08-27T17:57:10.3361693Z ##[endgroup]
2025-08-27T17:57:10.3435531Z No tests found, skipping...
2025-08-27T17:57:10.3456625Z ##[group]Run pnpm run build
2025-08-27T17:57:10.3456882Z [36;1mpnpm run build[0m
2025-08-27T17:57:10.3492587Z shell: /usr/bin/bash -e {0}
2025-08-27T17:57:10.3492803Z env:
2025-08-27T17:57:10.3493018Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2025-08-27T17:57:10.3493377Z   pythonLocation: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:57:10.3493775Z   PKG_CONFIG_PATH: /opt/hostedtoolcache/Python/3.13.7/x64/lib/pkgconfig
2025-08-27T17:57:10.3494156Z   Python_ROOT_DIR: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:57:10.3494496Z   Python2_ROOT_DIR: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:57:10.3494835Z   Python3_ROOT_DIR: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:57:10.3495352Z   LD_LIBRARY_PATH: /opt/hostedtoolcache/Python/3.13.7/x64/lib
2025-08-27T17:57:10.3495866Z ##[endgroup]
2025-08-27T17:57:10.6137989Z 
2025-08-27T17:57:10.6138830Z > csstats-extension@1.0.0 build /home/runner/work/csstats-extension/csstats-extension
2025-08-27T17:57:10.6140619Z > millennium-ttc --build prod
2025-08-27T17:57:10.6140909Z 
2025-08-27T17:57:11.4365987Z envVars Processing 0 environment variables... okay
2025-08-27T17:57:11.5628859Z versionMon @steambrew/ttc@2.7.3 is up-to-date!
2025-08-27T17:57:11.5631158Z config Building target: /home/runner/work/csstats-extension/csstats-extension with type: ProdBuild minify: true ...
2025-08-27T17:57:11.5647486Z millenniumAPI Loading tsconfig from ./frontend/tsconfig.json... okay
2025-08-27T17:57:13.2138117Z millenniumAPI Bundling into Plugin module... okay
2025-08-27T17:57:14.3127747Z millenniumAPI Bundling into Webkit module... okay
2025-08-27T17:57:14.3654198Z build Succeeded passing all tests in 2928.467 ms elapsed.
2025-08-27T17:57:14.4233805Z ##[group]Run mkdir -p release
2025-08-27T17:57:14.4234124Z [36;1mmkdir -p release[0m
2025-08-27T17:57:14.4234328Z [36;1m[0m
2025-08-27T17:57:14.4234504Z [36;1m# Copy essential files[0m
2025-08-27T17:57:14.4234890Z [36;1mcp -r dist/* release/ 2>/dev/null || echo "No dist directory found"[0m
2025-08-27T17:57:14.4235321Z [36;1mcp -r frontend release/ 2>/dev/null || echo "No frontend directory"[0m
2025-08-27T17:57:14.4236557Z [36;1mcp -r webkit release/ 2>/dev/null || echo "No webkit directory"[0m
2025-08-27T17:57:14.4237328Z [36;1mcp -r backend release/ 2>/dev/null || echo "No backend directory"[0m
2025-08-27T17:57:14.4238057Z [36;1mcp -r styles release/ 2>/dev/null || echo "No styles directory"[0m
2025-08-27T17:57:14.4238602Z [36;1m[0m
2025-08-27T17:57:14.4238819Z [36;1m# Copy configuration files[0m
2025-08-27T17:57:14.4239073Z [36;1mcp package.json release/[0m
2025-08-27T17:57:14.4239314Z [36;1mcp plugin.json release/[0m
2025-08-27T17:57:14.4239591Z [36;1mcp requirements.txt release/[0m
2025-08-27T17:57:14.4239829Z [36;1mcp README.md release/[0m
2025-08-27T17:57:14.4240120Z [36;1mcp LICENSE release/ 2>/dev/null || echo "No LICENSE file"[0m
2025-08-27T17:57:14.4240408Z [36;1m[0m
2025-08-27T17:57:14.4240619Z [36;1m# Get version from package.json for zip name[0m
2025-08-27T17:57:14.4240978Z [36;1mVERSION=$(node -p "require('./package.json').version")[0m
2025-08-27T17:57:14.4241268Z [36;1m[0m
2025-08-27T17:57:14.4241439Z [36;1m# Create zip package[0m
2025-08-27T17:57:14.4241644Z [36;1mcd release[0m
2025-08-27T17:57:14.4241887Z [36;1mzip -r "../csstats-extension-v${VERSION}.zip" .[0m
2025-08-27T17:57:14.4242159Z [36;1mcd ..[0m
2025-08-27T17:57:14.4282886Z shell: /usr/bin/bash -e {0}
2025-08-27T17:57:14.4283107Z env:
2025-08-27T17:57:14.4283333Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2025-08-27T17:57:14.4283676Z   pythonLocation: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:57:14.4284081Z   PKG_CONFIG_PATH: /opt/hostedtoolcache/Python/3.13.7/x64/lib/pkgconfig
2025-08-27T17:57:14.4284471Z   Python_ROOT_DIR: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:57:14.4284808Z   Python2_ROOT_DIR: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:57:14.4285145Z   Python3_ROOT_DIR: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:57:14.4285474Z   LD_LIBRARY_PATH: /opt/hostedtoolcache/Python/3.13.7/x64/lib
2025-08-27T17:57:14.4285881Z ##[endgroup]
2025-08-27T17:57:14.5168968Z   adding: requirements.txt (stored 0%)
2025-08-27T17:57:14.5169992Z   adding: README.md (deflated 59%)
2025-08-27T17:57:14.5170597Z   adding: styles/ (stored 0%)
2025-08-27T17:57:14.5171201Z   adding: styles/styles.css (stored 0%)
2025-08-27T17:57:14.5171852Z   adding: plugin.json (deflated 33%)
2025-08-27T17:57:14.5172475Z   adding: package.json (deflated 62%)
2025-08-27T17:57:14.5173095Z   adding: webkit/ (stored 0%)
2025-08-27T17:57:14.5173817Z   adding: webkit/index.tsx (deflated 60%)
2025-08-27T17:57:14.5174812Z   adding: webkit/tsconfig.json (deflated 24%)
2025-08-27T17:57:14.5175499Z   adding: webkit/settings.tsx (deflated 52%)
2025-08-27T17:57:14.5176364Z   adding: backend/ (stored 0%)
2025-08-27T17:57:14.5176950Z   adding: backend/logger.py (deflated 19%)
2025-08-27T17:57:14.5177658Z   adding: backend/settings.py (deflated 77%)
2025-08-27T17:57:14.5178304Z   adding: backend/main.py (deflated 43%)
2025-08-27T17:57:14.5178970Z   adding: LICENSE (deflated 41%)
2025-08-27T17:57:14.5179522Z   adding: frontend/ (stored 0%)
2025-08-27T17:57:14.5180121Z   adding: frontend/index.tsx (deflated 51%)
2025-08-27T17:57:14.5180782Z   adding: frontend/tsconfig.json (deflated 31%)
2025-08-27T17:57:14.5181381Z   adding: frontend/settings.tsx (deflated 52%)
2025-08-27T17:57:14.5181855Z   adding: assets/ (stored 0%)
2025-08-27T17:57:14.5235220Z ##[group]Run npx semantic-release
2025-08-27T17:57:14.5235523Z [36;1mnpx semantic-release[0m
2025-08-27T17:57:14.5275131Z shell: /usr/bin/bash -e {0}
2025-08-27T17:57:14.5275348Z env:
2025-08-27T17:57:14.5275805Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2025-08-27T17:57:14.5276165Z   pythonLocation: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:57:14.5276568Z   PKG_CONFIG_PATH: /opt/hostedtoolcache/Python/3.13.7/x64/lib/pkgconfig
2025-08-27T17:57:14.5276955Z   Python_ROOT_DIR: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:57:14.5277281Z   Python2_ROOT_DIR: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:57:14.5277610Z   Python3_ROOT_DIR: /opt/hostedtoolcache/Python/3.13.7/x64
2025-08-27T17:57:14.5277937Z   LD_LIBRARY_PATH: /opt/hostedtoolcache/Python/3.13.7/x64/lib
2025-08-27T17:57:14.5278421Z   GITHUB_TOKEN: ***
2025-08-27T17:57:14.5278609Z   NPM_TOKEN: 
2025-08-27T17:57:14.5278767Z ##[endgroup]
2025-08-27T17:57:17.2776473Z [5:57:16 PM] [semantic-release] › ℹ  Running semantic-release version 22.0.12
2025-08-27T17:57:17.4810213Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "verifyConditions" from "@semantic-release/changelog"
2025-08-27T17:57:17.4811810Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "verifyConditions" from "@semantic-release/npm"
2025-08-27T17:57:17.4813294Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "verifyConditions" from "@semantic-release/exec"
2025-08-27T17:57:17.4816421Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "verifyConditions" from "@semantic-release/github"
2025-08-27T17:57:17.4817621Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "verifyConditions" from "@semantic-release/git"
2025-08-27T17:57:17.4820927Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "analyzeCommits" from "@semantic-release/commit-analyzer"
2025-08-27T17:57:17.4823055Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "analyzeCommits" from "@semantic-release/exec"
2025-08-27T17:57:17.4826347Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "verifyRelease" from "@semantic-release/exec"
2025-08-27T17:57:17.4831487Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "generateNotes" from "@semantic-release/release-notes-generator"
2025-08-27T17:57:17.4833478Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "generateNotes" from "@semantic-release/exec"
2025-08-27T17:57:17.4836956Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "prepare" from "@semantic-release/changelog"
2025-08-27T17:57:17.4837896Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "prepare" from "@semantic-release/npm"
2025-08-27T17:57:17.4838917Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "prepare" from "@semantic-release/exec"
2025-08-27T17:57:17.4840037Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "prepare" from "@semantic-release/git"
2025-08-27T17:57:17.4842983Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "publish" from "@semantic-release/npm"
2025-08-27T17:57:17.4843920Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "publish" from "@semantic-release/exec"
2025-08-27T17:57:17.4844914Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "publish" from "@semantic-release/github"
2025-08-27T17:57:17.4847766Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "addChannel" from "@semantic-release/npm"
2025-08-27T17:57:17.4849119Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "addChannel" from "@semantic-release/exec"
2025-08-27T17:57:17.4850032Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "addChannel" from "@semantic-release/github"
2025-08-27T17:57:17.4851834Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "success" from "@semantic-release/exec"
2025-08-27T17:57:17.4852756Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "success" from "@semantic-release/github"
2025-08-27T17:57:17.4855450Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "fail" from "@semantic-release/exec"
2025-08-27T17:57:17.4856523Z [5:57:17 PM] [semantic-release] › ✔  Loaded plugin "fail" from "@semantic-release/github"
2025-08-27T17:57:18.1710883Z [5:57:18 PM] [semantic-release] › ✔  Run automated release from branch main on repository https://github.com/TOR968/csstats-extension
2025-08-27T17:57:18.3852828Z [5:57:18 PM] [semantic-release] › ✔  Allowed to push to the Git repository
2025-08-27T17:57:18.3855269Z [5:57:18 PM] [semantic-release] › ℹ  Start step "verifyConditions" of plugin "@semantic-release/changelog"
2025-08-27T17:57:18.3868903Z [5:57:18 PM] [semantic-release] › ✔  Completed step "verifyConditions" of plugin "@semantic-release/changelog"
2025-08-27T17:57:18.3870640Z [5:57:18 PM] [semantic-release] › ℹ  Start step "verifyConditions" of plugin "@semantic-release/npm"
2025-08-27T17:57:18.3916195Z [5:57:18 PM] [semantic-release] › ✔  Completed step "verifyConditions" of plugin "@semantic-release/npm"
2025-08-27T17:57:18.3917681Z [5:57:18 PM] [semantic-release] › ℹ  Start step "verifyConditions" of plugin "@semantic-release/exec"
2025-08-27T17:57:18.3923544Z [5:57:18 PM] [semantic-release] › ✔  Completed step "verifyConditions" of plugin "@semantic-release/exec"
2025-08-27T17:57:18.3925046Z [5:57:18 PM] [semantic-release] › ℹ  Start step "verifyConditions" of plugin "@semantic-release/github"
2025-08-27T17:57:18.3938665Z [5:57:18 PM] [semantic-release] [@semantic-release/github] › ℹ  Verify GitHub authentication (https://api.github.com)
2025-08-27T17:57:18.3958661Z [5:57:18 PM] [semantic-release] › ✔  Completed step "verifyConditions" of plugin "@semantic-release/github"
2025-08-27T17:57:18.3960158Z [5:57:18 PM] [semantic-release] › ℹ  Start step "verifyConditions" of plugin "@semantic-release/git"
2025-08-27T17:57:18.3967357Z [5:57:18 PM] [semantic-release] › ✔  Completed step "verifyConditions" of plugin "@semantic-release/git"
2025-08-27T17:57:18.3969491Z [5:57:18 PM] [semantic-release] › ℹ  No git tag version found on branch main
2025-08-27T17:57:18.3970723Z [5:57:18 PM] [semantic-release] › ℹ  No previous release found, retrieving all commits
2025-08-27T17:57:18.4066133Z [5:57:18 PM] [semantic-release] › ℹ  Found 4 commits since last release
2025-08-27T17:57:18.4068874Z [5:57:18 PM] [semantic-release] › ℹ  Start step "analyzeCommits" of plugin "@semantic-release/commit-analyzer"
2025-08-27T17:57:18.4177945Z [5:57:18 PM] [semantic-release] [@semantic-release/commit-analyzer] › ℹ  Analyzing commit: Refactor release workflow and update release config
2025-08-27T17:57:18.4178754Z 
2025-08-27T17:57:18.4181614Z Reorders and updates steps in the release GitHub Actions workflow: moves pnpm installation before Node.js setup, upgrades setup-python to v5, removes the separate build-and-package job, and integrates packaging and semantic-release into a single job. Also updates the release config to use 'npx tsx' for running the version sync script.
2025-08-27T17:57:18.4185922Z [5:57:18 PM] [semantic-release] [@semantic-release/commit-analyzer] › ℹ  The commit should not trigger a release
2025-08-27T17:57:18.4188257Z [5:57:18 PM] [semantic-release] [@semantic-release/commit-analyzer] › ℹ  Analyzing commit: Update release.yml
2025-08-27T17:57:18.4189664Z [5:57:18 PM] [semantic-release] [@semantic-release/commit-analyzer] › ℹ  The commit should not trigger a release
2025-08-27T17:57:18.4191000Z [5:57:18 PM] [semantic-release] [@semantic-release/commit-analyzer] › ℹ  Analyzing commit: Update release.yml
2025-08-27T17:57:18.4192628Z [5:57:18 PM] [semantic-release] [@semantic-release/commit-analyzer] › ℹ  The commit should not trigger a release
2025-08-27T17:57:18.4194191Z [5:57:18 PM] [semantic-release] [@semantic-release/commit-analyzer] › ℹ  Analyzing commit: Initial commit: add CSStats.gg Millennium plugin
2025-08-27T17:57:18.4194680Z 
2025-08-27T17:57:18.4196549Z Set up the initial project structure for the CSStats.gg Extension plugin for Millennium. Includes backend (Python), frontend (TypeScript/React), webkit integration, configuration files, build and release scripts, GitHub Actions workflow, and documentation. Enables CSStats.gg integration with Steam profiles and provides automated build and release infrastructure.
2025-08-27T17:57:18.4199154Z [5:57:18 PM] [semantic-release] [@semantic-release/commit-analyzer] › ℹ  The commit should not trigger a release
2025-08-27T17:57:18.4200143Z [5:57:18 PM] [semantic-release] [@semantic-release/commit-analyzer] › ℹ  Analysis of 4 commits complete: no release
2025-08-27T17:57:18.4201103Z [5:57:18 PM] [semantic-release] › ✔  Completed step "analyzeCommits" of plugin "@semantic-release/commit-analyzer"
2025-08-27T17:57:18.4201933Z [5:57:18 PM] [semantic-release] › ℹ  Start step "analyzeCommits" of plugin "@semantic-release/exec"
2025-08-27T17:57:18.4202726Z [5:57:18 PM] [semantic-release] › ✔  Completed step "analyzeCommits" of plugin "@semantic-release/exec"
2025-08-27T17:57:18.4236956Z [5:57:18 PM] [semantic-release] › ℹ  There are no relevant changes, so no new version is released.
2025-08-27T17:57:18.4828107Z Post job cleanup.
2025-08-27T17:57:18.6440321Z Post job cleanup.
2025-08-27T17:57:18.8216375Z [command]/usr/bin/tar --posix -cf cache.tzst --exclude cache.tzst -P -C /home/runner/work/csstats-extension/csstats-extension --files-from manifest.txt --use-compress-program zstdmt
2025-08-27T17:57:20.6656909Z Sent 48102929 of 48102929 (100.0%), 45.8 MBs/sec
2025-08-27T17:57:20.8942590Z Cache saved with the key: node-cache-Linux-x64-pnpm-5c535de0f196d4251d2849e4ac7f587d059f8f4ed36130a39bea080f8896df5c
2025-08-27T17:57:20.9055768Z Post job cleanup.
2025-08-27T17:57:20.9923292Z Pruning is unnecessary.
2025-08-27T17:57:21.0012344Z Post job cleanup.
2025-08-27T17:57:21.0944919Z [command]/usr/bin/git version
2025-08-27T17:57:21.0980907Z git version 2.51.0
2025-08-27T17:57:21.1022814Z Temporarily overriding HOME='/home/runner/work/_temp/ae1ed328-f05c-446b-a391-e73a4efd9a72' before making global git config changes
2025-08-27T17:57:21.1024716Z Adding repository directory to the temporary git global config as a safe directory
2025-08-27T17:57:21.1034768Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/csstats-extension/csstats-extension
2025-08-27T17:57:21.1068448Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2025-08-27T17:57:21.1099937Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2025-08-27T17:57:21.1328295Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2025-08-27T17:57:21.1350597Z http.https://github.com/.extraheader
2025-08-27T17:57:21.1362939Z [command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
2025-08-27T17:57:21.1393357Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2025-08-27T17:57:21.1724069Z Cleaning up orphan processes