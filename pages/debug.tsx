import { GetStaticProps, NextPage } from 'next';

import { Content } from '../lib/content';
import { getContent } from '../lib/content-cache';

import DebugPage from '../components/DebugPage/DebugPage';

interface Props {
  content: Content
}

export const getStaticProps: GetStaticProps = async context => ({
  props: {
    content: await getContent()
  }
});

const NextDebugPage: NextPage<Props> = props => {
  return (
    <DebugPage content={props.content} />
  )
};

export default NextDebugPage;