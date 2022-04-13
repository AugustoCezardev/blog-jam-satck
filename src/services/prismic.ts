import * as Prismic from '@prismicio/client'



export function getPrismicClient(req?: unknown) {
    const endpoint = 'https://ignewsaugusto.prismic.io/api/v2';

    const prismic =  Prismic.createClient(endpoint,
        { accessToken: process.env.PRISMIC_ACCESS_TOKEN})

    return prismic;
}