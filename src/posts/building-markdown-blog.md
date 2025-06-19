---
title: Building a Markdown Blog in Next.js!
date: '2025-06-19'
author: Nick Belvin
excerpt: A guide to building a markdown static Next.js Blog using the App Router.
image: /images/post-previews/my-first-post.png
---

## Welcome to my Next.js blog!

This post demonstrates how to use **Markdown** with Next.js's Static Site Generation.

### Features:

* Fast loading
* SEO friendly
* Easy content management

### Getting Started

Building a Markdown blog in Next.js with the App Router offers a modern and powerful way to create a fast, maintainable, and SEO-friendly website. Here's a quick guide to getting started:

---

### 1. Set Up Your Next.js Project (with App Router)

First, create a new Next.js project and ensure the App Router is enabled (it's the default for new projects in recent Next.js versions).

```bash
npx create-next-app@latest my-app-router-markdown-blog
cd my-app-router-markdown-blog
```

During the setup, ensure you select "Yes" when prompted to use the App Router.

---

### 2. Install Markdown Libraries

You'll need a few libraries to parse and render Markdown. **`remark`** is a powerful Markdown processor, and **`remark-html`** allows you to convert Markdown to HTML. **`gray-matter`** is excellent for parsing front matter (metadata) from your Markdown files.

```bash
npm install remark remark-html gray-matter
# or
yarn add remark remark-html gray-matter
```

---

### 3. Create a `posts` Directory

Organize your Markdown files in a dedicated directory, for example, `posts/` in your project root. Each blog post will be a separate Markdown file (e.g., `my-first-post.md`).

---

### 4. Create Utility Functions for Data Fetching

With the App Router, you'll typically fetch data in Server Components or using Route Handlers. It's good practice to centralize your Markdown parsing logic in a utility file.

Create a file like `lib/posts.js`:

```javascript
// lib/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      id: fileName.replace(/\.md$/, ''),
    };
  });
}
```

---

### 5. Create Dynamic Routes for Posts

In the App Router, dynamic routes are created by wrapping a folder name in square brackets, e.g., `app/posts/[slug]/page.js`.

Create `app/posts/[slug]/page.js`:

```javascript
// app/posts/[slug]/page.js
import { getPostData, getAllPostIds } from '@/lib/posts'; // Adjust path if needed
import Head from 'next/head'; // For meta tags
import styles from './post.module.css'; // Optional: for specific post styling

export async function generateStaticParams() {
  const posts = getAllPostIds();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export default async function Post({ params }) {
  const postData = await getPostData(params.slug);

  return (
    <div className={styles.container}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={styles.heading}>{postData.title}</h1>
        <div className={styles.lightText}>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  );
}
```

---

### 6. Create Your Blog Home Page

For your blog's home page (e.g., `app/page.js`), you can fetch a list of all posts and display them.

Create `app/page.js`:

```javascript
// app/page.js
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts'; // Adjust path if needed
import styles from './home.module.css'; // Optional: for home page styling

export default function Home() {
  const allPostsData = getSortedPostsData();
  return (
    <div className={styles.container}>
      <section className={styles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="[https://nextjs.org/learn](https://nextjs.org/learn)">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${styles.headingMd} ${styles.padding1px}`}>
        <h2 className={styles.headingLg}>Blog</h2>
        <ul className={styles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={styles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={styles.lightText}>{date}</small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
```

---

### 7. Add Basic Styling (Optional)

You can add some basic CSS modules for styling.

`app/posts/[slug]/post.module.css`:

```css
/* app/posts/[slug]/post.module.css */
.container {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
}

.heading {
  font-size: 2.5rem;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.05rem;
  margin: 1rem 0;
}

.lightText {
  color: #666;
  font-size: 0.9rem;
}
```

`app/home.module.css`:

```css
/* app/home.module.css */
.container {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
}

.headingMd {
  font-size: 1.2rem;
  line-height: 1.5;
}

.headingLg {
  font-size: 1.5rem;
  line-height: 1.4;
  margin: 1rem 0;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.listItem {
  margin: 0 0 1.25rem;
}

.lightText {
  color: #666;
  font-size: 0.9rem;
}
```

---

### 8. Create Your First Markdown Post

Create a file named `posts/my-first-post.md` (or any `.md` file) with front matter:

```markdown
---
title: My First Post (App Router Edition)
date: '2023-01-01'
author: Nick Belvin
excerpt: This is an example of a post with the Next.js App Router.
---

Welcome to my Next.js blog using the **App Router**!

This post demonstrates how to use **Markdown** with Next.js's Static Site Generation (SSG) and the new App Router.

### Key Learnings:

* **App Router**: Understand how to structure your application with `app` directory.
* **Server Components**: Fetch data directly in your components.
* **Static Params**: Use `generateStaticParams` for pre-rendering dynamic routes.
* **Markdown Parsing**: Integrate `remark` and `gray-matter` for content processing.

```javascript
// Example code block
function helloWorld() {
  console.log("Hello, App Router!");
}
```

This setup leverages the power of the App Router for efficient data fetching and rendering, providing a robust foundation for your Markdown blog.
