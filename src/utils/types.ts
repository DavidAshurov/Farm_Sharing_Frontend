interface Offer {
    id:number,
    category:string,
    title:string,
    description:string,
    amount:number,
    price:number,
    farm:Farm,
    units:string,
    image:string,
}

interface Farm {
    nickname:string,
    city:string,
    rating:number,
}
interface User {
    id:number,
    nickname:string,
    phoneNumber:string,
    city:string,
    address:string,
    email:string,
    role:string,
    rating:number,
}

interface Credentials {
    email:string,
    password:string,
}

interface AuthState {
    accessToken:string | null,
    user:User | null,
}