export default interface UserDropDown {

    name: string;
    profilePhoto: any;
    buttons: Array<{
        title: string;
        icon: string;
        action: string;
    }>;
}