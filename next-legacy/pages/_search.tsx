import { NextPage } from "next";
import { useRouter } from "next/router";
import SearchPage from "../components/SearchPage/SearchPage";
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

const NextSearchPage: NextPage<Props> = ({ contentInfo }) => {
    const router = useRouter();
    const query = router.query.query as string || "";
    return <SearchPage contentInfo={contentInfo} initialQuery={query} />
};

export default NextSearchPage;