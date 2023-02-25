import BackOfficeLayout from "../../../components/back_office/layouts/BackOfficeLayout";
import SubLayoutRight from "../../../components/back_office/layouts/SubLayoutRight";

export default async function AllTagsPage({ params }) {
  // State will have to be shared between both compo, so must be instanciated here

  const tags = await getAllTags();

  return (
    <BackOfficeLayout>
      <p>LES TAAAAGS</p>
      <SubLayoutRight CompoToRender={() => <p>OK</p>} />
    </BackOfficeLayout>
  );
}
