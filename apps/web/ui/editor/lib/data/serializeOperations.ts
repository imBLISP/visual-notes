import deepEqual from 'fast-deep-equal';

type ContentNode = {
  type: string;
  content?: ContentNode[];
  [key: string]: any;
};

type DiffOperation = {
  type: 'remove' | 'after' | 'before';
  path: number[];
  node: ContentNode;
};

function findDifferences(prevContent: ContentNode, currentContent: ContentNode): DiffOperation[] {
  const differences: DiffOperation[] = [];

  function compareNodes(prev: ContentNode, current: ContentNode, path: number[] = []) {
    if (!deepEqual(prev, current)) {
      if (prev.content && current.content) {
        const maxLength = Math.max(prev.content.length, current.content.length);
        for (let i = 0; i < maxLength; i++) {
          if (i < prev.content.length && i >= current.content.length) {
            differences.push({ type: 'remove', path: [...path, i], node: prev.content[i] });
          } else if (i >= prev.content.length && i < current.content.length) {
            differences.push({ type: 'after', path: [...path, i - 1], node: current.content[i] });
          } else if (!deepEqual(prev.content[i], current.content[i])) {
            compareNodes(prev.content[i], current.content[i], [...path, i]);
          }
        }
      } else if (prev.content && !current.content) {
        prev.content.forEach((node, index) => {
          differences.push({ type: 'remove', path: [...path, index], node });
        });
      } else if (!prev.content && current.content) {
        current.content.forEach((node, index) => {
          differences.push({ type: 'after', path: [...path, index - 1], node });
        });
      }
    }
  }

  compareNodes(prevContent, currentContent);
  return differences;
}

export function getContentDiff(prevContent: ContentNode, currentContent: ContentNode): DiffOperation[] {
  return findDifferences(prevContent, currentContent);
}