export interface IContactForm {
    name: string;
    email: string;
    message: string;
}

export interface ISendContact {
    form: IContactForm;
    subject: string;
}
