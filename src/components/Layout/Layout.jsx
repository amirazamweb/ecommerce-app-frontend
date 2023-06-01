import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet";

const Layout = ({ children, description, keywords, author, title }) => {
    return (
        <div>

            <Helmet>

                <meta charSet="UTF-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>

            </Helmet>

            <Header />

            <main style={{ minHeight: '78vh' }}>
                {children}
            </main>

            <Footer />
        </div>
    )
}

// Layout.default.props = {
//     title: "Ecommerce app -shop now",
//     description: "mern stack project",
//     keywords: "mern, react, node, mongodb",
//     author: "amir"
// }

export default Layout