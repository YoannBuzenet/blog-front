import SearchPost from "../../../components/posts/Search/SearchPost";
import { headers } from "next/headers";
import { getAllPostTags } from "../../../services/api/tag";
import { getLangFromHeaders } from "../../../services/i18n";

export default async function PostSearch({ params }) {
  const localeBrowser = getLangFromHeaders(headers);

  const tagsLangBrower = await getAllPostTags(localeBrowser);

  return (
    <div className="searchPage">
      <SearchPost initialTags={tagsLangBrower} localeBrowser={localeBrowser} />
    </div>
  );
}
