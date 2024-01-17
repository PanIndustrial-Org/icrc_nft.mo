import { IDL } from "@dfinity/candid";
import {
    InitArgs,
    InitArgs__1,
    InitArgs__3,
} from "../../src/declarations/icrc_nft/icrc_nft.did";
import { _SERVICE, idlFactory, init } from "../../src/declarations/icrc_nft";
import { resolve } from "node:path";
import { PocketIc } from "@hadronous/pic";
import { Principal } from "@dfinity/principal";

type Arguments = {
    icrc3_args: InitArgs__1;
    icrc30_args: InitArgs;
    icrc7_args: InitArgs__3;
};
const defaultInitArgs: Arguments = {
    icrc30_args: [],
    icrc3_args: [],
    icrc7_args: [],
};
const WASM_PATH = resolve(__dirname, "..", "..", "icrc_nft.wasm");

interface DeployOptions {
    initArgs?: Arguments;
    deployer?: Principal;
}

export async function deployCanister({
    initArgs = defaultInitArgs,
    deployer = Principal.anonymous(),
}: DeployOptions) {
    const encodedInitArgs = IDL.encode(init({ IDL }), [initArgs]);
    let pic = await PocketIc.create();
    const fixture = await pic.setupCanister<_SERVICE>(
        idlFactory,
        WASM_PATH,
        undefined,
        new Uint8Array(encodedInitArgs),
        deployer
    );
    let actor = fixture.actor;
    let canisterId = fixture.canisterId;
    return { pic, actor, canisterId };
}
