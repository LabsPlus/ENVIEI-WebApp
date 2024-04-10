export interface IInput {
  image?: any;
  type?: string;
  placeholder?: string;
  text?: string;
  value?: string;
  id?: string;
  name?: string;
  class?: string;
  required?: boolean;
  disabled?: boolean;
  inputName?: string;
  error?: any;
  mask?: any;
  textMask?: string;
  onChange?: (value: string) => void;
  onTouched?: () => void;
}
