'use client';

import { CodeHighlight } from '@mantine/code-highlight';
import type { Code as CodeNode } from 'datocms-structured-text-utils';

type Props = {
  node: CodeNode;
};

// Create function that maps node.language to CodeHighlight language
function getLanguage(language?: string) {
  switch (language) {
    case 'javascript':
      return 'jsx';
    case 'typescript':
      return 'tsx';
    default:
      return 'tsx';
  }
}

export default function Code({ node }: Props) {
  return (
    <CodeHighlight code={node.code} language={getLanguage(node.language)} />
  );
}
