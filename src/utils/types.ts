interface Offer {
    id: number,
    category: string,
    title: string,
    description: string,
    amount: number,
    price: number,
    farm: Farm,
    units: string,
    image: string,
}

interface OffersResponse {
    offers: Offer[],
    pageNumber: number,
    pageSize: number,
    numberOfElements: number,
    totalPages: number,
    totalElements: number,
}

interface OffersRequest {
    pageNumber: number,
    category: 'All products' | 'Vegetables' | 'Fruits' | 'Herbs' | 'Dairy' | 'Pantry',
    search: string,
    sortField: 'title' | 'price',
    sortDirection: 'asc' | 'desc',
    minPrice:number,
    maxPrice:number,
}

interface CartItem {
    id: number,
    offer: Offer,
    quantity: number,
}

interface Farm {
    nickname: string,
    city: string,
    rating: number,
}

interface User {
    nickname: string,
    phoneNumber: string,
    city: string,
    address: string,
    email: string,
    role: string,
    rating: number,
}

interface NewUserDto {
    role: string,
    nickname: string,
    email: string,
    password: string,
    phoneNumber: string | null,
}

interface UpdateUserDto {
    nickname: string,
    phoneNumber: string | null,
    email: string,
    city: string | null,
    address: string | null,
}

interface Credentials {
    email: string,
    password: string,
}

interface AuthState {
    accessToken: string | null,
    user: User | null,
}