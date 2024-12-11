import { DefaultSeo } from 'next-seo';
import App from 'next/app';
// import your default seo configuration
import SEO from './components/next-seo.config';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </>
    );
  }
}
