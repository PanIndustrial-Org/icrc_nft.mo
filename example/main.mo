import Array "mo:base/Array";
import Vec "mo:vector";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import D "mo:base/Debug";
import CertifiedData "mo:base/CertifiedData";

import CertTree "mo:cert/CertTree";

import ICRC7 "mo:icrc7-mo";
import ICRC30 "mo:icrc30-mo";
import ICRC3 "mo:icrc3-mo";


shared(_init_msg) actor class Example(_args : {
  icrc7_args: ?ICRC7.InitArgs;
  icrc30_args: ?ICRC30.InitArgs;
  icrc3_args: ?ICRC3.InitArgs;
}) = this {

  type Account =                          ICRC7.Account;
  type Environment =                      ICRC7.Environment;
  type Value =                            ICRC7.Value;
  type NFT =                              ICRC7.NFT;
  type NFTShared =                        ICRC7.NFTShared;
  type NFTMap =                           ICRC7.NFTMap;
  type OwnerOfResponse =                  ICRC7.OwnerOfResponse;
  type OwnerOfResponses =                 ICRC7.OwnerOfResponses;
  type TransferArgs =                     ICRC7.TransferArgs;
  type TransferResponse =                 ICRC7.TransferResponse;
  type TransferError =                    ICRC7.TransferArgs;
  type TokenApproval =                    ICRC30.TokenApproval;
  type CollectionApproval =               ICRC30.CollectionApproval;
  type ApprovalInfo =                     ICRC30.ApprovalInfo;
  type ApprovalResponse =                 ICRC30.ApprovalResponse;
  type ApprovalResult =                   ICRC30.ApprovalResult;
  type ApprovalCollectionResponse =       ICRC30.ApprovalCollectionResponse;
  type RevokeTokensArgs =                 ICRC30.RevokeTokensArgs;
  type RevokeTokensResponseItem =         ICRC30.RevokeTokensResponseItem;
  type RevokeCollectionArgs =             ICRC30.RevokeCollectionArgs;
  type RevokeCollectionResponseItem =     ICRC30.RevokeCollectionResponseItem;
  type TransferFromArgs =                 ICRC30.TransferFromArgs;
  type TransferFromResponse =             ICRC30.TransferFromResponse;
  type RevokeTokensResponse =             ICRC30.RevokeTokensResponse;
  type RevokeCollectionResponse =         ICRC30.RevokeCollectionResponse;

  

  stable var init_msg = _init_msg; //preserves original initialization;

  stable var icrc7_migration_state = ICRC7.init(ICRC7.initialState() , #v0_1_0(#id), switch(_args.icrc7_args){
    case(null){
      ?{
        symbol = ?"NBL";
        name = ?"NASA Nebulas";
        description = ?"A Collection of Nebulas Captured by NASA";
        logo = ?"https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg";
        supply_cap = null;
        allow_transfers = null;
        max_query_batch_size = ?100;
        max_update_batch_size = ?100;
        default_take_value = ?1000;
        max_take_value = ?10000;
        max_memo_size = ?512;
        permitted_drift = null;
        burn_account = null; //burned nfts are deleted
        deployer = init_msg.caller;
      } : ICRC7.InitArgs;
    };
    case(?val) val;
    }, init_msg.caller);

  let #v0_1_0(#data(icrc7_state_current)) = icrc7_migration_state;

  stable var icrc30_migration_state = ICRC30.init(ICRC30.initialState() , #v0_1_0(#id), switch(_args.icrc30_args){
    case(null){
      ?{
        max_approvals_per_token_or_collection = ?10;
        max_revoke_approvals = ?100;
        collection_approval_requires_token = ?true;
        max_approvals = null;
        settle_to_approvals = null;
        deployer = init_msg.caller;
      } : ICRC30.InitArgs;
    };
    case(?val) val;
    }, init_msg.caller);

  let #v0_1_0(#data(icrc30_state_current)) = icrc30_migration_state;

  private var _icrc7 : ?ICRC7.ICRC7 = null;
  private var _icrc30 : ?ICRC30.ICRC30 = null;

  private func get_icrc7_state() : ICRC7.CurrentState {
    return icrc7_state_current;
  };

  private func get_icrc30_state() : ICRC30.CurrentState {
    return icrc30_state_current;
  };

  stable var icrc3_migration_state = ICRC3.init(ICRC3.initialState() , #v0_1_0(#id), switch(_args.icrc3_args){
    case(null){
      ?{
          maxActiveRecords = 4000;
          settleToRecords = 2000;
          maxRecordsInArchiveInstance = 5_000_000;
          maxArchivePages  = 62500; //allows up to 993 bytes per record
          archiveIndexType = #Stable;
          maxRecordsToArchive = 10_000;
          archiveCycles = 2_000_000_000_000; //two trillion
          archiveControllers = null;
          
        }
    };
    case(?val) _args.icrc3_args;
    }, init_msg.caller);

  let #v0_1_0(#data(icrc3_state_current)) = icrc3_migration_state;

  private var _icrc3 : ?ICRC3.ICRC3 = null;

  private func get_icrc3_state() : ICRC3.CurrentState {
    return icrc3_state_current;
  };

  stable let cert_store : CertTree.Store = CertTree.newStore();
  let ct = CertTree.Ops(cert_store);

  private func get_certificate_store() : CertTree.Store {
    D.print("returning cert store " # debug_show(cert_store));
    return cert_store;
  };

  private func updated_certification(cert: Blob, lastIndex: Nat) : Bool{

    D.print("updating the certification " # debug_show(CertifiedData.getCertificate(), ct.treeHash()));
    ct.setCertifiedData();
    D.print("did the certification " # debug_show(CertifiedData.getCertificate()));
    return true;
  };

  private func get_icrc3_environment() : ICRC3.Environment{
    ?{
      updated_certification = ?updated_certification;
      get_certificate_store = ?get_certificate_store;
    };
  };

  func icrc3() : ICRC3.ICRC3 {
    switch(_icrc3){
      case(null){
        let initclass : ICRC3.ICRC3 = ICRC3.ICRC3(?icrc3_migration_state, Principal.fromActor(this), get_icrc3_environment());
        _icrc3 := ?initclass;
        initclass;
      };
      case(?val) val;
    };
  };

  private func get_icrc7_environment() : ICRC7.Environment {
    {
      canister = get_canister;
      get_time = get_time;
      refresh_state = get_icrc7_state;
      add_ledger_transaction = ?icrc3().add_record;
      can_mint = null;
      can_burn = null;
      can_transfer = null;
    };
  };

  private func get_icrc30_environment() : ICRC30.Environment {
    {
      canister = get_canister;
      get_time = get_time;
      refresh_state = get_icrc30_state;
      icrc7 = icrc7();
      can_transfer_from = null;
      can_approve_token = null;
      can_approve_collection = null;
      can_revoke_token_approval = null;
      can_revoke_collection_approval = null;
    };
  };

  func icrc7() : ICRC7.ICRC7 {
    switch(_icrc7){
      case(null){
        let initclass : ICRC7.ICRC7 = ICRC7.ICRC7(?icrc7_migration_state, Principal.fromActor(this), get_icrc7_environment());
        _icrc7 := ?initclass;
        initclass;
      };
      case(?val) val;
    };
  };

  func icrc30() : ICRC30.ICRC30 {
    switch(_icrc30){
      case(null){
        let initclass : ICRC30.ICRC30 = ICRC30.ICRC30(?icrc30_migration_state, Principal.fromActor(this), get_icrc30_environment());
        _icrc30 := ?initclass;
        initclass;
      };
      case(?val) val;
    };
  };

  //we will use a stable log for this example, but encourage the use of ICRC3 in a full implementation.  see https://github.com/panindustrial/FullNFT.mo

  stable var trx_log = Vec.new<ICRC7.Value>();

  func add_trx(entry : Value, entrytop: ?Value) : Nat {
    let trx = Vec.new<(Text, Value)>();

      Vec.add(trx,("tx", entry));

      
      switch(entrytop){
        case(?top_level){
          switch(top_level){
            case(#Map(items)){
              for(thisItem in items.vals()){
                Vec.add(trx,(thisItem.0, thisItem.1));
              };
            };
            case(_){};
          }
        };
        case(null){};
      };

      
    let thisTrx = #Map(Vec.toArray(trx));
    Vec.add(trx_log, thisTrx);
    return (Vec.size(trx_log) - 1);
  };

  private var canister_principal : ?Principal = null;

  private func get_canister() : Principal {
    switch (canister_principal) {
        case (null) {
            canister_principal := ?Principal.fromActor(this);
            Principal.fromActor(this);
        };
        case (?val) {
            val;
        };
    };
  };

  private func get_time() : Int{
      //note: you may want to implement a testing framework where you can set this time manually
      /* switch(state_current.testing.time_mode){
          case(#test){
              state_current.testing.test_time;
          };
          case(#standard){
               Time.now();
          };
      }; */
    Time.now();
  };



  public query func icrc7_symbol() : async Text {

    return switch(icrc7().get_ledger_info().symbol){
      case(?val) val;
      case(null) "";
    };
  };

  public query func icrc7_name() : async Text {
    return switch(icrc7().get_ledger_info().name){
      case(?val) val;
      case(null) "";
    };
  };

  public query func icrc7_description() : async ?Text {
    return icrc7().get_ledger_info().description;
  };

  public query func icrc7_logo() : async ?Text {
    return icrc7().get_ledger_info().logo;
  };

  public query func icrc7_max_memo_size() : async ?Nat {
    return ?icrc7().get_ledger_info().max_memo_size;
  };

  public query func icrc7_total_supply() : async Nat {
    return icrc7().get_stats().nft_count;
  };

  public query func icrc7_supply_cap() : async ?Nat {
    return icrc7().get_ledger_info().supply_cap;
  };

  public query func icrc30_max_approvals_per_token_or_collection() : async ?Nat {
    return ?icrc30().get_ledger_info().max_approvals_per_token_or_collection;
  };

  public query func icrc7_max_query_batch_size() : async ?Nat {
    return ?icrc7().get_ledger_info().max_query_batch_size;
  };

  public query func icrc7_max_update_batch_size() : async ?Nat {
    return ?icrc7().get_ledger_info().max_update_batch_size;
  };

  public query func icrc7_default_take_value() : async ?Nat {
    return ?icrc7().get_ledger_info().default_take_value;
  };

  public query func icrc7_max_take_value() : async ?Nat {
    return ?icrc7().get_ledger_info().max_take_value;
  };

  public query func icrc30_max_revoke_approvals() : async ?Nat {
    return ?icrc30().get_ledger_info().max_revoke_approvals;
  };

  public query func icrc7_collection_metadata() : async {metadata: [(Text, Value)]} {

    let ledger_info = icrc7().get_ledger_info();
    let ledger_info30 = icrc30().get_ledger_info();
    let results = Vec.new<(Text, Value)>();

    switch(ledger_info.symbol){
      case(?val) Vec.add(results, ("icrc7:symbol", #Text(val)));
      case(null) {};
    };
    
    switch(ledger_info.name){
      case(?val) Vec.add(results, ("icrc7:name", #Text(val)));
      case(null) {};
    };

    switch(ledger_info.description){
      case(?val) Vec.add(results, ("icrc7:description", #Text(val)));
      case(null) {};
    };

    switch(ledger_info.logo){
      case(?val) Vec.add(results, ("icrc7:logo", #Text(val)));
      case(null) {};
    };

    Vec.add(results, ("icrc7:total_supply", #Nat(icrc7().get_stats().nft_count)));

    switch(ledger_info.supply_cap){
      case(?val) Vec.add(results, ("icrc7:supply_cap", #Nat(val)));
      case(null) {};
    };
 
    Vec.add(results,("icrc30:max_approvals_per_token_or_collection", #Nat(ledger_info30.max_approvals_per_token_or_collection)));
    Vec.add(results,("icrc7:max_query_batch_size", #Nat(ledger_info.max_query_batch_size)));
    Vec.add(results, ("icrc7:max_update_batch_size", #Nat(ledger_info.max_update_batch_size)));
    Vec.add(results,("icrc7:default_take_value", #Nat(ledger_info.default_take_value)));
    Vec.add(results,("icrc7:max_take_value", #Nat(ledger_info.max_take_value)));
    Vec.add(results, ("icrc30:max_revoke_approvals", #Nat(ledger_info30.max_revoke_approvals)));
    
    return {
      metadata = Vec.toArray(results);
    };
  };

  
  public query func icrc30_metadata() : async {metadata: [(Text, Value)]} {

    let ledger_info30 = icrc30().get_ledger_info();
    let results = Vec.new<(Text, Value)>();

    
    Vec.add(results, ("max_approvals_per_token_or_collection", #Nat(ledger_info30.max_approvals_per_token_or_collection)));
      
    Vec.add(results, ("icrc7:name", #Nat(ledger_info30.max_revoke_approvals)));
    
    return {
      metadata = Vec.toArray(results);
    };
  };

  public query func icrc7_token_metadata(token_ids: [Nat]) : async [(Nat, ?NFTMap)]{
 
     switch(icrc7().get_token_infos_shared(token_ids)){
        case(#ok(val)) val;
        case(#err(err)) D.trap(err);
      };
  };

  public query func icrc7_owner_of(token_ids: [Nat]) : async OwnerOfResponses {
   
     switch( icrc7().get_token_owners(token_ids)){
        case(#ok(val)) val;
        case(#err(err)) D.trap(err);
      };
  };

  public query func icrc7_balance_of(account: Account) : async Nat {
    return icrc7().get_token_owners_tokens_count(account);
  };

  public query func icrc7_tokens(prev: ?Nat, take: ?Nat) : async [Nat] {
    return icrc7().get_tokens_paginated(prev, take);
  };

  public query func icrc7_tokens_of(account: Account, prev: ?Nat, take: ?Nat) : async [Nat] {
    return icrc7().get_tokens_of_paginated(account, prev, take);
  };

  public query func icrc30_is_approved(spender: Account, from_subaccount: ?Blob, token_id: Nat) : async Bool {
    return icrc30().is_approved(spender, from_subaccount, token_id);
  };

  public query func icrc30_get_approvals(token_ids: [Nat], prev: ?TokenApproval, take: ?Nat) : async [TokenApproval] {
    
    switch(icrc30().get_token_approvals(token_ids, prev, take)){
        case(#ok(val)) val;
        case(#err(err)) D.trap(err);
      };
  };

  public query func icrc30_get_collection_approvals(owner : Account, prev: ?CollectionApproval, take: ?Nat) : async [CollectionApproval] {
    
    switch(icrc30().get_collection_approvals(owner, prev, take)){
        case(#ok(val)) val;
        case(#err(err)) D.trap(err);
      };
  };

  public query func icrc7_supported_standards() : async ICRC7.SupportedStandards {
    //todo: figure this out
    return [
      {name = "ICRC-7"; url = "https://github.com/dfinity/ICRC/ICRCs/ICRC-7"},
      {name = "ICRC-30"; url = "https://github.com/dfinity/ICRC/ICRCs/ICRC-30"}];
  };


  //Update calls

  public shared(msg) func icrc30_approve(token_ids: [Nat], approval: ApprovalInfo) : async ApprovalResponse {

    switch(icrc30().approve_transfers(msg.caller, token_ids, approval)){
        case(#ok(val)) val;
        case(#err(err)) D.trap(err);
      };
  };

  public shared(msg) func icrc30_approve_collection(approval: ApprovalInfo) : async ApprovalCollectionResponse {

      let result : ApprovalResult = switch(icrc30().approve_collection( msg.caller, approval)){
        case(#ok(val)) val;
        case(#err(err)) D.trap(err);
      };

      switch(result){
        case(#Err(val)){
          return (#Err(icrc30().TokenErrorToCollectionError(val)));
        };
        case(#Ok(val)){
          return #Ok(val);
        };
      };
  };

  public shared(msg) func icrc7_transfer(args: TransferArgs) : async TransferResponse {
      switch(icrc7().transfer(msg.caller, args)){
        case(#ok(val)) val;
        case(#err(err)) D.trap(err);
      };
  };

  public shared(msg) func icrc30_transfer_from(args: TransferFromArgs) : async TransferFromResponse {
      switch(icrc30().transfer_from(msg.caller, args)){
        case(#ok(val)) val;
        case(#err(err)) D.trap(err);
      };
  };

  public shared(msg) func icrc30_revoke_token_approvals(args: RevokeTokensArgs) : async RevokeTokensResponse {
      switch(icrc30().revoke_token_approvals(msg.caller, args)){
        case(#ok(val)) val;
        case(#err(err)) D.trap(err);
      };
  };

  public shared(msg) func icrc30_revoke_collection_approvals(args: RevokeCollectionArgs) : async RevokeCollectionResponse {
     
      switch(icrc30().revoke_collection_approvals(msg.caller, args)){
        case(#ok(val)) val;
        case(#err(err)) D.trap(err);
      };
  };

  /////////
  // ICRC3 endpoints
  /////////

  public query func icrc3_get_blocks(args: ICRC3.TransactionRange) : async ICRC3.GetTransactionsResult{
    return icrc3().get_transactions(args);
  };

  public query func icrc3_get_archives(args: ICRC3.GetArchivesArgs) : async ICRC3.GetArchivesResult{
    return icrc3().get_archives(args);
  };

  public query func icrc3_get_tip_certificate() : async ?ICRC3.DataCertificate {
    return icrc3().get_tip_certificate();
  };

  public query func get_tip() : async ICRC3.Tip {
    return icrc3().get_tip();
  };

  /////////
  // The following functions are not part of ICRC7 or ICRC30. They are provided as examples of how
  // one might deploy an NFT.
  /////////

  public shared(msg) func icrcX_mint(tokens: ICRC7.SetNFTRequest) : async ICRC7.SetNFTBatchResponse {
     
      switch(icrc7().set_nfts(msg.caller, tokens)){
        case(#ok(val)) val;
        case(#err(err)) D.trap(err);
      };
  };

  public shared(msg) func icrcX_burn(tokens: ICRC7.BurnNFTRequest) : async ICRC7.BurnNFTBatchResponse {
      switch(icrc7().burn_nfts(msg.caller, tokens)){
        case(#ok(val)) val;
        case(#err(err)) D.trap(err);
      };
  };

  private stable var _init = false;
  public shared(msg) func init() : async () {
    //can only be called once

    //Warning:  This is a test scenario and should not be used in production.  This creates an approval for the owner of the canister and this can be garbage collected if the max_approvals is hit.  We advise minting with the target owner in the metadata or creating an assign function (see assign)
    if(_init == false){
      //approve the deployer as a spender on all tokens...
      let current_val = icrc30().get_state().ledger_info.collection_approval_requires_token;
      let update = icrc30().update_ledger_info([#CollectionApprovalRequiresToken(false)]);
      let result = icrc30().approve_collection(Principal.fromActor(this), {
        from_subaccount = null;
        spender = {owner = icrc7().get_state().owner; subaccount = null}; 
        memo =  null;
        expires_at = null;
        created_at_time = null;
      } );
      let update2 = icrc30().update_ledger_info([#CollectionApprovalRequiresToken(current_val)]);
      
      D.print("initialized" # debug_show(result,  {
        from_subaccount = null;
        spender = {owner = icrc7().get_state().owner; subaccount = null}; 
        memo =  null;
        expires_at = null;
        created_at_time = null;
      }));
    };
    _init := true;
  };
  

  public shared(msg) func assign(token_id : Nat, account : Account) : async Nat {
    if(msg.caller != icrc7().get_state().owner) D.trap("Unauthorized");

    switch(icrc7().transfer(Principal.fromActor(this), {
      subaccount = null;
      to = account;
      token_ids = [token_id];
      memo = null;
      created_at_time = null;
    })){
      case(#ok(#Ok(val))){
        switch(val[0].transfer_result){
          case(#Ok(val)) val;
          case(#Err(err)) D.trap(debug_show(err));
        };
      };
      case(#err(err)){
        D.trap(err);
      };
      case(#ok(#Err(err))){
        D.trap(debug_show(err));
      }
    };
  };
  

};