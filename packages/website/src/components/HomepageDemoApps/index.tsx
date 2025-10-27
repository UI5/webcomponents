import clsx from 'clsx';
import Heading from '@theme/Heading';
import './styles.css';

type Item = {
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  repository: string,
  demo: string,
}

const FramaworksList: Array<Item> = [
  {
    Svg: require('@site/static/img/demo-apps/Angular-1920-2560.svg').default,
    repository: "https://github.com/UI5/sample-webcomponents-angular",
    demo: "https://ui5.github.io/sample-webcomponents-angular/",
  },
  {
    Svg: require('@site/static/img/demo-apps/React-1920-2560.svg').default,
    repository: "https://github.com/UI5/sample-webcomponents-react",
    demo: "https://ui5.github.io/sample-webcomponents-react/",
  },
  {
   Svg: require('@site/static/img/demo-apps/Vue-1920-2560.svg').default,
    repository: "https://github.com/UI5/sample-webcomponents-vue",
    demo: "https://ui5.github.io/sample-webcomponents-vue/",
  },
  {
   Svg: require('@site/static/img/demo-apps/Svelte-1920-2560.svg').default,
    repository: "https://github.com/UI5/sample-webcomponents-svelte",
    demo: "https://ui5.github.io/sample-webcomponents-svelte/",
  },
];


const Framework = ({ Svg, repository, demo }: Item) => {
  return (
    <div className="demo-apps__framework">
        <Svg className="demo-apps__logo" />
        <a href={repository} className="demo-apps__link">Explore the Code</a>
        <a href={demo} className="demo-apps__link">Run the Demo App</a>
    </div>
  );
}

export default function HomepageDemoApps(): JSX.Element {
  return (
    <article className="demo-apps mainPageContainer">
        <div className="demo-apps__heading">
          <h2 className="demo-apps__title">Use the web framework of your choice</h2>
          <p className="demo-apps__desc"> UI5 Web Components are framework agnostic, working seamlessly with all popular frameworks,
          including Angular, React, Vue, Svelte, etc.</p>
        </div>
        <div className="demo-apps__frameworks">
            {FramaworksList.map((props, idx) => (
              <Framework key={idx} {...props} />
            ))}
        </div>
    </article>
  );
}
