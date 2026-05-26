/** @jsxImportSource hono/jsx */
import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html>
<head>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="/assets/client.css" />
</head>
      <body>
        {children}
        <script type="module" src="/assets/client.js"></script>
      </body>
    </html>
  )
})