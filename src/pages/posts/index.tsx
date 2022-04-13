import Head from 'next/head';
import { GetStaticProps } from 'next/types';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';
import * as prismic from '@prismicio/client';
import  { RichText } from 'prismic-dom';

type Post = {
    slug: string,
    title: string,
    excerpt: string,
    updatedAt: string
}

interface PostsProps {
    posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
    return (
    <>
        <Head>
            <title>Posts | Ignews</title>
        </Head>

        <main className={styles.container}>
            <div className={styles.posts}>
                {posts.map(post => (
                    <a key={post.slug} >
                        <time>{post.updatedAt}</time>
                        <strong>{post.title}</strong>
                        <p>{post.excerpt}</p>
                    </a>
                ))}
            </div>
        </main>
    </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const client = getPrismicClient();

    const response = await client.get(
        {
            predicates: prismic.predicates.at('document.type', 'post'),
            pageSize: 100,
            fetch: ['post.title', 'post.content']
        }
    );

    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: post.data.title,
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

    return { 
        props: { posts }
    }
    
}