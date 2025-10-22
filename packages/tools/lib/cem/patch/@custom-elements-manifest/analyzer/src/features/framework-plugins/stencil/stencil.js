import { decorator, toKebabCase } from '../../../utils/index.js'

export function stencilPlugin() {
  let events = [];

  const METHOD_DENYLIST = ['componentWillLoad', 'componentDidLoad', 'componentShouldUpdate', 'componentWillRender', 'componentDidRender', 'componentWillUpdate', 'componentDidUpdate'];

  return {
    name: 'CORE - STENCIL',
    // Runs for each module
    analyzePhase({ts, node, moduleDoc}){
      switch (node.kind) {
        case ts.SyntaxKind.ClassDeclaration:
          /**
           * Add tagName to classDoc, extracted from `@Component({tag: 'foo-bar'})` decorator
           * Add custom-element-definition to exports
           */
          const componentDecorator = node?.modifiers?.find(decorator('Component'))?.expression;

          const tagName = componentDecorator?.arguments?.[0]?.properties?.find(prop => {
            return prop?.name?.getText() === 'tag'
          })?.initializer?.text;

          const className = node?.name?.getText();
          const currClass = moduleDoc?.declarations?.find(declaration => declaration.name === className);
          if(tagName) {
            currClass.tagName = tagName;
            moduleDoc.exports.push({
              kind: "custom-element-definition",
              name: tagName,
              declaration: {
                name: className,
                module: moduleDoc.path
              }
            });
          }

          /**
           * Collect fields with `@Event()` decorator so we can process them in `moduleLinkPhase`
           */
          const eventFields = node?.members
            ?.filter(member => member?.modifiers?.find(decorator('Event')))
            ?.map(member => {
              const eventDecorator = member?.modifiers?.find(decorator('Event'));
              const eventName = eventDecorator?.expression?.arguments?.[0]?.properties?.find(prop => {
                return prop?.name?.getText() === 'eventName'
              })?.initializer?.text;

              return { field: member?.name?.getText(), as: eventName || member?.name?.getText() }
            });
          events = [...(eventFields || [])];

          /**
           * Handle `@Prop` decorator, and store attributes to add to manifest later
           * - if type is primitive -> create attr
           *  - if not `{ attribute: ''}` in decorator, just kebabcase the fieldname, otherwise use the value provided
           * - if type is not primitive -> no attr
           * - add fieldName to attr
           */
          node?.members
            ?.filter(member => member?.modifiers?.find(decorator('Prop')))
            ?.forEach(property => {
              const fieldName = property?.name?.text;
              const attrNameFromDecorator = property?.modifiers?.[0]?.expression?.arguments?.[0]?.properties?.find(prop => prop?.name?.getText() === 'attribute')?.initializer?.text;
              const attrName = attrNameFromDecorator || toKebabCase(property?.name?.text);

              const reflects = property?.modifiers?.[0]?.expression?.arguments?.[0]?.properties?.find(prop => prop?.name?.getText() === 'reflects')?.initializer?.getText?.() === 'true';
              const member = currClass?.members?.find(mem => mem?.name === fieldName);
              if(reflects) {
                member.reflects = true;
                member.attribute = attrName;
              }

              if(!currClass.attributes) currClass.attributes = [];
              const hasType = !!property?.type?.getText?.();

                currClass.attributes.push({
                  name: attrName,
                  fieldName,
                  ...(member?.default ? { default: member.default } : {}),
                  ...(member?.description ? { description: member.description } : {}),
                  ...(hasType ? {
                    type: { text: property?.type?.getText?.() }
                  } : {})
                })
            });

          break;
      }
    },

    // Runs for each module, after analyzing, all information about your module should now be available
    moduleLinkPhase({moduleDoc}){
      /**
       * Remove lifecycle methods
       */
      const classes = moduleDoc?.declarations?.filter(declaration => declaration.kind === 'class');

      classes?.forEach(klass => {
        if(!klass?.members) return;
        klass.members = klass?.members?.filter(member => {
          return !METHOD_DENYLIST.includes(member.name)
        });
      });

      /**
       * Events
       */
      classes?.forEach(klass => {
        if(!klass?.members) return;
        const eventsAsFields = klass.members
          ?.filter(member => events.some(event => event.field === member.name))
          ?.map(member => {
            delete member.privacy;
            delete member.kind;
            member.name = events.find(event => event.field === member.name).as;
            return member;
          }) || [];

        /* Add events as eventDocs */
        klass.events = [...(klass?.events || []), ...eventsAsFields]

        /* Remove events as class fields */
        klass.members = klass?.members?.filter(member => !events.some(event => event.field === member.name || event.as === member.name));
      });

    }
  }
}
