/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='icon' type='image/x-icon' href='assets/favicon.ico' />
        {/* <!-- Bootstrap icons--> */}
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css'
          rel='stylesheet'
        />
        {/* <!-- Google fonts--> */}
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,600;1,600&amp;display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,300;0,500;0,600;0,700;1,300;1,500;1,600;1,700&amp;display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,400;1,400&amp;display=swap'
          rel='stylesheet'
        />
        {/* <!-- Core theme CSS (includes Bootstrap)--> */}
        <link href='css/styles.css' rel='stylesheet' />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js'></script>
        {/* <!-- Core theme JS--> */}
        <script src='js/scripts.js'></script>
        {/* <!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *-->
        <!-- * *                               SB Forms JS                               * *-->
        <!-- * * Activate your form at https://startbootstrap.com/solution/contact-forms * *-->
        <!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *--> */}
        <script src='https://cdn.startbootstrap.com/sb-forms-latest.js'></script>
      </body>
    </Html>
  )
}
