import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

    render() {
        return (
            <Html>
                <Head>
                    {/* Google Analytics */}
                    {/* <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=UA-203321363-1"
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                              window.dataLayer = window.dataLayer || [];
                              function gtag(){dataLayer.push(arguments);}
                              gtag('js', new Date());
                              gtag('config', 'UA-203321363-1', { page_path: window.location.pathname });
                          `,
                        }}
                    /> */}
                    <link href="https://fonts.googleapis.com/css2?family=DM+Mono&family=DM+Sans&display=swap" rel="stylesheet"></link>
                </Head>
                <body>
                <script>0</script>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument