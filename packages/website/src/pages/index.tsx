import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageDemoApps from '@site/src/components/HomepageDemoApps';
import HomepageTestimonials from '@site/src/components/HomepageTestimonials';
import Heading from '@theme/Heading';
import LogoWater from "@site/static/img/logos/LogoWater.svg";

import styles from './index.module.css';

function Logo(props: { colorMode: string }) {
  return (
    <LogoWater className={styles.logoMain} />
  );
} 

function HomepageHeader() {
  const { colorMode } = useColorMode();

  const now = new Date();
  const dateString = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div  className={clsx('container', styles.container)}>
        <p className={styles.heroDate}>{dateString}</p>
        <Logo colorMode={colorMode} />
        <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
          <span className={styles.heroTitle__UI5}>UI5</span> Web Components
        </Heading>

        <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
         An <span className={styles.hero__subtitle__part1}><b>open-source</b></span> UI components library for building <span className={styles.hero__subtitle__part2}><b>enterprise-ready</b></span> apps!
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg button--getting-started"
            to="/docs/getting-started/first-steps">
            Get Started
          </Link>

          <Link
            className={clsx("button button--secondary button--lg button--getting-started", styles.buttonSecondary)}
            to="/components/">
            Components
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Enterprise-Grade Web Components"
      description="An open-source UI components library implementing SAP Fiori design for building enterprise-ready web applications.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageDemoApps />
        <HomepageTestimonials />
      </main>

    </Layout>
  );
}
