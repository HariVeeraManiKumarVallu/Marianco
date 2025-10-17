import React from 'react';
export const Elements = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const ElementsConsumer = ({ children }: any) => children({ elements: null, stripe: null });
export const useStripe = () => null as any;
export const useElements = () => null as any;
export const CardElement = (p: any) => <div {...p} />;
export const PaymentElement = (p: any) => <div {...p} />;
export const AddressElement = (p: any) => <div {...p} />;
export default { Elements, ElementsConsumer, useStripe, useElements, CardElement, PaymentElement, AddressElement };