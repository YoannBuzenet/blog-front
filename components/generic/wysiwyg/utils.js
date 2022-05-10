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
  content: createEmptyField(),
  title: createEmptyField(),
  metaDescription: createEmptyField(),
  shortDescription: createEmptyField(),
});

module.exports = { createEmptyField, createBlankPage };
