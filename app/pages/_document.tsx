import {
  Document,
  Html,
  DocumentHead,
  Main,
  BlitzScript /* DocumentContext */,
} from 'blitz';

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render(): JSX.Element {
    return (
      <Html lang="en" className="bg-base-200">
        <DocumentHead />
        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
