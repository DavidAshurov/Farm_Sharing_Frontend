import type {Dispatch, SetStateAction} from "react";
import {useEffect, useState} from "react";
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {categories, unitTypes} from "../../../utils/constants.ts";
import type {NewOfferDto, Offer} from "../../../utils/types/offerTypes.ts";
import {useCreateOfferMutation, useUpdateOfferMutation} from "../../../app/api/offerApi.ts";
import type {imageUploaderState} from "../../../utils/types/types.ts";
import {getChangedFields} from "../../../utils/utilFunctions.ts";
import {useSnackBar} from "../../../shared/SnackBar.tsx";

import {useFileUpload} from "../../../utils/hooks.ts";
import ImageUploader from "../../../shared/ImageUploader.tsx";

interface Props {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    triggerScrollToBottom: () => void | null,
    existingOffer: Offer | null,
}

const initialState = {
    title: "",
    category: "Vegetables",
    description: "",
    amount: 0,
    price: "",
    units: "kg",
}

const EditOfferDialog = ({open, setOpen, triggerScrollToBottom, existingOffer}: Props) => {
    const [createOffer] = useCreateOfferMutation()
    const [updateOffer] = useUpdateOfferMutation()
    const {uploadFile} = useFileUpload()
    const {showSnackBar} = useSnackBar()
    const [offerData, setOfferData] = useState(initialState)
    const [imageState, setImageState] = useState<imageUploaderState>({type: 'unchanged'})
    const [alertOpen, setAlertOpen] = useState(false)
    const [showLoading, setShowLoading] = useState(false)

    const [completionErrors, setCompletionErrors] = useState({
        title: '',
        amount: '',
        price: '',
    })

    useEffect(() => {
        if (open) {
            if (existingOffer) {
                setOfferData({
                    amount: existingOffer.amount,
                    category: existingOffer.category,
                    description: existingOffer.description,
                    price: existingOffer.price.toString(),
                    title: existingOffer.title,
                    units: existingOffer.units,
                })
            }
        }
    }, [existingOffer, open]);

    const handleCLose = () => {
        setOpen(false)
        setOfferData(initialState)
        setImageState({type: 'unchanged'})
        setCompletionErrors({title: '', amount: '', price: ''})
    }

    const handleConfirmClick = async () => {
        const newErrors = {
            title: offerData.title ? '' : 'This field is required',
            amount: offerData.amount ? '' : 'This field is required',
            price: !offerData.price
                ? 'This field is required'
                : isNaN(parseFloat(offerData.price)) ? 'Incorrect value' : '',
        }
        setCompletionErrors(newErrors)
        if (newErrors.title || newErrors.amount || newErrors.price) return
        const isDescriptionEmpty = !offerData.description.trim()
        const isImageEmpty = !existingOffer?.image && imageState.type !== 'new' || imageState.type === 'removed'
        if (isDescriptionEmpty || isImageEmpty) {
            setAlertOpen(true)
            return
        }
        await saveOffer()
    }

    const saveOffer = async () => {
        try {
            setShowLoading(true)
            let finalOfferData: Partial<NewOfferDto>
            if (existingOffer) {
                const changedFields = getChangedFields(existingOffer, {
                    ...offerData,
                    price: parseFloat(offerData.price)
                })
                finalOfferData = {...changedFields}
            } else {
                finalOfferData = {...offerData, price: parseFloat(offerData.price)}
            }
            if (imageState.type === 'new') {
                finalOfferData.imageTmpKey = await uploadFile(imageState.file, 'productImages')
            }
            if (imageState.type === 'removed') finalOfferData.imageTmpKey = ''
            if (Object.keys(finalOfferData).length === 0) {
                showSnackBar('Nothing changed', 'info', 5000)
                return
            }
            if (existingOffer) {
                await updateOffer({id: existingOffer.id, dto: finalOfferData}).unwrap()
            } else {
                await createOffer(finalOfferData).unwrap()
            }
            if (!existingOffer) {
                triggerScrollToBottom()
            }
        } catch (err) {
            console.log(err)
        } finally {
            setShowLoading(false)
            handleCLose()
        }
    }

    return (
        <>
            <Dialog open={open} onClose={handleCLose} maxWidth={'70%'}>
                <DialogTitle fontWeight={"bold"}>
                    Complete product details
                    <IconButton
                        onClick={handleCLose}
                        sx={{
                            position: 'absolute',
                            right: 3,
                            top: 3,
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{
                    display: 'flex',
                    gap: '1rem',
                    overflow: 'visible',
                }}>
                    <Box sx={{
                        width: '25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}>
                        <TextField
                            label={'Product title'}
                            placeholder={'Ex. Organic tomatoes'}
                            error={!!completionErrors.title}
                            helperText={completionErrors.title}
                            value={offerData.title}
                            onChange={(e) => {
                                if (completionErrors.title) {
                                    setCompletionErrors(prev => ({...prev, title: ''}))
                                }
                                setOfferData(prev => ({...prev, title: e.target.value}))
                            }}
                        />
                        <TextField
                            multiline
                            label={'Description'}
                            placeholder={'Tell about your product'}
                            value={offerData.description}
                            onChange={(e) => setOfferData(prev => ({...prev, description: e.target.value}))}
                        />

                        <Box display="flex">
                            <TextField
                                label="Stock"
                                placeholder={'How many units do you have available?'}
                                value={offerData.amount || ''}
                                error={!!completionErrors.amount}
                                helperText={completionErrors.amount}
                                onChange={(e) => {
                                    const value = e.target.value
                                    if (value === '' || /^\d*$/.test(value)) {
                                        if (completionErrors.amount) {
                                            setCompletionErrors(prev => ({...prev, amount: ''}))
                                        }
                                        setOfferData(prev => ({...prev, amount: +value}))
                                    }
                                }}
                                sx={{
                                    flex: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0,
                                    },
                                }}
                                slotProps={{
                                    htmlInput: {
                                        min: 0,
                                        step: 1,
                                    }
                                }}
                            />
                            <FormControl
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                    },
                                }}
                            >
                                <Select
                                    value={offerData.units}
                                    onChange={(e) =>
                                        setOfferData(prev => ({
                                            ...prev,
                                            units: e.target.value as string
                                        }))
                                    }
                                >
                                    {unitTypes.map(type => (
                                        <MenuItem key={type} value={type}>{type}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <TextField
                                error={!!completionErrors.price}
                                helperText={completionErrors.price}
                                value={offerData.price}
                                onChange={(e) => {
                                    const value = e.target.value.replace(',', '.')
                                    if (/^\d*[.,]?\d*$/.test(value)) {
                                        if (completionErrors.price) {
                                            setCompletionErrors(prev => ({...prev, price: ''}))
                                        }
                                        setOfferData(prev => ({...prev, price: value}))
                                    }
                                }}
                                label={'Price per unit (₪)'}
                                placeholder={'0.0'}
                                sx={{width: '49%'}}
                            />
                            <FormControl sx={{width: '49%'}}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    label={'Category'}
                                    value={offerData.category}
                                    onChange={(e) => setOfferData(prev => ({
                                        ...prev,
                                        category: e.target.value as string
                                    }))}>
                                    {categories.filter(cat => cat !== 'All products')
                                        .map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: '15rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <ImageUploader
                            currentImage={existingOffer?.image || null}
                            imageState={imageState}
                            setImageState={setImageState}
                            variant="product"
                        />
                        <Button className={'green-button'}
                                disabled={showLoading}
                                onClick={handleConfirmClick}>
                            Confirm
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

            <Dialog open={alertOpen} onClose={() => setAlertOpen(false)}>
                <DialogTitle>Save product without full details?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Some optional fields are empty:
                        <ul>
                            {!offerData.description.trim() && <li>Description is empty</li>}
                            {(!existingOffer?.image && imageState.type !== 'new' || imageState.type === 'removed')
                                && <li>No image uploaded</li>}
                        </ul>
                        We don't recommend you to place product on the market without these details.
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={() => setAlertOpen(false)} variant={'contained'}>
                            Cancel
                        </Button>
                        <Button variant={'contained'} color={'warning'}
                                onClick={async () => {
                                    setAlertOpen(false)
                                    await saveOffer()
                                }}>
                            Save anyway
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <Backdrop
                sx={(theme) => ({color: '#fff', zIndex: theme.zIndex.modal + 1})}
                open={showLoading}
            >
                <CircularProgress color="secondary"/>
            </Backdrop>
        </>
    );
};

export default EditOfferDialog;