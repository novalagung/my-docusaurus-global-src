import { useEffect } from 'react';
import {
  useThemeConfig,
  ErrorCauseBoundary,
} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import styles from './styles.module.css';
function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
}
function NavbarItems({items}) {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              {cause: error},
            )
          }>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}
function NavbarContentLayout({left, right}) {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://buttons.github.io/buttons.js";
    document.querySelector("head").append(s);
  });

  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">
        <div style={{ marginTop: '8px', marginRight: '15px' }}>
          <a
            className="github-button"
            href={`https://github.com/sponsors/${siteConfig.organizationName}`}
            data-color-scheme="no-preference: light; light: light; dark: dark;"
            data-icon="octicon-heart"
            data-size="large"
            aria-label={`Sponsor @${siteConfig.organizationName} on GitHub`}
          >Sponsor</a>
          &nbsp;
          <a
            className="github-button"
            href={`https://github.com/${siteConfig.organizationName}/${siteConfig.projectName}`}
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label={`Star ${siteConfig.organizationName}/${siteConfig.projectName} on GitHub`}
          >Star</a>
          &nbsp;
          <a
            className="github-button"
            href={`https://github.com/${siteConfig.organizationName}`}
            data-size="large"
            aria-label={`Follow @${siteConfig.organizationName} on GitHub`}
          >{`Follow @${siteConfig.organizationName}`}</a>
        </div>
        {right}
      </div>
    </div>
  );
}
export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const searchBarItem = items.find((item) => item.type === 'search');
  return (
    <NavbarContentLayout
      left={
        // TODO stop hardcoding items?
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        // TODO stop hardcoding items?
        // Ask the user to add the respective navbar items => more flexible
        <>
          <NavbarItems items={rightItems} />
          <NavbarColorModeToggle className={styles.colorModeToggle} />
          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
        </>
      }
    />
  );
}
