export const tinyApiKey = (): string => {
  return "0dkyauj6v5bv9jj6qu3mhyp2svuxcxkw9hh5r0uobewgj39a";
};

export const tinyInit = (): Record<string, unknown> => {
  return {
    skin: "oxide-dark",
    content_css: "dark",
    height: 300,
    menubar: false,
    statusbar: false,
    plugins: [
      "advlist autolink lists advlist link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table paste code help wordcount emoticons",
    ],
    toolbar:
      "undo redo | formatselect | fontsizeselect | code visualblocks searchreplace | bold italic backcolor | \
      table numlist bullist emoticons insertdatetime charmap | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | anchor link unlink | fullscreen | preview counter",
    language: "fa",
    content_style:
      "\
        body { font-family: IRANSansWeb; font-weight: 300; background-color: #12122c; } \
        h1, h2, h3, h4, h5, h6, input, textarea, span, p, div, .tox-button, button { font-family: IRANSansWeb !important; } \
        .tox-statusbar__branding { display: none } \
      ",
  };
};
