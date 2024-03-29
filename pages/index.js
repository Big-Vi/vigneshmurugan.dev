import Head from "next/head";
import Layout from "@components/Layout";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { components } from "@lib/serializers";
import { getClient } from "@lib/sanity";
import { groq } from "next-sanity";

const Home = ({ postdata, preview }) => {
  return (
    <div>
      <Head>
        <title>Vignesh Murugan | Senior developer</title>
        <meta
          name="description"
          content="I'm Vignesh and senior developer currently working in Christchurch New Zealand."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div>
          <h1 className="h1">Vignesh Murugan</h1>
          <p className="-mt-1 mb-2">Senior developer</p>
          <p className="text-gray-500">
            I&apos;m building web & mobile applications ranging from small
            brochure website to complex E-Commerce applications.
            Libraries & technologies that i use are listed below.
          </p>
          <div className="text-gray-500 skills">
            <span>React</span>
            <span className="mx-2">|</span>
            <span>React Native</span>
            <span className="mx-2">|</span>
            <span>Redux</span>
            <span className="mx-2">|</span>
            <span>Typescript</span>
            <span className="mx-2">|</span>
            <span>Next.js</span>
            <span className="mx-2">|</span>
            <span>Shopify</span>
            <span className="mx-2">|</span>
            <span>Sanity.io</span>
            <span className="mx-2">|</span>
            <span>Python</span>
            <span className="mx-2">|</span>
            <span>Golang</span>
            <span className="mx-2">|</span>
            <span>PostgreSQL</span>
          </div>
        </div>

        <div className="my-6 md:my-8">
          <p className="mb-2">
            I’m currently working on:{" "}
            <span className="text-gray-500">
              Getting AWS Certified DevOps Engineer - Professional.
            </span>
          </p>
          <p>
            I’m currently learning:{" "}
            <span className="text-gray-500">
              Docker, Kubernete and relevant Devops stuff
            </span>
          </p>
        </div>

        <div className="my-20 md:my-28">
          {postdata && (
            <div>
              <h3 className="h3 font-bold text-2xl md:text-4xl tracking-tight mb-6 mt-8">
                Recent Posts & Projects
              </h3>
              <div className="flex gap-6 flex-col posts-home">
                {postdata.map((post) => {
                  return (
                    <Link key={post._id} href={"/blogs/" + post.slug}>
                      <a className="rounded-xl w-full hover:scale-[1.01] p-1">
                        <div className="flex flex-col justify-between h-full rounded-lg bg-black">
                          <div className="flex flex-col justify-between">
                            <h4 className="h4 text-lg md:text-lg font-medium mb-6 w-full tracking-tight">
                              {post.title}
                            </h4>
                            {post.summary && (
                              <div className="wysiwyg home-wysiwyg">
                                <PortableText
                                  value={post.summary}
                                  components={components}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </a>
                    </Link>
                  );
                })}
              </div>
              <Link href="/blogs">
                <a className="flex mt-8 leading-7 rounded-lg hover:text-white text-gray-400 transition-all h-6">
                  All posts
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="h-6 w-6 ml-1"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
                    ></path>
                  </svg>
                </a>
              </Link>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

const queryPost = groq`
*[_type == "post"] | order(_createdAt desc)[0..2] {
  ..., 
  author->,
  "slug": slug.current,
  categories[]->
}
`;

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(queryPost);

  return {
    props: {
      postdata: post,
      preview,
    },
    revalidate: 10,
  };
}

export default Home;
