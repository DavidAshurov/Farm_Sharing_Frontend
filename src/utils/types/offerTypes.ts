export interface Offer {
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

export interface OffersResponse {
    offers: Offer[],
    pageNumber: number,
    pageSize: number,
    numberOfElements: number,
    totalPages: number,
    totalElements: number,
}

export interface OffersRequest {
    pageNumber: number,
    pageSize: number,
    category: 'All products' | 'Vegetables' | 'Fruits' | 'Herbs' | 'Dairy' | 'Pantry',
    search: string,
    sortField: 'title' | 'price',
    sortDirection: 'asc' | 'desc',
    minPrice: number,
    maxPrice: number,
}

export interface NewOfferDto {
    category: string,
    title: string,
    description?: string,
    amount: number,
    price: number,
    units: string,
    imageTmpKey?: string,
}

interface Farm {
    nickname: string,
    city: string,
    rating: number,
}