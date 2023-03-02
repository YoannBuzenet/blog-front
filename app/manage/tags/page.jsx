import BackOfficeLayout from "../../../components/back_office/layouts/BackOfficeLayout";
import TagStateContainer from "../../../components/back_office/tags/TagStateContainer";
import { getAllTags } from "../../../services/api/tag";
import style from "./tags.module.scss";

export default async function AllTagsPage({ params }) {
  const tags = await getAllTags();

  return (
    <BackOfficeLayout>
      <div className={style.container}>
        <TagStateContainer tags={tags} />
      </div>
    </BackOfficeLayout>
  );
}
