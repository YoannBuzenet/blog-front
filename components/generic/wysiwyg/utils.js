const createEmptyField = () => {
  return [
    {
      type: "paragraph",
      align: "center",
      children: [{ text: "" }],
    },
  ];
};

const createBlankPage = () => ({
  id: "Aucun",
  content: createEmptyField(),
  title: createEmptyField(),
  metaDescription: createEmptyField(),
  shortDescription: createEmptyField(),
  mainImageUrl: createEmptyField(),
});

module.exports = { createEmptyField, createBlankPage };
