import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html'; // You won't directly use this for the final HTML conversion with rehype
import { VFileCompatible } from 'vfile';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkRehype from 'remark-rehype'; // Import remark-rehype
import rehypeStringify from 'rehype-stringify'; // Import rehype-stringify

// Define interfaces for better type safety (your existing interfaces are fine)
export interface PostData {
  id: string;
  title: string;
  date: string;
  author?: string;
  excerpt?: string;
  image?: string;
  [key: string]: any;
}

export interface FullPostData extends PostData {
  contentHtml: string;
}

const postsDirectory = path.join(process.cwd(), 'src/posts');

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id,
      ...(matterResult.data as Omit<PostData, 'id'>),
    } as PostData;
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(id: string): Promise<FullPostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Corrected pipeline for markdown to HTML with rehype-pretty-code
  const processedContent = await remark()
    .use(remarkRehype) // Convert Markdown AST to HAST
    .use(rehypePrettyCode, {
      theme: 'github-dark',
    })
    .use(rehypeStringify) // Convert HAST to HTML string
    .process(matterResult.content as VFileCompatible);

  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml, cast to FullPostData
  return {
    id,
    contentHtml,
    ...(matterResult.data as Omit<PostData, 'id'>),
  } as FullPostData;
}

export function getAllPostIds(): { params: { id: string } }[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}
