//Модальное окно для детальной карточки товара

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import ProductCard from './ProductCard';
import type {Offer} from '../../types/offer';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Offer | null;
}
// Модальное окно для отображения детальной информации о товаре ( передает его в ProductCard )
const ProductModal = ({ isOpen, onClose, product }: ProductModalProps) => {
    if (!product) return null;// Если продукт не передан, ничего не отображаем

// Если модальное окно закрыто, ничего не отображаем
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                                <ProductCard product={product} onClose={onClose} isModal={true} />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ProductModal;