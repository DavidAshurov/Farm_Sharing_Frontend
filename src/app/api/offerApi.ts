import {rootApi} from "./rootApi.ts";

const offerApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        getAllOffers: build.query<Offer[], void>({
            query: () => `/offers`,
            keepUnusedDataFor:3,
        })
    }),
})

export const {useGetAllOffersQuery} = offerApi;