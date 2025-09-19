import {rootApi} from "./rootApi.ts";

const offerApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        getAllOffers: build.query<OffersResponse, OffersRequest>({
            query: ({pageNumber, category, search, sortField, sortDirection, minPrice, maxPrice}) => {
                let request = `/offers?pageNumber=${pageNumber}`
                if (category !== 'All products') request += `&category=${category}`
                if (search) request += `&search=${search}`
                request += `&sortDirection=${sortDirection}`
                request += `&sortField=${sortField}`
                if (minPrice) {
                    request += `&minPrice=${minPrice}&maxPrice=${maxPrice}`
                }
                return request
            },
        }),
        getMinMaxPrice: build.query<{ min: number, max: number }, null>({
            query: () => '/offers/min-max-price'
        })
    }),
})

export const {
    useGetAllOffersQuery,
    useGetMinMaxPriceQuery,
} = offerApi;