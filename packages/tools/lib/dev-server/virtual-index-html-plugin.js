import path from "path";
import { globby } from "globby";

const virtualIndexPlugin = () => {
	return {
		name: 'virtual-index-html',
		async config() {
			const files = await globby(["test/pages/**/*.html", "packages/*/test/pages/**/*.html"]);

			const rollupInput = {};

			files.forEach(file => {
				rollupInput[file] = path.resolve(process.cwd(), file);
			});

			return {
				build: {
					rolldownOptions: {
						input: rollupInput
					}
				}
			}
		},
		async configureServer(server) {
			const files = await globby(["test/pages/**/*.html", "packages/*/test/pages/**/*.html"]);

			const pagesPerFolder = {};
			files.forEach(file => {
				let folder = pagesPerFolder[path.dirname(file)] = pagesPerFolder[path.dirname(file)] || [];
				folder.push(path.basename(file));
			});

			server.middlewares.use((req, res, next) => {
				if (req.url === "/") {
					const folders = Object.keys(pagesPerFolder);

					res.statusCode = 200;
					res.setHeader("Content-Type", "text/html; charset=utf-8");
					res.end(`${folders.map(folder => {
						const pages = pagesPerFolder[folder];
						return `<h1>${folder}</h1>
							${pages.map(page => {
							return `<li><a href='${folder}/${page}'>${page}</a></li>`
						}).join("")}
						`
					}).join("")}`);
				} else {
					next();
				}
			})
		},
	}
};

export default virtualIndexPlugin;
