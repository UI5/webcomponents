import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/theme-common/internal';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import AskAI from '@site/src/components/AskAI';
/**
 Title can be declared inside md content or declared through
 front matter and added manually. To make both cases consistent,
 the added title is added under the same div.markdown block
 See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120

 We render a "synthetic title" if:
 - user doesn't ask to hide it with front matter
 - the markdown content does not already contain a top-level h1 heading
*/
function useSyntheticTitle() {
  const {metadata, frontMatter, contentTitle} = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

const renderAdditionalInfo = () => {
  const {frontMatter} = useDoc();
  if (frontMatter.ui5_since && frontMatter.ui5_tag_name) {
    return <div className="componentAdditionalInfo"><code>{"<" + frontMatter.ui5_tag_name + ">"}</code> | <span className="badge badge--primary">Since {frontMatter.ui5_since.toString()}</span></div>
  }

  if (frontMatter.ui5_tag_name) {
    return <div className="componentAdditionalInfo"><code>{"<" + frontMatter.ui5_tag_name + ">"}</code></div>
  }
  if (frontMatter.ui5_since) {
    return <div className="componentAdditionalInfo"><span className="badge badge--primary">Since {`${frontMatter.ui5_since}`}</span></div>
  }
}

export default function DocItemContent({children}) {
  const syntheticTitle = useSyntheticTitle();
  const {metadata, frontMatter} = useDoc();
  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      <div style={{ float: 'right', marginTop: '0.625rem', marginLeft: '1rem' }}>
        <AskAI title={metadata.title} tagName={frontMatter.ui5_tag_name} />
      </div>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
          {renderAdditionalInfo()}
        </header>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
