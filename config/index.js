const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

//@ts-check
const imageFetchPriorityRehypePlugin = require('../components/lcp-fetchpriority');

function buildConfig({
  title,
  tagline,
  url,
  projectName,
  seoKeywords,
  googleTrackingID,
  facebookAppID,
  algoliaAppID = undefined,
  algoliaApiKey = undefined,
  algoliaIndexName = undefined,
  showContentFooterEbookWrapper = true,
  showNavItems = true,
}) {
  /** @type {import('@docusaurus/types').Config} */
  return ({
    title: title,
    tagline: tagline,
    url: url,
    baseUrl: '/',
    trailingSlash: false,
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.png',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'novalagung',
    projectName: projectName,
    deploymentBranch: 'gh-pages',

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
      defaultLocale: 'id',
      locales: ['id'],
    },

    presets: [
      [
        'classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve('./../../sidebars.js'),
            sidebarCollapsible: false,
            routeBasePath: '/',
            rehypePlugins: [imageFetchPriorityRehypePlugin]
          },
          blog: false,
          theme: {
            customCss: [
              require.resolve('./../../src/css/global.css'),
              require.resolve('./../../src-local/css/custom.css'),
            ],
          },
          gtag: {
            trackingID: googleTrackingID,
            anonymizeIP: true,
          },
          sitemap: {
            changefreq: 'weekly',
            priority: 0.5,
            ignorePatterns: ['/tags/**', '/wip/**'],
            filename: 'sitemap.xml',
          },
        }),
      ],
    ],

    // scripts: [
    //   {
    //     src: 'https://pyscript.net/latest/pyscript.js',
    //     defer: true
    //   }
    // ],

    // stylesheets: [
    //   {
    //     href: 'https://pyscript.net/latest/pyscript.css'
    //   }
    // ],

    plugins: [
      '@stackql/docusaurus-plugin-structured-data',
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        metadata: [
          {
            name: 'keywords', content: seoKeywords,
          },
          {
            name: 'author', content: 'Noval Agung Prayogo',
          },
          {
            property: 'og:image', content: `${url}/img/cover_media_share.png`,
          },
          {
            property: 'og:type', content: 'article',
          },
          {
            property: 'fb:app_id', content: facebookAppID,
          }
        ],
        image: `${url}/img/cover_media_share.png`,
        navbar: {
          title: title,
          logo: {
            alt: `${title} - ${tagline}`,
            src: `${url}/img/logo_small_dark.png`,
            srcDark: `${url}/img/logo_small_light.png`,
          },
          items: !showNavItems ? [] : [
            {
              position: 'left',
              label: '📖 Webbook/Ebook',
              items: [
                {
                  label: 'Dasar Pemrograman Golang ',
                  href: 'https://dasarpemrogramangolang.novalagung.com',
                },
                {
                  label: 'Dasar Pemrograman Python ',
                  href: 'https://dasarpemrogramanpython.novalagung.com',
                },
                {
                  label: 'Dasar Pemrograman Rust ',
                  href: 'https://dasarpemrogramanrust.novalagung.com',
                },
                {
                  label: 'How To ',
                  href: 'https://howto.novalagung.com',
                },
              ].filter((d) => d.href != url)
            },
            {
              position: 'left',
              label: '▶️ Udemy courses',
              items: [
                {
                  label: 'Udemy Course: Praktis Belajar Docker dan Kubernetes ',
                  href: 'https://www.udemy.com/course/praktis-belajar-docker-dan-kubernetes-untuk-pemula/?couponCode=',
                },
              ]
            }
          ],
        },
        footer: {
          style: 'dark',
          links: [ ],
          copyright: `${new Date().getFullYear()} | Maintained by Noval Agung Prayogo`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
          additionalLanguages: ['bash', 'rust', 'python', 'toml', 'yaml', 'log', 'hcl'],
        },
        showContentFooterEbookWrapper: showContentFooterEbookWrapper,
        algolia: algoliaAppID ? {
          appId: algoliaAppID,
          apiKey: algoliaApiKey,
          indexName: algoliaIndexName,
          contextualSearch: true,
          searchPagePath: 'search', // false | search
        } : undefined,
        structuredData: {
          excludedRoutes: [ ],  
          verbose: true,
          featuredImageDimensions: {
            width: 1200,
            height: 627,
          },
          authors: {
            'Noval Agung Prayogo': {
              authorId: '1',
              url: 'https://www.linkedin.com/in/novalagung',
              imageUrl: 'https://i.stack.imgur.com/99yxf.jpg',
              sameAs: [
                'https://stackoverflow.com/users/1467988/novalagung',
                'https://www.udemy.com/user/noval-agung-prayogo',
                'https://apps.apple.com/id/developer/noval-agung-prayogo/id1163677873?l=id',
                'https://novalagung.medium.com',
                'https://adplist.org/mentors/noval-agung-prayogo',
                'https://novalagung.com',
                'https://linktr.ee/novalagung',
                'https://www.instagram.com/novalagung',
                'https://www.facebook.com/novalagungprayogo',
                'https://www.codementor.io/@novalagung'
              ],
            },
          },  
          organization: {
            sameAs: [
              'https://web.facebook.com/adamstudio.page',
              'https://www.instagram.com/adamstudio.ig',
              'https://github.com/adamstudiogh',
              'https://github.com/novalagung'
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'hello@novalagung.com',
            },
            logo: {
              '@type': 'ImageObject',
              inLanguage: 'id',
              '@id': 'adamstudio',
              url: 'https://avatars.githubusercontent.com/u/65223287',
              contentUrl: 'https://avatars.githubusercontent.com/u/65223287',
              width: 1440,
              height: 900,
              caption: 'Adam Studio',
            },
            // address: {
            //   '@type': 'PostalAddress',
            //   addressCountry: 'AU', // https://en.wikipedia.org/wiki/ISO_3166-1
            //   postalCode: '3001',
            //   streetAddress: 'Level 24, 570 Bourke Street, Melbourne, Victoria',
            // },
            // duns: '750469226',
            // taxID: 'ABN 65 656 147 054',
          },
          website: {
            inLanguage: 'id',
          },
          webpage: {
            inLanguage: 'id',
            // datePublished: '2021-07-01',
          },
          breadcrumbLabelMap: {}
        },
      }),
  })
}

module.exports = { buildConfig }
