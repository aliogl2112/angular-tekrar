export class AuthErrorHandler{
    public static errorHandler(error:string):string{
        let errorMessage="";
        switch (error) {
            case "EMAIL_EXISTS":
                errorMessage="Bu e-mail adresi zaten kullanılıyor."
                break;
            case "OPERATION_NOT_ALLOWED":
                errorMessage="Bu hizmet şu anda kullanılamıyor."
                break;
            case "TOO_MANY_ATTEMPTS_TRY_LATER":
                errorMessage="Çok fazla deneme yapıldı. Lütfen daha sonra tekrar deneyin."
                break;
            case "INVALID_LOGIN_CREDENTIALS":
                errorMessage="E-Posta veya şifre bilgisi yanlış."
                break;
            case "EMAIL_NOT_FOUND":
                errorMessage="Böyle bir hesap bulunamadı."
                break;
            case "INVALID_PASSWORD":
                errorMessage="Lütfen parolayı doğru girdiğinizden emin olun."
                break;
            case "USER_DISABLED":
                errorMessage="Bu kullanıcı, sistem yöneticisi tarafından devre dışı bırakıldı."
                break;
        }
        return errorMessage;
    }
}