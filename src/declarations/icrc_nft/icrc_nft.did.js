export const idlFactory = ({ IDL }) => {
  const ArchivedTransactionResponse = IDL.Rec();
  const Value = IDL.Rec();
  const Value__2 = IDL.Rec();
  const IndexType = IDL.Variant({
    'Stable' : IDL.Null,
    'StableTyped' : IDL.Null,
    'Managed' : IDL.Null,
  });
  const InitArgs__2 = IDL.Record({
    'maxRecordsToArchive' : IDL.Nat,
    'archiveIndexType' : IndexType,
    'maxArchivePages' : IDL.Nat,
    'settleToRecords' : IDL.Nat,
    'archiveCycles' : IDL.Nat,
    'maxActiveRecords' : IDL.Nat,
    'maxRecordsInArchiveInstance' : IDL.Nat,
    'archiveControllers' : IDL.Opt(IDL.Opt(IDL.Vec(IDL.Principal))),
  });
  const InitArgs__1 = IDL.Opt(InitArgs__2);
  const InitArgs = IDL.Opt(
    IDL.Record({
      'deployer' : IDL.Principal,
      'max_approvals' : IDL.Opt(IDL.Nat),
      'max_approvals_per_token_or_collection' : IDL.Opt(IDL.Nat),
      'settle_to_approvals' : IDL.Opt(IDL.Nat),
      'max_revoke_approvals' : IDL.Opt(IDL.Nat),
      'collection_approval_requires_token' : IDL.Opt(IDL.Bool),
    })
  );
  const Subaccount = IDL.Vec(IDL.Nat8);
  const Account = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(Subaccount),
  });
  const SupportedStandards = IDL.Vec(
    IDL.Record({ 'url' : IDL.Text, 'name' : IDL.Text })
  );
  const InitArgs__3 = IDL.Opt(
    IDL.Record({
      'deployer' : IDL.Principal,
      'allow_transfers' : IDL.Opt(IDL.Bool),
      'supply_cap' : IDL.Opt(IDL.Nat),
      'burn_account' : IDL.Opt(Account),
      'default_take_value' : IDL.Opt(IDL.Nat),
      'logo' : IDL.Opt(IDL.Text),
      'permitted_drift' : IDL.Opt(IDL.Nat),
      'name' : IDL.Opt(IDL.Text),
      'description' : IDL.Opt(IDL.Text),
      'max_take_value' : IDL.Opt(IDL.Nat),
      'max_update_batch_size' : IDL.Opt(IDL.Nat),
      'max_query_batch_size' : IDL.Opt(IDL.Nat),
      'max_memo_size' : IDL.Opt(IDL.Nat),
      'supported_standards' : IDL.Opt(SupportedStandards),
      'symbol' : IDL.Opt(IDL.Text),
    })
  );
  const BurnNFTRequest = IDL.Record({
    'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'tokens' : IDL.Vec(IDL.Nat),
    'created_at_time' : IDL.Opt(IDL.Nat64),
  });
  const BurnNFTError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'NonExistingTokenId' : IDL.Null,
    'InvalidBurn' : IDL.Null,
  });
  const BurnNFTResult = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : BurnNFTError });
  const BurnNFTItemResponse = IDL.Record({
    'result' : BurnNFTResult,
    'token_id' : IDL.Nat,
  });
  const BurnNFTBatchError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'Unauthorized' : IDL.Null,
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : IDL.Nat64 }),
    'TooOld' : IDL.Null,
  });
  const BurnNFTBatchResponse = IDL.Variant({
    'Ok' : IDL.Vec(BurnNFTItemResponse),
    'Err' : BurnNFTBatchError,
  });
  const Tip = IDL.Record({
    'last_block_index' : IDL.Vec(IDL.Nat8),
    'hash_tree' : IDL.Vec(IDL.Nat8),
    'last_block_hash' : IDL.Vec(IDL.Nat8),
  });
  const Account__2 = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(Subaccount),
  });
  const ApprovalInfo__1 = IDL.Record({
    'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'from_subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'created_at_time' : IDL.Opt(IDL.Nat64),
    'expires_at' : IDL.Opt(IDL.Nat64),
    'spender' : Account__2,
  });
  const ApproveCollectionError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'Duplicate' : IDL.Record({ 'duplicate_of' : IDL.Nat }),
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : IDL.Nat64 }),
    'TooOld' : IDL.Null,
  });
  const ApprovalCollectionResponse = IDL.Variant({
    'Ok' : IDL.Nat,
    'Err' : ApproveCollectionError,
  });
  const ApproveTokensError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'Duplicate' : IDL.Record({ 'duplicate_of' : IDL.Nat }),
    'NonExistingTokenId' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : IDL.Nat64 }),
    'TooOld' : IDL.Null,
  });
  const ApprovalResult = IDL.Variant({
    'Ok' : IDL.Nat,
    'Err' : ApproveTokensError,
  });
  const ApprovalResponseItem = IDL.Record({
    'token_id' : IDL.Nat,
    'approval_result' : ApprovalResult,
  });
  const ApproveTokensBatchError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : IDL.Nat64 }),
    'TooOld' : IDL.Null,
  });
  const ApprovalResponse = IDL.Variant({
    'Ok' : IDL.Vec(ApprovalResponseItem),
    'Err' : ApproveTokensBatchError,
  });
  const Account__3 = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(Subaccount),
  });
  const CollectionApproval = IDL.Record({
    'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'from_subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'created_at_time' : IDL.Opt(IDL.Nat64),
    'expires_at' : IDL.Opt(IDL.Nat64),
    'spender' : Account__2,
  });
  const ApprovalInfo = IDL.Record({
    'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'from_subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'created_at_time' : IDL.Opt(IDL.Nat64),
    'expires_at' : IDL.Opt(IDL.Nat64),
    'spender' : Account__2,
  });
  const TokenApproval = IDL.Record({
    'token_id' : IDL.Nat,
    'approval_info' : ApprovalInfo,
  });
  Value.fill(
    IDL.Variant({
      'Int' : IDL.Int,
      'Map' : IDL.Vec(IDL.Tuple(IDL.Text, Value)),
      'Nat' : IDL.Nat,
      'Blob' : IDL.Vec(IDL.Nat8),
      'Text' : IDL.Text,
      'Array' : IDL.Vec(Value),
    })
  );
  const Value__3 = IDL.Variant({
    'Int' : IDL.Int,
    'Map' : IDL.Vec(IDL.Tuple(IDL.Text, Value)),
    'Nat' : IDL.Nat,
    'Blob' : IDL.Vec(IDL.Nat8),
    'Text' : IDL.Text,
    'Array' : IDL.Vec(Value),
  });
  const RevokeCollectionArgs = IDL.Record({
    'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'from_subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'created_at_time' : IDL.Opt(IDL.Nat64),
    'spender' : IDL.Opt(Account__2),
  });
  const RevokeTokensError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'Duplicate' : IDL.Record({ 'duplicate_of' : IDL.Nat }),
    'NonExistingTokenId' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'ApprovalDoesNotExist' : IDL.Null,
  });
  const RevokeTokensResult = IDL.Variant({
    'Ok' : IDL.Nat,
    'Err' : RevokeTokensError,
  });
  const RevokeCollectionResponseItem = IDL.Record({
    'spender' : IDL.Opt(Account__2),
    'revoke_result' : RevokeTokensResult,
  });
  const RevokeCollectionBatchError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : IDL.Nat64 }),
    'TooOld' : IDL.Null,
  });
  const RevokeCollectionResponse = IDL.Variant({
    'Ok' : IDL.Vec(RevokeCollectionResponseItem),
    'Err' : RevokeCollectionBatchError,
  });
  const RevokeTokensArgs = IDL.Record({
    'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'from_subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'token_ids' : IDL.Vec(IDL.Nat),
    'created_at_time' : IDL.Opt(IDL.Nat64),
    'spender' : IDL.Opt(Account__2),
  });
  const RevokeTokensResponseItem = IDL.Record({
    'token_id' : IDL.Nat,
    'spender' : IDL.Opt(Account__2),
    'revoke_result' : RevokeTokensResult,
  });
  const RevokeTokensBatchError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : IDL.Nat64 }),
    'TooOld' : IDL.Null,
  });
  const RevokeTokensResponse = IDL.Variant({
    'Ok' : IDL.Vec(RevokeTokensResponseItem),
    'Err' : RevokeTokensBatchError,
  });
  const TransferFromArgs = IDL.Record({
    'to' : Account__2,
    'spender_subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'from' : Account__2,
    'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'token_ids' : IDL.Vec(IDL.Nat),
    'created_at_time' : IDL.Opt(IDL.Nat64),
  });
  const TransferFromError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'Duplicate' : IDL.Record({ 'duplicate_of' : IDL.Nat }),
    'NonExistingTokenId' : IDL.Null,
    'Unauthorized' : IDL.Null,
  });
  const TransferFromResponseItem = IDL.Record({
    'token_id' : IDL.Nat,
    'transfer_result' : IDL.Variant({
      'Ok' : IDL.Nat,
      'Err' : TransferFromError,
    }),
  });
  const TransferFromBatchError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : IDL.Nat64 }),
    'InvalidRecipient' : IDL.Null,
    'TooOld' : IDL.Null,
  });
  const TransferFromResponse = IDL.Variant({
    'Ok' : IDL.Vec(TransferFromResponseItem),
    'Err' : TransferFromBatchError,
  });
  const GetArchivesArgs = IDL.Record({ 'from' : IDL.Opt(IDL.Principal) });
  const GetArchivesResultItem = IDL.Record({
    'end' : IDL.Nat,
    'canister_id' : IDL.Principal,
    'start' : IDL.Nat,
  });
  const GetArchivesResult = IDL.Vec(GetArchivesResultItem);
  const TransactionRange = IDL.Record({
    'start' : IDL.Nat,
    'length' : IDL.Nat,
  });
  Value__2.fill(
    IDL.Variant({
      'Int' : IDL.Int,
      'Map' : IDL.Vec(IDL.Tuple(IDL.Text, Value__2)),
      'Nat' : IDL.Nat,
      'Blob' : IDL.Vec(IDL.Nat8),
      'Text' : IDL.Text,
      'Array' : IDL.Vec(Value__2),
    })
  );
  const TransactionRange__1 = IDL.Record({
    'start' : IDL.Nat,
    'length' : IDL.Nat,
  });
  const GetTransactionsResult__1 = IDL.Record({
    'log_length' : IDL.Nat,
    'blocks' : IDL.Vec(IDL.Record({ 'id' : IDL.Nat, 'block' : Value__2 })),
    'archived_blocks' : IDL.Vec(ArchivedTransactionResponse),
  });
  const GetTransactionsFn = IDL.Func(
      [IDL.Vec(TransactionRange__1)],
      [GetTransactionsResult__1],
      ['query'],
    );
  ArchivedTransactionResponse.fill(
    IDL.Record({
      'args' : IDL.Vec(TransactionRange__1),
      'callback' : GetTransactionsFn,
    })
  );
  const GetTransactionsResult = IDL.Record({
    'log_length' : IDL.Nat,
    'blocks' : IDL.Vec(IDL.Record({ 'id' : IDL.Nat, 'block' : Value__2 })),
    'archived_blocks' : IDL.Vec(ArchivedTransactionResponse),
  });
  const DataCertificate = IDL.Record({
    'certificate' : IDL.Vec(IDL.Nat8),
    'hash_tree' : IDL.Vec(IDL.Nat8),
  });
  const Account__1 = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(Subaccount),
  });
  const Value__1 = IDL.Variant({
    'Int' : IDL.Int,
    'Map' : IDL.Vec(IDL.Tuple(IDL.Text, Value)),
    'Nat' : IDL.Nat,
    'Blob' : IDL.Vec(IDL.Nat8),
    'Text' : IDL.Text,
    'Array' : IDL.Vec(Value),
  });
  const OwnerOfResponse = IDL.Record({
    'token_id' : IDL.Nat,
    'account' : IDL.Opt(Account),
  });
  const OwnerOfResponses = IDL.Vec(OwnerOfResponse);
  const SupportedStandards__1 = IDL.Vec(
    IDL.Record({ 'url' : IDL.Text, 'name' : IDL.Text })
  );
  const NFTMap = IDL.Vec(IDL.Tuple(IDL.Text, Value));
  const TransferArgs = IDL.Record({
    'to' : Account,
    'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'token_ids' : IDL.Vec(IDL.Nat),
    'created_at_time' : IDL.Opt(IDL.Nat64),
  });
  const TransferError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'Duplicate' : IDL.Record({ 'duplicate_of' : IDL.Nat }),
    'NonExistingTokenId' : IDL.Null,
    'Unauthorized' : IDL.Null,
  });
  const TransferResponseItem = IDL.Record({
    'token_id' : IDL.Nat,
    'transfer_result' : IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : TransferError }),
  });
  const TransferBatchError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : IDL.Nat64 }),
    'InvalidRecipient' : IDL.Null,
    'TooOld' : IDL.Null,
  });
  const TransferResponse = IDL.Variant({
    'Ok' : IDL.Vec(TransferResponseItem),
    'Err' : TransferBatchError,
  });
  const SetNFTError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'TokenExists' : IDL.Null,
    'NonExistingTokenId' : IDL.Null,
  });
  const SetNFTResult = IDL.Variant({
    'Ok' : IDL.Nat,
    'Err' : SetNFTError,
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
  });
  const SetNFTItemResponse = IDL.Record({
    'result' : SetNFTResult,
    'token_id' : IDL.Nat,
  });
  const SetNFTBatchError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : IDL.Nat64 }),
    'TooOld' : IDL.Null,
  });
  const SetNFTBatchResponse = IDL.Variant({
    'Ok' : IDL.Vec(SetNFTItemResponse),
    'Err' : SetNFTBatchError,
  });
  const NFTCanister = IDL.Service({
    'burn' : IDL.Func([BurnNFTRequest], [BurnNFTBatchResponse], []),
    'get_tip' : IDL.Func([], [Tip], ['query']),
    'icrc30_approve_collection' : IDL.Func(
        [ApprovalInfo__1],
        [ApprovalCollectionResponse],
        [],
      ),
    'icrc30_approve_tokens' : IDL.Func(
        [IDL.Vec(IDL.Nat), ApprovalInfo__1],
        [ApprovalResponse],
        [],
      ),
    'icrc30_get_collection_approvals' : IDL.Func(
        [Account__3, IDL.Opt(CollectionApproval), IDL.Opt(IDL.Nat)],
        [IDL.Vec(CollectionApproval)],
        ['query'],
      ),
    'icrc30_get_token_approvals' : IDL.Func(
        [IDL.Vec(IDL.Nat), IDL.Opt(TokenApproval), IDL.Opt(IDL.Nat)],
        [IDL.Vec(TokenApproval)],
        ['query'],
      ),
    'icrc30_is_approved' : IDL.Func(
        [Account__3, IDL.Opt(IDL.Vec(IDL.Nat8)), IDL.Nat],
        [IDL.Bool],
        ['query'],
      ),
    'icrc30_max_approvals_per_token_or_collection' : IDL.Func(
        [],
        [IDL.Opt(IDL.Nat)],
        ['query'],
      ),
    'icrc30_max_revoke_approvals' : IDL.Func([], [IDL.Opt(IDL.Nat)], ['query']),
    'icrc30_metadata' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, Value__3))],
        ['query'],
      ),
    'icrc30_revoke_collection_approvals' : IDL.Func(
        [RevokeCollectionArgs],
        [RevokeCollectionResponse],
        [],
      ),
    'icrc30_revoke_token_approvals' : IDL.Func(
        [RevokeTokensArgs],
        [RevokeTokensResponse],
        [],
      ),
    'icrc30_transfer_from' : IDL.Func(
        [TransferFromArgs],
        [TransferFromResponse],
        [],
      ),
    'icrc3_get_archives' : IDL.Func(
        [GetArchivesArgs],
        [GetArchivesResult],
        ['query'],
      ),
    'icrc3_get_blocks' : IDL.Func(
        [IDL.Vec(TransactionRange)],
        [GetTransactionsResult],
        ['query'],
      ),
    'icrc3_get_tip_certificate' : IDL.Func(
        [],
        [IDL.Opt(DataCertificate)],
        ['query'],
      ),
    'icrc7_balance_of' : IDL.Func([Account__1], [IDL.Nat], ['query']),
    'icrc7_collection_metadata' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, Value__1))],
        ['query'],
      ),
    'icrc7_default_take_value' : IDL.Func([], [IDL.Opt(IDL.Nat)], ['query']),
    'icrc7_description' : IDL.Func([], [IDL.Opt(IDL.Text)], ['query']),
    'icrc7_logo' : IDL.Func([], [IDL.Opt(IDL.Text)], ['query']),
    'icrc7_max_memo_size' : IDL.Func([], [IDL.Opt(IDL.Nat)], ['query']),
    'icrc7_max_query_batch_size' : IDL.Func([], [IDL.Opt(IDL.Nat)], ['query']),
    'icrc7_max_take_value' : IDL.Func([], [IDL.Opt(IDL.Nat)], ['query']),
    'icrc7_max_update_batch_size' : IDL.Func([], [IDL.Opt(IDL.Nat)], ['query']),
    'icrc7_name' : IDL.Func([], [IDL.Text], ['query']),
    'icrc7_owner_of' : IDL.Func(
        [IDL.Vec(IDL.Nat)],
        [OwnerOfResponses],
        ['query'],
      ),
    'icrc7_supply_cap' : IDL.Func([], [IDL.Opt(IDL.Nat)], ['query']),
    'icrc7_supported_standards' : IDL.Func(
        [],
        [SupportedStandards__1],
        ['query'],
      ),
    'icrc7_symbol' : IDL.Func([], [IDL.Text], ['query']),
    'icrc7_token_metadata' : IDL.Func(
        [IDL.Vec(IDL.Nat)],
        [IDL.Vec(IDL.Record({ 'token_id' : IDL.Nat, 'metadata' : NFTMap }))],
        ['query'],
      ),
    'icrc7_tokens' : IDL.Func(
        [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
        [IDL.Vec(IDL.Nat)],
        ['query'],
      ),
    'icrc7_tokens_of' : IDL.Func(
        [Account__1, IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
        [IDL.Vec(IDL.Nat)],
        ['query'],
      ),
    'icrc7_total_supply' : IDL.Func([], [IDL.Nat], ['query']),
    'icrc7_transfer' : IDL.Func([TransferArgs], [TransferResponse], []),
    'mint' : IDL.Func([Account__1], [SetNFTBatchResponse], []),
  });
  return NFTCanister;
};
export const init = ({ IDL }) => {
  const IndexType = IDL.Variant({
    'Stable' : IDL.Null,
    'StableTyped' : IDL.Null,
    'Managed' : IDL.Null,
  });
  const InitArgs__2 = IDL.Record({
    'maxRecordsToArchive' : IDL.Nat,
    'archiveIndexType' : IndexType,
    'maxArchivePages' : IDL.Nat,
    'settleToRecords' : IDL.Nat,
    'archiveCycles' : IDL.Nat,
    'maxActiveRecords' : IDL.Nat,
    'maxRecordsInArchiveInstance' : IDL.Nat,
    'archiveControllers' : IDL.Opt(IDL.Opt(IDL.Vec(IDL.Principal))),
  });
  const InitArgs__1 = IDL.Opt(InitArgs__2);
  const InitArgs = IDL.Opt(
    IDL.Record({
      'deployer' : IDL.Principal,
      'max_approvals' : IDL.Opt(IDL.Nat),
      'max_approvals_per_token_or_collection' : IDL.Opt(IDL.Nat),
      'settle_to_approvals' : IDL.Opt(IDL.Nat),
      'max_revoke_approvals' : IDL.Opt(IDL.Nat),
      'collection_approval_requires_token' : IDL.Opt(IDL.Bool),
    })
  );
  const Subaccount = IDL.Vec(IDL.Nat8);
  const Account = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(Subaccount),
  });
  const SupportedStandards = IDL.Vec(
    IDL.Record({ 'url' : IDL.Text, 'name' : IDL.Text })
  );
  const InitArgs__3 = IDL.Opt(
    IDL.Record({
      'deployer' : IDL.Principal,
      'allow_transfers' : IDL.Opt(IDL.Bool),
      'supply_cap' : IDL.Opt(IDL.Nat),
      'burn_account' : IDL.Opt(Account),
      'default_take_value' : IDL.Opt(IDL.Nat),
      'logo' : IDL.Opt(IDL.Text),
      'permitted_drift' : IDL.Opt(IDL.Nat),
      'name' : IDL.Opt(IDL.Text),
      'description' : IDL.Opt(IDL.Text),
      'max_take_value' : IDL.Opt(IDL.Nat),
      'max_update_batch_size' : IDL.Opt(IDL.Nat),
      'max_query_batch_size' : IDL.Opt(IDL.Nat),
      'max_memo_size' : IDL.Opt(IDL.Nat),
      'supported_standards' : IDL.Opt(SupportedStandards),
      'symbol' : IDL.Opt(IDL.Text),
    })
  );
  return [
    IDL.Record({
      'icrc3_args' : InitArgs__1,
      'icrc30_args' : InitArgs,
      'icrc7_args' : InitArgs__3,
    }),
  ];
};
