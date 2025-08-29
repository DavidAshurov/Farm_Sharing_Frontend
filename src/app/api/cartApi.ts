import {rootApi} from "./rootApi.ts";
import CartItem from "../../components/cart/CartItem.tsx";

const cartApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        getCart: build.query<CartItem[],void>({
            query: () => `/cart`,
            providesTags: [{type: 'Cart', id: 'CURRENT'}],
        }),
        addItemToCart: build.mutation<boolean,{offerId:number,quantity:number}>({
            query: ({offerId,quantity}) => ({
                url: `/cart/items`,
                method: 'POST',
                body: {offerId,quantity},
            }),
            async onQueryStarted({offerId}, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    cartApi.util.updateQueryData('getCart',undefined, (cachedCart) => {
                        if (!cachedCart.some(item => item.offer.id === offerId)) {
                            cachedCart.push({id:0,quantity:0,offer:{title:'',price:0,amount:0}})
                        }
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            invalidatesTags: [{type: 'Cart', id: 'CURRENT'}],
        }),
        removeItemFromCart: build.mutation<boolean,number>({
            query: (id) => ({
                url: `/cart/items/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    cartApi.util.updateQueryData('getCart',undefined, (cachedCart:CartItem[]) => {
                        const idx = cachedCart.findIndex(item => item.id === id)
                        if (idx !== -1) {
                            cachedCart.splice(idx,1)
                        }
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),
        changeItemQuantity: build.mutation<boolean,{id:number,quantity:number}>({
            query: ({id,quantity}) => ({
                url: `/cart/items/${id}`,
                method: 'PUT',
                body: {quantity},
            }),
            async onQueryStarted({id,quantity}, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    cartApi.util.updateQueryData('getCart',undefined, (cachedCart:CartItem[]) => {
                        cachedCart.find(item => item.id === id).quantity = quantity
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),
        clearCart: build.mutation<boolean,void>({
            query: () => ({
                url: `/cart`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    cartApi.util.updateQueryData('getCart',undefined, (cachedCart:CartItem[]) => {
                        cachedCart.length = 0
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        })
    }),
})

export const {
    useGetCartQuery,
    useAddItemToCartMutation,
    useRemoveItemFromCartMutation,
    useChangeItemQuantityMutation,
    useClearCartMutation,
} = cartApi