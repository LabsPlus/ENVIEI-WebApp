import { IButton } from "./button.interfaces";

export default interface IHeader {
    image: any;
    home: string;
    resource: string;
    developers: string;
    contact: string;
    sign: string;
    buttons: IButton[];
}