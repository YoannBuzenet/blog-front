import SearchPost from "../../../components/posts/Search/SearchPost";
import { headers } from "next/headers";
import { getAllPostTags } from "../../../services/api/tag";

export default async function PostSearch({ params }) {
  const localeBrowser = getLangFromHeaders(headers);

  const tagsLangBrower = await getAllPostTags(localeBrowser);

  return (
    <>
      <SearchPost initialTags={tagsLangBrower} />
    </>
  );
}
