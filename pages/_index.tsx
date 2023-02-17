import { NextPage } from "next";
import IndexPage from "../components/IndexPage/IndexPage";
import { ContentInfo } from "../lib/content";
import { getContentInfo } from "../lib/content-cache";

export interface Props {
    contentInfo: ContentInfo
}

export const getStaticProps = async () => {
    const contentInfo = await getContentInfo();

    return {
      props: {
        contentInfo
      }
    }
  }

const NextIndexPage: NextPage<Props> = ({ contentInfo }) => {
    return <IndexPage contentInfo={contentInfo} />
};

export default NextIndexPage;