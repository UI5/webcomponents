const Svg = require('@site/static/img/github-icon.svg').default;

export default function GitHubNavBarItem() {
    return (
        <>
            <a 
                href="https://github.com/UI5/webcomponents/"
                target="_blank" rel="noopener noreferrer" 
                className="navbar__item navbar__link header-github-link"
                aria-label="GitHub repository"
            >
                <Svg className="github__icon"/>
            </a>
        </>
    );
}