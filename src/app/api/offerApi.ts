import {rootApi} from "./rootApi.ts";

const offerApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        getAllOffers: build.query<OffersResponse, OffersRequest>({
            query: ({pageNumber, category, search}) => {
                let request = `/offers?pageNumber=${pageNumber}`
                if (category !== 'All products') request += `&category=${category}`
                if (search) request += `&search=${search}`
                return request
            },
        })
    }),
})

export const {useGetAllOffersQuery} = offerApi;