import {rootApi} from "./rootApi.ts";
import type {NewOfferDto, Offer, OffersRequest, OffersResponse} from "../../utils/types/offerTypes.ts";

const offerApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        getAllOffers: build.query<OffersResponse, OffersRequest>({
            query: ({pageNumber, pageSize, category, search, sortField, sortDirection, minPrice, maxPrice}) => {
                let request = `/offers?pageNumber=${pageNumber}`
                if (pageSize) request += `&pageSize=${pageSize}`
                if (category !== 'All products') request += `&category=${category}`
                if (search) request += `&search=${search}`
                if (sortDirection) request += `&sortDirection=${sortDirection}`
                if (sortField) request += `&sortField=${sortField}`
                if (minPrice) {
                    request += `&minPrice=${minPrice}&maxPrice=${maxPrice}`
                }
                return request
            },
            providesTags: ['Offers'],
        }),
        getMyOffers: build.query<OffersResponse,{pageNumber: number, pageSize: number}>({
            query: ({pageNumber, pageSize}) => `/offers/my?pageNumber=${pageNumber}&pageSize=${pageSize}`,
            providesTags: ['MyOffers'],
        }),
        createOffer: build.mutation<boolean,NewOfferDto>({
            query: (offer) => ({
                method: 'POST',
                url: '/offers',
                body: offer,
            }),
            invalidatesTags: ['Offers','MyOffers'],
        }),
        updateOffer: build.mutation<Offer, {id:number, dto:NewOfferDto}>({
            query: ({id, dto}) => ({
                method: 'PATCH',
                url: `/offers/${id}`,
                body: dto,
            }),
            invalidatesTags: ['Offers','MyOffers'],
        }),
        deleteOffer: build.mutation<boolean,number>({
            query: (id) => ({
                method: 'DELETE',
                url: `/offers/${id}`
            }),
            invalidatesTags: ['Offers','MyOffers'],
        }),
        getMinMaxPrice: build.query<{ min: number, max: number }, null>({
            query: () => '/offers/min-max-price'
        })
    }),
})

export const {
    useGetAllOffersQuery,
    useGetMyOffersQuery,
    useCreateOfferMutation,
    useUpdateOfferMutation,
    useDeleteOfferMutation,
    useGetMinMaxPriceQuery,
} = offerApi;