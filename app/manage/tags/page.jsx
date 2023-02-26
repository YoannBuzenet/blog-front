import BackOfficeLayout from "../../../components/back_office/layouts/BackOfficeLayout";
import TagEditor from "../../../components/back_office/tags/TagEditor";
import TagStateContainer from "../../../components/back_office/tags/TagStateContainer";
import { getAllTags } from "../../../services/api/tag";
import style from "./tags.module.scss";

export default async function AllTagsPage({ params }) {
  // State will have to be shared between both compo, so must be instanciated in a state container

  const tags = await getAllTags();

  console.log("tags", tags);
  return (
    <BackOfficeLayout>
      <div className={style.container}>
        <TagStateContainer tags={tags} />
      </div>
    </BackOfficeLayout>
  );
}
