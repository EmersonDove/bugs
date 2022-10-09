import theme from "@nuxt/content-theme-docs";

export default theme({
    docs: {
        primaryColor: '#57C682'
    },
    head: {
        link: [
            { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css' }
        ],
        script: [
            {
                src: "/__/firebase/8.6.8/firebase-app.js",
                body: true,
            },
            {
                src: "/__/firebase/8.6.8/firebase-analytics.js",
                body: true,
            },
            {
                src: "/__/firebase/init.js",
                body: true,
            },
            {
                src: "/analytics_init.js",
                body: true,
            },
        ]
    },
    content: {
        markdown: {
            remarkPlugins: [
                'remark-math'
            ],
            rehypePlugins: [
                ['rehype-katex', { output: 'html' }]
            ]
        }
    }
})
