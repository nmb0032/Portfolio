# My Portfolio

Welcome to my open-source portfolio project! This project is built using Next.js 16 with the App Router, plain CSS, and local Markdown files for the blog.

## Getting Started

To get started with the development server, follow these steps:

1. Clone the repository:

```bash
git clone <REPO_NAME>
cd <REPO_NAME>
```

2. Install the dependencies:

```bash
pnpm install
```

Use pnpm rather than npm for this repository. The `packageManager` field pins
pnpm 10.33.2, and `pnpm-lock.yaml` is the dependency lockfile. With Corepack
available, run `corepack enable` if the `pnpm` command is missing.

3. Run the development server:

```bash
pnpm dev
```

Or build the project for production:

```bash
pnpm build
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Features

- **Next.js 16**: Utilizes the latest features of Next.js with the App Router.
- **Plain CSS**: a single `src/app/globals.css`, monochrome light/dark via `prefers-color-scheme`, retro system monospace fonts, no UI library or external font requests.
- **Markdown Blog**: Blog component powered by local Markdown files in `src/posts` (parsed with gray-matter + remark/rehype).

## Project Structure

The project structure is as follows:

```
/src
  /app
    /blog
    /components
    /lib
  /posts
```

## Learn More

To learn more about the technologies used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

If you have any questions or feedback, feel free to reach out.

- [LinkedIn](https://www.linkedin.com/in/nicholas-belvin-9738181ab/)
- [GitHub](https://github.com/nmb0032)
