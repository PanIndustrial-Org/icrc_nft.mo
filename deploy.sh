set -ex

dfx identity new alice --storage-mode=plaintext || true

dfx identity use alice

ALICE_PRINCIPAL=$(dfx identity get-principal)

dfx identity new bob --storage-mode=plaintext || true

dfx identity use bob

BOB_PRINCIPAL=$(dfx identity get-principal)

dfx identity new icrc7_deployer --storage-mode=plaintext || true

dfx identity use icrc7_deployer

ADMIN_PRINCIPAL=$(dfx identity get-principal)



#Deploy the canister
dfx deploy icrc7 --argument 'record {icrc7_args = null; icrc30_args =null; icrc3_args =null;}' --mode reinstall

ICRC7_CANISTER=$(dfx canister id icrc7)


echo $ICRC7_CANISTER

#init the canister
dfx canister call icrc7 init

# Get Name
dfx canister call icrc7 icrc7_name  --query 

# Get Symbol
dfx canister call icrc7 icrc7_symbol  --query 

# Get Description
dfx canister call icrc7 icrc7_description  --query 

# Get Logo
dfx canister call icrc7 icrc7_logo  --query 

# Mint 4 NFTs
dfx canister call icrc7 icrcX_mint '(record { memo = null; created_at_time=null; tokens = vec {
  record { token_id = 0; override = true; metadata = variant {Class = vec {
    record {name = "src"; value = variant { Text = "https://images-assets.nasa.gov/image/PIA18249/PIA18249~orig.jpg"}; immutable=true;}}}
  };
  record { token_id = 1; override = true; metadata = variant {Class = vec {
    record {name = "src"; value = variant { Text = "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001465/GSFC_20171208_Archive_e001465~orig.jpg"}; immutable=true;}}}
  };
  record { token_id = 2; override = true; metadata = variant {Class = vec {
    record {name = "src"; value = variant { Text = "https://images-assets.nasa.gov/image/hubble-sees-the-wings-of-a-butterfly-the-twin-jet-nebula_20283986193_o/hubble-sees-the-wings-of-a-butterfly-the-twin-jet-nebula_20283986193_o~orig.jpg"}; immutable=true;}}}
  };
  record { token_id = 3; override = true; metadata = variant {Class = vec {
    record {name = "src"; value = variant { Text = "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001518/GSFC_20171208_Archive_e001518~orig.jpg"}; immutable=true;}}}
  }
}})'

# Get total supply
dfx canister call icrc7 icrc7_total_supply  --query 

# Get supply cap
dfx canister call icrc7 icrc7_total_supply  --query

# Get max query batch size
dfx canister call icrc7 icrc7_max_query_batch_size  --query

# Get max update size
dfx canister call icrc7 icrc7_max_update_batch_size  --query

# Get default take value
dfx canister call icrc7 icrc7_default_take_value  --query

# Get max take value
dfx canister call icrc7 icrc7_max_take_value  --query

# Get max memo size
dfx canister call icrc7 icrc7_max_memo_size  --query

# Get collection metadata
dfx canister call icrc7 icrc7_collection_metadata  --query

# Get suported standards
dfx canister call icrc7 icrc7_supported_standards  --query

# Get approval metadata
dfx canister call icrc7 icrc30_metadata  --query

# Get approval metadata
dfx canister call icrc7 icrc30_metadata  --query

# Get max approvals per token or collection
dfx canister call icrc7 icrc30_max_approvals_per_token_or_collection  --query

#Get a max revoke approvals
dfx canister call icrc7 icrc30_max_revoke_approvals '(null, null)'

#All tokens should be owned by the canister
dfx canister call icrc7 icrc7_tokens_of "(record { owner = principal \"$ICRC7_CANISTER\"; subaccount = null;},null,null)"

#Should be approved to transfer
dfx canister call icrc7 icrc30_is_approved "(record { owner = principal \"$ADMIN_PRINCIPAL\"; subaccount = null;},null,0)" --query

#Check that the owner is spender
dfx canister call icrc7 icrc30_get_collection_approvals "(record { owner = principal \"$ICRC7_CANISTER\"; subaccount = null;},null, null)" --query

#tranfer from a token to the admin
dfx canister call icrc7 icrc30_transfer_from "(record { 
  spender = principal \"$ADMIN_PRINCIPAL\";
  from = record { owner = principal \"$ICRC7_CANISTER\"; subaccount = null}; 
  to = record { owner = principal \"$ADMIN_PRINCIPAL\"; subaccount = null};
  token_ids = vec { 0 : nat};
  memo = null;
  created_at_time = null;})"

#Internally use transfer to transfer to admin
dfx canister call icrc7 assign "(1, record { owner = principal \"$ADMIN_PRINCIPAL\"; subaccount = null})";

# Admin should own two tokens

dfx canister call icrc7 icrc7_tokens_of "(record { owner = principal \"$ADMIN_PRINCIPAL\"; subaccount = null}, null, null)" --query

# List owner of all tokens
dfx canister call icrc7 icrc7_owner_of '(vec {0;1})' --query

#Get token metadta
dfx canister call icrc7 icrc7_token_metadata '(vec {0})' --query 

# Approve Alice to spend token 0
dfx canister call icrc7 icrc30_approve "(vec {0;}, record { from_subaccount = null; spender = record {owner = principal \"$ALICE_PRINCIPAL\"; subaccount = null}; memo = null; expires_at = null; created_at_time = null })"

# Retrieve Alice Token approvals
dfx canister call icrc7 icrc30_is_approved "(record { owner = principal \"$ALICE_PRINCIPAL\"; subaccount = null;},null,0)" --query

dfx canister call icrc7 icrc30_get_approvals "(vec { 0;},null,null)" --query

# Switch to Alice
dfx identity use alice

# Transfer to Bob
dfx canister call icrc7 icrc30_transfer_from "(record { 
  spender = principal \"$ALICE_PRINCIPAL\";
  from = record { owner = principal \"$ADMIN_PRINCIPAL\"; subaccount = null}; 
  to = record { owner = principal \"$BOB_PRINCIPAL\"; subaccount = null};
  token_ids = vec { 0 : nat};
  memo = null;
  created_at_time = null;})"

#Switch to Bob
dfx identity use bob

#Let bob approve the collection for admin
dfx canister call icrc7 icrc30_approve_collection "(record { from_subaccount = null; spender = record {owner = principal \"$ADMIN_PRINCIPAL\"; subaccount = null}; memo = null; expires_at = null; created_at_time = null })"

dfx canister call icrc7 icrc30_get_collection_approvals "(record {owner = principal \"$ADMIN_PRINCIPAL\"; subaccount = null},null,null)" --query

#Revoke the approval
dfx canister call icrc7 icrc30_revoke_collection_approvals "(record {
  from_subaccount = null;
  spender = null;
  memo = null;
  created_at_time = null;
})" 

#Check it is removed

#approve the token for admin
dfx canister call icrc7 icrc30_approve "(vec {0;}, record { from_subaccount = null; spender = record {owner = principal \"$ADMIN_PRINCIPAL\"; subaccount = null}; memo = null; expires_at = null; created_at_time = null })"

dfx canister call icrc7 icrc30_get_approvals "(vec { 0;},null,null)" --query

#Revoke the approval
dfx canister call icrc7 icrc30_revoke_token_approvals "(record {
  token_ids = vec {0;};
  from_subaccount = null;
  spender = null;
  memo = null;
  created_at_time = null;
})" 

#Check it is removed
dfx canister call icrc7 icrc30_get_approvals "(vec { 0;},null,null)" --query

#Get the transaction log
dfx canister call icrc7 icrc3_get_blocks "(record {start =0; length = 1000})" --query

#Get the archive log
dfx canister call icrc7 icrc3_get_archives "(record {from = null})" --query