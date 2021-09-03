/* eslint-disable */
const InjectSeoPlugin = require('@kibalabs/build/scripts/plugins/injectSeoPlugin');

const title = 'Million Dollar Token Page';
const description = 'MillionDollarTokenPage (MDTP) is a digital content-sharing space powered by Ethereum and NFTs. Each block can be bought as a unique NFT, set to display the content you like, and later re-sold. Show off and share your content, and own a piece of crypto history!';
const imageUrl = '/assets/banner.png';
const url = 'https://milliondollartokenpage.com'

const seoTags = [
  new InjectSeoPlugin.MetaTag('og:title', title),
  new InjectSeoPlugin.MetaTag('description', description),
  new InjectSeoPlugin.MetaTag('og:description', description),
  new InjectSeoPlugin.MetaTag('twitter:card', 'summary_large_image'),
  new InjectSeoPlugin.MetaTag('og:image', imageUrl),
  new InjectSeoPlugin.MetaTag('og:url', url),
  new InjectSeoPlugin.Tag('link', {rel: 'canonical', href: url}),
  new InjectSeoPlugin.Tag('link', {rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/apple-touch-icon.png'}),
  new InjectSeoPlugin.Tag('link', {rel: 'icon', type: 'image/svg+xml', href: '/assets/favicon.svg'}),
  new InjectSeoPlugin.Tag('link', {rel: 'alternate icon', href: '/assets/favicon.ico'}),
  new InjectSeoPlugin.Tag('link', {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/favicon-16x16.png'}),
  new InjectSeoPlugin.Tag('link', {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/favicon-32x32.png'}),
];

module.exports = (config) => {
  config.seoTags = seoTags;
  config.title = title;
  return config;
};
0.007533000
