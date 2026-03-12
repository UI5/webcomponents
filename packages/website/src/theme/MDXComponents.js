import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Editor from '@site/src/components/Editor';
import OldEditor from '@site/src/components/OldEditor';
import NewEditor from '@site/src/components/NewEditor';
import MDXTable from './Table';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  Editor,
  OldEditor,
  NewEditor,
  table: MDXTable,
};