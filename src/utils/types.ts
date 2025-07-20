interface Offer {
    category:string,
    title:string,
    description:string,
    amount:number,
    price:number,
    units:string,
    farm:Farm,
    image:string,
}

interface Farm {
    name:string,
    city:string,
    rating:number,
}