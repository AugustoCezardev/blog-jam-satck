import Stripes from 'stripe';
import { version } from '../../package.json';

export const stripe = new Stripes(
    process.env.STRIPE_API_KEY,
    {
        apiVersion: '2020-08-27',
        appInfo: {
            name:'Ignews',
            version
        },
    }
);7