import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import D "mo:base/Debug";
import CertifiedData "mo:base/CertifiedData";
import Blob "mo:base/Blob";
import Array "mo:base/Array";

import CertTree "mo:ic-certification/CertTree";

import ICRC7 "mo:icrc7-mo";
import ICRC30 "mo:icrc30-mo";
import ICRC3 "mo:icrc3-mo";

import Types "types";

shared (_init_msg) actor class NFTCanister(args : Types.InitArgs) : async (ICRC7.Service and ICRC3.Service and ICRC30.Service) = this {

  stable var init_msg = _init_msg; //preserves original initialization;

  // use this to create the initial state of your canister
  // the args will be considered

  /// Initialize ICRC7
  stable var icrc7_migration_state = ICRC7.init(
    ICRC7.initialState(),
    #v0_1_0(#id),
    args.icrc7_args,
    init_msg.caller,
  );

  // TO-DO : this will trap if the pattern doesn't match after an upgrade, is this intended?
  let #v0_1_0(#data(icrc7_state_current)) = icrc7_migration_state;

  private func get_icrc7_state() : ICRC7.CurrentState {
    return icrc7_state_current;
  };

  private var _icrc7 : ?ICRC7.ICRC7 = null;

  func icrc7() : ICRC7.ICRC7 {
    switch (_icrc7) {
      case (null) {
        let initclass : ICRC7.ICRC7 = ICRC7.ICRC7(?icrc7_migration_state, Principal.fromActor(this), get_icrc7_environment());
        _icrc7 := ?initclass;
        initclass;
      };
      case (?val) val;
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

  /// Initialize ICRC30
  stable var icrc30_migration_state = ICRC30.init(
    ICRC30.initialState(),
    #v0_1_0(#id),
    args.icrc30_args,
    init_msg.caller,
  );

  // TO-DO : this will trap if the pattern doesn't match after an upgrade, is this intended?
  let #v0_1_0(#data(icrc30_state_current)) = icrc30_migration_state;

  private func get_icrc30_state() : ICRC30.CurrentState {
    return icrc30_state_current;
  };

  private var _icrc30 : ?ICRC30.ICRC30 = null;

  func icrc30() : ICRC30.ICRC30 {
    switch (_icrc30) {
      case (null) {
        let initclass : ICRC30.ICRC30 = ICRC30.ICRC30(?icrc30_migration_state, Principal.fromActor(this), get_icrc30_environment());
        _icrc30 := ?initclass;
        initclass;
      };
      case (?val) val;
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

  /// Initialize ICRC3
  stable var icrc3_migration_state = ICRC3.init(
    ICRC3.initialState(),
    #v0_1_0(#id),
    args.icrc3_args,
    init_msg.caller,
  );

  // TO-DO : this will trap if the pattern doesn't match after an upgrade, is this intended?
  let #v0_1_0(#data(icrc3_state_current)) = icrc3_migration_state;

  private func get_icrc3_state() : ICRC3.CurrentState {
    return icrc3_state_current;
  };

  private var _icrc3 : ?ICRC3.ICRC3 = null;

  func icrc3() : ICRC3.ICRC3 {
    switch (_icrc3) {
      case (null) {
        let initclass : ICRC3.ICRC3 = ICRC3.ICRC3(?icrc3_migration_state, Principal.fromActor(this), get_icrc3_environment());
        _icrc3 := ?initclass;
        initclass;
      };
      case (?val) val;
    };
  };

  stable let cert_store : CertTree.Store = CertTree.newStore();
  let ct = CertTree.Ops(cert_store);

  private func get_certificate_store() : CertTree.Store {
    D.print("returning cert store " # debug_show (cert_store));
    return cert_store;
  };

  private func updated_certification(cert : Blob, lastIndex : Nat) : Bool {
    D.print("updating the certification " # debug_show (CertifiedData.getCertificate(), ct.treeHash()));
    ct.setCertifiedData();
    D.print("did the certification " # debug_show (CertifiedData.getCertificate()));
    return true;
  };

  private func get_icrc3_environment() : ICRC3.Environment {
    ?{
      updated_certification = ?updated_certification;
      get_certificate_store = ?get_certificate_store;
    };
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

  private func get_time() : Int {
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

  /////////
  // ICRC7 endpoints
  /////////

  public query func icrc7_symbol() : async Text {
    icrc7().symbol();
  };

  public query func icrc7_name() : async Text {
    icrc7().name();
  };

  public query func icrc7_description() : async ?Text {
    icrc7().description();
  };

  public query func icrc7_logo() : async ?Text {
    icrc7().logo();
  };

  public query func icrc7_max_memo_size() : async ?Nat {
    icrc7().max_memo_size();
  };

  public query func icrc7_total_supply() : async Nat {
    icrc7().total_supply();
  };

  public query func icrc7_supply_cap() : async ?Nat {
    icrc7().supply_cap();
  };

  public query func icrc7_max_query_batch_size() : async ?Nat {
    icrc7().max_query_batch_size();
  };

  public query func icrc7_max_update_batch_size() : async ?Nat {
    icrc7().max_update_batch_size();
  };

  public query func icrc7_default_take_value() : async ?Nat {
    icrc7().default_take_value();
  };

  public query func icrc7_max_take_value() : async ?Nat {
    icrc7().max_take_value();
  };

  public query func icrc7_token_metadata(token_ids : [Nat]) : async [{
    token_id : Nat;
    metadata : ICRC7.NFTMap;
  }] {
    icrc7().token_metadata(token_ids);
  };

  public query func icrc7_owner_of(token_ids : [Nat]) : async ICRC7.OwnerOfResponses {
    icrc7().owner_of(token_ids);
  };

  public query func icrc7_balance_of(account : ICRC7.Account) : async Nat {
    icrc7().balance_of(account);
  };

  public query func icrc7_tokens(prev : ?Nat, take : ?Nat) : async [Nat] {
    icrc7().tokens(prev, take);
  };

  public query func icrc7_tokens_of(account : ICRC7.Account, prev : ?Nat, take : ?Nat) : async [Nat] {
    icrc7().tokens_of(account, prev, take);
  };

  public query func icrc7_supported_standards() : async ICRC7.SupportedStandards {
    icrc7().supported_standards();
  };

  public query func icrc7_collection_metadata() : async [(Text, ICRC7.Value)] {
    icrc7().collection_metadata();
  };

  public shared (msg) func icrc7_transfer(args : ICRC7.TransferArgs) : async ICRC7.TransferResponse {
    icrc7().transfer(msg.caller, args);
  };

  /////////
  // ICRC30 endpoints
  /////////

  public query func icrc30_metadata() : async [(Text, ICRC30.Value)] {
    icrc30().metadata();
  };

  public query func icrc30_max_approvals_per_token_or_collection() : async ?Nat {
    icrc30().max_approvals_per_token_or_collection();
  };

  public query func icrc30_max_revoke_approvals() : async ?Nat {
    return icrc30().max_revoke_approvals();
  };

  public query func icrc30_is_approved(spender : ICRC30.Account, from_subaccount : ?Blob, token_id : Nat) : async Bool {
    return icrc30().is_approved(spender, from_subaccount, token_id);
  };

  public query func icrc30_get_token_approvals(token_ids : [Nat], prev : ?ICRC30.TokenApproval, take : ?Nat) : async [ICRC30.TokenApproval] {
    icrc30().get_token_approvals(token_ids, prev, take);
  };

  public query func icrc30_get_collection_approvals(owner : ICRC30.Account, prev : ?ICRC30.CollectionApproval, take : ?Nat) : async [ICRC30.CollectionApproval] {
    icrc30().get_collection_approvals(owner, prev, take);
  };

  public shared (msg) func icrc30_transfer_from(args : ICRC30.TransferFromArgs) : async ICRC30.TransferFromResponse {
    icrc30().transfer_from(msg.caller, args);
  };

  public shared (msg) func icrc30_approve_tokens(token_ids : [Nat], approval : ICRC30.ApprovalInfo) : async ICRC30.ApprovalResponse {
    icrc30().approve_tokens(msg.caller, token_ids, approval);
  };

  public shared (msg) func icrc30_approve_collection(approval : ICRC30.ApprovalInfo) : async ICRC30.ApprovalCollectionResponse {
    icrc30().approve_collection(msg.caller, approval);
  };

  public shared (msg) func icrc30_revoke_token_approvals(args : ICRC30.RevokeTokensArgs) : async ICRC30.RevokeTokensResponse {
    icrc30().revoke_token_approvals(msg.caller, args);
  };

  public shared (msg) func icrc30_revoke_collection_approvals(args : ICRC30.RevokeCollectionArgs) : async ICRC30.RevokeCollectionResponse {
    icrc30().revoke_collection_approvals(msg.caller, args);
  };

  /////////
  // ICRC3 endpoints
  /////////

  public query func icrc3_get_blocks(args : [ICRC3.TransactionRange]) : async ICRC3.GetTransactionsResult {
    return icrc3().get_blocks(args);
  };

  public query func icrc3_get_archives(args : ICRC3.GetArchivesArgs) : async ICRC3.GetArchivesResult {
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

  stable var nextTokenId = 0;

  public shared (msg) func mint(to : ICRC7.Account) : async ICRC7.SetNFTBatchResponse {
    let setNftRequest : ICRC7.SetNFTRequest = {
      memo = null;
      created_at_time = null;
      tokens = [{
        token_id = nextTokenId;
        override = false;
        metadata = #Map([
          (
            "tokenUri",
            #Text("asset canister url"),
          ),
          (
            "icrc7:owner_account",
            #Map([
              (
                "icrc7:owner_principal",
                #Blob(Principal.toBlob(to.owner)),
              ),
              (
                "icrc7:owner_subaccount",
                switch (to.subaccount) {
                  case (null) #Blob(Blob.fromArray(Array.freeze(Array.init<Nat8>(32, 0))));
                  case (?val) #Blob(val);
                },
              ),
            ]),
          ),
        ]);
      }];
    };
    switch (icrc7().set_nfts(msg.caller, setNftRequest)) {
      case (#ok(val)) {
        nextTokenId += 1;
        val;
      };
      case (#err(err)) D.trap(err);
    };
  };

  public shared (msg) func burn(token : Nat) : async ICRC7.BurnNFTBatchResponse {
    let burnNftRequest : ICRC7.BurnNFTRequest = {
      memo = null;
      tokens = [token];
      created_at_time = null;
    };
    switch (icrc7().burn_nfts(msg.caller, burnNftRequest)) {
      case (#ok(val)) val;
      case (#err(err)) D.trap(err);
    };
  };

};
