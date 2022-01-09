import Head from 'next/head'
import Image from 'next/image'
import Layout from '@components/Layout'
import Link from 'next/link'
import BlockContent from '@sanity/block-content-to-react'
import { serializers } from '@lib/serializers'
import client, {
  getClient,
  usePreviewSubscription,
  PortableText,
} from "@lib/sanity";

import { groq } from "next-sanity";

const Home = ({ postdata, projectdata, preview }) => {
  return (
    <div>
      <Head>
        <title>Vignesh Murugan | Senior developer</title>
        <meta name="description" content="I'm Vignesh and senior developer currently working for Core education in Christchurch New Zealand." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div>
          <h1 className="h1">Vignesh Murugan</h1>
          <p className="-mt-1 mb-2">Senior developer - CORE Education</p>
          <p className="text-gray-600">I'm building web & mobile applications ranging from small brochure website to complex E-Commerce/E-Learning applications.
          Libraries & technologies that i use are listed below.</p>
          <div className="text-gray-600">
            <span>React</span><span className="mx-2">|</span> 
            <span>Redux</span><span className="mx-2">|</span> 
            <span>Typescript</span><span className="mx-2">|</span> 
            <span>MongoDB</span><span className="mx-2">|</span> 
            <span>Laravel</span><span className="mx-2">|</span> 
            <span>Shopify</span><span className="mx-2">|</span> 
            <span>Vue</span><span className="mx-2">|</span> 
            <span>VueX</span><span className="mx-2">|</span> 
            <span>Sanity.io</span><span className="mx-2">|</span>  
            <span>Swift</span>
          </div>
        </div>

        {projectdata &&
          <div className="my-20"> 
            <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 mt-8">Projects</h3>
            
              {projectdata.map(project => {
                    return (
                      <div key={project._id} className="flex flex-row mb-8">
                        <Link href={"/projects/" + project.slug}>
                          <a className="w-full  p-1">
                            <div className="">
                              <h4 className="text-lg font-medium w-full mb-2 uppercase">{project.title}</h4>
                              {project.summary &&
                                <BlockContent
                                  renderContainerOnSingleChild
                                  className="wysiwyg home-wysiwyg"
                                  blocks={project.summary}
                                  serializers={serializers}
                                />
                              }
                            </div>
                          </a>
                        </Link>
                      </div>
                    )
              })}
              <Link href="/projects">
                <a className="flex mt-8 leading-7 rounded-lg hover:text-white text-gray-400 transition-all h-6">All projects<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 ml-1"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"></path></svg></a>
              </Link>
            
          </div>
        }
        
        <div className="my-20">
          {postdata &&
            <div>
              <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 mt-8">Recent Posts</h3>
              <div className="flex gap-6 flex-col md:flex-row">
                {postdata.map(post => {
                  return (
                    <Link key={post._id} href={"/blogs/" + post.slug}>
                      <a className="border rounded-xl w-full md:w-1/2 p-1">
                        <div className="flex flex-col justify-between h-full rounded-lg p-4">
                          <div className="flex flex-col md:flex-row justify-between">
                            <h4 className="text-lg md:text-lg font-medium mb-6 w-full tracking-tight">{post.title}</h4>
                          </div>
                        </div>
                      </a>
                    </Link>
                  )
                })}
              </div>
              <Link href="/blogs">
                <a className="flex mt-8 leading-7 rounded-lg hover:text-white text-gray-400 transition-all h-6">All posts<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 ml-1"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"></path></svg></a>
              </Link>
            </div>
          }
        </div>
        

      </Layout>
    </div>
  )
}

const queryPost = groq`
*[_type == "post"] | order(_createdAt desc)[0..3] {
  ..., 
  author->,
  "slug": slug.current,
  categories[]->
}
`;
const queryProject = groq`
*[_type == "project"] | order(_createdAt desc)[0..3] {
  ..., 
  "slug": slug.current,
  categories[]->
}
`;

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(queryPost);
  const project = await getClient(preview).fetch(queryProject);

  return {
    props: {
      postdata: post,
      projectdata: project,
      preview,
    },
    revalidate: 10,
  };
}

export default Home