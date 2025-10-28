import { parse } from 'comment-parser';
import { handleJsDocType, normalizeDescription } from '../../utils/jsdoc.js';
import { has, safe } from '../../utils/index.js';

/**
 * CLASS-JSDOC
 *
 * Deals with any JSDoc above a class
 */
export function classJsDocPlugin() {
  return {
    name: 'CORE - CLASS-JSDOC',
    analyzePhase({ts, node, moduleDoc}){
      switch (node.kind) {
        case ts.SyntaxKind.ClassDeclaration:
          const className = node?.name?.getText();
          const classDoc = moduleDoc?.declarations?.find(declaration => declaration.name === className);

          /**
           * Because we use a bunch of 'non-standard' JSDoc annotations, TS doesn't recognize most of them.
           * Instead we use `comment-parser` to parse the JSDoc.
           *
           * Loops through each JSDoc (yes, there can be multiple) above a class, and parses every JSDoc annotation
           *
           * Checks to see if the item is already in the classDoc, and if so merge and overwrite (JSDoc takes precedence)
           */
          node?.jsDoc?.forEach(jsDoc => {
            const parsed = parse(jsDoc?.getFullText());
            parsed?.forEach(parsedJsDoc => {

              /**
               * If any of the tags is a `@typedef`, we ignore it; this JSDoc comment may be above a class,
               * it probably doesnt _belong_ to the class, but something else in the file
               */
              if(parsedJsDoc?.tags?.some(tag => tag?.tag === 'typedef')) return;

              parsedJsDoc?.tags?.forEach(jsDoc => {
                switch(jsDoc.tag) {
                  case 'attr':
                  case 'attribute':
                    const attributeAlreadyExists = classDoc?.attributes?.find(attr => attr.name === jsDoc.name);
                    let attributeDoc = attributeAlreadyExists || {};
                    attributeDoc = handleClassJsDoc(attributeDoc, jsDoc);
                    if(!attributeAlreadyExists) {
                      classDoc.attributes.push(attributeDoc);
                    }
                    break;
                  case 'prop':
                  case 'property':
                    const fieldAlreadyExists = classDoc?.members?.find(member => member.name === jsDoc.name);
                    let fieldDoc = fieldAlreadyExists || {};
                    fieldDoc = handleClassJsDoc(fieldDoc, jsDoc);
                    fieldDoc.kind = 'field';
                    if(!fieldAlreadyExists) {
                      classDoc.members.push(fieldDoc);
                    }
                    break;
                  case 'fires':
                  case 'event':
                    const eventAlreadyExists = classDoc?.events?.find(event => event.name === jsDoc.name);
                    let eventDoc = eventAlreadyExists || {};
                    eventDoc = handleClassJsDoc(eventDoc, jsDoc);
                    delete eventDoc.privacy;
                    if(!eventAlreadyExists) {
                      classDoc.events.push(eventDoc);
                    }
                    break;
                  case 'csspart':
                  case 'part':
                    let cssPartDoc = {};
                    cssPartDoc = handleClassJsDoc(cssPartDoc, jsDoc);
                    classDoc.cssParts.push(cssPartDoc);
                    break;
                  case 'cssprop':
                  case 'cssproperty':
                    let cssPropertyDoc = {};
                    cssPropertyDoc = handleClassJsDoc(cssPropertyDoc, jsDoc);
                    classDoc.cssProperties.push(cssPropertyDoc);
                    break;
                  case 'slot':
                    let slotDoc = {};
                    slotDoc = handleClassJsDoc(slotDoc, jsDoc);
                    classDoc.slots.push(slotDoc);
                    break;
                  case 'tag':
                  case 'tagname':
                  case 'element':
                  case 'customElement':
                  case 'customelement':
                    classDoc.tagName = jsDoc?.name || '';
                    classDoc.customElement = true;
                    break;
                  case 'cssState':
                  case 'cssstate':
                    let statePropertyDoc = {};
                    statePropertyDoc = handleClassJsDoc(statePropertyDoc, jsDoc);
                    classDoc.cssStates.push(statePropertyDoc);
                    break;
                  case 'deprecated':
                    classDoc.deprecated = jsDoc?.name ? `${jsDoc.name} ${jsDoc?.description}`.trim() : "true";
                    break;
                }
              })
            });

            /**
             * Description
             */
            if(jsDoc?.comment) {
              if(has(jsDoc?.comment)) {
                classDoc.description = jsDoc.comment.map(com => `${safe(() => com?.name?.getText()) ?? ''}${com.text}`).join('');
              } else {
                classDoc.description = normalizeDescription(jsDoc.comment);
              }
            }

            /**
             * Comment-parse doesn't handle annotations with only a description correctly, for example:
             * @summary foo bar
             * will output only 'bar' as the description.
             *
             * Instead, we use TS for this JSDoc annotation.
             */
            jsDoc?.tags?.forEach(tag => {
              switch(safe(() => tag?.tagName?.getText())) {
                case 'summary':
                  classDoc.summary = tag?.comment;
                  break;
              }
            });
          });

          break;
      }
    }
  }
}

function handleClassJsDoc(doc, tag) {
  if(tag?.type) {
    doc.type = { text: handleJsDocType(tag.type) }
  }

  if(tag?.description) {
    doc.description = normalizeDescription(tag.description);
  }

  if(tag?.name) {
    doc.name = tag.name === '-' ? '' : tag.name;
  }

  if(tag?.default) {
    doc.default = tag.default;
  }

  return doc;
}
