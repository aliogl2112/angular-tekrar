export class User{
    constructor(
        public id:string,
        public email:string,
        private _token:any,
        private _tokenExpirationDate:Date
    ){}

    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)
            return null;
        else
            return this._token
    }
}