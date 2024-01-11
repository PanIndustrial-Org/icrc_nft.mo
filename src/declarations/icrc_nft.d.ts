import { IDL } from '@dfinity/candid';

export declare const idlFactory: IDL.InterfaceFactory;
export { _SERVICE } from './icrc_nft/icrc_nft.did.ts';
export declare const init: (args: { IDL: IDL }) => IDL.Type<any>[];