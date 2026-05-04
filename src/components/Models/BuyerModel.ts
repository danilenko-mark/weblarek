import { IBuyer, TPayment, TFormErrors } from '../../types';

export class BuyerModel {
    protected payment: IBuyer['payment'] | null = null;
    protected email: string = '';
    protected phone: string = '';
    protected address: string = '';

    setData(data: Partial<IBuyer>): void {
        if (data.payment !== undefined) this.payment = data.payment;
        if (data.email !== undefined) this.email = data.email;
        if (data.phone !== undefined) this.phone = data.phone;
        if (data.address !== undefined) this.address = data.address;
    }

    getData(): IBuyer {
        return {
            payment: this.payment as TPayment,
            email: this.email,
            phone: this.phone,
            address: this.address,
        };
    }

    clear(): void {
        this.payment = null;
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    validate(): TFormErrors {
        const errors: TFormErrors = {};

        if (this.payment === null) {
            errors.payment = 'Не выбран способ оплаты';
        }

        if (!this.email) {
            errors.email = 'Укажите email';
        }

        if (!this.phone) {
            errors.phone = 'Укажите телефон';
        }

        if (!this.address) {
            errors.address = 'Укажите адрес';
        }

        return errors;
    }
}