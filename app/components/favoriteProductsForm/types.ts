export interface IFavoriteProductsForm {
  title: string;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  description: string;
  onDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  buttons: React.ReactNode;
  onSubmit: () => void | Promise<void>;
  isTitleDisable?: boolean;
  isDescriptionDisable?: boolean;
}
