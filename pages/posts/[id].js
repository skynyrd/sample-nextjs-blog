import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Layout from '../../components/layout'
import Head from "next/head";
import Date from "../../components/date";

// `pages/posts/[...id].js` matches `/posts/a`, but also `/posts/a/b`, `/posts/a/b/c` and so on.
//  If you do this, in getStaticPaths, you must return an array as the value of the id key like so
//  check here for more info: https://nextjs.org/docs/routing/dynamic-routes

export async function getStaticPaths() {
  return {
    paths: getAllPostIds(),
    fallback: false // if page not found, returns 404. check true behaviour from the next.js documentation.
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      postData: await getPostData(params.id)
    }
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{ postData.title }</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}