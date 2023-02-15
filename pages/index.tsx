import { GetStaticProps, NextPage } from 'next';

import { Content } from '../lib/content';
import { getContent } from '../lib/content-cache';

import HomePage from '../components/HomePage/HomePage';

interface Props {
  content: Content
}

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    content: await getContent()
  }
});

const NextHomePage: NextPage<Props> = props => (
  <HomePage content={props.content} />
);

export default NextHomePage;