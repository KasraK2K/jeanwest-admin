export type FormRefs = Vue & {
  validate: () => boolean;
  resetValidation: () => void;
};
