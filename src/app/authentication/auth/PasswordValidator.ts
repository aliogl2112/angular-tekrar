export class PasswordValidator {

    private static hasUpperCase(password: string): boolean {
        return /[A-Z]/.test(password);
    }

    private static hasLowerCase(password: string): boolean {
        return /[a-z]/.test(password);
    }

    private static hasNumber(password: string): boolean {
        return /[0-9]/.test(password);
    }

    private static hasSpecialCharacter(password: string): boolean {
        return /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
    }

    public static checkPasswordStrength(password: string): string {
        if (
            this.hasUpperCase(password) &&
            this.hasLowerCase(password) &&
            this.hasSpecialCharacter(password)&&
            this.hasNumber(password)
        ) {
            return "";
        } else {
            return this.generateErrorMessage(password);
        }
    }

    private static generateErrorMessage(password:string): string {
        if(this.hasUpperCase(password) && this.hasLowerCase(password) && this.hasSpecialCharacter(password) && this.hasNumber(password))
            return "";
        else
            return "Parola en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir."
    }
}