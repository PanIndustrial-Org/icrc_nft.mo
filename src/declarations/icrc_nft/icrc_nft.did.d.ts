import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Account {
  'owner' : Principal,
  'subaccount' : [] | [Subaccount],
}
export interface Account__1 {
  'owner' : Principal,
  'subaccount' : [] | [Subaccount],
}
export interface Account__2 {
  'owner' : Principal,
  'subaccount' : [] | [Subaccount],
}
export interface Account__3 {
  'owner' : Principal,
  'subaccount' : [] | [Subaccount],
}
export type ApprovalCollectionResponse = { 'Ok' : bigint } |
  { 'Err' : ApproveCollectionError };
export interface ApprovalInfo {
  'memo' : [] | [Uint8Array | number[]],
  'from_subaccount' : [] | [Uint8Array | number[]],
  'created_at_time' : [] | [bigint],
  'expires_at' : [] | [bigint],
  'spender' : Account__2,
}
export interface ApprovalInfo__1 {
  'memo' : [] | [Uint8Array | number[]],
  'from_subaccount' : [] | [Uint8Array | number[]],
  'created_at_time' : [] | [bigint],
  'expires_at' : [] | [bigint],
  'spender' : Account__2,
}
export type ApprovalResponse = { 'Ok' : Array<ApprovalResponseItem> } |
  { 'Err' : ApproveTokensBatchError };
export interface ApprovalResponseItem {
  'token_id' : bigint,
  'approval_result' : ApprovalResult,
}
export type ApprovalResult = { 'Ok' : bigint } |
  { 'Err' : ApproveTokensError };
export type ApproveCollectionError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'Duplicate' : { 'duplicate_of' : bigint } } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'TooOld' : null };
export type ApproveTokensBatchError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'TooOld' : null };
export type ApproveTokensError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'Duplicate' : { 'duplicate_of' : bigint } } |
  { 'NonExistingTokenId' : null } |
  { 'Unauthorized' : null } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'TooOld' : null };
export interface ArchivedTransactionResponse {
  'args' : Array<TransactionRange__1>,
  'callback' : GetTransactionsFn,
}
export type BurnNFTBatchError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'Unauthorized' : null } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'TooOld' : null };
export type BurnNFTBatchResponse = { 'Ok' : Array<BurnNFTItemResponse> } |
  { 'Err' : BurnNFTBatchError };
export type BurnNFTError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'NonExistingTokenId' : null } |
  { 'InvalidBurn' : null };
export interface BurnNFTItemResponse {
  'result' : BurnNFTResult,
  'token_id' : bigint,
}
export type BurnNFTResult = { 'Ok' : bigint } |
  { 'Err' : BurnNFTError };
export interface CollectionApproval {
  'memo' : [] | [Uint8Array | number[]],
  'from_subaccount' : [] | [Uint8Array | number[]],
  'created_at_time' : [] | [bigint],
  'expires_at' : [] | [bigint],
  'spender' : Account__2,
}
export interface DataCertificate {
  'certificate' : Uint8Array | number[],
  'hash_tree' : Uint8Array | number[],
}
export interface GetArchivesArgs { 'from' : [] | [Principal] }
export type GetArchivesResult = Array<GetArchivesResultItem>;
export interface GetArchivesResultItem {
  'end' : bigint,
  'canister_id' : Principal,
  'start' : bigint,
}
export type GetTransactionsFn = ActorMethod<
  [Array<TransactionRange__1>],
  GetTransactionsResult__1
>;
export interface GetTransactionsResult {
  'log_length' : bigint,
  'blocks' : Array<{ 'id' : bigint, 'block' : Value__2 }>,
  'archived_blocks' : Array<ArchivedTransactionResponse>,
}
export interface GetTransactionsResult__1 {
  'log_length' : bigint,
  'blocks' : Array<{ 'id' : bigint, 'block' : Value__2 }>,
  'archived_blocks' : Array<ArchivedTransactionResponse>,
}
export type IndexType = { 'Stable' : null } |
  { 'StableTyped' : null } |
  { 'Managed' : null };
export type InitArgs = [] | [
  {
    'deployer' : Principal,
    'max_approvals' : [] | [bigint],
    'max_approvals_per_token_or_collection' : [] | [bigint],
    'settle_to_approvals' : [] | [bigint],
    'max_revoke_approvals' : [] | [bigint],
    'collection_approval_requires_token' : [] | [boolean],
  }
];
export type InitArgs__1 = [] | [InitArgs__2];
export interface InitArgs__2 {
  'maxRecordsToArchive' : bigint,
  'archiveIndexType' : IndexType,
  'maxArchivePages' : bigint,
  'settleToRecords' : bigint,
  'archiveCycles' : bigint,
  'maxActiveRecords' : bigint,
  'maxRecordsInArchiveInstance' : bigint,
  'archiveControllers' : [] | [[] | [Array<Principal>]],
}
export type InitArgs__3 = [] | [
  {
    'deployer' : Principal,
    'allow_transfers' : [] | [boolean],
    'supply_cap' : [] | [bigint],
    'burn_account' : [] | [Account],
    'default_take_value' : [] | [bigint],
    'logo' : [] | [string],
    'permitted_drift' : [] | [bigint],
    'name' : [] | [string],
    'description' : [] | [string],
    'max_take_value' : [] | [bigint],
    'max_update_batch_size' : [] | [bigint],
    'max_query_batch_size' : [] | [bigint],
    'max_memo_size' : [] | [bigint],
    'supported_standards' : [] | [SupportedStandards],
    'symbol' : [] | [string],
  }
];
export interface NFTCanister {
  'burn' : ActorMethod<[bigint], BurnNFTBatchResponse>,
  'get_tip' : ActorMethod<[], Tip>,
  'icrc30_approve_collection' : ActorMethod<
    [ApprovalInfo__1],
    ApprovalCollectionResponse
  >,
  'icrc30_approve_tokens' : ActorMethod<
    [Array<bigint>, ApprovalInfo__1],
    ApprovalResponse
  >,
  'icrc30_get_collection_approvals' : ActorMethod<
    [Account__3, [] | [CollectionApproval], [] | [bigint]],
    Array<CollectionApproval>
  >,
  'icrc30_get_token_approvals' : ActorMethod<
    [Array<bigint>, [] | [TokenApproval], [] | [bigint]],
    Array<TokenApproval>
  >,
  'icrc30_is_approved' : ActorMethod<
    [Account__3, [] | [Uint8Array | number[]], bigint],
    boolean
  >,
  'icrc30_max_approvals_per_token_or_collection' : ActorMethod<
    [],
    [] | [bigint]
  >,
  'icrc30_max_revoke_approvals' : ActorMethod<[], [] | [bigint]>,
  'icrc30_metadata' : ActorMethod<[], Array<[string, Value__3]>>,
  'icrc30_revoke_collection_approvals' : ActorMethod<
    [RevokeCollectionArgs],
    RevokeCollectionResponse
  >,
  'icrc30_revoke_token_approvals' : ActorMethod<
    [RevokeTokensArgs],
    RevokeTokensResponse
  >,
  'icrc30_transfer_from' : ActorMethod<
    [TransferFromArgs],
    TransferFromResponse
  >,
  'icrc3_get_archives' : ActorMethod<[GetArchivesArgs], GetArchivesResult>,
  'icrc3_get_blocks' : ActorMethod<
    [Array<TransactionRange>],
    GetTransactionsResult
  >,
  'icrc3_get_tip_certificate' : ActorMethod<[], [] | [DataCertificate]>,
  'icrc7_balance_of' : ActorMethod<[Account__1], bigint>,
  'icrc7_collection_metadata' : ActorMethod<[], Array<[string, Value__1]>>,
  'icrc7_default_take_value' : ActorMethod<[], [] | [bigint]>,
  'icrc7_description' : ActorMethod<[], [] | [string]>,
  'icrc7_logo' : ActorMethod<[], [] | [string]>,
  'icrc7_max_memo_size' : ActorMethod<[], [] | [bigint]>,
  'icrc7_max_query_batch_size' : ActorMethod<[], [] | [bigint]>,
  'icrc7_max_take_value' : ActorMethod<[], [] | [bigint]>,
  'icrc7_max_update_batch_size' : ActorMethod<[], [] | [bigint]>,
  'icrc7_name' : ActorMethod<[], string>,
  'icrc7_owner_of' : ActorMethod<[Array<bigint>], OwnerOfResponses>,
  'icrc7_supply_cap' : ActorMethod<[], [] | [bigint]>,
  'icrc7_supported_standards' : ActorMethod<[], SupportedStandards__1>,
  'icrc7_symbol' : ActorMethod<[], string>,
  'icrc7_token_metadata' : ActorMethod<
    [Array<bigint>],
    Array<{ 'token_id' : bigint, 'metadata' : NFTMap }>
  >,
  'icrc7_tokens' : ActorMethod<[[] | [bigint], [] | [bigint]], Array<bigint>>,
  'icrc7_tokens_of' : ActorMethod<
    [Account__1, [] | [bigint], [] | [bigint]],
    Array<bigint>
  >,
  'icrc7_total_supply' : ActorMethod<[], bigint>,
  'icrc7_transfer' : ActorMethod<[TransferArgs], TransferResponse>,
  'mint' : ActorMethod<[Account__1], SetNFTBatchResponse>,
}
export type NFTMap = Array<[string, Value]>;
export interface OwnerOfResponse {
  'token_id' : bigint,
  'account' : [] | [Account],
}
export type OwnerOfResponses = Array<OwnerOfResponse>;
export interface RevokeCollectionArgs {
  'memo' : [] | [Uint8Array | number[]],
  'from_subaccount' : [] | [Uint8Array | number[]],
  'created_at_time' : [] | [bigint],
  'spender' : [] | [Account__2],
}
export type RevokeCollectionBatchError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'TooOld' : null };
export type RevokeCollectionResponse = {
    'Ok' : Array<RevokeCollectionResponseItem>
  } |
  { 'Err' : RevokeCollectionBatchError };
export interface RevokeCollectionResponseItem {
  'spender' : [] | [Account__2],
  'revoke_result' : RevokeTokensResult,
}
export interface RevokeTokensArgs {
  'memo' : [] | [Uint8Array | number[]],
  'from_subaccount' : [] | [Uint8Array | number[]],
  'token_ids' : Array<bigint>,
  'created_at_time' : [] | [bigint],
  'spender' : [] | [Account__2],
}
export type RevokeTokensBatchError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'TooOld' : null };
export type RevokeTokensError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'Duplicate' : { 'duplicate_of' : bigint } } |
  { 'NonExistingTokenId' : null } |
  { 'Unauthorized' : null } |
  { 'ApprovalDoesNotExist' : null };
export type RevokeTokensResponse = { 'Ok' : Array<RevokeTokensResponseItem> } |
  { 'Err' : RevokeTokensBatchError };
export interface RevokeTokensResponseItem {
  'token_id' : bigint,
  'spender' : [] | [Account__2],
  'revoke_result' : RevokeTokensResult,
}
export type RevokeTokensResult = { 'Ok' : bigint } |
  { 'Err' : RevokeTokensError };
export type SetNFTBatchError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'TooOld' : null };
export type SetNFTBatchResponse = { 'Ok' : Array<SetNFTItemResponse> } |
  { 'Err' : SetNFTBatchError };
export type SetNFTError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'TokenExists' : null } |
  { 'NonExistingTokenId' : null };
export interface SetNFTItemResponse {
  'result' : SetNFTResult,
  'token_id' : bigint,
}
export type SetNFTResult = { 'Ok' : bigint } |
  { 'Err' : SetNFTError } |
  { 'GenericError' : { 'message' : string, 'error_code' : bigint } };
export type Subaccount = Uint8Array | number[];
export type SupportedStandards = Array<{ 'url' : string, 'name' : string }>;
export type SupportedStandards__1 = Array<{ 'url' : string, 'name' : string }>;
export interface Tip {
  'last_block_index' : Uint8Array | number[],
  'hash_tree' : Uint8Array | number[],
  'last_block_hash' : Uint8Array | number[],
}
export interface TokenApproval {
  'token_id' : bigint,
  'approval_info' : ApprovalInfo,
}
export interface TransactionRange { 'start' : bigint, 'length' : bigint }
export interface TransactionRange__1 { 'start' : bigint, 'length' : bigint }
export interface TransferArgs {
  'to' : Account,
  'memo' : [] | [Uint8Array | number[]],
  'subaccount' : [] | [Uint8Array | number[]],
  'token_ids' : Array<bigint>,
  'created_at_time' : [] | [bigint],
}
export type TransferBatchError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'InvalidRecipient' : null } |
  { 'TooOld' : null };
export type TransferError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'Duplicate' : { 'duplicate_of' : bigint } } |
  { 'NonExistingTokenId' : null } |
  { 'Unauthorized' : null };
export interface TransferFromArgs {
  'to' : Account__2,
  'spender_subaccount' : [] | [Uint8Array | number[]],
  'from' : Account__2,
  'memo' : [] | [Uint8Array | number[]],
  'token_ids' : Array<bigint>,
  'created_at_time' : [] | [bigint],
}
export type TransferFromBatchError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'InvalidRecipient' : null } |
  { 'TooOld' : null };
export type TransferFromError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'Duplicate' : { 'duplicate_of' : bigint } } |
  { 'NonExistingTokenId' : null } |
  { 'Unauthorized' : null };
export type TransferFromResponse = { 'Ok' : Array<TransferFromResponseItem> } |
  { 'Err' : TransferFromBatchError };
export interface TransferFromResponseItem {
  'token_id' : bigint,
  'transfer_result' : { 'Ok' : bigint } |
    { 'Err' : TransferFromError },
}
export type TransferResponse = { 'Ok' : Array<TransferResponseItem> } |
  { 'Err' : TransferBatchError };
export interface TransferResponseItem {
  'token_id' : bigint,
  'transfer_result' : { 'Ok' : bigint } |
    { 'Err' : TransferError },
}
export type Value = { 'Int' : bigint } |
  { 'Map' : Array<[string, Value]> } |
  { 'Nat' : bigint } |
  { 'Blob' : Uint8Array | number[] } |
  { 'Text' : string } |
  { 'Array' : Array<Value> };
export type Value__1 = { 'Int' : bigint } |
  { 'Map' : Array<[string, Value]> } |
  { 'Nat' : bigint } |
  { 'Blob' : Uint8Array | number[] } |
  { 'Text' : string } |
  { 'Array' : Array<Value> };
export type Value__2 = { 'Int' : bigint } |
  { 'Map' : Array<[string, Value__2]> } |
  { 'Nat' : bigint } |
  { 'Blob' : Uint8Array | number[] } |
  { 'Text' : string } |
  { 'Array' : Array<Value__2> };
export type Value__3 = { 'Int' : bigint } |
  { 'Map' : Array<[string, Value]> } |
  { 'Nat' : bigint } |
  { 'Blob' : Uint8Array | number[] } |
  { 'Text' : string } |
  { 'Array' : Array<Value> };
export interface _SERVICE extends NFTCanister {}
