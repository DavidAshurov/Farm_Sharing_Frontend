import {rootApi} from "./rootApi.ts";

const offerApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        getAllOffers: build.query<OffersResponse, OffersRequest>({
            query: ({pageNumber, category, search, sortField, sortDirection}) => {
                let request = `/offers?pageNumber=${pageNumber}`
                if (category !== 'All products') request += `&category=${category}`
                if (search) request += `&search=${search}`
                request += `&sortDirection=${sortDirection}`
                request += `&sortField=${sortField}`
                return request
            },
        })
    }),
})

export const {useGetAllOffersQuery} = offerApi;